# Sebastian Jaimes · Digital Universe

Immersive personal portfolio for **Sebastian Jaimes**, Full-Stack Developer in Training from Bucaramanga, Colombia.

A static single-page site with a real-time, procedurally generated 3D scene (Three.js + React Three Fiber), English/Spanish content, GSAP scroll motion, and a full fallback for devices without WebGL.

---

## Stack

| Area | Choice | Why |
| --- | --- | --- |
| UI | React 19 + TypeScript | Typed components and data files |
| Build | Vite 8 | Fast dev server, static output |
| 3D | three 0.182 + @react-three/fiber 9 | Real WebGL scene, declarative and disposed automatically |
| Motion | GSAP 3 + ScrollTrigger | Entrance timeline, scroll reveals, scrubbed parallax |
| Icons | lucide-react + inline SVG brand marks | Accessible, tree-shaken |
| Fonts | Manrope (variable) + JetBrains Mono, self-hosted via Fontsource | No external font requests |

Notes on versions:

- **three is pinned to `~0.182`.** Starting with r183, three logs a deprecation warning for `THREE.Clock`, which React Three Fiber 9 still uses internally. 0.182 keeps the console clean. When a Fiber release switches to `THREE.Timer`, you can upgrade three freely.
- **No `@react-three/drei`.** The two helpers the scene needed (an environment map and adaptive resolution) are implemented in ~100 lines (`StudioEnvironment.tsx`, `AdaptiveDpr.tsx`), which avoids bundling HDR/EXR loaders that were never used.

There is no backend. The build output in `dist/` can be hosted on any static host.

---

## Getting started

Requirements: **Node.js 20.19+** (22 LTS recommended) and npm.

```bash
npm install        # install dependencies
npm run dev        # start the dev server at http://localhost:5173
npm run build      # type-check and build the production site into dist/
npm run preview    # serve dist/ locally at http://localhost:4173
npm run typecheck  # type-check only
```

---

## Editing content

All personal content lives in `src/data/`. Components never hard-code it.

| File | What it controls |
| --- | --- |
| `src/data/site.ts` | Name, location, email, phone, WhatsApp, GitHub and LinkedIn URLs, availability indicator |
| `src/data/projects.ts` | Project cards: name, descriptions (EN/ES), features, tech, status, repository and demo URLs, optional image |
| `src/data/skills.ts` | Technologies, categories and short EN/ES notes (no percentages or levels by design) |
| `src/data/translations.ts` | Every piece of interface copy in English and Spanish |

### Adding or updating a project

1. Open `src/data/projects.ts` and copy an existing entry.
2. Set `status`:
   - `'verified'`: published, `repoUrl` required.
   - `'in-progress'`: still being built.
   - `'unverified'`: concept or project awaiting confirmation. The card says so and links to the GitHub profile instead of a repository.
3. Fill `repoUrl` and `demoUrl` **only with real URLs**. Leave `null` otherwise; the buttons appear automatically when a value exists.
4. Optional screenshot: add it to `public/images/` and set `image: 'images/<file>.webp'` (about 1200×660, WebP/AVIF under ~150 kB).

### Translations

`translations.ts` exports an English dictionary and a Spanish one typed against it, so TypeScript fails the build if a key is missing in either language. The selected language is saved in `localStorage` (key `sj-portfolio-lang`) and falls back to English if storage is blocked.

---

## Project structure

```
sebastian-portfolio/
├── .github/workflows/deploy.yml   GitHub Pages deployment
├── public/
│   ├── favicon.svg                SJ monogram
│   ├── og-image.jpg               1200×630 social preview
│   ├── robots.txt
│   └── images/                    optional project screenshots
├── src/
│   ├── components/
│   │   ├── Navbar.tsx             sticky nav, active section, scroll progress, mobile menu, language toggle
│   │   ├── Hero.tsx               intro, CTAs, floating labels, CSS fallback orb
│   │   ├── SceneLayer.tsx         fixed full-page layer that lazy-loads the 3D scene
│   │   ├── scene/
│   │   │   ├── Scene3D.tsx        <Canvas>, lights, render-loop control
│   │   │   ├── Sculpture.tsx      displaced iridescent orb, wireframe shell, orbital rings, dust
│   │   │   ├── Starfield.tsx      distant stars with pointer parallax
│   │   │   ├── StudioEnvironment.tsx  procedural reflections (no HDR download)
│   │   │   ├── AdaptiveDpr.tsx    lowers resolution on slow devices
│   │   │   └── textures.ts        canvas-generated sprites, seeded random
│   │   ├── About.tsx  Skills.tsx  Projects.tsx  ProjectDialog.tsx  ProjectCover.tsx
│   │   ├── Approach.tsx  Contact.tsx  Footer.tsx
│   │   ├── SectionHeading.tsx  Icons.tsx  ErrorBoundary.tsx
│   ├── data/                      editable content (see above)
│   ├── hooks/                     useMediaQuery / useReducedMotion, useScrollReveal, useSceneJourney
│   ├── i18n/                      LanguageContext, types
│   ├── lib/                       gsap setup, shared scene state, WebGL detection, spotlight helper
│   ├── styles/global.css          design tokens and all styles, mobile-first
│   ├── App.tsx
│   └── main.tsx
├── 404.html                       custom not-found page (built with the correct base path)
├── index.html                     SEO, Open Graph, JSON-LD
├── vite.config.ts
└── package.json
```

---

## How the 3D scene behaves

- Built entirely in code: a smoothly displaced icosphere with a physical material (metalness, clearcoat, iridescence), a fresnel atmosphere, a wireframe shell, three inclined orbital rings with small satellites, orbiting dust and a starfield.
- Loaded as a separate chunk with `React.lazy`, so text and layout render before three.js downloads.
- The scene is a fixed layer behind the whole page (`SceneLayer.tsx`). In the hero, the sculpture follows an invisible "stage" element in the layout, so it sits to the right of the text on desktop and below it on mobile.
- As you scroll, `useSceneJourney.ts` glides it to a new spot, size and colour for each section, and the starfield flies past the camera. Stops are listed in that file for desktop and mobile.
- Cards tilt in 3D toward the mouse pointer (`.tilt`, driven by `trackSpotlight`).
- Pointer and touch move it with gentle parallax; tapping or clicking it in the hero sends a short pulse and spin.
- Pixel ratio is capped (1.5–1.75), particle count and geometry detail scale with device capability, and resolution drops automatically if frames are slow.
- The render loop pauses when the tab is hidden.
- If WebGL is unavailable, the context is lost, or the scene throws, a static CSS illustration replaces it and all content stays usable.
- With `prefers-reduced-motion`, the scene renders on demand only and stays in the hero (no journey, star flight, card tilt or parallax), GSAP reveals are skipped, and CSS animations are disabled.

---

## Deployment

### GitHub Pages (workflow included)

This repository is the user site `sebastianjaimesr.github.io`, so the site is served from the root.

1. One-time setup: in the repository, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
2. Every push to `main` runs `.github/workflows/deploy.yml`, which builds with `BASE_PATH=/` and publishes `dist/`.
3. The site is at https://sebastianjaimesr.github.io.

To deploy the same code as a project site instead, change `BASE_PATH` in the workflow to `/<repo-name>/` and `VITE_SITE_URL` to the new address.

GitHub Pages serves `404.html` automatically for unknown paths.

### Netlify, Vercel or Cloudflare Pages

- Build command: `npm run build`
- Output directory: `dist`
- Environment variables (optional): `VITE_SITE_URL=https://your-domain`
- `BASE_PATH` can stay unset (defaults to `/`).
- All three serve `dist/404.html` for missing pages.

### Manual

```bash
npm run build
# upload the contents of dist/ to any static host
```

---

## Verification checklist

Run `npm run build && npm run preview`, then check:

**Desktop (1366 px and 1920 px)**

- [ ] Hero: text on the left, 3D sculpture on the right, three floating labels, scroll cue.
- [ ] Moving the mouse shifts the sculpture and stars slightly; clicking the sculpture pulses it.
- [ ] Every nav link scrolls to its section and becomes highlighted while that section is in view.
- [ ] The thin progress line under the navigation grows as you scroll.
- [ ] Skills filter buttons change the grid and the counter.
- [ ] "Project details" opens a dialog; Escape, the close button and clicking outside all close it, and focus returns to the button.
- [ ] "Send me an email" opens the mail app with a subject; "Copy email address" copies it.
- [ ] GitHub, LinkedIn and WhatsApp open in a new tab.
- [ ] EN/ES switches every piece of copy and the page title; reload keeps the choice.

**Mobile (320, 375 and 430 px) and tablet (768–1024 px)**

- [ ] No horizontal scrolling at any width.
- [ ] Hero text comes first; the sculpture sits directly below it with no large empty gap.
- [ ] Buttons are easy to tap and never clipped; headings wrap cleanly.
- [ ] Menu button opens the full-screen menu; a link closes it and scrolls to the section; Escape closes it.
- [ ] Vertical swiping over the 3D area scrolls the page.
- [ ] Tapping the sculpture pulses it.

**Accessibility and resilience**

- [ ] First Tab press shows "Skip to content"; focus outlines are visible on every control.
- [ ] With "Reduce motion" enabled in the OS, content appears without animation.
- [ ] With WebGL disabled (for example Chrome flag `--disable-webgl`), a static orb illustration appears and the page works normally.
- [ ] Browser console shows no errors or warnings.

These checks were run with headless Chromium at 320, 375, 430, 768, 1366 and 1920 px, with reduced motion, and with WebGL disabled. All passed with a clean console.

---

## Verified content and what is still open

Verified against the previous site in this repository and the public repositories on GitHub:

- LinkedIn: https://www.linkedin.com/in/sebastian-jaimes-1a2259398/
- Projects and repositories: [SQL_Proyecto](https://github.com/sebastianjaimesr/SQL_Proyecto) (real estate database), [E-COMMERCE_Proyecto](https://github.com/sebastianjaimesr/E-COMMERCE_Proyecto) (Undergold), [N8N_Proyecto](https://github.com/sebastianjaimesr/N8N_Proyecto) (AgendaBot Services), [HTML_CSS_Proyecto](https://github.com/sebastianjaimesr/HTML_CSS_Proyecto) (Space Rides), [PYTHON_Proyecto](https://github.com/sebastianjaimesr/PYTHON_Proyecto) (community tool lending).
- English level B1 (in progress) and training at Campuslands, as stated on the previous site.
- CV: `public/cv/Juan_Sebastian_Jaimes_CV.pdf`, carried over from the previous site.

Still open:

1. **Live demos.** No published demo was found for any project, so none is linked. If you publish one (for example by enabling GitHub Pages on a project repository), add its URL as `demoUrl` in `src/data/projects.ts`.
2. **Projects not shown.** "Reservas de Salas" from the previous site has no repository I could match, so it is not listed.
3. **Hero coordinates.** The decorative label uses approximate public coordinates for Bucaramanga. Change or remove them in `site.ts`.
