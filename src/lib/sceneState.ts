/**
 * Mutable state shared between the DOM and the WebGL scene. It is written by
 * event listeners and read inside the render loop, so pointer and scroll
 * movement never trigger React re-renders.
 */
export const sceneState = {
  /** Pointer position in normalized device coordinates (-1..1). */
  pointer: { x: 0, y: 0 },
  /** 0 at the top of the hero, 1 once the hero has scrolled out of view. */
  scroll: 0,
  /** Where the sculpture should sit, in hero-relative NDC, measured from the DOM stage. */
  anchor: { x: 0.45, y: 0, size: 0.6, ready: false },
  /** Set to performance.now() when the user taps the sculpture. */
  pulseAt: -Infinity,
}
