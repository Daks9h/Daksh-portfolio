import React, { useState } from 'react';
import { Briefcase, Calendar, CheckCircle2, ChevronRight, Terminal } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Experience({ onNavigate }) {
  const [activeLog, setActiveLog] = useState(0);

  return (
    <section id="experience" className="pt-4 pb-16 relative">
      <div className="container mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="section-title">
            WORK EXPERIENCE & CONTRIBUTIONS
          </h2>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* Left Column: Timeline Rail & Cards */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-5">
            {portfolioData.experience.map((exp, idx) => {
              const isSelected = activeLog === idx;
              return (
                <div
                  key={exp.id}
                  onClick={() => setActiveLog(idx)}
                  className={`cyber-card p-4 sm:p-6 rounded-xl border transition-all duration-200 cursor-pointer ${isSelected
                      ? 'border-cyan-500/50 bg-[#111622] shadow-sm'
                      : 'border-white/[0.08] hover:border-white/[0.16] bg-[#0d111a]'
                    }`}
                >
                  {/* Top Bar: Role ID & Period */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-cyan-300 bg-cyan-950/50 px-2.5 py-0.5 rounded-md border border-cyan-500/30">
                        {exp.id.replace('_', ' ')}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs font-medium text-slate-400">
                        {exp.period}
                      </span>
                    </div>

                    <span
                      className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${exp.status === 'ACTIVE_OPERATION'
                          ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30'
                          : 'bg-slate-900 text-slate-400 border-white/[0.06]'
                        }`}
                    >
                      {exp.status === 'ACTIVE_OPERATION' ? 'Active Role' : 'Completed'}
                    </span>
                  </div>

                  {/* Role & Org */}
                  <div className="mb-2">
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      {exp.role.replace(/_/g, ' ')}
                    </h3>
                    <div className="text-xs font-mono text-cyan-400 font-medium mt-0.5">
                      {exp.organization}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.06]">
                    {exp.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 text-[11px] font-mono text-slate-300 bg-[#07090e] border border-white/[0.06] rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>

          {/* Right Column: Mission Control / Details */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">

            {/* Selected Role Inspector */}
            <div className="cyber-card p-4 sm:p-6 rounded-xl border border-white/[0.08] shadow-xl">
              <div className="flex items-center gap-2 mb-4 text-cyan-400 font-mono text-xs font-semibold pb-2 border-b border-white/[0.06]">
                <Terminal className="w-4 h-4" />
                <span>ROLE DETAIL INSPECTOR</span>
              </div>

              {portfolioData.experience[activeLog] && (
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">Organization</span>
                    <h4 className="text-base font-bold text-white mt-0.5">
                      {portfolioData.experience[activeLog].organization}
                    </h4>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">Designation</span>
                    <p className="text-sm font-semibold text-cyan-300 mt-0.5">
                      {portfolioData.experience[activeLog].role.replace(/_/g, ' ')}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">Timeline</span>
                    <p className="text-xs font-mono text-slate-300 mt-0.5">
                      {portfolioData.experience[activeLog].period}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">Core Architecture Highlights</span>
                    <p className="text-xs text-slate-300 leading-relaxed mt-1">
                      {portfolioData.experience[activeLog].description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Verified Engagement</span>
                    <span className="text-emerald-400">● Confirmed</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Stat Pill */}
            <div className="cyber-card p-5 rounded-xl border border-white/[0.08] space-y-2 text-xs">
              <div className="text-slate-300 font-medium">Looking for a full-stack engineer?</div>
              <p className="text-slate-400 leading-relaxed">
                Available for internships, contract builds, and engineering roles starting immediately.
              </p>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate?.('contact');
                }}
                className="inline-block pt-1 text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-4"
              >
                Send a message →
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
