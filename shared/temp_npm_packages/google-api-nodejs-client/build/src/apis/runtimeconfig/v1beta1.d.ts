/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace runtimeconfig_v1beta1 {
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
     * Cloud Runtime Configuration API
     *
     * The Runtime Configurator allows you to dynamically configure and expose variables through Google Cloud Platform. In addition, you can also set Watchers and Waiters that will watch for changes to your data and return based on certain conditions.
     *
     * @example
     * const {google} = require('googleapis');
     * const runtimeconfig = google.runtimeconfig('v1beta1');
     *
     * @namespace runtimeconfig
     * @type {Function}
     * @version v1beta1
     * @variation v1beta1
     * @param {object=} options Options for Runtimeconfig
     */
    export class Runtimeconfig {
        context: APIRequestContext;
        projects: Resource$Projects;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    /**
     * Associates `members` with a `role`.
     */
    export interface Schema$Binding {
        /**
         * The condition that is associated with this binding.  If the condition evaluates to `true`, then this binding applies to the current request.  If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the members in this binding.  To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
         */
        condition?: Schema$Expr;
        /**
         * Specifies the identities requesting access for a Cloud Platform resource. `members` can have the following values:  * `allUsers`: A special identifier that represents anyone who is    on the internet; with or without a Google account.  * `allAuthenticatedUsers`: A special identifier that represents anyone    who is authenticated with a Google account or a service account.  * `user:{emailid}`: An email address that represents a specific Google    account. For example, `alice@example.com` .   * `serviceAccount:{emailid}`: An email address that represents a service    account. For example, `my-other-app@appspot.gserviceaccount.com`.  * `group:{emailid}`: An email address that represents a Google group.    For example, `admins@example.com`.  * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique    identifier) representing a user that has been recently deleted. For    example, `alice@example.com?uid=123456789012345678901`. If the user is    recovered, this value reverts to `user:{emailid}` and the recovered user    retains the role in the binding.  * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus    unique identifier) representing a service account that has been recently    deleted. For example,    `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`.    If the service account is undeleted, this value reverts to    `serviceAccount:{emailid}` and the undeleted service account retains the    role in the binding.  * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique    identifier) representing a Google group that has been recently    deleted. For example, `admins@example.com?uid=123456789012345678901`. If    the group is recovered, this value reverts to `group:{emailid}` and the    recovered group retains the role in the binding.   * `domain:{domain}`: The G Suite domain (primary) that represents all the    users of that domain. For example, `google.com` or `example.com`.
         */
        members?: string[] | null;
        /**
         * Role that is assigned to `members`. For example, `roles/viewer`, `roles/editor`, or `roles/owner`.
         */
        role?: string | null;
    }
    /**
     * A Cardinality condition for the Waiter resource. A cardinality condition is met when the number of variables under a specified path prefix reaches a predefined number. For example, if you set a Cardinality condition where the `path` is set to `/foo` and the number of paths is set to `2`, the following variables would meet the condition in a RuntimeConfig resource:  + `/foo/variable1 = &quot;value1&quot;` + `/foo/variable2 = &quot;value2&quot;` + `/bar/variable3 = &quot;value3&quot;`  It would not satisfy the same condition with the `number` set to `3`, however, because there is only 2 paths that start with `/foo`. Cardinality conditions are recursive; all subtrees under the specific path prefix are counted.
     */
    export interface Schema$Cardinality {
        /**
         * The number variables under the `path` that must exist to meet this condition. Defaults to 1 if not specified.
         */
        number?: number | null;
        /**
         * The root of the variable subtree to monitor. For example, `/foo`.
         */
        path?: string | null;
    }
    /**
     * A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance:      service Foo {       rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty);     }  The JSON representation for `Empty` is empty JSON object `{}`.
     */
    export interface Schema$Empty {
    }
    /**
     * The condition that a Waiter resource is waiting for.
     */
    export interface Schema$EndCondition {
        /**
         * The cardinality of the `EndCondition`.
         */
        cardinality?: Schema$Cardinality;
    }
    /**
     * Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec.  Example (Comparison):      title: &quot;Summary size limit&quot;     description: &quot;Determines if a summary is less than 100 chars&quot;     expression: &quot;document.summary.size() &lt; 100&quot;  Example (Equality):      title: &quot;Requestor is owner&quot;     description: &quot;Determines if requestor is the document owner&quot;     expression: &quot;document.owner == request.auth.claims.email&quot;  Example (Logic):      title: &quot;Public documents&quot;     description: &quot;Determine whether the document should be publicly visible&quot;     expression: &quot;document.type != &#39;private&#39; &amp;&amp; document.type != &#39;internal&#39;&quot;  Example (Data Manipulation):      title: &quot;Notification string&quot;     description: &quot;Create a notification string with a timestamp.&quot;     expression: &quot;&#39;New message received at &#39; + string(document.create_time)&quot;  The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
     */
    export interface Schema$Expr {
        /**
         * Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI.
         */
        description?: string | null;
        /**
         * Textual representation of an expression in Common Expression Language syntax.
         */
        expression?: string | null;
        /**
         * Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file.
         */
        location?: string | null;
        /**
         * Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression.
         */
        title?: string | null;
    }
    /**
     * `ListConfigs()` returns the following response. The order of returned objects is arbitrary; that is, it is not ordered in any particular way.
     */
    export interface Schema$ListConfigsResponse {
        /**
         * A list of the configurations in the project. The order of returned objects is arbitrary; that is, it is not ordered in any particular way.
         */
        configs?: Schema$RuntimeConfig[];
        /**
         * This token allows you to get the next page of results for list requests. If the number of results is larger than `pageSize`, use the `nextPageToken` as a value for the query parameter `pageToken` in the next list request. Subsequent list requests will have their own `nextPageToken` to continue paging through the results
         */
        nextPageToken?: string | null;
    }
    /**
     * Response for the `ListVariables()` method.
     */
    export interface Schema$ListVariablesResponse {
        /**
         * This token allows you to get the next page of results for list requests. If the number of results is larger than `pageSize`, use the `nextPageToken` as a value for the query parameter `pageToken` in the next list request. Subsequent list requests will have their own `nextPageToken` to continue paging through the results
         */
        nextPageToken?: string | null;
        /**
         * A list of variables and their values. The order of returned variable objects is arbitrary.
         */
        variables?: Schema$Variable[];
    }
    /**
     * Response for the `ListWaiters()` method. Order of returned waiter objects is arbitrary.
     */
    export interface Schema$ListWaitersResponse {
        /**
         * This token allows you to get the next page of results for list requests. If the number of results is larger than `pageSize`, use the `nextPageToken` as a value for the query parameter `pageToken` in the next list request. Subsequent list requests will have their own `nextPageToken` to continue paging through the results
         */
        nextPageToken?: string | null;
        /**
         * Found waiters in the project.
         */
        waiters?: Schema$Waiter[];
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
         * Service-specific metadata associated with the operation.  It typically contains progress information and common metadata such as create time. Some services might not provide such metadata.  Any method that returns a long-running operation should document the metadata type, if any.
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
     * An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources.   A `Policy` is a collection of `bindings`. A `binding` binds one or more `members` to a single `role`. Members can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role.  For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies).  **JSON example:**      {       &quot;bindings&quot;: [         {           &quot;role&quot;: &quot;roles/resourcemanager.organizationAdmin&quot;,           &quot;members&quot;: [             &quot;user:mike@example.com&quot;,             &quot;group:admins@example.com&quot;,             &quot;domain:google.com&quot;,             &quot;serviceAccount:my-project-id@appspot.gserviceaccount.com&quot;           ]         },         {           &quot;role&quot;: &quot;roles/resourcemanager.organizationViewer&quot;,           &quot;members&quot;: [             &quot;user:eve@example.com&quot;           ],           &quot;condition&quot;: {             &quot;title&quot;: &quot;expirable access&quot;,             &quot;description&quot;: &quot;Does not grant access after Sep 2020&quot;,             &quot;expression&quot;: &quot;request.time &lt; timestamp(&#39;2020-10-01T00:00:00.000Z&#39;)&quot;,           }         }       ],       &quot;etag&quot;: &quot;BwWWja0YfJA=&quot;,       &quot;version&quot;: 3     }  **YAML example:**      bindings:     - members:       - user:mike@example.com       - group:admins@example.com       - domain:google.com       - serviceAccount:my-project-id@appspot.gserviceaccount.com       role: roles/resourcemanager.organizationAdmin     - members:       - user:eve@example.com       role: roles/resourcemanager.organizationViewer       condition:         title: expirable access         description: Does not grant access after Sep 2020         expression: request.time &lt; timestamp(&#39;2020-10-01T00:00:00.000Z&#39;)     - etag: BwWWja0YfJA=     - version: 3  For a description of IAM and its features, see the [IAM documentation](https://cloud.google.com/iam/docs/).
     */
    export interface Schema$Policy {
        /**
         * Associates a list of `members` to a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one member.
         */
        bindings?: Schema$Binding[];
        /**
         * `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy.  **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost.
         */
        etag?: string | null;
        /**
         * Specifies the format of the policy.  Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected.  Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations:  * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy   that includes conditions  **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost.  If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset.  To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
         */
        version?: number | null;
    }
    /**
     * A RuntimeConfig resource is the primary resource in the Cloud RuntimeConfig service. A RuntimeConfig resource consists of metadata and a hierarchy of variables.
     */
    export interface Schema$RuntimeConfig {
        /**
         * An optional description of the RuntimeConfig object.
         */
        description?: string | null;
        /**
         * The resource name of a runtime config. The name must have the format:      projects/[PROJECT_ID]/configs/[CONFIG_NAME]  The `[PROJECT_ID]` must be a valid project ID, and `[CONFIG_NAME]` is an arbitrary name that matches the `[0-9A-Za-z](?:[_.A-Za-z0-9-]{0,62}[_.A-Za-z0-9])?` regular expression. The length of `[CONFIG_NAME]` must be less than 64 characters.  You pick the RuntimeConfig resource name, but the server will validate that the name adheres to this format. After you create the resource, you cannot change the resource&#39;s name.
         */
        name?: string | null;
    }
    /**
     * Request message for `SetIamPolicy` method.
     */
    export interface Schema$SetIamPolicyRequest {
        /**
         * REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Cloud Platform services (such as Projects) might reject them.
         */
        policy?: Schema$Policy;
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
     * Request message for `TestIamPermissions` method.
     */
    export interface Schema$TestIamPermissionsRequest {
        /**
         * The set of permissions to check for the `resource`. Permissions with wildcards (such as &#39;*&#39; or &#39;storage.*&#39;) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions).
         */
        permissions?: string[] | null;
    }
    /**
     * Response message for `TestIamPermissions` method.
     */
    export interface Schema$TestIamPermissionsResponse {
        /**
         * A subset of `TestPermissionsRequest.permissions` that the caller is allowed.
         */
        permissions?: string[] | null;
    }
    /**
     * Describes a single variable within a RuntimeConfig resource. The name denotes the hierarchical variable name. For example, `ports/serving_port` is a valid variable name. The variable value is an opaque string and only leaf variables can have values (that is, variables that do not have any child variables).
     */
    export interface Schema$Variable {
        /**
         * The name of the variable resource, in the format:      projects/[PROJECT_ID]/configs/[CONFIG_NAME]/variables/[VARIABLE_NAME]  The `[PROJECT_ID]` must be a valid project ID, `[CONFIG_NAME]` must be a valid RuntimeConfig resource and `[VARIABLE_NAME]` follows Unix file system file path naming.  The `[VARIABLE_NAME]` can contain ASCII letters, numbers, slashes and dashes. Slashes are used as path element separators and are not part of the `[VARIABLE_NAME]` itself, so `[VARIABLE_NAME]` must contain at least one non-slash character. Multiple slashes are coalesced into single slash character. Each path segment should match [0-9A-Za-z](?:[_.A-Za-z0-9-]{0,62}[_.A-Za-z0-9])? regular expression. The length of a `[VARIABLE_NAME]` must be less than 256 characters.  Once you create a variable, you cannot change the variable name.
         */
        name?: string | null;
        /**
         * Output only. The current state of the variable. The variable state indicates the outcome of the `variables().watch` call and is visible through the `get` and `list` calls.
         */
        state?: string | null;
        /**
         * The string value of the variable. The length of the value must be less than 4096 bytes. Empty values are also accepted. For example, `text: &quot;my text value&quot;`. The string must be valid UTF-8.
         */
        text?: string | null;
        /**
         * Output only. The time of the last variable update. Timestamp will be UTC timestamp.
         */
        updateTime?: string | null;
        /**
         * The binary value of the variable. The length of the value must be less than 4096 bytes. Empty values are also accepted. The value must be base64 encoded, and must comply with IETF RFC4648 (https://www.ietf.org/rfc/rfc4648.txt). Only one of `value` or `text` can be set.
         */
        value?: string | null;
    }
    /**
     * A Waiter resource waits for some end condition within a RuntimeConfig resource to be met before it returns. For example, assume you have a distributed system where each node writes to a Variable resource indicating the node&#39;s readiness as part of the startup process.  You then configure a Waiter resource with the success condition set to wait until some number of nodes have checked in. Afterwards, your application runs some arbitrary code after the condition has been met and the waiter returns successfully.  Once created, a Waiter resource is immutable.  To learn more about using waiters, read the [Creating a Waiter](/deployment-manager/runtime-configurator/creating-a-waiter) documentation.
     */
    export interface Schema$Waiter {
        /**
         * Output only. The instant at which this Waiter resource was created. Adding the value of `timeout` to this instant yields the timeout deadline for the waiter.
         */
        createTime?: string | null;
        /**
         * Output only. If the value is `false`, it means the waiter is still waiting for one of its conditions to be met.  If true, the waiter has finished. If the waiter finished due to a timeout or failure, `error` will be set.
         */
        done?: boolean | null;
        /**
         * Output only. If the waiter ended due to a failure or timeout, this value will be set.
         */
        error?: Schema$Status;
        /**
         * [Optional] The failure condition of this waiter. If this condition is met, `done` will be set to `true` and the `error` code will be set to `ABORTED`. The failure condition takes precedence over the success condition. If both conditions are met, a failure will be indicated. This value is optional; if no failure condition is set, the only failure scenario will be a timeout.
         */
        failure?: Schema$EndCondition;
        /**
         * The name of the Waiter resource, in the format:      projects/[PROJECT_ID]/configs/[CONFIG_NAME]/waiters/[WAITER_NAME]  The `[PROJECT_ID]` must be a valid Google Cloud project ID, the `[CONFIG_NAME]` must be a valid RuntimeConfig resource, the `[WAITER_NAME]` must match RFC 1035 segment specification, and the length of `[WAITER_NAME]` must be less than 64 bytes.  After you create a Waiter resource, you cannot change the resource name.
         */
        name?: string | null;
        /**
         * [Required] The success condition. If this condition is met, `done` will be set to `true` and the `error` value will remain unset. The failure condition takes precedence over the success condition. If both conditions are met, a failure will be indicated.
         */
        success?: Schema$EndCondition;
        /**
         * [Required] Specifies the timeout of the waiter in seconds, beginning from the instant that `waiters().create` method is called. If this time elapses before the success or failure conditions are met, the waiter fails and sets the `error` code to `DEADLINE_EXCEEDED`.
         */
        timeout?: string | null;
    }
    /**
     * Request for the `WatchVariable()` method.
     */
    export interface Schema$WatchVariableRequest {
        /**
         * If specified, checks the current timestamp of the variable and if the current timestamp is newer than `newerThan` timestamp, the method returns immediately.  If not specified or the variable has an older timestamp, the watcher waits for a the value to change before returning.
         */
        newerThan?: string | null;
    }
    export class Resource$Projects {
        context: APIRequestContext;
        configs: Resource$Projects$Configs;
        constructor(context: APIRequestContext);
    }
    export class Resource$Projects$Configs {
        context: APIRequestContext;
        operations: Resource$Projects$Configs$Operations;
        variables: Resource$Projects$Configs$Variables;
        waiters: Resource$Projects$Configs$Waiters;
        constructor(context: APIRequestContext);
        /**
         * runtimeconfig.projects.configs.create
         * @desc Creates a new RuntimeConfig resource. The configuration name must be unique within project.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/runtimeconfig.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const runtimeconfig = google.runtimeconfig('v1beta1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudruntimeconfig',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await runtimeconfig.projects.configs.create({
         *     // The [project
         *     // ID](https://support.google.com/cloud/answer/6158840?hl=en&ref_topic=6158848)
         *     // for this request, in the format `projects/[PROJECT_ID]`.
         *     parent: 'projects/my-project',
         *     // An optional but recommended unique `request_id`. If the server
         *     // receives two `create()` requests  with the same
         *     // `request_id`, then the second request will be ignored and the
         *     // first resource created and stored in the backend is returned.
         *     // Empty `request_id` fields are ignored.
         *     //
         *     // It is responsibility of the client to ensure uniqueness of the
         *     // `request_id` strings.
         *     //
         *     // `request_id` strings are limited to 64 characters.
         *     requestId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "description": "my_description",
         *       //   "name": "my_name"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "description": "my_description",
         *   //   "name": "my_name"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias runtimeconfig.projects.configs.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent The [project ID](https://support.google.com/cloud/answer/6158840?hl=en&ref_topic=6158848) for this request, in the format `projects/[PROJECT_ID]`.
         * @param {string=} params.requestId An optional but recommended unique `request_id`. If the server receives two `create()` requests  with the same `request_id`, then the second request will be ignored and the first resource created and stored in the backend is returned. Empty `request_id` fields are ignored.  It is responsibility of the client to ensure uniqueness of the `request_id` strings.  `request_id` strings are limited to 64 characters.
         * @param {().RuntimeConfig} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Projects$Configs$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Projects$Configs$Create, options?: MethodOptions): GaxiosPromise<Schema$RuntimeConfig>;
        create(params: Params$Resource$Projects$Configs$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Projects$Configs$Create, options: MethodOptions | BodyResponseCallback<Schema$RuntimeConfig>, callback: BodyResponseCallback<Schema$RuntimeConfig>): void;
        create(params: Params$Resource$Projects$Configs$Create, callback: BodyResponseCallback<Schema$RuntimeConfig>): void;
        create(callback: BodyResponseCallback<Schema$RuntimeConfig>): void;
        /**
         * runtimeconfig.projects.configs.delete
         * @desc Deletes a RuntimeConfig resource.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/runtimeconfig.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const runtimeconfig = google.runtimeconfig('v1beta1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudruntimeconfig',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await runtimeconfig.projects.configs.delete({
         *     // The RuntimeConfig resource to delete, in the format:
         *     //
         *     // `projects/[PROJECT_ID]/configs/[CONFIG_NAME]`
         *     name: 'projects/my-project/configs/my-config',
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
         * @alias runtimeconfig.projects.configs.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The RuntimeConfig resource to delete, in the format:  `projects/[PROJECT_ID]/configs/[CONFIG_NAME]`
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Projects$Configs$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Projects$Configs$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Projects$Configs$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Projects$Configs$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Projects$Configs$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * runtimeconfig.projects.configs.get
         * @desc Gets information about a RuntimeConfig resource.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/runtimeconfig.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const runtimeconfig = google.runtimeconfig('v1beta1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudruntimeconfig',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await runtimeconfig.projects.configs.get({
         *     // The name of the RuntimeConfig resource to retrieve, in the format:
         *     //
         *     // `projects/[PROJECT_ID]/configs/[CONFIG_NAME]`
         *     name: 'projects/my-project/configs/my-config',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "description": "my_description",
         *   //   "name": "my_name"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias runtimeconfig.projects.configs.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The name of the RuntimeConfig resource to retrieve, in the format:  `projects/[PROJECT_ID]/configs/[CONFIG_NAME]`
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Configs$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Configs$Get, options?: MethodOptions): GaxiosPromise<Schema$RuntimeConfig>;
        get(params: Params$Resource$Projects$Configs$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Configs$Get, options: MethodOptions | BodyResponseCallback<Schema$RuntimeConfig>, callback: BodyResponseCallback<Schema$RuntimeConfig>): void;
        get(params: Params$Resource$Projects$Configs$Get, callback: BodyResponseCallback<Schema$RuntimeConfig>): void;
        get(callback: BodyResponseCallback<Schema$RuntimeConfig>): void;
        /**
         * runtimeconfig.projects.configs.getIamPolicy
         * @desc Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/runtimeconfig.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const runtimeconfig = google.runtimeconfig('v1beta1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudruntimeconfig',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await runtimeconfig.projects.configs.getIamPolicy({
         *     // Optional. The policy format version to be returned.
         *     //
         *     // Valid values are 0, 1, and 3. Requests specifying an invalid value will be
         *     // rejected.
         *     //
         *     // Requests for policies with any conditional bindings must specify version 3.
         *     // Policies without any conditional bindings may specify any valid value or
         *     // leave the field unset.
         *     //
         *     // To learn which resources support conditions in their IAM policies, see the
         *     // [IAM
         *     // documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
         *     'options.requestedPolicyVersion': 'placeholder-value',
         *     // REQUIRED: The resource for which the policy is being requested.
         *     // See the operation documentation for the appropriate value for this field.
         *     resource: 'projects/my-project/configs/my-config',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bindings": [],
         *   //   "etag": "my_etag",
         *   //   "version": 0
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias runtimeconfig.projects.configs.getIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.options.requestedPolicyVersion Optional. The policy format version to be returned.  Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.  Requests for policies with any conditional bindings must specify version 3. Policies without any conditional bindings may specify any valid value or leave the field unset.  To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
         * @param {string} params.resource_ REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getIamPolicy(params: Params$Resource$Projects$Configs$Getiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getIamPolicy(params?: Params$Resource$Projects$Configs$Getiampolicy, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        getIamPolicy(params: Params$Resource$Projects$Configs$Getiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getIamPolicy(params: Params$Resource$Projects$Configs$Getiampolicy, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        getIamPolicy(params: Params$Resource$Projects$Configs$Getiampolicy, callback: BodyResponseCallback<Schema$Policy>): void;
        getIamPolicy(callback: BodyResponseCallback<Schema$Policy>): void;
        /**
         * runtimeconfig.projects.configs.list
         * @desc Lists all the RuntimeConfig resources within project.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/runtimeconfig.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const runtimeconfig = google.runtimeconfig('v1beta1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudruntimeconfig',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await runtimeconfig.projects.configs.list({
         *     // Specifies the number of results to return per page. If there are fewer
         *     // elements than the specified number, returns all elements.
         *     pageSize: 'placeholder-value',
         *     // Specifies a page token to use. Set `pageToken` to a `nextPageToken`
         *     // returned by a previous list request to get the next page of results.
         *     pageToken: 'placeholder-value',
         *     // The [project
         *     // ID](https://support.google.com/cloud/answer/6158840?hl=en&ref_topic=6158848)
         *     // for this request, in the format `projects/[PROJECT_ID]`.
         *     parent: 'projects/my-project',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "configs": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias runtimeconfig.projects.configs.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize Specifies the number of results to return per page. If there are fewer elements than the specified number, returns all elements.
         * @param {string=} params.pageToken Specifies a page token to use. Set `pageToken` to a `nextPageToken` returned by a previous list request to get the next page of results.
         * @param {string} params.parent The [project ID](https://support.google.com/cloud/answer/6158840?hl=en&ref_topic=6158848) for this request, in the format `projects/[PROJECT_ID]`.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Configs$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Configs$List, options?: MethodOptions): GaxiosPromise<Schema$ListConfigsResponse>;
        list(params: Params$Resource$Projects$Configs$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Configs$List, options: MethodOptions | BodyResponseCallback<Schema$ListConfigsResponse>, callback: BodyResponseCallback<Schema$ListConfigsResponse>): void;
        list(params: Params$Resource$Projects$Configs$List, callback: BodyResponseCallback<Schema$ListConfigsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListConfigsResponse>): void;
        /**
         * runtimeconfig.projects.configs.setIamPolicy
         * @desc Sets the access control policy on the specified resource. Replaces any existing policy.  Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/runtimeconfig.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const runtimeconfig = google.runtimeconfig('v1beta1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudruntimeconfig',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await runtimeconfig.projects.configs.setIamPolicy({
         *     // REQUIRED: The resource for which the policy is being specified.
         *     // See the operation documentation for the appropriate value for this field.
         *     resource: 'projects/my-project/configs/my-config',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "policy": {}
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bindings": [],
         *   //   "etag": "my_etag",
         *   //   "version": 0
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias runtimeconfig.projects.configs.setIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         * @param {().SetIamPolicyRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        setIamPolicy(params: Params$Resource$Projects$Configs$Setiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        setIamPolicy(params?: Params$Resource$Projects$Configs$Setiampolicy, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        setIamPolicy(params: Params$Resource$Projects$Configs$Setiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        setIamPolicy(params: Params$Resource$Projects$Configs$Setiampolicy, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        setIamPolicy(params: Params$Resource$Projects$Configs$Setiampolicy, callback: BodyResponseCallback<Schema$Policy>): void;
        setIamPolicy(callback: BodyResponseCallback<Schema$Policy>): void;
        /**
         * runtimeconfig.projects.configs.testIamPermissions
         * @desc Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error.  Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/runtimeconfig.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const runtimeconfig = google.runtimeconfig('v1beta1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudruntimeconfig',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await runtimeconfig.projects.configs.testIamPermissions({
         *     // REQUIRED: The resource for which the policy detail is being requested.
         *     // See the operation documentation for the appropriate value for this field.
         *     resource: 'projects/my-project/configs/my-config',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "permissions": []
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "permissions": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias runtimeconfig.projects.configs.testIamPermissions
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         * @param {().TestIamPermissionsRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        testIamPermissions(params: Params$Resource$Projects$Configs$Testiampermissions, options: StreamMethodOptions): GaxiosPromise<Readable>;
        testIamPermissions(params?: Params$Resource$Projects$Configs$Testiampermissions, options?: MethodOptions): GaxiosPromise<Schema$TestIamPermissionsResponse>;
        testIamPermissions(params: Params$Resource$Projects$Configs$Testiampermissions, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        testIamPermissions(params: Params$Resource$Projects$Configs$Testiampermissions, options: MethodOptions | BodyResponseCallback<Schema$TestIamPermissionsResponse>, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(params: Params$Resource$Projects$Configs$Testiampermissions, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        /**
         * runtimeconfig.projects.configs.update
         * @desc Updates a RuntimeConfig resource. The configuration must exist beforehand.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/runtimeconfig.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const runtimeconfig = google.runtimeconfig('v1beta1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudruntimeconfig',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await runtimeconfig.projects.configs.update({
         *     // The name of the RuntimeConfig resource to update, in the format:
         *     //
         *     // `projects/[PROJECT_ID]/configs/[CONFIG_NAME]`
         *     name: 'projects/my-project/configs/my-config',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "description": "my_description",
         *       //   "name": "my_name"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "description": "my_description",
         *   //   "name": "my_name"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias runtimeconfig.projects.configs.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The name of the RuntimeConfig resource to update, in the format:  `projects/[PROJECT_ID]/configs/[CONFIG_NAME]`
         * @param {().RuntimeConfig} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Projects$Configs$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Projects$Configs$Update, options?: MethodOptions): GaxiosPromise<Schema$RuntimeConfig>;
        update(params: Params$Resource$Projects$Configs$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Projects$Configs$Update, options: MethodOptions | BodyResponseCallback<Schema$RuntimeConfig>, callback: BodyResponseCallback<Schema$RuntimeConfig>): void;
        update(params: Params$Resource$Projects$Configs$Update, callback: BodyResponseCallback<Schema$RuntimeConfig>): void;
        update(callback: BodyResponseCallback<Schema$RuntimeConfig>): void;
    }
    export interface Params$Resource$Projects$Configs$Create extends StandardParameters {
        /**
         * The [project ID](https://support.google.com/cloud/answer/6158840?hl=en&ref_topic=6158848) for this request, in the format `projects/[PROJECT_ID]`.
         */
        parent?: string;
        /**
         * An optional but recommended unique `request_id`. If the server receives two `create()` requests  with the same `request_id`, then the second request will be ignored and the first resource created and stored in the backend is returned. Empty `request_id` fields are ignored.  It is responsibility of the client to ensure uniqueness of the `request_id` strings.  `request_id` strings are limited to 64 characters.
         */
        requestId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$RuntimeConfig;
    }
    export interface Params$Resource$Projects$Configs$Delete extends StandardParameters {
        /**
         * The RuntimeConfig resource to delete, in the format:  `projects/[PROJECT_ID]/configs/[CONFIG_NAME]`
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Configs$Get extends StandardParameters {
        /**
         * The name of the RuntimeConfig resource to retrieve, in the format:  `projects/[PROJECT_ID]/configs/[CONFIG_NAME]`
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Configs$Getiampolicy extends StandardParameters {
        /**
         * Optional. The policy format version to be returned.  Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.  Requests for policies with any conditional bindings must specify version 3. Policies without any conditional bindings may specify any valid value or leave the field unset.  To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
         */
        'options.requestedPolicyVersion'?: number;
        /**
         * REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
    }
    export interface Params$Resource$Projects$Configs$List extends StandardParameters {
        /**
         * Specifies the number of results to return per page. If there are fewer elements than the specified number, returns all elements.
         */
        pageSize?: number;
        /**
         * Specifies a page token to use. Set `pageToken` to a `nextPageToken` returned by a previous list request to get the next page of results.
         */
        pageToken?: string;
        /**
         * The [project ID](https://support.google.com/cloud/answer/6158840?hl=en&ref_topic=6158848) for this request, in the format `projects/[PROJECT_ID]`.
         */
        parent?: string;
    }
    export interface Params$Resource$Projects$Configs$Setiampolicy extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$SetIamPolicyRequest;
    }
    export interface Params$Resource$Projects$Configs$Testiampermissions extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$TestIamPermissionsRequest;
    }
    export interface Params$Resource$Projects$Configs$Update extends StandardParameters {
        /**
         * The name of the RuntimeConfig resource to update, in the format:  `projects/[PROJECT_ID]/configs/[CONFIG_NAME]`
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$RuntimeConfig;
    }
    export class Resource$Projects$Configs$Operations {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * runtimeconfig.projects.configs.operations.get
         * @desc Gets the latest state of a long-running operation.  Clients can use this method to poll the operation result at intervals as recommended by the API service.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/runtimeconfig.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const runtimeconfig = google.runtimeconfig('v1beta1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudruntimeconfig',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await runtimeconfig.projects.configs.operations.get({
         *     // The name of the operation resource.
         *     name: 'projects/my-project/configs/my-config/operations/.*',
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
         * @alias runtimeconfig.projects.configs.operations.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The name of the operation resource.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Configs$Operations$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Configs$Operations$Get, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        get(params: Params$Resource$Projects$Configs$Operations$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Configs$Operations$Get, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        get(params: Params$Resource$Projects$Configs$Operations$Get, callback: BodyResponseCallback<Schema$Operation>): void;
        get(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * runtimeconfig.projects.configs.operations.testIamPermissions
         * @desc Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error.  Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/runtimeconfig.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const runtimeconfig = google.runtimeconfig('v1beta1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudruntimeconfig',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await runtimeconfig.projects.configs.operations.testIamPermissions(
         *     {
         *       // REQUIRED: The resource for which the policy detail is being requested.
         *       // See the operation documentation for the appropriate value for this field.
         *       resource: 'projects/my-project/configs/my-config/operations/.*',
         *
         *       // Request body metadata
         *       requestBody: {
         *         // request body parameters
         *         // {
         *         //   "permissions": []
         *         // }
         *       },
         *     }
         *   );
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "permissions": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias runtimeconfig.projects.configs.operations.testIamPermissions
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         * @param {().TestIamPermissionsRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        testIamPermissions(params: Params$Resource$Projects$Configs$Operations$Testiampermissions, options: StreamMethodOptions): GaxiosPromise<Readable>;
        testIamPermissions(params?: Params$Resource$Projects$Configs$Operations$Testiampermissions, options?: MethodOptions): GaxiosPromise<Schema$TestIamPermissionsResponse>;
        testIamPermissions(params: Params$Resource$Projects$Configs$Operations$Testiampermissions, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        testIamPermissions(params: Params$Resource$Projects$Configs$Operations$Testiampermissions, options: MethodOptions | BodyResponseCallback<Schema$TestIamPermissionsResponse>, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(params: Params$Resource$Projects$Configs$Operations$Testiampermissions, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
    }
    export interface Params$Resource$Projects$Configs$Operations$Get extends StandardParameters {
        /**
         * The name of the operation resource.
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Configs$Operations$Testiampermissions extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$TestIamPermissionsRequest;
    }
    export class Resource$Projects$Configs$Variables {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * runtimeconfig.projects.configs.variables.create
         * @desc Creates a variable within the given configuration. You cannot create a variable with a name that is a prefix of an existing variable name, or a name that has an existing variable name as a prefix.  To learn more about creating a variable, read the [Setting and Getting Data](/deployment-manager/runtime-configurator/set-and-get-variables) documentation.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/runtimeconfig.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const runtimeconfig = google.runtimeconfig('v1beta1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudruntimeconfig',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await runtimeconfig.projects.configs.variables.create({
         *     // The path to the RutimeConfig resource that this variable should belong to.
         *     // The configuration must exist beforehand; the path must be in the format:
         *     //
         *     // `projects/[PROJECT_ID]/configs/[CONFIG_NAME]`
         *     parent: 'projects/my-project/configs/my-config',
         *     // An optional but recommended unique `request_id`. If the server
         *     // receives two `create()` requests  with the same
         *     // `request_id`, then the second request will be ignored and the
         *     // first resource created and stored in the backend is returned.
         *     // Empty `request_id` fields are ignored.
         *     //
         *     // It is responsibility of the client to ensure uniqueness of the
         *     // `request_id` strings.
         *     //
         *     // `request_id` strings are limited to 64 characters.
         *     requestId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "name": "my_name",
         *       //   "state": "my_state",
         *       //   "text": "my_text",
         *       //   "updateTime": "my_updateTime",
         *       //   "value": "my_value"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "name": "my_name",
         *   //   "state": "my_state",
         *   //   "text": "my_text",
         *   //   "updateTime": "my_updateTime",
         *   //   "value": "my_value"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias runtimeconfig.projects.configs.variables.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent The path to the RutimeConfig resource that this variable should belong to. The configuration must exist beforehand; the path must be in the format:  `projects/[PROJECT_ID]/configs/[CONFIG_NAME]`
         * @param {string=} params.requestId An optional but recommended unique `request_id`. If the server receives two `create()` requests  with the same `request_id`, then the second request will be ignored and the first resource created and stored in the backend is returned. Empty `request_id` fields are ignored.  It is responsibility of the client to ensure uniqueness of the `request_id` strings.  `request_id` strings are limited to 64 characters.
         * @param {().Variable} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Projects$Configs$Variables$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Projects$Configs$Variables$Create, options?: MethodOptions): GaxiosPromise<Schema$Variable>;
        create(params: Params$Resource$Projects$Configs$Variables$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Projects$Configs$Variables$Create, options: MethodOptions | BodyResponseCallback<Schema$Variable>, callback: BodyResponseCallback<Schema$Variable>): void;
        create(params: Params$Resource$Projects$Configs$Variables$Create, callback: BodyResponseCallback<Schema$Variable>): void;
        create(callback: BodyResponseCallback<Schema$Variable>): void;
        /**
         * runtimeconfig.projects.configs.variables.delete
         * @desc Deletes a variable or multiple variables.  If you specify a variable name, then that variable is deleted. If you specify a prefix and `recursive` is true, then all variables with that prefix are deleted. You must set a `recursive` to true if you delete variables by prefix.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/runtimeconfig.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const runtimeconfig = google.runtimeconfig('v1beta1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudruntimeconfig',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await runtimeconfig.projects.configs.variables.delete({
         *     // The name of the variable to delete, in the format:
         *     //
         *     // `projects/[PROJECT_ID]/configs/[CONFIG_NAME]/variables/[VARIABLE_NAME]`
         *     name: 'projects/my-project/configs/my-config/variables/.*',
         *     // Set to `true` to recursively delete multiple variables with the same
         *     // prefix.
         *     recursive: 'placeholder-value',
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
         * @alias runtimeconfig.projects.configs.variables.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The name of the variable to delete, in the format:  `projects/[PROJECT_ID]/configs/[CONFIG_NAME]/variables/[VARIABLE_NAME]`
         * @param {boolean=} params.recursive Set to `true` to recursively delete multiple variables with the same prefix.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Projects$Configs$Variables$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Projects$Configs$Variables$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Projects$Configs$Variables$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Projects$Configs$Variables$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Projects$Configs$Variables$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * runtimeconfig.projects.configs.variables.get
         * @desc Gets information about a single variable.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/runtimeconfig.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const runtimeconfig = google.runtimeconfig('v1beta1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudruntimeconfig',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await runtimeconfig.projects.configs.variables.get({
         *     // The name of the variable to return, in the format:
         *     //
         *     // `projects/[PROJECT_ID]/configs/[CONFIG_NAME]/variables/[VARIBLE_NAME]`
         *     name: 'projects/my-project/configs/my-config/variables/.*',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "name": "my_name",
         *   //   "state": "my_state",
         *   //   "text": "my_text",
         *   //   "updateTime": "my_updateTime",
         *   //   "value": "my_value"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias runtimeconfig.projects.configs.variables.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The name of the variable to return, in the format:  `projects/[PROJECT_ID]/configs/[CONFIG_NAME]/variables/[VARIBLE_NAME]`
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Configs$Variables$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Configs$Variables$Get, options?: MethodOptions): GaxiosPromise<Schema$Variable>;
        get(params: Params$Resource$Projects$Configs$Variables$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Configs$Variables$Get, options: MethodOptions | BodyResponseCallback<Schema$Variable>, callback: BodyResponseCallback<Schema$Variable>): void;
        get(params: Params$Resource$Projects$Configs$Variables$Get, callback: BodyResponseCallback<Schema$Variable>): void;
        get(callback: BodyResponseCallback<Schema$Variable>): void;
        /**
         * runtimeconfig.projects.configs.variables.list
         * @desc Lists variables within given a configuration, matching any provided filters. This only lists variable names, not the values, unless `return_values` is true, in which case only variables that user has IAM permission to GetVariable will be returned.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/runtimeconfig.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const runtimeconfig = google.runtimeconfig('v1beta1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudruntimeconfig',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await runtimeconfig.projects.configs.variables.list({
         *     // Filters variables by matching the specified filter. For example:
         *     //
         *     // `projects/example-project/config/[CONFIG_NAME]/variables/example-variable`.
         *     filter: 'placeholder-value',
         *     // Specifies the number of results to return per page. If there are fewer
         *     // elements than the specified number, returns all elements.
         *     pageSize: 'placeholder-value',
         *     // Specifies a page token to use. Set `pageToken` to a `nextPageToken`
         *     // returned by a previous list request to get the next page of results.
         *     pageToken: 'placeholder-value',
         *     // The path to the RuntimeConfig resource for which you want to list
         *     // variables. The configuration must exist beforehand; the path must be in the
         *     // format:
         *     //
         *     // `projects/[PROJECT_ID]/configs/[CONFIG_NAME]`
         *     parent: 'projects/my-project/configs/my-config',
         *     // The flag indicates whether the user wants to return values of variables.
         *     // If true, then only those variables that user has IAM GetVariable permission
         *     // will be returned along with their values.
         *     returnValues: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "variables": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias runtimeconfig.projects.configs.variables.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.filter Filters variables by matching the specified filter. For example:  `projects/example-project/config/[CONFIG_NAME]/variables/example-variable`.
         * @param {integer=} params.pageSize Specifies the number of results to return per page. If there are fewer elements than the specified number, returns all elements.
         * @param {string=} params.pageToken Specifies a page token to use. Set `pageToken` to a `nextPageToken` returned by a previous list request to get the next page of results.
         * @param {string} params.parent The path to the RuntimeConfig resource for which you want to list variables. The configuration must exist beforehand; the path must be in the format:  `projects/[PROJECT_ID]/configs/[CONFIG_NAME]`
         * @param {boolean=} params.returnValues The flag indicates whether the user wants to return values of variables. If true, then only those variables that user has IAM GetVariable permission will be returned along with their values.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Configs$Variables$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Configs$Variables$List, options?: MethodOptions): GaxiosPromise<Schema$ListVariablesResponse>;
        list(params: Params$Resource$Projects$Configs$Variables$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Configs$Variables$List, options: MethodOptions | BodyResponseCallback<Schema$ListVariablesResponse>, callback: BodyResponseCallback<Schema$ListVariablesResponse>): void;
        list(params: Params$Resource$Projects$Configs$Variables$List, callback: BodyResponseCallback<Schema$ListVariablesResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListVariablesResponse>): void;
        /**
         * runtimeconfig.projects.configs.variables.testIamPermissions
         * @desc Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error.  Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/runtimeconfig.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const runtimeconfig = google.runtimeconfig('v1beta1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudruntimeconfig',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await runtimeconfig.projects.configs.variables.testIamPermissions(
         *     {
         *       // REQUIRED: The resource for which the policy detail is being requested.
         *       // See the operation documentation for the appropriate value for this field.
         *       resource: 'projects/my-project/configs/my-config/variables/.*',
         *
         *       // Request body metadata
         *       requestBody: {
         *         // request body parameters
         *         // {
         *         //   "permissions": []
         *         // }
         *       },
         *     }
         *   );
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "permissions": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias runtimeconfig.projects.configs.variables.testIamPermissions
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         * @param {().TestIamPermissionsRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        testIamPermissions(params: Params$Resource$Projects$Configs$Variables$Testiampermissions, options: StreamMethodOptions): GaxiosPromise<Readable>;
        testIamPermissions(params?: Params$Resource$Projects$Configs$Variables$Testiampermissions, options?: MethodOptions): GaxiosPromise<Schema$TestIamPermissionsResponse>;
        testIamPermissions(params: Params$Resource$Projects$Configs$Variables$Testiampermissions, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        testIamPermissions(params: Params$Resource$Projects$Configs$Variables$Testiampermissions, options: MethodOptions | BodyResponseCallback<Schema$TestIamPermissionsResponse>, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(params: Params$Resource$Projects$Configs$Variables$Testiampermissions, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        /**
         * runtimeconfig.projects.configs.variables.update
         * @desc Updates an existing variable with a new value.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/runtimeconfig.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const runtimeconfig = google.runtimeconfig('v1beta1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudruntimeconfig',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await runtimeconfig.projects.configs.variables.update({
         *     // The name of the variable to update, in the format:
         *     //
         *     // `projects/[PROJECT_ID]/configs/[CONFIG_NAME]/variables/[VARIABLE_NAME]`
         *     name: 'projects/my-project/configs/my-config/variables/.*',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "name": "my_name",
         *       //   "state": "my_state",
         *       //   "text": "my_text",
         *       //   "updateTime": "my_updateTime",
         *       //   "value": "my_value"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "name": "my_name",
         *   //   "state": "my_state",
         *   //   "text": "my_text",
         *   //   "updateTime": "my_updateTime",
         *   //   "value": "my_value"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias runtimeconfig.projects.configs.variables.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The name of the variable to update, in the format:  `projects/[PROJECT_ID]/configs/[CONFIG_NAME]/variables/[VARIABLE_NAME]`
         * @param {().Variable} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Projects$Configs$Variables$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Projects$Configs$Variables$Update, options?: MethodOptions): GaxiosPromise<Schema$Variable>;
        update(params: Params$Resource$Projects$Configs$Variables$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Projects$Configs$Variables$Update, options: MethodOptions | BodyResponseCallback<Schema$Variable>, callback: BodyResponseCallback<Schema$Variable>): void;
        update(params: Params$Resource$Projects$Configs$Variables$Update, callback: BodyResponseCallback<Schema$Variable>): void;
        update(callback: BodyResponseCallback<Schema$Variable>): void;
        /**
         * runtimeconfig.projects.configs.variables.watch
         * @desc Watches a specific variable and waits for a change in the variable's value. When there is a change, this method returns the new value or times out.  If a variable is deleted while being watched, the `variableState` state is set to `DELETED` and the method returns the last known variable `value`.  If you set the deadline for watching to a larger value than internal timeout (60 seconds), the current variable value is returned and the `variableState` will be `VARIABLE_STATE_UNSPECIFIED`.  To learn more about creating a watcher, read the [Watching a Variable for Changes](/deployment-manager/runtime-configurator/watching-a-variable) documentation.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/runtimeconfig.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const runtimeconfig = google.runtimeconfig('v1beta1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudruntimeconfig',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await runtimeconfig.projects.configs.variables.watch({
         *     // The name of the variable to watch, in the format:
         *     //
         *     // `projects/[PROJECT_ID]/configs/[CONFIG_NAME]`
         *     name: 'projects/my-project/configs/my-config/variables/.*',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "newerThan": "my_newerThan"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "name": "my_name",
         *   //   "state": "my_state",
         *   //   "text": "my_text",
         *   //   "updateTime": "my_updateTime",
         *   //   "value": "my_value"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias runtimeconfig.projects.configs.variables.watch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The name of the variable to watch, in the format:  `projects/[PROJECT_ID]/configs/[CONFIG_NAME]`
         * @param {().WatchVariableRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        watch(params: Params$Resource$Projects$Configs$Variables$Watch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        watch(params?: Params$Resource$Projects$Configs$Variables$Watch, options?: MethodOptions): GaxiosPromise<Schema$Variable>;
        watch(params: Params$Resource$Projects$Configs$Variables$Watch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        watch(params: Params$Resource$Projects$Configs$Variables$Watch, options: MethodOptions | BodyResponseCallback<Schema$Variable>, callback: BodyResponseCallback<Schema$Variable>): void;
        watch(params: Params$Resource$Projects$Configs$Variables$Watch, callback: BodyResponseCallback<Schema$Variable>): void;
        watch(callback: BodyResponseCallback<Schema$Variable>): void;
    }
    export interface Params$Resource$Projects$Configs$Variables$Create extends StandardParameters {
        /**
         * The path to the RutimeConfig resource that this variable should belong to. The configuration must exist beforehand; the path must be in the format:  `projects/[PROJECT_ID]/configs/[CONFIG_NAME]`
         */
        parent?: string;
        /**
         * An optional but recommended unique `request_id`. If the server receives two `create()` requests  with the same `request_id`, then the second request will be ignored and the first resource created and stored in the backend is returned. Empty `request_id` fields are ignored.  It is responsibility of the client to ensure uniqueness of the `request_id` strings.  `request_id` strings are limited to 64 characters.
         */
        requestId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Variable;
    }
    export interface Params$Resource$Projects$Configs$Variables$Delete extends StandardParameters {
        /**
         * The name of the variable to delete, in the format:  `projects/[PROJECT_ID]/configs/[CONFIG_NAME]/variables/[VARIABLE_NAME]`
         */
        name?: string;
        /**
         * Set to `true` to recursively delete multiple variables with the same prefix.
         */
        recursive?: boolean;
    }
    export interface Params$Resource$Projects$Configs$Variables$Get extends StandardParameters {
        /**
         * The name of the variable to return, in the format:  `projects/[PROJECT_ID]/configs/[CONFIG_NAME]/variables/[VARIBLE_NAME]`
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Configs$Variables$List extends StandardParameters {
        /**
         * Filters variables by matching the specified filter. For example:  `projects/example-project/config/[CONFIG_NAME]/variables/example-variable`.
         */
        filter?: string;
        /**
         * Specifies the number of results to return per page. If there are fewer elements than the specified number, returns all elements.
         */
        pageSize?: number;
        /**
         * Specifies a page token to use. Set `pageToken` to a `nextPageToken` returned by a previous list request to get the next page of results.
         */
        pageToken?: string;
        /**
         * The path to the RuntimeConfig resource for which you want to list variables. The configuration must exist beforehand; the path must be in the format:  `projects/[PROJECT_ID]/configs/[CONFIG_NAME]`
         */
        parent?: string;
        /**
         * The flag indicates whether the user wants to return values of variables. If true, then only those variables that user has IAM GetVariable permission will be returned along with their values.
         */
        returnValues?: boolean;
    }
    export interface Params$Resource$Projects$Configs$Variables$Testiampermissions extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$TestIamPermissionsRequest;
    }
    export interface Params$Resource$Projects$Configs$Variables$Update extends StandardParameters {
        /**
         * The name of the variable to update, in the format:  `projects/[PROJECT_ID]/configs/[CONFIG_NAME]/variables/[VARIABLE_NAME]`
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Variable;
    }
    export interface Params$Resource$Projects$Configs$Variables$Watch extends StandardParameters {
        /**
         * The name of the variable to watch, in the format:  `projects/[PROJECT_ID]/configs/[CONFIG_NAME]`
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$WatchVariableRequest;
    }
    export class Resource$Projects$Configs$Waiters {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * runtimeconfig.projects.configs.waiters.create
         * @desc Creates a Waiter resource. This operation returns a long-running Operation resource which can be polled for completion. However, a waiter with the given name will exist (and can be retrieved) prior to the operation completing. If the operation fails, the failed Waiter resource will still exist and must be deleted prior to subsequent creation attempts.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/runtimeconfig.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const runtimeconfig = google.runtimeconfig('v1beta1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudruntimeconfig',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await runtimeconfig.projects.configs.waiters.create({
         *     // The path to the configuration that will own the waiter.
         *     // The configuration must exist beforehand; the path must be in the format:
         *     //
         *     // `projects/[PROJECT_ID]/configs/[CONFIG_NAME]`.
         *     parent: 'projects/my-project/configs/my-config',
         *     // An optional but recommended unique `request_id`. If the server
         *     // receives two `create()` requests  with the same
         *     // `request_id`, then the second request will be ignored and the
         *     // first resource created and stored in the backend is returned.
         *     // Empty `request_id` fields are ignored.
         *     //
         *     // It is responsibility of the client to ensure uniqueness of the
         *     // `request_id` strings.
         *     //
         *     // `request_id` strings are limited to 64 characters.
         *     requestId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "createTime": "my_createTime",
         *       //   "done": false,
         *       //   "error": {},
         *       //   "failure": {},
         *       //   "name": "my_name",
         *       //   "success": {},
         *       //   "timeout": "my_timeout"
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
         * @alias runtimeconfig.projects.configs.waiters.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent The path to the configuration that will own the waiter. The configuration must exist beforehand; the path must be in the format:  `projects/[PROJECT_ID]/configs/[CONFIG_NAME]`.
         * @param {string=} params.requestId An optional but recommended unique `request_id`. If the server receives two `create()` requests  with the same `request_id`, then the second request will be ignored and the first resource created and stored in the backend is returned. Empty `request_id` fields are ignored.  It is responsibility of the client to ensure uniqueness of the `request_id` strings.  `request_id` strings are limited to 64 characters.
         * @param {().Waiter} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Projects$Configs$Waiters$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Projects$Configs$Waiters$Create, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        create(params: Params$Resource$Projects$Configs$Waiters$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Projects$Configs$Waiters$Create, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        create(params: Params$Resource$Projects$Configs$Waiters$Create, callback: BodyResponseCallback<Schema$Operation>): void;
        create(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * runtimeconfig.projects.configs.waiters.delete
         * @desc Deletes the waiter with the specified name.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/runtimeconfig.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const runtimeconfig = google.runtimeconfig('v1beta1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudruntimeconfig',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await runtimeconfig.projects.configs.waiters.delete({
         *     // The Waiter resource to delete, in the format:
         *     //
         *     //  `projects/[PROJECT_ID]/configs/[CONFIG_NAME]/waiters/[WAITER_NAME]`
         *     name: 'projects/my-project/configs/my-config/waiters/my-waiter',
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
         * @alias runtimeconfig.projects.configs.waiters.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The Waiter resource to delete, in the format:   `projects/[PROJECT_ID]/configs/[CONFIG_NAME]/waiters/[WAITER_NAME]`
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Projects$Configs$Waiters$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Projects$Configs$Waiters$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Projects$Configs$Waiters$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Projects$Configs$Waiters$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Projects$Configs$Waiters$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * runtimeconfig.projects.configs.waiters.get
         * @desc Gets information about a single waiter.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/runtimeconfig.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const runtimeconfig = google.runtimeconfig('v1beta1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudruntimeconfig',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await runtimeconfig.projects.configs.waiters.get({
         *     // The fully-qualified name of the Waiter resource object to retrieve, in the
         *     // format:
         *     //
         *     // `projects/[PROJECT_ID]/configs/[CONFIG_NAME]/waiters/[WAITER_NAME]`
         *     name: 'projects/my-project/configs/my-config/waiters/my-waiter',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "done": false,
         *   //   "error": {},
         *   //   "failure": {},
         *   //   "name": "my_name",
         *   //   "success": {},
         *   //   "timeout": "my_timeout"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias runtimeconfig.projects.configs.waiters.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The fully-qualified name of the Waiter resource object to retrieve, in the format:  `projects/[PROJECT_ID]/configs/[CONFIG_NAME]/waiters/[WAITER_NAME]`
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Configs$Waiters$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Configs$Waiters$Get, options?: MethodOptions): GaxiosPromise<Schema$Waiter>;
        get(params: Params$Resource$Projects$Configs$Waiters$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Configs$Waiters$Get, options: MethodOptions | BodyResponseCallback<Schema$Waiter>, callback: BodyResponseCallback<Schema$Waiter>): void;
        get(params: Params$Resource$Projects$Configs$Waiters$Get, callback: BodyResponseCallback<Schema$Waiter>): void;
        get(callback: BodyResponseCallback<Schema$Waiter>): void;
        /**
         * runtimeconfig.projects.configs.waiters.list
         * @desc List waiters within the given configuration.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/runtimeconfig.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const runtimeconfig = google.runtimeconfig('v1beta1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudruntimeconfig',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await runtimeconfig.projects.configs.waiters.list({
         *     // Specifies the number of results to return per page. If there are fewer
         *     // elements than the specified number, returns all elements.
         *     pageSize: 'placeholder-value',
         *     // Specifies a page token to use. Set `pageToken` to a `nextPageToken`
         *     // returned by a previous list request to get the next page of results.
         *     pageToken: 'placeholder-value',
         *     // The path to the configuration for which you want to get a list of waiters.
         *     // The configuration must exist beforehand; the path must be in the format:
         *     //
         *     // `projects/[PROJECT_ID]/configs/[CONFIG_NAME]`
         *     parent: 'projects/my-project/configs/my-config',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "waiters": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias runtimeconfig.projects.configs.waiters.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize Specifies the number of results to return per page. If there are fewer elements than the specified number, returns all elements.
         * @param {string=} params.pageToken Specifies a page token to use. Set `pageToken` to a `nextPageToken` returned by a previous list request to get the next page of results.
         * @param {string} params.parent The path to the configuration for which you want to get a list of waiters. The configuration must exist beforehand; the path must be in the format:  `projects/[PROJECT_ID]/configs/[CONFIG_NAME]`
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Configs$Waiters$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Configs$Waiters$List, options?: MethodOptions): GaxiosPromise<Schema$ListWaitersResponse>;
        list(params: Params$Resource$Projects$Configs$Waiters$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Configs$Waiters$List, options: MethodOptions | BodyResponseCallback<Schema$ListWaitersResponse>, callback: BodyResponseCallback<Schema$ListWaitersResponse>): void;
        list(params: Params$Resource$Projects$Configs$Waiters$List, callback: BodyResponseCallback<Schema$ListWaitersResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListWaitersResponse>): void;
        /**
         * runtimeconfig.projects.configs.waiters.testIamPermissions
         * @desc Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error.  Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/runtimeconfig.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const runtimeconfig = google.runtimeconfig('v1beta1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudruntimeconfig',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await runtimeconfig.projects.configs.waiters.testIamPermissions({
         *     // REQUIRED: The resource for which the policy detail is being requested.
         *     // See the operation documentation for the appropriate value for this field.
         *     resource: 'projects/my-project/configs/my-config/waiters/my-waiter',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "permissions": []
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "permissions": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias runtimeconfig.projects.configs.waiters.testIamPermissions
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         * @param {().TestIamPermissionsRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        testIamPermissions(params: Params$Resource$Projects$Configs$Waiters$Testiampermissions, options: StreamMethodOptions): GaxiosPromise<Readable>;
        testIamPermissions(params?: Params$Resource$Projects$Configs$Waiters$Testiampermissions, options?: MethodOptions): GaxiosPromise<Schema$TestIamPermissionsResponse>;
        testIamPermissions(params: Params$Resource$Projects$Configs$Waiters$Testiampermissions, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        testIamPermissions(params: Params$Resource$Projects$Configs$Waiters$Testiampermissions, options: MethodOptions | BodyResponseCallback<Schema$TestIamPermissionsResponse>, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(params: Params$Resource$Projects$Configs$Waiters$Testiampermissions, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
    }
    export interface Params$Resource$Projects$Configs$Waiters$Create extends StandardParameters {
        /**
         * The path to the configuration that will own the waiter. The configuration must exist beforehand; the path must be in the format:  `projects/[PROJECT_ID]/configs/[CONFIG_NAME]`.
         */
        parent?: string;
        /**
         * An optional but recommended unique `request_id`. If the server receives two `create()` requests  with the same `request_id`, then the second request will be ignored and the first resource created and stored in the backend is returned. Empty `request_id` fields are ignored.  It is responsibility of the client to ensure uniqueness of the `request_id` strings.  `request_id` strings are limited to 64 characters.
         */
        requestId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Waiter;
    }
    export interface Params$Resource$Projects$Configs$Waiters$Delete extends StandardParameters {
        /**
         * The Waiter resource to delete, in the format:   `projects/[PROJECT_ID]/configs/[CONFIG_NAME]/waiters/[WAITER_NAME]`
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Configs$Waiters$Get extends StandardParameters {
        /**
         * The fully-qualified name of the Waiter resource object to retrieve, in the format:  `projects/[PROJECT_ID]/configs/[CONFIG_NAME]/waiters/[WAITER_NAME]`
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Configs$Waiters$List extends StandardParameters {
        /**
         * Specifies the number of results to return per page. If there are fewer elements than the specified number, returns all elements.
         */
        pageSize?: number;
        /**
         * Specifies a page token to use. Set `pageToken` to a `nextPageToken` returned by a previous list request to get the next page of results.
         */
        pageToken?: string;
        /**
         * The path to the configuration for which you want to get a list of waiters. The configuration must exist beforehand; the path must be in the format:  `projects/[PROJECT_ID]/configs/[CONFIG_NAME]`
         */
        parent?: string;
    }
    export interface Params$Resource$Projects$Configs$Waiters$Testiampermissions extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$TestIamPermissionsRequest;
    }
    export {};
}
