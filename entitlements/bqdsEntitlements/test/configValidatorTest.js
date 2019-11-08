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

var argv = require('minimist')(process.argv.slice(2));
process.env.UNIT_TESTS = true;

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
const configValidator = require('../configValidator');

it("should return true for valid json string", () => {
    expect(configValidator.isJsonString('{ "isValid": true }')).is.true;
});

it("should return false for invalid json string", () => {
    expect(configValidator.isJsonString('"isValid": true')).is.false;
});

if (argv.runCloudTests) {
    bigqueryUtil.init(argv.projectId);

    it("config should validate", async () => {
        const simpleConfig = require('../../../examples/mlb/config/entitlements/simple.json');
        return expect(configValidator.validate(simpleConfig)).to.eventually.be.true;
    });
}