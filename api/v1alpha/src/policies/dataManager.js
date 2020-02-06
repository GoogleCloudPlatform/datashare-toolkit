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
const cdsPolicyFields = ['rowId', 'policyId', 'name', 'description', 'modifiedTime', 'modifiedBy',
    'version', 'datasets', 'rowAccessTags'];

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
 * Get a list of Policies
 */
async function listPolicies(projectId) {
    const table = getTableFqdn(projectId, cdsDatasetId, cdsPolicyViewId);
    const fields = cdsPolicyFields.join();
    const limit = 10;
    const sqlQuery = `SELECT ${fields} FROM \`${table}\` LIMIT ${limit};`
    const options = {
        query: sqlQuery
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
 * @param  {object} values
 * Create a Policy based off value
 */
async function createPolicy(projectId, policyId, payload) {
    const rowId = uuidv4();
    if (!policyId)  {
        policyId = uuidv4();
    };

    const table = getTableFqdn(projectId, cdsDatasetId, cdsPolicyTableId);
    const fields = ['rowId', 'policyId', 'name', 'description', 'createdBy',
        'createdAt', 'datasets', 'rowAccessTags'].join();
    const values = ['@rowId', '@policyId', '@name', '@description', '@createdBy',
        '@createdAt', '@datasets', '@rowAccessTags'].join();
    const sqlQuery = `INSERT INTO \`${table}\` (${fields}) VALUES (${values})`;

    const createdAt = new Date().toISOString();
    // merge the payload and extra values together
    payload = {...payload, ...{ rowId: rowId, policyId: policyId, createdAt: createdAt } };
    console.log(payload);
    const options = {
        query: sqlQuery,
        params: payload
    };
    const bigqueryUtil = new BigQueryUtil(projectId);
    const [rows] = await bigqueryUtil.executeQuery(options);
    if (rows.length === 0) {
        // Retrieving the record after insert makes another round-trip and is not
        // efficient. For now, just return the original payload.
        //return await getPolicy(projectId, policyId);
        return { success: true, data: payload };
    } else {
        const message = `Policy did not create with payload values: '${payload}'`;
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
    const fields = cdsPolicyFields.join();
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

module.exports = {
    listPolicies,
    createPolicy,
    getPolicy
};
