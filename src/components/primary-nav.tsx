"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";
import { primaryNav, type NavItem } from "@/lib/nav-config";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

function DropdownPanel({
  item,
  onNavigate,
  t,
}: {
  item: NavItem;
  onNavigate: () => void;
  t: ReturnType<typeof useTranslations<"Nav">>;
}) {
  const multi = item.columns.length > 1;
  return (
    <div
      className={cn(
        "absolute left-0 top-full z-50 mt-0 border border-[var(--line)] bg-white text-ink shadow-[0_18px_40px_rgba(16,27,45,0.14)]",
        multi ? "min-w-[480px]" : "min-w-[280px]",
      )}
      role="menu"
      aria-label={`${t(item.labelKey)} menu`}
    >
      <div className={cn(multi && "grid grid-cols-2")}>
        {item.columns.map((column, colIndex) => (
          <ul key={colIndex} className="m-0 list-none p-0">
            {column.links.map((link) => (
              <li key={link.href + link.labelKey} className="border-b border-[var(--line)] last:border-b-0">
                <Link
                  href={link.href}
                  role="menuitem"
                  className="block px-5 py-3.5 text-sm font-medium transition hover:bg-[var(--navy-soft)]"
                  onClick={onNavigate}
                >
                  {t(link.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function PrimaryNav() {
  const t = useTranslations("Nav");
  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const menuId = useId();

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenId(null);
        setMobileOpen(false);
      }
    }
    function onPointer(event: MouseEvent) {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpenId(null);
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function closeAll() {
    setOpenId(null);
    setMobileOpen(false);
    setMobileExpanded(null);
  }

  return (
    <>
      <nav ref={navRef} className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
        {primaryNav.map((item) => {
          const isOpen = openId === item.id;
          const label = t(item.labelKey);
          return (
            <div
              key={item.id}
              className="relative"
              onMouseEnter={() => setOpenId(item.id)}
              onMouseLeave={() => setOpenId(null)}
            >
              <Link
                href={item.href}
                className={cn(
                  "inline-flex items-center gap-1 px-3 py-2.5 text-sm transition",
                  isOpen ? "bg-white/10 text-white" : "hover:text-platinum",
                )}
                aria-expanded={isOpen}
                aria-haspopup="menu"
                aria-controls={isOpen ? `${menuId}-${item.id}` : undefined}
                onFocus={() => setOpenId(item.id)}
                onKeyDown={(event) => {
                  if (event.key === " ") {
                    event.preventDefault();
                    setOpenId(isOpen ? null : item.id);
                  }
                }}
              >
                {label}
                <ChevronDown className={cn("size-3.5 opacity-70 transition", isOpen && "rotate-180")} />
              </Link>
              {isOpen ? (
                <div id={`${menuId}-${item.id}`}>
                  <DropdownPanel item={item} onNavigate={closeAll} t={t} />
                </div>
              ) : null}
            </div>
          );
        })}

        <div className="ml-2">
          <LanguageSwitcher />
        </div>
        <a
          href={siteConfig.phoneHref}
          className="ml-1 inline-flex items-center rounded-sm border border-[var(--platinum)]/45 px-3 py-2 text-sm font-semibold transition hover:border-white hover:bg-white/5"
        >
          {siteConfig.phone}
        </a>
        <Link
          href="/#strategy"
          className="ml-1 inline-flex items-center gap-1 rounded-sm border border-[var(--platinum)]/50 px-4 py-2.5 text-sm transition hover:border-white hover:text-white"
        >
          {t("bookConsult")} <ArrowUpRight className="size-3.5" />
        </Link>
      </nav>

      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 lg:hidden">
        <LanguageSwitcher />
        <a
          href={siteConfig.phoneHref}
          className="hidden rounded-sm border border-[var(--platinum)]/45 px-3 py-2 text-xs font-semibold sm:inline-flex"
        >
          {t("call")}
        </a>
        <Link
          href="/#strategy"
          className="inline-flex min-h-10 items-center rounded-sm border border-[var(--platinum)]/50 px-2.5 py-2 text-xs font-semibold sm:px-3 sm:text-sm"
          onClick={closeAll}
        >
          {t("consult")}
        </Link>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-sm border border-[var(--platinum)]/40"
          aria-expanded={mobileOpen}
          aria-controls={`${menuId}-mobile`}
          aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
          onClick={() => setMobileOpen((value) => !value)}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {mobileOpen ? (
        <div
          id={`${menuId}-mobile`}
          className="fixed inset-x-0 top-[72px] bottom-0 z-40 overflow-y-auto border-t border-white/10 bg-[var(--navy)] lg:hidden"
        >
          <div className="mx-auto flex max-w-[1180px] flex-col gap-1 px-5 py-6">
            {primaryNav.map((item) => {
              const expanded = mobileExpanded === item.id;
              const label = t(item.labelKey);
              return (
                <div key={item.id} className="border-b border-white/10">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-4 text-left text-base font-semibold"
                    aria-expanded={expanded}
                    onClick={() => setMobileExpanded(expanded ? null : item.id)}
                  >
                    {label}
                    <ChevronDown className={cn("size-4 transition", expanded && "rotate-180")} />
                  </button>
                  {expanded ? (
                    <ul className="mb-4 space-y-1 pb-2">
                      <li>
                        <Link href={item.href} className="block px-1 py-2 text-sm text-platinum" onClick={closeAll}>
                          {t("overview", { label })}
                        </Link>
                      </li>
                      {item.columns.flatMap((column) =>
                        column.links.map((link) => (
                          <li key={item.id + link.href + link.labelKey}>
                            <Link
                              href={link.href}
                              className="block px-1 py-2 text-sm text-white/85"
                              onClick={closeAll}
                            >
                              {t(link.labelKey)}
                            </Link>
                          </li>
                        )),
                      )}
                    </ul>
                  ) : null}
                </div>
              );
            })}
            <a href={siteConfig.phoneHref} className="mt-6 text-sm font-semibold text-platinum">
              {siteConfig.phone}
            </a>
            <Link
              href="/#strategy"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-sm bg-white px-4 py-3 text-sm font-semibold text-navy"
              onClick={closeAll}
            >
              {t("bookConsult")} <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
