/**
 * Sección "Proyectos" (#projects).
 *
 * Muestra una tarjeta por cada proyecto de data/projects.ts y abre un modal
 * con el detalle al presionar "Ver detalles".
 */
import { ArrowUpRight, CircleDot } from 'lucide-react'
import { useState } from 'react'
import { projects, type Project } from '../data/projects'
import { site } from '../data/site'
import { useLanguage } from '../i18n/LanguageContext'
import { resetTilt, trackSpotlight } from '../lib/spotlight'
import { GitHubIcon } from './Icons'
import { ProjectCover } from './ProjectCover'
import { ProjectDialog } from './ProjectDialog'
import { SectionHeading } from './SectionHeading'

/**
 * Botones de enlace: el repositorio (o el perfil de GitHub si no hay repo) y la demo si existe.
 * Se exporta porque también lo usa ProjectDialog.
 */
export function ProjectLinks({ project }: { project: Project }) {
  const { t } = useLanguage()
  const p = t.projects
  return (
    <>
      {project.repoUrl ? (
        <a className="btn btn--ghost btn--sm" href={project.repoUrl} target="_blank" rel="noopener noreferrer">
          <GitHubIcon size={16} />
          {p.repo}
          <span className="sr-only"> {t.contact.newTab}</span>
        </a>
      ) : (
        <a className="btn btn--ghost btn--sm" href={site.githubUrl} target="_blank" rel="noopener noreferrer">
          <GitHubIcon size={16} />
          {p.profile}
          <span className="sr-only"> {t.contact.newTab}</span>
        </a>
      )}
      {project.demoUrl && (
        <a className="btn btn--ghost btn--sm" href={project.demoUrl} target="_blank" rel="noopener noreferrer">
          <ArrowUpRight size={16} aria-hidden="true" />
          {p.demo}
          <span className="sr-only"> {t.contact.newTab}</span>
        </a>
      )}
    </>
  )
}

/** Etiqueta con el estado del proyecto (verificado, en progreso, sin verificar). */
export function StatusBadge({ status }: { status: Project['status'] }) {
  const { t } = useLanguage()
  return (
    <span className={`project-status project-status--${status}`}>
      <CircleDot size={14} aria-hidden="true" />
      {t.projects.status[status]}
    </span>
  )
}

/** Componente de la sección de proyectos. */
export function Projects() {
  const { lang, t } = useLanguage()
  const p = t.projects
  // Proyecto abierto en el modal (null = modal cerrado).
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <section id="projects" className="section projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading id="projects-title" index={p.index} kicker={p.kicker} title={p.title} intro={p.intro} />

        <ul className="projects__grid">
          {projects.map((project) => (
            <li key={project.id} className="project card spotlight tilt" data-reveal onPointerMove={trackSpotlight} onPointerLeave={resetTilt}>
              <div className="project__media">
                <ProjectCover project={project} />
                <span className="project__index mono" aria-hidden="true">
                  {project.index}
                </span>
              </div>
              <div className="project__content">
                <div className="project__meta">
                  <span className="mono project__kind">{project.kind[lang]}</span>
                  <StatusBadge status={project.status} />
                </div>
                <h3 className="project__name">{project.name}</h3>
                <p className="project__summary">{project.summary[lang]}</p>
                <ul className="tag-list" aria-label={p.tech}>
                  {project.tech.map((tech) => (
                    <li key={tech} className="tag mono">
                      {tech}
                    </li>
                  ))}
                </ul>
                <div className="project__actions">
                  <button type="button" className="btn btn--primary btn--sm" onClick={() => setSelected(project)} aria-label={p.detailsFor(project.name)} aria-haspopup="dialog">
                    {p.details}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </button>
                  <ProjectLinks project={project} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Un solo modal para todos los proyectos; muestra el que esté seleccionado. */}
      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
