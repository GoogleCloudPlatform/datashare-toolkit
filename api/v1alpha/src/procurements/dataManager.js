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
let commerceProcurementUtil = new CommerceProcurementUtil('cds-demo-2');
const cfg = require('../lib/config');
const underscore = require("underscore");

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
    try {
        const procurementUtil = new CommerceProcurementUtil(projectId);
        const result = await procurementUtil.listEntitlements('state=ENTITLEMENT_ACTIVATION_REQUESTED');
        const accountNames = underscore.uniq(result.entitlements.map(e => e.account));
        let entitlements = result.entitlements;

        // Set activated flag to false
        entitlements.forEach(e => {
            e.activated = false;
        });

        if (accountNames && accountNames.length > 0) {
            const table = getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsAccountViewId);
            const query = `SELECT m.accountName, a.email
FROM \`${table}\` a
CROSS JOIN UNNEST(a.marketplace) as m
WHERE m.accountName IN UNNEST(@accountNames)`;

            const options = {
                query: query,
                params: { accountNames: accountNames },
            }
            const [accountRows] = await bigqueryUtil.executeQuery(options);

            if (accountRows && accountRows.length > 0) {
                entitlements.forEach(e => {
                    const email = underscore.where(accountRows, { accountName: e.account }).map(e => e.email).join(', ');
                    if (email) {
                        e.email = email;
                        e.activated = true;
                    }
                });
            }
        }

        return { success: true, data: entitlements };
    } catch (err) {
        return { success: false, errors: ['Failed to retrieve pending entitlement list', err] };
    }
}

/**
 * @param  {} projectId The projectId for the provider
 * @param  {} name Name of the entitlement resource
 * @param  {boolean} Indicates an approval (true) or a rejection (false)
 * @param  {} reason Only provided for a rejection
 */
async function approveEntitlement(projectId, name, approve, reason) {
    try {
        const procurementUtil = new CommerceProcurementUtil(projectId);
        if (approve === true) {
            // At this point, we could automatically permission the calling email address for access to the policy.
            // However, given that it could potentially fail, we'll not do this just yet.
            const result = await procurementUtil.approveEntitlement(name);
            return { success: true, data: result };
        } else {
            const result = await procurementUtil.rejectEntitlement(name, reason);
            return { success: true, data: result };
        }
    } catch (err) {
        return { success: false, errors: ['Failed to approve entitlement', err] };
    }
}

module.exports = {
    listProcurements,
    approveEntitlement
};
