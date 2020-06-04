/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace acceleratedmobilepageurl_v1 {
    export interface Options extends GlobalOptions {
        version: 'v1';
    }
    interface StandardParameters {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient | GoogleAuth;
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
     * Accelerated Mobile Pages (AMP) URL API
     *
     * Retrieves the list of AMP URLs (and equivalent AMP Cache URLs) for a given list of public URL(s).
     *
     * @example
     * const {google} = require('googleapis');
     * const acceleratedmobilepageurl = google.acceleratedmobilepageurl('v1');
     *
     * @namespace acceleratedmobilepageurl
     * @type {Function}
     * @version v1
     * @variation v1
     * @param {object=} options Options for Acceleratedmobilepageurl
     */
    export class Acceleratedmobilepageurl {
        context: APIRequestContext;
        ampUrls: Resource$Ampurls;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    /**
     * AMP URL response for a requested URL.
     */
    export interface Schema$AmpUrl {
        /**
         * The AMP URL pointing to the publisher&#39;s web server.
         */
        ampUrl?: string | null;
        /**
         * The [AMP Cache URL](/amp/cache/overview#amp-cache-url-format) pointing to the cached document in the Google AMP Cache.
         */
        cdnAmpUrl?: string | null;
        /**
         * The original non-AMP URL.
         */
        originalUrl?: string | null;
    }
    /**
     * AMP URL Error resource for a requested URL that couldn&#39;t be found.
     */
    export interface Schema$AmpUrlError {
        /**
         * The error code of an API call.
         */
        errorCode?: string | null;
        /**
         * An optional descriptive error message.
         */
        errorMessage?: string | null;
        /**
         * The original non-AMP URL.
         */
        originalUrl?: string | null;
    }
    /**
     * AMP URL request for a batch of URLs.
     */
    export interface Schema$BatchGetAmpUrlsRequest {
        /**
         * The lookup_strategy being requested.
         */
        lookupStrategy?: string | null;
        /**
         * List of URLs to look up for the paired AMP URLs. The URLs are case-sensitive. Up to 50 URLs per lookup (see [Usage Limits](/amp/cache/reference/limits)).
         */
        urls?: string[] | null;
    }
    /**
     * Batch AMP URL response.
     */
    export interface Schema$BatchGetAmpUrlsResponse {
        /**
         * For each URL in BatchAmpUrlsRequest, the URL response. The response might not be in the same order as URLs in the batch request. If BatchAmpUrlsRequest contains duplicate URLs, AmpUrl is generated only once.
         */
        ampUrls?: Schema$AmpUrl[];
        /**
         * The errors for requested URLs that have no AMP URL.
         */
        urlErrors?: Schema$AmpUrlError[];
    }
    export class Resource$Ampurls {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * acceleratedmobilepageurl.ampUrls.batchGet
         * @desc Returns AMP URL(s) and equivalent [AMP Cache URL(s)](/amp/cache/overview#amp-cache-url-format).
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/acceleratedmobilepageurl.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const acceleratedmobilepageurl = google.acceleratedmobilepageurl('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await acceleratedmobilepageurl.ampUrls.batchGet({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "lookupStrategy": "my_lookupStrategy",
         *       //   "urls": []
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "ampUrls": [],
         *   //   "urlErrors": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias acceleratedmobilepageurl.ampUrls.batchGet
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().BatchGetAmpUrlsRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        batchGet(params: Params$Resource$Ampurls$Batchget, options: StreamMethodOptions): GaxiosPromise<Readable>;
        batchGet(params?: Params$Resource$Ampurls$Batchget, options?: MethodOptions): GaxiosPromise<Schema$BatchGetAmpUrlsResponse>;
        batchGet(params: Params$Resource$Ampurls$Batchget, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        batchGet(params: Params$Resource$Ampurls$Batchget, options: MethodOptions | BodyResponseCallback<Schema$BatchGetAmpUrlsResponse>, callback: BodyResponseCallback<Schema$BatchGetAmpUrlsResponse>): void;
        batchGet(params: Params$Resource$Ampurls$Batchget, callback: BodyResponseCallback<Schema$BatchGetAmpUrlsResponse>): void;
        batchGet(callback: BodyResponseCallback<Schema$BatchGetAmpUrlsResponse>): void;
    }
    export interface Params$Resource$Ampurls$Batchget extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$BatchGetAmpUrlsRequest;
    }
    export {};
}
