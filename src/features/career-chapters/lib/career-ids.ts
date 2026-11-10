import type { CareerId, EarlyCareerId } from '../../../i18n/dictionary';

export const EARLY_CAREER_IDS: readonly EarlyCareerId[] = ['je', 'clarika', 'bitlogic', 'houlak-pinapp'];

export const HERO_CAREER_ID = 'itti' satisfies CareerId;

export const CAREER_ORDER: readonly CareerId[] = [...EARLY_CAREER_IDS, HERO_CAREER_ID];

export function chapterId(id: CareerId): string {
  return `chapter-${id}`;
}

export function chapterHref(id: CareerId): string {
  return `#${chapterId(id)}`;
}
