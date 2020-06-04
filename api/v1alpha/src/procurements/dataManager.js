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
const cfg = require('../lib/config');

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
    const table = getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsProcurementViewId);
    const fields = Array.from(cfg.cdsProcurementViewFields).join();
    const options = {
        query: `SELECT ${fields} FROM \`${table}\``
    }
    const [rows] = await bigqueryUtil.executeQuery(options);
    return { success: true, data: rows };
}

module.exports = {
    listProcurements
};
