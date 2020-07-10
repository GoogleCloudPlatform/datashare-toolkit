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
const uuidv4 = require('uuid/v4');

const cfg = require('../lib/config');
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
 * @param  {string} datasetId
 * @param  {string} tableId
 * Get the FQDN format for a project's table or view name
 */
function getTableFqdn(projectId, datasetId, tableId) {
    return `${projectId}.${datasetId}.${tableId}`;
}

/**
 * @param  {string} projectId
 * @param  {object} fields
 * @param  {object} values
 * @param  {object} data
 * Insert account data
 */
async function _insertData(projectId, fields, values, data) {
    const table = getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsAccountTableId);
    const sqlQuery = `INSERT INTO \`${table}\` (${fields}) VALUES (${values})`;
    console.log(sqlQuery);
    const options = {
        query: sqlQuery,
        params: data
    };
    const bigqueryUtil = new BigQueryUtil(projectId);
    return await bigqueryUtil.executeQuery(options);
}

/**
 * @param  {} projectId
 * @param  {} fields
 * @param  {} values
 * @param  {} data
 */
async function _deleteData(projectId, fields, values, data) {
    const table = getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsAccountTableId);
    const sqlQuery = `INSERT INTO \`${table}\` (${fields})
        SELECT ${values}
        FROM \`${table}\`
        WHERE rowId = @incomingRowId`;

    console.log(sqlQuery);
    const options = {
        query: sqlQuery,
        params: data
    };
    const bigqueryUtil = new BigQueryUtil(projectId);
    return await bigqueryUtil.executeQuery(options);
}

/**
 * @param  {string} projectId
 * @param  {datasetId} datasetId
 * @param  {policyId} policyId
 * Get a list of Accounts
 */
async function listAccounts(projectId, datasetId, policyId) {
    const table = getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsAccountViewId);
    const policyTable = getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsPolicyViewId);
    const limit = 10;
    let sqlQuery = `SELECT ca.* except(policies),
        array(
            select as struct pm.policyId, pm.name
            from unnest(ca.policies) p
            join \`${policyTable}\` pm on p.policyId = pm.policyId
            where pm.isDeleted is false
           ) as policies
        FROM \`${projectId}.datashare.currentAccount\` ca
        where ca.isDeleted is false;`
    let options = {
        query: sqlQuery
    };
    if (datasetId) {
        sqlQuery = `with policies as (
            select distinct
              cp.policyId,
              cp.name,
              d.datasetId
            FROM \`${policyTable}\` cp
            cross join unnest(cp.datasets) d
            where d.datasetId = @datasetId and cp.isDeleted is false
          ),
          userPolicies as (
            select
              ca.* EXCEPT(policies),
              cp.policyId,
              cp.name
            FROM \`${table}\` ca
            cross join unnest(ca.policies) as p
            join policies cp on p.policyId = cp.policyId
            where ca.isDeleted is false
          )
          select
            up.rowId,
            up.email,
            up.emailType,
            up.accountId,
            up.createdAt,
            up.createdBy,
            up.version,
            ARRAY_AGG(struct(policyId, name)) as policies
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
    const [rows] = await bigqueryUtil.executeQuery(options);
    return { success: true, data: rows };
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
    // TODO: clean up format before passing from UI
    let policies = data.policies || [];
    if (policies && typeof policies[0] !== 'string') {
        data.policies = policies.map(p => { return p.policyId });
    }

    let impactedPolicies = data.policies ? Array.from(data.policies) : [];
    const currentAccount = await getAccount(projectId, accountId, data.email, data.emailType);
    console.log(`currentAccount response: ${JSON.stringify(currentAccount)}`);
    if (currentAccount.success) {
        // Update logic
        if (data.rowId && currentAccount.data.rowId !== data.rowId) {
            // If user is updating an existing record, compare the rowId to ensure they're making updates from the latest record.
            return { success: false, code: 500, errors: ["STALE"] };
        }
        else if (accountId) {
            // Only merge the existing policies if user is updating an existing row.
            // If user is re-instating a deleted record, ignore the old policies.
            impactedPolicies = underscore.union(impactedPolicies, currentAccount.data.policies.map(p => p.policyId));
        }
        // In case getAccount was found based on email and emailType from a previously deleted record.
        _accountId = currentAccount.data.accountId;
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
        data.policies = policies.map(p => { return { policyId: p }; });
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
        // Retrieving the record after insert makes another round-trip and is not
        // efficient. For now, just return the original data.
        // return await getAccount(projectId, accountId);
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
    const table = getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsAccountViewId);
    const fields = Array.from(cfg.cdsAccountViewFields).join();
    const limit = 1;
    let filter = 'WHERE accountId = @accountId AND isDeleted is false';
    let params = {};
    if (accountId) {
        // console.log(`getAccount performing lookup by accountId: ${accountId}`);
        params.accountId = accountId;
    }
    else if (email && emailType) {
        // console.log(`getAccount performing lookup by email and emailType: ${email}:${emailType}`);
        filter = 'WHERE email = @email AND emailType = @emailType'; // AND isDeleted is true
        params = { email: email, emailType: emailType };
    }

    const sqlQuery = `SELECT ${fields} FROM \`${table}\` ${filter} LIMIT ${limit};`
    const options = {
        query: sqlQuery,
        params: params
    };
    const [rows] = await bigqueryUtil.executeQuery(options);
    if (rows.length === 1) {
        return { success: true, data: rows[0] };
    } else {
        const message = `Accounts do not exist with in table: '${table}'`;
        return { success: false, code: 400, errors: [message] };
    }
}

/**
 * @param  {string} projectId
 * @param  {object} data
 * Updated a Account based off accountId and data values
 */
async function deleteAccount(projectId, accountId, data) {
    const currentAccount = await getAccount(projectId, accountId);
    if (!currentAccount.success) {
        return { success: false, code: 404, errors: ["AccountId not found"] };
    }
    if (currentAccount.success && currentAccount.data.rowId !== data.rowId) {
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
    currentAccount.data.policies.forEach(p => {
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
 * @param  {} projectId
 * @param  {} host
 * @param  {} token
 */
async function register(projectId, host, token) {
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
        const registration = await register(projectId, host, token);
        console.log(`registration: ${JSON.stringify(registration)}`);
        if (registration.success === true) {
            const accountId = registration.data.payload.sub;
            const accountName = procurementUtil.getAccountName(projectId, accountId);
            const accountRecord = { accountName: accountName };
            console.log(`accountName: ${accountName}`);

            // Insert the account records.
            let accountData;
            let account = await getAccount(projectId, null, email, 'userByEmail');
            if (account.success) {
                accountData = account.data;
                if (accountData.policies) {
                    accountData.policies = accountData.policies.map(e => e.policyId);
                }
                if (accountData.marketplace) {
                    const found = underscore.findWhere(accountData.marketplace, accountRecord);
                    if (!found) {
                        accountData.marketplace.push(accountRecord);
                    }
                } else {
                    accountData.marketplace = [accountRecord];
                }
            } else {
                // Create the account
                accountData = {
                    email: email,
                    emailType: 'userByEmail',
                    createdBy: email,
                    marketplace: [accountRecord]
                };
            }

            // This will create or update the account. At this point no new policies will be associated.
            await createOrUpdateAccount(projectId, null, accountData);

            const approval = await procurementUtil.approveAccount(accountName, approvalName, reason);
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
        let accountData;
        let account = await getAccount(projectId, accountId, 'userByEmail');
        if (account.success) {
            accountData = account.data;
            if (accountData.policies) {
                // Reformat policies for saving.
                // TODO: Re-factor so this isn't a mess
                accountData.policies = accountData.policies.map(e => e.policyId);
            }
            if (accountData.marketplace && accountData.marketplace.length > 0) {
                const accountNames = accountData.marketplace.map(e => e.accountName);
                // Clear the associated accountNames
                accountData.marketplace = [];
                const procurementUtil = new CommerceProcurementUtil(projectId);
                for (const name of accountNames) {
                    console.log(`Resetting account for name: ${name}`);
                    await procurementUtil.resetAccount(name);
                }
                // Save the updated account record
                await createOrUpdateAccount(projectId, null, accountData);
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
    reset
};
