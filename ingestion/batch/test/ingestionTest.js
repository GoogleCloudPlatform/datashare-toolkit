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
const { BigQueryUtil, StorageUtil } = require('cds-shared');
const storageUtil = new StorageUtil();
const bigqueryUtil = new BigQueryUtil(argv.projectId);
const fs = require('fs');
const path = require('path');

const assert = require('assert');
const chai = require('chai'), expect = chai.expect, should = chai.should();
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

process.env.ARCHIVE_FILES = "true";
const ingestion = require("../index");
const uuid = uuidv4().replace(/-/gi, '');
const bucketName = "cds-unit-tests";

it("getExceptionString empty dictionary", () => {
    const e = {};
    expect(ingestion.getExceptionString(e)).is.equal("{}");
});

it("getExceptionString empty string", () => {
    const e = "";
    expect(ingestion.getExceptionString(e)).is.equal('""');
});

it("get bucket uri", () => {
    const options = {
        eventId: 1,
        bucketName: "myBucket",
        fileName: "myFile.txt"
    };
    expect(ingestion.getBucketName(options)).is.equal("gs://myBucket/myFile.txt");
});

if (argv.runCloudTests) {
    it("function integration test", async () => {
        const datasetName = `${uuid}`;
        const tableName = "observation";

        let schemaBucketFile = `cds/${datasetName}/${tableName}/config/schema.json`;
        let sqlBucketFile = `cds/${datasetName}/${tableName}/config/transform.sql`;
        let dataBucketFile = `cds/${datasetName}/${tableName}/data/weather.observation.csv`;
        let dataArchiveBucketFile = `cds/${datasetName}/${tableName}/data/archive/weather.observation.csv`;

        let schemaFileCreated = false;
        let sqlFileCreated = false;
        let dataFileCreated = false;

        const schemaFile = path.join(__dirname, "config", "observation.schema.json");
        const schemaContent = fs.readFileSync(schemaFile);
        let schemaBuf = Buffer.from(schemaContent);

        return storageUtil.createFile(bucketName, schemaBucketFile, schemaBuf).then(() => {
            schemaFileCreated = true;
            const sqlFile = path.join(__dirname, "config", "observation.transform.sql");
            const sqlContent = fs.readFileSync(sqlFile);
            let sqlBuf = Buffer.from(sqlContent);
            return storageUtil.createFile(bucketName, sqlBucketFile, sqlBuf);
        }).then(() => {
            sqlFileCreated = true;
            const dataFile = path.join(__dirname, "data", "weather.observation.csv");
            const dataContent = fs.readFileSync(dataFile);
            let dataBuf = Buffer.from(dataContent);
            return storageUtil.createFile(bucketName, dataBucketFile, dataBuf);
        }).then(() => {
            dataFileCreated = true;
        }).catch((reason) => {
            expect.fail(`Failed to save files to Cloud Storage: ${reason}`);
        }).then(() => {
            if (dataFileCreated === true) {
                const options = {
                    eventId: uuid,
                    bucketName: bucketName,
                    fileName: dataBucketFile
                };
                return ingestion.processFile(options);
            }
            else {
                return false;
            }
        }).then((result) => {
            expect(result).to.be.true;
        }).then(() => {
            return bigqueryUtil.tableExists(datasetName, tableName);
        }).then((result) => {
            expect(result).to.be.true;
        }).then(() => {
            return bigqueryUtil.getTableLabelValue(datasetName, tableName, ingestion.labelName);
        }).then((label) => {
            expect(label).equals("true");
        }).then(() => {
            const options = { query: `select * from \`${datasetName}.${tableName}\`` };
            return bigqueryUtil.executeQuerySync(options);
        }).then((result) => {
            const [rows] = result;
            expect(rows.length).is.equal(100);
        }).then(() => {
            expect(bigqueryUtil.deleteDataset(datasetName, true)).to.eventually.be.true;
        }).then(() => {
            if (schemaFileCreated === true) {
                expect(storageUtil.deleteFile(bucketName, schemaBucketFile, true)).to.eventually.be.true;
            }
        }).then(() => {
            if (sqlFileCreated === true) {
                expect(storageUtil.deleteFile(bucketName, sqlBucketFile, true)).to.eventually.be.true;
            }
        }).then(() => {
            if (dataFileCreated === true) {
                expect(storageUtil.deleteFile(bucketName, dataArchiveBucketFile, true)).to.eventually.be.true;
            }
        }).then(() => {
            if (dataFileCreated === true) {
                expect(storageUtil.deleteFile(bucketName, dataBucketFile, true)).to.eventually.be.false;
            }
        }).catch((reason) => {
            console.log(`Exception: ${reason}`);
            assert.fail(reason);
        });
    });
}