import React from 'react';
import styles from './RainPattern.module.css';

/**
 * RainPattern Background Component (From Uiverse.io)
 * Synced with Daksh Lalwani Obsidian/Cyan Portfolio Theme.
 * Positioned fixed across the entire viewport behind all content.
 * Guaranteed pointer-events: none so it never interferes with any clicks or interactions.
 */
export default function RainPattern() {
  return (
    <div className={styles.wrapper} aria-hidden="true">
      <div className={styles.rainContainer} />
    </div>
  );
}

