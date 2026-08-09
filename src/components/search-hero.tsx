"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function SearchHero() {
  const t = useTranslations("Hero");
  const videoRef = useRef<HTMLVideoElement>(null);

  const pathCtas = [
    { label: t("buy"), href: "/buy" as const },
    { label: t("sell"), href: "/sell" as const },
    { label: t("invest"), href: "/invest" as const },
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 600px)");

    const pick = () => {
      if (reduce.matches || mobile.matches) {
        video.removeAttribute("src");
        video.removeAttribute("autoplay");
        video.pause();
        video.load();
        return;
      }
      video.src = "/video/hero-loop.mp4";
      video.load();
      video.play().catch((err) => {
        if (process.env.NODE_ENV === "development") {
          console.warn("Hero video play failed", err);
        }
      });
    };

    pick();
    mobile.addEventListener("change", pick);
    reduce.addEventListener("change", pick);
    return () => {
      mobile.removeEventListener("change", pick);
      reduce.removeEventListener("change", pick);
    };
  }, []);

  return (
    <section className="relative -mt-[72px] min-h-[100svh] overflow-hidden bg-zinc-950 text-white max-sm:min-h-[min(100svh,640px)] min-[601px]:min-h-[calc(720px+72px)]">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <video
          ref={videoRef}
          className="absolute inset-0 hidden h-full w-full object-cover min-[601px]:block"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/video/hero-poster.jpg"
        />
        <div
          className="absolute inset-0 bg-center bg-cover min-[601px]:hidden"
          style={{ backgroundImage: "url(/video/hero-poster.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/75 via-[color-mix(in_srgb,var(--navy)_35%,transparent)] to-[var(--navy)]/15" />
      </div>
      <div className="relative z-[2] mx-auto flex min-h-[100svh] w-[min(1180px,calc(100%-40px))] flex-col items-center justify-center px-2 pb-[70px] pt-[142px] text-center max-sm:min-h-[min(100svh,640px)] max-sm:w-[min(100%-28px,1180px)] max-sm:px-1 max-sm:pb-16 max-sm:pt-28 min-[601px]:min-h-[calc(720px+72px)]">
        <h1 className="m-0 mx-auto max-w-[900px] text-[70px] font-semibold leading-[0.97] tracking-[-0.055em] text-shadow-hero max-[900px]:text-[50px] max-[600px]:text-[clamp(2rem,9vw,2.7rem)]">
          {t("headline")}
        </h1>
        <div className="mt-8 flex w-full max-w-[720px] flex-col gap-3 max-sm:mt-8 sm:mt-10 sm:flex-row sm:justify-center">
          {pathCtas.map((cta) => (
            <Link
              key={cta.href}
              href={cta.href}
              className="inline-flex min-h-[52px] w-full flex-1 items-center justify-center border border-white/55 bg-white/15 px-6 text-sm font-bold uppercase tracking-[0.06em] text-white backdrop-blur-[2px] transition hover:bg-white/25"
            >
              {cta.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
