/**
 * Capa fija de pantalla completa que contiene la escena 3D, detrás del contenido.
 */
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
  // Calidad gráfica según el dispositivo; se calcula una sola vez.
  const tier = useMemo(getQualityTier, [])
  // active = la pestaña está visible. Si no, se pausa el render para ahorrar batería.
  const [active, setActive] = useState(() => document.visibilityState === 'visible')

  // Conecta el scroll con la posición, tamaño y color de la escultura.
  useSceneJourney(fadeRef, reducedMotion)

  // Pause the render loop while the tab is hidden.
  useEffect(() => {
    const update = () => setActive(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', update)
    return () => document.removeEventListener('visibilitychange', update)
  }, [])

  // Si no hay WebGL o la escena falló, no se dibuja nada (el Hero muestra la esfera CSS).
  if (status === 'failed') return null

  return (
    <div className={`scene-layer${status === 'ready' ? ' is-ready' : ''}`}>
      <div className="scene-layer__fade" ref={fadeRef}>
        {/* ErrorBoundary evita que un error del 3D tumbe la página. Suspense espera a que descargue el código 3D (lazy). */}
        <ErrorBoundary fallback={null} onError={onFailure}>
          <Suspense fallback={null}>
            <Scene3D tier={tier} reducedMotion={reducedMotion} active={active} onReady={onReady} onContextLost={onFailure} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  )
}
