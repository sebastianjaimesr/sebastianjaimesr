/**
 * Sección "Enfoque" (#approach): los 3 pasos de cómo trabaja Sebastián.
 *
 * Una línea vertical conecta los pasos y se "dibuja" a medida que el usuario hace scroll.
 */
import { Compass, Hammer, RefreshCw } from 'lucide-react'
import { useLayoutEffect, useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { gsap } from '../lib/gsap'
import { SectionHeading } from './SectionHeading'

// Íconos de cada paso, en el mismo orden que t.approach.steps.
const STEP_ICONS = [Compass, Hammer, RefreshCw]

/** Componente de la sección "Enfoque". */
export function Approach() {
  const { t } = useLanguage()
  const a = t.approach
  // Referencia al contenedor de la línea, para animarlo con GSAP.
  const listRef = useRef<HTMLDivElement>(null)

  // The connecting line draws itself as the section scrolls into view.
  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        list,
        // Anima la variable CSS --progress de 0 a 1; el CSS la usa para escalar la línea.
        { '--progress': 0 },
        {
          '--progress': 1,
          ease: 'none',
          scrollTrigger: { trigger: list, start: 'top 80%', end: 'bottom 55%', scrub: 0.6 },
        },
      )
    })
    return () => mm.revert()
  }, [])

  return (
    <section id="approach" className="section approach" aria-labelledby="approach-title">
      <div className="container">
        <SectionHeading id="approach-title" index={a.index} kicker={a.kicker} title={a.title} />
        <div className="approach__track" ref={listRef}>
          <div className="approach__line" aria-hidden="true" />
          {/* <ol> = lista ordenada, porque los pasos tienen un orden. */}
          <ol className="approach__steps">
          {a.steps.map((step, i) => {
            const Icon = STEP_ICONS[i]
            return (
              <li key={i} className="approach__step" data-reveal>
                <span className="approach__node" aria-hidden="true">
                  <Icon size={20} strokeWidth={1.6} />
                </span>
                <p className="approach__number mono" aria-hidden="true">
                  0{i + 1}
                </p>
                <h3 className="approach__title">
                  <span className="sr-only">0{i + 1} </span>
                  {step.title}
                </h3>
                <p className="approach__text">{step.text}</p>
              </li>
            )
          })}
          </ol>
        </div>
      </div>
    </section>
  )
}
