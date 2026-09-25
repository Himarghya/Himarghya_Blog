import React from 'react';
import { Laptop, Terminal, Server, Wrench, Monitor } from 'lucide-react';
import { usesData, UseCategory } from '../data/uses';

export const Uses: React.FC = () => {
  const getCategoryIcon = (category: string) => {
    if (category.includes('Editor')) return <Laptop className="w-4 h-4 text-zinc-500" />;
    if (category.includes('Terminal')) return <Terminal className="w-4 h-4 text-zinc-500" />;
    if (category.includes('Development')) return <Server className="w-4 h-4 text-zinc-500" />;
    if (category.includes('Database')) return <Server className="w-4 h-4 text-zinc-500" />;
    return <Monitor className="w-4 h-4 text-zinc-500" />;
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10 pb-16 pt-6">
      {/* Header */}
      <div className="space-y-3 border-b border-zinc-200/60 dark:border-zinc-800/60 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
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
            <div className="flex items-center gap-2 pb-2 border-b border-zinc-200/60 dark:border-zinc-800/60">
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
                  className="p-4 rounded-2xl backdrop-blur-md bg-white/60 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20 transition-all space-y-1.5 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {item.name}
                    </h3>
                    {item.tag && (
                      <span className="px-2.5 py-0.5 text-[10px] font-mono rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60">
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
