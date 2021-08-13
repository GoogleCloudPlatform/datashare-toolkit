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
const cookieParser = require('cookie-parser');
const cors = require('cors')
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { verifyProject } = require('./lib/auth');

const legacyApiVersion = "v1alpha";
const apiVersion = "v1";
const PORT = process.env.PORT || 5555;
/************************************************************
  OpenAPI Definition
 ************************************************************/
const options = {
    definition: {
        swagger: '2.0', // Specification (optional, defaults to swagger: '2.0')
        info: {
            description: 'This is the Datashare API service that provides data producers the ability to expose subsets of their datasets programatically.',
            title: 'Datashare API Service', // Title (required)
            version: '0.0.1', // Version (required)
            contact: {
                email: 'no-reply@google.com'
            },
            license: {
                name: 'Apache 2.0',
                url: 'https://github.com/GoogleCloudPlatform/datashare-toolkit/blob/master/LICENSE.txt'
            }
        },
        // OAS v3
        /*
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
        */
        // Swagger 2.0
        // host: 'localhost:' + PORT / This defaults to the host url of the content
        basePath: '/' + apiVersion,
        schemes: ["http", "https"],
        externalDocs: {
            description: 'Find out more about Datashare Toolkit',
            url: 'https://github.com/GoogleCloudPlatform/datashare-toolkit'
        },
        // APi GW Integration
        'x-google-backend': {
            address: 'DS_API_URL'
        },
        security: [{
            'apiKeyAuth': [],
            'accounts.google.com': []
        }],
        securityDefinitions: {
            'apiKeyAuth': {
                'type': 'apiKey',
                'name': 'x-api-key',
                'in': 'header'
            },
            'accounts.google.com': {
                'type': 'oauth2',
                'authorizationUrl': 'https://accounts.google.com/o/oauth2/v2/auth',
                'flow': 'implicit',
                'scopes': {
                    'https://www.googleapis.com/auth/cloud-platform': 'default',
                },
                'x-google-issuer': 'https://accounts.google.com',
                'x-google-jwks_uri': 'https://www.googleapis.com/oauth2/v3/certs',
            },
            'accounts.google.com2': {
                'type': 'oauth2',
                'authorizationUrl': 'https://accounts.google.com/o/oauth2/v2/auth',
                'flow': 'implicit',
                'scopes': {
                    'https://www.googleapis.com/auth/cloud-platform': 'default',
                },
                'x-google-issuer': 'accounts.google.com',
                'x-google-jwks_uri': 'https://www.googleapis.com/oauth2/v3/certs',
            },
            'securetoken.google.com': {
                'type': 'oauth2',
                'flow': 'application',
                'tokenUrl': 'https://oauth2.googleapis.com/token',
                'scopes': {
                    'https://www.googleapis.com/auth/cloud-platform': 'default',
                },
                'x-google-issuer': 'https://securetoken.google.com/$PROJECT_ID',
                'x-google-jwks_uri': 'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com',
            },
            'cloud-commerce-partner': {
                'type': 'oauth2',
                'flow': 'application',
                'tokenUrl': 'https://oauth2.googleapis.com/token',
                'scopes': {
                    'https://www.googleapis.com/auth/cloud-platform': 'default',
                },
                'x-google-issuer': 'https://www.googleapis.com/robot/v1/metadata/x509/cloud-commerce-partner@system.gserviceaccount.com',
                'x-google-jwks_uri': 'https://www.googleapis.com/robot/v1/metadata/jwk/cloud-commerce-partner@system.gserviceaccount.com',
            },
        },
    },
    // Path to the API docs
    apis: ['./api.js', './src/index.js', './*/index.js', './src/*/index.js']
};

const swaggerOptions = {
    swaggerOptions: {
        operationsSorter: (a, b) => {
            var methodsOrder = ["get", "post", "put", "patch", "delete", "options", "trace"];
            var result = methodsOrder.indexOf(a.get("method")) - methodsOrder.indexOf(b.get("method"));

            if (result === 0) {
                result = a.get("path").localeCompare(b.get("path"));
            }
            return result;
        }
    }
};

const openapiSpec = swaggerJSDoc(options);

const app = express();
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.raw({ type: 'application/octet-stream' }));
app.use(cookieParser());

// Import the Datashare API Spots service router
const spots = require('./spots/index');
// Import the Datashare API Datasets service router
const datasets = require('./datasets/index');
// Import the Datashare API Policies service router
const policies = require('./policies/index');
// Import the Datashare API Accounts service router
const accounts = require('./accounts/index');
// Import the Datashare API Admin service router
const admin = require('./admin/index');
// Import the Datashare API Procurement service router
const procurements = require('./procurements/index');
// Import the Datashare API Resources service router
const resources = require('./resources/index');
// Import the Datashare API PubSub service router
const pubsub = require('./pubsub/index');
// Import the Datashare API Cloud Storage service router
const storage = require('./storage/index');

/************************************************************
  API Endpoints
 ************************************************************/
// Define the routes for the REST API
var router = express.Router();
// methods that require multiple routes
var routes = [];

// CORS will be controlled by the API GW layer
router.all('*', cors(), verifyProject);

/**
 * @swagger
 *
 * tags:
 *   - name: welcome
 *     description: The welcome message for the Datashare API
 *   - name: datasets
 *     description: The Datashare API Dataset Services
 *   - name: policies
 *     description: The Datashare API Policy Services
 *   - name: procurements
 *     description: The Datashare API Procurements Services
 *   - name: accounts
 *     description: The Datashare API Account Services
 *   - name: spots
 *     description: The Datashare API Spot Services
 *   - name: admin
 *     description: The Datashare API Admin Services
 *   - name: resources
 *     description: The Datashare API Resources Services
 *   - name: docs
 *     description: The OpenAPI specification documents for the Datashare API services
 *   - name: default
 *     description: The default routes for the Datashare API
 *
 * definitions:
 *   Error:
 *     type: object
 *     description: Error object
 *     properties:
 *       success:
 *         type: boolean
 *         description: Success of the request
 *       code:
 *         type: integer
 *         description: HTTP status code
 *       errors:
 *         type: array
 *         items:
 *           type: string
 *           properties:
 *             message: message string
 *
 */

/**
 * @swagger
 *
 * '/welcome':
 *   get:
 *     summary: Welcome message status
 *     description: Returns a welcome message for the API
 *     operationId: getRoot
 *     tags:
 *       - welcome
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Welcome Message Response
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               description: Success of the request
 *             code:
 *               type: integer
 *               description: HTTP status code
 *             message:
 *               type: string
 *               description: Status message
 */
router.get('/welcome', function (req, res) {
    res.status(200).json({
        success: true,
        code: 200,
        message: 'Welcome to the Datashare API (' + apiVersion + ')! Docs available via /docs'
    });
});

/**
 * @swagger
 *
 * /docs:
 *   get:
 *     summary: Swagger UI for Datashare API OpenAPI Specification
 *     description: Returns the Swagger UI with the OpenAPI specification for the Datashare API services
 *     operationId: getDocs
 *     tags:
 *       - docs
 *     produces:
 *       - text/html
 *     responses:
 *       200:
 *         description: Welcome Message Response
 *         schema:
 *           type: object
 */
router.use(['/docs', '/api-docs'], swaggerUi.serve);
router.get(['/docs', '/api-docs'], swaggerUi.setup(openapiSpec, swaggerOptions));

/**
 * @swagger
 *
 * /docs/openapi_spec:
 *   get:
 *     summary: Datashare API OpenAPI Specification
 *     description: Returns the OpenAPI specification for the Datashare API services
 *     operationId: getOpenapiSpec
 *     tags:
 *       - docs
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Welcome Message Response
 *         schema:
 *           type: object
 */
routes = [
    '/docs/openapi_spec',
    '/docs/openapi_spec.json',
    '/openapi_spec'
]
router.get(routes, function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(openapiSpec);
});

// Import the other API routes before wildcard '*'
router.use(accounts);
router.use(admin);
router.use(datasets);
router.use(policies);
router.use(procurements);
router.use(pubsub);
router.use(resources);
router.use(spots);
router.use(storage);

/**
 * @swagger
 *
 * /*:
 *   get:
 *     summary: Default 404 Response
 *     description: Returns the default 404 response after all other routes exhausted
 *     operationId: getAll
 *     tags:
 *       - default
 *     produces:
 *       - application/json
 *     responses:
 *       404:
 *         description: Default 404 Response
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               default: true
 *               description: Success of the request
 *             code:
 *               type: integer
 *               description: HTTP status code
 *             message:
 *               type: string
 *               description: Status message
 */
router.get('*', function (req, res) {
    res.status(404).json({
        success: true,
        code: 404,
        message: 'Not Found.'
    });
});

// All of the API routes will be prefixed with /apiVersion
app.use('/' + apiVersion, router);

// For backwards compability supporting marketplace solution entries configured with 'v1alpha'
app.use('/' + legacyApiVersion, router);

// default app route redirects to current API version for now
app.get('/', function (req, res) {
    res.redirect('/' + apiVersion + '/welcome');
});

/************************************************************
  Start server
 ************************************************************/
app.listen(PORT, () => {
    console.log("Listening on port " + PORT + ". Press Ctrl+C to quit.");
});

module.exports = app;
