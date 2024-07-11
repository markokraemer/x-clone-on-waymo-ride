// This is a mock WebSocket implementation for demonstration purposes
// In a real application, you would use the actual WebSocket API or a library like socket.io

class MockWebSocket {
  constructor(url) {
    this.url = url;
    this.onmessage = null;
    this.onopen = null;
    this.onclose = null;
    this.onerror = null;

    // Simulate connection after a short delay
    setTimeout(() => {
      if (this.onopen) {
        this.onopen({ type: 'open' });
      }
    }, 100);
  }

  send(data) {
    console.log('MockWebSocket sent:', data);
    // Simulate receiving a message after sending
    setTimeout(() => {
      if (this.onmessage) {
        this.onmessage({ data: 'Received: ' + data });
      }
    }, 200);
  }

  close() {
    if (this.onclose) {
      this.onclose({ type: 'close' });
    }
  }
}

export const createWebSocket = (url) => {
  return new MockWebSocket(url);
};

export const useWebSocket = (url) => {
  const socket = createWebSocket(url);

  const sendMessage = (message) => {
    socket.send(JSON.stringify(message));
  };

  return {
    socket,
    sendMessage,
  };
};

export default useWebSocket;