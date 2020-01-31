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

var compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const dataManager = require("./dataManager");

// Import the validation functions for the API
const validateManager = require('./validateManager');
const FULFILLMENT_CONFIG = require('./validateManager').FULFILLMENT_CONFIG;

/************************************************************
  API Endpoints
 ************************************************************/
// Define the routes for the REST API
var spots = express.Router();
// methods that require multiple routes
var routes = [];

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
 *       pubsubTopicName:
 *         type: string
 *         description: Spot API Service Pubsub Topic Name
 *       pubsubSubscriptionName:
 *         type: string
 *         description: Spot API Service Pubsub Pull Subscription Name
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
 *         required: true
 *         description: Spot destination storage bucket name
 *       fileName:
 *         type: string
 *         required: false
 *         description: Spot destination storage file name
 *       projectId:
 *         type: string
 *         required: true
 *         description: Spot destination GCP project ID
 *
 *   SpotSchema:
 *     type: object
 *     description: Spot schema
 *     properties:
 *       dataId:
 *         type: string
 *         required: true
 *       parameters:
 *         type: object
 *         required: false
 *       destination:
 *         $ref: '#/definitions/SpotDestination'
 *
 *   SpotResponseSchema:
 *     type: object
 *     description: Spot response
 *     properties:
 *       requestId:
 *         type: string
 *         required: true
 *       query:
 *         type: string
 *         required: true
 *       bucketName:
 *         type: string
 *         required: true
 *       fileName:
 *         type: string
 *         required: true
 *       signedUrl:
 *         type: string
 *         required: false
 *
 */

spots.get('/', function(req, res) {
    res.status(200).json({
        success: true,
        code: 200,
        message: 'Welcome!'
    });
});

/**
 * @swagger
 *
 * /projects/{projectId}/spots:config:
 *   get:
 *     summary: Spot API service environment configuration
 *     description: Returns the Spot API service configuration
 *     responses:
 *       200:
 *         description: Spot API service configuration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Success of the request
 *                 code:
 *                   type: integer
 *                   description: HTTP status code
 *                 data:
 *                   type: object
 *                   description: Spot API service config
 *                   properties:
 *                     $ref: '#/definitions/SpotApiServiceConfig'
 */
spots.get('/projects/:projectId/spots:config', async(req, res) => {
    var data = {
        config: FULFILLMENT_CONFIG
    };
    res.status(200).json({
        success: true,
        code: 200,
        data: data
    });
});

/**
 * @swagger
 *
 * /projects/{projectId}/spots:options:
 *   get:
 *     summary: Spot query options (entitlement) for the Spot API service
 *     description: Returns the Spot query options for the Spot API service
 *     parameters:
 *     - in: query
 *       name: includeAvailableValues
 *       schema:
 *          type: boolean
 *       required: false
 *       description: Include available values in options response
 *     responses:
 *       200:
 *         description: Spot query options 200 response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Success of the request
 *                 code:
 *                   type: integer
 *                   description: HTTP status code
 *                 data:
 *                   type: array
 *                   description: list of Spot API entitlements query options
 *                   items:
 *                     $ref: '#/definitions/SpotOptions'
 */
spots.get('/projects/:projectId/spots:options', validateManager.fulfillmentConfig, async(req, res) => {
    const options = {
        includeAvailableValues: req.query.includeAvailableValues ? req.query.includeAvailableValues === "true" : false,
        config: FULFILLMENT_CONFIG
    };
    try {
        const data = await validateManager.getAvailableRequests(options)
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
    } catch (err) {
        res.status(500).json({
            success: false,
            code: 500,
            errors: [err.message]
        })
    }
});

/**
 * @swagger
 *
 * /projects/{projectId}/spots:
 *   post:
 *     summary: Create Spot based off request parameters
 *     description: Returns the Spot response
 *     requestBody:
 *       description: Request parameters for Spot
 *       content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/SpotSchema'
 *     responses:
 *       201:
 *         description: Spot Configuration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Success of the request
 *                 code:
 *                   type: integer
 *                   description: HTTP status code
 *                 data:
 *                   items:
 *                     $ref: '#/definitions/SpotResponseSchema'
 */
spots.post('/projects/:projectId/spots', validateManager.fulfillmentParams, async(req, res) => {
    const options = {
        config: FULFILLMENT_CONFIG,
        ... req.body
    };
    console.log(`Options: ${JSON.stringify(options)}`);
    const data = await dataManager.createFulfillmentRequest(options);
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

spots.get('/projects/:projectId/spots/:requestId', async(req, res) => {
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

    const data = await dataManager.getFulfillmentRequest(requestId, bucketName, fileName);
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

spots.post('/projects/:projectId/spots:subscriber', validateManager.fulfillmentWebhookParams, async(req, res) => {
    const options = {
        config: FULFILLMENT_CONFIG,
        ... req.body
    };
    console.log(`Options: ${JSON.stringify(options)}`);
    try {
        const data = validateManager.fulfillmentWebhookPayload(options)
        // Don't wait for the response
        dataManager.processFulfillmentSubscriptionRequest(data.options).catch (err => {
            console.warn(`processFulfillmentSubscriptionRequest error: ${err.message}`);
        });
        res.status(202).json({
            success: true,
            code: 202,
            data: { requestId: data.requestId }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            code: 500,
            errors: [err.message]
        })
    }
});

spots.post('/projects/:projectId/spots:worker', async(req, res) => {
    const options = {
        config: FULFILLMENT_CONFIG
    };
    console.log(`Options: ${JSON.stringify(options)}`);
    const data = await dataManager.pullFulfillmentSubscriptionRequest(options);
    //console.log(data);
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

spots.get('*', function(req, res) {
    res.status(404).json({
        success: true,
        code: 404,
        message: 'Not Found.'
    });
});



module.exports = spots;
