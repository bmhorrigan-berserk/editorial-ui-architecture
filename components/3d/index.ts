/**
 * index.ts
 * /components/3d/index.ts
 *
 * Barrel export for all 3D components.
 *
 * RULE: All React Three Fiber and Spline content must be wrapped using
 * components from this folder. Claude must NOT:
 *   - Create raw Canvas elements via @react-three/fiber directly in pages
 *   - Embed Spline via <script> tags, iframes, or CDN URLs
 *   - Instantiate new THREE.WebGLRenderer instances
 *   - Import @react-three/fiber or @splinetool/react-spline in page files
 *     (import only from this barrel instead)
 *
 * RULE: 3D scene logic lives here. Claude must import from this folder
 * rather than creating new Three.js scene setups.
 *
 * Available components:
 *   SceneWrapper  — React Three Fiber canvas with defaults, lighting, and Lenis parallax
 *   SplineEmbed   — Lazy-loaded Spline scene with Lenis integration
 *
 * Planned additions (create file then export here):
 *   ModelViewer      — GLTF/GLB model loader with GSAP-driven rotation
 *   ParticleField    — Shader-based ambient particle system
 *   ScrollMesh       — Geometry that deforms on GSAP scroll scrub
 *   EnvironmentRig   — HDRI environment preset for product renders
 */

// ─── React Three Fiber canvas ─────────────────────────────────────────────────
export { SceneWrapper } from './SceneWrapper';
export type { SceneWrapperProps } from './SceneWrapper';

// ─── Spline ───────────────────────────────────────────────────────────────────
export { SplineEmbed } from './SplineEmbed';
export type { SplineEmbedProps } from './SplineEmbed';
