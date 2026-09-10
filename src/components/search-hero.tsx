"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const DESKTOP_SRC = "/video/hero-loop.mp4";
const MOBILE_SRC = "/video/hero-loop-mobile.mp4";

function heroSrc() {
  return window.matchMedia("(max-width: 1024px)").matches ? MOBILE_SRC : DESKTOP_SRC;
}

function unlockInlinePlayback(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("playsinline", "true");
  video.setAttribute("webkit-playsinline", "true");
  video.setAttribute("muted", "");
}

export function SearchHero() {
  const t = useTranslations("Hero");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [entered, setEntered] = useState(false);

  const pathCtas = [
    { label: t("buy"), href: "/buy" as const },
    { label: t("sell"), href: "/sell" as const },
    { label: t("invest"), href: "/invest" as const },
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const tryPlay = () => {
      if (reduce.matches) return;
      unlockInlinePlayback(video);
      const play = video.play();
      if (play) play.catch(() => undefined);
    };

    const applySource = () => {
      if (reduce.matches) {
        video.removeAttribute("src");
        video.pause();
        video.load();
        return;
      }
      const next = heroSrc();
      if (!video.getAttribute("src")?.endsWith(next)) {
        video.src = next;
        video.load();
      }
      unlockInlinePlayback(video);
      tryPlay();
    };

    applySource();

    const onGesture = () => tryPlay();
    video.addEventListener("canplay", tryPlay);
    video.addEventListener("loadeddata", tryPlay);
    document.addEventListener("visibilitychange", tryPlay);
    window.addEventListener("pageshow", tryPlay);
    window.addEventListener("touchstart", onGesture, { passive: true });
    window.addEventListener("pointerdown", onGesture);
    reduce.addEventListener("change", applySource);

    return () => {
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("loadeddata", tryPlay);
      document.removeEventListener("visibilitychange", tryPlay);
      window.removeEventListener("pageshow", tryPlay);
      window.removeEventListener("touchstart", onGesture);
      window.removeEventListener("pointerdown", onGesture);
      reduce.removeEventListener("change", applySource);
    };
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      setEntered(true);
      return;
    }
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className="relative -mt-[72px] min-h-[100svh] overflow-hidden bg-[var(--navy)] text-white">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: "url(/video/hero-poster.jpg)" }}
        />
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={MOBILE_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/video/hero-poster.jpg"
          disablePictureInPicture
          controls={false}
          {...{ "webkit-playsinline": "true" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/80 via-[color-mix(in_srgb,var(--navy)_40%,transparent)] to-[var(--navy)]/20" />
      </div>
      <div className="relative z-[2] mx-auto flex min-h-[100svh] w-[min(1180px,calc(100%-40px))] flex-col justify-end px-2 pb-16 pt-[142px] max-sm:w-[min(100%-28px,1180px)] max-sm:px-1 max-sm:pb-14 max-sm:pt-28">
        <h1
          className={cn(
            "hero-enter font-display m-0 max-w-[14ch] text-[clamp(2.4rem,8vw,5.5rem)] leading-[0.95] tracking-[-0.055em] text-shadow-hero",
            entered && "hero-enter-in",
          )}
        >
          {t("headline")}
        </h1>
        <p
          className={cn(
            "hero-enter hero-enter-delay mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg",
            entered && "hero-enter-in",
          )}
        >
          {t("dek")}
        </p>
        <div
          className={cn(
            "hero-enter hero-enter-delay mt-10 flex w-full max-w-[640px] flex-col gap-3 sm:flex-row",
            entered && "hero-enter-in",
          )}
        >
          {pathCtas.map((cta) => (
            <Link
              key={cta.href}
              href={cta.href}
              className="inline-flex min-h-[52px] w-full flex-1 items-center justify-center border border-white/55 bg-white/10 px-6 text-sm font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-[2px] transition hover:bg-white/20"
            >
              {cta.label}
            </Link>
          ))}
        </div>
        <Link
          href="/#strategy"
          className={cn(
            "hero-enter hero-enter-delay-2 mt-6 inline-flex text-sm font-medium text-white/80 underline-offset-4 hover:underline",
            entered && "hero-enter-in",
          )}
        >
          {t("consult")}
        </Link>
      </div>
    </section>
  );
}
