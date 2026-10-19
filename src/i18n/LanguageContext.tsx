/**
 * Sistema de idiomas (i18n) del portafolio: inglés y español.
 *
 * Usa el Context API de React para que cualquier componente obtenga el idioma
 * actual y sus textos con el hook useLanguage(), sin pasar props por toda la app.
 * La elección del usuario se guarda en localStorage para recordarla en la próxima visita.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { dictionaries, type Dictionary } from '../data/translations'
import type { Lang } from './types'

/** Clave con la que se guarda el idioma en localStorage. */
const STORAGE_KEY = 'sj-portfolio-lang'
/** Idioma por defecto cuando no hay nada guardado. */
const DEFAULT_LANG: Lang = 'en'

/** Lee el idioma guardado; si no hay uno válido, devuelve el idioma por defecto. */
function readStoredLang(): Lang {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    if (value === 'en' || value === 'es') return value
  } catch {
    /* almacenamiento no disponible (modo privado, cookies bloqueadas): se usa el idioma por defecto */
  }
  return DEFAULT_LANG
}

/** Guarda el idioma elegido. Si falla, simplemente no se recuerda. */
function storeLang(lang: Lang) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    /* se ignora: la elección simplemente no se guardará */
  }
}

/** Lo que entrega el contexto: idioma, textos traducidos y función para cambiar de idioma. */
interface LanguageContextValue {
  lang: Lang
  t: Dictionary
  setLang: (lang: Lang) => void
}

// Empieza en null: si un componente lo usa fuera del Provider, useLanguage lanza un error claro.
const LanguageContext = createContext<LanguageContextValue | null>(null)

/** Proveedor que envuelve la app (ver main.tsx) y comparte el idioma con todos los componentes. */
export function LanguageProvider({ children }: { children: ReactNode }) {
  // Se pasa la función (sin ejecutarla) para que solo lea localStorage una vez, al iniciar.
  const [lang, setLangState] = useState<Lang>(readStoredLang)

  // Cambia el idioma en el estado y lo guarda.
  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    storeLang(next)
  }, [])

  // Cada vez que cambia el idioma, actualiza el <html lang>, el título de la pestaña y la meta descripción (SEO).
  useEffect(() => {
    const t = dictionaries[lang]
    document.documentElement.lang = lang === 'es' ? 'es' : 'en'
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
  }, [lang])

  // useMemo evita crear un objeto nuevo en cada render (lo que re-renderizaría a todos los consumidores).
  const value = useMemo(() => ({ lang, t: dictionaries[lang], setLang }), [lang, setLang])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

/** Hook para leer el idioma desde cualquier componente: const { lang, t, setLang } = useLanguage() */
export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return ctx
}
