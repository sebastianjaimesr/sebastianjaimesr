import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { featuredProject, filterProjects, projectCategories, projects } from './projects'

const publicFile = (path: string) => resolve(import.meta.dirname, '../../public', path)
const langs = ['en', 'es'] as const

describe('project data', () => {
  it('keeps the existing projects and adds the new ones, without duplicates', () => {
    const ids = projects.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const id of ['real-estate-db', 'undergold', 'agendabot', 'space-rides', 'tool-lending', 'tr3s-co', 'arca-food', 'don-repuestos', 'bunema', 'escape-bucaramanga', 'proyecto-java']) {
      expect(ids).toContain(id)
    }
    expect(ids).not.toContain(featuredProject.id)
  })

  it('links only to the owner’s GitHub repositories and https demos', () => {
    for (const p of [...projects, featuredProject]) {
      expect(p.repoUrl).toMatch(/^https:\/\/github\.com\/sebastianjaimesr\/[\w.-]+$/)
      if (p.demoUrl) expect(p.demoUrl).toMatch(/^https:\/\//)
    }
  })

  it('has every visible string in English and Spanish', () => {
    for (const p of projects) {
      for (const field of [p.kind, p.summary, p.problem, p.challenge, p.description, p.imageAlt, ...(p.demoNote ? [p.demoNote] : [])]) {
        for (const lang of langs) expect(field[lang].trim(), `${p.id} ${lang}`).not.toBe('')
      }
      expect(p.features.en.length).toBe(p.features.es.length)
    }
  })

  it('references images that exist in /public', () => {
    for (const p of projects) if (p.image) expect(existsSync(publicFile(p.image)), p.image).toBe(true)
    expect(existsSync(publicFile(featuredProject.image))).toBe(true)
  })

  it('lists Space Rides as HTML and CSS only, with its live demo', () => {
    const spaceRides = projects.find((p) => p.id === 'space-rides')!
    expect(spaceRides.tech).toEqual(['HTML', 'CSS'])
    expect(spaceRides.demoUrl).toBe('https://sebastianjaimesr.github.io/HTML_CSS_Proyecto/')
  })

  it('describes the featured project with the verified stack and a four-step architecture', () => {
    for (const tech of ['Express 5', 'Prisma 7', 'PostgreSQL', 'Vitest', 'Supertest', 'Playwright']) expect(featuredProject.tech).toContain(tech)
    expect(featuredProject.architectureFlow.map((n) => n.label)).toEqual(['React SPA', 'Express API', 'Prisma', 'PostgreSQL'])
    for (const lang of langs) expect(featuredProject.caseStudy.challenges[lang].length).toBeGreaterThan(0)
  })
})

describe('filterProjects', () => {
  it('returns every project for "all", in display order', () => {
    expect(filterProjects(projects, 'all')).toEqual(projects)
  })

  it('returns only projects tagged with the category, keeping order', () => {
    for (const category of projectCategories) {
      const result = filterProjects(projects, category)
      expect(result.every((p) => p.categories.includes(category))).toBe(true)
      expect(result).toEqual(projects.filter((p) => result.includes(p)))
    }
  })

  it('has at least one project in every filter shown on the site', () => {
    for (const category of projectCategories) expect(filterProjects(projects, category).length, category).toBeGreaterThan(0)
  })

  it('puts the games and automation projects where expected', () => {
    expect(filterProjects(projects, 'games').map((p) => p.id)).toEqual(['escape-bucaramanga'])
    expect(filterProjects(projects, 'automation').map((p) => p.id)).toEqual(['don-repuestos', 'agendabot'])
  })
})
