export interface ProjectArchitecture {
  summary: string;
  steps: {
    title: string;
    description: string;
    tech: string;
  }[];
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: "Distributed Systems" | "Full Stack" | "Data & Analytics" | "Logistics & IoT";
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  year: string;
  stats?: { label: string; value: string }[];
  problem: string;
  solution: string;
  architecture: ProjectArchitecture;
  keyFeatures: string[];
  challenges: {
    challenge: string;
    resolution: string;
  }[];
  learnings: string[];
  relatedBlogSlugs: string[];
}

export const projects: Project[] = [
  {
    slug: "pulsemesh",
    name: "PulseMesh",
    tagline: "Distributed workflow & resilient background job orchestration engine",
    description:
      "A distributed workflow and job processing platform designed around reliable execution, atomic leases, automatic retries with exponential backoff, and strict idempotency guarantees.",
    longDescription:
      "PulseMesh solves the problem of unreliable asynchronous workload execution in microservice environments. Built with TypeScript, Node.js, Redis, and PostgreSQL, it provides deterministic task scheduling, heartbeat leases to prevent duplicate work during node crashes, and dead-letter queue management with an interactive real-time observability dashboard.",
    technologies: ["TypeScript", "Node.js", "PostgreSQL", "Redis", "React", "Tailwind CSS", "Docker"],
    category: "Distributed Systems",
    githubUrl: "https://github.com/Himarghya/pulsemesh",
    liveUrl: "https://pulsemesh.demo.dev",
    featured: true,
    year: "2026",
    stats: [
      { label: "Throughput", value: "10k+ jobs/sec" },
      { label: "Lease Resolution", value: "< 2ms" },
      { label: "Execution Mode", value: "At-least-once" }
    ],
    problem:
      "When microservices schedule background jobs without centralized coordination, worker failures, network partitions, and unhandled exceptions lead to lost tasks, duplicate executions, or blocked database connection pools.",
    solution:
      "Engineered an atomic lease mechanism utilizing Redis distributed locks and Lua scripts paired with PostgreSQL write-ahead persistence. Workers actively renew leases via heartbeats. If a worker drops off, unacknowledged jobs are seamlessly re-queued without state corruption.",
    architecture: {
      summary:
        "Clients submit jobs to the REST/gRPC API. The API validates payloads and writes to PostgreSQL with an IDEMPOTENCY_KEY while dispatching state to Redis Sorted Sets. Worker pools claim jobs with TTL leases, execute workloads, and broadcast status events to the React monitoring frontend.",
      steps: [
        {
          title: "1. Ingestion & Idempotency",
          description: "API verifies idempotent submission token and records pending state in PostgreSQL.",
          tech: "Express / PostgreSQL"
        },
        {
          title: "2. Priority & Delay Scheduling",
          description: "Redis ZSETs score jobs by priority timestamp. Lua scripts atomically move ready jobs into active queues.",
          tech: "Redis / Lua"
        },
        {
          title: "3. Distributed Worker Leases",
          description: "Workers poll jobs and acquire a 30-second renewable lease. Heartbeats maintain ownership during long executions.",
          tech: "Node.js Workers"
        },
        {
          title: "4. Dead Letter Queue & Metrics",
          description: "Failures retry with exponential backoff and jitter. Unrecoverable jobs move to DLQ with full stack traces.",
          tech: "PostgreSQL / SSE"
        }
      ]
    },
    keyFeatures: [
      "Strict idempotency enforcement using client-provided hashing keys",
      "Atomic worker leases with distributed Redis heartbeats",
      "Configurable exponential backoff retry policies with jitter",
      "Dead Letter Queue (DLQ) with one-click re-drive capabilities",
      "Real-time cluster health and queue telemetry dashboard"
    ],
    challenges: [
      {
        challenge: "Zombie worker execution causing duplicate database mutations after lease timeouts.",
        resolution:
          "Implemented monotonic fencing tokens inside PostgreSQL transactions. If a worker finishes after its lease expired, the database rejects the commit because a higher fencing token has taken over."
      },
      {
        challenge: "Redis memory bloat under rapid job arrival rates.",
        resolution:
          "Separated heavy metadata into cold PostgreSQL storage and kept only essential metadata (job_id, priority, retry_count) in memory-optimized Redis hashes."
      }
    ],
    learnings: [
      "Distributed locking is only safe when paired with fencing tokens on the storage layer.",
      "Writing custom Lua scripts in Redis prevents race conditions better than multi-command client roundtrips.",
      "Designing for failure upfront creates vastly simpler debugging paths in production."
    ],
    relatedBlogSlugs: [
      "designing-reliable-job-queues-with-redis",
      "how-i-structure-my-nodejs-projects",
      "building-resilient-systems-failure-modes"
    ]
  },
  {
    slug: "varshanet",
    name: "VARSHANET",
    tagline: "High-precision meteorological analytics & ground-truth verification engine",
    description:
      "A weather analytics and sensor verification platform that aggregates telemetry from distributed IoT weather stations and compares them against satellite forecasts to identify microclimate anomalies.",
    longDescription:
      "VARSHANET aggregates high-frequency precipitation, humidity, and barometric sensor streams across regional meteorological hubs. It processes raw timeseries records, cleans anomalies using statistical thresholding, and exposes analytical dashboards for agricultural and disaster management modeling.",
    technologies: ["Node.js", "TypeScript", "PostgreSQL", "TimescaleDB", "React", "Chart.js", "Tailwind CSS"],
    category: "Data & Analytics",
    githubUrl: "https://github.com/Himarghya/varshanet",
    liveUrl: "https://varshanet.demo.dev",
    featured: true,
    year: "2025",
    stats: [
      { label: "Data Points/Day", value: "2.4M+" },
      { label: "Query Latency", value: "< 45ms" },
      { label: "Sensors Managed", value: "180+" }
    ],
    problem:
      "Standard commercial weather models lack granularity for local microclimates. Raw IoT telemetry from rural weather stations often suffers from missing packets, sensor calibration drift, and high timeseries storage costs.",
    solution:
      "Developed a robust ingestion pipeline with PostgreSQL/TimescaleDB hypertables, automated downsampling rollups for historical data, and a custom outlier detection filter based on moving standard deviations.",
    architecture: {
      summary:
        "Telemetry payloads arrive via secure HTTP endpoints, get buffered in memory, and batch-inserted into PostgreSQL hypertables. Periodic continuous aggregates calculate hourly averages, while anomaly detection services flag diverging station clusters.",
      steps: [
        {
          title: "1. Sensor Telemetry Ingestion",
          description: "Station payloads pass checksum verification and rate limiting.",
          tech: "Fastify / Node.js"
        },
        {
          title: "2. Hypertables & Continuous Aggregates",
          description: "Data partitions automatically by timestamp for sub-millisecond range queries.",
          tech: "TimescaleDB / SQL"
        },
        {
          title: "3. Spatial & Sensor Drift Detection",
          description: "Detects outlier nodes diverging > 3-sigma from neighboring spatial clusters.",
          tech: "C++ / Statistical Service"
        },
        {
          title: "4. Interactive Geospatial Dashboard",
          description: "Renders interactive heatmaps, trend comparisons, and precipitation alerts.",
          tech: "React / Leaflet / Tailwind"
        }
      ]
    },
    keyFeatures: [
      "Time-partitioned hypertables with automated 30-day compression policies",
      "Statistical sensor drift & outlier identification",
      "Real-time precipitation alerts and spatial precipitation maps",
      "Exportable datasets for meteorological research in CSV / Parquet formats"
    ],
    challenges: [
      {
        challenge: "Massive write amplification when inserting individual sensor pings.",
        resolution:
          "Implemented memory batch buffers that group sensor metrics into bulk `INSERT ... ON CONFLICT DO UPDATE` statements every 500ms, slashing database IOPS by 82%."
      }
    ],
    learnings: [
      "Timeseries partitioning strategies fundamentally alter query planners in relational databases.",
      "Pre-aggregating historical statistics makes analytical dashboards lightning fast."
    ],
    relatedBlogSlugs: [
      "postgresql-indexing-beyond-btree",
      "how-i-structure-my-nodejs-projects"
    ]
  },
  {
    slug: "polaris",
    name: "POLARIS",
    tagline: "Polar expedition logistics & offline-first asset tracking suite",
    description:
      "A ruggedized mission coordination and inventory management platform engineered for extreme climate research stations with intermittent satellite connectivity.",
    longDescription:
      "POLARIS was built to solve critical operational challenges in disconnected environments. It features an offline-first CRDT synchronization engine, strict equipment lifecycle tracking, and consumable burn-rate projections based on active crew count and ambient sub-zero temperatures.",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "IndexedDB", "Tailwind CSS", "WebSockets"],
    category: "Logistics & IoT",
    githubUrl: "https://github.com/Himarghya/polar-logistics",
    liveUrl: "https://polaris.demo.dev",
    featured: true,
    year: "2025",
    stats: [
      { label: "Sync Protocol", value: "CRDT / Delta" },
      { label: "Offline Mode", value: "100% Functional" },
      { label: "Asset Types", value: "450+ items" }
    ],
    problem:
      "Polar research stations frequently lose satellite uplinks for days during blizzards. Standard cloud ERP systems fail entirely when offline, leading to inventory discrepancies and dangerous supply miscalculations in freezing conditions.",
    solution:
      "Architected an offline-first client architecture using IndexedDB local storage with state-based CRDTs (Conflict-free Replicated Data Types). When satellite links recover, the system computes deterministic diffs and synchronizes bidirectionally without manual conflict resolution.",
    architecture: {
      summary:
        "Local browser state operates against IndexedDB with full read/write capabilities. Mutation logs record vector clocks. When an uplink is detected, a WebSocket tunnel transmits delta changesets to the central station server.",
      steps: [
        {
          title: "1. Local IndexedDB Cache",
          description: "All equipment checks, transfers, and supply logs execute immediately in local storage.",
          tech: "Dexie.js / IndexedDB"
        },
        {
          title: "2. Vector Clocks & State Merging",
          description: "Mutations attach Lamport timestamps and client IDs to resolve concurrent edits.",
          tech: "TypeScript CRDTs"
        },
        {
          title: "3. Uplink Sensing & Delta Sync",
          description: "Heartbeats probe network quality. Once online, compact binary payloads synchronize changes.",
          tech: "WebSockets / Protocol Buffers"
        },
        {
          title: "4. Thermal & Burn-Rate Estimator",
          description: "Calculates fuel and caloric burn rate relative to current exterior sub-zero temperatures.",
          tech: "C++ WebAssembly Core"
        }
      ]
    },
    keyFeatures: [
      "Full offline operation for inventory, cargo manifests, and maintenance logs",
      "Conflict-free replicated data types (CRDTs) for seamless multi-device convergence",
      "Caloric and diesel fuel depletion forecasting models",
      "High-contrast dark UI designed for low-light expedition environments"
    ],
    challenges: [
      {
        challenge: "Handling concurrent status updates from two researchers editing the same medical kit while disconnected.",
        resolution:
          "Adopted Last-Write-Wins element registers (LWW-Element-Set) with causal ordering, ensuring both items were tracked and neither update was lost."
      }
    ],
    learnings: [
      "Offline-first is an architecture choice that must permeate data models from day one.",
      "Optimizing network payload size matters immensely over 128kbps high-latency satellite connections."
    ],
    relatedBlogSlugs: [
      "building-resilient-systems-failure-modes",
      "understanding-move-semantics-memory-modern-cpp"
    ]
  },
  {
    slug: "ocean-intelligence",
    name: "Ocean Intelligence Platform",
    tagline: "Real-time maritime anomaly monitoring & hydrographic sensor dashboard",
    description:
      "An ocean data intelligence dashboard that tracks vessel telemetry, salinity gradients, and hydrophone acoustic anomalies to assist marine environmental preservation.",
    longDescription:
      "Ocean Intelligence Platform ingests spatial maritime AIS feeds and oceanic sensor arrays. It features an interactive WebGL mapping layer, automated bounding box alerts for marine sanctuary zones, and analytical time-series charts for ocean temperature anomalies.",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "PostGIS", "Tailwind CSS", "Deck.gl"],
    category: "Data & Analytics",
    githubUrl: "https://github.com/Himarghya/ocean-intelligence",
    liveUrl: "https://ocean.demo.dev",
    featured: false,
    year: "2024",
    stats: [
      { label: "Vessels Monitored", value: "5,000+" },
      { label: "Map FPS", value: "60 FPS WebGL" }
    ],
    problem:
      "Visualizing thousands of real-time marine vessel coordinates alongside multidimensional bathymetric datasets causes heavy DOM lag in standard browser renderers.",
    solution:
      "Leveraged GPU-accelerated WebGL layers with Deck.gl and PostGIS spatial indexing (`ST_DWithin`, `ST_Contains`) on PostgreSQL to filter and render dense maritime traffic smoothly.",
    architecture: {
      summary:
        "PostGIS indexes geo-fenced sanctuary boundaries. Incoming vessel streams are filtered server-side by viewport bounds, then rendered via WebGL instanced geometry on the client.",
      steps: [
        {
          title: "1. Spatial Indexing",
          description: "R-Tree spatial index queries bounding boxes in < 5ms.",
          tech: "PostgreSQL / PostGIS"
        },
        {
          title: "2. GeoJSON Streaming",
          description: "Lightweight geo-payloads stream via WebSockets.",
          tech: "Node.js"
        },
        {
          title: "3. Hardware-Accelerated Rendering",
          description: "Deck.gl renders 10,000+ vessel instances at steady 60fps.",
          tech: "React / Deck.gl / WebGL"
        }
      ]
    },
    keyFeatures: [
      "Hardware-accelerated marine trajectory visualization",
      "PostGIS spatial queries for sanctuary trespass alerts",
      "Bathymetric depth and surface temperature gradient overlays",
      "Real-time AIS vessel telemetry parsing"
    ],
    challenges: [
      {
        challenge: "Rendering 10,000+ dynamic vessel markers without frame drops on lower-spec machines.",
        resolution:
          "Switched from SVG map pins to instanced GPU buffer attributes in WebGL, offloading coordinates directly to the graphics pipeline."
      }
    ],
    learnings: [
      "Spatial databases (PostGIS) require proper bounding box clipping before streaming to frontend clients.",
      "Hardware acceleration is essential for high-density spatial datasets."
    ],
    relatedBlogSlugs: [
      "postgresql-indexing-beyond-btree"
    ]
  }
];
