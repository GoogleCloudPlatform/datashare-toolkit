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

const bqManager = require('./bigqueryManager');
const storageManager = require('./storageManager');
const pubsubManager = require('./pubSubManager');
const validateManager = require('./validateManager');
const fulfillmentMessageSchema = require('./validateManager').fulfillmentMessageSchema;

/**
 * @param  {} name
 * Creates a file name string based off name parameter.
 */
function createFileName(name) {
    const directoryName = 'fulfillments';
    return `${directoryName}/${name}.jsonl`;
}

/**
 * @param  {} options
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

    // create the fulfillment request now
    if (options.wait === true) {
        const data = await createFulfillment(requestId, options).catch(err => {
            console.warn(err);
            return { data: { requestId: requestId }, success: false, errors: [err.message] };
        });
        return data;
    }

    // create the fulfillment pubsub message
    const customAttributes = {
        requestId: requestId
    }
    const topicName = options.config.pubsub.topicName;
    await pubsubManager.publishMessage(topicName, options, customAttributes).catch(err => {
        console.warn(err);
        return { data: { requestId: requestId }, success: false, errors: [err.message] };
    });
    //console.log(pubsubMessage);
    return {
        requestId: requestId,
        query: query,
        bucketName: bucketName,
        fileName: fileName
    };
}

/**
 * @param  {} options
 * Checks if the file exists and metadata matches the requestId
 */
async function getFulfillmentRequest(requestId, bucketName, fileName) {
    var message;
    const query = querystring.encode({
        bucketName: bucketName,
        fileName: fileName
    });
    console.log(`RequestId: ${requestId}, bucketName: ${bucketName}, fileName: ${fileName}`);

    const exists = await storageManager.checkIfFileExists(bucketName, fileName).catch(err => {
        console.warn(err);
        return { data: { requestId: requestId }, success: false, errors: [err.message] };
    });
    if (exists !== true) {
        return { data: { requestId: requestId }, ...exists };
    }

    const metadata = await storageManager.getFileMetadata(bucketName, fileName).catch(err => {
        console.warn(err);
        return { data: { requestId: requestId }, success: false, errors: [err.message] };
    });
    if (metadata.metadata.requestId === undefined || metadata.metadata.requestId !== requestId) {
        console.log(metadata.metadata);
        message = `fileName: '${fileName}' does not have the signature for requestId: '${requestId}'`;
        return { data: { requestId: requestId }, code: 400, success: false, errors: [message] };
    }

    const signedUrl = await storageManager.getUrl(bucketName, fileName, true).catch(err => {
        console.warn(err);
        return { data: { requestId: requestId }, success: false, errors: [err.message] };
    });
    return {
        requestId: requestId,
        query: query,
        bucketName: bucketName,
        fileName: fileName,
        signedUrl: signedUrl[0]
    };
}

/**
 * @param  {} options
 * Receives message payload from GCP Pubsub subscription and processes
 * fulfillment request. logic assumes that message payload schema has
 * already been validated.
 */
async function processFulfillmentSubscriptionRequest(options) {
    const requestId = options.message.attributes.requestId;
    const bucketName = options.destination.bucketName;
    const fileName = options.destination.fileName;
    const query = querystring.encode({
        bucketName: bucketName,
        fileName: fileName
    });
    const data = await createFulfillment(requestId, options).catch(err => {
        console.warn(err);
        return { data: { requestId: requestId }, success: false, errors: [err.message] };
    });
    return data;
}

/**
 * @param  {}
 * Pulls message from GCP Pubsub subscription and processes
 * fulfillment request.
 */
async function pullFulfillmentSubscriptionRequest(options) {
    var message;

    // Check if subscription exists
    const topicName = options.config.pubsub.topicName;
    const subscriptionName = options.config.pubsub.subscriptionName;
    const exists = await pubsubManager.checkIfSubscriptionExists(topicName, subscriptionName).catch(err => {
        console.warn(err);
        return { success: false, errors: [err.message] };
    });
    if (exists !== true) {
        return { ...exists };
    }

    // Process one message after ack
    const pubsubMessage = await pubsubManager.getMessage(subscriptionName).catch(err => {
        console.warn(err);
        return { success: false, errors: [err.message] };
    });
    if (pubsubMessage.success === false) {
        return { ...pubsubMessage };
    }

    // validate pubsub message data against fulfillment message schema
    const result = fulfillmentMessageSchema.validate(pubsubMessage.data);
    if (result.error) {
        message = `Incorrect Spot fulfillment message schema`;
        console.warn(message);
        return { success: false, code: 400, errors: [message] };
    }
    //const messageId = pubsubMessage.message.messageId;
    const requestId = pubsubMessage.message.attributes.requestId;
    const jsonString = Buffer.from(pubsubMessage.message.data).toString('utf8');
    options = {...options, ...JSON.parse(jsonString)};

    const bucketName = options.destination.bucketName;
    const fileName = options.destination.fileName;
    const query = querystring.encode({
        bucketName: bucketName,
        fileName: fileName
    });

    const data = await createFulfillment(requestId, options).catch(err => {
        console.warn(err);
        return { data: { requestId: requestId }, success: false, errors: [err.message] };
    });
    return data;
}

/**
 * @param  {} options
 * Executes BigQuery job, extracts contents, creates file, and signs it.
 * This is a long running operation that should be run in the background.
 */
async function createFulfillment(requestId, options) {
    var message;
    if (!options.destination.bucketName || !options.destination.fileName) {
        message = 'No Bucket Name or File Name is supplied.';
        console.warn(message);
        return { success: false, code:400, errors: [message] };
    }
    // Build up query based off of user request options
    const queryOptions = await validateManager.getDynamicQueryOptions(options);
    const bucketName = options.destination.bucketName;
    const fileName = options.destination.fileName;
    const projectName = options.config.destination.projectName;
    const datasetId = options.config.destination.datasetName;
    // Dynamically create unique tableIds for the extractToBucket method
    const tableId = requestId.replace(/-/g, "_");

    console.log(`Will execute query with options: ${JSON.stringify(queryOptions)}`);
    // Check if fileName exists
    var exists = await storageManager.checkIfFileExists(bucketName, fileName).catch(err => {
        console.warn(err);
        return { success: false, errors: [err.message] };
    });
    if (exists === true) {
        return { success: false, code:409, errors: ['Storage file [' + fileName + '] already exists'] };
    }
    // Set query options to execute BQ job and extract to table
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const expiryTime = today.getTime();

    queryOptions.destinationTable = {
        projectId: projectName,
        datasetId: datasetId,
        tableId: tableId
    };

    // create file and sign
    const fileOptions = {
        gzip: true,
        private: true,
        metadata: {
            metadata: {
                requestId: requestId
            }
        }
    }
    queryOptions.createDisposition = "CREATE_IF_NEEDED";
    queryOptions.writeDisposition = "WRITE_EMPTY";

    // To ensure executeQuery does not retrieve any records in the result set, set to zero
    queryOptions.maxResults = 0;

    console.log(queryOptions);

    var exists = await bqManager.checkIfDatasetExists(projectName, datasetId).catch(err => {
        console.warn(err);
        return { success: false, errors: [err.message] };
    });
    console.log(exists);
    if (exists.success === false) {
        console.log(`Creating new dataset ${datasetId} in project ${projectName}`);
        exists = await bqManager.createDataset(projectName, datasetId).catch(err => {
            console.warn(err);
            return { success: false, errors: [err.message] };
        });
    }
    if (exists.success === false) {
        message = `Destination dataset ${datasetId} in project ${projectName} does not exist or failed creating`;
        console.warn(message);
        return { success: false, errors: [message] };
    }

    //var results = await bqManager.createDatasetIfDoesNotExist(projectName, datasetId).then(() => {
        //console.log(`bqManager.createDatasetIfDoesNotExist: ${projectName} ${datasetId}`);
    var results = await bqManager.executeQuery(queryOptions).then(() => {
        console.log(`bqManager.extractTableToGCS: ${datasetId} ${tableId} ${bucketName} ${fileName}`);
        return bqManager.extractTableToGCS(datasetId, tableId, bucketName, fileName);
    }).then(() => {
        console.log(`storageManager.getUrl: ${bucketName} ${fileName}`);
        return storageManager.getUrl(bucketName, fileName, true);
    }).then((signedUrl) => {
        console.log(`bqManager.updateTableExpiration: ${datasetId} ${tableId} ${expiryTime}`);
        bqManager.updateTableExpiration(datasetId, tableId, expiryTime);
        return signedUrl;
    }).catch(error => {
        message = `BigQuery query failed: ${error}. Cleaning up`;
        console.warn(message);
        console.log(`Finally bqManager.updateTableExpiration: ${datasetId} ${tableId} ${expiryTime}`);
        bqManager.updateTableExpiration(datasetId, tableId, expiryTime);
        return { requestId: requestId, success: false, errors: [message] };
    });
    console.log(results);
    if (results.success === false) {
        return results;
    };
    return { requestId: requestId, signedUrl: results[0] };
}

module.exports = {
    createFulfillmentRequest,
    getFulfillmentRequest,
    processFulfillmentSubscriptionRequest,
    pullFulfillmentSubscriptionRequest,
    createFulfillment
};
