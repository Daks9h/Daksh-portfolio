import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PageTransition from './components/PageTransition';
import CyberBackground from './components/CyberBackground';
import Hero from './sections/Hero';
import About from './sections/About';
import GitHubHeatmap from './sections/GitHubHeatmap';
import LeetCodeSection from './sections/LeetCodeSection';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Certifications from './sections/Certifications';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import NeuralInference from './components/NeuralInference';
import ScrollDownIndicator from './components/ScrollDownIndicator';

const VALID_PAGES = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];

const getPageFromHash = () => {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash.replace('#', '').toLowerCase();
  return VALID_PAGES.includes(hash) ? hash : 'home';
};

export default function App() {
  const [activePage, setActivePage] = useState(getPageFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      const page = getPageFromHash();
      setActivePage((prev) => (prev === page ? prev : page));
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page) => {
    if (VALID_PAGES.includes(page)) {
      if (window.location.hash !== `#${page}`) {
        window.location.hash = page;
      }
      setActivePage(page);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'about':
        return (
          <div className="space-y-10">
            <About />
            <GitHubHeatmap />
            <LeetCodeSection />
            <Certifications />
          </div>
        );
      case 'experience':
        return <Experience onNavigate={handleNavigate} />;
      case 'skills':
        return <Skills />;
      case 'projects':
        return <Projects />;
      case 'contact':
        return <Contact />;
      case 'home':
      default:
        return (
          <div className="flex flex-col">
            <Hero onNavigate={handleNavigate} />
            <div className="w-full pt-16 sm:pt-20 pb-20 border-t border-white/[0.06] mt-8 sm:mt-12">
              <div className="mb-5 flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-wider uppercase mb-1">
                  <span>INTERACTIVE ML CONSOLE</span>
                </div>
                <h2 className="section-title">
                  LIVE DIGIT CLASSIFIER
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
                  Draw any single digit (0–9) on the pad below. Processed in real time via client-side WebAssembly with zero network latency.
                </p>
              </div>
              <NeuralInference />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-[#f8fafc] font-sans relative selection:bg-cyan-500/25 selection:text-cyan-200 overflow-x-hidden">
      {/* Ambient Aurora & Shifting Matrix Tech Grid Background */}
      <CyberBackground />

      {/* Global SVG ColorMatrix Filter for Laser Glow Border Beams */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }} aria-hidden="true">
        <filter width="3000%" x="-1000%" height="3000%" y="-1000%" id="unopaq">
          <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 3 0" />
        </filter>
      </svg>

      {/* Global Floating Navbar */}
      <Navbar activePage={activePage} onNavigate={handleNavigate} />

      {/* Centered Glowing Scroll Down Arrow Indicator (appears on any page with scrollable content) */}
      <ScrollDownIndicator activePage={activePage} />

      {/* Open, Uncaged Content Layout - Responsive 94% on mobile up to 90% on desktop */}
      <div className="w-[94%] sm:w-[92%] lg:w-[90%] mx-auto relative z-10 flex flex-col min-h-screen">
        <main className="flex-1 pt-20 sm:pt-28 lg:pt-32">
          <PageTransition pageKey={activePage}>
            {renderActivePage()}
          </PageTransition>
        </main>

        {/* Dynamic Bottom Footer - Terminates each page cleanly */}
        <Footer />
      </div>
    </div>
  );
}
