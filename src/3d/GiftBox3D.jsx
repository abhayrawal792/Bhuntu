import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { playSparkle } from '../components/AudioController';

export default function GiftBox3D({ isOpen, setIsOpen }) {
  const boxGroupRef = useRef();
  const lidRef = useRef();
  const lightRef = useRef();

  useFrame((state, delta) => {
    if (boxGroupRef.current) {
      if (!isOpen) {
        boxGroupRef.current.rotation.y += delta * 0.4;
      }
    }

    if (lidRef.current) {
      if (isOpen) {
        // Animate Lid opening up and tilting
        lidRef.current.position.y = THREE.MathUtils.lerp(lidRef.current.position.y, 2.2, delta * 4);
        lidRef.current.rotation.x = THREE.MathUtils.lerp(lidRef.current.rotation.x, -Math.PI / 3, delta * 4);
        lidRef.current.rotation.y = THREE.MathUtils.lerp(lidRef.current.rotation.y, Math.PI / 4, delta * 4);
      } else {
        lidRef.current.position.y = THREE.MathUtils.lerp(lidRef.current.position.y, 0.7, delta * 6);
        lidRef.current.rotation.x = THREE.MathUtils.lerp(lidRef.current.rotation.x, 0, delta * 6);
        lidRef.current.rotation.y = THREE.MathUtils.lerp(lidRef.current.rotation.y, 0, delta * 6);
      }
    }

    if (lightRef.current) {
      lightRef.current.intensity = isOpen ? THREE.MathUtils.lerp(lightRef.current.intensity, 8, delta * 5) : 0;
    }
  });

  const handleBoxClick = (e) => {
    e.stopPropagation();
    playSparkle();
    setIsOpen(!isOpen);
  };

  return (
    <group>
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} />
      <pointLight ref={lightRef} position={[0, 0.5, 0]} color="#FFD166" distance={8} />

      <group
        ref={boxGroupRef}
        onClick={handleBoxClick}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
      >
        {/* Main Box Base */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.4, 1.2, 1.4]} />
          <meshStandardMaterial color="#FF85A1" roughness={0.3} metalness={0.1} />
        </mesh>

        {/* Vertical Ribbon */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.42, 1.22, 0.25]} />
          <meshStandardMaterial color="#FFD166" roughness={0.2} metalness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.25, 1.22, 1.42]} />
          <meshStandardMaterial color="#FFD166" roughness={0.2} metalness={0.5} />
        </mesh>

        {/* Box Lid */}
        <group ref={lidRef} position={[0, 0.7, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.5, 0.25, 1.5]} />
            <meshStandardMaterial color="#E05297" roughness={0.3} metalness={0.1} />
          </mesh>

          {/* Lid Ribbon Cross */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.52, 0.27, 0.26]} />
            <meshStandardMaterial color="#FFD166" roughness={0.2} metalness={0.5} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.26, 0.27, 1.52]} />
            <meshStandardMaterial color="#FFD166" roughness={0.2} metalness={0.5} />
          </mesh>

          {/* Ribbon Bow on top */}
          <mesh position={[0, 0.25, 0]} rotation={[0, Math.PI / 4, 0]}>
            <torusGeometry args={[0.22, 0.07, 16, 32]} />
            <meshStandardMaterial color="#FFD166" roughness={0.2} metalness={0.5} />
          </mesh>
        </group>

        {/* Click Instruction Label */}
        <Html position={[0, 1.6, 0]} center distanceFactor={8}>
          <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-pink-300 shadow-xl text-xs font-bold text-rose-600 flex items-center gap-1.5 whitespace-nowrap animate-bounce">
            <span>🎁</span>
            <span>{isOpen ? "Tap to close box" : "Tap to unwrap surprise!"}</span>
          </div>
        </Html>
      </group>
    </group>
  );
}
