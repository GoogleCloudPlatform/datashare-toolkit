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

class BigQueryUtil {
    constructor(projectId) {
        this.projectId = projectId;
        const options = {};
        if (projectId) {
            options.projectId = projectId;
        }
        this.bigqueryClient = new BigQuery(options);
    }

    get VERBOSE_MODE() {
        return process.env.VERBOSE_MODE;
    }

    /**
     * @param  {Object} options
     * create a BigQuery job and return the job results
     */
    async createQueryJob(options) {
        return this.bigqueryClient.createQueryJob(options);
    }

    /**
     * @param  {} options
     */
    async executeQuerySync(options) {
        const [job] = await this.bigqueryClient.createQueryJob(options);
        if (this.VERBOSE_MODE) {
            console.log(`Job '${job.id}' started for query: ${JSON.stringify(options)}`);
        }
        return await job.getQueryResults();
    }

    /**
     * @param  {string} sql
     * @param  {integer} sql
     * execute SQL query with a limit and returnn true/false
     */
    async validateQuery(sql, limit) {
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

        // Purposefully handle this error as needed to validate the query.
        try {
            const [rows] = await this.executeQuerySync(options);
            return true;
        } catch (error) {
            if (this.VERBOSE_MODE) {
                console.log("ERROR: %s - Query: '%s' is invalid", error, _sql);
            }
            return false;
        }
    }

    /**
     * @param  {string} datasetId
     * @param  {string} tableId
     * Returns an array of column names in the table
     */
    async tableColumns(datasetId, tableId) {
        const options = {
            query: "select column_name from `" + datasetId + ".INFORMATION_SCHEMA.COLUMNS` where table_name = @_tableName order by ordinal_position",
            params: { _tableName: tableId },
        };
        const [rows] = await this.executeQuerySync(options);
        let columns = [];
        rows.forEach(row => columns.push(row.column_name));
        return columns;
    }

    /**
     * @param  {string} datasetId
     * @param  {string} tableId
     * Checks for the existence of a table.
     */
    async tableExists(datasetId, tableId) {
        const dataset = this.bigqueryClient.dataset(datasetId);
        const table = dataset.table(tableId);
        const response = await table.exists();
        const exists = response[0];

        if (exists === true) {
            const meta = await table.getMetadata();
            const type = meta[0].type;
            if (type !== "TABLE") {
                throw new Error(`Object is of type ${type}, expected 'TABLE'`);
            }
        }

        if (this.VERBOSE_MODE) {
            console.log(`Checking if table exists: '${datasetId}.${tableId}': ${exists}`);
        }
        return exists;
    }

    /**
     * @param  {string} datasetId
     * @param  {string} tableId
     * Checks for the existence of a view.
     */
    async viewExists(datasetId, tableId) {
        const dataset = this.bigqueryClient.dataset(datasetId);
        const table = dataset.table(tableId);
        const response = await table.exists();
        const exists = response[0];

        if (exists === true) {
            const meta = await table.getMetadata();
            const type = meta[0].type;
            if (type !== "VIEW") {
                throw new Error(`Object is of type ${type}, expected 'VIEW'`);
            }
        }

        if (this.VERBOSE_MODE) {
            console.log(`Checking if table exists: '${tableId}': ${exists}`);
        }
        return exists;
    }

    /**
     * @param  {string} datasetId
     * Returns value indicating if a BQ dataset exists.
     */
    async datasetExists(datasetId) {
        const dataset = this.bigqueryClient.dataset(datasetId);
        const response = await dataset.exists();
        const exists = response[0];
        if (this.VERBOSE_MODE) {
            console.log(`Checking if dataset exists: '${datasetId}': ${exists}`);
        }
        return exists;
    }

    /**
     * Returns BigQuery client datasets.
     */
    async getDatasets() {
        return this.bigqueryClient.getDatasets();
    }

    /**
     * @param  {} datasetId
     * @param  {} options
     */
    getDataset(datasetId, options) {
        return this.bigqueryClient.dataset(datasetId, options);
    }

    /**
     * @param  {string} datasetId
     * get and return the metadata from a dataset
     */
    async getDatasetMetadata(datasetId) {
        const dataset = this.bigqueryClient.dataset(datasetId);
        let _metadata;

        // https://cloud.google.com/nodejs/docs/reference/bigquery/3.0.x/Dataset#getMetadata
        await dataset.getMetadata().then((data) => {
            _metadata = data[0];
            const apiResponse = data[1];
            return;
        });

        // Should have boolean return, handling errors or throwing to caller
        if (this.VERBOSE_MODE) {
            console.log(`getDatasetMetadata result for datasetId: ${datasetId}:\n${JSON.stringify(_metadata, null, 2)}`);
        }

        return _metadata;
    }

    /**
     * @param  {string} datasetId
     * @param  {string} tableId
     * get and return the metadata from a dataset table
     */
    async getTableMetadata(datasetId, tableId) {
        const dataset = this.bigqueryClient.dataset(datasetId);
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
                metadata = data[0];
                const apiResponse = data[1];
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

        if (this.VERBOSE_MODE) {
            console.log(`getTableMetadata result for datasetId: '${datasetId}' and tableId: '${tableId}':\n${JSON.stringify(metadata, null, 2)}`);
        }

        return { metadata, exists, datasetExists, tableExists, error, errorMessage };
    }

    /**
     * @param  {string} datasetId
     * @param  {string} tableId
     * @param  {string} query
     * @param  {Object} options For all options, see https://cloud.google.com/bigquery/docs/reference/v2/tables#resource
     * @param  {string} deleteIfExists
     */
    async createView(datasetId, tableId, query, options, deleteIfExists) {
        if (deleteIfExists && deleteIfExists === true) {
            const exists = await this.viewExists(datasetId, tableId);
            if (exists === true) {
                console.log("View '%s' already exists, deleting it", tableId);
                await this.deleteTable(datasetId, tableId);
            }
        }

        let _options = options || {};
        _options.view = {
            query: query,
            useLegacySql: false
        };

        try {
            const [table] = await this.bigqueryClient
                .dataset(datasetId)
                .createTable(tableId, _options);

            if (this.VERBOSE_MODE) {
                console.log(`View '${table.id}' created.`);
            }

            return { success: true, metadata: table.metadata };
        } catch (error) {
            console.log(`Failed to create view '${tableId}' with error: ${error}`);
            return { success: false };
        }
    }

    /**
     * @param  {string} datasetId
     * @param  {string} tableId
     * @param  {Object} options For available options, see https://cloud.google.com/bigquery/docs/reference/v2/tables#resource
     * create a dataset table by name with options
     */
    async createTable(datasetId, tableId, options) {
        const [table] = await this.bigqueryClient
            .dataset(datasetId)
            .createTable(tableId, options);

        if (this.VERBOSE_MODE) {
            console.log(`Table ${table.id} created.`);
        }
    }

    /**
     * @param  {string} datasetId
     * @param  {string} tableId
     * delete a dataset table by name
     */
    async deleteTable(datasetId, tableId, ignoreError) {
        return this.bigqueryClient
            .dataset(datasetId)
            .table(tableId)
            .delete()
            .then((response) => {
                if (this.VERBOSE_MODE) {
                    console.log(`Table ${tableId} deleted`);
                }
                return true;
            })
            .catch((reason) => {
                console.log(`Error deleting table ${tableId}: ${reason}`);
                if (!ignoreError) {
                    throw reason;
                }
                return false;
            });
    }

    /**
     * @param  {string} sourceDatasetId
     * @param  {string} authorizeProject
     * @param  {string} authorizeDataset
     * @param  {string} authorizeView
     * Apply permissions from source data to the authorized view
     * Grant source dataset access to the new authorized view
     * Note: If an authorized view was defined, and it's dependent object was deleted, the authorized view record still exists in the dataset.
     * In order to re-authorize a deleted/re-created authorized object/view, the authorized view record must be deleted from the metadata,
     * and then re-added. To do this, we need to get the metadata, remove the record and setMetadata, and then add the record back and setMetadata.
     */
    async shareAuthorizeView(sourceDatasetId, authorizeProject, authorizeDataset, authorizeView, recreateAuthorization) {
        console.log(`Authorizing dataset '${sourceDatasetId}' granting object '${authorizeProject}.${authorizeDataset}.${authorizeView}' access`);

        // We need to remove any views for which the authorized views no longer exist, otherwise we'll run into an exception when saving
        let metadata = await this.getDatasetMetadata(sourceDatasetId);
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

                            if (this.VERBOSE_MODE) {
                                console.log(`Removing authorization in dataset '${sourceDatasetId}' granting object '${authorizeProject}.${authorizeDataset}.${authorizeView}' access`);
                            }
                        }
                        else {
                            isViewAlreadyAdded = true;

                            if (this.VERBOSE_MODE) {
                                console.log(`Authorization in dataset '${sourceDatasetId}' granting object '${authorizeProject}.${authorizeDataset}.${authorizeView}' access already exists`);
                            }
                        }
                    }
                    else {
                        // Remove authorized views for which are no longer valid, otherwise there will be an error saving
                        const _viewExists = await this.viewExists(a.view.datasetId, a.view.tableId);
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
                await this.setDatasetMetadata(sourceDatasetId, metadata);

                // We have to reload the metadata again before editing again.
                metadata = await this.getDatasetMetadata(sourceDatasetId);
            }
        }
        else {
            console.log("metadata.access array does not exist, creating now.");
            metadata.access = [];
        }

        if (!isViewAlreadyAdded) {
            metadata.access.push({ "view": { "projectId": authorizeProject, "datasetId": authorizeDataset, "tableId": authorizeView } });
            await this.setDatasetMetadata(sourceDatasetId, metadata);
            console.log(`Changes applied to authorize view '${authorizeProject}.${authorizeDataset}.${authorizeView}' in dataset '${sourceDatasetId}'`);
        }
    }

    /**
     * @param  {string} datasetId
     * @param  {string} metadata
     * set the metadata for a dataset
     */
    async setDatasetMetadata(datasetId, metadata) {
        let success = false;
        const dataset = this.bigqueryClient.dataset(datasetId);

        if (this.VERBOSE_MODE) {
            console.log(`Setting metadata for dataset '${datasetId}': ${JSON.stringify(metadata, null, 2)}`);
        }

        // https://cloud.google.com/nodejs/docs/reference/bigquery/3.0.x/Dataset#setMetadata
        await dataset.setMetadata(metadata).then((data) => {
            const apiResponse = data[0];
            success = true;
            return;
        });

        if (this.VERBOSE_MODE) {
            console.log(`Metadata update is complete for dataset '${datasetId}'`);
        }
        return success;
    }

    /**
     * @param  {string} datasetId
     * @param  {Object} options
     * create a dataset by name with options
     */
    async createDataset(datasetId, options) {
        let _options = options || {};
        const [dataset] = await this.bigqueryClient.createDataset(datasetId, _options);

        if (this.VERBOSE_MODE) {
            console.log(`Dataset ${dataset.id} created.`);
        }
    }

    /**
     * @param  {string} datasetId
     * delete a dataset by name
     */
    async deleteDataset(datasetId, ignoreError) {
        return this.bigqueryClient
            .dataset(datasetId)
            .delete({ force: true })
            .then((response) => {
                if (this.VERBOSE_MODE) {
                    console.log(`Dataset ${datasetId} deleted`);
                }
                return true;
            })
            .catch((reason) => {
                console.log(`Error deleting dataset ${datasetId}: ${reason}`);
                if (!ignoreError) {
                    throw reason;
                }
                return false;
            });
    }

    /**
     * @param  {string} datasetId
     * @param  {string} tableId
     * @param  {Object} metadata
     * set the dataset by name with options
     */
    async setTableMetadata(datasetId, tableId, metadata) {
        let success = false;
        const dataset = this.bigqueryClient.dataset(datasetId);
        const table = dataset.table(tableId);

        if (this.VERBOSE_MODE) {
            console.log(`Setting metadata for table '${datasetId}.${tableId}': ${JSON.stringify(metadata, null, 2)}`);
        }

        // https://cloud.google.com/nodejs/docs/reference/bigquery/1.3.x/Table#setMetadata
        await table.setMetadata(metadata).then((data) => {
            const apiResponse = data[1];
            success = true;
            return;
        });

        if (this.VERBOSE_MODE) {
            console.log(`Metadata update is complete for table '${datasetId}.${tableId}'`);
        }
        return success;
    }

    /**
     * @param  {string} datasetId
     * @param  {string} labelKey
     * get a dataset label value by key
     */
    async getDatasetLabelValue(datasetId, labelKey) {
        const metadata = await this.getDatasetMetadata(datasetId);
        if (metadata !== undefined && metadata.labels) {
            let labelValue = metadata.labels[labelKey];
            return labelValue;
        }
        return null;
    }

    /**
     * @param  {string} datasetId
     * @param  {string} tableId
     * @param  {string} labelKey
     * get a dataset table label value by key
     */
    async getTableLabelValue(datasetId, tableId, labelKey) {
        const tableMeta = await this.getTableMetadata(datasetId, tableId);
        const metadata = tableMeta.metadata;
        if (metadata !== undefined && metadata.labels) {
            let labelValue = metadata.labels[labelKey];
            return labelValue;
        }
        return null;
    }

    /**
     * @param  {string} datasetId
     * @param  {string} tableId
     * @param  {string} rows
     * inset rows into a dataset tabl
     */
    async insertRows(datasetId, tableId, rows) {
        const dataset = this.bigqueryClient.dataset(datasetId);
        const table = dataset.table(tableId);
        return table.insert(rows);
    }
}

module.exports = BigQueryUtil;
