import React, { useState } from 'react';
import LeftMenu from '../components/LeftMenu';
import CenterContainer from '../components/CenterContainer';
import RightPanel from '../components/RightPanel';
import './homePage.css';


const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="navbar-left">
          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className="logo">
            <span className="logo-p">P</span>
            <span className="logo-text">resently</span>
          </div>
        </div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
        </div>
      </nav>

      <div className="main-content">
        <LeftMenu 
          isOpen={isMenuOpen} 
          onClose={() => setIsMenuOpen(false)}
          onOpenChat={() => setIsChatOpen(true)}
        />
        
        <CenterContainer
          isMenuOpen={isMenuOpen} 
          isChatOpen={isChatOpen}
        />
        
        <RightPanel 
          isOpen={isChatOpen} 
          onClose={() => setIsChatOpen(false)}
        />
      </div>
      
      
    </div>
  );
};

export default Home;