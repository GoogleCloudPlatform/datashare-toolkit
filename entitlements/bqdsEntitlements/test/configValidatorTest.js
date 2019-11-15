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

const { argv } = require('./testSetup');

const assert = require('assert');
const chai = require('chai'), expect = chai.expect, should = chai.should();
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const { bigqueryUtil } = require('bqds-shared');
const configValidator = require('../configValidator');

it("should return true for valid json string", () => {
    expect(configValidator.isJsonString('{ "isValid": true }')).is.true;
});

it("should return false for invalid json string", () => {
    expect(configValidator.isJsonString('"isValid": true')).is.false;
});

it("should return true for valid yaml string", () => {
    expect(configValidator.isYamlString(`---
    name: mlb_simple
    projectId: sferrazza-cloud-sandbox
    accessControl:
      datasetId: access_control
      viewId: groupEntities
    groups:
    - name: newyork_users
      access:
      - userByEmail: benjentargaryen.327201@gmail.com
    - name: chicago_users
      access:
      - userByEmail: melisandresnow.388027@gmail.com`)).is.true;
});

it("should return false for invalid yaml string", () => {
    expect(configValidator.isYamlString(`---
    name mlb_simple
    projectId: sferrazza-cloud-sandbox
    accessControl:
      datasetId: access_control
      viewId: groupEntities
    groups:
    - name: newyork_users
      access:
      - userByEmail: benjentargaryen.327201@gmail.com
    - name: chicago_users
      access:
      - userByEmail: melisandresnow.388027@gmail.com`)).is.false;
});

if (argv.runCloudTests) {
    bigqueryUtil.init(argv.projectId);

    it("config should validate", async () => {
        const simpleConfig = require('../../../examples/mlb/config/entitlements/simple.json');
        return expect(configValidator.validate(simpleConfig)).to.eventually.be.true;
    });
}