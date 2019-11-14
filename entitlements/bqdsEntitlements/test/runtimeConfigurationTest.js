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

const runtimeConfiguration = require('../runtimeConfiguration');

it("product name check", () => {
    expect(runtimeConfiguration.PRODUCT_NAME).equal("BQDS entitlement-engine");
});

it("product version check", () => {
    expect(runtimeConfiguration.PRODUCT_VERSION).is.not.undefined;
});

it("bqds label check", () => {
    expect(runtimeConfiguration.BQDS_CONFIGURATION_NAME_LABEL_KEY).equal("bqds_configuration_name");
});

it("set verbose mode to true", () => {
    runtimeConfiguration.VERBOSE_MODE = true;
    expect(runtimeConfiguration.VERBOSE_MODE).is.true;
});

it("set verbose mode to false", () => {
    runtimeConfiguration.VERBOSE_MODE = false;
    expect(runtimeConfiguration.VERBOSE_MODE).is.false;
});

it("set dry run to true", () => {
    runtimeConfiguration.DRY_RUN = true;
    expect(runtimeConfiguration.DRY_RUN).is.true;
});

it("set dry run to false", () => {
    runtimeConfiguration.DRY_RUN = false;
    expect(runtimeConfiguration.DRY_RUN).is.false;
});

it("set prerequisite setup only to true", () => {
    runtimeConfiguration.PREREQUISITE_SETUP_ONLY = true;
    expect(runtimeConfiguration.PREREQUISITE_SETUP_ONLY).is.true;
});

it("set prerequisite setup only to false", () => {
    runtimeConfiguration.PREREQUISITE_SETUP_ONLY = false;
    expect(runtimeConfiguration.PREREQUISITE_SETUP_ONLY).is.false;
});

it("set refresh dataset permission table to true", () => {
    runtimeConfiguration.REFRESH_DATASET_PERMISSION_TABLE = true;
    expect(runtimeConfiguration.REFRESH_DATASET_PERMISSION_TABLE).is.true;
});

it("set refresh dataset permission table to false", () => {
    runtimeConfiguration.REFRESH_DATASET_PERMISSION_TABLE = false;
    expect(runtimeConfiguration.REFRESH_DATASET_PERMISSION_TABLE).is.false;
});