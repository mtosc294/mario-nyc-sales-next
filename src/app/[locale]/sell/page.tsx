import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, BarChart3, Camera, FileCheck2, Handshake, Scale } from "lucide-react";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { Link } from "@/i18n/navigation";
import { getNeighborhood } from "@/lib/neighborhoods";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Sell" });
  return {
    title: "Sell NYC Property",
    description: t("body"),
  };
}

const hoodSlugs = ["financial-district", "upper-east-side", "williamsburg", "park-slope"] as const;
const guideLinks = [
  { href: "/guides/nyc-apartment-worth", labelKey: "apartmentWorth" as const },
  { href: "/guides/sell-a-condo-in-nyc", labelKey: "sellCondo" as const },
  { href: "/guides/sell-a-coop-in-nyc", labelKey: "sellCoop" as const },
] as const;

export default async function SellPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Sell");
  const tNav = await getTranslations("Nav");

  const steps = [
    {
      icon: BarChart3,
      title: "Price from evidence",
      text: "Review relevant closed sales, active competition and property-specific adjustments.",
    },
    {
      icon: Camera,
      title: "Prepare the launch",
      text: "Coordinate condition, staging decisions, photography, floor plans and listing materials.",
    },
    {
      icon: FileCheck2,
      title: "Reduce friction",
      text: "Gather building, financial and property documents before qualified buyers ask.",
    },
    {
      icon: Handshake,
      title: "Qualify the offer",
      text: "Compare price with financing, contingencies, timing and execution risk.",
    },
  ];
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
        <Reveal className="rounded-3xl border border-[var(--line)] bg-[var(--navy-soft)] p-8">
          <p className="text-xs font-semibold uppercase tracking-[.2em] text-[var(--navy)]">{t("directAnswer")}</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-.035em]">{t("worthTitle")}</h2>
          <p className="mt-5 text-lg leading-8 text-neutral-700">
            Its market value is the price qualified buyers are likely to support after comparing it with relevant recent
            sales and current competition. Floor, light, view, condition, layout, monthly carrying costs, building
            finances and buyer demand can materially change the result.
          </p>
          <Link
            href="/guides/nyc-apartment-worth"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold"
          >
            Read the full answer guide <ArrowRight className="size-4" />
          </Link>
        </Reveal>
        <Stagger className="mt-14 grid gap-5 md:grid-cols-2">
          {steps.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-3xl border border-[var(--line)] bg-white p-7">
              <Icon className="size-7 text-[var(--navy)]" />
              <h3 className="mt-5 text-xl font-semibold">{title}</h3>
              <p className="mt-3 leading-7 text-neutral-600">{text}</p>
            </article>
          ))}
        </Stagger>
        <Reveal className="mt-16 grid gap-10 border-t border-[var(--line)] pt-14 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <Scale className="size-8 text-[var(--navy)]" />
            <h2 className="mt-4 text-3xl font-semibold">{t("sellerGuides")}</h2>
          </div>
          <ul className="grid gap-4">
            {guideLinks.map((g) => (
              <li key={g.href}>
                <Link href={g.href} className="text-lg font-medium text-[var(--ink)] hover:underline">
                  {tNav(g.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="mt-16 border-t border-[var(--line)] pt-14">
          <h2 className="text-2xl font-semibold">{t("exploreNeighborhoods")}</h2>
          <p className="mt-3 text-neutral-600">{t("exploreNeighborhoodsBody")}</p>
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
