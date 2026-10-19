/**
 * DATOS PERSONALES (en español): única fuente de verdad para nombre, correo,
 * teléfono y enlaces. Si cambias algo aquí, se actualiza en todo el sitio.
 */
/**
 * Personal information: the single source of truth for contact details.
 * Edit this file to update links shown across the site.
 *
 * `needsConfirmation` flags values the owner still has to confirm. They are
 * listed in README.md under "Details that still require confirmation".
 */
export const site = {
  name: 'Sebastian Jaimes',
  location: 'Bucaramanga, Colombia',
  /** Approximate city coordinates, used only as a decorative label. */
  coordinates: '7.1193° N · 73.1227° W',
  email: 'jsrolon01@gmail.com',
  phoneDisplay: '+57 312 442 1564',
  whatsappUrl: 'https://wa.me/573124421564',
  githubUrl: 'https://github.com/sebastianjaimesr',
  githubHandle: 'sebastianjaimesr',
  linkedinUrl: 'https://www.linkedin.com/in/sebastian-jaimes-1a2259398/',
  /** CV in /public/cv. Set to null to hide the download button. */
  cvPath: 'cv/Juan_Sebastian_Jaimes_CV.pdf' as string | null,
  /** Shows the "open to junior opportunities" indicator in the hero and contact sections. */
  availableForWork: true,
} as const

// Arma un enlace "mailto:" con asunto. encodeURIComponent convierte espacios y tildes a un formato válido de URL.
export const mailtoHref = (subject: string) =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}`
