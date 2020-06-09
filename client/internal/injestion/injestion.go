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
	"fmt"
	"github.com/GoogleCloudPlatform/datashare-toolkit/client/internal/pubsubutil"
	"github.com/GoogleCloudPlatform/datashare-toolkit/client/internal/validate"
	log "github.com/sirupsen/logrus"
)

// Stream the data to pubsub by validating and interating over the input
func Run(projectID string, topicName string, raw string) error {
	log.Debugf("Starting Injestion Run...")
	data, err := validate.CheckInputData(raw)
	if err != nil {
		return fmt.Errorf("validate.CheckInputData: %s", err.Error())
	}

	log.Debugf("Creating PubSub Client.")
	topic, err := pubsubutil.CreateTopicClient(projectID, topicName)
	if err != nil {
		return fmt.Errorf("pubsubutil.CreateTopicClient: %s", err.Error())
	}

	log.Debugf("Publishing Messages...")
	for idx, line := range data {
		log.Debugf("idx: '%v', line: '%s'", idx, line)
		_, err := pubsubutil.PublishMessageS(topic, raw)
		if err != nil {
			return fmt.Errorf("pubsub.PublishMessage: %s", err.Error())
		}
	}
	//err := pubsub.PublishMessage(raw)
	log.Debugf("Completed.")
	return nil
}
