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

const assert = require('assert');
const chai = require('chai'), expect = chai.expect, should = chai.should();
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const StorageUtil = require("../storageUtil");
const storageUtil = new StorageUtil(argv.projectId);

if (argv.runCloudTests) {

    const uuid = uuidv4();
    const projectName = argv.projectId;

    it("createBucket and deleteBucket", async () => {
        await storageUtil.createBucket(uuid).then((result) => {
            expect(result).to.be.a('boolean');
            expect(result).to.equal(true);
        }).then(() => {
            return storageUtil.deleteBucket(uuid);
        }).catch((reason) => {
            expect.fail(`Failed: ${reason}`);
        });
    });

    it("createBucket and checkIfBucketExists", async () => {
        await storageUtil.createBucket(uuid).then(() => {
            return storageUtil.checkIfBucketExists(uuid);
        }).then((result) => {
            expect(result).to.be.a('boolean');
            expect(result).to.equal(true);
        }).then(() => {
            return storageUtil.deleteBucket(uuid);
        }).catch((reason) => {
            expect.fail(`Failed: ${reason}`);
        });
    });

    const jsonString = JSON.stringify({ foo: 'bar' });
    const buf = Buffer.from(jsonString);
    const options = { gzip: true, private: true };

    it("createBucket, createFile, deleteFile, and deleteBucket", async () => {
        await storageUtil.createBucket(uuid).then(() => {
            return storageUtil.createFile(uuid, uuid, buf, options);
        }).then((result) => {
            expect(result).to.be.a('boolean');
            expect(result).to.equal(true);
        }).then(() => {
            return storageUtil.deleteFile(uuid, uuid);
        }).then((result) => {
            expect(result).to.be.a('boolean');
            expect(result).to.equal(true);
        }).then(() => {
            return storageUtil.deleteBucket(uuid);
        }).catch((reason) => {
            expect.fail(`Failed: ${reason}`);
        });
    });

}
