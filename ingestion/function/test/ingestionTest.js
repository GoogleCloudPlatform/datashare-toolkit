/**
 * Copyright 2019, Google, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */

const { argv, uuidv4 } = require('./testSetup');
const { BigQueryUtil, StorageUtil } = require('bqds-shared');
const storageUtil = new StorageUtil();
const bigQueryUtil = new BigQueryUtil(argv.projectId);
const fs = require('fs');
const path = require('path');

const assert = require('assert');
const chai = require('chai'), expect = chai.expect, should = chai.should();
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const ingestion = require("../index");
const uuid = uuidv4().replace(/-/gi, '_');
const bucketName = "bqds-unit-tests";

it("getExceptionString empty dictionary", () => {
    const e = {};
    expect(ingestion.getExceptionString(e)).is.equal("{}");
});

it("getExceptionString empty string", () => {
    const e = "";
    expect(ingestion.getExceptionString(e)).is.equal('""');
});

it("checking metadata defaults with no values provided", () => {
    const dict = { metadata: {} };
    const expected = {
        sourceFormat: "CSV",
        skipLeadingRows: 1,
        maxBadRecords: 0
    };
    expect(ingestion.setMetadataDefaults(dict)).is.eql(expected);
});

it("checking metadata defaults with values provided", () => {
    const dict = {
        metadata: {
            sourceFormat: "JSON",
            skipLeadingRows: 2,
            maxBadRecords: 1
        }
    };
    const expected = {
        sourceFormat: "JSON",
        skipLeadingRows: 2,
        maxBadRecords: 1
    };
    expect(ingestion.setMetadataDefaults(dict)).is.eql(expected);
});

it("get bucket uri", () => {
    const options = {
        eventId: 1,
        bucketName: "myBucket",
        fileName: "myFile.txt"
    };
    expect(ingestion.getBucketName(options)).is.equal("gs://myBucket/myFile.txt");
});

it("options are valid", () => {
    const options = {
        eventId: 1,
        bucketName: "myBucket",
        fileName: "myFile.txt"
    };
    expect(ingestion.validateOptions(options).isValid).is.true;
});

it("options are invalid", () => {
    const options = {};
    const result = ingestion.validateOptions(options);
    expect(result.isValid).is.false;
    expect(result.errors.length).is.equal(3);
});

if (argv.runCloudTests) {
    let configFileName = `bqds/${uuid}/config/${uuid}.schema.json`;

    it("create schema.json configuration file", async () => {
        const config = {
            "truncate": true,
            "metadata": {
                "fieldDelimiter": ",",
                "fields": [
                    {
                        "type": "STRING",
                        "name": "column1",
                        "mode": "NULLABLE"
                    },
                    {
                        "type": "STRING",
                        "name": "column2",
                        "mode": "NULLABLE"
                    }
                ]
            }
        };
        let json = JSON.stringify(config);
        let buf = Buffer.from(json);
        return storageUtil.createFile(bucketName, configFileName, buf, null, false);
    });

    it("check generated schema.json configuration", async () => {
        const options = {
            eventId: 1,
            bucketName: bucketName,
            fileName: `bqds/${uuid}/data/myFile.${uuid}.txt`
        };
        const config = await ingestion.getConfiguration(options);
        const expected = {
            bucket: bucketName,
            bucketPath: {
                schema: `bqds/${uuid}/config/${uuid}.schema.json`,
                transform: `bqds/${uuid}/config/${uuid}.transform.sql`
            },
            dataset: "myFile",
            destinationTable: uuid,
            eventId: 1,
            metadata: {
                fieldDelimiter: ",",
                fields: [
                    {
                        mode: "NULLABLE",
                        name: "column1",
                        type: "STRING"
                    },
                    {
                        mode: "NULLABLE",
                        name: "column2",
                        type: "STRING"
                    }
                ],
                maxBadRecords: 0,
                skipLeadingRows: 1,
                sourceFormat: "CSV"
            },
            sourceFile: `bqds/${uuid}/data/myFile.${uuid}.txt`,
            stagingTable: `TMP_${uuid}_1`,
            truncate: true
        };
        expect(config).is.eql(expected);
    });

    it("delete schema.json configuration file from bucket", async () => {
        storageUtil.deleteFile(bucketName, configFileName);
    });

    it("function integration test", async () => {
        const datasetName = `${uuid}_weather`;

        let schemaBucketFile = `bqds/${uuid}/config/${uuid}_observation.schema.json`;
        let sqlBucketFile = `bqds/${uuid}/config/${uuid}_observation.transform.sql`;
        let dataBucketFile = `bqds/${uuid}/data/${uuid}_weather.observation.csv`;

        let schemaFileCreated = false;
        let sqlFileCreated = false;
        let dataFileCreated = false;

        const schemaFile = path.join("..", "..", "tests", "config", "observation.schema.json");
        const schemaContent = fs.readFileSync(schemaFile);
        let schemaBuf = Buffer.from(schemaContent);

        return storageUtil.createFile(bucketName, schemaBucketFile, schemaBuf).then(() => {
            schemaFileCreated = true;
            const sqlFile = path.join("..", "..", "tests", "config", "observation.transform.sql");
            const sqlContent = fs.readFileSync(sqlFile);
            let sqlBuf = Buffer.from(sqlContent);
            return storageUtil.createFile(bucketName, sqlBucketFile, sqlBuf);
        }).then(() => {
            sqlFileCreated = true;
            const dataFile = path.join("..", "..", "tests", "data", "weather.observation.csv");
            const dataContent = fs.readFileSync(dataFile);
            let dataBuf = Buffer.from(dataContent);
            return storageUtil.createFile(bucketName, dataBucketFile, dataBuf);
        }).then(() => {
            dataFileCreated = true;
        }).catch((reason) => {
            console.log(`Error creating files: ${reason}`);
        }).then(() => {
            if (dataFileCreated === true) {
                const options = {
                    eventId: uuid,
                    bucketName: bucketName,
                    fileName: dataBucketFile
                };
                return ingestion.processFile(options);
            }
            return false;
        }).then((result) => {
            // Check if table exists returning boolean.
            return true;
        }).then((result) => {
            // Run query to get records
            const options = { query: `select * from \`${argv.projectId}.${datasetName}.observation\`` };
            console.log(`Executing query: ${JSON.stringify(options)}`);
            return bigQueryUtil.executeQuerySync(options);
        }).then((result) => {
            console.log("result of query");
            // Check count of records
            const [rows] = result;
            console.log(`count of rows is ${rows.length}`);
            expect(rows.length).is.equal(100);
        }).then((result) => {
            return bigQueryUtil.deleteDataset(datasetName);
        }).then((result) => {
            console.log(`Dataset ${datasetName} deleted`);
        }).catch((reason) => {
            console.log(`Error deleting dataset ${datasetName}: ${reason}`);
        }).then(() => {
            if (schemaFileCreated === true) {
                return storageUtil.deleteFile(bucketName, schemaBucketFile);
            }
            return [];
        }).catch((reason) => {
            console.log(`Error deleting file from storage '${schemaBucketFile}' with reason: ${reason}`);
        }).then(() => {
            if (sqlFileCreated === true) {
                return storageUtil.deleteFile(bucketName, sqlBucketFile);
            }
            return [];
        }).catch((reason) => {
            console.log(`Error deleting file from storage '${sqlBucketFile}' with reason: ${reason}`);
        }).then(() => {
            if (dataFileCreated === true) {
                return storageUtil.deleteFile(bucketName, dataBucketFile);
            }
            return [];
        }).catch((reason) => {
            console.log(`Error deleting file from storage '${dataBucketFile}' with reason: ${reason}`);
        });

        // TODO: Delete the folder instead of individual files.
    });
}