import React, { useRef, useState, useEffect} from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Text } from '@react-three/drei';
import * as THREE from 'three';
import earthmap1k from './components/earthmap1k.jpg';
import earthbump1k from './components/earthbump1k.jpg';
import earthcloudmap from './components/earthcloudmap.jpg';
import moonmap1k from './components/moonmap1k.jpg';
import moonbump1k from './components/moonbump1k.jpg';
import './App.css'

async function fetchSatellites() {
  const response = await fetch('https://celestrak.com/NORAD/elements/gp.php?GROUP=active&FORMAT=json');
  const data = await response.json();
  return data;
}

function SpinningGlobe() {
  const globeRef = useRef();
  const cloudRef = useRef();
  const moonRef = useRef();
  const [satellites, setSatellites] = useState([]);

  useEffect(() => {
    fetchSatellites().then(setSatellites).catch(console.error);
  }, []);

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.01;
    }
    if (cloudRef.current) {
      cloudRef.current.rotation.y += 0.015;
    }
    if (moonRef.current) {
      moonRef.current.position.x = Math.sin(Date.now() / 1000) * 12;
      moonRef.current.position.z = Math.cos(Date.now() / 1000) * 12;
    }
  });

  const earthTexture = new THREE.TextureLoader().load(earthmap1k);
  const bumpMap = new THREE.TextureLoader().load(earthbump1k);
  const cloudMap = new THREE.TextureLoader().load(earthcloudmap);
  const moonTexture = new THREE.TextureLoader().load(moonmap1k);
  const moonBumpMap = new THREE.TextureLoader().load(moonbump1k);

  const satellitePositions = satellites.map(() => {
    const latitude = Math.random() * Math.PI - Math.PI / 2;
    const longitude = Math.random() * 2 * Math.PI;
    const radius = 3.5;
    return {
      x: radius * Math.cos(latitude) * Math.cos(longitude),
      y: radius * Math.sin(latitude),
      z: radius * Math.cos(latitude) * Math.sin(longitude),
    };
  });

  return (
    <>
      <Sphere ref={globeRef} args={[2, 32, 32]}>
        <meshStandardMaterial map={earthTexture} bumpMap={bumpMap} bumpScale={0.05} />
      </Sphere>
      <Sphere ref={cloudRef} args={[2.05, 32, 32]}>
        <meshBasicMaterial map={cloudMap} transparent opacity={0.3} />
      </Sphere>
      <Sphere ref={moonRef} args={[1, 32, 32]} position={[12, 0, 0]}>
        <meshStandardMaterial map={moonTexture} bumpMap={moonBumpMap} bumpScale={0.02} />
      </Sphere>
      {satellitePositions.map((pos, index) => (
        <Sphere key={index} args={[0.05, 2, 2]} position={[pos.x, pos.y, pos.z]}>
          <meshBasicMaterial color="red" />
        </Sphere>
      ))}
      <Text position={[5, 10, 26]} fontSize={1} color="white" fontWeight="bold">
        AstroTrack
      </Text>
    </>
  );
}

export default SpinningGlobe;
