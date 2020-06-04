"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.dns_v1 = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-irregular-whitespace */
const googleapis_common_1 = require("googleapis-common");
var dns_v1;
(function (dns_v1) {
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
    class Dns {
        constructor(options, google) {
            this.context = {
                _options: options || {},
                google,
            };
            this.changes = new Resource$Changes(this.context);
            this.dnsKeys = new Resource$Dnskeys(this.context);
            this.managedZoneOperations = new Resource$Managedzoneoperations(this.context);
            this.managedZones = new Resource$Managedzones(this.context);
            this.policies = new Resource$Policies(this.context);
            this.projects = new Resource$Projects(this.context);
            this.resourceRecordSets = new Resource$Resourcerecordsets(this.context);
        }
    }
    dns_v1.Dns = Dns;
    class Resource$Changes {
        constructor(context) {
            this.context = context;
        }
        create(paramsOrCallback, optionsOrCallback, callback) {
            let params = (paramsOrCallback || {});
            let options = (optionsOrCallback || {});
            if (typeof paramsOrCallback === 'function') {
                callback = paramsOrCallback;
                params = {};
                options = {};
            }
            if (typeof optionsOrCallback === 'function') {
                callback = optionsOrCallback;
                options = {};
            }
            const rootUrl = options.rootUrl || 'https://dns.googleapis.com/';
            const parameters = {
                options: Object.assign({
                    url: (rootUrl +
                        '/dns/v1/projects/{project}/managedZones/{managedZone}/changes').replace(/([^:]\/)\/+/g, '$1'),
                    method: 'POST',
                }, options),
                params,
                requiredParams: ['project', 'managedZone'],
                pathParams: ['managedZone', 'project'],
                context: this.context,
            };
            if (callback) {
                googleapis_common_1.createAPIRequest(parameters, callback);
            }
            else {
                return googleapis_common_1.createAPIRequest(parameters);
            }
        }
        get(paramsOrCallback, optionsOrCallback, callback) {
            let params = (paramsOrCallback || {});
            let options = (optionsOrCallback || {});
            if (typeof paramsOrCallback === 'function') {
                callback = paramsOrCallback;
                params = {};
                options = {};
            }
            if (typeof optionsOrCallback === 'function') {
                callback = optionsOrCallback;
                options = {};
            }
            const rootUrl = options.rootUrl || 'https://dns.googleapis.com/';
            const parameters = {
                options: Object.assign({
                    url: (rootUrl +
                        '/dns/v1/projects/{project}/managedZones/{managedZone}/changes/{changeId}').replace(/([^:]\/)\/+/g, '$1'),
                    method: 'GET',
                }, options),
                params,
                requiredParams: ['project', 'managedZone', 'changeId'],
                pathParams: ['changeId', 'managedZone', 'project'],
                context: this.context,
            };
            if (callback) {
                googleapis_common_1.createAPIRequest(parameters, callback);
            }
            else {
                return googleapis_common_1.createAPIRequest(parameters);
            }
        }
        list(paramsOrCallback, optionsOrCallback, callback) {
            let params = (paramsOrCallback || {});
            let options = (optionsOrCallback || {});
            if (typeof paramsOrCallback === 'function') {
                callback = paramsOrCallback;
                params = {};
                options = {};
            }
            if (typeof optionsOrCallback === 'function') {
                callback = optionsOrCallback;
                options = {};
            }
            const rootUrl = options.rootUrl || 'https://dns.googleapis.com/';
            const parameters = {
                options: Object.assign({
                    url: (rootUrl +
                        '/dns/v1/projects/{project}/managedZones/{managedZone}/changes').replace(/([^:]\/)\/+/g, '$1'),
                    method: 'GET',
                }, options),
                params,
                requiredParams: ['project', 'managedZone'],
                pathParams: ['managedZone', 'project'],
                context: this.context,
            };
            if (callback) {
                googleapis_common_1.createAPIRequest(parameters, callback);
            }
            else {
                return googleapis_common_1.createAPIRequest(parameters);
            }
        }
    }
    dns_v1.Resource$Changes = Resource$Changes;
    class Resource$Dnskeys {
        constructor(context) {
            this.context = context;
        }
        get(paramsOrCallback, optionsOrCallback, callback) {
            let params = (paramsOrCallback || {});
            let options = (optionsOrCallback || {});
            if (typeof paramsOrCallback === 'function') {
                callback = paramsOrCallback;
                params = {};
                options = {};
            }
            if (typeof optionsOrCallback === 'function') {
                callback = optionsOrCallback;
                options = {};
            }
            const rootUrl = options.rootUrl || 'https://dns.googleapis.com/';
            const parameters = {
                options: Object.assign({
                    url: (rootUrl +
                        '/dns/v1/projects/{project}/managedZones/{managedZone}/dnsKeys/{dnsKeyId}').replace(/([^:]\/)\/+/g, '$1'),
                    method: 'GET',
                }, options),
                params,
                requiredParams: ['project', 'managedZone', 'dnsKeyId'],
                pathParams: ['dnsKeyId', 'managedZone', 'project'],
                context: this.context,
            };
            if (callback) {
                googleapis_common_1.createAPIRequest(parameters, callback);
            }
            else {
                return googleapis_common_1.createAPIRequest(parameters);
            }
        }
        list(paramsOrCallback, optionsOrCallback, callback) {
            let params = (paramsOrCallback || {});
            let options = (optionsOrCallback || {});
            if (typeof paramsOrCallback === 'function') {
                callback = paramsOrCallback;
                params = {};
                options = {};
            }
            if (typeof optionsOrCallback === 'function') {
                callback = optionsOrCallback;
                options = {};
            }
            const rootUrl = options.rootUrl || 'https://dns.googleapis.com/';
            const parameters = {
                options: Object.assign({
                    url: (rootUrl +
                        '/dns/v1/projects/{project}/managedZones/{managedZone}/dnsKeys').replace(/([^:]\/)\/+/g, '$1'),
                    method: 'GET',
                }, options),
                params,
                requiredParams: ['project', 'managedZone'],
                pathParams: ['managedZone', 'project'],
                context: this.context,
            };
            if (callback) {
                googleapis_common_1.createAPIRequest(parameters, callback);
            }
            else {
                return googleapis_common_1.createAPIRequest(parameters);
            }
        }
    }
    dns_v1.Resource$Dnskeys = Resource$Dnskeys;
    class Resource$Managedzoneoperations {
        constructor(context) {
            this.context = context;
        }
        get(paramsOrCallback, optionsOrCallback, callback) {
            let params = (paramsOrCallback ||
                {});
            let options = (optionsOrCallback || {});
            if (typeof paramsOrCallback === 'function') {
                callback = paramsOrCallback;
                params = {};
                options = {};
            }
            if (typeof optionsOrCallback === 'function') {
                callback = optionsOrCallback;
                options = {};
            }
            const rootUrl = options.rootUrl || 'https://dns.googleapis.com/';
            const parameters = {
                options: Object.assign({
                    url: (rootUrl +
                        '/dns/v1/projects/{project}/managedZones/{managedZone}/operations/{operation}').replace(/([^:]\/)\/+/g, '$1'),
                    method: 'GET',
                }, options),
                params,
                requiredParams: ['project', 'managedZone', 'operation'],
                pathParams: ['managedZone', 'operation', 'project'],
                context: this.context,
            };
            if (callback) {
                googleapis_common_1.createAPIRequest(parameters, callback);
            }
            else {
                return googleapis_common_1.createAPIRequest(parameters);
            }
        }
        list(paramsOrCallback, optionsOrCallback, callback) {
            let params = (paramsOrCallback ||
                {});
            let options = (optionsOrCallback || {});
            if (typeof paramsOrCallback === 'function') {
                callback = paramsOrCallback;
                params = {};
                options = {};
            }
            if (typeof optionsOrCallback === 'function') {
                callback = optionsOrCallback;
                options = {};
            }
            const rootUrl = options.rootUrl || 'https://dns.googleapis.com/';
            const parameters = {
                options: Object.assign({
                    url: (rootUrl +
                        '/dns/v1/projects/{project}/managedZones/{managedZone}/operations').replace(/([^:]\/)\/+/g, '$1'),
                    method: 'GET',
                }, options),
                params,
                requiredParams: ['project', 'managedZone'],
                pathParams: ['managedZone', 'project'],
                context: this.context,
            };
            if (callback) {
                googleapis_common_1.createAPIRequest(parameters, callback);
            }
            else {
                return googleapis_common_1.createAPIRequest(parameters);
            }
        }
    }
    dns_v1.Resource$Managedzoneoperations = Resource$Managedzoneoperations;
    class Resource$Managedzones {
        constructor(context) {
            this.context = context;
        }
        create(paramsOrCallback, optionsOrCallback, callback) {
            let params = (paramsOrCallback ||
                {});
            let options = (optionsOrCallback || {});
            if (typeof paramsOrCallback === 'function') {
                callback = paramsOrCallback;
                params = {};
                options = {};
            }
            if (typeof optionsOrCallback === 'function') {
                callback = optionsOrCallback;
                options = {};
            }
            const rootUrl = options.rootUrl || 'https://dns.googleapis.com/';
            const parameters = {
                options: Object.assign({
                    url: (rootUrl + '/dns/v1/projects/{project}/managedZones').replace(/([^:]\/)\/+/g, '$1'),
                    method: 'POST',
                }, options),
                params,
                requiredParams: ['project'],
                pathParams: ['project'],
                context: this.context,
            };
            if (callback) {
                googleapis_common_1.createAPIRequest(parameters, callback);
            }
            else {
                return googleapis_common_1.createAPIRequest(parameters);
            }
        }
        delete(paramsOrCallback, optionsOrCallback, callback) {
            let params = (paramsOrCallback ||
                {});
            let options = (optionsOrCallback || {});
            if (typeof paramsOrCallback === 'function') {
                callback = paramsOrCallback;
                params = {};
                options = {};
            }
            if (typeof optionsOrCallback === 'function') {
                callback = optionsOrCallback;
                options = {};
            }
            const rootUrl = options.rootUrl || 'https://dns.googleapis.com/';
            const parameters = {
                options: Object.assign({
                    url: (rootUrl + '/dns/v1/projects/{project}/managedZones/{managedZone}').replace(/([^:]\/)\/+/g, '$1'),
                    method: 'DELETE',
                }, options),
                params,
                requiredParams: ['project', 'managedZone'],
                pathParams: ['managedZone', 'project'],
                context: this.context,
            };
            if (callback) {
                googleapis_common_1.createAPIRequest(parameters, callback);
            }
            else {
                return googleapis_common_1.createAPIRequest(parameters);
            }
        }
        get(paramsOrCallback, optionsOrCallback, callback) {
            let params = (paramsOrCallback || {});
            let options = (optionsOrCallback || {});
            if (typeof paramsOrCallback === 'function') {
                callback = paramsOrCallback;
                params = {};
                options = {};
            }
            if (typeof optionsOrCallback === 'function') {
                callback = optionsOrCallback;
                options = {};
            }
            const rootUrl = options.rootUrl || 'https://dns.googleapis.com/';
            const parameters = {
                options: Object.assign({
                    url: (rootUrl + '/dns/v1/projects/{project}/managedZones/{managedZone}').replace(/([^:]\/)\/+/g, '$1'),
                    method: 'GET',
                }, options),
                params,
                requiredParams: ['project', 'managedZone'],
                pathParams: ['managedZone', 'project'],
                context: this.context,
            };
            if (callback) {
                googleapis_common_1.createAPIRequest(parameters, callback);
            }
            else {
                return googleapis_common_1.createAPIRequest(parameters);
            }
        }
        list(paramsOrCallback, optionsOrCallback, callback) {
            let params = (paramsOrCallback ||
                {});
            let options = (optionsOrCallback || {});
            if (typeof paramsOrCallback === 'function') {
                callback = paramsOrCallback;
                params = {};
                options = {};
            }
            if (typeof optionsOrCallback === 'function') {
                callback = optionsOrCallback;
                options = {};
            }
            const rootUrl = options.rootUrl || 'https://dns.googleapis.com/';
            const parameters = {
                options: Object.assign({
                    url: (rootUrl + '/dns/v1/projects/{project}/managedZones').replace(/([^:]\/)\/+/g, '$1'),
                    method: 'GET',
                }, options),
                params,
                requiredParams: ['project'],
                pathParams: ['project'],
                context: this.context,
            };
            if (callback) {
                googleapis_common_1.createAPIRequest(parameters, callback);
            }
            else {
                return googleapis_common_1.createAPIRequest(parameters);
            }
        }
        patch(paramsOrCallback, optionsOrCallback, callback) {
            let params = (paramsOrCallback ||
                {});
            let options = (optionsOrCallback || {});
            if (typeof paramsOrCallback === 'function') {
                callback = paramsOrCallback;
                params = {};
                options = {};
            }
            if (typeof optionsOrCallback === 'function') {
                callback = optionsOrCallback;
                options = {};
            }
            const rootUrl = options.rootUrl || 'https://dns.googleapis.com/';
            const parameters = {
                options: Object.assign({
                    url: (rootUrl + '/dns/v1/projects/{project}/managedZones/{managedZone}').replace(/([^:]\/)\/+/g, '$1'),
                    method: 'PATCH',
                }, options),
                params,
                requiredParams: ['project', 'managedZone'],
                pathParams: ['managedZone', 'project'],
                context: this.context,
            };
            if (callback) {
                googleapis_common_1.createAPIRequest(parameters, callback);
            }
            else {
                return googleapis_common_1.createAPIRequest(parameters);
            }
        }
        update(paramsOrCallback, optionsOrCallback, callback) {
            let params = (paramsOrCallback ||
                {});
            let options = (optionsOrCallback || {});
            if (typeof paramsOrCallback === 'function') {
                callback = paramsOrCallback;
                params = {};
                options = {};
            }
            if (typeof optionsOrCallback === 'function') {
                callback = optionsOrCallback;
                options = {};
            }
            const rootUrl = options.rootUrl || 'https://dns.googleapis.com/';
            const parameters = {
                options: Object.assign({
                    url: (rootUrl + '/dns/v1/projects/{project}/managedZones/{managedZone}').replace(/([^:]\/)\/+/g, '$1'),
                    method: 'PUT',
                }, options),
                params,
                requiredParams: ['project', 'managedZone'],
                pathParams: ['managedZone', 'project'],
                context: this.context,
            };
            if (callback) {
                googleapis_common_1.createAPIRequest(parameters, callback);
            }
            else {
                return googleapis_common_1.createAPIRequest(parameters);
            }
        }
    }
    dns_v1.Resource$Managedzones = Resource$Managedzones;
    class Resource$Policies {
        constructor(context) {
            this.context = context;
        }
        create(paramsOrCallback, optionsOrCallback, callback) {
            let params = (paramsOrCallback || {});
            let options = (optionsOrCallback || {});
            if (typeof paramsOrCallback === 'function') {
                callback = paramsOrCallback;
                params = {};
                options = {};
            }
            if (typeof optionsOrCallback === 'function') {
                callback = optionsOrCallback;
                options = {};
            }
            const rootUrl = options.rootUrl || 'https://dns.googleapis.com/';
            const parameters = {
                options: Object.assign({
                    url: (rootUrl + '/dns/v1/projects/{project}/policies').replace(/([^:]\/)\/+/g, '$1'),
                    method: 'POST',
                }, options),
                params,
                requiredParams: ['project'],
                pathParams: ['project'],
                context: this.context,
            };
            if (callback) {
                googleapis_common_1.createAPIRequest(parameters, callback);
            }
            else {
                return googleapis_common_1.createAPIRequest(parameters);
            }
        }
        delete(paramsOrCallback, optionsOrCallback, callback) {
            let params = (paramsOrCallback || {});
            let options = (optionsOrCallback || {});
            if (typeof paramsOrCallback === 'function') {
                callback = paramsOrCallback;
                params = {};
                options = {};
            }
            if (typeof optionsOrCallback === 'function') {
                callback = optionsOrCallback;
                options = {};
            }
            const rootUrl = options.rootUrl || 'https://dns.googleapis.com/';
            const parameters = {
                options: Object.assign({
                    url: (rootUrl + '/dns/v1/projects/{project}/policies/{policy}').replace(/([^:]\/)\/+/g, '$1'),
                    method: 'DELETE',
                }, options),
                params,
                requiredParams: ['project', 'policy'],
                pathParams: ['policy', 'project'],
                context: this.context,
            };
            if (callback) {
                googleapis_common_1.createAPIRequest(parameters, callback);
            }
            else {
                return googleapis_common_1.createAPIRequest(parameters);
            }
        }
        get(paramsOrCallback, optionsOrCallback, callback) {
            let params = (paramsOrCallback || {});
            let options = (optionsOrCallback || {});
            if (typeof paramsOrCallback === 'function') {
                callback = paramsOrCallback;
                params = {};
                options = {};
            }
            if (typeof optionsOrCallback === 'function') {
                callback = optionsOrCallback;
                options = {};
            }
            const rootUrl = options.rootUrl || 'https://dns.googleapis.com/';
            const parameters = {
                options: Object.assign({
                    url: (rootUrl + '/dns/v1/projects/{project}/policies/{policy}').replace(/([^:]\/)\/+/g, '$1'),
                    method: 'GET',
                }, options),
                params,
                requiredParams: ['project', 'policy'],
                pathParams: ['policy', 'project'],
                context: this.context,
            };
            if (callback) {
                googleapis_common_1.createAPIRequest(parameters, callback);
            }
            else {
                return googleapis_common_1.createAPIRequest(parameters);
            }
        }
        list(paramsOrCallback, optionsOrCallback, callback) {
            let params = (paramsOrCallback || {});
            let options = (optionsOrCallback || {});
            if (typeof paramsOrCallback === 'function') {
                callback = paramsOrCallback;
                params = {};
                options = {};
            }
            if (typeof optionsOrCallback === 'function') {
                callback = optionsOrCallback;
                options = {};
            }
            const rootUrl = options.rootUrl || 'https://dns.googleapis.com/';
            const parameters = {
                options: Object.assign({
                    url: (rootUrl + '/dns/v1/projects/{project}/policies').replace(/([^:]\/)\/+/g, '$1'),
                    method: 'GET',
                }, options),
                params,
                requiredParams: ['project'],
                pathParams: ['project'],
                context: this.context,
            };
            if (callback) {
                googleapis_common_1.createAPIRequest(parameters, callback);
            }
            else {
                return googleapis_common_1.createAPIRequest(parameters);
            }
        }
        patch(paramsOrCallback, optionsOrCallback, callback) {
            let params = (paramsOrCallback || {});
            let options = (optionsOrCallback || {});
            if (typeof paramsOrCallback === 'function') {
                callback = paramsOrCallback;
                params = {};
                options = {};
            }
            if (typeof optionsOrCallback === 'function') {
                callback = optionsOrCallback;
                options = {};
            }
            const rootUrl = options.rootUrl || 'https://dns.googleapis.com/';
            const parameters = {
                options: Object.assign({
                    url: (rootUrl + '/dns/v1/projects/{project}/policies/{policy}').replace(/([^:]\/)\/+/g, '$1'),
                    method: 'PATCH',
                }, options),
                params,
                requiredParams: ['project', 'policy'],
                pathParams: ['policy', 'project'],
                context: this.context,
            };
            if (callback) {
                googleapis_common_1.createAPIRequest(parameters, callback);
            }
            else {
                return googleapis_common_1.createAPIRequest(parameters);
            }
        }
        update(paramsOrCallback, optionsOrCallback, callback) {
            let params = (paramsOrCallback || {});
            let options = (optionsOrCallback || {});
            if (typeof paramsOrCallback === 'function') {
                callback = paramsOrCallback;
                params = {};
                options = {};
            }
            if (typeof optionsOrCallback === 'function') {
                callback = optionsOrCallback;
                options = {};
            }
            const rootUrl = options.rootUrl || 'https://dns.googleapis.com/';
            const parameters = {
                options: Object.assign({
                    url: (rootUrl + '/dns/v1/projects/{project}/policies/{policy}').replace(/([^:]\/)\/+/g, '$1'),
                    method: 'PUT',
                }, options),
                params,
                requiredParams: ['project', 'policy'],
                pathParams: ['policy', 'project'],
                context: this.context,
            };
            if (callback) {
                googleapis_common_1.createAPIRequest(parameters, callback);
            }
            else {
                return googleapis_common_1.createAPIRequest(parameters);
            }
        }
    }
    dns_v1.Resource$Policies = Resource$Policies;
    class Resource$Projects {
        constructor(context) {
            this.context = context;
        }
        get(paramsOrCallback, optionsOrCallback, callback) {
            let params = (paramsOrCallback || {});
            let options = (optionsOrCallback || {});
            if (typeof paramsOrCallback === 'function') {
                callback = paramsOrCallback;
                params = {};
                options = {};
            }
            if (typeof optionsOrCallback === 'function') {
                callback = optionsOrCallback;
                options = {};
            }
            const rootUrl = options.rootUrl || 'https://dns.googleapis.com/';
            const parameters = {
                options: Object.assign({
                    url: (rootUrl + '/dns/v1/projects/{project}').replace(/([^:]\/)\/+/g, '$1'),
                    method: 'GET',
                }, options),
                params,
                requiredParams: ['project'],
                pathParams: ['project'],
                context: this.context,
            };
            if (callback) {
                googleapis_common_1.createAPIRequest(parameters, callback);
            }
            else {
                return googleapis_common_1.createAPIRequest(parameters);
            }
        }
    }
    dns_v1.Resource$Projects = Resource$Projects;
    class Resource$Resourcerecordsets {
        constructor(context) {
            this.context = context;
        }
        list(paramsOrCallback, optionsOrCallback, callback) {
            let params = (paramsOrCallback ||
                {});
            let options = (optionsOrCallback || {});
            if (typeof paramsOrCallback === 'function') {
                callback = paramsOrCallback;
                params = {};
                options = {};
            }
            if (typeof optionsOrCallback === 'function') {
                callback = optionsOrCallback;
                options = {};
            }
            const rootUrl = options.rootUrl || 'https://dns.googleapis.com/';
            const parameters = {
                options: Object.assign({
                    url: (rootUrl +
                        '/dns/v1/projects/{project}/managedZones/{managedZone}/rrsets').replace(/([^:]\/)\/+/g, '$1'),
                    method: 'GET',
                }, options),
                params,
                requiredParams: ['project', 'managedZone'],
                pathParams: ['managedZone', 'project'],
                context: this.context,
            };
            if (callback) {
                googleapis_common_1.createAPIRequest(parameters, callback);
            }
            else {
                return googleapis_common_1.createAPIRequest(parameters);
            }
        }
    }
    dns_v1.Resource$Resourcerecordsets = Resource$Resourcerecordsets;
})(dns_v1 = exports.dns_v1 || (exports.dns_v1 = {}));
//# sourceMappingURL=v1.js.map