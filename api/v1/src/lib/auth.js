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
const fbAdmin = require('firebase-admin');
const config = require('./config');

async function verifyProject(req, res, next) {
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
}

/**
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
async function isAuthenticated(req, res, next) {
    // console.log(req.path);
    // console.log(req.method);
    const { authorization } = req.headers

    if (!authorization)
        return res.status(401).send({ message: 'Unauthorized' });

    if (!authorization.startsWith('Bearer'))
        return res.status(401).send({ message: 'Unauthorized' });

    const split = authorization.split('Bearer ')
    if (split.length !== 2)
        return res.status(401).send({ message: 'Unauthorized' });

    const token = split[1]

    try {
        const decodedToken = await fbAdmin.auth().verifyIdToken(token);
        // console.debug("decodedToken", JSON.stringify(decodedToken))
        res.locals = { ...res.locals, uid: decodedToken.uid, role: decodedToken.role, email: decodedToken.email }
        return next();
    }
    catch (err) {
        console.error(`${err.code} -  ${err.message}`);
        return res.status(401).send({ message: 'Unauthorized' });
    }
}

/**
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
async function setCustomUserClaims(req, res, next) {
    const adminRole = 'admin';
    const forceTokenRefreshHeader = 'x-gcp-needs-token-refresh';
    const { role, email, uid } = res.locals;
    if (config.dataProducers.map(u => u.toLowerCase()).includes(email.toLowerCase())) {
        if (role !== adminRole) {
            console.debug(`User ${uid} is an admin, updating claims to be admin`);
            await fbAdmin.auth().setCustomUserClaims(uid, { role: adminRole }).then(() => {
                console.debug(`claims set for user ${uid}`);
            }).catch(err => {
                console.error(`${err.code} -  ${err.message}`);
                return res.status(401).send({ message: 'Unauthorized' });
            });
            res.set(forceTokenRefreshHeader, true);
            next();
            return;
        }
    } else {
        if (role === adminRole) {
            console.debug(`User ${uid} is no longer an admin, updating claims to remove admin`);
            await fbAdmin.auth().setCustomUserClaims(uid, { role: 'consumer' });
            res.set(forceTokenRefreshHeader, true);
            next();
            return;
        }
    }
    // https://stackoverflow.com/questions/37897523/axios-get-access-to-response-header-fields
    // console.debug(`User ${uid} claims are up-to-date`);
    next();
}

// https://expressjs.com/en/guide/using-middleware.html
// https://www.toptal.com/firebase/role-based-firebase-authentication

// https://hightekk.com/articles/firebase-custom-claims-script
// https://firebase.google.com/docs/auth/admin/custom-claims
function isAuthorized(opts) {
    return (req, res, next) => {
        const { role, email, uid } = res.locals
        if (!role) {
            return res.status(403).send();
        }
        if (opts.hasRole.includes(role)) {
            return next();
        }
        return res.status(403).send();
    }
}

module.exports = {
    verifyProject,   
    isAuthenticated,
    setCustomUserClaims
};