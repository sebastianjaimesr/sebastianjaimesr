import type { Lang } from '../i18n/types'

/**
 * All interface copy, in English and Spanish. Both objects must share the
 * same shape: TypeScript enforces it through the `Dictionary` type, and
 * src/data/translations.test.ts checks that no string is left empty.
 * Project-specific copy lives with each project in src/data/projects.ts.
 */
const en = {
  meta: {
    title: 'Sebastian Jaimes · Junior Full-Stack Developer',
    description:
      'Junior Full-Stack Developer from Colombia building web applications with React, TypeScript, Node.js, Express and PostgreSQL. Open to remote roles with US/EU overlap.',
  },
  skipLink: 'Skip to content',
  nav: {
    label: 'Main navigation',
    home: 'Sebastian Jaimes, back to top',
    brandRole: 'Junior Full-Stack Dev',
    about: 'About',
    projects: 'Projects',
    journey: 'Journey',
    skills: 'Toolkit',
    contact: 'Contact',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
    switchTo: 'Cambiar a español',
  },
  availability: {
    remote: 'Open to Remote',
    overlap: 'Available for US/EU Overlap',
    label: 'Time zone and availability',
  },
  hero: {
    eyebrow: 'Digital Universe / Full-Stack Developer',
    title: 'Junior Full-Stack Developer',
    intro:
      'I build web applications end to end: React and TypeScript interfaces, Express APIs, and PostgreSQL databases, backed by automated tests. I am looking for a remote team where I can ship useful work and keep growing.',
    primaryCta: 'View Projects',
    secondaryCta: "Let's Connect",
    availability: 'Open to junior roles',
    scroll: 'Scroll to explore',
    sceneLabel:
      'Interactive 3D sculpture: a reflective metallic orb surrounded by orbital rings and floating particles. Move the pointer or tap to interact.',
    labels: {
      zone: 'Based in',
      zoneValue: 'Colombia · UTC−5',
      stack: 'Stack',
      stackValue: 'React → Express → PostgreSQL',
      mode: 'Mode',
      modeValue: 'Learning by building',
    },
  },
  about: {
    index: '01',
    kicker: 'About me',
    title: 'Building real applications, one layer at a time.',
    photoAlt: 'Portrait of Sebastian Jaimes in a black suit, white shirt and black tie',
    body: [
      'I am a full-stack developer in training at Campuslands, in Bucaramanga, Colombia, finishing the Software Development Technician program in 2026.',
      'My recent work goes from the interface to the database: a perfume store with a React front end, an Express API, Prisma and PostgreSQL, backed by 196 passing unit and API tests; an online ordering system for a local restaurant; and a sales assistant that answers only with data from a real inventory.',
      'I am most interested in API design, relational data and testing, and I am looking for an international remote team where I can contribute and keep learning from experienced engineers.',
    ],
    facts: {
      based: 'Based in',
      zone: 'Time zone',
      zoneValue: 'UTC−5 · overlaps with US and EU hours',
      languages: 'Languages',
      languagesValue: 'Spanish (native) · English B1, improving',
      training: 'Training',
      trainingValue: 'Software Development Technician, Campuslands (2026)',
    },
    themes: [
      {
        title: 'Full-stack web apps',
        text: 'React and TypeScript front ends connected to REST APIs in Express.',
      },
      {
        title: 'Relational data',
        text: 'PostgreSQL and MySQL schemas, Prisma migrations, transactions and constraints.',
      },
      {
        title: 'Automated testing',
        text: 'Unit, API and end-to-end tests with Vitest, Supertest and Playwright.',
      },
      {
        title: 'Remote collaboration',
        text: 'Pull requests, CI on GitHub Actions and written documentation for every project.',
      },
    ],
  },
  projects: {
    index: '02',
    kicker: 'Projects',
    title: 'Work in orbit.',
    intro:
      'Applications I designed and built during my training. Every technology listed comes from the project’s own code, and every link goes to the real repository or deployment.',
    featured: {
      badge: 'Featured case study',
      testing: 'Testing',
      stack: 'Stack',
      diagramTitle: 'Request flow',
      diagramLabel: (flow: string) => `Architecture diagram: ${flow}`,
      testsCaption: 'Results from running the suites locally on Nov 7, 2026.',
    },
    filters: {
      label: 'Filter projects by category',
      all: 'All',
      fullstack: 'Full-Stack',
      frontend: 'Front-End',
      automation: 'Automation',
      databases: 'Databases',
      games: 'Games',
      other: 'Other',
    },
    count: (n: number) => `${n} ${n === 1 ? 'project' : 'projects'}`,
    empty: 'No projects in this category yet.',
    problem: 'Problem',
    challenge: 'Key challenge',
    features: 'Main features',
    tech: 'Technologies',
    details: 'Details',
    detailsFor: (name: string) => `Open details for ${name}`,
    repo: 'View Code',
    repoFor: (name: string) => `View code of ${name} on GitHub`,
    demo: 'Live Demo',
    demoFor: (name: string) => `Open the live demo of ${name}`,
    noDemo: 'No live demo: source code only',
    close: 'Close',
    closeDetails: 'Close project details',
  },
  journey: {
    index: '03',
    kicker: 'Journey',
    title: 'From first scripts to full-stack apps.',
    intro: 'Dates come from the first commit of each repository.',
    items: [
      {
        date: '2026',
        title: 'Campuslands',
        text: 'Software Development Technician program in Bucaramanga: programming fundamentals, web development, databases and teamwork.',
      },
      {
        date: 'Feb 2026',
        title: 'First Python project',
        text: 'Community Tool Lending: a console app with roles, validation and JSON persistence.',
      },
      {
        date: 'Apr – May 2026',
        title: 'Front-end foundations',
        text: 'Space Rides (HTML and CSS) and Undergold, a store with an admin panel in vanilla JavaScript and Web Components.',
      },
      {
        date: 'Jul – Sep 2026',
        title: 'Automation and data',
        text: 'AgendaBot with n8n and Telegram, then a MySQL database with triggers, procedures, roles and scheduled events.',
      },
      {
        date: 'Oct 2026',
        title: 'First full-stack application',
        text: 'Emirate Scents: React, Express, Prisma and PostgreSQL, with Vitest, Supertest and Playwright from the start.',
      },
      {
        date: 'Oct 2026',
        title: 'Object-oriented Java',
        text: 'A school ERP with MVC, DAO interfaces, JDBC transactions and JUnit 5 tests.',
      },
      {
        date: 'Oct – Nov 2026',
        title: 'More full-stack products',
        text: 'Don Repuestos Jaimes and ARCA FOOD (Express + PostgreSQL), then TR3S & CO. with Next.js, Supabase and payment webhooks.',
      },
      {
        date: 'Oct – Nov 2026',
        title: 'From 2D to 3D in Godot',
        text: 'Escape Bucaramanga evolved from a 2D platformer into a 3D escape room with police AI and 54 automated tests.',
      },
    ],
  },
  skills: {
    index: '04',
    kicker: 'Toolkit',
    title: 'Technologies used in my repositories.',
    intro:
      'Only tools that appear in my published code, with the projects that use them. No percentages or skill bars.',
    categories: {
      frontend: 'Front-End',
      backend: 'Back-End',
      databases: 'Databases',
      testing: 'Testing',
      tools: 'Tools & Platforms',
    },
    count: (n: number) => `${n} ${n === 1 ? 'technology' : 'technologies'}`,
  },
  approach: {
    index: '05',
    kicker: 'Working approach',
    title: 'How I approach a problem.',
    steps: [
      { title: 'Understand', text: 'Clarify the problem, the people who will use the solution and the requirements before writing code.' },
      { title: 'Build', text: 'Ship in small steps: a data model, an API, an interface, each one documented and reviewed.' },
      { title: 'Verify', text: 'Write tests, check accessibility and responsive behavior, then refine from feedback.' },
    ],
  },
  contact: {
    index: '06',
    kicker: "Let's connect",
    title: "Let's Build Something Useful.",
    body: 'I am open to junior full-stack and front-end roles, remote or hybrid, with teams in the US, Europe or Latin America.',
    emailCta: 'Send me an email',
    emailSubject: 'Hello Sebastian, about an opportunity',
    copy: 'Copy email address',
    cv: 'Download CV',
    copied: 'Email address copied',
    copyFailed: 'Could not copy. Please select the address manually.',
    channels: {
      email: 'Email',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      whatsapp: 'WhatsApp',
    },
    hints: {
      email: 'Opens your email app',
      github: 'Code and repositories',
      linkedin: 'Professional profile',
      whatsapp: 'Message on WhatsApp',
    },
    newTab: '(opens in a new tab)',
  },
  footer: {
    phrase: 'Built with React, TypeScript and Three.js in Bucaramanga, Colombia.',
    rights: 'Sebastian Jaimes',
    top: 'Back to top',
  },
  fallback: {
    noWebgl: '3D view unavailable on this device. Showing a static illustration.',
  },
}

export type Dictionary = typeof en

const es: Dictionary = {
  meta: {
    title: 'Sebastian Jaimes · Desarrollador Full-Stack Junior',
    description:
      'Desarrollador Full-Stack Junior de Colombia que construye aplicaciones web con React, TypeScript, Node.js, Express y PostgreSQL. Disponible para trabajo remoto con horario compatible con EE. UU. y Europa.',
  },
  skipLink: 'Saltar al contenido',
  nav: {
    label: 'Navegación principal',
    home: 'Sebastian Jaimes, volver al inicio',
    brandRole: 'Full-Stack Dev Junior',
    about: 'Sobre mí',
    projects: 'Proyectos',
    journey: 'Trayectoria',
    skills: 'Herramientas',
    contact: 'Contacto',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    language: 'Idioma',
    switchTo: 'Switch to English',
  },
  availability: {
    remote: 'Disponible para remoto',
    overlap: 'Horario compatible con EE. UU. y Europa',
    label: 'Zona horaria y disponibilidad',
  },
  hero: {
    eyebrow: 'Universo digital / Desarrollador Full-Stack',
    title: 'Desarrollador Full-Stack Junior',
    intro:
      'Construyo aplicaciones web de principio a fin: interfaces en React y TypeScript, APIs en Express y bases de datos PostgreSQL, respaldadas por pruebas automáticas. Busco un equipo remoto donde pueda entregar trabajo útil y seguir creciendo.',
    primaryCta: 'Ver proyectos',
    secondaryCta: 'Conectemos',
    availability: 'Abierto a cargos junior',
    scroll: 'Desplázate para explorar',
    sceneLabel:
      'Escultura 3D interactiva: una esfera metálica reflectante rodeada de anillos orbitales y partículas flotantes. Mueve el puntero o toca para interactuar.',
    labels: {
      zone: 'Ubicación',
      zoneValue: 'Colombia · UTC−5',
      stack: 'Stack',
      stackValue: 'React → Express → PostgreSQL',
      mode: 'Modo',
      modeValue: 'Aprender construyendo',
    },
  },
  about: {
    index: '01',
    kicker: 'Sobre mí',
    title: 'Construyendo aplicaciones reales, capa por capa.',
    photoAlt: 'Retrato de Sebastian Jaimes con traje negro, camisa blanca y corbata negra',
    body: [
      'Soy desarrollador full-stack en formación en Campuslands, en Bucaramanga, Colombia, y termino el programa Técnico en Desarrollo de Software en 2026.',
      'Mis proyectos recientes van de la interfaz a la base de datos: una tienda de perfumes con frontend en React, API en Express, Prisma y PostgreSQL, respaldada por 196 pruebas unitarias y de API que pasan; un sistema de pedidos en línea para un restaurante local; y un asistente de ventas que solo responde con datos de un inventario real.',
      'Me interesan sobre todo el diseño de APIs, los datos relacionales y las pruebas, y busco un equipo remoto internacional donde pueda aportar y seguir aprendiendo de ingenieros con experiencia.',
    ],
    facts: {
      based: 'Ubicado en',
      zone: 'Zona horaria',
      zoneValue: 'UTC−5 · coincide con horarios de EE. UU. y Europa',
      languages: 'Idiomas',
      languagesValue: 'Español (nativo) · Inglés B1, en mejora',
      training: 'Formación',
      trainingValue: 'Técnico en Desarrollo de Software, Campuslands (2026)',
    },
    themes: [
      {
        title: 'Aplicaciones web full-stack',
        text: 'Frontends en React y TypeScript conectados a APIs REST en Express.',
      },
      {
        title: 'Datos relacionales',
        text: 'Esquemas en PostgreSQL y MySQL, migraciones con Prisma, transacciones y restricciones.',
      },
      {
        title: 'Pruebas automáticas',
        text: 'Pruebas unitarias, de API y end-to-end con Vitest, Supertest y Playwright.',
      },
      {
        title: 'Colaboración remota',
        text: 'Pull requests, CI en GitHub Actions y documentación escrita en cada proyecto.',
      },
    ],
  },
  projects: {
    index: '02',
    kicker: 'Proyectos',
    title: 'Trabajo en órbita.',
    intro:
      'Aplicaciones que diseñé y construí durante mi formación. Cada tecnología listada sale del código del proyecto, y cada enlace lleva al repositorio o despliegue real.',
    featured: {
      badge: 'Caso de estudio destacado',
      testing: 'Pruebas',
      stack: 'Stack',
      diagramTitle: 'Flujo de una solicitud',
      diagramLabel: (flow: string) => `Diagrama de arquitectura: ${flow}`,
      testsCaption: 'Resultados al ejecutar las pruebas localmente el 7 de noviembre de 2026.',
    },
    filters: {
      label: 'Filtrar proyectos por categoría',
      all: 'Todos',
      fullstack: 'Full-Stack',
      frontend: 'Front-End',
      automation: 'Automatización',
      databases: 'Bases de datos',
      games: 'Videojuegos',
      other: 'Otros',
    },
    count: (n: number) => `${n} ${n === 1 ? 'proyecto' : 'proyectos'}`,
    empty: 'Todavía no hay proyectos en esta categoría.',
    problem: 'Problema',
    challenge: 'Reto principal',
    features: 'Características principales',
    tech: 'Tecnologías',
    details: 'Detalles',
    detailsFor: (name: string) => `Abrir detalles de ${name}`,
    repo: 'Ver código',
    repoFor: (name: string) => `Ver código de ${name} en GitHub`,
    demo: 'Demo en vivo',
    demoFor: (name: string) => `Abrir la demo en vivo de ${name}`,
    noDemo: 'Sin demo en vivo: solo código fuente',
    close: 'Cerrar',
    closeDetails: 'Cerrar detalles del proyecto',
  },
  journey: {
    index: '03',
    kicker: 'Trayectoria',
    title: 'De los primeros scripts a aplicaciones full-stack.',
    intro: 'Las fechas salen del primer commit de cada repositorio.',
    items: [
      {
        date: '2026',
        title: 'Campuslands',
        text: 'Programa Técnico en Desarrollo de Software en Bucaramanga: fundamentos de programación, desarrollo web, bases de datos y trabajo en equipo.',
      },
      {
        date: 'Feb. 2026',
        title: 'Primer proyecto en Python',
        text: 'Préstamo comunitario de herramientas: una app de consola con roles, validación y persistencia en JSON.',
      },
      {
        date: 'Abr. – may. 2026',
        title: 'Bases del frontend',
        text: 'Space Rides (HTML y CSS) y Undergold, una tienda con panel administrativo en JavaScript vanilla y Web Components.',
      },
      {
        date: 'Jul. – sep. 2026',
        title: 'Automatización y datos',
        text: 'AgendaBot con n8n y Telegram, y luego una base de datos MySQL con triggers, procedimientos, roles y eventos programados.',
      },
      {
        date: 'Oct. 2026',
        title: 'Primera aplicación full-stack',
        text: 'Emirate Scents: React, Express, Prisma y PostgreSQL, con Vitest, Supertest y Playwright desde el principio.',
      },
      {
        date: 'Oct. 2026',
        title: 'Java orientado a objetos',
        text: 'Un ERP escolar con MVC, interfaces DAO, transacciones JDBC y pruebas con JUnit 5.',
      },
      {
        date: 'Oct. – nov. 2026',
        title: 'Más productos full-stack',
        text: 'Don Repuestos Jaimes y ARCA FOOD (Express + PostgreSQL), y luego TR3S & CO. con Next.js, Supabase y webhooks de pago.',
      },
      {
        date: 'Oct. – nov. 2026',
        title: 'De 2D a 3D en Godot',
        text: 'Escape Bucaramanga pasó de un juego de plataformas 2D a un escape room 3D con IA de policía y 54 pruebas automáticas.',
      },
    ],
  },
  skills: {
    index: '04',
    kicker: 'Herramientas',
    title: 'Tecnologías que uso en mis repositorios.',
    intro:
      'Solo herramientas que aparecen en mi código publicado, con los proyectos que las usan. Sin porcentajes ni barras de nivel.',
    categories: {
      frontend: 'Front-End',
      backend: 'Back-End',
      databases: 'Bases de datos',
      testing: 'Pruebas',
      tools: 'Herramientas y plataformas',
    },
    count: (n: number) => `${n} ${n === 1 ? 'tecnología' : 'tecnologías'}`,
  },
  approach: {
    index: '05',
    kicker: 'Forma de trabajo',
    title: 'Cómo abordo un problema.',
    steps: [
      { title: 'Entender', text: 'Aclarar el problema, a las personas que usarán la solución y los requisitos antes de escribir código.' },
      { title: 'Construir', text: 'Avanzar en pasos pequeños: un modelo de datos, una API, una interfaz, cada uno documentado y revisado.' },
      { title: 'Verificar', text: 'Escribir pruebas, revisar accesibilidad y diseño responsive, y luego mejorar con la retroalimentación.' },
    ],
  },
  contact: {
    index: '06',
    kicker: 'Conectemos',
    title: 'Construyamos algo útil.',
    body: 'Estoy abierto a cargos junior full-stack y front-end, remotos o híbridos, con equipos en EE. UU., Europa o Latinoamérica.',
    emailCta: 'Envíame un correo',
    emailSubject: 'Hola Sebastian, sobre una oportunidad',
    copy: 'Copiar correo electrónico',
    cv: 'Descargar CV',
    copied: 'Correo copiado',
    copyFailed: 'No se pudo copiar. Selecciona la dirección manualmente.',
    channels: {
      email: 'Correo',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      whatsapp: 'WhatsApp',
    },
    hints: {
      email: 'Abre tu aplicación de correo',
      github: 'Código y repositorios',
      linkedin: 'Perfil profesional',
      whatsapp: 'Escríbeme por WhatsApp',
    },
    newTab: '(se abre en una pestaña nueva)',
  },
  footer: {
    phrase: 'Hecho con React, TypeScript y Three.js en Bucaramanga, Colombia.',
    rights: 'Sebastian Jaimes',
    top: 'Volver arriba',
  },
  fallback: {
    noWebgl: 'La vista 3D no está disponible en este dispositivo. Se muestra una ilustración estática.',
  },
}

export const dictionaries: Record<Lang, Dictionary> = { en, es }
