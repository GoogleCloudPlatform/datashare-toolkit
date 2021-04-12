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
const { Storage } = require('@google-cloud/storage');

const { google } = require('googleapis');
const DISCOVERY_URL = 'https://bigquery.googleapis.com/discovery/v1/apis/bigquery/v2/rest';

const storage = new Storage();
const underscore = require("underscore");

class BigQueryUtil {
    constructor(projectId) {
        this.projectId = projectId;
        const options = {
            scopes:['https://www.googleapis.com/auth/cloud-platform']
        };
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
     * @param  {} options
     */
    async executeQuery(options) {
        return this.bigqueryClient.query(options);
    }

    /**
     * @param  {string} sql
     * @param  {integer} sql
     * @param {boolean} includeRows
     * execute SQL query with a limit and returnn true/false
     */
    async validateQuery(sql, limit, includeRows) {
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
            if (includeRows) {
                return { success: true, rows: rows };
            }
            return { success: true };
        } catch (error) {
            console.warn("ERROR: %s - Query: '%s' is invalid", error, _sql);
            return { success: false, message: error.message };
        }
    }

    /**
     * @param  {string} datasetId
     * @param  {string} tableId
     * Returns an array of column names in the table
     */
    async tableColumns(datasetId, tableId) {
        const options = {
            query: "select column_name from `" + datasetId + ".INFORMATION_SCHEMA.COLUMNS` where table_name = @_tableName and is_hidden	= 'NO' order by ordinal_position",
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
     * @param  {string} typeCheck Flag indicating if the metadata should be checked to verify if object is of type table. If the object is of type VIEW, an Error will throw
     * Checks for the existence of a table.
     */
    async tableExists(datasetId, tableId, typeCheck) {
        const dataset = this.bigqueryClient.dataset(datasetId);
        const table = dataset.table(tableId);
        const response = await table.exists();
        const exists = response[0];

        if (typeCheck === true && exists === true) {
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
            console.log(`Checking if view exists: '${tableId}': ${exists}`);
        }
        return exists;
    }

    /**
     * @param  {string} datasetId
     * Returns value indicating if a BQ dataset exists.
     */
    async datasetExists(datasetId) {
        const dataset = this.bigqueryClient.dataset(datasetId);
        const exists = await dataset.exists().catch((err) => {
            console.warn(err.message);
            throw err;
        });
        if (this.VERBOSE_MODE) {
            console.log(`Checking if dataset exists: '${datasetId}': ${exists[0]}`);
        }
        return exists[0];
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

    async getClient() {
        const auth = new google.auth.GoogleAuth({
            scopes: 'https://www.googleapis.com/auth/cloud-platform'
        });
        google.options({ auth: auth });
        return google.discoverAPI(DISCOVERY_URL, {}, (err, client) => {
            if (err) {
                console.log('Error during API discovery', err);
                return undefined;
            }
            return client;
        });
    }

    /**
     * @param  {} projectId
     * @param  {} datasetId
     * @param  {} tableId
     * https://cloud.google.com/resource-manager/reference/rest/v1/projects/getIamPolicy
     */
    async getTableIamPolicy(projectId, datasetId, tableId) {
        const client = await this.getClient();
        try {
            const res = await client.tables.getIamPolicy({
                resource: `projects/${projectId}/datasets/${datasetId}/tables/${tableId}`
            });
            if (this.VERBOSE_MODE) {
                console.log(JSON.stringify(res.data));
            }
            return res.data;
        } catch (err) {
            if (this.VERBOSE_MODE) {
                console.warn(err);
            }
            throw err;
        }
    }

    /**
     * @param  {} projectId
     * @param  {} datasetId
     * @param  {} tableId
     * @param  {} policy
     * @param  {} updateMask
     * https://cloud.google.com/resource-manager/reference/rest/v1/projects/setIamPolicy
     */
    async setTableIamPolicy(projectId, datasetId, tableId, policy, updateMask) {
        const client = await this.getClient();
        try {
            const res = await client.tables.setIamPolicy({
                resource: `projects/${projectId}/datasets/${datasetId}/tables/${tableId}`,
                requestBody: {
                    "policy": policy,
                    "updateMask": updateMask // 'bindings'
                }
            });
            if (this.VERBOSE_MODE) {
                console.log(JSON.stringify(res.data));
            }
            return res.data;
        } catch (err) {
            if (this.VERBOSE_MODE) {
                console.warn(err);
            }
            throw err;
        }
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
            console.warn(`Failed to create view '${tableId}' with error: ${error}`);
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
            .catch((err) => {
                console.warn(err.message);
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
        return { success: true, metadata: dataset.metadata };
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
            .catch((err) => {
                console.warn(err.message);
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

    async setDatasetLabel(datasetId, key, value) {
        const dataset = this.bigqueryClient.dataset(datasetId);

        // Retrieve current table metadata
        const [metadata] = await dataset.getMetadata();

        if (!metadata.labels) {
            metadata.labels = {};
        }

        // Set label in table metadata
        metadata.labels[key] = value;

        const [apiResponse] = await dataset.setMetadata(metadata);
        if (this.VERBOSE_MODE) {
            console.log(`${datasetId} labels:`);
            console.log(apiResponse.labels);
        }
        return apiResponse;
    }

    /**
     * @param  {} datasetId
     * @param  {} tableId
     * @param  {} key
     * @param  {} value
     * set table label
     */
    async setTableLabel(datasetId, tableId, key, value) {
        const dataset = this.bigqueryClient.dataset(datasetId);
        const [table] = await dataset.table(tableId).get();

        // Retrieve current table metadata
        const [metadata] = await table.getMetadata();

        if (!metadata.labels) {
            metadata.labels = {};
        }

        // Set label in table metadata
        metadata.labels[key] = value;

        const [apiResponse] = await table.setMetadata(metadata);
        if (this.VERBOSE_MODE) {
            console.log(`${tableId} labels:`);
            console.log(apiResponse.labels);
        }
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
     * insert rows into a dataset table
     */
    async insertRows(datasetId, tableId, rows) {
        const dataset = this.bigqueryClient.dataset(datasetId);
        const table = dataset.table(tableId);
        return await table.insert(rows, { raw: false }).then((data) => {
            let insertErrors = data[1];
            if (insertErrors) {
                logger.info(`insertErrors: ${JSON.stringify(insertErrors)}`);
                // Some rows failed to insert, while others may have succeeded.
                const errorList = insertErrors.map((insertError) => {
                    return insertError.errors.map((error) => {
                        return `PartialFailureError: BigQuery insert failed due to: ${JSON.stringify(error)}`;
                    });
                });
                if (errorList.length > 0) {
                    console.error(errorList.join(', '));
                }
                return false;
            }
            return true;
        }).catch((error) => {
            throw new Error(`Error inserting into BigQuery: ${JSON.stringify(error)}`);
        });
    }

    /**
     * @param  {string} datasetId
     * @param  {string} tableId
     * @param  {string} bucketName
     * @param  {string} filename
     * @param  {Object} extract options
     * Extracts a BigQuery table to Cloud Storage with options and returns true
     */
    async extractTableToGCS(datasetId, tableId, bucketName, filename, options) {
        // Export data from the table into a Google Cloud Storage file
        const [job] = await this.bigqueryClient
            .dataset(datasetId)
            .table(tableId)
            .extract(storage.bucket(bucketName).file(filename), options);

        if (this.VERBOSE_MODE) {
            console.log(`Extract job '${job.id}' is complete for table '${datasetId}.${tableId}'`);
        }
        // Check the job's status for errors
        const err = job.status.errors;
        if (err && err.length > 0) {
            console.warn(err.message);
            throw err;
        }
        return true;
    }

    /**
     * @param  {} labelKey
     */
    async getDatasetsByLabel(labelKey) {
        let accessTypes = ["userByEmail", "groupByEmail"];
        const [datasets] = await this.bigqueryClient.getDatasets();
        let list = [];
        for (const dataset of datasets) {
            const [metadata] = await dataset.getMetadata();
            const labels = metadata.labels;
            if (underscore.has(labels, labelKey) || !labelKey) {
                let accounts = [];
                metadata.access.forEach(a => {
                    if (a.role === 'READER') {
                        const keys = Object.keys(a);
                        if (keys.length === 2) {
                            const accessType = keys[1];
                            const accessId = a[accessType];
                            if (accessTypes.includes(accessType)) {
                                accounts.push({ email: accessId, type: accessType });
                            }
                        }
                    }
                });
                list.push({ datasetId: dataset.id, description: metadata.description, modifiedAt: metadata.lastModifiedTime, accounts: accounts, labels: labels });
            }
        }
        return list;
    }

    /**
     * @param  {} projectId
     * @param  {} datasetId
     * @param  {} labelKey
     */
    async getTablesByLabel(projectId, datasetId, labelKey) {
        let list = [];
        if (datasetId) {
            const dataset = this.bigqueryClient.dataset(datasetId);
            const [tables] = await dataset.getTables();
            if (labelKey) {
                for (const table of tables) {
                    const labels = await this.getTableLabels(datasetId, table.id);
                    if (underscore.has(labels, labelKey)) {
                        list.push({ datasetId: table.dataset.id, tableId: table.id, type: table.metadata.type });
                    }
                }
            }
            else {
                tables.forEach(table => {
                    list.push({ datasetId: table.dataset.id, tableId: table.id, type: table.metadata.type });
                });
            }
        }
        else {
            const [datasets] = await this.bigqueryClient.getDatasets();
            for (const dataset of datasets) {
                const [tables] = await dataset.getTables();
                for (const table of tables) {
                    const labels = await this.getTableLabels(dataset.id, table.id);
                    if (underscore.has(labels, labelKey)) {
                        list.push({ datasetId: table.dataset.id, tableId: table.id, type: table.metadata.type });
                    }
                }
            }
        }
        return list;
    }

    /**
     * @param  {} datasetId
     * Not used
     */
    async getDatasetLabels(datasetId) {
        const dataset = this.bigqueryClient.dataset(datasetId);
        const [metadata] = await dataset.getMetadata();
        const labels = metadata.labels;
        if (this.VERBOSE_MODE) {
            console.log(`Dataset labels for ${datasetId}: ${JSON.stringify(labels)}`);
        }
        return labels;
    }

    /**
     * @param  {} datasetId
     * @param  {} tableId
     */
    async getTableLabels(datasetId, tableId) {
        const table = this.bigqueryClient.dataset(datasetId).table(tableId);
        const [metadata] = await table.getMetadata();
        const labels = metadata.labels;
        if (this.VERBOSE_MODE) {
            console.log(`Table labels for ${datasetId}.${tableId}: ${JSON.stringify(labels)}`);
        }
        return labels;
    }

    /**
     * @param  {} projectId
     * @param  {} datasetId
     */
    async getDatasetsAccessList(projectId, datasetId, labelKey) {
        let list = [];
        if (datasetId) {
            const dataset = this.bigqueryClient.dataset(datasetId);
            const access = await this.getDatasetAccess(projectId, datasetId);
            access.forEach((a) => {
                const keys = Object.keys(a);
                if (keys.length === 2) {
                    const accessType = keys[1];
                    const accessId = a[accessType];
                    list.push({ datasetId: dataset.id, accessType: accessType, accessId: accessId, role: a.role });
                }
            });
        }
        else {
            const datasets = await this.getDatasetsByLabel(projectId, labelKey);
            for (const dataset of datasets) {
                const access = await this.getDatasetAccess(projectId, dataset.datasetId);
                // eslint-disable-next-line no-loop-func
                access.forEach((a) => {
                    const keys = Object.keys(a);
                    if (keys.length === 2) {
                        const accessType = keys[1];
                        const accessId = a[accessType];
                        list.push({ datasetId: dataset.datasetId, accessType: accessType, accessId: accessId, role: a.role });
                    }
                });
            }
        }
        return list;
    }

    /**
     * @param  {} projectId
     * @param  {} datasetId
     */
    async getDatasetAccess(projectId, datasetId) {
        const dataset = this.bigqueryClient.dataset(datasetId);
        const [metadata] = await dataset.getMetadata();
        const access = metadata.access;
        if (this.VERBOSE_MODE) {
            console.log(`Access for ${datasetId}: ${JSON.stringify(access)}`);
        }
        return access;
    }

    isValidDatasetName(name) {
        let errors = [];
        if (name) {
            if (name.length > 1024) {
                errors.push(`DatasetId '${name}' exceeds maximum allowable length of 1024: ${name.length}}`);
            }
            if (!name.match(/^[A-Za-z0-9_]+$/g)) {
                errors.push(`DatasetId '${name}' name is invalid. See https://cloud.google.com/bigquery/docs/datasets for further information.`);
            }
        }
        else {
            errors.push(`DatasetId is undefined`);
        }
        let isValid = errors.length === 0;
        return { isValid, errors };
    }

    isValidTableName(name) {
        let errors = [];
        if (name) {
            if (name.length > 1024) {
                errors.push(`Destination tableId '${name}' exceeds maximum allowable length of 1024: ${name.length}}`);
            }
            if (!name.match(/^[A-Za-z0-9_]+$/g)) {
                errors.push(`Destination tableId '${name}' name is invalid. See https://cloud.google.com/bigquery/docs/tables for further information.`);
            }
        }
        else {
            errors.push(`TableId is undefined`);
        }
        let isValid = errors.length === 0;
        return { isValid, errors };
    }

    /**
     * @param  {} projectId
     * @param  {} datasetId
     * @param  {} tableId
     * Get the FQDN format for a project's table or view name
     */
    getTableFqdn(projectId, datasetId, tableId) {
        return `${projectId}.${datasetId}.${tableId}`;
    }
}

module.exports = BigQueryUtil;
