/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace cloudfunctions_v1 {
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
     * Cloud Functions API
     *
     * Manages lightweight user-provided functions executed in response to events.
     *
     * @example
     * const {google} = require('googleapis');
     * const cloudfunctions = google.cloudfunctions('v1');
     *
     * @namespace cloudfunctions
     * @type {Function}
     * @version v1
     * @variation v1
     * @param {object=} options Options for Cloudfunctions
     */
    export class Cloudfunctions {
        context: APIRequestContext;
        operations: Resource$Operations;
        projects: Resource$Projects;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    /**
     * Specifies the audit configuration for a service. The configuration determines which permission types are logged, and what identities, if any, are exempted from logging. An AuditConfig must have one or more AuditLogConfigs.  If there are AuditConfigs for both `allServices` and a specific service, the union of the two AuditConfigs is used for that service: the log_types specified in each AuditConfig are enabled, and the exempted_members in each AuditLogConfig are exempted.  Example Policy with multiple AuditConfigs:      {       &quot;audit_configs&quot;: [         {           &quot;service&quot;: &quot;allServices&quot;           &quot;audit_log_configs&quot;: [             {               &quot;log_type&quot;: &quot;DATA_READ&quot;,               &quot;exempted_members&quot;: [                 &quot;user:jose@example.com&quot;               ]             },             {               &quot;log_type&quot;: &quot;DATA_WRITE&quot;,             },             {               &quot;log_type&quot;: &quot;ADMIN_READ&quot;,             }           ]         },         {           &quot;service&quot;: &quot;sampleservice.googleapis.com&quot;           &quot;audit_log_configs&quot;: [             {               &quot;log_type&quot;: &quot;DATA_READ&quot;,             },             {               &quot;log_type&quot;: &quot;DATA_WRITE&quot;,               &quot;exempted_members&quot;: [                 &quot;user:aliya@example.com&quot;               ]             }           ]         }       ]     }  For sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ logging. It also exempts jose@example.com from DATA_READ logging, and aliya@example.com from DATA_WRITE logging.
     */
    export interface Schema$AuditConfig {
        /**
         * The configuration for logging of each type of permission.
         */
        auditLogConfigs?: Schema$AuditLogConfig[];
        /**
         * Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services.
         */
        service?: string | null;
    }
    /**
     * Provides the configuration for logging a type of permissions. Example:      {       &quot;audit_log_configs&quot;: [         {           &quot;log_type&quot;: &quot;DATA_READ&quot;,           &quot;exempted_members&quot;: [             &quot;user:jose@example.com&quot;           ]         },         {           &quot;log_type&quot;: &quot;DATA_WRITE&quot;,         }       ]     }  This enables &#39;DATA_READ&#39; and &#39;DATA_WRITE&#39; logging, while exempting jose@example.com from DATA_READ logging.
     */
    export interface Schema$AuditLogConfig {
        /**
         * Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members.
         */
        exemptedMembers?: string[] | null;
        /**
         * The log type that this config enables.
         */
        logType?: string | null;
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
     * Request for the `CallFunction` method.
     */
    export interface Schema$CallFunctionRequest {
        /**
         * Required. Input to be passed to the function.
         */
        data?: string | null;
    }
    /**
     * Response of `CallFunction` method.
     */
    export interface Schema$CallFunctionResponse {
        /**
         * Either system or user-function generated error. Set if execution was not successful.
         */
        error?: string | null;
        /**
         * Execution id of function invocation.
         */
        executionId?: string | null;
        /**
         * Result populated for successful execution of synchronous function. Will not be populated if function does not return a result through context.
         */
        result?: string | null;
    }
    /**
     * Describes a Cloud Function that contains user computation executed in response to an event. It encapsulate function and triggers configurations.
     */
    export interface Schema$CloudFunction {
        /**
         * The amount of memory in MB available for a function. Defaults to 256MB.
         */
        availableMemoryMb?: number | null;
        /**
         * User-provided description of a function.
         */
        description?: string | null;
        /**
         * The name of the function (as defined in source code) that will be executed. Defaults to the resource name suffix, if not specified. For backward compatibility, if function with given name is not found, then the system will try to use function named &quot;function&quot;. For Node.js this is name of a function exported by the module specified in `source_location`.
         */
        entryPoint?: string | null;
        /**
         * Environment variables that shall be available during function execution.
         */
        environmentVariables?: {
            [key: string]: string;
        } | null;
        /**
         * A source that fires events in response to a condition in another service.
         */
        eventTrigger?: Schema$EventTrigger;
        /**
         * An HTTPS endpoint type of source that can be triggered via URL.
         */
        httpsTrigger?: Schema$HttpsTrigger;
        /**
         * The ingress settings for the function, controlling what traffic can reach it.
         */
        ingressSettings?: string | null;
        /**
         * Labels associated with this Cloud Function.
         */
        labels?: {
            [key: string]: string;
        } | null;
        /**
         * The limit on the maximum number of function instances that may coexist at a given time.
         */
        maxInstances?: number | null;
        /**
         * A user-defined name of the function. Function names must be unique globally and match pattern `projects/x/locations/x/functions/x
         */
        name?: string | null;
        /**
         * The VPC Network that this cloud function can connect to. It can be either the fully-qualified URI, or the short name of the network resource. If the short network name is used, the network must belong to the same project. Otherwise, it must belong to a project within the same organization. The format of this field is either `projects/{project}/global/networks/{network}` or `{network}`, where {project} is a project id where the network is defined, and {network} is the short name of the network.  This field is mutually exclusive with `vpc_connector` and will be replaced by it.  See [the VPC documentation](https://cloud.google.com/compute/docs/vpc) for more information on connecting Cloud projects.
         */
        network?: string | null;
        /**
         * The runtime in which to run the function. Required when deploying a new function, optional when updating an existing function. For a complete list of possible choices, see the [`gcloud` command reference](/sdk/gcloud/reference/functions/deploy#--runtime).
         */
        runtime?: string | null;
        /**
         * The email of the function&#39;s service account. If empty, defaults to `{project_id}@appspot.gserviceaccount.com`.
         */
        serviceAccountEmail?: string | null;
        /**
         * The Google Cloud Storage URL, starting with gs://, pointing to the zip archive which contains the function.
         */
        sourceArchiveUrl?: string | null;
        /**
         * **Beta Feature**  The source repository where a function is hosted.
         */
        sourceRepository?: Schema$SourceRepository;
        /**
         * The Google Cloud Storage signed URL used for source uploading, generated by google.cloud.functions.v1.GenerateUploadUrl
         */
        sourceUploadUrl?: string | null;
        /**
         * Output only. Status of the function deployment.
         */
        status?: string | null;
        /**
         * The function execution timeout. Execution is considered failed and can be terminated if the function is not completed at the end of the timeout period. Defaults to 60 seconds.
         */
        timeout?: string | null;
        /**
         * Output only. The last update timestamp of a Cloud Function.
         */
        updateTime?: string | null;
        /**
         * Output only. The version identifier of the Cloud Function. Each deployment attempt results in a new version of a function being created.
         */
        versionId?: string | null;
        /**
         * The VPC Network Connector that this cloud function can connect to. It can be either the fully-qualified URI, or the short name of the network connector resource. The format of this field is `projects/x/locations/x/connectors/x  This field is mutually exclusive with `network` field and will eventually replace it.  See [the VPC documentation](https://cloud.google.com/compute/docs/vpc) for more information on connecting Cloud projects.
         */
        vpcConnector?: string | null;
        /**
         * The egress settings for the connector, controlling what traffic is diverted through it.
         */
        vpcConnectorEgressSettings?: string | null;
    }
    /**
     * Describes EventTrigger, used to request events be sent from another service.
     */
    export interface Schema$EventTrigger {
        /**
         * Required. The type of event to observe. For example: `providers/cloud.storage/eventTypes/object.change` and `providers/cloud.pubsub/eventTypes/topic.publish`.  Event types match pattern `providers/x/eventTypes/*.*`. The pattern contains:  1. namespace: For example, `cloud.storage` and    `google.firebase.analytics`. 2. resource type: The type of resource on which event occurs. For    example, the Google Cloud Storage API includes the type `object`. 3. action: The action that generates the event. For example, action for    a Google Cloud Storage Object is &#39;change&#39;. These parts are lower case.
         */
        eventType?: string | null;
        /**
         * Specifies policy for failed executions.
         */
        failurePolicy?: Schema$FailurePolicy;
        /**
         * Required. The resource(s) from which to observe events, for example, `projects/_/buckets/myBucket`.  Not all syntactically correct values are accepted by all services. For example:  1. The authorization model must support it. Google Cloud Functions    only allows EventTriggers to be deployed that observe resources in the    same project as the `CloudFunction`. 2. The resource type must match the pattern expected for an    `event_type`. For example, an `EventTrigger` that has an    `event_type` of &quot;google.pubsub.topic.publish&quot; should have a resource    that matches Google Cloud Pub/Sub topics.  Additionally, some services may support short names when creating an `EventTrigger`. These will always be returned in the normalized &quot;long&quot; format.  See each *service&#39;s* documentation for supported formats.
         */
        resource?: string | null;
        /**
         * The hostname of the service that should be observed.  If no string is provided, the default service implementing the API will be used. For example, `storage.googleapis.com` is the default for all event types in the `google.storage` namespace.
         */
        service?: string | null;
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
     * Describes the policy in case of function&#39;s execution failure. If empty, then defaults to ignoring failures (i.e. not retrying them).
     */
    export interface Schema$FailurePolicy {
        /**
         * If specified, then the function will be retried in case of a failure.
         */
        retry?: Schema$Retry;
    }
    /**
     * Request of `GenerateDownloadUrl` method.
     */
    export interface Schema$GenerateDownloadUrlRequest {
        /**
         * The optional version of function. If not set, default, current version is used.
         */
        versionId?: string | null;
    }
    /**
     * Response of `GenerateDownloadUrl` method.
     */
    export interface Schema$GenerateDownloadUrlResponse {
        /**
         * The generated Google Cloud Storage signed URL that should be used for function source code download.
         */
        downloadUrl?: string | null;
    }
    /**
     * Request of `GenerateSourceUploadUrl` method.
     */
    export interface Schema$GenerateUploadUrlRequest {
    }
    /**
     * Response of `GenerateSourceUploadUrl` method.
     */
    export interface Schema$GenerateUploadUrlResponse {
        /**
         * The generated Google Cloud Storage signed URL that should be used for a function source code upload. The uploaded file should be a zip archive which contains a function.
         */
        uploadUrl?: string | null;
    }
    /**
     * Describes HttpsTrigger, could be used to connect web hooks to function.
     */
    export interface Schema$HttpsTrigger {
        /**
         * Output only. The deployed url for the function.
         */
        url?: string | null;
    }
    /**
     * Response for the `ListFunctions` method.
     */
    export interface Schema$ListFunctionsResponse {
        /**
         * The functions that match the request.
         */
        functions?: Schema$CloudFunction[];
        /**
         * If not empty, indicates that there may be more functions that match the request; this value should be passed in a new google.cloud.functions.v1.ListFunctionsRequest to get more functions.
         */
        nextPageToken?: string | null;
        /**
         * Locations that could not be reached. The response does not include any functions from these locations.
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
         * The canonical id for this location. For example: `&quot;us-east1&quot;`.
         */
        locationId?: string | null;
        /**
         * Service-specific metadata. For example the available capacity at the given location.
         */
        metadata?: {
            [key: string]: any;
        } | null;
        /**
         * Resource name for the location, which may vary between implementations. For example: `&quot;projects/example-project/locations/us-east1&quot;`
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
     * Metadata describing an Operation
     */
    export interface Schema$OperationMetadataV1 {
        /**
         * The original request that started the operation.
         */
        request?: {
            [key: string]: any;
        } | null;
        /**
         * Target of the operation - for example projects/project-1/locations/region-1/functions/function-1
         */
        target?: string | null;
        /**
         * Type of operation.
         */
        type?: string | null;
        /**
         * The last update timestamp of the operation.
         */
        updateTime?: string | null;
        /**
         * Version id of the function created or updated by an API call. This field is only populated for Create and Update operations.
         */
        versionId?: string | null;
    }
    /**
     * Metadata describing an Operation
     */
    export interface Schema$OperationMetadataV1Beta2 {
        /**
         * The original request that started the operation.
         */
        request?: {
            [key: string]: any;
        } | null;
        /**
         * Target of the operation - for example projects/project-1/locations/region-1/functions/function-1
         */
        target?: string | null;
        /**
         * Type of operation.
         */
        type?: string | null;
        /**
         * The last update timestamp of the operation.
         */
        updateTime?: string | null;
        /**
         * Version id of the function created or updated by an API call. This field is only populated for Create and Update operations.
         */
        versionId?: string | null;
    }
    /**
     * An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources.   A `Policy` is a collection of `bindings`. A `binding` binds one or more `members` to a single `role`. Members can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role.  For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies).  **JSON example:**      {       &quot;bindings&quot;: [         {           &quot;role&quot;: &quot;roles/resourcemanager.organizationAdmin&quot;,           &quot;members&quot;: [             &quot;user:mike@example.com&quot;,             &quot;group:admins@example.com&quot;,             &quot;domain:google.com&quot;,             &quot;serviceAccount:my-project-id@appspot.gserviceaccount.com&quot;           ]         },         {           &quot;role&quot;: &quot;roles/resourcemanager.organizationViewer&quot;,           &quot;members&quot;: [             &quot;user:eve@example.com&quot;           ],           &quot;condition&quot;: {             &quot;title&quot;: &quot;expirable access&quot;,             &quot;description&quot;: &quot;Does not grant access after Sep 2020&quot;,             &quot;expression&quot;: &quot;request.time &lt; timestamp(&#39;2020-10-01T00:00:00.000Z&#39;)&quot;,           }         }       ],       &quot;etag&quot;: &quot;BwWWja0YfJA=&quot;,       &quot;version&quot;: 3     }  **YAML example:**      bindings:     - members:       - user:mike@example.com       - group:admins@example.com       - domain:google.com       - serviceAccount:my-project-id@appspot.gserviceaccount.com       role: roles/resourcemanager.organizationAdmin     - members:       - user:eve@example.com       role: roles/resourcemanager.organizationViewer       condition:         title: expirable access         description: Does not grant access after Sep 2020         expression: request.time &lt; timestamp(&#39;2020-10-01T00:00:00.000Z&#39;)     - etag: BwWWja0YfJA=     - version: 3  For a description of IAM and its features, see the [IAM documentation](https://cloud.google.com/iam/docs/).
     */
    export interface Schema$Policy {
        /**
         * Specifies cloud audit logging configuration for this policy.
         */
        auditConfigs?: Schema$AuditConfig[];
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
     * Describes the retry policy in case of function&#39;s execution failure. A function execution will be retried on any failure. A failed execution will be retried up to 7 days with an exponential backoff (capped at 10 seconds). Retried execution is charged as any other execution.
     */
    export interface Schema$Retry {
    }
    /**
     * Request message for `SetIamPolicy` method.
     */
    export interface Schema$SetIamPolicyRequest {
        /**
         * REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Cloud Platform services (such as Projects) might reject them.
         */
        policy?: Schema$Policy;
        /**
         * OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used:  `paths: &quot;bindings, etag&quot;`
         */
        updateMask?: string | null;
    }
    /**
     * Describes SourceRepository, used to represent parameters related to source repository where a function is hosted.
     */
    export interface Schema$SourceRepository {
        /**
         * Output only. The URL pointing to the hosted repository where the function were defined at the time of deployment. It always points to a specific commit in the format described above.
         */
        deployedUrl?: string | null;
        /**
         * The URL pointing to the hosted repository where the function is defined. There are supported Cloud Source Repository URLs in the following formats:  To refer to a specific commit: `https://source.developers.google.com/projects/x/repos/x/revisions/x/paths/x To refer to a moveable alias (branch): `https://source.developers.google.com/projects/x/repos/x/moveable-aliases/x/paths/x In particular, to refer to HEAD use `master` moveable alias. To refer to a specific fixed alias (tag): `https://source.developers.google.com/projects/x/repos/x/fixed-aliases/x/paths/x  You may omit `paths/x if you want to use the main directory.
         */
        url?: string | null;
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
    export class Resource$Operations {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * cloudfunctions.operations.get
         * @desc Gets the latest state of a long-running operation.  Clients can use this method to poll the operation result at intervals as recommended by the API service.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudfunctions.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudfunctions = google.cloudfunctions('v1');
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
         *   const res = await cloudfunctions.operations.get({
         *     // The name of the operation resource.
         *     name: 'operations/my-operation',
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
         * @alias cloudfunctions.operations.get
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
         * cloudfunctions.operations.list
         * @desc Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.  NOTE: the `name` binding allows API services to override the binding to use different resource name schemes, such as `users/x/operations`. To override the binding, API services can add a binding such as `"/v1/{name=users/x}/operations"` to their service configuration. For backwards compatibility, the default name includes the operations collection id, however overriding users must ensure the name binding is the parent resource, without the operations collection id.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudfunctions.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudfunctions = google.cloudfunctions('v1');
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
         *   const res = await cloudfunctions.operations.list({
         *     // Required. A filter for matching the requested operations.<br><br> The supported formats of <b>filter</b> are:<br> To query for a specific function: <code>project:*,location:*,function:*</code><br> To query for all of the latest operations for a project: <code>project:*,latest:true</code>
         *     filter: 'placeholder-value',
         *     // Must not be set.
         *     name: 'placeholder-value',
         *     // The maximum number of records that should be returned.<br> Requested page size cannot exceed 100. If not set, the default page size is 100.<br><br> Pagination is only supported when querying for a specific function.
         *     pageSize: 'placeholder-value',
         *     // Token identifying which result to start with, which is returned by a previous list call.<br><br> Pagination is only supported when querying for a specific function.
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
         * @alias cloudfunctions.operations.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.filter Required. A filter for matching the requested operations.<br><br> The supported formats of <b>filter</b> are:<br> To query for a specific function: <code>project:*,location:*,function:*</code><br> To query for all of the latest operations for a project: <code>project:*,latest:true</code>
         * @param {string=} params.name Must not be set.
         * @param {integer=} params.pageSize The maximum number of records that should be returned.<br> Requested page size cannot exceed 100. If not set, the default page size is 100.<br><br> Pagination is only supported when querying for a specific function.
         * @param {string=} params.pageToken Token identifying which result to start with, which is returned by a previous list call.<br><br> Pagination is only supported when querying for a specific function.
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
    export interface Params$Resource$Operations$Get extends StandardParameters {
        /**
         * The name of the operation resource.
         */
        name?: string;
    }
    export interface Params$Resource$Operations$List extends StandardParameters {
        /**
         * Required. A filter for matching the requested operations.<br><br> The supported formats of <b>filter</b> are:<br> To query for a specific function: <code>project:*,location:*,function:*</code><br> To query for all of the latest operations for a project: <code>project:*,latest:true</code>
         */
        filter?: string;
        /**
         * Must not be set.
         */
        name?: string;
        /**
         * The maximum number of records that should be returned.<br> Requested page size cannot exceed 100. If not set, the default page size is 100.<br><br> Pagination is only supported when querying for a specific function.
         */
        pageSize?: number;
        /**
         * Token identifying which result to start with, which is returned by a previous list call.<br><br> Pagination is only supported when querying for a specific function.
         */
        pageToken?: string;
    }
    export class Resource$Projects {
        context: APIRequestContext;
        locations: Resource$Projects$Locations;
        constructor(context: APIRequestContext);
    }
    export class Resource$Projects$Locations {
        context: APIRequestContext;
        functions: Resource$Projects$Locations$Functions;
        constructor(context: APIRequestContext);
        /**
         * cloudfunctions.projects.locations.list
         * @desc Lists information about the supported locations for this service.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudfunctions.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudfunctions = google.cloudfunctions('v1');
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
         *   const res = await cloudfunctions.projects.locations.list({
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
         * @alias cloudfunctions.projects.locations.list
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
    export class Resource$Projects$Locations$Functions {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * cloudfunctions.projects.locations.functions.call
         * @desc Synchronously invokes a deployed Cloud Function. To be used for testing purposes as very limited traffic is allowed. For more information on the actual limits, refer to [Rate Limits](https://cloud.google.com/functions/quotas#rate_limits).
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudfunctions.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudfunctions = google.cloudfunctions('v1');
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
         *   const res = await cloudfunctions.projects.locations.functions.call({
         *     // Required. The name of the function to be called.
         *     name: 'projects/my-project/locations/my-location/functions/my-function',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "data": "my_data"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "error": "my_error",
         *   //   "executionId": "my_executionId",
         *   //   "result": "my_result"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudfunctions.projects.locations.functions.call
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The name of the function to be called.
         * @param {().CallFunctionRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        call(params: Params$Resource$Projects$Locations$Functions$Call, options: StreamMethodOptions): GaxiosPromise<Readable>;
        call(params?: Params$Resource$Projects$Locations$Functions$Call, options?: MethodOptions): GaxiosPromise<Schema$CallFunctionResponse>;
        call(params: Params$Resource$Projects$Locations$Functions$Call, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        call(params: Params$Resource$Projects$Locations$Functions$Call, options: MethodOptions | BodyResponseCallback<Schema$CallFunctionResponse>, callback: BodyResponseCallback<Schema$CallFunctionResponse>): void;
        call(params: Params$Resource$Projects$Locations$Functions$Call, callback: BodyResponseCallback<Schema$CallFunctionResponse>): void;
        call(callback: BodyResponseCallback<Schema$CallFunctionResponse>): void;
        /**
         * cloudfunctions.projects.locations.functions.create
         * @desc Creates a new function. If a function with the given name already exists in the specified project, the long running operation will return `ALREADY_EXISTS` error.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudfunctions.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudfunctions = google.cloudfunctions('v1');
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
         *   const res = await cloudfunctions.projects.locations.functions.create({
         *     // Required. The project and location in which the function should be created, specified
         *     // in the format `projects/x/locations/x`
         *     location: 'projects/my-project/locations/my-location',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "availableMemoryMb": 0,
         *       //   "description": "my_description",
         *       //   "entryPoint": "my_entryPoint",
         *       //   "environmentVariables": {},
         *       //   "eventTrigger": {},
         *       //   "httpsTrigger": {},
         *       //   "ingressSettings": "my_ingressSettings",
         *       //   "labels": {},
         *       //   "maxInstances": 0,
         *       //   "name": "my_name",
         *       //   "network": "my_network",
         *       //   "runtime": "my_runtime",
         *       //   "serviceAccountEmail": "my_serviceAccountEmail",
         *       //   "sourceArchiveUrl": "my_sourceArchiveUrl",
         *       //   "sourceRepository": {},
         *       //   "sourceUploadUrl": "my_sourceUploadUrl",
         *       //   "status": "my_status",
         *       //   "timeout": "my_timeout",
         *       //   "updateTime": "my_updateTime",
         *       //   "versionId": "my_versionId",
         *       //   "vpcConnector": "my_vpcConnector",
         *       //   "vpcConnectorEgressSettings": "my_vpcConnectorEgressSettings"
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
         * @alias cloudfunctions.projects.locations.functions.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.location Required. The project and location in which the function should be created, specified in the format `projects/x/locations/x`
         * @param {().CloudFunction} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Projects$Locations$Functions$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Projects$Locations$Functions$Create, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        create(params: Params$Resource$Projects$Locations$Functions$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Projects$Locations$Functions$Create, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        create(params: Params$Resource$Projects$Locations$Functions$Create, callback: BodyResponseCallback<Schema$Operation>): void;
        create(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * cloudfunctions.projects.locations.functions.delete
         * @desc Deletes a function with the given name from the specified project. If the given function is used by some trigger, the trigger will be updated to remove this function.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudfunctions.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudfunctions = google.cloudfunctions('v1');
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
         *   const res = await cloudfunctions.projects.locations.functions.delete({
         *     // Required. The name of the function which should be deleted.
         *     name: 'projects/my-project/locations/my-location/functions/my-function',
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
         * @alias cloudfunctions.projects.locations.functions.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The name of the function which should be deleted.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Projects$Locations$Functions$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Projects$Locations$Functions$Delete, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        delete(params: Params$Resource$Projects$Locations$Functions$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Projects$Locations$Functions$Delete, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        delete(params: Params$Resource$Projects$Locations$Functions$Delete, callback: BodyResponseCallback<Schema$Operation>): void;
        delete(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * cloudfunctions.projects.locations.functions.generateDownloadUrl
         * @desc Returns a signed URL for downloading deployed function source code. The URL is only valid for a limited period and should be used within minutes after generation. For more information about the signed URL usage see: https://cloud.google.com/storage/docs/access-control/signed-urls
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudfunctions.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudfunctions = google.cloudfunctions('v1');
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
         *   const res = await cloudfunctions.projects.locations.functions.generateDownloadUrl(
         *     {
         *       // The name of function for which source code Google Cloud Storage signed
         *       // URL should be generated.
         *       name: 'projects/my-project/locations/my-location/functions/my-function',
         *
         *       // Request body metadata
         *       requestBody: {
         *         // request body parameters
         *         // {
         *         //   "versionId": "my_versionId"
         *         // }
         *       },
         *     }
         *   );
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "downloadUrl": "my_downloadUrl"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudfunctions.projects.locations.functions.generateDownloadUrl
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The name of function for which source code Google Cloud Storage signed URL should be generated.
         * @param {().GenerateDownloadUrlRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        generateDownloadUrl(params: Params$Resource$Projects$Locations$Functions$Generatedownloadurl, options: StreamMethodOptions): GaxiosPromise<Readable>;
        generateDownloadUrl(params?: Params$Resource$Projects$Locations$Functions$Generatedownloadurl, options?: MethodOptions): GaxiosPromise<Schema$GenerateDownloadUrlResponse>;
        generateDownloadUrl(params: Params$Resource$Projects$Locations$Functions$Generatedownloadurl, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        generateDownloadUrl(params: Params$Resource$Projects$Locations$Functions$Generatedownloadurl, options: MethodOptions | BodyResponseCallback<Schema$GenerateDownloadUrlResponse>, callback: BodyResponseCallback<Schema$GenerateDownloadUrlResponse>): void;
        generateDownloadUrl(params: Params$Resource$Projects$Locations$Functions$Generatedownloadurl, callback: BodyResponseCallback<Schema$GenerateDownloadUrlResponse>): void;
        generateDownloadUrl(callback: BodyResponseCallback<Schema$GenerateDownloadUrlResponse>): void;
        /**
         * cloudfunctions.projects.locations.functions.generateUploadUrl
         * @desc Returns a signed URL for uploading a function source code. For more information about the signed URL usage see: https://cloud.google.com/storage/docs/access-control/signed-urls. Once the function source code upload is complete, the used signed URL should be provided in CreateFunction or UpdateFunction request as a reference to the function source code.  When uploading source code to the generated signed URL, please follow these restrictions:  * Source file type should be a zip file. * Source file size should not exceed 100MB limit. * No credentials should be attached - the signed URLs provide access to the   target bucket using internal service identity; if credentials were   attached, the identity from the credentials would be used, but that   identity does not have permissions to upload files to the URL.  When making a HTTP PUT request, these two headers need to be specified:  * `content-type: application/zip` * `x-goog-content-length-range: 0,104857600`  And this header SHOULD NOT be specified:  * `Authorization: Bearer YOUR_TOKEN`
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudfunctions.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudfunctions = google.cloudfunctions('v1');
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
         *   const res = await cloudfunctions.projects.locations.functions.generateUploadUrl(
         *     {
         *       // The project and location in which the Google Cloud Storage signed URL
         *       // should be generated, specified in the format `projects/x/locations/x`.
         *       parent: 'projects/my-project/locations/my-location',
         *
         *       // Request body metadata
         *       requestBody: {
         *         // request body parameters
         *         // {}
         *       },
         *     }
         *   );
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "uploadUrl": "my_uploadUrl"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudfunctions.projects.locations.functions.generateUploadUrl
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent The project and location in which the Google Cloud Storage signed URL should be generated, specified in the format `projects/x/locations/x`.
         * @param {().GenerateUploadUrlRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        generateUploadUrl(params: Params$Resource$Projects$Locations$Functions$Generateuploadurl, options: StreamMethodOptions): GaxiosPromise<Readable>;
        generateUploadUrl(params?: Params$Resource$Projects$Locations$Functions$Generateuploadurl, options?: MethodOptions): GaxiosPromise<Schema$GenerateUploadUrlResponse>;
        generateUploadUrl(params: Params$Resource$Projects$Locations$Functions$Generateuploadurl, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        generateUploadUrl(params: Params$Resource$Projects$Locations$Functions$Generateuploadurl, options: MethodOptions | BodyResponseCallback<Schema$GenerateUploadUrlResponse>, callback: BodyResponseCallback<Schema$GenerateUploadUrlResponse>): void;
        generateUploadUrl(params: Params$Resource$Projects$Locations$Functions$Generateuploadurl, callback: BodyResponseCallback<Schema$GenerateUploadUrlResponse>): void;
        generateUploadUrl(callback: BodyResponseCallback<Schema$GenerateUploadUrlResponse>): void;
        /**
         * cloudfunctions.projects.locations.functions.get
         * @desc Returns a function with the given name from the requested project.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudfunctions.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudfunctions = google.cloudfunctions('v1');
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
         *   const res = await cloudfunctions.projects.locations.functions.get({
         *     // Required. The name of the function which details should be obtained.
         *     name: 'projects/my-project/locations/my-location/functions/my-function',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "availableMemoryMb": 0,
         *   //   "description": "my_description",
         *   //   "entryPoint": "my_entryPoint",
         *   //   "environmentVariables": {},
         *   //   "eventTrigger": {},
         *   //   "httpsTrigger": {},
         *   //   "ingressSettings": "my_ingressSettings",
         *   //   "labels": {},
         *   //   "maxInstances": 0,
         *   //   "name": "my_name",
         *   //   "network": "my_network",
         *   //   "runtime": "my_runtime",
         *   //   "serviceAccountEmail": "my_serviceAccountEmail",
         *   //   "sourceArchiveUrl": "my_sourceArchiveUrl",
         *   //   "sourceRepository": {},
         *   //   "sourceUploadUrl": "my_sourceUploadUrl",
         *   //   "status": "my_status",
         *   //   "timeout": "my_timeout",
         *   //   "updateTime": "my_updateTime",
         *   //   "versionId": "my_versionId",
         *   //   "vpcConnector": "my_vpcConnector",
         *   //   "vpcConnectorEgressSettings": "my_vpcConnectorEgressSettings"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudfunctions.projects.locations.functions.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The name of the function which details should be obtained.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Locations$Functions$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Locations$Functions$Get, options?: MethodOptions): GaxiosPromise<Schema$CloudFunction>;
        get(params: Params$Resource$Projects$Locations$Functions$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Locations$Functions$Get, options: MethodOptions | BodyResponseCallback<Schema$CloudFunction>, callback: BodyResponseCallback<Schema$CloudFunction>): void;
        get(params: Params$Resource$Projects$Locations$Functions$Get, callback: BodyResponseCallback<Schema$CloudFunction>): void;
        get(callback: BodyResponseCallback<Schema$CloudFunction>): void;
        /**
         * cloudfunctions.projects.locations.functions.getIamPolicy
         * @desc Gets the IAM access control policy for a function. Returns an empty policy if the function exists and does not have a policy set.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudfunctions.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudfunctions = google.cloudfunctions('v1');
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
         *   const res = await cloudfunctions.projects.locations.functions.getIamPolicy({
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
         *     resource: 'projects/my-project/locations/my-location/functions/my-function',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "auditConfigs": [],
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
         * @alias cloudfunctions.projects.locations.functions.getIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.options.requestedPolicyVersion Optional. The policy format version to be returned.  Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.  Requests for policies with any conditional bindings must specify version 3. Policies without any conditional bindings may specify any valid value or leave the field unset.  To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
         * @param {string} params.resource_ REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getIamPolicy(params: Params$Resource$Projects$Locations$Functions$Getiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getIamPolicy(params?: Params$Resource$Projects$Locations$Functions$Getiampolicy, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        getIamPolicy(params: Params$Resource$Projects$Locations$Functions$Getiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getIamPolicy(params: Params$Resource$Projects$Locations$Functions$Getiampolicy, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        getIamPolicy(params: Params$Resource$Projects$Locations$Functions$Getiampolicy, callback: BodyResponseCallback<Schema$Policy>): void;
        getIamPolicy(callback: BodyResponseCallback<Schema$Policy>): void;
        /**
         * cloudfunctions.projects.locations.functions.list
         * @desc Returns a list of functions that belong to the requested project.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudfunctions.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudfunctions = google.cloudfunctions('v1');
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
         *   const res = await cloudfunctions.projects.locations.functions.list({
         *     // Maximum number of functions to return per call.
         *     pageSize: 'placeholder-value',
         *     // The value returned by the last
         *     // `ListFunctionsResponse`; indicates that
         *     // this is a continuation of a prior `ListFunctions` call, and that the
         *     // system should return the next page of data.
         *     pageToken: 'placeholder-value',
         *     // The project and location from which the function should be listed,
         *     // specified in the format `projects/x/locations/x`
         *     // If you want to list functions in all locations, use "-" in place of a
         *     // location. When listing functions in all locations, if one or more
         *     // location(s) are unreachable, the response will contain functions from all
         *     // reachable locations along with the names of any unreachable locations.
         *     parent: 'projects/my-project/locations/my-location',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "functions": [],
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
         * @alias cloudfunctions.projects.locations.functions.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize Maximum number of functions to return per call.
         * @param {string=} params.pageToken The value returned by the last `ListFunctionsResponse`; indicates that this is a continuation of a prior `ListFunctions` call, and that the system should return the next page of data.
         * @param {string} params.parent The project and location from which the function should be listed, specified in the format `projects/x/locations/x` If you want to list functions in all locations, use "-" in place of a location. When listing functions in all locations, if one or more location(s) are unreachable, the response will contain functions from all reachable locations along with the names of any unreachable locations.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Locations$Functions$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Locations$Functions$List, options?: MethodOptions): GaxiosPromise<Schema$ListFunctionsResponse>;
        list(params: Params$Resource$Projects$Locations$Functions$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Locations$Functions$List, options: MethodOptions | BodyResponseCallback<Schema$ListFunctionsResponse>, callback: BodyResponseCallback<Schema$ListFunctionsResponse>): void;
        list(params: Params$Resource$Projects$Locations$Functions$List, callback: BodyResponseCallback<Schema$ListFunctionsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListFunctionsResponse>): void;
        /**
         * cloudfunctions.projects.locations.functions.patch
         * @desc Updates existing function.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudfunctions.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudfunctions = google.cloudfunctions('v1');
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
         *   const res = await cloudfunctions.projects.locations.functions.patch({
         *     // A user-defined name of the function. Function names must be unique
         *     // globally and match pattern `projects/x/locations/x/functions/x`
         *     name: 'projects/my-project/locations/my-location/functions/my-function',
         *     // Required list of fields to be updated in this request.
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "availableMemoryMb": 0,
         *       //   "description": "my_description",
         *       //   "entryPoint": "my_entryPoint",
         *       //   "environmentVariables": {},
         *       //   "eventTrigger": {},
         *       //   "httpsTrigger": {},
         *       //   "ingressSettings": "my_ingressSettings",
         *       //   "labels": {},
         *       //   "maxInstances": 0,
         *       //   "name": "my_name",
         *       //   "network": "my_network",
         *       //   "runtime": "my_runtime",
         *       //   "serviceAccountEmail": "my_serviceAccountEmail",
         *       //   "sourceArchiveUrl": "my_sourceArchiveUrl",
         *       //   "sourceRepository": {},
         *       //   "sourceUploadUrl": "my_sourceUploadUrl",
         *       //   "status": "my_status",
         *       //   "timeout": "my_timeout",
         *       //   "updateTime": "my_updateTime",
         *       //   "versionId": "my_versionId",
         *       //   "vpcConnector": "my_vpcConnector",
         *       //   "vpcConnectorEgressSettings": "my_vpcConnectorEgressSettings"
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
         * @alias cloudfunctions.projects.locations.functions.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name A user-defined name of the function. Function names must be unique globally and match pattern `projects/x/locations/x/functions/x`
         * @param {string=} params.updateMask Required list of fields to be updated in this request.
         * @param {().CloudFunction} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Projects$Locations$Functions$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Projects$Locations$Functions$Patch, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        patch(params: Params$Resource$Projects$Locations$Functions$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Projects$Locations$Functions$Patch, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        patch(params: Params$Resource$Projects$Locations$Functions$Patch, callback: BodyResponseCallback<Schema$Operation>): void;
        patch(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * cloudfunctions.projects.locations.functions.setIamPolicy
         * @desc Sets the IAM access control policy on the specified function. Replaces any existing policy.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudfunctions.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudfunctions = google.cloudfunctions('v1');
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
         *   const res = await cloudfunctions.projects.locations.functions.setIamPolicy({
         *     // REQUIRED: The resource for which the policy is being specified.
         *     // See the operation documentation for the appropriate value for this field.
         *     resource: 'projects/my-project/locations/my-location/functions/my-function',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "policy": {},
         *       //   "updateMask": "my_updateMask"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "auditConfigs": [],
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
         * @alias cloudfunctions.projects.locations.functions.setIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         * @param {().SetIamPolicyRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        setIamPolicy(params: Params$Resource$Projects$Locations$Functions$Setiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        setIamPolicy(params?: Params$Resource$Projects$Locations$Functions$Setiampolicy, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        setIamPolicy(params: Params$Resource$Projects$Locations$Functions$Setiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        setIamPolicy(params: Params$Resource$Projects$Locations$Functions$Setiampolicy, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        setIamPolicy(params: Params$Resource$Projects$Locations$Functions$Setiampolicy, callback: BodyResponseCallback<Schema$Policy>): void;
        setIamPolicy(callback: BodyResponseCallback<Schema$Policy>): void;
        /**
         * cloudfunctions.projects.locations.functions.testIamPermissions
         * @desc Tests the specified permissions against the IAM access control policy for a function. If the function does not exist, this will return an empty set of permissions, not a NOT_FOUND error.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudfunctions.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudfunctions = google.cloudfunctions('v1');
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
         *   const res = await cloudfunctions.projects.locations.functions.testIamPermissions(
         *     {
         *       // REQUIRED: The resource for which the policy detail is being requested.
         *       // See the operation documentation for the appropriate value for this field.
         *       resource:
         *         'projects/my-project/locations/my-location/functions/my-function',
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
         * @alias cloudfunctions.projects.locations.functions.testIamPermissions
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         * @param {().TestIamPermissionsRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        testIamPermissions(params: Params$Resource$Projects$Locations$Functions$Testiampermissions, options: StreamMethodOptions): GaxiosPromise<Readable>;
        testIamPermissions(params?: Params$Resource$Projects$Locations$Functions$Testiampermissions, options?: MethodOptions): GaxiosPromise<Schema$TestIamPermissionsResponse>;
        testIamPermissions(params: Params$Resource$Projects$Locations$Functions$Testiampermissions, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        testIamPermissions(params: Params$Resource$Projects$Locations$Functions$Testiampermissions, options: MethodOptions | BodyResponseCallback<Schema$TestIamPermissionsResponse>, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(params: Params$Resource$Projects$Locations$Functions$Testiampermissions, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
    }
    export interface Params$Resource$Projects$Locations$Functions$Call extends StandardParameters {
        /**
         * Required. The name of the function to be called.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$CallFunctionRequest;
    }
    export interface Params$Resource$Projects$Locations$Functions$Create extends StandardParameters {
        /**
         * Required. The project and location in which the function should be created, specified in the format `projects/x/locations/x`
         */
        location?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$CloudFunction;
    }
    export interface Params$Resource$Projects$Locations$Functions$Delete extends StandardParameters {
        /**
         * Required. The name of the function which should be deleted.
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Locations$Functions$Generatedownloadurl extends StandardParameters {
        /**
         * The name of function for which source code Google Cloud Storage signed URL should be generated.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$GenerateDownloadUrlRequest;
    }
    export interface Params$Resource$Projects$Locations$Functions$Generateuploadurl extends StandardParameters {
        /**
         * The project and location in which the Google Cloud Storage signed URL should be generated, specified in the format `projects/x/locations/x`.
         */
        parent?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$GenerateUploadUrlRequest;
    }
    export interface Params$Resource$Projects$Locations$Functions$Get extends StandardParameters {
        /**
         * Required. The name of the function which details should be obtained.
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Locations$Functions$Getiampolicy extends StandardParameters {
        /**
         * Optional. The policy format version to be returned.  Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.  Requests for policies with any conditional bindings must specify version 3. Policies without any conditional bindings may specify any valid value or leave the field unset.  To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
         */
        'options.requestedPolicyVersion'?: number;
        /**
         * REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
    }
    export interface Params$Resource$Projects$Locations$Functions$List extends StandardParameters {
        /**
         * Maximum number of functions to return per call.
         */
        pageSize?: number;
        /**
         * The value returned by the last `ListFunctionsResponse`; indicates that this is a continuation of a prior `ListFunctions` call, and that the system should return the next page of data.
         */
        pageToken?: string;
        /**
         * The project and location from which the function should be listed, specified in the format `projects/x/locations/x` If you want to list functions in all locations, use "-" in place of a location. When listing functions in all locations, if one or more location(s) are unreachable, the response will contain functions from all reachable locations along with the names of any unreachable locations.
         */
        parent?: string;
    }
    export interface Params$Resource$Projects$Locations$Functions$Patch extends StandardParameters {
        /**
         * A user-defined name of the function. Function names must be unique globally and match pattern `projects/x/locations/x/functions/x`
         */
        name?: string;
        /**
         * Required list of fields to be updated in this request.
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$CloudFunction;
    }
    export interface Params$Resource$Projects$Locations$Functions$Setiampolicy extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$SetIamPolicyRequest;
    }
    export interface Params$Resource$Projects$Locations$Functions$Testiampermissions extends StandardParameters {
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
