import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { Project } from '../data/projects'
import { useLanguage } from '../i18n/LanguageContext'
import { ProjectCover } from './ProjectCover'
import { ProjectLinks, StatusBadge } from './Projects'

/** Native <dialog>: focus trapping, Escape handling and focus return come from the browser. */
export function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const { lang, t } = useLanguage()
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
          <button type="button" className="dialog__close" onClick={onClose} aria-label={t.projects.closeDetails}>
            <X size={20} aria-hidden="true" />
          </button>
          <div className="dialog__media">
            <ProjectCover project={project} />
          </div>
          <div className="dialog__content">
            <div className="project__meta">
              <span className="mono project__kind">{project.kind[lang]}</span>
              <StatusBadge status={project.status} />
            </div>
            <h2 id="project-dialog-title" className="dialog__title">
              {project.name}
            </h2>
            <p className="dialog__description">{project.description[lang]}</p>

            <h3 className="dialog__subtitle mono">{t.projects.features}</h3>
            <ul className="dialog__features">
              {project.features[lang].map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <h3 className="dialog__subtitle mono">{t.projects.tech}</h3>
            <ul className="tag-list">
              {project.tech.map((tech) => (
                <li key={tech} className="tag mono">
                  {tech}
                </li>
              ))}
            </ul>

            {!project.repoUrl && <p className="dialog__note">{t.projects.noLinks}</p>}
            <div className="project__actions">
              <ProjectLinks project={project} />
            </div>
          </div>
        </div>
      )}
    </dialog>
  )
}
