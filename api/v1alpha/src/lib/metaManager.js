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

const bigQueryApplyer = require('./appliers/bigQueryApplier');

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
async function performPolicyUpdates(projectId, policyIds, fullRefresh, filter) {
    let bq = false;
    let cs = false;
    let ps = false;
    if (filter == null) {
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
        await bigQueryApplyer.applyPolicies(projectId, policyIds, fullRefresh);
    }
}

module.exports = {
    filters,
    performPolicyUpdates
};
