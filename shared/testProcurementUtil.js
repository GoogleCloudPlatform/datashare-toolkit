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

const CommerceProcurementUtil = require('./commerceProcurementUtil');
let commerceProcurementUtil = new CommerceProcurementUtil();
const uuidv4 = require('uuid/v4');


async function listAccounts (projectId) {
    try {
        const procurementUtil = new CommerceProcurementUtil(projectId);
        const accounts = await procurementUtil.listAccounts();
        return { success: true, data: accounts }
    } catch (err) {
        return { success: false, errors: ['Failed to retrieve accounts'] };
    }
}

async function listEntitlements (projectId) {
    try {
        const procurementUtil = new CommerceProcurementUtil(projectId);
        const entitlements = await procurementUtil.listEntitlements();
        return { success: true, data: entitlements }
    } catch (err) {
        return { success: false, errors: ['Failed to retrieve entitlements'] };
    }
}

console.log('Starting');
listAccounts('cds-demo-2')
    .then((res) => {
        console.log(JSON.stringify(res));
        console.log('Finished');
    }).catch(console.error);
listEntitlements('cds-demo-2')
    .then((res) => {
        console.log(JSON.stringify(res));
        console.log('Finished');
    }).catch(console.error);
