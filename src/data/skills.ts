import type { Localized } from '../i18n/types'

/**
 * Technologies shown in the "Skills" section. No proficiency percentages or
 * levels on purpose: each entry describes how the technology is used.
 *
 * `confirmed: true` marks a technology the owner still has to confirm.
 * Set `showUnconfirmedSkills` to false to hide those entries from the site.
 */
export const showUnconfirmedSkills = true

export type SkillCategory = 'programming' | 'web' | 'databases' | 'automation' | 'tools'

export interface Skill {
  name: string
  /** Two or three characters shown in the card glyph. */
  glyph: string
  category: SkillCategory
  note: Localized
  confirmed: boolean
}

export const skillCategories: SkillCategory[] = ['programming', 'web', 'databases', 'automation', 'tools']

export const skills: Skill[] = [
  {
    name: 'JavaScript',
    glyph: 'JS',
    category: 'programming',
    note: { en: 'Interactivity, DOM and application logic', es: 'Interactividad, DOM y lógica de aplicaciones' },
    confirmed: true,
  },
  {
    name: 'Python',
    glyph: 'Py',
    category: 'programming',
    note: { en: 'Scripting and problem solving', es: 'Scripts y resolución de problemas' },
    confirmed: true,
  },
  {
    name: 'Java',
    glyph: 'Jv',
    category: 'programming',
    note: { en: 'Currently learning object-oriented programming', es: 'Aprendiendo programación orientada a objetos' },
    confirmed: true,
  },
  {
    name: 'HTML',
    glyph: '</>',
    category: 'web',
    note: { en: 'Semantic, accessible page structure', es: 'Estructura de páginas semántica y accesible' },
    confirmed: true,
  },
  {
    name: 'CSS',
    glyph: '{ }',
    category: 'web',
    note: { en: 'Layout, visual identity and animation', es: 'Maquetación, identidad visual y animación' },
    confirmed: true,
  },
  {
    name: 'Responsive design',
    glyph: '⇆',
    category: 'web',
    note: { en: 'Interfaces that adapt from phone to desktop', es: 'Interfaces que se adaptan del móvil al escritorio' },
    confirmed: true,
  },
  {
    name: 'SQL',
    glyph: 'SQL',
    category: 'databases',
    note: { en: 'Queries, joins and data rules', es: 'Consultas, joins y reglas de datos' },
    confirmed: true,
  },
  {
    name: 'MySQL',
    glyph: 'My',
    category: 'databases',
    note: { en: 'Relational databases in practice', es: 'Bases de datos relacionales en la práctica' },
    confirmed: true,
  },
  {
    name: 'Database design',
    glyph: 'ER',
    category: 'databases',
    note: { en: 'Entities, relationships and normalization', es: 'Entidades, relaciones y normalización' },
    confirmed: true,
  },
  {
    name: 'n8n',
    glyph: 'n8n',
    category: 'automation',
    note: { en: 'Visual workflows that connect services', es: 'Flujos visuales que conectan servicios' },
    confirmed: true,
  },
  {
    name: 'Workflow automation',
    glyph: '↻',
    category: 'automation',
    note: { en: 'Removing repetitive manual steps', es: 'Eliminar pasos manuales repetitivos' },
    confirmed: true,
  },
  {
    name: 'Git',
    glyph: 'Git',
    category: 'tools',
    note: { en: 'Version control and clean history', es: 'Control de versiones e historial ordenado' },
    confirmed: true,
  },
  {
    name: 'GitHub',
    glyph: 'GH',
    category: 'tools',
    note: { en: 'Repositories and collaboration', es: 'Repositorios y colaboración' },
    confirmed: true,
  },
]
