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
const config = require('../lib/config');

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
            list.push({ topicName: t.name, topicId: topicId });
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
    return pubsubUtil.createTopic(name).then(topicResponse => {
        const [topic] = topicResponse;
        let dict = {};
        dict.labels = { [config.cdsManagedLabelKey]: "true" };
        return topic.setMetadata(dict).then(() => {
            return {
                success: true,
                data: {
                    name: name
                }
            };
        })
    }).catch(err => {
        console.error(`Error creating topic name ${name} with error: ${err}`);
        return { success: false, errors: [err.message] };
    });
}

/**
 * @param  {} projectId
 * @param  {} name
 * TODO: Delete topic from any associated policies
 */
async function deleteTopic(projectId, name) {
    const pubsubUtil = new PubSubUtil(projectId);
    return pubsubUtil.deleteTopic(name).then(() => {
        return { success: true };
    }).catch(err => {
        console.warn(err);
        return { success: false, errors: [err.message] };
    });
}

module.exports = {
    listTopics,
    createTopic,
    deleteTopic
};
