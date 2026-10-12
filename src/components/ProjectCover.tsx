import type { Project } from '../data/projects'

const ACCENTS: Record<Project['accent'], [string, string]> = {
  blue: ['#7C9DFF', '#3E4FA8'],
  violet: ['#B18CFF', '#5B3FA6'],
  mint: ['#A1F3DC', '#2F7D84'],
  indigo: ['#8E8CFF', '#2C2F7A'],
}

/** Generated cover artwork, so projects without screenshots still look intentional. */
export function ProjectCover({ project }: { project: Project }) {
  if (project.image) {
    return <img className="project__image" src={`${import.meta.env.BASE_URL}${project.image.replace(/^\//, '')}`} alt="" loading="lazy" decoding="async" />
  }
  const [light, deep] = ACCENTS[project.accent]
  const gid = `cover-${project.id}`
  return (
    <svg className="project__cover" viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`${gid}-orb`} cx="38%" cy="32%" r="70%">
          <stop offset="0" stopColor="#F4F6FF" />
          <stop offset="0.3" stopColor={light} />
          <stop offset="0.75" stopColor={deep} />
          <stop offset="1" stopColor="#0D111D" />
        </radialGradient>
        <radialGradient id={`${gid}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={light} stopOpacity="0.35" />
          <stop offset="1" stopColor={light} stopOpacity="0" />
        </radialGradient>
        <pattern id={`${gid}-grid`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="rgba(177,192,255,0.07)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="400" height="220" fill="#0B0F1A" />
      <rect width="400" height="220" fill={`url(#${gid}-grid)`} />
      <circle cx="290" cy="110" r="120" fill={`url(#${gid}-glow)`} />
      <g className="project__cover-orbit">
        <ellipse cx="290" cy="110" rx="98" ry="26" fill="none" stroke={light} strokeOpacity="0.45" transform="rotate(-18 290 110)" />
        <ellipse cx="290" cy="110" rx="78" ry="58" fill="none" stroke="rgba(244,246,255,0.18)" transform="rotate(32 290 110)" />
      </g>
      <circle className="project__cover-orb" cx="290" cy="110" r="44" fill={`url(#${gid}-orb)`} />
      <text x="28" y="196" fill="rgba(244,246,255,0.055)" fontSize="120" fontWeight="800" fontFamily="Manrope Variable, sans-serif">
        {project.index}
      </text>
    </svg>
  )
}
