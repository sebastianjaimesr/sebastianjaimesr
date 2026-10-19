/**
 * Configuración central de GSAP (librería de animaciones).
 *
 * Se registra el plugin ScrollTrigger (animaciones ligadas al scroll) y se
 * definen valores por defecto. Los demás archivos importan gsap desde aquí,
 * así la configuración se aplica una sola vez en toda la app.
 */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
// Todas las animaciones usan esta curva suave de salida y duran 0.9 s, salvo que se indique otra cosa.
gsap.defaults({ ease: 'power3.out', duration: 0.9 })

export { gsap, ScrollTrigger }
