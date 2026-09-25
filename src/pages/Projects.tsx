import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, ArrowUpRight, ArrowRight, Layers, Cpu } from 'lucide-react';
import { projects, Project } from '../data/projects';
import { ProjectSimulator } from '../components/projects/ProjectSimulator';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTabByProject, setActiveTabByProject] = useState<Record<string, 'overview' | 'simulation'>>({});

  const categories = ['All', 'Distributed Systems', 'Data & Analytics', 'Logistics & IoT'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const toggleTab = (slug: string, tab: 'overview' | 'simulation') => {
    setActiveTabByProject((prev) => ({ ...prev, [slug]: tab }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-16 pt-6">
      {/* Header */}
      <div className="space-y-3 border-b border-zinc-200/60 dark:border-zinc-800/60 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
          <Layers className="w-4 h-4" />
          <span>PORTFOLIO & SYSTEM SIMULATORS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          Things I&apos;ve Built
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
          A collection of distributed systems, background worker pools, offline-first applications, and data platforms. Test live simulated environments directly in the browser or inspect the complete engineering case studies.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-mono rounded-xl backdrop-blur-md transition-all ${
                selectedCategory === cat
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold shadow-xs'
                  : 'bg-white/60 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 border border-zinc-200/60 dark:border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="space-y-8">
        {filteredProjects.map((project: Project) => {
          const currentTab = activeTabByProject[project.slug] || 'overview';
          const hasSimulator = ['pulsemesh', 'varshanet', 'polaris'].includes(project.slug);

          return (
            <div
              key={project.slug}
              className="p-6 sm:p-7 rounded-2xl backdrop-blur-md bg-white/60 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20 transition-all shadow-sm hover:shadow-md space-y-4"
            >
              {/* Card Header & Tabs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="text-xl font-bold text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                  >
                    {project.name}
                  </Link>
                  <span className="px-2.5 py-0.5 text-[11px] font-mono rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-700/60">
                    {project.category}
                  </span>
                </div>

                {/* View switcher tabs */}
                <div className="flex items-center gap-1.5 backdrop-blur-md bg-zinc-100/70 dark:bg-zinc-800/70 p-1 rounded-xl border border-zinc-200/60 dark:border-white/10 text-xs font-mono">
                  <button
                    onClick={() => toggleTab(project.slug, 'overview')}
                    className={`px-2.5 py-1 rounded-lg transition-colors ${
                      currentTab === 'overview'
                        ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-semibold shadow-xs'
                        : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                    }`}
                  >
                    Overview
                  </button>
                  {hasSimulator && (
                    <button
                      onClick={() => toggleTab(project.slug, 'simulation')}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors ${
                        currentTab === 'simulation'
                          ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold shadow-xs'
                          : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                      }`}
                    >
                      <Cpu className="w-3 h-3" />
                      <span>Live Sim</span>
                    </button>
                  )}
                </div>
              </div>

              <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                {project.tagline}
              </p>

              {/* Tab Content */}
              {currentTab === 'overview' ? (
                <div className="space-y-4">
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Stats Chips */}
                  {project.stats && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-1">
                      {project.stats.map((stat, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl backdrop-blur-sm bg-zinc-50/70 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-white/5 text-xs"
                        >
                          <span className="text-zinc-400 text-[10px] block font-mono">{stat.label}</span>
                          <span className="font-semibold text-zinc-800 dark:text-zinc-200">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Technologies */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[11px] font-mono rounded bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200/40 dark:border-zinc-700/40"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="pt-2 animate-in fade-in duration-150">
                  <ProjectSimulator slug={project.slug} />
                </div>
              )}

              {/* Action Links */}
              <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800/80 text-xs">
                <div className="flex items-center gap-4">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors font-mono"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Repository</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors font-mono"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <Link
                  to={`/projects/${project.slug}`}
                  className="flex items-center gap-1 font-semibold text-zinc-800 dark:text-zinc-200 hover:underline font-mono"
                >
                  <span>Full Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
