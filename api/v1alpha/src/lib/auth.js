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

const runtimeConfig = require('../lib/runtimeConfig');

const verifyProject = async (req, res, next) => {
    const projectId = req.header('x-gcp-project-id');
    const currentProjectId = await runtimeConfig.getCurrentProjectId();
    if (projectId) {
        const managedProjects = await runtimeConfig.getManagedProjects();
        const isDefined = managedProjects != null && managedProjects.length > 0;
        if (isDefined === true && !managedProjects.includes(projectId)) {
            console.warn(`Invalid unmanaged project called: ${projectId}`);
            return res
                .status(401)
                .send({ error: 'You are not authorized to make this project request' });
        } else if (isDefined === false && projectId !== currentProjectId) {
            console.warn(`Invalid project called: ${projectId}, currentProjectId: ${currentProjectId}`);
            return res
                .status(401)
                .send({ error: 'You are not authorized to make this project request' });
        }
    }
    return next();
};

module.exports = {
    verifyProject: verifyProject
};