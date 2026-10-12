let cached: boolean | null = null

/** Returns true when the browser can create a WebGL context. Result is cached. */
export function isWebGLAvailable(): boolean {
  if (cached !== null) return cached
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl')
    cached = !!gl
    // Release the probe context immediately.
    ;(gl as WebGLRenderingContext | null)?.getExtension('WEBGL_lose_context')?.loseContext()
  } catch {
    cached = false
  }
  return cached
}

export type QualityTier = 'low' | 'medium' | 'high'

/** Rough device capability estimate used to size particle counts and geometry detail. */
export function getQualityTier(): QualityTier {
  const nav = navigator as Navigator & { deviceMemory?: number }
  const cores = nav.hardwareConcurrency ?? 4
  const memory = nav.deviceMemory ?? 4
  const small = window.matchMedia('(max-width: 767px)').matches
  const coarse = window.matchMedia('(pointer: coarse)').matches
  if (cores <= 4 || memory <= 2) return 'low'
  if (small || coarse) return 'medium'
  return 'high'
}
