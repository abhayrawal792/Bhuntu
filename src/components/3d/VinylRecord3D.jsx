import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useAppStore } from '../../store/useAppStore';

export default function VinylRecord3D() {
  const vinylRef = useRef();
  const armRef = useRef();
  const { audioState } = useAppStore();

  const isPlaying = audioState === 'playing';

  useFrame((state, delta) => {
    if (vinylRef.current && isPlaying) {
      vinylRef.current.rotation.z -= delta * 2.5;
    }
    if (armRef.current) {
      armRef.current.rotation.z = THREE.MathUtils.lerp(
        armRef.current.rotation.z,
        isPlaying ? -0.35 : 0,
        delta * 3
      );
    }
  });

  return (
    <group>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} />

      <group position={[0, 0, 0]} rotation={[Math.PI / 4, 0, 0]}>
        {/* Turntable Wooden Base */}
        <mesh position={[0, 0, -0.15]}>
          <boxGeometry args={[3.2, 3.2, 0.3]} />
          <meshStandardMaterial color="#3E2723" roughness={0.4} metalness={0.1} />
        </mesh>

        {/* Vinyl Disc */}
        <group ref={vinylRef} position={[0, 0, 0.05]}>
          <mesh>
            <cylinderGeometry args={[1.3, 1.3, 0.04, 64]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#111111" roughness={0.2} metalness={0.8} />
          </mesh>

          {/* Vinyl Label */}
          <mesh position={[0, 0, 0.025]}>
            <cylinderGeometry args={[0.45, 0.45, 0.01, 32]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#FF85A1" roughness={0.3} />
          </mesh>
        </group>

        {/* Tonearm */}
        <group ref={armRef} position={[1.1, 1.1, 0.2]}>
          <mesh position={[-0.4, -0.4, 0]} rotation={[0, 0, Math.PI / 4]}>
            <cylinderGeometry args={[0.02, 0.02, 1.2, 16]} />
            <meshStandardMaterial color="#CCCCCC" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>

        {/* HTML Status Pill */}
        <Html position={[0, -1.8, 0]} center distanceFactor={8}>
          <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-pink-300 shadow-lg text-xs font-bold text-rose-600 flex items-center gap-2 whitespace-nowrap">
            <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-rose-500 animate-ping' : 'bg-gray-400'}`}></span>
            <span>{isPlaying ? 'Vinyl Spinning • Playing Melody' : 'Vinyl Paused'}</span>
          </div>
        </Html>
      </group>

      <OrbitControls enableZoom={false} enablePan={false} />
    </group>
  );
}
