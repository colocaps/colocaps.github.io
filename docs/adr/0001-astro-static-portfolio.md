# ADR 0001 — Astro static site for the portfolio

Status: accepted

## Context

The repository served an old Flutter web build. The portfolio is a content-driven, crawlable
storytelling page in two languages, hosted on GitHub Pages (user site `colocaps.github.io`). It has no
auth, no server state and no per-request logic. Three pieces need client JS: the language toggle, an
avatar that follows the pointer on desktop, and a phone showcase that pans through app screenshots.

## Decision

- **Astro 5, `output: 'static'`, `base: '/'`**, TypeScript strict, Tailwind v4 with tokens in `@theme`.
  Static/content-driven site, so Astro over Next.js (`nextjs-architecture`, section 5).
- **React islands only** for the locale toggle, the avatar follow and the phone showcase; everything
  else is server-rendered `.astro`. Motion respects `prefers-reduced-motion`.
- **Path-based i18n** (`/es/`, `/en/`) from one typed `Dictionary` per locale, so each language is
  crawlable. `/` redirects client-side (GitHub Pages has no server): `localStorage.locale`, then
  `navigator.languages`, then `es`.
- **Feature folders** (`site-chrome`, `hero`, `career-chapters`, `hero-architecture`, `apps-showcase`,
  `bio`, `contact`, plus `landing` as the composition root), each with a `feature_readme.md`;
  primitives in `shared/ui`.
- **Images through `astro:assets`**; CV PDFs in `public/cv/`.
- **Deploy** with GitHub Actions (`actions/deploy-pages`).

## Alternatives considered

- Next.js static export: pays for a React runtime on every page for no client state.
- Single page with a client-side language switch: not crawlable per language.
- Server-side `Accept-Language` redirect at `/`: impossible on GitHub Pages.

## Consequences

- The `/` redirect needs JS; without it the page shows links to `/es/` and `/en/` and a `noscript`
  refresh to `/es/`.
- Adding a locale means a new dictionary, a new `src/pages/<locale>/index.astro` and an entry in
  `LOCALES`.
- Store screenshots are the only phone imagery, so showcase "phones" are windows onto the store
  screenshot strips (`shared/media/app-shots.ts`).
