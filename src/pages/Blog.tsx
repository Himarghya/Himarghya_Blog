import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, BookOpen, Tag } from 'lucide-react';
import { blogPosts, BlogPost } from '../data/blog';

export const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Backend', 'Systems', 'C++', 'Databases', 'Architecture'];

  const filteredPosts = blogPosts.filter((post: BlogPost) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-3xl mx-auto space-y-10 pb-16 pt-6">
      {/* Header */}
      <div className="space-y-3 border-b border-slate-200/80 dark:border-zinc-800/80 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
          <BookOpen className="w-4 h-4" />
          <span>DEVELOPER JOURNAL & NOTES</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50">
          Writing
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
          Things I&apos;ve learned while building software, solving problems, and figuring things out. Practical notes on backend architecture, systems, databases, and C++.
        </p>

        {/* Search and Category Filter */}
        <div className="pt-4 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles by title, keyword, or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm rounded-2xl border border-slate-300 dark:border-white/10 bg-white dark:bg-zinc-900/60 text-slate-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:border-slate-800 dark:focus:border-white/30 focus:ring-2 focus:ring-slate-900/5 shadow-2xs transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-mono rounded-xl transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold shadow-xs'
                    : 'glass-card text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Listing */}
      <div className="divide-y divide-slate-200/80 dark:divide-zinc-800/80">
        {filteredPosts.length === 0 ? (
          <div className="py-12 text-center text-slate-500 dark:text-zinc-400 text-sm">
            No articles found matching your criteria.
          </div>
        ) : (
          filteredPosts.map((post: BlogPost) => (
            <article key={post.slug} className="py-8 first:pt-2 last:pb-2 space-y-3">
              {/* Meta information */}
              <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-zinc-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {post.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {post.readingTime}
                </span>
                <span>•</span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-semibold border border-slate-200/80 dark:border-zinc-700/40">
                  {post.category}
                </span>
              </div>

              {/* Title & Excerpt */}
              <Link to={`/blog/${post.slug}`} className="block group space-y-1.5">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100 group-hover:text-slate-600 dark:group-hover:text-zinc-300 transition-colors">
                  {post.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </Link>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-mono rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 border border-slate-200/70 dark:border-zinc-700/40 font-medium"
                  >
                    <Tag className="w-2.5 h-2.5 text-slate-400" />
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
};
