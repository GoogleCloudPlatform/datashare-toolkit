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

const argv = require('minimist')(process.argv.slice(2));
if (argv.runCloudTests) {
    process.env.UNIT_TESTS = true;
}

console.log(`Command arguments: ${JSON.stringify(argv)}`);

if (argv.runCloudTests && !argv.projectId) {
    console.log("projectId must be provided when runCloudTests is enabled");
    process.exit(1);
}

const assert = require('assert');
const chai = require('chai'), expect = chai.expect, should = chai.should();
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const bigqueryUtil = require("../bigqueryUtil");

if (argv.runCloudTests) {
    bigqueryUtil.init(argv.projectId);

    it("execute query", async () => {
        const options = { query: "select 1 union all select 2" };
        const [rows] = await bigqueryUtil.executeQuery(options);
        expect(rows.length).is.equal(2);
    });

    it("query should be valid", async () => {
        const query = "select 1 union all select 2";
        return expect(bigqueryUtil.validateQuery(query)).to.eventually.be.true;
    });

    it("query should be invalid", async () => {
        const query = "Xselect 1";
        return expect(bigqueryUtil.validateQuery(query)).to.eventually.be.false;
    });

    it("query should be valid with limit", async () => {
        const query = "select 1 union all select 2 limit 10";
        return expect(bigqueryUtil.validateQuery(query)).to.eventually.be.true;
    });

    it("query should be invalid with limit", async () => {
        const query = "Xselect 1 limit 10";
        return expect(bigqueryUtil.validateQuery(query)).to.eventually.be.false;
    });
}