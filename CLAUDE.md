# Sheelendra — Portfolio

A single-page, scroll-driven portfolio for **Sheelendra** — full-stack engineer for physical systems. Built in the **Industrial Cinema** aesthetic: pitch-black background, brushed-steel surfaces, oversized cinematic typography, and one signature 3D robotic arm.

## Stack

- **Next.js 16.2.9** (App Router, Turbopack) — see the `<!-- BEGIN:nextjs-agent-rules -->` block in `AGENTS.md` and `node_modules/next/dist/docs/` for current APIs (this is *not* the Next.js you may remember).
- **React 19.2.4** + **TypeScript 5**
- **Tailwind CSS v4** via `@tailwindcss/postcss` (no `tailwind.config.js`; theme tokens live in `app/globals.css` under `@theme inline`)
- **`motion` 12** (`motion/react`) — scroll-triggered reveals
- **Lenis** — smooth scroll
- **Three.js** + **`@react-three/fiber`** + **`@react-three/drei`** — the hero 3D robotic arm (lazy-loaded)
- **lucide-react** — icons (note: brand icons removed; we ship our own in `components/ui/BrandIcons.tsx`)
- **next-devtools MCP** — runtime diagnostics

## Scripts

```bash
npm run dev      # localhost:3000 (Turbopack)
npm run build    # production
npm run start    # serve production
npm run lint     # eslint
```

## Design system

Tokens live in `app/globals.css` under `:root` / `[data-theme="dark"]` / `[data-theme="light"]`, then are re-exposed as Tailwind utilities via `@theme inline`. Single source of truth — never hardcode hex values in components.

| Token | Dark | Light | Role |
|---|---|---|---|
| `--color-bg` | `#050505` | `#F5F2EC` | Page background |
| `--color-fg` | `#EDEAE3` | `#0B0B0C` | Primary text |
| `--color-surface` | `#0E0E10` | `#FFFFFF` | Elevated cards |
| `--color-surface-2` | `#16161A` | `#EEEAE0` | Secondary surface |
| `--color-border` | `#1F1F23` | `#D6D1C5` | Hairlines |
| `--color-muted` | `#6B6B70` | `#6B6863` | Captions, metadata |
| `--color-steel` | `#C0C0C0` | `#3A3A3D` | Brushed-metal accents |
| `--color-heat` | `#FF4500` | `#D43500` | **Single accent** — hover, focus, key numbers |

Single-accent rule: `--color-heat` is the only chromatic color. Everything else is steel/bone/black.

### Typography (loaded via `next/font/google` in `app/layout.tsx`)

| Role | Family | Usage |
|---|---|---|
| Display | `Bricolage_Grotesque` | Hero lockup, section titles, project names |
| Narrative | `Instrument_Serif` (italic) | Editorial pull-quotes |
| Body | `Geist` | Paragraphs, UI |
| Mono | `JetBrains_Mono` | Coordinates, timestamps, labels, scene numbers |

Use the CSS classes: `font-display`, `font-narrative`, `font-mono` (defined as utilities in `globals.css`).

## Structure

```
app/
  layout.tsx              ← fonts, metadata, no-FOUC theme script
  page.tsx                ← composes all scenes inside <ThemeProvider>
  globals.css             ← @import "tailwindcss" + @theme tokens + base + .scene
lib/
  data.ts                 ← ALL resume-derived copy (timeline, projects, skills, leadership, contact, education, certs)
  theme.ts                ← inline no-FOUC theme bootstrap
components/
  brand/Monogram.tsx              ← inline SVG "S" mark
  providers/
    ThemeProvider.tsx             ← data-theme + localStorage
    SmoothScroll.tsx              ← Lenis (respects reduced-motion)
  scene/
    Boot.tsx                      ← 1.6s first-visit cold-open (sessionStorage gated, auto-skips on reduced-motion)
    Hero.tsx                      ← 01 · massive lockup + 3D arm + meta strip
    Identity.tsx                  ← 02 · editorial pull-quote + bio + operational spec card
    Timeline.tsx                  ← 03 · vertical rail with heat-dotted milestones
    Capabilities.tsx              ← 04 · 4-column spec sheet (Robotics / Embedded / AI / Web)
    Work.tsx + ProjectShowcase.tsx← 05 · inline project showcases, alternating left/right
    Leadership.tsx                ← 06 · role cards
    Credentials.tsx               ← 07 · education + coursework + certs
    Contact.tsx                   ← 08 · transmission panel + 4 socials + availability card
  three/
    RoboticArm.tsx                ← R3F 6-DOF arm, lazy via next/dynamic
    RoboticArmFallback.tsx        ← hand-authored SVG silhouette (SSR + reduced-motion)
  ui/
    Nav.tsx                       ← fixed nav, monogram + section links + theme toggle, mobile drawer
    ThemeToggle.tsx               ← steel D/L switch, persists to localStorage
    CornerReadout.tsx             ← fixed UTC + Delhi coords top-left, mission % bottom-right
    SceneHeader.tsx               ← reusable `02 // IDENTITY ━━━━━ TITLE`
    Reveal.tsx                    ← scroll-triggered motion wrapper (uses useReducedMotion)
    BrandIcons.tsx                ← GithubIcon / LinkedinIcon / XIcon (lucide dropped brand icons)
```

## Page arc (story-mode)

Single page, eight scenes numbered like CAD drawings:

```
00 · BOOT          [first-visit overlay only]
01 · TITLE CARD    hero
02 · IDENTITY      pull-quote + bio
03 · TIMELINE      career chronology
04 · CAPABILITIES  skills spec sheet
05 · WORK          4 inline project showcases
06 · LEADERSHIP    role cards
07 · CREDENTIALS   education + certs
08 · CONTACT       transmission panel
```

## Conventions

### Adding or editing copy

All resume-derived copy lives in `lib/data.ts`. **Never hardcode text in components.** If a project name, role, or date changes, edit the data file.

The two `.tex` resumes in the project root are the source of truth for facts. If they conflict (different metric for the same project, etc.), prefer the more specific number and flag it.

### Adding a new scene

1. Create `components/scene/MyScene.tsx` as a server component by default.
2. Use the `<SceneHeader index="09" eyebrow="..." title="..." id="my-scene" />` for the section header.
3. Wrap interactive content in `<Reveal>` from `components/ui/Reveal.tsx`.
4. Add `"use client"` only if the scene needs state, effects, or event handlers.
5. Mount it in `app/page.tsx` in the right position.
6. Add a section link to `components/ui/Nav.tsx` → `links` array.

### Adding a project

Append to `projects` in `lib/data.ts`. Fill `index`, `name`, `category`, `blurb`, `stack`, `result[]`, `description`, optional `href`/`hrefLabel`. `ProjectShowcase` alternates left/right automatically based on the `flip` prop driven by index parity.

### Motion rules

- Use `<Reveal>` for any scroll-triggered entrance. It already short-circuits under `prefers-reduced-motion: reduce`.
- Hover transitions: 200ms ease via the `.hover-heat` utility class.
- The boot sequence is gated by `sessionStorage["sheeldn-boot-seen"]` and must remain skippable / reduced-motion aware.
- Lenis smooth scroll is **disabled** when `prefers-reduced-motion: reduce` matches.

### Theming

- Use `bg-background`, `text-foreground`, `bg-surface`, `border-border`, `text-muted`, `text-steel`, `bg-heat`, `text-heat`, etc. — never hardcode colors.
- The `data-theme` attribute on `<html>` is set before paint by `lib/theme.ts`'s inline script in `<head>`. Never use a hook to set it on mount.
- For new colors, add a CSS variable under both `[data-theme="dark"]` and `[data-theme="light"]`, then expose it under `@theme inline`.

### The 3D arm

`components/three/RoboticArm.tsx` is the only client-only 3D scene. It's loaded via `next/dynamic({ ssr: false })` in `Hero.tsx` with `RoboticArmFallback` as the loading state. The fallback is also what reduced-motion users and SSR see.

If you change the arm geometry, mirror the change in `RoboticArmFallback.tsx` (the SVG silhouette) — the two should read as the same machine.

### The monogram

`components/brand/Monogram.tsx` is the brand mark — a stylized "S" formed by two articulated linkages with a single heat-orange joint pivot. It's inline SVG, currentColor-driven, and renders at any size.

## Verification

After any meaningful change:

1. `npm run dev` and load `http://localhost:3000`.
2. Use the `next-devtools` MCP (`nextjs_index` → `get_errors`) to confirm zero compile / runtime errors.
3. Screenshot the page in both dark and light themes at desktop (1440px) and mobile (390px) widths.
4. Check that:
   - The boot sequence plays once (sessionStorage-gated) and is auto-skipped under reduced-motion
   - The 3D arm mounts and idles; the SVG fallback shows for reduced-motion users
   - Theme toggle persists across reloads
   - Every interactive element has a visible `--color-heat` focus ring
5. Visual gut-check against the brief: cinematic, premium, story-mode, unmistakably *robotics + AI + full-stack*.

## Project memory

The full design brief, color tokens, story-arc decisions, and verification checklist are in `/Users/sheelendra/.claude/plans/i-have-added-two-fizzy-narwhal.md`. Read it if you're ever uncertain about the visual direction.
