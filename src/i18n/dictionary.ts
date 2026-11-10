import type { AppId } from '../shared/media/app-shots';
import type { Locale } from '../shared/locale/locales';
import type { SectionId } from '../shared/site/site-config';
import { en } from './en';
import { es } from './es';

export type CareerId = 'je' | 'clarika' | 'bitlogic' | 'houlak-pinapp' | 'itti';
export type EarlyCareerId = Exclude<CareerId, 'itti'>;

interface Labelled {
  label: string;
  value: string;
}

interface CareerGlance {
  year: string;
  name: string;
  role: string;
}

interface EarlyChapter {
  period: string;
  company: string;
  role: string;
  points: string[];
  tags: string[];
}

interface FactRow {
  label: string;
  value: string;
}

export interface Dictionary {
  meta: { title: string; description: string; ogLocale: string };
  chrome: {
    homeLabel: string;
    skipToContent: string;
    navLabel: string;
    nav: Record<SectionId, string>;
    localeGroupLabel: string;
    locales: Record<Locale, { short: string; long: string }>;
    footer: { linkedin: string; github: string; location: string };
  };
  hero: {
    kicker: string;
    role: string;
    sub: string;
    ctaEmail: string;
    ctaCv: string;
    avatarAlt: string;
  };
  timeline: { title: string; aside: string; heroTag: string };
  career: {
    eyebrow: string;
    title: string;
    glance: Record<CareerId, CareerGlance>;
    early: Record<EarlyCareerId, EarlyChapter>;
    itti: {
      eyebrow: string;
      period: string;
      title: string;
      lede: string;
      tags: string[];
      proof: Labelled[];
      phones: { uenoBank: string; uenoEmpresas: string };
    };
  };
  architecture: {
    eyebrow: string;
    title: string;
    aside: string;
    flux: {
      index: string;
      name: string;
      kicker: string;
      body: string;
      diagram: { label: string; firebase: string; firebaseTime: string; flux: string; fluxTime: string; reach: string };
    };
    multitenant: {
      index: string;
      name: string;
      kicker: string;
      body: string;
      diagram: { label: string; before: string; after: string; microapps: string; superapp: string; apps: [string, string] };
    };
    fpa: {
      index: string;
      name: string;
      kicker: string;
      body: string;
      diagram: { label: string; steps: [string, string, string, string]; filters: [string, string, string] };
    };
  };
  apps: {
    eyebrow: string;
    title: string;
    aside: string;
    interactionHint: string;
    dragHint: string;
    storeLabel: string;
    items: Record<AppId, { name: string; blurb: string; screensAlt: string }>;
  };
  bio: { eyebrow: string; title: string; paragraphs: string[]; facts: FactRow[] };
  contact: { eyebrow: string; title: string; closer: string; ctaEmail: string; ctaCv: string; avatarAlt: string };
}

const dictionaries: Record<Locale, Dictionary> = { es, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
