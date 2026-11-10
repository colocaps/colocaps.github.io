# shared/locale

Locale list, default and storage key, plus the pure rule that picks the locale for `/`.

## Exposed interface

- `locales.ts`: `LOCALES`, `Locale`, `DEFAULT_LOCALE`, `LOCALE_STORAGE_KEY`, `isLocale`, `localePath`.
- `resolve-locale.ts`: `resolveLocale({ stored, languages })` — stored choice wins, then the first
  browser language we ship, then `es`.

## Data flow

`src/pages/index.astro` reads `localStorage.locale` and `navigator.languages`, calls `resolveLocale`
and `location.replace`s to `/es/` or `/en/`, keeping the hash. The locale toggle writes `locale`.
