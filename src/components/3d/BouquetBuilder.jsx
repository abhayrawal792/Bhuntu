import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard, Html, OrbitControls, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { birthdayData } from '../../data/birthdayData';
import { useAppStore } from '../../store/useAppStore';
import { playSparkle, playPop } from '../AudioController';

// Individual Billboard Flower Item (Always faces the R3F Camera)
function BillboardFlower({ item, position, onSelect, isSelected }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.05;
    }
  });

  const color = item.color || "#FF85A1";

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        playPop();
        onSelect(item);
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* R3F Drei Billboard wrapper - guarantees flower always faces camera */}
      <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
        <mesh scale={hovered || isSelected ? 1.25 : 1.0}>
          <circleGeometry args={[0.45, 32]} />
          <meshStandardMaterial
            color={color}
            roughness={0.2}
            metalness={0.1}
            emissive={color}
            emissiveIntensity={hovered || isSelected ? 0.6 : 0.2}
          />
        </mesh>
      </Billboard>

      {/* Flower Stem */}
      <mesh position={[0, -0.7, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 1.2, 16]} />
        <meshStandardMaterial color="#4A7C59" roughness={0.5} />
      </mesh>

      {/* R3F UI Label */}
      <Html position={[0, 0.6, 0]} center distanceFactor={8}>
        <button
          className={`px-3 py-1 rounded-full text-xs font-semibold shadow-lg transition-all duration-300 border flex items-center gap-1 cursor-pointer ${
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

// Particle Burst Effect on Flower Selection
function SelectionParticleBurst({ color }) {
  const pointsRef = useRef();

  const particlePositions = React.useMemo(() => {
    const pts = new Float32Array(60 * 3);
    for (let i = 0; i < 60; i++) {
      pts[i * 3] = (Math.random() - 0.5) * 2;
      pts[i * 3 + 1] = (Math.random() - 0.5) * 2;
      pts[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    return pts;
  }, [color]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 2;
    }
  });

  return (
    <Points ref={pointsRef} positions={particlePositions} stride={3}>
      <PointMaterial transparent color={color || "#FFD166"} size={0.15} opacity={0.9} />
    </Points>
  );
}

export default function BouquetBuilder() {
  const { selectedFlower, setSelectedFlower, triggerHaptic } = useAppStore();

  const flowers = birthdayData.bouquet;

  const handleSelect = (item) => {
    triggerHaptic(25);
    playSparkle();
    setSelectedFlower(item);
  };

  const positions = [
    [0, 0.3, 0],
    [-0.9, 0.1, 0.4],
    [0.9, 0.1, -0.4],
    [-0.5, -0.2, -0.8],
    [0.5, -0.2, 0.8],
  ];

  return (
    <group>
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} />

      <group position={[0, 0, 0]}>
        {/* Soft Pink Silk Ribbon Tie (Replaced the white cylinder vase) */}
        <mesh position={[0, -0.9, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.25, 0.08, 16, 32]} />
          <meshStandardMaterial color="#FF85A1" roughness={0.3} metalness={0.2} />
        </mesh>

        {/* 5 Billboard Flowers */}
        {flowers.map((item, idx) => (
          <BillboardFlower
            key={item.id}
            item={item}
            position={positions[idx]}
            onSelect={handleSelect}
            isSelected={selectedFlower?.id === item.id}
          />
        ))}

        {/* Particle Burst on Selection */}
        {selectedFlower && (
          <SelectionParticleBurst color={selectedFlower.color} />
        )}
      </group>

      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} />
    </group>
  );
}
