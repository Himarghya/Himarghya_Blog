import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Check,
  Tag,
  ArrowRight,
  Layers
} from 'lucide-react';
import { blogPosts } from '../data/blog';
import { projects } from '../data/projects';
import { profile } from '../data/profile';
import { MarkdownRenderer } from '../components/blog/MarkdownRenderer';

export const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [copiedLink, setCopiedLink] = useState(false);

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Find linked project if any
  const linkedProject = post.relatedProjectSlug
    ? projects.find((p) => p.slug === post.relatedProjectSlug)
    : null;

  // Other posts to read
  const otherPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10 pb-16 pt-4">
      {/* Back Button */}
      <Link
        to="/blog"
        className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to all writing</span>
      </Link>

      {/* Article Header */}
      <div className="space-y-4 border-b border-zinc-200/60 dark:border-zinc-800/60 pb-8">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold uppercase tracking-wider border border-zinc-200/60 dark:border-zinc-700/60">
              {post.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {post.readingTime}
            </span>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1 text-xs rounded-lg border border-zinc-200/80 dark:border-white/10 backdrop-blur-md bg-white/60 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors shadow-xs"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Copied' : 'Share'}</span>
          </button>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
          {post.title}
        </h1>

        {post.subtitle && (
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {post.subtitle}
          </p>
        )}

        {/* Linked Project Banner */}
        {linkedProject && (
          <div className="p-4 rounded-2xl backdrop-blur-md bg-white/60 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-white/10 flex items-center justify-between gap-3 text-xs shadow-xs">
            <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200">
              <Layers className="w-4 h-4 text-zinc-500 flex-shrink-0" />
              <span>
                This article explores systems engineered for the <strong className="font-semibold">{linkedProject.name}</strong> project.
              </span>
            </div>
            <Link
              to={`/projects/${linkedProject.slug}`}
              className="font-mono text-zinc-800 dark:text-zinc-200 hover:underline flex-shrink-0 font-medium"
            >
              View Project →
            </Link>
          </div>
        )}
      </div>

      {/* Main Article Content */}
      <article className="space-y-6">
        <MarkdownRenderer content={post.content} />
      </article>

      {/* Tags Footer */}
      <div className="pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60 flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-zinc-400 mr-2">Tags:</span>
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-700/60"
          >
            <Tag className="w-3 h-3" />
            {tag}
          </span>
        ))}
      </div>

      {/* Author Bio Box */}
      <div className="p-6 rounded-2xl backdrop-blur-md bg-white/60 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1">
          <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">
            Written by {profile.name}
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            {profile.role} based in {profile.location}.
          </p>
        </div>
        <Link
          to="/about"
          className="text-xs font-mono font-semibold text-zinc-800 dark:text-zinc-200 hover:underline"
        >
          More about Himarghya →
        </Link>
      </div>

      {/* Related Reading Cards */}
      {otherPosts.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60">
          <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Continue Reading
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherPosts.map((item) => (
              <Link
                key={item.slug}
                to={`/blog/${item.slug}`}
                className="p-5 rounded-2xl backdrop-blur-md bg-white/60 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20 transition-all group space-y-1.5 shadow-sm"
              >
                <div className="text-[11px] font-mono text-zinc-400">{item.category} • {item.readingTime}</div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-300">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-500 line-clamp-2">{item.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
