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

var (
	message string
)

// multicastBroadcastCmd represents the mlcstBroadcast command
var multicastBroadcastCmd = &cobra.Command{
	Use:   "broadcast",
	Short: "DS client multicast broadcaster service",
	Long: `The DS client multicast broadcaster service will bind to a specific multicast network interface name and address, then broadcast messages to the network interface. For example:

-n "udp"
-a "239.0.0.0:9999"
-i "en0"
-m "I am a sample message"
`,
	Run: func(cmd *cobra.Command, args []string) {
		log.Infof("Starting Multicast Broadcast Run...")

		mltcstClient := multicast.Client{
			Net:             networkType,
			Address:         address,
			IfName:          ifName,
			ReadBufferBytes: readBufferBytes,
		}
		err := mltcstClient.CreateBroadcasterConn()
		if err != nil {
			log.Fatalf("CreateBroadcasterConn: %s", err.Error())
		}

		mltcstClient.SetupCloseHandler()
		log.Infof("Broadcasting messages...")
		err = mltcstClient.Broadcast([]byte(message))
		if err != nil {
			log.Fatalf("Broadcast: %s", err.Error())
		}

		log.Infof("Completed.")
	},
}

func init() {
	multicastBroadcastCmd.Flags().StringVarP(&message, "message", "m", "", "Raw message to be broadcasted: e.g. 'I am a test message', '\x800\x123\x800'")
	multicastCmd.AddCommand(multicastBroadcastCmd)
}
