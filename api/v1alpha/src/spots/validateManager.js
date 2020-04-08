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

const { BigQueryUtil, StorageUtil } = require('cds-shared');
let bigqueryUtil;
const storageUtil = new StorageUtil();

const stripJsonComments = require('strip-json-comments');
const underscore = require("underscore");
const Joi = require('@hapi/joi');

/************************************************************
  immutable constant options
 ************************************************************/
const SPOT_SERVICE_CONFIG = {
    bucketName: process.env.SPOT_SERVICE_CONFIG_BUCKET_NAME || "change-me",
    fileName: process.env.SPOT_SERVICE_CONFIG_FILE_NAME || "cds/api/config.json",
    destination: {
        projectId: process.env.SPOT_SERVICE_CONFIG_DESTINATION_PROJECT_ID || "change-me",
        datasetId: process.env.SPOT_SERVICE_CONFIG_DESTINATION_DATASET_ID || "cds_spots",
    }
}

/************************************************************
  spotParameterSchema defines the parameters required
  to submit a Spot request
 ************************************************************/
const spotParameterSchema = Joi.object({
    dataId: Joi.string().required(),
    parameters: Joi.object().required(),
    wait: Joi.boolean(),
    destination: Joi.object().required()
        .keys({
            bucketName: Joi.string().required(),
            fileName: Joi.string(),
            projectId: Joi.string()
        })
});

/**
 * @param  {} options
 * @param  {} includeQuery
 * Returns a list of available requests and the corresponding parameters.
 * TODO: Refactor.
 */
async function getSpotOptions(options, includeQuery) {
    let configBucketName = SPOT_SERVICE_CONFIG.bucketName;
    let configFileName = SPOT_SERVICE_CONFIG.fileName;

    var json;
    let file = await storageUtil.fetchFileContent(configBucketName, configFileName).catch(err =>  {
        console.warn(err.message);
        return { success: false, errors: [err.message]};
    });
    if (file.success === false) {
        return { success: false, errors: [`fileName: '${configFileName}' or bucketName: '${configBucketName}' does not exist`] }
    }
    json = JSON.parse(stripJsonComments(file));

    if (json.entities === undefined) {
        return { success: false, errors: ['File [' + configFileName + '] schema is not correct'] };
    }
    let requests = [];
    for (const e of json.entities) {
        // set bigqueryUtil based off projectId in entities for now
        bigqueryUtil = new BigQueryUtil(e.projectId);
        let fqTable = `${e.projectId}.${e.datasetId}.${e.tableId}`;
        for (const r of e.availableRequests) {
            let request = { name: r.name, dataId: r.dataId };
            let regex = /(\s@[^\s]+)/g;
            let queryString = r.query ? r.query : r.filter;
            let params = queryString.match(regex);
            // console.log(`Matches: ${params}`);

            if (includeQuery === true) {
                let query;
                if (r.query) {
                    query = r.query;
                }
                else if (r.filter) {
                    query = `select * from \`${fqTable}\` where ${r.filter}`;
                }
                query = performTextVariableReplacements(query, e.projectId, e.datasetId, e.tableId);
                // console.log(`Query is ${query}`);
                request.query = query;
            }

            request.params = [];
            // eslint-disable-next-line no-loop-func

            for (const p of underscore.uniq(params)) {
                /* eslint-disable no-loop-func */
                let foundParam = e.parameters.find((rp) => {
                    return p.trim().toLowerCase() === `@${rp.name.toLowerCase()}`;
                });

                let list;
                if (options.includeAvailableValues) {
                    let query;
                    let availableValues = [];

                    // Find the unique available values using the 'column' or 'custom' query attribute from foundParam
                    if (foundParam.column) {
                        query = `select distinct ${foundParam.column} as value from \`${fqTable}\``;
                    }
                    else if (foundParam.custom) {
                        query = performTextVariableReplacements(foundParam.custom, e.projectId, e.datasetId, e.tableId);
                    }
                    if (query) {
                        const queryOptions = {
                            query: query
                        };
                        // eslint-disable-next-line no-await-in-loop
                        availableValues = await bigqueryUtil.executeQuerySync(queryOptions);
                    }
                    // console.log(JSON.stringify(availableValues));
                    list = underscore.pluck(availableValues[0], 'value');
                }

                let _param = { name: foundParam.name, description: foundParam.description };
                if (list) {
                    _param.values = list;
                }
                request.params.push(_param);
            }
            requests.push(request);
        }
    }
    return { data: requests, success: true };
}

/************************************************************
  Validate the Spot query configFileName url query parameter
    Inputs:
      - request, response, next
    Returns:
      - response or next
 ************************************************************/
async function spotConfig(req, res, next) {
    var errors = []

    // validParams validation
    var bucketName = (req.params.bucketName === undefined) ? SPOT_SERVICE_CONFIG.bucketName : req.params.bucketName;
    var configFileName = (req.query.configFileName === undefined) ? SPOT_SERVICE_CONFIG.fileName : req.query.configFileName;

    let result = await storageUtil.checkIfFileExists(bucketName, configFileName).catch(err => {
        errors.push(err.message);
    });
    if (result && result.success === false) {
       errors.push(result.errors);
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors: errors,
            code: 400
        })
    }
    return next();
}

/************************************************************
  Validate Spot data request parameters
    Inputs:
      - request, response, next
    Returns:
      - response or next
 ************************************************************/
function spotParams(req, res, next) {
    var errors = [];
    var message;

    let result = spotParameterSchema.validate(req.body);
    if (result.error) {
        message = `spotParameterSchema validation error: ${JSON.stringify(result.error.details)}`;
        console.warn(message);
        errors.push(result.error.details);
    }
    if (errors.length > 0 ){
        return res.status(400).json({
            success: false,
            errors: errors,
            code: 400
        })
    }
    return next();
}

/**
 * @param  {} options
 * Returns a list of available requests and the corresponding parameters.
 * TODO: Refactor.
 */
async function getDynamicSpotOptions(options) {
    let definitions = await getSpotOptions(options, true).catch(err => {
        console.warn(err.message);
        return { success: false, code: 400, errors: [err.message] };
    });

    var message;
    if (definitions.success === false) {
        message = `Missing query definitions: ${JSON.stringify(missingParams)}`;
        console.warn(message);
        return { success: false, code: 400, errors: [message] };
    }
    let requestDefinition = underscore.findWhere(definitions.data, { dataId: options.dataId });
    if (!requestDefinition) {
        message = `No valid query parameters: ${JSON.stringify(options)}`;
        console.warn(message);
        return { success: false, code: 400, errors: [message] };
    }

    console.log(`Request definition: ${JSON.stringify(requestDefinition)}`);

    let allParamsSupplied = true;

    let params = {};
    let missingParams = [];
    requestDefinition.params.forEach((p) => {
        let exists = underscore.contains(Object.keys(options.parameters), p.name);
        if (!exists) {
            missingParams.push(p.name);
            allParamsSupplied = false;
        }
        params[p.name] = options.parameters[p.name];
    });

    if (!allParamsSupplied) {
        message = `Missing params: ${JSON.stringify(missingParams)}`;
        console.warn(message);
        return { success: false, code: 400, errors: [message] };
    }
    return { query: requestDefinition.query, params: params };
}

/**
 * @param  {} text
 * @param  {} projectId
 * @param  {} datasetId
 * @param  {} tableId
 * Performs string replacement for select attributes.
 */
function performTextVariableReplacements(text, projectId, datasetId, tableId) {
    if (!text) {
        return text;
    }
    if (projectId) {
        text = text.replace(/\$\{projectId\}/g, projectId);
    }
    if (datasetId) {
        text = text.replace(/\$\{datasetId\}/g, datasetId);
    }
    if (tableId) {
        text = text.replace(/\$\{tableId\}/g, tableId);
    }
    return text;
}

/**************************************************************************
  Module exports
 **************************************************************************/
module.exports = {
    spotParams,
    spotConfig,
    getSpotOptions,
    getDynamicSpotOptions
};
module.exports.SPOT_SERVICE_CONFIG = SPOT_SERVICE_CONFIG;
