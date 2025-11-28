import React from "react";
import "./RightPanel.css";

const RightPanel = ({ isChatOpen, setIsChatOpen }) => {
  return (
    <div className={`right-panel ${isChatOpen ? "open" : ""}`}>
      <div className="panel-header">
        <h3>Chat Assistant</h3>
        <button className="close-btn" onClick={() => setIsChatOpen(false)}>
          ✖
        </button>
      </div>

      <div className="chat-content">
        {/* chat UI goes here */}
      </div>
    </div>
  );
};

export default RightPanel;
