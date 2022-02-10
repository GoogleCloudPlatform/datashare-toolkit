/**
 * Copyright 2020-2021 Google LLC
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
const cfg = require('../config');
const runtimeConfig = require('../runtimeConfig');

/**
 * @param  {} bqDatasetAccessType
 */
function getDatashareDatasetAccessType(bqDatasetAccessType) {
    if (bqDatasetAccessType === 'userByEmail') {
        return 'user';
    } else if (bqDatasetAccessType === 'groupByEmail') {
        return 'group';
    } else {
        throw new Error(`Unsupported access type '${bqDatasetAccessType}'`);
    }
}

/**
 * @param  {} datashareDatasetAccessType
 */
function getBqDatasetAccessType(datashareDatasetAccessType) {
    if (datashareDatasetAccessType === 'user') {
        return 'userByEmail';
    } else if (datashareDatasetAccessType === 'group') {
        return 'groupByEmail';
    } else if (datashareDatasetAccessType === 'serviceAccount') {
        // Service accounts are handled as 'userByEmail' within Dataset metadata
        return 'userByEmail';
    } else {
        throw new Error(`Unsupported access type '${datashareDatasetAccessType}'`);
    }
}

/**
 * @param  {} projectId
 * @param  {} dataset
 * @param  {} accounts
 */
async function performDatasetMetadataUpdate(projectId, datasetId, accounts) {
    const datashareReaderRole = await runtimeConfig.bigQueryDataViewerRole(projectId);
    console.log(`Begin metadata update for dataset: '${datasetId}'`);
    const bigqueryUtil = new BigQueryUtil(projectId);
    const exists = await bigqueryUtil.datasetExists(datasetId);
    if (!exists) {
        console.warn(`Skipping metadata update for non-existant dataset: '${datasetId}'`);
        return false;
    }

    let isDirty = false;
    const accessTypes = ["userByEmail", "groupByEmail"];

    // Get metadata
    let metadata = await bigqueryUtil.getDatasetMetadata(datasetId);

    // Check for and remove any non-existing authorized views
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
        else if (a.role === datashareReaderRole) {
            // Remove all 'datashare.bigquery.dataViewer' userByEmail and groupByEmail accounts that should not have access
            const aKeys = Object.keys(a);
            if (aKeys.length === 2) {
                const accessType = aKeys[1];
                const accessId = a[accessType];
                if (accessTypes.includes(accessType)) {
                    const dsAccessType = getDatashareDatasetAccessType(accessType);
                    let shouldHaveAccess = underscore.findWhere(accounts, { email: accessId, emailType: dsAccessType });

                    // If returns false for a user, also check for service account
                    if (!shouldHaveAccess && dsAccessType === 'user') {
                        shouldHaveAccess = underscore.findWhere(accounts, { email: accessId, emailType: 'serviceAccount' });
                    }

                    if (!shouldHaveAccess) {
                        console.log(`Deleting user: ${accessType}:${accessId} from datasetId: ${datasetId}`);
                        metadata.access.splice(i, 1);
                        isDirty = true;
                    }
                }
            }
        }
    }

    // Add new or missing accounts
    accounts.forEach(account => {
        // If a dataset contains no accounts, the query will return an array with
        // a single item at zero index with attributes having all null values.
        if (account.email && account.emailType) {
            const bqAccessType = getBqDatasetAccessType(account.emailType);
            let a = { role: datashareReaderRole };
            a[bqAccessType] = account.email;
            const accessRecordExists = underscore.findWhere(metadata.access, a);
            if (!accessRecordExists) {
                metadata.access.push(a);
                isDirty = true;
                console.log(`Adding access record to datasetId: ${datasetId}: ${JSON.stringify(account)}`);
            }
        }
    });

    // Save metadata if changed
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
    console.log(`Begin metadata update for table: ${datasetId}.${tableId}`);
    const bigqueryUtil = new BigQueryUtil(projectId);
    const exists = await bigqueryUtil.tableExists(datasetId, tableId);
    if (!exists) {
        console.warn(`Skipping metadata update for non-existant table: ${datasetId}.${tableId}`);
        return false;
    }
    const viewerRole = await runtimeConfig.bigQueryDataViewerRole(projectId);
    let isDirty = false;
    const tablePolicy = await bigqueryUtil.getTableIamPolicy(projectId, datasetId, tableId);
    let readBinding = {};
    let bindingExists = false;
    if (tablePolicy.bindings) {
        const viewerRoleBinding = underscore.findWhere(tablePolicy.bindings, { role: viewerRole });
        if (viewerRoleBinding) {
            readBinding = viewerRoleBinding;
            bindingExists = true;
            let i = readBinding.members.length;
            while (i--) {
                let member = readBinding.members[i];
                let arr = member.split(':');
                let type = arr[0];
                let email = arr[1];
                if (cfg.managedIamAccessTypes.includes(type)) {
                    const shouldHaveAccess = underscore.findWhere(accounts, { email: email, emailType: type });
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
            const identifier = `${account.emailType}:${account.email}`;
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
async function applyPolicies(projectId, policyIds, fullRefresh) {
    const labelKey = cfg.cdsManagedLabelKey;
    let options = {};
    const bigqueryUtil = new BigQueryUtil(projectId);
    const bigQueryPermissionDiffProcedure = bigqueryUtil.getTableFqdn(projectId, cfg.cdsDatasetId, cfg.bigQueryPermissionDiffProcedureId);

    if (!fullRefresh && policyIds && policyIds.length > 0) {
        options = {
            query: `CALL \`${bigQueryPermissionDiffProcedure}\`(@policyIds)`,
            params: { policyIds: policyIds }
        };
    } else {
        options = {
            query: `CALL \`${bigQueryPermissionDiffProcedure}\`(null)`
        };
    }

    const [rows] = await bigqueryUtil.executeQuery(options);
    console.log(`BigQuery Permission Diff Result: ${JSON.stringify(rows, null, 3)}`);

    if (fullRefresh === true) {
        // Update all managed datasets and tables
        const role = await runtimeConfig.bigQueryDataViewerRole(projectId);
        const datasets = await bigqueryUtil.getDatasetsByLabel(labelKey, role);
        for (const dataset of datasets) {
            const datasetId = dataset.datasetId;
            let dsPolicyRecord = underscore.findWhere(rows, { datasetId: datasetId, isTableBased: false });
            let accounts = [];
            if (dsPolicyRecord) {
                accounts = dsPolicyRecord.accounts;
            }
            await performDatasetMetadataUpdate(projectId, datasetId, accounts);

            const tables = await bigqueryUtil.getTablesByLabel(datasetId, labelKey);
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
        // Differential update, iterate over result based on the policyId filter only
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
    applyPolicies
};
