import * as React from "react";
import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
};

export function Button({ className, variant = "default", size = "default", ...props }: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--platinum)] disabled:pointer-events-none disabled:opacity-50",
        variant === "default" && "bg-[var(--navy)] text-white hover:bg-[color-mix(in_srgb,var(--navy)_88%,white)]",
        variant === "outline" &&
          "border border-[var(--line)] bg-white text-[var(--ink)] hover:border-[var(--navy)]",
        variant === "ghost" && "text-neutral-700 hover:bg-[var(--navy-soft)]",
        size === "default" && "h-11 px-5 text-sm",
        size === "sm" && "h-9 px-4 text-sm",
        size === "lg" && "h-13 px-7 text-base",
        className,
      )}
      {...props}
    />
  );
}
