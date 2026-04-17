'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * CustomCursor — Premium magnetic cursor system
 *
 * Replaces the default browser cursor with a smooth,
 * physics-driven dot + follower ring. Reacts to:
 * - [data-cursor="text"]    → expands to a large text label
 * - [data-cursor="link"]    → shrinks to a small dot + inverts
 * - [data-cursor="drag"]    → shows drag indicator
 * - [data-cursor="hide"]    → hides cursor entirely
 *
 * Usage: Mount once at the root layout level.
 *   <CustomCursor />
 *
 * Rules:
 * - Always mount at layout level, never inside page components
 * - Uses GSAP quickTo for 60fps performance
 * - Never use CSS transition for cursor movement
 */

export function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

                // GSAP quickTo for buttery smooth tracking
                const moveDot = gsap.quickTo([dot], 'css', { duration: 0.1, ease: 'power3.out' });
        const moveRing = gsap.quickTo([ring], 'css', { duration: 0.5, ease: 'power3.out' });

                const xDot = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3.out' });
        const yDot = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3.out' });
        const xRing = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3.out' });
        const yRing = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3.out' });

                const handleMove = (e: MouseEvent) => {
                        xDot(e.clientX);
                        yDot(e.clientY);
                        xRing(e.clientX);
                        yRing(e.clientY);
                };

                const handleEnter = (e: MouseEvent) => {
                        const target = e.target as HTMLElement;
                        const cursorType = target.closest('[data-cursor]')?.getAttribute('data-cursor');

                        gsap.killTweensOf([dot, ring]);

                        if (cursorType === 'link') {
                                  gsap.to(ring, { scale: 1.8, opacity: 0.6, duration: 0.3, ease: 'power2.out' });
                                  gsap.to(dot, { scale: 0.4, duration: 0.3, ease: 'power2.out' });
                        } else if (cursorType === 'text') {
                                  gsap.to(ring, { scale: 4, opacity: 0.15, duration: 0.4, ease: 'expo.out' });
                                  gsap.to(dot, { scale: 0, duration: 0.3 });
                        } else if (cursorType === 'hide') {
                                  gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
                        } else if (cursorType === 'drag') {
                                  gsap.to(ring, { scale: 3, opacity: 0.4, duration: 0.4 });
                        }
                };

                const handleLeave = () => {
                        gsap.to(ring, { scale: 1, opacity: 1, duration: 0.4, ease: 'expo.out' });
                        gsap.to(dot, { scale: 1, opacity: 1, duration: 0.3, ease: 'expo.out' });
                };

                window.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseenter', handleEnter, true);
        document.addEventListener('mouseleave', handleLeave, true);

                return () => {
                        window.removeEventListener('mousemove', handleMove);
                        document.removeEventListener('mouseenter', handleEnter, true);
                        document.removeEventListener('mouseleave', handleLeave, true);
                };
  }, []);

  return (
        <>
          {/* Inner dot */}
              <div
                        ref={dotRef}
                        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white mix-blend-difference pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
                        style={{ willChange: 'transform' }}
                      />
          {/* Outer ring */}
              <div
                        ref={ringRef}
                        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white mix-blend-difference pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
                        style={{ willChange: 'transform' }}
                      />
        </>>
      );
}</>
