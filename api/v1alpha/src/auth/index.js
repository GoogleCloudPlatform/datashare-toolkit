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
const config = require('../lib/config');

const { CommonUtil } = require('cds-shared');
const commonUtil = CommonUtil;

/************************************************************
  API Endpoints
 ************************************************************/
// Define the routes for the REST API
var auth = express.Router();
// methods that require multiple routes

/**
 * @swagger
 *
 * /projects/{projectId}/auth:isDataProducer:
 *   get:
 *     summary: Simple endpoint to check if user is a data producer
 *     description: Returns a 200 response
 *     tags:
 *       - auth
 *     responses:
 *       200:
 *         description: isDataPRoducer 200 response
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
 */
auth.post('/projects/:projectId/auth::custom', async (req, res) => {
    // https://github.com/googleapis/google-auth-library-nodejs#oauth2
    const { OAuth2Client } = require('google-auth-library');
    const CLIENT_ID = config.oauthClientId;
    const client = new OAuth2Client(CLIENT_ID);

    let token = req.header('Authorization');
    token = token.split(" ")[1];

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['email'];
    const domain = payload['hd'];

    let isProducer = false;
    for (const p of config.dataProducers) {
        if (p.toLowerCase() === userid.toLowerCase()) {
            isProducer = true;
            break;
        }
        else if (p.includes('*') || p.includes('?')) {
            if (commonUtil.wildTest(p, domain)) {
                isProducer = true;
                break;
            }
        }
    }

    const code = 200;
    const data = { success: true, isDataProducer: isProducer };
    switch (req.params.custom) {
        case "isDataProducer":
            res.status(code).json({
                code: code,
                ...data
            });
    }
});

module.exports = auth;
