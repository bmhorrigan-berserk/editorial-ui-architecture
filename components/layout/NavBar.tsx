/**
 * NavBar.tsx
 * /components/layout/NavBar.tsx
 *
 * Minimal editorial navigation bar.
 * Applies a scroll-driven opacity/transform transition via GSAP
 * (not CSS transitions). All motion is handled by useGSAPTimeline.
 *
 * Props:
 *   links     — Array of { label, href } nav items
 *   logo      — Optional React node for the brand mark
 *   ctaLabel  — Optional CTA button label
 *   ctaHref   — Optional CTA button href
 *
 * RULE: Do not create a new navigation component if this one
 * satisfies the client's needs. Import and modify this file instead.
 */

'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { useLenis } from '../animations';
import { EASING, DURATION } from '../animations';
import gsap from 'gsap';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href:  string;
}

export interface NavBarProps {
  links?:    NavLink[];
  logo?:     React.ReactNode;
  ctaLabel?: string;
  ctaHref?:  string;
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function NavBar({
  links = [],
  logo,
  ctaLabel,
  ctaHref,
  className = '',
}: NavBarProps) {
  const navRef   = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Subscribe to scroll position for hide-on-scroll behaviour
  const { scrollY, direction } = useLenis();

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    if (direction === -1) {
      // Scrolling down — hide nav
      gsap.to(nav, {
        yPercent:  -100,
        duration:  DURATION.FAST,
        ease:      EASING.IN_EXPO,
        overwrite: 'auto',
      });
    } else {
      // Scrolling up or at top — show nav
      gsap.to(nav, {
        yPercent:  0,
        duration:  DURATION.BASE,
        ease:      EASING.OUT_EXPO,
        overwrite: 'auto',
      });
    }
  }, [direction]);

  // Background opacity based on scroll depth
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const opacity = scrollY > 60 ? 1 : 0;
    gsap.to(nav, {
      '--nav-bg-opacity': opacity,
      duration:           DURATION.FAST,
      ease:               EASING.OUT_SINE,
      overwrite:          'auto',
    });
  }, [scrollY]);

  return (
    <header
      ref={navRef}
      className={`
        fixed top-0 left-0 right-0 z-50
        px-8 md:px-16 xl:px-24
        py-6
        flex items-center justify-between
        will-transform
        ${className}
      `}
      style={{
        // Custom property driven background — no CSS transition
        background: `rgba(10, 10, 10, var(--nav-bg-opacity, 0))`,
      }}
    >
      {/* Logo */}
      <div className="flex-shrink-0">
        {logo ?? (
          <Link href="/" className="text-white font-display text-lg tracking-widest uppercase">
            Brand
          </Link>
        )}
      </div>

      {/* Desktop Nav Links */}
      <nav className="hidden md:flex items-center gap-10" aria-label="Primary">
        {links.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="text-silver text-sm tracking-[0.12em] uppercase hover:text-white will-opacity"
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* CTA */}
      {ctaLabel && ctaHref && (
        <Link
          href={ctaHref}
          className="
            hidden md:inline-flex
            items-center justify-center
            px-6 py-2.5
            border border-iron
            text-white text-xs tracking-[0.15em] uppercase
            hover:border-white
            will-transform
          "
        >
          {ctaLabel}
        </Link>
      )}

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-white"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <span className="block w-5 h-px bg-current mb-1.5" />
        <span className="block w-5 h-px bg-current" />
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="
          absolute top-full left-0 right-0
          bg-obsidian border-t border-graphite
          px-8 py-8
          flex flex-col gap-6
        ">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className="text-white text-xl font-display tracking-tight"
            >
              {label}
            </Link>
          ))}
          {ctaLabel && ctaHref && (
            <Link
              href={ctaHref}
              className="self-start px-6 py-3 border border-iron text-white text-sm tracking-widest uppercase"
            >
              {ctaLabel}
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

export default NavBar;
