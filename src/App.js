import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import SpinningGlobe from './SpinningGlobe';

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Stars radius={100} depth={50} count={5000} factor={7} saturation={0} fade />
      <OrbitControls />
      <SpinningGlobe />
    </Canvas>
  );
}

export default App;
