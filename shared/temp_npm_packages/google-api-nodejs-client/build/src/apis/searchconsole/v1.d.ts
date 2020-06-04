/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace searchconsole_v1 {
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
     * Google Search Console URL Testing Tools API
     *
     * Provides tools for running validation tests against single URLs
     *
     * @example
     * const {google} = require('googleapis');
     * const searchconsole = google.searchconsole('v1');
     *
     * @namespace searchconsole
     * @type {Function}
     * @version v1
     * @variation v1
     * @param {object=} options Options for Searchconsole
     */
    export class Searchconsole {
        context: APIRequestContext;
        urlTestingTools: Resource$Urltestingtools;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    /**
     * Blocked resource.
     */
    export interface Schema$BlockedResource {
        /**
         * URL of the blocked resource.
         */
        url?: string | null;
    }
    /**
     * Describe image data.
     */
    export interface Schema$Image {
        /**
         * Image data in format determined by the mime type. Currently, the format will always be &quot;image/png&quot;, but this might change in the future.
         */
        data?: string | null;
        /**
         * The mime-type of the image data.
         */
        mimeType?: string | null;
    }
    /**
     * Mobile-friendly issue.
     */
    export interface Schema$MobileFriendlyIssue {
        /**
         * Rule violated.
         */
        rule?: string | null;
    }
    /**
     * Information about a resource with issue.
     */
    export interface Schema$ResourceIssue {
        /**
         * Describes a blocked resource issue.
         */
        blockedResource?: Schema$BlockedResource;
    }
    /**
     * Mobile-friendly test request.
     */
    export interface Schema$RunMobileFriendlyTestRequest {
        /**
         * Whether or not screenshot is requested. Default is false.
         */
        requestScreenshot?: boolean | null;
        /**
         * URL for inspection.
         */
        url?: string | null;
    }
    /**
     * Mobile-friendly test response, including mobile-friendly issues and resource issues.
     */
    export interface Schema$RunMobileFriendlyTestResponse {
        /**
         * Test verdict, whether the page is mobile friendly or not.
         */
        mobileFriendliness?: string | null;
        /**
         * List of mobile-usability issues.
         */
        mobileFriendlyIssues?: Schema$MobileFriendlyIssue[];
        /**
         * Information about embedded resources issues.
         */
        resourceIssues?: Schema$ResourceIssue[];
        /**
         * Screenshot of the requested URL.
         */
        screenshot?: Schema$Image;
        /**
         * Final state of the test, can be either complete or an error.
         */
        testStatus?: Schema$TestStatus;
    }
    /**
     * Final state of the test, including error details if necessary.
     */
    export interface Schema$TestStatus {
        /**
         * Error details if applicable.
         */
        details?: string | null;
        /**
         * Status of the test.
         */
        status?: string | null;
    }
    export class Resource$Urltestingtools {
        context: APIRequestContext;
        mobileFriendlyTest: Resource$Urltestingtools$Mobilefriendlytest;
        constructor(context: APIRequestContext);
    }
    export class Resource$Urltestingtools$Mobilefriendlytest {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * searchconsole.urlTestingTools.mobileFriendlyTest.run
         * @desc Runs Mobile-Friendly Test for a given URL.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/searchconsole.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const searchconsole = google.searchconsole('v1');
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
         *   const res = await searchconsole.urlTestingTools.mobileFriendlyTest.run({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "requestScreenshot": false,
         *       //   "url": "my_url"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "mobileFriendliness": "my_mobileFriendliness",
         *   //   "mobileFriendlyIssues": [],
         *   //   "resourceIssues": [],
         *   //   "screenshot": {},
         *   //   "testStatus": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias searchconsole.urlTestingTools.mobileFriendlyTest.run
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().RunMobileFriendlyTestRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        run(params: Params$Resource$Urltestingtools$Mobilefriendlytest$Run, options: StreamMethodOptions): GaxiosPromise<Readable>;
        run(params?: Params$Resource$Urltestingtools$Mobilefriendlytest$Run, options?: MethodOptions): GaxiosPromise<Schema$RunMobileFriendlyTestResponse>;
        run(params: Params$Resource$Urltestingtools$Mobilefriendlytest$Run, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        run(params: Params$Resource$Urltestingtools$Mobilefriendlytest$Run, options: MethodOptions | BodyResponseCallback<Schema$RunMobileFriendlyTestResponse>, callback: BodyResponseCallback<Schema$RunMobileFriendlyTestResponse>): void;
        run(params: Params$Resource$Urltestingtools$Mobilefriendlytest$Run, callback: BodyResponseCallback<Schema$RunMobileFriendlyTestResponse>): void;
        run(callback: BodyResponseCallback<Schema$RunMobileFriendlyTestResponse>): void;
    }
    export interface Params$Resource$Urltestingtools$Mobilefriendlytest$Run extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$RunMobileFriendlyTestRequest;
    }
    export {};
}
