const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const rateLimit = require('express-rate-limit');

const app = express();
const server = http.createServer(app);
//remove CORS
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

// Initialize counts for Image 1 and Image 2
let countImage1 = 0;
let countImage2 = 0;

io.on('connection', (socket) => {
  // Send the current counts to the newly connected client
  socket.emit('updateCount', { image1: countImage1, image2: countImage2 });

  // Listen for 'click' events from clients and broadcast the updated counts to all clients

  socket.on('click', (image) => {
    if (image === 'image1') {
    
      countImage1 += 1;

    } else if (image === 'image2') {
      countImage2 += 1;
    }

    io.emit('updateCount', { image1: countImage1, image2: countImage2 });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
