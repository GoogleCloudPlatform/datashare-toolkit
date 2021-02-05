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
const cfg = require('../lib/config');
const underscore = require("underscore");
const accountManager = require('../accounts/dataManager');
const policyManager = require('../policies/dataManager');

/**
 * @param  {string} projectId
 * @param  {} stateFilter
 * @param  {} accountNameFilter
 * Get a list of Procurements
 */
async function listProcurements(projectId, stateFilter, accountNameFilter) {
    try {
        const procurementUtil = new CommerceProcurementUtil(projectId);
        const bigqueryUtil = new BigQueryUtil(projectId);

        /*
        let filter = 'state=';
        if (stateFilter && stateFilter.length > 0) {
            filter += stateFilter.join(' OR state=')
        } else {
            filter += 'ENTITLEMENT_ACTIVATION_REQUESTED';
        }

        const result = await procurementUtil.listEntitlements(filter);
        let entitlements = result.entitlements || [];
        */

        let filterString = null;
        if (accountNameFilter) {
            let accountFilter = '';
            accountNameFilter.forEach(e => {
                if (accountFilter != '') {
                    accountFilter += ' OR ';
                }
                const name = e.substring(e.lastIndexOf('/') + 1);
                accountFilter += `account=${name}`;
            });
            if (accountFilter) {
                filterString = accountFilter;
            }
        }

        // Should use filter, but due to bug with 'ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL' 
        // passing null and filtering locally.
        const result = await procurementUtil.listEntitlements(filterString);
        let entitlements = [];
        if (result.entitlements) {
            // Work around for bug [#00012788] Error filtering on ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL
            if (stateFilter && stateFilter.length > 0) {
                entitlements = underscore.filter(result.entitlements, (row) => {
                    return stateFilter.includes(row.state);
                });
            } else {
                entitlements = result.entitlements;
            }
        }

        const accountNames = underscore.uniq(entitlements.map(e => e.account));

        // Query for the policy data and join that on for policy name.
        const products = entitlements.map(e => e.product + '$||$' + e.plan);

        if (products && products.length > 0) {
            const table = bigqueryUtil.getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsPolicyViewId);
            const query = `WITH policyData AS (
    SELECT
        policyId,
        marketplace,
        CONCAT(marketplace.solutionId, '$||$', marketplace.planId) AS marketplaceId,
        name,
        description
    FROM \`${table}\`
    WHERE isDeleted IS FALSE AND marketplace IS NOT NULL
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
            const table = bigqueryUtil.getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsAccountViewId);
            const query = `SELECT a.accountId, m.accountName, a.email
FROM \`${table}\` a
CROSS JOIN UNNEST(a.marketplace) AS m
WHERE a.isDeleted IS FALSE AND m.accountName IN UNNEST(@accountNames)`;

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
 * @param  {} projectId
 * @param  {} entitlementId
 */
async function activateNewEntitlement(projectId, entitlementId) {
    try {
        const procurementUtil = new CommerceProcurementUtil(projectId);
        const entitlementName = procurementUtil.getEntitlementName(projectId, entitlementId);
        const entitlement = await procurementUtil.getEntitlement(entitlementName);
        const account = await accountManager.findMarketplaceAccount(projectId, entitlement.account);
        const policy = await policyManager.findMarketplacePolicy(projectId, entitlement.product, entitlement.plan);
        const modifiedAccount = addEntitlement(account, policy.policyId);
        if (modifiedAccount.changed === true) {
            await accountManager.createOrUpdateAccount(projectId, modifiedAccount.account.accountId, modifiedAccount.account);
        }
    } catch (err) {
        console.error(err);
        return { success: false, errors: ['Failed to activate new entitlement', err] };
    }
}

/**
 * @param  {} projectId
 * @param  {} entitlementId
 */
async function activateNewPlanChange(projectId, entitlementId) {
    try {
        const procurementUtil = new CommerceProcurementUtil(projectId);
        const entitlementName = procurementUtil.getEntitlementName(projectId, entitlementId);
        const entitlement = await procurementUtil.getEntitlement(entitlementName);
        const account = await accountManager.findMarketplaceAccount(projectId, entitlement.account);
        console.log(`Account data: ${JSON.stringify(account, null, 3)}`);
        await syncAccountEntitlements(projectId, account);

        /*
        // The ENTITLEMENT_PLAN_CHANGED does not contain the old and new plan.
        const account = await accountManager.findMarketplaceAccount(projectId, entitlement.account);
        const existingPolicy = await policyManager.findMarketplacePolicy(projectId, entitlement.product, entitlement.plan);
        const pendingPolicy = await policyManager.findMarketplacePolicy(projectId, entitlement.product, entitlement.newPendingPlan);

        let updateOne = removeEntitlement(account, existingPolicy.policyId);
        let updateTwo = addEntitlement(updateOne.account, pendingPolicy.policyId);

        if (updateOne.changed === true || updateTwo.changed === true) {
            await accountManager.createOrUpdateAccount(projectId, updateTwo.account.accountId, updateTwo.account);
        }
        */
    } catch (err) {
        console.error(err);
        return { success: false, errors: ['Failed to activate plan change', err] };
    }
}

/**
 * @param  {} projectId The projectId for the provider
 * @param  {} name Name of the entitlement resource
 * @param  {} status The approval status, should be one of ['approve', 'reject', 'comment']
 * @param  {} reason Only provided for a rejection
 */
async function approveEntitlement(projectId, name, status, reason) {
    try {
        const procurementUtil = new CommerceProcurementUtil(projectId);
        const entitlement = await procurementUtil.getEntitlement(name);
        const state = entitlement.state;

        // Newly purchased entitlement
        if (state === 'ENTITLEMENT_ACTIVATION_REQUESTED') {
            if (status === 'approve') {
                const account = await accountManager.findMarketplaceAccount(projectId, entitlement.account);
                const policy = await policyManager.findMarketplacePolicy(projectId, entitlement.product, entitlement.plan);
                console.log(`Approving entitlement for account:${JSON.stringify(account)} with policy: ${JSON.stringify(policy)}`);
                const result = await procurementUtil.approveEntitlement(name);
                return { success: true, data: result };
            } else if (status === 'reject') {
                const result = await procurementUtil.rejectEntitlement(name, reason);
                return { success: true, data: result };
            } else if (status === 'comment') {
                const result = await procurementUtil.updateEntitlementMessage(name, reason);
                return { success: true, data: result };
            }
        } else if (state === 'ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL') {
            // Handle approval and rejection for plan change approval
            // Do an entitlement get to find the current plan name and the new pending name
            // Parameter for getting the entitlement is the name: name.
            // const currentPlan = entitlement.currentPlan;
            if (status === 'approve') {
                // Approve plan change, this would only be for a manual approve.
                // An automated approval would be handled by a Pub/Sub notification.
                // Remove user from current policy and add to new plan related policy.
                // Re-factor removeEntitlement so that it doesn't call createOrUpdateAccount maybe, in order that we can remove and add using the same functions.
                const account = await accountManager.findMarketplaceAccount(projectId, entitlement.account);
                const existingPolicy = await policyManager.findMarketplacePolicy(projectId, entitlement.product, entitlement.plan);
                const pendingPolicy = await policyManager.findMarketplacePolicy(projectId, entitlement.product, entitlement.newPendingPlan);
                console.log(`Approving entitlement for account:${JSON.stringify(account)} from policy: ${JSON.stringify(existingPolicy)} to policy: ${JSON.stringify(pendingPolicy)}`);
                const result = await procurementUtil.approvePlanChange(name, entitlement.newPendingPlan);
                return { success: true, data: result };
            } else if (status === 'reject') {
                // No need to do anything further, existing plan and policy relations will remain the same.
                const result = await procurementUtil.rejectPlanChange(name, entitlement.newPendingPlan, reason);
                return { success: true, data: result };
            }
        }
    } catch (err) {
        console.error(err);
        return { success: false, errors: ['Failed to approve entitlement', err] };
    }
}

/**
 * @param  {} accountData
 * @param  {} policyId
 */
function removeEntitlement(accountData, policyId) {
    const policyRecord = { policyId: policyId };
    let policies = accountData.policies || [];
    const found = underscore.findWhere(policies, policyRecord);
    if (found) {
        policies = underscore.without(policies, underscore.findWhere(policies, policyRecord));
        const filtered = policies.filter(function (el) {
            return el != null && el.policyId.trim() !== '';
        });
        accountData.policies = filtered;
        accountData.createdBy = accountData.email;
        return { changed: true, account: accountData };
    } else {
        console.error(`Policy not found: '${policyId}'`);
        return { changed: false, account: accountData };
    }
}

/**
 * @param  {} accountData
 * @param  {} policyId
 */
function addEntitlement(accountData, policyId) {
    const policyRecord = { policyId: policyId };
    let policies = accountData.policies || [];
    const found = underscore.findWhere(policies, policyRecord);
    if (!found) {
        policies.push(policyRecord);
        const filtered = policies.filter(function (el) {
            return el != null && el.policyId.trim() !== '';
        });
        accountData.policies = filtered;
        accountData.createdBy = accountData.email;
        return { changed: true, account: accountData };
    } else {
        console.error(`Policy not found: '${policyId}'`);
        return { changed: false, account: accountData };
    }
}

/**
 * @param  {} accountData
 */
function clearEntitlements(accountData) {
    let policies = accountData.policies || [];
    if (policies.length > 0) {
        policies = [];
        accountData.policies = policies;
        return { changed: true, account: accountData };
    } else {
        return { changed: false, account: accountData };
    }
}

/**
 * @param  {} projectId
 * @param  {} entitlementId
 */
async function autoApproveEntitlement(projectId, entitlementId) {
    const procurementUtil = new CommerceProcurementUtil(projectId);

    // Get the fully qualified entitlement resource name
    const entitlementName = procurementUtil.getEntitlementName(projectId, entitlementId);

    // Get the entitlement object from the procurement api
    const entitlement = await procurementUtil.getEntitlement(entitlementName);
    console.log(`Entitlement: ${JSON.stringify(entitlement, null, 3)}`);

    const state = entitlement.state;
    const product = entitlement.product;
    const plan = entitlement.plan;
    const accountName = entitlement.account;

    if (state === 'ENTITLEMENT_ACTIVATION_REQUESTED') {
        const policy = await policyManager.findMarketplacePolicy(projectId, product, plan);
        console.log(`Found policy ${JSON.stringify(policy, null, 3)}`);
        if (policy && policy.marketplace) {
            const enableAutoApprove = policy.marketplace.enableAutoApprove;
            if (enableAutoApprove === true) {
                console.log(`Auto approve is enabled for policy ${policy.policyId}, will check if the user account is already activated`);
                // We need to associate the user to this entitlement, so user must register and activate.
                if (accountName) {
                    // Approve the account (if it's activated in Datashare already)
                    // Otherwise, do not approve - return, and only approve upon the account dataManager activation
                    // When activating an account, check if there are any pending entitlement activations
                    // which are associated to policies that allow enableAutoApprove
                    // If so, upon activating the account, associate the policy and approve the entitlement
                    const account = await accountManager.findMarketplaceAccount(projectId, accountName);
                    console.log(`Account data: ${JSON.stringify(account, null, 3)}`);
                    if (account) {
                        console.log(`Account is already activated, will now proceed to approve the entitlement`);
                        // We should not auto approve the entitlement if the account was not activated
                        // as if the account wasn't activated yet, we do not know the email address for the associated user
                        // As a side note, an entitlement cannot be approved unless the associated account is already activated
                        // the account should always be approved first, followed by the entitlement
                        await approveEntitlement(projectId, entitlementName, 'approve', 'Auto-approved');
                    } else {
                        console.log(`Account was not found, entitlement will not be auto-approved`);
                    }
                }
            } else {
                console.log(`Auto approve is not enabled for policy: ${policy.policyId}`);
            }
        }
    } else if (state === 'ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL') {
        const policy = await policyManager.findMarketplacePolicy(projectId, entitlement.product, entitlement.newPendingPlan);
        console.log(`Found policy ${JSON.stringify(policy, null, 3)}`);
        if (policy && policy.marketplace) {
            const enableAutoApprove = policy.marketplace.enableAutoApprove;
            if (enableAutoApprove === true) {
                console.log(`Auto approve is enabled for policy ${policy.policyId}, will check if the user account is already activated`);
                if (accountName) {
                    const account = await accountManager.findMarketplaceAccount(projectId, accountName);
                    console.log(`Account data: ${JSON.stringify(account, null, 3)}`);
                    if (account) {
                        console.log(`Account is already activated, will now proceed to approve the entitlement`);
                        await approveEntitlement(projectId, entitlementName, 'approve', 'Auto-approved plan change');
                    } else {
                        console.log(`Account was not found, entitlement will not be auto-approved`);
                    }
                }
            }
        }
    }
}

/**
 * @param  {} projectId
 * @param  {} entitlementId
 */
async function cancelEntitlement(projectId, entitlementId) {
    const procurementUtil = new CommerceProcurementUtil(projectId);

    // Get the fully qualified entitlement resource name
    const entitlementName = procurementUtil.getEntitlementName(projectId, entitlementId);

    // Get the entitlement object from the procurement api
    const entitlement = await procurementUtil.getEntitlement(entitlementName);
    console.log(`Entitlement: ${JSON.stringify(entitlement, null, 3)}`);
    const product = entitlement.product;
    const plan = entitlement.plan;
    const accountName = entitlement.account;

    const policy = await policyManager.findMarketplacePolicy(projectId, product, plan);
    console.log(`Found policy ${JSON.stringify(policy, null, 3)}`);
    if (policy) {
        const account = await accountManager.findMarketplaceAccount(projectId, accountName);
        console.log(`Account data: ${JSON.stringify(account, null, 3)}`);
        if (account) {
            console.log(`Account found, will now proceed to remove the entitlement`);
            const result = removeEntitlement(account, policy.policyId);
            if (result.changed === true) {
                await accountManager.createOrUpdateAccount(projectId, result.account.accountId, result.account);
            }
        }
    } else {
        console.error(`Policy not found for cancelled entitlementId: ${entitlementId}`);
    }
}

/**
 * @param  {} projectId
 * @param  {} entitlementId
 */
async function deleteAccount(projectId, accountId) {
    const procurementUtil = new CommerceProcurementUtil(projectId);
    const accountName = procurementUtil.getAccountName(projectId, accountId);
    const account = await accountManager.findMarketplaceAccount(projectId, accountName);
    console.log(`Account data: ${JSON.stringify(account, null, 3)}`);
    if (account) {
        await accountManager.deleteAccount(projectId, account.accountId);
    }
}

/**
 * @param  {} projectId
 * @param  {} accountId
 */
async function syncAccountEntitlements(projectId, account) {
    try {
        if (account && account.marketplace && account.marketplace.length > 0) {
            // Marketplace is activated
            const accountNames = account.marketplace.map(i => i.accountName);
            const result = await listProcurements(projectId, ['ENTITLEMENT_ACTIVE', 'ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL', 'ENTITLEMENT_PENDING_PLAN_CHANGE', 'ENTITLEMENT_PENDING_CANCELLATION'], accountNames);
            const entitlements = result.data || [];
            account = clearEntitlements(account).account;
            entitlements.forEach(e => {
                if (e.policy && e.policy.policyId) {
                    account = addEntitlement(account, e.policy.policyId).account;
                }
            });
            await accountManager.createOrUpdateAccount(projectId, account.accountId, account);
        }
        return { success: true, code: 200 };
    } catch (err) {
        return { success: false, code: 500, errors: ['Failed to sync account entitlements', err] };
    }
}

/**
 * @param  {} projectId
 */
async function syncAllAccountEntitlements(projectId) {
    let result = await accountManager.listAccounts(projectId);
    if (result.success) {
        for (const a of result.data) {
            if (a.marketplaceActivated === true && a.marketplaceSynced === false) {
                // Sync the account
                const account = await accountManager.getAccount(projectId, a.accountId);
                console.log(`Account out of sync with marketplace: ${JSON.stringify(account)}`);
                if (account) {
                    await syncAccountEntitlements(projectId, account);
                }
            } else {
                console.log(`Account marketplace entitlements in sync: ${JSON.stringify(a.email)}`);
            }
        }
    } else {
        console.error(`Failed to get list of accounts`);
    }
}

module.exports = {
    listProcurements,
    approveEntitlement,
    autoApproveEntitlement,
    activateNewEntitlement,
    activateNewPlanChange,
    cancelEntitlement,
    deleteAccount,
    syncAccountEntitlements,
    syncAllAccountEntitlements
};
