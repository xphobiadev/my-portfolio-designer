'use client';

import React, { useEffect, useRef, useState } from 'react';

interface TextRevealProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  delay?: number;
  splitBy?: 'char' | 'word';
  animation?: 'fade-up' | 'fade-in' | 'clip';
}

export default function TextReveal({
  text,
  className = '',
  style,
  as: Tag = 'p',
  delay = 0,
  splitBy = 'char',
  animation = 'fade-up'
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const units = splitBy === 'char' ? text.split('') : text.split(' ');

  const getAnimationStyle = (index: number) => {
    const unitDelay = delay + index * (splitBy === 'char' ? 0.03 : 0.08);
    
    if (!isVisible) {
      switch (animation) {
        case 'fade-up':
          return { opacity: 0, transform: 'translateY(20px)', transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${unitDelay}s` };
        case 'fade-in':
          return { opacity: 0, transition: `opacity 0.5s ease ${unitDelay}s` };
        case 'clip':
          return { clipPath: 'inset(0 100% 0 0)', transition: `clip-path 0.6s cubic-bezier(0.77, 0, 0.175, 1) ${unitDelay}s` };
      }
    }
    
    switch (animation) {
      case 'fade-up':
        return { opacity: 1, transform: 'translateY(0)', transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${unitDelay}s` };
      case 'fade-in':
        return { opacity: 1, transition: `opacity 0.5s ease ${unitDelay}s` };
      case 'clip':
        return { clipPath: 'inset(0 0% 0 0)', transition: `clip-path 0.6s cubic-bezier(0.77, 0, 0.175, 1) ${unitDelay}s` };
    }
  };

  return (
    <Tag ref={ref as any} className={`${className}`} style={style} aria-label={text}>
      {units.map((unit, i) => (
        <span
          key={i}
          className="inline-block"
          style={getAnimationStyle(i)}
          aria-hidden="true"
        >
          {unit === ' ' ? '\u00A0' : unit}
          {splitBy === 'word' && i < units.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  );
}
