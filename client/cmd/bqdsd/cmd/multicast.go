/*
Copyright © 2019 NAME HERE <EMAIL ADDRESS>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
package cmd

import (
	log "github.com/sirupsen/logrus"

	"github.com/GoogleCloudPlatform/bq-datashare-toolkit/client/internal/injestion"
	"github.com/spf13/cobra"
)

var (
	mltcstNetwork string
	mltcstAddress string
	mltcstIfName  string
)

// multicastCmd represents the multicast command
var multicastCmd = &cobra.Command{
	Use:   "multicast",
	Short: "BQDS client multicast service",
	Long: `The BQDS client multicast service will listen to a specific multicast network group and address. For example:

-n "udp_multicast_group_a"
-a "239.0.0.0:9999"
-i "en0"
`,
	Args: func(cmd *cobra.Command, args []string) error {
		mltcstNetwork, _ := cmd.Flags().GetString("mltcstNetwork")
		mltcstAddress, _ := cmd.Flags().GetString("mltcstAddress")
		mltcstIfName, _ := cmd.Flags().GetString("mltcstIfName")
		//fmt.Println(args)
		if mltcstNetwork == "" || mltcstAddress == "" || mltcstIfName == "" {
			log.Fatalf("Input requires all the UDP: [mltcstNetwork, mltcstAddress, mltcstIfName]")
		}
		return nil
	},
	Run: func(cmd *cobra.Command, args []string) {
		mltcstNetwork, _ := cmd.Flags().GetString("mltcstNetwork")
		mltcstAddress, _ := cmd.Flags().GetString("mltcstAddress")
		mltcstIfName, _ := cmd.Flags().GetString("mltcstIfName")
		// These PersistantFlags are required and validated in parent command
		projectID, _ := cmd.Flags().GetString("projectID")
		topicID, _ := cmd.Flags().GetString("topicID")
		log.Debugln("mltcstNetwork:", mltcstNetwork)
		log.Debugln("mltcstAddress:", mltcstAddress)
		log.Debugln("mltcstIfName:", mltcstIfName)
		err := injestion.MulticastListener(projectID, topicID, mltcstNetwork, mltcstAddress, mltcstIfName)
		if err != nil {
			log.Fatal(err)
		}
	},
}

func init() {
	clientCmd.AddCommand(multicastCmd)
	multicastCmd.Flags().StringVarP(&mltcstNetwork, "mltcstNetwork", "n", "", "UDP multicast network group name: e.g. 'udp_multicast_group_a'")
	multicastCmd.Flags().StringVarP(&mltcstAddress, "mltcstAddress", "a", "", "UDP multicast address in <HOST:PORT> format: e.g. '239.0.0.0:9999'")
	multicastCmd.Flags().StringVarP(&mltcstIfName, "mltcstIfName", "i", "", "UDP multicast interface name: e.g. 'en0' or 'lo0'")

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// multicastCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// multicastCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
