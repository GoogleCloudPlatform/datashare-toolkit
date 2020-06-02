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

/************************************************************
  API Endpoints
 ************************************************************/
// Define the routes for the REST API
var procurements = express.Router();
// methods that require multiple routes

/**
 * @swagger
 *
 *
 * definitions:
 *   Policy:
 *     type: object
 *     description: Procurement object
 *     properties:
 *       rowId:
 *         type: string
 *         readOnly: true
 *         description: Procurement Row ID
 *       eventId:
 *         type: string
 *         readOnly: true
 *         description: Marketplace Pub/Sub message eventId
 *       eventType:
 *         type: string
 *         description: Marketplace Pub/Sub message eventType
 *       acknowledged:
 *         type: boolean
 *         description: Indicates if the event was acknowledged.
 *       createdAt:
 *         type: string
 *         description: Record creation time
 *       accountId:
 *         type: string
 *         description: Billing accountId of the consumer
 *       entitlementId:
 *         type: string
 *         description: Entitlement Id of the purchased SKU
 *     required:
 *       - rowId
 *       - eventId
 *       - eventType
 */

/**
 * @swagger
 *
 * /projects/{projectId}/procurements:
 *   get:
 *     summary: List Procurements based off request parameters
 *     description: Returns the ProcurementList response
 *     tags:
 *       - procurements
 *     parameters:
 *     - in: path
 *       name: projectId
 *       schema:
 *          type: string
 *       required: true
 *       description: Project Id of the Procurement request
 *     responses:
 *       200:
 *         description: Procurement list
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
 *                   type: array
 *                   items:
 *                      $ref: '#/definitions/Procurement'
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */
procurements.get('/projects/:projectId/procurements', async (req, res) => {
    const projectId = req.params.projectId;
    const data = await dataManager.listProcurements(projectId);
    var code;
    if (data && data.success === false) {
        code = (data.code === undefined) ? 500 : data.code;
    } else {
        code = (data.code === undefined) ? 200 : data.code;
    }
    res.status(code).json({
        code: code,
        ...data
    });
});

procurements.post('/projects/:projectId/procurements/activate/:solutionId', async(req, res) => {
    const projectId = req.params.projectId;
    const solutionId = req.params.solutionId;
    const token = req.headers['x-gcp-marketplace-token'];
    console.log(`Activate called for project ${projectId}, solution: ${solutionId}, token: ${token}, body: ${JSON.stringify(req.body)}`);
    const data = { code: 200, success: true };
    var code;

    // https://cloud.google.com/marketplace/docs/partners/integrated-saas/frontend-integration#verify-jwt
    var jwt = require('jsonwebtoken');

    /*
        1. Verify that the JWT signature is using the public key from Google.
        2. Verify that the JWT has not expired, by checking the exp claim.
        3. Verify that aud claim is the correct domain for your solution.
        4. Verify that the iss claim is https://www.googleapis.com/robot/v1/metadata/x509/cloud-commerce-partner@system.gserviceaccount.com
        5. Verify that sub is not empty.
    */

    const options = {
        // alg is always RS256
        algorithms: ['RS256'],
        audience: 'storage.cloud.google.com',
        issuer: 'https://www.googleapis.com/robot/v1/metadata/x509/cloud-commerce-partner@system.gserviceaccount.com',
        ignoreExpiration: false,
        complete: true
    };

    const decoded = jwt.decode(token, options);

    // kid indicates the key ID that was used to secure the JWT. Use the key ID to look up the key from the JSON object in the iss attribute in the payload.
    const kid = decoded.header.kid;
    console.log(`jwt header kid: ${kid}`);

    var jwksClient = require('jwks-rsa');
    var client = jwksClient({
        jwksUri: 'https://www.googleapis.com/robot/v1/metadata/jwk/cloud-commerce-partner@system.gserviceaccount.com'
    });
    function getKey(header, callback) {
        client.getSigningKey(header.kid, function (err, key) {
            console.log(`Error: ${err}`);
            console.log(`Key: ${JSON.stringify(key, null, 3)}`);
            callback(null, key);
        });
    }

    jwt.verify(token, getKey, options, function (err, decoded) {
        console.log(decoded);
    });

    /*
    const axios = require('axios');
    let keyDictionary = {};
    await axios.get(options.issuer)
        .then(response => {
            keyDictionary = response.data;
        })
        .catch(error => {
            console.log(error);
        });

    let secretOrPublicKey = keyDictionary[kid]

    try {
        const decoded = jwt.verify(token, secretOrPublicKey, options);
        console.log(`Success: ${JSON.stringify(decoded, null, 3)}`);

        // sub is the user's Google account ID. You must use this ID to link the user's Google account to their account in your system.
        const accountId = decoded.payload.sub;
        if (!accountId || accountId.trim() === '') {
            console.error(`sub should not be empty`);
        }        
    } catch (err) {
        console.error(err);
    }
    */
    // Response write out for 302 redirect if valid JWT, otherwise 302 redirect to invalid request page
    // Record sub in the db table with the incoming accountId
    // If we have to pass any data back to the UI, use a session-based cookie
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

procurements.post('/projects/:projectId/procurements/approve', async(req, res) => {
    const projectId = req.params.projectId;
    const body = req.body;
    console.log(`Approve called for project ${projectId} with body: ${JSON.stringify(body)}`);
    const data = { code: 200, success: true };
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

module.exports = procurements;