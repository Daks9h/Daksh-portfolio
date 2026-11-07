import React from 'react';
import { User, BookOpen, Compass, CheckCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import AsciiPortrait from '../components/AsciiPortrait';

export default function About() {
  return (
    <section id="about" className="py-24 relative border-t border-white/[0.06] w-full">
      <div className="w-full">
        
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="section-title">
            ABOUT & TECHNICAL BACKGROUND
          </h2>
        </div>

        {/* 4 Cards Grid - 2 Above, 2 Down (2x2) - Full Width Rectangles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
          
          {/* Card 1: Core Specifications */}
          <div className="cyber-card p-6 sm:p-7 rounded-xl border border-white/[0.08] flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 mb-4 text-cyan-400 font-mono text-xs font-semibold tracking-wide">
                <User className="w-4 h-4" />
                <span>PROFILE_OVERVIEW</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <span className="text-slate-400">Role</span>
                  <span className="text-white font-medium text-right">{portfolioData.personal.title}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <span className="text-slate-400">Location</span>
                  <span className="text-cyan-300 font-medium text-right">{portfolioData.personal.location}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <span className="text-slate-400">Status</span>
                  <span className="text-emerald-400 font-medium text-right">Available for Hire</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <span className="text-slate-400">Languages</span>
                  <span className="text-slate-200 text-right">{portfolioData.personal.languages}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <span className="text-slate-400">Core Focus</span>
                  <span className="text-cyan-400 font-medium text-right">{portfolioData.personal.focus}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <span className="text-slate-400">Availability</span>
                  <span className="text-slate-200 text-right">{portfolioData.personal.availability}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-slate-500 flex justify-between">
              <span>Institution: LNCT Bhopal</span>
              <span>Graduation: 2028</span>
            </div>
          </div>

          {/* Card 2: Academic Record */}
          <div className="cyber-card p-6 sm:p-7 rounded-xl border border-white/[0.08] flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 mb-4 text-cyan-400 font-mono text-xs font-semibold tracking-wide">
                <BookOpen className="w-4 h-4" />
                <span>ACADEMIC_EXCELLENCE</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <span className="text-slate-400">Degree</span>
                  <span className="text-white font-medium text-right">B.Tech CSE (AIML)</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <span className="text-slate-400">College</span>
                  <span className="text-cyan-300 text-right">LNCT Bhopal</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <span className="text-slate-400">Tenure</span>
                  <span className="text-slate-200 text-right">Sep 2024 – 2028</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <span className="text-slate-400">Cumulative CGPA</span>
                  <span className="text-emerald-400 font-bold text-sm text-right">8.31 / 10.0</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <span className="text-slate-400">Certification</span>
                  <span className="text-cyan-400 font-medium text-right">Java Foundation (Elite)</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <span className="text-slate-400">Clubs</span>
                  <span className="text-slate-200 text-right">E-Cell & Ensemble</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-slate-500 flex justify-between">
              <span>Standing: In Good Standing</span>
              <span>Semester: Active</span>
            </div>
          </div>

          {/* Card 3: Engineering Ethos */}
          <div className="cyber-card p-6 sm:p-7 rounded-xl border border-white/[0.08] flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 mb-4 text-cyan-400 font-mono text-xs font-semibold tracking-wide">
                <Compass className="w-4 h-4" />
                <span>ENGINEERING_ETHOS</span>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {portfolioData.personal.mission}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-slate-200">Production MERN (JWT RBAC)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-slate-200">Sub-second pgvector & Groq</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-slate-200">Java DSA & Algorithms</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-slate-500 flex justify-between">
              <span>Architecture: Resilient</span>
              <span>Scale: Production-Ready</span>
            </div>
          </div>

          {/* Card 4: Bio-Neural Avatar ASCII Scan */}
          <AsciiPortrait />

        </div>

      </div>
    </section>
  );
}
