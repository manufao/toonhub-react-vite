import { useCallback, useEffect, useState } from "react";

export type Direction = "next" | "prev";

const ANIMATION_MS = 650;

export function useCarousel(count: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isAnimating) return;
    const timeout = window.setTimeout(() => setIsAnimating(false), ANIMATION_MS);
    return () => window.clearTimeout(timeout);
  }, [isAnimating, activeIndex]);

  const navigate = useCallback(
    (direction: Direction) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setActiveIndex((current) =>
        direction === "next"
          ? (current + 1) % count
          : (current + count - 1) % count,
      );
    },
    [isAnimating],
  );

  return { activeIndex, isAnimating, navigate };
}
