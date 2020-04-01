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
let bigqueryUtil = new BigQueryUtil();
const labelName = "cds_managed";
const configValidator = require('./views/configValidator');
const cfg = require('../lib/config');

/**
 * @param  {string} projectId
 * @param  {string} datasetId
 * @param  {string} tableId
 * Get the FQDN format for a project's table or view name
 */
function getTableFqdn(projectId, datasetId, tableId) {
    return `${projectId}.${datasetId}.${tableId}`;
}

/**
 * @param  {string} projectId
 * Get a list of Datasets based off labelKey string
 */
async function listDatasets(projectId) {
    const labelKey = labelName;
    const datasets = await bigqueryUtil.getDatasetsByLabel(projectId, labelKey).catch(err => {
        console.warn(err);
        return { success: false, errors: [err.message] };
    });
    if (datasets === undefined) {
        const message = `Datasets do not exist with labelKey: '${labelKey}'`;
        return { success: false, code: 400, errors: [message] };
    }
    return { success: true, data: datasets }
}

/**
 * @param  {string} projectId
 * @param  {string} datasetId
 * Create a Dataset based off labelKey string
 */
async function createDataset(projectId, datasetId, description) {
    const options = {};
    options.labels = { [labelName]: "true" };
    if (description) {
        options.description = description;
    }
    const bigqueryUtil = new BigQueryUtil(projectId);
    const dataset = await bigqueryUtil.createDataset(datasetId, options).catch(err => {
        console.warn(err);
        return { success: false, errors: [err.message] };
    });
    if (dataset.success === false) {
        return { code: 400, ...dataset };
    }
    if (dataset === undefined || dataset === null) {
        const message = `DatasetId: '${datasetId}' creation failed.`;
        return { success: false, errors: [message] };
    }
    return {
        data: {
            datasetId: dataset.id,
            metadata: {
                labels: dataset.metadata.labels,
                location: dataset.metadata.location
            }
        }
    };
}

/**
 * @param  {string} projectId
 * @param  {string} datasetId
 * Get a Datasets based off datasetId and labelKey string
 */
async function getDataset(projectId, datasetId) {
    const labelKey = labelName;
    const dataset = await bigqueryUtil.getDatasetMetadata(datasetId).catch(err => {
        console.warn(err);
        return { success: false, errors: [err.message] };
    });
    if (dataset.success === false) {
        return { code: 400, ...dataset };
    }
    if (dataset.labels === undefined || dataset.labels[labelName] != "true") {
        const message = `Dataset do not exist with datasetId: '${datasetId}', labelKey: '${labelKey}'`;
        return { success: false, code: 400, errors: [message] };
    }
    const data = {
        datasetId: dataset.datasetReference.datasetId,
        description: dataset.description,
        modifiedTime: dataset.lastModifiedTime
    };
    return { success: true, data: data }
}

/**
 * @param  {} projectId
 * @param  {} datasetId
 * @param  {} createdBy
 */
async function deleteDataset(projectId, datasetId, createdBy) {
    const result = await bigqueryUtil.deleteDataset(datasetId, false);
    console.log(result);
    if (result) {
        // Update and delete related views
        const viewStatement = `insert into \`datashare.authorizedView\` (rowId, authorizedViewId, name, description, datasetId, source, expiration, custom, createdAt, createdBy, viewSql, isDeleted)
        select GENERATE_UUID(), authorizedViewId, name, description, datasetId, source, expiration, custom, CURRENT_TIMESTAMP(), @createdBy, viewSql, true
        from \`datashare.currentAuthorizedView\`
        where datasetId = @datasetId and isDeleted = false`;

        const bigqueryUtil = new BigQueryUtil(projectId);

        // console.log(`Executing view update: ${viewStatement}`);
        const viewOptions = {
            query: viewStatement,
            params: { createdBy: createdBy, datasetId: datasetId }
        };
        await bigqueryUtil.executeQuery(viewOptions);

        // Updated related policies to remove the deleted dataset
        const policyStatement = `INSERT INTO \`datashare.policy\` (rowId, policyId, name, description, datasets, rowAccessTags, createdBy, createdAt, isDeleted)
    WITH datasetRows as (
      SELECT rowId
      FROM \`datashare.currentPolicy\` cp
      WHERE cp.isDeleted = false AND EXISTS (SELECT 1
        FROM UNNEST(cp.datasets)
        WHERE datasetId = @datasetId)
    ),
    datasets as (
      SELECT cp.rowId, d.datasetId
      FROM \`datashare.currentPolicy\` cp
      CROSS JOIN cp.datasets d
      JOIN datasetRows dr on cp.rowId = dr.rowId
    ),
    availableDatasets as (
      SELECT schema_name as datasetId
      FROM INFORMATION_SCHEMA.SCHEMATA
      -- WHERE catalog_name = 'cds-demo-1-271622' -- filter isn't required as current project is set already
    ),
    policyDatasets as (
      SELECT d.rowId, ARRAY_AGG(STRUCT(d.datasetId)) as datasets
      FROM datasets d
      JOIN availableDatasets a on a.datasetId = d.datasetId
      GROUP BY d.rowId
    )
    select
      GENERATE_UUID() as rowId,
      policyId,
      name,
      description,
      pd.datasets,
      rowAccessTags,
      @createdBy,
      CURRENT_TIMESTAMP() as createdAt,
      isDeleted
    FROM datasetRows dr
    JOIN \`datashare.currentPolicy\` cp on dr.rowId = cp.rowId
    LEFT JOIN policyDatasets pd on cp.rowId = pd.rowId;`;

        // console.log(`Executing policy update: ${policyStatement}`);
        const policyOptions = {
            query: policyStatement,
            params: { createdBy: createdBy, datasetId: datasetId }
        };
        await bigqueryUtil.executeQuery(policyOptions);

        return { success: true }
    }
    else {
        return { success: false, errors: ['Failed to delete dataset'] };
    }
}

/**
 * @param  {} projectId
 */
async function listViews(projectId) {
    return listDatasetViews(projectId, null);
}

/**
 * @param  {} projectId
 * @param  {} datasetId
 */
async function listDatasetViews(projectId, datasetId) {
    const table = getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsAuthorizedViewViewId);
    let fields = cfg.cdsAuthorizedViewViewFields;
    let remove = ['source', 'expiration', 'custom', 'viewSql', 'isDeleted'];
        remove.forEach(f => fields.delete(f));
        fields = Array.from(fields).map(i => 'v.' + i).join();
    let sqlQuery = `SELECT ${fields}
      FROM \`${table}\` v
      where isDeleted is false`;

    if (datasetId) {
        sqlQuery += '\nand datasetId = @datasetId'
    }

    let options = {
        query: sqlQuery
    };

    if (datasetId) {
        options.params = { datasetId: datasetId };
    }

    const [rows] = await bigqueryUtil.executeQuery(options);
    return { success: true, data: rows }
}

/**
 * @param  {} projectId
 * @param  {} datasetId
 * @param  {} viewId
 */
async function getDatasetView(projectId, datasetId, viewId) {
    return { success: true }
}

/**
 * @param  {} projectId
 * @param  {} datasetId
 * @param  {} view
 */
async function validateDatasetView(projectId, datasetId, view) {
    const result = await configValidator.validate(view);
    return { success: result.isValid, errors: result.issues };
}

/**
 * @param  {} projectId
 * @param  {} datasetId
 * @param  {} viewId
 * @param  {} view
 */
async function createOrUpdateDatasetView(projectId, datasetId, viewId, view) {
    return { success: true }
}

/**
 * @param  {} projectId
 * @param  {} datasetId
 * @param  {} viewId
 */
async function deleteDatasetView(projectId, datasetId, viewId) {
    return { success: true }
}

module.exports = {
    listDatasets,
    createDataset,
    getDataset,
    deleteDataset,
    listDatasetViews,
    getDatasetView,
    validateDatasetView,
    createOrUpdateDatasetView,
    deleteDatasetView
};
