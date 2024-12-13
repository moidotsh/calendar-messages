// hooks/useScrollProgress.ts
import { useState, useEffect, RefObject } from "react";

export const useScrollProgress = (
  scrollRef: RefObject<HTMLDivElement | null>,
): number => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = element;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll <= 0) return;

      const currentProgress = Math.min(Math.max(scrollLeft / maxScroll, 0), 1);
      setProgress(currentProgress);
    };

    element.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => element.removeEventListener("scroll", handleScroll);
  }, [scrollRef]);

  return progress;
};
