/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace kgsearch_v1 {
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
     * Knowledge Graph Search API
     *
     * Searches the Google Knowledge Graph for entities.
     *
     * @example
     * const {google} = require('googleapis');
     * const kgsearch = google.kgsearch('v1');
     *
     * @namespace kgsearch
     * @type {Function}
     * @version v1
     * @variation v1
     * @param {object=} options Options for Kgsearch
     */
    export class Kgsearch {
        context: APIRequestContext;
        entities: Resource$Entities;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    /**
     * Response message includes the context and a list of matching results which contain the detail of associated entities.
     */
    export interface Schema$SearchResponse {
        /**
         * The local context applicable for the response. See more details at http://www.w3.org/TR/json-ld/#context-definitions.
         */
        '@context'?: any | null;
        /**
         * The schema type of top-level JSON-LD object, e.g. ItemList.
         */
        '@type'?: any | null;
        /**
         * The item list of search results.
         */
        itemListElement?: any[] | null;
    }
    export class Resource$Entities {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * kgsearch.entities.search
         * @desc Searches Knowledge Graph for entities that match the constraints. A list of matched entities will be returned in response, which will be in JSON-LD format and compatible with http://schema.org
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/kgsearch.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const kgsearch = google.kgsearch('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await kgsearch.entities.search({
         *     // The list of entity id to be used for search instead of query string.
         *     // To specify multiple ids in the HTTP request, repeat the parameter in the
         *     // URL as in ...?ids=A&ids=B
         *     ids: 'placeholder-value',
         *     // Enables indenting of json results.
         *     indent: 'placeholder-value',
         *     // The list of language codes (defined in ISO 693) to run the query with,
         *     // e.g. 'en'.
         *     languages: 'placeholder-value',
         *     // Limits the number of entities to be returned.
         *     limit: 'placeholder-value',
         *     // Enables prefix match against names and aliases of entities
         *     prefix: 'placeholder-value',
         *     // The literal query string for search.
         *     query: 'placeholder-value',
         *     // Restricts returned entities with these types, e.g. Person
         *     // (as defined in http://schema.org/Person). If multiple types are specified,
         *     // returned entities will contain one or more of these types.
         *     types: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "@context": {},
         *   //   "@type": {},
         *   //   "itemListElement": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias kgsearch.entities.search
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.ids The list of entity id to be used for search instead of query string. To specify multiple ids in the HTTP request, repeat the parameter in the URL as in ...?ids=A&ids=B
         * @param {boolean=} params.indent Enables indenting of json results.
         * @param {string=} params.languages The list of language codes (defined in ISO 693) to run the query with, e.g. 'en'.
         * @param {integer=} params.limit Limits the number of entities to be returned.
         * @param {boolean=} params.prefix Enables prefix match against names and aliases of entities
         * @param {string=} params.query The literal query string for search.
         * @param {string=} params.types Restricts returned entities with these types, e.g. Person (as defined in http://schema.org/Person). If multiple types are specified, returned entities will contain one or more of these types.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        search(params: Params$Resource$Entities$Search, options: StreamMethodOptions): GaxiosPromise<Readable>;
        search(params?: Params$Resource$Entities$Search, options?: MethodOptions): GaxiosPromise<Schema$SearchResponse>;
        search(params: Params$Resource$Entities$Search, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        search(params: Params$Resource$Entities$Search, options: MethodOptions | BodyResponseCallback<Schema$SearchResponse>, callback: BodyResponseCallback<Schema$SearchResponse>): void;
        search(params: Params$Resource$Entities$Search, callback: BodyResponseCallback<Schema$SearchResponse>): void;
        search(callback: BodyResponseCallback<Schema$SearchResponse>): void;
    }
    export interface Params$Resource$Entities$Search extends StandardParameters {
        /**
         * The list of entity id to be used for search instead of query string. To specify multiple ids in the HTTP request, repeat the parameter in the URL as in ...?ids=A&ids=B
         */
        ids?: string[];
        /**
         * Enables indenting of json results.
         */
        indent?: boolean;
        /**
         * The list of language codes (defined in ISO 693) to run the query with, e.g. 'en'.
         */
        languages?: string[];
        /**
         * Limits the number of entities to be returned.
         */
        limit?: number;
        /**
         * Enables prefix match against names and aliases of entities
         */
        prefix?: boolean;
        /**
         * The literal query string for search.
         */
        query?: string;
        /**
         * Restricts returned entities with these types, e.g. Person (as defined in http://schema.org/Person). If multiple types are specified, returned entities will contain one or more of these types.
         */
        types?: string[];
    }
    export {};
}
