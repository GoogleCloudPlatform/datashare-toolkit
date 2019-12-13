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
	"cloud.google.com/go/pubsub"
	"fmt"
	"github.com/GoogleCloudPlatform/bq-datashare-toolkit/client/internal/pubsubutil"
	log "github.com/sirupsen/logrus"
	"net"
	"strings"
)

const (
	maxDatagramSize = 4096
)

// Create Conn binds to the UDP network with address:port and returns Connection or error
func CreateConn(network, address, ifName string) (*net.UDPConn, error) {

	addr, err := net.ResolveUDPAddr(network, address)
	if err != nil {
		return nil, fmt.Errorf("net.ResolveUDPAddr: %s", err)
	}

	ifi, err := net.InterfaceByName(ifName)
	if err != nil {
		return nil, fmt.Errorf("net.InterfaceByName: %s", err)
	}

	conn, err := net.ListenMulticastUDP(network, ifi, addr)
	if err != nil {
		return nil, fmt.Errorf("net.ListenMulticastUDP: %s", err)
	}

	log.Debugf("Multicast Listener created: network '%s', address '%s', ifName '%s'",
		network, address, ifName)
	return conn, nil
}

// Listen sets the UDPConn max datagram size and writes packets received
// to a buffer then generic hander. Returns error
func Listen(conn *net.UDPConn, handler func(*net.UDPAddr, int, []byte)) error {

	conn.SetReadBuffer(maxDatagramSize)

	for {
		buffer := make([]byte, maxDatagramSize)
		numBytes, src, err := conn.ReadFromUDP(buffer)
		if err != nil {
			return fmt.Errorf("conn.ReadFromUDP: %s", err)
		}
		handler(src, numBytes, buffer)
	}
	return nil
}

// ListenAndPublish sets the UDPConn max datagram size and writes packets received
// to a buffer then PubSub hander. Returns error
func ListenAndPublish(conn *net.UDPConn, topic *pubsub.Topic) error {

	conn.SetReadBuffer(maxDatagramSize)

	for {
		buffer := make([]byte, maxDatagramSize)
		numBytes, src, err := conn.ReadFromUDP(buffer)
		if err != nil {
			return fmt.Errorf("conn.ReadFromUDP: %s", err)
		}
		// publish the messages
		raw := string(buffer[:numBytes])
		raw = strings.TrimSuffix(raw, "\n")
		// TODO add source as custom metadata
		log.Debugf("src: '%v', raw: '%s'", src, raw)
		_, err = pubsubutil.PublishMessage(topic, raw)
		if err != nil {
			return fmt.Errorf("pubsubutil.PublishMessage: %s", err.Error())
		}
	}
	return nil
}
