import type { ArchitectureNode } from '../data/projects'
import type { Lang } from '../i18n/types'

interface Props {
  title: string
  label: (flow: string) => string
  nodes: ArchitectureNode[]
  notes: string[]
  lang: Lang
}

/**
 * Lightweight HTML/CSS architecture diagram: nodes in a row on wide screens and a column on
 * narrow ones, joined by animated connectors. The list stays readable to screen readers.
 */
export function ArchitectureDiagram({ title, label, nodes, notes, lang }: Props) {
  const flow = nodes.map((node) => node.label).join(' → ')
  return (
    <figure className="arch" aria-label={label(flow)}>
      <figcaption className="arch__title mono">{title}</figcaption>
      <ol className="arch__flow">
        {nodes.map((node, i) => (
          <li key={node.id} className={`arch__node arch__node--${node.id}`} style={{ ['--i' as string]: i }}>
            <span className="arch__step mono" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <strong className="arch__label">{node.label}</strong>
            <span className="arch__detail">{node.detail[lang]}</span>
            {i < nodes.length - 1 && <span className="arch__link" aria-hidden="true" />}
          </li>
        ))}
      </ol>
      <ul className="arch__notes">
        {notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </figure>
  )
}
