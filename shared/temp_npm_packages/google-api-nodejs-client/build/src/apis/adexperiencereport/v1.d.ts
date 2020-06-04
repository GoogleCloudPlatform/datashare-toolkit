/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace adexperiencereport_v1 {
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
     * Ad Experience Report API
     *
     * Views Ad Experience Report data, and gets a list of sites that have a significant number of annoying ads.
     *
     * @example
     * const {google} = require('googleapis');
     * const adexperiencereport = google.adexperiencereport('v1');
     *
     * @namespace adexperiencereport
     * @type {Function}
     * @version v1
     * @variation v1
     * @param {object=} options Options for Adexperiencereport
     */
    export class Adexperiencereport {
        context: APIRequestContext;
        sites: Resource$Sites;
        violatingSites: Resource$Violatingsites;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    /**
     * A site&#39;s Ad Experience Report summary on a single platform.
     */
    export interface Schema$PlatformSummary {
        /**
         * The site&#39;s Ad Experience Report status on this platform.
         */
        betterAdsStatus?: string | null;
        /**
         * The time at which [enforcement](https://support.google.com/webtools/answer/7308033) against the site began or will begin on this platform.  Not set when the filter_status is OFF.
         */
        enforcementTime?: string | null;
        /**
         * The site&#39;s [enforcement status](https://support.google.com/webtools/answer/7308033) on this platform.
         */
        filterStatus?: string | null;
        /**
         * The time at which the site&#39;s status last changed on this platform.
         */
        lastChangeTime?: string | null;
        /**
         * The site&#39;s regions on this platform.  No longer populated, because there is no longer any semantic difference between sites in different regions.
         */
        region?: string[] | null;
        /**
         * A link to the full Ad Experience Report for the site on this platform..  Not set in ViolatingSitesResponse.  Note that you must complete the [Search Console verification process](https://support.google.com/webmasters/answer/9008080) for the site before you can access the full report.
         */
        reportUrl?: string | null;
        /**
         * Whether the site is currently under review on this platform.
         */
        underReview?: boolean | null;
    }
    /**
     * Response message for GetSiteSummary.
     */
    export interface Schema$SiteSummaryResponse {
        /**
         * The site&#39;s Ad Experience Report summary on desktop.
         */
        desktopSummary?: Schema$PlatformSummary;
        /**
         * The site&#39;s Ad Experience Report summary on mobile.
         */
        mobileSummary?: Schema$PlatformSummary;
        /**
         * The name of the reviewed site, e.g. `google.com`.
         */
        reviewedSite?: string | null;
    }
    /**
     * Response message for ListViolatingSites.
     */
    export interface Schema$ViolatingSitesResponse {
        /**
         * The list of violating sites.
         */
        violatingSites?: Schema$SiteSummaryResponse[];
    }
    export class Resource$Sites {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * adexperiencereport.sites.get
         * @desc Gets a site's Ad Experience Report summary.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/adexperiencereport.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const adexperiencereport = google.adexperiencereport('v1');
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
         *   const res = await adexperiencereport.sites.get({
         *     // Required. The name of the site whose summary to get, e.g.
         *     // `sites/http%3A%2F%2Fwww.google.com%2F`.
         *     //
         *     // Format: `sites/{site}`
         *     name: 'sites/my-site',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "desktopSummary": {},
         *   //   "mobileSummary": {},
         *   //   "reviewedSite": "my_reviewedSite"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias adexperiencereport.sites.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The name of the site whose summary to get, e.g. `sites/http%3A%2F%2Fwww.google.com%2F`.  Format: `sites/{site}`
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Sites$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Sites$Get, options?: MethodOptions): GaxiosPromise<Schema$SiteSummaryResponse>;
        get(params: Params$Resource$Sites$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Sites$Get, options: MethodOptions | BodyResponseCallback<Schema$SiteSummaryResponse>, callback: BodyResponseCallback<Schema$SiteSummaryResponse>): void;
        get(params: Params$Resource$Sites$Get, callback: BodyResponseCallback<Schema$SiteSummaryResponse>): void;
        get(callback: BodyResponseCallback<Schema$SiteSummaryResponse>): void;
    }
    export interface Params$Resource$Sites$Get extends StandardParameters {
        /**
         * Required. The name of the site whose summary to get, e.g. `sites/http%3A%2F%2Fwww.google.com%2F`.  Format: `sites/{site}`
         */
        name?: string;
    }
    export class Resource$Violatingsites {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * adexperiencereport.violatingSites.list
         * @desc Lists sites that are failing in the Ad Experience Report on at least one platform.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/adexperiencereport.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const adexperiencereport = google.adexperiencereport('v1');
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
         *   const res = await adexperiencereport.violatingSites.list({});
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "violatingSites": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias adexperiencereport.violatingSites.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Violatingsites$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Violatingsites$List, options?: MethodOptions): GaxiosPromise<Schema$ViolatingSitesResponse>;
        list(params: Params$Resource$Violatingsites$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Violatingsites$List, options: MethodOptions | BodyResponseCallback<Schema$ViolatingSitesResponse>, callback: BodyResponseCallback<Schema$ViolatingSitesResponse>): void;
        list(params: Params$Resource$Violatingsites$List, callback: BodyResponseCallback<Schema$ViolatingSitesResponse>): void;
        list(callback: BodyResponseCallback<Schema$ViolatingSitesResponse>): void;
    }
    export interface Params$Resource$Violatingsites$List extends StandardParameters {
    }
    export {};
}
