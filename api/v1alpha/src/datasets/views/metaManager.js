/**
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const { BigQueryUtil, StorageUtil } = require('bqds-shared');
const underscore = require("underscore");
const configValidator = require('./configValidator');
const sqlBuilder = require("./sqlBuilder");
const runtimeConfiguration = require("./runtimeConfiguration");
let bigqueryUtil = new BigQueryUtil();
let storageUtil = new StorageUtil();
const path = require("path");
const labelName = "cds_managed";
const uuidv4 = require('uuid/v4');

/**
 * @param  {} projectId
 */
async function syncAllPolicies(projectId) {
    const datasets = await getDatasets(projectId, "cds_managed");
    const datasetIds = datasets.map(d => d.datasetId);
    console.log(`Performing policy sync for datasets: ${JSON.stringify(datasetIds)})`);
    await performMetadataUpdate(projectId, null, datasetIds);
}

/**
 * @param  {} projectId
 * @param  {} incomingUuid
 * @param  {} id
 * @param  {} deletedBy
 */
async function deleteAccount(projectId, incomingRowId, accountId, createdBy) {
    const currentAccount = await getAccount(projectId, accountId);
    if (currentAccount && currentAccount.rowId !== incomingRowId) {
        return { error: 'STALE' };
    }
    console.log(`Deleting account with uuid: ${incomingRowId}`);
    const uniqueId = uuidv4();
    const sqlQuery = `insert into \`${projectId}.datashare.account\` (rowId, email, emailType, accountType, createdBy, createdAt, accountId, policies, isDeleted)
    select @rowId, email, emailType, accountType, @createdBy, current_timestamp(), accountId, policies, true
    from \`${projectId}.datashare.account\`
    where rowId = @incomingRowId`
    const options = {
        query: sqlQuery,
        params: { rowId: uniqueId, createdBy: createdBy, incomingRowId: incomingRowId }
    };
    const [rows] = await bigqueryUtil.executeQuery(options);
    console.log(`Delete account result: ${JSON.stringify(rows, null, 3)}`);

    const policyQuery = `SELECT p.policyId
    FROM \`${projectId}.datashare.account\` a
    cross join unnest(policies) p
    where a.rowId = @rowId`;
    const policyOptions = {
        query: policyQuery,
        params: { rowId: incomingRowId }
    };
    const [policies] = await bigqueryUtil.executeQuery(policyOptions);
    console.log(`Get policy id's requiring refresh result ${JSON.stringify(policies, null, 3)}`);

    let policyIds = [];
    policies.forEach(p => {
        policyIds.push(p.policyId);
    })
    if (policyIds.length > 0) {
        await performMetadataUpdate(projectId, policyIds);
    }

    return { success: true };
}

/**
 * @param  {} projectId
 * @param  {} incomingUuid
 * @param  {} policyId
 * @param  {} createdBy
 */
async function deletePolicy(projectId, incomingRowId, policyId, createdBy) {
    const currentPolicy = await getPolicy(projectId, policyId);
    if (!currentPolicy || currentPolicy.rowId !== incomingRowId) {
        return { error: 'STALE' };
    }
    const uniqueId = uuidv4();
    const sqlQuery = `insert into \`${projectId}.datashare.policy\` (rowId, policyId, name, description, datasets, rowAccessTags, createdBy, createdAt, isDeleted)
    select @rowId, policyId, name, description, datasets, rowAccessTags, @createdBy, current_timestamp(), true
    from \`${projectId}.datashare.policy\`
    where rowId = @incomingRowId`
    const options = {
        query: sqlQuery,
        params: { rowId: uniqueId, createdBy: createdBy, incomingRowId: incomingRowId }
    };
    const [rows] = await bigqueryUtil.executeQuery(options);
    console.log(JSON.stringify(rows, null, 3));

    // TODO - This will not work as the object was already deleted.
    await performMetadataUpdate(projectId, [policyId]);

    return { success: true };
}

/**
 * @param  {} projectId
 * @param  {} dataset
 * @param  {} accounts
 */
async function performDatasetMetadataUpdate(projectId, datasetId, accounts) {
    let isDirty = false;
    let accessTypes = ["userByEmail", "groupByEmail"];

    // 0. Check for existance of the datasetId and handle appropriately

    // 1. Get metadata
    let metadata = await bigqueryUtil.getDatasetMetadata(datasetId);

    // 2. Check for and remove any non-existing authorized views
    // Remove stale view access
    let i = metadata.access.length;
    while (i--) {
        let a = metadata.access[i];
        // console.log(`Access record: ${JSON.stringify(a)}`);
        if (a.view && a.view.projectId && a.view.datasetId && a.view.tableId) {
            console.log(`Check if view exists: ${a.view.datasetId}.${a.view.tableId}`);
            const _viewExists = await bigqueryUtil.viewExists(a.view.datasetId, a.view.tableId);
            // If view no longer exists, remove it.
            if (_viewExists === false) {
                metadata.access.splice(i, 1);
                isDirty = true;
            }
        }
        else if (a.role === 'READER') {
            // 3. Remove all 'READER' userByEmail and groupByEmail accounts
            // Get keys for the current access object.
            const aKeys = Object.keys(a);
            if (aKeys.length === 2) {
                const accessType = aKeys[1];
                const accessId = a[accessType];

                if (accessTypes.includes(accessType)) {
                    // If we find the record, remove it
                    console.log(`Found user: ${accessType}:${accessId}, deleting`);
                    metadata.access.splice(i, 1);
                    isDirty = true;
                }
                else {
                    console.log(`Skipping access type: ${accessType}`);
                }
            }
        }
    }

    // 4. Add accounts
    accounts.forEach(account => {
        // If a dataset contains no accounts, the query will return an array with
        // a single item at zero index with attributes having all null values.
        // TODO: Clean this up.
        if (account.email && account.emailType) {
            let a = { role: 'READER', };
            a["role"] = 'READER';
            a[account.emailType] = account.email;
            metadata.access.push(a);
            isDirty = true;
            console.log(`Adding access record to datasetId: ${datasetId}: ${JSON.stringify(a)}`);
        }
    });

    // 5. Save metadata if changed
    if (isDirty === true) {
        await bigqueryUtil.setDatasetMetadata(datasetId, metadata);
        console.log(`Metadata updated to: ${JSON.stringify(metadata, null, 3)}`);
    }

    return isDirty;
}

/**
 * @param  {} projectId
 * @param  {} policyIds
 * @param  {} datasetIds
 * TODO - This won't work for deletes currently because it uses ids. The deleted records aren't returned in views currently.
 */
async function performMetadataUpdate(projectId, policyIds, datasetIds) {
    console.log(`performMetadataUpdate called for policyIds: ${JSON.stringify(policyIds)} and datasetIds: ${JSON.stringify(datasetIds)}`);
    let filter = "";
    if (policyIds && policyIds.length > 0 && datasetIds && datasetIds.length > 0) {
        filter = "(cp.policyId IN UNNEST(@policy_ids) or (cp.isDeleted is false and d.datasetId IN UNNEST(@dataset_ids)))";
    }
    if (policyIds && policyIds.length > 0) {
        filter = "(cp.policyId IN UNNEST(@policy_ids))";
    }
    else if (datasetIds && datasetIds.length > 0) {
        filter = "(cp.isDeleted is false and d.datasetId IN UNNEST(@dataset_ids))";
    }
    else {
        throw new Error("A filter must be provided");
    }

    const sqlQuery = `with policies as (
        select distinct
          cp.policyId,
          d.datasetId
        from \`${projectId}.datashare.currentPolicy\` cp
        cross join unnest(cp.datasets) d
        where ${filter}
      ),
      userPolicies as (
        select
          ca.email,
          ca.emailType,
          p.policyId
        from \`${projectId}.datashare.currentAccount\` ca
        cross join unnest(ca.policies) as p
        where ca.isDeleted is false
      ),
      list as (
        select distinct
          p.datasetId,
          up.email,
          up.emailType
        from policies p
        left join userPolicies up on p.policyId = up.policyId
      )
      select
        ud.datasetId,
        ARRAY_AGG(struct<email string, emailType string>(ud.email, ud.emailType)) as accounts
      from list ud
      group by ud.datasetId`;

    let options = {
        query: sqlQuery,
        params: {}
    };

    if (policyIds && policyIds.length > 0) {
        options.params.policy_ids = policyIds;
    }
    if (datasetIds && datasetIds.length > 0) {
        options.params.dataset_ids = datasetIds;
    }

    const [rows] = await bigqueryUtil.executeQuery(options);
    console.log(`Rows response from query: ${JSON.stringify(rows, null, 3)}`);

    let updatedDatasets = [];

    if (policyIds) {
        for (const row of rows) {
            updatedDatasets.push(row.datasetId);
            await performDatasetMetadataUpdate(projectId, row.datasetId, row.accounts);
        }
    }

    if (datasetIds) {
        for (const datasetId of datasetIds) {
            // Skip if the dataset was already updated
            if (updatedDatasets && updatedDatasets.includes(datasetId)) {
                continue;
            }
            updatedDatasets.push(datasetId);
            let accounts = [];
            const found = underscore.findWhere(rows, { datasetId: datasetId });
            if (found) {
                accounts = found.accounts;
            }
            await performDatasetMetadataUpdate(projectId, datasetId, accounts);
        }
    }
}

/**
 * @param  {} projectId
 * @param  {} rowId
 * @param  {} policyId
 * @param  {} description
 * @param  {} datasets
 * @param  {} rowTagAccess
 * @param  {} createdBy
 */
async function savePolicy(projectId, rowId, policyId, name, description, datasets, rowAccessTags, createdBy) {
    // Can this be done at startup?
    await setupDatasharePrerequisites(projectId);

    let previousDatasetIds = [];
    if (policyId) {
        const currentPolicy = await getPolicy(projectId, policyId);
        if (currentPolicy && currentPolicy.rowId !== rowId) {
            return { error: 'STALE' };
        }
        previousDatasetIds = currentPolicy.datasets.map(p => p.datasetId);
    }

    const uuid = policyId || uuidv4();
    const uniqueId = uuidv4();

    let queryParams = { rowId: uniqueId, policyId: uuid, name: name, description: description, createdBy: createdBy };
    let insertAddition = "";
    let valueAddition = "";

    if (datasets && datasets.length > 0) {
        insertAddition += ", datasets";
        valueAddition += ", @datasets";
        queryParams.datasets = datasets;
    }
    if (rowAccessTags && rowAccessTags.length > 0) {
        insertAddition += ", rowAccessTags";
        valueAddition += ", @rowAccessTags";
        queryParams.rowAccessTags = rowAccessTags;
    }

    const sqlQuery = `insert into \`${projectId}.datashare.policy\`
        (rowId, policyId, name, description, createdby, createdAt${insertAddition})
        values(@rowId, @policyId, @name, @description, @createdBy, current_timestamp()${valueAddition})`;

    const options = {
        query: sqlQuery,
        params: queryParams
    };

    console.log(`Will write data: ${JSON.stringify(options, null, 3)}`);
    const [rows] = await bigqueryUtil.executeQuery(options);
    console.log(JSON.stringify(rows));

    await performMetadataUpdate(projectId, [uuid], previousDatasetIds);
    return { success: true };
}

/**
 * @param  {} view
 */
async function saveView(view) {
    if (view.authorizedViewId) {
        const currentView = await getView(view.projectId, view.authorizedViewId);
        if (currentView && currentView.rowId !== view.rowId) {
            return { error: 'STALE' };
        }
    }

    // Perform validation
    const result = await configValidator.validate(view);
    if (!result.isValid) {
        // If validation failed, return the validation result.
        return result;
    }

    const uuid = view.authorizedViewId || uuidv4();
    const uniqueId = uuidv4();

    let queryParams = { rowId: uniqueId, authorizedViewId: uuid, name: view.name, description: view.description, datasetId: view.datasetId, createdBy: view.createdBy };
    let insertAddition = "";
    let valueAddition = "";

    if (view.source) {
        insertAddition += ", source";
        valueAddition += ", @source";
        queryParams.source = {};
        Object.assign(queryParams.source, view.source);
    }
    if (view.expiration) {
        insertAddition += ", expiration";
        valueAddition += ", @expiration";
        queryParams.expiration = {};
        Object.assign(queryParams.expiration, view.expiration);

        if (view.expiration.time) {
            queryParams.expiration.time = new Date(view.expiration.time);
        }
    }
    if (view.custom) {
        insertAddition += ", custom";
        valueAddition += ", @custom";
        queryParams.custom = {};
        Object.assign(queryParams.custom, view.custom);
    }

    const sqlQuery = `insert into \`${view.projectId}.datashare.authorizedView\`
        (rowId, authorizedViewId, name, description, datasetId, createdAt, createdBy${insertAddition})
        values(@rowId, @authorizedViewId, @name, @description, @datasetId, current_timestamp(), @createdBy${valueAddition})`;

    const options = {
        query: sqlQuery,
        params: queryParams
    };

    console.log(`Will write data: ${JSON.stringify(options, null, 3)}`);
    queryParams.createdAt = new Date();
    await bigqueryUtil.insertRows("datashare", "authorizedView", [queryParams]);

    return await createView(view);
}

/**
 * @param  {} view
 */
async function createView(view) {
    let success = false;

    const viewSql = await sqlBuilder.generateSql(view);
    let metadataResult = await bigqueryUtil.getTableMetadata(view.datasetId, view.name);

    let viewMetadata = metadataResult.metadata;
    const viewExists = metadataResult.exists;

    let createViewResult;
    let configuredExpirationTime = view.expiration && view.expiration.delete === true ? view.expiration.time : null;

    let viewDescription = `This view was generated by ${runtimeConfiguration.PRODUCT_NAME}. ${view.description}`;
    let labels = {};
    labels[labelName] = true;

    const viewOptions = {
        description: viewDescription,
        labels: labels,
        expirationTime: configuredExpirationTime
    };

    if (viewExists === true) {
        console.log("View '%s' already exists, checking if it's up to date", view.name);
        const viewDefinition = viewMetadata.view.query;

        if (viewSql.replace("\n", "") === viewDefinition.replace("\n", "")) {
            console.log("SQL text is identitical");
        }
        else {
            // Validate query was already run by configValidator
            /*const result = await bigqueryUtil.validateQuery(viewSql, 5);
            if (result.isValid === false) {
                console.log("Query is invalid, skipping to next view");
            }*/
            console.log(`SQL text is different, need to re-create view\nView Definition:\n${viewDefinition}\n\nConfig SQL:\n${viewSql}`);

            createViewResult = await bigqueryUtil.createView(view.datasetId, view.name, viewSql, viewOptions, true);
            if (createViewResult.success === false) {
                console.log("Failed to create view, skipping to next view");
                return { isValid: false, success: false };
            }
            else {
                // If view is deleted and recreated we need to refresh metadata
                viewMetadata = createViewResult.metadata;
            }
        }

        const currentExpiryTime = viewMetadata.expirationTime;
        console.log(`expirationTime for view '${view.name}' is ${currentExpiryTime}`);

        // Update expirationTime for view
        // Deleting the property doesn't remove it from metadata, setting it to null removes it
        if (configuredExpirationTime !== currentExpiryTime) {
            console.log(`Configured expirationTime is different than the value for view '${view.name}'`);
            viewMetadata.expirationTime = configuredExpirationTime;
            await bigqueryUtil.setTableMetadata(view.datasetId, view.name, viewMetadata);
        }
        else {
            if (runtimeConfiguration.VERBOSE_MODE) {
                console.log(`expirationTime for view '${view.name}' is in-sync`);
            }
        }
    }
    else {
        // This else block is a bit redundant as it has the same code as above (except the deleteIfExists flag)
        // Validate query was already run by configValidator
        /*const result = bigqueryUtil.validateQuery(viewSql, 5);
        if (result.isValid === false) {
            console.log("Query is invalid, skipping to next view");
        }*/
        createViewResult = await bigqueryUtil.createView(view.datasetId, view.name, viewSql, viewOptions, true);
    }

    let viewCreated = createViewResult && createViewResult.success;
    console.log("Authorizing view objects for access from other datasets");
    if (!view.hasOwnProperty('custom')) {
        let source = view.source;
        // Need to authorize the view from the source tables
        await bigqueryUtil.shareAuthorizeView(source.datasetId, view.projectId, view.datasetId, view.name, viewCreated);

        if (source.accessControl && source.accessControl.enabled === true) {
            await bigqueryUtil.shareAuthorizeView('datashare', view.projectId, view.datasetId, view.name, viewCreated);
        }
    }
    else {
        // Custom sql
        let custom = view.custom;
        if (custom.authorizeFromDatasetIds && custom.authorizeFromDatasetIds.length > 0) {
            for (const d of view.custom.authorizeFromDatasetIds) {
                // const ads = configUtil.performTextVariableReplacements(config, null, d);
                await bigqueryUtil.shareAuthorizeView(d, view.projectId, view.datasetId, view.name, viewCreated);
            }
        }
    }

    return { isValid: true, success: success, issues: [] };
}

/**
 * @param  {} projectId
 * @param  {} incomingRowId
 * @param  {} authorizedViewId
 * @param  {} createdBy
 */
async function deleteView(projectId, incomingRowId, authorizedViewId, createdBy) {
    const currentView = await getView(projectId, authorizedViewId);
    if (authorizedViewId) {
        if (currentView && currentView.rowId !== incomingRowId) {
            return { error: 'STALE' };
        }
    }
    const uniqueId = uuidv4();
    const sqlQuery = `insert into \`${projectId}.datashare.authorizedView\` (rowId, authorizedViewId, name, description, datasetId, source, expiration, custom, createdAt, createdBy, isDeleted)
    select @rowId, authorizedViewId, name, description, datasetId, source, expiration, custom, current_timestamp(), @createdBy, true
    from \`${projectId}.datashare.authorizedView\`
    where rowId = @incomingRowId`

    const options = {
        query: sqlQuery,
        params: { rowId: uniqueId, createdBy: createdBy, incomingRowId: incomingRowId }
    };
    console.log(`Running delete`);
    const [rows] = await bigqueryUtil.executeQuery(options);
    console.log(`Delete done`);
    console.log(JSON.stringify(rows, null, 3));

    console.log(`Will delete table for: ${JSON.stringify(currentView, null, 3)}`);
    await bigqueryUtil.deleteTable(currentView.datasetId, currentView.name, false);

    return { success: true };
}

/**
 * @param  {} view
 */
async function validateView(view) {
    if (view.authorizedViewId) {
        const currentView = await getView(view.projectId, view.authorizedViewId);
        if (currentView && currentView.rowId !== view.rowId) {
            return { error: 'STALE' };
        }
    }
    const result = await configValidator.validate(view);
    return result;
}

/**
 * @param  {} projectId
 * @param  {} policyId
 */
async function getPolicyAccounts(projectId, policyId) {
    const sqlQuery = `select
    ca.email,
    ca.emailType
  from \`${projectId}.datashare.currentAccount\` ca
  cross join unnest(ca.policies) as p
  where p.policyId = @policy_id`;
    const options = {
        query: sqlQuery,
        params: { policy_id: policyId }
    };
    const [rows] = await bigqueryUtil.executeQuery(options);
    return rows;
}

/**
 * @param  {} projectId
 * @param  {} id
 */
async function getPolicy(projectId, policyId) {
    if (policyId) {
        const sqlQuery = `select * from \`${projectId}.datashare.currentPolicy\` where policyId = @policy_id and isDeleted is false`;
        const options = {
            query: sqlQuery,
            params: { policy_id: policyId }
        };
        const [rows] = await bigqueryUtil.executeQuery(options);
        if (rows.length === 1) {
            return rows[0];
        }
        else {
            return null;
        }
    }
    else {
        const sqlQuery = `with accountCounts AS (
            select p.policyId, count(ca.accountId) as count
            from \`${projectId}.datashare.currentAccount\` ca
            cross join unnest(policies) p
            where ca.isDeleted is false
            group by p.policyId
          )
        SELECT rowId, cp.policyId, name, description, createdAt, createdBy, version, ifnull(ac.count, 0) as accountCount
        FROM \`${projectId}.datashare.currentPolicy\` cp
        left join accountCounts ac on ac.policyId = cp.policyId
        where cp.isDeleted is false;`
        const options = {
            query: sqlQuery
        };
        const [rows] = await bigqueryUtil.executeQuery(options);
        return rows;
    }
}

/**
 * @param  {} projectId
 * @param  {} authorizedViewId
 * @param  {} datasetId
 */
async function getView(projectId, authorizedViewId, datasetId) {
    if (authorizedViewId) {
        const sqlQuery = `select * EXCEPT(version,isDeleted,createdBy,createdAt) from \`${projectId}.datashare.currentAuthorizedView\` where authorizedViewId = @authorizedViewId and isDeleted is false`;
        const options = {
            query: sqlQuery,
            params: { authorizedViewId: authorizedViewId }
        };
        const [rows] = await bigqueryUtil.executeQuery(options);
        if (rows.length === 1) {
            const result = rows[0];
            if (result.expiration && result.expiration.time && result.expiration.time.value) {
                // When querying using the node lib time is returned in a 'value' key
                result.expiration.time = result.expiration.time.value;
            }
            return result;
        }
        else {
            return null;
        }
    }
    else {
        let sqlQuery = `SELECT
        rowId,
        authorizedViewId,
        name,
        description,
        datasetId,
        createdAt,
        createdBy,
        version
      FROM \`${projectId}.datashare.currentAuthorizedView\`
      where isDeleted is false`;

        if (datasetId) {
            sqlQuery += '\nand datasetId = @datasetId'
        }

        let options = {
            query: sqlQuery
        };

        if (datasetId) {
            options.params = { datasetId: datasetId };
        }

        const [rows] = await bigqueryUtil.executeQuery(options);
        return rows;
    }
}

/**
 * @param  {} projectId
 * @param  {} accountId If provided, accountId will be used to filter result list
 * @param  {} datasetId If provided, datasetId will be used to filter result list
 * @param  {} email If email and emailType provided, they'll both be used to filter result
 * @param  {} emailType If email and emailType provided, they'll both be used to filter result
 */
async function getAccount(projectId, accountId, datasetId, email, emailType) {
    if (accountId) {
        const sqlQuery = `select * from \`${projectId}.datashare.currentAccount\` where accountId = @accountId and isDeleted is false`;
        const options = {
            query: sqlQuery,
            params: { accountId: accountId }
        };
        const [rows] = await bigqueryUtil.executeQuery(options);
        if (rows.length === 1) {
            return rows[0];
        }
        else {
            return null;
        }
    }
    else if (email && emailType) {
        // Used only for re-instating deleted accounts
        const sqlQuery = `select * from \`${projectId}.datashare.currentAccount\` where email = @email and emailType = @emailType and isDeleted is true`;
        const options = {
            query: sqlQuery,
            params: { email: email, emailType: emailType }
        };
        const [rows] = await bigqueryUtil.executeQuery(options);
        if (rows.length === 1) {
            return rows[0];
        }
        else {
            return null;
        }
    }
    else if (datasetId) {
        const sqlQuery = `with policies as (
            select distinct
              cp.policyId,
              cp.name,
              d.datasetId
            from \`${projectId}.datashare.currentPolicy\` cp
            cross join unnest(cp.datasets) d
            where d.datasetId = @datasetId and cp.isDeleted is false
          ),
          userPolicies as (
            select
              ca.* EXCEPT(policies),
              cp.policyId,
              cp.name
            from \`${projectId}.datashare.currentAccount\` ca
            cross join unnest(ca.policies) as p
            join policies cp on p.policyId = cp.policyId
            where ca.isDeleted is false
          )
          select
            up.rowId,
            up.email,
            up.emailType,
            up.accountId,
            up.createdAt,
            up.createdBy,
            up.version,
            ARRAY_AGG(struct(policyId, name)) as policies
          from userPolicies up
          group by up.rowId, up.email, up.emailType, up.accountId, up.createdAt, up.createdBy, up.version`;

        const options = {
            query: sqlQuery,
            params: { datasetId: datasetId }
        };
        const [rows] = await bigqueryUtil.executeQuery(options);
        return rows;
    }
    else {
        const sqlQuery = `SELECT ca.* except(policies),
        array(
            select as struct pm.policyId, pm.name
            from unnest(ca.policies) p
            join \`${projectId}.datashare.currentPolicy\` pm on p.policyId = pm.policyId
            where pm.isDeleted is false
           ) as policies
        FROM \`${projectId}.datashare.currentAccount\` ca
        where ca.isDeleted is false;`
        const options = {
            query: sqlQuery
        };
        const [rows] = await bigqueryUtil.executeQuery(options);
        return rows;
    }
}

/**
 */
async function setupDatasharePrerequisites(projectId) {
    const dsName = 'datashare';
    const policyTableName = 'policy';
    const currentPolicyView = 'currentPolicy';
    const accountTableName = 'account';
    const currentAccountView = 'currentAccount';
    const authorizedViewTableName = 'authorizedView';
    const currentAuthorizedView = 'currentAuthorizedView';
    const currentUserDataset = 'currentUserDataset';

    console.log("Checking if datashare dataset exists");
    if (await bigqueryUtil.datasetExists(dsName) === false) {
        console.log("Creating datashare dataset");
        const options = { description: 'CDS Datashare Master Dataset' };
        await bigqueryUtil.createDataset(dsName, options);
    }

    console.log("Checking if datashare policy table exists");
    if (await bigqueryUtil.tableExists(dsName, policyTableName) === false) {
        console.log("Creating policy table");
        const options = {
            description: 'BQDS Datashare Policy Table',
            schema: [
                {
                    "mode": "REQUIRED",
                    "name": "rowId",
                    "type": "STRING",
                    "description": "Unique row identifier"
                },
                {
                    "mode": "REQUIRED",
                    "name": "policyId",
                    "type": "STRING",
                    "description": "Unique policy identifier"
                },
                {
                    "mode": "REQUIRED",
                    "name": "name",
                    "type": "STRING",
                    "description": "Display name for policy"
                },
                {
                    "mode": "REQUIRED",
                    "name": "description",
                    "type": "STRING",
                    "description": "Description for the policy"
                },
                {
                    "fields": [
                        {
                            "mode": "REQUIRED",
                            "name": "datasetId",
                            "type": "STRING",
                            "description": "Dataset identifier of dataset"
                        }
                    ],
                    "mode": "REPEATED",
                    "name": "datasets",
                    "type": "RECORD",
                    "description": "List of dataset(s) associations for a policy"
                },
                {
                    "fields": [
                        {
                            "mode": "REQUIRED",
                            "name": "tag",
                            "type": "STRING",
                            "description": "Row Access Tag name"
                        }
                    ],
                    "mode": "REPEATED",
                    "name": "rowAccessTags",
                    "type": "RECORD",
                    "description": "List of row access tag(s) associations for a policy"
                },
                {
                    "mode": "REQUIRED",
                    "name": "createdBy",
                    "type": "STRING",
                    "description": "The email address the policy row entry was created by"
                },
                {
                    "mode": "REQUIRED",
                    "name": "createdAt",
                    "type": "TIMESTAMP",
                    "description": "The timestamp the policy row entry was created at"
                },
                {
                    "mode": "NULLABLE",
                    "name": "isDeleted",
                    "type": "BOOLEAN",
                    "description": "The flag to indicate the policy was deleted"
                }
            ]
        };
        await bigqueryUtil.createTable(dsName, policyTableName, options);
    }

    console.log("Checking if latest policies view exists");
    if (await bigqueryUtil.viewExists(dsName, currentPolicyView) === false) {
        console.log("Creating latest policies view");
        const viewSql = `WITH ranked AS (\n  select\n    p.*,\n    DENSE_RANK() OVER (PARTITION BY policyId ORDER BY createdAt) as rank\n  from \`${projectId}.datashare.policy\` p\n),\nrowIdentifiers AS (\n  SELECT r.rowId\n  from RANKED r\n  where r.rank = (select max(r2.rank) from RANKED r2 where r2.policyId = r.policyId)\n)\nSELECT\n * EXCEPT(rank, createdAt, isDeleted),\n UNIX_MILLIS(createdAt) as createdAt,\n rank as version,\n ifnull(isDeleted, false) as isDeleted\nFROM ranked t\nWHERE EXISTS (SELECT 1 from rowIdentifiers r WHERE t.rowId = r.rowId)`;
        await bigqueryUtil.createView(dsName, currentPolicyView, viewSql);
    }

    console.log("Checking if datashare account table exists");
    if (await bigqueryUtil.tableExists(dsName, accountTableName) === false) {
        console.log("Creating account table");
        const options = {
            description: 'CDS Datashare Account Table',
            schema: [
                {
                    "mode": "REQUIRED",
                    "name": "rowId",
                    "type": "STRING",
                    "description": "Unique row identifier"
                },
                {
                    "mode": "REQUIRED",
                    "name": "accountId",
                    "type": "STRING",
                    "description": "Unique account identifier"
                },
                {
                    "mode": "REQUIRED",
                    "name": "email",
                    "type": "STRING",
                    "description": "Email address for the account"
                },
                {
                    "mode": "REQUIRED",
                    "name": "emailType",
                    "type": "STRING",
                    "description": "Email address type for the account"
                },
                {
                    "mode": "REQUIRED",
                    "name": "accountType",
                    "type": "STRING",
                    "description": "Email address type for the account"
                },
                {
                    "mode": "REQUIRED",
                    "name": "createdBy",
                    "type": "STRING",
                    "description": "The email address the consumer row entry was created by"
                },
                {
                    "mode": "REQUIRED",
                    "name": "createdAt",
                    "type": "TIMESTAMP",
                    "description": "The timestamp the consumer row entry was created at"
                },
                {
                    "fields": [
                        {
                            "mode": "REQUIRED",
                            "name": "policyId",
                            "type": "STRING",
                            "description": "Policy identifier of policy"
                        }
                    ],
                    "mode": "REPEATED",
                    "name": "policies",
                    "type": "RECORD",
                    "description": "List of policies(s) associations for an account"
                },
                {
                    "mode": "NULLABLE",
                    "name": "isDeleted",
                    "type": "BOOLEAN",
                    "description": "The flag to indicate the account was deleted"
                }
            ]
        };
        await bigqueryUtil.createTable(dsName, accountTableName, options);
    }

    console.log("Checking if latest account view exists");
    if (await bigqueryUtil.viewExists(dsName, currentAccountView) === false) {
        console.log("Creating latest account view");
        const viewSql = `WITH ranked AS (\n  select\n    a.*,\n    DENSE_RANK() OVER (PARTITION BY accountId ORDER BY createdAt) as rank\n  from \`${projectId}.datashare.account\` a\n),\nrowIdentifiers AS (\n  SELECT r.rowId\n  from RANKED r\n  where r.rank = (select max(r2.rank) from RANKED r2 where r2.accountId = r.accountId)\n)\nSELECT\n * EXCEPT(rank, createdAt, isDeleted),\n UNIX_MILLIS(createdAt) as createdAt,\n rank as version,\n ifnull(isDeleted, false) as isDeleted\nFROM ranked t\nWHERE EXISTS (SELECT 1 from rowIdentifiers r WHERE t.rowId = r.rowId)`;
        await bigqueryUtil.createView(dsName, currentAccountView, viewSql);
    }

    console.log("Checking if authorizedView table exists");
    if (await bigqueryUtil.tableExists(dsName, authorizedViewTableName) === false) {
        console.log("Creating authorizedView table");
        const options = {
            description: 'CDS Datashare Authorized View Table',
            schema: [
                {
                    "description": "Unique row identifier",
                    "mode": "REQUIRED",
                    "name": "rowId",
                    "type": "STRING"
                },
                {
                    "description": "Unique authorized view identifier",
                    "mode": "REQUIRED",
                    "name": "authorizedViewId",
                    "type": "STRING"
                },
                {
                    "description": "Display name for authorized view",
                    "mode": "REQUIRED",
                    "name": "name",
                    "type": "STRING"
                },
                {
                    "mode": "REQUIRED",
                    "name": "description",
                    "type": "STRING",
                    "description": "Description for the authorized view"
                },
                {
                    "mode": "REQUIRED",
                    "name": "datasetId",
                    "type": "STRING",
                    "description": "The datasetId where the authorized view will be created"
                },
                {
                    "description": "Source data",
                    "fields": [
                        {
                            "description": "Source datasetId",
                            "mode": "REQUIRED",
                            "name": "datasetId",
                            "type": "STRING"
                        },
                        {
                            "description": "Source tableId",
                            "mode": "REQUIRED",
                            "name": "tableId",
                            "type": "STRING"
                        },
                        {
                            "description": "Access control data",
                            "fields": [
                                {
                                    "description": "Flag indicating if row-level access control is enabled",
                                    "mode": "REQUIRED",
                                    "name": "enabled",
                                    "type": "BOOLEAN"
                                },
                                {
                                    "description": "The column in the source table to be used for filtering access at a row-level",
                                    "mode": "REQUIRED",
                                    "name": "labelColumn",
                                    "type": "STRING"
                                },
                                {
                                    "description": "The column delimiter to use to split the source value",
                                    "mode": "REQUIRED",
                                    "name": "labelColumnDelimiter",
                                    "type": "STRING"
                                }
                            ],
                            "name": "accessControl",
                            "type": "RECORD"
                        },
                        {
                            "description": "Public access data",
                            "fields": [
                                {
                                    "description": "Flag indicating if public access is to be used",
                                    "mode": "REQUIRED",
                                    "name": "enabled",
                                    "type": "BOOLEAN"
                                },
                                {
                                    "description": "Public access query filter",
                                    "mode": "NULLABLE",
                                    "name": "queryFilter",
                                    "type": "STRING"
                                },
                                {
                                    "description": "Public access row limit",
                                    "mode": "NULLABLE",
                                    "name": "limit",
                                    "type": "INTEGER"
                                }
                            ],
                            "mode": "NULLABLE",
                            "name": "publicAccess",
                            "type": "RECORD"
                        },
                        {
                            "description": "The columns that should be made visible",
                            "mode": "REPEATED",
                            "name": "visibleColumns",
                            "type": "STRING",
                        },
                        {
                            "description": "The query filter",
                            "name": "queryFilter",
                            "type": "STRING"
                        }
                    ],
                    "mode": "NULLABLE",
                    "name": "source",
                    "type": "RECORD"
                },
                {
                    "description": "The view expiration data",
                    "fields": [
                        {
                            "description": "Flag indicating if view expiration is enabled",
                            "mode": "REQUIRED",
                            "name": "enabled",
                            "type": "BOOLEAN"
                        },
                        {
                            "description": "Flag indicating if the view should be deleted upon expiration, otherwise return zero result",
                            "mode": "REQUIRED",
                            "name": "delete",
                            "type": "BOOLEAN"
                        },
                        {
                            "description": "The time for the expiration",
                            "mode": "REQUIRED",
                            "name": "time",
                            "type": "TIMESTAMP"
                        }
                    ],
                    "mode": "NULLABLE",
                    "name": "expiration",
                    "type": "RECORD"
                },
                {
                    "description": "The custom data",
                    "fields": [
                        {
                            "description": "Optionally used to provide a custom query",
                            "mode": "REQUIRED",
                            "name": "query",
                            "type": "STRING"
                        },
                        {
                            "description": "The datasets that need to authorize access to the new view.",
                            "mode": "REPEATED",
                            "name": "authorizeFromDatasetIds",
                            "type": "STRING"
                        }
                    ],
                    "mode": "NULLABLE",
                    "name": "custom",
                    "type": "RECORD"
                },
                {
                    "description": "The timestamp the authorized view row entry was created at",
                    "mode": "REQUIRED",
                    "name": "createdAt",
                    "type": "TIMESTAMP"
                },
                {
                    "description": "The email address the account row entry was created by",
                    "mode": "REQUIRED",
                    "name": "createdBy",
                    "type": "STRING"
                },
                {
                    "description": "The flag to indicate the account was deleted",
                    "name": "isDeleted",
                    "type": "BOOLEAN"
                }
            ]
        };
        await bigqueryUtil.createTable(dsName, authorizedViewTableName, options);
    }

    console.log("Checking if latest authorizedView view exists");
    if (await bigqueryUtil.viewExists(dsName, currentAuthorizedView) === false) {
        console.log("Creating latest authorizedView view");
        const viewSql = `WITH ranked AS (\n  select\n    a.*,\n    DENSE_RANK() OVER (PARTITION BY authorizedViewId ORDER BY createdAt) as rank\n  from \`${projectId}.datashare.authorizedView\` a\n),\nrowIdentifiers AS (\n  SELECT r.rowId\n  from RANKED r\n  where r.rank = (select max(r2.rank) from RANKED r2 where r2.authorizedViewId = r.authorizedViewId)\n)\nSELECT\n * EXCEPT(rank, createdAt, isDeleted),\n UNIX_MILLIS(createdAt) as createdAt,\n rank as version,\n ifnull(isDeleted, false) as isDeleted\nFROM ranked t\nWHERE EXISTS (SELECT 1 from rowIdentifiers r WHERE t.rowId = r.rowId)`;
        await bigqueryUtil.createView(dsName, currentAuthorizedView, viewSql);
    }

    console.log("Checking if currentUserDataset view exists");
    if (await bigqueryUtil.viewExists(dsName, currentUserDataset) === false) {
        console.log("Creating latest currentUserDataset view");
        const viewSql = `with policies as (\n  select distinct\n    cp.policyId,\n    cp.name as policyName,\n    d.datasetId,\n    t.tag\n  from \`${projectId}.datashare.currentPolicy\` cp\n  cross join unnest(cp.datasets) d\n  cross join unnest(cp.rowAccessTags) t\n  where cp.isDeleted is false\n),\nuserPolicies as (\n  select\n    ca.rowId as accountRowId,\n    ca.accountId,\n    ca.email,\n    ca.emailType,\n    cp.datasetId,\n    cp.tag\n  from \`${projectId}.datashare.currentAccount\` ca\n  cross join unnest(ca.policies) as p\n  join policies cp on p.policyId = cp.policyId\n  where ca.isDeleted is false\n)\nselect distinct\n  up.accountRowId,\n  up.accountId,\n  up.email,\n  up.emailType,\n  up.datasetId,\n  up.tag\nfrom userPolicies up`;
        await bigqueryUtil.createView(dsName, currentUserDataset, viewSql);
    }
}

/**
 * @param  {} labelKey
 */
async function getDatasets(projectId, labelKey) {
    return await bigqueryUtil.getDatasetsByLabel(projectId, labelKey);
}

/**
 * @param  {} bucketName
 * @param  {} datasetId
 * @param  {} tableId
 * @param  {} transformConfig
 * @param  {} schemaConfig
 */
async function saveIngestion(bucketName, datasetId, tableId, transformConfig, schemaConfig) {
    const schemaFile = `bqds/${datasetId}/${tableId}/config/schema.json`;
    const transformFile = `bqds/${datasetId}/${tableId}/config/transform.sql`;
    if (schemaConfig) {
        console.log(`Saving ${schemaFile}: ${JSON.stringify(schemaConfig)}`);
        let schemaBuf = Buffer.from(JSON.stringify(schemaConfig, null, 3));
        storageUtil.createFile(bucketName, schemaFile, schemaBuf);
    }
    if (transformConfig) {
        console.log(`Saving ${transformFile}: ${JSON.stringify(transformConfig)}`);
        let transformBuf = Buffer.from(transformConfig);
        storageUtil.createFile(bucketName, transformFile, transformBuf);
    }
}

/**
 * @param  {} bucketName
 * @param  {} datasetId
 * @param  {} tableId
 */
async function getIngestion(bucketName, datasetId, tableId) {
    const loadDetails = datasetId !== undefined && tableId !== undefined;
    let prefix = 'bqds/';
    if (datasetId) {
        prefix += datasetId;
        if (tableId) {
            prefix += `/${tableId}/`;
        }
    }
    const options = {
        prefix: prefix
    };
    const files = await storageUtil.getAvailableFiles(bucketName, options);
    let result = {};
    for (const file of files) {
        let isDirectoryPath = false;
        let basename;
        if (file.endsWith("/")) {
            isDirectoryPath = true;
        }
        else {
            basename = path.basename(file);
        }
        const pathParts = path.dirname(file).split("/").filter(Boolean);
        if (pathParts.length >= 3) {
            const datasetId = pathParts[1];
            const tableId = pathParts[2];
            const key = `${datasetId}|${tableId}`;
            if (bigqueryUtil.isValidDatasetName(datasetId).isValid && bigqueryUtil.isValidTableName(tableId).isValid) {
                if (!(key in result)) {
                    result[key] = {};
                    result[key].key = key;
                    result[key].datasetId = datasetId;
                    result[key].tableId = tableId;
                    result[key].basePath = `${pathParts[0]}/${pathParts[1]}/${pathParts[2]}`;
                }
                if (pathParts.length >= 4 && pathParts[3] === 'config') {
                    result[key].configPathFound = true;
                    if (basename && basename === 'schema.json') {
                        result[key].schemaFileFound = true;
                        result[key].schemaFile = file;

                        if (loadDetails) {
                            const config = await storageUtil.fetchFileContent(bucketName, file)
                            const json = JSON.parse(config);
                            result[key].schemaConfig = json;
                        }
                    }
                    if (basename && basename === 'transform.sql') {
                        result[key].transformFileFound = true;
                        result[key].transformFile = file;

                        if (loadDetails) {
                            result[key].transformConfig = await storageUtil.fetchFileContent(bucketName, file);
                        }
                    }
                }
                if (pathParts.length >= 4 && pathParts[3] === 'data') {
                    result[key].dataPathFound = true;
                }
                if (pathParts.length >= 5 && pathParts[3] === 'data' && pathParts[4] === 'archive') {
                    result[key].archivePathFound = true;
                }
            }
            else {
                console.log(`Invalid key: ${key}`);
            }
        }
    }

    const keys = Object.keys(result);
    let arr = [];
    keys.forEach(k => {
        arr.push(result[k]);
    });
    return arr;
}

/**
 * @param  {} datasetId
 * @param  {} labelKey
 */
async function getTables(projectId, datasetId, labelKey) {
    return bigqueryUtil.getTablesByLabel(projectId, datasetId, labelKey);
}

/**
 * @param  {} projectId
 * @param  {} datasetId
 * @param  {} gcpAccount
 * @param  {} accessType
 * @param  {} groupByUser
 */
async function getEntitlementsOld(projectId, datasetId, gcpAccount, accessType, groupByUser) {
    const access = await bigqueryUtil.getDatasetsAccessList(projectId, datasetId, 'bqds_configuration_name');
    let list = [];
    if (groupByUser === 'true') {
        access.forEach((a) => {
            if (a.role === 'READER' && a.accessType !== 'specialGroup') {
                const key = `${a.accessType}|${a.accessId}`;
                const found = underscore.findWhere(list, { key: key });
                if (found) {
                    if (!underscore.contains(found.datasetAccess, a.datasetId)) {
                        found.datasetAccess.push(a.datasetId);
                    }
                }
                else {
                    list.push({ key: key, accessType: a.accessType, gcpAccount: a.accessId, datasetAccess: [a.datasetId] });
                }
            }
        });
    }
    else {
        access.forEach((a) => {
            if (a.role === 'READER' && a.accessType !== 'specialGroup') {
                const key = `${a.accessType}|${a.accessId}|${a.datasetId}`;
                list.push({ key: key, accessType: a.accessType, gcpAccount: a.accessId, datasetId: a.datasetId });
            }
        });
    }
    const userFilterEnabled = gcpAccount && accessType;
    if (userFilterEnabled) {
        const userFilterKey = `${accessType}|${gcpAccount}`;
        const filteredUser = underscore.where(list, { key: userFilterKey });
        return filteredUser;
    }
    else {
        return list;
    }
}

/**
 * @param  {} entitlements
 */
async function deleteEntitlementsOld(entitlements) {
    let hasUpdates = false;
    console.log(`Deleting entitlements: ${JSON.stringify(entitlements)}`);
    let grouped = underscore.groupBy(entitlements, 'datasetId');
    // For deleting a users entire entitlement, the datasetId will be undefined.
    console.log(`Deleting entitlements group by: ${JSON.stringify(grouped)}`);
    const keys = Object.keys(grouped);
    for (const datasetId of keys) {
        const group = grouped[datasetId];
        let metadata = await bigqueryUtil.getDatasetMetadata(datasetId);
        let isDirty = false;

        // Remove stale view access
        let i = metadata.access.length;
        while (i--) {
            let a = metadata.access[i];
            // console.log(`Access record: ${JSON.stringify(a)}`);
            if (a.view && a.view.projectId && a.view.datasetId && a.view.tableId) {
                console.log(`Check if view exists: ${a.view.datasetId}.${a.view.tableId}`);
                const _viewExists = await bigqueryUtil.viewExists(a.view.datasetId, a.view.tableId);
                // If view no longer exists, remove it.
                if (_viewExists === false) {
                    metadata.access.splice(i, 1);
                    isDirty = true;
                }
            }
            else if (a.role === 'READER') {
                // Get keys for the current access object.
                const aKeys = Object.keys(a);
                if (aKeys.length === 2) {
                    const accessType = aKeys[1];
                    const accessId = a[accessType];
                    let searchProps = { accessType: accessType, gcpAccount: accessId };
                    // console.log(`Search props: ${JSON.stringify(searchProps)}`);

                    // If we find the record, remove it
                    const find = underscore.findWhere(group, searchProps);
                    if (find !== undefined) {
                        // console.log(`Found user: ${accessId}, deleting`);
                        metadata.access.splice(i, 1);
                        isDirty = true;
                    }
                    else {
                        // console.log(`User not found: ${accessId}`);
                    }
                }
            }
        }

        if (isDirty === true) {
            await bigqueryUtil.setDatasetMetadata(datasetId, metadata);
            // console.log(`Metadata will be updated to: ${JSON.stringify(metadata, null, 3)}`);
            hasUpdates = true;
        }
    }
    return hasUpdates;
}

/**
 * @param  {} projectId
 * @param  {} rowId
 * @param  {} accountId
 * @param  {} email
 * @param  {} emailType
 * @param  {} addedPolicies
 * @param  {} removedPolicies
 * @param  {} createdBy
 */
async function saveAccount(projectId, rowId, accountId, email, emailType, addedPolicies, removedPolicies, createdBy) {
    let policies = [];
    const currentAccount = await getAccount(projectId, accountId, null, email, emailType);
    if (accountId) {
        if (currentAccount && currentAccount.rowId !== rowId) {
            return { error: 'STALE' };
        }
        else if (currentAccount) {
            policies = currentAccount.policies.map(p => { return { policyId: p.policyId }; })
        }

        console.log(`Current policies: ${JSON.stringify(policies)}`);

        addedPolicies.forEach(p => {
            const found = underscore.findWhere(policies, { policyId: p.policyId });
            if (!found) {
                policies.push({ policyId: p });
            }
        });

        removedPolicies.forEach(p => {
            var i = policies.length;
            while (i--) {
                console.log(`Iterating policy: ${JSON.stringify(policies[i])}`);
                if (policies[i].policyId === p) {
                    policies.splice(i, 1);
                    break;
                }
            }
        });
    }
    else {
        addedPolicies.forEach(p => {
            policies.push({ policyId: p });
        });
    }

    // The accountId
    let uuid;
    if (currentAccount) {
        uuid = currentAccount.accountId;
    }
    else {
        uuid = uuidv4();
    }

    // The rowId
    const uniqueId = uuidv4();

    let queryParams = { rowId: uniqueId, accountId: uuid, email: email, emailType: emailType, createdBy: createdBy };
    let insertAddition = "";
    let valueAddition = "";

    if (policies && policies.length > 0) {
        insertAddition += ", policies";
        valueAddition += ", @policies";
        queryParams.policies = policies;
    }

    const sqlQuery = `insert into \`${projectId}.datashare.account\`
    (rowId, accountId, email, emailType, accountType, createdBy, createdAt${insertAddition})
    values(@rowId, @accountId, @email, @emailType, 'consumer', @createdBy, current_timestamp()${valueAddition})`;

    const options = {
        query: sqlQuery,
        params: queryParams
    };

    console.log(`Will write data: ${JSON.stringify(options, null, 3)}`);
    const [rows] = await bigqueryUtil.executeQuery(options);
    console.log(JSON.stringify(rows));

    const impactedPolicies = addedPolicies.concat(removedPolicies);
    await performMetadataUpdate(projectId, impactedPolicies);

    return { success: true };
}

/**
 * @param  {} gcpAccount
 * @param  {} accessType
 * @param  {} added
 * @param  {} removed
 */
async function updateAccountEntitlementsOld(gcpAccount, accessType, added, removed) {
    let hasUpdates = false;
    let datasets = added.concat(removed);
    for (const datasetId of datasets) {
        let metadata = await bigqueryUtil.getDatasetMetadata(datasetId);
        let isDirty = false;

        const removeUser = underscore.contains(removed, datasetId);
        const addUser = underscore.contains(added, datasetId);

        // Remove stale view access
        let i = metadata.access.length;
        while (i--) {
            let a = metadata.access[i];
            // console.log(`Access record: ${JSON.stringify(a)}`);
            if (a.view && a.view.projectId && a.view.datasetId && a.view.tableId) {
                console.log(`Check if view exists: ${a.view.datasetId}.${a.view.tableId}`);
                const _viewExists = await bigqueryUtil.viewExists(a.view.datasetId, a.view.tableId);
                // If view no longer exists, remove it.
                if (_viewExists === false) {
                    metadata.access.splice(i, 1);
                    isDirty = true;
                }
            }
            else if (removeUser === true && a.role === 'READER') {
                // Get keys for the current access object.
                const aKeys = Object.keys(a);
                if (aKeys.length === 2) {
                    const _accessType = aKeys[1];
                    const accessId = a[accessType];

                    if (accessType === _accessType && gcpAccount === accessId) {
                        // If we find the record, remove it
                        console.log(`Found user: ${accessId}, deleting`);
                        metadata.access.splice(i, 1);
                        isDirty = true;
                    }
                    else {
                        console.log(`User not found: ${accessId}`);
                    }
                }
            }
        }

        if (addUser === true) {
            let record = { role: 'READER' };
            record[accessType] = gcpAccount;
            console.log(`Adding access record to datasetId: ${datasetId}: ${JSON.stringify(record)}`);
            metadata.access.push(record);
            isDirty = true;
        }

        if (isDirty === true) {
            await bigqueryUtil.setDatasetMetadata(datasetId, metadata);
            // console.log(`Metadata will be updated to: ${JSON.stringify(metadata, null, 3)}`);
            hasUpdates = true;
        }
    }
    return hasUpdates;
}

/**
 * @param  {} projectId
 * @param  {} datasetId
 */
async function deleteDataset(projectId, datasetId) {
    return bigqueryUtil.deleteDataset(datasetId, false);
}

/**
 * @param  {} projectId
 * @param  {} datasetId
 * @param  {} tableId
 */
async function deleteTable(projectId, datasetId, tableId) {
    return bigqueryUtil.deleteTable(datasetId, tableId);
}

/**
 * @param  {} projectId
 * @param  {} datasetId
 * @param  {} description
 */
async function createDataset(projectId, datasetId, description) {
    const options = {};
    options.labels = {};
    options.labels[labelName] = "true";
    if (description) {
        options.description = description;
    }
    return bigqueryUtil.createDataset(datasetId, options);
}

/**
 * @param  {} projectId
 * @param  {} datasetId
 * @param  {} tableId
 */
async function getTableColumns(projectId, datasetId, tableId) {
    let availableColumns = await bigqueryUtil.tableColumns(datasetId, tableId);
    return availableColumns;
}

module.exports = {
    getDatasets,
    getTables,
    getEntitlementsOld,
    deleteDataset,
    createDataset,
    deleteTable,
    saveAccount,
    updateAccountEntitlementsOld,
    getAccount,
    deleteAccount,
    deleteEntitlementsOld,
    getIngestion,
    saveIngestion,
    getPolicy,
    savePolicy,
    deletePolicy,
    getPolicyAccounts,
    syncAllPolicies,
    getView,
    saveView,
    deleteView,
    validateView,
    getTableColumns
};