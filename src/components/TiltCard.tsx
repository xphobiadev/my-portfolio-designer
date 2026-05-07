'use client';

import { useRef, useState, ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltStrength?: number;
  glare?: boolean;
  scale?: number;
}

export default function TiltCard({ children, className = '', tiltStrength = 15, glare = true, scale = 1.02 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    const rotateX = (0.5 - y) * tiltStrength;
    const rotateY = (x - 0.5) * tiltStrength;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`);
    setGlarePosition({ x: x * 100, y: y * 100 });
  };

  const handleMouseEnter = () => setIsHovering(true);
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
  };

  return (
    <div
      ref={ref}
      className={`relative transition-transform duration-300 ease-out ${className}`}
      style={{ transform, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {glare && isHovering && (
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit] z-10"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
          }}
        />
      )}
    </div>
  );
}
