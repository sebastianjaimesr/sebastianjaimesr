<!-- Banner -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0d1117,50:0f2a1d,100:2ea44f&height=200&section=header&text=Juan%20Sebasti%C3%A1n%20Jaimes&fontSize=42&fontColor=ffffff&fontAlignY=36&desc=Full-Stack%20Developer%20%C2%B7%20Bucaramanga%2C%20Colombia&descSize=16&descAlignY=58&animation=fadeIn" alt="Juan Sebastián Jaimes — Full-Stack Developer" width="100%" />
</p>

<p align="center">
  <a href="https://github.com/sebastianjaimesr">
    <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=20&pause=1200&color=2EA44F&center=true&vCenter=true&width=640&lines=I+build+full-stack+web+apps+end+to+end.;TypeScript+%C2%B7+React+%C2%B7+Node.js+%C2%B7+PostgreSQL;Tested.+Validated.+Accessible.+Documented.;Open+to+remote+roles+worldwide+%F0%9F%8C%8E" alt="Typing intro" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-open_to_work-2ea44f?style=flat-square" alt="Open to work" />
  <img src="https://img.shields.io/badge/remote-worldwide-0A66C2?style=flat-square" alt="Remote worldwide" />
  <img src="https://img.shields.io/badge/timezone-UTC%E2%88%925-555?style=flat-square" alt="UTC-5" />
  <img src="https://img.shields.io/badge/languages-ES_native_%C2%B7_EN_B1-555?style=flat-square" alt="Spanish native, English B1" />
</p>

<p align="center">
  <a href="https://www.linkedin.com/in/sebastian-jaimes-1a2259398/"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
  <a href="mailto:jsrolon01@gmail.com"><img src="https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>
  <a href="https://sebastianjaimesr.github.io/emirate-scents/"><img src="https://img.shields.io/badge/Live_demo-Emirate_Scents-2ea44f?style=for-the-badge&logo=github&logoColor=white" alt="Live demo" /></a>
</p>

---

## `$ whoami`

```ts
const sebastian = {
  role:        "Full-Stack Developer",
  based:       "Bucaramanga, Colombia · UTC−5",
  training:    "Campuslands — full-stack software development",
  focus:       ["Web apps end to end", "REST APIs", "Relational data", "Workflow automation"],
  stack: {
    frontend:  ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Zustand", "Three.js"],
    backend:   ["Node.js", "Express 5", "Prisma", "Zod"],
    data:      ["PostgreSQL", "MySQL"],
    quality:   ["Vitest", "Supertest", "Playwright", "axe"],
    ops:       ["GitHub Actions", "GitHub Pages", "Docker", "n8n"],
  },
  principles: [
    "The server is the source of truth — never trust the client",
    "Validate every input, test every business rule",
    "Accessibility is a feature, not a polish step",
    "No invented data: demo content is always labeled as demo",
  ],
  lookingFor:  "Junior Full-Stack / Software Engineer role on a remote, international team",
} as const;
```

---

## 🧭 How I build

Every project follows the same loop: understand the problem, design the data model and layers, write typed and validated code, test it (unit · API · E2E · accessibility), ship it through CI/CD, and document the decisions.

```mermaid
flowchart LR
    A[Analyze] --> B[Architect] --> C[Build] --> D[Test] --> E[Ship] --> F[Document]
    F -.->|iterate| A
```

---

## 🚀 Featured work

### 🛍️ Emirate Scents — full-stack e-commerce

<p>
  <a href="https://github.com/sebastianjaimesr/emirate-scents"><img src="https://img.shields.io/badge/code-repository-181717?style=flat-square&logo=github" alt="Repository" /></a>
  <a href="https://sebastianjaimesr.github.io/emirate-scents/"><img src="https://img.shields.io/badge/live-preview-2ea44f?style=flat-square&logo=github&logoColor=white" alt="Live preview" /></a>
  <img src="https://img.shields.io/github/last-commit/sebastianjaimesr/emirate-scents?style=flat-square&label=last%20commit" alt="Last commit" />
</p>

Online perfume store with search, filters, cart, favorites and WhatsApp-based checkout — built in **8 documented phases**, from architecture analysis to production readiness.

```mermaid
flowchart LR
    U["Customer"] --> FE["React SPA"]
    FE -->|REST| API["Express API"]
    API --> P["Prisma"] --> DB[("PostgreSQL")]
    API -.-> W["WhatsApp"]
```

| What | How |
| --- | --- |
| **Layered API** | Routes → Zod validators → controllers → services. Business rules live in one place; the server owns prices and stock. |
| **3 test layers** | Vitest unit tests · Supertest API tests on an isolated database · Playwright E2E with automated **axe** accessibility checks (desktop + mobile). |
| **Hardened** | Validated env, helmet, CORS policy, request limits, structured logging (pino). |
| **Shipped** | GitHub Actions deploys a static preview to GitHub Pages on every push to `main`. |

---

<table>
  <tr>
    <td width="50%" valign="top">
      <h3>🤖 AgendaBot</h3>
      <p>Telegram assistant for appointments, tasks, habits, reminders and productivity reports.</p>
      <ul>
        <li>Refactored <b>8 separate workflows into one data-driven router</b> (routing table).</li>
        <li>Replaced unreliable parallel merges with deterministic sequential chains.</li>
        <li>Zero-cost stack: self-hosted n8n + Google Sheets.</li>
      </ul>
      <p>
        <img src="https://img.shields.io/badge/n8n-EA4B71?style=flat-square&logo=n8n&logoColor=white" alt="n8n" />
        <img src="https://img.shields.io/badge/Telegram-26A5E4?style=flat-square&logo=telegram&logoColor=white" alt="Telegram" />
        <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript" />
      </p>
      <a href="https://github.com/sebastianjaimesr/N8N_Proyecto"><b>View repository →</b></a>
    </td>
    <td width="50%" valign="top">
      <h3>🛒 Undergold</h3>
      <p>Streetwear store with public catalog, cart, two-step checkout and an admin dashboard with full CRUD.</p>
      <ul>
        <li>Built with <b>native Web Components</b> and ES modules — no frameworks.</li>
        <li>Single persistence module owns all browser-storage access.</li>
        <li>Field-level validation and inline confirmations.</li>
      </ul>
      <p>
        <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript" />
        <img src="https://img.shields.io/badge/Web_Components-29ABE2?style=flat-square&logo=webcomponentsdotorg&logoColor=white" alt="Web Components" />
        <img src="https://img.shields.io/badge/CSS3-663399?style=flat-square&logo=css&logoColor=white" alt="CSS3" />
      </p>
      <a href="https://github.com/sebastianjaimesr/E-COMMERCE_Proyecto"><b>View repository →</b></a>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>🏠 Real Estate DB</h3>
      <p>Relational database prototype for a real-estate business: normalized schema (DDL), seed data (DML) and test queries.</p>
      <p>
        <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white" alt="MySQL" />
        <img src="https://img.shields.io/badge/SQL-336791?style=flat-square" alt="SQL" />
      </p>
      <a href="https://github.com/sebastianjaimesr/SQL_Proyecto"><b>View repository →</b></a>
    </td>
    <td width="50%" valign="top">
      <h3>🚀 Space Rides</h3>
      <p>Mobile app prototype for booking space trips — pure HTML5 and CSS3, no JavaScript, no dependencies.</p>
      <p>
        <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5" />
        <img src="https://img.shields.io/badge/CSS3-663399?style=flat-square&logo=css&logoColor=white" alt="CSS3" />
      </p>
      <a href="https://github.com/sebastianjaimesr/HTML_CSS_Proyecto"><b>Repository</b></a> ·
      <a href="https://sebastianjaimesr.github.io/HTML_CSS_Proyecto/"><b>Live demo →</b></a>
    </td>
  </tr>
</table>

---

## 🧰 Toolbox

<p align="center">
  <img src="https://skillicons.dev/icons?i=ts,js,py,java,react,vite,tailwind,threejs,nodejs,express,prisma,postgres,mysql,docker,githubactions,git&perline=8" alt="Tech stack icons" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Zod-3E67B1?style=flat-square&logo=zod&logoColor=white" alt="Zod" />
  <img src="https://img.shields.io/badge/Zustand-443E38?style=flat-square" alt="Zustand" />
  <img src="https://img.shields.io/badge/Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white" alt="Vitest" />
  <img src="https://img.shields.io/badge/Playwright-2EAD33?style=flat-square&logo=playwright&logoColor=white" alt="Playwright" />
  <img src="https://img.shields.io/badge/axe-a11y-663399?style=flat-square" alt="axe accessibility" />
  <img src="https://img.shields.io/badge/n8n-EA4B71?style=flat-square&logo=n8n&logoColor=white" alt="n8n" />
</p>

---

## 📈 Activity

<p align="center">
  <img height="165" src="https://github-readme-stats.vercel.app/api?username=sebastianjaimesr&show_icons=true&hide_border=true&theme=transparent&include_all_commits=true&count_private=true&hide_rank=true&hide=stars&title_color=2ea44f&icon_color=2ea44f" alt="GitHub stats" />
  <img height="165" src="https://streak-stats.demolab.com?user=sebastianjaimesr&hide_border=true&theme=transparent&ring=2ea44f&fire=2ea44f&currStreakLabel=2ea44f" alt="Contribution streak" />
</p>

---

## 🤝 Let's build something

I'm looking for a **junior full-stack / software engineering role** on a remote, international team — and I'm open to internships and freelance projects.

**The fastest way to reach me:** [jsrolon01@gmail.com](mailto:jsrolon01@gmail.com) · [LinkedIn](https://www.linkedin.com/in/sebastian-jaimes-1a2259398/)

<details>
<summary>🇪🇸 <b>Resumen en español</b></summary>
<br />

Soy desarrollador full-stack de Bucaramanga, Colombia, formado en Campuslands. Construyo aplicaciones web completas con **React, TypeScript, Node.js/Express y PostgreSQL**, con validación, pruebas automatizadas y accesibilidad desde el inicio, y automatizo procesos con **n8n**. Busco mi primer rol como desarrollador en un equipo internacional y remoto. Escríbeme a [jsrolon01@gmail.com](mailto:jsrolon01@gmail.com).

</details>

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:2ea44f,50:0f2a1d,100:0d1117&height=110&section=footer" alt="" width="100%" />
</p>
