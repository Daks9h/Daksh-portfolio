import React from 'react';
import styles from './CyberButton.module.css';

/**
 * CyberButton Component
 * Source: Uiverse.io by Navarog21
 * Encapsulated as a reusable React component for the portfolio.
 */
export default function CyberButton({
  children,
  onClick,
  href,
  className = '',
  type = 'button',
  style,
  ...props
}) {
  const content = (
    <>
      <span className={styles.btnText}>{children}</span>
      <div id="clip" className={styles.clip}>
        <div id="leftTop" className={`${styles.corner} ${styles.leftTop}`} />
        <div id="rightBottom" className={`${styles.corner} ${styles.rightBottom}`} />
        <div id="rightTop" className={`${styles.corner} ${styles.rightTop}`} />
        <div id="leftBottom" className={`${styles.corner} ${styles.leftBottom}`} />
      </div>
      <span id="rightArrow" className={`${styles.arrow} ${styles.rightArrow}`} />
      <span id="leftArrow" className={`${styles.arrow} ${styles.leftArrow}`} />
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`${styles.uiverseBtn} ${className}`}
        style={style}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.uiverseBtn} ${className}`}
      style={style}
      {...props}
    >
      {content}
    </button>
  );
}

