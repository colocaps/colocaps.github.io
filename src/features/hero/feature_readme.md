# hero

First screen of each locale landing: kicker, brand (`h1`), one-line role, sub, two CTAs
(mailto and CV download) and the interactive 3D portrait.

## Exposed interface

- `hero-section.astro` — `<HeroSection locale>`.
- `components/avatar-3d.tsx` — React island (`client:load`). Mounts a R3F canvas on any
  viewport with WebGL: the portrait follows pointer/touch while interacting and does a gentle
  idle sway otherwise so the 3D read is obvious on phones. Falls back to a static circular photo
  only when WebGL is unavailable.

## Data flow

Copy from `i18n` (`hero`); email and CV hrefs from `shared/site/site-config.ts`. The portrait URL
comes from `astro:assets` `getImage` and is passed into the island as `textureUrl`. Gaze maths live
in `lib/gaze.ts`.
