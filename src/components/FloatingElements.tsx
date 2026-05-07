'use client';

import { useRef } from 'react';

interface FloatingElementsProps {
  count?: number;
  className?: string;
}

export default function FloatingElements({ count = 5, className = '' }: FloatingElementsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const shapes = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 60 + 20,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 4 + 4,
    delay: Math.random() * 2,
    opacity: Math.random() * 0.1 + 0.03,
    type: i % 3, // 0 = circle, 1 = square rotated, 2 = ring
  }));

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className="absolute rounded-full"
          style={{
            width: shape.size,
            height: shape.size,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            opacity: shape.opacity,
            border: shape.type === 2 ? '1px solid var(--color-accent)' : 'none',
            background: shape.type === 0 
              ? 'var(--color-accent)' 
              : shape.type === 1 
                ? 'var(--color-accent-secondary)' 
                : 'transparent',
            borderRadius: shape.type === 1 ? '4px' : '50%',
            transform: shape.type === 1 ? 'rotate(45deg)' : 'none',
            animation: `float ${shape.duration}s ease-in-out ${shape.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
