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
  Layers,
  Sparkles
} from 'lucide-react';
import { blogPosts, BlogPost } from '../data/blog';
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
      <div className="space-y-4 border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">
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
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
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

        {/* Linked Project Banner (Bidirectional Project + Blog Connection) */}
        {linkedProject && (
          <div className="p-3.5 rounded-lg bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
              <Layers className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>
                This article explores systems engineered for the <strong className="font-semibold">{linkedProject.name}</strong> project.
              </span>
            </div>
            <Link
              to={`/projects/${linkedProject.slug}`}
              className="flex-shrink-0 flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              <span>View Case Study</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>

      {/* Article Markdown Body */}
      <article className="min-w-0">
        <MarkdownRenderer content={post.content} />
      </article>

      {/* Article Tags */}
      <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-zinc-400 mr-1">Tags:</span>
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
          >
            <Tag className="w-3 h-3 text-zinc-400" />
            {tag}
          </span>
        ))}
      </div>

      {/* Author Card Signature */}
      <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111111] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1">
          <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold uppercase">
            Written by
          </div>
          <div className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            {profile.name}
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md">
            Full-stack developer and C++ programmer. Building systems and writing down what I learn along the way.
          </p>
        </div>

        <Link
          to="/about"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
        >
          <span>More about Himarghya</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* More from Himarghya */}
      {otherPosts.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <h3 className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            More from Himarghya
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherPosts.map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111111] hover:border-emerald-500/60 transition-colors group space-y-1.5"
              >
                <div className="text-[11px] font-mono text-zinc-400">{p.category} • {p.readingTime}</div>
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                  {p.title}
                </h4>
                <p className="text-xs text-zinc-500 line-clamp-2">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
