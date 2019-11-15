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

const { BigQuery } = require('@google-cloud/bigquery');

const TableType = {
    BASE_TABLE: 'BASE TABLE',
    VIEW: 'VIEW'
};

let bigqueryClient;

/**
 * @param {} projectId
 */
function init(projectId) {
    if (bigqueryClient === undefined) {
        bigqueryClient = new BigQuery({
            projectId: projectId
        });
    }
}

/**
 * @param  {} options
 */
async function executeQuery(options) {
    const [job] = await bigqueryClient.createQueryJob(options);
    if (process.env.VERBOSE_MODE) {
        console.log(`Job '${job.id}' started for query: ${JSON.stringify(options)}`);
    }
    return await job.getQueryResults();
}

/**
 * @param  {} sql
 */
async function validateQuery(sql, limit) {
    let _sql = sql.trim();
    if (limit && limit > 0) {
        let regex = /(.+limit\s)([\d]+)$/gi;
        let found = _sql.match(regex);
        if (found !== null) {
            // If "limit n$" exists at the end of the string, update the limit count
            _sql = _sql.replace(regex, `$1${limit}`);
        }
        else {
            _sql = `${sql}\nlimit ${limit}`;
        }
    }

    const options = {
        query: _sql
    };

    try {
        const [rows] = await executeQuery(options);
        return true;
    } catch (error) {
        if (process.env.VERBOSE_MODE) {
            console.log("ERROR: %s - Query: '%s' is invalid", error, _sql);
        }
        return false;
    }
}

/**
 * @param  {} datasetId
 * @param  {} tableId
 * Returns an array of column names in the table
 */
async function tableColumns(datasetId, tableId) {
    const options = {
        query: "select column_name from `" + datasetId + ".INFORMATION_SCHEMA.COLUMNS` where table_name = @_tableName order by ordinal_position",
        params: { _tableName: tableId },
    };
    const [rows] = await executeQuery(options);
    let columns = [];
    rows.forEach(row => columns.push(row.column_name));
    return columns;
}

/**
 * @param  {} datasetId
 * @param  {} tableId
 */
async function tableExists(projectId, datasetId, tableId) {
    return objectExists(projectId, datasetId, tableId, TableType.BASE_TABLE);
}

/**
 * @param  {} datasetId
 * @param  {} tableId
 */
async function viewExists(projectId, datasetId, viewId) {
    return objectExists(projectId, datasetId, viewId, TableType.VIEW);
}

/**
 * @param  {} datasetId
 * @param  {} tableId
 * @param  {} tableType
 * See https://cloud.google.com/bigquery/docs/information-schema-intro for more information on using information_schema tables
 * See https://cloud.google.com/bigquery/docs/views for more information on views.
 * TODO: This should have more integrity than a try/catch. Other exceptions may be raised outside of a non-existant project or dataset which will cause a false return to be mis-leading.
 * Instead of using the information_schema tables, we can switch to using datasets and tables instead.
  */
async function objectExists(projectId, datasetId, tableId, tableType) {
    try {
        const options = {
            query: "select count(*) as count from `" + projectId + "." + datasetId + ".INFORMATION_SCHEMA.TABLES` where table_type = @_tableType and table_name = @_tableName",
            params: { _tableType: tableType, _tableName: tableId },
        };
        const [rows] = await executeQuery(options);
        if (rows.length === 1 && rows[0].count === 1) {
            return true;
        }
    } catch (error) {
        if (process.env.VERBOSE_MODE) {
            console.log(`objectExists threw an error: ${error}`);
        }
    }
    return false;
}

/**
 */
async function getDatasets() {
    return bigqueryClient.getDatasets();
}

/**
 * @param  {} datasetId
 */
async function datasetExists(datasetId, datasets) {
    let [datasetList] = [];
    if (datasets) {
        datasetList = datasets;
    }
    if (!datasetList) {
        [datasetList] = await bigqueryClient.getDatasets();
    }
    let found = datasetList.find((dataset) => {
        return dataset.id.toLowerCase() === datasetId.toLowerCase();
    });
    return found !== undefined;
}

/**
 * @param  {} datasetId
 */
async function getDatasetMetadata(datasetId) {
    const dataset = bigqueryClient.dataset(datasetId);
    let _metadata;

    // https://cloud.google.com/nodejs/docs/reference/bigquery/3.0.x/Dataset#getMetadata
    await dataset.getMetadata().then((data) => {
        const metadata = data[0];
        const apiResponse = data[1];
        _metadata = metadata;
        return;
    });

    // Should have boolean return, handling errors or throwing to caller
    if (process.env.VERBOSE_MODE) {
        console.log(`getDatasetMetadata result for datasetId: ${datasetId}:\n${JSON.stringify(_metadata, null, 2)}`);
    }

    return _metadata;
}

/**
 * @param  {} datasetId
 * @param  {} tableId
 */
async function getTableMetadata(datasetId, tableId) {
    const dataset = bigqueryClient.dataset(datasetId);
    const table = dataset.table(tableId);

    let metadata;
    let exists = true;
    let datasetExists = true;
    let tableExists = true;
    let error = false;
    let errorMessage;

    try {
        // https://cloud.google.com/nodejs/docs/reference/bigquery/1.3.x/Table#getMetadata
        await table.getMetadata().then((data) => {
            const _metadata = data[0];
            const apiResponse = data[1];
            metadata = _metadata;
            return;
        });
    } catch (err) {
        exists = false;
        error = true;
        errorMessage = err.message;
        if (errorMessage) {
            if (errorMessage.startsWith('Not found: Dataset ')) {
                datasetExists = false;
            }
            else if (errorMessage.startsWith('Not found: Table ')) {
                tableExists = false;
            }
        }
    }

    if (process.env.VERBOSE_MODE) {
        console.log(`getTableMetadata result for datasetId: '${datasetId}' and tableId: '${tableId}':\n${JSON.stringify(metadata, null, 2)}`);
    }

    return { metadata, exists, datasetExists, tableExists, error, errorMessage };
}

/**
 * @param  {} projectId
 * @param  {} datasetId
 * @param  {} tableId
 * @param  {} query
 * @param  {} deleteIfExists
 * @param  {} configurationName
 * @param  {} expirationTime
 */
async function createView(projectId, datasetId, tableId, query, deleteIfExists, description, labels, expirationTime) {
    if (deleteIfExists && deleteIfExists === true) {
        const exists = await viewExists(projectId, datasetId, tableId);
        if (exists === true) {
            console.log("View '%s' already exists, deleting it", tableId);
            await deleteTable(datasetId, tableId);
        }
    }

    // For all options, see https://cloud.google.com/bigquery/docs/reference/v2/tables#resource
    let options = {
        view: {
            query: query,
            useLegacySql: false
        }
    };

    if (description) {
        options.description = description;
    }

    if (labels) {
        options.labels = labels;
    }

    if (expirationTime) {
        options.expirationTime = expirationTime;
    }

    try {
        const [table] = await bigqueryClient
            .dataset(datasetId)
            .createTable(tableId, options);

        if (process.env.VERBOSE_MODE) {
            console.log(`View '${table.id}' created.`);
        }

        return { success: true, metadata: table.metadata };
    } catch (error) {
        console.log(`Failed to create view '${tableId}' with error: ${error}`);
        return { success: false };
    }
}

/**
 * @param  {} datasetId
 * @param  {} tableId
 * @param  {} schema
 */
async function createTable(datasetId, tableId, schema, description) {
    // For all options, see https://cloud.google.com/bigquery/docs/reference/v2/tables#resource
    let options = {
        schema: schema
    };

    if (description) {
        options.description = description;
    }

    // Create a new table in the dataset
    const [table] = await bigqueryClient
        .dataset(datasetId)
        .createTable(tableId, options);

    if (process.env.VERBOSE_MODE) {
        console.log(`Table ${table.id} created.`);
    }
    return true;
}

/**
 * @param  {} datasetId
 * @param  {} tableId
 */
async function deleteTable(datasetId, tableId) {
    try {
        await bigqueryClient
            .dataset(datasetId)
            .table(tableId)
            .delete();

        if (process.env.VERBOSE_MODE) {
            console.log(`Table ${tableId} deleted`);
        }
        return true;
    } catch (error) {
        console.log("Failed to delete table '%s', error: %s", tableId, error);
        return false;
    }
}

/**
 * @param  {} sourceDatasetId
 * @param  {} authorizeProject
 * @param  {} authorizeDataset
 * @param  {} authorizeView
 * Apply permissions from source data to the authorized view
 * Grant source dataset access to the new authorized view
 * Note: If an authorized view was defined, and it's dependent object was deleted, the authorized view record still exists in the dataset.
 * In order to re-authorize a deleted/re-created authorized object/view, the authorized view record must be deleted from the metadata,
 * and then re-added. To do this, we need to get the metadata, remove the record and setMetadata, and then add the record back and setMetadata.
 */
async function shareAuthorizeView(sourceDatasetId, authorizeProject, authorizeDataset, authorizeView, recreateAuthorization) {
    console.log(`Authorizing dataset '${sourceDatasetId}' granting object '${authorizeProject}.${authorizeDataset}.${authorizeView}' access`);

    // We need to remove any views for which the authorized views no longer exist, otherwise we'll run into an exception when saving
    let metadata = await getDatasetMetadata(sourceDatasetId);
    let isViewAlreadyAdded = false;
    if (metadata.access) {
        let updatedRequired = false;
        // Remove and save authorized view
        let i = metadata.access.length;
        while (i--) {
            let a = metadata.access[i];
            if (a.view && a.view.projectId && a.view.datasetId && a.view.tableId) {
                // If there is already an entry for the view that we're authorizing, it's stale and we need to remove it, and re-add it
                if (a.view.projectId.toLowerCase() === authorizeProject.toLowerCase() && a.view.datasetId.toLowerCase() === authorizeDataset.toLowerCase() && a.view.tableId.toLowerCase() === authorizeView.toLowerCase()) {
                    if (recreateAuthorization) {
                        // Remove from array
                        updatedRequired = true;
                        metadata.access.splice(i, 1);

                        if (process.env.VERBOSE_MODE) {
                            console.log(`Removing authorization in dataset '${sourceDatasetId}' granting object '${authorizeProject}.${authorizeDataset}.${authorizeView}' access`);
                        }
                    }
                    else {
                        isViewAlreadyAdded = true;

                        if (process.env.VERBOSE_MODE) {
                            console.log(`Authorization in dataset '${sourceDatasetId}' granting object '${authorizeProject}.${authorizeDataset}.${authorizeView}' access already exists`);
                        }
                    }
                }
                else {
                    // Remove authorized views for which are no longer valid, otherwise there will be an error saving
                    const _viewExists = await viewExists(a.view.projectId, a.view.datasetId, a.view.tableId);
                    if (_viewExists === false) {
                        console.log(`View '${a.view.datasetId}.${a.view.tableId}' is no longer valid, will remove it from the authorized view list`);
                        updatedRequired = true;
                        metadata.access.splice(i, 1);
                    }
                    else {
                        console.log(`Authorized view '${a.view.datasetId}.${a.view.tableId}' in dataset '${sourceDatasetId}' is still valid`);
                    }
                }
            }
        }

        if (updatedRequired === true) {
            console.log(`Updating authorized view records in dataset '${sourceDatasetId}'`);
            await setDatasetMetadata(sourceDatasetId, metadata);

            // We have to reload the metadata again before editing again.
            metadata = await getDatasetMetadata(sourceDatasetId);
        }
    }
    else {
        console.log("metadata.access array does not exist, creating now.");
        metadata.access = [];
    }

    if (!isViewAlreadyAdded) {
        metadata.access.push({ "view": { "projectId": authorizeProject, "datasetId": authorizeDataset, "tableId": authorizeView } });
        await setDatasetMetadata(sourceDatasetId, metadata);
        console.log(`Changes applied to authorize view '${authorizeProject}.${authorizeDataset}.${authorizeView}' in dataset '${sourceDatasetId}'`);
    }
}

/**
 * @param  {} datasetId
 * @param  {} metadata
 */
async function setDatasetMetadata(datasetId, metadata) {
    let success = false;
    const dataset = bigqueryClient.dataset(datasetId);

    if (process.env.VERBOSE_MODE) {
        console.log(`Setting metadata for dataset '${datasetId}': ${JSON.stringify(metadata, null, 2)}`);
    }

    // https://cloud.google.com/nodejs/docs/reference/bigquery/3.0.x/Dataset#setMetadata
    await dataset.setMetadata(metadata).then((data) => {
        const apiResponse = data[0];
        success = true;
        return;
    });

    // Should have boolean return, handling errors or throwing to caller
    console.log(`Metadata update is complete for dataset '${datasetId}'`);
    return success;
}

/**
 * @param  {} datasetId
 * @param  {} description
 * @param  {} labels
 */
async function createDataset(datasetId, description, labels) {
    try {
        let options = {};

        if (description) {
            options.description = description;
        }
        if (labels) {
            options.labels = labels;
        }

        const [dataset] = await bigqueryClient.createDataset(datasetId, options);

        if (process.env.VERBOSE_MODE) {
            console.log(`Dataset ${dataset.id} created.`);
        }
        return true;
    } catch (error) {
        console.log(`Error creating Dataset '${datasetId}': ${error}`);
        return false;
    }
}

/**
 * @param  {} datasetId
 */
async function deleteDataset(datasetId) {
    try {
        await bigqueryClient
            .dataset(datasetId)
            .delete({ force: true });

        if (process.env.VERBOSE_MODE) {
            console.log(`Dataset ${datasetId} deleted`);
        }
        return true;
    } catch (error) {
        console.log("Failed to delete dataset '%s', error: %s", datasetId, error);
        return false;
    }
}

/**
 * @param  {} datasetId
 * @param  {} tableId
 * @param  {} metadata
 */
async function setTableMetadata(datasetId, tableId, metadata) {
    let success = false;
    const dataset = bigqueryClient.dataset(datasetId);
    const table = dataset.table(tableId);
    let _metadata;

    if (process.env.VERBOSE_MODE) {
        console.log(`Setting metadata for table '${datasetId}.${tableId}': ${JSON.stringify(metadata, null, 2)}`);
    }

    // https://cloud.google.com/nodejs/docs/reference/bigquery/1.3.x/Table#setMetadata
    await table.setMetadata(metadata).then((data) => {
        const metadataResponse = data[0];
        const apiResponse = data[1];
        _metadata = metadataResponse;
        return;
    });

    // Should have boolean return, handling errors or throwing to caller
    console.log(`Metadata update is complete for table '${datasetId}.${tableId}'`);
    return success;
}

/**
 * @param  {} datasetId
 * @param  {} labelKey
 */
async function getDatasetLabelValue(datasetId, labelKey) {
    const metadata = await getDatasetMetadata(datasetId);
    if (metadata !== undefined && metadata.labels) {
        let labelValue = metadata.labels[labelKey];
        return labelValue;
    }
    return null;
}

/**
 * @param  {} datasetId
 * @param  {} tableId
 * @param  {} labelKey
 */
async function getTableLabelValue(datasetId, tableId, labelKey) {
    const tableMeta = await getTableMetadata(datasetId, tableId);
    const metadata = tableMeta.metadata;
    if (metadata !== undefined && metadata.labels) {
        let labelValue = metadata.labels[labelKey];
        return labelValue;
    }
    return null;
}

async function insertRows(datasetId, tableId, rows) {
    const dataset = bigqueryClient.dataset(datasetId);
    const table = dataset.table(tableId);
    await table.insert(rows);
}

module.exports = {
    init,
    validateQuery,
    tableColumns,
    viewExists,
    tableExists,
    getDatasetMetadata,
    getTableMetadata,
    getDatasets,
    datasetExists,
    createDataset,
    deleteDataset,
    createTable,
    deleteTable,
    createView,
    shareAuthorizeView,
    getDatasetLabelValue,
    getTableLabelValue,
    setDatasetMetadata,
    setTableMetadata,
    insertRows
};

if (process.env.UNIT_TESTS) {
    module.exports.executeQuery = executeQuery;
}