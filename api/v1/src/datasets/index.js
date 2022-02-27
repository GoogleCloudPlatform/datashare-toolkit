/**
 * Copyright 2020-2022 Google LLC
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
 *         description: The BigQuery datasetId.
 *       description:
 *         type: string
 *         description: Description of the dataset.
 *       modifiedAt:
 *         type: integer
 *         description: The last modified timestamp.
 *       accounts:
 *         type: array
 *         description: Accounts with access to the dataset.
 *         items:
 *           $ref: '#/definitions/Accounts'
 *       labels:
 *         type: object
 *         properties:
 *           key:
 *             type: string
 *             description: The label.
 *   Accounts:
 *     type: object
 *     description: Table object
 *     properties:
 *       email:
 *         type: string
 *         description: Email address for the account
 *       type:
 *         type: string
 *         description: The account type
 *   Table:
 *     type: object
 *     description: Table object
 *     properties:
 *       datasetId:
 *         type: string
 *         description: Dataset ID
 *   Column:
 *     type: object
 *     description: Column object
 *     properties:
 *       datasetId:
 *         type: string
 *         description: Dataset ID
 *   View:
 *     type: object
 *     description: View object
 *     properties:
 *       datasetId:
 *         type: string
 *         description: Dataset ID
 *
 */

/**
 * @swagger
 *
 * /datasets:
 *   options:
 *     summary: CORS support
 *     description: Enable CORS by returning correct headers
 *     operationId: optionsDatasets
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
 *     summary: List Dataset based off request parameters
 *     description: Returns the DatsetList response
 *     operationId: listDatasets
 *     parameters:
 *     - in: header
 *       name: x-gcp-project-id
 *       type: string
 *       required: true
 *       description: The GCP projectId for the target project.
 *     - in: query
 *       name: includeAll
 *       schema:
 *         type: boolean
 *         default: false
 *       description: Indicates if all datasets including non-Datashare managed datasets should be returned. Default is false.
 *     tags:
 *       - datasets
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Dataset list
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
 *               type: array
 *               items:
 *                  $ref: '#/definitions/Dataset'
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
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
 * /datasets:
 *   post:
 *     summary: Create Dataset based off request body
 *     description: Returns the Dataset response
 *     operationId: createDataset
 *     tags:
 *       - datasets
 *     parameters:
 *     - in: body
 *       name: dataset
 *       description: Request parameters for Dataset
 *       schema:
 *         $ref: '#/definitions/Dataset'
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: Dataset
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
 *               items:
 *                 $ref: '#/definitions/Dataset'
 *       404:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
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
 * /datasets/{datasetId}:
 *   put:
 *     summary: Update Dataset based off request body
 *     description: Returns the Dataset response
 *     operationId: updateDataset
 *     tags:
 *       - datasets
 *     parameters:
 *     - in: header
 *       name: x-gcp-project-id
 *       type: string
 *       required: true
 *     - in: path
 *       name: datasetId
 *       type: string
 *       required: true
 *       description: Dataset Id of the Dataset request
 *     - in: body
 *       name: dataset
 *       description: Request parameters for Dataset
 *       schema:
 *         $ref: '#/definitions/Dataset'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Dataset
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
 *               items:
 *                 $ref: '#/definitions/Dataset'
 *       404:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
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
 * /datasets/{datasetId}:
 *   options:
 *     summary: CORS support
 *     description: Enable CORS by returning correct headers
 *     operationId: optionsGetDatasetByDatasetId
 *     security: [] # no security for preflight requests
 *     parameters:
 *     - in: path
 *       name: datasetId
 *       type: string
 *       required: true
 *       description: Dataset Id of the Dataset request
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
 *     summary: Get Dataset based off datasetId
 *     description: Returns the Datset response
 *     operationId: getDatasetByDatasetId
 *     tags:
 *       - datasets
 *     parameters:
 *     - in: path
 *       name: datasetId
 *       type: string
 *       required: true
 *       description: Dataset Id of the Dataset request
 *     - in: header
 *       name: x-gcp-project-id
 *       type: string
 *       required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Dataset
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
 *               items:
 *                  $ref: '#/definitions/Dataset'
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
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
 * /datasets/{datasetId}:
 *   delete:
 *     summary: Delete Dataset based off dataset ID and request body
 *     description: Returns the Account response
 *     operationId: deleteDatasetByDatasetId
 *     tags:
 *       - accounts
 *     parameters:
 *     - in: path
 *       name: datasetId
 *       type: string
 *       required: true
 *       description: Dataset Id of the Dataset request
 *     - in: header
 *       name: x-gcp-project-id
 *       type: string
 *       required: true
 *     - in: body
 *       name: dataset
 *       description: Request parameters for Dataset
 *       schema:
 *         $ref: '#/definitions/Dataset'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Dataset
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
 *               items:
 *                 $ref: '#/definitions/Dataset'
 *       404:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
 */
datasets.delete('/datasets/:datasetId', async(req, res) => {
    const projectId = req.header('x-gcp-project-id');
    const datasetId = req.params.datasetId;
    const createdBy = res.locals.email;
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

/**
 * @swagger
 *
 * /datasets/{datasetId}/tables:
 *   options:
 *     summary: CORS support
 *     description: Enable CORS by returning correct headers
 *     operationId: optionsListDatasetTablesByDatasetId
 *     security: [] # no security for preflight requests
 *     parameters:
 *     - in: path
 *       name: datasetId
 *       type: string
 *       required: true
 *       description: Dataset Id of the Dataset request
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
 *     summary: List Dataset Tables based off datasetId
 *     description: Returns the Datset Tables response
 *     operationId: listDatasetTablesByDatasetId
 *     tags:
 *       - datasets
 *     parameters:
 *     - in: path
 *       name: datasetId
 *       type: string
 *       required: true
 *       description: Dataset Id of the Dataset request
 *     - in: header
 *       name: x-gcp-project-id
 *       type: string
 *       required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Tables
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
 *               items:
 *                  $ref: '#/definitions/Table'
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
 */
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

/**
 * @swagger
 *
 * /datasets/{datasetId}/tables/{tableId}/columns:
 *   options:
 *     summary: CORS support
 *     description: Enable CORS by returning correct headers
 *     operationId: optionsListDatasetTableColumnssByDatasetId
 *     security: [] # no security for preflight requests
 *     parameters:
 *     - in: path
 *       name: datasetId
 *       type: string
 *       required: true
 *       description: Dataset Id of the Dataset request
 *     - in: path
 *       name: tableId
 *       type: string
 *       required: true
 *       description: Table Id of the Dataset request
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
 *     summary: List Dataset Table Columns based off datasetId
 *     description: Returns the Datset Table Columns response
 *     operationId: listDatasetTableColumnssByDatasetId
 *     tags:
 *       - datasets
 *     parameters:
 *     - in: path
 *       name: datasetId
 *       type: string
 *       required: true
 *       description: Dataset Id of the Dataset request
 *     - in: path
 *       name: tableId
 *       type: string
 *       required: true
 *       description: Table Id of the Dataset request
 *     - in: header
 *       name: x-gcp-project-id
 *       type: string
 *       required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Columns
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
 *               items:
 *                  $ref: '#/definitions/Table'
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
 */
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

/**
 * @swagger
 *
 * /views:
 *   options:
 *     summary: CORS support
 *     description: Enable CORS by returning correct headers
 *     operationId: optionsListViews
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
 *     summary: List Views based off request parameters
 *     description: Returns the View response
 *     operationId: listViews
 *     parameters:
 *     - in: header
 *       name: x-gcp-project-id
 *       type: string
 *       required: true
 *     tags:
 *       - datasets
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: View list
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
 *               type: array
 *               items:
 *                  $ref: '#/definitions/Dataset'
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
 */
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

/**
 * @swagger
 *
 * /datasets/{datasetId}/views:
 *   options:
 *     summary: CORS support
 *     description: Enable CORS by returning correct headers
 *     operationId: optionsListDatasetViewsByDatasetId
 *     security: [] # no security for preflight requests
 *     parameters:
 *     - in: path
 *       name: datasetId
 *       type: string
 *       required: true
 *       description: Dataset Id of the Dataset request
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
 *     summary: List Dataset Views based off datasetId
 *     description: Returns the Datset Views response
 *     operationId: listDatasetViewsByDatasetId
 *     tags:
 *       - datasets
 *     parameters:
 *     - in: path
 *       name: datasetId
 *       type: string
 *       required: true
 *       description: Dataset Id of the Dataset request
 *     - in: header
 *       name: x-gcp-project-id
 *       type: string
 *       required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Views
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
 *               items:
 *                  $ref: '#/definitions/View'
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
 */
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

/**
 * @swagger
 *
 * /datasets/{datasetId}/views/{viewId}:
 *   options:
 *     summary: CORS support
 *     description: Enable CORS by returning correct headers
 *     operationId: optionsGetDatasetViewByDatasetId
 *     security: [] # no security for preflight requests
 *     parameters:
 *     - in: path
 *       name: datasetId
 *       type: string
 *       required: true
 *       description: Dataset Id of the Dataset request
 *     - in: path
 *       name: viewId
 *       type: string
 *       required: true
 *       description: Dataset View Id of the Dataset request
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
 *     summary: Get Dataset View based off datasetId
 *     description: Returns the Datset Views response
 *     operationId: getDatasetViewByDatasetId
 *     tags:
 *       - datasets
 *     parameters:
 *     - in: path
 *       name: datasetId
 *       type: string
 *       required: true
 *       description: Dataset Id of the Dataset request
 *     - in: path
 *       name: viewId
 *       type: string
 *       required: true
 *       description: Dataset View Id of the Dataset request
 *     - in: header
 *       name: x-gcp-project-id
 *       type: string
 *       required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: View
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
 *               $ref: '#/definitions/View'
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
 */
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

/**
 * @swagger
 *
 * /datasets/{datasetId}/views:validate:
 *   options:
 *     summary: CORS support
 *     description: Enable CORS by returning correct headers
 *     operationId: optionsValidateDatasetViewByDatasetId
 *     security: [] # no security for preflight requests
 *     parameters:
 *     - in: path
 *       name: datasetId
 *       type: string
 *       required: true
 *       description: Dataset Id of the Dataset request
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
 *     summary: Validate Dataset View based off datasetId
 *     description: Returns the Datset Views response
 *     operationId: validateDatasetViewByDatasetId
 *     tags:
 *       - datasets
 *     parameters:
 *     - in: path
 *       name: datasetId
 *       type: string
 *       required: true
 *       description: Dataset Id of the Dataset request
 *     - in: header
 *       name: x-gcp-project-id
 *       type: string
 *       required: true
 *     - in: body
 *       name: view
 *       description: Request parameters for Dataset Views validate
 *       schema:
 *         $ref: '#/definitions/View'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: View
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
 *               $ref: '#/definitions/View'
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
 *
 */
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

/**
 * @swagger
 *
 * /datasets/{datasetId}/views:
 *   post:
 *     summary: Create Dataset View based off datasetId
 *     description: Returns the Datset Views response
 *     operationId: createDatasetViewByDatasetId
 *     tags:
 *       - datasets
 *     parameters:
 *     - in: path
 *       name: datasetId
 *       type: string
 *       required: true
 *       description: Dataset Id of the Dataset request
 *     - in: header
 *       name: x-gcp-project-id
 *       type: string
 *       required: true
 *     - in: body
 *       name: view
 *       description: Request parameters for Dataset View
 *       schema:
 *         $ref: '#/definitions/View'
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: View
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
 *               $ref: '#/definitions/View'
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
 *
 */
datasets.post('/datasets/:datasetId/views', async(req, res) => {
    const projectId = req.header('x-gcp-project-id');
    const datasetId = req.params.datasetId;
    const view = req.body;
    const createdBy = res.locals.email;
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

/**
 * @swagger
 *
 * /datasets/{datasetId}/views/{viewId}:
 *   put:
 *     summary: Update Dataset View based off datasetId
 *     description: Returns the Datset Views response
 *     operationId: updateDatasetViewByDatasetId
 *     tags:
 *       - datasets
 *     parameters:
 *     - in: path
 *       name: datasetId
 *       type: string
 *       required: true
 *       description: Dataset Id of the update request
 *     - in: path
 *       name: viewId
 *       type: string
 *       required: true
 *       description: View Id of the update request
 *     - in: header
 *       name: x-gcp-project-id
 *       type: string
 *       required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: View
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
 *               $ref: '#/definitions/View'
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
 *
 */
datasets.put('/datasets/:datasetId/views/:viewId', async(req, res) => {
    const projectId = req.header('x-gcp-project-id');
    const datasetId = req.params.datasetId;
    const viewId = req.params.viewId;
    const view = req.body;
    const createdBy = res.locals.email;
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

/**
 * @swagger
 *
 * /datasets/{datasetId}/views/{viewId}:
 *   delete:
 *     summary: Delete Dataset View based off datasetId
 *     description: Returns the Datset Views response
 *     operationId: deleteDatasetViewByDatasetId
 *     tags:
 *       - datasets
 *     parameters:
 *     - in: path
 *       name: datasetId
 *       type: string
 *       required: true
 *       description: Dataset Id of the Dataset request
 *     - in: path
 *       name: viewId
 *       type: string
 *       required: true
 *       description: Dataset View Id of the Dataset request
 *     - in: header
 *       name: x-gcp-project-id
 *       type: string
 *       required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: View
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
 *               $ref: '#/definitions/View'
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
 *
 */
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
        createdBy: res.locals.email
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
