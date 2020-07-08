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
                const v = await bigqueryUtil.validateQuery(query);
                return expect(v.success).to.equal(true);
            });
        });

        context('validateQuery with arguments', () => {
            it("query should be invalid", async () => {
                const query = "Xselect 1";
                const v = await bigqueryUtil.validateQuery(query);
                return expect(v.success).to.equal(false);
            });
        });

        context('validateQuery with arguments', () => {
            it("query should be valid with limit", async () => {
                const query = "select 1 union all select 2 limit 10";
                const v = await bigqueryUtil.validateQuery(query);
                return expect(v.success).to.equal(true);
            });
        });

        context('validateQuery with arguments', () => {
            it("query should be invalid with limit", async () => {
                const query = "Xselect 1 limit 10";
                const v = await bigqueryUtil.validateQuery(query);
                return expect(v.success).to.equal(false);
            });
        });

        context('validateQuery with arguments', () => {
            it("query should be invalid with limit", async () => {
                const query = "Xselect 1 limit 10";
                const v = await bigqueryUtil.validateQuery(query);
                return expect(v.success).to.equal(false);
            });
        });

        const uuid = uuidv4().replace(/-/g, "_");
        const viewName = `v_${uuid}`;

        const labelName = "cds_configuration_name";
        const labelValue = "unit_tests";
        let labels = {};
        labels[labelName] = labelValue;

        const datasetOptions = { description: "description", labels: labels };

        context('createDataset with arguments', () => {
            it("should succeed", async () => {
                await bigqueryUtil.createDataset(uuid, datasetOptions).then(() => {
                    return bigqueryUtil.deleteDataset(uuid);
                }).catch((reason) => {
                    expect.fail(`Failed: ${reason}`);
                });
            });
        });

        describe('Dataset created/deleted in pre/post setup', () => {

            before(async () => {
                await bigqueryUtil.createDataset(uuid, datasetOptions);
            });
            after(async () => {
                await bigqueryUtil.deleteDataset(uuid);
            });

            context('getDatasets', () => {
                it("should succeed", async () => {
                    await bigqueryUtil.getDatasets().then((result) => {
                        expect(result).to.be.a('array');
                    }).catch((reason) => {
                        expect.fail(`Failed: ${reason}`);
                    });
                });
            });

            context('getDatasetMetadata with arguments', () => {
                it("should return object", async () => {
                    await bigqueryUtil.getDatasetMetadata(uuid).then((result) => {
                        expect(result).to.be.an('object');
                        expect(result.datasetReference.datasetId).to.equal(uuid);
                    }).catch((reason) => {
                        expect.fail(`Failed: ${reason}`);
                    });
                });
            });

            context('setDatasetMetadata with arguments', () => {
                it("should return true", async () => {
                    const metadata = {
                        abc: "123"
                    };
                    await bigqueryUtil.setDatasetMetadata(uuid, metadata).then((result) => {
                        expect(result).to.be.a('boolean');
                        expect(result).to.equal(true);
                    }).catch((reason) => {
                        expect.fail(`Failed: ${reason}`);
                    });
                });
            });

            context('getDatasetLabelValue with arguments', () => {
                it("should return labelValue", async () => {
                    await bigqueryUtil.getDatasetLabelValue(uuid, labelName).then((result) => {
                        expect(result).to.be.an('string');
                        expect(result).is.equal(labelValue);
                    }).catch((reason) => {
                        expect.fail(`Failed: ${reason}`);
                    });
                });
            });
        });

        describe('Dataset and table created/deleted in pre/post setup', () => {

            const tableOptions = {
                description: "description",
                labels: labels,
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

            before(async () => {
                await bigqueryUtil.createDataset(uuid, datasetOptions);
                await bigqueryUtil.createTable(uuid, uuid, tableOptions);
            });
            after(async () => {
                await bigqueryUtil.deleteTable(uuid, uuid);
                await bigqueryUtil.deleteDataset(uuid);
            });

            context('getTableMetadata with arguments', () => {
                it("should return object", async () => {
                    await bigqueryUtil.getTableMetadata(uuid, uuid).then((result) => {
                        expect(result).to.be.an('object');
                        expect(result.metadata.tableReference.tableId).to.equal(uuid);
                    }).catch((reason) => {
                        expect.fail(`Failed: ${reason}`);
                    });
                });
            });

            context('setTableMetadata with arguments', () => {
                it("should return true", async () => {
                    const metadata = {
                        abc: "123"
                    };
                    await bigqueryUtil.setTableMetadata(uuid, uuid, metadata).then((result) => {
                        expect(result).to.be.a('boolean');
                        expect(result).to.equal(true);
                    }).catch((reason) => {
                        expect.fail(`Failed: ${reason}`);
                    });
                });
            });

            context('getTableLabelValue with arguments', () => {
                it("should return labelValue", async () => {
                    await bigqueryUtil.getTableLabelValue(uuid, uuid, labelName).then((result) => {
                        expect(result).to.be.an('string');
                        expect(result).is.equal(labelValue);
                    }).catch((reason) => {
                        expect.fail(`Failed: ${reason}`);
                    });
                });
            });

            context('insertRows into table', () => {
                it("should insert rows", async () => {
                    const rows = [{ column1: "value 1", column2: "value 2" }, { column1: "value 3", column2: "value 4" }];
                    await bigqueryUtil.insertRows(uuid, uuid, rows).then((result) => {
                        expect(result).is.true;
                    }).catch((reason) => {
                        expect.fail(`Failed: ${reason}`);
                    });
                });
            });
            
            context('ingestion integration test', () => {
                it("create dataset, table, and load data", async () => {
                    await bigqueryUtil.datasetExists(uuid).then((result) => {
                        expect(result).is.true;
                    }).then(() => {
                        return bigqueryUtil.getDatasetLabelValue(uuid, labelName);
                    }).then((result) => {
                        expect(result).is.equal(labelValue);
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
                    }).then((result) => {
                        expect(result).is.true;
                        const options = { query: `select * from \`${argv.projectId}.${uuid}.${uuid}\`` };
                        console.log(`Executing query: ${JSON.stringify(options)}`);
                        return bigqueryUtil.executeQuerySync(options);
                    }).then((result) => {
                        const [rows] = result;
                        console.log(`Rows is ${JSON.stringify(rows)}`);
                        expect(rows.length).is.equal(4);
                    }).then(() => {
                        return bigqueryUtil.deleteTable(uuid, viewName);
                    }).catch((reason) => {
                        expect.fail(`Failed: ${reason}`);
                    });
                });
            });

        });
    }

});
