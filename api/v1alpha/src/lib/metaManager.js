/**
 * Copyright 2020 Google LLC
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

const { BigQueryUtil } = require('cds-shared');
const underscore = require("underscore");
let bigqueryUtil = new BigQueryUtil();
const cfg = require('./config');

/**
 * @param  {} projectId
 * @param  {} dataset
 * @param  {} accounts
 */
async function performDatasetMetadataUpdate(projectId, datasetId, accounts) {
    console.log(`Begin metadata update for dataset: ${datasetId}`);
    let isDirty = false;
    let accessTypes = ["userByEmail", "groupByEmail"];

    // 0. Check for existance of the datasetId and handle appropriately

    // 1. Get metadata
    let metadata;
    try {
        metadata = await bigqueryUtil.getDatasetMetadata(datasetId);
    } catch (err) {
        throw err;
    }

    console.log(`Removing access for all accounts with role of READER in dataset: ${datasetId}`);
    // 2. Check for and remove any non-existing authorized views
    // Remove stale view access
    let i = metadata.access.length;
    while (i--) {
        let a = metadata.access[i];
        if (a.view && a.view.projectId && a.view.datasetId && a.view.tableId) {
            const _viewExists = await bigqueryUtil.viewExists(a.view.datasetId, a.view.tableId);
            // If view no longer exists, remove it.
            if (_viewExists === false) {
                console.log(`Removing authorized view as it does not exist: ${a.view.datasetId}.${a.view.tableId}`);
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
                    console.log(`Deleting user: ${accessType}:${accessId} from datasetId: ${datasetId}`);
                    metadata.access.splice(i, 1);
                    isDirty = true;
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
            console.log(`Adding access record to datasetId: ${datasetId}: ${JSON.stringify(account)}`);
        }
    });

    // 5. Save metadata if changed
    if (isDirty === true) {
        try {
            await bigqueryUtil.setDatasetMetadata(datasetId, metadata);
            console.info(`Metadata set successfully for dataset '${datasetId}'`);
        } catch (err) {
            console.error(`Failed to set metadata for dataset '${datasetId}' with error '${err}' and payload: ${JSON.stringify(metadata)}`);
            throw err;
        }
    }

    console.log(`End metadata update for dataset: ${datasetId}`);
    return isDirty;
}

/**
 * @param  {} projectId
 * @param  {} policyIds
 * @param  {} fullRefresh
 */
async function performPolicyUpdates(projectId, policyIds, fullRefresh) {
    const labelKey = cfg.cdsManagedLabelKey;
    let options = {};
    if (!fullRefresh && policyIds && policyIds.length > 0) {
        options = {
            query: `CALL \`${projectId}.datashare.permissionsDiff\`(@policyIds)`,
            params: { policyIds: policyIds }
        };
    } else {
        options = {
            query: `CALL \`${projectId}.datashare.permissionsDiff\`(null)`
        };
    }

    const [rows] = await bigqueryUtil.executeQuery(options);
    console.log(`Permission Diff Result: ${JSON.stringify(rows, null, 3)}`);

    if (fullRefresh === true) {
        // Update all managed datasets and tables
        const datasets = await bigqueryUtil.getDatasetsByLabel(projectId, labelKey);
        for (const dataset of datasets) {
            const datasetId = dataset.datasetId;
            console.log(`Iterating over dataset: ${datasetId}`);

            let dsPolicyRecord = underscore.findWhere(rows, { datasetId: datasetId, isTableBased: false });
            console.log(dsPolicyRecord);
            let accounts = [];
            if (dsPolicyRecord) {
                accounts = dsPolicyRecord.accounts;
            }
            await performDatasetMetadataUpdate(projectId, datasetId, accounts);

            const tables = await bigqueryUtil.getTablesByLabel(projectId, datasetId, labelKey);
            for (const table of tables) {
                const tableId = table.tableId;
                console.log(`Iterating over table: ${datasetId}.${tableId}`);
            }
        }
    } else {
        // Differential update, iterate over result based on the policyId filter only.
        // No need to apply an additional filter.
        for (const row of rows) {
            const datasetId = row.datasetId;
            const tableId = row.tableId;
            if (row.isTableBased === true) {
                console.log(`Iterating over table: ${datasetId}.${tableId}`);
                // Call new table based update function
            } else {
                console.log(`Iterating over dataset: ${datasetId}`);
                await performDatasetMetadataUpdate(projectId, datasetId, row.accounts);
            }
        }
    }

    // If fullRefresh is specified, iterate over all managed datasets, removing all access and updating

    /*
        policyIds should include policies for which where added from/to an account and policies that were created/modified/deleted
        There are two main scenarios:
            1) When a policy is created/modified/deleted, in which case a record is added to the policy table for each. For policy modifications, we must look at the previous record to find previous datasets/tables.
            2) When an account is modified and a policy is added or removed.
    */

    // Using the policyIds, get the list of impacted Datasets and Tables

    // Aggregate the access required for Datasets and Tables

    // Iterate over Datasets, removing all READER access, and update permissions as required

    // Iterate over Tables, removing all READER access, and update permssions as required
}

/**
 * @param  {} projectId
 * @param  {} policyIds
 * @param  {} datasetIds
 */
async function performMetadataUpdate(projectId, policyIds, datasetIds) {
    await performPolicyUpdates(projectId, policyIds, false);
    return;

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
        return;
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
    console.log(`User access to update: ${JSON.stringify(rows, null, 3)}`);

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

module.exports = {
    performMetadataUpdate,
    performPolicyUpdates
};
