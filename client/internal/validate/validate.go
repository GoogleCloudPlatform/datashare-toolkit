/*
  pyright © 2019 Chris Page <chrispage@google.com>

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
package validate

import (
	log "github.com/sirupsen/logrus"
	"strings"
)

const (
	defaultSeparator = `n`
	defaultLength    = 4096
	defaultMaxLines  = 2
)

/*
	Check the input data for max length and total number of lines
*/
func CheckInputData(input string) []string {
	if len(input) > defaultLength {
		log.Fatalf("Input data is over the max length. Given: [%d], Max: [%d]", len(input), defaultLength)
	}
	temp := strings.Split(input, defaultSeparator)
	if len(temp) > defaultMaxLines {
		log.Fatalf("Input data is over the max number of lines. Given: [%d], Max: [%d]", len(temp), defaultMaxLines)
	}
	return temp
}
