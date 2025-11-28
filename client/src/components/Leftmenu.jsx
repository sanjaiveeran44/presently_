import React, { useState, useRef } from "react";
import "./LeftMenu.css";

export default function LeftMenu({ totalSlides = 10 , isChatOpen , setIsChatOpen }) {
  const [active, setActive] = useState(1);
  const fileInput = useRef();
    
  const handleUploadClick = () => {
    fileInput.current.click();
  };
  

  // Dynamic slide list
  const slides = Array.from({ length: totalSlides }, (_, i) => i + 1);

  return (
    <div className="left-menu-container">
      
      {/* LOGO */}
      <div className="lm-logo">
        <span className="logo-p">P</span>resently
      </div>

      {/* UPLOAD SECTION */}
      <div className="lm-upload">
        <button className="upload-btn" onClick={handleUploadClick}>
          Upload Slides
        </button>
        <input
          type="file"
          accept=".ppt,.pptx,.pdf"
          ref={fileInput}
          style={{ display: "none" }}
        />
      </div>

      {/* SLIDES LIST */}
      <div className="lm-slides-title">Slides</div>

      <div className="lm-slides-list">
        {slides.map((num) => (
          <div
            key={num}
            className={`slide-thumb ${active === num ? "active" : ""}`}
            onClick={() => setActive(num)}
          >
            Slide {num}
          </div>
        ))}
      </div>

      {/* TOOLS */}
      <div className="lm-tools-title">Tools</div>

      <div className="lm-tools">
        <button className="tool-btn">Generate Quiz</button>
        <button className="tool-btn">AI Summarize</button>
        <button className="tool-btn" onClick={() => setIsChatOpen(true)}>Open Chat Panel</button>
      </div>

      {/* FOOTER */}
      <div className="lm-footer">
        <span>Settings</span>
        <span>Help</span>
        <span>Logout</span>
      </div>

    </div>
  );
}
