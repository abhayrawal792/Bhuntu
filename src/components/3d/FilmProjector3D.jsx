import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export default function FilmProjector3D({ isPlaying }) {
  const reel1Ref = useRef();
  const reel2Ref = useRef();

  useFrame((state, delta) => {
    if (isPlaying) {
      if (reel1Ref.current) reel1Ref.current.rotation.z -= delta * 3;
      if (reel2Ref.current) reel2Ref.current.rotation.z -= delta * 3;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#FF85A1" />
      <pointLight position={[-3, 2, 2]} intensity={0.6} color="#F72585" />

      <group position={[0, -0.3, 0]}>
        {/* Projector Body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.4, 1.2, 1.0]} />
          <meshStandardMaterial color="#2D1230" roughness={0.3} metalness={0.7} />
        </mesh>

        {/* Projector Lens barrel — cylinder rotated on the MESH not geometry */}
        <mesh position={[1.35, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.32, 0.42, 0.55, 32]} />
          <meshStandardMaterial color="#E05297" metalness={0.9} roughness={0.1} emissive="#E05297" emissiveIntensity={0.5} />
        </mesh>

        {/* Lens glass */}
        <mesh position={[1.63, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.28, 0.28, 0.08, 32]} />
          <meshStandardMaterial color="#FFD6E7" metalness={0.2} roughness={0} transparent opacity={0.7} emissive="#FFB3D1" emissiveIntensity={0.3} />
        </mesh>

        {/* Film Reel 1 (Top Left) — cylinder facing camera via mesh rotation */}
        <group ref={reel1Ref} position={[-0.65, 0.95, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.55, 0.55, 0.08, 32]} />
            <meshStandardMaterial color="#FF85A1" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Spokes */}
          {[0, 60, 120].map((deg) => (
            <mesh key={deg} rotation={[Math.PI / 2, 0, (deg * Math.PI) / 180]}>
              <boxGeometry args={[1.0, 0.04, 0.06]} />
              <meshStandardMaterial color="#C0374E" />
            </mesh>
          ))}
          {/* Hub */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.12, 16]} />
            <meshStandardMaterial color="#1A0510" metalness={0.9} />
          </mesh>
        </group>

        {/* Film Reel 2 (Top Right) */}
        <group ref={reel2Ref} position={[0.65, 0.95, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.55, 0.55, 0.08, 32]} />
            <meshStandardMaterial color="#FF85A1" metalness={0.8} roughness={0.2} />
          </mesh>
          {[0, 60, 120].map((deg) => (
            <mesh key={deg} rotation={[Math.PI / 2, 0, (deg * Math.PI) / 180]}>
              <boxGeometry args={[1.0, 0.04, 0.06]} />
              <meshStandardMaterial color="#C0374E" />
            </mesh>
          ))}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.12, 16]} />
            <meshStandardMaterial color="#1A0510" metalness={0.9} />
          </mesh>
        </group>

        {/* Projector Stand/Leg */}
        <mesh position={[0, -0.85, 0]}>
          <boxGeometry args={[0.3, 0.5, 0.3]} />
          <meshStandardMaterial color="#1A0510" metalness={0.6} roughness={0.4} />
        </mesh>
      </group>

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
    </group>
  );
}
