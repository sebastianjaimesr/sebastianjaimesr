import { useLayoutEffect } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

/**
 * Reveals every [data-reveal] element as it enters the viewport and adds a
 * slow parallax to [data-parallax] elements. Disabled entirely when the user
 * prefers reduced motion, so content is always visible.
 */
export function useScrollReveal() {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const items = gsap.utils.toArray<HTMLElement>('main [data-reveal]')
      gsap.set(items, { opacity: 0, y: 28 })
      ScrollTrigger.batch(items, {
        start: 'top 90%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, stagger: 0.08, duration: 0.9, overwrite: true, clearProps: 'transform' }),
      })
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: 25 },
          {
            yPercent: -25,
            ease: 'none',
            scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })
    })
    // Recalculate positions once fonts have loaded and layout settles.
    document.fonts?.ready.then(() => ScrollTrigger.refresh()).catch(() => {})
    return () => mm.revert()
  }, [])
}
