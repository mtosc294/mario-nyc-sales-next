import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { FaqAccordion } from "@/components/motion/faq-accordion";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { TypeHero } from "@/components/type-hero";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { Link } from "@/i18n/navigation";
import { getNeighborhood } from "@/lib/neighborhoods";
import {
  investDirectAnswer,
  investFaqs,
  investMistakes,
  investSteps,
  investUpdatedAt,
  investWhoItFits,
} from "@/lib/invest-page";
import { absoluteUrl, siteConfig } from "@/lib/site-config";
import { breadcrumbJsonLd, metaDescription, pageAlternates } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Invest in NYC Real Estate",
    description: metaDescription(investDirectAnswer),
    alternates: pageAlternates(locale, "/invest"),
    openGraph: {
      title: "Invest in NYC Real Estate",
      description: metaDescription(investDirectAnswer),
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

const hoodSlugs = ["long-island-city", "astoria", "bushwick", "mott-haven"] as const;

export default async function InvestPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Invest");
  const hoods = hoodSlugs.map(getNeighborhood).filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${absoluteUrl(`/${locale}/invest`)}#webpage`,
        url: absoluteUrl(`/${locale}/invest`),
        name: "Invest in NYC Real Estate",
        description: investDirectAnswer,
        dateModified: investUpdatedAt,
        inLanguage: locale,
        author: { "@type": "Person", name: siteConfig.name },
      },
      {
        "@type": "FAQPage",
        "@id": `${absoluteUrl(`/${locale}/invest`)}#faq`,
        mainEntity: investFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
      breadcrumbJsonLd(locale, [
        { name: "Home", path: "/" },
        { name: "Invest", path: "/invest" },
      ]),
    ],
  };

  return (
    <main className="bg-[var(--paper)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TypeHero kicker={t("eyebrow")} title={t("title")} dek={t("body")} cta={{ href: "/?segment=investor#strategy", label: t("cta") }} />

      <section className="border-b border-[var(--line)] bg-white px-5 py-12 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <PageBreadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/invest", label: "Invest" },
            ]}
          />
        </div>
      </section>

      <section className="border-b border-[var(--line)] bg-white px-5 py-14 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <p className="kicker">{t("directAnswer")}</p>
            <p className="mt-4 text-sm text-neutral-500">
              Updated {formatUpdated(investUpdatedAt, locale)} · {siteConfig.name}
            </p>
          </div>
          <p className="text-lg leading-8 text-ink">{investDirectAnswer}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-20">
        <Reveal>
          <h2 className="text-3xl">Who it fits</h2>
          <ul className="mt-6 grid gap-3">
            {investWhoItFits.map((item) => (
              <li key={item} className="border-t border-[var(--line)] pt-3 text-lg leading-8 text-neutral-700">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-14">
          <h2 className="text-3xl">How to screen an NYC investment</h2>
          <Stagger className="mt-8 divide-y border-y border-[var(--line)]">
            {investSteps.map((step, index) => (
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
            {investMistakes.map((item) => (
              <li key={item} className="border-t border-[var(--line)] pt-3 text-lg leading-8 text-neutral-700">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-14 border-t border-[var(--line)] pt-10">
          <p className="kicker">Investment brief</p>
          <h2 className="mt-4 text-3xl">The intake should capture more than a budget.</h2>
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

        <Reveal className="mt-14">
          <h2 className="text-3xl">Investor FAQs</h2>
          <div className="mt-8">
            <FaqAccordion items={[...investFaqs]} />
          </div>
        </Reveal>

        <Reveal className="mt-14 border-t border-[var(--line)] pt-14">
          <h2 className="text-2xl">{t("exploreNeighborhoods")}</h2>
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
