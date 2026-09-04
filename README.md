# Portafolio — Juan Sebastian Jaimes Rolon

Portafolio personal de **Junior Developer — Backend & Frontend**.
HTML, CSS y JavaScript vanilla. Sin frameworks, sin build, sin dependencias.

---

## Cómo ejecutarlo

**Opción 1 — doble clic**
Abre `index.html` en cualquier navegador. Funciona directamente.

**Opción 2 — Visual Studio Code (recomendado)**

1. Abre la carpeta en VS Code: `Archivo → Abrir carpeta…`
2. Instala la extensión **Live Server** (Ritwick Dey).
3. Clic derecho sobre `index.html` → **Open with Live Server**.

Se abrirá en `http://127.0.0.1:5500` y se recargará solo al guardar cambios.

> Las tipografías se cargan desde Google Fonts, así que la primera vez
> necesitas conexión a internet. Sin conexión el sitio funciona igual,
> con tipografías del sistema como reserva.

---

## Estructura

```
juan-sebastian-portfolio/
│
├── index.html                 Estructura y contenido
│
├── css/
│   └── styles.css             Todos los estilos (con índice numerado arriba)
│
├── js/
│   └── script.js              Navegación, animaciones y enlaces
│
├── assets/
│   ├── images/
│   │   ├── profile.jpg        Tu retrato — 900×1200
│   │   ├── profile.webp       Misma foto, formato ligero
│   │   └── og-image.jpg       Vista previa al compartir en redes — 1200×630
│   └── icons/
│       └── favicon.svg        Icono de la pestaña
│
├── cv/
│   └── Juan_Sebastian_Jaimes_CV.pdf
│
└── README.md
```

---

## ⚠ Una incoherencia que debes resolver

Tu **CV dice `inglés — A2 (proceso de mejora)`** y el **portafolio dice `B1`**,
porque así me lo indicaste tú.

Un reclutador que abra los dos lo va a notar, y eso resta credibilidad.
Elige uno y déjalo igual en ambos sitios:

- Si tu nivel real es **B1**: actualiza el PDF de tu CV.
- Si tu nivel real es **A2**: cámbialo en `index.html` (busca `B1`, aparece
  dos veces: en la tarjeta de estadísticas y en la sección Formación).

---

## Configuración de enlaces

Todos los enlaces se controlan en un solo sitio: **`js/script.js`, líneas 14–20**.

```js
var LINKS = {
  'cv':       'cv/Juan_Sebastian_Jaimes_CV.pdf',                    // listo
  'linkedin': 'https://www.linkedin.com/in/sebastian-jaimes-...',   // listo
  'demo-1':   '',   // URL de la demo de Préstamo de Herramientas
  'demo-2':   '',   // URL de la demo de Reservas de Salas
  'demo-3':   ''    // URL de la demo de Space Rides
};
```

**CV y LinkedIn ya están activos.** Los tres `demo-` siguen vacíos: mientras no
tengan URL, el botón "Ver proyecto" muestra un aviso en lugar de fingir una demo.
En cuanto escribas una URL entre las comillas, el enlace se activa solo.

### Publicar una demo (recomendado)

**Space Rides** es HTML y CSS puro, así que puede tener demo en cinco minutos:
sube el repositorio a GitHub → `Settings → Pages` → rama `main` → `/ (root)`.
Pega la URL resultante en `'demo-3'` y listo. Un enlace donde el reclutador
*toca* tu trabajo vale mucho más que un repositorio.

### Repositorios de los proyectos

Los botones **GitHub** apuntan hoy a tu perfil general.
Cámbialos al repositorio concreto de cada proyecto:
en `index.html`, busca las tres apariciones de

```
https://github.com/sebastianjaimesr
```

y sustituye cada una por la URL de su repositorio.

### Capturas de los proyectos

Ahora mismo cada proyecto muestra una maqueta abstracta dibujada con CSS.
Para poner capturas reales, guarda tus imágenes con estos nombres exactos:

```
assets/images/proyecto-1.jpg    Préstamo de Herramientas
assets/images/proyecto-2.jpg    Reservas de Salas
assets/images/proyecto-3.jpg    Space Rides
```

No hay que tocar código: si el archivo existe, la captura aparece encima
de la maqueta; si no existe, se muestra la maqueta. Tamaño recomendado
**1200×750** (proporción 16:10).

---

## Publicarlo gratis en GitHub Pages

1. Sube la carpeta a un repositorio nuevo.
2. En el repositorio: `Settings → Pages`.
3. En *Source* elige la rama `main` y la carpeta `/ (root)`.
4. En un minuto tendrás `https://sebastianjaimesr.github.io/nombre-del-repo`.

Ese enlace es el que conviene poner en tu CV y en LinkedIn.

---

## Detalles técnicos

**Rendimiento** — Sin librerías externas. El único recurso de red son las
tipografías. Las animaciones usan `IntersectionObserver` y `requestAnimationFrame`,
nunca `setInterval`. Las imágenes de proyecto usan `decoding="async"`; el
retrato del hero lleva `fetchpriority="high"` por ser lo primero que se ve.

**Accesibilidad** — HTML semántico (`header`, `nav`, `main`, `section`, `footer`),
enlace de salto al contenido, foco visible en oro en todo elemento interactivo,
menú móvil cerrable con `Esc`, textos alternativos reales y estado indicado con
color **y** texto (nunca solo con color).

**Movimiento reducido** — Con `prefers-reduced-motion: reduce` el sitio
desactiva revelados, parallax y halo del cursor, y muestra todo el contenido fijo.

**Responsive** — Escrito *mobile first*. Verificado en 320, 375, 414, 480, 768,
1024, 1280, 1440 y 1920 px, sin scroll horizontal en ningún ancho.

**SEO** — `title`, `meta description`, Open Graph con imagen propia, favicon
SVG, un único `h1` y jerarquía correcta de encabezados.

---

## Tratamiento de la fotografía

`profile.jpg` no es la foto original tal cual: se recortó a retrato 3:4
centrado en el rostro, se comprimieron las altas luces para bajar el brillo
de la nieve, se aplicó un viraje cálido y una viñeta elíptica que oscurece
el fondo y deja iluminada la cara. Así la foto convive con el fondo negro.

La imagen original está intacta en tu carpeta de Descargas por si quieres
rehacer el recorte.

---

## Créditos

Tipografías vía Google Fonts:
**Sora** (títulos) · **Outfit** (interfaz) · **JetBrains Mono** (datos).
