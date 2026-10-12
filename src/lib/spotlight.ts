import type { PointerEvent } from 'react'

/** Maximum card tilt in degrees around each axis. */
const TILT_X = 6
const TILT_Y = 8

/**
 * Writes the pointer position into CSS variables used by the `.spotlight`
 * hover glow and the `.tilt` 3D card rotation.
 */
export function trackSpotlight(event: PointerEvent<HTMLElement>) {
  const el = event.currentTarget
  const rect = el.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  el.style.setProperty('--mx', `${x}px`)
  el.style.setProperty('--my', `${y}px`)
  if (event.pointerType !== 'mouse' || !rect.width || !rect.height) return
  el.style.setProperty('--rx', `${((0.5 - y / rect.height) * TILT_X).toFixed(2)}deg`)
  el.style.setProperty('--ry', `${((x / rect.width - 0.5) * TILT_Y).toFixed(2)}deg`)
}

/** Lets a tilted card settle back flat when the pointer leaves it. */
export function resetTilt(event: PointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty('--rx', '0deg')
  event.currentTarget.style.setProperty('--ry', '0deg')
}
