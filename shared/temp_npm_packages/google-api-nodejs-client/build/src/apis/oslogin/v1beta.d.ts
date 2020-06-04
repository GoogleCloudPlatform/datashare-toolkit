/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace oslogin_v1beta {
    export interface Options extends GlobalOptions {
        version: 'v1beta';
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
     * Cloud OS Login API
     *
     * You can use OS Login to manage access to your VM instances using IAM roles.
     *
     * @example
     * const {google} = require('googleapis');
     * const oslogin = google.oslogin('v1beta');
     *
     * @namespace oslogin
     * @type {Function}
     * @version v1beta
     * @variation v1beta
     * @param {object=} options Options for Oslogin
     */
    export class Oslogin {
        context: APIRequestContext;
        users: Resource$Users;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    /**
     * A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance:      service Foo {       rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty);     }  The JSON representation for `Empty` is empty JSON object `{}`.
     */
    export interface Schema$Empty {
    }
    /**
     * A response message for importing an SSH public key.
     */
    export interface Schema$ImportSshPublicKeyResponse {
        /**
         * The login profile information for the user.
         */
        loginProfile?: Schema$LoginProfile;
    }
    /**
     * The user profile information used for logging in to a virtual machine on Google Compute Engine.
     */
    export interface Schema$LoginProfile {
        /**
         * Required. A unique user ID.
         */
        name?: string | null;
        /**
         * The list of POSIX accounts associated with the user.
         */
        posixAccounts?: Schema$PosixAccount[];
        /**
         * A map from SSH public key fingerprint to the associated key object.
         */
        sshPublicKeys?: {
            [key: string]: Schema$SshPublicKey;
        } | null;
    }
    /**
     * The POSIX account information associated with a Google account.
     */
    export interface Schema$PosixAccount {
        /**
         * Output only. A POSIX account identifier.
         */
        accountId?: string | null;
        /**
         * The GECOS (user information) entry for this account.
         */
        gecos?: string | null;
        /**
         * The default group ID.
         */
        gid?: string | null;
        /**
         * The path to the home directory for this account.
         */
        homeDirectory?: string | null;
        /**
         * Output only. The canonical resource name.
         */
        name?: string | null;
        /**
         * The operating system type where this account applies.
         */
        operatingSystemType?: string | null;
        /**
         * Only one POSIX account can be marked as primary.
         */
        primary?: boolean | null;
        /**
         * The path to the logic shell for this account.
         */
        shell?: string | null;
        /**
         * System identifier for which account the username or uid applies to. By default, the empty value is used.
         */
        systemId?: string | null;
        /**
         * The user ID.
         */
        uid?: string | null;
        /**
         * The username of the POSIX account.
         */
        username?: string | null;
    }
    /**
     * The SSH public key information associated with a Google account.
     */
    export interface Schema$SshPublicKey {
        /**
         * An expiration time in microseconds since epoch.
         */
        expirationTimeUsec?: string | null;
        /**
         * Output only. The SHA-256 fingerprint of the SSH public key.
         */
        fingerprint?: string | null;
        /**
         * Public key text in SSH format, defined by &lt;a href=&quot;https://www.ietf.org/rfc/rfc4253.txt&quot; target=&quot;_blank&quot;&gt;RFC4253&lt;/a&gt; section 6.6.
         */
        key?: string | null;
        /**
         * Output only. The canonical resource name.
         */
        name?: string | null;
    }
    export class Resource$Users {
        context: APIRequestContext;
        projects: Resource$Users$Projects;
        sshPublicKeys: Resource$Users$Sshpublickeys;
        constructor(context: APIRequestContext);
        /**
         * oslogin.users.getLoginProfile
         * @desc Retrieves the profile information used for logging in to a virtual machine on Google Compute Engine.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/oslogin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const oslogin = google.oslogin('v1beta');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/compute',
         *       'https://www.googleapis.com/auth/compute.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await oslogin.users.getLoginProfile({
         *     // Required. The unique ID for the user in format `users/{user}`.
         *     name: 'users/my-user',
         *     // The project ID of the Google Cloud Platform project.
         *     projectId: 'placeholder-value',
         *     // A system ID for filtering the results of the request.
         *     systemId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "name": "my_name",
         *   //   "posixAccounts": [],
         *   //   "sshPublicKeys": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias oslogin.users.getLoginProfile
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The unique ID for the user in format `users/{user}`.
         * @param {string=} params.projectId The project ID of the Google Cloud Platform project.
         * @param {string=} params.systemId A system ID for filtering the results of the request.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getLoginProfile(params: Params$Resource$Users$Getloginprofile, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getLoginProfile(params?: Params$Resource$Users$Getloginprofile, options?: MethodOptions): GaxiosPromise<Schema$LoginProfile>;
        getLoginProfile(params: Params$Resource$Users$Getloginprofile, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getLoginProfile(params: Params$Resource$Users$Getloginprofile, options: MethodOptions | BodyResponseCallback<Schema$LoginProfile>, callback: BodyResponseCallback<Schema$LoginProfile>): void;
        getLoginProfile(params: Params$Resource$Users$Getloginprofile, callback: BodyResponseCallback<Schema$LoginProfile>): void;
        getLoginProfile(callback: BodyResponseCallback<Schema$LoginProfile>): void;
        /**
         * oslogin.users.importSshPublicKey
         * @desc Adds an SSH public key and returns the profile information. Default POSIX account information is set when no username and UID exist as part of the login profile.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/oslogin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const oslogin = google.oslogin('v1beta');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/compute',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await oslogin.users.importSshPublicKey({
         *     // The unique ID for the user in format `users/{user}`.
         *     parent: 'users/my-user',
         *     // The project ID of the Google Cloud Platform project.
         *     projectId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "expirationTimeUsec": "my_expirationTimeUsec",
         *       //   "fingerprint": "my_fingerprint",
         *       //   "key": "my_key",
         *       //   "name": "my_name"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "loginProfile": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias oslogin.users.importSshPublicKey
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent The unique ID for the user in format `users/{user}`.
         * @param {string=} params.projectId The project ID of the Google Cloud Platform project.
         * @param {().SshPublicKey} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        importSshPublicKey(params: Params$Resource$Users$Importsshpublickey, options: StreamMethodOptions): GaxiosPromise<Readable>;
        importSshPublicKey(params?: Params$Resource$Users$Importsshpublickey, options?: MethodOptions): GaxiosPromise<Schema$ImportSshPublicKeyResponse>;
        importSshPublicKey(params: Params$Resource$Users$Importsshpublickey, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        importSshPublicKey(params: Params$Resource$Users$Importsshpublickey, options: MethodOptions | BodyResponseCallback<Schema$ImportSshPublicKeyResponse>, callback: BodyResponseCallback<Schema$ImportSshPublicKeyResponse>): void;
        importSshPublicKey(params: Params$Resource$Users$Importsshpublickey, callback: BodyResponseCallback<Schema$ImportSshPublicKeyResponse>): void;
        importSshPublicKey(callback: BodyResponseCallback<Schema$ImportSshPublicKeyResponse>): void;
    }
    export interface Params$Resource$Users$Getloginprofile extends StandardParameters {
        /**
         * Required. The unique ID for the user in format `users/{user}`.
         */
        name?: string;
        /**
         * The project ID of the Google Cloud Platform project.
         */
        projectId?: string;
        /**
         * A system ID for filtering the results of the request.
         */
        systemId?: string;
    }
    export interface Params$Resource$Users$Importsshpublickey extends StandardParameters {
        /**
         * The unique ID for the user in format `users/{user}`.
         */
        parent?: string;
        /**
         * The project ID of the Google Cloud Platform project.
         */
        projectId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$SshPublicKey;
    }
    export class Resource$Users$Projects {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * oslogin.users.projects.delete
         * @desc Deletes a POSIX account.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/oslogin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const oslogin = google.oslogin('v1beta');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/compute',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await oslogin.users.projects.delete({
         *     // Required. A reference to the POSIX account to update. POSIX accounts are identified
         *     // by the project ID they are associated with. A reference to the POSIX
         *     // account is in format `users/{user}/projects/{project}`.
         *     name: 'users/my-user/projects/my-project',
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
         * @alias oslogin.users.projects.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. A reference to the POSIX account to update. POSIX accounts are identified by the project ID they are associated with. A reference to the POSIX account is in format `users/{user}/projects/{project}`.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Users$Projects$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Users$Projects$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Users$Projects$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Users$Projects$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Users$Projects$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
    }
    export interface Params$Resource$Users$Projects$Delete extends StandardParameters {
        /**
         * Required. A reference to the POSIX account to update. POSIX accounts are identified by the project ID they are associated with. A reference to the POSIX account is in format `users/{user}/projects/{project}`.
         */
        name?: string;
    }
    export class Resource$Users$Sshpublickeys {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * oslogin.users.sshPublicKeys.delete
         * @desc Deletes an SSH public key.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/oslogin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const oslogin = google.oslogin('v1beta');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/compute',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await oslogin.users.sshPublicKeys.delete({
         *     // Required. The fingerprint of the public key to update. Public keys are identified by
         *     // their SHA-256 fingerprint. The fingerprint of the public key is in format
         *     // `users/{user}/sshPublicKeys/{fingerprint}`.
         *     name: 'users/my-user/sshPublicKeys/my-sshPublicKey',
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
         * @alias oslogin.users.sshPublicKeys.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The fingerprint of the public key to update. Public keys are identified by their SHA-256 fingerprint. The fingerprint of the public key is in format `users/{user}/sshPublicKeys/{fingerprint}`.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Users$Sshpublickeys$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Users$Sshpublickeys$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Users$Sshpublickeys$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Users$Sshpublickeys$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Users$Sshpublickeys$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * oslogin.users.sshPublicKeys.get
         * @desc Retrieves an SSH public key.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/oslogin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const oslogin = google.oslogin('v1beta');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/compute',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await oslogin.users.sshPublicKeys.get({
         *     // Required. The fingerprint of the public key to retrieve. Public keys are identified
         *     // by their SHA-256 fingerprint. The fingerprint of the public key is in
         *     // format `users/{user}/sshPublicKeys/{fingerprint}`.
         *     name: 'users/my-user/sshPublicKeys/my-sshPublicKey',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "expirationTimeUsec": "my_expirationTimeUsec",
         *   //   "fingerprint": "my_fingerprint",
         *   //   "key": "my_key",
         *   //   "name": "my_name"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias oslogin.users.sshPublicKeys.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The fingerprint of the public key to retrieve. Public keys are identified by their SHA-256 fingerprint. The fingerprint of the public key is in format `users/{user}/sshPublicKeys/{fingerprint}`.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Users$Sshpublickeys$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Users$Sshpublickeys$Get, options?: MethodOptions): GaxiosPromise<Schema$SshPublicKey>;
        get(params: Params$Resource$Users$Sshpublickeys$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Users$Sshpublickeys$Get, options: MethodOptions | BodyResponseCallback<Schema$SshPublicKey>, callback: BodyResponseCallback<Schema$SshPublicKey>): void;
        get(params: Params$Resource$Users$Sshpublickeys$Get, callback: BodyResponseCallback<Schema$SshPublicKey>): void;
        get(callback: BodyResponseCallback<Schema$SshPublicKey>): void;
        /**
         * oslogin.users.sshPublicKeys.patch
         * @desc Updates an SSH public key and returns the profile information. This method supports patch semantics.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/oslogin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const oslogin = google.oslogin('v1beta');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/compute',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await oslogin.users.sshPublicKeys.patch({
         *     // Required. The fingerprint of the public key to update. Public keys are identified by
         *     // their SHA-256 fingerprint. The fingerprint of the public key is in format
         *     // `users/{user}/sshPublicKeys/{fingerprint}`.
         *     name: 'users/my-user/sshPublicKeys/my-sshPublicKey',
         *     // Mask to control which fields get updated. Updates all if not present.
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "expirationTimeUsec": "my_expirationTimeUsec",
         *       //   "fingerprint": "my_fingerprint",
         *       //   "key": "my_key",
         *       //   "name": "my_name"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "expirationTimeUsec": "my_expirationTimeUsec",
         *   //   "fingerprint": "my_fingerprint",
         *   //   "key": "my_key",
         *   //   "name": "my_name"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias oslogin.users.sshPublicKeys.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The fingerprint of the public key to update. Public keys are identified by their SHA-256 fingerprint. The fingerprint of the public key is in format `users/{user}/sshPublicKeys/{fingerprint}`.
         * @param {string=} params.updateMask Mask to control which fields get updated. Updates all if not present.
         * @param {().SshPublicKey} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Users$Sshpublickeys$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Users$Sshpublickeys$Patch, options?: MethodOptions): GaxiosPromise<Schema$SshPublicKey>;
        patch(params: Params$Resource$Users$Sshpublickeys$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Users$Sshpublickeys$Patch, options: MethodOptions | BodyResponseCallback<Schema$SshPublicKey>, callback: BodyResponseCallback<Schema$SshPublicKey>): void;
        patch(params: Params$Resource$Users$Sshpublickeys$Patch, callback: BodyResponseCallback<Schema$SshPublicKey>): void;
        patch(callback: BodyResponseCallback<Schema$SshPublicKey>): void;
    }
    export interface Params$Resource$Users$Sshpublickeys$Delete extends StandardParameters {
        /**
         * Required. The fingerprint of the public key to update. Public keys are identified by their SHA-256 fingerprint. The fingerprint of the public key is in format `users/{user}/sshPublicKeys/{fingerprint}`.
         */
        name?: string;
    }
    export interface Params$Resource$Users$Sshpublickeys$Get extends StandardParameters {
        /**
         * Required. The fingerprint of the public key to retrieve. Public keys are identified by their SHA-256 fingerprint. The fingerprint of the public key is in format `users/{user}/sshPublicKeys/{fingerprint}`.
         */
        name?: string;
    }
    export interface Params$Resource$Users$Sshpublickeys$Patch extends StandardParameters {
        /**
         * Required. The fingerprint of the public key to update. Public keys are identified by their SHA-256 fingerprint. The fingerprint of the public key is in format `users/{user}/sshPublicKeys/{fingerprint}`.
         */
        name?: string;
        /**
         * Mask to control which fields get updated. Updates all if not present.
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$SshPublicKey;
    }
    export {};
}
