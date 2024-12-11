import { useEffect, useRef } from "react";

export const useHorizontalScroll = () => {
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
      // Added cleanup for smooth scroll behavior
      scrollContainer.style.scrollBehavior = "auto";
      scrollContainer.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return scrollRef;
};
