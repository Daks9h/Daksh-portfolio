import React, { useEffect, useRef, useState, useMemo } from 'react';

const DEFAULT_CHARACTER_SET = Object.freeze(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("")
);

const getRandomInt = (max) => Math.floor(Math.random() * max);

/**
 * HyperText component from Magic UI
 * Scrambles and decrypts characters into the target text on scroll-into-view and hover.
 */
export function HyperText({
  children,
  className = "",
  style = {},
  duration = 800,
  delay = 0,
  as: Component = "div",
  startOnView = true,
  animateOnHover = true,
  characterSet = DEFAULT_CHARACTER_SET,
  ...props
}) {
  const textContent = typeof children === "string" ? children : String(children || "");
  const [displayText, setDisplayText] = useState(() => textContent.split(""));
  const [isAnimating, setIsAnimating] = useState(false);
  const iterationRef = useRef(0);
  const elementRef = useRef(null);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const handleAnimationTrigger = () => {
    if (isAnimating || prefersReducedMotion || !textContent) return;
    setIsAnimating(true);
    iterationRef.current = 0;

    const intervalDuration = Math.max(duration / Math.max(textContent.length, 1), 30);
    const interval = setInterval(() => {
      iterationRef.current++;
      if (iterationRef.current <= textContent.length) {
        setDisplayText(() =>
          textContent.split("").map((char, i) => {
            if (char === " " || char === "&" || char === "/" || char === ":" || char === "." || char === "[" || char === "]") {
              return char;
            }
            return i < iterationRef.current
              ? textContent[i]
              : characterSet[getRandomInt(characterSet.length)];
          })
        );
      } else {
        clearInterval(interval);
        setDisplayText(textContent.split(""));
        setIsAnimating(false);
      }
    }, intervalDuration);
  };

  // Handle delay on mount if not startOnView
  useEffect(() => {
    if (!startOnView) {
      const timer = setTimeout(() => {
        handleAnimationTrigger();
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [delay, startOnView]);

  // Handle startOnView with IntersectionObserver
  useEffect(() => {
    if (!startOnView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handleAnimationTrigger();
        }
      },
      { threshold: 0.15 }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [startOnView, textContent, duration]);

  // Keep displayText in sync if children text changes
  useEffect(() => {
    setDisplayText(textContent.split(""));
  }, [textContent]);

  const ComponentTag = Component || 'div';

  return (
    <ComponentTag
      ref={elementRef}
      className={className}
      style={style}
      onMouseEnter={animateOnHover ? handleAnimationTrigger : undefined}
      {...props}
    >
      <span className="sr-only">{textContent}</span>
      <span aria-hidden="true">
        {displayText.map((letter, index) => (
          <span key={index}>
            {letter}
          </span>
        ))}
      </span>
    </ComponentTag>
  );
}

export default HyperText;
