import type { Localized } from '../i18n/types'

/**
 * Projects shown in the "Selected Projects" section.
 *
 * Status values:
 *  - 'verified'      → repository confirmed. Requires `repoUrl`.
 *  - 'in-progress'   → work in progress, repository confirmed or private.
 *  - 'unverified'    → candidate project that still needs confirmation by the owner.
 *                      The card says so openly and links to the GitHub profile
 *                      instead of an invented repository URL.
 *
 * Never fill `repoUrl` or `demoUrl` with a guessed URL. Leave them null until
 * the real destination exists.
 */
export type ProjectStatus = 'verified' | 'in-progress' | 'unverified'

const GH = 'https://github.com/sebastianjaimesr'

export interface Project {
  id: string
  index: string
  name: string
  kind: Localized
  summary: Localized
  description: Localized
  features: Localized<string[]>
  tech: string[]
  status: ProjectStatus
  repoUrl: string | null
  demoUrl: string | null
  /** Optional image placed in /public/images, referenced as 'images/<file>'. Leave null to use the generated cover. */
  image: string | null
  /** Accent used by the generated cover artwork. */
  accent: 'blue' | 'violet' | 'mint' | 'indigo'
}

export const projects: Project[] = [
  {
    id: 'real-estate-db',
    index: '01',
    name: 'Real Estate Management Database',
    kind: { en: 'Relational database · MySQL', es: 'Base de datos relacional · MySQL' },
    summary: {
      en: 'A MySQL database for a real estate agency: properties, clients, agents, sale and rental contracts, and payments.',
      es: 'Una base de datos MySQL para una agencia inmobiliaria: inmuebles, clientes, agentes, contratos de venta y arriendo, y pagos.',
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
    status: 'verified',
    repoUrl: `${GH}/SQL_Proyecto`,
    demoUrl: null,
    image: null,
    accent: 'blue',
  },
  {
    id: 'undergold',
    index: '02',
    name: 'Undergold E-commerce',
    kind: { en: 'Web application · Vanilla JS', es: 'Aplicación web · JS Vanilla' },
    summary: {
      en: 'An online store for premium streetwear with a public shop and a private admin panel.',
      es: 'Una tienda en línea de ropa urbana premium con tienda pública y panel administrativo privado.',
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
    status: 'verified',
    repoUrl: `${GH}/E-COMMERCE_Proyecto`,
    demoUrl: null,
    image: null,
    accent: 'violet',
  },
  {
    id: 'agendabot',
    index: '03',
    name: 'AgendaBot Services',
    kind: { en: 'Automation · n8n', es: 'Automatización · n8n' },
    summary: {
      en: 'A Telegram chatbot that manages appointments, tasks, reminders, habits and productivity reports.',
      es: 'Un chatbot de Telegram que gestiona citas, tareas, recordatorios, hábitos y reportes de productividad.',
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
    status: 'verified',
    repoUrl: `${GH}/N8N_Proyecto`,
    demoUrl: null,
    image: null,
    accent: 'mint',
  },
  {
    id: 'space-rides',
    index: '04',
    name: 'Space Rides',
    kind: { en: 'Interface concept · HTML & CSS', es: 'Concepto de interfaz · HTML y CSS' },
    summary: {
      en: 'UberX × SpaceX: a mobile app prototype for booking trips to space, set in 2053.',
      es: 'UberX × SpaceX: un prototipo de app móvil para reservar viajes al espacio, ambientado en 2053.',
    },
    description: {
      en: 'A futuristic ride-hailing interface taken to space. It walks through the full flow, from the splash screen to the payment receipt, to practice advanced CSS layout: CSS-only animations, glassmorphism, expandable bottom sheets and BEM components.',
      es: 'Una interfaz futurista de transporte llevada al espacio. Recorre el flujo completo, desde la pantalla de bienvenida hasta el recibo de pago, para practicar maquetación CSS avanzada: animaciones solo con CSS, glassmorphism, bottom sheets expandibles y componentes con BEM.',
    },
    features: {
      en: ['Splash, home, travel map, booking, payment and receipt screens', 'CSS-only animations and glassmorphism', 'Semantic, responsive layout'],
      es: ['Pantallas de bienvenida, inicio, mapa, reserva, pago y recibo', 'Animaciones solo con CSS y glassmorphism', 'Maquetación semántica y responsive'],
    },
    tech: ['HTML', 'CSS', 'JavaScript'],
    status: 'verified',
    repoUrl: `${GH}/HTML_CSS_Proyecto`,
    demoUrl: null,
    image: null,
    accent: 'indigo',
  },
  {
    id: 'tool-lending',
    index: '05',
    name: 'Community Tool Lending',
    kind: { en: 'Console application · Python', es: 'Aplicación de consola · Python' },
    summary: {
      en: 'A Python system to manage community tool loans, with roles, authentication and event logs.',
      es: 'Un sistema en Python para gestionar préstamos de herramientas comunitarias, con roles, autenticación y registro de eventos.',
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
    status: 'verified',
    repoUrl: `${GH}/PYTHON_Proyecto`,
    demoUrl: null,
    image: null,
    accent: 'blue',
  },
]
