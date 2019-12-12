/*
  pyright © 2019 Chris Page <chrispage@google.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

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
}

// Listen to Multicast and Stream the data to pubsub by validating and
// interating over the input
func MulticastListener(projectID, topicID, network, address string) error {
	log.Debugf("Starting Multicast Injestion Run...")
	err := multicast.Listen(network, address, msgHandler)
	if err != nil {
		return fmt.Errorf("multicast.Listen: %s", err.Error())
	}
	return nil
}

// Stream the data to pubsub by validating and interating over the input
func Run(projectID string, topicID string, raw string) error {
	log.Debugf("Starting Injestion Run...")
	data, err := validate.CheckInputData(raw)
	if err != nil {
		return fmt.Errorf("validate.CheckInputData: %s", err.Error())
	}

	topic, err := pubsubutil.CreateClientTopic(projectID, topicID)
	if err != nil {
		return fmt.Errorf("pubsubutil.CreateClientTopic: %s", err.Error())
	}
	for index, line := range data {
		log.Debugf("%d, %s", index, line)
		_, err := pubsubutil.PublishMessage(topic, raw)
		if err != nil {
			return fmt.Errorf("pubsub.PublishMessage: %s", err.Error())
		}
	}
	//err := pubsub.PublishMessage(raw)
	log.Debugf("Completed.")
	return nil
}
