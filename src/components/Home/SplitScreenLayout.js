// SplitScreenLayout.js
import React, { useState } from 'react';
import './SplitScreenLayout.css';
import Home from './Home'; // Assuming you have a Home component

const SplitScreenLayout = () => {
  const [leftPanelPadding, setLeftPanelPadding] = useState(0);
  const [rightPanelPadding, setRightPanelPadding] = useState(0);

  const handleLeftPanelClick = () => {
    setLeftPanelPadding((prevPadding) => Math.min(prevPadding + 5, 50));
    setRightPanelPadding((prevPadding) => 50 - leftPanelPadding);
  };

  const handleRightPanelClick = () => {
    setRightPanelPadding((prevPadding) => Math.min(prevPadding + 5, 50));
    setLeftPanelPadding((prevPadding) => 50 - rightPanelPadding);
  };

  return (
    <div className="split-screen-container">
      <div className="left-panel" style={{ paddingLeft: `${leftPanelPadding}%` }}>
        <Home imageId="image1" onClick={handleLeftPanelClick} />
      </div>
      <div className="right-panel" style={{ paddingRight: `${rightPanelPadding}%` }}>
        <Home imageId="image2" onClick={handleRightPanelClick} />
      </div>

    </div>
  );
};

export default SplitScreenLayout;
