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
const accountManager = require('../accounts/dataManager');
const fs = require('fs');

require.extensions['.sql'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

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
            await metaManager.performPolicyUpdates(projectId, null, true);
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
 * @param  {} text
 */
function sqlReplacements(projectId, text) {
    let sql = text;
    sql = sql.replace(/\$\{projectId\}/g, projectId);

    const policyTable = getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsPolicyTableId);
    sql = sql.replace(/\$\{policyTable\}/g, policyTable);

    const accountTable = getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsAccountTableId);
    sql = sql.replace(/\$\{accountTable\}/g, accountTable);

    const authorizedViewTable = getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsAuthorizedViewTableId);
    sql = sql.replace(/\$\{authorizedViewTable\}/g, authorizedViewTable);

    const policyView = getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsPolicyViewId);
    sql = sql.replace(/\$\{policyView\}/g, policyView);

    const accountView = getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsAccountViewId);
    sql = sql.replace(/\$\{accountView\}/g, accountView);

    const permissionsDiffProcedure = getTableFqdn(projectId, cfg.cdsDatasetId, cfg.permissionsDiffProcedureId);
    sql = sql.replace(/\$\{permissionsDiffProcedure\}/g, permissionsDiffProcedure);

    return sql;
}

/**
 * @param  {} projectId
 */
async function setupDatasharePrerequisites(projectId) {
    const bigqueryUtil = new BigQueryUtil(projectId);

    if (await bigqueryUtil.datasetExists(cfg.cdsDatasetId) === false) {
        console.log('Creating datashare dataset');
        const options = { description: 'Datashare Master Dataset' };
        await bigqueryUtil.createDataset(cfg.cdsDatasetId, options);
    } else {
        console.log('Datashare dataset already exists');
    }

    if (await bigqueryUtil.tableExists(cfg.cdsDatasetId, cfg.cdsPolicyTableId) === false) {
        console.log("Creating policy table");
        const options = require('./bq/schema/policy.json');
        await bigqueryUtil.createTable(cfg.cdsDatasetId, cfg.cdsPolicyTableId, options);
    } else {
        console.log('Policy table already exists');
    }

    if (await bigqueryUtil.viewExists(cfg.cdsDatasetId, cfg.cdsPolicyViewId) === false) {
        console.log("Creating latest policies view");
        const sql = sqlReplacements(projectId, require('./bq/view/currentPolicy.sql'));
        await bigqueryUtil.createView(cfg.cdsDatasetId, cfg.cdsPolicyViewId, sql);
    } else {
        console.log('Policies view already exists');
    }

    if (await bigqueryUtil.tableExists(cfg.cdsDatasetId, cfg.cdsAccountTableId) === false) {
        console.log("Creating account table");
        const options = require('./bq/schema/account.json');
        await bigqueryUtil.createTable(cfg.cdsDatasetId, cfg.cdsAccountTableId, options);
    } else {
        console.log('Account table already exists');
    }

    if (await bigqueryUtil.viewExists(cfg.cdsDatasetId, cfg.cdsAccountViewId) === false) {
        console.log("Creating latest account view");
        const sql = sqlReplacements(projectId, require('./bq/view/currentAccount.sql'));
        await bigqueryUtil.createView(cfg.cdsDatasetId, cfg.cdsAccountViewId, sql);
    } else {
        console.log('Account view already exists');
    }

    if (await bigqueryUtil.tableExists(cfg.cdsDatasetId, cfg.cdsAuthorizedViewTableId) === false) {
        console.log("Creating authorizedView table");
        const options = require('./bq/schema/authorizedView.json');
        await bigqueryUtil.createTable(cfg.cdsDatasetId, cfg.cdsAuthorizedViewTableId, options);
    } else {
        console.log('Authorized view table already exists');
    }

    if (await bigqueryUtil.viewExists(cfg.cdsDatasetId, cfg.cdsAuthorizedViewViewId) === false) {
        console.log("Creating latest authorizedView view");
        const sql = sqlReplacements(projectId, require('./bq/view/currentAuthorizedView.sql'));
        await bigqueryUtil.createView(cfg.cdsDatasetId, cfg.cdsAuthorizedViewViewId, sql);
    } else {
        console.log('Authorized view view already exists');
    }

    if (await bigqueryUtil.viewExists(cfg.cdsDatasetId, cfg.cdsCurrentUserPermissionViewId) === false) {
        console.log("Creating latest currentUserPermission view");
        const sql = sqlReplacements(projectId, require('./bq/view/currentUserPermission.sql'));
        await bigqueryUtil.createView(cfg.cdsDatasetId, cfg.cdsCurrentUserPermissionViewId, sql);
    } else {
        console.log('Current user dataset view already exists');
    }

    console.log("Creating permissionsDiff procedure");
    const permissionsProcSql = sqlReplacements(projectId, require('./bq/procedure/permissionsDiff.sql'));
    await bigqueryUtil.executeQuerySync({
        query: permissionsProcSql
    });
}

async function initializePubSubListiner(timeout = 60) {
    console.log(`Initializing PubSub listener`);
    const topicName = `projects/cloudcommerceproc-prod/topics/cds-demo-2`;
    const subscriptionName = `projects/cds-demo-2/subscriptions/procurement-cds-demo-2`;
    const { PubSub } = require('@google-cloud/pubsub');
    const pubSubClient = new PubSub();

    const [subscriptions] = await pubSubClient.getSubscriptions();
    const existing = underscore.findWhere(subscriptions.flatMap(e => e.metadata), { name: subscriptionName, topic: topicName });

    if (existing) {
        console.log(`Subscription '${subscriptionName}' already exists`)
    } else {
        await pubSubClient.topic(topicName).createSubscription(subscriptionName);
        console.log(`Subscription '${subscriptionName}' created.`);
    }

    // Subscribe
    async function listenForMessages(projectId) {
        // References an existing subscription
        const subscription = pubSubClient.subscription(subscriptionName);

        // Create an event handler to handle messages
        let messageCount = 0;
        const messageHandler = async message => {
            // Have to perform sync to avoid any syncing issues with permissions
            console.log(`Received message ${message.id}:`);
            console.log(`\tData: ${message.data}`);
            console.log(`\tAttributes: ${message.attributes}`);
            messageCount += 1;

            // "Ack" (acknowledge receipt of) the message
            message.ack();

            if (message.data) {
                const data = message.data;
                const eventType = data.eventType;
                if (eventType === 'ENTITLEMENT_CREATION_REQUESTED') {
                    const entitlement = data.entitlement;
                    await accountManager.autoApproveEntitlement(projectId, entitlement.id)
                }
            }

            /*
              Handle Subscribe:
              Received message 1380641252171122:
              Data: {
                  "eventId": "CREATE_ENTITLEMENT-1a701d66-f131-4bb5-96ea-b8834aece3be",
                  "eventType": "ENTITLEMENT_CREATION_REQUESTED",
                  "entitlement": {
                      "id": "79041050-c3be-4777-b4ba-91b869f6e8da",
                      "updateTime": "2020-07-20T20:29:56.854Z"
                  }
                  }
  
              Handle Cancel:
              We don't have a way to associate other users to the purchase currently
              Received message 1380632154523826:
              Data: {
                  "eventId": "CANCEL_ENTITLEMENT-ccd0ca16-5397-4cfd-94f7-50d15260ef45",
                  "eventType": "ENTITLEMENT_CANCELLED",
                  "entitlement": {
                      "id": "d3c52313-c65f-43b7-987a-f089130cabad",
                      "updateTime": "2020-07-20T20:28:27.515Z"
                  }
                  }
            */
        };
        
        subscription.on('message', messageHandler);
    }

    listenForMessages();
}

module.exports = {
    initializeSchema,
    syncResources,
    initializePubSubListiner
};

