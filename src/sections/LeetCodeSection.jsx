import React from 'react';
import { Code2, CheckCircle2, TrendingUp, Award, Zap } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function LeetCodeSection() {
  const problems = [
    { label: 'EASY', count: portfolioData.stats.leetcodeEasy, total: 150, color: 'text-emerald-400', barColor: 'bg-emerald-400' },
    { label: 'MEDIUM', count: portfolioData.stats.leetcodeMedium, total: 180, color: 'text-amber-400', barColor: 'bg-amber-400' },
    { label: 'HARD', count: portfolioData.stats.leetcodeHard, total: 50, color: 'text-red-400', barColor: 'bg-red-400' },
  ];

  return (
    <section className="py-20 border-t border-white/[0.06] relative">
      <div className="container mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8 gap-3">
          <h2 className="section-title">
            ALGORITHMS & PROBLEM SOLVING
          </h2>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-950/40 border border-emerald-500/25 rounded-full text-xs font-mono text-emerald-300">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>NPTEL Java Elite Certified</span>
          </div>
        </div>

        {/* 4 Stat Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="cyber-card p-4 rounded-xl border border-white/[0.08]">
            <span className="text-2xl sm:text-3xl font-bold text-white block tracking-tight">
              {portfolioData.stats.leetcodeSolved}
            </span>
            <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5 mt-1">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              Total Solved
            </span>
          </div>

          <div className="cyber-card p-4 rounded-xl border border-white/[0.08]">
            <span className="text-2xl sm:text-3xl font-bold text-emerald-400 block tracking-tight">
              {portfolioData.stats.leetcodeEasy}
            </span>
            <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Easy Problems
            </span>
          </div>

          <div className="cyber-card p-4 rounded-xl border border-white/[0.08]">
            <span className="text-2xl sm:text-3xl font-bold text-amber-400 block tracking-tight">
              {portfolioData.stats.leetcodeMedium}
            </span>
            <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5 mt-1">
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
              Medium Problems
            </span>
          </div>

          <div className="cyber-card p-4 rounded-xl border border-white/[0.08]">
            <span className="text-2xl sm:text-3xl font-bold text-red-400 block tracking-tight">
              {portfolioData.stats.leetcodeHard}
            </span>
            <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5 mt-1">
              <Zap className="w-3.5 h-3.5 text-red-400" />
              Hard Problems
            </span>
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="cyber-card p-6 sm:p-8 rounded-xl border border-white/[0.08]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left: Progress Bars */}
            <div className="lg:col-span-7 space-y-5">
              <h3 className="text-base font-semibold text-white">
                Difficulty Breakdown
              </h3>

              {problems.map((prob) => {
                const percent = Math.min(100, Math.round((parseInt(prob.count) / prob.total) * 100));
                return (
                  <div key={prob.label} className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className={`font-semibold ${prob.color}`}>{prob.label}</span>
                      <span className="text-slate-300">
                        {prob.count} <span className="text-slate-500">/ {prob.total} ({percent}%)</span>
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/[0.06]">
                      <div
                        style={{ width: `${percent}%` }}
                        className={`h-full rounded-full transition-all duration-500 ${prob.barColor}`}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Summary Card */}
            <div className="lg:col-span-5 bg-[#111622] p-5 rounded-xl border border-white/[0.06] space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold">
                <Code2 className="w-4 h-4" />
                <span>DSA_FOUNDATION</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Strong focus on Arrays, Trees, Dynamic Programming, Graphs, and Hash Tables in Java and C++.
                Trained in algorithm analysis and asymptotic complexity optimization.
              </p>
              <div className="pt-2 border-t border-white/[0.06] text-xs font-mono text-slate-400 flex justify-between">
                <span>Primary Language: Java</span>
                <span className="text-emerald-400">Consistent Solver</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
