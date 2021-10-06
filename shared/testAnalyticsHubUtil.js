/**
 * Copyright 2021 Google LLC
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

 const AnalyticsHubUtil = require('./analyticsHubUtil');

 async function test(projectId) {
    try {
        const analyticsHubUtil = new AnalyticsHubUtil(projectId);
        console.log('1');
        const client = await analyticsHubUtil.getClient();
        console.log('2');
        return { success: true, data: account };
    } catch (err) {
        console.error(err.response);
        return { success: false, errors: ['Failed to retrieve account'] };
    }
}

test('cds-demo-1-271622').catch(console.error);