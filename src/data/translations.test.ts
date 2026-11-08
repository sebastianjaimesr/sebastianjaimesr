import { describe, expect, it } from 'vitest'
import { dictionaries } from './translations'

type Tree = Record<string, unknown>

/** Flattens a dictionary into "path → value" pairs (functions are called with a sample argument). */
function flatten(node: unknown, path = ''): [string, string][] {
  if (typeof node === 'string') return [[path, node]]
  if (typeof node === 'function') return [[path, String((node as (a: never) => string)(2 as never))]]
  if (Array.isArray(node)) return node.flatMap((item, i) => flatten(item, `${path}[${i}]`))
  return Object.entries(node as Tree).flatMap(([key, value]) => flatten(value, path ? `${path}.${key}` : key))
}

describe('translations', () => {
  const en = flatten(dictionaries.en)
  const es = flatten(dictionaries.es)

  it('has the same keys in English and Spanish', () => {
    expect(es.map(([key]) => key)).toEqual(en.map(([key]) => key))
  })

  it('has no empty strings', () => {
    for (const [key, value] of [...en, ...es]) expect(value.trim(), key).not.toBe('')
  })

  it('uses the new hero title and keeps "in training" only in the About section', () => {
    expect(dictionaries.en.hero.title).toBe('Junior Full-Stack Developer')
    const mentions = en.filter(([, value]) => /in training/i.test(value)).map(([key]) => key)
    expect(mentions).toHaveLength(1)
    expect(mentions[0]).toMatch(/^about\./)
  })

  it('states the availability line requested for recruiters', () => {
    expect(dictionaries.en.availability.remote).toBe('Open to Remote')
    expect(dictionaries.en.availability.overlap).toBe('Available for US/EU Overlap')
  })
})
