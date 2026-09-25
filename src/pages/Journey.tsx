import React from 'react';
import { Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import { journeyTimeline, JourneyItem } from '../data/journey';
import { Link } from 'react-router-dom';

export const Journey: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-10 pb-16 pt-6">
      {/* Header */}
      <div className="space-y-3 border-b border-slate-200/80 dark:border-zinc-800/80 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
          <Compass className="w-4 h-4" />
          <span>ROADMAP & EVOLUTION</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50">
          Developer Journey
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
          A timeline of personal growth, engineering milestones, and how my technical focus has shifted from fundamentals to distributed systems and backend infrastructure.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative border-l-2 border-slate-200 dark:border-zinc-800 ml-4 sm:ml-6 space-y-12">
        {journeyTimeline.map((item: JourneyItem) => (
          <div key={item.year} className="relative pl-6 sm:pl-8 group">
            {/* Timeline Node Icon */}
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-white dark:border-[#09090B] bg-slate-400 dark:bg-zinc-500 group-hover:scale-125 transition-transform shadow-xs" />

            {/* Year & Quarter Badge */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-mono font-bold text-slate-800 dark:text-zinc-200 bg-slate-100 dark:bg-zinc-800/80 px-3 py-1 rounded-xl border border-slate-200/80 dark:border-zinc-700/60 shadow-2xs">
                {item.year}
              </span>
              {item.quarter && (
                <span className="text-xs font-mono text-slate-400">
                  ({item.quarter})
                </span>
              )}
            </div>

            {/* Content Card (Glassmorphic) */}
            <div className="glass-card p-6 sm:p-7 rounded-3xl space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-zinc-100">
                {item.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                {item.description}
              </p>

              {/* Highlights */}
              <div className="space-y-2 pt-1">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                  Key Milestones
                </h3>
                <ul className="space-y-1.5">
                  {item.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-zinc-800/80">
                {item.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 text-[11px] font-mono rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200/70 dark:border-zinc-700/40"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Navigation Link */}
      <div className="pt-8 border-t border-slate-200/80 dark:border-zinc-800/80 flex items-center justify-between">
        <span className="text-xs font-mono text-slate-500 font-medium">Want to see what I&apos;m doing right now?</span>
        <Link
          to="/now"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-900 dark:text-zinc-100 hover:underline"
        >
          <span>View the Now page</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
