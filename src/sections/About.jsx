import React, { useState } from 'react';
import { User, Award, BookOpen, Activity, Compass, CheckCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import AsciiPortrait from '../components/AsciiPortrait';

export default function About() {
  const [activeDay, setActiveDay] = useState('Wed');

  const visitorData = [
    { day: 'Sun', count: 320, height: '40%' },
    { day: 'Mon', count: 540, height: '65%' },
    { day: 'Tue', count: 710, height: '85%' },
    { day: 'Wed', count: 880, height: '100%' },
    { day: 'Thu', count: 650, height: '75%' },
    { day: 'Fri', count: 590, height: '70%' },
    { day: 'Sat', count: 410, height: '50%' },
  ];

  return (
    <section id="about" className="py-24 relative border-t border-white/[0.06]">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="section-title">About & Technical Background</h2>
        </div>

        {/* 3 Core Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: Core Specifications */}
          <div className="cyber-card p-6 rounded-xl border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 text-cyan-400 font-mono text-xs font-semibold tracking-wide">
                <User className="w-4 h-4" />
                <span>PROFILE_OVERVIEW</span>
              </div>

              <div className="space-y-3 text-xs divide-y divide-white/[0.06]">
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-400">Role</span>
                  <span className="text-white font-medium">{portfolioData.personal.title}</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-400">Location</span>
                  <span className="text-cyan-300 font-medium">{portfolioData.personal.location}</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-400">Status</span>
                  <span className="text-emerald-400 font-medium">Available for Hire</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-400">Languages</span>
                  <span className="text-slate-200">{portfolioData.personal.languages}</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-400">Core Focus</span>
                  <span className="text-cyan-400 font-medium">{portfolioData.personal.focus}</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-400">Availability</span>
                  <span className="text-slate-200">{portfolioData.personal.availability}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-slate-500 flex justify-between">
              <span>Institution: LNCT Bhopal</span>
              <span>Graduation: 2028</span>
            </div>
          </div>

          {/* Card 2: Academic Record */}
          <div className="cyber-card p-6 rounded-xl border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 text-cyan-400 font-mono text-xs font-semibold tracking-wide">
                <BookOpen className="w-4 h-4" />
                <span>ACADEMIC_EXCELLENCE</span>
              </div>

              <div className="space-y-3 text-xs divide-y divide-white/[0.06]">
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-400">Degree</span>
                  <span className="text-white font-medium text-right">B.Tech CSE (AIML)</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-400">College</span>
                  <span className="text-cyan-300 text-right">LNCT Bhopal</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-400">Tenure</span>
                  <span className="text-slate-200">Sep 2024 – 2028</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-400">Cumulative CGPA</span>
                  <span className="text-emerald-400 font-bold text-sm">8.31 / 10.0</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-400">NPTEL Certification</span>
                  <span className="text-cyan-400 font-medium">Java Foundation (Elite)</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-400">Collegiate Clubs</span>
                  <span className="text-slate-200">E-Cell LNCTS & LNCT Ensemble</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-slate-500 flex justify-between">
              <span>Standing: In Good Standing</span>
              <span>Semester: Active</span>
            </div>
          </div>

          {/* Card 3: Mission Statement */}
          <div className="cyber-card p-6 rounded-xl border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 text-cyan-400 font-mono text-xs font-semibold tracking-wide">
                <Compass className="w-4 h-4" />
                <span>ENGINEERING_ETHOS</span>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {portfolioData.personal.mission}
              </p>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Production-grade MERN architectures with JWT RBAC</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Sub-second vector retrieval with pgvector & Groq</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Robust Java algorithms & data structure foundation</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-slate-500 flex justify-between">
              <span>Architecture: Resilient</span>
              <span>Scale: Production-Ready</span>
            </div>
          </div>

        </div>

        {/* Lower Row: ASCII Portrait & Activity Monitor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: ASCII Art Portrait */}
          <div className="lg:col-span-6">
            <AsciiPortrait />
          </div>

          {/* Right: Activity / Telemetry Monitor */}
          <div className="lg:col-span-6 cyber-card p-6 rounded-xl border border-white/[0.08]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold">
                <Activity className="w-4 h-4" />
                <span>WEEKLY_ENGAGEMENT_METRICS</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                Telemetry Active
              </span>
            </div>

            <p className="text-slate-400 text-sm mb-6">
              Activity frequency, repository review requests, and visitor sessions across development cycles.
            </p>

            {/* Interactive Bar Chart */}
            <div className="h-44 w-full flex items-end justify-between gap-3 pt-6 pb-2 border-b border-white/[0.06]">
              {visitorData.map((item) => {
                const isSelected = activeDay === item.day;
                return (
                  <div
                    key={item.day}
                    onClick={() => setActiveDay(item.day)}
                    className="flex-1 flex flex-col items-center gap-2 h-full justify-end cursor-pointer group"
                  >
                    <span className={`text-[10px] font-mono transition-colors ${
                      isSelected ? 'text-cyan-300 font-bold' : 'text-slate-500 group-hover:text-slate-300'
                    }`}>
                      {item.count}
                    </span>
                    <div
                      style={{ height: item.height }}
                      className={`w-full rounded-t transition-all duration-300 ${
                        isSelected
                          ? 'bg-cyan-400 shadow-sm'
                          : 'bg-slate-800 hover:bg-slate-700'
                      }`}
                    ></div>
                    <span className={`text-xs font-mono transition-colors ${
                      isSelected ? 'text-cyan-400 font-bold' : 'text-slate-400'
                    }`}>
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Bottom Chart Footer */}
            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs font-mono text-slate-400">
                Peak day: <span className="text-cyan-400 font-bold">880 requests</span> (Wednesday)
              </div>
              <a
                href="#contact"
                className="px-3.5 py-1.5 text-xs font-semibold text-[#07090e] bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all flex items-center gap-1.5"
              >
                <span>Discuss a project</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
