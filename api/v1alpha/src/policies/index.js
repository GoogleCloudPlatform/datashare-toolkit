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
var policies = express.Router();
// methods that require multiple routes

/**
 * @swagger
 *
 *
 * definitions:
 *   Policy:
 *     type: object
 *     description: Policy object
 *     properties:
 *       policy_id:
 *         type: string
 *         readOnly: true
 *         description: Policy ID
 *       row_id:
 *         type: string
 *         readOnly: true
 *         description: Policy Row ID
 *       name:
 *         type: string
 *         description: Policy display name
 *       description:
 *         type: string
 *         description: Policy decsription
 *       createdBy:
 *         type: string
 *         description: Policy created by email
 *       datasets:
 *         type: array
 *         description: Policy datasets
 *         items:
 *           $ref: '#/definitions/Dataset'
 *       rowAccessTags:
 *         type: array
 *         description: Policy row access tags
 *         items:
 *           $ref: '#/definitions/RowAccessTag'
 *     required:
 *       - name
 *
 *   RowAccessTag:
 *     type: object
 *     description: Policy Row Access Tag object
 *     properties:
 *       name:
 *         type: string
 *         description: Row Access Tag
 */

/**
 * @swagger
 *
 * /projects/{projectId}/policies:
 *   get:
 *     summary: List Policy based off request parameters
 *     description: Returns the DatsetList response
 *     tags:
 *       - policies
 *     parameters:
 *     - in: path
 *       name: projectId
 *       schema:
 *          type: string
 *       required: true
 *       description: Project Id of the Policy request
 *     responses:
 *       200:
 *         description: Policy list
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
 *                      $ref: '#/definitions/Policy'
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */
policies.get('/projects/:projectId/policies', async(req, res) => {
    const projectId = req.params.projectId;
    const data = await dataManager.listPolicies(projectId);
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
 * /projects/{projectId}/policies:
 *   post:
 *     summary: Create Policy based off request body
 *     description: Returns the Datset response
 *     tags:
 *       - policies
 *     parameters:
 *     - in: path
 *       name: projectId
 *       schema:
 *          type: string
 *       required: true
 *       description: Project Id of the Policy request
 *     requestBody:
 *       description: Request parameters for Policy
 *       content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/Policy'
 *     responses:
 *       201:
 *         description: Policy
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
 *                     $ref: '#/definitions/Policy'
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
policies.post('/projects/:projectId/policies', async(req, res) => {
    const projectId = req.params.projectId;
    if (!req.body.name) {
        return res.status(400).json({
            success: false,
            code: 400,
            errors: ['policy name parameter is required']
        });
    }
    const values = {
        name: req.body.name,
        description: req.body.description,
        createdBy: req.body.createdBy,
        datasets: req.body.datasets,
        rowAccessTags: req.body.rowAccessTags
    };
    const data = await dataManager.createPolicy(projectId, values);
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
 * /projects/{projectId}/policies/{policyId}:
 *   get:
 *     summary: Get Policy based off policyId
 *     description: Returns the Datset response
 *     tags:
 *       - policies
 *     parameters:
 *     - in: path
 *       name: projectId
 *       schema:
 *          type: string
 *       required: true
 *       description: Project Id of the Policy request
 *     - in: path
 *       name: policyId
 *       schema:
 *          type: string
 *       required: true
 *       description: Policy Id of the Policy request
 *     responses:
 *       200:
 *         description: Policy
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
 *                   type: object
 *                   items:
 *                      $ref: '#/definitions/Policy'
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */
policies.get('/projects/:projectId/policies/:policyId', async(req, res) => {
    const projectId = req.params.projectId;
    const policyId = req.params.policyId;
    const data = await dataManager.getPolicy(projectId, policyId);
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

module.exports = policies;
