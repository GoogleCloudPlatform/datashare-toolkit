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

class CloudFunctionUtil {
    /**
     * Generates the BQDS batch Id.
     * @param  {} config
     */
    generateBatchId(event, context) {
        return [
            new Date().getTime(),
            context.eventId,
            event.bucket,
            event.name
        ].join(':');
    }

    /**
     * Determine whether a file suffix is recognized for ingestion.
     * @param  {} fileName
     */
    isExtensionSupported(fileName, acceptable) {
        const parts = fileName.split('.');
        if (parts[0] &&
            (parts[0].startsWith(processPrefix)
                || parts[0].startsWith(`/${processPrefix}`))) {
            return false;
        } else {
            const ext = parts[parts.length - 1];
            console.log(`file has extension ${ext}`);
            return acceptable.includes(ext.toLowerCase());
        }
    }
}

module.exports = CloudFunctionUtil;