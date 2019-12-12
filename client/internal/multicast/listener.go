/*
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
package multicast

import (
	"fmt"
	log "github.com/sirupsen/logrus"
	"net"
)

const (
	maxDatagramSize = 8192
)

// Listen binds to the UDP network with address:port and writes packets received
// to a buffer then hander. Returns error
func Listen(network, address string, handler func(*net.UDPAddr, int, []byte)) error {

	addr, err := net.ResolveUDPAddr(network, address)
	if err != nil {
		return fmt.Errorf("net.ResolveUDPAddr: %s", err)
	}

	conn, err := net.ListenMulticastUDP(network, nil, addr)
	if err != nil {
		return fmt.Errorf("net.ListenMulticastUDP: %s", err)
	}

	conn.SetReadBuffer(maxDatagramSize)

	log.Debugf("Multicast Listener running for network '%s', address '%s'", network, address)
	for {
		buffer := make([]byte, maxDatagramSize)
		numBytes, src, err := conn.ReadFromUDP(buffer)
		if err != nil {
			return fmt.Errorf("conn.ReadFromUDP: %s", err)
		}
		handler(src, numBytes, buffer)
	}
}
