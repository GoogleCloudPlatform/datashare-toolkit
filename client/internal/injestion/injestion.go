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
	"fmt"
	"github.com/GoogleCloudPlatform/bq-datashare-toolkit/client/internal/pubsubutil"
	"github.com/GoogleCloudPlatform/bq-datashare-toolkit/client/internal/validate"
	log "github.com/sirupsen/logrus"
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

// Stream the data to pubsub by validating and interating over the input
func Run(raw string) error {
	log.Debugf("Starting Injestion Run...")
	data, err := validate.CheckInputData(raw)
	if err != nil {
		return fmt.Errorf("validate.CheckInputData: %s", err.Error())
	}

	// passing these as environment variables for testing
	projectID := mustGetenv("GOOGLE_CLOUD_PROJECT")
	topicID := mustGetenv("PUBSUB_TOPIC_NAME")

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
