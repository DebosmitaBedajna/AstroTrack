import React from 'react';
import './App.css';

const IntroScreen = ({ onStart }) => {
  return (
    <div className="intro-screen">
      <h1>Welcome to AstroTrack</h1>
      <p>Click the button below to start exploring!</p>
      <button onClick={onStart}>Okay</button>
    </div>
  );
};

export default IntroScreen;
