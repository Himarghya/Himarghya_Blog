import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Sun, Moon, Github, Menu, X, FileText } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { profile } from '../../data/profile';
import { socialLinks } from '../../data/social';
import { SearchModal } from '../ui/SearchModal';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { resolvedTheme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Writing', path: '/blog' },
    { name: 'Journey', path: '/journey' },
    { name: 'Now', path: '/now' },
    { name: 'Uses', path: '/uses' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'backdrop-blur-xl bg-white/80 dark:bg-[#09090B]/75 border-b border-slate-200/90 dark:border-white/10 shadow-xs'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo / Brand */}
          <Link
            to="/"
            className="group flex items-center gap-2.5 text-slate-900 dark:text-zinc-100 font-semibold tracking-tight transition-transform hover:opacity-90"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-mono text-sm font-bold shadow-sm transition-transform group-hover:scale-105">
              {profile.initials}
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-zinc-100">
                {profile.name}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Capsule Navbar) */}
          <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full backdrop-blur-xl bg-white/90 dark:bg-zinc-900/60 border border-slate-200/90 dark:border-white/10 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_16px_rgba(0,0,0,0.03)]">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-1 text-xs rounded-full transition-all ${
                    active
                      ? 'text-white dark:text-zinc-900 font-semibold bg-slate-900 dark:bg-zinc-100 shadow-xs'
                      : 'text-slate-600 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-zinc-100 hover:bg-slate-100/70 dark:hover:bg-zinc-800/40'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons: Search, Theme, GitHub, Resume */}
          <div className="flex items-center gap-2">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-600 dark:text-zinc-400 backdrop-blur-xl bg-white/90 dark:bg-zinc-900/60 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-xl border border-slate-200/90 dark:border-white/10 transition-colors shadow-2xs font-medium"
            >
              <Search className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-slate-100 dark:bg-zinc-800 rounded border border-slate-200 dark:border-zinc-700 text-slate-500 dark:text-zinc-400">
                ⌘K
              </kbd>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 backdrop-blur-xl bg-white/90 dark:bg-zinc-900/60 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-xl border border-slate-200/90 dark:border-white/10 transition-colors shadow-2xs"
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="w-4 h-4 text-zinc-300" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* GitHub Link */}
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 backdrop-blur-xl bg-white/90 dark:bg-zinc-900/60 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-xl border border-slate-200/90 dark:border-white/10 transition-colors shadow-2xs"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* Resume Button */}
            <a
              href={socialLinks.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 dark:text-zinc-200 hover:text-slate-950 dark:hover:text-white backdrop-blur-xl bg-white/90 dark:bg-zinc-900/60 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-xl border border-slate-200/90 dark:border-white/10 transition-colors shadow-2xs"
            >
              <FileText className="w-3.5 h-3.5 text-slate-700 dark:text-zinc-300" />
              <span>Resume</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open menu"
              className="p-2 md:hidden text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-2xs"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-2 pb-6 backdrop-blur-2xl bg-white/95 dark:bg-[#09090B]/95 border-b border-slate-200/90 dark:border-white/10 animate-in slide-in-from-top duration-200 shadow-lg">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3.5 py-2.5 text-sm rounded-xl transition-colors ${
                      active
                        ? 'text-white dark:text-zinc-900 font-semibold bg-slate-900 dark:bg-zinc-100'
                        : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 hover:bg-slate-100/70 dark:hover:bg-zinc-800/40'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-3 mt-2 border-t border-slate-200/80 dark:border-zinc-800 flex items-center justify-between">
                <a
                  href={socialLinks.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-slate-800 dark:text-zinc-200 font-semibold px-3.5 py-2 bg-slate-100 dark:bg-zinc-800 rounded-xl border border-slate-200 dark:border-zinc-700"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Resume</span>
                </a>
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-zinc-400 px-3 py-2 hover:text-slate-900 dark:hover:text-white font-medium"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal Component */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
