/**
 * Sección "Contacto" (#contact).
 *
 * Incluye botones para escribir un correo, copiar el correo al portapapeles y
 * descargar el CV, además de tarjetas para cada canal (correo, GitHub,
 * LinkedIn y WhatsApp). Los datos de contacto vienen de data/site.ts.
 */
import { ArrowUpRight, Check, Copy, FileDown, Mail, MessageCircle } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { mailtoHref, site } from '../data/site'
import { useLanguage } from '../i18n/LanguageContext'
import { resetTilt, trackSpotlight } from '../lib/spotlight'
import { GitHubIcon, LinkedInIcon } from './Icons'
import { SectionHeading } from './SectionHeading'

// Estados posibles del botón "Copiar correo".
type CopyState = 'idle' | 'copied' | 'failed'

// Datos de una tarjeta de canal de contacto.
interface Channel {
  key: 'email' | 'github' | 'linkedin' | 'whatsapp'
  href: string
  value: string
  icon: ReactNode
  external: boolean
}

/** Componente de la sección de contacto. */
export function Contact() {
  const { t } = useLanguage()
  const c = t.contact
  const [copyState, setCopyState] = useState<CopyState>('idle')
  // Guarda el id del setTimeout para poder cancelarlo (useRef no provoca re-render).
  const timer = useRef<number | undefined>(undefined)

  // Al desmontar el componente, cancela el temporizador pendiente.
  useEffect(() => () => window.clearTimeout(timer.current), [])

  /** Copia el correo al portapapeles y muestra "Copiado" (o el error) durante 2,6 segundos. */
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopyState('copied')
    } catch {
      setCopyState('failed')
    }
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopyState('idle'), 2600)
  }

  // Lista de canales; se recorre con map() para dibujar una tarjeta por cada uno.
  const channels: Channel[] = [
    { key: 'email', href: mailtoHref(c.emailSubject), value: site.email, icon: <Mail size={20} aria-hidden="true" />, external: false },
    { key: 'github', href: site.githubUrl, value: `github.com/${site.githubHandle}`, icon: <GitHubIcon size={20} />, external: true },
    { key: 'linkedin', href: site.linkedinUrl, value: 'linkedin.com', icon: <LinkedInIcon size={20} />, external: true },
    { key: 'whatsapp', href: site.whatsappUrl, value: site.phoneDisplay, icon: <MessageCircle size={20} aria-hidden="true" />, external: true },
  ]

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="contact__halo" aria-hidden="true" />
      <div className="container">
        <SectionHeading id="contact-title" index={c.index} kicker={c.kicker} title={c.title} intro={c.body} />

        <div className="contact__cta" data-reveal>
          <a className="btn btn--primary btn--lg" href={mailtoHref(c.emailSubject)}>
            <Mail size={18} aria-hidden="true" />
            {c.emailCta}
          </a>
          <button type="button" className="btn btn--ghost btn--lg" onClick={copyEmail}>
            {copyState === 'copied' ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
            {copyState === 'copied' ? c.copied : c.copy}
          </button>
          {/*
            Renderizado condicional: el botón del CV solo aparece si hay ruta.
            BASE_URL agrega el prefijo donde se publica el sitio (/sebastianjaimesr/).
          */}
          {site.cvPath && (
            <a className="btn btn--ghost btn--lg" href={`${import.meta.env.BASE_URL}${site.cvPath}`} download>
              <FileDown size={18} aria-hidden="true" />
              {c.cv}
            </a>
          )}
          {site.availableForWork && (
            <p className="status-pill">
              <span className="status-dot" aria-hidden="true" />
              {t.hero.availability}
            </p>
          )}
          {/* Texto invisible que los lectores de pantalla anuncian cuando cambia (aria-live). */}
          <p className="sr-only" role="status" aria-live="polite">
            {copyState === 'copied' ? c.copied : copyState === 'failed' ? c.copyFailed : ''}
          </p>
        </div>
        {copyState === 'failed' && <p className="contact__error">{c.copyFailed}</p>}

        <ul className="channels">
          {channels.map((channel) => (
            <li key={channel.key} data-reveal>
              {/* Los enlaces externos se abren en otra pestaña con rel="noopener noreferrer" por seguridad. */}
              <a
                className="channel card spotlight tilt"
                href={channel.href}
                onPointerMove={trackSpotlight}
                onPointerLeave={resetTilt}
                {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className="channel__icon">{channel.icon}</span>
                <span className="channel__text">
                  <span className="channel__label">{c.channels[channel.key]}</span>
                  <span className="channel__value">{channel.value}</span>
                  <span className="channel__hint mono">{c.hints[channel.key]}</span>
                </span>
                <ArrowUpRight className="channel__arrow" size={20} aria-hidden="true" />
                {channel.external && <span className="sr-only"> {c.newTab}</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
