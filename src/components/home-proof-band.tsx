"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/reveal";

export function HomeProofBand() {
  const t = useTranslations("Home");

  return (
    <section className="border-y border-[var(--line)] bg-[var(--navy)] px-5 py-14 text-white lg:px-8 lg:py-16">
      <Reveal className="mx-auto max-w-[1180px]">
        <p className="kicker">{t("proofKicker")}</p>
        <p className="font-display mt-5 max-w-[22ch] text-3xl tracking-[-0.04em] sm:text-5xl">{t("proofLine")}</p>
      </Reveal>
    </section>
  );
}
