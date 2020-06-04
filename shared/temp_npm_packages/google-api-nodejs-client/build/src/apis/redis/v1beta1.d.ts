/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace redis_v1beta1 {
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
     * Google Cloud Memorystore for Redis API
     *
     * Creates and manages Redis instances on the Google Cloud Platform.
     *
     * @example
     * const {google} = require('googleapis');
     * const redis = google.redis('v1beta1');
     *
     * @namespace redis
     * @type {Function}
     * @version v1beta1
     * @variation v1beta1
     * @param {object=} options Options for Redis
     */
    export class Redis {
        context: APIRequestContext;
        projects: Resource$Projects;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    /**
     * A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance:      service Foo {       rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty);     }  The JSON representation for `Empty` is empty JSON object `{}`.
     */
    export interface Schema$Empty {
    }
    /**
     * Request for Export.
     */
    export interface Schema$ExportInstanceRequest {
        /**
         * Required. Specify data to be exported.
         */
        outputConfig?: Schema$OutputConfig;
    }
    /**
     * Request for Failover.
     */
    export interface Schema$FailoverInstanceRequest {
        /**
         * Optional. Available data protection modes that the user can choose. If it&#39;s unspecified, data protection mode will be LIMITED_DATA_LOSS by default.
         */
        dataProtectionMode?: string | null;
    }
    /**
     * The Cloud Storage location for the output content
     */
    export interface Schema$GcsDestination {
        /**
         * Required. Data destination URI (e.g. &#39;gs://my_bucket/my_object&#39;). Existing files will be overwritten.
         */
        uri?: string | null;
    }
    /**
     * The Cloud Storage location for the input content
     */
    export interface Schema$GcsSource {
        /**
         * Required. Source data URI. (e.g. &#39;gs://my_bucket/my_object&#39;).
         */
        uri?: string | null;
    }
    /**
     * Represents the metadata of the long-running operation.
     */
    export interface Schema$GoogleCloudCommonOperationMetadata {
        /**
         * [Output only] API version used to start the operation.
         */
        apiVersion?: string | null;
        /**
         * [Output only] Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`.
         */
        cancelRequested?: boolean | null;
        /**
         * [Output only] The time the operation was created.
         */
        createTime?: string | null;
        /**
         * [Output only] The time the operation finished running.
         */
        endTime?: string | null;
        /**
         * [Output only] Human-readable status of the operation, if any.
         */
        statusDetail?: string | null;
        /**
         * [Output only] Server-defined resource path for the target of the operation.
         */
        target?: string | null;
        /**
         * [Output only] Name of the verb executed by the operation.
         */
        verb?: string | null;
    }
    /**
     * This location metadata represents additional configuration options for a given location where a Redis instance may be created. All fields are output only. It is returned as content of the `google.cloud.location.Location.metadata` field.
     */
    export interface Schema$GoogleCloudRedisV1beta1LocationMetadata {
        /**
         * Output only. The set of available zones in the location. The map is keyed by the lowercase ID of each zone, as defined by GCE. These keys can be specified in `location_id` or `alternative_location_id` fields when creating a Redis instance.
         */
        availableZones?: {
            [key: string]: Schema$GoogleCloudRedisV1beta1ZoneMetadata;
        } | null;
    }
    /**
     * Defines specific information for a particular zone. Currently empty and reserved for future use only.
     */
    export interface Schema$GoogleCloudRedisV1beta1ZoneMetadata {
    }
    /**
     * Request for Import.
     */
    export interface Schema$ImportInstanceRequest {
        /**
         * Required. Specify data to be imported.
         */
        inputConfig?: Schema$InputConfig;
    }
    /**
     * The input content
     */
    export interface Schema$InputConfig {
        /**
         * Google Cloud Storage location where input content is located.
         */
        gcsSource?: Schema$GcsSource;
    }
    /**
     * A Google Cloud Redis instance.
     */
    export interface Schema$Instance {
        /**
         * Optional. Only applicable to STANDARD_HA tier which protects the instance against zonal failures by provisioning it across two zones. If provided, it must be a different zone from the one provided in location_id.
         */
        alternativeLocationId?: string | null;
        /**
         * Optional. The full name of the Google Compute Engine [network](/compute/docs/networks-and-firewalls#networks) to which the instance is connected. If left unspecified, the `default` network will be used.
         */
        authorizedNetwork?: string | null;
        /**
         * Optional. The network connect mode of the Redis instance. If not provided, the connect mode defaults to DIRECT_PEERING.
         */
        connectMode?: string | null;
        /**
         * Output only. The time the instance was created.
         */
        createTime?: string | null;
        /**
         * Output only. The current zone where the Redis endpoint is placed. For Basic Tier instances, this will always be the same as the location_id provided by the user at creation time. For Standard Tier instances, this can be either location_id or alternative_location_id and can change after a failover event.
         */
        currentLocationId?: string | null;
        /**
         * An arbitrary and optional user-provided name for the instance.
         */
        displayName?: string | null;
        /**
         * Output only. Hostname or IP address of the exposed Redis endpoint used by clients to connect to the service.
         */
        host?: string | null;
        /**
         * Resource labels to represent user provided metadata
         */
        labels?: {
            [key: string]: string;
        } | null;
        /**
         * Optional. The zone where the instance will be provisioned. If not provided, the service will choose a zone for the instance. For STANDARD_HA tier, instances will be created across two zones for protection against zonal failures. If alternative_location_id is also provided, it must be different from location_id.
         */
        locationId?: string | null;
        /**
         * Required. Redis memory size in GiB.
         */
        memorySizeGb?: number | null;
        /**
         * Required. Unique name of the resource in this scope including project and location using the form:     `projects/{project_id}/locations/{location_id}/instances/{instance_id}`  Note: Redis instances are managed and addressed at regional level so location_id here refers to a GCP region; however, users may choose which specific zone (or collection of zones for cross-zone instances) an instance should be provisioned in. Refer to location_id and alternative_location_id fields for more details.
         */
        name?: string | null;
        /**
         * Output only. Cloud IAM identity used by import / export operations to transfer data to/from Cloud Storage. Format is &quot;serviceAccount:&lt;service_account_email&gt;&quot;. The value may change over time for a given instance so should be checked before each import/export operation.
         */
        persistenceIamIdentity?: string | null;
        /**
         * Output only. The port number of the exposed Redis endpoint.
         */
        port?: number | null;
        /**
         * Optional. Redis configuration parameters, according to http://redis.io/topics/config. Currently, the only supported parameters are:   Redis version 3.2 and newer:   *   maxmemory-policy  *   notify-keyspace-events   Redis version 4.0 and newer:   *   activedefrag  *   lfu-decay-time  *   lfu-log-factor  *   maxmemory-gb   Redis version 5.0 and newer:   *   stream-node-max-bytes  *   stream-node-max-entries
         */
        redisConfigs?: {
            [key: string]: string;
        } | null;
        /**
         * Optional. The version of Redis software. If not provided, latest supported version will be used. Currently, the supported values are:   *   `REDIS_3_2` for Redis 3.2 compatibility  *   `REDIS_4_0` for Redis 4.0 compatibility (default)  *   `REDIS_5_0` for Redis 5.0 compatibility
         */
        redisVersion?: string | null;
        /**
         * Optional. The CIDR range of internal addresses that are reserved for this instance. If not provided, the service will choose an unused /29 block, for example, 10.0.0.0/29 or 192.168.0.0/29. Ranges must be unique and non-overlapping with existing subnets in an authorized network.
         */
        reservedIpRange?: string | null;
        /**
         * Output only. The current state of this instance.
         */
        state?: string | null;
        /**
         * Output only. Additional information about the current status of this instance, if available.
         */
        statusMessage?: string | null;
        /**
         * Required. The service tier of the instance.
         */
        tier?: string | null;
    }
    /**
     * Response for ListInstances.
     */
    export interface Schema$ListInstancesResponse {
        /**
         * A list of Redis instances in the project in the specified location, or across all locations.  If the `location_id` in the parent field of the request is &quot;-&quot;, all regions available to the project are queried, and the results aggregated. If in such an aggregated query a location is unavailable, a dummy Redis entry is included in the response with the `name` field set to a value of the form `projects/{project_id}/locations/{location_id}/instances/`- and the `status` field set to ERROR and `status_message` field set to &quot;location not available for ListInstances&quot;.
         */
        instances?: Schema$Instance[];
        /**
         * Token to retrieve the next page of results, or empty if there are no more results in the list.
         */
        nextPageToken?: string | null;
        /**
         * Locations that could not be reached.
         */
        unreachable?: string[] | null;
    }
    /**
     * The response message for Locations.ListLocations.
     */
    export interface Schema$ListLocationsResponse {
        /**
         * A list of locations that matches the specified filter in the request.
         */
        locations?: Schema$Location[];
        /**
         * The standard List next-page token.
         */
        nextPageToken?: string | null;
    }
    /**
     * The response message for Operations.ListOperations.
     */
    export interface Schema$ListOperationsResponse {
        /**
         * The standard List next-page token.
         */
        nextPageToken?: string | null;
        /**
         * A list of operations that matches the specified filter in the request.
         */
        operations?: Schema$Operation[];
    }
    /**
     * A resource that represents Google Cloud Platform location.
     */
    export interface Schema$Location {
        /**
         * The friendly name for this location, typically a nearby city name. For example, &quot;Tokyo&quot;.
         */
        displayName?: string | null;
        /**
         * Cross-service attributes for the location. For example      {&quot;cloud.googleapis.com/region&quot;: &quot;us-east1&quot;}
         */
        labels?: {
            [key: string]: string;
        } | null;
        /**
         * Resource ID for the region. For example: &quot;us-east1&quot;.
         */
        locationId?: string | null;
        /**
         * Output only. The set of available zones in the location. The map is keyed by the lowercase ID of each zone, as defined by Compute Engine. These keys can be specified in `location_id` or `alternative_location_id` fields when creating a Redis instance.
         */
        metadata?: {
            [key: string]: any;
        } | null;
        /**
         * Full resource name for the region. For example: &quot;projects/example-project/locations/us-east1&quot;.
         */
        name?: string | null;
    }
    /**
     * This resource represents a long-running operation that is the result of a network API call.
     */
    export interface Schema$Operation {
        /**
         * If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available.
         */
        done?: boolean | null;
        /**
         * The error result of the operation in case of failure or cancellation.
         */
        error?: Schema$Status;
        /**
         * {  `createTime`: The time the operation was created.  `endTime`: The time the operation finished running.  `target`: Server-defined resource path for the target of the operation.  `verb`: Name of the verb executed by the operation.  `statusDetail`: Human-readable status of the operation, if any.  `cancelRequested`: Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`.  `apiVersion`: API version used to start the operation.  }
         */
        metadata?: {
            [key: string]: any;
        } | null;
        /**
         * The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`.
         */
        name?: string | null;
        /**
         * The normal response of the operation in case of success.  If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`.  If the original method is standard `Get`/`Create`/`Update`, the response should be the resource.  For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name.  For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`.
         */
        response?: {
            [key: string]: any;
        } | null;
    }
    /**
     * The output content
     */
    export interface Schema$OutputConfig {
        /**
         * Google Cloud Storage destination for output content.
         */
        gcsDestination?: Schema$GcsDestination;
    }
    /**
     * The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details.  You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).
     */
    export interface Schema$Status {
        /**
         * The status code, which should be an enum value of google.rpc.Code.
         */
        code?: number | null;
        /**
         * A list of messages that carry the error details.  There is a common set of message types for APIs to use.
         */
        details?: Array<{
            [key: string]: any;
        }> | null;
        /**
         * A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.
         */
        message?: string | null;
    }
    /**
     * Request for UpgradeInstance.
     */
    export interface Schema$UpgradeInstanceRequest {
        /**
         * Required. Specifies the target version of Redis software to upgrade to.
         */
        redisVersion?: string | null;
    }
    export class Resource$Projects {
        context: APIRequestContext;
        locations: Resource$Projects$Locations;
        constructor(context: APIRequestContext);
    }
    export class Resource$Projects$Locations {
        context: APIRequestContext;
        instances: Resource$Projects$Locations$Instances;
        operations: Resource$Projects$Locations$Operations;
        constructor(context: APIRequestContext);
        /**
         * redis.projects.locations.get
         * @desc Gets information about a location.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/redis.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const redis = google.redis('v1beta1');
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
         *   const res = await redis.projects.locations.get({
         *     // Resource name for the location.
         *     name: 'projects/my-project/locations/my-location',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "displayName": "my_displayName",
         *   //   "labels": {},
         *   //   "locationId": "my_locationId",
         *   //   "metadata": {},
         *   //   "name": "my_name"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias redis.projects.locations.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Resource name for the location.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Locations$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Locations$Get, options?: MethodOptions): GaxiosPromise<Schema$Location>;
        get(params: Params$Resource$Projects$Locations$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Locations$Get, options: MethodOptions | BodyResponseCallback<Schema$Location>, callback: BodyResponseCallback<Schema$Location>): void;
        get(params: Params$Resource$Projects$Locations$Get, callback: BodyResponseCallback<Schema$Location>): void;
        get(callback: BodyResponseCallback<Schema$Location>): void;
        /**
         * redis.projects.locations.list
         * @desc Lists information about the supported locations for this service.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/redis.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const redis = google.redis('v1beta1');
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
         *   const res = await redis.projects.locations.list({
         *     // The standard list filter.
         *     filter: 'placeholder-value',
         *     // The resource that owns the locations collection, if applicable.
         *     name: 'projects/my-project',
         *     // The standard list page size.
         *     pageSize: 'placeholder-value',
         *     // The standard list page token.
         *     pageToken: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "locations": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias redis.projects.locations.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.filter The standard list filter.
         * @param {string} params.name The resource that owns the locations collection, if applicable.
         * @param {integer=} params.pageSize The standard list page size.
         * @param {string=} params.pageToken The standard list page token.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Locations$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Locations$List, options?: MethodOptions): GaxiosPromise<Schema$ListLocationsResponse>;
        list(params: Params$Resource$Projects$Locations$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Locations$List, options: MethodOptions | BodyResponseCallback<Schema$ListLocationsResponse>, callback: BodyResponseCallback<Schema$ListLocationsResponse>): void;
        list(params: Params$Resource$Projects$Locations$List, callback: BodyResponseCallback<Schema$ListLocationsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListLocationsResponse>): void;
    }
    export interface Params$Resource$Projects$Locations$Get extends StandardParameters {
        /**
         * Resource name for the location.
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Locations$List extends StandardParameters {
        /**
         * The standard list filter.
         */
        filter?: string;
        /**
         * The resource that owns the locations collection, if applicable.
         */
        name?: string;
        /**
         * The standard list page size.
         */
        pageSize?: number;
        /**
         * The standard list page token.
         */
        pageToken?: string;
    }
    export class Resource$Projects$Locations$Instances {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * redis.projects.locations.instances.create
         * @desc Creates a Redis instance based on the specified tier and memory size.  By default, the instance is accessible from the project's [default network](/compute/docs/networks-and-firewalls#networks).  The creation is executed asynchronously and callers may check the returned operation to track its progress. Once the operation is completed the Redis instance will be fully functional. Completed longrunning.Operation will contain the new instance object in the response field.  The returned operation is automatically deleted after a few hours, so there is no need to call DeleteOperation.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/redis.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const redis = google.redis('v1beta1');
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
         *   const res = await redis.projects.locations.instances.create({
         *     // Required. The logical name of the Redis instance in the customer project
         *     // with the following restrictions:
         *     //
         *     // * Must contain only lowercase letters, numbers, and hyphens.
         *     // * Must start with a letter.
         *     // * Must be between 1-40 characters.
         *     // * Must end with a number or a letter.
         *     // * Must be unique within the customer project / location
         *     instanceId: 'placeholder-value',
         *     // Required. The resource name of the instance location using the form:
         *     //     `projects/{project_id}/locations/{location_id}`
         *     // where `location_id` refers to a GCP region.
         *     parent: 'projects/my-project/locations/my-location',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "alternativeLocationId": "my_alternativeLocationId",
         *       //   "authorizedNetwork": "my_authorizedNetwork",
         *       //   "connectMode": "my_connectMode",
         *       //   "createTime": "my_createTime",
         *       //   "currentLocationId": "my_currentLocationId",
         *       //   "displayName": "my_displayName",
         *       //   "host": "my_host",
         *       //   "labels": {},
         *       //   "locationId": "my_locationId",
         *       //   "memorySizeGb": 0,
         *       //   "name": "my_name",
         *       //   "persistenceIamIdentity": "my_persistenceIamIdentity",
         *       //   "port": 0,
         *       //   "redisConfigs": {},
         *       //   "redisVersion": "my_redisVersion",
         *       //   "reservedIpRange": "my_reservedIpRange",
         *       //   "state": "my_state",
         *       //   "statusMessage": "my_statusMessage",
         *       //   "tier": "my_tier"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "done": false,
         *   //   "error": {},
         *   //   "metadata": {},
         *   //   "name": "my_name",
         *   //   "response": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias redis.projects.locations.instances.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.instanceId Required. The logical name of the Redis instance in the customer project with the following restrictions:  * Must contain only lowercase letters, numbers, and hyphens. * Must start with a letter. * Must be between 1-40 characters. * Must end with a number or a letter. * Must be unique within the customer project / location
         * @param {string} params.parent Required. The resource name of the instance location using the form:     `projects/{project_id}/locations/{location_id}` where `location_id` refers to a GCP region.
         * @param {().Instance} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Projects$Locations$Instances$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Projects$Locations$Instances$Create, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        create(params: Params$Resource$Projects$Locations$Instances$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Projects$Locations$Instances$Create, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        create(params: Params$Resource$Projects$Locations$Instances$Create, callback: BodyResponseCallback<Schema$Operation>): void;
        create(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * redis.projects.locations.instances.delete
         * @desc Deletes a specific Redis instance.  Instance stops serving and data is deleted.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/redis.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const redis = google.redis('v1beta1');
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
         *   const res = await redis.projects.locations.instances.delete({
         *     // Required. Redis instance resource name using the form:
         *     //     `projects/{project_id}/locations/{location_id}/instances/{instance_id}`
         *     // where `location_id` refers to a GCP region.
         *     name: 'projects/my-project/locations/my-location/instances/my-instance',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "done": false,
         *   //   "error": {},
         *   //   "metadata": {},
         *   //   "name": "my_name",
         *   //   "response": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias redis.projects.locations.instances.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. Redis instance resource name using the form:     `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Projects$Locations$Instances$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Projects$Locations$Instances$Delete, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        delete(params: Params$Resource$Projects$Locations$Instances$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Projects$Locations$Instances$Delete, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        delete(params: Params$Resource$Projects$Locations$Instances$Delete, callback: BodyResponseCallback<Schema$Operation>): void;
        delete(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * redis.projects.locations.instances.export
         * @desc Export Redis instance data into a Redis RDB format file in Cloud Storage.  Redis will continue serving during this operation.  The returned operation is automatically deleted after a few hours, so there is no need to call DeleteOperation.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/redis.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const redis = google.redis('v1beta1');
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
         *   const res = await redis.projects.locations.instances.export({
         *     // Required. Redis instance resource name using the form:
         *     //     `projects/{project_id}/locations/{location_id}/instances/{instance_id}`
         *     // where `location_id` refers to a GCP region.
         *     name: 'projects/my-project/locations/my-location/instances/my-instance',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "outputConfig": {}
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "done": false,
         *   //   "error": {},
         *   //   "metadata": {},
         *   //   "name": "my_name",
         *   //   "response": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias redis.projects.locations.instances.export
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. Redis instance resource name using the form:     `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region.
         * @param {().ExportInstanceRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        export(params: Params$Resource$Projects$Locations$Instances$Export, options: StreamMethodOptions): GaxiosPromise<Readable>;
        export(params?: Params$Resource$Projects$Locations$Instances$Export, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        export(params: Params$Resource$Projects$Locations$Instances$Export, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        export(params: Params$Resource$Projects$Locations$Instances$Export, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        export(params: Params$Resource$Projects$Locations$Instances$Export, callback: BodyResponseCallback<Schema$Operation>): void;
        export(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * redis.projects.locations.instances.failover
         * @desc Initiates a failover of the master node to current replica node for a specific STANDARD tier Cloud Memorystore for Redis instance.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/redis.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const redis = google.redis('v1beta1');
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
         *   const res = await redis.projects.locations.instances.failover({
         *     // Required. Redis instance resource name using the form:
         *     //     `projects/{project_id}/locations/{location_id}/instances/{instance_id}`
         *     // where `location_id` refers to a GCP region.
         *     name: 'projects/my-project/locations/my-location/instances/my-instance',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "dataProtectionMode": "my_dataProtectionMode"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "done": false,
         *   //   "error": {},
         *   //   "metadata": {},
         *   //   "name": "my_name",
         *   //   "response": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias redis.projects.locations.instances.failover
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. Redis instance resource name using the form:     `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region.
         * @param {().FailoverInstanceRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        failover(params: Params$Resource$Projects$Locations$Instances$Failover, options: StreamMethodOptions): GaxiosPromise<Readable>;
        failover(params?: Params$Resource$Projects$Locations$Instances$Failover, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        failover(params: Params$Resource$Projects$Locations$Instances$Failover, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        failover(params: Params$Resource$Projects$Locations$Instances$Failover, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        failover(params: Params$Resource$Projects$Locations$Instances$Failover, callback: BodyResponseCallback<Schema$Operation>): void;
        failover(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * redis.projects.locations.instances.get
         * @desc Gets the details of a specific Redis instance.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/redis.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const redis = google.redis('v1beta1');
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
         *   const res = await redis.projects.locations.instances.get({
         *     // Required. Redis instance resource name using the form:
         *     //     `projects/{project_id}/locations/{location_id}/instances/{instance_id}`
         *     // where `location_id` refers to a GCP region.
         *     name: 'projects/my-project/locations/my-location/instances/my-instance',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "alternativeLocationId": "my_alternativeLocationId",
         *   //   "authorizedNetwork": "my_authorizedNetwork",
         *   //   "connectMode": "my_connectMode",
         *   //   "createTime": "my_createTime",
         *   //   "currentLocationId": "my_currentLocationId",
         *   //   "displayName": "my_displayName",
         *   //   "host": "my_host",
         *   //   "labels": {},
         *   //   "locationId": "my_locationId",
         *   //   "memorySizeGb": 0,
         *   //   "name": "my_name",
         *   //   "persistenceIamIdentity": "my_persistenceIamIdentity",
         *   //   "port": 0,
         *   //   "redisConfigs": {},
         *   //   "redisVersion": "my_redisVersion",
         *   //   "reservedIpRange": "my_reservedIpRange",
         *   //   "state": "my_state",
         *   //   "statusMessage": "my_statusMessage",
         *   //   "tier": "my_tier"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias redis.projects.locations.instances.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. Redis instance resource name using the form:     `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Locations$Instances$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Locations$Instances$Get, options?: MethodOptions): GaxiosPromise<Schema$Instance>;
        get(params: Params$Resource$Projects$Locations$Instances$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Locations$Instances$Get, options: MethodOptions | BodyResponseCallback<Schema$Instance>, callback: BodyResponseCallback<Schema$Instance>): void;
        get(params: Params$Resource$Projects$Locations$Instances$Get, callback: BodyResponseCallback<Schema$Instance>): void;
        get(callback: BodyResponseCallback<Schema$Instance>): void;
        /**
         * redis.projects.locations.instances.import
         * @desc Import a Redis RDB snapshot file from Cloud Storage into a Redis instance.  Redis may stop serving during this operation. Instance state will be IMPORTING for entire operation. When complete, the instance will contain only data from the imported file.  The returned operation is automatically deleted after a few hours, so there is no need to call DeleteOperation.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/redis.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const redis = google.redis('v1beta1');
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
         *   const res = await redis.projects.locations.instances.import({
         *     // Required. Redis instance resource name using the form:
         *     //     `projects/{project_id}/locations/{location_id}/instances/{instance_id}`
         *     // where `location_id` refers to a GCP region.
         *     name: 'projects/my-project/locations/my-location/instances/my-instance',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "inputConfig": {}
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "done": false,
         *   //   "error": {},
         *   //   "metadata": {},
         *   //   "name": "my_name",
         *   //   "response": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias redis.projects.locations.instances.import
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. Redis instance resource name using the form:     `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region.
         * @param {().ImportInstanceRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        import(params: Params$Resource$Projects$Locations$Instances$Import, options: StreamMethodOptions): GaxiosPromise<Readable>;
        import(params?: Params$Resource$Projects$Locations$Instances$Import, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        import(params: Params$Resource$Projects$Locations$Instances$Import, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        import(params: Params$Resource$Projects$Locations$Instances$Import, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        import(params: Params$Resource$Projects$Locations$Instances$Import, callback: BodyResponseCallback<Schema$Operation>): void;
        import(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * redis.projects.locations.instances.list
         * @desc Lists all Redis instances owned by a project in either the specified location (region) or all locations.  The location should have the following format:  * `projects/{project_id}/locations/{location_id}`  If `location_id` is specified as `-` (wildcard), then all regions available to the project are queried, and the results are aggregated.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/redis.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const redis = google.redis('v1beta1');
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
         *   const res = await redis.projects.locations.instances.list({
         *     // The maximum number of items to return.
         *     //
         *     // If not specified, a default value of 1000 will be used by the service.
         *     // Regardless of the page_size value, the response may include a partial list
         *     // and a caller should only rely on response's
         *     // `next_page_token`
         *     // to determine if there are more instances left to be queried.
         *     pageSize: 'placeholder-value',
         *     // The `next_page_token` value returned from a previous
         *     // ListInstances request, if any.
         *     pageToken: 'placeholder-value',
         *     // Required. The resource name of the instance location using the form:
         *     //     `projects/{project_id}/locations/{location_id}`
         *     // where `location_id` refers to a GCP region.
         *     parent: 'projects/my-project/locations/my-location',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "instances": [],
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "unreachable": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias redis.projects.locations.instances.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize The maximum number of items to return.  If not specified, a default value of 1000 will be used by the service. Regardless of the page_size value, the response may include a partial list and a caller should only rely on response's `next_page_token` to determine if there are more instances left to be queried.
         * @param {string=} params.pageToken The `next_page_token` value returned from a previous ListInstances request, if any.
         * @param {string} params.parent Required. The resource name of the instance location using the form:     `projects/{project_id}/locations/{location_id}` where `location_id` refers to a GCP region.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Locations$Instances$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Locations$Instances$List, options?: MethodOptions): GaxiosPromise<Schema$ListInstancesResponse>;
        list(params: Params$Resource$Projects$Locations$Instances$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Locations$Instances$List, options: MethodOptions | BodyResponseCallback<Schema$ListInstancesResponse>, callback: BodyResponseCallback<Schema$ListInstancesResponse>): void;
        list(params: Params$Resource$Projects$Locations$Instances$List, callback: BodyResponseCallback<Schema$ListInstancesResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListInstancesResponse>): void;
        /**
         * redis.projects.locations.instances.patch
         * @desc Updates the metadata and configuration of a specific Redis instance.  Completed longrunning.Operation will contain the new instance object in the response field. The returned operation is automatically deleted after a few hours, so there is no need to call DeleteOperation.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/redis.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const redis = google.redis('v1beta1');
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
         *   const res = await redis.projects.locations.instances.patch({
         *     // Required. Unique name of the resource in this scope including project and
         *     // location using the form:
         *     //     `projects/{project_id}/locations/{location_id}/instances/{instance_id}`
         *     //
         *     // Note: Redis instances are managed and addressed at regional level so
         *     // location_id here refers to a GCP region; however, users may choose which
         *     // specific zone (or collection of zones for cross-zone instances) an instance
         *     // should be provisioned in. Refer to location_id and
         *     // alternative_location_id fields for more details.
         *     name: 'projects/my-project/locations/my-location/instances/my-instance',
         *     // Required. Mask of fields to update. At least one path must be supplied in
         *     // this field. The elements of the repeated paths field may only include these
         *     // fields from Instance:
         *     //
         *     //  *   `displayName`
         *     //  *   `labels`
         *     //  *   `memorySizeGb`
         *     //  *   `redisConfig`
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "alternativeLocationId": "my_alternativeLocationId",
         *       //   "authorizedNetwork": "my_authorizedNetwork",
         *       //   "connectMode": "my_connectMode",
         *       //   "createTime": "my_createTime",
         *       //   "currentLocationId": "my_currentLocationId",
         *       //   "displayName": "my_displayName",
         *       //   "host": "my_host",
         *       //   "labels": {},
         *       //   "locationId": "my_locationId",
         *       //   "memorySizeGb": 0,
         *       //   "name": "my_name",
         *       //   "persistenceIamIdentity": "my_persistenceIamIdentity",
         *       //   "port": 0,
         *       //   "redisConfigs": {},
         *       //   "redisVersion": "my_redisVersion",
         *       //   "reservedIpRange": "my_reservedIpRange",
         *       //   "state": "my_state",
         *       //   "statusMessage": "my_statusMessage",
         *       //   "tier": "my_tier"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "done": false,
         *   //   "error": {},
         *   //   "metadata": {},
         *   //   "name": "my_name",
         *   //   "response": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias redis.projects.locations.instances.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. Unique name of the resource in this scope including project and location using the form:     `projects/{project_id}/locations/{location_id}/instances/{instance_id}`  Note: Redis instances are managed and addressed at regional level so location_id here refers to a GCP region; however, users may choose which specific zone (or collection of zones for cross-zone instances) an instance should be provisioned in. Refer to location_id and alternative_location_id fields for more details.
         * @param {string=} params.updateMask Required. Mask of fields to update. At least one path must be supplied in this field. The elements of the repeated paths field may only include these fields from Instance:   *   `displayName`  *   `labels`  *   `memorySizeGb`  *   `redisConfig`
         * @param {().Instance} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Projects$Locations$Instances$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Projects$Locations$Instances$Patch, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        patch(params: Params$Resource$Projects$Locations$Instances$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Projects$Locations$Instances$Patch, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        patch(params: Params$Resource$Projects$Locations$Instances$Patch, callback: BodyResponseCallback<Schema$Operation>): void;
        patch(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * redis.projects.locations.instances.upgrade
         * @desc Upgrades Redis instance to the newer Redis version specified in the request.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/redis.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const redis = google.redis('v1beta1');
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
         *   const res = await redis.projects.locations.instances.upgrade({
         *     // Required. Redis instance resource name using the form:
         *     //     `projects/{project_id}/locations/{location_id}/instances/{instance_id}`
         *     // where `location_id` refers to a GCP region.
         *     name: 'projects/my-project/locations/my-location/instances/my-instance',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "redisVersion": "my_redisVersion"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "done": false,
         *   //   "error": {},
         *   //   "metadata": {},
         *   //   "name": "my_name",
         *   //   "response": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias redis.projects.locations.instances.upgrade
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. Redis instance resource name using the form:     `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region.
         * @param {().UpgradeInstanceRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        upgrade(params: Params$Resource$Projects$Locations$Instances$Upgrade, options: StreamMethodOptions): GaxiosPromise<Readable>;
        upgrade(params?: Params$Resource$Projects$Locations$Instances$Upgrade, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        upgrade(params: Params$Resource$Projects$Locations$Instances$Upgrade, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        upgrade(params: Params$Resource$Projects$Locations$Instances$Upgrade, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        upgrade(params: Params$Resource$Projects$Locations$Instances$Upgrade, callback: BodyResponseCallback<Schema$Operation>): void;
        upgrade(callback: BodyResponseCallback<Schema$Operation>): void;
    }
    export interface Params$Resource$Projects$Locations$Instances$Create extends StandardParameters {
        /**
         * Required. The logical name of the Redis instance in the customer project with the following restrictions:  * Must contain only lowercase letters, numbers, and hyphens. * Must start with a letter. * Must be between 1-40 characters. * Must end with a number or a letter. * Must be unique within the customer project / location
         */
        instanceId?: string;
        /**
         * Required. The resource name of the instance location using the form:     `projects/{project_id}/locations/{location_id}` where `location_id` refers to a GCP region.
         */
        parent?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Instance;
    }
    export interface Params$Resource$Projects$Locations$Instances$Delete extends StandardParameters {
        /**
         * Required. Redis instance resource name using the form:     `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region.
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Locations$Instances$Export extends StandardParameters {
        /**
         * Required. Redis instance resource name using the form:     `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ExportInstanceRequest;
    }
    export interface Params$Resource$Projects$Locations$Instances$Failover extends StandardParameters {
        /**
         * Required. Redis instance resource name using the form:     `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$FailoverInstanceRequest;
    }
    export interface Params$Resource$Projects$Locations$Instances$Get extends StandardParameters {
        /**
         * Required. Redis instance resource name using the form:     `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region.
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Locations$Instances$Import extends StandardParameters {
        /**
         * Required. Redis instance resource name using the form:     `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ImportInstanceRequest;
    }
    export interface Params$Resource$Projects$Locations$Instances$List extends StandardParameters {
        /**
         * The maximum number of items to return.  If not specified, a default value of 1000 will be used by the service. Regardless of the page_size value, the response may include a partial list and a caller should only rely on response's `next_page_token` to determine if there are more instances left to be queried.
         */
        pageSize?: number;
        /**
         * The `next_page_token` value returned from a previous ListInstances request, if any.
         */
        pageToken?: string;
        /**
         * Required. The resource name of the instance location using the form:     `projects/{project_id}/locations/{location_id}` where `location_id` refers to a GCP region.
         */
        parent?: string;
    }
    export interface Params$Resource$Projects$Locations$Instances$Patch extends StandardParameters {
        /**
         * Required. Unique name of the resource in this scope including project and location using the form:     `projects/{project_id}/locations/{location_id}/instances/{instance_id}`  Note: Redis instances are managed and addressed at regional level so location_id here refers to a GCP region; however, users may choose which specific zone (or collection of zones for cross-zone instances) an instance should be provisioned in. Refer to location_id and alternative_location_id fields for more details.
         */
        name?: string;
        /**
         * Required. Mask of fields to update. At least one path must be supplied in this field. The elements of the repeated paths field may only include these fields from Instance:   *   `displayName`  *   `labels`  *   `memorySizeGb`  *   `redisConfig`
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Instance;
    }
    export interface Params$Resource$Projects$Locations$Instances$Upgrade extends StandardParameters {
        /**
         * Required. Redis instance resource name using the form:     `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$UpgradeInstanceRequest;
    }
    export class Resource$Projects$Locations$Operations {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * redis.projects.locations.operations.cancel
         * @desc Starts asynchronous cancellation on a long-running operation.  The server makes a best effort to cancel the operation, but success is not guaranteed.  If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.  Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/redis.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const redis = google.redis('v1beta1');
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
         *   const res = await redis.projects.locations.operations.cancel({
         *     // The name of the operation resource to be cancelled.
         *     name: 'projects/my-project/locations/my-location/operations/my-operation',
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
         * @alias redis.projects.locations.operations.cancel
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The name of the operation resource to be cancelled.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        cancel(params: Params$Resource$Projects$Locations$Operations$Cancel, options: StreamMethodOptions): GaxiosPromise<Readable>;
        cancel(params?: Params$Resource$Projects$Locations$Operations$Cancel, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        cancel(params: Params$Resource$Projects$Locations$Operations$Cancel, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        cancel(params: Params$Resource$Projects$Locations$Operations$Cancel, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        cancel(params: Params$Resource$Projects$Locations$Operations$Cancel, callback: BodyResponseCallback<Schema$Empty>): void;
        cancel(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * redis.projects.locations.operations.delete
         * @desc Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/redis.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const redis = google.redis('v1beta1');
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
         *   const res = await redis.projects.locations.operations.delete({
         *     // The name of the operation resource to be deleted.
         *     name: 'projects/my-project/locations/my-location/operations/my-operation',
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
         * @alias redis.projects.locations.operations.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The name of the operation resource to be deleted.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Projects$Locations$Operations$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Projects$Locations$Operations$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Projects$Locations$Operations$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Projects$Locations$Operations$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Projects$Locations$Operations$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * redis.projects.locations.operations.get
         * @desc Gets the latest state of a long-running operation.  Clients can use this method to poll the operation result at intervals as recommended by the API service.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/redis.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const redis = google.redis('v1beta1');
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
         *   const res = await redis.projects.locations.operations.get({
         *     // The name of the operation resource.
         *     name: 'projects/my-project/locations/my-location/operations/my-operation',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "done": false,
         *   //   "error": {},
         *   //   "metadata": {},
         *   //   "name": "my_name",
         *   //   "response": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias redis.projects.locations.operations.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The name of the operation resource.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Locations$Operations$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Locations$Operations$Get, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        get(params: Params$Resource$Projects$Locations$Operations$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Locations$Operations$Get, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        get(params: Params$Resource$Projects$Locations$Operations$Get, callback: BodyResponseCallback<Schema$Operation>): void;
        get(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * redis.projects.locations.operations.list
         * @desc Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.  NOTE: the `name` binding allows API services to override the binding to use different resource name schemes, such as `users/x/operations`. To override the binding, API services can add a binding such as `"/v1/{name=users/x}/operations"` to their service configuration. For backwards compatibility, the default name includes the operations collection id, however overriding users must ensure the name binding is the parent resource, without the operations collection id.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/redis.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const redis = google.redis('v1beta1');
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
         *   const res = await redis.projects.locations.operations.list({
         *     // The standard list filter.
         *     filter: 'placeholder-value',
         *     // The name of the operation's parent resource.
         *     name: 'projects/my-project/locations/my-location',
         *     // The standard list page size.
         *     pageSize: 'placeholder-value',
         *     // The standard list page token.
         *     pageToken: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "operations": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias redis.projects.locations.operations.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.filter The standard list filter.
         * @param {string} params.name The name of the operation's parent resource.
         * @param {integer=} params.pageSize The standard list page size.
         * @param {string=} params.pageToken The standard list page token.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Locations$Operations$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Locations$Operations$List, options?: MethodOptions): GaxiosPromise<Schema$ListOperationsResponse>;
        list(params: Params$Resource$Projects$Locations$Operations$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Locations$Operations$List, options: MethodOptions | BodyResponseCallback<Schema$ListOperationsResponse>, callback: BodyResponseCallback<Schema$ListOperationsResponse>): void;
        list(params: Params$Resource$Projects$Locations$Operations$List, callback: BodyResponseCallback<Schema$ListOperationsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListOperationsResponse>): void;
    }
    export interface Params$Resource$Projects$Locations$Operations$Cancel extends StandardParameters {
        /**
         * The name of the operation resource to be cancelled.
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Locations$Operations$Delete extends StandardParameters {
        /**
         * The name of the operation resource to be deleted.
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Locations$Operations$Get extends StandardParameters {
        /**
         * The name of the operation resource.
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Locations$Operations$List extends StandardParameters {
        /**
         * The standard list filter.
         */
        filter?: string;
        /**
         * The name of the operation's parent resource.
         */
        name?: string;
        /**
         * The standard list page size.
         */
        pageSize?: number;
        /**
         * The standard list page token.
         */
        pageToken?: string;
    }
    export {};
}
