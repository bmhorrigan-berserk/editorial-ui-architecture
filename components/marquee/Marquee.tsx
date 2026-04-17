'use client';

import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';

/**
 * Marquee — Velocity-aware infinite scroll ticker
 *
 * A GSAP-powered infinite horizontal marquee that reacts to
 * scroll velocity. Speeds up when scrolling, reverses direction
 * when direction changes, and settles back to base speed.
 *
 * Usage:
 *   <Marquee speed={0.5} direction={1}>
 *     <span>Brand Name</span>
 *     <span>·</span>
 *     <span>Studio Work</span>
 *     <span>·</span>
 *   </Marquee>
 *
 * Rules:
 * - Always duplicate children twice for seamless looping
 * - speed: 0.3 (slow/editorial) to 1.5 (energetic)
 * - direction: 1 (left) or -1 (right)
 * - Pair with large display typography for premium feel
 */

interface MarqueeProps {
    children: ReactNode;
    speed?: number;
    direction?: 1 | -1;
    className?: string;
    pauseOnHover?: boolean;
}

export function Marquee({
    children,
    speed = 0.5,
    direction = 1,
    className,
    pauseOnHover = true,
}: MarqueeProps) {
    const trackRef = useRef<HTMLDivElement>(null);
    const xRef = useRef(0);
    const velocityRef = useRef(0);
    const lastScrollY = useRef(0);
    const isPaused = useRef(false);
    const rafRef = useRef<number>();

  useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

                const totalWidth = track.scrollWidth / 2;
        let x = 0;

                const handleScroll = () => {
                        const scrollDelta = window.scrollY - lastScrollY.current;
                        velocityRef.current = scrollDelta * 0.04;
                        lastScrollY.current = window.scrollY;
                };

                const tick = () => {
                        if (!isPaused.current) {
                                  const baseSpeed = speed * direction;
                                  velocityRef.current *= 0.95; // friction decay
                          x -= baseSpeed + velocityRef.current;

                          if (Math.abs(x) >= totalWidth) {
                                      x = 0;
                          }

                          gsap.set(track, { x });
                        }
                        rafRef.current = requestAnimationFrame(tick);
                };

                window.addEventListener('scroll', handleScroll, { passive: true });
        rafRef.current = requestAnimationFrame(tick);

                if (pauseOnHover) {
                        track.addEventListener('mouseenter', () => { isPaused.current = true; });
                        track.addEventListener('mouseleave', () => { isPaused.current = false; });
                }

                return () => {
                        window.removeEventListener('scroll', handleScroll);
                        if (rafRef.current) cancelAnimationFrame(rafRef.current);
                };
  }, [speed, direction, pauseOnHover]);

  return (
        <div className={`overflow-hidden ${className ?? ''}`}>
                <div ref={trackRef} className="flex whitespace-nowrap will-change-transform">
                  {/* Duplicate children for seamless loop */}
                        <div className="flex items-center">{children}</div>div>
                        <div className="flex items-center" aria-hidden>{children}</div>div>
                </div>div>
        </div>div>
      );
}</div>
