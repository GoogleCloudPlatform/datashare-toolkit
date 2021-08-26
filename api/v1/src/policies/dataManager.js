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
const metaManager = require('../lib/metaManager');

/**
 * @param  {string} projectId
 * @param  {object} fields
 * @param  {object} values
 * @param  {object} data
 * Insert policy data
 */
async function _insertData(projectId, fields, values, data) {
    const bigqueryUtil = new BigQueryUtil(projectId);
    return bigqueryUtil.insertRows(cfg.cdsDatasetId, cfg.cdsPolicyTableId, data);
}

/**
 * @param  {} projectId
 * @param  {} fields
 * @param  {} values
 * @param  {} data
 */
async function _deleteData(projectId, fields, values, data) {
    const bigqueryUtil = new BigQueryUtil(projectId);
    const table = bigqueryUtil.getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsPolicyTableId);
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
 * @param  {} projectId
 * @param  {} email
 */
async function listUserPolicies(projectId, email) {
    try {
        const bigqueryUtil = new BigQueryUtil(projectId);
        const table = bigqueryUtil.getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsPolicyViewId);
        let fields = new Set(cfg.cdsPolicyViewFields);
        fields.delete('isDeleted');
        fields = Array.from(fields).map(i => 'cp.' + i).join();
        const accountTable = bigqueryUtil.getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsAccountViewId);
        let sqlQuery = `WITH currentAccount AS (
    SELECT policies.policyId
    FROM \`${accountTable}\` ca
    CROSS JOIN UNNEST(policies) policies
    WHERE lower(email) = @email AND
        (ca.isDeleted IS FALSE OR ca.isDeleted IS NULL)
)
SELECT
    bigQueryEnabled,
    storageEnabled,
    pubsubEnabled,
    CASE WHEN bigQueryEnabled IS TRUE THEN datasets ELSE NULL END as datasets,
    CASE WHEN bigQueryEnabled IS TRUE THEN rowAccessTags ELSE NULL END as rowAccessTags,
    CASE WHEN bigQueryEnabled IS TRUE THEN isTableBased ELSE NULL END as isTableBased,
    CASE WHEN storageEnabled IS TRUE THEN buckets ELSE NULL END as buckets,
    CASE WHEN pubsubEnabled IS TRUE THEN topics ELSE NULL END as topics,
    marketplace
FROM \`${table}\` cp
JOIN currentAccount ca ON ca.policyId = cp.policyId
WHERE
    (cp.marketplace IS NOT NULL AND cp.marketplace.solutionId IS NOT NULL AND cp.marketplace.planId IS NOT NULL)
    AND (cp.isDeleted IS FALSE OR cp.isDeleted IS NULL)`;
        let options = {
            query: sqlQuery,
            params: { email: email.toLowerCase() }
        };
        const [rows] = await bigqueryUtil.executeQuery(options);

        rows.forEach(e => {
            e.status = 'Active';
        });

        const accountManager = require('../accounts/dataManager');
        const account = await accountManager.getAccount(projectId, null, email, 'user');
        if (account) {
            const accountNames = account.marketplace.map(e => e.accountName);
            if (accountNames && accountNames.length > 0) {
                const procurementUtil = new CommerceProcurementUtil(projectId);
                let accountFilter = '';
                accountNames.forEach(e => {
                    if (accountFilter != '') {
                        accountFilter += ' OR ';
                    }
                    const name = e.substring(e.lastIndexOf('/') + 1);
                    accountFilter += `account=${name}`;
                });

                const filterString = `state=ENTITLEMENT_ACTIVATION_REQUESTED AND (${accountFilter})`;
                const result = await procurementUtil.listEntitlements(filterString);
                if (result) {
                    let entitlements = result.entitlements || [];
                    if (entitlements && entitlements.length > 0) {
                        entitlements.forEach(e => {
                            const name = e.name.substring(e.name.lastIndexOf('/') + 1);
                            rows.push({ marketplace: { solutionId: e.product, planId: e.plan, name: name, message: e.messageToUser }, status: 'Pending Approval' });
                        });
                    }
                }
            }
        }

        return { success: true, data: rows };
    } catch (err) {
        console.error(err);
        return { success: false, code: 500, errors: ['Unable to retrieve user products'] };
    }
}

/**
 * @param  {string} projectId
 * @param  {string} datasetId
 * @param  {string} accountId
 * Get a list of Policies
 */
async function listPolicies(projectId, datasetId, accountId) {
    const bigqueryUtil = new BigQueryUtil(projectId);
    const table = bigqueryUtil.getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsPolicyViewId);
    const fields = Array.from(cfg.cdsPolicyViewFields).join();
    let sqlQuery = `with accountCounts AS (
        select p.policyId, count(ca.accountId) as count
        from \`${projectId}.datashare.currentAccount\` ca
        cross join unnest(policies) p
        where ca.isDeleted is false
        group by p.policyId
      )
    SELECT rowId, cp.policyId, name, description, createdAt, createdBy, version, ifnull(ac.count, 0) as accountCount, marketplace
    FROM \`${projectId}.datashare.currentPolicy\` cp
    left join accountCounts ac on ac.policyId = cp.policyId
    where cp.isDeleted is false;`;
    let options = {
        query: sqlQuery
    };
    if (datasetId) {
        sqlQuery = `SELECT ${fields} FROM \`${table}\`, UNNEST(datasets) AS datasets WHERE datasets.datasetId = @datasetId;`
        options = {
            query: sqlQuery,
            params: { datasetId: datasetId }
        };
    } else if (accountId) {
        let fields = new Set(cfg.cdsPolicyViewFields);
        fields.delete('isDeleted');
        fields = Array.from(fields).map(i => 'cp.' + i).join();
        const accountTable = bigqueryUtil.getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsAccountViewId);
        sqlQuery = `WITH currentAccount AS (
            SELECT policies.policyId
            FROM \`${accountTable}\` ca
            CROSS JOIN UNNEST(policies) policies
            WHERE accountId = @accountId AND
                (ca.isDeleted IS false OR ca.isDeleted IS null)
          )
        SELECT ${fields}
        FROM \`${table}\` cp
        LEFT JOIN currentAccount ca ON ca.policyId = cp.policyId
        WHERE (cp.isDeleted IS false OR cp.isDeleted IS null)`;
        options = {
            query: sqlQuery,
            params: { accountId: accountId }
        };
    }

    try {
        const [rows] = await bigqueryUtil.executeQuery(options);
        return { success: true, data: rows };
    } catch (err) {
        const message = `Policies do not exist within table: '${table}'`;
        return { success: false, code: 400, errors: [message] };
    }
}

/**
 * @param  {string} projectId
 * @param  {string} policyId
 * @param  {object} data
 * Create a Policy based off data values
 */
async function createOrUpdatePolicy(projectId, policyId, data) {
    console.log(`createOrUpdateAccount called with policyId: ${policyId} and data: ${JSON.stringify(data)}`);
    let _policyId = policyId;
    if (policyId) {
        const currentPolicy = await getPolicy(projectId, policyId);
        console.log(`currentPolicy response: ${JSON.stringify(currentPolicy)}`);
        if (currentPolicy.success) {
            if (currentPolicy && currentPolicy.data.rowId !== data.rowId) {
                // If user is updating an existing record, compare the rowId to ensure they're making updates from the latest record.
                return { success: false, code: 500, errors: ["STALE"] };
            }
            _policyId = currentPolicy.data.policyId;
        }
    }

    if (!_policyId) {
        _policyId = uuidv4();
    }

    if (data.marketplace && data.marketplace.solutionId && data.marketplace.planId) {
        const isMarketplaceUnique = await isMarketplaceSolutionPlanUnique(projectId, policyId, data.marketplace.solutionId, data.marketplace.planId);
        if (isMarketplaceUnique === false) {
            const message = `Marketplace solutionId or planId is already defined. The combination of a solutionId and planId must be unique across all policies.`;
            return { success: false, code: 500, errors: [message] };
        }
    }

    const rowId = uuidv4();
    const isDeleted = false;
    const createdAt = new Date().toISOString();

    let fields = [...cfg.cdsPolicyTableFields], values = [...cfg.cdsPolicyTableFields];

    // reformat datasets object for saving
    let datasets = data.datasets;
    if (datasets.length === 0) {
        // If there are no supplied datasets, remove datasets column field and value from insert statement.
        delete data.datasets;
        const index = fields.indexOf('datasets');
        if (index > -1) {
            fields.splice(index, 1);
            values.splice(index, 1);
        }
    }

    // reformat buckets object for saving
    let buckets = data.buckets;
    if (buckets.length === 0) {
        // If there are no supplied buckets, remove buckets column field and value from insert statement.
        delete data.buckets;
        const index = fields.indexOf('buckets');
        if (index > -1) {
            fields.splice(index, 1);
            values.splice(index, 1);
        }
    }

    // reformat topics object for saving
    let topics = data.topics;
    if (topics.length === 0) {
        // If there are no supplied topics, remove topics column field and value from insert statement.
        delete data.topics;
        const index = fields.indexOf('topics');
        if (index > -1) {
            fields.splice(index, 1);
            values.splice(index, 1);
        }
    }

    // reformat rowAccessTags object for saving
    let rowAccessTags = data.rowAccessTags;
    if (rowAccessTags.length === 0) {
        // If there are no supplied rowAccessTags, remove rowAccessTags column field and value from insert statement.
        delete data.rowAccessTags;
        const index = fields.indexOf('rowAccessTags');
        if (index > -1) {
            fields.splice(index, 1);
            values.splice(index, 1);
        }
    } else {
        data.rowAccessTags = rowAccessTags.map(t => { return { tag: t }; })
    }

    if (!(data.marketplace && data.marketplace.solutionId && data.marketplace.planId)) {
        delete data.marketplace;
        const index = fields.indexOf('marketplace');
        if (index > -1) {
            fields.splice(index, 1);
            values.splice(index, 1);
        }
    }

    fields = Array.from(fields).join();
    values = Array.from(values).map(i => '@' + i).join();

    data = {
        ...data,
        ...{
            rowId: rowId,
            policyId: _policyId,
            isDeleted: isDeleted,
            createdAt: createdAt
        }
    };
    console.log(data);
    const result = await _insertData(projectId, fields, values, data);
    if (result) {
        try {
            await metaManager.performPolicyUpdates(projectId, [_policyId]);
        } catch (err) {
            return { success: false, code: 500, errors: [err.message] };
        }
        return { success: true, data: data };
    } else {
        const message = `Policy did not create with data values: '${data}'`;
        return { success: false, code: 500, errors: [message] };
    }
}

/**
 * @param  {string} projectId
 * @param  {string} policyId
 * Get a Policy based off projectId and policyId
 */
async function getPolicy(projectId, policyId) {
    const bigqueryUtil = new BigQueryUtil(projectId);
    const table = bigqueryUtil.getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsPolicyViewId);
    const fields = Array.from(cfg.cdsPolicyViewFields).join();
    const limit = 2;
    const sqlQuery = `SELECT ${fields} FROM \`${table}\` WHERE policyId = @policyId AND isDeleted IS false LIMIT ${limit};`
    const options = {
        query: sqlQuery,
        params: { policyId: policyId }
    };
    try {
        const [rows] = await bigqueryUtil.executeQuery(options);
        if (rows.length === 1) {
            return { success: true, data: rows[0] };
        } else {
            const message = `Policies do not exist with in table: '${table}'`;
            return { success: false, code: 400, errors: [message] };
        }
    } catch (err) {
        return { success: false, code: 500, errors: [err.message] };
    }
}

/**
 * @param  {} projectId
 * @param  {} solutionId
 * @param  {} planId
 */
async function findMarketplacePolicy(projectId, solutionId, planId) {
    const bigqueryUtil = new BigQueryUtil(projectId);
    const table = bigqueryUtil.getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsPolicyViewId);
    const fields = Array.from(cfg.cdsPolicyViewFields).join();
    const limit = 2;
    const sqlQuery = `SELECT ${fields}
FROM \`${table}\`
WHERE
    marketplace IS NOT NULL AND marketplace.solutionId = @solutionId AND marketplace.planId = @planId
    AND isDeleted IS false
LIMIT ${limit};`
    const options = {
        query: sqlQuery,
        params: { solutionId: solutionId, planId: planId }
    };

    try {
        const [rows] = await bigqueryUtil.executeQuery(options);
        if (rows.length === 1) {
            return rows[0];
        } else {
            const message = `Policy for solution: '${solutionId}' and plan: '${planId}' does not exist within table: '${table}'`;
            console.warn(message);
        }
    } catch (err) {
        console.error(`Error in findMarketplacePolicy when searching for solution: '${solutionId}' and plan: '${planId}': ${err.message}`);
    }
}

/**
 * @param  {} projectId
 * @param  {} policyId
 * @param  {} solutionId
 * @param  {} planId
 */
async function isMarketplaceSolutionPlanUnique(projectId, policyId, solutionId, planId) {
    const bigqueryUtil = new BigQueryUtil(projectId);
    const table = bigqueryUtil.getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsPolicyViewId);
    const sqlQuery = `SELECT
    COUNT(policyId) as count
FROM \`${table}\`
WHERE
    isDeleted IS FALSE
    AND policyId != @policyId
    AND marketplace IS NOT NULL and lower(marketplace.solutionId) = lower(@solutionId)
    AND lower(marketplace.planId) = lower(@planId);`

    let options = {
        query: sqlQuery,
        params: { policyId: policyId !== null ? policyId : '', solutionId: solutionId, planId: planId }
    };

    try {
        const [rows] = await bigqueryUtil.executeQuery(options);
        if (rows[0].count === 0) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.warn(err);
        return false;
    }
}

/**
 * @param  {string} projectId
 * @param  {string} policyId
 * @param  {object} data
 * Updated a Policy based off policyId and data values
 */
async function deletePolicy(projectId, policyId, data) {
    const currentPolicy = await getPolicy(projectId, policyId);
    if (!currentPolicy.success) {
        return { success: false, code: 404, errors: ["PolicyId not found"] };
    }
    if (currentPolicy.success && currentPolicy.data.rowId !== data.rowId) {
        return { success: false, code: 500, errors: ["STALE"] };
    }

    let fields = [...cfg.cdsPolicyTableFields];
    let values = ['@rowId', 'policyId', 'name', 'description', 'isTableBased', 'datasets', 'rowAccessTags', 'marketplace', '@createdBy', 'current_timestamp()', 'true'];
    fields = Array.from(fields).join();
    values = Array.from(values).join();

    const rowId = uuidv4();
    let params = { rowId: rowId, createdBy: data.createdBy, incomingRowId: data.rowId };
    await _deleteData(projectId, fields, values, params);

    try {
        await metaManager.performPolicyUpdates(projectId, [policyId]);
    } catch (err) {
        return { success: false, code: 500, errors: [err.message] };
    }
    return { success: true, data: {} };
}

module.exports = {
    listPolicies,
    createOrUpdatePolicy,
    deletePolicy,
    getPolicy,
    listUserPolicies,
    findMarketplacePolicy
};
