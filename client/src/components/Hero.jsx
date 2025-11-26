import "./Hero.css";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/app');
  }
  return (
    <section className="hero">
      <h1 className="hero-title">
        AI POWERED PRESENTATIONS<br />
        FOR TEACHERS & STUDENTS
      </h1>

      <button className="expand-btn" onClick={handleGetStarted}>
        Get Started <span className="arrow">→</span>
      </button>

        <p className="hero-text">
          Create, present, and teach smarter — powered by AI.<br />
          Turn slides into conversations, quizzes, and interactive learning.
          Ask questions, get examples instantly, and test knowledge with AI-generated quizzes.
        </p>

    </section>
  );
}
