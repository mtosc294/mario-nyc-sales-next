"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  label: string;
};

export function StickyConsultCta({ href, label }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onScroll = () => {
      const threshold = Math.max(280, window.innerHeight * 0.4);
      setVisible(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    if (reduce.matches) setVisible(true);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Link
      href={href}
      className={cn(
        "sticky-cta fixed bottom-5 left-1/2 z-40 inline-flex items-center gap-2 rounded-full bg-[var(--navy)] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(16,27,45,0.35)]",
        visible && "sticky-cta-in",
      )}
    >
      {label}
      <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs text-[var(--platinum)]">
        Consult <ArrowRight className="size-3.5" />
      </span>
    </Link>
  );
}
