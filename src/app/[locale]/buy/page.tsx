import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { FaqAccordion } from "@/components/motion/faq-accordion";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { TypeHero } from "@/components/type-hero";
import { Link } from "@/i18n/navigation";
import {
  buyDirectAnswer,
  buyFaqs,
  buyGuideCards,
  buyHoodSlugs,
  buyMistakes,
  buySteps,
  buyUpdatedAt,
  buyWhoItFits,
} from "@/lib/buy-page";
import { getNeighborhood } from "@/lib/neighborhoods";
import { absoluteUrl, siteConfig } from "@/lib/site-config";
import { breadcrumbJsonLd, metaDescription, pageAlternates } from "@/lib/seo";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";

const consultHref = "/?segment=buyer#strategy";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Buy" });
  return {
    title: "Buy NYC Property",
    description: metaDescription(buyDirectAnswer),
    alternates: pageAlternates(locale, "/buy"),
    openGraph: {
      title: `${t("title")} | ${t("eyebrow")}`,
      description: metaDescription(buyDirectAnswer),
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

export default async function BuyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Buy");
  const hoods = buyHoodSlugs.map(getNeighborhood).filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${absoluteUrl(`/${locale}/buy`)}#webpage`,
        url: absoluteUrl(`/${locale}/buy`),
        name: "Buy NYC Property",
        description: buyDirectAnswer,
        dateModified: buyUpdatedAt,
        inLanguage: locale,
        author: { "@type": "Person", name: siteConfig.name },
        about: {
          "@type": "Thing",
          name: "NYC residential home buying",
        },
      },
      breadcrumbJsonLd(locale, [
        { name: "Home", path: "/" },
        { name: "Buy", path: "/buy" },
      ]),
      {
        "@type": "FAQPage",
        "@id": `${absoluteUrl(`/${locale}/buy`)}#faq`,
        mainEntity: buyFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };

  return (
    <main className="bg-[var(--paper)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <TypeHero
        kicker={t("eyebrow")}
        title={t("title")}
        cta={{ href: consultHref, label: t("cta") }}
      />

      <section className="border-b border-[var(--line)] bg-white px-5 py-8 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <PageBreadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/buy", label: "Buy" },
            ]}
          />
        </div>
      </section>

      <section className="border-b border-[var(--line)] bg-white px-5 py-12 lg:px-8 lg:py-14">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-start lg:gap-14">
          <div>
            <p className="kicker">{t("howToStart")}</p>
            <p className="mt-4 text-lg leading-8 text-neutral-700">{t("howToStartBody")}</p>
            <p className="mt-4 text-sm text-neutral-500">
              {t("updated", { date: formatUpdated(buyUpdatedAt, locale), name: siteConfig.name })}
            </p>
          </div>
          <div>
            <p className="kicker text-navy">{t("directAnswer")}</p>
            <p className="mt-4 text-lg leading-8 text-ink">{buyDirectAnswer}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-20 lg:px-8">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-[-.03em]">{t("whatBrief")}</h2>
          <p className="mt-5 text-lg leading-8 text-neutral-700">
            In NYC, a buyer brief is a one-page decision filter—not a wishlist dump. It states your maximum all-in
            monthly cost, ownership preference, must-have layout and building rules, and a short list of target
            neighborhoods. Everything else is preference. That structure keeps tours comparable and offers
            disciplined when inventory moves fast.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <h2 className="text-3xl font-semibold tracking-[-.03em]">{t("whoFits")}</h2>
          <ul className="mt-6 grid gap-3">
            {buyWhoItFits.map((item) => (
              <li key={item} className="border-t border-[var(--line)] pt-3 text-lg leading-8 text-neutral-700">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-14">
          <h2 className="text-3xl font-semibold tracking-[-.03em]">{t("steps")}</h2>
          <Stagger className="mt-8 divide-y border-y border-[var(--line)]">
            {buySteps.map((step, index) => (
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

        <Reveal className="mt-14 border-y border-[var(--line)] py-10">
          <p className="kicker text-navy">{t("directAnswer")}</p>
          <h2 className="mt-4 text-3xl font-semibold">{t("condoOrCoop")}</h2>
          <p className="mt-5 text-lg leading-8 text-neutral-700">
            A condo generally offers more ownership and sublet flexibility, while a co-op often has a lower purchase
            price but deeper financial review and board requirements. The right choice depends on your use case,
            liquidity, financing, tolerance for restrictions, and expected exit.
          </p>
          <Link href="/guides/condo-vs-coop-nyc" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
            {t("readCondoGuide")} <ArrowRight className="size-4" />
          </Link>
        </Reveal>

        <Reveal className="mt-14">
          <h2 className="text-3xl font-semibold tracking-[-.03em]">{t("mistakes")}</h2>
          <ul className="mt-6 grid gap-3">
            {buyMistakes.map((item) => (
              <li key={item} className="border-t border-[var(--line)] pt-3 text-lg leading-8 text-neutral-700">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-14">
          <h2 className="text-3xl font-semibold tracking-[-.03em]">{t("faqs")}</h2>
          <div className="mt-8">
            <FaqAccordion items={[...buyFaqs]} />
          </div>
        </Reveal>

        <Reveal className="mt-14">
          <h2 className="text-3xl font-semibold tracking-[-.03em]">{t("guides")}</h2>
          <Stagger className="mt-8 grid gap-5 md:grid-cols-2">
            {buyGuideCards.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group border-t border-[var(--line)] pt-6"
              >
                <h3 className="text-xl font-semibold">{guide.title}</h3>
                <p className="mt-3 leading-7 text-neutral-600">{guide.text}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold">
                  {t("readGuide")} <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </Stagger>
        </Reveal>

        <Reveal className="mt-14 border-t border-[var(--line)] pt-14">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-semibold tracking-[-.03em]">{t("exploreNeighborhoods")}</h2>
              <p className="mt-3 text-neutral-600">{t("exploreNeighborhoodsBody")}</p>
            </div>
            <Link href="/neighborhoods" className="text-sm font-semibold hover:underline">
              {t("allNeighborhoods")}
            </Link>
          </div>
          <Stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {hoods.map((hood) =>
              hood ? (
                <Link
                  key={hood.slug}
                  href={`/neighborhoods/${hood.slug}`}
                  className="group border-t border-[var(--line)] pt-5"
                >
                  <p className="kicker">{hood.borough}</p>
                  <h3 className="mt-2 font-display text-2xl">{hood.name}</h3>
                </Link>
              ) : null,
            )}
          </Stagger>
        </Reveal>

        <Reveal className="mt-16 rounded-3xl border border-[var(--line)] bg-[var(--navy)] p-8 text-white sm:p-10">
          <h2 className="text-3xl font-semibold tracking-[-.03em]">{t("readyTitle")}</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-white/75">{t("readyBody")}</p>
          <Link
            href={consultHref}
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-navy"
          >
            {t("cta")} <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
