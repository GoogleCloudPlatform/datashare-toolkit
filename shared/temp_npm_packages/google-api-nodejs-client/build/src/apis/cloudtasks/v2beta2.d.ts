/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace cloudtasks_v2beta2 {
    export interface Options extends GlobalOptions {
        version: 'v2beta2';
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
     * Cloud Tasks API
     *
     * Manages the execution of large numbers of distributed requests.
     *
     * @example
     * const {google} = require('googleapis');
     * const cloudtasks = google.cloudtasks('v2beta2');
     *
     * @namespace cloudtasks
     * @type {Function}
     * @version v2beta2
     * @variation v2beta2
     * @param {object=} options Options for Cloudtasks
     */
    export class Cloudtasks {
        context: APIRequestContext;
        projects: Resource$Projects;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    /**
     * Request message for acknowledging a task using AcknowledgeTask.
     */
    export interface Schema$AcknowledgeTaskRequest {
        /**
         * Required. The task&#39;s current schedule time, available in the schedule_time returned by LeaseTasks response or RenewLease response. This restriction is to ensure that your worker currently holds the lease.
         */
        scheduleTime?: string | null;
    }
    /**
     * App Engine HTTP request.  The message defines the HTTP request that is sent to an App Engine app when the task is dispatched.  This proto can only be used for tasks in a queue which has app_engine_http_target set.  Using AppEngineHttpRequest requires [`appengine.applications.get`](https://cloud.google.com/appengine/docs/admin-api/access-control) Google IAM permission for the project and the following scope:  `https://www.googleapis.com/auth/cloud-platform`  The task will be delivered to the App Engine app which belongs to the same project as the queue. For more information, see [How Requests are Routed](https://cloud.google.com/appengine/docs/standard/python/how-requests-are-routed) and how routing is affected by [dispatch files](https://cloud.google.com/appengine/docs/python/config/dispatchref). Traffic is encrypted during transport and never leaves Google datacenters. Because this traffic is carried over a communication mechanism internal to Google, you cannot explicitly set the protocol (for example, HTTP or HTTPS). The request to the handler, however, will appear to have used the HTTP protocol.  The AppEngineRouting used to construct the URL that the task is delivered to can be set at the queue-level or task-level:  * If set,   app_engine_routing_override   is used for all tasks in the queue, no matter what the setting   is for the   task-level app_engine_routing.   The `url` that the task will be sent to is:  * `url =` host `+`   relative_url  Tasks can be dispatched to secure app handlers, unsecure app handlers, and URIs restricted with [`login: admin`](https://cloud.google.com/appengine/docs/standard/python/config/appref). Because tasks are not run as any user, they cannot be dispatched to URIs restricted with [`login: required`](https://cloud.google.com/appengine/docs/standard/python/config/appref) Task dispatches also do not follow redirects.  The task attempt has succeeded if the app&#39;s request handler returns an HTTP response code in the range [`200` - `299`]. The task attempt has failed if the app&#39;s handler returns a non-2xx response code or Cloud Tasks does not receive response before the deadline. Failed tasks will be retried according to the retry configuration. `503` (Service Unavailable) is considered an App Engine system error instead of an application error and will cause Cloud Tasks&#39; traffic congestion control to temporarily throttle the queue&#39;s dispatches. Unlike other types of task targets, a `429` (Too Many Requests) response from an app handler does not cause traffic congestion control to throttle the queue.
     */
    export interface Schema$AppEngineHttpRequest {
        /**
         * Task-level setting for App Engine routing.  If set, app_engine_routing_override is used for all tasks in the queue, no matter what the setting is for the task-level app_engine_routing.
         */
        appEngineRouting?: Schema$AppEngineRouting;
        /**
         * HTTP request headers.  This map contains the header field names and values. Headers can be set when the task is created. Repeated headers are not supported but a header value can contain commas.  Cloud Tasks sets some headers to default values:  * `User-Agent`: By default, this header is   `&quot;AppEngine-Google; (+http://code.google.com/appengine)&quot;`.   This header can be modified, but Cloud Tasks will append   `&quot;AppEngine-Google; (+http://code.google.com/appengine)&quot;` to the   modified `User-Agent`.  If the task has a payload, Cloud Tasks sets the following headers:  * `Content-Type`: By default, the `Content-Type` header is set to   `&quot;application/octet-stream&quot;`. The default can be overridden by explicitly   setting `Content-Type` to a particular media type when the   task is created.   For example, `Content-Type` can be set to `&quot;application/json&quot;`. * `Content-Length`: This is computed by Cloud Tasks. This value is   output only.   It cannot be changed.  The headers below cannot be set or overridden:  * `Host` * `X-Google-*` * `X-AppEngine-*`  In addition, Cloud Tasks sets some headers when the task is dispatched, such as headers containing information about the task; see [request headers](https://cloud.google.com/appengine/docs/python/taskqueue/push/creating-handlers#reading_request_headers). These headers are set only when the task is dispatched, so they are not visible when the task is returned in a Cloud Tasks response.  Although there is no specific limit for the maximum number of headers or the size, there is a limit on the maximum size of the Task. For more information, see the CreateTask documentation.
         */
        headers?: {
            [key: string]: string;
        } | null;
        /**
         * The HTTP method to use for the request. The default is POST.  The app&#39;s request handler for the task&#39;s target URL must be able to handle HTTP requests with this http_method, otherwise the task attempt fails with error code 405 (Method Not Allowed). See [Writing a push task request handler](https://cloud.google.com/appengine/docs/java/taskqueue/push/creating-handlers#writing_a_push_task_request_handler) and the App Engine documentation for your runtime on [How Requests are Handled](https://cloud.google.com/appengine/docs/standard/python3/how-requests-are-handled).
         */
        httpMethod?: string | null;
        /**
         * Payload.  The payload will be sent as the HTTP message body. A message body, and thus a payload, is allowed only if the HTTP method is POST or PUT. It is an error to set a data payload on a task with an incompatible HttpMethod.
         */
        payload?: string | null;
        /**
         * The relative URL.  The relative URL must begin with &quot;/&quot; and must be a valid HTTP relative URL. It can contain a path and query string arguments. If the relative URL is empty, then the root path &quot;/&quot; will be used. No spaces are allowed, and the maximum length allowed is 2083 characters.
         */
        relativeUrl?: string | null;
    }
    /**
     * App Engine HTTP target.  The task will be delivered to the App Engine application hostname specified by its AppEngineHttpTarget and AppEngineHttpRequest. The documentation for AppEngineHttpRequest explains how the task&#39;s host URL is constructed.  Using AppEngineHttpTarget requires [`appengine.applications.get`](https://cloud.google.com/appengine/docs/admin-api/access-control) Google IAM permission for the project and the following scope:  `https://www.googleapis.com/auth/cloud-platform`
     */
    export interface Schema$AppEngineHttpTarget {
        /**
         * Overrides for the task-level app_engine_routing.  If set, `app_engine_routing_override` is used for all tasks in the queue, no matter what the setting is for the task-level app_engine_routing.
         */
        appEngineRoutingOverride?: Schema$AppEngineRouting;
    }
    /**
     * App Engine Routing.  Defines routing characteristics specific to App Engine - service, version, and instance.  For more information about services, versions, and instances see [An Overview of App Engine](https://cloud.google.com/appengine/docs/python/an-overview-of-app-engine), [Microservices Architecture on Google App Engine](https://cloud.google.com/appengine/docs/python/microservices-on-app-engine), [App Engine Standard request routing](https://cloud.google.com/appengine/docs/standard/python/how-requests-are-routed), and [App Engine Flex request routing](https://cloud.google.com/appengine/docs/flexible/python/how-requests-are-routed).
     */
    export interface Schema$AppEngineRouting {
        /**
         * Output only. The host that the task is sent to.  For more information, see [How Requests are Routed](https://cloud.google.com/appengine/docs/standard/python/how-requests-are-routed).  The host is constructed as:   * `host = [application_domain_name]`&lt;/br&gt;   `| [service] + &#39;.&#39; + [application_domain_name]`&lt;/br&gt;   `| [version] + &#39;.&#39; + [application_domain_name]`&lt;/br&gt;   `| [version_dot_service]+ &#39;.&#39; + [application_domain_name]`&lt;/br&gt;   `| [instance] + &#39;.&#39; + [application_domain_name]`&lt;/br&gt;   `| [instance_dot_service] + &#39;.&#39; + [application_domain_name]`&lt;/br&gt;   `| [instance_dot_version] + &#39;.&#39; + [application_domain_name]`&lt;/br&gt;   `| [instance_dot_version_dot_service] + &#39;.&#39; + [application_domain_name]`  * `application_domain_name` = The domain name of the app, for   example &lt;app-id&gt;.appspot.com, which is associated with the   queue&#39;s project ID. Some tasks which were created using the App Engine   SDK use a custom domain name.  * `service =` service  * `version =` version  * `version_dot_service =`   version `+ &#39;.&#39; +`   service  * `instance =` instance  * `instance_dot_service =`   instance `+ &#39;.&#39; +`   service  * `instance_dot_version =`   instance `+ &#39;.&#39; +`   version  * `instance_dot_version_dot_service =`   instance `+ &#39;.&#39; +`   version `+ &#39;.&#39; +`   service  If service is empty, then the task will be sent to the service which is the default service when the task is attempted.  If version is empty, then the task will be sent to the version which is the default version when the task is attempted.  If instance is empty, then the task will be sent to an instance which is available when the task is attempted.  If service, version, or instance is invalid, then the task will be sent to the default version of the default service when the task is attempted.
         */
        host?: string | null;
        /**
         * App instance.  By default, the task is sent to an instance which is available when the task is attempted.  Requests can only be sent to a specific instance if [manual scaling is used in App Engine Standard](https://cloud.google.com/appengine/docs/python/an-overview-of-app-engine?hl=en_US#scaling_types_and_instance_classes). App Engine Flex does not support instances. For more information, see [App Engine Standard request routing](https://cloud.google.com/appengine/docs/standard/python/how-requests-are-routed) and [App Engine Flex request routing](https://cloud.google.com/appengine/docs/flexible/python/how-requests-are-routed).
         */
        instance?: string | null;
        /**
         * App service.  By default, the task is sent to the service which is the default service when the task is attempted.  For some queues or tasks which were created using the App Engine Task Queue API, host is not parsable into service, version, and instance. For example, some tasks which were created using the App Engine SDK use a custom domain name; custom domains are not parsed by Cloud Tasks. If host is not parsable, then service, version, and instance are the empty string.
         */
        service?: string | null;
        /**
         * App version.  By default, the task is sent to the version which is the default version when the task is attempted.  For some queues or tasks which were created using the App Engine Task Queue API, host is not parsable into service, version, and instance. For example, some tasks which were created using the App Engine SDK use a custom domain name; custom domains are not parsed by Cloud Tasks. If host is not parsable, then service, version, and instance are the empty string.
         */
        version?: string | null;
    }
    /**
     * The status of a task attempt.
     */
    export interface Schema$AttemptStatus {
        /**
         * Output only. The time that this attempt was dispatched.  `dispatch_time` will be truncated to the nearest microsecond.
         */
        dispatchTime?: string | null;
        /**
         * Output only. The response from the target for this attempt.  If the task has not been attempted or the task is currently running then the response status is unset.
         */
        responseStatus?: Schema$Status;
        /**
         * Output only. The time that this attempt response was received.  `response_time` will be truncated to the nearest microsecond.
         */
        responseTime?: string | null;
        /**
         * Output only. The time that this attempt was scheduled.  `schedule_time` will be truncated to the nearest microsecond.
         */
        scheduleTime?: string | null;
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
     * Request message for canceling a lease using CancelLease.
     */
    export interface Schema$CancelLeaseRequest {
        /**
         * The response_view specifies which subset of the Task will be returned.  By default response_view is BASIC; not all information is retrieved by default because some data, such as payloads, might be desirable to return only when needed because of its large size or because of the sensitivity of data that it contains.  Authorization for FULL requires `cloudtasks.tasks.fullView` [Google IAM](https://cloud.google.com/iam/) permission on the Task resource.
         */
        responseView?: string | null;
        /**
         * Required. The task&#39;s current schedule time, available in the schedule_time returned by LeaseTasks response or RenewLease response. This restriction is to ensure that your worker currently holds the lease.
         */
        scheduleTime?: string | null;
    }
    /**
     * Request message for CreateTask.
     */
    export interface Schema$CreateTaskRequest {
        /**
         * The response_view specifies which subset of the Task will be returned.  By default response_view is BASIC; not all information is retrieved by default because some data, such as payloads, might be desirable to return only when needed because of its large size or because of the sensitivity of data that it contains.  Authorization for FULL requires `cloudtasks.tasks.fullView` [Google IAM](https://cloud.google.com/iam/) permission on the Task resource.
         */
        responseView?: string | null;
        /**
         * Required. The task to add.  Task names have the following format: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID/tasks/TASK_ID`. The user can optionally specify a task name. If a name is not specified then the system will generate a random unique task id, which will be set in the task returned in the response.  If schedule_time is not set or is in the past then Cloud Tasks will set it to the current time.  Task De-duplication:  Explicitly specifying a task ID enables task de-duplication.  If a task&#39;s ID is identical to that of an existing task or a task that was deleted or completed recently then the call will fail with ALREADY_EXISTS. If the task&#39;s queue was created using Cloud Tasks, then another task with the same name can&#39;t be created for ~1hour after the original task was deleted or completed. If the task&#39;s queue was created using queue.yaml or queue.xml, then another task with the same name can&#39;t be created for ~9days after the original task was deleted or completed.  Because there is an extra lookup cost to identify duplicate task names, these CreateTask calls have significantly increased latency. Using hashed strings for the task id or for the prefix of the task id is recommended. Choosing task ids that are sequential or have sequential prefixes, for example using a timestamp, causes an increase in latency and error rates in all task commands. The infrastructure relies on an approximately uniform distribution of task ids to store and serve tasks efficiently.
         */
        task?: Schema$Task;
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
     * Request message for `GetIamPolicy` method.
     */
    export interface Schema$GetIamPolicyRequest {
        /**
         * OPTIONAL: A `GetPolicyOptions` object for specifying options to `GetIamPolicy`.
         */
        options?: Schema$GetPolicyOptions;
    }
    /**
     * Encapsulates settings provided to GetIamPolicy.
     */
    export interface Schema$GetPolicyOptions {
        /**
         * Optional. The policy format version to be returned.  Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.  Requests for policies with any conditional bindings must specify version 3. Policies without any conditional bindings may specify any valid value or leave the field unset.  To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
         */
        requestedPolicyVersion?: number | null;
    }
    /**
     * Request message for leasing tasks using LeaseTasks.
     */
    export interface Schema$LeaseTasksRequest {
        /**
         * `filter` can be used to specify a subset of tasks to lease.  When `filter` is set to `tag=&lt;my-tag&gt;` then the response will contain only tasks whose tag is equal to `&lt;my-tag&gt;`. `&lt;my-tag&gt;` must be less than 500 characters.  When `filter` is set to `tag_function=oldest_tag()`, only tasks which have the same tag as the task with the oldest schedule_time will be returned.  Grammar Syntax:  * `filter = &quot;tag=&quot; tag | &quot;tag_function=&quot; function`  * `tag = string`  * `function = &quot;oldest_tag()&quot;`  The `oldest_tag()` function returns tasks which have the same tag as the oldest task (ordered by schedule time).  SDK compatibility: Although the SDK allows tags to be either string or [bytes](https://cloud.google.com/appengine/docs/standard/java/javadoc/com/google/appengine/api/taskqueue/TaskOptions.html#tag-byte:A-), only UTF-8 encoded tags can be used in Cloud Tasks. Tag which aren&#39;t UTF-8 encoded can&#39;t be used in the filter and the task&#39;s tag will be displayed as empty in Cloud Tasks.
         */
        filter?: string | null;
        /**
         * Required. The duration of the lease.  Each task returned in the response will have its schedule_time set to the current time plus the `lease_duration`. The task is leased until its schedule_time; thus, the task will not be returned to another LeaseTasks call before its schedule_time.   After the worker has successfully finished the work associated with the task, the worker must call via AcknowledgeTask before the schedule_time. Otherwise the task will be returned to a later LeaseTasks call so that another worker can retry it.  The maximum lease duration is 1 week. `lease_duration` will be truncated to the nearest second.
         */
        leaseDuration?: string | null;
        /**
         * The maximum number of tasks to lease.  The system will make a best effort to return as close to as `max_tasks` as possible.  The largest that `max_tasks` can be is 1000.  The maximum total size of a lease tasks response is 32 MB. If the sum of all task sizes requested reaches this limit, fewer tasks than requested are returned.
         */
        maxTasks?: number | null;
        /**
         * The response_view specifies which subset of the Task will be returned.  By default response_view is BASIC; not all information is retrieved by default because some data, such as payloads, might be desirable to return only when needed because of its large size or because of the sensitivity of data that it contains.  Authorization for FULL requires `cloudtasks.tasks.fullView` [Google IAM](https://cloud.google.com/iam/) permission on the Task resource.
         */
        responseView?: string | null;
    }
    /**
     * Response message for leasing tasks using LeaseTasks.
     */
    export interface Schema$LeaseTasksResponse {
        /**
         * The leased tasks.
         */
        tasks?: Schema$Task[];
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
     * Response message for ListQueues.
     */
    export interface Schema$ListQueuesResponse {
        /**
         * A token to retrieve next page of results.  To return the next page of results, call ListQueues with this value as the page_token.  If the next_page_token is empty, there are no more results.  The page token is valid for only 2 hours.
         */
        nextPageToken?: string | null;
        /**
         * The list of queues.
         */
        queues?: Schema$Queue[];
    }
    /**
     * Response message for listing tasks using ListTasks.
     */
    export interface Schema$ListTasksResponse {
        /**
         * A token to retrieve next page of results.  To return the next page of results, call ListTasks with this value as the page_token.  If the next_page_token is empty, there are no more results.
         */
        nextPageToken?: string | null;
        /**
         * The list of tasks.
         */
        tasks?: Schema$Task[];
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
     * Request message for PauseQueue.
     */
    export interface Schema$PauseQueueRequest {
    }
    /**
     * An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources.   A `Policy` is a collection of `bindings`. A `binding` binds one or more `members` to a single `role`. Members can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role.  For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies).  **JSON example:**      {       &quot;bindings&quot;: [         {           &quot;role&quot;: &quot;roles/resourcemanager.organizationAdmin&quot;,           &quot;members&quot;: [             &quot;user:mike@example.com&quot;,             &quot;group:admins@example.com&quot;,             &quot;domain:google.com&quot;,             &quot;serviceAccount:my-project-id@appspot.gserviceaccount.com&quot;           ]         },         {           &quot;role&quot;: &quot;roles/resourcemanager.organizationViewer&quot;,           &quot;members&quot;: [             &quot;user:eve@example.com&quot;           ],           &quot;condition&quot;: {             &quot;title&quot;: &quot;expirable access&quot;,             &quot;description&quot;: &quot;Does not grant access after Sep 2020&quot;,             &quot;expression&quot;: &quot;request.time &lt; timestamp(&#39;2020-10-01T00:00:00.000Z&#39;)&quot;,           }         }       ],       &quot;etag&quot;: &quot;BwWWja0YfJA=&quot;,       &quot;version&quot;: 3     }  **YAML example:**      bindings:     - members:       - user:mike@example.com       - group:admins@example.com       - domain:google.com       - serviceAccount:my-project-id@appspot.gserviceaccount.com       role: roles/resourcemanager.organizationAdmin     - members:       - user:eve@example.com       role: roles/resourcemanager.organizationViewer       condition:         title: expirable access         description: Does not grant access after Sep 2020         expression: request.time &lt; timestamp(&#39;2020-10-01T00:00:00.000Z&#39;)     - etag: BwWWja0YfJA=     - version: 3  For a description of IAM and its features, see the [IAM documentation](https://cloud.google.com/iam/docs/).
     */
    export interface Schema$Policy {
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
     * The pull message contains data that can be used by the caller of LeaseTasks to process the task.  This proto can only be used for tasks in a queue which has pull_target set.
     */
    export interface Schema$PullMessage {
        /**
         * A data payload consumed by the worker to execute the task.
         */
        payload?: string | null;
        /**
         * The task&#39;s tag.  Tags allow similar tasks to be processed in a batch. If you label tasks with a tag, your worker can lease tasks with the same tag using filter. For example, if you want to aggregate the events associated with a specific user once a day, you could tag tasks with the user ID.  The task&#39;s tag can only be set when the task is created.  The tag must be less than 500 characters.  SDK compatibility: Although the SDK allows tags to be either string or [bytes](https://cloud.google.com/appengine/docs/standard/java/javadoc/com/google/appengine/api/taskqueue/TaskOptions.html#tag-byte:A-), only UTF-8 encoded tags can be used in Cloud Tasks. If a tag isn&#39;t UTF-8 encoded, the tag will be empty when the task is returned by Cloud Tasks.
         */
        tag?: string | null;
    }
    /**
     * Pull target.
     */
    export interface Schema$PullTarget {
    }
    /**
     * Request message for PurgeQueue.
     */
    export interface Schema$PurgeQueueRequest {
    }
    /**
     * A queue is a container of related tasks. Queues are configured to manage how those tasks are dispatched. Configurable properties include rate limits, retry options, target types, and others.
     */
    export interface Schema$Queue {
        /**
         * App Engine HTTP target.  An App Engine queue is a queue that has an AppEngineHttpTarget.
         */
        appEngineHttpTarget?: Schema$AppEngineHttpTarget;
        /**
         * Caller-specified and required in CreateQueue, after which it becomes output only.  The queue name.  The queue name must have the following format: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID`  * `PROJECT_ID` can contain letters ([A-Za-z]), numbers ([0-9]),    hyphens (-), colons (:), or periods (.).    For more information, see    [Identifying    projects](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects) * `LOCATION_ID` is the canonical ID for the queue&#39;s location.    The list of available locations can be obtained by calling    ListLocations.    For more information, see https://cloud.google.com/about/locations/. * `QUEUE_ID` can contain letters ([A-Za-z]), numbers ([0-9]), or   hyphens (-). The maximum length is 100 characters.
         */
        name?: string | null;
        /**
         * Pull target.  A pull queue is a queue that has a PullTarget.
         */
        pullTarget?: Schema$PullTarget;
        /**
         * Output only. The last time this queue was purged.  All tasks that were created before this time were purged.  A queue can be purged using PurgeQueue, the [App Engine Task Queue SDK, or the Cloud Console](https://cloud.google.com/appengine/docs/standard/python/taskqueue/push/deleting-tasks-and-queues#purging_all_tasks_from_a_queue).  Purge time will be truncated to the nearest microsecond. Purge time will be unset if the queue has never been purged.
         */
        purgeTime?: string | null;
        /**
         * Rate limits for task dispatches.  rate_limits and retry_config are related because they both control task attempts however they control how tasks are attempted in different ways:  * rate_limits controls the total rate of   dispatches from a queue (i.e. all traffic dispatched from the   queue, regardless of whether the dispatch is from a first   attempt or a retry). * retry_config controls what happens to   particular a task after its first attempt fails. That is,   retry_config controls task retries (the   second attempt, third attempt, etc).
         */
        rateLimits?: Schema$RateLimits;
        /**
         * Settings that determine the retry behavior.  * For tasks created using Cloud Tasks: the queue-level retry settings   apply to all tasks in the queue that were created using Cloud Tasks.   Retry settings cannot be set on individual tasks. * For tasks created using the App Engine SDK: the queue-level retry   settings apply to all tasks in the queue which do not have retry settings   explicitly set on the task and were created by the App Engine SDK. See   [App Engine   documentation](https://cloud.google.com/appengine/docs/standard/python/taskqueue/push/retrying-tasks).
         */
        retryConfig?: Schema$RetryConfig;
        /**
         * Output only. The state of the queue.  `state` can only be changed by called PauseQueue, ResumeQueue, or uploading [queue.yaml/xml](https://cloud.google.com/appengine/docs/python/config/queueref). UpdateQueue cannot be used to change `state`.
         */
        state?: string | null;
    }
    /**
     * Rate limits.  This message determines the maximum rate that tasks can be dispatched by a queue, regardless of whether the dispatch is a first task attempt or a retry.  Note: The debugging command, RunTask, will run a task even if the queue has reached its RateLimits.
     */
    export interface Schema$RateLimits {
        /**
         * Output only. The max burst size.  Max burst size limits how fast tasks in queue are processed when many tasks are in the queue and the rate is high. This field allows the queue to have a high rate so processing starts shortly after a task is enqueued, but still limits resource usage when many tasks are enqueued in a short period of time.  The [token bucket](https://wikipedia.org/wiki/Token_Bucket) algorithm is used to control the rate of task dispatches. Each queue has a token bucket that holds tokens, up to the maximum specified by `max_burst_size`. Each time a task is dispatched, a token is removed from the bucket. Tasks will be dispatched until the queue&#39;s bucket runs out of tokens. The bucket will be continuously refilled with new tokens based on max_tasks_dispatched_per_second.  Cloud Tasks will pick the value of `max_burst_size` based on the value of max_tasks_dispatched_per_second.  For App Engine queues that were created or updated using `queue.yaml/xml`, `max_burst_size` is equal to [bucket_size](https://cloud.google.com/appengine/docs/standard/python/config/queueref#bucket_size). Since `max_burst_size` is output only, if UpdateQueue is called on a queue created by `queue.yaml/xml`, `max_burst_size` will be reset based on the value of max_tasks_dispatched_per_second, regardless of whether max_tasks_dispatched_per_second is updated.
         */
        maxBurstSize?: number | null;
        /**
         * The maximum number of concurrent tasks that Cloud Tasks allows to be dispatched for this queue. After this threshold has been reached, Cloud Tasks stops dispatching tasks until the number of concurrent requests decreases.  If unspecified when the queue is created, Cloud Tasks will pick the default.   The maximum allowed value is 5,000.  This field is output only for pull queues and always -1, which indicates no limit. No other queue types can have `max_concurrent_tasks` set to -1.   This field has the same meaning as [max_concurrent_requests in queue.yaml/xml](https://cloud.google.com/appengine/docs/standard/python/config/queueref#max_concurrent_requests).
         */
        maxConcurrentTasks?: number | null;
        /**
         * The maximum rate at which tasks are dispatched from this queue.  If unspecified when the queue is created, Cloud Tasks will pick the default.  * For App Engine queues, the maximum allowed value   is 500. * This field is output only   for pull queues. In addition to the   `max_tasks_dispatched_per_second` limit, a maximum of 10 QPS of   LeaseTasks requests are allowed per pull queue.   This field has the same meaning as [rate in queue.yaml/xml](https://cloud.google.com/appengine/docs/standard/python/config/queueref#rate).
         */
        maxTasksDispatchedPerSecond?: number | null;
    }
    /**
     * Request message for renewing a lease using RenewLease.
     */
    export interface Schema$RenewLeaseRequest {
        /**
         * Required. The desired new lease duration, starting from now.   The maximum lease duration is 1 week. `lease_duration` will be truncated to the nearest second.
         */
        leaseDuration?: string | null;
        /**
         * The response_view specifies which subset of the Task will be returned.  By default response_view is BASIC; not all information is retrieved by default because some data, such as payloads, might be desirable to return only when needed because of its large size or because of the sensitivity of data that it contains.  Authorization for FULL requires `cloudtasks.tasks.fullView` [Google IAM](https://cloud.google.com/iam/) permission on the Task resource.
         */
        responseView?: string | null;
        /**
         * Required. The task&#39;s current schedule time, available in the schedule_time returned by LeaseTasks response or RenewLease response. This restriction is to ensure that your worker currently holds the lease.
         */
        scheduleTime?: string | null;
    }
    /**
     * Request message for ResumeQueue.
     */
    export interface Schema$ResumeQueueRequest {
    }
    /**
     * Retry config.  These settings determine how a failed task attempt is retried.
     */
    export interface Schema$RetryConfig {
        /**
         * The maximum number of attempts for a task.  Cloud Tasks will attempt the task `max_attempts` times (that is, if the first attempt fails, then there will be `max_attempts - 1` retries).  Must be &gt; 0.
         */
        maxAttempts?: number | null;
        /**
         * A task will be scheduled for retry between min_backoff and max_backoff duration after it fails, if the queue&#39;s RetryConfig specifies that the task should be retried.  If unspecified when the queue is created, Cloud Tasks will pick the default.  This field is output only for pull queues.   `max_backoff` will be truncated to the nearest second.  This field has the same meaning as [max_backoff_seconds in queue.yaml/xml](https://cloud.google.com/appengine/docs/standard/python/config/queueref#retry_parameters).
         */
        maxBackoff?: string | null;
        /**
         * The time between retries will double `max_doublings` times.  A task&#39;s retry interval starts at min_backoff, then doubles `max_doublings` times, then increases linearly, and finally retries at intervals of max_backoff up to max_attempts times.  For example, if min_backoff is 10s, max_backoff is 300s, and `max_doublings` is 3, then the a task will first be retried in 10s. The retry interval will double three times, and then increase linearly by 2^3 * 10s.  Finally, the task will retry at intervals of max_backoff until the task has been attempted max_attempts times. Thus, the requests will retry at 10s, 20s, 40s, 80s, 160s, 240s, 300s, 300s, ....  If unspecified when the queue is created, Cloud Tasks will pick the default.  This field is output only for pull queues.   This field has the same meaning as [max_doublings in queue.yaml/xml](https://cloud.google.com/appengine/docs/standard/python/config/queueref#retry_parameters).
         */
        maxDoublings?: number | null;
        /**
         * If positive, `max_retry_duration` specifies the time limit for retrying a failed task, measured from when the task was first attempted. Once `max_retry_duration` time has passed *and* the task has been attempted max_attempts times, no further attempts will be made and the task will be deleted.  If zero, then the task age is unlimited.  If unspecified when the queue is created, Cloud Tasks will pick the default.  This field is output only for pull queues.   `max_retry_duration` will be truncated to the nearest second.  This field has the same meaning as [task_age_limit in queue.yaml/xml](https://cloud.google.com/appengine/docs/standard/python/config/queueref#retry_parameters).
         */
        maxRetryDuration?: string | null;
        /**
         * A task will be scheduled for retry between min_backoff and max_backoff duration after it fails, if the queue&#39;s RetryConfig specifies that the task should be retried.  If unspecified when the queue is created, Cloud Tasks will pick the default.  This field is output only for pull queues.   `min_backoff` will be truncated to the nearest second.  This field has the same meaning as [min_backoff_seconds in queue.yaml/xml](https://cloud.google.com/appengine/docs/standard/python/config/queueref#retry_parameters).
         */
        minBackoff?: string | null;
        /**
         * If true, then the number of attempts is unlimited.
         */
        unlimitedAttempts?: boolean | null;
    }
    /**
     * Request message for forcing a task to run now using RunTask.
     */
    export interface Schema$RunTaskRequest {
        /**
         * The response_view specifies which subset of the Task will be returned.  By default response_view is BASIC; not all information is retrieved by default because some data, such as payloads, might be desirable to return only when needed because of its large size or because of the sensitivity of data that it contains.  Authorization for FULL requires `cloudtasks.tasks.fullView` [Google IAM](https://cloud.google.com/iam/) permission on the Task resource.
         */
        responseView?: string | null;
    }
    /**
     * Request message for `SetIamPolicy` method.
     */
    export interface Schema$SetIamPolicyRequest {
        /**
         * REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Cloud Platform services (such as Projects) might reject them.
         */
        policy?: Schema$Policy;
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
     * A unit of scheduled work.
     */
    export interface Schema$Task {
        /**
         * App Engine HTTP request that is sent to the task&#39;s target. Can be set only if app_engine_http_target is set on the queue.  An App Engine task is a task that has AppEngineHttpRequest set.
         */
        appEngineHttpRequest?: Schema$AppEngineHttpRequest;
        /**
         * Output only. The time that the task was created.  `create_time` will be truncated to the nearest second.
         */
        createTime?: string | null;
        /**
         * Optionally caller-specified in CreateTask.  The task name.  The task name must have the following format: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID/tasks/TASK_ID`  * `PROJECT_ID` can contain letters ([A-Za-z]), numbers ([0-9]),    hyphens (-), colons (:), or periods (.).    For more information, see    [Identifying    projects](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects) * `LOCATION_ID` is the canonical ID for the task&#39;s location.    The list of available locations can be obtained by calling    ListLocations.    For more information, see https://cloud.google.com/about/locations/. * `QUEUE_ID` can contain letters ([A-Za-z]), numbers ([0-9]), or   hyphens (-). The maximum length is 100 characters. * `TASK_ID` can contain only letters ([A-Za-z]), numbers ([0-9]),   hyphens (-), or underscores (_). The maximum length is 500 characters.
         */
        name?: string | null;
        /**
         * LeaseTasks to process the task. Can be set only if pull_target is set on the queue.  A pull task is a task that has PullMessage set.
         */
        pullMessage?: Schema$PullMessage;
        /**
         * The time when the task is scheduled to be attempted.  For App Engine queues, this is when the task will be attempted or retried.  For pull queues, this is the time when the task is available to be leased; if a task is currently leased, this is the time when the current lease expires, that is, the time that the task was leased plus the lease_duration.  `schedule_time` will be truncated to the nearest microsecond.
         */
        scheduleTime?: string | null;
        /**
         * Output only. The task status.
         */
        status?: Schema$TaskStatus;
        /**
         * Output only. The view specifies which subset of the Task has been returned.
         */
        view?: string | null;
    }
    /**
     * Status of the task.
     */
    export interface Schema$TaskStatus {
        /**
         * Output only. The number of attempts dispatched.  This count includes attempts which have been dispatched but haven&#39;t received a response.
         */
        attemptDispatchCount?: number | null;
        /**
         * Output only. The number of attempts which have received a response.  This field is not calculated for pull tasks.
         */
        attemptResponseCount?: number | null;
        /**
         * Output only. The status of the task&#39;s first attempt.  Only dispatch_time will be set. The other AttemptStatus information is not retained by Cloud Tasks.  This field is not calculated for pull tasks.
         */
        firstAttemptStatus?: Schema$AttemptStatus;
        /**
         * Output only. The status of the task&#39;s last attempt.  This field is not calculated for pull tasks.
         */
        lastAttemptStatus?: Schema$AttemptStatus;
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
    export class Resource$Projects {
        context: APIRequestContext;
        locations: Resource$Projects$Locations;
        constructor(context: APIRequestContext);
    }
    export class Resource$Projects$Locations {
        context: APIRequestContext;
        queues: Resource$Projects$Locations$Queues;
        constructor(context: APIRequestContext);
        /**
         * cloudtasks.projects.locations.get
         * @desc Gets information about a location.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudtasks.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudtasks = google.cloudtasks('v2beta2');
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
         *   const res = await cloudtasks.projects.locations.get({
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
         * @alias cloudtasks.projects.locations.get
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
         * cloudtasks.projects.locations.list
         * @desc Lists information about the supported locations for this service.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudtasks.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudtasks = google.cloudtasks('v2beta2');
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
         *   const res = await cloudtasks.projects.locations.list({
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
         * @alias cloudtasks.projects.locations.list
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
    export class Resource$Projects$Locations$Queues {
        context: APIRequestContext;
        tasks: Resource$Projects$Locations$Queues$Tasks;
        constructor(context: APIRequestContext);
        /**
         * cloudtasks.projects.locations.queues.create
         * @desc Creates a queue.  Queues created with this method allow tasks to live for a maximum of 31 days. After a task is 31 days old, the task will be deleted regardless of whether it was dispatched or not.  WARNING: Using this method may have unintended side effects if you are using an App Engine `queue.yaml` or `queue.xml` file to manage your queues. Read [Overview of Queue Management and queue.yaml](https://cloud.google.com/tasks/docs/queue-yaml) before using this method.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudtasks.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudtasks = google.cloudtasks('v2beta2');
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
         *   const res = await cloudtasks.projects.locations.queues.create({
         *     // Required. The location name in which the queue will be created.
         *     // For example: `projects/PROJECT_ID/locations/LOCATION_ID`
         *     //
         *     // The list of allowed locations can be obtained by calling Cloud
         *     // Tasks' implementation of
         *     // ListLocations.
         *     parent: 'projects/my-project/locations/my-location',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "appEngineHttpTarget": {},
         *       //   "name": "my_name",
         *       //   "pullTarget": {},
         *       //   "purgeTime": "my_purgeTime",
         *       //   "rateLimits": {},
         *       //   "retryConfig": {},
         *       //   "state": "my_state"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "appEngineHttpTarget": {},
         *   //   "name": "my_name",
         *   //   "pullTarget": {},
         *   //   "purgeTime": "my_purgeTime",
         *   //   "rateLimits": {},
         *   //   "retryConfig": {},
         *   //   "state": "my_state"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudtasks.projects.locations.queues.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent Required. The location name in which the queue will be created. For example: `projects/PROJECT_ID/locations/LOCATION_ID`  The list of allowed locations can be obtained by calling Cloud Tasks' implementation of ListLocations.
         * @param {().Queue} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Projects$Locations$Queues$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Projects$Locations$Queues$Create, options?: MethodOptions): GaxiosPromise<Schema$Queue>;
        create(params: Params$Resource$Projects$Locations$Queues$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Projects$Locations$Queues$Create, options: MethodOptions | BodyResponseCallback<Schema$Queue>, callback: BodyResponseCallback<Schema$Queue>): void;
        create(params: Params$Resource$Projects$Locations$Queues$Create, callback: BodyResponseCallback<Schema$Queue>): void;
        create(callback: BodyResponseCallback<Schema$Queue>): void;
        /**
         * cloudtasks.projects.locations.queues.delete
         * @desc Deletes a queue.  This command will delete the queue even if it has tasks in it.  Note: If you delete a queue, a queue with the same name can't be created for 7 days.  WARNING: Using this method may have unintended side effects if you are using an App Engine `queue.yaml` or `queue.xml` file to manage your queues. Read [Overview of Queue Management and queue.yaml](https://cloud.google.com/tasks/docs/queue-yaml) before using this method.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudtasks.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudtasks = google.cloudtasks('v2beta2');
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
         *   const res = await cloudtasks.projects.locations.queues.delete({
         *     // Required. The queue name. For example:
         *     // `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID`
         *     name: 'projects/my-project/locations/my-location/queues/my-queue',
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
         * @alias cloudtasks.projects.locations.queues.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The queue name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID`
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Projects$Locations$Queues$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Projects$Locations$Queues$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Projects$Locations$Queues$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Projects$Locations$Queues$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Projects$Locations$Queues$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * cloudtasks.projects.locations.queues.get
         * @desc Gets a queue.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudtasks.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudtasks = google.cloudtasks('v2beta2');
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
         *   const res = await cloudtasks.projects.locations.queues.get({
         *     // Required. The resource name of the queue. For example:
         *     // `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID`
         *     name: 'projects/my-project/locations/my-location/queues/my-queue',
         *     // Optional. Read mask is used for a more granular control over what the API returns. By
         *     // it includes all fields in Queue except for stats.
         *     readMask: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "appEngineHttpTarget": {},
         *   //   "name": "my_name",
         *   //   "pullTarget": {},
         *   //   "purgeTime": "my_purgeTime",
         *   //   "rateLimits": {},
         *   //   "retryConfig": {},
         *   //   "state": "my_state"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudtasks.projects.locations.queues.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the queue. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID`
         * @param {string=} params.readMask Optional. Read mask is used for a more granular control over what the API returns. By it includes all fields in Queue except for stats.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Locations$Queues$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Locations$Queues$Get, options?: MethodOptions): GaxiosPromise<Schema$Queue>;
        get(params: Params$Resource$Projects$Locations$Queues$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Locations$Queues$Get, options: MethodOptions | BodyResponseCallback<Schema$Queue>, callback: BodyResponseCallback<Schema$Queue>): void;
        get(params: Params$Resource$Projects$Locations$Queues$Get, callback: BodyResponseCallback<Schema$Queue>): void;
        get(callback: BodyResponseCallback<Schema$Queue>): void;
        /**
         * cloudtasks.projects.locations.queues.getIamPolicy
         * @desc Gets the access control policy for a Queue. Returns an empty policy if the resource exists and does not have a policy set.  Authorization requires the following [Google IAM](https://cloud.google.com/iam) permission on the specified resource parent:  * `cloudtasks.queues.getIamPolicy`
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudtasks.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudtasks = google.cloudtasks('v2beta2');
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
         *   const res = await cloudtasks.projects.locations.queues.getIamPolicy({
         *     // REQUIRED: The resource for which the policy is being requested.
         *     // See the operation documentation for the appropriate value for this field.
         *     resource: 'projects/my-project/locations/my-location/queues/my-queue',
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
         * @alias cloudtasks.projects.locations.queues.getIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         * @param {().GetIamPolicyRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getIamPolicy(params: Params$Resource$Projects$Locations$Queues$Getiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getIamPolicy(params?: Params$Resource$Projects$Locations$Queues$Getiampolicy, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        getIamPolicy(params: Params$Resource$Projects$Locations$Queues$Getiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getIamPolicy(params: Params$Resource$Projects$Locations$Queues$Getiampolicy, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        getIamPolicy(params: Params$Resource$Projects$Locations$Queues$Getiampolicy, callback: BodyResponseCallback<Schema$Policy>): void;
        getIamPolicy(callback: BodyResponseCallback<Schema$Policy>): void;
        /**
         * cloudtasks.projects.locations.queues.list
         * @desc Lists queues.  Queues are returned in lexicographical order.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudtasks.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudtasks = google.cloudtasks('v2beta2');
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
         *   const res = await cloudtasks.projects.locations.queues.list({
         *     // `filter` can be used to specify a subset of queues. Any Queue
         *     // field can be used as a filter and several operators as supported.
         *     // For example: `<=, <, >=, >, !=, =, :`. The filter syntax is the same as
         *     // described in
         *     // [Stackdriver's Advanced Logs
         *     // Filters](https://cloud.google.com/logging/docs/view/advanced_filters).
         *     //
         *     // Sample filter "app_engine_http_target: *".
         *     //
         *     // Note that using filters might cause fewer queues than the
         *     // requested_page size to be returned.
         *     filter: 'placeholder-value',
         *     // Requested page size.
         *     //
         *     // The maximum page size is 9800. If unspecified, the page size will
         *     // be the maximum. Fewer queues than requested might be returned,
         *     // even if more queues exist; use the
         *     // next_page_token in the
         *     // response to determine if more queues exist.
         *     pageSize: 'placeholder-value',
         *     // A token identifying the page of results to return.
         *     //
         *     // To request the first page results, page_token must be empty. To
         *     // request the next page of results, page_token must be the value of
         *     // next_page_token returned
         *     // from the previous call to ListQueues
         *     // method. It is an error to switch the value of the
         *     // filter while iterating through pages.
         *     pageToken: 'placeholder-value',
         *     // Required. The location name.
         *     // For example: `projects/PROJECT_ID/locations/LOCATION_ID`
         *     parent: 'projects/my-project/locations/my-location',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "queues": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudtasks.projects.locations.queues.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.filter `filter` can be used to specify a subset of queues. Any Queue field can be used as a filter and several operators as supported. For example: `<=, <, >=, >, !=, =, :`. The filter syntax is the same as described in [Stackdriver's Advanced Logs Filters](https://cloud.google.com/logging/docs/view/advanced_filters).  Sample filter "app_engine_http_target: *".  Note that using filters might cause fewer queues than the requested_page size to be returned.
         * @param {integer=} params.pageSize Requested page size.  The maximum page size is 9800. If unspecified, the page size will be the maximum. Fewer queues than requested might be returned, even if more queues exist; use the next_page_token in the response to determine if more queues exist.
         * @param {string=} params.pageToken A token identifying the page of results to return.  To request the first page results, page_token must be empty. To request the next page of results, page_token must be the value of next_page_token returned from the previous call to ListQueues method. It is an error to switch the value of the filter while iterating through pages.
         * @param {string} params.parent Required. The location name. For example: `projects/PROJECT_ID/locations/LOCATION_ID`
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Locations$Queues$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Locations$Queues$List, options?: MethodOptions): GaxiosPromise<Schema$ListQueuesResponse>;
        list(params: Params$Resource$Projects$Locations$Queues$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Locations$Queues$List, options: MethodOptions | BodyResponseCallback<Schema$ListQueuesResponse>, callback: BodyResponseCallback<Schema$ListQueuesResponse>): void;
        list(params: Params$Resource$Projects$Locations$Queues$List, callback: BodyResponseCallback<Schema$ListQueuesResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListQueuesResponse>): void;
        /**
         * cloudtasks.projects.locations.queues.patch
         * @desc Updates a queue.  This method creates the queue if it does not exist and updates the queue if it does exist.  Queues created with this method allow tasks to live for a maximum of 31 days. After a task is 31 days old, the task will be deleted regardless of whether it was dispatched or not.  WARNING: Using this method may have unintended side effects if you are using an App Engine `queue.yaml` or `queue.xml` file to manage your queues. Read [Overview of Queue Management and queue.yaml](https://cloud.google.com/tasks/docs/queue-yaml) before using this method.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudtasks.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudtasks = google.cloudtasks('v2beta2');
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
         *   const res = await cloudtasks.projects.locations.queues.patch({
         *     // Caller-specified and required in CreateQueue,
         *     // after which it becomes output only.
         *     //
         *     // The queue name.
         *     //
         *     // The queue name must have the following format:
         *     // `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID`
         *     //
         *     // * `PROJECT_ID` can contain letters ([A-Za-z]), numbers ([0-9]),
         *     //    hyphens (-), colons (:), or periods (.).
         *     //    For more information, see
         *     //    [Identifying
         *     //    projects](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects)
         *     // * `LOCATION_ID` is the canonical ID for the queue's location.
         *     //    The list of available locations can be obtained by calling
         *     //    ListLocations.
         *     //    For more information, see https://cloud.google.com/about/locations/.
         *     // * `QUEUE_ID` can contain letters ([A-Za-z]), numbers ([0-9]), or
         *     //   hyphens (-). The maximum length is 100 characters.
         *     name: 'projects/my-project/locations/my-location/queues/my-queue',
         *     // A mask used to specify which fields of the queue are being updated.
         *     //
         *     // If empty, then all fields will be updated.
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "appEngineHttpTarget": {},
         *       //   "name": "my_name",
         *       //   "pullTarget": {},
         *       //   "purgeTime": "my_purgeTime",
         *       //   "rateLimits": {},
         *       //   "retryConfig": {},
         *       //   "state": "my_state"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "appEngineHttpTarget": {},
         *   //   "name": "my_name",
         *   //   "pullTarget": {},
         *   //   "purgeTime": "my_purgeTime",
         *   //   "rateLimits": {},
         *   //   "retryConfig": {},
         *   //   "state": "my_state"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudtasks.projects.locations.queues.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Caller-specified and required in CreateQueue, after which it becomes output only.  The queue name.  The queue name must have the following format: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID`  * `PROJECT_ID` can contain letters ([A-Za-z]), numbers ([0-9]),    hyphens (-), colons (:), or periods (.).    For more information, see    [Identifying    projects](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects) * `LOCATION_ID` is the canonical ID for the queue's location.    The list of available locations can be obtained by calling    ListLocations.    For more information, see https://cloud.google.com/about/locations/. * `QUEUE_ID` can contain letters ([A-Za-z]), numbers ([0-9]), or   hyphens (-). The maximum length is 100 characters.
         * @param {string=} params.updateMask A mask used to specify which fields of the queue are being updated.  If empty, then all fields will be updated.
         * @param {().Queue} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Projects$Locations$Queues$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Projects$Locations$Queues$Patch, options?: MethodOptions): GaxiosPromise<Schema$Queue>;
        patch(params: Params$Resource$Projects$Locations$Queues$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Projects$Locations$Queues$Patch, options: MethodOptions | BodyResponseCallback<Schema$Queue>, callback: BodyResponseCallback<Schema$Queue>): void;
        patch(params: Params$Resource$Projects$Locations$Queues$Patch, callback: BodyResponseCallback<Schema$Queue>): void;
        patch(callback: BodyResponseCallback<Schema$Queue>): void;
        /**
         * cloudtasks.projects.locations.queues.pause
         * @desc Pauses the queue.  If a queue is paused then the system will stop dispatching tasks until the queue is resumed via ResumeQueue. Tasks can still be added when the queue is paused. A queue is paused if its state is PAUSED.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudtasks.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudtasks = google.cloudtasks('v2beta2');
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
         *   const res = await cloudtasks.projects.locations.queues.pause({
         *     // Required. The queue name. For example:
         *     // `projects/PROJECT_ID/location/LOCATION_ID/queues/QUEUE_ID`
         *     name: 'projects/my-project/locations/my-location/queues/my-queue',
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
         *   //   "appEngineHttpTarget": {},
         *   //   "name": "my_name",
         *   //   "pullTarget": {},
         *   //   "purgeTime": "my_purgeTime",
         *   //   "rateLimits": {},
         *   //   "retryConfig": {},
         *   //   "state": "my_state"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudtasks.projects.locations.queues.pause
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The queue name. For example: `projects/PROJECT_ID/location/LOCATION_ID/queues/QUEUE_ID`
         * @param {().PauseQueueRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        pause(params: Params$Resource$Projects$Locations$Queues$Pause, options: StreamMethodOptions): GaxiosPromise<Readable>;
        pause(params?: Params$Resource$Projects$Locations$Queues$Pause, options?: MethodOptions): GaxiosPromise<Schema$Queue>;
        pause(params: Params$Resource$Projects$Locations$Queues$Pause, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        pause(params: Params$Resource$Projects$Locations$Queues$Pause, options: MethodOptions | BodyResponseCallback<Schema$Queue>, callback: BodyResponseCallback<Schema$Queue>): void;
        pause(params: Params$Resource$Projects$Locations$Queues$Pause, callback: BodyResponseCallback<Schema$Queue>): void;
        pause(callback: BodyResponseCallback<Schema$Queue>): void;
        /**
         * cloudtasks.projects.locations.queues.purge
         * @desc Purges a queue by deleting all of its tasks.  All tasks created before this method is called are permanently deleted.  Purge operations can take up to one minute to take effect. Tasks might be dispatched before the purge takes effect. A purge is irreversible.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudtasks.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudtasks = google.cloudtasks('v2beta2');
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
         *   const res = await cloudtasks.projects.locations.queues.purge({
         *     // Required. The queue name. For example:
         *     // `projects/PROJECT_ID/location/LOCATION_ID/queues/QUEUE_ID`
         *     name: 'projects/my-project/locations/my-location/queues/my-queue',
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
         *   //   "appEngineHttpTarget": {},
         *   //   "name": "my_name",
         *   //   "pullTarget": {},
         *   //   "purgeTime": "my_purgeTime",
         *   //   "rateLimits": {},
         *   //   "retryConfig": {},
         *   //   "state": "my_state"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudtasks.projects.locations.queues.purge
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The queue name. For example: `projects/PROJECT_ID/location/LOCATION_ID/queues/QUEUE_ID`
         * @param {().PurgeQueueRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        purge(params: Params$Resource$Projects$Locations$Queues$Purge, options: StreamMethodOptions): GaxiosPromise<Readable>;
        purge(params?: Params$Resource$Projects$Locations$Queues$Purge, options?: MethodOptions): GaxiosPromise<Schema$Queue>;
        purge(params: Params$Resource$Projects$Locations$Queues$Purge, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        purge(params: Params$Resource$Projects$Locations$Queues$Purge, options: MethodOptions | BodyResponseCallback<Schema$Queue>, callback: BodyResponseCallback<Schema$Queue>): void;
        purge(params: Params$Resource$Projects$Locations$Queues$Purge, callback: BodyResponseCallback<Schema$Queue>): void;
        purge(callback: BodyResponseCallback<Schema$Queue>): void;
        /**
         * cloudtasks.projects.locations.queues.resume
         * @desc Resume a queue.  This method resumes a queue after it has been PAUSED or DISABLED. The state of a queue is stored in the queue's state; after calling this method it will be set to RUNNING.  WARNING: Resuming many high-QPS queues at the same time can lead to target overloading. If you are resuming high-QPS queues, follow the 500/50/5 pattern described in [Managing Cloud Tasks Scaling Risks](https://cloud.google.com/tasks/docs/manage-cloud-task-scaling).
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudtasks.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudtasks = google.cloudtasks('v2beta2');
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
         *   const res = await cloudtasks.projects.locations.queues.resume({
         *     // Required. The queue name. For example:
         *     // `projects/PROJECT_ID/location/LOCATION_ID/queues/QUEUE_ID`
         *     name: 'projects/my-project/locations/my-location/queues/my-queue',
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
         *   //   "appEngineHttpTarget": {},
         *   //   "name": "my_name",
         *   //   "pullTarget": {},
         *   //   "purgeTime": "my_purgeTime",
         *   //   "rateLimits": {},
         *   //   "retryConfig": {},
         *   //   "state": "my_state"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudtasks.projects.locations.queues.resume
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The queue name. For example: `projects/PROJECT_ID/location/LOCATION_ID/queues/QUEUE_ID`
         * @param {().ResumeQueueRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        resume(params: Params$Resource$Projects$Locations$Queues$Resume, options: StreamMethodOptions): GaxiosPromise<Readable>;
        resume(params?: Params$Resource$Projects$Locations$Queues$Resume, options?: MethodOptions): GaxiosPromise<Schema$Queue>;
        resume(params: Params$Resource$Projects$Locations$Queues$Resume, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        resume(params: Params$Resource$Projects$Locations$Queues$Resume, options: MethodOptions | BodyResponseCallback<Schema$Queue>, callback: BodyResponseCallback<Schema$Queue>): void;
        resume(params: Params$Resource$Projects$Locations$Queues$Resume, callback: BodyResponseCallback<Schema$Queue>): void;
        resume(callback: BodyResponseCallback<Schema$Queue>): void;
        /**
         * cloudtasks.projects.locations.queues.setIamPolicy
         * @desc Sets the access control policy for a Queue. Replaces any existing policy.  Note: The Cloud Console does not check queue-level IAM permissions yet. Project-level permissions are required to use the Cloud Console.  Authorization requires the following [Google IAM](https://cloud.google.com/iam) permission on the specified resource parent:  * `cloudtasks.queues.setIamPolicy`
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudtasks.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudtasks = google.cloudtasks('v2beta2');
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
         *   const res = await cloudtasks.projects.locations.queues.setIamPolicy({
         *     // REQUIRED: The resource for which the policy is being specified.
         *     // See the operation documentation for the appropriate value for this field.
         *     resource: 'projects/my-project/locations/my-location/queues/my-queue',
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
         * @alias cloudtasks.projects.locations.queues.setIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         * @param {().SetIamPolicyRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        setIamPolicy(params: Params$Resource$Projects$Locations$Queues$Setiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        setIamPolicy(params?: Params$Resource$Projects$Locations$Queues$Setiampolicy, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        setIamPolicy(params: Params$Resource$Projects$Locations$Queues$Setiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        setIamPolicy(params: Params$Resource$Projects$Locations$Queues$Setiampolicy, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        setIamPolicy(params: Params$Resource$Projects$Locations$Queues$Setiampolicy, callback: BodyResponseCallback<Schema$Policy>): void;
        setIamPolicy(callback: BodyResponseCallback<Schema$Policy>): void;
        /**
         * cloudtasks.projects.locations.queues.testIamPermissions
         * @desc Returns permissions that a caller has on a Queue. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.  Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudtasks.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudtasks = google.cloudtasks('v2beta2');
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
         *   const res = await cloudtasks.projects.locations.queues.testIamPermissions({
         *     // REQUIRED: The resource for which the policy detail is being requested.
         *     // See the operation documentation for the appropriate value for this field.
         *     resource: 'projects/my-project/locations/my-location/queues/my-queue',
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
         * @alias cloudtasks.projects.locations.queues.testIamPermissions
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         * @param {().TestIamPermissionsRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        testIamPermissions(params: Params$Resource$Projects$Locations$Queues$Testiampermissions, options: StreamMethodOptions): GaxiosPromise<Readable>;
        testIamPermissions(params?: Params$Resource$Projects$Locations$Queues$Testiampermissions, options?: MethodOptions): GaxiosPromise<Schema$TestIamPermissionsResponse>;
        testIamPermissions(params: Params$Resource$Projects$Locations$Queues$Testiampermissions, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        testIamPermissions(params: Params$Resource$Projects$Locations$Queues$Testiampermissions, options: MethodOptions | BodyResponseCallback<Schema$TestIamPermissionsResponse>, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(params: Params$Resource$Projects$Locations$Queues$Testiampermissions, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
    }
    export interface Params$Resource$Projects$Locations$Queues$Create extends StandardParameters {
        /**
         * Required. The location name in which the queue will be created. For example: `projects/PROJECT_ID/locations/LOCATION_ID`  The list of allowed locations can be obtained by calling Cloud Tasks' implementation of ListLocations.
         */
        parent?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Queue;
    }
    export interface Params$Resource$Projects$Locations$Queues$Delete extends StandardParameters {
        /**
         * Required. The queue name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID`
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Locations$Queues$Get extends StandardParameters {
        /**
         * Required. The resource name of the queue. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID`
         */
        name?: string;
        /**
         * Optional. Read mask is used for a more granular control over what the API returns. By it includes all fields in Queue except for stats.
         */
        readMask?: string;
    }
    export interface Params$Resource$Projects$Locations$Queues$Getiampolicy extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$GetIamPolicyRequest;
    }
    export interface Params$Resource$Projects$Locations$Queues$List extends StandardParameters {
        /**
         * `filter` can be used to specify a subset of queues. Any Queue field can be used as a filter and several operators as supported. For example: `<=, <, >=, >, !=, =, :`. The filter syntax is the same as described in [Stackdriver's Advanced Logs Filters](https://cloud.google.com/logging/docs/view/advanced_filters).  Sample filter "app_engine_http_target: *".  Note that using filters might cause fewer queues than the requested_page size to be returned.
         */
        filter?: string;
        /**
         * Requested page size.  The maximum page size is 9800. If unspecified, the page size will be the maximum. Fewer queues than requested might be returned, even if more queues exist; use the next_page_token in the response to determine if more queues exist.
         */
        pageSize?: number;
        /**
         * A token identifying the page of results to return.  To request the first page results, page_token must be empty. To request the next page of results, page_token must be the value of next_page_token returned from the previous call to ListQueues method. It is an error to switch the value of the filter while iterating through pages.
         */
        pageToken?: string;
        /**
         * Required. The location name. For example: `projects/PROJECT_ID/locations/LOCATION_ID`
         */
        parent?: string;
    }
    export interface Params$Resource$Projects$Locations$Queues$Patch extends StandardParameters {
        /**
         * Caller-specified and required in CreateQueue, after which it becomes output only.  The queue name.  The queue name must have the following format: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID`  * `PROJECT_ID` can contain letters ([A-Za-z]), numbers ([0-9]),    hyphens (-), colons (:), or periods (.).    For more information, see    [Identifying    projects](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects) * `LOCATION_ID` is the canonical ID for the queue's location.    The list of available locations can be obtained by calling    ListLocations.    For more information, see https://cloud.google.com/about/locations/. * `QUEUE_ID` can contain letters ([A-Za-z]), numbers ([0-9]), or   hyphens (-). The maximum length is 100 characters.
         */
        name?: string;
        /**
         * A mask used to specify which fields of the queue are being updated.  If empty, then all fields will be updated.
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Queue;
    }
    export interface Params$Resource$Projects$Locations$Queues$Pause extends StandardParameters {
        /**
         * Required. The queue name. For example: `projects/PROJECT_ID/location/LOCATION_ID/queues/QUEUE_ID`
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$PauseQueueRequest;
    }
    export interface Params$Resource$Projects$Locations$Queues$Purge extends StandardParameters {
        /**
         * Required. The queue name. For example: `projects/PROJECT_ID/location/LOCATION_ID/queues/QUEUE_ID`
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$PurgeQueueRequest;
    }
    export interface Params$Resource$Projects$Locations$Queues$Resume extends StandardParameters {
        /**
         * Required. The queue name. For example: `projects/PROJECT_ID/location/LOCATION_ID/queues/QUEUE_ID`
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ResumeQueueRequest;
    }
    export interface Params$Resource$Projects$Locations$Queues$Setiampolicy extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$SetIamPolicyRequest;
    }
    export interface Params$Resource$Projects$Locations$Queues$Testiampermissions extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$TestIamPermissionsRequest;
    }
    export class Resource$Projects$Locations$Queues$Tasks {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * cloudtasks.projects.locations.queues.tasks.acknowledge
         * @desc Acknowledges a pull task.  The worker, that is, the entity that leased this task must call this method to indicate that the work associated with the task has finished.  The worker must acknowledge a task within the lease_duration or the lease will expire and the task will become available to be leased again. After the task is acknowledged, it will not be returned by a later LeaseTasks, GetTask, or ListTasks.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudtasks.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudtasks = google.cloudtasks('v2beta2');
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
         *   const res = await cloudtasks.projects.locations.queues.tasks.acknowledge({
         *     // Required. The task name. For example:
         *     // `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID/tasks/TASK_ID`
         *     name:
         *       'projects/my-project/locations/my-location/queues/my-queue/tasks/my-task',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "scheduleTime": "my_scheduleTime"
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
         * @alias cloudtasks.projects.locations.queues.tasks.acknowledge
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The task name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID/tasks/TASK_ID`
         * @param {().AcknowledgeTaskRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        acknowledge(params: Params$Resource$Projects$Locations$Queues$Tasks$Acknowledge, options: StreamMethodOptions): GaxiosPromise<Readable>;
        acknowledge(params?: Params$Resource$Projects$Locations$Queues$Tasks$Acknowledge, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        acknowledge(params: Params$Resource$Projects$Locations$Queues$Tasks$Acknowledge, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        acknowledge(params: Params$Resource$Projects$Locations$Queues$Tasks$Acknowledge, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        acknowledge(params: Params$Resource$Projects$Locations$Queues$Tasks$Acknowledge, callback: BodyResponseCallback<Schema$Empty>): void;
        acknowledge(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * cloudtasks.projects.locations.queues.tasks.cancelLease
         * @desc Cancel a pull task's lease.  The worker can use this method to cancel a task's lease by setting its schedule_time to now. This will make the task available to be leased to the next caller of LeaseTasks.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudtasks.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudtasks = google.cloudtasks('v2beta2');
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
         *   const res = await cloudtasks.projects.locations.queues.tasks.cancelLease({
         *     // Required. The task name. For example:
         *     // `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID/tasks/TASK_ID`
         *     name:
         *       'projects/my-project/locations/my-location/queues/my-queue/tasks/my-task',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "responseView": "my_responseView",
         *       //   "scheduleTime": "my_scheduleTime"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "appEngineHttpRequest": {},
         *   //   "createTime": "my_createTime",
         *   //   "name": "my_name",
         *   //   "pullMessage": {},
         *   //   "scheduleTime": "my_scheduleTime",
         *   //   "status": {},
         *   //   "view": "my_view"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudtasks.projects.locations.queues.tasks.cancelLease
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The task name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID/tasks/TASK_ID`
         * @param {().CancelLeaseRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        cancelLease(params: Params$Resource$Projects$Locations$Queues$Tasks$Cancellease, options: StreamMethodOptions): GaxiosPromise<Readable>;
        cancelLease(params?: Params$Resource$Projects$Locations$Queues$Tasks$Cancellease, options?: MethodOptions): GaxiosPromise<Schema$Task>;
        cancelLease(params: Params$Resource$Projects$Locations$Queues$Tasks$Cancellease, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        cancelLease(params: Params$Resource$Projects$Locations$Queues$Tasks$Cancellease, options: MethodOptions | BodyResponseCallback<Schema$Task>, callback: BodyResponseCallback<Schema$Task>): void;
        cancelLease(params: Params$Resource$Projects$Locations$Queues$Tasks$Cancellease, callback: BodyResponseCallback<Schema$Task>): void;
        cancelLease(callback: BodyResponseCallback<Schema$Task>): void;
        /**
         * cloudtasks.projects.locations.queues.tasks.create
         * @desc Creates a task and adds it to a queue.  Tasks cannot be updated after creation; there is no UpdateTask command.  * For App Engine queues, the maximum task size is   100KB. * For pull queues, the maximum task size is 1MB.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudtasks.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudtasks = google.cloudtasks('v2beta2');
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
         *   const res = await cloudtasks.projects.locations.queues.tasks.create({
         *     // Required. The queue name. For example:
         *     // `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID`
         *     //
         *     // The queue must already exist.
         *     parent: 'projects/my-project/locations/my-location/queues/my-queue',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "responseView": "my_responseView",
         *       //   "task": {}
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "appEngineHttpRequest": {},
         *   //   "createTime": "my_createTime",
         *   //   "name": "my_name",
         *   //   "pullMessage": {},
         *   //   "scheduleTime": "my_scheduleTime",
         *   //   "status": {},
         *   //   "view": "my_view"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudtasks.projects.locations.queues.tasks.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent Required. The queue name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID`  The queue must already exist.
         * @param {().CreateTaskRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Projects$Locations$Queues$Tasks$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Projects$Locations$Queues$Tasks$Create, options?: MethodOptions): GaxiosPromise<Schema$Task>;
        create(params: Params$Resource$Projects$Locations$Queues$Tasks$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Projects$Locations$Queues$Tasks$Create, options: MethodOptions | BodyResponseCallback<Schema$Task>, callback: BodyResponseCallback<Schema$Task>): void;
        create(params: Params$Resource$Projects$Locations$Queues$Tasks$Create, callback: BodyResponseCallback<Schema$Task>): void;
        create(callback: BodyResponseCallback<Schema$Task>): void;
        /**
         * cloudtasks.projects.locations.queues.tasks.delete
         * @desc Deletes a task.  A task can be deleted if it is scheduled or dispatched. A task cannot be deleted if it has completed successfully or permanently failed.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudtasks.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudtasks = google.cloudtasks('v2beta2');
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
         *   const res = await cloudtasks.projects.locations.queues.tasks.delete({
         *     // Required. The task name. For example:
         *     // `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID/tasks/TASK_ID`
         *     name:
         *       'projects/my-project/locations/my-location/queues/my-queue/tasks/my-task',
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
         * @alias cloudtasks.projects.locations.queues.tasks.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The task name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID/tasks/TASK_ID`
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Projects$Locations$Queues$Tasks$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Projects$Locations$Queues$Tasks$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Projects$Locations$Queues$Tasks$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Projects$Locations$Queues$Tasks$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Projects$Locations$Queues$Tasks$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * cloudtasks.projects.locations.queues.tasks.get
         * @desc Gets a task.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudtasks.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudtasks = google.cloudtasks('v2beta2');
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
         *   const res = await cloudtasks.projects.locations.queues.tasks.get({
         *     // Required. The task name. For example:
         *     // `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID/tasks/TASK_ID`
         *     name:
         *       'projects/my-project/locations/my-location/queues/my-queue/tasks/my-task',
         *     // The response_view specifies which subset of the Task will be
         *     // returned.
         *     //
         *     // By default response_view is BASIC; not all
         *     // information is retrieved by default because some data, such as
         *     // payloads, might be desirable to return only when needed because
         *     // of its large size or because of the sensitivity of data that it
         *     // contains.
         *     //
         *     // Authorization for FULL requires
         *     // `cloudtasks.tasks.fullView` [Google IAM](https://cloud.google.com/iam/)
         *     // permission on the Task resource.
         *     responseView: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "appEngineHttpRequest": {},
         *   //   "createTime": "my_createTime",
         *   //   "name": "my_name",
         *   //   "pullMessage": {},
         *   //   "scheduleTime": "my_scheduleTime",
         *   //   "status": {},
         *   //   "view": "my_view"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudtasks.projects.locations.queues.tasks.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The task name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID/tasks/TASK_ID`
         * @param {string=} params.responseView The response_view specifies which subset of the Task will be returned.  By default response_view is BASIC; not all information is retrieved by default because some data, such as payloads, might be desirable to return only when needed because of its large size or because of the sensitivity of data that it contains.  Authorization for FULL requires `cloudtasks.tasks.fullView` [Google IAM](https://cloud.google.com/iam/) permission on the Task resource.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Locations$Queues$Tasks$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Locations$Queues$Tasks$Get, options?: MethodOptions): GaxiosPromise<Schema$Task>;
        get(params: Params$Resource$Projects$Locations$Queues$Tasks$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Locations$Queues$Tasks$Get, options: MethodOptions | BodyResponseCallback<Schema$Task>, callback: BodyResponseCallback<Schema$Task>): void;
        get(params: Params$Resource$Projects$Locations$Queues$Tasks$Get, callback: BodyResponseCallback<Schema$Task>): void;
        get(callback: BodyResponseCallback<Schema$Task>): void;
        /**
         * cloudtasks.projects.locations.queues.tasks.lease
         * @desc Leases tasks from a pull queue for lease_duration.  This method is invoked by the worker to obtain a lease. The worker must acknowledge the task via AcknowledgeTask after they have performed the work associated with the task.  The payload is intended to store data that the worker needs to perform the work associated with the task. To return the payloads in the response, set response_view to FULL.  A maximum of 10 qps of LeaseTasks requests are allowed per queue. RESOURCE_EXHAUSTED is returned when this limit is exceeded. RESOURCE_EXHAUSTED is also returned when max_tasks_dispatched_per_second is exceeded.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudtasks.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudtasks = google.cloudtasks('v2beta2');
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
         *   const res = await cloudtasks.projects.locations.queues.tasks.lease({
         *     // Required. The queue name. For example:
         *     // `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID`
         *     parent: 'projects/my-project/locations/my-location/queues/my-queue',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "filter": "my_filter",
         *       //   "leaseDuration": "my_leaseDuration",
         *       //   "maxTasks": 0,
         *       //   "responseView": "my_responseView"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "tasks": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudtasks.projects.locations.queues.tasks.lease
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent Required. The queue name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID`
         * @param {().LeaseTasksRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        lease(params: Params$Resource$Projects$Locations$Queues$Tasks$Lease, options: StreamMethodOptions): GaxiosPromise<Readable>;
        lease(params?: Params$Resource$Projects$Locations$Queues$Tasks$Lease, options?: MethodOptions): GaxiosPromise<Schema$LeaseTasksResponse>;
        lease(params: Params$Resource$Projects$Locations$Queues$Tasks$Lease, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        lease(params: Params$Resource$Projects$Locations$Queues$Tasks$Lease, options: MethodOptions | BodyResponseCallback<Schema$LeaseTasksResponse>, callback: BodyResponseCallback<Schema$LeaseTasksResponse>): void;
        lease(params: Params$Resource$Projects$Locations$Queues$Tasks$Lease, callback: BodyResponseCallback<Schema$LeaseTasksResponse>): void;
        lease(callback: BodyResponseCallback<Schema$LeaseTasksResponse>): void;
        /**
         * cloudtasks.projects.locations.queues.tasks.list
         * @desc Lists the tasks in a queue.  By default, only the BASIC view is retrieved due to performance considerations; response_view controls the subset of information which is returned.  The tasks may be returned in any order. The ordering may change at any time.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudtasks.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudtasks = google.cloudtasks('v2beta2');
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
         *   const res = await cloudtasks.projects.locations.queues.tasks.list({
         *     // Maximum page size.
         *     //
         *     // Fewer tasks than requested might be returned, even if more tasks exist; use
         *     // next_page_token in the response to
         *     // determine if more tasks exist.
         *     //
         *     // The maximum page size is 1000. If unspecified, the page size will be the
         *     // maximum.
         *     pageSize: 'placeholder-value',
         *     // A token identifying the page of results to return.
         *     //
         *     // To request the first page results, page_token must be empty. To
         *     // request the next page of results, page_token must be the value of
         *     // next_page_token returned
         *     // from the previous call to ListTasks
         *     // method.
         *     //
         *     // The page token is valid for only 2 hours.
         *     pageToken: 'placeholder-value',
         *     // Required. The queue name. For example:
         *     // `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID`
         *     parent: 'projects/my-project/locations/my-location/queues/my-queue',
         *     // The response_view specifies which subset of the Task will be
         *     // returned.
         *     //
         *     // By default response_view is BASIC; not all
         *     // information is retrieved by default because some data, such as
         *     // payloads, might be desirable to return only when needed because
         *     // of its large size or because of the sensitivity of data that it
         *     // contains.
         *     //
         *     // Authorization for FULL requires
         *     // `cloudtasks.tasks.fullView` [Google IAM](https://cloud.google.com/iam/)
         *     // permission on the Task resource.
         *     responseView: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "tasks": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudtasks.projects.locations.queues.tasks.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.pageSize Maximum page size.  Fewer tasks than requested might be returned, even if more tasks exist; use next_page_token in the response to determine if more tasks exist.  The maximum page size is 1000. If unspecified, the page size will be the maximum.
         * @param {string=} params.pageToken A token identifying the page of results to return.  To request the first page results, page_token must be empty. To request the next page of results, page_token must be the value of next_page_token returned from the previous call to ListTasks method.  The page token is valid for only 2 hours.
         * @param {string} params.parent Required. The queue name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID`
         * @param {string=} params.responseView The response_view specifies which subset of the Task will be returned.  By default response_view is BASIC; not all information is retrieved by default because some data, such as payloads, might be desirable to return only when needed because of its large size or because of the sensitivity of data that it contains.  Authorization for FULL requires `cloudtasks.tasks.fullView` [Google IAM](https://cloud.google.com/iam/) permission on the Task resource.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Locations$Queues$Tasks$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Locations$Queues$Tasks$List, options?: MethodOptions): GaxiosPromise<Schema$ListTasksResponse>;
        list(params: Params$Resource$Projects$Locations$Queues$Tasks$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Locations$Queues$Tasks$List, options: MethodOptions | BodyResponseCallback<Schema$ListTasksResponse>, callback: BodyResponseCallback<Schema$ListTasksResponse>): void;
        list(params: Params$Resource$Projects$Locations$Queues$Tasks$List, callback: BodyResponseCallback<Schema$ListTasksResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListTasksResponse>): void;
        /**
         * cloudtasks.projects.locations.queues.tasks.renewLease
         * @desc Renew the current lease of a pull task.  The worker can use this method to extend the lease by a new duration, starting from now. The new task lease will be returned in the task's schedule_time.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudtasks.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudtasks = google.cloudtasks('v2beta2');
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
         *   const res = await cloudtasks.projects.locations.queues.tasks.renewLease({
         *     // Required. The task name. For example:
         *     // `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID/tasks/TASK_ID`
         *     name:
         *       'projects/my-project/locations/my-location/queues/my-queue/tasks/my-task',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "leaseDuration": "my_leaseDuration",
         *       //   "responseView": "my_responseView",
         *       //   "scheduleTime": "my_scheduleTime"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "appEngineHttpRequest": {},
         *   //   "createTime": "my_createTime",
         *   //   "name": "my_name",
         *   //   "pullMessage": {},
         *   //   "scheduleTime": "my_scheduleTime",
         *   //   "status": {},
         *   //   "view": "my_view"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudtasks.projects.locations.queues.tasks.renewLease
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The task name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID/tasks/TASK_ID`
         * @param {().RenewLeaseRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        renewLease(params: Params$Resource$Projects$Locations$Queues$Tasks$Renewlease, options: StreamMethodOptions): GaxiosPromise<Readable>;
        renewLease(params?: Params$Resource$Projects$Locations$Queues$Tasks$Renewlease, options?: MethodOptions): GaxiosPromise<Schema$Task>;
        renewLease(params: Params$Resource$Projects$Locations$Queues$Tasks$Renewlease, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        renewLease(params: Params$Resource$Projects$Locations$Queues$Tasks$Renewlease, options: MethodOptions | BodyResponseCallback<Schema$Task>, callback: BodyResponseCallback<Schema$Task>): void;
        renewLease(params: Params$Resource$Projects$Locations$Queues$Tasks$Renewlease, callback: BodyResponseCallback<Schema$Task>): void;
        renewLease(callback: BodyResponseCallback<Schema$Task>): void;
        /**
         * cloudtasks.projects.locations.queues.tasks.run
         * @desc Forces a task to run now.  When this method is called, Cloud Tasks will dispatch the task, even if the task is already running, the queue has reached its RateLimits or is PAUSED.  This command is meant to be used for manual debugging. For example, RunTask can be used to retry a failed task after a fix has been made or to manually force a task to be dispatched now.  The dispatched task is returned. That is, the task that is returned contains the status after the task is dispatched but before the task is received by its target.  If Cloud Tasks receives a successful response from the task's target, then the task will be deleted; otherwise the task's schedule_time will be reset to the time that RunTask was called plus the retry delay specified in the queue's RetryConfig.  RunTask returns NOT_FOUND when it is called on a task that has already succeeded or permanently failed.  RunTask cannot be called on a pull task.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudtasks.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudtasks = google.cloudtasks('v2beta2');
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
         *   const res = await cloudtasks.projects.locations.queues.tasks.run({
         *     // Required. The task name. For example:
         *     // `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID/tasks/TASK_ID`
         *     name:
         *       'projects/my-project/locations/my-location/queues/my-queue/tasks/my-task',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "responseView": "my_responseView"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "appEngineHttpRequest": {},
         *   //   "createTime": "my_createTime",
         *   //   "name": "my_name",
         *   //   "pullMessage": {},
         *   //   "scheduleTime": "my_scheduleTime",
         *   //   "status": {},
         *   //   "view": "my_view"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudtasks.projects.locations.queues.tasks.run
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The task name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID/tasks/TASK_ID`
         * @param {().RunTaskRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        run(params: Params$Resource$Projects$Locations$Queues$Tasks$Run, options: StreamMethodOptions): GaxiosPromise<Readable>;
        run(params?: Params$Resource$Projects$Locations$Queues$Tasks$Run, options?: MethodOptions): GaxiosPromise<Schema$Task>;
        run(params: Params$Resource$Projects$Locations$Queues$Tasks$Run, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        run(params: Params$Resource$Projects$Locations$Queues$Tasks$Run, options: MethodOptions | BodyResponseCallback<Schema$Task>, callback: BodyResponseCallback<Schema$Task>): void;
        run(params: Params$Resource$Projects$Locations$Queues$Tasks$Run, callback: BodyResponseCallback<Schema$Task>): void;
        run(callback: BodyResponseCallback<Schema$Task>): void;
    }
    export interface Params$Resource$Projects$Locations$Queues$Tasks$Acknowledge extends StandardParameters {
        /**
         * Required. The task name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID/tasks/TASK_ID`
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$AcknowledgeTaskRequest;
    }
    export interface Params$Resource$Projects$Locations$Queues$Tasks$Cancellease extends StandardParameters {
        /**
         * Required. The task name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID/tasks/TASK_ID`
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$CancelLeaseRequest;
    }
    export interface Params$Resource$Projects$Locations$Queues$Tasks$Create extends StandardParameters {
        /**
         * Required. The queue name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID`  The queue must already exist.
         */
        parent?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$CreateTaskRequest;
    }
    export interface Params$Resource$Projects$Locations$Queues$Tasks$Delete extends StandardParameters {
        /**
         * Required. The task name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID/tasks/TASK_ID`
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Locations$Queues$Tasks$Get extends StandardParameters {
        /**
         * Required. The task name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID/tasks/TASK_ID`
         */
        name?: string;
        /**
         * The response_view specifies which subset of the Task will be returned.  By default response_view is BASIC; not all information is retrieved by default because some data, such as payloads, might be desirable to return only when needed because of its large size or because of the sensitivity of data that it contains.  Authorization for FULL requires `cloudtasks.tasks.fullView` [Google IAM](https://cloud.google.com/iam/) permission on the Task resource.
         */
        responseView?: string;
    }
    export interface Params$Resource$Projects$Locations$Queues$Tasks$Lease extends StandardParameters {
        /**
         * Required. The queue name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID`
         */
        parent?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$LeaseTasksRequest;
    }
    export interface Params$Resource$Projects$Locations$Queues$Tasks$List extends StandardParameters {
        /**
         * Maximum page size.  Fewer tasks than requested might be returned, even if more tasks exist; use next_page_token in the response to determine if more tasks exist.  The maximum page size is 1000. If unspecified, the page size will be the maximum.
         */
        pageSize?: number;
        /**
         * A token identifying the page of results to return.  To request the first page results, page_token must be empty. To request the next page of results, page_token must be the value of next_page_token returned from the previous call to ListTasks method.  The page token is valid for only 2 hours.
         */
        pageToken?: string;
        /**
         * Required. The queue name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID`
         */
        parent?: string;
        /**
         * The response_view specifies which subset of the Task will be returned.  By default response_view is BASIC; not all information is retrieved by default because some data, such as payloads, might be desirable to return only when needed because of its large size or because of the sensitivity of data that it contains.  Authorization for FULL requires `cloudtasks.tasks.fullView` [Google IAM](https://cloud.google.com/iam/) permission on the Task resource.
         */
        responseView?: string;
    }
    export interface Params$Resource$Projects$Locations$Queues$Tasks$Renewlease extends StandardParameters {
        /**
         * Required. The task name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID/tasks/TASK_ID`
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$RenewLeaseRequest;
    }
    export interface Params$Resource$Projects$Locations$Queues$Tasks$Run extends StandardParameters {
        /**
         * Required. The task name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID/tasks/TASK_ID`
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$RunTaskRequest;
    }
    export {};
}
