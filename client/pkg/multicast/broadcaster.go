// Licensed under the MIT license. See LICENSE file in the project root for full license information.

package multicast

import (
	log "github.com/sirupsen/logrus"
	"time"
)

const (
	secondsToSleep = 1
)

// Ping continuously writes to the client connetion interface and sleeps. Returns error
func (c *Client) Ping(b []byte) error {
	for {
		c.Conn.Write(b)
		log.Debugf("Broadcasted: net '%s', address '%s', ifName '%s', raw '%s'",
			c.Net, c.Address, c.IfName, b)
		time.Sleep(secondsToSleep * time.Second)
	}
	return nil
}

// Broadcast writes to the client connetion interface and sleeps. Returns error
func (c *Client) Broadcast(b []byte) error {
	c.Conn.Write(b)
	log.Debugf("Broadcasted: net '%s', address '%s', ifName '%s', raw '%s'",
		c.Net, c.Address, c.IfName, b)
	c.Counter.totalBroadcastedMessages++
	return nil
}
