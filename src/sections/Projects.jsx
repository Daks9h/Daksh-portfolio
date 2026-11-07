import React, { useState } from 'react';
import { ExternalLink, ChevronDown, ChevronUp, Layers, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '../components/SocialIcons';
import { portfolioData } from '../data/portfolioData';

export default function Projects() {
  const [filter, setFilter] = useState('ALL');
  const [expandedWorkflow, setExpandedWorkflow] = useState({});

  const toggleWorkflow = (id) => {
    setExpandedWorkflow((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredProjects = portfolioData.projects.filter((p) => {
    if (filter === 'ALL') return true;
    return p.category === filter;
  });

  return (
    <section id="projects" className="py-24 border-t border-white/[0.06] relative">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 gap-5">
          <h2 className="section-title">Featured Projects</h2>

          {/* Filter Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-[#111622] rounded-lg border border-white/[0.06]">
            {['ALL', 'AI', 'FULLSTACK'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  filter === tab
                    ? 'bg-cyan-400 text-[#07090e] shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {tab === 'AI' ? 'AI / RAG' : tab === 'FULLSTACK' ? 'Full Stack' : 'All Projects'}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj) => {
            const isWorkflowOpen = !!expandedWorkflow[proj.id];
            return (
              <div
                key={proj.id}
                className="cyber-card rounded-xl border border-white/[0.08] overflow-hidden flex flex-col justify-between group shadow-lg"
              >
                {/* Visual Banner */}
                <div className={`h-44 relative bg-gradient-to-br ${proj.imagePlaceholderColor} p-6 flex flex-col justify-between border-b border-white/[0.08] overflow-hidden`}>
                  <div className="flex items-center justify-between z-10">
                    <span className="font-mono text-xs font-semibold text-cyan-200 bg-[#07090e]/80 px-2.5 py-1 rounded-md border border-white/[0.08]">
                      {proj.id} • {proj.year}
                    </span>
                    <span className="font-mono text-[10px] font-medium text-emerald-300 bg-[#07090e]/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Deployed
                    </span>
                  </div>

                  <div className="z-10">
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-200 mt-1 line-clamp-1 font-medium">
                      {proj.subtitle}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">
                      {proj.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {proj.tags.slice(0, 5).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 text-[11px] font-mono text-cyan-300 bg-[#111622] border border-white/[0.06] rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                      {proj.tags.length > 5 && (
                        <span className="px-2 py-0.5 text-[11px] font-mono text-slate-400 bg-[#111622] rounded-md">
                          +{proj.tags.length - 5}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Architecture Workflow Collapsible */}
                  <div className="border-t border-white/[0.06] pt-3">
                    <button
                      onClick={() => toggleWorkflow(proj.id)}
                      className="w-full py-2 px-3 bg-[#111622] hover:bg-slate-800 border border-white/[0.06] hover:border-cyan-500/30 rounded-lg text-xs font-mono text-cyan-300 flex items-center justify-between transition-all"
                    >
                      <span className="font-medium flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 text-cyan-400" />
                        {isWorkflowOpen ? 'Hide Architecture Pipeline' : 'View Architecture Pipeline'}
                      </span>
                      {isWorkflowOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {isWorkflowOpen && (
                      <div className="mt-3 p-3.5 bg-[#07090e] rounded-lg border border-white/[0.06] space-y-2.5 text-xs font-mono animate-fadeIn">
                        {proj.workflowSteps.map((s) => (
                          <div key={s.step} className="flex items-start gap-2.5 pt-1 border-t border-white/[0.04] first:border-0 first:pt-0">
                            <span className="text-cyan-400 font-bold">[{s.step}]</span>
                            <div>
                              <span className="text-slate-200 font-medium block">{s.name}</span>
                              <span className="text-slate-400 text-[11px] font-sans leading-normal block">{s.detail}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions / Links */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-xs font-mono">
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>Source Code</span>
                    </a>

                    <a
                      href={proj.liveDemo}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 text-xs font-semibold text-[#07090e] bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all flex items-center gap-1"
                    >
                      <span>Preview</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
