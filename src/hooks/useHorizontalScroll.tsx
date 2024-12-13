// hooks/useHorizontalScroll.ts
import { useEffect, useRef, RefObject } from "react";

export const useHorizontalScroll = (): RefObject<HTMLDivElement | null> => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const scrollMultiplier = e.deltaMode === 0 ? 1.5 : 30;
      const scrollAmount = e.deltaY * scrollMultiplier;

      scrollContainer.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    };

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      scrollContainer.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return scrollRef;
};
