/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const { BigQueryUtil, PubSubUtil } = require('cds-shared');
const underscore = require("underscore");
const cfg = require('../config');
const runtimeConfig = require('../runtimeConfig');

/**
 * @param  {} projectId
 * @param  {} policyIds
 * @param  {} fullRefresh
 */
async function applyPolicies(projectId, policyIds, fullRefresh) {
    const labelKey = cfg.cdsManagedLabelKey;
    let options = {};
    const bigqueryUtil = new BigQueryUtil(projectId);
    const topicPermissionDiffProcedure = bigqueryUtil.getTableFqdn(projectId, cfg.cdsDatasetId, cfg.topicPermissionDiffProcedureId);

    if (!fullRefresh && policyIds && policyIds.length > 0) {
        options = {
            query: `CALL \`${topicPermissionDiffProcedure}\`(@policyIds)`,
            params: { policyIds: policyIds }
        };
    } else {
        options = {
            query: `CALL \`${topicPermissionDiffProcedure}\`(null)`
        };
    }

    const [rows] = await bigqueryUtil.executeQuery(options);
    console.log(`Permission Diff Result: ${JSON.stringify(rows, null, 3)}`);

    const pubsubUtil = new PubSubUtil(projectId);

    if (fullRefresh === true) {
        const topics = await pubsubUtil.getTopics();
        topics.forEach(b => {
            if (underscore.has(b.metadata.labels, labelKey)) {
                console.log(b.name);
            }
        });
    } else {
        for (const topic of rows) {
            const topicId = topic.topicId;
            const accounts = bucket.accounts || [];
        }
    }
}

/**
 * @param  {} projectId
 * @param  {} topicId
 * @param  {} accounts
 */
async function performTopicUpdate(projectId, topicId, accounts) {
    return;
}

module.exports = {
    applyPolicies
};
