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
	log.Debugf("'%d' bytes read from '%s'", n, src)
	log.Debugln(hex.Dump(b[:n]))
	//var rawData = hex.EncodeToString(b[:n]) // hex string
	var rawData = string(b[:n])
	log.Debugf("string: '%s'", rawData)
}

// mlcsListenCmd represents the mlcsListen command
var mlcsListenCmd = &cobra.Command{
	Use:   "listen",
	Short: "BQDS client multicast listener service",
	Long: `The BQDS client multicast listener service will listen to a specific multicast network group, interface name, and address. For example:

-n "udp_mlcsListen_group_a"
-a "239.0.0.0:9999"
-i "en0"
`,
	Run: func(cmd *cobra.Command, args []string) {
		network, _ := cmd.Flags().GetString("network")
		address, _ := cmd.Flags().GetString("address")
		ifName, _ := cmd.Flags().GetString("ifName")

		log.Debugf("Starting Multicast Listener Run...")

		mltcstClient := multicast.Client{
			Network: network,
			Address: address,
			IfName:  ifName,
		}
		err := mltcstClient.CreateListenerConn()
		if err != nil {
			log.Fatalf("CreateListenerConn: %s", err.Error())
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
	multicastCmd.AddCommand(mlcsListenCmd)
}
