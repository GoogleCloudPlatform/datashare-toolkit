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
	multicastNetworkTypeDefault string = "udp"
	readBufferBytesDefault      int    = 212992 // SO_RCVBUF will depend on system resources
)

// multicastCmd represents the multicast command
var multicastCmd = &cobra.Command{
	Use:   "multicast",
	Short: "DS client multicast service",
	Long: `The DS client multicast service will listen, broadcast, or publish to a specific multicast network interface and address. For example:

-n "udp"
-a "239.0.0.0:9999"
-i "en0"
`,
	PersistentPreRunE: func(cmd *cobra.Command, args []string) error {
		requiredFlgs := [2]string{"address", "ifName"}
		for _, flagName := range requiredFlgs {
			flagValue, _ := cmd.Flags().GetString(flagName)
			if flagValue == "" {
				log.Fatalf("'%s' requires a valid value, not '%s'", flagName, flagValue)
			}
		}
		// Only log the info severity or above based off verbose flag.
		if verbose {
			log.SetLevel(log.DebugLevel)
		} else {
			log.SetLevel(log.InfoLevel)
		}
		return nil
	},
	Run: func(cmd *cobra.Command, args []string) {
		log.Debugln("client multicast called. add main logic here")
	},
}

func init() {
	multicastCmd.PersistentFlags().StringVarP(&networkType, "networkType", "n", multicastNetworkTypeDefault, "UDP multicast network type name: e.g. 'udp', 'udp4' (IPv4-only), 'udp6' (IPv6-only)")
	multicastCmd.PersistentFlags().StringVarP(&address, "address", "a", "", "UDP multicast address in <HOST:PORT> format: e.g. '239.0.0.0:9999'")
	multicastCmd.PersistentFlags().StringVarP(&ifName, "ifName", "i", "", "UDP multicast interface name: e.g. 'en0' or 'lo0'")
	multicastCmd.PersistentFlags().IntVarP(&readBufferBytes, "readBufferBytes", "r", readBufferBytesDefault, "Size of the operating system's receive buffer associated with the connection.")
	multicastCmd.MarkPersistentFlagRequired("address")
	multicastCmd.MarkPersistentFlagRequired("ifName")
	rootCmd.AddCommand(multicastCmd)
}
