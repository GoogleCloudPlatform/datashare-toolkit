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

const { BigQueryUtil } = require('cds-shared');
let bigqueryUtil;

const configUtil = require("./configUtil");
const sqlBuilder = require("./sqlBuilder");
const cfg = require('../../lib/config');
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

class ConfigValidator {
    constructor() {
        this.issues = [];
    }

    /**
     * @param  {} config
     */
    async validate(config) {
        bigqueryUtil = new BigQueryUtil(config.projectId);

        console.log("-------------------START - validateSchema-------------------");
        await this.validateSchema(config);
        console.log("-------------------END - validateSchema-------------------\n");

        console.log("-------------------START - validateView-------------------");
        await this.validateView(config);
        console.log("-------------------END - validateView-------------------\n");

        if (await this.isValid()) {
            console.log("-------------------START - validateQueries-------------------");
            await this.validateQueries(config);
            console.log("-------------------END - validateQueries-------------------\n");
        }

        let _isValid = true;
        console.log("-------------------START - Validation Result-------------------");
        if (this.issues.length > 0) {
            this.issues.forEach((i) => {
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
        let distinctAttributes = underscore.uniq(this.issues.map(i => i.attribute));
        distinctAttributes.forEach(a => {
            const e = underscore.where(this.issues, { attribute: a });
            formatted[a] = [e.map(i => i.message).join(', ')];
        });

        return { isValid: _isValid, issues: formatted };
    }

    /**
     * @param  {} config
     * TODO: Remove duplicate validations that are now performed by the jsonschema package.
     */
    async validateSchema(config) {
        let v = new Validator();
        let schema = require("./schema.json");

        // Set the minimum time
        schema.definitions.expiration.properties.time.minimum = (new Date()).getTime();

        let validationResult = v.validate(config, schema);

        if (cfg.verboseMode) {
            console.log(validationResult);
        }

        if (validationResult.valid === false) {
            for (const e of validationResult.errors) {
                // console.log(`${JSON.stringify(e, null, 3)}`)
                const message = e.message.charAt(0).toUpperCase() + e.message.substring(1);
                this.logIssue(IssueType.ERROR, message, e.property.replace('instance.', ''));
            }
        }
    }

    /**
     * @param  {} view
     */
    async validateView(view) {
        let datasetFound = false;
        if (!view.name) {
            this.logIssue(IssueType.ERROR, "'name' not provided", 'name');
        }
        else {
            if (view.name.length > 1024) {
                this.logIssue(IssueType.ERROR, `Destination tableId '${view.name}' exceeds maximum allowable length of 1024: ${view.name.length}}`, 'name');
            } else if (!view.name.match(/^[A-Za-z0-9_]+$/g)) {
                this.logIssue(IssueType.ERROR, `Destination tableId '${view.name}' name is invalid. See https://cloud.google.com/bigquery/docs/tables for further information.`, 'name');
            }
        }
        if (!view.description) {
            this.logIssue(IssueType.ERROR, "'description' not provided", 'description');
        }
        if (!view.datasetId) {
            this.logIssue(IssueType.ERROR, "'datasetId' not provided", 'datasetId');
        }
        else {
            if (await bigqueryUtil.datasetExists(view.datasetId) === false) {
                this.logIssue(IssueType.ERROR, `Dataset '${view.datasetId}' does not exist`, 'datasetId');
            } else {
                datasetFound = true;
                let labelValue = await bigqueryUtil.getDatasetLabelValue(view.datasetId, cfg.cdsManagedLabelKey);
                if (labelValue !== 'true') {
                    this.logIssue(IssueType.ERROR, `An existing dataset exists for '${view.projectId}.${view.datasetId}'. In order to modify this dataset, the label '${cfg.cdsManagedLabelKey}' must be defined on the dataset with current configuration value '${view.datasetId}'. You may also resolve the issue by giving the dataset a unique name that does not currently exist in BigQuery.`, 'datasetId');
                }
            }
        }

        const isNewTable = (!view.rowId && !view.viewId) ? true : false;
        let duplicateIdentified = false;

        if (datasetFound && view.name) {
            const tableExists = await bigqueryUtil.tableExists(view.datasetId, view.name);
            if (tableExists === true) {
                let labelValue = await bigqueryUtil.getTableLabelValue(view.datasetId, view.name, cfg.cdsManagedLabelKey);
                if (labelValue !== 'true') {
                    this.logIssue(IssueType.ERROR, `An existing view already exists for '${view.projectId}.${view.name}'. In order to modify this view, the label '${cfg.cdsManagedLabelKey}' must be defined on the view with value 'true'. You may also resolve the issue by giving the view a unique name that does not currently exist in BigQuery.`, 'name');
                    duplicateIdentified = true;
                } else if (isNewTable) {
                    this.logIssue(IssueType.ERROR, `An existing view already exists with the name '${view.projectId}.${view.name}'.`, 'name');
                    duplicateIdentified = true;
                }
            }

            if (duplicateIdentified === false && isNewTable === true) {
                const table = bigqueryUtil.getTableFqdn(view.projectId, cfg.cdsDatasetId, cfg.cdsAuthorizedViewTableId);
                const query = `SELECT COUNT(*) AS count
            FROM \`${table}\`
            WHERE datasetId = @datasetId AND name = @tableId AND isDeleted IS FALSE
            `;
                const options = {
                    query: query,
                    params: { datasetId: view.datasetId, tableId: view.name }
                };
                const [rows] = await bigqueryUtil.executeQuery(options);
                const count = rows[0].count;
                if (count > 0) {
                    this.logIssue(IssueType.ERROR, `An existing view already exists with the name '${view.projectId}.${view.name}'.`, 'name');
                    duplicateIdentified = true;
                }
            }
        }

        let _validTableName = false;

        // Using source
        if (view.hasOwnProperty('source')) {
            let source = view.source;

            if (!source.datasetId) {
                this.logIssue(IssueType.ERROR, `'source.datasetId' not supplied in view '${view.name}'`, 'source.datasetId');
            }
            else if (!source.tableId) {
                this.logIssue(IssueType.ERROR, `'source.tableId' not supplied in view '${view.name}'`, 'source.tableId');
            }
            else {
                _validTableName = true;
            }

            let _tableExists = false;
            if (_validTableName === true) {
                // Check if table exists
                _tableExists = await bigqueryUtil.tableExists(source.datasetId, source.tableId, false);
                if (_tableExists === false) {
                    this.logIssue(IssueType.ERROR, `table '${source.datasetId}.${source.tableId}' referenced in view '${view.name}' does not exist`, 'source.tableId');
                }
            }

            this.findDuplicates(source.visibleColumns, `duplicate visible column in view '${view.name}'`, 'source.visibleColumns');

            if (source.hasOwnProperty('visibleColumns')) {
                // Validate that the column names are valid.
                if (_tableExists === true) {
                    await this.areAllColumnsAvailable(source.visibleColumns, source.datasetId, source.tableId, `View '${view.name}' has a visibleColumn defined that is not available in source table '${source.datasetId}.${source.tableId}'`, 'source.visibleColumns');
                }
                if (source.visibleColumns.length === 0) {
                    this.logIssue(IssueType.ERROR, `at least one visible column must be defined for view '${view.name}'`, 'source.visibleColumns');
                }
            }

            if (source.hasOwnProperty('publicAccess')) {
                let publicAccess = source.publicAccess;

                // If publicAccess.enabled is true, than publicAccess.queryFilter must be provided.
                if (publicAccess.enabled && publicAccess.enabled === true) {
                    if (!publicAccess.hasOwnProperty('queryFilter')) {
                        this.logIssue(IssueType.ERROR, `'publicAccess.queryFilter' not provided for view '${view.name}'`, 'source.publicAccess.queryFilter');
                    }
                    else if (publicAccess.queryFilter.length === 0) {
                        this.logIssue(IssueType.ERROR, `'publicAccess.queryFilter' provided for view '${view.name}' is empty`, 'source.publicAccess.queryFilter');
                    }
                    else {
                        if (publicAccess.queryFilter) {
                            const sql = await sqlBuilder.generatePublicWhereSqlForTest(view);
                            const v = await bigqueryUtil.validateQuery(sql, 5);
                            if (v.success === false) {
                                this.logIssue(IssueType.ERROR, v.message, 'source.publicAccess.queryFilter');
                            }
                        }
                    }
                }
                else if (publicAccess.hasOwnProperty('queryFilter')) {
                    this.logIssue(IssueType.INFORMATION, `'publicAccess.queryFilter' provided for view '${view.name}' is not used`, 'source.publicAccess.queryFilter');
                }
            }

            if (view.hasOwnProperty('custom')) {
                this.logIssue(IssueType.ERROR, `'custom' should not be provided for view '${view.name}' when 'source' is defined`);
            }

            if (source.queryFilter) {
                const sql = await sqlBuilder.generateWhereSqlForTest(view);
                const v = await bigqueryUtil.validateQuery(sql, 5);
                if (v.success === false) {
                    this.logIssue(IssueType.ERROR, v.message, 'source.queryFilter');
                }
            }
        }

        /*
        if (source.hasOwnProperty('accessControl')) {
            let accessControl = source.accessControl;
        
            // If accessControlEnabled is true, than accessControlLabelColumn must be provided.
            if (accessControl.enabled && accessControl.enabled === true) {
                if (!accessControl.labelColumn || accessControl.labelColumn.length === 0) {
                    this.logIssue(IssueType.ERROR, `'accessControl.labelColumn' must be provided for view '${view.name}'`, 'source.accessControl.labelColumn');
                }
        
                if (_tableExists === true) {
                    // Check for the existance of labelColumn
                    await this.areAllColumnsAvailable([accessControl.labelColumn], source.datasetId, source.tableId, `View '${view.name}' has a 'labelColumn' defined that is not available in source table '${source.datasetId}.${source.tableId}'`, 'accessControl.labelColumn');
                }
            }
        }*/

        if (view.hasOwnProperty('custom')) {
            let custom = view.custom;

            if (!custom.hasOwnProperty('query')) {
                this.logIssue(IssueType.ERROR, `'query' not provided in 'custom' for view '${view.name}'`, 'custom.query');
            }
            else if (!custom.query || custom.query.trim().length === 0) {
                this.logIssue(IssueType.ERROR, `'query' is empty in 'custom' for view '${view.name}'`, 'custom.query');
            }

            this.findDuplicates(custom.authorizeFromDatasetIds, `duplicate dataset name in 'authorizeFromDatasetIds' found in view '${view.name}'`, 'custom.authorizeFromDatasetIds');

            if (custom.authorizeFromDatasetIds && custom.authorizeFromDatasetIds.length > 0) {
                for (const d of custom.authorizeFromDatasetIds) {
                    const ads = configUtil.performTextVariableReplacements(view, d);
                    if (await bigqueryUtil.datasetExists(ads) === false) {
                        this.logIssue(IssueType.ERROR, `authorizeViewFromDataset '${ads}' defined in view '${view.name}' does not exist`, 'custom.authorizeFromDatasetIds');
                    }
                }
            }

            if (view.hasOwnProperty('source')) {
                this.logIssue(IssueType.ERROR, `'source' should not be provided for view '${view.name}' when 'custom' is defined`);
            }
        }
    }

    /**
     */
    async isValid() {
        let _isValid = true;
        if (this.issues.length > 0) {
            this.issues.forEach((i) => {
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
    async validateQueries(view) {
        const _isValid = await this.isValid();
        if (_isValid === true) {
            let sql = await sqlBuilder.generateSql(view);

            if (cfg.verboseMode) {
                console.log(`Validating query for view name: '${view.name}' in dataset: '${view.datasetId}': \n${sql}`);
            }
            else {
                console.log(`Validating query for view name: '${view.name}' in dataset: '${view.datasetId}'`);
            }

            const v = await bigqueryUtil.validateQuery(sql, 5);
            if (v.success === false) {
                if (view.custom) {
                    this.logIssue(IssueType.ERROR, v.message, 'custom.query');
                } else {
                    this.logIssue(IssueType.ERROR, v.message, 'source.queryFilter');
                }
            }
        }
    }

    /**
     * @param  {} issueType
     * @param  {} message
     */
    logIssue(issueType, message, attribute) {
        this.issues.push({ issueType: issueType, message: message, attribute: attribute });
    }

    /**
     * @param  {} array
     * @param  {} message
     */
    findDuplicates(array, message) {
        if (!array) {
            return [];
        }
        let allObjects = [];
        let duplicates = [];
        array.forEach((s) => {
            if (allObjects.indexOf(s.toLowerCase()) > -1) {
                this.logIssue(IssueType.ERROR, `${message}: '${s}'`);
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
    async areAllColumnsAvailable(columns, dataset, table, message, attribute) {
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
                this.logIssue(IssueType.ERROR, `${message}: '${col}'`, attribute);
                missingColumns.push(col);
            }
        }
        return missingColumns;
    }
}

module.exports = ConfigValidator;