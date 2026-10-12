import { ArrowDownRight, MapPin } from 'lucide-react'
import { Suspense, lazy, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { site } from '../data/site'
import { useReducedMotion } from '../hooks/useMediaQuery'
import { useLanguage } from '../i18n/LanguageContext'
import { gsap } from '../lib/gsap'
import { sceneState } from '../lib/sceneState'
import { getQualityTier, isWebGLAvailable } from '../lib/webgl'
import { ErrorBoundary } from './ErrorBoundary'

// The 3D scene (three.js + R3F) is split into its own chunk so text paints first.
const Scene3D = lazy(() => import('./scene/Scene3D'))

type SceneStatus = 'loading' | 'ready' | 'failed'

export function Hero() {
  const { t } = useLanguage()
  const reducedMotion = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<SceneStatus>(() => (isWebGLAvailable() ? 'loading' : 'failed'))
  const [active, setActive] = useState(true)
  const tier = useMemo(getQualityTier, [])

  const handleReady = useCallback(() => setStatus('ready'), [])
  const handleFailure = useCallback(() => setStatus('failed'), [])

  // Measure where the sculpture should sit (the stage element) relative to the hero/canvas.
  useEffect(() => {
    const hero = heroRef.current
    const stage = stageRef.current
    if (!hero || !stage) return
    const measure = () => {
      const h = hero.getBoundingClientRect()
      const s = stage.getBoundingClientRect()
      if (!h.width || !h.height) return
      const cx = s.left + s.width / 2 - h.left
      const cy = s.top + s.height / 2 - h.top
      sceneState.anchor.x = (cx / h.width) * 2 - 1
      sceneState.anchor.y = -((cy / h.height) * 2 - 1)
      sceneState.anchor.size = Math.min(s.width, s.height) / h.height
      sceneState.anchor.ready = true
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(hero)
    observer.observe(stage)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  // Pointer parallax (mouse and touch) and scroll progress, written to shared state without re-rendering.
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    const onPointer = (event: PointerEvent) => {
      sceneState.pointer.x = (event.clientX / window.innerWidth) * 2 - 1
      sceneState.pointer.y = -((event.clientY / window.innerHeight) * 2 - 1)
    }
    const onScroll = () => {
      const height = hero.offsetHeight || window.innerHeight
      sceneState.scroll = Math.min(1, Math.max(0, window.scrollY / height))
    }
    onScroll()
    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Pause the render loop when the hero is off screen or the tab is hidden.
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    let visible = true
    const update = () => setActive(visible && document.visibilityState === 'visible')
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      update()
    })
    io.observe(hero)
    document.addEventListener('visibilitychange', update)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', update)
    }
  }, [])

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
      <div className={`hero__canvas${status === 'ready' ? ' is-ready' : ''}`}>
        {status !== 'failed' && (
          <ErrorBoundary fallback={null} onError={handleFailure}>
            <Suspense fallback={null}>
              <Scene3D tier={tier} reducedMotion={reducedMotion} active={active} onReady={handleReady} onContextLost={handleFailure} />
            </Suspense>
          </ErrorBoundary>
        )}
      </div>

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

        <div className="hero__stage" ref={stageRef} role="img" aria-label={t.hero.sceneLabel}>
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
