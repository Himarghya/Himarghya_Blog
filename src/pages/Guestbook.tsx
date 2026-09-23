import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, User, Sparkles, Heart } from 'lucide-react';
import { profile } from '../data/profile';

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
      <div className="space-y-3 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400">
          <MessageSquare className="w-4 h-4" />
          <span>COMMUNITY & GUESTBOOK</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          Guestbook
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Sign the guestbook, leave a message, or say hi! Your notes are stored and displayed here.
        </p>
      </div>

      {/* Sign Form */}
      <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111111] space-y-4 shadow-sm">
        <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          <span>Sign the Guestbook</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            required
            placeholder="Your Name (e.g. Alex)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />

          <textarea
            required
            rows={3}
            placeholder="Leave a friendly message, thought, or greeting..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
          />

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-xs sm:text-sm hover:opacity-90 transition-opacity"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Sign Guestbook</span>
          </button>
        </form>
      </div>

      {/* Entries List */}
      <div className="space-y-3">
        <h2 className="text-sm font-mono font-semibold uppercase tracking-wider text-zinc-500">
          Messages ({entries.length})
        </h2>

        <div className="space-y-3">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111111] space-y-1.5 shadow-sm"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100">
                  <User className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{entry.name}</span>
                  {entry.badge && (
                    <span className="px-1.5 py-0.2 text-[10px] font-mono rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                      {entry.badge}
                    </span>
                  )}
                </div>
                <span className="font-mono text-zinc-400 text-[11px]">{entry.date}</span>
              </div>

              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {entry.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
