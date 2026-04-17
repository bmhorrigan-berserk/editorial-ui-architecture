'use client';

import { useRef, ReactNode } from 'react';
import gsap from 'gsap';

/**
 * MagneticButton — Premium magnetic hover interaction
 *
 * Wraps any element and applies a GSAP-powered magnetic
 * attraction effect on mouse proximity. The element follows
 * the cursor within its bounding zone.
 *
 * Usage:
 *   <MagneticButton strength={0.4}>
 *     <button>Get Started</button>
 *   </MagneticButton>
 *
 * Rules:
 * - Wrap CTA buttons, nav links, and social icons
 * - strength: 0.2 (subtle) to 0.8 (strong pull)
 * - Never exceed strength 1.0 — feels broken
 * - Always pair with data-cursor="link" on the inner element
 */

interface MagneticButtonProps {
    children: ReactNode;
    strength?: number;
    className?: string;
}

export function MagneticButton({
    children,
    strength = 0.4,
    className,
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * strength;
        const deltaY = (e.clientY - centerY) * strength;

        gsap.to(el, {
                x: deltaX,
                y: deltaY,
                duration: 0.5,
                ease: 'power3.out',
        });
  };

  const handleMouseLeave = () => {
        gsap.to(ref.current, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: 'elastic.out(1, 0.4)',
        });
  };

  return (
        <div
                ref={ref}
                className={className}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ display: 'inline-block' }}
              >
          {children}
        </div>div>
      );
}</div>
