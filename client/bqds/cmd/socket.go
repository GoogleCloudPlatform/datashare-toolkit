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
	"fmt"

	"github.com/spf13/cobra"
)

var (
	network string
	address string
)

var (
	networkDefault string = "unix"
	addressDefault string = "/tmp/echo.sock"
)

// socketCmd represents the socket command
var socketCmd = &cobra.Command{
	Use:   "socket",
	Short: "BQDS client socket service",
	Long: `The BQDS client socket service will attach to a raw unix or tcp socket and iterate over
stream data if new line. For example:

  -n "unix"
  -a "/tmp/echo.sock"
`,
	Run: func(cmd *cobra.Command, args []string) {
		network, _ := cmd.Flags().GetString("network")
		if network != "" {
			fmt.Println("network:", network)
		}
		address, _ := cmd.Flags().GetString("address")
		if address != "" {
			fmt.Println("address:", address)
		}
		fmt.Println("socket called. Add main logic here.")
	},
}

func init() {
	clientCmd.AddCommand(socketCmd)
	//countCmd.Flags().Int("number", 10, "A help for number")
	socketCmd.Flags().StringVarP(&network, "network", "n", networkDefault, "network interface name for socket connection")
	socketCmd.Flags().StringVarP(&address, "address", "a", addressDefault, "network address name or ip for socket connection")

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// socketCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// socketCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
