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

const { PubSubUtil } = require('cds-shared');

/**
 * @param  {} projectId
 */
async function listTopics(projectId) {
    const pubsubUtil = new PubSubUtil(projectId);
    const topics = await pubsubUtil.getTopics();
    let list = [];
    for (const t of topics) {
        const labels = t.metadata.labels;
        if (labels.datashare_managed === 'true') {
            const topicId = t.name.substring(t.name.lastIndexOf('/') + 1);
            list.push({ name: t.name, id: topicId });
        }
    }
    return { success: true, data: list };
}

/**
 * @param  {} projectId
 * @param  {} name
 */
async function createTopic(projectId, name) {
    const pubsubUtil = new PubSubUtil(projectId);
    await pubsubUtil.createTopic(name).catch(err => {
        console.warn(err);
        return { success: false, errors: [err.message] };
    });
    return {
        success: true,
        data: {
            name: name
        }
    };
}

/**
 * @param  {} projectId
 * @param  {} name
 */
async function deleteTopic(projectId, name) {
    const pubsubUtil = new PubSubUtil(projectId);
    await pubsubUtil.deleteTopic(name).catch(err => {
        console.warn(err);
        return { success: false, errors: [err.message] };
    });
    return { success: true };
}

module.exports = {
    listTopics,
    createTopic,
    deleteTopic
};
