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
      <div className="space-y-3 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400">
          <BookOpen className="w-4 h-4" />
          <span>DEVELOPER JOURNAL & NOTES</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          Writing
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Things I&apos;ve learned while building software, solving problems, and figuring things out. Practical notes on backend architecture, systems, databases, and C++.
        </p>

        {/* Search and Category Filter */}
        <div className="pt-4 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles by title, keyword, or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111111] text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-mono rounded-lg transition-colors ${
                  selectedCategory === cat
                    ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Listing */}
      <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
        {filteredPosts.length === 0 ? (
          <div className="py-12 text-center text-zinc-500 dark:text-zinc-400 text-sm">
            No articles found matching your criteria.
          </div>
        ) : (
          filteredPosts.map((post: BlogPost) => (
            <article key={post.slug} className="py-8 first:pt-2 last:pb-2 space-y-3">
              {/* Meta information */}
              <div className="flex items-center gap-3 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {post.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {post.readingTime}
                </span>
                <span>•</span>
                <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium">
                  {post.category}
                </span>
              </div>

              {/* Title & Excerpt */}
              <Link to={`/blog/${post.slug}`} className="block group space-y-1.5">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </Link>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono rounded bg-zinc-100 dark:bg-zinc-800/60 text-zinc-500 dark:text-zinc-400"
                  >
                    <Tag className="w-2.5 h-2.5" />
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
