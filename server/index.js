const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});


let count = 0;

io.on('connection', (socket) => {
  // Send the current count to the newly connected client
  socket.emit('updateCount', count);

  // Listen for 'click' events from clients and broadcast the updated count to all clients
  socket.on('click', () => {
    count += 1;
    io.emit('updateCount', count);
  });
});



const PORT = process.env.PORT || 3000;
server.listen(PORT,'0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
