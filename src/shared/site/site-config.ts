import type { Locale } from '../locale/locales';

export const siteConfig = {
  name: 'Esteban Farias',
  handle: 'esteban',
  url: 'https://colocaps.github.io',
  email: 'colocaps@gmail.com',
  linkedin: 'https://www.linkedin.com/in/esteban-farias-2104a31a2/',
  github: 'https://github.com/colocaps',
} as const;

export const mailtoHref = `mailto:${siteConfig.email}`;

export const cvHref: Record<Locale, string> = {
  es: '/cv/esteban-farias-cv-es.pdf',
  en: '/cv/esteban-farias-cv-en.pdf',
};

export const SECTION_IDS = {
  timeline: 'timeline',
  career: 'career',
  architecture: 'architecture',
  apps: 'apps',
  bio: 'bio',
  contact: 'contact',
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

export function sectionHref(id: SectionId): string {
  return `#${id}`;
}
