import React, { memo } from 'react';
import './CyberBackground.css';

/**
 * CyberBackground Component
 * 
 * Atmospheric ambient background engineered with:
 * - Fluid aurora gradients tuned to the site's obsidian (#07090e), cyan (#06b6d4), indigo (#3b82f6) & emerald (#10b981) palette
 * - High-tech shifting isometric crosshatch grid overlay
 * - Smooth breathing radial vignette
 * - 100% hardware-accelerated CSS animations with zero CPU overhead
 */
function CyberBackground({ className = '' }) {
  return (
    <div className={`cyber-bg-wrapper ${className}`} aria-hidden="true">
      <div className="cyber-bg-aurora" />
    </div>
  );
}

export default memo(CyberBackground);

