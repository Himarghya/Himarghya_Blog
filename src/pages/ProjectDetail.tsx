import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  ArrowLeft,
  Github,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FileText,
  Calendar,
  Layers,
  Cpu
} from 'lucide-react';
import { projects } from '../data/projects';
import { blogPosts } from '../data/blog';
import { ArchitectureDiagram } from '../components/projects/ArchitectureDiagram';
import { ProjectSimulator } from '../components/projects/ProjectSimulator';

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  // Find related blog articles
  const relatedArticles = blogPosts.filter((article) =>
    project.relatedBlogSlugs.includes(article.slug)
  );

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-16 pt-4">
      {/* Back Button */}
      <Link
        to="/projects"
        className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to all projects</span>
      </Link>

      {/* Project Header */}
      <div className="space-y-4 border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
            {project.category}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" /> {project.year}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          {project.name}
        </h1>

        <p className="text-base sm:text-lg text-emerald-600 dark:text-emerald-400 font-medium">
          {project.tagline}
        </p>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
          {project.longDescription}
        </p>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90 transition-opacity"
          >
            <Github className="w-4 h-4" />
            <span>View GitHub Repository</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              <span>Explore Live Demo</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* Stats Row */}
        {project.stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
            {project.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800"
              >
                <div className="text-[11px] font-mono text-zinc-500 uppercase">{stat.label}</div>
                <div className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 1. Live Interactive Simulator (Unique feature) */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-emerald-500" />
          <span>Interactive Live System Simulator</span>
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          Test and interact with this system&apos;s state transitions, failure recovery routines, and event streams directly in your browser.
        </p>
        <ProjectSimulator slug={project.slug} />
      </section>

      {/* 2. Problem & Solution */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111111] space-y-3">
          <h2 className="text-sm font-mono font-semibold uppercase tracking-wider text-red-500 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" /> The Problem
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {project.problem}
          </p>
        </div>

        <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111111] space-y-3">
          <h2 className="text-sm font-mono font-semibold uppercase tracking-wider text-emerald-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> The Solution
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {project.solution}
          </p>
        </div>
      </section>

      {/* 3. Architecture & Flow Visualizer */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-500" />
          <span>System Architecture & Data Flow</span>
        </h2>
        <ArchitectureDiagram architecture={project.architecture} projectName={project.name} />
      </section>

      {/* 4. Key Capabilities */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Key Capabilities & Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {project.keyFeatures.map((feature, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 flex items-start gap-2.5"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Engineering Challenges & Resolutions */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <span>Hard Engineering Challenges</span>
        </h2>
        <div className="space-y-4">
          {project.challenges.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111111] space-y-2.5"
            >
              <h3 className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                <span className="font-mono text-amber-500 mr-2">Challenge #{idx + 1}:</span>
                {item.challenge}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pl-4 border-l-2 border-emerald-500/50">
                <strong className="text-zinc-800 dark:text-zinc-200">Resolution: </strong>
                {item.resolution}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. What I Learned */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          <span>What I Learned</span>
        </h2>
        <ul className="space-y-2.5 pl-2">
          {project.learnings.map((learning, idx) => (
            <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
              <span className="text-emerald-500 font-mono font-bold">→</span>
              <span>{learning}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 7. Related Technical Writing */}
      {relatedArticles.length > 0 && (
        <section className="space-y-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-500" />
            <span>Related Technical Writing</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedArticles.map((article) => (
              <Link
                key={article.slug}
                to={`/blog/${article.slug}`}
                className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111111] hover:border-emerald-500/60 transition-colors group space-y-1.5"
              >
                <div className="text-[11px] font-mono text-zinc-400">{article.category} • {article.readingTime}</div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                  {article.title}
                </h3>
                <p className="text-xs text-zinc-500 line-clamp-2">{article.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
