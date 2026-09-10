import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

type Props = {
  kicker: string;
  title: string;
  dek?: string;
  cta?: { href: ComponentProps<typeof Link>["href"]; label: string };
};

export function TypeHero({ kicker, title, dek, cta }: Props) {
  return (
    <section className="relative -mt-[72px] overflow-hidden bg-[var(--navy)] px-5 pb-16 pt-32 text-white max-sm:pb-14 max-sm:pt-28 sm:pb-24 sm:pt-36 lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/20" aria-hidden />
      <div className="mx-auto max-w-[1180px]">
        <p className="kicker text-platinum">{kicker}</p>
        <h1 className="font-display mt-6 max-w-[16ch] text-5xl tracking-[-0.055em] max-sm:text-[2.35rem] sm:text-7xl lg:text-[5.25rem]">
          {title}
        </h1>
        {dek ? <p className="mt-8 max-w-xl text-lg leading-8 text-white/70">{dek}</p> : null}
        {cta ? (
          <Link
            href={cta.href}
            className="mt-10 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy transition hover:bg-white/90"
          >
            {cta.label} <ArrowRight className="size-4" />
          </Link>
        ) : null}
      </div>
    </section>
  );
}
