"use client";

import { useEffect, useState } from "react";

/** Flip-only scroll past threshold (avoids setState every frame). */
export function useScrollPast(thresholdPx: number) {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > thresholdPx;
      setPast((prev) => (prev === next ? prev : next));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [thresholdPx]);

  return past;
}
