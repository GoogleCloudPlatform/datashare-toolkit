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

const dataManager = require("../lib/initSchema");

/************************************************************
  API Endpoints
 ************************************************************/
// Define the routes for the REST API
var admin = express.Router();
// methods that require multiple routes

/**
 * @swagger
 *
 * /projects/{projectId}/initSchema:
 *   post:
 *     summary: Initialize the CDS schema creation
 *     description: Returns the schema creation response
 *     tags:
 *       - datasets
 *     parameters:
 *     - in: path
 *       name: projectId
 *       schema:
 *          type: string
 *       required: true
 *       description: Project Id of the init schema request
 *     responses:
 *       200:
 *         description: Dataset
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
 *                   items:
 *                     $ref: '#/definitions/Dataset'
 *       404:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */
admin.post('/projects/:projectId/initSchema', async(req, res) => {
    const projectId = req.params.projectId;
    const data = await dataManager.initializeSchema(projectId);
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

module.exports = admin;