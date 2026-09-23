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
        <div className="min-h-screen flex flex-col bg-[#FAFAFA] dark:bg-[#0A0A0A] text-[#111111] dark:text-[#F5F5F5] font-sans transition-colors duration-200 selection:bg-emerald-500/20 selection:text-emerald-500">
          {/* Top Sticky Navbar */}
          <Navbar />

          {/* Main Page Content Container */}
          <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-6">
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
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;