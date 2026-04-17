import type { Config } from 'tailwindcss'

// ============================================================
// EDITORIAL UI ARCHITECTURE — TAILWIND DESIGN TOKEN LOCKDOWN
// "Quiet Luxury" Aesthetic Enforcement
//
// WARNING: Do not extend or override these tokens without
// explicit approval. Claude is constrained to ONLY these
// values. Any color, spacing, or font not listed here
// is forbidden.
// ============================================================

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],

  // Disable all default Tailwind utilities to prevent bleed
  corePlugins: {
    // Keep layout utilities
    container: true,
    display: true,
    float: true,
    overflow: true,
    position: true,
    // Disable anything that could generate visual noise
    animation: false, // All animation goes through GSAP
    backgroundImage: false, // No gradients
    backgroundOpacity: false,
    dropShadow: false,
    boxShadow: false,
    filter: false,
  },

  theme: {
    // ── LOCK SCREEN BREAKPOINTS ──────────────────────────────
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },

    // ── MONOCHROMATIC PALETTE ────────────────────────────────
    // All hues are derived from a single warm-neutral base.
    // No saturated colors. No accent colors.
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',
      black: '#0A0A0A',

      // Primary neutral scale (warm off-white → deep charcoal)
      neutral: {
        0:   '#FFFFFF',
        50:  '#F7F5F2', // Page background
        100: '#EDEAE5',
        150: '#E2DED8',
        200: '#D4CFC8',
        300: '#B8B2A9',
        400: '#9A9389',
        500: '#7C756A',
        600: '#5E5850',
        700: '#413C36',
        800: '#2A2620',
        900: '#171410',
        950: '#0A0A08',
      },

      // Accent: a single muted warm tone, used sparingly
      accent: {
        light:  '#C9B99A', // Warm parchment
        DEFAULT:'#A8936E', // Aged bronze
        dark:   '#7A6A4E', // Deep bronze
      },

      // Status colors (minimal, desaturated)
      status: {
        error:   '#8C4A4A',
        success: '#4A6B54',
        warning: '#8C7540',
      },
    },

    // ── EXAGGERATED WHITESPACE SCALE ────────────────────────
    // The base unit is 4px. All values are multiples.
    // Generous spacing forces luxury breathing room.
    spacing: {
      px:   '1px',
      0:    '0px',
      0.5:  '2px',
      1:    '4px',
      1.5:  '6px',
      2:    '8px',
      2.5:  '10px',
      3:    '12px',
      3.5:  '14px',
      4:    '16px',
      5:    '20px',
      6:    '24px',
      7:    '28px',
      8:    '32px',
      9:    '36px',
      10:   '40px',
      12:   '48px',
      14:   '56px',
      16:   '64px',
      20:   '80px',
      24:   '96px',
      28:   '112px',
      32:   '128px',
      36:   '144px',
      40:   '160px',
      48:   '192px',
      56:   '224px',
      64:   '256px',
      72:   '288px',
      80:   '320px',
      96:   '384px',
      // Heroic whitespace values — use for section padding
      120:  '480px',
      144:  '576px',
      160:  '640px',
      192:  '768px',
    },

    // ── TYPOGRAPHY ───────────────────────────────────────────
    // Exactly three typefaces. No others permitted.
    fontFamily: {
      // Display: High-contrast editorial serif
      display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      // Body: Refined grotesque sans
      sans:    ['"Suisse Int\'l"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      // Mono: Technical, for code or data labels only
      mono:    ['"Suisse Int\'l Mono"', '"Courier New"', 'monospace'],
    },

    // Fluid type scale — no mid-sized defaults
    fontSize: {
      // Micro labels
      '2xs':  ['10px', { lineHeight: '1.4', letterSpacing: '0.12em' }],
      xs:     ['12px', { lineHeight: '1.5', letterSpacing: '0.08em' }],
      sm:     ['14px', { lineHeight: '1.5', letterSpacing: '0.04em' }],
      // Body
      base:   ['16px', { lineHeight: '1.7', letterSpacing: '0.01em' }],
      lg:     ['18px', { lineHeight: '1.7', letterSpacing: '0.01em' }],
      xl:     ['20px', { lineHeight: '1.6', letterSpacing: '0em'    }],
      // Subheadings
      '2xl':  ['24px', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
      '3xl':  ['30px', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
      '4xl':  ['36px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
      // Display headings
      '5xl':  ['48px', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
      '6xl':  ['60px', { lineHeight: '1.0', letterSpacing: '-0.03em' }],
      '7xl':  ['72px', { lineHeight: '0.95',letterSpacing: '-0.04em' }],
      '8xl':  ['96px', { lineHeight: '0.92',letterSpacing: '-0.04em' }],
      // Hero / Masthead
      '9xl':  ['128px',{ lineHeight: '0.88',letterSpacing: '-0.05em' }],
      '10xl': ['160px',{ lineHeight: '0.85',letterSpacing: '-0.05em' }],
    },

    fontWeight: {
      thin:       '100',
      extralight: '200',
      light:      '300',
      normal:     '400',
      medium:     '500',
      semibold:   '600',
      bold:       '700',
      // No "black" (900) weight — too aggressive for this aesthetic
    },

    letterSpacing: {
      tightest: '-0.05em',
      tighter:  '-0.03em',
      tight:    '-0.01em',
      normal:   '0em',
      wide:     '0.04em',
      wider:    '0.08em',
      widest:   '0.16em',
      // For all-caps eyebrow labels
      display:  '0.24em',
    },

    lineHeight: {
      none:    '1',
      tighter: '0.85',
      tight:   '0.95',
      snug:    '1.1',
      normal:  '1.4',
      relaxed: '1.6',
      loose:   '1.8',
      // For large body blocks
      reading: '1.75',
    },

    // ── BORDER RADIUS ───────────────────────────────────────
    // Minimal. Sharp edges are preferred.
    borderRadius: {
      none: '0',
      sm:   '2px',
      DEFAULT:'4px',
      md:   '6px',
      lg:   '8px',
      // No "full" pill shapes — not aligned with aesthetic
    },

    // ── Z-INDEX ─────────────────────────────────────────────
    zIndex: {
      behind:  '-1',
      base:    '0',
      raised:  '10',
      overlay: '20',
      modal:   '30',
      nav:     '40',
      toast:   '50',
    },

    // ── ASPECT RATIOS ───────────────────────────────────────
    aspectRatio: {
      auto:     'auto',
      square:   '1 / 1',
      video:    '16 / 9',
      cinema:   '21 / 9',
      portrait: '3 / 4',
      editorial:'4 / 5',
    },

    // Disable default shadows entirely
    boxShadow:  { none: 'none' },
    dropShadow: { none: '0 0 0 transparent' },

    extend: {},
  },

  plugins: [],
}

export default config
