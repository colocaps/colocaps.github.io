# apps-showcase

The apps section (`#apps`): a sticky centered 3D iPhone. Scrolling the tall track advances one
app at a time onto the phone screen. The phone tilts toward the pointer (no auto-spin).

## Exposed interface

- `apps-section.astro` — `<AppsSection locale>`.
- `components/scroll-phone-showcase.tsx` — React island (`client:visible`). Sticky phone,
  scroll-driven app index, mouse/touch tilt, caption + store link, pill nav.

## Data flow

Copy from `i18n` (`apps`); screenshots from `shared/media/app-shots.ts`; store URLs from
`lib/apps.ts`. Index maths in `lib/scroll-app-index.ts`; tilt maths in `lib/phone-tilt.ts`.
