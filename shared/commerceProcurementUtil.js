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

const DISCOVERY_URL = 'https://cloudcommerceprocurement.googleapis.com/$discovery/rest';

// Cloud Commerce Procurement Utility
class CommerceProcurementUtil {
    constructor(projectId) {
        this.projectId = projectId;
        const options = {};
        if (projectId) {
            options.projectId = projectId;
        }
    }

    async getClient() {
        const auth = new google.auth.GoogleAuth({
            scopes: 'https://www.googleapis.com/auth/cloud-platform'
        });
        google.options({auth: auth});
        return google.discoverAPI(DISCOVERY_URL, {}, (err, client) => {
            if (err) {
                console.log('Error during API discovery', err);
                return undefined;
            }
            return client;
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
     * Grant an approval on Account resource
     */
    async approveAccount(name, approvalName, reason) {
        const client = await this.getClient();
        try {
            const res = await client.providers.accounts.approve({
                name: name,
                approvalName: approvalName,
                reason: reason
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
     * get Account resource
     */
    async getAccount(name) {
        console.log(name);
        const client = await this.getClient();
        try {
            const res = await client.providers.accounts.get({
                name: name
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
     * list Accounts for the provider
     */
    async listAccounts() {
        const client = await this.getClient();
        try {
            const res = await client.providers.accounts.list({
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
     * Reset and Account and cancel all associated Entitlements
     */
    async resetAccount(name) {
        const client = await this.getClient();
        try {
            const res = await client.providers.accounts.reset({
                name: name
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
     * Reject an approval on an account
     */
    async rejectAccount(name, approvalName, reason) {
        const client = await this.getClient();
        try {
            const res = await client.providers.accounts.reject({
                name: name,
                requestBody: {
                    approvalName: approvalName,
                    reason: reason
                }
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
     * approve Entitlement resource
     */
    async approveEntitlement(name) {
        const client = await this.getClient();
        try {
            const res = await client.providers.entitlements.approve({
                name: name
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
     * get Entitlement resource
     */
    async getEntitlement(name) {
        const client = await this.getClient();
        console.log(client);
        try {
            const res = await client.providers.entitlements.get({
                name: name
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
    async listEntitlements(filter) {
        const client = await this.getClient();
        try {
            const res = await client.providers.entitlements.list({
                // The maximum number of entries that are requested. Default size is 200.
                //pageSize: 'placeholder-value',
                // The token for fetching the next page.
                //pageToken: 'placeholder-value',
                // The parent resource name.
                parent: this.getProviderName(this.projectId),
                filter: filter
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
     * Updates an existing Entitlement with a message that is displayed to the end user.
     * Provider-supplied message that is displayed to the end user. Currently this is used to communicate
     * progress and ETA for provisioning. This field can be updated only when a user is waiting for an action
     * from the provider, i.e. entitlement state is EntitlementState.ENTITLEMENT_ACTIVATION_REQUESTED or
     * EntitlementState.ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL.
     */
    async updateEntitlementMessage(name, message) {
        const client = await this.getClient();
        try {
            const res = await client.providers.entitlements.patch({
                name: name,
                updateMask: 'messageToUser',
                requestBody: {
                    messageToUser: message
                }
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
     * reject Entitlement resource
     */
    async rejectEntitlement(name, reason) {
        const client = await this.getClient();
        try {
            const res = await client.providers.entitlements.reject({
                name: name,
                reason: reason
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
     * request suspension of an active Entitlement. This is not yet supported.
     */
    async suspendEntitlement(name, reason) {
        const client = await this.getClient();
        try {
            const res = await client.providers.entitlements.suspend({
                name: name,
                reason: reason
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
