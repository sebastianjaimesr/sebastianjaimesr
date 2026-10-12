import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useMediaQuery'
import { useSceneJourney } from '../hooks/useSceneJourney'
import { getQualityTier } from '../lib/webgl'
import { ErrorBoundary } from './ErrorBoundary'

// The 3D scene (three.js + R3F) is split into its own chunk so text paints first.
const Scene3D = lazy(() => import('./scene/Scene3D'))

export type SceneStatus = 'loading' | 'ready' | 'failed'

interface SceneLayerProps {
  status: SceneStatus
  onReady: () => void
  onFailure: () => void
}

/**
 * A fixed, full-viewport WebGL layer behind the page content. The sculpture
 * starts in the hero and travels with the reader through every section.
 */
export function SceneLayer({ status, onReady, onFailure }: SceneLayerProps) {
  const reducedMotion = useReducedMotion()
  const fadeRef = useRef<HTMLDivElement>(null)
  const tier = useMemo(getQualityTier, [])
  const [active, setActive] = useState(() => document.visibilityState === 'visible')

  useSceneJourney(fadeRef, reducedMotion)

  // Pause the render loop while the tab is hidden.
  useEffect(() => {
    const update = () => setActive(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', update)
    return () => document.removeEventListener('visibilitychange', update)
  }, [])

  if (status === 'failed') return null

  return (
    <div className={`scene-layer${status === 'ready' ? ' is-ready' : ''}`}>
      <div className="scene-layer__fade" ref={fadeRef}>
        <ErrorBoundary fallback={null} onError={onFailure}>
          <Suspense fallback={null}>
            <Scene3D tier={tier} reducedMotion={reducedMotion} active={active} onReady={onReady} onContextLost={onFailure} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  )
}
