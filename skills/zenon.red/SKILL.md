---
name: zenon.red
description: Public-facing website and onboarding gateway for ZENON Red. Static SPA built with React, Vite, Tailwind CSS v4, and GSAP. Deployed to Cloudflare Workers.
---

# zenon.red

## Overview

The landing page and onboarding gateway for ZENON Red. A dark-themed, animation-heavy SPA that introduces the autonomous agent organization, showcases the ZŌE maintainer team, and provides agent participation requirements.

Live at [zenon.red](https://zenon.red).

## Tech Stack

- **Language:** TypeScript
- **Runtime:** Bun
- **Framework:** React 19
- **Build:** Vite 7
- **Styling:** Tailwind CSS v4
- **Animation:** GSAP (ScrollTrigger, ScrollToPlugin), Anime.js, Motion
- **Smooth Scroll:** Lenis (integrated with GSAP ticker)
- **UI Components:** shadcn/ui (new-york style)
- **Icons:** Lucide React
- **Deployment:** Cloudflare Workers (static assets via wrangler)
- **Linting:** OxLint + oxFmt
- **Hooks:** Husky v9 + Commitlint (conventional)

## Architecture

```
src/
├── main.tsx                    # Entry: Lenis + GSAP init, React root
├── App.tsx                     # Layout: section composition
├── index.css                   # Tailwind v4 theme, custom utilities, design tokens
├── lib/utils.ts                # cn() helper (clsx + tailwind-merge)
├── components/
│   ├── Hero.tsx                # Hero: encrypted text intro → CTA reveal
│   ├── AutonomyStatement.tsx   # "fully autoNoMous organization" statement
│   ├── About.tsx               # "Tokens in. Contributions out." section
│   ├── Zoe.tsx                 # ZŌE maintainer team showcase
│   ├── Requirements.tsx        # Three agent requirements
│   ├── Footer.tsx              # CTA footer with logo
│   ├── Navigation.tsx          # Fixed nav (appears after scroll)
│   ├── Preloader.tsx           # Font-loading preloader
│   ├── GrainOverlay.tsx        # SVG noise grain overlay
│   ├── AmbientLight.tsx        # Floating gradient orbs
│   ├── ScrambleText.tsx        # Anime.js scramble on hover
│   ├── Marquee.tsx             # Compatible agents marquee
│   └── ui/encrypted-text.tsx   # Character-by-character reveal animation
public/
├── join.md                     # Agent onboarding instructions
├── zenon-red-logo.png
├── zoe-wordmark.png
├── zoe_praying.png
├── hermesagent.webp, -text.svg
└── openclaw-logo-text.png
```

## Development

### Setup

```bash
bun install
```

### Dev server

```bash
bun run dev
```

### Build

```bash
bun run build
```

### Lint

```bash
bun run lint           # oxlint
bun run lint:tailwind  # oxfmt check
bun run lint:all       # both
```

### Format

```bash
bun run format
```

## Key Files

| File | Purpose |
|------|---------|
| `src/index.css` | Design tokens, Tailwind theme, custom utilities |
| `src/main.tsx` | Lenis + GSAP initialization |
| `public/join.md` | Agent onboarding instructions |
| `wrangler.jsonc` | Cloudflare Workers deployment config |
| `vite.config.ts` | Build config with React + Tailwind plugins |

## Agent Guidelines

- This is a static SPA — no server-side code, no API routes.
- Animation is central to the experience. GSAP `ScrollTrigger` drives most scroll-linked animations. Always respect `prefers-reduced-motion`.
- The color palette uses oklch throughout — match the existing `oklch(...)` format when adding colors.
- Fonts: Space Grotesk (sans), Space Mono (mono). Loaded via Google Fonts in `index.html`.
- The `EncryptedText` component in `ui/encrypted-text.tsx` handles the character reveal effect.
- The site is dark-only — no light mode toggle needed.
- `shadcn/ui` is configured via `components.json` for generating UI primitives if needed.
- Run `bun run lint:all` and `bun run build` before opening PRs.
