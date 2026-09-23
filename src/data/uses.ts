export interface UseCategory {
  category: string;
  description: string;
  items: {
    name: string;
    description: string;
    tag?: string;
  }[];
}

export const usesData: UseCategory[] = [
  {
    category: "Editor & IDE",
    description: "My daily coding environment and text manipulation tools.",
    items: [
      {
        name: "Visual Studio Code",
        description: "Primary editor for TypeScript, React, and Node.js backend development with Vim keybindings.",
        tag: "Primary Editor"
      },
      {
        name: "JetBrains CLion / GCC",
        description: "For C++ programming, competitive problem solving, and low-level performance experiments.",
        tag: "C++ Toolchain"
      },
      {
        name: "Tokyo Night / Catppuccin Mocha Theme",
        description: "High-contrast dark themes that reduce eye fatigue during late-night debugging sessions."
      }
    ]
  },
  {
    category: "Terminal & Shell",
    description: "Command line tools, shell configurations, and terminal emulators.",
    items: [
      {
        name: "Windows Terminal / PowerShell 7",
        description: "Configured with Oh My Posh, Starship prompt, and custom aliases for rapid git workflows.",
        tag: "Terminal"
      },
      {
        name: "WSL2 (Ubuntu)",
        description: "Linux subsystem environment for container tooling, system-level scripting, and Docker engines."
      },
      {
        name: "Git & GitHub CLI (gh)",
        description: "Version control and pull request automation directly from the command line."
      }
    ]
  },
  {
    category: "Development Stack",
    description: "Languages, runtimes, and frameworks I use to build systems.",
    items: [
      {
        name: "TypeScript & Node.js",
        description: "Core stack for scalable backend services, asynchronous worker pools, and APIs."
      },
      {
        name: "Modern C++ (C++20)",
        description: "For systems programming, memory management investigations, and DSA algorithms."
      },
      {
        name: "React & Vite",
        description: "Frontend foundation for responsive, accessible web applications and dashboards."
      },
      {
        name: "Tailwind CSS",
        description: "Utility-first styling for maintainable design systems and rapid prototyping."
      }
    ]
  },
  {
    category: "Databases & Infrastructure",
    description: "Data storage, caching layers, and container runtimes.",
    items: [
      {
        name: "PostgreSQL",
        description: "My default relational database of choice for ACID compliance, indexing, and JSONB queries."
      },
      {
        name: "Redis",
        description: "In-memory datastore for distributed locks, lease management, rate limiting, and pub/sub."
      },
      {
        name: "Docker & Docker Compose",
        description: "Containerizing local development databases and orchestrating multi-container test environments."
      }
    ]
  },
  {
    category: "Hardware",
    description: "Physical workstation setup and peripheral devices.",
    items: [
      {
        name: "Development Machine",
        description: "Multi-core development rig running Windows 11 with WSL2 Linux subsystem.",
        tag: "Workstation"
      },
      {
        name: "External High-Resolution Display",
        description: "Dual-window split layout for code editor and live telemetry/documentation."
      },
      {
        name: "Mechanical Keyboard",
        description: "Tactile switches for tactile typing precision and low latency."
      }
    ]
  }
];
