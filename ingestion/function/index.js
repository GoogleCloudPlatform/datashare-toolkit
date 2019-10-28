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
const bigqueryClient = new BigQuery();
const storageClient = new Storage();
const schemaFileName = "schema.json";
const transformFileName = "transform.sql";
const defaultLocation = 'US';
const defaultTransformQuery = "*";
const acceptable = ['csv', 'gz', 'txt', 'avro', 'json'];
const stagingTableExpiryDays = 2;
const processPrefix = "bqds";

/**
 * @param  {} event
 * @param  {} context
 */
exports.processEvent = async (event, context) => {
    console.log(`Object notification arrived for gs://${event.bucket}/${event.name}`);
    if (canProcess(event.name)) {
        const config = await getConfiguration(event, context);
        const haveDataset = await datasetExists(config.dataset);
        if (!haveDataset) {
            console.log(`Dataset ${config.dataset} not found, creating...`);
            await createDataset(config.dataset);
            console.log(`Created dataset ${config.dataset}`);
        } else {
            console.log(`found dataset ${config.dataset}`);
        }
        try {
            await stageFile(config);
            await transform(config);
            await deleteTable(config.dataset, config.stagingTable);
        } catch (exception) {
            console.error(`Exception processing ${event.name}: ` + JSON.stringify(exception));
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
    const config = {};
    const dest = getDestination(event.name).split('.');
    config.dataset = dest[0];
    config.destinationTable = dest[1];
    config.metadata = await getMetadata(event.bucket, `${processPrefix}/${config.destinationTable}.${schemaFileName}`);
    config.stagingTable = `TMP_${config.destinationTable}_${context.eventId}`;
    config.sourceFile = event.name;
    config.bucket = event.bucket;
    config.eventId = context.eventId;
    console.log("configuration: " + JSON.stringify(config));
    return config;
}

/**
 * Determine whether a file suffix is recognized for ingestion.
 * @param  {} fileName
 */
function canProcess(fileName) {
    const parts = fileName.split('.');
    if (parts[0] &&
        (parts[0].startsWith(processPrefix)
            || parts[0].startsWith(`/${processPrefix}`))) {
        return false;
    } else {
        const ext = parts[parts.length - 1];
        console.log(`file has extension ${ext}`);
        return acceptable.includes(ext.toLowerCase());
    }
}

/**
 * Generates the batch Id.
 * @param  {} config
 */
function generateBatchId(config) {
    return [
        new Date().getTime(),
        config.eventId,
        config.bucket,
        config.sourceFile
    ].join(':');
}

/**
 * Exceutes the sql transformation.
 * @param  {} config
 */
async function transform(config) {
    const batchId = generateBatchId(config);
    const transformQuery = await fromStorage(config.bucket,
        `${processPrefix}/${config.destinationTable}.${transformFileName}`) || defaultTransformQuery;
    const dataset = bigqueryClient.dataset(config.dataset);
    const exists = tableExists(config.dataset, config.destinationTable);
    if (!exists) {
        console.log(`creating table ${config.destinationTable} with ${config.metadata.fields}`);
        await dataset.createTable(config.destinationTable, { schema: config.metadata.fields });
    }
    const transform = `SELECT ${transformQuery}, '${batchId}' AS ${processPrefix}_batch_id FROM \`${config.dataset}.${config.stagingTable}\``;
    console.log(`executing transform query: ${transform}`);
    const job = await runTransform(config, transform);
    console.log(`${job[0].metadata.id} ${job[0].metadata.statistics.query.statementType} ${job[0].metadata.configuration.jobType} ${job[0].metadata.status.state}`);
    console.log("processing done");
    return;
}

/**
 * Deletes a BQ table.
 * @param  {} dataset
 * @param  {} tableName
 */
async function deleteTable(dataset, tableName) {
    const ds = bigqueryClient.dataset(dataset);
    console.log('Deleting temp table ' + tableName);
    const toDelete = ds.table(tableName);
    const response = await toDelete.delete();
    console.log("delete table: " + JSON.stringify(response));
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
        console.log(`found gs://${bucket}/${file}: ${content}`);
        return content;
    } catch (error) {
        console.info(`file ${file} not found in bucket ${bucket}`);
        return undefined;
    }
}

/**
 * Returns value indicating if a BQ table exists.
 * @param  {} datasetId
 * @param  {} tableName
 */
async function tableExists(datasetId, tableName) {
    const dataset = bigqueryClient.dataset(datasetId);
    const table = dataset.table(tableName);
    console.log(`${tableName}: ${table.exists}`);
    return await table.exists();
}

/**
 * Returns value indicating if a BQ dataset exists.
 * @param  {} datasetId
 */
async function datasetExists(datasetId) {
    const dataset = bigqueryClient.dataset(datasetId);
    const results = await dataset.exists();
    console.log('dataset exists?: ' + JSON.stringify(results));
    return results.length > 0 ? results[0] : false;
}

/**
 * Creates a dataset.
 * @param  {} datasetId
 */
async function createDataset(datasetId) {
    const dataset = bigqueryClient.dataset(datasetId);
    return await dataset.create();
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
        writeDisposition: (config.metadata && config.metadata.truncate)
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
        console.error("Exception encountered running transform: " + JSON.stringify(exception));
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
        console.error("Exception thrown, but no error array was given: " + JSON.stringify(exception));
    }
}

/**
 * @param  {} bucket
 * @param  {} schemaFileName
 */
async function getMetadata(bucket, schemaFileName) {
    const schemaConfig = await fromStorage(bucket, schemaFileName);
    console.log("schema.json: " + schemaConfig);
    if (!schemaConfig) {
        console.log("No metadata found");
        return undefined;
    } else {
        const config = JSON.parse(schemaConfig);
        const meta = config.metadata;
        meta.truncate = config.truncate;
        meta.sourceFormat = 'CSV'; // This doesn't seem to matter?

        if (config.skipLeadingRows) {
            meta.skipLeadingRows = skipLeadingRows;
        }
        else {
            meta.skipLeadingRows = 1;
        }

        meta.maxBadRecords = 0;
        meta.location = defaultLocation;
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
 * @param  {} message
 */
function log(message) {
    console.log(JSON.stringify(message, undefined, 1));
}
