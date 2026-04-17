/**
 * SplineEmbed.tsx
 * /components/3d/SplineEmbed.tsx
 *
 * Lazy-loaded Spline scene embed wrapper.
 * Handles loading state, error boundary, and pointer event management.
 * Integrates with the Lenis scroll system to suspend Lenis during
 * pointer-down events so the Spline orbit control doesn't fight scrolling.
 *
 * Usage:
 *   import { SplineEmbed } from '@/components/3d'
 *
 *   <SplineEmbed
 *     url="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode"
 *     className="w-full h-[80vh]"
 *   />
 *
 * Rules:
 *   - Do NOT embed Spline scenes via raw <script> tags or iframes.
 *     Always use this wrapper.
 *   - Do NOT add multiple Spline scenes to a single page — performance cost
 *     is high. Use SceneWrapper with React Three Fiber for secondary 3D elements.
 *   - The Bloat Rule applies: do NOT load @splinetool/runtime via CDN.
 *     It must be installed in package.json and imported here only.
 */

'use client';

import React, { Suspense, lazy, useCallback } from 'react';
import type { SplineEvent } from '@splinetool/react-spline';
import { getLenisInstance } from '../animations/useLenis';

// Lazy load Spline to prevent SSR issues and reduce initial bundle
const Spline = lazy(() => import('@splinetool/react-spline'));

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SplineEmbedProps {
  /** Spline scene URL from prod.spline.design */
  url:          string;
  className?:   string;
  /** Aspect ratio class applied to the container @default 'aspect-square' */
  aspectClass?: string;
  /** Whether orbit/rotation is enabled (passed to Spline via events) */
  interactive?: boolean;
  /** Callback when scene loads */
  onLoad?:      (splineApp: unknown) => void;
  /** Fallback element while loading */
  fallback?:    React.ReactNode;
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────

function SplineSkeleton() {
  return (
    <div className="w-full h-full bg-graphite flex items-center justify-center">
      <div className="w-8 h-px bg-iron animate-none">
        {/* Static indicator — no CSS animation per Bloat Rule */}
      </div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SplineEmbed({
  url,
  className = '',
  aspectClass = 'aspect-square',
  interactive = true,
  onLoad,
  fallback,
}: SplineEmbedProps) {

  // Suspend Lenis while user interacts with Spline to prevent scroll conflicts
  const handlePointerDown = useCallback(() => {
    if (!interactive) return;
    const lenis = getLenisInstance();
    lenis?.stop();
  }, [interactive]);

  const handlePointerUp = useCallback(() => {
    if (!interactive) return;
    const lenis = getLenisInstance();
    lenis?.start();
  }, [interactive]);

  const handleLoad = useCallback((splineApp: unknown) => {
    onLoad?.(splineApp);
  }, [onLoad]);

  return (
    <div
      className={`relative w-full ${aspectClass} overflow-hidden ${className}`}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <Suspense fallback={fallback ?? <SplineSkeleton />}>
        <Spline
          scene={url}
          onLoad={handleLoad}
          style={{
            width:    '100%',
            height:   '100%',
            position: 'absolute',
            inset:    0,
          }}
        />
      </Suspense>
    </div>
  );
}

export default SplineEmbed;
