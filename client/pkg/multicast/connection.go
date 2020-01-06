// Licensed under the MIT license. See LICENSE file in the project root for full license information.

package multicast

import (
	"cloud.google.com/go/pubsub"
	"fmt"
	"github.com/GoogleCloudPlatform/bq-datashare-toolkit/client/internal/pubsubutil"
	log "github.com/sirupsen/logrus"
	"net"
)

const (
	maxDatagramSize = 4096
)

// Client for Multicast
type Client struct {
	// UDP multicast address in <HOST:PORT> format
	Address string
	// UDP multicast interface name
	IfName string
	// UDP multicast network type name: "udp", "udp4" (IPv4-only), "udp6" (IPv6-only)
	Net string

	// Connection instance
	Conn *net.UDPConn
	// PubSub Topic instance
	Topic *pubsub.Topic
}

// Create Listener Conn binds to the Client UDP network with address:port and returns Listener connection or error
func (c *Client) CreateListenerConn() error {

	addr, err := net.ResolveUDPAddr(c.Net, c.Address)
	if err != nil {
		return fmt.Errorf("net.ResolveUDPAddr: %s", err)
	}

	ifi, err := net.InterfaceByName(c.IfName)
	if err != nil {
		return fmt.Errorf("net.InterfaceByName: %s", err)
	}

	conn, err := net.ListenMulticastUDP(c.Net, ifi, addr)
	if err != nil {
		return fmt.Errorf("net.ListenMulticastUDP: %s", err)
	}

	log.Debugf("Multicast Listener connection created: net '%s', address '%s', ifName '%s'",
		c.Net, c.Address, c.IfName)
	c.Conn = conn
	return nil
}

// Create Broadcaster Conn binds to the Client UDP network with address:port and returns Broadcaster connection or error
func (c *Client) CreateBroadcasterConn() error {

	addr, err := net.ResolveUDPAddr(c.Net, c.Address)
	if err != nil {
		return fmt.Errorf("net.ResolveUDPAddr: %s", err)
	}

	// TODO Add IfName option for broadcaster
	//ifi, err := net.InterfaceByName(c.IfName)
	//if err != nil {
	//return fmt.Errorf("net.InterfaceByName: %s", err)
	//}

	conn, err := net.DialUDP(c.Net, nil, addr)
	if err != nil {
		return fmt.Errorf("net.DialUDP: %s", err)
	}

	log.Debugf("Multicast Broadcaster connection created: net '%s', address '%s', ifName '%s'",
		c.Net, c.Address, c.IfName)
	c.Conn = conn
	return nil
}

// Create Topic creates a topic client to connect
func (c *Client) CreateTopicClient(projectID, topicID string) error {
	topic, err := pubsubutil.CreateTopicClient(projectID, topicID)
	if err != nil {
		return fmt.Errorf("pubsubutil.CreateTopicClient: %s", err)
	}
	c.Topic = topic
	return nil
}
