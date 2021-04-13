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
const pubsub = require('@google-cloud/pubsub');

class PubSubUtil {
    constructor(projectId) {
        const options = {
            scopes:['https://www.googleapis.com/auth/cloud-platform']
        };
        if (projectId) {
            options.projectId = projectId;
        }
        this.pubsub = new PubSub(options);
        this.client = new pubsub.v1.SubscriberClient(options);
    }

    get VERBOSE_MODE() {
        return process.env.VERBOSE_MODE;
    }

    /**
     * @param  {string} topicName
     * create topic by name and return true
     */
    async createTopic(topicName) {
        await this.pubsub.createTopic(topicName);
        if (this.VERBOSE_MODE) {
            console.log(`Topic '${topicName}' created.`);
        }
        return true;
    }

    /**
     * @param  {string} topicName
     * delete topic by name and return true
     */
    async deleteTopic(topicName) {
        await this.pubsub.topic(topicName).delete();
        if (this.VERBOSE_MODE) {
            console.log(`Topic '${topicName}' deleted.`);
        }
        return true;
    }

    /**
     * @param  {string} topicName
     * @param  {string} subscriptionName
     * @param  {object} options
     * create subscription by name and return true
     */
    async createSubscription(topicName, subscriptionName, options) {
        const sub = await this.pubsub.topic(topicName).createSubscription(subscriptionName, options);
        if (this.VERBOSE_MODE) {
            console.log(`Subscription '${subscriptionName}' created for '${topicName}' with options: ${options}.`);
        }
        return sub[0];
    }

    /**
     * @param  {string} topicName
     * @param  {string} subscriptionName
     * delete subscription by name and return true
     */
    async deleteSubscription(topicName, subscriptionName) {
        await this.pubsub.subscription(subscriptionName).delete();
        if (this.VERBOSE_MODE) {
            console.log(`Subscription '${subscriptionName}' deleted for '${topicName}'.`);
        }
        return true;
    }

    /**
     * @param  {string} topicName
     * @param  {string} subscriptionProjectId
     * @param  {string} subscriptionName
     * check if the subscription exists by name and return true if exists
     * this function will only work if you have the necessary permissions on the topic
     */
    async checkIfSubscriptionExists(topicName, subscriptionProjectId, subscriptionName) {
        const formattedSubscription = `projects/${subscriptionProjectId}/subscriptions/${subscriptionName}`;
        const subscription = this.getSubscription(formattedSubscription);
        const response = await subscription.exists();
        const exists = response[0];
        return exists;
    }

    /**
     * @param  {} subscriptionName
     * @param  {} subscriberOptions
     */
    getSubscription(subscriptionName, subscriberOptions) {
        return this.pubsub.subscription(subscriptionName, subscriberOptions);
    }

    /**
     * @param  {string} subscriptionProjectId
     * @param  {string} subscriptionName
     * get a message syncronously and ack it. throw an error if no messages in the subscription
     */
    async getMessage(subscriptionProjectId, subscriptionName) {
        // The maximum number of messages returned for this request.

        const formattedSubscription = this.client.subscriptionPath(subscriptionProjectId, subscriptionName);
        const maxMessages = 1;
        const request = {
            subscription: formattedSubscription,
            maxMessages: maxMessages,
            returnImmediately: true
        };

        // The subscriber pulls a specified number of messages.
        const [response] = await this.client.pull(request);
        if (response.receivedMessages.length === 0) {
            throw new Error('Pubsub message(s) not found.');
        }
        // Obtain the first message.
        const message = response.receivedMessages[0];

        const ackRequest = {
            subscription: formattedSubscription,
            ackIds: [message.ackId],
        };
        //..acknowledges the message.
        const ack = await this.client.acknowledge(ackRequest);
        if (this.VERBOSE_MODE) {
            console.log(`Message ${message.message.messageId} acknowledged.`);
        }
        // Return the message contents.
        return message;
    }

    /**
     * @param  {string} topicName
     * @param  {Object} message
     * @param  {Object} customAttributes
     * publish a message to a topicName with custom attributes and return the message id
     */
    async publishMessage(topicName, message, customAttributes) {
        const jsonString = JSON.stringify(message);
        const dataBuffer = Buffer.from(jsonString);
        const messageId = await this.pubsub.topic(topicName).publish(dataBuffer, customAttributes);
        if (this.VERBOSE_MODE) {
            console.log(`Message '${messageId}' published to '${topicName}'.`);
        }
        return messageId;
    }
}

module.exports = PubSubUtil;
