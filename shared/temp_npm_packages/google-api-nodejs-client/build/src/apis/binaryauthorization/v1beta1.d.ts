/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace binaryauthorization_v1beta1 {
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
     * Binary Authorization API
     *
     * The management interface for Binary Authorization, a system providing policy control for images deployed to Kubernetes Engine clusters.
     *
     * @example
     * const {google} = require('googleapis');
     * const binaryauthorization = google.binaryauthorization('v1beta1');
     *
     * @namespace binaryauthorization
     * @type {Function}
     * @version v1beta1
     * @variation v1beta1
     * @param {object=} options Options for Binaryauthorization
     */
    export class Binaryauthorization {
        context: APIRequestContext;
        projects: Resource$Projects;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    /**
     * An admission rule specifies either that all container images used in a pod creation request must be attested to by one or more attestors, that all pod creations will be allowed, or that all pod creations will be denied.  Images matching an admission whitelist pattern are exempted from admission rules and will never block a pod creation.
     */
    export interface Schema$AdmissionRule {
        /**
         * Required. The action when a pod creation is denied by the admission rule.
         */
        enforcementMode?: string | null;
        /**
         * Required. How this admission rule will be evaluated.
         */
        evaluationMode?: string | null;
        /**
         * Optional. The resource names of the attestors that must attest to a container image, in the format `projects/x/attestors/x. Each attestor must exist before a policy can reference it.  To add an attestor to a policy the principal issuing the policy change request must be able to read the attestor resource.  Note: this field must be non-empty when the evaluation_mode field specifies REQUIRE_ATTESTATION, otherwise it must be empty.
         */
        requireAttestationsBy?: string[] | null;
    }
    /**
     * An admission whitelist pattern exempts images from checks by admission rules.
     */
    export interface Schema$AdmissionWhitelistPattern {
        /**
         * An image name pattern to whitelist, in the form `registry/path/to/image`. This supports a trailing `*` as a wildcard, but this is allowed only in text after the `registry/` part.
         */
        namePattern?: string | null;
    }
    /**
     * An attestor that attests to container image artifacts. An existing attestor cannot be modified except where indicated.
     */
    export interface Schema$Attestor {
        /**
         * Optional. A descriptive comment.  This field may be updated. The field may be displayed in chooser dialogs.
         */
        description?: string | null;
        /**
         * Required. The resource name, in the format: `projects/x/attestors/x. This field may not be updated.
         */
        name?: string | null;
        /**
         * Output only. Time when the attestor was last updated.
         */
        updateTime?: string | null;
        /**
         * A Drydock ATTESTATION_AUTHORITY Note, created by the user.
         */
        userOwnedDrydockNote?: Schema$UserOwnedDrydockNote;
    }
    /**
     * An attestor public key that will be used to verify attestations signed by this attestor.
     */
    export interface Schema$AttestorPublicKey {
        /**
         * ASCII-armored representation of a PGP public key, as the entire output by the command `gpg --export --armor foo@example.com` (either LF or CRLF line endings). When using this field, `id` should be left blank.  The BinAuthz API handlers will calculate the ID and fill it in automatically.  BinAuthz computes this ID as the OpenPGP RFC4880 V4 fingerprint, represented as upper-case hex.  If `id` is provided by the caller, it will be overwritten by the API-calculated ID.
         */
        asciiArmoredPgpPublicKey?: string | null;
        /**
         * Optional. A descriptive comment. This field may be updated.
         */
        comment?: string | null;
        /**
         * The ID of this public key. Signatures verified by BinAuthz must include the ID of the public key that can be used to verify them, and that ID must match the contents of this field exactly. Additional restrictions on this field can be imposed based on which public key type is encapsulated. See the documentation on `public_key` cases below for details.
         */
        id?: string | null;
        /**
         * A raw PKIX SubjectPublicKeyInfo format public key.  NOTE: `id` may be explicitly provided by the caller when using this type of public key, but it MUST be a valid RFC3986 URI. If `id` is left blank, a default one will be computed based on the digest of the DER encoding of the public key.
         */
        pkixPublicKey?: Schema$PkixPublicKey;
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
     * A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance:      service Foo {       rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty);     }  The JSON representation for `Empty` is empty JSON object `{}`.
     */
    export interface Schema$Empty {
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
     * An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources.   A `Policy` is a collection of `bindings`. A `binding` binds one or more `members` to a single `role`. Members can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role.  For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies).  **JSON example:**      {       &quot;bindings&quot;: [         {           &quot;role&quot;: &quot;roles/resourcemanager.organizationAdmin&quot;,           &quot;members&quot;: [             &quot;user:mike@example.com&quot;,             &quot;group:admins@example.com&quot;,             &quot;domain:google.com&quot;,             &quot;serviceAccount:my-project-id@appspot.gserviceaccount.com&quot;           ]         },         {           &quot;role&quot;: &quot;roles/resourcemanager.organizationViewer&quot;,           &quot;members&quot;: [             &quot;user:eve@example.com&quot;           ],           &quot;condition&quot;: {             &quot;title&quot;: &quot;expirable access&quot;,             &quot;description&quot;: &quot;Does not grant access after Sep 2020&quot;,             &quot;expression&quot;: &quot;request.time &lt; timestamp(&#39;2020-10-01T00:00:00.000Z&#39;)&quot;,           }         }       ],       &quot;etag&quot;: &quot;BwWWja0YfJA=&quot;,       &quot;version&quot;: 3     }  **YAML example:**      bindings:     - members:       - user:mike@example.com       - group:admins@example.com       - domain:google.com       - serviceAccount:my-project-id@appspot.gserviceaccount.com       role: roles/resourcemanager.organizationAdmin     - members:       - user:eve@example.com       role: roles/resourcemanager.organizationViewer       condition:         title: expirable access         description: Does not grant access after Sep 2020         expression: request.time &lt; timestamp(&#39;2020-10-01T00:00:00.000Z&#39;)     - etag: BwWWja0YfJA=     - version: 3  For a description of IAM and its features, see the [IAM documentation](https://cloud.google.com/iam/docs/).
     */
    export interface Schema$IamPolicy {
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
     * Response message for BinauthzManagementService.ListAttestors.
     */
    export interface Schema$ListAttestorsResponse {
        /**
         * The list of attestors.
         */
        attestors?: Schema$Attestor[];
        /**
         * A token to retrieve the next page of results. Pass this value in the ListAttestorsRequest.page_token field in the subsequent call to the `ListAttestors` method to retrieve the next page of results.
         */
        nextPageToken?: string | null;
    }
    /**
     * A public key in the PkixPublicKey format (see https://tools.ietf.org/html/rfc5280#section-4.1.2.7 for details). Public keys of this type are typically textually encoded using the PEM format.
     */
    export interface Schema$PkixPublicKey {
        /**
         * A PEM-encoded public key, as described in https://tools.ietf.org/html/rfc7468#section-13
         */
        publicKeyPem?: string | null;
        /**
         * The signature algorithm used to verify a message against a signature using this key. These signature algorithm must match the structure and any object identifiers encoded in `public_key_pem` (i.e. this algorithm must match that of the public key).
         */
        signatureAlgorithm?: string | null;
    }
    /**
     * A policy for container image binary authorization.
     */
    export interface Schema$Policy {
        /**
         * Optional. Admission policy whitelisting. A matching admission request will always be permitted. This feature is typically used to exclude Google or third-party infrastructure images from Binary Authorization policies.
         */
        admissionWhitelistPatterns?: Schema$AdmissionWhitelistPattern[];
        /**
         * Optional. Per-cluster admission rules. Cluster spec format: `location.clusterId`. There can be at most one admission rule per cluster spec. A `location` is either a compute zone (e.g. us-central1-a) or a region (e.g. us-central1). For `clusterId` syntax restrictions see https://cloud.google.com/container-engine/reference/rest/v1/projects.zones.clusters.
         */
        clusterAdmissionRules?: {
            [key: string]: Schema$AdmissionRule;
        } | null;
        /**
         * Required. Default admission rule for a cluster without a per-cluster, per- kubernetes-service-account, or per-istio-service-identity admission rule.
         */
        defaultAdmissionRule?: Schema$AdmissionRule;
        /**
         * Optional. A descriptive comment.
         */
        description?: string | null;
        /**
         * Optional. Controls the evaluation of a Google-maintained global admission policy for common system-level images. Images not covered by the global policy will be subject to the project admission policy. This setting has no effect when specified inside a global admission policy.
         */
        globalPolicyEvaluationMode?: string | null;
        /**
         * Output only. The resource name, in the format `projects/x/policy`. There is at most one policy per project.
         */
        name?: string | null;
        /**
         * Output only. Time when the policy was last updated.
         */
        updateTime?: string | null;
    }
    /**
     * Request message for `SetIamPolicy` method.
     */
    export interface Schema$SetIamPolicyRequest {
        /**
         * REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Cloud Platform services (such as Projects) might reject them.
         */
        policy?: Schema$IamPolicy;
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
     * An user owned drydock note references a Drydock ATTESTATION_AUTHORITY Note created by the user.
     */
    export interface Schema$UserOwnedDrydockNote {
        /**
         * Output only. This field will contain the service account email address that this Attestor will use as the principal when querying Container Analysis. Attestor administrators must grant this service account the IAM role needed to read attestations from the note_reference in Container Analysis (`containeranalysis.notes.occurrences.viewer`).  This email address is fixed for the lifetime of the Attestor, but callers should not make any other assumptions about the service account email; future versions may use an email based on a different naming pattern.
         */
        delegationServiceAccountEmail?: string | null;
        /**
         * Required. The Drydock resource name of a ATTESTATION_AUTHORITY Note, created by the user, in the format: `projects/x/notes/x (or the legacy `providers/x/notes/x). This field may not be updated.  An attestation by this attestor is stored as a Drydock ATTESTATION_AUTHORITY Occurrence that names a container image and that links to this Note. Drydock is an external dependency.
         */
        noteReference?: string | null;
        /**
         * Optional. Public keys that verify attestations signed by this attestor.  This field may be updated.  If this field is non-empty, one of the specified public keys must verify that an attestation was signed by this attestor for the image specified in the admission request.  If this field is empty, this attestor always returns that no valid attestations exist.
         */
        publicKeys?: Schema$AttestorPublicKey[];
    }
    export class Resource$Projects {
        context: APIRequestContext;
        attestors: Resource$Projects$Attestors;
        policy: Resource$Projects$Policy;
        constructor(context: APIRequestContext);
        /**
         * binaryauthorization.projects.getPolicy
         * @desc A policy specifies the attestors that must attest to a container image, before the project is allowed to deploy that image. There is at most one policy per project. All image admission requests are permitted if a project has no policy.  Gets the policy for this project. Returns a default policy if the project does not have one.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/binaryauthorization.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const binaryauthorization = google.binaryauthorization('v1beta1');
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
         *   const res = await binaryauthorization.projects.getPolicy({
         *     // Required. The resource name of the policy to retrieve,
         *     // in the format `projects/x/policy`.
         *     name: 'projects/my-project/policy',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "admissionWhitelistPatterns": [],
         *   //   "clusterAdmissionRules": {},
         *   //   "defaultAdmissionRule": {},
         *   //   "description": "my_description",
         *   //   "globalPolicyEvaluationMode": "my_globalPolicyEvaluationMode",
         *   //   "name": "my_name",
         *   //   "updateTime": "my_updateTime"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias binaryauthorization.projects.getPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the policy to retrieve, in the format `projects/x/policy`.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getPolicy(params: Params$Resource$Projects$Getpolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getPolicy(params?: Params$Resource$Projects$Getpolicy, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        getPolicy(params: Params$Resource$Projects$Getpolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getPolicy(params: Params$Resource$Projects$Getpolicy, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        getPolicy(params: Params$Resource$Projects$Getpolicy, callback: BodyResponseCallback<Schema$Policy>): void;
        getPolicy(callback: BodyResponseCallback<Schema$Policy>): void;
        /**
         * binaryauthorization.projects.updatePolicy
         * @desc Creates or updates a project's policy, and returns a copy of the new policy. A policy is always updated as a whole, to avoid race conditions with concurrent policy enforcement (or management!) requests. Returns NOT_FOUND if the project does not exist, INVALID_ARGUMENT if the request is malformed.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/binaryauthorization.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const binaryauthorization = google.binaryauthorization('v1beta1');
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
         *   const res = await binaryauthorization.projects.updatePolicy({
         *     // Output only. The resource name, in the format `projects/x/policy`. There is
         *     // at most one policy per project.
         *     name: 'projects/my-project/policy',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "admissionWhitelistPatterns": [],
         *       //   "clusterAdmissionRules": {},
         *       //   "defaultAdmissionRule": {},
         *       //   "description": "my_description",
         *       //   "globalPolicyEvaluationMode": "my_globalPolicyEvaluationMode",
         *       //   "name": "my_name",
         *       //   "updateTime": "my_updateTime"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "admissionWhitelistPatterns": [],
         *   //   "clusterAdmissionRules": {},
         *   //   "defaultAdmissionRule": {},
         *   //   "description": "my_description",
         *   //   "globalPolicyEvaluationMode": "my_globalPolicyEvaluationMode",
         *   //   "name": "my_name",
         *   //   "updateTime": "my_updateTime"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias binaryauthorization.projects.updatePolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Output only. The resource name, in the format `projects/x/policy`. There is at most one policy per project.
         * @param {().Policy} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        updatePolicy(params: Params$Resource$Projects$Updatepolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        updatePolicy(params?: Params$Resource$Projects$Updatepolicy, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        updatePolicy(params: Params$Resource$Projects$Updatepolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        updatePolicy(params: Params$Resource$Projects$Updatepolicy, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        updatePolicy(params: Params$Resource$Projects$Updatepolicy, callback: BodyResponseCallback<Schema$Policy>): void;
        updatePolicy(callback: BodyResponseCallback<Schema$Policy>): void;
    }
    export interface Params$Resource$Projects$Getpolicy extends StandardParameters {
        /**
         * Required. The resource name of the policy to retrieve, in the format `projects/x/policy`.
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Updatepolicy extends StandardParameters {
        /**
         * Output only. The resource name, in the format `projects/x/policy`. There is at most one policy per project.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Policy;
    }
    export class Resource$Projects$Attestors {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * binaryauthorization.projects.attestors.create
         * @desc Creates an attestor, and returns a copy of the new attestor. Returns NOT_FOUND if the project does not exist, INVALID_ARGUMENT if the request is malformed, ALREADY_EXISTS if the attestor already exists.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/binaryauthorization.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const binaryauthorization = google.binaryauthorization('v1beta1');
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
         *   const res = await binaryauthorization.projects.attestors.create({
         *     // Required. The attestors ID.
         *     attestorId: 'placeholder-value',
         *     // Required. The parent of this attestor.
         *     parent: 'projects/my-project',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "description": "my_description",
         *       //   "name": "my_name",
         *       //   "updateTime": "my_updateTime",
         *       //   "userOwnedDrydockNote": {}
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "description": "my_description",
         *   //   "name": "my_name",
         *   //   "updateTime": "my_updateTime",
         *   //   "userOwnedDrydockNote": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias binaryauthorization.projects.attestors.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.attestorId Required. The attestors ID.
         * @param {string} params.parent Required. The parent of this attestor.
         * @param {().Attestor} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Projects$Attestors$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Projects$Attestors$Create, options?: MethodOptions): GaxiosPromise<Schema$Attestor>;
        create(params: Params$Resource$Projects$Attestors$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Projects$Attestors$Create, options: MethodOptions | BodyResponseCallback<Schema$Attestor>, callback: BodyResponseCallback<Schema$Attestor>): void;
        create(params: Params$Resource$Projects$Attestors$Create, callback: BodyResponseCallback<Schema$Attestor>): void;
        create(callback: BodyResponseCallback<Schema$Attestor>): void;
        /**
         * binaryauthorization.projects.attestors.delete
         * @desc Deletes an attestor. Returns NOT_FOUND if the attestor does not exist.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/binaryauthorization.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const binaryauthorization = google.binaryauthorization('v1beta1');
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
         *   const res = await binaryauthorization.projects.attestors.delete({
         *     // Required. The name of the attestors to delete, in the format
         *     // `projects/x/attestors/x`.
         *     name: 'projects/my-project/attestors/my-attestor',
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
         * @alias binaryauthorization.projects.attestors.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The name of the attestors to delete, in the format `projects/x/attestors/x`.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Projects$Attestors$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Projects$Attestors$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Projects$Attestors$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Projects$Attestors$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Projects$Attestors$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * binaryauthorization.projects.attestors.get
         * @desc Gets an attestor. Returns NOT_FOUND if the attestor does not exist.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/binaryauthorization.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const binaryauthorization = google.binaryauthorization('v1beta1');
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
         *   const res = await binaryauthorization.projects.attestors.get({
         *     // Required. The name of the attestor to retrieve, in the format
         *     // `projects/x/attestors/x`.
         *     name: 'projects/my-project/attestors/my-attestor',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "description": "my_description",
         *   //   "name": "my_name",
         *   //   "updateTime": "my_updateTime",
         *   //   "userOwnedDrydockNote": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias binaryauthorization.projects.attestors.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The name of the attestor to retrieve, in the format `projects/x/attestors/x`.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Attestors$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Attestors$Get, options?: MethodOptions): GaxiosPromise<Schema$Attestor>;
        get(params: Params$Resource$Projects$Attestors$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Attestors$Get, options: MethodOptions | BodyResponseCallback<Schema$Attestor>, callback: BodyResponseCallback<Schema$Attestor>): void;
        get(params: Params$Resource$Projects$Attestors$Get, callback: BodyResponseCallback<Schema$Attestor>): void;
        get(callback: BodyResponseCallback<Schema$Attestor>): void;
        /**
         * binaryauthorization.projects.attestors.getIamPolicy
         * @desc Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/binaryauthorization.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const binaryauthorization = google.binaryauthorization('v1beta1');
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
         *   const res = await binaryauthorization.projects.attestors.getIamPolicy({
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
         *     resource: 'projects/my-project/attestors/my-attestor',
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
         * @alias binaryauthorization.projects.attestors.getIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.options.requestedPolicyVersion Optional. The policy format version to be returned.  Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.  Requests for policies with any conditional bindings must specify version 3. Policies without any conditional bindings may specify any valid value or leave the field unset.  To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
         * @param {string} params.resource_ REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getIamPolicy(params: Params$Resource$Projects$Attestors$Getiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getIamPolicy(params?: Params$Resource$Projects$Attestors$Getiampolicy, options?: MethodOptions): GaxiosPromise<Schema$IamPolicy>;
        getIamPolicy(params: Params$Resource$Projects$Attestors$Getiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getIamPolicy(params: Params$Resource$Projects$Attestors$Getiampolicy, options: MethodOptions | BodyResponseCallback<Schema$IamPolicy>, callback: BodyResponseCallback<Schema$IamPolicy>): void;
        getIamPolicy(params: Params$Resource$Projects$Attestors$Getiampolicy, callback: BodyResponseCallback<Schema$IamPolicy>): void;
        getIamPolicy(callback: BodyResponseCallback<Schema$IamPolicy>): void;
        /**
         * binaryauthorization.projects.attestors.list
         * @desc Lists attestors. Returns INVALID_ARGUMENT if the project does not exist.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/binaryauthorization.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const binaryauthorization = google.binaryauthorization('v1beta1');
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
         *   const res = await binaryauthorization.projects.attestors.list({
         *     // Requested page size. The server may return fewer results than requested. If
         *     // unspecified, the server will pick an appropriate default.
         *     pageSize: 'placeholder-value',
         *     // A token identifying a page of results the server should return. Typically,
         *     // this is the value of ListAttestorsResponse.next_page_token returned
         *     // from the previous call to the `ListAttestors` method.
         *     pageToken: 'placeholder-value',
         *     // Required. The resource name of the project associated with the
         *     // attestors, in the format `projects/x`.
         *     parent: 'projects/my-project',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "attestors": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias binaryauthorization.projects.attestors.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default.
         * @param {string=} params.pageToken A token identifying a page of results the server should return. Typically, this is the value of ListAttestorsResponse.next_page_token returned from the previous call to the `ListAttestors` method.
         * @param {string} params.parent Required. The resource name of the project associated with the attestors, in the format `projects/x`.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Attestors$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Attestors$List, options?: MethodOptions): GaxiosPromise<Schema$ListAttestorsResponse>;
        list(params: Params$Resource$Projects$Attestors$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Attestors$List, options: MethodOptions | BodyResponseCallback<Schema$ListAttestorsResponse>, callback: BodyResponseCallback<Schema$ListAttestorsResponse>): void;
        list(params: Params$Resource$Projects$Attestors$List, callback: BodyResponseCallback<Schema$ListAttestorsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListAttestorsResponse>): void;
        /**
         * binaryauthorization.projects.attestors.setIamPolicy
         * @desc Sets the access control policy on the specified resource. Replaces any existing policy.  Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/binaryauthorization.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const binaryauthorization = google.binaryauthorization('v1beta1');
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
         *   const res = await binaryauthorization.projects.attestors.setIamPolicy({
         *     // REQUIRED: The resource for which the policy is being specified.
         *     // See the operation documentation for the appropriate value for this field.
         *     resource: 'projects/my-project/attestors/my-attestor',
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
         * @alias binaryauthorization.projects.attestors.setIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         * @param {().SetIamPolicyRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        setIamPolicy(params: Params$Resource$Projects$Attestors$Setiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        setIamPolicy(params?: Params$Resource$Projects$Attestors$Setiampolicy, options?: MethodOptions): GaxiosPromise<Schema$IamPolicy>;
        setIamPolicy(params: Params$Resource$Projects$Attestors$Setiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        setIamPolicy(params: Params$Resource$Projects$Attestors$Setiampolicy, options: MethodOptions | BodyResponseCallback<Schema$IamPolicy>, callback: BodyResponseCallback<Schema$IamPolicy>): void;
        setIamPolicy(params: Params$Resource$Projects$Attestors$Setiampolicy, callback: BodyResponseCallback<Schema$IamPolicy>): void;
        setIamPolicy(callback: BodyResponseCallback<Schema$IamPolicy>): void;
        /**
         * binaryauthorization.projects.attestors.testIamPermissions
         * @desc Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error.  Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/binaryauthorization.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const binaryauthorization = google.binaryauthorization('v1beta1');
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
         *   const res = await binaryauthorization.projects.attestors.testIamPermissions({
         *     // REQUIRED: The resource for which the policy detail is being requested.
         *     // See the operation documentation for the appropriate value for this field.
         *     resource: 'projects/my-project/attestors/my-attestor',
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
         * @alias binaryauthorization.projects.attestors.testIamPermissions
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         * @param {().TestIamPermissionsRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        testIamPermissions(params: Params$Resource$Projects$Attestors$Testiampermissions, options: StreamMethodOptions): GaxiosPromise<Readable>;
        testIamPermissions(params?: Params$Resource$Projects$Attestors$Testiampermissions, options?: MethodOptions): GaxiosPromise<Schema$TestIamPermissionsResponse>;
        testIamPermissions(params: Params$Resource$Projects$Attestors$Testiampermissions, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        testIamPermissions(params: Params$Resource$Projects$Attestors$Testiampermissions, options: MethodOptions | BodyResponseCallback<Schema$TestIamPermissionsResponse>, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(params: Params$Resource$Projects$Attestors$Testiampermissions, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        /**
         * binaryauthorization.projects.attestors.update
         * @desc Updates an attestor. Returns NOT_FOUND if the attestor does not exist.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/binaryauthorization.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const binaryauthorization = google.binaryauthorization('v1beta1');
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
         *   const res = await binaryauthorization.projects.attestors.update({
         *     // Required. The resource name, in the format:
         *     // `projects/x/attestors/x`. This field may not be updated.
         *     name: 'projects/my-project/attestors/my-attestor',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "description": "my_description",
         *       //   "name": "my_name",
         *       //   "updateTime": "my_updateTime",
         *       //   "userOwnedDrydockNote": {}
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "description": "my_description",
         *   //   "name": "my_name",
         *   //   "updateTime": "my_updateTime",
         *   //   "userOwnedDrydockNote": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias binaryauthorization.projects.attestors.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name, in the format: `projects/x/attestors/x`. This field may not be updated.
         * @param {().Attestor} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Projects$Attestors$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Projects$Attestors$Update, options?: MethodOptions): GaxiosPromise<Schema$Attestor>;
        update(params: Params$Resource$Projects$Attestors$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Projects$Attestors$Update, options: MethodOptions | BodyResponseCallback<Schema$Attestor>, callback: BodyResponseCallback<Schema$Attestor>): void;
        update(params: Params$Resource$Projects$Attestors$Update, callback: BodyResponseCallback<Schema$Attestor>): void;
        update(callback: BodyResponseCallback<Schema$Attestor>): void;
    }
    export interface Params$Resource$Projects$Attestors$Create extends StandardParameters {
        /**
         * Required. The attestors ID.
         */
        attestorId?: string;
        /**
         * Required. The parent of this attestor.
         */
        parent?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Attestor;
    }
    export interface Params$Resource$Projects$Attestors$Delete extends StandardParameters {
        /**
         * Required. The name of the attestors to delete, in the format `projects/x/attestors/x`.
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Attestors$Get extends StandardParameters {
        /**
         * Required. The name of the attestor to retrieve, in the format `projects/x/attestors/x`.
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Attestors$Getiampolicy extends StandardParameters {
        /**
         * Optional. The policy format version to be returned.  Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.  Requests for policies with any conditional bindings must specify version 3. Policies without any conditional bindings may specify any valid value or leave the field unset.  To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
         */
        'options.requestedPolicyVersion'?: number;
        /**
         * REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
    }
    export interface Params$Resource$Projects$Attestors$List extends StandardParameters {
        /**
         * Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default.
         */
        pageSize?: number;
        /**
         * A token identifying a page of results the server should return. Typically, this is the value of ListAttestorsResponse.next_page_token returned from the previous call to the `ListAttestors` method.
         */
        pageToken?: string;
        /**
         * Required. The resource name of the project associated with the attestors, in the format `projects/x`.
         */
        parent?: string;
    }
    export interface Params$Resource$Projects$Attestors$Setiampolicy extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$SetIamPolicyRequest;
    }
    export interface Params$Resource$Projects$Attestors$Testiampermissions extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$TestIamPermissionsRequest;
    }
    export interface Params$Resource$Projects$Attestors$Update extends StandardParameters {
        /**
         * Required. The resource name, in the format: `projects/x/attestors/x`. This field may not be updated.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Attestor;
    }
    export class Resource$Projects$Policy {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * binaryauthorization.projects.policy.getIamPolicy
         * @desc Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/binaryauthorization.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const binaryauthorization = google.binaryauthorization('v1beta1');
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
         *   const res = await binaryauthorization.projects.policy.getIamPolicy({
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
         *     resource: 'projects/my-project/policy',
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
         * @alias binaryauthorization.projects.policy.getIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.options.requestedPolicyVersion Optional. The policy format version to be returned.  Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.  Requests for policies with any conditional bindings must specify version 3. Policies without any conditional bindings may specify any valid value or leave the field unset.  To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
         * @param {string} params.resource_ REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getIamPolicy(params: Params$Resource$Projects$Policy$Getiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getIamPolicy(params?: Params$Resource$Projects$Policy$Getiampolicy, options?: MethodOptions): GaxiosPromise<Schema$IamPolicy>;
        getIamPolicy(params: Params$Resource$Projects$Policy$Getiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getIamPolicy(params: Params$Resource$Projects$Policy$Getiampolicy, options: MethodOptions | BodyResponseCallback<Schema$IamPolicy>, callback: BodyResponseCallback<Schema$IamPolicy>): void;
        getIamPolicy(params: Params$Resource$Projects$Policy$Getiampolicy, callback: BodyResponseCallback<Schema$IamPolicy>): void;
        getIamPolicy(callback: BodyResponseCallback<Schema$IamPolicy>): void;
        /**
         * binaryauthorization.projects.policy.setIamPolicy
         * @desc Sets the access control policy on the specified resource. Replaces any existing policy.  Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/binaryauthorization.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const binaryauthorization = google.binaryauthorization('v1beta1');
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
         *   const res = await binaryauthorization.projects.policy.setIamPolicy({
         *     // REQUIRED: The resource for which the policy is being specified.
         *     // See the operation documentation for the appropriate value for this field.
         *     resource: 'projects/my-project/policy',
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
         * @alias binaryauthorization.projects.policy.setIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         * @param {().SetIamPolicyRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        setIamPolicy(params: Params$Resource$Projects$Policy$Setiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        setIamPolicy(params?: Params$Resource$Projects$Policy$Setiampolicy, options?: MethodOptions): GaxiosPromise<Schema$IamPolicy>;
        setIamPolicy(params: Params$Resource$Projects$Policy$Setiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        setIamPolicy(params: Params$Resource$Projects$Policy$Setiampolicy, options: MethodOptions | BodyResponseCallback<Schema$IamPolicy>, callback: BodyResponseCallback<Schema$IamPolicy>): void;
        setIamPolicy(params: Params$Resource$Projects$Policy$Setiampolicy, callback: BodyResponseCallback<Schema$IamPolicy>): void;
        setIamPolicy(callback: BodyResponseCallback<Schema$IamPolicy>): void;
        /**
         * binaryauthorization.projects.policy.testIamPermissions
         * @desc Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error.  Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/binaryauthorization.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const binaryauthorization = google.binaryauthorization('v1beta1');
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
         *   const res = await binaryauthorization.projects.policy.testIamPermissions({
         *     // REQUIRED: The resource for which the policy detail is being requested.
         *     // See the operation documentation for the appropriate value for this field.
         *     resource: 'projects/my-project/policy',
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
         * @alias binaryauthorization.projects.policy.testIamPermissions
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         * @param {().TestIamPermissionsRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        testIamPermissions(params: Params$Resource$Projects$Policy$Testiampermissions, options: StreamMethodOptions): GaxiosPromise<Readable>;
        testIamPermissions(params?: Params$Resource$Projects$Policy$Testiampermissions, options?: MethodOptions): GaxiosPromise<Schema$TestIamPermissionsResponse>;
        testIamPermissions(params: Params$Resource$Projects$Policy$Testiampermissions, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        testIamPermissions(params: Params$Resource$Projects$Policy$Testiampermissions, options: MethodOptions | BodyResponseCallback<Schema$TestIamPermissionsResponse>, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(params: Params$Resource$Projects$Policy$Testiampermissions, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
    }
    export interface Params$Resource$Projects$Policy$Getiampolicy extends StandardParameters {
        /**
         * Optional. The policy format version to be returned.  Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.  Requests for policies with any conditional bindings must specify version 3. Policies without any conditional bindings may specify any valid value or leave the field unset.  To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
         */
        'options.requestedPolicyVersion'?: number;
        /**
         * REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
    }
    export interface Params$Resource$Projects$Policy$Setiampolicy extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$SetIamPolicyRequest;
    }
    export interface Params$Resource$Projects$Policy$Testiampermissions extends StandardParameters {
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
