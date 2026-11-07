import React from 'react';
import Navbar from './components/Navbar';
import { FlickeringGrid } from './components/magicui/flickering-grid';
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

export default function App() {
  return (
    <div className="min-h-screen bg-[#07090e] text-[#f8fafc] font-sans relative selection:bg-cyan-500/25 selection:text-cyan-200 overflow-x-hidden">
      {/* Magic UI Flickering Grid - Full Viewport Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <FlickeringGrid
          className="size-full"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.35}
          flickerChance={0.1}
        />
      </div>

      {/* Global Floating Navbar (Aligned to 85% width) */}
      <Navbar />

      {/* Open, Uncaged Content Layout - 90% of Screen Width */}
      <div className="w-[90%] mx-auto relative z-10">
        <main>
          <Hero />
          <About />
          <GitHubHeatmap />
          <LeetCodeSection />
          <Experience />
          <Skills />
          <Projects />
          <Certifications />
          <Contact />
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </div>
  );
}
