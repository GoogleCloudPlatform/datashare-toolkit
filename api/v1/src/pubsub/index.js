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
 *   PubSubTopic:
 *     type: object
 *     description: PubSub Topic object
 *     properties:
 *       topicId:
 *         type: string
 *         description: Topic ID
 *       topicName:
 *         type: string
 *         description: Topic Name
 *
 */

/**
 * @swagger
 *
 * /pubsub/topics:
 *   options:
 *     summary: CORS support
 *     description: Enable CORS by returning correct headers
 *     operationId: optionsPubSubTopics
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
 *     summary: List PubSub Topics based
 *     description: Returns the PubSub Topic response
 *     operationId: listPubSubTopics
 *     tags:
 *       - pubsub
 *     parameters:
 *     - in: header
 *       name: x-gcp-project-id
 *       type: string
 *       required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: PubSub Topic Response
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
 *                  $ref: '#/definitions/PubSubTopic'
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.get('/pubsub/topics', async (req, res) => {
    const projectId = req.header('x-gcp-project-id');
    const data = await dataManager.listTopics(projectId);
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
 * /pubsub/topics:
 *   post:
 *     summary: Create PubSub Topic based off PubSubTopic Object
 *     description: Returns the PubSub Topic response
 *     operationId: createPubSubTopic
 *     tags:
 *       - pubsub
 *     parameters:
 *     - in: header
 *       name: x-gcp-project-id
 *       type: string
 *       required: true
 *     - in: body
 *       name: pubsubtopic
 *       description: Request parameters for PubSub Topic
 *       schema:
 *         type: object
 *         properties:
 *           name:
 *             type: string
 *             description: PubSub Topic Name
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: PubSub Topic Response
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
 *                  $ref: '#/definitions/PubSubTopic'
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.post('/pubsub/topics', async(req, res) => {
    const projectId = req.header('x-gcp-project-id');
    const name = req.body.name;
    if (!name) {
        return res.status(400).json({
            success: false,
            code: 400,
            errors: ['topic name parameter is required']
        });
    }
    const data = await dataManager.createTopic(projectId, name);
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
 * /pubsub/topics/{name}:
 *   options:
 *     summary: CORS support
 *     description: Enable CORS by returning correct headers
 *     operationId: optionsDeletePubSubTopicByName
 *     security: [] # no security for preflight requests
 *     parameters:
 *     - in: path
 *       name: name
 *       type: string
 *       required: true
 *       description: PubSub Topic Name of the request
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
 *     summary: Delete PubSub Topic based off PubSub Topic Name
 *     description: Returns the PubSub Topic response
 *     operationId: deletePubSubTopicByName
 *     tags:
 *       - pubsub
 *     parameters:
 *     - in: path
 *       name: name
 *       type: string
 *       required: true
 *       description: PubSub Topic Name of the request
 *     - in: header
 *       name: x-gcp-project-id
 *       type: string
 *       required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: PubSub Topic Response
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
 *                  $ref: '#/definitions/PubSubTopic'
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.delete('/pubsub/topics/:name', async(req, res) => {
    const projectId = req.header('x-gcp-project-id');
    const name = req.params.name;
    const data = await dataManager.deleteTopic(projectId, name);
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
