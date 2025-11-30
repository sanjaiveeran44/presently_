import { useState ,useEffect, useRef} from "react";
import './Leftmenu.css'
const LeftMenu = ({ isOpen, onClose, onOpenChat, onFileUpload, slides }) => {
  const [Slides] = useState([
    { id: 1, name: "Introduction.pptx", pages: 12 },
    { id: 2, name: "Market Analysis.pptx", pages: 8 },
    { id: 3, name: "Product Demo.pptx", pages: 15 }
  ]);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <>
      <div className={`menu-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>
      <div className={`left-menu ${isOpen ? 'open' : ''}`}>
        <div className="menu-header">
          <div className="menu-logo">
            <svg className="menu-logo-icon" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="menuLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff6600" />
                  <stop offset="50%" stopColor="#ffaa44" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
              </defs>
              <path 
                d="M 10 40 L 10 10 L 25 10 Q 40 10 40 22 Q 40 34 25 34 L 15 34" 
                fill="url(#menuLogoGradient)" 
                strokeWidth="0"
              />
              <circle cx="15" cy="38" r="2" fill="url(#menuLogoGradient)" />
            </svg>
            <span className="menu-logo-text">Presently</span>
          </div>
          <button className="menu-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="menu-content">
          {/* Upload Slides */}
          <button 
            className="upload-slides-btn" 
            onClick={() => fileInputRef.current.click()}
          >
            <span className="btn-icon">📤</span>
            Upload Slides
          </button>

          <input
            type="file"
            accept=".ppt,.pptx,.pdf"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={(e) => {
              if (e.target.files[0]) {
                onFileUpload(e.target.files[0]);
              }
            }}
          />

          <div className="menu-section">
            <h3 className="menu-section-title">Your Slides</h3>
            <div className="slides-list">
              {Slides.map(slide => (
                <div key={slide.id} className="slide-item">
                  <div className="slide-icon">📄</div>
                  <div className="slide-info">
                    <div className="slide-name">{slide.name}</div>
                    <div className="slide-pages">{slide.pages} pages</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="menu-section">
            <h3 className="menu-section-title">Tools</h3>
            <div className="tools-list">
              <button className="tool-btn">
                <span className="tool-icon">📝</span>
                <span className="tool-text">Generate Quiz</span>
              </button>
              <button className="tool-btn">
                <span className="tool-icon">✨</span>
                <span className="tool-text">AI Summarize</span>
              </button>
              <button className="tool-btn" onClick={onOpenChat}>
                <span className="tool-icon">💬</span>
                <span className="tool-text">Open Chat Panel</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LeftMenu;