import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import React, { useState } from 'react';
import IntroScreen from './IntroScreen';
import SpinningGlobe from './SpinningGlobe';
import './App.css'

function App() {
  const [isIntroVisible, setIsIntroVisible] = useState(true);

  const handleStart = () => {
    setIsIntroVisible(false);
  };

  return (
    <>
      {isIntroVisible ? (
        <IntroScreen onStart={handleStart} />
      ) : (
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Stars radius={100} depth={50} count={5000} factor={7} saturation={0} fade />
      <OrbitControls />
      <SpinningGlobe />
      </Canvas>
      )}
    </>
  );
}

export default App;
