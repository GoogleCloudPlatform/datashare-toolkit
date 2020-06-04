/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace genomics_v1 {
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
     * Genomics API
     *
     * Uploads, processes, queries, and searches Genomics data in the cloud.
     *
     * @example
     * const {google} = require('googleapis');
     * const genomics = google.genomics('v1');
     *
     * @namespace genomics
     * @type {Function}
     * @version v1
     * @variation v1
     * @param {object=} options Options for Genomics
     */
    export class Genomics {
        context: APIRequestContext;
        operations: Resource$Operations;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    /**
     * The request message for Operations.CancelOperation.
     */
    export interface Schema$CancelOperationRequest {
    }
    /**
     * Describes a Compute Engine resource that is being managed by a running pipeline.
     */
    export interface Schema$ComputeEngine {
        /**
         * The names of the disks that were created for this pipeline.
         */
        diskNames?: string[] | null;
        /**
         * The instance on which the operation is running.
         */
        instanceName?: string | null;
        /**
         * The machine type of the instance.
         */
        machineType?: string | null;
        /**
         * The availability zone in which the instance resides.
         */
        zone?: string | null;
    }
    /**
     * An event generated when a container is forcibly terminated by the worker. Currently, this only occurs when the container outlives the timeout specified by the user.
     */
    export interface Schema$ContainerKilledEvent {
        /**
         * The numeric ID of the action that started the container.
         */
        actionId?: number | null;
    }
    /**
     * An event generated when a container starts.
     */
    export interface Schema$ContainerStartedEvent {
        /**
         * The numeric ID of the action that started this container.
         */
        actionId?: number | null;
        /**
         * The public IP address that can be used to connect to the container. This field is only populated when at least one port mapping is present. If the instance was created with a private address, this field will be empty even if port mappings exist.
         */
        ipAddress?: string | null;
        /**
         * The container-to-host port mappings installed for this container. This set will contain any ports exposed using the `PUBLISH_EXPOSED_PORTS` flag as well as any specified in the `Action` definition.
         */
        portMappings?: {
            [key: string]: number;
        } | null;
    }
    /**
     * An event generated when a container exits.
     */
    export interface Schema$ContainerStoppedEvent {
        /**
         * The numeric ID of the action that started this container.
         */
        actionId?: number | null;
        /**
         * The exit status of the container.
         */
        exitStatus?: number | null;
        /**
         * The tail end of any content written to standard error by the container. If the content emits large amounts of debugging noise or contains sensitive information, you can prevent the content from being printed by setting the `DISABLE_STANDARD_ERROR_CAPTURE` flag.  Note that only a small amount of the end of the stream is captured here. The entire stream is stored in the `/google/logs` directory mounted into each action, and can be copied off the machine as described elsewhere.
         */
        stderr?: string | null;
    }
    /**
     * An event generated whenever a resource limitation or transient error delays execution of a pipeline that was otherwise ready to run.
     */
    export interface Schema$DelayedEvent {
        /**
         * A textual description of the cause of the delay. The string can change without notice because it is often generated by another service (such as Compute Engine).
         */
        cause?: string | null;
        /**
         * If the delay was caused by a resource shortage, this field lists the Compute Engine metrics that are preventing this operation from running (for example, `CPUS` or `INSTANCES`). If the particular metric is not known, a single `UNKNOWN` metric will be present.
         */
        metrics?: string[] | null;
    }
    /**
     * A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance:      service Foo {       rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty);     }  The JSON representation for `Empty` is empty JSON object `{}`.
     */
    export interface Schema$Empty {
    }
    /**
     * Carries information about events that occur during pipeline execution.
     */
    export interface Schema$Event {
        /**
         * A human-readable description of the event. Note that these strings can change at any time without notice. Any application logic must use the information in the `details` field.
         */
        description?: string | null;
        /**
         * Machine-readable details about the event.
         */
        details?: {
            [key: string]: any;
        } | null;
        /**
         * The time at which the event occurred.
         */
        timestamp?: string | null;
    }
    /**
     * An event generated when the execution of a pipeline has failed. Note that other events can continue to occur after this event.
     */
    export interface Schema$FailedEvent {
        /**
         * The human-readable description of the cause of the failure.
         */
        cause?: string | null;
        /**
         * The Google standard error code that best describes this failure.
         */
        code?: string | null;
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
         * An OperationMetadata or Metadata object. This will always be returned with the Operation.
         */
        metadata?: {
            [key: string]: any;
        } | null;
        /**
         * The server-assigned name, which is only unique within the same service that originally returns it. For example&amp;#58; `operations/CJHU7Oi_ChDrveSpBRjfuL-qzoWAgEw`
         */
        name?: string | null;
        /**
         * An Empty object.
         */
        response?: {
            [key: string]: any;
        } | null;
    }
    /**
     * An event that occurred during an Operation.
     */
    export interface Schema$OperationEvent {
        /**
         * Required description of event.
         */
        description?: string | null;
        /**
         * Optional time of when event finished. An event can have a start time and no finish time. If an event has a finish time, there must be a start time.
         */
        endTime?: string | null;
        /**
         * Optional time of when event started.
         */
        startTime?: string | null;
    }
    /**
     * Metadata describing an Operation.
     */
    export interface Schema$OperationMetadata {
        /**
         * This field is deprecated. Use `labels` instead. Optionally provided by the caller when submitting the request that creates the operation.
         */
        clientId?: string | null;
        /**
         * The time at which the job was submitted to the Genomics service.
         */
        createTime?: string | null;
        /**
         * The time at which the job stopped running.
         */
        endTime?: string | null;
        /**
         * Optional event messages that were generated during the job&#39;s execution. This also contains any warnings that were generated during import or export.
         */
        events?: Schema$OperationEvent[];
        /**
         * Optionally provided by the caller when submitting the request that creates the operation.
         */
        labels?: {
            [key: string]: string;
        } | null;
        /**
         * The Google Cloud Project in which the job is scoped.
         */
        projectId?: string | null;
        /**
         * The original request that started the operation. Note that this will be in current version of the API. If the operation was started with v1beta2 API and a GetOperation is performed on v1 API, a v1 request will be returned.
         */
        request?: {
            [key: string]: any;
        } | null;
        /**
         * Runtime metadata on this Operation.
         */
        runtimeMetadata?: {
            [key: string]: any;
        } | null;
        /**
         * The time at which the job began to run.
         */
        startTime?: string | null;
    }
    /**
     * An event generated when the worker starts pulling an image.
     */
    export interface Schema$PullStartedEvent {
        /**
         * The URI of the image that was pulled.
         */
        imageUri?: string | null;
    }
    /**
     * An event generated when the worker stops pulling an image.
     */
    export interface Schema$PullStoppedEvent {
        /**
         * The URI of the image that was pulled.
         */
        imageUri?: string | null;
    }
    /**
     * The response to the RunPipeline method, returned in the operation&#39;s result field on success.
     */
    export interface Schema$RunPipelineResponse {
    }
    /**
     * Runtime metadata that will be populated in the runtimeMetadata field of the Operation associated with a RunPipeline execution.
     */
    export interface Schema$RuntimeMetadata {
        /**
         * Execution information specific to Google Compute Engine.
         */
        computeEngine?: Schema$ComputeEngine;
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
     * An event generated when the execution of a container results in a non-zero exit status that was not otherwise ignored. Execution will continue, but only actions that are flagged as `ALWAYS_RUN` will be executed. Other actions will be skipped.
     */
    export interface Schema$UnexpectedExitStatusEvent {
        /**
         * The numeric ID of the action that started the container.
         */
        actionId?: number | null;
        /**
         * The exit status of the container.
         */
        exitStatus?: number | null;
    }
    /**
     * An event generated after a worker VM has been assigned to run the pipeline.
     */
    export interface Schema$WorkerAssignedEvent {
        /**
         * The worker&#39;s instance name.
         */
        instance?: string | null;
        /**
         * The machine type that was assigned for the worker.
         */
        machineType?: string | null;
        /**
         * The zone the worker is running in.
         */
        zone?: string | null;
    }
    /**
     * An event generated when the worker VM that was assigned to the pipeline has been released (deleted).
     */
    export interface Schema$WorkerReleasedEvent {
        /**
         * The worker&#39;s instance name.
         */
        instance?: string | null;
        /**
         * The zone the worker was running in.
         */
        zone?: string | null;
    }
    export class Resource$Operations {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * genomics.operations.cancel
         * @desc Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. Clients may use Operations.GetOperation or Operations.ListOperations to check whether the cancellation succeeded or the operation completed despite cancellation. Authorization requires the following [Google IAM](https://cloud.google.com/iam) permission&#58;  * `genomics.operations.cancel`
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/genomics.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const genomics = google.genomics('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/genomics',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await genomics.operations.cancel({
         *     // The name of the operation resource to be cancelled.
         *     name: 'operations/.*',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {}
         *     },
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
         * @alias genomics.operations.cancel
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The name of the operation resource to be cancelled.
         * @param {().CancelOperationRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        cancel(params: Params$Resource$Operations$Cancel, options: StreamMethodOptions): GaxiosPromise<Readable>;
        cancel(params?: Params$Resource$Operations$Cancel, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        cancel(params: Params$Resource$Operations$Cancel, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        cancel(params: Params$Resource$Operations$Cancel, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        cancel(params: Params$Resource$Operations$Cancel, callback: BodyResponseCallback<Schema$Empty>): void;
        cancel(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * genomics.operations.get
         * @desc Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. Authorization requires the following [Google IAM](https://cloud.google.com/iam) permission&#58;  * `genomics.operations.get`
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/genomics.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const genomics = google.genomics('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/genomics',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await genomics.operations.get({
         *     // The name of the operation resource.
         *     name: 'operations/.*',
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
         * @alias genomics.operations.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The name of the operation resource.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Operations$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Operations$Get, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        get(params: Params$Resource$Operations$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Operations$Get, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        get(params: Params$Resource$Operations$Get, callback: BodyResponseCallback<Schema$Operation>): void;
        get(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * genomics.operations.list
         * @desc Lists operations that match the specified filter in the request. Authorization requires the following [Google IAM](https://cloud.google.com/iam) permission&#58;  * `genomics.operations.list`
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/genomics.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const genomics = google.genomics('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/genomics',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await genomics.operations.list({
         *     // A string for filtering Operations.
         *     // In v2alpha1, the following filter fields are supported&#58;
         *     //
         *     // * createTime&#58; The time this job was created
         *     // * events&#58; The set of event (names) that have occurred while running
         *     //   the pipeline.  The &#58; operator can be used to determine if a
         *     //   particular event has occurred.
         *     // * error&#58; If the pipeline is running, this value is NULL.  Once the
         *     //   pipeline finishes, the value is the standard Google error code.
         *     // * labels.key or labels."key with space" where key is a label key.
         *     // * done&#58; If the pipeline is running, this value is false. Once the
         *     //   pipeline finishes, the value is true.
         *     //
         *     // In v1 and v1alpha2, the following filter fields are supported&#58;
         *     //
         *     // * projectId&#58; Required. Corresponds to
         *     //   OperationMetadata.projectId.
         *     // * createTime&#58; The time this job was created, in seconds from the
         *     //   [epoch](http://en.wikipedia.org/wiki/Unix_time). Can use `>=` and/or `<=`
         *     //   operators.
         *     // * status&#58; Can be `RUNNING`, `SUCCESS`, `FAILURE`, or `CANCELED`. Only
         *     //   one status may be specified.
         *     // * labels.key where key is a label key.
         *     //
         *     // Examples&#58;
         *     //
         *     // * `projectId = my-project AND createTime >= 1432140000`
         *     // * `projectId = my-project AND createTime >= 1432140000 AND createTime <= 1432150000 AND status = RUNNING`
         *     // * `projectId = my-project AND labels.color = *`
         *     // * `projectId = my-project AND labels.color = red`
         *     filter: 'placeholder-value',
         *     // The name of the operation's parent resource.
         *     name: 'operations',
         *     // The maximum number of results to return. The maximum value is 256.
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
         * @alias genomics.operations.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.filter A string for filtering Operations. In v2alpha1, the following filter fields are supported&#58;  * createTime&#58; The time this job was created * events&#58; The set of event (names) that have occurred while running   the pipeline.  The &#58; operator can be used to determine if a   particular event has occurred. * error&#58; If the pipeline is running, this value is NULL.  Once the   pipeline finishes, the value is the standard Google error code. * labels.key or labels."key with space" where key is a label key. * done&#58; If the pipeline is running, this value is false. Once the   pipeline finishes, the value is true.  In v1 and v1alpha2, the following filter fields are supported&#58;  * projectId&#58; Required. Corresponds to   OperationMetadata.projectId. * createTime&#58; The time this job was created, in seconds from the   [epoch](http://en.wikipedia.org/wiki/Unix_time). Can use `>=` and/or `<=`   operators. * status&#58; Can be `RUNNING`, `SUCCESS`, `FAILURE`, or `CANCELED`. Only   one status may be specified. * labels.key where key is a label key.  Examples&#58;  * `projectId = my-project AND createTime >= 1432140000` * `projectId = my-project AND createTime >= 1432140000 AND createTime <= 1432150000 AND status = RUNNING` * `projectId = my-project AND labels.color = *` * `projectId = my-project AND labels.color = red`
         * @param {string} params.name The name of the operation's parent resource.
         * @param {integer=} params.pageSize The maximum number of results to return. The maximum value is 256.
         * @param {string=} params.pageToken The standard list page token.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Operations$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Operations$List, options?: MethodOptions): GaxiosPromise<Schema$ListOperationsResponse>;
        list(params: Params$Resource$Operations$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Operations$List, options: MethodOptions | BodyResponseCallback<Schema$ListOperationsResponse>, callback: BodyResponseCallback<Schema$ListOperationsResponse>): void;
        list(params: Params$Resource$Operations$List, callback: BodyResponseCallback<Schema$ListOperationsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListOperationsResponse>): void;
    }
    export interface Params$Resource$Operations$Cancel extends StandardParameters {
        /**
         * The name of the operation resource to be cancelled.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$CancelOperationRequest;
    }
    export interface Params$Resource$Operations$Get extends StandardParameters {
        /**
         * The name of the operation resource.
         */
        name?: string;
    }
    export interface Params$Resource$Operations$List extends StandardParameters {
        /**
         * A string for filtering Operations. In v2alpha1, the following filter fields are supported&#58;  * createTime&#58; The time this job was created * events&#58; The set of event (names) that have occurred while running   the pipeline.  The &#58; operator can be used to determine if a   particular event has occurred. * error&#58; If the pipeline is running, this value is NULL.  Once the   pipeline finishes, the value is the standard Google error code. * labels.key or labels."key with space" where key is a label key. * done&#58; If the pipeline is running, this value is false. Once the   pipeline finishes, the value is true.  In v1 and v1alpha2, the following filter fields are supported&#58;  * projectId&#58; Required. Corresponds to   OperationMetadata.projectId. * createTime&#58; The time this job was created, in seconds from the   [epoch](http://en.wikipedia.org/wiki/Unix_time). Can use `>=` and/or `<=`   operators. * status&#58; Can be `RUNNING`, `SUCCESS`, `FAILURE`, or `CANCELED`. Only   one status may be specified. * labels.key where key is a label key.  Examples&#58;  * `projectId = my-project AND createTime >= 1432140000` * `projectId = my-project AND createTime >= 1432140000 AND createTime <= 1432150000 AND status = RUNNING` * `projectId = my-project AND labels.color = *` * `projectId = my-project AND labels.color = red`
         */
        filter?: string;
        /**
         * The name of the operation's parent resource.
         */
        name?: string;
        /**
         * The maximum number of results to return. The maximum value is 256.
         */
        pageSize?: number;
        /**
         * The standard list page token.
         */
        pageToken?: string;
    }
    export {};
}
