/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace tasks_v1 {
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
     * Tasks API
     *
     * The Google Tasks API lets you manage your tasks and task lists.
     *
     * @example
     * const {google} = require('googleapis');
     * const tasks = google.tasks('v1');
     *
     * @namespace tasks
     * @type {Function}
     * @version v1
     * @variation v1
     * @param {object=} options Options for Tasks
     */
    export class Tasks {
        context: APIRequestContext;
        tasklists: Resource$Tasklists;
        tasks: Resource$Tasks;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    export interface Schema$Task {
        /**
         * Completion date of the task (as a RFC 3339 timestamp). This field is omitted if the task has not been completed.
         */
        completed?: string | null;
        /**
         * Flag indicating whether the task has been deleted. The default is False.
         */
        deleted?: boolean | null;
        /**
         * Due date of the task (as a RFC 3339 timestamp). Optional. The due date only records date information; the time portion of the timestamp is discarded when setting the due date. It isn&#39;t possible to read or write the time that a task is due via the API.
         */
        due?: string | null;
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * Flag indicating whether the task is hidden. This is the case if the task had been marked completed when the task list was last cleared. The default is False. This field is read-only.
         */
        hidden?: boolean | null;
        /**
         * Task identifier.
         */
        id?: string | null;
        /**
         * Type of the resource. This is always &quot;tasks#task&quot;.
         */
        kind?: string | null;
        /**
         * Collection of links. This collection is read-only.
         */
        links?: Array<{
            description?: string;
            link?: string;
            type?: string;
        }> | null;
        /**
         * Notes describing the task. Optional.
         */
        notes?: string | null;
        /**
         * Parent task identifier. This field is omitted if it is a top-level task. This field is read-only. Use the &quot;move&quot; method to move the task under a different parent or to the top level.
         */
        parent?: string | null;
        /**
         * String indicating the position of the task among its sibling tasks under the same parent task or at the top level. If this string is greater than another task&#39;s corresponding position string according to lexicographical ordering, the task is positioned after the other task under the same parent task (or at the top level). This field is read-only. Use the &quot;move&quot; method to move the task to another position.
         */
        position?: string | null;
        /**
         * URL pointing to this task. Used to retrieve, update, or delete this task.
         */
        selfLink?: string | null;
        /**
         * Status of the task. This is either &quot;needsAction&quot; or &quot;completed&quot;.
         */
        status?: string | null;
        /**
         * Title of the task.
         */
        title?: string | null;
        /**
         * Last modification time of the task (as a RFC 3339 timestamp).
         */
        updated?: string | null;
    }
    export interface Schema$TaskList {
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * Task list identifier.
         */
        id?: string | null;
        /**
         * Type of the resource. This is always &quot;tasks#taskList&quot;.
         */
        kind?: string | null;
        /**
         * URL pointing to this task list. Used to retrieve, update, or delete this task list.
         */
        selfLink?: string | null;
        /**
         * Title of the task list.
         */
        title?: string | null;
        /**
         * Last modification time of the task list (as a RFC 3339 timestamp).
         */
        updated?: string | null;
    }
    export interface Schema$TaskLists {
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * Collection of task lists.
         */
        items?: Schema$TaskList[];
        /**
         * Type of the resource. This is always &quot;tasks#taskLists&quot;.
         */
        kind?: string | null;
        /**
         * Token that can be used to request the next page of this result.
         */
        nextPageToken?: string | null;
    }
    export interface Schema$Tasks {
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * Collection of tasks.
         */
        items?: Schema$Task[];
        /**
         * Type of the resource. This is always &quot;tasks#tasks&quot;.
         */
        kind?: string | null;
        /**
         * Token used to access the next page of this result.
         */
        nextPageToken?: string | null;
    }
    export class Resource$Tasklists {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * tasks.tasklists.delete
         * @desc Deletes the authenticated user's specified task list.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/tasks.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const tasks = google.tasks('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/tasks'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await tasks.tasklists.delete({
         *     // Task list identifier.
         *     tasklist: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias tasks.tasklists.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.tasklist Task list identifier.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Tasklists$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Tasklists$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Tasklists$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Tasklists$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Tasklists$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * tasks.tasklists.get
         * @desc Returns the authenticated user's specified task list.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/tasks.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const tasks = google.tasks('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/tasks',
         *       'https://www.googleapis.com/auth/tasks.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await tasks.tasklists.get({
         *     // Task list identifier.
         *     tasklist: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etag": "my_etag",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "selfLink": "my_selfLink",
         *   //   "title": "my_title",
         *   //   "updated": "my_updated"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias tasks.tasklists.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.tasklist Task list identifier.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Tasklists$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Tasklists$Get, options?: MethodOptions): GaxiosPromise<Schema$TaskList>;
        get(params: Params$Resource$Tasklists$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Tasklists$Get, options: MethodOptions | BodyResponseCallback<Schema$TaskList>, callback: BodyResponseCallback<Schema$TaskList>): void;
        get(params: Params$Resource$Tasklists$Get, callback: BodyResponseCallback<Schema$TaskList>): void;
        get(callback: BodyResponseCallback<Schema$TaskList>): void;
        /**
         * tasks.tasklists.insert
         * @desc Creates a new task list and adds it to the authenticated user's task lists.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/tasks.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const tasks = google.tasks('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/tasks'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await tasks.tasklists.insert({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "etag": "my_etag",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "selfLink": "my_selfLink",
         *       //   "title": "my_title",
         *       //   "updated": "my_updated"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etag": "my_etag",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "selfLink": "my_selfLink",
         *   //   "title": "my_title",
         *   //   "updated": "my_updated"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias tasks.tasklists.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().TaskList} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Tasklists$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Tasklists$Insert, options?: MethodOptions): GaxiosPromise<Schema$TaskList>;
        insert(params: Params$Resource$Tasklists$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Tasklists$Insert, options: MethodOptions | BodyResponseCallback<Schema$TaskList>, callback: BodyResponseCallback<Schema$TaskList>): void;
        insert(params: Params$Resource$Tasklists$Insert, callback: BodyResponseCallback<Schema$TaskList>): void;
        insert(callback: BodyResponseCallback<Schema$TaskList>): void;
        /**
         * tasks.tasklists.list
         * @desc Returns all the authenticated user's task lists.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/tasks.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const tasks = google.tasks('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/tasks',
         *       'https://www.googleapis.com/auth/tasks.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await tasks.tasklists.list({
         *     // Maximum number of task lists returned on one page. Optional. The default is
         *     // 20 (max allowed: 100).
         *     maxResults: 'placeholder-value',
         *     // Token specifying the result page to return. Optional.
         *     pageToken: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etag": "my_etag",
         *   //   "items": [],
         *   //   "kind": "my_kind",
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias tasks.tasklists.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.maxResults Maximum number of task lists returned on one page. Optional. The default is 20 (max allowed: 100).
         * @param {string=} params.pageToken Token specifying the result page to return. Optional.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Tasklists$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Tasklists$List, options?: MethodOptions): GaxiosPromise<Schema$TaskLists>;
        list(params: Params$Resource$Tasklists$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Tasklists$List, options: MethodOptions | BodyResponseCallback<Schema$TaskLists>, callback: BodyResponseCallback<Schema$TaskLists>): void;
        list(params: Params$Resource$Tasklists$List, callback: BodyResponseCallback<Schema$TaskLists>): void;
        list(callback: BodyResponseCallback<Schema$TaskLists>): void;
        /**
         * tasks.tasklists.patch
         * @desc Updates the authenticated user's specified task list. This method supports patch semantics.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/tasks.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const tasks = google.tasks('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/tasks'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await tasks.tasklists.patch({
         *     // Task list identifier.
         *     tasklist: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "etag": "my_etag",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "selfLink": "my_selfLink",
         *       //   "title": "my_title",
         *       //   "updated": "my_updated"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etag": "my_etag",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "selfLink": "my_selfLink",
         *   //   "title": "my_title",
         *   //   "updated": "my_updated"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias tasks.tasklists.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.tasklist Task list identifier.
         * @param {().TaskList} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Tasklists$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Tasklists$Patch, options?: MethodOptions): GaxiosPromise<Schema$TaskList>;
        patch(params: Params$Resource$Tasklists$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Tasklists$Patch, options: MethodOptions | BodyResponseCallback<Schema$TaskList>, callback: BodyResponseCallback<Schema$TaskList>): void;
        patch(params: Params$Resource$Tasklists$Patch, callback: BodyResponseCallback<Schema$TaskList>): void;
        patch(callback: BodyResponseCallback<Schema$TaskList>): void;
        /**
         * tasks.tasklists.update
         * @desc Updates the authenticated user's specified task list.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/tasks.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const tasks = google.tasks('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/tasks'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await tasks.tasklists.update({
         *     // Task list identifier.
         *     tasklist: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "etag": "my_etag",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "selfLink": "my_selfLink",
         *       //   "title": "my_title",
         *       //   "updated": "my_updated"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etag": "my_etag",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "selfLink": "my_selfLink",
         *   //   "title": "my_title",
         *   //   "updated": "my_updated"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias tasks.tasklists.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.tasklist Task list identifier.
         * @param {().TaskList} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Tasklists$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Tasklists$Update, options?: MethodOptions): GaxiosPromise<Schema$TaskList>;
        update(params: Params$Resource$Tasklists$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Tasklists$Update, options: MethodOptions | BodyResponseCallback<Schema$TaskList>, callback: BodyResponseCallback<Schema$TaskList>): void;
        update(params: Params$Resource$Tasklists$Update, callback: BodyResponseCallback<Schema$TaskList>): void;
        update(callback: BodyResponseCallback<Schema$TaskList>): void;
    }
    export interface Params$Resource$Tasklists$Delete extends StandardParameters {
        /**
         * Task list identifier.
         */
        tasklist?: string;
    }
    export interface Params$Resource$Tasklists$Get extends StandardParameters {
        /**
         * Task list identifier.
         */
        tasklist?: string;
    }
    export interface Params$Resource$Tasklists$Insert extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$TaskList;
    }
    export interface Params$Resource$Tasklists$List extends StandardParameters {
        /**
         * Maximum number of task lists returned on one page. Optional. The default is 20 (max allowed: 100).
         */
        maxResults?: number;
        /**
         * Token specifying the result page to return. Optional.
         */
        pageToken?: string;
    }
    export interface Params$Resource$Tasklists$Patch extends StandardParameters {
        /**
         * Task list identifier.
         */
        tasklist?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$TaskList;
    }
    export interface Params$Resource$Tasklists$Update extends StandardParameters {
        /**
         * Task list identifier.
         */
        tasklist?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$TaskList;
    }
    export class Resource$Tasks {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * tasks.tasks.clear
         * @desc Clears all completed tasks from the specified task list. The affected tasks will be marked as 'hidden' and no longer be returned by default when retrieving all tasks for a task list.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/tasks.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const tasks = google.tasks('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/tasks'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await tasks.tasks.clear({
         *     // Task list identifier.
         *     tasklist: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias tasks.tasks.clear
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.tasklist Task list identifier.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        clear(params: Params$Resource$Tasks$Clear, options: StreamMethodOptions): GaxiosPromise<Readable>;
        clear(params?: Params$Resource$Tasks$Clear, options?: MethodOptions): GaxiosPromise<void>;
        clear(params: Params$Resource$Tasks$Clear, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        clear(params: Params$Resource$Tasks$Clear, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        clear(params: Params$Resource$Tasks$Clear, callback: BodyResponseCallback<void>): void;
        clear(callback: BodyResponseCallback<void>): void;
        /**
         * tasks.tasks.delete
         * @desc Deletes the specified task from the task list.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/tasks.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const tasks = google.tasks('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/tasks'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await tasks.tasks.delete({
         *     // Task identifier.
         *     task: 'placeholder-value',
         *     // Task list identifier.
         *     tasklist: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias tasks.tasks.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.task Task identifier.
         * @param {string} params.tasklist Task list identifier.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Tasks$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Tasks$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Tasks$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Tasks$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Tasks$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * tasks.tasks.get
         * @desc Returns the specified task.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/tasks.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const tasks = google.tasks('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/tasks',
         *       'https://www.googleapis.com/auth/tasks.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await tasks.tasks.get({
         *     // Task identifier.
         *     task: 'placeholder-value',
         *     // Task list identifier.
         *     tasklist: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "completed": "my_completed",
         *   //   "deleted": false,
         *   //   "due": "my_due",
         *   //   "etag": "my_etag",
         *   //   "hidden": false,
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "links": [],
         *   //   "notes": "my_notes",
         *   //   "parent": "my_parent",
         *   //   "position": "my_position",
         *   //   "selfLink": "my_selfLink",
         *   //   "status": "my_status",
         *   //   "title": "my_title",
         *   //   "updated": "my_updated"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias tasks.tasks.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.task Task identifier.
         * @param {string} params.tasklist Task list identifier.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Tasks$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Tasks$Get, options?: MethodOptions): GaxiosPromise<Schema$Task>;
        get(params: Params$Resource$Tasks$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Tasks$Get, options: MethodOptions | BodyResponseCallback<Schema$Task>, callback: BodyResponseCallback<Schema$Task>): void;
        get(params: Params$Resource$Tasks$Get, callback: BodyResponseCallback<Schema$Task>): void;
        get(callback: BodyResponseCallback<Schema$Task>): void;
        /**
         * tasks.tasks.insert
         * @desc Creates a new task on the specified task list.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/tasks.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const tasks = google.tasks('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/tasks'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await tasks.tasks.insert({
         *     // Parent task identifier. If the task is created at the top level, this
         *     // parameter is omitted. Optional.
         *     parent: 'placeholder-value',
         *     // Previous sibling task identifier. If the task is created at the first
         *     // position among its siblings, this parameter is omitted. Optional.
         *     previous: 'placeholder-value',
         *     // Task list identifier.
         *     tasklist: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "completed": "my_completed",
         *       //   "deleted": false,
         *       //   "due": "my_due",
         *       //   "etag": "my_etag",
         *       //   "hidden": false,
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "links": [],
         *       //   "notes": "my_notes",
         *       //   "parent": "my_parent",
         *       //   "position": "my_position",
         *       //   "selfLink": "my_selfLink",
         *       //   "status": "my_status",
         *       //   "title": "my_title",
         *       //   "updated": "my_updated"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "completed": "my_completed",
         *   //   "deleted": false,
         *   //   "due": "my_due",
         *   //   "etag": "my_etag",
         *   //   "hidden": false,
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "links": [],
         *   //   "notes": "my_notes",
         *   //   "parent": "my_parent",
         *   //   "position": "my_position",
         *   //   "selfLink": "my_selfLink",
         *   //   "status": "my_status",
         *   //   "title": "my_title",
         *   //   "updated": "my_updated"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias tasks.tasks.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.parent Parent task identifier. If the task is created at the top level, this parameter is omitted. Optional.
         * @param {string=} params.previous Previous sibling task identifier. If the task is created at the first position among its siblings, this parameter is omitted. Optional.
         * @param {string} params.tasklist Task list identifier.
         * @param {().Task} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Tasks$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Tasks$Insert, options?: MethodOptions): GaxiosPromise<Schema$Task>;
        insert(params: Params$Resource$Tasks$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Tasks$Insert, options: MethodOptions | BodyResponseCallback<Schema$Task>, callback: BodyResponseCallback<Schema$Task>): void;
        insert(params: Params$Resource$Tasks$Insert, callback: BodyResponseCallback<Schema$Task>): void;
        insert(callback: BodyResponseCallback<Schema$Task>): void;
        /**
         * tasks.tasks.list
         * @desc Returns all tasks in the specified task list.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/tasks.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const tasks = google.tasks('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/tasks',
         *       'https://www.googleapis.com/auth/tasks.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await tasks.tasks.list({
         *     // Upper bound for a task's completion date (as a RFC 3339 timestamp) to
         *     // filter by. Optional. The default is not to filter by completion date.
         *     completedMax: 'placeholder-value',
         *     // Lower bound for a task's completion date (as a RFC 3339 timestamp) to
         *     // filter by. Optional. The default is not to filter by completion date.
         *     completedMin: 'placeholder-value',
         *     // Upper bound for a task's due date (as a RFC 3339 timestamp) to filter by.
         *     // Optional. The default is not to filter by due date.
         *     dueMax: 'placeholder-value',
         *     // Lower bound for a task's due date (as a RFC 3339 timestamp) to filter by.
         *     // Optional. The default is not to filter by due date.
         *     dueMin: 'placeholder-value',
         *     // Maximum number of task lists returned on one page. Optional. The default is
         *     // 20 (max allowed: 100).
         *     maxResults: 'placeholder-value',
         *     // Token specifying the result page to return. Optional.
         *     pageToken: 'placeholder-value',
         *     // Flag indicating whether completed tasks are returned in the result.
         *     // Optional. The default is True.
         *     showCompleted: 'placeholder-value',
         *     // Flag indicating whether deleted tasks are returned in the result. Optional.
         *     // The default is False.
         *     showDeleted: 'placeholder-value',
         *     // Flag indicating whether hidden tasks are returned in the result. Optional.
         *     // The default is False.
         *     showHidden: 'placeholder-value',
         *     // Task list identifier.
         *     tasklist: 'placeholder-value',
         *     // Lower bound for a task's last modification time (as a RFC 3339 timestamp)
         *     // to filter by. Optional. The default is not to filter by last modification
         *     // time.
         *     updatedMin: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etag": "my_etag",
         *   //   "items": [],
         *   //   "kind": "my_kind",
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias tasks.tasks.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.completedMax Upper bound for a task's completion date (as a RFC 3339 timestamp) to filter by. Optional. The default is not to filter by completion date.
         * @param {string=} params.completedMin Lower bound for a task's completion date (as a RFC 3339 timestamp) to filter by. Optional. The default is not to filter by completion date.
         * @param {string=} params.dueMax Upper bound for a task's due date (as a RFC 3339 timestamp) to filter by. Optional. The default is not to filter by due date.
         * @param {string=} params.dueMin Lower bound for a task's due date (as a RFC 3339 timestamp) to filter by. Optional. The default is not to filter by due date.
         * @param {integer=} params.maxResults Maximum number of task lists returned on one page. Optional. The default is 20 (max allowed: 100).
         * @param {string=} params.pageToken Token specifying the result page to return. Optional.
         * @param {boolean=} params.showCompleted Flag indicating whether completed tasks are returned in the result. Optional. The default is True.
         * @param {boolean=} params.showDeleted Flag indicating whether deleted tasks are returned in the result. Optional. The default is False.
         * @param {boolean=} params.showHidden Flag indicating whether hidden tasks are returned in the result. Optional. The default is False.
         * @param {string} params.tasklist Task list identifier.
         * @param {string=} params.updatedMin Lower bound for a task's last modification time (as a RFC 3339 timestamp) to filter by. Optional. The default is not to filter by last modification time.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Tasks$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Tasks$List, options?: MethodOptions): GaxiosPromise<Schema$Tasks>;
        list(params: Params$Resource$Tasks$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Tasks$List, options: MethodOptions | BodyResponseCallback<Schema$Tasks>, callback: BodyResponseCallback<Schema$Tasks>): void;
        list(params: Params$Resource$Tasks$List, callback: BodyResponseCallback<Schema$Tasks>): void;
        list(callback: BodyResponseCallback<Schema$Tasks>): void;
        /**
         * tasks.tasks.move
         * @desc Moves the specified task to another position in the task list. This can include putting it as a child task under a new parent and/or move it to a different position among its sibling tasks.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/tasks.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const tasks = google.tasks('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/tasks'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await tasks.tasks.move({
         *     // New parent task identifier. If the task is moved to the top level, this
         *     // parameter is omitted. Optional.
         *     parent: 'placeholder-value',
         *     // New previous sibling task identifier. If the task is moved to the first
         *     // position among its siblings, this parameter is omitted. Optional.
         *     previous: 'placeholder-value',
         *     // Task identifier.
         *     task: 'placeholder-value',
         *     // Task list identifier.
         *     tasklist: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "completed": "my_completed",
         *   //   "deleted": false,
         *   //   "due": "my_due",
         *   //   "etag": "my_etag",
         *   //   "hidden": false,
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "links": [],
         *   //   "notes": "my_notes",
         *   //   "parent": "my_parent",
         *   //   "position": "my_position",
         *   //   "selfLink": "my_selfLink",
         *   //   "status": "my_status",
         *   //   "title": "my_title",
         *   //   "updated": "my_updated"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias tasks.tasks.move
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.parent New parent task identifier. If the task is moved to the top level, this parameter is omitted. Optional.
         * @param {string=} params.previous New previous sibling task identifier. If the task is moved to the first position among its siblings, this parameter is omitted. Optional.
         * @param {string} params.task Task identifier.
         * @param {string} params.tasklist Task list identifier.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        move(params: Params$Resource$Tasks$Move, options: StreamMethodOptions): GaxiosPromise<Readable>;
        move(params?: Params$Resource$Tasks$Move, options?: MethodOptions): GaxiosPromise<Schema$Task>;
        move(params: Params$Resource$Tasks$Move, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        move(params: Params$Resource$Tasks$Move, options: MethodOptions | BodyResponseCallback<Schema$Task>, callback: BodyResponseCallback<Schema$Task>): void;
        move(params: Params$Resource$Tasks$Move, callback: BodyResponseCallback<Schema$Task>): void;
        move(callback: BodyResponseCallback<Schema$Task>): void;
        /**
         * tasks.tasks.patch
         * @desc Updates the specified task. This method supports patch semantics.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/tasks.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const tasks = google.tasks('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/tasks'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await tasks.tasks.patch({
         *     // Task identifier.
         *     task: 'placeholder-value',
         *     // Task list identifier.
         *     tasklist: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "completed": "my_completed",
         *       //   "deleted": false,
         *       //   "due": "my_due",
         *       //   "etag": "my_etag",
         *       //   "hidden": false,
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "links": [],
         *       //   "notes": "my_notes",
         *       //   "parent": "my_parent",
         *       //   "position": "my_position",
         *       //   "selfLink": "my_selfLink",
         *       //   "status": "my_status",
         *       //   "title": "my_title",
         *       //   "updated": "my_updated"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "completed": "my_completed",
         *   //   "deleted": false,
         *   //   "due": "my_due",
         *   //   "etag": "my_etag",
         *   //   "hidden": false,
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "links": [],
         *   //   "notes": "my_notes",
         *   //   "parent": "my_parent",
         *   //   "position": "my_position",
         *   //   "selfLink": "my_selfLink",
         *   //   "status": "my_status",
         *   //   "title": "my_title",
         *   //   "updated": "my_updated"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias tasks.tasks.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.task Task identifier.
         * @param {string} params.tasklist Task list identifier.
         * @param {().Task} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Tasks$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Tasks$Patch, options?: MethodOptions): GaxiosPromise<Schema$Task>;
        patch(params: Params$Resource$Tasks$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Tasks$Patch, options: MethodOptions | BodyResponseCallback<Schema$Task>, callback: BodyResponseCallback<Schema$Task>): void;
        patch(params: Params$Resource$Tasks$Patch, callback: BodyResponseCallback<Schema$Task>): void;
        patch(callback: BodyResponseCallback<Schema$Task>): void;
        /**
         * tasks.tasks.update
         * @desc Updates the specified task.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/tasks.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const tasks = google.tasks('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/tasks'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await tasks.tasks.update({
         *     // Task identifier.
         *     task: 'placeholder-value',
         *     // Task list identifier.
         *     tasklist: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "completed": "my_completed",
         *       //   "deleted": false,
         *       //   "due": "my_due",
         *       //   "etag": "my_etag",
         *       //   "hidden": false,
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "links": [],
         *       //   "notes": "my_notes",
         *       //   "parent": "my_parent",
         *       //   "position": "my_position",
         *       //   "selfLink": "my_selfLink",
         *       //   "status": "my_status",
         *       //   "title": "my_title",
         *       //   "updated": "my_updated"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "completed": "my_completed",
         *   //   "deleted": false,
         *   //   "due": "my_due",
         *   //   "etag": "my_etag",
         *   //   "hidden": false,
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "links": [],
         *   //   "notes": "my_notes",
         *   //   "parent": "my_parent",
         *   //   "position": "my_position",
         *   //   "selfLink": "my_selfLink",
         *   //   "status": "my_status",
         *   //   "title": "my_title",
         *   //   "updated": "my_updated"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias tasks.tasks.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.task Task identifier.
         * @param {string} params.tasklist Task list identifier.
         * @param {().Task} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Tasks$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Tasks$Update, options?: MethodOptions): GaxiosPromise<Schema$Task>;
        update(params: Params$Resource$Tasks$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Tasks$Update, options: MethodOptions | BodyResponseCallback<Schema$Task>, callback: BodyResponseCallback<Schema$Task>): void;
        update(params: Params$Resource$Tasks$Update, callback: BodyResponseCallback<Schema$Task>): void;
        update(callback: BodyResponseCallback<Schema$Task>): void;
    }
    export interface Params$Resource$Tasks$Clear extends StandardParameters {
        /**
         * Task list identifier.
         */
        tasklist?: string;
    }
    export interface Params$Resource$Tasks$Delete extends StandardParameters {
        /**
         * Task identifier.
         */
        task?: string;
        /**
         * Task list identifier.
         */
        tasklist?: string;
    }
    export interface Params$Resource$Tasks$Get extends StandardParameters {
        /**
         * Task identifier.
         */
        task?: string;
        /**
         * Task list identifier.
         */
        tasklist?: string;
    }
    export interface Params$Resource$Tasks$Insert extends StandardParameters {
        /**
         * Parent task identifier. If the task is created at the top level, this parameter is omitted. Optional.
         */
        parent?: string;
        /**
         * Previous sibling task identifier. If the task is created at the first position among its siblings, this parameter is omitted. Optional.
         */
        previous?: string;
        /**
         * Task list identifier.
         */
        tasklist?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Task;
    }
    export interface Params$Resource$Tasks$List extends StandardParameters {
        /**
         * Upper bound for a task's completion date (as a RFC 3339 timestamp) to filter by. Optional. The default is not to filter by completion date.
         */
        completedMax?: string;
        /**
         * Lower bound for a task's completion date (as a RFC 3339 timestamp) to filter by. Optional. The default is not to filter by completion date.
         */
        completedMin?: string;
        /**
         * Upper bound for a task's due date (as a RFC 3339 timestamp) to filter by. Optional. The default is not to filter by due date.
         */
        dueMax?: string;
        /**
         * Lower bound for a task's due date (as a RFC 3339 timestamp) to filter by. Optional. The default is not to filter by due date.
         */
        dueMin?: string;
        /**
         * Maximum number of task lists returned on one page. Optional. The default is 20 (max allowed: 100).
         */
        maxResults?: number;
        /**
         * Token specifying the result page to return. Optional.
         */
        pageToken?: string;
        /**
         * Flag indicating whether completed tasks are returned in the result. Optional. The default is True.
         */
        showCompleted?: boolean;
        /**
         * Flag indicating whether deleted tasks are returned in the result. Optional. The default is False.
         */
        showDeleted?: boolean;
        /**
         * Flag indicating whether hidden tasks are returned in the result. Optional. The default is False.
         */
        showHidden?: boolean;
        /**
         * Task list identifier.
         */
        tasklist?: string;
        /**
         * Lower bound for a task's last modification time (as a RFC 3339 timestamp) to filter by. Optional. The default is not to filter by last modification time.
         */
        updatedMin?: string;
    }
    export interface Params$Resource$Tasks$Move extends StandardParameters {
        /**
         * New parent task identifier. If the task is moved to the top level, this parameter is omitted. Optional.
         */
        parent?: string;
        /**
         * New previous sibling task identifier. If the task is moved to the first position among its siblings, this parameter is omitted. Optional.
         */
        previous?: string;
        /**
         * Task identifier.
         */
        task?: string;
        /**
         * Task list identifier.
         */
        tasklist?: string;
    }
    export interface Params$Resource$Tasks$Patch extends StandardParameters {
        /**
         * Task identifier.
         */
        task?: string;
        /**
         * Task list identifier.
         */
        tasklist?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Task;
    }
    export interface Params$Resource$Tasks$Update extends StandardParameters {
        /**
         * Task identifier.
         */
        task?: string;
        /**
         * Task list identifier.
         */
        tasklist?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Task;
    }
    export {};
}
