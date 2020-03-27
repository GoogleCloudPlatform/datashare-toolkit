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

const { BigQueryUtil } = require('bqds-shared');
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
 * @param  {string} projectId
 * @param  {datasetId} datasetId
 * @param  {policyId} policyId
 * Get a list of Accounts
 */
async function listAccounts(projectId, datasetId, policyId) {
    const table = getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsAccountViewId);
    let fields = cfg.cdsAccountViewFields;
    fields.delete('isDeleted');
    fields = Array.from(fields).join();
    const limit = 10;
    let sqlQuery = `SELECT ca.* except(policies),
        array(
            select as struct pm.policyId, pm.name
            from unnest(ca.policies) p
            join \`${projectId}.datashare.currentPolicy\` pm on p.policyId = pm.policyId
            where pm.isDeleted is false
           ) as policies
        FROM \`${projectId}.datashare.currentAccount\` ca
        where ca.isDeleted is false;`
    let options = {
        query: sqlQuery
    };
    if (datasetId) {
        let fields = cfg.cdsAccountViewFields;
        fields.delete('isDeleted');
        fields.delete('policies');
        fields = Array.from(fields).map(i => 'up.' + i).join();
        const policyTable = getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsPolicyViewId);
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
        sqlQuery = `SELECT ${fields} FROM \`${table}\`, UNNEST(policies) AS policies WHERE policies.policyId = @policyId LIMIT ${limit};`
        options = {
            query: sqlQuery,
            params: { policyId: policyId }
        };
    }
    const [rows] = await bigqueryUtil.executeQuery(options);
    if (rows.length >= 1) {
        return { success: true, data: rows };
    } else {
        const message = `Account(s) do not exist with in table/view: '${table}'`;
        return { success: false, code: 400, errors: [message] };
    }
}

/**
 * @param  {string} projectId
 * @param  {object} data
 * Create a Account based off data values
 */
async function createAccount(projectId, data) {
    let fields = cfg.cdsAccountTableFields, values = cfg.cdsAccountTableFields;
    fields = Array.from(fields).join();
    values = Array.from(values).map(i => '@' + i).join();

    const rowId = uuidv4();
    const isDeleted = false;
    const accountId = uuidv4();
    const createdAt = new Date().toISOString();
    // merge the data and extra values together
    data = {
        ...data,
        ...{ 
            rowId: rowId,
            accountId: accountId,
            isDeleted: isDeleted,
            createdAt: createdAt,
            accountType: 'consumer'
        }
    };
    console.log(data);
    const [rows] = await _insertData(projectId, fields, values, data);
    if (rows.length === 0) {
        try {
            await metaManager.performMetadataUpdate(projectId, data.policies);
        } catch (err) {
            return { success: false, code: 500, errors: [err.message] };
        }
        // Retrieving the record after insert makes another round-trip and is not
        // efficient. For now, just return the original data.
        //return await getAccount(projectId, accountId);
        return { success: true, data: data };
    } else {
        const message = `Account did not create with data values: '${data}'`;
        return { success: false, code: 500, errors: [message] };
    }
}

/**
 * @param  {string} projectId
 * @param  {object} data
 * Updated a Account based off accountId and data values
 */
async function updateAccount(projectId, accountId, data) {
    let fields = cfg.cdsAccountTableFields, values = cfg.cdsAccountTableFields;
    fields = Array.from(fields).join();
    values = Array.from(values).map(i => '@' + i).join();

    const rowId = uuidv4();
    const isDeleted = false;
    const createdAt = new Date().toISOString();
    // merge the data and extra values together
    data = {
        ...data,
        ...{
            rowId: rowId,
            accountId: accountId,
            isDeleted: isDeleted,
            createdAt: createdAt
        }
    };
    console.log(data);
    const [rows] = await _insertData(projectId, fields, values, data);
    if (rows.length === 0) {
        try {
            await metaManager.performMetadataUpdate(projectId, data.policies);
        } catch (err) {
            return { success: false, code: 500, errors: [err.message] };
        }
        // Retrieving the record after insert makes another round-trip and is not
        // efficient. For now, just return the original data.
        //return await getAccount(projectId, accountId);
        return { success: true, data: data };
    } else {
        const message = `Account did not update with data values: '${data}'`;
        return { success: false, code: 500, errors: [message] };
    }
}

/**
 * @param  {string} projectId
 * @param  {string} accountId
 * Get a Account based off projectId and accountId
 */
async function getAccount(projectId, accountId) {
    const table = getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsAccountViewId);
    const fields = Array.from(cfg.cdsAccountViewFields).join();
    const limit = 1;
    const sqlQuery = `SELECT ${fields} FROM \`${table}\` WHERE accountId = @accountId LIMIT ${limit};`
    const options = {
        query: sqlQuery,
        params: { accountId: accountId }
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
    if (currentAccount.success && currentAccount.data.rowId !== data.rowId) {
        return { success: false, code: 500, errors: ["STALE"] };
    }
    console.log(`Deleting account with uuid: ${data.rowId}`);
    const rowId = uuidv4();
    const sqlQuery = `insert into \`${projectId}.datashare.account\` (rowId, email, emailType, accountType, createdBy, createdAt, accountId, policies, isDeleted)
    select @rowId, email, emailType, accountType, @createdBy, current_timestamp(), accountId, policies, true
    from \`${projectId}.datashare.account\`
    where rowId = @incomingRowId`
    const options = {
        query: sqlQuery,
        params: { rowId: rowId, createdBy: data.createdBy, incomingRowId: data.rowId }
    };
    const [rows] = await bigqueryUtil.executeQuery(options);
    console.log(`Delete account result: ${JSON.stringify(rows, null, 3)}`);

    const policyQuery = `SELECT p.policyId
    FROM \`${projectId}.datashare.account\` a
    cross join unnest(policies) p
    where a.rowId = @rowId`;
    const policyOptions = {
        query: policyQuery,
        params: { rowId: data.rowId }
    };
    const [policies] = await bigqueryUtil.executeQuery(policyOptions);
    console.log(`Get policy id's requiring refresh result ${JSON.stringify(policies, null, 3)}`);

    let policyIds = [];
    policies.forEach(p => {
        policyIds.push(p.policyId);
    })
    if (policyIds.length > 0) {
        try {
            await metaManager.performMetadataUpdate(projectId, policyIds);
        } catch (err) {
            return { success: false, code: 500, errors: [err.message] };
        }
        return { success: true, data: {} };
    } else {
        const message = `Account did not delete with data values: '${data}'`;
        return { success: false, code: 500, errors: [message] };
    }
}

module.exports = {
    listAccounts,
    createAccount,
    updateAccount,
    deleteAccount,
    getAccount
};
