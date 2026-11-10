# shared/ui

Design-system primitives. Feature code composes these and never writes a variant's class string
inline; tokens come from `@theme` in `src/styles/global.css`.

## Exposed interface

- `button.astro` / `button-styles.ts` — pill link button, variants `primary` and `ghost`. The
  class helper exists so React islands render the same variant as Astro pages.
- `eyebrow.astro` — uppercase kicker with leading rule (`accent` | `muted`).
- `chip.astro` — small pill tag (`accent` | `ueno`).
- `section.astro` — landmark section: id, `aria-labelledby`, atmosphere (ink + radial meshes + grain)
  and the page container.
- `avatar-frame.tsx` — circular portrait frame (`md` | `lg`); takes a ref so an island can move it.
- `phone-screen.tsx` — device window onto a store-screenshot strip (`frames` are left edges in percent
  of the image). Renders as static HTML in Astro, and pans between frames when an island changes
  `frameIndex`.

## Notes

New primitives or variants are a `designer` decision.
