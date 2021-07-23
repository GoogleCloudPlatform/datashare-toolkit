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
 *       policyId:
 *         type: string
 *         readOnly: true
 *         description: Policy ID
 *       rowId:
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
 *       marketplace:
 *         $ref: '#/definitions/Marketplace'
 *         description: Associated Marketplace solution information
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
 *   Marketplace:
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

policies.get('/products', async(req, res) => {
    const projectId = req.header('x-gcp-project-id');
    const email = req.header('x-gcp-account')
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
 *     - in: header
 *       name: x-gcp-account
 *       schema:
 *          type: string
 *       required: true
 *       description: GCP account name of the calling user
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
        createdBy: req.header('x-gcp-account'),
        datasets: req.body.datasets,
        rowAccessTags: req.body.rowAccessTags,
        marketplace: req.body.marketplace
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
 * /projects/{projectId}/policies/{policyId}:
 *   put:
 *     summary: Update Policy based off policy ID and request body
 *     description: Returns the Policy response
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
 *     - in: header
 *       name: x-gcp-account
 *       schema:
 *          type: string
 *       required: true
 *       description: GCP account name of the calling user
 *     requestBody:
 *       description: Request parameters for Policy
 *       content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/Policy'
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
        createdBy: req.header('x-gcp-account'),
        datasets: req.body.datasets,
        rowAccessTags: req.body.rowAccessTags,
        marketplace: req.body.marketplace
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
 * /projects/{projectId}/policies/{policyId}:
 *   delete:
 *     summary: Delete Policy based off policy ID and request body
 *     description: Returns the Policy response
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
 *     - in: header
 *       name: x-gcp-account
 *       schema:
 *          type: string
 *       required: true
 *       description: GCP account name of the calling user
 *     requestBody:
 *       description: Request parameters for Policy
 *       content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/Policy'
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
policies.delete('/policies/:policyId', async(req, res) => {
    const projectId = req.header('x-gcp-project-id');
    const policyId = req.params.policyId;
    const values = {
        rowId: req.body.rowId,
        createdBy: req.header('x-gcp-account')
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
 * /projects/{projectId}/accounts/{accountId}/policies:
 *   get:
 *     summary: List Policy based off accountId and request parameters
 *     description: Returns the PolicyList response
 *     tags:
 *       - accounts
 *     parameters:
 *     - in: path
 *       name: projectId
 *       schema:
 *          type: string
 *       required: true
 *       description: Project Id of the Policy request
 *     - in: path
 *       name: accountId
 *       schema:
 *          type: string
 *       required: true
 *       description: Account Id of the Policy request
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
 * /projects/{projectId}/datasets/{datasetId}/policies:
 *   get:
 *     summary: List Policy based off datasetId and request parameters
 *     description: Returns the PolicyList response
 *     tags:
 *       - datasets
 *     parameters:
 *     - in: path
 *       name: projectId
 *       schema:
 *          type: string
 *       required: true
 *       description: Project Id of the Policy request
 *     - in: path
 *       name: datasetId
 *       schema:
 *          type: string
 *       required: true
 *       description: Dataset Id of the Policy request
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
