# colocaps.github.io — Esteban Farias, portfolio

Static portfolio (Astro 5, TypeScript, Tailwind v4) published at <https://colocaps.github.io>.
One landing per locale, `/es/` and `/en/`; `/` redirects by `localStorage.locale`, then the browser
language, falling back to `es`. Deep links: `#timeline`, `#career`, `#architecture`, `#apps`, `#bio`,
`#contact`.

## Run

```bash
npm ci
npm run dev        # http://localhost:4321
npm run build      # static site in dist/
npm run preview    # serve dist/
```

## Checks

```bash
npm run lint
npm run typecheck
npm test                  # vitest: locale resolution, pointer maths, copy guards
npx playwright install chromium   # once
npm run build && npm run test:e2e:smoke   # fast tier, desktop 1280 + mobile 390
npm run test:e2e                          # full suite
```

## Deploy (GitHub Pages)

`.github/workflows/deploy.yml` builds and publishes `dist/` on every push to `main`.
One-time setup: repository **Settings → Pages → Source: GitHub Actions**. The repo must be named
`colocaps.github.io` (user site, served from `/`, so `base: '/'`).

## Where things live

```
src/pages/           routes only (index redirect, es/, en/)
src/features/        one folder per section, each with a feature_readme.md
src/shared/ui/       primitives (button, chip, section, phone-screen, avatar-frame)
src/shared/locale/   locales and the `/` redirect rule
src/i18n/            Dictionary interface + es.ts / en.ts — all copy
src/styles/global.css  design tokens (@theme) and atmosphere utilities
public/cv/           CV PDFs, one per locale
docs/adr/            architecture decisions
```

Copy changes go in `src/i18n/{es,en}.ts` (both, the `Dictionary` type enforces it). The Flux, Multitenant
and FPA claims are pinned by `tests/unit/copy-guard.test.ts`.
