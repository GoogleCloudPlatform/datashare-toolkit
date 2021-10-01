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

/************************************************************
  API Endpoints
 ************************************************************/
// Define the routes for the REST API
var router = express.Router();
// methods that require multiple routes

/**
 * @swagger
 *
 *
 * definitions:
 *   StorageBucket:
 *     type: object
 *     description: Storage Bucket object
 *     properties:
 *       bucketId:
 *         type: string
 *         description: Bucket ID
 *       bucketName:
 *         type: string
 *         description: Bucket Name
 *
 */

/**
 * @swagger
 *
 * /storage/buckets:
 *   options:
 *     summary: CORS support
 *     description: Enable CORS by returning correct headers
 *     operationId: optionsStorageBuckets
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
 *     summary: List Storage Buckets based
 *     description: Returns the Storage Bucket response
 *     operationId: listStorageBuckets
 *     tags:
 *       - storage
 *     parameters:
 *     - in: header
 *       name: x-gcp-project-id
 *       type: string
 *       required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Storage Bucket Response
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
 *                  $ref: '#/definitions/StorageBucket'
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.get('/storage/buckets', async (req, res) => {
    const projectId = req.header('x-gcp-project-id');
    const data = await dataManager.listBuckets(projectId);
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
 * /storage/buckets:
 *   post:
 *     summary: Create Storage Bucket based off StorageBucket Object
 *     description: Returns the Storage Bucket response
 *     operationId: createStorageBucket
 *     tags:
 *       - storage
 *     parameters:
 *     - in: header
 *       name: x-gcp-project-id
 *       type: string
 *       required: true
 *     - in: body
 *       name: storagebuckets
 *       description: Request parameters for Storage Bucket
 *       schema:
 *         type: object
 *         properties:
 *           name:
 *             type: string
 *             description: Storage Bucket Name
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: Storage Bucket Response
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
 *                  $ref: '#/definitions/StorageBucket'
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.post('/storage/buckets', async(req, res) => {
    const projectId = req.header('x-gcp-project-id');
    const name = req.body.name;

    if (!name) {
        return res.status(400).json({
            success: false,
            code: 400,
            errors: ['bucket name parameter is required']
        });
    }
    const data = await dataManager.createBucket(projectId, name);
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
 * /storage/buckets/{name}:
 *   options:
 *     summary: CORS support
 *     description: Enable CORS by returning correct headers
 *     operationId: optionsDeleteStorageBucketByName
 *     security: [] # no security for preflight requests
 *     parameters:
 *     - in: path
 *       name: name
 *       type: string
 *       required: true
 *       description: Storage Bucket Name of the request
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
 *   delete:
 *     summary: Delete Storage Bucket based off Storage Bucket Name
 *     description: Returns the Storage Bucket response
 *     operationId: deleteStorageBucketByName
 *     tags:
 *       - storage
 *     parameters:
 *     - in: path
 *       name: name
 *       type: string
 *       required: true
 *       description: Storage Bucket Name of the request
 *     - in: header
 *       name: x-gcp-project-id
 *       type: string
 *       required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Storage Bucket Response
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
 *                  $ref: '#/definitions/StorageBucket'
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.delete('/storage/buckets/:name', async(req, res) => {
    const projectId = req.header('x-gcp-project-id');
    const name = req.params.name;
    const data = await dataManager.deleteBucket(projectId, name);
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

module.exports = router;
