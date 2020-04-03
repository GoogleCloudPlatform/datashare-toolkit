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

const { BigQueryUtil } = require('bqds-shared');
let bigqueryUtil;

const configUtil = require("./configUtil");
const sqlBuilder = require("./sqlBuilder");
const runtimeConfiguration = require("../../lib/runtimeConfiguration");
const Validator = require('jsonschema').Validator;
const underscore = require("underscore");

const IssueType = {
    // Informational only
    INFORMATION: 'INFORMATION',

    // Suggested to address/fix in the configuration
    WARNING: 'WARNING',

    // Must be fixed otherwise script will not proceed to execute
    ERROR: 'ERROR'
};

// Fix this, shouldn't be globally scoped. Will cause major issues.
let issues = [];

/**
 * @param  {} config
 */
async function validate(config) {
    issues = [];
    bigqueryUtil = new BigQueryUtil(config.projectId);

    console.log("-------------------START - validateSchema-------------------");
    await validateSchema(config);
    console.log("-------------------END - validateSchema-------------------\n");

    console.log("-------------------START - validateView-------------------");
    await validateView(config);
    console.log("-------------------END - validateView-------------------\n");

    if (await isValid()) {
        console.log("-------------------START - validateQueries-------------------");
        await validateQueries(config);
        console.log("-------------------END - validateQueries-------------------\n");
    }

    let _isValid = true;
    console.log("-------------------START - Validation Result-------------------");
    if (issues.length > 0) {
        issues.forEach((i) => {
            console.log(`${i.issueType}: ${i.attribute}: ${i.message}`);
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

    let formatted = {};
    let distinctAttributes = underscore.uniq(issues.map(i => i.attribute));
    distinctAttributes.forEach(a => {
        const e = underscore.where(issues, { attribute: a });
        formatted[a] = [e.map(i => i.message).join(', ')];
    });

    return { isValid: _isValid, issues: formatted };
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

    if (runtimeConfiguration.VERBOSE_MODE) {
        console.log(validationResult);
    }

    if (validationResult.valid === false) {
        for (const e of validationResult.errors) {
            // console.log(`${JSON.stringify(e, null, 3)}`)
            const message = e.message.charAt(0).toUpperCase() + e.message.substring(1);
            logIssue(IssueType.ERROR, message, e.property.replace('instance.', ''));
        }
    }
}

/**
 * @param  {} view
 */
async function validateView(view) {
    let datasetFound = false;
    if (!view.name) {
        logIssue(IssueType.ERROR, "'name' not provided", 'name');
    }
    else {
        if (view.name.length > 1024) {
            logIssue(IssueType.ERROR, `Destination tableId '${view.name}' exceeds maximum allowable length of 1024: ${view.name.length}}`, 'name');
        } else if (!view.name.match(/^[A-Za-z0-9_]+$/g)) {
            logIssue(IssueType.ERROR, `Destination tableId '${view.name}' name is invalid. See https://cloud.google.com/bigquery/docs/tables for further information.`, 'name');
        }
    }
    if (!view.description) {
        logIssue(IssueType.ERROR, "'description' not provided", 'description');
    }
    if (!view.datasetId) {
        logIssue(IssueType.ERROR, "'datasetId' not provided", 'datasetId');
    }
    else {
        if (await bigqueryUtil.datasetExists(view.datasetId) === false) {
            logIssue(IssueType.ERROR, `Dataset '${view.datasetId}' does not exist`, 'datasetId');
        }
        else {
            datasetFound = true;
            let labelValue = await bigqueryUtil.getDatasetLabelValue(view.datasetId, runtimeConfiguration.CDS_MANAGED_LABEL_KEY);
            if (labelValue !== 'true') {
                logIssue(IssueType.ERROR, `An existing dataset exists for '${view.projectId}.${view.datasetId}'. In order to modify this dataset, the label '${runtimeConfiguration.CDS_MANAGED_LABEL_KEY}' must be defined on the dataset with current configuration value '${view.datasetId}'. You may also resolve the issue by giving the dataset a unique name that does not currently exist in BigQuery.`, 'datasetId');
            }
        }
    }

    if (datasetFound && view.name) {
        if (await bigqueryUtil.viewExists(view.datasetId, view.name)) {
            let labelValue = await bigqueryUtil.getTableLabelValue(view.datasetId, view.name, runtimeConfiguration.CDS_MANAGED_LABEL_KEY);
            if (labelValue !== 'true') {
                logIssue(IssueType.ERROR, `An existing view exists for '${view.projectId}.${view.name}'. In order to modify this view, the label '${runtimeConfiguration.CDS_MANAGED_LABEL_KEY}' must be defined on the view with current configuration value '${view.name}'. You may also resolve the issue by giving the view a unique name that does not currently exist in BigQuery.`);
            }
        }
    }

    let _validTableName = false;

    // Using source
    if (view.hasOwnProperty('source')) {
        let source = view.source;

        if (!source.datasetId) {
            logIssue(IssueType.ERROR, `'source.datasetId' not supplied in view '${view.name}'`, 'source.datasetId');
        }
        else if (!source.tableId) {
            logIssue(IssueType.ERROR, `'source.tableId' not supplied in view '${view.name}'`, 'source.tableId');
        }
        else {
            _validTableName = true;
        }

        let _tableExists = false;
        if (_validTableName === true) {
            // Check if table exists
            _tableExists = await bigqueryUtil.tableExists(source.datasetId, source.tableId, false);
            if (_tableExists === false) {
                logIssue(IssueType.ERROR, `table '${source.datasetId}.${source.tableId}' referenced in view '${view.name}' does not exist`, 'source.tableId');
            }
        }

        findDuplicates(source.visibleColumns, `duplicate visible column in view '${view.name}'`, 'source.visibleColumns');

        if (source.hasOwnProperty('visibleColumns')) {
            // Validate that the column names are valid.
            if (_tableExists === true) {
                await areAllColumnsAvailable(source.visibleColumns, source.datasetId, source.tableId, `View '${view.name}' has a visibleColumn defined that is not available in source table '${source.datasetId}.${source.tableId}'`, 'source.visibleColumns');
            }
            if (source.visibleColumns.length === 0) {
                logIssue(IssueType.ERROR, `at least one visible column must be defined for view '${view.name}'`, 'source.visibleColumns');
            }
        }

        if (source.hasOwnProperty('accessControl')) {
            let accessControl = source.accessControl;

            // If accessControlEnabled is true, than accessControlLabelColumn must be provided.
            if (accessControl.enabled && accessControl.enabled === true) {
                if (!accessControl.labelColumn || accessControl.labelColumn.length === 0) {
                    logIssue(IssueType.ERROR, `'accessControl.labelColumn' must be provided for view '${view.name}'`, 'source.accessControl.labelColumn');
                }

                if (_tableExists === true) {
                    // Check for the existance of labelColumn
                    await areAllColumnsAvailable([accessControl.labelColumn], source.datasetId, source.tableId, `View '${view.name}' has a 'labelColumn' defined that is not available in source table '${source.datasetId}.${source.tableId}'`, 'accessControl.labelColumn');
                }
            }
        }

        if (source.hasOwnProperty('publicAccess')) {
            let publicAccess = source.publicAccess;

            // If publicAccess.enabled is true, than publicAccess.queryFilter must be provided.
            if (publicAccess.enabled && publicAccess.enabled === true) {
                if (!publicAccess.hasOwnProperty('queryFilter')) {
                    logIssue(IssueType.ERROR, `'publicAccess.queryFilter' not provided for view '${view.name}'`, 'source.publicAccess.queryFilter');
                }
                else if (publicAccess.queryFilter.length === 0) {
                    logIssue(IssueType.ERROR, `'publicAccess.queryFilter' provided for view '${view.name}' is empty`, 'source.publicAccess.queryFilter');
                }
                else {
                    if (publicAccess.queryFilter) {
                        const sql = await sqlBuilder.generatePublicWhereSqlForTest(view);
                        const result = await bigqueryUtil.validateQuery(sql, 5);
                        if (result.isValid === false) {
                            logIssue(IssueType.ERROR, result.message, 'source.publicAccess.queryFilter');
                        }
                    }
                }
            }
            else if (publicAccess.hasOwnProperty('queryFilter')) {
                logIssue(IssueType.INFORMATION, `'publicAccess.queryFilter' provided for view '${view.name}' is not used`, 'source.publicAccess.queryFilter');
            }
        }

        if (view.hasOwnProperty('custom')) {
            logIssue(IssueType.ERROR, `'custom' should not be provided for view '${view.name}' when 'source' is defined`);
        }

        if (source.queryFilter) {
            const sql = await sqlBuilder.generateWhereSqlForTest(view);
            const result = await bigqueryUtil.validateQuery(sql, 5);
            if (result.isValid === false) {
                logIssue(IssueType.ERROR, result.message, 'source.queryFilter');
            }
        }
    }

    if (view.hasOwnProperty('custom')) {
        let custom = view.custom;

        if (!custom.hasOwnProperty('query')) {
            logIssue(IssueType.ERROR, `'query' not provided in 'custom' for view '${view.name}'`, 'custom.query');
        }
        else if (!custom.query || custom.query.trim().length === 0) {
            logIssue(IssueType.ERROR, `'query' is empty in 'custom' for view '${view.name}'`, 'custom.query');
        }

        findDuplicates(custom.authorizeFromDatasetIds, `duplicate dataset name in 'authorizeFromDatasetIds' found in view '${view.name}'`, 'custom.authorizeFromDatasetIds');

        if (custom.authorizeFromDatasetIds && custom.authorizeFromDatasetIds.length > 0) {
            for (const d of custom.authorizeFromDatasetIds) {
                const ads = configUtil.performTextVariableReplacements(view, null, d);
                if (await bigqueryUtil.datasetExists(ads) === false) {
                    logIssue(IssueType.ERROR, `authorizeViewFromDataset '${ads}' defined in view '${view.name}' does not exist`, 'custom.authorizeFromDatasetIds');
                }
            }
        }

        if (view.hasOwnProperty('source')) {
            logIssue(IssueType.ERROR, `'source' should not be provided for view '${view.name}' when 'custom' is defined`);
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
async function validateQueries(view) {
    const _isValid = await isValid();
    if (_isValid === true) {
        let sql = await sqlBuilder.generateSql(view);

        if (true) { //runtimeConfiguration.VERBOSE_MODE) {
            console.log(`Validating query for view name: '${view.name}' in dataset: '${view.datasetId}': \n${sql}`);
        }
        else {
            console.log(`Validating query for view name: '${view.name}' in dataset: '${view.datasetId}'`);
        }

        if (await bigqueryUtil.validateQuery(sql, 5) === false) {
            logIssue(IssueType.ERROR, `Invalid query for view '${view.name}': '${sql}'`);
        }
    }
}

/**
 * @param  {} issueType
 * @param  {} message
 */
function logIssue(issueType, message, attribute) {
    issues.push({ issueType: issueType, message: message, attribute: attribute });
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
 * @param  {} message
 * @param  {} attribute
 */
async function areAllColumnsAvailable(columns, dataset, table, message, attribute) {
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
            logIssue(IssueType.ERROR, `${message}: '${col}'`, attribute);
            missingColumns.push(col);
        }
    }
    return missingColumns;
}

module.exports = {
    validate
};