import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FileText, Code2, Compass, ArrowRight, X, Sparkles } from 'lucide-react';
import { blogPosts } from '../../data/blog';
import { projects } from '../../data/projects';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: 'article' | 'project' | 'page';
  url: string;
  tag?: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Static pages searchable
  const staticPages: SearchResult[] = [
    { id: 'page-home', title: 'Home', subtitle: 'Introduction, currently, featured work & tools', type: 'page', url: '/' },
    { id: 'page-about', title: 'About Himarghya', subtitle: 'Who I am, philosophy, what I enjoy building', type: 'page', url: '/about' },
    { id: 'page-projects', title: 'Projects Showcase', subtitle: 'Things I have built & deep dive case studies', type: 'page', url: '/projects' },
    { id: 'page-blog', title: 'Writing & Blog', subtitle: 'Notes from building, debugging and learning', type: 'page', url: '/blog' },
    { id: 'page-journey', title: 'Developer Journey', subtitle: 'Chronological timeline of growth & milestones', type: 'page', url: '/journey' },
    { id: 'page-uses', title: 'What I Use', subtitle: 'Workstation, editor, terminal & tooling setup', type: 'page', url: '/uses' },
    { id: 'page-now', title: 'Now Page', subtitle: 'What I am currently focusing on this month', type: 'page', url: '/now' },
    { id: 'page-contact', title: 'Contact', subtitle: 'Get in touch, project inquiries or say hello', type: 'page', url: '/contact' },
    { id: 'page-guestbook', title: 'Guestbook', subtitle: 'Leave a note or feedback for Himarghya', type: 'page', url: '/guestbook' },
  ];

  // Map all searchable records
  const allResults: SearchResult[] = [
    ...blogPosts.map((post) => ({
      id: `post-${post.slug}`,
      title: post.title,
      subtitle: post.subtitle || post.excerpt,
      type: 'article' as const,
      url: `/blog/${post.slug}`,
      tag: post.category,
    })),
    ...projects.map((proj) => ({
      id: `proj-${proj.slug}`,
      title: proj.name,
      subtitle: proj.tagline || proj.description,
      type: 'project' as const,
      url: `/projects/${proj.slug}`,
      tag: proj.category,
    })),
    ...staticPages,
  ];

  const filteredResults = query.trim() === ''
    ? allResults.slice(0, 7)
    : allResults.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          (item.tag && item.tag.toLowerCase().includes(q))
        );
      });

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (result: SearchResult) => {
    onClose();
    navigate(result.url);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredResults.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % Math.max(1, filteredResults.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        handleSelect(filteredResults[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-[#121212] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-200 dark:border-zinc-800">
          <Search className="w-5 h-5 text-zinc-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search articles, projects, system notes... (ESC to close)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm sm:text-base text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-mono text-zinc-400 bg-zinc-100 dark:bg-zinc-800/80 rounded border border-zinc-300 dark:border-zinc-700">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-zinc-100 dark:divide-zinc-800/50">
          {filteredResults.length === 0 ? (
            <div className="p-8 text-center text-zinc-500 dark:text-zinc-400 text-sm">
              No results found for &ldquo;{query}&rdquo;. Try searching for &ldquo;Node.js&rdquo;, &ldquo;Redis&rdquo;, or &ldquo;PulseMesh&rdquo;.
            </div>
          ) : (
            filteredResults.map((result, idx) => {
              const isSelected = idx === selectedIndex;
              const Icon =
                result.type === 'article'
                  ? FileText
                  : result.type === 'project'
                  ? Code2
                  : Compass;

              return (
                <div
                  key={result.id}
                  onClick={() => handleSelect(result)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-1.5 rounded-md ${
                        result.type === 'article'
                          ? 'bg-amber-500/10 text-amber-500'
                          : result.type === 'project'
                          ? 'bg-emerald-500/10 text-emerald-500'
                          : 'bg-indigo-500/10 text-indigo-500'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm truncate">{result.title}</span>
                        {result.tag && (
                          <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-zinc-200/60 dark:bg-zinc-700/60 text-zinc-600 dark:text-zinc-400">
                            {result.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate max-w-md">
                        {result.subtitle}
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 flex-shrink-0 transition-opacity ${
                      isSelected ? 'opacity-100 text-zinc-400' : 'opacity-0'
                    }`}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between px-4 py-2 bg-zinc-50 dark:bg-zinc-900/60 border-t border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-zinc-200/70 dark:bg-zinc-800 rounded font-mono">↑↓</kbd> to navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-zinc-200/70 dark:bg-zinc-800 rounded font-mono">↵</kbd> to select
            </span>
          </div>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-500" /> Quick Jump
          </span>
        </div>
      </div>
    </div>
  );
};
