# Premium Tech Stack Reference

This document defines every tool Claude is authorized to use when building projects from this repository. No library outside this list may be added without explicit user authorization.

---

## FRAMEWORK

**Next.js 14+ (App Router)**
- Use App Router exclusively. No Pages Router.
- `'use client'` directive required on all interactive/animated components
- Dynamic imports (`next/dynamic`) required for all 3D and heavy animation components
- `next/image` required for all images
- `next/font` required for all fonts

---

## ANIMATION — PRIMARY

**GSAP 3.x + Club GreenSock Plugins**

The master animation engine. Everything moves through GSAP.

| Plugin | Use Case |
|---|---|
| `ScrollTrigger` | Scroll-driven animations, pinning, scrubbing |
| `SplitText` | Per-char/word/line text splitting and animation |
| `CustomEase` | Bespoke easing curves for brand-specific feel |
| `Flip` | Layout-to-layout state animations (shared element) |
| `MorphSVG` | SVG path morphing between shapes |
| `DrawSVG` | SVG stroke draw-on animations |

**Easing Hierarchy (best to use):**
1. `CustomEase.create("premium", "0.76, 0, 0.24, 1")` — house curve
2. `expo.inOut` — page transitions, dramatic reveals
3. `power3.out` — standard entrances
4. `elastic.out(1, 0.4)` — magnetic snap-back
5. `power2.inOut` — hover transitions

**Never use:** `linear`, `ease`, `ease-in-out` (CSS defaults)

---

## SMOOTH SCROLL

**Lenis (by Studio Freight)**
- The only scroll library permitted
- Always use via `useLenis.ts` hook — never instantiate directly
- Configure with `lerp: 0.1` for luxury feel, `lerp: 0.05` for ultra-smooth
- Must be registered with GSAP ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)`

---

## 3D — CODE-BASED

**React Three Fiber (R3F) + Drei + @react-three/postprocessing**

| Package | Use Case |
|---|---|
| `@react-three/fiber` | React renderer for Three.js |
| `@react-three/drei` | Helpers: OrbitControls, Environment, Float, etc. |
| `@react-three/postprocessing` | Bloom, chromatic aberration, depth of field, vignette |
| `three` | Core Three.js (imported via R3F, never directly) |

**Preferred Visual Techniques:**
- `Float` component for ambient floating geometry
- `MeshTransmissionMaterial` for glass/crystal effects
- `Environment` with HDRI for realistic lighting
- `EffectComposer` + `Bloom` for glow effects
- `Points` / `PointMaterial` for particle systems
- Instanced meshes for 100+ repeated objects

**Never do:**
- Create a raw `new THREE.Scene()` — use `<Canvas>` from R3F
- Import Three.js directly — let R3F manage the renderer
- Add 3D to mobile without a performance budget check

---

## 3D — NO-CODE / VISUAL

**Spline**
- For visually designed 3D scenes embedded via URL
- Always use via `SplineEmbed.tsx` wrapper
- Scenes must be lazy-loaded and wrapped in `<Suspense>`
- Set `onLoad` callback to trigger entrance animation

---

## STYLING

**Tailwind CSS 3.x**
- All styling via Tailwind utility classes
- No inline styles except for GSAP `will-change` and dynamic values
- Custom design tokens live in `tailwind.config.ts` — never hardcode colors/spacing
- `clsx` + `tailwind-merge` for conditional class composition

---

## TYPOGRAPHY

**Variable Fonts (preferred)**
- Animate `font-variation-settings` via GSAP or CSS transitions
- Self-hosted in `/styles/fonts` — never load from Google Fonts CDN at runtime
- Subset fonts using `glyphhanger` or `pyftsubset` before deploying

**Approved Typeface Roles:**
| Role | Characteristic |
|---|---|
| Display | Large, expressive variable font — the visual anchor |
| Heading | Clean geometric or transitional serif |
| Body | High x-height, comfortable at 16–18px |
| Mono | Technical accent for code, labels, timestamps |

---

## INTERACTIONS

**No external interaction libraries.** All interactions are hand-coded using:
- GSAP for movement and state transitions
- React refs + event listeners for pointer tracking
- `IntersectionObserver` (via `useScrollTrigger`) for viewport detection

---

## ICONS

**Lucide React** (only)
- Consistent, clean icon set
- Never use emoji as icons in production UI
- Always size via Tailwind (`w-4 h-4`, `w-5 h-5`, etc.)

---

## FORMS

**React Hook Form + Zod**
- All forms use React Hook Form for state management
- All validation schemas use Zod
- Never use uncontrolled inputs without React Hook Form

---

## PACKAGE.JSON BASELINE

```json
{
  "dependencies": {
      "next": "^14.0.0",
          "react": "^18.0.0",
              "react-dom": "^18.0.0",
                  "gsap": "^3.12.0",
                      "lenis": "^1.0.0",
                          "@react-three/fiber": "^8.0.0",
                              "@react-three/drei": "^9.0.0",
                                  "@react-three/postprocessing": "^2.0.0",
                                      "three": "^0.160.0",
                                          "@splinetool/react-spline": "^2.0.0",
                                              "tailwindcss": "^3.4.0",
                                                  "clsx": "^2.0.0",
                                                      "tailwind-merge": "^2.0.0",
                                                          "lucide-react": "^0.300.0",
                                                              "react-hook-form": "^7.0.0",
                                                                  "zod": "^3.0.0"
                                                                    }
                                                                    }
                                                                    ```

                                                                    ---

                                                                    ## WHAT CLAUDE MUST NOT ADD

                                                                    Without explicit user authorization, Claude must never add:
                                                                    - `framer-motion` (GSAP handles all animation)
                                                                    - `three.js` direct imports (use R3F)
                                                                    - `anime.js`, `velocity.js`, or any other animation library
                                                                    - `styled-components` or `emotion` (Tailwind only)
                                                                    - Any analytics, tracking, or marketing scripts
                                                                    - Any UI component library (MUI, Chakra, Shadcn) unless explicitly requested
