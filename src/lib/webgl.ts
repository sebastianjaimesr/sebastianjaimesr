/**
 * Utilidades para decidir si se puede mostrar la escena 3D y con qué calidad.
 */

/** Resultado guardado de la comprobación de WebGL (null = aún no se ha comprobado). */
let cached: boolean | null = null

/** Devuelve true si el navegador puede crear un contexto WebGL. El resultado se guarda en caché. */
export function isWebGLAvailable(): boolean {
  if (cached !== null) return cached
  try {
    // Se crea un canvas temporal y se intenta obtener WebGL 2, o WebGL 1 como alternativa.
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl')
    cached = !!gl
    // Libera de inmediato el contexto de prueba (los navegadores limitan cuántos puede haber).
    ;(gl as WebGLRenderingContext | null)?.getExtension('WEBGL_lose_context')?.loseContext()
  } catch {
    cached = false
  }
  return cached
}

/** Nivel de calidad gráfica: define cuántas partículas y cuánto detalle dibujar. */
export type QualityTier = 'low' | 'medium' | 'high'

/** Estimación aproximada de la potencia del dispositivo, usada para ajustar partículas y detalle de geometría. */
export function getQualityTier(): QualityTier {
  // deviceMemory no existe en todos los navegadores, por eso se amplía el tipo de navigator.
  const nav = navigator as Navigator & { deviceMemory?: number }
  const cores = nav.hardwareConcurrency ?? 4
  const memory = nav.deviceMemory ?? 4
  const small = window.matchMedia('(max-width: 767px)').matches
  const coarse = window.matchMedia('(pointer: coarse)').matches // "coarse" = pantalla táctil
  // Pocos núcleos o poca memoria → calidad baja; móvil o táctil → media; el resto → alta.
  if (cores <= 4 || memory <= 2) return 'low'
  if (small || coarse) return 'medium'
  return 'high'
}
