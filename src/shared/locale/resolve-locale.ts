import { DEFAULT_LOCALE, isLocale, type Locale } from './locales';

interface ResolveLocaleInput {
  stored: string | null;
  languages: readonly string[];
}

function primarySubtag(language: string): string {
  return language.toLowerCase().split('-')[0] ?? '';
}

export function resolveLocale({ stored, languages }: ResolveLocaleInput): Locale {
  if (isLocale(stored)) return stored;
  const match = languages.map(primarySubtag).find(isLocale);
  return match ?? DEFAULT_LOCALE;
}
