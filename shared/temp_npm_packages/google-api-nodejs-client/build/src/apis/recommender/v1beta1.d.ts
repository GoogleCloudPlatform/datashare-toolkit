/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace recommender_v1beta1 {
    export interface Options extends GlobalOptions {
        version: 'v1beta1';
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
     * Recommender API
     *
     *
     *
     * @example
     * const {google} = require('googleapis');
     * const recommender = google.recommender('v1beta1');
     *
     * @namespace recommender
     * @type {Function}
     * @version v1beta1
     * @variation v1beta1
     * @param {object=} options Options for Recommender
     */
    export class Recommender {
        context: APIRequestContext;
        projects: Resource$Projects;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    /**
     * Contains metadata about how much money a recommendation can save or incur.
     */
    export interface Schema$GoogleCloudRecommenderV1beta1CostProjection {
        /**
         * An approximate projection on amount saved or amount incurred. Negative cost units indicate cost savings and positive cost units indicate increase. See google.type.Money documentation for positive/negative units.
         */
        cost?: Schema$GoogleTypeMoney;
        /**
         * Duration for which this cost applies.
         */
        duration?: string | null;
    }
    /**
     * Contains the impact a recommendation can have for a given category.
     */
    export interface Schema$GoogleCloudRecommenderV1beta1Impact {
        /**
         * Category that is being targeted.
         */
        category?: string | null;
        /**
         * Use with CategoryType.COST
         */
        costProjection?: Schema$GoogleCloudRecommenderV1beta1CostProjection;
    }
    /**
     * An insight along with the information used to derive the insight. The insight may have associated recomendations as well.
     */
    export interface Schema$GoogleCloudRecommenderV1beta1Insight {
        /**
         * Recommendations derived from this insight.
         */
        associatedRecommendations?: Schema$GoogleCloudRecommenderV1beta1InsightRecommendationReference[];
        /**
         * Category being targeted by the insight.
         */
        category?: string | null;
        /**
         * A struct of custom fields to explain the insight. Example: &quot;grantedPermissionsCount&quot;: &quot;1000&quot;
         */
        content?: {
            [key: string]: any;
        } | null;
        /**
         * Free-form human readable summary in English. The maximum length is 500 characters.
         */
        description?: string | null;
        /**
         * Fingerprint of the Insight. Provides optimistic locking when updating states.
         */
        etag?: string | null;
        /**
         * Insight subtype. Insight content schema will be stable for a given subtype.
         */
        insightSubtype?: string | null;
        /**
         * Timestamp of the latest data used to generate the insight.
         */
        lastRefreshTime?: string | null;
        /**
         * Name of the insight.
         */
        name?: string | null;
        /**
         * Observation period that led to the insight. The source data used to generate the insight ends at last_refresh_time and begins at (last_refresh_time - observation_period).
         */
        observationPeriod?: string | null;
        /**
         * Information state and metadata.
         */
        stateInfo?: Schema$GoogleCloudRecommenderV1beta1InsightStateInfo;
        /**
         * Fully qualified resource names that this insight is targeting.
         */
        targetResources?: string[] | null;
    }
    /**
     * Reference to an associated recommendation.
     */
    export interface Schema$GoogleCloudRecommenderV1beta1InsightRecommendationReference {
        /**
         * Recommendation resource name, e.g. projects/[PROJECT_NUMBER]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/recommendations/[RECOMMENDATION_ID]
         */
        recommendation?: string | null;
    }
    /**
     * Information related to insight state.
     */
    export interface Schema$GoogleCloudRecommenderV1beta1InsightStateInfo {
        /**
         * Insight state.
         */
        state?: string | null;
        /**
         * A map of metadata for the state, provided by user or automations systems.
         */
        stateMetadata?: {
            [key: string]: string;
        } | null;
    }
    /**
     * Response to the `ListInsights` method.
     */
    export interface Schema$GoogleCloudRecommenderV1beta1ListInsightsResponse {
        /**
         * The set of insights for the `parent` resource.
         */
        insights?: Schema$GoogleCloudRecommenderV1beta1Insight[];
        /**
         * A token that can be used to request the next page of results. This field is empty if there are no additional results.
         */
        nextPageToken?: string | null;
    }
    /**
     * Response to the `ListRecommendations` method.
     */
    export interface Schema$GoogleCloudRecommenderV1beta1ListRecommendationsResponse {
        /**
         * A token that can be used to request the next page of results. This field is empty if there are no additional results.
         */
        nextPageToken?: string | null;
        /**
         * The set of recommendations for the `parent` resource.
         */
        recommendations?: Schema$GoogleCloudRecommenderV1beta1Recommendation[];
    }
    /**
     * Request for the `MarkInsightAccepted` method.
     */
    export interface Schema$GoogleCloudRecommenderV1beta1MarkInsightAcceptedRequest {
        /**
         * Required. Fingerprint of the Insight. Provides optimistic locking.
         */
        etag?: string | null;
        /**
         * Optional. State properties user wish to include with this state.  Full replace of the current state_metadata.
         */
        stateMetadata?: {
            [key: string]: string;
        } | null;
    }
    /**
     * Request for the `MarkRecommendationClaimed` Method.
     */
    export interface Schema$GoogleCloudRecommenderV1beta1MarkRecommendationClaimedRequest {
        /**
         * Required. Fingerprint of the Recommendation. Provides optimistic locking.
         */
        etag?: string | null;
        /**
         * State properties to include with this state. Overwrites any existing `state_metadata`. Keys must match the regex /^a-z0-9{0,62}$/. Values must match the regex /^[a-zA-Z0-9_./-]{0,255}$/.
         */
        stateMetadata?: {
            [key: string]: string;
        } | null;
    }
    /**
     * Request for the `MarkRecommendationFailed` Method.
     */
    export interface Schema$GoogleCloudRecommenderV1beta1MarkRecommendationFailedRequest {
        /**
         * Required. Fingerprint of the Recommendation. Provides optimistic locking.
         */
        etag?: string | null;
        /**
         * State properties to include with this state. Overwrites any existing `state_metadata`. Keys must match the regex /^a-z0-9{0,62}$/. Values must match the regex /^[a-zA-Z0-9_./-]{0,255}$/.
         */
        stateMetadata?: {
            [key: string]: string;
        } | null;
    }
    /**
     * Request for the `MarkRecommendationSucceeded` Method.
     */
    export interface Schema$GoogleCloudRecommenderV1beta1MarkRecommendationSucceededRequest {
        /**
         * Required. Fingerprint of the Recommendation. Provides optimistic locking.
         */
        etag?: string | null;
        /**
         * State properties to include with this state. Overwrites any existing `state_metadata`. Keys must match the regex /^a-z0-9{0,62}$/. Values must match the regex /^[a-zA-Z0-9_./-]{0,255}$/.
         */
        stateMetadata?: {
            [key: string]: string;
        } | null;
    }
    /**
     * Contains an operation for a resource loosely based on the JSON-PATCH format with support for:  * Custom filters for describing partial array patch. * Extended path values for describing nested arrays. * Custom fields for describing the resource for which the operation is being   described. * Allows extension to custom operations not natively supported by RFC6902. See https://tools.ietf.org/html/rfc6902 for details on the original RFC.
     */
    export interface Schema$GoogleCloudRecommenderV1beta1Operation {
        /**
         * Type of this operation. Contains one of &#39;and&#39;, &#39;remove&#39;, &#39;replace&#39;, &#39;move&#39;, &#39;copy&#39;, &#39;test&#39; and &#39;custom&#39; operations. This field is case-insensitive and always populated.
         */
        action?: string | null;
        /**
         * Path to the target field being operated on. If the operation is at the resource level, then path should be &quot;/&quot;. This field is always populated.
         */
        path?: string | null;
        /**
         * Set of filters to apply if `path` refers to array elements or nested array elements in order to narrow down to a single unique element that is being tested/modified. This is intended to be an exact match per filter. To perform advanced matching, use path_value_matchers.  * Example: {   &quot;/versions/x/name&quot; : &quot;it-123&quot;   &quot;/versions/x/targetSize/percent&quot;: 20   } * Example: {   &quot;/bindings/x/role&quot;: &quot;roles/admin&quot;   &quot;/bindings/x/condition&quot; : null   } * Example: {   &quot;/bindings/x/role&quot;: &quot;roles/admin&quot;   &quot;/bindings/x/members/*&quot; : [&quot;x@google.com&quot;, &quot;y@google.com&quot;]   } When both path_filters and path_value_matchers are set, an implicit AND must be performed.
         */
        pathFilters?: {
            [key: string]: any;
        } | null;
        /**
         * Similar to path_filters, this contains set of filters to apply if `path` field referes to array elements. This is meant to support value matching beyond exact match. To perform exact match, use path_filters. When both path_filters and path_value_matchers are set, an implicit AND must be performed.
         */
        pathValueMatchers?: {
            [key: string]: Schema$GoogleCloudRecommenderV1beta1ValueMatcher;
        } | null;
        /**
         * Contains the fully qualified resource name. This field is always populated. ex: //cloudresourcemanager.googleapis.com/projects/foo.
         */
        resource?: string | null;
        /**
         * Type of GCP resource being modified/tested. This field is always populated. Example: cloudresourcemanager.googleapis.com/Project, compute.googleapis.com/Instance
         */
        resourceType?: string | null;
        /**
         * Can be set with action &#39;copy&#39; or &#39;move&#39; to indicate the source field within resource or source_resource, ignored if provided for other operation types.
         */
        sourcePath?: string | null;
        /**
         * Can be set with action &#39;copy&#39; to copy resource configuration across different resources of the same type. Example: A resource clone can be done via action = &#39;copy&#39;, path = &quot;/&quot;, from = &quot;/&quot;, source_resource = &lt;source&gt; and resource_name = &lt;target&gt;. This field is empty for all other values of `action`.
         */
        sourceResource?: string | null;
        /**
         * Value for the `path` field. Will be set for actions:&#39;add&#39;/&#39;replace&#39;. Maybe set for action: &#39;test&#39;. Either this or `value_matcher` will be set for &#39;test&#39; operation. An exact match must be performed.
         */
        value?: any | null;
        /**
         * Can be set for action &#39;test&#39; for advanced matching for the value of &#39;path&#39; field. Either this or `value` will be set for &#39;test&#39; operation.
         */
        valueMatcher?: Schema$GoogleCloudRecommenderV1beta1ValueMatcher;
    }
    /**
     * Group of operations that need to be performed atomically.
     */
    export interface Schema$GoogleCloudRecommenderV1beta1OperationGroup {
        /**
         * List of operations across one or more resources that belong to this group. Loosely based on RFC6902 and should be performed in the order they appear.
         */
        operations?: Schema$GoogleCloudRecommenderV1beta1Operation[];
    }
    /**
     * A recommendation along with a suggested action. E.g., a rightsizing recommendation for an underutilized VM, IAM role recommendations, etc
     */
    export interface Schema$GoogleCloudRecommenderV1beta1Recommendation {
        /**
         * Optional set of additional impact that this recommendation may have when trying to optimize for the primary category. These may be positive or negative.
         */
        additionalImpact?: Schema$GoogleCloudRecommenderV1beta1Impact[];
        /**
         * Insights that led to this recommendation.
         */
        associatedInsights?: Schema$GoogleCloudRecommenderV1beta1RecommendationInsightReference[];
        /**
         * Content of the recommendation describing recommended changes to resources.
         */
        content?: Schema$GoogleCloudRecommenderV1beta1RecommendationContent;
        /**
         * Free-form human readable summary in English. The maximum length is 500 characters.
         */
        description?: string | null;
        /**
         * Fingerprint of the Recommendation. Provides optimistic locking when updating states.
         */
        etag?: string | null;
        /**
         * Last time this recommendation was refreshed by the system that created it in the first place.
         */
        lastRefreshTime?: string | null;
        /**
         * Name of recommendation.
         */
        name?: string | null;
        /**
         * The primary impact that this recommendation can have while trying to optimize for one category.
         */
        primaryImpact?: Schema$GoogleCloudRecommenderV1beta1Impact;
        /**
         * Contains an identifier for a subtype of recommendations produced for the same recommender. Subtype is a function of content and impact, meaning a new subtype might be added when significant changes to `content` or `primary_impact.category` are introduced. See the Recommenders section to see a list of subtypes for a given Recommender.  Examples:   For recommender = &quot;google.iam.policy.Recommender&quot;,   recommender_subtype can be one of &quot;REMOVE_ROLE&quot;/&quot;REPLACE_ROLE&quot;
         */
        recommenderSubtype?: string | null;
        /**
         * Information for state. Contains state and metadata.
         */
        stateInfo?: Schema$GoogleCloudRecommenderV1beta1RecommendationStateInfo;
    }
    /**
     * Contains what resources are changing and how they are changing.
     */
    export interface Schema$GoogleCloudRecommenderV1beta1RecommendationContent {
        /**
         * Operations to one or more Google Cloud resources grouped in such a way that, all operations within one group are expected to be performed atomically and in an order.
         */
        operationGroups?: Schema$GoogleCloudRecommenderV1beta1OperationGroup[];
    }
    /**
     * Reference to an associated insight.
     */
    export interface Schema$GoogleCloudRecommenderV1beta1RecommendationInsightReference {
        /**
         * Insight resource name, e.g. projects/[PROJECT_NUMBER]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/insights/[INSIGHT_ID]
         */
        insight?: string | null;
    }
    /**
     * Information for state. Contains state and metadata.
     */
    export interface Schema$GoogleCloudRecommenderV1beta1RecommendationStateInfo {
        /**
         * The state of the recommendation, Eg ACTIVE, SUCCEEDED, FAILED.
         */
        state?: string | null;
        /**
         * A map of metadata for the state, provided by user or automations systems.
         */
        stateMetadata?: {
            [key: string]: string;
        } | null;
    }
    /**
     * Contains various matching options for values for a GCP resource field.
     */
    export interface Schema$GoogleCloudRecommenderV1beta1ValueMatcher {
        /**
         * To be used for full regex matching. The regular expression is using the Google RE2 syntax (https://github.com/google/re2/wiki/Syntax), so to be used with RE2::FullMatch
         */
        matchesPattern?: string | null;
    }
    /**
     * Represents an amount of money with its currency type.
     */
    export interface Schema$GoogleTypeMoney {
        /**
         * The 3-letter currency code defined in ISO 4217.
         */
        currencyCode?: string | null;
        /**
         * Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.
         */
        nanos?: number | null;
        /**
         * The whole units of the amount. For example if `currencyCode` is `&quot;USD&quot;`, then 1 unit is one US dollar.
         */
        units?: string | null;
    }
    export class Resource$Projects {
        context: APIRequestContext;
        locations: Resource$Projects$Locations;
        constructor(context: APIRequestContext);
    }
    export class Resource$Projects$Locations {
        context: APIRequestContext;
        insightTypes: Resource$Projects$Locations$Insighttypes;
        recommenders: Resource$Projects$Locations$Recommenders;
        constructor(context: APIRequestContext);
    }
    export class Resource$Projects$Locations$Insighttypes {
        context: APIRequestContext;
        insights: Resource$Projects$Locations$Insighttypes$Insights;
        constructor(context: APIRequestContext);
    }
    export class Resource$Projects$Locations$Insighttypes$Insights {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * recommender.projects.locations.insightTypes.insights.get
         * @desc Gets the requested insight. Requires the recommender.*.get IAM permission for the specified insight type.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/recommender.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const recommender = google.recommender('v1beta1');
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
         *   const res = await recommender.projects.locations.insightTypes.insights.get({
         *     // Required. Name of the insight.
         *     name:
         *       'projects/my-project/locations/my-location/insightTypes/my-insightType/insights/my-insight',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "associatedRecommendations": [],
         *   //   "category": "my_category",
         *   //   "content": {},
         *   //   "description": "my_description",
         *   //   "etag": "my_etag",
         *   //   "insightSubtype": "my_insightSubtype",
         *   //   "lastRefreshTime": "my_lastRefreshTime",
         *   //   "name": "my_name",
         *   //   "observationPeriod": "my_observationPeriod",
         *   //   "stateInfo": {},
         *   //   "targetResources": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias recommender.projects.locations.insightTypes.insights.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. Name of the insight.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Locations$Insighttypes$Insights$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Locations$Insighttypes$Insights$Get, options?: MethodOptions): GaxiosPromise<Schema$GoogleCloudRecommenderV1beta1Insight>;
        get(params: Params$Resource$Projects$Locations$Insighttypes$Insights$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Locations$Insighttypes$Insights$Get, options: MethodOptions | BodyResponseCallback<Schema$GoogleCloudRecommenderV1beta1Insight>, callback: BodyResponseCallback<Schema$GoogleCloudRecommenderV1beta1Insight>): void;
        get(params: Params$Resource$Projects$Locations$Insighttypes$Insights$Get, callback: BodyResponseCallback<Schema$GoogleCloudRecommenderV1beta1Insight>): void;
        get(callback: BodyResponseCallback<Schema$GoogleCloudRecommenderV1beta1Insight>): void;
        /**
         * recommender.projects.locations.insightTypes.insights.list
         * @desc Lists insights for a Cloud project. Requires the recommender.*.list IAM permission for the specified insight type.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/recommender.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const recommender = google.recommender('v1beta1');
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
         *   const res = await recommender.projects.locations.insightTypes.insights.list({
         *     // Optional. Filter expression to restrict the insights returned. Supported
         *     // filter fields: state
         *     // Eg: `state:"DISMISSED" or state:"ACTIVE"
         *     filter: 'placeholder-value',
         *     // Optional. The maximum number of results to return from this request.  Non-positive
         *     // values are ignored. If not specified, the server will determine the number
         *     // of results to return.
         *     pageSize: 'placeholder-value',
         *     // Optional. If present, retrieves the next batch of results from the preceding call to
         *     // this method. `page_token` must be the value of `next_page_token` from the
         *     // previous response. The values of other method parameters must be identical
         *     // to those in the previous call.
         *     pageToken: 'placeholder-value',
         *     // Required. The container resource on which to execute the request.
         *     // Acceptable formats:
         *     //
         *     // 1.
         *     // "projects/[PROJECT_NUMBER]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]",
         *     //
         *     // LOCATION here refers to GCP Locations:
         *     // https://cloud.google.com/about/locations/
         *     parent:
         *       'projects/my-project/locations/my-location/insightTypes/my-insightType',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "insights": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias recommender.projects.locations.insightTypes.insights.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.filter Optional. Filter expression to restrict the insights returned. Supported filter fields: state Eg: `state:"DISMISSED" or state:"ACTIVE"
         * @param {integer=} params.pageSize Optional. The maximum number of results to return from this request.  Non-positive values are ignored. If not specified, the server will determine the number of results to return.
         * @param {string=} params.pageToken Optional. If present, retrieves the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of other method parameters must be identical to those in the previous call.
         * @param {string} params.parent Required. The container resource on which to execute the request. Acceptable formats:  1. "projects/[PROJECT_NUMBER]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]",  LOCATION here refers to GCP Locations: https://cloud.google.com/about/locations/
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Locations$Insighttypes$Insights$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Locations$Insighttypes$Insights$List, options?: MethodOptions): GaxiosPromise<Schema$GoogleCloudRecommenderV1beta1ListInsightsResponse>;
        list(params: Params$Resource$Projects$Locations$Insighttypes$Insights$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Locations$Insighttypes$Insights$List, options: MethodOptions | BodyResponseCallback<Schema$GoogleCloudRecommenderV1beta1ListInsightsResponse>, callback: BodyResponseCallback<Schema$GoogleCloudRecommenderV1beta1ListInsightsResponse>): void;
        list(params: Params$Resource$Projects$Locations$Insighttypes$Insights$List, callback: BodyResponseCallback<Schema$GoogleCloudRecommenderV1beta1ListInsightsResponse>): void;
        list(callback: BodyResponseCallback<Schema$GoogleCloudRecommenderV1beta1ListInsightsResponse>): void;
        /**
         * recommender.projects.locations.insightTypes.insights.markAccepted
         * @desc Marks the Insight State as Accepted. Users can use this method to indicate to the Recommender API that they have applied some action based on the insight. This stops the insight content from being updated.  MarkInsightAccepted can be applied to insights in ACTIVE state. Requires the recommender.*.update IAM permission for the specified insight.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/recommender.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const recommender = google.recommender('v1beta1');
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
         *   const res = await recommender.projects.locations.insightTypes.insights.markAccepted(
         *     {
         *       // Required. Name of the insight.
         *       name:
         *         'projects/my-project/locations/my-location/insightTypes/my-insightType/insights/my-insight',
         *
         *       // Request body metadata
         *       requestBody: {
         *         // request body parameters
         *         // {
         *         //   "etag": "my_etag",
         *         //   "stateMetadata": {}
         *         // }
         *       },
         *     }
         *   );
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "associatedRecommendations": [],
         *   //   "category": "my_category",
         *   //   "content": {},
         *   //   "description": "my_description",
         *   //   "etag": "my_etag",
         *   //   "insightSubtype": "my_insightSubtype",
         *   //   "lastRefreshTime": "my_lastRefreshTime",
         *   //   "name": "my_name",
         *   //   "observationPeriod": "my_observationPeriod",
         *   //   "stateInfo": {},
         *   //   "targetResources": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias recommender.projects.locations.insightTypes.insights.markAccepted
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. Name of the insight.
         * @param {().GoogleCloudRecommenderV1beta1MarkInsightAcceptedRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        markAccepted(params: Params$Resource$Projects$Locations$Insighttypes$Insights$Markaccepted, options: StreamMethodOptions): GaxiosPromise<Readable>;
        markAccepted(params?: Params$Resource$Projects$Locations$Insighttypes$Insights$Markaccepted, options?: MethodOptions): GaxiosPromise<Schema$GoogleCloudRecommenderV1beta1Insight>;
        markAccepted(params: Params$Resource$Projects$Locations$Insighttypes$Insights$Markaccepted, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        markAccepted(params: Params$Resource$Projects$Locations$Insighttypes$Insights$Markaccepted, options: MethodOptions | BodyResponseCallback<Schema$GoogleCloudRecommenderV1beta1Insight>, callback: BodyResponseCallback<Schema$GoogleCloudRecommenderV1beta1Insight>): void;
        markAccepted(params: Params$Resource$Projects$Locations$Insighttypes$Insights$Markaccepted, callback: BodyResponseCallback<Schema$GoogleCloudRecommenderV1beta1Insight>): void;
        markAccepted(callback: BodyResponseCallback<Schema$GoogleCloudRecommenderV1beta1Insight>): void;
    }
    export interface Params$Resource$Projects$Locations$Insighttypes$Insights$Get extends StandardParameters {
        /**
         * Required. Name of the insight.
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Locations$Insighttypes$Insights$List extends StandardParameters {
        /**
         * Optional. Filter expression to restrict the insights returned. Supported filter fields: state Eg: `state:"DISMISSED" or state:"ACTIVE"
         */
        filter?: string;
        /**
         * Optional. The maximum number of results to return from this request.  Non-positive values are ignored. If not specified, the server will determine the number of results to return.
         */
        pageSize?: number;
        /**
         * Optional. If present, retrieves the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of other method parameters must be identical to those in the previous call.
         */
        pageToken?: string;
        /**
         * Required. The container resource on which to execute the request. Acceptable formats:  1. "projects/[PROJECT_NUMBER]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]",  LOCATION here refers to GCP Locations: https://cloud.google.com/about/locations/
         */
        parent?: string;
    }
    export interface Params$Resource$Projects$Locations$Insighttypes$Insights$Markaccepted extends StandardParameters {
        /**
         * Required. Name of the insight.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$GoogleCloudRecommenderV1beta1MarkInsightAcceptedRequest;
    }
    export class Resource$Projects$Locations$Recommenders {
        context: APIRequestContext;
        recommendations: Resource$Projects$Locations$Recommenders$Recommendations;
        constructor(context: APIRequestContext);
    }
    export class Resource$Projects$Locations$Recommenders$Recommendations {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * recommender.projects.locations.recommenders.recommendations.get
         * @desc Gets the requested recommendation. Requires the recommender.*.get IAM permission for the specified recommender.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/recommender.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const recommender = google.recommender('v1beta1');
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
         *   const res = await recommender.projects.locations.recommenders.recommendations.get(
         *     {
         *       // Required. Name of the recommendation.
         *       name:
         *         'projects/my-project/locations/my-location/recommenders/my-recommender/recommendations/my-recommendation',
         *     }
         *   );
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "additionalImpact": [],
         *   //   "associatedInsights": [],
         *   //   "content": {},
         *   //   "description": "my_description",
         *   //   "etag": "my_etag",
         *   //   "lastRefreshTime": "my_lastRefreshTime",
         *   //   "name": "my_name",
         *   //   "primaryImpact": {},
         *   //   "recommenderSubtype": "my_recommenderSubtype",
         *   //   "stateInfo": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias recommender.projects.locations.recommenders.recommendations.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. Name of the recommendation.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Locations$Recommenders$Recommendations$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Locations$Recommenders$Recommendations$Get, options?: MethodOptions): GaxiosPromise<Schema$GoogleCloudRecommenderV1beta1Recommendation>;
        get(params: Params$Resource$Projects$Locations$Recommenders$Recommendations$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Locations$Recommenders$Recommendations$Get, options: MethodOptions | BodyResponseCallback<Schema$GoogleCloudRecommenderV1beta1Recommendation>, callback: BodyResponseCallback<Schema$GoogleCloudRecommenderV1beta1Recommendation>): void;
        get(params: Params$Resource$Projects$Locations$Recommenders$Recommendations$Get, callback: BodyResponseCallback<Schema$GoogleCloudRecommenderV1beta1Recommendation>): void;
        get(callback: BodyResponseCallback<Schema$GoogleCloudRecommenderV1beta1Recommendation>): void;
        /**
         * recommender.projects.locations.recommenders.recommendations.list
         * @desc Lists recommendations for a Cloud project. Requires the recommender.*.list IAM permission for the specified recommender.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/recommender.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const recommender = google.recommender('v1beta1');
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
         *   const res = await recommender.projects.locations.recommenders.recommendations.list(
         *     {
         *       // Filter expression to restrict the recommendations returned. Supported
         *       // filter fields: state_info.state
         *       // Eg: `state_info.state:"DISMISSED" or state_info.state:"FAILED"
         *       filter: 'placeholder-value',
         *       // Optional. The maximum number of results to return from this request.  Non-positive
         *       // values are ignored. If not specified, the server will determine the number
         *       // of results to return.
         *       pageSize: 'placeholder-value',
         *       // Optional. If present, retrieves the next batch of results from the preceding call to
         *       // this method. `page_token` must be the value of `next_page_token` from the
         *       // previous response. The values of other method parameters must be identical
         *       // to those in the previous call.
         *       pageToken: 'placeholder-value',
         *       // Required. The container resource on which to execute the request.
         *       // Acceptable formats:
         *       //
         *       // 1.
         *       // "projects/[PROJECT_NUMBER]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]",
         *       //
         *       // LOCATION here refers to GCP Locations:
         *       // https://cloud.google.com/about/locations/
         *       parent:
         *         'projects/my-project/locations/my-location/recommenders/my-recommender',
         *     }
         *   );
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "recommendations": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias recommender.projects.locations.recommenders.recommendations.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.filter Filter expression to restrict the recommendations returned. Supported filter fields: state_info.state Eg: `state_info.state:"DISMISSED" or state_info.state:"FAILED"
         * @param {integer=} params.pageSize Optional. The maximum number of results to return from this request.  Non-positive values are ignored. If not specified, the server will determine the number of results to return.
         * @param {string=} params.pageToken Optional. If present, retrieves the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of other method parameters must be identical to those in the previous call.
         * @param {string} params.parent Required. The container resource on which to execute the request. Acceptable formats:  1. "projects/[PROJECT_NUMBER]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]",  LOCATION here refers to GCP Locations: https://cloud.google.com/about/locations/
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Locations$Recommenders$Recommendations$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Locations$Recommenders$Recommendations$List, options?: MethodOptions): GaxiosPromise<Schema$GoogleCloudRecommenderV1beta1ListRecommendationsResponse>;
        list(params: Params$Resource$Projects$Locations$Recommenders$Recommendations$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Locations$Recommenders$Recommendations$List, options: MethodOptions | BodyResponseCallback<Schema$GoogleCloudRecommenderV1beta1ListRecommendationsResponse>, callback: BodyResponseCallback<Schema$GoogleCloudRecommenderV1beta1ListRecommendationsResponse>): void;
        list(params: Params$Resource$Projects$Locations$Recommenders$Recommendations$List, callback: BodyResponseCallback<Schema$GoogleCloudRecommenderV1beta1ListRecommendationsResponse>): void;
        list(callback: BodyResponseCallback<Schema$GoogleCloudRecommenderV1beta1ListRecommendationsResponse>): void;
        /**
         * recommender.projects.locations.recommenders.recommendations.markClaimed
         * @desc Marks the Recommendation State as Claimed. Users can use this method to indicate to the Recommender API that they are starting to apply the recommendation themselves. This stops the recommendation content from being updated. Associated insights are frozen and placed in the ACCEPTED state.  MarkRecommendationClaimed can be applied to recommendations in CLAIMED or ACTIVE state.  Requires the recommender.*.update IAM permission for the specified recommender.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/recommender.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const recommender = google.recommender('v1beta1');
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
         *   const res = await recommender.projects.locations.recommenders.recommendations.markClaimed(
         *     {
         *       // Required. Name of the recommendation.
         *       name:
         *         'projects/my-project/locations/my-location/recommenders/my-recommender/recommendations/my-recommendation',
         *
         *       // Request body metadata
         *       requestBody: {
         *         // request body parameters
         *         // {
         *         //   "etag": "my_etag",
         *         //   "stateMetadata": {}
         *         // }
         *       },
         *     }
         *   );
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "additionalImpact": [],
         *   //   "associatedInsights": [],
         *   //   "content": {},
         *   //   "description": "my_description",
         *   //   "etag": "my_etag",
         *   //   "lastRefreshTime": "my_lastRefreshTime",
         *   //   "name": "my_name",
         *   //   "primaryImpact": {},
         *   //   "recommenderSubtype": "my_recommenderSubtype",
         *   //   "stateInfo": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias recommender.projects.locations.recommenders.recommendations.markClaimed
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. Name of the recommendation.
         * @param {().GoogleCloudRecommenderV1beta1MarkRecommendationClaimedRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        markClaimed(params: Params$Resource$Projects$Locations$Recommenders$Recommendations$Markclaimed, options: StreamMethodOptions): GaxiosPromise<Readable>;
        markClaimed(params?: Params$Resource$Projects$Locations$Recommenders$Recommendations$Markclaimed, options?: MethodOptions): GaxiosPromise<Schema$GoogleCloudRecommenderV1beta1Recommendation>;
        markClaimed(params: Params$Resource$Projects$Locations$Recommenders$Recommendations$Markclaimed, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        markClaimed(params: Params$Resource$Projects$Locations$Recommenders$Recommendations$Markclaimed, options: MethodOptions | BodyResponseCallback<Schema$GoogleCloudRecommenderV1beta1Recommendation>, callback: BodyResponseCallback<Schema$GoogleCloudRecommenderV1beta1Recommendation>): void;
        markClaimed(params: Params$Resource$Projects$Locations$Recommenders$Recommendations$Markclaimed, callback: BodyResponseCallback<Schema$GoogleCloudRecommenderV1beta1Recommendation>): void;
        markClaimed(callback: BodyResponseCallback<Schema$GoogleCloudRecommenderV1beta1Recommendation>): void;
        /**
         * recommender.projects.locations.recommenders.recommendations.markFailed
         * @desc Marks the Recommendation State as Failed. Users can use this method to indicate to the Recommender API that they have applied the recommendation themselves, and the operation failed. This stops the recommendation content from being updated. Associated insights are frozen and placed in the ACCEPTED state.  MarkRecommendationFailed can be applied to recommendations in ACTIVE, CLAIMED, SUCCEEDED, or FAILED state.  Requires the recommender.*.update IAM permission for the specified recommender.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/recommender.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const recommender = google.recommender('v1beta1');
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
         *   const res = await recommender.projects.locations.recommenders.recommendations.markFailed(
         *     {
         *       // Required. Name of the recommendation.
         *       name:
         *         'projects/my-project/locations/my-location/recommenders/my-recommender/recommendations/my-recommendation',
         *
         *       // Request body metadata
         *       requestBody: {
         *         // request body parameters
         *         // {
         *         //   "etag": "my_etag",
         *         //   "stateMetadata": {}
         *         // }
         *       },
         *     }
         *   );
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "additionalImpact": [],
         *   //   "associatedInsights": [],
         *   //   "content": {},
         *   //   "description": "my_description",
         *   //   "etag": "my_etag",
         *   //   "lastRefreshTime": "my_lastRefreshTime",
         *   //   "name": "my_name",
         *   //   "primaryImpact": {},
         *   //   "recommenderSubtype": "my_recommenderSubtype",
         *   //   "stateInfo": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias recommender.projects.locations.recommenders.recommendations.markFailed
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. Name of the recommendation.
         * @param {().GoogleCloudRecommenderV1beta1MarkRecommendationFailedRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        markFailed(params: Params$Resource$Projects$Locations$Recommenders$Recommendations$Markfailed, options: StreamMethodOptions): GaxiosPromise<Readable>;
        markFailed(params?: Params$Resource$Projects$Locations$Recommenders$Recommendations$Markfailed, options?: MethodOptions): GaxiosPromise<Schema$GoogleCloudRecommenderV1beta1Recommendation>;
        markFailed(params: Params$Resource$Projects$Locations$Recommenders$Recommendations$Markfailed, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        markFailed(params: Params$Resource$Projects$Locations$Recommenders$Recommendations$Markfailed, options: MethodOptions | BodyResponseCallback<Schema$GoogleCloudRecommenderV1beta1Recommendation>, callback: BodyResponseCallback<Schema$GoogleCloudRecommenderV1beta1Recommendation>): void;
        markFailed(params: Params$Resource$Projects$Locations$Recommenders$Recommendations$Markfailed, callback: BodyResponseCallback<Schema$GoogleCloudRecommenderV1beta1Recommendation>): void;
        markFailed(callback: BodyResponseCallback<Schema$GoogleCloudRecommenderV1beta1Recommendation>): void;
        /**
         * recommender.projects.locations.recommenders.recommendations.markSucceeded
         * @desc Marks the Recommendation State as Succeeded. Users can use this method to indicate to the Recommender API that they have applied the recommendation themselves, and the operation was successful. This stops the recommendation content from being updated. Associated insights are frozen and placed in the ACCEPTED state.  MarkRecommendationSucceeded can be applied to recommendations in ACTIVE, CLAIMED, SUCCEEDED, or FAILED state.  Requires the recommender.*.update IAM permission for the specified recommender.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/recommender.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const recommender = google.recommender('v1beta1');
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
         *   const res = await recommender.projects.locations.recommenders.recommendations.markSucceeded(
         *     {
         *       // Required. Name of the recommendation.
         *       name:
         *         'projects/my-project/locations/my-location/recommenders/my-recommender/recommendations/my-recommendation',
         *
         *       // Request body metadata
         *       requestBody: {
         *         // request body parameters
         *         // {
         *         //   "etag": "my_etag",
         *         //   "stateMetadata": {}
         *         // }
         *       },
         *     }
         *   );
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "additionalImpact": [],
         *   //   "associatedInsights": [],
         *   //   "content": {},
         *   //   "description": "my_description",
         *   //   "etag": "my_etag",
         *   //   "lastRefreshTime": "my_lastRefreshTime",
         *   //   "name": "my_name",
         *   //   "primaryImpact": {},
         *   //   "recommenderSubtype": "my_recommenderSubtype",
         *   //   "stateInfo": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias recommender.projects.locations.recommenders.recommendations.markSucceeded
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. Name of the recommendation.
         * @param {().GoogleCloudRecommenderV1beta1MarkRecommendationSucceededRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        markSucceeded(params: Params$Resource$Projects$Locations$Recommenders$Recommendations$Marksucceeded, options: StreamMethodOptions): GaxiosPromise<Readable>;
        markSucceeded(params?: Params$Resource$Projects$Locations$Recommenders$Recommendations$Marksucceeded, options?: MethodOptions): GaxiosPromise<Schema$GoogleCloudRecommenderV1beta1Recommendation>;
        markSucceeded(params: Params$Resource$Projects$Locations$Recommenders$Recommendations$Marksucceeded, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        markSucceeded(params: Params$Resource$Projects$Locations$Recommenders$Recommendations$Marksucceeded, options: MethodOptions | BodyResponseCallback<Schema$GoogleCloudRecommenderV1beta1Recommendation>, callback: BodyResponseCallback<Schema$GoogleCloudRecommenderV1beta1Recommendation>): void;
        markSucceeded(params: Params$Resource$Projects$Locations$Recommenders$Recommendations$Marksucceeded, callback: BodyResponseCallback<Schema$GoogleCloudRecommenderV1beta1Recommendation>): void;
        markSucceeded(callback: BodyResponseCallback<Schema$GoogleCloudRecommenderV1beta1Recommendation>): void;
    }
    export interface Params$Resource$Projects$Locations$Recommenders$Recommendations$Get extends StandardParameters {
        /**
         * Required. Name of the recommendation.
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Locations$Recommenders$Recommendations$List extends StandardParameters {
        /**
         * Filter expression to restrict the recommendations returned. Supported filter fields: state_info.state Eg: `state_info.state:"DISMISSED" or state_info.state:"FAILED"
         */
        filter?: string;
        /**
         * Optional. The maximum number of results to return from this request.  Non-positive values are ignored. If not specified, the server will determine the number of results to return.
         */
        pageSize?: number;
        /**
         * Optional. If present, retrieves the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of other method parameters must be identical to those in the previous call.
         */
        pageToken?: string;
        /**
         * Required. The container resource on which to execute the request. Acceptable formats:  1. "projects/[PROJECT_NUMBER]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]",  LOCATION here refers to GCP Locations: https://cloud.google.com/about/locations/
         */
        parent?: string;
    }
    export interface Params$Resource$Projects$Locations$Recommenders$Recommendations$Markclaimed extends StandardParameters {
        /**
         * Required. Name of the recommendation.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$GoogleCloudRecommenderV1beta1MarkRecommendationClaimedRequest;
    }
    export interface Params$Resource$Projects$Locations$Recommenders$Recommendations$Markfailed extends StandardParameters {
        /**
         * Required. Name of the recommendation.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$GoogleCloudRecommenderV1beta1MarkRecommendationFailedRequest;
    }
    export interface Params$Resource$Projects$Locations$Recommenders$Recommendations$Marksucceeded extends StandardParameters {
        /**
         * Required. Name of the recommendation.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$GoogleCloudRecommenderV1beta1MarkRecommendationSucceededRequest;
    }
    export {};
}
