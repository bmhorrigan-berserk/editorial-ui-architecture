/**
 * HeroSection.tsx
 * /components/layout/HeroSection.tsx
 *
 * Full-viewport editorial hero section with entrance animation.
 * Animation is driven entirely via useGSAPTimeline — no CSS keyframes.
 *
 * Props:
 *   eyebrow    — Small label above the headline
 *   headline   — Primary display type (split into words for GSAP)
 *   subline    — Supporting paragraph text
 *   cta        — Array of CTA link objects
 *   media      — Optional background image/video URL or React node
 *   mediaType  — 'image' | 'video' | 'node'
 *   overlay    — Overlay opacity (0–1), defaults to 0.3
 *
 * RULE: Do not create a new hero component if this satisfies the client's
 * needs. Import this component and pass different props instead.
 */

'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useGSAPTimeline, tweenWordReveal, tweenFadeUp, DURATION, EASING } from '../animations';
import gsap from 'gsap';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface HeroCTA {
  label:   string;
  href:    string;
  variant?: 'primary' | 'ghost';
}

export interface HeroSectionProps {
  eyebrow?:   string;
  headline:   string;
  subline?:   string;
  cta?:       HeroCTA[];
  media?:     string | React.ReactNode;
  mediaType?: 'image' | 'video' | 'node';
  overlay?:   number;
  className?: string;
  /** Full-height (100dvh) or auto height */
  fullHeight?: boolean;
}

// ─── Utility: split text into word spans ──────────────────────────────────────

function splitWords(text: string): React.ReactNode {
  return text.split(' ').map((word, i) => (
    <span key={i} className="inline-block overflow-hidden">
      <span className="word inline-block will-transform">
        {word}&nbsp;
      </span>
    </span>
  ));
}

// ─── Component ────────────────────────────────────────────────────────────────

export function HeroSection({
  eyebrow,
  headline,
  subline,
  cta = [],
  media,
  mediaType = 'image',
  overlay = 0.3,
  className = '',
  fullHeight = true,
}: HeroSectionProps) {
  const { tl, scope } = useGSAPTimeline();

  useEffect(() => {
    const el = scope.current;
    if (!el || !tl.current) return;

    const words   = el.querySelectorAll('.word');
    const eyebrowEl = el.querySelector('.hero-eyebrow');
    const sublineEl = el.querySelector('.hero-subline');
    const ctaEl     = el.querySelectorAll('.hero-cta');
    const lineEl    = el.querySelector('.hero-divider');

    tl.current
      .set(words,    { y: '110%', opacity: 0 })
      .set([eyebrowEl, sublineEl, ctaEl, lineEl], { opacity: 0, y: 20 });

    // Sequence entrance
    tweenWordReveal(tl.current, words);

    tl.current
      .to(lineEl, { opacity: 1, y: 0, duration: DURATION.FAST, ease: EASING.OUT_SINE }, '-=0.4')
      .to(eyebrowEl, { opacity: 1, y: 0, duration: DURATION.FAST, ease: EASING.OUT_SINE }, '<')
      .to(sublineEl, { opacity: 1, y: 0, duration: DURATION.BASE, ease: EASING.OUT_EXPO }, '-=0.2');

    if (ctaEl.length) {
      tweenFadeUp(tl.current, ctaEl, { stagger: 0.08 });
    }
  }, []);

  return (
    <section
      ref={scope as React.RefObject<HTMLElement>}
      className={`
        relative w-full overflow-hidden
        ${fullHeight ? 'min-h-[100dvh]' : 'min-h-[70vh]'}
        flex flex-col justify-end
        px-8 md:px-16 xl:px-24
        pb-16 md:pb-24 xl:pb-32
        pt-32
        ${className}
      `}
    >
      {/* Background Media */}
      {media && (
        <div className="absolute inset-0 z-0">
          {mediaType === 'image' && typeof media === 'string' && (
            <img
              src={media}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
            />
          )}
          {mediaType === 'video' && typeof media === 'string' && (
            <video
              src={media}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          )}
          {mediaType === 'node' && media}
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-obsidian"
            style={{ opacity: overlay }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-[1200px]">
        {/* Eyebrow */}
        {eyebrow && (
          <p className="hero-eyebrow text-ash text-xs tracking-[0.2em] uppercase mb-8 opacity-0">
            {eyebrow}
          </p>
        )}

        {/* Divider line */}
        <div className="hero-divider w-12 h-px bg-iron mb-8 opacity-0" />

        {/* Headline */}
        <h1 className="font-display text-5xl md:text-7xl xl:text-[clamp(4rem,8vw,9rem)] text-white leading-[1.02] tracking-[-0.03em] mb-8">
          {splitWords(headline)}
        </h1>

        {/* Subline */}
        {subline && (
          <p className="hero-subline font-body text-ash text-base md:text-lg max-w-xl leading-relaxed opacity-0 mb-12">
            {subline}
          </p>
        )}

        {/* CTAs */}
        {cta.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {cta.map(({ label, href, variant = 'primary' }) => (
              <Link
                key={href}
                href={href}
                className={`
                  hero-cta
                  inline-flex items-center justify-center
                  px-8 py-3.5
                  text-xs tracking-[0.18em] uppercase
                  opacity-0 will-transform
                  ${variant === 'primary'
                    ? 'bg-white text-obsidian hover:bg-cloud'
                    : 'border border-iron text-white hover:border-white'}
                `}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default HeroSection;
