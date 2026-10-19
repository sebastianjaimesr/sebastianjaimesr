/** Tipos compartidos del sistema de idiomas. */

/** Idiomas soportados: inglés ('en') y español ('es'). */
export type Lang = 'en' | 'es'
/**
 * Un valor traducido: un objeto con una versión por idioma.
 * Ejemplo: { en: 'Hello', es: 'Hola' }. Por defecto el valor es texto (string),
 * pero puede ser otro tipo, como Localized<string[]> para listas.
 */
export type Localized<T = string> = Record<Lang, T>
