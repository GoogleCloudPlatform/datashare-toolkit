/*
  pyright 2019 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
package pubsubutil

import (
	"cloud.google.com/go/pubsub"
	"context"
	"fmt"
	log "github.com/sirupsen/logrus"
)

//var (
//topic *pubsub.Topic
//)

// Create a pubsub client and topic from GCP projectID and topicName. Return
// the pubsub.Topic and/or error to the caller
func CreateTopicClient(projectID, topicName string) (*pubsub.Topic, error) {

	ctx := context.Background()
	client, err := pubsub.NewClient(ctx, projectID)
	if err != nil {
		return nil, err
	}

	topic := client.Topic(topicName)

	// check if topic exists before returning client
	exists, err := topic.Exists(ctx)
	if err != nil {
		return nil, err
	}
	if !exists {
		return nil, fmt.Errorf("Topic '%v' does not exist", topicName)
	}
	log.Debugf("PubSub Topic client created for projectID '%s', topicName '%s'", projectID, topicName)
	return topic, nil
}

// Publish a message to a specific topic and return PublishResult (non-blocking)
func PublishMessage(topic *pubsub.Topic, input []byte) *pubsub.PublishResult {
	ctx := context.Background()

	msg := &pubsub.Message{
		Data: input,
		//Attributes: map[string]string{
		//"origin":   "golang",
		//"username": "gcp",
		//},
	}

	res := topic.Publish(ctx, msg)
	log.Debugf("Message published to topic '%s'", topic)
	return res
}

// Publish a message to a specific topic and return the id and error (blocking)
func PublishMessageB(topic *pubsub.Topic, input []byte) (string, error) {
	ctx := context.Background()

	msg := &pubsub.Message{
		Data: input,
		//Attributes: map[string]string{
		//"origin":   "golang",
		//"username": "gcp",
		//},
	}

	// Block until the result is returned and a server-generated
	// ID is returned for the published message.
	var id string
	if id, err := topic.Publish(ctx, msg).Get(ctx); err != nil {
		return "", fmt.Errorf("Publish error on topic '%s'", topic)
	} else {
		log.Debugf("Published message. msg ID: %v\n", id)
	}
	return id, nil
}

// Publish a string message to a specific topic and return the id and error
func PublishMessageS(topic *pubsub.Topic, input string) (string, error) {
	ctx := context.Background()

	msg := &pubsub.Message{
		Data: []byte(input),
		//Attributes: map[string]string{
		//"origin":   "golang",
		//"username": "gcp",
		//},
	}

	// Block until the result is returned and a server-generated
	// ID is returned for the published message.
	var id string
	if id, err := topic.Publish(ctx, msg).Get(ctx); err != nil {
		return "", fmt.Errorf("Publish error on topic '%s'", topic)
	} else {
		log.Debugf("Published message. msg ID: %v\n", id)
	}
	return id, nil
}
