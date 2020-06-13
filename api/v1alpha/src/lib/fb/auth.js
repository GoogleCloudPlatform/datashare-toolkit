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

const { admin } = require('./firebase-service');
const cfg = require('../config');

const getAuthToken = (req, res, next) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
        req.authToken = req.headers.authorization.split(' ')[1];
    } else {
        req.authToken = null;
    }
    next();
};

const checkIfAuthenticated = (req, res, next) => {
    // Ignore the docs path
    if (req.path.startsWith('/docs/')) {
        return next();
    } else if (req.path.match(/\/projects\/.+\/accounts:register/g)) {
        // Allow unauthenticated calls to the accounts:register endpoint
        console.log(`accounts:register called with headers: ${JSON.stringify(req.headers)} and body: ${JSON.stringify(req.body)}`);
        return next();
    } else if (req.path.match(/\/projects\/.+\/products/g)) {
        // Allow unauthenticated calls to the accounts:register endpoint
        console.log(`products called with headers: ${JSON.stringify(req.headers)} and body: ${JSON.stringify(req.body)}`);
        return next();
    }
    getAuthToken(req, res, async () => {
        try {
            const { authToken } = req;
            const userInfo = await admin
                .auth()
                .verifyIdToken(authToken);
            req.authId = userInfo.uid;
            
            const email = userInfo.email;
            const index = cfg.adminUsers.findIndex(element => {
                if (email.toLowerCase() === element.toLowerCase()) {
                    return true;
                }
            });

            if (index > -1) {
                return next();
            } else {
                return res
                .status(401)
                .send({ error: 'You are not authorized to make this request' });
            }
        } catch (e) {
            return res
                .status(401)
                .send({ error: 'You are not authorized to make this request' });
        }
    });
};

module.exports = {
    checkIfAuthenticated: checkIfAuthenticated
};