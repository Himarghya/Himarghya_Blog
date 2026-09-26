# Himarghya Das — Personal Developer Website & Technical Journal

<div align="center">

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7.18-CA4245?style=flat-square&logo=reactrouter&logoColor=white)
![Render](https://img.shields.io/badge/Render-Static_Site-46E3B7?style=flat-square&logo=render&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)

<p align="center">
  <b>A high-performance personal portfolio, technical engineering blog, and interactive systems showcase for Himarghya Das.</b>
</p>

[Live Demo](https://himarghya-blog.onrender.com) • [Case Studies](#-featured-case-studies) • [Technical Articles](#-technical-blog--journal) • [Render Deployment](#-deployment-to-render)

---

</div>

## Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Featured Case Studies & Simulators](#-featured-case-studies)
- [Technical Blog & Articles](#-technical-blog--journal)
- [Project Architecture & Directory Structure](#-project-architecture)
- [Tech Stack](#-tech-stack)
- [Route Map](#-route-map)
- [Getting Started](#-getting-started)
- [Deployment to Render](#-deployment-to-render)
- [Content Management](#-content-management-guide)
- [Design System & Typography](#-design-system--typography)
- [SEO, RSS & Performance](#-seo-rss--performance)
- [Author & Connect](#-author--connect)
- [License](#-license)

---

## 🚀 Overview

**Himarghya_Blog** is a modern, fast, and content-rich digital hub designed for full-stack engineering, distributed systems case studies, and technical writing. 

Engineered with **React 18**, **TypeScript**, **Vite**, and **Tailwind CSS**, it pairs an editorial typography system with an interactive terminal, live architecture simulators, and full client-side search. All content (projects, articles, journey timeline, skills, and gear) is centralized in type-safe TypeScript files for easy maintenance and zero CMS overhead.

---

## ✨ Key Features

- **Interactive Developer Terminal**: Fully interactive UNIX-like terminal signature right on the homepage supporting custom commands (`whoami`, `currently`, `interests`, `projects`, `skills`, `contact`, `clear`, `help`).
- **Deep-Dive Systems Case Studies**: Comprehensive engineering case studies featuring interactive step-by-step architecture diagrams, problem statements, solutions, trade-offs, and live simulators.
- **Interactive Architecture Simulators**:
  - **PulseMesh**: Worker heartbeat leases, job scheduling, and DLQ failure injection simulator.
  - **VARSHANET**: Real-time IoT sensor telemetry streams, anomaly threshold detection, and timeseries downsampling.
  - **POLARIS**: Offline-first CRDT vector-clock resolution, local IndexedDB caching, and delta synchronization.
- **Technical Blog Engine**: Clean technical articles with custom Markdown parsing, syntax-highlighted code blocks, one-click copy buttons, reading estimates, and bidirectional links to related case studies.
- **Global Command Menu (`Cmd+K` / `Ctrl+K`)**: Instant keyboard-driven fuzzy search across all articles, projects, journey logs, and pages with keyboard navigation.
- **Zero-Flicker Theme Engine**: Instant Dark / Light / System theme switching powered by CSS variables and `localStorage` persistence with no flash of unstyled content.
- **Developer Roadmap (`/journey`)**: Interactive visual timeline tracking milestones, engineering breakthroughs, and yearly progress.
- **Derek Sivers-inspired `/now` Page**: Dedicated view showcasing current engineering focus areas, ongoing builds, and reading queue.
- **Curated `/uses` Page**: Comprehensive inventory of hardware, operating systems, code editor configs, terminal dotfiles, and desk setups.
- **Interactive Guestbook & Contact Form**: Clean feedback and messaging interfaces.
- **SEO & Syndication**: Built-in `sitemap.xml`, `robots.txt`, `rss.xml`, and semantic HTML with OpenGraph metadata.

---

## 🛠️ Featured Case Studies

| Project | Domain | Key Stack | Highlights |
| :--- | :--- | :--- | :--- |
| **[PulseMesh](https://github.com/Himarghya/pulsemesh)** | Distributed Systems | TypeScript, Redis, PostgreSQL, Node.js | Atomic worker leases, monotonic fencing tokens, Redis Lua priority queues, DLQ redrive |
| **[VARSHANET](https://github.com/Himarghya/varshanet)** | Data & Analytics / IoT | TimescaleDB, PostgreSQL, React, Node.js | 2.4M+ daily data points, continuous aggregates, 3-sigma sensor anomaly detection |
| **[POLARIS](https://github.com/Himarghya/polar-logistics)** | Logistics & IoT | React, IndexedDB, WebSockets, CRDTs | 100% offline-first expedition management, LWW-Element-Set conflict resolution |

---

## ✍️ Technical Blog & Journal

The blog covers real-world systems engineering, database internals, and software craftsmanship:

- **How I Structure My Node.js Projects**: A 4-layer architecture separating routes, controllers, services, and repositories.
- **PostgreSQL Indexing Beyond B-Tree**: Practical deep dive into GiST, GIN, and BRIN indexes for high-volume timeseries and geospatial data.
- **Building Resilient Systems & Failure Modes**: Exploring circuit breakers, exponential backoff with jitter, and bulkhead isolation patterns.
- **Modern C++ Features Every Developer Should Know**: Move semantics, smart pointers, RAII, and concepts in C++20.
- **Designing Reliable Job Queues with Redis**: Atomicity with Lua scripts, heartbeat locks, and graceful worker failover.
- **What Happens When You Open a Database Connection**: Connection pooling, TCP handshakes, TLS negotiation, and backend resource limits.

---

## 📂 Project Architecture

```text
Himarghya_Blog/
├── public/                     # Static public assets
│   ├── assets/                 # SVGs, icons, and diagrams
│   ├── certificates/           # Certification media & badges
│   ├── profile/                # Headshots and author imagery
│   ├── _redirects              # SPA rewrite configuration for static hosts
│   ├── robots.txt              # Search crawler instructions
│   ├── rss.xml                 # RSS 2.0 technical article feed
│   └── sitemap.xml             # Search engine URL hierarchy
│
├── src/
│   ├── components/             # Reusable UI & presentation components
│   │   ├── blog/               # MarkdownRenderer with syntax styling & copy buttons
│   │   ├── common/             # ScrollToTop, Breadcrumbs, etc.
│   │   ├── home/               # Interactive TerminalSignature component
│   │   ├── layout/             # Sticky Navbar, Theme Toggle, Footer
│   │   ├── projects/           # ArchitectureDiagram & simulator wrappers
│   │   │   └── simulators/     # PulseMesh, VARSHANET, POLARIS simulators
│   │   └── ui/                 # SearchModal (Cmd+K)
│   │
│   ├── context/
│   │   └── ThemeContext.tsx    # Zero-flicker Dark / Light / System theme provider
│   │
│   ├── data/                   # Centralized type-safe content layer
│   │   ├── blog.ts             # Technical articles and blog posts
│   │   ├── journey.ts          # Yearly career and learning milestones
│   │   ├── now.ts              # Monthly focus areas and reading lists
│   │   ├── profile.ts          # Bio, principles, currently building/learning
│   │   ├── projects.ts         # Case studies, architecture flows, stats
│   │   ├── skills.ts           # Grouped skills by category & proficiency
│   │   ├── social.ts           # Social handles, GitHub, LinkedIn, email
│   │   └── uses.ts             # Hardware, software, dotfiles, editor setup
│   │
│   ├── pages/                  # Top-level page views (React Router)
│   │   ├── Home.tsx            # Hero, terminal signature, featured work
│   │   ├── About.tsx           # Bio, engineering philosophy, skills grid
│   │   ├── Projects.tsx        # Searchable and filterable project grid
│   │   ├── ProjectDetail.tsx   # In-depth case study & interactive simulator
│   │   ├── Blog.tsx            # Article index with category filters
│   │   ├── BlogDetail.tsx      # Editorial article reader with Markdown formatting
│   │   ├── Journey.tsx         # Interactive career timeline
│   │   ├── Uses.tsx            # Gear, workstation, and software inventory
│   │   ├── Now.tsx             # Live monthly focus (/now page)
│   │   ├── Contact.tsx         # Contact form & communication channels
│   │   ├── Guestbook.tsx       # Community guestbook wall
│   │   └── NotFound.tsx        # Custom 404 error page
│   │
│   ├── App.tsx                 # Root router & layout wrapper
│   ├── index.css               # Tailwind CSS imports & custom typography rules
│   └── main.tsx                # Application entrypoint
│
├── .gitignore                  # Git ignore rules (node_modules, dist, logs)
├── index.html                  # HTML entry template with web fonts & meta tags
├── package.json                # Dependencies and npm scripts
├── postcss.config.js           # PostCSS Tailwind config
├── render.yaml                 # Render Blueprint configuration for automated deployment
├── tailwind.config.js          # Custom theme colors, fonts, and animation utilities
├── tsconfig.json               # TypeScript compiler options
└── vite.config.ts              # Vite bundler configuration
```

---

## 💻 Tech Stack

### Frontend & Core
- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler**: [Vite 5](https://vitejs.dev/)
- **Routing**: [React Router 7](https://reactrouter.com/) (Browser routing with SPA fallback)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) + PostCSS + Autoprefixer
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

### Design & Typography
- **Headings & Accents**: *Barlow Condensed* & *Space Grotesk*
- **Code & Terminal**: *IBM Plex Mono*
- **Body & UI**: *Inter* / Sans-serif system font stack

---

## 🗺️ Route Map

| Path | Component | Description |
| :--- | :--- | :--- |
| `/` | `Home.tsx` | Main landing page, interactive terminal, featured articles & projects |
| `/about` | `About.tsx` | Background, principles, story, and categorized skill levels |
| `/projects` | `Projects.tsx` | Portfolio showroom with category filters |
| `/projects/:slug` | `ProjectDetail.tsx` | Deep case studies, step-by-step architecture & live simulators |
| `/blog` | `Blog.tsx` | Technical article archive with category and tag filtering |
| `/blog/:slug` | `BlogDetail.tsx` | Technical article reader with markdown formatting & syntax code blocks |
| `/journey` | `Journey.tsx` | Milestone timeline documenting career growth |
| `/now` | `Now.tsx` | Current engineering focus, active builds, and reading list |
| `/uses` | `Uses.tsx` | Gear, hardware, OS, terminal, and development tooling |
| `/contact` | `Contact.tsx` | Direct contact form and communication links |
| `/guestbook` | `Guestbook.tsx` | Community message board |
| `*` | `NotFound.tsx` | 404 Not Found fallback |

---

## 🏁 Getting Started

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher) or **pnpm** / **yarn**

### 1. Clone the Repository
```bash
git clone https://github.com/Himarghya/Himarghya_Blog.git
cd Himarghya_Blog
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
The application will start locally at `http://localhost:3000`.

### 4. Build for Production
```bash
npm run build
```
This runs `tsc` (TypeScript verification) and compiles optimized static assets into the `dist/` folder.

### 5. Preview Production Build
```bash
npm run preview
```

---

## ☁️ Deployment to Render

The repository includes pre-configured **Render Blueprint** and **SPA rewrite** rules:

### Automated Blueprint Deployment
1. Log in to your [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** $\rightarrow$ **Blueprint**.
3. Select your repository `Himarghya_Blog`.
4. Render reads [`render.yaml`](./render.yaml) and deploys the static site automatically with zero manual setup.

### Manual Static Site Setup on Render
If you prefer creating the Static Site manually:
- **Service Type**: `Static Site`
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Rewrite Rules** (Under *Redirects/Rewrites*):
  - **Type**: `Rewrite`
  - **Source**: `/*`
  - **Destination**: `/index.html`

> [!NOTE]
> The rewrite rule (`/* -> /index.html`) is essential for single-page applications so that page refreshes on sub-routes like `/blog/how-i-structure-my-nodejs-projects` or `/projects/pulsemesh` load properly without returning 404 errors.

---

## 📝 Content Management Guide

All content is decoupled from components and stored in `src/data/`:

### Adding a New Blog Post
Open [`src/data/blog.ts`](./src/data/blog.ts) and append a new object to `blogPosts`:
```typescript
{
  slug: "optimizing-redis-memory-usage",
  title: "Optimizing Redis Memory Usage in High-Throughput Workflows",
  subtitle: "Strategies for avoiding bloat with ziplists, hashes, and custom eviction policies.",
  excerpt: "How we reduced Redis memory footprints by 60% without dropping throughput.",
  content: `
# Optimizing Redis Memory Usage

When scaling distributed queues...
  `,
  date: "2026-10-15",
  readingTime: "7 min read",
  category: "Databases",
  tags: ["Redis", "Performance", "Distributed Systems"],
  featured: true,
  relatedProjectSlug: "pulsemesh" // Optional link to a case study
}
```

### Adding a New Project Case Study
Open [`src/data/projects.ts`](./src/data/projects.ts) and add your project to `projects` with architecture steps, challenge resolutions, and statistics.

### Updating Monthly Focus (/now)
Open [`src/data/now.ts`](./src/data/now.ts) to update your current month's reading list, active projects, and engineering priorities.

---

## 🎨 Design System & Typography

- **Ambient Lighting**: Multi-layered backdrop gradients that adapt smoothly between Dark and Light modes.
- **Glassmorphism**: Translucent card surfaces with `backdrop-blur-md` and border highlights (`border-zinc-200/80` / `border-zinc-800/80`).
- **Typography Hierarchy**:
  - **Display / Headers**: `Space Grotesk` & `Barlow Condensed` for high-impact titles and badges.
  - **Code / Metrics / Terminal**: `IBM Plex Mono` for authentic terminal and IDE experiences.
  - **Body Content**: Clean, readable sans-serif system stack optimized for long-form reading.

---

## 🔍 SEO, RSS & Performance

- **Sitemap**: Centralized XML sitemap at [`public/sitemap.xml`](./public/sitemap.xml) indexed for search engines.
- **RSS Feed**: Standard RSS 2.0 feed at [`public/rss.xml`](./public/rss.xml) enabling readers to subscribe via Feedbin, Feedly, or RSS clients.
- **Fast Chunking**: Code-split route bundles generated with Vite for near-instant page loads.

---

## 👤 Author & Connect

**Himarghya Das**
- **Website / Live Blog**: [himarghya-blog.onrender.com](https://himarghya-blog.onrender.com)
- **GitHub**: [@Himarghya](https://github.com/Himarghya)
- **LinkedIn**: [Himarghya Das](https://linkedin.com/in/himarghya)
- **Email**: [contact@himarghya.dev](mailto:contact@himarghya.dev)

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE) © Himarghya Das. Feel free to use this as inspiration for your own portfolio and technical blog.
