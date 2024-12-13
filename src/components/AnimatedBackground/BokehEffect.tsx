// components/AnimatedBackground/BokehEffect.tsx
import React, { useMemo } from "react";

interface BokehElement {
  id: number;
  size: number;
  left: string;
  top: string;
  animationDelay: string;
  duration: string;
  scale: number;
}

interface BokehProps {
  count?: number;
}

// Simple seeded random number generator
const seededRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

const generateBokehElements = (count: number): BokehElement[] => {
  return Array.from({ length: count }, (_, i) => {
    // Use index as seed for consistent values
    const seed = i;
    return {
      id: i,
      size: Math.floor(seededRandom(seed) * 12 + 4),
      left: `${Math.floor(seededRandom(seed + 1) * 100)}%`,
      top: `${Math.floor(seededRandom(seed + 2) * 100)}%`,
      animationDelay: `${Math.floor(seededRandom(seed + 3) * 7)}s`,
      duration: `${Math.floor(seededRandom(seed + 4) * 10 + 15)}s`,
      scale: Math.floor(seededRandom(seed + 5) * 50 + 50) / 100,
    };
  });
};

export const BokehEffect: React.FC<BokehProps> = ({ count = 30 }) => {
  // Memoize the bokeh elements with consistent values
  const bokehElements = useMemo(() => generateBokehElements(count), [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {bokehElements.map(
        ({ id, size, left, top, animationDelay, duration, scale }) => (
          <div
            key={id}
            className="absolute rounded-full bg-white/10 animate-float"
            style={
              {
                width: `${size}px`,
                height: `${size}px`,
                left,
                top,
                animationDelay,
                "--duration": duration,
                transform: `scale(${scale})`,
              } as React.CSSProperties
            }
          />
        ),
      )}
    </div>
  );
};
