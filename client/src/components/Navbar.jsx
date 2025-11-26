import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <div className="logo">
          <span className="logo-main">P</span>
          <span className="logo-sub">resently</span>
        </div>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/services" className="nav-link">Services</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
      </div>
    </nav>
  );
}
