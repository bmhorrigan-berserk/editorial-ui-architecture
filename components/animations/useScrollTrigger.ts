/**
 * useScrollTrigger.ts
 * /components/animations/useScrollTrigger.ts
 *
 * A composable GSAP ScrollTrigger utility hook.
 * Handles scroll-triggered animations with automatic cleanup,
 * Lenis integration, and batched performance optimisation.
 *
 * Usage:
 *   import { useScrollTrigger } from '@/components/animations'
 *
 *   // Reveal on scroll:
 *   const ref = useScrollTrigger<HTMLDivElement>({
 *     animation: 'fadeUp',
 *     start: 'top 85%',
 *   })
 *   return <div ref={ref}>...</div>
 *
 * Rules:
 *   - Do NOT create ScrollTrigger instances directly in components.
 *   - Do NOT use IntersectionObserver for animation purposes.
 *     This hook is the only authorised entry point.
 */

'use client';

import { useRef, useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getLenisInstance } from './useLenis';
import { EASING, DURATION, STAGGER } from './useGSAPTimeline';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type AnimationPreset =
  | 'fadeUp'
  | 'fadeIn'
  | 'clipReveal'
  | 'slideLeft'
  | 'slideRight'
  | 'scaleIn'
  | 'staggerChildren';

export interface UseScrollTriggerOptions {
  /**
   * Named animation preset to apply on scroll trigger.
   * @default 'fadeUp'
   */
  animation?: AnimationPreset;
  /**
   * ScrollTrigger start position.
   * @default 'top 82%'
   */
  start?: string;
  /**
   * ScrollTrigger end position (for scrub animations).
   */
  end?: string;
  /**
   * If true, scrubs the animation to the scroll position.
   * @default false
   */
  scrub?: boolean | number;
  /**
   * CSS selector for child elements to stagger.
   * Only used with the 'staggerChildren' preset.
   */
  staggerTarget?: string;
  /**
   * Whether to toggle class instead of tweening.
   * Useful for CSS-only non-motion reveals (e.g., colour changes).
   */
  toggleClass?: string;
  /**
   * Custom from/to vars. Overrides the preset when provided.
   */
  fromVars?: gsap.TweenVars;
  toVars?: gsap.TweenVars;
  /**
   * Whether to unpin the trigger after it fires once.
   * @default true (once)
   */
  once?: boolean;
}

// ─── Preset definitions ───────────────────────────────────────────────────────

const PRESETS: Record<
  AnimationPreset,
  { from: gsap.TweenVars; to: gsap.TweenVars }
> = {
  fadeUp: {
    from: { y: 48, opacity: 0, force3D: true },
    to:   { y: 0, opacity: 1, duration: DURATION.BASE, ease: EASING.OUT_EXPO },
  },
  fadeIn: {
    from: { opacity: 0 },
    to:   { opacity: 1, duration: DURATION.BASE, ease: EASING.OUT_SINE },
  },
  clipReveal: {
    from: { clipPath: 'inset(0 0 100% 0)', force3D: true },
    to:   { clipPath: 'inset(0 0 0% 0)', duration: DURATION.SLOW, ease: EASING.OUT_EXPO },
  },
  slideLeft: {
    from: { x: 80, opacity: 0, force3D: true },
    to:   { x: 0, opacity: 1, duration: DURATION.BASE, ease: EASING.OUT_EXPO },
  },
  slideRight: {
    from: { x: -80, opacity: 0, force3D: true },
    to:   { x: 0, opacity: 1, duration: DURATION.BASE, ease: EASING.OUT_EXPO },
  },
  scaleIn: {
    from: { scale: 0.92, opacity: 0, force3D: true },
    to:   { scale: 1, opacity: 1, duration: DURATION.SLOW, ease: EASING.OUT_EXPO },
  },
  staggerChildren: {
    from: { y: 32, opacity: 0, force3D: true },
    to:   { y: 0, opacity: 1, duration: DURATION.BASE, ease: EASING.OUT_EXPO, stagger: STAGGER.BASE },
  },
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useScrollTrigger<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollTriggerOptions = {}
): RefObject<T | null> {
  const {
    animation = 'fadeUp',
    start = 'top 82%',
    end,
    scrub = false,
    staggerTarget,
    toggleClass,
    fromVars,
    toVars,
    once = true,
  } = options;

  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    // Sync Lenis scroll proxy with ScrollTrigger
    const lenis = getLenisInstance();
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
    }

    const ctx = gsap.context(() => {
      if (toggleClass) {
        // Class-toggle mode — no tweening
        ScrollTrigger.create({
          trigger:    el,
          start,
          end,
          toggleClass: { targets: el, className: toggleClass },
          once,
        });
        return;
      }

      const preset = PRESETS[animation];
      const resolvedFrom = { ...preset.from, ...fromVars };
      const resolvedTo   = { ...preset.to, ...toVars };

      const targets =
        animation === 'staggerChildren' && staggerTarget
          ? el.querySelectorAll(staggerTarget)
          : el;

      if (scrub !== false) {
        // Scrub mode — tie animation to scroll position
        gsap.fromTo(targets, resolvedFrom, {
          ...resolvedTo,
          scrollTrigger: {
            trigger: el,
            start,
            end:     end ?? 'bottom top',
            scrub:   typeof scrub === 'number' ? scrub : 1,
          },
        });
      } else {
        // Standard one-shot trigger
        gsap.fromTo(targets, resolvedFrom, {
          ...resolvedTo,
          scrollTrigger: {
            trigger: el,
            start,
            end,
            once,
          },
        });
      }
    });

    return () => {
      ctx.revert();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
