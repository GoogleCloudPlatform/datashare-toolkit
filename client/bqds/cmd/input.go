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
	fileName string
	rawData  string
)

// inputCmd represents the input command
var inputCmd = &cobra.Command{
	Use:   "input",
	Short: "BQDS client input service",
	Long: `The BQDS client input service will parse the raw data or a file and iterate over
the data if new line. For example:

  -d '{"a": 123}\n{"b": "xyz"}'
  -f "$PWD/input/file.txt"
`,
	Args: func(cmd *cobra.Command, args []string) error {
		fileName, _ := cmd.Flags().GetString("fileName")
		rawData, _ := cmd.Flags().GetString("rawData")
		//fmt.Println(args)
		//if len(args) < 1 && fileName == "" {
		if rawData == "" && fileName == "" {
			return fmt.Errorf("Input requires either rawData or fileName")
		}
		return nil
	},
	Run: func(cmd *cobra.Command, args []string) {
		rawData, _ := cmd.Flags().GetString("rawData")
		if rawData != "" {
			fmt.Println("rawData:", rawData)
		}
		fileName, _ := cmd.Flags().GetString("fileName")
		if fileName != "" {
			fmt.Println("FileName:", fileName)
		}
		fmt.Println("input called. Add main logic here.")
	},
}

func init() {
	clientCmd.AddCommand(inputCmd)
	inputCmd.Flags().StringVarP(&rawData, "rawData", "d", "", "raw data to parse")
	inputCmd.Flags().StringVarP(&fileName, "fileName", "f", "", "file name to read")

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// inputCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// inputCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
