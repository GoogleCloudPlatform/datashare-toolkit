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

const chai = require('chai'), expect = chai.expect, should = chai.should();
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const sqlBuilder = require('../sqlBuilder');

it("should be prepended with 1 tab per line", async () => {
    const testStr = "test1\ntest2\ntest3";
    return expect(sqlBuilder.prependLines(testStr, "\t", 1)).to.eventually.equal("\ttest1\n\ttest2\n\ttest3");
});

it("should be prepended with 3 spaces per line", async () => {
    const testStr = "test1\ntest2\ntest3";
    return expect(sqlBuilder.prependLines(testStr, " ", 3)).to.eventually.equal("   test1\n   test2\n   test3");
});

it("should be prepended with nothing", async () => {
    const testStr = "test1\ntest2\ntest3";
    return expect(sqlBuilder.prependLines(testStr, "", 1)).to.eventually.equal(testStr);
});