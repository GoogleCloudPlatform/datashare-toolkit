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

const fs = require('fs');
const bigqueryUtil = require("./bigqueryUtil")
const configUtil = require("./configUtil")
const sqlBuilder = require("./sqlBuilder")
const configValidator = require("./configValidator")
const RuntimeConfiguration = require("./runtimeConfiguration")
const YAML = require('yaml')
const uuidv4 = require('uuid/v4')

/**
 * @param  {} path
 */
async function processEntitlementConfigFile(filePath) {
    if (!fs.existsSync(filePath)) {
        console.log(`Configuration file not found at '${filePath}'`);
        return;
    }

    let data = fs.readFileSync(filePath, { encoding: 'utf8' });
    var path = require('path')
    let extension = path.extname(filePath).toLowerCase();

    var config;
    if (extension == ".json") {
        if (configValidator.isJsonString(data) === false) {
            console.log("Configuration is not valid JSON");
            return;
        }
        config = JSON.parse(data);
    }
    else if (extension == ".yaml") {
        if (configValidator.isYamlString(data) === false) {
            console.log("Configuration is not valid YAML");
            return;
        }
        config = YAML.parse(data);
    }
    if (config) {
        await processEntitlementConfig(config);
    }
}
/**
 * @param  {} config
 * This should be be a JSON object.
 */
async function processEntitlementConfig(config) {
    await bigqueryUtil.init(config.projectId);

    var prerequisiteComplete = false;
    if (RuntimeConfiguration.DRY_RUN === false) {
        console.log("-------------------START - setupPrerequisites-------------------");
        await setupPrerequisites(config);
        console.log("-------------------END - setupPrerequisites-------------------\n");
        prerequisiteComplete = true;
    }
    else {
        console.log("Prerequisite setup was skipped because --dry-run is enabled");
    }

    if (RuntimeConfiguration.PREREQUISITE_SETUP_ONLY) {
        if (prerequisiteComplete) {
            console.log("Prerequisite setup is completed");
        }
        process.exit(0);
    }

    console.log("-------------------START - configValidator-------------------");
    let isValid = await configValidator.validate(config);
    console.log("-------------------END - configValidator-------------------\n");

    if (RuntimeConfiguration.DRY_RUN) {
        console.log("Dry-run validation is completed");
        if (isValid) {
            process.exit(0);
        }
        else {
            process.exit(1);
        }
    }
    else if (isValid === false) {
        console.log("Configuration is invalid, exiting now.")
        process.exit(1);
    }

    console.log("-------------------START - processConfiguration-------------------");
    await processConfiguration(config);
    console.log("-------------------END - processConfiguration-------------------\n");

    console.log("-------------------START - processAccessPermissions-------------------");
    await processAccessPermissions(config);
    console.log("-------------------END - processAccessPermissions-------------------\n");

    console.log("-------------------START - removeStaleObjects-------------------");
    await removeStaleObjects(config);
    console.log("-------------------END - removeStaleObjects-------------------\n");

    if (RuntimeConfiguration.REFRESH_DATASET_PERMISSION_TABLE) {
        console.log("-------------------START - refreshDatasetPermissionTable-------------------");
        await refreshDatasetPermissionTable(config);
        console.log("-------------------END - refreshDatasetPermissionTable-------------------\n");
    }
}

/**
 * @param  {} config
 */
async function setupPrerequisites(config) {
    if (configUtil.isAccessControlDatasetUsed(config) === true) {
        if (await bigqueryUtil.datasetExists(config.accessControl.datasetId) === false) {
            console.log("Creating provisioning dataset");
            await bigqueryUtil.createDataset(config.accessControl.datasetId);
        }
        else {
            console.log("Provisoning dataset already exists");
        }

        if (await bigqueryUtil.tableExists(config.projectId, config.accessControl.datasetId, "groupEntitlements") === false) {
            const groupEntitlementSchema = [{
                "name": "groupName",
                "type": "STRING",
                "mode": "REQUIRED"
            },
            {
                "name": "accessControlLabel",
                "type": "STRING",
                "mode": "REQUIRED"
            }];
            await bigqueryUtil.createTable(config.accessControl.datasetId, "groupEntitlements", groupEntitlementSchema);
        }
        if (await bigqueryUtil.tableExists(config.projectId, config.accessControl.datasetId, "groups") === false) {
            const groupsSchema = [{
                "name": "groupName",
                "type": "STRING",
                "mode": "REQUIRED"
            },
            {
                "name": "viewName",
                "type": "STRING",
                "mode": "REQUIRED"
            },
            {
                "name": "user",
                "type": "STRING",
                "mode": "REQUIRED"
            }];
            await bigqueryUtil.createTable(config.accessControl.datasetId, "groups", groupsSchema);
        }
        if (await bigqueryUtil.viewExists(config.projectId, config.accessControl.datasetId, config.accessControl.viewId) === false) {
            const viewSql = `select lower(g.viewName) as viewName, e.accessControlLabel\nfrom \`${config.projectId}.${config.accessControl.datasetId}.groups\` g\njoin \`${config.projectId}.${config.accessControl.datasetId}.groupEntitlements\` e on lower(g.groupName) = lower(e.groupName)\nwhere lower(g.user) = lower(session_user())`;
            await bigqueryUtil.createView(config.projectId, config.accessControl.datasetId, config.accessControl.viewId, viewSql, true, null, null);
        }
    }

    if (RuntimeConfiguration.REFRESH_DATASET_PERMISSION_TABLE === true) {
        if (await bigqueryUtil.tableExists(config.projectId, config.accessControl.datasetId, "datasetPermissions") === false) {
            const userPermissionsSchema = [{
                "name": "uuid",
                "type": "STRING",
                "mode": "REQUIRED"
            },
            {
                "name": "configurationName",
                "type": "STRING",
                "mode": "REQUIRED"
            }, {
                "name": "datasetId",
                "type": "STRING",
                "mode": "REQUIRED"
            },
            {
                "name": "accessType",
                "type": "STRING",
                "mode": "REQUIRED"
            },
            {
                "name": "accessId",
                "type": "STRING",
                "mode": "REQUIRED"
            },
            {
                "name": "role",
                "type": "STRING",
                "mode": "REQUIRED"
            },
            {
                "name": "lastUpdated",
                "type": "TIMESTAMP",
                "mode": "REQUIRED"
            }];
            await bigqueryUtil.createTable(config.accessControl.datasetId, "datasetPermissions", userPermissionsSchema);
        }
        if (await bigqueryUtil.viewExists(config.projectId, config.accessControl.datasetId, "latestDatasetPermissions") === false) {
            const viewSql = `WITH RANKED AS (\n  select\n    configurationName,\n    uuid,\n    DENSE_RANK() OVER (PARTITION BY configurationName ORDER BY lastUpdated) as rank\n  from \`${config.projectId}.${config.accessControl.datasetId}.datasetPermissions\`\n),\nROWIDENTIFIERS AS (\n  SELECT r.uuid\n  from RANKED r\n  where r.rank = (select max(r2.rank) from RANKED r2 where r2.configurationName = r.configurationName)\n)\nSELECT\n * EXCEPT(uuid)\nFROM \`${config.projectId}.${config.accessControl.datasetId}.datasetPermissions\` t\nWHERE EXISTS (SELECT 1 from ROWIDENTIFIERS r WHERE t.uuid = r.uuid)`;
            await bigqueryUtil.createView(config.projectId, config.accessControl.datasetId, "latestDatasetPermissions", viewSql, true, null, null);
        }
    }
}

/**
 * @param  {} configuration
 */
async function processConfiguration(config) {
    let views = config.views;
    console.log("Project name is '%s'", config.projectId);

    for (const view of views) {
        for (const ds of view.datasetNames) {
            console.log("Processing datasetName: %s, viewName: %s", ds, view.name);
            const _datasetExists = await bigqueryUtil.datasetExists(ds);
            if (_datasetExists === false) {
                console.log("Dataset '%s' doesn't exist, creating it now", ds);
                const datasetCreated = await bigqueryUtil.createDataset(ds, config.name);
                if (datasetCreated === false) {
                    console.log("Failed to create Dataset '%s', continuing to next view", ds);
                    continue;
                }
            }

            const viewSql = await sqlBuilder.generateSql(config, ds, view);
            var metadataResult = await bigqueryUtil.getTableMetadata(ds, view.name);

            var _viewMetadata = metadataResult.metadata;
            const _viewExists = metadataResult.exists;

            var createViewResult;
            var viewCreated = false;
            let configuredExpirationTime = view.expiration && view.expiration.delete === true ? view.expiration.time : null;

            // Check if the view exists
            if (_viewExists === true) {
                console.log("View '%s' already exists, checking if it's up to date", view.name);
                const _viewDefinition = _viewMetadata.view.query;

                if (viewSql.replace("\n", "") === _viewDefinition.replace("\n", "")) {
                    console.log("SQL text is identitical");
                }
                else {
                    const isValid = await bigqueryUtil.validateQuery(viewSql, 5);
                    if (isValid === false) {
                        console.log("Query is invalid, skipping to next view");
                        continue;
                    }
                    console.log(`SQL text is different, need to re-create view\nView Definition:\n${_viewDefinition}\n\nConfig SQL:\n${viewSql}`);

                    createViewResult = await bigqueryUtil.createView(config.projectId, ds, view.name, viewSql, true, config.name, configuredExpirationTime);
                    if (createViewResult.success === false) {
                        console.log("Failed to create view, skipping to next view");
                        continue;
                    }
                    else {
                        // If view is deleted and recreated we need to refresh metadata
                        _viewMetadata = createViewResult.metadata;
                    }
                }

                var currentExpiryTime = _viewMetadata.expirationTime;

                if (RuntimeConfiguration.VERBOSE_MODE) {
                    console.log(`expirationTime for view '${view.name}' is ${currentExpiryTime}`);
                }

                // Update expirationTime for view
                // Deleting the property doesn't remove it from metadata, setting it to null removes it
                if (configuredExpirationTime != currentExpiryTime) {
                    console.log(`Configured expirationTime is different than the value for view '${view.name}'`);
                    _viewMetadata.expirationTime = configuredExpirationTime;
                    await bigqueryUtil.setTableMetadata(ds, view.name, _viewMetadata);
                }
                else {
                    if (RuntimeConfiguration.VERBOSE_MODE) {
                        console.log(`expirationTime for view '${view.name}' is in-sync`);
                    }
                }
            }
            else {
                // This else block is a bit redundant as it has the same code as above (except the deleteIfExists flag)
                const isValid = bigqueryUtil.validateQuery(viewSql, 5);
                if (isValid === false) {
                    console.log("Query is invalid, skipping to next view");
                    continue;
                }
                createViewResult = await bigqueryUtil.createView(config.projectId, ds, view.name, viewSql, false, config.name, configuredExpirationTime);
            }

            var viewCreated = createViewResult && createViewResult.success;
            console.log("Authorizing view objects for access from other datasets");
            if (!view.hasOwnProperty('custom')) {
                let source = view.source;
                // Need to authorize the view from the source tables
                await bigqueryUtil.shareAuthorizeView(source.datasetId, config.projectId, ds, view.name, viewCreated);

                if (source.accessControl && source.accessControl.datasetEnabled && source.accessControl.datasetEnabled === true) {
                    await bigqueryUtil.shareAuthorizeView(config.accessControl.datasetId, config.projectId, ds, view.name, viewCreated);
                }
            }
            else {
                // Custom sql
                let custom = view.custom;
                if (custom.authorizeFromDatasetIds && custom.authorizeFromDatasetIds.length > 0) {
                    for (const d of view.custom.authorizeFromDatasetIds) {
                        const ads = configUtil.performTextVariableReplacements(config, null, d);
                        await bigqueryUtil.shareAuthorizeView(ads, config.projectId, ds, view.name, viewCreated);
                    }
                }
            }
        }
    }
}

/**
 * @param  {} config
 */
async function processAccessPermissions(config) {
    const [datasets] = await bigqueryUtil.getDatasets();
    const _role = "READER";

    for (const ds of config.datasets) {
        if (!ds.name) {
            console.log("Dataset name is missing, continuing");
            continue;
        }
        if (!bigqueryUtil.datasetExists(ds.name, datasets)) {
            console.log(`Dataset '${ds.name}' does not exist in BQ, skipping this dataset`);
            continue;
        }

        // Create array to hold the list of configured access items
        const configuredAccessRecords = configUtil.concatentateAccessItems(config, ds);
        console.log(`Dataset: '${ds.name}' - current access: ${JSON.stringify(configuredAccessRecords)}`);

        // Get the metadata for the current dataset
        var metadata = await bigqueryUtil.getDatasetMetadata(ds.name);

        if (!metadata.access) {
            metadata.access = [];
        }

        var hasChanges = false;

        // Iterate through the configured access groups to add any that are not in the metadata
        configuredAccessRecords.forEach(function (c) {
            // Add role to the record as we currently set it to 'READER' by default
            var newRecord = c;
            newRecord["role"] = _role;

            var found = metadata.access.find(function (bq) {
                if (configUtil.accessItemsEqual(newRecord, bq)) {
                    return true;
                }
            });
            if (!found) {
                // Push it into the array
                metadata.access.push(newRecord);
                hasChanges = true;
            }
        });

        // Iterate through the metadata to remove any users no longer in the configuration
        var i = metadata.access.length;
        while (i--) {
            var bq = metadata.access[i];

            // Skip non-READER roles
            if (bq.role != _role) {
                continue;
            }
            var found = configuredAccessRecords.find(function (c) {
                // Add role to the record as we currently set it to 'READER' by default
                var newRecord = c;
                newRecord["role"] = _role;
                if (configUtil.accessItemsEqual(newRecord, bq)) {
                    return true;
                }
            });

            if (!found) {
                // Remove from array
                metadata.access.splice(i, 1);
                hasChanges = true;
            }
        }

        if (hasChanges === true) {
            console.log("Applying changes for: " + JSON.stringify(metadata, null, 2));
            await bigqueryUtil.setDatasetMetadata(ds.name, metadata);
            const updatedMetadata = await bigqueryUtil.getDatasetMetadata(ds.name);

            if (RuntimeConfiguration.VERBOSE_MODE) {
                console.log("Changes applied: " + JSON.stringify(updatedMetadata, null, 2));
            }
        }
        else {
            console.log(`Dataset: '${ds.name}' - no permission changes required`);
        }
    }
}

/**
 * @param  {} config
 */
async function removeStaleObjects(config) {
    const [datasets] = await bigqueryUtil.getDatasets();
    const entitlementDataset = config.accessControl ? config.accessControl.datasetId : null;

    for (const ds of datasets) {
        var isEntitlementDataset = false;
        if (entitlementDataset && ds.id.toLowerCase() === entitlementDataset.toLowerCase()) {
            isEntitlementDataset = true;
        }

        var isDatasetRequired = true;
        var hasManagedTables = false;
        var hasNonManagedTables = false;
        var isDatasetMetadataUpdateRequired = false;

        var dsMetadata = await bigqueryUtil.getDatasetMetadata(ds.id);

        if (isEntitlementDataset == true) {
            // Remove authorized views for which the view object doesn't exist anymore
            var i = dsMetadata.access.length;
            while (i--) {
                var a = dsMetadata.access[i];
                if (a.view && a.view.projectId && a.view.datasetId && a.view.tableId) {
                    const _viewExists = await bigqueryUtil.viewExists(a.view.projectId, a.view.datasetId, a.view.tableId);
                    if (_viewExists === false) {
                        isDatasetMetadataUpdateRequired = true;
                        dsMetadata.access.splice(i, 1);
                    }
                }
            }
        }
        else if (dsMetadata.labels && dsMetadata.labels[RuntimeConfiguration.BQDS_CONFIGURATION_NAME_LABEL_KEY] == config.name) {
            console.log(`Dataset is managed: '${ds.id}'`);

            // If within a dataset, check it's authorized views and remove invalid objects?
            const isConfigured = configUtil.configurationContainsDataset(config, ds.id);

            if (isConfigured == false) {
                // Delete the dataset if there are no non-managed objects within
                isDatasetRequired = false;
                console.log(`Dataset '${ds.id}' is not required by the configuration`);
            }

            // Remove authorized views for which the view object doesn't exist anymore
            var i = dsMetadata.access.length;
            while (i--) {
                var a = dsMetadata.access[i];
                if (a.view && a.view.projectId && a.view.datasetId && a.view.tableId) {
                    const _viewExists = await bigqueryUtil.viewExists(a.view.projectId, a.view.datasetId, a.view.tableId);
                    if (_viewExists === false) {
                        isDatasetMetadataUpdateRequired = true;
                        dsMetadata.access.splice(i, 1);
                    }
                }
            }
        }
        else if (RuntimeConfiguration.VERBOSE_MODE) {
            console.log(`Dataset is non-managed: '${ds.id}'`);
        }

        const [tables] = await ds.getTables();
        for (const table of tables) {
            if (table.metadata.labels && table.metadata.labels[RuntimeConfiguration.BQDS_CONFIGURATION_NAME_LABEL_KEY] == config.name) {
                console.log(`View is managed: '${table.id}'`);
                const isConfigured = await configUtil.configurationContainsView(config, ds.id, table.id);

                if (isConfigured === false) {
                    // Delete the View
                    console.log(`View '${table.id}' is not required by the configuration and will be deleted`);
                    await bigqueryUtil.deleteTable(ds.id, table.id);
                }
                else {
                    hasManagedTables = true;
                }
            }
            else {
                hasNonManagedTables = true;

                if (RuntimeConfiguration.VERBOSE_MODE) {
                    console.log(`Dataset '${ds.id}' contains non-managed table '${table.id}'`);
                }
            }
        }

        if (isDatasetRequired === false && hasNonManagedTables === false && hasManagedTables === false) {
            // Delete the Dataset
            console.log(`Dataset '${ds.id}' will be deleted`);
            await bigqueryUtil.deleteDataset(ds.id);
        }
        else if (isDatasetMetadataUpdateRequired === true) {
            console.log(`Updating metadata for Dataset '${ds.id}'`);
            await bigqueryUtil.setDatasetMetadata(ds.id, dsMetadata);
        }
        else {
            if (RuntimeConfiguration.VERBOSE_MODE) {
                console.log(`Dataset '${ds.id}' will not be affected`);
            }
        }
    }
}

/**
 * @param  {} config
 */
async function refreshDatasetPermissionTable(config) {
    const uuid = uuidv4();
    const [datasets] = await bigqueryUtil.getDatasets();
    let accessRecords = [];
    const date = new Date();
    for (const ds of datasets) {
        const dsMetadata = await bigqueryUtil.getDatasetMetadata(ds.id);
        if (dsMetadata.labels && dsMetadata.labels[RuntimeConfiguration.BQDS_CONFIGURATION_NAME_LABEL_KEY] == config.name) {
            if (dsMetadata.access && dsMetadata.access.length > 0) {
                dsMetadata.access.forEach(function (a) {
                    const keys = Object.keys(a);
                    if (keys.length == 2) {
                        const accessType = keys[1];
                        const accessId = a[accessType];
                        // console.log(`Role: ${a.role} AccessType: ${accessType} AccessId: ${accessId}`);
                        accessRecords.push({ uuid: uuid, configurationName: config.name, datasetId: ds.id, accessType: accessType, accessId: accessId, role: a.role, lastUpdated: date });
                    }
                });
            }
        }
    }
    await bigqueryUtil.insertRows(config.accessControl.datasetId, "datasetPermissions", accessRecords);
}

module.exports = {
    processEntitlementConfigFile
}
