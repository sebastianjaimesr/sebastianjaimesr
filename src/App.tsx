/**
 * Componente raíz del portafolio.
 *
 * Arma la página completa en orden: enlace de accesibilidad, fondo decorativo,
 * capa 3D, barra de navegación, las secciones principales y el pie de página.
 * También decide si la escena 3D se puede mostrar (según soporte WebGL) y
 * guarda su estado para que el Hero sepa cuándo ocultar la esfera de respaldo.
 */
import { useCallback, useState } from 'react'
import { About } from './components/About'
import { Approach } from './components/Approach'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { SceneLayer, type SceneStatus } from './components/SceneLayer'
import { Skills } from './components/Skills'
import { useScrollReveal } from './hooks/useScrollReveal'
import { useLanguage } from './i18n/LanguageContext'
import { isWebGLAvailable } from './lib/webgl'

export default function App() {
  // t = diccionario de textos del idioma actual (inglés o español).
  const { t } = useLanguage()
  // Activa las animaciones de aparición al hacer scroll en todos los elementos con data-reveal.
  useScrollReveal()
  // Estado de la escena 3D. Si el navegador no soporta WebGL, empieza directamente en 'failed'.
  // Se pasa una función a useState para que la comprobación se haga solo en el primer render.
  const [sceneStatus, setSceneStatus] = useState<SceneStatus>(() => (isWebGLAvailable() ? 'loading' : 'failed'))
  // useCallback mantiene la misma función entre renders, así SceneLayer no se re-renderiza sin necesidad.
  const handleReady = useCallback(() => setSceneStatus('ready'), [])
  const handleFailure = useCallback(() => setSceneStatus('failed'), [])

  return (
    <>
      {/* Enlace oculto que aparece al tabular: permite saltar directo al contenido (accesibilidad). */}
      <a className="skip-link" href="#main">
        {t.skipLink}
      </a>
      {/* Fondo decorativo (manchas de color, cuadrícula y ruido). aria-hidden lo oculta a lectores de pantalla. */}
      <div className="backdrop" aria-hidden="true">
        <span className="backdrop__blob backdrop__blob--a" />
        <span className="backdrop__blob backdrop__blob--b" />
        <span className="backdrop__grid" />
        <span className="backdrop__noise" />
      </div>
      {/* Capa 3D fija detrás del contenido; avisa cuando está lista o si falla. */}
      <SceneLayer status={sceneStatus} onReady={handleReady} onFailure={handleFailure} />
      <Navbar />
      {/* tabIndex={-1} permite que el skip-link mueva el foco a <main>. */}
      <main id="main" tabIndex={-1}>
        <Hero sceneStatus={sceneStatus} />
        <About />
        <Skills />
        <Projects />
        <Approach />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
