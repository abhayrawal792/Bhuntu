import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Falling Sakura Petals Particle Generator
function FallingSakuraPetals({ count = 200 }) {
  const pointsRef = useRef();

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = Math.random() * 6 - 1;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;

      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = -(Math.random() * 0.015 + 0.005);
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    return [pos, vel];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      const positionsArr = pointsRef.current.geometry.attributes.position.array;

      for (let i = 0; i < count; i++) {
        positionsArr[i * 3] += velocities[i * 3];
        positionsArr[i * 3 + 1] += velocities[i * 3 + 1];
        positionsArr[i * 3 + 2] += velocities[i * 3 + 2];

        // Reset falling petal to top when it reaches ground
        if (positionsArr[i * 3 + 1] < -2) {
          positionsArr[i * 3 + 1] = 5;
          positionsArr[i * 3] = (Math.random() - 0.5) * 8;
          positionsArr[i * 3 + 2] = (Math.random() - 0.5) * 8;
        }
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial transparent color="#FF85A1" size={0.12} opacity={0.85} sizeAttenuation={true} />
    </Points>
  );
}

export default function SakuraTree3D() {
  const treeRef = useRef();

  useFrame((state, delta) => {
    if (treeRef.current) {
      treeRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} color="#FFF0F5" />
      <pointLight position={[-5, 5, -5]} color="#FF85A1" intensity={1} />

      <group ref={treeRef} position={[0, -1, 0]}>
        {/* Tree Trunk */}
        <mesh position={[0, 1, 0]}>
          <cylinderGeometry args={[0.2, 0.35, 2.4, 16]} />
          <meshStandardMaterial color="#4A2E2B" roughness={0.7} />
        </mesh>

        {/* Sakura Canopy Foliage Spheres */}
        <mesh position={[0, 2.5, 0]}>
          <sphereGeometry args={[1.4, 32, 32]} />
          <meshStandardMaterial color="#FF85A1" roughness={0.3} emissive="#FF85A1" emissiveIntensity={0.2} />
        </mesh>
        <mesh position={[-0.8, 2.2, 0.4]}>
          <sphereGeometry args={[0.9, 24, 24]} />
          <meshStandardMaterial color="#FF69B4" roughness={0.3} emissive="#FF69B4" emissiveIntensity={0.2} />
        </mesh>
        <mesh position={[0.8, 2.2, -0.4]}>
          <sphereGeometry args={[0.9, 24, 24]} />
          <meshStandardMaterial color="#FFB7C5" roughness={0.3} emissive="#FFB7C5" emissiveIntensity={0.2} />
        </mesh>
      </group>

      {/* Falling Sakura Petals */}
      <FallingSakuraPetals count={300} />

      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} />
    </group>
  );
}
