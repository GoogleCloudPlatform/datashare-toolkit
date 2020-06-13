/**
 * Copyright 2020 Google LLC
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

const { BigQueryUtil, CommerceProcurementUtil } = require('cds-shared');
let bigqueryUtil = new BigQueryUtil();
const cfg = require('../lib/config');
const underscore = require("underscore");
const accountManager = require('../accounts/dataManager');

/**
 * @param  {string} projectId
 * @param  {string} datasetId
 * @param  {string} tableId
 * Get the FQDN format for a project's table or view name
 */
function getTableFqdn(projectId, datasetId, tableId) {
    return `${projectId}.${datasetId}.${tableId}`;
}

/**
 * @param  {string} projectId
 * Get a list of Procurements
 */
async function listProcurements(projectId) {
    try {
        const procurementUtil = new CommerceProcurementUtil(projectId);
        // OR state=ENTITLEMENT_PENDING_CANCELLATION OR state=ENTITLEMENT_CANCELLED
        const result = await procurementUtil.listEntitlements('state=ENTITLEMENT_ACTIVATION_REQUESTED');
        let entitlements = result.entitlements || [];

        const accountNames = underscore.uniq(entitlements.map(e => e.account));

        // Query for the policy data and join that on for policy name.
        const products = entitlements.map(e => e.product + '$||$' + e.plan);

        if (products && products.length > 0) {
            const table = getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsPolicyViewId);
            const query = `WITH policyData AS (
    SELECT
        policyId,
        marketplace,
        CONCAT(marketplace.solutionId, '$||$', marketplace.planId) as marketplaceId,
        name,
        description
    FROM \`${table}\`
    WHERE marketplace IS NOT NULL
)
SELECT *
FROM policyData
WHERE marketplaceId IN UNNEST(@products)`;

            const options = {
                query: query,
                params: { products: products },
            }
            const [policyRows] = await bigqueryUtil.executeQuery(options);
            if (policyRows && policyRows.length > 0) {
                entitlements.forEach(e => {
                    const policy = underscore.findWhere(policyRows, { marketplaceId: e.product + '$||$' + e.plan });
                    if (policy) {
                        e.policy = { policyId: policy.policyId, name: policy.name, description: policy.description };
                    }
                });
            }
        }

        // Set activated flag to false
        entitlements.forEach(e => {
            e.activated = false;
        });

        if (accountNames && accountNames.length > 0) {
            const table = getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsAccountViewId);
            const query = `SELECT a.accountId, m.accountName, a.email
FROM \`${table}\` a
CROSS JOIN UNNEST(a.marketplace) as m
WHERE m.accountName IN UNNEST(@accountNames)`;

            const options = {
                query: query,
                params: { accountNames: accountNames },
            }
            const [accountRows] = await bigqueryUtil.executeQuery(options);

            if (accountRows && accountRows.length > 0) {
                entitlements.forEach(e => {
                    const account = underscore.findWhere(accountRows, { accountName: e.account });
                    if (account) {
                        e.email = account.email;
                        e.accountId = account.accountId;
                        if (e.policy) {
                            // Only set activated if a policy is found.
                            e.activated = true;
                        }
                    }
                });
            }
        }

        return { success: true, data: entitlements };
    } catch (err) {
        console.error(err);
        return { success: false, errors: ['Failed to retrieve pending entitlement list', err] };
    }
}

/**
 * @param  {} projectId The projectId for the provider
 * @param  {} name Name of the entitlement resource
 * @param  {} status The approval status, should be one of ['approve', 'reject', 'comment']
 * @param  {} reason Only provided for a rejection
 * @param  {} accountId The datashare accountId
 * @param  {} policyId The datashare policyId
 */
async function approveEntitlement(projectId, name, status, reason, accountId, policyId) {
    try {
        const procurementUtil = new CommerceProcurementUtil(projectId);
        if (status === 'approve') {
            const result = await procurementUtil.approveEntitlement(name);
            const account = await accountManager.getAccount(projectId, accountId);
            const policyRecord = { policyId: policyId };
            let accountData = account.data;
            let policies = accountData.policies || [];
            const found = underscore.findWhere(policies, policyRecord);
            if (!found) {
                policies.push(policyRecord);
                // TODO: Get fid of this conversion
                accountData.policies = accountData.policies.map(e => e.policyId);
                console.log(`Updating account: ${JSON.stringify(accountData, null, 3)}`);
                await accountManager.createOrUpdateAccount(projectId, accountId, accountData);
            }
            return { success: true, data: result };
        } else if (status === 'reject') {
            const result = await procurementUtil.rejectEntitlement(name, reason);
            return { success: true, data: result };
        } else if (status === 'comment') {
            const result = await procurementUtil.updateEntitlementMessage(name, reason);
            return { success: true, data: result };
        }
    } catch (err) {
        console.error(err);
        return { success: false, errors: ['Failed to approve entitlement', err] };
    }
}

module.exports = {
    listProcurements,
    approveEntitlement
};
