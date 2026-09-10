"use client";

import { useEffect, useRef, type ReactNode, type ElementType } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** When true, also applies stagger-in to children */
  stagger?: boolean;
  id?: string;
};

export function Reveal({ children, className, as: Tag = "div", stagger = false, id }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      el.classList.add("reveal-in");
      if (stagger) el.classList.add("stagger-in");
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        el.classList.add("reveal-in");
        if (stagger) el.classList.add("stagger-in");
        io.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -12% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [stagger]);

  return (
    <Tag ref={ref as never} id={id} className={cn(stagger ? "stagger" : "reveal", className)}>
      {children}
    </Tag>
  );
}

export function Stagger({ children, className, as: Tag = "div" }: Omit<RevealProps, "stagger">) {
  return (
    <Reveal as={Tag} stagger className={className}>
      {children}
    </Reveal>
  );
}
