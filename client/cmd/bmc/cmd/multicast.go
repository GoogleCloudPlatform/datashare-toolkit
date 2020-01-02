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

// multicastCmd represents the multicast command
var multicastCmd = &cobra.Command{
	Use:   "multicast",
	Short: "BQDS client multicast service",
	Long: `The BQDS client multicast service will listen, broadcast, or publish to a specific multicast network group and address. For example:

-n "udp_multicast_group_a"
-a "239.0.0.0:9999"
-i "en0"
`,
	PersistentPreRunE: func(cmd *cobra.Command, args []string) error {
		requiredFlgs := [3]string{"network", "address", "ifName"}
		for _, flagName := range requiredFlgs {
			flagValue, _ := cmd.Flags().GetString(flagName)
			if flagValue == "" {
				log.Fatalf("'%s' requires a valid value, not '%s'", flagName, flagValue)
			}
		}
		return nil
	},
	Run: func(cmd *cobra.Command, args []string) {
		log.Debugln("client multicast called. add main logic here")
	},
}

func init() {
	multicastCmd.PersistentFlags().StringVarP(&network, "network", "n", "", "UDP multicast network group name: e.g. 'udp_multicast_group_a'")
	multicastCmd.PersistentFlags().StringVarP(&address, "address", "a", "", "UDP multicast address in <HOST:PORT> format: e.g. '239.0.0.0:9999'")
	multicastCmd.PersistentFlags().StringVarP(&ifName, "ifName", "i", "", "UDP multicast interface name: e.g. 'en0' or 'lo0'")
	multicastCmd.MarkPersistentFlagRequired("network")
	multicastCmd.MarkPersistentFlagRequired("address")
	multicastCmd.MarkPersistentFlagRequired("ifName")
	clientCmd.AddCommand(multicastCmd)
}
