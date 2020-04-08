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

const { BigQueryUtil } = require('cds-shared');
let bigqueryUtil = new BigQueryUtil();
const uuidv4 = require('uuid/v4');

const cfg = require('../lib/config');
const metaManager = require('../lib/metaManager');

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
 * Insert policy data
 */
async function _insertData(projectId, fields, values, data) {
    const table = getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsPolicyTableId);
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
    const table = getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsPolicyTableId);
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
 * @param  {string} datasetId
 * @param  {string} accountId
 * Get a list of Policies
 */
async function listPolicies(projectId, datasetId, accountId) {
    const table = getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsPolicyViewId);
    const fields = Array.from(cfg.cdsPolicyViewFields).join();
    const limit = 10;
    let sqlQuery = `with accountCounts AS (
        select p.policyId, count(ca.accountId) as count
        from \`${projectId}.datashare.currentAccount\` ca
        cross join unnest(policies) p
        where ca.isDeleted is false
        group by p.policyId
      )
    SELECT rowId, cp.policyId, name, description, createdAt, createdBy, version, ifnull(ac.count, 0) as accountCount
    FROM \`${projectId}.datashare.currentPolicy\` cp
    left join accountCounts ac on ac.policyId = cp.policyId
    where cp.isDeleted is false;`;
    let options = {
        query: sqlQuery
    };
    if (datasetId) {
        sqlQuery = `SELECT ${fields} FROM \`${table}\`, UNNEST(datasets) AS datasets WHERE datasets.datasetId = @datasetId LIMIT ${limit};`
        options = {
            query: sqlQuery,
            params: { datasetId: datasetId }
        };
    } else if (accountId) {
        let fields = new Set(cfg.cdsPolicyViewFields);
        fields.delete('isDeleted');
        fields = Array.from(fields).map(i => 'cp.' + i).join();
        const accountTable = getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsAccountViewId);
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
    const [rows] = await bigqueryUtil.executeQuery(options);
    return { success: true, data: rows };
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
    let previousDatasetIds = [];
    if (policyId) {
        const currentPolicy = await getPolicy(projectId, policyId);
        console.log(`currentPolicy response: ${JSON.stringify(currentPolicy)}`);
        if (currentPolicy.success) {
            if (currentPolicy && currentPolicy.data.rowId !== data.rowId) {
                // If user is updating an existing record, compare the rowId to ensure they're making updates from the latest record.
                return { success: false, code: 500, errors: ["STALE"] };
            }
            previousDatasetIds = currentPolicy.data.datasets.map(p => p.datasetId);
            _policyId = currentPolicy.data.policyId;
        }
    }
    
    if (!_policyId) {
        _policyId = uuidv4();
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
    } else {
        data.datasets = datasets.map(d => { return { datasetId: d }; })
    }

    // reformat datasets object for saving
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
    const [rows] = await _insertData(projectId, fields, values, data);
    if (rows.length === 0) {
        try {
            await metaManager.performMetadataUpdate(projectId, [_policyId], previousDatasetIds);
        } catch (err) {
            return { success: false, code: 500, errors: [err.message] };
        }
        // Retrieving the record after insert makes another round-trip and is not
        // efficient. For now, just return the original data.
        // return await getPolicy(projectId, accountId);
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
    const table = getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsPolicyViewId);
    const fields = Array.from(cfg.cdsPolicyViewFields).join();
    const limit = 1;
    const sqlQuery = `SELECT ${fields} FROM \`${table}\` WHERE policyId = @policyId AND isDeleted is false LIMIT ${limit};`
    const options = {
        query: sqlQuery,
        params: { policyId: policyId }
    };
    const [rows] = await bigqueryUtil.executeQuery(options);
    if (rows.length === 1) {
        return { success: true, data: rows[0] };
    } else {
        const message = `Policies do not exist with in table: '${table}'`;
        return { success: false, code: 400, errors: [message] };
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

    let fields =[...cfg.cdsPolicyTableFields];
    let values = ['@rowId', 'policyId', 'name', 'description', 'datasets', 'rowAccessTags', '@createdBy', 'current_timestamp()', 'true'];
    fields = Array.from(fields).join();
    values = Array.from(values).join();

    const rowId = uuidv4();
    let params = { rowId: rowId, createdBy: data.createdBy, incomingRowId: data.rowId };
    await _deleteData(projectId, fields, values, params);

    try {
        await metaManager.performMetadataUpdate(projectId, [policyId]);
    } catch (err) {
        return { success: false, code: 500, errors: [err.message] };
    }
    return { success: true, data: {} };
}

module.exports = {
    listPolicies,
    createOrUpdatePolicy,
    deletePolicy,
    getPolicy
};
