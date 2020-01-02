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
	"github.com/GoogleCloudPlatform/bq-datashare-toolkit/client/pkg/multicast"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
)

// mlcstPublishCmd represents the mlcstPublish command
var mlcstPublishCmd = &cobra.Command{
	Use:   "publish",
	Short: "BQDS client multicast publisher service",
	Long: `The BQDS client multicast publisher service will listen to a specific multicast network group and address, then publish those messages to the specified PubSub Topic. For example:

-n "udp_mlcstPublish_group_a"
-a "239.0.0.0:9999"
-i "en0"
-p "projectID"
-t "topicID"
`,
	Args: func(cmd *cobra.Command, args []string) error {
		requiredFlgs := [2]string{"projectID", "topicID"}
		for _, flagName := range requiredFlgs {
			flagValue, _ := cmd.Flags().GetString(flagName)
			if flagValue == "" {
				log.Fatalf("'%s' requires a valid value, not '%s'", flagName, flagValue)
			}
		}
		return nil
	},
	Run: func(cmd *cobra.Command, args []string) {
		network, _ := cmd.Flags().GetString("network")
		address, _ := cmd.Flags().GetString("address")
		ifName, _ := cmd.Flags().GetString("ifName")
		projectID, _ := cmd.Flags().GetString("projectID")
		topicID, _ := cmd.Flags().GetString("topicID")

		log.Debugf("Starting Multicast Publish Run...")

		mltcstClient := multicast.Client{
			Network: network,
			Address: address,
			IfName:  ifName,
		}
		err := mltcstClient.CreateListenerConn()
		if err != nil {
			log.Fatalf("CreateListenerConn: %s", err.Error())
		}

		log.Debugf("Creating PubSub Topic Client...")
		err = mltcstClient.CreateTopicClient(projectID, topicID)
		if err != nil {
			log.Fatalf("CreateTopicClient: %s", err.Error())
		}

		log.Debugf("Listening and Publishing messages...")
		err = mltcstClient.Publish()
		if err != nil {
			log.Fatalf("Publish: %s", err.Error())
		}

		log.Debugf("Completed.")
	},
}

func init() {
	mlcstPublishCmd.Flags().StringVarP(&projectID, "projectID", "p", "",
		"GCP Project ID (name)")
	mlcstPublishCmd.MarkFlagRequired("projectID")
	mlcstPublishCmd.Flags().StringVarP(&topicID, "topicID", "t", "",
		"GCP PubSub Topic ID (name)")
	mlcstPublishCmd.MarkFlagRequired("topicID")
	multicastCmd.AddCommand(mlcstPublishCmd)
}
