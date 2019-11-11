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
    apis: ['./index.js'],
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
 *     properties:
 *       name:
 *         type: string
 *         description: Spot fulfillment query parameter name
 *       description:
 *         type: string
 *         description: Spot fulfillment query parameter description
 *
 *   SpotFulfillmentApiServiceConfig:
 *     type: object
 *     properties:
 *       bucketName:
 *         type: string
 *         description: Spot fulfillment API Service Bucket Name
 *       fileName:
 *         type: string
 *         description: Spot fulfillment API Service Config File Name
 *       pubsubTopicName:
 *         type: string
 *         description: Spot fulfillment API Service Pubsub Topic Name
 *
 *   SpotFulfillmentConfig:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         description: Spot fulfillment query set name
 *       dataId:
 *         type: string
 *         description: Unique Spot fulfillment query set name
 *       params:
 *         type: array
 *         description: Available Spot fulfillment parameters to query
 *         items:
 *           $ref: '#/definitions/SpotFulfillmentQueryParameter'
 *
 *   SpotFulfillmentRequestDestination:
 *     type: object
 *     properties:
 *       projectId:
 *         type: string
 *         required: false
 *         description: Spot fulfillment destination Project Id
 *       datasetId:
 *         type: string
 *         required: false
 *         description: Spot fulfillment destination Dataset Id
 *
 *   SpotFulfillmentRequestSchema:
 *     type: object
 *     properties:
 *       dataId:
 *         type: string
 *         required: true
 *       parameters:
 *         $ref: '#/definitions/SpotFulfillmentQueryParameter'
 *       destination:
 *         $ref: '#/definitions/SpotFulfillmentRequestDestination'
 *
 *   SpotFulfillmentRequestResponseSchema:
 *     type: object
 *     properties:
 *       requestId:
 *         type: string
 *         required: true
 *       queryId:
 *         type: string
 *         required: true
 *       signedUrl:
 *         type: string
 *
 *   SpotFulfillmentRequestStatusResponseSchema:
 *     type: string
 *     properties:
 *       requestId:
 *         type: string
 *         required: true
 *       message:
 *         type: string
 *         required: true
 *
 *   SpotFulfillmentWebhookRequestSchema:
 *     type: object
 *     description: Note that the message.data field is base64-encoded.
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
 *   SpotFulfillmentWebhoookResponseSchema:
 *     type: object
 *     properties:
 *       requestId:
 *         type: string
 *         required: true
 *       queryId:
 *         type: string
 *         required: true
 *       signedUrl:
 *         type: string
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
 *     description: Returns the Spot fulfillment API service configuration
 *     responses:
 *       200:
 *         description: Spot fulfillment API service configuration
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
 *                   description: Spot fulfillment API service config
 *                   properties:
 *                     config:
 *                       $ref: '#/definitions/SpotFulfillmentApiServiceConfig'
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
 *     summary: Spot Fulfillment configuration options for the API service
 *     description: Returns the Spot fulfillment configuration options for the API service
 *     parameters:
 *     - in: query
 *       name: includeAvailableValues
 *       schema:
 *          type: boolean
 *       required: false
 *       description: Include available values in options response
 *     responses:
 *       200:
 *         description: Spot fulfillment Configuration
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
 *                   description: list of Spot fulfillment query parameters
 *                   items:
 *                     $ref: '#/definitions/SpotFulfillmentConfig'
 */
router.get('/fulfillmentOptions', validateManager.fulfillmentConfig, async(req, res) => {
    const options = {
        includeAvailableValues: req.query.includeAvailableValues ? req.query.includeAvailableValues === "true" : false,
        config: FULFILLMENT_CONFIG
    };
    const data = await validateManager.getAvailableRequests(options);
    if (data && data.success === false) {
        var code = (data.code === undefined ) ? 500 : data.code;
        res.status(code).json({
            code: code,
            ... data
        });
    } else {
        res.status(200).json({
            success: true,
            code: 200,
            data: data
        });
    }
});

/**
 * @swagger
 *
 * /fulfillmentRequests:
 *   post:
 *     summary: Create Spot fulfillment request based off request parameters
 *     description: Returns the Spot fulfillment Request response
 *     requestBody:
 *       description: Request parameters for Spot Fulfillment
 *       content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/SpotFulfillmentRequestSchema'
 *     responses:
 *       201:
 *         description: Spot fulfillment Configuration
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
 *                   description: list of Spot fulfillment query parameters
 *                   items:
 *                     $ref: '#/definitions/SpotFulfillmentRequestResponseSchema'
 */
router.post('/fulfillmentRequests', validateManager.fulfillmentParams, async(req, res) => {
    const options = {
        config: FULFILLMENT_CONFIG,
        ... req.body
    };
    console.log(`Options: ${JSON.stringify(options)}`);
    const data = await dataManager.createFulfillmentRequest(options);
    if (data && data.success === false) {
        var code = (data.code === undefined ) ? 500 : data.code;
        res.status(code).json({
            code: code,
            ... data
        });
    } else {
        res.status(201).json({
            success: true,
            code: 201,
            data: data
        });
    }
});

/**
 * @swagger
 *
 * /fulfillmentRequests/{requestId}:
 *   get:
 *     summary: Check Spot fulfillment request status based off Request ID
 *     description: Returns the Spot fulfillment Request Status response
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
 *         description: Spot fulfillment Request Status Response
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
 *                   description: Spot fulfillment Request Status Response
 *                   items:
 *                     $ref: '#/definitions/SpotFulfillmentResponseStatusResponseSchema'
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
    if (data && data.success === false) {
        var code = (data.code === undefined ) ? 500 : data.code;
        res.status(code).json({
            code: code,
            ... data
        });
    } else {
        res.status(200).json({
            success: true,
            code: 200,
            data: data
        });
    }
});

/**
 * @swagger
 *
 * /fulfillmentSubscriber:
 *   post:
 *     summary: Spot fulfillment webhook request endpoint
 *     description: Spot fulfillment webhook request endpoint receives Spot fulfillment request message from GCP PubSub, acknowledges that request, and completes the appropriate execution tasks from the fulfillment request.
 *     requestBody:
 *       description: Request parameters for Spot Fulfillment Webhook
 *       content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/SpotFulfillmentWebhookRequestSchema'
 *     responses:
 *       202:
 *         description: Spot fulfillment Webhook response
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
 *                   description: list of Spot fulfillment query parameters
 *                   items:
 *                     $ref: '#/definitions/SpotFulfillmentWebhookResponseSchema'
 */
router.post('/fulfillmentSubscriber', validateManager.fulfillmentWebhookParams, async(req, res) => {
    const options = {
        config: FULFILLMENT_CONFIG,
        ... req.body
    };
    console.log(`Options: ${JSON.stringify(options)}`);
    //const data = await dataManager.processFulfillmentSubscription(options);
    //const data = await dataManager.createFulfillment(options);
    var data = {}
    if (data && data.success === false) {
        var code = (data.code === undefined ) ? 500 : data.code;
        res.status(code).json({
            code: code,
            ... data
        });
    } else {
        res.status(201).json({
            success: true,
            code: 201,
            data: data
        });
    }
});

/**
 * @swagger
 *
 * /fulfillmentWorker:
 *   post:
 *     summary: Spot fulfillment worker request endpoint
 *     description: Spot fulfillment worker request endpoint pulls a fulfillment request message from GCP PubSub, acknowledges that request, and completes the execution tasks from the fulfillment request.
 *     responses:
 *       201:
 *         description: Spot fulfillment worker response
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
 *                   description: list of Spot fulfillment query parameters
 *                   items:
 *                     $ref: '#/definitions/SpotFulfillmentRequestResponseSchema'
 */
router.post('/fulfillmentWorker', async(req, res) => {
    const options = {
        config: FULFILLMENT_CONFIG
    };
    console.log(`Options: ${JSON.stringify(options)}`);
    const data = await dataManager.pullFulfillmentSubscriptionRequest(options);
    //const data = await dataManager.createFulfillment(options);
    //console.log(data);
    if (data && data.success === false) {
        var code = (data.code === undefined ) ? 500 : data.code;
        res.status(code).json({
            code: code,
            ... data
        });
    } else {
        res.status(201).json({
            success: true,
            code: 201,
            data: data
        });
    }
});

/**
 * @param  {} '/projects/:project/datasets/:dataset/tables/:table'
 * @param  {} async(req, res)
 * @param  {} res
 * Returns a status of each resource in the url path
 */
routes = [
    '/projects/:projectId',
    '/projects/:projectId/datasets/:datasetId',
    '/projects/:projectId/datasets/:datasetId/tables/:tableId'
];

router.get(routes, validateManager.urlPathParams, function(req, res) {
    var message = [];
    if (req.params.projectId) {
        message.push(`Project ID [${req.params.projectId}] exists`);
    }
    if (req.params.datasetId) {
        message.push(`Dataset [${req.params.datasetId}] exists`);
    }
    if (req.params.tableId) {
        message.push(`Table [${req.params.tableId}] exists`);
    }
    if (message === []) {
        message = 'Missing something';
    }
    res.status(200).json({
        success: true,
        code: 200,
        message: message
    });
});

/**
 * @param  {} '/projects/:project/datasets/:dataset/tables/:table/fulfillmentConfigs'
 * @param  {} async(request
 * @param  {} res
 * Returns fulfillment configurations for the table resource in the path
 */
routes = [
    '/projects/:projectId/datasets/:datasetId/tables/:tableId/fulfillmentConfigs'
];

router.get(routes, validateManager.urlPathParams, function(req, res) {
    var message = 'TODO';
    res.status(200).json({
        success: true,
        code: 200,
        message: message
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
