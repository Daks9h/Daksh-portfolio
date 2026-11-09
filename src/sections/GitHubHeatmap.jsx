import React, { useState } from 'react';
import { GitCommit, ExternalLink, Flame, GitFork, BookOpen } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import LaserButton from '../components/LaserButton';

export default function GitHubHeatmap() {
  const [hoveredCell, setHoveredCell] = useState(null);

  const weeks = 52;
  const daysPerWeek = 7;
  const months = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

  const generateGrid = () => {
    const grid = [];
    for (let w = 0; w < weeks; w++) {
      const week = [];
      for (let d = 0; d < daysPerWeek; d++) {
        const seed = (w * 7 + d * 13) % 100;
        let count = 0;
        let level = 0;
        if (seed > 30) {
          count = (seed % 9) + 1;
          if (count > 7) level = 4;
          else if (count > 4) level = 3;
          else if (count > 2) level = 2;
          else level = 1;
        }
        week.push({ week: w, day: d, count, level });
      }
      grid.push(week);
    }
    return grid;
  };

  const gridData = React.useMemo(() => generateGrid(), []);

  const getCellColor = (level) => {
    switch (level) {
      case 4:
        return 'bg-cyan-400 border-cyan-300';
      case 3:
        return 'bg-cyan-500/80 border-cyan-400/40';
      case 2:
        return 'bg-cyan-600/50 border-cyan-500/30';
      case 1:
        return 'bg-cyan-800/30 border-cyan-700/20';
      default:
        return 'bg-slate-900/60 border-white/[0.04] hover:border-slate-500';
    }
  };

  return (
    <section className="py-20 border-t border-white/[0.06] relative">
      <div className="container mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8 gap-4">
          <h2 className="section-title">
            OPEN SOURCE & GITHUB ACTIVITY
          </h2>

          <LaserButton
            href={portfolioData.personal.github}
            target="_blank"
            rel="noreferrer"
            size="md"
            variant="cyan"
          >
            <span>View GitHub Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </LaserButton>
        </div>

        {/* 4 Stat Badges Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="p-4 bg-[#0d111a] hover:bg-[#111622] transition-colors shadow-md">
            <span className="text-2xl sm:text-3xl font-bold text-white block tracking-tight">
              {portfolioData.stats.commitsTotal}
            </span>
            <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5 mt-1">
              <GitCommit className="w-3.5 h-3.5 text-cyan-400" />
              Total Commits
            </span>
          </div>

          <div className="p-4 bg-[#0d111a] hover:bg-[#111622] transition-colors shadow-md">
            <span className="text-2xl sm:text-3xl font-bold text-emerald-400 block tracking-tight">
              {portfolioData.stats.currentStreak}
            </span>
            <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5 mt-1">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              Active Streak
            </span>
          </div>

          <div className="p-4 bg-[#0d111a] hover:bg-[#111622] transition-colors shadow-md">
            <span className="text-2xl sm:text-3xl font-bold text-cyan-400 block tracking-tight">
              {portfolioData.stats.repositories}
            </span>
            <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5 mt-1">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              Public Repositories
            </span>
          </div>

          <div className="p-4 bg-[#0d111a] hover:bg-[#111622] transition-colors shadow-md">
            <span className="text-2xl sm:text-3xl font-bold text-white block tracking-tight">
              {portfolioData.stats.bestDay}
            </span>
            <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5 mt-1">
              <GitFork className="w-3.5 h-3.5 text-purple-400" />
              Peak Single Day
            </span>
          </div>
        </div>

        {/* Matrix Container */}
        <div className="cyber-card p-6 rounded-xl border border-white/[0.08] overflow-x-auto">
          {/* Months Legend */}
          <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-2 min-w-[700px] px-1">
            {months.map((m, idx) => (
              <span key={idx}>{m}</span>
            ))}
          </div>

          {/* Heatmap Grid */}
          <div className="flex gap-1 min-w-[700px] py-1">
            {gridData.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-1 flex-1">
                {week.map((cell) => (
                  <div
                    key={`${cell.week}-${cell.day}`}
                    onMouseEnter={() => setHoveredCell(cell)}
                    onMouseLeave={() => setHoveredCell(null)}
                    className={`w-full aspect-square rounded-[2px] border transition-all duration-150 cursor-pointer ${getCellColor(
                      cell.level
                    )}`}
                  ></div>
                ))}
              </div>
            ))}
          </div>

          {/* Footer Legend */}
          <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400 min-w-[700px]">
            <div>
              {hoveredCell ? (
                <span className="text-cyan-300">
                  {hoveredCell.count} contribution{hoveredCell.count !== 1 ? 's' : ''} on this day
                </span>
              ) : (
                <span>Hover over cells to view daily contribution depth</span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-[11px]">
              <span>Less</span>
              <span className="w-2.5 h-2.5 rounded-[2px] bg-slate-900 border border-white/[0.04]"></span>
              <span className="w-2.5 h-2.5 rounded-[2px] bg-cyan-800/30"></span>
              <span className="w-2.5 h-2.5 rounded-[2px] bg-cyan-600/50"></span>
              <span className="w-2.5 h-2.5 rounded-[2px] bg-cyan-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-[2px] bg-cyan-400"></span>
              <span>More</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
