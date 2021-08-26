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

const PubSubUtil = require("../pubSubUtil");
const pubSubUtil = new PubSubUtil(argv.projectId);

describe('PubSubUtil', () => {

    if (argv.runCloudTests) {

        // PubSub resource names must start with a letter:  https://cloud.google.com/pubsub/docs/admin#resource_names for more information.
        const uuid = 'a' + uuidv4();
        const projectId = argv.projectId;

        context('createTopic with arguments', () => {
            it("should return true", async () => {
                await pubSubUtil.createTopic(uuid).then(() => {
                    return pubSubUtil.deleteTopic(uuid);
                }).catch((reason) => {
                    expect.fail(`Failed: ${reason}`);
                });
            });
        });

        describe('Topic created/deleted in pre/post setup', () => {

            before(async () => {
                await pubSubUtil.createTopic(uuid);
            });
            after(async () => {
                await pubSubUtil.deleteTopic(uuid);
            });

            context('createSubscription with arguments', () => {
                it("should return true", async () => {
                    await pubSubUtil.createSubscription(uuid, uuid).then(() => {
                        return pubSubUtil.deleteSubscription(uuid, uuid);
                    }).then((result) => {
                        expect(result).to.be.a('boolean');
                        expect(result).to.equal(true);
                    }).catch((reason) => {
                        expect.fail(`Failed: ${reason}`);
                    });
                });
            });

        });

        describe('Topic and subscription created/deleted in pre/post setup', () => {

            before(async () => {
                await pubSubUtil.createTopic(uuid);
                await pubSubUtil.createSubscription(uuid, uuid);
            });
            after(async () => {
                await pubSubUtil.deleteSubscription(uuid, uuid);
                await pubSubUtil.deleteTopic(uuid);
            });

            context('checkIfSubscriptionExists with arguments', () => {
                it("should return true", async () => {
                    await pubSubUtil.checkIfSubscriptionExists(uuid, projectId, uuid).then((result) => {
                        expect(result).to.be.a('boolean');
                        expect(result).to.equal(true);
                    }).catch((reason) => {
                        expect.fail(`Failed: ${reason}`);
                    });
                });
            });

            const message = {
                abc: '123'
            };
            const customAttr = {
                foo: 'bar'
            };

            context('publishMessage with arguments', () => {
                it("should return a string", async () => {
                    await pubSubUtil.publishMessage(uuid, message, customAttr).then((result) => {
                        expect(result).to.be.a('string');
                    }).then(() => {
                        return pubSubUtil.getMessage(projectId, uuid);
                    }).catch((reason) => {
                        expect.fail(`Failed: ${reason}`);
                    });
                });
            });

            context('getMessage with arguments', () => {
                it("should return an object", async () => {
                    await pubSubUtil.publishMessage(uuid, message, customAttr).then(() => {
                        return pubSubUtil.getMessage(projectId, uuid);
                    }).then((result) => {
                        expect(result).to.be.an('Object');
                        const jsonString = Buffer.from(result.message.data).toString('utf8');
                        expect(JSON.parse(jsonString)).to.deep.equal(message);
                        expect(result.message.attributes).to.deep.equal(customAttr);
                    }).catch((reason) => {
                        expect.fail(`Failed: ${reason}`);
                    });
                });
            });

            context('getMessage without subscription', () => {
                it("should reject with error", async () => {
                    await expect(pubSubUtil.getMessage(projectId, uuid)).to.be.rejectedWith(Error);
                });
            });

        });
    }

});
