import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { FaqAccordion } from "@/components/motion/faq-accordion";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { TypeHero } from "@/components/type-hero";
import { Link } from "@/i18n/navigation";
import { getNeighborhood } from "@/lib/neighborhoods";
import {
  sellDirectAnswer,
  sellFaqs,
  sellMistakes,
  sellSteps,
  sellUpdatedAt,
  sellWhoItFits,
} from "@/lib/sell-page";
import { absoluteUrl, siteConfig } from "@/lib/site-config";
import { breadcrumbJsonLd, metaDescription, pageAlternates } from "@/lib/seo";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Sell NYC Property",
    description: metaDescription(sellDirectAnswer),
    alternates: pageAlternates(locale, "/sell"),
    openGraph: {
      title: "Sell NYC Property",
      description: metaDescription(sellDirectAnswer),
    },
  };
}

function formatUpdated(iso: string, locale: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
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
  const hoods = hoodSlugs.map(getNeighborhood).filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${absoluteUrl(`/${locale}/sell`)}#webpage`,
        url: absoluteUrl(`/${locale}/sell`),
        name: "Sell NYC Property",
        description: sellDirectAnswer,
        dateModified: sellUpdatedAt,
        inLanguage: locale,
        author: { "@type": "Person", name: siteConfig.name },
      },
      {
        "@type": "FAQPage",
        "@id": `${absoluteUrl(`/${locale}/sell`)}#faq`,
        mainEntity: sellFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
      breadcrumbJsonLd(locale, [
        { name: "Home", path: "/" },
        { name: "Sell", path: "/sell" },
      ]),
    ],
  };

  return (
    <main className="bg-[var(--paper)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TypeHero kicker={t("eyebrow")} title={t("title")} dek={t("body")} cta={{ href: "/?segment=seller#strategy", label: t("cta") }} />

      <section className="border-b border-[var(--line)] bg-white px-5 py-12 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <PageBreadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/sell", label: "Sell" },
            ]}
          />
        </div>
      </section>

      <section className="border-b border-[var(--line)] bg-white px-5 py-14 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          <div>
            <p className="kicker">{t("directAnswer")}</p>
            <p className="mt-4 text-sm text-neutral-500">
              Updated {formatUpdated(sellUpdatedAt, locale)} · {siteConfig.name}
            </p>
          </div>
          <p className="text-lg leading-8 text-ink">{sellDirectAnswer}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-20">
        <Reveal>
          <h2 className="text-3xl">{t("worthTitle")}</h2>
          <p className="mt-5 text-lg leading-8 text-neutral-700">{sellDirectAnswer}</p>
          <Link
            href="/guides/nyc-apartment-worth"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold"
          >
            Read the full answer guide <ArrowRight className="size-4" />
          </Link>
        </Reveal>

        <Reveal className="mt-14">
          <h2 className="text-3xl">Who it fits</h2>
          <ul className="mt-6 grid gap-3">
            {sellWhoItFits.map((item) => (
              <li key={item} className="border-t border-[var(--line)] pt-3 text-lg leading-8 text-neutral-700">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-14">
          <h2 className="text-3xl">How a NYC sale actually works</h2>
          <Stagger className="mt-8 divide-y border-y border-[var(--line)]">
            {sellSteps.map((step, index) => (
              <article key={step.title} className="grid gap-2 py-6 sm:grid-cols-[4rem_1fr]">
                <span className="kicker text-navy">0{index + 1}</span>
                <div>
                  <h3 className="font-display text-2xl">{step.title}</h3>
                  <p className="mt-2 leading-7 text-neutral-600">{step.text}</p>
                </div>
              </article>
            ))}
          </Stagger>
        </Reveal>

        <Reveal className="mt-14">
          <h2 className="text-3xl">Common mistakes</h2>
          <ul className="mt-6 grid gap-3">
            {sellMistakes.map((item) => (
              <li key={item} className="border-t border-[var(--line)] pt-3 text-lg leading-8 text-neutral-700">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-14">
          <h2 className="text-3xl">Seller FAQs</h2>
          <div className="mt-8">
            <FaqAccordion items={[...sellFaqs]} />
          </div>
        </Reveal>

        <Reveal className="mt-16 border-t border-[var(--line)] pt-14">
          <h2 className="text-3xl">{t("sellerGuides")}</h2>
          <ul className="mt-6 grid gap-3">
            {guideLinks.map((g) => (
              <li key={g.href}>
                <Link href={g.href} className="font-display text-xl hover:underline">
                  {tNav(g.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-16 border-t border-[var(--line)] pt-14">
          <h2 className="text-2xl">{t("exploreNeighborhoods")}</h2>
          <p className="mt-3 text-neutral-600">{t("exploreNeighborhoodsBody")}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
            {hoods.map((hood) =>
              hood ? (
                <Link key={hood.slug} href={`/neighborhoods/${hood.slug}`} className="font-display text-xl">
                  {hood.name}
                </Link>
              ) : null,
            )}
            <Link href="/neighborhoods" className="text-sm font-semibold">
              {t("allNeighborhoods")}
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
