# career-chapters

Two sections of the landing: the **timeline glance** (`#timeline`) and the **career chapters**
(`#career`). Four short, honest chapters (J&E, Clarika, Bitlogic, Houlak / Pinapp) and one long HERO
chapter for itti / ueno, with real ueno bank and ueno empresas store screenshots.

## Exposed interface

- `timeline-section.astro` — `<TimelineSection locale>`: five nodes that link to `#chapter-<id>`.
  Horizontal snap scroll below `md`, a five-column rail from `md`.
- `career-section.astro` — `<CareerSection locale>`: the short chapters plus the itti chapter
  (`#chapter-itti`).

## Data flow

All copy comes from `i18n` (`timeline`, `career`). Chapter order and anchor ids live in
`lib/career-ids.ts`, shared by the timeline and the chapters so a node can never point nowhere.
Chapter facts (dates, roles, stack) come from the public CV; a chapter that never reached production
says so.
