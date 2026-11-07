import React from 'react';
import { portfolioData } from '../data/portfolioData';

export default function Hero() {
  return (
    <section
      id="home"
      aria-label="Personal Introduction and Architecture Console"
      className="relative min-h-screen lg:h-screen lg:max-h-screen flex items-center justify-center pt-24 pb-8 sm:pt-28 sm:pb-10 lg:pt-24 lg:pb-8 overflow-hidden"
    >
      <div className="w-full max-w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          
          {/* ======================================================== */}
          {/* LEFT COLUMN: Personal Introduction & Verified Metrics */}
          {/* ======================================================== */}
          <div className="lg:col-span-7 xl:col-span-8 w-full min-w-0 flex flex-col items-start space-y-6 sm:space-y-7">
            
            {/* Display Headline & Subtitle Group */}
            <div className="space-y-3 sm:space-y-4 max-w-full overflow-hidden">
              <h1 
                className="text-3xl sm:text-5xl md:text-6xl lg:text-[3.25rem] xl:text-[3.9rem] font-bold tracking-tight text-white leading-tight whitespace-nowrap drop-shadow-sm"
                style={{ fontFamily: "'Michroma', sans-serif" }}
              >
                <span className="[-webkit-text-stroke:0.5px_rgba(255,255,255,0.85)]">
                  DAKSH
                </span>{' '}
                <span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 [-webkit-text-stroke:0.6px_rgba(34,211,238,0.8)] drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]"
                  style={{ fontFamily: "'Michroma', sans-serif" }}
                >
                  LALWANI
                </span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg font-mono font-bold text-cyan-400 tracking-wider uppercase">
                {portfolioData.personal.specialization}
              </p>
            </div>

            {/* Concise Rephrased Narrative with Zoomed Typography */}
            <p className="text-slate-300/90 text-sm sm:text-base lg:text-[1.05rem] leading-relaxed max-w-2xl font-normal">
              Building high-performance digital systems with refined, intuitive interfaces.
              <br className="hidden sm:inline" />
              Transforming complex technologies into seamless, elegant digital experiences.
            </p>

            {/* System Metrics Matching Reference Aesthetic - Clean 3 Columns */}
            <div className="flex items-start gap-8 sm:gap-14 pt-1">
              <div className="flex flex-col space-y-1">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-mono leading-none">
                  50+
                </div>
                <div className="text-xs sm:text-[13px] font-mono tracking-widest text-slate-300 font-bold uppercase pt-1">
                  PROJECTS
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-cyan-400 tracking-tight font-mono leading-none">
                  2+
                </div>
                <div className="text-xs sm:text-[13px] font-mono tracking-widest text-slate-300 font-bold uppercase pt-1">
                  EXP_YEARS
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-mono leading-none">
                  2026
                </div>
                <div className="text-xs sm:text-[13px] font-mono tracking-widest text-slate-300 font-bold uppercase pt-1">
                  STATUS: ACTIVE
                </div>
              </div>
            </div>

            {/* Primary & Secondary Call to Actions - Cyberpunk Chamfered Buttons */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-7 pt-3 w-full sm:w-auto">
              {/* Primary Solid Cyan Button */}
              <a
                href="#contact"
                className="relative group inline-flex items-center justify-center font-mono font-black tracking-widest text-xs sm:text-sm uppercase text-black bg-cyan-400 hover:bg-cyan-300 px-6 sm:px-8 py-3.5 transition-all duration-200 shadow-[0_0_25px_rgba(6,182,212,0.55)] hover:shadow-[0_0_35px_rgba(34,211,238,0.85)] active:scale-[0.98]"
                style={{
                  clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)'
                }}
              >
                INITIATE_CONTACT
              </a>

              {/* Secondary Dark Chamfered Button with Cyan Border */}
              <a
                href="#projects"
                className="relative group inline-flex items-center justify-center font-mono font-bold tracking-widest text-xs sm:text-sm uppercase text-white hover:text-cyan-300 p-[1.5px] transition-all duration-200 shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] active:scale-[0.98]"
                style={{
                  clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)',
                  background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.9), rgba(56, 189, 248, 0.4))'
                }}
              >
                <span
                  className="w-full h-full bg-[#07090e] group-hover:bg-[#0c1424] px-6 sm:px-8 py-[13px] flex items-center justify-center transition-colors"
                  style={{
                    clipPath: 'polygon(11px 0, 100% 0, 100% calc(100% - 11px), calc(100% - 11px) 100%, 0 100%, 0 11px)'
                  }}
                >
                  PULL_RESUME.pdf
                </span>
              </a>
            </div>

          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: Static Architecture Code Window             */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 xl:col-span-4 w-full min-w-0 flex flex-col items-end">
            <div className="w-full max-w-md rounded-2xl border border-white/[0.08] shadow-[0_25px_60px_rgba(0,0,0,0.85)] bg-[#0b0f19]/90 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-cyan-500/30">
              
              {/* Window Title Bar */}
              <div className="bg-[#101522]/80 px-4 py-3 border-b border-white/[0.06] flex items-center gap-2.5">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/80 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]/80 inline-block"></span>
                </div>
                <span className="text-xs font-mono text-slate-400 tracking-wider">
                  CORE_MODULE.js
                </span>
              </div>

              {/* Syntax-Highlighted Real Architectural Code View (Matching Reference Image) */}
              <div className="p-5 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed text-slate-200">
                <div>
                  <span className="text-rose-400">import</span>{' '}
                  <span className="text-white">&#123; Intel, Creativity &#125;</span>{' '}
                  <span className="text-rose-400">from</span>{' '}
                  <span className="text-amber-300">'daksh'</span>;
                </div>
                <div className="mt-1">
                  <span className="text-rose-400">const</span>{' '}
                  <span className="text-white">stack</span> = [
                  <span className="text-amber-300">'React'</span>,{' '}
                  <span className="text-amber-300">'FastAPI'</span>,
                </div>
                <div className="pl-4">
                  <span className="text-amber-300">'Node'</span>,{' '}
                  <span className="text-amber-300">'pgvector'</span>];
                </div>
                <div className="mt-1">
                  <span className="text-white">daksh</span>.
                  <span className="text-cyan-400 font-semibold">build</span>(
                  <span className="text-white">stack</span>);
                </div>
              </div>

            </div>

            {/* Floating Bottom-Right Cyber Action Widget */}
            <div className="mt-8 hidden lg:flex justify-end w-full">
              <a
                href="#contact"
                className="group inline-flex items-center font-mono font-bold tracking-widest text-xs uppercase text-cyan-300 p-[1.5px] transition-all duration-200 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.65)] hover:text-black active:scale-[0.98]"
                style={{
                  clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
                  background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.9), rgba(56, 189, 248, 0.4))'
                }}
              >
                <span
                  className="w-full h-full bg-[#07090e] group-hover:bg-cyan-400 px-5 py-2.5 flex items-center justify-center transition-all"
                  style={{
                    clipPath: 'polygon(9px 0, 100% 0, 100% calc(100% - 9px), calc(100% - 9px) 100%, 0 100%, 0 9px)'
                  }}
                >
                  [INIT_CHAT_PROJECT]
                </span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
