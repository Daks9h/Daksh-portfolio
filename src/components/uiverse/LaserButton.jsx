import React from 'react';
import styles from './LaserButton.module.css';

/**
 * LaserButton Component (Uiverse.io)
 * Synced with Daksh Lalwani Portfolio's Obsidian/Cyan Theme.
 * Supports both button actions and anchor link navigation.
 */
export default function LaserButton({
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
      <div className={`${styles.a} ${styles.l}`} />
      <div className={`${styles.a} ${styles.r}`} />
      <div className={`${styles.a} ${styles.t}`} />
      <div className={`${styles.a} ${styles.b}`} />
      <div className={styles.text}>{children}</div>
    </>
  );

  return (
    <div className={`${styles.wrapper} ${className}`} style={style}>
      {/* SVG Alpha Multiplication Filter for the Laser Glow Beam */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }} aria-hidden="true">
        <filter width="3000%" x="-1000%" height="3000%" y="-1000%" id="unopaq">
          <feColorMatrix
            values="1 0 0 0 0 
                    0 1 0 0 0 
                    0 0 1 0 0 
                    0 0 0 3 0"
          />
        </filter>
      </svg>

      {href ? (
        <a href={href} className={styles.button} {...props}>
          {content}
        </a>
      ) : (
        <button type={type} onClick={onClick} className={styles.button} {...props}>
          {content}
        </button>
      )}

      <div className={styles.backdrop} aria-hidden="true" />
    </div>
  );
}

