/**
 * Sección "Habilidades" (#skills): tarjetas de tecnologías con filtro por categoría.
 */
import { useMemo, useState } from 'react'
import { showUnconfirmedSkills, skillCategories, skills, type SkillCategory } from '../data/skills'
import { useLanguage } from '../i18n/LanguageContext'
import { resetTilt, trackSpotlight } from '../lib/spotlight'
import { SectionHeading } from './SectionHeading'

// Filtro activo: una categoría o 'all' (todas).
type Filter = SkillCategory | 'all'

/** Componente de la sección de habilidades. */
export function Skills() {
  const { lang, t } = useLanguage()
  const s = t.skills
  const [filter, setFilter] = useState<Filter>('all')

  // Habilidades que se pueden mostrar (se calcula una sola vez).
  const visible = useMemo(() => skills.filter((skill) => showUnconfirmedSkills || skill.confirmed), [])
  // Aplica el filtro elegido por el usuario.
  const filtered = filter === 'all' ? visible : visible.filter((skill) => skill.category === filter)
  // Solo aparecen chips de categorías que tengan al menos una habilidad.
  const categories = skillCategories.filter((c) => visible.some((skill) => skill.category === c))

  return (
    <section id="skills" className="section skills" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading id="skills-title" index={s.index} kicker={s.kicker} title={s.title} intro={s.intro} />

        <div className="skills__toolbar" data-reveal>
          <div className="chip-group" role="group" aria-label={s.filterLabel}>
            {(['all', ...categories] as Filter[]).map((key) => (
              <button
                key={key}
                type="button"
                className="chip"
                aria-pressed={filter === key}
                aria-controls="skills-grid"
                onClick={() => setFilter(key)}
              >
                {key === 'all' ? s.all : s.categories[key]}
              </button>
            ))}
          </div>
          <p className="skills__count mono" aria-live="polite">
            {s.count(filtered.length)}
          </p>
        </div>

        <ul id="skills-grid" className="skills__grid" data-reveal>
          {/* La key incluye el filtro: al cambiarlo, React recrea las tarjetas y su animación de entrada se repite. */}
          {filtered.map((skill, i) => (
            <li
              key={`${filter}-${skill.name}`}
              className="skill card spotlight tilt"
              style={{ ['--i' as string]: i }}
              onPointerMove={trackSpotlight}
              onPointerLeave={resetTilt}
            >
              <span className={`skill__glyph mono skill__glyph--${skill.category}`} aria-hidden="true">
                {skill.glyph}
              </span>
              <div className="skill__body">
                <h3 className="skill__name">{skill.name}</h3>
                <p className="skill__category mono">{s.categories[skill.category]}</p>
                <p className="skill__note">{skill.note[lang]}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
