import { Boxes, Database, FlaskConical, Monitor, Server } from 'lucide-react'
import { skillCategories, skills, type SkillCategory } from '../data/skills'
import { useLanguage } from '../i18n/LanguageContext'
import { resetTilt, trackSpotlight } from '../lib/spotlight'
import { SectionHeading } from './SectionHeading'

const CATEGORY_ICONS: Record<SkillCategory, typeof Monitor> = {
  frontend: Monitor,
  backend: Server,
  databases: Database,
  testing: FlaskConical,
  tools: Boxes,
}

export function Skills() {
  const { lang, t } = useLanguage()
  const s = t.skills

  return (
    <section id="skills" className="section skills" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading id="skills-title" index={s.index} kicker={s.kicker} title={s.title} intro={s.intro} />

        <div className="toolkit">
          {skillCategories.map((category) => {
            const Icon = CATEGORY_ICONS[category]
            const items = skills.filter((skill) => skill.category === category)
            const headingId = `toolkit-${category}`
            return (
              <section
                key={category}
                className={`toolkit__group toolkit__group--${category} card spotlight`}
                aria-labelledby={headingId}
                data-reveal
                onPointerMove={trackSpotlight}
                onPointerLeave={resetTilt}
              >
                <header className="toolkit__head">
                  <span className="toolkit__icon" aria-hidden="true">
                    <Icon size={18} strokeWidth={1.7} />
                  </span>
                  <h3 id={headingId} className="toolkit__title">
                    {s.categories[category]}
                  </h3>
                  <span className="toolkit__count mono">{s.count(items.length)}</span>
                </header>
                <ul className="toolkit__list">
                  {items.map((skill) => (
                    <li key={skill.name} className="toolkit__item">
                      <span className="toolkit__name">{skill.name}</span>
                      <span className="toolkit__used">{skill.usedIn[lang]}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}
        </div>
      </div>
    </section>
  )
}
