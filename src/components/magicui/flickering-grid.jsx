import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/**
 * FlickeringGrid component from Magic UI
 * High-performance animated canvas grid with atmospheric flickering squares
 */
export function FlickeringGrid({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.1,
  color = '#6B7280',
  width,
  height,
  className = '',
  maxOpacity = 0.5,
  ...props
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(true);

  // Parse color to rgba base string: "rgba(r, g, b,"
  const memoizedColor = useMemo(() => {
    if (typeof window === 'undefined') return 'rgba(107, 114, 128,';
    try {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext('2d');
      if (!ctx) return 'rgba(107, 114, 128,';
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data);
      return `rgba(${r}, ${g}, ${b},`;
    } catch {
      return 'rgba(107, 114, 128,';
    }
  }, [color]);

  // Check user preference for reduced motion
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let gridParams = { cols: 0, rows: 0, squares: new Float32Array(0), dpr: 1, w: 0, h: 0 };
    let lastTime = performance.now();

    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = width ?? container.clientWidth ?? window.innerWidth;
      const h = height ?? container.clientHeight ?? window.innerHeight;

      if (w === 0 || h === 0) return;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const step = squareSize + gridGap;
      const cols = Math.floor(w / step) + 1;
      const rows = Math.floor(h / step) + 1;
      const totalSquares = cols * rows;

      const squares = new Float32Array(totalSquares);
      for (let i = 0; i < totalSquares; i++) {
        squares[i] = Math.random() * maxOpacity;
      }

      gridParams = { cols, rows, squares, dpr, w, h };
    };

    setupCanvas();

    const updateSquares = (squares, deltaTime) => {
      // Scale flicker frequency by delta time for consistent 60fps pacing
      const chance = flickerChance * deltaTime * 60;
      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < chance) {
          squares[i] = Math.random() * maxOpacity;
        }
      }
    };

    const draw = () => {
      const { cols, rows, squares, dpr, w, h } = gridParams;
      if (!ctx || cols === 0 || rows === 0) return;

      ctx.clearRect(0, 0, w * dpr, h * dpr);

      const step = squareSize + gridGap;
      const scaledSquareSize = squareSize * dpr;
      const scaledStep = step * dpr;

      let idx = 0;
      for (let col = 0; col < cols; col++) {
        const x = col * scaledStep;
        for (let row = 0; row < rows; row++) {
          const y = row * scaledStep;
          const opacity = squares[idx++];
          if (opacity > 0.01) {
            ctx.fillStyle = `${memoizedColor} ${opacity})`;
            ctx.fillRect(x, y, scaledSquareSize, scaledSquareSize);
          }
        }
      }
    };

    const renderLoop = (currentTime) => {
      if (!isInView || prefersReducedMotion) {
        draw();
        return;
      }

      const deltaMs = currentTime - lastTime;
      const deltaTime = Math.min(deltaMs / 1000, 0.1); // clamp to prevent flicker spikes
      lastTime = currentTime;

      updateSquares(gridParams.squares, deltaTime);
      draw();

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    // Initial render
    draw();
    if (!prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(renderLoop);
    }

    // Resize observer to update grid resolution
    const resizeObserver = new ResizeObserver(() => {
      setupCanvas();
      draw();
    });
    resizeObserver.observe(container);

    // Pause RAF when page is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        lastTime = performance.now();
        if (!prefersReducedMotion) {
          animationFrameId = requestAnimationFrame(renderLoop);
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [squareSize, gridGap, flickerChance, maxOpacity, memoizedColor, width, height, isInView, prefersReducedMotion]);

  // IntersectionObserver to pause when completely out of view
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full pointer-events-none ${className}`}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none block"
      />
    </div>
  );
}

export default FlickeringGrid;

