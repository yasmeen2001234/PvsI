import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const ImageWithNumber = () => {
  const [count, setCount] = useState(0);
  const socket = io('http://localhost:3000'); // Replace with your server's address

  useEffect(() => {
    // Listen for 'updateCount' events from the server
    socket.on('updateCount', (newCount) => {
      setCount(newCount);
    });

    // Clean up the socket connection when the component is unmounted
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const handleClick = () => {
    // Emit a 'click' event to the server
    socket.emit('click');
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img
        src={process.env.PUBLIC_URL + 'PalestineFlag.png'}
        alt="Description of the image"
        style={{ width: '50%', height: 'auto' }}
      />
      <p>Number: {count}</p>
    </div>
  );
};

export default ImageWithNumber;
