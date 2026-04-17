# CLAUDE.md — Project Template
# ─────────────────────────────────────────────────────────────────────────────
# HOW TO USE THIS FILE:
# 1. Copy this file to the ROOT of any new project as "CLAUDE.md"
# 2. Fill in the PROJECT IDENTITY section below
# 3. Run the bootstrap command in SETUP to wire up the design system
# 4. Claude Code will read this automatically on every session
# ─────────────────────────────────────────────────────────────────────────────

---

## PROJECT IDENTITY

```
Project Name:     [FILL IN]
Client:           [FILL IN]
Site Type:        [e.g. Portfolio / Agency / Product / Editorial]
Aesthetic Target: [e.g. Dark luxury / Light editorial / Brutalist / Minimal]
Primary Color:    [e.g. #0a0a0a background, #f5f5f0 text]
Accent Color:     [e.g. none — monochromatic only]
Key Fonts:        [e.g. Display: Cabinet Grotesk Variable / Body: Inter]
Spline Scene URL: [FILL IN or leave blank]
Live URL:         [FILL IN when deployed]
```

---

## DESIGN SYSTEM

This project uses the Editorial UI Architecture design system.
All components, animation rules, and design tokens live at:

**Submodule path:** `./design-system`
**GitHub:** `https://github.com/bmhorrigan-berserk/editorial-ui-architecture`

Claude must read `./design-system/CLAUDE_INSTRUCTIONS.md` before doing anything.
Claude must follow all rules in that file without exception.

---

## SESSION STARTUP CHECKLIST

Every time Claude Code opens this project, do this first:

- [ ] Read `./design-system/CLAUDE_INSTRUCTIONS.md`
- [ ] Read `./design-system/tools/TECH_STACK.md`
- [ ] Review the PROJECT IDENTITY section above
- [ ] Check existing components before creating new ones
- [ ] Confirm the aesthetic target and apply it to all decisions

---

## SETUP — Run Once to Bootstrap a New Project

Paste this entire block into Claude Code when starting a new project:

```
I'm starting a new Next.js project. Please do the following in order:

1. Run: npx create-next-app@latest . --typescript --tailwind --app --src-dir=false --import-alias="@/*"

2. Add the design system as a git submodule:
   git submodule add https://github.com/bmhorrigan-berserk/editorial-ui-architecture.git design-system

   3. Install all required dependencies:
      npm install gsap lenis @react-three/fiber @react-three/drei @react-three/postprocessing three @splinetool/react-spline clsx tailwind-merge lucide-react react-hook-form zod

      4. Add this to tsconfig.json paths:
         "@/design-system/*": ["./design-system/*"]

         5. Create the following folder structure in the project root:
            /app
                 layout.tsx       ← root layout with CustomCursor + PageTransition + Lenis
                      page.tsx         ← home page (blank, ready to build)
                           globals.css      ← import from design-system/styles/globals.css
                              /components
                                   /ui              ← project-specific components (not design system)
                                      /public
                                           /fonts           ← self-hosted font files go here

                                           6. Write app/layout.tsx as the root layout that:
                                              - Imports and mounts <CustomCursor /> from design-system
                                                 - Wraps children in <PageTransition mode="curtain">
                                                    - Initializes useLenis() for smooth scroll
                                                       - Sets html class="cursor-none" to hide default cursor
                                                          - Uses dark background (#0a0a0a) and light text (#f5f5f0) as defaults

                                                          7. Write app/globals.css that:
                                                             - Imports Tailwind directives
                                                                - Hides the default cursor: * { cursor: none !important; }
                                                                   - Adds the easing CSS variables from design-system/tokens/easing.ts
                                                                      - Sets smooth scroll behavior via Lenis (not CSS scroll-behavior)

                                                                      8. Confirm all files are created and the dev server runs without errors.
                                                                         Run: npm run dev

                                                                         When done, tell me what was created and confirm the project is ready to build.
                                                                         ```

                                                                         ---

                                                                         ## ONGOING PROMPTS — Copy & Paste These Anytime

                                                                         ### Build a new page section:
                                                                         ```
                                                                         Using the design system at ./design-system, build a [SECTION TYPE] section for this page.
                                                                         Follow all rules in CLAUDE_INSTRUCTIONS.md.
                                                                         Use GSAP via the animation hooks for all motion.
                                                                         The aesthetic is [AESTHETIC TARGET from above].
                                                                         ```

                                                                         ### Add a 3D scene:
                                                                         ```
                                                                         Add a 3D scene to the hero section using React Three Fiber via ./design-system/components/3d/SceneWrapper.tsx.
                                                                         The scene should show [DESCRIBE: e.g. "a slowly rotating abstract geometric form with bloom glow"].
                                                                         Import dynamically with next/dynamic and ssr:false.
                                                                         Use MeshTransmissionMaterial for a glass/crystal look.
                                                                         Wrap in Suspense with a minimal loading state.
                                                                         ```

                                                                         ### Add scroll animations to a section:
                                                                         ```
                                                                         Animate the [SECTION NAME] section using ./design-system/components/animations/useScrollTrigger.ts.
                                                                         Every element should enter staggered as it scrolls into view.
                                                                         Use slideUp animation on all text via SplitText.
                                                                         Use the STAGGER.generous value from ./design-system/tokens/easing.ts.
                                                                         ```

                                                                         ### Add kinetic type to a headline:
                                                                         ```
                                                                         Apply SplitText from ./design-system/components/typography to the main headline.
                                                                         Split by words, animate slideUp, triggerOnScroll=true.
                                                                         Duration 0.9s, stagger 0.08s, ease power3.out.
                                                                         ```

                                                                         ### Add a marquee ticker:
                                                                         ```
                                                                         Add a Marquee from ./design-system/components/marquee between the hero and next section.
                                                                         Content: [YOUR TEXT HERE] repeated with a · separator.
                                                                         Speed 0.5, direction left, large display typography.
                                                                         ```

                                                                         ---

                                                                         ## PROJECT-SPECIFIC OVERRIDES

                                                                         > Add any project-specific rules here that override or extend the design system defaults.
                                                                         > Examples:
                                                                         > - "This project uses Cormorant Garamond as the display font"
                                                                         > - "Brand color #C8A96E may be used as a single accent"
                                                                         > - "No 3D on this project — client requested flat design"

                                                                         [ADD PROJECT OVERRIDES HERE]

                                                                         ---

                                                                         ## COMPONENT LOG

                                                                         > Keep track of every component built for this project so Claude doesn't duplicate work.
                                                                         > Update this section as the project grows.

                                                                         | Component | Path | Description | Status |
                                                                         |---|---|---|---|
                                                                         | Root Layout | app/layout.tsx | Cursor + Lenis + PageTransition | [ ] |
                                                                         | Home Page | app/page.tsx | Main landing page | [ ] |
                                                                         | | | | |
