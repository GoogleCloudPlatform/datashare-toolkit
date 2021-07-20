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

class RuntimeConfig {
    async marketplaceIntegration(projectId) {
        let enabled = false;
        if (config.managedProjects) {
            if (projectId in config.managedProjects) {
                const projectDict = config.managedProjects[projectId];
                if (projectDict.MARKETPLACE_INTEGRATION_ENABLED === true) {
                    enabled = await this.commerceEnabled(projectId);
                }
            }
        }
        return enabled;
    }

    /**
    * @param  {} projectId
    */
    async commerceEnabled(projectId) {
        // TODO: Enable serviceusage.googleapis.com API through deployment documentation
        // https://cloud.google.com/service-usage/docs/access-control

        // Imports the Google Cloud client library
        const { ServiceUsageClient } = require('@google-cloud/service-usage');

        const parent = `projects/${projectId}`, // Project to list service usage for.
            filter = 'state:ENABLED' // Filter when listing services.

        // Creates a client
        const client = new ServiceUsageClient();

        // gcloud services disable cloudcommerceproducer.googleapis.com --force
        // gcloud services disable cloudcommerceprocurement.googleapis.com --force
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
}

module.exports = new RuntimeConfig();
