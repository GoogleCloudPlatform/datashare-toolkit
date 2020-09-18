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

const { BigQueryUtil, CloudFunctionUtil, StorageUtil } = require('cds-shared');
const configManager = require('./configurationManager');
const bigqueryUtil = new BigQueryUtil();
const cloudFunctionUtil = new CloudFunctionUtil();
const storageUtil = new StorageUtil();
const stagingTableExpiryDays = 2;
const cfg = require('./config');
const batchIdColumnName = `${cfg.pathPrefix}_batch_id`;
const labelName = "datashare_managed";
const queryResultTimeoutMs = 540000;
let batchId;
const archiveEnabled = process.env.ARCHIVE_FILES ? (process.env.ARCHIVE_FILES.toLowerCase() === "true") : false;

/**
 * @param  {} event
 * @param  {} context
 */
exports.processEvent = async (event, context) => {
    console.log(`Event type: ${context.eventType}`);
    await processTriggerEvent(event, context);
};

/**
 * @param  {} request
 * @param  {} response
 */
exports.processHttpEvent = async (request, response) => {
    await processHttpEvent(request, response);
};

/**
 * @param  {} event
 * @param  {} context
 * For Cloud Storage finalize trigger.
 */
async function processTriggerEvent(event, context) {
    const options = {
        eventId: context.eventId,
        bucketName: event.bucket,
        fileName: event.name
    };
    const result = await configManager.validateOptions(options, true);
    if (result.hasException) {
        throw new Error(`Validation error for fileName: ${options.fileName}: ${JSON.stringify(result)}`);
    }
    else if (result.isValid) {
        await processFile(options, true);
    }
}

/**
 * @param  {} request
 * @param  {} response
 * For local debugging.
 */
async function processHttpEvent(request, response) {
    const options = request.body || {};
    const result = await configManager.validateOptions(options, true);
    if (!result.isValid || result.hasException) {
        response.status(400).send({ errors: result.errors });
        return;
    }
    const status = await processFile(options, false);
    const statusCode = (status === true) ? 200 : 400;
    response.status(statusCode).send();
    return;
}

/**
 * @param  {} options
 */
async function processFile(options, throws) {
    batchId = cloudFunctionUtil.generateBatchId(options.eventId, options.bucketName, options.fileName);
    console.log(`processFile called for ${getBucketName(options)}, batchId is ${batchId}`);

    const config = await configManager.getConfiguration(options);
    const haveDataset = await bigqueryUtil.datasetExists(config.datasetId);
    if (!haveDataset) {
        console.log(`Dataset ${config.datasetId} not found, creating...`);

        const options = {
            labels: {}
        };
        options.labels[labelName] = "true";

        await bigqueryUtil.createDataset(config.datasetId, options);
        console.log(`Created dataset ${config.datasetId}`);
    } else {
        console.log(`Found dataset ${config.datasetId}`);
    }

    let success = false;
    let ex;
    try {
        await stageFile(config);
        await transform(config);
        if (archiveEnabled === true) {
            await storageUtil.moveFile(options.bucketName, config.sourceFile, config.bucketPath.archive);
            console.log(`File '${config.sourceFile}' has been archived to: ${config.bucketPath.archive}`);
        }
        success = true;
    }
    catch (reason) {
        ex = `Exception processing ${options.fileName}: ${reason}`;
        console.error(ex);
    }
    finally {
        await bigqueryUtil.deleteTable(config.datasetId, config.stagingTable, true);
    }

    if (throws && !success) {
        throw ex;
    }

    return success;
}

/**
 * @param  {} config
 * Executes the SQL transformation.
 */
async function transform(config) {
    const transformExists = await storageUtil.checkIfFileExists(config.bucket, config.bucketPath.transform);

    let transformQuery = "*";
    if (transformExists === true) {
        let transformContent = await storageUtil.fetchFileContent(config.bucket, config.bucketPath.transform);
        if (transformContent && transformContent.trim() !== '') {
            transformQuery = transformContent;
        }
    }

    const query = `SELECT ${transformQuery}, '${batchId}' AS ${batchIdColumnName} FROM \`${config.datasetId}.${config.stagingTable}\``;
    console.log(`Executing transform query: ${query}`);
    const [job] = await createTransformJob(config, query);
    await job.getQueryResults({ maxApiCalls: 1, maxResults: 0, timeoutMs: queryResultTimeoutMs });

    console.log('Setting table label');
    // Label the table for managing and tracking
    await bigqueryUtil.setTableLabel(config.datasetId, config.destinationTableId, labelName, "true");
    console.log('Setting table label done');

    console.log(`Transform job: ${job.metadata.id} ${job.metadata.statistics.query.statementType} ${job.metadata.configuration.jobType} ${job.metadata.status.state}`);
    return;
}

/**
 * @param  {} config
 * Loads data into BQ staging table.
 */
async function stageFile(config) {
    console.log(`Using config ${JSON.stringify(config)}`);
    const dataset = bigqueryUtil.getDataset(config.datasetId);
    let today = new Date();
    today.setDate(today.getDate() + stagingTableExpiryDays);
    const expiryTime = today.getTime();
    console.log(`Setting expirationTime for staging table to ${expiryTime}`);

    const fields = (config.metadata && config.metadata.fields) || undefined;
    let options = { expirationTime: expiryTime };
    if (fields) {
        options.schema = fields;
    }
    else {
        options.autodetect = true;
    }

    await dataset.createTable(config.stagingTable, options);
    const table = dataset.table(config.stagingTable);
    console.log(`Created table ${config.stagingTable}`);
    console.log(`Executing load for ${config.sourceFile} with config: ${JSON.stringify(config)}`);

    try {
        let [job] = await table.load(storageUtil.getBucket(config.bucket).file(config.sourceFile), config.metadata || { autodetect: true });
        console.log(`${job.id} ${job.configuration.jobType} ${job.status.state} ${job.statistics.load.outputRows} rows`);
        return;
    }
    catch (ex) {
        console.error(`Errors encountered loading ${config.sourceFile} to ${config.stagingTable}`);
        logException(ex);
        throw (ex);
    }
}

/**
 * @param  {} config
 * @param  {} query
 * Creates query job for the transformation query.
 */
async function createTransformJob(config, query) {
    console.log(`Configuration for runTransform: ${JSON.stringify(config)}`);

    // process.env.GCP_PROJECT is currently used by unit tests
    // This var is not supported in cloud function node.js 10 + environments
    // https://cloud.google.com/functions/docs/env-var#nodejs_10_and_subsequent_runtimes
    let projectId = null;
    if (!process.env.GCP_PROJECT) {
        const gcpMetadata = require('gcp-metadata');
        const isAvailable = await gcpMetadata.isAvailable();
        if (isAvailable === true) {
            projectId = await gcpMetadata.project('project-id');
            console.log(`Project Id is: ${projectId}`); // ...Project ID of the running instance 
        } else {
            console.log('gcpMetadata is unavailable, unable to determine projectId');
            throw new Error('Unable to determine GCP Project Id');
        }
    } else {
        projectId = process.env.GCP_PROJECT;
    }

    let options = {
        destinationTable: {
            projectId: projectId,
            datasetId: config.datasetId,
            tableId: config.destinationTableId
        },
        createDisposition: "CREATE_IF_NEEDED",
        writeDisposition: (config.truncate)
            ? "WRITE_TRUNCATE"
            : "WRITE_APPEND",
        query: query,
        jobPrefix: `${cfg.pathPrefix}_`,
        timePartitioning: {
            type: 'DAY'
        }
    };

    if (config.metadata && config.metadata.location) {
        options.location = config.metadata.location;
    }

    console.log(`BigQuery options: ${JSON.stringify(options)}`);
    try {
        return bigqueryUtil.createQueryJob(options);
    }
    catch (exception) {
        console.error(`Exception encountered running transform: ${getExceptionString(exception)}`);
        logException(exception);
        throw (exception);
    }
}

/**
 * @param  {} exception
 */
function logException(exception) {
    const errors = exception.errors;
    if (errors && errors.length > 0) {
        for (let i = 0; i < errors.length; i++) {
            console.error('ERROR ' + (i + 1) + ": " + JSON.stringify(errors[i].message));
        }
    }
    else {
        console.error(`Exception thrown, but no error array was given: ${exception}`);
    }
}

/**
 * @param  {} options
 */
function getBucketName(options) {
    return `gs://${options.bucketName}/${options.fileName}`;
}

/**
 * @param  {} exception
 * Returns exception message in string format. Attempts to stringify JSON, if that's undefined, returns the exception as a string.
 * TODO: This isn't working as expected. When a string is passed, it's returning {}.
 * IE: TypeError: storageUtil.getBucket(...).file is not a function
 */
function getExceptionString(exception) {
    let str = JSON.stringify(exception);
    // Try to parse to json using JSON.parse, and only if returns true, then return the json string, otherwise return object.
    if (!str) {
        str = exception;
    }
    return str;
}

if (process.env.UNIT_TESTS) {
    module.exports = {
        getExceptionString,
        getBucketName,
        processFile,
        labelName
    };
}