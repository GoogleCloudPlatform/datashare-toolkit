/**
 * Copyright 2021 Google LLC
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
const runtimeConfig = require('../lib/runtimeConfig');

/************************************************************
  API Endpoints
 ************************************************************/
// Define the routes for the REST API
var resources = express.Router();
// methods that require multiple routes

/**
 * @swagger
 *
 * definitions:
 *   ProjectResource:
 *     type: object
 *     description: Project Resource object
 *     properties:
 *       projectId:
 *         type: string
 *         readOnly: true
 *         description: Project ID
 *
 *   ConfigurationResource:
 *     type: object
 *     description: Configuration Resource object
 *     properties:
 *       projectId:
 *         type: string
 *         readOnly: true
 *         description: Project ID
 */

/**
 * @swagger
 *
 * /resources/projects:
 *   options:
 *     summary: CORS support
 *     description: Enable CORS by returning correct headers
 *     operationId: optionsGetResourceProjects
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
 *   get:
 *     summary: Get Project Resources
 *     description: Returns the Project Resource response
 *     operationId: getProjectResources
 *     tags:
 *       - resources
 *     parameters:
 *     - in: header
 *       name: x-gcp-project-id
 *       type: string
 *       required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Project Resource
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               description: Success of the request
 *             code:
 *               type: integer
 *               default: 200
 *               description: HTTP status code
 *             data:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Success of the request
 *                 projects:
 *                   $ref: '#/definitions/ProjectResource'
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
 */

/**
 * @param  {} '/resources/projects'
 * @param  {} async(req
 * @param  {} res
 */
 resources.get('/resources/dashboard', async (req, res) => {
    try {
        const projectId = req.header('x-gcp-project-id');
        const email = req.header('x-gcp-account')
        const code = 200;
        const list = await dataManager.getDashboardCounts(projectId, email);
        const data = { success: true, data: list };
        res.status(code).json({
            ...data
        });
    } catch (err) {
        console.error(err);
        const data = { success: false, code: 500, errors: ['Unable to retrieve dashboard data.'] };
        res.status(500).json(data);
    }
});

/**
 * @param  {} '/resources/projects'
 * @param  {} async(req
 * @param  {} res
 */
resources.get('/resources/projects', async (req, res) => {
    try {
        const code = 200;
        // https://cloud.google.com/resource-manager/reference/rest/v1/projects/list
        const list = await runtimeConfig.getManagedProjects();
        const data = { success: true, projects: list };
        res.status(code).json({
            ...data
        });
    } catch (err) {
        console.error(err);
        const data = { success: false, code: 500, errors: ['Unable to retrieve managed projects.'] };
        res.status(500).json(data);
    }
});

/**
 * @swagger
 *
 * /resources/configuration:
 *   options:
 *     summary: CORS support
 *     description: Enable CORS by returning correct headers
 *     operationId: optionsGetResourceConfiguration
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
 *   get:
 *     summary: Get Configuration Resources
 *     description: Returns the Configuration Resource response
 *     operationId: getProjectResourceConfiguration
 *     tags:
 *       - resources
 *     parameters:
 *     - in: header
 *       name: x-gcp-project-id
 *       type: string
 *       required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Configuration Resource
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               description: Success of the request
 *             code:
 *               type: integer
 *               default: 200
 *               description: HTTP status code
 *             data:
 *               $ref: '#/definitions/ConfigurationResource'
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
 */

/**
 * @param  {} '/resources/configuration'
 * @param  {} async(req
 * @param  {} res
 */
resources.get('/resources/configuration', async (req, res) => {
    try {
        const projectId = req.header('x-gcp-project-id');
        let token;
        // 'X-Forwarded-Authorization' takes precedence over 'Authorization'
        for (let name of ['X-Forwarded-Authorization', 'Authorization']) {
            if (req.header(name) !== undefined) {
                token = req.header(name)
                token = token.split(" ")[1];
                break;
            }
        }
        if (token === undefined) {
            return res.status(401).json({ code: 401, success: false, errors: [{ message: "Authorization Header is required"}] });
        }
        const c = await dataManager.getConfiguration(projectId, token);
        const data = { success: true, configuration: c };
        const code = 200;
        res.status(code).json({
            ...data
        });
    } catch (err) {
        console.error(err);
        const data = { success: false, code: 500, errors: ['Unable to retrieve configuration. Ensure that a proper JWT token is passed in the Authorization header and that the OAuth Client Id is properly configured on the backend.'] };
        res.status(500).json(data);
    }
});

module.exports = resources;
