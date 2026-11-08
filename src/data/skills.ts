import type { Localized } from '../i18n/types'

/**
 * Technologies shown in the "Toolkit" section. No percentages or proficiency levels on
 * purpose. Each entry names where it is used, and every technology appears in the code or
 * manifests of at least one public repository (checked on 2026-11-07).
 * Not listed because no repository uses them yet: SQLite.
 */
export type SkillCategory = 'frontend' | 'backend' | 'databases' | 'testing' | 'tools'

export interface Skill {
  name: string
  category: SkillCategory
  /** Projects where it is used; shown as a small note under the name. */
  usedIn: Localized
}

export const skillCategories: SkillCategory[] = ['frontend', 'backend', 'databases', 'testing', 'tools']

const both = (text: string): Localized => ({ en: text, es: text })

export const skills: Skill[] = [
  // Front end
  { name: 'HTML5', category: 'frontend', usedIn: { en: 'Every web project', es: 'Todos los proyectos web' } },
  { name: 'CSS3', category: 'frontend', usedIn: { en: 'Space Rides, Undergold, this site', es: 'Space Rides, Undergold, este sitio' } },
  { name: 'JavaScript', category: 'frontend', usedIn: both('BUNEMA, Undergold') },
  { name: 'TypeScript', category: 'frontend', usedIn: { en: 'Emirate Scents, TR3S & CO., ARCA FOOD, this site', es: 'Emirate Scents, TR3S & CO., ARCA FOOD, este sitio' } },
  { name: 'React', category: 'frontend', usedIn: both('Emirate Scents, TR3S & CO., ARCA FOOD, Don Repuestos') },
  { name: 'Next.js', category: 'frontend', usedIn: both('TR3S & CO.') },
  { name: 'Tailwind CSS', category: 'frontend', usedIn: both('Emirate Scents, ARCA FOOD, TR3S & CO., Don Repuestos') },
  { name: 'Three.js', category: 'frontend', usedIn: { en: 'BUNEMA, Emirate Scents, this site', es: 'BUNEMA, Emirate Scents, este sitio' } },

  // Back end
  { name: 'Node.js', category: 'backend', usedIn: both('Emirate Scents, ARCA FOOD, Don Repuestos') },
  { name: 'Express', category: 'backend', usedIn: both('Emirate Scents, ARCA FOOD, Don Repuestos') },
  { name: 'REST APIs', category: 'backend', usedIn: both('Emirate Scents, ARCA FOOD, Don Repuestos') },
  { name: 'Zod', category: 'backend', usedIn: { en: 'Request validation in three APIs', es: 'Validación de solicitudes en tres APIs' } },
  { name: 'Java', category: 'backend', usedIn: both('Little Horizons School ERP') },
  { name: 'Python', category: 'backend', usedIn: both('Community Tool Lending') },

  // Databases
  { name: 'PostgreSQL', category: 'databases', usedIn: both('Emirate Scents, TR3S & CO., ARCA FOOD, Don Repuestos') },
  { name: 'Prisma', category: 'databases', usedIn: both('Emirate Scents') },
  { name: 'Supabase', category: 'databases', usedIn: both('TR3S & CO., ARCA FOOD') },
  { name: 'MySQL', category: 'databases', usedIn: both('Real Estate DB, Little Horizons School ERP') },

  // Testing
  { name: 'Vitest', category: 'testing', usedIn: both('Emirate Scents, TR3S & CO., ARCA FOOD, Don Repuestos') },
  { name: 'Supertest', category: 'testing', usedIn: both('Emirate Scents, ARCA FOOD, Don Repuestos') },
  { name: 'Playwright', category: 'testing', usedIn: both('Emirate Scents, TR3S & CO.') },
  { name: 'JUnit 5', category: 'testing', usedIn: both('Little Horizons School ERP') },

  // Tools and platforms
  { name: 'Git', category: 'tools', usedIn: { en: 'All projects', es: 'Todos los proyectos' } },
  { name: 'GitHub', category: 'tools', usedIn: { en: 'Repositories, Pages and Actions (CI)', es: 'Repositorios, Pages y Actions (CI)' } },
  { name: 'Vite', category: 'tools', usedIn: { en: 'Five front ends, including this site', es: 'Cinco frontends, incluido este sitio' } },
  { name: 'n8n', category: 'tools', usedIn: both('AgendaBot, Don Repuestos') },
  { name: 'Godot', category: 'tools', usedIn: both('Escape Bucaramanga') },
  { name: 'GDScript', category: 'tools', usedIn: both('Escape Bucaramanga') },
]
