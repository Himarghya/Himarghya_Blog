import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, Sparkles } from 'lucide-react';

interface GuestEntry {
  id: string;
  name: string;
  message: string;
  date: string;
  badge?: string;
}

export const Guestbook: React.FC = () => {
  const initialEntries: GuestEntry[] = [
    {
      id: '1',
      name: 'Himarghya Das',
      message: 'Welcome to my corner of the web! Feel free to leave a note, introduce yourself, or share feedback on my projects and writing.',
      date: '2026-09-21',
      badge: 'Author'
    },
    {
      id: '2',
      name: 'Vikram S.',
      message: 'Loved the PulseMesh article on Redis leases and Lua scripts. Really clear explanation of the fencing token problem!',
      date: '2026-09-22'
    }
  ];

  const [entries, setEntries] = useState<GuestEntry[]>(() => {
    const saved = localStorage.getItem('himarghya_guestbook');
    return saved ? JSON.parse(saved) : initialEntries;
  });

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('himarghya_guestbook', JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newEntry: GuestEntry = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      date: new Date().toISOString().split('T')[0]
    };

    setEntries([newEntry, ...entries]);
    setName('');
    setMessage('');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10 pb-16 pt-6">
      {/* Header */}
      <div className="space-y-3 border-b border-slate-200/80 dark:border-zinc-800/80 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
          <MessageSquare className="w-4 h-4" />
          <span>COMMUNITY & GUESTBOOK</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50">
          Guestbook
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
          Sign the guestbook, leave a message, or say hi! Your notes are stored and displayed here.
        </p>
      </div>

      {/* Sign Form */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-5">
        <h2 className="text-base font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-slate-400 dark:text-zinc-400" />
          <span>Sign the Guestbook</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            required
            placeholder="Your Name (e.g. Alex)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-zinc-900/60 text-slate-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:border-slate-800 dark:focus:border-white/30 focus:ring-2 focus:ring-slate-900/5 shadow-2xs transition-all"
          />

          <textarea
            required
            rows={3}
            placeholder="Leave a friendly message, thought, or greeting..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-zinc-900/60 text-slate-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:border-slate-800 dark:focus:border-white/30 focus:ring-2 focus:ring-slate-900/5 resize-none shadow-2xs transition-all"
          />

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 font-semibold text-xs sm:text-sm shadow-sm hover:shadow active:scale-[0.99] transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Post Entry</span>
          </button>
        </form>
      </div>

      {/* Guest Entries List */}
      <div className="space-y-4">
        <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
          Messages ({entries.length})
        </h2>

        <div className="space-y-3">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="glass-card p-6 rounded-2xl space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-zinc-100">
                    {entry.name}
                  </span>
                  {entry.badge && (
                    <span className="px-2.5 py-0.5 text-[10px] font-mono rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 font-semibold border border-slate-200 dark:border-zinc-700">
                      {entry.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs font-mono text-slate-400">{entry.date}</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                {entry.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
