import { useLayoutEffect, useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { gsap } from '../lib/gsap'
import { SectionHeading } from './SectionHeading'

/** Short, dated timeline. Dates come from the first commit of each repository (see translations). */
export function Journey() {
  const { t } = useLanguage()
  const j = t.journey
  const listRef = useRef<HTMLOListElement>(null)

  // The rail fills in as the timeline scrolls past; static when motion is reduced.
  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        list,
        { '--progress': 0 },
        { '--progress': 1, ease: 'none', scrollTrigger: { trigger: list, start: 'top 75%', end: 'bottom 60%', scrub: 0.6 } },
      )
    })
    return () => mm.revert()
  }, [])

  return (
    <section id="journey" className="section journey" aria-labelledby="journey-title">
      <div className="container">
        <SectionHeading id="journey-title" index={j.index} kicker={j.kicker} title={j.title} intro={j.intro} />
        <ol className="timeline" ref={listRef}>
          {j.items.map((item, i) => (
            <li key={`${item.date}-${item.title}`} className="timeline__item" data-reveal>
              <span className="timeline__node" aria-hidden="true" />
              <p className="timeline__date mono">{item.date}</p>
              <div className="timeline__card card">
                <h3 className="timeline__title">
                  <span className="timeline__index mono" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {item.title}
                </h3>
                <p className="timeline__text">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
