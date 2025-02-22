import React from 'react';
import  { SVGProps } from 'react';

export function FluentEmojiBucket({ height, ...props }) {
  // Clamp height between 0 and 100
  const fillHeight = Math.max(0, Math.min(100, height));

  return (
    <div className="w-full max-w-[400px] mx-auto">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-full h-auto"
        {...props}
      >
        {/* Bucket Outline */}
        <path
          d="M4 10 C5 5, 27 5, 28 10 L28 25 C27 28, 5 28, 4 25 Z"
          fill="none"
          stroke="black"
          strokeWidth="0.5"
        />

        {/* Blue Water Fill */}
        <rect
          x="4"
          y={`${30 - (fillHeight / 100) * 20}`} // Adjust fill position
          width="24"
          height={`${(fillHeight / 100) * 20}`} // Dynamic height
          fill="blue"
        />

        {/* White Empty Area */}
        <rect
          x="4"
          y="10"
          width="24"
          height={`${20 - (fillHeight / 100) * 20}`} // Remaining height
          fill="white"
        />
      </svg>
    </div>
  );
}

// Usage Example
// <FluentEmojiBucket height={60} />
