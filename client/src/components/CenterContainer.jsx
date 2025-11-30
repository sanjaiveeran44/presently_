import React, { useState, useEffect } from 'react';
import './CenterContainer.css';
import './RightPanel.css';
import SlideLoader from "../components/SlideLoader";

const CenterContainer = ({ isMenuOpen, isChatOpen, slides = [] , loadingSlides}) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [totalSlides, setTotalSlides] = useState(slides.length);
  const [gotoValue, setGotoValue] = useState('');
  
  useEffect(() => {
    setTotalSlides(slides.length);
    setCurrentSlide(1);
  }, [slides]);
  
  const handlePrevious = () => {
    setCurrentSlide(prev => Math.max(1, prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide(prev => Math.min(totalSlides, prev + 1));
  };

  const handleGoto = () => {
    const num = parseInt(gotoValue);
    if (num >= 1 && num <= totalSlides) {
      setCurrentSlide(num);
      setGotoValue('');
    }
  };

  return (
    <div className={`center-section ${isMenuOpen ? 'menu-open' : ''} ${isChatOpen ? 'chat-open' : ''}`}>
      <div className="slide-viewer">
        <div className="slide-content">
           {loadingSlides ? (
            <SlideLoader />
           ) : slides.length > 0 ? (
          <img
            src={slides[currentSlide - 1]}
            alt={`Slide ${currentSlide}`}
            className="slide-image"
          />
        ) : (
          <div className="slide-placeholder">
            <div className="slide-number-display">Upload Slides</div>
            <p className="slide-subtitle">No slides yet</p>
          </div>
        )}

        </div>
      </div>

      <div className="slide-controls">
        <div className="control-group">
          <button className="control-btn" onClick={handlePrevious} disabled={currentSlide === 1}>
            <span className="btn-icon">◀</span>
            Previous
          </button>
          <div className="slide-indicator">
            {currentSlide} / {totalSlides}
          </div>
          <button className="control-btn" onClick={handleNext} disabled={currentSlide === totalSlides}>
            Next
            <span className="btn-icon">▶</span>
          </button>
        </div>

        <div className="control-group secondary">
          <div className="goto-group">
            <input 
              type="number" 
              className="goto-input" 
              placeholder="Go to..."
              value={gotoValue}
              onChange={(e) => setGotoValue(e.target.value)}
              min="1"
              max={totalSlides}
            />
            <button className="goto-btn" onClick={handleGoto}>Go</button>
          </div>
          <button className="control-btn icon-btn" title="Voice Mode">
            <span className="btn-icon">🎤</span>
          </button>
          <button className="control-btn icon-btn" title="Auto-play">
            <span className="btn-icon">▶️</span>
          </button>
          <button className="control-btn icon-btn" title="Laser Pointer">
            <span className="btn-icon">🔴</span>
          </button>
        </div>
      </div>
    </div>
  );
};
CenterContainer.defaultProps = {
  slides: [],
  isMenuOpen: false,
  isChatOpen: false
};

export default CenterContainer;