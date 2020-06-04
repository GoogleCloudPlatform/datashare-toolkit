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

export namespace pagespeedonline_v4 {
  export interface Options extends GlobalOptions {
    version: 'v4';
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
   * PageSpeed Insights API
   *
   * Analyzes the performance of a web page and provides tailored suggestions to make that page faster.
   *
   * @example
   * const {google} = require('googleapis');
   * const pagespeedonline = google.pagespeedonline('v4');
   *
   * @namespace pagespeedonline
   * @type {Function}
   * @version v4
   * @variation v4
   * @param {object=} options Options for Pagespeedonline
   */
  export class Pagespeedonline {
    context: APIRequestContext;
    pagespeedapi: Resource$Pagespeedapi;

    constructor(options: GlobalOptions, google?: GoogleConfigurable) {
      this.context = {
        _options: options || {},
        google,
      };

      this.pagespeedapi = new Resource$Pagespeedapi(this.context);
    }
  }

  export interface Schema$PagespeedApiFormatStringV4 {
    /**
     * List of arguments for the format string.
     */
    args?: Array<{
      key?: string;
      rects?: Array<{
        height?: number;
        left?: number;
        top?: number;
        width?: number;
      }>;
      secondary_rects?: Array<{
        height?: number;
        left?: number;
        top?: number;
        width?: number;
      }>;
      type?: string;
      value?: string;
    }> | null;
    /**
     * A localized format string with {{FOO}} placeholders, where &#39;FOO&#39; is the key of the argument whose value should be substituted. For HYPERLINK arguments, the format string will instead contain {{BEGIN_FOO}} and {{END_FOO}} for the argument with key &#39;FOO&#39;.
     */
    format?: string | null;
  }
  export interface Schema$PagespeedApiImageV4 {
    /**
     * Image data base64 encoded.
     */
    data?: string | null;
    /**
     * Height of screenshot in pixels.
     */
    height?: number | null;
    /**
     * Unique string key, if any, identifying this image.
     */
    key?: string | null;
    /**
     * Mime type of image data (e.g. &quot;image/jpeg&quot;).
     */
    mime_type?: string | null;
    page_rect?: {
      height?: number;
      left?: number;
      top?: number;
      width?: number;
    } | null;
    /**
     * Width of screenshot in pixels.
     */
    width?: number | null;
  }
  export interface Schema$PagespeedApiPagespeedResponseV4 {
    /**
     * The captcha verify result
     */
    captchaResult?: string | null;
    /**
     * Localized PageSpeed results. Contains a ruleResults entry for each PageSpeed rule instantiated and run by the server.
     */
    formattedResults?: {
      locale?: string;
      ruleResults?: {
        [key: string]: {
          beta?: boolean;
          groups?: string[];
          localizedRuleName?: string;
          ruleImpact?: number;
          summary?: Schema$PagespeedApiFormatStringV4;
          urlBlocks?: Array<{
            header?: Schema$PagespeedApiFormatStringV4;
            urls?: Array<{
              details?: Schema$PagespeedApiFormatStringV4[];
              result?: Schema$PagespeedApiFormatStringV4;
            }>;
          }>;
        };
      };
    } | null;
    /**
     * Canonicalized and final URL for the document, after following page redirects (if any).
     */
    id?: string | null;
    /**
     * List of rules that were specified in the request, but which the server did not know how to instantiate.
     */
    invalidRules?: string[] | null;
    /**
     * Kind of result.
     */
    kind?: string | null;
    /**
     * Metrics of end users&#39; page loading experience.
     */
    loadingExperience?: {
      id?: string;
      initial_url?: string;
      metrics?: {
        [key: string]: {
          category?: string;
          distributions?: Array<{
            max?: number;
            min?: number;
            proportion?: number;
          }>;
          median?: number;
        };
      };
      overall_category?: string;
    } | null;
    /**
     * Summary statistics for the page, such as number of JavaScript bytes, number of HTML bytes, etc.
     */
    pageStats?: {
      cms?: string;
      cssResponseBytes?: string;
      flashResponseBytes?: string;
      htmlResponseBytes?: string;
      imageResponseBytes?: string;
      javascriptResponseBytes?: string;
      numRenderBlockingRoundTrips?: number;
      numTotalRoundTrips?: number;
      numberCssResources?: number;
      numberHosts?: number;
      numberJsResources?: number;
      numberResources?: number;
      numberRobotedResources?: number;
      numberStaticResources?: number;
      numberTransientFetchFailureResources?: number;
      otherResponseBytes?: string;
      overTheWireResponseBytes?: string;
      robotedUrls?: string[];
      textResponseBytes?: string;
      totalRequestBytes?: string;
      transientFetchFailureUrls?: string[];
    } | null;
    /**
     * Response code for the document. 200 indicates a normal page load. 4xx/5xx indicates an error.
     */
    responseCode?: number | null;
    /**
     * A map with one entry for each rule group in these results.
     */
    ruleGroups?: {[key: string]: {pass?: boolean; score?: number}} | null;
    /**
     * Base64-encoded screenshot of the page that was analyzed.
     */
    screenshot?: Schema$PagespeedApiImageV4;
    /**
     * Additional base64-encoded screenshots of the page, in various partial render states.
     */
    snapshots?: Schema$PagespeedApiImageV4[];
    /**
     * Title of the page, as displayed in the browser&#39;s title bar.
     */
    title?: string | null;
    /**
     * The version of PageSpeed used to generate these results.
     */
    version?: {major?: number; minor?: number} | null;
  }

  export class Resource$Pagespeedapi {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * pagespeedonline.pagespeedapi.runpagespeed
     * @desc Runs PageSpeed analysis on the page at the specified URL, and returns PageSpeed scores, a list of suggestions to make that page faster, and other information.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/pagespeedonline.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const pagespeedonline = google.pagespeedonline('v4');
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
     *   const res = await pagespeedonline.pagespeedapi.runpagespeed({
     *     // Indicates if third party resources should be filtered out before PageSpeed analysis.
     *     filter_third_party_resources: 'placeholder-value',
     *     // The locale used to localize formatted results
     *     locale: '[a-zA-Z]+(_[a-zA-Z]+)?',
     *     // A PageSpeed rule to run; if none are given, all rules are run
     *     rule: '[a-zA-Z]+',
     *     // Indicates if binary data containing a screenshot should be included
     *     screenshot: 'placeholder-value',
     *     // Indicates if binary data containing snapshot images should be included
     *     snapshots: 'placeholder-value',
     *     // The analysis strategy (desktop or mobile) to use, and desktop is the default
     *     strategy: 'placeholder-value',
     *     // The URL to fetch and analyze
     *     url: '(?i)(site:|origin:)?http(s)?://.*',
     *     // Campaign name for analytics.
     *     utm_campaign: 'placeholder-value',
     *     // Campaign source for analytics.
     *     utm_source: 'placeholder-value',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "captchaResult": "my_captchaResult",
     *   //   "formattedResults": {},
     *   //   "id": "my_id",
     *   //   "invalidRules": [],
     *   //   "kind": "my_kind",
     *   //   "loadingExperience": {},
     *   //   "pageStats": {},
     *   //   "responseCode": 0,
     *   //   "ruleGroups": {},
     *   //   "screenshot": {},
     *   //   "snapshots": [],
     *   //   "title": "my_title",
     *   //   "version": {}
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias pagespeedonline.pagespeedapi.runpagespeed
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {boolean=} params.filter_third_party_resources Indicates if third party resources should be filtered out before PageSpeed analysis.
     * @param {string=} params.locale The locale used to localize formatted results
     * @param {string=} params.rule A PageSpeed rule to run; if none are given, all rules are run
     * @param {boolean=} params.screenshot Indicates if binary data containing a screenshot should be included
     * @param {boolean=} params.snapshots Indicates if binary data containing snapshot images should be included
     * @param {string=} params.strategy The analysis strategy (desktop or mobile) to use, and desktop is the default
     * @param {string} params.url The URL to fetch and analyze
     * @param {string=} params.utm_campaign Campaign name for analytics.
     * @param {string=} params.utm_source Campaign source for analytics.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    runpagespeed(
      params?: Params$Resource$Pagespeedapi$Runpagespeed,
      options?: MethodOptions
    ): GaxiosPromise<Schema$PagespeedApiPagespeedResponseV4>;
    runpagespeed(
      params: Params$Resource$Pagespeedapi$Runpagespeed,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$PagespeedApiPagespeedResponseV4>,
      callback: BodyResponseCallback<Schema$PagespeedApiPagespeedResponseV4>
    ): void;
    runpagespeed(
      params: Params$Resource$Pagespeedapi$Runpagespeed,
      callback: BodyResponseCallback<Schema$PagespeedApiPagespeedResponseV4>
    ): void;
    runpagespeed(
      callback: BodyResponseCallback<Schema$PagespeedApiPagespeedResponseV4>
    ): void;
    runpagespeed(
      paramsOrCallback?:
        | Params$Resource$Pagespeedapi$Runpagespeed
        | BodyResponseCallback<Schema$PagespeedApiPagespeedResponseV4>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$PagespeedApiPagespeedResponseV4>,
      callback?: BodyResponseCallback<Schema$PagespeedApiPagespeedResponseV4>
    ): void | GaxiosPromise<Schema$PagespeedApiPagespeedResponseV4> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Pagespeedapi$Runpagespeed;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Pagespeedapi$Runpagespeed;
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
            url: (rootUrl + '/pagespeedonline/v4/runPagespeed').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['url'],
        pathParams: [],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$PagespeedApiPagespeedResponseV4>(
          parameters,
          callback
        );
      } else {
        return createAPIRequest<Schema$PagespeedApiPagespeedResponseV4>(
          parameters
        );
      }
    }
  }

  export interface Params$Resource$Pagespeedapi$Runpagespeed
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Indicates if third party resources should be filtered out before PageSpeed analysis.
     */
    filter_third_party_resources?: boolean;
    /**
     * The locale used to localize formatted results
     */
    locale?: string;
    /**
     * A PageSpeed rule to run; if none are given, all rules are run
     */
    rule?: string[];
    /**
     * Indicates if binary data containing a screenshot should be included
     */
    screenshot?: boolean;
    /**
     * Indicates if binary data containing snapshot images should be included
     */
    snapshots?: boolean;
    /**
     * The analysis strategy (desktop or mobile) to use, and desktop is the default
     */
    strategy?: string;
    /**
     * The URL to fetch and analyze
     */
    url?: string;
    /**
     * Campaign name for analytics.
     */
    utm_campaign?: string;
    /**
     * Campaign source for analytics.
     */
    utm_source?: string;
  }
}
