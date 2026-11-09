import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { portfolioData } from '../data/portfolioData';
import LaserButton from './LaserButton';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.06] pt-12 sm:pt-16 pb-8 sm:pb-12 overflow-hidden">
      <div className="container mx-auto px-2 sm:px-4 md:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-white/[0.06]">
          
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="text-xl font-bold tracking-tight text-white flex items-center justify-center md:justify-start">
              <span>{portfolioData.personal.name}</span>
            </div>
            <p className="text-xs font-mono text-cyan-400 mt-1 uppercase tracking-wide">
              {portfolioData.personal.title}
            </p>
            <p className="text-sm text-slate-400 mt-2 max-w-sm">
              Engineering scalable web applications, RAG pipelines, and high-performance digital architectures.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg bg-[#111622] border border-white/[0.08] hover:border-cyan-400 text-slate-300 hover:text-cyan-400 transition-colors"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg bg-[#111622] border border-white/[0.08] hover:border-cyan-400 text-slate-300 hover:text-cyan-400 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="p-2.5 rounded-lg bg-[#111622] border border-white/[0.08] hover:border-cyan-400 text-slate-300 hover:text-cyan-400 transition-colors"
              aria-label="Email Me"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Back to Top */}
          <div>
            <LaserButton
              onClick={scrollToTop}
              size="sm"
              variant="cyan"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to top</span>
            </LaserButton>
          </div>

        </div>

        {/* Lower Row */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            <span>Bhopal, MP, India</span>
          </div>

          <div className="text-center sm:text-right">
            © {new Date().getFullYear()} Daksh Lalwani.
          </div>
        </div>

      </div>
    </footer>
  );
}
