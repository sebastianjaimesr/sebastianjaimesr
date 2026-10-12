import { ArrowUpRight, Check, Copy, FileDown, Mail, MessageCircle } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { mailtoHref, site } from '../data/site'
import { useLanguage } from '../i18n/LanguageContext'
import { trackSpotlight } from '../lib/spotlight'
import { GitHubIcon, LinkedInIcon } from './Icons'
import { SectionHeading } from './SectionHeading'

type CopyState = 'idle' | 'copied' | 'failed'

interface Channel {
  key: 'email' | 'github' | 'linkedin' | 'whatsapp'
  href: string
  value: string
  icon: ReactNode
  external: boolean
}

export function Contact() {
  const { t } = useLanguage()
  const c = t.contact
  const [copyState, setCopyState] = useState<CopyState>('idle')
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

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
          <p className="sr-only" role="status" aria-live="polite">
            {copyState === 'copied' ? c.copied : copyState === 'failed' ? c.copyFailed : ''}
          </p>
        </div>
        {copyState === 'failed' && <p className="contact__error">{c.copyFailed}</p>}

        <ul className="channels">
          {channels.map((channel) => (
            <li key={channel.key} data-reveal>
              <a
                className="channel card spotlight"
                href={channel.href}
                onPointerMove={trackSpotlight}
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
