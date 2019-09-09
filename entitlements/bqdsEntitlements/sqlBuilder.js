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

const commonUtil = require("./commonUtil")
const configUtil = require("./configUtil")
const bigqueryUtil = require("./bigqueryUtil")
const endOfLine = require('os').EOL;

/**
 * @param  {} config
 * @param  {} viewDatasetId
 * @param  {} view
 */
async function generateSql(config, viewDatasetId, view) {
    var sql;
    if (view.hasOwnProperty('custom')) {
        console.log(`Generating query using custom SQL for view '${view.name}'`);
        sql = prepareCustomSql(config, view);
    }
    else {
        if (await configUtil.isPublicAccessEnabled(view) === true) {
            console.log(`Generating query with public access for view '${view.name}'`);
            sql = await generateSqlWithPublicAccess(config, viewDatasetId, view);
        }
        else {
            console.log(`Generating query for view '${view.name}'`);
            sql = await generateSqlWithoutPublicAccess(config, viewDatasetId, view);
        }
    }

    // http://b/139288516 Add support time-based entitlements
    // If expiration is specified and delete is non-existant or false
    if (view.hasOwnProperty('expiration') && view.expiration && !view.expiration.delete) {
        var paddedSql = await prependLines(sql.trim(), "\t", 1);
        var expirySql = `SELECT * FROM (\n${paddedSql}\n)\nWHERE TIMESTAMP_MILLIS(${view.expiration.time}) > CURRENT_TIMESTAMP()`;
        return expirySql.trim();
    }
    else {
        return sql.trim();
    }
}

/**
 * @param  {} config
 * @param  {} viewDatasetId
 * @param  {} view
 */
async function generateSqlWithoutPublicAccess(config, viewDatasetId, view) {
    const availableColumns = await bigqueryUtil.tableColumns(view.source.datasetId, view.source.tableId);
    let sql = await generateSelectStatement(config, view, true, availableColumns);
    let whereClause = await generateWhereClause(config, view, viewDatasetId, availableColumns);
    if (whereClause) {
        sql += `\n${whereClause}`;
    }
    return sql.trim();
}

/**
 * @param  {} config
 * @param  {} view
 * @param  {} includeFrom
 * @param  {} availableColumns
 */
async function generateSelectStatement(config, view, includeFrom, availableColumns) {
    let source = view.source;
    const visibleColumns = source.visibleColumns;
    const hiddenColumns = source.hiddenColumns;

    // TODO: The config validation will ensure all columns exist. This can be removed.
    var vColumns = [];
    if (visibleColumns) {
        visibleColumns.forEach(function (col) {
            var found = availableColumns.find(function (c) {
                if (col.toLowerCase() === c.toLowerCase()) {
                    return true;
                }
            });
            if (found != undefined) {
                vColumns.push(col)
            }
        });
    }

    // TODO: The config validation will ensure all columns exist. This can be removed.
    var hColumns = [];
    if (hiddenColumns) {
        hiddenColumns.forEach(function (col) {
            var found = availableColumns.find(function (c) {
                if (col.toLowerCase() === c.toLowerCase()) {
                    return true;
                }
            });
            if (found != undefined) {
                hColumns.push(col)
            }
        });
    }

    var sql = "";
    if (vColumns.length > 0) {
        // Column selects
        sql += "select\n";
        var i;
        for (i = 0; i < vColumns.length; i++) {
            if (i != 0) {
                // Not the last item in the collection
                sql += ",\n";
            }
            sql += `\t${vColumns[i]}`;
        }
    }
    else if (hColumns.length > 0) {
        sql += "select *";

        if (hColumns.length > 0) {
            sql += " except ("
            sql += hColumns.join(", ")
            sql += ")";
        }
    }
    else {
        // Use all columns
        sql += "select *";
    }

    if (includeFrom === true) {
        sql += "\n";
        sql += `from \`${config.projectId}.${source.datasetId}.${source.tableId}\` s`;
    }

    return sql;
}

/**
 * @param  {} config
 * @param  {} view
 */
async function generateDatasetEntitySubquery(config, view, viewDatasetId, availableColumns) {
    let source = view.source;
    const accessControlEnabled = source.accessControl.enabled || false;
    const accessControlDatasetEnabled = source.accessControl.datasetEnabled || false;
    const accessControlLabelColumn = source.accessControl.labelColumn;
    const accessControlLabelColumnDelimiter = source.accessControl.labelColumnDelimiter;

    if (accessControlEnabled === true && accessControlDatasetEnabled === true &&
        accessControlLabelColumn && config.accessControl.datasetId && config.accessControl.viewId) {
        var sql = "exists (\n";
        var query = "";
        let useNesting = accessControlLabelColumnDelimiter && accessControlLabelColumnDelimiter.length > 0;
        if (useNesting === true) {
            query += `select 1 from unnest(split(s.${accessControlLabelColumn}, "${accessControlLabelColumnDelimiter}")) as flattenedLabel\n`;
            query += `join \`${config.projectId}.${config.accessControl.datasetId}.${config.accessControl.viewId}\` e on lower(flattenedLabel) = lower(e.accessControlLabel)\n`;
            query += `where lower(e.viewName) = '${viewDatasetId.toLowerCase()}.${view.name.toLowerCase()}'\n`;
        }
        else {
            query += `select 1 from \`${config.projectId}.${config.accessControl.datasetId}.${config.accessControl.viewId}\` e\n`;
            query += `where lower(e.viewName) = '${viewDatasetId.toLowerCase()}.${view.name.toLowerCase()}' and lower(e.accessControlLabel) = lower(s.${accessControlLabelColumn})\n`;
        }

        sql += await prependLines(query, "\t", 1);
        sql += "\n)";
        return sql;
    }
    return null;
}

/**
 * @param  {} config
 * @param  {} view
 * @param  {} viewDatasetId
 * @param  {} availableColumns
 */
async function generateLocalEntitySubquery(config, view, viewDatasetId, availableColumns) {
    let source = view.source;
    const accessControlEnabled = source.accessControl.enabled || false;
    const accessControlLabelColumn = source.accessControl.labelColumn;
    const accessControlLabelColumnDelimiter = source.accessControlLabelColumnDelimiter;

    if (accessControlEnabled === true && accessControlLabelColumn) {
        var found = availableColumns.find(function (c) {
            if (accessControlLabelColumn.toLowerCase() === c.toLowerCase()) {
                return true;
            }
        });
        if (found != undefined) {
            let viewAccessControlLabels = source.accessControl.labels || [];
            let dataset = config.datasets.find(function (d) {
                if (d.name.toLowerCase() === viewDatasetId.toLowerCase()) {
                    return true;
                }
            }) || [];

            let allLabels = viewAccessControlLabels.concat(dataset.accessControlLabels);
            let uniqueLabels = allLabels.unique();
            console.log(`uniqueLabels: ${uniqueLabels}`);

            if (uniqueLabels.length == 0) {
                throw new Error("No accessControlLabels were supplied");
            }

            var sql = "";

            let useExistsClause = accessControlLabelColumnDelimiter && accessControlLabelColumnDelimiter.length > 0;
            if (useExistsClause === true) {
                sql += "exists (\n";
                var select = `select 1 from unnest(split(s.${accessControlLabelColumn}, "${accessControlLabelColumnDelimiter}")) as flattenedLabel\n`;
                select += "where upper(flattenedLabel) in (";
                sql += await prependLines(select, "\t", 1);
            }
            else {
                sql += `upper(s.${accessControlLabelColumn}) in (`;
            }

            var first = true;
            uniqueLabels.forEach(function (label) {
                if (!label) {
                    return
                }
                if (first === true) {
                    first = false;
                }
                else {
                    sql += ",";
                }
                sql += `'${label.toUpperCase()}'`;
            });

            sql += ")";
            if (useExistsClause === true) {
                sql += "\n";
                sql += ")";
            }

            return sql;
        }
        else {
            // Throw an error
            console.log("Unable to apply entity label entitlements because column doesn't exist");
        }
    }
    return null;
}

/**
 * @param  {} inputText
 * @param  {} prepend
 * @param  {} occurences
 */
async function prependLines(inputText, prepend, occurences) {
    var readline = require('readline');
    var stream = require('stream');

    var buf = new Buffer.from(inputText);
    var bufferStream = new stream.PassThrough();
    bufferStream.end(buf);

    var rl = readline.createInterface({
        input: bufferStream
    });

    var prependText = "";
    var i;
    for (i = 0; i < occurences; i++) {
        prependText += prepend;
    }

    var output = "";
    var count = 0;
    rl.on('line', (line) => {
        count++;
        if (line.length > 0) {
            output += `${prependText}${line}${endOfLine}`;
        }
    });

    function getOutput() {
        return new Promise((resolve, reject) => {
            rl.on('close', function () {
                resolve(output);
            });
        });
    }

    // This is to make sure the result is returned before all lines are read.
    await getOutput();

    return output.trimRight();
}

/**
 * @param  {} config
 * @param  {} viewDatasetId
 * @param  {} view
 */
async function generateSqlWithPublicAccess(config, viewDatasetId, view) {
    let source = view.source;

    var sql = "with filteredSourceData as (\n"
    const availableColumns = await bigqueryUtil.tableColumns(source.datasetId, source.tableId);
    let selectSql = await generateSelectStatement(config, view, true, availableColumns);
    sql += await prependLines(selectSql, "\t", 1);

    let whereClause = await generateWhereClause(config, view, viewDatasetId, availableColumns);
    if (whereClause) {
        sql += `\n${await prependLines(whereClause, "\t", 1)}`;
    }

    // Closing paranthesis for CTE
    sql += "\n)";

    sql += ",\nrecordCount as (\n";
    sql += "\tselect count(*) as count from filteredSourceData";
    sql += "\n),"
    sql += "\npublicData as (\n";

    var publicSql = selectSql;
    publicSql += `\nwhere ${source.publicAccess.queryFilter.trim()}`;

    if (source.publicAccess.limit) {
        publicSql += `\nlimit ${source.publicAccess.limit}`;
    }

    sql += await prependLines(publicSql, "\t", 1);
    sql += "\n)";

    sql += "\nselect * from filteredSourceData"

    sql += "\nunion all\n";
    sql += "select * from publicData\nwhere (select sum(count) from recordCount) = 0";

    return sql.trim();
}

/**
 * @param  {} config
 * @param  {} view
 * @param  {} viewDatasetId
 * @param  {} availableColumns
 */
async function generateWhereClause(config, view, viewDatasetId, availableColumns) {
    let source = view.source;
    var sql = "";
    var whereAdded = false;
    const sqlFilter = source.queryFilter;
    if (sqlFilter != undefined && sqlFilter.trim().length > 0) {
        sql += `where ${sqlFilter}`;
        whereAdded = true;
    }

    const accessControlEnabled = (source.accessControl && source.accessControl.enabled) || false;
    const accessControlDatasetEnabled = (source.accessControl && source.accessControl.datasetEnabled) || false;
    if (accessControlEnabled === true && accessControlDatasetEnabled === true) {
        console.log("Using dataset entitlements");
        let entityFilter = await generateDatasetEntitySubquery(config, view, viewDatasetId, availableColumns);
        if (entityFilter) {
            sql += (whereAdded ? " and " : "where ") + entityFilter;
        }
    }
    else if (accessControlEnabled === true && accessControlDatasetEnabled === false) {
        console.log("Using local entitlements");
        let entityFilter = await generateLocalEntitySubquery(config, view, viewDatasetId, availableColumns);
        if (entityFilter) {
            sql += (whereAdded ? " and " : "where ") + entityFilter;
        }
    }

    return sql.trim();
}

/**
 * @param  {} config
 * @param  {} view
 */
function prepareCustomSql(config, view) {
    var sql = view.custom.query;
    return configUtil.performTextVariableReplacements(config, view, sql);
}

module.exports = {
    generateSql: generateSql
}