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
            description: 'This is the CDS API service that provides data producers the ability to expose subsets of their datasets programatically.',
            title: 'CDS API Service', // Title (required)
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
            description: 'Find out more about Cloud Datashare Toolkit',
            url: 'https://github.com/GoogleCloudPlatform/bq-datashare-toolkit'
        }
    },
    // Path to the API docs
    apis: ['./index.js', './src/index.js', './src/spots/index.js']
};

const openapiSpec = swaggerJSDoc(options);

const app = express();
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.raw({type: 'application/octet-stream'}));

// Import the Spots API router
const spots = require('./spots/index');

// Import the Spots API router
const spots = require('./spots/index');

/************************************************************
  API Endpoints
 ************************************************************/
// Define the routes for the REST API
var router = express.Router();
// methods that require multiple routes
var routes = [];

// CORS will be controlled by the API GW layer
router.all('*', cors());

// All of the API routes will be prefixed with /apiVersion
app.use('/' + apiVersion, router);
// All of the API sub routes will be prefixed with /apiVersion
app.use('/' + apiVersion, spots);

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
 *   SpotRequestsStatusResponseSchema:
 *     type: object
 *     description: Spot requests status response
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
 *   SpotSubscriberRequestSchema:
 *     type: object
 *     description: Spot subscriber webhook request schema (Note that the message.data field is base64-encoded.)
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
 *   SpotWorkerResponseSchema:
 *     type: object
 *     description: Spot worker response schema
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
 *     tags:
 *       - welcome
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
        message: 'Welcome to the CDS API (' + apiVersion + ')!'
    });
});

/**
 * @swagger
 *
 * /fulfillmentRequests/{requestId}:
 *   get:
 *     summary: Check Spot request status based off Request ID
 *     description: Returns the Spot Request Status response
 *     parameters:
 *     - in: path
 *       name: requestId
 *       schema:
 *          type: string
 *       required: true
 *       description: Request Id of the Spot request
 *     - in: query
 *       name: bucketName
 *       schema:
 *          type: string
 *       required: true
 *       description: Bucket Name from the Spot Request Id
 *     - in: query
 *       name: fileName
 *       schema:
 *          type: string
 *       required: true
 *       description: File Name from the Spot Request Id
 *     responses:
 *       200:
 *         description: Spot Request Status 200 Response
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
 *                   $ref: '#/definitions/SpotRequestsStatusResponseSchema'
 *       400:
 *         description: Spot Request Status 400 Response
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
 *                   description: list of Spot errors
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
 *     summary: Spot subscriber webhook request endpoint
 *     description: Spot subscriber webhook request endpoint receives Spot request message from GCP PubSub, acknowledges that request, and completes the appropriate execution tasks asynchronously for the fulfillment request.
 *     requestBody:
 *       description: Request parameters for Spot subscriber webhook
 *       content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/SpotSubscriberRequestSchema'
 *     responses:
 *       202:
 *         description: Spot subscriber webhook 202 response
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
 *         description: Spot subscriber webhook 400 response
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
 *                   description: list of Spot errors
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
 *     summary: Spot worker request endpoint
 *     description: Spot worker request endpoint pulls a fulfillment request message from GCP PubSub, acknowledges that request, and completes the execution tasks from the fulfillment request.
 *     responses:
 *       201:
 *         description: Spot worker 201 response
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
 *                     $ref: '#/definitions/SpotWorkerResponseSchema'
 *       400:
 *         description: Spot worker 400 response
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
 *                   description: list of Spot errors
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
 *     summary: Swagger UI for CDS API OpenAPI Specification
 *     description: Returns the Swagger UI with the OpenAPI specification for the CDS API services
 *     tags:
 *       - docs
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
 *     summary: CDS API OpenAPI Specification
 *     description: Returns the OpenAPI specification for the CDS API services
 *     tags:
 *       - docs
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

// Import the other API routes before wildcard '*'
router.use(spots);

/**
 * @swagger
 *
 * /*:
 *   get:
 *     summary: Default 404 Response
 *     description: Returns the default 404 response after all other routes exhausted
 *     tags:
 *       - default
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
