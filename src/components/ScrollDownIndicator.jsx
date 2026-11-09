import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Centered glowing scroll-down indicator for all pages.
 * Displays only when there is scrollable content below the fold,
 * smoothly fades out when the user scrolls down, and has zero text.
 */
export default function ScrollDownIndicator({ activePage }) {
  const [canScroll, setCanScroll] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Check if current page has scrollable content below viewport
  useEffect(() => {
    const checkScrollable = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const hasOverflow = scrollHeight > clientHeight + 60;
      setCanScroll(hasOverflow);
      setIsVisible(window.scrollY < 40 && hasOverflow);
    };

    // Check immediately and after content renders
    checkScrollable();
    const timer = setTimeout(checkScrollable, 250);

    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkScrollable, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScrollable);
    };
  }, [activePage]);

  const handleScrollDown = () => {
    window.scrollBy({
      top: Math.min(window.innerHeight * 0.75, 650),
      behavior: 'smooth',
    });
  };

  if (!canScroll) return null;

  return (
    <div
      className={`fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <button
        type="button"
        onClick={handleScrollDown}
        aria-label="Scroll down"
        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-[#0d111a]/85 backdrop-blur-md border border-cyan-500/40 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.45)] hover:border-cyan-300 hover:shadow-[0_0_28px_rgba(6,182,212,0.7)] hover:text-cyan-200 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none cursor-pointer group"
      >
        <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce motion-reduce:animate-none drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
      </button>
    </div>
  );
}

