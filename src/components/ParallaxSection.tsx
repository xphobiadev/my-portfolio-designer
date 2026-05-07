'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number; // 0.1 = slow, 1 = same speed, -0.5 = reverse
  direction?: 'vertical' | 'horizontal';
}

export default function ParallaxSection({ children, className = '', speed = 0.5, direction = 'vertical' }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const movement = (scrollProgress - 0.5) * speed * 100;
      setOffset(movement);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  const transform = direction === 'vertical' 
    ? `translateY(${offset}px)` 
    : `translateX(${offset}px)`;

  return (
    <div ref={ref} className={`${className}`}>
      <div style={{ transform, transition: 'transform 0.1s linear', willChange: 'transform' }}>
        {children}
      </div>
    </div>
  );
}
