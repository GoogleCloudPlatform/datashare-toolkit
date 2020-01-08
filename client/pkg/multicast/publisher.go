// Licensed under the MIT license. See LICENSE file in the project root for full license information.

package multicast

import (
	"fmt"
	"github.com/GoogleCloudPlatform/bq-datashare-toolkit/client/internal/pubsubutil"
	log "github.com/sirupsen/logrus"
	"strings"
)

// Publish sets the UDPConn max datagram size and writes packets received
// to a PubSub Topic. Returns error
func (c *Client) Publish() error {

	c.Conn.SetReadBuffer(maxDatagramSize)

	for {
		buffer := make([]byte, maxDatagramSize)
		numBytes, src, err := c.Conn.ReadFromUDP(buffer)
		if err != nil {
			return fmt.Errorf("c.Conn.ReadFromUDP: %s", err)
		}
		log.Debugf("'%d' bytes read from '%s'", numBytes, src)
		// publish the messages
		raw := buffer[:numBytes]
		// TODO add source as custom metadata
		_, err = pubsubutil.PublishMessage(c.Topic, raw)
		if err != nil {
			return fmt.Errorf("pubsubutil.PublishMessage: %s", err.Error())
		}
		c.Counter.totalPublishedMessages++
	}
	return nil
}

// PublishS sets the UDPConn max datagram size and writes packets received
// as string to a PubSub Topic . Returns error
func (c *Client) PublishS() error {

	c.Conn.SetReadBuffer(maxDatagramSize)

	for {
		buffer := make([]byte, maxDatagramSize)
		numBytes, src, err := c.Conn.ReadFromUDP(buffer)
		if err != nil {
			return fmt.Errorf("c.Conn.ReadFromUDP: %s", err)
		}
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
