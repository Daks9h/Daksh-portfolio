import React, { useState, useEffect, useRef } from 'react';
import CyberTruck from './CyberTruck';
import './CyberTruck.css';

/**
 * PageTransition Component
 * 
 * Hardware-synchronized page reveal driven by the SVG CyberTruck:
 * - The Cybertruck is ALWAYS in front of the reveal line.
 * - The page is revealed strictly behind the truck's rear bumper AFTER the truck crosses.
 * - The photon laser beam is mathematically locked to the truck's rear taillight blade.
 * - Zero secondary reloads, double renders, or visual flickering.
 */
export default function PageTransition({ pageKey, children }) {
  const isFirstMount = useRef(true);
  const prevKeyRef = useRef(pageKey);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [truckWidth, setTruckWidth] = useState(220);

  const pageContentRef = useRef(null);
  const truckRef = useRef(null);
  const laserRef = useRef(null);
  const rafIdRef = useRef(null);

  useEffect(() => {
    // Skip animation on initial page load
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    if (prevKeyRef.current !== pageKey) {
      prevKeyRef.current = pageKey;

      // Reset scroll position to top instantly
      window.scrollTo({ top: 0, behavior: 'instant' });

      // Check for user reduced motion preference
      const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
      if (prefersReducedMotion) {
        setIsTransitioning(false);
        if (pageContentRef.current) pageContentRef.current.style.clipPath = '';
        return;
      }

      // Viewport & Truck Geometry Measurements
      const W = window.innerWidth || document.documentElement.clientWidth || 390;
      const calculatedWidth = W < 640 ? 175 : 220;
      setTruckWidth(calculatedWidth);

      // In the CyberTruck SVG (viewBox 0 0 260 85):
      // Rear taillight is at x = 16px
      // Front bumper is at x = 242px
      const rearOffset = 16 * (calculatedWidth / 260);
      const frontOffset = 242 * (calculatedWidth / 260);

      // Start: Front bumper is just outside the screen left edge (-30px)
      const truckStartX = -frontOffset - 30;
      // End: Rear bumper has crossed the screen right edge (+50px)
      const truckEndX = W + 50 - rearOffset;
      const totalDistance = truckEndX - truckStartX;

      const duration = 1250; // 1.25s duration
      const startTime = performance.now();

      // Cubic-bezier ease-in-out curve for realistic vehicle acceleration & deceleration
      const easeInOutCubic = (t) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      // Initially clip page to 0% visible
      if (pageContentRef.current) {
        pageContentRef.current.style.clipPath = 'inset(0 100% 0 0)';
      }

      setIsTransitioning(true);

      const tick = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const eased = easeInOutCubic(progress);

        // Position of the truck's origin on screen
        const currentTruckX = truckStartX + eased * totalDistance;
        // Position of the truck's rear taillight blade on screen
        const currentRearX = currentTruckX + rearOffset;
        // The page is revealed strictly up to the rear bumper (never ahead of the truck)
        const revealX = Math.max(0, Math.min(W, currentRearX));

        // 1. Move Cybertruck on GPU composite layer
        if (truckRef.current) {
          truckRef.current.style.transform = `translate3d(${currentTruckX}px, 0, 0)`;
        }

        // 2. Position vertical laser beam locked directly at the rear bumper
        if (laserRef.current) {
          if (revealX > 0 && revealX < W) {
            laserRef.current.style.display = 'block';
            laserRef.current.style.transform = `translate3d(${revealX}px, 0, 0)`;
            laserRef.current.style.opacity = '1';
          } else {
            laserRef.current.style.display = 'none';
          }
        }

        // 3. Unveil the incoming page strictly BEHIND the rear bumper
        if (pageContentRef.current) {
          pageContentRef.current.style.clipPath = `inset(0 calc(100% - ${revealX}px) 0 0)`;
        }

        if (progress < 1) {
          rafIdRef.current = requestAnimationFrame(tick);
        } else {
          // Animation Complete: Remove clip-path cleanly with ZERO second reload
          if (pageContentRef.current) {
            pageContentRef.current.style.clipPath = '';
          }
          setIsTransitioning(false);
        }
      };

      rafIdRef.current = requestAnimationFrame(tick);

      return () => {
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        if (pageContentRef.current) pageContentRef.current.style.clipPath = '';
      };
    }
  }, [pageKey]);

  return (
    <div className="w-full relative min-h-[calc(100vh-180px)] flex flex-col justify-between">
      {/* 
        Page Content:
        - During transition: dynamically unmasked by clipPath in lockstep with the truck's rear bumper.
        - After transition: clipPath is cleared, page stays permanently displayed with zero flicker or second reload.
      */}
      <div
        ref={pageContentRef}
        className="w-full flex-1 will-change-[clip-path]"
      >
        {children}
      </div>

      {/* Drive-By Transition Elements (only active during navigation) */}
      {isTransitioning && (
        <div
          className="fixed inset-0 pointer-events-none z-[60] overflow-hidden"
          aria-hidden="true"
        >
          {/* Vertical Cyan Photon Laser Sweep Line (locked to truck rear taillight) */}
          <div
            ref={laserRef}
            className="absolute top-0 bottom-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_18px_rgba(34,211,238,0.95)] truck-laser-line"
            style={{ display: 'none' }}
          />

          {/* Glowing Neon Cyan Road Beam along bottom */}
          <div className="fixed bottom-3 sm:bottom-5 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_14px_rgba(34,211,238,0.85)] truck-road-track" />

          {/* High-Performance Vector CyberTruck Racing Across Screen */}
          <div
            ref={truckRef}
            className="fixed bottom-3 sm:bottom-5 left-0 will-change-transform"
          >
            <CyberTruck width={truckWidth} />
          </div>
        </div>
      )}
    </div>
  );
}
