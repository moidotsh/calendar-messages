// AnimatedGradient.tsx
import React from "react";
import { GRADIENT_PRESETS } from "./constants";

interface AnimatedGradientProps {
  progress: number;
}

export const AnimatedGradient: React.FC<AnimatedGradientProps> = ({
  progress,
}) => {
  const getGradientClasses = (progress: number) => {
    const index = Math.floor(progress * (GRADIENT_PRESETS.length - 1));
    // Remove unused nextIndex calculation
    return `${GRADIENT_PRESETS[index].from} ${GRADIENT_PRESETS[index].via} ${GRADIENT_PRESETS[index].to}`;
  };

  return (
    <div
      className={`fixed inset-0 bg-gradient-to-r transition-colors duration-1000 ease-in-out ${getGradientClasses(
        progress,
      )}`}
    />
  );
};
