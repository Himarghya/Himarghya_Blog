export interface JourneyItem {
  year: string;
  quarter?: string;
  title: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export const journeyTimeline: JourneyItem[] = [
  {
    year: "2026",
    quarter: "Present",
    title: "Distributed Systems & Deep Backend Engineering",
    description:
      "Focusing on system design, worker queues, high-concurrency architectures, and low-level performance in C++ and TypeScript. Designing resilient architectures that survive real-world failure modes.",
    highlights: [
      "Engineered PulseMesh — distributed task orchestrator with Redis leases and idempotency tokens",
      "Diving into database internals, write-ahead logs, and custom lock mechanisms",
      "Writing technical articles and deep dives on backend system design"
    ],
    technologies: ["TypeScript", "Node.js", "Redis", "PostgreSQL", "C++", "System Design", "Docker"]
  },
  {
    year: "2025",
    quarter: "Mid - Late",
    title: "Full-Stack Applications & Timeseries Systems",
    description:
      "Transitioned from simple CRUD applications to complex data-driven platforms. Worked seriously with relational modeling, indexing, and offline-first client architectures.",
    highlights: [
      "Built VARSHANET — timeseries weather sensor aggregation & anomaly detection platform",
      "Built POLARIS — offline-first CRDT logistics system for low-connectivity environments",
      "Mastered PostgreSQL indexing strategies (B-Tree, BRIN, GIN, GiST) and connection pooling"
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "TimescaleDB", "IndexedDB", "Tailwind CSS", "WebSockets"]
  },
  {
    year: "2024",
    quarter: "Early - Mid",
    title: "Programming Fundamentals & Web Development",
    description:
      "Started exploring web development, modern frontend ecosystems, and foundational computer science concepts through rigorous hands-on projects and problem solving.",
    highlights: [
      "Built interactive web applications using React, JavaScript, and Tailwind CSS",
      "Practiced Data Structures and Algorithms in C++ and Python",
      "Learned Linux fundamentals, Git collaboration workflows, and API architectures"
    ],
    technologies: ["C++", "JavaScript", "React", "HTML/CSS", "Git", "Linux", "Data Structures"]
  }
];
