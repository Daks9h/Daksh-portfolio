import React from 'react';

/**
 * Uiverse Cyber Grid Button
 * Features:
 * - Radial gradient backdrop with cyber grid pattern
 * - Top & bottom radial-gradient border image
 * - Hover grid density compression (15px -> 10px)
 * - Active hue-rotation (250deg)
 * - Polymorphic support (renders as <a> or <button>)
 * - Preserves original text, icons, and functionality
 */
export default function UiVerseButton({
  children,
  href,
  onClick,
  type = 'button',
  variant = 'emerald', // 'emerald' (default uiverse) | 'cyan'
  size = 'md', // 'sm' | 'md' | 'lg'
  isActive = false,
  disabled = false,
  className = '',
  target,
  rel,
  ...props
}) {
  const sizeClasses = {
    lg: 'uiverse-btn-lg',
    md: 'uiverse-btn-md',
    sm: 'uiverse-btn-sm',
  };

  const variantClasses = {
    emerald: '',
    cyan: 'uiverse-button--cyan',
  };

  const activeClass = isActive ? 'is-active' : '';
  const combinedClass = `uiverse-button ${sizeClasses[size] || 'uiverse-btn-md'} ${variantClasses[variant] || ''} ${activeClass} ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        className={combinedClass}
        onClick={onClick}
        target={target}
        rel={rel}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={combinedClass}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export { UiVerseButton as Button };

