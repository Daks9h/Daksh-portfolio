import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Terminal, ExternalLink, Activity, Cpu, Layers } from 'lucide-react';
import { latentProjects, domainClusters } from '../data/projects.latent';
import {
  drawBackground,
  drawClusterLabels,
  drawScanline,
  drawNodes,
  drawHUD
} from './latentSpaceDraw';

export default function LatentSpaceProjects() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  
  // Default to the first project so the prediction panel is never blank
  const [selectedProject, setSelectedProject] = useState(latentProjects[0]);
  const [hoveredProject, setHoveredProject] = useState(null);
  
  const activeProject = hoveredProject || selectedProject;
  const activeProjectRef = useRef(activeProject);
  activeProjectRef.current = activeProject;

  const pointsRef = useRef([]);

  const openProject = useCallback((project) => {
    if (!project?.href) return;
    if (project.href.startsWith('http')) {
      window.open(project.href, '_blank', 'noopener,noreferrer');
    } else {
      window.location.hash = project.href;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let isVisible = true;
    let time = 0;
    let w = 480;
    let h = 260;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let isReducedMotion = reducedMotionQuery.matches;

    const handleReducedMotionChange = (e) => {
      isReducedMotion = e.matches;
    };
    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);

    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width || 480;
      h = rect.height || 260;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const padX = 36;
      const padY = 30;
      const usableW = w - padX * 2;
      const usableH = h - padY * 2;

      pointsRef.current = latentProjects.map((p, idx) => ({
        ...p,
        idx,
        px: padX + p.x * usableW,
        py: padY + p.y * usableH,
        lastPulse: 0
      }));
    };

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(container);
    updateDimensions();

    const handleVisibility = () => {
      isVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    intersectionObserver.observe(canvas);

    const render = () => {
      if (isVisible) {
        time += 0.025;
        ctx.clearRect(0, 0, w, h);

        drawBackground(ctx, w, h);
        drawClusterLabels(ctx, domainClusters, w, h);

        const now = performance.now();
        const scanY = isReducedMotion ? h / 2 : ((Math.sin(time * 0.7) * 0.5 + 0.5) * h);
        drawScanline(ctx, scanY, w, isReducedMotion);

        const currentActiveId = activeProjectRef.current?.id;
        drawNodes(ctx, pointsRef.current, currentActiveId, scanY, now, isReducedMotion, time);
        drawHUD(ctx, latentProjects.length, activeProjectRef.current?.title, w, h);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
    };
  }, []);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const findNearest = (x, y, radius) => {
    return pointsRef.current.find((dot) => {
      const dx = dot.px - x;
      const dy = dot.py - y;
      return Math.sqrt(dx * dx + dy * dy) <= radius;
    });
  };

  const handlePointerMove = (e) => {
    if (e.pointerType === 'touch') return;
    const { x, y } = getCoordinates(e);
    const hit = findNearest(x, y, 18);
    setHoveredProject(hit || null);
  };

  const handlePointerLeave = () => {
    setHoveredProject(null);
  };

  const handlePointerDown = (e) => {
    const { x, y } = getCoordinates(e);
    const hitRadius = e.pointerType === 'touch' ? 26 : 18;
    const hit = findNearest(x, y, hitRadius);

    if (hit) {
      setSelectedProject(hit);
      if (e.pointerType !== 'touch' || selectedProject?.id === hit.id) {
        openProject(hit);
      }
    }
  };

  return (
    <div className="cyber-card p-6 sm:p-8 rounded-sm border border-white/[0.08] w-full relative group">
      {/* Techno Corners */}
      <span className="techno-corner-tl" aria-hidden="true" />
      <span className="techno-corner-tr" aria-hidden="true" />
      <span className="techno-corner-bl" aria-hidden="true" />
      <span className="techno-corner-br" aria-hidden="true" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-white/[0.06] gap-2">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold tracking-wide">
          <Terminal className="w-4 h-4" />
          <span>&gt;_ LATENT_SPACE // PROJECT_PROJECTION</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
          <span>COORDINATES: HARMONIC_2D</span>
          <span className="text-cyan-400">N_NODES: {latentProjects.length}</span>
        </div>
      </div>

      {/* Side-by-Side: Drawing Area + Prediction Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left: Small Drawing Area Canvas */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div
            ref={containerRef}
            className="relative rounded-sm overflow-hidden border border-cyan-500/25 bg-[#070a12] w-full h-[250px] sm:h-[270px] flex items-center justify-center cursor-crosshair"
            style={{ touchAction: 'pan-y' }}
          >
            <canvas
              ref={canvasRef}
              role="img"
              aria-label="Interactive 2D projection scatter plot showing portfolio projects clustered by domain."
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              onPointerDown={handlePointerDown}
              className="w-full h-full block"
            />
          </div>
          <div className="mt-2 text-[10px] font-mono text-slate-500 flex justify-between px-1">
            <span>HOVER / TAP DOT TO INSPECT</span>
            <span className="text-cyan-400/80">INTERACTIVE_CANVAS</span>
          </div>
        </div>

        {/* Right: Live Prediction Stats Panel */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          
          {/* Active Node Header & Domain */}
          <div className="p-4 rounded-sm bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className="text-white font-bold text-base font-mono tracking-tight">
                  {activeProject.title}
                </span>
                <span className="font-mono text-[10px] text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded-sm">
                  {activeProject.domain}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {activeProject.clusterName}
              </p>
            </div>

            <button
              onClick={() => openProject(activeProject)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-sm text-xs font-mono transition-colors self-start sm:self-center"
            >
              <span>SOURCE / LIVE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3 Prediction Metric Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-sm bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-mono mb-1">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>CONFIDENCE</span>
              </div>
              <span className="text-emerald-400 font-bold font-mono text-sm">
                {activeProject.confidence}
              </span>
            </div>

            <div className="p-3 rounded-sm bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-mono mb-1">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>LATENCY</span>
              </div>
              <span className="text-cyan-300 font-bold font-mono text-sm">
                {activeProject.latency}
              </span>
            </div>

            <div className="p-3 rounded-sm bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-mono mb-1">
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                <span>PIPELINE</span>
              </div>
              <span className="text-slate-200 font-mono text-[11px] truncate block" title={activeProject.pipeline}>
                {activeProject.pipeline}
              </span>
            </div>
          </div>

          {/* Project Blurb & Stack Chips */}
          <div className="p-3.5 rounded-sm bg-white/[0.02] border border-white/[0.06] flex-1 flex flex-col justify-between gap-3">
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {activeProject.blurb}
            </p>

            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/[0.04]">
              <span className="text-[10px] font-mono text-slate-500 mr-1">STACK:</span>
              {activeProject.stack.map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-sm bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Screen Reader & Keyboard Accessible Navigation Links */}
      <ul className="sr-only">
        {latentProjects.map((p) => (
          <li key={p.id}>
            <a
              href={p.href}
              target={p.href.startsWith('http') ? '_blank' : undefined}
              rel={p.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              onFocus={() => setSelectedProject(p)}
            >
              {p.title} ({p.domain}) - {p.blurb}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
