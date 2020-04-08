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

const configUtil = require('./configUtil');
const endOfLine = require('os').EOL;
const cfg = require('../../lib/config');

/**
 * @param  {} view
 */
async function generateSql(view) {
    let sql;
    if (view.hasOwnProperty('custom')) {
        console.log(`Generating query using custom SQL for view '${view.name}'`);
        sql = view.custom.query;

        // If statement ends with a ';' remove it
        if (sql.substring(sql.length - 1) === ";") {
            sql = sql.substring(0, sql.length - 1);
        }

        const accessControlEnabled = (view.accessControl && view.accessControl.enabled) || false;
        if (accessControlEnabled === true) {
            console.log("Using dataset entitlements");
            let newSql = `SELECT * FROM (\n`;
            newSql += await prependLines(sql, "\t", 1);
            newSql += '\n) s';
            let entityFilter = await generateAccessControlSubquery(view);
            if (entityFilter) {
                newSql += "\nWHERE\n" + entityFilter;
            }
            sql = newSql.trim();
        }
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
        sql += "SELECT\n";
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
        sql += "SELECT *";

        if (hiddenColumns.length > 0) {
            sql += " EXCEPT (";
            sql += hiddenColumns.join(", ");
            sql += ")";
        }
    }
    else {
        // Use all columns
        sql += "SELECT *";
    }

    if (includeFrom === true) {
        sql += "\n";
        sql += `FROM \`${view.projectId}.${source.datasetId}.${source.tableId}\` s`;
    }

    return sql;
}

/**
 * @param  {} view
 */
async function generateAccessControlSubquery(view) {
    const accessControlEnabled = view.accessControl.enabled || false;

    if (accessControlEnabled === true) {
        const accessControlLabelColumn = view.accessControl.labelColumn;
        const accessControlLabelColumnDelimiter = view.accessControl.labelColumnDelimiter;
        let sql = "EXISTS (\n";
        let query = "";
        let useNesting = accessControlLabelColumnDelimiter && accessControlLabelColumnDelimiter.length > 0;
        if (useNesting === true) {
            query += `SELECT 1 FROM UNNEST(split(s.${accessControlLabelColumn}, "${accessControlLabelColumnDelimiter}")) AS flattenedLabel\n`;
            query += `JOIN \`${view.projectId}.${cfg.cdsDatasetId}.${cfg.cdsCurrentUserDatasetViewId}\` e ON LOWER(flattenedLabel) = LOWER(e.tag)\n`;
            query += `WHERE LOWER(e.datasetId) = '${view.datasetId.toLowerCase()}'\n`;
        }
        else {
            query += `SELECT 1 FROM \`${view.projectId}.${cfg.cdsDatasetId}.${cfg.cdsCurrentUserDatasetViewId}\` e\n`;
            query += `WHERE LOWER(e.datasetId) = '${view.datasetId.toLowerCase()}' AND LOWER(e.tag) = LOWER(s.${accessControlLabelColumn})\n`;
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

    let sql = "WITH filteredSourceData AS (\n";
    let selectSql = await generateSelectStatement(view, true);
    sql += await prependLines(selectSql, "\t", 1);

    let whereClause = await generateWhereClause(view);
    if (whereClause) {
        sql += `\n${await prependLines(whereClause, "\t", 1)}`;
    }

    // Closing paranthesis for CTE
    sql += "\n)";

    sql += ",\nrecordCount AS (\n";
    sql += "\tSELECT COUNT(*) AS count FROM filteredSourceData";
    sql += "\n),";
    sql += "\npublicData AS (\n";

    let publicSql = selectSql;
    publicSql += `\nWHERE ${source.publicAccess.queryFilter.trim()}`;

    if (source.publicAccess.limit) {
        publicSql += `\nLIMIT ${source.publicAccess.limit}`;
    }

    sql += await prependLines(publicSql, "\t", 1);
    sql += "\n)";

    sql += "\nSELECT * FROM filteredSourceData";

    sql += "\nunion all\n";
    sql += "SELECT * FROM publicData\nWHERE (SELECT SUM(count) FROM recordCount) = 0";

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
        sql += `WHERE ${sqlFilter}`;
        whereAdded = true;
    }

    const accessControlEnabled = (view.accessControl && view.accessControl.enabled) || false;
    if (accessControlEnabled === true) {
        console.log("Using dataset entitlements");
        let entityFilter = await generateAccessControlSubquery(view);
        if (entityFilter) {
            sql += (whereAdded ? " AND " : "WHERE ") + entityFilter;
        }
    }

    return sql.trim();
}

/**
 * @param  {} view
 */
async function generateWhereSqlForTest(view) {
    let sql = `SELECT * FROM \`${view.projectId}.${view.source.datasetId}.${view.source.tableId}\``;

    const sqlFilter = view.source.queryFilter;
    if (sqlFilter !== undefined && sqlFilter.trim().length > 0) {
        sql += `WHERE ${sqlFilter}`;
    }

    return sql;
}

/**
 * @param  {} view
 */
async function generatePublicWhereSqlForTest(view) {
    let sql = `SELECT * FROM \`${view.projectId}.${view.source.datasetId}.${view.source.tableId}\``;

    const sqlFilter = view.source.publicAccess.queryFilter;
    if (sqlFilter !== undefined && sqlFilter.trim().length > 0) {
        sql += `WHERE ${sqlFilter}`;
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