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

const { BigQueryUtil, CloudFunctionUtil, StorageUtil, CommonUtil } = require('bqds-shared');
const bigqueryUtil = new BigQueryUtil();
const cloudFunctionUtil = new CloudFunctionUtil();
const storageUtil = new StorageUtil();
const commonUtil = CommonUtil;
const path = require("path");
const defaultTransformQuery = "*";
const acceptable = ['csv', 'gz', 'txt', 'avro', 'json'];
const stagingTableExpiryDays = 2;
const processPrefix = "bqds";
const batchIdColumnName = `${processPrefix}_batch_id`;
let batchId;

/**
 * @param  {} event
 * @param  {} context
 */
exports.processEvent = async (event, context) => {
    console.log(`Event type: ${context.eventType}`);
    if (context.eventType === "google.storage.object.finalize") {
        await processTriggerEvent(event, context);
    }
    else {
        await processHttpEvent(event, context);
    }
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
    const result = await validateOptions(options);
    if (!result.isValid) {
        return false;
    }
    const status = await processFile(options);
    return status;
}

/**
 * @param  {} request
 * @param  {} response
 * For local debugging.
 */
async function processHttpEvent(request, response) {
    const options = request.body || {};
    const result = await validateOptions(options);
    if (!result.isValid) {
        response.status(400).send({ errors: result.errors });
        return;
    }
    const status = await processFile(options);
    const statusCode = (status === true) ? 200 : 400;
    response.status(statusCode).send();
    return;
}

/**
 * @param  {} options
 */
async function validateOptions(options) {
    let errors = [];
    if (!options.eventId) {
        errors.push("options.eventId must be provided");
    }
    if (!options.bucketName) {
        errors.push("options.bucketName must be provided");
    }
    if (!options.fileName) {
        errors.push("options.fileName must be provided");
    }
    if (options.fileName && !commonUtil.isExtensionSupported(options.fileName, acceptable)) {
        errors.push(`File extension '${path.extname(options.fileName)}' in fileName '${options.fileName}' is not supported`);
    }
    if (options.bucketName && options.fileName) {
        const exists = await storageUtil.checkIfFileExists(options.bucketName, options.fileName);
        if (!exists) {
            errors.push(`File '${options.fileName}' not found in bucket: ${options.bucketName}`);
        }
    }
    if (errors.length === 0) {
        return { isValid: true };
    }
    else {
        console.log(`Options validation failed: ${errors.join(", ")}`);
        return { isValid: false, errors: errors };
    }
}

/**
 * @param  {} options
 */
async function processFile(options) {
    batchId = cloudFunctionUtil.generateBatchId(options.eventId, options.bucketName, options.fileName);
    console.log(`Object notification arrived for ${getBucketName(options)}, batchId is ${batchId}`);

    const config = await getConfiguration(options);
    const haveDataset = await bigqueryUtil.datasetExists(config.dataset);
    if (!haveDataset) {
        console.log(`Dataset ${config.dataset} not found, creating...`);
        await bigqueryUtil.createDataset(config.dataset);
        console.log(`Created dataset ${config.dataset}`);
    } else {
        console.log(`Found dataset ${config.dataset}`);
    }

    let success = true;
    await stageFile(config).then(() => {
        return transform(config);
    }).catch((reason) => {
        success = false;
        console.error(`Exception processing ${options.fileName}: ${reason}`);
    }).then(() => {
        return bigqueryUtil.deleteTable(config.dataset, config.stagingTable, true);
    }).catch((reason) => {
        console.error(`Exception processing ${options.fileName}: ${reason}`);
    });
    return success;
}

/**
 * @param  {} options
 */
function parseDerivedFileAttributes(options) {
    const dest = path.basename(options.fileName).split('.');
    const destinationTable = dest[1];
    const bucketPath = path.dirname(options.fileName);
    const schemaFileBucketPath = path.join(bucketPath, "..", "config", `${destinationTable}.schema.json`);
    const transformFileBucketPath = path.join(bucketPath, "..", "config", `${destinationTable}.transform.sql`);
    return {
        dataset: dest[0],
        destinationTable: dest[1],
        schemaPath: schemaFileBucketPath,
        transformPath: transformFileBucketPath
    };
}

/**
 * @param  {} options
 */
async function getConfiguration(options) {
    const attributes = parseDerivedFileAttributes(options);
    let config = {};

    const schemaExists = await storageUtil.checkIfFileExists(options.bucketName, attributes.schemaPath);
    if (schemaExists === true) {
        const schemaConfig = await storageUtil.fetchFileContent(options.bucketName, attributes.schemaPath);
        if (schemaConfig) {
            // This will pull in the dictionary from the configuration file. IE: includes destination, metadata, truncate, etc.
            config = JSON.parse(schemaConfig);

            // Updates the configured metadata to create necessary default values.
            config.metadata = setMetadataDefaults(config);
        }
    }

    // Runtime created properties
    config.dataset = attributes.dataset;
    config.destinationTable = attributes.destinationTable;
    config.stagingTable = `TMP_${attributes.destinationTable}_${options.eventId}`;
    config.sourceFile = options.fileName;
    config.bucket = options.bucketName;
    config.eventId = options.eventId;
    config.bucketPath = {
        schema: attributes.schemaPath,
        transform: attributes.transformPath
    };

    console.log(`Configuration: ${JSON.stringify(config)}`);
    return config;
}

/**
 * @param  {} config
 * Executes the SQL transformation.
 */
async function transform(config) {
    const transformExists = await storageUtil.checkIfFileExists(config.bucket, config.bucketPath.transform);

    let transformQuery = defaultTransformQuery;
    if (transformExists === true) {
        transformQuery = await storageUtil.fetchFileContent(config.bucket, config.bucketPath.transform);
    }
    // Blocked by TODO(b/144032584): Destination tables not respecting nullable/required modes specified in schema.json.
    // const dataset = bigqueryClient.dataset(config.dataset);
    // const exists = await bigqueryUtil.tableExists(config.dataset, config.destinationTable);
    // if (!exists) {
    //     console.log(`creating table ${config.destinationTable} with ${config.metadata.fields}`);
    //     await dataset.createTable(config.destinationTable, { schema: config.metadata.fields });
    // }
    const query = `SELECT ${transformQuery}, '${batchId}' AS ${batchIdColumnName} FROM \`${config.dataset}.${config.stagingTable}\``;
    console.log(`executing transform query: ${query}`);
    const [job] = await createTransformJob(config, query);
    await job.getQueryResults({ maxApiCalls: 1, maxResults: 0 });
    console.log(`Transform job: ${job.metadata.id} ${job.metadata.statistics.query.statementType} ${job.metadata.configuration.jobType} ${job.metadata.status.state}`);
    return;
}

/**
 * @param  {} config
 * Loads data into BQ staging table.
 */
async function stageFile(config) {
    console.log(`Using config ` + JSON.stringify(config));
    const dataset = bigqueryUtil.getDataset(config.dataset);
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
    console.log(`Executing load for ${config.sourceFile} with metadata: ${JSON.stringify(config.metadata)}`);

    try {
        let [job] = await table.load(storageUtil.getBucket(config.bucket).file(config.sourceFile), config.metadata || { autodetect: true });
        console.log(`${job.id} ${job.configuration.jobType} ${job.status.state} ${job.statistics.load.outputRows} rows`);
        return;
    } catch (ex) {
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
    console.log("Configuration for runTransform: " + JSON.stringify(config));
    let options = {
        destinationTable: {
            projectId: process.env.GCP_PROJECT,
            datasetId: config.dataset,
            tableId: config.destinationTable
        },
        createDisposition: "CREATE_IF_NEEDED",
        writeDisposition: (config.truncate)
            ? "WRITE_TRUNCATE"
            : "WRITE_APPEND",
        query: query,
        jobPrefix: `${processPrefix}_`,
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
    } catch (exception) {
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
 * @param  {} dict
 * Sets the default metadata values if meta is provided.
 */
function setMetadataDefaults(dict) {
    let meta = dict.metadata;
    if (!meta) {
        console.log("No metadata found");
        meta = {};
    }

    if (!meta.sourceFormat) {
        meta.sourceFormat = 'CSV';
    }

    if (!meta.skipLeadingRows) {
        meta.skipLeadingRows = 1;
    }

    if (!meta.maxBadRecords) {
        meta.maxBadRecords = 0;
    }

    if (process.env.VERBOSE_MODE) {
        console.log("Using metadata: " + JSON.stringify(meta));
    }
    return meta;
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

/**
 * @param  {} message
 */
function log(message) {
    console.log(JSON.stringify(message, undefined, 1));
}

if (process.env.UNIT_TESTS) {
    module.exports = {
        getExceptionString,
        setMetadataDefaults,
        getBucketName,
        validateOptions,
        getConfiguration,
        processFile
    };
}