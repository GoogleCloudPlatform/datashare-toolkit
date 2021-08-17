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
        for (const bucket of buckets) {
            if (underscore.has(bucket.metadata.labels, labelKey)) {
                await performBucketUpdate(projectId, bucket.name, null);
            }
        }
    } else {
        for (const bucket of rows) {
            const name = bucket.bucketName;
            const accounts = bucket.accounts || [];
            await performBucketUpdate(projectId, bucket.name, null);
        }
    }
}

/*
bindings: [
    {
      role: 'projects/cds-demo-3/roles/datashare.storage.objectViewer',
      members: [Array]
    },
    { role: 'roles/storage.legacyBucketOwner', members: [Array] },
    { role: 'roles/storage.legacyBucketReader', members: [Array] },
    { role: 'roles/storage.legacyObjectOwner', members: [Array] },
    { role: 'roles/storage.legacyObjectReader', members: [Array] }
  ]
*/

/**
 * @param  {} projectId
 * @param  {} bucketName
 * @param  {} accounts
 */
async function performBucketUpdate(projectId, bucketName, accounts) {
    console.log(`Begin IAM update for bucket: ${bucketName}`);
    const bigqueryUtil = new BigQueryUtil(projectId);
    const storageUtil = new StorageUtil(projectId);
    const exists = await storageUtil.bucketExists(bucketName);
    if (!exists) {
        console.warn(`Skipping IAM update for non-existant bucket: ${bucketName}`);
        return false;
    }
    const accessTypes = ["user", "group", "serviceAccount"];
    const viewerRole = await runtimeConfig.storageObjectViewerRole(projectId);
    let isDirty = false;
    const bucketPolicy = await storageUtil.getBucketIamPolicy(bucketName);
    console.log(JSON.stringify(bucketPolicy.bindings, null, 3));
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
                if (accessTypes.includes(type)) {
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
        tablePolicy.bindings = [];
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
