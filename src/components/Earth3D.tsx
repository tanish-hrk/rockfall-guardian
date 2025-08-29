import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';
import { minesData } from '@/data/mineData';

interface MineMarkerProps {
  mine: any;
  position: [number, number, number];
  onMineClick: (mine: any) => void;
}

const MineMarker: React.FC<MineMarkerProps> = ({ mine, position, onMineClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.lookAt(state.camera.position);
    }
  });

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low': return '#10b981';
      case 'Moderate': return '#f59e0b';
      case 'High': return '#f97316';
      case 'Critical': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={() => onMineClick(mine)}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial color={getRiskColor(mine.riskLevel)} />
      </mesh>
      <Html distanceFactor={15} position={[0, 0.05, 0]}>
        <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg px-2 py-1 text-xs font-medium shadow-mining pointer-events-none">
          <div className="text-card-foreground">{mine.name}</div>
          <div className="text-muted-foreground">{mine.type}</div>
        </div>
      </Html>
    </group>
  );
};

const Earth: React.FC<{ onMineClick: (mine: any) => void }> = ({ onMineClick }) => {
  const earthRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
  });

  // Convert lat/lng to 3D coordinates on sphere
  const minePositions = useMemo(() => {
    return minesData.map(mine => {
      const lat = (mine.location.lat * Math.PI) / 180;
      const lng = (mine.location.lng * Math.PI) / 180;
      const radius = 1.01; // Slightly above earth surface
      
      const x = radius * Math.cos(lat) * Math.cos(lng);
      const y = radius * Math.sin(lat);
      const z = radius * Math.cos(lat) * Math.sin(lng);
      
      return { mine, position: [x, y, z] as [number, number, number] };
    });
  }, []);

  return (
    <group>
      <Sphere ref={earthRef} args={[1, 64, 64]}>
        <meshPhongMaterial
          color="#2563eb"
          transparent
          opacity={0.8}
          shininess={100}
        />
      </Sphere>
      
      {/* Earth-like texture overlay */}
      <Sphere args={[1.005, 64, 64]}>
        <meshBasicMaterial
          color="#22c55e"
          transparent
          opacity={0.3}
        />
      </Sphere>
      
      {/* Mine markers */}
      {minePositions.map(({ mine, position }) => (
        <MineMarker
          key={mine.id}
          mine={mine}
          position={position}
          onMineClick={onMineClick}
        />
      ))}
    </group>
  );
};

interface Earth3DProps {
  onMineClick: (mine: any) => void;
}

const Earth3D: React.FC<Earth3DProps> = ({ onMineClick }) => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 60 }}
        className="cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Earth onMineClick={onMineClick} />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={2}
          maxDistance={8}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default Earth3D;