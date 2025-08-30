/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react';
import Globe from 'globe.gl';

interface SatelliteGlobeProps {
  className?: string;
  width?: number;
  height?: number;
}

const SatelliteGlobe: React.FC<SatelliteGlobeProps> = ({
  className = "",
  width = 400,
  height = 400
}) => {
  const globeRef = useRef<HTMLDivElement>(null);
  const globeInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!globeRef.current) return;

    // Get container dimensions
    const containerWidth = globeRef.current.clientWidth || width;
    const containerHeight = globeRef.current.clientHeight || height;

    // Initialize globe
    const globe = new Globe(globeRef.current)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
      .backgroundColor('rgba(0,0,0,0)')
      .width(containerWidth)
      .height(containerHeight)
      .showAtmosphere(true)
      .atmosphereColor('lightskyblue')
      .atmosphereAltitude(0.15);

    // Add some random floating particles for visual effect
    const particles = Array.from({ length: 100 }, (_, i) => ({
      lat: (Math.random() - 0.5) * 180,
      lng: (Math.random() - 0.5) * 360,
      altitude: Math.random() * 0.3 + 0.1,
      size: Math.random() * 0.02 + 0.01,
    }));

    globe.pointsData(particles)
      .pointLat('lat')
      .pointLng('lng')
      .pointAltitude('altitude')
      .pointRadius('size')
      .pointColor(() => '#ffffff')
      .pointsMerge(false);

    globeInstanceRef.current = globe;

    // Handle resize
    const handleResize = () => {
      if (globeRef.current && globeInstanceRef.current) {
        const newWidth = globeRef.current.clientWidth;
        const newHeight = globeRef.current.clientHeight;
        globeInstanceRef.current.width(newWidth).height(newHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Auto-rotate
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.5;

    return () => {
      window.removeEventListener('resize', handleResize);
      if (globeInstanceRef.current) {
        globeInstanceRef.current._destructor();
      }
    };
  }, [width, height]);

  return (
    <div className={`w-full h-full relative group cursor-pointer ${className}`}>
      <div
        ref={globeRef}
        className="w-full h-full rounded-2xl overflow-hidden transition-all duration-500 group-hover:brightness-110"
        style={{
          background: 'radial-gradient(circle at center, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
        }}
      />

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 pointer-events-none" />

      {/* Animated particles on hover */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-1000 animate-ping"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
              animationDelay: `${i * 200}ms`,
              animationDuration: '2s'
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl pointer-events-none" />
    </div>
  );
};

export default SatelliteGlobe;
