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

// Usage: ${0} <ws url> <topic>
//
// take messages arriving via WebSocket (JSONL-formatted) and
// publish them individually to the specified topic

const {PubSub} = require('@google-cloud/pubsub');
const pubsub = new PubSub();

const socketUrl = process.argv[2];
const topicName = process.argv[3];
const WebSocket = require('ws');

if (process.argv.length < 4) {
    console.error(`Usage: webSocketPublisher <WebSocket URL> <topic-mame>`);
    process.exit(1);
}

let topic = pubsub.topic(topicName);
try {
    if (!topic) {
        pubsub.createTopic(topicName, function(err) {
            if (err) {
                console.error('Could not create topic: ' + JSON.stringify(err));
                process.exit(1);
            } else {
                publishMessages();
            }
        });   
    } else {
        publishMessages();
    }
} catch(error) {
    console.error("Error: " + error);
}


function publishMessages() {
    let topic = pubsub.topic(topicName);
    const ws = new WebSocket(socketUrl);

    ws.on('open', function open() {
        console.error('socket opened');
    });
    
    ws.on('message', function inbound(data) {
        try {
            topic.publisher.publish(Buffer.from(data), function(err, messageId) {
                if (err) {
                    console.error(`could not publish message ${messageId}`);
                }
            });
        } catch(error) {
            console.error(`error publishing message: ${error}`);
        }
    });
}
