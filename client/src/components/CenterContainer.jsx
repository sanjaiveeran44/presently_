import React from "react";
import "./CenterContainer.css";

export default function CenterContainer({isChatOpen, setIsChatOpen}) {
  return (
    <div className="center-container">

      {/* TOP TOOLBAR */}
      <div className="cc-top-toolbar">
        <button className="cc-tool-btn">Fullscreen</button>
        <button className="cc-tool-btn">Zoom In</button>
        <button className="cc-tool-btn">Zoom Out</button>
      </div>

      {/* SLIDE VIEWER */}
      <div className="cc-slide-viewer">
        <div className="slide-preview-box">
          {/* Later we display actual slide here */}
          <p className="slide-preview-text">Slide Preview Area</p>
        </div>
      </div>

      {/* BOTTOM CONTROL SECTION */}
      <div className="cc-bottom-controls">

        <div className="nav-buttons">
          <button className="nav-btn">◀ Prev</button>
          <button className="nav-btn">Next ▶</button>
        </div>

        <div className="voice-status">
          Listening / AI Commands status shows here...
        </div>

        <div className="slide-number-box">
          Slide: <span>1</span> / <span>10</span>
        </div>

      </div>

    </div>
  );
}
