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

async function getAccount(projectId, name) {
    try {
        const procurementUtil = new CommerceProcurementUtil(projectId);
        const account = await procurementUtil.getAccount(name);
        return { success: true, data: account };
    } catch (err) {
        return { success: false, errors: ['Failed to retrieve account'] };
    }
}

async function approveAccount(projectId, name, approvalName, reason) {
    try {
        const procurementUtil = new CommerceProcurementUtil(projectId);
        const approval = await procurementUtil.approveAccount(name, approvalName, reason);
        return { success: true, data: approval };
    } catch (err) {
        return { success: false, errors: ['Failed to approve account'] };
    }
}

async function listAccounts(projectId) {
    try {
        const procurementUtil = new CommerceProcurementUtil(projectId);
        const accounts = await procurementUtil.listAccounts();
        return { success: true, data: accounts };
    } catch (err) {
        return { success: false, errors: ['Failed to retrieve accounts'] };
    }
}

async function getEntitlement(projectId, name) {
    try {
        const procurementUtil = new CommerceProcurementUtil(projectId);
        const entitlement = await procurementUtil.getEntitlement(name);
        return { success: true, data: entitlement };
    } catch (err) {
        return { success: false, errors: ['Failed to retrieve entitlement'] };
    }
}

async function updateEntitlementMessage(projectId, name, message) {
    try {
        const procurementUtil = new CommerceProcurementUtil(projectId);
        const entitlement = await procurementUtil.updateEntitlementMessage(name, message);
        return { success: true, data: entitlement };
    } catch (err) {
        return { success: false, errors: ['Failed to update entitlement'] };
    }
}

async function listEntitlements(projectId) {
    try {
        const procurementUtil = new CommerceProcurementUtil(projectId);
        const entitlements = await procurementUtil.listEntitlements();
        return { success: true, data: entitlements };
    } catch (err) {
        return { success: false, errors: ['Failed to retrieve entitlements'] };
    }
}

console.log('Starting');

getEntitlement('cds-demo-2', 'providers/cds-demo-2/entitlements/84b05068-01a9-4ca9-9943-b9babf0b5030')
    .then((res) => {
        console.log(`getEntitlement:\n${JSON.stringify(res, null, 3)}`);
        return true;
    }).catch(console.error);

updateEntitlementMessage('cds-demo-2', 'providers/cds-demo-2/entitlements/84b05068-01a9-4ca9-9943-b9babf0b5030', 'test message')
    .then((res) => {
        console.log(`updateEntitlementMessage:\n${JSON.stringify(res, null, 3)}`);
        return true;
    }).catch(console.error);

listAccounts('cds-demo-2')
    .then((res) => {
        console.log(`listAccounts:\n${JSON.stringify(res, null, 3)}`);
        return true;
    }).catch(console.error);

listEntitlements('cds-demo-2')
    .then((res) => {
        console.log(`listEntitlements:\n${JSON.stringify(res, null, 3)}`);
        return true;
    }).catch(console.error);

getAccount('cds-demo-2', 'providers/cds-demo-2/accounts/E-FEA0-5C23-1B4F-9E5D')
    .then((res) => {
        console.log(`getAccount:\n${JSON.stringify(res, null, 3)}`);
        return true;
    }).catch(console.error);

approveAccount('cds-demo-2', 'providers/cds-demo-2/accounts/E-FEA0-5C23-1B4F-9E5D', 'signup', 'test reason')
    .then((res) => {
        console.log(`approveAccount:\n${JSON.stringify(res, null, 3)}`);
        return true;
    }).catch(console.error);