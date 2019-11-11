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

const { PubSub } = require('@google-cloud/pubsub');
const pubsub = new PubSub();

/**
 * @param  {} topicName
 * @param  {} subscriptionName
 * check if the subscription exists by name
 */
async function checkIfSubscriptionExists(topicName, subscriptionName) {
    const topic = pubsub.topic(topicName);
    const subscription = topic.subscription(subscriptionName);
    const exists = await subscription.exists().catch(err => {
        console.warn(err.message);
        throw err;
    });
    if (exists[0] === false) {
        return { success: false, code: 400, errors: ['Subscription [' + subscriptionName + '] does not exist'] };
    }
    return true;
}

/**
 * @param  {} subscriptionName
 * return a subscription object
 */
function getSubscription(subscriptionName) {
    return pubsub.subscription(subscriptionName);
}

/**
 * @param  {} topicName
 * @param  {} message
 */
async function publishMessage(topicName, message, customAttributes) {
    const jsonString = JSON.stringify(message);
    const dataBuffer = Buffer.from(jsonString);
    const messageId = await pubsub.topic(topicName).publish(dataBuffer, customAttributes).catch(err => {
        console.warn(err.message);
        throw err;
    });
    if (messageId[0] === false) {
        return { success: false, errors: ['Publish PubSub message to [' + topic + '] failed'] };
    }
    console.log(`Message ${messageId} published.`);
    return messageId;
}

module.exports = {
    checkIfSubscriptionExists,
    getSubscription,
    publishMessage
};
