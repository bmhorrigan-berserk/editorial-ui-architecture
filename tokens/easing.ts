/**
 * /tokens/easing.ts
  *
   * Canonical easing curves for all animations in this system.
    * Import from here — never hardcode cubic-bezier values inline.
     *
      * Usage with GSAP:
       *   import { EASING } from '@/tokens/easing';
        *   gsap.to(el, { ease: EASING.premium, duration: 0.9 });
         *
          * Usage with CSS (custom properties):
           *   transition: transform 0.6s var(--ease-premium);
            */

            // ─── GSAP Easing Strings ──────────────────────────────────────────────────────

            export const EASING = {
              /** House curve — the default for all premium interactions */
                premium: 'cubic-bezier(0.76, 0, 0.24, 1)',

                  /** Dramatic entrance/exit — page transitions, hero reveals */
                    expoInOut: 'expo.inOut',

                      /** Standard content entrance — elements scrolling into view */
                        powerOut: 'power3.out',

                          /** Magnetic snap-back — elastic return after magnetic pull */
                            elasticOut: 'elastic.out(1, 0.4)',

                              /** Smooth hover transitions — button states, color changes */
                                smoothInOut: 'power2.inOut',

                                  /** Ultra-fast flick — quick UI feedback, micro-interactions */
                                    snapOut: 'power4.out',

                                      /** Soft content fade — opacity transitions, subtle reveals */
                                        gentleOut: 'power1.out',
                                        } as const;

                                        // ─── CSS Custom Properties ────────────────────────────────────────────────────
                                        // Add these to your globals.css :root block

                                        export const EASING_CSS_VARS = `
                                          --ease-premium: cubic-bezier(0.76, 0, 0.24, 1);
                                            --ease-expo: cubic-bezier(0.87, 0, 0.13, 1);
                                              --ease-smooth: cubic-bezier(0.45, 0, 0.55, 1);
                                                --ease-snap: cubic-bezier(0.22, 1, 0.36, 1);
                                                  --ease-gentle: cubic-bezier(0.25, 0.1, 0.25, 1);
                                                  `;

                                                  // ─── Duration Scale ───────────────────────────────────────────────────────────

                                                  export const DURATION = {
                                                    /** Micro-interactions: cursor hover, button state */
                                                      micro: 0.2,

                                                        /** Standard: most element entrances, hover effects */
                                                          standard: 0.6,

                                                            /** Deliberate: hero reveals, section transitions */
                                                              deliberate: 0.9,

                                                                /** Cinematic: page transitions, dramatic reveals */
                                                                  cinematic: 1.2,
                                                                  } as const;

                                                                  // ─── Stagger Scale ────────────────────────────────────────────────────────────

                                                                  export const STAGGER = {
                                                                    /** Tight: character-level text animation */
                                                                      tight: 0.03,

                                                                        /** Standard: word-level, icon groups */
                                                                          standard: 0.08,

                                                                            /** Generous: card grids, list items */
                                                                              generous: 0.12,

                                                                                /** Editorial: large feature sections */
                                                                                  editorial: 0.18,
                                                                                  } as const;
