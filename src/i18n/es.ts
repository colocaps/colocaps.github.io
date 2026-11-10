import type { Dictionary } from './dictionary';

export const es: Dictionary = {
  meta: {
    title: 'Esteban Farias — Mobile Engineer',
    description:
      'Portfolio de Esteban Farias, Mobile Engineer en Córdoba, Argentina: apps mobile en escala, arquitectura y fintech.',
    ogLocale: 'es_AR',
  },
  chrome: {
    homeLabel: 'Esteban Farias, inicio',
    skipToContent: 'Saltar al contenido',
    navLabel: 'Secciones',
    nav: {
      timeline: 'Camino',
      career: 'Trayectoria',
      architecture: 'Arquitectura',
      apps: 'Apps',
      bio: 'Sobre mí',
      contact: 'Contacto',
    },
    localeGroupLabel: 'Idioma',
    locales: {
      es: { short: 'ES', long: 'Español' },
      en: { short: 'EN', long: 'English' },
    },
    footer: { linkedin: 'LinkedIn', github: 'GitHub', location: 'Córdoba, Argentina' },
  },
  hero: {
    kicker: 'Mobile Engineer',
    role: 'Apps que la gente usa todos los días.',
    sub: 'Diseño y construyo productos mobile en escala — con foco en arquitectura, fintech y experiencias cercanas.',
    ctaEmail: 'Escribime',
    ctaCv: 'Descargar CV',
    avatarAlt: 'Retrato de Esteban Farias',
  },
  timeline: {
    title: 'El camino, de un vistazo.',
    aside: 'Tocá un nodo para saltar al capítulo. El de itti es el protagonista.',
    heroTag: 'Actual',
  },
  career: {
    eyebrow: 'Trayectoria',
    title: 'Capítulos cortos, uno largo.',
    glance: {
      je: { year: '2021', name: 'J&E', role: 'Escritorio y procesos' },
      clarika: { year: '2022', name: 'Clarika', role: 'Flutter · retail' },
      bitlogic: { year: '2022', name: 'Bitlogic', role: 'Flutter · BFF' },
      'houlak-pinapp': { year: '2023', name: 'Houlak / Pinapp', role: 'Flutter · stores' },
      itti: { year: '2024–hoy', name: 'itti', role: 'Core Mobile · ueno' },
    },
    early: {
      je: {
        period: '2021 – 2022',
        company: 'J&E Software Solutions',
        role: 'Desktop Developer',
        points: [
          'Análisis de procesos de negocio y desarrollo de escritorio con WinForms y ASP.NET, con trato directo con clientes.',
          'Participé en una app tipo Uber que no llegó a producción.',
        ],
        tags: ['WinForms', 'ASP.NET', 'Análisis de procesos'],
      },
      clarika: {
        period: 'Ene – Jul 2022',
        company: 'Clarika Software + Innovation',
        role: 'Mobile Developer',
        points: ['App interna para retail, desarrollada en Flutter.'],
        tags: ['Flutter', 'Bloc', 'Riverpod', 'CI/CD en Azure'],
      },
      bitlogic: {
        period: 'Jul – Nov 2022',
        company: 'Bitlogic SA',
        role: 'Mobile Developer',
        points: ['Desarrollo mobile en Flutter con BFF e integraciones de API, con CI/CD en GitLab.'],
        tags: ['Flutter', 'Bloc', 'BFF', 'GitLab CI/CD'],
      },
      'houlak-pinapp': {
        period: 'Dic 2022 – Jun 2024',
        company: 'Houlak / Pinapp',
        role: 'Mobile Developer',
        points: [
          'En Houlak: una app de farmacia que no llegó a producción y Vizago Pay, pago biométrico para tiendas físicas.',
          'En Pinapp: apps en Flutter publicadas en App Store y Google Play, con Firebase, push notifications, Analytics y Adjust.',
        ],
        tags: ['Flutter', 'Bloc', 'Clean Architecture', 'Firebase'],
      },
    },
    itti: {
      eyebrow: 'Capítulo principal · itti',
      period: 'Jun 2024 – hoy',
      title: 'Banca mobile en producción.',
      lede: 'En itti trabajo en ueno bank y ueno empresas desde el equipo Core Mobile: coordino los release trains, defino cómo se integran las microapps a la app principal y automatizo CI/CD y observabilidad.',
      tags: ['Flutter', 'Fintech', 'Microapps', 'Codemagic', 'New Relic'],
      proof: [
        { label: 'Rol', value: 'Mobile Developer · liderazgo técnico de Core Mobile' },
        { label: 'Foco', value: 'Release trains, microapps, CI/CD, observabilidad' },
        { label: 'Stack', value: 'Flutter, Bloc, Riverpod, Clean Architecture' },
      ],
      phones: {
        uenoBank: 'Pantallas de la app ueno bank',
        uenoEmpresas: 'Pantallas de la app ueno empresas',
      },
    },
  },
  architecture: {
    eyebrow: 'Arquitectura',
    title: 'Arquitectura que llega a producción.',
    aside: 'Tres decisiones que se ven en el producto, no en un slide de teoría.',
    flux: {
      index: '01',
      name: 'Flux',
      kicker: 'Mantenimiento en tiempo real',
      body: 'Con más de 1M de usuarios, Firebase demoraba hasta 24 h en propagar la pantalla de mantenimiento a todos. Flux (WebSockets) redujo eso a ~3 minutos para el 100% de los usuarios.',
      diagram: {
        label: 'Tiempo para mostrar la pantalla de mantenimiento a todos los usuarios: Firebase hasta 24 horas, Flux unos 3 minutos.',
        firebase: 'Firebase',
        firebaseTime: 'hasta 24 h',
        flux: 'Flux · WebSockets',
        fluxTime: '~3 min',
        reach: 'al 100% de los usuarios',
      },
    },
    multitenant: {
      index: '02',
      name: 'Multitenant',
      kicker: 'ueno empresas dentro de ueno bank',
      body: 'Arquitectura para integrar ueno empresas en ueno bank y convertirlo en una superapp. Cada app tenía sus propias microapps y arquitecturas distintas.',
      diagram: {
        label: 'Antes, ueno bank y ueno empresas eran apps separadas con microapps propias. Después, una superapp que integra a las dos.',
        before: 'Antes',
        after: 'Después',
        microapps: 'microapps',
        superapp: 'superapp',
        apps: ['ueno bank', 'ueno empresas'],
      },
    },
    fpa: {
      index: '03',
      name: 'Flutter Performance Agent (FPA)',
      kicker: 'Rendimiento medido en producción',
      body: 'Herramienta que diseñé y creé para medir widgets y pantallas: tiempo de dibujo y rebuilds. Está integrada a la observabilidad: cuando se superan los umbrales, envía un pool de datos a New Relic, filtrable por marca, teléfono y modelo, para mejorar el rendimiento en producción.',
      diagram: {
        label: 'El FPA mide widgets y pantallas, compara contra umbrales y envía los datos a New Relic, filtrables por marca, teléfono y modelo.',
        steps: ['Widgets y pantallas', 'Dibujo + rebuilds', 'Umbrales', 'New Relic'],
        filters: ['Marca', 'Teléfono', 'Modelo'],
      },
    },
  },
  apps: {
    eyebrow: 'Apps',
    title: 'Apps que podés abrir hoy.',
    aside: 'Productos en los que trabajé, con links a las tiendas cuando siguen publicados.',
    interactionHint: 'Elegí una app a la derecha. El teléfono cambia de pantalla solo; arrastralo para girarlo.',
    dragHint: 'Arrastrá el teléfono para girarlo en 3D',
    storeLabel: 'Ver en App Store',
    items: {
      'ueno-bank': {
        name: 'ueno bank',
        blurb: 'Banca mobile: cuenta lista para usar, pagos con QR y NFC, y tarjetas de crédito y débito.',
        screensAlt: 'Pantallas de promoción de ueno bank en la tienda',
      },
      'ueno-empresas': {
        name: 'ueno empresas',
        blurb: 'Banca digital para negocios: transferir, autorizar operaciones y consultar cuentas y movimientos.',
        screensAlt: 'Pantallas de promoción de ueno empresas en la tienda',
      },
      merkao: {
        name: 'Merkao',
        blurb: 'App para que los comercios hagan sus pedidos a cualquier hora. Nació en el contexto de Jokr (dada de baja).',
        screensAlt: 'Pantallas de promoción de Merkao en la tienda',
      },
      'vizago-pay': {
        name: 'Vizago Pay',
        blurb: 'Pago biométrico para tiendas físicas: el cliente paga con una selfie en una tablet. Lo desarrollé en Houlak.',
        screensAlt: 'Pantalla de Vizago Pay',
      },
      'siglo-21': {
        name: 'Siglo 21',
        blurb: 'App de la Universidad Siglo 21: materias, horarios, exámenes y notas.',
        screensAlt: 'Pantallas de promoción de la app Universidad Siglo 21 en la tienda',
      },
    },
  },
  bio: {
    eyebrow: 'Sobre mí',
    title: 'Software que sirve de verdad.',
    paragraphs: [
      'Soy Analista de Sistemas y desarrollador mobile en Córdoba, Argentina. Trabajo sobre todo con Flutter y Clean Architecture, y me gusta diseñar software funcional que le sirva a una empresa y a quienes lo usan.',
      'Me apasiona el desarrollo de apps y siempre le pongo el 100%.',
    ],
    facts: [
      { label: 'Ubicación', value: 'Córdoba, Argentina' },
      { label: 'Formación', value: 'Analista de Sistemas, Instituto Superior Santo Domingo (2017 – 2020)' },
      { label: 'Idiomas', value: 'Español nativo · English B1' },
      { label: 'Foco', value: 'Flutter, Clean Architecture, Bloc, Riverpod' },
    ],
  },
  contact: {
    eyebrow: 'Contacto',
    title: '¿Hablamos?',
    closer:
      'Si estás armando un equipo mobile o querés charlar de producto, escribinme. Sin pitch agresivo — solo una buena conversación.',
    ctaEmail: 'Escribime',
    ctaCv: 'Descargar CV',
    avatarAlt: 'Esteban Farias sonriendo',
  },
};
