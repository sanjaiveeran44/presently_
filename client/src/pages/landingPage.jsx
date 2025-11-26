import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import React from "react";
import "./landingPage.css";

export default function landingPage() {
  return (
    <div className="landing">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}
