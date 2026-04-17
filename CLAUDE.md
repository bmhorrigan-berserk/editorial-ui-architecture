# Claude Code — Design System Connection

> This file is auto-read by Claude Code at the start of every session.
> It connects Claude to the Editorial UI Architecture design system.

---

## WHAT THIS REPO IS

This is a **premium UI design system and skills library** for Claude Code.
It defines every component, animation tool, 3D capability, and design rule
that Claude must use when building websites in any connected project.

**Treat every file in this repo as law. Do not deviate without explicit user instruction.**

---

## FIRST THING TO DO EVERY SESSION

Before writing a single line of code, Claude must:

1. Read `CLAUDE_INSTRUCTIONS.md` — the master rulebook
2. Read `tools/TECH_STACK.md` — the approved library list
3. Check `/components/layout` before creating any layout component
4. Check `/components/animations` before writing any animation
5. Check `/components/3d` before writing any 3D scene
6. Check `/components/typography` before animating any text
7. Check `/components/cursor` before adding any cursor behavior
8. Check `/components/magnetic` before adding any hover interaction
9. Check `/components/transitions` before adding any page transition
10. Check `/components/marquee` before adding any scrolling ticker

---

## HOW TO USE THIS IN A NEW PROJECT

When starting any new project, Claude Code should:

```bash
# Option 1 — Add as git submodule (recommended)
git submodule add https://github.com/bmhorrigan-berserk/editorial-ui-architecture.git design-system

# Option 2 — Clone alongside the project
git clone https://github.com/bmhorrigan-berserk/editorial-ui-architecture.git
```

Then create a `CLAUDE.md` in the project root using the template at:
`/templates/PROJECT_CLAUDE.md`

---

## IMPORT PATHS

When this repo is installed as a submodule at `/design-system`, use these paths:

```typescript
// Layout
import { NavBar, HeroSection, FooterGrid } from '@/design-system/components/layout';

// Animations
import { useGSAPTimeline, useScrollTrigger, useLenis } from '@/design-system/components/animations';

// 3D
import { SceneWrapper, SplineEmbed } from '@/design-system/components/3d';

// Typography
import { SplitText } from '@/design-system/components/typography';

// Cursor
import { CustomCursor } from '@/design-system/components/cursor';

// Magnetic
import { MagneticButton } from '@/design-system/components/magnetic';

// Transitions
import { PageTransition } from '@/design-system/components/transitions';

// Marquee
import { Marquee } from '@/design-system/components/marquee';

// Tokens
import { EASING, DURATION, STAGGER } from '@/design-system/tokens/easing';
```

---

## QUICK CAPABILITY REFERENCE

| I want... | Use this |
|---|---|
| Text that slides up on scroll | `<SplitText triggerOnScroll animation="slideUp">` |
| Smooth scroll feel | `useLenis()` hook in root layout |
| Element animates when scrolled into view | `useScrollTrigger()` hook |
| GSAP timeline on mount | `useGSAPTimeline()` hook |
| 3D floating geometry scene | `<SceneWrapper>` with R3F Canvas |
| Spline 3D scene embed | `<SplineEmbed url="...">` |
| Custom cursor with ring | `<CustomCursor />` in root layout |
| Button that pulls toward cursor | `<MagneticButton>` wrapper |
| Smooth page-to-page transitions | `<PageTransition mode="curtain">` |
| Infinite scroll text ticker | `<Marquee speed={0.5}>` |
| Scroll-driven navbar shrink | `<NavBar>` from layout library |
| Full hero with GSAP entrance | `<HeroSection>` from layout library |

---

## DESIGN SYSTEM RULES (SUMMARY)

- **Animation:** GSAP only — never CSS keyframes on interactive elements
- **Scroll:** Lenis only — never native scroll or other libraries
- **3D:** React Three Fiber + Drei — never raw Three.js setup
- **Styling:** Tailwind CSS — no inline styles except GSAP will-change
- **Easing:** Import from `/tokens/easing.ts` — never hardcode curves
- **Typography:** Variable fonts, generous spacing, hierarchy matters
- **Motion:** Stagger everything. Physics easing always. Scroll is the timeline.
- **Performance:** Dynamic import all 3D. Target Lighthouse 90+ desktop.

---

## REPO LOCATION

GitHub: `https://github.com/bmhorrigan-berserk/editorial-ui-architecture`
Owner: bmhorrigan-berserk
Branch: main
