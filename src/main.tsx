/**
 * Punto de entrada de la aplicación React.
 *
 * Vite carga este archivo desde index.html (<script type="module" src="/src/main.tsx">).
 * Aquí se importan las fuentes y los estilos globales una sola vez, y se "monta"
 * el componente raíz <App /> dentro del <div id="root"> del HTML.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Fuentes auto-alojadas (vienen de npm, no de Google Fonts): Manrope para textos y JetBrains Mono para etiquetas.
import '@fontsource-variable/manrope'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/500.css'
import './styles/global.css'
import App from './App'
import { LanguageProvider } from './i18n/LanguageContext'

// El "!" le dice a TypeScript que el elemento #root siempre existe (está en index.html).
createRoot(document.getElementById('root')!).render(
  // StrictMode solo actúa en desarrollo: ejecuta efectos dos veces para detectar errores.
  <StrictMode>
    {/* LanguageProvider envuelve toda la app para que cualquier componente pueda leer el idioma actual. */}
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)
