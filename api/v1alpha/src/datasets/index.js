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
var datasets = express.Router();
// methods that require multiple routes

/**
 * @swagger
 *
 *
 * definitions:
 *   Dataset:
 *     type: object
 *     description: Dataset object
 *     properties:
 *       id:
 *         type: string
 *         description: Dataset ID
 */

/**
 * @swagger
 *
 * /projects/{projectId}/datasets:
 *   get:
 *     summary: List Dataset based off request parameters
 *     description: Returns the DatsetList response
 *     tags:
 *       - datasets
 *     parameters:
 *     - in: path
 *       name: projectId
 *       schema:
 *          type: string
 *       required: true
 *       description: Project Id of the Dataset request
 *     responses:
 *       200:
 *         description: Dataset list
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
 *                      $ref: '#/definitions/Dataset'
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */
datasets.get('/projects/:projectId/datasets', async(req, res) => {
    const projectId = req.params.projectId;
    const data = await dataManager.listDatasets(projectId);
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
 * /projects/{projectId}/datasets:
 *   post:
 *     summary: Create Dataset based off request body
 *     description: Returns the Datset response
 *     tags:
 *       - datasets
 *     parameters:
 *     - in: path
 *       name: projectId
 *       schema:
 *          type: string
 *       required: true
 *       description: Project Id of the Dataset request
 *     requestBody:
 *       description: Request parameters for Dataset
 *       content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/Dataset'
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
 */
datasets.post('/projects/:projectId/datasets', async(req, res) => {
    const projectId = req.params.projectId;
    const datasetId = req.body.id;
    if (!datasetId) {
        return res.status(400).json({
            success: false,
            code: 400,
            errors: ['dataset name parameter is required']
        });
    }
    const data = await dataManager.createDataset(projectId, datasetId);
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
 * /projects/{projectId}/datasets/{datasetId}:
 *   get:
 *     summary: Get Dataset based off datasetId
 *     description: Returns the Datset response
 *     tags:
 *       - datasets
 *     parameters:
 *     - in: path
 *       name: projectId
 *       schema:
 *          type: string
 *       required: true
 *       description: Project Id of the Dataset request
 *     - in: path
 *       name: datasetId
 *       schema:
 *          type: string
 *       required: true
 *       description: Dataset Id of the Dataset request
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
 *                   default: 200
 *                   description: HTTP status code
 *                 data:
 *                   type: object
 *                   items:
 *                      $ref: '#/definitions/Dataset'
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */
datasets.get('/projects/:projectId/datasets/:datasetId', async(req, res) => {
    const projectId = req.params.projectId;
    const datasetId = req.params.datasetId;
    const data = await dataManager.getDataset(projectId, datasetId);
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

module.exports = datasets;
