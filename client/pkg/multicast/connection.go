// Licensed under the MIT license. See LICENSE file in the project root for full license information.

package multicast

import (
	"cloud.google.com/go/pubsub"
	"fmt"
	"github.com/GoogleCloudPlatform/datashare-toolkit/client/internal/pubsubutil"
	log "github.com/sirupsen/logrus"
	"net"
	"os"
	"os/signal"
	"syscall"
)

const (
	maxDatagramSize = 4096
)

// Message Counter
type Counter struct {
	// total number of broadcasted messages
	totalBroadcastedMessages uint
	// total number of received messages
	totalReceivedMessages uint
	// total number of published messages
	totalPublishedMessages uint
}

// Client for Multicast
type Client struct {
	// UDP multicast address in <HOST:PORT> format
	Address string
	// UDP multicast interface name
	IfName string
	// UDP multicast network type name: "udp", "udp4" (IPv4-only), "udp6" (IPv6-only)
	Net string
	// Size of the operating system's receive buffer associated with the connection.
	ReadBufferBytes int

	// Connection instance
	Conn *net.UDPConn
	// PubSub Topic instance
	Topic *pubsub.Topic

	// Message counter
	Counter
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
func (c *Client) CreateTopicClient(projectID, topicName string) error {
	topic, err := pubsubutil.CreateTopicClient(projectID, topicName)
	if err != nil {
		return fmt.Errorf("pubsubutil.CreateTopicClient: %s", err)
	}
	c.Topic = topic
	return nil
}

// SetupCloseHandler creates a 'listener' on a new goroutine which will notify the
// program if it receives an interrupt from the OS. We then handle this by calling
// our clean up procedure and exiting the program.
func (c *Client) SetupCloseHandler() {
	channel := make(chan os.Signal, 2)
	signal.Notify(channel, os.Interrupt, syscall.SIGTERM)
	go func() {
		<-channel
		log.Warnln("\r- Ctrl+C pressed in Terminal")
		c.LogCounter()
		os.Exit(0)
	}()
}

// Return the Client Counter totals
func (c *Client) LogCounter() {
	log.Infof("Counter: %+v\n", c.Counter)
}
