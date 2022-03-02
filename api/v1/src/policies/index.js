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
 *       rowId:
 *         type: string
 *         readOnly: true
 *         description: Policy Row ID, only required for update operations
 *       policyId:
 *         type: string
 *         readOnly: true
 *         description: Policy ID, only required for update operations
 *       name:
 *         type: string
 *         description: Policy display name
 *       description:
 *         type: string
 *         description: Policy decsription
 *       bigQueryEnabled:
 *         type: boolean
 *         description: Flag indicating if BigQuery is enabled for the policy
 *       pubsubEnabled:
 *         type: boolean
 *         description: Flag indicating if Pub/Sub is enabled for the policy
 *       storageEnabled:
 *         type: boolean
 *         description: Flag indicating if Cloud Storage is enabled for the policy
 *       buckets:
 *         type: array
 *         description: Policy buckets
 *         items:
 *           $ref: '#/definitions/Bucket'
 *       topics:
 *         type: array
 *         description: Policy topics
 *         items:
 *           $ref: '#/definitions/Topic'
 *       isTableBased:
 *         type: boolean
 *         description: Indicates if policy is table-based if not than dataset-based.
 *       datasets:
 *         type: array
 *         description: Policy datasets
 *         items:
 *           $ref: '#/definitions/PolicyDataset'
 *       rowAccessTags:
 *         type: array
 *         description: Policy row access tags
 *         items:
 *           $ref: '#/definitions/RowAccessTag'
 *       marketplace:
 *         $ref: '#/definitions/PolicyMarketplace'
 *       createdBy:
 *         type: string
 *         description: Policy created by email
 *       createdAt:
 *         type: integer
 *         description: Policy created at time
 *       version:
 *         type: integer
 *         description: Policy version
 *       isDeleted:
 *         type: boolean
 *         description: Flag indicating if policy was deleted
 *     required:
 *       - name
 *
 *   RowAccessTag:
 *     type: object
 *     description: Policy Row Access Tag object
 *     properties:
 *       tag:
 *         type: string
 *         description: Row Access Tag
 *
 *   Bucket:
 *     type: object
 *     description: Policy bucket object
 *     properties:
 *       bucketName:
 *         type: string
 *         description: The Cloud Storage bucket name
 *
 *   Topic:
 *     type: object
 *     description: Policy topic object
 *     properties:
 *       topicId:
 *         type: string
 *         description: The Pub/Sub topic name
 * 
 *   PolicyDataset:
 *     type: object
 *     description: Policy dataset object
 *     properties:
 *       datasetId:
 *         type: string
 *         description: The dataset Id
 *       tables:
 *         type: array
 *         description: Policy dataset table
 *         items:
 *           type: object
 *           description: Policy dataset table object
 *           properties:
 *             tableId:
 *               type: string
 *               description: The BigQuery tableId
 *  
 *   PolicyMarketplace:
 *     type: object
 *     description: Marketplace object
 *     properties:
 *       solutionId:
 *         type: string
 *         description: The marketplace solutionId, also known as the product
 *       planId:
 *         type: string
 *         description: The marketplace planId, also known as the plan
 *       enableAutoApprove:
 *         type: boolean
 *         description: Indicates if the purchasing account should automatically be added to the policy
 *
 */

/**
 * @swagger
 *
 * /policies:
 *   options:
 *     summary: CORS support
 *     description: Enable CORS by returning correct headers
 *     operationId: optionsPolicies
 *     tags:
 *       - policies
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
 *     summary: List Policy based off request parameters
 *     description: Returns the DatsetList response
 *     operationId: listPolicies
 *     parameters:
 *     - in: header
 *       name: x-gcp-project-id
 *       type: string
 *       required: true
 *     tags:
 *       - policies
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Policy list
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
 *                  $ref: '#/definitions/Policy'
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
 */
policies.get('/policies', async(req, res) => {
    const projectId = req.header('x-gcp-project-id');
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
 * /products:
 *   options:
 *     summary: CORS support
 *     description: Enable CORS by returning correct headers
 *     operationId: optionsListProducts
 *     tags:
 *       - products
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
 *     summary: List Products based off request parameters
 *     description: Returns the Product list response
 *     operationId: listProducts
 *     parameters:
 *     - in: header
 *       name: x-gcp-project-id
 *       type: string
 *       required: true
 *     tags:
 *       - products
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Product list
 *         schema:
 *           type: object
 *           properties:
 *             code:
 *               type: integer
 *               default: 200
 *               description: HTTP status code
 *             success:
 *               type: boolean
 *               description: Success of the request
 *             data:
 *               type: array
 *               items:
 *                 type: object
 *                 description: Policy object
 *                 properties:
 *                   bigQueryEnabled:
 *                     type: boolean
 *                     description: Flag indicating if BigQuery is enabled for the policy
 *                   pubsubEnabled:
 *                     type: boolean
 *                     description: Flag indicating if Pub/Sub is enabled for the policy
 *                   storageEnabled:
 *                     type: boolean
 *                     description: Flag indicating if Cloud Storage is enabled for the policy
 *                   buckets:
 *                     type: array
 *                     description: Policy buckets
 *                     items:
 *                       $ref: '#/definitions/Bucket'
 *                   topics:
 *                     type: array
 *                     description: Policy topics
 *                     items:
 *                       $ref: '#/definitions/Topic'
 *                   isTableBased:
 *                     type: boolean
 *                     description: Indicates if policy is table-based if not than dataset-based.
 *                   datasets:
 *                     type: array
 *                     description: Policy datasets
 *                     items:
 *                       $ref: '#/definitions/PolicyDataset'
 *                   rowAccessTags:
 *                     type: array
 *                     description: Policy row access tags
 *                     items:
 *                       $ref: '#/definitions/RowAccessTag'
 *                   marketplace:
 *                     $ref: '#/definitions/PolicyMarketplace'
 *                   status:
 *                     type: boolean
 *                     description: Flag indicating if user has activated product
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
 */
policies.get('/products', async(req, res) => {
    const projectId = req.header('x-gcp-project-id');
    const email = res.locals.email;
    const data = await dataManager.listUserPolicies(projectId, email);
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
 * /policies:
 *   post:
 *     summary: Create Policy based off request body
 *     description: Returns the Datset response
 *     operationId: createPolicy
 *     tags:
 *       - policies
 *     parameters:
 *     - in: header
 *       name: x-gcp-project-id
 *       type: string
 *       required: true
 *     - in: body
 *       name: policy
 *       description: Request parameters for Policy
 *       schema:
 *         $ref: '#/definitions/Policy'
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: Policy
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
 *                 $ref: '#/definitions/Policy'
 *       404:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
 */
policies.post('/policies', async(req, res) => {
    const projectId = req.header('x-gcp-project-id');
    if (!req.body.name) {
        return res.status(400).json({
            success: false,
            code: 400,
            errors: ['policy name parameter is required']
        });
    }
    if (req.body.rowId || req.body.policyId) {
        return res.status(400).json({
            success: false,
            code: 400,
            errors: ['rowId and policyId should not be provided']
        });
    }
    if (req.body.marketplace) {
        if (req.body.marketplace.solutionId && !req.body.marketplace.planId) {
            return res.status(400).json({
                success: false,
                code: 400,
                errors: ['planId must be provided when a marketplace solutionId is provided']
            });
        } else if (!req.body.marketplace.solutionId && req.body.marketplace.planId) {
            return res.status(400).json({
                success: false,
                code: 400,
                errors: ['solutionId must be provided when a marketplace planId is provided']
            });
        }
    }
    const values = {
        name: req.body.name,
        description: req.body.description,
        isTableBased: req.body.isTableBased,
        createdBy: res.locals.email,
        datasets: req.body.datasets,
        rowAccessTags: req.body.rowAccessTags,
        marketplace: req.body.marketplace,
        bigQueryEnabled: req.body.bigQueryEnabled,
        pubsubEnabled: req.body.pubsubEnabled,
        storageEnabled: req.body.storageEnabled,
        topics: req.body.topics,
        buckets: req.body.buckets
    };
    const data = await dataManager.createOrUpdatePolicy(projectId, null, values);
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
 * /policies/{policyId}:
 *   options:
 *     summary: CORS support
 *     description: Enable CORS by returning correct headers
 *     operationId: optionsPolicyByPolicyId
 *     tags:
 *       - policies
 *     security: [] # no security for preflight requests
 *     parameters:
 *     - in: path
 *       name: policyId
 *       type: string
 *       required: true
 *       description: Policy Id of the Policy request
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
 *     summary: Get Policy based off policyId
 *     description: Returns the Datset response
 *     operationId: getPolicyByPolicyId
 *     tags:
 *       - policies
 *     parameters:
 *     - in: path
 *       name: policyId
 *       type: string
 *       required: true
 *       description: Policy Id of the Policy request
 *     - in: header
 *       name: x-gcp-project-id
 *       type: string
 *       required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Policy
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
 *               $ref: '#/definitions/Policy'
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
 */
policies.get('/policies/:policyId', async(req, res) => {
    const projectId = req.header('x-gcp-project-id');
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

/**
 * @swagger
 *
 * /policies/{policyId}:
 *   put:
 *     summary: Update Policy based off policy ID and request body
 *     description: Returns the Policy response
 *     operationId: updatePolicyByPolicyId
 *     tags:
 *       - policies
 *     parameters:
 *     - in: header
 *       name: x-gcp-project-id
 *       type: string
 *       required: true
 *     - in: path
 *       name: policyId
 *       type: string
 *       required: true
 *       description: Policy Id of the Policy request
 *     - in: body
 *       name: policy
 *       description: Request parameters for Policy
 *       schema:
 *         $ref: '#/definitions/Policy'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Policy
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
 *               $ref: '#/definitions/Policy'
 *       400:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
 */
policies.put('/policies/:policyId', async(req, res) => {
    const projectId = req.header('x-gcp-project-id');
    const policyId = req.params.policyId;
    if (!req.body.name) {
        return res.status(400).json({
            success: false,
            code: 400,
            errors: ['policy name parameter is required']
        });
    }
    if (!req.body.rowId) {
        return res.status(400).json({
            success: false,
            code: 400,
            errors: ['rowId parameter is required']
        });
    }
    if (req.body.marketplace) {
        if (req.body.marketplace.solutionId && !req.body.marketplace.planId) {
            return res.status(400).json({
                success: false,
                code: 400,
                errors: ['planId must be provided when a marketplace solutionId is provided']
            });
        } else if (!req.body.marketplace.solutionId && req.body.marketplace.planId) {
            return res.status(400).json({
                success: false,
                code: 400,
                errors: ['solutionId must be provided when a marketplace planId is provided']
            });
        }
    }
    const values = {
        rowId: req.body.rowId,
        name: req.body.name,
        description: req.body.description,
        isTableBased: req.body.isTableBased,
        createdBy: res.locals.email,
        datasets: req.body.datasets,
        rowAccessTags: req.body.rowAccessTags,
        marketplace: req.body.marketplace,
        bigQueryEnabled: req.body.bigQueryEnabled,
        pubsubEnabled: req.body.pubsubEnabled,
        storageEnabled: req.body.storageEnabled,
        topics: req.body.topics,
        buckets: req.body.buckets
    };
    const data = await dataManager.createOrUpdatePolicy(projectId, policyId, values);
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
 * /policies/{policyId}:
 *   delete:
 *     summary: Delete Policy based off policy ID and request body
 *     description: Returns the Policy response
 *     operationId: deletePolicyByPolicyId
 *     tags:
 *       - policies
 *     parameters:
 *     - in: header
 *       name: x-gcp-project-id
 *       type: string
 *       required: true
 *     - in: path
 *       name: policyId
 *       type: string
 *       required: true
 *       description: Policy Id of the Policy request
 *     - in: body
 *       name: policy
 *       description: Request parameters for Policy
 *       schema:
 *          type: object
 *          properties:
 *            rowId:
 *              description: The rowId for the current policy
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Policy
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
 *                 $ref: '#/definitions/Policy'
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
 */
policies.delete('/policies/:policyId', async(req, res) => {
    const projectId = req.header('x-gcp-project-id');
    const policyId = req.params.policyId;
    const values = {
        rowId: req.body.rowId,
        createdBy: res.locals.email
    };
    const data = await dataManager.deletePolicy(projectId, policyId, values);
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
 * /accounts/{accountId}/policies:
 *   options:
 *     summary: CORS support
 *     description: Enable CORS by returning correct headers
 *     operationId: optionsPolicyByAccountId
 *     tags:
 *       - accounts
 *     security: [] # no security for preflight requests
 *     parameters:
 *     - in: path
 *       name: accountId
 *       type: string
 *       required: true
 *       description: Account Id of the Account request
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
 *     summary: List Policy based off accountId and request parameters
 *     description: Returns the PolicyList response
 *     operationId: listPoliciesByAccountId
 *     tags:
 *       - accounts
 *     parameters:
 *     - in: header
 *       name: x-gcp-project-id
 *       type: string
 *       required: true
 *     - in: path
 *       name: accountId
 *       type: string
 *       required: true
 *       description: Account Id of the Policy request
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Policy list
 *         schema:
 *           type: object
 *           properties:
 *             code:
 *               type: integer
 *               default: 200
 *               description: HTTP status code
 *             success:
 *               type: boolean
 *               description: Success of the request
 *             data:
 *               type: array
 *               items:
 *                  $ref: '#/definitions/Policy'
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
 */
policies.get('/accounts/:accountId/policies', async(req, res) => {
    const projectId = req.header('x-gcp-project-id');
    const accountId = req.params.accountId;
    const data = await dataManager.listPolicies(projectId, null, accountId);
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
 * /datasets/{datasetId}/policies:
 *   options:
 *     summary: CORS support
 *     description: Enable CORS by returning correct headers
 *     operationId: optionsPolicyByDatasetId
 *     security: [] # no security for preflight requests
 *     tags:
 *       - datasets
 *     parameters:
 *     - in: path
 *       name: datasetId
 *       type: string
 *       required: true
 *       description: Dataset Id of the Policy request
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
 *     summary: List Policy based off datasetId and request parameters
 *     description: Returns the PolicyList response
 *     operationId: listPoliciesByDatasetId
 *     tags:
 *       - datasets
 *     parameters:
 *     - in: path
 *       name: datasetId
 *       type: string
 *       required: true
 *       description: Dataset Id of the Policy request
 *     - in: header
 *       name: x-gcp-project-id
 *       type: string
 *       required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Policy list
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
 *                  $ref: '#/definitions/Policy'
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
 */
policies.get('/datasets/:datasetId/policies', async(req, res) => {
    const projectId = req.header('x-gcp-project-id');
    const datasetId = req.params.datasetId;
    const data = await dataManager.listPolicies(projectId, datasetId);
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
