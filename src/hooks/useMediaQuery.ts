/**
 * Hooks para reaccionar a media queries de CSS desde React
 * (por ejemplo, si el usuario prefiere menos animaciones).
 */
import { useSyncExternalStore } from 'react'

/**
 * Devuelve true/false según si la media query se cumple, y se actualiza solo
 * cuando cambia. useSyncExternalStore es la forma recomendada por React para
 * suscribirse a una fuente de datos externa (aquí, window.matchMedia).
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    // 1) Cómo suscribirse a los cambios (y cómo cancelar la suscripción).
    (onChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    // 2) Cómo leer el valor actual en el navegador.
    () => window.matchMedia(query).matches,
    // 3) Valor por defecto si se renderiza en servidor (no hay window).
    () => false,
  )
}

/** Media query que indica que el usuario activó "reducir movimiento" en su sistema operativo. */
export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

/** Atajo: true si el usuario prefiere menos animaciones (accesibilidad). */
export function useReducedMotion(): boolean {
  return useMediaQuery(REDUCED_MOTION_QUERY)
}
