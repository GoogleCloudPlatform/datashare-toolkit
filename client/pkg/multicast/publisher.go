// Licensed under the MIT license. See LICENSE file in the project root for full license information.

package multicast

import (
	"fmt"
	"github.com/GoogleCloudPlatform/datashare-toolkit/client/internal/pubsubutil"
	log "github.com/sirupsen/logrus"
	"strings"
)

// Publish sets the UDPConn max datagram size and writes packets received
// to a PubSub Topic. Returns error
func (c *Client) Publish() error {

	if err := c.Conn.SetReadBuffer(c.ReadBufferBytes); err != nil {
		return fmt.Errorf("c.Conn.SetReadBuffer: %s", err)
	}

	for {
		buffer := make([]byte, maxDatagramSize)
		numBytes, _, err := c.Conn.ReadFromUDP(buffer)
		if err != nil {
			return fmt.Errorf("c.Conn.ReadFromUDP: %s", err)
		}
		c.Counter.totalReceivedMessages++
		// publish the messages in routine
		raw := buffer[:numBytes]
		// TODO add source as custom metadata
		if res := pubsubutil.PublishMessage(c.Topic, raw); res == nil {
			return fmt.Errorf("pubsubutil.PublishMessage did not have a response")
		}
		// TODO add Ready state in routine to check message id success
		c.Counter.totalPublishedMessages++
	}
	return nil
}

// PublishS sets the UDPConn max datagram size and writes packets received
// as string to a PubSub Topic . Returns error
func (c *Client) PublishS() error {

	if err := c.Conn.SetReadBuffer(c.ReadBufferBytes); err != nil {
		return fmt.Errorf("c.Conn.SetReadBuffer: %s", err)
	}

	for {
		buffer := make([]byte, maxDatagramSize)
		numBytes, src, err := c.Conn.ReadFromUDP(buffer)
		if err != nil {
			return fmt.Errorf("c.Conn.ReadFromUDP: %s", err)
		}
		c.Counter.totalReceivedMessages++
		log.Debugf("'%d' bytes read from '%s'", numBytes, src)
		// publish the messages
		raw := string(buffer[:numBytes])
		raw = strings.TrimSuffix(raw, "\n")
		// TODO add source as custom metadata
		_, err = pubsubutil.PublishMessageS(c.Topic, raw)
		if err != nil {
			return fmt.Errorf("pubsubutil.PublishMessage: %s", err.Error())
		}
		c.Counter.totalPublishedMessages++
	}
	return nil
}
