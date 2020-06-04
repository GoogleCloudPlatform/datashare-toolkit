/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace iam_v1 {
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
     * Identity and Access Management (IAM) API
     *
     * Manages identity and access control for Google Cloud Platform resources, including the creation of service accounts, which you can use to authenticate to Google and make API calls.
     *
     * @example
     * const {google} = require('googleapis');
     * const iam = google.iam('v1');
     *
     * @namespace iam
     * @type {Function}
     * @version v1
     * @variation v1
     * @param {object=} options Options for Iam
     */
    export class Iam {
        context: APIRequestContext;
        iamPolicies: Resource$Iampolicies;
        organizations: Resource$Organizations;
        permissions: Resource$Permissions;
        projects: Resource$Projects;
        roles: Resource$Roles;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    /**
     * Audit log information specific to Cloud IAM admin APIs. This message is serialized as an `Any` type in the `ServiceData` message of an `AuditLog` message.
     */
    export interface Schema$AdminAuditData {
        /**
         * The permission_delta when when creating or updating a Role.
         */
        permissionDelta?: Schema$PermissionDelta;
    }
    /**
     * Contains information about an auditable service.
     */
    export interface Schema$AuditableService {
        /**
         * Public name of the service. For example, the service name for Cloud IAM is &#39;iam.googleapis.com&#39;.
         */
        name?: string | null;
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
     * Audit log information specific to Cloud IAM. This message is serialized as an `Any` type in the `ServiceData` message of an `AuditLog` message.
     */
    export interface Schema$AuditData {
        /**
         * Policy delta between the original policy and the newly set policy.
         */
        policyDelta?: Schema$PolicyDelta;
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
     * One delta entry for Binding. Each individual change (only one member in each entry) to a binding will be a separate entry.
     */
    export interface Schema$BindingDelta {
        /**
         * The action that was performed on a Binding. Required
         */
        action?: string | null;
        /**
         * The condition that is associated with this binding.
         */
        condition?: Schema$Expr;
        /**
         * A single identity requesting access for a Cloud Platform resource. Follows the same format of Binding.members. Required
         */
        member?: string | null;
        /**
         * Role that is assigned to `members`. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. Required
         */
        role?: string | null;
    }
    /**
     * The request to create a new role.
     */
    export interface Schema$CreateRoleRequest {
        /**
         * The Role resource to create.
         */
        role?: Schema$Role;
        /**
         * The role ID to use for this role.
         */
        roleId?: string | null;
    }
    /**
     * The service account key create request.
     */
    export interface Schema$CreateServiceAccountKeyRequest {
        /**
         * Which type of key and algorithm to use for the key. The default is currently a 2K RSA key.  However this may change in the future.
         */
        keyAlgorithm?: string | null;
        /**
         * The output format of the private key. The default value is `TYPE_GOOGLE_CREDENTIALS_FILE`, which is the Google Credentials File format.
         */
        privateKeyType?: string | null;
    }
    /**
     * The service account create request.
     */
    export interface Schema$CreateServiceAccountRequest {
        /**
         * Required. The account id that is used to generate the service account email address and a stable unique id. It is unique within a project, must be 6-30 characters long, and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])` to comply with RFC1035.
         */
        accountId?: string | null;
        /**
         * The ServiceAccount resource to create. Currently, only the following values are user assignable: `display_name` and `description`.
         */
        serviceAccount?: Schema$ServiceAccount;
    }
    /**
     * The service account disable request.
     */
    export interface Schema$DisableServiceAccountRequest {
    }
    /**
     * A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance:      service Foo {       rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty);     }  The JSON representation for `Empty` is empty JSON object `{}`.
     */
    export interface Schema$Empty {
    }
    /**
     * The service account enable request.
     */
    export interface Schema$EnableServiceAccountRequest {
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
     * The request to lint a Cloud IAM policy object.
     */
    export interface Schema$LintPolicyRequest {
        /**
         * google.iam.v1.Binding.condition object to be linted.
         */
        condition?: Schema$Expr;
        /**
         * The full resource name of the policy this lint request is about.  The name follows the Google Cloud Platform (GCP) resource format. For example, a GCP project with ID `my-project` will be named `//cloudresourcemanager.googleapis.com/projects/my-project`.  The resource name is not used to read the policy instance from the Cloud IAM database. The candidate policy for lint has to be provided in the same request object.
         */
        fullResourceName?: string | null;
    }
    /**
     * The response of a lint operation. An empty response indicates the operation was able to fully execute and no lint issue was found.
     */
    export interface Schema$LintPolicyResponse {
        /**
         * List of lint results sorted by `severity` in descending order.
         */
        lintResults?: Schema$LintResult[];
    }
    /**
     * Structured response of a single validation unit.
     */
    export interface Schema$LintResult {
        /**
         * Human readable debug message associated with the issue.
         */
        debugMessage?: string | null;
        /**
         * The name of the field for which this lint result is about.  For nested messages `field_name` consists of names of the embedded fields separated by period character. The top-level qualifier is the input object to lint in the request. For example, the `field_name` value `condition.expression` identifies a lint result for the `expression` field of the provided condition.
         */
        fieldName?: string | null;
        /**
         * The validation unit level.
         */
        level?: string | null;
        /**
         * 0-based character position of problematic construct within the object identified by `field_name`. Currently, this is populated only for condition expression.
         */
        locationOffset?: number | null;
        /**
         * The validation unit severity.
         */
        severity?: string | null;
        /**
         * The validation unit name, for instance &quot;lintValidationUnits/ConditionComplexityCheck&quot;.
         */
        validationUnitName?: string | null;
    }
    /**
     * The response containing the roles defined under a resource.
     */
    export interface Schema$ListRolesResponse {
        /**
         * To retrieve the next page of results, set `ListRolesRequest.page_token` to this value.
         */
        nextPageToken?: string | null;
        /**
         * The Roles defined on this resource.
         */
        roles?: Schema$Role[];
    }
    /**
     * The service account keys list response.
     */
    export interface Schema$ListServiceAccountKeysResponse {
        /**
         * The public keys for the service account.
         */
        keys?: Schema$ServiceAccountKey[];
    }
    /**
     * The service account list response.
     */
    export interface Schema$ListServiceAccountsResponse {
        /**
         * The list of matching service accounts.
         */
        accounts?: Schema$ServiceAccount[];
        /**
         * To retrieve the next page of results, set ListServiceAccountsRequest.page_token to this value.
         */
        nextPageToken?: string | null;
    }
    /**
     * The patch service account request.
     */
    export interface Schema$PatchServiceAccountRequest {
        serviceAccount?: Schema$ServiceAccount;
        updateMask?: string | null;
    }
    /**
     * A permission which can be included by a role.
     */
    export interface Schema$Permission {
        /**
         * The service API associated with the permission is not enabled.
         */
        apiDisabled?: boolean | null;
        /**
         * The current custom role support level.
         */
        customRolesSupportLevel?: string | null;
        /**
         * A brief description of what this Permission is used for. This permission can ONLY be used in predefined roles.
         */
        description?: string | null;
        /**
         * The name of this Permission.
         */
        name?: string | null;
        onlyInPredefinedRoles?: boolean | null;
        /**
         * The preferred name for this permission. If present, then this permission is an alias of, and equivalent to, the listed primary_permission.
         */
        primaryPermission?: string | null;
        /**
         * The current launch stage of the permission.
         */
        stage?: string | null;
        /**
         * The title of this Permission.
         */
        title?: string | null;
    }
    /**
     * A PermissionDelta message to record the added_permissions and removed_permissions inside a role.
     */
    export interface Schema$PermissionDelta {
        /**
         * Added permissions.
         */
        addedPermissions?: string[] | null;
        /**
         * Removed permissions.
         */
        removedPermissions?: string[] | null;
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
     * The difference delta between two policies.
     */
    export interface Schema$PolicyDelta {
        /**
         * The delta for Bindings between two policies.
         */
        bindingDeltas?: Schema$BindingDelta[];
    }
    /**
     * A request to get the list of auditable services for a resource.
     */
    export interface Schema$QueryAuditableServicesRequest {
        /**
         * Required. The full resource name to query from the list of auditable services.  The name follows the Google Cloud Platform resource format. For example, a Cloud Platform project with id `my-project` will be named `//cloudresourcemanager.googleapis.com/projects/my-project`.
         */
        fullResourceName?: string | null;
    }
    /**
     * A response containing a list of auditable services for a resource.
     */
    export interface Schema$QueryAuditableServicesResponse {
        /**
         * The auditable services for a resource.
         */
        services?: Schema$AuditableService[];
    }
    /**
     * The grantable role query request.
     */
    export interface Schema$QueryGrantableRolesRequest {
        /**
         * Required. The full resource name to query from the list of grantable roles.  The name follows the Google Cloud Platform resource format. For example, a Cloud Platform project with id `my-project` will be named `//cloudresourcemanager.googleapis.com/projects/my-project`.
         */
        fullResourceName?: string | null;
        /**
         * Optional limit on the number of roles to include in the response.
         */
        pageSize?: number | null;
        /**
         * Optional pagination token returned in an earlier QueryGrantableRolesResponse.
         */
        pageToken?: string | null;
        view?: string | null;
    }
    /**
     * The grantable role query response.
     */
    export interface Schema$QueryGrantableRolesResponse {
        /**
         * To retrieve the next page of results, set `QueryGrantableRolesRequest.page_token` to this value.
         */
        nextPageToken?: string | null;
        /**
         * The list of matching roles.
         */
        roles?: Schema$Role[];
    }
    /**
     * A request to get permissions which can be tested on a resource.
     */
    export interface Schema$QueryTestablePermissionsRequest {
        /**
         * Required. The full resource name to query from the list of testable permissions.  The name follows the Google Cloud Platform resource format. For example, a Cloud Platform project with id `my-project` will be named `//cloudresourcemanager.googleapis.com/projects/my-project`.
         */
        fullResourceName?: string | null;
        /**
         * Optional limit on the number of permissions to include in the response.
         */
        pageSize?: number | null;
        /**
         * Optional pagination token returned in an earlier QueryTestablePermissionsRequest.
         */
        pageToken?: string | null;
    }
    /**
     * The response containing permissions which can be tested on a resource.
     */
    export interface Schema$QueryTestablePermissionsResponse {
        /**
         * To retrieve the next page of results, set `QueryTestableRolesRequest.page_token` to this value.
         */
        nextPageToken?: string | null;
        /**
         * The Permissions testable on the requested resource.
         */
        permissions?: Schema$Permission[];
    }
    /**
     * A role in the Identity and Access Management API.
     */
    export interface Schema$Role {
        /**
         * The current deleted state of the role. This field is read only. It will be ignored in calls to CreateRole and UpdateRole.
         */
        deleted?: boolean | null;
        /**
         * Optional. A human-readable description for the role.
         */
        description?: string | null;
        /**
         * Used to perform a consistent read-modify-write.
         */
        etag?: string | null;
        /**
         * The names of the permissions this role grants when bound in an IAM policy.
         */
        includedPermissions?: string[] | null;
        /**
         * The name of the role.  When Role is used in CreateRole, the role name must not be set.  When Role is used in output and other input such as UpdateRole, the role name is the complete path, e.g., roles/logging.viewer for predefined roles and organizations/{ORGANIZATION_ID}/roles/logging.viewer for custom roles.
         */
        name?: string | null;
        /**
         * The current launch stage of the role. If the `ALPHA` launch stage has been selected for a role, the `stage` field will not be included in the returned definition for the role.
         */
        stage?: string | null;
        /**
         * Optional. A human-readable title for the role.  Typically this is limited to 100 UTF-8 bytes.
         */
        title?: string | null;
    }
    /**
     * A service account in the Identity and Access Management API.  To create a service account, specify the `project_id` and the `account_id` for the account.  The `account_id` is unique within the project, and is used to generate the service account email address and a stable `unique_id`.  If the account already exists, the account&#39;s resource name is returned in the format of projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}. The caller can use the name in other methods to access the account.  All other methods can identify the service account using the format `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`. Using `-` as a wildcard for the `PROJECT_ID` will infer the project from the account. The `ACCOUNT` value can be the `email` address or the `unique_id` of the service account.
     */
    export interface Schema$ServiceAccount {
        /**
         * Optional. A user-specified opaque description of the service account. Must be less than or equal to 256 UTF-8 bytes.
         */
        description?: string | null;
        /**
         * @OutputOnly A bool indicate if the service account is disabled. The field is currently in alpha phase.
         */
        disabled?: boolean | null;
        /**
         * Optional. A user-specified name for the service account. Must be less than or equal to 100 UTF-8 bytes.
         */
        displayName?: string | null;
        /**
         * @OutputOnly The email address of the service account.
         */
        email?: string | null;
        /**
         * Optional. Note: `etag` is an inoperable legacy field that is only returned for backwards compatibility.
         */
        etag?: string | null;
        /**
         * The resource name of the service account in the following format: `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`.  Requests using `-` as a wildcard for the `PROJECT_ID` will infer the project from the `account` and the `ACCOUNT` value can be the `email` address or the `unique_id` of the service account.  In responses the resource name will always be in the format `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`.
         */
        name?: string | null;
        /**
         * @OutputOnly The OAuth2 client id for the service account. This is used in conjunction with the OAuth2 clientconfig API to make three legged OAuth2 (3LO) flows to access the data of Google users.
         */
        oauth2ClientId?: string | null;
        /**
         * @OutputOnly The id of the project that owns the service account.
         */
        projectId?: string | null;
        /**
         * @OutputOnly The unique and stable id of the service account.
         */
        uniqueId?: string | null;
    }
    /**
     * Represents a service account key.  A service account has two sets of key-pairs: user-managed, and system-managed.  User-managed key-pairs can be created and deleted by users.  Users are responsible for rotating these keys periodically to ensure security of their service accounts.  Users retain the private key of these key-pairs, and Google retains ONLY the public key.  System-managed keys are automatically rotated by Google, and are used for signing for a maximum of two weeks. The rotation process is probabilistic, and usage of the new key will gradually ramp up and down over the key&#39;s lifetime. We recommend caching the public key set for a service account for no more than 24 hours to ensure you have access to the latest keys.  Public keys for all service accounts are also published at the OAuth2 Service Account API.
     */
    export interface Schema$ServiceAccountKey {
        /**
         * Specifies the algorithm (and possibly key size) for the key.
         */
        keyAlgorithm?: string | null;
        /**
         * The key origin.
         */
        keyOrigin?: string | null;
        /**
         * The key type.
         */
        keyType?: string | null;
        /**
         * The resource name of the service account key in the following format `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}/keys/{key}`.
         */
        name?: string | null;
        /**
         * The private key data. Only provided in `CreateServiceAccountKey` responses. Make sure to keep the private key data secure because it allows for the assertion of the service account identity. When base64 decoded, the private key data can be used to authenticate with Google API client libraries and with &lt;a href=&quot;/sdk/gcloud/reference/auth/activate-service-account&quot;&gt;gcloud auth activate-service-account&lt;/a&gt;.
         */
        privateKeyData?: string | null;
        /**
         * The output format for the private key. Only provided in `CreateServiceAccountKey` responses, not in `GetServiceAccountKey` or `ListServiceAccountKey` responses.  Google never exposes system-managed private keys, and never retains user-managed private keys.
         */
        privateKeyType?: string | null;
        /**
         * The public key data. Only provided in `GetServiceAccountKey` responses.
         */
        publicKeyData?: string | null;
        /**
         * The key can be used after this timestamp.
         */
        validAfterTime?: string | null;
        /**
         * The key can be used before this timestamp. For system-managed key pairs, this timestamp is the end time for the private key signing operation. The public key could still be used for verification for a few hours after this time.
         */
        validBeforeTime?: string | null;
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
     * The service account sign blob request.
     */
    export interface Schema$SignBlobRequest {
        /**
         * Required. The bytes to sign.
         */
        bytesToSign?: string | null;
    }
    /**
     * The service account sign blob response.
     */
    export interface Schema$SignBlobResponse {
        /**
         * The id of the key used to sign the blob.
         */
        keyId?: string | null;
        /**
         * The signed blob.
         */
        signature?: string | null;
    }
    /**
     * The service account sign JWT request.
     */
    export interface Schema$SignJwtRequest {
        /**
         * Required. The JWT payload to sign, a JSON JWT Claim set.
         */
        payload?: string | null;
    }
    /**
     * The service account sign JWT response.
     */
    export interface Schema$SignJwtResponse {
        /**
         * The id of the key used to sign the JWT.
         */
        keyId?: string | null;
        /**
         * The signed JWT.
         */
        signedJwt?: string | null;
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
     * The request to undelete an existing role.
     */
    export interface Schema$UndeleteRoleRequest {
        /**
         * Used to perform a consistent read-modify-write.
         */
        etag?: string | null;
    }
    /**
     * The service account undelete request.
     */
    export interface Schema$UndeleteServiceAccountRequest {
    }
    export interface Schema$UndeleteServiceAccountResponse {
        /**
         * Metadata for the restored service account.
         */
        restoredAccount?: Schema$ServiceAccount;
    }
    /**
     * The service account key upload request.
     */
    export interface Schema$UploadServiceAccountKeyRequest {
        /**
         * A field that allows clients to upload their own public key. If set, use this public key data to create a service account key for given service account. Please note, the expected format for this field is X509_PEM.
         */
        publicKeyData?: string | null;
    }
    export class Resource$Iampolicies {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * iam.iamPolicies.lintPolicy
         * @desc Lints a Cloud IAM policy object or its sub fields. Currently supports google.iam.v1.Binding.condition.  Each lint operation consists of multiple lint validation units. Each unit inspects the input object in regard to a particular linting aspect and issues a google.iam.admin.v1.LintResult disclosing the result.  The set of applicable validation units is determined by the Cloud IAM server and is not configurable.  Regardless of any lint issues or their severities, successful calls to `lintPolicy` return an HTTP 200 OK status code.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/iam.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const iam = google.iam('v1');
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
         *   const res = await iam.iamPolicies.lintPolicy({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "condition": {},
         *       //   "fullResourceName": "my_fullResourceName"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "lintResults": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias iam.iamPolicies.lintPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().LintPolicyRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        lintPolicy(params: Params$Resource$Iampolicies$Lintpolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        lintPolicy(params?: Params$Resource$Iampolicies$Lintpolicy, options?: MethodOptions): GaxiosPromise<Schema$LintPolicyResponse>;
        lintPolicy(params: Params$Resource$Iampolicies$Lintpolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        lintPolicy(params: Params$Resource$Iampolicies$Lintpolicy, options: MethodOptions | BodyResponseCallback<Schema$LintPolicyResponse>, callback: BodyResponseCallback<Schema$LintPolicyResponse>): void;
        lintPolicy(params: Params$Resource$Iampolicies$Lintpolicy, callback: BodyResponseCallback<Schema$LintPolicyResponse>): void;
        lintPolicy(callback: BodyResponseCallback<Schema$LintPolicyResponse>): void;
        /**
         * iam.iamPolicies.queryAuditableServices
         * @desc Returns a list of services that support service level audit logging configuration for the given resource.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/iam.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const iam = google.iam('v1');
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
         *   const res = await iam.iamPolicies.queryAuditableServices({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "fullResourceName": "my_fullResourceName"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "services": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias iam.iamPolicies.queryAuditableServices
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().QueryAuditableServicesRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        queryAuditableServices(params: Params$Resource$Iampolicies$Queryauditableservices, options: StreamMethodOptions): GaxiosPromise<Readable>;
        queryAuditableServices(params?: Params$Resource$Iampolicies$Queryauditableservices, options?: MethodOptions): GaxiosPromise<Schema$QueryAuditableServicesResponse>;
        queryAuditableServices(params: Params$Resource$Iampolicies$Queryauditableservices, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        queryAuditableServices(params: Params$Resource$Iampolicies$Queryauditableservices, options: MethodOptions | BodyResponseCallback<Schema$QueryAuditableServicesResponse>, callback: BodyResponseCallback<Schema$QueryAuditableServicesResponse>): void;
        queryAuditableServices(params: Params$Resource$Iampolicies$Queryauditableservices, callback: BodyResponseCallback<Schema$QueryAuditableServicesResponse>): void;
        queryAuditableServices(callback: BodyResponseCallback<Schema$QueryAuditableServicesResponse>): void;
    }
    export interface Params$Resource$Iampolicies$Lintpolicy extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$LintPolicyRequest;
    }
    export interface Params$Resource$Iampolicies$Queryauditableservices extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$QueryAuditableServicesRequest;
    }
    export class Resource$Organizations {
        context: APIRequestContext;
        roles: Resource$Organizations$Roles;
        constructor(context: APIRequestContext);
    }
    export class Resource$Organizations$Roles {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * iam.organizations.roles.create
         * @desc Creates a new Role.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/iam.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const iam = google.iam('v1');
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
         *   const res = await iam.organizations.roles.create({
         *     // The `parent` parameter's value depends on the target resource for the
         *     // request, namely
         *     // [`projects`](/iam/reference/rest/v1/projects.roles) or
         *     // [`organizations`](/iam/reference/rest/v1/organizations.roles). Each
         *     // resource type's `parent` value format is described below:
         *     //
         *     // * [`projects.roles.create()`](/iam/reference/rest/v1/projects.roles/create):
         *     //   `projects/{PROJECT_ID}`. This method creates project-level
         *     //   [custom roles](/iam/docs/understanding-custom-roles).
         *     //   Example request URL:
         *     //   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles`
         *     //
         *     // * [`organizations.roles.create()`](/iam/reference/rest/v1/organizations.roles/create):
         *     //   `organizations/{ORGANIZATION_ID}`. This method creates organization-level
         *     //   [custom roles](/iam/docs/understanding-custom-roles). Example request
         *     //   URL:
         *     //   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles`
         *     //
         *     // Note: Wildcard (*) values are invalid; you must specify a complete project
         *     // ID or organization ID.
         *     parent: 'organizations/my-organization',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "role": {},
         *       //   "roleId": "my_roleId"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "deleted": false,
         *   //   "description": "my_description",
         *   //   "etag": "my_etag",
         *   //   "includedPermissions": [],
         *   //   "name": "my_name",
         *   //   "stage": "my_stage",
         *   //   "title": "my_title"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias iam.organizations.roles.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent The `parent` parameter's value depends on the target resource for the request, namely [`projects`](/iam/reference/rest/v1/projects.roles) or [`organizations`](/iam/reference/rest/v1/organizations.roles). Each resource type's `parent` value format is described below:  * [`projects.roles.create()`](/iam/reference/rest/v1/projects.roles/create):   `projects/{PROJECT_ID}`. This method creates project-level   [custom roles](/iam/docs/understanding-custom-roles).   Example request URL:   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles`  * [`organizations.roles.create()`](/iam/reference/rest/v1/organizations.roles/create):   `organizations/{ORGANIZATION_ID}`. This method creates organization-level   [custom roles](/iam/docs/understanding-custom-roles). Example request   URL:   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles`  Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID.
         * @param {().CreateRoleRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Organizations$Roles$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Organizations$Roles$Create, options?: MethodOptions): GaxiosPromise<Schema$Role>;
        create(params: Params$Resource$Organizations$Roles$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Organizations$Roles$Create, options: MethodOptions | BodyResponseCallback<Schema$Role>, callback: BodyResponseCallback<Schema$Role>): void;
        create(params: Params$Resource$Organizations$Roles$Create, callback: BodyResponseCallback<Schema$Role>): void;
        create(callback: BodyResponseCallback<Schema$Role>): void;
        /**
         * iam.organizations.roles.delete
         * @desc Soft deletes a role. The role is suspended and cannot be used to create new IAM Policy Bindings. The Role will not be included in `ListRoles()` unless `show_deleted` is set in the `ListRolesRequest`. The Role contains the deleted boolean set. Existing Bindings remains, but are inactive. The Role can be undeleted within 7 days. After 7 days the Role is deleted and all Bindings associated with the role are removed.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/iam.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const iam = google.iam('v1');
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
         *   const res = await iam.organizations.roles.delete({
         *     // Used to perform a consistent read-modify-write.
         *     etag: 'placeholder-value',
         *     // The `name` parameter's value depends on the target resource for the
         *     // request, namely
         *     // [`projects`](/iam/reference/rest/v1/projects.roles) or
         *     // [`organizations`](/iam/reference/rest/v1/organizations.roles). Each
         *     // resource type's `name` value format is described below:
         *     //
         *     // * [`projects.roles.delete()`](/iam/reference/rest/v1/projects.roles/delete):
         *     //   `projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`. This method deletes only
         *     //   [custom roles](/iam/docs/understanding-custom-roles) that have been
         *     //   created at the project level. Example request URL:
         *     //   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`
         *     //
         *     // * [`organizations.roles.delete()`](/iam/reference/rest/v1/organizations.roles/delete):
         *     //   `organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`. This method
         *     //   deletes only [custom roles](/iam/docs/understanding-custom-roles) that
         *     //   have been created at the organization level. Example request URL:
         *     //   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`
         *     //
         *     // Note: Wildcard (*) values are invalid; you must specify a complete project
         *     // ID or organization ID.
         *     name: 'organizations/my-organization/roles/my-role',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "deleted": false,
         *   //   "description": "my_description",
         *   //   "etag": "my_etag",
         *   //   "includedPermissions": [],
         *   //   "name": "my_name",
         *   //   "stage": "my_stage",
         *   //   "title": "my_title"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias iam.organizations.roles.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.etag Used to perform a consistent read-modify-write.
         * @param {string} params.name The `name` parameter's value depends on the target resource for the request, namely [`projects`](/iam/reference/rest/v1/projects.roles) or [`organizations`](/iam/reference/rest/v1/organizations.roles). Each resource type's `name` value format is described below:  * [`projects.roles.delete()`](/iam/reference/rest/v1/projects.roles/delete):   `projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`. This method deletes only   [custom roles](/iam/docs/understanding-custom-roles) that have been   created at the project level. Example request URL:   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`  * [`organizations.roles.delete()`](/iam/reference/rest/v1/organizations.roles/delete):   `organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`. This method   deletes only [custom roles](/iam/docs/understanding-custom-roles) that   have been created at the organization level. Example request URL:   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`  Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Organizations$Roles$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Organizations$Roles$Delete, options?: MethodOptions): GaxiosPromise<Schema$Role>;
        delete(params: Params$Resource$Organizations$Roles$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Organizations$Roles$Delete, options: MethodOptions | BodyResponseCallback<Schema$Role>, callback: BodyResponseCallback<Schema$Role>): void;
        delete(params: Params$Resource$Organizations$Roles$Delete, callback: BodyResponseCallback<Schema$Role>): void;
        delete(callback: BodyResponseCallback<Schema$Role>): void;
        /**
         * iam.organizations.roles.get
         * @desc Gets a Role definition.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/iam.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const iam = google.iam('v1');
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
         *   const res = await iam.organizations.roles.get({
         *     // The `name` parameter's value depends on the target resource for the
         *     // request, namely
         *     // [`roles`](/iam/reference/rest/v1/roles),
         *     // [`projects`](/iam/reference/rest/v1/projects.roles), or
         *     // [`organizations`](/iam/reference/rest/v1/organizations.roles). Each
         *     // resource type's `name` value format is described below:
         *     //
         *     // * [`roles.get()`](/iam/reference/rest/v1/roles/get): `roles/{ROLE_NAME}`.
         *     //   This method returns results from all
         *     //   [predefined roles](/iam/docs/understanding-roles#predefined_roles) in
         *     //   Cloud IAM. Example request URL:
         *     //   `https://iam.googleapis.com/v1/roles/{ROLE_NAME}`
         *     //
         *     // * [`projects.roles.get()`](/iam/reference/rest/v1/projects.roles/get):
         *     //   `projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`. This method returns only
         *     //   [custom roles](/iam/docs/understanding-custom-roles) that have been
         *     //   created at the project level. Example request URL:
         *     //   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`
         *     //
         *     // * [`organizations.roles.get()`](/iam/reference/rest/v1/organizations.roles/get):
         *     //   `organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`. This method
         *     //   returns only [custom roles](/iam/docs/understanding-custom-roles) that
         *     //   have been created at the organization level. Example request URL:
         *     //   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`
         *     //
         *     // Note: Wildcard (*) values are invalid; you must specify a complete project
         *     // ID or organization ID.
         *     name: 'organizations/my-organization/roles/my-role',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "deleted": false,
         *   //   "description": "my_description",
         *   //   "etag": "my_etag",
         *   //   "includedPermissions": [],
         *   //   "name": "my_name",
         *   //   "stage": "my_stage",
         *   //   "title": "my_title"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias iam.organizations.roles.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The `name` parameter's value depends on the target resource for the request, namely [`roles`](/iam/reference/rest/v1/roles), [`projects`](/iam/reference/rest/v1/projects.roles), or [`organizations`](/iam/reference/rest/v1/organizations.roles). Each resource type's `name` value format is described below:  * [`roles.get()`](/iam/reference/rest/v1/roles/get): `roles/{ROLE_NAME}`.   This method returns results from all   [predefined roles](/iam/docs/understanding-roles#predefined_roles) in   Cloud IAM. Example request URL:   `https://iam.googleapis.com/v1/roles/{ROLE_NAME}`  * [`projects.roles.get()`](/iam/reference/rest/v1/projects.roles/get):   `projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`. This method returns only   [custom roles](/iam/docs/understanding-custom-roles) that have been   created at the project level. Example request URL:   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`  * [`organizations.roles.get()`](/iam/reference/rest/v1/organizations.roles/get):   `organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`. This method   returns only [custom roles](/iam/docs/understanding-custom-roles) that   have been created at the organization level. Example request URL:   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`  Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Organizations$Roles$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Organizations$Roles$Get, options?: MethodOptions): GaxiosPromise<Schema$Role>;
        get(params: Params$Resource$Organizations$Roles$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Organizations$Roles$Get, options: MethodOptions | BodyResponseCallback<Schema$Role>, callback: BodyResponseCallback<Schema$Role>): void;
        get(params: Params$Resource$Organizations$Roles$Get, callback: BodyResponseCallback<Schema$Role>): void;
        get(callback: BodyResponseCallback<Schema$Role>): void;
        /**
         * iam.organizations.roles.list
         * @desc Lists the Roles defined on a resource.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/iam.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const iam = google.iam('v1');
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
         *   const res = await iam.organizations.roles.list({
         *     // Optional limit on the number of roles to include in the response.
         *     pageSize: 'placeholder-value',
         *     // Optional pagination token returned in an earlier ListRolesResponse.
         *     pageToken: 'placeholder-value',
         *     // The `parent` parameter's value depends on the target resource for the
         *     // request, namely
         *     // [`roles`](/iam/reference/rest/v1/roles),
         *     // [`projects`](/iam/reference/rest/v1/projects.roles), or
         *     // [`organizations`](/iam/reference/rest/v1/organizations.roles). Each
         *     // resource type's `parent` value format is described below:
         *     //
         *     // * [`roles.list()`](/iam/reference/rest/v1/roles/list): An empty string.
         *     //   This method doesn't require a resource; it simply returns all
         *     //   [predefined roles](/iam/docs/understanding-roles#predefined_roles) in
         *     //   Cloud IAM. Example request URL:
         *     //   `https://iam.googleapis.com/v1/roles`
         *     //
         *     // * [`projects.roles.list()`](/iam/reference/rest/v1/projects.roles/list):
         *     //   `projects/{PROJECT_ID}`. This method lists all project-level
         *     //   [custom roles](/iam/docs/understanding-custom-roles).
         *     //   Example request URL:
         *     //   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles`
         *     //
         *     // * [`organizations.roles.list()`](/iam/reference/rest/v1/organizations.roles/list):
         *     //   `organizations/{ORGANIZATION_ID}`. This method lists all
         *     //   organization-level [custom roles](/iam/docs/understanding-custom-roles).
         *     //   Example request URL:
         *     //   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles`
         *     //
         *     // Note: Wildcard (*) values are invalid; you must specify a complete project
         *     // ID or organization ID.
         *     parent: 'organizations/my-organization',
         *     // Include Roles that have been deleted.
         *     showDeleted: 'placeholder-value',
         *     // Optional view for the returned Role objects. When `FULL` is specified,
         *     // the `includedPermissions` field is returned, which includes a list of all
         *     // permissions in the role. The default value is `BASIC`, which does not
         *     // return the `includedPermissions` field.
         *     view: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "roles": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias iam.organizations.roles.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize Optional limit on the number of roles to include in the response.
         * @param {string=} params.pageToken Optional pagination token returned in an earlier ListRolesResponse.
         * @param {string} params.parent The `parent` parameter's value depends on the target resource for the request, namely [`roles`](/iam/reference/rest/v1/roles), [`projects`](/iam/reference/rest/v1/projects.roles), or [`organizations`](/iam/reference/rest/v1/organizations.roles). Each resource type's `parent` value format is described below:  * [`roles.list()`](/iam/reference/rest/v1/roles/list): An empty string.   This method doesn't require a resource; it simply returns all   [predefined roles](/iam/docs/understanding-roles#predefined_roles) in   Cloud IAM. Example request URL:   `https://iam.googleapis.com/v1/roles`  * [`projects.roles.list()`](/iam/reference/rest/v1/projects.roles/list):   `projects/{PROJECT_ID}`. This method lists all project-level   [custom roles](/iam/docs/understanding-custom-roles).   Example request URL:   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles`  * [`organizations.roles.list()`](/iam/reference/rest/v1/organizations.roles/list):   `organizations/{ORGANIZATION_ID}`. This method lists all   organization-level [custom roles](/iam/docs/understanding-custom-roles).   Example request URL:   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles`  Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID.
         * @param {boolean=} params.showDeleted Include Roles that have been deleted.
         * @param {string=} params.view Optional view for the returned Role objects. When `FULL` is specified, the `includedPermissions` field is returned, which includes a list of all permissions in the role. The default value is `BASIC`, which does not return the `includedPermissions` field.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Organizations$Roles$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Organizations$Roles$List, options?: MethodOptions): GaxiosPromise<Schema$ListRolesResponse>;
        list(params: Params$Resource$Organizations$Roles$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Organizations$Roles$List, options: MethodOptions | BodyResponseCallback<Schema$ListRolesResponse>, callback: BodyResponseCallback<Schema$ListRolesResponse>): void;
        list(params: Params$Resource$Organizations$Roles$List, callback: BodyResponseCallback<Schema$ListRolesResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListRolesResponse>): void;
        /**
         * iam.organizations.roles.patch
         * @desc Updates a Role definition.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/iam.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const iam = google.iam('v1');
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
         *   const res = await iam.organizations.roles.patch({
         *     // The `name` parameter's value depends on the target resource for the
         *     // request, namely
         *     // [`projects`](/iam/reference/rest/v1/projects.roles) or
         *     // [`organizations`](/iam/reference/rest/v1/organizations.roles). Each
         *     // resource type's `name` value format is described below:
         *     //
         *     // * [`projects.roles.patch()`](/iam/reference/rest/v1/projects.roles/patch):
         *     //   `projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`. This method updates only
         *     //   [custom roles](/iam/docs/understanding-custom-roles) that have been
         *     //   created at the project level. Example request URL:
         *     //   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`
         *     //
         *     // * [`organizations.roles.patch()`](/iam/reference/rest/v1/organizations.roles/patch):
         *     //   `organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`. This method
         *     //   updates only [custom roles](/iam/docs/understanding-custom-roles) that
         *     //   have been created at the organization level. Example request URL:
         *     //   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`
         *     //
         *     // Note: Wildcard (*) values are invalid; you must specify a complete project
         *     // ID or organization ID.
         *     name: 'organizations/my-organization/roles/my-role',
         *     // A mask describing which fields in the Role have changed.
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "deleted": false,
         *       //   "description": "my_description",
         *       //   "etag": "my_etag",
         *       //   "includedPermissions": [],
         *       //   "name": "my_name",
         *       //   "stage": "my_stage",
         *       //   "title": "my_title"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "deleted": false,
         *   //   "description": "my_description",
         *   //   "etag": "my_etag",
         *   //   "includedPermissions": [],
         *   //   "name": "my_name",
         *   //   "stage": "my_stage",
         *   //   "title": "my_title"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias iam.organizations.roles.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The `name` parameter's value depends on the target resource for the request, namely [`projects`](/iam/reference/rest/v1/projects.roles) or [`organizations`](/iam/reference/rest/v1/organizations.roles). Each resource type's `name` value format is described below:  * [`projects.roles.patch()`](/iam/reference/rest/v1/projects.roles/patch):   `projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`. This method updates only   [custom roles](/iam/docs/understanding-custom-roles) that have been   created at the project level. Example request URL:   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`  * [`organizations.roles.patch()`](/iam/reference/rest/v1/organizations.roles/patch):   `organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`. This method   updates only [custom roles](/iam/docs/understanding-custom-roles) that   have been created at the organization level. Example request URL:   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`  Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID.
         * @param {string=} params.updateMask A mask describing which fields in the Role have changed.
         * @param {().Role} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Organizations$Roles$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Organizations$Roles$Patch, options?: MethodOptions): GaxiosPromise<Schema$Role>;
        patch(params: Params$Resource$Organizations$Roles$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Organizations$Roles$Patch, options: MethodOptions | BodyResponseCallback<Schema$Role>, callback: BodyResponseCallback<Schema$Role>): void;
        patch(params: Params$Resource$Organizations$Roles$Patch, callback: BodyResponseCallback<Schema$Role>): void;
        patch(callback: BodyResponseCallback<Schema$Role>): void;
        /**
         * iam.organizations.roles.undelete
         * @desc Undelete a Role, bringing it back in its previous state.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/iam.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const iam = google.iam('v1');
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
         *   const res = await iam.organizations.roles.undelete({
         *     // The `name` parameter's value depends on the target resource for the
         *     // request, namely
         *     // [`projects`](/iam/reference/rest/v1/projects.roles) or
         *     // [`organizations`](/iam/reference/rest/v1/organizations.roles). Each
         *     // resource type's `name` value format is described below:
         *     //
         *     // * [`projects.roles.undelete()`](/iam/reference/rest/v1/projects.roles/undelete):
         *     //   `projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`. This method undeletes
         *     //   only [custom roles](/iam/docs/understanding-custom-roles) that have been
         *     //   created at the project level. Example request URL:
         *     //   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`
         *     //
         *     // * [`organizations.roles.undelete()`](/iam/reference/rest/v1/organizations.roles/undelete):
         *     //   `organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`. This method
         *     //   undeletes only [custom roles](/iam/docs/understanding-custom-roles) that
         *     //   have been created at the organization level. Example request URL:
         *     //   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`
         *     //
         *     // Note: Wildcard (*) values are invalid; you must specify a complete project
         *     // ID or organization ID.
         *     name: 'organizations/my-organization/roles/my-role',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "etag": "my_etag"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "deleted": false,
         *   //   "description": "my_description",
         *   //   "etag": "my_etag",
         *   //   "includedPermissions": [],
         *   //   "name": "my_name",
         *   //   "stage": "my_stage",
         *   //   "title": "my_title"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias iam.organizations.roles.undelete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The `name` parameter's value depends on the target resource for the request, namely [`projects`](/iam/reference/rest/v1/projects.roles) or [`organizations`](/iam/reference/rest/v1/organizations.roles). Each resource type's `name` value format is described below:  * [`projects.roles.undelete()`](/iam/reference/rest/v1/projects.roles/undelete):   `projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`. This method undeletes   only [custom roles](/iam/docs/understanding-custom-roles) that have been   created at the project level. Example request URL:   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`  * [`organizations.roles.undelete()`](/iam/reference/rest/v1/organizations.roles/undelete):   `organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`. This method   undeletes only [custom roles](/iam/docs/understanding-custom-roles) that   have been created at the organization level. Example request URL:   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`  Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID.
         * @param {().UndeleteRoleRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        undelete(params: Params$Resource$Organizations$Roles$Undelete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        undelete(params?: Params$Resource$Organizations$Roles$Undelete, options?: MethodOptions): GaxiosPromise<Schema$Role>;
        undelete(params: Params$Resource$Organizations$Roles$Undelete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        undelete(params: Params$Resource$Organizations$Roles$Undelete, options: MethodOptions | BodyResponseCallback<Schema$Role>, callback: BodyResponseCallback<Schema$Role>): void;
        undelete(params: Params$Resource$Organizations$Roles$Undelete, callback: BodyResponseCallback<Schema$Role>): void;
        undelete(callback: BodyResponseCallback<Schema$Role>): void;
    }
    export interface Params$Resource$Organizations$Roles$Create extends StandardParameters {
        /**
         * The `parent` parameter's value depends on the target resource for the request, namely [`projects`](/iam/reference/rest/v1/projects.roles) or [`organizations`](/iam/reference/rest/v1/organizations.roles). Each resource type's `parent` value format is described below:  * [`projects.roles.create()`](/iam/reference/rest/v1/projects.roles/create):   `projects/{PROJECT_ID}`. This method creates project-level   [custom roles](/iam/docs/understanding-custom-roles).   Example request URL:   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles`  * [`organizations.roles.create()`](/iam/reference/rest/v1/organizations.roles/create):   `organizations/{ORGANIZATION_ID}`. This method creates organization-level   [custom roles](/iam/docs/understanding-custom-roles). Example request   URL:   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles`  Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID.
         */
        parent?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$CreateRoleRequest;
    }
    export interface Params$Resource$Organizations$Roles$Delete extends StandardParameters {
        /**
         * Used to perform a consistent read-modify-write.
         */
        etag?: string;
        /**
         * The `name` parameter's value depends on the target resource for the request, namely [`projects`](/iam/reference/rest/v1/projects.roles) or [`organizations`](/iam/reference/rest/v1/organizations.roles). Each resource type's `name` value format is described below:  * [`projects.roles.delete()`](/iam/reference/rest/v1/projects.roles/delete):   `projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`. This method deletes only   [custom roles](/iam/docs/understanding-custom-roles) that have been   created at the project level. Example request URL:   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`  * [`organizations.roles.delete()`](/iam/reference/rest/v1/organizations.roles/delete):   `organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`. This method   deletes only [custom roles](/iam/docs/understanding-custom-roles) that   have been created at the organization level. Example request URL:   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`  Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID.
         */
        name?: string;
    }
    export interface Params$Resource$Organizations$Roles$Get extends StandardParameters {
        /**
         * The `name` parameter's value depends on the target resource for the request, namely [`roles`](/iam/reference/rest/v1/roles), [`projects`](/iam/reference/rest/v1/projects.roles), or [`organizations`](/iam/reference/rest/v1/organizations.roles). Each resource type's `name` value format is described below:  * [`roles.get()`](/iam/reference/rest/v1/roles/get): `roles/{ROLE_NAME}`.   This method returns results from all   [predefined roles](/iam/docs/understanding-roles#predefined_roles) in   Cloud IAM. Example request URL:   `https://iam.googleapis.com/v1/roles/{ROLE_NAME}`  * [`projects.roles.get()`](/iam/reference/rest/v1/projects.roles/get):   `projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`. This method returns only   [custom roles](/iam/docs/understanding-custom-roles) that have been   created at the project level. Example request URL:   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`  * [`organizations.roles.get()`](/iam/reference/rest/v1/organizations.roles/get):   `organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`. This method   returns only [custom roles](/iam/docs/understanding-custom-roles) that   have been created at the organization level. Example request URL:   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`  Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID.
         */
        name?: string;
    }
    export interface Params$Resource$Organizations$Roles$List extends StandardParameters {
        /**
         * Optional limit on the number of roles to include in the response.
         */
        pageSize?: number;
        /**
         * Optional pagination token returned in an earlier ListRolesResponse.
         */
        pageToken?: string;
        /**
         * The `parent` parameter's value depends on the target resource for the request, namely [`roles`](/iam/reference/rest/v1/roles), [`projects`](/iam/reference/rest/v1/projects.roles), or [`organizations`](/iam/reference/rest/v1/organizations.roles). Each resource type's `parent` value format is described below:  * [`roles.list()`](/iam/reference/rest/v1/roles/list): An empty string.   This method doesn't require a resource; it simply returns all   [predefined roles](/iam/docs/understanding-roles#predefined_roles) in   Cloud IAM. Example request URL:   `https://iam.googleapis.com/v1/roles`  * [`projects.roles.list()`](/iam/reference/rest/v1/projects.roles/list):   `projects/{PROJECT_ID}`. This method lists all project-level   [custom roles](/iam/docs/understanding-custom-roles).   Example request URL:   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles`  * [`organizations.roles.list()`](/iam/reference/rest/v1/organizations.roles/list):   `organizations/{ORGANIZATION_ID}`. This method lists all   organization-level [custom roles](/iam/docs/understanding-custom-roles).   Example request URL:   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles`  Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID.
         */
        parent?: string;
        /**
         * Include Roles that have been deleted.
         */
        showDeleted?: boolean;
        /**
         * Optional view for the returned Role objects. When `FULL` is specified, the `includedPermissions` field is returned, which includes a list of all permissions in the role. The default value is `BASIC`, which does not return the `includedPermissions` field.
         */
        view?: string;
    }
    export interface Params$Resource$Organizations$Roles$Patch extends StandardParameters {
        /**
         * The `name` parameter's value depends on the target resource for the request, namely [`projects`](/iam/reference/rest/v1/projects.roles) or [`organizations`](/iam/reference/rest/v1/organizations.roles). Each resource type's `name` value format is described below:  * [`projects.roles.patch()`](/iam/reference/rest/v1/projects.roles/patch):   `projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`. This method updates only   [custom roles](/iam/docs/understanding-custom-roles) that have been   created at the project level. Example request URL:   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`  * [`organizations.roles.patch()`](/iam/reference/rest/v1/organizations.roles/patch):   `organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`. This method   updates only [custom roles](/iam/docs/understanding-custom-roles) that   have been created at the organization level. Example request URL:   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`  Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID.
         */
        name?: string;
        /**
         * A mask describing which fields in the Role have changed.
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Role;
    }
    export interface Params$Resource$Organizations$Roles$Undelete extends StandardParameters {
        /**
         * The `name` parameter's value depends on the target resource for the request, namely [`projects`](/iam/reference/rest/v1/projects.roles) or [`organizations`](/iam/reference/rest/v1/organizations.roles). Each resource type's `name` value format is described below:  * [`projects.roles.undelete()`](/iam/reference/rest/v1/projects.roles/undelete):   `projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`. This method undeletes   only [custom roles](/iam/docs/understanding-custom-roles) that have been   created at the project level. Example request URL:   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`  * [`organizations.roles.undelete()`](/iam/reference/rest/v1/organizations.roles/undelete):   `organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`. This method   undeletes only [custom roles](/iam/docs/understanding-custom-roles) that   have been created at the organization level. Example request URL:   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`  Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$UndeleteRoleRequest;
    }
    export class Resource$Permissions {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * iam.permissions.queryTestablePermissions
         * @desc Lists the permissions testable on a resource. A permission is testable if it can be tested for an identity on a resource.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/iam.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const iam = google.iam('v1');
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
         *   const res = await iam.permissions.queryTestablePermissions({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "fullResourceName": "my_fullResourceName",
         *       //   "pageSize": 0,
         *       //   "pageToken": "my_pageToken"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "permissions": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias iam.permissions.queryTestablePermissions
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().QueryTestablePermissionsRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        queryTestablePermissions(params: Params$Resource$Permissions$Querytestablepermissions, options: StreamMethodOptions): GaxiosPromise<Readable>;
        queryTestablePermissions(params?: Params$Resource$Permissions$Querytestablepermissions, options?: MethodOptions): GaxiosPromise<Schema$QueryTestablePermissionsResponse>;
        queryTestablePermissions(params: Params$Resource$Permissions$Querytestablepermissions, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        queryTestablePermissions(params: Params$Resource$Permissions$Querytestablepermissions, options: MethodOptions | BodyResponseCallback<Schema$QueryTestablePermissionsResponse>, callback: BodyResponseCallback<Schema$QueryTestablePermissionsResponse>): void;
        queryTestablePermissions(params: Params$Resource$Permissions$Querytestablepermissions, callback: BodyResponseCallback<Schema$QueryTestablePermissionsResponse>): void;
        queryTestablePermissions(callback: BodyResponseCallback<Schema$QueryTestablePermissionsResponse>): void;
    }
    export interface Params$Resource$Permissions$Querytestablepermissions extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$QueryTestablePermissionsRequest;
    }
    export class Resource$Projects {
        context: APIRequestContext;
        roles: Resource$Projects$Roles;
        serviceAccounts: Resource$Projects$Serviceaccounts;
        constructor(context: APIRequestContext);
    }
    export class Resource$Projects$Roles {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * iam.projects.roles.create
         * @desc Creates a new Role.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/iam.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const iam = google.iam('v1');
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
         *   const res = await iam.projects.roles.create({
         *     // The `parent` parameter's value depends on the target resource for the
         *     // request, namely
         *     // [`projects`](/iam/reference/rest/v1/projects.roles) or
         *     // [`organizations`](/iam/reference/rest/v1/organizations.roles). Each
         *     // resource type's `parent` value format is described below:
         *     //
         *     // * [`projects.roles.create()`](/iam/reference/rest/v1/projects.roles/create):
         *     //   `projects/{PROJECT_ID}`. This method creates project-level
         *     //   [custom roles](/iam/docs/understanding-custom-roles).
         *     //   Example request URL:
         *     //   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles`
         *     //
         *     // * [`organizations.roles.create()`](/iam/reference/rest/v1/organizations.roles/create):
         *     //   `organizations/{ORGANIZATION_ID}`. This method creates organization-level
         *     //   [custom roles](/iam/docs/understanding-custom-roles). Example request
         *     //   URL:
         *     //   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles`
         *     //
         *     // Note: Wildcard (*) values are invalid; you must specify a complete project
         *     // ID or organization ID.
         *     parent: 'projects/my-project',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "role": {},
         *       //   "roleId": "my_roleId"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "deleted": false,
         *   //   "description": "my_description",
         *   //   "etag": "my_etag",
         *   //   "includedPermissions": [],
         *   //   "name": "my_name",
         *   //   "stage": "my_stage",
         *   //   "title": "my_title"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias iam.projects.roles.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent The `parent` parameter's value depends on the target resource for the request, namely [`projects`](/iam/reference/rest/v1/projects.roles) or [`organizations`](/iam/reference/rest/v1/organizations.roles). Each resource type's `parent` value format is described below:  * [`projects.roles.create()`](/iam/reference/rest/v1/projects.roles/create):   `projects/{PROJECT_ID}`. This method creates project-level   [custom roles](/iam/docs/understanding-custom-roles).   Example request URL:   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles`  * [`organizations.roles.create()`](/iam/reference/rest/v1/organizations.roles/create):   `organizations/{ORGANIZATION_ID}`. This method creates organization-level   [custom roles](/iam/docs/understanding-custom-roles). Example request   URL:   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles`  Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID.
         * @param {().CreateRoleRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Projects$Roles$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Projects$Roles$Create, options?: MethodOptions): GaxiosPromise<Schema$Role>;
        create(params: Params$Resource$Projects$Roles$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Projects$Roles$Create, options: MethodOptions | BodyResponseCallback<Schema$Role>, callback: BodyResponseCallback<Schema$Role>): void;
        create(params: Params$Resource$Projects$Roles$Create, callback: BodyResponseCallback<Schema$Role>): void;
        create(callback: BodyResponseCallback<Schema$Role>): void;
        /**
         * iam.projects.roles.delete
         * @desc Soft deletes a role. The role is suspended and cannot be used to create new IAM Policy Bindings. The Role will not be included in `ListRoles()` unless `show_deleted` is set in the `ListRolesRequest`. The Role contains the deleted boolean set. Existing Bindings remains, but are inactive. The Role can be undeleted within 7 days. After 7 days the Role is deleted and all Bindings associated with the role are removed.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/iam.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const iam = google.iam('v1');
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
         *   const res = await iam.projects.roles.delete({
         *     // Used to perform a consistent read-modify-write.
         *     etag: 'placeholder-value',
         *     // The `name` parameter's value depends on the target resource for the
         *     // request, namely
         *     // [`projects`](/iam/reference/rest/v1/projects.roles) or
         *     // [`organizations`](/iam/reference/rest/v1/organizations.roles). Each
         *     // resource type's `name` value format is described below:
         *     //
         *     // * [`projects.roles.delete()`](/iam/reference/rest/v1/projects.roles/delete):
         *     //   `projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`. This method deletes only
         *     //   [custom roles](/iam/docs/understanding-custom-roles) that have been
         *     //   created at the project level. Example request URL:
         *     //   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`
         *     //
         *     // * [`organizations.roles.delete()`](/iam/reference/rest/v1/organizations.roles/delete):
         *     //   `organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`. This method
         *     //   deletes only [custom roles](/iam/docs/understanding-custom-roles) that
         *     //   have been created at the organization level. Example request URL:
         *     //   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`
         *     //
         *     // Note: Wildcard (*) values are invalid; you must specify a complete project
         *     // ID or organization ID.
         *     name: 'projects/my-project/roles/my-role',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "deleted": false,
         *   //   "description": "my_description",
         *   //   "etag": "my_etag",
         *   //   "includedPermissions": [],
         *   //   "name": "my_name",
         *   //   "stage": "my_stage",
         *   //   "title": "my_title"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias iam.projects.roles.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.etag Used to perform a consistent read-modify-write.
         * @param {string} params.name The `name` parameter's value depends on the target resource for the request, namely [`projects`](/iam/reference/rest/v1/projects.roles) or [`organizations`](/iam/reference/rest/v1/organizations.roles). Each resource type's `name` value format is described below:  * [`projects.roles.delete()`](/iam/reference/rest/v1/projects.roles/delete):   `projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`. This method deletes only   [custom roles](/iam/docs/understanding-custom-roles) that have been   created at the project level. Example request URL:   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`  * [`organizations.roles.delete()`](/iam/reference/rest/v1/organizations.roles/delete):   `organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`. This method   deletes only [custom roles](/iam/docs/understanding-custom-roles) that   have been created at the organization level. Example request URL:   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`  Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Projects$Roles$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Projects$Roles$Delete, options?: MethodOptions): GaxiosPromise<Schema$Role>;
        delete(params: Params$Resource$Projects$Roles$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Projects$Roles$Delete, options: MethodOptions | BodyResponseCallback<Schema$Role>, callback: BodyResponseCallback<Schema$Role>): void;
        delete(params: Params$Resource$Projects$Roles$Delete, callback: BodyResponseCallback<Schema$Role>): void;
        delete(callback: BodyResponseCallback<Schema$Role>): void;
        /**
         * iam.projects.roles.get
         * @desc Gets a Role definition.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/iam.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const iam = google.iam('v1');
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
         *   const res = await iam.projects.roles.get({
         *     // The `name` parameter's value depends on the target resource for the
         *     // request, namely
         *     // [`roles`](/iam/reference/rest/v1/roles),
         *     // [`projects`](/iam/reference/rest/v1/projects.roles), or
         *     // [`organizations`](/iam/reference/rest/v1/organizations.roles). Each
         *     // resource type's `name` value format is described below:
         *     //
         *     // * [`roles.get()`](/iam/reference/rest/v1/roles/get): `roles/{ROLE_NAME}`.
         *     //   This method returns results from all
         *     //   [predefined roles](/iam/docs/understanding-roles#predefined_roles) in
         *     //   Cloud IAM. Example request URL:
         *     //   `https://iam.googleapis.com/v1/roles/{ROLE_NAME}`
         *     //
         *     // * [`projects.roles.get()`](/iam/reference/rest/v1/projects.roles/get):
         *     //   `projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`. This method returns only
         *     //   [custom roles](/iam/docs/understanding-custom-roles) that have been
         *     //   created at the project level. Example request URL:
         *     //   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`
         *     //
         *     // * [`organizations.roles.get()`](/iam/reference/rest/v1/organizations.roles/get):
         *     //   `organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`. This method
         *     //   returns only [custom roles](/iam/docs/understanding-custom-roles) that
         *     //   have been created at the organization level. Example request URL:
         *     //   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`
         *     //
         *     // Note: Wildcard (*) values are invalid; you must specify a complete project
         *     // ID or organization ID.
         *     name: 'projects/my-project/roles/my-role',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "deleted": false,
         *   //   "description": "my_description",
         *   //   "etag": "my_etag",
         *   //   "includedPermissions": [],
         *   //   "name": "my_name",
         *   //   "stage": "my_stage",
         *   //   "title": "my_title"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias iam.projects.roles.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The `name` parameter's value depends on the target resource for the request, namely [`roles`](/iam/reference/rest/v1/roles), [`projects`](/iam/reference/rest/v1/projects.roles), or [`organizations`](/iam/reference/rest/v1/organizations.roles). Each resource type's `name` value format is described below:  * [`roles.get()`](/iam/reference/rest/v1/roles/get): `roles/{ROLE_NAME}`.   This method returns results from all   [predefined roles](/iam/docs/understanding-roles#predefined_roles) in   Cloud IAM. Example request URL:   `https://iam.googleapis.com/v1/roles/{ROLE_NAME}`  * [`projects.roles.get()`](/iam/reference/rest/v1/projects.roles/get):   `projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`. This method returns only   [custom roles](/iam/docs/understanding-custom-roles) that have been   created at the project level. Example request URL:   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`  * [`organizations.roles.get()`](/iam/reference/rest/v1/organizations.roles/get):   `organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`. This method   returns only [custom roles](/iam/docs/understanding-custom-roles) that   have been created at the organization level. Example request URL:   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`  Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Roles$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Roles$Get, options?: MethodOptions): GaxiosPromise<Schema$Role>;
        get(params: Params$Resource$Projects$Roles$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Roles$Get, options: MethodOptions | BodyResponseCallback<Schema$Role>, callback: BodyResponseCallback<Schema$Role>): void;
        get(params: Params$Resource$Projects$Roles$Get, callback: BodyResponseCallback<Schema$Role>): void;
        get(callback: BodyResponseCallback<Schema$Role>): void;
        /**
         * iam.projects.roles.list
         * @desc Lists the Roles defined on a resource.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/iam.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const iam = google.iam('v1');
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
         *   const res = await iam.projects.roles.list({
         *     // Optional limit on the number of roles to include in the response.
         *     pageSize: 'placeholder-value',
         *     // Optional pagination token returned in an earlier ListRolesResponse.
         *     pageToken: 'placeholder-value',
         *     // The `parent` parameter's value depends on the target resource for the
         *     // request, namely
         *     // [`roles`](/iam/reference/rest/v1/roles),
         *     // [`projects`](/iam/reference/rest/v1/projects.roles), or
         *     // [`organizations`](/iam/reference/rest/v1/organizations.roles). Each
         *     // resource type's `parent` value format is described below:
         *     //
         *     // * [`roles.list()`](/iam/reference/rest/v1/roles/list): An empty string.
         *     //   This method doesn't require a resource; it simply returns all
         *     //   [predefined roles](/iam/docs/understanding-roles#predefined_roles) in
         *     //   Cloud IAM. Example request URL:
         *     //   `https://iam.googleapis.com/v1/roles`
         *     //
         *     // * [`projects.roles.list()`](/iam/reference/rest/v1/projects.roles/list):
         *     //   `projects/{PROJECT_ID}`. This method lists all project-level
         *     //   [custom roles](/iam/docs/understanding-custom-roles).
         *     //   Example request URL:
         *     //   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles`
         *     //
         *     // * [`organizations.roles.list()`](/iam/reference/rest/v1/organizations.roles/list):
         *     //   `organizations/{ORGANIZATION_ID}`. This method lists all
         *     //   organization-level [custom roles](/iam/docs/understanding-custom-roles).
         *     //   Example request URL:
         *     //   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles`
         *     //
         *     // Note: Wildcard (*) values are invalid; you must specify a complete project
         *     // ID or organization ID.
         *     parent: 'projects/my-project',
         *     // Include Roles that have been deleted.
         *     showDeleted: 'placeholder-value',
         *     // Optional view for the returned Role objects. When `FULL` is specified,
         *     // the `includedPermissions` field is returned, which includes a list of all
         *     // permissions in the role. The default value is `BASIC`, which does not
         *     // return the `includedPermissions` field.
         *     view: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "roles": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias iam.projects.roles.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize Optional limit on the number of roles to include in the response.
         * @param {string=} params.pageToken Optional pagination token returned in an earlier ListRolesResponse.
         * @param {string} params.parent The `parent` parameter's value depends on the target resource for the request, namely [`roles`](/iam/reference/rest/v1/roles), [`projects`](/iam/reference/rest/v1/projects.roles), or [`organizations`](/iam/reference/rest/v1/organizations.roles). Each resource type's `parent` value format is described below:  * [`roles.list()`](/iam/reference/rest/v1/roles/list): An empty string.   This method doesn't require a resource; it simply returns all   [predefined roles](/iam/docs/understanding-roles#predefined_roles) in   Cloud IAM. Example request URL:   `https://iam.googleapis.com/v1/roles`  * [`projects.roles.list()`](/iam/reference/rest/v1/projects.roles/list):   `projects/{PROJECT_ID}`. This method lists all project-level   [custom roles](/iam/docs/understanding-custom-roles).   Example request URL:   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles`  * [`organizations.roles.list()`](/iam/reference/rest/v1/organizations.roles/list):   `organizations/{ORGANIZATION_ID}`. This method lists all   organization-level [custom roles](/iam/docs/understanding-custom-roles).   Example request URL:   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles`  Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID.
         * @param {boolean=} params.showDeleted Include Roles that have been deleted.
         * @param {string=} params.view Optional view for the returned Role objects. When `FULL` is specified, the `includedPermissions` field is returned, which includes a list of all permissions in the role. The default value is `BASIC`, which does not return the `includedPermissions` field.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Roles$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Roles$List, options?: MethodOptions): GaxiosPromise<Schema$ListRolesResponse>;
        list(params: Params$Resource$Projects$Roles$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Roles$List, options: MethodOptions | BodyResponseCallback<Schema$ListRolesResponse>, callback: BodyResponseCallback<Schema$ListRolesResponse>): void;
        list(params: Params$Resource$Projects$Roles$List, callback: BodyResponseCallback<Schema$ListRolesResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListRolesResponse>): void;
        /**
         * iam.projects.roles.patch
         * @desc Updates a Role definition.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/iam.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const iam = google.iam('v1');
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
         *   const res = await iam.projects.roles.patch({
         *     // The `name` parameter's value depends on the target resource for the
         *     // request, namely
         *     // [`projects`](/iam/reference/rest/v1/projects.roles) or
         *     // [`organizations`](/iam/reference/rest/v1/organizations.roles). Each
         *     // resource type's `name` value format is described below:
         *     //
         *     // * [`projects.roles.patch()`](/iam/reference/rest/v1/projects.roles/patch):
         *     //   `projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`. This method updates only
         *     //   [custom roles](/iam/docs/understanding-custom-roles) that have been
         *     //   created at the project level. Example request URL:
         *     //   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`
         *     //
         *     // * [`organizations.roles.patch()`](/iam/reference/rest/v1/organizations.roles/patch):
         *     //   `organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`. This method
         *     //   updates only [custom roles](/iam/docs/understanding-custom-roles) that
         *     //   have been created at the organization level. Example request URL:
         *     //   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`
         *     //
         *     // Note: Wildcard (*) values are invalid; you must specify a complete project
         *     // ID or organization ID.
         *     name: 'projects/my-project/roles/my-role',
         *     // A mask describing which fields in the Role have changed.
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "deleted": false,
         *       //   "description": "my_description",
         *       //   "etag": "my_etag",
         *       //   "includedPermissions": [],
         *       //   "name": "my_name",
         *       //   "stage": "my_stage",
         *       //   "title": "my_title"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "deleted": false,
         *   //   "description": "my_description",
         *   //   "etag": "my_etag",
         *   //   "includedPermissions": [],
         *   //   "name": "my_name",
         *   //   "stage": "my_stage",
         *   //   "title": "my_title"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias iam.projects.roles.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The `name` parameter's value depends on the target resource for the request, namely [`projects`](/iam/reference/rest/v1/projects.roles) or [`organizations`](/iam/reference/rest/v1/organizations.roles). Each resource type's `name` value format is described below:  * [`projects.roles.patch()`](/iam/reference/rest/v1/projects.roles/patch):   `projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`. This method updates only   [custom roles](/iam/docs/understanding-custom-roles) that have been   created at the project level. Example request URL:   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`  * [`organizations.roles.patch()`](/iam/reference/rest/v1/organizations.roles/patch):   `organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`. This method   updates only [custom roles](/iam/docs/understanding-custom-roles) that   have been created at the organization level. Example request URL:   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`  Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID.
         * @param {string=} params.updateMask A mask describing which fields in the Role have changed.
         * @param {().Role} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Projects$Roles$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Projects$Roles$Patch, options?: MethodOptions): GaxiosPromise<Schema$Role>;
        patch(params: Params$Resource$Projects$Roles$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Projects$Roles$Patch, options: MethodOptions | BodyResponseCallback<Schema$Role>, callback: BodyResponseCallback<Schema$Role>): void;
        patch(params: Params$Resource$Projects$Roles$Patch, callback: BodyResponseCallback<Schema$Role>): void;
        patch(callback: BodyResponseCallback<Schema$Role>): void;
        /**
         * iam.projects.roles.undelete
         * @desc Undelete a Role, bringing it back in its previous state.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/iam.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const iam = google.iam('v1');
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
         *   const res = await iam.projects.roles.undelete({
         *     // The `name` parameter's value depends on the target resource for the
         *     // request, namely
         *     // [`projects`](/iam/reference/rest/v1/projects.roles) or
         *     // [`organizations`](/iam/reference/rest/v1/organizations.roles). Each
         *     // resource type's `name` value format is described below:
         *     //
         *     // * [`projects.roles.undelete()`](/iam/reference/rest/v1/projects.roles/undelete):
         *     //   `projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`. This method undeletes
         *     //   only [custom roles](/iam/docs/understanding-custom-roles) that have been
         *     //   created at the project level. Example request URL:
         *     //   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`
         *     //
         *     // * [`organizations.roles.undelete()`](/iam/reference/rest/v1/organizations.roles/undelete):
         *     //   `organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`. This method
         *     //   undeletes only [custom roles](/iam/docs/understanding-custom-roles) that
         *     //   have been created at the organization level. Example request URL:
         *     //   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`
         *     //
         *     // Note: Wildcard (*) values are invalid; you must specify a complete project
         *     // ID or organization ID.
         *     name: 'projects/my-project/roles/my-role',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "etag": "my_etag"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "deleted": false,
         *   //   "description": "my_description",
         *   //   "etag": "my_etag",
         *   //   "includedPermissions": [],
         *   //   "name": "my_name",
         *   //   "stage": "my_stage",
         *   //   "title": "my_title"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias iam.projects.roles.undelete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The `name` parameter's value depends on the target resource for the request, namely [`projects`](/iam/reference/rest/v1/projects.roles) or [`organizations`](/iam/reference/rest/v1/organizations.roles). Each resource type's `name` value format is described below:  * [`projects.roles.undelete()`](/iam/reference/rest/v1/projects.roles/undelete):   `projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`. This method undeletes   only [custom roles](/iam/docs/understanding-custom-roles) that have been   created at the project level. Example request URL:   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`  * [`organizations.roles.undelete()`](/iam/reference/rest/v1/organizations.roles/undelete):   `organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`. This method   undeletes only [custom roles](/iam/docs/understanding-custom-roles) that   have been created at the organization level. Example request URL:   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`  Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID.
         * @param {().UndeleteRoleRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        undelete(params: Params$Resource$Projects$Roles$Undelete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        undelete(params?: Params$Resource$Projects$Roles$Undelete, options?: MethodOptions): GaxiosPromise<Schema$Role>;
        undelete(params: Params$Resource$Projects$Roles$Undelete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        undelete(params: Params$Resource$Projects$Roles$Undelete, options: MethodOptions | BodyResponseCallback<Schema$Role>, callback: BodyResponseCallback<Schema$Role>): void;
        undelete(params: Params$Resource$Projects$Roles$Undelete, callback: BodyResponseCallback<Schema$Role>): void;
        undelete(callback: BodyResponseCallback<Schema$Role>): void;
    }
    export interface Params$Resource$Projects$Roles$Create extends StandardParameters {
        /**
         * The `parent` parameter's value depends on the target resource for the request, namely [`projects`](/iam/reference/rest/v1/projects.roles) or [`organizations`](/iam/reference/rest/v1/organizations.roles). Each resource type's `parent` value format is described below:  * [`projects.roles.create()`](/iam/reference/rest/v1/projects.roles/create):   `projects/{PROJECT_ID}`. This method creates project-level   [custom roles](/iam/docs/understanding-custom-roles).   Example request URL:   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles`  * [`organizations.roles.create()`](/iam/reference/rest/v1/organizations.roles/create):   `organizations/{ORGANIZATION_ID}`. This method creates organization-level   [custom roles](/iam/docs/understanding-custom-roles). Example request   URL:   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles`  Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID.
         */
        parent?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$CreateRoleRequest;
    }
    export interface Params$Resource$Projects$Roles$Delete extends StandardParameters {
        /**
         * Used to perform a consistent read-modify-write.
         */
        etag?: string;
        /**
         * The `name` parameter's value depends on the target resource for the request, namely [`projects`](/iam/reference/rest/v1/projects.roles) or [`organizations`](/iam/reference/rest/v1/organizations.roles). Each resource type's `name` value format is described below:  * [`projects.roles.delete()`](/iam/reference/rest/v1/projects.roles/delete):   `projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`. This method deletes only   [custom roles](/iam/docs/understanding-custom-roles) that have been   created at the project level. Example request URL:   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`  * [`organizations.roles.delete()`](/iam/reference/rest/v1/organizations.roles/delete):   `organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`. This method   deletes only [custom roles](/iam/docs/understanding-custom-roles) that   have been created at the organization level. Example request URL:   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`  Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID.
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Roles$Get extends StandardParameters {
        /**
         * The `name` parameter's value depends on the target resource for the request, namely [`roles`](/iam/reference/rest/v1/roles), [`projects`](/iam/reference/rest/v1/projects.roles), or [`organizations`](/iam/reference/rest/v1/organizations.roles). Each resource type's `name` value format is described below:  * [`roles.get()`](/iam/reference/rest/v1/roles/get): `roles/{ROLE_NAME}`.   This method returns results from all   [predefined roles](/iam/docs/understanding-roles#predefined_roles) in   Cloud IAM. Example request URL:   `https://iam.googleapis.com/v1/roles/{ROLE_NAME}`  * [`projects.roles.get()`](/iam/reference/rest/v1/projects.roles/get):   `projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`. This method returns only   [custom roles](/iam/docs/understanding-custom-roles) that have been   created at the project level. Example request URL:   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`  * [`organizations.roles.get()`](/iam/reference/rest/v1/organizations.roles/get):   `organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`. This method   returns only [custom roles](/iam/docs/understanding-custom-roles) that   have been created at the organization level. Example request URL:   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`  Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID.
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Roles$List extends StandardParameters {
        /**
         * Optional limit on the number of roles to include in the response.
         */
        pageSize?: number;
        /**
         * Optional pagination token returned in an earlier ListRolesResponse.
         */
        pageToken?: string;
        /**
         * The `parent` parameter's value depends on the target resource for the request, namely [`roles`](/iam/reference/rest/v1/roles), [`projects`](/iam/reference/rest/v1/projects.roles), or [`organizations`](/iam/reference/rest/v1/organizations.roles). Each resource type's `parent` value format is described below:  * [`roles.list()`](/iam/reference/rest/v1/roles/list): An empty string.   This method doesn't require a resource; it simply returns all   [predefined roles](/iam/docs/understanding-roles#predefined_roles) in   Cloud IAM. Example request URL:   `https://iam.googleapis.com/v1/roles`  * [`projects.roles.list()`](/iam/reference/rest/v1/projects.roles/list):   `projects/{PROJECT_ID}`. This method lists all project-level   [custom roles](/iam/docs/understanding-custom-roles).   Example request URL:   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles`  * [`organizations.roles.list()`](/iam/reference/rest/v1/organizations.roles/list):   `organizations/{ORGANIZATION_ID}`. This method lists all   organization-level [custom roles](/iam/docs/understanding-custom-roles).   Example request URL:   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles`  Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID.
         */
        parent?: string;
        /**
         * Include Roles that have been deleted.
         */
        showDeleted?: boolean;
        /**
         * Optional view for the returned Role objects. When `FULL` is specified, the `includedPermissions` field is returned, which includes a list of all permissions in the role. The default value is `BASIC`, which does not return the `includedPermissions` field.
         */
        view?: string;
    }
    export interface Params$Resource$Projects$Roles$Patch extends StandardParameters {
        /**
         * The `name` parameter's value depends on the target resource for the request, namely [`projects`](/iam/reference/rest/v1/projects.roles) or [`organizations`](/iam/reference/rest/v1/organizations.roles). Each resource type's `name` value format is described below:  * [`projects.roles.patch()`](/iam/reference/rest/v1/projects.roles/patch):   `projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`. This method updates only   [custom roles](/iam/docs/understanding-custom-roles) that have been   created at the project level. Example request URL:   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`  * [`organizations.roles.patch()`](/iam/reference/rest/v1/organizations.roles/patch):   `organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`. This method   updates only [custom roles](/iam/docs/understanding-custom-roles) that   have been created at the organization level. Example request URL:   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`  Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID.
         */
        name?: string;
        /**
         * A mask describing which fields in the Role have changed.
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Role;
    }
    export interface Params$Resource$Projects$Roles$Undelete extends StandardParameters {
        /**
         * The `name` parameter's value depends on the target resource for the request, namely [`projects`](/iam/reference/rest/v1/projects.roles) or [`organizations`](/iam/reference/rest/v1/organizations.roles). Each resource type's `name` value format is described below:  * [`projects.roles.undelete()`](/iam/reference/rest/v1/projects.roles/undelete):   `projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`. This method undeletes   only [custom roles](/iam/docs/understanding-custom-roles) that have been   created at the project level. Example request URL:   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`  * [`organizations.roles.undelete()`](/iam/reference/rest/v1/organizations.roles/undelete):   `organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`. This method   undeletes only [custom roles](/iam/docs/understanding-custom-roles) that   have been created at the organization level. Example request URL:   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`  Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$UndeleteRoleRequest;
    }
    export class Resource$Projects$Serviceaccounts {
        context: APIRequestContext;
        keys: Resource$Projects$Serviceaccounts$Keys;
        constructor(context: APIRequestContext);
        /**
         * iam.projects.serviceAccounts.create
         * @desc Creates a ServiceAccount and returns it.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/iam.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const iam = google.iam('v1');
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
         *   const res = await iam.projects.serviceAccounts.create({
         *     // Required. The resource name of the project associated with the service
         *     // accounts, such as `projects/my-project-123`.
         *     name: 'projects/my-project',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "accountId": "my_accountId",
         *       //   "serviceAccount": {}
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "description": "my_description",
         *   //   "disabled": false,
         *   //   "displayName": "my_displayName",
         *   //   "email": "my_email",
         *   //   "etag": "my_etag",
         *   //   "name": "my_name",
         *   //   "oauth2ClientId": "my_oauth2ClientId",
         *   //   "projectId": "my_projectId",
         *   //   "uniqueId": "my_uniqueId"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias iam.projects.serviceAccounts.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the project associated with the service accounts, such as `projects/my-project-123`.
         * @param {().CreateServiceAccountRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Projects$Serviceaccounts$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Projects$Serviceaccounts$Create, options?: MethodOptions): GaxiosPromise<Schema$ServiceAccount>;
        create(params: Params$Resource$Projects$Serviceaccounts$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Projects$Serviceaccounts$Create, options: MethodOptions | BodyResponseCallback<Schema$ServiceAccount>, callback: BodyResponseCallback<Schema$ServiceAccount>): void;
        create(params: Params$Resource$Projects$Serviceaccounts$Create, callback: BodyResponseCallback<Schema$ServiceAccount>): void;
        create(callback: BodyResponseCallback<Schema$ServiceAccount>): void;
        /**
         * iam.projects.serviceAccounts.delete
         * @desc Deletes a ServiceAccount.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/iam.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const iam = google.iam('v1');
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
         *   const res = await iam.projects.serviceAccounts.delete({
         *     // Required. The resource name of the service account in the following format:
         *     // `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`.
         *     // Using `-` as a wildcard for the `PROJECT_ID` will infer the project from
         *     // the account. The `ACCOUNT` value can be the `email` address or the
         *     // `unique_id` of the service account.
         *     name: 'projects/my-project/serviceAccounts/my-serviceAccount',
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
         * @alias iam.projects.serviceAccounts.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the service account in the following format: `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`. Using `-` as a wildcard for the `PROJECT_ID` will infer the project from the account. The `ACCOUNT` value can be the `email` address or the `unique_id` of the service account.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Projects$Serviceaccounts$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Projects$Serviceaccounts$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Projects$Serviceaccounts$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Projects$Serviceaccounts$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Projects$Serviceaccounts$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * iam.projects.serviceAccounts.disable
         * @desc DisableServiceAccount is currently in the alpha launch stage.  Disables a ServiceAccount, which immediately prevents the service account from authenticating and gaining access to APIs.  Disabled service accounts can be safely restored by using EnableServiceAccount at any point. Deleted service accounts cannot be restored using this method.  Disabling a service account that is bound to VMs, Apps, Functions, or other jobs will cause those jobs to lose access to resources if they are using the disabled service account.  Previously issued Access tokens for a service account will be rejected while the service account is disabled but will start working again if the account is re-enabled. Issuance of new tokens will fail while the account is disabled.  To improve reliability of your services and avoid unexpected outages, it is recommended to first disable a service account rather than delete it. After disabling the service account, wait at least 24 hours to verify there are no unintended consequences, and then delete the service account.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/iam.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const iam = google.iam('v1');
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
         *   const res = await iam.projects.serviceAccounts.disable({
         *     // The resource name of the service account in the following format:
         *     // `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`.
         *     // Using `-` as a wildcard for the `PROJECT_ID` will infer the project from
         *     // the account. The `ACCOUNT` value can be the `email` address or the
         *     // `unique_id` of the service account.
         *     name: 'projects/my-project/serviceAccounts/my-serviceAccount',
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
         * @alias iam.projects.serviceAccounts.disable
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The resource name of the service account in the following format: `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`. Using `-` as a wildcard for the `PROJECT_ID` will infer the project from the account. The `ACCOUNT` value can be the `email` address or the `unique_id` of the service account.
         * @param {().DisableServiceAccountRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        disable(params: Params$Resource$Projects$Serviceaccounts$Disable, options: StreamMethodOptions): GaxiosPromise<Readable>;
        disable(params?: Params$Resource$Projects$Serviceaccounts$Disable, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        disable(params: Params$Resource$Projects$Serviceaccounts$Disable, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        disable(params: Params$Resource$Projects$Serviceaccounts$Disable, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        disable(params: Params$Resource$Projects$Serviceaccounts$Disable, callback: BodyResponseCallback<Schema$Empty>): void;
        disable(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * iam.projects.serviceAccounts.enable
         * @desc EnableServiceAccount is currently in the alpha launch stage.   Restores a disabled ServiceAccount  that has been manually disabled by using DisableServiceAccount. Service  accounts that have been disabled by other means or for other reasons,  such as abuse, cannot be restored using this method.   EnableServiceAccount will have no effect on a service account that is  not disabled.  Enabling an already enabled service account will have no  effect.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/iam.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const iam = google.iam('v1');
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
         *   const res = await iam.projects.serviceAccounts.enable({
         *     // The resource name of the service account in the following format:
         *     // `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`.
         *     // Using `-` as a wildcard for the `PROJECT_ID` will infer the project from
         *     // the account. The `ACCOUNT` value can be the `email` address or the
         *     // `unique_id` of the service account.
         *     name: 'projects/my-project/serviceAccounts/my-serviceAccount',
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
         * @alias iam.projects.serviceAccounts.enable
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The resource name of the service account in the following format: `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`. Using `-` as a wildcard for the `PROJECT_ID` will infer the project from the account. The `ACCOUNT` value can be the `email` address or the `unique_id` of the service account.
         * @param {().EnableServiceAccountRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        enable(params: Params$Resource$Projects$Serviceaccounts$Enable, options: StreamMethodOptions): GaxiosPromise<Readable>;
        enable(params?: Params$Resource$Projects$Serviceaccounts$Enable, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        enable(params: Params$Resource$Projects$Serviceaccounts$Enable, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        enable(params: Params$Resource$Projects$Serviceaccounts$Enable, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        enable(params: Params$Resource$Projects$Serviceaccounts$Enable, callback: BodyResponseCallback<Schema$Empty>): void;
        enable(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * iam.projects.serviceAccounts.get
         * @desc Gets a ServiceAccount.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/iam.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const iam = google.iam('v1');
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
         *   const res = await iam.projects.serviceAccounts.get({
         *     // Required. The resource name of the service account in the following format:
         *     // `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`.
         *     // Using `-` as a wildcard for the `PROJECT_ID` will infer the project from
         *     // the account. The `ACCOUNT` value can be the `email` address or the
         *     // `unique_id` of the service account.
         *     name: 'projects/my-project/serviceAccounts/my-serviceAccount',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "description": "my_description",
         *   //   "disabled": false,
         *   //   "displayName": "my_displayName",
         *   //   "email": "my_email",
         *   //   "etag": "my_etag",
         *   //   "name": "my_name",
         *   //   "oauth2ClientId": "my_oauth2ClientId",
         *   //   "projectId": "my_projectId",
         *   //   "uniqueId": "my_uniqueId"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias iam.projects.serviceAccounts.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the service account in the following format: `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`. Using `-` as a wildcard for the `PROJECT_ID` will infer the project from the account. The `ACCOUNT` value can be the `email` address or the `unique_id` of the service account.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Serviceaccounts$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Serviceaccounts$Get, options?: MethodOptions): GaxiosPromise<Schema$ServiceAccount>;
        get(params: Params$Resource$Projects$Serviceaccounts$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Serviceaccounts$Get, options: MethodOptions | BodyResponseCallback<Schema$ServiceAccount>, callback: BodyResponseCallback<Schema$ServiceAccount>): void;
        get(params: Params$Resource$Projects$Serviceaccounts$Get, callback: BodyResponseCallback<Schema$ServiceAccount>): void;
        get(callback: BodyResponseCallback<Schema$ServiceAccount>): void;
        /**
         * iam.projects.serviceAccounts.getIamPolicy
         * @desc Returns the Cloud IAM access control policy for a ServiceAccount.  Note: Service accounts are both [resources and identities](/iam/docs/service-accounts#service_account_permissions). This method treats the service account as a resource. It returns the Cloud IAM policy that reflects what members have access to the service account.  This method does not return what resources the service account has access to. To see if a service account has access to a resource, call the `getIamPolicy` method on the target resource. For example, to view grants for a project, call the [projects.getIamPolicy](/resource-manager/reference/rest/v1/projects/getIamPolicy) method.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/iam.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const iam = google.iam('v1');
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
         *   const res = await iam.projects.serviceAccounts.getIamPolicy({
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
         *     resource: 'projects/my-project/serviceAccounts/my-serviceAccount',
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
         * @alias iam.projects.serviceAccounts.getIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.options.requestedPolicyVersion Optional. The policy format version to be returned.  Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.  Requests for policies with any conditional bindings must specify version 3. Policies without any conditional bindings may specify any valid value or leave the field unset.  To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
         * @param {string} params.resource_ REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getIamPolicy(params: Params$Resource$Projects$Serviceaccounts$Getiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getIamPolicy(params?: Params$Resource$Projects$Serviceaccounts$Getiampolicy, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        getIamPolicy(params: Params$Resource$Projects$Serviceaccounts$Getiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getIamPolicy(params: Params$Resource$Projects$Serviceaccounts$Getiampolicy, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        getIamPolicy(params: Params$Resource$Projects$Serviceaccounts$Getiampolicy, callback: BodyResponseCallback<Schema$Policy>): void;
        getIamPolicy(callback: BodyResponseCallback<Schema$Policy>): void;
        /**
         * iam.projects.serviceAccounts.list
         * @desc Lists ServiceAccounts for a project.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/iam.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const iam = google.iam('v1');
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
         *   const res = await iam.projects.serviceAccounts.list({
         *     // Required. The resource name of the project associated with the service
         *     // accounts, such as `projects/my-project-123`.
         *     name: 'projects/my-project',
         *     // Optional limit on the number of service accounts to include in the
         *     // response. Further accounts can subsequently be obtained by including the
         *     // ListServiceAccountsResponse.next_page_token
         *     // in a subsequent request.
         *     pageSize: 'placeholder-value',
         *     // Optional pagination token returned in an earlier
         *     // ListServiceAccountsResponse.next_page_token.
         *     pageToken: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "accounts": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias iam.projects.serviceAccounts.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the project associated with the service accounts, such as `projects/my-project-123`.
         * @param {integer=} params.pageSize Optional limit on the number of service accounts to include in the response. Further accounts can subsequently be obtained by including the ListServiceAccountsResponse.next_page_token in a subsequent request.
         * @param {string=} params.pageToken Optional pagination token returned in an earlier ListServiceAccountsResponse.next_page_token.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Serviceaccounts$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Serviceaccounts$List, options?: MethodOptions): GaxiosPromise<Schema$ListServiceAccountsResponse>;
        list(params: Params$Resource$Projects$Serviceaccounts$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Serviceaccounts$List, options: MethodOptions | BodyResponseCallback<Schema$ListServiceAccountsResponse>, callback: BodyResponseCallback<Schema$ListServiceAccountsResponse>): void;
        list(params: Params$Resource$Projects$Serviceaccounts$List, callback: BodyResponseCallback<Schema$ListServiceAccountsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListServiceAccountsResponse>): void;
        /**
         * iam.projects.serviceAccounts.patch
         * @desc Patches a ServiceAccount.  Currently, only the following fields are updatable: `display_name` and `description`.  Only fields specified in the request are guaranteed to be returned in the response. Other fields in the response may be empty.  Note: The field mask is required.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/iam.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const iam = google.iam('v1');
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
         *   const res = await iam.projects.serviceAccounts.patch({
         *     // The resource name of the service account in the following format:
         *     // `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`.
         *     //
         *     // Requests using `-` as a wildcard for the `PROJECT_ID` will infer the
         *     // project from the `account` and the `ACCOUNT` value can be the `email`
         *     // address or the `unique_id` of the service account.
         *     //
         *     // In responses the resource name will always be in the format
         *     // `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`.
         *     name: 'projects/my-project/serviceAccounts/my-serviceAccount',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "serviceAccount": {},
         *       //   "updateMask": "my_updateMask"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "description": "my_description",
         *   //   "disabled": false,
         *   //   "displayName": "my_displayName",
         *   //   "email": "my_email",
         *   //   "etag": "my_etag",
         *   //   "name": "my_name",
         *   //   "oauth2ClientId": "my_oauth2ClientId",
         *   //   "projectId": "my_projectId",
         *   //   "uniqueId": "my_uniqueId"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias iam.projects.serviceAccounts.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The resource name of the service account in the following format: `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`.  Requests using `-` as a wildcard for the `PROJECT_ID` will infer the project from the `account` and the `ACCOUNT` value can be the `email` address or the `unique_id` of the service account.  In responses the resource name will always be in the format `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`.
         * @param {().PatchServiceAccountRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Projects$Serviceaccounts$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Projects$Serviceaccounts$Patch, options?: MethodOptions): GaxiosPromise<Schema$ServiceAccount>;
        patch(params: Params$Resource$Projects$Serviceaccounts$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Projects$Serviceaccounts$Patch, options: MethodOptions | BodyResponseCallback<Schema$ServiceAccount>, callback: BodyResponseCallback<Schema$ServiceAccount>): void;
        patch(params: Params$Resource$Projects$Serviceaccounts$Patch, callback: BodyResponseCallback<Schema$ServiceAccount>): void;
        patch(callback: BodyResponseCallback<Schema$ServiceAccount>): void;
        /**
         * iam.projects.serviceAccounts.setIamPolicy
         * @desc Sets the Cloud IAM access control policy for a ServiceAccount.  Note: Service accounts are both [resources and identities](/iam/docs/service-accounts#service_account_permissions). This method treats the service account as a resource. Use it to grant members access to the service account, such as when they need to impersonate it.  This method does not grant the service account access to other resources, such as projects. To grant a service account access to resources, include the service account in the Cloud IAM policy for the desired resource, then call the appropriate `setIamPolicy` method on the target resource. For example, to grant a service account access to a project, call the [projects.setIamPolicy](/resource-manager/reference/rest/v1/projects/setIamPolicy) method.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/iam.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const iam = google.iam('v1');
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
         *   const res = await iam.projects.serviceAccounts.setIamPolicy({
         *     // REQUIRED: The resource for which the policy is being specified.
         *     // See the operation documentation for the appropriate value for this field.
         *     resource: 'projects/my-project/serviceAccounts/my-serviceAccount',
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
         * @alias iam.projects.serviceAccounts.setIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         * @param {().SetIamPolicyRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        setIamPolicy(params: Params$Resource$Projects$Serviceaccounts$Setiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        setIamPolicy(params?: Params$Resource$Projects$Serviceaccounts$Setiampolicy, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        setIamPolicy(params: Params$Resource$Projects$Serviceaccounts$Setiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        setIamPolicy(params: Params$Resource$Projects$Serviceaccounts$Setiampolicy, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        setIamPolicy(params: Params$Resource$Projects$Serviceaccounts$Setiampolicy, callback: BodyResponseCallback<Schema$Policy>): void;
        setIamPolicy(callback: BodyResponseCallback<Schema$Policy>): void;
        /**
         * iam.projects.serviceAccounts.signBlob
         * @desc **Note**: This method is in the process of being deprecated. Call the [`signBlob()`](/iam/credentials/reference/rest/v1/projects.serviceAccounts/signBlob) method of the Cloud IAM Service Account Credentials API instead.  Signs a blob using a service account's system-managed private key.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/iam.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const iam = google.iam('v1');
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
         *   const res = await iam.projects.serviceAccounts.signBlob({
         *     // Required. The resource name of the service account in the following format:
         *     // `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`.
         *     // Using `-` as a wildcard for the `PROJECT_ID` will infer the project from
         *     // the account. The `ACCOUNT` value can be the `email` address or the
         *     // `unique_id` of the service account.
         *     name: 'projects/my-project/serviceAccounts/my-serviceAccount',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "bytesToSign": "my_bytesToSign"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "keyId": "my_keyId",
         *   //   "signature": "my_signature"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias iam.projects.serviceAccounts.signBlob
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the service account in the following format: `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`. Using `-` as a wildcard for the `PROJECT_ID` will infer the project from the account. The `ACCOUNT` value can be the `email` address or the `unique_id` of the service account.
         * @param {().SignBlobRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        signBlob(params: Params$Resource$Projects$Serviceaccounts$Signblob, options: StreamMethodOptions): GaxiosPromise<Readable>;
        signBlob(params?: Params$Resource$Projects$Serviceaccounts$Signblob, options?: MethodOptions): GaxiosPromise<Schema$SignBlobResponse>;
        signBlob(params: Params$Resource$Projects$Serviceaccounts$Signblob, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        signBlob(params: Params$Resource$Projects$Serviceaccounts$Signblob, options: MethodOptions | BodyResponseCallback<Schema$SignBlobResponse>, callback: BodyResponseCallback<Schema$SignBlobResponse>): void;
        signBlob(params: Params$Resource$Projects$Serviceaccounts$Signblob, callback: BodyResponseCallback<Schema$SignBlobResponse>): void;
        signBlob(callback: BodyResponseCallback<Schema$SignBlobResponse>): void;
        /**
         * iam.projects.serviceAccounts.signJwt
         * @desc **Note**: This method is in the process of being deprecated. Call the [`signJwt()`](/iam/credentials/reference/rest/v1/projects.serviceAccounts/signJwt) method of the Cloud IAM Service Account Credentials API instead.  Signs a JWT using a service account's system-managed private key.  If no expiry time (`exp`) is provided in the `SignJwtRequest`, IAM sets an an expiry time of one hour by default. If you request an expiry time of more than one hour, the request will fail.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/iam.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const iam = google.iam('v1');
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
         *   const res = await iam.projects.serviceAccounts.signJwt({
         *     // Required. The resource name of the service account in the following format:
         *     // `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`.
         *     // Using `-` as a wildcard for the `PROJECT_ID` will infer the project from
         *     // the account. The `ACCOUNT` value can be the `email` address or the
         *     // `unique_id` of the service account.
         *     name: 'projects/my-project/serviceAccounts/my-serviceAccount',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "payload": "my_payload"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "keyId": "my_keyId",
         *   //   "signedJwt": "my_signedJwt"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias iam.projects.serviceAccounts.signJwt
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the service account in the following format: `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`. Using `-` as a wildcard for the `PROJECT_ID` will infer the project from the account. The `ACCOUNT` value can be the `email` address or the `unique_id` of the service account.
         * @param {().SignJwtRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        signJwt(params: Params$Resource$Projects$Serviceaccounts$Signjwt, options: StreamMethodOptions): GaxiosPromise<Readable>;
        signJwt(params?: Params$Resource$Projects$Serviceaccounts$Signjwt, options?: MethodOptions): GaxiosPromise<Schema$SignJwtResponse>;
        signJwt(params: Params$Resource$Projects$Serviceaccounts$Signjwt, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        signJwt(params: Params$Resource$Projects$Serviceaccounts$Signjwt, options: MethodOptions | BodyResponseCallback<Schema$SignJwtResponse>, callback: BodyResponseCallback<Schema$SignJwtResponse>): void;
        signJwt(params: Params$Resource$Projects$Serviceaccounts$Signjwt, callback: BodyResponseCallback<Schema$SignJwtResponse>): void;
        signJwt(callback: BodyResponseCallback<Schema$SignJwtResponse>): void;
        /**
         * iam.projects.serviceAccounts.testIamPermissions
         * @desc Tests the specified permissions against the IAM access control policy for a ServiceAccount.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/iam.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const iam = google.iam('v1');
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
         *   const res = await iam.projects.serviceAccounts.testIamPermissions({
         *     // REQUIRED: The resource for which the policy detail is being requested.
         *     // See the operation documentation for the appropriate value for this field.
         *     resource: 'projects/my-project/serviceAccounts/my-serviceAccount',
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
         * @alias iam.projects.serviceAccounts.testIamPermissions
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         * @param {().TestIamPermissionsRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        testIamPermissions(params: Params$Resource$Projects$Serviceaccounts$Testiampermissions, options: StreamMethodOptions): GaxiosPromise<Readable>;
        testIamPermissions(params?: Params$Resource$Projects$Serviceaccounts$Testiampermissions, options?: MethodOptions): GaxiosPromise<Schema$TestIamPermissionsResponse>;
        testIamPermissions(params: Params$Resource$Projects$Serviceaccounts$Testiampermissions, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        testIamPermissions(params: Params$Resource$Projects$Serviceaccounts$Testiampermissions, options: MethodOptions | BodyResponseCallback<Schema$TestIamPermissionsResponse>, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(params: Params$Resource$Projects$Serviceaccounts$Testiampermissions, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        /**
         * iam.projects.serviceAccounts.undelete
         * @desc Restores a deleted ServiceAccount. This is to be used as an action of last resort.  A service account may not always be restorable.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/iam.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const iam = google.iam('v1');
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
         *   const res = await iam.projects.serviceAccounts.undelete({
         *     // The resource name of the service account in the following format:
         *     // `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT_UNIQUE_ID}`.
         *     // Using `-` as a wildcard for the `PROJECT_ID` will infer the project from
         *     // the account.
         *     name: 'projects/my-project/serviceAccounts/my-serviceAccount',
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
         *   // {
         *   //   "restoredAccount": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias iam.projects.serviceAccounts.undelete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The resource name of the service account in the following format: `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT_UNIQUE_ID}`. Using `-` as a wildcard for the `PROJECT_ID` will infer the project from the account.
         * @param {().UndeleteServiceAccountRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        undelete(params: Params$Resource$Projects$Serviceaccounts$Undelete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        undelete(params?: Params$Resource$Projects$Serviceaccounts$Undelete, options?: MethodOptions): GaxiosPromise<Schema$UndeleteServiceAccountResponse>;
        undelete(params: Params$Resource$Projects$Serviceaccounts$Undelete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        undelete(params: Params$Resource$Projects$Serviceaccounts$Undelete, options: MethodOptions | BodyResponseCallback<Schema$UndeleteServiceAccountResponse>, callback: BodyResponseCallback<Schema$UndeleteServiceAccountResponse>): void;
        undelete(params: Params$Resource$Projects$Serviceaccounts$Undelete, callback: BodyResponseCallback<Schema$UndeleteServiceAccountResponse>): void;
        undelete(callback: BodyResponseCallback<Schema$UndeleteServiceAccountResponse>): void;
        /**
         * iam.projects.serviceAccounts.update
         * @desc Note: This method is in the process of being deprecated. Use PatchServiceAccount instead.  Updates a ServiceAccount.  Currently, only the following fields are updatable: `display_name` and `description`.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/iam.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const iam = google.iam('v1');
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
         *   const res = await iam.projects.serviceAccounts.update({
         *     // The resource name of the service account in the following format:
         *     // `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`.
         *     //
         *     // Requests using `-` as a wildcard for the `PROJECT_ID` will infer the
         *     // project from the `account` and the `ACCOUNT` value can be the `email`
         *     // address or the `unique_id` of the service account.
         *     //
         *     // In responses the resource name will always be in the format
         *     // `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`.
         *     name: 'projects/my-project/serviceAccounts/my-serviceAccount',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "description": "my_description",
         *       //   "disabled": false,
         *       //   "displayName": "my_displayName",
         *       //   "email": "my_email",
         *       //   "etag": "my_etag",
         *       //   "name": "my_name",
         *       //   "oauth2ClientId": "my_oauth2ClientId",
         *       //   "projectId": "my_projectId",
         *       //   "uniqueId": "my_uniqueId"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "description": "my_description",
         *   //   "disabled": false,
         *   //   "displayName": "my_displayName",
         *   //   "email": "my_email",
         *   //   "etag": "my_etag",
         *   //   "name": "my_name",
         *   //   "oauth2ClientId": "my_oauth2ClientId",
         *   //   "projectId": "my_projectId",
         *   //   "uniqueId": "my_uniqueId"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias iam.projects.serviceAccounts.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The resource name of the service account in the following format: `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`.  Requests using `-` as a wildcard for the `PROJECT_ID` will infer the project from the `account` and the `ACCOUNT` value can be the `email` address or the `unique_id` of the service account.  In responses the resource name will always be in the format `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`.
         * @param {().ServiceAccount} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Projects$Serviceaccounts$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Projects$Serviceaccounts$Update, options?: MethodOptions): GaxiosPromise<Schema$ServiceAccount>;
        update(params: Params$Resource$Projects$Serviceaccounts$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Projects$Serviceaccounts$Update, options: MethodOptions | BodyResponseCallback<Schema$ServiceAccount>, callback: BodyResponseCallback<Schema$ServiceAccount>): void;
        update(params: Params$Resource$Projects$Serviceaccounts$Update, callback: BodyResponseCallback<Schema$ServiceAccount>): void;
        update(callback: BodyResponseCallback<Schema$ServiceAccount>): void;
    }
    export interface Params$Resource$Projects$Serviceaccounts$Create extends StandardParameters {
        /**
         * Required. The resource name of the project associated with the service accounts, such as `projects/my-project-123`.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$CreateServiceAccountRequest;
    }
    export interface Params$Resource$Projects$Serviceaccounts$Delete extends StandardParameters {
        /**
         * Required. The resource name of the service account in the following format: `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`. Using `-` as a wildcard for the `PROJECT_ID` will infer the project from the account. The `ACCOUNT` value can be the `email` address or the `unique_id` of the service account.
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Serviceaccounts$Disable extends StandardParameters {
        /**
         * The resource name of the service account in the following format: `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`. Using `-` as a wildcard for the `PROJECT_ID` will infer the project from the account. The `ACCOUNT` value can be the `email` address or the `unique_id` of the service account.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$DisableServiceAccountRequest;
    }
    export interface Params$Resource$Projects$Serviceaccounts$Enable extends StandardParameters {
        /**
         * The resource name of the service account in the following format: `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`. Using `-` as a wildcard for the `PROJECT_ID` will infer the project from the account. The `ACCOUNT` value can be the `email` address or the `unique_id` of the service account.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$EnableServiceAccountRequest;
    }
    export interface Params$Resource$Projects$Serviceaccounts$Get extends StandardParameters {
        /**
         * Required. The resource name of the service account in the following format: `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`. Using `-` as a wildcard for the `PROJECT_ID` will infer the project from the account. The `ACCOUNT` value can be the `email` address or the `unique_id` of the service account.
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Serviceaccounts$Getiampolicy extends StandardParameters {
        /**
         * Optional. The policy format version to be returned.  Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.  Requests for policies with any conditional bindings must specify version 3. Policies without any conditional bindings may specify any valid value or leave the field unset.  To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
         */
        'options.requestedPolicyVersion'?: number;
        /**
         * REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
    }
    export interface Params$Resource$Projects$Serviceaccounts$List extends StandardParameters {
        /**
         * Required. The resource name of the project associated with the service accounts, such as `projects/my-project-123`.
         */
        name?: string;
        /**
         * Optional limit on the number of service accounts to include in the response. Further accounts can subsequently be obtained by including the ListServiceAccountsResponse.next_page_token in a subsequent request.
         */
        pageSize?: number;
        /**
         * Optional pagination token returned in an earlier ListServiceAccountsResponse.next_page_token.
         */
        pageToken?: string;
    }
    export interface Params$Resource$Projects$Serviceaccounts$Patch extends StandardParameters {
        /**
         * The resource name of the service account in the following format: `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`.  Requests using `-` as a wildcard for the `PROJECT_ID` will infer the project from the `account` and the `ACCOUNT` value can be the `email` address or the `unique_id` of the service account.  In responses the resource name will always be in the format `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$PatchServiceAccountRequest;
    }
    export interface Params$Resource$Projects$Serviceaccounts$Setiampolicy extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$SetIamPolicyRequest;
    }
    export interface Params$Resource$Projects$Serviceaccounts$Signblob extends StandardParameters {
        /**
         * Required. The resource name of the service account in the following format: `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`. Using `-` as a wildcard for the `PROJECT_ID` will infer the project from the account. The `ACCOUNT` value can be the `email` address or the `unique_id` of the service account.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$SignBlobRequest;
    }
    export interface Params$Resource$Projects$Serviceaccounts$Signjwt extends StandardParameters {
        /**
         * Required. The resource name of the service account in the following format: `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`. Using `-` as a wildcard for the `PROJECT_ID` will infer the project from the account. The `ACCOUNT` value can be the `email` address or the `unique_id` of the service account.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$SignJwtRequest;
    }
    export interface Params$Resource$Projects$Serviceaccounts$Testiampermissions extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$TestIamPermissionsRequest;
    }
    export interface Params$Resource$Projects$Serviceaccounts$Undelete extends StandardParameters {
        /**
         * The resource name of the service account in the following format: `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT_UNIQUE_ID}`. Using `-` as a wildcard for the `PROJECT_ID` will infer the project from the account.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$UndeleteServiceAccountRequest;
    }
    export interface Params$Resource$Projects$Serviceaccounts$Update extends StandardParameters {
        /**
         * The resource name of the service account in the following format: `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`.  Requests using `-` as a wildcard for the `PROJECT_ID` will infer the project from the `account` and the `ACCOUNT` value can be the `email` address or the `unique_id` of the service account.  In responses the resource name will always be in the format `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ServiceAccount;
    }
    export class Resource$Projects$Serviceaccounts$Keys {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * iam.projects.serviceAccounts.keys.create
         * @desc Creates a ServiceAccountKey and returns it.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/iam.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const iam = google.iam('v1');
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
         *   const res = await iam.projects.serviceAccounts.keys.create({
         *     // Required. The resource name of the service account in the following format:
         *     // `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`.
         *     // Using `-` as a wildcard for the `PROJECT_ID` will infer the project from
         *     // the account. The `ACCOUNT` value can be the `email` address or the
         *     // `unique_id` of the service account.
         *     name: 'projects/my-project/serviceAccounts/my-serviceAccount',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "keyAlgorithm": "my_keyAlgorithm",
         *       //   "privateKeyType": "my_privateKeyType"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "keyAlgorithm": "my_keyAlgorithm",
         *   //   "keyOrigin": "my_keyOrigin",
         *   //   "keyType": "my_keyType",
         *   //   "name": "my_name",
         *   //   "privateKeyData": "my_privateKeyData",
         *   //   "privateKeyType": "my_privateKeyType",
         *   //   "publicKeyData": "my_publicKeyData",
         *   //   "validAfterTime": "my_validAfterTime",
         *   //   "validBeforeTime": "my_validBeforeTime"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias iam.projects.serviceAccounts.keys.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the service account in the following format: `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`. Using `-` as a wildcard for the `PROJECT_ID` will infer the project from the account. The `ACCOUNT` value can be the `email` address or the `unique_id` of the service account.
         * @param {().CreateServiceAccountKeyRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Projects$Serviceaccounts$Keys$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Projects$Serviceaccounts$Keys$Create, options?: MethodOptions): GaxiosPromise<Schema$ServiceAccountKey>;
        create(params: Params$Resource$Projects$Serviceaccounts$Keys$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Projects$Serviceaccounts$Keys$Create, options: MethodOptions | BodyResponseCallback<Schema$ServiceAccountKey>, callback: BodyResponseCallback<Schema$ServiceAccountKey>): void;
        create(params: Params$Resource$Projects$Serviceaccounts$Keys$Create, callback: BodyResponseCallback<Schema$ServiceAccountKey>): void;
        create(callback: BodyResponseCallback<Schema$ServiceAccountKey>): void;
        /**
         * iam.projects.serviceAccounts.keys.delete
         * @desc Deletes a ServiceAccountKey.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/iam.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const iam = google.iam('v1');
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
         *   const res = await iam.projects.serviceAccounts.keys.delete({
         *     // Required. The resource name of the service account key in the following format:
         *     // `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}/keys/{key}`.
         *     // Using `-` as a wildcard for the `PROJECT_ID` will infer the project from
         *     // the account. The `ACCOUNT` value can be the `email` address or the
         *     // `unique_id` of the service account.
         *     name: 'projects/my-project/serviceAccounts/my-serviceAccount/keys/my-key',
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
         * @alias iam.projects.serviceAccounts.keys.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the service account key in the following format: `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}/keys/{key}`. Using `-` as a wildcard for the `PROJECT_ID` will infer the project from the account. The `ACCOUNT` value can be the `email` address or the `unique_id` of the service account.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Projects$Serviceaccounts$Keys$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Projects$Serviceaccounts$Keys$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Projects$Serviceaccounts$Keys$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Projects$Serviceaccounts$Keys$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Projects$Serviceaccounts$Keys$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * iam.projects.serviceAccounts.keys.get
         * @desc Gets the ServiceAccountKey by key id.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/iam.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const iam = google.iam('v1');
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
         *   const res = await iam.projects.serviceAccounts.keys.get({
         *     // Required. The resource name of the service account key in the following format:
         *     // `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}/keys/{key}`.
         *     //
         *     // Using `-` as a wildcard for the `PROJECT_ID` will infer the project from
         *     // the account. The `ACCOUNT` value can be the `email` address or the
         *     // `unique_id` of the service account.
         *     name: 'projects/my-project/serviceAccounts/my-serviceAccount/keys/my-key',
         *     // The output format of the public key requested.
         *     // X509_PEM is the default output format.
         *     publicKeyType: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "keyAlgorithm": "my_keyAlgorithm",
         *   //   "keyOrigin": "my_keyOrigin",
         *   //   "keyType": "my_keyType",
         *   //   "name": "my_name",
         *   //   "privateKeyData": "my_privateKeyData",
         *   //   "privateKeyType": "my_privateKeyType",
         *   //   "publicKeyData": "my_publicKeyData",
         *   //   "validAfterTime": "my_validAfterTime",
         *   //   "validBeforeTime": "my_validBeforeTime"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias iam.projects.serviceAccounts.keys.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the service account key in the following format: `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}/keys/{key}`.  Using `-` as a wildcard for the `PROJECT_ID` will infer the project from the account. The `ACCOUNT` value can be the `email` address or the `unique_id` of the service account.
         * @param {string=} params.publicKeyType The output format of the public key requested. X509_PEM is the default output format.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Serviceaccounts$Keys$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Serviceaccounts$Keys$Get, options?: MethodOptions): GaxiosPromise<Schema$ServiceAccountKey>;
        get(params: Params$Resource$Projects$Serviceaccounts$Keys$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Serviceaccounts$Keys$Get, options: MethodOptions | BodyResponseCallback<Schema$ServiceAccountKey>, callback: BodyResponseCallback<Schema$ServiceAccountKey>): void;
        get(params: Params$Resource$Projects$Serviceaccounts$Keys$Get, callback: BodyResponseCallback<Schema$ServiceAccountKey>): void;
        get(callback: BodyResponseCallback<Schema$ServiceAccountKey>): void;
        /**
         * iam.projects.serviceAccounts.keys.list
         * @desc Lists ServiceAccountKeys.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/iam.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const iam = google.iam('v1');
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
         *   const res = await iam.projects.serviceAccounts.keys.list({
         *     // Filters the types of keys the user wants to include in the list
         *     // response. Duplicate key types are not allowed. If no key type
         *     // is provided, all keys are returned.
         *     keyTypes: 'placeholder-value',
         *     // Required. The resource name of the service account in the following format:
         *     // `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`.
         *     //
         *     // Using `-` as a wildcard for the `PROJECT_ID`, will infer the project from
         *     // the account. The `ACCOUNT` value can be the `email` address or the
         *     // `unique_id` of the service account.
         *     name: 'projects/my-project/serviceAccounts/my-serviceAccount',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "keys": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias iam.projects.serviceAccounts.keys.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.keyTypes Filters the types of keys the user wants to include in the list response. Duplicate key types are not allowed. If no key type is provided, all keys are returned.
         * @param {string} params.name Required. The resource name of the service account in the following format: `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`.  Using `-` as a wildcard for the `PROJECT_ID`, will infer the project from the account. The `ACCOUNT` value can be the `email` address or the `unique_id` of the service account.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Serviceaccounts$Keys$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Serviceaccounts$Keys$List, options?: MethodOptions): GaxiosPromise<Schema$ListServiceAccountKeysResponse>;
        list(params: Params$Resource$Projects$Serviceaccounts$Keys$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Serviceaccounts$Keys$List, options: MethodOptions | BodyResponseCallback<Schema$ListServiceAccountKeysResponse>, callback: BodyResponseCallback<Schema$ListServiceAccountKeysResponse>): void;
        list(params: Params$Resource$Projects$Serviceaccounts$Keys$List, callback: BodyResponseCallback<Schema$ListServiceAccountKeysResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListServiceAccountKeysResponse>): void;
        /**
         * iam.projects.serviceAccounts.keys.upload
         * @desc Upload public key for a given service account. This rpc will create a ServiceAccountKey that has the provided public key and returns it.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/iam.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const iam = google.iam('v1');
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
         *   const res = await iam.projects.serviceAccounts.keys.upload({
         *     // The resource name of the service account in the following format:
         *     // `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`.
         *     // Using `-` as a wildcard for the `PROJECT_ID` will infer the project from
         *     // the account. The `ACCOUNT` value can be the `email` address or the
         *     // `unique_id` of the service account.
         *     name: 'projects/my-project/serviceAccounts/my-serviceAccount',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "publicKeyData": "my_publicKeyData"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "keyAlgorithm": "my_keyAlgorithm",
         *   //   "keyOrigin": "my_keyOrigin",
         *   //   "keyType": "my_keyType",
         *   //   "name": "my_name",
         *   //   "privateKeyData": "my_privateKeyData",
         *   //   "privateKeyType": "my_privateKeyType",
         *   //   "publicKeyData": "my_publicKeyData",
         *   //   "validAfterTime": "my_validAfterTime",
         *   //   "validBeforeTime": "my_validBeforeTime"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias iam.projects.serviceAccounts.keys.upload
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The resource name of the service account in the following format: `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`. Using `-` as a wildcard for the `PROJECT_ID` will infer the project from the account. The `ACCOUNT` value can be the `email` address or the `unique_id` of the service account.
         * @param {().UploadServiceAccountKeyRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        upload(params: Params$Resource$Projects$Serviceaccounts$Keys$Upload, options: StreamMethodOptions): GaxiosPromise<Readable>;
        upload(params?: Params$Resource$Projects$Serviceaccounts$Keys$Upload, options?: MethodOptions): GaxiosPromise<Schema$ServiceAccountKey>;
        upload(params: Params$Resource$Projects$Serviceaccounts$Keys$Upload, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        upload(params: Params$Resource$Projects$Serviceaccounts$Keys$Upload, options: MethodOptions | BodyResponseCallback<Schema$ServiceAccountKey>, callback: BodyResponseCallback<Schema$ServiceAccountKey>): void;
        upload(params: Params$Resource$Projects$Serviceaccounts$Keys$Upload, callback: BodyResponseCallback<Schema$ServiceAccountKey>): void;
        upload(callback: BodyResponseCallback<Schema$ServiceAccountKey>): void;
    }
    export interface Params$Resource$Projects$Serviceaccounts$Keys$Create extends StandardParameters {
        /**
         * Required. The resource name of the service account in the following format: `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`. Using `-` as a wildcard for the `PROJECT_ID` will infer the project from the account. The `ACCOUNT` value can be the `email` address or the `unique_id` of the service account.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$CreateServiceAccountKeyRequest;
    }
    export interface Params$Resource$Projects$Serviceaccounts$Keys$Delete extends StandardParameters {
        /**
         * Required. The resource name of the service account key in the following format: `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}/keys/{key}`. Using `-` as a wildcard for the `PROJECT_ID` will infer the project from the account. The `ACCOUNT` value can be the `email` address or the `unique_id` of the service account.
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Serviceaccounts$Keys$Get extends StandardParameters {
        /**
         * Required. The resource name of the service account key in the following format: `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}/keys/{key}`.  Using `-` as a wildcard for the `PROJECT_ID` will infer the project from the account. The `ACCOUNT` value can be the `email` address or the `unique_id` of the service account.
         */
        name?: string;
        /**
         * The output format of the public key requested. X509_PEM is the default output format.
         */
        publicKeyType?: string;
    }
    export interface Params$Resource$Projects$Serviceaccounts$Keys$List extends StandardParameters {
        /**
         * Filters the types of keys the user wants to include in the list response. Duplicate key types are not allowed. If no key type is provided, all keys are returned.
         */
        keyTypes?: string[];
        /**
         * Required. The resource name of the service account in the following format: `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`.  Using `-` as a wildcard for the `PROJECT_ID`, will infer the project from the account. The `ACCOUNT` value can be the `email` address or the `unique_id` of the service account.
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Serviceaccounts$Keys$Upload extends StandardParameters {
        /**
         * The resource name of the service account in the following format: `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`. Using `-` as a wildcard for the `PROJECT_ID` will infer the project from the account. The `ACCOUNT` value can be the `email` address or the `unique_id` of the service account.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$UploadServiceAccountKeyRequest;
    }
    export class Resource$Roles {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * iam.roles.get
         * @desc Gets a Role definition.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/iam.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const iam = google.iam('v1');
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
         *   const res = await iam.roles.get({
         *     // The `name` parameter's value depends on the target resource for the
         *     // request, namely
         *     // [`roles`](/iam/reference/rest/v1/roles),
         *     // [`projects`](/iam/reference/rest/v1/projects.roles), or
         *     // [`organizations`](/iam/reference/rest/v1/organizations.roles). Each
         *     // resource type's `name` value format is described below:
         *     //
         *     // * [`roles.get()`](/iam/reference/rest/v1/roles/get): `roles/{ROLE_NAME}`.
         *     //   This method returns results from all
         *     //   [predefined roles](/iam/docs/understanding-roles#predefined_roles) in
         *     //   Cloud IAM. Example request URL:
         *     //   `https://iam.googleapis.com/v1/roles/{ROLE_NAME}`
         *     //
         *     // * [`projects.roles.get()`](/iam/reference/rest/v1/projects.roles/get):
         *     //   `projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`. This method returns only
         *     //   [custom roles](/iam/docs/understanding-custom-roles) that have been
         *     //   created at the project level. Example request URL:
         *     //   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`
         *     //
         *     // * [`organizations.roles.get()`](/iam/reference/rest/v1/organizations.roles/get):
         *     //   `organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`. This method
         *     //   returns only [custom roles](/iam/docs/understanding-custom-roles) that
         *     //   have been created at the organization level. Example request URL:
         *     //   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`
         *     //
         *     // Note: Wildcard (*) values are invalid; you must specify a complete project
         *     // ID or organization ID.
         *     name: 'roles/my-role',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "deleted": false,
         *   //   "description": "my_description",
         *   //   "etag": "my_etag",
         *   //   "includedPermissions": [],
         *   //   "name": "my_name",
         *   //   "stage": "my_stage",
         *   //   "title": "my_title"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias iam.roles.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The `name` parameter's value depends on the target resource for the request, namely [`roles`](/iam/reference/rest/v1/roles), [`projects`](/iam/reference/rest/v1/projects.roles), or [`organizations`](/iam/reference/rest/v1/organizations.roles). Each resource type's `name` value format is described below:  * [`roles.get()`](/iam/reference/rest/v1/roles/get): `roles/{ROLE_NAME}`.   This method returns results from all   [predefined roles](/iam/docs/understanding-roles#predefined_roles) in   Cloud IAM. Example request URL:   `https://iam.googleapis.com/v1/roles/{ROLE_NAME}`  * [`projects.roles.get()`](/iam/reference/rest/v1/projects.roles/get):   `projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`. This method returns only   [custom roles](/iam/docs/understanding-custom-roles) that have been   created at the project level. Example request URL:   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`  * [`organizations.roles.get()`](/iam/reference/rest/v1/organizations.roles/get):   `organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`. This method   returns only [custom roles](/iam/docs/understanding-custom-roles) that   have been created at the organization level. Example request URL:   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`  Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Roles$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Roles$Get, options?: MethodOptions): GaxiosPromise<Schema$Role>;
        get(params: Params$Resource$Roles$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Roles$Get, options: MethodOptions | BodyResponseCallback<Schema$Role>, callback: BodyResponseCallback<Schema$Role>): void;
        get(params: Params$Resource$Roles$Get, callback: BodyResponseCallback<Schema$Role>): void;
        get(callback: BodyResponseCallback<Schema$Role>): void;
        /**
         * iam.roles.list
         * @desc Lists the Roles defined on a resource.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/iam.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const iam = google.iam('v1');
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
         *   const res = await iam.roles.list({
         *     // Optional limit on the number of roles to include in the response.
         *     pageSize: 'placeholder-value',
         *     // Optional pagination token returned in an earlier ListRolesResponse.
         *     pageToken: 'placeholder-value',
         *     // The `parent` parameter's value depends on the target resource for the
         *     // request, namely
         *     // [`roles`](/iam/reference/rest/v1/roles),
         *     // [`projects`](/iam/reference/rest/v1/projects.roles), or
         *     // [`organizations`](/iam/reference/rest/v1/organizations.roles). Each
         *     // resource type's `parent` value format is described below:
         *     //
         *     // * [`roles.list()`](/iam/reference/rest/v1/roles/list): An empty string.
         *     //   This method doesn't require a resource; it simply returns all
         *     //   [predefined roles](/iam/docs/understanding-roles#predefined_roles) in
         *     //   Cloud IAM. Example request URL:
         *     //   `https://iam.googleapis.com/v1/roles`
         *     //
         *     // * [`projects.roles.list()`](/iam/reference/rest/v1/projects.roles/list):
         *     //   `projects/{PROJECT_ID}`. This method lists all project-level
         *     //   [custom roles](/iam/docs/understanding-custom-roles).
         *     //   Example request URL:
         *     //   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles`
         *     //
         *     // * [`organizations.roles.list()`](/iam/reference/rest/v1/organizations.roles/list):
         *     //   `organizations/{ORGANIZATION_ID}`. This method lists all
         *     //   organization-level [custom roles](/iam/docs/understanding-custom-roles).
         *     //   Example request URL:
         *     //   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles`
         *     //
         *     // Note: Wildcard (*) values are invalid; you must specify a complete project
         *     // ID or organization ID.
         *     parent: 'placeholder-value',
         *     // Include Roles that have been deleted.
         *     showDeleted: 'placeholder-value',
         *     // Optional view for the returned Role objects. When `FULL` is specified,
         *     // the `includedPermissions` field is returned, which includes a list of all
         *     // permissions in the role. The default value is `BASIC`, which does not
         *     // return the `includedPermissions` field.
         *     view: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "roles": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias iam.roles.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize Optional limit on the number of roles to include in the response.
         * @param {string=} params.pageToken Optional pagination token returned in an earlier ListRolesResponse.
         * @param {string=} params.parent The `parent` parameter's value depends on the target resource for the request, namely [`roles`](/iam/reference/rest/v1/roles), [`projects`](/iam/reference/rest/v1/projects.roles), or [`organizations`](/iam/reference/rest/v1/organizations.roles). Each resource type's `parent` value format is described below:  * [`roles.list()`](/iam/reference/rest/v1/roles/list): An empty string.   This method doesn't require a resource; it simply returns all   [predefined roles](/iam/docs/understanding-roles#predefined_roles) in   Cloud IAM. Example request URL:   `https://iam.googleapis.com/v1/roles`  * [`projects.roles.list()`](/iam/reference/rest/v1/projects.roles/list):   `projects/{PROJECT_ID}`. This method lists all project-level   [custom roles](/iam/docs/understanding-custom-roles).   Example request URL:   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles`  * [`organizations.roles.list()`](/iam/reference/rest/v1/organizations.roles/list):   `organizations/{ORGANIZATION_ID}`. This method lists all   organization-level [custom roles](/iam/docs/understanding-custom-roles).   Example request URL:   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles`  Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID.
         * @param {boolean=} params.showDeleted Include Roles that have been deleted.
         * @param {string=} params.view Optional view for the returned Role objects. When `FULL` is specified, the `includedPermissions` field is returned, which includes a list of all permissions in the role. The default value is `BASIC`, which does not return the `includedPermissions` field.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Roles$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Roles$List, options?: MethodOptions): GaxiosPromise<Schema$ListRolesResponse>;
        list(params: Params$Resource$Roles$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Roles$List, options: MethodOptions | BodyResponseCallback<Schema$ListRolesResponse>, callback: BodyResponseCallback<Schema$ListRolesResponse>): void;
        list(params: Params$Resource$Roles$List, callback: BodyResponseCallback<Schema$ListRolesResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListRolesResponse>): void;
        /**
         * iam.roles.queryGrantableRoles
         * @desc Queries roles that can be granted on a particular resource. A role is grantable if it can be used as the role in a binding for a policy for that resource.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/iam.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const iam = google.iam('v1');
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
         *   const res = await iam.roles.queryGrantableRoles({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "fullResourceName": "my_fullResourceName",
         *       //   "pageSize": 0,
         *       //   "pageToken": "my_pageToken",
         *       //   "view": "my_view"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "roles": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias iam.roles.queryGrantableRoles
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().QueryGrantableRolesRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        queryGrantableRoles(params: Params$Resource$Roles$Querygrantableroles, options: StreamMethodOptions): GaxiosPromise<Readable>;
        queryGrantableRoles(params?: Params$Resource$Roles$Querygrantableroles, options?: MethodOptions): GaxiosPromise<Schema$QueryGrantableRolesResponse>;
        queryGrantableRoles(params: Params$Resource$Roles$Querygrantableroles, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        queryGrantableRoles(params: Params$Resource$Roles$Querygrantableroles, options: MethodOptions | BodyResponseCallback<Schema$QueryGrantableRolesResponse>, callback: BodyResponseCallback<Schema$QueryGrantableRolesResponse>): void;
        queryGrantableRoles(params: Params$Resource$Roles$Querygrantableroles, callback: BodyResponseCallback<Schema$QueryGrantableRolesResponse>): void;
        queryGrantableRoles(callback: BodyResponseCallback<Schema$QueryGrantableRolesResponse>): void;
    }
    export interface Params$Resource$Roles$Get extends StandardParameters {
        /**
         * The `name` parameter's value depends on the target resource for the request, namely [`roles`](/iam/reference/rest/v1/roles), [`projects`](/iam/reference/rest/v1/projects.roles), or [`organizations`](/iam/reference/rest/v1/organizations.roles). Each resource type's `name` value format is described below:  * [`roles.get()`](/iam/reference/rest/v1/roles/get): `roles/{ROLE_NAME}`.   This method returns results from all   [predefined roles](/iam/docs/understanding-roles#predefined_roles) in   Cloud IAM. Example request URL:   `https://iam.googleapis.com/v1/roles/{ROLE_NAME}`  * [`projects.roles.get()`](/iam/reference/rest/v1/projects.roles/get):   `projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`. This method returns only   [custom roles](/iam/docs/understanding-custom-roles) that have been   created at the project level. Example request URL:   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles/{CUSTOM_ROLE_ID}`  * [`organizations.roles.get()`](/iam/reference/rest/v1/organizations.roles/get):   `organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`. This method   returns only [custom roles](/iam/docs/understanding-custom-roles) that   have been created at the organization level. Example request URL:   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles/{CUSTOM_ROLE_ID}`  Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID.
         */
        name?: string;
    }
    export interface Params$Resource$Roles$List extends StandardParameters {
        /**
         * Optional limit on the number of roles to include in the response.
         */
        pageSize?: number;
        /**
         * Optional pagination token returned in an earlier ListRolesResponse.
         */
        pageToken?: string;
        /**
         * The `parent` parameter's value depends on the target resource for the request, namely [`roles`](/iam/reference/rest/v1/roles), [`projects`](/iam/reference/rest/v1/projects.roles), or [`organizations`](/iam/reference/rest/v1/organizations.roles). Each resource type's `parent` value format is described below:  * [`roles.list()`](/iam/reference/rest/v1/roles/list): An empty string.   This method doesn't require a resource; it simply returns all   [predefined roles](/iam/docs/understanding-roles#predefined_roles) in   Cloud IAM. Example request URL:   `https://iam.googleapis.com/v1/roles`  * [`projects.roles.list()`](/iam/reference/rest/v1/projects.roles/list):   `projects/{PROJECT_ID}`. This method lists all project-level   [custom roles](/iam/docs/understanding-custom-roles).   Example request URL:   `https://iam.googleapis.com/v1/projects/{PROJECT_ID}/roles`  * [`organizations.roles.list()`](/iam/reference/rest/v1/organizations.roles/list):   `organizations/{ORGANIZATION_ID}`. This method lists all   organization-level [custom roles](/iam/docs/understanding-custom-roles).   Example request URL:   `https://iam.googleapis.com/v1/organizations/{ORGANIZATION_ID}/roles`  Note: Wildcard (*) values are invalid; you must specify a complete project ID or organization ID.
         */
        parent?: string;
        /**
         * Include Roles that have been deleted.
         */
        showDeleted?: boolean;
        /**
         * Optional view for the returned Role objects. When `FULL` is specified, the `includedPermissions` field is returned, which includes a list of all permissions in the role. The default value is `BASIC`, which does not return the `includedPermissions` field.
         */
        view?: string;
    }
    export interface Params$Resource$Roles$Querygrantableroles extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$QueryGrantableRolesRequest;
    }
    export {};
}
