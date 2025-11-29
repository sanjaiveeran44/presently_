
import React, { useState } from 'react';
import LeftMenu from '../components/LeftMenu';
import CenterContainer from '../components/CenterContainer';
import RightPanel from '../components/RightPanel';
import LandingNavbar from '../components/LandingNavbar';
import Footer from '../components/LandingFooter';
import './homePage.css';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  return (
    <div className="home-page">
      <div className="animated-background">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <LandingNavbar showMenuButton={true} setIsMenuOpen={setIsMenuOpen} />
      
      <div className="home-content">
        <LeftMenu 
          isOpen={isMenuOpen} 
          onClose={() => setIsMenuOpen(false)}
          onOpenChat={handleOpenChat}
        />
        
        <CenterContainer isMenuOpen={isMenuOpen} isChatOpen={isChatOpen} />
        
        <RightPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>

      <Footer/>
    </div>
  );
};

export default Home;