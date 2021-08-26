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
 *       datasetId:
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
datasets.get('/datasets', async(req, res) => {
    const projectId = req.header('x-gcp-project-id');
    const includeAll = req.query.includeAll === 'true';
    const data = await dataManager.listDatasets(projectId, includeAll);
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
 *     description: Returns the Dataset response
 *     tags:
 *       - datasets
 *     parameters:
 *     - in: path
 *       name: projectId
 *       schema:
 *          type: string
 *       required: true
 *       description: Project Id of the Dataset request
 *     - in: header
 *       name: x-gcp-account
 *       schema:
 *          type: string
 *       required: true
 *       description: GCP account name of the calling user
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
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */
datasets.post('/datasets', async(req, res) => {
    const projectId = req.header('x-gcp-project-id');
    const datasetId = req.body.datasetId;
    const description = req.body.description;

    if (!datasetId) {
        return res.status(400).json({
            success: false,
            code: 400,
            errors: ['dataset name parameter is required']
        });
    }
    const data = await dataManager.createDataset(projectId, datasetId, description);
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
 *   put:
 *     summary: Update Dataset based off request body
 *     description: Returns the Dataset response
 *     tags:
 *       - datasets
 *     parameters:
 *     - in: path
 *       name: projectId
 *       schema:
 *          type: string
 *       required: true
 *       description: Project Id of the Dataset request
 *     - in: header
 *       name: x-gcp-account
 *       schema:
 *          type: string
 *       required: true
 *       description: GCP account name of the calling user
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
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */
datasets.put('/datasets/:datasetId', async(req, res) => {
    const projectId = req.header('x-gcp-project-id');
    const datasetId = req.params.datasetId;
    const description = req.body.description;

    const data = await dataManager.updateDataset(projectId, datasetId, description);
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
datasets.get('/datasets/:datasetId', async(req, res) => {
    const projectId = req.header('x-gcp-project-id');
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

/**
 * @swagger
 *
 * /projects/{projectId}/datasets/{datasetId}:
 *   delete:
 *     summary: Delete Dataset based off dataset ID and request body
 *     description: Returns the Account response
 *     tags:
 *       - accounts
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
 *     - in: header
 *       name: x-gcp-account
 *       schema:
 *          type: string
 *       required: true
 *       description: GCP account name of the calling user
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
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */
datasets.delete('/datasets/:datasetId', async(req, res) => {
    const projectId = req.header('x-gcp-project-id');
    const datasetId = req.params.datasetId;
    const createdBy = req.header('x-gcp-account');
    const data = await dataManager.deleteDataset(projectId, datasetId, createdBy);
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

datasets.get('/datasets/:datasetId/tables', async(req, res) => {
    const projectId = req.header('x-gcp-project-id');
    const datasetId = req.params.datasetId;
    const data = await dataManager.listTables(projectId, datasetId);
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

datasets.get('/datasets/:datasetId/tables/:tableId/columns', async(req, res) => {
    const projectId = req.header('x-gcp-project-id');
    const datasetId = req.params.datasetId;
    const tableId = req.params.tableId;
    const data = await dataManager.listTableColumns(projectId, datasetId, tableId);
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

datasets.get('/views', async(req, res) => {
    const projectId = req.header('x-gcp-project-id');
    const data = await dataManager.listDatasetViews(projectId, null);
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

datasets.get('/datasets/:datasetId/views', async(req, res) => {
    const projectId = req.header('x-gcp-project-id');
    const datasetId = req.params.datasetId;
    const data = await dataManager.listDatasetViews(projectId, datasetId);
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

datasets.get('/datasets/:datasetId/views/:viewId', async(req, res) => {
    const projectId = req.header('x-gcp-project-id');
    const datasetId = req.params.datasetId;
    const viewId = req.params.viewId;
    const data = await dataManager.getDatasetView(projectId, datasetId, viewId);
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

datasets.post('/datasets/:datasetId/views:validate', async(req, res) => {
    const projectId = req.header('x-gcp-project-id');
    const datasetId = req.params.datasetId;
    const view = req.body.view;
    const includeSampleData = req.body.includeSampleData;
    const data = await dataManager.validateDatasetView(projectId, datasetId, view, includeSampleData);
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

datasets.post('/datasets/:datasetId/views', async(req, res) => {
    const projectId = req.header('x-gcp-project-id');
    const datasetId = req.params.datasetId;
    const view = req.body;
    const createdBy = req.header('x-gcp-account');
    const data = await dataManager.createOrUpdateDatasetView(projectId, datasetId, null, view, createdBy);
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

datasets.put('/datasets/:datasetId/views/:viewId', async(req, res) => {
    const projectId = req.header('x-gcp-project-id');
    const datasetId = req.params.datasetId;
    const viewId = req.params.viewId;
    const view = req.body;
    const createdBy = req.header('x-gcp-account');
    const data = await dataManager.createOrUpdateDatasetView(projectId, datasetId, viewId, view, createdBy);
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

datasets.delete('/datasets/:datasetId/views/:viewId', async(req, res) => {
    const projectId = req.header('x-gcp-project-id');
    const datasetId = req.params.datasetId;
    const viewId = req.params.viewId;
    if (!req.body.rowId) {
        return res.status(400).json({
            success: false,
            code: 400,
            errors: ['rowId parameter is required']
        });
    }
    const values = {
        rowId: req.body.rowId,
        createdBy: req.header('x-gcp-account')
    };
    const data = await dataManager.deleteDatasetView(projectId, datasetId, viewId, values);
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
