/**
 * useLenis.ts
 * /components/animations/useLenis.ts
 *
 * Singleton Lenis smooth scroll hook.
 * This is the ONLY authorised way to initialise Lenis in any project
 * that references this architecture repository.
 *
 * Usage:
 *   import { useLenis } from '@/components/animations'
 *
 *   // In _app.tsx or layout.tsx (root only — one instance per app):
 *   const { lenis } = useLenis()
 *
 *   // In any child component to read scroll position:
 *   const { scrollY, direction } = useLenis()
 *
 * Rules:
 *   - Do NOT call new Lenis() anywhere outside this hook.
 *   - Do NOT install or import lenis in any other file.
 *   - Pass the lenis instance into useGSAPTimeline via lenisRef if needed.
 */

'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Lenis from '@studio-freight/lenis';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface LenisState {
  lenis: Lenis | null;
  scrollY: number;
  direction: 1 | -1 | 0;
  velocity: number;
  progress: number; // 0–1 across the full document
}

export interface UseLenisOptions {
  /**
   * Whether to initialise Lenis on mount. Pass false when mounting a
   * component that is NOT the root layout — child components should
   * subscribe to the existing instance, not create a new one.
   * @default true (root) | false (child via context)
   */
  init?: boolean;
  /**
   * Duration of the lerp in seconds. Higher = slower, more cinematic.
   * @default 1.2
   */
  duration?: number;
  /**
   * Easing function applied to the scroll lerp.
   * @default (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
   */
  easing?: (t: number) => number;
  /**
   * Orientation of the scroll axis.
   * @default 'vertical'
   */
  orientation?: 'vertical' | 'horizontal';
  /**
   * Prevent Lenis on elements with this attribute.
   * @default 'data-lenis-prevent'
   */
  prevent?: (node: Element) => boolean;
}

// ─── Singleton store ──────────────────────────────────────────────────────────

let globalLenis: Lenis | null = null;
const subscribers = new Set<(state: Partial<LenisState>) => void>();

function notifySubscribers(state: Partial<LenisState>) {
  subscribers.forEach((fn) => fn(state));
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useLenis(options: UseLenisOptions = {}): LenisState {
  const {
    init = false,
    duration = 1.2,
    easing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation = 'vertical',
    prevent,
  } = options;

  const rafRef = useRef<number | null>(null);

  const [state, setState] = useState<LenisState>({
    lenis: null,
    scrollY: 0,
    direction: 0,
    velocity: 0,
    progress: 0,
  });

  const updateState = useCallback((partial: Partial<LenisState>) => {
    setState((prev) => ({ ...prev, ...partial }));
  }, []);

  useEffect(() => {
    if (!init) {
      // Subscribe to the existing global instance (child components)
      if (globalLenis) {
        updateState({ lenis: globalLenis });
      }

      subscribers.add(updateState);
      return () => {
        subscribers.delete(updateState);
      };
    }

    // Root: create the singleton
    const lenis = new Lenis({
      duration,
      easing,
      orientation,
      gestureOrientation: orientation,
      smoothWheel: true,
      touchMultiplier: 2,
      prevent,
    });

    globalLenis = lenis;
    updateState({ lenis });
    notifySubscribers({ lenis });

    // Scroll event listener
    lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }: {
      scroll: number;
      limit: number;
      velocity: number;
      direction: number;
      progress: number;
    }) => {
      const scrollState: Partial<LenisState> = {
        scrollY: scroll,
        direction: direction as 1 | -1,
        velocity,
        progress,
      };
      updateState(scrollState);
      notifySubscribers(scrollState);
    });

    // RAF loop — must be the only requestAnimationFrame driving Lenis
    function raf(time: number) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      lenis.destroy();
      globalLenis = null;
      notifySubscribers({ lenis: null, scrollY: 0, direction: 0, velocity: 0, progress: 0 });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [init]);

  return state;
}

// ─── Utility: get the singleton outside React (for GSAP ScrollTrigger) ────────

export function getLenisInstance(): Lenis | null {
  return globalLenis;
}
