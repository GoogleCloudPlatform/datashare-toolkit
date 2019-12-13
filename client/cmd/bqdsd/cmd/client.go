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
	log "github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
)

var (
	projectID string
	topicID   string
)

// clientCmd represents the client command
var clientCmd = &cobra.Command{
	Use:   "client",
	Short: "BQDS client service",
	Long: `The BQDS client service is a daemon that will listen to various POSIX server interfaces
to stream messages to GCP. For example:

Input (stdin/file): '{"a": 123}\n{"b": "xyz"}'
Socket (unix/tcp): '/tmp/echo.sock'
Websocket: 'wss://127.0.0.1:8000'
Multicast: '224.0.1.0:264'
`,
	PersistentPreRunE: func(cmd *cobra.Command, args []string) error {
		log.Debug("Running PersistentFlag validation")
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
		log.Debugln("client called. add main logic here")
	},
}

func init() {
	clientCmd.PersistentFlags().StringVarP(&projectID, "projectID", "p", "",
		"GCP Project ID (name)")
	clientCmd.MarkPersistentFlagRequired("projectID")
	clientCmd.PersistentFlags().StringVarP(&topicID, "topicID", "t", "",
		"GCP PubSub Topic ID (name)")
	clientCmd.MarkPersistentFlagRequired("topicID")
	rootCmd.AddCommand(clientCmd)
}
