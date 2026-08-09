"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { PrimaryNav } from "@/components/primary-nav";
import { advisorSubtitle, licenseLabel, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

function isHeroOverlayPath(pathname: string) {
  if (pathname === "/") return true;
  if (pathname === "/buy" || pathname === "/sell" || pathname === "/invest") return true;
  if (pathname === "/neighborhoods" || pathname.startsWith("/neighborhoods/")) return true;
  return false;
}

export function SiteHeader() {
  const pathname = usePathname();
  const license = licenseLabel();
  const overlayRoute = isHeroOverlayPath(pathname);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const solid = !overlayRoute || scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 text-white transition-[background-color,border-color,backdrop-filter] duration-300",
        solid
          ? "border-b border-white/10 bg-[color-mix(in_srgb,var(--navy)_94%,transparent)] backdrop-blur-xl"
          : "border-b-0 bg-gradient-to-b from-black/45 via-black/20 to-transparent",
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-[1180px] items-center justify-between gap-2 px-4 sm:gap-4 sm:px-5 lg:px-5">
        <Link href="/" className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3" aria-label={`${siteConfig.name} home`}>
          <span className="relative size-10 shrink-0 overflow-hidden rounded-full bg-white/10">
            <Image
              src="/images/mario-headshot.png"
              alt={siteConfig.name}
              width={160}
              height={160}
              className="size-full object-cover object-[50%_18%]"
              priority
            />
          </span>
          <span className="min-w-0">
            <strong className="block truncate text-sm tracking-wide">{siteConfig.name}</strong>
            <small className="mt-0.5 hidden max-w-[300px] text-[9px] uppercase leading-[1.35] tracking-[0.06em] text-[var(--platinum)] sm:block">
              {advisorSubtitle()}
              {license ? ` · ${license}` : ""}
            </small>
          </span>
        </Link>
        <PrimaryNav />
      </div>
    </header>
  );
}
