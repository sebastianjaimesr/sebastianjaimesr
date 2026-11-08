import type { Localized } from '../i18n/types'

/**
 * Projects shown in the "Projects" section.
 *
 * Every fact below was checked against the project's repository (README, package.json,
 * workflows and source code) on 2026-11-07. Rules for editing:
 *  - Never fill `repoUrl` or `demoUrl` with a guessed URL. Leave `demoUrl` null until a real
 *    deployment exists; the card then shows only "View code".
 *  - `tech` lists only technologies that appear in the project's code or manifests.
 *  - `categories[0]` is the primary category (shown on the card); extra entries only make the
 *    project appear under more filters, and must also be true.
 *  - When a demo is not the full application (static preview, sleeping backend...), say so in
 *    `demoNote` so nobody expects more than the link delivers.
 */
export type ProjectCategory = 'fullstack' | 'frontend' | 'automation' | 'databases' | 'games' | 'other'

export const projectCategories: ProjectCategory[] = ['fullstack', 'frontend', 'automation', 'databases', 'games', 'other']

const GH = 'https://github.com/sebastianjaimesr'

export interface Project {
  id: string
  name: string
  categories: [ProjectCategory, ...ProjectCategory[]]
  /** Short label shown above the title, e.g. "E-commerce · Next.js". */
  kind: Localized
  /** One or two lines: what it is. */
  summary: Localized
  /** The problem the project addresses. */
  problem: Localized
  /** Main technical challenge or learning, confirmed by the code. */
  challenge: Localized
  /** Longer description, shown in the details dialog. */
  description: Localized
  features: Localized<string[]>
  tech: string[]
  repoUrl: string
  demoUrl: string | null
  /** Honest caveat about what the live demo does and does not include. */
  demoNote: Localized | null
  /** Image in /public/images, referenced as 'images/<file>'. null → generated cover (see TODOs). */
  image: string | null
  imageAlt: Localized
  /** Accent used by the generated cover artwork when there is no image. */
  accent: 'blue' | 'violet' | 'mint' | 'indigo'
}

/* -------------------------------------------------------------------------- */
/* Featured project                                                            */
/* -------------------------------------------------------------------------- */

export interface ArchitectureNode {
  id: string
  label: string
  detail: Localized
}

export interface FeaturedProject {
  id: string
  name: string
  category: Localized
  summary: Localized
  tech: string[]
  repoUrl: string
  demoUrl: string
  demoNote: Localized
  image: string
  imageAlt: Localized
  /** Verified test results, shown as small stats. Numbers come from running the suites locally. */
  testStats: { value: string; label: Localized }[]
  caseStudy: {
    problem: Localized
    solution: Localized
    architecture: Localized
    challenges: Localized<string[]>
    testing: Localized
    outcome: Localized
  }
  /** Main request flow, left to right. */
  architectureFlow: ArchitectureNode[]
  /** Side notes drawn under the flow. */
  architectureNotes: Localized<string[]>
}

export const featuredProject: FeaturedProject = {
  id: 'emirate-scents',
  name: 'Emirate Scents',
  category: { en: 'Full-stack e-commerce', es: 'E-commerce full-stack' },
  summary: {
    en: 'An online perfume store with a React storefront, an Express REST API, a PostgreSQL database managed with Prisma, and a private admin panel for products, inventory and orders.',
    es: 'Una tienda de perfumes en línea con frontend en React, una API REST en Express, base de datos PostgreSQL gestionada con Prisma y un panel privado para productos, inventario y pedidos.',
  },
  tech: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Zustand', 'Express 5', 'Prisma 7', 'PostgreSQL', 'Zod', 'Vitest', 'Supertest', 'Playwright'],
  repoUrl: `${GH}/emirate-scents`,
  demoUrl: 'https://sebastianjaimesr.github.io/emirate-scents/',
  demoNote: {
    en: 'The live demo is a static GitHub Pages preview with demo products. It runs without the API, so ordering is disabled.',
    es: 'La demo es una vista previa estática en GitHub Pages con productos de demostración. Funciona sin la API, así que los pedidos están desactivados.',
  },
  image: 'images/emirate-scents.webp',
  imageAlt: {
    en: 'Emirate Scents home page: a dark hero with the headline "El arte de dejar huella" and a Khamrah perfume bottle on the right',
    es: 'Página de inicio de Emirate Scents: un hero oscuro con el titular "El arte de dejar huella" y un frasco de perfume Khamrah a la derecha',
  },
  testStats: [
    { value: '140', label: { en: 'API tests (Vitest + Supertest)', es: 'pruebas de la API (Vitest + Supertest)' } },
    { value: '56', label: { en: 'front-end unit tests (Vitest)', es: 'pruebas unitarias del frontend (Vitest)' } },
    { value: '8', label: { en: 'end-to-end specs (Playwright)', es: 'suites end-to-end (Playwright)' } },
  ],
  caseStudy: {
    problem: {
      en: 'A small perfume business sells Arabian, designer and niche fragrances through Instagram and WhatsApp. It needed a catalog customers can search and filter, and a way to receive orders without trusting prices or stock sent by the browser.',
      es: 'Un pequeño negocio de perfumes vende fragancias árabes, de diseñador y de nicho por Instagram y WhatsApp. Necesitaba un catálogo que los clientes pudieran buscar y filtrar, y una forma de recibir pedidos sin confiar en los precios o el stock que envía el navegador.',
    },
    solution: {
      en: 'A storefront with search, filters, sorting and pagination, product pages, favorites and a persistent cart. Checkout validates the form, the API registers the order, and the customer then sends a prefilled summary over WhatsApp. A separate admin panel manages products, photos, inventory movements and order status.',
      es: 'Una tienda con búsqueda, filtros, orden y paginación, fichas de producto, favoritos y carrito persistente. El checkout valida el formulario, la API registra el pedido y el cliente envía un resumen prellenado por WhatsApp. Un panel aparte gestiona productos, fotos, movimientos de inventario y estados de pedidos.',
    },
    architecture: {
      en: 'The React single-page app talks to a JSON REST API under /api. Express validates every request with Zod, applies helmet and rate limiting, and calls service functions that use Prisma to read and write PostgreSQL. Admin routes use argon2-hashed passwords and server-side sessions.',
      es: 'La aplicación React de una sola página se comunica con una API REST en JSON bajo /api. Express valida cada solicitud con Zod, aplica helmet y límites de solicitudes, y llama a servicios que usan Prisma para leer y escribir en PostgreSQL. Las rutas del panel usan contraseñas con hash argon2 y sesiones en el servidor.',
    },
    challenges: {
      en: [
        'Server-side order validation: the API only accepts product ids and quantities, then recalculates prices and checks stock inside a database transaction.',
        'Inventory is deducted only when the business confirms an order in the admin panel, and every change is recorded as an inventory movement.',
        'One codebase, two builds: the API-backed store and a serverless GitHub Pages preview that reproduces filtering and sorting in the browser.',
        '3D scenes with React Three Fiber that fall back to static content on devices without WebGL or with low frame rates.',
      ],
      es: [
        'Validación de pedidos en el servidor: la API solo acepta ids de producto y cantidades, y recalcula precios y verifica stock dentro de una transacción de base de datos.',
        'El inventario se descuenta solo cuando el negocio confirma el pedido en el panel, y cada cambio queda como un movimiento de inventario.',
        'Un código, dos builds: la tienda conectada a la API y una vista previa sin servidor en GitHub Pages que reproduce filtros y orden en el navegador.',
        'Escenas 3D con React Three Fiber que pasan a contenido estático en dispositivos sin WebGL o con pocos cuadros por segundo.',
      ],
    },
    testing: {
      en: 'API tests run with Vitest and Supertest against a dedicated PostgreSQL test database; front-end logic (cart, catalog queries, checkout schema, WhatsApp messages) has Vitest unit tests; Playwright specs cover shopping, ordering, the admin panel and axe accessibility checks. A GitHub Actions workflow runs lint, type checks, tests, build and end-to-end tests.',
      es: 'Las pruebas de la API usan Vitest y Supertest contra una base de datos PostgreSQL de pruebas; la lógica del frontend (carrito, consultas del catálogo, esquema del checkout, mensajes de WhatsApp) tiene pruebas unitarias con Vitest; las suites de Playwright recorren la compra, el pedido, el panel y revisiones de accesibilidad con axe. Un workflow de GitHub Actions ejecuta lint, tipos, pruebas, build y pruebas end-to-end.',
    },
    outcome: {
      en: 'It shows I can design a relational schema, build and secure a REST API, connect it to a typed React front end, and back the whole flow with automated tests at three levels.',
      es: 'Demuestra que puedo diseñar un esquema relacional, construir y proteger una API REST, conectarla con un frontend React tipado y respaldar todo el flujo con pruebas automáticas en tres niveles.',
    },
  },
  architectureFlow: [
    { id: 'client', label: 'React SPA', detail: { en: 'Storefront + admin · Vite · Zustand', es: 'Tienda + panel · Vite · Zustand' } },
    { id: 'api', label: 'Express API', detail: { en: 'REST /api · Zod · helmet · sessions', es: 'REST /api · Zod · helmet · sesiones' } },
    { id: 'orm', label: 'Prisma', detail: { en: 'Typed queries · migrations · transactions', es: 'Consultas tipadas · migraciones · transacciones' } },
    { id: 'db', label: 'PostgreSQL', detail: { en: 'Products · orders · inventory · admin', es: 'Productos · pedidos · inventario · admin' } },
  ],
  architectureNotes: {
    en: ['Order summary handed off to WhatsApp (wa.me link)', 'GitHub Pages preview: static build with demo catalog, no API'],
    es: ['Resumen del pedido enviado por WhatsApp (enlace wa.me)', 'Vista previa en GitHub Pages: build estático con catálogo demo, sin API'],
  },
}

/* -------------------------------------------------------------------------- */
/* Project grid, in display order                                              */
/* -------------------------------------------------------------------------- */

export const projects: Project[] = [
  {
    id: 'tr3s-co',
    name: 'TR3S & CO.',
    categories: ['fullstack'],
    kind: { en: 'E-commerce · Next.js + Supabase', es: 'E-commerce · Next.js + Supabase' },
    summary: {
      en: 'A multibrand sneaker and streetwear store with an admin panel, built with the Next.js App Router and Supabase.',
      es: 'Una tienda multimarca de sneakers y streetwear con panel administrativo, construida con Next.js App Router y Supabase.',
    },
    problem: {
      en: 'Sell in-stock products and supplier-ordered products side by side without overselling either.',
      es: 'Vender productos en stock y productos bajo pedido a proveedores sin sobrevender ninguno.',
    },
    challenge: {
      en: 'Stock reservations and order state changes as transactional Postgres functions with Row Level Security, plus signed payment webhooks verified on the server.',
      es: 'Reservas de stock y cambios de estado como funciones transaccionales de Postgres con Row Level Security, y webhooks de pago firmados verificados en el servidor.',
    },
    description: {
      en: 'Storefront with filters in the URL, search, brands, product gallery, wishlist, persistent cart and checkout with shipping zones. Payments through Wompi, Mercado Pago or bank transfer. The /admin panel covers products and variants, inventory movements, orders with separate payment and shipping states, suppliers, campaigns, roles and an audit log.',
      es: 'Tienda con filtros en la URL, búsqueda, marcas, galería de producto, lista de deseos, carrito persistente y checkout con zonas de envío. Pagos con Wompi, Mercado Pago o transferencia. El panel /admin cubre productos y variantes, movimientos de inventario, pedidos con estados de pago y envío separados, proveedores, campañas, roles y auditoría.',
    },
    features: {
      en: ['Server Actions and Supabase (Postgres, Auth, Storage) with RLS', 'Wompi and Mercado Pago webhooks with signature checks', 'SQL tests, including concurrent buyers for the last unit; Vitest and Playwright'],
      es: ['Server Actions y Supabase (Postgres, Auth, Storage) con RLS', 'Webhooks de Wompi y Mercado Pago con verificación de firma', 'Pruebas SQL, incluidas compras simultáneas por la última unidad; Vitest y Playwright'],
    },
    tech: ['Next.js 15', 'React 19', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Three.js', 'Vitest', 'Playwright'],
    repoUrl: `${GH}/TR3S-CO-`,
    demoUrl: 'https://tr3s-co.vercel.app/',
    demoNote: {
      en: 'In development: the live site shows the storefront while the official catalog is being prepared.',
      es: 'En desarrollo: el sitio publicado muestra la tienda mientras se prepara el catálogo oficial.',
    },
    image: 'images/tr3s-co.webp',
    imageAlt: {
      en: 'TR3S & CO. home page: the headline "Tu estilo. Tu esencia. Tu camino." beside three sneakers on glowing red pedestals',
      es: 'Página de inicio de TR3S & CO.: el titular "Tu estilo. Tu esencia. Tu camino." junto a tres sneakers sobre pedestales con luz roja',
    },
    accent: 'violet',
  },
  {
    id: 'arca-food',
    name: 'ARCA FOOD · El Arca',
    categories: ['fullstack'],
    kind: { en: 'Online ordering · React + Express', es: 'Pedidos en línea · React + Express' },
    summary: {
      en: 'Online menu with WhatsApp ordering and an admin panel for El Arca, a fast-food restaurant in Bucaramanga.',
      es: 'Carta en línea con pedidos por WhatsApp y panel administrativo para El Arca, un restaurante de comidas rápidas en Bucaramanga.',
    },
    problem: {
      en: 'Let customers build orders with add-ons online, and give staff one place to manage orders, products and inventory.',
      es: 'Permitir que los clientes armen pedidos con adicionales en línea y dar al personal un solo lugar para gestionar pedidos, productos e inventario.',
    },
    challenge: {
      en: 'A layered Express API (routes, controllers, services, repositories) with parameterized SQL, transactions and role-based access, plus a backend-free showcase build.',
      es: 'Una API en Express por capas (rutas, controladores, servicios, repositorios) con SQL parametrizado, transacciones y acceso por roles, más un build de vitrina sin backend.',
    },
    description: {
      en: 'Customers browse the menu, choose add-ons and send the order over WhatsApp. In /admin, staff see a dashboard, manage order states, products, categories, add-ons, inventory and business settings. Pricing, order-state and schedule rules live in pure, unit-tested domain functions.',
      es: 'Los clientes recorren la carta, eligen adicionales y envían el pedido por WhatsApp. En /admin, el personal ve un dashboard y gestiona estados de pedidos, productos, categorías, adicionales, inventario y configuración. Las reglas de precios, estados y horario viven en funciones de dominio puras con pruebas unitarias.',
    },
    features: {
      en: ['React 19 + Vite + Tailwind front end with a lazy-loaded admin panel', 'Express 5 + PostgreSQL (Supabase) with Zod validation and Supabase Auth roles', 'Vitest unit tests, Supertest integration tests and pgTAP database tests in CI'],
      es: ['Frontend React 19 + Vite + Tailwind con panel cargado bajo demanda', 'Express 5 + PostgreSQL (Supabase) con validación Zod y roles de Supabase Auth', 'Pruebas unitarias con Vitest, de integración con Supertest y de base de datos con pgTAP en CI'],
    },
    tech: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Express 5', 'PostgreSQL', 'Supabase', 'Zod', 'Vitest', 'Supertest'],
    repoUrl: `${GH}/ARCA_FOOD`,
    demoUrl: 'https://sebastianjaimesr.github.io/ARCA_FOOD/',
    demoNote: {
      en: 'Showcase mode: static menu and WhatsApp orders. The demo admin panel stores its data in your browser.',
      es: 'Modo vitrina: carta estática y pedidos por WhatsApp. El panel de demostración guarda sus datos en tu navegador.',
    },
    image: 'images/arca-food.webp',
    imageAlt: {
      en: 'El Arca home page: yellow and white headline "Hamburguesas, hot dogs y mucho más", the restaurant logo and menu categories',
      es: 'Página de inicio de El Arca: titular amarillo y blanco "Hamburguesas, hot dogs y mucho más", el logo del restaurante y las categorías de la carta',
    },
    accent: 'mint',
  },
  {
    id: 'don-repuestos',
    name: 'Don Repuestos Jaimes',
    categories: ['fullstack', 'automation'],
    kind: { en: 'Sales assistant · Express + PostgreSQL', es: 'Asistente de ventas · Express + PostgreSQL' },
    summary: {
      en: 'A rule-based sales assistant that finds compatible Yamaha motorcycle parts, quotes from real inventory and registers orders, with an admin panel.',
      es: 'Un asistente de ventas basado en reglas que encuentra repuestos Yamaha compatibles, cotiza con el inventario real y registra pedidos, con panel administrativo.',
    },
    problem: {
      en: 'Customers ask for parts by bike model and year; every answer about price, stock and compatibility must come from the database, never from a guess.',
      es: 'Los clientes piden repuestos por modelo y año de moto; cada respuesta sobre precio, stock y compatibilidad debe salir de la base de datos, nunca de una suposición.',
    },
    challenge: {
      en: 'A conversational engine that extracts model, year and part from free text without an LLM, with idempotent orders and concurrency control on the last unit.',
      es: 'Un motor conversacional que extrae modelo, año y repuesto de texto libre sin un LLM, con pedidos idempotentes y control de concurrencia sobre la última unidad.',
    },
    description: {
      en: 'Web chat (and WhatsApp/Telegram through n8n workflows) that identifies the motorcycle, clarifies the part, shows price, stock and compatibility, builds a quote and registers the order only after explicit confirmation. The admin panel has roles (admin, seller, read-only) for products, compatibility, inventory log, quotes, orders, human handoff and settings.',
      es: 'Chat web (y WhatsApp/Telegram mediante flujos de n8n) que identifica la moto, aclara el repuesto, muestra precio, stock y compatibilidad, arma la cotización y registra el pedido solo con confirmación explícita. El panel tiene roles (admin, vendedor, consulta) para productos, compatibilidades, bitácora de inventario, cotizaciones, pedidos, atención humana y configuración.',
    },
    features: {
      en: ['Modular Express + TypeScript monolith over PostgreSQL', 'JWT + bcrypt auth, roles checked on the server, HMAC-signed webhooks', '62 unit and integration tests against a real PostgreSQL database'],
      es: ['Monolito modular en Express + TypeScript sobre PostgreSQL', 'Autenticación JWT + bcrypt, roles verificados en el servidor, webhooks firmados con HMAC', '62 pruebas unitarias y de integración contra PostgreSQL real'],
    },
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Express', 'PostgreSQL', 'n8n', 'JWT', 'Vitest', 'Supertest'],
    repoUrl: `${GH}/Don_Respuestos_Jaimes`,
    demoUrl: 'https://sebastianjaimesr.github.io/Don_Respuestos_Jaimes/',
    demoNote: {
      en: 'The API runs on a free hosting plan that sleeps when idle, so the first chat reply can take a moment. Products are fictitious demo data.',
      es: 'La API corre en un plan gratuito que se duerme sin uso, así que la primera respuesta del chat puede tardar. Los productos son datos ficticios de demostración.',
    },
    image: 'images/don-repuestos.webp',
    imageAlt: {
      en: 'Don Repuestos Jaimes home page: the store name in large type beside a 3D render of a brake disc, sprocket, spark plug and oil filter',
      es: 'Página de inicio de Don Repuestos Jaimes: el nombre de la tienda en letra grande junto a un render 3D de disco de freno, piñón, bujía y filtro de aceite',
    },
    accent: 'blue',
  },
  {
    id: 'bunema',
    name: 'BUNEMA TECHNOLOGY',
    categories: ['frontend'],
    kind: { en: 'Storefront · Vanilla JS + Three.js', es: 'Tienda · JS Vanilla + Three.js' },
    summary: {
      en: 'An iPhone storefront concept for Colombia with a 3D product viewer, comparator, persistent cart and WhatsApp or email orders, built without a framework.',
      es: 'Un concepto de tienda de iPhone para Colombia con visor 3D, comparador, carrito persistente y pedidos por WhatsApp o correo, construido sin framework.',
    },
    problem: {
      en: 'Present a large catalog, from iPhone 7 to the latest models, with filters by generation, capacity, condition and price in Colombian pesos.',
      es: 'Presentar un catálogo amplio, del iPhone 7 a los modelos más recientes, con filtros por generación, capacidad, condición y precio en pesos colombianos.',
    },
    challenge: {
      en: 'Phone models built procedurally in Three.js and a scroll-driven exploded view with GSAP, organized in plain ES modules.',
      es: 'Modelos de teléfono construidos por código en Three.js y un despiece controlado por scroll con GSAP, organizados en módulos ES sin framework.',
    },
    description: {
      en: 'Hash-routed store: home, catalog with search and filters, product pages with color, capacity and condition, a comparator for up to three models, cart and order confirmation. Prices, inventory and sales channels are edited in a static admin page that exports the store JSON. A separate concept page presents a fictional phone, the Bunema X1, with a configurator and an 11-part exploded view. BUNEMA is an independent concept, not affiliated with Apple.',
      es: 'Tienda con rutas hash: inicio, catálogo con búsqueda y filtros, fichas con color, capacidad y condición, comparador de hasta tres modelos, carrito y confirmación del pedido. Precios, inventario y canales de venta se editan en una página de administración estática que exporta el JSON de la tienda. Una página aparte presenta un teléfono ficticio, el Bunema X1, con configurador y despiece de 11 piezas. BUNEMA es un concepto independiente, sin relación con Apple.',
    },
    features: {
      en: ['Catalog filters, comparator and persistent cart', '3D viewer and scroll-driven exploded view (Three.js + GSAP)', 'Static admin page for prices, stock and sales channels'],
      es: ['Filtros del catálogo, comparador y carrito persistente', 'Visor 3D y despiece controlado por scroll (Three.js + GSAP)', 'Página de administración estática para precios, stock y canales'],
    },
    tech: ['JavaScript', 'Vite', 'Three.js', 'GSAP', 'HTML', 'CSS'],
    repoUrl: `${GH}/BUNEMA-TECNOLOGY`,
    demoUrl: 'https://sebastianjaimesr.github.io/BUNEMA-TECNOLOGY/',
    demoNote: null,
    image: 'images/bunema.webp',
    imageAlt: {
      en: 'BUNEMA home page: the headline "El futuro está en tus manos" above a 3D phone model on a dark blue background',
      es: 'Página de inicio de BUNEMA: el titular "El futuro está en tus manos" sobre un modelo 3D de teléfono con fondo azul oscuro',
    },
    accent: 'indigo',
  },
  {
    id: 'undergold',
    name: 'Undergold E-commerce',
    categories: ['frontend'],
    kind: { en: 'Web application · Vanilla JS', es: 'Aplicación web · JS Vanilla' },
    summary: {
      en: 'An online store for premium streetwear with a public shop and a private admin panel, built without frameworks.',
      es: 'Una tienda en línea de ropa urbana premium con tienda pública y panel administrativo privado, sin frameworks.',
    },
    problem: {
      en: 'Let customers browse, search and buy, and let administrators manage the catalog and orders.',
      es: 'Permitir que los clientes exploren, busquen y compren, y que los administradores gestionen el catálogo y los pedidos.',
    },
    challenge: {
      en: 'Reusable Web Components and state persisted in the browser, with no framework or backend.',
      es: 'Web Components reutilizables y estado guardado en el navegador, sin framework ni backend.',
    },
    description: {
      en: 'A complete e-commerce system built with HTML5, CSS3 and vanilla JavaScript, without frameworks. Customers browse, search and buy; administrators manage categories, products and orders from a protected panel. Data persists in the browser.',
      es: 'Un sistema de comercio electrónico completo construido con HTML5, CSS3 y JavaScript vanilla, sin frameworks. Los clientes exploran, buscan y compran; los administradores gestionan categorías, productos y pedidos desde un panel protegido. Los datos persisten en el navegador.',
    },
    features: {
      en: ['Catalog with category filters and text search', 'Cart, validated checkout form and order confirmation', 'Admin panel: login, metrics, CRUD for categories, products and orders'],
      es: ['Catálogo con filtros por categoría y búsqueda por texto', 'Carrito, formulario de compra validado y confirmación del pedido', 'Panel admin: login, métricas y CRUD de categorías, productos y pedidos'],
    },
    tech: ['JavaScript', 'Web Components', 'HTML', 'CSS'],
    repoUrl: `${GH}/E-COMMERCE_Proyecto`,
    demoUrl: null,
    demoNote: null,
    image: 'images/undergold.webp',
    imageAlt: {
      en: 'Undergold home page: the headline "Moda streetwear premium con presencia moderna" above featured categories',
      es: 'Página de inicio de Undergold: el titular "Moda streetwear premium con presencia moderna" sobre las categorías destacadas',
    },
    accent: 'violet',
  },
  {
    id: 'agendabot',
    name: 'AgendaBot Services',
    categories: ['automation'],
    kind: { en: 'Automation · n8n', es: 'Automatización · n8n' },
    summary: {
      en: 'A Telegram chatbot that manages appointments, tasks, reminders, habits and productivity reports.',
      es: 'Un chatbot de Telegram que gestiona citas, tareas, recordatorios, hábitos y reportes de productividad.',
    },
    problem: {
      en: 'A personal organization assistant that works from a chat app without paid platforms.',
      es: 'Un asistente de organización personal que funcione desde una app de chat sin plataformas de pago.',
    },
    challenge: {
      en: 'Designing conversational workflows in n8n with Google Sheets as the data store.',
      es: 'Diseñar flujos conversacionales en n8n con Google Sheets como almacenamiento de datos.',
    },
    description: {
      en: 'An academic project built with n8n Community Edition, a Telegram bot and Google Sheets as the database. The goal was a conversational assistant for personal organization that runs without paid platforms.',
      es: 'Un proyecto académico construido con n8n Community Edition, un bot de Telegram y Google Sheets como base de datos. El objetivo fue un asistente conversacional para la organización personal que funcione sin plataformas de pago.',
    },
    features: {
      en: ['Create, reschedule and cancel appointments', 'Tasks, lists and habit tracking', 'Automatic reminders and productivity reports'],
      es: ['Crear, reprogramar y cancelar citas', 'Tareas, listas y seguimiento de hábitos', 'Recordatorios automáticos y reportes de productividad'],
    },
    tech: ['n8n', 'Telegram', 'Google Sheets', 'JavaScript'],
    repoUrl: `${GH}/N8N_Proyecto`,
    demoUrl: null,
    demoNote: null,
    image: 'images/agendabot.webp',
    imageAlt: {
      en: 'AgendaBot workflow in n8n: a Telegram trigger routing messages to Google Sheets nodes',
      es: 'Flujo de AgendaBot en n8n: un disparador de Telegram que enruta mensajes hacia nodos de Google Sheets',
    },
    accent: 'mint',
  },
  {
    id: 'escape-bucaramanga',
    name: 'Escape Bucaramanga 2',
    categories: ['games'],
    kind: { en: 'Video game · Godot 4 + GDScript', es: 'Videojuego · Godot 4 + GDScript' },
    summary: {
      en: 'A third-person 3D escape-room adventure set in a city block inspired by Bucaramanga, playable in the browser.',
      es: 'Una aventura 3D en tercera persona tipo escape room, en una manzana inspirada en Bucaramanga, jugable en el navegador.',
    },
    problem: {
      en: 'Rebuild my 2D platformer as a 3D game with puzzles, police AI and controls for keyboard, gamepad and touch.',
      es: 'Reconstruir mi juego de plataformas 2D como un juego 3D con acertijos, IA de policía y controles de teclado, mando y pantalla táctil.',
    },
    challenge: {
      en: 'Police AI that patrols, sees, hears and searches, plus inventory, tiered hints and save system, covered by 54 headless tests.',
      es: 'IA de policía que patrulla, ve, oye y busca, más inventario, pistas por niveles y guardado, cubiertos por 54 pruebas headless.',
    },
    description: {
      en: 'Version 1 (October 2026) was a 2D night-time platformer with seven levels. Version 2 moved to 3D: a prototype on November 3, graphics and police on November 4, and the escape-room redesign (v0.4) on November 5, with seven objectives, three puzzles, an inventory, tiered hints, explorer and 15-minute time-trial modes, synthesized audio and touch controls. The full city is still planned; v0.4 runs on a test block.',
      es: 'La versión 1 (octubre de 2026) era un juego de plataformas 2D nocturno con siete niveles. La versión 2 pasó a 3D: prototipo el 3 de noviembre, gráficos y policía el 4 y el rediseño como escape room (v0.4) el 5, con siete objetivos, tres acertijos, inventario, pistas por niveles, modos Explorador y Contrarreloj de 15 minutos, audio sintetizado y controles táctiles. La ciudad completa sigue en el plan; la v0.4 corre en una manzana de prueba.',
    },
    features: {
      en: ['From a 2D platformer (v1) to a 3D escape room (v0.4)', 'Keyboard and mouse, gamepad and touch controls', 'Web export on GitHub Pages and 54 automated tests'],
      es: ['De plataformas 2D (v1) a escape room 3D (v0.4)', 'Teclado y ratón, mando y controles táctiles', 'Exportación web en GitHub Pages y 54 pruebas automáticas'],
    },
    tech: ['Godot 4', 'GDScript'],
    repoUrl: `${GH}/Escape_Bucaramanga_2`,
    demoUrl: 'https://sebastianjaimesr.github.io/Escape_Bucaramanga_2/',
    demoNote: {
      en: 'Version 0.4, in progress. Best played on a desktop browser with WebGL 2.',
      es: 'Versión 0.4, en progreso. Se juega mejor en un navegador de escritorio con WebGL 2.',
    },
    image: 'images/escape-bucaramanga.webp',
    imageAlt: {
      en: 'Escape Bucaramanga 2 gameplay: the player character in a 3D city plaza with the objectives list, a "new evidence" card and a minimap',
      es: 'Partida de Escape Bucaramanga 2: el personaje en una plaza 3D con la lista de objetivos, una tarjeta de "prueba nueva" y un minimapa',
    },
    accent: 'indigo',
  },
  {
    id: 'real-estate-db',
    name: 'Real Estate Management Database',
    categories: ['databases'],
    kind: { en: 'Relational database · MySQL', es: 'Base de datos relacional · MySQL' },
    summary: {
      en: 'A MySQL database for a real estate agency: properties, clients, agents, sale and rental contracts, and payments.',
      es: 'Una base de datos MySQL para una agencia inmobiliaria: inmuebles, clientes, agentes, contratos de venta y arriendo, y pagos.',
    },
    problem: {
      en: 'Model the portfolio, contracts and finances of an agency with consistent rules and auditing.',
      es: 'Modelar el portafolio, los contratos y las finanzas de una agencia con reglas consistentes y auditoría.',
    },
    challenge: {
      en: 'Moving business rules into the database: triggers, functions, stored procedures, roles and scheduled events.',
      es: 'Llevar las reglas de negocio a la base de datos: triggers, funciones, procedimientos, roles y eventos programados.',
    },
    description: {
      en: 'A relational database prototype for a city real estate agency. It covers four business areas: the property portfolio, the commercial side (clients, agents and contracts), finances (rent installments, payments, late fees and commissions) and data governance (automatic auditing, least-privilege roles and scheduled reports).',
      es: 'Un prototipo de base de datos relacional para una agencia inmobiliaria de ciudad. Cubre cuatro áreas de negocio: el portafolio de inmuebles, el área comercial (clientes, agentes y contratos), las finanzas (cuotas de arriendo, pagos, mora y comisiones) y el gobierno de datos (auditoría automática, roles con privilegios mínimos y reportes programados).',
    },
    features: {
      en: ['Entity-relationship model with normalization decisions', 'Custom functions, triggers and change auditing', 'Views, stored procedures, roles and scheduled events'],
      es: ['Modelo entidad-relación con decisiones de normalización', 'Funciones personalizadas, triggers y auditoría de cambios', 'Vistas, procedimientos, roles y eventos programados'],
    },
    tech: ['MySQL', 'SQL', 'Relational design'],
    repoUrl: `${GH}/SQL_Proyecto`,
    demoUrl: null,
    demoNote: null,
    image: 'images/real-estate-db.webp',
    imageAlt: {
      en: 'Entity-relationship diagram of the real estate database: properties, contracts, clients, agents and payments',
      es: 'Diagrama entidad-relación de la base de datos inmobiliaria: inmuebles, contratos, clientes, agentes y pagos',
    },
    accent: 'blue',
  },
  {
    id: 'space-rides',
    name: 'Space Rides',
    categories: ['frontend'],
    kind: { en: 'Interface concept · HTML & CSS', es: 'Concepto de interfaz · HTML y CSS' },
    summary: {
      en: 'UberX × SpaceX: a mobile app prototype for booking trips to space, set in 2053.',
      es: 'UberX × SpaceX: un prototipo de app móvil para reservar viajes al espacio, ambientado en 2053.',
    },
    problem: {
      en: 'Design a complete booking flow, from splash screen to receipt, for a futuristic ride-hailing app.',
      es: 'Diseñar un flujo de reserva completo, de la bienvenida al recibo, para una app de transporte futurista.',
    },
    challenge: {
      en: 'Advanced CSS without frameworks: CSS-only animations, glassmorphism, expandable bottom sheets and BEM components.',
      es: 'CSS avanzado sin frameworks: animaciones solo con CSS, glassmorphism, bottom sheets expandibles y componentes BEM.',
    },
    description: {
      en: 'A futuristic ride-hailing interface taken to space. It walks through the full flow, from the splash screen to the payment receipt, to practice advanced CSS layout: CSS-only animations, glassmorphism, expandable bottom sheets and BEM components.',
      es: 'Una interfaz futurista de transporte llevada al espacio. Recorre el flujo completo, desde la pantalla de bienvenida hasta el recibo de pago, para practicar maquetación CSS avanzada: animaciones solo con CSS, glassmorphism, bottom sheets expandibles y componentes con BEM.',
    },
    features: {
      en: ['Splash, home, travel map, booking, payment and receipt screens', 'CSS-only animations and glassmorphism', 'Semantic, responsive layout'],
      es: ['Pantallas de bienvenida, inicio, mapa, reserva, pago y recibo', 'Animaciones solo con CSS y glassmorphism', 'Maquetación semántica y responsive'],
    },
    tech: ['HTML', 'CSS'],
    repoUrl: `${GH}/HTML_CSS_Proyecto`,
    demoUrl: 'https://sebastianjaimesr.github.io/HTML_CSS_Proyecto/',
    demoNote: null,
    image: 'images/space-rides.webp',
    imageAlt: {
      en: 'Three Space Rides mobile screens: space travel map, home dashboard and booking summary',
      es: 'Tres pantallas móviles de Space Rides: mapa de viaje espacial, inicio y resumen de la reserva',
    },
    accent: 'indigo',
  },
  {
    id: 'proyecto-java',
    name: 'Little Horizons School ERP',
    categories: ['other', 'databases'],
    kind: { en: 'Console application · Java OOP', es: 'Aplicación de consola · POO en Java' },
    summary: {
      en: 'A Java 17 console ERP for a school: academics, teachers, clubs, finance with PDF invoices, resources and 14 reports, on MySQL.',
      es: 'Un ERP de consola en Java 17 para un colegio: académico, profesores, clubes, finanzas con facturas PDF, recursos y 14 reportes, sobre MySQL.',
    },
    problem: {
      en: 'Bring a school’s academic, extracurricular, financial and resource records into one system with consistent business rules.',
      es: 'Reunir en un solo sistema la información académica, extracurricular, financiera y de recursos de un colegio, con reglas de negocio consistentes.',
    },
    challenge: {
      en: 'Applying OOP in a layered design: MVC, DAO interfaces with JDBC implementations, abstract base classes, an exception hierarchy and the Strategy pattern.',
      es: 'Aplicar POO en un diseño por capas: MVC, interfaces DAO con implementaciones JDBC, clases base abstractas, una jerarquía de excepciones y el patrón Strategy.',
    },
    description: {
      en: 'Seven modules plus a settings menu over the erp_little_horizons schema. Business rules live in the service layer; every query uses PreparedStatement, and operations that touch several tables run in transactions with rollback. Concrete JDBC classes are only referenced in one application factory.',
      es: 'Siete módulos y un menú de configuración sobre el esquema erp_little_horizons. Las reglas de negocio están en la capa de servicios; todas las consultas usan PreparedStatement y las operaciones sobre varias tablas corren en transacciones con rollback. Las clases JDBC concretas solo se referencian en una fábrica de la aplicación.',
    },
    features: {
      en: ['MVC with DAO and Service layers; interfaces and abstract classes', 'Custom exception hierarchy and Strategy pattern for averages', 'JUnit 5 tests, PDF invoices (OpenPDF) and QR codes (ZXing)'],
      es: ['MVC con capas DAO y Service; interfaces y clases abstractas', 'Jerarquía de excepciones propia y patrón Strategy para promedios', 'Pruebas con JUnit 5, facturas PDF (OpenPDF) y códigos QR (ZXing)'],
    },
    tech: ['Java 17', 'MySQL', 'JDBC', 'Maven', 'JUnit 5'],
    repoUrl: `${GH}/Proyecto_Java`,
    demoUrl: null,
    demoNote: null,
    // TODO(owner): add a real screenshot of the console menu (e.g. images/proyecto-java.webp). Until then a generated cover is shown.
    image: null,
    imageAlt: {
      en: 'Generated cover artwork for the Little Horizons School ERP',
      es: 'Portada generada para el ERP del colegio Little Horizons',
    },
    accent: 'violet',
  },
  {
    id: 'tool-lending',
    name: 'Community Tool Lending',
    categories: ['other'],
    kind: { en: 'Console application · Python', es: 'Aplicación de consola · Python' },
    summary: {
      en: 'A Python system to manage community tool loans, with roles, authentication and event logs.',
      es: 'Un sistema en Python para gestionar préstamos de herramientas comunitarias, con roles, autenticación y registro de eventos.',
    },
    problem: {
      en: 'Track tools, users and loans for a community, with approval by an administrator.',
      es: 'Llevar el control de herramientas, usuarios y préstamos de una comunidad, con aprobación de un administrador.',
    },
    challenge: {
      en: 'Structuring a modular Python program with roles, validation and JSON persistence.',
      es: 'Estructurar un programa modular en Python con roles, validación y persistencia en JSON.',
    },
    description: {
      en: 'A modular Python application that records tools, users and loans in JSON files. Users request tools, administrators approve loans and returns, and every important event is written to a log.',
      es: 'Una aplicación modular en Python que registra herramientas, usuarios y préstamos en archivos JSON. Los usuarios solicitan herramientas, los administradores aprueban préstamos y devoluciones, y cada evento importante queda en un log.',
    },
    features: {
      en: ['Login with user and administrator roles', 'CRUD for users and tools, loan requests and returns', 'Event logging, field validation and reports'],
      es: ['Inicio de sesión con roles de usuario y administrador', 'CRUD de usuarios y herramientas, solicitudes y devoluciones', 'Registro de eventos, validación de campos y reportes'],
    },
    tech: ['Python', 'JSON'],
    repoUrl: `${GH}/PYTHON_Proyecto`,
    demoUrl: null,
    demoNote: null,
    image: 'images/tool-lending.webp',
    imageAlt: {
      en: 'Terminal session of the Community Tool Lending app: administrator login, main menu and tool inventory',
      es: 'Sesión de terminal de la app de préstamo de herramientas: inicio de sesión de administrador, menú principal e inventario',
    },
    accent: 'blue',
  },
]

/** Projects visible under a filter. 'all' returns every project in display order. */
export function filterProjects(list: Project[], filter: ProjectCategory | 'all'): Project[] {
  return filter === 'all' ? list : list.filter((project) => project.categories.includes(filter))
}
