import React from 'react';

/**
 * Uiverse Laser Glow Border Beam Button
 * - 4 boundary beam edges (left, right, top, bottom)
 * - Intense laser glow flare on hover via SVG feColorMatrix
 * - Supports polymorphic <a> or <button>
 */
export default function LaserButton({
  children,
  href,
  onClick,
  type = 'button',
  variant = 'cyan', // 'cyan' | 'white' | 'emerald'
  size = 'md', // 'sm' | 'md' | 'lg'
  isActive = false,
  disabled = false,
  className = '',
  target,
  rel,
  download,
  ...props
}) {
  const sizeClasses = {
    lg: 'laser-button-lg',
    md: 'laser-button-md',
    sm: 'laser-button-sm',
  };

  const variantClasses = {
    white: 'laser-button--white',
    cyan: 'laser-button--cyan',
    emerald: 'laser-button--emerald',
  };

  const activeClass = isActive ? 'is-active' : '';
  const combinedClass = `laser-button ${sizeClasses[size] || 'laser-button-md'} ${variantClasses[variant] || 'laser-button--cyan'} ${activeClass} ${className}`.trim();

  const content = (
    <>
      <div className="a l" aria-hidden="true" />
      <div className="a r" aria-hidden="true" />
      <div className="a t" aria-hidden="true" />
      <div className="a b" aria-hidden="true" />
      <div className="text">{children}</div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={combinedClass}
        onClick={onClick}
        target={target}
        rel={rel}
        download={download}
        {...props}
      >
        {content}
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
      {content}
    </button>
  );
}

export { LaserButton as Button };

