import WebSocket from 'ws';

const webSocketClient = new WebSocket('ws://localhost:8080');

webSocketClient.onopen = () => {
  console.log('connected to server');
  webSocketClient.send('hello from client');
};
