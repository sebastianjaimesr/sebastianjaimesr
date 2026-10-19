/**
 * Sección "Sobre mí" (#about).
 *
 * Muestra la foto con efecto de inclinación 3D, el texto de presentación,
 * una lista de datos rápidos (ubicación, enfoque, idiomas, formación) y
 * cuatro tarjetas de temas. Todos los textos vienen del diccionario de idiomas.
 */
import { Database, Globe, Layers, Workflow } from 'lucide-react'
import portrait from '../assets/sebastian-jaimes.webp'
import { site } from '../data/site'
import { useLanguage } from '../i18n/LanguageContext'
import { resetTilt, trackSpotlight } from '../lib/spotlight'
import { SectionHeading } from './SectionHeading'

// Íconos de las 4 tarjetas de temas, en el mismo orden que t.about.themes.
const THEME_ICONS = [Layers, Database, Workflow, Globe]

/** Componente de la sección "Sobre mí". */
export function About() {
  const { t } = useLanguage()
  // Atajo para no escribir t.about en cada línea.
  const a = t.about
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container">
        <div className="about__layout">
          <div className="about__intro">
            <SectionHeading id="about-title" index={a.index} kicker={a.kicker} title={a.title} />
            {/* Retrato: trackSpotlight y resetTilt lo inclinan siguiendo al mouse. */}
            <figure className="portrait tilt" data-reveal onPointerMove={trackSpotlight} onPointerLeave={resetTilt}>
              <span className="portrait__orbit" aria-hidden="true">
                <span className="portrait__satellite" />
              </span>
              <div className="portrait__frame">
                {/* width/height evitan saltos de diseño; loading="lazy" carga la foto solo cuando se acerca a la pantalla. */}
                <img src={portrait} alt={a.photoAlt} width={640} height={800} loading="lazy" decoding="async" />
              </div>
              <figcaption className="portrait__tag">
                <strong>{site.name}</strong>
                <span className="mono">{t.hero.title}</span>
              </figcaption>
            </figure>
          </div>
          <div className="about__body">
            <p className="about__lead" data-reveal>
              {a.body}
            </p>
            {/* <dl> (lista de definiciones): dt = etiqueta, dd = valor. Es la etiqueta semántica correcta para pares clave-valor. */}
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
            // Un componente guardado en una variable con mayúscula se puede usar como <Icon />.
            const Icon = THEME_ICONS[i]
            return (
              <li key={i} className="theme card spotlight tilt" data-reveal onPointerMove={trackSpotlight} onPointerLeave={resetTilt}>
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
