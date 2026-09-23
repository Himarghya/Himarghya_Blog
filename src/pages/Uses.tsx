import React from 'react';
import { Laptop, Terminal, Server, Wrench, Monitor } from 'lucide-react';
import { usesData, UseCategory } from '../data/uses';

export const Uses: React.FC = () => {
  const getCategoryIcon = (category: string) => {
    if (category.includes('Editor')) return <Laptop className="w-4 h-4 text-emerald-500" />;
    if (category.includes('Terminal')) return <Terminal className="w-4 h-4 text-amber-500" />;
    if (category.includes('Development')) return <Server className="w-4 h-4 text-indigo-500" />;
    if (category.includes('Database')) return <Server className="w-4 h-4 text-cyan-500" />;
    return <Monitor className="w-4 h-4 text-zinc-400" />;
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10 pb-16 pt-6">
      {/* Header */}
      <div className="space-y-3 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400">
          <Wrench className="w-4 h-4" />
          <span>GEAR & WORKSTATION SETUP</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          What I Use
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          A living list of the editor extensions, terminal configurations, development tools, databases, and workstation hardware I use every day to build software.
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-8">
        {usesData.map((section: UseCategory) => (
          <section key={section.category} className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-zinc-200 dark:border-zinc-800">
              {getCategoryIcon(section.category)}
              <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                {section.category}
              </h2>
            </div>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 -mt-2">
              {section.description}
            </p>

            <div className="grid grid-cols-1 gap-3">
              {section.items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111111] space-y-1.5 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {item.name}
                    </h3>
                    {item.tag && (
                      <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
