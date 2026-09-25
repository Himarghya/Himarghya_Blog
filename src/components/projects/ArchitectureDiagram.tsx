import React, { useState } from 'react';
import { ProjectArchitecture } from '../../data/projects';
import { Layers, ArrowDown, CheckCircle2 } from 'lucide-react';

interface ArchitectureDiagramProps {
  architecture: ProjectArchitecture;
  projectName: string;
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({
  architecture,
  projectName,
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <div className="rounded-2xl border border-zinc-200/60 dark:border-white/10 backdrop-blur-md bg-white/60 dark:bg-zinc-900/40 p-5 sm:p-7 shadow-sm">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-semibold text-sm sm:text-base">
          <Layers className="w-4 h-4 text-zinc-500" />
          <span>{projectName} System Flow & Architecture</span>
        </div>
        <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
          Step {activeStep + 1} of {architecture.steps.length}
        </span>
      </div>

      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
        {architecture.summary}
      </p>

      {/* Step Sequence Flow */}
      <div className="space-y-3">
        {architecture.steps.map((step, idx) => {
          const isSelected = idx === activeStep;
          return (
            <div key={idx}>
              <div
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-xl border transition-all cursor-pointer backdrop-blur-sm ${
                  isSelected
                    ? 'border-zinc-400 dark:border-white/30 bg-zinc-100/80 dark:bg-zinc-800/60 shadow-xs'
                    : 'border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900/30'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-mono font-semibold ${
                          isSelected ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-700 dark:text-zinc-300'
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <span className="flex-shrink-0 px-2 py-1 text-[11px] font-mono rounded-lg bg-zinc-200/60 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-300/60 dark:border-zinc-700">
                    {step.tech}
                  </span>
                </div>
              </div>

              {idx < architecture.steps.length - 1 && (
                <div className="flex justify-center py-1.5">
                  <ArrowDown className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-600" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" /> Fully decoupled execution layers
        </span>
        <span className="font-mono">Deterministic State Isolation</span>
      </div>
    </div>
  );
};
