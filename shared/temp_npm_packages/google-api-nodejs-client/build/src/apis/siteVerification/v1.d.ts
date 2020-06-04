/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace siteVerification_v1 {
    export interface Options extends GlobalOptions {
        version: 'v1';
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
     * Google Site Verification API
     *
     * Verifies ownership of websites or domains with Google.
     *
     * @example
     * const {google} = require('googleapis');
     * const siteVerification = google.siteVerification('v1');
     *
     * @namespace siteVerification
     * @type {Function}
     * @version v1
     * @variation v1
     * @param {object=} options Options for Siteverification
     */
    export class Siteverification {
        context: APIRequestContext;
        webResource: Resource$Webresource;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    export interface Schema$SiteVerificationWebResourceGettokenRequest {
        /**
         * The site for which a verification token will be generated.
         */
        site?: {
            identifier?: string;
            type?: string;
        } | null;
        /**
         * The verification method that will be used to verify this site. For sites, &#39;FILE&#39; or &#39;META&#39; methods may be used. For domains, only &#39;DNS&#39; may be used.
         */
        verificationMethod?: string | null;
    }
    export interface Schema$SiteVerificationWebResourceGettokenResponse {
        /**
         * The verification method to use in conjunction with this token. For FILE, the token should be placed in the top-level directory of the site, stored inside a file of the same name. For META, the token should be placed in the HEAD tag of the default page that is loaded for the site. For DNS, the token should be placed in a TXT record of the domain.
         */
        method?: string | null;
        /**
         * The verification token. The token must be placed appropriately in order for verification to succeed.
         */
        token?: string | null;
    }
    export interface Schema$SiteVerificationWebResourceListResponse {
        /**
         * The list of sites that are owned by the authenticated user.
         */
        items?: Schema$SiteVerificationWebResourceResource[];
    }
    export interface Schema$SiteVerificationWebResourceResource {
        /**
         * The string used to identify this site. This value should be used in the &quot;id&quot; portion of the REST URL for the Get, Update, and Delete operations.
         */
        id?: string | null;
        /**
         * The email addresses of all verified owners.
         */
        owners?: string[] | null;
        /**
         * The address and type of a site that is verified or will be verified.
         */
        site?: {
            identifier?: string;
            type?: string;
        } | null;
    }
    export class Resource$Webresource {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * siteVerification.webResource.delete
         * @desc Relinquish ownership of a website or domain.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/siteVerification.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const siteVerification = google.siteVerification('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/siteverification'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await siteVerification.webResource.delete({
         *     // The id of a verified site or domain.
         *     id: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias siteVerification.webResource.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.id The id of a verified site or domain.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Webresource$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Webresource$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Webresource$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Webresource$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Webresource$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * siteVerification.webResource.get
         * @desc Get the most current data for a website or domain.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/siteVerification.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const siteVerification = google.siteVerification('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/siteverification'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await siteVerification.webResource.get({
         *     // The id of a verified site or domain.
         *     id: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "id": "my_id",
         *   //   "owners": [],
         *   //   "site": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias siteVerification.webResource.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.id The id of a verified site or domain.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Webresource$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Webresource$Get, options?: MethodOptions): GaxiosPromise<Schema$SiteVerificationWebResourceResource>;
        get(params: Params$Resource$Webresource$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Webresource$Get, options: MethodOptions | BodyResponseCallback<Schema$SiteVerificationWebResourceResource>, callback: BodyResponseCallback<Schema$SiteVerificationWebResourceResource>): void;
        get(params: Params$Resource$Webresource$Get, callback: BodyResponseCallback<Schema$SiteVerificationWebResourceResource>): void;
        get(callback: BodyResponseCallback<Schema$SiteVerificationWebResourceResource>): void;
        /**
         * siteVerification.webResource.getToken
         * @desc Get a verification token for placing on a website or domain.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/siteVerification.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const siteVerification = google.siteVerification('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/siteverification',
         *       'https://www.googleapis.com/auth/siteverification.verify_only',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await siteVerification.webResource.getToken({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "site": {},
         *       //   "verificationMethod": "my_verificationMethod"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "method": "my_method",
         *   //   "token": "my_token"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias siteVerification.webResource.getToken
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().SiteVerificationWebResourceGettokenRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getToken(params: Params$Resource$Webresource$Gettoken, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getToken(params?: Params$Resource$Webresource$Gettoken, options?: MethodOptions): GaxiosPromise<Schema$SiteVerificationWebResourceGettokenResponse>;
        getToken(params: Params$Resource$Webresource$Gettoken, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getToken(params: Params$Resource$Webresource$Gettoken, options: MethodOptions | BodyResponseCallback<Schema$SiteVerificationWebResourceGettokenResponse>, callback: BodyResponseCallback<Schema$SiteVerificationWebResourceGettokenResponse>): void;
        getToken(params: Params$Resource$Webresource$Gettoken, callback: BodyResponseCallback<Schema$SiteVerificationWebResourceGettokenResponse>): void;
        getToken(callback: BodyResponseCallback<Schema$SiteVerificationWebResourceGettokenResponse>): void;
        /**
         * siteVerification.webResource.insert
         * @desc Attempt verification of a website or domain.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/siteVerification.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const siteVerification = google.siteVerification('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/siteverification',
         *       'https://www.googleapis.com/auth/siteverification.verify_only',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await siteVerification.webResource.insert({
         *     // The method to use for verifying a site or domain.
         *     verificationMethod: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "id": "my_id",
         *       //   "owners": [],
         *       //   "site": {}
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "id": "my_id",
         *   //   "owners": [],
         *   //   "site": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias siteVerification.webResource.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.verificationMethod The method to use for verifying a site or domain.
         * @param {().SiteVerificationWebResourceResource} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Webresource$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Webresource$Insert, options?: MethodOptions): GaxiosPromise<Schema$SiteVerificationWebResourceResource>;
        insert(params: Params$Resource$Webresource$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Webresource$Insert, options: MethodOptions | BodyResponseCallback<Schema$SiteVerificationWebResourceResource>, callback: BodyResponseCallback<Schema$SiteVerificationWebResourceResource>): void;
        insert(params: Params$Resource$Webresource$Insert, callback: BodyResponseCallback<Schema$SiteVerificationWebResourceResource>): void;
        insert(callback: BodyResponseCallback<Schema$SiteVerificationWebResourceResource>): void;
        /**
         * siteVerification.webResource.list
         * @desc Get the list of your verified websites and domains.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/siteVerification.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const siteVerification = google.siteVerification('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/siteverification'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await siteVerification.webResource.list({});
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "items": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias siteVerification.webResource.list
         * @memberOf! ()
         *
         * @param {object=} params Parameters for request
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Webresource$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Webresource$List, options?: MethodOptions): GaxiosPromise<Schema$SiteVerificationWebResourceListResponse>;
        list(params: Params$Resource$Webresource$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Webresource$List, options: MethodOptions | BodyResponseCallback<Schema$SiteVerificationWebResourceListResponse>, callback: BodyResponseCallback<Schema$SiteVerificationWebResourceListResponse>): void;
        list(params: Params$Resource$Webresource$List, callback: BodyResponseCallback<Schema$SiteVerificationWebResourceListResponse>): void;
        list(callback: BodyResponseCallback<Schema$SiteVerificationWebResourceListResponse>): void;
        /**
         * siteVerification.webResource.patch
         * @desc Modify the list of owners for your website or domain. This method supports patch semantics.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/siteVerification.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const siteVerification = google.siteVerification('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/siteverification'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await siteVerification.webResource.patch({
         *     // The id of a verified site or domain.
         *     id: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "id": "my_id",
         *       //   "owners": [],
         *       //   "site": {}
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "id": "my_id",
         *   //   "owners": [],
         *   //   "site": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias siteVerification.webResource.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.id The id of a verified site or domain.
         * @param {().SiteVerificationWebResourceResource} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Webresource$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Webresource$Patch, options?: MethodOptions): GaxiosPromise<Schema$SiteVerificationWebResourceResource>;
        patch(params: Params$Resource$Webresource$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Webresource$Patch, options: MethodOptions | BodyResponseCallback<Schema$SiteVerificationWebResourceResource>, callback: BodyResponseCallback<Schema$SiteVerificationWebResourceResource>): void;
        patch(params: Params$Resource$Webresource$Patch, callback: BodyResponseCallback<Schema$SiteVerificationWebResourceResource>): void;
        patch(callback: BodyResponseCallback<Schema$SiteVerificationWebResourceResource>): void;
        /**
         * siteVerification.webResource.update
         * @desc Modify the list of owners for your website or domain.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/siteVerification.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const siteVerification = google.siteVerification('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/siteverification'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await siteVerification.webResource.update({
         *     // The id of a verified site or domain.
         *     id: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "id": "my_id",
         *       //   "owners": [],
         *       //   "site": {}
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "id": "my_id",
         *   //   "owners": [],
         *   //   "site": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias siteVerification.webResource.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.id The id of a verified site or domain.
         * @param {().SiteVerificationWebResourceResource} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Webresource$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Webresource$Update, options?: MethodOptions): GaxiosPromise<Schema$SiteVerificationWebResourceResource>;
        update(params: Params$Resource$Webresource$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Webresource$Update, options: MethodOptions | BodyResponseCallback<Schema$SiteVerificationWebResourceResource>, callback: BodyResponseCallback<Schema$SiteVerificationWebResourceResource>): void;
        update(params: Params$Resource$Webresource$Update, callback: BodyResponseCallback<Schema$SiteVerificationWebResourceResource>): void;
        update(callback: BodyResponseCallback<Schema$SiteVerificationWebResourceResource>): void;
    }
    export interface Params$Resource$Webresource$Delete extends StandardParameters {
        /**
         * The id of a verified site or domain.
         */
        id?: string;
    }
    export interface Params$Resource$Webresource$Get extends StandardParameters {
        /**
         * The id of a verified site or domain.
         */
        id?: string;
    }
    export interface Params$Resource$Webresource$Gettoken extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$SiteVerificationWebResourceGettokenRequest;
    }
    export interface Params$Resource$Webresource$Insert extends StandardParameters {
        /**
         * The method to use for verifying a site or domain.
         */
        verificationMethod?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$SiteVerificationWebResourceResource;
    }
    export interface Params$Resource$Webresource$List extends StandardParameters {
    }
    export interface Params$Resource$Webresource$Patch extends StandardParameters {
        /**
         * The id of a verified site or domain.
         */
        id?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$SiteVerificationWebResourceResource;
    }
    export interface Params$Resource$Webresource$Update extends StandardParameters {
        /**
         * The id of a verified site or domain.
         */
        id?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$SiteVerificationWebResourceResource;
    }
    export {};
}
