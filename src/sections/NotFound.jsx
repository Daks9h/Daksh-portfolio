import React from 'react';
import { Home, ArrowLeft, Terminal, Compass } from 'lucide-react';
import LaserButton from '../components/LaserButton';

export default function NotFound({ invalidTarget = '', onNavigate }) {
  const quickLinks = [
    { name: 'HOME', id: 'home' },
    { name: 'ABOUT', id: 'about' },
    { name: 'PROJECTS', id: 'projects' },
    { name: 'EXPERIENCE', id: 'experience' },
    { name: 'SKILLS', id: 'skills' },
    { name: 'CONTACT', id: 'contact' },
  ];

  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-12 sm:py-16 relative">
      {/* Precision Corner Accents Frame */}
      <div className="w-full max-w-2xl relative p-6 sm:p-10 md:p-12 bg-[#0d111a]/80 backdrop-blur-md border border-white/[0.08] shadow-2xl">
        
        {/* Subtle Tech Corner Ticks */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" aria-hidden="true" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400" aria-hidden="true" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400" aria-hidden="true" />

        {/* Status Telemetry Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 font-mono text-[11px] sm:text-xs tracking-wider uppercase mb-6">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>HTTP 404 // UNRESOLVED ENDPOINT</span>
        </div>

        {/* Large Architectural 404 Display */}
        <div className="select-none mb-2">
          <span 
            className="text-7xl sm:text-8xl md:text-9xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-600/40 inline-block drop-shadow-[0_0_24px_rgba(6,182,212,0.25)]"
          >
            404
          </span>
        </div>

        {/* Primary Heading */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          PAGE NOT FOUND
        </h1>

        {/* Crisp Non-Flooded Description */}
        <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto mt-3 leading-relaxed">
          The requested coordinate does not exist or has been relocated within this deployment.
        </p>

        {/* Diagnostic Query Card */}
        {invalidTarget && (
          <div className="mt-5 px-3.5 py-2 bg-[#111622] border border-white/[0.06] rounded inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs text-slate-300 max-w-full overflow-hidden">
            <span className="text-cyan-400 font-semibold shrink-0">TARGET:</span>
            <code className="text-slate-200 bg-black/40 px-2 py-0.5 rounded truncate">
              {invalidTarget}
            </code>
            <span className="text-amber-400 shrink-0">[FAILED]</span>
          </div>
        )}

        {/* Primary Call to Action */}
        <div className="mt-8 flex justify-center">
          <LaserButton
            onClick={() => onNavigate?.('home')}
            variant="cyan"
            size="lg"
          >
            <Home className="w-4 h-4 mr-2" />
            <span>RETURN TO HOME</span>
          </LaserButton>
        </div>

        {/* Quick Directory Jump Bar */}
        <div className="mt-8 pt-6 border-t border-white/[0.06]">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-3">
            Quick Navigation Index
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {quickLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate?.(item.id)}
                className="px-3 py-1.5 rounded bg-[#111622] hover:bg-cyan-950/40 border border-white/[0.06] hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 font-mono text-[11px] uppercase tracking-wider transition-colors"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

