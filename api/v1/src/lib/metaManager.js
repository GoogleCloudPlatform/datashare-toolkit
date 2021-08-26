/**
 * Copyright 2020-2021 Google LLC
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

const bigQueryApplier = require('./appliers/bigQueryApplier');
const storageApplier = require('./appliers/storageApplier');
const pubsubApplier = require('./appliers/pubsubApplier');

const filters = {
    BIG_QUERY: "BIG_QUERY",
    CLOUD_STORAGE: "CLOUD_STORAGE",
    PUB_SUB: "PUB_SUB"
}

/**
 * @param  {} projectId
 * @param  {} policyIds
 * @param  {} fullRefresh
 * @param  {} filter
 */
async function performPolicyUpdates(projectId, policyIds, fullRefresh, filter, options) {
    let bq = false;
    let cs = false;
    let ps = false;

    if (options) {
        if (options.refreshBigQuery === true) {
            bq = true;
        }
        if (options.refreshCloudStorage === true) {
            cs = true;
        }
        if (options.refreshPubSubTopics === true) {
            ps = true;
        }
    } else if (filter == null) {
        // Apply all
        bq = true;
        cs = true;
        ps = true;
    } else if (filter == filters.BIG_QUERY) {
        bq = true;
    } else if (filter == filters.CLOUD_STORAGE) {
        cs = true;
    } else if (filter == filters.PUB_SUB) {
        ps = true;
    }

    if (bq === true) {
        await bigQueryApplier.applyPolicies(projectId, policyIds, fullRefresh);
    }
    if (cs === true) {
        await storageApplier.applyPolicies(projectId, policyIds, fullRefresh);
    }
    if (ps === true) {
        await pubsubApplier.applyPolicies(projectId, policyIds, fullRefresh);
    }
}

module.exports = {
    filters,
    performPolicyUpdates
};
