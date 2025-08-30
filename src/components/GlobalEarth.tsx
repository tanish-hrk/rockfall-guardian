import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Mine } from '@/data/mineData';

interface GlobalEarthProps {
  mines: Mine[];
  onMineClick?: (mine: Mine) => void;
  selectedMine?: Mine | null;
}

function toSpherePosition(lat: number, lon: number, r = 1) {
  // Convert degrees to radians and map to sphere
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -r * Math.sin(phi) * Math.cos(theta);
  const z = r * Math.sin(phi) * Math.sin(theta);
  const y = r * Math.cos(phi);
  return [x, y, z] as [number, number, number];
}

function MinePin({
  position,
  color = "#22c55e",
  isSelected = false,
  onClick
}: {
  position: [number, number, number];
  color?: string;
  isSelected?: boolean;
  onClick?: () => void;
}) {
  return (
    <mesh position={position} onClick={onClick}>
      <sphereGeometry args={[isSelected ? 0.025 : 0.02, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={isSelected ? color : "#000000"}
        emissiveIntensity={isSelected ? 0.3 : 0}
      />
    </mesh>
  );
}

function getRiskColor(riskLevel: string): string {
  switch (riskLevel) {
    case 'Critical': return '#ef4444'; // Red
    case 'High': return '#f59e0b'; // Orange
    case 'Moderate': return '#eab308'; // Yellow
    case 'Low': return '#22c55e'; // Green
    default: return '#22c55e';
  }
}

const GlobalEarth: React.FC<GlobalEarthProps> = ({
  mines,
  onMineClick,
  selectedMine
}) => {
  const minePins = useMemo(
    () =>
      mines.slice(0, 50).map((mine) => ({
        id: mine.id,
        position: toSpherePosition(mine.location.lat, mine.location.lng, 1.02),
        color: getRiskColor(mine.riskLevel),
        mine: mine,
      })),
    [mines],
  );

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 rounded-lg overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 2.6], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} />

        {/* Earth Sphere */}
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial
            color="#1e40af"
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>

        {/* Mine Pins */}
        {minePins.map((pin) => (
          <MinePin
            key={pin.id}
            position={pin.position}
            color={pin.color}
            isSelected={selectedMine?.id === pin.mine.id}
            onClick={() => onMineClick?.(pin.mine)}
          />
        ))}

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={1.5}
          maxDistance={4}
        />
      </Canvas>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm border border-white/20 rounded-lg p-3">
        <h4 className="font-medium text-sm mb-2 text-white">Risk Levels</h4>
        <div className="space-y-1">
          {[
            { level: 'Critical', color: '#ef4444' },
            { level: 'High', color: '#f59e0b' },
            { level: 'Moderate', color: '#eab308' },
            { level: 'Low', color: '#22c55e' }
          ].map((risk) => (
            <div key={risk.level} className="flex items-center gap-2 text-xs">
              <div
                className="w-3 h-3 rounded-full border border-white/50"
                style={{ backgroundColor: risk.color }}
              />
              <span className="text-white/80">{risk.level}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mine Info */}
      {selectedMine && (
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm border border-white/20 rounded-lg p-3 max-w-xs">
          <h4 className="font-medium text-sm mb-2 text-white">Selected Mine</h4>
          <div className="space-y-1 text-xs">
            <div className="text-white font-medium">{selectedMine.name}</div>
            <div className="text-white/70">Type: {selectedMine.type}</div>
            <div className="text-white/70">Risk: {selectedMine.riskLevel}</div>
            <div className="text-white/70">Status: {selectedMine.operationalStatus}</div>
            <div className="text-white/70">Location: {selectedMine.location.state}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalEarth;
