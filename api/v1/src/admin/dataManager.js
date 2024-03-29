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

const { BigQueryUtil, PubSubUtil } = require('cds-shared');
const underscore = require("underscore");
const cfg = require('../lib/config');
const runtimeConfig = require('../lib/runtimeConfig');
const metaManager = require('../lib/metaManager');
const datasetManager = require('../datasets/dataManager');
const procurementManager = require('../procurements/dataManager');
const fs = require('fs');
const retry = require('async-retry');
const fbAdmin = require('firebase-admin');
const config = require('../lib/config');

require.extensions['.sql'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

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
    let bigQueryPermissions = false;
    let topicPermissions = false;
    let bucketPermissions = false;
    let views = false;
    let marketplace = false;
    try {
        if (type === 'BIGQUERY_PERMISSIONS') {
            console.log('Sync BigQuery permissions called');
            bigQueryPermissions = true;
        } else if (type === 'STORAGE_BUCKET_PERMISSIONS') {
            console.log('Sync storage bucket permissions called');
            bucketPermissions = true;
        } else if (type === 'TOPIC_PERMISSIONS') {
            console.log('Sync pubsub topic permissions called');
            topicPermissions = true;
        } else if (type === 'BIGQUERY_VIEWS') {
            console.log('Sync views called');
            views = true;
        } else if (type === 'MARKETPLACE') {
            console.log('Sync marketplace entitlements called');
            marketplace = await runtimeConfig.marketplaceIntegration(projectId);
        } else if (type === 'ALL') {
            console.log('Sync all called');
            bigQueryPermissions = true;
            topicPermissions = true;
            bucketPermissions = true;
            views = true;
            marketplace = await runtimeConfig.marketplaceIntegration(projectId);
        }

        const labelKey = cfg.cdsManagedLabelKey;
        if (marketplace) {
            await procurementManager.syncAllAccountEntitlements(projectId);
        }
        if (bigQueryPermissions) {
            await metaManager.performPolicyUpdates(projectId, null, true, metaManager.filters.BIG_QUERY);
        }
        if (topicPermissions) {
            await metaManager.performPolicyUpdates(projectId, null, true, metaManager.filters.PUB_SUB);
        }
        if (bucketPermissions) {
            await metaManager.performPolicyUpdates(projectId, null, true, metaManager.filters.CLOUD_STORAGE);
        }
        if (views) {
            // Get list of configured views
            const viewResult = await datasetManager.listDatasetViews(projectId, null, true);
            if (viewResult.success) {
                const viewList = viewResult.data;
                const role = await runtimeConfig.bigQueryDataViewerRole(projectId);
                const datasets = await bigqueryUtil.getDatasetsByLabel(labelKey, role);

                for (const dataset of datasets) {
                    const tables = await bigqueryUtil.getTablesByLabel(dataset.datasetId, labelKey);
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
        console.log('Sync completed');
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
    const bigqueryUtil = new BigQueryUtil(projectId);

    let sql = text;
    sql = sql.replace(/\$\{projectId\}/g, projectId);

    const policyTable = bigqueryUtil.getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsPolicyTableId);
    sql = sql.replace(/\$\{policyTable\}/g, policyTable);

    const accountTable = bigqueryUtil.getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsAccountTableId);
    sql = sql.replace(/\$\{accountTable\}/g, accountTable);

    const authorizedViewTable = bigqueryUtil.getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsAuthorizedViewTableId);
    sql = sql.replace(/\$\{authorizedViewTable\}/g, authorizedViewTable);

    const policyView = bigqueryUtil.getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsPolicyViewId);
    sql = sql.replace(/\$\{policyView\}/g, policyView);

    const accountView = bigqueryUtil.getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsAccountViewId);
    sql = sql.replace(/\$\{accountView\}/g, accountView);

    const permissionsDiffProcedure = bigqueryUtil.getTableFqdn(projectId, cfg.cdsDatasetId, cfg.permissionsDiffProcedureId);
    sql = sql.replace(/\$\{permissionsDiffProcedure\}/g, permissionsDiffProcedure);

    const bigQueryPermissionDiffProcedure = bigqueryUtil.getTableFqdn(projectId, cfg.cdsDatasetId, cfg.bigQueryPermissionDiffProcedureId);
    sql = sql.replace(/\$\{bigQueryPermissionDiffProcedure\}/g, bigQueryPermissionDiffProcedure);

    const bucketPermissionDiffProcedure = bigqueryUtil.getTableFqdn(projectId, cfg.cdsDatasetId, cfg.bucketPermissionDiffProcedureId);
    sql = sql.replace(/\$\{bucketPermissionDiffProcedure\}/g, bucketPermissionDiffProcedure);

    const topicPermissionDiffProcedure = bigqueryUtil.getTableFqdn(projectId, cfg.cdsDatasetId, cfg.topicPermissionDiffProcedureId);
    sql = sql.replace(/\$\{topicPermissionDiffProcedure\}/g, topicPermissionDiffProcedure);

    return sql;
}

/**
 * @param  {} projectId
 */
async function setupDatasharePrerequisites(projectId) {
    const bigqueryUtil = new BigQueryUtil(projectId);

    const viewOptions = {
        labels: { [cfg.googPackagedSolutionKey] : cfg.googPackagedSolutionValue }
    };

    if (await bigqueryUtil.datasetExists(cfg.cdsDatasetId) === false) {
        console.log('Creating datashare dataset');
        let labels = { 
            [cfg.cdsMetadataLabelKey]: true,
            [cfg.googPackagedSolutionKey] : cfg.googPackagedSolutionValue
        };

        const options = { description: 'Datashare Master Dataset', labels: labels };
        await bigqueryUtil.createDataset(cfg.cdsDatasetId, options);
    } else {
        console.log('Datashare dataset already exists');
        // Update existing dataset to add the label
        // This can be split out later to an update process if we need to make bigger changes
        await bigqueryUtil.setDatasetLabel(cfg.cdsDatasetId, cfg.cdsMetadataLabelKey, true);
        await bigqueryUtil.setDatasetLabel(cfg.cdsDatasetId, cfg.googPackagedSolutionKey, cfg.googPackagedSolutionValue);
    }

    if (await bigqueryUtil.tableExists(cfg.cdsDatasetId, cfg.cdsPolicyTableId) === false) {
        console.log("Creating policy table");
        const options = Object.assign(viewOptions, require('./bq/schema/policy.json'));
        await bigqueryUtil.createTable(cfg.cdsDatasetId, cfg.cdsPolicyTableId, options);
    } else {
        // Patch the schema
        const options = require('./bq/schema/policy.json');
        await bigqueryUtil.patchTableSchema(cfg.cdsDatasetId, cfg.cdsPolicyTableId, options.schema)
        await bigqueryUtil.setTableLabel(cfg.cdsDatasetId, cfg.cdsPolicyTableId, cfg.googPackagedSolutionKey, cfg.googPackagedSolutionValue)
        console.log('Policy table already exists');
    }

    if (await bigqueryUtil.viewExists(cfg.cdsDatasetId, cfg.cdsPolicyViewId) === false) {
        console.log("Creating latest policies view");
        const sql = sqlReplacements(projectId, require('./bq/view/currentPolicy.sql'));
        await bigqueryUtil.createView(cfg.cdsDatasetId, cfg.cdsPolicyViewId, sql, viewOptions);
    } else {
        await bigqueryUtil.setTableLabel(cfg.cdsDatasetId, cfg.cdsPolicyViewId, cfg.googPackagedSolutionKey, cfg.googPackagedSolutionValue)
        console.log('Policies view already exists');
    }

    if (await bigqueryUtil.tableExists(cfg.cdsDatasetId, cfg.cdsAccountTableId) === false) {
        console.log("Creating account table");
        const options = Object.assign(viewOptions, require('./bq/schema/account.json'));
        await bigqueryUtil.createTable(cfg.cdsDatasetId, cfg.cdsAccountTableId, options);
    } else {
        await bigqueryUtil.setTableLabel(cfg.cdsDatasetId, cfg.cdsAccountTableId, cfg.googPackagedSolutionKey, cfg.googPackagedSolutionValue)
        console.log('Account table already exists');
    }

    if (await bigqueryUtil.viewExists(cfg.cdsDatasetId, cfg.cdsAccountViewId) === false) {
        console.log("Creating latest account view");
        const sql = sqlReplacements(projectId, require('./bq/view/currentAccount.sql'));
        await bigqueryUtil.createView(cfg.cdsDatasetId, cfg.cdsAccountViewId, sql, viewOptions);
    } else {
        await bigqueryUtil.setTableLabel(cfg.cdsDatasetId, cfg.cdsAccountViewId, cfg.googPackagedSolutionKey, cfg.googPackagedSolutionValue)
        console.log('Account view already exists');
    }

    if (await bigqueryUtil.tableExists(cfg.cdsDatasetId, cfg.cdsAuthorizedViewTableId) === false) {
        console.log("Creating authorizedView table");
        const options = Object.assign(viewOptions, require('./bq/schema/authorizedView.json'));
        await bigqueryUtil.createTable(cfg.cdsDatasetId, cfg.cdsAuthorizedViewTableId, options);
    } else {
        await bigqueryUtil.setTableLabel(cfg.cdsDatasetId, cfg.cdsAuthorizedViewTableId, cfg.googPackagedSolutionKey, cfg.googPackagedSolutionValue)
        console.log('Authorized view table already exists');
    }

    if (await bigqueryUtil.viewExists(cfg.cdsDatasetId, cfg.cdsAuthorizedViewViewId) === false) {
        console.log("Creating latest authorizedView view");
        const sql = sqlReplacements(projectId, require('./bq/view/currentAuthorizedView.sql'));
        await bigqueryUtil.createView(cfg.cdsDatasetId, cfg.cdsAuthorizedViewViewId, sql, viewOptions);
    } else {
        await bigqueryUtil.setTableLabel(cfg.cdsDatasetId, cfg.cdsAuthorizedViewViewId, cfg.googPackagedSolutionKey, cfg.googPackagedSolutionValue)
        console.log('Authorized view view already exists');
    }

    if (await bigqueryUtil.viewExists(cfg.cdsDatasetId, cfg.cdsCurrentUserPermissionViewId) === false) {
        console.log("Creating latest currentUserPermission view");
        const sql = sqlReplacements(projectId, require('./bq/view/currentUserPermission.sql'));
        await bigqueryUtil.createView(cfg.cdsDatasetId, cfg.cdsCurrentUserPermissionViewId, sql, viewOptions);
    } else {
        await bigqueryUtil.setTableLabel(cfg.cdsDatasetId, cfg.cdsCurrentUserPermissionViewId, cfg.googPackagedSolutionKey, cfg.googPackagedSolutionValue)
        console.log('Current user dataset view already exists');
    }

    console.log("Creating bigQueryPermissionDiff procedure");
    const bigQueryPermissionDiffProcSql = sqlReplacements(projectId, require('./bq/procedure/bigQueryPermissionDiff.sql'));
    await bigqueryUtil.executeQuerySync({
        query: bigQueryPermissionDiffProcSql
    });

    console.log("Creating bucketPermissionDiff procedure");
    const bucketPermissionDiffProcSql = sqlReplacements(projectId, require('./bq/procedure/bucketPermissionDiff.sql'));
    await bigqueryUtil.executeQuerySync({
        query: bucketPermissionDiffProcSql
    });

    console.log("Creating topicPermissionDiff procedure");
    const topicPermissionDiffProcSql = sqlReplacements(projectId, require('./bq/procedure/topicPermissionDiff.sql'));
    await bigqueryUtil.executeQuerySync({
        query: topicPermissionDiffProcSql
    });
}

/**
 * Starts the PubSub listener, and retries if launch failure
 */
async function startPubSubListener() {
    function logRetry(error, attempt) {
        console.warn(`PubSub listener performing retry attempt: ${attempt} after ${error}`);
    }

    // eslint-disable-next-line no-unused-vars
    await retry(async bail => {
        await initializePubSubListener();
    }, {
        retries: 5,
        minTimeout: 30000,
        maxTimeout: 60000,
        onRetry: logRetry
    })
}

/**
 * Initializes PubSub listener for entitlement auto approvals
 */
async function initializePubSubListener() {
    const projectId = await runtimeConfig.getCurrentProjectId();
    if (!projectId) {
        console.log('Could not identify project, will not start up subscription');
        return;
    }

    if (await runtimeConfig.commerceEnabled(projectId) === false) {
        console.log('Marketplace integration is disabled, PubSub listener will not be started');
        return;
    } else {
        console.log(`Initializing PubSub listener`);
    }

    const topicName = `projects/cloudcommerceproc-prod/topics/${projectId}`;
    console.log(`Procurement topic name: ${topicName}`);
    const subscriptionName = `projects/${projectId}/subscriptions/procurement-${projectId}`;
    console.log(`Datashare procurement subscription name: ${subscriptionName}`);
    const pubSubUtil = new PubSubUtil(projectId);
    console.log('Checking if subscription exists');
    const exists = await pubSubUtil.checkIfSubscriptionExists(topicName, projectId, `procurement-${projectId}`);

    if (exists === true) {
        console.log(`Subscription '${subscriptionName}' already exists`)
    } else {
        try {
            const options = {
                ackDeadlineSeconds: 600,
                expirationPolicy: { seconds: null },
                messageRetentionDuration: (60 * 60 * 24 * 7)
            };
            await pubSubUtil.createSubscription(topicName, subscriptionName, options);
            console.log(`Subscription '${subscriptionName}' created.`);
        } catch (err) {
            console.error(`Unable to create subscription: '${subscriptionName}' to topic: '${topicName}'. Ensure that the topic exists and you have the proper permissions.`);
            return;
        }
    }

    // Subscribe
    async function listenForMessages() {
        try {
            console.log(`Creating message handler for subscription: ${subscriptionName}`);
            const messageHandler = async message => {
                console.log(`Received message ${message.id}:`);
                console.log(`\tData: ${message.data}`);
                console.log(`\tAttributes: ${JSON.stringify(message.attributes)}`);

                if (message.data) {
                    const data = JSON.parse(message.data);
                    console.log(`Event type is: ${data.eventType}`);
                    const eventType = data.eventType;
                    if (eventType === 'ENTITLEMENT_CREATION_REQUESTED' || eventType === 'ENTITLEMENT_PLAN_CHANGE_REQUESTED') {
                        // Perform auto-approve here for policies that have auto-approve enabled
                        console.log(`Running auto approve for eventType: ${eventType}`);
                        await procurementManager.autoApproveEntitlement(projectId, data.entitlement.id)
                    } else if (eventType === 'ENTITLEMENT_ACTIVE') {
                        // Grant permissions for newly active entitlement
                        await procurementManager.activateNewEntitlement(projectId, data.entitlement.id)
                    } else if (eventType === 'ENTITLEMENT_CANCELLED' || eventType === 'ENTITLEMENT_DELETED' || eventType === 'ENTITLEMENT_SUSPENDED') {
                        // Remove user from the policy
                        console.log(`Running cancellation for eventType: ${eventType}`);
                        await procurementManager.cancelEntitlement(projectId, data.entitlement.id)
                    } else if (eventType === 'ENTITLEMENT_PLAN_CHANGED') {
                        // Grant permissions for the plan change
                        console.log(`Running auto approve for eventType: ${eventType}`);
                        await procurementManager.activateNewPlanChange(projectId, data.entitlement.id);
                    } else if (eventType === 'ACCOUNT_DELETED') {
                        // Delete the user account
                        console.log(`Running delete account for eventType: ${eventType}`);
                        await procurementManager.deleteAccount(projectId, data.account.id);
                    } else {
                        console.debug(`Event type not implemented: ${eventType}`);
                    }
                }

                // "Ack" (acknowledge receipt of) the message
                message.ack();
            };

            // Create an event handler to handle errors
            const errorHandler = function (error) {
                console.error(`ERROR: ${error}`);
            };

            const subscriberOptions = {
                flowControl: {
                    maxMessages: 1,
                }
            };
            let subscription = pubSubUtil.getSubscription(subscriptionName, subscriberOptions);
            subscription.on('message', messageHandler);
            subscription.on('error', errorHandler);
            subscription.on('close', () => { console.error('Subscription closed') });
            subscription.detached((err, exists) => {
                console.log(`Is subscription detached: ${exists}`);
                if (err) {
                    console.error(err);
                }
            });
        } catch (err) {
            console.error(err);
        }
    }

    // If a new subscription was created, delay to give it time to finish creating
    // Even though the create returns a subscription object, you can't attached to .on immediately
    let delay = exists === true ? 0 : 60000;
    setTimeout(listenForMessages, delay);
}

/**
 * Gets list of authenticated application users
 */
async function listApplicationUsers() {
    const result = await fbAdmin.auth().tenantManager().authForTenant(config.tenantId).listUsers().then(result => {
        return result.users.map(record => {
            const user = record.toJSON();
            let r = {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                emailVerified: user.emailVerified,
                disabled: user.disabled,
                photoURL: user.photoURL
            };
            const claims = user.customClaims;
            if (claims) {
                r.customClaims = claims;
            }
            const meta = user.metadata;
            if (meta) {
                if (meta.lastSignInTime) {
                    r.lastSignInTime = meta.lastSignInTime;
                }
                if (meta.creationTime) {
                    r.creationTime = meta.creationTime;
                }
            }
            return r;
        })
    });
    return result;
}

module.exports = {
    initializeSchema,
    syncResources,
    startPubSubListener,
    listApplicationUsers
};

