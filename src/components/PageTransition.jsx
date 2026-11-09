import React from 'react';

/**
 * PageTransition wrapper
 * Modular container for page transitions.
 * Prepared for plug-and-play integration of the UIverse car drive-by transition.
 */
export default function PageTransition({ pageKey, children }) {
  return (
    <div
      key={pageKey}
      className="w-full animate-page-enter relative min-h-[calc(100vh-180px)] flex flex-col justify-between"
    >
      {/* Extension slot: UIverse Car Drive-by transition will mount here */}
      <div className="w-full flex-1">
        {children}
      </div>
    </div>
  );
}

