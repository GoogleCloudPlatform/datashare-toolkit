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

const { BigQueryUtil } = require('cds-shared');
let bigqueryUtil = new BigQueryUtil();
const cfg = require('../lib/config');
const jwksClient = require('jwks-rsa');
const ms = require('ms');

const client = jwksClient({
  cache: true, // Default Value
  cacheMaxEntries: 5, // Default value
  cacheMaxAge: ms('10m'), // Default value
  rateLimit: true,
  jwksRequestsPerMinute: 10, // Default value
  jwksUri: cfg.procurementJwksUri
});

/**
 * @param  {string} projectId
 * @param  {string} datasetId
 * @param  {string} tableId
 * Get the FQDN format for a project's table or view name
 */
function getTableFqdn(projectId, datasetId, tableId) {
    return `${projectId}.${datasetId}.${tableId}`;
}

/**
 * @param  {string} projectId
 * Get a list of Procurements
 */
async function listProcurements(projectId) {
    const table = getTableFqdn(projectId, cfg.cdsDatasetId, cfg.cdsProcurementViewId);
    const fields = Array.from(cfg.cdsProcurementViewFields).join();
    const options = {
        query: `SELECT ${fields} FROM \`${table}\``
    }
    const [rows] = await bigqueryUtil.executeQuery(options);
    return { success: true, data: rows };
}

/**
 * @param  {} projectId
 * @param  {} solutionId
 * @param  {} token
 */
async function activate(projectId, solutionId, token) {
    // https://cloud.google.com/marketplace/docs/partners/integrated-saas/frontend-integration#verify-jwt
    const jwt = require('jsonwebtoken');

    /*
        1. Verify that the JWT signature is using the public key from Google.
        2. Verify that the JWT has not expired, by checking the exp claim.
        3. Verify that aud claim is the correct domain for your solution.
        4. Verify that the iss claim is https://www.googleapis.com/robot/v1/metadata/x509/cloud-commerce-partner@system.gserviceaccount.com
        5. Verify that sub is not empty.
    */

    const options = {
        algorithms: ['RS256'],

        // TODO: Should be passed in dynamically from solution configuration.
        audience: 'storage.cloud.google.com',

        issuer: cfg.procurementIssuer,
        ignoreExpiration: false,
        complete: true
    };

    // Get the kid value
    const decoded = jwt.decode(token, options);
    // kid indicates the key ID that was used to secure the JWT. Use the key ID to 
    // look up the key from the JSON object in the iss attribute in the payload.
    const kid = decoded.header.kid;
    console.log(`jwt kid: ${kid}`);

    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
        client.getSigningKey(kid, (err, key) => {
            if (!err) {
                const signingKey = key.getPublicKey();
                try {
                    const result = jwt.verify(token, signingKey, options);
                    console.log(result);
                    resolve({ success: true, code: 200 });
                } catch (err) {
                    resolve({ success: false, code: 401, errors: [err] });
                }
            } else {
                resolve({ success: false, code: 500, errors: [err] });
            }
        });
    });

    // Response write out for 302 redirect if valid JWT, otherwise 302 redirect to invalid request page
    // Record sub in the db table with the incoming accountId
    // If we have to pass any data back to the UI, use a session-based cookie
}

module.exports = {
    listProcurements,
    activate
};
