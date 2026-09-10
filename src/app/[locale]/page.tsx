import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { SearchHero } from "@/components/search-hero";
import { LeadForm } from "@/components/lead-form";
import { HomeProofBand } from "@/components/home-proof-band";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { Link } from "@/i18n/navigation";
import { guides, neighborhoods } from "@/lib/site-data";
import { pageAlternates } from "@/lib/seo";

const boroughChips = [
  { labelKey: "manhattan" as const, href: "/neighborhoods#manhattan" },
  { labelKey: "brooklyn" as const, href: "/neighborhoods#brooklyn" },
  { labelKey: "queens" as const, href: "/neighborhoods#queens" },
  { labelKey: "bronx" as const, href: "/neighborhoods#bronx" },
  { labelKey: "statenIsland" as const, href: "/neighborhoods#staten-island" },
];

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: { absolute: t("titleDefault") },
    description: t("description"),
    alternates: pageAlternates(locale, "/"),
    openGraph: {
      title: t("titleDefault"),
      description: t("description"),
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");
  const tNav = await getTranslations("Nav");
  const featuredHoods = neighborhoods.slice(0, 4);
  const paths = [
    { title: t("pathSellTitle"), text: t("pathSellText"), href: "/sell" as const, index: "01" },
    { title: t("pathBuyTitle"), text: t("pathBuyText"), href: "/buy" as const, index: "02" },
    { title: t("pathInvestTitle"), text: t("pathInvestText"), href: "/invest" as const, index: "03" },
  ];

  return (
    <main className="bg-[var(--paper)]">
      <SearchHero />

      <section className="border-b border-[var(--line)] bg-white px-5 py-16 lg:px-8 lg:py-20">
        <Reveal className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-start lg:gap-16">
          <div>
            <p className="kicker">{t("howToStart")}</p>
            <h2 className="mt-4 max-w-[18ch] text-4xl sm:text-5xl">{t("choosePathTitle")}</h2>
            <p className="mt-6 max-w-[36em] text-lg leading-8 text-neutral-700">{t("howToStartBody")}</p>
          </div>
          <div className="border-t border-[var(--line)] pt-8 lg:border-t-0 lg:border-l lg:pl-12 lg:pt-0">
            <p className="kicker text-navy">{t("directAnswer")}</p>
            <p className="mt-4 text-lg leading-8 text-ink">{t("directAnswerBody")}</p>
          </div>
        </Reveal>
      </section>

      <HomeProofBand />

      <section className="py-16 lg:py-[96px]">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))] max-sm:w-[min(100%-28px,1180px)]">
          <Reveal>
            <p className="kicker">{t("choosePath")}</p>
            <p className="mt-3 max-w-xl text-neutral-600">{t("choosePathBody")}</p>
          </Reveal>
          <Stagger className="mt-10 divide-y border-y border-[var(--line)]">
            {paths.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group grid gap-3 py-8 transition sm:grid-cols-[4rem_1fr_auto] sm:items-baseline sm:gap-8"
              >
                <span className="kicker text-navy">{item.index}</span>
                <span>
                  <span className="font-display text-3xl sm:text-4xl">{item.title}</span>
                  <span className="mt-2 block max-w-[36em] text-neutral-600">{item.text}</span>
                </span>
                <span className="inline-flex items-center gap-2 text-sm font-semibold">
                  {t("startHere")} <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-white py-16 lg:py-[96px]">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))] max-sm:w-[min(100%-28px,1180px)]">
          <Reveal className="max-w-3xl">
            <p className="kicker text-navy">{t("howWeWork")}</p>
            <h2 className="mt-4 text-4xl sm:text-5xl">{t("howWeWorkTitle")}</h2>
            <p className="mt-6 text-lg leading-8 text-neutral-700">{t("howWeWorkBody")}</p>
          </Reveal>
        </div>
      </section>

      <section id="neighborhoods" className="py-16 lg:py-[96px]">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))] max-sm:w-[min(100%-28px,1180px)]">
          <Reveal className="grid items-end gap-10 md:grid-cols-[1fr_.7fr] md:gap-16">
            <div>
              <p className="kicker">{t("neighborhoods")}</p>
              <h2 className="mt-4 text-4xl sm:text-5xl">{t("neighborhoodsTitle")}</h2>
            </div>
            <p className="leading-7 text-neutral-600">{t("neighborhoodsBody")}</p>
          </Reveal>
          <Stagger className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-[var(--line)] pt-8">
            {boroughChips.map((chip) => (
              <Link
                key={chip.href}
                href={chip.href}
                className="font-display text-2xl tracking-[-0.03em] transition hover:text-navy"
              >
                {tNav(chip.labelKey)}
              </Link>
            ))}
          </Stagger>
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredHoods.map((hood) => (
              <Link
                key={hood.slug}
                href={`/neighborhoods/${hood.slug}`}
                className="group border-t border-[var(--line)] pt-5"
              >
                <p className="kicker">{hood.borough}</p>
                <h3 className="mt-2 font-display text-2xl">{hood.name}</h3>
                <p className="mt-2 text-sm leading-[1.55] text-neutral-600">{hood.summary}</p>
              </Link>
            ))}
          </Stagger>
          <div className="mt-10">
            <Link href="/neighborhoods" className="inline-flex items-center gap-2 text-sm font-semibold">
              {t("viewAll")} <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-white px-5 py-16 lg:px-8 lg:py-[96px]">
        <Reveal className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div>
            <p className="kicker text-navy">{t("sellerKicker")}</p>
            <h2 className="mt-4 max-w-[16ch] text-4xl sm:text-5xl">{t("sellerTitle")}</h2>
            <p className="mt-6 max-w-[36em] text-lg leading-8 text-neutral-700">{t("sellerBody")}</p>
          </div>
          <Link
            href="/#strategy"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-white"
          >
            {t("sellerCta")} <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </section>

      <section id="guides" className="py-16 lg:py-[96px]">
        <div className="mx-auto grid w-[min(1180px,calc(100%-40px))] gap-12 lg:grid-cols-[.65fr_1.35fr] max-sm:w-[min(100%-28px,1180px)]">
          <Reveal>
            <p className="kicker">{t("guides")}</p>
            <h2 className="mt-4 text-4xl sm:text-5xl">{t("guidesTitle")}</h2>
            <p className="mt-4 leading-7 text-neutral-600">{t("guidesBody")}</p>
          </Reveal>
          <Stagger className="divide-y border-y border-[var(--line)]">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group flex items-baseline justify-between gap-5 py-6"
              >
                <span>
                  <span className="font-display text-xl sm:text-2xl">{guide.title}</span>
                  <span className="mt-2 block text-sm leading-6 text-neutral-600">{guide.excerpt}</span>
                </span>
                <ArrowRight className="size-5 shrink-0 transition group-hover:translate-x-1" />
              </Link>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="strategy" className="bg-white py-16 lg:py-[96px]">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))] max-sm:w-[min(100%-28px,1180px)]">
          <Reveal>
            <LeadForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
