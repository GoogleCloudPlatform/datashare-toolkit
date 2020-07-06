#! /usr/bin/env node
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

// Usage: pubsock <ws url> <topic>
//
// Get messages arriving via WebSocket (JSONL-formatted) and
// publish them individually to the specified topic
//
// TODO: Set message attributes from data coming over via websockets
//
//

if (process.argv.length < 4) {
    console.error(`Usage: pubsock <WebSocket URL> <topic-mame>`);
    process.exit(1);
}
const socketUrl = process.argv[2];
const topicName = process.argv[3];
const WebSocket = require('ws');
const {PubSub} = require('@google-cloud/pubsub');
const pubsub = new PubSub();
const ws = new WebSocket(socketUrl);
let topic = undefined;

const publishMessages = function() {
    let topic = pubsub.topic(topicName);
    ws.on('open', open);
    ws.on('message', inbound);
    ws.on('close', close);
}

const open = function() {
    console.error('Web socket connection opened');
}

const inbound = function (data) {
    try {
        let payload = Buffer.from(data);
        topic.publisher.publish(payload,
                                { origin: socketUrl },
                                function(err, messageId) {
             if (err) {
                 console.error(`error in publish callback: ${err}`);
             }
         });
     } catch(error) {
         console.error(`caught error publishing message: ${error}`);
     }
 }

const close = function() {
    console.error('Web socket connection closed');
    process.exit(1);
}

try {
    topic = pubsub.topic(topicName);
    topic.exists(function(err, exists) {
        if (err) {
            console.error(`Error looking for specified topic ${topicName}: ${error}`);
            process.exit(1);
        } else {
            if (!exists) {
                console.error(`Topic ${topicName} not found, creating...`);
                topic.create(function (err, topic, apiResponse) {
                    if (err) {
                        console.error(`Could not create non-existent topic ${topicName}: ${apiResponse} ${err}`);
                        process.exit(1);
                    } else {
                        console.error(`Created topic ${topicName}`);
                        publishMessages();
                    }
                }); 
            } else {
                publishMessages();
            }
        }
    });
} catch(error) {
    console.error(`Error: ${error}`);
    process.exit(1);
}


