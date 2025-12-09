
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
  const [slides, setSlides] = useState([]);
  const [loadingSlides, setLoadingSlides] = useState(false);

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };
  const handleUploadFromMenu = async (file) => {
  try {
    setLoadingSlides(true);

    const formData = new FormData();
    formData.append("ppt", file);

    const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.slides && Array.isArray(data.slides)) {
      setSlides(data.slides); 
      console.log(data.json);
      console.log("Slides uploaded successfully:", data.slides); 
    } else {
      console.error("Backend did not return slides.");
    }
  } catch (err) {
    console.error("Upload failed:", err);
  } finally {
    setLoadingSlides(false);
  }
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
          onFileUpload={handleUploadFromMenu}
          slides={slides}
        />
        
        <CenterContainer isMenuOpen={isMenuOpen} isChatOpen={isChatOpen} slides={slides} loadingSlides={loadingSlides}/>
        
        <RightPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} slides={slides}/>
      </div>

      <Footer/>
    </div>
  );
};

export default Home;