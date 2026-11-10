# hero

First screen of each locale landing: kicker, brand (`h1`), one-line role, sub, two CTAs
(mailto and CV download) and the interactive 3D portrait.

## Exposed interface

- `hero-section.astro` — `<HeroSection locale>`.
- `components/avatar-3d.tsx` — React island (`client:load`). On desktop with a fine pointer and
  without `prefers-reduced-motion`, mounts a R3F canvas: the portrait turns toward the pointer
  (yaw/pitch) with a tracking key light. Elsewhere it falls back to a static circular photo.

## Data flow

Copy from `i18n` (`hero`); email and CV hrefs from `shared/site/site-config.ts`. The portrait URL
comes from `astro:assets` `getImage` and is passed into the island as `textureUrl`. Gaze maths live
in `lib/gaze.ts`.
