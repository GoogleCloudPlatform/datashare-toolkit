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

describe('StorageUtil', () => {

    if (argv.runCloudTests) {

        const uuid = uuidv4();
        const projectId = argv.projectId;

        context('createBucket with arguments', () => {
            it("should return true", async () => {
                let uuid = uuidv4();
                await storageUtil.createBucket(uuid).then(() => {
                    return storageUtil.deleteBucket(uuid);
                }).catch((reason) => {
                    expect.fail(`Failed: ${reason}`);
                });
            });
        });

        describe('Bucket created/deleted in pre/post setup', () => {

            before(async () => {
                await storageUtil.createBucket(uuid);
            });
            after(async () => {
                await storageUtil.deleteBucket(uuid);
            });

            const jsonString = JSON.stringify({ foo: 'bar' });
            const buf = Buffer.from(jsonString);
            const options = { gzip: true };

            context('bucketExists with arguments', () => {
                it("should return true", async () => {
                    await storageUtil.bucketExists(uuid).then((result) => {
                        expect(result).to.be.a('boolean');
                        expect(result).to.equal(true);
                    }).catch((reason) => {
                        expect.fail(`Failed: ${reason}`);
                    });
                });
            });

            context('createFile with arguments', () => {
                it("should return true", async () => {
                    await storageUtil.createFile(uuid, uuid, buf, options).then((result) => {
                        expect(result).to.be.a('boolean');
                        expect(result).to.equal(true);
                    }).then(() => {
                        return storageUtil.deleteFile(uuid, uuid);
                    }).then((result) => {
                        expect(result).to.be.a('boolean');
                        expect(result).to.equal(true);
                    }).catch((reason) => {
                        expect.fail(`Failed: ${reason}`);
                    });
                });
            });

        });

        describe('Bucket and file created/delete in pre/post setup', () => {

            before(async () => {
                await storageUtil.createBucket(uuid);
                await storageUtil.createFile(uuid, uuid, buf, options);
            });
            after(async () => {
                await storageUtil.deleteFile(uuid, uuid);
                await storageUtil.deleteBucket(uuid);
            });

            const jsonString = JSON.stringify({ foo: 'bar' });
            const buf = Buffer.from(jsonString);
            const options = { gzip: true };

            context('fileExists with arguments', () => {
                it("should return true", async () => {
                    await storageUtil.fileExists(uuid, uuid).then((result) => {
                        expect(result).to.be.a('boolean');
                        expect(result).to.equal(true);
                    }).catch((reason) => {
                        expect.fail(`Failed: ${reason}`);
                    });
                });
            });

            context('moveFile with arguments', () => {
                it("should return true", async () => {
                    const tempFileName = 'temp_file_name';
                    await storageUtil.moveFile(uuid, uuid, tempFileName).then((result) => {
                        expect(result).to.be.a('boolean');
                        expect(result).to.equal(true);
                    }).then(() => {
                        return storageUtil.moveFile(uuid, tempFileName, uuid);
                    }).then((result) => {
                        expect(result).to.be.a('boolean');
                        expect(result).to.equal(true);
                    }).catch((reason) => {
                        expect.fail(`Failed: ${reason}`);
                    });
                });
            });

            context('getFileMetadata with arguments', () => {
                it("should return object", async () => {
                    await storageUtil.getFileMetadata(uuid, uuid).then((result) => {
                        expect(result).to.be.an('object');
                        expect(result.name).to.equal(uuid);
                    }).catch((reason) => {
                        expect.fail(`Failed: ${reason}`);
                    });
                });
            });

            context('setFileMetadata with arguments', () => {
                it("should return true", async () => {
                    const metadata = {
                        metadata: {
                            abc: "123"
                        }
                    };
                    await storageUtil.setFileMetadata(uuid, uuid, metadata).then((result) => {
                        expect(result).to.be.a('boolean');
                        expect(result).to.equal(true);
                    }).catch((reason) => {
                        expect.fail(`Failed: ${reason}`);
                    });
                });
            });

            context('fetchFileContent with arguments', () => {
                it("should return true", async () => {
                    await storageUtil.fetchFileContent(uuid, uuid).then((result) => {
                        expect(result).to.be.a('string');
                        expect(result).to.equal(jsonString);
                    }).catch((reason) => {
                        expect.fail(`Failed: ${reason}`);
                    });
                });
            });

            context('getUrl with arguments', () => {
                it("should return string", async () => {
                    await storageUtil.getUrl(uuid, uuid, true).then((result) => {
                        expect(result).to.be.a('string');
                        return storageUtil.getUrl(uuid, uuid, false);
                    }).then((result) => {
                        expect(result).to.be.a('string');
                    }).catch((reason) => {
                        expect.fail(`Failed: ${reason}`);
                    });
                });
            });

        });

    }

});

