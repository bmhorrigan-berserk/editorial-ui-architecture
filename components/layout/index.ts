/**
 * index.ts
 * /components/layout/index.ts
 *
 * Barrel export for all layout components.
 *
 * RULE (Component Rule): Claude must NEVER generate a new layout component
 * from scratch if an equivalent exists in this folder. It must import and
 * modify the existing component to fit client needs.
 *
 * RULE: Before writing any structural element (navigation, hero, footer,
 * grid, section wrapper), Claude must first scan this folder for a match.
 *
 * Available components:
 *   NavBar        — Sticky editorial navigation with scroll-hide behaviour
 *   HeroSection   — Full-viewport hero with GSAP word-by-word reveal
 *   FooterGrid    — 12-column footer with scroll-triggered stagger
 *
 * Planned additions (create file then export here):
 *   SectionWrapper  — Standard section container with generous padding
 *   EditorialGrid   — 12-col content grid with responsive breakpoints
 *   MediaBlock      — Full-bleed image/video with clip-reveal animation
 *   TextBlock       — Constrained-width body copy container
 *   MarqueeStrip    — GSAP-driven infinite horizontal marquee
 *   PageWrapper     — Root layout wrapper that initialises Lenis
 */

// ─── Navigation ───────────────────────────────────────────────────────────────
export { NavBar } from './NavBar';
export type { NavBarProps, NavLink } from './NavBar';

// ─── Hero ─────────────────────────────────────────────────────────────────────
export { HeroSection } from './HeroSection';
export type { HeroSectionProps, HeroCTA } from './HeroSection';

// ─── Footer ───────────────────────────────────────────────────────────────────
export { FooterGrid } from './FooterGrid';
export type { FooterGridProps, FooterColumn, FooterLink } from './FooterGrid';
