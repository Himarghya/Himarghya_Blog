import React from 'react';
import { Sparkles, Calendar, BookOpen, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { nowData } from '../data/now';
import { Link } from 'react-router-dom';

export const Now: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-10 pb-16 pt-6">
      {/* Header */}
      <div className="space-y-3 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400">
          <Clock className="w-4 h-4" />
          <span>CURRENT FOCUS & ACTIVITIES</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          What I&apos;m Doing Now
        </h1>
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
          <Calendar className="w-3.5 h-3.5 text-zinc-400" />
          <span>Last updated: {nowData.lastUpdated}</span>
          <span>•</span>
          <span>Location: {nowData.location}</span>
        </div>
      </div>

      {/* Current Thought Quote */}
      <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/30 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 italic border-l-4 border-l-emerald-500 leading-relaxed">
        &ldquo;{nowData.currentThought}&rdquo;
      </div>

      {/* Focus Areas */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          <span>Primary Focus Areas</span>
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {nowData.focusAreas.map((area, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111111] space-y-2.5 shadow-sm"
            >
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {area.category}
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                {area.items.map((item, iIdx) => (
                  <li key={iIdx} className="flex items-start gap-2.5">
                    <span className="text-emerald-500 font-mono font-bold">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Reading List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-500" />
          <span>Current Technical Reading</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {nowData.readingList.map((book, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111111] space-y-1 text-xs shadow-sm"
            >
              <span
                className={`px-2 py-0.5 text-[10px] font-mono rounded font-semibold inline-block mb-1 ${
                  book.status === 'Reading'
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
                }`}
              >
                {book.status}
              </span>
              <div className="font-bold text-zinc-900 dark:text-zinc-100">{book.title}</div>
              <div className="text-zinc-500 dark:text-zinc-400">by {book.author}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Now Page Info Note */}
      <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-xs text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
        <span>
          Inspired by Derek Sivers&apos; <a href="https://nownownow.com/about" target="_blank" rel="noreferrer" className="underline text-emerald-600 dark:text-emerald-400">Now page movement</a>.
        </span>
        <Link to="/contact" className="hover:underline text-zinc-700 dark:text-zinc-300 font-medium">
          Say hello →
        </Link>
      </div>
    </div>
  );
};
