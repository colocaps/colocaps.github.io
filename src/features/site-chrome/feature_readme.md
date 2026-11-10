# site-chrome

Page shell shared by every locale route: `<head>` (title, canonical, hreflang, Open Graph), skip link,
sticky header (brand, section anchors, locale toggle) and footer (LinkedIn, GitHub, location).

## Exposed interface

- `site-layout.astro` — `<SiteLayout locale>`; wraps the page content in `<main id="main">`.
- `locale-toggle.tsx` — React island, `client:load`. Anchors to `/es/` and `/en/`, so it works
  without JS; with JS it stores `localStorage.locale` and keeps the current `#hash`.

## Data flow

Copy comes from `i18n` (`chrome`, `meta`); section ids and links from `shared/site/site-config.ts`.
The header nav is hidden below `lg` — the page is a single scroll and the timeline is the mobile hub.
