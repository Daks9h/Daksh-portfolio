import React from 'react';
import { portfolioData } from '../data/portfolioData';
import LaserButton from '../components/LaserButton';

export default function Hero() {
  return (
    <section
      id="home"
      aria-label="Personal Introduction and Architecture Console"
      className="relative min-h-screen lg:h-screen lg:max-h-screen flex items-center justify-start pt-24 pb-8 sm:pt-28 sm:pb-10 lg:pt-24 lg:pb-8 overflow-hidden"
    >
      <div className="w-full max-w-5xl">
        <div className="w-full min-w-0 flex flex-col items-start space-y-6 sm:space-y-7">
          
          {/* Display Headline & Subtitle Group */}
          <div className="space-y-4 sm:space-y-5 max-w-full overflow-hidden">
            <h1 
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.25rem] xl:text-[5.2rem] font-bold tracking-tight text-white leading-tight whitespace-nowrap drop-shadow-sm flex items-center"
              style={{ fontFamily: "'Michroma', sans-serif" }}
            >
              <span className="[-webkit-text-stroke:0.5px_rgba(255,255,255,0.85)] inline-block">
                DAKSH
              </span>
              <span className="inline-block w-3.5 sm:w-5" aria-hidden="true" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 [-webkit-text-stroke:0.6px_rgba(34,211,238,0.8)] drop-shadow-[0_0_8px_rgba(6,182,212,0.4)] inline-block">
                LALWANI
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl font-mono font-bold text-cyan-400 tracking-widest uppercase">
              {portfolioData.personal.specialization}
            </p>
          </div>

          {/* Concise Rephrased Narrative - One Line Each */}
          <div className="text-slate-300/90 text-sm sm:text-base lg:text-[1.125rem] xl:text-[1.25rem] leading-relaxed font-normal space-y-1.5">
            <p className="lg:whitespace-nowrap">
              Building high-performance digital systems with refined, intuitive interfaces.
            </p>
            <p className="lg:whitespace-nowrap">
              Transforming complex technologies into seamless, elegant digital experiences.
            </p>
          </div>

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

          {/* Primary & Secondary Call to Actions - UI Verse Laser Glow Border Beam Buttons */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-4 pl-3 sm:pl-4 w-full sm:w-auto">
            <LaserButton
              href="#contact"
              size="lg"
              variant="cyan"
              className="ml-2 sm:ml-3"
            >
              GET IN TOUCH
            </LaserButton>

            <LaserButton
              href={portfolioData.personal.resume || "/Daksh_Lalwani_Resume.pdf"}
              download="Career_Summary.pdf"
              size="lg"
              variant="white"
            >
              Career Summary.pdf
            </LaserButton>
          </div>

        </div>
      </div>
    </section>
  );
}
