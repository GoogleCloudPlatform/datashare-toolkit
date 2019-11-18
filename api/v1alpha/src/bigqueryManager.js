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
const bigqueryClient = new BigQuery();
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

/**
 * @param  {} projectName
 * return a bigqueryClient object based off projectName
 */
function dynamicClient(projectName) {
    return new BigQuery({
        projectId: projectName
    });
}

/**
 * @param  {} projectName
 * @param  {} datasetName
 * Check if a Dataset exists and return true if exists.
 */
async function checkIfDatasetExists(projectName, datasetName) {
    const bigqueryClient = dynamicClient(projectName);
    const dataset = bigqueryClient.dataset(datasetName);
    const exists = await dataset.exists().catch(err => {
        console.warn(err.message);
        throw err;
    });
    if (!exists[0]) {
        return { success: false, code: 400, errors: ['BigQuery dataset [' + datasetName + '] does not exist'] };
    }
    return true;
}

/**
 * @param  {} projectName
 * @param  {} datasetName
 * Create a Dataset and return true
 */
async function createDataset(projectName, datasetName) {
    const bigqueryClient = dynamicClient(projectName);
    const dataset = bigqueryClient.dataset(datasetName);
    const created = await dataset.create().catch(err => {
        console.warn(err.message);
        throw err;
    });
    if (!created[0]) {
        // The dataset was created successfully.
        return { success: false, code: 400, errors: ['BigQuery dataset [' + datasetName + '] created failed'] };
    }
    return true;
}

/**
* @param  {} projectName
* @param  {} datasetName
* Check if a Dataset exists and return true if exists.
*/
async function checkIfDatasetTableExists(projectName, datasetName, tableName) {
    const bigqueryClient = dynamicClient(projectName);
    const dataset = bigqueryClient.dataset(datasetName);
    const table = dataset.table(tableName);
    const exists = await table.exists().catch(err => {
        console.warn(err.message);
        throw err;
    });
    if (!exists[0]) {
        return { success: false, code: 400, errors: ['BigQuery dataset:table [' + datasetName + ':' + tableName + '] does not exist'] };
    }
    return true;
}

/**
 * @param  {} options
 * Executes a query within BigQuery, waits for completion, and returns the result.
 */
async function executeQuery(options) {
    const [job] = await bigqueryClient.createQueryJob(options).catch(err => {
        console.warn(err.message);
        throw err;
    });
    console.log(`Job '${job.id}' started for query: ${JSON.stringify(options)}`);
    const results = await job.getQueryResults().catch(err => {
        console.warn(err.message);
        throw err;
    });
    if (!results[0]) {
        return { success: false, code: 400, errors: ['BigQuery job [' + job.id + '] does not exist'] };
    }
    return results;
}

/**
 * @param  {} options
 * Creates a query job and returns the job.
 */
async function createQueryJob(options) {
    const [job] = await bigqueryClient.createQueryJob(options).catch(err => {
        console.warn(err.message);
        throw err;
    });
    console.log(`Job '${job.id}' started for query: ${JSON.stringify(options)}`);
    return job;
}

/**
 * @param  {} jobId
 * Checks if the query job exists and returns the job
 */
async function getQueryJob(jobId) {
    const job = bigqueryClient.job(jobId);
    const results = await job.exists().catch(err => {
        console.warn(err.message);
        throw err;
    });
    if (!results[0]) {
        return { success: false, code: 400, errors: ['BigQuery job [' + job.id + '] does not exist'] };
    }
    return job
}

/**
 * @param  {} datasetId
 * @param  {} tableId
 * @param  {} expirationTime
 * Updates the BigQuery table expiration time.
 */
async function updateTableExpiration(datasetId, tableId, expirationTime) {
    const table = bigqueryClient.dataset(datasetId).table(tableId);
    const [metadata] = await table.getMetadata().catch(err => {
        console.warn(err.message);
        throw err;
    });

    metadata.expirationTime = expirationTime;
    const [apiResponse] = await table.setMetadata(metadata).catch(err => {
        console.warn(err.message);
        throw err;
    });
    const newExpirationTime = apiResponse.expirationTime;
    console.log(`${tableId} expiration: ${newExpirationTime}`);
    return true;
}

/**
 * @param  {} datasetId
 * @param  {} tableId
 * @param  {} bucketName
 * @param  {} filename
 * Extracts a BigQuery table to Cloud Storage in json format.
 */
async function extractTableToGCS(datasetId, tableId, bucketName, filename) {
    const options = {
        format: 'json',
        gzip: true
    };

    // Export data from the table into a Google Cloud Storage file
    const [job] = await bigqueryClient
        .dataset(datasetId)
        .table(tableId)
        .extract(storage.bucket(bucketName).file(filename), options);
    // load() waits for the job to finish
    console.log(`Job ${job.id} completed.`);

    // Check the job's status for errors
    const errors = job.status.errors;
    if (errors && errors.length > 0) {
        console.warn(errors.message);
        throw errors;
    }
    return true;
}

module.exports = {
    checkIfDatasetExists,
    createDataset,
    checkIfDatasetTableExists,
    executeQuery,
    createQueryJob,
    getQueryJob,
    updateTableExpiration,
    extractTableToGCS
};
