import { LOCALES, LOCALE_STORAGE_KEY, localePath, type Locale } from '../../shared/locale/locales';

interface LocaleToggleProps {
  current: Locale;
  groupLabel: string;
  labels: Record<Locale, { short: string; long: string }>;
}

function rememberLocale(locale: Locale) {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Storage can be blocked; the path alone still selects the language.
  }
}

export function LocaleToggle({ current, groupLabel, labels }: LocaleToggleProps) {
  return (
    <div
      role="group"
      aria-label={groupLabel}
      className="inline-flex gap-1 rounded-full border border-line bg-ink-2/60 p-1 backdrop-blur-md"
    >
      {LOCALES.map((locale) => (
        <a
          key={locale}
          href={localePath(locale)}
          hrefLang={locale}
          lang={locale}
          aria-label={labels[locale].long}
          aria-current={locale === current ? 'true' : undefined}
          onClick={(event) => {
            event.preventDefault();
            rememberLocale(locale);
            window.location.assign(localePath(locale, window.location.hash));
          }}
          className="inline-flex min-h-8 min-w-11 items-center justify-center rounded-full px-3 text-xs font-semibold text-muted transition-colors hover:text-mist aria-[current=true]:bg-accent/20 aria-[current=true]:text-accent"
        >
          {labels[locale].short}
        </a>
      ))}
    </div>
  );
}
