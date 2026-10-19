/**
 * Estado mutable compartido entre el DOM y la escena WebGL. Lo escriben los
 * listeners de eventos (mouse, scroll) y lo lee el bucle de render en cada frame.
 *
 * ¿Por qué un objeto simple y no useState? Porque el mouse y el scroll cambian
 * decenas de veces por segundo; si fuera estado de React, cada cambio provocaría
 * un re-render. Así la escena 3D se actualiza sin tocar React.
 */
export const sceneState = {
  /** Posición del puntero en coordenadas normalizadas (-1..1). */
  pointer: { x: 0, y: 0 },
  /** 0 arriba del hero, 1 cuando el hero ya salió de la pantalla. */
  scroll: 0,
  /** 0 al inicio de la página, 1 al final. */
  page: 0,
  /** Velocidad reciente del scroll, de 0 a 1. Se escribe al hacer scroll y decae en el bucle de render. */
  velocity: 0,
  /** Dónde debe ubicarse la escultura (en coordenadas de pantalla -1..1); lo define useSceneJourney. */
  anchor: { x: 0.45, y: 0, size: 0.6, ready: false },
  /** Índice de la paleta de colores (los decimales mezclan dos paletas vecinas). */
  tint: 0,
  /** Momento (performance.now()) en que el usuario tocó la escultura; dispara el "pulso". */
  pulseAt: -Infinity,
}
