export interface NowData {
  lastUpdated: string;
  location: string;
  focusAreas: {
    category: string;
    items: string[];
  }[];
  readingList: {
    title: string;
    author: string;
    status: "Reading" | "Completed" | "Next Up";
  }[];
  currentThought: string;
}

export const nowData: NowData = {
  lastUpdated: "September 2026",
  location: "India",
  currentThought:
    "Software gets interesting when you step past basic CRUD and start wrestling with distributed state, failure recovery, and understanding what the compiler and operating system are actually doing with your memory.",
  focusAreas: [
    {
      category: "Backend & Systems",
      items: [
        "Deepening knowledge in distributed locking, fencing tokens, and lease protocols",
        "Writing benchmark suites to measure Node.js event loop lag under heavy load",
        "Benchmarking PostgreSQL query plans with EXPLAIN (ANALYZE, BUFFERS)"
      ]
    },
    {
      category: "C++ & Performance",
      items: [
        "Mastering C++ move semantics, custom allocators, and cache locality",
        "Solving hard graph and dynamic programming problems on LeetCode / Codeforces"
      ]
    },
    {
      category: "Projects & Writing",
      items: [
        "Refining the PulseMesh worker orchestrator dashboard and telemetry engine",
        "Drafting articles on database indexing and race-condition prevention"
      ]
    }
  ],
  readingList: [
    {
      title: "Designing Data-Intensive Applications",
      author: "Martin Kleppmann",
      status: "Reading"
    },
    {
      title: "Effective Modern C++",
      author: "Scott Meyers",
      status: "Reading"
    },
    {
      title: "Database Internals",
      author: "Alex Petrov",
      status: "Next Up"
    }
  ]
};
