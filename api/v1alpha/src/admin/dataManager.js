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
const cfg = require('../lib/config');
const metaManager = require('../lib/metaManager');
const datasetManager = require('../datasets/dataManager');

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
 * @param  {} projectId
 */
async function initializeSchema(projectId) {
    try {
        await setupDatasharePrerequisites(projectId);
    } catch (err) {
        return { success: false, code: 500, errors: [err.message] };
    }
    return { success: true, data: {} };
}

/**
 * @param  {string} projectId
 * @param  {string} type
 */
async function syncResources(projectId, type) {
    const bigqueryUtil = new BigQueryUtil(projectId);
    let permissions = false;
    let views = false;
    try {
        if (type === 'PERMISSIONS') {
            console.log('Sync permissions called');
            permissions = true;
        }
        else if (type === 'VIEWS') {
            console.log('Sync views called');
            views = true;
        }
        else if (type === 'ALL') {
            console.log('Sync all called');
            permissions = true;
            views = true;
        }

        const labelKey = cfg.cdsManagedLabelKey;
        if (permissions) {
            console.log('Syncing permissions');
            const datasets = await bigqueryUtil.getDatasetsByLabel(projectId, labelKey);
            const datasetIds = datasets.map(d => d.datasetId);
            console.log(`Performing policy sync for datasets: ${JSON.stringify(datasetIds)})`);
            await metaManager.performMetadataUpdate(projectId, null, datasetIds);
        }
        if (views) {
            // Get list of configured views
            const viewResult = await datasetManager.listDatasetViews(projectId, null, true);
            if (viewResult.success) {
                const viewList = viewResult.data;
                const datasets = await bigqueryUtil.getDatasetsByLabel(projectId, labelKey);

                for (const dataset of datasets) {
                    const tables = await bigqueryUtil.getTablesByLabel(projectId, dataset.datasetId, labelKey);
                    if (tables.length > 0) {
                        const views = underscore.where(tables, { type: 'VIEW' });
                        if (views.length > 0) {
                            for (const view of views) {
                                // Only delete the view if it no longer is configured
                                const found = underscore.findWhere(viewResult.data, { datasetId: view.datasetId, name: view.tableId });
                                if (!found) {
                                    console.log(`Deleting view: ${view.datasetId}.${view.tableId}`);
                                    await bigqueryUtil.deleteTable(view.datasetId, view.tableId);
                                }
                            }
                        }
                    }
                }

                // Iterate all views and create/modify them.
                for (const view of viewList) {
                    let viewClone = JSON.parse(JSON.stringify(view));
                    const sql = viewClone.viewSql;
                    console.log(`Creating view ${viewClone.datasetId}.${viewClone.name}`);
                    viewClone.projectId = projectId;
                    if (view.expiration && view.expiration.time) {
                        // This logic should probably be re-factored to a shared place maybe in createView using a type check
                        // See datasets dataManager as the logic should be re-factored out of there from createOrUpdateDatasetView.
                        viewClone.expiration.time = new Date(view.expiration.time);
                    }
                    // console.log(viewClone);
                    await datasetManager.createView(viewClone, sql);
                }
            }
        }
    } catch (err) {
        return { success: false, code: 500, errors: [err.message] };
    }
    return { success: true, data: {} };
}

/**
 * @param  {} projectId
 */
async function setupDatasharePrerequisites(projectId) {
    const bigqueryUtil = new BigQueryUtil(projectId);

    if (await bigqueryUtil.datasetExists(cfg.cdsDatasetId) === false) {
        console.log('Creating datashare dataset');
        const options = { description: 'CDS Datashare Master Dataset' };
        await bigqueryUtil.createDataset(cfg.cdsDatasetId, options);
    } else {
        console.log('Datashare dataset already exists');
    }

    if (await bigqueryUtil.tableExists(cfg.cdsDatasetId, cfg.cdsPolicyTableId) === false) {
        console.log("Creating policy table");
        const options = {
            description: 'CDS Datashare Policy Table',
            schema: [
                {
                    "mode": "REQUIRED",
                    "name": "rowId",
                    "type": "STRING",
                    "description": "Unique row identifier"
                },
                {
                    "mode": "REQUIRED",
                    "name": "policyId",
                    "type": "STRING",
                    "description": "Unique policy identifier"
                },
                {
                    "mode": "REQUIRED",
                    "name": "name",
                    "type": "STRING",
                    "description": "Display name for policy"
                },
                {
                    "mode": "REQUIRED",
                    "name": "description",
                    "type": "STRING",
                    "description": "Description for the policy"
                },
                {
                    "fields": [
                        {
                            "mode": "REQUIRED",
                            "name": "datasetId",
                            "type": "STRING",
                            "description": "Dataset identifier of dataset"
                        }
                    ],
                    "mode": "REPEATED",
                    "name": "datasets",
                    "type": "RECORD",
                    "description": "List of dataset(s) associations for a policy"
                },
                {
                    "fields": [
                        {
                            "mode": "REQUIRED",
                            "name": "tag",
                            "type": "STRING",
                            "description": "Row Access Tag name"
                        }
                    ],
                    "mode": "REPEATED",
                    "name": "rowAccessTags",
                    "type": "RECORD",
                    "description": "List of row access tag(s) associations for a policy"
                },
                {
                    "mode": "REQUIRED",
                    "name": "createdBy",
                    "type": "STRING",
                    "description": "The email address the policy row entry was created by"
                },
                {
                    "mode": "REQUIRED",
                    "name": "createdAt",
                    "type": "TIMESTAMP",
                    "description": "The timestamp the policy row entry was created at"
                },
                {
                    "mode": "NULLABLE",
                    "name": "isDeleted",
                    "type": "BOOLEAN",
                    "description": "The flag to indicate the policy was deleted"
                }
            ]
        };
        await bigqueryUtil.createTable(cfg.cdsDatasetId, cfg.cdsPolicyTableId, options);
    } else {
        console.log('Policy table already exists');
    }

    if (await bigqueryUtil.viewExists(cfg.cdsDatasetId, cfg.cdsPolicyViewId) === false) {
        console.log("Creating latest policies view");
        const policyTable = getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsPolicyTableId);
        const viewSql = `WITH ranked AS (\n  select\n    p.*,\n    DENSE_RANK() OVER (PARTITION BY policyId ORDER BY createdAt) as rank\n  from \`${policyTable}\` p\n),\nrowIdentifiers AS (\n  SELECT r.rowId\n  from RANKED r\n  where r.rank = (select max(r2.rank) from RANKED r2 where r2.policyId = r.policyId)\n)\nSELECT\n * EXCEPT(rank, createdAt, isDeleted),\n UNIX_MILLIS(createdAt) as createdAt,\n rank as version,\n ifnull(isDeleted, false) as isDeleted\nFROM ranked t\nWHERE EXISTS (SELECT 1 from rowIdentifiers r WHERE t.rowId = r.rowId)`;
        await bigqueryUtil.createView(cfg.cdsDatasetId, cfg.cdsPolicyViewId, viewSql);
    } else {
        console.log('Policies view already exists');
    }

    if (await bigqueryUtil.tableExists(cfg.cdsDatasetId, cfg.cdsAccountTableId) === false) {
        console.log("Creating account table");
        const options = {
            description: 'CDS Datashare Account Table',
            schema: [
                {
                    "mode": "REQUIRED",
                    "name": "rowId",
                    "type": "STRING",
                    "description": "Unique row identifier"
                },
                {
                    "mode": "REQUIRED",
                    "name": "accountId",
                    "type": "STRING",
                    "description": "Unique account identifier"
                },
                {
                    "mode": "REQUIRED",
                    "name": "email",
                    "type": "STRING",
                    "description": "Email address for the account"
                },
                {
                    "mode": "REQUIRED",
                    "name": "emailType",
                    "type": "STRING",
                    "description": "Email address type for the account"
                },
                {
                    "mode": "REQUIRED",
                    "name": "accountType",
                    "type": "STRING",
                    "description": "Email address type for the account"
                },
                {
                    "mode": "REQUIRED",
                    "name": "createdBy",
                    "type": "STRING",
                    "description": "The email address the consumer row entry was created by"
                },
                {
                    "mode": "REQUIRED",
                    "name": "createdAt",
                    "type": "TIMESTAMP",
                    "description": "The timestamp the consumer row entry was created at"
                },
                {
                    "fields": [
                        {
                            "mode": "REQUIRED",
                            "name": "policyId",
                            "type": "STRING",
                            "description": "Policy identifier of policy"
                        }
                    ],
                    "mode": "REPEATED",
                    "name": "policies",
                    "type": "RECORD",
                    "description": "List of policies(s) associations for an account"
                },
                {
                    "mode": "NULLABLE",
                    "name": "isDeleted",
                    "type": "BOOLEAN",
                    "description": "The flag to indicate the account was deleted"
                }
            ]
        };
        await bigqueryUtil.createTable(cfg.cdsDatasetId, cfg.cdsAccountTableId, options);
    } else {
        console.log('Account table already exists');
    }

    if (await bigqueryUtil.viewExists(cfg.cdsDatasetId, cfg.cdsAccountViewId) === false) {
        console.log("Creating latest account view");
        const accountTable = getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsAccountTableId);
        const viewSql = `WITH ranked AS (\n  select\n    a.*,\n    DENSE_RANK() OVER (PARTITION BY accountId ORDER BY createdAt) as rank\n  from \`${accountTable}\` a\n),\nrowIdentifiers AS (\n  SELECT r.rowId\n  from RANKED r\n  where r.rank = (select max(r2.rank) from RANKED r2 where r2.accountId = r.accountId)\n)\nSELECT\n * EXCEPT(rank, createdAt, isDeleted),\n UNIX_MILLIS(createdAt) as createdAt,\n rank as version,\n ifnull(isDeleted, false) as isDeleted\nFROM ranked t\nWHERE EXISTS (SELECT 1 from rowIdentifiers r WHERE t.rowId = r.rowId)`;
        await bigqueryUtil.createView(cfg.cdsDatasetId, cfg.cdsAccountViewId, viewSql);
    } else {
        console.log('Account view already exists');
    }

    if (await bigqueryUtil.tableExists(cfg.cdsDatasetId, cfg.cdsAuthorizedViewTableId) === false) {
        console.log("Creating authorizedView table");
        const options = {
            description: 'CDS Datashare Authorized View Table',
            schema: [
                {
                    "description": "Unique row identifier",
                    "mode": "REQUIRED",
                    "name": "rowId",
                    "type": "STRING"
                },
                {
                    "description": "Unique authorized view identifier",
                    "mode": "REQUIRED",
                    "name": "authorizedViewId",
                    "type": "STRING"
                },
                {
                    "description": "Display name for authorized view",
                    "mode": "REQUIRED",
                    "name": "name",
                    "type": "STRING"
                },
                {
                    "mode": "REQUIRED",
                    "name": "description",
                    "type": "STRING",
                    "description": "Description for the authorized view"
                },
                {
                    "mode": "REQUIRED",
                    "name": "datasetId",
                    "type": "STRING",
                    "description": "The datasetId where the authorized view will be created"
                },
                {
                    "description": "Source data",
                    "fields": [
                        {
                            "description": "Source datasetId",
                            "mode": "REQUIRED",
                            "name": "datasetId",
                            "type": "STRING"
                        },
                        {
                            "description": "Source tableId",
                            "mode": "REQUIRED",
                            "name": "tableId",
                            "type": "STRING"
                        },
                        {
                            "description": "Public access data",
                            "fields": [
                                {
                                    "description": "Flag indicating if public access is to be used",
                                    "mode": "REQUIRED",
                                    "name": "enabled",
                                    "type": "BOOLEAN"
                                },
                                {
                                    "description": "Public access query filter",
                                    "mode": "NULLABLE",
                                    "name": "queryFilter",
                                    "type": "STRING"
                                },
                                {
                                    "description": "Public access row limit",
                                    "mode": "NULLABLE",
                                    "name": "limit",
                                    "type": "INTEGER"
                                }
                            ],
                            "mode": "NULLABLE",
                            "name": "publicAccess",
                            "type": "RECORD"
                        },
                        {
                            "description": "The columns that should be made visible",
                            "mode": "REPEATED",
                            "name": "visibleColumns",
                            "type": "STRING",
                        },
                        {
                            "description": "The query filter",
                            "name": "queryFilter",
                            "type": "STRING"
                        }
                    ],
                    "mode": "NULLABLE",
                    "name": "source",
                    "type": "RECORD"
                },
                {
                    "description": "The custom data",
                    "fields": [
                        {
                            "description": "Optionally used to provide a custom query",
                            "mode": "REQUIRED",
                            "name": "query",
                            "type": "STRING"
                        },
                        {
                            "description": "The datasets that need to authorize access to the new view.",
                            "mode": "REPEATED",
                            "name": "authorizeFromDatasetIds",
                            "type": "STRING"
                        }
                    ],
                    "mode": "NULLABLE",
                    "name": "custom",
                    "type": "RECORD"
                },
                {
                    "description": "Access control data",
                    "fields": [
                        {
                            "description": "Flag indicating if row-level access control is enabled",
                            "mode": "REQUIRED",
                            "name": "enabled",
                            "type": "BOOLEAN"
                        },
                        {
                            "description": "The column in the source table to be used for filtering access at a row-level",
                            "mode": "REQUIRED",
                            "name": "labelColumn",
                            "type": "STRING"
                        },
                        {
                            "description": "The column delimiter to use to split the source value",
                            "mode": "NULLABLE",
                            "name": "labelColumnDelimiter",
                            "type": "STRING"
                        }
                    ],
                    "name": "accessControl",
                    "type": "RECORD"
                },
                {
                    "description": "The view expiration data",
                    "fields": [
                        {
                            "description": "Flag indicating if view expiration is enabled",
                            "mode": "REQUIRED",
                            "name": "enabled",
                            "type": "BOOLEAN"
                        },
                        {
                            "description": "Flag indicating if the view should be deleted upon expiration, otherwise return zero result",
                            "mode": "REQUIRED",
                            "name": "delete",
                            "type": "BOOLEAN"
                        },
                        {
                            "description": "The time for the expiration",
                            "mode": "REQUIRED",
                            "name": "time",
                            "type": "TIMESTAMP"
                        }
                    ],
                    "mode": "NULLABLE",
                    "name": "expiration",
                    "type": "RECORD"
                },
                {
                    "description": "The timestamp the authorized view row entry was created at",
                    "mode": "REQUIRED",
                    "name": "createdAt",
                    "type": "TIMESTAMP"
                },
                {
                    "description": "The email address the account row entry was created by",
                    "mode": "REQUIRED",
                    "name": "createdBy",
                    "type": "STRING"
                },
                {
                    "description": "The generated view sql",
                    "mode": "REQUIRED",
                    "name": "viewSql",
                    "type": "STRING"
                },
                {
                    "description": "The flag to indicate the account was deleted",
                    "name": "isDeleted",
                    "type": "BOOLEAN"
                }
            ]
        };
        await bigqueryUtil.createTable(cfg.cdsDatasetId, cfg.cdsAuthorizedViewTableId, options);
    } else {
        console.log('Authorized view table already exists');
    }

    if (await bigqueryUtil.viewExists(cfg.cdsDatasetId, cfg.cdsAuthorizedViewViewId) === false) {
        console.log("Creating latest authorizedView view");
        const authorizedViewTable = getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsAuthorizedViewTableId);
        const viewSql = `WITH ranked AS (\n  select\n    a.*,\n    DENSE_RANK() OVER (PARTITION BY authorizedViewId ORDER BY createdAt) as rank\n  from \`${authorizedViewTable}\` a\n),\nrowIdentifiers AS (\n  SELECT r.rowId\n  from RANKED r\n  where r.rank = (select max(r2.rank) from RANKED r2 where r2.authorizedViewId = r.authorizedViewId)\n)\nSELECT\n * EXCEPT(rank, createdAt, isDeleted),\n UNIX_MILLIS(createdAt) as createdAt,\n rank as version,\n ifnull(isDeleted, false) as isDeleted\nFROM ranked t\nWHERE EXISTS (SELECT 1 from rowIdentifiers r WHERE t.rowId = r.rowId)`;
        await bigqueryUtil.createView(cfg.cdsDatasetId, cfg.cdsAuthorizedViewViewId, viewSql);
    } else {
        console.log('Authorized view view already exists');
    }

    if (await bigqueryUtil.viewExists(cfg.cdsDatasetId, cfg.cdsCurrentUserDatasetViewId) === false) {
        console.log("Creating latest currentUserDataset view");
        const policyView = getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsPolicyViewId);
        const accountView = getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsAccountViewId);
        const viewSql = `with policies as (\n  select distinct\n    cp.policyId,\n    cp.name as policyName,\n    d.datasetId,\n    t.tag\n  from \`${policyView}\` cp\n  cross join unnest(cp.datasets) d\n  cross join unnest(cp.rowAccessTags) t\n  where cp.isDeleted is false\n),\nuserPolicies as (\n  select\n    ca.rowId as accountRowId,\n    ca.accountId,\n    ca.email,\n    ca.emailType,\n    cp.datasetId,\n    cp.tag\n  from \`${accountView}\` ca\n  cross join unnest(ca.policies) as p\n  join policies cp on p.policyId = cp.policyId\n  where ca.isDeleted is false\n)\nselect distinct\n  up.accountRowId,\n  up.accountId,\n  up.email,\n  up.emailType,\n  up.datasetId,\n  up.tag\nfrom userPolicies up\nWHERE up.email = SESSION_USER() AND up.emailType = 'userByEmail'`;
        await bigqueryUtil.createView(cfg.cdsDatasetId, cfg.cdsCurrentUserDatasetViewId, viewSql);
    } else {
        console.log('Current user dataset view already exists');
    }
}

module.exports = {
    initializeSchema,
    syncResources
};

