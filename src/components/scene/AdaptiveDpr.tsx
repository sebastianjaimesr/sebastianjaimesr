/**
 * Ajuste automático de resolución de la escena 3D según el rendimiento (FPS).
 */
import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'

/**
 * Lowers the device pixel ratio once if the scene renders below ~45 fps for a
 * sustained period. Cheap replacement for a full performance monitor.
 */
export function AdaptiveDpr({ min = 1 }: { min?: number }) {
  const setDpr = useThree((state) => state.setDpr)
  // warmup: espera 1,5 s antes de medir, porque los primeros frames siempre son lentos.
  const sample = useRef({ time: 0, frames: 0, warmup: 1.5, done: false })

  useFrame((_, delta) => {
    const s = sample.current
    if (s.done) return
    if (s.warmup > 0) {
      s.warmup -= delta
      return
    }
    s.time += delta
    s.frames += 1
    if (s.time >= 2) {
      // Cada 2 segundos calcula los cuadros por segundo; si son menos de 45, baja la resolución una vez.
      const fps = s.frames / s.time
      if (fps < 45) {
        setDpr(min)
        s.done = true
      }
      s.time = 0
      s.frames = 0
    }
  })

  return null
}
