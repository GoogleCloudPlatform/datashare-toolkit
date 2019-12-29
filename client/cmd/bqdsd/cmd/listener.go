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
	"encoding/hex"
	"github.com/GoogleCloudPlatform/bq-datashare-toolkit/client/pkg/multicast"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
	"net"
)

// multicast message handler
func msgHandler(src *net.UDPAddr, n int, b []byte) {
	log.Println(n, "bytes read from", src)
	log.Println(hex.Dump(b[:n]))
	//var rawData = hex.EncodeToString(b[:n]) // hex string
	var rawData = string(b[:n])
	log.Println(rawData)
}

// mlcstListenerCmd represents the mlcstListener command
var mlcstListenerCmd = &cobra.Command{
	Use:   "listener",
	Short: "BQDS client multicast listener service",
	Long: `The BQDS client multicast listener service will listen to a specific mlcstListener network group and address. For example:

-n "udp_mlcstListener_group_a"
-a "239.0.0.0:9999"
-i "en0"
`,
	Run: func(cmd *cobra.Command, args []string) {
		mltcstNetwork, _ := cmd.Flags().GetString("mltcstNetwork")
		mltcstAddress, _ := cmd.Flags().GetString("mltcstAddress")
		mltcstIfName, _ := cmd.Flags().GetString("mltcstIfName")

		log.Debugf("Starting Multicast Listener Run...")

		mltcstClient := multicast.Client{
			Network: mltcstNetwork,
			Address: mltcstAddress,
			IfName:  mltcstIfName,
		}
		err := mltcstClient.CreateConn()
		if err != nil {
			log.Fatalf("CreateConn: %s", err.Error())
		}

		log.Debugf("Listening to messages...")
		err = mltcstClient.Listen(msgHandler)
		if err != nil {
			log.Fatalf("Listen: %s", err.Error())
		}

		log.Debugf("Completed.")
	},
}

func init() {
	multicastCmd.AddCommand(mlcstListenerCmd)
}
