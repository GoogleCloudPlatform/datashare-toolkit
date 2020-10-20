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

const commonUtil = require("../commonUtil");

it("should return true for valid json string", () => {
    expect(commonUtil.isJsonString('{ "isValid": true }')).is.true;
});

it("should return false for invalid json string", () => {
    expect(commonUtil.isJsonString('"isValid": true')).is.false;
});

it("should return true for valid yaml string", () => {
    expect(commonUtil.isYamlString(`---
    name: mlb_simple
    projectId: cds-ci
    accessControl:
      datasetId: access_control
      viewId: groupEntities
    groups:
    - name: newyork_users
      access:
      - user: benjentargaryen.327201@gmail.com
    - name: chicago_users
      access:
      - user: melisandresnow.388027@gmail.com`)).is.true;
});

it("should return false for invalid yaml string", () => {
    expect(commonUtil.isYamlString(`---
    name mlb_simple
    projectId: cds-ci
    accessControl:
      datasetId: access_control
      viewId: groupEntities
    groups:
    - name: newyork_users
      access:
      - user: benjentargaryen.327201@gmail.com
    - name: chicago_users
      access:
      - user: melisandresnow.388027@gmail.com`)).is.false;
});

it("should parse yaml string", () => {
    expect(commonUtil.parseYaml(`---
  name: mlb_simple
  projectId: cds-ci
  accessControl:
    datasetId: access_control
    viewId: groupEntities
  groups:
  - name: newyork_users
    access:
    - user: benjentargaryen.327201@gmail.com
  - name: chicago_users
    access:
    - user: melisandresnow.388027@gmail.com`)).to.not.throw;
});

it("should fail to parse yaml string", () => {
    expect(() => {
        commonUtil.parseYaml(`---
    name mlb_simple
    projectId: cds-ci
    accessControl:
      datasetId: access_control
      viewId: groupEntities
    groups:
    - name: newyork_users
      access:
      - user: benjentargaryen.327201@gmail.com
    - name: chicago_users
      access:
      - user: melisandresnow.388027@gmail.com`);
    }).to.throw(/Implicit map keys need to be on a single line/);
});

it("extension is valid", () => {
    expect(commonUtil.isExtensionSupported("test.json", ["json", "csv"])).is.true;
});

it("extension is invalid", () => {
    expect(commonUtil.isExtensionSupported("test.txt", ["json", "csv"])).is.false;
});

it("extension doesn't exist", () => {
    expect(commonUtil.isExtensionSupported("test", ["json", "csv"])).is.false;
});

it("extension (double) is valid", () => {
    expect(commonUtil.isExtensionSupported("test.json.txt", ["json", "csv"])).is.false;
});

it("parse hostname", () => {
    expect(commonUtil.extractHostname('http://google.com')).equals('google.com');
});

it("parse hostname with params", () => {
    expect(commonUtil.extractHostname('http://google.com/test/')).equals('google.com');
});

it("parse hostname with request vars", () => {
    expect(commonUtil.extractHostname('http://google.com/test?var=test123')).equals('google.com');
});