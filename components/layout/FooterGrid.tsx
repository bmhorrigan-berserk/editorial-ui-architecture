/**
 * FooterGrid.tsx
 * /components/layout/FooterGrid.tsx
 *
 * Minimal editorial footer with a 12-column grid layout.
 * Entrance animation handled via useScrollTrigger (stagger on scroll).
 *
 * Props:
 *   brand       — Brand name or logo node
 *   columns     — Array of footer column objects
 *   bottomLinks — Legal/secondary links shown at the very bottom
 *   copyright   — Copyright string
 *
 * RULE: Do not create a new footer component if this satisfies the
 * client's needs. Import and pass new props instead.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { useScrollTrigger } from '../animations';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FooterLink {
  label: string;
  href:  string;
}

export interface FooterColumn {
  heading: string;
  links:   FooterLink[];
}

export interface FooterGridProps {
  brand?:       string | React.ReactNode;
  columns?:     FooterColumn[];
  bottomLinks?: FooterLink[];
  copyright?:   string;
  className?:   string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function FooterGrid({
  brand = 'Brand',
  columns = [],
  bottomLinks = [],
  copyright,
  className = '',
}: FooterGridProps) {
  // Stagger-in each column on scroll
  const footerRef = useScrollTrigger<HTMLElement>({
    animation: 'staggerChildren',
    staggerTarget: '.footer-col',
    start: 'top 90%',
  });

  const year = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      className={`
        w-full
        border-t border-graphite
        px-8 md:px-16 xl:px-24
        pt-16 md:pt-24
        pb-10
        ${className}
      `}
    >
      {/* Main grid */}
      <div className="grid grid-cols-12 gap-8 mb-16 md:mb-24">
        {/* Brand column */}
        <div className="footer-col col-span-12 md:col-span-4 lg:col-span-3">
          <div className="text-white font-display text-2xl tracking-tight mb-6">
            {brand}
          </div>
          <p className="text-ash text-sm leading-relaxed max-w-[24ch]">
            An independent design studio building digital experiences at the intersection of art and engineering.
          </p>
        </div>

        {/* Link columns */}
        {columns.map((col, i) => (
          <div
            key={i}
            className="footer-col col-span-6 md:col-span-2"
          >
            <h4 className="text-fog text-xs tracking-[0.15em] uppercase mb-6">
              {col.heading}
            </h4>
            <ul className="space-y-3">
              {col.links.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-ash text-sm hover:text-white will-opacity"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="
        flex flex-col md:flex-row
        items-start md:items-center
        justify-between
        gap-4
        pt-6 border-t border-graphite
      ">
        <p className="text-iron text-xs">
          {copyright ?? `© ${year} All rights reserved.`}
        </p>

        {bottomLinks.length > 0 && (
          <nav aria-label="Legal" className="flex gap-6">
            {bottomLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-iron text-xs hover:text-ash"
              >
                {label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </footer>
  );
}

export default FooterGrid;
