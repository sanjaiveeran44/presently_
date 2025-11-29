
import '../pages/landingPage.css';
const LandingFooter = () => {
  return (
    <footer className="landing-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section footer-brand">
            <div className="footer-logo">
              <svg className="logo-icon" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="footerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff6600" />
                    <stop offset="50%" stopColor="#ffaa44" />
                    <stop offset="100%" stopColor="#ffffff" />
                  </linearGradient>
                </defs>
                <path 
                  d="M 10 40 L 10 10 L 25 10 Q 40 10 40 22 Q 40 34 25 34 L 15 34" 
                  fill="url(#footerLogoGradient)" 
                  strokeWidth="0"
                />
                <circle cx="15" cy="38" r="2" fill="url(#footerLogoGradient)" />
              </svg>
              <span className="footer-logo-text">Presently AI</span>
            </div>
            <p className="footer-description">
              Elevate your presentations with the power of artificial intelligence. 
              Create, collaborate, and captivate your audience effortlessly.
            </p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#about">About Us</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Resources</h4>
            <ul className="footer-links">
              <li><a href="#docs">Documentation</a></li>
              <li><a href="#tutorials">Tutorials</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#support">Support</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Connect</h4>
            <div className="footer-social">
              <a href="#twitter" className="social-link">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
              </a>
              <a href="#linkedin" className="social-link">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="#github" className="social-link">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
                </svg>
              </a>
              <a href="#email" className="social-link">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6" fill="none" stroke="white" strokeWidth="2"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-divider"></div>
        
        <div className="footer-bottom">
          <p className="footer-copyright">© 2024 Presently AI. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <span className="legal-separator">•</span>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default LandingFooter;