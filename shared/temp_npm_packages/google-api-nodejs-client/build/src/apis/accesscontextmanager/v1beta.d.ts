/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace accesscontextmanager_v1beta {
    export interface Options extends GlobalOptions {
        version: 'v1beta';
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
     * Access Context Manager API
     *
     * An API for setting attribute based access control to requests to GCP services.
     *
     * @example
     * const {google} = require('googleapis');
     * const accesscontextmanager = google.accesscontextmanager('v1beta');
     *
     * @namespace accesscontextmanager
     * @type {Function}
     * @version v1beta
     * @variation v1beta
     * @param {object=} options Options for Accesscontextmanager
     */
    export class Accesscontextmanager {
        context: APIRequestContext;
        accessPolicies: Resource$Accesspolicies;
        operations: Resource$Operations;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    /**
     * An `AccessLevel` is a label that can be applied to requests to Google Cloud services, along with a list of requirements necessary for the label to be applied.
     */
    export interface Schema$AccessLevel {
        /**
         * A `BasicLevel` composed of `Conditions`.
         */
        basic?: Schema$BasicLevel;
        /**
         * A `CustomLevel` written in the Common Expression Language.
         */
        custom?: Schema$CustomLevel;
        /**
         * Description of the `AccessLevel` and its use. Does not affect behavior.
         */
        description?: string | null;
        /**
         * Required. Resource name for the Access Level. The `short_name` component must begin with a letter and only include alphanumeric and &#39;_&#39;. Format: `accessPolicies/{policy_id}/accessLevels/{short_name}`. The maximum length  // of the `short_name` component is 50 characters.
         */
        name?: string | null;
        /**
         * Human readable title. Must be unique within the Policy.
         */
        title?: string | null;
    }
    /**
     * `AccessPolicy` is a container for `AccessLevels` (which define the necessary attributes to use Google Cloud services) and `ServicePerimeters` (which define regions of services able to freely pass data within a perimeter). An access policy is globally visible within an organization, and the restrictions it specifies apply to all projects within an organization.
     */
    export interface Schema$AccessPolicy {
        /**
         * Output only. Resource name of the `AccessPolicy`. Format: `accessPolicies/{policy_id}`
         */
        name?: string | null;
        /**
         * Required. The parent of this `AccessPolicy` in the Cloud Resource Hierarchy. Currently immutable once created. Format: `organizations/{organization_id}`
         */
        parent?: string | null;
        /**
         * Required. Human readable title. Does not affect behavior.
         */
        title?: string | null;
    }
    /**
     * `BasicLevel` is an `AccessLevel` using a set of recommended features.
     */
    export interface Schema$BasicLevel {
        /**
         * How the `conditions` list should be combined to determine if a request is granted this `AccessLevel`. If AND is used, each `Condition` in `conditions` must be satisfied for the `AccessLevel` to be applied. If OR is used, at least one `Condition` in `conditions` must be satisfied for the `AccessLevel` to be applied. Default behavior is AND.
         */
        combiningFunction?: string | null;
        /**
         * Required. A list of requirements for the `AccessLevel` to be granted.
         */
        conditions?: Schema$Condition[];
    }
    /**
     * A condition necessary for an `AccessLevel` to be granted. The Condition is an AND over its fields. So a Condition is true if: 1) the request IP is from one of the listed subnetworks AND 2) the originating device complies with the listed device policy AND 3) all listed access levels are granted AND 4) the request was sent at a time allowed by the DateTimeRestriction.
     */
    export interface Schema$Condition {
        /**
         * Device specific restrictions, all restrictions must hold for the Condition to be true. If not specified, all devices are allowed.
         */
        devicePolicy?: Schema$DevicePolicy;
        /**
         * CIDR block IP subnetwork specification. May be IPv4 or IPv6. Note that for a CIDR IP address block, the specified IP address portion must be properly truncated (i.e. all the host bits must be zero) or the input is considered malformed. For example, &quot;192.0.2.0/24&quot; is accepted but &quot;192.0.2.1/24&quot; is not. Similarly, for IPv6, &quot;2001:db8::/32&quot; is accepted whereas &quot;2001:db8::1/32&quot; is not. The originating IP of a request must be in one of the listed subnets in order for this Condition to be true. If empty, all IP addresses are allowed.
         */
        ipSubnetworks?: string[] | null;
        /**
         * The request must be made by one of the provided user or service accounts. Groups are not supported. Syntax: `user:{emailid}` `serviceAccount:{emailid}` If not specified, a request may come from any user.
         */
        members?: string[] | null;
        /**
         * Whether to negate the Condition. If true, the Condition becomes a NAND over its non-empty fields, each field must be false for the Condition overall to be satisfied. Defaults to false.
         */
        negate?: boolean | null;
        /**
         * The request must originate from one of the provided countries/regions. Must be valid ISO 3166-1 alpha-2 codes.
         */
        regions?: string[] | null;
        /**
         * A list of other access levels defined in the same `Policy`, referenced by resource name. Referencing an `AccessLevel` which does not exist is an error. All access levels listed must be granted for the Condition to be true. Example: &quot;`accessPolicies/MY_POLICY/accessLevels/LEVEL_NAME&quot;`
         */
        requiredAccessLevels?: string[] | null;
    }
    /**
     * `CustomLevel` is an `AccessLevel` using the Cloud Common Expression Language to represent the necessary conditions for the level to apply to a request. See CEL spec at: https://github.com/google/cel-spec
     */
    export interface Schema$CustomLevel {
        /**
         * Required. A Cloud CEL expression evaluating to a boolean.
         */
        expr?: Schema$Expr;
    }
    /**
     * `DevicePolicy` specifies device specific restrictions necessary to acquire a given access level. A `DevicePolicy` specifies requirements for requests from devices to be granted access levels, it does not do any enforcement on the device. `DevicePolicy` acts as an AND over all specified fields, and each repeated field is an OR over its elements. Any unset fields are ignored. For example, if the proto is { os_type : DESKTOP_WINDOWS, os_type : DESKTOP_LINUX, encryption_status: ENCRYPTED}, then the DevicePolicy will be true for requests originating from encrypted Linux desktops and encrypted Windows desktops.
     */
    export interface Schema$DevicePolicy {
        /**
         * Allowed device management levels, an empty list allows all management levels.
         */
        allowedDeviceManagementLevels?: string[] | null;
        /**
         * Allowed encryptions statuses, an empty list allows all statuses.
         */
        allowedEncryptionStatuses?: string[] | null;
        /**
         * Allowed OS versions, an empty list allows all types and all versions.
         */
        osConstraints?: Schema$OsConstraint[];
        /**
         * Whether the device needs to be approved by the customer admin.
         */
        requireAdminApproval?: boolean | null;
        /**
         * Whether the device needs to be corp owned.
         */
        requireCorpOwned?: boolean | null;
        /**
         * Whether or not screenlock is required for the DevicePolicy to be true. Defaults to `false`.
         */
        requireScreenlock?: boolean | null;
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
     * A response to `ListAccessLevelsRequest`.
     */
    export interface Schema$ListAccessLevelsResponse {
        /**
         * List of the Access Level instances.
         */
        accessLevels?: Schema$AccessLevel[];
        /**
         * The pagination token to retrieve the next page of results. If the value is empty, no further results remain.
         */
        nextPageToken?: string | null;
    }
    /**
     * A response to `ListAccessPoliciesRequest`.
     */
    export interface Schema$ListAccessPoliciesResponse {
        /**
         * List of the AccessPolicy instances.
         */
        accessPolicies?: Schema$AccessPolicy[];
        /**
         * The pagination token to retrieve the next page of results. If the value is empty, no further results remain.
         */
        nextPageToken?: string | null;
    }
    /**
     * A response to `ListServicePerimetersRequest`.
     */
    export interface Schema$ListServicePerimetersResponse {
        /**
         * The pagination token to retrieve the next page of results. If the value is empty, no further results remain.
         */
        nextPageToken?: string | null;
        /**
         * List of the Service Perimeter instances.
         */
        servicePerimeters?: Schema$ServicePerimeter[];
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
     * A restriction on the OS type and version of devices making requests.
     */
    export interface Schema$OsConstraint {
        /**
         * The minimum allowed OS version. If not set, any version of this OS satisfies the constraint. Format: `&quot;major.minor.patch&quot;`. Examples: `&quot;10.5.301&quot;`, `&quot;9.2.1&quot;`.
         */
        minimumVersion?: string | null;
        /**
         * Required. The allowed OS type.
         */
        osType?: string | null;
        /**
         * Only allows requests from devices with a verified Chrome OS. Verifications includes requirements that the device is enterprise-managed, conformant to domain policies, and the caller has permission to call the API targeted by the request.
         */
        requireVerifiedChromeOs?: boolean | null;
    }
    /**
     * `ServicePerimeter` describes a set of Google Cloud resources which can freely import and export data amongst themselves, but not export outside of the `ServicePerimeter`. If a request with a source within this `ServicePerimeter` has a target outside of the `ServicePerimeter`, the request will be blocked. Otherwise the request is allowed. There are two types of Service Perimeter - Regular and Bridge. Regular Service Perimeters cannot overlap, a single Google Cloud project can only belong to a single regular Service Perimeter. Service Perimeter Bridges can contain only Google Cloud projects as members, a single Google Cloud project may belong to multiple Service Perimeter Bridges.
     */
    export interface Schema$ServicePerimeter {
        /**
         * Description of the `ServicePerimeter` and its use. Does not affect behavior.
         */
        description?: string | null;
        /**
         * Required. Resource name for the ServicePerimeter.  The `short_name` component must begin with a letter and only include alphanumeric and &#39;_&#39;. Format: `accessPolicies/{policy_id}/servicePerimeters/{short_name}`
         */
        name?: string | null;
        /**
         * Perimeter type indicator. A single project is allowed to be a member of single regular perimeter, but multiple service perimeter bridges. A project cannot be a included in a perimeter bridge without being included in regular perimeter. For perimeter bridges, restricted/unrestricted service lists as well as access lists must be empty.
         */
        perimeterType?: string | null;
        /**
         * Current ServicePerimeter configuration. Specifies sets of resources, restricted/unrestricted services and access levels that determine perimeter content and boundaries.
         */
        status?: Schema$ServicePerimeterConfig;
        /**
         * Human readable title. Must be unique within the Policy.
         */
        title?: string | null;
    }
    /**
     * `ServicePerimeterConfig` specifies a set of Google Cloud resources that describe specific Service Perimeter configuration.
     */
    export interface Schema$ServicePerimeterConfig {
        /**
         * A list of `AccessLevel` resource names that allow resources within the `ServicePerimeter` to be accessed from the internet. `AccessLevels` listed must be in the same policy as this `ServicePerimeter`. Referencing a nonexistent `AccessLevel` is a syntax error. If no `AccessLevel` names are listed, resources within the perimeter can only be accessed via Google Cloud calls with request origins within the perimeter. Example: `&quot;accessPolicies/MY_POLICY/accessLevels/MY_LEVEL&quot;`. For Service Perimeter Bridge, must be empty.
         */
        accessLevels?: string[] | null;
        /**
         * A list of Google Cloud resources that are inside of the service perimeter. Currently only projects are allowed. Format: `projects/{project_number}`
         */
        resources?: string[] | null;
        /**
         * Google Cloud services that are subject to the Service Perimeter restrictions. Must contain a list of services. For example, if `storage.googleapis.com` is specified, access to the storage buckets inside the perimeter must meet the perimeter&#39;s access restrictions.
         */
        restrictedServices?: string[] | null;
        /**
         * Google Cloud services that are not subject to the Service Perimeter restrictions. Deprecated. Must be set to a single wildcard &quot;*&quot;.  The wildcard means that unless explicitly specified by &quot;restricted_services&quot; list, any service is treated as unrestricted.
         */
        unrestrictedServices?: string[] | null;
        /**
         * Beta. Configuration for APIs allowed within Perimeter.
         */
        vpcAccessibleServices?: Schema$VpcAccessibleServices;
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
     * Specifies how APIs are allowed to communicate within the Service Perimeter.
     */
    export interface Schema$VpcAccessibleServices {
        /**
         * The list of APIs usable within the Service Perimeter. Must be empty unless &#39;enable_restriction&#39; is True.
         */
        allowedServices?: string[] | null;
        /**
         * Whether to restrict API calls within the Service Perimeter to the list of APIs specified in &#39;allowed_services&#39;.
         */
        enableRestriction?: boolean | null;
    }
    export class Resource$Accesspolicies {
        context: APIRequestContext;
        accessLevels: Resource$Accesspolicies$Accesslevels;
        servicePerimeters: Resource$Accesspolicies$Serviceperimeters;
        constructor(context: APIRequestContext);
        /**
         * accesscontextmanager.accessPolicies.create
         * @desc Create an `AccessPolicy`. Fails if this organization already has a `AccessPolicy`. The longrunning Operation will have a successful status once the `AccessPolicy` has propagated to long-lasting storage. Syntactic and basic semantic errors will be returned in `metadata` as a BadRequest proto.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/accesscontextmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const accesscontextmanager = google.accesscontextmanager('v1beta');
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
         *   const res = await accesscontextmanager.accessPolicies.create({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "name": "my_name",
         *       //   "parent": "my_parent",
         *       //   "title": "my_title"
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
         * @alias accesscontextmanager.accessPolicies.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().AccessPolicy} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Accesspolicies$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Accesspolicies$Create, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        create(params: Params$Resource$Accesspolicies$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Accesspolicies$Create, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        create(params: Params$Resource$Accesspolicies$Create, callback: BodyResponseCallback<Schema$Operation>): void;
        create(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * accesscontextmanager.accessPolicies.delete
         * @desc Delete an AccessPolicy by resource name. The longrunning Operation will have a successful status once the AccessPolicy has been removed from long-lasting storage.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/accesscontextmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const accesscontextmanager = google.accesscontextmanager('v1beta');
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
         *   const res = await accesscontextmanager.accessPolicies.delete({
         *     // Required. Resource name for the access policy to delete.
         *     //
         *     // Format `accessPolicies/{policy_id}`
         *     name: 'accessPolicies/my-accessPolicie',
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
         * @alias accesscontextmanager.accessPolicies.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. Resource name for the access policy to delete.  Format `accessPolicies/{policy_id}`
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Accesspolicies$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Accesspolicies$Delete, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        delete(params: Params$Resource$Accesspolicies$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Accesspolicies$Delete, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        delete(params: Params$Resource$Accesspolicies$Delete, callback: BodyResponseCallback<Schema$Operation>): void;
        delete(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * accesscontextmanager.accessPolicies.get
         * @desc Get an AccessPolicy by name.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/accesscontextmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const accesscontextmanager = google.accesscontextmanager('v1beta');
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
         *   const res = await accesscontextmanager.accessPolicies.get({
         *     // Required. Resource name for the access policy to get.
         *     //
         *     // Format `accessPolicies/{policy_id}`
         *     name: 'accessPolicies/my-accessPolicie',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "name": "my_name",
         *   //   "parent": "my_parent",
         *   //   "title": "my_title"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias accesscontextmanager.accessPolicies.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. Resource name for the access policy to get.  Format `accessPolicies/{policy_id}`
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Accesspolicies$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Accesspolicies$Get, options?: MethodOptions): GaxiosPromise<Schema$AccessPolicy>;
        get(params: Params$Resource$Accesspolicies$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Accesspolicies$Get, options: MethodOptions | BodyResponseCallback<Schema$AccessPolicy>, callback: BodyResponseCallback<Schema$AccessPolicy>): void;
        get(params: Params$Resource$Accesspolicies$Get, callback: BodyResponseCallback<Schema$AccessPolicy>): void;
        get(callback: BodyResponseCallback<Schema$AccessPolicy>): void;
        /**
         * accesscontextmanager.accessPolicies.list
         * @desc List all AccessPolicies under a container.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/accesscontextmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const accesscontextmanager = google.accesscontextmanager('v1beta');
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
         *   const res = await accesscontextmanager.accessPolicies.list({
         *     // Number of AccessPolicy instances to include in the list. Default 100.
         *     pageSize: 'placeholder-value',
         *     // Next page token for the next batch of AccessPolicy instances. Defaults to
         *     // the first page of results.
         *     pageToken: 'placeholder-value',
         *     // Required. Resource name for the container to list AccessPolicy instances
         *     // from.
         *     //
         *     // Format:
         *     // `organizations/{org_id}`
         *     parent: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "accessPolicies": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias accesscontextmanager.accessPolicies.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize Number of AccessPolicy instances to include in the list. Default 100.
         * @param {string=} params.pageToken Next page token for the next batch of AccessPolicy instances. Defaults to the first page of results.
         * @param {string=} params.parent Required. Resource name for the container to list AccessPolicy instances from.  Format: `organizations/{org_id}`
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Accesspolicies$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Accesspolicies$List, options?: MethodOptions): GaxiosPromise<Schema$ListAccessPoliciesResponse>;
        list(params: Params$Resource$Accesspolicies$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Accesspolicies$List, options: MethodOptions | BodyResponseCallback<Schema$ListAccessPoliciesResponse>, callback: BodyResponseCallback<Schema$ListAccessPoliciesResponse>): void;
        list(params: Params$Resource$Accesspolicies$List, callback: BodyResponseCallback<Schema$ListAccessPoliciesResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListAccessPoliciesResponse>): void;
        /**
         * accesscontextmanager.accessPolicies.patch
         * @desc Update an AccessPolicy. The longrunning Operation from this RPC will have a successful status once the changes to the AccessPolicy have propagated to long-lasting storage. Syntactic and basic semantic errors will be returned in `metadata` as a BadRequest proto.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/accesscontextmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const accesscontextmanager = google.accesscontextmanager('v1beta');
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
         *   const res = await accesscontextmanager.accessPolicies.patch({
         *     // Output only. Resource name of the `AccessPolicy`. Format:
         *     // `accessPolicies/{policy_id}`
         *     name: 'accessPolicies/my-accessPolicie',
         *     // Required. Mask to control which fields get updated. Must be non-empty.
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "name": "my_name",
         *       //   "parent": "my_parent",
         *       //   "title": "my_title"
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
         * @alias accesscontextmanager.accessPolicies.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Output only. Resource name of the `AccessPolicy`. Format: `accessPolicies/{policy_id}`
         * @param {string=} params.updateMask Required. Mask to control which fields get updated. Must be non-empty.
         * @param {().AccessPolicy} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Accesspolicies$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Accesspolicies$Patch, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        patch(params: Params$Resource$Accesspolicies$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Accesspolicies$Patch, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        patch(params: Params$Resource$Accesspolicies$Patch, callback: BodyResponseCallback<Schema$Operation>): void;
        patch(callback: BodyResponseCallback<Schema$Operation>): void;
    }
    export interface Params$Resource$Accesspolicies$Create extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$AccessPolicy;
    }
    export interface Params$Resource$Accesspolicies$Delete extends StandardParameters {
        /**
         * Required. Resource name for the access policy to delete.  Format `accessPolicies/{policy_id}`
         */
        name?: string;
    }
    export interface Params$Resource$Accesspolicies$Get extends StandardParameters {
        /**
         * Required. Resource name for the access policy to get.  Format `accessPolicies/{policy_id}`
         */
        name?: string;
    }
    export interface Params$Resource$Accesspolicies$List extends StandardParameters {
        /**
         * Number of AccessPolicy instances to include in the list. Default 100.
         */
        pageSize?: number;
        /**
         * Next page token for the next batch of AccessPolicy instances. Defaults to the first page of results.
         */
        pageToken?: string;
        /**
         * Required. Resource name for the container to list AccessPolicy instances from.  Format: `organizations/{org_id}`
         */
        parent?: string;
    }
    export interface Params$Resource$Accesspolicies$Patch extends StandardParameters {
        /**
         * Output only. Resource name of the `AccessPolicy`. Format: `accessPolicies/{policy_id}`
         */
        name?: string;
        /**
         * Required. Mask to control which fields get updated. Must be non-empty.
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$AccessPolicy;
    }
    export class Resource$Accesspolicies$Accesslevels {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * accesscontextmanager.accessPolicies.accessLevels.create
         * @desc Create an Access Level. The longrunning operation from this RPC will have a successful status once the Access Level has propagated to long-lasting storage. Access Levels containing errors will result in an error response for the first error encountered.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/accesscontextmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const accesscontextmanager = google.accesscontextmanager('v1beta');
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
         *   const res = await accesscontextmanager.accessPolicies.accessLevels.create({
         *     // Required. Resource name for the access policy which owns this Access
         *     // Level.
         *     //
         *     // Format: `accessPolicies/{policy_id}`
         *     parent: 'accessPolicies/my-accessPolicie',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "basic": {},
         *       //   "custom": {},
         *       //   "description": "my_description",
         *       //   "name": "my_name",
         *       //   "title": "my_title"
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
         * @alias accesscontextmanager.accessPolicies.accessLevels.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent Required. Resource name for the access policy which owns this Access Level.  Format: `accessPolicies/{policy_id}`
         * @param {().AccessLevel} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Accesspolicies$Accesslevels$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Accesspolicies$Accesslevels$Create, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        create(params: Params$Resource$Accesspolicies$Accesslevels$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Accesspolicies$Accesslevels$Create, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        create(params: Params$Resource$Accesspolicies$Accesslevels$Create, callback: BodyResponseCallback<Schema$Operation>): void;
        create(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * accesscontextmanager.accessPolicies.accessLevels.delete
         * @desc Delete an Access Level by resource name. The longrunning operation from this RPC will have a successful status once the Access Level has been removed from long-lasting storage.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/accesscontextmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const accesscontextmanager = google.accesscontextmanager('v1beta');
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
         *   const res = await accesscontextmanager.accessPolicies.accessLevels.delete({
         *     // Required. Resource name for the Access Level.
         *     //
         *     // Format:
         *     // `accessPolicies/{policy_id}/accessLevels/{access_level_id}`
         *     name: 'accessPolicies/my-accessPolicie/accessLevels/my-accessLevel',
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
         * @alias accesscontextmanager.accessPolicies.accessLevels.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. Resource name for the Access Level.  Format: `accessPolicies/{policy_id}/accessLevels/{access_level_id}`
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Accesspolicies$Accesslevels$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Accesspolicies$Accesslevels$Delete, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        delete(params: Params$Resource$Accesspolicies$Accesslevels$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Accesspolicies$Accesslevels$Delete, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        delete(params: Params$Resource$Accesspolicies$Accesslevels$Delete, callback: BodyResponseCallback<Schema$Operation>): void;
        delete(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * accesscontextmanager.accessPolicies.accessLevels.get
         * @desc Get an Access Level by resource name.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/accesscontextmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const accesscontextmanager = google.accesscontextmanager('v1beta');
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
         *   const res = await accesscontextmanager.accessPolicies.accessLevels.get({
         *     // Whether to return `BasicLevels` in the Cloud Common Expression
         *     // Language rather than as `BasicLevels`. Defaults to AS_DEFINED, where
         *     // Access Levels
         *     // are returned as `BasicLevels` or `CustomLevels` based on how they were
         *     // created. If set to CEL, all Access Levels are returned as
         *     // `CustomLevels`. In the CEL case, `BasicLevels` are translated to equivalent
         *     // `CustomLevels`.
         *     accessLevelFormat: 'placeholder-value',
         *     // Required. Resource name for the Access Level.
         *     //
         *     // Format:
         *     // `accessPolicies/{policy_id}/accessLevels/{access_level_id}`
         *     name: 'accessPolicies/my-accessPolicie/accessLevels/my-accessLevel',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "basic": {},
         *   //   "custom": {},
         *   //   "description": "my_description",
         *   //   "name": "my_name",
         *   //   "title": "my_title"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias accesscontextmanager.accessPolicies.accessLevels.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.accessLevelFormat Whether to return `BasicLevels` in the Cloud Common Expression Language rather than as `BasicLevels`. Defaults to AS_DEFINED, where Access Levels are returned as `BasicLevels` or `CustomLevels` based on how they were created. If set to CEL, all Access Levels are returned as `CustomLevels`. In the CEL case, `BasicLevels` are translated to equivalent `CustomLevels`.
         * @param {string} params.name Required. Resource name for the Access Level.  Format: `accessPolicies/{policy_id}/accessLevels/{access_level_id}`
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Accesspolicies$Accesslevels$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Accesspolicies$Accesslevels$Get, options?: MethodOptions): GaxiosPromise<Schema$AccessLevel>;
        get(params: Params$Resource$Accesspolicies$Accesslevels$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Accesspolicies$Accesslevels$Get, options: MethodOptions | BodyResponseCallback<Schema$AccessLevel>, callback: BodyResponseCallback<Schema$AccessLevel>): void;
        get(params: Params$Resource$Accesspolicies$Accesslevels$Get, callback: BodyResponseCallback<Schema$AccessLevel>): void;
        get(callback: BodyResponseCallback<Schema$AccessLevel>): void;
        /**
         * accesscontextmanager.accessPolicies.accessLevels.list
         * @desc List all Access Levels for an access policy.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/accesscontextmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const accesscontextmanager = google.accesscontextmanager('v1beta');
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
         *   const res = await accesscontextmanager.accessPolicies.accessLevels.list({
         *     // Whether to return `BasicLevels` in the Cloud Common Expression language, as
         *     // `CustomLevels`, rather than as `BasicLevels`. Defaults to returning
         *     // `AccessLevels` in the format they were defined.
         *     accessLevelFormat: 'placeholder-value',
         *     // Number of Access Levels to include in
         *     // the list. Default 100.
         *     pageSize: 'placeholder-value',
         *     // Next page token for the next batch of Access Level instances.
         *     // Defaults to the first page of results.
         *     pageToken: 'placeholder-value',
         *     // Required. Resource name for the access policy to list Access Levels from.
         *     //
         *     // Format:
         *     // `accessPolicies/{policy_id}`
         *     parent: 'accessPolicies/my-accessPolicie',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "accessLevels": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias accesscontextmanager.accessPolicies.accessLevels.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.accessLevelFormat Whether to return `BasicLevels` in the Cloud Common Expression language, as `CustomLevels`, rather than as `BasicLevels`. Defaults to returning `AccessLevels` in the format they were defined.
         * @param {integer=} params.pageSize Number of Access Levels to include in the list. Default 100.
         * @param {string=} params.pageToken Next page token for the next batch of Access Level instances. Defaults to the first page of results.
         * @param {string} params.parent Required. Resource name for the access policy to list Access Levels from.  Format: `accessPolicies/{policy_id}`
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Accesspolicies$Accesslevels$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Accesspolicies$Accesslevels$List, options?: MethodOptions): GaxiosPromise<Schema$ListAccessLevelsResponse>;
        list(params: Params$Resource$Accesspolicies$Accesslevels$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Accesspolicies$Accesslevels$List, options: MethodOptions | BodyResponseCallback<Schema$ListAccessLevelsResponse>, callback: BodyResponseCallback<Schema$ListAccessLevelsResponse>): void;
        list(params: Params$Resource$Accesspolicies$Accesslevels$List, callback: BodyResponseCallback<Schema$ListAccessLevelsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListAccessLevelsResponse>): void;
        /**
         * accesscontextmanager.accessPolicies.accessLevels.patch
         * @desc Update an Access Level. The longrunning operation from this RPC will have a successful status once the changes to the Access Level have propagated to long-lasting storage. Access Levels containing errors will result in an error response for the first error encountered.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/accesscontextmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const accesscontextmanager = google.accesscontextmanager('v1beta');
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
         *   const res = await accesscontextmanager.accessPolicies.accessLevels.patch({
         *     // Required. Resource name for the Access Level. The `short_name` component
         *     // must begin with a letter and only include alphanumeric and '_'. Format:
         *     // `accessPolicies/{policy_id}/accessLevels/{short_name}`. The maximum length
         *     //  // of the `short_name` component is 50 characters.
         *     name: 'accessPolicies/my-accessPolicie/accessLevels/my-accessLevel',
         *     // Required. Mask to control which fields get updated. Must be non-empty.
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "basic": {},
         *       //   "custom": {},
         *       //   "description": "my_description",
         *       //   "name": "my_name",
         *       //   "title": "my_title"
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
         * @alias accesscontextmanager.accessPolicies.accessLevels.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. Resource name for the Access Level. The `short_name` component must begin with a letter and only include alphanumeric and '_'. Format: `accessPolicies/{policy_id}/accessLevels/{short_name}`. The maximum length  // of the `short_name` component is 50 characters.
         * @param {string=} params.updateMask Required. Mask to control which fields get updated. Must be non-empty.
         * @param {().AccessLevel} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Accesspolicies$Accesslevels$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Accesspolicies$Accesslevels$Patch, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        patch(params: Params$Resource$Accesspolicies$Accesslevels$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Accesspolicies$Accesslevels$Patch, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        patch(params: Params$Resource$Accesspolicies$Accesslevels$Patch, callback: BodyResponseCallback<Schema$Operation>): void;
        patch(callback: BodyResponseCallback<Schema$Operation>): void;
    }
    export interface Params$Resource$Accesspolicies$Accesslevels$Create extends StandardParameters {
        /**
         * Required. Resource name for the access policy which owns this Access Level.  Format: `accessPolicies/{policy_id}`
         */
        parent?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$AccessLevel;
    }
    export interface Params$Resource$Accesspolicies$Accesslevels$Delete extends StandardParameters {
        /**
         * Required. Resource name for the Access Level.  Format: `accessPolicies/{policy_id}/accessLevels/{access_level_id}`
         */
        name?: string;
    }
    export interface Params$Resource$Accesspolicies$Accesslevels$Get extends StandardParameters {
        /**
         * Whether to return `BasicLevels` in the Cloud Common Expression Language rather than as `BasicLevels`. Defaults to AS_DEFINED, where Access Levels are returned as `BasicLevels` or `CustomLevels` based on how they were created. If set to CEL, all Access Levels are returned as `CustomLevels`. In the CEL case, `BasicLevels` are translated to equivalent `CustomLevels`.
         */
        accessLevelFormat?: string;
        /**
         * Required. Resource name for the Access Level.  Format: `accessPolicies/{policy_id}/accessLevels/{access_level_id}`
         */
        name?: string;
    }
    export interface Params$Resource$Accesspolicies$Accesslevels$List extends StandardParameters {
        /**
         * Whether to return `BasicLevels` in the Cloud Common Expression language, as `CustomLevels`, rather than as `BasicLevels`. Defaults to returning `AccessLevels` in the format they were defined.
         */
        accessLevelFormat?: string;
        /**
         * Number of Access Levels to include in the list. Default 100.
         */
        pageSize?: number;
        /**
         * Next page token for the next batch of Access Level instances. Defaults to the first page of results.
         */
        pageToken?: string;
        /**
         * Required. Resource name for the access policy to list Access Levels from.  Format: `accessPolicies/{policy_id}`
         */
        parent?: string;
    }
    export interface Params$Resource$Accesspolicies$Accesslevels$Patch extends StandardParameters {
        /**
         * Required. Resource name for the Access Level. The `short_name` component must begin with a letter and only include alphanumeric and '_'. Format: `accessPolicies/{policy_id}/accessLevels/{short_name}`. The maximum length  // of the `short_name` component is 50 characters.
         */
        name?: string;
        /**
         * Required. Mask to control which fields get updated. Must be non-empty.
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$AccessLevel;
    }
    export class Resource$Accesspolicies$Serviceperimeters {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * accesscontextmanager.accessPolicies.servicePerimeters.create
         * @desc Create a Service Perimeter. The longrunning operation from this RPC will have a successful status once the Service Perimeter has propagated to long-lasting storage. Service Perimeters containing errors will result in an error response for the first error encountered.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/accesscontextmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const accesscontextmanager = google.accesscontextmanager('v1beta');
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
         *   const res = await accesscontextmanager.accessPolicies.servicePerimeters.create(
         *     {
         *       // Required. Resource name for the access policy which owns this Service
         *       // Perimeter.
         *       //
         *       // Format: `accessPolicies/{policy_id}`
         *       parent: 'accessPolicies/my-accessPolicie',
         *
         *       // Request body metadata
         *       requestBody: {
         *         // request body parameters
         *         // {
         *         //   "description": "my_description",
         *         //   "name": "my_name",
         *         //   "perimeterType": "my_perimeterType",
         *         //   "status": {},
         *         //   "title": "my_title"
         *         // }
         *       },
         *     }
         *   );
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
         * @alias accesscontextmanager.accessPolicies.servicePerimeters.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent Required. Resource name for the access policy which owns this Service Perimeter.  Format: `accessPolicies/{policy_id}`
         * @param {().ServicePerimeter} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Accesspolicies$Serviceperimeters$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Accesspolicies$Serviceperimeters$Create, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        create(params: Params$Resource$Accesspolicies$Serviceperimeters$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Accesspolicies$Serviceperimeters$Create, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        create(params: Params$Resource$Accesspolicies$Serviceperimeters$Create, callback: BodyResponseCallback<Schema$Operation>): void;
        create(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * accesscontextmanager.accessPolicies.servicePerimeters.delete
         * @desc Delete a Service Perimeter by resource name. The longrunning operation from this RPC will have a successful status once the Service Perimeter has been removed from long-lasting storage.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/accesscontextmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const accesscontextmanager = google.accesscontextmanager('v1beta');
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
         *   const res = await accesscontextmanager.accessPolicies.servicePerimeters.delete(
         *     {
         *       // Required. Resource name for the Service Perimeter.
         *       //
         *       // Format:
         *       // `accessPolicies/{policy_id}/servicePerimeters/{service_perimeter_id}`
         *       name:
         *         'accessPolicies/my-accessPolicie/servicePerimeters/my-servicePerimeter',
         *     }
         *   );
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
         * @alias accesscontextmanager.accessPolicies.servicePerimeters.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. Resource name for the Service Perimeter.  Format: `accessPolicies/{policy_id}/servicePerimeters/{service_perimeter_id}`
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Accesspolicies$Serviceperimeters$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Accesspolicies$Serviceperimeters$Delete, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        delete(params: Params$Resource$Accesspolicies$Serviceperimeters$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Accesspolicies$Serviceperimeters$Delete, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        delete(params: Params$Resource$Accesspolicies$Serviceperimeters$Delete, callback: BodyResponseCallback<Schema$Operation>): void;
        delete(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * accesscontextmanager.accessPolicies.servicePerimeters.get
         * @desc Get a Service Perimeter by resource name.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/accesscontextmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const accesscontextmanager = google.accesscontextmanager('v1beta');
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
         *   const res = await accesscontextmanager.accessPolicies.servicePerimeters.get({
         *     // Required. Resource name for the Service Perimeter.
         *     //
         *     // Format:
         *     // `accessPolicies/{policy_id}/servicePerimeters/{service_perimeters_id}`
         *     name:
         *       'accessPolicies/my-accessPolicie/servicePerimeters/my-servicePerimeter',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "description": "my_description",
         *   //   "name": "my_name",
         *   //   "perimeterType": "my_perimeterType",
         *   //   "status": {},
         *   //   "title": "my_title"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias accesscontextmanager.accessPolicies.servicePerimeters.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. Resource name for the Service Perimeter.  Format: `accessPolicies/{policy_id}/servicePerimeters/{service_perimeters_id}`
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Accesspolicies$Serviceperimeters$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Accesspolicies$Serviceperimeters$Get, options?: MethodOptions): GaxiosPromise<Schema$ServicePerimeter>;
        get(params: Params$Resource$Accesspolicies$Serviceperimeters$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Accesspolicies$Serviceperimeters$Get, options: MethodOptions | BodyResponseCallback<Schema$ServicePerimeter>, callback: BodyResponseCallback<Schema$ServicePerimeter>): void;
        get(params: Params$Resource$Accesspolicies$Serviceperimeters$Get, callback: BodyResponseCallback<Schema$ServicePerimeter>): void;
        get(callback: BodyResponseCallback<Schema$ServicePerimeter>): void;
        /**
         * accesscontextmanager.accessPolicies.servicePerimeters.list
         * @desc List all Service Perimeters for an access policy.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/accesscontextmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const accesscontextmanager = google.accesscontextmanager('v1beta');
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
         *   const res = await accesscontextmanager.accessPolicies.servicePerimeters.list({
         *     // Number of Service Perimeters to include
         *     // in the list. Default 100.
         *     pageSize: 'placeholder-value',
         *     // Next page token for the next batch of Service Perimeter instances.
         *     // Defaults to the first page of results.
         *     pageToken: 'placeholder-value',
         *     // Required. Resource name for the access policy to list Service Perimeters from.
         *     //
         *     // Format:
         *     // `accessPolicies/{policy_id}`
         *     parent: 'accessPolicies/my-accessPolicie',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "servicePerimeters": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias accesscontextmanager.accessPolicies.servicePerimeters.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize Number of Service Perimeters to include in the list. Default 100.
         * @param {string=} params.pageToken Next page token for the next batch of Service Perimeter instances. Defaults to the first page of results.
         * @param {string} params.parent Required. Resource name for the access policy to list Service Perimeters from.  Format: `accessPolicies/{policy_id}`
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Accesspolicies$Serviceperimeters$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Accesspolicies$Serviceperimeters$List, options?: MethodOptions): GaxiosPromise<Schema$ListServicePerimetersResponse>;
        list(params: Params$Resource$Accesspolicies$Serviceperimeters$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Accesspolicies$Serviceperimeters$List, options: MethodOptions | BodyResponseCallback<Schema$ListServicePerimetersResponse>, callback: BodyResponseCallback<Schema$ListServicePerimetersResponse>): void;
        list(params: Params$Resource$Accesspolicies$Serviceperimeters$List, callback: BodyResponseCallback<Schema$ListServicePerimetersResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListServicePerimetersResponse>): void;
        /**
         * accesscontextmanager.accessPolicies.servicePerimeters.patch
         * @desc Update a Service Perimeter. The longrunning operation from this RPC will have a successful status once the changes to the Service Perimeter have propagated to long-lasting storage. Service Perimeter containing errors will result in an error response for the first error encountered.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/accesscontextmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const accesscontextmanager = google.accesscontextmanager('v1beta');
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
         *   const res = await accesscontextmanager.accessPolicies.servicePerimeters.patch(
         *     {
         *       // Required. Resource name for the ServicePerimeter.  The `short_name`
         *       // component must begin with a letter and only include alphanumeric and '_'.
         *       // Format: `accessPolicies/{policy_id}/servicePerimeters/{short_name}`
         *       name:
         *         'accessPolicies/my-accessPolicie/servicePerimeters/my-servicePerimeter',
         *       // Required. Mask to control which fields get updated. Must be non-empty.
         *       updateMask: 'placeholder-value',
         *
         *       // Request body metadata
         *       requestBody: {
         *         // request body parameters
         *         // {
         *         //   "description": "my_description",
         *         //   "name": "my_name",
         *         //   "perimeterType": "my_perimeterType",
         *         //   "status": {},
         *         //   "title": "my_title"
         *         // }
         *       },
         *     }
         *   );
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
         * @alias accesscontextmanager.accessPolicies.servicePerimeters.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. Resource name for the ServicePerimeter.  The `short_name` component must begin with a letter and only include alphanumeric and '_'. Format: `accessPolicies/{policy_id}/servicePerimeters/{short_name}`
         * @param {string=} params.updateMask Required. Mask to control which fields get updated. Must be non-empty.
         * @param {().ServicePerimeter} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Accesspolicies$Serviceperimeters$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Accesspolicies$Serviceperimeters$Patch, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        patch(params: Params$Resource$Accesspolicies$Serviceperimeters$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Accesspolicies$Serviceperimeters$Patch, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        patch(params: Params$Resource$Accesspolicies$Serviceperimeters$Patch, callback: BodyResponseCallback<Schema$Operation>): void;
        patch(callback: BodyResponseCallback<Schema$Operation>): void;
    }
    export interface Params$Resource$Accesspolicies$Serviceperimeters$Create extends StandardParameters {
        /**
         * Required. Resource name for the access policy which owns this Service Perimeter.  Format: `accessPolicies/{policy_id}`
         */
        parent?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ServicePerimeter;
    }
    export interface Params$Resource$Accesspolicies$Serviceperimeters$Delete extends StandardParameters {
        /**
         * Required. Resource name for the Service Perimeter.  Format: `accessPolicies/{policy_id}/servicePerimeters/{service_perimeter_id}`
         */
        name?: string;
    }
    export interface Params$Resource$Accesspolicies$Serviceperimeters$Get extends StandardParameters {
        /**
         * Required. Resource name for the Service Perimeter.  Format: `accessPolicies/{policy_id}/servicePerimeters/{service_perimeters_id}`
         */
        name?: string;
    }
    export interface Params$Resource$Accesspolicies$Serviceperimeters$List extends StandardParameters {
        /**
         * Number of Service Perimeters to include in the list. Default 100.
         */
        pageSize?: number;
        /**
         * Next page token for the next batch of Service Perimeter instances. Defaults to the first page of results.
         */
        pageToken?: string;
        /**
         * Required. Resource name for the access policy to list Service Perimeters from.  Format: `accessPolicies/{policy_id}`
         */
        parent?: string;
    }
    export interface Params$Resource$Accesspolicies$Serviceperimeters$Patch extends StandardParameters {
        /**
         * Required. Resource name for the ServicePerimeter.  The `short_name` component must begin with a letter and only include alphanumeric and '_'. Format: `accessPolicies/{policy_id}/servicePerimeters/{short_name}`
         */
        name?: string;
        /**
         * Required. Mask to control which fields get updated. Must be non-empty.
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ServicePerimeter;
    }
    export class Resource$Operations {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * accesscontextmanager.operations.get
         * @desc Gets the latest state of a long-running operation.  Clients can use this method to poll the operation result at intervals as recommended by the API service.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/accesscontextmanager.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const accesscontextmanager = google.accesscontextmanager('v1beta');
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
         *   const res = await accesscontextmanager.operations.get({
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
         * @alias accesscontextmanager.operations.get
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
    }
    export interface Params$Resource$Operations$Get extends StandardParameters {
        /**
         * The name of the operation resource.
         */
        name?: string;
    }
    export {};
}
