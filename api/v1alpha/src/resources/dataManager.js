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
 */
async function getManagedProjects() {
    const { Resource } = require('@google-cloud/resource-manager');
    const options = {
        scopes: ['https://www.googleapis.com/auth/cloud-platform']
    };
    const resource = new Resource(options);

    // https://cloud.google.com/resource-manager/reference/rest/v1/projects/list
    const [projects] = await resource.getProjects();
    const include = Object.keys(config.managedProjects);
    const list = projects.filter(project => include.includes(project.id)).map(project => project.id).sort(function (a, b) {
        return a
            .toLowerCase()
            .localeCompare(b.toLowerCase());
    });
    return list;
}

/**
 * @param  {} projectId
 * @param  {} token
 */
async function getConfiguration(projectId, token) {
    let dict = {};
    let commerce = await runtimeConfig.marketplaceIntegration(projectId);
    let dataProducer = await isDataProducer(token);
    dict.apiProjectId = await getCurrentProjectId();
    dict.projectId = projectId;
    dict.isDataProducer = dataProducer;
    dict.isMarketplaceEnabled = commerce;

    if (config.managedProjects) {
        if (projectId in config.managedProjects) {
            const projectDict = config.managedProjects[projectId];
            dict.labels = projectDict;
        }
    }

    if (!dict.labels) {
        dict.labels = { };
    }

    if (!dict.labels.VUE_APP_USER_GUIDE_URL) {
        dict.labels.VUE_APP_USER_GUIDE_URL = config.appUserGuideUrl;
    }

    if (!dict.labels.VUE_APP_GITHUB_URL) {
        dict.labels.VUE_APP_GITHUB_URL = config.githubUrl;
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
        console.log(`p: ${p}, hd: ${domain}`);
        if (p.toLowerCase() === userid.toLowerCase()) {
            isProducer = true;
            break;
        }
        else if (p.includes('*') || p.includes('?')) {
            if (commonUtil.wildTest(p, userid.toLowerCase())) {
                console.log('wild test matched');
                isProducer = true;
                break;
            }
        }
    }
    return isProducer;
}

/**
 */
async function getCurrentProjectId() {
    let projectId = config.projectId;
    if (!projectId) {
        // If projectId is not available, attempt fallback using gcp-metadata
        // https://github.com/googleapis/gcp-metadata
        // https://cloud.google.com/appengine/docs/standard/java/accessing-instance-metadata
        const gcpMetadata = require('gcp-metadata');
        const isAvailable = await gcpMetadata.isAvailable();
        if (isAvailable === true) {
            console.log('gcpMetadata is available, getting projectId');
            projectId = await gcpMetadata.project('project-id');
            console.log(`Project Id of running instance: ${projectId}`); // ...Project ID of the running instance
        } else {
            console.log('Could not identify current project');
        }
    }
    return projectId;
}

module.exports = {
    getManagedProjects,
    getConfiguration,
    getCurrentProjectId
};

