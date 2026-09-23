import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, ArrowLeft, Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="max-w-md mx-auto py-20 text-center space-y-6">
      <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 flex items-center justify-center mx-auto">
        <Terminal className="w-6 h-6" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono text-emerald-500 uppercase tracking-wider">Error 404</span>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          The requested route doesn&apos;t exist or has moved to another destination.
        </p>
      </div>

      <div className="flex items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-medium hover:opacity-90 transition-opacity"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
};
