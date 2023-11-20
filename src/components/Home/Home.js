// Home.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Home = ({ imageId }) => {
  const [count, setCount] = useState(0);
  const socket = io('http://192.168.1.87:3000');

  // Expose the socket instance as a static property
  Home.socket = socket;

  useEffect(() => {
    const handleUpdateCount = ({ image1, image2 }) => {
      setCount((prevCount) => {
        return imageId === 'image1' ? image1 : imageId === 'image2' ? image2 : prevCount;
      });
    };

    // Listen for 'updateCount' events from the server
    socket.on('updateCount', handleUpdateCount);

    // Clean up the socket connection when the component is unmounted
    return () => {
      socket.off('updateCount', handleUpdateCount);
      socket.disconnect();
    };
  }, [socket, imageId]);

  const handleClick = () => {
    // Emit a 'click' event to the server with the corresponding imageId
    //console.log("clicking");
    socket.emit('click', imageId);
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer', textAlign: 'center' }}>
       <img
        src={process.env.PUBLIC_URL + (imageId === 'image1' ? 'Israel_Flag.png' : 'Palestine_Flag.png')}
        alt={`Description of Image ${imageId}`}
        style={{
          width: imageId === 'image1' ? '52%' : '60%',
          height: 'auto',
          userSelect: 'none',
          marginTop: '200px' // Add margin to the top
        }}
      />
      <p style={{ userSelect: 'none' ,  padding: '40px 0' }}>Clicks: {count}</p>
    </div>
  );
};

export default Home;
