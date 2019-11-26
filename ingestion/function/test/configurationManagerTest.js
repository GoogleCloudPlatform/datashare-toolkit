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
const { StorageUtil } = require('bqds-shared');
const storageUtil = new StorageUtil();

const chai = require('chai'), expect = chai.expect, should = chai.should();
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const configManager = require('../configurationManager');
const uuid = uuidv4().replace(/-/gi, '');
const bucketName = "bqds-unit-tests";

it("checking metadata defaults with no values provided", () => {
    const dict = { metadata: {} };
    const expected = {
        sourceFormat: "CSV",
        skipLeadingRows: 1,
        maxBadRecords: 0
    };
    expect(configManager.setMetadataDefaults(dict)).is.eql(expected);
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
    expect(configManager.setMetadataDefaults(dict)).is.eql(expected);
});

it("options are valid", async () => {
    const options = {
        eventId: 1,
        bucketName: bucketName,
        fileName: "/bqds/dataset/table/data/myFile.txt"
    };
    const v = await configManager.validateOptions(options, false);
    console.log(JSON.stringify(v));
    expect(v.isValid).is.true;
});

it("options are valid with archived file", async () => {
    const options = {
        eventId: 1,
        bucketName: bucketName,
        fileName: "/bqds/dataset/table/data/archive/myFile.txt"
    };
    const v = await configManager.validateOptions(options, false);
    console.log(JSON.stringify(v));
    expect(v.isDataFile).is.false;
});

it("options are invalid with bad path", async () => {
    const options = {
        eventId: 1,
        bucketName: bucketName,
        fileName: "/bqds/bqds/table/data/myFile.txt"
    };
    const result = await configManager.validateOptions(options, false);
    console.log(`Test result ${JSON.stringify(result)}`);
    expect(result.isValid).is.false;
    expect(result.errors.length).is.equal(1);
});

it("options are invalid", async () => {
    const options = {};
    const result = await configManager.validateOptions(options, false);
    expect(result.isValid).is.false;
    expect(result.errors.length).is.equal(3);
});

if (argv.runCloudTests) {
    let configFileName = `bqds/${uuid}/table/config/schema.json`;

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
            fileName: `bqds/${uuid}/table/data/myFile.${uuid}.txt`
        };
        const config = await configManager.getConfiguration(options);
        const expected = {
            bucket: bucketName,
            bucketPath: {
                archive: `bqds/${uuid}/table/data/archive/myFile.${uuid}.txt`,
                schema: configFileName,
                transform: `bqds/${uuid}/table/config/transform.sql`
            },
            dataset: uuid,
            destinationTableId: "table",
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
            sourceFile: `bqds/${uuid}/table/data/myFile.${uuid}.txt`,
            stagingTable: `TMP_table_1`,
            truncate: true
        };
        expect(config).is.eql(expected);
    });

    it("delete schema.json configuration file from bucket", async () => {
        storageUtil.deleteFile(bucketName, configFileName);
    });
}