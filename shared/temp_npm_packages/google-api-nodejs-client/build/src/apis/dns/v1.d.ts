/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace dns_v1 {
    export interface Options extends GlobalOptions {
        version: 'v1';
    }
    interface StandardParameters {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient | GoogleAuth;
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
     * Google Cloud DNS API
     *
     * Configures and serves authoritative DNS records.
     *
     * @example
     * const {google} = require('googleapis');
     * const dns = google.dns('v1');
     *
     * @namespace dns
     * @type {Function}
     * @version v1
     * @variation v1
     * @param {object=} options Options for Dns
     */
    export class Dns {
        context: APIRequestContext;
        changes: Resource$Changes;
        dnsKeys: Resource$Dnskeys;
        managedZoneOperations: Resource$Managedzoneoperations;
        managedZones: Resource$Managedzones;
        policies: Resource$Policies;
        projects: Resource$Projects;
        resourceRecordSets: Resource$Resourcerecordsets;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    export interface Schema$Change {
        additions?: Schema$ResourceRecordSet[];
        deletions?: Schema$ResourceRecordSet[];
        id?: string | null;
        isServing?: boolean | null;
        /**
         * Identifies what kind of resource this is. Value: the fixed string &quot;dns#change&quot;.
         */
        kind?: string | null;
        startTime?: string | null;
        status?: string | null;
    }
    export interface Schema$ChangesListResponse {
        changes?: Schema$Change[];
        header?: Schema$ResponseHeader;
        /**
         * Type of resource.
         */
        kind?: string | null;
        nextPageToken?: string | null;
    }
    export interface Schema$DnsKey {
        algorithm?: string | null;
        creationTime?: string | null;
        description?: string | null;
        digests?: Schema$DnsKeyDigest[];
        id?: string | null;
        isActive?: boolean | null;
        keyLength?: number | null;
        keyTag?: number | null;
        /**
         * Identifies what kind of resource this is. Value: the fixed string &quot;dns#dnsKey&quot;.
         */
        kind?: string | null;
        publicKey?: string | null;
        type?: string | null;
    }
    export interface Schema$DnsKeyDigest {
        digest?: string | null;
        type?: string | null;
    }
    export interface Schema$DnsKeysListResponse {
        dnsKeys?: Schema$DnsKey[];
        header?: Schema$ResponseHeader;
        /**
         * Type of resource.
         */
        kind?: string | null;
        nextPageToken?: string | null;
    }
    export interface Schema$DnsKeySpec {
        algorithm?: string | null;
        keyLength?: number | null;
        keyType?: string | null;
        /**
         * Identifies what kind of resource this is. Value: the fixed string &quot;dns#dnsKeySpec&quot;.
         */
        kind?: string | null;
    }
    export interface Schema$ManagedZone {
        creationTime?: string | null;
        description?: string | null;
        dnsName?: string | null;
        dnssecConfig?: Schema$ManagedZoneDnsSecConfig;
        forwardingConfig?: Schema$ManagedZoneForwardingConfig;
        id?: string | null;
        /**
         * Identifies what kind of resource this is. Value: the fixed string &quot;dns#managedZone&quot;.
         */
        kind?: string | null;
        labels?: {
            [key: string]: string;
        } | null;
        name?: string | null;
        nameServers?: string[] | null;
        nameServerSet?: string | null;
        peeringConfig?: Schema$ManagedZonePeeringConfig;
        privateVisibilityConfig?: Schema$ManagedZonePrivateVisibilityConfig;
        reverseLookupConfig?: Schema$ManagedZoneReverseLookupConfig;
        visibility?: string | null;
    }
    export interface Schema$ManagedZoneDnsSecConfig {
        defaultKeySpecs?: Schema$DnsKeySpec[];
        /**
         * Identifies what kind of resource this is. Value: the fixed string &quot;dns#managedZoneDnsSecConfig&quot;.
         */
        kind?: string | null;
        nonExistence?: string | null;
        state?: string | null;
    }
    export interface Schema$ManagedZoneForwardingConfig {
        /**
         * Identifies what kind of resource this is. Value: the fixed string &quot;dns#managedZoneForwardingConfig&quot;.
         */
        kind?: string | null;
        targetNameServers?: Schema$ManagedZoneForwardingConfigNameServerTarget[];
    }
    export interface Schema$ManagedZoneForwardingConfigNameServerTarget {
        forwardingPath?: string | null;
        ipv4Address?: string | null;
        /**
         * Identifies what kind of resource this is. Value: the fixed string &quot;dns#managedZoneForwardingConfigNameServerTarget&quot;.
         */
        kind?: string | null;
    }
    export interface Schema$ManagedZoneOperationsListResponse {
        header?: Schema$ResponseHeader;
        /**
         * Type of resource.
         */
        kind?: string | null;
        nextPageToken?: string | null;
        operations?: Schema$Operation[];
    }
    export interface Schema$ManagedZonePeeringConfig {
        /**
         * Identifies what kind of resource this is. Value: the fixed string &quot;dns#managedZonePeeringConfig&quot;.
         */
        kind?: string | null;
        targetNetwork?: Schema$ManagedZonePeeringConfigTargetNetwork;
    }
    export interface Schema$ManagedZonePeeringConfigTargetNetwork {
        deactivateTime?: string | null;
        /**
         * Identifies what kind of resource this is. Value: the fixed string &quot;dns#managedZonePeeringConfigTargetNetwork&quot;.
         */
        kind?: string | null;
        networkUrl?: string | null;
    }
    export interface Schema$ManagedZonePrivateVisibilityConfig {
        /**
         * Identifies what kind of resource this is. Value: the fixed string &quot;dns#managedZonePrivateVisibilityConfig&quot;.
         */
        kind?: string | null;
        networks?: Schema$ManagedZonePrivateVisibilityConfigNetwork[];
    }
    export interface Schema$ManagedZonePrivateVisibilityConfigNetwork {
        /**
         * Identifies what kind of resource this is. Value: the fixed string &quot;dns#managedZonePrivateVisibilityConfigNetwork&quot;.
         */
        kind?: string | null;
        networkUrl?: string | null;
    }
    export interface Schema$ManagedZoneReverseLookupConfig {
        /**
         * Identifies what kind of resource this is. Value: the fixed string &quot;dns#managedZoneReverseLookupConfig&quot;.
         */
        kind?: string | null;
    }
    export interface Schema$ManagedZonesListResponse {
        header?: Schema$ResponseHeader;
        /**
         * Type of resource.
         */
        kind?: string | null;
        managedZones?: Schema$ManagedZone[];
        nextPageToken?: string | null;
    }
    export interface Schema$Operation {
        dnsKeyContext?: Schema$OperationDnsKeyContext;
        id?: string | null;
        /**
         * Identifies what kind of resource this is. Value: the fixed string &quot;dns#operation&quot;.
         */
        kind?: string | null;
        startTime?: string | null;
        status?: string | null;
        type?: string | null;
        user?: string | null;
        zoneContext?: Schema$OperationManagedZoneContext;
    }
    export interface Schema$OperationDnsKeyContext {
        newValue?: Schema$DnsKey;
        oldValue?: Schema$DnsKey;
    }
    export interface Schema$OperationManagedZoneContext {
        newValue?: Schema$ManagedZone;
        oldValue?: Schema$ManagedZone;
    }
    export interface Schema$PoliciesListResponse {
        header?: Schema$ResponseHeader;
        /**
         * Type of resource.
         */
        kind?: string | null;
        nextPageToken?: string | null;
        policies?: Schema$Policy[];
    }
    export interface Schema$PoliciesPatchResponse {
        header?: Schema$ResponseHeader;
        policy?: Schema$Policy;
    }
    export interface Schema$PoliciesUpdateResponse {
        header?: Schema$ResponseHeader;
        policy?: Schema$Policy;
    }
    export interface Schema$Policy {
        alternativeNameServerConfig?: Schema$PolicyAlternativeNameServerConfig;
        description?: string | null;
        enableInboundForwarding?: boolean | null;
        enableLogging?: boolean | null;
        id?: string | null;
        /**
         * Identifies what kind of resource this is. Value: the fixed string &quot;dns#policy&quot;.
         */
        kind?: string | null;
        name?: string | null;
        networks?: Schema$PolicyNetwork[];
    }
    export interface Schema$PolicyAlternativeNameServerConfig {
        /**
         * Identifies what kind of resource this is. Value: the fixed string &quot;dns#policyAlternativeNameServerConfig&quot;.
         */
        kind?: string | null;
        targetNameServers?: Schema$PolicyAlternativeNameServerConfigTargetNameServer[];
    }
    export interface Schema$PolicyAlternativeNameServerConfigTargetNameServer {
        forwardingPath?: string | null;
        ipv4Address?: string | null;
        /**
         * Identifies what kind of resource this is. Value: the fixed string &quot;dns#policyAlternativeNameServerConfigTargetNameServer&quot;.
         */
        kind?: string | null;
    }
    export interface Schema$PolicyNetwork {
        /**
         * Identifies what kind of resource this is. Value: the fixed string &quot;dns#policyNetwork&quot;.
         */
        kind?: string | null;
        networkUrl?: string | null;
    }
    export interface Schema$Project {
        id?: string | null;
        /**
         * Identifies what kind of resource this is. Value: the fixed string &quot;dns#project&quot;.
         */
        kind?: string | null;
        number?: string | null;
        quota?: Schema$Quota;
    }
    export interface Schema$Quota {
        dnsKeysPerManagedZone?: number | null;
        /**
         * Identifies what kind of resource this is. Value: the fixed string &quot;dns#quota&quot;.
         */
        kind?: string | null;
        managedZones?: number | null;
        managedZonesPerNetwork?: number | null;
        networksPerManagedZone?: number | null;
        networksPerPolicy?: number | null;
        policies?: number | null;
        resourceRecordsPerRrset?: number | null;
        rrsetAdditionsPerChange?: number | null;
        rrsetDeletionsPerChange?: number | null;
        rrsetsPerManagedZone?: number | null;
        targetNameServersPerManagedZone?: number | null;
        targetNameServersPerPolicy?: number | null;
        totalRrdataSizePerChange?: number | null;
        whitelistedKeySpecs?: Schema$DnsKeySpec[];
    }
    export interface Schema$ResourceRecordSet {
        /**
         * Identifies what kind of resource this is. Value: the fixed string &quot;dns#resourceRecordSet&quot;.
         */
        kind?: string | null;
        name?: string | null;
        rrdatas?: string[] | null;
        signatureRrdatas?: string[] | null;
        ttl?: number | null;
        type?: string | null;
    }
    export interface Schema$ResourceRecordSetsListResponse {
        header?: Schema$ResponseHeader;
        /**
         * Type of resource.
         */
        kind?: string | null;
        nextPageToken?: string | null;
        rrsets?: Schema$ResourceRecordSet[];
    }
    export interface Schema$ResponseHeader {
        operationId?: string | null;
    }
    export class Resource$Changes {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * dns.changes.create
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dns.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dns = google.dns('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/ndev.clouddns.readwrite',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await dns.changes.create({
         *     clientOperationId: 'placeholder-value',
         *
         *     managedZone: 'placeholder-value',
         *
         *     project: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "additions": [],
         *       //   "deletions": [],
         *       //   "id": "my_id",
         *       //   "isServing": false,
         *       //   "kind": "my_kind",
         *       //   "startTime": "my_startTime",
         *       //   "status": "my_status"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "additions": [],
         *   //   "deletions": [],
         *   //   "id": "my_id",
         *   //   "isServing": false,
         *   //   "kind": "my_kind",
         *   //   "startTime": "my_startTime",
         *   //   "status": "my_status"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dns.changes.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.clientOperationId
         * @param {string} params.managedZone
         * @param {string} params.project
         * @param {().Change} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Changes$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Changes$Create, options?: MethodOptions): GaxiosPromise<Schema$Change>;
        create(params: Params$Resource$Changes$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Changes$Create, options: MethodOptions | BodyResponseCallback<Schema$Change>, callback: BodyResponseCallback<Schema$Change>): void;
        create(params: Params$Resource$Changes$Create, callback: BodyResponseCallback<Schema$Change>): void;
        create(callback: BodyResponseCallback<Schema$Change>): void;
        /**
         * dns.changes.get
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dns.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dns = google.dns('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/ndev.clouddns.readonly',
         *       'https://www.googleapis.com/auth/ndev.clouddns.readwrite',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await dns.changes.get({
         *     changeId: 'placeholder-value',
         *
         *     clientOperationId: 'placeholder-value',
         *
         *     managedZone: 'placeholder-value',
         *
         *     project: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "additions": [],
         *   //   "deletions": [],
         *   //   "id": "my_id",
         *   //   "isServing": false,
         *   //   "kind": "my_kind",
         *   //   "startTime": "my_startTime",
         *   //   "status": "my_status"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dns.changes.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.changeId
         * @param {string=} params.clientOperationId
         * @param {string} params.managedZone
         * @param {string} params.project
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Changes$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Changes$Get, options?: MethodOptions): GaxiosPromise<Schema$Change>;
        get(params: Params$Resource$Changes$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Changes$Get, options: MethodOptions | BodyResponseCallback<Schema$Change>, callback: BodyResponseCallback<Schema$Change>): void;
        get(params: Params$Resource$Changes$Get, callback: BodyResponseCallback<Schema$Change>): void;
        get(callback: BodyResponseCallback<Schema$Change>): void;
        /**
         * dns.changes.list
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dns.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dns = google.dns('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/ndev.clouddns.readonly',
         *       'https://www.googleapis.com/auth/ndev.clouddns.readwrite',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await dns.changes.list({
         *     managedZone: 'placeholder-value',
         *
         *     maxResults: 'placeholder-value',
         *
         *     pageToken: 'placeholder-value',
         *
         *     project: 'placeholder-value',
         *
         *     sortBy: 'placeholder-value',
         *
         *     sortOrder: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "changes": [],
         *   //   "header": {},
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
         * @alias dns.changes.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.managedZone
         * @param {integer=} params.maxResults
         * @param {string=} params.pageToken
         * @param {string} params.project
         * @param {string=} params.sortBy
         * @param {string=} params.sortOrder
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Changes$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Changes$List, options?: MethodOptions): GaxiosPromise<Schema$ChangesListResponse>;
        list(params: Params$Resource$Changes$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Changes$List, options: MethodOptions | BodyResponseCallback<Schema$ChangesListResponse>, callback: BodyResponseCallback<Schema$ChangesListResponse>): void;
        list(params: Params$Resource$Changes$List, callback: BodyResponseCallback<Schema$ChangesListResponse>): void;
        list(callback: BodyResponseCallback<Schema$ChangesListResponse>): void;
    }
    export interface Params$Resource$Changes$Create extends StandardParameters {
        /**
         *
         */
        clientOperationId?: string;
        /**
         *
         */
        managedZone?: string;
        /**
         *
         */
        project?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Change;
    }
    export interface Params$Resource$Changes$Get extends StandardParameters {
        /**
         *
         */
        changeId?: string;
        /**
         *
         */
        clientOperationId?: string;
        /**
         *
         */
        managedZone?: string;
        /**
         *
         */
        project?: string;
    }
    export interface Params$Resource$Changes$List extends StandardParameters {
        /**
         *
         */
        managedZone?: string;
        /**
         *
         */
        maxResults?: number;
        /**
         *
         */
        pageToken?: string;
        /**
         *
         */
        project?: string;
        /**
         *
         */
        sortBy?: string;
        /**
         *
         */
        sortOrder?: string;
    }
    export class Resource$Dnskeys {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * dns.dnsKeys.get
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dns.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dns = google.dns('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/ndev.clouddns.readonly',
         *       'https://www.googleapis.com/auth/ndev.clouddns.readwrite',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await dns.dnsKeys.get({
         *     clientOperationId: 'placeholder-value',
         *
         *     digestType: 'placeholder-value',
         *
         *     dnsKeyId: 'placeholder-value',
         *
         *     managedZone: 'placeholder-value',
         *
         *     project: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "algorithm": "my_algorithm",
         *   //   "creationTime": "my_creationTime",
         *   //   "description": "my_description",
         *   //   "digests": [],
         *   //   "id": "my_id",
         *   //   "isActive": false,
         *   //   "keyLength": 0,
         *   //   "keyTag": 0,
         *   //   "kind": "my_kind",
         *   //   "publicKey": "my_publicKey",
         *   //   "type": "my_type"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dns.dnsKeys.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.clientOperationId
         * @param {string=} params.digestType
         * @param {string} params.dnsKeyId
         * @param {string} params.managedZone
         * @param {string} params.project
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Dnskeys$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Dnskeys$Get, options?: MethodOptions): GaxiosPromise<Schema$DnsKey>;
        get(params: Params$Resource$Dnskeys$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Dnskeys$Get, options: MethodOptions | BodyResponseCallback<Schema$DnsKey>, callback: BodyResponseCallback<Schema$DnsKey>): void;
        get(params: Params$Resource$Dnskeys$Get, callback: BodyResponseCallback<Schema$DnsKey>): void;
        get(callback: BodyResponseCallback<Schema$DnsKey>): void;
        /**
         * dns.dnsKeys.list
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dns.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dns = google.dns('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/ndev.clouddns.readonly',
         *       'https://www.googleapis.com/auth/ndev.clouddns.readwrite',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await dns.dnsKeys.list({
         *     digestType: 'placeholder-value',
         *
         *     managedZone: 'placeholder-value',
         *
         *     maxResults: 'placeholder-value',
         *
         *     pageToken: 'placeholder-value',
         *
         *     project: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "dnsKeys": [],
         *   //   "header": {},
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
         * @alias dns.dnsKeys.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.digestType
         * @param {string} params.managedZone
         * @param {integer=} params.maxResults
         * @param {string=} params.pageToken
         * @param {string} params.project
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Dnskeys$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Dnskeys$List, options?: MethodOptions): GaxiosPromise<Schema$DnsKeysListResponse>;
        list(params: Params$Resource$Dnskeys$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Dnskeys$List, options: MethodOptions | BodyResponseCallback<Schema$DnsKeysListResponse>, callback: BodyResponseCallback<Schema$DnsKeysListResponse>): void;
        list(params: Params$Resource$Dnskeys$List, callback: BodyResponseCallback<Schema$DnsKeysListResponse>): void;
        list(callback: BodyResponseCallback<Schema$DnsKeysListResponse>): void;
    }
    export interface Params$Resource$Dnskeys$Get extends StandardParameters {
        /**
         *
         */
        clientOperationId?: string;
        /**
         *
         */
        digestType?: string;
        /**
         *
         */
        dnsKeyId?: string;
        /**
         *
         */
        managedZone?: string;
        /**
         *
         */
        project?: string;
    }
    export interface Params$Resource$Dnskeys$List extends StandardParameters {
        /**
         *
         */
        digestType?: string;
        /**
         *
         */
        managedZone?: string;
        /**
         *
         */
        maxResults?: number;
        /**
         *
         */
        pageToken?: string;
        /**
         *
         */
        project?: string;
    }
    export class Resource$Managedzoneoperations {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * dns.managedZoneOperations.get
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dns.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dns = google.dns('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/ndev.clouddns.readonly',
         *       'https://www.googleapis.com/auth/ndev.clouddns.readwrite',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await dns.managedZoneOperations.get({
         *     clientOperationId: 'placeholder-value',
         *
         *     managedZone: 'placeholder-value',
         *
         *     operation: 'placeholder-value',
         *
         *     project: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "dnsKeyContext": {},
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "startTime": "my_startTime",
         *   //   "status": "my_status",
         *   //   "type": "my_type",
         *   //   "user": "my_user",
         *   //   "zoneContext": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dns.managedZoneOperations.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.clientOperationId
         * @param {string} params.managedZone
         * @param {string} params.operation
         * @param {string} params.project
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Managedzoneoperations$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Managedzoneoperations$Get, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        get(params: Params$Resource$Managedzoneoperations$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Managedzoneoperations$Get, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        get(params: Params$Resource$Managedzoneoperations$Get, callback: BodyResponseCallback<Schema$Operation>): void;
        get(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * dns.managedZoneOperations.list
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dns.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dns = google.dns('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/ndev.clouddns.readonly',
         *       'https://www.googleapis.com/auth/ndev.clouddns.readwrite',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await dns.managedZoneOperations.list({
         *     managedZone: 'placeholder-value',
         *
         *     maxResults: 'placeholder-value',
         *
         *     pageToken: 'placeholder-value',
         *
         *     project: 'placeholder-value',
         *
         *     sortBy: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "header": {},
         *   //   "kind": "my_kind",
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
         * @alias dns.managedZoneOperations.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.managedZone
         * @param {integer=} params.maxResults
         * @param {string=} params.pageToken
         * @param {string} params.project
         * @param {string=} params.sortBy
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Managedzoneoperations$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Managedzoneoperations$List, options?: MethodOptions): GaxiosPromise<Schema$ManagedZoneOperationsListResponse>;
        list(params: Params$Resource$Managedzoneoperations$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Managedzoneoperations$List, options: MethodOptions | BodyResponseCallback<Schema$ManagedZoneOperationsListResponse>, callback: BodyResponseCallback<Schema$ManagedZoneOperationsListResponse>): void;
        list(params: Params$Resource$Managedzoneoperations$List, callback: BodyResponseCallback<Schema$ManagedZoneOperationsListResponse>): void;
        list(callback: BodyResponseCallback<Schema$ManagedZoneOperationsListResponse>): void;
    }
    export interface Params$Resource$Managedzoneoperations$Get extends StandardParameters {
        /**
         *
         */
        clientOperationId?: string;
        /**
         *
         */
        managedZone?: string;
        /**
         *
         */
        operation?: string;
        /**
         *
         */
        project?: string;
    }
    export interface Params$Resource$Managedzoneoperations$List extends StandardParameters {
        /**
         *
         */
        managedZone?: string;
        /**
         *
         */
        maxResults?: number;
        /**
         *
         */
        pageToken?: string;
        /**
         *
         */
        project?: string;
        /**
         *
         */
        sortBy?: string;
    }
    export class Resource$Managedzones {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * dns.managedZones.create
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dns.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dns = google.dns('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/ndev.clouddns.readwrite',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await dns.managedZones.create({
         *     clientOperationId: 'placeholder-value',
         *
         *     project: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "creationTime": "my_creationTime",
         *       //   "description": "my_description",
         *       //   "dnsName": "my_dnsName",
         *       //   "dnssecConfig": {},
         *       //   "forwardingConfig": {},
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "labels": {},
         *       //   "name": "my_name",
         *       //   "nameServerSet": "my_nameServerSet",
         *       //   "nameServers": [],
         *       //   "peeringConfig": {},
         *       //   "privateVisibilityConfig": {},
         *       //   "reverseLookupConfig": {},
         *       //   "visibility": "my_visibility"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "creationTime": "my_creationTime",
         *   //   "description": "my_description",
         *   //   "dnsName": "my_dnsName",
         *   //   "dnssecConfig": {},
         *   //   "forwardingConfig": {},
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "labels": {},
         *   //   "name": "my_name",
         *   //   "nameServerSet": "my_nameServerSet",
         *   //   "nameServers": [],
         *   //   "peeringConfig": {},
         *   //   "privateVisibilityConfig": {},
         *   //   "reverseLookupConfig": {},
         *   //   "visibility": "my_visibility"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dns.managedZones.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.clientOperationId
         * @param {string} params.project
         * @param {().ManagedZone} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Managedzones$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Managedzones$Create, options?: MethodOptions): GaxiosPromise<Schema$ManagedZone>;
        create(params: Params$Resource$Managedzones$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Managedzones$Create, options: MethodOptions | BodyResponseCallback<Schema$ManagedZone>, callback: BodyResponseCallback<Schema$ManagedZone>): void;
        create(params: Params$Resource$Managedzones$Create, callback: BodyResponseCallback<Schema$ManagedZone>): void;
        create(callback: BodyResponseCallback<Schema$ManagedZone>): void;
        /**
         * dns.managedZones.delete
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dns.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dns = google.dns('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/ndev.clouddns.readwrite',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await dns.managedZones.delete({
         *     clientOperationId: 'placeholder-value',
         *
         *     managedZone: 'placeholder-value',
         *
         *     project: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dns.managedZones.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.clientOperationId
         * @param {string} params.managedZone
         * @param {string} params.project
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Managedzones$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Managedzones$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Managedzones$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Managedzones$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Managedzones$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * dns.managedZones.get
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dns.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dns = google.dns('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/ndev.clouddns.readonly',
         *       'https://www.googleapis.com/auth/ndev.clouddns.readwrite',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await dns.managedZones.get({
         *     clientOperationId: 'placeholder-value',
         *
         *     managedZone: 'placeholder-value',
         *
         *     project: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "creationTime": "my_creationTime",
         *   //   "description": "my_description",
         *   //   "dnsName": "my_dnsName",
         *   //   "dnssecConfig": {},
         *   //   "forwardingConfig": {},
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "labels": {},
         *   //   "name": "my_name",
         *   //   "nameServerSet": "my_nameServerSet",
         *   //   "nameServers": [],
         *   //   "peeringConfig": {},
         *   //   "privateVisibilityConfig": {},
         *   //   "reverseLookupConfig": {},
         *   //   "visibility": "my_visibility"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dns.managedZones.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.clientOperationId
         * @param {string} params.managedZone
         * @param {string} params.project
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Managedzones$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Managedzones$Get, options?: MethodOptions): GaxiosPromise<Schema$ManagedZone>;
        get(params: Params$Resource$Managedzones$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Managedzones$Get, options: MethodOptions | BodyResponseCallback<Schema$ManagedZone>, callback: BodyResponseCallback<Schema$ManagedZone>): void;
        get(params: Params$Resource$Managedzones$Get, callback: BodyResponseCallback<Schema$ManagedZone>): void;
        get(callback: BodyResponseCallback<Schema$ManagedZone>): void;
        /**
         * dns.managedZones.list
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dns.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dns = google.dns('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/ndev.clouddns.readonly',
         *       'https://www.googleapis.com/auth/ndev.clouddns.readwrite',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await dns.managedZones.list({
         *     dnsName: 'placeholder-value',
         *
         *     maxResults: 'placeholder-value',
         *
         *     pageToken: 'placeholder-value',
         *
         *     project: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "header": {},
         *   //   "kind": "my_kind",
         *   //   "managedZones": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dns.managedZones.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.dnsName
         * @param {integer=} params.maxResults
         * @param {string=} params.pageToken
         * @param {string} params.project
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Managedzones$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Managedzones$List, options?: MethodOptions): GaxiosPromise<Schema$ManagedZonesListResponse>;
        list(params: Params$Resource$Managedzones$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Managedzones$List, options: MethodOptions | BodyResponseCallback<Schema$ManagedZonesListResponse>, callback: BodyResponseCallback<Schema$ManagedZonesListResponse>): void;
        list(params: Params$Resource$Managedzones$List, callback: BodyResponseCallback<Schema$ManagedZonesListResponse>): void;
        list(callback: BodyResponseCallback<Schema$ManagedZonesListResponse>): void;
        /**
         * dns.managedZones.patch
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dns.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dns = google.dns('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/ndev.clouddns.readwrite',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await dns.managedZones.patch({
         *     clientOperationId: 'placeholder-value',
         *
         *     managedZone: 'placeholder-value',
         *
         *     project: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "creationTime": "my_creationTime",
         *       //   "description": "my_description",
         *       //   "dnsName": "my_dnsName",
         *       //   "dnssecConfig": {},
         *       //   "forwardingConfig": {},
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "labels": {},
         *       //   "name": "my_name",
         *       //   "nameServerSet": "my_nameServerSet",
         *       //   "nameServers": [],
         *       //   "peeringConfig": {},
         *       //   "privateVisibilityConfig": {},
         *       //   "reverseLookupConfig": {},
         *       //   "visibility": "my_visibility"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "dnsKeyContext": {},
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "startTime": "my_startTime",
         *   //   "status": "my_status",
         *   //   "type": "my_type",
         *   //   "user": "my_user",
         *   //   "zoneContext": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dns.managedZones.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.clientOperationId
         * @param {string} params.managedZone
         * @param {string} params.project
         * @param {().ManagedZone} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Managedzones$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Managedzones$Patch, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        patch(params: Params$Resource$Managedzones$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Managedzones$Patch, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        patch(params: Params$Resource$Managedzones$Patch, callback: BodyResponseCallback<Schema$Operation>): void;
        patch(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * dns.managedZones.update
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dns.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dns = google.dns('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/ndev.clouddns.readwrite',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await dns.managedZones.update({
         *     clientOperationId: 'placeholder-value',
         *
         *     managedZone: 'placeholder-value',
         *
         *     project: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "creationTime": "my_creationTime",
         *       //   "description": "my_description",
         *       //   "dnsName": "my_dnsName",
         *       //   "dnssecConfig": {},
         *       //   "forwardingConfig": {},
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "labels": {},
         *       //   "name": "my_name",
         *       //   "nameServerSet": "my_nameServerSet",
         *       //   "nameServers": [],
         *       //   "peeringConfig": {},
         *       //   "privateVisibilityConfig": {},
         *       //   "reverseLookupConfig": {},
         *       //   "visibility": "my_visibility"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "dnsKeyContext": {},
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "startTime": "my_startTime",
         *   //   "status": "my_status",
         *   //   "type": "my_type",
         *   //   "user": "my_user",
         *   //   "zoneContext": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dns.managedZones.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.clientOperationId
         * @param {string} params.managedZone
         * @param {string} params.project
         * @param {().ManagedZone} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Managedzones$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Managedzones$Update, options?: MethodOptions): GaxiosPromise<Schema$Operation>;
        update(params: Params$Resource$Managedzones$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Managedzones$Update, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        update(params: Params$Resource$Managedzones$Update, callback: BodyResponseCallback<Schema$Operation>): void;
        update(callback: BodyResponseCallback<Schema$Operation>): void;
    }
    export interface Params$Resource$Managedzones$Create extends StandardParameters {
        /**
         *
         */
        clientOperationId?: string;
        /**
         *
         */
        project?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ManagedZone;
    }
    export interface Params$Resource$Managedzones$Delete extends StandardParameters {
        /**
         *
         */
        clientOperationId?: string;
        /**
         *
         */
        managedZone?: string;
        /**
         *
         */
        project?: string;
    }
    export interface Params$Resource$Managedzones$Get extends StandardParameters {
        /**
         *
         */
        clientOperationId?: string;
        /**
         *
         */
        managedZone?: string;
        /**
         *
         */
        project?: string;
    }
    export interface Params$Resource$Managedzones$List extends StandardParameters {
        /**
         *
         */
        dnsName?: string;
        /**
         *
         */
        maxResults?: number;
        /**
         *
         */
        pageToken?: string;
        /**
         *
         */
        project?: string;
    }
    export interface Params$Resource$Managedzones$Patch extends StandardParameters {
        /**
         *
         */
        clientOperationId?: string;
        /**
         *
         */
        managedZone?: string;
        /**
         *
         */
        project?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ManagedZone;
    }
    export interface Params$Resource$Managedzones$Update extends StandardParameters {
        /**
         *
         */
        clientOperationId?: string;
        /**
         *
         */
        managedZone?: string;
        /**
         *
         */
        project?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ManagedZone;
    }
    export class Resource$Policies {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * dns.policies.create
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dns.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dns = google.dns('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/ndev.clouddns.readwrite',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await dns.policies.create({
         *     clientOperationId: 'placeholder-value',
         *
         *     project: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "alternativeNameServerConfig": {},
         *       //   "description": "my_description",
         *       //   "enableInboundForwarding": false,
         *       //   "enableLogging": false,
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "name": "my_name",
         *       //   "networks": []
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "alternativeNameServerConfig": {},
         *   //   "description": "my_description",
         *   //   "enableInboundForwarding": false,
         *   //   "enableLogging": false,
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "name": "my_name",
         *   //   "networks": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dns.policies.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.clientOperationId
         * @param {string} params.project
         * @param {().Policy} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Policies$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Policies$Create, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        create(params: Params$Resource$Policies$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Policies$Create, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        create(params: Params$Resource$Policies$Create, callback: BodyResponseCallback<Schema$Policy>): void;
        create(callback: BodyResponseCallback<Schema$Policy>): void;
        /**
         * dns.policies.delete
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dns.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dns = google.dns('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/ndev.clouddns.readwrite',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await dns.policies.delete({
         *     clientOperationId: 'placeholder-value',
         *
         *     policy: 'placeholder-value',
         *
         *     project: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dns.policies.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.clientOperationId
         * @param {string} params.policy
         * @param {string} params.project
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Policies$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Policies$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Policies$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Policies$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Policies$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * dns.policies.get
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dns.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dns = google.dns('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/ndev.clouddns.readonly',
         *       'https://www.googleapis.com/auth/ndev.clouddns.readwrite',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await dns.policies.get({
         *     clientOperationId: 'placeholder-value',
         *
         *     policy: 'placeholder-value',
         *
         *     project: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "alternativeNameServerConfig": {},
         *   //   "description": "my_description",
         *   //   "enableInboundForwarding": false,
         *   //   "enableLogging": false,
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "name": "my_name",
         *   //   "networks": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dns.policies.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.clientOperationId
         * @param {string} params.policy
         * @param {string} params.project
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Policies$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Policies$Get, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        get(params: Params$Resource$Policies$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Policies$Get, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        get(params: Params$Resource$Policies$Get, callback: BodyResponseCallback<Schema$Policy>): void;
        get(callback: BodyResponseCallback<Schema$Policy>): void;
        /**
         * dns.policies.list
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dns.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dns = google.dns('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/ndev.clouddns.readonly',
         *       'https://www.googleapis.com/auth/ndev.clouddns.readwrite',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await dns.policies.list({
         *     maxResults: 'placeholder-value',
         *
         *     pageToken: 'placeholder-value',
         *
         *     project: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "header": {},
         *   //   "kind": "my_kind",
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "policies": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dns.policies.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.maxResults
         * @param {string=} params.pageToken
         * @param {string} params.project
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Policies$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Policies$List, options?: MethodOptions): GaxiosPromise<Schema$PoliciesListResponse>;
        list(params: Params$Resource$Policies$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Policies$List, options: MethodOptions | BodyResponseCallback<Schema$PoliciesListResponse>, callback: BodyResponseCallback<Schema$PoliciesListResponse>): void;
        list(params: Params$Resource$Policies$List, callback: BodyResponseCallback<Schema$PoliciesListResponse>): void;
        list(callback: BodyResponseCallback<Schema$PoliciesListResponse>): void;
        /**
         * dns.policies.patch
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dns.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dns = google.dns('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/ndev.clouddns.readwrite',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await dns.policies.patch({
         *     clientOperationId: 'placeholder-value',
         *
         *     policy: 'placeholder-value',
         *
         *     project: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "alternativeNameServerConfig": {},
         *       //   "description": "my_description",
         *       //   "enableInboundForwarding": false,
         *       //   "enableLogging": false,
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "name": "my_name",
         *       //   "networks": []
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "header": {},
         *   //   "policy": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dns.policies.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.clientOperationId
         * @param {string} params.policy
         * @param {string} params.project
         * @param {().Policy} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Policies$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Policies$Patch, options?: MethodOptions): GaxiosPromise<Schema$PoliciesPatchResponse>;
        patch(params: Params$Resource$Policies$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Policies$Patch, options: MethodOptions | BodyResponseCallback<Schema$PoliciesPatchResponse>, callback: BodyResponseCallback<Schema$PoliciesPatchResponse>): void;
        patch(params: Params$Resource$Policies$Patch, callback: BodyResponseCallback<Schema$PoliciesPatchResponse>): void;
        patch(callback: BodyResponseCallback<Schema$PoliciesPatchResponse>): void;
        /**
         * dns.policies.update
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dns.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dns = google.dns('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/ndev.clouddns.readwrite',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await dns.policies.update({
         *     clientOperationId: 'placeholder-value',
         *
         *     policy: 'placeholder-value',
         *
         *     project: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "alternativeNameServerConfig": {},
         *       //   "description": "my_description",
         *       //   "enableInboundForwarding": false,
         *       //   "enableLogging": false,
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "name": "my_name",
         *       //   "networks": []
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "header": {},
         *   //   "policy": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dns.policies.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.clientOperationId
         * @param {string} params.policy
         * @param {string} params.project
         * @param {().Policy} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Policies$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Policies$Update, options?: MethodOptions): GaxiosPromise<Schema$PoliciesUpdateResponse>;
        update(params: Params$Resource$Policies$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Policies$Update, options: MethodOptions | BodyResponseCallback<Schema$PoliciesUpdateResponse>, callback: BodyResponseCallback<Schema$PoliciesUpdateResponse>): void;
        update(params: Params$Resource$Policies$Update, callback: BodyResponseCallback<Schema$PoliciesUpdateResponse>): void;
        update(callback: BodyResponseCallback<Schema$PoliciesUpdateResponse>): void;
    }
    export interface Params$Resource$Policies$Create extends StandardParameters {
        /**
         *
         */
        clientOperationId?: string;
        /**
         *
         */
        project?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Policy;
    }
    export interface Params$Resource$Policies$Delete extends StandardParameters {
        /**
         *
         */
        clientOperationId?: string;
        /**
         *
         */
        policy?: string;
        /**
         *
         */
        project?: string;
    }
    export interface Params$Resource$Policies$Get extends StandardParameters {
        /**
         *
         */
        clientOperationId?: string;
        /**
         *
         */
        policy?: string;
        /**
         *
         */
        project?: string;
    }
    export interface Params$Resource$Policies$List extends StandardParameters {
        /**
         *
         */
        maxResults?: number;
        /**
         *
         */
        pageToken?: string;
        /**
         *
         */
        project?: string;
    }
    export interface Params$Resource$Policies$Patch extends StandardParameters {
        /**
         *
         */
        clientOperationId?: string;
        /**
         *
         */
        policy?: string;
        /**
         *
         */
        project?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Policy;
    }
    export interface Params$Resource$Policies$Update extends StandardParameters {
        /**
         *
         */
        clientOperationId?: string;
        /**
         *
         */
        policy?: string;
        /**
         *
         */
        project?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Policy;
    }
    export class Resource$Projects {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * dns.projects.get
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dns.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dns = google.dns('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/ndev.clouddns.readonly',
         *       'https://www.googleapis.com/auth/ndev.clouddns.readwrite',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await dns.projects.get({
         *     clientOperationId: 'placeholder-value',
         *
         *     project: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "number": "my_number",
         *   //   "quota": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dns.projects.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.clientOperationId
         * @param {string} params.project
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Get, options?: MethodOptions): GaxiosPromise<Schema$Project>;
        get(params: Params$Resource$Projects$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Get, options: MethodOptions | BodyResponseCallback<Schema$Project>, callback: BodyResponseCallback<Schema$Project>): void;
        get(params: Params$Resource$Projects$Get, callback: BodyResponseCallback<Schema$Project>): void;
        get(callback: BodyResponseCallback<Schema$Project>): void;
    }
    export interface Params$Resource$Projects$Get extends StandardParameters {
        /**
         *
         */
        clientOperationId?: string;
        /**
         *
         */
        project?: string;
    }
    export class Resource$Resourcerecordsets {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * dns.resourceRecordSets.list
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/dns.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const dns = google.dns('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/ndev.clouddns.readonly',
         *       'https://www.googleapis.com/auth/ndev.clouddns.readwrite',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await dns.resourceRecordSets.list({
         *     managedZone: 'placeholder-value',
         *
         *     maxResults: 'placeholder-value',
         *
         *     name: 'placeholder-value',
         *
         *     pageToken: 'placeholder-value',
         *
         *     project: 'placeholder-value',
         *
         *     type: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "header": {},
         *   //   "kind": "my_kind",
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "rrsets": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias dns.resourceRecordSets.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.managedZone
         * @param {integer=} params.maxResults
         * @param {string=} params.name
         * @param {string=} params.pageToken
         * @param {string} params.project
         * @param {string=} params.type
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Resourcerecordsets$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Resourcerecordsets$List, options?: MethodOptions): GaxiosPromise<Schema$ResourceRecordSetsListResponse>;
        list(params: Params$Resource$Resourcerecordsets$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Resourcerecordsets$List, options: MethodOptions | BodyResponseCallback<Schema$ResourceRecordSetsListResponse>, callback: BodyResponseCallback<Schema$ResourceRecordSetsListResponse>): void;
        list(params: Params$Resource$Resourcerecordsets$List, callback: BodyResponseCallback<Schema$ResourceRecordSetsListResponse>): void;
        list(callback: BodyResponseCallback<Schema$ResourceRecordSetsListResponse>): void;
    }
    export interface Params$Resource$Resourcerecordsets$List extends StandardParameters {
        /**
         *
         */
        managedZone?: string;
        /**
         *
         */
        maxResults?: number;
        /**
         *
         */
        name?: string;
        /**
         *
         */
        pageToken?: string;
        /**
         *
         */
        project?: string;
        /**
         *
         */
        type?: string;
    }
    export {};
}
