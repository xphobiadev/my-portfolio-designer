'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Only show custom cursor on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot follows instantly
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    const handleMouseEnterInteractive = () => setIsHovering(true);
    const handleMouseLeaveInteractive = () => setIsHovering(false);
    const handleMouseLeaveWindow = () => setIsHidden(true);
    const handleMouseEnterWindow = () => setIsHidden(false);

    // Smooth follow for outer cursor
    function animate() {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      if (cursor) {
        cursor.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px) scale(${isHovering ? 1.5 : 1})`;
      }
      requestAnimationFrame(animate);
    }
    animate();

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    // Add hover detection to interactive elements
    const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea, select, .magnetic');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnterInteractive);
      el.addEventListener('mouseleave', handleMouseLeaveInteractive);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
      });
    };
  }, [isHovering]);

  // Don't render on touch devices (check via CSS)
  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-[var(--color-accent)] pointer-events-none z-[99999] mix-blend-difference transition-opacity duration-300 hidden md:block"
        style={{ opacity: isHidden ? 0 : 0.8 }}
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[var(--color-accent)] pointer-events-none z-[99999] hidden md:block"
        style={{ opacity: isHidden ? 0 : 1 }}
      />
    </>
  );
}
