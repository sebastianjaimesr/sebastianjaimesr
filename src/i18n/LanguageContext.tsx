import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { dictionaries, type Dictionary } from '../data/translations'
import type { Lang } from './types'

const STORAGE_KEY = 'sj-portfolio-lang'
const DEFAULT_LANG: Lang = 'en'

function readStoredLang(): Lang {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    if (value === 'en' || value === 'es') return value
  } catch {
    /* storage unavailable (private mode, blocked cookies): fall back to default */
  }
  return DEFAULT_LANG
}

function storeLang(lang: Lang) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    /* ignore: the choice simply won't persist */
  }
}

interface LanguageContextValue {
  lang: Lang
  t: Dictionary
  setLang: (lang: Lang) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readStoredLang)

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    storeLang(next)
  }, [])

  useEffect(() => {
    const t = dictionaries[lang]
    document.documentElement.lang = lang === 'es' ? 'es' : 'en'
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
  }, [lang])

  const value = useMemo(() => ({ lang, t: dictionaries[lang], setLang }), [lang, setLang])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return ctx
}
