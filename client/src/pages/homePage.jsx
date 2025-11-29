import React, { useState } from 'react';
import LeftMenu from '../components/LeftMenu';
import CenterContainer from '../components/CenterContainer';
import RightPanel from '../components/RightPanel';
import Navbar from '../components/LandingNavbar';
import Footer from '../components/LandingFooter';
import './homePage.css';


const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="home-container">
      <Navbar showMenuButton={true} setIsMenuOpen={setIsMenuOpen} setIsChatOpen={setIsChatOpen}/>
      <div className="main-content">
        <LeftMenu 
          setIsChatOpen={setIsChatOpen}
          setIsMenuOpen={setIsMenuOpen}
          isMenuOpen={isMenuOpen}
        />
        
        <CenterContainer
          isMenuOpen={isMenuOpen} 
          isChatOpen={isChatOpen}
        />
        
        <RightPanel 
          setIsChatOpen={setIsMenuOpen} 
          isChatOpen={isChatOpen}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Home;