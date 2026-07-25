import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { FaqAccordion } from "@/components/motion/faq-accordion";
import { Reveal, Stagger } from "@/components/motion/reveal";
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

const consultHref = "/?segment=buyer#strategy";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Buy" });
  return {
    title: "Buy NYC Property",
    description: buyDirectAnswer.slice(0, 155),
    openGraph: {
      title: `${t("title")} | ${t("eyebrow")}`,
      description: buyDirectAnswer.slice(0, 155),
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

      <section className="relative -mt-[72px] flex min-h-[calc(52vh+72px)] items-end overflow-hidden px-5 pb-16 pt-36 text-white lg:min-h-[calc(58vh+72px)] lg:px-8 lg:pb-20 lg:pt-40">
        <Image
          src="/images/buy-hero-park.jpg"
          alt=""
          fill
          priority
          quality={100}
          unoptimized
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/80 via-[color-mix(in_srgb,var(--navy)_25%,transparent)] to-transparent"
          aria-hidden
        />
        <div className="relative mx-auto w-full max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[.2em] text-[var(--platinum)]">{t("eyebrow")}</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-[-.055em] sm:text-7xl">{t("title")}</h1>
        </div>
      </section>

      <section className="border-b border-[var(--line)] bg-white px-5 py-12 lg:px-8 lg:py-14">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-start lg:gap-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-[var(--platinum)]">{t("howToStart")}</p>
            <p className="mt-4 text-lg leading-8 text-neutral-700">{t("howToStartBody")}</p>
            <p className="mt-4 text-sm text-neutral-500">
              {t("updated", { date: formatUpdated(buyUpdatedAt, locale), name: siteConfig.name })}
            </p>
          </div>
          <div className="rounded-3xl border border-[var(--line)] bg-[var(--navy-soft)] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-[var(--navy)]">{t("directAnswer")}</p>
            <p className="mt-4 text-lg leading-8 text-[var(--ink)]">{buyDirectAnswer}</p>
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
              <li key={item} className="flex gap-3 text-lg leading-8 text-neutral-700">
                <CheckCircle2 className="mt-1 size-5 shrink-0 text-[var(--navy)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-14">
          <h2 className="text-3xl font-semibold tracking-[-.03em]">{t("steps")}</h2>
          <Stagger className="mt-8 grid gap-5 md:grid-cols-2">
            {buySteps.map((step, index) => (
              <article key={step.title} className="rounded-3xl border border-[var(--line)] bg-white p-7">
                <small className="text-[var(--platinum)]">0{index + 1}</small>
                <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 leading-7 text-neutral-600">{step.text}</p>
              </article>
            ))}
          </Stagger>
        </Reveal>

        <Reveal className="mt-14 rounded-3xl border border-[var(--line)] bg-[var(--navy-soft)] p-8">
          <p className="text-xs font-semibold uppercase tracking-[.2em] text-[var(--navy)]">{t("directAnswer")}</p>
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
              <li key={item} className="flex gap-3 text-lg leading-8 text-neutral-700">
                <XCircle className="mt-1 size-5 shrink-0 text-neutral-400" />
                <span>{item}</span>
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
                className="group rounded-3xl border border-[var(--line)] bg-white p-7 transition hover:-translate-y-0.5 hover:border-[var(--navy)]"
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
                  className="group overflow-hidden rounded-3xl border border-[var(--line)] bg-white transition hover:-translate-y-0.5 hover:border-[var(--navy)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[var(--navy-soft)]">
                    <Image
                      src={hood.image}
                      alt={`${hood.name} neighborhood`}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{hood.name}</h3>
                    <p className="mt-1 text-sm text-neutral-500">{hood.borough}</p>
                  </div>
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
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-[var(--navy)]"
          >
            {t("cta")} <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
