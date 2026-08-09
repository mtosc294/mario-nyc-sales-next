"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { languageOptions, type AppLocale } from "@/lib/languages";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const t = useTranslations("Language");
  const locale = useLocale() as AppLocale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const current = languageOptions.find((item) => item.code === locale) ?? languageOptions[0];

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    function onPointer(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, []);

  function selectLocale(next: AppLocale) {
    setOpen(false);
    router.replace(pathname, { locale: next });
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className="inline-flex size-10 items-center justify-center gap-1 rounded-sm border border-[var(--platinum)]/45 text-sm transition hover:border-white hover:bg-white/5 sm:w-auto sm:px-2.5 sm:py-2"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t("label")}
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden className="text-base leading-none">
          {current.flag}
        </span>
        <ChevronDown className={cn("hidden size-3.5 opacity-70 transition sm:block", open && "rotate-180")} />
      </button>
      {open ? (
        <div
          className="absolute right-0 top-full z-[60] mt-2 w-[min(280px,calc(100vw-24px))] border border-[var(--line)] bg-white text-[var(--ink)] shadow-[0_18px_40px_rgba(16,27,45,0.14)] max-[380px]:right-auto max-[380px]:left-0"
          role="listbox"
          aria-label={t("label")}
        >
          <div className="grid grid-cols-2">
            {languageOptions.map((option) => {
              const active = option.code === locale;
              return (
                <button
                  key={option.code}
                  type="button"
                  role="option"
                  aria-selected={active}
                  className={cn(
                    "flex items-center gap-2 border-b border-[var(--line)] px-4 py-3 text-left text-sm font-medium transition last:border-b-0",
                    active ? "bg-[var(--navy)] text-white" : "hover:bg-[var(--navy-soft)]",
                  )}
                  onClick={() => selectLocale(option.code)}
                >
                  <span aria-hidden>{option.flag}</span>
                  <span>{t(option.labelKey)}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
