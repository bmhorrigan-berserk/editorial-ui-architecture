# CLAUDE_INSTRUCTIONS.md
# Editorial UI Architecture — Rulebook for Claude

This file is the absolute rulebook for how Claude must interact with this repository.
Read this file first before taking any action on a connected project.

---

## PRIME DIRECTIVE

This repository is a **mechanical design library**, not a project to be modified freely.
It is the single source of truth for all UI components, animations, and design tokens.
Claude must treat every file here as immutable law unless explicitly told otherwise by the user.

---

## RULE 1 — THE COMPONENT RULE

Claude must **never generate a new layout component from scratch** if an equivalent already
exists in the `/components/layout` folder.

- Before writing any new structural element (navigation, hero, footer, grid, section wrapper),
  Claude must first scan `/components/layout` for an existing match.
- If a match exists, Claude must **import and modify** the existing component to fit the
  client's needs. It must not duplicate or reinvent it.
- New layout components may only be created if no equivalent exists in the library AND
  the user has explicitly authorized the addition.

---

## RULE 2 — THE ANIMATION RULE

All vector and layout movement must be routed through the **GSAP hooks** located in
`/components/animations`.

- Standard CSS `@keyframes`, `transition`, and `animation` properties are **strictly forbidden**
  for any layout or interactive element animation.
- Lenis smooth scrolling logic lives in `/components/animations`. Claude must use the
  existing Lenis wrapper and must not instantiate a new scroll library.
- 3D scene logic and React Three Fiber / Spline wrappers live in `/components/3d`.
  Claude must import from this folder rather than creating new Three.js scene setups.
- The only exception is purely decorative, non-interactive micro-transitions on text
  elements where a CSS `opacity` or `transform` is used for a single frame reveal.

---

## RULE 3 — THE BLOAT RULE

No third-party widget scripts, external tracking pixels, or SaaS automation code blocks
may be injected into any component.

Specifically prohibited without explicit user authorization:
- Analytics snippets (Google Analytics, Mixpanel, Segment, Hotjar, etc.)
- Chat widget scripts (Intercom, Drift, Crisp, etc.)
- Ad pixels (Meta Pixel, Google Ads, TikTok Pixel, etc.)
- SaaS embed scripts (HubSpot, Klaviyo, ConvertKit, etc.)
- Any `<script>` tag loading from an external CDN not already present in the repo

If a client project requires one of these integrations, Claude must flag it to the user
and wait for explicit instruction before adding it.

---

## FOLDER MAP

| Folder | Contents |
|---|---|
| `/components/3d` | React Three Fiber wrappers, Spline scene embeds |
| `/components/layout` | Navigation, hero sections, footer grids, page wrappers |
| `/components/animations` | GSAP hooks, Lenis smooth scroll logic, scroll-triggered utilities |
| `/styles` | Global CSS, Tailwind base directives, font-face declarations |
| `tailwind.config.ts` | Design tokens — the canonical source for all colors, spacing, and typography |

---

## DESIGN PHILOSOPHY

This system enforces a **Quiet Luxury** aesthetic. Key principles:

- **Monochromatic palettes only.** No accent colors outside the approved token set.
- **Exaggerated whitespace.** Spacing is always generous. When in doubt, add more space.
- **Typography hierarchy.** Use only the typefaces defined in `tailwind.config.ts`.
- **No visual noise.** Avoid borders, drop shadows, gradients, and decorative icons
  unless they are explicitly defined in the component library.
- **Performance first.** No component should import a library not already in `package.json`.
