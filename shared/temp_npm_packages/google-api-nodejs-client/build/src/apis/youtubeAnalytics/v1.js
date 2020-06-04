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
exports.youtubeAnalytics_v1 = void 0;
var youtubeAnalytics_v1;
(function (youtubeAnalytics_v1) {
    /**
     * YouTube Analytics API
     *
     * Retrieves your YouTube Analytics data.
     *
     * @example
     * const {google} = require('googleapis');
     * const youtubeAnalytics = google.youtubeAnalytics('v1');
     *
     * @namespace youtubeAnalytics
     * @type {Function}
     * @version v1
     * @variation v1
     * @param {object=} options Options for Youtubeanalytics
     */
    class Youtubeanalytics {
        constructor(options, google) {
            this.context = {
                _options: options || {},
                google,
            };
        }
    }
    youtubeAnalytics_v1.Youtubeanalytics = Youtubeanalytics;
})(youtubeAnalytics_v1 = exports.youtubeAnalytics_v1 || (exports.youtubeAnalytics_v1 = {}));
//# sourceMappingURL=v1.js.map