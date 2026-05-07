'use client';

import { useRef, useState, ReactNode } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  strength?: number;
}

export default function MagneticButton({ children, className = '', onClick, href, strength = 30 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ripple, setRipple] = useState<{ x: number; y: number; show: boolean }>({ x: 0, y: 0, show: false });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * (strength / 100), y: y * (strength / 100) });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top, show: true });
    setTimeout(() => setRipple((r) => ({ ...r, show: false })), 600);
    onClick?.();
  };

  const content = (
    <div
      ref={ref}
      className={`relative overflow-hidden inline-flex items-center justify-center transition-transform duration-300 ease-out ${className}`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {children}
      {ripple.show && (
        <span
          className="absolute rounded-full bg-white/20 animate-ping pointer-events-none"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
        />
      )}
    </div>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }
  return content;
}
