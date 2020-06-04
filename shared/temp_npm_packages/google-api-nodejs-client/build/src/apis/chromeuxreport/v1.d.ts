/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace chromeuxreport_v1 {
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
     * Chrome UX Report API
     *
     * The Chrome UX Report API lets you view real user experience data for millions of websites.
     *
     * @example
     * const {google} = require('googleapis');
     * const chromeuxreport = google.chromeuxreport('v1');
     *
     * @namespace chromeuxreport
     * @type {Function}
     * @version v1
     * @variation v1
     * @param {object=} options Options for Chromeuxreport
     */
    export class Chromeuxreport {
        context: APIRequestContext;
        records: Resource$Records;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    /**
     * A bin is a discrete portion of data spanning from start to end, or if no end is given, then from start to +inf.  A bin&#39;s start and end values are given in the value type of the metric it represents. For example, &quot;first contentful paint&quot; is measured in milliseconds and exposed as ints, therefore its metric bins will use int32s for its start and end types. However, &quot;cumulative layout shift&quot; is measured in unitless decimals and is exposed as a decimal encoded as a string, therefore its metric bins will use strings for its value type.
     */
    export interface Schema$Bin {
        /**
         * The proportion of users that experienced this bin&#39;s value for the given metric.
         */
        density?: number | null;
        /**
         * End is the end of the data bin. If end is not populated, then the bin has no end and is valid from start to +inf.
         */
        end?: any | null;
        /**
         * Start is the beginning of the data bin.
         */
        start?: any | null;
    }
    /**
     * Key defines all the dimensions that identify this record as unique.
     */
    export interface Schema$Key {
        /**
         * The form factor is the device class that all users used to access the site for this record.  If the form factor is unspecified, then aggregated data over all form factors will be returned.
         */
        formFactor?: string | null;
        /**
         * Origin specifies the origin that this record is for.  Note: When specifying an origin, data for loads under this origin over all pages are aggregated into origin level user experience data.
         */
        origin?: string | null;
        /**
         * Url specifies a specific url that this record is for.  Note: When specifying a &quot;url&quot; only data for that specific url will be aggregated.
         */
        url?: string | null;
    }
    /**
     * A `metric` is a set of user experience data for a single web performance metric, like &quot;first contentful paint&quot;. It contains a summary histogram of real world Chrome usage as a series of `bins`.
     */
    export interface Schema$Metric {
        /**
         * The histogram of user experiences for a metric. The histogram will have at least one bin and the densities of all bins will add up to ~1.
         */
        histogram?: Schema$Bin[];
        /**
         * Common useful percentiles of the Metric. The value type for the percentiles will be the same as the value types given for the Histogram bins.
         */
        percentiles?: Schema$Percentiles;
    }
    /**
     * Percentiles contains synthetic values of a metric at a given statistical percentile. These are used for estimating a metric&#39;s value as experienced by a percentage of users out of the total number of users.
     */
    export interface Schema$Percentiles {
        /**
         * 75% of users experienced the given metric at or below this value.
         */
        p75?: any | null;
    }
    /**
     * Request payload sent by a physical web client.  This request includes all necessary context to load a particular user experience record.
     */
    export interface Schema$QueryRequest {
        /**
         * The form factor is a query dimension that specifies the device class that the record&#39;s data should belong to.  Note: If no form factor is specified, then a special record with aggregated data over all form factors will be returned.
         */
        formFactor?: string | null;
        /**
         * The metrics that should be included in the response. If none are specified then any metrics found will be returned.  Allowed values: [&quot;first_contentful_paint&quot;, &quot;first_input_delay&quot;, &quot;largest_contentful_paint&quot;, &quot;cumulative_layout_shift&quot;]
         */
        metrics?: string[] | null;
        /**
         * The url pattern &quot;origin&quot; refers to a url pattern that is the origin of a website.  Examples: &quot;https://example.com&quot;, &quot;https://cloud.google.com&quot;
         */
        origin?: string | null;
        /**
         * The url pattern &quot;url&quot; refers to a url pattern that is any arbitrary url.  Examples: &quot;https://example.com/&quot;,   &quot;https://cloud.google.com/why-google-cloud/&quot;
         */
        url?: string | null;
    }
    /**
     * Response payload sent back to a physical web client.  This response contains the record found based on the identiers present in a `QueryRequest`.  The returned response will have a record, and sometimes details on normalization actions taken on the request that were necessary to make the request successful.
     */
    export interface Schema$QueryResponse {
        /**
         * The record that was found.
         */
        record?: Schema$Record;
        /**
         * These are details about automated normalization actions that were taken in order to make the requested `url_pattern` valid.
         */
        urlNormalizationDetails?: Schema$UrlNormalization;
    }
    /**
     * Record is a single Chrome UX report data record. It contains use experience statistics for a single url pattern and set of dimensions.
     */
    export interface Schema$Record {
        /**
         * Key defines all of the unique querying parameters needed to look up a user experience record.
         */
        key?: Schema$Key;
        /**
         * Metrics is the map of user experience data available for the record defined in the key field. Metrics are keyed on the metric name.  Allowed key values: [&quot;first_contentful_paint&quot;, &quot;first_input_delay&quot;, &quot;largest_contentful_paint&quot;, &quot;cumulative_layout_shift&quot;]
         */
        metrics?: {
            [key: string]: Schema$Metric;
        } | null;
    }
    /**
     * Object representing the normalization actions taken to normalize a url to achieve a higher chance of successful lookup. These are simple automated changes that are taken when looking up the provided `url_patten` would be known to fail. Complex actions like following redirects are not handled.
     */
    export interface Schema$UrlNormalization {
        /**
         * The URL after any normalization actions. This is a valid user experience URL that could reasonably be looked up.
         */
        normalizedUrl?: string | null;
        /**
         * The original requested URL prior to any normalization actions.
         */
        originalUrl?: string | null;
    }
    export class Resource$Records {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * chromeuxreport.records.queryRecord
         * @desc Queries the Chrome User Experience for a single `record` for a given site.  Returns a `record` that contains one or more `metrics` corresponding to performance data about the requested site.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/chromeuxreport.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const chromeuxreport = google.chromeuxreport('v1');
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
         *   const res = await chromeuxreport.records.queryRecord({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "formFactor": "my_formFactor",
         *       //   "metrics": [],
         *       //   "origin": "my_origin",
         *       //   "url": "my_url"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "record": {},
         *   //   "urlNormalizationDetails": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias chromeuxreport.records.queryRecord
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().QueryRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        queryRecord(params: Params$Resource$Records$Queryrecord, options: StreamMethodOptions): GaxiosPromise<Readable>;
        queryRecord(params?: Params$Resource$Records$Queryrecord, options?: MethodOptions): GaxiosPromise<Schema$QueryResponse>;
        queryRecord(params: Params$Resource$Records$Queryrecord, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        queryRecord(params: Params$Resource$Records$Queryrecord, options: MethodOptions | BodyResponseCallback<Schema$QueryResponse>, callback: BodyResponseCallback<Schema$QueryResponse>): void;
        queryRecord(params: Params$Resource$Records$Queryrecord, callback: BodyResponseCallback<Schema$QueryResponse>): void;
        queryRecord(callback: BodyResponseCallback<Schema$QueryResponse>): void;
    }
    export interface Params$Resource$Records$Queryrecord extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$QueryRequest;
    }
    export {};
}
