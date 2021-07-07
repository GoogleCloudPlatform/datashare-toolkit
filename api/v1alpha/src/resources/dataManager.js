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

const config = require('../lib/config');

const { CommonUtil } = require('cds-shared');
const commonUtil = CommonUtil;

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
    const include = config.managedProjects;
    const list = projects.filter(project => include.includes(project.id)).map(project => project.id).sort(function (a, b) {
        return a
            .toLowerCase()
            .localeCompare(b.toLowerCase());
    });
    return list;
}

/**
 * @param  {} projectId
 */
async function getConfiguration(projectId, token) {
    let dict = {};
    let commerce = await commerceEnabled(projectId);
    let dataProducer = await isDataProducer(token)
    dict.isDataProducer = dataProducer;
    dict.isMarketplaceEnabled = commerce;
    return dict;
}

/**
 * @param  {} token
 */
async function isDataProducer(token) {
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
            if (commonUtil.wildTest(p, domain)) {
                isProducer = true;
                break;
            }
        }
    }
    return isProducer;
}

async function commerceEnabled(projectId) {
    // TODO: Enable serviceusage.googleapis.com API through deployment.
    // https://cloud.google.com/service-usage/docs/access-control

    // Imports the Google Cloud client library
    const { ServiceUsageClient } = require('@google-cloud/service-usage');

    const parent = `projects/${projectId}`, // Project to list service usage for.
        filter = 'state:ENABLED' // Filter when listing services.

    // Creates a client
    const client = new ServiceUsageClient();

    let commerceEnabled = false;
    for await (const service of client.listServicesAsync({
        parent,
        filter,
    })) {
        const svc = service.config.name;
        if (svc === 'cloudcommerceproducer.googleapis.com' || svc === 'cloudcommerceprocurement.googleapis.com') {
            commerceEnabled = true;
            break;
        }
    }
    return commerceEnabled;
}

module.exports = {
    getManagedProjects,
    getConfiguration,
    isDataProducer
};

