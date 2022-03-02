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
const cfg = require('../lib/config');
const runtimeConfig = require('../lib/runtimeConfig');

/************************************************************
  API Endpoints
 ************************************************************/
// Define the routes for the REST API
var procurements = express.Router();
// methods that require multiple routes

/**
 * @swagger
 *
 * /procurements:
 *   options:
 *     summary: CORS support
 *     description: Enable CORS by returning correct headers
 *     operationId: optionsProcurements
 *     tags:
 *       - procurements
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
 *     summary: List Procurements based off request parameters
 *     description: Returns the ProcurementList response
 *     operationId: listProcurements
 *     parameters:
 *     - in: header
 *       name: x-gcp-project-id
 *       type: string
 *       required: true
 *     tags:
 *       - procurements
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Procurement list
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
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The resource name of the entitlement. Entitlement names have the form providers/{providerId}/entitlements/{entitlement_id}.
 *                   account:
 *                     type: string
 *                     description: The resource name of the account that this entitlement is based on, if any.
 *                   provider:
 *                     type: string
 *                     description: The identifier of the service provider that this entitlement was created against. Each service provider is assigned a unique provider value when they onboard with Cloud Commerce platform.
 *                   product:
 *                     type: string
 *                     description: The identifier of the entity that was purchased. This may actually represent a product, quote, or offer.
 *                   plan:
 *                     type: string
 *                     description: The identifier of the plan that was procured. Required if the product has plans.
 *                   state:
 *                     type: string
 *                     description: The state of the entitlement
 *                     enum:
 *                       - ENTITLEMENT_STATE_UNSPECIFIED
 *                       - ENTITLEMENT_ACTIVATION_REQUESTED
 *                       - ENTITLEMENT_ACTIVE
 *                       - ENTITLEMENT_PENDING_CANCELLATION
 *                       - ENTITLEMENT_CANCELLED
 *                       - ENTITLEMENT_PENDING_PLAN_CHANGE
 *                       - ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL
 *                       - ENTITLEMENT_SUSPENDED
 *                   updateTime:
 *                     type: string
 *                     description: The last update timestamp.
 *                   createTime:
 *                     type: string
 *                     description: The creation timestamp.
 *                   productExternalName:
 *                     type: string
 *                     description: The identifier of the product that was procured.
 *                   policy:
 *                     type: object
 *                     properties:
 *                       policyId:
 *                         type: string
 *                         description: The policy Id
 *                       name:
 *                         type: string
 *                         description: The policy name
 *                       description:
 *                         type: string
 *                         description: The policy description
 *                   activated:
 *                     type: boolean
 *                     description: Flag indicating if the user has performed activation
 *                   email:
 *                     type: string
 *                     description: Email address of the activated user
 *                   accountId:
 *                     type: string
 *                     description: Billing accountId of the consumer
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
 */
procurements.get('/procurements', async (req, res) => {
    const projectId = req.header('x-gcp-project-id');
    let stateFilter = null;
    if (req.query.stateFilter) {
        stateFilter = req.query.stateFilter.split(',');
    }
    const data = await dataManager.listProcurements(projectId, stateFilter);
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
 * /procurements/approve:
 *   options:
 *     summary: CORS support
 *     description: Enable CORS by returning correct headers
 *     operationId: optionsApproveProcument
 *     tags:
 *       - procurements
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
 *     summary: Change the marketplace entititlement approval status based off request parameters
 *     description: Returns a response indicating if successful
 *     operationId: approveProcurement
 *     parameters:
 *     - in: header
 *       name: x-gcp-project-id
 *       type: string
 *       required: true
 *     - in: body
 *       name: payload
 *       schema:
 *          type: object
 *          properties:
 *            name:
 *              description: Entitlement name to provide action
 *            status:
 *              description: New approval status
 *            reason:
 *              description: Free form text string explaining the approval reason
 *     tags:
 *       - procurements
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Procurement list
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
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
 */
procurements.post('/procurements/approve', async (req, res) => {
    const projectId = req.header('x-gcp-project-id');
    const name = req.body.name;
    const status = req.body.status;
    const reason = req.body.reason;
    const data = await dataManager.approveEntitlement(projectId, name, status, reason);
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
 * /procurements:myProducts:
 *   options:
 *     summary: CORS support
 *     description: Enable CORS by returning correct headers
 *     operationId: optionsRedirectMyProducts
 *     tags:
 *       - procurements
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
 *     summary: Performs redirect to the Datashare My Products UI page.
 *     description: Returns a 301 redirect response
 *     operationId: redirectMyProducts
 *     security: [] # no security for get as not token is passed along with marketplace redirect
 *     tags:
 *       - procurements
 *     responses:
 *       301:
 *         description: Redirect to My Products URL
 */
// Backwards compatibility for marketplace
procurements.get('/procurements:myProducts', productsRedirectionHandler);

/**
 * @param  {} req
 * @param  {} res
 */
async function productsRedirectionHandler(req, res) {
    const currentProjectId = await runtimeConfig.getCurrentProjectId();
    let projectId = req.params.projectId || currentProjectId;

    // Check if override for projectId is set
    const p = req.query.projectId;
    if (p) {
        projectId = p;
    }

    res.redirect(cfg.uiBaseUrl + `/myProducts?projectId=${projectId}`);
}

module.exports = procurements;
