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
    options['destination']['fileName'] = createFileName(requestId);
    console.log(`RequestId: ${requestId}, options: ${JSON.stringify(options)}`);

    const query = querystring.encode({
        bucketName: options.destination.bucketName,
        fileName: options.destination.fileName
    });

    // create the fulfillment request now
    if (options.wait === true) {
        const data = await createFulfillment(requestId, options).catch(err => {
            console.warn(err);
            return { requestId: requestId, success: false, errors: [err.message] };
        });
        return { requestId: requestId, query: query, ...data }
    }

    // create the fulfillment pubsub message
    const customAttributes = {
        requestId: requestId
    }
    const pubsubTopicName = options.config.pubsubTopicName;
    await pubsubManager.publishMessage(pubsubTopicName, options, customAttributes).catch(err => {
        console.warn(err);
        return { requestId: requestId, success: false, errors: [err.message] };
    });
    //console.log(pubsubMessage);
    return { requestId: requestId, query: query };
}

/**
 * @param  {} options
 * Checks if the file exists and metadata matches the requestId
 */
async function getFulfillmentRequest(requestId, bucketName, fileName) {
    var message;
    console.log(`RequestId: ${requestId}, bucketName: ${bucketName}, fileName: ${fileName}`);

    const exists = await storageManager.checkIfFileExists(bucketName, fileName).catch(err => {
        console.warn(err);
        return { requestId: requestId, success: false, errors: [err.message] };
    });
    if (exists !== true) {
        return { requestId: requestId, ...exists };
    }

    const metadata = await storageManager.getFileMetadata(bucketName, fileName).catch(err => {
        console.warn(err);
        return { requestId: requestId, success: false, errors: [err.message] };
    });
    if (metadata.metadata.requestId === undefined || metadata.metadata.requestId !== requestId) {
        console.log(metadata.metadata);
        message = `fileName: '${fileName}' does not have the signature for requestId: '${requestId}'`;
        return { requestId: requestId, success: false, errors: [message] };
    }

    const signedUrl = await storageManager.getUrl(bucketName, fileName, true).catch(err => {
        console.warn(err);
        return { requestId: requestId, success: false, errors: [err.message] };
    });
    return { requestId: requestId, signedUrl: signedUrl[0] };
}

/**
 * @param  {}
 * Pulls message from GCP Pubsub subscription and processes fulfillment request
 */
async function pullFulfillmentSubscriptionRequest(options) {
    var message;

    // References an existing subscription
    const pubsubTopicName = options.config.pubsubTopicName;
    const subscriptionName = options.config.pubsubSubscriptionName;
    const exists = await pubsubManager.checkIfSubscriptionExists(pubsubTopicName, subscriptionName).catch(err => {
        console.warn(err);
        return { success: false, errors: [err.message] };
    });
    if (exists !== true) {
        return { ...exists };
    }
    const subscription = pubsubManager.getSubscription(subscriptionName);
    var messageData;
    let pubsubMessage = {};
    // async
    subscription.on('message', pubsubMessage => {
        console.log(pubsubMessage.attributes);
        //messageData = pubsubMessage.data;
        pubsubMessage.ack();
        return { data: pubsubMessage.attributes };
    })
    var message = `Fulfillment messages doe not exist`;
    return { success: false, code:400, errors: [message] };
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
    console.log(`Will execute query with options: ${JSON.stringify(queryOptions)}`);
    // Check if fileName exists
    const exists = await storageManager.checkIfFileExists(bucketName, fileName).catch(err => {
        console.warn(err);
        return { success: false, errors: [err.message] };
    });
    if (exists === true) {
        return { success: false, code:409, errors: ['Storage file [' + fileName + '] already exists'] };
    }
    // Execute Query to buffer
    const data = await bqManager.executeQuery(queryOptions).catch(err => {
        console.warn(err);
        return { success: false, errors: [err.message] };
    });
    const jsonString = JSON.stringify(data);
    const buf = Buffer.from(jsonString);
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
    const fileCreate = await storageManager.createFile(bucketName, fileName, buf, fileOptions).catch(err => {
        console.warn(err);
        return { success: false, errors: [err.message] };
    });
    if (fileCreate.success === false) {
        return fileCreate;
    }
    return { signedUrl: fileCreate.url };
}

module.exports = {
    createFulfillmentRequest,
    getFulfillmentRequest,
    pullFulfillmentSubscriptionRequest,
    createFulfillment
};
