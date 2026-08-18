import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { birthdayData } from '../data/birthdayData';
import { playPop } from '../components/AudioController';

function SingleFlower3D({ item, position, rotation, onSelect, isSelected }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.05;
      if (hovered || isSelected) {
        groupRef.current.rotation.y += delta * 1.5;
      }
    }
  });

  const petalColor = item.color || "#FF85A1";

  // Create petals around a center sphere
  const petalCount = 8;
  const petals = Array.from({ length: petalCount });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        playPop();
        onSelect(item);
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Stem */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 1.2, 16]} />
        <meshStandardMaterial color="#4A7C59" roughness={0.5} />
      </mesh>

      {/* Flower Center */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#FFD166" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Petals */}
      {petals.map((_, i) => {
        const angle = (i / petalCount) * Math.PI * 2;
        const radius = 0.35;
        const px = Math.cos(angle) * radius;
        const pz = Math.sin(angle) * radius;
        return (
          <mesh key={i} position={[px, 0, pz]} rotation={[0, -angle, 0.2]}>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshStandardMaterial
              color={petalColor}
              roughness={0.2}
              metalness={0.1}
              emissive={petalColor}
              emissiveIntensity={hovered ? 0.4 : 0.15}
            />
          </mesh>
        );
      })}

      {/* Label */}
      <Html position={[0, 0.5, 0]} center distanceFactor={8}>
        <button
          className={`px-2 py-1 rounded-full text-xs font-semibold shadow-md transition-all duration-300 border flex items-center gap-1 ${
            isSelected || hovered
              ? 'bg-rose-500 text-white border-rose-300 scale-110'
              : 'bg-white/90 text-gray-800 border-pink-200 hover:scale-105'
          }`}
        >
          <span>🌸 {item.name}</span>
        </button>
      </Html>
    </group>
  );
}

export default function FlowerBouquet3D({ onSelectFlower, selectedFlower }) {
  const bouquetRef = useRef();

  useFrame((state, delta) => {
    if (bouquetRef.current) {
      bouquetRef.current.rotation.y += delta * 0.15;
    }
  });

  const flowers = birthdayData.bouquet;

  const positions = [
    [0, 0.3, 0],       // Center
    [-0.9, 0.1, 0.4],  // Left
    [0.9, 0.1, -0.4],  // Right
    [-0.5, -0.2, -0.8],// Back Left
    [0.5, -0.2, 0.8],  // Front Right
  ];

  const rotations = [
    [0, 0, 0],
    [0.1, 0, 0.3],
    [-0.1, 0, -0.3],
    [-0.25, 0, 0.1],
    [0.25, 0, -0.1],
  ];

  return (
    <group>
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} />
      <pointLight position={[-5, 5, -5]} color="#FF85A1" intensity={1} />

      <group ref={bouquetRef}>
        {/* Decorative Vase / Ribbon Base */}
        <mesh position={[0, -1.2, 0]}>
          <cylinderGeometry args={[0.5, 0.35, 1.2, 32]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.1} metalness={0.1} />
        </mesh>
        <mesh position={[0, -1.1, 0]}>
          <torusGeometry args={[0.52, 0.04, 16, 32]} />
          <meshStandardMaterial color="#FF85A1" roughness={0.2} />
        </mesh>

        {/* 5 Interactive Flowers */}
        {flowers.map((item, idx) => (
          <SingleFlower3D
            key={item.id}
            item={item}
            position={positions[idx]}
            rotation={rotations[idx]}
            onSelect={onSelectFlower}
            isSelected={selectedFlower?.id === item.id}
          />
        ))}
      </group>

      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} />
    </group>
  );
}
