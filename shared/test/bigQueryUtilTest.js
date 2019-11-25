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

const BigQueryUtil = require("../bigqueryUtil");
const bigqueryUtil = new BigQueryUtil(argv.projectId);

describe('BigQueryUtil', () => {

    if (argv.runCloudTests) {

        context('executeQuerySync with arguments', () => {
            it("execute query should return rows", async () => {
                const options = { query: "select 1 union all select 2" };
                const [rows] = await bigqueryUtil.executeQuerySync(options);
                expect(rows.length).is.equal(2);
            });
        });

        context('validateQuery with arguments', () => {
            it("query should be valid", async () => {
                const query = "select 1 union all select 2";
                return expect(bigqueryUtil.validateQuery(query)).to.eventually.be.true;
            });
        });

        context('validateQuery with arguments', () => {
            it("query should be invalid", async () => {
                const query = "Xselect 1";
                return expect(bigqueryUtil.validateQuery(query)).to.eventually.be.false;
            });
        });

        context('validateQuery with arguments', () => {
            it("query should be valid with limit", async () => {
                const query = "select 1 union all select 2 limit 10";
                return expect(bigqueryUtil.validateQuery(query)).to.eventually.be.true;
            });
        });

        context('validateQuery with arguments', () => {
            it("query should be invalid with limit", async () => {
                const query = "Xselect 1 limit 10";
                return expect(bigqueryUtil.validateQuery(query)).to.eventually.be.false;
            });
        });

        context('validateQuery with arguments', () => {
            it("query should be invalid with limit", async () => {
                const query = "Xselect 1 limit 10";
                return expect(bigqueryUtil.validateQuery(query)).to.eventually.be.false;
            });
        });

        const uuid = uuidv4().replace(/-/g, "_");
        const viewName = `v_${uuid}`;

        const labelName = "bqds_configuration_name";
        const labelValue = "unit_tests";
        let labels = {};
        labels[labelName] = labelValue;

        context('createDataset with arguments', () => {
            it("should succeed", async () => {
                const options = { description: "description", labels: labels };
                await bigqueryUtil.createDataset(uuid, options).then(() => {
                    return bigqueryUtil.deleteDataset(uuid);
                }).catch((reason) => {
                    expect.fail(`Failed: ${reason}`);
                });
            });
        });

        context('getDatasets', () => {
            it("should succeed", async () => {
                const options = { description: "description", labels: labels };
                await bigqueryUtil.createDataset(uuid, options).then(() => {
                    return bigqueryUtil.getDatasets();
                }).then((result) => {
                    expect(result).to.be.a('array');
                }).then(() => {
                    return bigqueryUtil.deleteDataset(uuid);
                }).catch((reason) => {
                    expect.fail(`Failed: ${reason}`);
                });
            });
        });

        context('getDatasetMetadata with arguments', () => {
            it("should return object", async () => {
                const options = { description: "description", labels: labels };
                await bigqueryUtil.createDataset(uuid, options).then(() => {
                    return bigqueryUtil.getDatasetMetadata(uuid);
                }).then((result) => {
                    expect(result).to.be.an('object');
                    expect(result.datasetReference.datasetId).to.equal(uuid);
                }).then(() => {
                    return bigqueryUtil.deleteDataset(uuid);
                }).catch((reason) => {
                    expect.fail(`Failed: ${reason}`);
                });
            });
        });

        context('setDatasetMetadata with arguments', () => {
            it("should return true", async () => {
                const options = { description: "description", labels: labels };
                await bigqueryUtil.createDataset(uuid, options).then(() => {
                    const metadata = {
                        abc: "123"
                    };
                    return bigqueryUtil.setDatasetMetadata(uuid, metadata);
                }).then((result) => {
                    expect(result).to.be.a('boolean');
                    expect(result).to.equal(true);
                }).then(() => {
                    return bigqueryUtil.deleteDataset(uuid);
                }).catch((reason) => {
                    expect.fail(`Failed: ${reason}`);
                });
            });
        });

        context('getDatasetLabelValue with arguments', () => {
            it("should return labelValue", async () => {
                const options = { description: "description", labels: labels };
                await bigqueryUtil.createDataset(uuid, options).then(() => {
                    return bigqueryUtil.getDatasetLabelValue(uuid, labelName);
                }).then((result) => {
                    expect(result).to.be.an('string');
                    expect(result).is.equal(labelValue);
                }).then(() => {
                    return bigqueryUtil.deleteDataset(uuid);
                }).catch((reason) => {
                    expect.fail(`Failed: ${reason}`);
                });
            });
        });

        context('getTableMetadata with arguments', () => {
            it("should return object", async () => {
                const options = { description: "description", labels: labels };
                await bigqueryUtil.createDataset(uuid, options).then(() => {
                    const options = {
                        description: "description",
                        labels: labels,
                        schema: [{
                            "name": "column1",
                            "type": "STRING",
                            "mode": "REQUIRED"
                        }]
                    };
                    return bigqueryUtil.createTable(uuid, uuid, options);
                }).then(() => {
                    return bigqueryUtil.getTableMetadata(uuid, uuid);
                }).then((result) => {
                    expect(result).to.be.an('object');
                    expect(result.metadata.tableReference.tableId).to.equal(uuid);
                }).then(() => {
                    return bigqueryUtil.deleteDataset(uuid);
                }).catch((reason) => {
                    expect.fail(`Failed: ${reason}`);
                });
            });
        });

        context('setTableMetadata with arguments', () => {
            it("should return true", async () => {
                const options = { description: "description", labels: labels };
                await bigqueryUtil.createDataset(uuid, options).then(() => {
                    const options = {
                        description: "description",
                        labels: labels,
                        schema: [{
                            "name": "column1",
                            "type": "STRING",
                            "mode": "REQUIRED"
                        }]
                    };
                    return bigqueryUtil.createTable(uuid, uuid, options);
                }).then(() => {
                    const metadata = {
                        abc: "123"
                    };
                    return bigqueryUtil.setTableMetadata(uuid, uuid, metadata);
                }).then((result) => {
                    expect(result).to.be.a('boolean');
                    expect(result).to.equal(true);
                }).then(() => {
                    return bigqueryUtil.deleteDataset(uuid);
                }).catch((reason) => {
                    expect.fail(`Failed: ${reason}`);
                });
            });
        });

        context('getTableLabelValue with arguments', () => {
            it("should return labelValue", async () => {
                const options = { description: "description", labels: labels };
                await bigqueryUtil.createDataset(uuid, options).then(() => {
                    const options = {
                        description: "description",
                        labels: labels,
                        schema: [{
                            "name": "column1",
                            "type": "STRING",
                            "mode": "REQUIRED"
                        }]
                    };
                    return bigqueryUtil.createTable(uuid, uuid, options);
                }).then((result) => {
                    return bigqueryUtil.getTableLabelValue(uuid, uuid, labelName);
                }).then((result) => {
                    expect(result).to.be.an('string');
                    expect(result).is.equal(labelValue);
                }).then(() => {
                    return bigqueryUtil.deleteDataset(uuid);
                }).catch((reason) => {
                    expect.fail(`Failed: ${reason}`);
                });
            });
        });

        context('getDatasetLabelValue with arguments', () => {
            it("should return labelValue", async () => {
                const options = { description: "description", labels: labels };
                await bigqueryUtil.createDataset(uuid, options).then(() => {
                    return bigqueryUtil.datasetExists(uuid);
                }).then((result) => {
                    expect(result).is.true;
                }).then(() => {
                    return bigqueryUtil.getDatasetLabelValue(uuid, labelName);
                }).then((result) => {
                    expect(result).is.equal(labelValue);
                }).then(() => {
                    const options = {
                        description: "description",
                        schema: [{
                            "name": "column1",
                            "type": "STRING",
                            "mode": "REQUIRED"
                        },
                        {
                            "name": "column2",
                            "type": "STRING",
                            "mode": "REQUIRED"
                        }]
                    };
                    return bigqueryUtil.createTable(uuid, uuid, options);
                }).then(() => {
                    return bigqueryUtil.tableExists(uuid, uuid);
                }).then((result) => {
                    expect(result).is.true;
                }).then(() => {
                    return bigqueryUtil.tableColumns(uuid, uuid);
                }).then((columns) => {
                    expect(columns).length.is(2);
                    expect(columns[0]).is.equal("column1");
                    expect(columns[1]).is.equal("column2");
                }).then(() => {
                    const query = `select * from \`${argv.projectId}.${uuid}.${uuid}\``;
                    const options = {
                        description: "description",
                        labels: labels
                    };
                    return bigqueryUtil.createView(uuid, viewName, query, options);
                }).then((result) => {
                    return bigqueryUtil.viewExists(uuid, viewName);
                }).then((result) => {
                    expect(result).is.true;
                }).then(() => {
                    return bigqueryUtil.getTableLabelValue(uuid, viewName, labelName);
                }).then((result) => {
                    expect(result).is.equal(labelValue);
                }).then(() => {
                    const rows = [{ column1: "value 1", column2: "value 2" }, { column1: "value 3", column2: "value 4" }];
                    return bigqueryUtil.insertRows(uuid, uuid, rows);
                }).then(() => {
                    const options = { query: `select * from \`${argv.projectId}.${uuid}.${uuid}\`` };
                    return bigqueryUtil.executeQuerySync(options);
                }).then((result) => {
                    const [rows] = result;
                    expect(rows.length).is.equal(2);
                }).then(() => {
                    return bigqueryUtil.deleteTable(uuid, viewName);
                }).then(() => {
                    return bigqueryUtil.deleteTable(uuid, uuid);
                }).then(() => {
                    return bigqueryUtil.deleteDataset(uuid);
                }).catch((reason) => {
                    expect.fail(`Failed: ${reason}`);
                });
            });
        });

    }

});
