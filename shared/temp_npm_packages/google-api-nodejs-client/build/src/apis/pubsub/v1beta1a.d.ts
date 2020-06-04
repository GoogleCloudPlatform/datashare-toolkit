/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace pubsub_v1beta1a {
    export interface Options extends GlobalOptions {
        version: 'v1beta1a';
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
     * Cloud Pub/Sub API
     *
     * Provides reliable, many-to-many, asynchronous messaging between applications.
     *
     * @example
     * const {google} = require('googleapis');
     * const pubsub = google.pubsub('v1beta1a');
     *
     * @namespace pubsub
     * @type {Function}
     * @version v1beta1a
     * @variation v1beta1a
     * @param {object=} options Options for Pubsub
     */
    export class Pubsub {
        context: APIRequestContext;
        subscriptions: Resource$Subscriptions;
        topics: Resource$Topics;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    /**
     * Request for the Acknowledge method.
     */
    export interface Schema$AcknowledgeRequest {
        /**
         * The acknowledgment ID for the message being acknowledged. This was returned by the Pub/Sub system in the Pull response.
         */
        ackId?: string[] | null;
        /**
         * The subscription whose message is being acknowledged.
         */
        subscription?: string | null;
    }
    /**
     * An empty message that you can re-use to avoid defining duplicated empty messages in your project. A typical example is to use it as argument or the return value of a service API. For instance:    service Foo {     rpc Bar (proto2.Empty) returns (proto2.Empty) { };   };  BEGIN GOOGLE-INTERNAL The difference between this one and net/rpc/empty-message.proto is that 1) The generated message here is in proto2 C++ API. 2) The proto2.Empty has minimum dependencies    (no message_set or net/rpc dependencies) END GOOGLE-INTERNAL
     */
    export interface Schema$Empty {
    }
    /**
     * A key-value pair applied to a given object.
     */
    export interface Schema$Label {
        /**
         * The key of a label is a syntactically valid URL (as per RFC 1738) with the &quot;scheme&quot; and initial slashes omitted and with the additional restrictions noted below.  Each key should be globally unique.  The &quot;host&quot; portion is called the &quot;namespace&quot; and is not necessarily resolvable to a network endpoint.  Instead, the namespace indicates what system or entity defines the semantics of the label.  Namespaces do not restrict the set of objects to which a label may be associated.  Keys are defined by the following grammar:    key          = hostname &quot;/&quot; kpath   kpath        = ksegment *[ &quot;/&quot; ksegment ]   ksegment     = alphadigit | *[ alphadigit | &quot;-&quot; | &quot;_&quot; | &quot;.&quot; ]  where &quot;hostname&quot; and &quot;alphadigit&quot; are defined as in RFC 1738.  Example key:   spanner.google.com/universe
         */
        key?: string | null;
        /**
         * An integer value.
         */
        numValue?: string | null;
        /**
         * A string value.
         */
        strValue?: string | null;
    }
    /**
     * Response for the ListSubscriptions method.
     */
    export interface Schema$ListSubscriptionsResponse {
        /**
         * If not empty, indicates that there are more subscriptions that match the request and this value should be passed to the next &lt;code&gt;ListSubscriptionsRequest&lt;/code&gt; to continue.
         */
        nextPageToken?: string | null;
        /**
         * The subscriptions that match the request.
         */
        subscription?: Schema$Subscription[];
    }
    /**
     * Response for the ListTopics method.
     */
    export interface Schema$ListTopicsResponse {
        /**
         * If not empty, indicates that there are more topics that match the request, and this value should be passed to the next &lt;code&gt;ListTopicsRequest&lt;/code&gt; to continue.
         */
        nextPageToken?: string | null;
        /**
         * The resulting topics.
         */
        topic?: Schema$Topic[];
    }
    /**
     * Request for the ModifyAckDeadline method.
     */
    export interface Schema$ModifyAckDeadlineRequest {
        /**
         * The new ack deadline with respect to the time this request was sent to the Pub/Sub system. Must be &gt;= 0. For example, if the value is 10, the new ack deadline will expire 10 seconds after the ModifyAckDeadline call was made. Specifying zero may immediately make the message available for another pull request.
         */
        ackDeadlineSeconds?: number | null;
        /**
         * The acknowledgment ID. Either this or ack_ids must be populated, not both.
         */
        ackId?: string | null;
        /**
         * List of acknowledgment IDs. Either this field or ack_id should be populated, not both.
         */
        ackIds?: string[] | null;
        /**
         * Next Index: 5 The name of the subscription from which messages are being pulled.
         */
        subscription?: string | null;
    }
    /**
     * Request for the ModifyPushConfig method.
     */
    export interface Schema$ModifyPushConfigRequest {
        /**
         * An empty &lt;code&gt;push_config&lt;/code&gt; indicates that the Pub/Sub system should pause pushing messages from the given subscription.
         */
        pushConfig?: Schema$PushConfig;
        /**
         * The name of the subscription.
         */
        subscription?: string | null;
    }
    /**
     * Request for the PublishBatch method.
     */
    export interface Schema$PublishBatchRequest {
        /**
         * The messages to publish.
         */
        messages?: Schema$PubsubMessage[];
        /**
         * The messages in the request will be published on this topic.
         */
        topic?: string | null;
    }
    /**
     * Response for the PublishBatch method.
     */
    export interface Schema$PublishBatchResponse {
        /**
         * The server-assigned ID of each published message, in the same order as the messages in the request. IDs are guaranteed to be unique within the topic.
         */
        messageIds?: string[] | null;
    }
    /**
     * Request for the Publish method.
     */
    export interface Schema$PublishRequest {
        /**
         * The message to publish.
         */
        message?: Schema$PubsubMessage;
        /**
         * The message in the request will be published on this topic.
         */
        topic?: string | null;
    }
    /**
     * An event indicating a received message or truncation event.
     */
    export interface Schema$PubsubEvent {
        /**
         * Indicates that this subscription has been deleted. (Note that pull subscribers will always receive NOT_FOUND in response in their pull request on the subscription, rather than seeing this boolean.)
         */
        deleted?: boolean | null;
        /**
         * A received message.
         */
        message?: Schema$PubsubMessage;
        /**
         * The subscription that received the event.
         */
        subscription?: string | null;
        /**
         * Indicates that this subscription has been truncated.
         */
        truncated?: boolean | null;
    }
    /**
     * A message data and its labels.
     */
    export interface Schema$PubsubMessage {
        /**
         * The message payload.
         */
        data?: string | null;
        /**
         * Optional list of labels for this message. Keys in this collection must be unique.
         */
        label?: Schema$Label[];
        /**
         * ID of this message assigned by the server at publication time. Guaranteed to be unique within the topic. This value may be read by a subscriber that receives a PubsubMessage via a Pull call or a push delivery. It must not be populated by a publisher in a Publish call.
         */
        messageId?: string | null;
        /**
         * The time at which the message was published. The time is milliseconds since the UNIX epoch.
         */
        publishTime?: string | null;
    }
    /**
     * Request for the PullBatch method.
     */
    export interface Schema$PullBatchRequest {
        /**
         * The maximum number of PubsubEvents returned for this request. The Pub/Sub system may return fewer than the number of events specified.
         */
        maxEvents?: number | null;
        /**
         * If this is specified as true the system will respond immediately even if it is not able to return a message in the Pull response. Otherwise the system is allowed to wait until at least one message is available rather than returning no messages. The client may cancel the request if it does not wish to wait any longer for the response.
         */
        returnImmediately?: boolean | null;
        /**
         * The subscription from which messages should be pulled.
         */
        subscription?: string | null;
    }
    /**
     * Response for the PullBatch method.
     */
    export interface Schema$PullBatchResponse {
        /**
         * Received Pub/Sub messages or status events. The Pub/Sub system will return zero messages if there are no more messages available in the backlog. The Pub/Sub system may return fewer than the max_events requested even if there are more messages available in the backlog.
         */
        pullResponses?: Schema$PullResponse[];
    }
    /**
     * Request for the Pull method.
     */
    export interface Schema$PullRequest {
        /**
         * If this is specified as true the system will respond immediately even if it is not able to return a message in the Pull response. Otherwise the system is allowed to wait until at least one message is available rather than returning FAILED_PRECONDITION. The client may cancel the request if it does not wish to wait any longer for the response.
         */
        returnImmediately?: boolean | null;
        /**
         * The subscription from which a message should be pulled.
         */
        subscription?: string | null;
    }
    /**
     * Either a &lt;code&gt;PubsubMessage&lt;/code&gt; or a truncation event. One of these two must be populated.
     */
    export interface Schema$PullResponse {
        /**
         * This ID must be used to acknowledge the received event or message.
         */
        ackId?: string | null;
        /**
         * A pubsub message or truncation event.
         */
        pubsubEvent?: Schema$PubsubEvent;
    }
    /**
     * Configuration for a push delivery endpoint.
     */
    export interface Schema$PushConfig {
        /**
         * A URL locating the endpoint to which messages should be pushed. For example, a Webhook endpoint might use &quot;https://example.com/push&quot;.
         */
        pushEndpoint?: string | null;
    }
    /**
     * A subscription resource.
     */
    export interface Schema$Subscription {
        /**
         * For either push or pull delivery, the value is the maximum time after a subscriber receives a message before the subscriber should acknowledge or Nack the message. If the Ack deadline for a message passes without an Ack or a Nack, the Pub/Sub system will eventually redeliver the message. If a subscriber acknowledges after the deadline, the Pub/Sub system may accept the Ack, but it is possible that the message has been already delivered again. Multiple Acks to the message are allowed and will succeed.  For push delivery, this value is used to set the request timeout for the call to the push endpoint.  For pull delivery, this value is used as the initial value for the Ack deadline. It may be overridden for each message using its corresponding ack_id with &lt;code&gt;ModifyAckDeadline&lt;/code&gt;. While a message is outstanding (i.e. it has been delivered to a pull subscriber and the subscriber has not yet Acked or Nacked), the Pub/Sub system will not deliver that message to another pull subscriber (on a best-effort basis).
         */
        ackDeadlineSeconds?: number | null;
        /**
         * Name of the subscription.
         */
        name?: string | null;
        /**
         * If push delivery is used with this subscription, this field is used to configure it.
         */
        pushConfig?: Schema$PushConfig;
        /**
         * The name of the topic from which this subscription is receiving messages.
         */
        topic?: string | null;
    }
    /**
     * A topic resource.
     */
    export interface Schema$Topic {
        /**
         * Name of the topic.
         */
        name?: string | null;
    }
    export class Resource$Subscriptions {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * pubsub.subscriptions.acknowledge
         * @desc Acknowledges a particular received message: the Pub/Sub system can remove the given message from the subscription. Acknowledging a message whose Ack deadline has expired may succeed, but the message could have been already redelivered. Acknowledging a message more than once will not result in an error. This is only used for messages received via pull.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/pubsub.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const pubsub = google.pubsub('v1beta1a');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/pubsub',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await pubsub.subscriptions.acknowledge({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "ackId": [],
         *       //   "subscription": "my_subscription"
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
         * @alias pubsub.subscriptions.acknowledge
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().AcknowledgeRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        acknowledge(params: Params$Resource$Subscriptions$Acknowledge, options: StreamMethodOptions): GaxiosPromise<Readable>;
        acknowledge(params?: Params$Resource$Subscriptions$Acknowledge, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        acknowledge(params: Params$Resource$Subscriptions$Acknowledge, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        acknowledge(params: Params$Resource$Subscriptions$Acknowledge, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        acknowledge(params: Params$Resource$Subscriptions$Acknowledge, callback: BodyResponseCallback<Schema$Empty>): void;
        acknowledge(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * pubsub.subscriptions.create
         * @desc Creates a subscription on a given topic for a given subscriber. If the subscription already exists, returns ALREADY_EXISTS. If the corresponding topic doesn't exist, returns NOT_FOUND.  If the name is not provided in the request, the server will assign a random name for this subscription on the same project as the topic.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/pubsub.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const pubsub = google.pubsub('v1beta1a');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/pubsub',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await pubsub.subscriptions.create({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "ackDeadlineSeconds": 0,
         *       //   "name": "my_name",
         *       //   "pushConfig": {},
         *       //   "topic": "my_topic"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "ackDeadlineSeconds": 0,
         *   //   "name": "my_name",
         *   //   "pushConfig": {},
         *   //   "topic": "my_topic"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias pubsub.subscriptions.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().Subscription} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Subscriptions$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Subscriptions$Create, options?: MethodOptions): GaxiosPromise<Schema$Subscription>;
        create(params: Params$Resource$Subscriptions$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Subscriptions$Create, options: MethodOptions | BodyResponseCallback<Schema$Subscription>, callback: BodyResponseCallback<Schema$Subscription>): void;
        create(params: Params$Resource$Subscriptions$Create, callback: BodyResponseCallback<Schema$Subscription>): void;
        create(callback: BodyResponseCallback<Schema$Subscription>): void;
        /**
         * pubsub.subscriptions.delete
         * @desc Deletes an existing subscription. All pending messages in the subscription are immediately dropped. Calls to Pull after deletion will return NOT_FOUND.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/pubsub.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const pubsub = google.pubsub('v1beta1a');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/pubsub',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await pubsub.subscriptions.delete({
         *     // The subscription to delete.
         *     subscription: '.*',
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
         * @alias pubsub.subscriptions.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.subscription The subscription to delete.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Subscriptions$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Subscriptions$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Subscriptions$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Subscriptions$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Subscriptions$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * pubsub.subscriptions.get
         * @desc Gets the configuration details of a subscription.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/pubsub.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const pubsub = google.pubsub('v1beta1a');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/pubsub',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await pubsub.subscriptions.get({
         *     // The name of the subscription to get.
         *     subscription: '.*',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "ackDeadlineSeconds": 0,
         *   //   "name": "my_name",
         *   //   "pushConfig": {},
         *   //   "topic": "my_topic"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias pubsub.subscriptions.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.subscription The name of the subscription to get.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Subscriptions$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Subscriptions$Get, options?: MethodOptions): GaxiosPromise<Schema$Subscription>;
        get(params: Params$Resource$Subscriptions$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Subscriptions$Get, options: MethodOptions | BodyResponseCallback<Schema$Subscription>, callback: BodyResponseCallback<Schema$Subscription>): void;
        get(params: Params$Resource$Subscriptions$Get, callback: BodyResponseCallback<Schema$Subscription>): void;
        get(callback: BodyResponseCallback<Schema$Subscription>): void;
        /**
         * pubsub.subscriptions.list
         * @desc Lists matching subscriptions.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/pubsub.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const pubsub = google.pubsub('v1beta1a');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/pubsub',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await pubsub.subscriptions.list({
         *     // Maximum number of subscriptions to return.
         *     maxResults: 'placeholder-value',
         *     // The value obtained in the last <code>ListSubscriptionsResponse</code>
         *     // for continuation.
         *     pageToken: 'placeholder-value',
         *     // A valid label query expression.
         *     query: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "subscription": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias pubsub.subscriptions.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.maxResults Maximum number of subscriptions to return.
         * @param {string=} params.pageToken The value obtained in the last <code>ListSubscriptionsResponse</code> for continuation.
         * @param {string=} params.query A valid label query expression.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Subscriptions$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Subscriptions$List, options?: MethodOptions): GaxiosPromise<Schema$ListSubscriptionsResponse>;
        list(params: Params$Resource$Subscriptions$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Subscriptions$List, options: MethodOptions | BodyResponseCallback<Schema$ListSubscriptionsResponse>, callback: BodyResponseCallback<Schema$ListSubscriptionsResponse>): void;
        list(params: Params$Resource$Subscriptions$List, callback: BodyResponseCallback<Schema$ListSubscriptionsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListSubscriptionsResponse>): void;
        /**
         * pubsub.subscriptions.modifyAckDeadline
         * @desc Modifies the Ack deadline for a message received from a pull request.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/pubsub.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const pubsub = google.pubsub('v1beta1a');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/pubsub',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await pubsub.subscriptions.modifyAckDeadline({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "ackDeadlineSeconds": 0,
         *       //   "ackId": "my_ackId",
         *       //   "ackIds": [],
         *       //   "subscription": "my_subscription"
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
         * @alias pubsub.subscriptions.modifyAckDeadline
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().ModifyAckDeadlineRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        modifyAckDeadline(params: Params$Resource$Subscriptions$Modifyackdeadline, options: StreamMethodOptions): GaxiosPromise<Readable>;
        modifyAckDeadline(params?: Params$Resource$Subscriptions$Modifyackdeadline, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        modifyAckDeadline(params: Params$Resource$Subscriptions$Modifyackdeadline, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        modifyAckDeadline(params: Params$Resource$Subscriptions$Modifyackdeadline, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        modifyAckDeadline(params: Params$Resource$Subscriptions$Modifyackdeadline, callback: BodyResponseCallback<Schema$Empty>): void;
        modifyAckDeadline(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * pubsub.subscriptions.modifyPushConfig
         * @desc Modifies the <code>PushConfig</code> for a specified subscription. This method can be used to suspend the flow of messages to an endpoint by clearing the <code>PushConfig</code> field in the request. Messages will be accumulated for delivery even if no push configuration is defined or while the configuration is modified.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/pubsub.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const pubsub = google.pubsub('v1beta1a');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/pubsub',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await pubsub.subscriptions.modifyPushConfig({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "pushConfig": {},
         *       //   "subscription": "my_subscription"
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
         * @alias pubsub.subscriptions.modifyPushConfig
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().ModifyPushConfigRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        modifyPushConfig(params: Params$Resource$Subscriptions$Modifypushconfig, options: StreamMethodOptions): GaxiosPromise<Readable>;
        modifyPushConfig(params?: Params$Resource$Subscriptions$Modifypushconfig, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        modifyPushConfig(params: Params$Resource$Subscriptions$Modifypushconfig, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        modifyPushConfig(params: Params$Resource$Subscriptions$Modifypushconfig, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        modifyPushConfig(params: Params$Resource$Subscriptions$Modifypushconfig, callback: BodyResponseCallback<Schema$Empty>): void;
        modifyPushConfig(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * pubsub.subscriptions.pull
         * @desc Pulls a single message from the server. If return_immediately is true, and no messages are available in the subscription, this method returns FAILED_PRECONDITION. The system is free to return an UNAVAILABLE error if no messages are available in a reasonable amount of time (to reduce system load).
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/pubsub.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const pubsub = google.pubsub('v1beta1a');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/pubsub',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await pubsub.subscriptions.pull({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "returnImmediately": false,
         *       //   "subscription": "my_subscription"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "ackId": "my_ackId",
         *   //   "pubsubEvent": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias pubsub.subscriptions.pull
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().PullRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        pull(params: Params$Resource$Subscriptions$Pull, options: StreamMethodOptions): GaxiosPromise<Readable>;
        pull(params?: Params$Resource$Subscriptions$Pull, options?: MethodOptions): GaxiosPromise<Schema$PullResponse>;
        pull(params: Params$Resource$Subscriptions$Pull, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        pull(params: Params$Resource$Subscriptions$Pull, options: MethodOptions | BodyResponseCallback<Schema$PullResponse>, callback: BodyResponseCallback<Schema$PullResponse>): void;
        pull(params: Params$Resource$Subscriptions$Pull, callback: BodyResponseCallback<Schema$PullResponse>): void;
        pull(callback: BodyResponseCallback<Schema$PullResponse>): void;
        /**
         * pubsub.subscriptions.pullBatch
         * @desc Pulls messages from the server. Returns an empty list if there are no messages available in the backlog. The system is free to return UNAVAILABLE if there are too many pull requests outstanding for the given subscription.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/pubsub.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const pubsub = google.pubsub('v1beta1a');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/pubsub',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await pubsub.subscriptions.pullBatch({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "maxEvents": 0,
         *       //   "returnImmediately": false,
         *       //   "subscription": "my_subscription"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "pullResponses": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias pubsub.subscriptions.pullBatch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().PullBatchRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        pullBatch(params: Params$Resource$Subscriptions$Pullbatch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        pullBatch(params?: Params$Resource$Subscriptions$Pullbatch, options?: MethodOptions): GaxiosPromise<Schema$PullBatchResponse>;
        pullBatch(params: Params$Resource$Subscriptions$Pullbatch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        pullBatch(params: Params$Resource$Subscriptions$Pullbatch, options: MethodOptions | BodyResponseCallback<Schema$PullBatchResponse>, callback: BodyResponseCallback<Schema$PullBatchResponse>): void;
        pullBatch(params: Params$Resource$Subscriptions$Pullbatch, callback: BodyResponseCallback<Schema$PullBatchResponse>): void;
        pullBatch(callback: BodyResponseCallback<Schema$PullBatchResponse>): void;
    }
    export interface Params$Resource$Subscriptions$Acknowledge extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$AcknowledgeRequest;
    }
    export interface Params$Resource$Subscriptions$Create extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$Subscription;
    }
    export interface Params$Resource$Subscriptions$Delete extends StandardParameters {
        /**
         * The subscription to delete.
         */
        subscription?: string;
    }
    export interface Params$Resource$Subscriptions$Get extends StandardParameters {
        /**
         * The name of the subscription to get.
         */
        subscription?: string;
    }
    export interface Params$Resource$Subscriptions$List extends StandardParameters {
        /**
         * Maximum number of subscriptions to return.
         */
        maxResults?: number;
        /**
         * The value obtained in the last <code>ListSubscriptionsResponse</code> for continuation.
         */
        pageToken?: string;
        /**
         * A valid label query expression.
         */
        query?: string;
    }
    export interface Params$Resource$Subscriptions$Modifyackdeadline extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$ModifyAckDeadlineRequest;
    }
    export interface Params$Resource$Subscriptions$Modifypushconfig extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$ModifyPushConfigRequest;
    }
    export interface Params$Resource$Subscriptions$Pull extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$PullRequest;
    }
    export interface Params$Resource$Subscriptions$Pullbatch extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$PullBatchRequest;
    }
    export class Resource$Topics {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * pubsub.topics.create
         * @desc Creates the given topic with the given name.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/pubsub.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const pubsub = google.pubsub('v1beta1a');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/pubsub',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await pubsub.topics.create({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "name": "my_name"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "name": "my_name"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias pubsub.topics.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().Topic} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Topics$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Topics$Create, options?: MethodOptions): GaxiosPromise<Schema$Topic>;
        create(params: Params$Resource$Topics$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Topics$Create, options: MethodOptions | BodyResponseCallback<Schema$Topic>, callback: BodyResponseCallback<Schema$Topic>): void;
        create(params: Params$Resource$Topics$Create, callback: BodyResponseCallback<Schema$Topic>): void;
        create(callback: BodyResponseCallback<Schema$Topic>): void;
        /**
         * pubsub.topics.delete
         * @desc Deletes the topic with the given name. Returns NOT_FOUND if the topic does not exist. After a topic is deleted, a new topic may be created with the same name.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/pubsub.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const pubsub = google.pubsub('v1beta1a');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/pubsub',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await pubsub.topics.delete({
         *     // Name of the topic to delete.
         *     topic: '.*',
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
         * @alias pubsub.topics.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.topic Name of the topic to delete.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Topics$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Topics$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Topics$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Topics$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Topics$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * pubsub.topics.get
         * @desc Gets the configuration of a topic. Since the topic only has the name attribute, this method is only useful to check the existence of a topic. If other attributes are added in the future, they will be returned here.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/pubsub.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const pubsub = google.pubsub('v1beta1a');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/pubsub',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await pubsub.topics.get({
         *     // The name of the topic to get.
         *     topic: '.*',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "name": "my_name"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias pubsub.topics.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.topic The name of the topic to get.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Topics$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Topics$Get, options?: MethodOptions): GaxiosPromise<Schema$Topic>;
        get(params: Params$Resource$Topics$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Topics$Get, options: MethodOptions | BodyResponseCallback<Schema$Topic>, callback: BodyResponseCallback<Schema$Topic>): void;
        get(params: Params$Resource$Topics$Get, callback: BodyResponseCallback<Schema$Topic>): void;
        get(callback: BodyResponseCallback<Schema$Topic>): void;
        /**
         * pubsub.topics.list
         * @desc Lists matching topics.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/pubsub.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const pubsub = google.pubsub('v1beta1a');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/pubsub',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await pubsub.topics.list({
         *     // Maximum number of topics to return.
         *     maxResults: 'placeholder-value',
         *     // The value obtained in the last <code>ListTopicsResponse</code>
         *     // for continuation.
         *     pageToken: 'placeholder-value',
         *     // A valid label query expression.
         *     query: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "topic": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias pubsub.topics.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.maxResults Maximum number of topics to return.
         * @param {string=} params.pageToken The value obtained in the last <code>ListTopicsResponse</code> for continuation.
         * @param {string=} params.query A valid label query expression.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Topics$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Topics$List, options?: MethodOptions): GaxiosPromise<Schema$ListTopicsResponse>;
        list(params: Params$Resource$Topics$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Topics$List, options: MethodOptions | BodyResponseCallback<Schema$ListTopicsResponse>, callback: BodyResponseCallback<Schema$ListTopicsResponse>): void;
        list(params: Params$Resource$Topics$List, callback: BodyResponseCallback<Schema$ListTopicsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListTopicsResponse>): void;
        /**
         * pubsub.topics.publish
         * @desc Adds a message to the topic.  Returns NOT_FOUND if the topic does not exist.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/pubsub.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const pubsub = google.pubsub('v1beta1a');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/pubsub',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await pubsub.topics.publish({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "message": {},
         *       //   "topic": "my_topic"
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
         * @alias pubsub.topics.publish
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().PublishRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        publish(params: Params$Resource$Topics$Publish, options: StreamMethodOptions): GaxiosPromise<Readable>;
        publish(params?: Params$Resource$Topics$Publish, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        publish(params: Params$Resource$Topics$Publish, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        publish(params: Params$Resource$Topics$Publish, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        publish(params: Params$Resource$Topics$Publish, callback: BodyResponseCallback<Schema$Empty>): void;
        publish(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * pubsub.topics.publishBatch
         * @desc Adds one or more messages to the topic. Returns NOT_FOUND if the topic does not exist.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/pubsub.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const pubsub = google.pubsub('v1beta1a');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/pubsub',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await pubsub.topics.publishBatch({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "messages": [],
         *       //   "topic": "my_topic"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "messageIds": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias pubsub.topics.publishBatch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().PublishBatchRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        publishBatch(params: Params$Resource$Topics$Publishbatch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        publishBatch(params?: Params$Resource$Topics$Publishbatch, options?: MethodOptions): GaxiosPromise<Schema$PublishBatchResponse>;
        publishBatch(params: Params$Resource$Topics$Publishbatch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        publishBatch(params: Params$Resource$Topics$Publishbatch, options: MethodOptions | BodyResponseCallback<Schema$PublishBatchResponse>, callback: BodyResponseCallback<Schema$PublishBatchResponse>): void;
        publishBatch(params: Params$Resource$Topics$Publishbatch, callback: BodyResponseCallback<Schema$PublishBatchResponse>): void;
        publishBatch(callback: BodyResponseCallback<Schema$PublishBatchResponse>): void;
    }
    export interface Params$Resource$Topics$Create extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$Topic;
    }
    export interface Params$Resource$Topics$Delete extends StandardParameters {
        /**
         * Name of the topic to delete.
         */
        topic?: string;
    }
    export interface Params$Resource$Topics$Get extends StandardParameters {
        /**
         * The name of the topic to get.
         */
        topic?: string;
    }
    export interface Params$Resource$Topics$List extends StandardParameters {
        /**
         * Maximum number of topics to return.
         */
        maxResults?: number;
        /**
         * The value obtained in the last <code>ListTopicsResponse</code> for continuation.
         */
        pageToken?: string;
        /**
         * A valid label query expression.
         */
        query?: string;
    }
    export interface Params$Resource$Topics$Publish extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$PublishRequest;
    }
    export interface Params$Resource$Topics$Publishbatch extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$PublishBatchRequest;
    }
    export {};
}
