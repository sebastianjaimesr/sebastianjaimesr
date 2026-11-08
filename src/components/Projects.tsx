import { ArrowUpRight, Info, Maximize2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { featuredProject, filterProjects, projectCategories, projects, type Project, type ProjectCategory } from '../data/projects'
import { useLanguage } from '../i18n/LanguageContext'
import { resetTilt, trackSpotlight } from '../lib/spotlight'
import { ArchitectureDiagram } from './ArchitectureDiagram'
import { GitHubIcon } from './Icons'
import { ProjectCover, assetUrl } from './ProjectCover'
import { ProjectDialog } from './ProjectDialog'
import { SectionHeading } from './SectionHeading'

type Filter = ProjectCategory | 'all'

const external = { target: '_blank', rel: 'noopener noreferrer' } as const

/** "Live Demo" (deployed app) and "View Code" (GitHub) are styled differently on purpose. */
export function ProjectLinks({ name, repoUrl, demoUrl, size = 'sm' }: { name: string; repoUrl: string; demoUrl: string | null; size?: 'sm' | 'md' }) {
  const { t } = useLanguage()
  const p = t.projects
  const sizeClass = size === 'sm' ? ' btn--sm' : ''
  return (
    <>
      {demoUrl && (
        <a className={`btn btn--demo${sizeClass}`} href={demoUrl} {...external} aria-label={`${p.demoFor(name)} ${t.contact.newTab}`}>
          <span className="btn__live" aria-hidden="true" />
          {p.demo}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      )}
      <a className={`btn btn--ghost${sizeClass}`} href={repoUrl} {...external} aria-label={`${p.repoFor(name)} ${t.contact.newTab}`}>
        <GitHubIcon size={16} />
        {p.repo}
      </a>
    </>
  )
}

function Featured() {
  const { lang, t } = useLanguage()
  const f = t.projects.featured
  const fp = featuredProject
  const cs = fp.caseStudy

  return (
    <article className="featured card" aria-labelledby="featured-title" data-reveal>
      <div className="featured__top">
        <div className="featured__media">
          <div className="browser" aria-hidden="false">
            <div className="browser__bar" aria-hidden="true">
              <span />
              <span />
              <span />
              <p className="browser__url mono">sebastianjaimesr.github.io/emirate-scents</p>
            </div>
            <img
              src={assetUrl(fp.image)}
              alt={fp.imageAlt[lang]}
              width={1600}
              height={1000}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className="featured__intro">
          <p className="featured__badge mono">
            <span className="featured__badge-dot" aria-hidden="true" />
            {f.badge}
          </p>
          <p className="project__kind mono">{fp.category[lang]}</p>
          <h3 id="featured-title" className="featured__name">
            {fp.name}
          </h3>
          <p className="featured__summary">{fp.summary[lang]}</p>
          <ul className="tag-list" aria-label={f.stack}>
            {fp.tech.map((tech) => (
              <li key={tech} className="tag mono">
                {tech}
              </li>
            ))}
          </ul>
          <div className="project__actions featured__actions">
            <ProjectLinks name={fp.name} repoUrl={fp.repoUrl} demoUrl={fp.demoUrl} size="md" />
          </div>
          <p className="demo-note">
            <Info size={15} aria-hidden="true" />
            {fp.demoNote[lang]}
          </p>
        </div>
      </div>

      <div className="case">
        <div className="case__block">
          <h4 className="case__label mono">{f.problem}</h4>
          <p>{cs.problem[lang]}</p>
        </div>
        <div className="case__block">
          <h4 className="case__label mono">{f.solution}</h4>
          <p>{cs.solution[lang]}</p>
        </div>

        <div className="case__block case__block--wide">
          <h4 className="case__label mono">{f.architecture}</h4>
          <p>{cs.architecture[lang]}</p>
          <ArchitectureDiagram title={f.diagramTitle} label={f.diagramLabel} nodes={fp.architectureFlow} notes={fp.architectureNotes[lang]} lang={lang} />
        </div>

        <div className="case__block">
          <h4 className="case__label mono">{f.challenges}</h4>
          <ul className="case__list">
            {cs.challenges[lang].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="case__block">
          <h4 className="case__label mono">{f.testing}</h4>
          <p>{cs.testing[lang]}</p>
          <dl className="test-stats">
            {fp.testStats.map((stat) => (
              <div key={stat.value + stat.label.en}>
                <dt className="sr-only">{stat.label[lang]}</dt>
                <dd>
                  <span className="test-stats__value">{stat.value}</span>
                  <span className="test-stats__label">{stat.label[lang]}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="test-stats__caption mono">{f.testsCaption}</p>
        </div>

        <div className="case__block case__block--wide case__outcome">
          <h4 className="case__label mono">{f.outcome}</h4>
          <p>{cs.outcome[lang]}</p>
        </div>
      </div>
    </article>
  )
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  const { lang, t } = useLanguage()
  const p = t.projects
  return (
    <li className="project card spotlight tilt" onPointerMove={trackSpotlight} onPointerLeave={resetTilt}>
      <div className="project__media">
        <ProjectCover project={project} />
        <span className="project__category mono">{p.filters[project.categories[0]]}</span>
      </div>
      <div className="project__content">
        <p className="project__kind mono">{project.kind[lang]}</p>
        <h3 className="project__name">{project.name}</h3>
        <p className="project__summary">{project.summary[lang]}</p>
        <dl className="project__facts">
          <div>
            <dt className="mono">{p.problem}</dt>
            <dd>{project.problem[lang]}</dd>
          </div>
          <div>
            <dt className="mono">{p.challenge}</dt>
            <dd>{project.challenge[lang]}</dd>
          </div>
        </dl>
        <ul className="tag-list" aria-label={p.tech}>
          {project.tech.map((tech) => (
            <li key={tech} className="tag mono">
              {tech}
            </li>
          ))}
        </ul>
        <div className="project__actions">
          <ProjectLinks name={project.name} repoUrl={project.repoUrl} demoUrl={project.demoUrl} />
          <button type="button" className="btn btn--text btn--sm" onClick={() => onOpen(project)} aria-label={p.detailsFor(project.name)} aria-haspopup="dialog">
            <Maximize2 size={15} aria-hidden="true" />
            {p.details}
          </button>
        </div>
        {project.demoNote && (
          <p className="demo-note demo-note--card">
            <Info size={14} aria-hidden="true" />
            {project.demoNote[lang]}
          </p>
        )}
      </div>
    </li>
  )
}

export function Projects() {
  const { t } = useLanguage()
  const p = t.projects
  const [filter, setFilter] = useState<Filter>('all')
  const [selected, setSelected] = useState<Project | null>(null)

  const visible = useMemo(() => filterProjects(projects, filter), [filter])
  // Only offer filters that have at least one project, so no category is empty by design.
  const filters = useMemo<Filter[]>(() => ['all', ...projectCategories.filter((c) => filterProjects(projects, c).length > 0)], [])

  return (
    <section id="projects" className="section projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading id="projects-title" index={p.index} kicker={p.kicker} title={p.title} intro={p.intro} />

        <Featured />

        <div className="projects__toolbar" data-reveal>
          <div className="chip-group" role="group" aria-label={p.filters.label}>
            {filters.map((key) => (
              <button key={key} type="button" className="chip" aria-pressed={filter === key} aria-controls="projects-grid" onClick={() => setFilter(key)}>
                {p.filters[key]}
              </button>
            ))}
          </div>
          <p className="projects__count mono" aria-live="polite">
            {p.count(visible.length)}
          </p>
        </div>

        {visible.length > 0 ? (
          <ul id="projects-grid" className="projects__grid" data-reveal>
            {visible.map((project) => (
              <ProjectCard key={`${filter}-${project.id}`} project={project} onOpen={setSelected} />
            ))}
          </ul>
        ) : (
          <p id="projects-grid" className="projects__empty">
            {p.empty}
          </p>
        )}
      </div>

      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
