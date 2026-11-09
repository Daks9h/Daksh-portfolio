import React from 'react';
import { User, BookOpen, Compass, CheckCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function About() {
  return (
    <section id="about" className="pt-4 pb-16 relative w-full">
      <div className="w-full">
        
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="section-title">
            ABOUT & TECHNICAL BACKGROUND
          </h2>
        </div>

        {/* Cards Layout */}
        <div className="flex flex-col gap-6 lg:gap-8 w-full">
          
          {/* Row 1: First two cards side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
            
            {/* Card 1: Core Specifications */}
            <div className="cyber-card p-6 sm:p-7 rounded-sm border border-white/[0.08] flex flex-col justify-between relative group">
              {/* Techno Corners */}
              <span className="techno-corner-tl" aria-hidden="true" />
              <span className="techno-corner-tr" aria-hidden="true" />
              <span className="techno-corner-bl" aria-hidden="true" />
              <span className="techno-corner-br" aria-hidden="true" />

              {/* Header */}
              <div className="flex items-center gap-2 mb-4 text-cyan-400 font-mono text-xs font-semibold tracking-wide">
                <User className="w-4 h-4" />
                <span>PROFILE_OVERVIEW</span>
              </div>

              {/* Structured Specifications Grid */}
              <div className="flex flex-col gap-y-3.5">
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 pb-3 border-b border-white/[0.06] text-xs sm:text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Role</span>
                    <span className="text-white font-medium text-right">FULL-STACK DEVELOPER</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Location</span>
                    <span className="text-cyan-300 font-medium text-right">{portfolioData.personal.location}</span>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 pb-3 border-b border-white/[0.06] text-xs sm:text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Status</span>
                    <span className="text-emerald-400 font-medium text-right flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Available for Hire
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Languages</span>
                    <span className="text-slate-200 text-right">{portfolioData.personal.languages}</span>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 pb-3 border-b border-white/[0.06] text-xs sm:text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Core Focus</span>
                    <span className="text-cyan-400 font-medium text-right">Full-Stack & Applied AI</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Availability</span>
                    <span className="text-slate-200 text-right">{portfolioData.personal.availability}</span>
                  </div>
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 pt-0.5 text-xs sm:text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Primary Stack</span>
                    <span className="text-slate-200 text-right">React, Node, FastAPI</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Experience</span>
                    <span className="text-cyan-300 font-medium text-right">Early Career</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Academic Record */}
            <div className="cyber-card p-6 sm:p-7 rounded-sm border border-white/[0.08] flex flex-col justify-between relative group">
              {/* Techno Corners */}
              <span className="techno-corner-tl" aria-hidden="true" />
              <span className="techno-corner-tr" aria-hidden="true" />
              <span className="techno-corner-bl" aria-hidden="true" />
              <span className="techno-corner-br" aria-hidden="true" />

              {/* Header */}
              <div className="flex items-center gap-2 mb-4 text-cyan-400 font-mono text-xs font-semibold tracking-wide">
                <BookOpen className="w-4 h-4" />
                <span>ACADEMIC_EXCELLENCE</span>
              </div>

              {/* Structured Academic Grid */}
              <div className="flex flex-col gap-y-3.5">
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 pb-3 border-b border-white/[0.06] text-xs sm:text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Degree</span>
                    <span className="text-white font-medium text-right">B.Tech CSE (AIML)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">College</span>
                    <span className="text-cyan-300 font-medium text-right">LNCT Bhopal</span>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 pb-3 border-b border-white/[0.06] text-xs sm:text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Cumulative CGPA</span>
                    <span className="text-emerald-400 font-bold text-sm text-right">8.31 / 10.0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Affiliation</span>
                    <span className="text-slate-200 text-right">RGPV University</span>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 pb-3 border-b border-white/[0.06] text-xs sm:text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Tenure</span>
                    <span className="text-slate-200 text-right">Sep 2024 – 2028</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Graduation</span>
                    <span className="text-slate-200 text-right">Class of 2028</span>
                  </div>
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 pt-0.5 text-xs sm:text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Clubs</span>
                    <span className="text-slate-200 text-right">E-Cell & Ensemble</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Semester</span>
                    <span className="text-slate-200 text-right">Active (Sem V)</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Row 2: The third card below them in center */}
          <div className="w-full max-w-4xl mx-auto">
            {/* Card 3: Engineering Approach */}
            <div className="cyber-card p-6 sm:p-7 rounded-sm border border-white/[0.08] relative group">
              {/* Techno Corners */}
              <span className="techno-corner-tl" aria-hidden="true" />
              <span className="techno-corner-tr" aria-hidden="true" />
              <span className="techno-corner-bl" aria-hidden="true" />
              <span className="techno-corner-br" aria-hidden="true" />

              <div>
                <div className="flex items-center gap-2 mb-3 text-cyan-400 font-mono text-xs font-semibold tracking-wide">
                  <Compass className="w-4 h-4" />
                  <span>ENGINEERING_APPROACH</span>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                  {portfolioData.personal.mission}
                </p>
              </div>

              <div className="flex flex-col gap-y-2.5">
                <div className="p-3 rounded-sm bg-white/[0.02] border border-white/[0.06] flex items-center gap-2.5 hover:border-cyan-500/30 transition-colors">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div className="truncate">
                    <span className="text-white font-medium text-xs sm:text-sm">Full-Stack Web Development</span>
                    <span className="text-slate-400 text-xs hidden sm:inline ml-2">• Building responsive, secure apps with React & Node</span>
                  </div>
                </div>

                <div className="p-3 rounded-sm bg-white/[0.02] border border-white/[0.06] flex items-center gap-2.5 hover:border-cyan-500/30 transition-colors">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div className="truncate">
                    <span className="text-white font-medium text-xs sm:text-sm">AI & Smart Search</span>
                    <span className="text-slate-400 text-xs hidden sm:inline ml-2">• Fast AI chat and search tools powered by Python & FastAPI</span>
                  </div>
                </div>

                <div className="p-3 rounded-sm bg-white/[0.02] border border-white/[0.06] flex items-center gap-2.5 hover:border-cyan-500/30 transition-colors">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div className="truncate">
                    <span className="text-white font-medium text-xs sm:text-sm">Problem Solving & DSA</span>
                    <span className="text-slate-400 text-xs hidden sm:inline ml-2">• Strong programming fundamentals and clean algorithms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
