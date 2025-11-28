import React, { useState } from 'react';
import './CenterContainer.css';

const CenterContainer = ({ isMenuOpen, isChatOpen }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 10;

  const handlePrev = () => {
    if (currentSlide > 1) setCurrentSlide(currentSlide - 1);
  };

  const handleNext = () => {
    if (currentSlide < totalSlides) setCurrentSlide(currentSlide + 1);
  };

  return (
    <div className={`center-section ${isMenuOpen ? 'menu-open' : ''} ${isChatOpen ? 'chat-open' : ''}`}>
      <div className="slide-viewer">
        <div className="slide-preview">
          <div className="slide-content">
            <h2>Slide {currentSlide}</h2>
            <p>Your presentation content appears here</p>
          </div>
        </div>
        
        <div className="slide-controls">
          <button className="control-btn" onClick={handlePrev} disabled={currentSlide === 1}>
            ← Prev
          </button>
          <span className="slide-counter">{currentSlide} / {totalSlides}</span>
          <button className="control-btn" onClick={handleNext} disabled={currentSlide === totalSlides}>
            Next →
          </button>
        </div>
        
        <button className="voice-mode-btn">
          🎤 Voice Mode
        </button>
      </div>
    </div>
  );
};


export default CenterContainer;