# landing

Composition root of one locale landing: `SiteLayout` plus the sections in story order — hero,
timeline glance, career chapters (short, then the itti HERO), architecture, apps, bio, contact.

## Exposed interface

- `landing-page.astro` — `<LandingPage locale>`; the only thing `src/pages/es/` and `src/pages/en/`
  render, so the two locales cannot drift apart.

## Data flow

Holds no copy and no logic. Each section reads its own slice of `i18n` for the given locale.
