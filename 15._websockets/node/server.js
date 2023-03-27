import { WebSocketServer } from 'ws';

const server = new WebSocketServer({ port: 8080 });

server.on('connection', (ws) => {
  console.log('new connection', server.clients.size);

  ws.on('message', (message) => {
    console.log(message);
    server.clients.forEach((client) =>
      client.send(`a message was sent: ${message}`)
    );
  });
});
