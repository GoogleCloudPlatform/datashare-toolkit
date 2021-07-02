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
const { Resource } = require('@google-cloud/resource-manager');
const options = {
    scopes:['https://www.googleapis.com/auth/cloud-platform']
};
const resource = new Resource(options);
const cfg = require('../lib/config');

/************************************************************
  API Endpoints
 ************************************************************/
// Define the routes for the REST API
var resources = express.Router();
// methods that require multiple routes

resources.get('/resources/projects', async (req, res) => {
    const code = 200;
    // https://cloud.google.com/resource-manager/reference/rest/v1/projects/list
    const [projects] = await resource.getProjects();
    projects.forEach(project => console.log(project.id));
    const include = cfg.managedProjects;
    const list = projects.filter(project => include.includes(project.id)).map(project => project.id);

    const data = { success: true, projects: list };
    res.status(code).json({
        code: code,
        ...data
    });
});

module.exports = resources;
