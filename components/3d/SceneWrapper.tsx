/**
 * SceneWrapper.tsx
 * /components/3d/SceneWrapper.tsx
 *
 * React Three Fiber canvas wrapper with sensible defaults for the
 * Quiet Luxury aesthetic. Handles:
 *   - Lazy loading (canvas only renders when in view)
 *   - Pixel ratio capping (performance)
 *   - Ambient + directional light defaults
 *   - Error boundary with graceful fallback
 *   - GSAP / Lenis scroll-driven camera parallax (optional)
 *
 * Usage:
 *   import { SceneWrapper } from '@/components/3d'
 *
 *   <SceneWrapper className="h-screen" cameraZ={5}>
 *     <MyR3FScene />
 *   </SceneWrapper>
 *
 * Rules:
 *   - Do NOT call new THREE.WebGLRenderer() or create a raw canvas.
 *     Always wrap React Three Fiber content in this component.
 *   - Do NOT install or import @react-three/fiber directly in page files.
 *     Import from '@/components/3d' only.
 *   - Scene lighting is standardised — do not add more than one additional
 *     directional light without explicit user approval.
 */

'use client';

import React, { Suspense, useRef, useEffect, Component, ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useIntersect } from '@react-three/drei';
import * as THREE from 'three';
import { getLenisInstance } from '../animations/useLenis';

// ─── Error Boundary ───────────────────────────────────────────────────────────

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class SceneErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="w-full h-full bg-graphite flex items-center justify-center">
            <p className="text-iron text-sm tracking-widest uppercase">3D unavailable</p>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

// ─── Scroll-driven camera parallax ────────────────────────────────────────────

function CameraParallax({ strength = 0.3 }: { strength?: number }) {
  const { camera } = useThree();
  const targetY    = useRef(0);

  useEffect(() => {
    const lenis = getLenisInstance();
    if (!lenis) return;

    const handler = ({ scroll }: { scroll: number }) => {
      targetY.current = -scroll * 0.001 * strength;
    };

    lenis.on('scroll', handler);
    return () => lenis.off('scroll', handler);
  }, [strength]);

  useFrame(() => {
    camera.position.y += (targetY.current - camera.position.y) * 0.08;
  });

  return null;
}

// ─── Default Lighting Rig ─────────────────────────────────────────────────────

function DefaultLights() {
  return (
    <>
      {/* Soft ambient — matches the obsidian colour palette */}
      <ambientLight intensity={0.4} color="#E0E0E0" />
      {/* Key light — slightly warm, directional */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        color="#F5F5F0"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      {/* Fill light — cool, low intensity */}
      <directionalLight
        position={[-4, -2, -4]}
        intensity={0.3}
        color="#9AA4B2"
      />
    </>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SceneWrapperProps {
  children:         React.ReactNode;
  className?:       string;
  /** Camera Z position @default 5 */
  cameraZ?:         number;
  /** Camera field of view @default 45 */
  fov?:             number;
  /** Enable orbit controls (dev/showcase mode only) @default false */
  orbit?:           boolean;
  /** Enable scroll-driven camera parallax @default true */
  scrollParallax?:  boolean;
  /** Parallax strength multiplier @default 0.3 */
  parallaxStrength?: number;
  /** Fallback content while 3D scene loads */
  fallback?:        React.ReactNode;
  /** Custom lights (replaces DefaultLights) */
  lights?:          React.ReactNode;
  /** Tone mapping @default THREE.ACESFilmicToneMapping */
  toneMapping?:     THREE.ToneMapping;
  /** Exposure @default 1 */
  exposure?:        number;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SceneWrapper({
  children,
  className = '',
  cameraZ = 5,
  fov = 45,
  orbit = false,
  scrollParallax = true,
  parallaxStrength = 0.3,
  fallback,
  lights,
  toneMapping = THREE.ACESFilmicToneMapping,
  exposure = 1,
}: SceneWrapperProps) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <SceneErrorBoundary fallback={fallback}>
        <Canvas
          camera={{ position: [0, 0, cameraZ], fov, near: 0.1, far: 100 }}
          dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)]}
          gl={{
            antialias:        true,
            alpha:            true,
            toneMapping,
            toneMappingExposure: exposure,
            outputColorSpace: THREE.SRGBColorSpace,
          }}
          shadows
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            {/* Lighting */}
            {lights ?? <DefaultLights />}

            {/* Scroll-driven camera parallax */}
            {scrollParallax && <CameraParallax strength={parallaxStrength} />}

            {/* Orbit controls — disable in production */}
            {orbit && <OrbitControls enableZoom={false} enablePan={false} />}

            {/* Scene content */}
            {children}
          </Suspense>
        </Canvas>
      </SceneErrorBoundary>
    </div>
  );
}

export default SceneWrapper;
