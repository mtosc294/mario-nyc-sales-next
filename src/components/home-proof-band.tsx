"use client";

import { useTranslations } from "next-intl";
import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";

type Props = {
  boroughs: number;
  paths: number;
  guides: number;
};

export function HomeProofBand({ boroughs, paths, guides }: Props) {
  const t = useTranslations("Home");

  const stats = [
    { value: boroughs, label: t("proofBoroughs") },
    { value: paths, label: t("proofPaths") },
    { value: guides, label: t("proofGuides") },
  ];

  return (
    <section className="border-b border-[var(--line)] bg-[var(--navy)] px-5 py-12 text-white lg:px-8 lg:py-14">
      <Reveal>
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <p className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                <CountUp value={stat.value} />
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--platinum)]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
