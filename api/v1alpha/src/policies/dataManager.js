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
const cdsPolicyViewId = "currentPolicy";
const cdsPolicyTableId = "policy";
const cdsPolicyTableFields = new Set(['rowId', 'policyId', 'name', 'description',
    'createdAt', 'createdBy', 'datasets', 'rowAccessTags', 'isDeleted']);
const cdsPolicyViewFields = new Set(['rowId', 'policyId', 'name', 'description',
    'modifiedAt', 'modifiedBy', 'version', 'datasets', 'rowAccessTags',
    'isDeleted']);

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
 * Insert policy data
 */
async function _insertData(projectId, fields, values, data) {
    const table = getTableFqdn(projectId, cdsDatasetId, cdsPolicyTableId);
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
 * @param  {string} datasetId
 * Get a list of Policies
 */
async function listPolicies(projectId, datasetId) {
    const table = getTableFqdn(projectId, cdsDatasetId, cdsPolicyViewId);
    const fields = Array.from(cdsPolicyViewFields).join();
    const limit = 10;
    let sqlQuery = `SELECT ${fields} FROM \`${table}\` LIMIT ${limit};`
    let options = {
        query: sqlQuery
    };
    if (datasetId) {
        sqlQuery = `SELECT ${fields} FROM \`${table}\`, UNNEST(datasets) AS datasets WHERE datasets.datasetId = @datasetId LIMIT ${limit};`
        options = {
            query: sqlQuery,
            params: { datasetId: datasetId }
        };
    };
    const [rows] = await bigqueryUtil.executeQuery(options);
    if (rows.length >= 1) {
        return { success: true, data: rows };
    } else {
        const message = `Policies do not exist with in table/view: '${table}'`;
        return { success: false, code: 400, errors: [message] };
    }
}

/**
 * @param  {string} projectId
 * @param  {object} data
 * Create a Policy based off data values
 */
async function createPolicy(projectId, data) {
    let fields = cdsPolicyTableFields, values = cdsPolicyTableFields;
    fields.delete('isDeleted');
    fields = Array.from(fields).join();
    values.delete('isDeleted');
    values = Array.from(values).map(i => '@' + i).join();

    const rowId = uuidv4();
    const policyId = uuidv4();
    const createdAt = new Date().toISOString();
    // merge the data and extra values together
    data = {...data,
        ...{
            rowId: rowId,
            policyId: policyId,
            createdAt: createdAt
        }
    };
    console.log(data);
    const [rows] = await _insertData(projectId, fields, values, data);
    if (rows.length === 0) {
        // Retrieving the record after insert makes another round-trip and is not
        // efficient. For now, just return the original data.
        //return await getPolicy(projectId, policyId);
        return { success: true, data: data };
    } else {
        const message = `Policy did not create with data values: '${data}'`;
        return { success: false, code: 500, errors: [message] };
    };
}

/**
 * @param  {string} projectId
 * @param  {object} data
 * Updated a Policy based off policyId and data values
 */
async function updatePolicy(projectId, policyId, data) {
    let fields = cdsPolicyTableFields, values = cdsPolicyTableFields;
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
            policyId: policyId,
            createdAt: createdAt
        }
    };
    console.log(data);
    const [rows] = await _insertData(projectId, fields, values, data);
    if (rows.length === 0) {
        // Retrieving the record after insert makes another round-trip and is not
        // efficient. For now, just return the original data.
        //return await getPolicy(projectId, policyId);
        return { success: true, data: data };
    } else {
        const message = `Policy did not update with data values: '${data}'`;
        return { success: false, code: 500, errors: [message] };
    };
}

/**
 * @param  {string} projectId
 * @param  {string} policyId
 * Get a Policy based off projectId and policyId
 */
async function getPolicy(projectId, policyId) {
    const table = getTableFqdn(projectId, cdsDatasetId, cdsPolicyViewId);
    const fields = Array.from(cdsPolicyViewFields).join();
    const limit = 1;
    const sqlQuery = `SELECT ${fields} FROM \`${table}\` WHERE policyId = @policyId LIMIT ${limit};`
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
 * @param  {object} data
 * Updated a Policy based off policyId and data values
 */
async function deletePolicy(projectId, policyId, data) {
    let fields = cdsPolicyTableFields, values = cdsPolicyTableFields;
    fields = Array.from(fields).join();
    values = Array.from(values).map(i => '@' + i).join();

    const rowId = uuidv4();
    const isDeleted = true;
    const createdAt = new Date().toISOString();
    // merge the data and extra values together
    data = {...data,
        ...{
            rowId: rowId,
            policyId: policyId,
            createdAt: createdAt,
            isDeleted: isDeleted
        }
    };
    console.log(data);
    const [rows] = await _insertData(projectId, fields, values, data);
    if (rows.length === 0) {
        return { success: true, data: {} };
    } else {
        const message = `Policy did not delete with data values: '${data}'`;
        return { success: false, code: 500, errors: [message] };
    };
}

module.exports = {
    listPolicies,
    createPolicy,
    updatePolicy,
    deletePolicy,
    getPolicy
};
