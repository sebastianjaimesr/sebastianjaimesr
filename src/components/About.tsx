import { Database, Globe, Layers, Workflow } from 'lucide-react'
import { site } from '../data/site'
import { useLanguage } from '../i18n/LanguageContext'
import { trackSpotlight } from '../lib/spotlight'
import { SectionHeading } from './SectionHeading'

const THEME_ICONS = [Layers, Database, Workflow, Globe]

export function About() {
  const { t } = useLanguage()
  const a = t.about
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container">
        <div className="about__layout">
          <SectionHeading id="about-title" index={a.index} kicker={a.kicker} title={a.title} />
          <div className="about__body">
            <p className="about__lead" data-reveal>
              {a.body}
            </p>
            <dl className="about__facts" data-reveal>
              <div>
                <dt className="mono">{a.facts.based}</dt>
                <dd>{site.location}</dd>
              </div>
              <div>
                <dt className="mono">{a.facts.focus}</dt>
                <dd>{a.facts.focusValue}</dd>
              </div>
              <div>
                <dt className="mono">{a.facts.languages}</dt>
                <dd>{a.facts.languagesValue}</dd>
              </div>
              <div>
                <dt className="mono">{a.facts.training}</dt>
                <dd>{a.facts.trainingValue}</dd>
              </div>
            </dl>
          </div>
        </div>

        <ul className="themes">
          {a.themes.map((theme, i) => {
            const Icon = THEME_ICONS[i]
            return (
              <li key={i} className="theme card spotlight" data-reveal onPointerMove={trackSpotlight}>
                <div className="theme__top">
                  <span className="theme__icon" aria-hidden="true">
                    <Icon size={20} strokeWidth={1.6} />
                  </span>
                  <span className="mono theme__index" aria-hidden="true">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="theme__title">{theme.title}</h3>
                <p className="theme__text">{theme.text}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
