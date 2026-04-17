/**
 * index.ts
 * /components/animations/index.ts
 *
 * Barrel export for all animation hooks.
 *
 * RULE: ALL vector and layout movement must be routed through these
 * hooks. Standard CSS @keyframes, transition, and animation properties
 * are strictly forbidden for any layout or interactive element animation.
 *
 * RULE: Do NOT import gsap, ScrollTrigger, or Lenis directly in
 * components. Import only from this barrel.
 *
 * Available hooks:
 *   useLenis            — Lenis smooth scroll singleton
 *   useGSAPTimeline     — Base GSAP timeline factory
 *   useScrollTrigger    — Scroll-triggered animation utility
 *
 * Planned additions (add files then export here):
 *   useFadeIn           — Standard fade-in entrance animation
 *   useStaggerReveal    — Staggered text/element reveal hook
 *   useParallax         — GSAP-driven parallax depth effect
 *   useMagneticHover    — Magnetic cursor hover effect for CTAs
 *   usePageTransition   — Route transition animation controller
 */

// ─── Core scroll ─────────────────────────────────────────────────────────────
export { useLenis, getLenisInstance } from './useLenis';
export type { LenisState, UseLenisOptions } from './useLenis';

// ─── GSAP timeline factory ────────────────────────────────────────────────────
export {
  useGSAPTimeline,
  tweenFadeUp,
  tweenClipReveal,
  tweenWordReveal,
  EASING,
  DURATION,
  STAGGER,
} from './useGSAPTimeline';
export type { UseGSAPTimelineOptions, UseGSAPTimelineReturn } from './useGSAPTimeline';

// ─── Scroll trigger utility ───────────────────────────────────────────────────
export { useScrollTrigger } from './useScrollTrigger';
export type { UseScrollTriggerOptions, AnimationPreset } from './useScrollTrigger';
