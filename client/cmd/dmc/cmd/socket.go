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
	socketNetworkTypeDefault string = "unix"
	socketAddressDefault     string = "/tmp/echo.sock"
)

// socketCmd represents the socket command
var socketCmd = &cobra.Command{
	Use:   "socket",
	Short: "DS client socket service",
	Long: `The DS client socket service will attach to a raw unix or tcp socket and iterate over
stream data if new line. For example:

  -n "unix"
  -a "/tmp/echo.sock"
`,
	Run: func(cmd *cobra.Command, args []string) {
		networkType, _ := cmd.Flags().GetString("networkType")
		if networkType != "" {
			log.Debugln("networkType:", networkType)
		}
		address, _ := cmd.Flags().GetString("address")
		if address != "" {
			log.Debugln("address:", address)
		}
		log.Infoln("socket called. Add main logic here.")
	},
}

func init() {
	//socketCmd.Flags().StringVarP(&networkType, "networkType", "n", "", "network type name for socket connection: e.g. 'unix', 'unixgram' or 'unixpacket'")
	//socketCmd.Flags().StringVarP(&address, "address", "a", socketAddressDefault, "network address name or ip for socket connection")
	rootCmd.AddCommand(socketCmd)
}
