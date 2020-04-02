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
const endOfLine = require('os').EOL;
const accessControlDatasetId = 'datashare';
const accessControlViewId = 'currentUserDataset';

/**
 * @param  {} view
 */
async function generateSql(view) {
    let sql;
    if (view.hasOwnProperty('custom')) {
        console.log(`Generating query using custom SQL for view '${view.name}'`);
        // sql = prepareCustomSql(view);
        sql = view.custom.query;
    }
    else {
        if (configUtil.isPublicAccessEnabled(view) === true) {
            console.log(`Generating query with public access for view '${view.name}'`);
            sql = await generateSqlWithPublicAccess(view);
        }
        else {
            console.log(`Generating query for view '${view.name}'`);
            sql = await generateSqlWithoutPublicAccess(view);
        }
    }

    // http://b/139288516 Add support time-based entitlements
    // If expiration is specified and delete is non-existant or false
    if (view.hasOwnProperty('expiration') && view.expiration && !view.expiration.delete) {
        const paddedSql = await prependLines(sql.trim(), "\t", 1);
        const expirySql = `SELECT * FROM (\n${paddedSql}\n)\nWHERE TIMESTAMP_MILLIS(${view.expiration.time}) > CURRENT_TIMESTAMP()`;
        return expirySql.trim();
    }
    else {
        return sql.trim();
    }
}

/**
 * @param  {} view
 */
async function generateSqlWithoutPublicAccess(view) {
    let sql = await generateSelectStatement(view, true);
    let whereClause = await generateWhereClause(view);
    if (whereClause) {
        sql += `\n${whereClause}`;
    }
    return sql.trim();
}

/**
 * @param  {} view
 * @param  {} includeFrom
 */
async function generateSelectStatement(view, includeFrom) {
    let source = view.source;
    const visibleColumns = source.visibleColumns;
    const hiddenColumns = source.hiddenColumns;

    let sql = "";
    if (visibleColumns && visibleColumns.length > 0) {
        // Column selects
        sql += "select\n";
        let i;
        for (i = 0; i < visibleColumns.length; i++) {
            if (i !== 0) {
                // Not the last item in the collection
                sql += ",\n";
            }
            sql += `\t${visibleColumns[i]}`;
        }
    }
    else if (hiddenColumns && hiddenColumns.length > 0) {
        sql += "select *";

        if (hiddenColumns.length > 0) {
            sql += " except (";
            sql += hiddenColumns.join(", ");
            sql += ")";
        }
    }
    else {
        // Use all columns
        sql += "select *";
    }

    if (includeFrom === true) {
        sql += "\n";
        sql += `from \`${view.projectId}.${source.datasetId}.${source.tableId}\` s`;
    }

    return sql;
}

/**
 * @param  {} view
 */
async function generateDatasetEntitySubquery(view) {
    let source = view.source;
    const accessControlEnabled = source.accessControl.enabled || false;
    const accessControlLabelColumn = source.accessControl.labelColumn;
    const accessControlLabelColumnDelimiter = source.accessControl.labelColumnDelimiter;

    if (accessControlEnabled === true) {
        let sql = "exists (\n";
        let query = "";
        let useNesting = accessControlLabelColumnDelimiter && accessControlLabelColumnDelimiter.length > 0;
        if (useNesting === true) {
            query += `select 1 from unnest(split(s.${accessControlLabelColumn}, "${accessControlLabelColumnDelimiter}")) as flattenedLabel\n`;
            query += `join \`${view.projectId}.${accessControlDatasetId}.${accessControlViewId}\` e on lower(flattenedLabel) = lower(e.tag)\n`;
            query += `where lower(e.datasetId) = '${view.datasetId.toLowerCase()}'\n`;
        }
        else {
            query += `select 1 from \`${view.projectId}.${accessControlDatasetId}.${accessControlViewId}\` e\n`;
            query += `where lower(e.datasetId) = '${view.datasetId.toLowerCase()}' and lower(e.tag) = lower(s.${accessControlLabelColumn})\n`;
        }

        sql += await prependLines(query, "\t", 1);
        sql += "\n)";
        return sql;
    }
    return null;
}

/**
 * @param  {} inputText
 * @param  {} prepend
 * @param  {} occurences
 */
async function prependLines(inputText, prepend, occurences) {
    let readline = require('readline');
    let stream = require('stream');

    let buf = new Buffer.from(inputText);
    let bufferStream = new stream.PassThrough();
    bufferStream.end(buf);

    let rl = readline.createInterface({
        input: bufferStream
    });

    let prependText = "";
    let i;
    for (i = 0; i < occurences; i++) {
        prependText += prepend;
    }

    let output = "";
    rl.on('line', (line) => {
        if (line.length > 0) {
            output += `${prependText}${line}${endOfLine}`;
        }
    });

    function getOutput() {
        return new Promise((resolve, reject) => {
            rl.on('close', () => {
                resolve(output);
            });
        });
    }

    // This is to make sure the result is returned before all lines are read.
    await getOutput();

    return output.trimRight();
}

/**
 * @param  {} view
 */
async function generateSqlWithPublicAccess(view) {
    let source = view.source;

    let sql = "with filteredSourceData as (\n";
    let selectSql = await generateSelectStatement(view, true);
    sql += await prependLines(selectSql, "\t", 1);

    let whereClause = await generateWhereClause(view);
    if (whereClause) {
        sql += `\n${await prependLines(whereClause, "\t", 1)}`;
    }

    // Closing paranthesis for CTE
    sql += "\n)";

    sql += ",\nrecordCount as (\n";
    sql += "\tselect count(*) as count from filteredSourceData";
    sql += "\n),";
    sql += "\npublicData as (\n";

    let publicSql = selectSql;
    publicSql += `\nwhere ${source.publicAccess.queryFilter.trim()}`;

    if (source.publicAccess.limit) {
        publicSql += `\nlimit ${source.publicAccess.limit}`;
    }

    sql += await prependLines(publicSql, "\t", 1);
    sql += "\n)";

    sql += "\nselect * from filteredSourceData";

    sql += "\nunion all\n";
    sql += "select * from publicData\nwhere (select sum(count) from recordCount) = 0";

    return sql.trim();
}

/**
 * @param  {} view
 */
async function generateWhereClause(view) {
    let source = view.source;
    let sql = "";
    let whereAdded = false;
    const sqlFilter = source.queryFilter;
    if (sqlFilter !== undefined && sqlFilter.trim().length > 0) {
        sql += `where ${sqlFilter}`;
        whereAdded = true;
    }

    const accessControlEnabled = (source.accessControl && source.accessControl.enabled) || false;
    if (accessControlEnabled === true) {
        console.log("Using dataset entitlements");
        let entityFilter = await generateDatasetEntitySubquery(view);
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
    const sql = view.custom.query;
    return configUtil.performTextVariableReplacements(config, view, sql);
}

/**
 * @param  {} view
 */
async function generateWhereSqlForTest(view) {
    let sql = `select * from \`${view.projectId}.${view.source.datasetId}.${view.source.tableId}\``;

    const sqlFilter = view.source.queryFilter;
    if (sqlFilter !== undefined && sqlFilter.trim().length > 0) {
        sql += `where ${sqlFilter}`;
    }

    return sql;
}

/**
 * @param  {} view
 */
async function generatePublicWhereSqlForTest(view) {
    let sql = `select * from \`${view.projectId}.${view.source.datasetId}.${view.source.tableId}\``;

    const sqlFilter = view.source.publicAccess.queryFilter;
    if (sqlFilter !== undefined && sqlFilter.trim().length > 0) {
        sql += `where ${sqlFilter}`;
    }

    return sql;
}

module.exports = {
    generateSql,
    generateWhereSqlForTest,
    generatePublicWhereSqlForTest
};

if (process.env.UNIT_TESTS) {
    module.exports.prependLines = prependLines;
}