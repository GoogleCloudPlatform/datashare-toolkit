/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace admin_datatransfer_v1 {
    export interface Options extends GlobalOptions {
        version: 'datatransfer_v1';
    }
    interface StandardParameters {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient | GoogleAuth;
        /**
         * Data format for the response.
         */
        alt?: string;
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
         * An opaque string that represents a user for quota purposes. Must not exceed 40 characters.
         */
        quotaUser?: string;
        /**
         * Deprecated. Please use quotaUser instead.
         */
        userIp?: string;
    }
    /**
     * Admin Data Transfer API
     *
     * Transfers user data from one user to another.
     *
     * @example
     * const {google} = require('googleapis');
     * const admin = google.admin('datatransfer_v1');
     *
     * @namespace admin
     * @type {Function}
     * @version datatransfer_v1
     * @variation datatransfer_v1
     * @param {object=} options Options for Admin
     */
    export class Admin {
        context: APIRequestContext;
        applications: Resource$Applications;
        transfers: Resource$Transfers;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    /**
     * The JSON template for an Application resource.
     */
    export interface Schema$Application {
        /**
         * Etag of the resource.
         */
        etag?: string | null;
        /**
         * The application&#39;s ID.
         */
        id?: string | null;
        /**
         * Identifies the resource as a DataTransfer Application Resource.
         */
        kind?: string | null;
        /**
         * The application&#39;s name.
         */
        name?: string | null;
        /**
         * The list of all possible transfer parameters for this application. These parameters can be used to select the data of the user in this application to be transferred.
         */
        transferParams?: Schema$ApplicationTransferParam[];
    }
    /**
     * Template to map fields of ApplicationDataTransfer resource.
     */
    export interface Schema$ApplicationDataTransfer {
        /**
         * The application&#39;s ID.
         */
        applicationId?: string | null;
        /**
         * The transfer parameters for the application. These parameters are used to select the data which will get transferred in context of this application.
         */
        applicationTransferParams?: Schema$ApplicationTransferParam[];
        /**
         * Current status of transfer for this application. (Read-only)
         */
        applicationTransferStatus?: string | null;
    }
    /**
     * Template for a collection of Applications.
     */
    export interface Schema$ApplicationsListResponse {
        /**
         * List of applications that support data transfer and are also installed for the customer.
         */
        applications?: Schema$Application[];
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * Identifies the resource as a collection of Applications.
         */
        kind?: string | null;
        /**
         * Continuation token which will be used to specify next page in list API.
         */
        nextPageToken?: string | null;
    }
    /**
     * Template for application transfer parameters.
     */
    export interface Schema$ApplicationTransferParam {
        /**
         * The type of the transfer parameter. eg: &#39;PRIVACY_LEVEL&#39;
         */
        key?: string | null;
        /**
         * The value of the corresponding transfer parameter. eg: &#39;PRIVATE&#39; or &#39;SHARED&#39;
         */
        value?: string[] | null;
    }
    /**
     * The JSON template for a DataTransfer resource.
     */
    export interface Schema$DataTransfer {
        /**
         * List of per application data transfer resources. It contains data transfer details of the applications associated with this transfer resource. Note that this list is also used to specify the applications for which data transfer has to be done at the time of the transfer resource creation.
         */
        applicationDataTransfers?: Schema$ApplicationDataTransfer[];
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * The transfer&#39;s ID (Read-only).
         */
        id?: string | null;
        /**
         * Identifies the resource as a DataTransfer request.
         */
        kind?: string | null;
        /**
         * ID of the user to whom the data is being transferred.
         */
        newOwnerUserId?: string | null;
        /**
         * ID of the user whose data is being transferred.
         */
        oldOwnerUserId?: string | null;
        /**
         * Overall transfer status (Read-only).
         */
        overallTransferStatusCode?: string | null;
        /**
         * The time at which the data transfer was requested (Read-only).
         */
        requestTime?: string | null;
    }
    /**
     * Template for a collection of DataTransfer resources.
     */
    export interface Schema$DataTransfersListResponse {
        /**
         * List of data transfer requests.
         */
        dataTransfers?: Schema$DataTransfer[];
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * Identifies the resource as a collection of data transfer requests.
         */
        kind?: string | null;
        /**
         * Continuation token which will be used to specify next page in list API.
         */
        nextPageToken?: string | null;
    }
    export class Resource$Applications {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * datatransfer.applications.get
         * @desc Retrieves information about an application for the given application ID.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('datatransfer_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.datatransfer',
         *       'https://www.googleapis.com/auth/admin.datatransfer.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await datatransfer.applications.get({
         *     // ID of the application resource to be retrieved.
         *     applicationId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etag": "my_etag",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "name": "my_name",
         *   //   "transferParams": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias datatransfer.applications.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.applicationId ID of the application resource to be retrieved.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Applications$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Applications$Get, options?: MethodOptions): GaxiosPromise<Schema$Application>;
        get(params: Params$Resource$Applications$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Applications$Get, options: MethodOptions | BodyResponseCallback<Schema$Application>, callback: BodyResponseCallback<Schema$Application>): void;
        get(params: Params$Resource$Applications$Get, callback: BodyResponseCallback<Schema$Application>): void;
        get(callback: BodyResponseCallback<Schema$Application>): void;
        /**
         * datatransfer.applications.list
         * @desc Lists the applications available for data transfer for a customer.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('datatransfer_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.datatransfer',
         *       'https://www.googleapis.com/auth/admin.datatransfer.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await datatransfer.applications.list({
         *     // Immutable ID of the G Suite account.
         *     customerId: 'placeholder-value',
         *     // Maximum number of results to return. Default is 100.
         *     maxResults: 'placeholder-value',
         *     // Token to specify next page in the list.
         *     pageToken: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "applications": [],
         *   //   "etag": "my_etag",
         *   //   "kind": "my_kind",
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias datatransfer.applications.list
         * @memberOf! ()
         *
         * @param {object=} params Parameters for request
         * @param {string=} params.customerId Immutable ID of the G Suite account.
         * @param {integer=} params.maxResults Maximum number of results to return. Default is 100.
         * @param {string=} params.pageToken Token to specify next page in the list.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Applications$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Applications$List, options?: MethodOptions): GaxiosPromise<Schema$ApplicationsListResponse>;
        list(params: Params$Resource$Applications$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Applications$List, options: MethodOptions | BodyResponseCallback<Schema$ApplicationsListResponse>, callback: BodyResponseCallback<Schema$ApplicationsListResponse>): void;
        list(params: Params$Resource$Applications$List, callback: BodyResponseCallback<Schema$ApplicationsListResponse>): void;
        list(callback: BodyResponseCallback<Schema$ApplicationsListResponse>): void;
    }
    export interface Params$Resource$Applications$Get extends StandardParameters {
        /**
         * ID of the application resource to be retrieved.
         */
        applicationId?: string;
    }
    export interface Params$Resource$Applications$List extends StandardParameters {
        /**
         * Immutable ID of the G Suite account.
         */
        customerId?: string;
        /**
         * Maximum number of results to return. Default is 100.
         */
        maxResults?: number;
        /**
         * Token to specify next page in the list.
         */
        pageToken?: string;
    }
    export class Resource$Transfers {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * datatransfer.transfers.get
         * @desc Retrieves a data transfer request by its resource ID.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('datatransfer_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.datatransfer',
         *       'https://www.googleapis.com/auth/admin.datatransfer.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await datatransfer.transfers.get({
         *     // ID of the resource to be retrieved. This is returned in the response from the insert method.
         *     dataTransferId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "applicationDataTransfers": [],
         *   //   "etag": "my_etag",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "newOwnerUserId": "my_newOwnerUserId",
         *   //   "oldOwnerUserId": "my_oldOwnerUserId",
         *   //   "overallTransferStatusCode": "my_overallTransferStatusCode",
         *   //   "requestTime": "my_requestTime"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias datatransfer.transfers.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.dataTransferId ID of the resource to be retrieved. This is returned in the response from the insert method.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Transfers$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Transfers$Get, options?: MethodOptions): GaxiosPromise<Schema$DataTransfer>;
        get(params: Params$Resource$Transfers$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Transfers$Get, options: MethodOptions | BodyResponseCallback<Schema$DataTransfer>, callback: BodyResponseCallback<Schema$DataTransfer>): void;
        get(params: Params$Resource$Transfers$Get, callback: BodyResponseCallback<Schema$DataTransfer>): void;
        get(callback: BodyResponseCallback<Schema$DataTransfer>): void;
        /**
         * datatransfer.transfers.insert
         * @desc Inserts a data transfer request.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('datatransfer_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.datatransfer'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await datatransfer.transfers.insert({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "applicationDataTransfers": [],
         *       //   "etag": "my_etag",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "newOwnerUserId": "my_newOwnerUserId",
         *       //   "oldOwnerUserId": "my_oldOwnerUserId",
         *       //   "overallTransferStatusCode": "my_overallTransferStatusCode",
         *       //   "requestTime": "my_requestTime"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "applicationDataTransfers": [],
         *   //   "etag": "my_etag",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "newOwnerUserId": "my_newOwnerUserId",
         *   //   "oldOwnerUserId": "my_oldOwnerUserId",
         *   //   "overallTransferStatusCode": "my_overallTransferStatusCode",
         *   //   "requestTime": "my_requestTime"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias datatransfer.transfers.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().DataTransfer} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Transfers$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Transfers$Insert, options?: MethodOptions): GaxiosPromise<Schema$DataTransfer>;
        insert(params: Params$Resource$Transfers$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Transfers$Insert, options: MethodOptions | BodyResponseCallback<Schema$DataTransfer>, callback: BodyResponseCallback<Schema$DataTransfer>): void;
        insert(params: Params$Resource$Transfers$Insert, callback: BodyResponseCallback<Schema$DataTransfer>): void;
        insert(callback: BodyResponseCallback<Schema$DataTransfer>): void;
        /**
         * datatransfer.transfers.list
         * @desc Lists the transfers for a customer by source user, destination user, or status.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('datatransfer_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.datatransfer',
         *       'https://www.googleapis.com/auth/admin.datatransfer.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await datatransfer.transfers.list({
         *     // Immutable ID of the G Suite account.
         *     customerId: 'placeholder-value',
         *     // Maximum number of results to return. Default is 100.
         *     maxResults: 'placeholder-value',
         *     // Destination user's profile ID.
         *     newOwnerUserId: 'placeholder-value',
         *     // Source user's profile ID.
         *     oldOwnerUserId: 'placeholder-value',
         *     // Token to specify the next page in the list.
         *     pageToken: 'placeholder-value',
         *     // Status of the transfer.
         *     status: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "dataTransfers": [],
         *   //   "etag": "my_etag",
         *   //   "kind": "my_kind",
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias datatransfer.transfers.list
         * @memberOf! ()
         *
         * @param {object=} params Parameters for request
         * @param {string=} params.customerId Immutable ID of the G Suite account.
         * @param {integer=} params.maxResults Maximum number of results to return. Default is 100.
         * @param {string=} params.newOwnerUserId Destination user's profile ID.
         * @param {string=} params.oldOwnerUserId Source user's profile ID.
         * @param {string=} params.pageToken Token to specify the next page in the list.
         * @param {string=} params.status Status of the transfer.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Transfers$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Transfers$List, options?: MethodOptions): GaxiosPromise<Schema$DataTransfersListResponse>;
        list(params: Params$Resource$Transfers$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Transfers$List, options: MethodOptions | BodyResponseCallback<Schema$DataTransfersListResponse>, callback: BodyResponseCallback<Schema$DataTransfersListResponse>): void;
        list(params: Params$Resource$Transfers$List, callback: BodyResponseCallback<Schema$DataTransfersListResponse>): void;
        list(callback: BodyResponseCallback<Schema$DataTransfersListResponse>): void;
    }
    export interface Params$Resource$Transfers$Get extends StandardParameters {
        /**
         * ID of the resource to be retrieved. This is returned in the response from the insert method.
         */
        dataTransferId?: string;
    }
    export interface Params$Resource$Transfers$Insert extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$DataTransfer;
    }
    export interface Params$Resource$Transfers$List extends StandardParameters {
        /**
         * Immutable ID of the G Suite account.
         */
        customerId?: string;
        /**
         * Maximum number of results to return. Default is 100.
         */
        maxResults?: number;
        /**
         * Destination user's profile ID.
         */
        newOwnerUserId?: string;
        /**
         * Source user's profile ID.
         */
        oldOwnerUserId?: string;
        /**
         * Token to specify the next page in the list.
         */
        pageToken?: string;
        /**
         * Status of the transfer.
         */
        status?: string;
    }
    export {};
}
