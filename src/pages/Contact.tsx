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
    // Simulate instantaneous delivery
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    }, 600);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10 pb-16 pt-6">
      {/* Header */}
      <div className="space-y-3 border-b border-zinc-200/60 dark:border-zinc-800/60 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
          <MessageSquare className="w-4 h-4" />
          <span>DIRECT COMMUNICATION</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          Let&apos;s talk.
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Have a project idea, found something interesting in one of my articles, or just want to chat about backend systems and C++? I&apos;d be happy to hear from you.
        </p>
      </div>

      {/* Direct Contact Methods */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Email */}
        <div className="p-4 rounded-2xl backdrop-blur-md bg-white/60 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-white/10 space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-500 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-zinc-400" /> Email
            </span>
            <button
              onClick={copyEmail}
              title="Copy Email"
              className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded transition-colors"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <a
            href={`mailto:${socialLinks.email}`}
            className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate block hover:underline"
          >
            {socialLinks.email}
          </a>
        </div>

        {/* GitHub */}
        <a
          href={socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-2xl backdrop-blur-md bg-white/60 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-white/10 space-y-2 shadow-sm hover:border-zinc-300 dark:hover:border-white/20 transition-all block"
        >
          <span className="text-xs font-mono text-zinc-500 flex items-center gap-1.5">
            <Github className="w-3.5 h-3.5 text-zinc-500" /> GitHub
          </span>
          <span className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 block">
            github.com/Himarghya
          </span>
        </a>

        {/* LinkedIn */}
        <a
          href={socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-2xl backdrop-blur-md bg-white/60 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-white/10 space-y-2 shadow-sm hover:border-zinc-300 dark:hover:border-white/20 transition-all block"
        >
          <span className="text-xs font-mono text-zinc-500 flex items-center gap-1.5">
            <Linkedin className="w-3.5 h-3.5 text-zinc-500" /> LinkedIn
          </span>
          <span className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 block">
            linkedin.com/in/himarghya
          </span>
        </a>
      </div>

      {/* Interactive Contact Form */}
      <div className="p-6 sm:p-8 rounded-2xl backdrop-blur-md bg-white/60 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-white/10 space-y-6 shadow-sm">
        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Send a direct message
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            I usually respond within 24–48 hours.
          </p>
        </div>

        {status === 'success' ? (
          <div className="p-6 rounded-xl backdrop-blur-sm bg-zinc-100/80 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 flex items-center justify-center mx-auto">
              <Check className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100">Message sent successfully!</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Thanks for reaching out. I&apos;ll get back to your email as soon as possible.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-3 px-3 py-1 text-xs font-mono rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-zinc-200/80 dark:border-white/10 backdrop-blur-md bg-white/50 dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-zinc-400 dark:focus:border-white/20 shadow-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300">
                  Your Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. alex@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-zinc-200/80 dark:border-white/10 backdrop-blur-md bg-white/50 dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-zinc-400 dark:focus:border-white/20 shadow-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300">
                Message *
              </label>
              <textarea
                required
                rows={5}
                placeholder="What's on your mind?..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-zinc-200/80 dark:border-white/10 backdrop-blur-md bg-white/50 dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-zinc-400 dark:focus:border-white/20 resize-none shadow-xs"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl backdrop-blur-md bg-zinc-900/90 dark:bg-zinc-100/90 text-white dark:text-zinc-900 font-semibold text-xs sm:text-sm hover:bg-zinc-800 dark:hover:bg-white transition-all shadow-sm disabled:opacity-50"
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
