import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { guides } from "@/lib/guides";
import { ctaHref, ctaLabel, getNeighborhood, neighborhoods } from "@/lib/neighborhoods";
import { absoluteUrl } from "@/lib/site-config";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { FaqAccordion } from "@/components/motion/faq-accordion";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return neighborhoods.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const hood = getNeighborhood(slug);
  if (!hood) return {};
  return {
    title: `${hood.name} Real Estate Guide`,
    description: hood.directAnswer.slice(0, 155),
    openGraph: {
      title: `${hood.name} Real Estate | ${hood.borough}, NYC`,
      description: hood.summary,
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
    ],
  };

  return (
    <main className="bg-[var(--paper)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative -mt-[72px] min-h-[calc(560px+72px)] overflow-hidden bg-[var(--navy)] text-white">
        <Image src={hood.image} alt={`${hood.name} illustrated skyline`} fill priority className="object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)] via-[color-mix(in_srgb,var(--navy)_55%,transparent)] to-transparent" />
        <div className="relative mx-auto flex min-h-[calc(560px+72px)] max-w-6xl items-end px-5 pb-16 pt-36 lg:px-8">
          <div>
            <p className="text-xs uppercase tracking-[.2em] text-[var(--platinum)]">
              {hood.borough} neighborhood guide
            </p>
            <h1 className="mt-4 text-5xl font-semibold tracking-[-.055em] sm:text-7xl">{hood.name}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">{hood.summary}</p>
            <p className="mt-4 text-sm text-white/50">
              Updated {formatUpdated(hood.updatedAt)} · Reviewed by {hood.author}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-[1.2fr_.8fr] lg:px-8">
        <div>
          <Reveal className="rounded-3xl border border-[var(--line)] bg-[var(--navy-soft)] p-8">
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-[var(--navy)]">Direct answer</p>
            <p className="mt-4 text-lg leading-8 text-[var(--ink)]">{hood.directAnswer}</p>
          </Reveal>

          <Reveal as="div" className="mt-14">
            <h2 className="text-3xl font-semibold tracking-[-.03em]">What this market is</h2>
            <p className="mt-5 text-lg leading-8 text-neutral-700">{hood.definition}</p>
          </Reveal>

          <div className="mt-14">
            <h2 className="text-3xl font-semibold tracking-[-.03em]">Who it fits</h2>
            <Stagger as="ul" className="mt-6 grid gap-3">
              {hood.whoItFits.map((item) => (
                <li key={item} className="flex gap-3 rounded-2xl border border-[var(--line)] bg-white p-5">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[var(--navy)]" />
                  <p className="leading-7 text-neutral-700">{item}</p>
                </li>
              ))}
            </Stagger>
          </div>

          <Reveal as="div" className="mt-14">
            <h2 className="text-3xl font-semibold tracking-[-.03em]">Property types</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {hood.propertyTypes.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-[var(--line)] bg-white p-5 font-medium text-[var(--ink)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-14">
            <h2 className="text-3xl font-semibold tracking-[-.03em]">NYC-specific steps</h2>
            <Stagger as="ol" className="mt-6 grid gap-4">
              {hood.steps.map((step, index) => (
                <li key={step} className="flex gap-4 rounded-2xl border border-[var(--line)] bg-white p-5">
                  <span className="text-sm font-semibold text-[var(--platinum)]">0{index + 1}</span>
                  <p className="leading-7 text-neutral-700">{step}</p>
                </li>
              ))}
            </Stagger>
          </div>

          <Reveal as="div" className="mt-14">
            <h2 className="text-3xl font-semibold tracking-[-.03em]">Common mistakes</h2>
            <ul className="mt-6 grid gap-3">
              {hood.commonMistakes.map((item) => (
                <li key={item} className="flex gap-3 rounded-2xl border border-[var(--line)] bg-white p-5">
                  <XCircle className="mt-0.5 size-5 shrink-0 text-[var(--navy)]" />
                  <p className="leading-7 text-neutral-700">{item}</p>
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
                  <p className="font-semibold text-[var(--ink)]">{source.label}</p>
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
          <div className="rounded-3xl bg-[var(--navy)] p-7 text-white">
            <p className="text-xs uppercase tracking-[.2em] text-[var(--platinum)]">Market snapshot</p>
            <strong className="mt-4 block text-3xl">{hood.medianLabel}</strong>
            <p className="mt-3 text-sm leading-6 text-white/55">{hood.methodologyNote}</p>
            <Link
              href={ctaHref(hood.primaryCta)}
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-[var(--platinum)]/40 bg-white px-5 py-3 text-sm font-semibold text-[var(--navy)] transition hover:-translate-y-0.5"
            >
              {ctaLabel(hood.primaryCta, hood.name)} <ArrowRight className="size-4" />
            </Link>
          </div>

          {relatedGuideList.length > 0 && (
            <Reveal className="rounded-3xl border border-[var(--line)] bg-white p-7">
              <p className="text-xs font-semibold uppercase tracking-[.2em] text-[var(--platinum)]">Related guides</p>
              <ul className="mt-5 grid gap-3">
                {relatedGuideList.map((guide) => (
                  <li key={guide.slug}>
                    <Link
                      href={`/guides/${guide.slug}`}
                      className="group flex items-center justify-between gap-3 font-medium text-[var(--ink)]"
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
              <p className="text-xs font-semibold uppercase tracking-[.2em] text-[var(--platinum)]">
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
                        <span className="block font-medium text-[var(--ink)]">{related.name}</span>
                        <span className="text-sm text-neutral-500">{related.borough}</span>
                      </span>
                      <ArrowRight className="size-4 shrink-0 transition group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/neighborhoods"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--ink)]"
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
