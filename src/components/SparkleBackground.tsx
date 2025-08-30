import React, { useEffect, useState } from 'react';

interface SparkleProps {
  className?: string;
}

const SparkleBackground: React.FC<SparkleProps> = ({ className = "" }) => {
  const [sparkles, setSparkles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 5,
      }));
      setSparkles(newSparkles);
    };

    generateSparkles();
    const interval = setInterval(generateSparkles, 10000); // Regenerate every 10 seconds

    // Mouse tracking for sparkle effect
    const handleMouseMove = (e: MouseEvent) => {
      const sparkle = document.getElementById('mouse-sparkle');
      if (sparkle) {
        sparkle.style.left = `${e.clientX}px`;
        sparkle.style.top = `${e.clientY}px`;
        sparkle.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      const sparkle = document.getElementById('mouse-sparkle');
      if (sparkle) {
        sparkle.style.opacity = '0';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearInterval(interval);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 ${className}`}>
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute animate-pulse"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
            borderRadius: '50%',
            animation: `sparkle ${sparkle.duration}s ease-in-out infinite`,
            animationDelay: `${sparkle.delay}s`,
          }}
        />
      ))}

      {/* Falling stars effect */}
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={`falling-${i}`}
          className="absolute w-px h-20 bg-gradient-to-b from-white to-transparent animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-20px',
            animation: `fall ${Math.random() * 3 + 2}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      {/* Mouse following sparkle */}
      <div
        className="fixed w-4 h-4 bg-white rounded-full pointer-events-none opacity-0 transition-opacity duration-300 z-10"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.3) 70%, transparent 100%)',
          transform: 'translate(-50%, -50%)',
        }}
        id="mouse-sparkle"
      />

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes sparkle {
            0%, 100% {
              opacity: 0;
              transform: scale(0.5);
            }
            50% {
              opacity: 1;
              transform: scale(1.2);
            }
          }

          @keyframes fall {
            0% {
              transform: translateY(-20px);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateY(100vh);
              opacity: 0;
            }
          }
        `
      }} />
    </div>
  );
};

export default SparkleBackground;
