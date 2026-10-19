/**
 * Encabezado reutilizable de cada sección: número, subtítulo pequeño (kicker), título e introducción opcional.
 */
// Props del encabezado. intro es opcional (por eso lleva "?").
interface Props {
  id: string
  index: string
  kicker: string
  title: string
  intro?: string
}

/** Encabezado de sección. El número grande de fondo tiene efecto parallax (data-parallax). */
export function SectionHeading({ id, index, kicker, title, intro }: Props) {
  return (
    <header className="section-head">
      <span className="section-head__ghost" aria-hidden="true" data-parallax>
        {index}
      </span>
      <p className="section-head__kicker mono" data-reveal>
        <span className="section-head__index">{index}</span>
        <span className="section-head__rule" aria-hidden="true" />
        {kicker}
      </p>
      <h2 id={id} className="section-head__title" data-reveal>
        {title}
      </h2>
      {intro && (
        <p className="section-head__intro" data-reveal>
          {intro}
        </p>
      )}
    </header>
  )
}
