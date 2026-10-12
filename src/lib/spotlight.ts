import type { PointerEvent } from 'react'

/** Writes the pointer position into CSS variables used by the `.spotlight` hover glow. */
export function trackSpotlight(event: PointerEvent<HTMLElement>) {
  const el = event.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${event.clientX - rect.left}px`)
  el.style.setProperty('--my', `${event.clientY - rect.top}px`)
}
