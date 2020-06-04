/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace doubleclicksearch_v2 {
    export interface Options extends GlobalOptions {
        version: 'v2';
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
     * Search Ads 360 API
     *
     * Reports and modifies your advertising data in DoubleClick Search (for example, campaigns, ad groups, keywords, and conversions).
     *
     * @example
     * const {google} = require('googleapis');
     * const doubleclicksearch = google.doubleclicksearch('v2');
     *
     * @namespace doubleclicksearch
     * @type {Function}
     * @version v2
     * @variation v2
     * @param {object=} options Options for Doubleclicksearch
     */
    export class Doubleclicksearch {
        context: APIRequestContext;
        conversion: Resource$Conversion;
        reports: Resource$Reports;
        savedColumns: Resource$Savedcolumns;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    /**
     * A message containing availability data relevant to DoubleClick Search.
     */
    export interface Schema$Availability {
        /**
         * DS advertiser ID.
         */
        advertiserId?: string | null;
        /**
         * DS agency ID.
         */
        agencyId?: string | null;
        /**
         * The time by which all conversions have been uploaded, in epoch millis UTC.
         */
        availabilityTimestamp?: string | null;
        /**
         * The numeric segmentation identifier (for example, DoubleClick Search Floodlight activity ID).
         */
        segmentationId?: string | null;
        /**
         * The friendly segmentation identifier (for example, DoubleClick Search Floodlight activity name).
         */
        segmentationName?: string | null;
        /**
         * The segmentation type that this availability is for (its default value is FLOODLIGHT).
         */
        segmentationType?: string | null;
    }
    /**
     * A conversion containing data relevant to DoubleClick Search.
     */
    export interface Schema$Conversion {
        /**
         * DS ad group ID.
         */
        adGroupId?: string | null;
        /**
         * DS ad ID.
         */
        adId?: string | null;
        /**
         * DS advertiser ID.
         */
        advertiserId?: string | null;
        /**
         * DS agency ID.
         */
        agencyId?: string | null;
        /**
         * Available to advertisers only after contacting DoubleClick Search customer support.
         */
        attributionModel?: string | null;
        /**
         * DS campaign ID.
         */
        campaignId?: string | null;
        /**
         * Sales channel for the product. Acceptable values are:   - &quot;local&quot;: a physical store  - &quot;online&quot;: an online store
         */
        channel?: string | null;
        /**
         * DS click ID for the conversion.
         */
        clickId?: string | null;
        /**
         * For offline conversions, advertisers provide this ID. Advertisers can specify any ID that is meaningful to them. Each conversion in a request must specify a unique ID, and the combination of ID and timestamp must be unique amongst all conversions within the advertiser. For online conversions, DS copies the dsConversionId or floodlightOrderId into this property depending on the advertiser&#39;s Floodlight instructions.
         */
        conversionId?: string | null;
        /**
         * The time at which the conversion was last modified, in epoch millis UTC.
         */
        conversionModifiedTimestamp?: string | null;
        /**
         * The time at which the conversion took place, in epoch millis UTC.
         */
        conversionTimestamp?: string | null;
        /**
         * Available to advertisers only after contacting DoubleClick Search customer support.
         */
        countMillis?: string | null;
        /**
         * DS criterion (keyword) ID.
         */
        criterionId?: string | null;
        /**
         * The currency code for the conversion&#39;s revenue. Should be in ISO 4217 alphabetic (3-char) format.
         */
        currencyCode?: string | null;
        /**
         * Custom dimensions for the conversion, which can be used to filter data in a report.
         */
        customDimension?: Schema$CustomDimension[];
        /**
         * Custom metrics for the conversion.
         */
        customMetric?: Schema$CustomMetric[];
        /**
         * The type of device on which the conversion occurred.
         */
        deviceType?: string | null;
        /**
         * ID that DoubleClick Search generates for each conversion.
         */
        dsConversionId?: string | null;
        /**
         * DS engine account ID.
         */
        engineAccountId?: string | null;
        /**
         * The Floodlight order ID provided by the advertiser for the conversion.
         */
        floodlightOrderId?: string | null;
        /**
         * ID that DS generates and uses to uniquely identify the inventory account that contains the product.
         */
        inventoryAccountId?: string | null;
        /**
         * The country registered for the Merchant Center feed that contains the product. Use an ISO 3166 code to specify a country.
         */
        productCountry?: string | null;
        /**
         * DS product group ID.
         */
        productGroupId?: string | null;
        /**
         * The product ID (SKU).
         */
        productId?: string | null;
        /**
         * The language registered for the Merchant Center feed that contains the product. Use an ISO 639 code to specify a language.
         */
        productLanguage?: string | null;
        /**
         * The quantity of this conversion, in millis.
         */
        quantityMillis?: string | null;
        /**
         * The revenue amount of this TRANSACTION conversion, in micros (value multiplied by 1000000, no decimal). For example, to specify a revenue value of &quot;10&quot; enter &quot;10000000&quot; (10 million) in your request.
         */
        revenueMicros?: string | null;
        /**
         * The numeric segmentation identifier (for example, DoubleClick Search Floodlight activity ID).
         */
        segmentationId?: string | null;
        /**
         * The friendly segmentation identifier (for example, DoubleClick Search Floodlight activity name).
         */
        segmentationName?: string | null;
        /**
         * The segmentation type of this conversion (for example, FLOODLIGHT).
         */
        segmentationType?: string | null;
        /**
         * The state of the conversion, that is, either ACTIVE or REMOVED. Note: state DELETED is deprecated.
         */
        state?: string | null;
        /**
         * The ID of the local store for which the product was advertised. Applicable only when the channel is &quot;local&quot;.
         */
        storeId?: string | null;
        /**
         * The type of the conversion, that is, either ACTION or TRANSACTION. An ACTION conversion is an action by the user that has no monetarily quantifiable value, while a TRANSACTION conversion is an action that does have a monetarily quantifiable value. Examples are email list signups (ACTION) versus ecommerce purchases (TRANSACTION).
         */
        type?: string | null;
    }
    /**
     * A list of conversions.
     */
    export interface Schema$ConversionList {
        /**
         * The conversions being requested.
         */
        conversion?: Schema$Conversion[];
        /**
         * Identifies this as a ConversionList resource. Value: the fixed string doubleclicksearch#conversionList.
         */
        kind?: string | null;
    }
    /**
     * A message containing the custome dimension.
     */
    export interface Schema$CustomDimension {
        /**
         * Custom dimension name.
         */
        name?: string | null;
        /**
         * Custom dimension value.
         */
        value?: string | null;
    }
    /**
     * A message containing the custome metric.
     */
    export interface Schema$CustomMetric {
        /**
         * Custom metric name.
         */
        name?: string | null;
        /**
         * Custom metric numeric value.
         */
        value?: number | null;
    }
    /**
     * A DoubleClick Search report. This object contains the report request, some report metadata such as currency code, and the generated report rows or report files.
     */
    export interface Schema$Report {
        /**
         * Asynchronous report only. Contains a list of generated report files once the report has successfully completed.
         */
        files?: Array<{
            byteCount?: string;
            url?: string;
        }> | null;
        /**
         * Asynchronous report only. Id of the report.
         */
        id?: string | null;
        /**
         * Asynchronous report only. True if and only if the report has completed successfully and the report files are ready to be downloaded.
         */
        isReportReady?: boolean | null;
        /**
         * Identifies this as a Report resource. Value: the fixed string doubleclicksearch#report.
         */
        kind?: string | null;
        /**
         * The request that created the report. Optional fields not specified in the original request are filled with default values.
         */
        request?: Schema$ReportRequest;
        /**
         * The number of report rows generated by the report, not including headers.
         */
        rowCount?: number | null;
        /**
         * Synchronous report only. Generated report rows.
         */
        rows?: Schema$ReportRow[];
        /**
         * The currency code of all monetary values produced in the report, including values that are set by users (e.g., keyword bid settings) and metrics (e.g., cost and revenue). The currency code of a report is determined by the statisticsCurrency field of the report request.
         */
        statisticsCurrencyCode?: string | null;
        /**
         * If all statistics of the report are sourced from the same time zone, this would be it. Otherwise the field is unset.
         */
        statisticsTimeZone?: string | null;
    }
    /**
     * A request object used to create a DoubleClick Search report.
     */
    export interface Schema$ReportApiColumnSpec {
        /**
         * Name of a DoubleClick Search column to include in the report.
         */
        columnName?: string | null;
        /**
         * Segments a report by a custom dimension. The report must be scoped to an advertiser or lower, and the custom dimension must already be set up in DoubleClick Search. The custom dimension name, which appears in DoubleClick Search, is case sensitive. If used in a conversion report, returns the value of the specified custom dimension for the given conversion, if set. This column does not segment the conversion report.
         */
        customDimensionName?: string | null;
        /**
         * Name of a custom metric to include in the report. The report must be scoped to an advertiser or lower, and the custom metric must already be set up in DoubleClick Search. The custom metric name, which appears in DoubleClick Search, is case sensitive.
         */
        customMetricName?: string | null;
        /**
         * Inclusive day in YYYY-MM-DD format. When provided, this overrides the overall time range of the report for this column only. Must be provided together with startDate.
         */
        endDate?: string | null;
        /**
         * Synchronous report only. Set to true to group by this column. Defaults to false.
         */
        groupByColumn?: boolean | null;
        /**
         * Text used to identify this column in the report output; defaults to columnName or savedColumnName when not specified. This can be used to prevent collisions between DoubleClick Search columns and saved columns with the same name.
         */
        headerText?: string | null;
        /**
         * The platform that is used to provide data for the custom dimension. Acceptable values are &quot;floodlight&quot;.
         */
        platformSource?: string | null;
        /**
         * Returns metrics only for a specific type of product activity. Accepted values are:   - &quot;sold&quot;: returns metrics only for products that were sold  - &quot;advertised&quot;: returns metrics only for products that were advertised in a Shopping campaign, and that might or might not have been sold
         */
        productReportPerspective?: string | null;
        /**
         * Name of a saved column to include in the report. The report must be scoped at advertiser or lower, and this saved column must already be created in the DoubleClick Search UI.
         */
        savedColumnName?: string | null;
        /**
         * Inclusive date in YYYY-MM-DD format. When provided, this overrides the overall time range of the report for this column only. Must be provided together with endDate.
         */
        startDate?: string | null;
    }
    /**
     * A request object used to create a DoubleClick Search report.
     */
    export interface Schema$ReportRequest {
        /**
         * The columns to include in the report. This includes both DoubleClick Search columns and saved columns. For DoubleClick Search columns, only the columnName parameter is required. For saved columns only the savedColumnName parameter is required. Both columnName and savedColumnName cannot be set in the same stanza. The maximum number of columns per request is 300.
         */
        columns?: Schema$ReportApiColumnSpec[];
        /**
         * Format that the report should be returned in. Currently csv or tsv is supported.
         */
        downloadFormat?: string | null;
        /**
         * A list of filters to be applied to the report. The maximum number of filters per request is 300.
         */
        filters?: Array<{
            column?: Schema$ReportApiColumnSpec;
            operator?: string;
            values?: any[];
        }> | null;
        /**
         * Determines if removed entities should be included in the report. Defaults to false. Deprecated, please use includeRemovedEntities instead.
         */
        includeDeletedEntities?: boolean | null;
        /**
         * Determines if removed entities should be included in the report. Defaults to false.
         */
        includeRemovedEntities?: boolean | null;
        /**
         * Asynchronous report only. The maximum number of rows per report file. A large report is split into many files based on this field. Acceptable values are 1000000 to 100000000, inclusive.
         */
        maxRowsPerFile?: number | null;
        /**
         * Synchronous report only. A list of columns and directions defining sorting to be performed on the report rows. The maximum number of orderings per request is 300.
         */
        orderBy?: Array<{
            column?: Schema$ReportApiColumnSpec;
            sortOrder?: string;
        }> | null;
        /**
         * The reportScope is a set of IDs that are used to determine which subset of entities will be returned in the report. The full lineage of IDs from the lowest scoped level desired up through agency is required.
         */
        reportScope?: {
            adGroupId?: string;
            adId?: string;
            advertiserId?: string;
            agencyId?: string;
            campaignId?: string;
            engineAccountId?: string;
            keywordId?: string;
        } | null;
        /**
         * Determines the type of rows that are returned in the report. For example, if you specify reportType: keyword, each row in the report will contain data about a keyword. See the Types of Reports reference for the columns that are available for each type.
         */
        reportType?: string | null;
        /**
         * Synchronous report only. The maximum number of rows to return; additional rows are dropped. Acceptable values are 0 to 10000, inclusive. Defaults to 10000.
         */
        rowCount?: number | null;
        /**
         * Synchronous report only. Zero-based index of the first row to return. Acceptable values are 0 to 50000, inclusive. Defaults to 0.
         */
        startRow?: number | null;
        /**
         * Specifies the currency in which monetary will be returned. Possible values are: usd, agency (valid if the report is scoped to agency or lower), advertiser (valid if the report is scoped to * advertiser or lower), or account (valid if the report is scoped to engine account or lower).
         */
        statisticsCurrency?: string | null;
        /**
         * If metrics are requested in a report, this argument will be used to restrict the metrics to a specific time range.
         */
        timeRange?: {
            changedAttributesSinceTimestamp?: string;
            changedMetricsSinceTimestamp?: string;
            endDate?: string;
            startDate?: string;
        } | null;
        /**
         * If true, the report would only be created if all the requested stat data are sourced from a single timezone. Defaults to false.
         */
        verifySingleTimeZone?: boolean | null;
    }
    /**
     * A row in a DoubleClick Search report.
     */
    export interface Schema$ReportRow {
    }
    /**
     * A saved column
     */
    export interface Schema$SavedColumn {
        /**
         * Identifies this as a SavedColumn resource. Value: the fixed string doubleclicksearch#savedColumn.
         */
        kind?: string | null;
        /**
         * The name of the saved column.
         */
        savedColumnName?: string | null;
        /**
         * The type of data this saved column will produce.
         */
        type?: string | null;
    }
    /**
     * A list of saved columns. Advertisers create saved columns to report on Floodlight activities, Google Analytics goals, or custom KPIs. To request reports with saved columns, you&#39;ll need the saved column names that are available from this list.
     */
    export interface Schema$SavedColumnList {
        /**
         * The saved columns being requested.
         */
        items?: Schema$SavedColumn[];
        /**
         * Identifies this as a SavedColumnList resource. Value: the fixed string doubleclicksearch#savedColumnList.
         */
        kind?: string | null;
    }
    /**
     * The request to update availability.
     */
    export interface Schema$UpdateAvailabilityRequest {
        /**
         * The availabilities being requested.
         */
        availabilities?: Schema$Availability[];
    }
    /**
     * The response to a update availability request.
     */
    export interface Schema$UpdateAvailabilityResponse {
        /**
         * The availabilities being returned.
         */
        availabilities?: Schema$Availability[];
    }
    export class Resource$Conversion {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * doubleclicksearch.conversion.get
         * @desc Retrieves a list of conversions from a DoubleClick Search engine account.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/doubleclicksearch.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const doubleclicksearch = google.doubleclicksearch('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/doubleclicksearch'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await doubleclicksearch.conversion.get({
         *     // Numeric ID of the ad group.
         *     adGroupId: 'placeholder-value',
         *     // Numeric ID of the ad.
         *     adId: 'placeholder-value',
         *     // Numeric ID of the advertiser.
         *     advertiserId: 'placeholder-value',
         *     // Numeric ID of the agency.
         *     agencyId: 'placeholder-value',
         *     // Numeric ID of the campaign.
         *     campaignId: 'placeholder-value',
         *     // Numeric ID of the criterion.
         *     criterionId: 'placeholder-value',
         *     // Last date (inclusive) on which to retrieve conversions. Format is yyyymmdd.
         *     endDate: 'placeholder-value',
         *     // Numeric ID of the engine account.
         *     engineAccountId: 'placeholder-value',
         *     // The number of conversions to return per call.
         *     rowCount: 'placeholder-value',
         *     // First date (inclusive) on which to retrieve conversions. Format is yyyymmdd.
         *     startDate: 'placeholder-value',
         *     // The 0-based starting index for retrieving conversions results.
         *     startRow: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "conversion": [],
         *   //   "kind": "my_kind"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias doubleclicksearch.conversion.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.adGroupId Numeric ID of the ad group.
         * @param {string=} params.adId Numeric ID of the ad.
         * @param {string} params.advertiserId Numeric ID of the advertiser.
         * @param {string} params.agencyId Numeric ID of the agency.
         * @param {string=} params.campaignId Numeric ID of the campaign.
         * @param {string=} params.criterionId Numeric ID of the criterion.
         * @param {integer} params.endDate Last date (inclusive) on which to retrieve conversions. Format is yyyymmdd.
         * @param {string} params.engineAccountId Numeric ID of the engine account.
         * @param {integer} params.rowCount The number of conversions to return per call.
         * @param {integer} params.startDate First date (inclusive) on which to retrieve conversions. Format is yyyymmdd.
         * @param {integer} params.startRow The 0-based starting index for retrieving conversions results.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Conversion$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Conversion$Get, options?: MethodOptions): GaxiosPromise<Schema$ConversionList>;
        get(params: Params$Resource$Conversion$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Conversion$Get, options: MethodOptions | BodyResponseCallback<Schema$ConversionList>, callback: BodyResponseCallback<Schema$ConversionList>): void;
        get(params: Params$Resource$Conversion$Get, callback: BodyResponseCallback<Schema$ConversionList>): void;
        get(callback: BodyResponseCallback<Schema$ConversionList>): void;
        /**
         * doubleclicksearch.conversion.insert
         * @desc Inserts a batch of new conversions into DoubleClick Search.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/doubleclicksearch.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const doubleclicksearch = google.doubleclicksearch('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/doubleclicksearch'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await doubleclicksearch.conversion.insert({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "conversion": [],
         *       //   "kind": "my_kind"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "conversion": [],
         *   //   "kind": "my_kind"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias doubleclicksearch.conversion.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().ConversionList} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Conversion$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Conversion$Insert, options?: MethodOptions): GaxiosPromise<Schema$ConversionList>;
        insert(params: Params$Resource$Conversion$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Conversion$Insert, options: MethodOptions | BodyResponseCallback<Schema$ConversionList>, callback: BodyResponseCallback<Schema$ConversionList>): void;
        insert(params: Params$Resource$Conversion$Insert, callback: BodyResponseCallback<Schema$ConversionList>): void;
        insert(callback: BodyResponseCallback<Schema$ConversionList>): void;
        /**
         * doubleclicksearch.conversion.update
         * @desc Updates a batch of conversions in DoubleClick Search.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/doubleclicksearch.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const doubleclicksearch = google.doubleclicksearch('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/doubleclicksearch'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await doubleclicksearch.conversion.update({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "conversion": [],
         *       //   "kind": "my_kind"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "conversion": [],
         *   //   "kind": "my_kind"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias doubleclicksearch.conversion.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().ConversionList} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Conversion$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Conversion$Update, options?: MethodOptions): GaxiosPromise<Schema$ConversionList>;
        update(params: Params$Resource$Conversion$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Conversion$Update, options: MethodOptions | BodyResponseCallback<Schema$ConversionList>, callback: BodyResponseCallback<Schema$ConversionList>): void;
        update(params: Params$Resource$Conversion$Update, callback: BodyResponseCallback<Schema$ConversionList>): void;
        update(callback: BodyResponseCallback<Schema$ConversionList>): void;
        /**
         * doubleclicksearch.conversion.updateAvailability
         * @desc Updates the availabilities of a batch of floodlight activities in DoubleClick Search.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/doubleclicksearch.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const doubleclicksearch = google.doubleclicksearch('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/doubleclicksearch'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await doubleclicksearch.conversion.updateAvailability({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "availabilities": []
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "availabilities": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias doubleclicksearch.conversion.updateAvailability
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().UpdateAvailabilityRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        updateAvailability(params: Params$Resource$Conversion$Updateavailability, options: StreamMethodOptions): GaxiosPromise<Readable>;
        updateAvailability(params?: Params$Resource$Conversion$Updateavailability, options?: MethodOptions): GaxiosPromise<Schema$UpdateAvailabilityResponse>;
        updateAvailability(params: Params$Resource$Conversion$Updateavailability, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        updateAvailability(params: Params$Resource$Conversion$Updateavailability, options: MethodOptions | BodyResponseCallback<Schema$UpdateAvailabilityResponse>, callback: BodyResponseCallback<Schema$UpdateAvailabilityResponse>): void;
        updateAvailability(params: Params$Resource$Conversion$Updateavailability, callback: BodyResponseCallback<Schema$UpdateAvailabilityResponse>): void;
        updateAvailability(callback: BodyResponseCallback<Schema$UpdateAvailabilityResponse>): void;
    }
    export interface Params$Resource$Conversion$Get extends StandardParameters {
        /**
         * Numeric ID of the ad group.
         */
        adGroupId?: string;
        /**
         * Numeric ID of the ad.
         */
        adId?: string;
        /**
         * Numeric ID of the advertiser.
         */
        advertiserId?: string;
        /**
         * Numeric ID of the agency.
         */
        agencyId?: string;
        /**
         * Numeric ID of the campaign.
         */
        campaignId?: string;
        /**
         * Numeric ID of the criterion.
         */
        criterionId?: string;
        /**
         * Last date (inclusive) on which to retrieve conversions. Format is yyyymmdd.
         */
        endDate?: number;
        /**
         * Numeric ID of the engine account.
         */
        engineAccountId?: string;
        /**
         * The number of conversions to return per call.
         */
        rowCount?: number;
        /**
         * First date (inclusive) on which to retrieve conversions. Format is yyyymmdd.
         */
        startDate?: number;
        /**
         * The 0-based starting index for retrieving conversions results.
         */
        startRow?: number;
    }
    export interface Params$Resource$Conversion$Insert extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$ConversionList;
    }
    export interface Params$Resource$Conversion$Update extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$ConversionList;
    }
    export interface Params$Resource$Conversion$Updateavailability extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$UpdateAvailabilityRequest;
    }
    export class Resource$Reports {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * doubleclicksearch.reports.generate
         * @desc Generates and returns a report immediately.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/doubleclicksearch.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const doubleclicksearch = google.doubleclicksearch('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/doubleclicksearch'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await doubleclicksearch.reports.generate({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "columns": [],
         *       //   "downloadFormat": "my_downloadFormat",
         *       //   "filters": [],
         *       //   "includeDeletedEntities": false,
         *       //   "includeRemovedEntities": false,
         *       //   "maxRowsPerFile": 0,
         *       //   "orderBy": [],
         *       //   "reportScope": {},
         *       //   "reportType": "my_reportType",
         *       //   "rowCount": 0,
         *       //   "startRow": 0,
         *       //   "statisticsCurrency": "my_statisticsCurrency",
         *       //   "timeRange": {},
         *       //   "verifySingleTimeZone": false
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "files": [],
         *   //   "id": "my_id",
         *   //   "isReportReady": false,
         *   //   "kind": "my_kind",
         *   //   "request": {},
         *   //   "rowCount": 0,
         *   //   "rows": [],
         *   //   "statisticsCurrencyCode": "my_statisticsCurrencyCode",
         *   //   "statisticsTimeZone": "my_statisticsTimeZone"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias doubleclicksearch.reports.generate
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().ReportRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        generate(params: Params$Resource$Reports$Generate, options: StreamMethodOptions): GaxiosPromise<Readable>;
        generate(params?: Params$Resource$Reports$Generate, options?: MethodOptions): GaxiosPromise<Schema$Report>;
        generate(params: Params$Resource$Reports$Generate, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        generate(params: Params$Resource$Reports$Generate, options: MethodOptions | BodyResponseCallback<Schema$Report>, callback: BodyResponseCallback<Schema$Report>): void;
        generate(params: Params$Resource$Reports$Generate, callback: BodyResponseCallback<Schema$Report>): void;
        generate(callback: BodyResponseCallback<Schema$Report>): void;
        /**
         * doubleclicksearch.reports.get
         * @desc Polls for the status of a report request.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/doubleclicksearch.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const doubleclicksearch = google.doubleclicksearch('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/doubleclicksearch'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await doubleclicksearch.reports.get({
         *     // ID of the report request being polled.
         *     reportId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "files": [],
         *   //   "id": "my_id",
         *   //   "isReportReady": false,
         *   //   "kind": "my_kind",
         *   //   "request": {},
         *   //   "rowCount": 0,
         *   //   "rows": [],
         *   //   "statisticsCurrencyCode": "my_statisticsCurrencyCode",
         *   //   "statisticsTimeZone": "my_statisticsTimeZone"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias doubleclicksearch.reports.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.reportId ID of the report request being polled.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Reports$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Reports$Get, options?: MethodOptions): GaxiosPromise<Schema$Report>;
        get(params: Params$Resource$Reports$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Reports$Get, options: MethodOptions | BodyResponseCallback<Schema$Report>, callback: BodyResponseCallback<Schema$Report>): void;
        get(params: Params$Resource$Reports$Get, callback: BodyResponseCallback<Schema$Report>): void;
        get(callback: BodyResponseCallback<Schema$Report>): void;
        /**
         * doubleclicksearch.reports.getFile
         * @desc Downloads a report file encoded in UTF-8.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/doubleclicksearch.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const doubleclicksearch = google.doubleclicksearch('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/doubleclicksearch'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await doubleclicksearch.reports.getFile({
         *     // The index of the report fragment to download.
         *     reportFragment: 'placeholder-value',
         *     // ID of the report.
         *     reportId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias doubleclicksearch.reports.getFile
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer} params.reportFragment The index of the report fragment to download.
         * @param {string} params.reportId ID of the report.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getFile(params: Params$Resource$Reports$Getfile, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getFile(params?: Params$Resource$Reports$Getfile, options?: MethodOptions): GaxiosPromise<void>;
        getFile(params: Params$Resource$Reports$Getfile, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getFile(params: Params$Resource$Reports$Getfile, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        getFile(params: Params$Resource$Reports$Getfile, callback: BodyResponseCallback<void>): void;
        getFile(callback: BodyResponseCallback<void>): void;
        /**
         * doubleclicksearch.reports.request
         * @desc Inserts a report request into the reporting system.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/doubleclicksearch.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const doubleclicksearch = google.doubleclicksearch('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/doubleclicksearch'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await doubleclicksearch.reports.request({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "columns": [],
         *       //   "downloadFormat": "my_downloadFormat",
         *       //   "filters": [],
         *       //   "includeDeletedEntities": false,
         *       //   "includeRemovedEntities": false,
         *       //   "maxRowsPerFile": 0,
         *       //   "orderBy": [],
         *       //   "reportScope": {},
         *       //   "reportType": "my_reportType",
         *       //   "rowCount": 0,
         *       //   "startRow": 0,
         *       //   "statisticsCurrency": "my_statisticsCurrency",
         *       //   "timeRange": {},
         *       //   "verifySingleTimeZone": false
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "files": [],
         *   //   "id": "my_id",
         *   //   "isReportReady": false,
         *   //   "kind": "my_kind",
         *   //   "request": {},
         *   //   "rowCount": 0,
         *   //   "rows": [],
         *   //   "statisticsCurrencyCode": "my_statisticsCurrencyCode",
         *   //   "statisticsTimeZone": "my_statisticsTimeZone"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias doubleclicksearch.reports.request
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().ReportRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        request(params: Params$Resource$Reports$Request, options: StreamMethodOptions): GaxiosPromise<Readable>;
        request(params?: Params$Resource$Reports$Request, options?: MethodOptions): GaxiosPromise<Schema$Report>;
        request(params: Params$Resource$Reports$Request, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        request(params: Params$Resource$Reports$Request, options: MethodOptions | BodyResponseCallback<Schema$Report>, callback: BodyResponseCallback<Schema$Report>): void;
        request(params: Params$Resource$Reports$Request, callback: BodyResponseCallback<Schema$Report>): void;
        request(callback: BodyResponseCallback<Schema$Report>): void;
    }
    export interface Params$Resource$Reports$Generate extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$ReportRequest;
    }
    export interface Params$Resource$Reports$Get extends StandardParameters {
        /**
         * ID of the report request being polled.
         */
        reportId?: string;
    }
    export interface Params$Resource$Reports$Getfile extends StandardParameters {
        /**
         * The index of the report fragment to download.
         */
        reportFragment?: number;
        /**
         * ID of the report.
         */
        reportId?: string;
    }
    export interface Params$Resource$Reports$Request extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$ReportRequest;
    }
    export class Resource$Savedcolumns {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * doubleclicksearch.savedColumns.list
         * @desc Retrieve the list of saved columns for a specified advertiser.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/doubleclicksearch.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const doubleclicksearch = google.doubleclicksearch('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/doubleclicksearch'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await doubleclicksearch.savedColumns.list({
         *     // DS ID of the advertiser.
         *     advertiserId: 'placeholder-value',
         *     // DS ID of the agency.
         *     agencyId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "items": [],
         *   //   "kind": "my_kind"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias doubleclicksearch.savedColumns.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.advertiserId DS ID of the advertiser.
         * @param {string} params.agencyId DS ID of the agency.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Savedcolumns$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Savedcolumns$List, options?: MethodOptions): GaxiosPromise<Schema$SavedColumnList>;
        list(params: Params$Resource$Savedcolumns$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Savedcolumns$List, options: MethodOptions | BodyResponseCallback<Schema$SavedColumnList>, callback: BodyResponseCallback<Schema$SavedColumnList>): void;
        list(params: Params$Resource$Savedcolumns$List, callback: BodyResponseCallback<Schema$SavedColumnList>): void;
        list(callback: BodyResponseCallback<Schema$SavedColumnList>): void;
    }
    export interface Params$Resource$Savedcolumns$List extends StandardParameters {
        /**
         * DS ID of the advertiser.
         */
        advertiserId?: string;
        /**
         * DS ID of the agency.
         */
        agencyId?: string;
    }
    export {};
}
