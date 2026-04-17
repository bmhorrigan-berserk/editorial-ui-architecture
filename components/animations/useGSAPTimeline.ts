/**
 * useGSAPTimeline.ts
 * /components/animations/useGSAPTimeline.ts
 *
 * Base GSAP timeline factory with opinionated defaults for the
 * Quiet Luxury aesthetic. All tween durations, easings, and
 * stagger values are pre-configured to match the design system.
 *
 * Usage:
 *   import { useGSAPTimeline } from '@/components/animations'
 *
 *   const { tl, scope } = useGSAPTimeline({ scrollTrigger: true })
 *
 *   useEffect(() => {
 *     tl.current
 *       ?.fromTo(scope.current.querySelector('.hero-headline'), ...)
 *   }, [])
 *
 * Rules:
 *   - NEVER call gsap.to() or gsap.fromTo() directly in a component.
 *     Always use the timeline returned by this hook.
 *   - NEVER set CSS animation, transition, or @keyframes for motion.
 *     This hook is the single source of truth for all movement.
 */

'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getLenisInstance } from './useLenis';

// Register ScrollTrigger once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Design system easing constants ─────────────────────────────────────────

export const EASING = {
  /** Primary ease for entrances — smooth deceleration */
  OUT_EXPO:     'expo.out',
  /** Smooth bi-directional ease for position swaps */
  IN_OUT_CIRC:  'circ.inOut',
  /** Subtle ease for micro-interactions */
  OUT_SINE:     'sine.out',
  /** Sharp ease for exits */
  IN_EXPO:      'expo.in',
  /** Custom power ease matching brand feel */
  POWER4_OUT:   'power4.out',
} as const;

export const DURATION = {
  FAST:   0.35,
  BASE:   0.65,
  SLOW:   1.1,
  CINEMATIC: 1.8,
} as const;

export const STAGGER = {
  /** For lists of 3–6 items */
  TIGHT:  0.06,
  /** For lists of 7–12 items */
  BASE:   0.08,
  /** For hero headline word-by-word reveals */
  WIDE:   0.12,
} as const;

// ─── Types ────────────────────────────────────────────────────────────────────

export interface UseGSAPTimelineOptions {
  /**
   * Whether to wire ScrollTrigger to this timeline.
   * If true, you must provide scrollTriggerVars or defaults will apply.
   */
  scrollTrigger?: boolean;
  /**
   * ScrollTrigger configuration. Merged with safe defaults.
   * Ignored if scrollTrigger is false.
   */
  scrollTriggerVars?: Partial<ScrollTrigger.Vars>;
  /**
   * Whether to pause the timeline on creation (manual play control).
   * @default false
   */
  paused?: boolean;
  /**
   * Global defaults applied to every tween in this timeline.
   */
  defaults?: gsap.TweenVars;
}

export interface UseGSAPTimelineReturn {
  /** Mutable ref containing the GSAP timeline instance */
  tl: React.MutableRefObject<gsap.core.Timeline | null>;
  /** Ref to attach to the DOM container for scoped selectors */
  scope: React.RefObject<HTMLElement | null>;
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useGSAPTimeline(
  options: UseGSAPTimelineOptions = {}
): UseGSAPTimelineReturn {
  const {
    scrollTrigger = false,
    scrollTriggerVars = {},
    paused = false,
    defaults = {},
  } = options;

  const tl = useRef<gsap.core.Timeline | null>(null);
  const scope = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Sync ScrollTrigger with Lenis
    const lenis = getLenisInstance();
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.lagSmoothing(0);
    }

    const ctx = gsap.context(() => {
      const timelineVars: gsap.TimelineVars = {
        paused,
        defaults: {
          duration: DURATION.BASE,
          ease:     EASING.OUT_EXPO,
          ...defaults,
        },
      };

      if (scrollTrigger && scope.current) {
        timelineVars.scrollTrigger = {
          trigger:  scope.current,
          start:    'top 80%',
          end:      'bottom 20%',
          markers:  process.env.NODE_ENV === 'development' ? false : false,
          ...scrollTriggerVars,
        };
      }

      tl.current = gsap.timeline(timelineVars);
    }, scope);

    return () => {
      ctx.revert();
      tl.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { tl, scope };
}

// ─── Utility: pre-built tween factories ─────────────────────────────────────

/**
 * Standard fade-up reveal. Use for text blocks and cards.
 * Apply to the timeline returned by useGSAPTimeline.
 */
export function tweenFadeUp(
  tl: gsap.core.Timeline,
  targets: gsap.TweenTarget,
  vars: gsap.TweenVars = {}
) {
  return tl.fromTo(
    targets,
    { y: 40, opacity: 0, force3D: true },
    {
      y:        0,
      opacity:  1,
      duration: DURATION.BASE,
      ease:     EASING.OUT_EXPO,
      ...vars,
    }
  );
}

/**
 * Clip-path reveal. Use for images and full-bleed sections.
 */
export function tweenClipReveal(
  tl: gsap.core.Timeline,
  targets: gsap.TweenTarget,
  vars: gsap.TweenVars = {}
) {
  return tl.fromTo(
    targets,
    { clipPath: 'inset(0 0 100% 0)', force3D: true },
    {
      clipPath:  'inset(0 0 0% 0)',
      duration:  DURATION.SLOW,
      ease:      EASING.OUT_EXPO,
      ...vars,
    }
  );
}

/**
 * Staggered text split reveal (word by word).
 * Targets must be pre-split into .word spans before calling.
 */
export function tweenWordReveal(
  tl: gsap.core.Timeline,
  targets: gsap.TweenTarget,
  vars: gsap.TweenVars = {}
) {
  return tl.fromTo(
    targets,
    { y: '110%', opacity: 0, force3D: true },
    {
      y:        '0%',
      opacity:  1,
      duration: DURATION.BASE,
      ease:     EASING.POWER4_OUT,
      stagger:  STAGGER.WIDE,
      ...vars,
    }
  );
}
