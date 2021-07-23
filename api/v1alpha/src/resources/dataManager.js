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

const { CommonUtil } = require('cds-shared');
const commonUtil = CommonUtil;
const runtimeConfig = require('../lib/runtimeConfig');

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
        dict.labels = { };
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
    const domain = payload['hd'];

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

module.exports = {
    getConfiguration
};

