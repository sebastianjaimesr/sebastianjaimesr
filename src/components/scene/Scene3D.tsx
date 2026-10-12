import { Canvas, useThree } from '@react-three/fiber'
import { useCallback, useEffect } from 'react'
import type { QualityTier } from '../../lib/webgl'
import { AdaptiveDpr } from './AdaptiveDpr'
import { Sculpture } from './Sculpture'
import { Starfield } from './Starfield'
import { StudioEnvironment } from './StudioEnvironment'

/** In reduced-motion mode the scene renders on demand: redraw only when scroll changes. */
function DemandDriver() {
  const invalidate = useThree((state) => state.invalidate)
  useEffect(() => {
    const onScroll = () => invalidate()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [invalidate])
  return null
}

export interface Scene3DProps {
  tier: QualityTier
  reducedMotion: boolean
  /** When false the render loop is paused (hero scrolled out of view, tab hidden). */
  active: boolean
  onReady: () => void
  onContextLost: () => void
}

/**
 * The procedural hero scene. Everything is generated in code: no external
 * models, textures or HDR files are downloaded.
 */
export default function Scene3D({ tier, reducedMotion, active, onReady, onContextLost }: Scene3DProps) {
  const maxDpr = tier === 'high' ? 1.75 : 1.5

  const handleCreated = useCallback(
    ({ gl }: { gl: { domElement: HTMLCanvasElement } }) => {
      gl.domElement.addEventListener(
        'webglcontextlost',
        (event) => {
          event.preventDefault()
          onContextLost()
        },
        { once: true },
      )
      onReady()
    },
    [onReady, onContextLost],
  )

  return (
    <Canvas
      dpr={[1, maxDpr]}
      camera={{ position: [0, 0, 9], fov: 35, near: 0.1, far: 80 }}
      gl={{ antialias: tier !== 'low', alpha: true, powerPreference: 'high-performance' }}
      frameloop={!active ? 'never' : reducedMotion ? 'demand' : 'always'}
      onCreated={handleCreated}
      aria-hidden="true"
      tabIndex={-1}
    >
      {!reducedMotion && <AdaptiveDpr />}

      <ambientLight intensity={0.18} color="#9aa4ff" />
      <directionalLight position={[4, 5, 6]} intensity={2.2} color="#d6deff" />
      <pointLight position={[-4, -2, 3]} intensity={28} color="#B18CFF" />
      <pointLight position={[3.5, -3, 2.5]} intensity={6} color="#A1F3DC" />

      {/* Reflections come from light panels rendered once into an environment map. */}
      <StudioEnvironment size={tier === 'low' ? 128 : 256} />

      {reducedMotion && <DemandDriver />}
      <Starfield tier={tier} reducedMotion={reducedMotion} />
      <Sculpture tier={tier} reducedMotion={reducedMotion} />
    </Canvas>
  )
}
