# apps-showcase

The apps section (`#apps`): a sticky centered 3D iPhone. Scrolling the tall track advances one
app at a time onto the phone screen (ueno bank → ueno empresas → Merkao → Vizago Pay → Siglo 21).

## Exposed interface

- `apps-section.astro` — `<AppsSection locale>`.
- `components/scroll-phone-showcase.tsx` — React island (`client:visible`). Sticky phone,
  scroll-driven app index, auto-rotate, caption + store link for the active app, pill nav to jump.

## Data flow

Copy from `i18n` (`apps`); screenshots and frame windows from `shared/media/app-shots.ts`; store URLs
from `lib/apps.ts`. Index maths in `lib/scroll-app-index.ts`. Vizago Pay has no public listing.
