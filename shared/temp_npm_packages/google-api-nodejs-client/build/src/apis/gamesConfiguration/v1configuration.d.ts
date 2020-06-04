/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace gamesConfiguration_v1configuration {
    export interface Options extends GlobalOptions {
        version: 'v1configuration';
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
     * Google Play Game Services Publishing API
     *
     * The Google Play Game Services Publishing API allows developers to configure their games in Game Services.
     *
     * @example
     * const {google} = require('googleapis');
     * const gamesConfiguration = google.gamesConfiguration('v1configuration');
     *
     * @namespace gamesConfiguration
     * @type {Function}
     * @version v1configuration
     * @variation v1configuration
     * @param {object=} options Options for Gamesconfiguration
     */
    export class Gamesconfiguration {
        context: APIRequestContext;
        achievementConfigurations: Resource$Achievementconfigurations;
        imageConfigurations: Resource$Imageconfigurations;
        leaderboardConfigurations: Resource$Leaderboardconfigurations;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    /**
     * An achievement configuration resource.
     */
    export interface Schema$AchievementConfiguration {
        /**
         * The type of the achievement.
         */
        achievementType?: string | null;
        /**
         * The draft data of the achievement.
         */
        draft?: Schema$AchievementConfigurationDetail;
        /**
         * The ID of the achievement.
         */
        id?: string | null;
        /**
         * The initial state of the achievement.
         */
        initialState?: string | null;
        /**
         * Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#achievementConfiguration`.
         */
        kind?: string | null;
        /**
         * The read-only published data of the achievement.
         */
        published?: Schema$AchievementConfigurationDetail;
        /**
         * Steps to unlock.  Only applicable to incremental achievements.
         */
        stepsToUnlock?: number | null;
        /**
         * The token for this resource.
         */
        token?: string | null;
    }
    /**
     * An achievement configuration detail.
     */
    export interface Schema$AchievementConfigurationDetail {
        /**
         * Localized strings for the achievement description.
         */
        description?: Schema$LocalizedStringBundle;
        /**
         * The icon url of this achievement. Writes to this field are ignored.
         */
        iconUrl?: string | null;
        /**
         * Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#achievementConfigurationDetail`.
         */
        kind?: string | null;
        /**
         * Localized strings for the achievement name.
         */
        name?: Schema$LocalizedStringBundle;
        /**
         * Point value for the achievement.
         */
        pointValue?: number | null;
        /**
         * The sort rank of this achievement. Writes to this field are ignored.
         */
        sortRank?: number | null;
    }
    /**
     * A ListConfigurations response.
     */
    export interface Schema$AchievementConfigurationListResponse {
        /**
         * The achievement configurations.
         */
        items?: Schema$AchievementConfiguration[];
        /**
         * Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#achievementConfigurationListResponse`.
         */
        kind?: string | null;
        /**
         * The pagination token for the next page of results.
         */
        nextPageToken?: string | null;
    }
    /**
     * A number affix resource.
     */
    export interface Schema$GamesNumberAffixConfiguration {
        /**
         * When the language requires special treatment of &quot;small&quot; numbers (as with 2, 3, and 4 in Czech; or numbers ending 2, 3, or 4 but not 12, 13, or 14 in Polish).
         */
        few?: Schema$LocalizedStringBundle;
        /**
         * When the language requires special treatment of &quot;large&quot; numbers (as with numbers ending 11-99 in Maltese).
         */
        many?: Schema$LocalizedStringBundle;
        /**
         * When the language requires special treatment of numbers like one (as with the number 1 in English and most other languages; in Russian, any number ending in 1 but not ending in 11 is in this class).
         */
        one?: Schema$LocalizedStringBundle;
        /**
         * When the language does not require special treatment of the given quantity (as with all numbers in Chinese, or 42 in English).
         */
        other?: Schema$LocalizedStringBundle;
        /**
         * When the language requires special treatment of numbers like two (as with 2 in Welsh, or 102 in Slovenian).
         */
        two?: Schema$LocalizedStringBundle;
        /**
         * When the language requires special treatment of the number 0 (as in Arabic).
         */
        zero?: Schema$LocalizedStringBundle;
    }
    /**
     * A number format resource.
     */
    export interface Schema$GamesNumberFormatConfiguration {
        /**
         * The curreny code string. Only used for CURRENCY format type.
         */
        currencyCode?: string | null;
        /**
         * The formatting for the number.
         */
        numberFormatType?: string | null;
        /**
         * The number of decimal places for number. Only used for NUMERIC format type.
         */
        numDecimalPlaces?: number | null;
        /**
         * An optional suffix for the NUMERIC format type.  These strings follow the same &lt;a href=&quot;http://developer.android.com/guide/topics/resources/string-resource.html#Plurals&quot;&gt; plural rules&lt;/a&gt; as all Android string resources.
         */
        suffix?: Schema$GamesNumberAffixConfiguration;
    }
    /**
     * An image configuration resource.
     */
    export interface Schema$ImageConfiguration {
        /**
         * The image type for the image.
         */
        imageType?: string | null;
        /**
         * Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#imageConfiguration`.
         */
        kind?: string | null;
        /**
         * The resource ID of resource which the image belongs to.
         */
        resourceId?: string | null;
        /**
         * The url for this image.
         */
        url?: string | null;
    }
    /**
     * An leaderboard configuration resource.
     */
    export interface Schema$LeaderboardConfiguration {
        /**
         * The draft data of the leaderboard.
         */
        draft?: Schema$LeaderboardConfigurationDetail;
        /**
         * The ID of the leaderboard.
         */
        id?: string | null;
        /**
         * Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#leaderboardConfiguration`.
         */
        kind?: string | null;
        /**
         * The read-only published data of the leaderboard.
         */
        published?: Schema$LeaderboardConfigurationDetail;
        /**
         * Maximum score that can be posted to this leaderboard.
         */
        scoreMax?: string | null;
        /**
         * Minimum score that can be posted to this leaderboard.
         */
        scoreMin?: string | null;
        scoreOrder?: string | null;
        /**
         * The token for this resource.
         */
        token?: string | null;
    }
    /**
     * A leaderboard configuration detail.
     */
    export interface Schema$LeaderboardConfigurationDetail {
        /**
         * The icon url of this leaderboard. Writes to this field are ignored.
         */
        iconUrl?: string | null;
        /**
         * Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#leaderboardConfigurationDetail`.
         */
        kind?: string | null;
        /**
         * Localized strings for the leaderboard name.
         */
        name?: Schema$LocalizedStringBundle;
        /**
         * The score formatting for the leaderboard.
         */
        scoreFormat?: Schema$GamesNumberFormatConfiguration;
        /**
         * The sort rank of this leaderboard. Writes to this field are ignored.
         */
        sortRank?: number | null;
    }
    /**
     * A ListConfigurations response.
     */
    export interface Schema$LeaderboardConfigurationListResponse {
        /**
         * The leaderboard configurations.
         */
        items?: Schema$LeaderboardConfiguration[];
        /**
         * Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#leaderboardConfigurationListResponse`.
         */
        kind?: string | null;
        /**
         * The pagination token for the next page of results.
         */
        nextPageToken?: string | null;
    }
    /**
     * A localized string resource.
     */
    export interface Schema$LocalizedString {
        /**
         * Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedString`.
         */
        kind?: string | null;
        /**
         * The locale string.
         */
        locale?: string | null;
        /**
         * The string value.
         */
        value?: string | null;
    }
    /**
     * A localized string bundle resource.
     */
    export interface Schema$LocalizedStringBundle {
        /**
         * Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedStringBundle`.
         */
        kind?: string | null;
        /**
         * The locale strings.
         */
        translations?: Schema$LocalizedString[];
    }
    export class Resource$Achievementconfigurations {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * gamesConfiguration.achievementConfigurations.delete
         * @desc Delete the achievement configuration with the given ID.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gamesConfiguration.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gamesConfiguration = google.gamesConfiguration('v1configuration');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/androidpublisher'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gamesConfiguration.achievementConfigurations.delete({
         *     // The ID of the achievement used by this method.
         *     achievementId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gamesConfiguration.achievementConfigurations.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.achievementId The ID of the achievement used by this method.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Achievementconfigurations$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Achievementconfigurations$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Achievementconfigurations$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Achievementconfigurations$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Achievementconfigurations$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * gamesConfiguration.achievementConfigurations.get
         * @desc Retrieves the metadata of the achievement configuration with the given ID.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gamesConfiguration.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gamesConfiguration = google.gamesConfiguration('v1configuration');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/androidpublisher'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gamesConfiguration.achievementConfigurations.get({
         *     // The ID of the achievement used by this method.
         *     achievementId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "achievementType": "my_achievementType",
         *   //   "draft": {},
         *   //   "id": "my_id",
         *   //   "initialState": "my_initialState",
         *   //   "kind": "my_kind",
         *   //   "published": {},
         *   //   "stepsToUnlock": 0,
         *   //   "token": "my_token"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gamesConfiguration.achievementConfigurations.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.achievementId The ID of the achievement used by this method.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Achievementconfigurations$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Achievementconfigurations$Get, options?: MethodOptions): GaxiosPromise<Schema$AchievementConfiguration>;
        get(params: Params$Resource$Achievementconfigurations$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Achievementconfigurations$Get, options: MethodOptions | BodyResponseCallback<Schema$AchievementConfiguration>, callback: BodyResponseCallback<Schema$AchievementConfiguration>): void;
        get(params: Params$Resource$Achievementconfigurations$Get, callback: BodyResponseCallback<Schema$AchievementConfiguration>): void;
        get(callback: BodyResponseCallback<Schema$AchievementConfiguration>): void;
        /**
         * gamesConfiguration.achievementConfigurations.insert
         * @desc Insert a new achievement configuration in this application.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gamesConfiguration.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gamesConfiguration = google.gamesConfiguration('v1configuration');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/androidpublisher'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gamesConfiguration.achievementConfigurations.insert({
         *     // The application ID from the Google Play developer console.
         *     applicationId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "achievementType": "my_achievementType",
         *       //   "draft": {},
         *       //   "id": "my_id",
         *       //   "initialState": "my_initialState",
         *       //   "kind": "my_kind",
         *       //   "published": {},
         *       //   "stepsToUnlock": 0,
         *       //   "token": "my_token"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "achievementType": "my_achievementType",
         *   //   "draft": {},
         *   //   "id": "my_id",
         *   //   "initialState": "my_initialState",
         *   //   "kind": "my_kind",
         *   //   "published": {},
         *   //   "stepsToUnlock": 0,
         *   //   "token": "my_token"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gamesConfiguration.achievementConfigurations.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.applicationId The application ID from the Google Play developer console.
         * @param {().AchievementConfiguration} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Achievementconfigurations$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Achievementconfigurations$Insert, options?: MethodOptions): GaxiosPromise<Schema$AchievementConfiguration>;
        insert(params: Params$Resource$Achievementconfigurations$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Achievementconfigurations$Insert, options: MethodOptions | BodyResponseCallback<Schema$AchievementConfiguration>, callback: BodyResponseCallback<Schema$AchievementConfiguration>): void;
        insert(params: Params$Resource$Achievementconfigurations$Insert, callback: BodyResponseCallback<Schema$AchievementConfiguration>): void;
        insert(callback: BodyResponseCallback<Schema$AchievementConfiguration>): void;
        /**
         * gamesConfiguration.achievementConfigurations.list
         * @desc Returns a list of the achievement configurations in this application.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gamesConfiguration.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gamesConfiguration = google.gamesConfiguration('v1configuration');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/androidpublisher'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gamesConfiguration.achievementConfigurations.list({
         *     // The application ID from the Google Play developer console.
         *     applicationId: 'placeholder-value',
         *     // The maximum number of resource configurations to return in the response,
         *     // used for paging. For any response, the actual number of resources returned
         *     // may be less than the specified `maxResults`.
         *     maxResults: 'placeholder-value',
         *     // The token returned by the previous request.
         *     pageToken: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
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
         * @alias gamesConfiguration.achievementConfigurations.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.applicationId The application ID from the Google Play developer console.
         * @param {integer=} params.maxResults The maximum number of resource configurations to return in the response, used for paging. For any response, the actual number of resources returned may be less than the specified `maxResults`.
         * @param {string=} params.pageToken The token returned by the previous request.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Achievementconfigurations$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Achievementconfigurations$List, options?: MethodOptions): GaxiosPromise<Schema$AchievementConfigurationListResponse>;
        list(params: Params$Resource$Achievementconfigurations$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Achievementconfigurations$List, options: MethodOptions | BodyResponseCallback<Schema$AchievementConfigurationListResponse>, callback: BodyResponseCallback<Schema$AchievementConfigurationListResponse>): void;
        list(params: Params$Resource$Achievementconfigurations$List, callback: BodyResponseCallback<Schema$AchievementConfigurationListResponse>): void;
        list(callback: BodyResponseCallback<Schema$AchievementConfigurationListResponse>): void;
        /**
         * gamesConfiguration.achievementConfigurations.update
         * @desc Update the metadata of the achievement configuration with the given ID.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gamesConfiguration.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gamesConfiguration = google.gamesConfiguration('v1configuration');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/androidpublisher'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gamesConfiguration.achievementConfigurations.update({
         *     // The ID of the achievement used by this method.
         *     achievementId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "achievementType": "my_achievementType",
         *       //   "draft": {},
         *       //   "id": "my_id",
         *       //   "initialState": "my_initialState",
         *       //   "kind": "my_kind",
         *       //   "published": {},
         *       //   "stepsToUnlock": 0,
         *       //   "token": "my_token"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "achievementType": "my_achievementType",
         *   //   "draft": {},
         *   //   "id": "my_id",
         *   //   "initialState": "my_initialState",
         *   //   "kind": "my_kind",
         *   //   "published": {},
         *   //   "stepsToUnlock": 0,
         *   //   "token": "my_token"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gamesConfiguration.achievementConfigurations.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.achievementId The ID of the achievement used by this method.
         * @param {().AchievementConfiguration} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Achievementconfigurations$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Achievementconfigurations$Update, options?: MethodOptions): GaxiosPromise<Schema$AchievementConfiguration>;
        update(params: Params$Resource$Achievementconfigurations$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Achievementconfigurations$Update, options: MethodOptions | BodyResponseCallback<Schema$AchievementConfiguration>, callback: BodyResponseCallback<Schema$AchievementConfiguration>): void;
        update(params: Params$Resource$Achievementconfigurations$Update, callback: BodyResponseCallback<Schema$AchievementConfiguration>): void;
        update(callback: BodyResponseCallback<Schema$AchievementConfiguration>): void;
    }
    export interface Params$Resource$Achievementconfigurations$Delete extends StandardParameters {
        /**
         * The ID of the achievement used by this method.
         */
        achievementId?: string;
    }
    export interface Params$Resource$Achievementconfigurations$Get extends StandardParameters {
        /**
         * The ID of the achievement used by this method.
         */
        achievementId?: string;
    }
    export interface Params$Resource$Achievementconfigurations$Insert extends StandardParameters {
        /**
         * The application ID from the Google Play developer console.
         */
        applicationId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$AchievementConfiguration;
    }
    export interface Params$Resource$Achievementconfigurations$List extends StandardParameters {
        /**
         * The application ID from the Google Play developer console.
         */
        applicationId?: string;
        /**
         * The maximum number of resource configurations to return in the response, used for paging. For any response, the actual number of resources returned may be less than the specified `maxResults`.
         */
        maxResults?: number;
        /**
         * The token returned by the previous request.
         */
        pageToken?: string;
    }
    export interface Params$Resource$Achievementconfigurations$Update extends StandardParameters {
        /**
         * The ID of the achievement used by this method.
         */
        achievementId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$AchievementConfiguration;
    }
    export class Resource$Imageconfigurations {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * gamesConfiguration.imageConfigurations.upload
         * @desc Uploads an image for a resource with the given ID and image type.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gamesConfiguration.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gamesConfiguration = google.gamesConfiguration('v1configuration');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/androidpublisher'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gamesConfiguration.imageConfigurations.upload({
         *     // Selects which image in a resource for this method.
         *     imageType: 'placeholder-value',
         *     // The ID of the resource used by this method.
         *     resourceId: 'placeholder-value',
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
         *   //   "imageType": "my_imageType",
         *   //   "kind": "my_kind",
         *   //   "resourceId": "my_resourceId",
         *   //   "url": "my_url"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gamesConfiguration.imageConfigurations.upload
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.imageType Selects which image in a resource for this method.
         * @param {string} params.resourceId The ID of the resource used by this method.
         * @param {object} params.media Media object
         * @param {string} params.media.mimeType Media mime-type
         * @param {string|object} params.media.body Media body contents
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        upload(params: Params$Resource$Imageconfigurations$Upload, options: StreamMethodOptions): GaxiosPromise<Readable>;
        upload(params?: Params$Resource$Imageconfigurations$Upload, options?: MethodOptions): GaxiosPromise<Schema$ImageConfiguration>;
        upload(params: Params$Resource$Imageconfigurations$Upload, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        upload(params: Params$Resource$Imageconfigurations$Upload, options: MethodOptions | BodyResponseCallback<Schema$ImageConfiguration>, callback: BodyResponseCallback<Schema$ImageConfiguration>): void;
        upload(params: Params$Resource$Imageconfigurations$Upload, callback: BodyResponseCallback<Schema$ImageConfiguration>): void;
        upload(callback: BodyResponseCallback<Schema$ImageConfiguration>): void;
    }
    export interface Params$Resource$Imageconfigurations$Upload extends StandardParameters {
        /**
         * Selects which image in a resource for this method.
         */
        imageType?: string;
        /**
         * The ID of the resource used by this method.
         */
        resourceId?: string;
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
    export class Resource$Leaderboardconfigurations {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * gamesConfiguration.leaderboardConfigurations.delete
         * @desc Delete the leaderboard configuration with the given ID.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gamesConfiguration.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gamesConfiguration = google.gamesConfiguration('v1configuration');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/androidpublisher'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gamesConfiguration.leaderboardConfigurations.delete({
         *     // The ID of the leaderboard.
         *     leaderboardId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gamesConfiguration.leaderboardConfigurations.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.leaderboardId The ID of the leaderboard.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Leaderboardconfigurations$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Leaderboardconfigurations$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Leaderboardconfigurations$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Leaderboardconfigurations$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Leaderboardconfigurations$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * gamesConfiguration.leaderboardConfigurations.get
         * @desc Retrieves the metadata of the leaderboard configuration with the given ID.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gamesConfiguration.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gamesConfiguration = google.gamesConfiguration('v1configuration');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/androidpublisher'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gamesConfiguration.leaderboardConfigurations.get({
         *     // The ID of the leaderboard.
         *     leaderboardId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "draft": {},
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "published": {},
         *   //   "scoreMax": "my_scoreMax",
         *   //   "scoreMin": "my_scoreMin",
         *   //   "scoreOrder": "my_scoreOrder",
         *   //   "token": "my_token"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gamesConfiguration.leaderboardConfigurations.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.leaderboardId The ID of the leaderboard.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Leaderboardconfigurations$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Leaderboardconfigurations$Get, options?: MethodOptions): GaxiosPromise<Schema$LeaderboardConfiguration>;
        get(params: Params$Resource$Leaderboardconfigurations$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Leaderboardconfigurations$Get, options: MethodOptions | BodyResponseCallback<Schema$LeaderboardConfiguration>, callback: BodyResponseCallback<Schema$LeaderboardConfiguration>): void;
        get(params: Params$Resource$Leaderboardconfigurations$Get, callback: BodyResponseCallback<Schema$LeaderboardConfiguration>): void;
        get(callback: BodyResponseCallback<Schema$LeaderboardConfiguration>): void;
        /**
         * gamesConfiguration.leaderboardConfigurations.insert
         * @desc Insert a new leaderboard configuration in this application.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gamesConfiguration.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gamesConfiguration = google.gamesConfiguration('v1configuration');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/androidpublisher'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gamesConfiguration.leaderboardConfigurations.insert({
         *     // The application ID from the Google Play developer console.
         *     applicationId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "draft": {},
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "published": {},
         *       //   "scoreMax": "my_scoreMax",
         *       //   "scoreMin": "my_scoreMin",
         *       //   "scoreOrder": "my_scoreOrder",
         *       //   "token": "my_token"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "draft": {},
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "published": {},
         *   //   "scoreMax": "my_scoreMax",
         *   //   "scoreMin": "my_scoreMin",
         *   //   "scoreOrder": "my_scoreOrder",
         *   //   "token": "my_token"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gamesConfiguration.leaderboardConfigurations.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.applicationId The application ID from the Google Play developer console.
         * @param {().LeaderboardConfiguration} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Leaderboardconfigurations$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Leaderboardconfigurations$Insert, options?: MethodOptions): GaxiosPromise<Schema$LeaderboardConfiguration>;
        insert(params: Params$Resource$Leaderboardconfigurations$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Leaderboardconfigurations$Insert, options: MethodOptions | BodyResponseCallback<Schema$LeaderboardConfiguration>, callback: BodyResponseCallback<Schema$LeaderboardConfiguration>): void;
        insert(params: Params$Resource$Leaderboardconfigurations$Insert, callback: BodyResponseCallback<Schema$LeaderboardConfiguration>): void;
        insert(callback: BodyResponseCallback<Schema$LeaderboardConfiguration>): void;
        /**
         * gamesConfiguration.leaderboardConfigurations.list
         * @desc Returns a list of the leaderboard configurations in this application.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gamesConfiguration.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gamesConfiguration = google.gamesConfiguration('v1configuration');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/androidpublisher'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gamesConfiguration.leaderboardConfigurations.list({
         *     // The application ID from the Google Play developer console.
         *     applicationId: 'placeholder-value',
         *     // The maximum number of resource configurations to return in the response,
         *     // used for paging. For any response, the actual number of resources returned
         *     // may be less than the specified `maxResults`.
         *     maxResults: 'placeholder-value',
         *     // The token returned by the previous request.
         *     pageToken: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
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
         * @alias gamesConfiguration.leaderboardConfigurations.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.applicationId The application ID from the Google Play developer console.
         * @param {integer=} params.maxResults The maximum number of resource configurations to return in the response, used for paging. For any response, the actual number of resources returned may be less than the specified `maxResults`.
         * @param {string=} params.pageToken The token returned by the previous request.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Leaderboardconfigurations$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Leaderboardconfigurations$List, options?: MethodOptions): GaxiosPromise<Schema$LeaderboardConfigurationListResponse>;
        list(params: Params$Resource$Leaderboardconfigurations$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Leaderboardconfigurations$List, options: MethodOptions | BodyResponseCallback<Schema$LeaderboardConfigurationListResponse>, callback: BodyResponseCallback<Schema$LeaderboardConfigurationListResponse>): void;
        list(params: Params$Resource$Leaderboardconfigurations$List, callback: BodyResponseCallback<Schema$LeaderboardConfigurationListResponse>): void;
        list(callback: BodyResponseCallback<Schema$LeaderboardConfigurationListResponse>): void;
        /**
         * gamesConfiguration.leaderboardConfigurations.update
         * @desc Update the metadata of the leaderboard configuration with the given ID.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gamesConfiguration.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gamesConfiguration = google.gamesConfiguration('v1configuration');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/androidpublisher'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gamesConfiguration.leaderboardConfigurations.update({
         *     // The ID of the leaderboard.
         *     leaderboardId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "draft": {},
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "published": {},
         *       //   "scoreMax": "my_scoreMax",
         *       //   "scoreMin": "my_scoreMin",
         *       //   "scoreOrder": "my_scoreOrder",
         *       //   "token": "my_token"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "draft": {},
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "published": {},
         *   //   "scoreMax": "my_scoreMax",
         *   //   "scoreMin": "my_scoreMin",
         *   //   "scoreOrder": "my_scoreOrder",
         *   //   "token": "my_token"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gamesConfiguration.leaderboardConfigurations.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.leaderboardId The ID of the leaderboard.
         * @param {().LeaderboardConfiguration} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Leaderboardconfigurations$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Leaderboardconfigurations$Update, options?: MethodOptions): GaxiosPromise<Schema$LeaderboardConfiguration>;
        update(params: Params$Resource$Leaderboardconfigurations$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Leaderboardconfigurations$Update, options: MethodOptions | BodyResponseCallback<Schema$LeaderboardConfiguration>, callback: BodyResponseCallback<Schema$LeaderboardConfiguration>): void;
        update(params: Params$Resource$Leaderboardconfigurations$Update, callback: BodyResponseCallback<Schema$LeaderboardConfiguration>): void;
        update(callback: BodyResponseCallback<Schema$LeaderboardConfiguration>): void;
    }
    export interface Params$Resource$Leaderboardconfigurations$Delete extends StandardParameters {
        /**
         * The ID of the leaderboard.
         */
        leaderboardId?: string;
    }
    export interface Params$Resource$Leaderboardconfigurations$Get extends StandardParameters {
        /**
         * The ID of the leaderboard.
         */
        leaderboardId?: string;
    }
    export interface Params$Resource$Leaderboardconfigurations$Insert extends StandardParameters {
        /**
         * The application ID from the Google Play developer console.
         */
        applicationId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$LeaderboardConfiguration;
    }
    export interface Params$Resource$Leaderboardconfigurations$List extends StandardParameters {
        /**
         * The application ID from the Google Play developer console.
         */
        applicationId?: string;
        /**
         * The maximum number of resource configurations to return in the response, used for paging. For any response, the actual number of resources returned may be less than the specified `maxResults`.
         */
        maxResults?: number;
        /**
         * The token returned by the previous request.
         */
        pageToken?: string;
    }
    export interface Params$Resource$Leaderboardconfigurations$Update extends StandardParameters {
        /**
         * The ID of the leaderboard.
         */
        leaderboardId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$LeaderboardConfiguration;
    }
    export {};
}
