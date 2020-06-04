/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace secretmanager_v1beta1 {
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
     * Secret Manager API
     *
     * Stores sensitive data such as API keys, passwords, and certificates. Provides convenience while improving security.
     *
     * @example
     * const {google} = require('googleapis');
     * const secretmanager = google.secretmanager('v1beta1');
     *
     * @namespace secretmanager
     * @type {Function}
     * @version v1beta1
     * @variation v1beta1
     * @param {object=} options Options for Secretmanager
     */
    export class Secretmanager {
        context: APIRequestContext;
        projects: Resource$Projects;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    /**
     * Response message for SecretManagerService.AccessSecretVersion.
     */
    export interface Schema$AccessSecretVersionResponse {
        /**
         * The resource name of the SecretVersion in the format `projects/x/secrets/x/versions/x.
         */
        name?: string | null;
        /**
         * Secret payload
         */
        payload?: Schema$SecretPayload;
    }
    /**
     * Request message for SecretManagerService.AddSecretVersion.
     */
    export interface Schema$AddSecretVersionRequest {
        /**
         * Required. The secret payload of the SecretVersion.
         */
        payload?: Schema$SecretPayload;
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
     * A replication policy that replicates the Secret payload without any restrictions.
     */
    export interface Schema$Automatic {
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
     * Request message for SecretManagerService.DestroySecretVersion.
     */
    export interface Schema$DestroySecretVersionRequest {
    }
    /**
     * Request message for SecretManagerService.DisableSecretVersion.
     */
    export interface Schema$DisableSecretVersionRequest {
    }
    /**
     * A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance:      service Foo {       rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty);     }  The JSON representation for `Empty` is empty JSON object `{}`.
     */
    export interface Schema$Empty {
    }
    /**
     * Request message for SecretManagerService.EnableSecretVersion.
     */
    export interface Schema$EnableSecretVersionRequest {
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
     * Response message for SecretManagerService.ListSecrets.
     */
    export interface Schema$ListSecretsResponse {
        /**
         * A token to retrieve the next page of results. Pass this value in ListSecretsRequest.page_token to retrieve the next page.
         */
        nextPageToken?: string | null;
        /**
         * The list of Secrets sorted in reverse by create_time (newest first).
         */
        secrets?: Schema$Secret[];
        /**
         * The total number of Secrets.
         */
        totalSize?: number | null;
    }
    /**
     * Response message for SecretManagerService.ListSecretVersions.
     */
    export interface Schema$ListSecretVersionsResponse {
        /**
         * A token to retrieve the next page of results. Pass this value in ListSecretVersionsRequest.page_token to retrieve the next page.
         */
        nextPageToken?: string | null;
        /**
         * The total number of SecretVersions.
         */
        totalSize?: number | null;
        /**
         * The list of SecretVersions sorted in reverse by create_time (newest first).
         */
        versions?: Schema$SecretVersion[];
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
     * Represents a Replica for this Secret.
     */
    export interface Schema$Replica {
        /**
         * The canonical IDs of the location to replicate data. For example: `&quot;us-east1&quot;`.
         */
        location?: string | null;
    }
    /**
     * A policy that defines the replication configuration of data.
     */
    export interface Schema$Replication {
        /**
         * The Secret will automatically be replicated without any restrictions.
         */
        automatic?: Schema$Automatic;
        /**
         * The Secret will only be replicated into the locations specified.
         */
        userManaged?: Schema$UserManaged;
    }
    /**
     * A Secret is a logical secret whose value and versions can be accessed.  A Secret is made up of zero or more SecretVersions that represent the secret data.
     */
    export interface Schema$Secret {
        /**
         * Output only. The time at which the Secret was created.
         */
        createTime?: string | null;
        /**
         * The labels assigned to this Secret.  Label keys must be between 1 and 63 characters long, have a UTF-8 encoding of maximum 128 bytes, and must conform to the following PCRE regular expression: `\p{Ll}\p{Lo}{0,62}`  Label values must be between 0 and 63 characters long, have a UTF-8 encoding of maximum 128 bytes, and must conform to the following PCRE regular expression: `[\p{Ll}\p{Lo}\p{N}_-]{0,63}`  No more than 64 labels can be assigned to a given resource.
         */
        labels?: {
            [key: string]: string;
        } | null;
        /**
         * Output only. The resource name of the Secret in the format `projects/x/secrets/x.
         */
        name?: string | null;
        /**
         * Required. Immutable. The replication policy of the secret data attached to the Secret.  The replication policy cannot be changed after the Secret has been created.
         */
        replication?: Schema$Replication;
    }
    /**
     * A secret payload resource in the Secret Manager API. This contains the sensitive secret data that is associated with a SecretVersion.
     */
    export interface Schema$SecretPayload {
        /**
         * The secret data. Must be no larger than 64KiB.
         */
        data?: string | null;
    }
    /**
     * A secret version resource in the Secret Manager API.
     */
    export interface Schema$SecretVersion {
        /**
         * Output only. The time at which the SecretVersion was created.
         */
        createTime?: string | null;
        /**
         * Output only. The time this SecretVersion was destroyed. Only present if state is DESTROYED.
         */
        destroyTime?: string | null;
        /**
         * Output only. The resource name of the SecretVersion in the format `projects/x/secrets/x/versions/x.  SecretVersion IDs in a Secret start at 1 and are incremented for each subsequent version of the secret.
         */
        name?: string | null;
        /**
         * Output only. The current state of the SecretVersion.
         */
        state?: string | null;
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
     * A replication policy that replicates the Secret payload into the locations specified in Secret.replication.user_managed.replicas
     */
    export interface Schema$UserManaged {
        /**
         * Required. The list of Replicas for this Secret.  Cannot be empty.
         */
        replicas?: Schema$Replica[];
    }
    export class Resource$Projects {
        context: APIRequestContext;
        locations: Resource$Projects$Locations;
        secrets: Resource$Projects$Secrets;
        constructor(context: APIRequestContext);
    }
    export class Resource$Projects$Locations {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * secretmanager.projects.locations.get
         * @desc Gets information about a location.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/secretmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const secretmanager = google.secretmanager('v1beta1');
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
         *   const res = await secretmanager.projects.locations.get({
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
         * @alias secretmanager.projects.locations.get
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
         * secretmanager.projects.locations.list
         * @desc Lists information about the supported locations for this service.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/secretmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const secretmanager = google.secretmanager('v1beta1');
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
         *   const res = await secretmanager.projects.locations.list({
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
         * @alias secretmanager.projects.locations.list
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
    export class Resource$Projects$Secrets {
        context: APIRequestContext;
        versions: Resource$Projects$Secrets$Versions;
        constructor(context: APIRequestContext);
        /**
         * secretmanager.projects.secrets.addVersion
         * @desc Creates a new SecretVersion containing secret data and attaches it to an existing Secret.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/secretmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const secretmanager = google.secretmanager('v1beta1');
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
         *   const res = await secretmanager.projects.secrets.addVersion({
         *     // Required. The resource name of the Secret to associate with the
         *     // SecretVersion in the format `projects/x/secrets/x`.
         *     parent: 'projects/my-project/secrets/my-secret',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "payload": {}
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "destroyTime": "my_destroyTime",
         *   //   "name": "my_name",
         *   //   "state": "my_state"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias secretmanager.projects.secrets.addVersion
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent Required. The resource name of the Secret to associate with the SecretVersion in the format `projects/x/secrets/x`.
         * @param {().AddSecretVersionRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        addVersion(params: Params$Resource$Projects$Secrets$Addversion, options: StreamMethodOptions): GaxiosPromise<Readable>;
        addVersion(params?: Params$Resource$Projects$Secrets$Addversion, options?: MethodOptions): GaxiosPromise<Schema$SecretVersion>;
        addVersion(params: Params$Resource$Projects$Secrets$Addversion, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        addVersion(params: Params$Resource$Projects$Secrets$Addversion, options: MethodOptions | BodyResponseCallback<Schema$SecretVersion>, callback: BodyResponseCallback<Schema$SecretVersion>): void;
        addVersion(params: Params$Resource$Projects$Secrets$Addversion, callback: BodyResponseCallback<Schema$SecretVersion>): void;
        addVersion(callback: BodyResponseCallback<Schema$SecretVersion>): void;
        /**
         * secretmanager.projects.secrets.create
         * @desc Creates a new Secret containing no SecretVersions.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/secretmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const secretmanager = google.secretmanager('v1beta1');
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
         *   const res = await secretmanager.projects.secrets.create({
         *     // Required. The resource name of the project to associate with the
         *     // Secret, in the format `projects/x`.
         *     parent: 'projects/my-project',
         *     // Required. This must be unique within the project.
         *     //
         *     // A secret ID is a string with a maximum length of 255 characters and can
         *     // contain uppercase and lowercase letters, numerals, and the hyphen (`-`) and
         *     // underscore (`_`) characters.
         *     secretId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "createTime": "my_createTime",
         *       //   "labels": {},
         *       //   "name": "my_name",
         *       //   "replication": {}
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "labels": {},
         *   //   "name": "my_name",
         *   //   "replication": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias secretmanager.projects.secrets.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent Required. The resource name of the project to associate with the Secret, in the format `projects/x`.
         * @param {string=} params.secretId Required. This must be unique within the project.  A secret ID is a string with a maximum length of 255 characters and can contain uppercase and lowercase letters, numerals, and the hyphen (`-`) and underscore (`_`) characters.
         * @param {().Secret} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Projects$Secrets$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Projects$Secrets$Create, options?: MethodOptions): GaxiosPromise<Schema$Secret>;
        create(params: Params$Resource$Projects$Secrets$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Projects$Secrets$Create, options: MethodOptions | BodyResponseCallback<Schema$Secret>, callback: BodyResponseCallback<Schema$Secret>): void;
        create(params: Params$Resource$Projects$Secrets$Create, callback: BodyResponseCallback<Schema$Secret>): void;
        create(callback: BodyResponseCallback<Schema$Secret>): void;
        /**
         * secretmanager.projects.secrets.delete
         * @desc Deletes a Secret.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/secretmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const secretmanager = google.secretmanager('v1beta1');
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
         *   const res = await secretmanager.projects.secrets.delete({
         *     // Required. The resource name of the Secret to delete in the format
         *     // `projects/x/secrets/x`.
         *     name: 'projects/my-project/secrets/my-secret',
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
         * @alias secretmanager.projects.secrets.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the Secret to delete in the format `projects/x/secrets/x`.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Projects$Secrets$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Projects$Secrets$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Projects$Secrets$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Projects$Secrets$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Projects$Secrets$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * secretmanager.projects.secrets.get
         * @desc Gets metadata for a given Secret.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/secretmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const secretmanager = google.secretmanager('v1beta1');
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
         *   const res = await secretmanager.projects.secrets.get({
         *     // Required. The resource name of the Secret, in the format `projects/x/secrets/x`.
         *     name: 'projects/my-project/secrets/my-secret',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "labels": {},
         *   //   "name": "my_name",
         *   //   "replication": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias secretmanager.projects.secrets.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the Secret, in the format `projects/x/secrets/x`.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Secrets$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Secrets$Get, options?: MethodOptions): GaxiosPromise<Schema$Secret>;
        get(params: Params$Resource$Projects$Secrets$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Secrets$Get, options: MethodOptions | BodyResponseCallback<Schema$Secret>, callback: BodyResponseCallback<Schema$Secret>): void;
        get(params: Params$Resource$Projects$Secrets$Get, callback: BodyResponseCallback<Schema$Secret>): void;
        get(callback: BodyResponseCallback<Schema$Secret>): void;
        /**
         * secretmanager.projects.secrets.getIamPolicy
         * @desc Gets the access control policy for a secret. Returns empty policy if the secret exists and does not have a policy set.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/secretmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const secretmanager = google.secretmanager('v1beta1');
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
         *   const res = await secretmanager.projects.secrets.getIamPolicy({
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
         *     resource: 'projects/my-project/secrets/my-secret',
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
         * @alias secretmanager.projects.secrets.getIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.options.requestedPolicyVersion Optional. The policy format version to be returned.  Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.  Requests for policies with any conditional bindings must specify version 3. Policies without any conditional bindings may specify any valid value or leave the field unset.  To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
         * @param {string} params.resource_ REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getIamPolicy(params: Params$Resource$Projects$Secrets$Getiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getIamPolicy(params?: Params$Resource$Projects$Secrets$Getiampolicy, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        getIamPolicy(params: Params$Resource$Projects$Secrets$Getiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getIamPolicy(params: Params$Resource$Projects$Secrets$Getiampolicy, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        getIamPolicy(params: Params$Resource$Projects$Secrets$Getiampolicy, callback: BodyResponseCallback<Schema$Policy>): void;
        getIamPolicy(callback: BodyResponseCallback<Schema$Policy>): void;
        /**
         * secretmanager.projects.secrets.list
         * @desc Lists Secrets.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/secretmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const secretmanager = google.secretmanager('v1beta1');
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
         *   const res = await secretmanager.projects.secrets.list({
         *     // Optional. The maximum number of results to be returned in a single page. If
         *     // set to 0, the server decides the number of results to return. If the
         *     // number is greater than 25000, it is capped at 25000.
         *     pageSize: 'placeholder-value',
         *     // Optional. Pagination token, returned earlier via
         *     // ListSecretsResponse.next_page_token.
         *     pageToken: 'placeholder-value',
         *     // Required. The resource name of the project associated with the
         *     // Secrets, in the format `projects/x`.
         *     parent: 'projects/my-project',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "secrets": [],
         *   //   "totalSize": 0
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias secretmanager.projects.secrets.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize Optional. The maximum number of results to be returned in a single page. If set to 0, the server decides the number of results to return. If the number is greater than 25000, it is capped at 25000.
         * @param {string=} params.pageToken Optional. Pagination token, returned earlier via ListSecretsResponse.next_page_token.
         * @param {string} params.parent Required. The resource name of the project associated with the Secrets, in the format `projects/x`.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Secrets$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Secrets$List, options?: MethodOptions): GaxiosPromise<Schema$ListSecretsResponse>;
        list(params: Params$Resource$Projects$Secrets$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Secrets$List, options: MethodOptions | BodyResponseCallback<Schema$ListSecretsResponse>, callback: BodyResponseCallback<Schema$ListSecretsResponse>): void;
        list(params: Params$Resource$Projects$Secrets$List, callback: BodyResponseCallback<Schema$ListSecretsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListSecretsResponse>): void;
        /**
         * secretmanager.projects.secrets.patch
         * @desc Updates metadata of an existing Secret.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/secretmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const secretmanager = google.secretmanager('v1beta1');
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
         *   const res = await secretmanager.projects.secrets.patch({
         *     // Output only. The resource name of the Secret in the format `projects/x/secrets/x`.
         *     name: 'projects/my-project/secrets/my-secret',
         *     // Required. Specifies the fields to be updated.
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "createTime": "my_createTime",
         *       //   "labels": {},
         *       //   "name": "my_name",
         *       //   "replication": {}
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "labels": {},
         *   //   "name": "my_name",
         *   //   "replication": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias secretmanager.projects.secrets.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Output only. The resource name of the Secret in the format `projects/x/secrets/x`.
         * @param {string=} params.updateMask Required. Specifies the fields to be updated.
         * @param {().Secret} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Projects$Secrets$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Projects$Secrets$Patch, options?: MethodOptions): GaxiosPromise<Schema$Secret>;
        patch(params: Params$Resource$Projects$Secrets$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Projects$Secrets$Patch, options: MethodOptions | BodyResponseCallback<Schema$Secret>, callback: BodyResponseCallback<Schema$Secret>): void;
        patch(params: Params$Resource$Projects$Secrets$Patch, callback: BodyResponseCallback<Schema$Secret>): void;
        patch(callback: BodyResponseCallback<Schema$Secret>): void;
        /**
         * secretmanager.projects.secrets.setIamPolicy
         * @desc Sets the access control policy on the specified secret. Replaces any existing policy.  Permissions on SecretVersions are enforced according to the policy set on the associated Secret.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/secretmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const secretmanager = google.secretmanager('v1beta1');
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
         *   const res = await secretmanager.projects.secrets.setIamPolicy({
         *     // REQUIRED: The resource for which the policy is being specified.
         *     // See the operation documentation for the appropriate value for this field.
         *     resource: 'projects/my-project/secrets/my-secret',
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
         * @alias secretmanager.projects.secrets.setIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         * @param {().SetIamPolicyRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        setIamPolicy(params: Params$Resource$Projects$Secrets$Setiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        setIamPolicy(params?: Params$Resource$Projects$Secrets$Setiampolicy, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        setIamPolicy(params: Params$Resource$Projects$Secrets$Setiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        setIamPolicy(params: Params$Resource$Projects$Secrets$Setiampolicy, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        setIamPolicy(params: Params$Resource$Projects$Secrets$Setiampolicy, callback: BodyResponseCallback<Schema$Policy>): void;
        setIamPolicy(callback: BodyResponseCallback<Schema$Policy>): void;
        /**
         * secretmanager.projects.secrets.testIamPermissions
         * @desc Returns permissions that a caller has for the specified secret. If the secret does not exist, this call returns an empty set of permissions, not a NOT_FOUND error.  Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/secretmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const secretmanager = google.secretmanager('v1beta1');
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
         *   const res = await secretmanager.projects.secrets.testIamPermissions({
         *     // REQUIRED: The resource for which the policy detail is being requested.
         *     // See the operation documentation for the appropriate value for this field.
         *     resource: 'projects/my-project/secrets/my-secret',
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
         * @alias secretmanager.projects.secrets.testIamPermissions
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         * @param {().TestIamPermissionsRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        testIamPermissions(params: Params$Resource$Projects$Secrets$Testiampermissions, options: StreamMethodOptions): GaxiosPromise<Readable>;
        testIamPermissions(params?: Params$Resource$Projects$Secrets$Testiampermissions, options?: MethodOptions): GaxiosPromise<Schema$TestIamPermissionsResponse>;
        testIamPermissions(params: Params$Resource$Projects$Secrets$Testiampermissions, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        testIamPermissions(params: Params$Resource$Projects$Secrets$Testiampermissions, options: MethodOptions | BodyResponseCallback<Schema$TestIamPermissionsResponse>, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(params: Params$Resource$Projects$Secrets$Testiampermissions, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
    }
    export interface Params$Resource$Projects$Secrets$Addversion extends StandardParameters {
        /**
         * Required. The resource name of the Secret to associate with the SecretVersion in the format `projects/x/secrets/x`.
         */
        parent?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$AddSecretVersionRequest;
    }
    export interface Params$Resource$Projects$Secrets$Create extends StandardParameters {
        /**
         * Required. The resource name of the project to associate with the Secret, in the format `projects/x`.
         */
        parent?: string;
        /**
         * Required. This must be unique within the project.  A secret ID is a string with a maximum length of 255 characters and can contain uppercase and lowercase letters, numerals, and the hyphen (`-`) and underscore (`_`) characters.
         */
        secretId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Secret;
    }
    export interface Params$Resource$Projects$Secrets$Delete extends StandardParameters {
        /**
         * Required. The resource name of the Secret to delete in the format `projects/x/secrets/x`.
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Secrets$Get extends StandardParameters {
        /**
         * Required. The resource name of the Secret, in the format `projects/x/secrets/x`.
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Secrets$Getiampolicy extends StandardParameters {
        /**
         * Optional. The policy format version to be returned.  Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.  Requests for policies with any conditional bindings must specify version 3. Policies without any conditional bindings may specify any valid value or leave the field unset.  To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
         */
        'options.requestedPolicyVersion'?: number;
        /**
         * REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
    }
    export interface Params$Resource$Projects$Secrets$List extends StandardParameters {
        /**
         * Optional. The maximum number of results to be returned in a single page. If set to 0, the server decides the number of results to return. If the number is greater than 25000, it is capped at 25000.
         */
        pageSize?: number;
        /**
         * Optional. Pagination token, returned earlier via ListSecretsResponse.next_page_token.
         */
        pageToken?: string;
        /**
         * Required. The resource name of the project associated with the Secrets, in the format `projects/x`.
         */
        parent?: string;
    }
    export interface Params$Resource$Projects$Secrets$Patch extends StandardParameters {
        /**
         * Output only. The resource name of the Secret in the format `projects/x/secrets/x`.
         */
        name?: string;
        /**
         * Required. Specifies the fields to be updated.
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Secret;
    }
    export interface Params$Resource$Projects$Secrets$Setiampolicy extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$SetIamPolicyRequest;
    }
    export interface Params$Resource$Projects$Secrets$Testiampermissions extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$TestIamPermissionsRequest;
    }
    export class Resource$Projects$Secrets$Versions {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * secretmanager.projects.secrets.versions.access
         * @desc Accesses a SecretVersion. This call returns the secret data.  `projects/x/secrets/x/versions/latest` is an alias to the `latest` SecretVersion.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/secretmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const secretmanager = google.secretmanager('v1beta1');
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
         *   const res = await secretmanager.projects.secrets.versions.access({
         *     // Required. The resource name of the SecretVersion in the format
         *     // `projects/x/secrets/x/versions/x`.
         *     name: 'projects/my-project/secrets/my-secret/versions/my-version',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "name": "my_name",
         *   //   "payload": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias secretmanager.projects.secrets.versions.access
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the SecretVersion in the format `projects/x/secrets/x/versions/x`.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        access(params: Params$Resource$Projects$Secrets$Versions$Access, options: StreamMethodOptions): GaxiosPromise<Readable>;
        access(params?: Params$Resource$Projects$Secrets$Versions$Access, options?: MethodOptions): GaxiosPromise<Schema$AccessSecretVersionResponse>;
        access(params: Params$Resource$Projects$Secrets$Versions$Access, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        access(params: Params$Resource$Projects$Secrets$Versions$Access, options: MethodOptions | BodyResponseCallback<Schema$AccessSecretVersionResponse>, callback: BodyResponseCallback<Schema$AccessSecretVersionResponse>): void;
        access(params: Params$Resource$Projects$Secrets$Versions$Access, callback: BodyResponseCallback<Schema$AccessSecretVersionResponse>): void;
        access(callback: BodyResponseCallback<Schema$AccessSecretVersionResponse>): void;
        /**
         * secretmanager.projects.secrets.versions.destroy
         * @desc Destroys a SecretVersion.  Sets the state of the SecretVersion to DESTROYED and irrevocably destroys the secret data.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/secretmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const secretmanager = google.secretmanager('v1beta1');
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
         *   const res = await secretmanager.projects.secrets.versions.destroy({
         *     // Required. The resource name of the SecretVersion to destroy in the format
         *     // `projects/x/secrets/x/versions/x`.
         *     name: 'projects/my-project/secrets/my-secret/versions/my-version',
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
         *   //   "createTime": "my_createTime",
         *   //   "destroyTime": "my_destroyTime",
         *   //   "name": "my_name",
         *   //   "state": "my_state"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias secretmanager.projects.secrets.versions.destroy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the SecretVersion to destroy in the format `projects/x/secrets/x/versions/x`.
         * @param {().DestroySecretVersionRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        destroy(params: Params$Resource$Projects$Secrets$Versions$Destroy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        destroy(params?: Params$Resource$Projects$Secrets$Versions$Destroy, options?: MethodOptions): GaxiosPromise<Schema$SecretVersion>;
        destroy(params: Params$Resource$Projects$Secrets$Versions$Destroy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        destroy(params: Params$Resource$Projects$Secrets$Versions$Destroy, options: MethodOptions | BodyResponseCallback<Schema$SecretVersion>, callback: BodyResponseCallback<Schema$SecretVersion>): void;
        destroy(params: Params$Resource$Projects$Secrets$Versions$Destroy, callback: BodyResponseCallback<Schema$SecretVersion>): void;
        destroy(callback: BodyResponseCallback<Schema$SecretVersion>): void;
        /**
         * secretmanager.projects.secrets.versions.disable
         * @desc Disables a SecretVersion.  Sets the state of the SecretVersion to DISABLED.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/secretmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const secretmanager = google.secretmanager('v1beta1');
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
         *   const res = await secretmanager.projects.secrets.versions.disable({
         *     // Required. The resource name of the SecretVersion to disable in the format
         *     // `projects/x/secrets/x/versions/x`.
         *     name: 'projects/my-project/secrets/my-secret/versions/my-version',
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
         *   //   "createTime": "my_createTime",
         *   //   "destroyTime": "my_destroyTime",
         *   //   "name": "my_name",
         *   //   "state": "my_state"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias secretmanager.projects.secrets.versions.disable
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the SecretVersion to disable in the format `projects/x/secrets/x/versions/x`.
         * @param {().DisableSecretVersionRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        disable(params: Params$Resource$Projects$Secrets$Versions$Disable, options: StreamMethodOptions): GaxiosPromise<Readable>;
        disable(params?: Params$Resource$Projects$Secrets$Versions$Disable, options?: MethodOptions): GaxiosPromise<Schema$SecretVersion>;
        disable(params: Params$Resource$Projects$Secrets$Versions$Disable, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        disable(params: Params$Resource$Projects$Secrets$Versions$Disable, options: MethodOptions | BodyResponseCallback<Schema$SecretVersion>, callback: BodyResponseCallback<Schema$SecretVersion>): void;
        disable(params: Params$Resource$Projects$Secrets$Versions$Disable, callback: BodyResponseCallback<Schema$SecretVersion>): void;
        disable(callback: BodyResponseCallback<Schema$SecretVersion>): void;
        /**
         * secretmanager.projects.secrets.versions.enable
         * @desc Enables a SecretVersion.  Sets the state of the SecretVersion to ENABLED.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/secretmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const secretmanager = google.secretmanager('v1beta1');
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
         *   const res = await secretmanager.projects.secrets.versions.enable({
         *     // Required. The resource name of the SecretVersion to enable in the format
         *     // `projects/x/secrets/x/versions/x`.
         *     name: 'projects/my-project/secrets/my-secret/versions/my-version',
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
         *   //   "createTime": "my_createTime",
         *   //   "destroyTime": "my_destroyTime",
         *   //   "name": "my_name",
         *   //   "state": "my_state"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias secretmanager.projects.secrets.versions.enable
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the SecretVersion to enable in the format `projects/x/secrets/x/versions/x`.
         * @param {().EnableSecretVersionRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        enable(params: Params$Resource$Projects$Secrets$Versions$Enable, options: StreamMethodOptions): GaxiosPromise<Readable>;
        enable(params?: Params$Resource$Projects$Secrets$Versions$Enable, options?: MethodOptions): GaxiosPromise<Schema$SecretVersion>;
        enable(params: Params$Resource$Projects$Secrets$Versions$Enable, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        enable(params: Params$Resource$Projects$Secrets$Versions$Enable, options: MethodOptions | BodyResponseCallback<Schema$SecretVersion>, callback: BodyResponseCallback<Schema$SecretVersion>): void;
        enable(params: Params$Resource$Projects$Secrets$Versions$Enable, callback: BodyResponseCallback<Schema$SecretVersion>): void;
        enable(callback: BodyResponseCallback<Schema$SecretVersion>): void;
        /**
         * secretmanager.projects.secrets.versions.get
         * @desc Gets metadata for a SecretVersion.  `projects/x/secrets/x/versions/latest` is an alias to the `latest` SecretVersion.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/secretmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const secretmanager = google.secretmanager('v1beta1');
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
         *   const res = await secretmanager.projects.secrets.versions.get({
         *     // Required. The resource name of the SecretVersion in the format
         *     // `projects/x/secrets/x/versions/x`.
         *     // `projects/x/secrets/x/versions/latest` is an alias to the `latest`
         *     // SecretVersion.
         *     name: 'projects/my-project/secrets/my-secret/versions/my-version',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "destroyTime": "my_destroyTime",
         *   //   "name": "my_name",
         *   //   "state": "my_state"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias secretmanager.projects.secrets.versions.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the SecretVersion in the format `projects/x/secrets/x/versions/x`. `projects/x/secrets/x/versions/latest` is an alias to the `latest` SecretVersion.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Secrets$Versions$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Secrets$Versions$Get, options?: MethodOptions): GaxiosPromise<Schema$SecretVersion>;
        get(params: Params$Resource$Projects$Secrets$Versions$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Secrets$Versions$Get, options: MethodOptions | BodyResponseCallback<Schema$SecretVersion>, callback: BodyResponseCallback<Schema$SecretVersion>): void;
        get(params: Params$Resource$Projects$Secrets$Versions$Get, callback: BodyResponseCallback<Schema$SecretVersion>): void;
        get(callback: BodyResponseCallback<Schema$SecretVersion>): void;
        /**
         * secretmanager.projects.secrets.versions.list
         * @desc Lists SecretVersions. This call does not return secret data.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/secretmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const secretmanager = google.secretmanager('v1beta1');
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
         *   const res = await secretmanager.projects.secrets.versions.list({
         *     // Optional. The maximum number of results to be returned in a single page. If
         *     // set to 0, the server decides the number of results to return. If the
         *     // number is greater than 25000, it is capped at 25000.
         *     pageSize: 'placeholder-value',
         *     // Optional. Pagination token, returned earlier via
         *     // ListSecretVersionsResponse.next_page_token][].
         *     pageToken: 'placeholder-value',
         *     // Required. The resource name of the Secret associated with the
         *     // SecretVersions to list, in the format
         *     // `projects/x/secrets/x`.
         *     parent: 'projects/my-project/secrets/my-secret',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "totalSize": 0,
         *   //   "versions": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias secretmanager.projects.secrets.versions.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize Optional. The maximum number of results to be returned in a single page. If set to 0, the server decides the number of results to return. If the number is greater than 25000, it is capped at 25000.
         * @param {string=} params.pageToken Optional. Pagination token, returned earlier via ListSecretVersionsResponse.next_page_token][].
         * @param {string} params.parent Required. The resource name of the Secret associated with the SecretVersions to list, in the format `projects/x/secrets/x`.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Secrets$Versions$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Secrets$Versions$List, options?: MethodOptions): GaxiosPromise<Schema$ListSecretVersionsResponse>;
        list(params: Params$Resource$Projects$Secrets$Versions$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Secrets$Versions$List, options: MethodOptions | BodyResponseCallback<Schema$ListSecretVersionsResponse>, callback: BodyResponseCallback<Schema$ListSecretVersionsResponse>): void;
        list(params: Params$Resource$Projects$Secrets$Versions$List, callback: BodyResponseCallback<Schema$ListSecretVersionsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListSecretVersionsResponse>): void;
    }
    export interface Params$Resource$Projects$Secrets$Versions$Access extends StandardParameters {
        /**
         * Required. The resource name of the SecretVersion in the format `projects/x/secrets/x/versions/x`.
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Secrets$Versions$Destroy extends StandardParameters {
        /**
         * Required. The resource name of the SecretVersion to destroy in the format `projects/x/secrets/x/versions/x`.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$DestroySecretVersionRequest;
    }
    export interface Params$Resource$Projects$Secrets$Versions$Disable extends StandardParameters {
        /**
         * Required. The resource name of the SecretVersion to disable in the format `projects/x/secrets/x/versions/x`.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$DisableSecretVersionRequest;
    }
    export interface Params$Resource$Projects$Secrets$Versions$Enable extends StandardParameters {
        /**
         * Required. The resource name of the SecretVersion to enable in the format `projects/x/secrets/x/versions/x`.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$EnableSecretVersionRequest;
    }
    export interface Params$Resource$Projects$Secrets$Versions$Get extends StandardParameters {
        /**
         * Required. The resource name of the SecretVersion in the format `projects/x/secrets/x/versions/x`. `projects/x/secrets/x/versions/latest` is an alias to the `latest` SecretVersion.
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Secrets$Versions$List extends StandardParameters {
        /**
         * Optional. The maximum number of results to be returned in a single page. If set to 0, the server decides the number of results to return. If the number is greater than 25000, it is capped at 25000.
         */
        pageSize?: number;
        /**
         * Optional. Pagination token, returned earlier via ListSecretVersionsResponse.next_page_token][].
         */
        pageToken?: string;
        /**
         * Required. The resource name of the Secret associated with the SecretVersions to list, in the format `projects/x/secrets/x`.
         */
        parent?: string;
    }
    export {};
}
