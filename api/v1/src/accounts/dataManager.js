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
const uuidv4 = require('uuid/v4');

const cfg = require('../lib/config');
const runtimeConfig = require('../lib/runtimeConfig');
const metaManager = require('../lib/metaManager');

const underscore = require("underscore");

const jwksClient = require('jwks-rsa');
const ms = require('ms');
const approvalName = 'signup';

const client = jwksClient({
    cache: true, // Default Value
    cacheMaxEntries: 5, // Default value
    cacheMaxAge: ms('10m'), // Default value
    rateLimit: true,
    jwksRequestsPerMinute: 10, // Default value
    jwksUri: cfg.procurementJwksUri
});

/**
 * @param  {string} projectId
 * @param  {object} fields
 * @param  {object} values
 * @param  {object} data
 * Insert account data
 */
async function _insertData(projectId, fields, values, data) {
    const bigqueryUtil = new BigQueryUtil(projectId);
    const table = bigqueryUtil.getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsAccountTableId);
    const sqlQuery = `INSERT INTO \`${table}\` (${fields}) VALUES (${values})`;
    console.log(sqlQuery);
    const options = {
        query: sqlQuery,
        params: data
    };
    return await bigqueryUtil.executeQuery(options);
}

/**
 * @param  {} projectId
 * @param  {} fields
 * @param  {} values
 * @param  {} data
 */
async function _deleteData(projectId, fields, values, data) {
    const bigqueryUtil = new BigQueryUtil(projectId);
    const table = bigqueryUtil.getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsAccountTableId);
    const sqlQuery = `INSERT INTO \`${table}\` (${fields})
        SELECT ${values}
        FROM \`${table}\`
        WHERE rowId = @incomingRowId`;

    console.log(sqlQuery);
    const options = {
        query: sqlQuery,
        params: data
    };
    return await bigqueryUtil.executeQuery(options);
}

/**
 * @param  {string} projectId
 * @param  {datasetId} datasetId
 * @param  {policyId} policyId
 * Get a list of Accounts
 */
async function listAccounts(projectId, datasetId, policyId) {
    const bigqueryUtil = new BigQueryUtil(projectId);
    const table = bigqueryUtil.getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsAccountViewId);
    const policyTable = bigqueryUtil.getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsPolicyViewId);
    const limit = 10;
    let sqlQuery = `SELECT ca.* except(policies),
        array(
            select as struct
                pm.policyId,
                pm.name,
                pm.marketplace.solutionId,
                pm.marketplace.planId
            from unnest(ca.policies) p
            join \`${policyTable}\` pm on p.policyId = pm.policyId
            where pm.isDeleted is false
           ) as policies
        FROM \`${table}\` ca
        where ca.isDeleted is false;`
    let options = {
        query: sqlQuery
    };
    if (datasetId) {
        sqlQuery = `with policies as (
            select distinct
              cp.policyId,
              cp.name,
              cp.isTableBased,
              cp.marketplace.solutionId,
              cp.marketplace.planId,
              d.datasetId
            FROM \`${policyTable}\` cp
            cross join unnest(cp.datasets) d
            where d.datasetId = @datasetId and cp.isDeleted is false
          ),
          userPolicies as (
            select
              ca.* EXCEPT(policies),
              cp.policyId,
              cp.name,
              cp.solutionId,
              cp.planId
            FROM \`${table}\` ca
            cross join unnest(ca.policies) as p
            join policies cp on p.policyId = cp.policyId
            where ca.isDeleted IS false and cp.isTableBased IS false
          )
          select
            up.rowId,
            up.email,
            up.emailType,
            up.accountId,
            up.createdAt,
            up.createdBy,
            up.version,
            ARRAY_AGG(struct(policyId, name, solutionId, planId)) as policies
          from userPolicies up
          group by up.rowId, up.email, up.emailType, up.accountId, up.createdAt, up.createdBy, up.version`;
        options = {
            query: sqlQuery,
            params: { datasetId: datasetId }
        };
    } else if (policyId) {
        let fields = new Set(cfg.cdsAccountViewFields);
        let remove = ['rowId', 'accountId', 'accountType', 'createdBy', 'policies', 'createdAt', 'version', 'isDeleted'];
        remove.forEach(f => fields.delete(f));
        fields = Array.from(fields).map(i => 'ca.' + i).join();
        sqlQuery = `SELECT ${fields}
        FROM \`${table}\` ca
        CROSS JOIN UNNEST(ca.policies) as p
        WHERE p.policyId = @policyId
        LIMIT ${limit}`
        options = {
            query: sqlQuery,
            params: { policyId: policyId }
        };
    }

    try {
        const [rows] = await bigqueryUtil.executeQuery(options);
        const accounts = await checkProcurementEntitlements(projectId, rows);
        return { success: true, data: accounts };
    } catch (err) {
        console.error(err);
        return { success: false, code: 500, errors: ['Unable to retrieve accounts'] };
    }
}

/**
 * @param  {} projectId
 * @param  {} account
 */
async function checkProcurementEntitlement(projectId, account) {
    if (account.marketplace && account.marketplace.length > 0) {
        const accountNames = account.marketplace.map(i => i.accountName);
        let accountFilter = '';
        accountNames.forEach(e => {
            if (accountFilter != '') {
                accountFilter += ' OR ';
            }
            const name = e.substring(e.lastIndexOf('/') + 1);
            accountFilter += `account=${name}`;
        });
        let result = await checkProcurementEntitlements(projectId, [account], accountFilter);
        return result[0];
    }
    return account;
}

/**
 * @param  {} projectId
 * @param  {} accounts
 * @param  {} accountFilter
 */
async function checkProcurementEntitlements(projectId, accounts, accountFilter) {
    // Check if marketplace integration is enabled before making procurement calls.
    if (await runtimeConfig.marketplaceIntegration(projectId) === false) {
        return accounts;
    }

    /*let filterString = `(state=ENTITLEMENT_ACTIVE OR state=ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL)`;
    if (accountFilter) {
        filterString = `(state=ENTITLEMENT_ACTIVE OR state=ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL) AND (${accountFilter})`;
    }*/
    let filterString = '';
    if (accountFilter) {
        filterString = accountFilter;
    }
    const procurementUtil = new CommerceProcurementUtil(projectId);
    const result = await procurementUtil.listEntitlements(filterString);
    // const entitlements = result.entitlements || [];

    const stateFilter = ['ENTITLEMENT_ACTIVE', 'ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL', 'ENTITLEMENT_PENDING_PLAN_CHANGE', 'ENTITLEMENT_PENDING_CANCELLATION'];
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

    // Iterate every account
    accounts.forEach((account) => {
        account.marketplaceSynced = true;

        // Get distinct list of account names associated to each datashare account
        let accountNames = [];
        if (account.marketplace && account.marketplace.length > 0) {
            accountNames = account.marketplace.map(i => i.accountName);
            account.marketplaceActivated = true;
        } else {
            account.marketplaceActivated = false;
        }

        let userEntitlements = [];
        if (accountNames && accountNames.length > 0) {
            userEntitlements = underscore.filter(entitlements, (e) => {
                return accountNames.includes(e.account);
            });
        }

        // Iterate datashare account policies
        if (account.policies && account.policies.length > 0) {
            account.policies.forEach((p) => {
                const userEntitlement = underscore.findWhere(userEntitlements, { product: p.solutionId, plan: p.planId });
                if (userEntitlement) {
                    p.marketplaceEntitlementActive = true;
                } else {
                    p.marketplaceEntitlementActive = false;
                    account.marketplaceSynced = false;
                }
            });
        }

        // Iterate marketplace entitlements
        userEntitlements.forEach((e) => {
            if (account.policies && account.policies.length > 0) {
                const policy = underscore.findWhere(account.policies, { solutionId: e.product, planId: e.plan });
                if (!policy) {
                    account.marketplaceSynced = false;
                }
            } else {
                account.marketplaceSynced = false;
            }
        });
    });

    return accounts;
}

/**
 * @param  {string} projectId
 * @param  {object} data
 * Create a Account based off data values
 */
async function createOrUpdateAccount(projectId, accountId, data) {
    console.log(`createOrUpdateAccount called with accountId: ${accountId} and data: ${JSON.stringify(data)}`);
    let _accountId = accountId;

    // If provided policies is not a string array, re-format it to string array
    // TODO: Clean up format before passing from UI to eliminate this conversion
    // From here policies are handled as an array until they're formatted for saving in BQ
    let policies = data.policies || [];
    if (policies && typeof policies[0] !== 'string') {
        data.policies = policies.map(p => { return p.policyId });
    }

    let impactedPolicies = data.policies ? Array.from(data.policies) : [];
    const currentAccount = await getAccount(projectId, accountId, data.email, data.emailType);
    console.log(`currentAccount response: ${JSON.stringify(currentAccount)}`);
    if (currentAccount) {
        // Update logic
        if (data.rowId && currentAccount.rowId !== data.rowId) {
            // If user is updating an existing record, compare the rowId to ensure they're making updates from the latest record.
            return { success: false, code: 500, errors: ["STALE"] };
        }
        else if (accountId) {
            // Only merge the existing policies if user is updating an existing row.
            // If user is re-instating a deleted record, ignore the old policies.
            impactedPolicies = underscore.union(impactedPolicies, currentAccount.policies.map(p => p.policyId));
        }
        // In case getAccount was found based on email and emailType from a previously deleted record.
        _accountId = currentAccount.accountId;
    }
    else {
        _accountId = uuidv4();
    }

    console.log(`Impacted policies is: ${JSON.stringify(impactedPolicies, null, 3)}`);

    const rowId = uuidv4();
    const isDeleted = false;
    const createdAt = new Date().toISOString();

    let fields = [...cfg.cdsAccountTableFields], values = [...cfg.cdsAccountTableFields];

    // reformat policies object for saving
    if (policies.length === 0) {
        // If there are no supplied policies, remove policies column field and value from insert statement.
        delete data.policies;
        const index = fields.indexOf('policies');
        if (index > -1) {
            fields.splice(index, 1);
            values.splice(index, 1);
        }
    } else {
        // String array is passed in reformat for storing as dictionaries
        // Reformat for storing into BQ
        data.policies = data.policies.map(p => { return { policyId: p }; });
    }

    let marketplace = data.marketplace || [];
    if (marketplace.length === 0) {
        // If there are no supplied marketplace, remove marketplace column field and value from insert statement.
        delete data.marketplace;
        const index = fields.indexOf('marketplace');
        if (index > -1) {
            fields.splice(index, 1);
            values.splice(index, 1);
        }
    }

    fields = Array.from(fields).join();
    values = Array.from(values).map(i => '@' + i).join();

    // merge the data and extra values together
    data = {
        ...data,
        ...{
            rowId: rowId,
            accountId: _accountId,
            isDeleted: isDeleted,
            createdAt: createdAt,
            accountType: 'consumer'
        }
    };
    console.log(JSON.stringify(data));
    const [rows] = await _insertData(projectId, fields, values, data);
    if (rows.length === 0) {
        try {
            await metaManager.performPolicyUpdates(projectId, impactedPolicies, false);
        } catch (err) {
            return { success: false, code: 500, errors: [err.message] };
        }
        return { success: true, data: data };
    } else {
        const message = `Account did not create with data values: '${data}'`;
        return { success: false, code: 500, errors: [message] };
    }
}

/**
 * @param  {string} projectId
 * @param  {string} accountId
 * @param  {string} email
 * @param  {string} emailType
 * Get a Account based off projectId and accountId
 */
async function getAccount(projectId, accountId, email, emailType) {
    const bigqueryUtil = new BigQueryUtil(projectId);
    const table = bigqueryUtil.getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsAccountViewId);
    const policyTable = bigqueryUtil.getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsPolicyViewId);
    const limit = 2;
    let filter = 'WHERE accountId = @accountId AND isDeleted IS FALSE';
    let params = {};
    if (accountId) {
        params.accountId = accountId;
    }
    else if (email && emailType) {
        filter = 'WHERE email = @email AND emailType = @emailType AND isDeleted IS FALSE';
        params = { email: email, emailType: emailType };
    }

    const sqlQuery = `SELECT ca.* except(policies),
    array(
        select as struct
            pm.policyId,
            pm.name,
            pm.marketplace.solutionId,
            pm.marketplace.planId
        from unnest(ca.policies) p
        join \`${policyTable}\` pm on p.policyId = pm.policyId
        where pm.isDeleted is false
       ) as policies
FROM \`${table}\` ca
${filter} LIMIT ${limit};`

    const options = {
        query: sqlQuery,
        params: params
    };

    try {
        const [rows] = await bigqueryUtil.executeQuery(options);
        if (rows.length === 1) {
            const account = checkProcurementEntitlement(projectId, rows[0]);
            return account;
        } else {
            const message = `Account '${accountId}:${email}:${emailType}' does not exist within table: '${table}'`;
            console.warn(message);
            return null;
        }
    } catch (err) {
        console.error(`Error in getAccount when searching for '${accountId}:${email}:${emailType}': ${err.message}`);
        return null;
    }
}

/**
 * @param  {} projectId
 * @param  {} accountName
 */
async function findMarketplaceAccount(projectId, accountName) {
    const bigqueryUtil = new BigQueryUtil(projectId);
    const table = bigqueryUtil.getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsAccountViewId);
    const fields = Array.from(cfg.cdsAccountViewFields).join();
    const limit = 2;

    const sqlQuery = `SELECT ${fields}
FROM \`${table}\` c
CROSS JOIN UNNEST(c.marketplace) m
WHERE c.isDeleted IS FALSE AND m.accountName = @accountName
LIMIT ${limit}`;
    const options = {
        query: sqlQuery,
        params: { accountName: accountName }
    };

    try {
        const [rows] = await bigqueryUtil.executeQuery(options);
        if (rows.length === 1) {
            return rows[0];
        } else {
            const message = `Account '${accountName}' does not exist within table: '${table}'`;
            console.warn(message);
            return null;
        }
    } catch (err) {
        console.error(`Error in findMarketplaceAccount when searching for '${accountName}': ${err.message}`);
        return null;
    }
}

/**
 * @param  {string} projectId
 * @param  {object} data
 * Updated a Account based off accountId and data values
 */
async function deleteAccount(projectId, accountId, data) {
    const currentAccount = await getAccount(projectId, accountId);
    if (!currentAccount) {
        return { success: false, code: 404, errors: ["AccountId not found"] };
    }
    if (currentAccount && currentAccount.rowId !== data.rowId) {
        return { success: false, code: 500, errors: ["STALE"] };
    }

    let fields = [...cfg.cdsAccountTableFields];
    let values = ['@rowId', 'accountId', 'email', 'emailType', 'accountType', '@createdBy', 'current_timestamp()', 'policies', 'marketplace', 'true'];
    fields = Array.from(fields).join();
    values = Array.from(values).join();

    const rowId = uuidv4();
    let params = { rowId: rowId, createdBy: data.createdBy, incomingRowId: data.rowId };
    await _deleteData(projectId, fields, values, params);

    let policyIds = [];
    currentAccount.policies.forEach(p => {
        policyIds.push(p.policyId);
    })
    console.log(`Policy id's requiring refresh result ${JSON.stringify(policyIds)}`);
    if (policyIds.length > 0) {
        try {
            await metaManager.performPolicyUpdates(projectId, policyIds, false);
        } catch (err) {
            return { success: false, code: 500, errors: [err.message] };
        }
        return { success: true, data: {} };
    } else {
        const message = `Account did not delete with data values: '${data}'`;
        return { success: false, code: 500, errors: [message] };
    }
}

/**
 * @param  {} host
 * @param  {} token
 */
async function register(host, token) {
    // https://cloud.google.com/marketplace/docs/partners/integrated-saas/frontend-integration#verify-jwt
    const jwt = require('jsonwebtoken');

    /*
        1. Verify that the JWT signature is using the public key from Google.
        2. Verify that the JWT has not expired, by checking the exp claim.
        3. Verify that aud claim is the correct domain for your solution.
        4. Verify that the iss claim is https://www.googleapis.com/robot/v1/metadata/x509/cloud-commerce-partner@system.gserviceaccount.com
        5. Verify that sub is not empty.
    */

    const options = {
        algorithms: ['RS256'],

        // TODO: Should be passed in dynamically from solution configuration.
        // Host or referrer in the header
        // req.header.host
        audience: host,

        issuer: cfg.procurementIssuer,
        ignoreExpiration: false,
        complete: true
    };

    // Get the kid value
    const decoded = jwt.decode(token, options);

    let kid = '';
    if (decoded && decoded.header && decoded.header.kid) {
        // kid indicates the key ID that was used to secure the JWT. Use the key ID to
        // look up the key from the JSON object in the iss attribute in the payload.
        kid = decoded.header.kid;
        // console.log(`jwt kid: ${kid}`);
    } else {
        return { success: false, code: 500, errors: ['Unable to parse JWT token'] };
    }

    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
        client.getSigningKey(kid, (err, key) => {
            if (!err) {
                const signingKey = key.getPublicKey();
                try {
                    const result = jwt.verify(token, signingKey, options);
                    resolve({ success: true, code: 200, data: result });
                } catch (err) {
                    resolve({ success: false, code: 401, errors: [err] });
                }
            } else {
                resolve({ success: false, code: 500, errors: [err] });
            }
        });
    });

    // Response write out for 302 redirect if valid JWT, otherwise 302 redirect to invalid request page
    // Record sub in the db table with the incoming accountId
    // If we have to pass any data back to the UI, use a session-based cookie
}

/**
 * @param  {} projectId
 * @param  {} host
 * @param  {} token
 * @param  {} reason
 * @param  {} email
 */
async function activate(projectId, host, token, reason, email) {
    try {
        console.log(`Activate called for token: ${token} for email: ${email}`);
        const procurementUtil = new CommerceProcurementUtil(projectId);
        const registration = await register(host, token);
        console.log(`registration: ${JSON.stringify(registration)}`);
        if (registration.success === true) {
            console.log('Registration success');
            const accountId = registration.data.payload.sub;
            const accountName = procurementUtil.getAccountName(projectId, accountId);
            const accountRecord = { accountName: accountName };
            console.log(`accountName: ${accountName}`);

            // Must approve the account first, before approving the entitlement.
            const approval = await procurementUtil.approveAccount(accountName, approvalName, reason);
            let newPolicies = [];

            try {
                // Create filter for the list entitlements request, filtering on the current user procurement account id
                // where the entitlement is in pending state = 'ENTITLEMENT_ACTIVATION_REQUESTED'
                let accountFilter = `account=${accountId}`;
                const filterString = `state=ENTITLEMENT_ACTIVATION_REQUESTED AND (${accountFilter})`;
                const result = await procurementUtil.listEntitlements(filterString);
                if (result) {
                    let entitlements = result.entitlements || [];
                    if (entitlements && entitlements.length > 0) {
                        const policyManager = require('../policies/dataManager');
                        for (const entitlement of entitlements) {
                            const entitlementName = entitlement.name;
                            const product = entitlement.product;
                            const plan = entitlement.plan;
                            console.log(`${entitlementName} is pending activation for product: ${product} and plan: ${plan}`);

                            // Check the policy table to see if there is a policy object matching the marketplace product and plan
                            const policy = await policyManager.findMarketplacePolicy(projectId, product, plan);
                            console.log(`Found policy ${JSON.stringify(policy, null, 3)}`);
                            if (policy && policy.marketplace) {
                                const enableAutoApprove = policy.marketplace.enableAutoApprove;

                                // If enableAutoApprove is set to true, approve the entitlement via the procurement api
                                if (enableAutoApprove === true) {
                                    await procurementUtil.approveEntitlement(entitlementName);

                                    // Append the policyId to the new list of policies to add to the Datashare user account
                                    console.log(`Appending policyId to new list: ${policy.policyId}`);
                                    newPolicies.push(policy.policyId);
                                }
                            }
                        }
                    }
                }
            } catch (err) {
                console.error(`Failed to auto approve entitlement(s) for user: ${err}`);
            }

            // Insert the account records
            let account = await getAccount(projectId, null, email, 'user');
            if (account) {
                if (account.policies) {
                    account.policies = account.policies.map(e => e.policyId);
                }
                if (account.marketplace) {
                    const found = underscore.findWhere(account.marketplace, accountRecord);
                    if (!found) {
                        account.marketplace.push(accountRecord);
                    }
                } else {
                    account.marketplace = [accountRecord];
                }
                account.createdBy = email;
            } else {
                // Create the account
                account = {
                    email: email,
                    emailType: 'user',
                    createdBy: email,
                    marketplace: [accountRecord]
                };
            }

            if (newPolicies.length > 0) {
                // Initialize policies array if necessary
                if (!account.policies) {
                    console.log(`Initializing policies array`);
                    account.policies = [];
                }

                newPolicies.forEach(p => {
                    const found = account.policies.includes(p);
                    if (!found) {
                        account.policies.push(p);
                        console.log(`Added policy: ${p}`);
                    } else {
                        console.log(`Policy already in array: ${p}`);
                    }
                });
            }

            // This will create or update the account. At this point no new policies will be associated.
            await createOrUpdateAccount(projectId, null, account);

            return { success: true, code: 200, data: approval };
        }
    } catch (err) {
        console.error(err);
        return { success: false, code: 500, errors: ['Failed to approve account'] };
    }
}

/**
 * @param  {} projectId
 * @param  {} accountId
 */
async function reset(projectId, accountId) {
    try {
        console.log(`Reset called for accountId: ${accountId}`);
        let account = await getAccount(projectId, accountId, 'user');
        if (account) {
            if (account.policies) {
                // Reformat policies for saving.
                // TODO: Re-factor so this isn't a mess
                account.policies = account.policies.map(e => e.policyId);
            }
            if (account.marketplace && account.marketplace.length > 0) {
                const accountNames = account.marketplace.map(e => e.accountName);
                // Clear the associated accountNames
                account.marketplace = [];
                const procurementUtil = new CommerceProcurementUtil(projectId);
                for (const name of accountNames) {
                    console.log(`Resetting account for name: ${name}`);
                    await procurementUtil.resetAccount(name);
                }
                // Save the updated account record
                await createOrUpdateAccount(projectId, null, account);
            }
        }
        return { success: true, code: 200 };
    } catch (err) {
        console.error(err);
        return { success: false, code: 500, errors: ['Failed to reset account(s)'] };
    }
}

module.exports = {
    listAccounts,
    createOrUpdateAccount,
    deleteAccount,
    getAccount,
    register,
    activate,
    reset,
    findMarketplaceAccount
};
