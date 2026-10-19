# Guía de estudio: Portafolio personal

Guía para entender, explicar y sustentar el código de este repositorio. Léela con el código abierto al lado: cada archivo tiene comentarios en español que complementan lo que se explica aquí.

---

## 1. ¿Qué es este proyecto?

Es el portafolio web de Sebastián Jaimes: una sola página (SPA, *Single Page Application*) que presenta quién es, sus habilidades, sus proyectos, su forma de trabajar y cómo contactarlo. Funciona en inglés y en español y tiene una escultura 3D interactiva que acompaña al usuario mientras baja por la página.

Se publica automáticamente en **GitHub Pages** cada vez que se sube un cambio a la rama `main`.

> **Ojo:** la descripción del repositorio en GitHub dice "HTML, CSS y JavaScript vanilla", pero el proyecto está hecho con **React + TypeScript**. Conviene corregir esa descripción para que no te pregunten por algo que no es.

## 2. Lenguajes y tecnologías

| Tecnología | Qué es | Para qué se usa aquí |
|---|---|---|
| **TypeScript** | JavaScript con tipos | Todo el código de `src/`. Los tipos evitan errores (ej. si falta una traducción, no compila). |
| **React 19** | Librería para construir interfaces con componentes | Cada sección de la página es un componente (`Hero`, `About`, `Skills`…). |
| **HTML** | Estructura | `index.html` (página base) y `404.html` (página de error). |
| **CSS** | Estilos | Un solo archivo, `src/styles/global.css`, con variables, BEM y diseño *mobile first*. |
| **Vite** | Servidor de desarrollo y empaquetador | `npm run dev` para trabajar, `npm run build` para generar `dist/`. |
| **Three.js + React Three Fiber** | Gráficos 3D en el navegador (WebGL) | La escultura, los anillos y las estrellas. |
| **GSAP + ScrollTrigger** | Librería de animaciones | Entradas al hacer scroll, parallax, línea de "Enfoque". |
| **lucide-react** | Íconos SVG | Íconos de botones y tarjetas. |
| **GitHub Actions** | Automatización (CI/CD) | Compila y publica el sitio en cada push a `main`. |

## 3. Cómo está organizado

```
├── index.html               Página base; React se monta en <div id="root">
├── 404.html                 Página de error (HTML + CSS puro)
├── vite.config.ts           Configuración de Vite (SEO, dos páginas, base del sitio)
├── .github/workflows/       deploy.yml: compila y publica en GitHub Pages
├── public/                  Archivos que se copian tal cual (CV en PDF, imágenes, favicon)
└── src/
    ├── main.tsx             Punto de entrada: carga fuentes y estilos y monta <App />
    ├── App.tsx              Arma la página: fondo, capa 3D, navbar, secciones, footer
    ├── components/          Un componente por sección + piezas reutilizables
    │   └── scene/           Todo lo 3D: Scene3D, Sculpture, Starfield, StudioEnvironment…
    ├── data/                Contenido: datos personales, proyectos, habilidades, traducciones
    ├── hooks/               Lógica reutilizable (scroll, media queries, recorrido 3D)
    ├── i18n/                Sistema de idiomas (Context + tipos)
    ├── lib/                 Utilidades (GSAP, WebGL, efecto spotlight, estado compartido 3D)
    └── styles/global.css    Todo el CSS
```

**Idea clave para sustentar:** el proyecto separa **contenido** (`data/`), **presentación** (`components/` + `global.css`) y **lógica** (`hooks/`, `lib/`). Si quieres cambiar un proyecto o un texto, no tocas componentes: editas `data/`.

## 4. ¿Qué pasa cuando alguien abre la página? (flujo)

1. El navegador descarga `index.html`, que carga `src/main.tsx`.
2. `main.tsx` importa las fuentes y el CSS, y monta `<App />` envuelto en `<LanguageProvider>`.
3. `LanguageProvider` lee el idioma guardado en `localStorage` (o usa inglés) y lo comparte con toda la app.
4. `App.tsx` comprueba si el navegador soporta WebGL (`isWebGLAvailable`).
   - Si sí: el estado de la escena empieza en `'loading'` y se descarga el código 3D por separado (*lazy loading*).
   - Si no: queda en `'failed'` y el Hero muestra una esfera hecha solo con CSS.
5. Se pintan la navbar y las secciones. Mientras tanto se descarga el código 3D; cuando el canvas está listo, avisa con `onReady` y el estado pasa a `'ready'`.
6. Al hacer scroll:
   - `useScrollReveal` hace aparecer los elementos con `data-reveal`.
   - `useSceneJourney` calcula hacia dónde debe moverse la escultura y lo escribe en `sceneState`.
   - La escultura lee `sceneState` en cada frame (`useFrame`) y se desliza suavemente hacia esa posición y color.
   - La `Navbar` actualiza la barra de progreso y resalta la sección visible.

## 5. Conceptos que debes dominar

**Componente.** Una función que devuelve JSX (HTML dentro de JavaScript). Ej.: `function Footer() { return <footer>…</footer> }`.

**Props.** Datos que un componente padre le pasa a un hijo. Ej.: `<Hero sceneStatus={sceneStatus} />`.

**Estado (`useState`).** Datos que cambian y, al cambiar, hacen que React vuelva a dibujar el componente. Ej.: `filter` en `Skills.tsx`, `open` en `Navbar.tsx`.

**Efectos (`useEffect` / `useLayoutEffect`).** Código que corre después de dibujar, para conectarse con cosas externas (eventos, animaciones). Siempre devuelven una función de **limpieza** que quita listeners al desmontar.

**`useRef`.** Guarda un valor o un elemento del DOM sin provocar re-render. Se usa para el `<dialog>`, el temporizador del botón "copiar" y la barra de progreso.

**Context (`createContext` + `useContext`).** Comparte datos con toda la app sin pasar props por cada nivel. Aquí: el idioma (`useLanguage()`).

**Custom hooks.** Funciones `useAlgo` que agrupan lógica reutilizable: `useScrollReveal`, `useSceneJourney`, `useMediaQuery`.

**`sceneState` en vez de estado de React.** El mouse y el scroll cambian decenas de veces por segundo. Si fueran `useState`, React re-dibujaría todo cada vez. Por eso se guardan en un objeto simple que la escena 3D lee en cada frame. **Esta es una de las mejores preguntas que te pueden hacer.**

**Lazy loading.** `lazy(() => import('./scene/Scene3D'))` separa three.js (~900 kB) en otro archivo que se descarga después, para que el texto aparezca rápido.

**Accesibilidad.** Enlace "saltar al contenido", `aria-label`, `aria-live`, `sr-only` (texto solo para lectores de pantalla), `inert` en el menú cerrado y respeto a `prefers-reduced-motion`.

**i18n con tipos.** `type Dictionary = typeof en`: el objeto en inglés define la forma y el español debe cumplirla. Si falta un texto, TypeScript no compila.

## 6. Archivos clave, uno por uno

| Archivo | Qué hace |
|---|---|
| `main.tsx` | Monta React y carga estilos/fuentes. |
| `App.tsx` | Estructura de la página y estado de la escena 3D. |
| `i18n/LanguageContext.tsx` | Idioma actual, guardado en localStorage, actualiza `<html lang>` y el título. |
| `data/site.ts` | Datos de contacto (única fuente de verdad). |
| `data/projects.ts` | Proyectos que se muestran. |
| `data/skills.ts` | Habilidades y categorías. |
| `data/translations.ts` | Todos los textos en inglés y español. |
| `components/Navbar.tsx` | Menú, progreso de lectura, sección activa, cambio de idioma, menú móvil. |
| `components/Hero.tsx` | Presentación principal y animación de entrada. |
| `components/Skills.tsx` | Tarjetas con filtro por categoría. |
| `components/Projects.tsx` + `ProjectDialog.tsx` | Tarjetas de proyectos y modal de detalle (usa `<dialog>` nativo). |
| `components/Contact.tsx` | Correo, copiar al portapapeles, CV y canales. |
| `components/SceneLayer.tsx` | Capa 3D fija, pausa al ocultar la pestaña, protegida con `ErrorBoundary`. |
| `components/scene/Sculpture.tsx` | La escultura 3D y su animación por frame. |
| `hooks/useSceneJourney.ts` | Traduce el scroll a posición/tamaño/color de la escultura. |
| `lib/webgl.ts` | Detecta WebGL y estima la calidad del dispositivo. |
| `vite.config.ts` | Etiquetas SEO, páginas a compilar y ruta base. |
| `.github/workflows/deploy.yml` | Publicación automática en GitHub Pages. |

## 7. Cómo ejecutarlo

```bash
npm install        # instala dependencias (una vez)
npm run dev        # servidor local con recarga automática
npm run typecheck  # revisa los tipos de TypeScript
npm run build      # genera la versión de producción en dist/
npm run preview    # sirve dist/ para probarla
```

## 8. Preguntas de sustentación (con respuesta)

1. **¿Por qué React y no HTML/JS puro?** Porque la página tiene partes que cambian (idioma, filtros, modal, menú). React actualiza solo lo necesario cuando cambia el estado, y los componentes se reutilizan (ej. `SectionHeading` en todas las secciones).
2. **¿Para qué sirve TypeScript aquí?** Para detectar errores al compilar: si un proyecto no tiene un campo obligatorio o falta una traducción, el build falla antes de publicar.
3. **¿Cómo funciona el cambio de idioma?** Un Context guarda el idioma; todos los componentes leen los textos con `useLanguage()`. Al cambiarlo se guarda en localStorage y se actualizan `<html lang>`, el título y la meta descripción.
4. **¿Por qué la posición del mouse no está en `useState`?** Porque cambia muchas veces por segundo; con estado de React habría re-renders constantes. Se guarda en `sceneState` y la escena 3D la lee en cada frame.
5. **¿Qué pasa si el navegador no soporta WebGL?** `isWebGLAvailable()` devuelve false, la escena no se carga y se muestra una esfera hecha con CSS. Además, `ErrorBoundary` evita que un error del 3D tumbe la página.
6. **¿Cómo cuidas el rendimiento?** Lazy loading del 3D, calidad según el dispositivo (`getQualityTier`), baja de resolución si los FPS caen (`AdaptiveDpr`), pausa del render cuando la pestaña está oculta y `requestAnimationFrame` para el scroll.
7. **¿Qué hiciste por la accesibilidad?** Enlace para saltar al contenido, etiquetas `aria`, textos para lectores de pantalla, navegación con teclado en el menú y el modal, y animaciones desactivadas con "reducir movimiento".
8. **¿Cómo se publica?** GitHub Actions corre `npm ci` y `npm run build` en cada push a `main` y sube `dist/` a GitHub Pages.
9. **¿Qué es `useEffect` y por qué devuelve una función?** Ejecuta código después de renderizar; la función que devuelve es la limpieza, que quita listeners y observers al desmontar para no dejar fugas de memoria.
10. **¿Cómo agregarías un proyecto nuevo?** Agregando un objeto en `src/data/projects.ts` (y su imagen en `public/images/`). No hace falta tocar ningún componente.

## 9. Retos para practicar (hazlos tú, sin ayuda)

1. **Fácil:** agrega una habilidad nueva (por ejemplo, TypeScript) en `data/skills.ts` y comprueba que aparece y se puede filtrar.
2. **Medio:** agrega Emirate Scents a `data/projects.ts` con su enlace real y verifica que el modal muestra sus funciones.
3. **Medio:** cambia el tiempo que dura el mensaje "Copiado" en `Contact.tsx` y explica qué hace `clearTimeout`.
4. **Avanzado:** agrega un tercer idioma (por ejemplo, portugués). Pista: empieza por el tipo `Lang` en `i18n/types.ts` y deja que TypeScript te diga qué más falta.
