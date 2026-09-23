# Himarghya Das — Personal Developer Website & Blog

> Premium developer portfolio, technical blog, and systems journal for **Himarghya Das**.
> Built with React, TypeScript, Vite, Tailwind CSS, and React Router.

---

## Features

- **Personal Digital Hub**: Focused on software engineering, distributed systems, backend architectures, C++, and continuous learning.
- **Interactive Developer Terminal**: Fully functional terminal signature on the homepage with custom commands (`whoami`, `currently`, `interests`, `projects`, `skills`, `contact`, `clear`).
- **Comprehensive Project Case Studies**: Deep dives into systems like **PulseMesh**, **VARSHANET**, and **POLARIS** featuring interactive step-by-step architecture diagrams, challenges, and learnings.
- **Technical Blog & Journal**: In-depth articles with clean code syntax blocks, copy buttons, reading estimates, and bidirectional links between articles and projects.
- **Global Search (`Cmd+K` / `Ctrl+K`)**: Keyboard-driven fuzzy search across all articles, projects, and pages.
- **Dark / Light / System Theme**: Instant switching with `localStorage` persistence and zero load-time flash.
- **Developer Timeline & Now Page**: Dynamic roadmap of growth (`/journey`) and live focus areas (`/now`).
- **SEO & RSS Feeds**: Complete with OpenGraph tags, `sitemap.xml`, `robots.txt`, and `rss.xml`.

---

## Project Structure & Centralized Content

All personal content is separated from the UI layer in `src/data/`:

```text
src/
├── data/
│   ├── profile.ts      # Bio, currently building/learning/exploring, principles
│   ├── projects.ts     # Project details, case studies, architecture diagrams
│   ├── blog.ts         # Technical articles and blog posts
│   ├── journey.ts      # Developer timeline and yearly milestones
│   ├── uses.ts         # Hardware, editor, terminal, and tooling setup
│   ├── now.ts          # Current monthly focus and reading list
│   ├── skills.ts       # Grouped technologies and competencies
│   └── social.ts       # GitHub, LinkedIn, email, and resume links
│
├── components/
│   ├── layout/         # Sticky Navbar, Footer
│   ├── home/           # Interactive Terminal Signature
│   ├── projects/       # Interactive Architecture Diagram
│   ├── blog/           # MarkdownRenderer with syntax styling & copy buttons
│   ├── common/         # ScrollToTop helper
│   └── ui/             # SearchModal (Cmd+K)
│
├── context/
│   └── ThemeContext.tsx # Zero-flicker Dark / Light / System theme engine
│
└── pages/
    ├── Home.tsx
    ├── About.tsx
    ├── Projects.tsx
    ├── ProjectDetail.tsx
    ├── Blog.tsx
    ├── BlogDetail.tsx
    ├── Journey.tsx
    ├── Uses.tsx
    ├── Now.tsx
    ├── Contact.tsx
    ├── Guestbook.tsx
    └── NotFound.tsx
```

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

---

## How to Add New Content

### Adding a Blog Post
Open `src/data/blog.ts` and add a new entry to the `blogPosts` array:
```typescript
{
  slug: "your-post-slug",
  title: "Title of Your Article",
  subtitle: "Brief subtitle explaining the topic",
  excerpt: "Short 2-line summary for listing previews",
  date: "2026-10-01",
  readingTime: "6 min read",
  category: "Backend",
  tags: ["Node.js", "PostgreSQL"],
  featured: true,
  relatedProjectSlug: "pulsemesh", // optional
  content: `Markdown content here...`
}
```

### Adding a Project
Open `src/data/projects.ts` and add a new project to the `projects` array with architecture flow and challenges.

---

## License
MIT (c) Himarghya Das
