import React from 'react';
import { Sparkles, Calendar, BookOpen, Clock } from 'lucide-react';
import { nowData } from '../data/now';
import { Link } from 'react-router-dom';

export const Now: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-10 pb-16 pt-6">
      {/* Header */}
      <div className="space-y-3 border-b border-slate-200/80 dark:border-zinc-800/80 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
          <Clock className="w-4 h-4" />
          <span>CURRENT FOCUS & ACTIVITIES</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50">
          What I&apos;m Doing Now
        </h1>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Last updated: {nowData.lastUpdated}</span>
          <span>•</span>
          <span>Location: {nowData.location}</span>
        </div>
      </div>

      {/* Current Thought Quote */}
      <div className="glass-card p-6 rounded-2xl text-xs sm:text-sm text-slate-700 dark:text-zinc-300 italic border-l-4 border-l-slate-800 dark:border-l-zinc-500 leading-relaxed shadow-sm font-medium">
        &ldquo;{nowData.currentThought}&rdquo;
      </div>

      {/* Focus Areas */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-zinc-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-slate-400 dark:text-zinc-400" />
          <span>Primary Focus Areas</span>
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {nowData.focusAreas.map((area, idx) => (
            <div
              key={idx}
              className="glass-card p-6 rounded-3xl space-y-3"
            >
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-zinc-300">
                {area.category}
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-zinc-400">
                {area.items.map((item, iIdx) => (
                  <li key={iIdx} className="flex items-start gap-2.5">
                    <span className="text-slate-400 dark:text-zinc-500 font-mono font-bold">→</span>
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
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-zinc-100 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-slate-400 dark:text-zinc-400" />
          <span>Current Technical Reading</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {nowData.readingList.map((book, idx) => (
            <div
              key={idx}
              className="glass-card p-5 rounded-2xl space-y-2 text-xs"
            >
              <span
                className={`px-2.5 py-0.5 text-[10px] font-mono rounded-full font-bold inline-block ${
                  book.status === 'Reading'
                    ? 'bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                    : 'bg-slate-100 dark:bg-zinc-800 text-slate-500 border border-slate-200 dark:border-zinc-700'
                }`}
              >
                {book.status}
              </span>
              <div className="font-bold text-slate-900 dark:text-zinc-100 text-sm leading-snug">{book.title}</div>
              <div className="text-slate-500 dark:text-zinc-400">by {book.author}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Now Page Info Note */}
      <div className="glass-card p-5 rounded-2xl text-xs text-slate-600 dark:text-zinc-400 flex items-center justify-between font-medium">
        <span>
          Inspired by Derek Sivers&apos; <a href="https://nownownow.com/about" target="_blank" rel="noreferrer" className="underline text-slate-900 dark:text-zinc-100 font-semibold">Now page movement</a>.
        </span>
        <Link to="/contact" className="hover:underline text-slate-900 dark:text-zinc-100 font-bold font-mono">
          Say hello →
        </Link>
      </div>
    </div>
  );
};
