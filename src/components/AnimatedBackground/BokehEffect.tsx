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

const generateBokehElements = (count: number): BokehElement[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 12 + 4,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 7}s`,
    duration: `${Math.random() * 10 + 15}s`,
    scale: Math.random() * 0.5 + 0.5,
  }));
};

export const BokehEffect: React.FC<BokehProps> = ({ count = 30 }) => {
  // Memoize the bokeh elements so they persist across re-renders
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
