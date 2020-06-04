/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace logging_v2 {
    export interface Options extends GlobalOptions {
        version: 'v2';
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
     * Cloud Logging API
     *
     * Writes log entries and manages your Cloud Logging configuration. The table entries below are presented in alphabetical order, not in order of common use. For explanations of the concepts found in the table entries, read the documentation at https://cloud.google.com/logging/docs.
     *
     * @example
     * const {google} = require('googleapis');
     * const logging = google.logging('v2');
     *
     * @namespace logging
     * @type {Function}
     * @version v2
     * @variation v2
     * @param {object=} options Options for Logging
     */
    export class Logging {
        context: APIRequestContext;
        billingAccounts: Resource$Billingaccounts;
        entries: Resource$Entries;
        exclusions: Resource$Exclusions;
        folders: Resource$Folders;
        locations: Resource$Locations;
        logs: Resource$Logs;
        monitoredResourceDescriptors: Resource$Monitoredresourcedescriptors;
        organizations: Resource$Organizations;
        projects: Resource$Projects;
        sinks: Resource$Sinks;
        v2: Resource$V2;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    /**
     * Options that change functionality of a sink exporting data to BigQuery.
     */
    export interface Schema$BigQueryOptions {
        /**
         * Optional. Whether to use BigQuery&#39;s partition tables (https://cloud.google.com/bigquery/docs/partitioned-tables). By default, Logging creates dated tables based on the log entries&#39; timestamps, e.g. syslog_20170523. With partitioned tables the date suffix is no longer present and special query syntax (https://cloud.google.com/bigquery/docs/querying-partitioned-tables) has to be used instead. In both cases, tables are sharded based on UTC timezone.
         */
        usePartitionedTables?: boolean | null;
        /**
         * Output only. True if new timestamp column based partitioning is in use, false if legacy ingestion-time partitioning is in use. All new sinks will have this field set true and will use timestamp column based partitioning. If use_partitioned_tables is false, this value has no meaning and will be false. Legacy sinks using partitioned tables will have this field set to false.
         */
        usesTimestampColumnPartitioning?: boolean | null;
    }
    /**
     * BucketOptions describes the bucket boundaries used to create a histogram for the distribution. The buckets can be in a linear sequence, an exponential sequence, or each bucket can be specified explicitly. BucketOptions does not include the number of values in each bucket.A bucket has an inclusive lower bound and exclusive upper bound for the values that are counted for that bucket. The upper bound of a bucket must be strictly greater than the lower bound. The sequence of N buckets for a distribution consists of an underflow bucket (number 0), zero or more finite buckets (number 1 through N - 2) and an overflow bucket (number N - 1). The buckets are contiguous: the lower bound of bucket i (i &gt; 0) is the same as the upper bound of bucket i - 1. The buckets span the whole range of finite values: lower bound of the underflow bucket is -infinity and the upper bound of the overflow bucket is +infinity. The finite buckets are so-called because both bounds are finite.
     */
    export interface Schema$BucketOptions {
        /**
         * The explicit buckets.
         */
        explicitBuckets?: Schema$Explicit;
        /**
         * The exponential buckets.
         */
        exponentialBuckets?: Schema$Exponential;
        /**
         * The linear bucket.
         */
        linearBuckets?: Schema$Linear;
    }
    /**
     * Describes the customer-managed encryption key (CMEK) settings associated with a project, folder, organization, billing account, or flexible resource.Note: CMEK for the Logs Router can currently only be configured for GCP organizations. Once configured, it applies to all projects and folders in the GCP organization.See Enabling CMEK for Logs Router (https://cloud.google.com/logging/docs/routing/managed-encryption) for more information.
     */
    export interface Schema$CmekSettings {
        /**
         * The resource name for the configured Cloud KMS key.KMS key name format:  &quot;projects/PROJECT_ID/locations/LOCATION/keyRings/KEYRING/cryptoKeys/KEY&quot;For example:  &quot;projects/my-project-id/locations/my-region/keyRings/key-ring-name/cryptoKeys/key-name&quot;To enable CMEK for the Logs Router, set this field to a valid kms_key_name for which the associated service account has the required roles/cloudkms.cryptoKeyEncrypterDecrypter role assigned for the key.The Cloud KMS key used by the Log Router can be updated by changing the kms_key_name to a new valid key name. Encryption operations that are in progress will be completed with the key that was in use when they started. Decryption operations will be completed using the key that was used at the time of encryption unless access to that key has been revoked.To disable CMEK for the Logs Router, set this field to an empty string.See Enabling CMEK for Logs Router (https://cloud.google.com/logging/docs/routing/managed-encryption) for more information.
         */
        kmsKeyName?: string | null;
        /**
         * Output only. The resource name of the CMEK settings.
         */
        name?: string | null;
        /**
         * Output only. The service account that will be used by the Logs Router to access your Cloud KMS key.Before enabling CMEK for Logs Router, you must first assign the role roles/cloudkms.cryptoKeyEncrypterDecrypter to the service account that the Logs Router will use to access your Cloud KMS key. Use GetCmekSettings to obtain the service account ID.See Enabling CMEK for Logs Router (https://cloud.google.com/logging/docs/routing/managed-encryption) for more information.
         */
        serviceAccountId?: string | null;
    }
    /**
     * A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo {   rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); } The JSON representation for Empty is empty JSON object {}.
     */
    export interface Schema$Empty {
    }
    /**
     * Specifies a set of buckets with arbitrary widths.There are size(bounds) + 1 (= N) buckets. Bucket i has the following boundaries:Upper bound (0 &lt;= i &lt; N-1): boundsi  Lower bound (1 &lt;= i &lt; N); boundsi - 1The bounds field must contain at least one element. If bounds has only one element, then there are no finite buckets, and that single element is the common boundary of the overflow and underflow buckets.
     */
    export interface Schema$Explicit {
        /**
         * The values must be monotonically increasing.
         */
        bounds?: number[] | null;
    }
    /**
     * Specifies an exponential sequence of buckets that have a width that is proportional to the value of the lower bound. Each bucket represents a constant relative uncertainty on a specific value in the bucket.There are num_finite_buckets + 2 (= N) buckets. Bucket i has the following boundaries:Upper bound (0 &lt;= i &lt; N-1): scale * (growth_factor ^ i).  Lower bound (1 &lt;= i &lt; N): scale * (growth_factor ^ (i - 1)).
     */
    export interface Schema$Exponential {
        /**
         * Must be greater than 1.
         */
        growthFactor?: number | null;
        /**
         * Must be greater than 0.
         */
        numFiniteBuckets?: number | null;
        /**
         * Must be greater than 0.
         */
        scale?: number | null;
    }
    /**
     * A common proto for logging HTTP requests. Only contains semantics defined by the HTTP specification. Product-specific logging information MUST be defined in a separate message.
     */
    export interface Schema$HttpRequest {
        /**
         * The number of HTTP response bytes inserted into cache. Set only when a cache fill was attempted.
         */
        cacheFillBytes?: string | null;
        /**
         * Whether or not an entity was served from cache (with or without validation).
         */
        cacheHit?: boolean | null;
        /**
         * Whether or not a cache lookup was attempted.
         */
        cacheLookup?: boolean | null;
        /**
         * Whether or not the response was validated with the origin server before being served from cache. This field is only meaningful if cache_hit is True.
         */
        cacheValidatedWithOriginServer?: boolean | null;
        /**
         * The request processing latency on the server, from the time the request was received until the response was sent.
         */
        latency?: string | null;
        /**
         * Protocol used for the request. Examples: &quot;HTTP/1.1&quot;, &quot;HTTP/2&quot;, &quot;websocket&quot;
         */
        protocol?: string | null;
        /**
         * The referer URL of the request, as defined in HTTP/1.1 Header Field Definitions (http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html).
         */
        referer?: string | null;
        /**
         * The IP address (IPv4 or IPv6) of the client that issued the HTTP request. Examples: &quot;192.168.1.1&quot;, &quot;FE80::0202:B3FF:FE1E:8329&quot;.
         */
        remoteIp?: string | null;
        /**
         * The request method. Examples: &quot;GET&quot;, &quot;HEAD&quot;, &quot;PUT&quot;, &quot;POST&quot;.
         */
        requestMethod?: string | null;
        /**
         * The size of the HTTP request message in bytes, including the request headers and the request body.
         */
        requestSize?: string | null;
        /**
         * The scheme (http, https), the host name, the path and the query portion of the URL that was requested. Example: &quot;http://example.com/some/info?color=red&quot;.
         */
        requestUrl?: string | null;
        /**
         * The size of the HTTP response message sent back to the client, in bytes, including the response headers and the response body.
         */
        responseSize?: string | null;
        /**
         * The IP address (IPv4 or IPv6) of the origin server that the request was sent to.
         */
        serverIp?: string | null;
        /**
         * The response code indicating the status of response. Examples: 200, 404.
         */
        status?: number | null;
        /**
         * The user agent sent by the client. Example: &quot;Mozilla/4.0 (compatible; MSIE 6.0; Windows 98; Q312461; .NET CLR 1.0.3705)&quot;.
         */
        userAgent?: string | null;
    }
    /**
     * A description of a label.
     */
    export interface Schema$LabelDescriptor {
        /**
         * A human-readable description for the label.
         */
        description?: string | null;
        /**
         * The label key.
         */
        key?: string | null;
        /**
         * The type of data that can be assigned to the label.
         */
        valueType?: string | null;
    }
    /**
     * Specifies a linear sequence of buckets that all have the same width (except overflow and underflow). Each bucket represents a constant absolute uncertainty on the specific value in the bucket.There are num_finite_buckets + 2 (= N) buckets. Bucket i has the following boundaries:Upper bound (0 &lt;= i &lt; N-1): offset + (width * i).  Lower bound (1 &lt;= i &lt; N): offset + (width * (i - 1)).
     */
    export interface Schema$Linear {
        /**
         * Must be greater than 0.
         */
        numFiniteBuckets?: number | null;
        /**
         * Lower bound of the first bucket.
         */
        offset?: number | null;
        /**
         * Must be greater than 0.
         */
        width?: number | null;
    }
    /**
     * The response from ListBuckets (Beta).
     */
    export interface Schema$ListBucketsResponse {
        /**
         * A list of buckets.
         */
        buckets?: Schema$LogBucket[];
        /**
         * If there might be more results than appear in this response, then nextPageToken is included. To get the next set of results, call the same method again using the value of nextPageToken as pageToken.
         */
        nextPageToken?: string | null;
    }
    /**
     * Result returned from ListExclusions.
     */
    export interface Schema$ListExclusionsResponse {
        /**
         * A list of exclusions.
         */
        exclusions?: Schema$LogExclusion[];
        /**
         * If there might be more results than appear in this response, then nextPageToken is included. To get the next set of results, call the same method again using the value of nextPageToken as pageToken.
         */
        nextPageToken?: string | null;
    }
    /**
     * The parameters to ListLogEntries.
     */
    export interface Schema$ListLogEntriesRequest {
        /**
         * Optional. A filter that chooses which log entries to return. See Advanced Logs Queries (https://cloud.google.com/logging/docs/view/advanced-queries). Only log entries that match the filter are returned. An empty filter matches all log entries in the resources listed in resource_names. Referencing a parent resource that is not listed in resource_names will cause the filter to return no results. The maximum length of the filter is 20000 characters.
         */
        filter?: string | null;
        /**
         * Optional. How the results should be sorted. Presently, the only permitted values are &quot;timestamp asc&quot; (default) and &quot;timestamp desc&quot;. The first option returns entries in order of increasing values of LogEntry.timestamp (oldest first), and the second option returns entries in order of decreasing timestamps (newest first). Entries with equal timestamps are returned in order of their insert_id values.
         */
        orderBy?: string | null;
        /**
         * Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of next_page_token in the response indicates that more results might be available.
         */
        pageSize?: number | null;
        /**
         * Optional. If present, then retrieve the next batch of results from the preceding call to this method. page_token must be the value of next_page_token from the previous response. The values of other method parameters should be identical to those in the previous call.
         */
        pageToken?: string | null;
        /**
         * Optional. Deprecated. Use resource_names instead. One or more project identifiers or project numbers from which to retrieve log entries. Example: &quot;my-project-1A&quot;.
         */
        projectIds?: string[] | null;
        /**
         * Required. Names of one or more parent resources from which to retrieve log entries: &quot;projects/[PROJECT_ID]&quot; &quot;organizations/[ORGANIZATION_ID]&quot; &quot;billingAccounts/[BILLING_ACCOUNT_ID]&quot; &quot;folders/[FOLDER_ID]&quot; Projects listed in the project_ids field are added to this list.
         */
        resourceNames?: string[] | null;
    }
    /**
     * Result returned from ListLogEntries.
     */
    export interface Schema$ListLogEntriesResponse {
        /**
         * A list of log entries. If entries is empty, nextPageToken may still be returned, indicating that more entries may exist. See nextPageToken for more information.
         */
        entries?: Schema$LogEntry[];
        /**
         * If there might be more results than those appearing in this response, then nextPageToken is included. To get the next set of results, call this method again using the value of nextPageToken as pageToken.If a value for next_page_token appears and the entries field is empty, it means that the search found no log entries so far but it did not have time to search all the possible log entries. Retry the method with this value for page_token to continue the search. Alternatively, consider speeding up the search by changing your filter to specify a single log name or resource type, or to narrow the time range of the search.
         */
        nextPageToken?: string | null;
    }
    /**
     * Result returned from ListLogMetrics.
     */
    export interface Schema$ListLogMetricsResponse {
        /**
         * A list of logs-based metrics.
         */
        metrics?: Schema$LogMetric[];
        /**
         * If there might be more results than appear in this response, then nextPageToken is included. To get the next set of results, call this method again using the value of nextPageToken as pageToken.
         */
        nextPageToken?: string | null;
    }
    /**
     * Result returned from ListLogs.
     */
    export interface Schema$ListLogsResponse {
        /**
         * A list of log names. For example, &quot;projects/my-project/logs/syslog&quot; or &quot;organizations/123/logs/cloudresourcemanager.googleapis.com%2Factivity&quot;.
         */
        logNames?: string[] | null;
        /**
         * If there might be more results than those appearing in this response, then nextPageToken is included. To get the next set of results, call this method again using the value of nextPageToken as pageToken.
         */
        nextPageToken?: string | null;
    }
    /**
     * Result returned from ListMonitoredResourceDescriptors.
     */
    export interface Schema$ListMonitoredResourceDescriptorsResponse {
        /**
         * If there might be more results than those appearing in this response, then nextPageToken is included. To get the next set of results, call this method again using the value of nextPageToken as pageToken.
         */
        nextPageToken?: string | null;
        /**
         * A list of resource descriptors.
         */
        resourceDescriptors?: Schema$MonitoredResourceDescriptor[];
    }
    /**
     * Result returned from ListSinks.
     */
    export interface Schema$ListSinksResponse {
        /**
         * If there might be more results than appear in this response, then nextPageToken is included. To get the next set of results, call the same method again using the value of nextPageToken as pageToken.
         */
        nextPageToken?: string | null;
        /**
         * A list of sinks.
         */
        sinks?: Schema$LogSink[];
    }
    /**
     * Describes a repository of logs (Beta).
     */
    export interface Schema$LogBucket {
        /**
         * Output only. The creation timestamp of the bucket. This is not set for any of the default buckets.
         */
        createTime?: string | null;
        /**
         * Describes this bucket.
         */
        description?: string | null;
        /**
         * Output only. The bucket lifecycle state.
         */
        lifecycleState?: string | null;
        /**
         * The resource name of the bucket. For example: &quot;projects/my-project-id/locations/my-location/buckets/my-bucket-id The supported locations are:  &quot;global&quot;  &quot;us-central1&quot;For the location of global it is unspecified where logs are actually stored. Once a bucket has been created, the location can not be changed.
         */
        name?: string | null;
        /**
         * Logs will be retained by default for this amount of time, after which they will automatically be deleted. The minimum retention period is 1 day. If this value is set to zero at bucket creation time, the default time of 30 days will be used.
         */
        retentionDays?: number | null;
        /**
         * Output only. The last update timestamp of the bucket.
         */
        updateTime?: string | null;
    }
    /**
     * An individual entry in a log.
     */
    export interface Schema$LogEntry {
        /**
         * Optional. Information about the HTTP request associated with this log entry, if applicable.
         */
        httpRequest?: Schema$HttpRequest;
        /**
         * Optional. A unique identifier for the log entry. If you provide a value, then Logging considers other log entries in the same project, with the same timestamp, and with the same insert_id to be duplicates which are removed in a single query result. However, there are no guarantees of de-duplication in the export of logs.If the insert_id is omitted when writing a log entry, the Logging API  assigns its own unique identifier in this field.In queries, the insert_id is also used to order log entries that have the same log_name and timestamp values.
         */
        insertId?: string | null;
        /**
         * The log entry payload, represented as a structure that is expressed as a JSON object.
         */
        jsonPayload?: {
            [key: string]: any;
        } | null;
        /**
         * Optional. A set of user-defined (key, value) data that provides additional information about the log entry.
         */
        labels?: {
            [key: string]: string;
        } | null;
        /**
         * Required. The resource name of the log to which this log entry belongs: &quot;projects/[PROJECT_ID]/logs/[LOG_ID]&quot; &quot;organizations/[ORGANIZATION_ID]/logs/[LOG_ID]&quot; &quot;billingAccounts/[BILLING_ACCOUNT_ID]/logs/[LOG_ID]&quot; &quot;folders/[FOLDER_ID]/logs/[LOG_ID]&quot; A project number may be used in place of PROJECT_ID. The project number is translated to its corresponding PROJECT_ID internally and the log_name field will contain PROJECT_ID in queries and exports.[LOG_ID] must be URL-encoded within log_name. Example: &quot;organizations/1234567890/logs/cloudresourcemanager.googleapis.com%2Factivity&quot;. [LOG_ID] must be less than 512 characters long and can only include the following characters: upper and lower case alphanumeric characters, forward-slash, underscore, hyphen, and period.For backward compatibility, if log_name begins with a forward-slash, such as /projects/..., then the log entry is ingested as usual but the forward-slash is removed. Listing the log entry will not show the leading slash and filtering for a log name with a leading slash will never return any results.
         */
        logName?: string | null;
        /**
         * Output only. Deprecated. Additional metadata about the monitored resource.Only k8s_container, k8s_pod, and k8s_node MonitoredResources have this field populated for GKE versions older than 1.12.6. For GKE versions 1.12.6 and above, the metadata field has been deprecated. The Kubernetes pod labels that used to be in metadata.userLabels will now be present in the labels field with a key prefix of k8s-pod/. The system labels that were present in the metadata.systemLabels field will no longer be available in the LogEntry.
         */
        metadata?: Schema$MonitoredResourceMetadata;
        /**
         * Optional. Information about an operation associated with the log entry, if applicable.
         */
        operation?: Schema$LogEntryOperation;
        /**
         * The log entry payload, represented as a protocol buffer. Some Google Cloud Platform services use this field for their log entry payloads.The following protocol buffer types are supported; user-defined types are not supported:&quot;type.googleapis.com/google.cloud.audit.AuditLog&quot;  &quot;type.googleapis.com/google.appengine.logging.v1.RequestLog&quot;
         */
        protoPayload?: {
            [key: string]: any;
        } | null;
        /**
         * Output only. The time the log entry was received by Logging.
         */
        receiveTimestamp?: string | null;
        /**
         * Required. The monitored resource that produced this log entry.Example: a log entry that reports a database error would be associated with the monitored resource designating the particular database that reported the error.
         */
        resource?: Schema$MonitoredResource;
        /**
         * Optional. The severity of the log entry. The default value is LogSeverity.DEFAULT.
         */
        severity?: string | null;
        /**
         * Optional. Source code location information associated with the log entry, if any.
         */
        sourceLocation?: Schema$LogEntrySourceLocation;
        /**
         * Optional. The span ID within the trace associated with the log entry.For Trace spans, this is the same format that the Trace API v2 uses: a 16-character hexadecimal encoding of an 8-byte array, such as 000000000000004a.
         */
        spanId?: string | null;
        /**
         * The log entry payload, represented as a Unicode string (UTF-8).
         */
        textPayload?: string | null;
        /**
         * Optional. The time the event described by the log entry occurred. This time is used to compute the log entry&#39;s age and to enforce the logs retention period. If this field is omitted in a new log entry, then Logging assigns it the current time. Timestamps have nanosecond accuracy, but trailing zeros in the fractional seconds might be omitted when the timestamp is displayed.Incoming log entries must have timestamps that don&#39;t exceed the logs retention period (https://cloud.google.com/logging/quotas#logs_retention_periods) in the past, and that don&#39;t exceed 24 hours in the future. Log entries outside those time boundaries aren&#39;t ingested by Logging.
         */
        timestamp?: string | null;
        /**
         * Optional. Resource name of the trace associated with the log entry, if any. If it contains a relative resource name, the name is assumed to be relative to //tracing.googleapis.com. Example: projects/my-projectid/traces/06796866738c859f2f19b7cfb3214824
         */
        trace?: string | null;
        /**
         * Optional. The sampling decision of the trace associated with the log entry.True means that the trace resource name in the trace field was sampled for storage in a trace backend. False means that the trace was not sampled for storage when this log entry was written, or the sampling decision was unknown at the time. A non-sampled trace value is still useful as a request correlation identifier. The default is False.
         */
        traceSampled?: boolean | null;
    }
    /**
     * Additional information about a potentially long-running operation with which a log entry is associated.
     */
    export interface Schema$LogEntryOperation {
        /**
         * Optional. Set this to True if this is the first log entry in the operation.
         */
        first?: boolean | null;
        /**
         * Optional. An arbitrary operation identifier. Log entries with the same identifier are assumed to be part of the same operation.
         */
        id?: string | null;
        /**
         * Optional. Set this to True if this is the last log entry in the operation.
         */
        last?: boolean | null;
        /**
         * Optional. An arbitrary producer identifier. The combination of id and producer must be globally unique. Examples for producer: &quot;MyDivision.MyBigCompany.com&quot;, &quot;github.com/MyProject/MyApplication&quot;.
         */
        producer?: string | null;
    }
    /**
     * Additional information about the source code location that produced the log entry.
     */
    export interface Schema$LogEntrySourceLocation {
        /**
         * Optional. Source file name. Depending on the runtime environment, this might be a simple name or a fully-qualified name.
         */
        file?: string | null;
        /**
         * Optional. Human-readable name of the function or method being invoked, with optional context such as the class or package name. This information may be used in contexts such as the logs viewer, where a file and line number are less meaningful. The format can vary by language. For example: qual.if.ied.Class.method (Java), dir/package.func (Go), function (Python).
         */
        function?: string | null;
        /**
         * Optional. Line within the source file. 1-based; 0 indicates no line number available.
         */
        line?: string | null;
    }
    /**
     * Specifies a set of log entries that are not to be stored in Logging. If your GCP resource receives a large volume of logs, you can use exclusions to reduce your chargeable logs. Exclusions are processed after log sinks, so you can export log entries before they are excluded. Note that organization-level and folder-level exclusions don&#39;t apply to child resources, and that you can&#39;t exclude audit log entries.
     */
    export interface Schema$LogExclusion {
        /**
         * Output only. The creation timestamp of the exclusion.This field may not be present for older exclusions.
         */
        createTime?: string | null;
        /**
         * Optional. A description of this exclusion.
         */
        description?: string | null;
        /**
         * Optional. If set to True, then this exclusion is disabled and it does not exclude any log entries. You can update an exclusion to change the value of this field.
         */
        disabled?: boolean | null;
        /**
         * Required. An advanced logs filter (https://cloud.google.com/logging/docs/view/advanced-queries) that matches the log entries to be excluded. By using the sample function (https://cloud.google.com/logging/docs/view/advanced-queries#sample), you can exclude less than 100% of the matching log entries. For example, the following query matches 99% of low-severity log entries from Google Cloud Storage buckets:&quot;resource.type=gcs_bucket severity&lt;ERROR sample(insertId, 0.99)&quot;
         */
        filter?: string | null;
        /**
         * Required. A client-assigned identifier, such as &quot;load-balancer-exclusion&quot;. Identifiers are limited to 100 characters and can include only letters, digits, underscores, hyphens, and periods. First character has to be alphanumeric.
         */
        name?: string | null;
        /**
         * Output only. The last update timestamp of the exclusion.This field may not be present for older exclusions.
         */
        updateTime?: string | null;
    }
    /**
     * Application log line emitted while processing a request.
     */
    export interface Schema$LogLine {
        /**
         * App-provided log message.
         */
        logMessage?: string | null;
        /**
         * Severity of this log entry.
         */
        severity?: string | null;
        /**
         * Where in the source code this log message was written.
         */
        sourceLocation?: Schema$SourceLocation;
        /**
         * Approximate time when this log entry was made.
         */
        time?: string | null;
    }
    /**
     * Describes a logs-based metric. The value of the metric is the number of log entries that match a logs filter in a given time interval.Logs-based metric can also be used to extract values from logs and create a a distribution of the values. The distribution records the statistics of the extracted values along with an optional histogram of the values as specified by the bucket options.
     */
    export interface Schema$LogMetric {
        /**
         * Optional. The bucket_options are required when the logs-based metric is using a DISTRIBUTION value type and it describes the bucket boundaries used to create a histogram of the extracted values.
         */
        bucketOptions?: Schema$BucketOptions;
        /**
         * Output only. The creation timestamp of the metric.This field may not be present for older metrics.
         */
        createTime?: string | null;
        /**
         * Optional. A description of this metric, which is used in documentation. The maximum length of the description is 8000 characters.
         */
        description?: string | null;
        /**
         * Required. An advanced logs filter (https://cloud.google.com/logging/docs/view/advanced_filters) which is used to match log entries. Example: &quot;resource.type=gae_app AND severity&gt;=ERROR&quot; The maximum length of the filter is 20000 characters.
         */
        filter?: string | null;
        /**
         * Optional. A map from a label key string to an extractor expression which is used to extract data from a log entry field and assign as the label value. Each label key specified in the LabelDescriptor must have an associated extractor expression in this map. The syntax of the extractor expression is the same as for the value_extractor field.The extracted value is converted to the type defined in the label descriptor. If the either the extraction or the type conversion fails, the label will have a default value. The default value for a string label is an empty string, for an integer label its 0, and for a boolean label its false.Note that there are upper bounds on the maximum number of labels and the number of active time series that are allowed in a project.
         */
        labelExtractors?: {
            [key: string]: string;
        } | null;
        /**
         * Optional. The metric descriptor associated with the logs-based metric. If unspecified, it uses a default metric descriptor with a DELTA metric kind, INT64 value type, with no labels and a unit of &quot;1&quot;. Such a metric counts the number of log entries matching the filter expression.The name, type, and description fields in the metric_descriptor are output only, and is constructed using the name and description field in the LogMetric.To create a logs-based metric that records a distribution of log values, a DELTA metric kind with a DISTRIBUTION value type must be used along with a value_extractor expression in the LogMetric.Each label in the metric descriptor must have a matching label name as the key and an extractor expression as the value in the label_extractors map.The metric_kind and value_type fields in the metric_descriptor cannot be updated once initially configured. New labels can be added in the metric_descriptor, but existing labels cannot be modified except for their description.
         */
        metricDescriptor?: Schema$MetricDescriptor;
        /**
         * Required. The client-assigned metric identifier. Examples: &quot;error_count&quot;, &quot;nginx/requests&quot;.Metric identifiers are limited to 100 characters and can include only the following characters: A-Z, a-z, 0-9, and the special characters _-.,+!*&#39;,()%/. The forward-slash character (/) denotes a hierarchy of name pieces, and it cannot be the first character of the name.The metric identifier in this field must not be URL-encoded (https://en.wikipedia.org/wiki/Percent-encoding). However, when the metric identifier appears as the [METRIC_ID] part of a metric_name API parameter, then the metric identifier must be URL-encoded. Example: &quot;projects/my-project/metrics/nginx%2Frequests&quot;.
         */
        name?: string | null;
        /**
         * Output only. The last update timestamp of the metric.This field may not be present for older metrics.
         */
        updateTime?: string | null;
        /**
         * Optional. A value_extractor is required when using a distribution logs-based metric to extract the values to record from a log entry. Two functions are supported for value extraction: EXTRACT(field) or REGEXP_EXTRACT(field, regex). The argument are:  1. field: The name of the log entry field from which the value is to be  extracted.  2. regex: A regular expression using the Google RE2 syntax  (https://github.com/google/re2/wiki/Syntax) with a single capture  group to extract data from the specified log entry field. The value  of the field is converted to a string before applying the regex.  It is an error to specify a regex that does not include exactly one  capture group.The result of the extraction must be convertible to a double type, as the distribution always records double values. If either the extraction or the conversion to double fails, then those values are not recorded in the distribution.Example: REGEXP_EXTRACT(jsonPayload.request, &quot;.*quantity=(\d+).*&quot;)
         */
        valueExtractor?: string | null;
        /**
         * Deprecated. The API version that created or updated this metric. The v2 format is used by default and cannot be changed.
         */
        version?: string | null;
    }
    /**
     * Describes a sink used to export log entries to one of the following destinations in any project: a Cloud Storage bucket, a BigQuery dataset, or a Cloud Pub/Sub topic. A logs filter controls which log entries are exported. The sink must be created within a project, organization, billing account, or folder.
     */
    export interface Schema$LogSink {
        /**
         * Optional. Options that affect sinks exporting data to BigQuery.
         */
        bigqueryOptions?: Schema$BigQueryOptions;
        /**
         * Output only. The creation timestamp of the sink.This field may not be present for older sinks.
         */
        createTime?: string | null;
        /**
         * Optional. A description of this sink. The maximum length of the description is 8000 characters.
         */
        description?: string | null;
        /**
         * Required. The export destination: &quot;storage.googleapis.com/[GCS_BUCKET]&quot; &quot;bigquery.googleapis.com/projects/[PROJECT_ID]/datasets/[DATASET]&quot; &quot;pubsub.googleapis.com/projects/[PROJECT_ID]/topics/[TOPIC_ID]&quot; The sink&#39;s writer_identity, set when the sink is created, must have permission to write to the destination or else the log entries are not exported. For more information, see Exporting Logs with Sinks (https://cloud.google.com/logging/docs/api/tasks/exporting-logs).
         */
        destination?: string | null;
        /**
         * Optional. If set to True, then this sink is disabled and it does not export any log entries.
         */
        disabled?: boolean | null;
        /**
         * Optional. An advanced logs filter (https://cloud.google.com/logging/docs/view/advanced-queries). The only exported log entries are those that are in the resource owning the sink and that match the filter. For example: logName=&quot;projects/[PROJECT_ID]/logs/[LOG_ID]&quot; AND severity&gt;=ERROR
         */
        filter?: string | null;
        /**
         * Optional. This field applies only to sinks owned by organizations and folders. If the field is false, the default, only the logs owned by the sink&#39;s parent resource are available for export. If the field is true, then logs from all the projects, folders, and billing accounts contained in the sink&#39;s parent resource are also available for export. Whether a particular log entry from the children is exported depends on the sink&#39;s filter expression. For example, if this field is true, then the filter resource.type=gce_instance would export all Compute Engine VM instance log entries from all projects in the sink&#39;s parent. To only export entries from certain child projects, filter on the project part of the log name: logName:(&quot;projects/test-project1/&quot; OR &quot;projects/test-project2/&quot;) AND resource.type=gce_instance
         */
        includeChildren?: boolean | null;
        /**
         * Required. The client-assigned sink identifier, unique within the project. Example: &quot;my-syslog-errors-to-pubsub&quot;. Sink identifiers are limited to 100 characters and can include only the following characters: upper and lower-case alphanumeric characters, underscores, hyphens, and periods. First character has to be alphanumeric.
         */
        name?: string | null;
        /**
         * Deprecated. This field is unused.
         */
        outputVersionFormat?: string | null;
        /**
         * Output only. The last update timestamp of the sink.This field may not be present for older sinks.
         */
        updateTime?: string | null;
        /**
         * Output only. An IAM identity&amp;mdash;a service account or group&amp;mdash;under which Logging writes the exported log entries to the sink&#39;s destination. This field is set by sinks.create and sinks.update based on the value of unique_writer_identity in those methods.Until you grant this identity write-access to the destination, log entry exports from this sink will fail. For more information, see Granting Access for a Resource (https://cloud.google.com/iam/docs/granting-roles-to-service-accounts#granting_access_to_a_service_account_for_a_resource). Consult the destination service&#39;s documentation to determine the appropriate IAM roles to assign to the identity.
         */
        writerIdentity?: string | null;
    }
    /**
     * Defines a metric type and its schema. Once a metric descriptor is created, deleting or altering it stops data collection and makes the metric type&#39;s existing data unusable.
     */
    export interface Schema$MetricDescriptor {
        /**
         * A detailed description of the metric, which can be used in documentation.
         */
        description?: string | null;
        /**
         * A concise name for the metric, which can be displayed in user interfaces. Use sentence case without an ending period, for example &quot;Request count&quot;. This field is optional but it is recommended to be set for any metrics associated with user-visible concepts, such as Quota.
         */
        displayName?: string | null;
        /**
         * The set of labels that can be used to describe a specific instance of this metric type. For example, the appengine.googleapis.com/http/server/response_latencies metric type has a label for the HTTP response code, response_code, so you can look at latencies for successful responses or just for responses that failed.
         */
        labels?: Schema$LabelDescriptor[];
        /**
         * Optional. The launch stage of the metric definition.
         */
        launchStage?: string | null;
        /**
         * Optional. Metadata which can be used to guide usage of the metric.
         */
        metadata?: Schema$MetricDescriptorMetadata;
        /**
         * Whether the metric records instantaneous values, changes to a value, etc. Some combinations of metric_kind and value_type might not be supported.
         */
        metricKind?: string | null;
        /**
         * Read-only. If present, then a time series, which is identified partially by a metric type and a MonitoredResourceDescriptor, that is associated with this metric type can only be associated with one of the monitored resource types listed here.
         */
        monitoredResourceTypes?: string[] | null;
        /**
         * The resource name of the metric descriptor.
         */
        name?: string | null;
        /**
         * The metric type, including its DNS name prefix. The type is not URL-encoded. All user-defined metric types have the DNS name custom.googleapis.com or external.googleapis.com. Metric types should use a natural hierarchical grouping. For example: &quot;custom.googleapis.com/invoice/paid/amount&quot; &quot;external.googleapis.com/prometheus/up&quot; &quot;appengine.googleapis.com/http/server/response_latencies&quot;
         */
        type?: string | null;
        /**
         * The units in which the metric value is reported. It is only applicable if the value_type is INT64, DOUBLE, or DISTRIBUTION. The unit defines the representation of the stored metric values.Different systems may scale the values to be more easily displayed (so a value of 0.02KBy might be displayed as 20By, and a value of 3523KBy might be displayed as 3.5MBy). However, if the unit is KBy, then the value of the metric is always in thousands of bytes, no matter how it may be displayed..If you want a custom metric to record the exact number of CPU-seconds used by a job, you can create an INT64 CUMULATIVE metric whose unit is s{CPU} (or equivalently 1s{CPU} or just s). If the job uses 12,005 CPU-seconds, then the value is written as 12005.Alternatively, if you want a custom metric to record data in a more granular way, you can create a DOUBLE CUMULATIVE metric whose unit is ks{CPU}, and then write the value 12.005 (which is 12005/1000), or use Kis{CPU} and write 11.723 (which is 12005/1024).The supported units are a subset of The Unified Code for Units of Measure (http://unitsofmeasure.org/ucum.html) standard:Basic units (UNIT) bit bit By byte s second min minute h hour d dayPrefixes (PREFIX) k kilo (10^3) M mega (10^6) G giga (10^9) T tera (10^12) P peta (10^15) E exa (10^18) Z zetta (10^21) Y yotta (10^24) m milli (10^-3) u micro (10^-6) n nano (10^-9) p pico (10^-12) f femto (10^-15) a atto (10^-18) z zepto (10^-21) y yocto (10^-24) Ki kibi (2^10) Mi mebi (2^20) Gi gibi (2^30) Ti tebi (2^40) Pi pebi (2^50)GrammarThe grammar also includes these connectors: / division or ratio (as an infix operator). For examples,  kBy/{email} or MiBy/10ms (although you should almost never  have /s in a metric unit; rates should always be computed at  query time from the underlying cumulative or delta value). . multiplication or composition (as an infix operator). For  examples, GBy.d or k{watt}.h.The grammar for a unit is as follows: Expression = Component { &quot;.&quot; Component } { &quot;/&quot; Component } ;  Component = ( [ PREFIX ] UNIT | &quot;%&quot; ) [ Annotation ]           | Annotation           | &quot;1&quot;           ;  Annotation = &quot;{&quot; NAME &quot;}&quot; ; Notes: Annotation is just a comment if it follows a UNIT. If the annotation  is used alone, then the unit is equivalent to 1. For examples,  {request}/s == 1/s, By{transmitted}/s == By/s. NAME is a sequence of non-blank printable ASCII characters not  containing { or }. 1 represents a unitary dimensionless  unit (https://en.wikipedia.org/wiki/Dimensionless_quantity) of 1, such  as in 1/s. It is typically used when none of the basic units are  appropriate. For example, &quot;new users per day&quot; can be represented as  1/d or {new-users}/d (and a metric value 5 would mean &quot;5 new  users). Alternatively, &quot;thousands of page views per day&quot; would be  represented as 1000/d or k1/d or k{page_views}/d (and a metric  value of 5.3 would mean &quot;5300 page views per day&quot;). % represents dimensionless value of 1/100, and annotates values giving  a percentage (so the metric values are typically in the range of 0..100,  and a metric value 3 means &quot;3 percent&quot;). 10^2.% indicates a metric contains a ratio, typically in the range  0..1, that will be multiplied by 100 and displayed as a percentage  (so a metric value 0.03 means &quot;3 percent&quot;).
         */
        unit?: string | null;
        /**
         * Whether the measurement is an integer, a floating-point number, etc. Some combinations of metric_kind and value_type might not be supported.
         */
        valueType?: string | null;
    }
    /**
     * Additional annotations that can be used to guide the usage of a metric.
     */
    export interface Schema$MetricDescriptorMetadata {
        /**
         * The delay of data points caused by ingestion. Data points older than this age are guaranteed to be ingested and available to be read, excluding data loss due to errors.
         */
        ingestDelay?: string | null;
        /**
         * Deprecated. Must use the MetricDescriptor.launch_stage instead.
         */
        launchStage?: string | null;
        /**
         * The sampling period of metric data points. For metrics which are written periodically, consecutive data points are stored at this time interval, excluding data loss due to errors. Metrics with a higher granularity have a smaller sampling period.
         */
        samplePeriod?: string | null;
    }
    /**
     * An object representing a resource that can be used for monitoring, logging, billing, or other purposes. Examples include virtual machine instances, databases, and storage devices such as disks. The type field identifies a MonitoredResourceDescriptor object that describes the resource&#39;s schema. Information in the labels field identifies the actual resource and its attributes according to the schema. For example, a particular Compute Engine VM instance could be represented by the following object, because the MonitoredResourceDescriptor for &quot;gce_instance&quot; has labels &quot;instance_id&quot; and &quot;zone&quot;: { &quot;type&quot;: &quot;gce_instance&quot;,   &quot;labels&quot;: { &quot;instance_id&quot;: &quot;12345678901234&quot;,               &quot;zone&quot;: &quot;us-central1-a&quot; }}
     */
    export interface Schema$MonitoredResource {
        /**
         * Required. Values for all of the labels listed in the associated monitored resource descriptor. For example, Compute Engine VM instances use the labels &quot;project_id&quot;, &quot;instance_id&quot;, and &quot;zone&quot;.
         */
        labels?: {
            [key: string]: string;
        } | null;
        /**
         * Required. The monitored resource type. This field must match the type field of a MonitoredResourceDescriptor object. For example, the type of a Compute Engine VM instance is gce_instance.
         */
        type?: string | null;
    }
    /**
     * An object that describes the schema of a MonitoredResource object using a type name and a set of labels. For example, the monitored resource descriptor for Google Compute Engine VM instances has a type of &quot;gce_instance&quot; and specifies the use of the labels &quot;instance_id&quot; and &quot;zone&quot; to identify particular VM instances.Different APIs can support different monitored resource types. APIs generally provide a list method that returns the monitored resource descriptors used by the API.
     */
    export interface Schema$MonitoredResourceDescriptor {
        /**
         * Optional. A detailed description of the monitored resource type that might be used in documentation.
         */
        description?: string | null;
        /**
         * Optional. A concise name for the monitored resource type that might be displayed in user interfaces. It should be a Title Cased Noun Phrase, without any article or other determiners. For example, &quot;Google Cloud SQL Database&quot;.
         */
        displayName?: string | null;
        /**
         * Required. A set of labels used to describe instances of this monitored resource type. For example, an individual Google Cloud SQL database is identified by values for the labels &quot;database_id&quot; and &quot;zone&quot;.
         */
        labels?: Schema$LabelDescriptor[];
        /**
         * Optional. The launch stage of the monitored resource definition.
         */
        launchStage?: string | null;
        /**
         * Optional. The resource name of the monitored resource descriptor: &quot;projects/{project_id}/monitoredResourceDescriptors/{type}&quot; where {type} is the value of the type field in this object and {project_id} is a project ID that provides API-specific context for accessing the type. APIs that do not use project information can use the resource name format &quot;monitoredResourceDescriptors/{type}&quot;.
         */
        name?: string | null;
        /**
         * Required. The monitored resource type. For example, the type &quot;cloudsql_database&quot; represents databases in Google Cloud SQL. The maximum length of this value is 256 characters.
         */
        type?: string | null;
    }
    /**
     * Auxiliary metadata for a MonitoredResource object. MonitoredResource objects contain the minimum set of information to uniquely identify a monitored resource instance. There is some other useful auxiliary metadata. Monitoring and Logging use an ingestion pipeline to extract metadata for cloud resources of all types, and store the metadata in this message.
     */
    export interface Schema$MonitoredResourceMetadata {
        /**
         * Output only. Values for predefined system metadata labels. System labels are a kind of metadata extracted by Google, including &quot;machine_image&quot;, &quot;vpc&quot;, &quot;subnet_id&quot;, &quot;security_group&quot;, &quot;name&quot;, etc. System label values can be only strings, Boolean values, or a list of strings. For example: { &quot;name&quot;: &quot;my-test-instance&quot;,   &quot;security_group&quot;: [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;],   &quot;spot_instance&quot;: false }
         */
        systemLabels?: {
            [key: string]: any;
        } | null;
        /**
         * Output only. A map of user-defined metadata labels.
         */
        userLabels?: {
            [key: string]: string;
        } | null;
    }
    /**
     * Complete log information about a single HTTP request to an App Engine application.
     */
    export interface Schema$RequestLog {
        /**
         * App Engine release version.
         */
        appEngineRelease?: string | null;
        /**
         * Application that handled this request.
         */
        appId?: string | null;
        /**
         * An indication of the relative cost of serving this request.
         */
        cost?: number | null;
        /**
         * Time when the request finished.
         */
        endTime?: string | null;
        /**
         * Whether this request is finished or active.
         */
        finished?: boolean | null;
        /**
         * Whether this is the first RequestLog entry for this request. If an active request has several RequestLog entries written to Stackdriver Logging, then this field will be set for one of them.
         */
        first?: boolean | null;
        /**
         * Internet host and port number of the resource being requested.
         */
        host?: string | null;
        /**
         * HTTP version of request. Example: &quot;HTTP/1.1&quot;.
         */
        httpVersion?: string | null;
        /**
         * An identifier for the instance that handled the request.
         */
        instanceId?: string | null;
        /**
         * If the instance processing this request belongs to a manually scaled module, then this is the 0-based index of the instance. Otherwise, this value is -1.
         */
        instanceIndex?: number | null;
        /**
         * Origin IP address.
         */
        ip?: string | null;
        /**
         * Latency of the request.
         */
        latency?: string | null;
        /**
         * A list of log lines emitted by the application while serving this request.
         */
        line?: Schema$LogLine[];
        /**
         * Number of CPU megacycles used to process request.
         */
        megaCycles?: string | null;
        /**
         * Request method. Example: &quot;GET&quot;, &quot;HEAD&quot;, &quot;PUT&quot;, &quot;POST&quot;, &quot;DELETE&quot;.
         */
        method?: string | null;
        /**
         * Module of the application that handled this request.
         */
        moduleId?: string | null;
        /**
         * The logged-in user who made the request.Most likely, this is the part of the user&#39;s email before the @ sign. The field value is the same for different requests from the same user, but different users can have similar names. This information is also available to the application via the App Engine Users API.This field will be populated starting with App Engine 1.9.21.
         */
        nickname?: string | null;
        /**
         * Time this request spent in the pending request queue.
         */
        pendingTime?: string | null;
        /**
         * Referrer URL of request.
         */
        referrer?: string | null;
        /**
         * Globally unique identifier for a request, which is based on the request start time. Request IDs for requests which started later will compare greater as strings than those for requests which started earlier.
         */
        requestId?: string | null;
        /**
         * Contains the path and query portion of the URL that was requested. For example, if the URL was &quot;http://example.com/app?name=val&quot;, the resource would be &quot;/app?name=val&quot;. The fragment identifier, which is identified by the # character, is not included.
         */
        resource?: string | null;
        /**
         * Size in bytes sent back to client by request.
         */
        responseSize?: string | null;
        /**
         * Source code for the application that handled this request. There can be more than one source reference per deployed application if source code is distributed among multiple repositories.
         */
        sourceReference?: Schema$SourceReference[];
        /**
         * Time when the request started.
         */
        startTime?: string | null;
        /**
         * HTTP response status code. Example: 200, 404.
         */
        status?: number | null;
        /**
         * Task name of the request, in the case of an offline request.
         */
        taskName?: string | null;
        /**
         * Queue name of the request, in the case of an offline request.
         */
        taskQueueName?: string | null;
        /**
         * Stackdriver Trace identifier for this request.
         */
        traceId?: string | null;
        /**
         * If true, the value in the &#39;trace_id&#39; field was sampled for storage in a trace backend.
         */
        traceSampled?: boolean | null;
        /**
         * File or class that handled the request.
         */
        urlMapEntry?: string | null;
        /**
         * User agent that made the request.
         */
        userAgent?: string | null;
        /**
         * Version of the application that handled this request.
         */
        versionId?: string | null;
        /**
         * Whether this was a loading request for the instance.
         */
        wasLoadingRequest?: boolean | null;
    }
    /**
     * Specifies a location in a source code file.
     */
    export interface Schema$SourceLocation {
        /**
         * Source file name. Depending on the runtime environment, this might be a simple name or a fully-qualified name.
         */
        file?: string | null;
        /**
         * Human-readable name of the function or method being invoked, with optional context such as the class or package name. This information is used in contexts such as the logs viewer, where a file and line number are less meaningful. The format can vary by language. For example: qual.if.ied.Class.method (Java), dir/package.func (Go), function (Python).
         */
        functionName?: string | null;
        /**
         * Line within the source file.
         */
        line?: string | null;
    }
    /**
     * A reference to a particular snapshot of the source tree used to build and deploy an application.
     */
    export interface Schema$SourceReference {
        /**
         * Optional. A URI string identifying the repository. Example: &quot;https://github.com/GoogleCloudPlatform/kubernetes.git&quot;
         */
        repository?: string | null;
        /**
         * The canonical and persistent identifier of the deployed revision. Example (git): &quot;0035781c50ec7aa23385dc841529ce8a4b70db1b&quot;
         */
        revisionId?: string | null;
    }
    /**
     * The parameters to WriteLogEntries.
     */
    export interface Schema$WriteLogEntriesRequest {
        /**
         * Optional. If true, the request should expect normal response, but the entries won&#39;t be persisted nor exported. Useful for checking whether the logging API endpoints are working properly before sending valuable data.
         */
        dryRun?: boolean | null;
        /**
         * Required. The log entries to send to Logging. The order of log entries in this list does not matter. Values supplied in this method&#39;s log_name, resource, and labels fields are copied into those log entries in this list that do not include values for their corresponding fields. For more information, see the LogEntry type.If the timestamp or insert_id fields are missing in log entries, then this method supplies the current time or a unique identifier, respectively. The supplied values are chosen so that, among the log entries that did not supply their own values, the entries earlier in the list will sort before the entries later in the list. See the entries.list method.Log entries with timestamps that are more than the logs retention period (https://cloud.google.com/logging/quota-policy) in the past or more than 24 hours in the future will not be available when calling entries.list. However, those log entries can still be exported with LogSinks (https://cloud.google.com/logging/docs/api/tasks/exporting-logs).To improve throughput and to avoid exceeding the quota limit (https://cloud.google.com/logging/quota-policy) for calls to entries.write, you should try to include several log entries in this list, rather than calling this method for each individual log entry.
         */
        entries?: Schema$LogEntry[];
        /**
         * Optional. Default labels that are added to the labels field of all log entries in entries. If a log entry already has a label with the same key as a label in this parameter, then the log entry&#39;s label is not changed. See LogEntry.
         */
        labels?: {
            [key: string]: string;
        } | null;
        /**
         * Optional. A default log resource name that is assigned to all log entries in entries that do not specify a value for log_name: &quot;projects/[PROJECT_ID]/logs/[LOG_ID]&quot; &quot;organizations/[ORGANIZATION_ID]/logs/[LOG_ID]&quot; &quot;billingAccounts/[BILLING_ACCOUNT_ID]/logs/[LOG_ID]&quot; &quot;folders/[FOLDER_ID]/logs/[LOG_ID]&quot; [LOG_ID] must be URL-encoded. For example: &quot;projects/my-project-id/logs/syslog&quot; &quot;organizations/1234567890/logs/cloudresourcemanager.googleapis.com%2Factivity&quot; The permission logging.logEntries.create is needed on each project, organization, billing account, or folder that is receiving new log entries, whether the resource is specified in logName or in an individual log entry.
         */
        logName?: string | null;
        /**
         * Optional. Whether valid entries should be written even if some other entries fail due to INVALID_ARGUMENT or PERMISSION_DENIED errors. If any entry is not written, then the response status is the error associated with one of the failed entries and the response includes error details keyed by the entries&#39; zero-based index in the entries.write method.
         */
        partialSuccess?: boolean | null;
        /**
         * Optional. A default monitored resource object that is assigned to all log entries in entries that do not specify a value for resource. Example: { &quot;type&quot;: &quot;gce_instance&quot;,   &quot;labels&quot;: {     &quot;zone&quot;: &quot;us-central1-a&quot;, &quot;instance_id&quot;: &quot;00000000000000000000&quot; }} See LogEntry.
         */
        resource?: Schema$MonitoredResource;
    }
    /**
     * Result returned from WriteLogEntries.
     */
    export interface Schema$WriteLogEntriesResponse {
    }
    export class Resource$Billingaccounts {
        context: APIRequestContext;
        buckets: Resource$Billingaccounts$Buckets;
        exclusions: Resource$Billingaccounts$Exclusions;
        locations: Resource$Billingaccounts$Locations;
        logs: Resource$Billingaccounts$Logs;
        sinks: Resource$Billingaccounts$Sinks;
        constructor(context: APIRequestContext);
    }
    export class Resource$Billingaccounts$Buckets {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * logging.billingAccounts.buckets.get
         * @desc Gets a bucket (Beta).
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.billingAccounts.buckets.get({
         *     // Required. The resource name of the bucket:
         *     // "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // Example: "projects/my-project-id/locations/my-location/buckets/my-bucket-id".
         *     name: 'billingAccounts/my-billingAccount/buckets/my-bucket',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "lifecycleState": "my_lifecycleState",
         *   //   "name": "my_name",
         *   //   "retentionDays": 0,
         *   //   "updateTime": "my_updateTime"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.billingAccounts.buckets.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" Example: "projects/my-project-id/locations/my-location/buckets/my-bucket-id".
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Billingaccounts$Buckets$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Billingaccounts$Buckets$Get, options?: MethodOptions): GaxiosPromise<Schema$LogBucket>;
        get(params: Params$Resource$Billingaccounts$Buckets$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Billingaccounts$Buckets$Get, options: MethodOptions | BodyResponseCallback<Schema$LogBucket>, callback: BodyResponseCallback<Schema$LogBucket>): void;
        get(params: Params$Resource$Billingaccounts$Buckets$Get, callback: BodyResponseCallback<Schema$LogBucket>): void;
        get(callback: BodyResponseCallback<Schema$LogBucket>): void;
    }
    export interface Params$Resource$Billingaccounts$Buckets$Get extends StandardParameters {
        /**
         * Required. The resource name of the bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" Example: "projects/my-project-id/locations/my-location/buckets/my-bucket-id".
         */
        name?: string;
    }
    export class Resource$Billingaccounts$Exclusions {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * logging.billingAccounts.exclusions.create
         * @desc Creates a new exclusion in a specified parent resource. Only log entries belonging to that resource can be excluded. You can have up to 10 exclusions in a resource.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.billingAccounts.exclusions.create({
         *     // Required. The parent resource in which to create the exclusion:
         *     // "projects/[PROJECT_ID]"
         *     // "organizations/[ORGANIZATION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]"
         *     // "folders/[FOLDER_ID]"
         *     // Examples: "projects/my-logging-project", "organizations/123456789".
         *     parent: 'billingAccounts/my-billingAccount',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "createTime": "my_createTime",
         *       //   "description": "my_description",
         *       //   "disabled": false,
         *       //   "filter": "my_filter",
         *       //   "name": "my_name",
         *       //   "updateTime": "my_updateTime"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "disabled": false,
         *   //   "filter": "my_filter",
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
         * @alias logging.billingAccounts.exclusions.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent Required. The parent resource in which to create the exclusion: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" Examples: "projects/my-logging-project", "organizations/123456789".
         * @param {().LogExclusion} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Billingaccounts$Exclusions$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Billingaccounts$Exclusions$Create, options?: MethodOptions): GaxiosPromise<Schema$LogExclusion>;
        create(params: Params$Resource$Billingaccounts$Exclusions$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Billingaccounts$Exclusions$Create, options: MethodOptions | BodyResponseCallback<Schema$LogExclusion>, callback: BodyResponseCallback<Schema$LogExclusion>): void;
        create(params: Params$Resource$Billingaccounts$Exclusions$Create, callback: BodyResponseCallback<Schema$LogExclusion>): void;
        create(callback: BodyResponseCallback<Schema$LogExclusion>): void;
        /**
         * logging.billingAccounts.exclusions.delete
         * @desc Deletes an exclusion.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.billingAccounts.exclusions.delete({
         *     // Required. The resource name of an existing exclusion to delete:
         *     // "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]"
         *     // "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]"
         *     // "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]"
         *     // Example: "projects/my-project-id/exclusions/my-exclusion-id".
         *     name: 'billingAccounts/my-billingAccount/exclusions/my-exclusion',
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
         * @alias logging.billingAccounts.exclusions.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of an existing exclusion to delete: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" Example: "projects/my-project-id/exclusions/my-exclusion-id".
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Billingaccounts$Exclusions$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Billingaccounts$Exclusions$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Billingaccounts$Exclusions$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Billingaccounts$Exclusions$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Billingaccounts$Exclusions$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * logging.billingAccounts.exclusions.get
         * @desc Gets the description of an exclusion.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.billingAccounts.exclusions.get({
         *     // Required. The resource name of an existing exclusion:
         *     // "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]"
         *     // "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]"
         *     // "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]"
         *     // Example: "projects/my-project-id/exclusions/my-exclusion-id".
         *     name: 'billingAccounts/my-billingAccount/exclusions/my-exclusion',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "disabled": false,
         *   //   "filter": "my_filter",
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
         * @alias logging.billingAccounts.exclusions.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of an existing exclusion: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" Example: "projects/my-project-id/exclusions/my-exclusion-id".
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Billingaccounts$Exclusions$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Billingaccounts$Exclusions$Get, options?: MethodOptions): GaxiosPromise<Schema$LogExclusion>;
        get(params: Params$Resource$Billingaccounts$Exclusions$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Billingaccounts$Exclusions$Get, options: MethodOptions | BodyResponseCallback<Schema$LogExclusion>, callback: BodyResponseCallback<Schema$LogExclusion>): void;
        get(params: Params$Resource$Billingaccounts$Exclusions$Get, callback: BodyResponseCallback<Schema$LogExclusion>): void;
        get(callback: BodyResponseCallback<Schema$LogExclusion>): void;
        /**
         * logging.billingAccounts.exclusions.list
         * @desc Lists all the exclusions in a parent resource.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.billingAccounts.exclusions.list({
         *     // Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         *     pageSize: 'placeholder-value',
         *     // Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         *     pageToken: 'placeholder-value',
         *     // Required. The parent resource whose exclusions are to be listed.
         *     // "projects/[PROJECT_ID]"
         *     // "organizations/[ORGANIZATION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]"
         *     // "folders/[FOLDER_ID]"
         *     //
         *     parent: 'billingAccounts/my-billingAccount',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "exclusions": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.billingAccounts.exclusions.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         * @param {string=} params.pageToken Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         * @param {string} params.parent Required. The parent resource whose exclusions are to be listed. "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]"
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Billingaccounts$Exclusions$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Billingaccounts$Exclusions$List, options?: MethodOptions): GaxiosPromise<Schema$ListExclusionsResponse>;
        list(params: Params$Resource$Billingaccounts$Exclusions$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Billingaccounts$Exclusions$List, options: MethodOptions | BodyResponseCallback<Schema$ListExclusionsResponse>, callback: BodyResponseCallback<Schema$ListExclusionsResponse>): void;
        list(params: Params$Resource$Billingaccounts$Exclusions$List, callback: BodyResponseCallback<Schema$ListExclusionsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListExclusionsResponse>): void;
        /**
         * logging.billingAccounts.exclusions.patch
         * @desc Changes one or more properties of an existing exclusion.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.billingAccounts.exclusions.patch({
         *     // Required. The resource name of the exclusion to update:
         *     // "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]"
         *     // "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]"
         *     // "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]"
         *     // Example: "projects/my-project-id/exclusions/my-exclusion-id".
         *     name: 'billingAccounts/my-billingAccount/exclusions/my-exclusion',
         *     // Required. A non-empty list of fields to change in the existing exclusion. New values for the fields are taken from the corresponding fields in the LogExclusion included in this request. Fields not mentioned in update_mask are not changed and are ignored in the request.For example, to change the filter and description of an exclusion, specify an update_mask of "filter,description".
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "createTime": "my_createTime",
         *       //   "description": "my_description",
         *       //   "disabled": false,
         *       //   "filter": "my_filter",
         *       //   "name": "my_name",
         *       //   "updateTime": "my_updateTime"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "disabled": false,
         *   //   "filter": "my_filter",
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
         * @alias logging.billingAccounts.exclusions.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the exclusion to update: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" Example: "projects/my-project-id/exclusions/my-exclusion-id".
         * @param {string=} params.updateMask Required. A non-empty list of fields to change in the existing exclusion. New values for the fields are taken from the corresponding fields in the LogExclusion included in this request. Fields not mentioned in update_mask are not changed and are ignored in the request.For example, to change the filter and description of an exclusion, specify an update_mask of "filter,description".
         * @param {().LogExclusion} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Billingaccounts$Exclusions$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Billingaccounts$Exclusions$Patch, options?: MethodOptions): GaxiosPromise<Schema$LogExclusion>;
        patch(params: Params$Resource$Billingaccounts$Exclusions$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Billingaccounts$Exclusions$Patch, options: MethodOptions | BodyResponseCallback<Schema$LogExclusion>, callback: BodyResponseCallback<Schema$LogExclusion>): void;
        patch(params: Params$Resource$Billingaccounts$Exclusions$Patch, callback: BodyResponseCallback<Schema$LogExclusion>): void;
        patch(callback: BodyResponseCallback<Schema$LogExclusion>): void;
    }
    export interface Params$Resource$Billingaccounts$Exclusions$Create extends StandardParameters {
        /**
         * Required. The parent resource in which to create the exclusion: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" Examples: "projects/my-logging-project", "organizations/123456789".
         */
        parent?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$LogExclusion;
    }
    export interface Params$Resource$Billingaccounts$Exclusions$Delete extends StandardParameters {
        /**
         * Required. The resource name of an existing exclusion to delete: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" Example: "projects/my-project-id/exclusions/my-exclusion-id".
         */
        name?: string;
    }
    export interface Params$Resource$Billingaccounts$Exclusions$Get extends StandardParameters {
        /**
         * Required. The resource name of an existing exclusion: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" Example: "projects/my-project-id/exclusions/my-exclusion-id".
         */
        name?: string;
    }
    export interface Params$Resource$Billingaccounts$Exclusions$List extends StandardParameters {
        /**
         * Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         */
        pageSize?: number;
        /**
         * Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         */
        pageToken?: string;
        /**
         * Required. The parent resource whose exclusions are to be listed. "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]"
         */
        parent?: string;
    }
    export interface Params$Resource$Billingaccounts$Exclusions$Patch extends StandardParameters {
        /**
         * Required. The resource name of the exclusion to update: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" Example: "projects/my-project-id/exclusions/my-exclusion-id".
         */
        name?: string;
        /**
         * Required. A non-empty list of fields to change in the existing exclusion. New values for the fields are taken from the corresponding fields in the LogExclusion included in this request. Fields not mentioned in update_mask are not changed and are ignored in the request.For example, to change the filter and description of an exclusion, specify an update_mask of "filter,description".
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$LogExclusion;
    }
    export class Resource$Billingaccounts$Locations {
        context: APIRequestContext;
        buckets: Resource$Billingaccounts$Locations$Buckets;
        constructor(context: APIRequestContext);
    }
    export class Resource$Billingaccounts$Locations$Buckets {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * logging.billingAccounts.locations.buckets.list
         * @desc Lists buckets (Beta).
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.billingAccounts.locations.buckets.list({
         *     // Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         *     pageSize: 'placeholder-value',
         *     // Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         *     pageToken: 'placeholder-value',
         *     // Required. The parent resource whose buckets are to be listed:
         *     // "projects/[PROJECT_ID]/locations/[LOCATION_ID]"
         *     // "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]"
         *     // "folders/[FOLDER_ID]/locations/[LOCATION_ID]"
         *     // Note: The locations portion of the resource must be specified, but supplying the character - in place of LOCATION_ID will return all buckets.
         *     parent: 'billingAccounts/my-billingAccount/locations/my-location',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "buckets": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.billingAccounts.locations.buckets.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         * @param {string=} params.pageToken Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         * @param {string} params.parent Required. The parent resource whose buckets are to be listed: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" Note: The locations portion of the resource must be specified, but supplying the character - in place of LOCATION_ID will return all buckets.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Billingaccounts$Locations$Buckets$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Billingaccounts$Locations$Buckets$List, options?: MethodOptions): GaxiosPromise<Schema$ListBucketsResponse>;
        list(params: Params$Resource$Billingaccounts$Locations$Buckets$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Billingaccounts$Locations$Buckets$List, options: MethodOptions | BodyResponseCallback<Schema$ListBucketsResponse>, callback: BodyResponseCallback<Schema$ListBucketsResponse>): void;
        list(params: Params$Resource$Billingaccounts$Locations$Buckets$List, callback: BodyResponseCallback<Schema$ListBucketsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListBucketsResponse>): void;
        /**
         * logging.billingAccounts.locations.buckets.patch
         * @desc Updates a bucket. This method replaces the following fields in the existing bucket with values from the new bucket: retention_periodIf the retention period is decreased and the bucket is locked, FAILED_PRECONDITION will be returned.If the bucket has a LifecycleState of DELETE_REQUESTED, FAILED_PRECONDITION will be returned.A buckets region may not be modified after it is created. This method is in Beta.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.billingAccounts.locations.buckets.patch({
         *     // Required. The full resource name of the bucket to update.
         *     // "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // Example: "projects/my-project-id/locations/my-location/buckets/my-bucket-id". Also requires permission "resourcemanager.projects.updateLiens" to set the locked property
         *     name:
         *       'billingAccounts/my-billingAccount/locations/my-location/buckets/my-bucket',
         *     // Required. Field mask that specifies the fields in bucket that need an update. A bucket field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=retention_days.
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "createTime": "my_createTime",
         *       //   "description": "my_description",
         *       //   "lifecycleState": "my_lifecycleState",
         *       //   "name": "my_name",
         *       //   "retentionDays": 0,
         *       //   "updateTime": "my_updateTime"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "lifecycleState": "my_lifecycleState",
         *   //   "name": "my_name",
         *   //   "retentionDays": 0,
         *   //   "updateTime": "my_updateTime"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.billingAccounts.locations.buckets.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The full resource name of the bucket to update. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" Example: "projects/my-project-id/locations/my-location/buckets/my-bucket-id". Also requires permission "resourcemanager.projects.updateLiens" to set the locked property
         * @param {string=} params.updateMask Required. Field mask that specifies the fields in bucket that need an update. A bucket field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=retention_days.
         * @param {().LogBucket} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Billingaccounts$Locations$Buckets$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Billingaccounts$Locations$Buckets$Patch, options?: MethodOptions): GaxiosPromise<Schema$LogBucket>;
        patch(params: Params$Resource$Billingaccounts$Locations$Buckets$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Billingaccounts$Locations$Buckets$Patch, options: MethodOptions | BodyResponseCallback<Schema$LogBucket>, callback: BodyResponseCallback<Schema$LogBucket>): void;
        patch(params: Params$Resource$Billingaccounts$Locations$Buckets$Patch, callback: BodyResponseCallback<Schema$LogBucket>): void;
        patch(callback: BodyResponseCallback<Schema$LogBucket>): void;
    }
    export interface Params$Resource$Billingaccounts$Locations$Buckets$List extends StandardParameters {
        /**
         * Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         */
        pageSize?: number;
        /**
         * Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         */
        pageToken?: string;
        /**
         * Required. The parent resource whose buckets are to be listed: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" Note: The locations portion of the resource must be specified, but supplying the character - in place of LOCATION_ID will return all buckets.
         */
        parent?: string;
    }
    export interface Params$Resource$Billingaccounts$Locations$Buckets$Patch extends StandardParameters {
        /**
         * Required. The full resource name of the bucket to update. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" Example: "projects/my-project-id/locations/my-location/buckets/my-bucket-id". Also requires permission "resourcemanager.projects.updateLiens" to set the locked property
         */
        name?: string;
        /**
         * Required. Field mask that specifies the fields in bucket that need an update. A bucket field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=retention_days.
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$LogBucket;
    }
    export class Resource$Billingaccounts$Logs {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * logging.billingAccounts.logs.delete
         * @desc Deletes all the log entries in a log. The log reappears if it receives new entries. Log entries written shortly before the delete operation might not be deleted. Entries received after the delete operation with a timestamp before the operation will be deleted.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.billingAccounts.logs.delete({
         *     // Required. The resource name of the log to delete:
         *     // "projects/[PROJECT_ID]/logs/[LOG_ID]"
         *     // "organizations/[ORGANIZATION_ID]/logs/[LOG_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/logs/[LOG_ID]"
         *     // "folders/[FOLDER_ID]/logs/[LOG_ID]"
         *     // [LOG_ID] must be URL-encoded. For example, "projects/my-project-id/logs/syslog", "organizations/1234567890/logs/cloudresourcemanager.googleapis.com%2Factivity". For more information about log names, see LogEntry.
         *     logName: 'billingAccounts/my-billingAccount/logs/my-log',
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
         * @alias logging.billingAccounts.logs.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.logName Required. The resource name of the log to delete: "projects/[PROJECT_ID]/logs/[LOG_ID]" "organizations/[ORGANIZATION_ID]/logs/[LOG_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/logs/[LOG_ID]" "folders/[FOLDER_ID]/logs/[LOG_ID]" [LOG_ID] must be URL-encoded. For example, "projects/my-project-id/logs/syslog", "organizations/1234567890/logs/cloudresourcemanager.googleapis.com%2Factivity". For more information about log names, see LogEntry.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Billingaccounts$Logs$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Billingaccounts$Logs$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Billingaccounts$Logs$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Billingaccounts$Logs$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Billingaccounts$Logs$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * logging.billingAccounts.logs.list
         * @desc Lists the logs in projects, organizations, folders, or billing accounts. Only logs that have entries are listed.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.billingAccounts.logs.list({
         *     // Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         *     pageSize: 'placeholder-value',
         *     // Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         *     pageToken: 'placeholder-value',
         *     // Required. The resource name that owns the logs:
         *     // "projects/[PROJECT_ID]"
         *     // "organizations/[ORGANIZATION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]"
         *     // "folders/[FOLDER_ID]"
         *     //
         *     parent: 'billingAccounts/my-billingAccount',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "logNames": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.billingAccounts.logs.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         * @param {string=} params.pageToken Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         * @param {string} params.parent Required. The resource name that owns the logs: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]"
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Billingaccounts$Logs$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Billingaccounts$Logs$List, options?: MethodOptions): GaxiosPromise<Schema$ListLogsResponse>;
        list(params: Params$Resource$Billingaccounts$Logs$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Billingaccounts$Logs$List, options: MethodOptions | BodyResponseCallback<Schema$ListLogsResponse>, callback: BodyResponseCallback<Schema$ListLogsResponse>): void;
        list(params: Params$Resource$Billingaccounts$Logs$List, callback: BodyResponseCallback<Schema$ListLogsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListLogsResponse>): void;
    }
    export interface Params$Resource$Billingaccounts$Logs$Delete extends StandardParameters {
        /**
         * Required. The resource name of the log to delete: "projects/[PROJECT_ID]/logs/[LOG_ID]" "organizations/[ORGANIZATION_ID]/logs/[LOG_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/logs/[LOG_ID]" "folders/[FOLDER_ID]/logs/[LOG_ID]" [LOG_ID] must be URL-encoded. For example, "projects/my-project-id/logs/syslog", "organizations/1234567890/logs/cloudresourcemanager.googleapis.com%2Factivity". For more information about log names, see LogEntry.
         */
        logName?: string;
    }
    export interface Params$Resource$Billingaccounts$Logs$List extends StandardParameters {
        /**
         * Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         */
        pageSize?: number;
        /**
         * Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         */
        pageToken?: string;
        /**
         * Required. The resource name that owns the logs: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]"
         */
        parent?: string;
    }
    export class Resource$Billingaccounts$Sinks {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * logging.billingAccounts.sinks.create
         * @desc Creates a sink that exports specified log entries to a destination. The export of newly-ingested log entries begins immediately, unless the sink's writer_identity is not permitted to write to the destination. A sink can export log entries only from the resource owning the sink.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.billingAccounts.sinks.create({
         *     // Required. The resource in which to create the sink:
         *     // "projects/[PROJECT_ID]"
         *     // "organizations/[ORGANIZATION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]"
         *     // "folders/[FOLDER_ID]"
         *     // Examples: "projects/my-logging-project", "organizations/123456789".
         *     parent: 'billingAccounts/my-billingAccount',
         *     // Optional. Determines the kind of IAM identity returned as writer_identity in the new sink. If this value is omitted or set to false, and if the sink's parent is a project, then the value returned as writer_identity is the same group or service account used by Logging before the addition of writer identities to this API. The sink's destination must be in the same project as the sink itself.If this field is set to true, or if the sink is owned by a non-project resource such as an organization, then the value of writer_identity will be a unique service account used only for exports from the new sink. For more information, see writer_identity in LogSink.
         *     uniqueWriterIdentity: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "bigqueryOptions": {},
         *       //   "createTime": "my_createTime",
         *       //   "description": "my_description",
         *       //   "destination": "my_destination",
         *       //   "disabled": false,
         *       //   "filter": "my_filter",
         *       //   "includeChildren": false,
         *       //   "name": "my_name",
         *       //   "outputVersionFormat": "my_outputVersionFormat",
         *       //   "updateTime": "my_updateTime",
         *       //   "writerIdentity": "my_writerIdentity"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bigqueryOptions": {},
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "destination": "my_destination",
         *   //   "disabled": false,
         *   //   "filter": "my_filter",
         *   //   "includeChildren": false,
         *   //   "name": "my_name",
         *   //   "outputVersionFormat": "my_outputVersionFormat",
         *   //   "updateTime": "my_updateTime",
         *   //   "writerIdentity": "my_writerIdentity"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.billingAccounts.sinks.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent Required. The resource in which to create the sink: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" Examples: "projects/my-logging-project", "organizations/123456789".
         * @param {boolean=} params.uniqueWriterIdentity Optional. Determines the kind of IAM identity returned as writer_identity in the new sink. If this value is omitted or set to false, and if the sink's parent is a project, then the value returned as writer_identity is the same group or service account used by Logging before the addition of writer identities to this API. The sink's destination must be in the same project as the sink itself.If this field is set to true, or if the sink is owned by a non-project resource such as an organization, then the value of writer_identity will be a unique service account used only for exports from the new sink. For more information, see writer_identity in LogSink.
         * @param {().LogSink} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Billingaccounts$Sinks$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Billingaccounts$Sinks$Create, options?: MethodOptions): GaxiosPromise<Schema$LogSink>;
        create(params: Params$Resource$Billingaccounts$Sinks$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Billingaccounts$Sinks$Create, options: MethodOptions | BodyResponseCallback<Schema$LogSink>, callback: BodyResponseCallback<Schema$LogSink>): void;
        create(params: Params$Resource$Billingaccounts$Sinks$Create, callback: BodyResponseCallback<Schema$LogSink>): void;
        create(callback: BodyResponseCallback<Schema$LogSink>): void;
        /**
         * logging.billingAccounts.sinks.delete
         * @desc Deletes a sink. If the sink has a unique writer_identity, then that service account is also deleted.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.billingAccounts.sinks.delete({
         *     // Required. The full resource name of the sink to delete, including the parent resource and the sink identifier:
         *     // "projects/[PROJECT_ID]/sinks/[SINK_ID]"
         *     // "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]"
         *     // "folders/[FOLDER_ID]/sinks/[SINK_ID]"
         *     // Example: "projects/my-project-id/sinks/my-sink-id".
         *     sinkName: 'billingAccounts/my-billingAccount/sinks/my-sink',
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
         * @alias logging.billingAccounts.sinks.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.sinkName Required. The full resource name of the sink to delete, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" Example: "projects/my-project-id/sinks/my-sink-id".
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Billingaccounts$Sinks$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Billingaccounts$Sinks$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Billingaccounts$Sinks$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Billingaccounts$Sinks$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Billingaccounts$Sinks$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * logging.billingAccounts.sinks.get
         * @desc Gets a sink.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.billingAccounts.sinks.get({
         *     // Required. The resource name of the sink:
         *     // "projects/[PROJECT_ID]/sinks/[SINK_ID]"
         *     // "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]"
         *     // "folders/[FOLDER_ID]/sinks/[SINK_ID]"
         *     // Example: "projects/my-project-id/sinks/my-sink-id".
         *     sinkName: 'billingAccounts/my-billingAccount/sinks/my-sink',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bigqueryOptions": {},
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "destination": "my_destination",
         *   //   "disabled": false,
         *   //   "filter": "my_filter",
         *   //   "includeChildren": false,
         *   //   "name": "my_name",
         *   //   "outputVersionFormat": "my_outputVersionFormat",
         *   //   "updateTime": "my_updateTime",
         *   //   "writerIdentity": "my_writerIdentity"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.billingAccounts.sinks.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.sinkName Required. The resource name of the sink: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" Example: "projects/my-project-id/sinks/my-sink-id".
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Billingaccounts$Sinks$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Billingaccounts$Sinks$Get, options?: MethodOptions): GaxiosPromise<Schema$LogSink>;
        get(params: Params$Resource$Billingaccounts$Sinks$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Billingaccounts$Sinks$Get, options: MethodOptions | BodyResponseCallback<Schema$LogSink>, callback: BodyResponseCallback<Schema$LogSink>): void;
        get(params: Params$Resource$Billingaccounts$Sinks$Get, callback: BodyResponseCallback<Schema$LogSink>): void;
        get(callback: BodyResponseCallback<Schema$LogSink>): void;
        /**
         * logging.billingAccounts.sinks.list
         * @desc Lists sinks.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.billingAccounts.sinks.list({
         *     // Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         *     pageSize: 'placeholder-value',
         *     // Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         *     pageToken: 'placeholder-value',
         *     // Required. The parent resource whose sinks are to be listed:
         *     // "projects/[PROJECT_ID]"
         *     // "organizations/[ORGANIZATION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]"
         *     // "folders/[FOLDER_ID]"
         *     //
         *     parent: 'billingAccounts/my-billingAccount',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "sinks": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.billingAccounts.sinks.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         * @param {string=} params.pageToken Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         * @param {string} params.parent Required. The parent resource whose sinks are to be listed: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]"
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Billingaccounts$Sinks$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Billingaccounts$Sinks$List, options?: MethodOptions): GaxiosPromise<Schema$ListSinksResponse>;
        list(params: Params$Resource$Billingaccounts$Sinks$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Billingaccounts$Sinks$List, options: MethodOptions | BodyResponseCallback<Schema$ListSinksResponse>, callback: BodyResponseCallback<Schema$ListSinksResponse>): void;
        list(params: Params$Resource$Billingaccounts$Sinks$List, callback: BodyResponseCallback<Schema$ListSinksResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListSinksResponse>): void;
        /**
         * logging.billingAccounts.sinks.patch
         * @desc Updates a sink. This method replaces the following fields in the existing sink with values from the new sink: destination, and filter.The updated sink might also have a new writer_identity; see the unique_writer_identity field.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.billingAccounts.sinks.patch({
         *     // Required. The full resource name of the sink to update, including the parent resource and the sink identifier:
         *     // "projects/[PROJECT_ID]/sinks/[SINK_ID]"
         *     // "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]"
         *     // "folders/[FOLDER_ID]/sinks/[SINK_ID]"
         *     // Example: "projects/my-project-id/sinks/my-sink-id".
         *     sinkName: 'billingAccounts/my-billingAccount/sinks/my-sink',
         *     // Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field:
         *     // If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity.
         *     // If the old value is false and the new value is true, then writer_identity is changed to a unique service account.
         *     // It is an error if the old value is true and the new value is set to false or defaulted to false.
         *     uniqueWriterIdentity: 'placeholder-value',
         *     // Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:  destination,filter,includeChildren At some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=filter.
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "bigqueryOptions": {},
         *       //   "createTime": "my_createTime",
         *       //   "description": "my_description",
         *       //   "destination": "my_destination",
         *       //   "disabled": false,
         *       //   "filter": "my_filter",
         *       //   "includeChildren": false,
         *       //   "name": "my_name",
         *       //   "outputVersionFormat": "my_outputVersionFormat",
         *       //   "updateTime": "my_updateTime",
         *       //   "writerIdentity": "my_writerIdentity"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bigqueryOptions": {},
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "destination": "my_destination",
         *   //   "disabled": false,
         *   //   "filter": "my_filter",
         *   //   "includeChildren": false,
         *   //   "name": "my_name",
         *   //   "outputVersionFormat": "my_outputVersionFormat",
         *   //   "updateTime": "my_updateTime",
         *   //   "writerIdentity": "my_writerIdentity"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.billingAccounts.sinks.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.sinkName Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" Example: "projects/my-project-id/sinks/my-sink-id".
         * @param {boolean=} params.uniqueWriterIdentity Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field: If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity. If the old value is false and the new value is true, then writer_identity is changed to a unique service account. It is an error if the old value is true and the new value is set to false or defaulted to false.
         * @param {string=} params.updateMask Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:  destination,filter,includeChildren At some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=filter.
         * @param {().LogSink} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Billingaccounts$Sinks$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Billingaccounts$Sinks$Patch, options?: MethodOptions): GaxiosPromise<Schema$LogSink>;
        patch(params: Params$Resource$Billingaccounts$Sinks$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Billingaccounts$Sinks$Patch, options: MethodOptions | BodyResponseCallback<Schema$LogSink>, callback: BodyResponseCallback<Schema$LogSink>): void;
        patch(params: Params$Resource$Billingaccounts$Sinks$Patch, callback: BodyResponseCallback<Schema$LogSink>): void;
        patch(callback: BodyResponseCallback<Schema$LogSink>): void;
        /**
         * logging.billingAccounts.sinks.update
         * @desc Updates a sink. This method replaces the following fields in the existing sink with values from the new sink: destination, and filter.The updated sink might also have a new writer_identity; see the unique_writer_identity field.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.billingAccounts.sinks.update({
         *     // Required. The full resource name of the sink to update, including the parent resource and the sink identifier:
         *     // "projects/[PROJECT_ID]/sinks/[SINK_ID]"
         *     // "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]"
         *     // "folders/[FOLDER_ID]/sinks/[SINK_ID]"
         *     // Example: "projects/my-project-id/sinks/my-sink-id".
         *     sinkName: 'billingAccounts/my-billingAccount/sinks/my-sink',
         *     // Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field:
         *     // If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity.
         *     // If the old value is false and the new value is true, then writer_identity is changed to a unique service account.
         *     // It is an error if the old value is true and the new value is set to false or defaulted to false.
         *     uniqueWriterIdentity: 'placeholder-value',
         *     // Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:  destination,filter,includeChildren At some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=filter.
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "bigqueryOptions": {},
         *       //   "createTime": "my_createTime",
         *       //   "description": "my_description",
         *       //   "destination": "my_destination",
         *       //   "disabled": false,
         *       //   "filter": "my_filter",
         *       //   "includeChildren": false,
         *       //   "name": "my_name",
         *       //   "outputVersionFormat": "my_outputVersionFormat",
         *       //   "updateTime": "my_updateTime",
         *       //   "writerIdentity": "my_writerIdentity"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bigqueryOptions": {},
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "destination": "my_destination",
         *   //   "disabled": false,
         *   //   "filter": "my_filter",
         *   //   "includeChildren": false,
         *   //   "name": "my_name",
         *   //   "outputVersionFormat": "my_outputVersionFormat",
         *   //   "updateTime": "my_updateTime",
         *   //   "writerIdentity": "my_writerIdentity"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.billingAccounts.sinks.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.sinkName Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" Example: "projects/my-project-id/sinks/my-sink-id".
         * @param {boolean=} params.uniqueWriterIdentity Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field: If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity. If the old value is false and the new value is true, then writer_identity is changed to a unique service account. It is an error if the old value is true and the new value is set to false or defaulted to false.
         * @param {string=} params.updateMask Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:  destination,filter,includeChildren At some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=filter.
         * @param {().LogSink} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Billingaccounts$Sinks$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Billingaccounts$Sinks$Update, options?: MethodOptions): GaxiosPromise<Schema$LogSink>;
        update(params: Params$Resource$Billingaccounts$Sinks$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Billingaccounts$Sinks$Update, options: MethodOptions | BodyResponseCallback<Schema$LogSink>, callback: BodyResponseCallback<Schema$LogSink>): void;
        update(params: Params$Resource$Billingaccounts$Sinks$Update, callback: BodyResponseCallback<Schema$LogSink>): void;
        update(callback: BodyResponseCallback<Schema$LogSink>): void;
    }
    export interface Params$Resource$Billingaccounts$Sinks$Create extends StandardParameters {
        /**
         * Required. The resource in which to create the sink: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" Examples: "projects/my-logging-project", "organizations/123456789".
         */
        parent?: string;
        /**
         * Optional. Determines the kind of IAM identity returned as writer_identity in the new sink. If this value is omitted or set to false, and if the sink's parent is a project, then the value returned as writer_identity is the same group or service account used by Logging before the addition of writer identities to this API. The sink's destination must be in the same project as the sink itself.If this field is set to true, or if the sink is owned by a non-project resource such as an organization, then the value of writer_identity will be a unique service account used only for exports from the new sink. For more information, see writer_identity in LogSink.
         */
        uniqueWriterIdentity?: boolean;
        /**
         * Request body metadata
         */
        requestBody?: Schema$LogSink;
    }
    export interface Params$Resource$Billingaccounts$Sinks$Delete extends StandardParameters {
        /**
         * Required. The full resource name of the sink to delete, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" Example: "projects/my-project-id/sinks/my-sink-id".
         */
        sinkName?: string;
    }
    export interface Params$Resource$Billingaccounts$Sinks$Get extends StandardParameters {
        /**
         * Required. The resource name of the sink: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" Example: "projects/my-project-id/sinks/my-sink-id".
         */
        sinkName?: string;
    }
    export interface Params$Resource$Billingaccounts$Sinks$List extends StandardParameters {
        /**
         * Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         */
        pageSize?: number;
        /**
         * Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         */
        pageToken?: string;
        /**
         * Required. The parent resource whose sinks are to be listed: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]"
         */
        parent?: string;
    }
    export interface Params$Resource$Billingaccounts$Sinks$Patch extends StandardParameters {
        /**
         * Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" Example: "projects/my-project-id/sinks/my-sink-id".
         */
        sinkName?: string;
        /**
         * Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field: If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity. If the old value is false and the new value is true, then writer_identity is changed to a unique service account. It is an error if the old value is true and the new value is set to false or defaulted to false.
         */
        uniqueWriterIdentity?: boolean;
        /**
         * Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:  destination,filter,includeChildren At some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=filter.
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$LogSink;
    }
    export interface Params$Resource$Billingaccounts$Sinks$Update extends StandardParameters {
        /**
         * Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" Example: "projects/my-project-id/sinks/my-sink-id".
         */
        sinkName?: string;
        /**
         * Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field: If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity. If the old value is false and the new value is true, then writer_identity is changed to a unique service account. It is an error if the old value is true and the new value is set to false or defaulted to false.
         */
        uniqueWriterIdentity?: boolean;
        /**
         * Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:  destination,filter,includeChildren At some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=filter.
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$LogSink;
    }
    export class Resource$Entries {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * logging.entries.list
         * @desc Lists log entries. Use this method to retrieve log entries that originated from a project/folder/organization/billing account. For ways to export log entries, see Exporting Logs (https://cloud.google.com/logging/docs/export).
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.entries.list({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "filter": "my_filter",
         *       //   "orderBy": "my_orderBy",
         *       //   "pageSize": 0,
         *       //   "pageToken": "my_pageToken",
         *       //   "projectIds": [],
         *       //   "resourceNames": []
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "entries": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.entries.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().ListLogEntriesRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Entries$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Entries$List, options?: MethodOptions): GaxiosPromise<Schema$ListLogEntriesResponse>;
        list(params: Params$Resource$Entries$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Entries$List, options: MethodOptions | BodyResponseCallback<Schema$ListLogEntriesResponse>, callback: BodyResponseCallback<Schema$ListLogEntriesResponse>): void;
        list(params: Params$Resource$Entries$List, callback: BodyResponseCallback<Schema$ListLogEntriesResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListLogEntriesResponse>): void;
        /**
         * logging.entries.write
         * @desc Writes log entries to Logging. This API method is the only way to send log entries to Logging. This method is used, directly or indirectly, by the Logging agent (fluentd) and all logging libraries configured to use Logging. A single request may contain log entries for a maximum of 1000 different resources (projects, organizations, billing accounts or folders)
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.write',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.entries.write({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "dryRun": false,
         *       //   "entries": [],
         *       //   "labels": {},
         *       //   "logName": "my_logName",
         *       //   "partialSuccess": false,
         *       //   "resource": {}
         *       // }
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
         * @alias logging.entries.write
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().WriteLogEntriesRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        write(params: Params$Resource$Entries$Write, options: StreamMethodOptions): GaxiosPromise<Readable>;
        write(params?: Params$Resource$Entries$Write, options?: MethodOptions): GaxiosPromise<Schema$WriteLogEntriesResponse>;
        write(params: Params$Resource$Entries$Write, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        write(params: Params$Resource$Entries$Write, options: MethodOptions | BodyResponseCallback<Schema$WriteLogEntriesResponse>, callback: BodyResponseCallback<Schema$WriteLogEntriesResponse>): void;
        write(params: Params$Resource$Entries$Write, callback: BodyResponseCallback<Schema$WriteLogEntriesResponse>): void;
        write(callback: BodyResponseCallback<Schema$WriteLogEntriesResponse>): void;
    }
    export interface Params$Resource$Entries$List extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$ListLogEntriesRequest;
    }
    export interface Params$Resource$Entries$Write extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$WriteLogEntriesRequest;
    }
    export class Resource$Exclusions {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * logging.exclusions.create
         * @desc Creates a new exclusion in a specified parent resource. Only log entries belonging to that resource can be excluded. You can have up to 10 exclusions in a resource.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.exclusions.create({
         *     // Required. The parent resource in which to create the exclusion:
         *     // "projects/[PROJECT_ID]"
         *     // "organizations/[ORGANIZATION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]"
         *     // "folders/[FOLDER_ID]"
         *     // Examples: "projects/my-logging-project", "organizations/123456789".
         *     parent: '[^/]+/[^/]+',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "createTime": "my_createTime",
         *       //   "description": "my_description",
         *       //   "disabled": false,
         *       //   "filter": "my_filter",
         *       //   "name": "my_name",
         *       //   "updateTime": "my_updateTime"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "disabled": false,
         *   //   "filter": "my_filter",
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
         * @alias logging.exclusions.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent Required. The parent resource in which to create the exclusion: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" Examples: "projects/my-logging-project", "organizations/123456789".
         * @param {().LogExclusion} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Exclusions$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Exclusions$Create, options?: MethodOptions): GaxiosPromise<Schema$LogExclusion>;
        create(params: Params$Resource$Exclusions$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Exclusions$Create, options: MethodOptions | BodyResponseCallback<Schema$LogExclusion>, callback: BodyResponseCallback<Schema$LogExclusion>): void;
        create(params: Params$Resource$Exclusions$Create, callback: BodyResponseCallback<Schema$LogExclusion>): void;
        create(callback: BodyResponseCallback<Schema$LogExclusion>): void;
        /**
         * logging.exclusions.delete
         * @desc Deletes an exclusion.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.exclusions.delete({
         *     // Required. The resource name of an existing exclusion to delete:
         *     // "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]"
         *     // "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]"
         *     // "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]"
         *     // Example: "projects/my-project-id/exclusions/my-exclusion-id".
         *     name: '[^/]+/[^/]+/exclusions/my-exclusion',
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
         * @alias logging.exclusions.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of an existing exclusion to delete: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" Example: "projects/my-project-id/exclusions/my-exclusion-id".
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Exclusions$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Exclusions$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Exclusions$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Exclusions$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Exclusions$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * logging.exclusions.get
         * @desc Gets the description of an exclusion.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.exclusions.get({
         *     // Required. The resource name of an existing exclusion:
         *     // "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]"
         *     // "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]"
         *     // "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]"
         *     // Example: "projects/my-project-id/exclusions/my-exclusion-id".
         *     name: '[^/]+/[^/]+/exclusions/my-exclusion',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "disabled": false,
         *   //   "filter": "my_filter",
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
         * @alias logging.exclusions.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of an existing exclusion: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" Example: "projects/my-project-id/exclusions/my-exclusion-id".
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Exclusions$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Exclusions$Get, options?: MethodOptions): GaxiosPromise<Schema$LogExclusion>;
        get(params: Params$Resource$Exclusions$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Exclusions$Get, options: MethodOptions | BodyResponseCallback<Schema$LogExclusion>, callback: BodyResponseCallback<Schema$LogExclusion>): void;
        get(params: Params$Resource$Exclusions$Get, callback: BodyResponseCallback<Schema$LogExclusion>): void;
        get(callback: BodyResponseCallback<Schema$LogExclusion>): void;
        /**
         * logging.exclusions.list
         * @desc Lists all the exclusions in a parent resource.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.exclusions.list({
         *     // Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         *     pageSize: 'placeholder-value',
         *     // Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         *     pageToken: 'placeholder-value',
         *     // Required. The parent resource whose exclusions are to be listed.
         *     // "projects/[PROJECT_ID]"
         *     // "organizations/[ORGANIZATION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]"
         *     // "folders/[FOLDER_ID]"
         *     //
         *     parent: '[^/]+/[^/]+',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "exclusions": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.exclusions.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         * @param {string=} params.pageToken Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         * @param {string} params.parent Required. The parent resource whose exclusions are to be listed. "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]"
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Exclusions$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Exclusions$List, options?: MethodOptions): GaxiosPromise<Schema$ListExclusionsResponse>;
        list(params: Params$Resource$Exclusions$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Exclusions$List, options: MethodOptions | BodyResponseCallback<Schema$ListExclusionsResponse>, callback: BodyResponseCallback<Schema$ListExclusionsResponse>): void;
        list(params: Params$Resource$Exclusions$List, callback: BodyResponseCallback<Schema$ListExclusionsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListExclusionsResponse>): void;
        /**
         * logging.exclusions.patch
         * @desc Changes one or more properties of an existing exclusion.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.exclusions.patch({
         *     // Required. The resource name of the exclusion to update:
         *     // "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]"
         *     // "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]"
         *     // "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]"
         *     // Example: "projects/my-project-id/exclusions/my-exclusion-id".
         *     name: '[^/]+/[^/]+/exclusions/my-exclusion',
         *     // Required. A non-empty list of fields to change in the existing exclusion. New values for the fields are taken from the corresponding fields in the LogExclusion included in this request. Fields not mentioned in update_mask are not changed and are ignored in the request.For example, to change the filter and description of an exclusion, specify an update_mask of "filter,description".
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "createTime": "my_createTime",
         *       //   "description": "my_description",
         *       //   "disabled": false,
         *       //   "filter": "my_filter",
         *       //   "name": "my_name",
         *       //   "updateTime": "my_updateTime"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "disabled": false,
         *   //   "filter": "my_filter",
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
         * @alias logging.exclusions.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the exclusion to update: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" Example: "projects/my-project-id/exclusions/my-exclusion-id".
         * @param {string=} params.updateMask Required. A non-empty list of fields to change in the existing exclusion. New values for the fields are taken from the corresponding fields in the LogExclusion included in this request. Fields not mentioned in update_mask are not changed and are ignored in the request.For example, to change the filter and description of an exclusion, specify an update_mask of "filter,description".
         * @param {().LogExclusion} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Exclusions$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Exclusions$Patch, options?: MethodOptions): GaxiosPromise<Schema$LogExclusion>;
        patch(params: Params$Resource$Exclusions$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Exclusions$Patch, options: MethodOptions | BodyResponseCallback<Schema$LogExclusion>, callback: BodyResponseCallback<Schema$LogExclusion>): void;
        patch(params: Params$Resource$Exclusions$Patch, callback: BodyResponseCallback<Schema$LogExclusion>): void;
        patch(callback: BodyResponseCallback<Schema$LogExclusion>): void;
    }
    export interface Params$Resource$Exclusions$Create extends StandardParameters {
        /**
         * Required. The parent resource in which to create the exclusion: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" Examples: "projects/my-logging-project", "organizations/123456789".
         */
        parent?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$LogExclusion;
    }
    export interface Params$Resource$Exclusions$Delete extends StandardParameters {
        /**
         * Required. The resource name of an existing exclusion to delete: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" Example: "projects/my-project-id/exclusions/my-exclusion-id".
         */
        name?: string;
    }
    export interface Params$Resource$Exclusions$Get extends StandardParameters {
        /**
         * Required. The resource name of an existing exclusion: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" Example: "projects/my-project-id/exclusions/my-exclusion-id".
         */
        name?: string;
    }
    export interface Params$Resource$Exclusions$List extends StandardParameters {
        /**
         * Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         */
        pageSize?: number;
        /**
         * Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         */
        pageToken?: string;
        /**
         * Required. The parent resource whose exclusions are to be listed. "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]"
         */
        parent?: string;
    }
    export interface Params$Resource$Exclusions$Patch extends StandardParameters {
        /**
         * Required. The resource name of the exclusion to update: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" Example: "projects/my-project-id/exclusions/my-exclusion-id".
         */
        name?: string;
        /**
         * Required. A non-empty list of fields to change in the existing exclusion. New values for the fields are taken from the corresponding fields in the LogExclusion included in this request. Fields not mentioned in update_mask are not changed and are ignored in the request.For example, to change the filter and description of an exclusion, specify an update_mask of "filter,description".
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$LogExclusion;
    }
    export class Resource$Folders {
        context: APIRequestContext;
        exclusions: Resource$Folders$Exclusions;
        locations: Resource$Folders$Locations;
        logs: Resource$Folders$Logs;
        sinks: Resource$Folders$Sinks;
        constructor(context: APIRequestContext);
    }
    export class Resource$Folders$Exclusions {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * logging.folders.exclusions.create
         * @desc Creates a new exclusion in a specified parent resource. Only log entries belonging to that resource can be excluded. You can have up to 10 exclusions in a resource.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.folders.exclusions.create({
         *     // Required. The parent resource in which to create the exclusion:
         *     // "projects/[PROJECT_ID]"
         *     // "organizations/[ORGANIZATION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]"
         *     // "folders/[FOLDER_ID]"
         *     // Examples: "projects/my-logging-project", "organizations/123456789".
         *     parent: 'folders/my-folder',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "createTime": "my_createTime",
         *       //   "description": "my_description",
         *       //   "disabled": false,
         *       //   "filter": "my_filter",
         *       //   "name": "my_name",
         *       //   "updateTime": "my_updateTime"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "disabled": false,
         *   //   "filter": "my_filter",
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
         * @alias logging.folders.exclusions.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent Required. The parent resource in which to create the exclusion: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" Examples: "projects/my-logging-project", "organizations/123456789".
         * @param {().LogExclusion} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Folders$Exclusions$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Folders$Exclusions$Create, options?: MethodOptions): GaxiosPromise<Schema$LogExclusion>;
        create(params: Params$Resource$Folders$Exclusions$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Folders$Exclusions$Create, options: MethodOptions | BodyResponseCallback<Schema$LogExclusion>, callback: BodyResponseCallback<Schema$LogExclusion>): void;
        create(params: Params$Resource$Folders$Exclusions$Create, callback: BodyResponseCallback<Schema$LogExclusion>): void;
        create(callback: BodyResponseCallback<Schema$LogExclusion>): void;
        /**
         * logging.folders.exclusions.delete
         * @desc Deletes an exclusion.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.folders.exclusions.delete({
         *     // Required. The resource name of an existing exclusion to delete:
         *     // "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]"
         *     // "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]"
         *     // "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]"
         *     // Example: "projects/my-project-id/exclusions/my-exclusion-id".
         *     name: 'folders/my-folder/exclusions/my-exclusion',
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
         * @alias logging.folders.exclusions.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of an existing exclusion to delete: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" Example: "projects/my-project-id/exclusions/my-exclusion-id".
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Folders$Exclusions$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Folders$Exclusions$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Folders$Exclusions$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Folders$Exclusions$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Folders$Exclusions$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * logging.folders.exclusions.get
         * @desc Gets the description of an exclusion.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.folders.exclusions.get({
         *     // Required. The resource name of an existing exclusion:
         *     // "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]"
         *     // "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]"
         *     // "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]"
         *     // Example: "projects/my-project-id/exclusions/my-exclusion-id".
         *     name: 'folders/my-folder/exclusions/my-exclusion',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "disabled": false,
         *   //   "filter": "my_filter",
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
         * @alias logging.folders.exclusions.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of an existing exclusion: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" Example: "projects/my-project-id/exclusions/my-exclusion-id".
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Folders$Exclusions$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Folders$Exclusions$Get, options?: MethodOptions): GaxiosPromise<Schema$LogExclusion>;
        get(params: Params$Resource$Folders$Exclusions$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Folders$Exclusions$Get, options: MethodOptions | BodyResponseCallback<Schema$LogExclusion>, callback: BodyResponseCallback<Schema$LogExclusion>): void;
        get(params: Params$Resource$Folders$Exclusions$Get, callback: BodyResponseCallback<Schema$LogExclusion>): void;
        get(callback: BodyResponseCallback<Schema$LogExclusion>): void;
        /**
         * logging.folders.exclusions.list
         * @desc Lists all the exclusions in a parent resource.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.folders.exclusions.list({
         *     // Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         *     pageSize: 'placeholder-value',
         *     // Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         *     pageToken: 'placeholder-value',
         *     // Required. The parent resource whose exclusions are to be listed.
         *     // "projects/[PROJECT_ID]"
         *     // "organizations/[ORGANIZATION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]"
         *     // "folders/[FOLDER_ID]"
         *     //
         *     parent: 'folders/my-folder',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "exclusions": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.folders.exclusions.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         * @param {string=} params.pageToken Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         * @param {string} params.parent Required. The parent resource whose exclusions are to be listed. "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]"
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Folders$Exclusions$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Folders$Exclusions$List, options?: MethodOptions): GaxiosPromise<Schema$ListExclusionsResponse>;
        list(params: Params$Resource$Folders$Exclusions$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Folders$Exclusions$List, options: MethodOptions | BodyResponseCallback<Schema$ListExclusionsResponse>, callback: BodyResponseCallback<Schema$ListExclusionsResponse>): void;
        list(params: Params$Resource$Folders$Exclusions$List, callback: BodyResponseCallback<Schema$ListExclusionsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListExclusionsResponse>): void;
        /**
         * logging.folders.exclusions.patch
         * @desc Changes one or more properties of an existing exclusion.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.folders.exclusions.patch({
         *     // Required. The resource name of the exclusion to update:
         *     // "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]"
         *     // "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]"
         *     // "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]"
         *     // Example: "projects/my-project-id/exclusions/my-exclusion-id".
         *     name: 'folders/my-folder/exclusions/my-exclusion',
         *     // Required. A non-empty list of fields to change in the existing exclusion. New values for the fields are taken from the corresponding fields in the LogExclusion included in this request. Fields not mentioned in update_mask are not changed and are ignored in the request.For example, to change the filter and description of an exclusion, specify an update_mask of "filter,description".
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "createTime": "my_createTime",
         *       //   "description": "my_description",
         *       //   "disabled": false,
         *       //   "filter": "my_filter",
         *       //   "name": "my_name",
         *       //   "updateTime": "my_updateTime"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "disabled": false,
         *   //   "filter": "my_filter",
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
         * @alias logging.folders.exclusions.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the exclusion to update: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" Example: "projects/my-project-id/exclusions/my-exclusion-id".
         * @param {string=} params.updateMask Required. A non-empty list of fields to change in the existing exclusion. New values for the fields are taken from the corresponding fields in the LogExclusion included in this request. Fields not mentioned in update_mask are not changed and are ignored in the request.For example, to change the filter and description of an exclusion, specify an update_mask of "filter,description".
         * @param {().LogExclusion} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Folders$Exclusions$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Folders$Exclusions$Patch, options?: MethodOptions): GaxiosPromise<Schema$LogExclusion>;
        patch(params: Params$Resource$Folders$Exclusions$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Folders$Exclusions$Patch, options: MethodOptions | BodyResponseCallback<Schema$LogExclusion>, callback: BodyResponseCallback<Schema$LogExclusion>): void;
        patch(params: Params$Resource$Folders$Exclusions$Patch, callback: BodyResponseCallback<Schema$LogExclusion>): void;
        patch(callback: BodyResponseCallback<Schema$LogExclusion>): void;
    }
    export interface Params$Resource$Folders$Exclusions$Create extends StandardParameters {
        /**
         * Required. The parent resource in which to create the exclusion: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" Examples: "projects/my-logging-project", "organizations/123456789".
         */
        parent?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$LogExclusion;
    }
    export interface Params$Resource$Folders$Exclusions$Delete extends StandardParameters {
        /**
         * Required. The resource name of an existing exclusion to delete: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" Example: "projects/my-project-id/exclusions/my-exclusion-id".
         */
        name?: string;
    }
    export interface Params$Resource$Folders$Exclusions$Get extends StandardParameters {
        /**
         * Required. The resource name of an existing exclusion: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" Example: "projects/my-project-id/exclusions/my-exclusion-id".
         */
        name?: string;
    }
    export interface Params$Resource$Folders$Exclusions$List extends StandardParameters {
        /**
         * Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         */
        pageSize?: number;
        /**
         * Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         */
        pageToken?: string;
        /**
         * Required. The parent resource whose exclusions are to be listed. "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]"
         */
        parent?: string;
    }
    export interface Params$Resource$Folders$Exclusions$Patch extends StandardParameters {
        /**
         * Required. The resource name of the exclusion to update: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" Example: "projects/my-project-id/exclusions/my-exclusion-id".
         */
        name?: string;
        /**
         * Required. A non-empty list of fields to change in the existing exclusion. New values for the fields are taken from the corresponding fields in the LogExclusion included in this request. Fields not mentioned in update_mask are not changed and are ignored in the request.For example, to change the filter and description of an exclusion, specify an update_mask of "filter,description".
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$LogExclusion;
    }
    export class Resource$Folders$Locations {
        context: APIRequestContext;
        buckets: Resource$Folders$Locations$Buckets;
        constructor(context: APIRequestContext);
    }
    export class Resource$Folders$Locations$Buckets {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * logging.folders.locations.buckets.get
         * @desc Gets a bucket (Beta).
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.folders.locations.buckets.get({
         *     // Required. The resource name of the bucket:
         *     // "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // Example: "projects/my-project-id/locations/my-location/buckets/my-bucket-id".
         *     name: 'folders/my-folder/locations/my-location/buckets/my-bucket',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "lifecycleState": "my_lifecycleState",
         *   //   "name": "my_name",
         *   //   "retentionDays": 0,
         *   //   "updateTime": "my_updateTime"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.folders.locations.buckets.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" Example: "projects/my-project-id/locations/my-location/buckets/my-bucket-id".
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Folders$Locations$Buckets$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Folders$Locations$Buckets$Get, options?: MethodOptions): GaxiosPromise<Schema$LogBucket>;
        get(params: Params$Resource$Folders$Locations$Buckets$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Folders$Locations$Buckets$Get, options: MethodOptions | BodyResponseCallback<Schema$LogBucket>, callback: BodyResponseCallback<Schema$LogBucket>): void;
        get(params: Params$Resource$Folders$Locations$Buckets$Get, callback: BodyResponseCallback<Schema$LogBucket>): void;
        get(callback: BodyResponseCallback<Schema$LogBucket>): void;
        /**
         * logging.folders.locations.buckets.list
         * @desc Lists buckets (Beta).
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.folders.locations.buckets.list({
         *     // Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         *     pageSize: 'placeholder-value',
         *     // Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         *     pageToken: 'placeholder-value',
         *     // Required. The parent resource whose buckets are to be listed:
         *     // "projects/[PROJECT_ID]/locations/[LOCATION_ID]"
         *     // "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]"
         *     // "folders/[FOLDER_ID]/locations/[LOCATION_ID]"
         *     // Note: The locations portion of the resource must be specified, but supplying the character - in place of LOCATION_ID will return all buckets.
         *     parent: 'folders/my-folder/locations/my-location',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "buckets": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.folders.locations.buckets.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         * @param {string=} params.pageToken Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         * @param {string} params.parent Required. The parent resource whose buckets are to be listed: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" Note: The locations portion of the resource must be specified, but supplying the character - in place of LOCATION_ID will return all buckets.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Folders$Locations$Buckets$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Folders$Locations$Buckets$List, options?: MethodOptions): GaxiosPromise<Schema$ListBucketsResponse>;
        list(params: Params$Resource$Folders$Locations$Buckets$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Folders$Locations$Buckets$List, options: MethodOptions | BodyResponseCallback<Schema$ListBucketsResponse>, callback: BodyResponseCallback<Schema$ListBucketsResponse>): void;
        list(params: Params$Resource$Folders$Locations$Buckets$List, callback: BodyResponseCallback<Schema$ListBucketsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListBucketsResponse>): void;
        /**
         * logging.folders.locations.buckets.patch
         * @desc Updates a bucket. This method replaces the following fields in the existing bucket with values from the new bucket: retention_periodIf the retention period is decreased and the bucket is locked, FAILED_PRECONDITION will be returned.If the bucket has a LifecycleState of DELETE_REQUESTED, FAILED_PRECONDITION will be returned.A buckets region may not be modified after it is created. This method is in Beta.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.folders.locations.buckets.patch({
         *     // Required. The full resource name of the bucket to update.
         *     // "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // Example: "projects/my-project-id/locations/my-location/buckets/my-bucket-id". Also requires permission "resourcemanager.projects.updateLiens" to set the locked property
         *     name: 'folders/my-folder/locations/my-location/buckets/my-bucket',
         *     // Required. Field mask that specifies the fields in bucket that need an update. A bucket field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=retention_days.
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "createTime": "my_createTime",
         *       //   "description": "my_description",
         *       //   "lifecycleState": "my_lifecycleState",
         *       //   "name": "my_name",
         *       //   "retentionDays": 0,
         *       //   "updateTime": "my_updateTime"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "lifecycleState": "my_lifecycleState",
         *   //   "name": "my_name",
         *   //   "retentionDays": 0,
         *   //   "updateTime": "my_updateTime"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.folders.locations.buckets.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The full resource name of the bucket to update. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" Example: "projects/my-project-id/locations/my-location/buckets/my-bucket-id". Also requires permission "resourcemanager.projects.updateLiens" to set the locked property
         * @param {string=} params.updateMask Required. Field mask that specifies the fields in bucket that need an update. A bucket field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=retention_days.
         * @param {().LogBucket} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Folders$Locations$Buckets$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Folders$Locations$Buckets$Patch, options?: MethodOptions): GaxiosPromise<Schema$LogBucket>;
        patch(params: Params$Resource$Folders$Locations$Buckets$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Folders$Locations$Buckets$Patch, options: MethodOptions | BodyResponseCallback<Schema$LogBucket>, callback: BodyResponseCallback<Schema$LogBucket>): void;
        patch(params: Params$Resource$Folders$Locations$Buckets$Patch, callback: BodyResponseCallback<Schema$LogBucket>): void;
        patch(callback: BodyResponseCallback<Schema$LogBucket>): void;
    }
    export interface Params$Resource$Folders$Locations$Buckets$Get extends StandardParameters {
        /**
         * Required. The resource name of the bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" Example: "projects/my-project-id/locations/my-location/buckets/my-bucket-id".
         */
        name?: string;
    }
    export interface Params$Resource$Folders$Locations$Buckets$List extends StandardParameters {
        /**
         * Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         */
        pageSize?: number;
        /**
         * Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         */
        pageToken?: string;
        /**
         * Required. The parent resource whose buckets are to be listed: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" Note: The locations portion of the resource must be specified, but supplying the character - in place of LOCATION_ID will return all buckets.
         */
        parent?: string;
    }
    export interface Params$Resource$Folders$Locations$Buckets$Patch extends StandardParameters {
        /**
         * Required. The full resource name of the bucket to update. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" Example: "projects/my-project-id/locations/my-location/buckets/my-bucket-id". Also requires permission "resourcemanager.projects.updateLiens" to set the locked property
         */
        name?: string;
        /**
         * Required. Field mask that specifies the fields in bucket that need an update. A bucket field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=retention_days.
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$LogBucket;
    }
    export class Resource$Folders$Logs {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * logging.folders.logs.delete
         * @desc Deletes all the log entries in a log. The log reappears if it receives new entries. Log entries written shortly before the delete operation might not be deleted. Entries received after the delete operation with a timestamp before the operation will be deleted.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.folders.logs.delete({
         *     // Required. The resource name of the log to delete:
         *     // "projects/[PROJECT_ID]/logs/[LOG_ID]"
         *     // "organizations/[ORGANIZATION_ID]/logs/[LOG_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/logs/[LOG_ID]"
         *     // "folders/[FOLDER_ID]/logs/[LOG_ID]"
         *     // [LOG_ID] must be URL-encoded. For example, "projects/my-project-id/logs/syslog", "organizations/1234567890/logs/cloudresourcemanager.googleapis.com%2Factivity". For more information about log names, see LogEntry.
         *     logName: 'folders/my-folder/logs/my-log',
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
         * @alias logging.folders.logs.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.logName Required. The resource name of the log to delete: "projects/[PROJECT_ID]/logs/[LOG_ID]" "organizations/[ORGANIZATION_ID]/logs/[LOG_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/logs/[LOG_ID]" "folders/[FOLDER_ID]/logs/[LOG_ID]" [LOG_ID] must be URL-encoded. For example, "projects/my-project-id/logs/syslog", "organizations/1234567890/logs/cloudresourcemanager.googleapis.com%2Factivity". For more information about log names, see LogEntry.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Folders$Logs$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Folders$Logs$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Folders$Logs$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Folders$Logs$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Folders$Logs$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * logging.folders.logs.list
         * @desc Lists the logs in projects, organizations, folders, or billing accounts. Only logs that have entries are listed.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.folders.logs.list({
         *     // Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         *     pageSize: 'placeholder-value',
         *     // Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         *     pageToken: 'placeholder-value',
         *     // Required. The resource name that owns the logs:
         *     // "projects/[PROJECT_ID]"
         *     // "organizations/[ORGANIZATION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]"
         *     // "folders/[FOLDER_ID]"
         *     //
         *     parent: 'folders/my-folder',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "logNames": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.folders.logs.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         * @param {string=} params.pageToken Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         * @param {string} params.parent Required. The resource name that owns the logs: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]"
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Folders$Logs$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Folders$Logs$List, options?: MethodOptions): GaxiosPromise<Schema$ListLogsResponse>;
        list(params: Params$Resource$Folders$Logs$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Folders$Logs$List, options: MethodOptions | BodyResponseCallback<Schema$ListLogsResponse>, callback: BodyResponseCallback<Schema$ListLogsResponse>): void;
        list(params: Params$Resource$Folders$Logs$List, callback: BodyResponseCallback<Schema$ListLogsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListLogsResponse>): void;
    }
    export interface Params$Resource$Folders$Logs$Delete extends StandardParameters {
        /**
         * Required. The resource name of the log to delete: "projects/[PROJECT_ID]/logs/[LOG_ID]" "organizations/[ORGANIZATION_ID]/logs/[LOG_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/logs/[LOG_ID]" "folders/[FOLDER_ID]/logs/[LOG_ID]" [LOG_ID] must be URL-encoded. For example, "projects/my-project-id/logs/syslog", "organizations/1234567890/logs/cloudresourcemanager.googleapis.com%2Factivity". For more information about log names, see LogEntry.
         */
        logName?: string;
    }
    export interface Params$Resource$Folders$Logs$List extends StandardParameters {
        /**
         * Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         */
        pageSize?: number;
        /**
         * Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         */
        pageToken?: string;
        /**
         * Required. The resource name that owns the logs: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]"
         */
        parent?: string;
    }
    export class Resource$Folders$Sinks {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * logging.folders.sinks.create
         * @desc Creates a sink that exports specified log entries to a destination. The export of newly-ingested log entries begins immediately, unless the sink's writer_identity is not permitted to write to the destination. A sink can export log entries only from the resource owning the sink.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.folders.sinks.create({
         *     // Required. The resource in which to create the sink:
         *     // "projects/[PROJECT_ID]"
         *     // "organizations/[ORGANIZATION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]"
         *     // "folders/[FOLDER_ID]"
         *     // Examples: "projects/my-logging-project", "organizations/123456789".
         *     parent: 'folders/my-folder',
         *     // Optional. Determines the kind of IAM identity returned as writer_identity in the new sink. If this value is omitted or set to false, and if the sink's parent is a project, then the value returned as writer_identity is the same group or service account used by Logging before the addition of writer identities to this API. The sink's destination must be in the same project as the sink itself.If this field is set to true, or if the sink is owned by a non-project resource such as an organization, then the value of writer_identity will be a unique service account used only for exports from the new sink. For more information, see writer_identity in LogSink.
         *     uniqueWriterIdentity: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "bigqueryOptions": {},
         *       //   "createTime": "my_createTime",
         *       //   "description": "my_description",
         *       //   "destination": "my_destination",
         *       //   "disabled": false,
         *       //   "filter": "my_filter",
         *       //   "includeChildren": false,
         *       //   "name": "my_name",
         *       //   "outputVersionFormat": "my_outputVersionFormat",
         *       //   "updateTime": "my_updateTime",
         *       //   "writerIdentity": "my_writerIdentity"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bigqueryOptions": {},
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "destination": "my_destination",
         *   //   "disabled": false,
         *   //   "filter": "my_filter",
         *   //   "includeChildren": false,
         *   //   "name": "my_name",
         *   //   "outputVersionFormat": "my_outputVersionFormat",
         *   //   "updateTime": "my_updateTime",
         *   //   "writerIdentity": "my_writerIdentity"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.folders.sinks.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent Required. The resource in which to create the sink: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" Examples: "projects/my-logging-project", "organizations/123456789".
         * @param {boolean=} params.uniqueWriterIdentity Optional. Determines the kind of IAM identity returned as writer_identity in the new sink. If this value is omitted or set to false, and if the sink's parent is a project, then the value returned as writer_identity is the same group or service account used by Logging before the addition of writer identities to this API. The sink's destination must be in the same project as the sink itself.If this field is set to true, or if the sink is owned by a non-project resource such as an organization, then the value of writer_identity will be a unique service account used only for exports from the new sink. For more information, see writer_identity in LogSink.
         * @param {().LogSink} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Folders$Sinks$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Folders$Sinks$Create, options?: MethodOptions): GaxiosPromise<Schema$LogSink>;
        create(params: Params$Resource$Folders$Sinks$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Folders$Sinks$Create, options: MethodOptions | BodyResponseCallback<Schema$LogSink>, callback: BodyResponseCallback<Schema$LogSink>): void;
        create(params: Params$Resource$Folders$Sinks$Create, callback: BodyResponseCallback<Schema$LogSink>): void;
        create(callback: BodyResponseCallback<Schema$LogSink>): void;
        /**
         * logging.folders.sinks.delete
         * @desc Deletes a sink. If the sink has a unique writer_identity, then that service account is also deleted.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.folders.sinks.delete({
         *     // Required. The full resource name of the sink to delete, including the parent resource and the sink identifier:
         *     // "projects/[PROJECT_ID]/sinks/[SINK_ID]"
         *     // "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]"
         *     // "folders/[FOLDER_ID]/sinks/[SINK_ID]"
         *     // Example: "projects/my-project-id/sinks/my-sink-id".
         *     sinkName: 'folders/my-folder/sinks/my-sink',
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
         * @alias logging.folders.sinks.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.sinkName Required. The full resource name of the sink to delete, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" Example: "projects/my-project-id/sinks/my-sink-id".
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Folders$Sinks$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Folders$Sinks$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Folders$Sinks$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Folders$Sinks$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Folders$Sinks$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * logging.folders.sinks.get
         * @desc Gets a sink.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.folders.sinks.get({
         *     // Required. The resource name of the sink:
         *     // "projects/[PROJECT_ID]/sinks/[SINK_ID]"
         *     // "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]"
         *     // "folders/[FOLDER_ID]/sinks/[SINK_ID]"
         *     // Example: "projects/my-project-id/sinks/my-sink-id".
         *     sinkName: 'folders/my-folder/sinks/my-sink',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bigqueryOptions": {},
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "destination": "my_destination",
         *   //   "disabled": false,
         *   //   "filter": "my_filter",
         *   //   "includeChildren": false,
         *   //   "name": "my_name",
         *   //   "outputVersionFormat": "my_outputVersionFormat",
         *   //   "updateTime": "my_updateTime",
         *   //   "writerIdentity": "my_writerIdentity"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.folders.sinks.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.sinkName Required. The resource name of the sink: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" Example: "projects/my-project-id/sinks/my-sink-id".
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Folders$Sinks$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Folders$Sinks$Get, options?: MethodOptions): GaxiosPromise<Schema$LogSink>;
        get(params: Params$Resource$Folders$Sinks$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Folders$Sinks$Get, options: MethodOptions | BodyResponseCallback<Schema$LogSink>, callback: BodyResponseCallback<Schema$LogSink>): void;
        get(params: Params$Resource$Folders$Sinks$Get, callback: BodyResponseCallback<Schema$LogSink>): void;
        get(callback: BodyResponseCallback<Schema$LogSink>): void;
        /**
         * logging.folders.sinks.list
         * @desc Lists sinks.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.folders.sinks.list({
         *     // Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         *     pageSize: 'placeholder-value',
         *     // Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         *     pageToken: 'placeholder-value',
         *     // Required. The parent resource whose sinks are to be listed:
         *     // "projects/[PROJECT_ID]"
         *     // "organizations/[ORGANIZATION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]"
         *     // "folders/[FOLDER_ID]"
         *     //
         *     parent: 'folders/my-folder',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "sinks": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.folders.sinks.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         * @param {string=} params.pageToken Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         * @param {string} params.parent Required. The parent resource whose sinks are to be listed: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]"
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Folders$Sinks$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Folders$Sinks$List, options?: MethodOptions): GaxiosPromise<Schema$ListSinksResponse>;
        list(params: Params$Resource$Folders$Sinks$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Folders$Sinks$List, options: MethodOptions | BodyResponseCallback<Schema$ListSinksResponse>, callback: BodyResponseCallback<Schema$ListSinksResponse>): void;
        list(params: Params$Resource$Folders$Sinks$List, callback: BodyResponseCallback<Schema$ListSinksResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListSinksResponse>): void;
        /**
         * logging.folders.sinks.patch
         * @desc Updates a sink. This method replaces the following fields in the existing sink with values from the new sink: destination, and filter.The updated sink might also have a new writer_identity; see the unique_writer_identity field.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.folders.sinks.patch({
         *     // Required. The full resource name of the sink to update, including the parent resource and the sink identifier:
         *     // "projects/[PROJECT_ID]/sinks/[SINK_ID]"
         *     // "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]"
         *     // "folders/[FOLDER_ID]/sinks/[SINK_ID]"
         *     // Example: "projects/my-project-id/sinks/my-sink-id".
         *     sinkName: 'folders/my-folder/sinks/my-sink',
         *     // Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field:
         *     // If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity.
         *     // If the old value is false and the new value is true, then writer_identity is changed to a unique service account.
         *     // It is an error if the old value is true and the new value is set to false or defaulted to false.
         *     uniqueWriterIdentity: 'placeholder-value',
         *     // Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:  destination,filter,includeChildren At some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=filter.
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "bigqueryOptions": {},
         *       //   "createTime": "my_createTime",
         *       //   "description": "my_description",
         *       //   "destination": "my_destination",
         *       //   "disabled": false,
         *       //   "filter": "my_filter",
         *       //   "includeChildren": false,
         *       //   "name": "my_name",
         *       //   "outputVersionFormat": "my_outputVersionFormat",
         *       //   "updateTime": "my_updateTime",
         *       //   "writerIdentity": "my_writerIdentity"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bigqueryOptions": {},
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "destination": "my_destination",
         *   //   "disabled": false,
         *   //   "filter": "my_filter",
         *   //   "includeChildren": false,
         *   //   "name": "my_name",
         *   //   "outputVersionFormat": "my_outputVersionFormat",
         *   //   "updateTime": "my_updateTime",
         *   //   "writerIdentity": "my_writerIdentity"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.folders.sinks.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.sinkName Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" Example: "projects/my-project-id/sinks/my-sink-id".
         * @param {boolean=} params.uniqueWriterIdentity Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field: If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity. If the old value is false and the new value is true, then writer_identity is changed to a unique service account. It is an error if the old value is true and the new value is set to false or defaulted to false.
         * @param {string=} params.updateMask Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:  destination,filter,includeChildren At some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=filter.
         * @param {().LogSink} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Folders$Sinks$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Folders$Sinks$Patch, options?: MethodOptions): GaxiosPromise<Schema$LogSink>;
        patch(params: Params$Resource$Folders$Sinks$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Folders$Sinks$Patch, options: MethodOptions | BodyResponseCallback<Schema$LogSink>, callback: BodyResponseCallback<Schema$LogSink>): void;
        patch(params: Params$Resource$Folders$Sinks$Patch, callback: BodyResponseCallback<Schema$LogSink>): void;
        patch(callback: BodyResponseCallback<Schema$LogSink>): void;
        /**
         * logging.folders.sinks.update
         * @desc Updates a sink. This method replaces the following fields in the existing sink with values from the new sink: destination, and filter.The updated sink might also have a new writer_identity; see the unique_writer_identity field.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.folders.sinks.update({
         *     // Required. The full resource name of the sink to update, including the parent resource and the sink identifier:
         *     // "projects/[PROJECT_ID]/sinks/[SINK_ID]"
         *     // "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]"
         *     // "folders/[FOLDER_ID]/sinks/[SINK_ID]"
         *     // Example: "projects/my-project-id/sinks/my-sink-id".
         *     sinkName: 'folders/my-folder/sinks/my-sink',
         *     // Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field:
         *     // If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity.
         *     // If the old value is false and the new value is true, then writer_identity is changed to a unique service account.
         *     // It is an error if the old value is true and the new value is set to false or defaulted to false.
         *     uniqueWriterIdentity: 'placeholder-value',
         *     // Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:  destination,filter,includeChildren At some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=filter.
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "bigqueryOptions": {},
         *       //   "createTime": "my_createTime",
         *       //   "description": "my_description",
         *       //   "destination": "my_destination",
         *       //   "disabled": false,
         *       //   "filter": "my_filter",
         *       //   "includeChildren": false,
         *       //   "name": "my_name",
         *       //   "outputVersionFormat": "my_outputVersionFormat",
         *       //   "updateTime": "my_updateTime",
         *       //   "writerIdentity": "my_writerIdentity"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bigqueryOptions": {},
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "destination": "my_destination",
         *   //   "disabled": false,
         *   //   "filter": "my_filter",
         *   //   "includeChildren": false,
         *   //   "name": "my_name",
         *   //   "outputVersionFormat": "my_outputVersionFormat",
         *   //   "updateTime": "my_updateTime",
         *   //   "writerIdentity": "my_writerIdentity"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.folders.sinks.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.sinkName Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" Example: "projects/my-project-id/sinks/my-sink-id".
         * @param {boolean=} params.uniqueWriterIdentity Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field: If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity. If the old value is false and the new value is true, then writer_identity is changed to a unique service account. It is an error if the old value is true and the new value is set to false or defaulted to false.
         * @param {string=} params.updateMask Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:  destination,filter,includeChildren At some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=filter.
         * @param {().LogSink} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Folders$Sinks$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Folders$Sinks$Update, options?: MethodOptions): GaxiosPromise<Schema$LogSink>;
        update(params: Params$Resource$Folders$Sinks$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Folders$Sinks$Update, options: MethodOptions | BodyResponseCallback<Schema$LogSink>, callback: BodyResponseCallback<Schema$LogSink>): void;
        update(params: Params$Resource$Folders$Sinks$Update, callback: BodyResponseCallback<Schema$LogSink>): void;
        update(callback: BodyResponseCallback<Schema$LogSink>): void;
    }
    export interface Params$Resource$Folders$Sinks$Create extends StandardParameters {
        /**
         * Required. The resource in which to create the sink: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" Examples: "projects/my-logging-project", "organizations/123456789".
         */
        parent?: string;
        /**
         * Optional. Determines the kind of IAM identity returned as writer_identity in the new sink. If this value is omitted or set to false, and if the sink's parent is a project, then the value returned as writer_identity is the same group or service account used by Logging before the addition of writer identities to this API. The sink's destination must be in the same project as the sink itself.If this field is set to true, or if the sink is owned by a non-project resource such as an organization, then the value of writer_identity will be a unique service account used only for exports from the new sink. For more information, see writer_identity in LogSink.
         */
        uniqueWriterIdentity?: boolean;
        /**
         * Request body metadata
         */
        requestBody?: Schema$LogSink;
    }
    export interface Params$Resource$Folders$Sinks$Delete extends StandardParameters {
        /**
         * Required. The full resource name of the sink to delete, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" Example: "projects/my-project-id/sinks/my-sink-id".
         */
        sinkName?: string;
    }
    export interface Params$Resource$Folders$Sinks$Get extends StandardParameters {
        /**
         * Required. The resource name of the sink: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" Example: "projects/my-project-id/sinks/my-sink-id".
         */
        sinkName?: string;
    }
    export interface Params$Resource$Folders$Sinks$List extends StandardParameters {
        /**
         * Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         */
        pageSize?: number;
        /**
         * Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         */
        pageToken?: string;
        /**
         * Required. The parent resource whose sinks are to be listed: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]"
         */
        parent?: string;
    }
    export interface Params$Resource$Folders$Sinks$Patch extends StandardParameters {
        /**
         * Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" Example: "projects/my-project-id/sinks/my-sink-id".
         */
        sinkName?: string;
        /**
         * Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field: If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity. If the old value is false and the new value is true, then writer_identity is changed to a unique service account. It is an error if the old value is true and the new value is set to false or defaulted to false.
         */
        uniqueWriterIdentity?: boolean;
        /**
         * Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:  destination,filter,includeChildren At some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=filter.
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$LogSink;
    }
    export interface Params$Resource$Folders$Sinks$Update extends StandardParameters {
        /**
         * Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" Example: "projects/my-project-id/sinks/my-sink-id".
         */
        sinkName?: string;
        /**
         * Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field: If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity. If the old value is false and the new value is true, then writer_identity is changed to a unique service account. It is an error if the old value is true and the new value is set to false or defaulted to false.
         */
        uniqueWriterIdentity?: boolean;
        /**
         * Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:  destination,filter,includeChildren At some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=filter.
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$LogSink;
    }
    export class Resource$Locations {
        context: APIRequestContext;
        buckets: Resource$Locations$Buckets;
        constructor(context: APIRequestContext);
    }
    export class Resource$Locations$Buckets {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * logging.locations.buckets.get
         * @desc Gets a bucket (Beta).
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.locations.buckets.get({
         *     // Required. The resource name of the bucket:
         *     // "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // Example: "projects/my-project-id/locations/my-location/buckets/my-bucket-id".
         *     name: '[^/]+/[^/]+/locations/my-location/buckets/my-bucket',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "lifecycleState": "my_lifecycleState",
         *   //   "name": "my_name",
         *   //   "retentionDays": 0,
         *   //   "updateTime": "my_updateTime"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.locations.buckets.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" Example: "projects/my-project-id/locations/my-location/buckets/my-bucket-id".
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Locations$Buckets$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Locations$Buckets$Get, options?: MethodOptions): GaxiosPromise<Schema$LogBucket>;
        get(params: Params$Resource$Locations$Buckets$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Locations$Buckets$Get, options: MethodOptions | BodyResponseCallback<Schema$LogBucket>, callback: BodyResponseCallback<Schema$LogBucket>): void;
        get(params: Params$Resource$Locations$Buckets$Get, callback: BodyResponseCallback<Schema$LogBucket>): void;
        get(callback: BodyResponseCallback<Schema$LogBucket>): void;
        /**
         * logging.locations.buckets.list
         * @desc Lists buckets (Beta).
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.locations.buckets.list({
         *     // Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         *     pageSize: 'placeholder-value',
         *     // Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         *     pageToken: 'placeholder-value',
         *     // Required. The parent resource whose buckets are to be listed:
         *     // "projects/[PROJECT_ID]/locations/[LOCATION_ID]"
         *     // "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]"
         *     // "folders/[FOLDER_ID]/locations/[LOCATION_ID]"
         *     // Note: The locations portion of the resource must be specified, but supplying the character - in place of LOCATION_ID will return all buckets.
         *     parent: '[^/]+/[^/]+/locations/my-location',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "buckets": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.locations.buckets.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         * @param {string=} params.pageToken Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         * @param {string} params.parent Required. The parent resource whose buckets are to be listed: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" Note: The locations portion of the resource must be specified, but supplying the character - in place of LOCATION_ID will return all buckets.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Locations$Buckets$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Locations$Buckets$List, options?: MethodOptions): GaxiosPromise<Schema$ListBucketsResponse>;
        list(params: Params$Resource$Locations$Buckets$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Locations$Buckets$List, options: MethodOptions | BodyResponseCallback<Schema$ListBucketsResponse>, callback: BodyResponseCallback<Schema$ListBucketsResponse>): void;
        list(params: Params$Resource$Locations$Buckets$List, callback: BodyResponseCallback<Schema$ListBucketsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListBucketsResponse>): void;
        /**
         * logging.locations.buckets.patch
         * @desc Updates a bucket. This method replaces the following fields in the existing bucket with values from the new bucket: retention_periodIf the retention period is decreased and the bucket is locked, FAILED_PRECONDITION will be returned.If the bucket has a LifecycleState of DELETE_REQUESTED, FAILED_PRECONDITION will be returned.A buckets region may not be modified after it is created. This method is in Beta.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.locations.buckets.patch({
         *     // Required. The full resource name of the bucket to update.
         *     // "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // Example: "projects/my-project-id/locations/my-location/buckets/my-bucket-id". Also requires permission "resourcemanager.projects.updateLiens" to set the locked property
         *     name: '[^/]+/[^/]+/locations/my-location/buckets/my-bucket',
         *     // Required. Field mask that specifies the fields in bucket that need an update. A bucket field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=retention_days.
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "createTime": "my_createTime",
         *       //   "description": "my_description",
         *       //   "lifecycleState": "my_lifecycleState",
         *       //   "name": "my_name",
         *       //   "retentionDays": 0,
         *       //   "updateTime": "my_updateTime"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "lifecycleState": "my_lifecycleState",
         *   //   "name": "my_name",
         *   //   "retentionDays": 0,
         *   //   "updateTime": "my_updateTime"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.locations.buckets.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The full resource name of the bucket to update. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" Example: "projects/my-project-id/locations/my-location/buckets/my-bucket-id". Also requires permission "resourcemanager.projects.updateLiens" to set the locked property
         * @param {string=} params.updateMask Required. Field mask that specifies the fields in bucket that need an update. A bucket field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=retention_days.
         * @param {().LogBucket} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Locations$Buckets$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Locations$Buckets$Patch, options?: MethodOptions): GaxiosPromise<Schema$LogBucket>;
        patch(params: Params$Resource$Locations$Buckets$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Locations$Buckets$Patch, options: MethodOptions | BodyResponseCallback<Schema$LogBucket>, callback: BodyResponseCallback<Schema$LogBucket>): void;
        patch(params: Params$Resource$Locations$Buckets$Patch, callback: BodyResponseCallback<Schema$LogBucket>): void;
        patch(callback: BodyResponseCallback<Schema$LogBucket>): void;
    }
    export interface Params$Resource$Locations$Buckets$Get extends StandardParameters {
        /**
         * Required. The resource name of the bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" Example: "projects/my-project-id/locations/my-location/buckets/my-bucket-id".
         */
        name?: string;
    }
    export interface Params$Resource$Locations$Buckets$List extends StandardParameters {
        /**
         * Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         */
        pageSize?: number;
        /**
         * Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         */
        pageToken?: string;
        /**
         * Required. The parent resource whose buckets are to be listed: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" Note: The locations portion of the resource must be specified, but supplying the character - in place of LOCATION_ID will return all buckets.
         */
        parent?: string;
    }
    export interface Params$Resource$Locations$Buckets$Patch extends StandardParameters {
        /**
         * Required. The full resource name of the bucket to update. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" Example: "projects/my-project-id/locations/my-location/buckets/my-bucket-id". Also requires permission "resourcemanager.projects.updateLiens" to set the locked property
         */
        name?: string;
        /**
         * Required. Field mask that specifies the fields in bucket that need an update. A bucket field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=retention_days.
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$LogBucket;
    }
    export class Resource$Logs {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * logging.logs.delete
         * @desc Deletes all the log entries in a log. The log reappears if it receives new entries. Log entries written shortly before the delete operation might not be deleted. Entries received after the delete operation with a timestamp before the operation will be deleted.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.logs.delete({
         *     // Required. The resource name of the log to delete:
         *     // "projects/[PROJECT_ID]/logs/[LOG_ID]"
         *     // "organizations/[ORGANIZATION_ID]/logs/[LOG_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/logs/[LOG_ID]"
         *     // "folders/[FOLDER_ID]/logs/[LOG_ID]"
         *     // [LOG_ID] must be URL-encoded. For example, "projects/my-project-id/logs/syslog", "organizations/1234567890/logs/cloudresourcemanager.googleapis.com%2Factivity". For more information about log names, see LogEntry.
         *     logName: '[^/]+/[^/]+/logs/my-log',
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
         * @alias logging.logs.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.logName Required. The resource name of the log to delete: "projects/[PROJECT_ID]/logs/[LOG_ID]" "organizations/[ORGANIZATION_ID]/logs/[LOG_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/logs/[LOG_ID]" "folders/[FOLDER_ID]/logs/[LOG_ID]" [LOG_ID] must be URL-encoded. For example, "projects/my-project-id/logs/syslog", "organizations/1234567890/logs/cloudresourcemanager.googleapis.com%2Factivity". For more information about log names, see LogEntry.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Logs$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Logs$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Logs$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Logs$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Logs$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * logging.logs.list
         * @desc Lists the logs in projects, organizations, folders, or billing accounts. Only logs that have entries are listed.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.logs.list({
         *     // Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         *     pageSize: 'placeholder-value',
         *     // Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         *     pageToken: 'placeholder-value',
         *     // Required. The resource name that owns the logs:
         *     // "projects/[PROJECT_ID]"
         *     // "organizations/[ORGANIZATION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]"
         *     // "folders/[FOLDER_ID]"
         *     //
         *     parent: '[^/]+/[^/]+',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "logNames": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.logs.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         * @param {string=} params.pageToken Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         * @param {string} params.parent Required. The resource name that owns the logs: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]"
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Logs$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Logs$List, options?: MethodOptions): GaxiosPromise<Schema$ListLogsResponse>;
        list(params: Params$Resource$Logs$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Logs$List, options: MethodOptions | BodyResponseCallback<Schema$ListLogsResponse>, callback: BodyResponseCallback<Schema$ListLogsResponse>): void;
        list(params: Params$Resource$Logs$List, callback: BodyResponseCallback<Schema$ListLogsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListLogsResponse>): void;
    }
    export interface Params$Resource$Logs$Delete extends StandardParameters {
        /**
         * Required. The resource name of the log to delete: "projects/[PROJECT_ID]/logs/[LOG_ID]" "organizations/[ORGANIZATION_ID]/logs/[LOG_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/logs/[LOG_ID]" "folders/[FOLDER_ID]/logs/[LOG_ID]" [LOG_ID] must be URL-encoded. For example, "projects/my-project-id/logs/syslog", "organizations/1234567890/logs/cloudresourcemanager.googleapis.com%2Factivity". For more information about log names, see LogEntry.
         */
        logName?: string;
    }
    export interface Params$Resource$Logs$List extends StandardParameters {
        /**
         * Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         */
        pageSize?: number;
        /**
         * Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         */
        pageToken?: string;
        /**
         * Required. The resource name that owns the logs: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]"
         */
        parent?: string;
    }
    export class Resource$Monitoredresourcedescriptors {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * logging.monitoredResourceDescriptors.list
         * @desc Lists the descriptors for monitored resource types used by Logging.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.monitoredResourceDescriptors.list({
         *     // Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         *     pageSize: 'placeholder-value',
         *     // Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         *     pageToken: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "resourceDescriptors": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.monitoredResourceDescriptors.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         * @param {string=} params.pageToken Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Monitoredresourcedescriptors$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Monitoredresourcedescriptors$List, options?: MethodOptions): GaxiosPromise<Schema$ListMonitoredResourceDescriptorsResponse>;
        list(params: Params$Resource$Monitoredresourcedescriptors$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Monitoredresourcedescriptors$List, options: MethodOptions | BodyResponseCallback<Schema$ListMonitoredResourceDescriptorsResponse>, callback: BodyResponseCallback<Schema$ListMonitoredResourceDescriptorsResponse>): void;
        list(params: Params$Resource$Monitoredresourcedescriptors$List, callback: BodyResponseCallback<Schema$ListMonitoredResourceDescriptorsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListMonitoredResourceDescriptorsResponse>): void;
    }
    export interface Params$Resource$Monitoredresourcedescriptors$List extends StandardParameters {
        /**
         * Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         */
        pageSize?: number;
        /**
         * Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         */
        pageToken?: string;
    }
    export class Resource$Organizations {
        context: APIRequestContext;
        exclusions: Resource$Organizations$Exclusions;
        locations: Resource$Organizations$Locations;
        logs: Resource$Organizations$Logs;
        sinks: Resource$Organizations$Sinks;
        constructor(context: APIRequestContext);
        /**
         * logging.organizations.getCmekSettings
         * @desc Gets the Logs Router CMEK settings for the given resource.Note: CMEK for the Logs Router can currently only be configured for GCP organizations. Once configured, it applies to all projects and folders in the GCP organization.See Enabling CMEK for Logs Router (https://cloud.google.com/logging/docs/routing/managed-encryption) for more information.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.organizations.getCmekSettings({
         *     // Required. The resource for which to retrieve CMEK settings.
         *     // "projects/[PROJECT_ID]/cmekSettings"
         *     // "organizations/[ORGANIZATION_ID]/cmekSettings"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/cmekSettings"
         *     // "folders/[FOLDER_ID]/cmekSettings"
         *     // Example: "organizations/12345/cmekSettings".Note: CMEK for the Logs Router can currently only be configured for GCP organizations. Once configured, it applies to all projects and folders in the GCP organization.
         *     name: 'organizations/my-organization',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "kmsKeyName": "my_kmsKeyName",
         *   //   "name": "my_name",
         *   //   "serviceAccountId": "my_serviceAccountId"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.organizations.getCmekSettings
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource for which to retrieve CMEK settings. "projects/[PROJECT_ID]/cmekSettings" "organizations/[ORGANIZATION_ID]/cmekSettings" "billingAccounts/[BILLING_ACCOUNT_ID]/cmekSettings" "folders/[FOLDER_ID]/cmekSettings" Example: "organizations/12345/cmekSettings".Note: CMEK for the Logs Router can currently only be configured for GCP organizations. Once configured, it applies to all projects and folders in the GCP organization.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getCmekSettings(params: Params$Resource$Organizations$Getcmeksettings, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getCmekSettings(params?: Params$Resource$Organizations$Getcmeksettings, options?: MethodOptions): GaxiosPromise<Schema$CmekSettings>;
        getCmekSettings(params: Params$Resource$Organizations$Getcmeksettings, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getCmekSettings(params: Params$Resource$Organizations$Getcmeksettings, options: MethodOptions | BodyResponseCallback<Schema$CmekSettings>, callback: BodyResponseCallback<Schema$CmekSettings>): void;
        getCmekSettings(params: Params$Resource$Organizations$Getcmeksettings, callback: BodyResponseCallback<Schema$CmekSettings>): void;
        getCmekSettings(callback: BodyResponseCallback<Schema$CmekSettings>): void;
        /**
         * logging.organizations.updateCmekSettings
         * @desc Updates the Logs Router CMEK settings for the given resource.Note: CMEK for the Logs Router can currently only be configured for GCP organizations. Once configured, it applies to all projects and folders in the GCP organization.UpdateCmekSettings will fail if 1) kms_key_name is invalid, or 2) the associated service account does not have the required roles/cloudkms.cryptoKeyEncrypterDecrypter role assigned for the key, or 3) access to the key is disabled.See Enabling CMEK for Logs Router (https://cloud.google.com/logging/docs/routing/managed-encryption) for more information.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.organizations.updateCmekSettings({
         *     // Required. The resource name for the CMEK settings to update.
         *     // "projects/[PROJECT_ID]/cmekSettings"
         *     // "organizations/[ORGANIZATION_ID]/cmekSettings"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/cmekSettings"
         *     // "folders/[FOLDER_ID]/cmekSettings"
         *     // Example: "organizations/12345/cmekSettings".Note: CMEK for the Logs Router can currently only be configured for GCP organizations. Once configured, it applies to all projects and folders in the GCP organization.
         *     name: 'organizations/my-organization',
         *     // Optional. Field mask identifying which fields from cmek_settings should be updated. A field will be overwritten if and only if it is in the update mask. Output only fields cannot be updated.See FieldMask for more information.Example: "updateMask=kmsKeyName"
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "kmsKeyName": "my_kmsKeyName",
         *       //   "name": "my_name",
         *       //   "serviceAccountId": "my_serviceAccountId"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "kmsKeyName": "my_kmsKeyName",
         *   //   "name": "my_name",
         *   //   "serviceAccountId": "my_serviceAccountId"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.organizations.updateCmekSettings
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name for the CMEK settings to update. "projects/[PROJECT_ID]/cmekSettings" "organizations/[ORGANIZATION_ID]/cmekSettings" "billingAccounts/[BILLING_ACCOUNT_ID]/cmekSettings" "folders/[FOLDER_ID]/cmekSettings" Example: "organizations/12345/cmekSettings".Note: CMEK for the Logs Router can currently only be configured for GCP organizations. Once configured, it applies to all projects and folders in the GCP organization.
         * @param {string=} params.updateMask Optional. Field mask identifying which fields from cmek_settings should be updated. A field will be overwritten if and only if it is in the update mask. Output only fields cannot be updated.See FieldMask for more information.Example: "updateMask=kmsKeyName"
         * @param {().CmekSettings} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        updateCmekSettings(params: Params$Resource$Organizations$Updatecmeksettings, options: StreamMethodOptions): GaxiosPromise<Readable>;
        updateCmekSettings(params?: Params$Resource$Organizations$Updatecmeksettings, options?: MethodOptions): GaxiosPromise<Schema$CmekSettings>;
        updateCmekSettings(params: Params$Resource$Organizations$Updatecmeksettings, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        updateCmekSettings(params: Params$Resource$Organizations$Updatecmeksettings, options: MethodOptions | BodyResponseCallback<Schema$CmekSettings>, callback: BodyResponseCallback<Schema$CmekSettings>): void;
        updateCmekSettings(params: Params$Resource$Organizations$Updatecmeksettings, callback: BodyResponseCallback<Schema$CmekSettings>): void;
        updateCmekSettings(callback: BodyResponseCallback<Schema$CmekSettings>): void;
    }
    export interface Params$Resource$Organizations$Getcmeksettings extends StandardParameters {
        /**
         * Required. The resource for which to retrieve CMEK settings. "projects/[PROJECT_ID]/cmekSettings" "organizations/[ORGANIZATION_ID]/cmekSettings" "billingAccounts/[BILLING_ACCOUNT_ID]/cmekSettings" "folders/[FOLDER_ID]/cmekSettings" Example: "organizations/12345/cmekSettings".Note: CMEK for the Logs Router can currently only be configured for GCP organizations. Once configured, it applies to all projects and folders in the GCP organization.
         */
        name?: string;
    }
    export interface Params$Resource$Organizations$Updatecmeksettings extends StandardParameters {
        /**
         * Required. The resource name for the CMEK settings to update. "projects/[PROJECT_ID]/cmekSettings" "organizations/[ORGANIZATION_ID]/cmekSettings" "billingAccounts/[BILLING_ACCOUNT_ID]/cmekSettings" "folders/[FOLDER_ID]/cmekSettings" Example: "organizations/12345/cmekSettings".Note: CMEK for the Logs Router can currently only be configured for GCP organizations. Once configured, it applies to all projects and folders in the GCP organization.
         */
        name?: string;
        /**
         * Optional. Field mask identifying which fields from cmek_settings should be updated. A field will be overwritten if and only if it is in the update mask. Output only fields cannot be updated.See FieldMask for more information.Example: "updateMask=kmsKeyName"
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$CmekSettings;
    }
    export class Resource$Organizations$Exclusions {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * logging.organizations.exclusions.create
         * @desc Creates a new exclusion in a specified parent resource. Only log entries belonging to that resource can be excluded. You can have up to 10 exclusions in a resource.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.organizations.exclusions.create({
         *     // Required. The parent resource in which to create the exclusion:
         *     // "projects/[PROJECT_ID]"
         *     // "organizations/[ORGANIZATION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]"
         *     // "folders/[FOLDER_ID]"
         *     // Examples: "projects/my-logging-project", "organizations/123456789".
         *     parent: 'organizations/my-organization',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "createTime": "my_createTime",
         *       //   "description": "my_description",
         *       //   "disabled": false,
         *       //   "filter": "my_filter",
         *       //   "name": "my_name",
         *       //   "updateTime": "my_updateTime"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "disabled": false,
         *   //   "filter": "my_filter",
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
         * @alias logging.organizations.exclusions.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent Required. The parent resource in which to create the exclusion: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" Examples: "projects/my-logging-project", "organizations/123456789".
         * @param {().LogExclusion} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Organizations$Exclusions$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Organizations$Exclusions$Create, options?: MethodOptions): GaxiosPromise<Schema$LogExclusion>;
        create(params: Params$Resource$Organizations$Exclusions$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Organizations$Exclusions$Create, options: MethodOptions | BodyResponseCallback<Schema$LogExclusion>, callback: BodyResponseCallback<Schema$LogExclusion>): void;
        create(params: Params$Resource$Organizations$Exclusions$Create, callback: BodyResponseCallback<Schema$LogExclusion>): void;
        create(callback: BodyResponseCallback<Schema$LogExclusion>): void;
        /**
         * logging.organizations.exclusions.delete
         * @desc Deletes an exclusion.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.organizations.exclusions.delete({
         *     // Required. The resource name of an existing exclusion to delete:
         *     // "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]"
         *     // "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]"
         *     // "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]"
         *     // Example: "projects/my-project-id/exclusions/my-exclusion-id".
         *     name: 'organizations/my-organization/exclusions/my-exclusion',
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
         * @alias logging.organizations.exclusions.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of an existing exclusion to delete: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" Example: "projects/my-project-id/exclusions/my-exclusion-id".
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Organizations$Exclusions$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Organizations$Exclusions$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Organizations$Exclusions$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Organizations$Exclusions$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Organizations$Exclusions$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * logging.organizations.exclusions.get
         * @desc Gets the description of an exclusion.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.organizations.exclusions.get({
         *     // Required. The resource name of an existing exclusion:
         *     // "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]"
         *     // "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]"
         *     // "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]"
         *     // Example: "projects/my-project-id/exclusions/my-exclusion-id".
         *     name: 'organizations/my-organization/exclusions/my-exclusion',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "disabled": false,
         *   //   "filter": "my_filter",
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
         * @alias logging.organizations.exclusions.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of an existing exclusion: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" Example: "projects/my-project-id/exclusions/my-exclusion-id".
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Organizations$Exclusions$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Organizations$Exclusions$Get, options?: MethodOptions): GaxiosPromise<Schema$LogExclusion>;
        get(params: Params$Resource$Organizations$Exclusions$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Organizations$Exclusions$Get, options: MethodOptions | BodyResponseCallback<Schema$LogExclusion>, callback: BodyResponseCallback<Schema$LogExclusion>): void;
        get(params: Params$Resource$Organizations$Exclusions$Get, callback: BodyResponseCallback<Schema$LogExclusion>): void;
        get(callback: BodyResponseCallback<Schema$LogExclusion>): void;
        /**
         * logging.organizations.exclusions.list
         * @desc Lists all the exclusions in a parent resource.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.organizations.exclusions.list({
         *     // Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         *     pageSize: 'placeholder-value',
         *     // Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         *     pageToken: 'placeholder-value',
         *     // Required. The parent resource whose exclusions are to be listed.
         *     // "projects/[PROJECT_ID]"
         *     // "organizations/[ORGANIZATION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]"
         *     // "folders/[FOLDER_ID]"
         *     //
         *     parent: 'organizations/my-organization',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "exclusions": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.organizations.exclusions.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         * @param {string=} params.pageToken Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         * @param {string} params.parent Required. The parent resource whose exclusions are to be listed. "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]"
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Organizations$Exclusions$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Organizations$Exclusions$List, options?: MethodOptions): GaxiosPromise<Schema$ListExclusionsResponse>;
        list(params: Params$Resource$Organizations$Exclusions$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Organizations$Exclusions$List, options: MethodOptions | BodyResponseCallback<Schema$ListExclusionsResponse>, callback: BodyResponseCallback<Schema$ListExclusionsResponse>): void;
        list(params: Params$Resource$Organizations$Exclusions$List, callback: BodyResponseCallback<Schema$ListExclusionsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListExclusionsResponse>): void;
        /**
         * logging.organizations.exclusions.patch
         * @desc Changes one or more properties of an existing exclusion.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.organizations.exclusions.patch({
         *     // Required. The resource name of the exclusion to update:
         *     // "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]"
         *     // "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]"
         *     // "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]"
         *     // Example: "projects/my-project-id/exclusions/my-exclusion-id".
         *     name: 'organizations/my-organization/exclusions/my-exclusion',
         *     // Required. A non-empty list of fields to change in the existing exclusion. New values for the fields are taken from the corresponding fields in the LogExclusion included in this request. Fields not mentioned in update_mask are not changed and are ignored in the request.For example, to change the filter and description of an exclusion, specify an update_mask of "filter,description".
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "createTime": "my_createTime",
         *       //   "description": "my_description",
         *       //   "disabled": false,
         *       //   "filter": "my_filter",
         *       //   "name": "my_name",
         *       //   "updateTime": "my_updateTime"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "disabled": false,
         *   //   "filter": "my_filter",
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
         * @alias logging.organizations.exclusions.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the exclusion to update: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" Example: "projects/my-project-id/exclusions/my-exclusion-id".
         * @param {string=} params.updateMask Required. A non-empty list of fields to change in the existing exclusion. New values for the fields are taken from the corresponding fields in the LogExclusion included in this request. Fields not mentioned in update_mask are not changed and are ignored in the request.For example, to change the filter and description of an exclusion, specify an update_mask of "filter,description".
         * @param {().LogExclusion} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Organizations$Exclusions$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Organizations$Exclusions$Patch, options?: MethodOptions): GaxiosPromise<Schema$LogExclusion>;
        patch(params: Params$Resource$Organizations$Exclusions$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Organizations$Exclusions$Patch, options: MethodOptions | BodyResponseCallback<Schema$LogExclusion>, callback: BodyResponseCallback<Schema$LogExclusion>): void;
        patch(params: Params$Resource$Organizations$Exclusions$Patch, callback: BodyResponseCallback<Schema$LogExclusion>): void;
        patch(callback: BodyResponseCallback<Schema$LogExclusion>): void;
    }
    export interface Params$Resource$Organizations$Exclusions$Create extends StandardParameters {
        /**
         * Required. The parent resource in which to create the exclusion: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" Examples: "projects/my-logging-project", "organizations/123456789".
         */
        parent?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$LogExclusion;
    }
    export interface Params$Resource$Organizations$Exclusions$Delete extends StandardParameters {
        /**
         * Required. The resource name of an existing exclusion to delete: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" Example: "projects/my-project-id/exclusions/my-exclusion-id".
         */
        name?: string;
    }
    export interface Params$Resource$Organizations$Exclusions$Get extends StandardParameters {
        /**
         * Required. The resource name of an existing exclusion: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" Example: "projects/my-project-id/exclusions/my-exclusion-id".
         */
        name?: string;
    }
    export interface Params$Resource$Organizations$Exclusions$List extends StandardParameters {
        /**
         * Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         */
        pageSize?: number;
        /**
         * Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         */
        pageToken?: string;
        /**
         * Required. The parent resource whose exclusions are to be listed. "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]"
         */
        parent?: string;
    }
    export interface Params$Resource$Organizations$Exclusions$Patch extends StandardParameters {
        /**
         * Required. The resource name of the exclusion to update: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" Example: "projects/my-project-id/exclusions/my-exclusion-id".
         */
        name?: string;
        /**
         * Required. A non-empty list of fields to change in the existing exclusion. New values for the fields are taken from the corresponding fields in the LogExclusion included in this request. Fields not mentioned in update_mask are not changed and are ignored in the request.For example, to change the filter and description of an exclusion, specify an update_mask of "filter,description".
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$LogExclusion;
    }
    export class Resource$Organizations$Locations {
        context: APIRequestContext;
        buckets: Resource$Organizations$Locations$Buckets;
        constructor(context: APIRequestContext);
    }
    export class Resource$Organizations$Locations$Buckets {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * logging.organizations.locations.buckets.get
         * @desc Gets a bucket (Beta).
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.organizations.locations.buckets.get({
         *     // Required. The resource name of the bucket:
         *     // "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // Example: "projects/my-project-id/locations/my-location/buckets/my-bucket-id".
         *     name:
         *       'organizations/my-organization/locations/my-location/buckets/my-bucket',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "lifecycleState": "my_lifecycleState",
         *   //   "name": "my_name",
         *   //   "retentionDays": 0,
         *   //   "updateTime": "my_updateTime"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.organizations.locations.buckets.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" Example: "projects/my-project-id/locations/my-location/buckets/my-bucket-id".
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Organizations$Locations$Buckets$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Organizations$Locations$Buckets$Get, options?: MethodOptions): GaxiosPromise<Schema$LogBucket>;
        get(params: Params$Resource$Organizations$Locations$Buckets$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Organizations$Locations$Buckets$Get, options: MethodOptions | BodyResponseCallback<Schema$LogBucket>, callback: BodyResponseCallback<Schema$LogBucket>): void;
        get(params: Params$Resource$Organizations$Locations$Buckets$Get, callback: BodyResponseCallback<Schema$LogBucket>): void;
        get(callback: BodyResponseCallback<Schema$LogBucket>): void;
        /**
         * logging.organizations.locations.buckets.list
         * @desc Lists buckets (Beta).
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.organizations.locations.buckets.list({
         *     // Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         *     pageSize: 'placeholder-value',
         *     // Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         *     pageToken: 'placeholder-value',
         *     // Required. The parent resource whose buckets are to be listed:
         *     // "projects/[PROJECT_ID]/locations/[LOCATION_ID]"
         *     // "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]"
         *     // "folders/[FOLDER_ID]/locations/[LOCATION_ID]"
         *     // Note: The locations portion of the resource must be specified, but supplying the character - in place of LOCATION_ID will return all buckets.
         *     parent: 'organizations/my-organization/locations/my-location',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "buckets": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.organizations.locations.buckets.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         * @param {string=} params.pageToken Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         * @param {string} params.parent Required. The parent resource whose buckets are to be listed: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" Note: The locations portion of the resource must be specified, but supplying the character - in place of LOCATION_ID will return all buckets.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Organizations$Locations$Buckets$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Organizations$Locations$Buckets$List, options?: MethodOptions): GaxiosPromise<Schema$ListBucketsResponse>;
        list(params: Params$Resource$Organizations$Locations$Buckets$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Organizations$Locations$Buckets$List, options: MethodOptions | BodyResponseCallback<Schema$ListBucketsResponse>, callback: BodyResponseCallback<Schema$ListBucketsResponse>): void;
        list(params: Params$Resource$Organizations$Locations$Buckets$List, callback: BodyResponseCallback<Schema$ListBucketsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListBucketsResponse>): void;
        /**
         * logging.organizations.locations.buckets.patch
         * @desc Updates a bucket. This method replaces the following fields in the existing bucket with values from the new bucket: retention_periodIf the retention period is decreased and the bucket is locked, FAILED_PRECONDITION will be returned.If the bucket has a LifecycleState of DELETE_REQUESTED, FAILED_PRECONDITION will be returned.A buckets region may not be modified after it is created. This method is in Beta.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.organizations.locations.buckets.patch({
         *     // Required. The full resource name of the bucket to update.
         *     // "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // Example: "projects/my-project-id/locations/my-location/buckets/my-bucket-id". Also requires permission "resourcemanager.projects.updateLiens" to set the locked property
         *     name:
         *       'organizations/my-organization/locations/my-location/buckets/my-bucket',
         *     // Required. Field mask that specifies the fields in bucket that need an update. A bucket field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=retention_days.
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "createTime": "my_createTime",
         *       //   "description": "my_description",
         *       //   "lifecycleState": "my_lifecycleState",
         *       //   "name": "my_name",
         *       //   "retentionDays": 0,
         *       //   "updateTime": "my_updateTime"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "lifecycleState": "my_lifecycleState",
         *   //   "name": "my_name",
         *   //   "retentionDays": 0,
         *   //   "updateTime": "my_updateTime"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.organizations.locations.buckets.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The full resource name of the bucket to update. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" Example: "projects/my-project-id/locations/my-location/buckets/my-bucket-id". Also requires permission "resourcemanager.projects.updateLiens" to set the locked property
         * @param {string=} params.updateMask Required. Field mask that specifies the fields in bucket that need an update. A bucket field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=retention_days.
         * @param {().LogBucket} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Organizations$Locations$Buckets$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Organizations$Locations$Buckets$Patch, options?: MethodOptions): GaxiosPromise<Schema$LogBucket>;
        patch(params: Params$Resource$Organizations$Locations$Buckets$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Organizations$Locations$Buckets$Patch, options: MethodOptions | BodyResponseCallback<Schema$LogBucket>, callback: BodyResponseCallback<Schema$LogBucket>): void;
        patch(params: Params$Resource$Organizations$Locations$Buckets$Patch, callback: BodyResponseCallback<Schema$LogBucket>): void;
        patch(callback: BodyResponseCallback<Schema$LogBucket>): void;
    }
    export interface Params$Resource$Organizations$Locations$Buckets$Get extends StandardParameters {
        /**
         * Required. The resource name of the bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" Example: "projects/my-project-id/locations/my-location/buckets/my-bucket-id".
         */
        name?: string;
    }
    export interface Params$Resource$Organizations$Locations$Buckets$List extends StandardParameters {
        /**
         * Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         */
        pageSize?: number;
        /**
         * Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         */
        pageToken?: string;
        /**
         * Required. The parent resource whose buckets are to be listed: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" Note: The locations portion of the resource must be specified, but supplying the character - in place of LOCATION_ID will return all buckets.
         */
        parent?: string;
    }
    export interface Params$Resource$Organizations$Locations$Buckets$Patch extends StandardParameters {
        /**
         * Required. The full resource name of the bucket to update. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" Example: "projects/my-project-id/locations/my-location/buckets/my-bucket-id". Also requires permission "resourcemanager.projects.updateLiens" to set the locked property
         */
        name?: string;
        /**
         * Required. Field mask that specifies the fields in bucket that need an update. A bucket field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=retention_days.
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$LogBucket;
    }
    export class Resource$Organizations$Logs {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * logging.organizations.logs.delete
         * @desc Deletes all the log entries in a log. The log reappears if it receives new entries. Log entries written shortly before the delete operation might not be deleted. Entries received after the delete operation with a timestamp before the operation will be deleted.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.organizations.logs.delete({
         *     // Required. The resource name of the log to delete:
         *     // "projects/[PROJECT_ID]/logs/[LOG_ID]"
         *     // "organizations/[ORGANIZATION_ID]/logs/[LOG_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/logs/[LOG_ID]"
         *     // "folders/[FOLDER_ID]/logs/[LOG_ID]"
         *     // [LOG_ID] must be URL-encoded. For example, "projects/my-project-id/logs/syslog", "organizations/1234567890/logs/cloudresourcemanager.googleapis.com%2Factivity". For more information about log names, see LogEntry.
         *     logName: 'organizations/my-organization/logs/my-log',
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
         * @alias logging.organizations.logs.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.logName Required. The resource name of the log to delete: "projects/[PROJECT_ID]/logs/[LOG_ID]" "organizations/[ORGANIZATION_ID]/logs/[LOG_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/logs/[LOG_ID]" "folders/[FOLDER_ID]/logs/[LOG_ID]" [LOG_ID] must be URL-encoded. For example, "projects/my-project-id/logs/syslog", "organizations/1234567890/logs/cloudresourcemanager.googleapis.com%2Factivity". For more information about log names, see LogEntry.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Organizations$Logs$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Organizations$Logs$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Organizations$Logs$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Organizations$Logs$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Organizations$Logs$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * logging.organizations.logs.list
         * @desc Lists the logs in projects, organizations, folders, or billing accounts. Only logs that have entries are listed.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.organizations.logs.list({
         *     // Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         *     pageSize: 'placeholder-value',
         *     // Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         *     pageToken: 'placeholder-value',
         *     // Required. The resource name that owns the logs:
         *     // "projects/[PROJECT_ID]"
         *     // "organizations/[ORGANIZATION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]"
         *     // "folders/[FOLDER_ID]"
         *     //
         *     parent: 'organizations/my-organization',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "logNames": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.organizations.logs.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         * @param {string=} params.pageToken Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         * @param {string} params.parent Required. The resource name that owns the logs: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]"
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Organizations$Logs$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Organizations$Logs$List, options?: MethodOptions): GaxiosPromise<Schema$ListLogsResponse>;
        list(params: Params$Resource$Organizations$Logs$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Organizations$Logs$List, options: MethodOptions | BodyResponseCallback<Schema$ListLogsResponse>, callback: BodyResponseCallback<Schema$ListLogsResponse>): void;
        list(params: Params$Resource$Organizations$Logs$List, callback: BodyResponseCallback<Schema$ListLogsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListLogsResponse>): void;
    }
    export interface Params$Resource$Organizations$Logs$Delete extends StandardParameters {
        /**
         * Required. The resource name of the log to delete: "projects/[PROJECT_ID]/logs/[LOG_ID]" "organizations/[ORGANIZATION_ID]/logs/[LOG_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/logs/[LOG_ID]" "folders/[FOLDER_ID]/logs/[LOG_ID]" [LOG_ID] must be URL-encoded. For example, "projects/my-project-id/logs/syslog", "organizations/1234567890/logs/cloudresourcemanager.googleapis.com%2Factivity". For more information about log names, see LogEntry.
         */
        logName?: string;
    }
    export interface Params$Resource$Organizations$Logs$List extends StandardParameters {
        /**
         * Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         */
        pageSize?: number;
        /**
         * Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         */
        pageToken?: string;
        /**
         * Required. The resource name that owns the logs: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]"
         */
        parent?: string;
    }
    export class Resource$Organizations$Sinks {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * logging.organizations.sinks.create
         * @desc Creates a sink that exports specified log entries to a destination. The export of newly-ingested log entries begins immediately, unless the sink's writer_identity is not permitted to write to the destination. A sink can export log entries only from the resource owning the sink.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.organizations.sinks.create({
         *     // Required. The resource in which to create the sink:
         *     // "projects/[PROJECT_ID]"
         *     // "organizations/[ORGANIZATION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]"
         *     // "folders/[FOLDER_ID]"
         *     // Examples: "projects/my-logging-project", "organizations/123456789".
         *     parent: 'organizations/my-organization',
         *     // Optional. Determines the kind of IAM identity returned as writer_identity in the new sink. If this value is omitted or set to false, and if the sink's parent is a project, then the value returned as writer_identity is the same group or service account used by Logging before the addition of writer identities to this API. The sink's destination must be in the same project as the sink itself.If this field is set to true, or if the sink is owned by a non-project resource such as an organization, then the value of writer_identity will be a unique service account used only for exports from the new sink. For more information, see writer_identity in LogSink.
         *     uniqueWriterIdentity: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "bigqueryOptions": {},
         *       //   "createTime": "my_createTime",
         *       //   "description": "my_description",
         *       //   "destination": "my_destination",
         *       //   "disabled": false,
         *       //   "filter": "my_filter",
         *       //   "includeChildren": false,
         *       //   "name": "my_name",
         *       //   "outputVersionFormat": "my_outputVersionFormat",
         *       //   "updateTime": "my_updateTime",
         *       //   "writerIdentity": "my_writerIdentity"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bigqueryOptions": {},
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "destination": "my_destination",
         *   //   "disabled": false,
         *   //   "filter": "my_filter",
         *   //   "includeChildren": false,
         *   //   "name": "my_name",
         *   //   "outputVersionFormat": "my_outputVersionFormat",
         *   //   "updateTime": "my_updateTime",
         *   //   "writerIdentity": "my_writerIdentity"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.organizations.sinks.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent Required. The resource in which to create the sink: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" Examples: "projects/my-logging-project", "organizations/123456789".
         * @param {boolean=} params.uniqueWriterIdentity Optional. Determines the kind of IAM identity returned as writer_identity in the new sink. If this value is omitted or set to false, and if the sink's parent is a project, then the value returned as writer_identity is the same group or service account used by Logging before the addition of writer identities to this API. The sink's destination must be in the same project as the sink itself.If this field is set to true, or if the sink is owned by a non-project resource such as an organization, then the value of writer_identity will be a unique service account used only for exports from the new sink. For more information, see writer_identity in LogSink.
         * @param {().LogSink} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Organizations$Sinks$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Organizations$Sinks$Create, options?: MethodOptions): GaxiosPromise<Schema$LogSink>;
        create(params: Params$Resource$Organizations$Sinks$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Organizations$Sinks$Create, options: MethodOptions | BodyResponseCallback<Schema$LogSink>, callback: BodyResponseCallback<Schema$LogSink>): void;
        create(params: Params$Resource$Organizations$Sinks$Create, callback: BodyResponseCallback<Schema$LogSink>): void;
        create(callback: BodyResponseCallback<Schema$LogSink>): void;
        /**
         * logging.organizations.sinks.delete
         * @desc Deletes a sink. If the sink has a unique writer_identity, then that service account is also deleted.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.organizations.sinks.delete({
         *     // Required. The full resource name of the sink to delete, including the parent resource and the sink identifier:
         *     // "projects/[PROJECT_ID]/sinks/[SINK_ID]"
         *     // "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]"
         *     // "folders/[FOLDER_ID]/sinks/[SINK_ID]"
         *     // Example: "projects/my-project-id/sinks/my-sink-id".
         *     sinkName: 'organizations/my-organization/sinks/my-sink',
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
         * @alias logging.organizations.sinks.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.sinkName Required. The full resource name of the sink to delete, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" Example: "projects/my-project-id/sinks/my-sink-id".
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Organizations$Sinks$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Organizations$Sinks$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Organizations$Sinks$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Organizations$Sinks$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Organizations$Sinks$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * logging.organizations.sinks.get
         * @desc Gets a sink.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.organizations.sinks.get({
         *     // Required. The resource name of the sink:
         *     // "projects/[PROJECT_ID]/sinks/[SINK_ID]"
         *     // "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]"
         *     // "folders/[FOLDER_ID]/sinks/[SINK_ID]"
         *     // Example: "projects/my-project-id/sinks/my-sink-id".
         *     sinkName: 'organizations/my-organization/sinks/my-sink',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bigqueryOptions": {},
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "destination": "my_destination",
         *   //   "disabled": false,
         *   //   "filter": "my_filter",
         *   //   "includeChildren": false,
         *   //   "name": "my_name",
         *   //   "outputVersionFormat": "my_outputVersionFormat",
         *   //   "updateTime": "my_updateTime",
         *   //   "writerIdentity": "my_writerIdentity"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.organizations.sinks.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.sinkName Required. The resource name of the sink: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" Example: "projects/my-project-id/sinks/my-sink-id".
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Organizations$Sinks$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Organizations$Sinks$Get, options?: MethodOptions): GaxiosPromise<Schema$LogSink>;
        get(params: Params$Resource$Organizations$Sinks$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Organizations$Sinks$Get, options: MethodOptions | BodyResponseCallback<Schema$LogSink>, callback: BodyResponseCallback<Schema$LogSink>): void;
        get(params: Params$Resource$Organizations$Sinks$Get, callback: BodyResponseCallback<Schema$LogSink>): void;
        get(callback: BodyResponseCallback<Schema$LogSink>): void;
        /**
         * logging.organizations.sinks.list
         * @desc Lists sinks.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.organizations.sinks.list({
         *     // Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         *     pageSize: 'placeholder-value',
         *     // Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         *     pageToken: 'placeholder-value',
         *     // Required. The parent resource whose sinks are to be listed:
         *     // "projects/[PROJECT_ID]"
         *     // "organizations/[ORGANIZATION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]"
         *     // "folders/[FOLDER_ID]"
         *     //
         *     parent: 'organizations/my-organization',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "sinks": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.organizations.sinks.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         * @param {string=} params.pageToken Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         * @param {string} params.parent Required. The parent resource whose sinks are to be listed: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]"
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Organizations$Sinks$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Organizations$Sinks$List, options?: MethodOptions): GaxiosPromise<Schema$ListSinksResponse>;
        list(params: Params$Resource$Organizations$Sinks$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Organizations$Sinks$List, options: MethodOptions | BodyResponseCallback<Schema$ListSinksResponse>, callback: BodyResponseCallback<Schema$ListSinksResponse>): void;
        list(params: Params$Resource$Organizations$Sinks$List, callback: BodyResponseCallback<Schema$ListSinksResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListSinksResponse>): void;
        /**
         * logging.organizations.sinks.patch
         * @desc Updates a sink. This method replaces the following fields in the existing sink with values from the new sink: destination, and filter.The updated sink might also have a new writer_identity; see the unique_writer_identity field.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.organizations.sinks.patch({
         *     // Required. The full resource name of the sink to update, including the parent resource and the sink identifier:
         *     // "projects/[PROJECT_ID]/sinks/[SINK_ID]"
         *     // "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]"
         *     // "folders/[FOLDER_ID]/sinks/[SINK_ID]"
         *     // Example: "projects/my-project-id/sinks/my-sink-id".
         *     sinkName: 'organizations/my-organization/sinks/my-sink',
         *     // Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field:
         *     // If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity.
         *     // If the old value is false and the new value is true, then writer_identity is changed to a unique service account.
         *     // It is an error if the old value is true and the new value is set to false or defaulted to false.
         *     uniqueWriterIdentity: 'placeholder-value',
         *     // Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:  destination,filter,includeChildren At some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=filter.
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "bigqueryOptions": {},
         *       //   "createTime": "my_createTime",
         *       //   "description": "my_description",
         *       //   "destination": "my_destination",
         *       //   "disabled": false,
         *       //   "filter": "my_filter",
         *       //   "includeChildren": false,
         *       //   "name": "my_name",
         *       //   "outputVersionFormat": "my_outputVersionFormat",
         *       //   "updateTime": "my_updateTime",
         *       //   "writerIdentity": "my_writerIdentity"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bigqueryOptions": {},
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "destination": "my_destination",
         *   //   "disabled": false,
         *   //   "filter": "my_filter",
         *   //   "includeChildren": false,
         *   //   "name": "my_name",
         *   //   "outputVersionFormat": "my_outputVersionFormat",
         *   //   "updateTime": "my_updateTime",
         *   //   "writerIdentity": "my_writerIdentity"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.organizations.sinks.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.sinkName Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" Example: "projects/my-project-id/sinks/my-sink-id".
         * @param {boolean=} params.uniqueWriterIdentity Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field: If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity. If the old value is false and the new value is true, then writer_identity is changed to a unique service account. It is an error if the old value is true and the new value is set to false or defaulted to false.
         * @param {string=} params.updateMask Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:  destination,filter,includeChildren At some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=filter.
         * @param {().LogSink} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Organizations$Sinks$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Organizations$Sinks$Patch, options?: MethodOptions): GaxiosPromise<Schema$LogSink>;
        patch(params: Params$Resource$Organizations$Sinks$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Organizations$Sinks$Patch, options: MethodOptions | BodyResponseCallback<Schema$LogSink>, callback: BodyResponseCallback<Schema$LogSink>): void;
        patch(params: Params$Resource$Organizations$Sinks$Patch, callback: BodyResponseCallback<Schema$LogSink>): void;
        patch(callback: BodyResponseCallback<Schema$LogSink>): void;
        /**
         * logging.organizations.sinks.update
         * @desc Updates a sink. This method replaces the following fields in the existing sink with values from the new sink: destination, and filter.The updated sink might also have a new writer_identity; see the unique_writer_identity field.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.organizations.sinks.update({
         *     // Required. The full resource name of the sink to update, including the parent resource and the sink identifier:
         *     // "projects/[PROJECT_ID]/sinks/[SINK_ID]"
         *     // "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]"
         *     // "folders/[FOLDER_ID]/sinks/[SINK_ID]"
         *     // Example: "projects/my-project-id/sinks/my-sink-id".
         *     sinkName: 'organizations/my-organization/sinks/my-sink',
         *     // Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field:
         *     // If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity.
         *     // If the old value is false and the new value is true, then writer_identity is changed to a unique service account.
         *     // It is an error if the old value is true and the new value is set to false or defaulted to false.
         *     uniqueWriterIdentity: 'placeholder-value',
         *     // Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:  destination,filter,includeChildren At some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=filter.
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "bigqueryOptions": {},
         *       //   "createTime": "my_createTime",
         *       //   "description": "my_description",
         *       //   "destination": "my_destination",
         *       //   "disabled": false,
         *       //   "filter": "my_filter",
         *       //   "includeChildren": false,
         *       //   "name": "my_name",
         *       //   "outputVersionFormat": "my_outputVersionFormat",
         *       //   "updateTime": "my_updateTime",
         *       //   "writerIdentity": "my_writerIdentity"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bigqueryOptions": {},
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "destination": "my_destination",
         *   //   "disabled": false,
         *   //   "filter": "my_filter",
         *   //   "includeChildren": false,
         *   //   "name": "my_name",
         *   //   "outputVersionFormat": "my_outputVersionFormat",
         *   //   "updateTime": "my_updateTime",
         *   //   "writerIdentity": "my_writerIdentity"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.organizations.sinks.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.sinkName Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" Example: "projects/my-project-id/sinks/my-sink-id".
         * @param {boolean=} params.uniqueWriterIdentity Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field: If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity. If the old value is false and the new value is true, then writer_identity is changed to a unique service account. It is an error if the old value is true and the new value is set to false or defaulted to false.
         * @param {string=} params.updateMask Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:  destination,filter,includeChildren At some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=filter.
         * @param {().LogSink} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Organizations$Sinks$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Organizations$Sinks$Update, options?: MethodOptions): GaxiosPromise<Schema$LogSink>;
        update(params: Params$Resource$Organizations$Sinks$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Organizations$Sinks$Update, options: MethodOptions | BodyResponseCallback<Schema$LogSink>, callback: BodyResponseCallback<Schema$LogSink>): void;
        update(params: Params$Resource$Organizations$Sinks$Update, callback: BodyResponseCallback<Schema$LogSink>): void;
        update(callback: BodyResponseCallback<Schema$LogSink>): void;
    }
    export interface Params$Resource$Organizations$Sinks$Create extends StandardParameters {
        /**
         * Required. The resource in which to create the sink: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" Examples: "projects/my-logging-project", "organizations/123456789".
         */
        parent?: string;
        /**
         * Optional. Determines the kind of IAM identity returned as writer_identity in the new sink. If this value is omitted or set to false, and if the sink's parent is a project, then the value returned as writer_identity is the same group or service account used by Logging before the addition of writer identities to this API. The sink's destination must be in the same project as the sink itself.If this field is set to true, or if the sink is owned by a non-project resource such as an organization, then the value of writer_identity will be a unique service account used only for exports from the new sink. For more information, see writer_identity in LogSink.
         */
        uniqueWriterIdentity?: boolean;
        /**
         * Request body metadata
         */
        requestBody?: Schema$LogSink;
    }
    export interface Params$Resource$Organizations$Sinks$Delete extends StandardParameters {
        /**
         * Required. The full resource name of the sink to delete, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" Example: "projects/my-project-id/sinks/my-sink-id".
         */
        sinkName?: string;
    }
    export interface Params$Resource$Organizations$Sinks$Get extends StandardParameters {
        /**
         * Required. The resource name of the sink: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" Example: "projects/my-project-id/sinks/my-sink-id".
         */
        sinkName?: string;
    }
    export interface Params$Resource$Organizations$Sinks$List extends StandardParameters {
        /**
         * Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         */
        pageSize?: number;
        /**
         * Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         */
        pageToken?: string;
        /**
         * Required. The parent resource whose sinks are to be listed: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]"
         */
        parent?: string;
    }
    export interface Params$Resource$Organizations$Sinks$Patch extends StandardParameters {
        /**
         * Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" Example: "projects/my-project-id/sinks/my-sink-id".
         */
        sinkName?: string;
        /**
         * Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field: If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity. If the old value is false and the new value is true, then writer_identity is changed to a unique service account. It is an error if the old value is true and the new value is set to false or defaulted to false.
         */
        uniqueWriterIdentity?: boolean;
        /**
         * Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:  destination,filter,includeChildren At some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=filter.
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$LogSink;
    }
    export interface Params$Resource$Organizations$Sinks$Update extends StandardParameters {
        /**
         * Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" Example: "projects/my-project-id/sinks/my-sink-id".
         */
        sinkName?: string;
        /**
         * Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field: If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity. If the old value is false and the new value is true, then writer_identity is changed to a unique service account. It is an error if the old value is true and the new value is set to false or defaulted to false.
         */
        uniqueWriterIdentity?: boolean;
        /**
         * Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:  destination,filter,includeChildren At some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=filter.
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$LogSink;
    }
    export class Resource$Projects {
        context: APIRequestContext;
        exclusions: Resource$Projects$Exclusions;
        locations: Resource$Projects$Locations;
        logs: Resource$Projects$Logs;
        metrics: Resource$Projects$Metrics;
        sinks: Resource$Projects$Sinks;
        constructor(context: APIRequestContext);
    }
    export class Resource$Projects$Exclusions {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * logging.projects.exclusions.create
         * @desc Creates a new exclusion in a specified parent resource. Only log entries belonging to that resource can be excluded. You can have up to 10 exclusions in a resource.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.projects.exclusions.create({
         *     // Required. The parent resource in which to create the exclusion:
         *     // "projects/[PROJECT_ID]"
         *     // "organizations/[ORGANIZATION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]"
         *     // "folders/[FOLDER_ID]"
         *     // Examples: "projects/my-logging-project", "organizations/123456789".
         *     parent: 'projects/my-project',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "createTime": "my_createTime",
         *       //   "description": "my_description",
         *       //   "disabled": false,
         *       //   "filter": "my_filter",
         *       //   "name": "my_name",
         *       //   "updateTime": "my_updateTime"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "disabled": false,
         *   //   "filter": "my_filter",
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
         * @alias logging.projects.exclusions.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent Required. The parent resource in which to create the exclusion: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" Examples: "projects/my-logging-project", "organizations/123456789".
         * @param {().LogExclusion} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Projects$Exclusions$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Projects$Exclusions$Create, options?: MethodOptions): GaxiosPromise<Schema$LogExclusion>;
        create(params: Params$Resource$Projects$Exclusions$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Projects$Exclusions$Create, options: MethodOptions | BodyResponseCallback<Schema$LogExclusion>, callback: BodyResponseCallback<Schema$LogExclusion>): void;
        create(params: Params$Resource$Projects$Exclusions$Create, callback: BodyResponseCallback<Schema$LogExclusion>): void;
        create(callback: BodyResponseCallback<Schema$LogExclusion>): void;
        /**
         * logging.projects.exclusions.delete
         * @desc Deletes an exclusion.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.projects.exclusions.delete({
         *     // Required. The resource name of an existing exclusion to delete:
         *     // "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]"
         *     // "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]"
         *     // "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]"
         *     // Example: "projects/my-project-id/exclusions/my-exclusion-id".
         *     name: 'projects/my-project/exclusions/my-exclusion',
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
         * @alias logging.projects.exclusions.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of an existing exclusion to delete: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" Example: "projects/my-project-id/exclusions/my-exclusion-id".
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Projects$Exclusions$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Projects$Exclusions$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Projects$Exclusions$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Projects$Exclusions$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Projects$Exclusions$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * logging.projects.exclusions.get
         * @desc Gets the description of an exclusion.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.projects.exclusions.get({
         *     // Required. The resource name of an existing exclusion:
         *     // "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]"
         *     // "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]"
         *     // "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]"
         *     // Example: "projects/my-project-id/exclusions/my-exclusion-id".
         *     name: 'projects/my-project/exclusions/my-exclusion',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "disabled": false,
         *   //   "filter": "my_filter",
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
         * @alias logging.projects.exclusions.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of an existing exclusion: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" Example: "projects/my-project-id/exclusions/my-exclusion-id".
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Exclusions$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Exclusions$Get, options?: MethodOptions): GaxiosPromise<Schema$LogExclusion>;
        get(params: Params$Resource$Projects$Exclusions$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Exclusions$Get, options: MethodOptions | BodyResponseCallback<Schema$LogExclusion>, callback: BodyResponseCallback<Schema$LogExclusion>): void;
        get(params: Params$Resource$Projects$Exclusions$Get, callback: BodyResponseCallback<Schema$LogExclusion>): void;
        get(callback: BodyResponseCallback<Schema$LogExclusion>): void;
        /**
         * logging.projects.exclusions.list
         * @desc Lists all the exclusions in a parent resource.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.projects.exclusions.list({
         *     // Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         *     pageSize: 'placeholder-value',
         *     // Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         *     pageToken: 'placeholder-value',
         *     // Required. The parent resource whose exclusions are to be listed.
         *     // "projects/[PROJECT_ID]"
         *     // "organizations/[ORGANIZATION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]"
         *     // "folders/[FOLDER_ID]"
         *     //
         *     parent: 'projects/my-project',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "exclusions": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.projects.exclusions.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         * @param {string=} params.pageToken Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         * @param {string} params.parent Required. The parent resource whose exclusions are to be listed. "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]"
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Exclusions$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Exclusions$List, options?: MethodOptions): GaxiosPromise<Schema$ListExclusionsResponse>;
        list(params: Params$Resource$Projects$Exclusions$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Exclusions$List, options: MethodOptions | BodyResponseCallback<Schema$ListExclusionsResponse>, callback: BodyResponseCallback<Schema$ListExclusionsResponse>): void;
        list(params: Params$Resource$Projects$Exclusions$List, callback: BodyResponseCallback<Schema$ListExclusionsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListExclusionsResponse>): void;
        /**
         * logging.projects.exclusions.patch
         * @desc Changes one or more properties of an existing exclusion.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.projects.exclusions.patch({
         *     // Required. The resource name of the exclusion to update:
         *     // "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]"
         *     // "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]"
         *     // "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]"
         *     // Example: "projects/my-project-id/exclusions/my-exclusion-id".
         *     name: 'projects/my-project/exclusions/my-exclusion',
         *     // Required. A non-empty list of fields to change in the existing exclusion. New values for the fields are taken from the corresponding fields in the LogExclusion included in this request. Fields not mentioned in update_mask are not changed and are ignored in the request.For example, to change the filter and description of an exclusion, specify an update_mask of "filter,description".
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "createTime": "my_createTime",
         *       //   "description": "my_description",
         *       //   "disabled": false,
         *       //   "filter": "my_filter",
         *       //   "name": "my_name",
         *       //   "updateTime": "my_updateTime"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "disabled": false,
         *   //   "filter": "my_filter",
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
         * @alias logging.projects.exclusions.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the exclusion to update: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" Example: "projects/my-project-id/exclusions/my-exclusion-id".
         * @param {string=} params.updateMask Required. A non-empty list of fields to change in the existing exclusion. New values for the fields are taken from the corresponding fields in the LogExclusion included in this request. Fields not mentioned in update_mask are not changed and are ignored in the request.For example, to change the filter and description of an exclusion, specify an update_mask of "filter,description".
         * @param {().LogExclusion} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Projects$Exclusions$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Projects$Exclusions$Patch, options?: MethodOptions): GaxiosPromise<Schema$LogExclusion>;
        patch(params: Params$Resource$Projects$Exclusions$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Projects$Exclusions$Patch, options: MethodOptions | BodyResponseCallback<Schema$LogExclusion>, callback: BodyResponseCallback<Schema$LogExclusion>): void;
        patch(params: Params$Resource$Projects$Exclusions$Patch, callback: BodyResponseCallback<Schema$LogExclusion>): void;
        patch(callback: BodyResponseCallback<Schema$LogExclusion>): void;
    }
    export interface Params$Resource$Projects$Exclusions$Create extends StandardParameters {
        /**
         * Required. The parent resource in which to create the exclusion: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" Examples: "projects/my-logging-project", "organizations/123456789".
         */
        parent?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$LogExclusion;
    }
    export interface Params$Resource$Projects$Exclusions$Delete extends StandardParameters {
        /**
         * Required. The resource name of an existing exclusion to delete: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" Example: "projects/my-project-id/exclusions/my-exclusion-id".
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Exclusions$Get extends StandardParameters {
        /**
         * Required. The resource name of an existing exclusion: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" Example: "projects/my-project-id/exclusions/my-exclusion-id".
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Exclusions$List extends StandardParameters {
        /**
         * Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         */
        pageSize?: number;
        /**
         * Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         */
        pageToken?: string;
        /**
         * Required. The parent resource whose exclusions are to be listed. "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]"
         */
        parent?: string;
    }
    export interface Params$Resource$Projects$Exclusions$Patch extends StandardParameters {
        /**
         * Required. The resource name of the exclusion to update: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" Example: "projects/my-project-id/exclusions/my-exclusion-id".
         */
        name?: string;
        /**
         * Required. A non-empty list of fields to change in the existing exclusion. New values for the fields are taken from the corresponding fields in the LogExclusion included in this request. Fields not mentioned in update_mask are not changed and are ignored in the request.For example, to change the filter and description of an exclusion, specify an update_mask of "filter,description".
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$LogExclusion;
    }
    export class Resource$Projects$Locations {
        context: APIRequestContext;
        buckets: Resource$Projects$Locations$Buckets;
        constructor(context: APIRequestContext);
    }
    export class Resource$Projects$Locations$Buckets {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * logging.projects.locations.buckets.get
         * @desc Gets a bucket (Beta).
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.projects.locations.buckets.get({
         *     // Required. The resource name of the bucket:
         *     // "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // Example: "projects/my-project-id/locations/my-location/buckets/my-bucket-id".
         *     name: 'projects/my-project/locations/my-location/buckets/my-bucket',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "lifecycleState": "my_lifecycleState",
         *   //   "name": "my_name",
         *   //   "retentionDays": 0,
         *   //   "updateTime": "my_updateTime"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.projects.locations.buckets.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" Example: "projects/my-project-id/locations/my-location/buckets/my-bucket-id".
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Locations$Buckets$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Locations$Buckets$Get, options?: MethodOptions): GaxiosPromise<Schema$LogBucket>;
        get(params: Params$Resource$Projects$Locations$Buckets$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Locations$Buckets$Get, options: MethodOptions | BodyResponseCallback<Schema$LogBucket>, callback: BodyResponseCallback<Schema$LogBucket>): void;
        get(params: Params$Resource$Projects$Locations$Buckets$Get, callback: BodyResponseCallback<Schema$LogBucket>): void;
        get(callback: BodyResponseCallback<Schema$LogBucket>): void;
        /**
         * logging.projects.locations.buckets.list
         * @desc Lists buckets (Beta).
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.projects.locations.buckets.list({
         *     // Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         *     pageSize: 'placeholder-value',
         *     // Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         *     pageToken: 'placeholder-value',
         *     // Required. The parent resource whose buckets are to be listed:
         *     // "projects/[PROJECT_ID]/locations/[LOCATION_ID]"
         *     // "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]"
         *     // "folders/[FOLDER_ID]/locations/[LOCATION_ID]"
         *     // Note: The locations portion of the resource must be specified, but supplying the character - in place of LOCATION_ID will return all buckets.
         *     parent: 'projects/my-project/locations/my-location',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "buckets": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.projects.locations.buckets.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         * @param {string=} params.pageToken Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         * @param {string} params.parent Required. The parent resource whose buckets are to be listed: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" Note: The locations portion of the resource must be specified, but supplying the character - in place of LOCATION_ID will return all buckets.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Locations$Buckets$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Locations$Buckets$List, options?: MethodOptions): GaxiosPromise<Schema$ListBucketsResponse>;
        list(params: Params$Resource$Projects$Locations$Buckets$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Locations$Buckets$List, options: MethodOptions | BodyResponseCallback<Schema$ListBucketsResponse>, callback: BodyResponseCallback<Schema$ListBucketsResponse>): void;
        list(params: Params$Resource$Projects$Locations$Buckets$List, callback: BodyResponseCallback<Schema$ListBucketsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListBucketsResponse>): void;
        /**
         * logging.projects.locations.buckets.patch
         * @desc Updates a bucket. This method replaces the following fields in the existing bucket with values from the new bucket: retention_periodIf the retention period is decreased and the bucket is locked, FAILED_PRECONDITION will be returned.If the bucket has a LifecycleState of DELETE_REQUESTED, FAILED_PRECONDITION will be returned.A buckets region may not be modified after it is created. This method is in Beta.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.projects.locations.buckets.patch({
         *     // Required. The full resource name of the bucket to update.
         *     // "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
         *     // Example: "projects/my-project-id/locations/my-location/buckets/my-bucket-id". Also requires permission "resourcemanager.projects.updateLiens" to set the locked property
         *     name: 'projects/my-project/locations/my-location/buckets/my-bucket',
         *     // Required. Field mask that specifies the fields in bucket that need an update. A bucket field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=retention_days.
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "createTime": "my_createTime",
         *       //   "description": "my_description",
         *       //   "lifecycleState": "my_lifecycleState",
         *       //   "name": "my_name",
         *       //   "retentionDays": 0,
         *       //   "updateTime": "my_updateTime"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "lifecycleState": "my_lifecycleState",
         *   //   "name": "my_name",
         *   //   "retentionDays": 0,
         *   //   "updateTime": "my_updateTime"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.projects.locations.buckets.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The full resource name of the bucket to update. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" Example: "projects/my-project-id/locations/my-location/buckets/my-bucket-id". Also requires permission "resourcemanager.projects.updateLiens" to set the locked property
         * @param {string=} params.updateMask Required. Field mask that specifies the fields in bucket that need an update. A bucket field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=retention_days.
         * @param {().LogBucket} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Projects$Locations$Buckets$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Projects$Locations$Buckets$Patch, options?: MethodOptions): GaxiosPromise<Schema$LogBucket>;
        patch(params: Params$Resource$Projects$Locations$Buckets$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Projects$Locations$Buckets$Patch, options: MethodOptions | BodyResponseCallback<Schema$LogBucket>, callback: BodyResponseCallback<Schema$LogBucket>): void;
        patch(params: Params$Resource$Projects$Locations$Buckets$Patch, callback: BodyResponseCallback<Schema$LogBucket>): void;
        patch(callback: BodyResponseCallback<Schema$LogBucket>): void;
    }
    export interface Params$Resource$Projects$Locations$Buckets$Get extends StandardParameters {
        /**
         * Required. The resource name of the bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" Example: "projects/my-project-id/locations/my-location/buckets/my-bucket-id".
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Locations$Buckets$List extends StandardParameters {
        /**
         * Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         */
        pageSize?: number;
        /**
         * Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         */
        pageToken?: string;
        /**
         * Required. The parent resource whose buckets are to be listed: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" Note: The locations portion of the resource must be specified, but supplying the character - in place of LOCATION_ID will return all buckets.
         */
        parent?: string;
    }
    export interface Params$Resource$Projects$Locations$Buckets$Patch extends StandardParameters {
        /**
         * Required. The full resource name of the bucket to update. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" Example: "projects/my-project-id/locations/my-location/buckets/my-bucket-id". Also requires permission "resourcemanager.projects.updateLiens" to set the locked property
         */
        name?: string;
        /**
         * Required. Field mask that specifies the fields in bucket that need an update. A bucket field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=retention_days.
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$LogBucket;
    }
    export class Resource$Projects$Logs {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * logging.projects.logs.delete
         * @desc Deletes all the log entries in a log. The log reappears if it receives new entries. Log entries written shortly before the delete operation might not be deleted. Entries received after the delete operation with a timestamp before the operation will be deleted.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.projects.logs.delete({
         *     // Required. The resource name of the log to delete:
         *     // "projects/[PROJECT_ID]/logs/[LOG_ID]"
         *     // "organizations/[ORGANIZATION_ID]/logs/[LOG_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/logs/[LOG_ID]"
         *     // "folders/[FOLDER_ID]/logs/[LOG_ID]"
         *     // [LOG_ID] must be URL-encoded. For example, "projects/my-project-id/logs/syslog", "organizations/1234567890/logs/cloudresourcemanager.googleapis.com%2Factivity". For more information about log names, see LogEntry.
         *     logName: 'projects/my-project/logs/my-log',
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
         * @alias logging.projects.logs.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.logName Required. The resource name of the log to delete: "projects/[PROJECT_ID]/logs/[LOG_ID]" "organizations/[ORGANIZATION_ID]/logs/[LOG_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/logs/[LOG_ID]" "folders/[FOLDER_ID]/logs/[LOG_ID]" [LOG_ID] must be URL-encoded. For example, "projects/my-project-id/logs/syslog", "organizations/1234567890/logs/cloudresourcemanager.googleapis.com%2Factivity". For more information about log names, see LogEntry.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Projects$Logs$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Projects$Logs$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Projects$Logs$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Projects$Logs$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Projects$Logs$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * logging.projects.logs.list
         * @desc Lists the logs in projects, organizations, folders, or billing accounts. Only logs that have entries are listed.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.projects.logs.list({
         *     // Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         *     pageSize: 'placeholder-value',
         *     // Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         *     pageToken: 'placeholder-value',
         *     // Required. The resource name that owns the logs:
         *     // "projects/[PROJECT_ID]"
         *     // "organizations/[ORGANIZATION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]"
         *     // "folders/[FOLDER_ID]"
         *     //
         *     parent: 'projects/my-project',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "logNames": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.projects.logs.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         * @param {string=} params.pageToken Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         * @param {string} params.parent Required. The resource name that owns the logs: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]"
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Logs$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Logs$List, options?: MethodOptions): GaxiosPromise<Schema$ListLogsResponse>;
        list(params: Params$Resource$Projects$Logs$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Logs$List, options: MethodOptions | BodyResponseCallback<Schema$ListLogsResponse>, callback: BodyResponseCallback<Schema$ListLogsResponse>): void;
        list(params: Params$Resource$Projects$Logs$List, callback: BodyResponseCallback<Schema$ListLogsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListLogsResponse>): void;
    }
    export interface Params$Resource$Projects$Logs$Delete extends StandardParameters {
        /**
         * Required. The resource name of the log to delete: "projects/[PROJECT_ID]/logs/[LOG_ID]" "organizations/[ORGANIZATION_ID]/logs/[LOG_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/logs/[LOG_ID]" "folders/[FOLDER_ID]/logs/[LOG_ID]" [LOG_ID] must be URL-encoded. For example, "projects/my-project-id/logs/syslog", "organizations/1234567890/logs/cloudresourcemanager.googleapis.com%2Factivity". For more information about log names, see LogEntry.
         */
        logName?: string;
    }
    export interface Params$Resource$Projects$Logs$List extends StandardParameters {
        /**
         * Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         */
        pageSize?: number;
        /**
         * Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         */
        pageToken?: string;
        /**
         * Required. The resource name that owns the logs: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]"
         */
        parent?: string;
    }
    export class Resource$Projects$Metrics {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * logging.projects.metrics.create
         * @desc Creates a logs-based metric.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.write',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.projects.metrics.create({
         *     // Required. The resource name of the project in which to create the metric:
         *     // "projects/[PROJECT_ID]"
         *     // The new metric must be provided in the request.
         *     parent: 'projects/my-project',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "bucketOptions": {},
         *       //   "createTime": "my_createTime",
         *       //   "description": "my_description",
         *       //   "filter": "my_filter",
         *       //   "labelExtractors": {},
         *       //   "metricDescriptor": {},
         *       //   "name": "my_name",
         *       //   "updateTime": "my_updateTime",
         *       //   "valueExtractor": "my_valueExtractor",
         *       //   "version": "my_version"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bucketOptions": {},
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "filter": "my_filter",
         *   //   "labelExtractors": {},
         *   //   "metricDescriptor": {},
         *   //   "name": "my_name",
         *   //   "updateTime": "my_updateTime",
         *   //   "valueExtractor": "my_valueExtractor",
         *   //   "version": "my_version"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.projects.metrics.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent Required. The resource name of the project in which to create the metric: "projects/[PROJECT_ID]" The new metric must be provided in the request.
         * @param {().LogMetric} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Projects$Metrics$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Projects$Metrics$Create, options?: MethodOptions): GaxiosPromise<Schema$LogMetric>;
        create(params: Params$Resource$Projects$Metrics$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Projects$Metrics$Create, options: MethodOptions | BodyResponseCallback<Schema$LogMetric>, callback: BodyResponseCallback<Schema$LogMetric>): void;
        create(params: Params$Resource$Projects$Metrics$Create, callback: BodyResponseCallback<Schema$LogMetric>): void;
        create(callback: BodyResponseCallback<Schema$LogMetric>): void;
        /**
         * logging.projects.metrics.delete
         * @desc Deletes a logs-based metric.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.write',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.projects.metrics.delete({
         *     // Required. The resource name of the metric to delete:
         *     // "projects/[PROJECT_ID]/metrics/[METRIC_ID]"
         *     //
         *     metricName: 'projects/my-project/metrics/my-metric',
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
         * @alias logging.projects.metrics.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.metricName Required. The resource name of the metric to delete: "projects/[PROJECT_ID]/metrics/[METRIC_ID]"
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Projects$Metrics$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Projects$Metrics$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Projects$Metrics$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Projects$Metrics$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Projects$Metrics$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * logging.projects.metrics.get
         * @desc Gets a logs-based metric.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.projects.metrics.get({
         *     // Required. The resource name of the desired metric:
         *     // "projects/[PROJECT_ID]/metrics/[METRIC_ID]"
         *     //
         *     metricName: 'projects/my-project/metrics/my-metric',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bucketOptions": {},
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "filter": "my_filter",
         *   //   "labelExtractors": {},
         *   //   "metricDescriptor": {},
         *   //   "name": "my_name",
         *   //   "updateTime": "my_updateTime",
         *   //   "valueExtractor": "my_valueExtractor",
         *   //   "version": "my_version"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.projects.metrics.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.metricName Required. The resource name of the desired metric: "projects/[PROJECT_ID]/metrics/[METRIC_ID]"
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Metrics$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Metrics$Get, options?: MethodOptions): GaxiosPromise<Schema$LogMetric>;
        get(params: Params$Resource$Projects$Metrics$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Metrics$Get, options: MethodOptions | BodyResponseCallback<Schema$LogMetric>, callback: BodyResponseCallback<Schema$LogMetric>): void;
        get(params: Params$Resource$Projects$Metrics$Get, callback: BodyResponseCallback<Schema$LogMetric>): void;
        get(callback: BodyResponseCallback<Schema$LogMetric>): void;
        /**
         * logging.projects.metrics.list
         * @desc Lists logs-based metrics.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.projects.metrics.list({
         *     // Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         *     pageSize: 'placeholder-value',
         *     // Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         *     pageToken: 'placeholder-value',
         *     // Required. The name of the project containing the metrics:
         *     // "projects/[PROJECT_ID]"
         *     //
         *     parent: 'projects/my-project',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "metrics": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.projects.metrics.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         * @param {string=} params.pageToken Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         * @param {string} params.parent Required. The name of the project containing the metrics: "projects/[PROJECT_ID]"
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Metrics$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Metrics$List, options?: MethodOptions): GaxiosPromise<Schema$ListLogMetricsResponse>;
        list(params: Params$Resource$Projects$Metrics$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Metrics$List, options: MethodOptions | BodyResponseCallback<Schema$ListLogMetricsResponse>, callback: BodyResponseCallback<Schema$ListLogMetricsResponse>): void;
        list(params: Params$Resource$Projects$Metrics$List, callback: BodyResponseCallback<Schema$ListLogMetricsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListLogMetricsResponse>): void;
        /**
         * logging.projects.metrics.update
         * @desc Creates or updates a logs-based metric.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.write',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.projects.metrics.update({
         *     // Required. The resource name of the metric to update:
         *     // "projects/[PROJECT_ID]/metrics/[METRIC_ID]"
         *     // The updated metric must be provided in the request and it's name field must be the same as [METRIC_ID] If the metric does not exist in [PROJECT_ID], then a new metric is created.
         *     metricName: 'projects/my-project/metrics/my-metric',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "bucketOptions": {},
         *       //   "createTime": "my_createTime",
         *       //   "description": "my_description",
         *       //   "filter": "my_filter",
         *       //   "labelExtractors": {},
         *       //   "metricDescriptor": {},
         *       //   "name": "my_name",
         *       //   "updateTime": "my_updateTime",
         *       //   "valueExtractor": "my_valueExtractor",
         *       //   "version": "my_version"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bucketOptions": {},
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "filter": "my_filter",
         *   //   "labelExtractors": {},
         *   //   "metricDescriptor": {},
         *   //   "name": "my_name",
         *   //   "updateTime": "my_updateTime",
         *   //   "valueExtractor": "my_valueExtractor",
         *   //   "version": "my_version"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.projects.metrics.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.metricName Required. The resource name of the metric to update: "projects/[PROJECT_ID]/metrics/[METRIC_ID]" The updated metric must be provided in the request and it's name field must be the same as [METRIC_ID] If the metric does not exist in [PROJECT_ID], then a new metric is created.
         * @param {().LogMetric} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Projects$Metrics$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Projects$Metrics$Update, options?: MethodOptions): GaxiosPromise<Schema$LogMetric>;
        update(params: Params$Resource$Projects$Metrics$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Projects$Metrics$Update, options: MethodOptions | BodyResponseCallback<Schema$LogMetric>, callback: BodyResponseCallback<Schema$LogMetric>): void;
        update(params: Params$Resource$Projects$Metrics$Update, callback: BodyResponseCallback<Schema$LogMetric>): void;
        update(callback: BodyResponseCallback<Schema$LogMetric>): void;
    }
    export interface Params$Resource$Projects$Metrics$Create extends StandardParameters {
        /**
         * Required. The resource name of the project in which to create the metric: "projects/[PROJECT_ID]" The new metric must be provided in the request.
         */
        parent?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$LogMetric;
    }
    export interface Params$Resource$Projects$Metrics$Delete extends StandardParameters {
        /**
         * Required. The resource name of the metric to delete: "projects/[PROJECT_ID]/metrics/[METRIC_ID]"
         */
        metricName?: string;
    }
    export interface Params$Resource$Projects$Metrics$Get extends StandardParameters {
        /**
         * Required. The resource name of the desired metric: "projects/[PROJECT_ID]/metrics/[METRIC_ID]"
         */
        metricName?: string;
    }
    export interface Params$Resource$Projects$Metrics$List extends StandardParameters {
        /**
         * Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         */
        pageSize?: number;
        /**
         * Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         */
        pageToken?: string;
        /**
         * Required. The name of the project containing the metrics: "projects/[PROJECT_ID]"
         */
        parent?: string;
    }
    export interface Params$Resource$Projects$Metrics$Update extends StandardParameters {
        /**
         * Required. The resource name of the metric to update: "projects/[PROJECT_ID]/metrics/[METRIC_ID]" The updated metric must be provided in the request and it's name field must be the same as [METRIC_ID] If the metric does not exist in [PROJECT_ID], then a new metric is created.
         */
        metricName?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$LogMetric;
    }
    export class Resource$Projects$Sinks {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * logging.projects.sinks.create
         * @desc Creates a sink that exports specified log entries to a destination. The export of newly-ingested log entries begins immediately, unless the sink's writer_identity is not permitted to write to the destination. A sink can export log entries only from the resource owning the sink.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.projects.sinks.create({
         *     // Required. The resource in which to create the sink:
         *     // "projects/[PROJECT_ID]"
         *     // "organizations/[ORGANIZATION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]"
         *     // "folders/[FOLDER_ID]"
         *     // Examples: "projects/my-logging-project", "organizations/123456789".
         *     parent: 'projects/my-project',
         *     // Optional. Determines the kind of IAM identity returned as writer_identity in the new sink. If this value is omitted or set to false, and if the sink's parent is a project, then the value returned as writer_identity is the same group or service account used by Logging before the addition of writer identities to this API. The sink's destination must be in the same project as the sink itself.If this field is set to true, or if the sink is owned by a non-project resource such as an organization, then the value of writer_identity will be a unique service account used only for exports from the new sink. For more information, see writer_identity in LogSink.
         *     uniqueWriterIdentity: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "bigqueryOptions": {},
         *       //   "createTime": "my_createTime",
         *       //   "description": "my_description",
         *       //   "destination": "my_destination",
         *       //   "disabled": false,
         *       //   "filter": "my_filter",
         *       //   "includeChildren": false,
         *       //   "name": "my_name",
         *       //   "outputVersionFormat": "my_outputVersionFormat",
         *       //   "updateTime": "my_updateTime",
         *       //   "writerIdentity": "my_writerIdentity"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bigqueryOptions": {},
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "destination": "my_destination",
         *   //   "disabled": false,
         *   //   "filter": "my_filter",
         *   //   "includeChildren": false,
         *   //   "name": "my_name",
         *   //   "outputVersionFormat": "my_outputVersionFormat",
         *   //   "updateTime": "my_updateTime",
         *   //   "writerIdentity": "my_writerIdentity"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.projects.sinks.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent Required. The resource in which to create the sink: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" Examples: "projects/my-logging-project", "organizations/123456789".
         * @param {boolean=} params.uniqueWriterIdentity Optional. Determines the kind of IAM identity returned as writer_identity in the new sink. If this value is omitted or set to false, and if the sink's parent is a project, then the value returned as writer_identity is the same group or service account used by Logging before the addition of writer identities to this API. The sink's destination must be in the same project as the sink itself.If this field is set to true, or if the sink is owned by a non-project resource such as an organization, then the value of writer_identity will be a unique service account used only for exports from the new sink. For more information, see writer_identity in LogSink.
         * @param {().LogSink} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Projects$Sinks$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Projects$Sinks$Create, options?: MethodOptions): GaxiosPromise<Schema$LogSink>;
        create(params: Params$Resource$Projects$Sinks$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Projects$Sinks$Create, options: MethodOptions | BodyResponseCallback<Schema$LogSink>, callback: BodyResponseCallback<Schema$LogSink>): void;
        create(params: Params$Resource$Projects$Sinks$Create, callback: BodyResponseCallback<Schema$LogSink>): void;
        create(callback: BodyResponseCallback<Schema$LogSink>): void;
        /**
         * logging.projects.sinks.delete
         * @desc Deletes a sink. If the sink has a unique writer_identity, then that service account is also deleted.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.projects.sinks.delete({
         *     // Required. The full resource name of the sink to delete, including the parent resource and the sink identifier:
         *     // "projects/[PROJECT_ID]/sinks/[SINK_ID]"
         *     // "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]"
         *     // "folders/[FOLDER_ID]/sinks/[SINK_ID]"
         *     // Example: "projects/my-project-id/sinks/my-sink-id".
         *     sinkName: 'projects/my-project/sinks/my-sink',
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
         * @alias logging.projects.sinks.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.sinkName Required. The full resource name of the sink to delete, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" Example: "projects/my-project-id/sinks/my-sink-id".
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Projects$Sinks$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Projects$Sinks$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Projects$Sinks$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Projects$Sinks$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Projects$Sinks$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * logging.projects.sinks.get
         * @desc Gets a sink.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.projects.sinks.get({
         *     // Required. The resource name of the sink:
         *     // "projects/[PROJECT_ID]/sinks/[SINK_ID]"
         *     // "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]"
         *     // "folders/[FOLDER_ID]/sinks/[SINK_ID]"
         *     // Example: "projects/my-project-id/sinks/my-sink-id".
         *     sinkName: 'projects/my-project/sinks/my-sink',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bigqueryOptions": {},
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "destination": "my_destination",
         *   //   "disabled": false,
         *   //   "filter": "my_filter",
         *   //   "includeChildren": false,
         *   //   "name": "my_name",
         *   //   "outputVersionFormat": "my_outputVersionFormat",
         *   //   "updateTime": "my_updateTime",
         *   //   "writerIdentity": "my_writerIdentity"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.projects.sinks.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.sinkName Required. The resource name of the sink: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" Example: "projects/my-project-id/sinks/my-sink-id".
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Sinks$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Sinks$Get, options?: MethodOptions): GaxiosPromise<Schema$LogSink>;
        get(params: Params$Resource$Projects$Sinks$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Sinks$Get, options: MethodOptions | BodyResponseCallback<Schema$LogSink>, callback: BodyResponseCallback<Schema$LogSink>): void;
        get(params: Params$Resource$Projects$Sinks$Get, callback: BodyResponseCallback<Schema$LogSink>): void;
        get(callback: BodyResponseCallback<Schema$LogSink>): void;
        /**
         * logging.projects.sinks.list
         * @desc Lists sinks.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.projects.sinks.list({
         *     // Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         *     pageSize: 'placeholder-value',
         *     // Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         *     pageToken: 'placeholder-value',
         *     // Required. The parent resource whose sinks are to be listed:
         *     // "projects/[PROJECT_ID]"
         *     // "organizations/[ORGANIZATION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]"
         *     // "folders/[FOLDER_ID]"
         *     //
         *     parent: 'projects/my-project',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "sinks": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.projects.sinks.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         * @param {string=} params.pageToken Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         * @param {string} params.parent Required. The parent resource whose sinks are to be listed: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]"
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Sinks$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Sinks$List, options?: MethodOptions): GaxiosPromise<Schema$ListSinksResponse>;
        list(params: Params$Resource$Projects$Sinks$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Sinks$List, options: MethodOptions | BodyResponseCallback<Schema$ListSinksResponse>, callback: BodyResponseCallback<Schema$ListSinksResponse>): void;
        list(params: Params$Resource$Projects$Sinks$List, callback: BodyResponseCallback<Schema$ListSinksResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListSinksResponse>): void;
        /**
         * logging.projects.sinks.patch
         * @desc Updates a sink. This method replaces the following fields in the existing sink with values from the new sink: destination, and filter.The updated sink might also have a new writer_identity; see the unique_writer_identity field.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.projects.sinks.patch({
         *     // Required. The full resource name of the sink to update, including the parent resource and the sink identifier:
         *     // "projects/[PROJECT_ID]/sinks/[SINK_ID]"
         *     // "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]"
         *     // "folders/[FOLDER_ID]/sinks/[SINK_ID]"
         *     // Example: "projects/my-project-id/sinks/my-sink-id".
         *     sinkName: 'projects/my-project/sinks/my-sink',
         *     // Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field:
         *     // If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity.
         *     // If the old value is false and the new value is true, then writer_identity is changed to a unique service account.
         *     // It is an error if the old value is true and the new value is set to false or defaulted to false.
         *     uniqueWriterIdentity: 'placeholder-value',
         *     // Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:  destination,filter,includeChildren At some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=filter.
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "bigqueryOptions": {},
         *       //   "createTime": "my_createTime",
         *       //   "description": "my_description",
         *       //   "destination": "my_destination",
         *       //   "disabled": false,
         *       //   "filter": "my_filter",
         *       //   "includeChildren": false,
         *       //   "name": "my_name",
         *       //   "outputVersionFormat": "my_outputVersionFormat",
         *       //   "updateTime": "my_updateTime",
         *       //   "writerIdentity": "my_writerIdentity"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bigqueryOptions": {},
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "destination": "my_destination",
         *   //   "disabled": false,
         *   //   "filter": "my_filter",
         *   //   "includeChildren": false,
         *   //   "name": "my_name",
         *   //   "outputVersionFormat": "my_outputVersionFormat",
         *   //   "updateTime": "my_updateTime",
         *   //   "writerIdentity": "my_writerIdentity"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.projects.sinks.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.sinkName Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" Example: "projects/my-project-id/sinks/my-sink-id".
         * @param {boolean=} params.uniqueWriterIdentity Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field: If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity. If the old value is false and the new value is true, then writer_identity is changed to a unique service account. It is an error if the old value is true and the new value is set to false or defaulted to false.
         * @param {string=} params.updateMask Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:  destination,filter,includeChildren At some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=filter.
         * @param {().LogSink} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Projects$Sinks$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Projects$Sinks$Patch, options?: MethodOptions): GaxiosPromise<Schema$LogSink>;
        patch(params: Params$Resource$Projects$Sinks$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Projects$Sinks$Patch, options: MethodOptions | BodyResponseCallback<Schema$LogSink>, callback: BodyResponseCallback<Schema$LogSink>): void;
        patch(params: Params$Resource$Projects$Sinks$Patch, callback: BodyResponseCallback<Schema$LogSink>): void;
        patch(callback: BodyResponseCallback<Schema$LogSink>): void;
        /**
         * logging.projects.sinks.update
         * @desc Updates a sink. This method replaces the following fields in the existing sink with values from the new sink: destination, and filter.The updated sink might also have a new writer_identity; see the unique_writer_identity field.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.projects.sinks.update({
         *     // Required. The full resource name of the sink to update, including the parent resource and the sink identifier:
         *     // "projects/[PROJECT_ID]/sinks/[SINK_ID]"
         *     // "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]"
         *     // "folders/[FOLDER_ID]/sinks/[SINK_ID]"
         *     // Example: "projects/my-project-id/sinks/my-sink-id".
         *     sinkName: 'projects/my-project/sinks/my-sink',
         *     // Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field:
         *     // If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity.
         *     // If the old value is false and the new value is true, then writer_identity is changed to a unique service account.
         *     // It is an error if the old value is true and the new value is set to false or defaulted to false.
         *     uniqueWriterIdentity: 'placeholder-value',
         *     // Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:  destination,filter,includeChildren At some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=filter.
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "bigqueryOptions": {},
         *       //   "createTime": "my_createTime",
         *       //   "description": "my_description",
         *       //   "destination": "my_destination",
         *       //   "disabled": false,
         *       //   "filter": "my_filter",
         *       //   "includeChildren": false,
         *       //   "name": "my_name",
         *       //   "outputVersionFormat": "my_outputVersionFormat",
         *       //   "updateTime": "my_updateTime",
         *       //   "writerIdentity": "my_writerIdentity"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bigqueryOptions": {},
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "destination": "my_destination",
         *   //   "disabled": false,
         *   //   "filter": "my_filter",
         *   //   "includeChildren": false,
         *   //   "name": "my_name",
         *   //   "outputVersionFormat": "my_outputVersionFormat",
         *   //   "updateTime": "my_updateTime",
         *   //   "writerIdentity": "my_writerIdentity"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.projects.sinks.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.sinkName Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" Example: "projects/my-project-id/sinks/my-sink-id".
         * @param {boolean=} params.uniqueWriterIdentity Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field: If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity. If the old value is false and the new value is true, then writer_identity is changed to a unique service account. It is an error if the old value is true and the new value is set to false or defaulted to false.
         * @param {string=} params.updateMask Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:  destination,filter,includeChildren At some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=filter.
         * @param {().LogSink} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Projects$Sinks$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Projects$Sinks$Update, options?: MethodOptions): GaxiosPromise<Schema$LogSink>;
        update(params: Params$Resource$Projects$Sinks$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Projects$Sinks$Update, options: MethodOptions | BodyResponseCallback<Schema$LogSink>, callback: BodyResponseCallback<Schema$LogSink>): void;
        update(params: Params$Resource$Projects$Sinks$Update, callback: BodyResponseCallback<Schema$LogSink>): void;
        update(callback: BodyResponseCallback<Schema$LogSink>): void;
    }
    export interface Params$Resource$Projects$Sinks$Create extends StandardParameters {
        /**
         * Required. The resource in which to create the sink: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" Examples: "projects/my-logging-project", "organizations/123456789".
         */
        parent?: string;
        /**
         * Optional. Determines the kind of IAM identity returned as writer_identity in the new sink. If this value is omitted or set to false, and if the sink's parent is a project, then the value returned as writer_identity is the same group or service account used by Logging before the addition of writer identities to this API. The sink's destination must be in the same project as the sink itself.If this field is set to true, or if the sink is owned by a non-project resource such as an organization, then the value of writer_identity will be a unique service account used only for exports from the new sink. For more information, see writer_identity in LogSink.
         */
        uniqueWriterIdentity?: boolean;
        /**
         * Request body metadata
         */
        requestBody?: Schema$LogSink;
    }
    export interface Params$Resource$Projects$Sinks$Delete extends StandardParameters {
        /**
         * Required. The full resource name of the sink to delete, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" Example: "projects/my-project-id/sinks/my-sink-id".
         */
        sinkName?: string;
    }
    export interface Params$Resource$Projects$Sinks$Get extends StandardParameters {
        /**
         * Required. The resource name of the sink: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" Example: "projects/my-project-id/sinks/my-sink-id".
         */
        sinkName?: string;
    }
    export interface Params$Resource$Projects$Sinks$List extends StandardParameters {
        /**
         * Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         */
        pageSize?: number;
        /**
         * Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         */
        pageToken?: string;
        /**
         * Required. The parent resource whose sinks are to be listed: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]"
         */
        parent?: string;
    }
    export interface Params$Resource$Projects$Sinks$Patch extends StandardParameters {
        /**
         * Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" Example: "projects/my-project-id/sinks/my-sink-id".
         */
        sinkName?: string;
        /**
         * Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field: If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity. If the old value is false and the new value is true, then writer_identity is changed to a unique service account. It is an error if the old value is true and the new value is set to false or defaulted to false.
         */
        uniqueWriterIdentity?: boolean;
        /**
         * Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:  destination,filter,includeChildren At some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=filter.
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$LogSink;
    }
    export interface Params$Resource$Projects$Sinks$Update extends StandardParameters {
        /**
         * Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" Example: "projects/my-project-id/sinks/my-sink-id".
         */
        sinkName?: string;
        /**
         * Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field: If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity. If the old value is false and the new value is true, then writer_identity is changed to a unique service account. It is an error if the old value is true and the new value is set to false or defaulted to false.
         */
        uniqueWriterIdentity?: boolean;
        /**
         * Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:  destination,filter,includeChildren At some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=filter.
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$LogSink;
    }
    export class Resource$Sinks {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * logging.sinks.create
         * @desc Creates a sink that exports specified log entries to a destination. The export of newly-ingested log entries begins immediately, unless the sink's writer_identity is not permitted to write to the destination. A sink can export log entries only from the resource owning the sink.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.sinks.create({
         *     // Required. The resource in which to create the sink:
         *     // "projects/[PROJECT_ID]"
         *     // "organizations/[ORGANIZATION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]"
         *     // "folders/[FOLDER_ID]"
         *     // Examples: "projects/my-logging-project", "organizations/123456789".
         *     parent: '[^/]+/[^/]+',
         *     // Optional. Determines the kind of IAM identity returned as writer_identity in the new sink. If this value is omitted or set to false, and if the sink's parent is a project, then the value returned as writer_identity is the same group or service account used by Logging before the addition of writer identities to this API. The sink's destination must be in the same project as the sink itself.If this field is set to true, or if the sink is owned by a non-project resource such as an organization, then the value of writer_identity will be a unique service account used only for exports from the new sink. For more information, see writer_identity in LogSink.
         *     uniqueWriterIdentity: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "bigqueryOptions": {},
         *       //   "createTime": "my_createTime",
         *       //   "description": "my_description",
         *       //   "destination": "my_destination",
         *       //   "disabled": false,
         *       //   "filter": "my_filter",
         *       //   "includeChildren": false,
         *       //   "name": "my_name",
         *       //   "outputVersionFormat": "my_outputVersionFormat",
         *       //   "updateTime": "my_updateTime",
         *       //   "writerIdentity": "my_writerIdentity"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bigqueryOptions": {},
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "destination": "my_destination",
         *   //   "disabled": false,
         *   //   "filter": "my_filter",
         *   //   "includeChildren": false,
         *   //   "name": "my_name",
         *   //   "outputVersionFormat": "my_outputVersionFormat",
         *   //   "updateTime": "my_updateTime",
         *   //   "writerIdentity": "my_writerIdentity"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.sinks.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent Required. The resource in which to create the sink: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" Examples: "projects/my-logging-project", "organizations/123456789".
         * @param {boolean=} params.uniqueWriterIdentity Optional. Determines the kind of IAM identity returned as writer_identity in the new sink. If this value is omitted or set to false, and if the sink's parent is a project, then the value returned as writer_identity is the same group or service account used by Logging before the addition of writer identities to this API. The sink's destination must be in the same project as the sink itself.If this field is set to true, or if the sink is owned by a non-project resource such as an organization, then the value of writer_identity will be a unique service account used only for exports from the new sink. For more information, see writer_identity in LogSink.
         * @param {().LogSink} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Sinks$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Sinks$Create, options?: MethodOptions): GaxiosPromise<Schema$LogSink>;
        create(params: Params$Resource$Sinks$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Sinks$Create, options: MethodOptions | BodyResponseCallback<Schema$LogSink>, callback: BodyResponseCallback<Schema$LogSink>): void;
        create(params: Params$Resource$Sinks$Create, callback: BodyResponseCallback<Schema$LogSink>): void;
        create(callback: BodyResponseCallback<Schema$LogSink>): void;
        /**
         * logging.sinks.delete
         * @desc Deletes a sink. If the sink has a unique writer_identity, then that service account is also deleted.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.sinks.delete({
         *     // Required. The full resource name of the sink to delete, including the parent resource and the sink identifier:
         *     // "projects/[PROJECT_ID]/sinks/[SINK_ID]"
         *     // "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]"
         *     // "folders/[FOLDER_ID]/sinks/[SINK_ID]"
         *     // Example: "projects/my-project-id/sinks/my-sink-id".
         *     sinkName: '[^/]+/[^/]+/sinks/my-sink',
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
         * @alias logging.sinks.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.sinkName Required. The full resource name of the sink to delete, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" Example: "projects/my-project-id/sinks/my-sink-id".
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Sinks$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Sinks$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Sinks$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Sinks$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Sinks$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * logging.sinks.get
         * @desc Gets a sink.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.sinks.get({
         *     // Required. The resource name of the sink:
         *     // "projects/[PROJECT_ID]/sinks/[SINK_ID]"
         *     // "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]"
         *     // "folders/[FOLDER_ID]/sinks/[SINK_ID]"
         *     // Example: "projects/my-project-id/sinks/my-sink-id".
         *     sinkName: '[^/]+/[^/]+/sinks/my-sink',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bigqueryOptions": {},
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "destination": "my_destination",
         *   //   "disabled": false,
         *   //   "filter": "my_filter",
         *   //   "includeChildren": false,
         *   //   "name": "my_name",
         *   //   "outputVersionFormat": "my_outputVersionFormat",
         *   //   "updateTime": "my_updateTime",
         *   //   "writerIdentity": "my_writerIdentity"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.sinks.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.sinkName Required. The resource name of the sink: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" Example: "projects/my-project-id/sinks/my-sink-id".
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Sinks$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Sinks$Get, options?: MethodOptions): GaxiosPromise<Schema$LogSink>;
        get(params: Params$Resource$Sinks$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Sinks$Get, options: MethodOptions | BodyResponseCallback<Schema$LogSink>, callback: BodyResponseCallback<Schema$LogSink>): void;
        get(params: Params$Resource$Sinks$Get, callback: BodyResponseCallback<Schema$LogSink>): void;
        get(callback: BodyResponseCallback<Schema$LogSink>): void;
        /**
         * logging.sinks.list
         * @desc Lists sinks.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.sinks.list({
         *     // Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         *     pageSize: 'placeholder-value',
         *     // Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         *     pageToken: 'placeholder-value',
         *     // Required. The parent resource whose sinks are to be listed:
         *     // "projects/[PROJECT_ID]"
         *     // "organizations/[ORGANIZATION_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]"
         *     // "folders/[FOLDER_ID]"
         *     //
         *     parent: '[^/]+/[^/]+',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "sinks": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.sinks.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         * @param {string=} params.pageToken Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         * @param {string} params.parent Required. The parent resource whose sinks are to be listed: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]"
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Sinks$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Sinks$List, options?: MethodOptions): GaxiosPromise<Schema$ListSinksResponse>;
        list(params: Params$Resource$Sinks$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Sinks$List, options: MethodOptions | BodyResponseCallback<Schema$ListSinksResponse>, callback: BodyResponseCallback<Schema$ListSinksResponse>): void;
        list(params: Params$Resource$Sinks$List, callback: BodyResponseCallback<Schema$ListSinksResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListSinksResponse>): void;
        /**
         * logging.sinks.update
         * @desc Updates a sink. This method replaces the following fields in the existing sink with values from the new sink: destination, and filter.The updated sink might also have a new writer_identity; see the unique_writer_identity field.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.sinks.update({
         *     // Required. The full resource name of the sink to update, including the parent resource and the sink identifier:
         *     // "projects/[PROJECT_ID]/sinks/[SINK_ID]"
         *     // "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]"
         *     // "folders/[FOLDER_ID]/sinks/[SINK_ID]"
         *     // Example: "projects/my-project-id/sinks/my-sink-id".
         *     sinkName: '[^/]+/[^/]+/sinks/my-sink',
         *     // Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field:
         *     // If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity.
         *     // If the old value is false and the new value is true, then writer_identity is changed to a unique service account.
         *     // It is an error if the old value is true and the new value is set to false or defaulted to false.
         *     uniqueWriterIdentity: 'placeholder-value',
         *     // Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:  destination,filter,includeChildren At some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=filter.
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "bigqueryOptions": {},
         *       //   "createTime": "my_createTime",
         *       //   "description": "my_description",
         *       //   "destination": "my_destination",
         *       //   "disabled": false,
         *       //   "filter": "my_filter",
         *       //   "includeChildren": false,
         *       //   "name": "my_name",
         *       //   "outputVersionFormat": "my_outputVersionFormat",
         *       //   "updateTime": "my_updateTime",
         *       //   "writerIdentity": "my_writerIdentity"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bigqueryOptions": {},
         *   //   "createTime": "my_createTime",
         *   //   "description": "my_description",
         *   //   "destination": "my_destination",
         *   //   "disabled": false,
         *   //   "filter": "my_filter",
         *   //   "includeChildren": false,
         *   //   "name": "my_name",
         *   //   "outputVersionFormat": "my_outputVersionFormat",
         *   //   "updateTime": "my_updateTime",
         *   //   "writerIdentity": "my_writerIdentity"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.sinks.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.sinkName Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" Example: "projects/my-project-id/sinks/my-sink-id".
         * @param {boolean=} params.uniqueWriterIdentity Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field: If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity. If the old value is false and the new value is true, then writer_identity is changed to a unique service account. It is an error if the old value is true and the new value is set to false or defaulted to false.
         * @param {string=} params.updateMask Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:  destination,filter,includeChildren At some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=filter.
         * @param {().LogSink} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Sinks$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Sinks$Update, options?: MethodOptions): GaxiosPromise<Schema$LogSink>;
        update(params: Params$Resource$Sinks$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Sinks$Update, options: MethodOptions | BodyResponseCallback<Schema$LogSink>, callback: BodyResponseCallback<Schema$LogSink>): void;
        update(params: Params$Resource$Sinks$Update, callback: BodyResponseCallback<Schema$LogSink>): void;
        update(callback: BodyResponseCallback<Schema$LogSink>): void;
    }
    export interface Params$Resource$Sinks$Create extends StandardParameters {
        /**
         * Required. The resource in which to create the sink: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" Examples: "projects/my-logging-project", "organizations/123456789".
         */
        parent?: string;
        /**
         * Optional. Determines the kind of IAM identity returned as writer_identity in the new sink. If this value is omitted or set to false, and if the sink's parent is a project, then the value returned as writer_identity is the same group or service account used by Logging before the addition of writer identities to this API. The sink's destination must be in the same project as the sink itself.If this field is set to true, or if the sink is owned by a non-project resource such as an organization, then the value of writer_identity will be a unique service account used only for exports from the new sink. For more information, see writer_identity in LogSink.
         */
        uniqueWriterIdentity?: boolean;
        /**
         * Request body metadata
         */
        requestBody?: Schema$LogSink;
    }
    export interface Params$Resource$Sinks$Delete extends StandardParameters {
        /**
         * Required. The full resource name of the sink to delete, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" Example: "projects/my-project-id/sinks/my-sink-id".
         */
        sinkName?: string;
    }
    export interface Params$Resource$Sinks$Get extends StandardParameters {
        /**
         * Required. The resource name of the sink: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" Example: "projects/my-project-id/sinks/my-sink-id".
         */
        sinkName?: string;
    }
    export interface Params$Resource$Sinks$List extends StandardParameters {
        /**
         * Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of nextPageToken in the response indicates that more results might be available.
         */
        pageSize?: number;
        /**
         * Optional. If present, then retrieve the next batch of results from the preceding call to this method. pageToken must be the value of nextPageToken from the previous response. The values of other method parameters should be identical to those in the previous call.
         */
        pageToken?: string;
        /**
         * Required. The parent resource whose sinks are to be listed: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]"
         */
        parent?: string;
    }
    export interface Params$Resource$Sinks$Update extends StandardParameters {
        /**
         * Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" Example: "projects/my-project-id/sinks/my-sink-id".
         */
        sinkName?: string;
        /**
         * Optional. See sinks.create for a description of this field. When updating a sink, the effect of this field on the value of writer_identity in the updated sink depends on both the old and new values of this field: If the old and new values of this field are both false or both true, then there is no change to the sink's writer_identity. If the old value is false and the new value is true, then writer_identity is changed to a unique service account. It is an error if the old value is true and the new value is set to false or defaulted to false.
         */
        uniqueWriterIdentity?: boolean;
        /**
         * Optional. Field mask that specifies the fields in sink that need an update. A sink field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.An empty updateMask is temporarily treated as using the following mask for backwards compatibility purposes:  destination,filter,includeChildren At some point in the future, behavior will be removed and specifying an empty updateMask will be an error.For a detailed FieldMask definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskExample: updateMask=filter.
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$LogSink;
    }
    export class Resource$V2 {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * logging.getCmekSettings
         * @desc Gets the Logs Router CMEK settings for the given resource.Note: CMEK for the Logs Router can currently only be configured for GCP organizations. Once configured, it applies to all projects and folders in the GCP organization.See Enabling CMEK for Logs Router (https://cloud.google.com/logging/docs/routing/managed-encryption) for more information.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/logging.admin',
         *       'https://www.googleapis.com/auth/logging.read',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.getCmekSettings({
         *     // Required. The resource for which to retrieve CMEK settings.
         *     // "projects/[PROJECT_ID]/cmekSettings"
         *     // "organizations/[ORGANIZATION_ID]/cmekSettings"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/cmekSettings"
         *     // "folders/[FOLDER_ID]/cmekSettings"
         *     // Example: "organizations/12345/cmekSettings".Note: CMEK for the Logs Router can currently only be configured for GCP organizations. Once configured, it applies to all projects and folders in the GCP organization.
         *     name: '[^/]+/[^/]+',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "kmsKeyName": "my_kmsKeyName",
         *   //   "name": "my_name",
         *   //   "serviceAccountId": "my_serviceAccountId"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.getCmekSettings
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource for which to retrieve CMEK settings. "projects/[PROJECT_ID]/cmekSettings" "organizations/[ORGANIZATION_ID]/cmekSettings" "billingAccounts/[BILLING_ACCOUNT_ID]/cmekSettings" "folders/[FOLDER_ID]/cmekSettings" Example: "organizations/12345/cmekSettings".Note: CMEK for the Logs Router can currently only be configured for GCP organizations. Once configured, it applies to all projects and folders in the GCP organization.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getCmekSettings(params: Params$Resource$V2$Getcmeksettings, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getCmekSettings(params?: Params$Resource$V2$Getcmeksettings, options?: MethodOptions): GaxiosPromise<Schema$CmekSettings>;
        getCmekSettings(params: Params$Resource$V2$Getcmeksettings, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getCmekSettings(params: Params$Resource$V2$Getcmeksettings, options: MethodOptions | BodyResponseCallback<Schema$CmekSettings>, callback: BodyResponseCallback<Schema$CmekSettings>): void;
        getCmekSettings(params: Params$Resource$V2$Getcmeksettings, callback: BodyResponseCallback<Schema$CmekSettings>): void;
        getCmekSettings(callback: BodyResponseCallback<Schema$CmekSettings>): void;
        /**
         * logging.updateCmekSettings
         * @desc Updates the Logs Router CMEK settings for the given resource.Note: CMEK for the Logs Router can currently only be configured for GCP organizations. Once configured, it applies to all projects and folders in the GCP organization.UpdateCmekSettings will fail if 1) kms_key_name is invalid, or 2) the associated service account does not have the required roles/cloudkms.cryptoKeyEncrypterDecrypter role assigned for the key, or 3) access to the key is disabled.See Enabling CMEK for Logs Router (https://cloud.google.com/logging/docs/routing/managed-encryption) for more information.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/logging.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const logging = google.logging('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/logging.admin',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await logging.updateCmekSettings({
         *     // Required. The resource name for the CMEK settings to update.
         *     // "projects/[PROJECT_ID]/cmekSettings"
         *     // "organizations/[ORGANIZATION_ID]/cmekSettings"
         *     // "billingAccounts/[BILLING_ACCOUNT_ID]/cmekSettings"
         *     // "folders/[FOLDER_ID]/cmekSettings"
         *     // Example: "organizations/12345/cmekSettings".Note: CMEK for the Logs Router can currently only be configured for GCP organizations. Once configured, it applies to all projects and folders in the GCP organization.
         *     name: '[^/]+/[^/]+',
         *     // Optional. Field mask identifying which fields from cmek_settings should be updated. A field will be overwritten if and only if it is in the update mask. Output only fields cannot be updated.See FieldMask for more information.Example: "updateMask=kmsKeyName"
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "kmsKeyName": "my_kmsKeyName",
         *       //   "name": "my_name",
         *       //   "serviceAccountId": "my_serviceAccountId"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "kmsKeyName": "my_kmsKeyName",
         *   //   "name": "my_name",
         *   //   "serviceAccountId": "my_serviceAccountId"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias logging.updateCmekSettings
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name for the CMEK settings to update. "projects/[PROJECT_ID]/cmekSettings" "organizations/[ORGANIZATION_ID]/cmekSettings" "billingAccounts/[BILLING_ACCOUNT_ID]/cmekSettings" "folders/[FOLDER_ID]/cmekSettings" Example: "organizations/12345/cmekSettings".Note: CMEK for the Logs Router can currently only be configured for GCP organizations. Once configured, it applies to all projects and folders in the GCP organization.
         * @param {string=} params.updateMask Optional. Field mask identifying which fields from cmek_settings should be updated. A field will be overwritten if and only if it is in the update mask. Output only fields cannot be updated.See FieldMask for more information.Example: "updateMask=kmsKeyName"
         * @param {().CmekSettings} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        updateCmekSettings(params: Params$Resource$V2$Updatecmeksettings, options: StreamMethodOptions): GaxiosPromise<Readable>;
        updateCmekSettings(params?: Params$Resource$V2$Updatecmeksettings, options?: MethodOptions): GaxiosPromise<Schema$CmekSettings>;
        updateCmekSettings(params: Params$Resource$V2$Updatecmeksettings, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        updateCmekSettings(params: Params$Resource$V2$Updatecmeksettings, options: MethodOptions | BodyResponseCallback<Schema$CmekSettings>, callback: BodyResponseCallback<Schema$CmekSettings>): void;
        updateCmekSettings(params: Params$Resource$V2$Updatecmeksettings, callback: BodyResponseCallback<Schema$CmekSettings>): void;
        updateCmekSettings(callback: BodyResponseCallback<Schema$CmekSettings>): void;
    }
    export interface Params$Resource$V2$Getcmeksettings extends StandardParameters {
        /**
         * Required. The resource for which to retrieve CMEK settings. "projects/[PROJECT_ID]/cmekSettings" "organizations/[ORGANIZATION_ID]/cmekSettings" "billingAccounts/[BILLING_ACCOUNT_ID]/cmekSettings" "folders/[FOLDER_ID]/cmekSettings" Example: "organizations/12345/cmekSettings".Note: CMEK for the Logs Router can currently only be configured for GCP organizations. Once configured, it applies to all projects and folders in the GCP organization.
         */
        name?: string;
    }
    export interface Params$Resource$V2$Updatecmeksettings extends StandardParameters {
        /**
         * Required. The resource name for the CMEK settings to update. "projects/[PROJECT_ID]/cmekSettings" "organizations/[ORGANIZATION_ID]/cmekSettings" "billingAccounts/[BILLING_ACCOUNT_ID]/cmekSettings" "folders/[FOLDER_ID]/cmekSettings" Example: "organizations/12345/cmekSettings".Note: CMEK for the Logs Router can currently only be configured for GCP organizations. Once configured, it applies to all projects and folders in the GCP organization.
         */
        name?: string;
        /**
         * Optional. Field mask identifying which fields from cmek_settings should be updated. A field will be overwritten if and only if it is in the update mask. Output only fields cannot be updated.See FieldMask for more information.Example: "updateMask=kmsKeyName"
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$CmekSettings;
    }
    export {};
}
