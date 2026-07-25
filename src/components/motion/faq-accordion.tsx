"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type FaqItem = { q: string; a: string };

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="grid gap-3">
      {items.map((faq, index) => {
        const isOpen = open === index;
        return (
          <div
            key={faq.q}
            className="overflow-hidden rounded-2xl border border-[var(--line)] bg-white"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              onClick={() => setOpen(isOpen ? null : index)}
            >
              <span className="text-lg font-semibold text-[var(--ink)]">{faq.q}</span>
              <ChevronDown
                className={cn(
                  "size-5 shrink-0 text-[var(--platinum)] transition-transform duration-300 ease-[var(--ease-out)]",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out)]",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 leading-7 text-neutral-600">{faq.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
