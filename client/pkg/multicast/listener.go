// Licensed under the MIT license. See LICENSE file in the project root for full license information.

package multicast

import (
	"fmt"
	"net"
)

// Listen sets the UDPConn max datagram size and writes packets received
// to a buffer then generic hander. Returns error
func (c *Client) Listen(handler func(*net.UDPAddr, int, []byte)) error {

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
		go handler(src, numBytes, buffer)
	}
	return nil
}
