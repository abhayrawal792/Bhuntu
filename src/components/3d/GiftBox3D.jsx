import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Spinning gift box with a floating heart — matches the style of the other 3D components.
export default function GiftBox3D({ color = '#e11d48', ribbon = '#fbbf24', size = 1 }) {
  const boxRef = useRef();
  const heartRef = useRef();

  const boxGeo = useMemo(() => new THREE.BoxGeometry(1.6, 1.2, 1.6), []);
  const lidGeo = useMemo(() => new THREE.BoxGeometry(1.7, 0.22, 1.7), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (boxRef.current) {
      boxRef.current.rotation.y += delta * 0.6;
      boxRef.current.position.y = Math.sin(t * 1.5) * 0.12;
    }
    if (heartRef.current) {
      heartRef.current.position.y = 1.35 + Math.sin(t * 2 + 1) * 0.18;
      heartRef.current.scale.setScalar(1 + Math.sin(t * 3) * 0.08);
      heartRef.current.rotation.y += delta * 1.2;
    }
  });

  return (
    <group scale={size}>
      <group ref={boxRef}>
        <mesh geometry={boxGeo} position={[0, -0.6, 0]}>
          <meshStandardMaterial color={color} roughness={0.45} metalness={0.1} />
        </mesh>
        {/* Vertical ribbon bands on the box */}
        {[0, Math.PI / 2].map((rot, i) => (
          <mesh key={i} geometry={boxGeo} position={[0, -0.6, 0]} rotation={[0, rot, 0]}>
            <meshStandardMaterial color={ribbon} roughness={0.4} transparent opacity={0.9} />
          </mesh>
        ))}
        <mesh geometry={lidGeo} position={[0, 0.11, 0]}>
          <meshStandardMaterial color={color} roughness={0.45} metalness={0.1} />
        </mesh>
        {/* Ribbon cross on the lid */}
        {[0, Math.PI / 2].map((rot, i) => (
          <mesh key={i} geometry={lidGeo} position={[0, 0.22, 0]} rotation={[0, rot, 0]}>
            <meshStandardMaterial color={ribbon} roughness={0.4} transparent opacity={0.9} />
          </mesh>
        ))}
      </group>
      {/* Floating heart above the box */}
      <group ref={heartRef} position={[0, 1.35, 0]}>
        <mesh scale={0.32}>
          <sphereGeometry args={[1, 24, 24]} />
          <meshStandardMaterial color="#f43f5e" emissive="#f43f5e" emissiveIntensity={0.35} roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
}
