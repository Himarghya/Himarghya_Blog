import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { profile } from '../../data/profile';
import { socialLinks } from '../../data/social';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-black/40 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand & Personal Signature */}
          <div className="space-y-2 max-w-sm">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                {profile.name}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 status-beacon" />
                {profile.status}
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Building things. Learning constantly. Notes from building software and understanding systems.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-zinc-600 dark:text-zinc-400">
            <Link to="/about" className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
              About
            </Link>
            <Link to="/projects" className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
              Projects
            </Link>
            <Link to="/blog" className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
              Writing
            </Link>
            <Link to="/journey" className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
              Journey
            </Link>
            <Link to="/now" className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
              Now
            </Link>
            <Link to="/uses" className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
              Uses
            </Link>
            <Link to="/guestbook" className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
              Guestbook
            </Link>
            <Link to="/contact" className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
              Contact
            </Link>
          </div>

          {/* Social Profiles */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>

            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>

            <a
              href={`mailto:${socialLinks.email}`}
              className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-400 dark:text-zinc-500">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p className="font-mono">
            Crafted with React & TypeScript • Focused on craft & curiosity
          </p>
        </div>
      </div>
    </footer>
  );
};
