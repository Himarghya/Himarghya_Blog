import React from 'react';
import { Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import { journeyTimeline, JourneyItem } from '../data/journey';
import { Link } from 'react-router-dom';

export const Journey: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-10 pb-16 pt-6">
      {/* Header */}
      <div className="space-y-3 border-b border-zinc-200/60 dark:border-zinc-800/60 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
          <Compass className="w-4 h-4" />
          <span>ROADMAP & EVOLUTION</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          Developer Journey
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          A timeline of personal growth, engineering milestones, and how my technical focus has shifted from fundamentals to distributed systems and backend infrastructure.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative border-l-2 border-zinc-200 dark:border-zinc-800 ml-4 sm:ml-6 space-y-12">
        {journeyTimeline.map((item: JourneyItem) => (
          <div key={item.year} className="relative pl-6 sm:pl-8 group">
            {/* Timeline Node Icon */}
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-white dark:border-[#09090B] bg-zinc-400 dark:bg-zinc-500 group-hover:scale-125 transition-transform" />

            {/* Year & Quarter Badge */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-mono font-bold text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800/80 px-2.5 py-0.5 rounded-lg border border-zinc-200/60 dark:border-zinc-700/60">
                {item.year}
              </span>
              {item.quarter && (
                <span className="text-xs font-mono text-zinc-400">
                  ({item.quarter})
                </span>
              )}
            </div>

            {/* Content Card (Glassmorphic) */}
            <div className="p-6 rounded-2xl backdrop-blur-md bg-white/60 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20 transition-all space-y-4 shadow-sm">
              <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
                {item.title}
              </h2>

              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {item.description}
              </p>

              {/* Highlights */}
              <div className="space-y-2 pt-1">
                <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500">
                  Key Milestones
                </h3>
                <ul className="space-y-1.5">
                  {item.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-zinc-100/80 dark:border-zinc-800/80">
                {item.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-[11px] font-mono rounded bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 border border-zinc-200/40 dark:border-zinc-700/40"
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
      <div className="pt-8 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between">
        <span className="text-xs font-mono text-zinc-500">Want to see what I&apos;m doing right now?</span>
        <Link
          to="/now"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-zinc-800 dark:text-zinc-200 hover:underline"
        >
          <span>View the Now page</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
