import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Sparkles, Terminal, Code2, Cpu } from 'lucide-react';
import { profile } from '../data/profile';
import { socialLinks } from '../data/social';

export const About: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-12 pb-16 pt-6">
      {/* Header */}
      <div className="space-y-3 border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          A little more about me.
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-mono text-sm">
          Himarghya Das — Full Stack Developer • C++ Programmer • Problem Solver
        </p>
      </div>

      {/* 1. Who I Am */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-emerald-500" />
          <span>Who I Am</span>
        </h2>
        <div className="space-y-4 text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
          <p>
            I&apos;m Himarghya, a software developer based in India who loves turning abstract problems into robust, working code.
          </p>
          <p>
            I don&apos;t look at programming as just stringing together framework APIs. I find genuine joy in understanding what happens underneath the abstraction layer — from how the operating system handles worker threads, to how relational database query planners parse composite indexes, to how distributed nodes agree on lease ownership during unexpected network partitions.
          </p>
        </div>
      </section>

      {/* 2. How I Got Into Programming */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-amber-500" />
          <span>How I Got Into Programming</span>
        </h2>
        <div className="space-y-4 text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
          <p>
            My journey began with the fundamentals: learning how data structures work in memory, solving algorithmic puzzles in C++, and understanding algorithmic time complexities.
          </p>
          <p>
            As I progressed, I wanted to build tangible software that people could interact with across the internet. I started building frontend interfaces with React, quickly realized that the hardest and most fascinating engineering problems live on the backend, and transitioned heavily into server architectures, Node.js runtimes, PostgreSQL modeling, and Redis caching topologies.
          </p>
        </div>
      </section>

      {/* 3. What I Enjoy Building */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-500" />
          <span>What I Enjoy Building</span>
        </h2>
        <div className="space-y-3 text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
          <p>
            I am happiest when building systems where correctness, resilience, and clean architecture matter:
          </p>
          <ul className="space-y-2.5 pl-2">
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-500 font-mono font-bold">→</span>
              <div>
                <strong className="text-zinc-900 dark:text-zinc-100">Distributed & Background Workloads:</strong> Designing worker pools, idempotent message queues, and lease recovery engines (like <Link to="/projects/pulsemesh" className="text-emerald-600 dark:text-emerald-400 underline">PulseMesh</Link>).
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-500 font-mono font-bold">→</span>
              <div>
                <strong className="text-zinc-900 dark:text-zinc-100">Data-Intensive Applications:</strong> Timeseries analytics, sensor aggregation, and spatial indexing (like <Link to="/projects/varshanet" className="text-emerald-600 dark:text-emerald-400 underline">VARSHANET</Link> and <Link to="/projects/ocean-intelligence" className="text-emerald-600 dark:text-emerald-400 underline">Ocean Intelligence Platform</Link>).
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-500 font-mono font-bold">→</span>
              <div>
                <strong className="text-zinc-900 dark:text-zinc-100">Offline-First & Resilient Clients:</strong> Systems utilizing CRDTs and local indexed storage to stay 100% operational during connectivity loss (like <Link to="/projects/polaris" className="text-emerald-600 dark:text-emerald-400 underline">POLARIS</Link>).
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-500 font-mono font-bold">→</span>
              <div>
                <strong className="text-zinc-900 dark:text-zinc-100">Developer Tooling & Notes:</strong> Clean CLIs, reproducible environments, and detailed technical writing.
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* 4. What I'm Learning Right Now */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-500" />
          <span>What I&apos;m Learning</span>
        </h2>
        <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111111] space-y-3">
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            I treat learning as an active daily discipline. My current focus areas include:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 block mb-1">Distributed Consensus</span>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs">Studying Raft, vector clocks, and crash-recovery protocols.</p>
            </div>
            <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 block mb-1">Modern C++ Memory Internals</span>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs">Move semantics, custom allocators, and cache locality profiling.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. What I'm Trying to Become */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>What I&apos;m Trying to Become</span>
        </h2>
        <div className="space-y-4 text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
          <p>
            I don&apos;t care for generic corporate titles. My goal is to become the kind of engineer who can be handed a vague, complex systems problem and methodically decompose it, design a clean architecture, write reliable code, benchmark the bottlenecks, and explain the tradeoffs clearly to others.
          </p>
          <p>
            I want to build software that is durable, elegant, and genuinely useful to the people who rely on it.
          </p>
        </div>
      </section>

      {/* Engineering Philosophy Cards */}
      <section className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <h2 className="text-sm font-mono font-semibold uppercase tracking-wider text-zinc-500">
          Guiding Principles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {profile.philosophy.map((rule, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-zinc-900/30 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300"
            >
              <span className="font-mono text-emerald-500 mr-2">0{idx + 1}.</span>
              {rule}
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <div className="pt-6 flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800">
        <span className="text-xs text-zinc-500 font-mono">Want to work together or chat?</span>
        <Link
          to="/contact"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          <span>Get in touch</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
