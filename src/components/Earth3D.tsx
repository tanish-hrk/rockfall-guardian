import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Stars, Float, Text } from '@react-three/drei';
import * as THREE from 'three';

const Globe: React.FC = () => {
  const globeRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.005;
      globeRef.current.rotation.x += 0.002;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group>
      {/* Stars background */}
      <Stars
        radius={100}
        depth={50}
        count={1000}
        factor={4}
        saturation={0}
        fade={true}
      />

      {/* Main Globe */}
      <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
        <Sphere ref={globeRef} args={[1.5, 64, 64]}>
          <meshPhongMaterial
            color="#1e40af"
            transparent
            opacity={0.8}
            shininess={100}
            emissive="#1e40af"
            emissiveIntensity={0.1}
          />
        </Sphere>
      </Float>

      {/* Globe surface details */}
      <Sphere args={[1.501, 64, 64]}>
        <meshBasicMaterial
          color="#22c55e"
          transparent
          opacity={0.3}
        />
      </Sphere>

      {/* Atmosphere glow */}
      <Sphere ref={atmosphereRef} args={[1.8, 32, 32]}>
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Outer glow */}
      <Sphere args={[2.2, 16, 16]}>
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Floating particles around the globe */}
      {Array.from({ length: 20 }, (_, i) => (
        <Float key={i} speed={1 + Math.random()} rotationIntensity={0.5} floatIntensity={1}>
          <mesh position={[
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 6
          ]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={Math.random() * 0.6 + 0.2}
            />
          </mesh>
        </Float>
      ))}

      {/* Connection lines */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x1 = Math.cos(angle) * 1.6;
        const z1 = Math.sin(angle) * 1.6;
        const x2 = Math.cos(angle + Math.PI / 4) * 1.6;
        const z2 = Math.sin(angle + Math.PI / 4) * 1.6;

        return (
          <mesh key={i} position={[(x1 + x2) / 2, 0, (z1 + z2) / 2]}>
            <cylinderGeometry args={[0.01, 0.01, Math.sqrt((x2-x1)**2 + (z2-z1)**2)]} />
            <meshBasicMaterial color="#60a5fa" transparent opacity={0.3} />
          </mesh>
        );
      })}
    </group>
  );
};

interface Earth3DProps {
  onMineClick?: () => void;
}

const Earth3D: React.FC<Earth3DProps> = ({ onMineClick }) => {
  return (
    <div className="w-full h-full absolute inset-0 -z-10">
      <Suspense fallback={
        <div className="w-full h-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
          <div className="text-white text-lg">Loading 3D Earth...</div>
        </div>
      }>
        <Canvas
          camera={{ position: [0, 0, 3.5], fov: 50 }}
          className="cursor-grab active:cursor-grabbing"
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            failIfMajorPerformanceCaveat: false
          }}
          style={{
            background: 'transparent',
            width: '100%',
            height: '100%'
          }}
          onCreated={({ gl }) => {
            gl.setClearColor('#000000', 0);
          }}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#3b82f6" />
          <Globe />
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={2.5}
            maxDistance={6}
            autoRotate
            autoRotateSpeed={0.3}
            enableDamping
            dampingFactor={0.05}
          />
        </Canvas>
      </Suspense>
    </div>
  );
};

interface MagicGlobeProps {
  className?: string;
}

const MagicGlobe: React.FC<MagicGlobeProps> = ({ className = "" }) => {
  return (
    <div className={`w-full h-full relative ${className}`}>
      <Suspense fallback={
        <div className="w-full h-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center rounded-2xl">
          <div className="text-white text-lg font-medium">Loading Globe...</div>
        </div>
      }>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          className="cursor-grab active:cursor-grabbing"
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "default",
            failIfMajorPerformanceCaveat: false,
            preserveDrawingBuffer: true
          }}
          style={{
            background: 'radial-gradient(circle at center, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
            borderRadius: '1rem'
          }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#3b82f6" />
          <Globe />
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={3}
            maxDistance={8}
            autoRotate
            autoRotateSpeed={0.5}
            enableDamping
            dampingFactor={0.05}
          />
        </Canvas>

        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl pointer-events-none" />
      </Suspense>
    </div>
  );
};

export { Earth3D };
export default Earth3D;