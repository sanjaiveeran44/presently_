import React from 'react';
import './LandingNavbar.css';

const LandingNavbar = ({ showMenuButton = false, setIsMenuOpen }) => {
  return (
    <nav className="landing-navbar">
      <div className="navbar-container">
        <div className="navbar-left">
         
          {showMenuButton && (
            <button className="hamburger-btn" onClick={() => setIsMenuOpen(true)}>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          )}

        
          <div className="navbar-logo">
            <svg className="logo-icon" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff6600" />
                  <stop offset="50%" stopColor="#ffaa44" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
              </defs>

              <path 
                d="M 10 40 L 10 10 L 25 10 Q 40 10 40 22 Q 40 34 25 34 L 15 34" 
                fill="url(#logoGradient)" 
                strokeWidth="0"
              />
              <circle cx="15" cy="38" r="2" fill="url(#logoGradient)" />
            </svg>

            <span className="logo-text">
              <span className="logo-presently">Presently</span>
              <span className="logo-ai">AI</span>
            </span>
          </div>
        </div>

        <ul className="navbar-links">
          <li><a href="#home" className="nav-link">Home</a></li>
          <li><a href="#features" className="nav-link">Features</a></li>
          <li><a href="#about" className="nav-link">About</a></li>
          <li><a href="#contact" className="nav-link">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default LandingNavbar;