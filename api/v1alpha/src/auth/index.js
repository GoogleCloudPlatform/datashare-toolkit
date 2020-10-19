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
    const code = 200;
    const data = { success: true };
    switch (req.params.custom) {
        case "isDataProducer":
            res.status(code).json({
                code: code,
                ...data
            });
    }
});

module.exports = auth;
