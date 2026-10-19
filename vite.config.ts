/**
 * Configuración de Vite (herramienta que sirve el proyecto en desarrollo y lo compila para producción).
 *
 * - Usa el plugin de React.
 * - Inserta etiquetas SEO (Open Graph / Twitter) con la URL real del sitio.
 * - Compila dos páginas: index.html y 404.html.
 * - SINGLE_FILE=1 genera un solo archivo HTML (solo para vistas previas).
 */
import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

/**
 * Injects canonical / Open Graph URL tags only when VITE_SITE_URL is defined,
 * so the build never ships an invented domain.
 */
function seoUrls(siteUrl: string, base: string): Plugin {
  return {
    name: 'seo-urls',
    transformIndexHtml(html, ctx) {
      if (!ctx.filename.endsWith('index.html')) return html
      const clean = siteUrl.replace(/\/+$/, '')
      const image = clean ? `${clean}/og-image.jpg` : `${base}og-image.jpg`
      const tags = [
        `<meta property="og:image" content="${image}" />`,
        `<meta name="twitter:image" content="${image}" />`,
      ]
      if (clean) {
        tags.unshift(`<link rel="canonical" href="${clean}/" />`, `<meta property="og:url" content="${clean}/" />`)
      }
      return html.replace('</head>', `    ${tags.join('\n    ')}\n  </head>`)
    },
  }
}

// mode = "development" o "production". loadEnv lee las variables de entorno (.env y las del workflow).
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const base = env.BASE_PATH || '/'
  // Single-file build used only to publish a live preview (fonts and the 3D chunk inlined).
  const singleFile = env.SINGLE_FILE === '1'
  return {
    base,
    plugins: [react(), seoUrls(env.VITE_SITE_URL ?? '', base)],
    build: {
      target: 'es2022',
      // three.js alone is ~700 kB minified; it lives in a lazily loaded chunk.
      chunkSizeWarningLimit: 1000,
      ...(singleFile
        ? {
            outDir: 'dist-single',
            assetsInlineLimit: 100_000_000,
            cssCodeSplit: false,
            rollupOptions: { output: { inlineDynamicImports: true } },
          }
        : {
            rollupOptions: {
              input: {
                main: resolve(import.meta.dirname, 'index.html'),
                notFound: resolve(import.meta.dirname, '404.html'),
              },
            },
          }),
    },
  }
})
