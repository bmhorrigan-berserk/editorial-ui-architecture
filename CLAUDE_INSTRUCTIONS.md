# Editorial UI Architecture — Master Rulebook for Claude

This file is the **absolute rulebook** for how Claude must behave when building websites and UI components connected to this repository. Read this file first, every time, before taking any action on a connected project.

---

## PRIME DIRECTIVE

This repository is a **premium design system and skill library**. It is the single source of truth for all UI components, animations, 3D scenes, interaction patterns, and design tokens. Claude must treat every pattern here as the enforced standard.

The goal is to produce websites that look and move like **world-class, award-winning digital experiences** — the caliber of Awwwards, FWA, and Lapa Ninja featured work.

---

## FOLDER MAP

| Folder | Contents |
|---|---|
| `/components/layout` | Navigation, hero sections, footer grids, page wrappers |
| `/components/animations` | GSAP hooks, Lenis smooth scroll, scroll-triggered utilities |
| `/components/3d` | React Three Fiber wrappers, Spline scene embeds |
| `/components/typography` | Kinetic type, split-text, text reveal, variable font hooks |
| `/components/cursor` | Custom cursor, magnetic hover, trail effects |
| `/components/transitions` | Page transitions, reveal wrappers, clip-path transitions |
| `/components/magnetic` | Magnetic buttons, tilt cards, repel/attract effects |
| `/components/marquee` | Infinite scroll marquee, velocity-driven ticker |
| `/tools` | Tech stack reference, library usage rules, dependency list |
| `/tokens` | Design tokens — colors, spacing, typography, easing curves |
| `/styles` | Global CSS, Tailwind base directives, font-face declarations |
| `tailwind.config.ts` | Canonical Tailwind design token config |

---

## RULE 1 — THE COMPONENT RULE

Claude must never generate a new layout component from scratch if an equivalent already exists in `/components/layout`. Before writing any structural element (navigation, hero, footer, grid, section wrapper), Claude must scan `/components/layout` for an existing match and extend it. New layout components may only be created if no equivalent exists AND the user has explicitly authorized it.

---

## RULE 2 — THE ANIMATION RULE

- All layout and interactive element animation must use **GSAP** via the hooks in `/components/animations`
- - Standard CSS `@keyframes`, `transition`, and `animation` are **forbidden** for layout or interactive elements
  - - **Lenis** smooth scrolling must use the existing wrapper in `/components/animations/useLenis.ts`
    - - **ScrollTrigger** animations must use `/components/animations/useScrollTrigger.ts`
      - - **GSAP timelines** must use `/components/animations/useGSAPTimeline.ts`
        - - The only exception: purely decorative single-frame text reveals may use CSS `opacity` or `transform`
         
          - ---

          ## RULE 3 — THE 3D RULE

          - All 3D scenes use **React Three Fiber** via `/components/3d/SceneWrapper.tsx`
          - - All Spline scene embeds use `/components/3d/SplineEmbed.tsx`
            - - Claude must never create a new raw `THREE.Scene` setup — always import from `/components/3d`
              - - 3D scenes must be lazy-loaded and wrapped in `<Suspense>`
                - - Preferred 3D techniques: floating geometry, morphing meshes, particle systems, environment maps, post-processing bloom/chromatic aberration
                 
                  - ---

                  ## RULE 4 — THE TYPOGRAPHY RULE

                  - All kinetic type, split-text effects, and text reveals use hooks from `/components/typography`
                  - - Typefaces are **strictly limited** to those defined in `/tokens/typography.ts`
                    - - Variable fonts are preferred for any animated type
                      - - Default type hierarchy: Display → Heading → Subheading → Body → Caption
                        - - Letter-spacing is always generous on display sizes (minimum `0.02em`)
                         
                          - ---

                          ## RULE 5 — THE INTERACTION RULE

                          - Custom cursor behavior uses `/components/cursor`
                          - - Magnetic effects on buttons and links use `/components/magnetic`
                            - - Hover states must feel considered — never default browser outlines or simple color swaps
                              - - Tilt/parallax card effects use `/components/magnetic/TiltCard.tsx`
                                - - All interactive elements must have a defined hover AND focus state
                                 
                                  - ---

                                  ## RULE 6 — THE TRANSITION RULE

                                  - Page transitions use `/components/transitions`
                                  - - Preferred transition patterns: clip-path wipe, opacity + scale, curtain reveal
                                    - - No hard page cuts. Every navigation must feel choreographed.
                                     
                                      - ---

                                      ## RULE 7 — THE BLOAT RULE

                                      No third-party widget scripts, tracking pixels, or SaaS automation code may be injected without explicit user authorization. Prohibited without permission: analytics snippets, chat widgets, ad pixels, SaaS embeds, any `<script>` from an external CDN not already in the repo.

                                      ---

                                      ## DESIGN PHILOSOPHY — QUIET LUXURY + KINETIC EDITORIAL

                                      This system enforces a hybrid aesthetic: **Quiet Luxury** structure with **Kinetic Editorial** motion.

                                      ### Visual Principles
                                      - **Monochromatic palettes only.** No accent colors outside the approved token set
                                      - - **Exaggerated whitespace.** Spacing is always generous. When in doubt, add more space
                                        - - **No visual noise.** No borders, drop shadows, or gradients unless defined in the component library
                                          - - **Typography is the hero.** Large, confident type with intentional hierarchy
                                           
                                            - ### Motion Principles
                                            - - **Every element earns its place on screen.** Entrances are choreographed, not instant
                                              - - **Physics-based easing only.** Use `CustomEase` or GSAP's `power3`, `expo`, `elastic` — never `linear` or `ease`
                                                - - **Staggered reveals.** Lists, grids, and groups always stagger their entrance (0.08s–0.12s offset)
                                                  - - **Parallax is subtle.** Depth is felt, not seen
                                                    - - **Scroll is the timeline.** ScrollTrigger should be the primary driver of narrative pacing
                                                     
                                                      - ### 3D Principles
                                                      - - **3D is accent, not decoration.** It should serve the story of the page
                                                        - - **Performance first.** Never exceed 60fps budget. Use instanced meshes for repeated geometry
                                                          - - **Lighting matters.** Use HDR environment maps or carefully crafted directional + ambient rigs
                                                            - - **Prefer abstract geometry** over literal 3D objects unless the brand calls for realism
                                                             
                                                              - ---

                                                              ## APPROVED TECH STACK

                                                              | Category | Library | Version Target |
                                                              |---|---|---|
                                                              | Animation | GSAP + ScrollTrigger + CustomEase | 3.x |
                                                              | Smooth Scroll | Lenis | latest |
                                                              | 3D (code) | React Three Fiber + Drei + Postprocessing | latest |
                                                              | 3D (no-code) | Spline | latest |
                                                              | Styling | Tailwind CSS | 3.x |
                                                              | Framework | Next.js (App Router) | 14.x+ |
                                                              | Language | TypeScript | 5.x |
                                                              | Variable Fonts | CSS `font-variation-settings` via custom hooks | — |

                                                              ---

                                                              ## PERFORMANCE RULES

                                                              - All 3D and heavy animation components must be **dynamically imported** (`next/dynamic` with `ssr: false`)
                                                              - - Images must use `next/image` with proper sizing
                                                                - - No layout shift — all animated elements must have defined dimensions before animation runs
                                                                  - - Target Lighthouse score: 90+ performance on desktop
                                                                    - - Fonts must be subset and self-hosted via `/styles/fonts`
