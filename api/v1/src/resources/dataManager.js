/**
 * Copyright 2021 Google LLC
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

const config = require('../lib/config');
const NodeCache = require("node-cache");
const dsCache = new NodeCache();
const dashboardCacheKey = 'dashboardCounts';
const { CommonUtil } = require('cds-shared');
const commonUtil = CommonUtil;
const runtimeConfig = require('../lib/runtimeConfig');
const datasetManager = require('../datasets/dataManager');
const pubsubManager = require('../pubsub/dataManager');
const storageManager = require('../storage/dataManager');
const accountManager = require('../accounts/dataManager');
const policyManager = require('../policies/dataManager');
const procurementManager = require('../procurements/dataManager');

/**
 * @param  {} projectId
 * @param  {} token
 */
async function getConfiguration(projectId, token) {
    let dict = {};
    const commerce = await runtimeConfig.marketplaceIntegration(projectId);
    const dataProducer = await isDataProducer(token);
    const currentProjectId = await runtimeConfig.getCurrentProjectId();
    dict.apiProjectId = currentProjectId;

    // If projectId is null, default to the current projectId
    if (projectId) {
        dict.projectId = projectId;
    } else {
        dict.projectId = currentProjectId;
    }

    dict.isDataProducer = dataProducer;
    dict.isMarketplaceEnabled = commerce;

    // Append UI labels
    if (config.managedProjects) {
        if (projectId in config.managedProjects) {
            const projectDict = config.managedProjects[projectId];
            if (projectDict.labels) {
                dict.labels = projectDict.labels;
            }
        }
    }

    if (!dict.labels) {
        dict.labels = {};
    }

    return dict;
}

/**
 * @param  {} token
 */
async function isDataProducer(token) {
    if (!config.dataProducers) {
        console.error('DATA_PRODUCERS environmental variable is not defined');
        return false;
    }

    // https://github.com/googleapis/google-auth-library-nodejs#oauth2
    const { OAuth2Client } = require('google-auth-library');
    const CLIENT_ID = config.oauthClientId;
    const client = new OAuth2Client(CLIENT_ID);

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['email'];
    // const domain = payload['hd'];

    let isProducer = false;
    for (const p of config.dataProducers) {
        if (p.toLowerCase() === userid.toLowerCase()) {
            isProducer = true;
            break;
        }
        else if (p.includes('*') || p.includes('?')) {
            if (commonUtil.wildTest(p.toLowerCase(), userid.toLowerCase())) {
                isProducer = true;
                break;
            }
        }
    }
    return isProducer;
}

/**
 * @param  {} projectId
 * @param  {} email
 */
async function getDashboardCounts(projectId, email) {
    let counts = dsCache.get(dashboardCacheKey);
    if (counts == undefined) {
        counts = {};
        await datasetManager.listDatasets(projectId).then(result => {
            if (result.success === true) {
                counts.datasets = result.data.length;
            }
        });
        await datasetManager.listDatasetViews(projectId).then(result => {
            if (result.success === true) {
                counts.views = result.data.length;
            }
        });
        await pubsubManager.listTopics(projectId).then(result => {
            if (result.success === true) {
                counts.topics = result.data.length;
            }
        });
        await storageManager.listBuckets(projectId).then(result => {
            if (result.success === true) {
                counts.buckets = result.data.length;
            }
        });
        await accountManager.listAccounts(projectId).then(result => {
            if (result.success === true) {
                counts.accounts = result.data.length;
            }
        });
        await policyManager.listPolicies(projectId).then(result => {
            if (result.success === true) {
                counts.policies = result.data.length;
            }
        });

        if (await runtimeConfig.marketplaceIntegration(projectId) === true) {
            await procurementManager.listProcurements(projectId, ['ENTITLEMENT_ACTIVATION_REQUESTED']).then(result => {
                if (result.success === true) {
                    counts.procurements = result.data.length;
                }
            });
        }

        if (counts) {
            dsCache.set(dashboardCacheKey, counts, 60);
        }
    }

    if (await runtimeConfig.marketplaceIntegration(projectId) === true) {
        await policyManager.listUserPolicies(projectId, email).then(result => {
            if (result.success === true) {
                counts.myProducts = result.data.length;
            }
        });
    }
    return counts;
}

module.exports = {
    getConfiguration,
    getDashboardCounts
};

