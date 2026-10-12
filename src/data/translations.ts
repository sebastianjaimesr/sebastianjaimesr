import type { Lang } from '../i18n/types'

/**
 * All interface copy, in English and Spanish. Both objects must share the
 * same shape: TypeScript enforces it through the `Dictionary` type.
 */
const en = {
  meta: {
    title: 'Sebastian Jaimes · Full-Stack Developer in Training',
    description:
      'Portfolio of Sebastian Jaimes, a Full-Stack Developer in training from Bucaramanga, Colombia, open to junior opportunities and collaborations.',
  },
  skipLink: 'Skip to content',
  nav: {
    label: 'Main navigation',
    home: 'Sebastian Jaimes, back to top',
    about: 'About',
    skills: 'Skills',
    projects: 'Projects',
    approach: 'Approach',
    contact: 'Contact',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
    switchTo: 'Cambiar a español',
  },
  hero: {
    eyebrow: 'Digital Universe / Full-Stack Developer',
    title: 'Full-Stack Developer in Training',
    intro:
      'I build web experiences from the interface to the database, learning through practical projects and caring about the details that make products clear, useful and maintainable.',
    primaryCta: 'Explore My Work',
    secondaryCta: "Let's Connect",
    availability: 'Open to junior opportunities',
    scroll: 'Scroll to explore',
    sceneLabel:
      'Interactive 3D sculpture: a reflective metallic orb surrounded by orbital rings and floating particles. Move the pointer or tap to interact.',
    labels: {
      coordinates: 'Location',
      stack: 'Stack',
      stackValue: 'Interface → Logic → Data',
      mode: 'Mode',
      modeValue: 'Learning by building',
    },
  },
  about: {
    index: '01',
    kicker: 'About me',
    title: 'Building My Path in Technology.',
    photoAlt: 'Portrait of Sebastian Jaimes smiling, wearing a dark suit and tie',
    body: "I'm a Full-Stack Developer in training who enjoys understanding how digital products work from end to end: interfaces, application logic, databases, and automation. I'm focused on learning through practical projects, improving my problem-solving skills, and building digital experiences that are useful, maintainable, and thoughtfully designed.",
    facts: {
      based: 'Based in',
      focus: 'Current focus',
      focusValue: 'Full-stack fundamentals and practical projects',
      languages: 'Languages',
      languagesValue: 'Spanish (native) · English B1, in progress',
      training: 'Training',
      trainingValue: 'Software Development Technician, Campuslands (2026, in progress)',
    },
    themes: [
      {
        title: 'Full-stack development',
        text: 'Learning how the front end, the back end and the data layer fit together into one product.',
      },
      {
        title: 'Databases and data structure',
        text: 'Designing relational models with clear entities, relationships and business rules.',
      },
      {
        title: 'Workflow automation',
        text: 'Exploring tools like n8n to connect services and remove repetitive manual work.',
      },
      {
        title: 'Continuous learning',
        text: 'Growing every week and looking forward to collaborating with international teams.',
      },
    ],
  },
  skills: {
    index: '02',
    kicker: 'Toolkit',
    title: 'Technologies I work and learn with.',
    intro:
      'The tools I use in my practice projects, grouped by area. No percentages: just what I use each one for.',
    all: 'All',
    filterLabel: 'Filter technologies by category',
    categories: {
      programming: 'Programming',
      web: 'Web Development',
      databases: 'Databases',
      automation: 'Automation',
      tools: 'Development Tools',
    },
    count: (n: number) => `${n} ${n === 1 ? 'technology' : 'technologies'}`,
  },
  projects: {
    index: '03',
    kicker: 'Selected projects',
    title: 'Work in orbit.',
    intro:
      'Projects from my training, each with its source code on GitHub. Open any card to see what it does and how it was built.',
    status: {
      verified: 'Code on GitHub',
      'in-progress': 'In progress',
      unverified: 'Concept · details being confirmed',
    },
    features: 'Main features',
    tech: 'Technologies',
    details: 'Project details',
    detailsFor: (name: string) => `Open details for ${name}`,
    repo: 'View repository',
    demo: 'Live demo',
    profile: 'Browse GitHub profile',
    noLinks: 'The repository link will be added once it is published.',
    close: 'Close',
    closeDetails: 'Close project details',
  },
  approach: {
    index: '04',
    kicker: 'Working approach',
    title: 'How I approach a problem.',
    steps: [
      { title: 'Understand', text: 'Understand the problem, the people who will use the solution and the requirements.' },
      { title: 'Build', text: 'Develop a clear, maintainable and thoughtful solution, one step at a time.' },
      { title: 'Improve', text: 'Test, gather feedback, learn from the result and refine it.' },
    ],
  },
  contact: {
    index: '05',
    kicker: "Let's connect",
    title: "Let's Build Something Useful.",
    body: "I'm open to junior opportunities, collaborations, and projects where I can contribute curiosity, commitment, and a willingness to learn.",
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
    phrase: 'Built with curiosity in Bucaramanga.',
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
    title: 'Sebastian Jaimes · Desarrollador Full-Stack en formación',
    description:
      'Portafolio de Sebastian Jaimes, desarrollador Full-Stack en formación de Bucaramanga, Colombia, abierto a oportunidades junior y colaboraciones.',
  },
  skipLink: 'Saltar al contenido',
  nav: {
    label: 'Navegación principal',
    home: 'Sebastian Jaimes, volver al inicio',
    about: 'Sobre mí',
    skills: 'Habilidades',
    projects: 'Proyectos',
    approach: 'Enfoque',
    contact: 'Contacto',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    language: 'Idioma',
    switchTo: 'Switch to English',
  },
  hero: {
    eyebrow: 'Universo digital / Desarrollador Full-Stack',
    title: 'Desarrollador Full-Stack en formación',
    intro:
      'Construyo experiencias web desde la interfaz hasta la base de datos, aprendiendo con proyectos prácticos y cuidando los detalles que hacen que un producto sea claro, útil y mantenible.',
    primaryCta: 'Explorar mi trabajo',
    secondaryCta: 'Conectemos',
    availability: 'Abierto a oportunidades junior',
    scroll: 'Desplázate para explorar',
    sceneLabel:
      'Escultura 3D interactiva: una esfera metálica reflectante rodeada de anillos orbitales y partículas flotantes. Mueve el puntero o toca para interactuar.',
    labels: {
      coordinates: 'Ubicación',
      stack: 'Stack',
      stackValue: 'Interfaz → Lógica → Datos',
      mode: 'Modo',
      modeValue: 'Aprender construyendo',
    },
  },
  about: {
    index: '01',
    kicker: 'Sobre mí',
    title: 'Construyendo mi camino en tecnología.',
    photoAlt: 'Retrato de Sebastian Jaimes sonriendo, con traje oscuro y corbata',
    body: 'Soy desarrollador Full-Stack en formación y me interesa comprender cómo funcionan los productos digitales de principio a fin: interfaces, lógica de aplicaciones, bases de datos y automatización. Me enfoco en aprender mediante proyectos prácticos, mejorar mis habilidades para resolver problemas y construir experiencias digitales útiles, mantenibles y bien diseñadas.',
    facts: {
      based: 'Ubicado en',
      focus: 'Enfoque actual',
      focusValue: 'Fundamentos full-stack y proyectos prácticos',
      languages: 'Idiomas',
      languagesValue: 'Español (nativo) · Inglés B1, en curso',
      training: 'Formación',
      trainingValue: 'Técnico Laboral en Desarrollo de Software, Campuslands (2026, en curso)',
    },
    themes: [
      {
        title: 'Desarrollo full-stack',
        text: 'Aprender cómo el front end, el back end y la capa de datos se unen en un solo producto.',
      },
      {
        title: 'Bases de datos y estructura',
        text: 'Diseñar modelos relacionales con entidades, relaciones y reglas de negocio claras.',
      },
      {
        title: 'Automatización de flujos',
        text: 'Explorar herramientas como n8n para conectar servicios y eliminar trabajo manual repetitivo.',
      },
      {
        title: 'Aprendizaje continuo',
        text: 'Crecer cada semana con la meta de colaborar con equipos internacionales.',
      },
    ],
  },
  skills: {
    index: '02',
    kicker: 'Herramientas',
    title: 'Tecnologías con las que trabajo y aprendo.',
    intro:
      'Las herramientas que uso en mis proyectos de práctica, agrupadas por área. Sin porcentajes: solo para qué uso cada una.',
    all: 'Todas',
    filterLabel: 'Filtrar tecnologías por categoría',
    categories: {
      programming: 'Programación',
      web: 'Desarrollo web',
      databases: 'Bases de datos',
      automation: 'Automatización',
      tools: 'Herramientas',
    },
    count: (n: number) => `${n} ${n === 1 ? 'tecnología' : 'tecnologías'}`,
  },
  projects: {
    index: '03',
    kicker: 'Proyectos seleccionados',
    title: 'Trabajo en órbita.',
    intro:
      'Proyectos de mi formación, cada uno con su código en GitHub. Abre cualquier tarjeta para ver qué hace y cómo se construyó.',
    status: {
      verified: 'Código en GitHub',
      'in-progress': 'En progreso',
      unverified: 'Concepto · detalles por confirmar',
    },
    features: 'Características principales',
    tech: 'Tecnologías',
    details: 'Ver detalles',
    detailsFor: (name: string) => `Abrir detalles de ${name}`,
    repo: 'Ver repositorio',
    demo: 'Demo en vivo',
    profile: 'Ver perfil de GitHub',
    noLinks: 'El enlace al repositorio se añadirá cuando esté publicado.',
    close: 'Cerrar',
    closeDetails: 'Cerrar detalles del proyecto',
  },
  approach: {
    index: '04',
    kicker: 'Forma de trabajo',
    title: 'Cómo abordo un problema.',
    steps: [
      { title: 'Entender', text: 'Entender el problema, a las personas que usarán la solución y los requisitos.' },
      { title: 'Construir', text: 'Desarrollar una solución clara, mantenible y bien pensada, paso a paso.' },
      { title: 'Mejorar', text: 'Probar, recibir retroalimentación, aprender del resultado y refinarlo.' },
    ],
  },
  contact: {
    index: '05',
    kicker: 'Conectemos',
    title: 'Construyamos algo útil.',
    body: 'Estoy abierto a oportunidades junior, colaboraciones y proyectos donde pueda aportar curiosidad, compromiso y muchas ganas de aprender.',
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
    phrase: 'Hecho con curiosidad desde Bucaramanga.',
    rights: 'Sebastian Jaimes',
    top: 'Volver arriba',
  },
  fallback: {
    noWebgl: 'La vista 3D no está disponible en este dispositivo. Se muestra una ilustración estática.',
  },
}

export const dictionaries: Record<Lang, Dictionary> = { en, es }
