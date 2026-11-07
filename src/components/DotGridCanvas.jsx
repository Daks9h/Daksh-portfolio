import React, { useEffect, useRef } from 'react';

export default function DotGridCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 1200);
    let height = (canvas.height = 180);

    const handleResize = () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = 180;
      }
    };
    window.addEventListener('resize', handleResize);

    let mouseX = width / 2;
    let mouseY = height / 2;
    const handleMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', handleMove);

    const gap = 24;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.03;

      for (let x = gap; x < width; x += gap) {
        for (let y = gap; y < height; y += gap) {
          const dx = mouseX - x;
          const dy = mouseY - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 160;

          let size = 1.2;
          let alpha = 0.15;
          let wave = Math.sin(time + x * 0.02 + y * 0.02) * 0.5 + 0.5;

          if (dist < maxDist) {
            const factor = 1 - dist / maxDist;
            size = 1.2 + factor * 2.5;
            alpha = 0.2 + factor * 0.7;
          } else {
            alpha += wave * 0.1;
          }

          ctx.fillStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMove);
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden border-y border-cyan-500/15 py-4 bg-slate-950/60 my-12">
      <div className="absolute top-2 left-6 text-[10px] font-mono tracking-widest text-cyan-400/60 uppercase">
        // MATRIX_GRID_TRANSMISSION // ACTIVE_PROXIMITY_SCAN
      </div>
      <div className="container mx-auto px-4">
        <canvas ref={canvasRef} className="dot-grid__canvas w-full h-[180px] block cursor-crosshair" />
      </div>
    </div>
  );
}
