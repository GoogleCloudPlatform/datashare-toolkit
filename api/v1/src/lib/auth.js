/**
 * Copyright 2021-2022 Google LLC
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
const { CommonUtil } = require('cds-shared');
const commonUtil = CommonUtil;

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
 * @param  {} path
 */
function isExcludedPath(path) {
    if (path.startsWith('/welcome')) {
        return true;
    }
    else if (path.startsWith('/docs/')) {
        return true;
    }
    else if (path === '/accounts:register') {
        return true;
    }
    else if (path === '/procurements:myProducts') {
        return true;
    }
    return false;
}

/**
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
async function isAuthenticated(req, res, next) {
    console.debug(`Request path isAuthenticated: ${req.path}`);

    if (isExcludedPath(req.path) === true) {
        return next();
    }

    let authorization;
    // 'X-Forwarded-Authorization' takes precedence over 'Authorization'
    for (let name of ['X-Forwarded-Authorization', 'Authorization']) {
        if (req.header(name) !== undefined) {
            authorization = req.header(name);
            break;
        }
    }

    if (!authorization) {
        return res.status(401).send({ message: 'Unauthorized' });
    }

    if (!authorization.startsWith('Bearer')) {
        return res.status(401).send({ message: 'Unauthorized' });
    }

    const split = authorization.split('Bearer ')
    if (split.length !== 2) {
        return res.status(401).send({ message: 'Unauthorized' });
    }

    const token = split[1];

    try {
        const decodedToken = await fbAdmin.auth().tenantManager().authForTenant(config.tenantId).verifyIdToken(token);
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
    if (isExcludedPath(req.path) === true) {
        return next();
    }

    const adminRole = 'admin';
    const forceTokenRefreshHeader = 'x-gcp-needs-token-refresh';
    const { role, email, uid } = res.locals;

    let isProducer = false;
    if (config.dataProducers) {
        for (const p of config.dataProducers) {
            if (p.toLowerCase() === email.toLowerCase()) {
                isProducer = true;
                break;
            }
            else if (p.includes('*') || p.includes('?')) {
                if (commonUtil.wildTest(p.toLowerCase(), email.toLowerCase())) {
                    isProducer = true;
                    break;
                }
            }
        }
    }

    if (isProducer === true) {
        if (role !== adminRole) {
            console.debug(`User ${uid} is an admin, updating claims to be admin`);
            await fbAdmin.auth().tenantManager().authForTenant(config.tenantId).setCustomUserClaims(uid, { role: adminRole }).then(() => {
                console.debug(`claims set for user ${uid}`);
            }).catch(err => {
                console.error(`${err.code} -  ${err.message}`);
                return res.status(401).send({ message: 'Unauthorized' });
            });
            res.set(forceTokenRefreshHeader, true);
        }
        res.locals.role = adminRole;
    } else {
        const consumerRole = 'consumer';
        if (role === adminRole) {
            console.debug(`User ${uid} is no longer an admin, updating claims to remove admin`);
            await fbAdmin.auth().tenantManager().authForTenant(config.tenantId).setCustomUserClaims(uid, { role: consumerRole });
            res.set(forceTokenRefreshHeader, true);
        }
        res.locals.role = consumerRole;
    }
    // console.debug(`User ${uid} claims are up-to-date`);
    next();
}

async function authzCheck(req, res, next) {
    if (isExcludedPath(req.path) === true) {
        return next();
    }

    const { uid, role } = res.locals;
    const consumerAccess = {
        'GET': [
            '/products',
            '/resources/configuration',
            '/resources/dashboard',
            '/resources/projects',
            '/accounts:activate',
            '/procurements:myProducts',
            '/procurements:myProducts?*'
        ],
        'POST': [
            '/accounts:activate',
            '/accounts:register',
            '/accounts:register?*',
            '/procurements:myProducts',
            '/procurements:myProducts?*'
        ]
    }

    if (role === 'admin') {
        console.debug(`Access granted for admin account '${uid}' authorization check for method '${req.method}' and path '${req.path}'`);
        return next();
    } else if (role === 'consumer') {
        if (req.method in consumerAccess) {
            const available = consumerAccess[req.method];
            const found = available.some(i => {
                if (i.endsWith('*')) {
                    return req.path.startsWith(i.slice(0, -1));
                } else {
                    return i === req.path
                }
            });
            if (found === true) {
                console.debug(`Access granted for consumer account '${uid}' authorization check for method '${req.method}' and path '${req.path}'`);
                return next();
            }
        }
    }
    console.warn(`Access denied for account '${uid}' authorization check for method '${req.method}' and path '${req.path}'`);
    return res.status(401).send({ message: 'Unauthorized' });
}

module.exports = {
    verifyProject,
    isAuthenticated,
    setCustomUserClaims,
    authzCheck
};