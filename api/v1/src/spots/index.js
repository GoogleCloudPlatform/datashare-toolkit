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

const express = require('express');

const dataManager = require("./dataManager");

// Import the validation functions for the API
const validateManager = require('./validateManager');

/************************************************************
  API Endpoints
 ************************************************************/
// Define the routes for the REST API
var spots = express.Router();
// methods that require multiple routes

/**
 * @swagger
 *
 * definitions:
 *   SpotApiServiceConfig:
 *     type: object
 *     description: Spot API service config
 *     properties:
 *       bucketName:
 *         type: string
 *         description: Spot API Service Bucket Name
 *       fileName:
 *         type: string
 *         description: Spot API Service Config File Name
 *
 *   SpotOptions:
 *     type: object
 *     description: Spott API query options (entitlement)
 *     properties:
 *       name:
 *         type: string
 *         description: Spot query set name
 *       dataId:
 *         type: string
 *         description: Unique Spot query set name
 *       params:
 *         type: array
 *         description: Available Spot parameters to query
 *         items:
 *           $ref: '#/definitions/SpotQueryParameter'
 *
 *   SpotQueryParameter:
 *     type: object
 *     description: Spot Query Parameters Definition
 *     properties:
 *       name:
 *         type: string
 *         description: Spot query parameter name
 *       description:
 *         type: string
 *         description: Spot query parameter description
 *
 *   SpotDestination:
 *     type: object
 *     description: Spot destination
 *     properties:
 *       bucketName:
 *         type: string
 *         description: Spot destination storage bucket name
 *       fileName:
 *         type: string
 *         description: Spot destination storage file name
 *       projectId:
 *         type: string
 *         description: Spot destination GCP project ID
 *     required:
 *       - bucketName
 *       - fileName
 *       - projectId
 *
 *   SpotSchema:
 *     type: object
 *     description: Spot schema
 *     properties:
 *       dataId:
 *         type: string
 *       parameters:
 *         type: object
 *       destination:
 *         $ref: '#/definitions/SpotDestination'
 *     required:
 *       - dataId
 *
 *   SpotResponseSchema:
 *     type: object
 *     description: Spot response
 *     properties:
 *       requestId:
 *         type: string
 *       query:
 *         type: string
 *       bucketName:
 *         type: string
 *       fileName:
 *         type: string
 *       signedUrl:
 *         type: string
 *     required:
 *       - requestId
 *       - query
 *       - bucketName
 *       - fileName
 *
 *   SpotStatusResponseSchema:
 *     type: object
 *     description: Spot request status response
 *     properties:
 *       requestId:
 *         type: string
 *       query:
 *         type: string
 *       bucketName:
 *         type: string
 *       fileName:
 *         type: string
 *       signedUrl:
 *         type: string
 *     required:
 *       - requestId
 *       - query
 *       - bucketName
 *       - fileName
 *       - signedUrl
 *
 */

/**
 * @swagger
 *
 * /spots:config:
 *   options:
 *     summary: CORS support
 *     description: Enable CORS by returning correct headers
 *     operationId: optionsSpotsConfig
 *     security: [] # no security for preflight requests
 *     responses:
 *       200:
 *         description: Default response for CORS method
 *         headers:
 *           Access-Control-Allow-Headers:
 *             type: "string"
 *           Access-Control-Allow-Methods:
 *             type: "string"
 *           Access-Control-Allow-Origin:
 *             type: "string"
 *   get:
 *     summary: Spot API service environment configuration
 *     description: Returns the Spot API service configuration
 *     operationId: getSpotConfig
 *     parameters:
 *     - in: header
 *       name: x-gcp-project-id
 *       type: string
 *       required: true
 *     tags:
 *       - spots
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Spot API service configuration
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               description: Success of the request
 *             code:
 *               type: integer
 *               description: HTTP status code
 *             data:
 *               $ref: '#/definitions/SpotApiServiceConfig'
 */
/**
 * @swagger
 *
 * /spots:options:
 *   options:
 *     summary: CORS support
 *     description: Enable CORS by returning correct headers
 *     operationId: optionsGetSpotOptions
 *     security: [] # no security for preflight requests
 *     responses:
 *       200:
 *         description: Default response for CORS method
 *         headers:
 *           Access-Control-Allow-Headers:
 *             type: "string"
 *           Access-Control-Allow-Methods:
 *             type: "string"
 *           Access-Control-Allow-Origin:
 *             type: "string"
 *   get:
 *     summary: Spot query options (entitlement) for the Spot API service
 *     description: Returns the Spot query options for the Spot API service
 *     operationId: getSpotOptions
 *     tags:
 *       - spots
 *     parameters:
 *     - in: query
 *       name: includeAvailableValues
 *       type: boolean
 *       required: false
 *       description: Include available values in options response
 *     - in: header
 *       name: x-gcp-project-id
 *       type: string
 *       required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Spot query options 200 response
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               description: Success of the request
 *             code:
 *               type: integer
 *               description: HTTP status code
 *             data:
 *               type: array
 *               description: list of Spot API entitlements query options
 *               items:
 *                 $ref: '#/definitions/SpotOptions'
 */
spots.get('/spots::custom', async(req, res) => {
    var data;
    const options = {
        includeAvailableValues: req.query.includeAvailableValues ? req.query.includeAvailableValues === "true" : false,
        config: dataManager.getSpotConfig()
    };
    switch (req.params.custom) {
        case "options":
            data = await validateManager.getSpotOptions(options)
            var code;
            if (data && data.success === false) {
                code = (data.code === undefined ) ? 500 : data.code;
            } else {
                code = (data.code === undefined ) ? 200 : data.code;
            }
            return res.status(code).json({
                code: code,
                ... data
            });
        case "config":
            data = {
                config: dataManager.getSpotConfig()
            };
            return res.status(200).json({
                success: true,
                code: 200,
                data: data
            });
    }
});

/**
 * @swagger
 *
 * /spots:
 *   post:
 *     summary: Create Spot based off request parameters
 *     description: Returns the Spot response
 *     operationId: createSpotRequest
 *     tags:
 *       - spots
 *     parameters:
 *     - in: header
 *       name: x-gcp-project-id
 *       type: string
 *       required: true
 *     - in: body
 *       name: spot
 *       description: Request parameters for Spot
 *       schema:
 *         $ref: '#/definitions/SpotSchema'
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: Spot Configuration
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               description: Success of the request
 *             code:
 *               type: integer
 *               description: HTTP status code
 *             data:
 *               items:
 *                 $ref: '#/definitions/SpotResponseSchema'
 */
spots.post('/spots', validateManager.spotParams, async(req, res) => {
    const options = {
        config: dataManager.getSpotConfig(),
        ... req.body
    };
    console.log(`Options: ${JSON.stringify(options)}`);
    const data = await dataManager.createSpot(options);
    var code;
    if (data && data.success === false) {
        code = (data.code === undefined ) ? 500 : data.code;
    } else {
        code = (data.code === undefined ) ? 201 : data.code;
    }
    res.status(code).json({
        code: code,
        ... data
    });
});

/**
 * @swagger
 *
 * /spots/{requestId}:
 *   get:
 *     summary: Check Spot status based off Request ID
 *     description: Returns the Spot Status response
 *     operationId: getSpotRequestByRequestId
 *     tags:
 *       - spots
 *     parameters:
 *     - in: path
 *       name: requestId
 *       type: string
 *       required: true
 *       description: Request Id of the Spot request
 *     - in: query
 *       name: bucketName
 *       type: string
 *       required: true
 *       description: Bucket Name from the Spot Request Id
 *     - in: query
 *       name: fileName
 *       type: string
 *       required: true
 *       description: File Name from the Spot Request Id
 *     - in: header
 *       name: x-gcp-project-id
 *       type: string
 *       required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Spot Status 200 Response
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               description: Success of the request
 *             code:
 *               type: integer
 *               default: 200
 *               description: HTTP status code
 *             data:
 *               $ref: '#/definitions/SpotStatusResponseSchema'
 *       400:
 *         description: Spot Status 400 Response
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               default: false
 *               description: Success of the request
 *             code:
 *               type: integer
 *               default: 400
 *               description: HTTP status code
 *             errors:
 *               type: array
 *               description: list of Spot errors
 *               items:
 *                 type: string
 */
spots.get('/spots/:requestId', async(req, res) => {
    const requestId = req.params.requestId;
    const bucketName = req.query.bucketName;
    const fileName = req.query.fileName;

    if (!bucketName || !fileName) {
        return res.status(400).json({
            success: false,
            code: 400,
            errors: ['bucketName and fileName query parameters are required']
        });
    }

    const data = await dataManager.getSpot(requestId, bucketName, fileName);
    var code;
    if (data && data.success === false) {
        code = (data.code === undefined ) ? 500 : data.code;
    } else {
        code = (data.code === undefined ) ? 200 : data.code;
    }
    res.status(code).json({
        code: code,
        ... data
    });
});

module.exports = spots;
