'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

/**
 * PageTransition — Choreographed page transition system
 *
 * Wraps the page content and manages enter/exit animations
 * on route changes. Uses a curtain overlay that wipes in
 * and out using clip-path or translate.
 *
 * Transition modes:
 * - 'curtain'   → Full-screen overlay wipes down then up
 * - 'fade'      → Opacity fade with slight y movement
 * - 'clip'      → Clip-path reveal from bottom edge
 *
 * Usage: Mount in root layout, wrap {children}
 *   <PageTransition mode="curtain">
 *     {children}
 *   </PageTransition>
 *
 * Rules:
 * - Only one PageTransition may exist in the tree at once
 * - Never nest PageTransition components
 * - Always use mode="curtain" for portfolio/luxury sites
 * - Transition duration should not exceed 1.2s total
 */

type TransitionMode = 'curtain' | 'fade' | 'clip';

interface PageTransitionProps {
    children: ReactNode;
    mode?: TransitionMode;
    color?: string;
    duration?: number;
}

export function PageTransition({
    children,
    mode = 'curtain',
    color = '#0a0a0a',
    duration = 0.8,
}: PageTransitionProps) {
    const curtainRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

  useEffect(() => {
        const curtain = curtainRef.current;
        const content = contentRef.current;
        if (!curtain || !content) return;

                const ctx = gsap.context(() => {
                        if (mode === 'curtain') {
                                  // Enter: curtain slides away upward
                          gsap.set(curtain, { yPercent: 0 });
                                  gsap.to(curtain, {
                                              yPercent: -100,
                                              duration,
                                              ease: 'expo.inOut',
                                              delay: 0.1,
                                  });
                                  // Content fades in after curtain clears
                          gsap.from(content, {
                                      opacity: 0,
                                      y: 20,
                                      duration: 0.6,
                                      ease: 'power3.out',
                                      delay: duration * 0.6,
                          });
                        } else if (mode === 'fade') {
                                  gsap.from(content, {
                                              opacity: 0,
                                              y: 30,
                                              duration,
                                              ease: 'power3.out',
                                  });
                        } else if (mode === 'clip') {
                                  gsap.from(content, {
                                              clipPath: 'inset(100% 0% 0% 0%)',
                                              duration,
                                              ease: 'expo.inOut',
                                  });
                        }
                });

                return () => ctx.revert();
  }, [pathname, mode, duration]);

  return (
        <div className="relative">
          {/* Transition curtain overlay */}
          {mode === 'curtain' && (
                  <div
                              ref={curtainRef}
                              className="fixed inset-0 z-[9990] pointer-events-none"
                              style={{ backgroundColor: color }}
                            />
                )}
          {/* Page content */}
              <div ref={contentRef}>
                {children}
              </div>div>
        </div>div>
      );
}</div>
