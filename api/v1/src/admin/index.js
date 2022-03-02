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
var admin = express.Router();
// methods that require multiple routes

/**
 * @swagger
 *
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
 *
 */

/**
 * @swagger
 *
 * /admin:initSchema:
 *   options:
 *     summary: CORS support
 *     description: Enable CORS by returning correct headers
 *     operationId: optionsInitSchema
 *     tags:
 *       - admin
 *     security: [] # no security for preflight requests
 *     produces:
 *       - application/json
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
 *   post:
 *     summary: Initialize the Datashare schema creation
 *     description: Returns the schema creation response
 *     operationId: initSchema
 *     tags:
 *       - admin
 *     parameters:
 *     - in: header
 *       name: x-gcp-project-id
 *       type: string
 *       required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: initSchema response
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
 *               type: object
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
 */
/**
 * @swagger
 *
 * /admin:syncResources:
 *   options:
 *     summary: CORS support
 *     description: Enable CORS by returning correct headers
 *     operationId: optionsSyncResources
 *     tags:
 *       - admin
 *     security: [] # no security for preflight requests
 *     produces:
 *       - application/json
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
 *   post:
 *     summary: Syncronize the Datashare resources and metadata
 *     description: Returns the syncronize resources response
 *     operationId: syncResources
 *     tags:
 *       - admin
 *     parameters:
 *     - in: header
 *       name: x-gcp-project-id
 *       type: string
 *       required: true
 *     - in: body
 *       name: syncronize resources
 *       description: Request parameters for Syncronize Resources
 *       schema:
 *         type: object
 *         properties:
 *           typeX:
 *             type: string
 *             description: Syncronize Resources Type
 *             enum:
 *               - ALL
 *               - BIGQUERY_PERMISSIONS
 *               - BIGQUERY_VIEWS
 *               - MARKETPLACE
 *               - STORAGE_BUCKET_PERMISSIONS
 *               - TOPIC_PERMISSIONS
 *             required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Syncronize resources response
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
 *               type: object
 *               description: Response data
 *       404:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
 */
admin.post('/admin::custom', async (req, res) => {
    const projectId = req.header('x-gcp-project-id');
    let data;
    let code;

    switch (req.params.custom) {
        case "initSchema": {
            data = await dataManager.initializeSchema(projectId);
            if (data && data.success === false) {
                code = (data.code === undefined) ? 500 : data.code;
            } else {
                code = (data.code === undefined) ? 200 : data.code;
            }
            return res.status(code).json({
                code: code,
                ...data
            });
        }
        case "syncResources": {
            const syncType = req.body.type;
            if (!syncType) {
                return res.status(400).json({
                    success: false,
                    code: 400,
                    errors: ['sync type parameter(s) are required']
                });
            }
            data = await dataManager.syncResources(projectId, syncType);
            if (data && data.success === false) {
                code = (data.code === undefined) ? 500 : data.code;
            } else {
                code = (data.code === undefined) ? 200 : data.code;
            }
            return res.status(code).json({
                code: code,
                ...data
            });
        }
    }
});

/**
 * @swagger
 *
 * /admin/applicationUsers:
 *   options:
 *     summary: CORS support
 *     description: Enable CORS by returning correct headers
 *     operationId: optionsGetApplicationUsers
 *     security: [] # no security for preflight requests
 *     tags:
 *       - admin
 *     produces:
 *       - application/json
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
 *     summary: Get Application User Resources
 *     description: Returns the Application Users Resource response
 *     operationId: getApplicationUsers
 *     tags:
 *       - admin
 *     parameters:
 *     - in: header
 *       name: x-gcp-project-id
 *       type: string
 *       required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Application Users Resource
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               description: Success of the request
 *             data:
 *               type: array
 *               items:
 *                 type: object
 *                 description: User Resource object
 *                 properties:
 *                   uid:
 *                     type: string
 *                     description: IDP uid
 *                   displayName:
 *                     type: string
 *                     description: User display name
 *                   email:
 *                     type: string
 *                     description: User email address
 *                   emailVerified:
 *                     type: boolean
 *                     description: Flag indicating if email address is verified
 *                   disabled:
 *                     type: boolean
 *                     description: Flag indicating if account is disabled
 *                   photoURL:
 *                     type: string
 *                     description: Photo URL for the account
 *                   customClaims:
 *                      type: object
 *                      properties:
 *                        role:
 *                          type: string
 *                   lastSignInTime:
 *                     type: string
 *                     description: Last sign in time for the account
 *                   creationTime:
 *                     type: string
 *                     description: Creation time for the account
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
 */
admin.get('/admin/applicationUsers', async (req, res) => {
    try {
        const code = 200;
        const list = await dataManager.listApplicationUsers();
        const data = { success: true, data: list };
        res.status(code).json({
            ...data
        });
    } catch (err) {
        console.error(err);
        const data = { success: false, code: 500, errors: ['Unable to retrieve application users.'] };
        res.status(500).json(data);
    }
});

module.exports = admin;
