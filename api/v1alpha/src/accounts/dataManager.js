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

const labelName = "cds";
const cdsDatasetId = "datashare";
const cdsAccountViewId = "currentAccount";
const cdsAccountTableId = "account";
const cdsAccountTableFields = new Set(['rowId', 'accountId', 'email', 'emailType',
    'accountType', 'policies', 'createdAt', 'createdBy', 'isDeleted']);
const cdsAccountViewFields = new Set(['rowId', 'accountId', 'email', 'emailType',
    'accountType', 'policies', 'modifiedAt', 'modifiedBy', 'version', 'isDeleted']);

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
    const table = getTableFqdn(projectId, cdsDatasetId, cdsAccountTableId);
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
 * @param  {policyId} policyId
 * Get a list of Accounts
 */
async function listAccounts(projectId, policyId) {
    const table = getTableFqdn(projectId, cdsDatasetId, cdsAccountViewId);
    const fields = Array.from(cdsAccountViewFields).join();
    const limit = 10;
    let sqlQuery = `SELECT ${fields} FROM \`${table}\` LIMIT ${limit};`
    let options = {
        query: sqlQuery
    };
    if (policyId) {
        sqlQuery = `SELECT ${fields} FROM \`${table}\`, UNNEST(policies) AS policies WHERE policies.policyId = @policyId LIMIT ${limit};`
        options = {
            query: sqlQuery,
            params: { policyId: policyId }
        };
    };
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
    let fields = cdsAccountTableFields, values = cdsAccountTableFields;
    fields.delete('isDeleted');
    fields = Array.from(fields).join();
    values.delete('isDeleted');
    values = Array.from(values).map(i => '@' + i).join();

    const rowId = uuidv4();
    const accountId = uuidv4();
    const createdAt = new Date().toISOString();
    // merge the data and extra values together
    data = {...data,
        ...{
            rowId: rowId,
            accountId: accountId,
            createdAt: createdAt
        }
    };
    console.log(data);
    const [rows] = await _insertData(projectId, fields, values, data);
    if (rows.length === 0) {
        // Retrieving the record after insert makes another round-trip and is not
        // efficient. For now, just return the original data.
        //return await getAccount(projectId, accountId);
        return { success: true, data: data };
    } else {
        const message = `Account did not create with data values: '${data}'`;
        return { success: false, code: 500, errors: [message] };
    };
}

/**
 * @param  {string} projectId
 * @param  {object} data
 * Updated a Account based off accountId and data values
 */
async function updateAccount(projectId, accountId, data) {
    let fields = cdsAccountTableFields, values = cdsAccountTableFields;
    fields.delete('isDeleted');
    fields = Array.from(fields).join();
    values.delete('isDeleted');
    values = Array.from(values).map(i => '@' + i).join();

    const rowId = uuidv4();
    const createdAt = new Date().toISOString();
    // merge the data and extra values together
    data = {...data,
        ...{
            rowId: rowId,
            accountId: accountId,
            createdAt: createdAt
        }
    };
    console.log(data);
    const [rows] = await _insertData(projectId, fields, values, data);
    if (rows.length === 0) {
        // Retrieving the record after insert makes another round-trip and is not
        // efficient. For now, just return the original data.
        //return await getAccount(projectId, accountId);
        return { success: true, data: data };
    } else {
        const message = `Account did not update with data values: '${data}'`;
        return { success: false, code: 500, errors: [message] };
    };
}

/**
 * @param  {string} projectId
 * @param  {string} accountId
 * Get a Account based off projectId and accountId
 */
async function getAccount(projectId, accountId) {
    const table = getTableFqdn(projectId, cdsDatasetId, cdsAccountViewId);
    const fields = Array.from(cdsAccountViewFields).join();
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
    let fields = cdsAccountTableFields, values = cdsAccountTableFields;
    fields = Array.from(fields).join();
    values = Array.from(values).map(i => '@' + i).join();

    const rowId = uuidv4();
    const isDeleted = true;
    const createdAt = new Date().toISOString();
    // merge the data and extra values together
    data = {...data,
        ...{
            rowId: rowId,
            accountId: accountId,
            createdAt: createdAt,
            isDeleted: isDeleted
        }
    };
    console.log(data);
    const [rows] = await _insertData(projectId, fields, values, data);
    if (rows.length === 0) {
        return { success: true, data: {} };
    } else {
        const message = `Account did not delete with data values: '${data}'`;
        return { success: false, code: 500, errors: [message] };
    };
}

module.exports = {
    listAccounts,
    createAccount,
    updateAccount,
    deleteAccount,
    getAccount
};
