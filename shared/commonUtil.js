/**
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
const YAML = require('yaml');

/**
 * @param  {} str
 */
function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

/**
 * @param  {} str
 */
function isYamlString(str) {
    try {
        YAML.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


/**
 * @param  {} fileName
 * @param  {} acceptable
 * @param  {} ignoreStartsWith
 * Determine whether a file suffix is recognized for ingestion.
 */
function isExtensionSupported(fileName, acceptable) {
    const parts = fileName.split('.');
    const ext = parts[parts.length - 1];
    return acceptable.includes(ext.toLowerCase());
}

module.exports = {
    isJsonString,
    isYamlString,
    isExtensionSupported
};