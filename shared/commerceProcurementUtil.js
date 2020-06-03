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
const { google } = require('googleapis');
const Cloudcommerceprocurement = google.cloudcommerceprocurement('v1');

// Cloud Commerce Procurement Utility
class CommerceProcurementUtil {
    constructor(projectId) {
        this.projectId = projectId;
        const options = {};
        if (projectId) {
            options.projectId = projectId;
        }
        //this.procurementClient = new Cloudcommerceprocuement(options);
        this.procurementClient = Cloudcommerceprocurement;

        this.auth = new google.auth.GoogleAuth({
            scopes: 'https://www.googleapis.com/auth/cloud-platform'
        });
    }

    get VERBOSE_MODE() {
        return process.env.VERBOSE_MODE;
    }

    // dynamically generate the accountName
    getAccountName(projectId, accountId) {
        return `providers/${projectId}/accounts/${accountId}`;
    }

    // dynamically generate the providerName
    getProviderName(projectId) {
        return `providers/${projectId}`;
    }

    /**
     * list Accounts for the provider
     */
    async listAccounts() {
        const authClient = await this.auth.getClient();
        try {
            const res = await this.procurementClient.providers.accounts.list({
                auth: authClient,
                // The maximum number of entries that are requested. Default size is 200.
                //pageSize: 'placeholder-value',
                // The token for fetching the next page.
                //pageToken: 'placeholder-value',
                // The parent resource name.
                parent: this.getProviderName(this.projectId)
            });
            if (this.VERBOSE_MODE) {
                console.log(res.data);
            }
            return res.data;
        } catch (err) {
            if (this.VERBOSE_MODE) {
                console.warn(err);
            }
		    throw err;
        }
    }

    /**
     * list Entitlements for the provider
     */
    async listEntitlements() {
        const authClient = await this.auth.getClient();
        try {
            const res = await this.procurementClient.providers.entitlements.list({
                auth: authClient,
                // The maximum number of entries that are requested. Default size is 200.
                //pageSize: 'placeholder-value',
                // The token for fetching the next page.
                //pageToken: 'placeholder-value',
                // The parent resource name.
                parent: this.getProviderName(this.projectId)
            });
            if (this.VERBOSE_MODE) {
                console.log(res.data);
            }
            return res.data;
        } catch (err) {
            if (this.VERBOSE_MODE) {
                console.warn(err);
            }
		    throw err;
        }
    }
}

module.exports = CommerceProcurementUtil;
