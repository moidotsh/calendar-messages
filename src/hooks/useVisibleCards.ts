// hooks/useVisibleCards.ts
import { useState, useEffect, RefObject } from "react";

export const useVisibleCards = (
  scrollRef: RefObject<HTMLDivElement | null>,
) => {
  const [firstVisible, setFirstVisible] = useState(0);
  const [lastVisible, setLastVisible] = useState(0);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const updateVisibility = () => {
      const cards = element.querySelectorAll(".calendar-card");
      const containerRect = element.getBoundingClientRect();

      let firstFound = false;
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const isVisible =
          rect.left < containerRect.right && rect.right > containerRect.left;

        if (isVisible && !firstFound) {
          setFirstVisible(index);
          firstFound = true;
        }
        if (isVisible) {
          setLastVisible(index);
        }
      });
    };

    const handleScroll = () => {
      requestAnimationFrame(updateVisibility);
    };

    element.addEventListener("scroll", handleScroll, { passive: true });
    updateVisibility();

    return () => element.removeEventListener("scroll", handleScroll);
  }, [scrollRef]);

  return { firstVisible, lastVisible };
};
