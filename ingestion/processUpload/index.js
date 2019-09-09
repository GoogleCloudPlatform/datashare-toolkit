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
const path = require('path');
// TODO: Add StackDriver client libraries for alerting
const bigqueryClient = new BigQuery();
const storageClient = new Storage();
let datasetId;
const schemaFileName = "schema.json";
const transformFileName = "transform.sql";
const defaultLocation = 'US'
const defaultTransformQuery = "*";
const util = require('util');
const acceptable = ['csv', 'gz', 'txt', 'avro', 'json'];
const stagingTableExpiryDays = 2;
const processPrefix = "bqds";

exports.processEvent = async (event, context) => {
    console.log(`Object notification arrived for gs://${event.bucket}/${event.name}`);
    if (canProcess(event.name)) {
        const config = await extractConfiguration(event, context);
        const haveDataset = await datasetExists(config.dataset);
        if (!haveDataset) {
            console.log(`Dataset ${config.dataset} not found, creating...`);
            await createDataset(config.dataset);
            console.log(`Created dataset ${config.dataset}`);
        } else {
            console.log(`found dataset ${config.dataset}`);
        }
        await stageFile(config);
        await transform(config);
        await deleteTable(config.dataset, config.stagingTable);
    } else {
        console.log("ignoring file " + event.name + ", exiting");
    }
    return;
}

async function extractConfiguration(event, context) {
    const config = {};
    const dest = getDestination(event.name).split('.');
    config.dataset = dest[0];
    config.destinationTable = dest[1];
    config.metadata = await getMetadata(event.bucket, `${processPrefix}/${config.destinationTable}.${schemaFileName}`)
    config.stagingTable = `TMP_${config.destinationTable}_${context.eventId}`;
    config.sourceFile = event.name;
    config.bucket = event.bucket;
    config.eventId = context.eventId;
    return config;
}

/** determine whether a file suffix is recognized for ingestion */
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

function generateBatchId(config) {
    return [
        new Date().getTime(),
        config.eventId,
        config.bucket,
        config.sourceFile
    ].join(':');
}

async function transform(config) {
    const batchId = generateBatchId(config);
    const transformQuery = await fromStorage(config.bucket,
                                             `${processPrefix}/${config.destinationTable}.${transformFileName}`) || defaultTransformQuery;
    const dataset = await bigqueryClient.dataset(config.dataset);
    const exists = tableExists(config.dataset, config.destinationTable)
    if (!exists) {
        console.log(`creating table ${config.destinationTable} with ${config.metadata.fields}`);
        await dataset.createTable(config.destinationTable, { schema: config.metadata.fields });
    }
    const table = dataset.table(config.destinationTable);
    const transform = `SELECT ${transformQuery}, '${batchId}' AS ${processPrefix}_batch_id FROM \`${config.dataset}.${config.stagingTable}\``;
    console.log(`executing transform query: ${transform}`);
    const job = await runTransform(config.dataset, config.destinationTable, transform, config.metadata === undefined);
    console.log(`${job[0].metadata.id} ${job[0].metadata.statistics.query.statementType} ${job[0].metadata.configuration.jobType} ${job[0].metadata.status.state}`);
    console.log("processing done");
    return;
}

async function deleteTable(dataset, tableName) {
    const ds = await bigqueryClient.dataset(dataset);
    console.log('Deleting temp table ' + tableName);
    const toDelete = ds.table(tableName);
    const response = await toDelete.delete();
    console.log("delete table: " + JSON.stringify(response));
}

async function stageFile(config) {
    console.log(`using meta ` + JSON.stringify(config.metadata));
    const dataset = bigqueryClient.dataset(config.dataset);
    log(config);

    const today = new Date();
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
    const [job] = await table.load(storageClient.bucket(config.bucket).file(config.sourceFile),
        config.metadata || { autodetect: true });

    console.log(`${job.id} ${job.configuration.jobType} ${job.status.state} ${job.statistics.load.outputRows} rows`);
    return;
}

async function fromStorage(bucket, file) {
    try {
        return await storageClient
            .bucket(bucket)
            .file(file)
            .download();
    } catch (error) {
        console.info(`file ${file} not found in bucket ${bucket}`);
        return undefined;
    }
}

async function tableExists(datasetId, tableName) {
    const dataset = bigqueryClient.dataset(datasetId);
    const table = dataset.table(tableName);
    console.log(`${tableName}: ${table.exists}`);
    return await table.exists();
}

async function datasetExists(datasetId) {
    const dataset = bigqueryClient.dataset(datasetId);
    let results = await dataset.exists();
    console.log('dataset exists?: ' + JSON.stringify(results));
    return results.length > 0 ? results[0] : false;
}

async function createDataset(datasetId) {
    let dataset = bigqueryClient.dataset(datasetId);
    return await dataset.create()
}

async function runTransform(datasetId, destTableId, query) {
    const options = {
        location: defaultLocation,
        destinationTable: {
            projectId: process.env.GCP_PROJECT,
            datasetId: datasetId,
            tableId: destTableId
        },
        createDisposition: "CREATE_IF_NEEDED",
        writeDisposition: "WRITE_APPEND",
        query: query,
        jobPrefix: `${processPrefix}_`,
        timePartitioning: {
            type: 'DAY'
        }
    };
    return await bigqueryClient.createQueryJob(options);
}

async function getMetadata(bucket, schemaFileName) {
    const meta = {
        sourceFormat: 'CSV', // This doesn't seem to matter?
        skipLeadingRows: 1,
        maxBadRecords: 0,
        location: defaultLocation
    };
    let schema = await fromStorage(bucket, schemaFileName);
    if (!schema) {
        return undefined;
    } else {
        let config = JSON.parse(schema);
        meta.fields = config.fields;
        meta.fieldDelimiter = config.delimiter;
        log(meta);
        return meta;
    }
}

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

function log(message) {
    console.log(JSON.stringify(message, undefined, 1));
}
