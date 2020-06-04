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
exports.auth = exports.secretmanager = exports.VERSIONS = void 0;
/*! THIS FILE IS AUTO-GENERATED */
const googleapis_common_1 = require("googleapis-common");
const v1_1 = require("./v1");
const v1beta1_1 = require("./v1beta1");
exports.VERSIONS = {
    v1: v1_1.secretmanager_v1.Secretmanager,
    v1beta1: v1beta1_1.secretmanager_v1beta1.Secretmanager,
};
function secretmanager(versionOrOptions) {
    return googleapis_common_1.getAPI('secretmanager', versionOrOptions, exports.VERSIONS, this);
}
exports.secretmanager = secretmanager;
const auth = new googleapis_common_1.AuthPlus();
exports.auth = auth;
//# sourceMappingURL=index.js.map