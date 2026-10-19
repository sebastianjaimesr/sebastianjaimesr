/**
 * Barra de navegación fija.
 *
 * Incluye: barra de progreso de lectura, enlaces a las secciones (resalta la
 * sección visible), selector de idioma EN/ES y menú desplegable para móvil.
 */
import { Menu, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { site } from '../data/site'
import { REDUCED_MOTION_QUERY } from '../hooks/useMediaQuery'
import { useLanguage } from '../i18n/LanguageContext'
import type { Lang } from '../i18n/types'
import { ScrollTrigger } from '../lib/gsap'
import { Monogram } from './Icons'

// Ids de las secciones. 'as const' permite derivar un tipo con exactamente esos valores.
const SECTIONS = ['about', 'skills', 'projects', 'approach', 'contact'] as const
type SectionId = (typeof SECTIONS)[number]

/** Componente de la barra de navegación. */
export function Navbar() {
  const { lang, t, setLang } = useLanguage()
  // open = menú móvil abierto; scrolled = el usuario ya bajó; current = sección visible ahora.
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [current, setCurrent] = useState<SectionId | null>(null)
  const progressRef = useRef<HTMLSpanElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Scroll progress bar + compact header state. The bar is written directly to the DOM.
  useEffect(() => {
    // requestAnimationFrame agrupa los eventos de scroll en una sola actualización por frame (mejor rendimiento).
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? window.scrollY / max : 0
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`
      setScrolled(window.scrollY > 24)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Highlight the section currently in view.
  useEffect(() => {
    // IntersectionObserver avisa cuando una sección cruza la franja central de la pantalla (definida con rootMargin).
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCurrent(entry.target.id as SectionId)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const id of SECTIONS) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    const home = document.getElementById('home')
    const homeObserver = new IntersectionObserver(([entry]) => entry.isIntersecting && setCurrent(null), {
      rootMargin: '-45% 0px -50% 0px',
    })
    if (home) homeObserver.observe(home)
    return () => {
      observer.disconnect()
      homeObserver.disconnect()
    }
  }, [])

  /** Cierra el menú móvil y, si se pide, devuelve el foco al botón (accesibilidad con teclado). */
  const closeMenu = useCallback((restoreFocus = true) => {
    setOpen(false)
    if (restoreFocus) toggleRef.current?.focus()
  }, [])

  // Mobile menu: lock scroll, focus the first link, close on Escape or when resizing to desktop.
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    menuRef.current?.querySelector<HTMLElement>('a, button')?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu()
    }
    const desktop = window.matchMedia('(min-width: 900px)')
    const onDesktop = () => desktop.matches && closeMenu(false)
    document.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onDesktop)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onDesktop)
    }
  }, [open, closeMenu])

  /** Cambia de idioma con un breve desvanecido. Si el usuario prefiere menos movimiento, cambia de inmediato. */
  const switchLanguage = (next: Lang) => {
    if (next === lang) return
    const root = document.documentElement
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
      setLang(next)
      return
    }
    // Brief cross-fade so the copy change feels intentional rather than abrupt.
    root.classList.add('is-switching-lang')
    window.setTimeout(() => {
      setLang(next)
      requestAnimationFrame(() => {
        root.classList.remove('is-switching-lang')
        ScrollTrigger.refresh()
      })
    }, 180)
  }

  const languageToggle = (
    <div className="lang-toggle" role="group" aria-label={t.nav.language}>
      {(['en', 'es'] as const).map((code) => (
        <button
          key={code}
          type="button"
          className="lang-toggle__btn mono"
          aria-pressed={lang === code}
          lang={code}
          title={code === lang ? undefined : t.nav.switchTo}
          onClick={() => switchLanguage(code)}
        >
          <span aria-hidden="true">{code.toUpperCase()}</span>
          <span className="sr-only">{code === 'en' ? 'English' : 'Español'}</span>
        </button>
      ))}
      <span className="lang-toggle__thumb" data-lang={lang} aria-hidden="true" />
    </div>
  )

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <span className="nav__progress" ref={progressRef} aria-hidden="true" />
      <div className="container nav__inner">
        <a className="nav__brand" href="#home" aria-label={t.nav.home} onClick={() => open && closeMenu(false)}>
          <Monogram />
          <span className="nav__brand-text">
            {site.name}
            <span className="mono">Full-Stack Dev</span>
          </span>
        </a>

        <nav className="nav__links" aria-label={t.nav.label}>
          <ul>
            {SECTIONS.map((id) => (
              <li key={id}>
                <a href={`#${id}`} className="nav__link" aria-current={current === id ? 'location' : undefined}>
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__actions">
          {languageToggle}
          <button
            ref={toggleRef}
            type="button"
            className="nav__menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Menú móvil. "inert" lo desactiva (no se puede tabular ni hacer clic) mientras está cerrado. */}
      <div id="mobile-menu" className="mobile-menu" ref={menuRef} inert={!open} aria-hidden={!open}>
        <nav aria-label={t.nav.label}>
          <ol className="mobile-menu__list">
            {SECTIONS.map((id, i) => (
              <li key={id} style={{ ['--i' as string]: i }}>
                <a href={`#${id}`} className="mobile-menu__link" onClick={() => closeMenu(false)} aria-current={current === id ? 'location' : undefined}>
                  <span className="mono">0{i + 1}</span>
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="mobile-menu__footer mono">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <span>{site.location}</span>
        </div>
      </div>
    </header>
  )
}
