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
const path = require("path");

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
 * @param  {} str
 */
function parseYaml(str) {
    return YAML.parse(str);
}

/**
 * @param  {} fileName
 * @param  {} acceptable
 * Determine whether a file suffix is recognized for ingestion.
 */
function isExtensionSupported(fileName, acceptable) {
    const ext = path.extname(fileName).substring(1);
    return acceptable.includes(ext.toLowerCase());
}

/**
 * @param  {} url
 * Extract the hostname from a url
 */
function extractHostname(url) {
    var hostname;
    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }
    hostname = hostname.split(':')[0];
    hostname = hostname.split('?')[0];
    return hostname;
}

/**
 * @param  {} wildcard
 * @param  {} str
 */
function wildTest(wildcard, str) {
    let w = wildcard.replace(/[.+^${}()|[\]\\]/g, '\\$&'); // regexp escape 
    const re = new RegExp(`^${w.replace(/\*/g, '.*').replace(/\?/g, '.')}$`, 'i');
    return re.test(str); // remove last 'i' above to have case sensitive
}

module.exports = {
    isJsonString,
    isYamlString,
    parseYaml,
    isExtensionSupported,
    extractHostname,
    wildTest
};