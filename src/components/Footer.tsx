/**
 * Pie de página: monograma, nombre, enlaces (GitHub, correo, volver arriba) y derechos.
 */
import { ArrowUp, Mail } from 'lucide-react'
import { site } from '../data/site'
import { useLanguage } from '../i18n/LanguageContext'
import { GitHubIcon, Monogram } from './Icons'

/** Componente del pie de página. */
export function Footer() {
  const { t } = useLanguage()
  // El año se calcula solo, así el © nunca queda desactualizado.
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Monogram size={30} />
          <div>
            <p className="footer__name">{site.name}</p>
            <p className="footer__phrase">{t.footer.phrase}</p>
          </div>
        </div>
        <ul className="footer__links">
          <li>
            <a href={site.githubUrl} target="_blank" rel="noopener noreferrer" className="icon-link">
              <GitHubIcon size={18} />
              <span>GitHub</span>
              <span className="sr-only"> {t.contact.newTab}</span>
            </a>
          </li>
          <li>
            <a href={`mailto:${site.email}`} className="icon-link">
              <Mail size={18} aria-hidden="true" />
              <span>{site.email}</span>
            </a>
          </li>
          <li>
            <a href="#home" className="icon-link">
              <ArrowUp size={18} aria-hidden="true" />
              <span>{t.footer.top}</span>
            </a>
          </li>
        </ul>
        <p className="footer__copy mono">
          © {year} {t.footer.rights}
        </p>
      </div>
    </footer>
  )
}
