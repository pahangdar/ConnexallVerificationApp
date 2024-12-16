let ws;
const connectToWebSocket = (onMessage) => {
  ws = new WebSocket('ws://localhost:8080'); // Replace with your WebSocket server URL

  ws.onopen = () => {
    console.log('WebSocket connected');
    ws.send(JSON.stringify({ type: 'request_id', appType: 'react' }));
  };

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    onMessage(message);
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  ws.onclose = () => {
    console.log('WebSocket connection closed');
  };

  return ws;
};

const sendMessage = (message) => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(message));
  }
};

export { connectToWebSocket, sendMessage };
