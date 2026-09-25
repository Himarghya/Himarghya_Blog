import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Copy, Check, CornerDownLeft } from 'lucide-react';
import { profile } from '../../data/profile';
import { socialLinks } from '../../data/social';

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

export const TerminalSignature: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'whoami',
      output: (
        <div className="text-zinc-300 dark:text-zinc-200">
          <span className="font-semibold text-zinc-100">{profile.name}</span> — {profile.role}
        </div>
      ),
    },
    {
      command: 'currently',
      output: (
        <div className="space-y-1 text-zinc-300 dark:text-zinc-300">
          <p className="text-zinc-400">→ Building: <span className="text-zinc-200">Full-stack web applications & worker queues</span></p>
          <p className="text-zinc-400">→ Learning: <span className="text-zinc-200">System design, C++ memory models, and distributed state</span></p>
          <p className="text-zinc-400">→ Exploring: <span className="text-zinc-200">Database internals & query execution planners</span></p>
        </div>
      ),
    },
    {
      command: 'interests',
      output: (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 text-zinc-300 dark:text-zinc-300 text-xs">
          {profile.interests.map((interest) => (
            <span key={interest} className="text-zinc-300">
              • {interest}
            </span>
          ))}
        </div>
      ),
    },
    {
      command: 'status',
      output: <span className="text-zinc-300 font-mono">learning & building... (continuous)</span>,
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const availableCommands = ['whoami', 'currently', 'interests', 'projects', 'skills', 'contact', 'clear'];

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    let output: React.ReactNode = null;

    switch (trimmed) {
      case 'whoami':
        output = (
          <div className="text-zinc-300 dark:text-zinc-200">
            <span className="font-semibold text-zinc-100">{profile.name}</span> — {profile.role}
          </div>
        );
        break;
      case 'currently':
        output = (
          <div className="space-y-1 text-zinc-300">
            {profile.currently.building.map((item) => (
              <p key={item} className="text-zinc-400">→ Building: <span className="text-zinc-200">{item}</span></p>
            ))}
            {profile.currently.learning.map((item) => (
              <p key={item} className="text-zinc-400">→ Learning: <span className="text-zinc-200">{item}</span></p>
            ))}
          </div>
        );
        break;
      case 'interests':
        output = (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 text-zinc-300 text-xs">
            {profile.interests.map((interest) => (
              <span key={interest} className="text-zinc-300">• {interest}</span>
            ))}
          </div>
        );
        break;
      case 'projects':
        output = (
          <div className="space-y-1 text-xs text-zinc-300">
            <p className="text-zinc-200 font-semibold">• PulseMesh: Distributed worker orchestrator</p>
            <p className="text-zinc-200 font-semibold">• VARSHANET: High-precision meteorological analytics</p>
            <p className="text-zinc-200 font-semibold">• POLARIS: Offline-first polar expedition logistics</p>
            <p className="text-zinc-200 font-semibold">• Ocean Intelligence: Marine anomaly monitor</p>
          </div>
        );
        break;
      case 'skills':
        output = (
          <p className="text-xs text-zinc-300">
            TypeScript, C++, React, Node.js, PostgreSQL, Redis, Docker, Git, Linux
          </p>
        );
        break;
      case 'contact':
        output = (
          <div className="text-xs space-y-0.5 text-zinc-300">
            <p>Email: <a href={`mailto:${socialLinks.email}`} className="text-zinc-100 underline">{socialLinks.email}</a></p>
            <p>GitHub: <a href={socialLinks.github} target="_blank" rel="noreferrer" className="text-zinc-100 underline">{socialLinks.github}</a></p>
          </div>
        );
        break;
      case 'help':
        output = (
          <div className="text-xs text-zinc-400">
            Available commands: <span className="text-zinc-200 font-mono">{availableCommands.join(', ')}</span>
          </div>
        );
        break;
      default:
        output = (
          <div className="text-xs text-zinc-400">
            command not found: {trimmed}. Type <span className="text-zinc-200 underline cursor-pointer" onClick={() => executeCommand('help')}>help</span> for available commands.
          </div>
        );
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    }
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const copySession = () => {
    const rawText = history
      .map((h) => `$ ${h.command}`)
      .join('\n');
    navigator.clipboard.writeText(rawText || '$ whoami\nHimarghya Das');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-xl border border-zinc-200/80 dark:border-white/10 backdrop-blur-xl bg-zinc-950/80 text-zinc-100 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/60 border-b border-zinc-800/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-600/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-600/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-600/80" />
          </div>
          <span className="text-xs text-zinc-400 ml-2 font-mono flex items-center gap-1">
            <Terminal className="w-3 h-3 text-zinc-500" /> himarghya@dev:~
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copySession}
            title="Copy terminal session"
            className="p-1 text-zinc-400 hover:text-zinc-200 rounded transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-zinc-200" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div
        className="p-4 sm:p-5 space-y-4 max-h-[380px] overflow-y-auto"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1.5 animate-in fade-in duration-100">
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="text-zinc-200 font-bold">$</span>
              <span className="text-zinc-100 font-semibold">{item.command}</span>
            </div>
            <div className="pl-4 text-zinc-300 leading-relaxed">{item.output}</div>
          </div>
        ))}

        {/* Interactive Prompt Input */}
        <div className="flex items-center gap-2 text-zinc-400 pt-1">
          <span className="text-zinc-200 font-bold">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type a command (try 'projects' or 'skills')..."
            className="flex-1 bg-transparent text-zinc-100 placeholder-zinc-600 focus:outline-none text-xs sm:text-sm font-mono caret-zinc-200"
          />
          <CornerDownLeft className="w-3 h-3 text-zinc-600" />
        </div>
        <div ref={terminalEndRef} />
      </div>

      {/* Quick command buttons toolbar */}
      <div className="px-4 py-2 bg-zinc-900/40 border-t border-zinc-800/60 backdrop-blur-md flex flex-wrap items-center gap-1.5 text-[11px] text-zinc-400">
        <span className="text-zinc-500 mr-1">Quick Run:</span>
        {availableCommands.map((cmd) => (
          <button
            key={cmd}
            onClick={() => executeCommand(cmd)}
            className="px-2 py-0.5 bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-300 hover:text-zinc-100 rounded text-[11px] transition-colors border border-zinc-700/50"
          >
            ${cmd}
          </button>
        ))}
      </div>
    </div>
  );
};
