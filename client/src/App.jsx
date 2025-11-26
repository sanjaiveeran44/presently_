import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from './pages/landingPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <LandingPage />
    </BrowserRouter>
  );
}

export default App;