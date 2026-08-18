import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { birthdayData } from '../../data/birthdayData';
import { getComplimentForMedia } from '../../data/complimentsData';
import { playSparkle, playPop } from '../AudioController';

function SpinningPhotoCard({ item, index, total, onSelect }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Position cards in a 3D spinning circle
  const radius = 3.6;
  const angle = (index / total) * Math.PI * 2;
  const posX = Math.sin(angle) * radius;
  const posZ = Math.cos(angle) * radius;

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Gentle floating bob
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5 + index) * 0.12;
      meshRef.current.rotation.y = angle + Math.PI;
    }
  });

  const compliment = getComplimentForMedia(index, item.name || '');

  return (
    <group
      ref={meshRef}
      position={[posX, 0, posZ]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        playPop();
        onSelect(item, index);
      }}
    >
      {/* 3D Rose-Gold Glowing Frame */}
      <mesh scale={hovered ? 1.2 : 1.0}>
        <boxGeometry args={[1.7, 1.3, 0.08]} />
        <meshStandardMaterial
          color={hovered ? "#FF85A1" : "#E05297"}
          metalness={0.8}
          roughness={0.2}
          emissive="#FF85A1"
          emissiveIntensity={hovered ? 0.6 : 0.25}
        />
      </mesh>

      {/* HTML Image + Compliment Overlay */}
      <Html position={[0, 0, 0.05]} transform distanceFactor={3.2} zIndexRange={[100, 0]}>
        <div
          className={`w-44 h-32 rounded-xl overflow-hidden border-2 border-white shadow-2xl transition-all duration-300 cursor-pointer ${
            hovered ? 'scale-105 ring-4 ring-pink-400' : ''
          }`}
        >
          <img src={item.path || item.image} alt="Memory" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-2 text-white">
            <span className="text-[11px] font-bold text-rose-300 truncate font-nepali">
              {compliment.nepali}
            </span>
          </div>
        </div>
      </Html>
    </group>
  );
}

// Particle Stars around the 3D spinning carousel
function FloatingSparkleParticles({ count = 200 }) {
  const pointsRef = useRef();

  const positions = React.useMemo(() => {
    const pts = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pts[i * 3] = (Math.random() - 0.5) * 12;
      pts[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pts[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return pts;
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial transparent color="#FF85A1" size={0.12} opacity={0.8} />
    </Points>
  );
}

export default function SpinningCarousel3D({ items, onSelectMedia }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25; // Smooth continuous 3D spinning animation
    }
  });

  const displayList = items.slice(0, 10); // Display 10 items in the 3D spinning ring

  return (
    <group>
      <ambientLight intensity={1.0} />
      <directionalLight position={[5, 10, 5]} intensity={1.8} color="#FFF0F3" />
      <pointLight position={[-5, 5, -5]} color="#FF85A1" intensity={1} />

      <group ref={groupRef}>
        {displayList.map((item, idx) => (
          <SpinningPhotoCard
            key={idx}
            item={item}
            index={idx}
            total={displayList.length}
            onSelect={onSelectMedia}
          />
        ))}
      </group>

      <FloatingSparkleParticles count={250} />

      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} />
    </group>
  );
}
