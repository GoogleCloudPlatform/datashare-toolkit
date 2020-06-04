/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace cloudbuild_v1alpha2 {
    export interface Options extends GlobalOptions {
        version: 'v1alpha2';
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
     * Cloud Build API
     *
     * Creates and manages builds on Google Cloud Platform.
     *
     * @example
     * const {google} = require('googleapis');
     * const cloudbuild = google.cloudbuild('v1alpha2');
     *
     * @namespace cloudbuild
     * @type {Function}
     * @version v1alpha2
     * @variation v1alpha2
     * @param {object=} options Options for Cloudbuild
     */
    export class Cloudbuild {
        context: APIRequestContext;
        projects: Resource$Projects;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    /**
     * Files in the workspace to upload to Cloud Storage upon successful completion of all build steps.
     */
    export interface Schema$ArtifactObjects {
        /**
         * Cloud Storage bucket and optional object path, in the form &quot;gs://bucket/path/to/somewhere/&quot;. (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)).  Files in the workspace matching any path pattern will be uploaded to Cloud Storage with this location as a prefix.
         */
        location?: string | null;
        /**
         * Path globs used to match files in the build&#39;s workspace.
         */
        paths?: string[] | null;
        /**
         * Output only. Stores timing information for pushing all artifact objects.
         */
        timing?: Schema$TimeSpan;
    }
    /**
     * An artifact that was uploaded during a build. This is a single record in the artifact manifest JSON file.
     */
    export interface Schema$ArtifactResult {
        /**
         * The file hash of the artifact.
         */
        fileHash?: Schema$FileHashes[];
        /**
         * The path of an artifact in a Google Cloud Storage bucket, with the generation number. For example, `gs://mybucket/path/to/output.jar#generation`.
         */
        location?: string | null;
    }
    /**
     * Artifacts produced by a build that should be uploaded upon successful completion of all build steps.
     */
    export interface Schema$Artifacts {
        /**
         * A list of images to be pushed upon the successful completion of all build steps.  The images will be pushed using the builder service account&#39;s credentials.  The digests of the pushed images will be stored in the Build resource&#39;s results field.  If any of the images fail to be pushed, the build is marked FAILURE.
         */
        images?: string[] | null;
        /**
         * A list of objects to be uploaded to Cloud Storage upon successful completion of all build steps.  Files in the workspace matching specified paths globs will be uploaded to the specified Cloud Storage location using the builder service account&#39;s credentials.  The location and generation of the uploaded objects will be stored in the Build resource&#39;s results field.  If any objects fail to be pushed, the build is marked FAILURE.
         */
        objects?: Schema$ArtifactObjects;
    }
    /**
     * A build resource in the Cloud Build API.  At a high level, a `Build` describes where to find source code, how to build it (for example, the builder image to run on the source), and where to store the built artifacts.  Fields can include the following variables, which will be expanded when the build is created:  - $PROJECT_ID: the project ID of the build. - $BUILD_ID: the autogenerated ID of the build. - $REPO_NAME: the source repository name specified by RepoSource. - $BRANCH_NAME: the branch name specified by RepoSource. - $TAG_NAME: the tag name specified by RepoSource. - $REVISION_ID or $COMMIT_SHA: the commit SHA specified by RepoSource or   resolved from the specified branch or tag. - $SHORT_SHA: first 7 characters of $REVISION_ID or $COMMIT_SHA.
     */
    export interface Schema$Build {
        /**
         * Artifacts produced by the build that should be uploaded upon successful completion of all build steps.
         */
        artifacts?: Schema$Artifacts;
        /**
         * Output only. The ID of the `BuildTrigger` that triggered this build, if it was triggered automatically.
         */
        buildTriggerId?: string | null;
        /**
         * Output only. Time at which the request to create the build was received.
         */
        createTime?: string | null;
        /**
         * Output only. Time at which execution of the build was finished.  The difference between finish_time and start_time is the duration of the build&#39;s execution.
         */
        finishTime?: string | null;
        /**
         * Output only. Unique identifier of the build.
         */
        id?: string | null;
        /**
         * A list of images to be pushed upon the successful completion of all build steps.  The images are pushed using the builder service account&#39;s credentials.  The digests of the pushed images will be stored in the `Build` resource&#39;s results field.  If any of the images fail to be pushed, the build status is marked `FAILURE`.
         */
        images?: string[] | null;
        /**
         * Google Cloud Storage bucket where logs should be written (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)). Logs file names will be of the format `${logs_bucket}/log-${build_id}.txt`.
         */
        logsBucket?: string | null;
        /**
         * Output only. URL to logs for this build in Google Cloud Console.
         */
        logUrl?: string | null;
        /**
         * Special options for this build.
         */
        options?: Schema$BuildOptions;
        /**
         * Output only. ID of the project.
         */
        projectId?: string | null;
        /**
         * TTL in queue for this build. If provided and the build is enqueued longer than this value, the build will expire and the build status will be `EXPIRED`.  The TTL starts ticking from create_time.
         */
        queueTtl?: string | null;
        /**
         * Output only. Results of the build.
         */
        results?: Schema$Results;
        /**
         * Secrets to decrypt using Cloud Key Management Service.
         */
        secrets?: Schema$Secret[];
        /**
         * The location of the source files to build.
         */
        source?: Schema$Source;
        /**
         * Output only. A permanent fixed identifier for source.
         */
        sourceProvenance?: Schema$SourceProvenance;
        /**
         * Output only. Time at which execution of the build was started.
         */
        startTime?: string | null;
        /**
         * Output only. Status of the build.
         */
        status?: string | null;
        /**
         * Output only. Customer-readable message about the current status.
         */
        statusDetail?: string | null;
        /**
         * Required. The operations to be performed on the workspace.
         */
        steps?: Schema$BuildStep[];
        /**
         * Substitutions data for `Build` resource.
         */
        substitutions?: {
            [key: string]: string;
        } | null;
        /**
         * Tags for annotation of a `Build`. These are not docker tags.
         */
        tags?: string[] | null;
        /**
         * Amount of time that this build should be allowed to run, to second granularity. If this amount of time elapses, work on the build will cease and the build status will be `TIMEOUT`.  `timeout` starts ticking from `startTime`.  Default time is ten minutes.
         */
        timeout?: string | null;
        /**
         * Output only. Stores timing information for phases of the build. Valid keys are:  * BUILD: time to execute all build steps * PUSH: time to push all specified images. * FETCHSOURCE: time to fetch source.  If the build does not specify source or images, these keys will not be included.
         */
        timing?: {
            [key: string]: Schema$TimeSpan;
        } | null;
    }
    /**
     * Metadata for build operations.
     */
    export interface Schema$BuildOperationMetadata {
        /**
         * The build that the operation is tracking.
         */
        build?: Schema$Build;
    }
    /**
     * Optional arguments to enable specific features of builds.
     */
    export interface Schema$BuildOptions {
        /**
         * Requested disk size for the VM that runs the build. Note that this is *NOT* &quot;disk free&quot;; some of the space will be used by the operating system and build utilities. Also note that this is the minimum disk size that will be allocated for the build -- the build may run with a larger disk than requested. At present, the maximum disk size is 1000GB; builds that request more than the maximum are rejected with an error.
         */
        diskSizeGb?: string | null;
        /**
         * Option to specify whether or not to apply bash style string operations to the substitutions.  NOTE: this is always enabled for triggered builds and cannot be overridden in the build configuration file.
         */
        dynamicSubstitutions?: boolean | null;
        /**
         * A list of global environment variable definitions that will exist for all build steps in this build. If a variable is defined in both globally and in a build step, the variable will use the build step value.  The elements are of the form &quot;KEY=VALUE&quot; for the environment variable &quot;KEY&quot; being given the value &quot;VALUE&quot;.
         */
        env?: string[] | null;
        /**
         * Option to specify the logging mode, which determines where the logs are stored.
         */
        logging?: string | null;
        /**
         * Option to define build log streaming behavior to Google Cloud Storage.
         */
        logStreamingOption?: string | null;
        /**
         * Compute Engine machine type on which to run the build.
         */
        machineType?: string | null;
        /**
         * Requested verifiability options.
         */
        requestedVerifyOption?: string | null;
        /**
         * A list of global environment variables, which are encrypted using a Cloud Key Management Service crypto key. These values must be specified in the build&#39;s `Secret`. These variables will be available to all build steps in this build.
         */
        secretEnv?: string[] | null;
        /**
         * Requested hash for SourceProvenance.
         */
        sourceProvenanceHash?: string[] | null;
        /**
         * Option to specify behavior when there is an error in the substitution checks.  NOTE: this is always set to ALLOW_LOOSE for triggered builds and cannot be overridden in the build configuration file.
         */
        substitutionOption?: string | null;
        /**
         * Global list of volumes to mount for ALL build steps  Each volume is created as an empty volume prior to starting the build process. Upon completion of the build, volumes and their contents are discarded. Global volume names and paths cannot conflict with the volumes defined a build step.  Using a global volume in a build with only one step is not valid as it is indicative of a build request with an incorrect configuration.
         */
        volumes?: Schema$Volume[];
        /**
         * Option to specify a `WorkerPool` for the build. Format: projects/{project}/workerPools/{workerPool}  This field is experimental.
         */
        workerPool?: string | null;
    }
    /**
     * A step in the build pipeline.
     */
    export interface Schema$BuildStep {
        /**
         * A list of arguments that will be presented to the step when it is started.  If the image used to run the step&#39;s container has an entrypoint, the `args` are used as arguments to that entrypoint. If the image does not define an entrypoint, the first element in args is used as the entrypoint, and the remainder will be used as arguments.
         */
        args?: string[] | null;
        /**
         * Working directory to use when running this step&#39;s container.  If this value is a relative path, it is relative to the build&#39;s working directory. If this value is absolute, it may be outside the build&#39;s working directory, in which case the contents of the path may not be persisted across build step executions, unless a `volume` for that path is specified.  If the build specifies a `RepoSource` with `dir` and a step with a `dir`, which specifies an absolute path, the `RepoSource` `dir` is ignored for the step&#39;s execution.
         */
        dir?: string | null;
        /**
         * Entrypoint to be used instead of the build step image&#39;s default entrypoint. If unset, the image&#39;s default entrypoint is used.
         */
        entrypoint?: string | null;
        /**
         * A list of environment variable definitions to be used when running a step.  The elements are of the form &quot;KEY=VALUE&quot; for the environment variable &quot;KEY&quot; being given the value &quot;VALUE&quot;.
         */
        env?: string[] | null;
        /**
         * Unique identifier for this build step, used in `wait_for` to reference this build step as a dependency.
         */
        id?: string | null;
        /**
         * Required. The name of the container image that will run this particular build step.  If the image is available in the host&#39;s Docker daemon&#39;s cache, it will be run directly. If not, the host will attempt to pull the image first, using the builder service account&#39;s credentials if necessary.  The Docker daemon&#39;s cache will already have the latest versions of all of the officially supported build steps ([https://github.com/GoogleCloudPlatform/cloud-builders](https://github.com/GoogleCloudPlatform/cloud-builders)). The Docker daemon will also have cached many of the layers for some popular images, like &quot;ubuntu&quot;, &quot;debian&quot;, but they will be refreshed at the time you attempt to use them.  If you built an image in a previous build step, it will be stored in the host&#39;s Docker daemon&#39;s cache and is available to use as the name for a later build step.
         */
        name?: string | null;
        /**
         * Output only. Stores timing information for pulling this build step&#39;s builder image only.
         */
        pullTiming?: Schema$TimeSpan;
        /**
         * A list of environment variables which are encrypted using a Cloud Key Management Service crypto key. These values must be specified in the build&#39;s `Secret`.
         */
        secretEnv?: string[] | null;
        /**
         * Output only. Status of the build step. At this time, build step status is only updated on build completion; step status is not updated in real-time as the build progresses.
         */
        status?: string | null;
        /**
         * Time limit for executing this build step. If not defined, the step has no time limit and will be allowed to continue to run until either it completes or the build itself times out.
         */
        timeout?: string | null;
        /**
         * Output only. Stores timing information for executing this build step.
         */
        timing?: Schema$TimeSpan;
        /**
         * List of volumes to mount into the build step.  Each volume is created as an empty volume prior to execution of the build step. Upon completion of the build, volumes and their contents are discarded.  Using a named volume in only one step is not valid as it is indicative of a build request with an incorrect configuration.
         */
        volumes?: Schema$Volume[];
        /**
         * The ID(s) of the step(s) that this build step depends on. This build step will not start until all the build steps in `wait_for` have completed successfully. If `wait_for` is empty, this build step will start when all previous build steps in the `Build.Steps` list have completed successfully.
         */
        waitFor?: string[] | null;
    }
    /**
     * An image built by the pipeline.
     */
    export interface Schema$BuiltImage {
        /**
         * Docker Registry 2.0 digest.
         */
        digest?: string | null;
        /**
         * Name used to push the container image to Google Container Registry, as presented to `docker push`.
         */
        name?: string | null;
        /**
         * Output only. Stores timing information for pushing the specified image.
         */
        pushTiming?: Schema$TimeSpan;
    }
    /**
     * The request message for Operations.CancelOperation.
     */
    export interface Schema$CancelOperationRequest {
    }
    /**
     * A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance:      service Foo {       rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty);     }  The JSON representation for `Empty` is empty JSON object `{}`.
     */
    export interface Schema$Empty {
    }
    /**
     * Container message for hashes of byte content of files, used in SourceProvenance messages to verify integrity of source input to the build.
     */
    export interface Schema$FileHashes {
        /**
         * Collection of file hashes.
         */
        fileHash?: Schema$Hash[];
    }
    /**
     * Container message for hash values.
     */
    export interface Schema$Hash {
        /**
         * The type of hash that was performed.
         */
        type?: string | null;
        /**
         * The hash value.
         */
        value?: string | null;
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
     * Response containing existing `WorkerPools`.
     */
    export interface Schema$ListWorkerPoolsResponse {
        /**
         * `WorkerPools` for the specified project.
         */
        workerPools?: Schema$WorkerPool[];
    }
    /**
     * Network describes the network configuration for a `WorkerPool`.
     */
    export interface Schema$NetworkConfig {
        /**
         * Required. Immutable. The network definition that the workers are peered to. If this section is left empty, the workers will be peered to WorkerPool.project_id on the default network. Must be in the format `projects/{project}/global/networks/{network}`, where {project} is a project number, such as `12345`, and {network} is the name of a VPC network in the project.
         */
        peeredNetwork?: string | null;
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
     * Location of the source in a Google Cloud Source Repository.
     */
    export interface Schema$RepoSource {
        /**
         * Regex matching branches to build.  The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax
         */
        branchName?: string | null;
        /**
         * Explicit commit SHA to build.
         */
        commitSha?: string | null;
        /**
         * Directory, relative to the source root, in which to run the build.  This must be a relative path. If a step&#39;s `dir` is specified and is an absolute path, this value is ignored for that step&#39;s execution.
         */
        dir?: string | null;
        /**
         * Only trigger a build if the revision regex does NOT match the revision regex.
         */
        invertRegex?: boolean | null;
        /**
         * ID of the project that owns the Cloud Source Repository. If omitted, the project ID requesting the build is assumed.
         */
        projectId?: string | null;
        /**
         * Required. Name of the Cloud Source Repository.
         */
        repoName?: string | null;
        /**
         * Substitutions to use in a triggered build. Should only be used with RunBuildTrigger
         */
        substitutions?: {
            [key: string]: string;
        } | null;
        /**
         * Regex matching tags to build.  The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax
         */
        tagName?: string | null;
    }
    /**
     * Artifacts created by the build pipeline.
     */
    export interface Schema$Results {
        /**
         * Path to the artifact manifest. Only populated when artifacts are uploaded.
         */
        artifactManifest?: string | null;
        /**
         * Time to push all non-container artifacts.
         */
        artifactTiming?: Schema$TimeSpan;
        /**
         * List of build step digests, in the order corresponding to build step indices.
         */
        buildStepImages?: string[] | null;
        /**
         * List of build step outputs, produced by builder images, in the order corresponding to build step indices.  [Cloud Builders](https://cloud.google.com/cloud-build/docs/cloud-builders) can produce this output by writing to `$BUILDER_OUTPUT/output`. Only the first 4KB of data is stored.
         */
        buildStepOutputs?: string[] | null;
        /**
         * Container images that were built as a part of the build.
         */
        images?: Schema$BuiltImage[];
        /**
         * Number of artifacts uploaded. Only populated when artifacts are uploaded.
         */
        numArtifacts?: string | null;
    }
    /**
     * Pairs a set of secret environment variables containing encrypted values with the Cloud KMS key to use to decrypt the value.
     */
    export interface Schema$Secret {
        /**
         * Cloud KMS key name to use to decrypt these envs.
         */
        kmsKeyName?: string | null;
        /**
         * Map of environment variable name to its encrypted value.  Secret environment variables must be unique across all of a build&#39;s secrets, and must be used by at least one build step. Values can be at most 64 KB in size. There can be at most 100 secret values across all of a build&#39;s secrets.
         */
        secretEnv?: {
            [key: string]: string;
        } | null;
    }
    /**
     * Location of the source in a supported storage service.
     */
    export interface Schema$Source {
        /**
         * If provided, get the source from this location in a Cloud Source Repository.
         */
        repoSource?: Schema$RepoSource;
        /**
         * If provided, get the source from this location in Google Cloud Storage.
         */
        storageSource?: Schema$StorageSource;
    }
    /**
     * Provenance of the source. Ways to find the original source, or verify that some source was used for this build.
     */
    export interface Schema$SourceProvenance {
        /**
         * Output only. Hash(es) of the build source, which can be used to verify that the original source integrity was maintained in the build. Note that `FileHashes` will only be populated if `BuildOptions` has requested a `SourceProvenanceHash`.  The keys to this map are file paths used as build source and the values contain the hash values for those files.  If the build source came in a single package such as a gzipped tarfile (`.tar.gz`), the `FileHash` will be for the single path to that file.
         */
        fileHashes?: {
            [key: string]: Schema$FileHashes;
        } | null;
        /**
         * A copy of the build&#39;s `source.repo_source`, if exists, with any revisions resolved.
         */
        resolvedRepoSource?: Schema$RepoSource;
        /**
         * A copy of the build&#39;s `source.storage_source`, if exists, with any generations resolved.
         */
        resolvedStorageSource?: Schema$StorageSource;
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
     * Location of the source in an archive file in Google Cloud Storage.
     */
    export interface Schema$StorageSource {
        /**
         * Google Cloud Storage bucket containing the source (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)).
         */
        bucket?: string | null;
        /**
         * Google Cloud Storage generation for the object. If the generation is omitted, the latest generation will be used.
         */
        generation?: string | null;
        /**
         * Google Cloud Storage object containing the source.  This object must be a gzipped archive file (`.tar.gz`) containing source to build.
         */
        object?: string | null;
    }
    /**
     * Start and end times for a build execution phase.
     */
    export interface Schema$TimeSpan {
        /**
         * End of time span.
         */
        endTime?: string | null;
        /**
         * Start of time span.
         */
        startTime?: string | null;
    }
    /**
     * Volume describes a Docker container volume which is mounted into build steps in order to persist files across build step execution.
     */
    export interface Schema$Volume {
        /**
         * Name of the volume to mount.  Volume names must be unique per build step and must be valid names for Docker volumes. Each named volume must be used by at least two build steps.
         */
        name?: string | null;
        /**
         * Path at which to mount the volume.  Paths must be absolute and cannot conflict with other volume paths on the same build step or with certain reserved volume paths.
         */
        path?: string | null;
    }
    /**
     * WorkerConfig defines the configuration to be used for a creating workers in the pool.
     */
    export interface Schema$WorkerConfig {
        /**
         * Size of the disk attached to the worker, in GB. See https://cloud.google.com/compute/docs/disks/ If `0` is specified, Cloud Build will use a standard disk size.
         */
        diskSizeGb?: string | null;
        /**
         * Machine Type of the worker, such as n1-standard-1. See https://cloud.google.com/compute/docs/machine-types. If left blank, Cloud Build will use a standard unspecified machine to create the worker pool.
         */
        machineType?: string | null;
    }
    /**
     * Configuration for a WorkerPool to run the builds.  Workers are machines that Cloud Build uses to run your builds. By default, all workers run in a project owned by Cloud Build. To have full control over the workers that execute your builds -- such as enabling them to access private resources on your private network -- you can request Cloud Build to run the workers in your own project by creating a custom workers pool.
     */
    export interface Schema$WorkerPool {
        /**
         * Output only. Time at which the request to create the `WorkerPool` was received.
         */
        createTime?: string | null;
        /**
         * Output only. Time at which the request to delete the `WorkerPool` was received.
         */
        deleteTime?: string | null;
        /**
         * Output only. The resource name of the `WorkerPool`. Format of the name is `projects/{project_id}/workerPools/{worker_pool_id}`, where the value of {worker_pool_id} is provided in the CreateWorkerPool request.
         */
        name?: string | null;
        /**
         * Network configuration for the `WorkerPool`.
         */
        networkConfig?: Schema$NetworkConfig;
        /**
         * Required. Immutable. The region where the `WorkerPool` runs. Only &quot;us-central1&quot; is currently supported.  Note that `region` cannot be changed once the `WorkerPool` is created.
         */
        region?: string | null;
        /**
         * Output only. WorkerPool state.
         */
        state?: string | null;
        /**
         * Output only. Time at which the request to update the `WorkerPool` was received.
         */
        updateTime?: string | null;
        /**
         * Worker configuration for the `WorkerPool`.
         */
        workerConfig?: Schema$WorkerConfig;
    }
    export class Resource$Projects {
        context: APIRequestContext;
        locations: Resource$Projects$Locations;
        workerPools: Resource$Projects$Workerpools;
        constructor(context: APIRequestContext);
    }
    export class Resource$Projects$Locations {
        context: APIRequestContext;
        operations: Resource$Projects$Locations$Operations;
        constructor(context: APIRequestContext);
    }
    export class Resource$Projects$Locations$Operations {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * cloudbuild.projects.locations.operations.cancel
         * @desc Starts asynchronous cancellation on a long-running operation.  The server makes a best effort to cancel the operation, but success is not guaranteed.  If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.  Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudbuild.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudbuild = google.cloudbuild('v1alpha2');
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
         *   const res = await cloudbuild.projects.locations.operations.cancel({
         *     // The name of the operation resource to be cancelled.
         *     name: 'projects/my-project/locations/my-location/operations/my-operation',
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
         * @alias cloudbuild.projects.locations.operations.cancel
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The name of the operation resource to be cancelled.
         * @param {().CancelOperationRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        cancel(params: Params$Resource$Projects$Locations$Operations$Cancel, options: StreamMethodOptions): GaxiosPromise<Readable>;
        cancel(params?: Params$Resource$Projects$Locations$Operations$Cancel, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        cancel(params: Params$Resource$Projects$Locations$Operations$Cancel, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        cancel(params: Params$Resource$Projects$Locations$Operations$Cancel, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        cancel(params: Params$Resource$Projects$Locations$Operations$Cancel, callback: BodyResponseCallback<Schema$Empty>): void;
        cancel(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * cloudbuild.projects.locations.operations.get
         * @desc Gets the latest state of a long-running operation.  Clients can use this method to poll the operation result at intervals as recommended by the API service.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudbuild.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudbuild = google.cloudbuild('v1alpha2');
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
         *   const res = await cloudbuild.projects.locations.operations.get({
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
         * @alias cloudbuild.projects.locations.operations.get
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
         * cloudbuild.projects.locations.operations.list
         * @desc Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.  NOTE: the `name` binding allows API services to override the binding to use different resource name schemes, such as `users/x/operations`. To override the binding, API services can add a binding such as `"/v1/{name=users/x}/operations"` to their service configuration. For backwards compatibility, the default name includes the operations collection id, however overriding users must ensure the name binding is the parent resource, without the operations collection id.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudbuild.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudbuild = google.cloudbuild('v1alpha2');
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
         *   const res = await cloudbuild.projects.locations.operations.list({
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
         * @alias cloudbuild.projects.locations.operations.list
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
    export interface Params$Resource$Projects$Locations$Operations$Cancel extends StandardParameters {
        /**
         * The name of the operation resource to be cancelled.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$CancelOperationRequest;
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
    export class Resource$Projects$Workerpools {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * cloudbuild.projects.workerPools.create
         * @desc Creates a `WorkerPool` to run the builds, and returns the new worker pool.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudbuild.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudbuild = google.cloudbuild('v1alpha2');
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
         *   const res = await cloudbuild.projects.workerPools.create({
         *     // Required. The parent resource where this book will be created.
         *     // Format: projects/{project}
         *     parent: 'projects/my-project',
         *     // Required. Immutable. The ID to use for the `WorkerPool`, which will become the final component
         *     // of the resource name.
         *     //
         *     // This value should be 1-63 characters, and valid characters
         *     // are /a-z-/.
         *     workerPoolId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "createTime": "my_createTime",
         *       //   "deleteTime": "my_deleteTime",
         *       //   "name": "my_name",
         *       //   "networkConfig": {},
         *       //   "region": "my_region",
         *       //   "state": "my_state",
         *       //   "updateTime": "my_updateTime",
         *       //   "workerConfig": {}
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "deleteTime": "my_deleteTime",
         *   //   "name": "my_name",
         *   //   "networkConfig": {},
         *   //   "region": "my_region",
         *   //   "state": "my_state",
         *   //   "updateTime": "my_updateTime",
         *   //   "workerConfig": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudbuild.projects.workerPools.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent Required. The parent resource where this book will be created. Format: projects/{project}
         * @param {string=} params.workerPoolId Required. Immutable. The ID to use for the `WorkerPool`, which will become the final component of the resource name.  This value should be 1-63 characters, and valid characters are /a-z-/.
         * @param {().WorkerPool} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Projects$Workerpools$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Projects$Workerpools$Create, options?: MethodOptions): GaxiosPromise<Schema$WorkerPool>;
        create(params: Params$Resource$Projects$Workerpools$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Projects$Workerpools$Create, options: MethodOptions | BodyResponseCallback<Schema$WorkerPool>, callback: BodyResponseCallback<Schema$WorkerPool>): void;
        create(params: Params$Resource$Projects$Workerpools$Create, callback: BodyResponseCallback<Schema$WorkerPool>): void;
        create(callback: BodyResponseCallback<Schema$WorkerPool>): void;
        /**
         * cloudbuild.projects.workerPools.delete
         * @desc Deletes a `WorkerPool`.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudbuild.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudbuild = google.cloudbuild('v1alpha2');
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
         *   const res = await cloudbuild.projects.workerPools.delete({
         *     // Required. The name of the `WorkerPool` to delete.
         *     // Format: projects/{project}/workerPools/{workerPool}
         *     name: 'projects/my-project/workerPools/my-workerPool',
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
         * @alias cloudbuild.projects.workerPools.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The name of the `WorkerPool` to delete. Format: projects/{project}/workerPools/{workerPool}
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Projects$Workerpools$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Projects$Workerpools$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Projects$Workerpools$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Projects$Workerpools$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Projects$Workerpools$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * cloudbuild.projects.workerPools.get
         * @desc Returns details of a `WorkerPool`.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudbuild.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudbuild = google.cloudbuild('v1alpha2');
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
         *   const res = await cloudbuild.projects.workerPools.get({
         *     // Required. The name of the `WorkerPool` to retrieve.
         *     // Format: projects/{project}/workerPools/{workerPool}
         *     name: 'projects/my-project/workerPools/my-workerPool',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "deleteTime": "my_deleteTime",
         *   //   "name": "my_name",
         *   //   "networkConfig": {},
         *   //   "region": "my_region",
         *   //   "state": "my_state",
         *   //   "updateTime": "my_updateTime",
         *   //   "workerConfig": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudbuild.projects.workerPools.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The name of the `WorkerPool` to retrieve. Format: projects/{project}/workerPools/{workerPool}
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Workerpools$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Workerpools$Get, options?: MethodOptions): GaxiosPromise<Schema$WorkerPool>;
        get(params: Params$Resource$Projects$Workerpools$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Workerpools$Get, options: MethodOptions | BodyResponseCallback<Schema$WorkerPool>, callback: BodyResponseCallback<Schema$WorkerPool>): void;
        get(params: Params$Resource$Projects$Workerpools$Get, callback: BodyResponseCallback<Schema$WorkerPool>): void;
        get(callback: BodyResponseCallback<Schema$WorkerPool>): void;
        /**
         * cloudbuild.projects.workerPools.list
         * @desc Lists `WorkerPool`s by project.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudbuild.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudbuild = google.cloudbuild('v1alpha2');
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
         *   const res = await cloudbuild.projects.workerPools.list({
         *     // Required. The parent, which owns this collection of `WorkerPools`.
         *     // Format: projects/{project}
         *     parent: 'projects/my-project',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "workerPools": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudbuild.projects.workerPools.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent Required. The parent, which owns this collection of `WorkerPools`. Format: projects/{project}
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Workerpools$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Workerpools$List, options?: MethodOptions): GaxiosPromise<Schema$ListWorkerPoolsResponse>;
        list(params: Params$Resource$Projects$Workerpools$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Workerpools$List, options: MethodOptions | BodyResponseCallback<Schema$ListWorkerPoolsResponse>, callback: BodyResponseCallback<Schema$ListWorkerPoolsResponse>): void;
        list(params: Params$Resource$Projects$Workerpools$List, callback: BodyResponseCallback<Schema$ListWorkerPoolsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListWorkerPoolsResponse>): void;
        /**
         * cloudbuild.projects.workerPools.patch
         * @desc Updates a `WorkerPool`.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudbuild.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudbuild = google.cloudbuild('v1alpha2');
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
         *   const res = await cloudbuild.projects.workerPools.patch({
         *     // Output only. The resource name of the `WorkerPool`.
         *     // Format of the name is `projects/{project_id}/workerPools/{worker_pool_id}`,
         *     // where the value of {worker_pool_id} is provided in the CreateWorkerPool
         *     // request.
         *     name: 'projects/my-project/workerPools/my-workerPool',
         *     // A mask specifying which fields in `WorkerPool` should be updated.
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "createTime": "my_createTime",
         *       //   "deleteTime": "my_deleteTime",
         *       //   "name": "my_name",
         *       //   "networkConfig": {},
         *       //   "region": "my_region",
         *       //   "state": "my_state",
         *       //   "updateTime": "my_updateTime",
         *       //   "workerConfig": {}
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "deleteTime": "my_deleteTime",
         *   //   "name": "my_name",
         *   //   "networkConfig": {},
         *   //   "region": "my_region",
         *   //   "state": "my_state",
         *   //   "updateTime": "my_updateTime",
         *   //   "workerConfig": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudbuild.projects.workerPools.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Output only. The resource name of the `WorkerPool`. Format of the name is `projects/{project_id}/workerPools/{worker_pool_id}`, where the value of {worker_pool_id} is provided in the CreateWorkerPool request.
         * @param {string=} params.updateMask A mask specifying which fields in `WorkerPool` should be updated.
         * @param {().WorkerPool} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Projects$Workerpools$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Projects$Workerpools$Patch, options?: MethodOptions): GaxiosPromise<Schema$WorkerPool>;
        patch(params: Params$Resource$Projects$Workerpools$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Projects$Workerpools$Patch, options: MethodOptions | BodyResponseCallback<Schema$WorkerPool>, callback: BodyResponseCallback<Schema$WorkerPool>): void;
        patch(params: Params$Resource$Projects$Workerpools$Patch, callback: BodyResponseCallback<Schema$WorkerPool>): void;
        patch(callback: BodyResponseCallback<Schema$WorkerPool>): void;
    }
    export interface Params$Resource$Projects$Workerpools$Create extends StandardParameters {
        /**
         * Required. The parent resource where this book will be created. Format: projects/{project}
         */
        parent?: string;
        /**
         * Required. Immutable. The ID to use for the `WorkerPool`, which will become the final component of the resource name.  This value should be 1-63 characters, and valid characters are /a-z-/.
         */
        workerPoolId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$WorkerPool;
    }
    export interface Params$Resource$Projects$Workerpools$Delete extends StandardParameters {
        /**
         * Required. The name of the `WorkerPool` to delete. Format: projects/{project}/workerPools/{workerPool}
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Workerpools$Get extends StandardParameters {
        /**
         * Required. The name of the `WorkerPool` to retrieve. Format: projects/{project}/workerPools/{workerPool}
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Workerpools$List extends StandardParameters {
        /**
         * Required. The parent, which owns this collection of `WorkerPools`. Format: projects/{project}
         */
        parent?: string;
    }
    export interface Params$Resource$Projects$Workerpools$Patch extends StandardParameters {
        /**
         * Output only. The resource name of the `WorkerPool`. Format of the name is `projects/{project_id}/workerPools/{worker_pool_id}`, where the value of {worker_pool_id} is provided in the CreateWorkerPool request.
         */
        name?: string;
        /**
         * A mask specifying which fields in `WorkerPool` should be updated.
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$WorkerPool;
    }
    export {};
}
