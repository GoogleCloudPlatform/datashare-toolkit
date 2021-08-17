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

const { BigQueryUtil, StorageUtil } = require('cds-shared');
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
    const bucketPermissionDiffProcedure = bigqueryUtil.getTableFqdn(projectId, cfg.cdsDatasetId, cfg.bucketPermissionDiffProcedureId);

    if (!fullRefresh && policyIds && policyIds.length > 0) {
        options = {
            query: `CALL \`${bucketPermissionDiffProcedure}\`(@policyIds)`,
            params: { policyIds: policyIds }
        };
    } else {
        options = {
            query: `CALL \`${bucketPermissionDiffProcedure}\`(null)`
        };
    }

    const [rows] = await bigqueryUtil.executeQuery(options);
    console.log(`Permission Diff Result: ${JSON.stringify(rows, null, 3)}`);

    const storageUtil = new StorageUtil(projectId);

    if (fullRefresh === true) {
        const buckets = await storageUtil.getBuckets();
        buckets.forEach(b => {
            if (underscore.has(b.metadata.labels, labelKey)) {
                console.log(b.name);
            }
        });
    } else {
        for (const bucket of rows) {
            const name = bucket.bucketName;
            const accounts = bucket.accounts || [];
        }
    }
}

/**
 * @param  {} projectId
 * @param  {} bucketName
 * @param  {} accounts
 */
async function performBucketUpdate(projectId, bucketName, accounts) {
    return;
}

module.exports = {
    applyPolicies
};
