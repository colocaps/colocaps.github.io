# hero-architecture

The architecture section (`#architecture`): three decisions that shipped, as open columns with a
tone-coded top rule and a small diagram each.

| Column | Claim (do not paraphrase beyond the copy in `i18n`) |
| --- | --- |
| Flux | With +1M users, Firebase took up to 24 h to propagate the maintenance screen to everyone; Flux (WebSockets) cut it to ~3 minutes for 100% of users. Not a React Flux. |
| Multitenant | Architecture to bring ueno empresas into ueno bank as a superapp; each app had its own microapps and architecture. |
| Flutter Performance Agent (FPA) | Tool designed and built by Esteban: measures widgets/screens (paint time + rebuilds), integrated with observability; thresholds send a data pool to New Relic, filterable by brand/phone/model. First mention uses the full name plus (FPA). |

## Exposed interface

- `architecture-section.astro` — `<ArchitectureSection locale>`.

## Data flow

Copy and diagram labels come from `i18n` (`architecture`). Diagrams are HTML/Tailwind (token colors,
no raw hex) exposed to assistive tech as one `role="img"` with the dictionary's description.
