
import React, { useState } from 'react';
import './CenterContainer.css';
import './RightPanel.css';

const CenterContainer = ({ isMenuOpen, isChatOpen ,slides}) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [totalSlides] = useState(5);
  const [gotoValue, setGotoValue] = useState('');
  
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
           {slides.length > 0 ? (
            <>
              <img
                src={slides[currentSlide - 1]}
                alt={`Slide ${currentSlide}`}
                className="slide-image"
              />
            </>
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
export default CenterContainer;