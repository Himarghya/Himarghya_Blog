import React, { useState } from 'react';
import { Mail, Github, Linkedin, Copy, Check, Send, MessageSquare } from 'lucide-react';
import { socialLinks } from '../data/social';

export const Contact: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const copyEmail = () => {
    navigator.clipboard.writeText(socialLinks.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    }, 600);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10 pb-16 pt-6">
      {/* Header */}
      <div className="space-y-3 border-b border-slate-200/80 dark:border-zinc-800/80 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
          <MessageSquare className="w-4 h-4" />
          <span>DIRECT COMMUNICATION</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50">
          Let&apos;s talk.
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
          Have a project idea, found something interesting in one of my articles, or just want to chat about backend systems and C++? I&apos;d be happy to hear from you.
        </p>
      </div>

      {/* Direct Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Email Card */}
        <div className="glass-card p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-medium text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-700 dark:text-zinc-300" /> Email
            </span>
            <button
              onClick={copyEmail}
              title="Copy Email"
              className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-zinc-100 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-slate-900 dark:text-zinc-100" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <a
            href={`mailto:${socialLinks.email}`}
            className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-zinc-100 truncate block hover:underline"
          >
            {socialLinks.email}
          </a>
        </div>

        {/* GitHub Card */}
        <a
          href={socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card p-5 rounded-2xl space-y-3 block"
        >
          <span className="text-xs font-mono font-medium text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
            <Github className="w-3.5 h-3.5 text-slate-700 dark:text-zinc-300" /> GitHub
          </span>
          <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-zinc-100 block">
            github.com/Himarghya
          </span>
        </a>

        {/* LinkedIn Card */}
        <a
          href={socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card p-5 rounded-2xl space-y-3 block"
        >
          <span className="text-xs font-mono font-medium text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
            <Linkedin className="w-3.5 h-3.5 text-slate-700 dark:text-zinc-300" /> LinkedIn
          </span>
          <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-zinc-100 block">
            linkedin.com/in/himarghya
          </span>
        </a>
      </div>

      {/* Interactive Contact Form Container */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
        <div className="space-y-1 border-b border-slate-100 dark:border-zinc-800/80 pb-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-zinc-100">
            Send a direct message
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
            I usually respond within 24–48 hours.
          </p>
        </div>

        {status === 'success' ? (
          <div className="p-6 rounded-2xl bg-slate-100/90 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-slate-900 dark:bg-zinc-700 text-white dark:text-zinc-100 flex items-center justify-center mx-auto">
              <Check className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-zinc-100">Message sent successfully!</h3>
            <p className="text-xs text-slate-600 dark:text-zinc-400">
              Thanks for reaching out. I&apos;ll get back to your email as soon as possible.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-3 px-4 py-1.5 text-xs font-mono font-semibold rounded-lg bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-slate-800"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-semibold text-slate-700 dark:text-zinc-300">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-zinc-900/60 text-slate-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:border-slate-800 dark:focus:border-white/30 focus:ring-2 focus:ring-slate-900/5 shadow-2xs transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-semibold text-slate-700 dark:text-zinc-300">
                  Your Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. alex@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-zinc-900/60 text-slate-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:border-slate-800 dark:focus:border-white/30 focus:ring-2 focus:ring-slate-900/5 shadow-2xs transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold text-slate-700 dark:text-zinc-300">
                Message *
              </label>
              <textarea
                required
                rows={5}
                placeholder="What's on your mind?..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-zinc-900/60 text-slate-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:border-slate-800 dark:focus:border-white/30 focus:ring-2 focus:ring-slate-900/5 resize-none shadow-2xs transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 font-semibold text-xs sm:text-sm shadow-sm hover:shadow active:scale-[0.99] transition-all disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{status === 'submitting' ? 'Sending...' : 'Send Message'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
