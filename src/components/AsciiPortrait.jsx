import React, { useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';

export default function AsciiPortrait() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    const width = (canvas.width = 600);
    const height = (canvas.height = 240);

    const chars = [' ', '.', ':', '-', '=', '+', '*', '%', '@', '#', '1', '0'];
    const cols = 60;
    const rows = 24;
    const cellW = width / cols;
    const cellH = height / rows;

    let time = 0;
    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) * (width / rect.width);
      mouseY = (e.clientY - rect.top) * (height / rect.height);
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.fillStyle = '#0a0f1e';
      ctx.fillRect(0, 0, width, height);

      time += 0.04;
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * cellW + cellW / 2;
          const y = r * cellH + cellH / 2;

          // Generate an architectural cyber avatar silhouette shape
          const cx = cols / 2;
          const cy = rows / 2;
          const distFromCenter = Math.sqrt((c - cx) * (c - cx) + (r - cy) * (r - cy));
          
          // Head / visor shape
          let intensity = 0;
          const headRadius = 9;
          if (distFromCenter < headRadius) {
            intensity = 0.4 + Math.sin(r * 0.4 + time) * 0.2;
            
            // Visor band across eyes
            if (r >= 8 && r <= 11 && c >= 22 && c <= 38) {
              intensity = 0.9 + Math.sin(c * 0.3 - time * 2) * 0.3;
            }
            // Shoulders outline
            if (r > 15) {
              const shoulderDist = Math.abs(c - cx);
              if (shoulderDist < (r - 13) * 2) {
                intensity = 0.5 + Math.cos(c * 0.2) * 0.2;
              }
            }
          }

          // Mouse proximity glow
          const dMouse = Math.sqrt((x - mouseX) * (x - mouseX) + (y - mouseY) * (y - mouseY));
          if (dMouse < 90) {
            intensity += (1 - dMouse / 90) * 0.5;
          }

          // Background matrix noise
          const bgNoise = Math.sin(c * 0.2 + time) * Math.cos(r * 0.2 - time) * 0.15;
          intensity = Math.max(0, Math.min(1, intensity + bgNoise));

          const charIdx = Math.floor(intensity * (chars.length - 1));
          const char = chars[charIdx] || ' ';

          // Color calculation
          if (intensity > 0.75) {
            ctx.fillStyle = '#38bdf8'; // Cyan peak
          } else if (intensity > 0.45) {
            ctx.fillStyle = '#3b82f6'; // Blue
          } else if (intensity > 0.2) {
            ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
          } else {
            ctx.fillStyle = 'rgba(100, 116, 139, 0.15)';
          }

          ctx.fillText(char, x, y);
        }
      }

      // Horizontal scanner bar
      const scanY = (Math.sin(time * 0.8) * 0.5 + 0.5) * height;
      ctx.fillStyle = 'rgba(56, 189, 248, 0.18)';
      ctx.fillRect(0, scanY - 3, width, 6);
      ctx.fillStyle = 'rgba(56, 189, 248, 0.8)';
      ctx.fillRect(0, scanY, width, 1.5);

      // Corner annotations
      ctx.fillStyle = '#38bdf8';
      ctx.font = '8px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText('[AVATAR_RENDER: DAKSH.L]', 10, 14);
      ctx.textAlign = 'right';
      ctx.fillText('STATUS: ONLINE', width - 10, 14);
      ctx.fillText('MODE: BIO_NEURAL', width - 10, height - 8);
      ctx.textAlign = 'left';
      ctx.fillText('2026 // B.TECH AIML', 10, height - 8);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="cyber-card p-7 sm:p-8 rounded-sm border border-white/[0.08] flex flex-col justify-between h-full min-h-[340px] relative group">
      {/* Techno Corners */}
      <span className="techno-corner-tl" aria-hidden="true" />
      <span className="techno-corner-tr" aria-hidden="true" />
      <span className="techno-corner-bl" aria-hidden="true" />
      <span className="techno-corner-br" aria-hidden="true" />

      <div className="flex-1 flex flex-col justify-between">
        <div className="flex items-center gap-2 mb-4 text-cyan-400 font-mono text-xs font-semibold tracking-wide">
          <Terminal className="w-4 h-4" />
          <span>BIO_NEURAL_AVATAR</span>
        </div>

        <div className="relative rounded-sm overflow-hidden border border-cyan-500/25 bg-[#07090e]/80 flex-1 flex items-center justify-center my-1">
          <canvas ref={canvasRef} className="w-full h-auto block cursor-crosshair" />
        </div>
      </div>
    </div>
  );
}
