import React, { useState } from 'react';
import './Leftmenu.css';

// LeftMenu Component
const LeftMenu = ({ isOpen, onClose, onOpenChat }) => {
  const slides = ['Slide 1: Introduction', 'Slide 2: Overview', 'Slide 3: Details'];

  return (
    <div className={`left-menu ${isOpen ? 'open' : 'closed'}`}>
      <div className="left-menu-header">
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>
      
      <div className="left-menu-content">
        <button className="upload-btn">Upload Slides</button>
        
        <div className="slides-section">
          <h3>Slides</h3>
          <div className="slides-list">
            {slides.map((slide, index) => (
              <div key={index} className="slide-item">
                {slide}
              </div>
            ))}
          </div>
        </div>
        
        <div className="tools-section">
          <h3>Tools</h3>
          <button className="tool-btn">Generate Quiz</button>
          <button className="tool-btn">AI Summarize</button>
          <button className="tool-btn" onClick={onOpenChat}>Open Chat Panel</button>
        </div>
      </div>
    </div>
  );
};

export default LeftMenu;
