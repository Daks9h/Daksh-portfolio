import React, { useState } from 'react';
import { 
  Code, Layers, Database, Cpu, Wrench, Shield, CheckCircle2,
  Atom, Server, Zap, Globe, FileCode, Flame, Terminal
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', 'LANGUAGES', 'FRAMEWORKS', 'DATABASES', 'AI / ML', 'TOOLS'];

  const getFilteredTools = () => {
    if (selectedCategory === 'ALL') return portfolioData.skills.allTools;
    if (selectedCategory === 'LANGUAGES') return portfolioData.skills.categories[0].skills;
    if (selectedCategory === 'FRAMEWORKS') return portfolioData.skills.categories[1].skills;
    if (selectedCategory === 'DATABASES') return portfolioData.skills.categories[2].skills;
    if (selectedCategory === 'AI / ML') return portfolioData.skills.categories[3].skills;
    if (selectedCategory === 'TOOLS') return portfolioData.skills.categories[4].skills;
    return portfolioData.skills.allTools;
  };

  return (
    <section id="skills" className="py-24 border-t border-white/[0.06] relative overflow-hidden">

      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="section-title">
            TECHNICAL SKILLS & SYSTEMS
          </h2>
        </div>

        {/* Featured Core Proficiencies Grid - Static & Scan-friendly */}
        <div className="mb-14">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">
            Core Architectural Competencies
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {portfolioData.skills.marquee.map((skill, idx) => (
              <div
                key={idx}
                className="cyber-card p-4 rounded-xl border border-white/[0.08] hover:border-cyan-500/40 transition-all group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono tracking-wider text-cyan-400 uppercase">
                    {skill.category}
                  </span>
                  <span className="text-xs font-mono font-medium text-slate-300">
                    {skill.level}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 my-1">
                  <div
                    style={{ color: skill.color }}
                    className="p-1.5 rounded-lg bg-[#111622] border border-white/[0.06] group-hover:scale-105 transition-transform shrink-0"
                  >
                    <Atom className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors truncate">
                    {skill.name}
                  </h4>
                </div>

                <div className="w-full h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <div
                    style={{ width: skill.level }}
                    className="h-full bg-cyan-400 rounded-full"
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Infrastructure Tools Grid Section */}
        <div className="cyber-card p-6 sm:p-8 rounded-xl border border-white/[0.08]">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Tooling & Technologies Inventory
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                Filter by stack layer or view comprehensive competency index
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-[#111622] rounded-lg border border-white/[0.06]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    selectedCategory === cat
                      ? 'bg-cyan-400 text-[#07090e] shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Tools Grid */}
          <div className="flex flex-wrap gap-2.5">
            {getFilteredTools().map((tool, idx) => (
              <div
                key={idx}
                className="px-3.5 py-2 rounded-lg bg-[#111622] border border-white/[0.06] hover:border-cyan-500/40 text-slate-200 hover:text-cyan-300 text-xs font-medium transition-all flex items-center gap-2 group cursor-default"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform"></span>
                <span>{tool}</span>
              </div>
            ))}
          </div>

          {/* Summary Footer */}
          <div className="mt-8 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
            <span>Core Competencies: Full-Stack JavaScript/TypeScript, Python, Java, RAG Pipelines</span>
            <span className="text-cyan-400 font-mono">27+ Production Tools & Frameworks</span>
          </div>

        </div>

      </div>
    </section>
  );
}
