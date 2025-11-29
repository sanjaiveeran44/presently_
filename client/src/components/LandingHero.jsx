import '../pages/landingPage.css';
import { useNavigate } from "react-router-dom";
const LandingHero = () => {

    const navigate = useNavigate();
    const handleStart = () =>{
        navigate('/app');
    }
  return (
    <section className="landing-hero">
      <div className="hero-background">
        <div className="hero-shape shape-1"></div>
        <div className="hero-shape shape-2"></div>
        <div className="hero-shape shape-3"></div>
        <div className="hero-glow glow-1"></div>
        <div className="hero-glow glow-2"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          Powered by Advanced AI
        </div>
        
        <h1 className="hero-title">
          AI-Powered Presentation
          <span className="hero-title-highlight"> Assistant</span>
        </h1>
        
        <p className="hero-subtitle">
          Transform your presentations with intelligent slide generation, real-time AI chat assistance, 
          and automated quiz creation. Experience the future of presentation design with Presently AI.
        </p>
        
        <button className="hero-cta" onClick={handleStart}>
          <span className="cta-text">Let's Start</span>
          <span className="cta-arrow">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </button>
        
        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-number">50K+</div>
            <div className="stat-label">Active Users</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">1M+</div>
            <div className="stat-label">Presentations Created</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">4.9★</div>
            <div className="stat-label">User Rating</div>
          </div>
        </div>
      </div>
      
      <div className="hero-visual">
        <div className="visual-card card-1">
          <div className="card-icon">🎨</div>
          <div className="card-text">AI Design</div>
        </div>
        <div className="visual-card card-2">
          <div className="card-icon">💬</div>
          <div className="card-text">Smart Chat</div>
        </div>
        <div className="visual-card card-3">
          <div className="card-icon">📊</div>
          <div className="card-text">Analytics</div>
        </div>
      </div>
    </section>
  );
};
export default LandingHero;