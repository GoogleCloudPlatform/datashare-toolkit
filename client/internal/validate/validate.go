/*
  pyright 2019 Google LLC

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
package validate

import (
	"fmt"
	"strings"
)

const (
	defaultSeparator = `\n`
	defaultLength    = 4096
	defaultMaxLines  = 2
)

// Check the input data for max length and total number of lines.
// It will return a list of strings to the caller.
func CheckInputData(input string) ([]string, error) {
	if len(input) > defaultLength {
		return nil, fmt.Errorf("Input data is over the max length. Given: [%d], Max: [%d]",
			len(input), defaultLength)
	}
	data := strings.Split(input, defaultSeparator)
	if len(data) > defaultMaxLines {
		return nil, fmt.Errorf("Input data is over the max lines. Given: [%d], Max: [%d]",
			len(data), defaultMaxLines)
	}
	return data, nil
}
