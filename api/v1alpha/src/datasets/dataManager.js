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
    if (datasets === undefined || datasets.length == 0) {
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
        return { code: 400, ... dataset };
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
        return { code: 400, ... dataset };
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

module.exports = {
    listDatasets,
    createDataset,
    getDataset
};
