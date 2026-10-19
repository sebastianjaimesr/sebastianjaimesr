/**
 * Utilidades para la escena 3D: texturas generadas en un canvas y números aleatorios con semilla.
 */
import * as THREE from 'three'

/** Soft round sprite generated on a canvas, used for particles and the glow halo. */
export function createRadialTexture(size: number, stops: [number, string][]): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')
  if (ctx) {
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    for (const [offset, color] of stops) g.addColorStop(offset, color)
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
  }
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

/** Deterministic pseudo-random generator so the scene looks the same on every load. */
export function seededRandom(seed: number) {
  // Algoritmo mulberry32: con la misma semilla siempre da la misma secuencia de números.
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
