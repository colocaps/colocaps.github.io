import type { Dictionary } from './dictionary';

export const en: Dictionary = {
  meta: {
    title: 'Esteban Farias — Senior Mobile / Tech Lead',
    description:
      'Portfolio of Esteban Farias, Senior Mobile Developer / Tech Lead in Córdoba, Argentina: mobile apps at scale, architecture and fintech.',
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
    kicker: 'Senior Mobile / Tech Lead',
    philosophyTitle: 'My philosophy as an engineer',
    philosophy: [
      "Don't hire me for being a Flutter expert. Flutter can be learned, like any other technology. So can the ones that don't exist yet, and that we will almost certainly have to take on in the future.",
      'Technologies change, evolve, and disappear. What actually makes the difference is not how well we know a particular tool, but how we think, analyze, and solve problems.',
      'What sets me apart is critical thinking, technical judgment, and the ability to turn complex problems into well-designed solutions. Knowing when to simplify and when to abstract, when a quick solution is genuinely efficient and when it becomes technical debt tomorrow. Applying engineering principles, architecture, and design patterns with a purpose — not to follow trends or impose structure that is not needed.',
      'I like to get involved at the origin of the problem, weigh alternatives, propose solutions, question decisions when it is warranted, and own the outcome. I enjoy building solutions from scratch and taking ownership of the work end to end, rather than only implementing requirements.',
      "It is not only about writing code that works today. It is about decisions that let us build software that can evolve, be maintained, and keep delivering value tomorrow.",
    ],
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
      treviso: { year: '2017', name: 'Treviso', role: 'Android · Flutter' },
      je: { year: '2021', name: 'J&E', role: 'Desktop & business processes' },
      clarika: { year: '2022', name: 'Clarika', role: 'Flutter · retail' },
      bitlogic: { year: '2022', name: 'Bitlogic', role: 'Flutter · BFF' },
      'houlak-pinapp': { year: '2023', name: 'Houlak / Pinapp', role: 'Flutter · app stores' },
      itti: { year: '2024–now', name: 'itti', role: 'Sr / TL · ueno' },
    },
    early: {
      treviso: {
        period: '2017 – 2021',
        company: 'Metales Treviso SRL',
        role: 'Software Developer',
        points: [
          'Native Android apps in Java, a move into Flutter, and process analysis to digitize internal company workflows.',
        ],
        tags: ['Android', 'Java', 'Flutter', 'Process analysis'],
      },
      je: {
        period: '2021 – 2022',
        company: 'J&E Software Solutions',
        role: 'Software Developer',
        points: [
          'Desktop and web development with WinForms and ASP.NET, plus business-process analysis with direct client work.',
        ],
        tags: ['WinForms', 'ASP.NET', 'Process analysis'],
      },
      clarika: {
        period: 'Jan – Jul 2022',
        company: 'Clarika Software + Innovation',
        role: 'Mobile Developer',
        points: [
          'Internal retail app in Flutter with Clean Architecture, BLoC, Riverpod 2.0, L10n/i18n, and Azure Pipelines.',
        ],
        tags: ['Flutter', 'Bloc', 'Riverpod', 'Azure Pipelines'],
      },
      bitlogic: {
        period: 'Jul – Nov 2022',
        company: 'Bitlogic SA',
        role: 'Mobile Developer',
        points: [
          'Flutter apps on Clean Architecture and BLoC, integrated with a BFF: data contracts, HTTP interceptors, auth tokens, and unit tests. GitLab + Jira.',
        ],
        tags: ['Flutter', 'Bloc', 'BFF', 'GitLab'],
      },
      'houlak-pinapp': {
        period: 'Dec 2022 – Jun 2024',
        company: 'Houlak / Pinapp',
        role: 'Mobile Developer',
        points: [
          'At Houlak I was the only mobile developer: pharmacy retail, Vizago Pay (biometric payments with real-time SSE), and native work with Kotlin / Jetpack Compose.',
          'At Pinapp: e-commerce / quick-commerce (Merkao, JOKR), Add-to-App inside native shells, OAuth 2.0, Firebase, Adjust, and App Store / Google Play shipping with Azure DevOps.',
        ],
        tags: ['Flutter', 'Add-to-App', 'SSE', 'Firebase', 'Azure DevOps'],
      },
    },
    itti: {
      eyebrow: 'Lead chapter · itti',
      period: 'Jun 2024 – now',
      title: 'Mobile banking in production.',
      lede:
        'At itti I’m a Senior Mobile / Tech Lead on ueno: I led the Empresas squad (3 developers) and work on Core Mobile. We run release trains and integration standards for microapps in a multitenant superapp (+1.5M users on empresas), with 4 Fastify BFFs, security (Facetec, Incognia), ≥80% test coverage, and tools like Flux, Flutter Performance Agent (FPA), and WhatsNew.',
      tags: ['Flutter', 'Fastify BFF', 'Microapps', 'Codemagic', 'New Relic', 'AI · WhatsNew'],
      proof: [
        { label: 'Role', value: 'Sr Mobile Developer / TL · Empresas + Core' },
        { label: 'Scale', value: '+1.5M users · release trains · microapps' },
        { label: 'Stack', value: 'Flutter, BLoC, Riverpod, Fastify, Codemagic' },
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
    aside: 'Four decisions you can see in the product, not on a theory slide.',
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
    whatsnew: {
      index: '04',
      name: 'WhatsNew',
      kicker: 'AI release notes to Slack',
      body: 'An AI pipeline I built with the Core team: it gathers release input from every squad, diffs each release against the previous one, and turns that into technical changelogs plus user-facing copy — then posts both to Slack so shipping stays visible without manual write-ups.',
      diagram: {
        label: 'WhatsNew collects input from every team, diffs the release against the previous one, writes technical and user-facing notes, and publishes them to Slack.',
        steps: ['Team inputs', 'Release diffs', 'AI write-up', 'Slack publish'],
        outputs: ['Technical notes', 'User-facing copy'],
      },
    },
  },
  apps: {
    eyebrow: 'Apps',
    title: 'Apps you can open today.',
    aside: 'Products I worked on, with store links when they are still published.',
    interactionHint: 'Scroll to change apps. Move the mouse to tilt the phone.',
    dragHint: 'The phone follows the mouse',
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
      "I'm a Systems Analyst and Senior Mobile / Tech Lead based in Córdoba, Argentina. I work mostly with Flutter and Clean Architecture, and I like designing software that helps a company and the people who use it.",
      'I keep learning: React, AI for engineering, AWS fundamentals, and the craft itself — Clean Architecture, testing, delivery. Day to day I’ve also owned Fastify BFFs, Add-to-App work, and tools like WhatsNew.',
    ],
    facts: [
      { label: 'Location', value: 'Córdoba, Argentina' },
      { label: 'Education', value: 'Systems Analyst, Instituto Superior Santo Domingo (2017 – 2020)' },
      { label: 'Languages', value: 'Spanish (native) · English B2' },
      { label: 'Focus', value: 'Flutter, Fastify BFF, Clean Architecture, AI' },
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
