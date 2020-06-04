/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace deploymentmanager_v2 {
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
     * Google Cloud Deployment Manager API
     *
     * Declares, configures, and deploys complex solutions on Google Cloud Platform.
     *
     * @example
     * const {google} = require('googleapis');
     * const deploymentmanager = google.deploymentmanager('v2');
     *
     * @namespace deploymentmanager
     * @type {Function}
     * @version v2
     * @variation v2
     * @param {object=} options Options for Deploymentmanager
     */
    export class Deploymentmanager {
        context: APIRequestContext;
        deployments: Resource$Deployments;
        manifests: Resource$Manifests;
        operations: Resource$Operations;
        resources: Resource$Resources;
        types: Resource$Types;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    /**
     * Specifies the audit configuration for a service. The configuration determines which permission types are logged, and what identities, if any, are exempted from logging. An AuditConfig must have one or more AuditLogConfigs.  If there are AuditConfigs for both `allServices` and a specific service, the union of the two AuditConfigs is used for that service: the log_types specified in each AuditConfig are enabled, and the exempted_members in each AuditLogConfig are exempted.  Example Policy with multiple AuditConfigs:  { &quot;audit_configs&quot;: [ { &quot;service&quot;: &quot;allServices&quot; &quot;audit_log_configs&quot;: [ { &quot;log_type&quot;: &quot;DATA_READ&quot;, &quot;exempted_members&quot;: [ &quot;user:jose@example.com&quot; ] }, { &quot;log_type&quot;: &quot;DATA_WRITE&quot;, }, { &quot;log_type&quot;: &quot;ADMIN_READ&quot;, } ] }, { &quot;service&quot;: &quot;sampleservice.googleapis.com&quot; &quot;audit_log_configs&quot;: [ { &quot;log_type&quot;: &quot;DATA_READ&quot;, }, { &quot;log_type&quot;: &quot;DATA_WRITE&quot;, &quot;exempted_members&quot;: [ &quot;user:aliya@example.com&quot; ] } ] } ] }  For sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ logging. It also exempts jose@example.com from DATA_READ logging, and aliya@example.com from DATA_WRITE logging.
     */
    export interface Schema$AuditConfig {
        /**
         * The configuration for logging of each type of permission.
         */
        auditLogConfigs?: Schema$AuditLogConfig[];
        exemptedMembers?: string[] | null;
        /**
         * Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services.
         */
        service?: string | null;
    }
    /**
     * Provides the configuration for logging a type of permissions. Example:  { &quot;audit_log_configs&quot;: [ { &quot;log_type&quot;: &quot;DATA_READ&quot;, &quot;exempted_members&quot;: [ &quot;user:jose@example.com&quot; ] }, { &quot;log_type&quot;: &quot;DATA_WRITE&quot;, } ] }  This enables &#39;DATA_READ&#39; and &#39;DATA_WRITE&#39; logging, while exempting jose@example.com from DATA_READ logging.
     */
    export interface Schema$AuditLogConfig {
        /**
         * Specifies the identities that do not cause logging for this type of permission. Follows the same format of [Binding.members][].
         */
        exemptedMembers?: string[] | null;
        ignoreChildExemptions?: boolean | null;
        /**
         * The log type that this config enables.
         */
        logType?: string | null;
    }
    /**
     * Authorization-related information used by Cloud Audit Logging.
     */
    export interface Schema$AuthorizationLoggingOptions {
        /**
         * The type of the permission that was checked.
         */
        permissionType?: string | null;
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
         * Specifies the identities requesting access for a Cloud Platform resource. `members` can have the following values:  * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account.  * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account.  * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` .    * `serviceAccount:{emailid}`: An email address that represents a service account. For example, `my-other-app@appspot.gserviceaccount.com`.  * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`.  * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding.  * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding.  * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding.    * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`.
         */
        members?: string[] | null;
        /**
         * Role that is assigned to `members`. For example, `roles/viewer`, `roles/editor`, or `roles/owner`.
         */
        role?: string | null;
    }
    /**
     * A condition to be met.
     */
    export interface Schema$Condition {
        /**
         * Trusted attributes supplied by the IAM system.
         */
        iam?: string | null;
        /**
         * An operator to apply the subject with.
         */
        op?: string | null;
        /**
         * Trusted attributes discharged by the service.
         */
        svc?: string | null;
        /**
         * Trusted attributes supplied by any service that owns resources and uses the IAM system for access control.
         */
        sys?: string | null;
        /**
         * The objects of the condition.
         */
        values?: string[] | null;
    }
    export interface Schema$ConfigFile {
        /**
         * The contents of the file.
         */
        content?: string | null;
    }
    export interface Schema$Deployment {
        /**
         * An optional user-provided description of the deployment.
         */
        description?: string | null;
        /**
         * Provides a fingerprint to use in requests to modify a deployment, such as `update()`, `stop()`, and `cancelPreview()` requests. A fingerprint is a randomly generated value that must be provided with `update()`, `stop()`, and `cancelPreview()` requests to perform optimistic locking. This ensures optimistic concurrency so that only one request happens at a time.  The fingerprint is initially generated by Deployment Manager and changes after every request to modify data. To get the latest fingerprint value, perform a `get()` request to a deployment.
         */
        fingerprint?: string | null;
        id?: string | null;
        /**
         * Output only. Creation timestamp in RFC3339 text format.
         */
        insertTime?: string | null;
        /**
         * Map of labels; provided by the client when the resource is created or updated. Specifically: Label keys must be between 1 and 63 characters long and must conform to the following regular expression: `[a-z]([-a-z0-9]*[a-z0-9])?` Label values must be between 0 and 63 characters long and must conform to the regular expression `([a-z]([-a-z0-9]*[a-z0-9])?)?`.
         */
        labels?: Schema$DeploymentLabelEntry[];
        /**
         * Output only. URL of the manifest representing the last manifest that was successfully deployed. If no manifest has been successfully deployed, this field will be absent.
         */
        manifest?: string | null;
        /**
         * Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.
         */
        name?: string | null;
        /**
         * Output only. The Operation that most recently ran, or is currently running, on this deployment.
         */
        operation?: Schema$Operation;
        /**
         * Output only. Server defined URL for the resource.
         */
        selfLink?: string | null;
        /**
         * [Input Only] The parameters that define your deployment, including the deployment configuration and relevant templates.
         */
        target?: Schema$TargetConfiguration;
        /**
         * Output only. If Deployment Manager is currently updating or previewing an update to this deployment, the updated configuration appears here.
         */
        update?: Schema$DeploymentUpdate;
        /**
         * Output only. Update timestamp in RFC3339 text format.
         */
        updateTime?: string | null;
    }
    export interface Schema$DeploymentLabelEntry {
        key?: string | null;
        value?: string | null;
    }
    export interface Schema$DeploymentsCancelPreviewRequest {
        /**
         * Specifies a fingerprint for `cancelPreview()` requests. A fingerprint is a randomly generated value that must be provided in `cancelPreview()` requests to perform optimistic locking. This ensures optimistic concurrency so that the deployment does not have conflicting requests (e.g. if someone attempts to make a new update request while another user attempts to cancel a preview, this would prevent one of the requests).  The fingerprint is initially generated by Deployment Manager and changes after every request to modify a deployment. To get the latest fingerprint value, perform a `get()` request on the deployment.
         */
        fingerprint?: string | null;
    }
    /**
     * A response containing a partial list of deployments and a page token used to build the next request if the request has been truncated.
     */
    export interface Schema$DeploymentsListResponse {
        /**
         * Output only. The deployments contained in this response.
         */
        deployments?: Schema$Deployment[];
        /**
         * Output only. A token used to continue a truncated list request.
         */
        nextPageToken?: string | null;
    }
    export interface Schema$DeploymentsStopRequest {
        /**
         * Specifies a fingerprint for `stop()` requests. A fingerprint is a randomly generated value that must be provided in `stop()` requests to perform optimistic locking. This ensures optimistic concurrency so that the deployment does not have conflicting requests (e.g. if someone attempts to make a new update request while another user attempts to stop an ongoing update request, this would prevent a collision).  The fingerprint is initially generated by Deployment Manager and changes after every request to modify a deployment. To get the latest fingerprint value, perform a `get()` request on the deployment.
         */
        fingerprint?: string | null;
    }
    export interface Schema$DeploymentUpdate {
        /**
         * Output only. An optional user-provided description of the deployment after the current update has been applied.
         */
        description?: string | null;
        /**
         * Output only. Map of labels; provided by the client when the resource is created or updated. Specifically: Label keys must be between 1 and 63 characters long and must conform to the following regular expression: `[a-z]([-a-z0-9]*[a-z0-9])?` Label values must be between 0 and 63 characters long and must conform to the regular expression `([a-z]([-a-z0-9]*[a-z0-9])?)?`.
         */
        labels?: Schema$DeploymentUpdateLabelEntry[];
        /**
         * Output only. URL of the manifest representing the update configuration of this deployment.
         */
        manifest?: string | null;
    }
    export interface Schema$DeploymentUpdateLabelEntry {
        key?: string | null;
        value?: string | null;
    }
    /**
     * Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec.  Example (Comparison):  title: &quot;Summary size limit&quot; description: &quot;Determines if a summary is less than 100 chars&quot; expression: &quot;document.summary.size() &lt; 100&quot;  Example (Equality):  title: &quot;Requestor is owner&quot; description: &quot;Determines if requestor is the document owner&quot; expression: &quot;document.owner == request.auth.claims.email&quot;  Example (Logic):  title: &quot;Public documents&quot; description: &quot;Determine whether the document should be publicly visible&quot; expression: &quot;document.type != &#39;private&#39; &amp;&amp; document.type != &#39;internal&#39;&quot;  Example (Data Manipulation):  title: &quot;Notification string&quot; description: &quot;Create a notification string with a timestamp.&quot; expression: &quot;&#39;New message received at &#39; + string(document.create_time)&quot;  The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
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
    export interface Schema$GlobalSetPolicyRequest {
        /**
         * Flatten Policy to create a backward compatible wire-format. Deprecated. Use &#39;policy&#39; to specify bindings.
         */
        bindings?: Schema$Binding[];
        /**
         * Flatten Policy to create a backward compatible wire-format. Deprecated. Use &#39;policy&#39; to specify the etag.
         */
        etag?: string | null;
        /**
         * REQUIRED: The complete policy to be applied to the &#39;resource&#39;. The size of the policy is limited to a few 10s of KB. An empty policy is in general a valid policy but certain services (like Projects) might reject them.
         */
        policy?: Schema$Policy;
    }
    export interface Schema$ImportFile {
        /**
         * The contents of the file.
         */
        content?: string | null;
        /**
         * The name of the file.
         */
        name?: string | null;
    }
    /**
     * Specifies what kind of log the caller must write
     */
    export interface Schema$LogConfig {
        /**
         * Cloud audit options.
         */
        cloudAudit?: Schema$LogConfigCloudAuditOptions;
        /**
         * Counter options.
         */
        counter?: Schema$LogConfigCounterOptions;
        /**
         * Data access options.
         */
        dataAccess?: Schema$LogConfigDataAccessOptions;
    }
    /**
     * Write a Cloud Audit log
     */
    export interface Schema$LogConfigCloudAuditOptions {
        /**
         * Information used by the Cloud Audit Logging pipeline.
         */
        authorizationLoggingOptions?: Schema$AuthorizationLoggingOptions;
        /**
         * The log_name to populate in the Cloud Audit Record.
         */
        logName?: string | null;
    }
    /**
     * Increment a streamz counter with the specified metric and field names.  Metric names should start with a &#39;/&#39;, generally be lowercase-only, and end in &quot;_count&quot;. Field names should not contain an initial slash. The actual exported metric names will have &quot;/iam/policy&quot; prepended.  Field names correspond to IAM request parameters and field values are their respective values.  Supported field names: - &quot;authority&quot;, which is &quot;[token]&quot; if IAMContext.token is present, otherwise the value of IAMContext.authority_selector if present, and otherwise a representation of IAMContext.principal; or - &quot;iam_principal&quot;, a representation of IAMContext.principal even if a token or authority selector is present; or - &quot;&quot; (empty string), resulting in a counter with no fields.  Examples: counter { metric: &quot;/debug_access_count&quot; field: &quot;iam_principal&quot; } ==&gt; increment counter /iam/policy/debug_access_count {iam_principal=[value of IAMContext.principal]}
     */
    export interface Schema$LogConfigCounterOptions {
        /**
         * Custom fields.
         */
        customFields?: Schema$LogConfigCounterOptionsCustomField[];
        /**
         * The field value to attribute.
         */
        field?: string | null;
        /**
         * The metric to update.
         */
        metric?: string | null;
    }
    /**
     * Custom fields. These can be used to create a counter with arbitrary field/value pairs. See: go/rpcsp-custom-fields.
     */
    export interface Schema$LogConfigCounterOptionsCustomField {
        /**
         * Name is the field name.
         */
        name?: string | null;
        /**
         * Value is the field value. It is important that in contrast to the CounterOptions.field, the value here is a constant that is not derived from the IAMContext.
         */
        value?: string | null;
    }
    /**
     * Write a Data Access (Gin) log
     */
    export interface Schema$LogConfigDataAccessOptions {
        logMode?: string | null;
    }
    export interface Schema$Manifest {
        /**
         * Output only. The YAML configuration for this manifest.
         */
        config?: Schema$ConfigFile;
        /**
         * Output only. The fully-expanded configuration file, including any templates and references.
         */
        expandedConfig?: string | null;
        id?: string | null;
        /**
         * Output only. The imported files for this manifest.
         */
        imports?: Schema$ImportFile[];
        /**
         * Output only. Creation timestamp in RFC3339 text format.
         */
        insertTime?: string | null;
        /**
         * Output only. The YAML layout for this manifest.
         */
        layout?: string | null;
        /**
         * Output only.  The name of the manifest.
         */
        name?: string | null;
        /**
         * Output only. Self link for the manifest.
         */
        selfLink?: string | null;
    }
    /**
     * A response containing a partial list of manifests and a page token used to build the next request if the request has been truncated.
     */
    export interface Schema$ManifestsListResponse {
        /**
         * Output only. Manifests contained in this list response.
         */
        manifests?: Schema$Manifest[];
        /**
         * Output only. A token used to continue a truncated list request.
         */
        nextPageToken?: string | null;
    }
    /**
     * Represents an Operation resource.  Google Compute Engine has three Operation resources:  * [Global](/compute/docs/reference/rest/{$api_version}/globalOperations) * [Regional](/compute/docs/reference/rest/{$api_version}/regionOperations) * [Zonal](/compute/docs/reference/rest/{$api_version}/zoneOperations)  You can use an operation resource to manage asynchronous API requests. For more information, read Handling API responses.  Operations can be global, regional or zonal.   - For global operations, use the `globalOperations` resource.  - For regional operations, use the `regionOperations` resource.  - For zonal operations, use the `zonalOperations` resource.    For more information, read  Global, Regional, and Zonal Resources. (== resource_for {$api_version}.globalOperations ==) (== resource_for {$api_version}.regionOperations ==) (== resource_for {$api_version}.zoneOperations ==)
     */
    export interface Schema$Operation {
        /**
         * [Output Only] The value of `requestId` if you provided it in the request. Not present otherwise.
         */
        clientOperationId?: string | null;
        /**
         * [Deprecated] This field is deprecated.
         */
        creationTimestamp?: string | null;
        /**
         * [Output Only] A textual description of the operation, which is set when the operation is created.
         */
        description?: string | null;
        /**
         * [Output Only] The time that this operation was completed. This value is in RFC3339 text format.
         */
        endTime?: string | null;
        /**
         * [Output Only] If errors are generated during processing of the operation, this field will be populated.
         */
        error?: {
            errors?: Array<{
                code?: string;
                location?: string;
                message?: string;
            }>;
        } | null;
        /**
         * [Output Only] If the operation fails, this field contains the HTTP error message that was returned, such as `NOT FOUND`.
         */
        httpErrorMessage?: string | null;
        /**
         * [Output Only] If the operation fails, this field contains the HTTP error status code that was returned. For example, a `404` means the resource was not found.
         */
        httpErrorStatusCode?: number | null;
        /**
         * [Output Only] The unique identifier for the operation. This identifier is defined by the server.
         */
        id?: string | null;
        /**
         * [Output Only] The time that this operation was requested. This value is in RFC3339 text format.
         */
        insertTime?: string | null;
        /**
         * [Output Only] Type of the resource. Always `compute#operation` for Operation resources.
         */
        kind?: string | null;
        /**
         * [Output Only] Name of the operation.
         */
        name?: string | null;
        /**
         * [Output Only] The type of operation, such as `insert`, `update`, or `delete`, and so on.
         */
        operationType?: string | null;
        /**
         * [Output Only] An optional progress indicator that ranges from 0 to 100. There is no requirement that this be linear or support any granularity of operations. This should not be used to guess when the operation will be complete. This number should monotonically increase as the operation progresses.
         */
        progress?: number | null;
        /**
         * [Output Only] The URL of the region where the operation resides. Only applicable when performing regional operations.
         */
        region?: string | null;
        /**
         * [Output Only] Server-defined URL for the resource.
         */
        selfLink?: string | null;
        /**
         * [Output Only] The time that this operation was started by the server. This value is in RFC3339 text format.
         */
        startTime?: string | null;
        /**
         * [Output Only] The status of the operation, which can be one of the following: `PENDING`, `RUNNING`, or `DONE`.
         */
        status?: string | null;
        /**
         * [Output Only] An optional textual description of the current status of the operation.
         */
        statusMessage?: string | null;
        /**
         * [Output Only] The unique target ID, which identifies a specific incarnation of the target resource.
         */
        targetId?: string | null;
        /**
         * [Output Only] The URL of the resource that the operation modifies. For operations related to creating a snapshot, this points to the persistent disk that the snapshot was created from.
         */
        targetLink?: string | null;
        /**
         * [Output Only] User who requested the operation, for example: `user@example.com`.
         */
        user?: string | null;
        /**
         * [Output Only] If warning messages are generated during processing of the operation, this field will be populated.
         */
        warnings?: Array<{
            code?: string;
            data?: Array<{
                key?: string;
                value?: string;
            }>;
            message?: string;
        }> | null;
        /**
         * [Output Only] The URL of the zone where the operation resides. Only applicable when performing per-zone operations.
         */
        zone?: string | null;
    }
    /**
     * A response containing a partial list of operations and a page token used to build the next request if the request has been truncated.
     */
    export interface Schema$OperationsListResponse {
        /**
         * Output only. A token used to continue a truncated list request.
         */
        nextPageToken?: string | null;
        /**
         * Output only. Operations contained in this list response.
         */
        operations?: Schema$Operation[];
    }
    /**
     * An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources.    A `Policy` is a collection of `bindings`. A `binding` binds one or more `members` to a single `role`. Members can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role.  For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies).  **JSON example:**  { &quot;bindings&quot;: [ { &quot;role&quot;: &quot;roles/resourcemanager.organizationAdmin&quot;, &quot;members&quot;: [ &quot;user:mike@example.com&quot;, &quot;group:admins@example.com&quot;, &quot;domain:google.com&quot;, &quot;serviceAccount:my-project-id@appspot.gserviceaccount.com&quot; ] }, { &quot;role&quot;: &quot;roles/resourcemanager.organizationViewer&quot;, &quot;members&quot;: [ &quot;user:eve@example.com&quot; ], &quot;condition&quot;: { &quot;title&quot;: &quot;expirable access&quot;, &quot;description&quot;: &quot;Does not grant access after Sep 2020&quot;, &quot;expression&quot;: &quot;request.time &lt; timestamp(&#39;2020-10-01T00:00:00.000Z&#39;)&quot;, } } ], &quot;etag&quot;: &quot;BwWWja0YfJA=&quot;, &quot;version&quot;: 3 }  **YAML example:**  bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time &lt; timestamp(&#39;2020-10-01T00:00:00.000Z&#39;) - etag: BwWWja0YfJA= - version: 3  For a description of IAM and its features, see the [IAM documentation](https://cloud.google.com/iam/docs/).
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
        iamOwned?: boolean | null;
        /**
         * If more than one rule is specified, the rules are applied in the following manner: - All matching LOG rules are always applied. - If any DENY/DENY_WITH_LOG rule matches, permission is denied. Logging will be applied if one or more matching rule requires logging. - Otherwise, if any ALLOW/ALLOW_WITH_LOG rule matches, permission is granted. Logging will be applied if one or more matching rule requires logging. - Otherwise, if no rule applies, permission is denied.
         */
        rules?: Schema$Rule[];
        /**
         * Specifies the format of the policy.  Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected.  Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations:  * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions  **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost.  If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset.  To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
         */
        version?: number | null;
    }
    export interface Schema$Resource {
        /**
         * The Access Control Policy set on this resource.
         */
        accessControl?: Schema$ResourceAccessControl;
        /**
         * Output only. The evaluated properties of the resource with references expanded. Returned as serialized YAML.
         */
        finalProperties?: string | null;
        id?: string | null;
        /**
         * Output only. Creation timestamp in RFC3339 text format.
         */
        insertTime?: string | null;
        /**
         * Output only. URL of the manifest representing the current configuration of this resource.
         */
        manifest?: string | null;
        /**
         * Output only. The name of the resource as it appears in the YAML config.
         */
        name?: string | null;
        /**
         * Output only. The current properties of the resource before any references have been filled in. Returned as serialized YAML.
         */
        properties?: string | null;
        /**
         * Output only. The type of the resource, for example `compute.v1.instance`, or `cloudfunctions.v1beta1.function`.
         */
        type?: string | null;
        /**
         * Output only. If Deployment Manager is currently updating or previewing an update to this resource, the updated configuration appears here.
         */
        update?: Schema$ResourceUpdate;
        /**
         * Output only. Update timestamp in RFC3339 text format.
         */
        updateTime?: string | null;
        /**
         * Output only. The URL of the actual resource.
         */
        url?: string | null;
        /**
         * Output only. If warning messages are generated during processing of this resource, this field will be populated.
         */
        warnings?: Array<{
            code?: string;
            data?: Array<{
                key?: string;
                value?: string;
            }>;
            message?: string;
        }> | null;
    }
    /**
     * The access controls set on the resource.
     */
    export interface Schema$ResourceAccessControl {
        /**
         * The GCP IAM Policy to set on the resource.
         */
        gcpIamPolicy?: string | null;
    }
    /**
     * A response containing a partial list of resources and a page token used to build the next request if the request has been truncated.
     */
    export interface Schema$ResourcesListResponse {
        /**
         * A token used to continue a truncated list request.
         */
        nextPageToken?: string | null;
        /**
         * Resources contained in this list response.
         */
        resources?: Schema$Resource[];
    }
    export interface Schema$ResourceUpdate {
        /**
         * The Access Control Policy to set on this resource after updating the resource itself.
         */
        accessControl?: Schema$ResourceAccessControl;
        /**
         * Output only. If errors are generated during update of the resource, this field will be populated.
         */
        error?: {
            errors?: Array<{
                code?: string;
                location?: string;
                message?: string;
            }>;
        } | null;
        /**
         * Output only. The expanded properties of the resource with reference values expanded. Returned as serialized YAML.
         */
        finalProperties?: string | null;
        /**
         * Output only. The intent of the resource: `PREVIEW`, `UPDATE`, or `CANCEL`.
         */
        intent?: string | null;
        /**
         * Output only. URL of the manifest representing the update configuration of this resource.
         */
        manifest?: string | null;
        /**
         * Output only. The set of updated properties for this resource, before references are expanded. Returned as serialized YAML.
         */
        properties?: string | null;
        /**
         * Output only. The state of the resource.
         */
        state?: string | null;
        /**
         * Output only. If warning messages are generated during processing of this resource, this field will be populated.
         */
        warnings?: Array<{
            code?: string;
            data?: Array<{
                key?: string;
                value?: string;
            }>;
            message?: string;
        }> | null;
    }
    /**
     * A rule to be applied in a Policy.
     */
    export interface Schema$Rule {
        /**
         * Required
         */
        action?: string | null;
        /**
         * Additional restrictions that must be met. All conditions must pass for the rule to match.
         */
        conditions?: Schema$Condition[];
        /**
         * Human-readable description of the rule.
         */
        description?: string | null;
        /**
         * If one or more &#39;in&#39; clauses are specified, the rule matches if the PRINCIPAL/AUTHORITY_SELECTOR is in at least one of these entries.
         */
        ins?: string[] | null;
        /**
         * The config returned to callers of tech.iam.IAM.CheckPolicy for any entries that match the LOG action.
         */
        logConfigs?: Schema$LogConfig[];
        /**
         * If one or more &#39;not_in&#39; clauses are specified, the rule matches if the PRINCIPAL/AUTHORITY_SELECTOR is in none of the entries.
         */
        notIns?: string[] | null;
        /**
         * A permission is a string of form &#39;..&#39; (e.g., &#39;storage.buckets.list&#39;). A value of &#39;*&#39; matches all permissions, and a verb part of &#39;*&#39; (e.g., &#39;storage.buckets.*&#39;) matches all verbs.
         */
        permissions?: string[] | null;
    }
    export interface Schema$TargetConfiguration {
        /**
         * The configuration to use for this deployment.
         */
        config?: Schema$ConfigFile;
        /**
         * Specifies any files to import for this configuration. This can be used to import templates or other files. For example, you might import a text file in order to use the file in a template.
         */
        imports?: Schema$ImportFile[];
    }
    export interface Schema$TestPermissionsRequest {
        /**
         * The set of permissions to check for the &#39;resource&#39;. Permissions with wildcards (such as &#39;*&#39; or &#39;storage.*&#39;) are not allowed.
         */
        permissions?: string[] | null;
    }
    export interface Schema$TestPermissionsResponse {
        /**
         * A subset of `TestPermissionsRequest.permissions` that the caller is allowed.
         */
        permissions?: string[] | null;
    }
    /**
     * A resource type supported by Deployment Manager.
     */
    export interface Schema$Type {
        id?: string | null;
        /**
         * Output only. Creation timestamp in RFC3339 text format.
         */
        insertTime?: string | null;
        /**
         * Name of the type.
         */
        name?: string | null;
        /**
         * Output only. The Operation that most recently ran, or is currently running, on this type.
         */
        operation?: Schema$Operation;
        /**
         * Output only. Server defined URL for the resource.
         */
        selfLink?: string | null;
    }
    /**
     * A response that returns all Types supported by Deployment Manager
     */
    export interface Schema$TypesListResponse {
        /**
         * A token used to continue a truncated list request.
         */
        nextPageToken?: string | null;
        /**
         * Output only. A list of resource types supported by Deployment Manager.
         */
        types?: Schema$Type[];
    }
    export class Resource$Deployments {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * deploymentmanager.deployments.cancelPreview
         * @desc Cancels and removes the preview currently associated with the deployment.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/deploymentmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const deploymentmanager = google.deploymentmanager('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/ndev.cloudman',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await deploymentmanager.deployments.cancelPreview({
         *     // The name of the deployment for this request.
         *     deployment: '[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?',
         *     // The project ID for this request.
         *     project:
         *       '(?:(?:[-a-z0-9]{1,63}.)*(?:[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?):)?(?:[0-9]{1,19}|(?:[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?))',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "fingerprint": "my_fingerprint"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "clientOperationId": "my_clientOperationId",
         *   //   "creationTimestamp": "my_creationTimestamp",
         *   //   "description": "my_description",
         *   //   "endTime": "my_endTime",
         *   //   "error": {},
         *   //   "httpErrorMessage": "my_httpErrorMessage",
         *   //   "httpErrorStatusCode": 0,
         *   //   "id": "my_id",
         *   //   "insertTime": "my_insertTime",
         *   //   "kind": "my_kind",
         *   //   "name": "my_name",
         *   //   "operationType": "my_operationType",
         *   //   "progress": 0,
         *   //   "region": "my_region",
         *   //   "selfLink": "my_selfLink",
         *   //   "startTime": "my_startTime",
         *   //   "status": "my_status",
         *   //   "statusMessage": "my_statusMessage",
         *   //   "targetId": "my_targetId",
         *   //   "targetLink": "my_targetLink",
         *   //   "user": "my_user",
         *   //   "warnings": [],
         *   //   "zone": "my_zone"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias deploymentmanager.deployments.cancelPreview
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.deployment The name of the deployment for this request.
         * @param {string} params.project The project ID for this request.
         * @param {().DeploymentsCancelPreviewRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        cancelPreview(params: Params$Resource$Deployments$Cancelpreview, options: StreamMethodOptions): GaxiosPromise<Readable>;
        cancelPreview(params?: Params$Resource$Deployments$Cancelpreview, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        cancelPreview(params: Params$Resource$Deployments$Cancelpreview, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        cancelPreview(params: Params$Resource$Deployments$Cancelpreview, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        cancelPreview(params: Params$Resource$Deployments$Cancelpreview, callback: BodyResponseCallback<Schema$Operation>): void;
        cancelPreview(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * deploymentmanager.deployments.delete
         * @desc Deletes a deployment and all of the resources in the deployment.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/deploymentmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const deploymentmanager = google.deploymentmanager('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/ndev.cloudman',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await deploymentmanager.deployments.delete({
         *     // Sets the policy to use for deleting resources.
         *     deletePolicy: 'placeholder-value',
         *     // The name of the deployment for this request.
         *     deployment: 'placeholder-value',
         *     // The project ID for this request.
         *     project:
         *       '(?:(?:[-a-z0-9]{1,63}.)*(?:[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?):)?(?:[0-9]{1,19}|(?:[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?))',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "clientOperationId": "my_clientOperationId",
         *   //   "creationTimestamp": "my_creationTimestamp",
         *   //   "description": "my_description",
         *   //   "endTime": "my_endTime",
         *   //   "error": {},
         *   //   "httpErrorMessage": "my_httpErrorMessage",
         *   //   "httpErrorStatusCode": 0,
         *   //   "id": "my_id",
         *   //   "insertTime": "my_insertTime",
         *   //   "kind": "my_kind",
         *   //   "name": "my_name",
         *   //   "operationType": "my_operationType",
         *   //   "progress": 0,
         *   //   "region": "my_region",
         *   //   "selfLink": "my_selfLink",
         *   //   "startTime": "my_startTime",
         *   //   "status": "my_status",
         *   //   "statusMessage": "my_statusMessage",
         *   //   "targetId": "my_targetId",
         *   //   "targetLink": "my_targetLink",
         *   //   "user": "my_user",
         *   //   "warnings": [],
         *   //   "zone": "my_zone"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias deploymentmanager.deployments.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.deletePolicy Sets the policy to use for deleting resources.
         * @param {string} params.deployment The name of the deployment for this request.
         * @param {string} params.project The project ID for this request.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Deployments$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Deployments$Delete, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        delete(params: Params$Resource$Deployments$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Deployments$Delete, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        delete(params: Params$Resource$Deployments$Delete, callback: BodyResponseCallback<Schema$Operation>): void;
        delete(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * deploymentmanager.deployments.get
         * @desc Gets information about a specific deployment.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/deploymentmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const deploymentmanager = google.deploymentmanager('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/ndev.cloudman',
         *       'https://www.googleapis.com/auth/ndev.cloudman.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await deploymentmanager.deployments.get({
         *     // The name of the deployment for this request.
         *     deployment: '[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?',
         *     // The project ID for this request.
         *     project:
         *       '(?:(?:[-a-z0-9]{1,63}.)*(?:[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?):)?(?:[0-9]{1,19}|(?:[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?))',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "description": "my_description",
         *   //   "fingerprint": "my_fingerprint",
         *   //   "id": "my_id",
         *   //   "insertTime": "my_insertTime",
         *   //   "labels": [],
         *   //   "manifest": "my_manifest",
         *   //   "name": "my_name",
         *   //   "operation": {},
         *   //   "selfLink": "my_selfLink",
         *   //   "target": {},
         *   //   "update": {},
         *   //   "updateTime": "my_updateTime"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias deploymentmanager.deployments.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.deployment The name of the deployment for this request.
         * @param {string} params.project The project ID for this request.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Deployments$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Deployments$Get, options?: MethodOptions): GaxiosPromise<Schema$Deployment>;
        get(params: Params$Resource$Deployments$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Deployments$Get, options: MethodOptions | BodyResponseCallback<Schema$Deployment>, callback: BodyResponseCallback<Schema$Deployment>): void;
        get(params: Params$Resource$Deployments$Get, callback: BodyResponseCallback<Schema$Deployment>): void;
        get(callback: BodyResponseCallback<Schema$Deployment>): void;
        /**
         * deploymentmanager.deployments.getIamPolicy
         * @desc Gets the access control policy for a resource. May be empty if no such policy or resource exists.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/deploymentmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const deploymentmanager = google.deploymentmanager('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/ndev.cloudman',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await deploymentmanager.deployments.getIamPolicy({
         *     // Project ID for this request.
         *     project:
         *       '(?:(?:[-a-z0-9]{1,63}.)*(?:[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?):)?(?:[0-9]{1,19}|(?:[a-z0-9](?:[-a-z0-9]{0,61}[a-z0-9])?))',
         *     // Name or id of the resource for this request.
         *     resource: '[a-z](?:[-a-z0-9_]{0,61}[a-z0-9])?|[1-9][0-9]{0,19}',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "auditConfigs": [],
         *   //   "bindings": [],
         *   //   "etag": "my_etag",
         *   //   "iamOwned": false,
         *   //   "rules": [],
         *   //   "version": 0
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias deploymentmanager.deployments.getIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.project Project ID for this request.
         * @param {string} params.resource_ Name or id of the resource for this request.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getIamPolicy(params: Params$Resource$Deployments$Getiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getIamPolicy(params?: Params$Resource$Deployments$Getiampolicy, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        getIamPolicy(params: Params$Resource$Deployments$Getiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getIamPolicy(params: Params$Resource$Deployments$Getiampolicy, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        getIamPolicy(params: Params$Resource$Deployments$Getiampolicy, callback: BodyResponseCallback<Schema$Policy>): void;
        getIamPolicy(callback: BodyResponseCallback<Schema$Policy>): void;
        /**
         * deploymentmanager.deployments.insert
         * @desc Creates a deployment and all of the resources described by the deployment manifest.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/deploymentmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const deploymentmanager = google.deploymentmanager('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/ndev.cloudman',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await deploymentmanager.deployments.insert({
         *     // Sets the policy to use for creating new resources.
         *     createPolicy: 'placeholder-value',
         *     // If set to true, creates a deployment and creates "shell" resources but does not actually instantiate these resources. This allows you to preview what your deployment looks like. After previewing a deployment, you can deploy your resources by making a request with the `update()` method or you can use the `cancelPreview()` method to cancel the preview altogether. Note that the deployment will still exist after you cancel the preview and you must separately delete this deployment if you want to remove it.
         *     preview: 'placeholder-value',
         *     // The project ID for this request.
         *     project:
         *       '(?:(?:[-a-z0-9]{1,63}.)*(?:[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?):)?(?:[0-9]{1,19}|(?:[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?))',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "description": "my_description",
         *       //   "fingerprint": "my_fingerprint",
         *       //   "id": "my_id",
         *       //   "insertTime": "my_insertTime",
         *       //   "labels": [],
         *       //   "manifest": "my_manifest",
         *       //   "name": "my_name",
         *       //   "operation": {},
         *       //   "selfLink": "my_selfLink",
         *       //   "target": {},
         *       //   "update": {},
         *       //   "updateTime": "my_updateTime"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "clientOperationId": "my_clientOperationId",
         *   //   "creationTimestamp": "my_creationTimestamp",
         *   //   "description": "my_description",
         *   //   "endTime": "my_endTime",
         *   //   "error": {},
         *   //   "httpErrorMessage": "my_httpErrorMessage",
         *   //   "httpErrorStatusCode": 0,
         *   //   "id": "my_id",
         *   //   "insertTime": "my_insertTime",
         *   //   "kind": "my_kind",
         *   //   "name": "my_name",
         *   //   "operationType": "my_operationType",
         *   //   "progress": 0,
         *   //   "region": "my_region",
         *   //   "selfLink": "my_selfLink",
         *   //   "startTime": "my_startTime",
         *   //   "status": "my_status",
         *   //   "statusMessage": "my_statusMessage",
         *   //   "targetId": "my_targetId",
         *   //   "targetLink": "my_targetLink",
         *   //   "user": "my_user",
         *   //   "warnings": [],
         *   //   "zone": "my_zone"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias deploymentmanager.deployments.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.createPolicy Sets the policy to use for creating new resources.
         * @param {boolean=} params.preview If set to true, creates a deployment and creates "shell" resources but does not actually instantiate these resources. This allows you to preview what your deployment looks like. After previewing a deployment, you can deploy your resources by making a request with the `update()` method or you can use the `cancelPreview()` method to cancel the preview altogether. Note that the deployment will still exist after you cancel the preview and you must separately delete this deployment if you want to remove it.
         * @param {string} params.project The project ID for this request.
         * @param {().Deployment} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Deployments$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Deployments$Insert, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        insert(params: Params$Resource$Deployments$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Deployments$Insert, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        insert(params: Params$Resource$Deployments$Insert, callback: BodyResponseCallback<Schema$Operation>): void;
        insert(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * deploymentmanager.deployments.list
         * @desc Lists all deployments for a given project.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/deploymentmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const deploymentmanager = google.deploymentmanager('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/ndev.cloudman',
         *       'https://www.googleapis.com/auth/ndev.cloudman.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await deploymentmanager.deployments.list({
         *     // A filter expression that filters resources listed in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be either `=`, `!=`, `>`, or `<`.
         *     //
         *     // For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`.
         *     //
         *     // You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based on resource labels.
         *     //
         *     // To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) ```
         *     filter: 'placeholder-value',
         *     // The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`)
         *     maxResults: 'placeholder-value',
         *     // Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name.
         *     //
         *     // You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first.
         *     //
         *     // Currently, only sorting by `name` or `creationTimestamp desc` is supported.
         *     orderBy: 'placeholder-value',
         *     // Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results.
         *     pageToken: 'placeholder-value',
         *     // The project ID for this request.
         *     project:
         *       '(?:(?:[-a-z0-9]{1,63}.)*(?:[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?):)?(?:[0-9]{1,19}|(?:[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?))',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "deployments": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias deploymentmanager.deployments.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.filter A filter expression that filters resources listed in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be either `=`, `!=`, `>`, or `<`.  For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`.  You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based on resource labels.  To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) ```
         * @param {integer=} params.maxResults The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`)
         * @param {string=} params.orderBy Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name.  You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first.  Currently, only sorting by `name` or `creationTimestamp desc` is supported.
         * @param {string=} params.pageToken Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results.
         * @param {string} params.project The project ID for this request.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Deployments$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Deployments$List, options?: MethodOptions): GaxiosPromise<Schema$DeploymentsListResponse>;
        list(params: Params$Resource$Deployments$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Deployments$List, options: MethodOptions | BodyResponseCallback<Schema$DeploymentsListResponse>, callback: BodyResponseCallback<Schema$DeploymentsListResponse>): void;
        list(params: Params$Resource$Deployments$List, callback: BodyResponseCallback<Schema$DeploymentsListResponse>): void;
        list(callback: BodyResponseCallback<Schema$DeploymentsListResponse>): void;
        /**
         * deploymentmanager.deployments.patch
         * @desc Patches a deployment and all of the resources described by the deployment manifest.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/deploymentmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const deploymentmanager = google.deploymentmanager('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/ndev.cloudman',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await deploymentmanager.deployments.patch({
         *     // Sets the policy to use for creating new resources.
         *     createPolicy: 'placeholder-value',
         *     // Sets the policy to use for deleting resources.
         *     deletePolicy: 'placeholder-value',
         *     // The name of the deployment for this request.
         *     deployment: '[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?',
         *     // If set to true, updates the deployment and creates and updates the "shell" resources but does not actually alter or instantiate these resources. This allows you to preview what your deployment will look like. You can use this intent to preview how an update would affect your deployment. You must provide a `target.config` with a configuration if this is set to true. After previewing a deployment, you can deploy your resources by making a request with the `update()` or you can `cancelPreview()` to remove the preview altogether. Note that the deployment will still exist after you cancel the preview and you must separately delete this deployment if you want to remove it.
         *     preview: 'placeholder-value',
         *     // The project ID for this request.
         *     project:
         *       '(?:(?:[-a-z0-9]{1,63}.)*(?:[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?):)?(?:[0-9]{1,19}|(?:[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?))',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "description": "my_description",
         *       //   "fingerprint": "my_fingerprint",
         *       //   "id": "my_id",
         *       //   "insertTime": "my_insertTime",
         *       //   "labels": [],
         *       //   "manifest": "my_manifest",
         *       //   "name": "my_name",
         *       //   "operation": {},
         *       //   "selfLink": "my_selfLink",
         *       //   "target": {},
         *       //   "update": {},
         *       //   "updateTime": "my_updateTime"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "clientOperationId": "my_clientOperationId",
         *   //   "creationTimestamp": "my_creationTimestamp",
         *   //   "description": "my_description",
         *   //   "endTime": "my_endTime",
         *   //   "error": {},
         *   //   "httpErrorMessage": "my_httpErrorMessage",
         *   //   "httpErrorStatusCode": 0,
         *   //   "id": "my_id",
         *   //   "insertTime": "my_insertTime",
         *   //   "kind": "my_kind",
         *   //   "name": "my_name",
         *   //   "operationType": "my_operationType",
         *   //   "progress": 0,
         *   //   "region": "my_region",
         *   //   "selfLink": "my_selfLink",
         *   //   "startTime": "my_startTime",
         *   //   "status": "my_status",
         *   //   "statusMessage": "my_statusMessage",
         *   //   "targetId": "my_targetId",
         *   //   "targetLink": "my_targetLink",
         *   //   "user": "my_user",
         *   //   "warnings": [],
         *   //   "zone": "my_zone"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias deploymentmanager.deployments.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.createPolicy Sets the policy to use for creating new resources.
         * @param {string=} params.deletePolicy Sets the policy to use for deleting resources.
         * @param {string} params.deployment The name of the deployment for this request.
         * @param {boolean=} params.preview If set to true, updates the deployment and creates and updates the "shell" resources but does not actually alter or instantiate these resources. This allows you to preview what your deployment will look like. You can use this intent to preview how an update would affect your deployment. You must provide a `target.config` with a configuration if this is set to true. After previewing a deployment, you can deploy your resources by making a request with the `update()` or you can `cancelPreview()` to remove the preview altogether. Note that the deployment will still exist after you cancel the preview and you must separately delete this deployment if you want to remove it.
         * @param {string} params.project The project ID for this request.
         * @param {().Deployment} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Deployments$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Deployments$Patch, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        patch(params: Params$Resource$Deployments$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Deployments$Patch, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        patch(params: Params$Resource$Deployments$Patch, callback: BodyResponseCallback<Schema$Operation>): void;
        patch(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * deploymentmanager.deployments.setIamPolicy
         * @desc Sets the access control policy on the specified resource. Replaces any existing policy.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/deploymentmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const deploymentmanager = google.deploymentmanager('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/ndev.cloudman',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await deploymentmanager.deployments.setIamPolicy({
         *     // Project ID for this request.
         *     project:
         *       '(?:(?:[-a-z0-9]{1,63}.)*(?:[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?):)?(?:[0-9]{1,19}|(?:[a-z0-9](?:[-a-z0-9]{0,61}[a-z0-9])?))',
         *     // Name or id of the resource for this request.
         *     resource: '[a-z](?:[-a-z0-9_]{0,61}[a-z0-9])?|[1-9][0-9]{0,19}',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "bindings": [],
         *       //   "etag": "my_etag",
         *       //   "policy": {}
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
         *   //   "iamOwned": false,
         *   //   "rules": [],
         *   //   "version": 0
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias deploymentmanager.deployments.setIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.project Project ID for this request.
         * @param {string} params.resource_ Name or id of the resource for this request.
         * @param {().GlobalSetPolicyRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        setIamPolicy(params: Params$Resource$Deployments$Setiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        setIamPolicy(params?: Params$Resource$Deployments$Setiampolicy, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        setIamPolicy(params: Params$Resource$Deployments$Setiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        setIamPolicy(params: Params$Resource$Deployments$Setiampolicy, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        setIamPolicy(params: Params$Resource$Deployments$Setiampolicy, callback: BodyResponseCallback<Schema$Policy>): void;
        setIamPolicy(callback: BodyResponseCallback<Schema$Policy>): void;
        /**
         * deploymentmanager.deployments.stop
         * @desc Stops an ongoing operation. This does not roll back any work that has already been completed, but prevents any new work from being started.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/deploymentmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const deploymentmanager = google.deploymentmanager('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/ndev.cloudman',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await deploymentmanager.deployments.stop({
         *     // The name of the deployment for this request.
         *     deployment: '[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?',
         *     // The project ID for this request.
         *     project:
         *       '(?:(?:[-a-z0-9]{1,63}.)*(?:[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?):)?(?:[0-9]{1,19}|(?:[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?))',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "fingerprint": "my_fingerprint"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "clientOperationId": "my_clientOperationId",
         *   //   "creationTimestamp": "my_creationTimestamp",
         *   //   "description": "my_description",
         *   //   "endTime": "my_endTime",
         *   //   "error": {},
         *   //   "httpErrorMessage": "my_httpErrorMessage",
         *   //   "httpErrorStatusCode": 0,
         *   //   "id": "my_id",
         *   //   "insertTime": "my_insertTime",
         *   //   "kind": "my_kind",
         *   //   "name": "my_name",
         *   //   "operationType": "my_operationType",
         *   //   "progress": 0,
         *   //   "region": "my_region",
         *   //   "selfLink": "my_selfLink",
         *   //   "startTime": "my_startTime",
         *   //   "status": "my_status",
         *   //   "statusMessage": "my_statusMessage",
         *   //   "targetId": "my_targetId",
         *   //   "targetLink": "my_targetLink",
         *   //   "user": "my_user",
         *   //   "warnings": [],
         *   //   "zone": "my_zone"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias deploymentmanager.deployments.stop
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.deployment The name of the deployment for this request.
         * @param {string} params.project The project ID for this request.
         * @param {().DeploymentsStopRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        stop(params: Params$Resource$Deployments$Stop, options: StreamMethodOptions): GaxiosPromise<Readable>;
        stop(params?: Params$Resource$Deployments$Stop, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        stop(params: Params$Resource$Deployments$Stop, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        stop(params: Params$Resource$Deployments$Stop, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        stop(params: Params$Resource$Deployments$Stop, callback: BodyResponseCallback<Schema$Operation>): void;
        stop(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * deploymentmanager.deployments.testIamPermissions
         * @desc Returns permissions that a caller has on the specified resource.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/deploymentmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const deploymentmanager = google.deploymentmanager('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/ndev.cloudman',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await deploymentmanager.deployments.testIamPermissions({
         *     // Project ID for this request.
         *     project:
         *       '(?:(?:[-a-z0-9]{1,63}.)*(?:[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?):)?(?:[0-9]{1,19}|(?:[a-z0-9](?:[-a-z0-9]{0,61}[a-z0-9])?))',
         *     // Name or id of the resource for this request.
         *     resource: '[a-z](?:[-a-z0-9_]{0,61}[a-z0-9])?|[1-9][0-9]{0,19}',
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
         * @alias deploymentmanager.deployments.testIamPermissions
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.project Project ID for this request.
         * @param {string} params.resource_ Name or id of the resource for this request.
         * @param {().TestPermissionsRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        testIamPermissions(params: Params$Resource$Deployments$Testiampermissions, options: StreamMethodOptions): GaxiosPromise<Readable>;
        testIamPermissions(params?: Params$Resource$Deployments$Testiampermissions, options?: MethodOptions): GaxiosPromise<Schema$TestPermissionsResponse>;
        testIamPermissions(params: Params$Resource$Deployments$Testiampermissions, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        testIamPermissions(params: Params$Resource$Deployments$Testiampermissions, options: MethodOptions | BodyResponseCallback<Schema$TestPermissionsResponse>, callback: BodyResponseCallback<Schema$TestPermissionsResponse>): void;
        testIamPermissions(params: Params$Resource$Deployments$Testiampermissions, callback: BodyResponseCallback<Schema$TestPermissionsResponse>): void;
        testIamPermissions(callback: BodyResponseCallback<Schema$TestPermissionsResponse>): void;
        /**
         * deploymentmanager.deployments.update
         * @desc Updates a deployment and all of the resources described by the deployment manifest.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/deploymentmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const deploymentmanager = google.deploymentmanager('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/ndev.cloudman',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await deploymentmanager.deployments.update({
         *     // Sets the policy to use for creating new resources.
         *     createPolicy: 'placeholder-value',
         *     // Sets the policy to use for deleting resources.
         *     deletePolicy: 'placeholder-value',
         *     // The name of the deployment for this request.
         *     deployment: '[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?',
         *     // If set to true, updates the deployment and creates and updates the "shell" resources but does not actually alter or instantiate these resources. This allows you to preview what your deployment will look like. You can use this intent to preview how an update would affect your deployment. You must provide a `target.config` with a configuration if this is set to true. After previewing a deployment, you can deploy your resources by making a request with the `update()` or you can `cancelPreview()` to remove the preview altogether. Note that the deployment will still exist after you cancel the preview and you must separately delete this deployment if you want to remove it.
         *     preview: 'placeholder-value',
         *     // The project ID for this request.
         *     project:
         *       '(?:(?:[-a-z0-9]{1,63}.)*(?:[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?):)?(?:[0-9]{1,19}|(?:[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?))',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "description": "my_description",
         *       //   "fingerprint": "my_fingerprint",
         *       //   "id": "my_id",
         *       //   "insertTime": "my_insertTime",
         *       //   "labels": [],
         *       //   "manifest": "my_manifest",
         *       //   "name": "my_name",
         *       //   "operation": {},
         *       //   "selfLink": "my_selfLink",
         *       //   "target": {},
         *       //   "update": {},
         *       //   "updateTime": "my_updateTime"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "clientOperationId": "my_clientOperationId",
         *   //   "creationTimestamp": "my_creationTimestamp",
         *   //   "description": "my_description",
         *   //   "endTime": "my_endTime",
         *   //   "error": {},
         *   //   "httpErrorMessage": "my_httpErrorMessage",
         *   //   "httpErrorStatusCode": 0,
         *   //   "id": "my_id",
         *   //   "insertTime": "my_insertTime",
         *   //   "kind": "my_kind",
         *   //   "name": "my_name",
         *   //   "operationType": "my_operationType",
         *   //   "progress": 0,
         *   //   "region": "my_region",
         *   //   "selfLink": "my_selfLink",
         *   //   "startTime": "my_startTime",
         *   //   "status": "my_status",
         *   //   "statusMessage": "my_statusMessage",
         *   //   "targetId": "my_targetId",
         *   //   "targetLink": "my_targetLink",
         *   //   "user": "my_user",
         *   //   "warnings": [],
         *   //   "zone": "my_zone"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias deploymentmanager.deployments.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.createPolicy Sets the policy to use for creating new resources.
         * @param {string=} params.deletePolicy Sets the policy to use for deleting resources.
         * @param {string} params.deployment The name of the deployment for this request.
         * @param {boolean=} params.preview If set to true, updates the deployment and creates and updates the "shell" resources but does not actually alter or instantiate these resources. This allows you to preview what your deployment will look like. You can use this intent to preview how an update would affect your deployment. You must provide a `target.config` with a configuration if this is set to true. After previewing a deployment, you can deploy your resources by making a request with the `update()` or you can `cancelPreview()` to remove the preview altogether. Note that the deployment will still exist after you cancel the preview and you must separately delete this deployment if you want to remove it.
         * @param {string} params.project The project ID for this request.
         * @param {().Deployment} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Deployments$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Deployments$Update, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        update(params: Params$Resource$Deployments$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Deployments$Update, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        update(params: Params$Resource$Deployments$Update, callback: BodyResponseCallback<Schema$Operation>): void;
        update(callback: BodyResponseCallback<Schema$Operation>): void;
    }
    export interface Params$Resource$Deployments$Cancelpreview extends StandardParameters {
        /**
         * The name of the deployment for this request.
         */
        deployment?: string;
        /**
         * The project ID for this request.
         */
        project?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$DeploymentsCancelPreviewRequest;
    }
    export interface Params$Resource$Deployments$Delete extends StandardParameters {
        /**
         * Sets the policy to use for deleting resources.
         */
        deletePolicy?: string;
        /**
         * The name of the deployment for this request.
         */
        deployment?: string;
        /**
         * The project ID for this request.
         */
        project?: string;
    }
    export interface Params$Resource$Deployments$Get extends StandardParameters {
        /**
         * The name of the deployment for this request.
         */
        deployment?: string;
        /**
         * The project ID for this request.
         */
        project?: string;
    }
    export interface Params$Resource$Deployments$Getiampolicy extends StandardParameters {
        /**
         * Project ID for this request.
         */
        project?: string;
        /**
         * Name or id of the resource for this request.
         */
        resource?: string;
    }
    export interface Params$Resource$Deployments$Insert extends StandardParameters {
        /**
         * Sets the policy to use for creating new resources.
         */
        createPolicy?: string;
        /**
         * If set to true, creates a deployment and creates "shell" resources but does not actually instantiate these resources. This allows you to preview what your deployment looks like. After previewing a deployment, you can deploy your resources by making a request with the `update()` method or you can use the `cancelPreview()` method to cancel the preview altogether. Note that the deployment will still exist after you cancel the preview and you must separately delete this deployment if you want to remove it.
         */
        preview?: boolean;
        /**
         * The project ID for this request.
         */
        project?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Deployment;
    }
    export interface Params$Resource$Deployments$List extends StandardParameters {
        /**
         * A filter expression that filters resources listed in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be either `=`, `!=`, `>`, or `<`.  For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`.  You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based on resource labels.  To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) ```
         */
        filter?: string;
        /**
         * The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`)
         */
        maxResults?: number;
        /**
         * Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name.  You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first.  Currently, only sorting by `name` or `creationTimestamp desc` is supported.
         */
        orderBy?: string;
        /**
         * Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results.
         */
        pageToken?: string;
        /**
         * The project ID for this request.
         */
        project?: string;
    }
    export interface Params$Resource$Deployments$Patch extends StandardParameters {
        /**
         * Sets the policy to use for creating new resources.
         */
        createPolicy?: string;
        /**
         * Sets the policy to use for deleting resources.
         */
        deletePolicy?: string;
        /**
         * The name of the deployment for this request.
         */
        deployment?: string;
        /**
         * If set to true, updates the deployment and creates and updates the "shell" resources but does not actually alter or instantiate these resources. This allows you to preview what your deployment will look like. You can use this intent to preview how an update would affect your deployment. You must provide a `target.config` with a configuration if this is set to true. After previewing a deployment, you can deploy your resources by making a request with the `update()` or you can `cancelPreview()` to remove the preview altogether. Note that the deployment will still exist after you cancel the preview and you must separately delete this deployment if you want to remove it.
         */
        preview?: boolean;
        /**
         * The project ID for this request.
         */
        project?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Deployment;
    }
    export interface Params$Resource$Deployments$Setiampolicy extends StandardParameters {
        /**
         * Project ID for this request.
         */
        project?: string;
        /**
         * Name or id of the resource for this request.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$GlobalSetPolicyRequest;
    }
    export interface Params$Resource$Deployments$Stop extends StandardParameters {
        /**
         * The name of the deployment for this request.
         */
        deployment?: string;
        /**
         * The project ID for this request.
         */
        project?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$DeploymentsStopRequest;
    }
    export interface Params$Resource$Deployments$Testiampermissions extends StandardParameters {
        /**
         * Project ID for this request.
         */
        project?: string;
        /**
         * Name or id of the resource for this request.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$TestPermissionsRequest;
    }
    export interface Params$Resource$Deployments$Update extends StandardParameters {
        /**
         * Sets the policy to use for creating new resources.
         */
        createPolicy?: string;
        /**
         * Sets the policy to use for deleting resources.
         */
        deletePolicy?: string;
        /**
         * The name of the deployment for this request.
         */
        deployment?: string;
        /**
         * If set to true, updates the deployment and creates and updates the "shell" resources but does not actually alter or instantiate these resources. This allows you to preview what your deployment will look like. You can use this intent to preview how an update would affect your deployment. You must provide a `target.config` with a configuration if this is set to true. After previewing a deployment, you can deploy your resources by making a request with the `update()` or you can `cancelPreview()` to remove the preview altogether. Note that the deployment will still exist after you cancel the preview and you must separately delete this deployment if you want to remove it.
         */
        preview?: boolean;
        /**
         * The project ID for this request.
         */
        project?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Deployment;
    }
    export class Resource$Manifests {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * deploymentmanager.manifests.get
         * @desc Gets information about a specific manifest.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/deploymentmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const deploymentmanager = google.deploymentmanager('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/ndev.cloudman',
         *       'https://www.googleapis.com/auth/ndev.cloudman.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await deploymentmanager.manifests.get({
         *     // The name of the deployment for this request.
         *     deployment: '[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?',
         *     // The name of the manifest for this request.
         *     manifest: '[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?',
         *     // The project ID for this request.
         *     project:
         *       '(?:(?:[-a-z0-9]{1,63}.)*(?:[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?):)?(?:[0-9]{1,19}|(?:[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?))',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "config": {},
         *   //   "expandedConfig": "my_expandedConfig",
         *   //   "id": "my_id",
         *   //   "imports": [],
         *   //   "insertTime": "my_insertTime",
         *   //   "layout": "my_layout",
         *   //   "name": "my_name",
         *   //   "selfLink": "my_selfLink"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias deploymentmanager.manifests.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.deployment The name of the deployment for this request.
         * @param {string} params.manifest The name of the manifest for this request.
         * @param {string} params.project The project ID for this request.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Manifests$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Manifests$Get, options?: MethodOptions): GaxiosPromise<Schema$Manifest>;
        get(params: Params$Resource$Manifests$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Manifests$Get, options: MethodOptions | BodyResponseCallback<Schema$Manifest>, callback: BodyResponseCallback<Schema$Manifest>): void;
        get(params: Params$Resource$Manifests$Get, callback: BodyResponseCallback<Schema$Manifest>): void;
        get(callback: BodyResponseCallback<Schema$Manifest>): void;
        /**
         * deploymentmanager.manifests.list
         * @desc Lists all manifests for a given deployment.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/deploymentmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const deploymentmanager = google.deploymentmanager('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/ndev.cloudman',
         *       'https://www.googleapis.com/auth/ndev.cloudman.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await deploymentmanager.manifests.list({
         *     // The name of the deployment for this request.
         *     deployment: '[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?',
         *     // A filter expression that filters resources listed in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be either `=`, `!=`, `>`, or `<`.
         *     //
         *     // For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`.
         *     //
         *     // You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based on resource labels.
         *     //
         *     // To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) ```
         *     filter: 'placeholder-value',
         *     // The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`)
         *     maxResults: 'placeholder-value',
         *     // Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name.
         *     //
         *     // You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first.
         *     //
         *     // Currently, only sorting by `name` or `creationTimestamp desc` is supported.
         *     orderBy: 'placeholder-value',
         *     // Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results.
         *     pageToken: 'placeholder-value',
         *     // The project ID for this request.
         *     project:
         *       '(?:(?:[-a-z0-9]{1,63}.)*(?:[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?):)?(?:[0-9]{1,19}|(?:[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?))',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "manifests": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias deploymentmanager.manifests.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.deployment The name of the deployment for this request.
         * @param {string=} params.filter A filter expression that filters resources listed in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be either `=`, `!=`, `>`, or `<`.  For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`.  You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based on resource labels.  To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) ```
         * @param {integer=} params.maxResults The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`)
         * @param {string=} params.orderBy Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name.  You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first.  Currently, only sorting by `name` or `creationTimestamp desc` is supported.
         * @param {string=} params.pageToken Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results.
         * @param {string} params.project The project ID for this request.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Manifests$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Manifests$List, options?: MethodOptions): GaxiosPromise<Schema$ManifestsListResponse>;
        list(params: Params$Resource$Manifests$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Manifests$List, options: MethodOptions | BodyResponseCallback<Schema$ManifestsListResponse>, callback: BodyResponseCallback<Schema$ManifestsListResponse>): void;
        list(params: Params$Resource$Manifests$List, callback: BodyResponseCallback<Schema$ManifestsListResponse>): void;
        list(callback: BodyResponseCallback<Schema$ManifestsListResponse>): void;
    }
    export interface Params$Resource$Manifests$Get extends StandardParameters {
        /**
         * The name of the deployment for this request.
         */
        deployment?: string;
        /**
         * The name of the manifest for this request.
         */
        manifest?: string;
        /**
         * The project ID for this request.
         */
        project?: string;
    }
    export interface Params$Resource$Manifests$List extends StandardParameters {
        /**
         * The name of the deployment for this request.
         */
        deployment?: string;
        /**
         * A filter expression that filters resources listed in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be either `=`, `!=`, `>`, or `<`.  For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`.  You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based on resource labels.  To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) ```
         */
        filter?: string;
        /**
         * The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`)
         */
        maxResults?: number;
        /**
         * Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name.  You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first.  Currently, only sorting by `name` or `creationTimestamp desc` is supported.
         */
        orderBy?: string;
        /**
         * Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results.
         */
        pageToken?: string;
        /**
         * The project ID for this request.
         */
        project?: string;
    }
    export class Resource$Operations {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * deploymentmanager.operations.get
         * @desc Gets information about a specific operation.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/deploymentmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const deploymentmanager = google.deploymentmanager('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/ndev.cloudman',
         *       'https://www.googleapis.com/auth/ndev.cloudman.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await deploymentmanager.operations.get({
         *     // The name of the operation for this request.
         *     operation: 'placeholder-value',
         *     // The project ID for this request.
         *     project:
         *       '(?:(?:[-a-z0-9]{1,63}.)*(?:[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?):)?(?:[0-9]{1,19}|(?:[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?))',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "clientOperationId": "my_clientOperationId",
         *   //   "creationTimestamp": "my_creationTimestamp",
         *   //   "description": "my_description",
         *   //   "endTime": "my_endTime",
         *   //   "error": {},
         *   //   "httpErrorMessage": "my_httpErrorMessage",
         *   //   "httpErrorStatusCode": 0,
         *   //   "id": "my_id",
         *   //   "insertTime": "my_insertTime",
         *   //   "kind": "my_kind",
         *   //   "name": "my_name",
         *   //   "operationType": "my_operationType",
         *   //   "progress": 0,
         *   //   "region": "my_region",
         *   //   "selfLink": "my_selfLink",
         *   //   "startTime": "my_startTime",
         *   //   "status": "my_status",
         *   //   "statusMessage": "my_statusMessage",
         *   //   "targetId": "my_targetId",
         *   //   "targetLink": "my_targetLink",
         *   //   "user": "my_user",
         *   //   "warnings": [],
         *   //   "zone": "my_zone"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias deploymentmanager.operations.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.operation The name of the operation for this request.
         * @param {string} params.project The project ID for this request.
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
         * deploymentmanager.operations.list
         * @desc Lists all operations for a project.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/deploymentmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const deploymentmanager = google.deploymentmanager('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/ndev.cloudman',
         *       'https://www.googleapis.com/auth/ndev.cloudman.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await deploymentmanager.operations.list({
         *     // A filter expression that filters resources listed in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be either `=`, `!=`, `>`, or `<`.
         *     //
         *     // For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`.
         *     //
         *     // You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based on resource labels.
         *     //
         *     // To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) ```
         *     filter: 'placeholder-value',
         *     // The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`)
         *     maxResults: 'placeholder-value',
         *     // Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name.
         *     //
         *     // You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first.
         *     //
         *     // Currently, only sorting by `name` or `creationTimestamp desc` is supported.
         *     orderBy: 'placeholder-value',
         *     // Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results.
         *     pageToken: 'placeholder-value',
         *     // The project ID for this request.
         *     project:
         *       '(?:(?:[-a-z0-9]{1,63}.)*(?:[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?):)?(?:[0-9]{1,19}|(?:[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?))',
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
         * @alias deploymentmanager.operations.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.filter A filter expression that filters resources listed in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be either `=`, `!=`, `>`, or `<`.  For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`.  You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based on resource labels.  To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) ```
         * @param {integer=} params.maxResults The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`)
         * @param {string=} params.orderBy Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name.  You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first.  Currently, only sorting by `name` or `creationTimestamp desc` is supported.
         * @param {string=} params.pageToken Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results.
         * @param {string} params.project The project ID for this request.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Operations$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Operations$List, options?: MethodOptions): GaxiosPromise<Schema$OperationsListResponse>;
        list(params: Params$Resource$Operations$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Operations$List, options: MethodOptions | BodyResponseCallback<Schema$OperationsListResponse>, callback: BodyResponseCallback<Schema$OperationsListResponse>): void;
        list(params: Params$Resource$Operations$List, callback: BodyResponseCallback<Schema$OperationsListResponse>): void;
        list(callback: BodyResponseCallback<Schema$OperationsListResponse>): void;
    }
    export interface Params$Resource$Operations$Get extends StandardParameters {
        /**
         * The name of the operation for this request.
         */
        operation?: string;
        /**
         * The project ID for this request.
         */
        project?: string;
    }
    export interface Params$Resource$Operations$List extends StandardParameters {
        /**
         * A filter expression that filters resources listed in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be either `=`, `!=`, `>`, or `<`.  For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`.  You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based on resource labels.  To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) ```
         */
        filter?: string;
        /**
         * The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`)
         */
        maxResults?: number;
        /**
         * Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name.  You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first.  Currently, only sorting by `name` or `creationTimestamp desc` is supported.
         */
        orderBy?: string;
        /**
         * Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results.
         */
        pageToken?: string;
        /**
         * The project ID for this request.
         */
        project?: string;
    }
    export class Resource$Resources {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * deploymentmanager.resources.get
         * @desc Gets information about a single resource.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/deploymentmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const deploymentmanager = google.deploymentmanager('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/ndev.cloudman',
         *       'https://www.googleapis.com/auth/ndev.cloudman.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await deploymentmanager.resources.get({
         *     // The name of the deployment for this request.
         *     deployment: '[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?',
         *     // The project ID for this request.
         *     project:
         *       '(?:(?:[-a-z0-9]{1,63}.)*(?:[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?):)?(?:[0-9]{1,19}|(?:[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?))',
         *     // The name of the resource for this request.
         *     resource: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "accessControl": {},
         *   //   "finalProperties": "my_finalProperties",
         *   //   "id": "my_id",
         *   //   "insertTime": "my_insertTime",
         *   //   "manifest": "my_manifest",
         *   //   "name": "my_name",
         *   //   "properties": "my_properties",
         *   //   "type": "my_type",
         *   //   "update": {},
         *   //   "updateTime": "my_updateTime",
         *   //   "url": "my_url",
         *   //   "warnings": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias deploymentmanager.resources.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.deployment The name of the deployment for this request.
         * @param {string} params.project The project ID for this request.
         * @param {string} params.resource_ The name of the resource for this request.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Resources$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Resources$Get, options?: MethodOptions): GaxiosPromise<Schema$Resource>;
        get(params: Params$Resource$Resources$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Resources$Get, options: MethodOptions | BodyResponseCallback<Schema$Resource>, callback: BodyResponseCallback<Schema$Resource>): void;
        get(params: Params$Resource$Resources$Get, callback: BodyResponseCallback<Schema$Resource>): void;
        get(callback: BodyResponseCallback<Schema$Resource>): void;
        /**
         * deploymentmanager.resources.list
         * @desc Lists all resources in a given deployment.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/deploymentmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const deploymentmanager = google.deploymentmanager('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/ndev.cloudman',
         *       'https://www.googleapis.com/auth/ndev.cloudman.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await deploymentmanager.resources.list({
         *     // The name of the deployment for this request.
         *     deployment: '[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?',
         *     // A filter expression that filters resources listed in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be either `=`, `!=`, `>`, or `<`.
         *     //
         *     // For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`.
         *     //
         *     // You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based on resource labels.
         *     //
         *     // To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) ```
         *     filter: 'placeholder-value',
         *     // The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`)
         *     maxResults: 'placeholder-value',
         *     // Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name.
         *     //
         *     // You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first.
         *     //
         *     // Currently, only sorting by `name` or `creationTimestamp desc` is supported.
         *     orderBy: 'placeholder-value',
         *     // Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results.
         *     pageToken: 'placeholder-value',
         *     // The project ID for this request.
         *     project:
         *       '(?:(?:[-a-z0-9]{1,63}.)*(?:[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?):)?(?:[0-9]{1,19}|(?:[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?))',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "resources": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias deploymentmanager.resources.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.deployment The name of the deployment for this request.
         * @param {string=} params.filter A filter expression that filters resources listed in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be either `=`, `!=`, `>`, or `<`.  For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`.  You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based on resource labels.  To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) ```
         * @param {integer=} params.maxResults The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`)
         * @param {string=} params.orderBy Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name.  You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first.  Currently, only sorting by `name` or `creationTimestamp desc` is supported.
         * @param {string=} params.pageToken Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results.
         * @param {string} params.project The project ID for this request.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Resources$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Resources$List, options?: MethodOptions): GaxiosPromise<Schema$ResourcesListResponse>;
        list(params: Params$Resource$Resources$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Resources$List, options: MethodOptions | BodyResponseCallback<Schema$ResourcesListResponse>, callback: BodyResponseCallback<Schema$ResourcesListResponse>): void;
        list(params: Params$Resource$Resources$List, callback: BodyResponseCallback<Schema$ResourcesListResponse>): void;
        list(callback: BodyResponseCallback<Schema$ResourcesListResponse>): void;
    }
    export interface Params$Resource$Resources$Get extends StandardParameters {
        /**
         * The name of the deployment for this request.
         */
        deployment?: string;
        /**
         * The project ID for this request.
         */
        project?: string;
        /**
         * The name of the resource for this request.
         */
        resource?: string;
    }
    export interface Params$Resource$Resources$List extends StandardParameters {
        /**
         * The name of the deployment for this request.
         */
        deployment?: string;
        /**
         * A filter expression that filters resources listed in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be either `=`, `!=`, `>`, or `<`.  For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`.  You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based on resource labels.  To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) ```
         */
        filter?: string;
        /**
         * The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`)
         */
        maxResults?: number;
        /**
         * Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name.  You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first.  Currently, only sorting by `name` or `creationTimestamp desc` is supported.
         */
        orderBy?: string;
        /**
         * Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results.
         */
        pageToken?: string;
        /**
         * The project ID for this request.
         */
        project?: string;
    }
    export class Resource$Types {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * deploymentmanager.types.list
         * @desc Lists all resource types for Deployment Manager.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/deploymentmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const deploymentmanager = google.deploymentmanager('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/ndev.cloudman',
         *       'https://www.googleapis.com/auth/ndev.cloudman.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await deploymentmanager.types.list({
         *     // A filter expression that filters resources listed in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be either `=`, `!=`, `>`, or `<`.
         *     //
         *     // For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`.
         *     //
         *     // You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based on resource labels.
         *     //
         *     // To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) ```
         *     filter: 'placeholder-value',
         *     // The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`)
         *     maxResults: 'placeholder-value',
         *     // Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name.
         *     //
         *     // You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first.
         *     //
         *     // Currently, only sorting by `name` or `creationTimestamp desc` is supported.
         *     orderBy: 'placeholder-value',
         *     // Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results.
         *     pageToken: 'placeholder-value',
         *     // The project ID for this request.
         *     project:
         *       '(?:(?:[-a-z0-9]{1,63}.)*(?:[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?):)?(?:[0-9]{1,19}|(?:[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?))',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "types": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias deploymentmanager.types.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.filter A filter expression that filters resources listed in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be either `=`, `!=`, `>`, or `<`.  For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`.  You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based on resource labels.  To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) ```
         * @param {integer=} params.maxResults The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`)
         * @param {string=} params.orderBy Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name.  You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first.  Currently, only sorting by `name` or `creationTimestamp desc` is supported.
         * @param {string=} params.pageToken Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results.
         * @param {string} params.project The project ID for this request.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Types$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Types$List, options?: MethodOptions): GaxiosPromise<Schema$TypesListResponse>;
        list(params: Params$Resource$Types$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Types$List, options: MethodOptions | BodyResponseCallback<Schema$TypesListResponse>, callback: BodyResponseCallback<Schema$TypesListResponse>): void;
        list(params: Params$Resource$Types$List, callback: BodyResponseCallback<Schema$TypesListResponse>): void;
        list(callback: BodyResponseCallback<Schema$TypesListResponse>): void;
    }
    export interface Params$Resource$Types$List extends StandardParameters {
        /**
         * A filter expression that filters resources listed in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be either `=`, `!=`, `>`, or `<`.  For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`.  You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based on resource labels.  To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) ```
         */
        filter?: string;
        /**
         * The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`)
         */
        maxResults?: number;
        /**
         * Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name.  You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first.  Currently, only sorting by `name` or `creationTimestamp desc` is supported.
         */
        orderBy?: string;
        /**
         * Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results.
         */
        pageToken?: string;
        /**
         * The project ID for this request.
         */
        project?: string;
    }
    export {};
}
