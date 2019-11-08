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

const chai = require('chai'), expect = chai.expect, should = chai.should();
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const configUtil = require('../configUtil');

it("should perform text replacements", async () => {
    // eslint-disable-next-line no-template-curly-in-string
    const testStr = "select * from `${projectId}.${accessControl.datasetId}.${accessControl.viewId}` limit 10";
    const projectId = "projectId";
    const accessControlDatasetId = "accessControlDatasetId";
    const accessControlViewId = "accessControlViewId";
    const config = {
        projectId: projectId,
        accessControl: {
            datasetId: accessControlDatasetId,
            viewId: accessControlViewId
        }
    };
    expect(configUtil.performTextVariableReplacements(config, null, testStr))
        .equal(`select * from \`${projectId}.${accessControlDatasetId}.${accessControlViewId}\` limit 10`);
});