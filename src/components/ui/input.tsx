import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-12 w-full rounded-xl border border-[var(--line)] bg-white px-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-[var(--navy)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--platinum)_55%,transparent)]",
        className,
      )}
      {...props}
    />
  );
}
