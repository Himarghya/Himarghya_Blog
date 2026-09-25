import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Github,
  Linkedin,
  FileText,
  Code2,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import { blogPosts } from '../data/blog';
import { skillGroups } from '../data/skills';
import { socialLinks } from '../data/social';
import { TerminalSignature } from '../components/home/TerminalSignature';

export const Home: React.FC = () => {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const latestArticles = blogPosts.slice(0, 3);

  return (
    <div className="space-y-20 sm:space-y-28 pb-12">
      {/* 1. HERO SECTION */}
      <section className="pt-8 sm:pt-14 max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 text-xs font-mono rounded-full glass-panel text-slate-700 dark:text-zinc-300 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-zinc-400" />
            <span>Available for high-impact software engineering roles</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50 leading-[1.15]">
            Hi, I&apos;m Himarghya. <br className="hidden sm:inline" />
            <span className="text-slate-500 dark:text-zinc-400 font-medium">
              I build things for the web.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
            {profile.bioIntro}
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 font-semibold text-sm shadow-sm hover:shadow active:scale-[0.99] transition-all"
          >
            <BookOpen className="w-4 h-4" />
            <span>Read My Writing</span>
          </Link>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-card text-slate-900 dark:text-zinc-100 font-semibold text-sm hover:bg-white dark:hover:bg-zinc-800 transition-all shadow-2xs"
          >
            <Code2 className="w-4 h-4" />
            <span>View My Projects</span>
          </Link>

          {/* Social icons row */}
          <div className="flex items-center gap-2 sm:pl-2">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-3 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 rounded-xl glass-card hover:bg-white dark:hover:bg-zinc-800 transition-colors shadow-2xs"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-3 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 rounded-xl glass-card hover:bg-white dark:hover:bg-zinc-800 transition-colors shadow-2xs"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={socialLinks.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-mono font-semibold text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-zinc-100 rounded-xl glass-card hover:bg-white dark:hover:bg-zinc-800 transition-colors shadow-2xs"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume.pdf</span>
            </a>
          </div>
        </div>

        {/* 2. HERO VISUAL: Interactive Terminal Signature */}
        <div className="pt-4">
          <TerminalSignature />
        </div>
      </section>

      {/* 3. PERSONAL INTRODUCTION */}
      <section className="max-w-4xl mx-auto space-y-6 pt-6 border-t border-slate-200/80 dark:border-zinc-800/80">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
            A little about me
          </h2>
          <Link
            to="/about"
            className="group flex items-center gap-1 text-xs font-mono text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:underline"
          >
            <span>More about me</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="space-y-4 text-slate-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
          <p>
            I&apos;m a developer who enjoys turning ideas into working software. I started with the fundamentals and gradually moved into full-stack development, backend systems, databases, and problem solving.
          </p>
          <p>
            These days, I&apos;m interested in building projects that are slightly more difficult than the last one and understanding why the systems behind them work under the hood.
          </p>
        </div>
      </section>

      {/* 4. CURRENTLY SECTION (Glassmorphic Cards) */}
      <section className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-zinc-800/80">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-slate-400 dark:text-zinc-400" />
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
              Currently
            </h2>
          </div>
          <Link
            to="/now"
            className="text-xs font-mono text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 flex items-center gap-1"
          >
            <span>now page</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Currently Building */}
          <div className="glass-card p-6 rounded-2xl space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-zinc-300">
              Building
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-zinc-400">
              {profile.currently.building.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-slate-400 dark:text-zinc-500 font-mono">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Currently Learning */}
          <div className="glass-card p-6 rounded-2xl space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-zinc-300">
              Learning
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-zinc-400">
              {profile.currently.learning.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-slate-400 dark:text-zinc-500 font-mono">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Currently Exploring */}
          <div className="glass-card p-6 rounded-2xl space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-zinc-300">
              Exploring
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-zinc-400">
              {profile.currently.exploring.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-slate-400 dark:text-zinc-500 font-mono">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. FEATURED PROJECTS */}
      <section className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-zinc-800/80">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
              Things I&apos;ve Built
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
              Selected systems, platforms, and developer utilities.
            </p>
          </div>
          <Link
            to="/projects"
            className="group flex items-center gap-1 text-xs font-mono text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:underline"
          >
            <span>All projects ({projects.length})</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {featuredProjects.map((project) => (
            <div
              key={project.slug}
              className="glass-card p-6 sm:p-7 rounded-2xl space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="text-lg sm:text-xl font-bold text-slate-900 dark:text-zinc-100 hover:text-slate-600 dark:hover:text-zinc-300 transition-colors"
                  >
                    {project.name}
                  </Link>
                  <span className="px-2.5 py-0.5 text-[11px] font-mono rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200/80 dark:border-zinc-700/60 font-medium">
                    {project.category}
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400">{project.year}</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                {project.description}
              </p>

              {/* Tech Badges */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 text-[11px] font-mono rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200/70 dark:border-zinc-700/40"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-zinc-800/80 text-xs">
                <div className="flex items-center gap-4">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 transition-colors font-mono font-medium"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 transition-colors font-mono font-medium"
                    >
                      <span>Demo</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <Link
                  to={`/projects/${project.slug}`}
                  className="flex items-center gap-1 font-semibold text-slate-900 dark:text-zinc-100 hover:underline font-mono"
                >
                  <span>Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. THINGS I'VE LEARNED / LATEST ARTICLES */}
      <section className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-zinc-800/80">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
              Things I&apos;ve Learned
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
              Notes from building, breaking, debugging and learning.
            </p>
          </div>
          <Link
            to="/blog"
            className="group flex items-center gap-1 text-xs font-mono text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:underline"
          >
            <span>Read all writing ({blogPosts.length})</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="divide-y divide-slate-200/80 dark:divide-zinc-800/80">
          {latestArticles.map((article) => (
            <article key={article.slug} className="py-6 first:pt-2 last:pb-2 space-y-2.5">
              <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-zinc-400">
                <span>{article.date}</span>
                <span>•</span>
                <span>{article.readingTime}</span>
                <span>•</span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-medium border border-slate-200/80 dark:border-zinc-700/40">
                  {article.category}
                </span>
              </div>

              <Link
                to={`/blog/${article.slug}`}
                className="block group space-y-1.5"
              >
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-zinc-100 group-hover:text-slate-600 dark:group-hover:text-zinc-300 transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* 7. TOOLS I WORK WITH */}
      <section className="max-w-4xl mx-auto space-y-6">
        <div className="pb-2 border-b border-slate-200/80 dark:border-zinc-800/80">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
            Tools I Work With
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
            Technologies, runtimes, and databases I reach for when building software.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="glass-card p-6 rounded-2xl space-y-3"
            >
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 border-b border-slate-100 dark:border-zinc-800/80 pb-2">
                {group.category}
              </h3>

              <div className="space-y-2">
                {group.skills.map((skill) => (
                  <div key={skill.name} className="flex flex-col text-xs">
                    <span className="font-semibold text-slate-900 dark:text-zinc-200">
                      {skill.name}
                    </span>
                    {skill.note && (
                      <span className="text-[11px] text-slate-500 dark:text-zinc-400">
                        {skill.note}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. LET'S TALK / QUICK CONTACT CTA */}
      <section className="max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl glass-card space-y-4">
        <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
          Let&apos;s talk.
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 max-w-xl leading-relaxed">
          Have a project in mind, found something interesting in one of my articles, or just want to discuss backend architectures? I&apos;d be happy to connect.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 font-semibold text-sm shadow-sm hover:shadow active:scale-[0.99] transition-all"
          >
            <span>Send a message</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href={`mailto:${socialLinks.email}`}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl glass-card text-slate-800 dark:text-zinc-200 text-sm hover:bg-white dark:hover:bg-zinc-700/80 transition-colors font-mono text-xs font-medium"
          >
            <span>{socialLinks.email}</span>
          </a>
        </div>
      </section>
    </div>
  );
};
