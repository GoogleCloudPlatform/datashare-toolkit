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
package injestion

import (
	"encoding/hex"
	"fmt"
	"github.com/GoogleCloudPlatform/bq-datashare-toolkit/client/internal/multicast"
	"github.com/GoogleCloudPlatform/bq-datashare-toolkit/client/internal/pubsubutil"
	"github.com/GoogleCloudPlatform/bq-datashare-toolkit/client/internal/validate"
	log "github.com/sirupsen/logrus"
	"net"
	"os"
)

const (
	maxDatagramSize = 4096
)

// force return of environment variables
func mustGetenv(k string) string {
	v := os.Getenv(k)
	if v == "" {
		log.Fatalf("%s environment variable not set.", k)
	}
	return v
}

// temp multicast handler
func msgHandler(src *net.UDPAddr, n int, b []byte) {
	log.Println(n, "bytes read from", src)
	log.Println(hex.Dump(b[:n]))
	//var rawData = hex.EncodeToString(b[:n]) // hex string
	var rawData = string(b[:n])
	log.Println(rawData)
}

// Listen to Multicast
func MulticastListener(network, address, ifName string) error {
	log.Debugf("Starting Multicast Injestion Run...")

	conn, err := multicast.CreateConn(network, address, ifName)
	if err != nil {
		return fmt.Errorf("multicast.CreateConn: %s", err.Error())
	}

	log.Debugf("Listening Messages...")
	err = multicast.Listen(conn, msgHandler)
	if err != nil {
		return fmt.Errorf("Listen: %s", err.Error())
	}
	log.Debugf("Completed.")
	return nil
}

// Listen to Multicast and Stream the data to pubsub by validating and
// interating over the input
func MulticastPublisher(projectID, topicID, network, address, ifName string) error {
	log.Debugf("Starting Multicast Injestion Run...")

	log.Debugf("Creating PubSub Topic Client.")
	topic, err := pubsubutil.CreateTopicClient(projectID, topicID)
	if err != nil {
		return fmt.Errorf("pubsubutil.CreateTopicClient: %s", err.Error())
	}

	conn, err := multicast.CreateConn(network, address, ifName)
	if err != nil {
		return fmt.Errorf("multicast.CreateConn: %s", err.Error())
	}

	log.Debugf("Listening and Publishing Messages...")
	err = multicast.ListenAndPublish(conn, topic)
	if err != nil {
		return fmt.Errorf("pubsubutil.PublishMessage: %s", err.Error())
	}
	log.Debugf("Completed.")
	return nil
}

// Stream the data to pubsub by validating and interating over the input
func Run(projectID string, topicID string, raw string) error {
	log.Debugf("Starting Injestion Run...")
	data, err := validate.CheckInputData(raw)
	if err != nil {
		return fmt.Errorf("validate.CheckInputData: %s", err.Error())
	}

	log.Debugf("Creating PubSub Client.")
	topic, err := pubsubutil.CreateTopicClient(projectID, topicID)
	if err != nil {
		return fmt.Errorf("pubsubutil.CreateTopicClient: %s", err.Error())
	}

	log.Debugf("Publishing Messages...")
	for idx, line := range data {
		log.Debugf("idx: '%v', line: '%s'", idx, line)
		_, err := pubsubutil.PublishMessage(topic, raw)
		if err != nil {
			return fmt.Errorf("pubsub.PublishMessage: %s", err.Error())
		}
	}
	//err := pubsub.PublishMessage(raw)
	log.Debugf("Completed.")
	return nil
}
