import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useAppStore } from '../store/useAppStore';

function generateParticlePositions(count = 1500) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const radius = 15 + Math.random() * 25;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }
  return positions;
}

// 3D Heart geometry component
function FloatingHeart({ position, scale = 1, color = "#FF85A1", rotationSpeed = 0.01 }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
      meshRef.current.rotation.x += rotationSpeed * 0.5;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.003;
    }
  });

  const heartShape = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    shape.moveTo(x + 0.25, y + 0.25);
    shape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
    shape.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35);
    shape.bezierCurveTo(x - 0.3, y + 0.55, x - 0.1, y + 0.77, x + 0.25, y + 0.95);
    shape.bezierCurveTo(x + 0.6, y + 0.77, x + 0.8, y + 0.55, x + 0.8, y + 0.35);
    shape.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y);
    shape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);
    return shape;
  }, []);

  const extrudeSettings = { depth: 0.1, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.04, bevelThickness: 0.04 };

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <extrudeGeometry args={[heartShape, extrudeSettings]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} emissive={color} emissiveIntensity={0.2} />
    </mesh>
  );
}

// Dynamic Time-Based Environment Lighting (Sunrise vs Starry Night)
function DynamicLighting() {
  const hour = new Date().getHours();
  const isDaytime = hour >= 6 && hour < 18;

  return (
    <group>
      <ambientLight intensity={isDaytime ? 1.2 : 0.8} color={isDaytime ? "#FFF0F5" : "#1A102F"} />
      <directionalLight position={[10, 10, 5]} intensity={isDaytime ? 1.8 : 1.2} color={isDaytime ? "#FFD166" : "#FF85A1"} />
      <pointLight position={[-10, -10, -10]} intensity={0.6} color="#FF85A1" />
    </group>
  );
}

export default function StarSky() {
  const pointsRef = useRef();
  const positions = useMemo(() => generateParticlePositions(1500), []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta * 0.03;
      pointsRef.current.rotation.x -= delta * 0.015;
    }
  });

  return (
    <group>
      <DynamicLighting />

      {/* Floating Star Field */}
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#FF85A1"
          size={0.15}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.85}
        />
      </Points>

      {/* Scattered Floating 3D Hearts */}
      <FloatingHeart position={[-4, 2, -2]} scale={0.6} color="#FF85A1" rotationSpeed={0.015} />
      <FloatingHeart position={[4, 3, -4]} scale={0.8} color="#E05297" rotationSpeed={0.01} />
      <FloatingHeart position={[-3, -3, -3]} scale={0.5} color="#FFB703" rotationSpeed={0.02} />
      <FloatingHeart position={[5, -2, -5]} scale={0.7} color="#F72585" rotationSpeed={0.012} />
      <FloatingHeart position={[0, 4, -6]} scale={0.9} color="#FF4D6D" rotationSpeed={0.008} />
    </group>
  );
}
