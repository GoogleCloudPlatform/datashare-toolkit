/**
 * Copyright 2019 Google LLC
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

/**
 * Returns bool indicating if public access is enabled for the source.
 * @param  {} view
 */
function isPublicAccessEnabled(view) {
    let source = view.source;
    if (source.hasOwnProperty('publicAccess')) {
        let publicAccess = source.publicAccess;
        if (publicAccess.enabled && publicAccess.queryFilter && publicAccess.queryFilter.trim().length > 0) {
            return true;
        }
    }
    return false;
}

/**
 * @param  {} config
 * @param  {} datasetId
 * TODO: Rename this function, doesn't make sense.
 */
function configurationContainsDataset(config, datasetId) {
    for (const view of config.views) {
        for (const ds of view.datasetNames) {
            if (ds.toLowerCase() === datasetId.toLowerCase()) {
                return true;
            }
        }
    }
    for (const ds of config.datasets) {
        if (ds.name.toLowerCase() === datasetId.toLowerCase()) {
            console.log(`datasetId: ${ds.name} exists in the configuration datasets array, but there are no configured views that reference the datasetId`);
            return true;
        }
    }
    return false;
}

/**
 * @param  {} config
 * @param  {} viewId
 */
async function configurationContainsView(config, datasetId, viewId) {
    for (const view of config.views) {
        if (view.name.toLowerCase() !== viewId.toLowerCase()) {
            continue;
        }
        const dsFound = view.datasetNames.find((d) => {
            return d.toLowerCase() === datasetId.toLowerCase();
        });
        if (dsFound !== undefined) {
            return true;
        }
    }
    return false;
}

/**
 * @param  {} config
 * @param  {} datasetId
 */
function findDataset(config, datasetId) {
    if (config.datasets && config.datasets.length > 0) {
        for (const ds of config.datasets) {
            if (ds.name && datasetId && ds.name.toLowerCase() === datasetId.toLowerCase()) {
                return ds;
            }
        }
    }
    return null;
}

/**
 * @param  {} config
 * @param  {} groupName
 */
function findGroup(config, groupName) {
    if (config.groups && config.groups.length > 0) {
        const groupFound = config.groups.find((g) => {
            return g.name === groupName;
        });
        if (groupFound !== undefined) {
            return groupFound;
        }
    }
    return null;
}

/**
 * @param  {} config
 */
function isAccessControlDatasetUsed(config) {
    let accessControlDatasetUsed = false;
    if (config.views && config.views.length > 0) {
        for (const v of config.views) {
            let source = v.source;
            if (source) {
                if (source.accessControl && source.accessControl.enabled && source.accessControl.enabled === true && source.accessControl.datasetEnabled && source.accessControl.datasetEnabled === true) {
                    accessControlDatasetUsed = true;
                    break;
                }
            }
        }
    }
    return accessControlDatasetUsed;
}

/**
 * @param  {} config
 * @param  {} ds
 */
function concatentateAccessItems(config, ds) {
    // Create array to hold the list of configured access items
    let accessRecords = [];

    // Add access records from dataset
    if (ds.access && ds.access.length > 0) {
        accessRecords = accessRecords.concat(ds.access);
    }

    // Iterate to get access for any groups that exist
    if (ds.groupNames && ds.groupNames.length > 0) {
        ds.groupNames.forEach((groupName) => {
            const foundGroup = findGroup(config, groupName);
            if (foundGroup && foundGroup.access && foundGroup.access.length > 0) {
                accessRecords = accessRecords.concat(foundGroup.access);
            }
        });
    }

    return accessRecords;
}

/**
 * @param  {} access1
 * @param  {} access2
 */
function accessItemsEqual(access1, access2) {
    if (access1.role === access2.role &&
        access1.userByEmail === access2.userByEmail &&
        access1.groupByEmail === access2.groupByEmail &&
        access1.domain === access2.domain &&
        access1.specialGroup === access2.specialGroup &&
        access1.iamMember === access2.iamMember) {
        return true;
    }
    return false;
}

/**
 * @param  {} config
 * @param  {} view
 * @param  {} text
 */
function performTextVariableReplacements(config, view, text) {
    if (!text) {
        return text;
    }
    if (config.projectId) {
        text = text.replace(/\$\{projectId\}/g, config.projectId);
    }
    if (config.accessControl) {
        if (config.accessControl.datasetId) {
            text = text.replace(/\$\{accessControl\.datasetId\}/g, config.accessControl.datasetId);
        }
        if (config.accessControl.viewId) {
            text = text.replace(/\$\{accessControl\.viewId\}/g, config.accessControl.viewId);
        }
    }
    return text;
}

module.exports = {
    isPublicAccessEnabled,
    configurationContainsDataset,
    findDataset,
    configurationContainsView,
    findGroup,
    isAccessControlDatasetUsed,
    performTextVariableReplacements,
    concatentateAccessItems,
    accessItemsEqual
};