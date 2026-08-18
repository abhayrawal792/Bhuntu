import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { birthdayData } from '../data/birthdayData';

// Helper function to convert Lat/Lng to 3D Cartesian coordinates
function latLngToVector3(lat, lng, radius = 2) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Glowing Arc between 2 cities
function ConnectionArc({ startVec, endVec, color = "#FF85A1" }) {
  const curveMeshRef = useRef();

  const { points } = useMemo(() => {
    // Middle control point lifted up for 3D curvature
    const mid = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
    const distance = startVec.distanceTo(endVec);
    mid.normalize().multiplyScalar(2 + distance * 0.35); // Elevation above globe radius

    const curve = new THREE.QuadraticBezierCurve3(startVec, mid, endVec);
    const pts = curve.getPoints(50);
    return { curve, points: pts };
  }, [startVec, endVec]);

  const lineGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    return geom;
  }, [points]);

  useFrame((state) => {
    if (curveMeshRef.current) {
      curveMeshRef.current.material.dashOffset -= 0.01;
    }
  });

  return (
    <line ref={curveMeshRef} geometry={lineGeometry}>
      <lineBasicMaterial color={color} linewidth={3} />
    </line>
  );
}

// City Pin Marker
function CityMarker({ position, name }) {
  return (
    <group position={position}>
      {/* Glowing point */}
      <mesh>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#FF4D6D" />
      </mesh>
      {/* Pulsing ring */}
      <mesh>
        <ringGeometry args={[0.08, 0.12, 32]} />
        <meshBasicMaterial color="#FF85A1" side={THREE.DoubleSide} transparent opacity={0.6} />
      </mesh>

      {/* Floating 3D HTML Label */}
      <Html distanceFactor={10} position={[0, 0.2, 0]} center>
        <div className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-pink-300 shadow-lg text-[11px] font-bold text-gray-900 whitespace-nowrap flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
          <span>{name}</span>
        </div>
      </Html>
    </group>
  );
}

export default function Globe3D() {
  const globeGroupRef = useRef();

  const partnerVec = useMemo(
    () => latLngToVector3(birthdayData.partner.coords[0], birthdayData.partner.coords[1], 2),
    []
  );
  const herVec = useMemo(
    () => latLngToVector3(birthdayData.herLocation.coords[0], birthdayData.herLocation.coords[1], 2),
    []
  );

  useFrame((state, delta) => {
    if (globeGroupRef.current) {
      globeGroupRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <pointLight position={[-5, -5, -5]} color="#FF85A1" intensity={1} />

      <group ref={globeGroupRef}>
        {/* Main Earth Sphere */}
        <mesh>
          <sphereGeometry args={[2, 64, 64]} />
          <meshStandardMaterial
            color="#1D2A44"
            roughness={0.6}
            metalness={0.1}
            wireframe={false}
          />
        </mesh>

        {/* Globe Grid / Continents overlay */}
        <mesh scale={1.005}>
          <sphereGeometry args={[2, 32, 32]} />
          <meshBasicMaterial
            color="#FF85A1"
            wireframe={true}
            transparent={true}
            opacity={0.15}
          />
        </mesh>

        {/* Atmosphere Glow */}
        <mesh scale={1.15}>
          <sphereGeometry args={[2, 32, 32]} />
          <meshBasicMaterial
            color="#FF85A1"
            transparent={true}
            opacity={0.06}
            side={THREE.BackSide}
          />
        </mesh>

        {/* City Markers */}
        <CityMarker position={partnerVec} name={birthdayData.partner.locationName} />
        <CityMarker position={herVec} name={birthdayData.herLocation.locationName} />

        {/* Glowing Arc Line */}
        <ConnectionArc startVec={partnerVec} endVec={herVec} color="#FF4D6D" />
      </group>

      <OrbitControls
        enableZoom={false}
        autoRotate={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(3 * Math.PI) / 4}
      />
    </group>
  );
}
