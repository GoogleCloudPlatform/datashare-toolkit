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
const underscore = require("underscore");
let bigqueryUtil = new BigQueryUtil();
const cfg = require('./config');

/**
 * @param  {} projectId
 * @param  {} dataset
 * @param  {} accounts
 */
async function performDatasetMetadataUpdate(projectId, datasetId, accounts) {
    console.log(`Begin metadata update for dataset: ${datasetId}`);
    let isDirty = false;
    const accessTypes = ["userByEmail", "groupByEmail"];

    // 0. Check for existance of the datasetId and handle appropriately

    // 1. Get metadata
    let metadata;
    try {
        metadata = await bigqueryUtil.getDatasetMetadata(datasetId);
    } catch (err) {
        throw err;
    }

    // 2. Check for and remove any non-existing authorized views
    // Remove stale view access
    let i = metadata.access.length;
    while (i--) {
        let a = metadata.access[i];
        if (a.view && a.view.projectId && a.view.datasetId && a.view.tableId) {
            const _viewExists = await bigqueryUtil.viewExists(a.view.datasetId, a.view.tableId);
            // If view no longer exists, remove it
            if (_viewExists === false) {
                console.log(`Removing authorized view as it does not exist: ${a.view.datasetId}.${a.view.tableId}`);
                metadata.access.splice(i, 1);
                isDirty = true;
            }
        }
        else if (a.role === 'READER') {
            // 3. Remove all 'READER' userByEmail and groupByEmail accounts that should not have access
            const aKeys = Object.keys(a);
            if (aKeys.length === 2) {
                const accessType = aKeys[1];
                const accessId = a[accessType];
                if (accessTypes.includes(accessType)) {
                    const shouldHaveAccess = underscore.findWhere(accounts, { email: accessId, emailType: accessType });
                    if (!shouldHaveAccess) {
                        console.log(`Deleting user: ${accessType}:${accessId} from datasetId: ${datasetId}`);
                        metadata.access.splice(i, 1);
                        isDirty = true;
                    }
                }
            }
        }
    }

    // 4. Add accounts
    accounts.forEach(account => {
        // If a dataset contains no accounts, the query will return an array with
        // a single item at zero index with attributes having all null values.
        if (account.email && account.emailType) {
            let a = { role: 'READER', };
            a["role"] = 'READER';
            a[account.emailType] = account.email;
            const accessRecordExists = underscore.findWhere(metadata.access, a);
            if (!accessRecordExists) {
                metadata.access.push(a);
                isDirty = true;
                console.log(`Adding access record to datasetId: ${datasetId}: ${JSON.stringify(account)}`);
            }
        }
    });

    // 5. Save metadata if changed
    if (isDirty === true) {
        try {
            await bigqueryUtil.setDatasetMetadata(datasetId, metadata);
            console.info(`Metadata set successfully for dataset '${datasetId}'`);
        } catch (err) {
            console.error(`Failed to set metadata for dataset '${datasetId}' with error '${err}' and payload: ${JSON.stringify(metadata)}`);
            throw err;
        }
    } else {
        console.info(`Metadata is already up to date for dataset: '${datasetId}'`);
    }

    console.log(`End metadata update for dataset: ${datasetId}`);
    return isDirty;
}

/**
 * @param  {} projectId
 * @param  {} datasetId
 * @param  {} tableId
 * @param  {} accounts
 */
async function performTableMetadataUpdate(projectId, datasetId, tableId, accounts) {
    const accessTypes = ["user", "group"];
    const viewerRole = 'roles/bigquery.dataViewer';
    console.log(`Begin metadata update for table: ${datasetId}.${tableId}`);
    let isDirty = false;
    const tablePolicy = await bigqueryUtil.getTableIamPolicy(projectId, datasetId, tableId);
    let readBinding = {};
    let bindingExists = false;
    if (tablePolicy.bindings) {
        readBinding = underscore.findWhere(tablePolicy.bindings, { role: viewerRole });
        if (readBinding) {
            bindingExists = true;
            let i = readBinding.members.length;
            while (i--) {
                let member = readBinding.members[i];
                let arr = member.split(':');
                let type = arr[0];
                let email = arr[1];
                if (accessTypes.includes(type)) {
                    const emailType = type === 'user' ? 'userByEmail' : 'groupByEmail';
                    const shouldHaveAccess = underscore.findWhere(accounts, { email: email, emailType: emailType });
                    if (!shouldHaveAccess) {
                        console.log(`Deleting user: ${type}:${email} from table: ${datasetId}.${tableId}`);
                        readBinding.members.splice(i, 1);
                        isDirty = true;
                    }
                }
            }
        }
    } else {
        tablePolicy.bindings = [];
    }

    if (!bindingExists) {
        readBinding.role = viewerRole;
        readBinding.members = [];
        tablePolicy.bindings.push(readBinding);
    }

    accounts.forEach(account => {
        if (account.email && account.emailType) {
            const identifier = (account.emailType === 'userByEmail' ? 'user' : 'group') + ':' + account.email;
            const accessRecordExists = readBinding.members.includes(identifier);
            if (!accessRecordExists) {
                readBinding.members.push(identifier);
                isDirty = true;
                console.log(`Adding access record to tableId: ${datasetId}.${tableId}: ${JSON.stringify(account)}`);
            }
        }
    });

    if (isDirty === true) {
        try {
            await bigqueryUtil.setTableIamPolicy(projectId, datasetId, tableId, tablePolicy, 'bindings');
            console.info(`Policy set successfully for table '${datasetId}'`);
        } catch (err) {
            console.error(`Failed to set policy for table '${datasetId}.${tableId}' with error '${err}' and payload: ${JSON.stringify(tablePolicy)}`);
            throw err;
        }
    } else {
        console.info(`Metadata is already up to date for table: '${datasetId}.${tableId}'`);
    }

    console.log(`End metadata update for table: ${datasetId}.${tableId}`);
    return isDirty;
}

/**
 * @param  {} projectId
 * @param  {} policyIds
 * @param  {} fullRefresh
 */
async function performPolicyUpdates(projectId, policyIds, fullRefresh) {
    const labelKey = cfg.cdsManagedLabelKey;
    let options = {};
    if (!fullRefresh && policyIds && policyIds.length > 0) {
        options = {
            query: `CALL \`${projectId}.datashare.permissionsDiff\`(@policyIds)`,
            params: { policyIds: policyIds }
        };
    } else {
        options = {
            query: `CALL \`${projectId}.datashare.permissionsDiff\`(null)`
        };
    }

    const [rows] = await bigqueryUtil.executeQuery(options);
    console.log(`Permission Diff Result: ${JSON.stringify(rows, null, 3)}`);

    if (fullRefresh === true) {
        // Update all managed datasets and tables
        const datasets = await bigqueryUtil.getDatasetsByLabel(projectId, labelKey);
        for (const dataset of datasets) {
            const datasetId = dataset.datasetId;
            let dsPolicyRecord = underscore.findWhere(rows, { datasetId: datasetId, isTableBased: false });
            let accounts = [];
            if (dsPolicyRecord) {
                accounts = dsPolicyRecord.accounts;
            }
            await performDatasetMetadataUpdate(projectId, datasetId, accounts);

            const tables = await bigqueryUtil.getTablesByLabel(projectId, datasetId, labelKey);
            for (const table of tables) {
                const tableId = table.tableId;
                let tbPolicyRecord = underscore.findWhere(rows, { datasetId: datasetId, tableId: tableId, isTableBased: true });
                let tbAccounts = [];
                if (tbPolicyRecord) {
                    tbAccounts = tbPolicyRecord.accounts;
                }
                await performTableMetadataUpdate(projectId, datasetId, tableId, tbAccounts);
            }
        }
    } else {
        // Differential update, iterate over result based on the policyId filter only.
        // No need to apply an additional filter.
        for (const row of rows) {
            const datasetId = row.datasetId;
            const tableId = row.tableId;
            if (row.isTableBased === true) {
                console.log(`Iterating over table: ${datasetId}.${tableId}`);
                await performTableMetadataUpdate(projectId, datasetId, tableId, row.accounts);
            } else {
                console.log(`Iterating over dataset: ${datasetId}`);
                await performDatasetMetadataUpdate(projectId, datasetId, row.accounts);
            }
        }
    }
}

module.exports = {
    performPolicyUpdates
};
