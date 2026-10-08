# Portafolio — Juan Sebastián Jaimes Rolón

Portafolio personal de desarrollador Full-Stack Junior. Construido con **HTML, CSS y JavaScript vanilla**: sin frameworks, sin build y sin dependencias.

🔗 **Ver en vivo:** https://sebastianjaimesr.github.io

## Qué incluye

- Presentación, habilidades, proyectos, formación y contacto
- CV descargable en PDF
- Tarjetas de proyecto con enlace al repositorio y a la demo
- Diseño responsive (mobile first), verificado desde 320 px hasta 1920 px

## Decisiones técnicas

- **Rendimiento:** sin librerías externas; animaciones con `IntersectionObserver` y `requestAnimationFrame`; imágenes con `decoding="async"` y `fetchpriority="high"` en el retrato principal.
- **Accesibilidad:** HTML semántico, enlace de salto al contenido, foco visible en todos los elementos interactivos, menú móvil cerrable con `Esc` y textos alternativos reales.
- **Movimiento reducido:** con `prefers-reduced-motion: reduce` se desactivan revelados, parallax y efectos de cursor.
- **SEO:** `title`, meta description, Open Graph con imagen propia, favicon SVG y jerarquía de encabezados correcta.
- **Configuración centralizada:** todos los enlaces (CV, LinkedIn, demos) se controlan desde un solo objeto en `js/script.js`.

## Estructura

```
├── index.html
├── css/styles.css
├── js/script.js
├── assets/
│   ├── images/   (retrato, capturas de proyectos, imagen Open Graph)
│   └── icons/favicon.svg
└── cv/Juan_Sebastian_Jaimes_CV.pdf
```

## Ejecutar en local

Abre `index.html` en el navegador, o usa la extensión **Live Server** de VS Code.

## Tecnologías

HTML5 · CSS3 · JavaScript (ES6+) · Google Fonts (Sora, Outfit, JetBrains Mono) · GitHub Pages

## Contacto

📧 jsrolon01@gmail.com · [LinkedIn](https://www.linkedin.com/in/sebastian-jaimes-1a2259398) · [GitHub](https://github.com/sebastianjaimesr)
