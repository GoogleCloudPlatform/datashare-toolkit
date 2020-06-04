/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace dataproc_v1 {
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
     * Cloud Dataproc API
     *
     * Manages Hadoop-based clusters and jobs on Google Cloud Platform.
     *
     * @example
     * const {google} = require('googleapis');
     * const dataproc = google.dataproc('v1');
     *
     * @namespace dataproc
     * @type {Function}
     * @version v1
     * @variation v1
     * @param {object=} options Options for Dataproc
     */
    export class Dataproc {
        context: APIRequestContext;
        projects: Resource$Projects;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    /**
     * Specifies the type and number of accelerator cards attached to the instances of an instance. See GPUs on Compute Engine (https://cloud.google.com/compute/docs/gpus/).
     */
    export interface Schema$AcceleratorConfig {
        /**
         * The number of the accelerator cards of this type exposed to this instance.
         */
        acceleratorCount?: number | null;
        /**
         * Full URL, partial URI, or short name of the accelerator type resource to expose to this instance. See Compute Engine AcceleratorTypes (https://cloud.google.com/compute/docs/reference/beta/acceleratorTypes).Examples: https://www.googleapis.com/compute/beta/projects/[project_id]/zones/us-east1-a/acceleratorTypes/nvidia-tesla-k80 projects/[project_id]/zones/us-east1-a/acceleratorTypes/nvidia-tesla-k80 nvidia-tesla-k80Auto Zone Exception: If you are using the Dataproc Auto Zone Placement (https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/auto-zone#using_auto_zone_placement) feature, you must use the short name of the accelerator type resource, for example, nvidia-tesla-k80.
         */
        acceleratorTypeUri?: string | null;
    }
    /**
     * Autoscaling Policy config associated with the cluster.
     */
    export interface Schema$AutoscalingConfig {
        /**
         * Optional. The autoscaling policy used by the cluster.Only resource names including projectid and location (region) are valid. Examples: https://www.googleapis.com/compute/v1/projects/[project_id]/locations/[dataproc_region]/autoscalingPolicies/[policy_id] projects/[project_id]/locations/[dataproc_region]/autoscalingPolicies/[policy_id]Note that the policy must be in the same project and Dataproc region.
         */
        policyUri?: string | null;
    }
    /**
     * Describes an autoscaling policy for Dataproc cluster autoscaler.
     */
    export interface Schema$AutoscalingPolicy {
        basicAlgorithm?: Schema$BasicAutoscalingAlgorithm;
        /**
         * Required. The policy id.The id must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). Cannot begin or end with underscore or hyphen. Must consist of between 3 and 50 characters.
         */
        id?: string | null;
        /**
         * Output only. The &quot;resource name&quot; of the autoscaling policy, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies, the resource name of the  policy has the following format:  projects/{project_id}/regions/{region}/autoscalingPolicies/{policy_id} For projects.locations.autoscalingPolicies, the resource name of the  policy has the following format:  projects/{project_id}/locations/{location}/autoscalingPolicies/{policy_id}
         */
        name?: string | null;
        /**
         * Optional. Describes how the autoscaler will operate for secondary workers.
         */
        secondaryWorkerConfig?: Schema$InstanceGroupAutoscalingPolicyConfig;
        /**
         * Required. Describes how the autoscaler will operate for primary workers.
         */
        workerConfig?: Schema$InstanceGroupAutoscalingPolicyConfig;
    }
    /**
     * Basic algorithm for autoscaling.
     */
    export interface Schema$BasicAutoscalingAlgorithm {
        /**
         * Optional. Duration between scaling events. A scaling period starts after the update operation from the previous event has completed.Bounds: 2m, 1d. Default: 2m.
         */
        cooldownPeriod?: string | null;
        /**
         * Required. YARN autoscaling configuration.
         */
        yarnConfig?: Schema$BasicYarnAutoscalingConfig;
    }
    /**
     * Basic autoscaling configurations for YARN.
     */
    export interface Schema$BasicYarnAutoscalingConfig {
        /**
         * Required. Timeout for YARN graceful decommissioning of Node Managers. Specifies the duration to wait for jobs to complete before forcefully removing workers (and potentially interrupting jobs). Only applicable to downscaling operations.Bounds: 0s, 1d.
         */
        gracefulDecommissionTimeout?: string | null;
        /**
         * Required. Fraction of average pending memory in the last cooldown period for which to remove workers. A scale-down factor of 1 will result in scaling down so that there is no available memory remaining after the update (more aggressive scaling). A scale-down factor of 0 disables removing workers, which can be beneficial for autoscaling a single job.Bounds: 0.0, 1.0.
         */
        scaleDownFactor?: number | null;
        /**
         * Optional. Minimum scale-down threshold as a fraction of total cluster size before scaling occurs. For example, in a 20-worker cluster, a threshold of 0.1 means the autoscaler must recommend at least a 2 worker scale-down for the cluster to scale. A threshold of 0 means the autoscaler will scale down on any recommended change.Bounds: 0.0, 1.0. Default: 0.0.
         */
        scaleDownMinWorkerFraction?: number | null;
        /**
         * Required. Fraction of average pending memory in the last cooldown period for which to add workers. A scale-up factor of 1.0 will result in scaling up so that there is no pending memory remaining after the update (more aggressive scaling). A scale-up factor closer to 0 will result in a smaller magnitude of scaling up (less aggressive scaling).Bounds: 0.0, 1.0.
         */
        scaleUpFactor?: number | null;
        /**
         * Optional. Minimum scale-up threshold as a fraction of total cluster size before scaling occurs. For example, in a 20-worker cluster, a threshold of 0.1 means the autoscaler must recommend at least a 2-worker scale-up for the cluster to scale. A threshold of 0 means the autoscaler will scale up on any recommended change.Bounds: 0.0, 1.0. Default: 0.0.
         */
        scaleUpMinWorkerFraction?: number | null;
    }
    /**
     * Associates members with a role.
     */
    export interface Schema$Binding {
        /**
         * The condition that is associated with this binding.If the condition evaluates to true, then this binding applies to the current request.If the condition evaluates to false, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the members in this binding.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies).
         */
        condition?: Schema$Expr;
        /**
         * Specifies the identities requesting access for a Cloud Platform resource. members can have the following values: allUsers: A special identifier that represents anyone who is  on the internet; with or without a Google account. allAuthenticatedUsers: A special identifier that represents anyone  who is authenticated with a Google account or a service account. user:{emailid}: An email address that represents a specific Google  account. For example, alice@example.com . serviceAccount:{emailid}: An email address that represents a service  account. For example, my-other-app@appspot.gserviceaccount.com. group:{emailid}: An email address that represents a Google group.  For example, admins@example.com. deleted:user:{emailid}?uid={uniqueid}: An email address (plus unique  identifier) representing a user that has been recently deleted. For  example, alice@example.com?uid=123456789012345678901. If the user is  recovered, this value reverts to user:{emailid} and the recovered user  retains the role in the binding. deleted:serviceAccount:{emailid}?uid={uniqueid}: An email address (plus  unique identifier) representing a service account that has been recently  deleted. For example,  my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901.  If the service account is undeleted, this value reverts to  serviceAccount:{emailid} and the undeleted service account retains the  role in the binding. deleted:group:{emailid}?uid={uniqueid}: An email address (plus unique  identifier) representing a Google group that has been recently  deleted. For example, admins@example.com?uid=123456789012345678901. If  the group is recovered, this value reverts to group:{emailid} and the  recovered group retains the role in the binding. domain:{domain}: The G Suite domain (primary) that represents all the  users of that domain. For example, google.com or example.com.
         */
        members?: string[] | null;
        /**
         * Role that is assigned to members. For example, roles/viewer, roles/editor, or roles/owner.
         */
        role?: string | null;
    }
    /**
     * A request to cancel a job.
     */
    export interface Schema$CancelJobRequest {
    }
    /**
     * Describes the identifying information, config, and status of a cluster of Compute Engine instances.
     */
    export interface Schema$Cluster {
        /**
         * Required. The cluster name. Cluster names within a project must be unique. Names of deleted clusters can be reused.
         */
        clusterName?: string | null;
        /**
         * Output only. A cluster UUID (Unique Universal Identifier). Dataproc generates this value when it creates the cluster.
         */
        clusterUuid?: string | null;
        /**
         * Required. The cluster config. Note that Dataproc may set default values, and values may change when clusters are updated.
         */
        config?: Schema$ClusterConfig;
        /**
         * Optional. The labels to associate with this cluster. Label keys must contain 1 to 63 characters, and must conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt). Label values may be empty, but, if present, must contain 1 to 63 characters, and must conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt). No more than 32 labels can be associated with a cluster.
         */
        labels?: {
            [key: string]: string;
        } | null;
        /**
         * Output only. Contains cluster daemon metrics such as HDFS and YARN stats.Beta Feature: This report is available for testing purposes only. It may be changed before final release.
         */
        metrics?: Schema$ClusterMetrics;
        /**
         * Required. The Google Cloud Platform project ID that the cluster belongs to.
         */
        projectId?: string | null;
        /**
         * Output only. Cluster status.
         */
        status?: Schema$ClusterStatus;
        /**
         * Output only. The previous cluster status.
         */
        statusHistory?: Schema$ClusterStatus[];
    }
    /**
     * The cluster config.
     */
    export interface Schema$ClusterConfig {
        /**
         * Optional. Autoscaling config for the policy associated with the cluster. Cluster does not autoscale if this field is unset.
         */
        autoscalingConfig?: Schema$AutoscalingConfig;
        /**
         * Optional. A Cloud Storage bucket used to stage job dependencies, config files, and job driver console output. If you do not specify a staging bucket, Cloud Dataproc will determine a Cloud Storage location (US, ASIA, or EU) for your cluster&#39;s staging bucket according to the Compute Engine zone where your cluster is deployed, and then create and manage this project-level, per-location bucket (see Dataproc staging bucket (https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/staging-bucket)).
         */
        configBucket?: string | null;
        /**
         * Optional. Encryption settings for the cluster.
         */
        encryptionConfig?: Schema$EncryptionConfig;
        /**
         * Optional. The shared Compute Engine config settings for all instances in a cluster.
         */
        gceClusterConfig?: Schema$GceClusterConfig;
        /**
         * Optional. Commands to execute on each node after config is completed. By default, executables are run on master and all worker nodes. You can test a node&#39;s role metadata to run an executable on a master or worker node, as shown below using curl (you can also use wget): ROLE=$(curl -H Metadata-Flavor:Google http://metadata/computeMetadata/v1/instance/attributes/dataproc-role) if [[ &quot;${ROLE}&quot; == &#39;Master&#39; ]]; then   ... master specific actions ... else   ... worker specific actions ... fi
         */
        initializationActions?: Schema$NodeInitializationAction[];
        /**
         * Optional. Lifecycle setting for the cluster.
         */
        lifecycleConfig?: Schema$LifecycleConfig;
        /**
         * Optional. The Compute Engine config settings for the master instance in a cluster.
         */
        masterConfig?: Schema$InstanceGroupConfig;
        /**
         * Optional. The Compute Engine config settings for additional worker instances in a cluster.
         */
        secondaryWorkerConfig?: Schema$InstanceGroupConfig;
        /**
         * Optional. Security settings for the cluster.
         */
        securityConfig?: Schema$SecurityConfig;
        /**
         * Optional. The config settings for software inside the cluster.
         */
        softwareConfig?: Schema$SoftwareConfig;
        /**
         * Optional. The Compute Engine config settings for worker instances in a cluster.
         */
        workerConfig?: Schema$InstanceGroupConfig;
    }
    /**
     * Contains cluster daemon metrics, such as HDFS and YARN stats.Beta Feature: This report is available for testing purposes only. It may be changed before final release.
     */
    export interface Schema$ClusterMetrics {
        /**
         * The HDFS metrics.
         */
        hdfsMetrics?: {
            [key: string]: string;
        } | null;
        /**
         * The YARN metrics.
         */
        yarnMetrics?: {
            [key: string]: string;
        } | null;
    }
    /**
     * The cluster operation triggered by a workflow.
     */
    export interface Schema$ClusterOperation {
        /**
         * Output only. Indicates the operation is done.
         */
        done?: boolean | null;
        /**
         * Output only. Error, if operation failed.
         */
        error?: string | null;
        /**
         * Output only. The id of the cluster operation.
         */
        operationId?: string | null;
    }
    /**
     * Metadata describing the operation.
     */
    export interface Schema$ClusterOperationMetadata {
        /**
         * Output only. Name of the cluster for the operation.
         */
        clusterName?: string | null;
        /**
         * Output only. Cluster UUID for the operation.
         */
        clusterUuid?: string | null;
        /**
         * Output only. Short description of operation.
         */
        description?: string | null;
        /**
         * Output only. Labels associated with the operation
         */
        labels?: {
            [key: string]: string;
        } | null;
        /**
         * Output only. The operation type.
         */
        operationType?: string | null;
        /**
         * Output only. Current operation status.
         */
        status?: Schema$ClusterOperationStatus;
        /**
         * Output only. The previous operation status.
         */
        statusHistory?: Schema$ClusterOperationStatus[];
        /**
         * Output only. Errors encountered during operation execution.
         */
        warnings?: string[] | null;
    }
    /**
     * The status of the operation.
     */
    export interface Schema$ClusterOperationStatus {
        /**
         * Output only. A message containing any operation metadata details.
         */
        details?: string | null;
        /**
         * Output only. A message containing the detailed operation state.
         */
        innerState?: string | null;
        /**
         * Output only. A message containing the operation state.
         */
        state?: string | null;
        /**
         * Output only. The time this state was entered.
         */
        stateStartTime?: string | null;
    }
    /**
     * A selector that chooses target cluster for jobs based on metadata.
     */
    export interface Schema$ClusterSelector {
        /**
         * Required. The cluster labels. Cluster must have all labels to match.
         */
        clusterLabels?: {
            [key: string]: string;
        } | null;
        /**
         * Optional. The zone where workflow process executes. This parameter does not affect the selection of the cluster.If unspecified, the zone of the first cluster matching the selector is used.
         */
        zone?: string | null;
    }
    /**
     * The status of a cluster and its instances.
     */
    export interface Schema$ClusterStatus {
        /**
         * Optional. Output only. Details of cluster&#39;s state.
         */
        detail?: string | null;
        /**
         * Output only. The cluster&#39;s state.
         */
        state?: string | null;
        /**
         * Output only. Time when this state was entered (see JSON representation of Timestamp (https://developers.google.com/protocol-buffers/docs/proto3#json)).
         */
        stateStartTime?: string | null;
        /**
         * Output only. Additional state information that includes status reported by the agent.
         */
        substate?: string | null;
    }
    /**
     * A request to collect cluster diagnostic information.
     */
    export interface Schema$DiagnoseClusterRequest {
    }
    /**
     * The location of diagnostic output.
     */
    export interface Schema$DiagnoseClusterResults {
        /**
         * Output only. The Cloud Storage URI of the diagnostic output. The output report is a plain text file with a summary of collected diagnostics.
         */
        outputUri?: string | null;
    }
    /**
     * Specifies the config of disk options for a group of VM instances.
     */
    export interface Schema$DiskConfig {
        /**
         * Optional. Size in GB of the boot disk (default is 500GB).
         */
        bootDiskSizeGb?: number | null;
        /**
         * Optional. Type of the boot disk (default is &quot;pd-standard&quot;). Valid values: &quot;pd-ssd&quot; (Persistent Disk Solid State Drive) or &quot;pd-standard&quot; (Persistent Disk Hard Disk Drive).
         */
        bootDiskType?: string | null;
        /**
         * Optional. Number of attached SSDs, from 0 to 4 (default is 0). If SSDs are not attached, the boot disk is used to store runtime logs and HDFS (https://hadoop.apache.org/docs/r1.2.1/hdfs_user_guide.html) data. If one or more SSDs are attached, this runtime bulk data is spread across them, and the boot disk contains only basic config and installed binaries.
         */
        numLocalSsds?: number | null;
    }
    /**
     * A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo {   rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); } The JSON representation for Empty is empty JSON object {}.
     */
    export interface Schema$Empty {
    }
    /**
     * Encryption settings for the cluster.
     */
    export interface Schema$EncryptionConfig {
        /**
         * Optional. The Cloud KMS key name to use for PD disk encryption for all instances in the cluster.
         */
        gcePdKmsKeyName?: string | null;
    }
    /**
     * Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec.Example (Comparison): title: &quot;Summary size limit&quot; description: &quot;Determines if a summary is less than 100 chars&quot; expression: &quot;document.summary.size() &lt; 100&quot; Example (Equality): title: &quot;Requestor is owner&quot; description: &quot;Determines if requestor is the document owner&quot; expression: &quot;document.owner == request.auth.claims.email&quot; Example (Logic): title: &quot;Public documents&quot; description: &quot;Determine whether the document should be publicly visible&quot; expression: &quot;document.type != &#39;private&#39; &amp;&amp; document.type != &#39;internal&#39;&quot; Example (Data Manipulation): title: &quot;Notification string&quot; description: &quot;Create a notification string with a timestamp.&quot; expression: &quot;&#39;New message received at &#39; + string(document.create_time)&quot; The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
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
     * Common config settings for resources of Compute Engine cluster instances, applicable to all instances in the cluster.
     */
    export interface Schema$GceClusterConfig {
        /**
         * Optional. If true, all instances in the cluster will only have internal IP addresses. By default, clusters are not restricted to internal IP addresses, and will have ephemeral external IP addresses assigned to each instance. This internal_ip_only restriction can only be enabled for subnetwork enabled networks, and all off-cluster dependencies must be configured to be accessible without external IP addresses.
         */
        internalIpOnly?: boolean | null;
        /**
         * The Compute Engine metadata entries to add to all instances (see Project and instance metadata (https://cloud.google.com/compute/docs/storing-retrieving-metadata#project_and_instance_metadata)).
         */
        metadata?: {
            [key: string]: string;
        } | null;
        /**
         * Optional. The Compute Engine network to be used for machine communications. Cannot be specified with subnetwork_uri. If neither network_uri nor subnetwork_uri is specified, the &quot;default&quot; network of the project is used, if it exists. Cannot be a &quot;Custom Subnet Network&quot; (see Using Subnetworks (https://cloud.google.com/compute/docs/subnetworks) for more information).A full URL, partial URI, or short name are valid. Examples: https://www.googleapis.com/compute/v1/projects/[project_id]/regions/global/default projects/[project_id]/regions/global/default default
         */
        networkUri?: string | null;
        /**
         * Optional. Reservation Affinity for consuming Zonal reservation.
         */
        reservationAffinity?: Schema$ReservationAffinity;
        /**
         * Optional. The Dataproc service account (https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/service-accounts#service_accounts_in_cloud_dataproc) (also see VM Data Plane identity (https://cloud.google.com/dataproc/docs/concepts/iam/dataproc-principals#vm_service_account_data_plane_identity)) used by Dataproc cluster VM instances to access Google Cloud Platform services.If not specified, the Compute Engine default service account (https://cloud.google.com/compute/docs/access/service-accounts#default_service_account) is used.
         */
        serviceAccount?: string | null;
        /**
         * Optional. The URIs of service account scopes to be included in Compute Engine instances. The following base set of scopes is always included: https://www.googleapis.com/auth/cloud.useraccounts.readonly https://www.googleapis.com/auth/devstorage.read_write https://www.googleapis.com/auth/logging.writeIf no scopes are specified, the following defaults are also provided: https://www.googleapis.com/auth/bigquery https://www.googleapis.com/auth/bigtable.admin.table https://www.googleapis.com/auth/bigtable.data https://www.googleapis.com/auth/devstorage.full_control
         */
        serviceAccountScopes?: string[] | null;
        /**
         * Optional. The Compute Engine subnetwork to be used for machine communications. Cannot be specified with network_uri.A full URL, partial URI, or short name are valid. Examples: https://www.googleapis.com/compute/v1/projects/[project_id]/regions/us-east1/subnetworks/sub0 projects/[project_id]/regions/us-east1/subnetworks/sub0 sub0
         */
        subnetworkUri?: string | null;
        /**
         * The Compute Engine tags to add to all instances (see Tagging instances (https://cloud.google.com/compute/docs/label-or-tag-resources#tags)).
         */
        tags?: string[] | null;
        /**
         * Optional. The zone where the Compute Engine cluster will be located. On a create request, it is required in the &quot;global&quot; region. If omitted in a non-global Dataproc region, the service will pick a zone in the corresponding Compute Engine region. On a get request, zone will always be present.A full URL, partial URI, or short name are valid. Examples: https://www.googleapis.com/compute/v1/projects/[project_id]/zones/[zone] projects/[project_id]/zones/[zone] us-central1-f
         */
        zoneUri?: string | null;
    }
    /**
     * Request message for GetIamPolicy method.
     */
    export interface Schema$GetIamPolicyRequest {
        /**
         * OPTIONAL: A GetPolicyOptions object for specifying options to GetIamPolicy.
         */
        options?: Schema$GetPolicyOptions;
    }
    /**
     * Encapsulates settings provided to GetIamPolicy.
     */
    export interface Schema$GetPolicyOptions {
        /**
         * Optional. The policy format version to be returned.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional bindings must specify version 3. Policies without any conditional bindings may specify any valid value or leave the field unset.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies).
         */
        requestedPolicyVersion?: number | null;
    }
    /**
     * A Dataproc job for running Apache Hadoop MapReduce (https://hadoop.apache.org/docs/current/hadoop-mapreduce-client/hadoop-mapreduce-client-core/MapReduceTutorial.html) jobs on Apache Hadoop YARN (https://hadoop.apache.org/docs/r2.7.1/hadoop-yarn/hadoop-yarn-site/YARN.html).
     */
    export interface Schema$HadoopJob {
        /**
         * Optional. HCFS URIs of archives to be extracted in the working directory of Hadoop drivers and tasks. Supported file types: .jar, .tar, .tar.gz, .tgz, or .zip.
         */
        archiveUris?: string[] | null;
        /**
         * Optional. The arguments to pass to the driver. Do not include arguments, such as -libjars or -Dfoo=bar, that can be set as job properties, since a collision may occur that causes an incorrect job submission.
         */
        args?: string[] | null;
        /**
         * Optional. HCFS (Hadoop Compatible Filesystem) URIs of files to be copied to the working directory of Hadoop drivers and distributed tasks. Useful for naively parallel tasks.
         */
        fileUris?: string[] | null;
        /**
         * Optional. Jar file URIs to add to the CLASSPATHs of the Hadoop driver and tasks.
         */
        jarFileUris?: string[] | null;
        /**
         * Optional. The runtime log config for job execution.
         */
        loggingConfig?: Schema$LoggingConfig;
        /**
         * The name of the driver&#39;s main class. The jar file containing the class must be in the default CLASSPATH or specified in jar_file_uris.
         */
        mainClass?: string | null;
        /**
         * The HCFS URI of the jar file containing the main class. Examples:  &#39;gs://foo-bucket/analytics-binaries/extract-useful-metrics-mr.jar&#39;  &#39;hdfs:/tmp/test-samples/custom-wordcount.jar&#39;  &#39;file:///home/usr/lib/hadoop-mapreduce/hadoop-mapreduce-examples.jar&#39;
         */
        mainJarFileUri?: string | null;
        /**
         * Optional. A mapping of property names to values, used to configure Hadoop. Properties that conflict with values set by the Dataproc API may be overwritten. Can include properties set in /etc/hadoop/conf/*-site and classes in user code.
         */
        properties?: {
            [key: string]: string;
        } | null;
    }
    /**
     * A Dataproc job for running Apache Hive (https://hive.apache.org/) queries on YARN.
     */
    export interface Schema$HiveJob {
        /**
         * Optional. Whether to continue executing queries if a query fails. The default value is false. Setting to true can be useful when executing independent parallel queries.
         */
        continueOnFailure?: boolean | null;
        /**
         * Optional. HCFS URIs of jar files to add to the CLASSPATH of the Hive server and Hadoop MapReduce (MR) tasks. Can contain Hive SerDes and UDFs.
         */
        jarFileUris?: string[] | null;
        /**
         * Optional. A mapping of property names and values, used to configure Hive. Properties that conflict with values set by the Dataproc API may be overwritten. Can include properties set in /etc/hadoop/conf/*-site.xml, /etc/hive/conf/hive-site.xml, and classes in user code.
         */
        properties?: {
            [key: string]: string;
        } | null;
        /**
         * The HCFS URI of the script that contains Hive queries.
         */
        queryFileUri?: string | null;
        /**
         * A list of queries.
         */
        queryList?: Schema$QueryList;
        /**
         * Optional. Mapping of query variable names to values (equivalent to the Hive command: SET name=&quot;value&quot;;).
         */
        scriptVariables?: {
            [key: string]: string;
        } | null;
    }
    /**
     * Configuration for the size bounds of an instance group, including its proportional size to other groups.
     */
    export interface Schema$InstanceGroupAutoscalingPolicyConfig {
        /**
         * Required. Maximum number of instances for this group. Required for primary workers. Note that by default, clusters will not use secondary workers. Required for secondary workers if the minimum secondary instances is set.Primary workers - Bounds: [min_instances, ). Secondary workers - Bounds: [min_instances, ). Default: 0.
         */
        maxInstances?: number | null;
        /**
         * Optional. Minimum number of instances for this group.Primary workers - Bounds: 2, max_instances. Default: 2. Secondary workers - Bounds: 0, max_instances. Default: 0.
         */
        minInstances?: number | null;
        /**
         * Optional. Weight for the instance group, which is used to determine the fraction of total workers in the cluster from this instance group. For example, if primary workers have weight 2, and secondary workers have weight 1, the cluster will have approximately 2 primary workers for each secondary worker.The cluster may not reach the specified balance if constrained by min/max bounds or other autoscaling settings. For example, if max_instances for secondary workers is 0, then only primary workers will be added. The cluster can also be out of balance when created.If weight is not set on any instance group, the cluster will default to equal weight for all groups: the cluster will attempt to maintain an equal number of workers in each group within the configured size bounds for each group. If weight is set for one group only, the cluster will default to zero weight on the unset group. For example if weight is set only on primary workers, the cluster will use primary workers only and no secondary workers.
         */
        weight?: number | null;
    }
    /**
     * The config settings for Compute Engine resources in an instance group, such as a master or worker group.
     */
    export interface Schema$InstanceGroupConfig {
        /**
         * Optional. The Compute Engine accelerator configuration for these instances.
         */
        accelerators?: Schema$AcceleratorConfig[];
        /**
         * Optional. Disk option config settings.
         */
        diskConfig?: Schema$DiskConfig;
        /**
         * Optional. The Compute Engine image resource used for cluster instances.The URI can represent an image or image family.Image examples: https://www.googleapis.com/compute/beta/projects/[project_id]/global/images/[image-id] projects/[project_id]/global/images/[image-id] image-idImage family examples. Dataproc will use the most recent image from the family: https://www.googleapis.com/compute/beta/projects/[project_id]/global/images/family/[custom-image-family-name] projects/[project_id]/global/images/family/[custom-image-family-name]If the URI is unspecified, it will be inferred from SoftwareConfig.image_version or the system default.
         */
        imageUri?: string | null;
        /**
         * Output only. The list of instance names. Dataproc derives the names from cluster_name, num_instances, and the instance group.
         */
        instanceNames?: string[] | null;
        /**
         * Output only. Specifies that this instance group contains preemptible instances.
         */
        isPreemptible?: boolean | null;
        /**
         * Optional. The Compute Engine machine type used for cluster instances.A full URL, partial URI, or short name are valid. Examples: https://www.googleapis.com/compute/v1/projects/[project_id]/zones/us-east1-a/machineTypes/n1-standard-2 projects/[project_id]/zones/us-east1-a/machineTypes/n1-standard-2 n1-standard-2Auto Zone Exception: If you are using the Dataproc Auto Zone Placement (https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/auto-zone#using_auto_zone_placement) feature, you must use the short name of the machine type resource, for example, n1-standard-2.
         */
        machineTypeUri?: string | null;
        /**
         * Output only. The config for Compute Engine Instance Group Manager that manages this group. This is only used for preemptible instance groups.
         */
        managedGroupConfig?: Schema$ManagedGroupConfig;
        /**
         * Optional. Specifies the minimum cpu platform for the Instance Group. See Dataproc -&amp;gt; Minimum CPU Platform (https://cloud.google.com/dataproc/docs/concepts/compute/dataproc-min-cpu).
         */
        minCpuPlatform?: string | null;
        /**
         * Optional. The number of VM instances in the instance group. For master instance groups, must be set to 1.
         */
        numInstances?: number | null;
        /**
         * Optional. Specifies the preemptibility of the instance group.The default value for master and worker groups is NON_PREEMPTIBLE. This default cannot be changed.The default value for secondary instances is PREEMPTIBLE.
         */
        preemptibility?: string | null;
    }
    /**
     * A request to instantiate a workflow template.
     */
    export interface Schema$InstantiateWorkflowTemplateRequest {
        /**
         * Optional. Map from parameter names to values that should be used for those parameters. Values may not exceed 100 characters.
         */
        parameters?: {
            [key: string]: string;
        } | null;
        /**
         * Optional. A tag that prevents multiple concurrent workflow instances with the same tag from running. This mitigates risk of concurrent instances started due to retries.It is recommended to always set this value to a UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier).The tag must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters.
         */
        requestId?: string | null;
        /**
         * Optional. The version of workflow template to instantiate. If specified, the workflow will be instantiated only if the current version of the workflow template has the supplied version.This option cannot be used to instantiate a previous version of workflow template.
         */
        version?: number | null;
    }
    /**
     * A Dataproc job resource.
     */
    export interface Schema$Job {
        /**
         * Output only. Indicates whether the job is completed. If the value is false, the job is still in progress. If true, the job is completed, and status.state field will indicate if it was successful, failed, or cancelled.
         */
        done?: boolean | null;
        /**
         * Output only. If present, the location of miscellaneous control files which may be used as part of job setup and handling. If not present, control files may be placed in the same location as driver_output_uri.
         */
        driverControlFilesUri?: string | null;
        /**
         * Output only. A URI pointing to the location of the stdout of the job&#39;s driver program.
         */
        driverOutputResourceUri?: string | null;
        /**
         * Optional. Job is a Hadoop job.
         */
        hadoopJob?: Schema$HadoopJob;
        /**
         * Optional. Job is a Hive job.
         */
        hiveJob?: Schema$HiveJob;
        /**
         * Output only. A UUID that uniquely identifies a job within the project over time. This is in contrast to a user-settable reference.job_id that may be reused over time.
         */
        jobUuid?: string | null;
        /**
         * Optional. The labels to associate with this job. Label keys must contain 1 to 63 characters, and must conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt). Label values may be empty, but, if present, must contain 1 to 63 characters, and must conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt). No more than 32 labels can be associated with a job.
         */
        labels?: {
            [key: string]: string;
        } | null;
        /**
         * Optional. Job is a Pig job.
         */
        pigJob?: Schema$PigJob;
        /**
         * Required. Job information, including how, when, and where to run the job.
         */
        placement?: Schema$JobPlacement;
        /**
         * Optional. Job is a Presto job.
         */
        prestoJob?: Schema$PrestoJob;
        /**
         * Optional. Job is a PySpark job.
         */
        pysparkJob?: Schema$PySparkJob;
        /**
         * Optional. The fully qualified reference to the job, which can be used to obtain the equivalent REST path of the job resource. If this property is not specified when a job is created, the server generates a &lt;code&gt;job_id&lt;/code&gt;.
         */
        reference?: Schema$JobReference;
        /**
         * Optional. Job scheduling configuration.
         */
        scheduling?: Schema$JobScheduling;
        /**
         * Optional. Job is a Spark job.
         */
        sparkJob?: Schema$SparkJob;
        /**
         * Optional. Job is a SparkR job.
         */
        sparkRJob?: Schema$SparkRJob;
        /**
         * Optional. Job is a SparkSql job.
         */
        sparkSqlJob?: Schema$SparkSqlJob;
        /**
         * Output only. The job status. Additional application-specific status information may be contained in the &lt;code&gt;type_job&lt;/code&gt; and &lt;code&gt;yarn_applications&lt;/code&gt; fields.
         */
        status?: Schema$JobStatus;
        /**
         * Output only. The previous job status.
         */
        statusHistory?: Schema$JobStatus[];
        /**
         * Output only. The collection of YARN applications spun up by this job.Beta Feature: This report is available for testing purposes only. It may be changed before final release.
         */
        yarnApplications?: Schema$YarnApplication[];
    }
    /**
     * Job Operation metadata.
     */
    export interface Schema$JobMetadata {
        /**
         * Output only. The job id.
         */
        jobId?: string | null;
        /**
         * Output only. Operation type.
         */
        operationType?: string | null;
        /**
         * Output only. Job submission time.
         */
        startTime?: string | null;
        /**
         * Output only. Most recent job status.
         */
        status?: Schema$JobStatus;
    }
    /**
     * Dataproc job config.
     */
    export interface Schema$JobPlacement {
        /**
         * Required. The name of the cluster where the job will be submitted.
         */
        clusterName?: string | null;
        /**
         * Output only. A cluster UUID generated by the Dataproc service when the job is submitted.
         */
        clusterUuid?: string | null;
    }
    /**
     * Encapsulates the full scoping used to reference a job.
     */
    export interface Schema$JobReference {
        /**
         * Optional. The job ID, which must be unique within the project.The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), or hyphens (-). The maximum length is 100 characters.If not specified by the caller, the job ID will be provided by the server.
         */
        jobId?: string | null;
        /**
         * Required. The ID of the Google Cloud Platform project that the job belongs to.
         */
        projectId?: string | null;
    }
    /**
     * Job scheduling options.
     */
    export interface Schema$JobScheduling {
        /**
         * Optional. Maximum number of times per hour a driver may be restarted as a result of driver terminating with non-zero code before job is reported failed.A job may be reported as thrashing if driver exits with non-zero code 4 times within 10 minute window.Maximum value is 10.
         */
        maxFailuresPerHour?: number | null;
    }
    /**
     * Dataproc job status.
     */
    export interface Schema$JobStatus {
        /**
         * Optional. Output only. Job state details, such as an error description if the state is &lt;code&gt;ERROR&lt;/code&gt;.
         */
        details?: string | null;
        /**
         * Output only. A state message specifying the overall job state.
         */
        state?: string | null;
        /**
         * Output only. The time when this state was entered.
         */
        stateStartTime?: string | null;
        /**
         * Output only. Additional state information, which includes status reported by the agent.
         */
        substate?: string | null;
    }
    /**
     * Specifies Kerberos related configuration.
     */
    export interface Schema$KerberosConfig {
        /**
         * Optional. The admin server (IP or hostname) for the remote trusted realm in a cross realm trust relationship.
         */
        crossRealmTrustAdminServer?: string | null;
        /**
         * Optional. The KDC (IP or hostname) for the remote trusted realm in a cross realm trust relationship.
         */
        crossRealmTrustKdc?: string | null;
        /**
         * Optional. The remote realm the Dataproc on-cluster KDC will trust, should the user enable cross realm trust.
         */
        crossRealmTrustRealm?: string | null;
        /**
         * Optional. The Cloud Storage URI of a KMS encrypted file containing the shared password between the on-cluster Kerberos realm and the remote trusted realm, in a cross realm trust relationship.
         */
        crossRealmTrustSharedPasswordUri?: string | null;
        /**
         * Optional. Flag to indicate whether to Kerberize the cluster (default: false). Set this field to true to enable Kerberos on a cluster.
         */
        enableKerberos?: boolean | null;
        /**
         * Optional. The Cloud Storage URI of a KMS encrypted file containing the master key of the KDC database.
         */
        kdcDbKeyUri?: string | null;
        /**
         * Optional. The Cloud Storage URI of a KMS encrypted file containing the password to the user provided key. For the self-signed certificate, this password is generated by Dataproc.
         */
        keyPasswordUri?: string | null;
        /**
         * Optional. The Cloud Storage URI of a KMS encrypted file containing the password to the user provided keystore. For the self-signed certificate, this password is generated by Dataproc.
         */
        keystorePasswordUri?: string | null;
        /**
         * Optional. The Cloud Storage URI of the keystore file used for SSL encryption. If not provided, Dataproc will provide a self-signed certificate.
         */
        keystoreUri?: string | null;
        /**
         * Required. The uri of the KMS key used to encrypt various sensitive files.
         */
        kmsKeyUri?: string | null;
        /**
         * Optional. The name of the on-cluster Kerberos realm. If not specified, the uppercased domain of hostnames will be the realm.
         */
        realm?: string | null;
        /**
         * Required. The Cloud Storage URI of a KMS encrypted file containing the root principal password.
         */
        rootPrincipalPasswordUri?: string | null;
        /**
         * Optional. The lifetime of the ticket granting ticket, in hours. If not specified, or user specifies 0, then default value 10 will be used.
         */
        tgtLifetimeHours?: number | null;
        /**
         * Optional. The Cloud Storage URI of a KMS encrypted file containing the password to the user provided truststore. For the self-signed certificate, this password is generated by Dataproc.
         */
        truststorePasswordUri?: string | null;
        /**
         * Optional. The Cloud Storage URI of the truststore file used for SSL encryption. If not provided, Dataproc will provide a self-signed certificate.
         */
        truststoreUri?: string | null;
    }
    /**
     * Specifies the cluster auto-delete schedule configuration.
     */
    export interface Schema$LifecycleConfig {
        /**
         * Optional. The time when cluster will be auto-deleted (see JSON representation of Timestamp (https://developers.google.com/protocol-buffers/docs/proto3#json)).
         */
        autoDeleteTime?: string | null;
        /**
         * Optional. The lifetime duration of cluster. The cluster will be auto-deleted at the end of this period. Minimum value is 10 minutes; maximum value is 14 days (see JSON representation of Duration (https://developers.google.com/protocol-buffers/docs/proto3#json)).
         */
        autoDeleteTtl?: string | null;
        /**
         * Optional. The duration to keep the cluster alive while idling (when no jobs are running). Passing this threshold will cause the cluster to be deleted. Minimum value is 10 minutes; maximum value is 14 days (see JSON representation of Duration (https://developers.google.com/protocol-buffers/docs/proto3#json).
         */
        idleDeleteTtl?: string | null;
        /**
         * Output only. The time when cluster became idle (most recent job finished) and became eligible for deletion due to idleness (see JSON representation of Timestamp (https://developers.google.com/protocol-buffers/docs/proto3#json)).
         */
        idleStartTime?: string | null;
    }
    /**
     * A response to a request to list autoscaling policies in a project.
     */
    export interface Schema$ListAutoscalingPoliciesResponse {
        /**
         * Output only. This token is included in the response if there are more results to fetch.
         */
        nextPageToken?: string | null;
        /**
         * Output only. Autoscaling policies list.
         */
        policies?: Schema$AutoscalingPolicy[];
    }
    /**
     * The list of all clusters in a project.
     */
    export interface Schema$ListClustersResponse {
        /**
         * Output only. The clusters in the project.
         */
        clusters?: Schema$Cluster[];
        /**
         * Output only. This token is included in the response if there are more results to fetch. To fetch additional results, provide this value as the page_token in a subsequent ListClustersRequest.
         */
        nextPageToken?: string | null;
    }
    /**
     * A list of jobs in a project.
     */
    export interface Schema$ListJobsResponse {
        /**
         * Output only. Jobs list.
         */
        jobs?: Schema$Job[];
        /**
         * Optional. This token is included in the response if there are more results to fetch. To fetch additional results, provide this value as the page_token in a subsequent &lt;code&gt;ListJobsRequest&lt;/code&gt;.
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
     * A response to a request to list workflow templates in a project.
     */
    export interface Schema$ListWorkflowTemplatesResponse {
        /**
         * Output only. This token is included in the response if there are more results to fetch. To fetch additional results, provide this value as the page_token in a subsequent &lt;code&gt;ListWorkflowTemplatesRequest&lt;/code&gt;.
         */
        nextPageToken?: string | null;
        /**
         * Output only. WorkflowTemplates list.
         */
        templates?: Schema$WorkflowTemplate[];
    }
    /**
     * The runtime logging config of the job.
     */
    export interface Schema$LoggingConfig {
        /**
         * The per-package log levels for the driver. This may include &quot;root&quot; package name to configure rootLogger. Examples:  &#39;com.google = FATAL&#39;, &#39;root = INFO&#39;, &#39;org.apache = DEBUG&#39;
         */
        driverLogLevels?: {
            [key: string]: string;
        } | null;
    }
    /**
     * Cluster that is managed by the workflow.
     */
    export interface Schema$ManagedCluster {
        /**
         * Required. The cluster name prefix. A unique cluster name will be formed by appending a random suffix.The name must contain only lower-case letters (a-z), numbers (0-9), and hyphens (-). Must begin with a letter. Cannot begin or end with hyphen. Must consist of between 2 and 35 characters.
         */
        clusterName?: string | null;
        /**
         * Required. The cluster configuration.
         */
        config?: Schema$ClusterConfig;
        /**
         * Optional. The labels to associate with this cluster.Label keys must be between 1 and 63 characters long, and must conform to the following PCRE regular expression: \p{Ll}\p{Lo}{0,62}Label values must be between 1 and 63 characters long, and must conform to the following PCRE regular expression: \p{Ll}\p{Lo}\p{N}_-{0,63}No more than 32 labels can be associated with a given cluster.
         */
        labels?: {
            [key: string]: string;
        } | null;
    }
    /**
     * Specifies the resources used to actively manage an instance group.
     */
    export interface Schema$ManagedGroupConfig {
        /**
         * Output only. The name of the Instance Group Manager for this group.
         */
        instanceGroupManagerName?: string | null;
        /**
         * Output only. The name of the Instance Template used for the Managed Instance Group.
         */
        instanceTemplateName?: string | null;
    }
    /**
     * Specifies an executable to run on a fully configured node and a timeout period for executable completion.
     */
    export interface Schema$NodeInitializationAction {
        /**
         * Required. Cloud Storage URI of executable file.
         */
        executableFile?: string | null;
        /**
         * Optional. Amount of time executable has to complete. Default is 10 minutes (see JSON representation of Duration (https://developers.google.com/protocol-buffers/docs/proto3#json)).Cluster creation fails with an explanatory error message (the name of the executable that caused the error and the exceeded timeout period) if the executable is not completed at end of the timeout period.
         */
        executionTimeout?: string | null;
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
     * A job executed by the workflow.
     */
    export interface Schema$OrderedJob {
        /**
         * Optional. Job is a Hadoop job.
         */
        hadoopJob?: Schema$HadoopJob;
        /**
         * Optional. Job is a Hive job.
         */
        hiveJob?: Schema$HiveJob;
        /**
         * Optional. The labels to associate with this job.Label keys must be between 1 and 63 characters long, and must conform to the following regular expression: \p{Ll}\p{Lo}{0,62}Label values must be between 1 and 63 characters long, and must conform to the following regular expression: \p{Ll}\p{Lo}\p{N}_-{0,63}No more than 32 labels can be associated with a given job.
         */
        labels?: {
            [key: string]: string;
        } | null;
        /**
         * Optional. Job is a Pig job.
         */
        pigJob?: Schema$PigJob;
        /**
         * Optional. The optional list of prerequisite job step_ids. If not specified, the job will start at the beginning of workflow.
         */
        prerequisiteStepIds?: string[] | null;
        /**
         * Optional. Job is a Presto job.
         */
        prestoJob?: Schema$PrestoJob;
        /**
         * Optional. Job is a PySpark job.
         */
        pysparkJob?: Schema$PySparkJob;
        /**
         * Optional. Job scheduling configuration.
         */
        scheduling?: Schema$JobScheduling;
        /**
         * Optional. Job is a Spark job.
         */
        sparkJob?: Schema$SparkJob;
        /**
         * Optional. Job is a SparkR job.
         */
        sparkRJob?: Schema$SparkRJob;
        /**
         * Optional. Job is a SparkSql job.
         */
        sparkSqlJob?: Schema$SparkSqlJob;
        /**
         * Required. The step id. The id must be unique among all jobs within the template.The step id is used as prefix for job id, as job goog-dataproc-workflow-step-id label, and in prerequisiteStepIds field from other steps.The id must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). Cannot begin or end with underscore or hyphen. Must consist of between 3 and 50 characters.
         */
        stepId?: string | null;
    }
    /**
     * Configuration for parameter validation.
     */
    export interface Schema$ParameterValidation {
        /**
         * Validation based on regular expressions.
         */
        regex?: Schema$RegexValidation;
        /**
         * Validation based on a list of allowed values.
         */
        values?: Schema$ValueValidation;
    }
    /**
     * A Dataproc job for running Apache Pig (https://pig.apache.org/) queries on YARN.
     */
    export interface Schema$PigJob {
        /**
         * Optional. Whether to continue executing queries if a query fails. The default value is false. Setting to true can be useful when executing independent parallel queries.
         */
        continueOnFailure?: boolean | null;
        /**
         * Optional. HCFS URIs of jar files to add to the CLASSPATH of the Pig Client and Hadoop MapReduce (MR) tasks. Can contain Pig UDFs.
         */
        jarFileUris?: string[] | null;
        /**
         * Optional. The runtime log config for job execution.
         */
        loggingConfig?: Schema$LoggingConfig;
        /**
         * Optional. A mapping of property names to values, used to configure Pig. Properties that conflict with values set by the Dataproc API may be overwritten. Can include properties set in /etc/hadoop/conf/*-site.xml, /etc/pig/conf/pig.properties, and classes in user code.
         */
        properties?: {
            [key: string]: string;
        } | null;
        /**
         * The HCFS URI of the script that contains the Pig queries.
         */
        queryFileUri?: string | null;
        /**
         * A list of queries.
         */
        queryList?: Schema$QueryList;
        /**
         * Optional. Mapping of query variable names to values (equivalent to the Pig command: name=[value]).
         */
        scriptVariables?: {
            [key: string]: string;
        } | null;
    }
    /**
     * An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources.A Policy is a collection of bindings. A binding binds one or more members to a single role. Members can be user accounts, service accounts, Google groups, and domains (such as G Suite). A role is a named list of permissions; each role can be an IAM predefined role or a user-created custom role.For some types of Google Cloud resources, a binding can also specify a condition, which is a logical expression that allows access to a resource only if the expression evaluates to true. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies).JSON example: {   &quot;bindings&quot;: [     {       &quot;role&quot;: &quot;roles/resourcemanager.organizationAdmin&quot;,       &quot;members&quot;: [         &quot;user:mike@example.com&quot;,         &quot;group:admins@example.com&quot;,         &quot;domain:google.com&quot;,         &quot;serviceAccount:my-project-id@appspot.gserviceaccount.com&quot;       ]     },     {       &quot;role&quot;: &quot;roles/resourcemanager.organizationViewer&quot;,       &quot;members&quot;: [         &quot;user:eve@example.com&quot;       ],       &quot;condition&quot;: {         &quot;title&quot;: &quot;expirable access&quot;,         &quot;description&quot;: &quot;Does not grant access after Sep 2020&quot;,         &quot;expression&quot;: &quot;request.time &lt; timestamp(&#39;2020-10-01T00:00:00.000Z&#39;)&quot;,       }     }   ],   &quot;etag&quot;: &quot;BwWWja0YfJA=&quot;,   &quot;version&quot;: 3 } YAML example: bindings: - members:   - user:mike@example.com   - group:admins@example.com   - domain:google.com   - serviceAccount:my-project-id@appspot.gserviceaccount.com   role: roles/resourcemanager.organizationAdmin - members:   - user:eve@example.com   role: roles/resourcemanager.organizationViewer   condition:     title: expirable access     description: Does not grant access after Sep 2020     expression: request.time &lt; timestamp(&#39;2020-10-01T00:00:00.000Z&#39;) - etag: BwWWja0YfJA= - version: 3 For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
     */
    export interface Schema$Policy {
        /**
         * Associates a list of members to a role. Optionally, may specify a condition that determines how and when the bindings are applied. Each of the bindings must contain at least one member.
         */
        bindings?: Schema$Binding[];
        /**
         * etag is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the etag in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An etag is returned in the response to getIamPolicy, and systems are expected to put that etag in the request to setIamPolicy to ensure that their change will be applied to the same version of the policy.Important: If you use IAM Conditions, you must include the etag field whenever you call setIamPolicy. If you omit this field, then IAM allows you to overwrite a version 3 policy with a version 1 policy, and all of the conditions in the version 3 policy are lost.
         */
        etag?: string | null;
        /**
         * Specifies the format of the policy.Valid values are 0, 1, and 3. Requests that specify an invalid value are rejected.Any operation that affects conditional role bindings must specify version 3. This requirement applies to the following operations: Getting a policy that includes a conditional role binding Adding a conditional role binding to a policy Changing a conditional role binding in a policy Removing any role binding, with or without a condition, from a policy  that includes conditionsImportant: If you use IAM Conditions, you must include the etag field whenever you call setIamPolicy. If you omit this field, then IAM allows you to overwrite a version 3 policy with a version 1 policy, and all of the conditions in the version 3 policy are lost.If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies).
         */
        version?: number | null;
    }
    /**
     * A Dataproc job for running Presto (https://prestosql.io/) queries. IMPORTANT: The Dataproc Presto Optional Component (https://cloud.google.com/dataproc/docs/concepts/components/presto) must be enabled when the cluster is created to submit a Presto job to the cluster.
     */
    export interface Schema$PrestoJob {
        /**
         * Optional. Presto client tags to attach to this query
         */
        clientTags?: string[] | null;
        /**
         * Optional. Whether to continue executing queries if a query fails. The default value is false. Setting to true can be useful when executing independent parallel queries.
         */
        continueOnFailure?: boolean | null;
        /**
         * Optional. The runtime log config for job execution.
         */
        loggingConfig?: Schema$LoggingConfig;
        /**
         * Optional. The format in which query output will be displayed. See the Presto documentation for supported output formats
         */
        outputFormat?: string | null;
        /**
         * Optional. A mapping of property names to values. Used to set Presto session properties (https://prestodb.io/docs/current/sql/set-session.html) Equivalent to using the --session flag in the Presto CLI
         */
        properties?: {
            [key: string]: string;
        } | null;
        /**
         * The HCFS URI of the script that contains SQL queries.
         */
        queryFileUri?: string | null;
        /**
         * A list of queries.
         */
        queryList?: Schema$QueryList;
    }
    /**
     * A Dataproc job for running Apache PySpark (https://spark.apache.org/docs/0.9.0/python-programming-guide.html) applications on YARN.
     */
    export interface Schema$PySparkJob {
        /**
         * Optional. HCFS URIs of archives to be extracted in the working directory of .jar, .tar, .tar.gz, .tgz, and .zip.
         */
        archiveUris?: string[] | null;
        /**
         * Optional. The arguments to pass to the driver. Do not include arguments, such as --conf, that can be set as job properties, since a collision may occur that causes an incorrect job submission.
         */
        args?: string[] | null;
        /**
         * Optional. HCFS URIs of files to be copied to the working directory of Python drivers and distributed tasks. Useful for naively parallel tasks.
         */
        fileUris?: string[] | null;
        /**
         * Optional. HCFS URIs of jar files to add to the CLASSPATHs of the Python driver and tasks.
         */
        jarFileUris?: string[] | null;
        /**
         * Optional. The runtime log config for job execution.
         */
        loggingConfig?: Schema$LoggingConfig;
        /**
         * Required. The HCFS URI of the main Python file to use as the driver. Must be a .py file.
         */
        mainPythonFileUri?: string | null;
        /**
         * Optional. A mapping of property names to values, used to configure PySpark. Properties that conflict with values set by the Dataproc API may be overwritten. Can include properties set in /etc/spark/conf/spark-defaults.conf and classes in user code.
         */
        properties?: {
            [key: string]: string;
        } | null;
        /**
         * Optional. HCFS file URIs of Python files to pass to the PySpark framework. Supported file types: .py, .egg, and .zip.
         */
        pythonFileUris?: string[] | null;
    }
    /**
     * A list of queries to run on a cluster.
     */
    export interface Schema$QueryList {
        /**
         * Required. The queries to execute. You do not need to terminate a query with a semicolon. Multiple queries can be specified in one string by separating each with a semicolon. Here is an example of an Cloud Dataproc API snippet that uses a QueryList to specify a HiveJob: &quot;hiveJob&quot;: {   &quot;queryList&quot;: {     &quot;queries&quot;: [       &quot;query1&quot;,       &quot;query2&quot;,       &quot;query3;query4&quot;,     ]   } }
         */
        queries?: string[] | null;
    }
    /**
     * Validation based on regular expressions.
     */
    export interface Schema$RegexValidation {
        /**
         * Required. RE2 regular expressions used to validate the parameter&#39;s value. The value must match the regex in its entirety (substring matches are not sufficient).
         */
        regexes?: string[] | null;
    }
    /**
     * Reservation Affinity for consuming Zonal reservation.
     */
    export interface Schema$ReservationAffinity {
        /**
         * Optional. Type of reservation to consume
         */
        consumeReservationType?: string | null;
        /**
         * Optional. Corresponds to the label key of reservation resource.
         */
        key?: string | null;
        /**
         * Optional. Corresponds to the label values of reservation resource.
         */
        values?: string[] | null;
    }
    /**
     * Security related configuration, including Kerberos.
     */
    export interface Schema$SecurityConfig {
        /**
         * Kerberos related configuration.
         */
        kerberosConfig?: Schema$KerberosConfig;
    }
    /**
     * Request message for SetIamPolicy method.
     */
    export interface Schema$SetIamPolicyRequest {
        /**
         * REQUIRED: The complete policy to be applied to the resource. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Cloud Platform services (such as Projects) might reject them.
         */
        policy?: Schema$Policy;
    }
    /**
     * Specifies the selection and config of software inside the cluster.
     */
    export interface Schema$SoftwareConfig {
        /**
         * Optional. The version of software inside the cluster. It must be one of the supported Dataproc Versions (https://cloud.google.com/dataproc/docs/concepts/versioning/dataproc-versions#supported_cloud_dataproc_versions), such as &quot;1.2&quot; (including a subminor version, such as &quot;1.2.29&quot;), or the &quot;preview&quot; version (https://cloud.google.com/dataproc/docs/concepts/versioning/dataproc-versions#other_versions). If unspecified, it defaults to the latest Debian version.
         */
        imageVersion?: string | null;
        /**
         * Optional. The set of components to activate on the cluster.
         */
        optionalComponents?: string[] | null;
        /**
         * Optional. The properties to set on daemon config files.Property keys are specified in prefix:property format, for example core:hadoop.tmp.dir. The following are supported prefixes and their mappings: capacity-scheduler: capacity-scheduler.xml core: core-site.xml distcp: distcp-default.xml hdfs: hdfs-site.xml hive: hive-site.xml mapred: mapred-site.xml pig: pig.properties spark: spark-defaults.conf yarn: yarn-site.xmlFor more information, see Cluster properties (https://cloud.google.com/dataproc/docs/concepts/cluster-properties).
         */
        properties?: {
            [key: string]: string;
        } | null;
    }
    /**
     * A Dataproc job for running Apache Spark (http://spark.apache.org/) applications on YARN.
     */
    export interface Schema$SparkJob {
        /**
         * Optional. HCFS URIs of archives to be extracted in the working directory of Spark drivers and tasks. Supported file types: .jar, .tar, .tar.gz, .tgz, and .zip.
         */
        archiveUris?: string[] | null;
        /**
         * Optional. The arguments to pass to the driver. Do not include arguments, such as --conf, that can be set as job properties, since a collision may occur that causes an incorrect job submission.
         */
        args?: string[] | null;
        /**
         * Optional. HCFS URIs of files to be copied to the working directory of Spark drivers and distributed tasks. Useful for naively parallel tasks.
         */
        fileUris?: string[] | null;
        /**
         * Optional. HCFS URIs of jar files to add to the CLASSPATHs of the Spark driver and tasks.
         */
        jarFileUris?: string[] | null;
        /**
         * Optional. The runtime log config for job execution.
         */
        loggingConfig?: Schema$LoggingConfig;
        /**
         * The name of the driver&#39;s main class. The jar file that contains the class must be in the default CLASSPATH or specified in jar_file_uris.
         */
        mainClass?: string | null;
        /**
         * The HCFS URI of the jar file that contains the main class.
         */
        mainJarFileUri?: string | null;
        /**
         * Optional. A mapping of property names to values, used to configure Spark. Properties that conflict with values set by the Dataproc API may be overwritten. Can include properties set in /etc/spark/conf/spark-defaults.conf and classes in user code.
         */
        properties?: {
            [key: string]: string;
        } | null;
    }
    /**
     * A Dataproc job for running Apache SparkR (https://spark.apache.org/docs/latest/sparkr.html) applications on YARN.
     */
    export interface Schema$SparkRJob {
        /**
         * Optional. HCFS URIs of archives to be extracted in the working directory of Spark drivers and tasks. Supported file types: .jar, .tar, .tar.gz, .tgz, and .zip.
         */
        archiveUris?: string[] | null;
        /**
         * Optional. The arguments to pass to the driver. Do not include arguments, such as --conf, that can be set as job properties, since a collision may occur that causes an incorrect job submission.
         */
        args?: string[] | null;
        /**
         * Optional. HCFS URIs of files to be copied to the working directory of R drivers and distributed tasks. Useful for naively parallel tasks.
         */
        fileUris?: string[] | null;
        /**
         * Optional. The runtime log config for job execution.
         */
        loggingConfig?: Schema$LoggingConfig;
        /**
         * Required. The HCFS URI of the main R file to use as the driver. Must be a .R file.
         */
        mainRFileUri?: string | null;
        /**
         * Optional. A mapping of property names to values, used to configure SparkR. Properties that conflict with values set by the Dataproc API may be overwritten. Can include properties set in /etc/spark/conf/spark-defaults.conf and classes in user code.
         */
        properties?: {
            [key: string]: string;
        } | null;
    }
    /**
     * A Dataproc job for running Apache Spark SQL (http://spark.apache.org/sql/) queries.
     */
    export interface Schema$SparkSqlJob {
        /**
         * Optional. HCFS URIs of jar files to be added to the Spark CLASSPATH.
         */
        jarFileUris?: string[] | null;
        /**
         * Optional. The runtime log config for job execution.
         */
        loggingConfig?: Schema$LoggingConfig;
        /**
         * Optional. A mapping of property names to values, used to configure Spark SQL&#39;s SparkConf. Properties that conflict with values set by the Dataproc API may be overwritten.
         */
        properties?: {
            [key: string]: string;
        } | null;
        /**
         * The HCFS URI of the script that contains SQL queries.
         */
        queryFileUri?: string | null;
        /**
         * A list of queries.
         */
        queryList?: Schema$QueryList;
        /**
         * Optional. Mapping of query variable names to values (equivalent to the Spark SQL command: SET name=&quot;value&quot;;).
         */
        scriptVariables?: {
            [key: string]: string;
        } | null;
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
     * A request to submit a job.
     */
    export interface Schema$SubmitJobRequest {
        /**
         * Required. The job resource.
         */
        job?: Schema$Job;
        /**
         * Optional. A unique id used to identify the request. If the server receives two SubmitJobRequest requests with the same id, then the second request will be ignored and the first Job created and stored in the backend is returned.It is recommended to always set this value to a UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier).The id must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters.
         */
        requestId?: string | null;
    }
    /**
     * A configurable parameter that replaces one or more fields in the template. Parameterizable fields: - Labels - File uris - Job properties - Job arguments - Script variables - Main class (in HadoopJob and SparkJob) - Zone (in ClusterSelector)
     */
    export interface Schema$TemplateParameter {
        /**
         * Optional. Brief description of the parameter. Must not exceed 1024 characters.
         */
        description?: string | null;
        /**
         * Required. Paths to all fields that the parameter replaces. A field is allowed to appear in at most one parameter&#39;s list of field paths.A field path is similar in syntax to a google.protobuf.FieldMask. For example, a field path that references the zone field of a workflow template&#39;s cluster selector would be specified as placement.clusterSelector.zone.Also, field paths can reference fields using the following syntax: Values in maps can be referenced by key: labels&#39;key&#39; placement.clusterSelector.clusterLabels&#39;key&#39; placement.managedCluster.labels&#39;key&#39; placement.clusterSelector.clusterLabels&#39;key&#39; jobs&#39;step-id&#39;.labels&#39;key&#39; Jobs in the jobs list can be referenced by step-id: jobs&#39;step-id&#39;.hadoopJob.mainJarFileUri jobs&#39;step-id&#39;.hiveJob.queryFileUri jobs&#39;step-id&#39;.pySparkJob.mainPythonFileUri jobs&#39;step-id&#39;.hadoopJob.jarFileUris0 jobs&#39;step-id&#39;.hadoopJob.archiveUris0 jobs&#39;step-id&#39;.hadoopJob.fileUris0 jobs&#39;step-id&#39;.pySparkJob.pythonFileUris0 Items in repeated fields can be referenced by a zero-based index: jobs&#39;step-id&#39;.sparkJob.args0 Other examples: jobs&#39;step-id&#39;.hadoopJob.properties&#39;key&#39; jobs&#39;step-id&#39;.hadoopJob.args0 jobs&#39;step-id&#39;.hiveJob.scriptVariables&#39;key&#39; jobs&#39;step-id&#39;.hadoopJob.mainJarFileUri placement.clusterSelector.zoneIt may not be possible to parameterize maps and repeated fields in their entirety since only individual map values and individual items in repeated fields can be referenced. For example, the following field paths are invalid: placement.clusterSelector.clusterLabels jobs&#39;step-id&#39;.sparkJob.args
         */
        fields?: string[] | null;
        /**
         * Required. Parameter name. The parameter name is used as the key, and paired with the parameter value, which are passed to the template when the template is instantiated. The name must contain only capital letters (A-Z), numbers (0-9), and underscores (_), and must not start with a number. The maximum length is 40 characters.
         */
        name?: string | null;
        /**
         * Optional. Validation rules to be applied to this parameter&#39;s value.
         */
        validation?: Schema$ParameterValidation;
    }
    /**
     * Request message for TestIamPermissions method.
     */
    export interface Schema$TestIamPermissionsRequest {
        /**
         * The set of permissions to check for the resource. Permissions with wildcards (such as &#39;*&#39; or &#39;storage.*&#39;) are not allowed. For more information see IAM Overview (https://cloud.google.com/iam/docs/overview#permissions).
         */
        permissions?: string[] | null;
    }
    /**
     * Response message for TestIamPermissions method.
     */
    export interface Schema$TestIamPermissionsResponse {
        /**
         * A subset of TestPermissionsRequest.permissions that the caller is allowed.
         */
        permissions?: string[] | null;
    }
    /**
     * Validation based on a list of allowed values.
     */
    export interface Schema$ValueValidation {
        /**
         * Required. List of allowed values for the parameter.
         */
        values?: string[] | null;
    }
    /**
     * The workflow graph.
     */
    export interface Schema$WorkflowGraph {
        /**
         * Output only. The workflow nodes.
         */
        nodes?: Schema$WorkflowNode[];
    }
    /**
     * A Dataproc workflow template resource.
     */
    export interface Schema$WorkflowMetadata {
        /**
         * Output only. The name of the target cluster.
         */
        clusterName?: string | null;
        /**
         * Output only. The UUID of target cluster.
         */
        clusterUuid?: string | null;
        /**
         * Output only. The create cluster operation metadata.
         */
        createCluster?: Schema$ClusterOperation;
        /**
         * Output only. The delete cluster operation metadata.
         */
        deleteCluster?: Schema$ClusterOperation;
        /**
         * Output only. Workflow end time.
         */
        endTime?: string | null;
        /**
         * Output only. The workflow graph.
         */
        graph?: Schema$WorkflowGraph;
        /**
         * Map from parameter names to values that were used for those parameters.
         */
        parameters?: {
            [key: string]: string;
        } | null;
        /**
         * Output only. Workflow start time.
         */
        startTime?: string | null;
        /**
         * Output only. The workflow state.
         */
        state?: string | null;
        /**
         * Output only. The resource name of the workflow template as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates, the resource name of the  template has the following format:  projects/{project_id}/regions/{region}/workflowTemplates/{template_id} For projects.locations.workflowTemplates, the resource name of the  template has the following format:  projects/{project_id}/locations/{location}/workflowTemplates/{template_id}
         */
        template?: string | null;
        /**
         * Output only. The version of template at the time of workflow instantiation.
         */
        version?: number | null;
    }
    /**
     * The workflow node.
     */
    export interface Schema$WorkflowNode {
        /**
         * Output only. The error detail.
         */
        error?: string | null;
        /**
         * Output only. The job id; populated after the node enters RUNNING state.
         */
        jobId?: string | null;
        /**
         * Output only. Node&#39;s prerequisite nodes.
         */
        prerequisiteStepIds?: string[] | null;
        /**
         * Output only. The node state.
         */
        state?: string | null;
        /**
         * Output only. The name of the node.
         */
        stepId?: string | null;
    }
    /**
     * A Dataproc workflow template resource.
     */
    export interface Schema$WorkflowTemplate {
        /**
         * Output only. The time template was created.
         */
        createTime?: string | null;
        id?: string | null;
        /**
         * Required. The Directed Acyclic Graph of Jobs to submit.
         */
        jobs?: Schema$OrderedJob[];
        /**
         * Optional. The labels to associate with this template. These labels will be propagated to all jobs and clusters created by the workflow instance.Label keys must contain 1 to 63 characters, and must conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt).Label values may be empty, but, if present, must contain 1 to 63 characters, and must conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt).No more than 32 labels can be associated with a template.
         */
        labels?: {
            [key: string]: string;
        } | null;
        /**
         * Output only. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates, the resource name of the  template has the following format:  projects/{project_id}/regions/{region}/workflowTemplates/{template_id} For projects.locations.workflowTemplates, the resource name of the  template has the following format:  projects/{project_id}/locations/{location}/workflowTemplates/{template_id}
         */
        name?: string | null;
        /**
         * Optional. emplate parameters whose values are substituted into the template. Values for parameters must be provided when the template is instantiated.
         */
        parameters?: Schema$TemplateParameter[];
        /**
         * Required. WorkflowTemplate scheduling information.
         */
        placement?: Schema$WorkflowTemplatePlacement;
        /**
         * Output only. The time template was last updated.
         */
        updateTime?: string | null;
        /**
         * Optional. Used to perform a consistent read-modify-write.This field should be left blank for a CreateWorkflowTemplate request. It is required for an UpdateWorkflowTemplate request, and must match the current server version. A typical update template flow would fetch the current template with a GetWorkflowTemplate request, which will return the current template with the version field filled in with the current server version. The user updates other fields in the template, then returns it as part of the UpdateWorkflowTemplate request.
         */
        version?: number | null;
    }
    /**
     * Specifies workflow execution target.Either managed_cluster or cluster_selector is required.
     */
    export interface Schema$WorkflowTemplatePlacement {
        /**
         * Optional. A selector that chooses target cluster for jobs based on metadata.The selector is evaluated at the time each job is submitted.
         */
        clusterSelector?: Schema$ClusterSelector;
        /**
         * A cluster that is managed by the workflow.
         */
        managedCluster?: Schema$ManagedCluster;
    }
    /**
     * A YARN application created by a job. Application information is a subset of &lt;code&gt;org.apache.hadoop.yarn.proto.YarnProtos.ApplicationReportProto&lt;/code&gt;.Beta Feature: This report is available for testing purposes only. It may be changed before final release.
     */
    export interface Schema$YarnApplication {
        /**
         * Required. The application name.
         */
        name?: string | null;
        /**
         * Required. The numerical progress of the application, from 1 to 100.
         */
        progress?: number | null;
        /**
         * Required. The application state.
         */
        state?: string | null;
        /**
         * Optional. The HTTP URL of the ApplicationMaster, HistoryServer, or TimelineServer that provides application-specific information. The URL uses the internal hostname, and requires a proxy server for resolution and, possibly, access.
         */
        trackingUrl?: string | null;
    }
    export class Resource$Projects {
        context: APIRequestContext;
        locations: Resource$Projects$Locations;
        regions: Resource$Projects$Regions;
        constructor(context: APIRequestContext);
    }
    export class Resource$Projects$Locations {
        context: APIRequestContext;
        autoscalingPolicies: Resource$Projects$Locations$Autoscalingpolicies;
        workflowTemplates: Resource$Projects$Locations$Workflowtemplates;
        constructor(context: APIRequestContext);
    }
    export class Resource$Projects$Locations$Autoscalingpolicies {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * dataproc.projects.locations.autoscalingPolicies.create
         * @desc Creates new autoscaling policy.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.locations.autoscalingPolicies.create({
         *     // Required. The "resource name" of the region or location, as described in https://cloud.google.com/apis/design/resource_names.
         *     // For projects.regions.autoscalingPolicies.create, the resource name  of the region has the following format:  projects/{project_id}/regions/{region}
         *     // For projects.locations.autoscalingPolicies.create, the resource name  of the location has the following format:  projects/{project_id}/locations/{location}
         *     parent: 'projects/my-project/locations/my-location',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "basicAlgorithm": {},
         *       //   "id": "my_id",
         *       //   "name": "my_name",
         *       //   "secondaryWorkerConfig": {},
         *       //   "workerConfig": {}
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "basicAlgorithm": {},
         *   //   "id": "my_id",
         *   //   "name": "my_name",
         *   //   "secondaryWorkerConfig": {},
         *   //   "workerConfig": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dataproc.projects.locations.autoscalingPolicies.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent Required. The "resource name" of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies.create, the resource name  of the region has the following format:  projects/{project_id}/regions/{region} For projects.locations.autoscalingPolicies.create, the resource name  of the location has the following format:  projects/{project_id}/locations/{location}
         * @param {().AutoscalingPolicy} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Projects$Locations$Autoscalingpolicies$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Projects$Locations$Autoscalingpolicies$Create, options?: MethodOptions): GaxiosPromise<Schema$AutoscalingPolicy>;
        create(params: Params$Resource$Projects$Locations$Autoscalingpolicies$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Projects$Locations$Autoscalingpolicies$Create, options: MethodOptions | BodyResponseCallback<Schema$AutoscalingPolicy>, callback: BodyResponseCallback<Schema$AutoscalingPolicy>): void;
        create(params: Params$Resource$Projects$Locations$Autoscalingpolicies$Create, callback: BodyResponseCallback<Schema$AutoscalingPolicy>): void;
        create(callback: BodyResponseCallback<Schema$AutoscalingPolicy>): void;
        /**
         * dataproc.projects.locations.autoscalingPolicies.delete
         * @desc Deletes an autoscaling policy. It is an error to delete an autoscaling policy that is in use by one or more clusters.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.locations.autoscalingPolicies.delete({
         *     // Required. The "resource name" of the autoscaling policy, as described in https://cloud.google.com/apis/design/resource_names.
         *     // For projects.regions.autoscalingPolicies.delete, the resource name  of the policy has the following format:  projects/{project_id}/regions/{region}/autoscalingPolicies/{policy_id}
         *     // For projects.locations.autoscalingPolicies.delete, the resource name  of the policy has the following format:  projects/{project_id}/locations/{location}/autoscalingPolicies/{policy_id}
         *     name:
         *       'projects/my-project/locations/my-location/autoscalingPolicies/my-autoscalingPolicie',
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
         * @alias dataproc.projects.locations.autoscalingPolicies.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The "resource name" of the autoscaling policy, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies.delete, the resource name  of the policy has the following format:  projects/{project_id}/regions/{region}/autoscalingPolicies/{policy_id} For projects.locations.autoscalingPolicies.delete, the resource name  of the policy has the following format:  projects/{project_id}/locations/{location}/autoscalingPolicies/{policy_id}
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Projects$Locations$Autoscalingpolicies$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Projects$Locations$Autoscalingpolicies$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Projects$Locations$Autoscalingpolicies$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Projects$Locations$Autoscalingpolicies$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Projects$Locations$Autoscalingpolicies$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * dataproc.projects.locations.autoscalingPolicies.get
         * @desc Retrieves autoscaling policy.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.locations.autoscalingPolicies.get({
         *     // Required. The "resource name" of the autoscaling policy, as described in https://cloud.google.com/apis/design/resource_names.
         *     // For projects.regions.autoscalingPolicies.get, the resource name  of the policy has the following format:  projects/{project_id}/regions/{region}/autoscalingPolicies/{policy_id}
         *     // For projects.locations.autoscalingPolicies.get, the resource name  of the policy has the following format:  projects/{project_id}/locations/{location}/autoscalingPolicies/{policy_id}
         *     name:
         *       'projects/my-project/locations/my-location/autoscalingPolicies/my-autoscalingPolicie',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "basicAlgorithm": {},
         *   //   "id": "my_id",
         *   //   "name": "my_name",
         *   //   "secondaryWorkerConfig": {},
         *   //   "workerConfig": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dataproc.projects.locations.autoscalingPolicies.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The "resource name" of the autoscaling policy, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies.get, the resource name  of the policy has the following format:  projects/{project_id}/regions/{region}/autoscalingPolicies/{policy_id} For projects.locations.autoscalingPolicies.get, the resource name  of the policy has the following format:  projects/{project_id}/locations/{location}/autoscalingPolicies/{policy_id}
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Locations$Autoscalingpolicies$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Locations$Autoscalingpolicies$Get, options?: MethodOptions): GaxiosPromise<Schema$AutoscalingPolicy>;
        get(params: Params$Resource$Projects$Locations$Autoscalingpolicies$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Locations$Autoscalingpolicies$Get, options: MethodOptions | BodyResponseCallback<Schema$AutoscalingPolicy>, callback: BodyResponseCallback<Schema$AutoscalingPolicy>): void;
        get(params: Params$Resource$Projects$Locations$Autoscalingpolicies$Get, callback: BodyResponseCallback<Schema$AutoscalingPolicy>): void;
        get(callback: BodyResponseCallback<Schema$AutoscalingPolicy>): void;
        /**
         * dataproc.projects.locations.autoscalingPolicies.getIamPolicy
         * @desc Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.locations.autoscalingPolicies.getIamPolicy(
         *     {
         *       // REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         *       resource:
         *         'projects/my-project/locations/my-location/autoscalingPolicies/my-autoscalingPolicie',
         *
         *       // Request body metadata
         *       requestBody: {
         *         // request body parameters
         *         // {
         *         //   "options": {}
         *         // }
         *       },
         *     }
         *   );
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
         * @alias dataproc.projects.locations.autoscalingPolicies.getIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         * @param {().GetIamPolicyRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getIamPolicy(params: Params$Resource$Projects$Locations$Autoscalingpolicies$Getiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getIamPolicy(params?: Params$Resource$Projects$Locations$Autoscalingpolicies$Getiampolicy, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        getIamPolicy(params: Params$Resource$Projects$Locations$Autoscalingpolicies$Getiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getIamPolicy(params: Params$Resource$Projects$Locations$Autoscalingpolicies$Getiampolicy, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        getIamPolicy(params: Params$Resource$Projects$Locations$Autoscalingpolicies$Getiampolicy, callback: BodyResponseCallback<Schema$Policy>): void;
        getIamPolicy(callback: BodyResponseCallback<Schema$Policy>): void;
        /**
         * dataproc.projects.locations.autoscalingPolicies.list
         * @desc Lists autoscaling policies in the project.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.locations.autoscalingPolicies.list({
         *     // Optional. The maximum number of results to return in each response. Must be less than or equal to 1000. Defaults to 100.
         *     pageSize: 'placeholder-value',
         *     // Optional. The page token, returned by a previous call, to request the next page of results.
         *     pageToken: 'placeholder-value',
         *     // Required. The "resource name" of the region or location, as described in https://cloud.google.com/apis/design/resource_names.
         *     // For projects.regions.autoscalingPolicies.list, the resource name  of the region has the following format:  projects/{project_id}/regions/{region}
         *     // For projects.locations.autoscalingPolicies.list, the resource name  of the location has the following format:  projects/{project_id}/locations/{location}
         *     parent: 'projects/my-project/locations/my-location',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "policies": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dataproc.projects.locations.autoscalingPolicies.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize Optional. The maximum number of results to return in each response. Must be less than or equal to 1000. Defaults to 100.
         * @param {string=} params.pageToken Optional. The page token, returned by a previous call, to request the next page of results.
         * @param {string} params.parent Required. The "resource name" of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies.list, the resource name  of the region has the following format:  projects/{project_id}/regions/{region} For projects.locations.autoscalingPolicies.list, the resource name  of the location has the following format:  projects/{project_id}/locations/{location}
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Locations$Autoscalingpolicies$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Locations$Autoscalingpolicies$List, options?: MethodOptions): GaxiosPromise<Schema$ListAutoscalingPoliciesResponse>;
        list(params: Params$Resource$Projects$Locations$Autoscalingpolicies$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Locations$Autoscalingpolicies$List, options: MethodOptions | BodyResponseCallback<Schema$ListAutoscalingPoliciesResponse>, callback: BodyResponseCallback<Schema$ListAutoscalingPoliciesResponse>): void;
        list(params: Params$Resource$Projects$Locations$Autoscalingpolicies$List, callback: BodyResponseCallback<Schema$ListAutoscalingPoliciesResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListAutoscalingPoliciesResponse>): void;
        /**
         * dataproc.projects.locations.autoscalingPolicies.setIamPolicy
         * @desc Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.locations.autoscalingPolicies.setIamPolicy(
         *     {
         *       // REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         *       resource:
         *         'projects/my-project/locations/my-location/autoscalingPolicies/my-autoscalingPolicie',
         *
         *       // Request body metadata
         *       requestBody: {
         *         // request body parameters
         *         // {
         *         //   "policy": {}
         *         // }
         *       },
         *     }
         *   );
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
         * @alias dataproc.projects.locations.autoscalingPolicies.setIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         * @param {().SetIamPolicyRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        setIamPolicy(params: Params$Resource$Projects$Locations$Autoscalingpolicies$Setiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        setIamPolicy(params?: Params$Resource$Projects$Locations$Autoscalingpolicies$Setiampolicy, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        setIamPolicy(params: Params$Resource$Projects$Locations$Autoscalingpolicies$Setiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        setIamPolicy(params: Params$Resource$Projects$Locations$Autoscalingpolicies$Setiampolicy, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        setIamPolicy(params: Params$Resource$Projects$Locations$Autoscalingpolicies$Setiampolicy, callback: BodyResponseCallback<Schema$Policy>): void;
        setIamPolicy(callback: BodyResponseCallback<Schema$Policy>): void;
        /**
         * dataproc.projects.locations.autoscalingPolicies.testIamPermissions
         * @desc Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.locations.autoscalingPolicies.testIamPermissions(
         *     {
         *       // REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         *       resource:
         *         'projects/my-project/locations/my-location/autoscalingPolicies/my-autoscalingPolicie',
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
         * @alias dataproc.projects.locations.autoscalingPolicies.testIamPermissions
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         * @param {().TestIamPermissionsRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        testIamPermissions(params: Params$Resource$Projects$Locations$Autoscalingpolicies$Testiampermissions, options: StreamMethodOptions): GaxiosPromise<Readable>;
        testIamPermissions(params?: Params$Resource$Projects$Locations$Autoscalingpolicies$Testiampermissions, options?: MethodOptions): GaxiosPromise<Schema$TestIamPermissionsResponse>;
        testIamPermissions(params: Params$Resource$Projects$Locations$Autoscalingpolicies$Testiampermissions, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        testIamPermissions(params: Params$Resource$Projects$Locations$Autoscalingpolicies$Testiampermissions, options: MethodOptions | BodyResponseCallback<Schema$TestIamPermissionsResponse>, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(params: Params$Resource$Projects$Locations$Autoscalingpolicies$Testiampermissions, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        /**
         * dataproc.projects.locations.autoscalingPolicies.update
         * @desc Updates (replaces) autoscaling policy.Disabled check for update_mask, because all updates will be full replacements.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.locations.autoscalingPolicies.update({
         *     // Output only. The "resource name" of the autoscaling policy, as described in https://cloud.google.com/apis/design/resource_names.
         *     // For projects.regions.autoscalingPolicies, the resource name of the  policy has the following format:  projects/{project_id}/regions/{region}/autoscalingPolicies/{policy_id}
         *     // For projects.locations.autoscalingPolicies, the resource name of the  policy has the following format:  projects/{project_id}/locations/{location}/autoscalingPolicies/{policy_id}
         *     name:
         *       'projects/my-project/locations/my-location/autoscalingPolicies/my-autoscalingPolicie',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "basicAlgorithm": {},
         *       //   "id": "my_id",
         *       //   "name": "my_name",
         *       //   "secondaryWorkerConfig": {},
         *       //   "workerConfig": {}
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "basicAlgorithm": {},
         *   //   "id": "my_id",
         *   //   "name": "my_name",
         *   //   "secondaryWorkerConfig": {},
         *   //   "workerConfig": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dataproc.projects.locations.autoscalingPolicies.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Output only. The "resource name" of the autoscaling policy, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies, the resource name of the  policy has the following format:  projects/{project_id}/regions/{region}/autoscalingPolicies/{policy_id} For projects.locations.autoscalingPolicies, the resource name of the  policy has the following format:  projects/{project_id}/locations/{location}/autoscalingPolicies/{policy_id}
         * @param {().AutoscalingPolicy} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Projects$Locations$Autoscalingpolicies$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Projects$Locations$Autoscalingpolicies$Update, options?: MethodOptions): GaxiosPromise<Schema$AutoscalingPolicy>;
        update(params: Params$Resource$Projects$Locations$Autoscalingpolicies$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Projects$Locations$Autoscalingpolicies$Update, options: MethodOptions | BodyResponseCallback<Schema$AutoscalingPolicy>, callback: BodyResponseCallback<Schema$AutoscalingPolicy>): void;
        update(params: Params$Resource$Projects$Locations$Autoscalingpolicies$Update, callback: BodyResponseCallback<Schema$AutoscalingPolicy>): void;
        update(callback: BodyResponseCallback<Schema$AutoscalingPolicy>): void;
    }
    export interface Params$Resource$Projects$Locations$Autoscalingpolicies$Create extends StandardParameters {
        /**
         * Required. The "resource name" of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies.create, the resource name  of the region has the following format:  projects/{project_id}/regions/{region} For projects.locations.autoscalingPolicies.create, the resource name  of the location has the following format:  projects/{project_id}/locations/{location}
         */
        parent?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$AutoscalingPolicy;
    }
    export interface Params$Resource$Projects$Locations$Autoscalingpolicies$Delete extends StandardParameters {
        /**
         * Required. The "resource name" of the autoscaling policy, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies.delete, the resource name  of the policy has the following format:  projects/{project_id}/regions/{region}/autoscalingPolicies/{policy_id} For projects.locations.autoscalingPolicies.delete, the resource name  of the policy has the following format:  projects/{project_id}/locations/{location}/autoscalingPolicies/{policy_id}
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Locations$Autoscalingpolicies$Get extends StandardParameters {
        /**
         * Required. The "resource name" of the autoscaling policy, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies.get, the resource name  of the policy has the following format:  projects/{project_id}/regions/{region}/autoscalingPolicies/{policy_id} For projects.locations.autoscalingPolicies.get, the resource name  of the policy has the following format:  projects/{project_id}/locations/{location}/autoscalingPolicies/{policy_id}
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Locations$Autoscalingpolicies$Getiampolicy extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$GetIamPolicyRequest;
    }
    export interface Params$Resource$Projects$Locations$Autoscalingpolicies$List extends StandardParameters {
        /**
         * Optional. The maximum number of results to return in each response. Must be less than or equal to 1000. Defaults to 100.
         */
        pageSize?: number;
        /**
         * Optional. The page token, returned by a previous call, to request the next page of results.
         */
        pageToken?: string;
        /**
         * Required. The "resource name" of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies.list, the resource name  of the region has the following format:  projects/{project_id}/regions/{region} For projects.locations.autoscalingPolicies.list, the resource name  of the location has the following format:  projects/{project_id}/locations/{location}
         */
        parent?: string;
    }
    export interface Params$Resource$Projects$Locations$Autoscalingpolicies$Setiampolicy extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$SetIamPolicyRequest;
    }
    export interface Params$Resource$Projects$Locations$Autoscalingpolicies$Testiampermissions extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$TestIamPermissionsRequest;
    }
    export interface Params$Resource$Projects$Locations$Autoscalingpolicies$Update extends StandardParameters {
        /**
         * Output only. The "resource name" of the autoscaling policy, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies, the resource name of the  policy has the following format:  projects/{project_id}/regions/{region}/autoscalingPolicies/{policy_id} For projects.locations.autoscalingPolicies, the resource name of the  policy has the following format:  projects/{project_id}/locations/{location}/autoscalingPolicies/{policy_id}
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$AutoscalingPolicy;
    }
    export class Resource$Projects$Locations$Workflowtemplates {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * dataproc.projects.locations.workflowTemplates.create
         * @desc Creates new workflow template.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.locations.workflowTemplates.create({
         *     // Required. The resource name of the region or location, as described in https://cloud.google.com/apis/design/resource_names.
         *     // For projects.regions.workflowTemplates,create, the resource name of the  region has the following format:  projects/{project_id}/regions/{region}
         *     // For projects.locations.workflowTemplates.create, the resource name of  the location has the following format:  projects/{project_id}/locations/{location}
         *     parent: 'projects/my-project/locations/my-location',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "createTime": "my_createTime",
         *       //   "id": "my_id",
         *       //   "jobs": [],
         *       //   "labels": {},
         *       //   "name": "my_name",
         *       //   "parameters": [],
         *       //   "placement": {},
         *       //   "updateTime": "my_updateTime",
         *       //   "version": 0
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "id": "my_id",
         *   //   "jobs": [],
         *   //   "labels": {},
         *   //   "name": "my_name",
         *   //   "parameters": [],
         *   //   "placement": {},
         *   //   "updateTime": "my_updateTime",
         *   //   "version": 0
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dataproc.projects.locations.workflowTemplates.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent Required. The resource name of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates,create, the resource name of the  region has the following format:  projects/{project_id}/regions/{region} For projects.locations.workflowTemplates.create, the resource name of  the location has the following format:  projects/{project_id}/locations/{location}
         * @param {().WorkflowTemplate} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Projects$Locations$Workflowtemplates$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Projects$Locations$Workflowtemplates$Create, options?: MethodOptions): GaxiosPromise<Schema$WorkflowTemplate>;
        create(params: Params$Resource$Projects$Locations$Workflowtemplates$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Projects$Locations$Workflowtemplates$Create, options: MethodOptions | BodyResponseCallback<Schema$WorkflowTemplate>, callback: BodyResponseCallback<Schema$WorkflowTemplate>): void;
        create(params: Params$Resource$Projects$Locations$Workflowtemplates$Create, callback: BodyResponseCallback<Schema$WorkflowTemplate>): void;
        create(callback: BodyResponseCallback<Schema$WorkflowTemplate>): void;
        /**
         * dataproc.projects.locations.workflowTemplates.delete
         * @desc Deletes a workflow template. It does not cancel in-progress workflows.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.locations.workflowTemplates.delete({
         *     // Required. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names.
         *     // For projects.regions.workflowTemplates.delete, the resource name of the template has the following format:  projects/{project_id}/regions/{region}/workflowTemplates/{template_id}
         *     // For projects.locations.workflowTemplates.instantiate, the resource name  of the template has the following format:  projects/{project_id}/locations/{location}/workflowTemplates/{template_id}
         *     name:
         *       'projects/my-project/locations/my-location/workflowTemplates/my-workflowTemplate',
         *     // Optional. The version of workflow template to delete. If specified, will only delete the template if the current server version matches specified version.
         *     version: 'placeholder-value',
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
         * @alias dataproc.projects.locations.workflowTemplates.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates.delete, the resource name of the template has the following format:  projects/{project_id}/regions/{region}/workflowTemplates/{template_id} For projects.locations.workflowTemplates.instantiate, the resource name  of the template has the following format:  projects/{project_id}/locations/{location}/workflowTemplates/{template_id}
         * @param {integer=} params.version Optional. The version of workflow template to delete. If specified, will only delete the template if the current server version matches specified version.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Projects$Locations$Workflowtemplates$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Projects$Locations$Workflowtemplates$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Projects$Locations$Workflowtemplates$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Projects$Locations$Workflowtemplates$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Projects$Locations$Workflowtemplates$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * dataproc.projects.locations.workflowTemplates.get
         * @desc Retrieves the latest workflow template.Can retrieve previously instantiated template by specifying optional version parameter.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.locations.workflowTemplates.get({
         *     // Required. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names.
         *     // For projects.regions.workflowTemplates.get, the resource name of the  template has the following format:  projects/{project_id}/regions/{region}/workflowTemplates/{template_id}
         *     // For projects.locations.workflowTemplates.get, the resource name of the  template has the following format:  projects/{project_id}/locations/{location}/workflowTemplates/{template_id}
         *     name:
         *       'projects/my-project/locations/my-location/workflowTemplates/my-workflowTemplate',
         *     // Optional. The version of workflow template to retrieve. Only previously instantiated versions can be retrieved.If unspecified, retrieves the current version.
         *     version: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "id": "my_id",
         *   //   "jobs": [],
         *   //   "labels": {},
         *   //   "name": "my_name",
         *   //   "parameters": [],
         *   //   "placement": {},
         *   //   "updateTime": "my_updateTime",
         *   //   "version": 0
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dataproc.projects.locations.workflowTemplates.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates.get, the resource name of the  template has the following format:  projects/{project_id}/regions/{region}/workflowTemplates/{template_id} For projects.locations.workflowTemplates.get, the resource name of the  template has the following format:  projects/{project_id}/locations/{location}/workflowTemplates/{template_id}
         * @param {integer=} params.version Optional. The version of workflow template to retrieve. Only previously instantiated versions can be retrieved.If unspecified, retrieves the current version.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Locations$Workflowtemplates$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Locations$Workflowtemplates$Get, options?: MethodOptions): GaxiosPromise<Schema$WorkflowTemplate>;
        get(params: Params$Resource$Projects$Locations$Workflowtemplates$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Locations$Workflowtemplates$Get, options: MethodOptions | BodyResponseCallback<Schema$WorkflowTemplate>, callback: BodyResponseCallback<Schema$WorkflowTemplate>): void;
        get(params: Params$Resource$Projects$Locations$Workflowtemplates$Get, callback: BodyResponseCallback<Schema$WorkflowTemplate>): void;
        get(callback: BodyResponseCallback<Schema$WorkflowTemplate>): void;
        /**
         * dataproc.projects.locations.workflowTemplates.getIamPolicy
         * @desc Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.locations.workflowTemplates.getIamPolicy({
         *     // REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         *     resource:
         *       'projects/my-project/locations/my-location/workflowTemplates/my-workflowTemplate',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "options": {}
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
         * @alias dataproc.projects.locations.workflowTemplates.getIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         * @param {().GetIamPolicyRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getIamPolicy(params: Params$Resource$Projects$Locations$Workflowtemplates$Getiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getIamPolicy(params?: Params$Resource$Projects$Locations$Workflowtemplates$Getiampolicy, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        getIamPolicy(params: Params$Resource$Projects$Locations$Workflowtemplates$Getiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getIamPolicy(params: Params$Resource$Projects$Locations$Workflowtemplates$Getiampolicy, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        getIamPolicy(params: Params$Resource$Projects$Locations$Workflowtemplates$Getiampolicy, callback: BodyResponseCallback<Schema$Policy>): void;
        getIamPolicy(callback: BodyResponseCallback<Schema$Policy>): void;
        /**
         * dataproc.projects.locations.workflowTemplates.instantiate
         * @desc Instantiates a template and begins execution.The returned Operation can be used to track execution of workflow by polling operations.get. The Operation will complete when entire workflow is finished.The running workflow can be aborted via operations.cancel. This will cause any inflight jobs to be cancelled and workflow-owned clusters to be deleted.The Operation.metadata will be WorkflowMetadata (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#workflowmetadata). Also see Using WorkflowMetadata (https://cloud.google.com/dataproc/docs/concepts/workflows/debugging#using_workflowmetadata).On successful completion, Operation.response will be Empty.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.locations.workflowTemplates.instantiate({
         *     // Required. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names.
         *     // For projects.regions.workflowTemplates.instantiate, the resource name of the template has the following format:  projects/{project_id}/regions/{region}/workflowTemplates/{template_id}
         *     // For projects.locations.workflowTemplates.instantiate, the resource name  of the template has the following format:  projects/{project_id}/locations/{location}/workflowTemplates/{template_id}
         *     name:
         *       'projects/my-project/locations/my-location/workflowTemplates/my-workflowTemplate',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "parameters": {},
         *       //   "requestId": "my_requestId",
         *       //   "version": 0
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
         * @alias dataproc.projects.locations.workflowTemplates.instantiate
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates.instantiate, the resource name of the template has the following format:  projects/{project_id}/regions/{region}/workflowTemplates/{template_id} For projects.locations.workflowTemplates.instantiate, the resource name  of the template has the following format:  projects/{project_id}/locations/{location}/workflowTemplates/{template_id}
         * @param {().InstantiateWorkflowTemplateRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        instantiate(params: Params$Resource$Projects$Locations$Workflowtemplates$Instantiate, options: StreamMethodOptions): GaxiosPromise<Readable>;
        instantiate(params?: Params$Resource$Projects$Locations$Workflowtemplates$Instantiate, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        instantiate(params: Params$Resource$Projects$Locations$Workflowtemplates$Instantiate, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        instantiate(params: Params$Resource$Projects$Locations$Workflowtemplates$Instantiate, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        instantiate(params: Params$Resource$Projects$Locations$Workflowtemplates$Instantiate, callback: BodyResponseCallback<Schema$Operation>): void;
        instantiate(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * dataproc.projects.locations.workflowTemplates.instantiateInline
         * @desc Instantiates a template and begins execution.This method is equivalent to executing the sequence CreateWorkflowTemplate, InstantiateWorkflowTemplate, DeleteWorkflowTemplate.The returned Operation can be used to track execution of workflow by polling operations.get. The Operation will complete when entire workflow is finished.The running workflow can be aborted via operations.cancel. This will cause any inflight jobs to be cancelled and workflow-owned clusters to be deleted.The Operation.metadata will be WorkflowMetadata (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#workflowmetadata). Also see Using WorkflowMetadata (https://cloud.google.com/dataproc/docs/concepts/workflows/debugging#using_workflowmetadata).On successful completion, Operation.response will be Empty.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.locations.workflowTemplates.instantiateInline(
         *     {
         *       // Required. The resource name of the region or location, as described in https://cloud.google.com/apis/design/resource_names.
         *       // For projects.regions.workflowTemplates,instantiateinline, the resource  name of the region has the following format:  projects/{project_id}/regions/{region}
         *       // For projects.locations.workflowTemplates.instantiateinline, the  resource name of the location has the following format:  projects/{project_id}/locations/{location}
         *       parent: 'projects/my-project/locations/my-location',
         *       // Optional. A tag that prevents multiple concurrent workflow instances with the same tag from running. This mitigates risk of concurrent instances started due to retries.It is recommended to always set this value to a UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier).The tag must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters.
         *       requestId: 'placeholder-value',
         *
         *       // Request body metadata
         *       requestBody: {
         *         // request body parameters
         *         // {
         *         //   "createTime": "my_createTime",
         *         //   "id": "my_id",
         *         //   "jobs": [],
         *         //   "labels": {},
         *         //   "name": "my_name",
         *         //   "parameters": [],
         *         //   "placement": {},
         *         //   "updateTime": "my_updateTime",
         *         //   "version": 0
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
         * @alias dataproc.projects.locations.workflowTemplates.instantiateInline
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent Required. The resource name of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates,instantiateinline, the resource  name of the region has the following format:  projects/{project_id}/regions/{region} For projects.locations.workflowTemplates.instantiateinline, the  resource name of the location has the following format:  projects/{project_id}/locations/{location}
         * @param {string=} params.requestId Optional. A tag that prevents multiple concurrent workflow instances with the same tag from running. This mitigates risk of concurrent instances started due to retries.It is recommended to always set this value to a UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier).The tag must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters.
         * @param {().WorkflowTemplate} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        instantiateInline(params: Params$Resource$Projects$Locations$Workflowtemplates$Instantiateinline, options: StreamMethodOptions): GaxiosPromise<Readable>;
        instantiateInline(params?: Params$Resource$Projects$Locations$Workflowtemplates$Instantiateinline, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        instantiateInline(params: Params$Resource$Projects$Locations$Workflowtemplates$Instantiateinline, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        instantiateInline(params: Params$Resource$Projects$Locations$Workflowtemplates$Instantiateinline, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        instantiateInline(params: Params$Resource$Projects$Locations$Workflowtemplates$Instantiateinline, callback: BodyResponseCallback<Schema$Operation>): void;
        instantiateInline(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * dataproc.projects.locations.workflowTemplates.list
         * @desc Lists workflows that match the specified filter in the request.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.locations.workflowTemplates.list({
         *     // Optional. The maximum number of results to return in each response.
         *     pageSize: 'placeholder-value',
         *     // Optional. The page token, returned by a previous call, to request the next page of results.
         *     pageToken: 'placeholder-value',
         *     // Required. The resource name of the region or location, as described in https://cloud.google.com/apis/design/resource_names.
         *     // For projects.regions.workflowTemplates,list, the resource  name of the region has the following format:  projects/{project_id}/regions/{region}
         *     // For projects.locations.workflowTemplates.list, the  resource name of the location has the following format:  projects/{project_id}/locations/{location}
         *     parent: 'projects/my-project/locations/my-location',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "templates": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dataproc.projects.locations.workflowTemplates.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize Optional. The maximum number of results to return in each response.
         * @param {string=} params.pageToken Optional. The page token, returned by a previous call, to request the next page of results.
         * @param {string} params.parent Required. The resource name of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates,list, the resource  name of the region has the following format:  projects/{project_id}/regions/{region} For projects.locations.workflowTemplates.list, the  resource name of the location has the following format:  projects/{project_id}/locations/{location}
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Locations$Workflowtemplates$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Locations$Workflowtemplates$List, options?: MethodOptions): GaxiosPromise<Schema$ListWorkflowTemplatesResponse>;
        list(params: Params$Resource$Projects$Locations$Workflowtemplates$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Locations$Workflowtemplates$List, options: MethodOptions | BodyResponseCallback<Schema$ListWorkflowTemplatesResponse>, callback: BodyResponseCallback<Schema$ListWorkflowTemplatesResponse>): void;
        list(params: Params$Resource$Projects$Locations$Workflowtemplates$List, callback: BodyResponseCallback<Schema$ListWorkflowTemplatesResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListWorkflowTemplatesResponse>): void;
        /**
         * dataproc.projects.locations.workflowTemplates.setIamPolicy
         * @desc Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.locations.workflowTemplates.setIamPolicy({
         *     // REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         *     resource:
         *       'projects/my-project/locations/my-location/workflowTemplates/my-workflowTemplate',
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
         * @alias dataproc.projects.locations.workflowTemplates.setIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         * @param {().SetIamPolicyRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        setIamPolicy(params: Params$Resource$Projects$Locations$Workflowtemplates$Setiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        setIamPolicy(params?: Params$Resource$Projects$Locations$Workflowtemplates$Setiampolicy, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        setIamPolicy(params: Params$Resource$Projects$Locations$Workflowtemplates$Setiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        setIamPolicy(params: Params$Resource$Projects$Locations$Workflowtemplates$Setiampolicy, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        setIamPolicy(params: Params$Resource$Projects$Locations$Workflowtemplates$Setiampolicy, callback: BodyResponseCallback<Schema$Policy>): void;
        setIamPolicy(callback: BodyResponseCallback<Schema$Policy>): void;
        /**
         * dataproc.projects.locations.workflowTemplates.testIamPermissions
         * @desc Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.locations.workflowTemplates.testIamPermissions(
         *     {
         *       // REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         *       resource:
         *         'projects/my-project/locations/my-location/workflowTemplates/my-workflowTemplate',
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
         * @alias dataproc.projects.locations.workflowTemplates.testIamPermissions
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         * @param {().TestIamPermissionsRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        testIamPermissions(params: Params$Resource$Projects$Locations$Workflowtemplates$Testiampermissions, options: StreamMethodOptions): GaxiosPromise<Readable>;
        testIamPermissions(params?: Params$Resource$Projects$Locations$Workflowtemplates$Testiampermissions, options?: MethodOptions): GaxiosPromise<Schema$TestIamPermissionsResponse>;
        testIamPermissions(params: Params$Resource$Projects$Locations$Workflowtemplates$Testiampermissions, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        testIamPermissions(params: Params$Resource$Projects$Locations$Workflowtemplates$Testiampermissions, options: MethodOptions | BodyResponseCallback<Schema$TestIamPermissionsResponse>, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(params: Params$Resource$Projects$Locations$Workflowtemplates$Testiampermissions, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        /**
         * dataproc.projects.locations.workflowTemplates.update
         * @desc Updates (replaces) workflow template. The updated template must contain version that matches the current server version.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.locations.workflowTemplates.update({
         *     // Output only. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names.
         *     // For projects.regions.workflowTemplates, the resource name of the  template has the following format:  projects/{project_id}/regions/{region}/workflowTemplates/{template_id}
         *     // For projects.locations.workflowTemplates, the resource name of the  template has the following format:  projects/{project_id}/locations/{location}/workflowTemplates/{template_id}
         *     name:
         *       'projects/my-project/locations/my-location/workflowTemplates/my-workflowTemplate',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "createTime": "my_createTime",
         *       //   "id": "my_id",
         *       //   "jobs": [],
         *       //   "labels": {},
         *       //   "name": "my_name",
         *       //   "parameters": [],
         *       //   "placement": {},
         *       //   "updateTime": "my_updateTime",
         *       //   "version": 0
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "id": "my_id",
         *   //   "jobs": [],
         *   //   "labels": {},
         *   //   "name": "my_name",
         *   //   "parameters": [],
         *   //   "placement": {},
         *   //   "updateTime": "my_updateTime",
         *   //   "version": 0
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dataproc.projects.locations.workflowTemplates.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Output only. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates, the resource name of the  template has the following format:  projects/{project_id}/regions/{region}/workflowTemplates/{template_id} For projects.locations.workflowTemplates, the resource name of the  template has the following format:  projects/{project_id}/locations/{location}/workflowTemplates/{template_id}
         * @param {().WorkflowTemplate} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Projects$Locations$Workflowtemplates$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Projects$Locations$Workflowtemplates$Update, options?: MethodOptions): GaxiosPromise<Schema$WorkflowTemplate>;
        update(params: Params$Resource$Projects$Locations$Workflowtemplates$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Projects$Locations$Workflowtemplates$Update, options: MethodOptions | BodyResponseCallback<Schema$WorkflowTemplate>, callback: BodyResponseCallback<Schema$WorkflowTemplate>): void;
        update(params: Params$Resource$Projects$Locations$Workflowtemplates$Update, callback: BodyResponseCallback<Schema$WorkflowTemplate>): void;
        update(callback: BodyResponseCallback<Schema$WorkflowTemplate>): void;
    }
    export interface Params$Resource$Projects$Locations$Workflowtemplates$Create extends StandardParameters {
        /**
         * Required. The resource name of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates,create, the resource name of the  region has the following format:  projects/{project_id}/regions/{region} For projects.locations.workflowTemplates.create, the resource name of  the location has the following format:  projects/{project_id}/locations/{location}
         */
        parent?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$WorkflowTemplate;
    }
    export interface Params$Resource$Projects$Locations$Workflowtemplates$Delete extends StandardParameters {
        /**
         * Required. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates.delete, the resource name of the template has the following format:  projects/{project_id}/regions/{region}/workflowTemplates/{template_id} For projects.locations.workflowTemplates.instantiate, the resource name  of the template has the following format:  projects/{project_id}/locations/{location}/workflowTemplates/{template_id}
         */
        name?: string;
        /**
         * Optional. The version of workflow template to delete. If specified, will only delete the template if the current server version matches specified version.
         */
        version?: number;
    }
    export interface Params$Resource$Projects$Locations$Workflowtemplates$Get extends StandardParameters {
        /**
         * Required. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates.get, the resource name of the  template has the following format:  projects/{project_id}/regions/{region}/workflowTemplates/{template_id} For projects.locations.workflowTemplates.get, the resource name of the  template has the following format:  projects/{project_id}/locations/{location}/workflowTemplates/{template_id}
         */
        name?: string;
        /**
         * Optional. The version of workflow template to retrieve. Only previously instantiated versions can be retrieved.If unspecified, retrieves the current version.
         */
        version?: number;
    }
    export interface Params$Resource$Projects$Locations$Workflowtemplates$Getiampolicy extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$GetIamPolicyRequest;
    }
    export interface Params$Resource$Projects$Locations$Workflowtemplates$Instantiate extends StandardParameters {
        /**
         * Required. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates.instantiate, the resource name of the template has the following format:  projects/{project_id}/regions/{region}/workflowTemplates/{template_id} For projects.locations.workflowTemplates.instantiate, the resource name  of the template has the following format:  projects/{project_id}/locations/{location}/workflowTemplates/{template_id}
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$InstantiateWorkflowTemplateRequest;
    }
    export interface Params$Resource$Projects$Locations$Workflowtemplates$Instantiateinline extends StandardParameters {
        /**
         * Required. The resource name of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates,instantiateinline, the resource  name of the region has the following format:  projects/{project_id}/regions/{region} For projects.locations.workflowTemplates.instantiateinline, the  resource name of the location has the following format:  projects/{project_id}/locations/{location}
         */
        parent?: string;
        /**
         * Optional. A tag that prevents multiple concurrent workflow instances with the same tag from running. This mitigates risk of concurrent instances started due to retries.It is recommended to always set this value to a UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier).The tag must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters.
         */
        requestId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$WorkflowTemplate;
    }
    export interface Params$Resource$Projects$Locations$Workflowtemplates$List extends StandardParameters {
        /**
         * Optional. The maximum number of results to return in each response.
         */
        pageSize?: number;
        /**
         * Optional. The page token, returned by a previous call, to request the next page of results.
         */
        pageToken?: string;
        /**
         * Required. The resource name of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates,list, the resource  name of the region has the following format:  projects/{project_id}/regions/{region} For projects.locations.workflowTemplates.list, the  resource name of the location has the following format:  projects/{project_id}/locations/{location}
         */
        parent?: string;
    }
    export interface Params$Resource$Projects$Locations$Workflowtemplates$Setiampolicy extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$SetIamPolicyRequest;
    }
    export interface Params$Resource$Projects$Locations$Workflowtemplates$Testiampermissions extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$TestIamPermissionsRequest;
    }
    export interface Params$Resource$Projects$Locations$Workflowtemplates$Update extends StandardParameters {
        /**
         * Output only. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates, the resource name of the  template has the following format:  projects/{project_id}/regions/{region}/workflowTemplates/{template_id} For projects.locations.workflowTemplates, the resource name of the  template has the following format:  projects/{project_id}/locations/{location}/workflowTemplates/{template_id}
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$WorkflowTemplate;
    }
    export class Resource$Projects$Regions {
        context: APIRequestContext;
        autoscalingPolicies: Resource$Projects$Regions$Autoscalingpolicies;
        clusters: Resource$Projects$Regions$Clusters;
        jobs: Resource$Projects$Regions$Jobs;
        operations: Resource$Projects$Regions$Operations;
        workflowTemplates: Resource$Projects$Regions$Workflowtemplates;
        constructor(context: APIRequestContext);
    }
    export class Resource$Projects$Regions$Autoscalingpolicies {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * dataproc.projects.regions.autoscalingPolicies.create
         * @desc Creates new autoscaling policy.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.autoscalingPolicies.create({
         *     // Required. The "resource name" of the region or location, as described in https://cloud.google.com/apis/design/resource_names.
         *     // For projects.regions.autoscalingPolicies.create, the resource name  of the region has the following format:  projects/{project_id}/regions/{region}
         *     // For projects.locations.autoscalingPolicies.create, the resource name  of the location has the following format:  projects/{project_id}/locations/{location}
         *     parent: 'projects/my-project/regions/my-region',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "basicAlgorithm": {},
         *       //   "id": "my_id",
         *       //   "name": "my_name",
         *       //   "secondaryWorkerConfig": {},
         *       //   "workerConfig": {}
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "basicAlgorithm": {},
         *   //   "id": "my_id",
         *   //   "name": "my_name",
         *   //   "secondaryWorkerConfig": {},
         *   //   "workerConfig": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dataproc.projects.regions.autoscalingPolicies.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent Required. The "resource name" of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies.create, the resource name  of the region has the following format:  projects/{project_id}/regions/{region} For projects.locations.autoscalingPolicies.create, the resource name  of the location has the following format:  projects/{project_id}/locations/{location}
         * @param {().AutoscalingPolicy} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Projects$Regions$Autoscalingpolicies$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Projects$Regions$Autoscalingpolicies$Create, options?: MethodOptions): GaxiosPromise<Schema$AutoscalingPolicy>;
        create(params: Params$Resource$Projects$Regions$Autoscalingpolicies$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Projects$Regions$Autoscalingpolicies$Create, options: MethodOptions | BodyResponseCallback<Schema$AutoscalingPolicy>, callback: BodyResponseCallback<Schema$AutoscalingPolicy>): void;
        create(params: Params$Resource$Projects$Regions$Autoscalingpolicies$Create, callback: BodyResponseCallback<Schema$AutoscalingPolicy>): void;
        create(callback: BodyResponseCallback<Schema$AutoscalingPolicy>): void;
        /**
         * dataproc.projects.regions.autoscalingPolicies.delete
         * @desc Deletes an autoscaling policy. It is an error to delete an autoscaling policy that is in use by one or more clusters.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.autoscalingPolicies.delete({
         *     // Required. The "resource name" of the autoscaling policy, as described in https://cloud.google.com/apis/design/resource_names.
         *     // For projects.regions.autoscalingPolicies.delete, the resource name  of the policy has the following format:  projects/{project_id}/regions/{region}/autoscalingPolicies/{policy_id}
         *     // For projects.locations.autoscalingPolicies.delete, the resource name  of the policy has the following format:  projects/{project_id}/locations/{location}/autoscalingPolicies/{policy_id}
         *     name:
         *       'projects/my-project/regions/my-region/autoscalingPolicies/my-autoscalingPolicie',
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
         * @alias dataproc.projects.regions.autoscalingPolicies.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The "resource name" of the autoscaling policy, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies.delete, the resource name  of the policy has the following format:  projects/{project_id}/regions/{region}/autoscalingPolicies/{policy_id} For projects.locations.autoscalingPolicies.delete, the resource name  of the policy has the following format:  projects/{project_id}/locations/{location}/autoscalingPolicies/{policy_id}
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Projects$Regions$Autoscalingpolicies$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Projects$Regions$Autoscalingpolicies$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Projects$Regions$Autoscalingpolicies$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Projects$Regions$Autoscalingpolicies$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Projects$Regions$Autoscalingpolicies$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * dataproc.projects.regions.autoscalingPolicies.get
         * @desc Retrieves autoscaling policy.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.autoscalingPolicies.get({
         *     // Required. The "resource name" of the autoscaling policy, as described in https://cloud.google.com/apis/design/resource_names.
         *     // For projects.regions.autoscalingPolicies.get, the resource name  of the policy has the following format:  projects/{project_id}/regions/{region}/autoscalingPolicies/{policy_id}
         *     // For projects.locations.autoscalingPolicies.get, the resource name  of the policy has the following format:  projects/{project_id}/locations/{location}/autoscalingPolicies/{policy_id}
         *     name:
         *       'projects/my-project/regions/my-region/autoscalingPolicies/my-autoscalingPolicie',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "basicAlgorithm": {},
         *   //   "id": "my_id",
         *   //   "name": "my_name",
         *   //   "secondaryWorkerConfig": {},
         *   //   "workerConfig": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dataproc.projects.regions.autoscalingPolicies.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The "resource name" of the autoscaling policy, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies.get, the resource name  of the policy has the following format:  projects/{project_id}/regions/{region}/autoscalingPolicies/{policy_id} For projects.locations.autoscalingPolicies.get, the resource name  of the policy has the following format:  projects/{project_id}/locations/{location}/autoscalingPolicies/{policy_id}
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Regions$Autoscalingpolicies$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Regions$Autoscalingpolicies$Get, options?: MethodOptions): GaxiosPromise<Schema$AutoscalingPolicy>;
        get(params: Params$Resource$Projects$Regions$Autoscalingpolicies$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Regions$Autoscalingpolicies$Get, options: MethodOptions | BodyResponseCallback<Schema$AutoscalingPolicy>, callback: BodyResponseCallback<Schema$AutoscalingPolicy>): void;
        get(params: Params$Resource$Projects$Regions$Autoscalingpolicies$Get, callback: BodyResponseCallback<Schema$AutoscalingPolicy>): void;
        get(callback: BodyResponseCallback<Schema$AutoscalingPolicy>): void;
        /**
         * dataproc.projects.regions.autoscalingPolicies.getIamPolicy
         * @desc Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.autoscalingPolicies.getIamPolicy({
         *     // REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         *     resource:
         *       'projects/my-project/regions/my-region/autoscalingPolicies/my-autoscalingPolicie',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "options": {}
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
         * @alias dataproc.projects.regions.autoscalingPolicies.getIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         * @param {().GetIamPolicyRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getIamPolicy(params: Params$Resource$Projects$Regions$Autoscalingpolicies$Getiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getIamPolicy(params?: Params$Resource$Projects$Regions$Autoscalingpolicies$Getiampolicy, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        getIamPolicy(params: Params$Resource$Projects$Regions$Autoscalingpolicies$Getiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getIamPolicy(params: Params$Resource$Projects$Regions$Autoscalingpolicies$Getiampolicy, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        getIamPolicy(params: Params$Resource$Projects$Regions$Autoscalingpolicies$Getiampolicy, callback: BodyResponseCallback<Schema$Policy>): void;
        getIamPolicy(callback: BodyResponseCallback<Schema$Policy>): void;
        /**
         * dataproc.projects.regions.autoscalingPolicies.list
         * @desc Lists autoscaling policies in the project.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.autoscalingPolicies.list({
         *     // Optional. The maximum number of results to return in each response. Must be less than or equal to 1000. Defaults to 100.
         *     pageSize: 'placeholder-value',
         *     // Optional. The page token, returned by a previous call, to request the next page of results.
         *     pageToken: 'placeholder-value',
         *     // Required. The "resource name" of the region or location, as described in https://cloud.google.com/apis/design/resource_names.
         *     // For projects.regions.autoscalingPolicies.list, the resource name  of the region has the following format:  projects/{project_id}/regions/{region}
         *     // For projects.locations.autoscalingPolicies.list, the resource name  of the location has the following format:  projects/{project_id}/locations/{location}
         *     parent: 'projects/my-project/regions/my-region',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "policies": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dataproc.projects.regions.autoscalingPolicies.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize Optional. The maximum number of results to return in each response. Must be less than or equal to 1000. Defaults to 100.
         * @param {string=} params.pageToken Optional. The page token, returned by a previous call, to request the next page of results.
         * @param {string} params.parent Required. The "resource name" of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies.list, the resource name  of the region has the following format:  projects/{project_id}/regions/{region} For projects.locations.autoscalingPolicies.list, the resource name  of the location has the following format:  projects/{project_id}/locations/{location}
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Regions$Autoscalingpolicies$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Regions$Autoscalingpolicies$List, options?: MethodOptions): GaxiosPromise<Schema$ListAutoscalingPoliciesResponse>;
        list(params: Params$Resource$Projects$Regions$Autoscalingpolicies$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Regions$Autoscalingpolicies$List, options: MethodOptions | BodyResponseCallback<Schema$ListAutoscalingPoliciesResponse>, callback: BodyResponseCallback<Schema$ListAutoscalingPoliciesResponse>): void;
        list(params: Params$Resource$Projects$Regions$Autoscalingpolicies$List, callback: BodyResponseCallback<Schema$ListAutoscalingPoliciesResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListAutoscalingPoliciesResponse>): void;
        /**
         * dataproc.projects.regions.autoscalingPolicies.setIamPolicy
         * @desc Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.autoscalingPolicies.setIamPolicy({
         *     // REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         *     resource:
         *       'projects/my-project/regions/my-region/autoscalingPolicies/my-autoscalingPolicie',
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
         * @alias dataproc.projects.regions.autoscalingPolicies.setIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         * @param {().SetIamPolicyRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        setIamPolicy(params: Params$Resource$Projects$Regions$Autoscalingpolicies$Setiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        setIamPolicy(params?: Params$Resource$Projects$Regions$Autoscalingpolicies$Setiampolicy, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        setIamPolicy(params: Params$Resource$Projects$Regions$Autoscalingpolicies$Setiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        setIamPolicy(params: Params$Resource$Projects$Regions$Autoscalingpolicies$Setiampolicy, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        setIamPolicy(params: Params$Resource$Projects$Regions$Autoscalingpolicies$Setiampolicy, callback: BodyResponseCallback<Schema$Policy>): void;
        setIamPolicy(callback: BodyResponseCallback<Schema$Policy>): void;
        /**
         * dataproc.projects.regions.autoscalingPolicies.testIamPermissions
         * @desc Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.autoscalingPolicies.testIamPermissions(
         *     {
         *       // REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         *       resource:
         *         'projects/my-project/regions/my-region/autoscalingPolicies/my-autoscalingPolicie',
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
         * @alias dataproc.projects.regions.autoscalingPolicies.testIamPermissions
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         * @param {().TestIamPermissionsRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        testIamPermissions(params: Params$Resource$Projects$Regions$Autoscalingpolicies$Testiampermissions, options: StreamMethodOptions): GaxiosPromise<Readable>;
        testIamPermissions(params?: Params$Resource$Projects$Regions$Autoscalingpolicies$Testiampermissions, options?: MethodOptions): GaxiosPromise<Schema$TestIamPermissionsResponse>;
        testIamPermissions(params: Params$Resource$Projects$Regions$Autoscalingpolicies$Testiampermissions, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        testIamPermissions(params: Params$Resource$Projects$Regions$Autoscalingpolicies$Testiampermissions, options: MethodOptions | BodyResponseCallback<Schema$TestIamPermissionsResponse>, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(params: Params$Resource$Projects$Regions$Autoscalingpolicies$Testiampermissions, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        /**
         * dataproc.projects.regions.autoscalingPolicies.update
         * @desc Updates (replaces) autoscaling policy.Disabled check for update_mask, because all updates will be full replacements.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.autoscalingPolicies.update({
         *     // Output only. The "resource name" of the autoscaling policy, as described in https://cloud.google.com/apis/design/resource_names.
         *     // For projects.regions.autoscalingPolicies, the resource name of the  policy has the following format:  projects/{project_id}/regions/{region}/autoscalingPolicies/{policy_id}
         *     // For projects.locations.autoscalingPolicies, the resource name of the  policy has the following format:  projects/{project_id}/locations/{location}/autoscalingPolicies/{policy_id}
         *     name:
         *       'projects/my-project/regions/my-region/autoscalingPolicies/my-autoscalingPolicie',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "basicAlgorithm": {},
         *       //   "id": "my_id",
         *       //   "name": "my_name",
         *       //   "secondaryWorkerConfig": {},
         *       //   "workerConfig": {}
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "basicAlgorithm": {},
         *   //   "id": "my_id",
         *   //   "name": "my_name",
         *   //   "secondaryWorkerConfig": {},
         *   //   "workerConfig": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dataproc.projects.regions.autoscalingPolicies.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Output only. The "resource name" of the autoscaling policy, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies, the resource name of the  policy has the following format:  projects/{project_id}/regions/{region}/autoscalingPolicies/{policy_id} For projects.locations.autoscalingPolicies, the resource name of the  policy has the following format:  projects/{project_id}/locations/{location}/autoscalingPolicies/{policy_id}
         * @param {().AutoscalingPolicy} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Projects$Regions$Autoscalingpolicies$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Projects$Regions$Autoscalingpolicies$Update, options?: MethodOptions): GaxiosPromise<Schema$AutoscalingPolicy>;
        update(params: Params$Resource$Projects$Regions$Autoscalingpolicies$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Projects$Regions$Autoscalingpolicies$Update, options: MethodOptions | BodyResponseCallback<Schema$AutoscalingPolicy>, callback: BodyResponseCallback<Schema$AutoscalingPolicy>): void;
        update(params: Params$Resource$Projects$Regions$Autoscalingpolicies$Update, callback: BodyResponseCallback<Schema$AutoscalingPolicy>): void;
        update(callback: BodyResponseCallback<Schema$AutoscalingPolicy>): void;
    }
    export interface Params$Resource$Projects$Regions$Autoscalingpolicies$Create extends StandardParameters {
        /**
         * Required. The "resource name" of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies.create, the resource name  of the region has the following format:  projects/{project_id}/regions/{region} For projects.locations.autoscalingPolicies.create, the resource name  of the location has the following format:  projects/{project_id}/locations/{location}
         */
        parent?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$AutoscalingPolicy;
    }
    export interface Params$Resource$Projects$Regions$Autoscalingpolicies$Delete extends StandardParameters {
        /**
         * Required. The "resource name" of the autoscaling policy, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies.delete, the resource name  of the policy has the following format:  projects/{project_id}/regions/{region}/autoscalingPolicies/{policy_id} For projects.locations.autoscalingPolicies.delete, the resource name  of the policy has the following format:  projects/{project_id}/locations/{location}/autoscalingPolicies/{policy_id}
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Regions$Autoscalingpolicies$Get extends StandardParameters {
        /**
         * Required. The "resource name" of the autoscaling policy, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies.get, the resource name  of the policy has the following format:  projects/{project_id}/regions/{region}/autoscalingPolicies/{policy_id} For projects.locations.autoscalingPolicies.get, the resource name  of the policy has the following format:  projects/{project_id}/locations/{location}/autoscalingPolicies/{policy_id}
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Regions$Autoscalingpolicies$Getiampolicy extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$GetIamPolicyRequest;
    }
    export interface Params$Resource$Projects$Regions$Autoscalingpolicies$List extends StandardParameters {
        /**
         * Optional. The maximum number of results to return in each response. Must be less than or equal to 1000. Defaults to 100.
         */
        pageSize?: number;
        /**
         * Optional. The page token, returned by a previous call, to request the next page of results.
         */
        pageToken?: string;
        /**
         * Required. The "resource name" of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies.list, the resource name  of the region has the following format:  projects/{project_id}/regions/{region} For projects.locations.autoscalingPolicies.list, the resource name  of the location has the following format:  projects/{project_id}/locations/{location}
         */
        parent?: string;
    }
    export interface Params$Resource$Projects$Regions$Autoscalingpolicies$Setiampolicy extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$SetIamPolicyRequest;
    }
    export interface Params$Resource$Projects$Regions$Autoscalingpolicies$Testiampermissions extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$TestIamPermissionsRequest;
    }
    export interface Params$Resource$Projects$Regions$Autoscalingpolicies$Update extends StandardParameters {
        /**
         * Output only. The "resource name" of the autoscaling policy, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies, the resource name of the  policy has the following format:  projects/{project_id}/regions/{region}/autoscalingPolicies/{policy_id} For projects.locations.autoscalingPolicies, the resource name of the  policy has the following format:  projects/{project_id}/locations/{location}/autoscalingPolicies/{policy_id}
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$AutoscalingPolicy;
    }
    export class Resource$Projects$Regions$Clusters {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * dataproc.projects.regions.clusters.create
         * @desc Creates a cluster in a project. The returned Operation.metadata will be ClusterOperationMetadata (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#clusteroperationmetadata).
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.clusters.create({
         *     // Required. The ID of the Google Cloud Platform project that the cluster belongs to.
         *     projectId: 'placeholder-value',
         *     // Required. The Dataproc region in which to handle the request.
         *     region: 'placeholder-value',
         *     // Optional. A unique id used to identify the request. If the server receives two CreateClusterRequest requests with the same id, then the second request will be ignored and the first google.longrunning.Operation created and stored in the backend is returned.It is recommended to always set this value to a UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier).The id must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters.
         *     requestId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "clusterName": "my_clusterName",
         *       //   "clusterUuid": "my_clusterUuid",
         *       //   "config": {},
         *       //   "labels": {},
         *       //   "metrics": {},
         *       //   "projectId": "my_projectId",
         *       //   "status": {},
         *       //   "statusHistory": []
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
         * @alias dataproc.projects.regions.clusters.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.projectId Required. The ID of the Google Cloud Platform project that the cluster belongs to.
         * @param {string} params.region Required. The Dataproc region in which to handle the request.
         * @param {string=} params.requestId Optional. A unique id used to identify the request. If the server receives two CreateClusterRequest requests with the same id, then the second request will be ignored and the first google.longrunning.Operation created and stored in the backend is returned.It is recommended to always set this value to a UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier).The id must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters.
         * @param {().Cluster} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Projects$Regions$Clusters$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Projects$Regions$Clusters$Create, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        create(params: Params$Resource$Projects$Regions$Clusters$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Projects$Regions$Clusters$Create, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        create(params: Params$Resource$Projects$Regions$Clusters$Create, callback: BodyResponseCallback<Schema$Operation>): void;
        create(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * dataproc.projects.regions.clusters.delete
         * @desc Deletes a cluster in a project. The returned Operation.metadata will be ClusterOperationMetadata (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#clusteroperationmetadata).
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.clusters.delete({
         *     // Required. The cluster name.
         *     clusterName: 'placeholder-value',
         *     // Optional. Specifying the cluster_uuid means the RPC should fail (with error NOT_FOUND) if cluster with specified UUID does not exist.
         *     clusterUuid: 'placeholder-value',
         *     // Required. The ID of the Google Cloud Platform project that the cluster belongs to.
         *     projectId: 'placeholder-value',
         *     // Required. The Dataproc region in which to handle the request.
         *     region: 'placeholder-value',
         *     // Optional. A unique id used to identify the request. If the server receives two DeleteClusterRequest requests with the same id, then the second request will be ignored and the first google.longrunning.Operation created and stored in the backend is returned.It is recommended to always set this value to a UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier).The id must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters.
         *     requestId: 'placeholder-value',
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
         * @alias dataproc.projects.regions.clusters.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.clusterName Required. The cluster name.
         * @param {string=} params.clusterUuid Optional. Specifying the cluster_uuid means the RPC should fail (with error NOT_FOUND) if cluster with specified UUID does not exist.
         * @param {string} params.projectId Required. The ID of the Google Cloud Platform project that the cluster belongs to.
         * @param {string} params.region Required. The Dataproc region in which to handle the request.
         * @param {string=} params.requestId Optional. A unique id used to identify the request. If the server receives two DeleteClusterRequest requests with the same id, then the second request will be ignored and the first google.longrunning.Operation created and stored in the backend is returned.It is recommended to always set this value to a UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier).The id must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Projects$Regions$Clusters$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Projects$Regions$Clusters$Delete, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        delete(params: Params$Resource$Projects$Regions$Clusters$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Projects$Regions$Clusters$Delete, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        delete(params: Params$Resource$Projects$Regions$Clusters$Delete, callback: BodyResponseCallback<Schema$Operation>): void;
        delete(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * dataproc.projects.regions.clusters.diagnose
         * @desc Gets cluster diagnostic information. The returned Operation.metadata will be ClusterOperationMetadata (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#clusteroperationmetadata). After the operation completes, Operation.response contains DiagnoseClusterResults (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#diagnoseclusterresults).
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.clusters.diagnose({
         *     // Required. The cluster name.
         *     clusterName: 'placeholder-value',
         *     // Required. The ID of the Google Cloud Platform project that the cluster belongs to.
         *     projectId: 'placeholder-value',
         *     // Required. The Dataproc region in which to handle the request.
         *     region: 'placeholder-value',
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
         * @alias dataproc.projects.regions.clusters.diagnose
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.clusterName Required. The cluster name.
         * @param {string} params.projectId Required. The ID of the Google Cloud Platform project that the cluster belongs to.
         * @param {string} params.region Required. The Dataproc region in which to handle the request.
         * @param {().DiagnoseClusterRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        diagnose(params: Params$Resource$Projects$Regions$Clusters$Diagnose, options: StreamMethodOptions): GaxiosPromise<Readable>;
        diagnose(params?: Params$Resource$Projects$Regions$Clusters$Diagnose, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        diagnose(params: Params$Resource$Projects$Regions$Clusters$Diagnose, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        diagnose(params: Params$Resource$Projects$Regions$Clusters$Diagnose, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        diagnose(params: Params$Resource$Projects$Regions$Clusters$Diagnose, callback: BodyResponseCallback<Schema$Operation>): void;
        diagnose(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * dataproc.projects.regions.clusters.get
         * @desc Gets the resource representation for a cluster in a project.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.clusters.get({
         *     // Required. The cluster name.
         *     clusterName: 'placeholder-value',
         *     // Required. The ID of the Google Cloud Platform project that the cluster belongs to.
         *     projectId: 'placeholder-value',
         *     // Required. The Dataproc region in which to handle the request.
         *     region: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "clusterName": "my_clusterName",
         *   //   "clusterUuid": "my_clusterUuid",
         *   //   "config": {},
         *   //   "labels": {},
         *   //   "metrics": {},
         *   //   "projectId": "my_projectId",
         *   //   "status": {},
         *   //   "statusHistory": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dataproc.projects.regions.clusters.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.clusterName Required. The cluster name.
         * @param {string} params.projectId Required. The ID of the Google Cloud Platform project that the cluster belongs to.
         * @param {string} params.region Required. The Dataproc region in which to handle the request.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Regions$Clusters$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Regions$Clusters$Get, options?: MethodOptions): GaxiosPromise<Schema$Cluster>;
        get(params: Params$Resource$Projects$Regions$Clusters$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Regions$Clusters$Get, options: MethodOptions | BodyResponseCallback<Schema$Cluster>, callback: BodyResponseCallback<Schema$Cluster>): void;
        get(params: Params$Resource$Projects$Regions$Clusters$Get, callback: BodyResponseCallback<Schema$Cluster>): void;
        get(callback: BodyResponseCallback<Schema$Cluster>): void;
        /**
         * dataproc.projects.regions.clusters.getIamPolicy
         * @desc Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.clusters.getIamPolicy({
         *     // REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         *     resource: 'projects/my-project/regions/my-region/clusters/my-cluster',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "options": {}
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
         * @alias dataproc.projects.regions.clusters.getIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         * @param {().GetIamPolicyRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getIamPolicy(params: Params$Resource$Projects$Regions$Clusters$Getiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getIamPolicy(params?: Params$Resource$Projects$Regions$Clusters$Getiampolicy, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        getIamPolicy(params: Params$Resource$Projects$Regions$Clusters$Getiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getIamPolicy(params: Params$Resource$Projects$Regions$Clusters$Getiampolicy, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        getIamPolicy(params: Params$Resource$Projects$Regions$Clusters$Getiampolicy, callback: BodyResponseCallback<Schema$Policy>): void;
        getIamPolicy(callback: BodyResponseCallback<Schema$Policy>): void;
        /**
         * dataproc.projects.regions.clusters.list
         * @desc Lists all regions/{region}/clusters in a project alphabetically.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.clusters.list({
         *     // Optional. A filter constraining the clusters to list. Filters are case-sensitive and have the following syntax:field = value AND field = value ...where field is one of status.state, clusterName, or labels.[KEY], and [KEY] is a label key. value can be * to match all values. status.state can be one of the following: ACTIVE, INACTIVE, CREATING, RUNNING, ERROR, DELETING, or UPDATING. ACTIVE contains the CREATING, UPDATING, and RUNNING states. INACTIVE contains the DELETING and ERROR states. clusterName is the name of the cluster provided at creation time. Only the logical AND operator is supported; space-separated items are treated as having an implicit AND operator.Example filter:status.state = ACTIVE AND clusterName = mycluster AND labels.env = staging AND labels.starred = *
         *     filter: 'placeholder-value',
         *     // Optional. The standard List page size.
         *     pageSize: 'placeholder-value',
         *     // Optional. The standard List page token.
         *     pageToken: 'placeholder-value',
         *     // Required. The ID of the Google Cloud Platform project that the cluster belongs to.
         *     projectId: 'placeholder-value',
         *     // Required. The Dataproc region in which to handle the request.
         *     region: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "clusters": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dataproc.projects.regions.clusters.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.filter Optional. A filter constraining the clusters to list. Filters are case-sensitive and have the following syntax:field = value AND field = value ...where field is one of status.state, clusterName, or labels.[KEY], and [KEY] is a label key. value can be * to match all values. status.state can be one of the following: ACTIVE, INACTIVE, CREATING, RUNNING, ERROR, DELETING, or UPDATING. ACTIVE contains the CREATING, UPDATING, and RUNNING states. INACTIVE contains the DELETING and ERROR states. clusterName is the name of the cluster provided at creation time. Only the logical AND operator is supported; space-separated items are treated as having an implicit AND operator.Example filter:status.state = ACTIVE AND clusterName = mycluster AND labels.env = staging AND labels.starred = *
         * @param {integer=} params.pageSize Optional. The standard List page size.
         * @param {string=} params.pageToken Optional. The standard List page token.
         * @param {string} params.projectId Required. The ID of the Google Cloud Platform project that the cluster belongs to.
         * @param {string} params.region Required. The Dataproc region in which to handle the request.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Regions$Clusters$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Regions$Clusters$List, options?: MethodOptions): GaxiosPromise<Schema$ListClustersResponse>;
        list(params: Params$Resource$Projects$Regions$Clusters$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Regions$Clusters$List, options: MethodOptions | BodyResponseCallback<Schema$ListClustersResponse>, callback: BodyResponseCallback<Schema$ListClustersResponse>): void;
        list(params: Params$Resource$Projects$Regions$Clusters$List, callback: BodyResponseCallback<Schema$ListClustersResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListClustersResponse>): void;
        /**
         * dataproc.projects.regions.clusters.patch
         * @desc Updates a cluster in a project. The returned Operation.metadata will be ClusterOperationMetadata (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#clusteroperationmetadata).
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.clusters.patch({
         *     // Required. The cluster name.
         *     clusterName: 'placeholder-value',
         *     // Optional. Timeout for graceful YARN decomissioning. Graceful decommissioning allows removing nodes from the cluster without interrupting jobs in progress. Timeout specifies how long to wait for jobs in progress to finish before forcefully removing nodes (and potentially interrupting jobs). Default timeout is 0 (for forceful decommission), and the maximum allowed timeout is 1 day. (see JSON representation of Duration (https://developers.google.com/protocol-buffers/docs/proto3#json)).Only supported on Dataproc image versions 1.2 and higher.
         *     gracefulDecommissionTimeout: 'placeholder-value',
         *     // Required. The ID of the Google Cloud Platform project the cluster belongs to.
         *     projectId: 'placeholder-value',
         *     // Required. The Dataproc region in which to handle the request.
         *     region: 'placeholder-value',
         *     // Optional. A unique id used to identify the request. If the server receives two UpdateClusterRequest requests with the same id, then the second request will be ignored and the first google.longrunning.Operation created and stored in the backend is returned.It is recommended to always set this value to a UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier).The id must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters.
         *     requestId: 'placeholder-value',
         *     // Required. Specifies the path, relative to Cluster, of the field to update. For example, to change the number of workers in a cluster to 5, the update_mask parameter would be specified as config.worker_config.num_instances, and the PATCH request body would specify the new value, as follows:
         *     // {
         *     //   "config":{
         *     //     "workerConfig":{
         *     //       "numInstances":"5"
         *     //     }
         *     //   }
         *     // }
         *     // Similarly, to change the number of preemptible workers in a cluster to 5, the update_mask parameter would be config.secondary_worker_config.num_instances, and the PATCH request body would be set as follows:
         *     // {
         *     //   "config":{
         *     //     "secondaryWorkerConfig":{
         *     //       "numInstances":"5"
         *     //     }
         *     //   }
         *     // }
         *     // <strong>Note:</strong> Currently, only the following fields can be updated:<table>  <tbody>  <tr>  <td><strong>Mask</strong></td>  <td><strong>Purpose</strong></td>  </tr>  <tr>  <td><strong><em>labels</em></strong></td>  <td>Update labels</td>  </tr>  <tr>  <td><strong><em>config.worker_config.num_instances</em></strong></td>  <td>Resize primary worker group</td>  </tr>  <tr>  <td><strong><em>config.secondary_worker_config.num_instances</em></strong></td>  <td>Resize secondary worker group</td>  </tr>  <tr>  <td>config.autoscaling_config.policy_uri</td><td>Use, stop using, or  change autoscaling policies</td>  </tr>  </tbody>  </table>
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "clusterName": "my_clusterName",
         *       //   "clusterUuid": "my_clusterUuid",
         *       //   "config": {},
         *       //   "labels": {},
         *       //   "metrics": {},
         *       //   "projectId": "my_projectId",
         *       //   "status": {},
         *       //   "statusHistory": []
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
         * @alias dataproc.projects.regions.clusters.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.clusterName Required. The cluster name.
         * @param {string=} params.gracefulDecommissionTimeout Optional. Timeout for graceful YARN decomissioning. Graceful decommissioning allows removing nodes from the cluster without interrupting jobs in progress. Timeout specifies how long to wait for jobs in progress to finish before forcefully removing nodes (and potentially interrupting jobs). Default timeout is 0 (for forceful decommission), and the maximum allowed timeout is 1 day. (see JSON representation of Duration (https://developers.google.com/protocol-buffers/docs/proto3#json)).Only supported on Dataproc image versions 1.2 and higher.
         * @param {string} params.projectId Required. The ID of the Google Cloud Platform project the cluster belongs to.
         * @param {string} params.region Required. The Dataproc region in which to handle the request.
         * @param {string=} params.requestId Optional. A unique id used to identify the request. If the server receives two UpdateClusterRequest requests with the same id, then the second request will be ignored and the first google.longrunning.Operation created and stored in the backend is returned.It is recommended to always set this value to a UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier).The id must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters.
         * @param {string=} params.updateMask Required. Specifies the path, relative to Cluster, of the field to update. For example, to change the number of workers in a cluster to 5, the update_mask parameter would be specified as config.worker_config.num_instances, and the PATCH request body would specify the new value, as follows: {   "config":{     "workerConfig":{       "numInstances":"5"     }   } } Similarly, to change the number of preemptible workers in a cluster to 5, the update_mask parameter would be config.secondary_worker_config.num_instances, and the PATCH request body would be set as follows: {   "config":{     "secondaryWorkerConfig":{       "numInstances":"5"     }   } } <strong>Note:</strong> Currently, only the following fields can be updated:<table>  <tbody>  <tr>  <td><strong>Mask</strong></td>  <td><strong>Purpose</strong></td>  </tr>  <tr>  <td><strong><em>labels</em></strong></td>  <td>Update labels</td>  </tr>  <tr>  <td><strong><em>config.worker_config.num_instances</em></strong></td>  <td>Resize primary worker group</td>  </tr>  <tr>  <td><strong><em>config.secondary_worker_config.num_instances</em></strong></td>  <td>Resize secondary worker group</td>  </tr>  <tr>  <td>config.autoscaling_config.policy_uri</td><td>Use, stop using, or  change autoscaling policies</td>  </tr>  </tbody>  </table>
         * @param {().Cluster} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Projects$Regions$Clusters$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Projects$Regions$Clusters$Patch, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        patch(params: Params$Resource$Projects$Regions$Clusters$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Projects$Regions$Clusters$Patch, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        patch(params: Params$Resource$Projects$Regions$Clusters$Patch, callback: BodyResponseCallback<Schema$Operation>): void;
        patch(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * dataproc.projects.regions.clusters.setIamPolicy
         * @desc Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.clusters.setIamPolicy({
         *     // REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         *     resource: 'projects/my-project/regions/my-region/clusters/my-cluster',
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
         * @alias dataproc.projects.regions.clusters.setIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         * @param {().SetIamPolicyRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        setIamPolicy(params: Params$Resource$Projects$Regions$Clusters$Setiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        setIamPolicy(params?: Params$Resource$Projects$Regions$Clusters$Setiampolicy, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        setIamPolicy(params: Params$Resource$Projects$Regions$Clusters$Setiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        setIamPolicy(params: Params$Resource$Projects$Regions$Clusters$Setiampolicy, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        setIamPolicy(params: Params$Resource$Projects$Regions$Clusters$Setiampolicy, callback: BodyResponseCallback<Schema$Policy>): void;
        setIamPolicy(callback: BodyResponseCallback<Schema$Policy>): void;
        /**
         * dataproc.projects.regions.clusters.testIamPermissions
         * @desc Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.clusters.testIamPermissions({
         *     // REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         *     resource: 'projects/my-project/regions/my-region/clusters/my-cluster',
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
         * @alias dataproc.projects.regions.clusters.testIamPermissions
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         * @param {().TestIamPermissionsRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        testIamPermissions(params: Params$Resource$Projects$Regions$Clusters$Testiampermissions, options: StreamMethodOptions): GaxiosPromise<Readable>;
        testIamPermissions(params?: Params$Resource$Projects$Regions$Clusters$Testiampermissions, options?: MethodOptions): GaxiosPromise<Schema$TestIamPermissionsResponse>;
        testIamPermissions(params: Params$Resource$Projects$Regions$Clusters$Testiampermissions, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        testIamPermissions(params: Params$Resource$Projects$Regions$Clusters$Testiampermissions, options: MethodOptions | BodyResponseCallback<Schema$TestIamPermissionsResponse>, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(params: Params$Resource$Projects$Regions$Clusters$Testiampermissions, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
    }
    export interface Params$Resource$Projects$Regions$Clusters$Create extends StandardParameters {
        /**
         * Required. The ID of the Google Cloud Platform project that the cluster belongs to.
         */
        projectId?: string;
        /**
         * Required. The Dataproc region in which to handle the request.
         */
        region?: string;
        /**
         * Optional. A unique id used to identify the request. If the server receives two CreateClusterRequest requests with the same id, then the second request will be ignored and the first google.longrunning.Operation created and stored in the backend is returned.It is recommended to always set this value to a UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier).The id must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters.
         */
        requestId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Cluster;
    }
    export interface Params$Resource$Projects$Regions$Clusters$Delete extends StandardParameters {
        /**
         * Required. The cluster name.
         */
        clusterName?: string;
        /**
         * Optional. Specifying the cluster_uuid means the RPC should fail (with error NOT_FOUND) if cluster with specified UUID does not exist.
         */
        clusterUuid?: string;
        /**
         * Required. The ID of the Google Cloud Platform project that the cluster belongs to.
         */
        projectId?: string;
        /**
         * Required. The Dataproc region in which to handle the request.
         */
        region?: string;
        /**
         * Optional. A unique id used to identify the request. If the server receives two DeleteClusterRequest requests with the same id, then the second request will be ignored and the first google.longrunning.Operation created and stored in the backend is returned.It is recommended to always set this value to a UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier).The id must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters.
         */
        requestId?: string;
    }
    export interface Params$Resource$Projects$Regions$Clusters$Diagnose extends StandardParameters {
        /**
         * Required. The cluster name.
         */
        clusterName?: string;
        /**
         * Required. The ID of the Google Cloud Platform project that the cluster belongs to.
         */
        projectId?: string;
        /**
         * Required. The Dataproc region in which to handle the request.
         */
        region?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$DiagnoseClusterRequest;
    }
    export interface Params$Resource$Projects$Regions$Clusters$Get extends StandardParameters {
        /**
         * Required. The cluster name.
         */
        clusterName?: string;
        /**
         * Required. The ID of the Google Cloud Platform project that the cluster belongs to.
         */
        projectId?: string;
        /**
         * Required. The Dataproc region in which to handle the request.
         */
        region?: string;
    }
    export interface Params$Resource$Projects$Regions$Clusters$Getiampolicy extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$GetIamPolicyRequest;
    }
    export interface Params$Resource$Projects$Regions$Clusters$List extends StandardParameters {
        /**
         * Optional. A filter constraining the clusters to list. Filters are case-sensitive and have the following syntax:field = value AND field = value ...where field is one of status.state, clusterName, or labels.[KEY], and [KEY] is a label key. value can be * to match all values. status.state can be one of the following: ACTIVE, INACTIVE, CREATING, RUNNING, ERROR, DELETING, or UPDATING. ACTIVE contains the CREATING, UPDATING, and RUNNING states. INACTIVE contains the DELETING and ERROR states. clusterName is the name of the cluster provided at creation time. Only the logical AND operator is supported; space-separated items are treated as having an implicit AND operator.Example filter:status.state = ACTIVE AND clusterName = mycluster AND labels.env = staging AND labels.starred = *
         */
        filter?: string;
        /**
         * Optional. The standard List page size.
         */
        pageSize?: number;
        /**
         * Optional. The standard List page token.
         */
        pageToken?: string;
        /**
         * Required. The ID of the Google Cloud Platform project that the cluster belongs to.
         */
        projectId?: string;
        /**
         * Required. The Dataproc region in which to handle the request.
         */
        region?: string;
    }
    export interface Params$Resource$Projects$Regions$Clusters$Patch extends StandardParameters {
        /**
         * Required. The cluster name.
         */
        clusterName?: string;
        /**
         * Optional. Timeout for graceful YARN decomissioning. Graceful decommissioning allows removing nodes from the cluster without interrupting jobs in progress. Timeout specifies how long to wait for jobs in progress to finish before forcefully removing nodes (and potentially interrupting jobs). Default timeout is 0 (for forceful decommission), and the maximum allowed timeout is 1 day. (see JSON representation of Duration (https://developers.google.com/protocol-buffers/docs/proto3#json)).Only supported on Dataproc image versions 1.2 and higher.
         */
        gracefulDecommissionTimeout?: string;
        /**
         * Required. The ID of the Google Cloud Platform project the cluster belongs to.
         */
        projectId?: string;
        /**
         * Required. The Dataproc region in which to handle the request.
         */
        region?: string;
        /**
         * Optional. A unique id used to identify the request. If the server receives two UpdateClusterRequest requests with the same id, then the second request will be ignored and the first google.longrunning.Operation created and stored in the backend is returned.It is recommended to always set this value to a UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier).The id must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters.
         */
        requestId?: string;
        /**
         * Required. Specifies the path, relative to Cluster, of the field to update. For example, to change the number of workers in a cluster to 5, the update_mask parameter would be specified as config.worker_config.num_instances, and the PATCH request body would specify the new value, as follows: {   "config":{     "workerConfig":{       "numInstances":"5"     }   } } Similarly, to change the number of preemptible workers in a cluster to 5, the update_mask parameter would be config.secondary_worker_config.num_instances, and the PATCH request body would be set as follows: {   "config":{     "secondaryWorkerConfig":{       "numInstances":"5"     }   } } <strong>Note:</strong> Currently, only the following fields can be updated:<table>  <tbody>  <tr>  <td><strong>Mask</strong></td>  <td><strong>Purpose</strong></td>  </tr>  <tr>  <td><strong><em>labels</em></strong></td>  <td>Update labels</td>  </tr>  <tr>  <td><strong><em>config.worker_config.num_instances</em></strong></td>  <td>Resize primary worker group</td>  </tr>  <tr>  <td><strong><em>config.secondary_worker_config.num_instances</em></strong></td>  <td>Resize secondary worker group</td>  </tr>  <tr>  <td>config.autoscaling_config.policy_uri</td><td>Use, stop using, or  change autoscaling policies</td>  </tr>  </tbody>  </table>
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Cluster;
    }
    export interface Params$Resource$Projects$Regions$Clusters$Setiampolicy extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$SetIamPolicyRequest;
    }
    export interface Params$Resource$Projects$Regions$Clusters$Testiampermissions extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$TestIamPermissionsRequest;
    }
    export class Resource$Projects$Regions$Jobs {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * dataproc.projects.regions.jobs.cancel
         * @desc Starts a job cancellation request. To access the job resource after cancellation, call regions/{region}/jobs.list (https://cloud.google.com/dataproc/docs/reference/rest/v1/projects.regions.jobs/list) or regions/{region}/jobs.get (https://cloud.google.com/dataproc/docs/reference/rest/v1/projects.regions.jobs/get).
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.jobs.cancel({
         *     // Required. The job ID.
         *     jobId: 'placeholder-value',
         *     // Required. The ID of the Google Cloud Platform project that the job belongs to.
         *     projectId: 'placeholder-value',
         *     // Required. The Dataproc region in which to handle the request.
         *     region: 'placeholder-value',
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
         *   //   "driverControlFilesUri": "my_driverControlFilesUri",
         *   //   "driverOutputResourceUri": "my_driverOutputResourceUri",
         *   //   "hadoopJob": {},
         *   //   "hiveJob": {},
         *   //   "jobUuid": "my_jobUuid",
         *   //   "labels": {},
         *   //   "pigJob": {},
         *   //   "placement": {},
         *   //   "prestoJob": {},
         *   //   "pysparkJob": {},
         *   //   "reference": {},
         *   //   "scheduling": {},
         *   //   "sparkJob": {},
         *   //   "sparkRJob": {},
         *   //   "sparkSqlJob": {},
         *   //   "status": {},
         *   //   "statusHistory": [],
         *   //   "yarnApplications": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dataproc.projects.regions.jobs.cancel
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.jobId Required. The job ID.
         * @param {string} params.projectId Required. The ID of the Google Cloud Platform project that the job belongs to.
         * @param {string} params.region Required. The Dataproc region in which to handle the request.
         * @param {().CancelJobRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        cancel(params: Params$Resource$Projects$Regions$Jobs$Cancel, options: StreamMethodOptions): GaxiosPromise<Readable>;
        cancel(params?: Params$Resource$Projects$Regions$Jobs$Cancel, options?: MethodOptions): GaxiosPromise<Schema$Job>;
        cancel(params: Params$Resource$Projects$Regions$Jobs$Cancel, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        cancel(params: Params$Resource$Projects$Regions$Jobs$Cancel, options: MethodOptions | BodyResponseCallback<Schema$Job>, callback: BodyResponseCallback<Schema$Job>): void;
        cancel(params: Params$Resource$Projects$Regions$Jobs$Cancel, callback: BodyResponseCallback<Schema$Job>): void;
        cancel(callback: BodyResponseCallback<Schema$Job>): void;
        /**
         * dataproc.projects.regions.jobs.delete
         * @desc Deletes the job from the project. If the job is active, the delete fails, and the response returns FAILED_PRECONDITION.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.jobs.delete({
         *     // Required. The job ID.
         *     jobId: 'placeholder-value',
         *     // Required. The ID of the Google Cloud Platform project that the job belongs to.
         *     projectId: 'placeholder-value',
         *     // Required. The Dataproc region in which to handle the request.
         *     region: 'placeholder-value',
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
         * @alias dataproc.projects.regions.jobs.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.jobId Required. The job ID.
         * @param {string} params.projectId Required. The ID of the Google Cloud Platform project that the job belongs to.
         * @param {string} params.region Required. The Dataproc region in which to handle the request.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Projects$Regions$Jobs$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Projects$Regions$Jobs$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Projects$Regions$Jobs$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Projects$Regions$Jobs$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Projects$Regions$Jobs$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * dataproc.projects.regions.jobs.get
         * @desc Gets the resource representation for a job in a project.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.jobs.get({
         *     // Required. The job ID.
         *     jobId: 'placeholder-value',
         *     // Required. The ID of the Google Cloud Platform project that the job belongs to.
         *     projectId: 'placeholder-value',
         *     // Required. The Dataproc region in which to handle the request.
         *     region: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "done": false,
         *   //   "driverControlFilesUri": "my_driverControlFilesUri",
         *   //   "driverOutputResourceUri": "my_driverOutputResourceUri",
         *   //   "hadoopJob": {},
         *   //   "hiveJob": {},
         *   //   "jobUuid": "my_jobUuid",
         *   //   "labels": {},
         *   //   "pigJob": {},
         *   //   "placement": {},
         *   //   "prestoJob": {},
         *   //   "pysparkJob": {},
         *   //   "reference": {},
         *   //   "scheduling": {},
         *   //   "sparkJob": {},
         *   //   "sparkRJob": {},
         *   //   "sparkSqlJob": {},
         *   //   "status": {},
         *   //   "statusHistory": [],
         *   //   "yarnApplications": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dataproc.projects.regions.jobs.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.jobId Required. The job ID.
         * @param {string} params.projectId Required. The ID of the Google Cloud Platform project that the job belongs to.
         * @param {string} params.region Required. The Dataproc region in which to handle the request.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Regions$Jobs$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Regions$Jobs$Get, options?: MethodOptions): GaxiosPromise<Schema$Job>;
        get(params: Params$Resource$Projects$Regions$Jobs$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Regions$Jobs$Get, options: MethodOptions | BodyResponseCallback<Schema$Job>, callback: BodyResponseCallback<Schema$Job>): void;
        get(params: Params$Resource$Projects$Regions$Jobs$Get, callback: BodyResponseCallback<Schema$Job>): void;
        get(callback: BodyResponseCallback<Schema$Job>): void;
        /**
         * dataproc.projects.regions.jobs.getIamPolicy
         * @desc Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.jobs.getIamPolicy({
         *     // REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         *     resource: 'projects/my-project/regions/my-region/jobs/my-job',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "options": {}
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
         * @alias dataproc.projects.regions.jobs.getIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         * @param {().GetIamPolicyRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getIamPolicy(params: Params$Resource$Projects$Regions$Jobs$Getiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getIamPolicy(params?: Params$Resource$Projects$Regions$Jobs$Getiampolicy, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        getIamPolicy(params: Params$Resource$Projects$Regions$Jobs$Getiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getIamPolicy(params: Params$Resource$Projects$Regions$Jobs$Getiampolicy, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        getIamPolicy(params: Params$Resource$Projects$Regions$Jobs$Getiampolicy, callback: BodyResponseCallback<Schema$Policy>): void;
        getIamPolicy(callback: BodyResponseCallback<Schema$Policy>): void;
        /**
         * dataproc.projects.regions.jobs.list
         * @desc Lists regions/{region}/jobs in a project.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.jobs.list({
         *     // Optional. If set, the returned jobs list includes only jobs that were submitted to the named cluster.
         *     clusterName: 'placeholder-value',
         *     // Optional. A filter constraining the jobs to list. Filters are case-sensitive and have the following syntax:field = value AND field = value ...where field is status.state or labels.[KEY], and [KEY] is a label key. value can be * to match all values. status.state can be either ACTIVE or NON_ACTIVE. Only the logical AND operator is supported; space-separated items are treated as having an implicit AND operator.Example filter:status.state = ACTIVE AND labels.env = staging AND labels.starred = *
         *     filter: 'placeholder-value',
         *     // Optional. Specifies enumerated categories of jobs to list. (default = match ALL jobs).If filter is provided, jobStateMatcher will be ignored.
         *     jobStateMatcher: 'placeholder-value',
         *     // Optional. The number of results to return in each response.
         *     pageSize: 'placeholder-value',
         *     // Optional. The page token, returned by a previous call, to request the next page of results.
         *     pageToken: 'placeholder-value',
         *     // Required. The ID of the Google Cloud Platform project that the job belongs to.
         *     projectId: 'placeholder-value',
         *     // Required. The Dataproc region in which to handle the request.
         *     region: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "jobs": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dataproc.projects.regions.jobs.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.clusterName Optional. If set, the returned jobs list includes only jobs that were submitted to the named cluster.
         * @param {string=} params.filter Optional. A filter constraining the jobs to list. Filters are case-sensitive and have the following syntax:field = value AND field = value ...where field is status.state or labels.[KEY], and [KEY] is a label key. value can be * to match all values. status.state can be either ACTIVE or NON_ACTIVE. Only the logical AND operator is supported; space-separated items are treated as having an implicit AND operator.Example filter:status.state = ACTIVE AND labels.env = staging AND labels.starred = *
         * @param {string=} params.jobStateMatcher Optional. Specifies enumerated categories of jobs to list. (default = match ALL jobs).If filter is provided, jobStateMatcher will be ignored.
         * @param {integer=} params.pageSize Optional. The number of results to return in each response.
         * @param {string=} params.pageToken Optional. The page token, returned by a previous call, to request the next page of results.
         * @param {string} params.projectId Required. The ID of the Google Cloud Platform project that the job belongs to.
         * @param {string} params.region Required. The Dataproc region in which to handle the request.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Regions$Jobs$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Regions$Jobs$List, options?: MethodOptions): GaxiosPromise<Schema$ListJobsResponse>;
        list(params: Params$Resource$Projects$Regions$Jobs$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Regions$Jobs$List, options: MethodOptions | BodyResponseCallback<Schema$ListJobsResponse>, callback: BodyResponseCallback<Schema$ListJobsResponse>): void;
        list(params: Params$Resource$Projects$Regions$Jobs$List, callback: BodyResponseCallback<Schema$ListJobsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListJobsResponse>): void;
        /**
         * dataproc.projects.regions.jobs.patch
         * @desc Updates a job in a project.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.jobs.patch({
         *     // Required. The job ID.
         *     jobId: 'placeholder-value',
         *     // Required. The ID of the Google Cloud Platform project that the job belongs to.
         *     projectId: 'placeholder-value',
         *     // Required. The Dataproc region in which to handle the request.
         *     region: 'placeholder-value',
         *     // Required. Specifies the path, relative to <code>Job</code>, of the field to update. For example, to update the labels of a Job the <code>update_mask</code> parameter would be specified as <code>labels</code>, and the PATCH request body would specify the new value. <strong>Note:</strong> Currently, <code>labels</code> is the only field that can be updated.
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "done": false,
         *       //   "driverControlFilesUri": "my_driverControlFilesUri",
         *       //   "driverOutputResourceUri": "my_driverOutputResourceUri",
         *       //   "hadoopJob": {},
         *       //   "hiveJob": {},
         *       //   "jobUuid": "my_jobUuid",
         *       //   "labels": {},
         *       //   "pigJob": {},
         *       //   "placement": {},
         *       //   "prestoJob": {},
         *       //   "pysparkJob": {},
         *       //   "reference": {},
         *       //   "scheduling": {},
         *       //   "sparkJob": {},
         *       //   "sparkRJob": {},
         *       //   "sparkSqlJob": {},
         *       //   "status": {},
         *       //   "statusHistory": [],
         *       //   "yarnApplications": []
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "done": false,
         *   //   "driverControlFilesUri": "my_driverControlFilesUri",
         *   //   "driverOutputResourceUri": "my_driverOutputResourceUri",
         *   //   "hadoopJob": {},
         *   //   "hiveJob": {},
         *   //   "jobUuid": "my_jobUuid",
         *   //   "labels": {},
         *   //   "pigJob": {},
         *   //   "placement": {},
         *   //   "prestoJob": {},
         *   //   "pysparkJob": {},
         *   //   "reference": {},
         *   //   "scheduling": {},
         *   //   "sparkJob": {},
         *   //   "sparkRJob": {},
         *   //   "sparkSqlJob": {},
         *   //   "status": {},
         *   //   "statusHistory": [],
         *   //   "yarnApplications": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dataproc.projects.regions.jobs.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.jobId Required. The job ID.
         * @param {string} params.projectId Required. The ID of the Google Cloud Platform project that the job belongs to.
         * @param {string} params.region Required. The Dataproc region in which to handle the request.
         * @param {string=} params.updateMask Required. Specifies the path, relative to <code>Job</code>, of the field to update. For example, to update the labels of a Job the <code>update_mask</code> parameter would be specified as <code>labels</code>, and the PATCH request body would specify the new value. <strong>Note:</strong> Currently, <code>labels</code> is the only field that can be updated.
         * @param {().Job} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Projects$Regions$Jobs$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Projects$Regions$Jobs$Patch, options?: MethodOptions): GaxiosPromise<Schema$Job>;
        patch(params: Params$Resource$Projects$Regions$Jobs$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Projects$Regions$Jobs$Patch, options: MethodOptions | BodyResponseCallback<Schema$Job>, callback: BodyResponseCallback<Schema$Job>): void;
        patch(params: Params$Resource$Projects$Regions$Jobs$Patch, callback: BodyResponseCallback<Schema$Job>): void;
        patch(callback: BodyResponseCallback<Schema$Job>): void;
        /**
         * dataproc.projects.regions.jobs.setIamPolicy
         * @desc Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.jobs.setIamPolicy({
         *     // REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         *     resource: 'projects/my-project/regions/my-region/jobs/my-job',
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
         * @alias dataproc.projects.regions.jobs.setIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         * @param {().SetIamPolicyRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        setIamPolicy(params: Params$Resource$Projects$Regions$Jobs$Setiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        setIamPolicy(params?: Params$Resource$Projects$Regions$Jobs$Setiampolicy, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        setIamPolicy(params: Params$Resource$Projects$Regions$Jobs$Setiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        setIamPolicy(params: Params$Resource$Projects$Regions$Jobs$Setiampolicy, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        setIamPolicy(params: Params$Resource$Projects$Regions$Jobs$Setiampolicy, callback: BodyResponseCallback<Schema$Policy>): void;
        setIamPolicy(callback: BodyResponseCallback<Schema$Policy>): void;
        /**
         * dataproc.projects.regions.jobs.submit
         * @desc Submits a job to a cluster.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.jobs.submit({
         *     // Required. The ID of the Google Cloud Platform project that the job belongs to.
         *     projectId: 'placeholder-value',
         *     // Required. The Dataproc region in which to handle the request.
         *     region: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "job": {},
         *       //   "requestId": "my_requestId"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "done": false,
         *   //   "driverControlFilesUri": "my_driverControlFilesUri",
         *   //   "driverOutputResourceUri": "my_driverOutputResourceUri",
         *   //   "hadoopJob": {},
         *   //   "hiveJob": {},
         *   //   "jobUuid": "my_jobUuid",
         *   //   "labels": {},
         *   //   "pigJob": {},
         *   //   "placement": {},
         *   //   "prestoJob": {},
         *   //   "pysparkJob": {},
         *   //   "reference": {},
         *   //   "scheduling": {},
         *   //   "sparkJob": {},
         *   //   "sparkRJob": {},
         *   //   "sparkSqlJob": {},
         *   //   "status": {},
         *   //   "statusHistory": [],
         *   //   "yarnApplications": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dataproc.projects.regions.jobs.submit
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.projectId Required. The ID of the Google Cloud Platform project that the job belongs to.
         * @param {string} params.region Required. The Dataproc region in which to handle the request.
         * @param {().SubmitJobRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        submit(params: Params$Resource$Projects$Regions$Jobs$Submit, options: StreamMethodOptions): GaxiosPromise<Readable>;
        submit(params?: Params$Resource$Projects$Regions$Jobs$Submit, options?: MethodOptions): GaxiosPromise<Schema$Job>;
        submit(params: Params$Resource$Projects$Regions$Jobs$Submit, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        submit(params: Params$Resource$Projects$Regions$Jobs$Submit, options: MethodOptions | BodyResponseCallback<Schema$Job>, callback: BodyResponseCallback<Schema$Job>): void;
        submit(params: Params$Resource$Projects$Regions$Jobs$Submit, callback: BodyResponseCallback<Schema$Job>): void;
        submit(callback: BodyResponseCallback<Schema$Job>): void;
        /**
         * dataproc.projects.regions.jobs.submitAsOperation
         * @desc Submits job to a cluster.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.jobs.submitAsOperation({
         *     // Required. The ID of the Google Cloud Platform project that the job belongs to.
         *     projectId: 'placeholder-value',
         *     // Required. The Dataproc region in which to handle the request.
         *     region: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "job": {},
         *       //   "requestId": "my_requestId"
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
         * @alias dataproc.projects.regions.jobs.submitAsOperation
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.projectId Required. The ID of the Google Cloud Platform project that the job belongs to.
         * @param {string} params.region Required. The Dataproc region in which to handle the request.
         * @param {().SubmitJobRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        submitAsOperation(params: Params$Resource$Projects$Regions$Jobs$Submitasoperation, options: StreamMethodOptions): GaxiosPromise<Readable>;
        submitAsOperation(params?: Params$Resource$Projects$Regions$Jobs$Submitasoperation, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        submitAsOperation(params: Params$Resource$Projects$Regions$Jobs$Submitasoperation, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        submitAsOperation(params: Params$Resource$Projects$Regions$Jobs$Submitasoperation, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        submitAsOperation(params: Params$Resource$Projects$Regions$Jobs$Submitasoperation, callback: BodyResponseCallback<Schema$Operation>): void;
        submitAsOperation(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * dataproc.projects.regions.jobs.testIamPermissions
         * @desc Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.jobs.testIamPermissions({
         *     // REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         *     resource: 'projects/my-project/regions/my-region/jobs/my-job',
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
         * @alias dataproc.projects.regions.jobs.testIamPermissions
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         * @param {().TestIamPermissionsRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        testIamPermissions(params: Params$Resource$Projects$Regions$Jobs$Testiampermissions, options: StreamMethodOptions): GaxiosPromise<Readable>;
        testIamPermissions(params?: Params$Resource$Projects$Regions$Jobs$Testiampermissions, options?: MethodOptions): GaxiosPromise<Schema$TestIamPermissionsResponse>;
        testIamPermissions(params: Params$Resource$Projects$Regions$Jobs$Testiampermissions, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        testIamPermissions(params: Params$Resource$Projects$Regions$Jobs$Testiampermissions, options: MethodOptions | BodyResponseCallback<Schema$TestIamPermissionsResponse>, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(params: Params$Resource$Projects$Regions$Jobs$Testiampermissions, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
    }
    export interface Params$Resource$Projects$Regions$Jobs$Cancel extends StandardParameters {
        /**
         * Required. The job ID.
         */
        jobId?: string;
        /**
         * Required. The ID of the Google Cloud Platform project that the job belongs to.
         */
        projectId?: string;
        /**
         * Required. The Dataproc region in which to handle the request.
         */
        region?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$CancelJobRequest;
    }
    export interface Params$Resource$Projects$Regions$Jobs$Delete extends StandardParameters {
        /**
         * Required. The job ID.
         */
        jobId?: string;
        /**
         * Required. The ID of the Google Cloud Platform project that the job belongs to.
         */
        projectId?: string;
        /**
         * Required. The Dataproc region in which to handle the request.
         */
        region?: string;
    }
    export interface Params$Resource$Projects$Regions$Jobs$Get extends StandardParameters {
        /**
         * Required. The job ID.
         */
        jobId?: string;
        /**
         * Required. The ID of the Google Cloud Platform project that the job belongs to.
         */
        projectId?: string;
        /**
         * Required. The Dataproc region in which to handle the request.
         */
        region?: string;
    }
    export interface Params$Resource$Projects$Regions$Jobs$Getiampolicy extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$GetIamPolicyRequest;
    }
    export interface Params$Resource$Projects$Regions$Jobs$List extends StandardParameters {
        /**
         * Optional. If set, the returned jobs list includes only jobs that were submitted to the named cluster.
         */
        clusterName?: string;
        /**
         * Optional. A filter constraining the jobs to list. Filters are case-sensitive and have the following syntax:field = value AND field = value ...where field is status.state or labels.[KEY], and [KEY] is a label key. value can be * to match all values. status.state can be either ACTIVE or NON_ACTIVE. Only the logical AND operator is supported; space-separated items are treated as having an implicit AND operator.Example filter:status.state = ACTIVE AND labels.env = staging AND labels.starred = *
         */
        filter?: string;
        /**
         * Optional. Specifies enumerated categories of jobs to list. (default = match ALL jobs).If filter is provided, jobStateMatcher will be ignored.
         */
        jobStateMatcher?: string;
        /**
         * Optional. The number of results to return in each response.
         */
        pageSize?: number;
        /**
         * Optional. The page token, returned by a previous call, to request the next page of results.
         */
        pageToken?: string;
        /**
         * Required. The ID of the Google Cloud Platform project that the job belongs to.
         */
        projectId?: string;
        /**
         * Required. The Dataproc region in which to handle the request.
         */
        region?: string;
    }
    export interface Params$Resource$Projects$Regions$Jobs$Patch extends StandardParameters {
        /**
         * Required. The job ID.
         */
        jobId?: string;
        /**
         * Required. The ID of the Google Cloud Platform project that the job belongs to.
         */
        projectId?: string;
        /**
         * Required. The Dataproc region in which to handle the request.
         */
        region?: string;
        /**
         * Required. Specifies the path, relative to <code>Job</code>, of the field to update. For example, to update the labels of a Job the <code>update_mask</code> parameter would be specified as <code>labels</code>, and the PATCH request body would specify the new value. <strong>Note:</strong> Currently, <code>labels</code> is the only field that can be updated.
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Job;
    }
    export interface Params$Resource$Projects$Regions$Jobs$Setiampolicy extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$SetIamPolicyRequest;
    }
    export interface Params$Resource$Projects$Regions$Jobs$Submit extends StandardParameters {
        /**
         * Required. The ID of the Google Cloud Platform project that the job belongs to.
         */
        projectId?: string;
        /**
         * Required. The Dataproc region in which to handle the request.
         */
        region?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$SubmitJobRequest;
    }
    export interface Params$Resource$Projects$Regions$Jobs$Submitasoperation extends StandardParameters {
        /**
         * Required. The ID of the Google Cloud Platform project that the job belongs to.
         */
        projectId?: string;
        /**
         * Required. The Dataproc region in which to handle the request.
         */
        region?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$SubmitJobRequest;
    }
    export interface Params$Resource$Projects$Regions$Jobs$Testiampermissions extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$TestIamPermissionsRequest;
    }
    export class Resource$Projects$Regions$Operations {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * dataproc.projects.regions.operations.cancel
         * @desc Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns google.rpc.Code.UNIMPLEMENTED. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of 1, corresponding to Code.CANCELLED.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.operations.cancel({
         *     // The name of the operation resource to be cancelled.
         *     name: 'projects/my-project/regions/my-region/operations/my-operation',
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
         * @alias dataproc.projects.regions.operations.cancel
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The name of the operation resource to be cancelled.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        cancel(params: Params$Resource$Projects$Regions$Operations$Cancel, options: StreamMethodOptions): GaxiosPromise<Readable>;
        cancel(params?: Params$Resource$Projects$Regions$Operations$Cancel, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        cancel(params: Params$Resource$Projects$Regions$Operations$Cancel, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        cancel(params: Params$Resource$Projects$Regions$Operations$Cancel, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        cancel(params: Params$Resource$Projects$Regions$Operations$Cancel, callback: BodyResponseCallback<Schema$Empty>): void;
        cancel(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * dataproc.projects.regions.operations.delete
         * @desc Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns google.rpc.Code.UNIMPLEMENTED.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.operations.delete({
         *     // The name of the operation resource to be deleted.
         *     name: 'projects/my-project/regions/my-region/operations/my-operation',
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
         * @alias dataproc.projects.regions.operations.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The name of the operation resource to be deleted.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Projects$Regions$Operations$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Projects$Regions$Operations$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Projects$Regions$Operations$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Projects$Regions$Operations$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Projects$Regions$Operations$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * dataproc.projects.regions.operations.get
         * @desc Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.operations.get({
         *     // The name of the operation resource.
         *     name: 'projects/my-project/regions/my-region/operations/my-operation',
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
         * @alias dataproc.projects.regions.operations.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The name of the operation resource.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Regions$Operations$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Regions$Operations$Get, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        get(params: Params$Resource$Projects$Regions$Operations$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Regions$Operations$Get, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        get(params: Params$Resource$Projects$Regions$Operations$Get, callback: BodyResponseCallback<Schema$Operation>): void;
        get(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * dataproc.projects.regions.operations.getIamPolicy
         * @desc Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.operations.getIamPolicy({
         *     // REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         *     resource: 'projects/my-project/regions/my-region/operations/my-operation',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "options": {}
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
         * @alias dataproc.projects.regions.operations.getIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         * @param {().GetIamPolicyRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getIamPolicy(params: Params$Resource$Projects$Regions$Operations$Getiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getIamPolicy(params?: Params$Resource$Projects$Regions$Operations$Getiampolicy, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        getIamPolicy(params: Params$Resource$Projects$Regions$Operations$Getiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getIamPolicy(params: Params$Resource$Projects$Regions$Operations$Getiampolicy, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        getIamPolicy(params: Params$Resource$Projects$Regions$Operations$Getiampolicy, callback: BodyResponseCallback<Schema$Policy>): void;
        getIamPolicy(callback: BodyResponseCallback<Schema$Policy>): void;
        /**
         * dataproc.projects.regions.operations.list
         * @desc Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns UNIMPLEMENTED.NOTE: the name binding allows API services to override the binding to use different resource name schemes, such as users/x/operations. To override the binding, API services can add a binding such as "/v1/{name=users/x}/operations" to their service configuration. For backwards compatibility, the default name includes the operations collection id, however overriding users must ensure the name binding is the parent resource, without the operations collection id.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.operations.list({
         *     // The standard list filter.
         *     filter: 'placeholder-value',
         *     // The name of the operation's parent resource.
         *     name: 'projects/my-project/regions/my-region/operations',
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
         * @alias dataproc.projects.regions.operations.list
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
        list(params: Params$Resource$Projects$Regions$Operations$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Regions$Operations$List, options?: MethodOptions): GaxiosPromise<Schema$ListOperationsResponse>;
        list(params: Params$Resource$Projects$Regions$Operations$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Regions$Operations$List, options: MethodOptions | BodyResponseCallback<Schema$ListOperationsResponse>, callback: BodyResponseCallback<Schema$ListOperationsResponse>): void;
        list(params: Params$Resource$Projects$Regions$Operations$List, callback: BodyResponseCallback<Schema$ListOperationsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListOperationsResponse>): void;
        /**
         * dataproc.projects.regions.operations.setIamPolicy
         * @desc Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.operations.setIamPolicy({
         *     // REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         *     resource: 'projects/my-project/regions/my-region/operations/my-operation',
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
         * @alias dataproc.projects.regions.operations.setIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         * @param {().SetIamPolicyRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        setIamPolicy(params: Params$Resource$Projects$Regions$Operations$Setiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        setIamPolicy(params?: Params$Resource$Projects$Regions$Operations$Setiampolicy, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        setIamPolicy(params: Params$Resource$Projects$Regions$Operations$Setiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        setIamPolicy(params: Params$Resource$Projects$Regions$Operations$Setiampolicy, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        setIamPolicy(params: Params$Resource$Projects$Regions$Operations$Setiampolicy, callback: BodyResponseCallback<Schema$Policy>): void;
        setIamPolicy(callback: BodyResponseCallback<Schema$Policy>): void;
        /**
         * dataproc.projects.regions.operations.testIamPermissions
         * @desc Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.operations.testIamPermissions({
         *     // REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         *     resource: 'projects/my-project/regions/my-region/operations/my-operation',
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
         * @alias dataproc.projects.regions.operations.testIamPermissions
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         * @param {().TestIamPermissionsRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        testIamPermissions(params: Params$Resource$Projects$Regions$Operations$Testiampermissions, options: StreamMethodOptions): GaxiosPromise<Readable>;
        testIamPermissions(params?: Params$Resource$Projects$Regions$Operations$Testiampermissions, options?: MethodOptions): GaxiosPromise<Schema$TestIamPermissionsResponse>;
        testIamPermissions(params: Params$Resource$Projects$Regions$Operations$Testiampermissions, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        testIamPermissions(params: Params$Resource$Projects$Regions$Operations$Testiampermissions, options: MethodOptions | BodyResponseCallback<Schema$TestIamPermissionsResponse>, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(params: Params$Resource$Projects$Regions$Operations$Testiampermissions, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
    }
    export interface Params$Resource$Projects$Regions$Operations$Cancel extends StandardParameters {
        /**
         * The name of the operation resource to be cancelled.
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Regions$Operations$Delete extends StandardParameters {
        /**
         * The name of the operation resource to be deleted.
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Regions$Operations$Get extends StandardParameters {
        /**
         * The name of the operation resource.
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Regions$Operations$Getiampolicy extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$GetIamPolicyRequest;
    }
    export interface Params$Resource$Projects$Regions$Operations$List extends StandardParameters {
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
    export interface Params$Resource$Projects$Regions$Operations$Setiampolicy extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$SetIamPolicyRequest;
    }
    export interface Params$Resource$Projects$Regions$Operations$Testiampermissions extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$TestIamPermissionsRequest;
    }
    export class Resource$Projects$Regions$Workflowtemplates {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * dataproc.projects.regions.workflowTemplates.create
         * @desc Creates new workflow template.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.workflowTemplates.create({
         *     // Required. The resource name of the region or location, as described in https://cloud.google.com/apis/design/resource_names.
         *     // For projects.regions.workflowTemplates,create, the resource name of the  region has the following format:  projects/{project_id}/regions/{region}
         *     // For projects.locations.workflowTemplates.create, the resource name of  the location has the following format:  projects/{project_id}/locations/{location}
         *     parent: 'projects/my-project/regions/my-region',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "createTime": "my_createTime",
         *       //   "id": "my_id",
         *       //   "jobs": [],
         *       //   "labels": {},
         *       //   "name": "my_name",
         *       //   "parameters": [],
         *       //   "placement": {},
         *       //   "updateTime": "my_updateTime",
         *       //   "version": 0
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "id": "my_id",
         *   //   "jobs": [],
         *   //   "labels": {},
         *   //   "name": "my_name",
         *   //   "parameters": [],
         *   //   "placement": {},
         *   //   "updateTime": "my_updateTime",
         *   //   "version": 0
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dataproc.projects.regions.workflowTemplates.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent Required. The resource name of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates,create, the resource name of the  region has the following format:  projects/{project_id}/regions/{region} For projects.locations.workflowTemplates.create, the resource name of  the location has the following format:  projects/{project_id}/locations/{location}
         * @param {().WorkflowTemplate} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Projects$Regions$Workflowtemplates$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Projects$Regions$Workflowtemplates$Create, options?: MethodOptions): GaxiosPromise<Schema$WorkflowTemplate>;
        create(params: Params$Resource$Projects$Regions$Workflowtemplates$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Projects$Regions$Workflowtemplates$Create, options: MethodOptions | BodyResponseCallback<Schema$WorkflowTemplate>, callback: BodyResponseCallback<Schema$WorkflowTemplate>): void;
        create(params: Params$Resource$Projects$Regions$Workflowtemplates$Create, callback: BodyResponseCallback<Schema$WorkflowTemplate>): void;
        create(callback: BodyResponseCallback<Schema$WorkflowTemplate>): void;
        /**
         * dataproc.projects.regions.workflowTemplates.delete
         * @desc Deletes a workflow template. It does not cancel in-progress workflows.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.workflowTemplates.delete({
         *     // Required. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names.
         *     // For projects.regions.workflowTemplates.delete, the resource name of the template has the following format:  projects/{project_id}/regions/{region}/workflowTemplates/{template_id}
         *     // For projects.locations.workflowTemplates.instantiate, the resource name  of the template has the following format:  projects/{project_id}/locations/{location}/workflowTemplates/{template_id}
         *     name:
         *       'projects/my-project/regions/my-region/workflowTemplates/my-workflowTemplate',
         *     // Optional. The version of workflow template to delete. If specified, will only delete the template if the current server version matches specified version.
         *     version: 'placeholder-value',
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
         * @alias dataproc.projects.regions.workflowTemplates.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates.delete, the resource name of the template has the following format:  projects/{project_id}/regions/{region}/workflowTemplates/{template_id} For projects.locations.workflowTemplates.instantiate, the resource name  of the template has the following format:  projects/{project_id}/locations/{location}/workflowTemplates/{template_id}
         * @param {integer=} params.version Optional. The version of workflow template to delete. If specified, will only delete the template if the current server version matches specified version.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Projects$Regions$Workflowtemplates$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Projects$Regions$Workflowtemplates$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Projects$Regions$Workflowtemplates$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Projects$Regions$Workflowtemplates$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Projects$Regions$Workflowtemplates$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * dataproc.projects.regions.workflowTemplates.get
         * @desc Retrieves the latest workflow template.Can retrieve previously instantiated template by specifying optional version parameter.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.workflowTemplates.get({
         *     // Required. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names.
         *     // For projects.regions.workflowTemplates.get, the resource name of the  template has the following format:  projects/{project_id}/regions/{region}/workflowTemplates/{template_id}
         *     // For projects.locations.workflowTemplates.get, the resource name of the  template has the following format:  projects/{project_id}/locations/{location}/workflowTemplates/{template_id}
         *     name:
         *       'projects/my-project/regions/my-region/workflowTemplates/my-workflowTemplate',
         *     // Optional. The version of workflow template to retrieve. Only previously instantiated versions can be retrieved.If unspecified, retrieves the current version.
         *     version: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "id": "my_id",
         *   //   "jobs": [],
         *   //   "labels": {},
         *   //   "name": "my_name",
         *   //   "parameters": [],
         *   //   "placement": {},
         *   //   "updateTime": "my_updateTime",
         *   //   "version": 0
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dataproc.projects.regions.workflowTemplates.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates.get, the resource name of the  template has the following format:  projects/{project_id}/regions/{region}/workflowTemplates/{template_id} For projects.locations.workflowTemplates.get, the resource name of the  template has the following format:  projects/{project_id}/locations/{location}/workflowTemplates/{template_id}
         * @param {integer=} params.version Optional. The version of workflow template to retrieve. Only previously instantiated versions can be retrieved.If unspecified, retrieves the current version.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Regions$Workflowtemplates$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Regions$Workflowtemplates$Get, options?: MethodOptions): GaxiosPromise<Schema$WorkflowTemplate>;
        get(params: Params$Resource$Projects$Regions$Workflowtemplates$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Regions$Workflowtemplates$Get, options: MethodOptions | BodyResponseCallback<Schema$WorkflowTemplate>, callback: BodyResponseCallback<Schema$WorkflowTemplate>): void;
        get(params: Params$Resource$Projects$Regions$Workflowtemplates$Get, callback: BodyResponseCallback<Schema$WorkflowTemplate>): void;
        get(callback: BodyResponseCallback<Schema$WorkflowTemplate>): void;
        /**
         * dataproc.projects.regions.workflowTemplates.getIamPolicy
         * @desc Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.workflowTemplates.getIamPolicy({
         *     // REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         *     resource:
         *       'projects/my-project/regions/my-region/workflowTemplates/my-workflowTemplate',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "options": {}
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
         * @alias dataproc.projects.regions.workflowTemplates.getIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         * @param {().GetIamPolicyRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getIamPolicy(params: Params$Resource$Projects$Regions$Workflowtemplates$Getiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getIamPolicy(params?: Params$Resource$Projects$Regions$Workflowtemplates$Getiampolicy, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        getIamPolicy(params: Params$Resource$Projects$Regions$Workflowtemplates$Getiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getIamPolicy(params: Params$Resource$Projects$Regions$Workflowtemplates$Getiampolicy, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        getIamPolicy(params: Params$Resource$Projects$Regions$Workflowtemplates$Getiampolicy, callback: BodyResponseCallback<Schema$Policy>): void;
        getIamPolicy(callback: BodyResponseCallback<Schema$Policy>): void;
        /**
         * dataproc.projects.regions.workflowTemplates.instantiate
         * @desc Instantiates a template and begins execution.The returned Operation can be used to track execution of workflow by polling operations.get. The Operation will complete when entire workflow is finished.The running workflow can be aborted via operations.cancel. This will cause any inflight jobs to be cancelled and workflow-owned clusters to be deleted.The Operation.metadata will be WorkflowMetadata (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#workflowmetadata). Also see Using WorkflowMetadata (https://cloud.google.com/dataproc/docs/concepts/workflows/debugging#using_workflowmetadata).On successful completion, Operation.response will be Empty.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.workflowTemplates.instantiate({
         *     // Required. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names.
         *     // For projects.regions.workflowTemplates.instantiate, the resource name of the template has the following format:  projects/{project_id}/regions/{region}/workflowTemplates/{template_id}
         *     // For projects.locations.workflowTemplates.instantiate, the resource name  of the template has the following format:  projects/{project_id}/locations/{location}/workflowTemplates/{template_id}
         *     name:
         *       'projects/my-project/regions/my-region/workflowTemplates/my-workflowTemplate',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "parameters": {},
         *       //   "requestId": "my_requestId",
         *       //   "version": 0
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
         * @alias dataproc.projects.regions.workflowTemplates.instantiate
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates.instantiate, the resource name of the template has the following format:  projects/{project_id}/regions/{region}/workflowTemplates/{template_id} For projects.locations.workflowTemplates.instantiate, the resource name  of the template has the following format:  projects/{project_id}/locations/{location}/workflowTemplates/{template_id}
         * @param {().InstantiateWorkflowTemplateRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        instantiate(params: Params$Resource$Projects$Regions$Workflowtemplates$Instantiate, options: StreamMethodOptions): GaxiosPromise<Readable>;
        instantiate(params?: Params$Resource$Projects$Regions$Workflowtemplates$Instantiate, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        instantiate(params: Params$Resource$Projects$Regions$Workflowtemplates$Instantiate, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        instantiate(params: Params$Resource$Projects$Regions$Workflowtemplates$Instantiate, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        instantiate(params: Params$Resource$Projects$Regions$Workflowtemplates$Instantiate, callback: BodyResponseCallback<Schema$Operation>): void;
        instantiate(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * dataproc.projects.regions.workflowTemplates.instantiateInline
         * @desc Instantiates a template and begins execution.This method is equivalent to executing the sequence CreateWorkflowTemplate, InstantiateWorkflowTemplate, DeleteWorkflowTemplate.The returned Operation can be used to track execution of workflow by polling operations.get. The Operation will complete when entire workflow is finished.The running workflow can be aborted via operations.cancel. This will cause any inflight jobs to be cancelled and workflow-owned clusters to be deleted.The Operation.metadata will be WorkflowMetadata (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#workflowmetadata). Also see Using WorkflowMetadata (https://cloud.google.com/dataproc/docs/concepts/workflows/debugging#using_workflowmetadata).On successful completion, Operation.response will be Empty.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.workflowTemplates.instantiateInline(
         *     {
         *       // Required. The resource name of the region or location, as described in https://cloud.google.com/apis/design/resource_names.
         *       // For projects.regions.workflowTemplates,instantiateinline, the resource  name of the region has the following format:  projects/{project_id}/regions/{region}
         *       // For projects.locations.workflowTemplates.instantiateinline, the  resource name of the location has the following format:  projects/{project_id}/locations/{location}
         *       parent: 'projects/my-project/regions/my-region',
         *       // Optional. A tag that prevents multiple concurrent workflow instances with the same tag from running. This mitigates risk of concurrent instances started due to retries.It is recommended to always set this value to a UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier).The tag must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters.
         *       requestId: 'placeholder-value',
         *
         *       // Request body metadata
         *       requestBody: {
         *         // request body parameters
         *         // {
         *         //   "createTime": "my_createTime",
         *         //   "id": "my_id",
         *         //   "jobs": [],
         *         //   "labels": {},
         *         //   "name": "my_name",
         *         //   "parameters": [],
         *         //   "placement": {},
         *         //   "updateTime": "my_updateTime",
         *         //   "version": 0
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
         * @alias dataproc.projects.regions.workflowTemplates.instantiateInline
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent Required. The resource name of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates,instantiateinline, the resource  name of the region has the following format:  projects/{project_id}/regions/{region} For projects.locations.workflowTemplates.instantiateinline, the  resource name of the location has the following format:  projects/{project_id}/locations/{location}
         * @param {string=} params.requestId Optional. A tag that prevents multiple concurrent workflow instances with the same tag from running. This mitigates risk of concurrent instances started due to retries.It is recommended to always set this value to a UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier).The tag must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters.
         * @param {().WorkflowTemplate} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        instantiateInline(params: Params$Resource$Projects$Regions$Workflowtemplates$Instantiateinline, options: StreamMethodOptions): GaxiosPromise<Readable>;
        instantiateInline(params?: Params$Resource$Projects$Regions$Workflowtemplates$Instantiateinline, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        instantiateInline(params: Params$Resource$Projects$Regions$Workflowtemplates$Instantiateinline, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        instantiateInline(params: Params$Resource$Projects$Regions$Workflowtemplates$Instantiateinline, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        instantiateInline(params: Params$Resource$Projects$Regions$Workflowtemplates$Instantiateinline, callback: BodyResponseCallback<Schema$Operation>): void;
        instantiateInline(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * dataproc.projects.regions.workflowTemplates.list
         * @desc Lists workflows that match the specified filter in the request.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.workflowTemplates.list({
         *     // Optional. The maximum number of results to return in each response.
         *     pageSize: 'placeholder-value',
         *     // Optional. The page token, returned by a previous call, to request the next page of results.
         *     pageToken: 'placeholder-value',
         *     // Required. The resource name of the region or location, as described in https://cloud.google.com/apis/design/resource_names.
         *     // For projects.regions.workflowTemplates,list, the resource  name of the region has the following format:  projects/{project_id}/regions/{region}
         *     // For projects.locations.workflowTemplates.list, the  resource name of the location has the following format:  projects/{project_id}/locations/{location}
         *     parent: 'projects/my-project/regions/my-region',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "templates": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dataproc.projects.regions.workflowTemplates.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize Optional. The maximum number of results to return in each response.
         * @param {string=} params.pageToken Optional. The page token, returned by a previous call, to request the next page of results.
         * @param {string} params.parent Required. The resource name of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates,list, the resource  name of the region has the following format:  projects/{project_id}/regions/{region} For projects.locations.workflowTemplates.list, the  resource name of the location has the following format:  projects/{project_id}/locations/{location}
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Regions$Workflowtemplates$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Regions$Workflowtemplates$List, options?: MethodOptions): GaxiosPromise<Schema$ListWorkflowTemplatesResponse>;
        list(params: Params$Resource$Projects$Regions$Workflowtemplates$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Regions$Workflowtemplates$List, options: MethodOptions | BodyResponseCallback<Schema$ListWorkflowTemplatesResponse>, callback: BodyResponseCallback<Schema$ListWorkflowTemplatesResponse>): void;
        list(params: Params$Resource$Projects$Regions$Workflowtemplates$List, callback: BodyResponseCallback<Schema$ListWorkflowTemplatesResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListWorkflowTemplatesResponse>): void;
        /**
         * dataproc.projects.regions.workflowTemplates.setIamPolicy
         * @desc Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.workflowTemplates.setIamPolicy({
         *     // REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         *     resource:
         *       'projects/my-project/regions/my-region/workflowTemplates/my-workflowTemplate',
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
         * @alias dataproc.projects.regions.workflowTemplates.setIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         * @param {().SetIamPolicyRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        setIamPolicy(params: Params$Resource$Projects$Regions$Workflowtemplates$Setiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        setIamPolicy(params?: Params$Resource$Projects$Regions$Workflowtemplates$Setiampolicy, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        setIamPolicy(params: Params$Resource$Projects$Regions$Workflowtemplates$Setiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        setIamPolicy(params: Params$Resource$Projects$Regions$Workflowtemplates$Setiampolicy, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        setIamPolicy(params: Params$Resource$Projects$Regions$Workflowtemplates$Setiampolicy, callback: BodyResponseCallback<Schema$Policy>): void;
        setIamPolicy(callback: BodyResponseCallback<Schema$Policy>): void;
        /**
         * dataproc.projects.regions.workflowTemplates.testIamPermissions
         * @desc Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.workflowTemplates.testIamPermissions(
         *     {
         *       // REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         *       resource:
         *         'projects/my-project/regions/my-region/workflowTemplates/my-workflowTemplate',
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
         * @alias dataproc.projects.regions.workflowTemplates.testIamPermissions
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         * @param {().TestIamPermissionsRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        testIamPermissions(params: Params$Resource$Projects$Regions$Workflowtemplates$Testiampermissions, options: StreamMethodOptions): GaxiosPromise<Readable>;
        testIamPermissions(params?: Params$Resource$Projects$Regions$Workflowtemplates$Testiampermissions, options?: MethodOptions): GaxiosPromise<Schema$TestIamPermissionsResponse>;
        testIamPermissions(params: Params$Resource$Projects$Regions$Workflowtemplates$Testiampermissions, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        testIamPermissions(params: Params$Resource$Projects$Regions$Workflowtemplates$Testiampermissions, options: MethodOptions | BodyResponseCallback<Schema$TestIamPermissionsResponse>, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(params: Params$Resource$Projects$Regions$Workflowtemplates$Testiampermissions, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        /**
         * dataproc.projects.regions.workflowTemplates.update
         * @desc Updates (replaces) workflow template. The updated template must contain version that matches the current server version.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dataproc.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dataproc = google.dataproc('v1');
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
         *   const res = await dataproc.projects.regions.workflowTemplates.update({
         *     // Output only. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names.
         *     // For projects.regions.workflowTemplates, the resource name of the  template has the following format:  projects/{project_id}/regions/{region}/workflowTemplates/{template_id}
         *     // For projects.locations.workflowTemplates, the resource name of the  template has the following format:  projects/{project_id}/locations/{location}/workflowTemplates/{template_id}
         *     name:
         *       'projects/my-project/regions/my-region/workflowTemplates/my-workflowTemplate',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "createTime": "my_createTime",
         *       //   "id": "my_id",
         *       //   "jobs": [],
         *       //   "labels": {},
         *       //   "name": "my_name",
         *       //   "parameters": [],
         *       //   "placement": {},
         *       //   "updateTime": "my_updateTime",
         *       //   "version": 0
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "id": "my_id",
         *   //   "jobs": [],
         *   //   "labels": {},
         *   //   "name": "my_name",
         *   //   "parameters": [],
         *   //   "placement": {},
         *   //   "updateTime": "my_updateTime",
         *   //   "version": 0
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dataproc.projects.regions.workflowTemplates.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Output only. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates, the resource name of the  template has the following format:  projects/{project_id}/regions/{region}/workflowTemplates/{template_id} For projects.locations.workflowTemplates, the resource name of the  template has the following format:  projects/{project_id}/locations/{location}/workflowTemplates/{template_id}
         * @param {().WorkflowTemplate} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Projects$Regions$Workflowtemplates$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Projects$Regions$Workflowtemplates$Update, options?: MethodOptions): GaxiosPromise<Schema$WorkflowTemplate>;
        update(params: Params$Resource$Projects$Regions$Workflowtemplates$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Projects$Regions$Workflowtemplates$Update, options: MethodOptions | BodyResponseCallback<Schema$WorkflowTemplate>, callback: BodyResponseCallback<Schema$WorkflowTemplate>): void;
        update(params: Params$Resource$Projects$Regions$Workflowtemplates$Update, callback: BodyResponseCallback<Schema$WorkflowTemplate>): void;
        update(callback: BodyResponseCallback<Schema$WorkflowTemplate>): void;
    }
    export interface Params$Resource$Projects$Regions$Workflowtemplates$Create extends StandardParameters {
        /**
         * Required. The resource name of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates,create, the resource name of the  region has the following format:  projects/{project_id}/regions/{region} For projects.locations.workflowTemplates.create, the resource name of  the location has the following format:  projects/{project_id}/locations/{location}
         */
        parent?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$WorkflowTemplate;
    }
    export interface Params$Resource$Projects$Regions$Workflowtemplates$Delete extends StandardParameters {
        /**
         * Required. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates.delete, the resource name of the template has the following format:  projects/{project_id}/regions/{region}/workflowTemplates/{template_id} For projects.locations.workflowTemplates.instantiate, the resource name  of the template has the following format:  projects/{project_id}/locations/{location}/workflowTemplates/{template_id}
         */
        name?: string;
        /**
         * Optional. The version of workflow template to delete. If specified, will only delete the template if the current server version matches specified version.
         */
        version?: number;
    }
    export interface Params$Resource$Projects$Regions$Workflowtemplates$Get extends StandardParameters {
        /**
         * Required. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates.get, the resource name of the  template has the following format:  projects/{project_id}/regions/{region}/workflowTemplates/{template_id} For projects.locations.workflowTemplates.get, the resource name of the  template has the following format:  projects/{project_id}/locations/{location}/workflowTemplates/{template_id}
         */
        name?: string;
        /**
         * Optional. The version of workflow template to retrieve. Only previously instantiated versions can be retrieved.If unspecified, retrieves the current version.
         */
        version?: number;
    }
    export interface Params$Resource$Projects$Regions$Workflowtemplates$Getiampolicy extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$GetIamPolicyRequest;
    }
    export interface Params$Resource$Projects$Regions$Workflowtemplates$Instantiate extends StandardParameters {
        /**
         * Required. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates.instantiate, the resource name of the template has the following format:  projects/{project_id}/regions/{region}/workflowTemplates/{template_id} For projects.locations.workflowTemplates.instantiate, the resource name  of the template has the following format:  projects/{project_id}/locations/{location}/workflowTemplates/{template_id}
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$InstantiateWorkflowTemplateRequest;
    }
    export interface Params$Resource$Projects$Regions$Workflowtemplates$Instantiateinline extends StandardParameters {
        /**
         * Required. The resource name of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates,instantiateinline, the resource  name of the region has the following format:  projects/{project_id}/regions/{region} For projects.locations.workflowTemplates.instantiateinline, the  resource name of the location has the following format:  projects/{project_id}/locations/{location}
         */
        parent?: string;
        /**
         * Optional. A tag that prevents multiple concurrent workflow instances with the same tag from running. This mitigates risk of concurrent instances started due to retries.It is recommended to always set this value to a UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier).The tag must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters.
         */
        requestId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$WorkflowTemplate;
    }
    export interface Params$Resource$Projects$Regions$Workflowtemplates$List extends StandardParameters {
        /**
         * Optional. The maximum number of results to return in each response.
         */
        pageSize?: number;
        /**
         * Optional. The page token, returned by a previous call, to request the next page of results.
         */
        pageToken?: string;
        /**
         * Required. The resource name of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates,list, the resource  name of the region has the following format:  projects/{project_id}/regions/{region} For projects.locations.workflowTemplates.list, the  resource name of the location has the following format:  projects/{project_id}/locations/{location}
         */
        parent?: string;
    }
    export interface Params$Resource$Projects$Regions$Workflowtemplates$Setiampolicy extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$SetIamPolicyRequest;
    }
    export interface Params$Resource$Projects$Regions$Workflowtemplates$Testiampermissions extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$TestIamPermissionsRequest;
    }
    export interface Params$Resource$Projects$Regions$Workflowtemplates$Update extends StandardParameters {
        /**
         * Output only. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates, the resource name of the  template has the following format:  projects/{project_id}/regions/{region}/workflowTemplates/{template_id} For projects.locations.workflowTemplates, the resource name of the  template has the following format:  projects/{project_id}/locations/{location}/workflowTemplates/{template_id}
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$WorkflowTemplate;
    }
    export {};
}
