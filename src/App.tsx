import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { Blog } from './pages/Blog';
import { BlogDetail } from './pages/BlogDetail';
import { Journey } from './pages/Journey';
import { Uses } from './pages/Uses';
import { Now } from './pages/Now';
import { Contact } from './pages/Contact';
import { Guestbook } from './pages/Guestbook';
import { NotFound } from './pages/NotFound';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <div className="relative min-h-screen flex flex-col bg-[#FAFAFA] dark:bg-[#09090B] text-[#111111] dark:text-[#F4F4F5] font-sans transition-colors duration-200 selection:bg-zinc-800 selection:text-white dark:selection:bg-zinc-200 dark:selection:text-zinc-900 overflow-x-hidden">
          {/* Subtle Ambient Monochrome Glass Depth Gradients (No green/blue lights) */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-zinc-200/40 dark:bg-zinc-800/15 rounded-full blur-3xl" />
            <div className="absolute top-[45%] -right-40 w-[600px] h-[500px] bg-zinc-200/30 dark:bg-zinc-800/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-[600px] h-[500px] bg-zinc-200/30 dark:bg-zinc-800/10 rounded-full blur-3xl" />
          </div>

          {/* Top Sticky Navbar */}
          <div className="relative z-40">
            <Navbar />
          </div>

          {/* Main Page Content Container */}
          <main className="relative z-10 flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/journey" element={<Journey />} />
              <Route path="/uses" element={<Uses />} />
              <Route path="/now" element={<Now />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/guestbook" element={<Guestbook />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Bottom Minimal Footer */}
          <div className="relative z-10">
            <Footer />
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;