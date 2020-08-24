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
	"github.com/GoogleCloudPlatform/datashare-toolkit/client/pkg/multicast"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
	"net"
)

// multicast message handler
func msgHandler(src *net.UDPAddr, n int, b []byte) {
	log.Debugf("'%d' bytes read from '%s'", n, src)
	log.Debugln(hex.Dump(b[:n]))
	//var rawData = hex.EncodeToString(b[:n]) // hex string
	//var rawData = string(b[:n])
	//log.Debugf("string: '%s'", rawData)
}

// multicastListenCmd represents the mlcsListen command
var multicastListenCmd = &cobra.Command{
	Use:   "listen",
	Short: "DS client multicast listener service",
	Long: `The DS client multicast listener service will listen to a specific multicast network interface name and address. For example:

-n "udp"
-a "239.0.0.0:9999"
-i "en0"
`,
	Run: func(cmd *cobra.Command, args []string) {
		log.Infof("Starting Multicast Listener Run...")

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

		mltcstClient.SetupCloseHandler()
		log.Infof("Listening to messages...")
		err = mltcstClient.Listen(msgHandler)
		if err != nil {
			log.Fatalf("Listen: %s", err.Error())
		}

		mltcstClient.LogCounter()
		log.Infof("Completed.")
	},
}

func init() {
	multicastCmd.AddCommand(multicastListenCmd)
}
