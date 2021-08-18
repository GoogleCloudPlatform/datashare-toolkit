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
    console.log(`Pub/Sub Topic Permission Diff Result: ${JSON.stringify(rows, null, 3)}`);

    const pubsubUtil = new PubSubUtil(projectId);
    if (fullRefresh === true) {
        // Update all managed buckets
        const topics = await pubsubUtil.getTopics();
        for (const topic of topics) {
            if (underscore.has(topic.metadata.labels, labelKey)) {
                const topicId = topic.name.substring(topic.name.lastIndexOf('/') + 1);
                let topicPolicyRecord = underscore.findWhere(rows, { topicId: topicId });
                let accounts = [];
                if (topicPolicyRecord) {
                    accounts = topicPolicyRecord.accounts;
                }
                await performTopicUpdate(projectId, topicId, accounts);
            }
        }
    } else {
        // Differential update, iterate over result based on the policyId filter only 
        for (const row of rows) {
            await performTopicUpdate(projectId, row.topicId, row.accounts);
        }
    }
}

/**
 * @param  {} projectId
 * @param  {} topicName
 * @param  {} accounts
 */
async function performTopicUpdate(projectId, topicName, accounts) {
    console.log(`Begin IAM update for topic: ${topicName}`);
    const pubsubUtil = new PubSubUtil(projectId);
    const exists = await pubsubUtil.topicExists(topicName);
    if (!exists) {
        console.warn(`Skipping IAM update for non-existant topic: ${topicName}`);
        return false;
    }
    const viewerRole = await runtimeConfig.pubsubSubscriberRole(projectId);
    let isDirty = false;
    const topicPolicy = await pubsubUtil.getTopicIamPolicy(topicName);
    let readBinding = {};
    let bindingExists = false;
    if (topicPolicy.bindings) {
        const viewerRoleBinding = underscore.findWhere(topicPolicy.bindings, { role: viewerRole });
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
                        console.log(`Deleting user: ${type}:${email} from topic: ${topicName}`);
                        readBinding.members.splice(i, 1);
                        isDirty = true;
                    }
                }
            }
        }
    } else {
        topicPolicy.bindings = [];
    }

    if (!bindingExists) {
        readBinding.role = viewerRole;
        readBinding.members = [];
        topicPolicy.bindings.push(readBinding);
    }

    accounts.forEach(account => {
        if (account.email && account.emailType) {
            const identifier = `${account.emailType}:${account.email}`;
            const accessRecordExists = readBinding.members.includes(identifier);
            if (!accessRecordExists) {
                readBinding.members.push(identifier);
                isDirty = true;
                console.log(`Adding access record to topic: ${topicName}: ${JSON.stringify(account)}`);
            }
        }
    });

    if (isDirty === true) {
        try {
            await pubsubUtil.setTopicIamPolicy(topicName, topicPolicy);
            console.info(`Policy set successfully for topic '${topicName}'`);
        } catch (err) {
            console.error(`Failed to set policy for topic '${topicName}' with error '${err}' and payload: ${JSON.stringify(topicPolicy)}`);
            throw err;
        }
    } else {
        console.info(`Metadata is already up to date for topic: '${topicName}'`);
    }

    console.log(`End IAM update for topic: ${topicName}`);
    return isDirty;
}

module.exports = {
    applyPolicies
};
