import { Info, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { Project } from '../data/projects'
import { useLanguage } from '../i18n/LanguageContext'
import { ProjectCover } from './ProjectCover'
import { ProjectLinks } from './Projects'

/** Native <dialog>: focus trapping, Escape handling and focus return come from the browser. */
export function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const { lang, t } = useLanguage()
  const p = t.projects
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (project && !dialog.open) dialog.showModal()
    if (!project && dialog.open) dialog.close()
  }, [project])

  return (
    <dialog
      ref={ref}
      className="dialog"
      aria-labelledby="project-dialog-title"
      onClose={onClose}
      onClick={(event) => {
        // Clicking the backdrop (the dialog element itself) closes it.
        if (event.target === event.currentTarget) onClose()
      }}
    >
      {project && (
        <div className="dialog__panel">
          <button type="button" className="dialog__close" onClick={onClose} aria-label={p.closeDetails}>
            <X size={20} aria-hidden="true" />
          </button>
          <div className="dialog__media">
            <ProjectCover project={project} eager />
          </div>
          <div className="dialog__content">
            <div className="project__meta">
              <span className="mono project__kind">{project.kind[lang]}</span>
              <span className="project__category project__category--inline mono">{p.filters[project.categories[0]]}</span>
            </div>
            <h2 id="project-dialog-title" className="dialog__title">
              {project.name}
            </h2>
            <p className="dialog__description">{project.description[lang]}</p>

            <dl className="project__facts project__facts--dialog">
              <div>
                <dt className="mono">{p.problem}</dt>
                <dd>{project.problem[lang]}</dd>
              </div>
              <div>
                <dt className="mono">{p.challenge}</dt>
                <dd>{project.challenge[lang]}</dd>
              </div>
            </dl>

            <h3 className="dialog__subtitle mono">{p.features}</h3>
            <ul className="dialog__features">
              {project.features[lang].map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <h3 className="dialog__subtitle mono">{p.tech}</h3>
            <ul className="tag-list">
              {project.tech.map((tech) => (
                <li key={tech} className="tag mono">
                  {tech}
                </li>
              ))}
            </ul>

            {(project.demoNote || !project.demoUrl) && (
              <p className="demo-note">
                <Info size={15} aria-hidden="true" />
                {project.demoNote ? project.demoNote[lang] : p.noDemo}
              </p>
            )}
            <div className="project__actions">
              <ProjectLinks name={project.name} repoUrl={project.repoUrl} demoUrl={project.demoUrl} />
            </div>
          </div>
        </div>
      )}
    </dialog>
  )
}
