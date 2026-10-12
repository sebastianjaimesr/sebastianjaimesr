import { ArrowDownRight, MapPin } from 'lucide-react'
import { useLayoutEffect, useRef } from 'react'
import { site } from '../data/site'
import { useLanguage } from '../i18n/LanguageContext'
import { gsap } from '../lib/gsap'
import type { SceneStatus } from './SceneLayer'

interface HeroProps {
  /** State of the shared 3D layer; the CSS orb stands in until it is ready. */
  sceneStatus: SceneStatus
}

export function Hero({ sceneStatus: status }: HeroProps) {
  const { t } = useLanguage()
  const heroRef = useRef<HTMLElement>(null)

  // Staggered entrance and scroll-linked fade of the hero copy.
  useLayoutEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ delay: 0.15 })
      tl.from(hero.querySelectorAll('[data-hero]'), { y: 32, opacity: 0, duration: 1.1, stagger: 0.09 })
        .from(hero.querySelectorAll('[data-hero-label]'), { opacity: 0, y: 12, stagger: 0.12, duration: 0.8 }, '-=0.6')
        .from(hero.querySelector('.hero__scroll'), { opacity: 0, duration: 0.8 }, '-=0.4')
      gsap.to(hero.querySelector('.hero__copy'), {
        yPercent: -10,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to(hero.querySelector('.hero__labels'), {
        yPercent: -25,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, hero)
    return () => mm.revert()
  }, [])

  return (
    <section id="home" className="hero" ref={heroRef} aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="hero__eyebrow mono" data-hero>
            <span className="hero__eyebrow-line" aria-hidden="true" />
            {t.hero.eyebrow}
          </p>
          <h1 id="hero-title" className="hero__name" data-hero>
            <span>Sebastian</span> <span className="hero__name-outline">Jaimes</span>
          </h1>
          <p className="hero__title" data-hero>
            {t.hero.title}
          </p>
          <p className="hero__intro" data-hero>
            {t.hero.intro}
          </p>
          <div className="hero__ctas" data-hero>
            <a className="btn btn--primary" href="#projects">
              {t.hero.primaryCta}
              <ArrowDownRight size={18} aria-hidden="true" />
            </a>
            <a className="btn btn--ghost" href="#contact">
              {t.hero.secondaryCta}
            </a>
          </div>
          <ul className="hero__meta" data-hero>
            {site.availableForWork && (
              <li className="status-pill">
                <span className="status-dot" aria-hidden="true" />
                {t.hero.availability}
              </li>
            )}
            <li className="hero__location">
              <MapPin size={16} aria-hidden="true" />
              {site.location}
            </li>
          </ul>
        </div>

        <div className="hero__stage" role="img" aria-label={t.hero.sceneLabel}>
          {status !== 'ready' && <div className={`orb-fallback${status === 'failed' ? ' is-static' : ''}`} aria-hidden="true" />}
          <ul className="hero__labels mono" aria-hidden="true">
            <li className="hero__label hero__label--a" data-hero-label>
              <span>{t.hero.labels.coordinates}</span>
              {site.coordinates}
            </li>
            <li className="hero__label hero__label--b" data-hero-label>
              <span>{t.hero.labels.stack}</span>
              {t.hero.labels.stackValue}
            </li>
            <li className="hero__label hero__label--c" data-hero-label>
              <span>{t.hero.labels.mode}</span>
              {t.hero.labels.modeValue}
            </li>
          </ul>
          {status === 'failed' && <p className="sr-only">{t.fallback.noWebgl}</p>}
        </div>
      </div>

      <a className="hero__scroll mono" href="#about">
        <span className="hero__scroll-track" aria-hidden="true">
          <span className="hero__scroll-thumb" />
        </span>
        {t.hero.scroll}
      </a>
    </section>
  )
}
