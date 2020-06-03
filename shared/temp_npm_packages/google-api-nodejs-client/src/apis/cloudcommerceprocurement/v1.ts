// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-irregular-whitespace */

import {
  OAuth2Client,
  JWT,
  Compute,
  UserRefreshClient,
  GaxiosPromise,
  GoogleConfigurable,
  createAPIRequest,
  MethodOptions,
  GlobalOptions,
  BodyResponseCallback,
  APIRequestContext,
} from 'googleapis-common';

export namespace cloudcommerceprocurement_v1 {
  export interface Options extends GlobalOptions {
    version: 'v1';
  }

  interface StandardParameters {
    /**
     * V1 error format.
     */
    '$.xgafv'?: string;
    /**
     * OAuth access token.
     */
    access_token?: string;
    /**
     * Data format for response.
     */
    alt?: string;
    /**
     * JSONP
     */
    callback?: string;
    /**
     * Selector specifying which fields to include in a partial response.
     */
    fields?: string;
    /**
     * API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token.
     */
    key?: string;
    /**
     * OAuth 2.0 token for the current user.
     */
    oauth_token?: string;
    /**
     * Returns response with indentations and line breaks.
     */
    prettyPrint?: boolean;
    /**
     * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
     */
    quotaUser?: string;
    /**
     * Legacy upload protocol for media (e.g. "media", "multipart").
     */
    uploadType?: string;
    /**
     * Upload protocol for media (e.g. "raw", "multipart").
     */
    upload_protocol?: string;
  }

  /**
   * Cloud Commerce Partner Procurement API
   *
   * Partner API for the Cloud Commerce Procurement Service.
   *
   * @example
   * const {google} = require('googleapis');
   * const cloudcommerceprocurement = google.cloudcommerceprocurement('v1');
   *
   * @namespace cloudcommerceprocurement
   * @type {Function}
   * @version v1
   * @variation v1
   * @param {object=} options Options for Cloudcommerceprocurement
   */
  export class Cloudcommerceprocurement {
    context: APIRequestContext;
    providers: Resource$Providers;

    constructor(options: GlobalOptions, google?: GoogleConfigurable) {
      this.context = {
        _options: options || {},
        google,
      };

      this.providers = new Resource$Providers(this.context);
    }
  }

  /**
   * Represents an account that was established by the customer on the service provider&#39;s system.
   */
  export interface Schema$Account {
    /**
     * Output only. The approvals for this account. These approvals are used to track actions that are permitted or have been completed by a customer within the context of the provider. This might include a sign up flow or a provisioning step, for example, that the provider can admit to having happened.
     */
    approvals?: Schema$Approval[];
    /**
     * Output only. The creation timestamp.
     */
    createTime?: string | null;
    /**
     * Output only. The custom properties that were collected from the user to create this account.
     */
    inputProperties?: {[key: string]: any} | null;
    /**
     * Output only. The resource name of the account. Account names have the form `accounts/{account_id}`.
     */
    name?: string | null;
    /**
     * Output only. The identifier of the service provider that this account was created against. Each service provider is assigned a unique provider value when they onboard with Cloud Commerce platform.
     */
    provider?: string | null;
    /**
     * Output only. The state of the account. This is used to decide whether the customer is in good standing with the provider and is able to make purchases. An account might not be able to make a purchase if the billing account is suspended, for example.
     */
    state?: string | null;
    /**
     * Output only. The last update timestamp.
     */
    updateTime?: string | null;
  }
  /**
   * An approval for some action on an account.
   */
  export interface Schema$Approval {
    /**
     * Output only. The name of the approval.
     */
    name?: string | null;
    /**
     * Output only. An explanation for the state of the approval.
     */
    reason?: string | null;
    /**
     * Output only. The state of the approval.
     */
    state?: string | null;
    /**
     * Optional. The last update timestamp of the approval.
     */
    updateTime?: string | null;
  }
  /**
   * Request message for PartnerProcurementService.ApproveAccount.
   */
  export interface Schema$ApproveAccountRequest {
    /**
     * The name of the approval being approved. If absent and there is only one approval possible, that approval will be granted. If absent and there are many approvals possible, the request will fail with a 400 Bad Request. Optional.
     */
    approvalName?: string | null;
    /**
     * Set of properties that should be associated with the account. Optional.
     */
    properties?: {[key: string]: string} | null;
    /**
     * Free form text string explaining the approval reason. Optional.  Max allowed length: 256 bytes. Longer strings will be truncated.
     */
    reason?: string | null;
  }
  /**
   * Request message for [PartnerProcurementService.ApproveEntitlementPlanChange[].
   */
  export interface Schema$ApproveEntitlementPlanChangeRequest {
    /**
     * Name of the pending plan that is being approved. Required.
     */
    pendingPlanName?: string | null;
  }
  /**
   * Request message for [PartnerProcurementService.ApproveEntitlement[].
   */
  export interface Schema$ApproveEntitlementRequest {
    /**
     * Set of properties that should be associated with the entitlement. Optional.
     */
    properties?: {[key: string]: string} | null;
  }
  /**
   * A resource using (consuming) this entitlement.
   */
  export interface Schema$Consumer {
    /**
     * A project name with format `projects/&lt;project number&gt;`.
     */
    project?: string | null;
  }
  /**
   * A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance:      service Foo {       rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty);     }  The JSON representation for `Empty` is empty JSON object `{}`.
   */
  export interface Schema$Empty {}
  /**
   * Represents a procured product of a customer. Next Id: 17
   */
  export interface Schema$Entitlement {
    /**
     * Output only. The resource name of the account that this entitlement is based on, if any.
     */
    account?: string | null;
    /**
     * Output only. The resources using this entitlement, if applicable.
     */
    consumers?: Schema$Consumer[];
    /**
     * Output only. The creation timestamp.
     */
    createTime?: string | null;
    /**
     * Output only. The custom properties that were collected from the user to create this entitlement.
     */
    inputProperties?: {[key: string]: any} | null;
    /**
     * Provider-supplied message that is displayed to the end user. Currently this is used to communicate progress and ETA for provisioning. This field can be updated only when a user is waiting for an action from the provider, i.e. entitlement state is EntitlementState.ENTITLEMENT_ACTIVATION_REQUESTED or EntitlementState.ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL.  This field is cleared automatically when the entitlement state changes.
     */
    messageToUser?: string | null;
    /**
     * Output only. The resource name of the entitlement. Entitlement names have the form `entitlements/{entitlement_id}`.
     */
    name?: string | null;
    /**
     * Output only. The identifier of the pending new plan. Required if the product has plans and the entitlement has a pending plan change.
     */
    newPendingPlan?: string | null;
    /**
     * Output only. The identifier of the plan that was procured. Required if the product has plans.
     */
    plan?: string | null;
    /**
     * Output only. The identifier of the entity that was purchased. This may actually represent a product or a quote.
     */
    product?: string | null;
    /**
     * Output only. The identifier of the product that was procured.
     */
    productExternalName?: string | null;
    /**
     * Output only. The identifier of the service provider that this entitlement was created against. Each service provider is assigned a unique provider value when they onboard with Cloud Commerce platform.
     */
    provider?: string | null;
    /**
     * Output only. The identifier of the quote that was used to procure. Empty if the order is not purchased using a quote.
     */
    quoteExternalName?: string | null;
    /**
     * Output only. The state of the entitlement.
     */
    state?: string | null;
    /**
     * Output only. End time for the subscription corresponding to this entitlement.
     */
    subscriptionEndTime?: string | null;
    /**
     * Output only. The last update timestamp.
     */
    updateTime?: string | null;
    /**
     * Output only. The consumerId to use when reporting usage through the Service Control API. See the consumerId field at [Reporting Metrics](https://cloud.google.com/service-control/reporting-metrics) for more details.  This field is present only if the product has usage-based billing configured.
     */
    usageReportingId?: string | null;
  }
  /**
   * Response message for [PartnerProcurementService.ListAccounts[].
   */
  export interface Schema$ListAccountsResponse {
    /**
     * The list of accounts in this response.
     */
    accounts?: Schema$Account[];
    /**
     * The token for fetching the next page.
     */
    nextPageToken?: string | null;
  }
  /**
   * Response message for PartnerProcurementService.ListEntitlements.
   */
  export interface Schema$ListEntitlementsResponse {
    /**
     * The list of entitlements in this response.
     */
    entitlements?: Schema$Entitlement[];
    /**
     * The token for fetching the next page.
     */
    nextPageToken?: string | null;
  }
  /**
   * Request message for PartnerProcurementService.RejectAccount.
   */
  export interface Schema$RejectAccountRequest {
    /**
     * The name of the approval being rejected. If absent and there is only one approval possible, that approval will be rejected. If absent and there are many approvals possible, the request will fail with a 400 Bad Request. Optional.
     */
    approvalName?: string | null;
    /**
     * Free form text string explaining the rejection reason.  Max allowed length: 256 bytes. Longer strings will be truncated.
     */
    reason?: string | null;
  }
  /**
   * Request message for PartnerProcurementService.RejectEntitlementPlanChange.
   */
  export interface Schema$RejectEntitlementPlanChangeRequest {
    /**
     * Name of the pending plan that is being rejected. Required.
     */
    pendingPlanName?: string | null;
    /**
     * Free form text string explaining the rejection reason.  Max allowed length: 256 bytes. Longer strings will be truncated.
     */
    reason?: string | null;
  }
  /**
   * Request message for PartnerProcurementService.RejectEntitlement.
   */
  export interface Schema$RejectEntitlementRequest {
    /**
     * Free form text string explaining the rejection reason.  Max allowed length: 256 bytes. Longer strings will be truncated.
     */
    reason?: string | null;
  }
  /**
   * Request message for for PartnerProcurementService.ResetAccount.
   */
  export interface Schema$ResetAccountRequest {}
  /**
   * Request message for ParterProcurementService.SuspendEntitlement. This is not yet supported.
   */
  export interface Schema$SuspendEntitlementRequest {
    /**
     * A free-form reason string, explaining the reason for suspension request.
     */
    reason?: string | null;
  }

  export class Resource$Providers {
    context: APIRequestContext;
    accounts: Resource$Providers$Accounts;
    entitlements: Resource$Providers$Entitlements;
    constructor(context: APIRequestContext) {
      this.context = context;
      this.accounts = new Resource$Providers$Accounts(this.context);
      this.entitlements = new Resource$Providers$Entitlements(this.context);
    }
  }

  export class Resource$Providers$Accounts {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * cloudcommerceprocurement.providers.accounts.approve
     * @desc Grant an approval on an Account.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/cloudcommerceprocurement.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const cloudcommerceprocurement = google.cloudcommerceprocurement('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/cloud-platform'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await cloudcommerceprocurement.providers.accounts.approve({
     *     // The resource name of the account.
     *     // Required.
     *     name: 'providers/my-provider/accounts/my-account',
     *
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {
     *       //   "approvalName": "my_approvalName",
     *       //   "reason": "my_reason",
     *       //   "properties": {}
     *       // }
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {}
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias cloudcommerceprocurement.providers.accounts.approve
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.name The resource name of the account. Required.
     * @param {().ApproveAccountRequest} params.requestBody Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    approve(
      params?: Params$Resource$Providers$Accounts$Approve,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Empty>;
    approve(
      params: Params$Resource$Providers$Accounts$Approve,
      options: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    approve(
      params: Params$Resource$Providers$Accounts$Approve,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    approve(callback: BodyResponseCallback<Schema$Empty>): void;
    approve(
      paramsOrCallback?:
        | Params$Resource$Providers$Accounts$Approve
        | BodyResponseCallback<Schema$Empty>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback?: BodyResponseCallback<Schema$Empty>
    ): void | GaxiosPromise<Schema$Empty> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Providers$Accounts$Approve;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Providers$Accounts$Approve;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://cloudcommerceprocurement.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}:approve').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'POST',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Empty>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Empty>(parameters);
      }
    }

    /**
     * cloudcommerceprocurement.providers.accounts.get
     * @desc Get a requested Account resource.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/cloudcommerceprocurement.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const cloudcommerceprocurement = google.cloudcommerceprocurement('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/cloud-platform'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await cloudcommerceprocurement.providers.accounts.get({
     *     // The name of the account to retrieve.
     *     name: 'providers/my-provider/accounts/my-account',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "name": "my_name",
     *   //   "approvals": [],
     *   //   "provider": "my_provider",
     *   //   "createTime": "my_createTime",
     *   //   "updateTime": "my_updateTime",
     *   //   "state": "my_state",
     *   //   "inputProperties": {}
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias cloudcommerceprocurement.providers.accounts.get
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.name The name of the account to retrieve.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    get(
      params?: Params$Resource$Providers$Accounts$Get,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Account>;
    get(
      params: Params$Resource$Providers$Accounts$Get,
      options: MethodOptions | BodyResponseCallback<Schema$Account>,
      callback: BodyResponseCallback<Schema$Account>
    ): void;
    get(
      params: Params$Resource$Providers$Accounts$Get,
      callback: BodyResponseCallback<Schema$Account>
    ): void;
    get(callback: BodyResponseCallback<Schema$Account>): void;
    get(
      paramsOrCallback?:
        | Params$Resource$Providers$Accounts$Get
        | BodyResponseCallback<Schema$Account>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Account>,
      callback?: BodyResponseCallback<Schema$Account>
    ): void | GaxiosPromise<Schema$Account> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Providers$Accounts$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Providers$Accounts$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://cloudcommerceprocurement.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}').replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Account>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Account>(parameters);
      }
    }

    /**
     * cloudcommerceprocurement.providers.accounts.list
     * @desc List Accounts that the provider has access to.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/cloudcommerceprocurement.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const cloudcommerceprocurement = google.cloudcommerceprocurement('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/cloud-platform'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await cloudcommerceprocurement.providers.accounts.list({
     *     // The maximum number of entries that are requested. Default size is 200.
     *     pageSize: 'placeholder-value',
     *     // The token for fetching the next page.
     *     pageToken: 'placeholder-value',
     *     // The parent resource name.
     *     parent: 'providers/my-provider',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "accounts": [],
     *   //   "nextPageToken": "my_nextPageToken"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias cloudcommerceprocurement.providers.accounts.list
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {integer=} params.pageSize The maximum number of entries that are requested. Default size is 200.
     * @param {string=} params.pageToken The token for fetching the next page.
     * @param {string} params.parent The parent resource name.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    list(
      params?: Params$Resource$Providers$Accounts$List,
      options?: MethodOptions
    ): GaxiosPromise<Schema$ListAccountsResponse>;
    list(
      params: Params$Resource$Providers$Accounts$List,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$ListAccountsResponse>,
      callback: BodyResponseCallback<Schema$ListAccountsResponse>
    ): void;
    list(
      params: Params$Resource$Providers$Accounts$List,
      callback: BodyResponseCallback<Schema$ListAccountsResponse>
    ): void;
    list(callback: BodyResponseCallback<Schema$ListAccountsResponse>): void;
    list(
      paramsOrCallback?:
        | Params$Resource$Providers$Accounts$List
        | BodyResponseCallback<Schema$ListAccountsResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$ListAccountsResponse>,
      callback?: BodyResponseCallback<Schema$ListAccountsResponse>
    ): void | GaxiosPromise<Schema$ListAccountsResponse> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Providers$Accounts$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Providers$Accounts$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://cloudcommerceprocurement.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+parent}/accounts').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['parent'],
        pathParams: ['parent'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$ListAccountsResponse>(parameters, callback);
      } else {
        return createAPIRequest<Schema$ListAccountsResponse>(parameters);
      }
    }

    /**
     * cloudcommerceprocurement.providers.accounts.reject
     * @desc Reject an approval on an Account.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/cloudcommerceprocurement.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const cloudcommerceprocurement = google.cloudcommerceprocurement('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/cloud-platform'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await cloudcommerceprocurement.providers.accounts.reject({
     *     // The resource name of the account.
     *     // Required.
     *     name: 'providers/my-provider/accounts/my-account',
     *
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {
     *       //   "approvalName": "my_approvalName",
     *       //   "reason": "my_reason"
     *       // }
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {}
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias cloudcommerceprocurement.providers.accounts.reject
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.name The resource name of the account. Required.
     * @param {().RejectAccountRequest} params.requestBody Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    reject(
      params?: Params$Resource$Providers$Accounts$Reject,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Empty>;
    reject(
      params: Params$Resource$Providers$Accounts$Reject,
      options: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    reject(
      params: Params$Resource$Providers$Accounts$Reject,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    reject(callback: BodyResponseCallback<Schema$Empty>): void;
    reject(
      paramsOrCallback?:
        | Params$Resource$Providers$Accounts$Reject
        | BodyResponseCallback<Schema$Empty>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback?: BodyResponseCallback<Schema$Empty>
    ): void | GaxiosPromise<Schema$Empty> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Providers$Accounts$Reject;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Providers$Accounts$Reject;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://cloudcommerceprocurement.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}:reject').replace(/([^:]\/)\/+/g, '$1'),
            method: 'POST',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Empty>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Empty>(parameters);
      }
    }

    /**
     * cloudcommerceprocurement.providers.accounts.reset
     * @desc Reset an Account and cancel all associated Entitlements. Partner can only reset accounts they own rather than customer accounts.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/cloudcommerceprocurement.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const cloudcommerceprocurement = google.cloudcommerceprocurement('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/cloud-platform'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await cloudcommerceprocurement.providers.accounts.reset({
     *     // The resource name of the account.
     *     // Required.
     *     name: 'providers/my-provider/accounts/my-account',
     *
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {}
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {}
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias cloudcommerceprocurement.providers.accounts.reset
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.name The resource name of the account. Required.
     * @param {().ResetAccountRequest} params.requestBody Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    reset(
      params?: Params$Resource$Providers$Accounts$Reset,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Empty>;
    reset(
      params: Params$Resource$Providers$Accounts$Reset,
      options: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    reset(
      params: Params$Resource$Providers$Accounts$Reset,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    reset(callback: BodyResponseCallback<Schema$Empty>): void;
    reset(
      paramsOrCallback?:
        | Params$Resource$Providers$Accounts$Reset
        | BodyResponseCallback<Schema$Empty>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback?: BodyResponseCallback<Schema$Empty>
    ): void | GaxiosPromise<Schema$Empty> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Providers$Accounts$Reset;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Providers$Accounts$Reset;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://cloudcommerceprocurement.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}:reset').replace(/([^:]\/)\/+/g, '$1'),
            method: 'POST',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Empty>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Empty>(parameters);
      }
    }
  }

  export interface Params$Resource$Providers$Accounts$Approve
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The resource name of the account. Required.
     */
    name?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$ApproveAccountRequest;
  }
  export interface Params$Resource$Providers$Accounts$Get
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The name of the account to retrieve.
     */
    name?: string;
  }
  export interface Params$Resource$Providers$Accounts$List
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The maximum number of entries that are requested. Default size is 200.
     */
    pageSize?: number;
    /**
     * The token for fetching the next page.
     */
    pageToken?: string;
    /**
     * The parent resource name.
     */
    parent?: string;
  }
  export interface Params$Resource$Providers$Accounts$Reject
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The resource name of the account. Required.
     */
    name?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$RejectAccountRequest;
  }
  export interface Params$Resource$Providers$Accounts$Reset
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The resource name of the account. Required.
     */
    name?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$ResetAccountRequest;
  }

  export class Resource$Providers$Entitlements {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * cloudcommerceprocurement.providers.entitlements.approve
     * @desc Approve an entitlement that is in the EntitlementState.ENTITLEMENT_ACTIVATION_REQUESTED state.  This method is invoked by the provider to approve the creation of the entitlement resource.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/cloudcommerceprocurement.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const cloudcommerceprocurement = google.cloudcommerceprocurement('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/cloud-platform'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await cloudcommerceprocurement.providers.entitlements.approve({
     *     // The resource name of the entitlement.
     *     // Required.
     *     name: 'providers/my-provider/entitlements/my-entitlement',
     *
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {
     *       //   "properties": {}
     *       // }
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {}
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias cloudcommerceprocurement.providers.entitlements.approve
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.name The resource name of the entitlement. Required.
     * @param {().ApproveEntitlementRequest} params.requestBody Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    approve(
      params?: Params$Resource$Providers$Entitlements$Approve,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Empty>;
    approve(
      params: Params$Resource$Providers$Entitlements$Approve,
      options: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    approve(
      params: Params$Resource$Providers$Entitlements$Approve,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    approve(callback: BodyResponseCallback<Schema$Empty>): void;
    approve(
      paramsOrCallback?:
        | Params$Resource$Providers$Entitlements$Approve
        | BodyResponseCallback<Schema$Empty>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback?: BodyResponseCallback<Schema$Empty>
    ): void | GaxiosPromise<Schema$Empty> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Providers$Entitlements$Approve;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Providers$Entitlements$Approve;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://cloudcommerceprocurement.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}:approve').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'POST',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Empty>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Empty>(parameters);
      }
    }

    /**
     * cloudcommerceprocurement.providers.entitlements.approvePlanChange
     * @desc Approve an entitlement plan change that is in the EntitlementState.ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL state.  This method is invoked by the provider to approve the plan change on the entitlement resource.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/cloudcommerceprocurement.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const cloudcommerceprocurement = google.cloudcommerceprocurement('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/cloud-platform'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await cloudcommerceprocurement.providers.entitlements.approvePlanChange(
     *     {
     *       // The resource name of the entitlement.
     *       // Required.
     *       name: 'providers/my-provider/entitlements/my-entitlement',
     *
     *       // Request body metadata
     *       requestBody: {
     *         // request body parameters
     *         // {
     *         //   "pendingPlanName": "my_pendingPlanName"
     *         // }
     *       },
     *     }
     *   );
     *   console.log(res.data);
     *
     *   // Example response
     *   // {}
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias cloudcommerceprocurement.providers.entitlements.approvePlanChange
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.name The resource name of the entitlement. Required.
     * @param {().ApproveEntitlementPlanChangeRequest} params.requestBody Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    approvePlanChange(
      params?: Params$Resource$Providers$Entitlements$Approveplanchange,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Empty>;
    approvePlanChange(
      params: Params$Resource$Providers$Entitlements$Approveplanchange,
      options: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    approvePlanChange(
      params: Params$Resource$Providers$Entitlements$Approveplanchange,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    approvePlanChange(callback: BodyResponseCallback<Schema$Empty>): void;
    approvePlanChange(
      paramsOrCallback?:
        | Params$Resource$Providers$Entitlements$Approveplanchange
        | BodyResponseCallback<Schema$Empty>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback?: BodyResponseCallback<Schema$Empty>
    ): void | GaxiosPromise<Schema$Empty> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Providers$Entitlements$Approveplanchange;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Providers$Entitlements$Approveplanchange;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://cloudcommerceprocurement.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}:approvePlanChange').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'POST',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Empty>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Empty>(parameters);
      }
    }

    /**
     * cloudcommerceprocurement.providers.entitlements.get
     * @desc Get a requested Entitlement resource.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/cloudcommerceprocurement.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const cloudcommerceprocurement = google.cloudcommerceprocurement('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/cloud-platform'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await cloudcommerceprocurement.providers.entitlements.get({
     *     // The name of the entitlement to retrieve.
     *     name: 'providers/my-provider/entitlements/my-entitlement',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "messageToUser": "my_messageToUser",
     *   //   "quoteExternalName": "my_quoteExternalName",
     *   //   "usageReportingId": "my_usageReportingId",
     *   //   "name": "my_name",
     *   //   "plan": "my_plan",
     *   //   "createTime": "my_createTime",
     *   //   "inputProperties": {},
     *   //   "newPendingPlan": "my_newPendingPlan",
     *   //   "product": "my_product",
     *   //   "productExternalName": "my_productExternalName",
     *   //   "subscriptionEndTime": "my_subscriptionEndTime",
     *   //   "account": "my_account",
     *   //   "consumers": [],
     *   //   "provider": "my_provider",
     *   //   "updateTime": "my_updateTime",
     *   //   "state": "my_state"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias cloudcommerceprocurement.providers.entitlements.get
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.name The name of the entitlement to retrieve.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    get(
      params?: Params$Resource$Providers$Entitlements$Get,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Entitlement>;
    get(
      params: Params$Resource$Providers$Entitlements$Get,
      options: MethodOptions | BodyResponseCallback<Schema$Entitlement>,
      callback: BodyResponseCallback<Schema$Entitlement>
    ): void;
    get(
      params: Params$Resource$Providers$Entitlements$Get,
      callback: BodyResponseCallback<Schema$Entitlement>
    ): void;
    get(callback: BodyResponseCallback<Schema$Entitlement>): void;
    get(
      paramsOrCallback?:
        | Params$Resource$Providers$Entitlements$Get
        | BodyResponseCallback<Schema$Entitlement>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$Entitlement>,
      callback?: BodyResponseCallback<Schema$Entitlement>
    ): void | GaxiosPromise<Schema$Entitlement> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Providers$Entitlements$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Providers$Entitlements$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://cloudcommerceprocurement.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}').replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Entitlement>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Entitlement>(parameters);
      }
    }

    /**
     * cloudcommerceprocurement.providers.entitlements.list
     * @desc List Entitlements for which the provider has read access.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/cloudcommerceprocurement.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const cloudcommerceprocurement = google.cloudcommerceprocurement('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/cloud-platform'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await cloudcommerceprocurement.providers.entitlements.list({
     *     // The filter that can be used to limit the list request.
     *     //
     *     // The filter is a query string that can match a selected set of attributes
     *     // with string values. For example `account=E-1234-5678-ABCD-EFGH`,
     *     // `state=pending_cancellation`, and `plan!=foo-plan`. Supported
     *     // query attributes are
     *     //
     *     // * `account`
     *     // * `product_external_name`
     *     // * `quote_external_name`
     *     // * `plan`
     *     // * `newPendingPlan` or `new_pending_plan`
     *     // * `state`
     *     // * `consumers.project`
     *     //
     *     // Note that the consumers match works on repeated structures, so equality
     *     // (`consumers.project=projects/123456789`) is not supported. Set membership
     *     // can be expressed with the `:` operator. For example,
     *     // `consumers.project:projects/123456789` finds entitlements with at
     *     // least one consumer with project field equal to `projects/123456789`.
     *     //
     *     // Also note that the state name match is case-insensitive and query can omit
     *     // the prefix "ENTITLEMENT_". For example, `state=active` is equivalent to
     *     // `state=ENTITLEMENT_ACTIVE`.
     *     //
     *     // If the query contains some special characters other than letters,
     *     // underscore, or digits, the phrase must be quoted with double quotes. For
     *     // example, `product="providerId:productId"`, where the product name needs to
     *     // be quoted because it contains special character colon.
     *     //
     *     // Queries can be combined with `AND`, `OR`, and `NOT` to form more complex
     *     // queries. They can also be grouped to force a desired evaluation order.
     *     // For example, `state=active AND (account=E-1234 OR account=5678) AND NOT
     *     // (product=foo-product)`. Connective `AND` can be omitted between two
     *     // predicates. For example `account=E-1234 state=active` is equivalent to
     *     // `account=E-1234 AND state=active`.
     *     filter: 'placeholder-value',
     *     // The maximum number of entries that are requested.
     *     pageSize: 'placeholder-value',
     *     // The token for fetching the next page.
     *     pageToken: 'placeholder-value',
     *     // The parent resource name.
     *     parent: 'providers/my-provider',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "entitlements": [],
     *   //   "nextPageToken": "my_nextPageToken"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias cloudcommerceprocurement.providers.entitlements.list
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string=} params.filter The filter that can be used to limit the list request.  The filter is a query string that can match a selected set of attributes with string values. For example `account=E-1234-5678-ABCD-EFGH`, `state=pending_cancellation`, and `plan!=foo-plan`. Supported query attributes are  * `account` * `product_external_name` * `quote_external_name` * `plan` * `newPendingPlan` or `new_pending_plan` * `state` * `consumers.project`  Note that the consumers match works on repeated structures, so equality (`consumers.project=projects/123456789`) is not supported. Set membership can be expressed with the `:` operator. For example, `consumers.project:projects/123456789` finds entitlements with at least one consumer with project field equal to `projects/123456789`.  Also note that the state name match is case-insensitive and query can omit the prefix "ENTITLEMENT_". For example, `state=active` is equivalent to `state=ENTITLEMENT_ACTIVE`.  If the query contains some special characters other than letters, underscore, or digits, the phrase must be quoted with double quotes. For example, `product="providerId:productId"`, where the product name needs to be quoted because it contains special character colon.  Queries can be combined with `AND`, `OR`, and `NOT` to form more complex queries. They can also be grouped to force a desired evaluation order. For example, `state=active AND (account=E-1234 OR account=5678) AND NOT (product=foo-product)`. Connective `AND` can be omitted between two predicates. For example `account=E-1234 state=active` is equivalent to `account=E-1234 AND state=active`.
     * @param {integer=} params.pageSize The maximum number of entries that are requested.
     * @param {string=} params.pageToken The token for fetching the next page.
     * @param {string} params.parent The parent resource name.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    list(
      params?: Params$Resource$Providers$Entitlements$List,
      options?: MethodOptions
    ): GaxiosPromise<Schema$ListEntitlementsResponse>;
    list(
      params: Params$Resource$Providers$Entitlements$List,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$ListEntitlementsResponse>,
      callback: BodyResponseCallback<Schema$ListEntitlementsResponse>
    ): void;
    list(
      params: Params$Resource$Providers$Entitlements$List,
      callback: BodyResponseCallback<Schema$ListEntitlementsResponse>
    ): void;
    list(callback: BodyResponseCallback<Schema$ListEntitlementsResponse>): void;
    list(
      paramsOrCallback?:
        | Params$Resource$Providers$Entitlements$List
        | BodyResponseCallback<Schema$ListEntitlementsResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$ListEntitlementsResponse>,
      callback?: BodyResponseCallback<Schema$ListEntitlementsResponse>
    ): void | GaxiosPromise<Schema$ListEntitlementsResponse> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Providers$Entitlements$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Providers$Entitlements$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://cloudcommerceprocurement.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+parent}/entitlements').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['parent'],
        pathParams: ['parent'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$ListEntitlementsResponse>(parameters, callback);
      } else {
        return createAPIRequest<Schema$ListEntitlementsResponse>(parameters);
      }
    }

    /**
     * cloudcommerceprocurement.providers.entitlements.patch
     * @desc Updates an existing Entitlement.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/cloudcommerceprocurement.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const cloudcommerceprocurement = google.cloudcommerceprocurement('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/cloud-platform'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await cloudcommerceprocurement.providers.entitlements.patch({
     *     // The name of the entitlement to update.
     *     name: 'providers/my-provider/entitlements/my-entitlement',
     *     // The update mask that applies to the resource.
     *     // See the [FieldMask definition]
     *     // (https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask)
     *     // for more details.
     *     updateMask: 'placeholder-value',
     *
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {
     *       //   "messageToUser": "my_messageToUser",
     *       //   "quoteExternalName": "my_quoteExternalName",
     *       //   "usageReportingId": "my_usageReportingId",
     *       //   "name": "my_name",
     *       //   "plan": "my_plan",
     *       //   "createTime": "my_createTime",
     *       //   "inputProperties": {},
     *       //   "newPendingPlan": "my_newPendingPlan",
     *       //   "product": "my_product",
     *       //   "productExternalName": "my_productExternalName",
     *       //   "subscriptionEndTime": "my_subscriptionEndTime",
     *       //   "account": "my_account",
     *       //   "consumers": [],
     *       //   "provider": "my_provider",
     *       //   "updateTime": "my_updateTime",
     *       //   "state": "my_state"
     *       // }
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "messageToUser": "my_messageToUser",
     *   //   "quoteExternalName": "my_quoteExternalName",
     *   //   "usageReportingId": "my_usageReportingId",
     *   //   "name": "my_name",
     *   //   "plan": "my_plan",
     *   //   "createTime": "my_createTime",
     *   //   "inputProperties": {},
     *   //   "newPendingPlan": "my_newPendingPlan",
     *   //   "product": "my_product",
     *   //   "productExternalName": "my_productExternalName",
     *   //   "subscriptionEndTime": "my_subscriptionEndTime",
     *   //   "account": "my_account",
     *   //   "consumers": [],
     *   //   "provider": "my_provider",
     *   //   "updateTime": "my_updateTime",
     *   //   "state": "my_state"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias cloudcommerceprocurement.providers.entitlements.patch
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.name The name of the entitlement to update.
     * @param {string=} params.updateMask The update mask that applies to the resource. See the [FieldMask definition] (https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask) for more details.
     * @param {().Entitlement} params.requestBody Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    patch(
      params?: Params$Resource$Providers$Entitlements$Patch,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Entitlement>;
    patch(
      params: Params$Resource$Providers$Entitlements$Patch,
      options: MethodOptions | BodyResponseCallback<Schema$Entitlement>,
      callback: BodyResponseCallback<Schema$Entitlement>
    ): void;
    patch(
      params: Params$Resource$Providers$Entitlements$Patch,
      callback: BodyResponseCallback<Schema$Entitlement>
    ): void;
    patch(callback: BodyResponseCallback<Schema$Entitlement>): void;
    patch(
      paramsOrCallback?:
        | Params$Resource$Providers$Entitlements$Patch
        | BodyResponseCallback<Schema$Entitlement>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$Entitlement>,
      callback?: BodyResponseCallback<Schema$Entitlement>
    ): void | GaxiosPromise<Schema$Entitlement> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Providers$Entitlements$Patch;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Providers$Entitlements$Patch;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://cloudcommerceprocurement.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}').replace(/([^:]\/)\/+/g, '$1'),
            method: 'PATCH',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Entitlement>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Entitlement>(parameters);
      }
    }

    /**
     * cloudcommerceprocurement.providers.entitlements.reject
     * @desc Reject an entitlement that is in the EntitlementState.ENTITLEMENT_ACTIVATION_REQUESTED state.  This method is invoked by the provider to reject the creation of the entitlement resource.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/cloudcommerceprocurement.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const cloudcommerceprocurement = google.cloudcommerceprocurement('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/cloud-platform'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await cloudcommerceprocurement.providers.entitlements.reject({
     *     // The resource name of the entitlement.
     *     // Required.
     *     name: 'providers/my-provider/entitlements/my-entitlement',
     *
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {
     *       //   "reason": "my_reason"
     *       // }
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {}
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias cloudcommerceprocurement.providers.entitlements.reject
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.name The resource name of the entitlement. Required.
     * @param {().RejectEntitlementRequest} params.requestBody Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    reject(
      params?: Params$Resource$Providers$Entitlements$Reject,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Empty>;
    reject(
      params: Params$Resource$Providers$Entitlements$Reject,
      options: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    reject(
      params: Params$Resource$Providers$Entitlements$Reject,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    reject(callback: BodyResponseCallback<Schema$Empty>): void;
    reject(
      paramsOrCallback?:
        | Params$Resource$Providers$Entitlements$Reject
        | BodyResponseCallback<Schema$Empty>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback?: BodyResponseCallback<Schema$Empty>
    ): void | GaxiosPromise<Schema$Empty> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Providers$Entitlements$Reject;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Providers$Entitlements$Reject;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://cloudcommerceprocurement.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}:reject').replace(/([^:]\/)\/+/g, '$1'),
            method: 'POST',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Empty>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Empty>(parameters);
      }
    }

    /**
     * cloudcommerceprocurement.providers.entitlements.rejectPlanChange
     * @desc Reject an entitlement plan change that is in the EntitlementState.ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL state.  This method is invoked by the provider to reject the plan change on the entitlement resource.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/cloudcommerceprocurement.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const cloudcommerceprocurement = google.cloudcommerceprocurement('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/cloud-platform'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await cloudcommerceprocurement.providers.entitlements.rejectPlanChange(
     *     {
     *       // The resource name of the entitlement.
     *       // Required.
     *       name: 'providers/my-provider/entitlements/my-entitlement',
     *
     *       // Request body metadata
     *       requestBody: {
     *         // request body parameters
     *         // {
     *         //   "reason": "my_reason",
     *         //   "pendingPlanName": "my_pendingPlanName"
     *         // }
     *       },
     *     }
     *   );
     *   console.log(res.data);
     *
     *   // Example response
     *   // {}
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias cloudcommerceprocurement.providers.entitlements.rejectPlanChange
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.name The resource name of the entitlement. Required.
     * @param {().RejectEntitlementPlanChangeRequest} params.requestBody Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    rejectPlanChange(
      params?: Params$Resource$Providers$Entitlements$Rejectplanchange,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Empty>;
    rejectPlanChange(
      params: Params$Resource$Providers$Entitlements$Rejectplanchange,
      options: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    rejectPlanChange(
      params: Params$Resource$Providers$Entitlements$Rejectplanchange,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    rejectPlanChange(callback: BodyResponseCallback<Schema$Empty>): void;
    rejectPlanChange(
      paramsOrCallback?:
        | Params$Resource$Providers$Entitlements$Rejectplanchange
        | BodyResponseCallback<Schema$Empty>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback?: BodyResponseCallback<Schema$Empty>
    ): void | GaxiosPromise<Schema$Empty> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Providers$Entitlements$Rejectplanchange;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Providers$Entitlements$Rejectplanchange;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://cloudcommerceprocurement.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}:rejectPlanChange').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'POST',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Empty>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Empty>(parameters);
      }
    }

    /**
     * cloudcommerceprocurement.providers.entitlements.suspend
     * @desc Request suspension of an active Entitlement. This is not yet supported.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/cloudcommerceprocurement.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const cloudcommerceprocurement = google.cloudcommerceprocurement('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/cloud-platform'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await cloudcommerceprocurement.providers.entitlements.suspend({
     *     // The name of the entitlement to suspend.
     *     name: 'providers/my-provider/entitlements/my-entitlement',
     *
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {
     *       //   "reason": "my_reason"
     *       // }
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {}
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias cloudcommerceprocurement.providers.entitlements.suspend
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.name The name of the entitlement to suspend.
     * @param {().SuspendEntitlementRequest} params.requestBody Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    suspend(
      params?: Params$Resource$Providers$Entitlements$Suspend,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Empty>;
    suspend(
      params: Params$Resource$Providers$Entitlements$Suspend,
      options: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    suspend(
      params: Params$Resource$Providers$Entitlements$Suspend,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    suspend(callback: BodyResponseCallback<Schema$Empty>): void;
    suspend(
      paramsOrCallback?:
        | Params$Resource$Providers$Entitlements$Suspend
        | BodyResponseCallback<Schema$Empty>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback?: BodyResponseCallback<Schema$Empty>
    ): void | GaxiosPromise<Schema$Empty> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Providers$Entitlements$Suspend;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Providers$Entitlements$Suspend;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://cloudcommerceprocurement.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}:suspend').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'POST',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Empty>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Empty>(parameters);
      }
    }
  }

  export interface Params$Resource$Providers$Entitlements$Approve
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The resource name of the entitlement. Required.
     */
    name?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$ApproveEntitlementRequest;
  }
  export interface Params$Resource$Providers$Entitlements$Approveplanchange
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The resource name of the entitlement. Required.
     */
    name?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$ApproveEntitlementPlanChangeRequest;
  }
  export interface Params$Resource$Providers$Entitlements$Get
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The name of the entitlement to retrieve.
     */
    name?: string;
  }
  export interface Params$Resource$Providers$Entitlements$List
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The filter that can be used to limit the list request.  The filter is a query string that can match a selected set of attributes with string values. For example `account=E-1234-5678-ABCD-EFGH`, `state=pending_cancellation`, and `plan!=foo-plan`. Supported query attributes are  * `account` * `product_external_name` * `quote_external_name` * `plan` * `newPendingPlan` or `new_pending_plan` * `state` * `consumers.project`  Note that the consumers match works on repeated structures, so equality (`consumers.project=projects/123456789`) is not supported. Set membership can be expressed with the `:` operator. For example, `consumers.project:projects/123456789` finds entitlements with at least one consumer with project field equal to `projects/123456789`.  Also note that the state name match is case-insensitive and query can omit the prefix "ENTITLEMENT_". For example, `state=active` is equivalent to `state=ENTITLEMENT_ACTIVE`.  If the query contains some special characters other than letters, underscore, or digits, the phrase must be quoted with double quotes. For example, `product="providerId:productId"`, where the product name needs to be quoted because it contains special character colon.  Queries can be combined with `AND`, `OR`, and `NOT` to form more complex queries. They can also be grouped to force a desired evaluation order. For example, `state=active AND (account=E-1234 OR account=5678) AND NOT (product=foo-product)`. Connective `AND` can be omitted between two predicates. For example `account=E-1234 state=active` is equivalent to `account=E-1234 AND state=active`.
     */
    filter?: string;
    /**
     * The maximum number of entries that are requested.
     */
    pageSize?: number;
    /**
     * The token for fetching the next page.
     */
    pageToken?: string;
    /**
     * The parent resource name.
     */
    parent?: string;
  }
  export interface Params$Resource$Providers$Entitlements$Patch
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The name of the entitlement to update.
     */
    name?: string;
    /**
     * The update mask that applies to the resource. See the [FieldMask definition] (https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask) for more details.
     */
    updateMask?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$Entitlement;
  }
  export interface Params$Resource$Providers$Entitlements$Reject
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The resource name of the entitlement. Required.
     */
    name?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$RejectEntitlementRequest;
  }
  export interface Params$Resource$Providers$Entitlements$Rejectplanchange
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The resource name of the entitlement. Required.
     */
    name?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$RejectEntitlementPlanChangeRequest;
  }
  export interface Params$Resource$Providers$Entitlements$Suspend
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The name of the entitlement to suspend.
     */
    name?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$SuspendEntitlementRequest;
  }
}
