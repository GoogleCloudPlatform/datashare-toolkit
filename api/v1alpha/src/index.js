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

var compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const apiVersion = "v1alpha";
const PORT = process.env.PORT || 5555;
/************************************************************
  OpenAPI Definition
 ************************************************************/
const options = {
    definition: {
        openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
        info: {
            description: 'This is the BQDS Spot Fulfillment API service that provides data producers the ability to expose subsets of their datasets programatically.',
            title: 'BQDS Spot Fulfillment - API Service', // Title (required)
            version: '0.0.1', // Version (required)
            contact: {
                email: 'no-reply@google.com'
            },
            license: {
                name: 'Apache 2.0',
                url: 'https://github.com/GoogleCloudPlatform/bq-datashare-toolkit/blob/master/LICENSE.txt'
            }
        },
        servers: [{
            url: '{serverUrl}/{basePath}',
            variables: {
                serverUrl: {
                    default: 'http://localhost:' + PORT,
                    description: 'Customer provided serverUrl (protocol://hostname:port) for the service'
                },
                basePath: {
                    default: apiVersion,
                    description: 'Customer provided basePath for the service'
                }
            }
        }],
        externalDocs: {
            description: 'Find out more about BQ Datashare Toolkit',
            url: 'https://github.com/GoogleCloudPlatform/bq-datashare-toolkit'
        }
    },
    // Path to the API docs
    apis: ['./index.js', './src/index.js'],
};

const openapiSpec = swaggerJSDoc(options);

const app = express();
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.raw({type: 'application/octet-stream'}));

const dataManager = require("./dataManager");

// Import the validation functions for the API
const validateManager = require('./validateManager');
const FULFILLMENT_CONFIG = require('./validateManager').FULFILLMENT_CONFIG;

/************************************************************
  API Endpoints
 ************************************************************/
// Define the routes for the REST API
var router = express.Router();
// methods that require multiple routes
var routes = [];

// CORS will be controlled by the API GW layer
router.all('*', cors());

// All of the API routes will be prefixed with /api
app.use('/' + apiVersion, router);

/**
 * @swagger
 *
 * definitions:
 *   BucketConfig:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         description: Name of the Bucket
 *       location:
 *         type: string
 *         description: Geographic location of the Bucket
 *
 *   SpotFulfillmentQueryParameter:
 *     type: object
 *     description: Spot Fulfillment Query Parameters Definition
 *     properties:
 *       name:
 *         type: string
 *         description: Spot Fulfillment query parameter name
 *       description:
 *         type: string
 *         description: Spot Fulfillment query parameter description
 *
 *   SpotFulfillmentApiServiceConfig:
 *     type: object
 *     description: Spot Fulfillment API service config
 *     properties:
 *       bucketName:
 *         type: string
 *         description: Spot Fulfillment API Service Bucket Name
 *       fileName:
 *         type: string
 *         description: Spot Fulfillment API Service Config File Name
 *       pubsubTopicName:
 *         type: string
 *         description: Spot Fulfillment API Service Pubsub Topic Name
 *       pubsubSubscriptionName:
 *         type: string
 *         description: Spot Fulfillment API Service Pubsub Pull Subscription Name
 *
 *   SpotFulfillmentEntitlementsQueryOptions:
 *     type: object
 *     description: Spot Fulfillment API entitlements query options
 *     properties:
 *       name:
 *         type: string
 *         description: Spot Fulfillment query set name
 *       dataId:
 *         type: string
 *         description: Unique Spot Fulfillment query set name
 *       params:
 *         type: array
 *         description: Available Spot Fulfillment parameters to query
 *         items:
 *           $ref: '#/definitions/SpotFulfillmentQueryParameter'
 *
 *   SpotFulfillmentRequestDestination:
 *     type: object
 *     description: Spot Fulfillment request destination
 *     properties:
 *       bucketName:
 *         type: string
 *         required: true
 *         description: Spot Fulfillment destination storage bucket name
 *       fileName:
 *         type: string
 *         required: false
 *         description: Spot Fulfillment destination storage file name
 *       projectName:
 *         type: string
 *         required: true
 *         description: Spot Fulfillment destination GCP project name
 *
 *   SpotFulfillmentRequestSchema:
 *     type: object
 *     description: Spot Fulfillment request schema
 *     properties:
 *       dataId:
 *         type: string
 *         required: true
 *       parameters:
 *         type: object
 *         required: false
 *       destination:
 *         $ref: '#/definitions/SpotFulfillmentRequestDestination'
 *
 *   SpotFulfillmentRequestsResponseSchema:
 *     type: object
 *     description: Spot Fulfillment requests response
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
 *   SpotFulfillmentRequestsStatusResponseSchema:
 *     type: object
 *     description: Spot Fulfillment requests status response
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
 *         required: true
 *
 *   SpotFulfillmentSubscriberRequestSchema:
 *     type: object
 *     description: Spot Fulfillment subscriber webhook request schema (Note that the message.data field is base64-encoded.)
 *     properties:
 *       message:
 *         type: object
 *         required: true
 *         properties:
 *           attributes:
 *             type: object
 *             required: true
 *             properties:
 *               requestId:
 *                 type: string
 *                 required: true
 *           data:
 *             type: string
 *             required: true
 *           messageId:
 *             type: string
 *             required: true
 *       subscription:
 *         type: string
 *         required: true
 *
 *   SpotFulfillmentWorkerResponseSchema:
 *     type: object
 *     description: Spot Fulfillment worker response schema
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
 *         required: true
 *
 */

/**
 * @swagger
 *
 * /:
 *   get:
 *     summary: Welcome message status
 *     description: Returns a welcome message for the API
 *     responses:
 *       200:
 *         description: Welcome Message Response
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
 *                 message:
 *                   type: string
 *                   description: Status message
 */
router.get('/', function(req, res) {
    res.status(200).json({
        success: true,
        code: 200,
        message: 'Welcome to the BQDS API (' + apiVersion + ')!'
    });
});

/**
 * @swagger
 *
 * /serviceConfig:
 *   get:
 *     summary: Spot Fulfillment API service environment configuration
 *     description: Returns the Spot Fulfillment API service configuration
 *     responses:
 *       200:
 *         description: Spot Fulfillment API service configuration
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
 *                   description: Spot Fulfillment API service config
 *                   properties:
 *                     $ref: '#/definitions/SpotFulfillmentApiServiceConfig'
 */
router.get('/serviceConfig', async(req, res) => {
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
 * /fulfillmentOptions:
 *   get:
 *     summary: Spot Fulfillment entitlement query options for the API service
 *     description: Returns the Spot Fulfillment entitlement query options for the API service
 *     parameters:
 *     - in: query
 *       name: includeAvailableValues
 *       schema:
 *          type: boolean
 *       required: false
 *       description: Include available values in options response
 *     responses:
 *       200:
 *         description: Spot Fulfillment entitlement query options 200 response
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
 *                   description: list of Spot Fulfillment API entitlements query options
 *                   items:
 *                     $ref: '#/definitions/SpotFulfillmentEntitlementsQueryOptions'
 */
router.get('/fulfillmentOptions', validateManager.fulfillmentConfig, async(req, res) => {
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
 * /fulfillmentRequests:
 *   post:
 *     summary: Create Spot Fulfillment request based off request parameters
 *     description: Returns the Spot Fulfillment Request response
 *     requestBody:
 *       description: Request parameters for Spot Fulfillment
 *       content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/SpotFulfillmentRequestSchema'
 *     responses:
 *       201:
 *         description: Spot Fulfillment Configuration
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
 *                     $ref: '#/definitions/SpotFulfillmentRequestsResponseSchema'
 */
router.post('/fulfillmentRequests', validateManager.fulfillmentParams, async(req, res) => {
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

/**
 * @swagger
 *
 * /fulfillmentRequests/{requestId}:
 *   get:
 *     summary: Check Spot Fulfillment request status based off Request ID
 *     description: Returns the Spot Fulfillment Request Status response
 *     parameters:
 *     - in: path
 *       name: requestId
 *       schema:
 *          type: string
 *       required: true
 *       description: Request Id of the Spot Fulfillment request
 *     - in: query
 *       name: bucketName
 *       schema:
 *          type: string
 *       required: true
 *       description: Bucket Name from the Spot Fulfillment Request Id
 *     - in: query
 *       name: fileName
 *       schema:
 *          type: string
 *       required: true
 *       description: File Name from the Spot Fulfillment Request Id
 *     responses:
 *       200:
 *         description: Spot Fulfillment Request Status 200 Response
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
 *                   default: 200
 *                   description: HTTP status code
 *                 data:
 *                   $ref: '#/definitions/SpotFulfillmentRequestsStatusResponseSchema'
 *       400:
 *         description: Spot Fulfillment Request Status 400 Response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: false
 *                   description: Success of the request
 *                 code:
 *                   type: integer
 *                   default: 400
 *                   description: HTTP status code
 *                 errors:
 *                   type: array
 *                   description: list of Spot Fulfillment errors
 *                   items:
 *                     type: string
 */
router.get('/fulfillmentRequests/:requestId', async(req, res) => {
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

/**
 * @swagger
 *
 * /fulfillmentSubscriber:
 *   post:
 *     summary: Spot Fulfillment subscriber webhook request endpoint
 *     description: Spot Fulfillment subscriber webhook request endpoint receives Spot Fulfillment request message from GCP PubSub, acknowledges that request, and completes the appropriate execution tasks asynchronously for the fulfillment request.
 *     requestBody:
 *       description: Request parameters for Spot Fulfillment subscriber webhook
 *       content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/SpotFulfillmentSubscriberRequestSchema'
 *     responses:
 *       202:
 *         description: Spot Fulfillment subscriber webhook 202 response
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
 *                   properties:
 *                     requestId:
 *                       type: string
 *                       required: true
 *       400:
 *         description: Spot Fulfillment subscriber webhook 400 response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: false
 *                   description: Success of the request
 *                 code:
 *                   type: integer
 *                   default: 400
 *                   description: HTTP status code
 *                 errors:
 *                   type: array
 *                   description: list of Spot Fulfillment errors
 *                   items:
 *                     type: string
 */
router.post('/fulfillmentSubscriber', validateManager.fulfillmentWebhookParams, async(req, res) => {
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

/**
 * @swagger
 *
 * /fulfillmentWorker:
 *   post:
 *     summary: Spot Fulfillment worker request endpoint
 *     description: Spot Fulfillment worker request endpoint pulls a fulfillment request message from GCP PubSub, acknowledges that request, and completes the execution tasks from the fulfillment request.
 *     responses:
 *       201:
 *         description: Spot Fulfillment worker 201 response
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
 *                     $ref: '#/definitions/SpotFulfillmentWorkerResponseSchema'
 *       400:
 *         description: Spot Fulfillment worker 400 response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: false
 *                   description: Success of the request
 *                 code:
 *                   type: integer
 *                   default: 400
 *                   description: HTTP status code
 *                 errors:
 *                   type: array
 *                   description: list of Spot Fulfillment errors
 *                   items:
 *                     type: string
 */
router.post('/fulfillmentWorker', async(req, res) => {
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

/**
 * @swagger
 *
 * /docs:
 *   get:
 *     summary: Swagger UI for BQDS Spot fulfillment OpenAPI Specification
 *     description: Returns the Swagger UI with the OpenAPI specification for the BQDS Spot fulfillment API Service
 *     responses:
 *       200:
 *         description: Welcome Message Response
 *         content:
 *           text/html:
 *              schema:
 *                type: object
 */
router.use(['/docs', '/api-docs'], swaggerUi.serve);
router.get(['/docs', '/api-docs'], swaggerUi.setup(openapiSpec));

/**
 * @swagger
 *
 * /docs/openapi_spec:
 *   get:
 *     summary: BQDS Spot fulfillment OpenAPI Specification
 *     description: Returns the OpenAPI specification for the BQDS Spot fulfillment API Service
 *     responses:
 *       200:
 *         description: Welcome Message Response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
routes = [
    '/docs/openapi_spec',
    '/docs/openapi_spec.json',
    '/openapi_spec'
]
router.get(routes, function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(openapiSpec);
});

/**
 * @swagger
 *
 * /*:
 *   get:
 *     summary: Default 404 Response
 *     description: Returns the default 404 response after all other routes exhausted
 *     responses:
 *       404:
 *         description: Default 404 Response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: true
 *                   description: Success of the request
 *                 code:
 *                   type: integer
 *                   description: HTTP status code
 *                 message:
 *                   type: string
 *                   description: Status message
 */
router.get('*', function(req, res) {
    res.status(404).json({
        success: true,
        code: 404,
        message: 'Not Found.'
    });
});

// default app route redirects to current API version for now
app.get('/', function(req, res) {
    res.redirect('/' + apiVersion);
});


/************************************************************
  Start server
 ************************************************************/
app.listen(PORT, () => {
    console.log("Listening on port " + PORT + ". Press Ctrl+C to quit.");
});

module.exports = app;
