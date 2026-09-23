export interface Profile {
  name: string;
  initials: string;
  role: string;
  tagline: string;
  headline: string;
  bioIntro: string;
  bioParagraphs: string[];
  location: string;
  status: string;
  currently: {
    building: string[];
    learning: string[];
    exploring: string[];
  };
  interests: string[];
  philosophy: string[];
}

export const profile: Profile = {
  name: "Himarghya Das",
  initials: "HD",
  role: "Full Stack Developer • C++ Programmer • Problem Solver",
  tagline: "Building software, learning in public.",
  headline: "Hi, I'm Himarghya. I build things for the web.",
  bioIntro:
    "I'm Himarghya Das — a full-stack developer and C++ programmer interested in building useful software, understanding systems, and continuously getting better at solving problems.",
  bioParagraphs: [
    "I'm a developer who enjoys turning ideas into working software. I started with the fundamentals and gradually moved into full-stack development, backend systems, databases, and problem solving.",
    "These days, I'm interested in building projects that are slightly more difficult than the last one and understanding why the systems behind them work under the hood.",
    "I believe the best way to understand an abstraction is to break it down, write clean code, benchmark the bottlenecks, and document the lessons learned along the way."
  ],
  location: "India",
  status: "learning & building",
  currently: {
    building: [
      "Full-stack web applications with TypeScript & React",
      "Scalable backend services & worker queues with Node.js and PostgreSQL",
      "Distributed systems & data monitoring tools"
    ],
    learning: [
      "System Design & Distributed Systems",
      "Advanced Backend Engineering (Leases, Idempotency, Concurrency)",
      "Modern C++ (Move semantics, memory management, RAII)",
      "Data Structures & Algorithms problem solving"
    ],
    exploring: [
      "Database internals & query execution engines",
      "Event-driven architectures & message brokers",
      "Developer tooling and CLI design"
    ]
  },
  interests: [
    "Backend Engineering",
    "Distributed Systems",
    "Database Optimization",
    "Modern C++",
    "Problem Solving / DSA",
    "System Design",
    "API Design & Tooling"
  ],
  philosophy: [
    "Write code for humans first, computers second.",
    "Understand the abstraction before relying on the convenience.",
    "Embrace failure as the highest-fidelity feedback loop.",
    "Build tools that solve real operational friction."
  ]
};
