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

const { BigQueryUtil, CloudFunctionUtil } = require('bqds-shared');
const bigqueryUtil = new BigQueryUtil();
const cloudFunctionUtil = new CloudFunctionUtil();

const { BigQuery } = require('@google-cloud/bigquery');
const { Storage } = require('@google-cloud/storage');
const bigqueryClient = new BigQuery();
const storageClient = new Storage();
const schemaFileName = "schema.json";
const transformFileName = "transform.sql";
const defaultLocation = 'US';
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
    batchId = cloudFunctionUtil.generateBatchId(event, context);
    console.log(`Object notification arrived for gs://${event.bucket}/${event.name}, batchId is ${batchId}`);

    if (cloudFunctionUtil.isExtensionSupported(event.name, acceptable, processPrefix)) {
        const config = await getConfiguration(event, context);
        const haveDataset = await bigqueryUtil.datasetExists(config.dataset);
        if (!haveDataset) {
            console.log(`Dataset ${config.dataset} not found, creating...`);
            await bigqueryUtil.createDataset(config.dataset);
            console.log(`Created dataset ${config.dataset}`);
        } else {
            console.log(`found dataset ${config.dataset}`);
        }
        try {
            await stageFile(config);
            await transform(config);
            await bigqueryUtil.deleteTable(config.dataset, config.stagingTable);
        } catch (exception) {
            console.error(`Exception processing ${event.name}: ${getExceptionString(exception)}`);
            return;
        }
    } else {
        console.log("ignoring file " + event.name + ", exiting");
    }
    return;
};

/**
 * @param  {} event
 * @param  {} context
 */
async function getConfiguration(event, context) {
    const dest = getDestination(event.name).split('.');
    const dataset = dest[0];
    const destinationTable = dest[1];

    const schemaConfig = await fromStorage(event.bucket, `${processPrefix}/${destinationTable}.${schemaFileName}`);
    let config = {};
    if (schemaConfig) {
        // This will pull in the dictionary from the configuration file. IE: includes destination, metadata, truncate, etc.
        config = JSON.parse(schemaConfig);

        // Updates the configured metadata to create necessary default values.
        config.metadata = setMetadataDefaults(config);
    }

    // Runtime created properties
    config.dataset = dataset;
    config.destinationTable = destinationTable;
    config.stagingTable = `TMP_${destinationTable}_${context.eventId}`;
    config.sourceFile = event.name;
    config.bucket = event.bucket;
    config.eventId = context.eventId;

    console.log("configuration: " + JSON.stringify(config));
    return config;
}

/**
 * Exceutes the sql transformation.
 * @param  {} config
 */
async function transform(config) {
    const transformQuery = await fromStorage(config.bucket,
        `${processPrefix}/${config.destinationTable}.${transformFileName}`) || defaultTransformQuery;
    // const dataset = bigqueryClient.dataset(config.dataset);
    // const exists = await bigqueryUtil.tableExists(config.dataset, config.destinationTable);
    // if (!exists) {
    //     console.log(`creating table ${config.destinationTable} with ${config.metadata.fields}`);
    //     await dataset.createTable(config.destinationTable, { schema: config.metadata.fields });
    // }
    const transform = `SELECT ${transformQuery}, '${batchId}' AS ${batchIdColumnName} FROM \`${config.dataset}.${config.stagingTable}\``;
    console.log(`executing transform query: ${transform}`);
    const job = await runTransform(config, transform);
    console.log(`${job[0].metadata.id} ${job[0].metadata.statistics.query.statementType} ${job[0].metadata.configuration.jobType} ${job[0].metadata.status.state}`);
    console.log("processing done");
    return;
}

/**
 * Loads data into BQ staging table.
 * @param  {} config
 */
async function stageFile(config) {
    console.log(`using config ` + JSON.stringify(config));
    const dataset = bigqueryClient.dataset(config.dataset);
    let today = new Date();
    today.setDate(today.getDate() + stagingTableExpiryDays);
    const expiryTime = today.getTime();
    console.log(`setting expirationTime for staging table to ${expiryTime}`);

    const fields = (config.metadata && config.metadata.fields) || undefined;

    const cfg = fields
        ? { schema: fields, expirationTime: expiryTime }
        : { autodetect: true, expirationTime: expiryTime };

    await dataset.createTable(config.stagingTable, cfg);

    const table = dataset.table(config.stagingTable);
    console.log(`created table ${config.stagingTable}`);
    console.log(`executing load for ${config.sourceFile} with ` + JSON.stringify(config.metadata));

    try {
        let [job] = await table.load(storageClient.bucket(config.bucket).file(config.sourceFile), config.metadata || { autodetect: true });
        console.log(`${job.id} ${job.configuration.jobType} ${job.status.state} ${job.statistics.load.outputRows} rows`);
        return;
    } catch (ex) {
        console.error(`Errors encountered loading ${config.sourceFile} to ${config.stagingTable}`);
        logException(ex);
        throw (ex);
    }
}

/**
 * @param  {} bucket
 * @param  {} file
 */
async function fromStorage(bucket, file) {
    try {
        let content = await storageClient
            .bucket(bucket)
            .file(file)
            .download();
        console.log(`Found gs://${bucket}/${file}: ${content}`);
        return content;
    } catch (error) {
        console.info(`File ${file} not found in bucket ${bucket}: ${getExceptionString(error)}`);
        return undefined;
    }
}

/**
 * Creates query job for the transformation query.
 * @param  {} config
 * @param  {} query
 */
async function runTransform(config, query) {
    console.log("configuration for runTransform: " + JSON.stringify(config));
    const options = {
        location: defaultLocation,
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
    console.log("BigQuery options: " + JSON.stringify(options));
    try {
        return await bigqueryClient.createQueryJob(options);
    } catch (exception) {
        console.error(`Exception encountered running transform: ${getExceptionString(exception)}`);
        logException(exception);
        throw (exception);
    }
}

function logException(exception) {
    const errors = exception.errors;
    if (errors && errors.length > 0) {
        for (let i = 0; i < errors.length; i++) {
            console.error('ERROR ' + (i + 1) + ": " + JSON.stringify(errors[i].message));
        }
    } else {
        console.error(`Exception thrown, but no error array was given: ${getExceptionString(exception)}`);
    }
}

/**
 * @param  {} bucket
 * @param  {} schemaFileName
 */
function setMetadataDefaults(dict) {
    if (!dict.metadata) {
        console.log("No metadata found");
        return dict;
    } else {
        const meta = dict.metadata;

        if (!meta.sourceFormat) {
            meta.sourceFormat = 'CSV';
        }

        if (!meta.skipLeadingRows) {
            meta.skipLeadingRows = 1;
        }

        if (!meta.maxBadRecords) {
            meta.maxBadRecords = 0;
        }

        if (!meta.location) {
            meta.location = defaultLocation;
        }

        console.log("using metadata: " + JSON.stringify(meta));
        return meta;
    }
}

/**
 * @param  {} fileName
 */
function getDestination(fileName) {
    let name = fileName.indexOf('/') >= 0 ?
        fileName.substring(fileName.lastIndexOf('/') + 1) :
        fileName;
    const parts = name.split('.');
    if (parts && parts.length > 0) {
        name = parts[1];
        name.replace('.', '_');
        name = name.replace('-', '_');
        name = name.replace(' ', '_');
        return `${parts[0]}.${parts[1]}`;
    }
    return name;
}

/**
 * @param  {} exception
 * Returns exception message in string format. Attempts to stringify JSON, if that's undefined, returns the exception as a string.
 */
function getExceptionString(exception) {
    let str = JSON.stringify(exception);
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
