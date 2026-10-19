/**
 * Hook de animaciones de aparición al hacer scroll.
 */
import { useLayoutEffect } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

/**
 * Hace aparecer cada elemento con [data-reveal] cuando entra en pantalla y
 * aplica un parallax lento a los elementos con [data-parallax]. Se desactiva
 * por completo si el usuario prefiere menos movimiento, para que el contenido
 * siempre sea visible.
 */
export function useScrollReveal() {
  // useLayoutEffect corre antes de que el navegador pinte: así los elementos se ocultan
  // antes de verse, evitando un "parpadeo" de contenido visible que luego desaparece.
  useLayoutEffect(() => {
    // matchMedia de GSAP: las animaciones solo se crean si la media query se cumple,
    // y se deshacen solas si deja de cumplirse.
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const items = gsap.utils.toArray<HTMLElement>('main [data-reveal]')
      // Estado inicial: invisibles y 28 px más abajo.
      gsap.set(items, { opacity: 0, y: 28 })
      // batch agrupa los elementos que entran a la vez y los anima en cascada (stagger).
      ScrollTrigger.batch(items, {
        start: 'top 90%', // cuando el borde superior llega al 90 % de la altura de la pantalla
        once: true, // solo la primera vez
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, stagger: 0.08, duration: 0.9, overwrite: true, clearProps: 'transform' }),
      })
      // Parallax: el elemento se mueve de +25 % a -25 % mientras su contenedor cruza la pantalla.
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: 25 },
          {
            yPercent: -25,
            ease: 'none',
            // scrub: true ata la animación directamente a la posición del scroll.
            scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })
    })
    // Recalcula posiciones cuando las fuentes terminan de cargar y el diseño se estabiliza.
    document.fonts?.ready.then(() => ScrollTrigger.refresh()).catch(() => {})
    // Limpieza: al desmontar, revierte todas las animaciones creadas.
    return () => mm.revert()
  }, [])
}
