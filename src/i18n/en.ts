import type { Dictionary } from './dictionary';

export const en: Dictionary = {
  meta: {
    title: 'Esteban Farias — Mobile Engineer',
    description:
      'Portfolio of Esteban Farias, Mobile Engineer in Córdoba, Argentina: mobile apps at scale, architecture and fintech.',
    ogLocale: 'en_US',
  },
  chrome: {
    homeLabel: 'Esteban Farias, home',
    skipToContent: 'Skip to content',
    navLabel: 'Sections',
    nav: {
      timeline: 'Path',
      career: 'Career',
      architecture: 'Architecture',
      apps: 'Apps',
      bio: 'About',
      contact: 'Contact',
    },
    localeGroupLabel: 'Language',
    locales: {
      es: { short: 'ES', long: 'Español' },
      en: { short: 'EN', long: 'English' },
    },
    footer: { linkedin: 'LinkedIn', github: 'GitHub', location: 'Córdoba, Argentina' },
  },
  hero: {
    kicker: 'Mobile Engineer',
    role: 'Apps people open every day.',
    sub: 'I design and ship mobile products at scale — architecture, fintech, and experiences that feel close.',
    ctaEmail: 'Email me',
    ctaCv: 'Download CV',
    avatarAlt: 'Portrait of Esteban Farias',
  },
  timeline: {
    title: 'The path, at a glance.',
    aside: 'Tap a node to jump to its chapter. The itti one is the lead.',
    heroTag: 'Current',
  },
  career: {
    eyebrow: 'Career',
    title: 'How I got here.',
    glance: {
      je: { year: '2021', name: 'J&E', role: 'Desktop & business processes' },
      clarika: { year: '2022', name: 'Clarika', role: 'Flutter · retail' },
      bitlogic: { year: '2022', name: 'Bitlogic', role: 'Flutter · BFF' },
      'houlak-pinapp': { year: '2023', name: 'Houlak / Pinapp', role: 'Flutter · app stores' },
      itti: { year: '2024–now', name: 'itti', role: 'Core Mobile · ueno' },
    },
    early: {
      je: {
        period: '2021 – 2022',
        company: 'J&E Software Solutions',
        role: 'Desktop Developer',
        points: [
          'Business process analysis and desktop development with WinForms and ASP.NET, working directly with clients.',
          'Took part in an Uber-like app that never reached production.',
        ],
        tags: ['WinForms', 'ASP.NET', 'Process analysis'],
      },
      clarika: {
        period: 'Jan – Jul 2022',
        company: 'Clarika Software + Innovation',
        role: 'Mobile Developer',
        points: ['An internal retail app, built in Flutter.'],
        tags: ['Flutter', 'Bloc', 'Riverpod', 'Azure CI/CD'],
      },
      bitlogic: {
        period: 'Jul – Nov 2022',
        company: 'Bitlogic SA',
        role: 'Mobile Developer',
        points: ['Flutter mobile development with a BFF and API integrations, with CI/CD on GitLab.'],
        tags: ['Flutter', 'Bloc', 'BFF', 'GitLab CI/CD'],
      },
      'houlak-pinapp': {
        period: 'Dec 2022 – Jun 2024',
        company: 'Houlak / Pinapp',
        role: 'Mobile Developer',
        points: [
          'At Houlak: a pharmacy app that never reached production, and Vizago Pay, biometric payments for physical stores.',
          'At Pinapp: Flutter apps published on the App Store and Google Play, with Firebase, push notifications, Analytics and Adjust.',
        ],
        tags: ['Flutter', 'Bloc', 'Clean Architecture', 'Firebase'],
      },
    },
    itti: {
      eyebrow: 'Lead chapter · itti',
      period: 'Jun 2024 – now',
      title: 'Mobile banking in production.',
      lede: 'At itti I work on ueno bank and ueno empresas from the Core Mobile team: I coordinate release trains, set how microapps plug into the main app, and automate CI/CD and observability.',
      tags: ['Flutter', 'Fintech', 'Microapps', 'Codemagic', 'New Relic'],
      proof: [
        { label: 'Role', value: 'Mobile Developer · technical lead of Core Mobile' },
        { label: 'Focus', value: 'Release trains, microapps, CI/CD, observability' },
        { label: 'Stack', value: 'Flutter, Bloc, Riverpod, Clean Architecture' },
      ],
      phones: {
        uenoBank: 'Screens of the ueno bank app',
        uenoEmpresas: 'Screens of the ueno empresas app',
      },
    },
  },
  architecture: {
    eyebrow: 'Architecture',
    title: 'Architecture that reaches production.',
    aside: 'Three decisions you can see in the product, not on a theory slide.',
    flux: {
      index: '01',
      name: 'Flux',
      kicker: 'Real-time maintenance mode',
      body: 'With over 1M users, Firebase took up to 24 h to push the maintenance screen to everyone. Flux (WebSockets) cut that to ~3 minutes for 100% of users.',
      diagram: {
        label: 'Time to show the maintenance screen to every user: Firebase up to 24 hours, Flux about 3 minutes.',
        firebase: 'Firebase',
        firebaseTime: 'up to 24 h',
        flux: 'Flux · WebSockets',
        fluxTime: '~3 min',
        reach: 'to 100% of users',
      },
    },
    multitenant: {
      index: '02',
      name: 'Multitenant',
      kicker: 'ueno empresas inside ueno bank',
      body: 'An architecture to bring ueno empresas into ueno bank and turn it into a superapp. Each app had its own microapps and a different architecture.',
      diagram: {
        label: 'Before, ueno bank and ueno empresas were separate apps with their own microapps. After, one superapp that brings both in.',
        before: 'Before',
        after: 'After',
        microapps: 'microapps',
        superapp: 'superapp',
        apps: ['ueno bank', 'ueno empresas'],
      },
    },
    fpa: {
      index: '03',
      name: 'Flutter Performance Agent (FPA)',
      kicker: 'Performance measured in production',
      body: 'A tool I designed and built to measure widgets and screens: paint time and rebuilds. It plugs into observability: when thresholds are crossed it sends a data pool to New Relic, filterable by brand, phone and model, so performance can be improved in production.',
      diagram: {
        label: 'The FPA measures widgets and screens, checks them against thresholds and sends the data to New Relic, filterable by brand, phone and model.',
        steps: ['Widgets & screens', 'Paint + rebuilds', 'Thresholds', 'New Relic'],
        filters: ['Brand', 'Phone', 'Model'],
      },
    },
  },
  apps: {
    eyebrow: 'Apps',
    title: 'Apps you can open today.',
    aside: 'Products I worked on, with store links when they are still published.',
    interactionHint: 'Scroll: the phone stays centered and each app appears one at a time.',
    dragHint: 'The phone keeps spinning as you scroll',
    storeLabel: 'View on the App Store',
    items: {
      'ueno-bank': {
        name: 'ueno bank',
        blurb: 'Mobile banking: an account ready to use, QR and NFC payments, and credit and debit cards.',
        screensAlt: 'ueno bank store promo screens',
      },
      'ueno-empresas': {
        name: 'ueno empresas',
        blurb: 'Digital banking for businesses: transfer, authorize operations and check accounts and movements.',
        screensAlt: 'ueno empresas store promo screens',
      },
      merkao: {
        name: 'Merkao',
        blurb: 'An app for shops to place their orders at any hour. It came out of the Jokr context (shut down).',
        screensAlt: 'Merkao store promo screens',
      },
      'vizago-pay': {
        name: 'Vizago Pay',
        blurb: 'Biometric payments for physical stores: customers pay with a selfie on a tablet. Built at Houlak.',
        screensAlt: 'Vizago Pay screen',
      },
      'siglo-21': {
        name: 'Siglo 21',
        blurb: 'The Universidad Siglo 21 app: courses, schedules, exams and grades.',
        screensAlt: 'Universidad Siglo 21 app store promo screens',
      },
    },
  },
  bio: {
    eyebrow: 'About',
    title: 'Software that actually helps.',
    paragraphs: [
      "I'm a Systems Analyst and mobile developer based in Córdoba, Argentina. I work mostly with Flutter and Clean Architecture, and I like designing functional software that helps a company and the people who use it.",
      "I'm passionate about building apps, and I always give it 100%.",
    ],
    facts: [
      { label: 'Location', value: 'Córdoba, Argentina' },
      { label: 'Education', value: 'Systems Analyst, Instituto Superior Santo Domingo (2017 – 2020)' },
      { label: 'Languages', value: 'Spanish (native) · English B1' },
      { label: 'Focus', value: 'Flutter, Clean Architecture, Bloc, Riverpod' },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    title: "Let's talk?",
    closer:
      "If you're building a mobile team or want to talk product, write me. No hard pitch — just a good conversation.",
    ctaEmail: 'Email me',
    ctaCv: 'Download CV',
    avatarAlt: 'Esteban Farias smiling',
  },
};
