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

const querystring = require('querystring');
const uuidv4 = require('uuid/v4');

const { BigQueryUtil, StorageUtil, PubSubUtil } = require('bqds-shared');
let bigqueryUtil;
const storageUtil = new StorageUtil();

const validateManager = require('./validateManager');
const fulfillmentMessageSchema = require('./validateManager').fulfillmentMessageSchema;

/**
 * @param  {string} name
 * Creates a file name string based off name parameter.
 */
function createFileName(name) {
    const directoryName = 'fulfillments';
    return `${directoryName}/${name}.jsonl.gz`;
}

/**
 * @param  {Object} options
 * Creates a message to execute a job/query based on the request and parameters.
 * Returns the request Id and query string for bucket object
 */
async function createFulfillmentRequest(options) {
    const requestId = uuidv4();
    const bucketName = options.destination.bucketName;
    const fileName = createFileName(requestId);
    options['destination']['fileName'] = fileName;
    console.log(`RequestId: ${requestId}, options: ${JSON.stringify(options)}`);

    const query = querystring.encode({
        bucketName: bucketName,
        fileName: fileName
    });
    const responseData = {
        requestId: requestId,
        query: query,
        bucketName: bucketName,
        fileName: fileName
    }
    // create the fulfillment request now
    if (options.wait === true) {
        const data = await createFulfillment(requestId, options).catch(err => {
            console.warn(err);
            return { success: false, errors: [err.message] };
        });
        if (data.success === false ) {
            return { ...data };
        }
        return { data: { ...responseData, ...data }, success: true };
    } else {
        // Don't wait for the response
        createFulfillment(requestId, options).catch(err => {
            console.warn(`createFulfillment error: ${err.message}`);
        });
        return { data: { ...responseData }, code: 202, success: true };
    }
}

/**
 * @param  {string} requestId
 * @param  {string} bucketName
 * @param  {string} fileName
 * Checks if the file exists and metadata matches the requestId
 */
async function getFulfillmentRequest(requestId, bucketName, fileName) {
    var message;
    console.log(`RequestId: ${requestId}, bucketName: ${bucketName}, fileName: ${fileName}`);

    const query = querystring.encode({
        bucketName: bucketName,
        fileName: fileName
    });
    const responseData = {
        requestId: requestId,
        query: query,
        bucketName: bucketName,
        fileName: fileName
    }

    const exists = await storageUtil.checkIfFileExists(bucketName, fileName).catch(err => {
        console.warn(err);
        return { success: false, errors: [err.message] };
    });
    if (exists.success === false) {
        return { ...exists };
    }

    const metadata = await storageUtil.getFileMetadata(bucketName, fileName).catch(err => {
        console.warn(err);
        return { success: false, errors: [err.message] };
    });
    if (metadata.metadata === undefined || metadata.metadata.requestId === undefined || metadata.metadata.requestId !== requestId) {
        console.log(metadata);
        message = `fileName: '${fileName}' does not have the signature for requestId: '${requestId}'`;
        return { success: false, code: 400, errors: [message] };
    }

    const signedUrl = await storageUtil.getUrl(bucketName, fileName, true).catch(err => {
        console.warn(err);
        return { success: false, errors: [err.message] };
    });
    return { data: { ...responseData, signedUrl: signedUrl }, success: true };
}

/**
 * @param  {string} requiredId
 * @param  {Object} options
 * Executes BigQuery job, extracts contents, creates file, and signs it.
 * This is a long running operation that should be run in the background.
 */
async function createFulfillment(requestId, options) {
    var message;
    if (!options.destination.bucketName || !options.destination.fileName) {
        message = 'No Bucket Name or File Name is supplied.';
        console.warn(message);
        return { success: false, code: 400, errors: [message] };
    }
    // Build up query based off of user request options
    const queryOptions = await validateManager.getDynamicQueryOptions(options).catch(err => {
        console.warn(err);
        return { success: false, errors: [err.message] };
    });
    if (queryOptions.success === false) {
        return { ...queryOptions };
    }
    const bucketName = options.destination.bucketName;
    const fileName = options.destination.fileName;
    const projectId = options.config.destination.projectId;
    const datasetId = options.config.destination.datasetId;
    // Dynamically create unique tableIds for the extractToBucket method
    const tableId = requestId.replace(/-/g, "_");

    console.log(`Will execute query with options: ${JSON.stringify(queryOptions)}`);
    // Check if fileName exists
    var exists = await storageUtil.checkIfFileExists(bucketName, fileName).catch(err => {
        console.warn(err);
        return { success: false, errors: [err.message] };
    });
    if (exists === true) {
        return { success: false, code: 409, errors: ['Storage file [' + fileName + '] already exists'] };
    }
    // Set query options to execute BQ job and extract to table
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const expiryTime = today.getTime();

    // For all options, see https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query
    queryOptions.destinationTable = {
        projectId: projectId,
        datasetId: datasetId,
        tableId: tableId
    };
    queryOptions.createDisposition = "CREATE_IF_NEEDED";
    queryOptions.writeDisposition = "WRITE_EMPTY";
    // To ensure executeQuery does not retrieve any records in the result set, set to zero
    queryOptions.maxResults = 0;

    bigqueryUtil = new BigQueryUtil(projectId);
    exists = await bigqueryUtil.datasetExists(datasetId).catch(err => {
        console.warn(err);
        return { success: false, errors: [err.message] };
    });
    if (exists.success === false) {
        console.log(`Creating new dataset ${datasetId} in project ${projectId}`);
        exists = await bigqueryUtil.createDataset(projectId, datasetId).catch(err => {
            console.warn(err);
            return { success: false, errors: [err.message] };
        });
    }
    if (exists.success === false) {
        return exists;
    }

    var results = await bigqueryUtil.executeQuerySync(queryOptions).then(() => {
        const options = {
            format: 'json',
            gzip: true
        }
        console.log(`bigqueryUtil.extractTableToGCS: ${datasetId} ${tableId} ${bucketName} ${fileName}`);
        return bigqueryUtil.extractTableToGCS(datasetId, tableId, bucketName, fileName, options);
    }).then(() => {
        // update with requestId
        const fileMetadata = {
            private: true,
            metadata: {
                requestId: requestId
            }
        }
        console.log(`storageUtil.setFileMetadata: ${bucketName} ${fileName}`);
        return storageUtil.setFileMetadata(bucketName, fileName, fileMetadata);
    }).then(() => {
        console.log(`storageUtil.getUrl: ${bucketName} ${fileName}`);
        return storageUtil.getUrl(bucketName, fileName, true);
    }).then((signedUrl) => {
        console.log(`bigqueryUtil.setTableMetadata: ${datasetId} ${tableId} ${expiryTime}`);
        const metadata = {
            expirationTime: expiryTime
        }
        bigqueryUtil.setTableMetadata(datasetId, tableId, metadata);
        return signedUrl;
    }).catch(error => {
        message = `Create Fulfillment failed: ${error}`;
        console.warn(message);
        const metadata = {
            expirationTime: expiryTime
        }
        console.log(`Finally bigqueryUtil.setTableMetadata: ${datasetId} ${tableId} ${expiryTime}`);
        bigqueryUtil.setTableMetadata(datasetId, tableId, metadata);
        return { success: false, errors: [message] };
    });

    if (results.success === false) {
        return results;
    }
    return { signedUrl: results };
}

module.exports = {
    createFulfillmentRequest,
    getFulfillmentRequest,
    createFulfillment
};
