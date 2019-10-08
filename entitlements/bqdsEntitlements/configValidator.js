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

const configUtil = require("./configUtil");
const bigqueryUtil = require("./bigqueryUtil");
const sqlBuilder = require("./sqlBuilder");
const RuntimeConfiguration = require("./runtimeConfiguration");
const YAML = require('yaml');
const Validator = require('jsonschema').Validator;

const IssueType = {
    // Informational only
    INFORMATION: 'INFORMATION',

    // Suggested to address/fix in the configuration
    WARNING: 'WARNING',

    // Must be fixed otherwise script will not proceed to execute
    ERROR: 'ERROR'
};

var issues = [];
var [datasets] = [];

/**
 * @param  {} config
 */
async function validate(config) {
    [datasets] = await bigqueryUtil.getDatasets();

    console.log("-------------------START - validateSchema-------------------");
    await validateSchema(config);
    console.log("-------------------END - validateSchema-------------------\n");

    console.log("-------------------START - validateRoot-------------------");
    await validateRoot(config);
    console.log("-------------------END - validateRoot-------------------\n");

    console.log("-------------------START - validateGroups-------------------");
    validateGroups(config);
    console.log("-------------------END - validateGroups-------------------\n");

    console.log("-------------------START - validateDatasets-------------------");
    validateDatasets(config);
    console.log("-------------------END - validateDatasets-------------------\n");

    console.log("-------------------START - validateViews-------------------");
    await validateViews(config);
    console.log("-------------------END - validateViews-------------------\n");

    console.log("-------------------START - validateLabels-------------------");
    await validateLabels(config);
    console.log("-------------------END - validateLabels-------------------\n");

    if (await isValid()) {
        console.log("-------------------START - validateQueries-------------------");
        await validateQueries(config);
        console.log("-------------------END - validateQueries-------------------\n");
    }

    let _isValid = true;
    console.log("-------------------START - Validation Result-------------------");
    if (issues.length > 0) {
        issues.forEach((i) => {
            console.log(`${i.issueType}: ${i.message}`);
            if (i.issueType === IssueType.ERROR) {
                _isValid = false;
            }
        });

        if (_isValid === false) {
            console.log("\nCONFIGURATION HAS VALIDATION ERRORS THAT MUST BE FIXED");
            console.log("INFORMATION = Informational");
            console.log("WARNING = Suggested to address/fix in the configuration");
            console.log("ERROR = Must be fixed otherwise script will not proceed to execute\n");
        }

    }
    console.log("-------------------END - Validation Result-------------------\n");

    return _isValid;
}

/**
 * @param  {} config
 * TODO: Remove duplicate validations that are now performed by the jsonschema package.
 */
async function validateSchema(config) {
    let v = new Validator();
    let schema = require("./schema.json");

    // Set the minimum time
    schema.definitions.expiration.properties.time.minimum = (new Date()).getTime();

    let validationResult = v.validate(config, schema);

    if (RuntimeConfiguration.VERBOSE_MODE) {
        console.log(validationResult);
    }

    if (validationResult.valid === false) {
        for (const e of validationResult.errors) {
            logIssue(IssueType.ERROR, e.stack);
        }
    }
}

/**
 * @param  {} config
 */
async function validateRoot(config) {
    // For projectId there is no simple way to validate for its existance using the bigquery api.
    // The way it's 'validated' now is by initializing the BigQuery client. If the projectId supplied does not exist an exception will be thrown.
    if (!config.projectId) {
        logIssue(IssueType.ERROR, "'projectId' not provided");
    }

    if (RuntimeConfiguration.REFRESH_DATASET_PERMISSION_TABLE === true) {
        if (!config.accessControl || !config.accessControl.datasetId || config.accessControl.datasetId.length === 0) {
            logIssue(IssueType.ERROR, `'config.accessControl.datasetId' must be provided`);
        }
    }
}

/**
 * @param  {} config
 */
function validateGroups(config) {
    if (!config.hasOwnProperty('groups')) {
        logIssue(IssueType.INFORMATION, "'groups' not provided");
        return;
    }
    else if (config.groups.length === 0) {
        logIssue(IssueType.WARNING, "'groups' collection is empty");
        return;
    }

    let groupNames = [];
    config.groups.forEach((g) => {
        if (!g.name) {
            logIssue(IssueType.ERROR, "'group' 'name' not provided");
        }
        else {
            if (groupNames.indexOf(g.name.toLowerCase()) > -1) {
                logIssue(IssueType.ERROR, `duplicate 'group' 'name': ${g.name}`);
            }
            else {
                groupNames.push(g.name.toLowerCase());
            }
        }

        if (!g.hasOwnProperty('access')) {
            // logIssue(IssueType.ERROR, `'access' not provided in 'group' '${g.name}'`);
        }
        else if (g.access.length === 0) {
            logIssue(IssueType.ERROR, `'access' collection is empty in group '${g.name}'`);
        }
        let dsReferenced = false;
        if (config.datasets && config.datasets.length > 0) {
            // Check if group is referenced by any dataset
            for (const d of config.datasets) {
                if (d.groupNames && d.groupNames.length > 0) {
                    for (const c of d.groupNames) {
                        if (g.name === c) {
                            dsReferenced = true;
                            break;
                        }
                    }
                }
                if (dsReferenced === true) {
                    break;
                }
            }
        }
        if (dsReferenced === false) {
            logIssue(IssueType.WARNING, `group '${g.name}' is not referenced by any dataset`);
        }
    });
}

/**
 * @param  {} config
 */
function validateDatasets(config) {
    if (!config.hasOwnProperty('datasets')) {
        logIssue(IssueType.ERROR, "datasets not provided");
        return;
    }
    else if (config.datasets.length === 0) {
        logIssue(IssueType.ERROR, "datasets collection is empty");
        return;
    }

    let datasetIds = [];
    config.datasets.forEach((d) => {
        if (!d.hasOwnProperty('name') || !d.name) {
            logIssue(IssueType.ERROR, "dataset 'name' not provided");
        }
        else {
            if (datasetIds.indexOf(d.name.toLowerCase()) > -1) {
                logIssue(IssueType.ERROR, `duplicate dataset name '${d.name}'`);
            }
            else {
                datasetIds.push(d.name.toLowerCase());
            }
        }

        if (!d.hasOwnProperty('accessControlLabels')) {
            // logIssue(IssueType.INFORMATION, `'accessControlLabels' not provided in dataset '${d.name}'`);
        }
        else if (d.accessControlLabels.length === 0) {
            logIssue(IssueType.WARNING, `'accessControlLabels' collection is empty in dataset '${d.name}'`);
        }
        else {
            findDuplicates(d.accessControlLabels, `duplicate accessControlLabel in dataset '${d.name}'`);
        }

        let userContextProvided = false;

        if (!d.hasOwnProperty('access')) {
            // logIssue(IssueType.INFORMATION, `access not provided in dataset '${d.name}'`);
        }
        else if (d.access.length === 0) {
            logIssue(IssueType.WARNING, `access collection is empty in dataset '${d.name}'`);
        }
        else {
            userContextProvided = true;
        }

        if (!d.hasOwnProperty('groupNames')) {
            logIssue(IssueType.INFORMATION, `'groupNames' not provided in dataset '${d.name}'`);
        }
        else if (d.groupNames.length === 0) {
            logIssue(IssueType.WARNING, `'groupNames' collection is empty in dataset '${d.name}'`);
        }
        else {
            userContextProvided = true;
            findDuplicates(d.groupNames, `duplicate 'groupNames' in dataset '${d.name}'`);

            if (d.groupNames && d.groupNames.length > 0) {
                d.groupNames.forEach((g) => {
                    const group = configUtil.findGroup(config, g);
                    if (!group) {
                        logIssue(IssueType.ERROR, `group '${g}' referenced in dataset '${d.name}' is not defined in the 'groups' collection`);
                    }
                    else {
                        // Check for duplicates for access across both arrays.
                        let accessRecords = configUtil.concatentateAccessItems(config, d);
                        let duplicateCheck = [];
                        accessRecords.forEach((a) => {
                            let dupFound = false;
                            duplicateCheck.forEach((dup) => {
                                if (configUtil.accessItemsEqual(a, dup)) {
                                    dupFound = true;
                                    logIssue(IssueType.ERROR, `Duplicate access item found for dataset: '${d.name}' and group: '${g}': '${JSON.stringify(a)}'`);
                                    return;
                                }
                            });
                            if (!dupFound) {
                                duplicateCheck.push(a);
                            }
                        });
                    }
                });
            }
        }

        if (userContextProvided === false) {
            logIssue(IssueType.WARNING, `'access' and 'groupNames' collection is not provided in dataset '${d.name}'`);
        }

        // Check for unreferenced datasets. Exists in datasets collection but not referenced by any view.
        let dsReferenced = false;
        if (config.views && config.views.length > 0) {
            for (const v of config.views) {
                if (v.datasetNames && v.datasetNames.length > 0) {
                    for (const ds of v.datasetNames) {
                        if (d.name === ds) {
                            dsReferenced = true;
                            break;
                        }
                    }
                }
                if (dsReferenced === true) {
                    break;
                }
            }
        }
        if (dsReferenced === false) {
            logIssue(IssueType.WARNING, `dataset '${d.name}' is not referenced by any views`);
        }
    });
}

/**
 * @param  {} config
 */
async function validateViews(config) {
    if (!config.hasOwnProperty('views')) {
        logIssue(IssueType.ERROR, "views not provided");
        return;
    }
    else if (config.views.length === 0) {
        logIssue(IssueType.ERROR, "views collection is empty");
        return;
    }

    let viewNames = [];
    for (const v of config.views) {
        if (!v.name) {
            logIssue(IssueType.ERROR, "'name' not provided");
        }
        else {
            if (viewNames.indexOf(v.name.toLowerCase()) > -1) {
                logIssue(IssueType.ERROR, `duplicate view name: '${v.name}'`);
            }
            else {
                viewNames.push(v.name.toLowerCase());
            }
        }

        findDuplicates(v.datasetNames, `duplicate dataset name in view '${v.name}'`);

        let _validTableName = false;

        // Using source
        if (v.hasOwnProperty('source')) {
            let source = v.source;

            // Validate required fields, sourceDatasetId, sourceTableId.
            if (!source.datasetId) {
                logIssue(IssueType.ERROR, `'source.datasetId' not supplied in view '${v.name}'`);
            }
            else if (!source.tableId) {
                logIssue(IssueType.ERROR, `'source.tableId' not supplied in view '${v.name}'`);
            }
            else {
                _validTableName = true;
            }

            let _tableExists = false;
            if (_validTableName === true) {
                // Check if table exists
                _tableExists = await bigqueryUtil.tableExists(config.projectId, source.datasetId, source.tableId);
                if (_tableExists === false) {
                    logIssue(IssueType.ERROR, `table '${source.datasetId}.${source.tableId}' referenced in view '${v.name}' does not exist in BigQuery project ${config.projectId}`);
                }
            }

            findDuplicates(source.visibleColumns, `duplicate visible column in view '${v.name}'`);
            findDuplicates(source.hiddenColumns, `duplicate hidden column in view '${v.name}'`);

            // Only one of visibleColumns or hiddenColumns should be provided. They also should have at least 1 item and not have duplicates.
            if (source.hasOwnProperty('visibleColumns') && source.hasOwnProperty('hiddenColumns')) {
                logIssue(IssueType.ERROR, `View '${v.name}' has both visibleColumns and hiddenColumns defined. Only one or none should be provided`);
            }
            if (source.hasOwnProperty('visibleColumns')) {
                // Validate that the column names are valid.
                if (_tableExists === true) {
                    await areAllColumnsAvailable(source.visibleColumns, source.datasetId, source.tableId, `View '${v.name}' has a visibleColumn defined that is not available in source table '${source.datasetId}.${source.tableId}'`);
                }
                if (source.visibleColumns.length === 0) {
                    logIssue(IssueType.ERROR, `at least one visible column must be defined for view '${v.name}'`);
                }
            }
            if (source.hasOwnProperty('hiddenColumns')) {
                // Validate that the column names are valid.
                if (_tableExists === true) {
                    await areAllColumnsAvailable(source.hiddenColumns, source.datasetId, source.tableId, `View '${v.name}' has a hiddenColumn defined that is not available in source table '${source.datasetId}.${source.tableId}'`);
                }
                if (source.hiddenColumns.length === 0) {
                    logIssue(IssueType.WARNING, `no hidden column(s) are defined for view '${v.name}'`);
                }
            }

            if (source.hasOwnProperty('accessControl')) {
                let accessControl = source.accessControl;
                findDuplicates(accessControl.labels, `duplicate accessControlLabel in view '${v.name}'`);

                // If accessControlEnabled is true, than accessControlLabelColumn must be provided.
                if (accessControl.enabled && accessControl.enabled === true) {
                    if (!accessControl.labelColumn || accessControl.labelColumn.length === 0) {
                        logIssue(IssueType.ERROR, `'accessControl.labelColumn' must be provided for view '${v.name}'`);
                    }

                    // Check for the existance of labelColumn
                    await areAllColumnsAvailable([accessControl.labelColumn], source.datasetId, source.tableId, `View '${v.name}' has a 'labelColumn' defined that is not available in source table '${source.datasetId}.${source.tableId}'`);

                    if (accessControl.datasetEnabled && accessControl.datasetEnabled === true) {
                        // If accessControl.datasetEnabled is true, than config.accessControl.datasetId and config.accessControl.viewId must be provided.
                        if (!config.accessControl || !config.accessControl.datasetId || config.accessControl.datasetId.length === 0) {
                            logIssue(IssueType.ERROR, `'config.accessControl.datasetId' must be provided`);
                        }
                        if (!config.accessControl || !config.accessControl.viewId || config.accessControl.viewId.length === 0) {
                            logIssue(IssueType.ERROR, `'config.accessControl.viewId' must be provided`);
                        }

                        if (accessControl.hasOwnProperty('labels')) {
                            logIssue(IssueType.INFORMATION, `'accessControl.labels' defined in view '${v.name}' will not be used because 'accessControl.datasetEnabled' is set to true`);
                        }
                    }
                    else {
                        // Default is local configuration for accessControlLabel.
                        // Check if accessControlLabel is provided in the view or at the dataset.
                        let _hasViewAccessControlLabels = true;
                        if (!accessControl.hasOwnProperty('labels')) {
                            logIssue(IssueType.INFORMATION, `'accessControl.labels' not provided in view '${v.name}'`);
                            _hasViewAccessControlLabels = false;
                        }
                        else if (accessControl.labels.length === 0) {
                            logIssue(IssueType.WARNING, `'accessControl.labels' collection is empty in view '${v.name}'`);
                            _hasViewAccessControlLabels = false;
                        }

                        // Iterate all associated datasets and find accessControlLabel collections that are empty where accessControlLabels is not provided in the view.
                        if (_hasViewAccessControlLabels === false && v.datasetNames && v.datasetNames.length > 0) {
                            v.datasetNames.forEach((d) => {
                                const dsFound = config.datasets.find((c) => {
                                    return c.name === d;
                                });
                                if (dsFound !== undefined) {
                                    if (!dsFound.hasOwnProperty('accessControlLabels')) {
                                        logIssue(IssueType.ERROR, `'accessControlLabels' must be defined for the view '${v.name}' or in related dataset '${d}'`);
                                    }
                                    else if (dsFound.accessControlLabels.length === 0) {
                                        logIssue(IssueType.ERROR, `'accessControlLabels' must be defined for the view '${v.name}' or in related dataset '${d}'`);
                                    }
                                }
                                else {
                                    // This issue would have already been called out above. no need to handle again.
                                }
                            });
                        }
                    }
                }
            }

            if (source.hasOwnProperty('publicAccess')) {
                let publicAccess = source.publicAccess;

                // If publicAccess.enabled is true, than publicAccess.queryFilter must be provided.
                if (publicAccess.enabled && publicAccess.enabled === true) {
                    if (!publicAccess.hasOwnProperty('queryFilter')) {
                        logIssue(IssueType.ERROR, `'publicAccess.queryFilter' not provided for view '${v.name}'`);
                    }
                    else if (publicAccess.queryFilter.length === 0) {
                        logIssue(IssueType.ERROR, `'publicAccess.queryFilter' provided for view '${v.name}' is empty`);
                    }
                }
                else if (publicAccess.hasOwnProperty('queryFilter')) {
                    logIssue(IssueType.INFORMATION, `'publicAccess.queryFilter' provided for view '${v.name}' is not used`);
                }
            }

            if (v.hasOwnProperty('custom')) {
                logIssue(IssueType.ERROR, `'custom' should not be provided for view '${v.name}' when 'source' is defined`);
            }
        }

        if (v.hasOwnProperty('custom')) {
            let custom = v.custom;

            if (!custom.hasOwnProperty('query')) {
                logIssue(IssueType.ERROR, `'query' not provided in 'custom' for view '${v.name}'`);
            }
            else if (!custom.query || custom.query.trim().length === 0) {
                logIssue(IssueType.ERROR, `'query' is empty in 'custom' for view '${v.name}'`);
            }

            findDuplicates(custom.authorizeFromDatasetIds, `duplicate dataset name in 'authorizeFromDatasetIds' found in view '${v.name}'`);

            if (custom.authorizeFromDatasetIds && custom.authorizeFromDatasetIds.length > 0) {
                for (const d of custom.authorizeFromDatasetIds) {
                    const ads = configUtil.performTextVariableReplacements(config, null, d);
                    if (await bigqueryUtil.datasetExists(ads, datasets) === false) {
                        logIssue(IssueType.ERROR, `authorizeViewFromDataset '${ads}' defined in view '${v.name}' does not exist`);
                    }
                }
            }

            if (v.hasOwnProperty('source')) {
                logIssue(IssueType.ERROR, `'source' should not be provided for view '${v.name}' when 'custom' is defined`);
            }
        }

        if (v.datasetNames && v.datasetNames.length > 0) {
            // Ensure dependent datasetName exists.
            v.datasetNames.forEach((d) => {
                if (!configUtil.findDataset(config, d)) {
                    logIssue(IssueType.ERROR, `datasetName '${d}' referenced in view '${v.name}' is not defined in the datasets collection`);
                }
            });
        }
        else {
            logIssue(IssueType.ERROR, `View '${v.name}' must have at least one 'datasetIds' defined`);
        }
    }
}

/**
 * @param  {} config
 */
async function validateLabels(config) {
    if (config.hasOwnProperty('datasets')) {
        for (const d of config.datasets) {
            if (await bigqueryUtil.datasetExists(d.name, datasets) === true) {
                let labelValue = await bigqueryUtil.getDatasetLabelValue(d.name, RuntimeConfiguration.BQDS_CONFIGURATION_NAME_LABEL_KEY);
                if (labelValue !== config.name) {
                    logIssue(IssueType.ERROR, `An existing dataset exists for '${config.projectId}.${d.name}'. In order to modify this dataset, the label '${RuntimeConfiguration.BQDS_CONFIGURATION_NAME_LABEL_KEY}' must be defined on the dataset with current configuration value '${config.name}'. You may also resolve the issue by giving the dataset a unique name that does not currently exist in BigQuery.`);
                }
            }
            else if (RuntimeConfiguration.VERBOSE_MODE) {
                console.log(`Dataset does not exist '${config.projectId}.${d.name}`);
            }
        }
    }

    if (config.hasOwnProperty('views')) {
        for (const v of config.views) {
            if (v.hasOwnProperty('datasetNames')) {
                for (const d of v.datasetNames) {
                    if (await bigqueryUtil.viewExists(config.projectId, d, v.name) === true) {
                        let labelValue = await bigqueryUtil.getTableLabelValue(d, v.name, RuntimeConfiguration.BQDS_CONFIGURATION_NAME_LABEL_KEY);
                        if (labelValue !== config.name) {
                            logIssue(IssueType.ERROR, `An existing view exists for '${config.projectId}.${d}.${v.name}'. In order to modify this view, the label '${RuntimeConfiguration.BQDS_CONFIGURATION_NAME_LABEL_KEY}' must be defined on the view with current configuration value '${config.name}'. You may also resolve the issue by giving the view a unique name that does not currently exist in BigQuery.`);
                        }
                    }
                    else if (RuntimeConfiguration.VERBOSE_MODE) {
                        console.log(`View does not exist '${config.projectId}.${d}.${v.name}'`);
                    }
                }
            }
        }
    }
}

/**
 */
async function isValid() {
    let _isValid = true;
    if (issues.length > 0) {
        issues.forEach((i) => {
            if (i.issueType === IssueType.ERROR) {
                _isValid = false;
            }
        });
    }
    return _isValid;
}

/**
 * @param  {} config
 */
async function validateQueries(config) {
    const _isValid = await isValid();
    if (_isValid === true) {
        for (const v of config.views) {
            for (const d of v.datasetNames) {
                let sql = await sqlBuilder.generateSql(config, d, v);

                if (RuntimeConfiguration.VERBOSE_MODE) {
                    console.log(`Validating query for view name: '${v.name}' in dataset: '${d}': \n${sql}`);
                }
                else {
                    console.log(`Validating query for view name: '${v.name}' in dataset: '${d}'`);
                }

                if (await bigqueryUtil.validateQuery(sql, 5) === false) {
                    logIssue(IssueType.ERROR, `Invalid query for view '${v.name}': '${sql}'`);
                }
            }
        }
    }
}

/**
 * @param  {} issueType
 * @param  {} message
 */
function logIssue(issueType, message) {
    issues.push({ issueType: issueType, message: message });
}

/**
 * @param  {} array
 * @param  {} message
 */
function findDuplicates(array, message) {
    if (!array) {
        return [];
    }
    let allObjects = [];
    let duplicates = [];
    array.forEach((s) => {
        if (allObjects.indexOf(s.toLowerCase()) > -1) {
            logIssue(IssueType.ERROR, `${message}: '${s}'`);
            duplicates.push(s);
        }
        else {
            allObjects.push(s.toLowerCase());
        }
    });
    return duplicates;
}

/**
 * @param  {} columns
 * @param  {} dataset
 * @param  {} table
 */
async function areAllColumnsAvailable(columns, dataset, table, message) {
    if (!columns) {
        return [];
    }
    let missingColumns = [];
    let availableColumns = await bigqueryUtil.tableColumns(dataset, table);
    for (const col of columns) {
        const found = availableColumns.find((c) => {
            return col.toLowerCase() === c.toLowerCase();
        });
        if (found === undefined) {
            logIssue(IssueType.ERROR, `${message}: '${col}'`);
            missingColumns.push(col);
        }
    }
    return missingColumns;
}

/**
 * @param  {} str
 */
function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

/**
 * @param  {} str
 */
function isYamlString(str) {
    try {
        YAML.parse(str);
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
}

module.exports = {
    validate,
    isJsonString,
    isYamlString
};