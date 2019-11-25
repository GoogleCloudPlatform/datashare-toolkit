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
const storageUtil = new StorageUtil(argv.projectId, process.env.GOOGLE_APPLICATION_CREDENTIALS);

if (argv.runCloudTests) {

describe('storageUtil', function() {

    const uuid = uuidv4();
    const uuid2 = uuidv4();
    const projectName = argv.projectId;

    context('createBucket with arguments', function() {
        it("should return true", async () => {
            await storageUtil.createBucket(uuid).then((result) => {
                expect(result).to.be.a('boolean');
                expect(result).to.equal(true);
            }).then(() => {
                return storageUtil.deleteBucket(uuid);
            }).catch((reason) => {
                expect.fail(`Failed: ${reason}`);
            });
        });
    });

    //context('createBucket without arguments', function() {
        //it("should throw error", async () => {
           //expect(storageUtil.createBucket()).to.be.rejectedWith(TypeError);
        //});
    //});

    context('checkIfBucketExists with arguments', function() {
        it("should return true", async () => {
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
    });

    const jsonString = JSON.stringify({ foo: 'bar' });
    const buf = Buffer.from(jsonString);
    const options = { gzip: true, private: true };

    context('createFile with arguments', function() {
        it("should return true", async () => {
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
    });

    context('checkIfFileExists with arguments', function() {
        it("should return true", async () => {
            await storageUtil.createBucket(uuid).then(() => {
                return storageUtil.createFile(uuid, uuid, buf, options);
            }).then(() => {
                return storageUtil.checkIfFileExists(uuid, uuid);
            }).then((result) => {
                expect(result).to.be.a('boolean');
                expect(result).to.equal(true);
            }).then(() => {
                return storageUtil.deleteFile(uuid, uuid);
            }).then(() => {
                return storageUtil.deleteBucket(uuid);
            }).catch((reason) => {
                expect.fail(`Failed: ${reason}`);
            });
        });
    });

    context('getFileMetadata with arguments', function() {
        it("should return object", async () => {
            await storageUtil.createBucket(uuid).then(() => {
                return storageUtil.createFile(uuid, uuid, buf, options);
            }).then(() => {
                return storageUtil.getFileMetadata(uuid, uuid);
            }).then((result) => {
                expect(result).to.be.an('object');
                expect(result.name).to.equal(uuid);
            }).then(() => {
                return storageUtil.deleteFile(uuid, uuid);
            }).then(() => {
                return storageUtil.deleteBucket(uuid);
            }).catch((reason) => {
                expect.fail(`Failed: ${reason}`);
            });
        });
    });

    context('setFileMetadata with arguments', function() {
        it("should return true", async () => {
            await storageUtil.createBucket(uuid).then(() => {
                return storageUtil.createFile(uuid, uuid, buf, options);
            }).then(() => {
                const metadata = {
                    metadata: {
                        abc: "123"
                    }
                };
                return storageUtil.setFileMetadata(uuid, uuid, metadata);
            }).then((result) => {
                expect(result).to.be.a('boolean');
                expect(result).to.equal(true);
            }).then(() => {
                return storageUtil.deleteFile(uuid, uuid);
            }).then(() => {
                return storageUtil.deleteBucket(uuid);
            }).catch((reason) => {
                expect.fail(`Failed: ${reason}`);
            });
        });
    });

    context('fetchFileContent with arguments', function() {
        it("should return true", async () => {
            await storageUtil.createBucket(uuid).then(() => {
                return storageUtil.createFile(uuid, uuid, buf, options);
            }).then(() => {
                return storageUtil.fetchFileContent(uuid, uuid);
            }).then((result) => {
                expect(result).to.be.a('string');
                expect(result).to.equal(jsonString);
            }).then(() => {
                return storageUtil.deleteFile(uuid, uuid);
            }).then(() => {
                return storageUtil.deleteBucket(uuid);
            }).catch((reason) => {
                expect.fail(`Failed: ${reason}`);
            });
        });
    });

    context('getUrl with arguments', function() {
        it("should return string", async () => {
            await storageUtil.createBucket(uuid).then(() => {
                return storageUtil.createFile(uuid, uuid, buf, options);
            }).then(() => {
                return storageUtil.getUrl(uuid, uuid, true);
            }).then((result) => {
                expect(result).to.be.a('string');
                return storageUtil.getUrl(uuid, uuid, false);
            }).then((result) => {
                expect(result).to.be.a('string');
            }).then(() => {
                return storageUtil.deleteFile(uuid, uuid);
            }).then(() => {
                return storageUtil.deleteBucket(uuid);
            }).catch((reason) => {
                expect.fail(`Failed: ${reason}`);
            });
        });
    });
});
}

