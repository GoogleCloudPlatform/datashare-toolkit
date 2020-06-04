/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace appengine_v1 {
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
     * App Engine Admin API
     *
     * Provisions and manages developers&#39; App Engine applications.
     *
     * @example
     * const {google} = require('googleapis');
     * const appengine = google.appengine('v1');
     *
     * @namespace appengine
     * @type {Function}
     * @version v1
     * @variation v1
     * @param {object=} options Options for Appengine
     */
    export class Appengine {
        context: APIRequestContext;
        apps: Resource$Apps;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    /**
     * Google Cloud Endpoints (https://cloud.google.com/appengine/docs/python/endpoints/) configuration for API handlers.
     */
    export interface Schema$ApiConfigHandler {
        /**
         * Action to take when users access resources that require authentication. Defaults to redirect.
         */
        authFailAction?: string | null;
        /**
         * Level of login required to access this resource. Defaults to optional.
         */
        login?: string | null;
        /**
         * Path to the script from the application root directory.
         */
        script?: string | null;
        /**
         * Security (HTTPS) enforcement for this URL.
         */
        securityLevel?: string | null;
        /**
         * URL to serve the endpoint at.
         */
        url?: string | null;
    }
    /**
     * Uses Google Cloud Endpoints to handle requests.
     */
    export interface Schema$ApiEndpointHandler {
        /**
         * Path to the script from the application root directory.
         */
        scriptPath?: string | null;
    }
    /**
     * An Application resource contains the top-level configuration of an App Engine application.
     */
    export interface Schema$Application {
        /**
         * Google Apps authentication domain that controls which users can access this application.Defaults to open access for any Google Account.
         */
        authDomain?: string | null;
        /**
         * Google Cloud Storage bucket that can be used for storing files associated with this application. This bucket is associated with the application and can be used by the gcloud deployment commands.@OutputOnly
         */
        codeBucket?: string | null;
        /**
         * The type of the Cloud Firestore or Cloud Datastore database associated with this application.
         */
        databaseType?: string | null;
        /**
         * Google Cloud Storage bucket that can be used by this application to store content.@OutputOnly
         */
        defaultBucket?: string | null;
        /**
         * Cookie expiration policy for this application.
         */
        defaultCookieExpiration?: string | null;
        /**
         * Hostname used to reach this application, as resolved by App Engine.@OutputOnly
         */
        defaultHostname?: string | null;
        /**
         * HTTP path dispatch rules for requests to the application that do not explicitly target a service or version. Rules are order-dependent. Up to 20 dispatch rules can be supported.
         */
        dispatchRules?: Schema$UrlDispatchRule[];
        /**
         * The feature specific settings to be used in the application.
         */
        featureSettings?: Schema$FeatureSettings;
        /**
         * The Google Container Registry domain used for storing managed build docker images for this application.
         */
        gcrDomain?: string | null;
        iap?: Schema$IdentityAwareProxy;
        /**
         * Identifier of the Application resource. This identifier is equivalent to the project ID of the Google Cloud Platform project where you want to deploy your application. Example: myapp.
         */
        id?: string | null;
        /**
         * Location from which this application runs. Application instances run out of the data centers in the specified location, which is also where all of the application&#39;s end user content is stored.Defaults to us-central.View the list of supported locations (https://cloud.google.com/appengine/docs/locations).
         */
        locationId?: string | null;
        /**
         * Full path to the Application resource in the API. Example: apps/myapp.@OutputOnly
         */
        name?: string | null;
        /**
         * Serving status of this application.
         */
        servingStatus?: string | null;
    }
    /**
     * An SSL certificate that a user has been authorized to administer. A user is authorized to administer any certificate that applies to one of their authorized domains.
     */
    export interface Schema$AuthorizedCertificate {
        /**
         * The SSL certificate serving the AuthorizedCertificate resource. This must be obtained independently from a certificate authority.
         */
        certificateRawData?: Schema$CertificateRawData;
        /**
         * The user-specified display name of the certificate. This is not guaranteed to be unique. Example: My Certificate.
         */
        displayName?: string | null;
        /**
         * Aggregate count of the domain mappings with this certificate mapped. This count includes domain mappings on applications for which the user does not have VIEWER permissions.Only returned by GET or LIST requests when specifically requested by the view=FULL_CERTIFICATE option.@OutputOnly
         */
        domainMappingsCount?: number | null;
        /**
         * Topmost applicable domains of this certificate. This certificate applies to these domains and their subdomains. Example: example.com.@OutputOnly
         */
        domainNames?: string[] | null;
        /**
         * The time when this certificate expires. To update the renewal time on this certificate, upload an SSL certificate with a different expiration time using AuthorizedCertificates.UpdateAuthorizedCertificate.@OutputOnly
         */
        expireTime?: string | null;
        /**
         * Relative name of the certificate. This is a unique value autogenerated on AuthorizedCertificate resource creation. Example: 12345.@OutputOnly
         */
        id?: string | null;
        /**
         * Only applicable if this certificate is managed by App Engine. Managed certificates are tied to the lifecycle of a DomainMapping and cannot be updated or deleted via the AuthorizedCertificates API. If this certificate is manually administered by the user, this field will be empty.@OutputOnly
         */
        managedCertificate?: Schema$ManagedCertificate;
        /**
         * Full path to the AuthorizedCertificate resource in the API. Example: apps/myapp/authorizedCertificates/12345.@OutputOnly
         */
        name?: string | null;
        /**
         * The full paths to user visible Domain Mapping resources that have this certificate mapped. Example: apps/myapp/domainMappings/example.com.This may not represent the full list of mapped domain mappings if the user does not have VIEWER permissions on all of the applications that have this certificate mapped. See domain_mappings_count for a complete count.Only returned by GET or LIST requests when specifically requested by the view=FULL_CERTIFICATE option.@OutputOnly
         */
        visibleDomainMappings?: string[] | null;
    }
    /**
     * A domain that a user has been authorized to administer. To authorize use of a domain, verify ownership via Webmaster Central (https://www.google.com/webmasters/verification/home).
     */
    export interface Schema$AuthorizedDomain {
        /**
         * Fully qualified domain name of the domain authorized for use. Example: example.com.
         */
        id?: string | null;
        /**
         * Full path to the AuthorizedDomain resource in the API. Example: apps/myapp/authorizedDomains/example.com.@OutputOnly
         */
        name?: string | null;
    }
    /**
     * Automatic scaling is based on request rate, response latencies, and other application metrics.
     */
    export interface Schema$AutomaticScaling {
        /**
         * The time period that the Autoscaler (https://cloud.google.com/compute/docs/autoscaler/) should wait before it starts collecting information from a new instance. This prevents the autoscaler from collecting information when the instance is initializing, during which the collected usage would not be reliable. Only applicable in the App Engine flexible environment.
         */
        coolDownPeriod?: string | null;
        /**
         * Target scaling by CPU usage.
         */
        cpuUtilization?: Schema$CpuUtilization;
        /**
         * Target scaling by disk usage.
         */
        diskUtilization?: Schema$DiskUtilization;
        /**
         * Number of concurrent requests an automatic scaling instance can accept before the scheduler spawns a new instance.Defaults to a runtime-specific value.
         */
        maxConcurrentRequests?: number | null;
        /**
         * Maximum number of idle instances that should be maintained for this version.
         */
        maxIdleInstances?: number | null;
        /**
         * Maximum amount of time that a request should wait in the pending queue before starting a new instance to handle it.
         */
        maxPendingLatency?: string | null;
        /**
         * Maximum number of instances that should be started to handle requests for this version.
         */
        maxTotalInstances?: number | null;
        /**
         * Minimum number of idle instances that should be maintained for this version. Only applicable for the default version of a service.
         */
        minIdleInstances?: number | null;
        /**
         * Minimum amount of time a request should wait in the pending queue before starting a new instance to handle it.
         */
        minPendingLatency?: string | null;
        /**
         * Minimum number of running instances that should be maintained for this version.
         */
        minTotalInstances?: number | null;
        /**
         * Target scaling by network usage.
         */
        networkUtilization?: Schema$NetworkUtilization;
        /**
         * Target scaling by request utilization.
         */
        requestUtilization?: Schema$RequestUtilization;
        /**
         * Scheduler settings for standard environment.
         */
        standardSchedulerSettings?: Schema$StandardSchedulerSettings;
    }
    /**
     * A service with basic scaling will create an instance when the application receives a request. The instance will be turned down when the app becomes idle. Basic scaling is ideal for work that is intermittent or driven by user activity.
     */
    export interface Schema$BasicScaling {
        /**
         * Duration of time after the last request that an instance must wait before the instance is shut down.
         */
        idleTimeout?: string | null;
        /**
         * Maximum number of instances to create for this version.
         */
        maxInstances?: number | null;
    }
    /**
     * Request message for Firewall.BatchUpdateIngressRules.
     */
    export interface Schema$BatchUpdateIngressRulesRequest {
        /**
         * A list of FirewallRules to replace the existing set.
         */
        ingressRules?: Schema$FirewallRule[];
    }
    /**
     * Response message for Firewall.UpdateAllIngressRules.
     */
    export interface Schema$BatchUpdateIngressRulesResponse {
        /**
         * The full list of ingress FirewallRules for this application.
         */
        ingressRules?: Schema$FirewallRule[];
    }
    /**
     * An SSL certificate obtained from a certificate authority.
     */
    export interface Schema$CertificateRawData {
        /**
         * Unencrypted PEM encoded RSA private key. This field is set once on certificate creation and then encrypted. The key size must be 2048 bits or fewer. Must include the header and footer. Example: &lt;pre&gt; -----BEGIN RSA PRIVATE KEY----- &lt;unencrypted_key_value&gt; -----END RSA PRIVATE KEY----- &lt;/pre&gt; @InputOnly
         */
        privateKey?: string | null;
        /**
         * PEM encoded x.509 public key certificate. This field is set once on certificate creation. Must include the header and footer. Example: &lt;pre&gt; -----BEGIN CERTIFICATE----- &lt;certificate_value&gt; -----END CERTIFICATE----- &lt;/pre&gt;
         */
        publicCertificate?: string | null;
    }
    /**
     * Options for the build operations performed as a part of the version deployment. Only applicable for App Engine flexible environment when creating a version using source code directly.
     */
    export interface Schema$CloudBuildOptions {
        /**
         * Path to the yaml file used in deployment, used to determine runtime configuration details.Required for flexible environment builds.See https://cloud.google.com/appengine/docs/standard/python/config/appref for more details.
         */
        appYamlPath?: string | null;
        /**
         * The Cloud Build timeout used as part of any dependent builds performed by version creation. Defaults to 10 minutes.
         */
        cloudBuildTimeout?: string | null;
    }
    /**
     * Docker image that is used to create a container and start a VM instance for the version that you deploy. Only applicable for instances running in the App Engine flexible environment.
     */
    export interface Schema$ContainerInfo {
        /**
         * URI to the hosted container image in Google Container Registry. The URI must be fully qualified and include a tag or digest. Examples: &quot;gcr.io/my-project/image:tag&quot; or &quot;gcr.io/my-project/image@digest&quot;
         */
        image?: string | null;
    }
    /**
     * Target scaling by CPU usage.
     */
    export interface Schema$CpuUtilization {
        /**
         * Period of time over which CPU utilization is calculated.
         */
        aggregationWindowLength?: string | null;
        /**
         * Target CPU utilization ratio to maintain when scaling. Must be between 0 and 1.
         */
        targetUtilization?: number | null;
    }
    /**
     * Metadata for the given google.longrunning.Operation during a google.appengine.v1.CreateVersionRequest.
     */
    export interface Schema$CreateVersionMetadataV1 {
        /**
         * The Cloud Build ID if one was created as part of the version create. @OutputOnly
         */
        cloudBuildId?: string | null;
    }
    /**
     * Metadata for the given google.longrunning.Operation during a google.appengine.v1alpha.CreateVersionRequest.
     */
    export interface Schema$CreateVersionMetadataV1Alpha {
        /**
         * The Cloud Build ID if one was created as part of the version create. @OutputOnly
         */
        cloudBuildId?: string | null;
    }
    /**
     * Metadata for the given google.longrunning.Operation during a google.appengine.v1beta.CreateVersionRequest.
     */
    export interface Schema$CreateVersionMetadataV1Beta {
        /**
         * The Cloud Build ID if one was created as part of the version create. @OutputOnly
         */
        cloudBuildId?: string | null;
    }
    /**
     * Request message for Instances.DebugInstance.
     */
    export interface Schema$DebugInstanceRequest {
        /**
         * Public SSH key to add to the instance. Examples: [USERNAME]:ssh-rsa [KEY_VALUE] [USERNAME] [USERNAME]:ssh-rsa [KEY_VALUE] google-ssh {&quot;userName&quot;:&quot;[USERNAME]&quot;,&quot;expireOn&quot;:&quot;[EXPIRE_TIME]&quot;}For more information, see Adding and Removing SSH Keys (https://cloud.google.com/compute/docs/instances/adding-removing-ssh-keys).
         */
        sshKey?: string | null;
    }
    /**
     * Code and application artifacts used to deploy a version to App Engine.
     */
    export interface Schema$Deployment {
        /**
         * Options for any Google Cloud Build builds created as a part of this deployment.These options will only be used if a new build is created, such as when deploying to the App Engine flexible environment using files or zip.
         */
        cloudBuildOptions?: Schema$CloudBuildOptions;
        /**
         * The Docker image for the container that runs the version. Only applicable for instances running in the App Engine flexible environment.
         */
        container?: Schema$ContainerInfo;
        /**
         * Manifest of the files stored in Google Cloud Storage that are included as part of this version. All files must be readable using the credentials supplied with this call.
         */
        files?: {
            [key: string]: Schema$FileInfo;
        } | null;
        /**
         * The zip file for this deployment, if this is a zip deployment.
         */
        zip?: Schema$ZipInfo;
    }
    /**
     * Target scaling by disk usage. Only applicable in the App Engine flexible environment.
     */
    export interface Schema$DiskUtilization {
        /**
         * Target bytes read per second.
         */
        targetReadBytesPerSecond?: number | null;
        /**
         * Target ops read per seconds.
         */
        targetReadOpsPerSecond?: number | null;
        /**
         * Target bytes written per second.
         */
        targetWriteBytesPerSecond?: number | null;
        /**
         * Target ops written per second.
         */
        targetWriteOpsPerSecond?: number | null;
    }
    /**
     * A domain serving an App Engine application.
     */
    export interface Schema$DomainMapping {
        /**
         * Relative name of the domain serving the application. Example: example.com.
         */
        id?: string | null;
        /**
         * Full path to the DomainMapping resource in the API. Example: apps/myapp/domainMapping/example.com.@OutputOnly
         */
        name?: string | null;
        /**
         * The resource records required to configure this domain mapping. These records must be added to the domain&#39;s DNS configuration in order to serve the application via this domain mapping.@OutputOnly
         */
        resourceRecords?: Schema$ResourceRecord[];
        /**
         * SSL configuration for this domain. If unconfigured, this domain will not serve with SSL.
         */
        sslSettings?: Schema$SslSettings;
    }
    /**
     * A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo {   rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); } The JSON representation for Empty is empty JSON object {}.
     */
    export interface Schema$Empty {
    }
    /**
     * Cloud Endpoints (https://cloud.google.com/endpoints) configuration. The Endpoints API Service provides tooling for serving Open API and gRPC endpoints via an NGINX proxy. Only valid for App Engine Flexible environment deployments.The fields here refer to the name and configuration ID of a &quot;service&quot; resource in the Service Management API (https://cloud.google.com/service-management/overview).
     */
    export interface Schema$EndpointsApiService {
        /**
         * Endpoints service configuration ID as specified by the Service Management API. For example &quot;2016-09-19r1&quot;.By default, the rollout strategy for Endpoints is RolloutStrategy.FIXED. This means that Endpoints starts up with a particular configuration ID. When a new configuration is rolled out, Endpoints must be given the new configuration ID. The config_id field is used to give the configuration ID and is required in this case.Endpoints also has a rollout strategy called RolloutStrategy.MANAGED. When using this, Endpoints fetches the latest configuration and does not need the configuration ID. In this case, config_id must be omitted.
         */
        configId?: string | null;
        /**
         * Enable or disable trace sampling. By default, this is set to false for enabled.
         */
        disableTraceSampling?: boolean | null;
        /**
         * Endpoints service name which is the name of the &quot;service&quot; resource in the Service Management API. For example &quot;myapi.endpoints.myproject.cloud.goog&quot;
         */
        name?: string | null;
        /**
         * Endpoints rollout strategy. If FIXED, config_id must be specified. If MANAGED, config_id must be omitted.
         */
        rolloutStrategy?: string | null;
    }
    /**
     * The entrypoint for the application.
     */
    export interface Schema$Entrypoint {
        /**
         * The format should be a shell command that can be fed to bash -c.
         */
        shell?: string | null;
    }
    /**
     * Custom static error page to be served when an error occurs.
     */
    export interface Schema$ErrorHandler {
        /**
         * Error condition this handler applies to.
         */
        errorCode?: string | null;
        /**
         * MIME type of file. Defaults to text/html.
         */
        mimeType?: string | null;
        /**
         * Static file content to be served for this error.
         */
        staticFile?: string | null;
    }
    /**
     * The feature specific settings to be used in the application. These define behaviors that are user configurable.
     */
    export interface Schema$FeatureSettings {
        /**
         * Boolean value indicating if split health checks should be used instead of the legacy health checks. At an app.yaml level, this means defaulting to &#39;readiness_check&#39; and &#39;liveness_check&#39; values instead of &#39;health_check&#39; ones. Once the legacy &#39;health_check&#39; behavior is deprecated, and this value is always true, this setting can be removed.
         */
        splitHealthChecks?: boolean | null;
        /**
         * If true, use Container-Optimized OS (https://cloud.google.com/container-optimized-os/) base image for VMs, rather than a base Debian image.
         */
        useContainerOptimizedOs?: boolean | null;
    }
    /**
     * Single source file that is part of the version to be deployed. Each source file that is deployed must be specified separately.
     */
    export interface Schema$FileInfo {
        /**
         * The MIME type of the file.Defaults to the value from Google Cloud Storage.
         */
        mimeType?: string | null;
        /**
         * The SHA1 hash of the file, in hex.
         */
        sha1Sum?: string | null;
        /**
         * URL source to use to fetch this file. Must be a URL to a resource in Google Cloud Storage in the form &#39;http(s)://storage.googleapis.com/&lt;bucket&gt;/&lt;object&gt;&#39;.
         */
        sourceUrl?: string | null;
    }
    /**
     * A single firewall rule that is evaluated against incoming traffic and provides an action to take on matched requests.
     */
    export interface Schema$FirewallRule {
        /**
         * The action to take on matched requests.
         */
        action?: string | null;
        /**
         * An optional string description of this rule. This field has a maximum length of 100 characters.
         */
        description?: string | null;
        /**
         * A positive integer between 1, Int32.MaxValue-1 that defines the order of rule evaluation. Rules with the lowest priority are evaluated first.A default rule at priority Int32.MaxValue matches all IPv4 and IPv6 traffic when no previous rule matches. Only the action of this rule can be modified by the user.
         */
        priority?: number | null;
        /**
         * IP address or range, defined using CIDR notation, of requests that this rule applies to. You can use the wildcard character &quot;*&quot; to match all IPs equivalent to &quot;0/0&quot; and &quot;::/0&quot; together. Examples: 192.168.1.1 or 192.168.0.0/16 or 2001:db8::/32  or 2001:0db8:0000:0042:0000:8a2e:0370:7334.&lt;p&gt;Truncation will be silently performed on addresses which are not properly truncated. For example, 1.2.3.4/24 is accepted as the same address as 1.2.3.0/24. Similarly, for IPv6, 2001:db8::1/32 is accepted as the same address as 2001:db8::/32.
         */
        sourceRange?: string | null;
    }
    /**
     * Health checking configuration for VM instances. Unhealthy instances are killed and replaced with new instances. Only applicable for instances in App Engine flexible environment.
     */
    export interface Schema$HealthCheck {
        /**
         * Interval between health checks.
         */
        checkInterval?: string | null;
        /**
         * Whether to explicitly disable health checks for this instance.
         */
        disableHealthCheck?: boolean | null;
        /**
         * Number of consecutive successful health checks required before receiving traffic.
         */
        healthyThreshold?: number | null;
        /**
         * Host header to send when performing an HTTP health check. Example: &quot;myapp.appspot.com&quot;
         */
        host?: string | null;
        /**
         * Number of consecutive failed health checks required before an instance is restarted.
         */
        restartThreshold?: number | null;
        /**
         * Time before the health check is considered failed.
         */
        timeout?: string | null;
        /**
         * Number of consecutive failed health checks required before removing traffic.
         */
        unhealthyThreshold?: number | null;
    }
    /**
     * Identity-Aware Proxy
     */
    export interface Schema$IdentityAwareProxy {
        /**
         * Whether the serving infrastructure will authenticate and authorize all incoming requests.If true, the oauth2_client_id and oauth2_client_secret fields must be non-empty.
         */
        enabled?: boolean | null;
        /**
         * OAuth2 client ID to use for the authentication flow.
         */
        oauth2ClientId?: string | null;
        /**
         * OAuth2 client secret to use for the authentication flow.For security reasons, this value cannot be retrieved via the API. Instead, the SHA-256 hash of the value is returned in the oauth2_client_secret_sha256 field.@InputOnly
         */
        oauth2ClientSecret?: string | null;
        /**
         * Hex-encoded SHA-256 hash of the client secret.@OutputOnly
         */
        oauth2ClientSecretSha256?: string | null;
    }
    /**
     * An Instance resource is the computing unit that App Engine uses to automatically scale an application.
     */
    export interface Schema$Instance {
        /**
         * App Engine release this instance is running on.@OutputOnly
         */
        appEngineRelease?: string | null;
        /**
         * Availability of the instance.@OutputOnly
         */
        availability?: string | null;
        /**
         * Average latency (ms) over the last minute.@OutputOnly
         */
        averageLatency?: number | null;
        /**
         * Number of errors since this instance was started.@OutputOnly
         */
        errors?: number | null;
        /**
         * Relative name of the instance within the version. Example: instance-1.@OutputOnly
         */
        id?: string | null;
        /**
         * Total memory in use (bytes).@OutputOnly
         */
        memoryUsage?: string | null;
        /**
         * Full path to the Instance resource in the API. Example: apps/myapp/services/default/versions/v1/instances/instance-1.@OutputOnly
         */
        name?: string | null;
        /**
         * Average queries per second (QPS) over the last minute.@OutputOnly
         */
        qps?: number | null;
        /**
         * Number of requests since this instance was started.@OutputOnly
         */
        requests?: number | null;
        /**
         * Time that this instance was started.@OutputOnly
         */
        startTime?: string | null;
        /**
         * Whether this instance is in debug mode. Only applicable for instances in App Engine flexible environment.@OutputOnly
         */
        vmDebugEnabled?: boolean | null;
        /**
         * Virtual machine ID of this instance. Only applicable for instances in App Engine flexible environment.@OutputOnly
         */
        vmId?: string | null;
        /**
         * The IP address of this instance. Only applicable for instances in App Engine flexible environment.@OutputOnly
         */
        vmIp?: string | null;
        /**
         * Name of the virtual machine where this instance lives. Only applicable for instances in App Engine flexible environment.@OutputOnly
         */
        vmName?: string | null;
        /**
         * Status of the virtual machine where this instance lives. Only applicable for instances in App Engine flexible environment.@OutputOnly
         */
        vmStatus?: string | null;
        /**
         * Zone where the virtual machine is located. Only applicable for instances in App Engine flexible environment.@OutputOnly
         */
        vmZoneName?: string | null;
    }
    /**
     * Third-party Python runtime library that is required by the application.
     */
    export interface Schema$Library {
        /**
         * Name of the library. Example: &quot;django&quot;.
         */
        name?: string | null;
        /**
         * Version of the library to select, or &quot;latest&quot;.
         */
        version?: string | null;
    }
    /**
     * Response message for AuthorizedCertificates.ListAuthorizedCertificates.
     */
    export interface Schema$ListAuthorizedCertificatesResponse {
        /**
         * The SSL certificates the user is authorized to administer.
         */
        certificates?: Schema$AuthorizedCertificate[];
        /**
         * Continuation token for fetching the next page of results.
         */
        nextPageToken?: string | null;
    }
    /**
     * Response message for AuthorizedDomains.ListAuthorizedDomains.
     */
    export interface Schema$ListAuthorizedDomainsResponse {
        /**
         * The authorized domains belonging to the user.
         */
        domains?: Schema$AuthorizedDomain[];
        /**
         * Continuation token for fetching the next page of results.
         */
        nextPageToken?: string | null;
    }
    /**
     * Response message for DomainMappings.ListDomainMappings.
     */
    export interface Schema$ListDomainMappingsResponse {
        /**
         * The domain mappings for the application.
         */
        domainMappings?: Schema$DomainMapping[];
        /**
         * Continuation token for fetching the next page of results.
         */
        nextPageToken?: string | null;
    }
    /**
     * Response message for Firewall.ListIngressRules.
     */
    export interface Schema$ListIngressRulesResponse {
        /**
         * The ingress FirewallRules for this application.
         */
        ingressRules?: Schema$FirewallRule[];
        /**
         * Continuation token for fetching the next page of results.
         */
        nextPageToken?: string | null;
    }
    /**
     * Response message for Instances.ListInstances.
     */
    export interface Schema$ListInstancesResponse {
        /**
         * The instances belonging to the requested version.
         */
        instances?: Schema$Instance[];
        /**
         * Continuation token for fetching the next page of results.
         */
        nextPageToken?: string | null;
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
     * Response message for Services.ListServices.
     */
    export interface Schema$ListServicesResponse {
        /**
         * Continuation token for fetching the next page of results.
         */
        nextPageToken?: string | null;
        /**
         * The services belonging to the requested application.
         */
        services?: Schema$Service[];
    }
    /**
     * Response message for Versions.ListVersions.
     */
    export interface Schema$ListVersionsResponse {
        /**
         * Continuation token for fetching the next page of results.
         */
        nextPageToken?: string | null;
        /**
         * The versions belonging to the requested service.
         */
        versions?: Schema$Version[];
    }
    /**
     * Health checking configuration for VM instances. Unhealthy instances are killed and replaced with new instances.
     */
    export interface Schema$LivenessCheck {
        /**
         * Interval between health checks.
         */
        checkInterval?: string | null;
        /**
         * Number of consecutive failed checks required before considering the VM unhealthy.
         */
        failureThreshold?: number | null;
        /**
         * Host header to send when performing a HTTP Liveness check. Example: &quot;myapp.appspot.com&quot;
         */
        host?: string | null;
        /**
         * The initial delay before starting to execute the checks.
         */
        initialDelay?: string | null;
        /**
         * The request path.
         */
        path?: string | null;
        /**
         * Number of consecutive successful checks required before considering the VM healthy.
         */
        successThreshold?: number | null;
        /**
         * Time before the check is considered failed.
         */
        timeout?: string | null;
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
         * Cross-service attributes for the location. For example {&quot;cloud.googleapis.com/region&quot;: &quot;us-east1&quot;}
         */
        labels?: {
            [key: string]: string;
        } | null;
        /**
         * The canonical id for this location. For example: &quot;us-east1&quot;.
         */
        locationId?: string | null;
        /**
         * Service-specific metadata. For example the available capacity at the given location.
         */
        metadata?: {
            [key: string]: any;
        } | null;
        /**
         * Resource name for the location, which may vary between implementations. For example: &quot;projects/example-project/locations/us-east1&quot;
         */
        name?: string | null;
    }
    /**
     * Metadata for the given google.cloud.location.Location.
     */
    export interface Schema$LocationMetadata {
        /**
         * App Engine flexible environment is available in the given location.@OutputOnly
         */
        flexibleEnvironmentAvailable?: boolean | null;
        /**
         * App Engine standard environment is available in the given location.@OutputOnly
         */
        standardEnvironmentAvailable?: boolean | null;
    }
    /**
     * A certificate managed by App Engine.
     */
    export interface Schema$ManagedCertificate {
        /**
         * Time at which the certificate was last renewed. The renewal process is fully managed. Certificate renewal will automatically occur before the certificate expires. Renewal errors can be tracked via ManagementStatus.@OutputOnly
         */
        lastRenewalTime?: string | null;
        /**
         * Status of certificate management. Refers to the most recent certificate acquisition or renewal attempt.@OutputOnly
         */
        status?: string | null;
    }
    /**
     * A service with manual scaling runs continuously, allowing you to perform complex initialization and rely on the state of its memory over time.
     */
    export interface Schema$ManualScaling {
        /**
         * Number of instances to assign to the service at the start. This number can later be altered by using the Modules API (https://cloud.google.com/appengine/docs/python/modules/functions) set_num_instances() function.
         */
        instances?: number | null;
    }
    /**
     * Extra network settings. Only applicable in the App Engine flexible environment.
     */
    export interface Schema$Network {
        /**
         * List of ports, or port pairs, to forward from the virtual machine to the application container. Only applicable in the App Engine flexible environment.
         */
        forwardedPorts?: string[] | null;
        /**
         * Tag to apply to the instance during creation. Only applicable in the App Engine flexible environment.
         */
        instanceTag?: string | null;
        /**
         * Google Compute Engine network where the virtual machines are created. Specify the short name, not the resource path.Defaults to default.
         */
        name?: string | null;
        /**
         * Enable session affinity. Only applicable in the App Engine flexible environment.
         */
        sessionAffinity?: boolean | null;
        /**
         * Google Cloud Platform sub-network where the virtual machines are created. Specify the short name, not the resource path.If a subnetwork name is specified, a network name will also be required unless it is for the default network. If the network that the instance is being created in is a Legacy network, then the IP address is allocated from the IPv4Range. If the network that the instance is being created in is an auto Subnet Mode Network, then only network name should be specified (not the subnetwork_name) and the IP address is created from the IPCidrRange of the subnetwork that exists in that zone for that network. If the network that the instance is being created in is a custom Subnet Mode Network, then the subnetwork_name must be specified and the IP address is created from the IPCidrRange of the subnetwork.If specified, the subnetwork must exist in the same region as the App Engine flexible environment application.
         */
        subnetworkName?: string | null;
    }
    /**
     * Target scaling by network usage. Only applicable in the App Engine flexible environment.
     */
    export interface Schema$NetworkUtilization {
        /**
         * Target bytes received per second.
         */
        targetReceivedBytesPerSecond?: number | null;
        /**
         * Target packets received per second.
         */
        targetReceivedPacketsPerSecond?: number | null;
        /**
         * Target bytes sent per second.
         */
        targetSentBytesPerSecond?: number | null;
        /**
         * Target packets sent per second.
         */
        targetSentPacketsPerSecond?: number | null;
    }
    /**
     * This resource represents a long-running operation that is the result of a network API call.
     */
    export interface Schema$Operation {
        /**
         * If the value is false, it means the operation is still in progress. If true, the operation is completed, and either error or response is available.
         */
        done?: boolean | null;
        /**
         * The error result of the operation in case of failure or cancellation.
         */
        error?: Schema$Status;
        /**
         * Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any.
         */
        metadata?: {
            [key: string]: any;
        } | null;
        /**
         * The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the name should be a resource name ending with operations/{unique_id}.
         */
        name?: string | null;
        /**
         * The normal response of the operation in case of success. If the original method returns no data on success, such as Delete, the response is google.protobuf.Empty. If the original method is standard Get/Create/Update, the response should be the resource. For other methods, the response should have the type XxxResponse, where Xxx is the original method name. For example, if the original method name is TakeSnapshot(), the inferred response type is TakeSnapshotResponse.
         */
        response?: {
            [key: string]: any;
        } | null;
    }
    /**
     * Metadata for the given google.longrunning.Operation.
     */
    export interface Schema$OperationMetadataV1 {
        createVersionMetadata?: Schema$CreateVersionMetadataV1;
        /**
         * Time that this operation completed.@OutputOnly
         */
        endTime?: string | null;
        /**
         * Ephemeral message that may change every time the operation is polled. @OutputOnly
         */
        ephemeralMessage?: string | null;
        /**
         * Time that this operation was created.@OutputOnly
         */
        insertTime?: string | null;
        /**
         * API method that initiated this operation. Example: google.appengine.v1.Versions.CreateVersion.@OutputOnly
         */
        method?: string | null;
        /**
         * Name of the resource that this operation is acting on. Example: apps/myapp/services/default.@OutputOnly
         */
        target?: string | null;
        /**
         * User who requested this operation.@OutputOnly
         */
        user?: string | null;
        /**
         * Durable messages that persist on every operation poll. @OutputOnly
         */
        warning?: string[] | null;
    }
    /**
     * Metadata for the given google.longrunning.Operation.
     */
    export interface Schema$OperationMetadataV1Alpha {
        createVersionMetadata?: Schema$CreateVersionMetadataV1Alpha;
        /**
         * Time that this operation completed.@OutputOnly
         */
        endTime?: string | null;
        /**
         * Ephemeral message that may change every time the operation is polled. @OutputOnly
         */
        ephemeralMessage?: string | null;
        /**
         * Time that this operation was created.@OutputOnly
         */
        insertTime?: string | null;
        /**
         * API method that initiated this operation. Example: google.appengine.v1alpha.Versions.CreateVersion.@OutputOnly
         */
        method?: string | null;
        /**
         * Name of the resource that this operation is acting on. Example: apps/myapp/services/default.@OutputOnly
         */
        target?: string | null;
        /**
         * User who requested this operation.@OutputOnly
         */
        user?: string | null;
        /**
         * Durable messages that persist on every operation poll. @OutputOnly
         */
        warning?: string[] | null;
    }
    /**
     * Metadata for the given google.longrunning.Operation.
     */
    export interface Schema$OperationMetadataV1Beta {
        createVersionMetadata?: Schema$CreateVersionMetadataV1Beta;
        /**
         * Time that this operation completed.@OutputOnly
         */
        endTime?: string | null;
        /**
         * Ephemeral message that may change every time the operation is polled. @OutputOnly
         */
        ephemeralMessage?: string | null;
        /**
         * Time that this operation was created.@OutputOnly
         */
        insertTime?: string | null;
        /**
         * API method that initiated this operation. Example: google.appengine.v1beta.Versions.CreateVersion.@OutputOnly
         */
        method?: string | null;
        /**
         * Name of the resource that this operation is acting on. Example: apps/myapp/services/default.@OutputOnly
         */
        target?: string | null;
        /**
         * User who requested this operation.@OutputOnly
         */
        user?: string | null;
        /**
         * Durable messages that persist on every operation poll. @OutputOnly
         */
        warning?: string[] | null;
    }
    /**
     * Readiness checking configuration for VM instances. Unhealthy instances are removed from traffic rotation.
     */
    export interface Schema$ReadinessCheck {
        /**
         * A maximum time limit on application initialization, measured from moment the application successfully replies to a healthcheck until it is ready to serve traffic.
         */
        appStartTimeout?: string | null;
        /**
         * Interval between health checks.
         */
        checkInterval?: string | null;
        /**
         * Number of consecutive failed checks required before removing traffic.
         */
        failureThreshold?: number | null;
        /**
         * Host header to send when performing a HTTP Readiness check. Example: &quot;myapp.appspot.com&quot;
         */
        host?: string | null;
        /**
         * The request path.
         */
        path?: string | null;
        /**
         * Number of consecutive successful checks required before receiving traffic.
         */
        successThreshold?: number | null;
        /**
         * Time before the check is considered failed.
         */
        timeout?: string | null;
    }
    /**
     * Request message for &#39;Applications.RepairApplication&#39;.
     */
    export interface Schema$RepairApplicationRequest {
    }
    /**
     * Target scaling by request utilization. Only applicable in the App Engine flexible environment.
     */
    export interface Schema$RequestUtilization {
        /**
         * Target number of concurrent requests.
         */
        targetConcurrentRequests?: number | null;
        /**
         * Target requests per second.
         */
        targetRequestCountPerSecond?: number | null;
    }
    /**
     * A DNS resource record.
     */
    export interface Schema$ResourceRecord {
        /**
         * Relative name of the object affected by this record. Only applicable for CNAME records. Example: &#39;www&#39;.
         */
        name?: string | null;
        /**
         * Data for this record. Values vary by record type, as defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1).
         */
        rrdata?: string | null;
        /**
         * Resource record type. Example: AAAA.
         */
        type?: string | null;
    }
    /**
     * Machine resources for a version.
     */
    export interface Schema$Resources {
        /**
         * Number of CPU cores needed.
         */
        cpu?: number | null;
        /**
         * Disk size (GB) needed.
         */
        diskGb?: number | null;
        /**
         * Memory (GB) needed.
         */
        memoryGb?: number | null;
        /**
         * User specified volumes.
         */
        volumes?: Schema$Volume[];
    }
    /**
     * Executes a script to handle the request that matches the URL pattern.
     */
    export interface Schema$ScriptHandler {
        /**
         * Path to the script from the application root directory.
         */
        scriptPath?: string | null;
    }
    /**
     * A Service resource is a logical component of an application that can share state and communicate in a secure fashion with other services. For example, an application that handles customer requests might include separate services to handle tasks such as backend data analysis or API requests from mobile devices. Each service has a collection of versions that define a specific set of code used to implement the functionality of that service.
     */
    export interface Schema$Service {
        /**
         * Relative name of the service within the application. Example: default.@OutputOnly
         */
        id?: string | null;
        /**
         * Full path to the Service resource in the API. Example: apps/myapp/services/default.@OutputOnly
         */
        name?: string | null;
        /**
         * Mapping that defines fractional HTTP traffic diversion to different versions within the service.
         */
        split?: Schema$TrafficSplit;
    }
    /**
     * SSL configuration for a DomainMapping resource.
     */
    export interface Schema$SslSettings {
        /**
         * ID of the AuthorizedCertificate resource configuring SSL for the application. Clearing this field will remove SSL support.By default, a managed certificate is automatically created for every domain mapping. To omit SSL support or to configure SSL manually, specify SslManagementType.MANUAL on a CREATE or UPDATE request. You must be authorized to administer the AuthorizedCertificate resource to manually map it to a DomainMapping resource. Example: 12345.
         */
        certificateId?: string | null;
        /**
         * ID of the managed AuthorizedCertificate resource currently being provisioned, if applicable. Until the new managed certificate has been successfully provisioned, the previous SSL state will be preserved. Once the provisioning process completes, the certificate_id field will reflect the new managed certificate and this field will be left empty. To remove SSL support while there is still a pending managed certificate, clear the certificate_id field with an UpdateDomainMappingRequest.@OutputOnly
         */
        pendingManagedCertificateId?: string | null;
        /**
         * SSL management type for this domain. If AUTOMATIC, a managed certificate is automatically provisioned. If MANUAL, certificate_id must be manually specified in order to configure SSL for this domain.
         */
        sslManagementType?: string | null;
    }
    /**
     * Scheduler settings for standard environment.
     */
    export interface Schema$StandardSchedulerSettings {
        /**
         * Maximum number of instances to run for this version. Set to zero to disable max_instances configuration.
         */
        maxInstances?: number | null;
        /**
         * Minimum number of instances to run for this version. Set to zero to disable min_instances configuration.
         */
        minInstances?: number | null;
        /**
         * Target CPU utilization ratio to maintain when scaling.
         */
        targetCpuUtilization?: number | null;
        /**
         * Target throughput utilization ratio to maintain when scaling
         */
        targetThroughputUtilization?: number | null;
    }
    /**
     * Files served directly to the user for a given URL, such as images, CSS stylesheets, or JavaScript source files. Static file handlers describe which files in the application directory are static files, and which URLs serve them.
     */
    export interface Schema$StaticFilesHandler {
        /**
         * Whether files should also be uploaded as code data. By default, files declared in static file handlers are uploaded as static data and are only served to end users; they cannot be read by the application. If enabled, uploads are charged against both your code and static data storage resource quotas.
         */
        applicationReadable?: boolean | null;
        /**
         * Time a static file served by this handler should be cached by web proxies and browsers.
         */
        expiration?: string | null;
        /**
         * HTTP headers to use for all responses from these URLs.
         */
        httpHeaders?: {
            [key: string]: string;
        } | null;
        /**
         * MIME type used to serve all files served by this handler.Defaults to file-specific MIME types, which are derived from each file&#39;s filename extension.
         */
        mimeType?: string | null;
        /**
         * Path to the static files matched by the URL pattern, from the application root directory. The path can refer to text matched in groupings in the URL pattern.
         */
        path?: string | null;
        /**
         * Whether this handler should match the request if the file referenced by the handler does not exist.
         */
        requireMatchingFile?: boolean | null;
        /**
         * Regular expression that matches the file paths for all files that should be referenced by this handler.
         */
        uploadPathRegex?: string | null;
    }
    /**
     * The Status type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each Status message contains three pieces of data: error code, error message, and error details.You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
     */
    export interface Schema$Status {
        /**
         * The status code, which should be an enum value of google.rpc.Code.
         */
        code?: number | null;
        /**
         * A list of messages that carry the error details. There is a common set of message types for APIs to use.
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
     * Traffic routing configuration for versions within a single service. Traffic splits define how traffic directed to the service is assigned to versions.
     */
    export interface Schema$TrafficSplit {
        /**
         * Mapping from version IDs within the service to fractional (0.000, 1] allocations of traffic for that version. Each version can be specified only once, but some versions in the service may not have any traffic allocation. Services that have traffic allocated cannot be deleted until either the service is deleted or their traffic allocation is removed. Allocations must sum to 1. Up to two decimal place precision is supported for IP-based splits and up to three decimal places is supported for cookie-based splits.
         */
        allocations?: {
            [key: string]: number;
        } | null;
        /**
         * Mechanism used to determine which version a request is sent to. The traffic selection algorithm will be stable for either type until allocations are changed.
         */
        shardBy?: string | null;
    }
    /**
     * Rules to match an HTTP request and dispatch that request to a service.
     */
    export interface Schema$UrlDispatchRule {
        /**
         * Domain name to match against. The wildcard &quot;*&quot; is supported if specified before a period: &quot;*.&quot;.Defaults to matching all domains: &quot;*&quot;.
         */
        domain?: string | null;
        /**
         * Pathname within the host. Must start with a &quot;/&quot;. A single &quot;*&quot; can be included at the end of the path.The sum of the lengths of the domain and path may not exceed 100 characters.
         */
        path?: string | null;
        /**
         * Resource ID of a service in this application that should serve the matched request. The service must already exist. Example: default.
         */
        service?: string | null;
    }
    /**
     * URL pattern and description of how the URL should be handled. App Engine can handle URLs by executing application code or by serving static files uploaded with the version, such as images, CSS, or JavaScript.
     */
    export interface Schema$UrlMap {
        /**
         * Uses API Endpoints to handle requests.
         */
        apiEndpoint?: Schema$ApiEndpointHandler;
        /**
         * Action to take when users access resources that require authentication. Defaults to redirect.
         */
        authFailAction?: string | null;
        /**
         * Level of login required to access this resource. Not supported for Node.js in the App Engine standard environment.
         */
        login?: string | null;
        /**
         * 30x code to use when performing redirects for the secure field. Defaults to 302.
         */
        redirectHttpResponseCode?: string | null;
        /**
         * Executes a script to handle the requests that match this URL pattern. Only the auto value is supported for Node.js in the App Engine standard environment, for example &quot;script&quot;: &quot;auto&quot;.
         */
        script?: Schema$ScriptHandler;
        /**
         * Security (HTTPS) enforcement for this URL.
         */
        securityLevel?: string | null;
        /**
         * Returns the contents of a file, such as an image, as the response.
         */
        staticFiles?: Schema$StaticFilesHandler;
        /**
         * URL prefix. Uses regular expression syntax, which means regexp special characters must be escaped, but should not contain groupings. All URLs that begin with this prefix are handled by this handler, using the portion of the URL after the prefix as part of the file path.
         */
        urlRegex?: string | null;
    }
    /**
     * A Version resource is a specific set of source code and configuration files that are deployed into a service.
     */
    export interface Schema$Version {
        /**
         * Serving configuration for Google Cloud Endpoints (https://cloud.google.com/appengine/docs/python/endpoints/).Only returned in GET requests if view=FULL is set.
         */
        apiConfig?: Schema$ApiConfigHandler;
        /**
         * Automatic scaling is based on request rate, response latencies, and other application metrics.
         */
        automaticScaling?: Schema$AutomaticScaling;
        /**
         * A service with basic scaling will create an instance when the application receives a request. The instance will be turned down when the app becomes idle. Basic scaling is ideal for work that is intermittent or driven by user activity.
         */
        basicScaling?: Schema$BasicScaling;
        /**
         * Metadata settings that are supplied to this version to enable beta runtime features.
         */
        betaSettings?: {
            [key: string]: string;
        } | null;
        /**
         * Email address of the user who created this version.@OutputOnly
         */
        createdBy?: string | null;
        /**
         * Time that this version was created.@OutputOnly
         */
        createTime?: string | null;
        /**
         * Duration that static files should be cached by web proxies and browsers. Only applicable if the corresponding StaticFilesHandler (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#StaticFilesHandler) does not specify its own expiration time.Only returned in GET requests if view=FULL is set.
         */
        defaultExpiration?: string | null;
        /**
         * Code and application artifacts that make up this version.Only returned in GET requests if view=FULL is set.
         */
        deployment?: Schema$Deployment;
        /**
         * Total size in bytes of all the files that are included in this version and currently hosted on the App Engine disk.@OutputOnly
         */
        diskUsageBytes?: string | null;
        /**
         * Cloud Endpoints configuration.If endpoints_api_service is set, the Cloud Endpoints Extensible Service Proxy will be provided to serve the API implemented by the app.
         */
        endpointsApiService?: Schema$EndpointsApiService;
        /**
         * The entrypoint for the application.
         */
        entrypoint?: Schema$Entrypoint;
        /**
         * App Engine execution environment for this version.Defaults to standard.
         */
        env?: string | null;
        /**
         * Environment variables available to the application.Only returned in GET requests if view=FULL is set.
         */
        envVariables?: {
            [key: string]: string;
        } | null;
        /**
         * Custom static error pages. Limited to 10KB per page.Only returned in GET requests if view=FULL is set.
         */
        errorHandlers?: Schema$ErrorHandler[];
        /**
         * An ordered list of URL-matching patterns that should be applied to incoming requests. The first matching URL handles the request and other request handlers are not attempted.Only returned in GET requests if view=FULL is set.
         */
        handlers?: Schema$UrlMap[];
        /**
         * Configures health checking for instances. Unhealthy instances are stopped and replaced with new instances. Only applicable in the App Engine flexible environment.Only returned in GET requests if view=FULL is set.
         */
        healthCheck?: Schema$HealthCheck;
        /**
         * Relative name of the version within the service. Example: v1. Version names can contain only lowercase letters, numbers, or hyphens. Reserved names: &quot;default&quot;, &quot;latest&quot;, and any name with the prefix &quot;ah-&quot;.
         */
        id?: string | null;
        /**
         * Before an application can receive email or XMPP messages, the application must be configured to enable the service.
         */
        inboundServices?: string[] | null;
        /**
         * Instance class that is used to run this version. Valid values are: AutomaticScaling: F1, F2, F4, F4_1G ManualScaling or BasicScaling: B1, B2, B4, B8, B4_1GDefaults to F1 for AutomaticScaling and B1 for ManualScaling or BasicScaling.
         */
        instanceClass?: string | null;
        /**
         * Configuration for third-party Python runtime libraries that are required by the application.Only returned in GET requests if view=FULL is set.
         */
        libraries?: Schema$Library[];
        /**
         * Configures liveness health checking for instances. Unhealthy instances are stopped and replaced with new instancesOnly returned in GET requests if view=FULL is set.
         */
        livenessCheck?: Schema$LivenessCheck;
        /**
         * A service with manual scaling runs continuously, allowing you to perform complex initialization and rely on the state of its memory over time.
         */
        manualScaling?: Schema$ManualScaling;
        /**
         * Full path to the Version resource in the API. Example: apps/myapp/services/default/versions/v1.@OutputOnly
         */
        name?: string | null;
        /**
         * Extra network settings. Only applicable in the App Engine flexible environment.
         */
        network?: Schema$Network;
        /**
         * Files that match this pattern will not be built into this version. Only applicable for Go runtimes.Only returned in GET requests if view=FULL is set.
         */
        nobuildFilesRegex?: string | null;
        /**
         * Configures readiness health checking for instances. Unhealthy instances are not put into the backend traffic rotation.Only returned in GET requests if view=FULL is set.
         */
        readinessCheck?: Schema$ReadinessCheck;
        /**
         * Machine resources for this version. Only applicable in the App Engine flexible environment.
         */
        resources?: Schema$Resources;
        /**
         * Desired runtime. Example: python27.
         */
        runtime?: string | null;
        /**
         * The version of the API in the given runtime environment. Please see the app.yaml reference for valid values at https://cloud.google.com/appengine/docs/standard/&lt;language&gt;/config/appref
         */
        runtimeApiVersion?: string | null;
        /**
         * The channel of the runtime to use. Only available for some runtimes. Defaults to the default channel.
         */
        runtimeChannel?: string | null;
        /**
         * The path or name of the app&#39;s main executable.
         */
        runtimeMainExecutablePath?: string | null;
        /**
         * Current serving status of this version. Only the versions with a SERVING status create instances and can be billed.SERVING_STATUS_UNSPECIFIED is an invalid value. Defaults to SERVING.
         */
        servingStatus?: string | null;
        /**
         * Whether multiple requests can be dispatched to this version at once.
         */
        threadsafe?: boolean | null;
        /**
         * Serving URL for this version. Example: &quot;https://myversion-dot-myservice-dot-myapp.appspot.com&quot;@OutputOnly
         */
        versionUrl?: string | null;
        /**
         * Whether to deploy this version in a container on a virtual machine.
         */
        vm?: boolean | null;
        /**
         * Enables VPC connectivity for standard apps.
         */
        vpcAccessConnector?: Schema$VpcAccessConnector;
        /**
         * The Google Compute Engine zones that are supported by this version in the App Engine flexible environment. Deprecated.
         */
        zones?: string[] | null;
    }
    /**
     * Volumes mounted within the app container. Only applicable in the App Engine flexible environment.
     */
    export interface Schema$Volume {
        /**
         * Unique name for the volume.
         */
        name?: string | null;
        /**
         * Volume size in gigabytes.
         */
        sizeGb?: number | null;
        /**
         * Underlying volume type, e.g. &#39;tmpfs&#39;.
         */
        volumeType?: string | null;
    }
    /**
     * VPC access connector specification.
     */
    export interface Schema$VpcAccessConnector {
        /**
         * Full Serverless VPC Access Connector name e.g. /projects/my-project/locations/us-central1/connectors/c1.
         */
        name?: string | null;
    }
    /**
     * The zip file information for a zip deployment.
     */
    export interface Schema$ZipInfo {
        /**
         * An estimate of the number of files in a zip for a zip deployment. If set, must be greater than or equal to the actual number of files. Used for optimizing performance; if not provided, deployment may be slow.
         */
        filesCount?: number | null;
        /**
         * URL of the zip file to deploy from. Must be a URL to a resource in Google Cloud Storage in the form &#39;http(s)://storage.googleapis.com/&lt;bucket&gt;/&lt;object&gt;&#39;.
         */
        sourceUrl?: string | null;
    }
    export class Resource$Apps {
        context: APIRequestContext;
        authorizedCertificates: Resource$Apps$Authorizedcertificates;
        authorizedDomains: Resource$Apps$Authorizeddomains;
        domainMappings: Resource$Apps$Domainmappings;
        firewall: Resource$Apps$Firewall;
        locations: Resource$Apps$Locations;
        operations: Resource$Apps$Operations;
        services: Resource$Apps$Services;
        constructor(context: APIRequestContext);
        /**
         * appengine.apps.create
         * @desc Creates an App Engine application for a Google Cloud Platform project. Required fields: id - The ID of the target Cloud Platform project. location - The region (https://cloud.google.com/appengine/docs/locations) where you want the App Engine application located.For more information about App Engine applications, see Managing Projects, Applications, and Billing (https://cloud.google.com/appengine/docs/standard/python/console/).
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/appengine.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const appengine = google.appengine('v1');
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
         *   const res = await appengine.apps.create({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "authDomain": "my_authDomain",
         *       //   "codeBucket": "my_codeBucket",
         *       //   "databaseType": "my_databaseType",
         *       //   "defaultBucket": "my_defaultBucket",
         *       //   "defaultCookieExpiration": "my_defaultCookieExpiration",
         *       //   "defaultHostname": "my_defaultHostname",
         *       //   "dispatchRules": [],
         *       //   "featureSettings": {},
         *       //   "gcrDomain": "my_gcrDomain",
         *       //   "iap": {},
         *       //   "id": "my_id",
         *       //   "locationId": "my_locationId",
         *       //   "name": "my_name",
         *       //   "servingStatus": "my_servingStatus"
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
         * @alias appengine.apps.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().Application} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Apps$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Apps$Create, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        create(params: Params$Resource$Apps$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Apps$Create, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        create(params: Params$Resource$Apps$Create, callback: BodyResponseCallback<Schema$Operation>): void;
        create(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * appengine.apps.get
         * @desc Gets information about an application.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/appengine.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const appengine = google.appengine('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/appengine.admin',
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await appengine.apps.get({
         *     // Part of `name`. Name of the Application resource to get. Example: apps/myapp.
         *     appsId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "authDomain": "my_authDomain",
         *   //   "codeBucket": "my_codeBucket",
         *   //   "databaseType": "my_databaseType",
         *   //   "defaultBucket": "my_defaultBucket",
         *   //   "defaultCookieExpiration": "my_defaultCookieExpiration",
         *   //   "defaultHostname": "my_defaultHostname",
         *   //   "dispatchRules": [],
         *   //   "featureSettings": {},
         *   //   "gcrDomain": "my_gcrDomain",
         *   //   "iap": {},
         *   //   "id": "my_id",
         *   //   "locationId": "my_locationId",
         *   //   "name": "my_name",
         *   //   "servingStatus": "my_servingStatus"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias appengine.apps.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.appsId Part of `name`. Name of the Application resource to get. Example: apps/myapp.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Apps$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Apps$Get, options?: MethodOptions): GaxiosPromise<Schema$Application>;
        get(params: Params$Resource$Apps$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Apps$Get, options: MethodOptions | BodyResponseCallback<Schema$Application>, callback: BodyResponseCallback<Schema$Application>): void;
        get(params: Params$Resource$Apps$Get, callback: BodyResponseCallback<Schema$Application>): void;
        get(callback: BodyResponseCallback<Schema$Application>): void;
        /**
         * appengine.apps.patch
         * @desc Updates the specified Application resource. You can update the following fields: auth_domain - Google authentication domain for controlling user access to the application. default_cookie_expiration - Cookie expiration policy for the application.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/appengine.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const appengine = google.appengine('v1');
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
         *   const res = await appengine.apps.patch({
         *     // Part of `name`. Name of the Application resource to update. Example: apps/myapp.
         *     appsId: 'placeholder-value',
         *     // Standard field mask for the set of fields to be updated.
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "authDomain": "my_authDomain",
         *       //   "codeBucket": "my_codeBucket",
         *       //   "databaseType": "my_databaseType",
         *       //   "defaultBucket": "my_defaultBucket",
         *       //   "defaultCookieExpiration": "my_defaultCookieExpiration",
         *       //   "defaultHostname": "my_defaultHostname",
         *       //   "dispatchRules": [],
         *       //   "featureSettings": {},
         *       //   "gcrDomain": "my_gcrDomain",
         *       //   "iap": {},
         *       //   "id": "my_id",
         *       //   "locationId": "my_locationId",
         *       //   "name": "my_name",
         *       //   "servingStatus": "my_servingStatus"
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
         * @alias appengine.apps.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.appsId Part of `name`. Name of the Application resource to update. Example: apps/myapp.
         * @param {string=} params.updateMask Standard field mask for the set of fields to be updated.
         * @param {().Application} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Apps$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Apps$Patch, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        patch(params: Params$Resource$Apps$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Apps$Patch, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        patch(params: Params$Resource$Apps$Patch, callback: BodyResponseCallback<Schema$Operation>): void;
        patch(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * appengine.apps.repair
         * @desc Recreates the required App Engine features for the specified App Engine application, for example a Cloud Storage bucket or App Engine service account. Use this method if you receive an error message about a missing feature, for example, Error retrieving the App Engine service account. If you have deleted your App Engine service account, this will not be able to recreate it. Instead, you should attempt to use the IAM undelete API if possible at https://cloud.google.com/iam/reference/rest/v1/projects.serviceAccounts/undelete?apix_params=%7B"name"%3A"projects%2F-%2FserviceAccounts%2Funique_id"%2C"resource"%3A%7B%7D%7D . If the deletion was recent, the numeric ID can be found in the Cloud Console Activity Log.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/appengine.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const appengine = google.appengine('v1');
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
         *   const res = await appengine.apps.repair({
         *     // Part of `name`. Name of the application to repair. Example: apps/myapp
         *     appsId: 'placeholder-value',
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
         * @alias appengine.apps.repair
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.appsId Part of `name`. Name of the application to repair. Example: apps/myapp
         * @param {().RepairApplicationRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        repair(params: Params$Resource$Apps$Repair, options: StreamMethodOptions): GaxiosPromise<Readable>;
        repair(params?: Params$Resource$Apps$Repair, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        repair(params: Params$Resource$Apps$Repair, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        repair(params: Params$Resource$Apps$Repair, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        repair(params: Params$Resource$Apps$Repair, callback: BodyResponseCallback<Schema$Operation>): void;
        repair(callback: BodyResponseCallback<Schema$Operation>): void;
    }
    export interface Params$Resource$Apps$Create extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$Application;
    }
    export interface Params$Resource$Apps$Get extends StandardParameters {
        /**
         * Part of `name`. Name of the Application resource to get. Example: apps/myapp.
         */
        appsId?: string;
    }
    export interface Params$Resource$Apps$Patch extends StandardParameters {
        /**
         * Part of `name`. Name of the Application resource to update. Example: apps/myapp.
         */
        appsId?: string;
        /**
         * Standard field mask for the set of fields to be updated.
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Application;
    }
    export interface Params$Resource$Apps$Repair extends StandardParameters {
        /**
         * Part of `name`. Name of the application to repair. Example: apps/myapp
         */
        appsId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$RepairApplicationRequest;
    }
    export class Resource$Apps$Authorizedcertificates {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * appengine.apps.authorizedCertificates.create
         * @desc Uploads the specified SSL certificate.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/appengine.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const appengine = google.appengine('v1');
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
         *   const res = await appengine.apps.authorizedCertificates.create({
         *     // Part of `parent`. Name of the parent Application resource. Example: apps/myapp.
         *     appsId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "certificateRawData": {},
         *       //   "displayName": "my_displayName",
         *       //   "domainMappingsCount": 0,
         *       //   "domainNames": [],
         *       //   "expireTime": "my_expireTime",
         *       //   "id": "my_id",
         *       //   "managedCertificate": {},
         *       //   "name": "my_name",
         *       //   "visibleDomainMappings": []
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "certificateRawData": {},
         *   //   "displayName": "my_displayName",
         *   //   "domainMappingsCount": 0,
         *   //   "domainNames": [],
         *   //   "expireTime": "my_expireTime",
         *   //   "id": "my_id",
         *   //   "managedCertificate": {},
         *   //   "name": "my_name",
         *   //   "visibleDomainMappings": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias appengine.apps.authorizedCertificates.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.appsId Part of `parent`. Name of the parent Application resource. Example: apps/myapp.
         * @param {().AuthorizedCertificate} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Apps$Authorizedcertificates$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Apps$Authorizedcertificates$Create, options?: MethodOptions): GaxiosPromise<Schema$AuthorizedCertificate>;
        create(params: Params$Resource$Apps$Authorizedcertificates$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Apps$Authorizedcertificates$Create, options: MethodOptions | BodyResponseCallback<Schema$AuthorizedCertificate>, callback: BodyResponseCallback<Schema$AuthorizedCertificate>): void;
        create(params: Params$Resource$Apps$Authorizedcertificates$Create, callback: BodyResponseCallback<Schema$AuthorizedCertificate>): void;
        create(callback: BodyResponseCallback<Schema$AuthorizedCertificate>): void;
        /**
         * appengine.apps.authorizedCertificates.delete
         * @desc Deletes the specified SSL certificate.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/appengine.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const appengine = google.appengine('v1');
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
         *   const res = await appengine.apps.authorizedCertificates.delete({
         *     // Part of `name`. Name of the resource to delete. Example: apps/myapp/authorizedCertificates/12345.
         *     appsId: 'placeholder-value',
         *     // Part of `name`. See documentation of `appsId`.
         *     authorizedCertificatesId: 'placeholder-value',
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
         * @alias appengine.apps.authorizedCertificates.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.appsId Part of `name`. Name of the resource to delete. Example: apps/myapp/authorizedCertificates/12345.
         * @param {string} params.authorizedCertificatesId Part of `name`. See documentation of `appsId`.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Apps$Authorizedcertificates$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Apps$Authorizedcertificates$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Apps$Authorizedcertificates$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Apps$Authorizedcertificates$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Apps$Authorizedcertificates$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * appengine.apps.authorizedCertificates.get
         * @desc Gets the specified SSL certificate.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/appengine.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const appengine = google.appengine('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/appengine.admin',
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await appengine.apps.authorizedCertificates.get({
         *     // Part of `name`. Name of the resource requested. Example: apps/myapp/authorizedCertificates/12345.
         *     appsId: 'placeholder-value',
         *     // Part of `name`. See documentation of `appsId`.
         *     authorizedCertificatesId: 'placeholder-value',
         *     // Controls the set of fields returned in the GET response.
         *     view: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "certificateRawData": {},
         *   //   "displayName": "my_displayName",
         *   //   "domainMappingsCount": 0,
         *   //   "domainNames": [],
         *   //   "expireTime": "my_expireTime",
         *   //   "id": "my_id",
         *   //   "managedCertificate": {},
         *   //   "name": "my_name",
         *   //   "visibleDomainMappings": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias appengine.apps.authorizedCertificates.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.appsId Part of `name`. Name of the resource requested. Example: apps/myapp/authorizedCertificates/12345.
         * @param {string} params.authorizedCertificatesId Part of `name`. See documentation of `appsId`.
         * @param {string=} params.view Controls the set of fields returned in the GET response.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Apps$Authorizedcertificates$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Apps$Authorizedcertificates$Get, options?: MethodOptions): GaxiosPromise<Schema$AuthorizedCertificate>;
        get(params: Params$Resource$Apps$Authorizedcertificates$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Apps$Authorizedcertificates$Get, options: MethodOptions | BodyResponseCallback<Schema$AuthorizedCertificate>, callback: BodyResponseCallback<Schema$AuthorizedCertificate>): void;
        get(params: Params$Resource$Apps$Authorizedcertificates$Get, callback: BodyResponseCallback<Schema$AuthorizedCertificate>): void;
        get(callback: BodyResponseCallback<Schema$AuthorizedCertificate>): void;
        /**
         * appengine.apps.authorizedCertificates.list
         * @desc Lists all SSL certificates the user is authorized to administer.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/appengine.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const appengine = google.appengine('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/appengine.admin',
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await appengine.apps.authorizedCertificates.list({
         *     // Part of `parent`. Name of the parent Application resource. Example: apps/myapp.
         *     appsId: 'placeholder-value',
         *     // Maximum results to return per page.
         *     pageSize: 'placeholder-value',
         *     // Continuation token for fetching the next page of results.
         *     pageToken: 'placeholder-value',
         *     // Controls the set of fields returned in the LIST response.
         *     view: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "certificates": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias appengine.apps.authorizedCertificates.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.appsId Part of `parent`. Name of the parent Application resource. Example: apps/myapp.
         * @param {integer=} params.pageSize Maximum results to return per page.
         * @param {string=} params.pageToken Continuation token for fetching the next page of results.
         * @param {string=} params.view Controls the set of fields returned in the LIST response.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Apps$Authorizedcertificates$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Apps$Authorizedcertificates$List, options?: MethodOptions): GaxiosPromise<Schema$ListAuthorizedCertificatesResponse>;
        list(params: Params$Resource$Apps$Authorizedcertificates$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Apps$Authorizedcertificates$List, options: MethodOptions | BodyResponseCallback<Schema$ListAuthorizedCertificatesResponse>, callback: BodyResponseCallback<Schema$ListAuthorizedCertificatesResponse>): void;
        list(params: Params$Resource$Apps$Authorizedcertificates$List, callback: BodyResponseCallback<Schema$ListAuthorizedCertificatesResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListAuthorizedCertificatesResponse>): void;
        /**
         * appengine.apps.authorizedCertificates.patch
         * @desc Updates the specified SSL certificate. To renew a certificate and maintain its existing domain mappings, update certificate_data with a new certificate. The new certificate must be applicable to the same domains as the original certificate. The certificate display_name may also be updated.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/appengine.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const appengine = google.appengine('v1');
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
         *   const res = await appengine.apps.authorizedCertificates.patch({
         *     // Part of `name`. Name of the resource to update. Example: apps/myapp/authorizedCertificates/12345.
         *     appsId: 'placeholder-value',
         *     // Part of `name`. See documentation of `appsId`.
         *     authorizedCertificatesId: 'placeholder-value',
         *     // Standard field mask for the set of fields to be updated. Updates are only supported on the certificate_raw_data and display_name fields.
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "certificateRawData": {},
         *       //   "displayName": "my_displayName",
         *       //   "domainMappingsCount": 0,
         *       //   "domainNames": [],
         *       //   "expireTime": "my_expireTime",
         *       //   "id": "my_id",
         *       //   "managedCertificate": {},
         *       //   "name": "my_name",
         *       //   "visibleDomainMappings": []
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "certificateRawData": {},
         *   //   "displayName": "my_displayName",
         *   //   "domainMappingsCount": 0,
         *   //   "domainNames": [],
         *   //   "expireTime": "my_expireTime",
         *   //   "id": "my_id",
         *   //   "managedCertificate": {},
         *   //   "name": "my_name",
         *   //   "visibleDomainMappings": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias appengine.apps.authorizedCertificates.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.appsId Part of `name`. Name of the resource to update. Example: apps/myapp/authorizedCertificates/12345.
         * @param {string} params.authorizedCertificatesId Part of `name`. See documentation of `appsId`.
         * @param {string=} params.updateMask Standard field mask for the set of fields to be updated. Updates are only supported on the certificate_raw_data and display_name fields.
         * @param {().AuthorizedCertificate} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Apps$Authorizedcertificates$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Apps$Authorizedcertificates$Patch, options?: MethodOptions): GaxiosPromise<Schema$AuthorizedCertificate>;
        patch(params: Params$Resource$Apps$Authorizedcertificates$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Apps$Authorizedcertificates$Patch, options: MethodOptions | BodyResponseCallback<Schema$AuthorizedCertificate>, callback: BodyResponseCallback<Schema$AuthorizedCertificate>): void;
        patch(params: Params$Resource$Apps$Authorizedcertificates$Patch, callback: BodyResponseCallback<Schema$AuthorizedCertificate>): void;
        patch(callback: BodyResponseCallback<Schema$AuthorizedCertificate>): void;
    }
    export interface Params$Resource$Apps$Authorizedcertificates$Create extends StandardParameters {
        /**
         * Part of `parent`. Name of the parent Application resource. Example: apps/myapp.
         */
        appsId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$AuthorizedCertificate;
    }
    export interface Params$Resource$Apps$Authorizedcertificates$Delete extends StandardParameters {
        /**
         * Part of `name`. Name of the resource to delete. Example: apps/myapp/authorizedCertificates/12345.
         */
        appsId?: string;
        /**
         * Part of `name`. See documentation of `appsId`.
         */
        authorizedCertificatesId?: string;
    }
    export interface Params$Resource$Apps$Authorizedcertificates$Get extends StandardParameters {
        /**
         * Part of `name`. Name of the resource requested. Example: apps/myapp/authorizedCertificates/12345.
         */
        appsId?: string;
        /**
         * Part of `name`. See documentation of `appsId`.
         */
        authorizedCertificatesId?: string;
        /**
         * Controls the set of fields returned in the GET response.
         */
        view?: string;
    }
    export interface Params$Resource$Apps$Authorizedcertificates$List extends StandardParameters {
        /**
         * Part of `parent`. Name of the parent Application resource. Example: apps/myapp.
         */
        appsId?: string;
        /**
         * Maximum results to return per page.
         */
        pageSize?: number;
        /**
         * Continuation token for fetching the next page of results.
         */
        pageToken?: string;
        /**
         * Controls the set of fields returned in the LIST response.
         */
        view?: string;
    }
    export interface Params$Resource$Apps$Authorizedcertificates$Patch extends StandardParameters {
        /**
         * Part of `name`. Name of the resource to update. Example: apps/myapp/authorizedCertificates/12345.
         */
        appsId?: string;
        /**
         * Part of `name`. See documentation of `appsId`.
         */
        authorizedCertificatesId?: string;
        /**
         * Standard field mask for the set of fields to be updated. Updates are only supported on the certificate_raw_data and display_name fields.
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$AuthorizedCertificate;
    }
    export class Resource$Apps$Authorizeddomains {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * appengine.apps.authorizedDomains.list
         * @desc Lists all domains the user is authorized to administer.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/appengine.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const appengine = google.appengine('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/appengine.admin',
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await appengine.apps.authorizedDomains.list({
         *     // Part of `parent`. Name of the parent Application resource. Example: apps/myapp.
         *     appsId: 'placeholder-value',
         *     // Maximum results to return per page.
         *     pageSize: 'placeholder-value',
         *     // Continuation token for fetching the next page of results.
         *     pageToken: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "domains": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias appengine.apps.authorizedDomains.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.appsId Part of `parent`. Name of the parent Application resource. Example: apps/myapp.
         * @param {integer=} params.pageSize Maximum results to return per page.
         * @param {string=} params.pageToken Continuation token for fetching the next page of results.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Apps$Authorizeddomains$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Apps$Authorizeddomains$List, options?: MethodOptions): GaxiosPromise<Schema$ListAuthorizedDomainsResponse>;
        list(params: Params$Resource$Apps$Authorizeddomains$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Apps$Authorizeddomains$List, options: MethodOptions | BodyResponseCallback<Schema$ListAuthorizedDomainsResponse>, callback: BodyResponseCallback<Schema$ListAuthorizedDomainsResponse>): void;
        list(params: Params$Resource$Apps$Authorizeddomains$List, callback: BodyResponseCallback<Schema$ListAuthorizedDomainsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListAuthorizedDomainsResponse>): void;
    }
    export interface Params$Resource$Apps$Authorizeddomains$List extends StandardParameters {
        /**
         * Part of `parent`. Name of the parent Application resource. Example: apps/myapp.
         */
        appsId?: string;
        /**
         * Maximum results to return per page.
         */
        pageSize?: number;
        /**
         * Continuation token for fetching the next page of results.
         */
        pageToken?: string;
    }
    export class Resource$Apps$Domainmappings {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * appengine.apps.domainMappings.create
         * @desc Maps a domain to an application. A user must be authorized to administer a domain in order to map it to an application. For a list of available authorized domains, see AuthorizedDomains.ListAuthorizedDomains.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/appengine.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const appengine = google.appengine('v1');
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
         *   const res = await appengine.apps.domainMappings.create({
         *     // Part of `parent`. Name of the parent Application resource. Example: apps/myapp.
         *     appsId: 'placeholder-value',
         *     // Whether the domain creation should override any existing mappings for this domain. By default, overrides are rejected.
         *     overrideStrategy: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "id": "my_id",
         *       //   "name": "my_name",
         *       //   "resourceRecords": [],
         *       //   "sslSettings": {}
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
         * @alias appengine.apps.domainMappings.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.appsId Part of `parent`. Name of the parent Application resource. Example: apps/myapp.
         * @param {string=} params.overrideStrategy Whether the domain creation should override any existing mappings for this domain. By default, overrides are rejected.
         * @param {().DomainMapping} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Apps$Domainmappings$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Apps$Domainmappings$Create, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        create(params: Params$Resource$Apps$Domainmappings$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Apps$Domainmappings$Create, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        create(params: Params$Resource$Apps$Domainmappings$Create, callback: BodyResponseCallback<Schema$Operation>): void;
        create(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * appengine.apps.domainMappings.delete
         * @desc Deletes the specified domain mapping. A user must be authorized to administer the associated domain in order to delete a DomainMapping resource.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/appengine.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const appengine = google.appengine('v1');
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
         *   const res = await appengine.apps.domainMappings.delete({
         *     // Part of `name`. Name of the resource to delete. Example: apps/myapp/domainMappings/example.com.
         *     appsId: 'placeholder-value',
         *     // Part of `name`. See documentation of `appsId`.
         *     domainMappingsId: 'placeholder-value',
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
         * @alias appengine.apps.domainMappings.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.appsId Part of `name`. Name of the resource to delete. Example: apps/myapp/domainMappings/example.com.
         * @param {string} params.domainMappingsId Part of `name`. See documentation of `appsId`.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Apps$Domainmappings$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Apps$Domainmappings$Delete, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        delete(params: Params$Resource$Apps$Domainmappings$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Apps$Domainmappings$Delete, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        delete(params: Params$Resource$Apps$Domainmappings$Delete, callback: BodyResponseCallback<Schema$Operation>): void;
        delete(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * appengine.apps.domainMappings.get
         * @desc Gets the specified domain mapping.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/appengine.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const appengine = google.appengine('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/appengine.admin',
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await appengine.apps.domainMappings.get({
         *     // Part of `name`. Name of the resource requested. Example: apps/myapp/domainMappings/example.com.
         *     appsId: 'placeholder-value',
         *     // Part of `name`. See documentation of `appsId`.
         *     domainMappingsId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "id": "my_id",
         *   //   "name": "my_name",
         *   //   "resourceRecords": [],
         *   //   "sslSettings": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias appengine.apps.domainMappings.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.appsId Part of `name`. Name of the resource requested. Example: apps/myapp/domainMappings/example.com.
         * @param {string} params.domainMappingsId Part of `name`. See documentation of `appsId`.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Apps$Domainmappings$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Apps$Domainmappings$Get, options?: MethodOptions): GaxiosPromise<Schema$DomainMapping>;
        get(params: Params$Resource$Apps$Domainmappings$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Apps$Domainmappings$Get, options: MethodOptions | BodyResponseCallback<Schema$DomainMapping>, callback: BodyResponseCallback<Schema$DomainMapping>): void;
        get(params: Params$Resource$Apps$Domainmappings$Get, callback: BodyResponseCallback<Schema$DomainMapping>): void;
        get(callback: BodyResponseCallback<Schema$DomainMapping>): void;
        /**
         * appengine.apps.domainMappings.list
         * @desc Lists the domain mappings on an application.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/appengine.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const appengine = google.appengine('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/appengine.admin',
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await appengine.apps.domainMappings.list({
         *     // Part of `parent`. Name of the parent Application resource. Example: apps/myapp.
         *     appsId: 'placeholder-value',
         *     // Maximum results to return per page.
         *     pageSize: 'placeholder-value',
         *     // Continuation token for fetching the next page of results.
         *     pageToken: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "domainMappings": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias appengine.apps.domainMappings.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.appsId Part of `parent`. Name of the parent Application resource. Example: apps/myapp.
         * @param {integer=} params.pageSize Maximum results to return per page.
         * @param {string=} params.pageToken Continuation token for fetching the next page of results.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Apps$Domainmappings$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Apps$Domainmappings$List, options?: MethodOptions): GaxiosPromise<Schema$ListDomainMappingsResponse>;
        list(params: Params$Resource$Apps$Domainmappings$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Apps$Domainmappings$List, options: MethodOptions | BodyResponseCallback<Schema$ListDomainMappingsResponse>, callback: BodyResponseCallback<Schema$ListDomainMappingsResponse>): void;
        list(params: Params$Resource$Apps$Domainmappings$List, callback: BodyResponseCallback<Schema$ListDomainMappingsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListDomainMappingsResponse>): void;
        /**
         * appengine.apps.domainMappings.patch
         * @desc Updates the specified domain mapping. To map an SSL certificate to a domain mapping, update certificate_id to point to an AuthorizedCertificate resource. A user must be authorized to administer the associated domain in order to update a DomainMapping resource.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/appengine.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const appengine = google.appengine('v1');
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
         *   const res = await appengine.apps.domainMappings.patch({
         *     // Part of `name`. Name of the resource to update. Example: apps/myapp/domainMappings/example.com.
         *     appsId: 'placeholder-value',
         *     // Part of `name`. See documentation of `appsId`.
         *     domainMappingsId: 'placeholder-value',
         *     // Standard field mask for the set of fields to be updated.
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "id": "my_id",
         *       //   "name": "my_name",
         *       //   "resourceRecords": [],
         *       //   "sslSettings": {}
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
         * @alias appengine.apps.domainMappings.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.appsId Part of `name`. Name of the resource to update. Example: apps/myapp/domainMappings/example.com.
         * @param {string} params.domainMappingsId Part of `name`. See documentation of `appsId`.
         * @param {string=} params.updateMask Standard field mask for the set of fields to be updated.
         * @param {().DomainMapping} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Apps$Domainmappings$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Apps$Domainmappings$Patch, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        patch(params: Params$Resource$Apps$Domainmappings$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Apps$Domainmappings$Patch, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        patch(params: Params$Resource$Apps$Domainmappings$Patch, callback: BodyResponseCallback<Schema$Operation>): void;
        patch(callback: BodyResponseCallback<Schema$Operation>): void;
    }
    export interface Params$Resource$Apps$Domainmappings$Create extends StandardParameters {
        /**
         * Part of `parent`. Name of the parent Application resource. Example: apps/myapp.
         */
        appsId?: string;
        /**
         * Whether the domain creation should override any existing mappings for this domain. By default, overrides are rejected.
         */
        overrideStrategy?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$DomainMapping;
    }
    export interface Params$Resource$Apps$Domainmappings$Delete extends StandardParameters {
        /**
         * Part of `name`. Name of the resource to delete. Example: apps/myapp/domainMappings/example.com.
         */
        appsId?: string;
        /**
         * Part of `name`. See documentation of `appsId`.
         */
        domainMappingsId?: string;
    }
    export interface Params$Resource$Apps$Domainmappings$Get extends StandardParameters {
        /**
         * Part of `name`. Name of the resource requested. Example: apps/myapp/domainMappings/example.com.
         */
        appsId?: string;
        /**
         * Part of `name`. See documentation of `appsId`.
         */
        domainMappingsId?: string;
    }
    export interface Params$Resource$Apps$Domainmappings$List extends StandardParameters {
        /**
         * Part of `parent`. Name of the parent Application resource. Example: apps/myapp.
         */
        appsId?: string;
        /**
         * Maximum results to return per page.
         */
        pageSize?: number;
        /**
         * Continuation token for fetching the next page of results.
         */
        pageToken?: string;
    }
    export interface Params$Resource$Apps$Domainmappings$Patch extends StandardParameters {
        /**
         * Part of `name`. Name of the resource to update. Example: apps/myapp/domainMappings/example.com.
         */
        appsId?: string;
        /**
         * Part of `name`. See documentation of `appsId`.
         */
        domainMappingsId?: string;
        /**
         * Standard field mask for the set of fields to be updated.
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$DomainMapping;
    }
    export class Resource$Apps$Firewall {
        context: APIRequestContext;
        ingressRules: Resource$Apps$Firewall$Ingressrules;
        constructor(context: APIRequestContext);
    }
    export class Resource$Apps$Firewall$Ingressrules {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * appengine.apps.firewall.ingressRules.batchUpdate
         * @desc Replaces the entire firewall ruleset in one bulk operation. This overrides and replaces the rules of an existing firewall with the new rules.If the final rule does not match traffic with the '*' wildcard IP range, then an "allow all" rule is explicitly added to the end of the list.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/appengine.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const appengine = google.appengine('v1');
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
         *   const res = await appengine.apps.firewall.ingressRules.batchUpdate({
         *     // Part of `name`. Name of the Firewall collection to set. Example: apps/myapp/firewall/ingressRules.
         *     appsId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "ingressRules": []
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "ingressRules": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias appengine.apps.firewall.ingressRules.batchUpdate
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.appsId Part of `name`. Name of the Firewall collection to set. Example: apps/myapp/firewall/ingressRules.
         * @param {().BatchUpdateIngressRulesRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        batchUpdate(params: Params$Resource$Apps$Firewall$Ingressrules$Batchupdate, options: StreamMethodOptions): GaxiosPromise<Readable>;
        batchUpdate(params?: Params$Resource$Apps$Firewall$Ingressrules$Batchupdate, options?: MethodOptions): GaxiosPromise<Schema$BatchUpdateIngressRulesResponse>;
        batchUpdate(params: Params$Resource$Apps$Firewall$Ingressrules$Batchupdate, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        batchUpdate(params: Params$Resource$Apps$Firewall$Ingressrules$Batchupdate, options: MethodOptions | BodyResponseCallback<Schema$BatchUpdateIngressRulesResponse>, callback: BodyResponseCallback<Schema$BatchUpdateIngressRulesResponse>): void;
        batchUpdate(params: Params$Resource$Apps$Firewall$Ingressrules$Batchupdate, callback: BodyResponseCallback<Schema$BatchUpdateIngressRulesResponse>): void;
        batchUpdate(callback: BodyResponseCallback<Schema$BatchUpdateIngressRulesResponse>): void;
        /**
         * appengine.apps.firewall.ingressRules.create
         * @desc Creates a firewall rule for the application.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/appengine.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const appengine = google.appengine('v1');
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
         *   const res = await appengine.apps.firewall.ingressRules.create({
         *     // Part of `parent`. Name of the parent Firewall collection in which to create a new rule. Example: apps/myapp/firewall/ingressRules.
         *     appsId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "action": "my_action",
         *       //   "description": "my_description",
         *       //   "priority": 0,
         *       //   "sourceRange": "my_sourceRange"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "action": "my_action",
         *   //   "description": "my_description",
         *   //   "priority": 0,
         *   //   "sourceRange": "my_sourceRange"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias appengine.apps.firewall.ingressRules.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.appsId Part of `parent`. Name of the parent Firewall collection in which to create a new rule. Example: apps/myapp/firewall/ingressRules.
         * @param {().FirewallRule} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Apps$Firewall$Ingressrules$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Apps$Firewall$Ingressrules$Create, options?: MethodOptions): GaxiosPromise<Schema$FirewallRule>;
        create(params: Params$Resource$Apps$Firewall$Ingressrules$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Apps$Firewall$Ingressrules$Create, options: MethodOptions | BodyResponseCallback<Schema$FirewallRule>, callback: BodyResponseCallback<Schema$FirewallRule>): void;
        create(params: Params$Resource$Apps$Firewall$Ingressrules$Create, callback: BodyResponseCallback<Schema$FirewallRule>): void;
        create(callback: BodyResponseCallback<Schema$FirewallRule>): void;
        /**
         * appengine.apps.firewall.ingressRules.delete
         * @desc Deletes the specified firewall rule.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/appengine.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const appengine = google.appengine('v1');
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
         *   const res = await appengine.apps.firewall.ingressRules.delete({
         *     // Part of `name`. Name of the Firewall resource to delete. Example: apps/myapp/firewall/ingressRules/100.
         *     appsId: 'placeholder-value',
         *     // Part of `name`. See documentation of `appsId`.
         *     ingressRulesId: 'placeholder-value',
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
         * @alias appengine.apps.firewall.ingressRules.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.appsId Part of `name`. Name of the Firewall resource to delete. Example: apps/myapp/firewall/ingressRules/100.
         * @param {string} params.ingressRulesId Part of `name`. See documentation of `appsId`.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Apps$Firewall$Ingressrules$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Apps$Firewall$Ingressrules$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Apps$Firewall$Ingressrules$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Apps$Firewall$Ingressrules$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Apps$Firewall$Ingressrules$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * appengine.apps.firewall.ingressRules.get
         * @desc Gets the specified firewall rule.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/appengine.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const appengine = google.appengine('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/appengine.admin',
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await appengine.apps.firewall.ingressRules.get({
         *     // Part of `name`. Name of the Firewall resource to retrieve. Example: apps/myapp/firewall/ingressRules/100.
         *     appsId: 'placeholder-value',
         *     // Part of `name`. See documentation of `appsId`.
         *     ingressRulesId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "action": "my_action",
         *   //   "description": "my_description",
         *   //   "priority": 0,
         *   //   "sourceRange": "my_sourceRange"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias appengine.apps.firewall.ingressRules.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.appsId Part of `name`. Name of the Firewall resource to retrieve. Example: apps/myapp/firewall/ingressRules/100.
         * @param {string} params.ingressRulesId Part of `name`. See documentation of `appsId`.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Apps$Firewall$Ingressrules$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Apps$Firewall$Ingressrules$Get, options?: MethodOptions): GaxiosPromise<Schema$FirewallRule>;
        get(params: Params$Resource$Apps$Firewall$Ingressrules$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Apps$Firewall$Ingressrules$Get, options: MethodOptions | BodyResponseCallback<Schema$FirewallRule>, callback: BodyResponseCallback<Schema$FirewallRule>): void;
        get(params: Params$Resource$Apps$Firewall$Ingressrules$Get, callback: BodyResponseCallback<Schema$FirewallRule>): void;
        get(callback: BodyResponseCallback<Schema$FirewallRule>): void;
        /**
         * appengine.apps.firewall.ingressRules.list
         * @desc Lists the firewall rules of an application.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/appengine.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const appengine = google.appengine('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/appengine.admin',
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await appengine.apps.firewall.ingressRules.list({
         *     // Part of `parent`. Name of the Firewall collection to retrieve. Example: apps/myapp/firewall/ingressRules.
         *     appsId: 'placeholder-value',
         *     // A valid IP Address. If set, only rules matching this address will be returned. The first returned rule will be the rule that fires on requests from this IP.
         *     matchingAddress: 'placeholder-value',
         *     // Maximum results to return per page.
         *     pageSize: 'placeholder-value',
         *     // Continuation token for fetching the next page of results.
         *     pageToken: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "ingressRules": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias appengine.apps.firewall.ingressRules.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.appsId Part of `parent`. Name of the Firewall collection to retrieve. Example: apps/myapp/firewall/ingressRules.
         * @param {string=} params.matchingAddress A valid IP Address. If set, only rules matching this address will be returned. The first returned rule will be the rule that fires on requests from this IP.
         * @param {integer=} params.pageSize Maximum results to return per page.
         * @param {string=} params.pageToken Continuation token for fetching the next page of results.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Apps$Firewall$Ingressrules$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Apps$Firewall$Ingressrules$List, options?: MethodOptions): GaxiosPromise<Schema$ListIngressRulesResponse>;
        list(params: Params$Resource$Apps$Firewall$Ingressrules$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Apps$Firewall$Ingressrules$List, options: MethodOptions | BodyResponseCallback<Schema$ListIngressRulesResponse>, callback: BodyResponseCallback<Schema$ListIngressRulesResponse>): void;
        list(params: Params$Resource$Apps$Firewall$Ingressrules$List, callback: BodyResponseCallback<Schema$ListIngressRulesResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListIngressRulesResponse>): void;
        /**
         * appengine.apps.firewall.ingressRules.patch
         * @desc Updates the specified firewall rule.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/appengine.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const appengine = google.appengine('v1');
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
         *   const res = await appengine.apps.firewall.ingressRules.patch({
         *     // Part of `name`. Name of the Firewall resource to update. Example: apps/myapp/firewall/ingressRules/100.
         *     appsId: 'placeholder-value',
         *     // Part of `name`. See documentation of `appsId`.
         *     ingressRulesId: 'placeholder-value',
         *     // Standard field mask for the set of fields to be updated.
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "action": "my_action",
         *       //   "description": "my_description",
         *       //   "priority": 0,
         *       //   "sourceRange": "my_sourceRange"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "action": "my_action",
         *   //   "description": "my_description",
         *   //   "priority": 0,
         *   //   "sourceRange": "my_sourceRange"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias appengine.apps.firewall.ingressRules.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.appsId Part of `name`. Name of the Firewall resource to update. Example: apps/myapp/firewall/ingressRules/100.
         * @param {string} params.ingressRulesId Part of `name`. See documentation of `appsId`.
         * @param {string=} params.updateMask Standard field mask for the set of fields to be updated.
         * @param {().FirewallRule} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Apps$Firewall$Ingressrules$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Apps$Firewall$Ingressrules$Patch, options?: MethodOptions): GaxiosPromise<Schema$FirewallRule>;
        patch(params: Params$Resource$Apps$Firewall$Ingressrules$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Apps$Firewall$Ingressrules$Patch, options: MethodOptions | BodyResponseCallback<Schema$FirewallRule>, callback: BodyResponseCallback<Schema$FirewallRule>): void;
        patch(params: Params$Resource$Apps$Firewall$Ingressrules$Patch, callback: BodyResponseCallback<Schema$FirewallRule>): void;
        patch(callback: BodyResponseCallback<Schema$FirewallRule>): void;
    }
    export interface Params$Resource$Apps$Firewall$Ingressrules$Batchupdate extends StandardParameters {
        /**
         * Part of `name`. Name of the Firewall collection to set. Example: apps/myapp/firewall/ingressRules.
         */
        appsId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$BatchUpdateIngressRulesRequest;
    }
    export interface Params$Resource$Apps$Firewall$Ingressrules$Create extends StandardParameters {
        /**
         * Part of `parent`. Name of the parent Firewall collection in which to create a new rule. Example: apps/myapp/firewall/ingressRules.
         */
        appsId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$FirewallRule;
    }
    export interface Params$Resource$Apps$Firewall$Ingressrules$Delete extends StandardParameters {
        /**
         * Part of `name`. Name of the Firewall resource to delete. Example: apps/myapp/firewall/ingressRules/100.
         */
        appsId?: string;
        /**
         * Part of `name`. See documentation of `appsId`.
         */
        ingressRulesId?: string;
    }
    export interface Params$Resource$Apps$Firewall$Ingressrules$Get extends StandardParameters {
        /**
         * Part of `name`. Name of the Firewall resource to retrieve. Example: apps/myapp/firewall/ingressRules/100.
         */
        appsId?: string;
        /**
         * Part of `name`. See documentation of `appsId`.
         */
        ingressRulesId?: string;
    }
    export interface Params$Resource$Apps$Firewall$Ingressrules$List extends StandardParameters {
        /**
         * Part of `parent`. Name of the Firewall collection to retrieve. Example: apps/myapp/firewall/ingressRules.
         */
        appsId?: string;
        /**
         * A valid IP Address. If set, only rules matching this address will be returned. The first returned rule will be the rule that fires on requests from this IP.
         */
        matchingAddress?: string;
        /**
         * Maximum results to return per page.
         */
        pageSize?: number;
        /**
         * Continuation token for fetching the next page of results.
         */
        pageToken?: string;
    }
    export interface Params$Resource$Apps$Firewall$Ingressrules$Patch extends StandardParameters {
        /**
         * Part of `name`. Name of the Firewall resource to update. Example: apps/myapp/firewall/ingressRules/100.
         */
        appsId?: string;
        /**
         * Part of `name`. See documentation of `appsId`.
         */
        ingressRulesId?: string;
        /**
         * Standard field mask for the set of fields to be updated.
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$FirewallRule;
    }
    export class Resource$Apps$Locations {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * appengine.apps.locations.get
         * @desc Gets information about a location.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/appengine.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const appengine = google.appengine('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/appengine.admin',
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await appengine.apps.locations.get({
         *     // Part of `name`. Resource name for the location.
         *     appsId: 'placeholder-value',
         *     // Part of `name`. See documentation of `appsId`.
         *     locationsId: 'placeholder-value',
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
         * @alias appengine.apps.locations.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.appsId Part of `name`. Resource name for the location.
         * @param {string} params.locationsId Part of `name`. See documentation of `appsId`.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Apps$Locations$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Apps$Locations$Get, options?: MethodOptions): GaxiosPromise<Schema$Location>;
        get(params: Params$Resource$Apps$Locations$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Apps$Locations$Get, options: MethodOptions | BodyResponseCallback<Schema$Location>, callback: BodyResponseCallback<Schema$Location>): void;
        get(params: Params$Resource$Apps$Locations$Get, callback: BodyResponseCallback<Schema$Location>): void;
        get(callback: BodyResponseCallback<Schema$Location>): void;
        /**
         * appengine.apps.locations.list
         * @desc Lists information about the supported locations for this service.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/appengine.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const appengine = google.appengine('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/appengine.admin',
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await appengine.apps.locations.list({
         *     // Part of `name`. The resource that owns the locations collection, if applicable.
         *     appsId: 'placeholder-value',
         *     // The standard list filter.
         *     filter: 'placeholder-value',
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
         * @alias appengine.apps.locations.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.appsId Part of `name`. The resource that owns the locations collection, if applicable.
         * @param {string=} params.filter The standard list filter.
         * @param {integer=} params.pageSize The standard list page size.
         * @param {string=} params.pageToken The standard list page token.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Apps$Locations$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Apps$Locations$List, options?: MethodOptions): GaxiosPromise<Schema$ListLocationsResponse>;
        list(params: Params$Resource$Apps$Locations$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Apps$Locations$List, options: MethodOptions | BodyResponseCallback<Schema$ListLocationsResponse>, callback: BodyResponseCallback<Schema$ListLocationsResponse>): void;
        list(params: Params$Resource$Apps$Locations$List, callback: BodyResponseCallback<Schema$ListLocationsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListLocationsResponse>): void;
    }
    export interface Params$Resource$Apps$Locations$Get extends StandardParameters {
        /**
         * Part of `name`. Resource name for the location.
         */
        appsId?: string;
        /**
         * Part of `name`. See documentation of `appsId`.
         */
        locationsId?: string;
    }
    export interface Params$Resource$Apps$Locations$List extends StandardParameters {
        /**
         * Part of `name`. The resource that owns the locations collection, if applicable.
         */
        appsId?: string;
        /**
         * The standard list filter.
         */
        filter?: string;
        /**
         * The standard list page size.
         */
        pageSize?: number;
        /**
         * The standard list page token.
         */
        pageToken?: string;
    }
    export class Resource$Apps$Operations {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * appengine.apps.operations.get
         * @desc Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/appengine.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const appengine = google.appengine('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/appengine.admin',
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await appengine.apps.operations.get({
         *     // Part of `name`. The name of the operation resource.
         *     appsId: 'placeholder-value',
         *     // Part of `name`. See documentation of `appsId`.
         *     operationsId: 'placeholder-value',
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
         * @alias appengine.apps.operations.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.appsId Part of `name`. The name of the operation resource.
         * @param {string} params.operationsId Part of `name`. See documentation of `appsId`.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Apps$Operations$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Apps$Operations$Get, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        get(params: Params$Resource$Apps$Operations$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Apps$Operations$Get, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        get(params: Params$Resource$Apps$Operations$Get, callback: BodyResponseCallback<Schema$Operation>): void;
        get(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * appengine.apps.operations.list
         * @desc Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns UNIMPLEMENTED.NOTE: the name binding allows API services to override the binding to use different resource name schemes, such as users/x/operations. To override the binding, API services can add a binding such as "/v1/{name=users/x}/operations" to their service configuration. For backwards compatibility, the default name includes the operations collection id, however overriding users must ensure the name binding is the parent resource, without the operations collection id.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/appengine.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const appengine = google.appengine('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/appengine.admin',
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await appengine.apps.operations.list({
         *     // Part of `name`. The name of the operation's parent resource.
         *     appsId: 'placeholder-value',
         *     // The standard list filter.
         *     filter: 'placeholder-value',
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
         * @alias appengine.apps.operations.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.appsId Part of `name`. The name of the operation's parent resource.
         * @param {string=} params.filter The standard list filter.
         * @param {integer=} params.pageSize The standard list page size.
         * @param {string=} params.pageToken The standard list page token.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Apps$Operations$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Apps$Operations$List, options?: MethodOptions): GaxiosPromise<Schema$ListOperationsResponse>;
        list(params: Params$Resource$Apps$Operations$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Apps$Operations$List, options: MethodOptions | BodyResponseCallback<Schema$ListOperationsResponse>, callback: BodyResponseCallback<Schema$ListOperationsResponse>): void;
        list(params: Params$Resource$Apps$Operations$List, callback: BodyResponseCallback<Schema$ListOperationsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListOperationsResponse>): void;
    }
    export interface Params$Resource$Apps$Operations$Get extends StandardParameters {
        /**
         * Part of `name`. The name of the operation resource.
         */
        appsId?: string;
        /**
         * Part of `name`. See documentation of `appsId`.
         */
        operationsId?: string;
    }
    export interface Params$Resource$Apps$Operations$List extends StandardParameters {
        /**
         * Part of `name`. The name of the operation's parent resource.
         */
        appsId?: string;
        /**
         * The standard list filter.
         */
        filter?: string;
        /**
         * The standard list page size.
         */
        pageSize?: number;
        /**
         * The standard list page token.
         */
        pageToken?: string;
    }
    export class Resource$Apps$Services {
        context: APIRequestContext;
        versions: Resource$Apps$Services$Versions;
        constructor(context: APIRequestContext);
        /**
         * appengine.apps.services.delete
         * @desc Deletes the specified service and all enclosed versions.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/appengine.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const appengine = google.appengine('v1');
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
         *   const res = await appengine.apps.services.delete({
         *     // Part of `name`. Name of the resource requested. Example: apps/myapp/services/default.
         *     appsId: 'placeholder-value',
         *     // Part of `name`. See documentation of `appsId`.
         *     servicesId: 'placeholder-value',
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
         * @alias appengine.apps.services.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.appsId Part of `name`. Name of the resource requested. Example: apps/myapp/services/default.
         * @param {string} params.servicesId Part of `name`. See documentation of `appsId`.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Apps$Services$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Apps$Services$Delete, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        delete(params: Params$Resource$Apps$Services$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Apps$Services$Delete, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        delete(params: Params$Resource$Apps$Services$Delete, callback: BodyResponseCallback<Schema$Operation>): void;
        delete(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * appengine.apps.services.get
         * @desc Gets the current configuration of the specified service.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/appengine.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const appengine = google.appengine('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/appengine.admin',
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await appengine.apps.services.get({
         *     // Part of `name`. Name of the resource requested. Example: apps/myapp/services/default.
         *     appsId: 'placeholder-value',
         *     // Part of `name`. See documentation of `appsId`.
         *     servicesId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "id": "my_id",
         *   //   "name": "my_name",
         *   //   "split": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias appengine.apps.services.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.appsId Part of `name`. Name of the resource requested. Example: apps/myapp/services/default.
         * @param {string} params.servicesId Part of `name`. See documentation of `appsId`.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Apps$Services$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Apps$Services$Get, options?: MethodOptions): GaxiosPromise<Schema$Service>;
        get(params: Params$Resource$Apps$Services$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Apps$Services$Get, options: MethodOptions | BodyResponseCallback<Schema$Service>, callback: BodyResponseCallback<Schema$Service>): void;
        get(params: Params$Resource$Apps$Services$Get, callback: BodyResponseCallback<Schema$Service>): void;
        get(callback: BodyResponseCallback<Schema$Service>): void;
        /**
         * appengine.apps.services.list
         * @desc Lists all the services in the application.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/appengine.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const appengine = google.appengine('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/appengine.admin',
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await appengine.apps.services.list({
         *     // Part of `parent`. Name of the parent Application resource. Example: apps/myapp.
         *     appsId: 'placeholder-value',
         *     // Maximum results to return per page.
         *     pageSize: 'placeholder-value',
         *     // Continuation token for fetching the next page of results.
         *     pageToken: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "services": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias appengine.apps.services.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.appsId Part of `parent`. Name of the parent Application resource. Example: apps/myapp.
         * @param {integer=} params.pageSize Maximum results to return per page.
         * @param {string=} params.pageToken Continuation token for fetching the next page of results.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Apps$Services$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Apps$Services$List, options?: MethodOptions): GaxiosPromise<Schema$ListServicesResponse>;
        list(params: Params$Resource$Apps$Services$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Apps$Services$List, options: MethodOptions | BodyResponseCallback<Schema$ListServicesResponse>, callback: BodyResponseCallback<Schema$ListServicesResponse>): void;
        list(params: Params$Resource$Apps$Services$List, callback: BodyResponseCallback<Schema$ListServicesResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListServicesResponse>): void;
        /**
         * appengine.apps.services.patch
         * @desc Updates the configuration of the specified service.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/appengine.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const appengine = google.appengine('v1');
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
         *   const res = await appengine.apps.services.patch({
         *     // Part of `name`. Name of the resource to update. Example: apps/myapp/services/default.
         *     appsId: 'placeholder-value',
         *     // Set to true to gradually shift traffic to one or more versions that you specify. By default, traffic is shifted immediately. For gradual traffic migration, the target versions must be located within instances that are configured for both warmup requests (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#InboundServiceType) and automatic scaling (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#AutomaticScaling). You must specify the shardBy (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services#ShardBy) field in the Service resource. Gradual traffic migration is not supported in the App Engine flexible environment. For examples, see Migrating and Splitting Traffic (https://cloud.google.com/appengine/docs/admin-api/migrating-splitting-traffic).
         *     migrateTraffic: 'placeholder-value',
         *     // Part of `name`. See documentation of `appsId`.
         *     servicesId: 'placeholder-value',
         *     // Standard field mask for the set of fields to be updated.
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "id": "my_id",
         *       //   "name": "my_name",
         *       //   "split": {}
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
         * @alias appengine.apps.services.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.appsId Part of `name`. Name of the resource to update. Example: apps/myapp/services/default.
         * @param {boolean=} params.migrateTraffic Set to true to gradually shift traffic to one or more versions that you specify. By default, traffic is shifted immediately. For gradual traffic migration, the target versions must be located within instances that are configured for both warmup requests (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#InboundServiceType) and automatic scaling (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#AutomaticScaling). You must specify the shardBy (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services#ShardBy) field in the Service resource. Gradual traffic migration is not supported in the App Engine flexible environment. For examples, see Migrating and Splitting Traffic (https://cloud.google.com/appengine/docs/admin-api/migrating-splitting-traffic).
         * @param {string} params.servicesId Part of `name`. See documentation of `appsId`.
         * @param {string=} params.updateMask Standard field mask for the set of fields to be updated.
         * @param {().Service} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Apps$Services$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Apps$Services$Patch, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        patch(params: Params$Resource$Apps$Services$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Apps$Services$Patch, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        patch(params: Params$Resource$Apps$Services$Patch, callback: BodyResponseCallback<Schema$Operation>): void;
        patch(callback: BodyResponseCallback<Schema$Operation>): void;
    }
    export interface Params$Resource$Apps$Services$Delete extends StandardParameters {
        /**
         * Part of `name`. Name of the resource requested. Example: apps/myapp/services/default.
         */
        appsId?: string;
        /**
         * Part of `name`. See documentation of `appsId`.
         */
        servicesId?: string;
    }
    export interface Params$Resource$Apps$Services$Get extends StandardParameters {
        /**
         * Part of `name`. Name of the resource requested. Example: apps/myapp/services/default.
         */
        appsId?: string;
        /**
         * Part of `name`. See documentation of `appsId`.
         */
        servicesId?: string;
    }
    export interface Params$Resource$Apps$Services$List extends StandardParameters {
        /**
         * Part of `parent`. Name of the parent Application resource. Example: apps/myapp.
         */
        appsId?: string;
        /**
         * Maximum results to return per page.
         */
        pageSize?: number;
        /**
         * Continuation token for fetching the next page of results.
         */
        pageToken?: string;
    }
    export interface Params$Resource$Apps$Services$Patch extends StandardParameters {
        /**
         * Part of `name`. Name of the resource to update. Example: apps/myapp/services/default.
         */
        appsId?: string;
        /**
         * Set to true to gradually shift traffic to one or more versions that you specify. By default, traffic is shifted immediately. For gradual traffic migration, the target versions must be located within instances that are configured for both warmup requests (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#InboundServiceType) and automatic scaling (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#AutomaticScaling). You must specify the shardBy (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services#ShardBy) field in the Service resource. Gradual traffic migration is not supported in the App Engine flexible environment. For examples, see Migrating and Splitting Traffic (https://cloud.google.com/appengine/docs/admin-api/migrating-splitting-traffic).
         */
        migrateTraffic?: boolean;
        /**
         * Part of `name`. See documentation of `appsId`.
         */
        servicesId?: string;
        /**
         * Standard field mask for the set of fields to be updated.
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Service;
    }
    export class Resource$Apps$Services$Versions {
        context: APIRequestContext;
        instances: Resource$Apps$Services$Versions$Instances;
        constructor(context: APIRequestContext);
        /**
         * appengine.apps.services.versions.create
         * @desc Deploys code and resource files to a new version.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/appengine.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const appengine = google.appengine('v1');
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
         *   const res = await appengine.apps.services.versions.create({
         *     // Part of `parent`. Name of the parent resource to create this version under. Example: apps/myapp/services/default.
         *     appsId: 'placeholder-value',
         *     // Part of `parent`. See documentation of `appsId`.
         *     servicesId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "apiConfig": {},
         *       //   "automaticScaling": {},
         *       //   "basicScaling": {},
         *       //   "betaSettings": {},
         *       //   "createTime": "my_createTime",
         *       //   "createdBy": "my_createdBy",
         *       //   "defaultExpiration": "my_defaultExpiration",
         *       //   "deployment": {},
         *       //   "diskUsageBytes": "my_diskUsageBytes",
         *       //   "endpointsApiService": {},
         *       //   "entrypoint": {},
         *       //   "env": "my_env",
         *       //   "envVariables": {},
         *       //   "errorHandlers": [],
         *       //   "handlers": [],
         *       //   "healthCheck": {},
         *       //   "id": "my_id",
         *       //   "inboundServices": [],
         *       //   "instanceClass": "my_instanceClass",
         *       //   "libraries": [],
         *       //   "livenessCheck": {},
         *       //   "manualScaling": {},
         *       //   "name": "my_name",
         *       //   "network": {},
         *       //   "nobuildFilesRegex": "my_nobuildFilesRegex",
         *       //   "readinessCheck": {},
         *       //   "resources": {},
         *       //   "runtime": "my_runtime",
         *       //   "runtimeApiVersion": "my_runtimeApiVersion",
         *       //   "runtimeChannel": "my_runtimeChannel",
         *       //   "runtimeMainExecutablePath": "my_runtimeMainExecutablePath",
         *       //   "servingStatus": "my_servingStatus",
         *       //   "threadsafe": false,
         *       //   "versionUrl": "my_versionUrl",
         *       //   "vm": false,
         *       //   "vpcAccessConnector": {},
         *       //   "zones": []
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
         * @alias appengine.apps.services.versions.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.appsId Part of `parent`. Name of the parent resource to create this version under. Example: apps/myapp/services/default.
         * @param {string} params.servicesId Part of `parent`. See documentation of `appsId`.
         * @param {().Version} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Apps$Services$Versions$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Apps$Services$Versions$Create, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        create(params: Params$Resource$Apps$Services$Versions$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Apps$Services$Versions$Create, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        create(params: Params$Resource$Apps$Services$Versions$Create, callback: BodyResponseCallback<Schema$Operation>): void;
        create(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * appengine.apps.services.versions.delete
         * @desc Deletes an existing Version resource.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/appengine.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const appengine = google.appengine('v1');
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
         *   const res = await appengine.apps.services.versions.delete({
         *     // Part of `name`. Name of the resource requested. Example: apps/myapp/services/default/versions/v1.
         *     appsId: 'placeholder-value',
         *     // Part of `name`. See documentation of `appsId`.
         *     servicesId: 'placeholder-value',
         *     // Part of `name`. See documentation of `appsId`.
         *     versionsId: 'placeholder-value',
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
         * @alias appengine.apps.services.versions.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.appsId Part of `name`. Name of the resource requested. Example: apps/myapp/services/default/versions/v1.
         * @param {string} params.servicesId Part of `name`. See documentation of `appsId`.
         * @param {string} params.versionsId Part of `name`. See documentation of `appsId`.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Apps$Services$Versions$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Apps$Services$Versions$Delete, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        delete(params: Params$Resource$Apps$Services$Versions$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Apps$Services$Versions$Delete, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        delete(params: Params$Resource$Apps$Services$Versions$Delete, callback: BodyResponseCallback<Schema$Operation>): void;
        delete(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * appengine.apps.services.versions.get
         * @desc Gets the specified Version resource. By default, only a BASIC_VIEW will be returned. Specify the FULL_VIEW parameter to get the full resource.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/appengine.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const appengine = google.appengine('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/appengine.admin',
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await appengine.apps.services.versions.get({
         *     // Part of `name`. Name of the resource requested. Example: apps/myapp/services/default/versions/v1.
         *     appsId: 'placeholder-value',
         *     // Part of `name`. See documentation of `appsId`.
         *     servicesId: 'placeholder-value',
         *     // Part of `name`. See documentation of `appsId`.
         *     versionsId: 'placeholder-value',
         *     // Controls the set of fields returned in the Get response.
         *     view: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "apiConfig": {},
         *   //   "automaticScaling": {},
         *   //   "basicScaling": {},
         *   //   "betaSettings": {},
         *   //   "createTime": "my_createTime",
         *   //   "createdBy": "my_createdBy",
         *   //   "defaultExpiration": "my_defaultExpiration",
         *   //   "deployment": {},
         *   //   "diskUsageBytes": "my_diskUsageBytes",
         *   //   "endpointsApiService": {},
         *   //   "entrypoint": {},
         *   //   "env": "my_env",
         *   //   "envVariables": {},
         *   //   "errorHandlers": [],
         *   //   "handlers": [],
         *   //   "healthCheck": {},
         *   //   "id": "my_id",
         *   //   "inboundServices": [],
         *   //   "instanceClass": "my_instanceClass",
         *   //   "libraries": [],
         *   //   "livenessCheck": {},
         *   //   "manualScaling": {},
         *   //   "name": "my_name",
         *   //   "network": {},
         *   //   "nobuildFilesRegex": "my_nobuildFilesRegex",
         *   //   "readinessCheck": {},
         *   //   "resources": {},
         *   //   "runtime": "my_runtime",
         *   //   "runtimeApiVersion": "my_runtimeApiVersion",
         *   //   "runtimeChannel": "my_runtimeChannel",
         *   //   "runtimeMainExecutablePath": "my_runtimeMainExecutablePath",
         *   //   "servingStatus": "my_servingStatus",
         *   //   "threadsafe": false,
         *   //   "versionUrl": "my_versionUrl",
         *   //   "vm": false,
         *   //   "vpcAccessConnector": {},
         *   //   "zones": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias appengine.apps.services.versions.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.appsId Part of `name`. Name of the resource requested. Example: apps/myapp/services/default/versions/v1.
         * @param {string} params.servicesId Part of `name`. See documentation of `appsId`.
         * @param {string} params.versionsId Part of `name`. See documentation of `appsId`.
         * @param {string=} params.view Controls the set of fields returned in the Get response.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Apps$Services$Versions$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Apps$Services$Versions$Get, options?: MethodOptions): GaxiosPromise<Schema$Version>;
        get(params: Params$Resource$Apps$Services$Versions$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Apps$Services$Versions$Get, options: MethodOptions | BodyResponseCallback<Schema$Version>, callback: BodyResponseCallback<Schema$Version>): void;
        get(params: Params$Resource$Apps$Services$Versions$Get, callback: BodyResponseCallback<Schema$Version>): void;
        get(callback: BodyResponseCallback<Schema$Version>): void;
        /**
         * appengine.apps.services.versions.list
         * @desc Lists the versions of a service.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/appengine.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const appengine = google.appengine('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/appengine.admin',
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await appengine.apps.services.versions.list({
         *     // Part of `parent`. Name of the parent Service resource. Example: apps/myapp/services/default.
         *     appsId: 'placeholder-value',
         *     // Maximum results to return per page.
         *     pageSize: 'placeholder-value',
         *     // Continuation token for fetching the next page of results.
         *     pageToken: 'placeholder-value',
         *     // Part of `parent`. See documentation of `appsId`.
         *     servicesId: 'placeholder-value',
         *     // Controls the set of fields returned in the List response.
         *     view: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "versions": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias appengine.apps.services.versions.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.appsId Part of `parent`. Name of the parent Service resource. Example: apps/myapp/services/default.
         * @param {integer=} params.pageSize Maximum results to return per page.
         * @param {string=} params.pageToken Continuation token for fetching the next page of results.
         * @param {string} params.servicesId Part of `parent`. See documentation of `appsId`.
         * @param {string=} params.view Controls the set of fields returned in the List response.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Apps$Services$Versions$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Apps$Services$Versions$List, options?: MethodOptions): GaxiosPromise<Schema$ListVersionsResponse>;
        list(params: Params$Resource$Apps$Services$Versions$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Apps$Services$Versions$List, options: MethodOptions | BodyResponseCallback<Schema$ListVersionsResponse>, callback: BodyResponseCallback<Schema$ListVersionsResponse>): void;
        list(params: Params$Resource$Apps$Services$Versions$List, callback: BodyResponseCallback<Schema$ListVersionsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListVersionsResponse>): void;
        /**
         * appengine.apps.services.versions.patch
         * @desc Updates the specified Version resource. You can specify the following fields depending on the App Engine environment and type of scaling that the version resource uses:Standard environment instance_class (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.instance_class)automatic scaling in the standard environment: automatic_scaling.min_idle_instances (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.automatic_scaling) automatic_scaling.max_idle_instances (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.automatic_scaling) automaticScaling.standard_scheduler_settings.max_instances (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#StandardSchedulerSettings) automaticScaling.standard_scheduler_settings.min_instances (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#StandardSchedulerSettings) automaticScaling.standard_scheduler_settings.target_cpu_utilization (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#StandardSchedulerSettings) automaticScaling.standard_scheduler_settings.target_throughput_utilization (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#StandardSchedulerSettings)basic scaling or manual scaling in the standard environment: serving_status (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.serving_status)Flexible environment serving_status (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.serving_status)automatic scaling in the flexible environment: automatic_scaling.min_total_instances (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.automatic_scaling) automatic_scaling.max_total_instances (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.automatic_scaling) automatic_scaling.cool_down_period_sec (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.automatic_scaling) automatic_scaling.cpu_utilization.target_utilization (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.automatic_scaling)
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/appengine.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const appengine = google.appengine('v1');
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
         *   const res = await appengine.apps.services.versions.patch({
         *     // Part of `name`. Name of the resource to update. Example: apps/myapp/services/default/versions/1.
         *     appsId: 'placeholder-value',
         *     // Part of `name`. See documentation of `appsId`.
         *     servicesId: 'placeholder-value',
         *     // Standard field mask for the set of fields to be updated.
         *     updateMask: 'placeholder-value',
         *     // Part of `name`. See documentation of `appsId`.
         *     versionsId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "apiConfig": {},
         *       //   "automaticScaling": {},
         *       //   "basicScaling": {},
         *       //   "betaSettings": {},
         *       //   "createTime": "my_createTime",
         *       //   "createdBy": "my_createdBy",
         *       //   "defaultExpiration": "my_defaultExpiration",
         *       //   "deployment": {},
         *       //   "diskUsageBytes": "my_diskUsageBytes",
         *       //   "endpointsApiService": {},
         *       //   "entrypoint": {},
         *       //   "env": "my_env",
         *       //   "envVariables": {},
         *       //   "errorHandlers": [],
         *       //   "handlers": [],
         *       //   "healthCheck": {},
         *       //   "id": "my_id",
         *       //   "inboundServices": [],
         *       //   "instanceClass": "my_instanceClass",
         *       //   "libraries": [],
         *       //   "livenessCheck": {},
         *       //   "manualScaling": {},
         *       //   "name": "my_name",
         *       //   "network": {},
         *       //   "nobuildFilesRegex": "my_nobuildFilesRegex",
         *       //   "readinessCheck": {},
         *       //   "resources": {},
         *       //   "runtime": "my_runtime",
         *       //   "runtimeApiVersion": "my_runtimeApiVersion",
         *       //   "runtimeChannel": "my_runtimeChannel",
         *       //   "runtimeMainExecutablePath": "my_runtimeMainExecutablePath",
         *       //   "servingStatus": "my_servingStatus",
         *       //   "threadsafe": false,
         *       //   "versionUrl": "my_versionUrl",
         *       //   "vm": false,
         *       //   "vpcAccessConnector": {},
         *       //   "zones": []
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
         * @alias appengine.apps.services.versions.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.appsId Part of `name`. Name of the resource to update. Example: apps/myapp/services/default/versions/1.
         * @param {string} params.servicesId Part of `name`. See documentation of `appsId`.
         * @param {string=} params.updateMask Standard field mask for the set of fields to be updated.
         * @param {string} params.versionsId Part of `name`. See documentation of `appsId`.
         * @param {().Version} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Apps$Services$Versions$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Apps$Services$Versions$Patch, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        patch(params: Params$Resource$Apps$Services$Versions$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Apps$Services$Versions$Patch, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        patch(params: Params$Resource$Apps$Services$Versions$Patch, callback: BodyResponseCallback<Schema$Operation>): void;
        patch(callback: BodyResponseCallback<Schema$Operation>): void;
    }
    export interface Params$Resource$Apps$Services$Versions$Create extends StandardParameters {
        /**
         * Part of `parent`. Name of the parent resource to create this version under. Example: apps/myapp/services/default.
         */
        appsId?: string;
        /**
         * Part of `parent`. See documentation of `appsId`.
         */
        servicesId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Version;
    }
    export interface Params$Resource$Apps$Services$Versions$Delete extends StandardParameters {
        /**
         * Part of `name`. Name of the resource requested. Example: apps/myapp/services/default/versions/v1.
         */
        appsId?: string;
        /**
         * Part of `name`. See documentation of `appsId`.
         */
        servicesId?: string;
        /**
         * Part of `name`. See documentation of `appsId`.
         */
        versionsId?: string;
    }
    export interface Params$Resource$Apps$Services$Versions$Get extends StandardParameters {
        /**
         * Part of `name`. Name of the resource requested. Example: apps/myapp/services/default/versions/v1.
         */
        appsId?: string;
        /**
         * Part of `name`. See documentation of `appsId`.
         */
        servicesId?: string;
        /**
         * Part of `name`. See documentation of `appsId`.
         */
        versionsId?: string;
        /**
         * Controls the set of fields returned in the Get response.
         */
        view?: string;
    }
    export interface Params$Resource$Apps$Services$Versions$List extends StandardParameters {
        /**
         * Part of `parent`. Name of the parent Service resource. Example: apps/myapp/services/default.
         */
        appsId?: string;
        /**
         * Maximum results to return per page.
         */
        pageSize?: number;
        /**
         * Continuation token for fetching the next page of results.
         */
        pageToken?: string;
        /**
         * Part of `parent`. See documentation of `appsId`.
         */
        servicesId?: string;
        /**
         * Controls the set of fields returned in the List response.
         */
        view?: string;
    }
    export interface Params$Resource$Apps$Services$Versions$Patch extends StandardParameters {
        /**
         * Part of `name`. Name of the resource to update. Example: apps/myapp/services/default/versions/1.
         */
        appsId?: string;
        /**
         * Part of `name`. See documentation of `appsId`.
         */
        servicesId?: string;
        /**
         * Standard field mask for the set of fields to be updated.
         */
        updateMask?: string;
        /**
         * Part of `name`. See documentation of `appsId`.
         */
        versionsId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Version;
    }
    export class Resource$Apps$Services$Versions$Instances {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * appengine.apps.services.versions.instances.debug
         * @desc Enables debugging on a VM instance. This allows you to use the SSH command to connect to the virtual machine where the instance lives. While in "debug mode", the instance continues to serve live traffic. You should delete the instance when you are done debugging and then allow the system to take over and determine if another instance should be started.Only applicable for instances in App Engine flexible environment.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/appengine.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const appengine = google.appengine('v1');
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
         *   const res = await appengine.apps.services.versions.instances.debug({
         *     // Part of `name`. Name of the resource requested. Example: apps/myapp/services/default/versions/v1/instances/instance-1.
         *     appsId: 'placeholder-value',
         *     // Part of `name`. See documentation of `appsId`.
         *     instancesId: 'placeholder-value',
         *     // Part of `name`. See documentation of `appsId`.
         *     servicesId: 'placeholder-value',
         *     // Part of `name`. See documentation of `appsId`.
         *     versionsId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "sshKey": "my_sshKey"
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
         * @alias appengine.apps.services.versions.instances.debug
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.appsId Part of `name`. Name of the resource requested. Example: apps/myapp/services/default/versions/v1/instances/instance-1.
         * @param {string} params.instancesId Part of `name`. See documentation of `appsId`.
         * @param {string} params.servicesId Part of `name`. See documentation of `appsId`.
         * @param {string} params.versionsId Part of `name`. See documentation of `appsId`.
         * @param {().DebugInstanceRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        debug(params: Params$Resource$Apps$Services$Versions$Instances$Debug, options: StreamMethodOptions): GaxiosPromise<Readable>;
        debug(params?: Params$Resource$Apps$Services$Versions$Instances$Debug, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        debug(params: Params$Resource$Apps$Services$Versions$Instances$Debug, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        debug(params: Params$Resource$Apps$Services$Versions$Instances$Debug, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        debug(params: Params$Resource$Apps$Services$Versions$Instances$Debug, callback: BodyResponseCallback<Schema$Operation>): void;
        debug(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * appengine.apps.services.versions.instances.delete
         * @desc Stops a running instance.The instance might be automatically recreated based on the scaling settings of the version. For more information, see "How Instances are Managed" (standard environment (https://cloud.google.com/appengine/docs/standard/python/how-instances-are-managed) | flexible environment (https://cloud.google.com/appengine/docs/flexible/python/how-instances-are-managed)).To ensure that instances are not re-created and avoid getting billed, you can stop all instances within the target version by changing the serving status of the version to STOPPED with the apps.services.versions.patch (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions/patch) method.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/appengine.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const appengine = google.appengine('v1');
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
         *   const res = await appengine.apps.services.versions.instances.delete({
         *     // Part of `name`. Name of the resource requested. Example: apps/myapp/services/default/versions/v1/instances/instance-1.
         *     appsId: 'placeholder-value',
         *     // Part of `name`. See documentation of `appsId`.
         *     instancesId: 'placeholder-value',
         *     // Part of `name`. See documentation of `appsId`.
         *     servicesId: 'placeholder-value',
         *     // Part of `name`. See documentation of `appsId`.
         *     versionsId: 'placeholder-value',
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
         * @alias appengine.apps.services.versions.instances.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.appsId Part of `name`. Name of the resource requested. Example: apps/myapp/services/default/versions/v1/instances/instance-1.
         * @param {string} params.instancesId Part of `name`. See documentation of `appsId`.
         * @param {string} params.servicesId Part of `name`. See documentation of `appsId`.
         * @param {string} params.versionsId Part of `name`. See documentation of `appsId`.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Apps$Services$Versions$Instances$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Apps$Services$Versions$Instances$Delete, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        delete(params: Params$Resource$Apps$Services$Versions$Instances$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Apps$Services$Versions$Instances$Delete, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        delete(params: Params$Resource$Apps$Services$Versions$Instances$Delete, callback: BodyResponseCallback<Schema$Operation>): void;
        delete(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * appengine.apps.services.versions.instances.get
         * @desc Gets instance information.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/appengine.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const appengine = google.appengine('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/appengine.admin',
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await appengine.apps.services.versions.instances.get({
         *     // Part of `name`. Name of the resource requested. Example: apps/myapp/services/default/versions/v1/instances/instance-1.
         *     appsId: 'placeholder-value',
         *     // Part of `name`. See documentation of `appsId`.
         *     instancesId: 'placeholder-value',
         *     // Part of `name`. See documentation of `appsId`.
         *     servicesId: 'placeholder-value',
         *     // Part of `name`. See documentation of `appsId`.
         *     versionsId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "appEngineRelease": "my_appEngineRelease",
         *   //   "availability": "my_availability",
         *   //   "averageLatency": 0,
         *   //   "errors": 0,
         *   //   "id": "my_id",
         *   //   "memoryUsage": "my_memoryUsage",
         *   //   "name": "my_name",
         *   //   "qps": {},
         *   //   "requests": 0,
         *   //   "startTime": "my_startTime",
         *   //   "vmDebugEnabled": false,
         *   //   "vmId": "my_vmId",
         *   //   "vmIp": "my_vmIp",
         *   //   "vmName": "my_vmName",
         *   //   "vmStatus": "my_vmStatus",
         *   //   "vmZoneName": "my_vmZoneName"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias appengine.apps.services.versions.instances.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.appsId Part of `name`. Name of the resource requested. Example: apps/myapp/services/default/versions/v1/instances/instance-1.
         * @param {string} params.instancesId Part of `name`. See documentation of `appsId`.
         * @param {string} params.servicesId Part of `name`. See documentation of `appsId`.
         * @param {string} params.versionsId Part of `name`. See documentation of `appsId`.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Apps$Services$Versions$Instances$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Apps$Services$Versions$Instances$Get, options?: MethodOptions): GaxiosPromise<Schema$Instance>;
        get(params: Params$Resource$Apps$Services$Versions$Instances$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Apps$Services$Versions$Instances$Get, options: MethodOptions | BodyResponseCallback<Schema$Instance>, callback: BodyResponseCallback<Schema$Instance>): void;
        get(params: Params$Resource$Apps$Services$Versions$Instances$Get, callback: BodyResponseCallback<Schema$Instance>): void;
        get(callback: BodyResponseCallback<Schema$Instance>): void;
        /**
         * appengine.apps.services.versions.instances.list
         * @desc Lists the instances of a version.Tip: To aggregate details about instances over time, see the Stackdriver Monitoring API (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.timeSeries/list).
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/appengine.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const appengine = google.appengine('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/appengine.admin',
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await appengine.apps.services.versions.instances.list({
         *     // Part of `parent`. Name of the parent Version resource. Example: apps/myapp/services/default/versions/v1.
         *     appsId: 'placeholder-value',
         *     // Maximum results to return per page.
         *     pageSize: 'placeholder-value',
         *     // Continuation token for fetching the next page of results.
         *     pageToken: 'placeholder-value',
         *     // Part of `parent`. See documentation of `appsId`.
         *     servicesId: 'placeholder-value',
         *     // Part of `parent`. See documentation of `appsId`.
         *     versionsId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "instances": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias appengine.apps.services.versions.instances.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.appsId Part of `parent`. Name of the parent Version resource. Example: apps/myapp/services/default/versions/v1.
         * @param {integer=} params.pageSize Maximum results to return per page.
         * @param {string=} params.pageToken Continuation token for fetching the next page of results.
         * @param {string} params.servicesId Part of `parent`. See documentation of `appsId`.
         * @param {string} params.versionsId Part of `parent`. See documentation of `appsId`.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Apps$Services$Versions$Instances$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Apps$Services$Versions$Instances$List, options?: MethodOptions): GaxiosPromise<Schema$ListInstancesResponse>;
        list(params: Params$Resource$Apps$Services$Versions$Instances$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Apps$Services$Versions$Instances$List, options: MethodOptions | BodyResponseCallback<Schema$ListInstancesResponse>, callback: BodyResponseCallback<Schema$ListInstancesResponse>): void;
        list(params: Params$Resource$Apps$Services$Versions$Instances$List, callback: BodyResponseCallback<Schema$ListInstancesResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListInstancesResponse>): void;
    }
    export interface Params$Resource$Apps$Services$Versions$Instances$Debug extends StandardParameters {
        /**
         * Part of `name`. Name of the resource requested. Example: apps/myapp/services/default/versions/v1/instances/instance-1.
         */
        appsId?: string;
        /**
         * Part of `name`. See documentation of `appsId`.
         */
        instancesId?: string;
        /**
         * Part of `name`. See documentation of `appsId`.
         */
        servicesId?: string;
        /**
         * Part of `name`. See documentation of `appsId`.
         */
        versionsId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$DebugInstanceRequest;
    }
    export interface Params$Resource$Apps$Services$Versions$Instances$Delete extends StandardParameters {
        /**
         * Part of `name`. Name of the resource requested. Example: apps/myapp/services/default/versions/v1/instances/instance-1.
         */
        appsId?: string;
        /**
         * Part of `name`. See documentation of `appsId`.
         */
        instancesId?: string;
        /**
         * Part of `name`. See documentation of `appsId`.
         */
        servicesId?: string;
        /**
         * Part of `name`. See documentation of `appsId`.
         */
        versionsId?: string;
    }
    export interface Params$Resource$Apps$Services$Versions$Instances$Get extends StandardParameters {
        /**
         * Part of `name`. Name of the resource requested. Example: apps/myapp/services/default/versions/v1/instances/instance-1.
         */
        appsId?: string;
        /**
         * Part of `name`. See documentation of `appsId`.
         */
        instancesId?: string;
        /**
         * Part of `name`. See documentation of `appsId`.
         */
        servicesId?: string;
        /**
         * Part of `name`. See documentation of `appsId`.
         */
        versionsId?: string;
    }
    export interface Params$Resource$Apps$Services$Versions$Instances$List extends StandardParameters {
        /**
         * Part of `parent`. Name of the parent Version resource. Example: apps/myapp/services/default/versions/v1.
         */
        appsId?: string;
        /**
         * Maximum results to return per page.
         */
        pageSize?: number;
        /**
         * Continuation token for fetching the next page of results.
         */
        pageToken?: string;
        /**
         * Part of `parent`. See documentation of `appsId`.
         */
        servicesId?: string;
        /**
         * Part of `parent`. See documentation of `appsId`.
         */
        versionsId?: string;
    }
    export {};
}
