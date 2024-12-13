// components/AnimatedBackground/index.tsx - Fix the memo syntax
import React, { memo } from "react";
import { AnimatedGradient } from "./AnimatedGradient";
import { BokehEffect } from "./BokehEffect";

interface AnimatedBackgroundProps {
  progress: number;
}

const AnimatedBackground = memo(({ progress }: AnimatedBackgroundProps) => {
  return (
    <>
      <AnimatedGradient progress={progress} />
      <BokehEffect />
      <div className="fixed inset-0 pointer-events-none"></div>
    </>
  );
});

AnimatedBackground.displayName = "AnimatedBackground";

export { AnimatedBackground };
