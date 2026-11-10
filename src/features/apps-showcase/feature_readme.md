# apps-showcase

The apps section (`#apps`): one interactive 3D iPhone plus a list of five apps — ueno bank,
ueno empresas, Merkao, Vizago Pay, Siglo 21 — each backed by a real store-screenshot strip.

## Exposed interface

- `apps-section.astro` — `<AppsSection locale>`.
- `components/phone-3d.tsx` — React island (`client:visible`). Drag to orbit (`PresentationControls`),
  pick an app from the list, auto-cycle screenshot frames on the phone screen. Auto-rotate pauses
  while dragging; frame cycling respects `prefers-reduced-motion`.

## Data flow

Copy from `i18n` (`apps`); screenshots and frame windows from `shared/media/app-shots.ts`; store URLs
from `lib/apps.ts`. Vizago Pay has no public listing, so it has no store link. The phone screen UVs
a window onto the strip (`frames` / `frameWidth`).
