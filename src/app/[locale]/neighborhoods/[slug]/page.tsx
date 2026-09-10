import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { guides } from "@/lib/guides";
import { ctaHref, ctaLabel, getNeighborhood, neighborhoods } from "@/lib/neighborhoods";
import { absoluteUrl } from "@/lib/site-config";
import { breadcrumbJsonLd, metaDescription, pageAlternates } from "@/lib/seo";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { FaqAccordion } from "@/components/motion/faq-accordion";
import { TypeHero } from "@/components/type-hero";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return neighborhoods.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const hood = getNeighborhood(slug);
  if (!hood) return {};
  return {
    title: `${hood.name} Real Estate Guide`,
    description: metaDescription(hood.directAnswer),
    alternates: pageAlternates(locale, `/neighborhoods/${slug}`),
    openGraph: {
      title: `${hood.name} Real Estate | ${hood.borough}, NYC`,
      description: metaDescription(hood.directAnswer),
    },
  };
}

function formatUpdated(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function NeighborhoodPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const hood = getNeighborhood(slug);
  if (!hood) notFound();

  const relatedHoods = hood.relatedNeighborhoods
    .map((relatedSlug) => getNeighborhood(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const relatedGuideList = hood.relatedGuides
    .map((guideSlug) => guides.find((guide) => guide.slug === guideSlug))
    .filter((item): item is (typeof guides)[number] => Boolean(item));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Place",
        "@id": `${absoluteUrl(`/neighborhoods/${hood.slug}`)}#place`,
        name: hood.name,
        description: hood.summary,
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: `${hood.borough}, New York City`,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${absoluteUrl(`/neighborhoods/${hood.slug}`)}#faq`,
        mainEntity: hood.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
      {
        "@type": "Article",
        headline: `${hood.name} Real Estate Guide`,
        description: hood.summary,
        dateModified: hood.updatedAt,
        author: { "@type": "Person", name: hood.author },
        about: { "@id": `${absoluteUrl(`/neighborhoods/${hood.slug}`)}#place` },
      },
      breadcrumbJsonLd(locale, [
        { name: "Home", path: "/" },
        { name: "Neighborhoods", path: "/neighborhoods" },
        { name: hood.name, path: `/neighborhoods/${hood.slug}` },
      ]),
    ],
  };

  return (
    <main className="bg-[var(--paper)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <TypeHero
        kicker={`${hood.borough} neighborhood guide`}
        title={hood.name}
        dek={hood.summary}
      />

      <section className="border-b border-[var(--line)] bg-white px-5 py-8 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <PageBreadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/neighborhoods", label: "Neighborhoods" },
              { href: `/neighborhoods/${hood.slug}`, label: hood.name },
            ]}
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-[1.2fr_.8fr] lg:px-8">
        <div>
          <div className="border-t border-[var(--line)] pt-8">
            <p className="kicker text-navy">Direct answer</p>
            <p className="mt-3 text-sm text-neutral-500">
              Updated {formatUpdated(hood.updatedAt)} · Reviewed by {hood.author}
            </p>
            <p className="mt-4 text-lg leading-8 text-ink">{hood.directAnswer}</p>
          </div>

          <Reveal as="div" className="mt-14">
            <h2 className="text-3xl font-semibold tracking-[-.03em]">What this market is</h2>
            <p className="mt-5 text-lg leading-8 text-neutral-700">{hood.definition}</p>
          </Reveal>

          <div className="mt-14">
            <h2 className="text-3xl font-semibold tracking-[-.03em]">Who it fits</h2>
            <Stagger as="ul" className="mt-6 grid gap-3">
              {hood.whoItFits.map((item) => (
                <li key={item} className="border-t border-[var(--line)] pt-3 leading-7 text-neutral-700">
                  {item}
                </li>
              ))}
            </Stagger>
          </div>

          <Reveal as="div" className="mt-14">
            <h2 className="text-3xl font-semibold tracking-[-.03em]">Property types</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {hood.propertyTypes.map((item) => (
                <li key={item} className="border-t border-[var(--line)] pt-3 font-medium text-ink">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-14">
            <h2 className="text-3xl font-semibold tracking-[-.03em]">NYC-specific steps</h2>
            <Stagger as="ol" className="mt-6 list-none divide-y border-y border-[var(--line)] p-0">
              {hood.steps.map((step, index) => (
                <li key={step} className="grid gap-2 py-5 sm:grid-cols-[4rem_1fr]">
                  <span className="kicker text-navy">0{index + 1}</span>
                  <p className="leading-7 text-neutral-700">{step}</p>
                </li>
              ))}
            </Stagger>
          </div>

          <Reveal as="div" className="mt-14">
            <h2 className="text-3xl font-semibold tracking-[-.03em]">Common mistakes</h2>
            <ul className="mt-6 grid gap-3">
              {hood.commonMistakes.map((item) => (
                <li key={item} className="border-t border-[var(--line)] pt-3 leading-7 text-neutral-700">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="div" className="mt-14">
            <h2 className="mb-6 text-3xl font-semibold tracking-[-.03em]">Frequently asked questions</h2>
            <FaqAccordion items={hood.faqs} />
          </Reveal>

          <Reveal as="div" className="mt-14">
            <h2 className="text-3xl font-semibold tracking-[-.03em]">Sources</h2>
            <ul className="mt-6 grid gap-4">
              {hood.sources.map((source) => (
                <li key={source.label} className="rounded-2xl border border-[var(--line)] bg-white p-5">
                  <p className="font-semibold text-ink">{source.label}</p>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{source.note}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-6 text-neutral-500">
              Educational information for {hood.name}, {hood.borough}, NYC. Not legal, tax, financial, or brokerage
              advice. Updated {formatUpdated(hood.updatedAt)} by {hood.author}.
            </p>
          </Reveal>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-none border border-[var(--line)] bg-[var(--navy)] p-7 text-white">
            <p className="kicker">How to read this market</p>
            <p className="mt-4 text-sm leading-6 text-white/70">{hood.methodologyNote}</p>
            <p className="mt-4 text-xs leading-5 text-platinum">
              {hood.medianLabel} — indicative context only, not a live comp set.
            </p>
            <Link
              href={ctaHref(hood.primaryCta)}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-navy"
            >
              {ctaLabel(hood.primaryCta, hood.name)} <ArrowRight className="size-4" />
            </Link>
          </div>

          {relatedGuideList.length > 0 && (
            <Reveal className="rounded-3xl border border-[var(--line)] bg-white p-7">
              <p className="text-xs font-semibold uppercase tracking-[.2em] text-platinum">Related guides</p>
              <ul className="mt-5 grid gap-3">
                {relatedGuideList.map((guide) => (
                  <li key={guide.slug}>
                    <Link
                      href={`/guides/${guide.slug}`}
                      className="group flex items-center justify-between gap-3 font-medium text-ink"
                    >
                      <span>{guide.title}</span>
                      <ArrowRight className="size-4 shrink-0 transition group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {relatedHoods.length > 0 && (
            <Reveal className="rounded-3xl border border-[var(--line)] bg-white p-7">
              <p className="text-xs font-semibold uppercase tracking-[.2em] text-platinum">
                Related neighborhoods
              </p>
              <ul className="mt-5 grid gap-3">
                {relatedHoods.map((related) => (
                  <li key={related.slug}>
                    <Link
                      href={`/neighborhoods/${related.slug}`}
                      className="group flex items-center justify-between gap-3"
                    >
                      <span>
                        <span className="block font-medium text-ink">{related.name}</span>
                        <span className="text-sm text-neutral-500">{related.borough}</span>
                      </span>
                      <ArrowRight className="size-4 shrink-0 transition group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/neighborhoods"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink"
              >
                All NYC neighborhoods <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          )}
        </aside>
      </section>
    </main>
  );
}
