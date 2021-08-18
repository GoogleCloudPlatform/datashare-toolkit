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
const procurementManager = require("./../procurements/dataManager");
const cfg = require('../lib/config');

const { CommonUtil } = require('cds-shared');
const runtimeConfig = require('../lib/runtimeConfig');
const commonUtil = CommonUtil;

/************************************************************
  API Endpoints
 ************************************************************/
// Define the routes for the REST API
var accounts = express.Router();
// methods that require multiple routes

/**
 * @swagger
 *
 *
 * definitions:
 *   Account:
 *     type: object
 *     description: Account object
 *     properties:
 *       accountId:
 *         type: string
 *         readOnly: true
 *         description: Account ID
 *       rowId:
 *         type: string
 *         readOnly: true
 *         description: Account Row ID
 *       email:
 *         type: string
 *         description: Account email address
 *       emailType:
 *         type: string
 *         description: Account email type string
 *         $ref: '#/definitions/EmailType'
 *       accountType:
 *         type: string
 *         description: Account type string
 *         $ref: '#/definitions/AccountType'
 *       createdBy:
 *         type: string
 *         description: Account created by email
 *       policies:
 *         type: array
 *         description: Account policy IDs
 *         items:
 *           $ref: '#/definitions/PolicyID'
 *     required:
 *       - email
 *       - emailType
 *       - accountType
 *
 *   PolicyID:
 *     type: object
 *     description: Policy ID object
 *     properties:
 *       policyId:
 *         type: string
 *         description: Policy ID
 *
 *   EmailType:
 *     type: string
 *     description: Account Email Type enum
 *     enum:
 *       - user
 *       - group
 *
 *   AccountType:
 *     type: string
 *     description: Account Type enum
 *     enum:
 *       - consumer
 *       - producer
 */

/**
 * @swagger
 *
 * /projects/{projectId}/accounts:
 *   get:
 *     summary: List Account based off request parameters
 *     description: Returns the PolicyList response
 *     tags:
 *       - accounts
 *     parameters:
 *     - in: path
 *       name: projectId
 *       schema:
 *          type: string
 *       required: true
 *       description: Project Id of the Account request
 *     responses:
 *       200:
 *         description: Account list
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
 *                      $ref: '#/definitions/Account'
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */
accounts.get('/accounts', async (req, res) => {
    const projectId = req.header('x-gcp-project-id');
    const data = await dataManager.listAccounts(projectId);
    var code;
    if (data && data.success === false) {
        code = (data.code === undefined) ? 500 : data.code;
    } else {
        code = (data.code === undefined) ? 200 : data.code;
    }
    res.status(code).json({
        code: code,
        ...data
    });
});

/**
 * @swagger
 *
 * /projects/{projectId}/accounts:
 *   post:
 *     summary: Create Account based off request body
 *     description: Returns the Datset response
 *     tags:
 *       - accounts
 *     parameters:
 *     - in: path
 *       name: projectId
 *       schema:
 *          type: string
 *       required: true
 *       description: Project Id of the Account request
 *     - in: header
 *       name: x-gcp-account
 *       schema:
 *          type: string
 *       required: true
 *       description: GCP account name of the calling user
 *     requestBody:
 *       description: Request parameters for Account
 *       content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/Account'
 *     responses:
 *       201:
 *         description: Account
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
 *                     $ref: '#/definitions/Account'
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
accounts.post('/accounts', async (req, res) => {
    const projectId = req.header('x-gcp-project-id');
    if (!req.body.email) {
        return res.status(400).json({
            success: false,
            code: 400,
            errors: ['account email parameter is required']
        });
    }
    if (req.body.rowId || req.body.accountId) {
        return res.status(400).json({
            success: false,
            code: 400,
            errors: ['rowId and accountId should not be provided']
        });
    }
    const values = {
        email: req.body.email,
        emailType: req.body.emailType,
        accountType: req.body.accountType,
        createdBy: req.header('x-gcp-account'),
        policies: req.body.policies,
        marketplace: req.body.marketplace
    };
    const data = await dataManager.createOrUpdateAccount(projectId, null, values);
    var code;
    if (data && data.success === false) {
        code = (data.code === undefined) ? 500 : data.code;
    } else {
        code = (data.code === undefined) ? 201 : data.code;
    }
    res.status(code).json({
        code: code,
        ...data
    });
});

/**
 * @swagger
 *
 * /projects/{projectId}/accounts/{accountId}:
 *   get:
 *     summary: Get Account based off accountId
 *     description: Returns the Datset response
 *     tags:
 *       - accounts
 *     parameters:
 *     - in: path
 *       name: projectId
 *       schema:
 *          type: string
 *       required: true
 *       description: Project Id of the Account request
 *     - in: path
 *       name: accountId
 *       schema:
 *          type: string
 *       required: true
 *       description: Account Id of the Account request
 *     responses:
 *       200:
 *         description: Account
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
 *                      $ref: '#/definitions/Account'
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */
accounts.get('/accounts/:accountId', async (req, res) => {
    const projectId = req.header('x-gcp-project-id');
    const accountId = req.params.accountId;
    const data = await dataManager.getAccount(projectId, accountId);
    const success = data !== null;
    var code;
    if (data && success === false) {
        code = 404;
    } else {
        code = 200;
    }
    res.status(code).json({
        code,
        success,
        data,
    });
});

/**
 * @swagger
 *
 * /projects/{projectId}/accounts/{accountId}:
 *   put:
 *     summary: Update Account based off account ID and request body
 *     description: Returns the Account response
 *     tags:
 *       - accounts
 *     parameters:
 *     - in: path
 *       name: projectId
 *       schema:
 *          type: string
 *       required: true
 *       description: Project Id of the Account request
 *     - in: path
 *       name: accountId
 *       schema:
 *          type: string
 *       required: true
 *       description: Account Id of the Account request
 *     - in: header
 *       name: x-gcp-account
 *       schema:
 *          type: string
 *       required: true
 *       description: GCP account name of the calling user
 *     requestBody:
 *       description: Request parameters for Account
 *       content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/Account'
 *     responses:
 *       200:
 *         description: Account
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
 *                     $ref: '#/definitions/Account'
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
accounts.put('/accounts/:accountId', async (req, res) => {
    const projectId = req.header('x-gcp-project-id');
    const accountId = req.params.accountId;
    if (!req.body.email) {
        return res.status(400).json({
            success: false,
            code: 400,
            errors: ['account email parameter is required']
        });
    }
    if (!req.body.rowId) {
        return res.status(400).json({
            success: false,
            code: 400,
            errors: ['rowId parameter is required']
        });
    }
    const values = {
        rowId: req.body.rowId,
        email: req.body.email,
        emailType: req.body.emailType,
        accountType: req.body.accountType,
        createdBy: req.header('x-gcp-account'),
        policies: req.body.policies,
        marketplace: req.body.marketplace
    };
    const data = await dataManager.createOrUpdateAccount(projectId, accountId, values);
    var code;
    if (data && data.success === false) {
        code = (data.code === undefined) ? 500 : data.code;
    } else {
        code = (data.code === undefined) ? 200 : data.code;
    }
    res.status(code).json({
        code: code,
        ...data
    });
});

/**
 * @swagger
 *
 * /projects/{projectId}/accounts/{accountId}:
 *   delete:
 *     summary: Delete Account based off account ID and request body
 *     description: Returns the Account response
 *     tags:
 *       - accounts
 *     parameters:
 *     - in: path
 *       name: projectId
 *       schema:
 *          type: string
 *       required: true
 *       description: Project Id of the Account request
 *     - in: path
 *       name: accountId
 *       schema:
 *          type: string
 *       required: true
 *       description: Account Id of the Account request
 *     - in: header
 *       name: x-gcp-account
 *       schema:
 *          type: string
 *       required: true
 *       description: GCP account name of the calling user
 *     requestBody:
 *       description: Request parameters for Account
 *       content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/Account'
 *     responses:
 *       200:
 *         description: Account
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
 *                     $ref: '#/definitions/Account'
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
accounts.delete('/accounts/:accountId', async (req, res) => {
    const projectId = req.header('x-gcp-project-id');
    const accountId = req.params.accountId;
    const values = {
        rowId: req.body.rowId,
        createdBy: req.header('x-gcp-account')
    };
    const data = await dataManager.deleteAccount(projectId, accountId, values);
    var code;
    if (data && data.success === false) {
        code = (data.code === undefined) ? 500 : data.code;
    } else {
        code = (data.code === undefined) ? 200 : data.code;
    }
    res.status(code).json({
        code: code,
        ...data
    });
});

/**
 * @swagger
 *
 * /projects/{projectId}/policies/{policyId}/accounts:
 *   get:
 *     summary: List Accounts of policy based off policyId and request parameters
 *     description: Returns the Account list response
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
 *         description: Account list
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
 *                      $ref: '#/definitions/Account'
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */
accounts.get('/policies/:policyId/accounts', async (req, res) => {
    const projectId = req.header('x-gcp-project-id');
    const policyId = req.params.policyId;
    const data = await dataManager.listAccounts(projectId, null, policyId);
    var code;
    if (data && data.success === false) {
        code = (data.code === undefined) ? 500 : data.code;
    } else {
        code = (data.code === undefined) ? 200 : data.code;
    }
    res.status(code).json({
        code: code,
        ...data
    });
});

/**
 * @swagger
 *
 * /projects/{projectId}/datasets/{datasetId}/accounts:
 *   get:
 *     summary: List Accounts based off datasetId and request parameters
 *     description: Returns the AccountList response
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
 *         description: Account list
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
 *                      $ref: '#/definitions/Account'
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */
accounts.get('/datasets/:datasetId/accounts', async (req, res) => {
    const projectId = req.header('x-gcp-project-id');
    const datasetId = req.params.datasetId;
    const data = await dataManager.listAccounts(projectId, datasetId);
    var code;
    if (data && data.success === false) {
        code = (data.code === undefined) ? 500 : data.code;
    } else {
        code = (data.code === undefined) ? 200 : data.code;
    }
    res.status(code).json({
        code: code,
        ...data
    });
});

// Temporary for development
// Backwards compatibility for marketplace
accounts.get(['/projects/:projectId/accounts:register', '/accounts:register'], async (req, res) => {
    const currentProjectId = await runtimeConfig.getCurrentProjectId();
    let projectId = req.params.projectId || currentProjectId;

    // Check if override for projectId is set
    const p = req.query.projectId;
    if (p) {
        projectId = p;
    }

    const token = req.query['x-gcp-marketplace-token'];
    console.log(`Register called for project ${projectId}, x-gcp-marketplace-token: ${token}, body: ${JSON.stringify(req.body)}`);

    const host = commonUtil.extractHostname(req.headers.host);
    const data = await dataManager.register(host, token);
    console.log(`Data: ${JSON.stringify(data)}`);

    if (data && data.success === false) {
        res.clearCookie(cfg.gcpMarketplaceTokenCookieName);
        res.redirect(cfg.uiBaseUrl + '/activationError');
    } else {
        const uiHost = commonUtil.extractHostname(cfg.uiBaseUrl);
        res.cookie(cfg.gcpMarketplaceTokenCookieName, token, { secure: host == 'localhost' ? false : true, expires: 0, domain: uiHost });
        res.redirect(cfg.uiBaseUrl + `/activation?gmt=${token}&projectId=${projectId}`);
    }
});

// Backwards compatibility for marketplace
accounts.post(['/projects/:projectId/accounts::custom', '/accounts::custom'], async (req, res) => {
    let projectId = req.params.projectId || req.header('x-gcp-project-id');
    const host = commonUtil.extractHostname(req.headers.host);
    console.log(`Host is: ${host}`);
    switch (req.params.custom) {
        case "register": {
            // Check if override for projectId is set
            const p = req.query.projectId;
            if (p) {
                projectId = p;
            } else {
                projectId = await runtimeConfig.getCurrentProjectId();
            }
            const token = req.body['x-gcp-marketplace-token'];
            console.log(`Register called for project ${projectId}, x-gcp-marketplace-token: ${token}, body: ${JSON.stringify(req.body)}`);

            const data = await dataManager.register(host, token);
            console.log(`Data: ${JSON.stringify(data)}`);

            if (data && data.success === false) {
                res.clearCookie(cfg.gcpMarketplaceTokenCookieName);
                res.redirect(cfg.uiBaseUrl + '/activationError');
            } else {
                const uiHost = commonUtil.extractHostname(cfg.uiBaseUrl);
                res.cookie(cfg.gcpMarketplaceTokenCookieName, token, { secure: host == 'localhost' ? false : true, expires: 0, domain: uiHost });
                res.redirect(cfg.uiBaseUrl + `/activation?gmt=${token}&projectId=${projectId}`);
            }
            break;
        }
        case "activate": {
            const token = req.body['x-gcp-marketplace-token'];
            const email = req.body.email;
            const reason = req.body.reason;
            console.log(`Activate called for project ${projectId}, token: ${token}, body: ${JSON.stringify(req.body)}`);

            const data = await dataManager.activate(projectId, host, token, reason, email);
            console.log(`Data: ${JSON.stringify(data)}`);

            // TODO: Perform redirects
            let code;
            if (data && data.success === false) {
                code = (data.code === undefined) ? 500 : data.code;
            } else {
                code = (data.code === undefined) ? 200 : data.code;
            }
            res.status(code).json({
                code: code,
                ...data
            });
            break;
        }
        case "reset": {
            const accountId = req.body.accountId;
            console.log(`Reset account called for project ${projectId}, accountId: ${accountId}, body: ${JSON.stringify(req.body)}`);

            const data = await dataManager.reset(projectId, accountId);
            console.log(`Data: ${JSON.stringify(data)}`);

            let code;
            if (data && data.success === false) {
                code = (data.code === undefined) ? 500 : data.code;
            } else {
                code = (data.code === undefined) ? 200 : data.code;
            }
            res.status(code).json({
                code: code,
                ...data
            });
            break;
        }
        case "syncMarketplace": {
            const accountId = req.body.accountId;
            console.log(`Sync marketplace entitlements called for project ${projectId}, accountId: ${accountId}, body: ${JSON.stringify(req.body)}`);
            const account = await dataManager.getAccount(projectId, accountId);
            const data = await procurementManager.syncAccountEntitlements(projectId, account);
            console.log(`Data: ${JSON.stringify(data)}`);

            let code;
            if (data && data.success === false) {
                code = (data.code === undefined) ? 500 : data.code;
            } else {
                code = (data.code === undefined) ? 200 : data.code;
            }
            res.status(code).json({
                code: code,
                ...data
            });
            break;
        }
        default:
            res.status(404).json();
            break;
    }
});

module.exports = accounts;
