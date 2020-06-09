/*
Copyright 2019 Google LLC

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
package cmd

import (
	"github.com/GoogleCloudPlatform/datashare-toolkit/client/pkg/multicast"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
)

// multicastPublishCmd represents the mlcstPublish command
var multicastPublishCmd = &cobra.Command{
	Use:   "publish",
	Short: "DS client multicast publisher service",
	Long: `The DS client multicast publisher service will listen to a specific multicast interface and address, then publish those messages to the specified PubSub Topic. For example:

-n "udp"
-a "239.0.0.0:9999"
-i "en0"
-p "projectID"
-t "topicName"
`,
	Args: func(cmd *cobra.Command, args []string) error {
		requiredFlgs := [2]string{"projectID", "topicName"}
		for _, flagName := range requiredFlgs {
			flagValue, _ := cmd.Flags().GetString(flagName)
			if flagValue == "" {
				log.Fatalf("'%s' requires a valid value, not '%s'", flagName, flagValue)
			}
		}
		return nil
	},
	Run: func(cmd *cobra.Command, args []string) {
		log.Infof("Starting Multicast Publish Run...")

		mltcstClient := multicast.Client{
			Net:             networkType,
			Address:         address,
			IfName:          ifName,
			ReadBufferBytes: readBufferBytes,
		}
		err := mltcstClient.CreateListenerConn()
		if err != nil {
			log.Fatalf("CreateListenerConn: %s", err.Error())
		}

		log.Infof("Creating PubSub Topic Client...")
		err = mltcstClient.CreateTopicClient(projectID, topicName)
		if err != nil {
			log.Fatalf("CreateTopicClient: %s", err.Error())
		}

		mltcstClient.SetupCloseHandler()
		log.Infof("Listening and Publishing messages...")
		err = mltcstClient.Publish()
		if err != nil {
			log.Fatalf("Publish: %s", err.Error())
		}

		log.Infof("Completed.")
	},
}

func init() {
	multicastPublishCmd.Flags().StringVarP(&projectID, "projectID", "p", "",
		"GCP Project ID (name)")
	multicastPublishCmd.MarkFlagRequired("projectID")
	multicastPublishCmd.Flags().StringVarP(&topicName, "topicName", "t", "",
		"GCP PubSub Topic ID (name)")
	multicastPublishCmd.MarkFlagRequired("topicName")
	multicastCmd.AddCommand(multicastPublishCmd)
}
