import React from 'react';
import { Award, Users, FileCheck } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Certifications() {
  return (
    <section className="py-20 border-t border-white/[0.06] relative">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="section-title">Certifications & Leadership</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Certifications Grid */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-base font-semibold text-white">
              Technical Certifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {portfolioData.certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="cyber-card p-4 rounded-xl border border-white/[0.08] hover:border-cyan-500/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wide">
                        {cert.type}
                      </span>
                      <Award className="w-4 h-4 text-emerald-400" />
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-1">
                      {cert.title}
                    </h4>
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/[0.06] text-xs font-mono text-slate-400 flex items-center justify-between">
                    <span>Issuer:</span>
                    <span className="text-slate-200 font-medium">{cert.issuer}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Leadership & Extracurricular Activities */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-base font-semibold text-white">
              Collegiate Leadership & Activities
            </h3>

            <div className="space-y-4">
              {portfolioData.activities.map((act, idx) => (
                <div
                  key={idx}
                  className="cyber-card p-5 rounded-xl border border-white/[0.08]"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Users className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-semibold text-white">
                      {act.role}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-cyan-300 font-medium mb-2">
                    {act.entity}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {act.focus}
                  </p>
                </div>
              ))}

              <div className="cyber-card p-4 rounded-xl border border-white/[0.06] text-xs text-slate-400 flex items-center gap-3">
                <FileCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified academic credentials and club involvement at LNCT Bhopal.</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
