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
    console.log(`Storage Bucket Permission Diff Result: ${JSON.stringify(rows, null, 3)}`);

    const storageUtil = new StorageUtil(projectId);
    if (fullRefresh === true) {
        // Update all managed buckets
        const buckets = await storageUtil.getBuckets();
        for (const bucket of buckets) {
            if (underscore.has(bucket.metadata.labels, labelKey)) {
                let bucketPolicyRecord = underscore.findWhere(rows, { bucketName: bucket.name });
                let accounts = [];
                if (bucketPolicyRecord) {
                    accounts = bucketPolicyRecord.accounts;
                }
                await performBucketUpdate(projectId, bucket.name, accounts);
            }
        }
    } else {
        // Differential update, iterate over result based on the policyId filter only 
        for (const row of rows) {
            await performBucketUpdate(projectId, row.bucketName, row.accounts);
        }
    }
}

/**
 * @param  {} projectId
 * @param  {} bucketName
 * @param  {} accounts
 * BigQuery, Cloud Storage Buckets, and Pub/Sub all use the same IAM style access.
 * This function can be re-factored consolidated to handle all three to simplify code maintenance.
 * https://stackoverflow.com/questions/11796093/is-there-a-way-to-provide-named-parameters-in-a-function-call-in-javascript
 */
async function performBucketUpdate(projectId, bucketName, accounts) {
    console.log(`Begin IAM update for bucket: ${bucketName}`);
    const storageUtil = new StorageUtil(projectId);
    const exists = await storageUtil.bucketExists(bucketName);
    if (!exists) {
        console.warn(`Skipping IAM update for non-existant bucket: ${bucketName}`);
        return false;
    }
    const viewerRole = await runtimeConfig.storageObjectViewerRole(projectId);
    let isDirty = false;
    const bucketPolicy = await storageUtil.getBucketIamPolicy(bucketName);
    let readBinding = {};
    let bindingExists = false;
    if (bucketPolicy.bindings) {
        const viewerRoleBinding = underscore.findWhere(bucketPolicy.bindings, { role: viewerRole });
        if (viewerRoleBinding) {
            readBinding = viewerRoleBinding;
            bindingExists = true;
            let i = readBinding.members.length;
            while (i--) {
                let member = readBinding.members[i];
                let arr = member.split(':');
                let type = arr[0];
                let email = arr[1];
                if (cfg.managedIamAccessTypes.includes(type)) {
                    const shouldHaveAccess = underscore.findWhere(accounts, { email: email, emailType: type });
                    if (!shouldHaveAccess) {
                        console.log(`Deleting user: ${type}:${email} from bucket: ${bucketName}`);
                        readBinding.members.splice(i, 1);
                        isDirty = true;
                    }
                }
            }
        }
    } else {
        bucketPolicy.bindings = [];
    }

    if (!bindingExists) {
        readBinding.role = viewerRole;
        readBinding.members = [];
        bucketPolicy.bindings.push(readBinding);
    }

    accounts.forEach(account => {
        if (account.email && account.emailType) {
            const identifier = `${account.emailType}:${account.email}`;
            const accessRecordExists = readBinding.members.includes(identifier);
            if (!accessRecordExists) {
                readBinding.members.push(identifier);
                isDirty = true;
                console.log(`Adding access record to bucket: ${bucketName}: ${JSON.stringify(account)}`);
            }
        }
    });

    if (isDirty === true) {
        try {
            await storageUtil.setBucketIamPolicy(bucketName, bucketPolicy);
            console.info(`Policy set successfully for bucket '${bucketName}'`);
        } catch (err) {
            console.error(`Failed to set policy for bucket '${bucketName}' with error '${err}' and payload: ${JSON.stringify(bucketPolicy)}`);
            throw err;
        }
    } else {
        console.info(`Metadata is already up to date for bucket: '${bucketName}'`);
    }

    console.log(`End IAM update for bucket: ${bucketName}`);
    return isDirty;
}

module.exports = {
    applyPolicies
};
