import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Calculator, CircleAlert, LineChart, Repeat2 } from "lucide-react";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { Link } from "@/i18n/navigation";
import { getNeighborhood } from "@/lib/neighborhoods";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Invest" });
  return {
    title: "Invest in NYC Real Estate",
    description: t("body"),
  };
}

const hoodSlugs = ["long-island-city", "astoria", "bushwick", "mott-haven"] as const;

export default async function InvestPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Invest");
  const hoods = hoodSlugs.map(getNeighborhood).filter(Boolean);

  return (
    <main className="bg-[var(--paper)]">
      <section className="relative -mt-[72px] bg-[var(--navy)] px-5 pb-24 pt-36 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs uppercase tracking-[.2em] text-[var(--platinum)]">{t("eyebrow")}</p>
          <h1 className="mt-5 text-5xl font-semibold tracking-[-.055em] sm:text-7xl">{t("title")}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/70">{t("body")}</p>
          <Link
            href="/#strategy"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-[var(--navy)]"
          >
            {t("cta")} <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-5 py-20">
        <Stagger className="grid gap-5 md:grid-cols-2">
          {[
            {
              icon: Calculator,
              title: "Underwrite consistently",
              text: "Separate in-place figures, market assumptions and upside scenarios.",
            },
            {
              icon: CircleAlert,
              title: "Expose the risks",
              text: "Review occupancy, regulation, condition, taxes, insurance and concentration.",
            },
            {
              icon: LineChart,
              title: "Compare opportunity cost",
              text: "Measure return potential against capital needs, time and alternative uses.",
            },
            {
              icon: Repeat2,
              title: "Plan the exit",
              text: "Identify realistic buyer pools, hold periods and downside scenarios before acquisition.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-3xl border border-[var(--line)] bg-white p-7">
              <Icon className="size-7 text-[var(--navy)]" />
              <h2 className="mt-5 text-xl font-semibold">{title}</h2>
              <p className="mt-3 leading-7 text-neutral-600">{text}</p>
            </article>
          ))}
        </Stagger>
        <Reveal className="mt-14 rounded-3xl border border-[var(--line)] bg-white p-8">
          <p className="text-xs font-semibold uppercase tracking-[.2em] text-[var(--platinum)]">Investment brief</p>
          <h2 className="mt-4 text-3xl font-semibold">The intake should capture more than a budget.</h2>
          <p className="mt-5 text-lg leading-8 text-neutral-700">
            Record target return, financing, property type, geography, hold period, operational involvement, renovation
            tolerance, regulatory risk, liquidity and exit logic.
          </p>
          <Link
            href="/guides/nyc-closing-costs"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold"
          >
            Review closing-cost assumptions <ArrowRight className="size-4" />
          </Link>
        </Reveal>
        <Reveal className="mt-14 border-t border-[var(--line)] pt-14">
          <h2 className="text-2xl font-semibold">{t("exploreNeighborhoods")}</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {hoods.map((hood) =>
              hood ? (
                <Link
                  key={hood.slug}
                  href={`/neighborhoods/${hood.slug}`}
                  className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium transition hover:border-[var(--navy)]"
                >
                  {hood.name}
                </Link>
              ) : null,
            )}
            <Link
              href="/neighborhoods"
              className="rounded-full bg-[var(--navy)] px-4 py-2 text-sm font-medium text-white"
            >
              {t("allNeighborhoods")}
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
