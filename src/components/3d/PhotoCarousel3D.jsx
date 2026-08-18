import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { birthdayData } from '../../data/birthdayData';
import { playSparkle, playPop } from '../AudioController';

function Floating3DPhotoFrame({ item, index, total, onSelect }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Arrange frames in a 3D circle
  const radius = 3.2;
  const angle = (index / total) * Math.PI * 2;
  const posX = Math.sin(angle) * radius;
  const posZ = Math.cos(angle) * radius;

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5 + index) * 0.1;
      meshRef.current.rotation.y = angle + Math.PI;
    }
  });

  return (
    <group
      ref={meshRef}
      position={[posX, 0, posZ]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        playPop();
        onSelect(item);
      }}
    >
      {/* 3D Rose-Gold Photo Frame */}
      <mesh scale={hovered ? 1.15 : 1.0}>
        <boxGeometry args={[1.6, 1.2, 0.06]} />
        <meshStandardMaterial
          color={hovered ? "#FF85A1" : "#E05297"}
          metalness={0.8}
          roughness={0.2}
          emissive="#FF85A1"
          emissiveIntensity={hovered ? 0.5 : 0.2}
        />
      </mesh>

      {/* HTML Real Photo Image overlay inside 3D frame */}
      <Html position={[0, 0, 0.04]} transform distanceFactor={3} zIndexRange={[100, 0]}>
        <div
          className={`w-40 h-28 rounded-lg overflow-hidden border-2 border-white shadow-2xl transition-transform duration-300 cursor-pointer ${
            hovered ? 'scale-105 ring-4 ring-pink-400' : ''
          }`}
        >
          <img src={item.image} alt={item.caption} className="w-full h-full object-contain" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-1.5">
            <span className="text-[11px] font-bold text-white truncate font-nepali">
              {item.nepaliCaption}
            </span>
          </div>
        </div>
      </Html>
    </group>
  );
}

export default function PhotoCarousel3D({ onSelectPhoto }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15; // Slow 3D rotation
    }
  });

  const photos = birthdayData.gallery;

  return (
    <group>
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} />

      <group ref={groupRef}>
        {photos.map((item, idx) => (
          <Floating3DPhotoFrame
            key={item.id}
            item={item}
            index={idx}
            total={photos.length}
            onSelect={onSelectPhoto}
          />
        ))}
      </group>

      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} />
    </group>
  );
}
