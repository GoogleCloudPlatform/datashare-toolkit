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

/**
 * Returns bool indicating if public access is enabled for the source.
 * @param  {} view
 */
function isPublicAccessEnabled(view) {
    let source = view.source;
    if (source.hasOwnProperty('publicAccess')) {
        let publicAccess = source.publicAccess;
        if (publicAccess.enabled && publicAccess.queryFilter && publicAccess.queryFilter.trim().length > 0) {
            return true;
        }
    }
    return false;
}

/**
 * @param  {} config
 * @param  {} text
 */
function performTextVariableReplacements(config, text) {
    if (!text) {
        return text;
    }
    if (config.projectId) {
        text = text.replace(/\$\{projectId\}/g, config.projectId);
    }
    if (config.accessControl) {
        if (config.accessControl.datasetId) {
            text = text.replace(/\$\{accessControl\.datasetId\}/g, config.accessControl.datasetId);
        }
        if (config.accessControl.viewId) {
            text = text.replace(/\$\{accessControl\.viewId\}/g, config.accessControl.viewId);
        }
    }
    return text;
}

module.exports = {
    isPublicAccessEnabled,
    performTextVariableReplacements
};