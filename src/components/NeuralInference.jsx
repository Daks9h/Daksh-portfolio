import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RefreshCw, AlertTriangle, CheckCircle2, Terminal, Trash2, Zap } from 'lucide-react';
import { preprocessCanvas } from '../utils/mnistPreprocess';
import { runDigitInference, getInferenceSession } from '../utils/mnistInference';

const LOGICAL_SIZE = 320;

const DIGIT_PATHS = [
  // 0: Full counterclockwise loop
  "M 50,20 C 30,20 25,35 25,50 C 25,65 30,80 50,80 C 70,80 75,65 75,50 C 75,35 70,20 50,20 Z",
  // 1: Top hook and vertical stem
  "M 36,32 L 50,20 L 50,80",
  // 2: Upper arc, diagonal slant, bottom base
  "M 30,34 C 30,18 70,18 70,36 C 70,52 30,68 28,80 L 72,80",
  // 3: Double rightward loop
  "M 30,22 L 70,22 L 48,46 C 68,44 74,56 74,66 C 74,78 62,80 48,80 C 34,80 26,72 26,72",
  // 4: Diagonal cross and vertical post
  "M 64,18 L 26,60 L 76,60 M 64,18 L 64,80",
  // 5: Top bar, stem, lower loop
  "M 70,22 L 34,22 L 32,46 C 36,44 44,44 54,44 C 68,44 72,56 72,66 C 72,78 62,80 46,80 C 32,80 26,72 26,72",
  // 6: Smooth arc into bottom loop
  "M 64,22 C 40,24 28,42 28,60 C 28,74 38,80 50,80 C 64,80 72,70 72,58 C 72,46 64,40 50,40 C 38,40 28,50 28,60",
  // 7: Top horizontal bar and diagonal descent
  "M 26,22 L 74,22 L 44,80",
  // 8: Continuous figure-eight loop
  "M 50,48 C 36,48 30,38 30,30 C 30,20 40,18 50,18 C 60,18 70,20 70,30 C 70,38 64,48 50,48 C 34,48 26,58 26,68 C 26,78 38,80 50,80 C 62,80 74,76 74,68 C 74,58 66,48 50,48 Z",
  // 9: Upper circle loop and stem descent
  "M 72,42 C 72,28 62,20 50,20 C 36,20 28,28 28,42 C 28,54 36,58 50,58 C 64,58 72,50 72,42 M 72,40 L 72,64 C 72,76 60,80 44,80",
];

export default function NeuralInference() {
  const cardRef = useRef(null);
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const hasCompletedStrokeRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const scanlineTimerRef = useRef(null);
  const guideTimerRef = useRef(null);

  // Model & State Management
  const [modelState, setModelState] = useState('IDLE'); // 'IDLE' | 'LOADING_MODEL' | 'READY' | 'ERROR'
  const modelStateRef = useRef(modelState);
  useEffect(() => {
    modelStateRef.current = modelState;
  }, [modelState]);

  const [errorMessage, setErrorMessage] = useState('');
  const [hasDrawn, setHasDrawn] = useState(false);
  const [guideDigit, setGuideDigit] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [probabilities, setProbabilities] = useState(new Array(10).fill(0));
  const [prediction, setPrediction] = useState(null); // { topDigit, topConfidence, latencyMs }
  const [announcement, setAnnouncement] = useState('');

  // Guide Number Animation: Reliably cycles through all digits 0 to 9 while canvas is empty
  useEffect(() => {
    if (hasDrawn) return;

    const intervalId = setInterval(() => {
      setGuideDigit((prev) => (prev + 1) % 10);
    }, 1250);

    return () => {
      clearInterval(intervalId);
    };
  }, [hasDrawn]);

  // Canvas Reset Helper (pure black)
  const clearCanvasPixels = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }, []);

  // Initialize Canvas Context with DPR scaling
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(LOGICAL_SIZE * dpr);
    canvas.height = Math.round(LOGICAL_SIZE * dpr);

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    ctx.scale(dpr, dpr);
    clearCanvasPixels();
  }, [clearCanvasPixels]);

  // Initialize ONNX Model Lazy Loader (stable reference)
  const initModel = useCallback(async () => {
    if (modelStateRef.current === 'LOADING_MODEL' || modelStateRef.current === 'READY') return;

    setModelState('LOADING_MODEL');
    setErrorMessage('');
    try {
      await getInferenceSession();
      setModelState('READY');
    } catch (err) {
      console.error('Failed to load ONNX model:', err);
      setErrorMessage(err.message || 'WASM runtime initialization failed');
      setModelState('ERROR');
    }
  }, []);

  // Viewport Intersection Observer for Lazy Loading (runs once on mount)
  useEffect(() => {
    setupCanvas();

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          initModel();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
      if (scanlineTimerRef.current) clearTimeout(scanlineTimerRef.current);
    };
  }, [setupCanvas, initModel]);

  // Coordinate normalizer for touch / mouse / stylus
  const getCoords = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (LOGICAL_SIZE / rect.width);
    const y = (e.clientY - rect.top) * (LOGICAL_SIZE / rect.height);
    return { x, y };
  };

  // Run Inference on Stroke End
  const handleRunInference = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const float32Data = preprocessCanvas(canvas);
    if (!float32Data) {
      // Nothing drawn on canvas, skip inference
      return;
    }

    // Trigger single scanline sweep
    setIsScanning(true);
    if (scanlineTimerRef.current) clearTimeout(scanlineTimerRef.current);
    scanlineTimerRef.current = setTimeout(() => setIsScanning(false), 650);

    try {
      if (modelState !== 'READY') {
        setModelState('LOADING_MODEL');
      }

      const result = await runDigitInference(float32Data);
      setModelState('READY');
      setProbabilities(result.probabilities);
      setPrediction({
        topDigit: result.topDigit,
        topConfidence: result.topConfidence,
        latencyMs: result.latencyMs,
      });

      const confPct = Math.round(result.topConfidence * 100);
      if (result.topConfidence < 0.5) {
        setAnnouncement(`Low confidence prediction: digit ${result.topDigit} at ${confPct} percent`);
      } else {
        setAnnouncement(`Predicted ${result.topDigit} with ${confPct} percent confidence in ${result.latencyMs} milliseconds`);
      }
    } catch (err) {
      console.error('Inference error:', err);
      setErrorMessage(err.message || 'Inference execution failed');
      setModelState('ERROR');
    }
  };

  // Pointer Event Handlers: Enforces single-stroke analysis and auto-clears on new stroke
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onPointerDown = (e) => {
      e.preventDefault();
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch (_) {}

      // SINGLE STROKE ANALYSIS:
      // Clear the board before starting any new drawing after a completed stroke
      if (hasCompletedStrokeRef.current) {
        clearCanvasPixels();
        hasCompletedStrokeRef.current = false;
        setProbabilities(new Array(10).fill(0));
        setPrediction(null);
      }

      isDrawingRef.current = true;
      setHasDrawn(true);

      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      const { x, y } = getCoords(e);
      lastPosRef.current = { x, y };

      ctx.lineWidth = 18;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#ffffff';

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y);
      ctx.stroke();
    };

    const onPointerMove = (e) => {
      if (!isDrawingRef.current) return;
      e.preventDefault();

      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      const { x, y } = getCoords(e);

      ctx.lineWidth = 18;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#ffffff';

      ctx.beginPath();
      ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();

      lastPosRef.current = { x, y };
    };

    const onPointerUp = (e) => {
      if (!isDrawingRef.current) return;
      isDrawingRef.current = false;
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch (_) {}

      hasCompletedStrokeRef.current = true;
      handleRunInference();
    };

    const onPointerCancel = (e) => {
      if (!isDrawingRef.current) return;
      isDrawingRef.current = false;
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch (_) {}
    };

    canvas.addEventListener('pointerdown', onPointerDown, { passive: false });
    canvas.addEventListener('pointermove', onPointerMove, { passive: false });
    canvas.addEventListener('pointerup', onPointerUp, { passive: false });
    canvas.addEventListener('pointercancel', onPointerCancel, { passive: false });

    return () => {
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerCancel);
    };
  }, [clearCanvasPixels, modelState]);

  // Manual Clear Canvas Action
  const handleClear = () => {
    clearCanvasPixels();
    hasCompletedStrokeRef.current = false;
    setHasDrawn(false);
    setProbabilities(new Array(10).fill(0));
    setPrediction(null);
    setAnnouncement('Canvas cleared. Ready for new input.');
  };

  return (
    <section aria-label="Interactive Neural Digit Recognition Demo" className="w-full">
      <div
        ref={cardRef}
        className="cyber-card p-6 sm:p-8 lg:p-10 rounded-2xl border border-white/[0.1] relative group w-full overflow-hidden shadow-2xl bg-[#090d16]/95 backdrop-blur-xl"
      >
        {/* Techno Corner Brackets */}
        <span className="techno-corner-tl" aria-hidden="true" />
        <span className="techno-corner-tr" aria-hidden="true" />
        <span className="techno-corner-bl" aria-hidden="true" />
        <span className="techno-corner-br" aria-hidden="true" />

        {/* Screen reader live announcement */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {announcement}
        </div>

        {/* Single Sweep Scanline (Triggered on inference) */}
        {isScanning && (
          <div
            className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_16px_rgba(56,189,248,0.95)] pointer-events-none animate-scanline-sweep motion-reduce:hidden z-30"
            aria-hidden="true"
          />
        )}

        {/* Top Header Console Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2.5 text-cyan-400 font-mono text-sm sm:text-base font-bold tracking-wider">
            <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
            <span>&gt;_ NEURAL_INFERENCE</span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-cyan-300 px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 font-medium">
              ACC: ~99%
            </span>
          </div>
        </div>

        {/* Main Grid: Prominent Large Square Drawer on Left, Results HUD on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center lg:items-stretch w-full">
          
          {/* Left Column: Large Square Drawing Viewport & Action Bar */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start justify-between gap-5 w-full">
            
            {/* Large Square Drawing Canvas Container */}
            <div className="cyber-card relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[400px] aspect-square overflow-hidden bg-[#020408] shadow-[0_0_35px_rgba(6,182,212,0.18)] transition-all duration-300 mx-auto lg:mx-0">
              <canvas
                ref={canvasRef}
                role="img"
                aria-label="Interactive digit drawing canvas. Draw any single digit from 0 to 9 in a single stroke."
                className="w-full h-full block touch-none cursor-crosshair relative z-10"
                style={{ touchAction: 'none' }}
              />

              {/* Cycling Numbers Guide Animation (0-9) when canvas is empty */}
              {!hasDrawn && (
                <div
                  className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-center p-6 z-20 transition-opacity duration-300"
                  aria-hidden="true"
                >
                  {/* Subtle Blueprint Matrix Grid */}
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(6,182,212,0.1)_1.5px,transparent_1.5px)] [background-size:20px_20px] pointer-events-none" />

                  {/* Animated Self-Drawing Stroke Guide */}
                  <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
                    <svg
                      key={guideDigit}
                      viewBox="0 0 100 100"
                      className="w-full h-full filter drop-shadow-[0_0_16px_rgba(34,211,238,0.7)]"
                    >
                      {/* Only front self-drawing stroke animation */}
                      <path
                        pathLength="100"
                        d={DIGIT_PATHS[guideDigit]}
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="animate-digit-stroke"
                      />
                    </svg>
                  </div>

                  {/* Cycling Instruction Badge */}
                  <div className="mt-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider text-cyan-200 bg-cyan-950/80 border border-cyan-500/50 shadow-lg shadow-cyan-950/50 flex items-center justify-center">
                    <span>DRAW DIGIT [{guideDigit}]</span>
                  </div>
                </div>
              )}
            </div>

            {/* Action Bar Below Canvas */}
            <div className="flex items-center gap-3 w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[400px] mx-auto lg:mx-0">
              <button
                type="button"
                onClick={handleClear}
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] hover:border-cyan-400 text-xs sm:text-sm font-mono font-semibold text-slate-200 hover:text-cyan-300 transition-all flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none shadow-md"
              >
                <Trash2 className="w-4 h-4" />
                <span>CLEAR BOARD</span>
              </button>

              {modelState === 'IDLE' && (
                <button
                  type="button"
                  onClick={initModel}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-xs sm:text-sm font-mono font-semibold text-cyan-300 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none flex items-center justify-center gap-1.5"
                >
                  <Zap className="w-4 h-4" />
                  <span>INIT</span>
                </button>
              )}

              {modelState === 'LOADING_MODEL' && (
                <div className="px-5 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.08] text-xs sm:text-sm font-mono text-cyan-400 flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>INITIALIZING...</span>
                </div>
              )}

              {modelState === 'ERROR' && (
                <button
                  type="button"
                  onClick={initModel}
                  className="px-5 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/40 text-xs sm:text-sm font-mono text-red-300 transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>RETRY</span>
                </button>
              )}
            </div>

          </div>

          {/* Right Column: High-Precision 10 Probability Bars HUD & Classification Readout */}
          <div className="lg:col-span-7 flex flex-col justify-between w-full h-full min-w-0 space-y-4">
            
            {/* Real-Time Prediction Summary Banner */}
            <div className="cyber-card p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-inner">
              {prediction ? (
                <div className="flex flex-wrap items-center gap-4">
                  {prediction.topConfidence < 0.5 ? (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-400/10 border border-amber-400/40 text-amber-300 font-mono text-xs sm:text-sm font-bold">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <span>LOW_CONFIDENCE (PRED: {prediction.topDigit})</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-400/50 text-cyan-200 font-mono text-base sm:text-lg font-black shadow-[0_0_16px_rgba(6,182,212,0.3)]">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                      <span>PREDICTED: {prediction.topDigit}</span>
                    </div>
                  )}

                  <div className="text-xs sm:text-sm font-mono text-slate-300">
                    CONFIDENCE: <strong className="text-white font-bold text-sm sm:text-base">{Math.round(prediction.topConfidence * 100)}%</strong>
                  </div>
                </div>
              ) : (
                <div className="text-xs sm:text-sm font-mono text-slate-400 flex items-center">
                  <span>Awaiting input • Draw any single digit on the board</span>
                </div>
              )}

              {prediction && (
                <div className="text-xs sm:text-sm font-mono text-slate-400 flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.03] border border-white/[0.06]">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span>LATENCY: <strong className="text-cyan-300 font-bold">{prediction.latencyMs}ms</strong></span>
                </div>
              )}
            </div>

            {/* Error Banner if Model Fails */}
            {modelState === 'ERROR' && (
              <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-xs sm:text-sm font-mono text-red-300 flex items-center justify-between gap-3">
                <span>{errorMessage || 'Failed to initialize WASM model.'}</span>
                <button
                  type="button"
                  onClick={initModel}
                  className="px-3 py-1.5 rounded bg-red-500/20 hover:bg-red-500/30 text-xs uppercase font-bold underline"
                >
                  Retry
                </button>
              </div>
            )}

            {/* 10 Probability Bars (0 - 9) */}
            <div className="p-4 sm:p-5 rounded-xl bg-black/40 border border-white/[0.08] flex flex-col justify-between gap-2 sm:gap-2.5 w-full flex-1">
              {probabilities.map((prob, digit) => {
                const isTop = prediction && prediction.topDigit === digit;
                const isHighConf = isTop && prediction.topConfidence >= 0.5;
                const isLowConf = isTop && prediction.topConfidence < 0.5;
                const pct = Math.round(prob * 100);

                return (
                  <div key={digit} className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-mono">
                    {/* Digit Tag */}
                    <span
                      className={`w-7 text-right font-black transition-colors ${
                        isHighConf
                          ? 'text-cyan-300 text-sm sm:text-base drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]'
                          : isLowConf
                          ? 'text-amber-400'
                          : 'text-slate-400'
                      }`}
                    >
                      [{digit}]
                    </span>

                    {/* Horizontal Bar Track */}
                    <div className="h-3.5 sm:h-4 bg-slate-900/90 rounded-md border border-white/[0.08] overflow-hidden flex-1 relative">
                      <div
                        className={`h-full transition-all duration-300 ease-out motion-reduce:transition-none ${
                          isHighConf
                            ? 'bg-gradient-to-r from-cyan-500 via-sky-400 to-cyan-300 shadow-[0_0_14px_rgba(56,189,248,0.9)]'
                            : isLowConf
                            ? 'bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.6)]'
                            : prob > 0.05
                            ? 'bg-cyan-700/50'
                            : 'bg-slate-800/40'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    {/* Percentage Readout */}
                    <span
                      className={`w-12 text-right font-mono transition-colors ${
                        isHighConf
                          ? 'text-cyan-300 font-extrabold text-xs sm:text-sm'
                          : isLowConf
                          ? 'text-amber-300 font-bold'
                          : 'text-slate-500 text-xs'
                      }`}
                    >
                      {pct}%
                    </span>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
