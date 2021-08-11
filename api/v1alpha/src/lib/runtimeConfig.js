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
const projectIdCacheKey = 'projectId';
const managedProjectsCacheKey = 'managedProjects';

class RuntimeConfig {
    /**
    Gets the current projectId from the configuration if provided,
    or uses gcp-metadata to get current projectId as fallback
     */
    async getCurrentProjectId() {
        // Check if projectId exists in cache first
        let projectId = dsCache.get(projectIdCacheKey);
        if (projectId == undefined) {
            projectId = config.projectId;
            if (!projectId) {
                // If projectId is not available, attempt fallback using gcp-metadata
                // https://github.com/googleapis/gcp-metadata
                // https://cloud.google.com/appengine/docs/standard/java/accessing-instance-metadata
                const gcpMetadata = require('gcp-metadata');
                const isAvailable = await gcpMetadata.isAvailable();
                if (isAvailable === true) {
                    console.log('gcp-metadata is available, getting projectId');
                    projectId = await gcpMetadata.project('project-id');
                    console.log(`Project Id of running instance: ${projectId}`); // ...Project ID of the running instance
                } else {
                    console.log('gcp-metadata is unavailable, unable to identify current project');
                }
            } else {
                console.log('Using projectId from env variable');
            }

            if (projectId) {
                // Set projectId to cache indefinitely
                dsCache.set(projectIdCacheKey, projectId);
            }
        }
        return projectId;
    }

    /**
    Gets the list of managed projects from the configuration and returns list of projects
    that the current account has access to
     */
    async getManagedProjects() {
        // Check if managed projects exists in cache first
        let list = dsCache.get(managedProjectsCacheKey);
        if (list == undefined) {
            if (config.managedProjects) {
                const { Resource } = require('@google-cloud/resource-manager');
                const options = {
                    scopes: ['https://www.googleapis.com/auth/cloud-platform']
                };
                const resource = new Resource(options);

                // https://cloud.google.com/resource-manager/reference/rest/v1/projects/list
                const [projects] = await resource.getProjects();
                const include = Object.keys(config.managedProjects);
                list = projects.filter(project => include.includes(project.id)).map(project => project.id).sort(function (a, b) {
                    return a
                        .toLowerCase()
                        .localeCompare(b.toLowerCase());
                });

                const currentProject = await this.getCurrentProjectId();
                if (include.includes(currentProject) && !list.includes(currentProject)) {
                    // For the use case where the current project isn't returned from the resource manager call, append it to the list
                    // It's safe to do so, as it's already included in the managed project list
                    list.push(currentProject);
                }
            }
            dsCache.set(managedProjectsCacheKey, list);
        }
        return list;
    }

    /**
     * @param  {} projectId
    Returns true if marketplace integration is enabled
     */
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
    Returns true if the procurement services are enabled
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
