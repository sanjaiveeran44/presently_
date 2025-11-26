import { useState } from 'react';
import LandingPage from './pages/landingPage';
import HomePage from './pages/homePage';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;