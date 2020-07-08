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
let bigqueryUtil = new BigQueryUtil();
const uuidv4 = require('uuid/v4');

const ConfigValidator = require('./views/configValidator');
const sqlBuilder = require('./views/sqlBuilder');
const metaManager = require('../lib/metaManager');
const cfg = require('../lib/config');

/**
 * @param  {string} projectId
 * @param  {string} datasetId
 * @param  {string} tableId
 * Get the FQDN format for a project's table or view name
 */
function getTableFqdn(projectId, datasetId, tableId) {
    return `${projectId}.${datasetId}.${tableId}`;
}

/**
 * @param  {} projectId
 * @param  {} fields
 * @param  {} values
 * @param  {} data
 */
async function _deleteData(projectId, fields, values, data) {
    const table = getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsAuthorizedViewTableId);
    const sqlQuery = `INSERT INTO \`${table}\` (${fields})
        SELECT ${values}
        FROM \`${table}\`
        WHERE rowId = @incomingRowId`;

    console.log(sqlQuery);
    const options = {
        query: sqlQuery,
        params: data
    };
    const bigqueryUtil = new BigQueryUtil(projectId);
    return await bigqueryUtil.executeQuery(options);
}

/**
 * @param  {string} projectId
 * Get a list of Datasets based off labelKey string
 */
async function listDatasets(projectId) {
    const labelKey = cfg.cdsManagedLabelKey;
    const datasets = await bigqueryUtil.getDatasetsByLabel(projectId, labelKey).catch(err => {
        console.warn(err);
        return { success: false, errors: [err.message] };
    });
    if (datasets === undefined) {
        const message = `Datasets do not exist with labelKey: '${labelKey}'`;
        return { success: false, code: 400, errors: [message] };
    }
    return { success: true, data: datasets }
}

/**
 * @param  {string} projectId
 * @param  {string} datasetId
 * Create a Dataset based off labelKey string
 */
async function createDataset(projectId, datasetId, description) {
    const options = {};
    options.labels = { [cfg.cdsManagedLabelKey]: "true" };
    if (description) {
        options.description = description;
    }
    const bigqueryUtil = new BigQueryUtil(projectId);
    const dataset = await bigqueryUtil.createDataset(datasetId, options).catch(err => {
        console.warn(err);
        return { success: false, errors: [err.message] };
    });
    if (dataset.success === false) {
        return { code: 400, ...dataset };
    }
    if (dataset === undefined || dataset === null) {
        const message = `DatasetId: '${datasetId}' creation failed.`;
        return { success: false, errors: [message] };
    }
    return {
        success: dataset.success,
        data: {
            datasetId: dataset.id,
            metadata: dataset.metadata
        }
    };
}

/**
 * @param  {} projectId
 * @param  {} datasetId
 * @param  {} description
 */
async function updateDataset(projectId, datasetId, description) {
    try {
        const metadata = await bigqueryUtil.getDatasetMetadata(datasetId);
        metadata.description = description;
        await bigqueryUtil.setDatasetMetadata(datasetId, metadata);
        return { success: true };
    }
    catch (err) {
        const message = `Error setting metadata for datasetId: ${datasetId}`;
        return { success: false, errors: [message] };
    }
}

/**
 * @param  {string} projectId
 * @param  {string} datasetId
 * Get a Datasets based off datasetId and labelKey string
 */
async function getDataset(projectId, datasetId) {
    const labelKey = cfg.cdsManagedLabelKey;
    const dataset = await bigqueryUtil.getDatasetMetadata(datasetId).catch(err => {
        console.warn(err);
        return { success: false, errors: [err.message] };
    });
    if (dataset.success === false) {
        return { code: 400, ...dataset };
    }
    if (dataset.labels === undefined || dataset.labels[cfg.cdsManagedLabelKey] != "true") {
        const message = `Dataset do not exist with datasetId: '${datasetId}', labelKey: '${labelKey}'`;
        return { success: false, code: 400, errors: [message] };
    }
    const data = {
        datasetId: dataset.datasetReference.datasetId,
        description: dataset.description,
        modifiedTime: dataset.lastModifiedTime
    };
    return { success: true, data: data }
}

/**
 * @param  {} projectId
 * @param  {} datasetId
 * @param  {} createdBy
 */
async function deleteDataset(projectId, datasetId, createdBy) {
    const result = await bigqueryUtil.deleteDataset(datasetId, false);
    if (result) {
        // Update and delete related views
        const viewStatement = `insert into \`datashare.authorizedView\` (rowId, authorizedViewId, name, description, datasetId, source, expiration, custom, createdAt, createdBy, viewSql, isDeleted)
        select GENERATE_UUID(), authorizedViewId, name, description, datasetId, source, expiration, custom, CURRENT_TIMESTAMP(), @createdBy, viewSql, true
        from \`datashare.currentAuthorizedView\`
        where datasetId = @datasetId and isDeleted = false`;

        const bigqueryUtil = new BigQueryUtil(projectId);

        // console.log(`Executing view update: ${viewStatement}`);
        const viewOptions = {
            query: viewStatement,
            params: { createdBy: createdBy, datasetId: datasetId }
        };
        await bigqueryUtil.executeQuery(viewOptions);

        // Updated related policies to remove the deleted dataset
        const policyStatement = `INSERT INTO \`datashare.policy\` (rowId, policyId, name, description, isTableBased, datasets, rowAccessTags, createdBy, createdAt, isDeleted)
    WITH datasetRows as (
      SELECT rowId
      FROM \`datashare.currentPolicy\` cp
      WHERE cp.isDeleted = false AND EXISTS (SELECT 1
        FROM UNNEST(cp.datasets)
        WHERE datasetId = @datasetId)
    ),
    datasets as (
      SELECT cp.rowId, d.datasetId
      FROM \`datashare.currentPolicy\` cp
      CROSS JOIN cp.datasets d
      JOIN datasetRows dr on cp.rowId = dr.rowId
    ),
    availableDatasets as (
      SELECT schema_name as datasetId
      FROM INFORMATION_SCHEMA.SCHEMATA
    ),
    policyDatasets as (
      SELECT d.rowId, ARRAY_AGG(STRUCT(d.datasetId)) as datasets
      FROM datasets d
      JOIN availableDatasets a on a.datasetId = d.datasetId
      GROUP BY d.rowId
    )
    select
      GENERATE_UUID() as rowId,
      policyId,
      name,
      description,
      isTableBased,
      pd.datasets,
      rowAccessTags,
      @createdBy,
      CURRENT_TIMESTAMP() as createdAt,
      isDeleted
    FROM datasetRows dr
    JOIN \`datashare.currentPolicy\` cp on dr.rowId = cp.rowId
    LEFT JOIN policyDatasets pd on cp.rowId = pd.rowId;`;

        // console.log(`Executing policy update: ${policyStatement}`);
        const policyOptions = {
            query: policyStatement,
            params: { createdBy: createdBy, datasetId: datasetId }
        };
        await bigqueryUtil.executeQuery(policyOptions);

        console.log(`Dataset '${datasetId} deleted`);
        return { success: true }
    }
    else {
        console.error(`Failed to delete dataset '${datasetId}'`);
        return { success: false, errors: ['Failed to delete dataset'] };
    }
}

/**
 * @param  {} projectId
 * @param  {} datasetId
 * @param  {} labelKey
 */
async function listTables(projectId, datasetId, labelKey) {
    try {
        let tables = await bigqueryUtil.getTablesByLabel(projectId, datasetId, labelKey);
        return { success: true, data: tables }
    } catch (err) {
        return { success: false, errors: ['Failed to retrieve tables', err] };
    }
}

/**
 * @param  {} projectId
 * @param  {} datasetId
 * @param  {} tableId
 */
async function listTableColumns(projectId, datasetId, tableId) {
    try {
        let availableColumns = await bigqueryUtil.tableColumns(datasetId, tableId);
        return { success: true, data: availableColumns }
    } catch (err) {
        return { success: false, errors: ['Failed to retrieve columns'] };
    }
}

/**
 * @param  {} projectId
 * @param  {} datasetId
 * @param  {} includeAllFields
 */
async function listDatasetViews(projectId, datasetId, includeAllFields) {
    const table = getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsAuthorizedViewViewId);
    let fields = new Set(cfg.cdsAuthorizedViewViewFields);
    if (!includeAllFields) {
        let remove = [];
        remove.push('source', 'expiration', 'custom', 'viewSql', 'isDeleted');
        remove.forEach(f => fields.delete(f));
    }
    fields = Array.from(fields).map(i => 'v.' + i).join();
    let sqlQuery = `SELECT ${fields}
      FROM \`${table}\` v
      WHERE isDeleted IS false`;

    if (datasetId) {
        sqlQuery += '\nAND datasetId = @datasetId'
    }

    let options = {
        query: sqlQuery
    };

    if (datasetId) {
        options.params = { datasetId: datasetId };
    }

    const [rows] = await bigqueryUtil.executeQuery(options);
    return { success: true, data: rows }
}

/**
 * @param  {} projectId
 * @param  {} datasetId
 * @param  {} viewId
 */
async function getDatasetView(projectId, datasetId, viewId) {
    const table = getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsAuthorizedViewViewId);
    let fields = new Set(cfg.cdsAuthorizedViewViewFields);
    let remove = ['version', 'isDeleted', 'createdBy', 'createdAt', 'viewSql'];
    remove.forEach(f => fields.delete(f));
    fields = Array.from(fields).map(i => 'v.' + i).join();
    const sqlQuery = `SELECT ${fields}
        FROM \`${table}\` v
        WHERE authorizedViewId = @authorizedViewId and isDeleted is false`;
    const options = {
        query: sqlQuery,
        params: { authorizedViewId: viewId }
    };
    const [rows] = await bigqueryUtil.executeQuery(options);
    if (rows.length === 1) {
        const result = rows[0];
        if (result.expiration && result.expiration.time && result.expiration.time.value) {
            // When querying using the node lib time is returned in a 'value' key
            result.expiration.time = result.expiration.time.value;
        }
        console.log(result);
        return { success: true, data: result }
    }
    else {
        const message = `View not found with authorizedViewId: '${viewId}'`;
        return { success: false, code: 500, errors: [message] };
    }
}

/**
 * @param  {} projectId
 * @param  {} datasetId
 * @param  {} view
 * @param  {} includeSampleData
 */
async function validateDatasetView(projectId, datasetId, view, includeSampleData) {
    if (view.authorizedViewId) {
        const currentView = await getDatasetView(projectId, datasetId, view.authorizedViewId);
        if (currentView.success && currentView.data.rowId !== view.rowId) {
            return { success: false, code: 500, errors: ["STALE"] };
        }
    }
    try {
        let configValidator = new ConfigValidator();
        const result = await configValidator.validate(view);
        console.log(result);

        let response = { success: result.isValid, data: result, code: result.isValid ? 200 : 400 };
        if (result.isValid && includeSampleData) {
            let deepClone = JSON.parse(JSON.stringify(view));
            // Disable access control for the sample data
            if (!deepClone.accessControl) {
                deepClone.accessControl = { enabled: false };
            } else {
                deepClone.accessControl.enabled = false;
            }
            const sql = await sqlBuilder.generateSql(deepClone, false);
            console.log(sql);
            const validateQueryResponse = await bigqueryUtil.validateQuery(sql, 20, includeSampleData);
            if (validateQueryResponse.rows.length > 0) {
                response.data.rows = validateQueryResponse.rows;

                let columns = [];
                let keys = [];
                validateQueryResponse.rows.forEach(row => {
                    Object.keys(row).forEach(function (key) {
                        const val = row[key];
                        if (
                            typeof val === 'object' &&
                            !Array.isArray(val) &&
                            val !== null
                        ) {
                            const valKey = `${key}.value`;
                            if (!keys.includes(valKey)) {
                                keys.push(valKey);
                                columns.push({ name: key, path: valKey });
                            }
                        } else {
                            if (!keys.includes(key)) {
                                keys.push(key);
                                columns.push({ name: key, path: key });
                            }
                        }
                    });
                });

                response.data.columns = columns;
            } else {
                response.data.rows = [];
                response.data.columns = [];
            }
        }
        return response;
    } catch (err) {
        console.log(err);
        const message = `Failed to validate view`;
        return { success: false, isValid: false, code: 500, errors: [message] };
    }
}

/**
 * @param  {} projectId
 * @param  {} datasetId
 * @param  {} viewId
 * @param  {} data
 */
async function createOrUpdateDatasetView(projectId, datasetId, viewId, view, createdBy) {
    let _viewId = viewId;
    if (viewId) {
        const currentView = await getDatasetView(projectId, datasetId, viewId);
        if (currentView.success && currentView.data.rowId !== view.rowId) {
            return { success: false, code: 500, errors: ["View has been modified in another session."] };
        }
    }
    else {
        _viewId = uuidv4();
    }

    // Perform validation
    console.log('performing validation');
    let configValidator = new ConfigValidator();
    const result = await configValidator.validate(view);
    console.log(`validation response: ${JSON.stringify(result)}`);
    if (!result.isValid) {
        return { success: false, data: result, code: 400, errors: ['View validation failed'] };
    }

    const viewSql = await sqlBuilder.generateSql(view);

    const rowId = uuidv4();
    const isDeleted = false;
    const createdAt = new Date().toISOString();

    let data = {
        rowId: rowId,
        authorizedViewId: _viewId,
        name: view.name,
        description: view.description,
        datasetId: view.datasetId,
        createdBy: createdBy,
        createdAt: createdAt,
        isDeleted: isDeleted,
        viewSql: viewSql
    };

    if (view.source) {
        data.source = {};
        Object.assign(data.source, view.source);
    }
    if (view.custom) {
        data.custom = {};
        Object.assign(data.custom, view.custom);
    }
    if (view.accessControl) {
        data.accessControl = {};
        Object.assign(data.accessControl, view.accessControl);
    }
    if (view.expiration) {
        data.expiration = {};
        Object.assign(data.expiration, view.expiration);

        if (view.expiration.time) {
            data.expiration.time = new Date(view.expiration.time);
        }
        if (!view.expiration.hasOwnProperty('delete')) {
            data.expiration.delete = false;
        }
    }

    console.log(data);

    await bigqueryUtil.insertRows(cfg.cdsDatasetId, cfg.cdsAuthorizedViewTableId, data);
    return await createView(view);
}

/**
 * @param  {} view
 * @param  {} overrideSql
 */
async function createView(view, overrideSql) {
    let viewSql = overrideSql;
    try {
        if (!viewSql) {
            viewSql = await sqlBuilder.generateSql(view);
        }
        let metadataResult = await bigqueryUtil.getTableMetadata(view.datasetId, view.name);

        let viewMetadata = metadataResult.metadata;
        const viewExists = metadataResult.exists;

        let createViewResult;
        let configuredExpirationTime = view.expiration && view.expiration.delete === true ? view.expiration.time : null;

        let viewDescription = `This view was generated by ${cfg.productName}. ${view.description}`;
        let labels = {};
        labels[cfg.cdsManagedLabelKey] = true;

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
                if (cfg.verboseMode) {
                    console.log(`expirationTime for view '${view.name}' is in-sync`);
                }
            }
        }
        else {
            createViewResult = await bigqueryUtil.createView(view.datasetId, view.name, viewSql, viewOptions, true);
        }

        let viewCreated = createViewResult && createViewResult.success;
        console.log("Authorizing view objects for access from other datasets");
        if (view.hasOwnProperty('source') && view.source !== null) {
            let source = view.source;
            if (source.datasetId !== view.datasetId) {
                // Need to authorize the view from the source tables
                await bigqueryUtil.shareAuthorizeView(source.datasetId, view.projectId, view.datasetId, view.name, viewCreated);
            }
            if (view.accessControl && view.accessControl.enabled === true && cfg.cdsDatasetId !== view.datasetId) {
                await bigqueryUtil.shareAuthorizeView(cfg.cdsDatasetId, view.projectId, view.datasetId, view.name, viewCreated);
            }
        }
        else if(view.hasOwnProperty('custom') && view.custom !== null) {
            // Custom sql
            let custom = view.custom;
            if (custom.authorizeFromDatasetIds && custom.authorizeFromDatasetIds.length > 0) {
                for (const d of view.custom.authorizeFromDatasetIds) {
                    await bigqueryUtil.shareAuthorizeView(d, view.projectId, view.datasetId, view.name, viewCreated);
                }
            }
        }

        return { success: true, data: {} };
    }
    catch (err) {
        console.error(`Failed to create view: ${JSON.stringify(view)} - ${JSON.stringify(err)}`);
        return { success: false, code: 500, errors: [err.message] };
    }
}

/**
 * @param  {} projectId
 * @param  {} datasetId
 * @param  {} viewId
 * @param  {} data
 */
async function deleteDatasetView(projectId, datasetId, viewId, data) {
    const currentView = await getDatasetView(projectId, datasetId, viewId);
    if (!currentView.success) {
        return { success: false, code: 404, errors: ["ViewId not found"] };
    }
    if (currentView.success && currentView.data.rowId !== data.rowId) {
        return { success: false, code: 500, errors: ["STALE"] };
    }

    let fields = [...cfg.cdsAuthorizedViewTableFields];
    let values = ['@rowId', 'authorizedViewId', 'name', 'description', 'datasetId', 'source', 'custom', 'accessControl', 'expiration', 'current_timestamp()', '@createdBy', 'viewSql', 'true'];
    fields = Array.from(fields).join();
    values = Array.from(values).join();

    const rowId = uuidv4();
    let params = { rowId: rowId, createdBy: data.createdBy, incomingRowId: data.rowId };
    try {
        await _deleteData(projectId, fields, values, params);
        await bigqueryUtil.deleteTable(currentView.data.datasetId, currentView.data.name, false);
        return { success: true, data: {} };
    } catch (err) {
        console.log(err);
        const message = `View did not delete with data values: '${data}'`;
        return { success: false, code: 500, errors: [message] };
    }
}

module.exports = {
    listDatasets,
    createDataset,
    updateDataset,
    getDataset,
    deleteDataset,
    listTables,
    listTableColumns,
    listDatasetViews,
    getDatasetView,
    validateDatasetView,
    createOrUpdateDatasetView,
    deleteDatasetView,
    createView
};
