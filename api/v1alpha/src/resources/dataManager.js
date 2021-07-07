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

async function getConfiguration(projectId) {

}

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

module.exports = {
    getManagedProjects,
    getConfiguration,
    isDataProducer
};

