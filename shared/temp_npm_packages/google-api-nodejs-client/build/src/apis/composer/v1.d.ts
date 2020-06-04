/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace composer_v1 {
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
     * Cloud Composer API
     *
     * Manages Apache Airflow environments on Google Cloud Platform.
     *
     * @example
     * const {google} = require('googleapis');
     * const composer = google.composer('v1');
     *
     * @namespace composer
     * @type {Function}
     * @version v1
     * @variation v1
     * @param {object=} options Options for Composer
     */
    export class Composer {
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
     * An environment for running orchestration tasks.
     */
    export interface Schema$Environment {
        /**
         * Configuration parameters for this environment.
         */
        config?: Schema$EnvironmentConfig;
        /**
         * Output only. The time at which this environment was created.
         */
        createTime?: string | null;
        /**
         * Optional. User-defined labels for this environment. The labels map can contain no more than 64 entries. Entries of the labels map are UTF8 strings that comply with the following restrictions:  * Keys must conform to regexp: \p{Ll}\p{Lo}{0,62} * Values must conform to regexp:  [\p{Ll}\p{Lo}\p{N}_-]{0,63} * Both keys and values are additionally constrained to be &lt;= 128 bytes in size.
         */
        labels?: {
            [key: string]: string;
        } | null;
        /**
         * The resource name of the environment, in the form: &quot;projects/{projectId}/locations/{locationId}/environments/{environmentId}&quot;  EnvironmentId must start with a lowercase letter followed by up to 63 lowercase letters, numbers, or hyphens, and cannot end with a hyphen.
         */
        name?: string | null;
        /**
         * The current state of the environment.
         */
        state?: string | null;
        /**
         * Output only. The time at which this environment was last modified.
         */
        updateTime?: string | null;
        /**
         * Output only. The UUID (Universally Unique IDentifier) associated with this environment. This value is generated when the environment is created.
         */
        uuid?: string | null;
    }
    /**
     * Configuration information for an environment.
     */
    export interface Schema$EnvironmentConfig {
        /**
         * Output only. The URI of the Apache Airflow Web UI hosted within this environment (see [Airflow web interface](/composer/docs/how-to/accessing/airflow-web-interface)).
         */
        airflowUri?: string | null;
        /**
         * Output only. The Cloud Storage prefix of the DAGs for this environment. Although Cloud Storage objects reside in a flat namespace, a hierarchical file tree can be simulated using &quot;/&quot;-delimited object name prefixes. DAG objects for this environment reside in a simulated directory with the given prefix.
         */
        dagGcsPrefix?: string | null;
        /**
         * Output only. The Kubernetes Engine cluster used to run this environment.
         */
        gkeCluster?: string | null;
        /**
         * The configuration used for the Kubernetes Engine cluster.
         */
        nodeConfig?: Schema$NodeConfig;
        /**
         * The number of nodes in the Kubernetes Engine cluster that will be used to run this environment.
         */
        nodeCount?: number | null;
        /**
         * The configuration used for the Private IP Cloud Composer environment.
         */
        privateEnvironmentConfig?: Schema$PrivateEnvironmentConfig;
        /**
         * The configuration settings for software inside the environment.
         */
        softwareConfig?: Schema$SoftwareConfig;
    }
    /**
     * ImageVersion information
     */
    export interface Schema$ImageVersion {
        /**
         * The string identifier of the ImageVersion, in the form: &quot;composer-x.y.z-airflow-a.b(.c)&quot;
         */
        imageVersionId?: string | null;
        /**
         * Whether this is the default ImageVersion used by Composer during environment creation if no input ImageVersion is specified.
         */
        isDefault?: boolean | null;
        /**
         * supported python versions
         */
        supportedPythonVersions?: string[] | null;
    }
    /**
     * Configuration for controlling how IPs are allocated in the GKE cluster running the Apache Airflow software.
     */
    export interface Schema$IPAllocationPolicy {
        /**
         * Optional. The IP address range used to allocate IP addresses to pods in the GKE cluster.  This field is applicable only when `use_ip_aliases` is true.  Set to blank to have GKE choose a range with the default size.  Set to /netmask (e.g. `/14`) to have GKE choose a range with a specific netmask.  Set to a [CIDR](http://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `10.96.0.0/14`) from the RFC-1918 private networks (e.g. `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) to pick a specific range to use.
         */
        clusterIpv4CidrBlock?: string | null;
        /**
         * Optional. The name of the GKE cluster&#39;s secondary range used to allocate IP addresses to pods.  This field is applicable only when `use_ip_aliases` is true.
         */
        clusterSecondaryRangeName?: string | null;
        /**
         * Optional. The IP address range of the services IP addresses in this GKE cluster.  This field is applicable only when `use_ip_aliases` is true.  Set to blank to have GKE choose a range with the default size.  Set to /netmask (e.g. `/14`) to have GKE choose a range with a specific netmask.  Set to a [CIDR](http://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `10.96.0.0/14`) from the RFC-1918 private networks (e.g. `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) to pick a specific range to use.
         */
        servicesIpv4CidrBlock?: string | null;
        /**
         * Optional. The name of the services&#39; secondary range used to allocate IP addresses to the GKE cluster.  This field is applicable only when `use_ip_aliases` is true.
         */
        servicesSecondaryRangeName?: string | null;
        /**
         * Optional. Whether or not to enable Alias IPs in the GKE cluster. If `true`, a VPC-native cluster is created.
         */
        useIpAliases?: boolean | null;
    }
    /**
     * The environments in a project and location.
     */
    export interface Schema$ListEnvironmentsResponse {
        /**
         * The list of environments returned by a ListEnvironmentsRequest.
         */
        environments?: Schema$Environment[];
        /**
         * The page token used to query for the next page if one exists.
         */
        nextPageToken?: string | null;
    }
    /**
     * The ImageVersions in a project and location.
     */
    export interface Schema$ListImageVersionsResponse {
        /**
         * The list of supported ImageVersions in a location.
         */
        imageVersions?: Schema$ImageVersion[];
        /**
         * The page token used to query for the next page if one exists.
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
     * The configuration information for the Kubernetes Engine nodes running the Apache Airflow software.
     */
    export interface Schema$NodeConfig {
        /**
         * Optional. The disk size in GB used for node VMs. Minimum size is 20GB. If unspecified, defaults to 100GB. Cannot be updated.
         */
        diskSizeGb?: number | null;
        /**
         * Optional. The configuration for controlling how IPs are allocated in the GKE cluster.
         */
        ipAllocationPolicy?: Schema$IPAllocationPolicy;
        /**
         * Optional. The Compute Engine [zone](/compute/docs/regions-zones) in which to deploy the VMs used to run the Apache Airflow software, specified as a [relative resource name](/apis/design/resource_names#relative_resource_name). For example: &quot;projects/{projectId}/zones/{zoneId}&quot;.  This `location` must belong to the enclosing environment&#39;s project and location. If both this field and `nodeConfig.machineType` are specified, `nodeConfig.machineType` must belong to this `location`; if both are unspecified, the service will pick a zone in the Compute Engine region corresponding to the Cloud Composer location, and propagate that choice to both fields. If only one field (`location` or `nodeConfig.machineType`) is specified, the location information from the specified field will be propagated to the unspecified field.
         */
        location?: string | null;
        /**
         * Optional. The Compute Engine [machine type](/compute/docs/machine-types) used for cluster instances, specified as a [relative resource name](/apis/design/resource_names#relative_resource_name). For example: &quot;projects/{projectId}/zones/{zoneId}/machineTypes/{machineTypeId}&quot;.  The `machineType` must belong to the enclosing environment&#39;s project and location. If both this field and `nodeConfig.location` are specified, this `machineType` must belong to the `nodeConfig.location`; if both are unspecified, the service will pick a zone in the Compute Engine region corresponding to the Cloud Composer location, and propagate that choice to both fields. If exactly one of this field and `nodeConfig.location` is specified, the location information from the specified field will be propagated to the unspecified field.  The `machineTypeId` must not be a [shared-core machine type](/compute/docs/machine-types#sharedcore).  If this field is unspecified, the `machineTypeId` defaults to &quot;n1-standard-1&quot;.
         */
        machineType?: string | null;
        /**
         * Optional. The Compute Engine network to be used for machine communications, specified as a [relative resource name](/apis/design/resource_names#relative_resource_name). For example: &quot;projects/{projectId}/global/networks/{networkId}&quot;.  [Shared VPC](/vpc/docs/shared-vpc) is not currently supported. The network must belong to the environment&#39;s project. If unspecified, the &quot;default&quot; network ID in the environment&#39;s project is used.  If a [Custom Subnet Network](/vpc/docs/vpc#vpc_networks_and_subnets) is provided, `nodeConfig.subnetwork` must also be provided.
         */
        network?: string | null;
        /**
         * Optional. The set of Google API scopes to be made available on all node VMs. If `oauth_scopes` is empty, defaults to [&quot;https://www.googleapis.com/auth/cloud-platform&quot;]. Cannot be updated.
         */
        oauthScopes?: string[] | null;
        /**
         * Optional. The Google Cloud Platform Service Account to be used by the node VMs. If a service account is not specified, the &quot;default&quot; Compute Engine service account is used. Cannot be updated.
         */
        serviceAccount?: string | null;
        /**
         * Optional. The Compute Engine subnetwork to be used for machine communications, specified as a [relative resource name](/apis/design/resource_names#relative_resource_name). For example: &quot;projects/{projectId}/regions/{regionId}/subnetworks/{subnetworkId}&quot;  If a subnetwork is provided, `nodeConfig.network` must also be provided, and the subnetwork must belong to the enclosing environment&#39;s project and location.
         */
        subnetwork?: string | null;
        /**
         * Optional. The list of instance tags applied to all node VMs. Tags are used to identify valid sources or targets for network firewalls. Each tag within the list must comply with [RFC1035](https://www.ietf.org/rfc/rfc1035.txt). Cannot be updated.
         */
        tags?: string[] | null;
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
     * Metadata describing an operation.
     */
    export interface Schema$OperationMetadata {
        /**
         * Output only. The time the operation was submitted to the server.
         */
        createTime?: string | null;
        /**
         * Output only. The time when the operation terminated, regardless of its success. This field is unset if the operation is still ongoing.
         */
        endTime?: string | null;
        /**
         * Output only. The type of operation being performed.
         */
        operationType?: string | null;
        /**
         * Output only. The resource being operated on, as a [relative resource name]( /apis/design/resource_names#relative_resource_name).
         */
        resource?: string | null;
        /**
         * Output only. The UUID of the resource being operated on.
         */
        resourceUuid?: string | null;
        /**
         * Output only. The current operation state.
         */
        state?: string | null;
    }
    /**
     * Configuration options for the private GKE cluster in a Cloud Composer environment.
     */
    export interface Schema$PrivateClusterConfig {
        /**
         * Optional. If `true`, access to the public endpoint of the GKE cluster is denied.
         */
        enablePrivateEndpoint?: boolean | null;
        /**
         * Optional. The CIDR block from which IPv4 range for GKE master will be reserved. If left blank, the default value of &#39;172.16.0.0/23&#39; is used.
         */
        masterIpv4CidrBlock?: string | null;
        /**
         * Output only. The IP range in CIDR notation to use for the hosted master network. This range is used for assigning internal IP addresses to the GKE cluster master or set of masters and to the internal load balancer virtual IP. This range must not overlap with any other ranges in use within the cluster&#39;s network.
         */
        masterIpv4ReservedRange?: string | null;
    }
    /**
     * The configuration information for configuring a Private IP Cloud Composer environment.
     */
    export interface Schema$PrivateEnvironmentConfig {
        /**
         * Optional. The CIDR block from which IP range in tenant project will be reserved for Cloud SQL. Needs to be disjoint from `web_server_ipv4_cidr_block`.
         */
        cloudSqlIpv4CidrBlock?: string | null;
        /**
         * Optional. If `true`, a Private IP Cloud Composer environment is created. If this field is set to true, `IPAllocationPolicy.use_ip_aliases` must be set to true.
         */
        enablePrivateEnvironment?: boolean | null;
        /**
         * Optional. Configuration for the private GKE cluster for a Private IP Cloud Composer environment.
         */
        privateClusterConfig?: Schema$PrivateClusterConfig;
        /**
         * Optional. The CIDR block from which IP range for web server will be reserved. Needs to be disjoint from `private_cluster_config.master_ipv4_cidr_block` and `cloud_sql_ipv4_cidr_block`.
         */
        webServerIpv4CidrBlock?: string | null;
        /**
         * Output only. The IP range reserved for the tenant project&#39;s App Engine VMs.
         */
        webServerIpv4ReservedRange?: string | null;
    }
    /**
     * Specifies the selection and configuration of software inside the environment.
     */
    export interface Schema$SoftwareConfig {
        /**
         * Optional. Apache Airflow configuration properties to override.  Property keys contain the section and property names, separated by a hyphen, for example &quot;core-dags_are_paused_at_creation&quot;. Section names must not contain hyphens (&quot;-&quot;), opening square brackets (&quot;[&quot;),  or closing square brackets (&quot;]&quot;). The property name must not be empty and must not contain an equals sign (&quot;=&quot;) or semicolon (&quot;;&quot;). Section and property names must not contain a period (&quot;.&quot;). Apache Airflow configuration property names must be written in [snake_case](https://en.wikipedia.org/wiki/Snake_case). Property values can contain any character, and can be written in any lower/upper case format.  Certain Apache Airflow configuration property values are [blacklisted](/composer/docs/how-to/managing/setting-airflow-configurations#airflow_configuration_blacklists), and cannot be overridden.
         */
        airflowConfigOverrides?: {
            [key: string]: string;
        } | null;
        /**
         * Optional. Additional environment variables to provide to the Apache Airflow scheduler, worker, and webserver processes.  Environment variable names must match the regular expression `a-zA-Z_*`. They cannot specify Apache Airflow software configuration overrides (they cannot match the regular expression `AIRFLOW__[A-Z0-9_]+__[A-Z0-9_]+`), and they cannot match any of the following reserved names:  * `AIRFLOW_HOME` * `C_FORCE_ROOT` * `CONTAINER_NAME` * `DAGS_FOLDER` * `GCP_PROJECT` * `GCS_BUCKET` * `GKE_CLUSTER_NAME` * `SQL_DATABASE` * `SQL_INSTANCE` * `SQL_PASSWORD` * `SQL_PROJECT` * `SQL_REGION` * `SQL_USER`
         */
        envVariables?: {
            [key: string]: string;
        } | null;
        /**
         * The version of the software running in the environment. This encapsulates both the version of Cloud Composer functionality and the version of Apache Airflow. It must match the regular expression `composer-([0-9]+\.[0-9]+\.[0-9]+|latest)-airflow-[0-9]+\.[0-9]+(\.[0-9]+.*)?`. When used as input, the server also checks if the provided version is supported and denies the request for an unsupported version.  The Cloud Composer portion of the version is a [semantic version](https://semver.org) or `latest`. When the patch version is omitted, the current Cloud Composer patch version is selected. When `latest` is provided instead of an explicit version number, the server replaces `latest` with the current Cloud Composer version and stores that version number in the same field.  The portion of the image version that follows &lt;em&gt;airflow-&lt;/em&gt; is an official Apache Airflow repository [release name](https://github.com/apache/incubator-airflow/releases).  See also [Version List](/composer/docs/concepts/versioning/composer-versions).
         */
        imageVersion?: string | null;
        /**
         * Optional. Custom Python Package Index (PyPI) packages to be installed in the environment.  Keys refer to the lowercase package name such as &quot;numpy&quot; and values are the lowercase extras and version specifier such as &quot;==1.12.0&quot;, &quot;[devel,gcp_api]&quot;, or &quot;[devel]&gt;=1.8.2, &lt;1.9.2&quot;. To specify a package without pinning it to a version specifier, use the empty string as the value.
         */
        pypiPackages?: {
            [key: string]: string;
        } | null;
        /**
         * Optional. The major version of Python used to run the Apache Airflow scheduler, worker, and webserver processes.  Can be set to &#39;2&#39; or &#39;3&#39;. If not specified, the default is &#39;2&#39;. Cannot be updated.
         */
        pythonVersion?: string | null;
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
    export class Resource$Projects {
        context: APIRequestContext;
        locations: Resource$Projects$Locations;
        constructor(context: APIRequestContext);
    }
    export class Resource$Projects$Locations {
        context: APIRequestContext;
        environments: Resource$Projects$Locations$Environments;
        imageVersions: Resource$Projects$Locations$Imageversions;
        operations: Resource$Projects$Locations$Operations;
        constructor(context: APIRequestContext);
    }
    export class Resource$Projects$Locations$Environments {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * composer.projects.locations.environments.create
         * @desc Create a new environment.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/composer.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const composer = google.composer('v1');
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
         *   const res = await composer.projects.locations.environments.create({
         *     // The parent must be of the form
         *     // "projects/{projectId}/locations/{locationId}".
         *     parent: 'projects/my-project/locations/my-location',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "config": {},
         *       //   "createTime": "my_createTime",
         *       //   "labels": {},
         *       //   "name": "my_name",
         *       //   "state": "my_state",
         *       //   "updateTime": "my_updateTime",
         *       //   "uuid": "my_uuid"
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
         * @alias composer.projects.locations.environments.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent The parent must be of the form "projects/{projectId}/locations/{locationId}".
         * @param {().Environment} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Projects$Locations$Environments$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Projects$Locations$Environments$Create, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        create(params: Params$Resource$Projects$Locations$Environments$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Projects$Locations$Environments$Create, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        create(params: Params$Resource$Projects$Locations$Environments$Create, callback: BodyResponseCallback<Schema$Operation>): void;
        create(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * composer.projects.locations.environments.delete
         * @desc Delete an environment.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/composer.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const composer = google.composer('v1');
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
         *   const res = await composer.projects.locations.environments.delete({
         *     // The environment to delete, in the form:
         *     // "projects/{projectId}/locations/{locationId}/environments/{environmentId}"
         *     name:
         *       'projects/my-project/locations/my-location/environments/my-environment',
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
         * @alias composer.projects.locations.environments.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The environment to delete, in the form: "projects/{projectId}/locations/{locationId}/environments/{environmentId}"
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Projects$Locations$Environments$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Projects$Locations$Environments$Delete, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        delete(params: Params$Resource$Projects$Locations$Environments$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Projects$Locations$Environments$Delete, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        delete(params: Params$Resource$Projects$Locations$Environments$Delete, callback: BodyResponseCallback<Schema$Operation>): void;
        delete(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * composer.projects.locations.environments.get
         * @desc Get an existing environment.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/composer.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const composer = google.composer('v1');
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
         *   const res = await composer.projects.locations.environments.get({
         *     // The resource name of the environment to get, in the form:
         *     // "projects/{projectId}/locations/{locationId}/environments/{environmentId}"
         *     name:
         *       'projects/my-project/locations/my-location/environments/my-environment',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "config": {},
         *   //   "createTime": "my_createTime",
         *   //   "labels": {},
         *   //   "name": "my_name",
         *   //   "state": "my_state",
         *   //   "updateTime": "my_updateTime",
         *   //   "uuid": "my_uuid"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias composer.projects.locations.environments.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The resource name of the environment to get, in the form: "projects/{projectId}/locations/{locationId}/environments/{environmentId}"
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Locations$Environments$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Locations$Environments$Get, options?: MethodOptions): GaxiosPromise<Schema$Environment>;
        get(params: Params$Resource$Projects$Locations$Environments$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Locations$Environments$Get, options: MethodOptions | BodyResponseCallback<Schema$Environment>, callback: BodyResponseCallback<Schema$Environment>): void;
        get(params: Params$Resource$Projects$Locations$Environments$Get, callback: BodyResponseCallback<Schema$Environment>): void;
        get(callback: BodyResponseCallback<Schema$Environment>): void;
        /**
         * composer.projects.locations.environments.list
         * @desc List environments.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/composer.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const composer = google.composer('v1');
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
         *   const res = await composer.projects.locations.environments.list({
         *     // The maximum number of environments to return.
         *     pageSize: 'placeholder-value',
         *     // The next_page_token value returned from a previous List request, if any.
         *     pageToken: 'placeholder-value',
         *     // List environments in the given project and location, in the form:
         *     // "projects/{projectId}/locations/{locationId}"
         *     parent: 'projects/my-project/locations/my-location',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "environments": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias composer.projects.locations.environments.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize The maximum number of environments to return.
         * @param {string=} params.pageToken The next_page_token value returned from a previous List request, if any.
         * @param {string} params.parent List environments in the given project and location, in the form: "projects/{projectId}/locations/{locationId}"
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Locations$Environments$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Locations$Environments$List, options?: MethodOptions): GaxiosPromise<Schema$ListEnvironmentsResponse>;
        list(params: Params$Resource$Projects$Locations$Environments$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Locations$Environments$List, options: MethodOptions | BodyResponseCallback<Schema$ListEnvironmentsResponse>, callback: BodyResponseCallback<Schema$ListEnvironmentsResponse>): void;
        list(params: Params$Resource$Projects$Locations$Environments$List, callback: BodyResponseCallback<Schema$ListEnvironmentsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListEnvironmentsResponse>): void;
        /**
         * composer.projects.locations.environments.patch
         * @desc Update an environment.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/composer.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const composer = google.composer('v1');
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
         *   const res = await composer.projects.locations.environments.patch({
         *     // The relative resource name of the environment to update, in the form:
         *     // "projects/{projectId}/locations/{locationId}/environments/{environmentId}"
         *     name:
         *       'projects/my-project/locations/my-location/environments/my-environment',
         *     // Required. A comma-separated list of paths, relative to `Environment`, of
         *     // fields to update.
         *     // For example, to set the version of scikit-learn to install in the
         *     // environment to 0.19.0 and to remove an existing installation of
         *     // numpy, the `updateMask` parameter would include the following two
         *     // `paths` values: "config.softwareConfig.pypiPackages.scikit-learn" and
         *     // "config.softwareConfig.pypiPackages.numpy". The included patch
         *     // environment would specify the scikit-learn version as follows:
         *     //
         *     //     {
         *     //       "config":{
         *     //         "softwareConfig":{
         *     //           "pypiPackages":{
         *     //             "scikit-learn":"==0.19.0"
         *     //           }
         *     //         }
         *     //       }
         *     //     }
         *     //
         *     // Note that in the above example, any existing PyPI packages
         *     // other than scikit-learn and numpy will be unaffected.
         *     //
         *     // Only one update type may be included in a single request's `updateMask`.
         *     // For example, one cannot update both the PyPI packages and
         *     // labels in the same request. However, it is possible to update multiple
         *     // members of a map field simultaneously in the same request. For example,
         *     // to set the labels "label1" and "label2" while clearing "label3" (assuming
         *     // it already exists), one can
         *     // provide the paths "labels.label1", "labels.label2", and "labels.label3"
         *     // and populate the patch environment as follows:
         *     //
         *     //     {
         *     //       "labels":{
         *     //         "label1":"new-label1-value"
         *     //         "label2":"new-label2-value"
         *     //       }
         *     //     }
         *     //
         *     // Note that in the above example, any existing labels that are not
         *     // included in the `updateMask` will be unaffected.
         *     //
         *     // It is also possible to replace an entire map field by providing the
         *     // map field's path in the `updateMask`. The new value of the field will
         *     // be that which is provided in the patch environment. For example, to
         *     // delete all pre-existing user-specified PyPI packages and
         *     // install botocore at version 1.7.14, the `updateMask` would contain
         *     // the path "config.softwareConfig.pypiPackages", and
         *     // the patch environment would be the following:
         *     //
         *     //     {
         *     //       "config":{
         *     //         "softwareConfig":{
         *     //           "pypiPackages":{
         *     //             "botocore":"==1.7.14"
         *     //           }
         *     //         }
         *     //       }
         *     //     }
         *     //
         *     // **Note:** Only the following fields can be updated:
         *     //
         *     //  <table>
         *     //  <tbody>
         *     //  <tr>
         *     //  <td><strong>Mask</strong></td>
         *     //  <td><strong>Purpose</strong></td>
         *     //  </tr>
         *     //  <tr>
         *     //  <td>config.softwareConfig.pypiPackages
         *     //  </td>
         *     //  <td>Replace all custom custom PyPI packages. If a replacement
         *     //  package map is not included in `environment`, all custom
         *     //  PyPI packages are cleared. It is an error to provide both this mask and a
         *     //  mask specifying an individual package.</td>
         *     //  </tr>
         *     //  <tr>
         *     //  <td>config.softwareConfig.pypiPackages.<var>packagename</var></td>
         *     //  <td>Update the custom PyPI package <var>packagename</var>,
         *     //  preserving other packages. To delete the package, include it in
         *     //  `updateMask`, and omit the mapping for it in
         *     //  `environment.config.softwareConfig.pypiPackages`. It is an error
         *     //  to provide both a mask of this form and the
         *     //  "config.softwareConfig.pypiPackages" mask.</td>
         *     //  </tr>
         *     //  <tr>
         *     //  <td>labels</td>
         *     //  <td>Replace all environment labels. If a replacement labels map is not
         *     //  included in `environment`, all labels are cleared. It is an error to
         *     //  provide both this mask and a mask specifying one or more individual
         *     //  labels.</td>
         *     //  </tr>
         *     //  <tr>
         *     //  <td>labels.<var>labelName</var></td>
         *     //  <td>Set the label named <var>labelName</var>, while preserving other
         *     //  labels. To delete the label, include it in `updateMask` and omit its
         *     //  mapping in `environment.labels`. It is an error to provide both a
         *     //  mask of this form and the "labels" mask.</td>
         *     //  </tr>
         *     //  <tr>
         *     //  <td>config.nodeCount</td>
         *     //  <td>Horizontally scale the number of nodes in the environment. An integer
         *     //  greater than or equal to 3 must be provided in the `config.nodeCount`
         *     //  field.
         *     //  </td>
         *     //  </tr>
         *     //  <tr>
         *     //  <td>config.softwareConfig.airflowConfigOverrides</td>
         *     //  <td>Replace all Apache Airflow config overrides. If a replacement config
         *     //  overrides map is not included in `environment`, all config overrides
         *     //  are cleared.
         *     //  It is an error to provide both this mask and a mask specifying one or
         *     //  more individual config overrides.</td>
         *     //  </tr>
         *     //  <tr>
         *     //  <td>config.softwareConfig.airflowConfigOverrides.<var>section</var>-<var>name
         *     //  </var></td>
         *     //  <td>Override the Apache Airflow config property <var>name</var> in the
         *     //  section named <var>section</var>, preserving other properties. To delete
         *     //  the property override, include it in `updateMask` and omit its mapping
         *     //  in `environment.config.softwareConfig.airflowConfigOverrides`.
         *     //  It is an error to provide both a mask of this form and the
         *     //  "config.softwareConfig.airflowConfigOverrides" mask.</td>
         *     //  </tr>
         *     //  <tr>
         *     //  <td>config.softwareConfig.envVariables</td>
         *     //  <td>Replace all environment variables. If a replacement environment
         *     //  variable map is not included in `environment`, all custom environment
         *     //  variables  are cleared.
         *     //  It is an error to provide both this mask and a mask specifying one or
         *     //  more individual environment variables.</td>
         *     //  </tr>
         *     //  </tbody>
         *     //  </table>
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "config": {},
         *       //   "createTime": "my_createTime",
         *       //   "labels": {},
         *       //   "name": "my_name",
         *       //   "state": "my_state",
         *       //   "updateTime": "my_updateTime",
         *       //   "uuid": "my_uuid"
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
         * @alias composer.projects.locations.environments.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The relative resource name of the environment to update, in the form: "projects/{projectId}/locations/{locationId}/environments/{environmentId}"
         * @param {string=} params.updateMask Required. A comma-separated list of paths, relative to `Environment`, of fields to update. For example, to set the version of scikit-learn to install in the environment to 0.19.0 and to remove an existing installation of numpy, the `updateMask` parameter would include the following two `paths` values: "config.softwareConfig.pypiPackages.scikit-learn" and "config.softwareConfig.pypiPackages.numpy". The included patch environment would specify the scikit-learn version as follows:      {       "config":{         "softwareConfig":{           "pypiPackages":{             "scikit-learn":"==0.19.0"           }         }       }     }  Note that in the above example, any existing PyPI packages other than scikit-learn and numpy will be unaffected.  Only one update type may be included in a single request's `updateMask`. For example, one cannot update both the PyPI packages and labels in the same request. However, it is possible to update multiple members of a map field simultaneously in the same request. For example, to set the labels "label1" and "label2" while clearing "label3" (assuming it already exists), one can provide the paths "labels.label1", "labels.label2", and "labels.label3" and populate the patch environment as follows:      {       "labels":{         "label1":"new-label1-value"         "label2":"new-label2-value"       }     }  Note that in the above example, any existing labels that are not included in the `updateMask` will be unaffected.  It is also possible to replace an entire map field by providing the map field's path in the `updateMask`. The new value of the field will be that which is provided in the patch environment. For example, to delete all pre-existing user-specified PyPI packages and install botocore at version 1.7.14, the `updateMask` would contain the path "config.softwareConfig.pypiPackages", and the patch environment would be the following:      {       "config":{         "softwareConfig":{           "pypiPackages":{             "botocore":"==1.7.14"           }         }       }     }  **Note:** Only the following fields can be updated:   <table>  <tbody>  <tr>  <td><strong>Mask</strong></td>  <td><strong>Purpose</strong></td>  </tr>  <tr>  <td>config.softwareConfig.pypiPackages  </td>  <td>Replace all custom custom PyPI packages. If a replacement  package map is not included in `environment`, all custom  PyPI packages are cleared. It is an error to provide both this mask and a  mask specifying an individual package.</td>  </tr>  <tr>  <td>config.softwareConfig.pypiPackages.<var>packagename</var></td>  <td>Update the custom PyPI package <var>packagename</var>,  preserving other packages. To delete the package, include it in  `updateMask`, and omit the mapping for it in  `environment.config.softwareConfig.pypiPackages`. It is an error  to provide both a mask of this form and the  "config.softwareConfig.pypiPackages" mask.</td>  </tr>  <tr>  <td>labels</td>  <td>Replace all environment labels. If a replacement labels map is not  included in `environment`, all labels are cleared. It is an error to  provide both this mask and a mask specifying one or more individual  labels.</td>  </tr>  <tr>  <td>labels.<var>labelName</var></td>  <td>Set the label named <var>labelName</var>, while preserving other  labels. To delete the label, include it in `updateMask` and omit its  mapping in `environment.labels`. It is an error to provide both a  mask of this form and the "labels" mask.</td>  </tr>  <tr>  <td>config.nodeCount</td>  <td>Horizontally scale the number of nodes in the environment. An integer  greater than or equal to 3 must be provided in the `config.nodeCount`  field.  </td>  </tr>  <tr>  <td>config.softwareConfig.airflowConfigOverrides</td>  <td>Replace all Apache Airflow config overrides. If a replacement config  overrides map is not included in `environment`, all config overrides  are cleared.  It is an error to provide both this mask and a mask specifying one or  more individual config overrides.</td>  </tr>  <tr>  <td>config.softwareConfig.airflowConfigOverrides.<var>section</var>-<var>name  </var></td>  <td>Override the Apache Airflow config property <var>name</var> in the  section named <var>section</var>, preserving other properties. To delete  the property override, include it in `updateMask` and omit its mapping  in `environment.config.softwareConfig.airflowConfigOverrides`.  It is an error to provide both a mask of this form and the  "config.softwareConfig.airflowConfigOverrides" mask.</td>  </tr>  <tr>  <td>config.softwareConfig.envVariables</td>  <td>Replace all environment variables. If a replacement environment  variable map is not included in `environment`, all custom environment  variables  are cleared.  It is an error to provide both this mask and a mask specifying one or  more individual environment variables.</td>  </tr>  </tbody>  </table>
         * @param {().Environment} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Projects$Locations$Environments$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Projects$Locations$Environments$Patch, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        patch(params: Params$Resource$Projects$Locations$Environments$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Projects$Locations$Environments$Patch, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        patch(params: Params$Resource$Projects$Locations$Environments$Patch, callback: BodyResponseCallback<Schema$Operation>): void;
        patch(callback: BodyResponseCallback<Schema$Operation>): void;
    }
    export interface Params$Resource$Projects$Locations$Environments$Create extends StandardParameters {
        /**
         * The parent must be of the form "projects/{projectId}/locations/{locationId}".
         */
        parent?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Environment;
    }
    export interface Params$Resource$Projects$Locations$Environments$Delete extends StandardParameters {
        /**
         * The environment to delete, in the form: "projects/{projectId}/locations/{locationId}/environments/{environmentId}"
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Locations$Environments$Get extends StandardParameters {
        /**
         * The resource name of the environment to get, in the form: "projects/{projectId}/locations/{locationId}/environments/{environmentId}"
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Locations$Environments$List extends StandardParameters {
        /**
         * The maximum number of environments to return.
         */
        pageSize?: number;
        /**
         * The next_page_token value returned from a previous List request, if any.
         */
        pageToken?: string;
        /**
         * List environments in the given project and location, in the form: "projects/{projectId}/locations/{locationId}"
         */
        parent?: string;
    }
    export interface Params$Resource$Projects$Locations$Environments$Patch extends StandardParameters {
        /**
         * The relative resource name of the environment to update, in the form: "projects/{projectId}/locations/{locationId}/environments/{environmentId}"
         */
        name?: string;
        /**
         * Required. A comma-separated list of paths, relative to `Environment`, of fields to update. For example, to set the version of scikit-learn to install in the environment to 0.19.0 and to remove an existing installation of numpy, the `updateMask` parameter would include the following two `paths` values: "config.softwareConfig.pypiPackages.scikit-learn" and "config.softwareConfig.pypiPackages.numpy". The included patch environment would specify the scikit-learn version as follows:      {       "config":{         "softwareConfig":{           "pypiPackages":{             "scikit-learn":"==0.19.0"           }         }       }     }  Note that in the above example, any existing PyPI packages other than scikit-learn and numpy will be unaffected.  Only one update type may be included in a single request's `updateMask`. For example, one cannot update both the PyPI packages and labels in the same request. However, it is possible to update multiple members of a map field simultaneously in the same request. For example, to set the labels "label1" and "label2" while clearing "label3" (assuming it already exists), one can provide the paths "labels.label1", "labels.label2", and "labels.label3" and populate the patch environment as follows:      {       "labels":{         "label1":"new-label1-value"         "label2":"new-label2-value"       }     }  Note that in the above example, any existing labels that are not included in the `updateMask` will be unaffected.  It is also possible to replace an entire map field by providing the map field's path in the `updateMask`. The new value of the field will be that which is provided in the patch environment. For example, to delete all pre-existing user-specified PyPI packages and install botocore at version 1.7.14, the `updateMask` would contain the path "config.softwareConfig.pypiPackages", and the patch environment would be the following:      {       "config":{         "softwareConfig":{           "pypiPackages":{             "botocore":"==1.7.14"           }         }       }     }  **Note:** Only the following fields can be updated:   <table>  <tbody>  <tr>  <td><strong>Mask</strong></td>  <td><strong>Purpose</strong></td>  </tr>  <tr>  <td>config.softwareConfig.pypiPackages  </td>  <td>Replace all custom custom PyPI packages. If a replacement  package map is not included in `environment`, all custom  PyPI packages are cleared. It is an error to provide both this mask and a  mask specifying an individual package.</td>  </tr>  <tr>  <td>config.softwareConfig.pypiPackages.<var>packagename</var></td>  <td>Update the custom PyPI package <var>packagename</var>,  preserving other packages. To delete the package, include it in  `updateMask`, and omit the mapping for it in  `environment.config.softwareConfig.pypiPackages`. It is an error  to provide both a mask of this form and the  "config.softwareConfig.pypiPackages" mask.</td>  </tr>  <tr>  <td>labels</td>  <td>Replace all environment labels. If a replacement labels map is not  included in `environment`, all labels are cleared. It is an error to  provide both this mask and a mask specifying one or more individual  labels.</td>  </tr>  <tr>  <td>labels.<var>labelName</var></td>  <td>Set the label named <var>labelName</var>, while preserving other  labels. To delete the label, include it in `updateMask` and omit its  mapping in `environment.labels`. It is an error to provide both a  mask of this form and the "labels" mask.</td>  </tr>  <tr>  <td>config.nodeCount</td>  <td>Horizontally scale the number of nodes in the environment. An integer  greater than or equal to 3 must be provided in the `config.nodeCount`  field.  </td>  </tr>  <tr>  <td>config.softwareConfig.airflowConfigOverrides</td>  <td>Replace all Apache Airflow config overrides. If a replacement config  overrides map is not included in `environment`, all config overrides  are cleared.  It is an error to provide both this mask and a mask specifying one or  more individual config overrides.</td>  </tr>  <tr>  <td>config.softwareConfig.airflowConfigOverrides.<var>section</var>-<var>name  </var></td>  <td>Override the Apache Airflow config property <var>name</var> in the  section named <var>section</var>, preserving other properties. To delete  the property override, include it in `updateMask` and omit its mapping  in `environment.config.softwareConfig.airflowConfigOverrides`.  It is an error to provide both a mask of this form and the  "config.softwareConfig.airflowConfigOverrides" mask.</td>  </tr>  <tr>  <td>config.softwareConfig.envVariables</td>  <td>Replace all environment variables. If a replacement environment  variable map is not included in `environment`, all custom environment  variables  are cleared.  It is an error to provide both this mask and a mask specifying one or  more individual environment variables.</td>  </tr>  </tbody>  </table>
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Environment;
    }
    export class Resource$Projects$Locations$Imageversions {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * composer.projects.locations.imageVersions.list
         * @desc List ImageVersions for provided location.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/composer.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const composer = google.composer('v1');
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
         *   const res = await composer.projects.locations.imageVersions.list({
         *     // The maximum number of image_versions to return.
         *     pageSize: 'placeholder-value',
         *     // The next_page_token value returned from a previous List request, if any.
         *     pageToken: 'placeholder-value',
         *     // List ImageVersions in the given project and location, in the form:
         *     // "projects/{projectId}/locations/{locationId}"
         *     parent: 'projects/my-project/locations/my-location',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "imageVersions": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias composer.projects.locations.imageVersions.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize The maximum number of image_versions to return.
         * @param {string=} params.pageToken The next_page_token value returned from a previous List request, if any.
         * @param {string} params.parent List ImageVersions in the given project and location, in the form: "projects/{projectId}/locations/{locationId}"
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Locations$Imageversions$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Locations$Imageversions$List, options?: MethodOptions): GaxiosPromise<Schema$ListImageVersionsResponse>;
        list(params: Params$Resource$Projects$Locations$Imageversions$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Locations$Imageversions$List, options: MethodOptions | BodyResponseCallback<Schema$ListImageVersionsResponse>, callback: BodyResponseCallback<Schema$ListImageVersionsResponse>): void;
        list(params: Params$Resource$Projects$Locations$Imageversions$List, callback: BodyResponseCallback<Schema$ListImageVersionsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListImageVersionsResponse>): void;
    }
    export interface Params$Resource$Projects$Locations$Imageversions$List extends StandardParameters {
        /**
         * The maximum number of image_versions to return.
         */
        pageSize?: number;
        /**
         * The next_page_token value returned from a previous List request, if any.
         */
        pageToken?: string;
        /**
         * List ImageVersions in the given project and location, in the form: "projects/{projectId}/locations/{locationId}"
         */
        parent?: string;
    }
    export class Resource$Projects$Locations$Operations {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * composer.projects.locations.operations.delete
         * @desc Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/composer.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const composer = google.composer('v1');
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
         *   const res = await composer.projects.locations.operations.delete({
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
         * @alias composer.projects.locations.operations.delete
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
         * composer.projects.locations.operations.get
         * @desc Gets the latest state of a long-running operation.  Clients can use this method to poll the operation result at intervals as recommended by the API service.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/composer.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const composer = google.composer('v1');
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
         *   const res = await composer.projects.locations.operations.get({
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
         * @alias composer.projects.locations.operations.get
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
         * composer.projects.locations.operations.list
         * @desc Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.  NOTE: the `name` binding allows API services to override the binding to use different resource name schemes, such as `users/x/operations`. To override the binding, API services can add a binding such as `"/v1/{name=users/x}/operations"` to their service configuration. For backwards compatibility, the default name includes the operations collection id, however overriding users must ensure the name binding is the parent resource, without the operations collection id.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/composer.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const composer = google.composer('v1');
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
         *   const res = await composer.projects.locations.operations.list({
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
         * @alias composer.projects.locations.operations.list
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
