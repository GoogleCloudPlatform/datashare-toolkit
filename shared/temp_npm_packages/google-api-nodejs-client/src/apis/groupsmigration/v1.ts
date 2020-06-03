// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-irregular-whitespace */

import {
  OAuth2Client,
  JWT,
  Compute,
  UserRefreshClient,
  GaxiosPromise,
  GoogleConfigurable,
  createAPIRequest,
  MethodOptions,
  GlobalOptions,
  BodyResponseCallback,
  APIRequestContext,
} from 'googleapis-common';

export namespace groupsmigration_v1 {
  export interface Options extends GlobalOptions {
    version: 'v1';
  }

  interface StandardParameters {
    /**
     * Data format for the response.
     */
    alt?: string;
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
     * An opaque string that represents a user for quota purposes. Must not exceed 40 characters.
     */
    quotaUser?: string;
    /**
     * Deprecated. Please use quotaUser instead.
     */
    userIp?: string;
  }

  /**
   * Groups Migration API
   *
   * Groups Migration Api.
   *
   * @example
   * const {google} = require('googleapis');
   * const groupsmigration = google.groupsmigration('v1');
   *
   * @namespace groupsmigration
   * @type {Function}
   * @version v1
   * @variation v1
   * @param {object=} options Options for Groupsmigration
   */
  export class Groupsmigration {
    context: APIRequestContext;
    archive: Resource$Archive;

    constructor(options: GlobalOptions, google?: GoogleConfigurable) {
      this.context = {
        _options: options || {},
        google,
      };

      this.archive = new Resource$Archive(this.context);
    }
  }

  /**
   * JSON response template for groups migration API.
   */
  export interface Schema$Groups {
    /**
     * The kind of insert resource this is.
     */
    kind?: string | null;
    /**
     * The status of the insert request.
     */
    responseCode?: string | null;
  }

  export class Resource$Archive {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * groupsmigration.archive.insert
     * @desc Inserts a new mail into the archive of the Google group.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/groupsmigration.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const groupsmigration = google.groupsmigration('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/apps.groups.migration'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await groupsmigration.archive.insert({
     *     // The group ID
     *     groupId: 'placeholder-value',
     *
     *     requestBody: {
     *       // request body parameters
     *     },
     *     media: {
     *       mimeType: 'placeholder-value',
     *       body: 'placeholder-value',
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "kind": "my_kind",
     *   //   "responseCode": "my_responseCode"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias groupsmigration.archive.insert
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.groupId The group ID
     * @param {object} params.media Media object
     * @param {string} params.media.mimeType Media mime-type
     * @param {string|object} params.media.body Media body contents
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    insert(
      params?: Params$Resource$Archive$Insert,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Groups>;
    insert(
      params: Params$Resource$Archive$Insert,
      options: MethodOptions | BodyResponseCallback<Schema$Groups>,
      callback: BodyResponseCallback<Schema$Groups>
    ): void;
    insert(
      params: Params$Resource$Archive$Insert,
      callback: BodyResponseCallback<Schema$Groups>
    ): void;
    insert(callback: BodyResponseCallback<Schema$Groups>): void;
    insert(
      paramsOrCallback?:
        | Params$Resource$Archive$Insert
        | BodyResponseCallback<Schema$Groups>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Groups>,
      callback?: BodyResponseCallback<Schema$Groups>
    ): void | GaxiosPromise<Schema$Groups> {
      let params = (paramsOrCallback || {}) as Params$Resource$Archive$Insert;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Archive$Insert;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://www.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/groups/v1/groups/{groupId}/archive').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'POST',
          },
          options
        ),
        params,
        mediaUrl: (
          rootUrl + '/upload/groups/v1/groups/{groupId}/archive'
        ).replace(/([^:]\/)\/+/g, '$1'),
        requiredParams: ['groupId'],
        pathParams: ['groupId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Groups>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Groups>(parameters);
      }
    }
  }

  export interface Params$Resource$Archive$Insert extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The group ID
     */
    groupId?: string;

    /**
     * Request body metadata
     */
    requestBody?: {};

    /**
     * Media metadata
     */
    media?: {
      /**
       * Media mime-type
       */
      mimeType?: string;

      /**
       * Media body contents
       */
      body?: any;
    };
  }
}
