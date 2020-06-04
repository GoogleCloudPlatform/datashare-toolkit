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
exports.policytroubleshooter_v1 = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-irregular-whitespace */
const googleapis_common_1 = require("googleapis-common");
var policytroubleshooter_v1;
(function (policytroubleshooter_v1) {
    /**
     * Policy Troubleshooter API
     *
     *
     *
     * @example
     * const {google} = require('googleapis');
     * const policytroubleshooter = google.policytroubleshooter('v1');
     *
     * @namespace policytroubleshooter
     * @type {Function}
     * @version v1
     * @variation v1
     * @param {object=} options Options for Policytroubleshooter
     */
    class Policytroubleshooter {
        constructor(options, google) {
            this.context = {
                _options: options || {},
                google,
            };
            this.iam = new Resource$Iam(this.context);
        }
    }
    policytroubleshooter_v1.Policytroubleshooter = Policytroubleshooter;
    class Resource$Iam {
        constructor(context) {
            this.context = context;
        }
        troubleshoot(paramsOrCallback, optionsOrCallback, callback) {
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
            const rootUrl = options.rootUrl || 'https://policytroubleshooter.googleapis.com/';
            const parameters = {
                options: Object.assign({
                    url: (rootUrl + '/v1/iam:troubleshoot').replace(/([^:]\/)\/+/g, '$1'),
                    method: 'POST',
                }, options),
                params,
                requiredParams: [],
                pathParams: [],
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
    policytroubleshooter_v1.Resource$Iam = Resource$Iam;
})(policytroubleshooter_v1 = exports.policytroubleshooter_v1 || (exports.policytroubleshooter_v1 = {}));
//# sourceMappingURL=v1.js.map