/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace doubleclickbidmanager_v1 {
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
     * DoubleClick Bid Manager API
     *
     * API for viewing and managing your reports in DoubleClick Bid Manager.
     *
     * @example
     * const {google} = require('googleapis');
     * const doubleclickbidmanager = google.doubleclickbidmanager('v1');
     *
     * @namespace doubleclickbidmanager
     * @type {Function}
     * @version v1
     * @variation v1
     * @param {object=} options Options for Doubleclickbidmanager
     */
    export class Doubleclickbidmanager {
        context: APIRequestContext;
        lineitems: Resource$Lineitems;
        queries: Resource$Queries;
        reports: Resource$Reports;
        sdf: Resource$Sdf;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    /**
     * Request to fetch stored line items.
     */
    export interface Schema$DownloadLineItemsRequest {
        /**
         * File specification (column names, types, order) in which the line items will be returned. Default to EWF.
         */
        fileSpec?: string | null;
        /**
         * Ids of the specified filter type used to filter line items to fetch. If omitted, all the line items will be returned.
         */
        filterIds?: string[] | null;
        /**
         * Filter type used to filter line items to fetch.
         */
        filterType?: string | null;
        /**
         * Format in which the line items will be returned. Default to CSV.
         */
        format?: string | null;
    }
    /**
     * Download line items response.
     */
    export interface Schema$DownloadLineItemsResponse {
        /**
         * Retrieved line items in CSV format. For more information about file formats, see  Entity Write File Format.
         */
        lineItems?: string | null;
    }
    /**
     * Request to fetch stored inventory sources, campaigns, insertion orders, line items, TrueView ad groups and ads.
     */
    export interface Schema$DownloadRequest {
        /**
         * File types that will be returned. If INVENTORY_SOURCE is requested, no other file types may be requested.  Acceptable values are:   - &quot;AD&quot;  - &quot;AD_GROUP&quot;  - &quot;CAMPAIGN&quot;  - &quot;INSERTION_ORDER&quot;  - &quot;INVENTORY_SOURCE&quot;  - &quot;LINE_ITEM&quot;
         */
        fileTypes?: string[] | null;
        /**
         * The IDs of the specified filter type. This is used to filter entities to fetch. At least one ID must be specified.
         */
        filterIds?: string[] | null;
        /**
         * Filter type used to filter entities to fetch. PARTNER_ID and INVENTORY_SOURCE_ID may only be used when downloading inventory sources.
         */
        filterType?: string | null;
        /**
         * SDF Version (column names, types, order) in which the entities will be returned. Default to 5.
         */
        version?: string | null;
    }
    /**
     * Download response.
     */
    export interface Schema$DownloadResponse {
        /**
         * Retrieved ad groups in SDF format.
         */
        adGroups?: string | null;
        /**
         * Retrieved ads in SDF format.
         */
        ads?: string | null;
        /**
         * Retrieved campaigns in SDF format.
         */
        campaigns?: string | null;
        /**
         * Retrieved insertion orders in SDF format.
         */
        insertionOrders?: string | null;
        inventorySources?: string | null;
        /**
         * Retrieved line items in SDF format.
         */
        lineItems?: string | null;
    }
    /**
     * Filter used to match traffic data in your report.
     */
    export interface Schema$FilterPair {
        /**
         * Filter type.
         */
        type?: string | null;
        /**
         * Filter value.
         */
        value?: string | null;
    }
    /**
     * List queries response.
     */
    export interface Schema$ListQueriesResponse {
        /**
         * Identifies what kind of resource this is. Value: the fixed string &quot;doubleclickbidmanager#listQueriesResponse&quot;.
         */
        kind?: string | null;
        /**
         * Retrieved queries.
         */
        queries?: Schema$Query[];
    }
    /**
     * List reports response.
     */
    export interface Schema$ListReportsResponse {
        /**
         * Identifies what kind of resource this is. Value: the fixed string &quot;doubleclickbidmanager#listReportsResponse&quot;.
         */
        kind?: string | null;
        /**
         * Retrieved reports.
         */
        reports?: Schema$Report[];
    }
    /**
     * Parameters of a query or report.
     */
    export interface Schema$Parameters {
        /**
         * Filters used to match traffic data in your report.
         */
        filters?: Schema$FilterPair[];
        /**
         * Data is grouped by the filters listed in this field.
         */
        groupBys?: string[] | null;
        /**
         * Deprecated. This field is no longer in use.
         */
        includeInviteData?: boolean | null;
        /**
         * Metrics to include as columns in your report.
         */
        metrics?: string[] | null;
        /**
         * Report type.
         */
        type?: string | null;
    }
    /**
     * Represents a query.
     */
    export interface Schema$Query {
        /**
         * Identifies what kind of resource this is. Value: the fixed string &quot;doubleclickbidmanager#query&quot;.
         */
        kind?: string | null;
        /**
         * Query metadata.
         */
        metadata?: Schema$QueryMetadata;
        /**
         * Query parameters.
         */
        params?: Schema$Parameters;
        /**
         * Query ID.
         */
        queryId?: string | null;
        /**
         * The ending time for the data that is shown in the report. Note, reportDataEndTimeMs is required if metadata.dataRange is CUSTOM_DATES and ignored otherwise.
         */
        reportDataEndTimeMs?: string | null;
        /**
         * The starting time for the data that is shown in the report. Note, reportDataStartTimeMs is required if metadata.dataRange is CUSTOM_DATES and ignored otherwise.
         */
        reportDataStartTimeMs?: string | null;
        /**
         * Information on how often and when to run a query.
         */
        schedule?: Schema$QuerySchedule;
        /**
         * Canonical timezone code for report data time. Defaults to America/New_York.
         */
        timezoneCode?: string | null;
    }
    /**
     * Query metadata.
     */
    export interface Schema$QueryMetadata {
        /**
         * Range of report data.
         */
        dataRange?: string | null;
        /**
         * Format of the generated report.
         */
        format?: string | null;
        /**
         * The path to the location in Google Cloud Storage where the latest report is stored.
         */
        googleCloudStoragePathForLatestReport?: string | null;
        /**
         * The path in Google Drive for the latest report.
         */
        googleDrivePathForLatestReport?: string | null;
        /**
         * The time when the latest report started to run.
         */
        latestReportRunTimeMs?: string | null;
        /**
         * Locale of the generated reports. Valid values are cs CZECH de GERMAN en ENGLISH es SPANISH fr FRENCH it ITALIAN ja JAPANESE ko KOREAN pl POLISH pt-BR BRAZILIAN_PORTUGUESE ru RUSSIAN tr TURKISH uk UKRAINIAN zh-CN CHINA_CHINESE zh-TW TAIWAN_CHINESE  An locale string not in the list above will generate reports in English.
         */
        locale?: string | null;
        /**
         * Number of reports that have been generated for the query.
         */
        reportCount?: number | null;
        /**
         * Whether the latest report is currently running.
         */
        running?: boolean | null;
        /**
         * Whether to send an email notification when a report is ready. Default to false.
         */
        sendNotification?: boolean | null;
        /**
         * List of email addresses which are sent email notifications when the report is finished. Separate from sendNotification.
         */
        shareEmailAddress?: string[] | null;
        /**
         * Query title. It is used to name the reports generated from this query.
         */
        title?: string | null;
    }
    /**
     * Information on how frequently and when to run a query.
     */
    export interface Schema$QuerySchedule {
        /**
         * Datetime to periodically run the query until.
         */
        endTimeMs?: string | null;
        /**
         * How often the query is run.
         */
        frequency?: string | null;
        /**
         * Time of day at which a new report will be generated, represented as minutes past midnight. Range is 0 to 1439. Only applies to scheduled reports.
         */
        nextRunMinuteOfDay?: number | null;
        /**
         * Canonical timezone code for report generation time. Defaults to America/New_York.
         */
        nextRunTimezoneCode?: string | null;
    }
    /**
     * Represents a report.
     */
    export interface Schema$Report {
        /**
         * Key used to identify a report.
         */
        key?: Schema$ReportKey;
        /**
         * Report metadata.
         */
        metadata?: Schema$ReportMetadata;
        /**
         * Report parameters.
         */
        params?: Schema$Parameters;
    }
    /**
     * An explanation of a report failure.
     */
    export interface Schema$ReportFailure {
        /**
         * Error code that shows why the report was not created.
         */
        errorCode?: string | null;
    }
    /**
     * Key used to identify a report.
     */
    export interface Schema$ReportKey {
        /**
         * Query ID.
         */
        queryId?: string | null;
        /**
         * Report ID.
         */
        reportId?: string | null;
    }
    /**
     * Report metadata.
     */
    export interface Schema$ReportMetadata {
        /**
         * The path to the location in Google Cloud Storage where the report is stored.
         */
        googleCloudStoragePath?: string | null;
        /**
         * The ending time for the data that is shown in the report.
         */
        reportDataEndTimeMs?: string | null;
        /**
         * The starting time for the data that is shown in the report.
         */
        reportDataStartTimeMs?: string | null;
        /**
         * Report status.
         */
        status?: Schema$ReportStatus;
    }
    /**
     * Report status.
     */
    export interface Schema$ReportStatus {
        /**
         * If the report failed, this records the cause.
         */
        failure?: Schema$ReportFailure;
        /**
         * The time when this report either completed successfully or failed.
         */
        finishTimeMs?: string | null;
        /**
         * The file type of the report.
         */
        format?: string | null;
        /**
         * The state of the report.
         */
        state?: string | null;
    }
    /**
     * Represents the upload status of a row in the request.
     */
    export interface Schema$RowStatus {
        /**
         * Whether the stored entity is changed as a result of upload.
         */
        changed?: boolean | null;
        /**
         * Entity Id.
         */
        entityId?: string | null;
        /**
         * Entity name.
         */
        entityName?: string | null;
        /**
         * Reasons why the entity can&#39;t be uploaded.
         */
        errors?: string[] | null;
        /**
         * Whether the entity is persisted.
         */
        persisted?: boolean | null;
        /**
         * Row number.
         */
        rowNumber?: number | null;
    }
    /**
     * Request to run a stored query to generate a report.
     */
    export interface Schema$RunQueryRequest {
        /**
         * Report data range used to generate the report.
         */
        dataRange?: string | null;
        /**
         * The ending time for the data that is shown in the report. Note, reportDataEndTimeMs is required if dataRange is CUSTOM_DATES and ignored otherwise.
         */
        reportDataEndTimeMs?: string | null;
        /**
         * The starting time for the data that is shown in the report. Note, reportDataStartTimeMs is required if dataRange is CUSTOM_DATES and ignored otherwise.
         */
        reportDataStartTimeMs?: string | null;
        /**
         * Canonical timezone code for report data time. Defaults to America/New_York.
         */
        timezoneCode?: string | null;
    }
    /**
     * Request to upload line items.
     */
    export interface Schema$UploadLineItemsRequest {
        /**
         * Set to true to get upload status without actually persisting the line items.
         */
        dryRun?: boolean | null;
        /**
         * Format the line items are in. Default to CSV.
         */
        format?: string | null;
        /**
         * Line items in CSV to upload. Refer to  Entity Write File Format for more information on file format.
         */
        lineItems?: string | null;
    }
    /**
     * Upload line items response.
     */
    export interface Schema$UploadLineItemsResponse {
        /**
         * Status of upload.
         */
        uploadStatus?: Schema$UploadStatus;
    }
    /**
     * Represents the status of upload.
     */
    export interface Schema$UploadStatus {
        /**
         * Reasons why upload can&#39;t be completed.
         */
        errors?: string[] | null;
        /**
         * Per-row upload status.
         */
        rowStatus?: Schema$RowStatus[];
    }
    export class Resource$Lineitems {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * doubleclickbidmanager.lineitems.downloadlineitems
         * @desc Retrieves line items in CSV format. TrueView line items are not supported.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/doubleclickbidmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const doubleclickbidmanager = google.doubleclickbidmanager('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/doubleclickbidmanager'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await doubleclickbidmanager.lineitems.downloadlineitems({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "fileSpec": "my_fileSpec",
         *       //   "filterIds": [],
         *       //   "filterType": "my_filterType",
         *       //   "format": "my_format"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "lineItems": "my_lineItems"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias doubleclickbidmanager.lineitems.downloadlineitems
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().DownloadLineItemsRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        downloadlineitems(params: Params$Resource$Lineitems$Downloadlineitems, options: StreamMethodOptions): GaxiosPromise<Readable>;
        downloadlineitems(params?: Params$Resource$Lineitems$Downloadlineitems, options?: MethodOptions): GaxiosPromise<Schema$DownloadLineItemsResponse>;
        downloadlineitems(params: Params$Resource$Lineitems$Downloadlineitems, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        downloadlineitems(params: Params$Resource$Lineitems$Downloadlineitems, options: MethodOptions | BodyResponseCallback<Schema$DownloadLineItemsResponse>, callback: BodyResponseCallback<Schema$DownloadLineItemsResponse>): void;
        downloadlineitems(params: Params$Resource$Lineitems$Downloadlineitems, callback: BodyResponseCallback<Schema$DownloadLineItemsResponse>): void;
        downloadlineitems(callback: BodyResponseCallback<Schema$DownloadLineItemsResponse>): void;
        /**
         * doubleclickbidmanager.lineitems.uploadlineitems
         * @desc Uploads line items in CSV format. TrueView line items are not supported.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/doubleclickbidmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const doubleclickbidmanager = google.doubleclickbidmanager('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/doubleclickbidmanager'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await doubleclickbidmanager.lineitems.uploadlineitems({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "dryRun": false,
         *       //   "format": "my_format",
         *       //   "lineItems": "my_lineItems"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "uploadStatus": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias doubleclickbidmanager.lineitems.uploadlineitems
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().UploadLineItemsRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        uploadlineitems(params: Params$Resource$Lineitems$Uploadlineitems, options: StreamMethodOptions): GaxiosPromise<Readable>;
        uploadlineitems(params?: Params$Resource$Lineitems$Uploadlineitems, options?: MethodOptions): GaxiosPromise<Schema$UploadLineItemsResponse>;
        uploadlineitems(params: Params$Resource$Lineitems$Uploadlineitems, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        uploadlineitems(params: Params$Resource$Lineitems$Uploadlineitems, options: MethodOptions | BodyResponseCallback<Schema$UploadLineItemsResponse>, callback: BodyResponseCallback<Schema$UploadLineItemsResponse>): void;
        uploadlineitems(params: Params$Resource$Lineitems$Uploadlineitems, callback: BodyResponseCallback<Schema$UploadLineItemsResponse>): void;
        uploadlineitems(callback: BodyResponseCallback<Schema$UploadLineItemsResponse>): void;
    }
    export interface Params$Resource$Lineitems$Downloadlineitems extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$DownloadLineItemsRequest;
    }
    export interface Params$Resource$Lineitems$Uploadlineitems extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$UploadLineItemsRequest;
    }
    export class Resource$Queries {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * doubleclickbidmanager.queries.createquery
         * @desc Creates a query.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/doubleclickbidmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const doubleclickbidmanager = google.doubleclickbidmanager('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/doubleclickbidmanager'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await doubleclickbidmanager.queries.createquery({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "kind": "my_kind",
         *       //   "metadata": {},
         *       //   "params": {},
         *       //   "queryId": "my_queryId",
         *       //   "reportDataEndTimeMs": "my_reportDataEndTimeMs",
         *       //   "reportDataStartTimeMs": "my_reportDataStartTimeMs",
         *       //   "schedule": {},
         *       //   "timezoneCode": "my_timezoneCode"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "kind": "my_kind",
         *   //   "metadata": {},
         *   //   "params": {},
         *   //   "queryId": "my_queryId",
         *   //   "reportDataEndTimeMs": "my_reportDataEndTimeMs",
         *   //   "reportDataStartTimeMs": "my_reportDataStartTimeMs",
         *   //   "schedule": {},
         *   //   "timezoneCode": "my_timezoneCode"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias doubleclickbidmanager.queries.createquery
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().Query} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        createquery(params: Params$Resource$Queries$Createquery, options: StreamMethodOptions): GaxiosPromise<Readable>;
        createquery(params?: Params$Resource$Queries$Createquery, options?: MethodOptions): GaxiosPromise<Schema$Query>;
        createquery(params: Params$Resource$Queries$Createquery, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        createquery(params: Params$Resource$Queries$Createquery, options: MethodOptions | BodyResponseCallback<Schema$Query>, callback: BodyResponseCallback<Schema$Query>): void;
        createquery(params: Params$Resource$Queries$Createquery, callback: BodyResponseCallback<Schema$Query>): void;
        createquery(callback: BodyResponseCallback<Schema$Query>): void;
        /**
         * doubleclickbidmanager.queries.deletequery
         * @desc Deletes a stored query as well as the associated stored reports.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/doubleclickbidmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const doubleclickbidmanager = google.doubleclickbidmanager('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/doubleclickbidmanager'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await doubleclickbidmanager.queries.deletequery({
         *     // Query ID to delete.
         *     queryId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias doubleclickbidmanager.queries.deletequery
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.queryId Query ID to delete.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        deletequery(params: Params$Resource$Queries$Deletequery, options: StreamMethodOptions): GaxiosPromise<Readable>;
        deletequery(params?: Params$Resource$Queries$Deletequery, options?: MethodOptions): GaxiosPromise<void>;
        deletequery(params: Params$Resource$Queries$Deletequery, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        deletequery(params: Params$Resource$Queries$Deletequery, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        deletequery(params: Params$Resource$Queries$Deletequery, callback: BodyResponseCallback<void>): void;
        deletequery(callback: BodyResponseCallback<void>): void;
        /**
         * doubleclickbidmanager.queries.getquery
         * @desc Retrieves a stored query.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/doubleclickbidmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const doubleclickbidmanager = google.doubleclickbidmanager('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/doubleclickbidmanager'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await doubleclickbidmanager.queries.getquery({
         *     // Query ID to retrieve.
         *     queryId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "kind": "my_kind",
         *   //   "metadata": {},
         *   //   "params": {},
         *   //   "queryId": "my_queryId",
         *   //   "reportDataEndTimeMs": "my_reportDataEndTimeMs",
         *   //   "reportDataStartTimeMs": "my_reportDataStartTimeMs",
         *   //   "schedule": {},
         *   //   "timezoneCode": "my_timezoneCode"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias doubleclickbidmanager.queries.getquery
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.queryId Query ID to retrieve.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getquery(params: Params$Resource$Queries$Getquery, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getquery(params?: Params$Resource$Queries$Getquery, options?: MethodOptions): GaxiosPromise<Schema$Query>;
        getquery(params: Params$Resource$Queries$Getquery, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getquery(params: Params$Resource$Queries$Getquery, options: MethodOptions | BodyResponseCallback<Schema$Query>, callback: BodyResponseCallback<Schema$Query>): void;
        getquery(params: Params$Resource$Queries$Getquery, callback: BodyResponseCallback<Schema$Query>): void;
        getquery(callback: BodyResponseCallback<Schema$Query>): void;
        /**
         * doubleclickbidmanager.queries.listqueries
         * @desc Retrieves stored queries.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/doubleclickbidmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const doubleclickbidmanager = google.doubleclickbidmanager('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/doubleclickbidmanager'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await doubleclickbidmanager.queries.listqueries({});
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "kind": "my_kind",
         *   //   "queries": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias doubleclickbidmanager.queries.listqueries
         * @memberOf! ()
         *
         * @param {object=} params Parameters for request
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        listqueries(params: Params$Resource$Queries$Listqueries, options: StreamMethodOptions): GaxiosPromise<Readable>;
        listqueries(params?: Params$Resource$Queries$Listqueries, options?: MethodOptions): GaxiosPromise<Schema$ListQueriesResponse>;
        listqueries(params: Params$Resource$Queries$Listqueries, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        listqueries(params: Params$Resource$Queries$Listqueries, options: MethodOptions | BodyResponseCallback<Schema$ListQueriesResponse>, callback: BodyResponseCallback<Schema$ListQueriesResponse>): void;
        listqueries(params: Params$Resource$Queries$Listqueries, callback: BodyResponseCallback<Schema$ListQueriesResponse>): void;
        listqueries(callback: BodyResponseCallback<Schema$ListQueriesResponse>): void;
        /**
         * doubleclickbidmanager.queries.runquery
         * @desc Runs a stored query to generate a report.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/doubleclickbidmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const doubleclickbidmanager = google.doubleclickbidmanager('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/doubleclickbidmanager'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await doubleclickbidmanager.queries.runquery({
         *     // Query ID to run.
         *     queryId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "dataRange": "my_dataRange",
         *       //   "reportDataEndTimeMs": "my_reportDataEndTimeMs",
         *       //   "reportDataStartTimeMs": "my_reportDataStartTimeMs",
         *       //   "timezoneCode": "my_timezoneCode"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias doubleclickbidmanager.queries.runquery
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.queryId Query ID to run.
         * @param {().RunQueryRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        runquery(params: Params$Resource$Queries$Runquery, options: StreamMethodOptions): GaxiosPromise<Readable>;
        runquery(params?: Params$Resource$Queries$Runquery, options?: MethodOptions): GaxiosPromise<void>;
        runquery(params: Params$Resource$Queries$Runquery, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        runquery(params: Params$Resource$Queries$Runquery, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        runquery(params: Params$Resource$Queries$Runquery, callback: BodyResponseCallback<void>): void;
        runquery(callback: BodyResponseCallback<void>): void;
    }
    export interface Params$Resource$Queries$Createquery extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$Query;
    }
    export interface Params$Resource$Queries$Deletequery extends StandardParameters {
        /**
         * Query ID to delete.
         */
        queryId?: string;
    }
    export interface Params$Resource$Queries$Getquery extends StandardParameters {
        /**
         * Query ID to retrieve.
         */
        queryId?: string;
    }
    export interface Params$Resource$Queries$Listqueries extends StandardParameters {
    }
    export interface Params$Resource$Queries$Runquery extends StandardParameters {
        /**
         * Query ID to run.
         */
        queryId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$RunQueryRequest;
    }
    export class Resource$Reports {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * doubleclickbidmanager.reports.listreports
         * @desc Retrieves stored reports.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/doubleclickbidmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const doubleclickbidmanager = google.doubleclickbidmanager('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/doubleclickbidmanager'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await doubleclickbidmanager.reports.listreports({
         *     // Query ID with which the reports are associated.
         *     queryId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "kind": "my_kind",
         *   //   "reports": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias doubleclickbidmanager.reports.listreports
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.queryId Query ID with which the reports are associated.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        listreports(params: Params$Resource$Reports$Listreports, options: StreamMethodOptions): GaxiosPromise<Readable>;
        listreports(params?: Params$Resource$Reports$Listreports, options?: MethodOptions): GaxiosPromise<Schema$ListReportsResponse>;
        listreports(params: Params$Resource$Reports$Listreports, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        listreports(params: Params$Resource$Reports$Listreports, options: MethodOptions | BodyResponseCallback<Schema$ListReportsResponse>, callback: BodyResponseCallback<Schema$ListReportsResponse>): void;
        listreports(params: Params$Resource$Reports$Listreports, callback: BodyResponseCallback<Schema$ListReportsResponse>): void;
        listreports(callback: BodyResponseCallback<Schema$ListReportsResponse>): void;
    }
    export interface Params$Resource$Reports$Listreports extends StandardParameters {
        /**
         * Query ID with which the reports are associated.
         */
        queryId?: string;
    }
    export class Resource$Sdf {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * doubleclickbidmanager.sdf.download
         * @desc Retrieves entities in SDF format.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/doubleclickbidmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const doubleclickbidmanager = google.doubleclickbidmanager('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/doubleclickbidmanager'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await doubleclickbidmanager.sdf.download({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "fileTypes": [],
         *       //   "filterIds": [],
         *       //   "filterType": "my_filterType",
         *       //   "version": "my_version"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "adGroups": "my_adGroups",
         *   //   "ads": "my_ads",
         *   //   "campaigns": "my_campaigns",
         *   //   "insertionOrders": "my_insertionOrders",
         *   //   "inventorySources": "my_inventorySources",
         *   //   "lineItems": "my_lineItems"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias doubleclickbidmanager.sdf.download
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().DownloadRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        download(params: Params$Resource$Sdf$Download, options: StreamMethodOptions): GaxiosPromise<Readable>;
        download(params?: Params$Resource$Sdf$Download, options?: MethodOptions): GaxiosPromise<Schema$DownloadResponse>;
        download(params: Params$Resource$Sdf$Download, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        download(params: Params$Resource$Sdf$Download, options: MethodOptions | BodyResponseCallback<Schema$DownloadResponse>, callback: BodyResponseCallback<Schema$DownloadResponse>): void;
        download(params: Params$Resource$Sdf$Download, callback: BodyResponseCallback<Schema$DownloadResponse>): void;
        download(callback: BodyResponseCallback<Schema$DownloadResponse>): void;
    }
    export interface Params$Resource$Sdf$Download extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$DownloadRequest;
    }
    export {};
}
