/**
 * Efectos de "luz que sigue al puntero" e inclinación 3D de las tarjetas.
 *
 * En lugar de usar estado de React, estas funciones escriben variables CSS
 * (--mx, --my, --rx, --ry) directamente en el elemento. El CSS (clases .spotlight
 * y .tilt en global.css) usa esas variables para dibujar el brillo y rotar la tarjeta.
 */
import type { PointerEvent } from 'react'

/** Inclinación máxima de la tarjeta, en grados, sobre cada eje. */
const TILT_X = 6
const TILT_Y = 8

/**
 * Escribe la posición del puntero en variables CSS usadas por el brillo
 * `.spotlight` y la rotación 3D `.tilt`. Se usa en onPointerMove.
 */
export function trackSpotlight(event: PointerEvent<HTMLElement>) {
  const el = event.currentTarget
  const rect = el.getBoundingClientRect()
  // Posición del puntero relativa a la esquina superior izquierda de la tarjeta.
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  el.style.setProperty('--mx', `${x}px`)
  el.style.setProperty('--my', `${y}px`)
  // La inclinación solo aplica con mouse (no en pantallas táctiles) y si la tarjeta tiene tamaño.
  if (event.pointerType !== 'mouse' || !rect.width || !rect.height) return
  // y / alto va de 0 a 1; restarlo de 0.5 da -0.5..0.5, que se escala a grados.
  el.style.setProperty('--rx', `${((0.5 - y / rect.height) * TILT_X).toFixed(2)}deg`)
  el.style.setProperty('--ry', `${((x / rect.width - 0.5) * TILT_Y).toFixed(2)}deg`)
}

/** Devuelve la tarjeta a su posición plana cuando el puntero sale (onPointerLeave). */
export function resetTilt(event: PointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty('--rx', '0deg')
  event.currentTarget.style.setProperty('--ry', '0deg')
}
