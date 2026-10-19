/**
 * Hook que conecta el scroll de la página con la escena 3D.
 *
 * A medida que el usuario baja, la escultura 3D "viaja" a una posición, tamaño
 * y color distintos para cada sección. Este hook calcula esos valores y los
 * escribe en sceneState, que la escena lee en cada frame.
 */
import { useEffect, type RefObject } from 'react'
import { sceneState } from '../lib/sceneState'

/** Una "parada" del recorrido: dónde y cómo se ve la escultura en una sección. */
interface Key {
  /** Centro en coordenadas de pantalla (-1..1, con y hacia arriba). */
  x: number
  y: number
  /** Diámetro como fracción de la altura de la pantalla. */
  size: number
  /** Índice de paleta de colores que usa la escultura. */
  tint: number
  /** Opacidad de toda la capa 3D, para que el texto siga siendo legible encima. */
  fade: number
}

/** Secciones que recorre la escultura, en el orden de la página, después del hero. */
const SECTIONS = ['about', 'skills', 'projects', 'approach', 'contact']

// En escritorio las paradas quedan en los bordes, lejos de los títulos alineados a la izquierda.
const DESKTOP: Key[] = [
  { x: 0.9, y: -0.68, size: 0.4, tint: 1, fade: 0.7 },
  { x: -0.84, y: 0.5, size: 0.34, tint: 2, fade: 0.7 },
  { x: 0.86, y: 0.55, size: 0.32, tint: 3, fade: 0.7 },
  { x: -0.86, y: 0.55, size: 0.36, tint: 4, fade: 0.7 },
  { x: 0.7, y: 0.32, size: 0.5, tint: 5, fade: 0.85 },
]

// En móvil la escultura es más pequeña y más transparente para no tapar el texto.
const MOBILE: Key[] = [
  { x: 0.78, y: 0.55, size: 0.3, tint: 1, fade: 0.5 },
  { x: -0.8, y: 0.45, size: 0.28, tint: 2, fade: 0.45 },
  { x: 0.8, y: 0.6, size: 0.26, tint: 3, fade: 0.45 },
  { x: -0.78, y: 0.5, size: 0.3, tint: 4, fade: 0.45 },
  { x: 0.75, y: 0.55, size: 0.34, tint: 5, fade: 0.55 },
]

// Funciones matemáticas pequeñas:
/** Limita un número al rango 0..1. */
const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
/** Curva suave: empieza y termina despacio (para que el movimiento no sea brusco). */
const smoothstep = (t: number) => t * t * (3 - 2 * t)
/** Interpolación lineal: el valor que está a una fracción t entre a y b. */
const mix = (a: number, b: number, t: number) => a + (b - a) * t

/**
 * Controla la escena 3D persistente según el scroll: la escultura empieza en el
 * escenario del hero y luego se desliza a una nueva posición y color en cada
 * sección. Con "reducir movimiento" se queda pegada al hero y se va con él.
 *
 * @param fadeRef elemento cuya opacidad se ajusta (la capa 3D)
 * @param reducedMotion true si el usuario prefiere menos animaciones
 */
export function useSceneJourney(fadeRef: RefObject<HTMLElement | null>, reducedMotion: boolean) {
  useEffect(() => {
    // Medidas que se recalculan al cambiar el tamaño de la ventana.
    let vw = window.innerWidth
    let vh = window.innerHeight
    let maxScroll = 1
    let stage = { x: vw * 0.7, y: vh * 0.5, size: 0.6 } // centro del escenario del hero, en píxeles
    let stops: { at: number; key: Key }[] = [] // en qué posición de scroll empieza cada parada
    let lastY = window.scrollY
    let lastT = performance.now()

    // Posición "de casa": centrada en el escenario del hero, que sube a medida que se hace scroll.
    // Convierte píxeles a coordenadas -1..1 (y se invierte porque en pantalla y crece hacia abajo).
    const home = (scrollY: number): Key => ({
      x: (stage.x / vw) * 2 - 1,
      y: -(((stage.y - scrollY) / vh) * 2 - 1),
      size: stage.size,
      tint: 0,
      fade: 1,
    })

    /** Se ejecuta en cada evento de scroll: calcula dónde debe estar la escultura ahora. */
    const update = () => {
      const s = window.scrollY
      const now = performance.now()
      const dt = Math.max(16, now - lastT)
      // Velocidad del scroll (píxeles por milisegundo, escalada a 0..1). Solo sube aquí; baja en la escena.
      sceneState.velocity = Math.max(sceneState.velocity, clamp01(Math.abs(s - lastY) / dt / 4))
      lastY = s
      lastT = now

      let key = home(s)
      if (!reducedMotion && stops.length) {
        let prevAt = 0
        // Recorre las paradas: las ya pasadas se toman tal cual; la siguiente se mezcla poco a poco.
        for (let i = 0; i < stops.length; i++) {
          const stop = stops[i]
          if (s >= stop.at) {
            key = stop.key
            prevAt = stop.at
            continue
          }
          // La transición ocurre en una ventana de hasta 80 % de la altura de la pantalla antes de la parada.
          const window_ = Math.min(vh * 0.8, stop.at - prevAt)
          const t = smoothstep(clamp01((s - (stop.at - window_)) / window_))
          key = {
            x: mix(key.x, stop.key.x, t),
            y: mix(key.y, stop.key.y, t),
            size: mix(key.size, stop.key.size, t),
            tint: mix(key.tint, stop.key.tint, t),
            fade: mix(key.fade, stop.key.fade, t),
          }
          break
        }
      }

      // Publica el resultado en el estado compartido que lee la escena 3D.
      sceneState.anchor.x = key.x
      sceneState.anchor.y = key.y
      sceneState.anchor.size = key.size
      sceneState.anchor.ready = true
      sceneState.tint = key.tint
      sceneState.scroll = clamp01(s / vh)
      sceneState.page = clamp01(s / maxScroll)
      // La opacidad se escribe directo en el DOM (sin re-render de React).
      if (fadeRef.current) fadeRef.current.style.opacity = key.fade.toFixed(3)
    }

    /** Mide la ventana, el escenario del hero y la posición de cada sección. */
    const measure = () => {
      vw = window.innerWidth
      vh = window.innerHeight
      maxScroll = Math.max(1, document.documentElement.scrollHeight - vh)
      const stageEl = document.querySelector('.hero__stage')
      if (stageEl) {
        const r = stageEl.getBoundingClientRect()
        stage = { x: r.left + r.width / 2, y: r.top + r.height / 2 + window.scrollY, size: Math.min(r.width, r.height) / vh }
      }
      // A partir de 900 px de ancho se usan las paradas de escritorio.
      const keys = vw >= 900 ? DESKTOP : MOBILE
      stops = []
      SECTIONS.forEach((id, i) => {
        const el = document.getElementById(id)
        if (!el) return
        const top = el.getBoundingClientRect().top + window.scrollY
        // La parada se alcanza cuando la sección está a 40 % de la altura de pantalla del borde superior.
        stops.push({ at: Math.min(maxScroll, top - vh * 0.4), key: keys[i] })
      })
      update()
    }

    /** Guarda la posición del puntero en coordenadas -1..1 (para el efecto parallax). */
    const onPointer = (event: PointerEvent) => {
      sceneState.pointer.x = (event.clientX / window.innerWidth) * 2 - 1
      sceneState.pointer.y = -((event.clientY / window.innerHeight) * 2 - 1)
    }

    measure()
    // ResizeObserver detecta cambios de altura de la página (por ejemplo, cuando cargan imágenes).
    const observer = new ResizeObserver(measure)
    observer.observe(document.body)
    window.addEventListener('resize', measure)
    // passive: true le promete al navegador que no se bloqueará el scroll, así va más fluido.
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('pointermove', onPointer, { passive: true })
    // Limpieza al desmontar: se quitan todos los listeners para no dejar fugas de memoria.
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', update)
      window.removeEventListener('pointermove', onPointer)
    }
  }, [fadeRef, reducedMotion])
}
