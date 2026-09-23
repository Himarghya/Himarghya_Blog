export interface SkillGroup {
  category: string;
  skills: {
    name: string;
    level: "Core" | "Proficient" | "Exploring";
    note?: string;
  }[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    skills: [
      { name: "TypeScript", level: "Core", note: "Primary language for type-safe backend & frontend" },
      { name: "JavaScript (ESNext)", level: "Core", note: "Event loop, asynchronous patterns, V8 engine" },
      { name: "C++ (C++20)", level: "Proficient", note: "DSA, RAII, move semantics, memory management" },
      { name: "SQL (Postgres dialect)", level: "Core", note: "Complex joins, indexing, query optimization" }
    ]
  },
  {
    category: "Frontend",
    skills: [
      { name: "React", level: "Core", note: "Hooks, custom state architecture, virtual DOM" },
      { name: "Tailwind CSS", level: "Core", note: "Design systems, responsive layouts, utility classes" },
      { name: "HTML5 / Semantic Web", level: "Core", note: "Accessibility (a11y), clean document structure" },
      { name: "CSS3 / Modern CSS", level: "Core", note: "Flexbox, Grid, CSS variables, transitions" }
    ]
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", level: "Core", note: "Event loop, worker threads, stream processing" },
      { name: "Express / Fastify", level: "Core", note: "Modular routing, middlewares, error pipelines" },
      { name: "RESTful API Design", level: "Core", note: "Idempotency keys, status codes, OpenAPI" },
      { name: "Authentication & JWT", level: "Proficient", note: "Session management, refresh tokens, bcrypt" }
    ]
  },
  {
    category: "Database & Caching",
    skills: [
      { name: "PostgreSQL", level: "Core", note: "Transactions, BRIN/GIN indexing, JSONB, schema design" },
      { name: "Redis", level: "Proficient", note: "Atomic Lua scripts, ZSET priority queues, distributed locks" },
      { name: "TimescaleDB", level: "Proficient", note: "Timeseries hypertables and continuous aggregates" },
      { name: "Prisma / Kysely", level: "Proficient", note: "Type-safe database abstraction and migrations" }
    ]
  },
  {
    category: "Tools & DevOps",
    skills: [
      { name: "Git & GitHub", level: "Core", note: "Branching strategies, rebase workflows, PR reviews" },
      { name: "Docker", level: "Proficient", note: "Multi-stage builds, compose networks for dev" },
      { name: "Linux / Bash", level: "Proficient", note: "Shell scripting, process management, diagnostics" },
      { name: "VS Code / CLion", level: "Core", note: "Vim navigation, debugger inspection, profiling" }
    ]
  }
];
