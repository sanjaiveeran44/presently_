import React from 'react';
import './SlideLoader.css';

const SlideLoader = () => {
  return (
    <div className="slide-loader-overlay">
      <div className="slide-loader-content">
        <div className="loader-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring-inner"></div>
        </div>
        <div className="loader-text-container">
          <h3 className="loader-text">Converting Your Slides…</h3>
          <p className="loader-subtext">This may take a few seconds</p>
        </div>
      </div>
    </div>
  );
};

export default SlideLoader;