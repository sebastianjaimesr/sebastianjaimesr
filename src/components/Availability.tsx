import { Globe2 } from 'lucide-react'
import { site } from '../data/site'
import { useLanguage } from '../i18n/LanguageContext'

/** "UTC−5 · Open to Remote · Available for US/EU Overlap", shown in the hero and contact sections. */
export function Availability({ className = '' }: { className?: string }) {
  const { t } = useLanguage()
  const a = t.availability
  return (
    <p className={`availability mono ${className}`.trim()}>
      <span className="sr-only">{`${a.label}: ${site.timezone}. ${a.remote}. ${a.overlap}.`}</span>
      <Globe2 size={15} aria-hidden="true" />
      <span aria-hidden="true">{site.timezone}</span>
      <span className="availability__dot" aria-hidden="true" />
      <span aria-hidden="true">{a.remote}</span>
      <span className="availability__dot" aria-hidden="true" />
      <span aria-hidden="true">{a.overlap}</span>
    </p>
  )
}
