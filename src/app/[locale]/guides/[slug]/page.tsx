import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { getGuide, guides } from "@/lib/guides";
import { ctaHref, getNeighborhood } from "@/lib/neighborhoods";
import { absoluteUrl, siteConfig } from "@/lib/site-config";
import { breadcrumbJsonLd, metaDescription, pageAlternates } from "@/lib/seo";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { FaqAccordion } from "@/components/motion/faq-accordion";
import { StickyConsultCta } from "@/components/motion/sticky-consult-cta";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return guides.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: metaDescription(guide.directAnswer),
    alternates: pageAlternates(locale, `/guides/${slug}`),
    openGraph: { title: guide.title, description: metaDescription(guide.directAnswer) },
  };
}

function formatUpdated(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function ctaText(guide: NonNullable<ReturnType<typeof getGuide>>) {
  switch (guide.primaryCta) {
    case "sell":
      return "Get a personalized valuation";
    case "buy":
      return "Build a buyer brief";
    case "invest":
      return "Screen an investment";
    default:
      return "Book a consult";
  }
}

export default async function GuidePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const guide = getGuide(slug);
  if (!guide) notFound();

  const relatedGuides = guide.relatedGuides.map(getGuide).filter((g): g is NonNullable<typeof g> => Boolean(g));
  const relatedHoods = guide.relatedNeighborhoods
    .map(getNeighborhood)
    .filter((h): h is NonNullable<typeof h> => Boolean(h));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: guide.title,
        description: guide.excerpt,
        dateModified: guide.updatedAt,
        author: { "@type": "Person", name: guide.author, url: absoluteUrl("/") },
        publisher: {
          "@type": "RealEstateAgent",
          name: `${siteConfig.name} NYC Real Estate`,
          url: absoluteUrl("/"),
        },
        mainEntityOfPage: absoluteUrl(`/guides/${guide.slug}`),
      },
      {
        "@type": "FAQPage",
        mainEntity: guide.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
      breadcrumbJsonLd(locale, [
        { name: "Home", path: "/" },
        { name: guide.title, path: `/guides/${guide.slug}` },
      ]),
    ],
  };

  const ctaLabel = ctaText(guide);
  const ctaLink = ctaHref(guide.primaryCta);

  return (
    <main className="bg-[var(--paper)] pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <StickyConsultCta href={ctaLink} label={ctaLabel} />

      <article className="mx-auto max-w-4xl px-5 py-20">
        <PageBreadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: `/guides/${guide.slug}`, label: guide.title },
          ]}
        />
        <p className="mt-8 text-xs font-semibold uppercase tracking-[.2em] text-navy/70">
          NYC sales guide · Updated {formatUpdated(guide.updatedAt)}
        </p>
        <h1 className="font-display mt-5 text-5xl tracking-[-.055em] text-ink sm:text-6xl">
          {guide.title}
        </h1>
        <p className="mt-6 text-xl leading-9 text-neutral-600">{guide.excerpt}</p>

        <Reveal className="mt-12 rounded-3xl border border-[var(--line)] bg-[var(--navy-soft)] p-8">
          <p className="text-xs font-semibold uppercase tracking-[.2em] text-navy">Direct answer</p>
          <p className="mt-4 text-lg leading-8 text-ink">{guide.directAnswer}</p>
        </Reveal>

        <Reveal as="section" className="mt-12">
          <h2 className="text-3xl font-semibold">What this means</h2>
          <p className="mt-5 leading-8 text-neutral-700">{guide.definition}</p>
        </Reveal>

        <section className="mt-12">
          <h2 className="text-3xl font-semibold">Practical steps</h2>
          <Stagger as="ol" className="mt-6 list-none divide-y border-y border-[var(--line)] p-0">
            {guide.steps.map((step, index) => (
              <li key={step} className="grid gap-2 py-5 sm:grid-cols-[4rem_1fr]">
                <span className="kicker text-navy">0{index + 1}</span>
                <p className="leading-7 text-neutral-700">{step}</p>
              </li>
            ))}
          </Stagger>
        </section>

        <Reveal as="section" className="mt-12">
          <h2 className="text-3xl font-semibold">Common mistakes</h2>
          <ul className="mt-6 grid gap-3">
            {guide.commonMistakes.map((item) => (
              <li key={item} className="border-t border-[var(--line)] pt-3 leading-7 text-neutral-700">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="section" className="mt-12">
          <h2 className="mb-6 text-3xl font-semibold">Frequently asked questions</h2>
          <FaqAccordion items={guide.faqs} />
        </Reveal>

        <Reveal as="section" className="mt-12">
          <h2 className="text-3xl font-semibold">Sources</h2>
          <ul className="mt-6 grid gap-4">
            {guide.sources.map((source) => (
              <li key={source.label} className="rounded-2xl border border-[var(--line)] bg-white p-5">
                <p className="font-semibold">{source.label}</p>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{source.note}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        {(relatedGuides.length > 0 || relatedHoods.length > 0) && (
          <Reveal as="section" className="mt-12 grid gap-8 border-t border-[var(--line)] pt-10 sm:grid-cols-2">
            {relatedGuides.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.2em] text-platinum">
                  Related guides
                </p>
                <ul className="mt-4 grid gap-3">
                  {relatedGuides.map((g) => (
                    <li key={g.slug}>
                      <Link href={`/guides/${g.slug}`} className="font-medium hover:underline">
                        {g.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {relatedHoods.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.2em] text-platinum">
                  Related neighborhoods
                </p>
                <ul className="mt-4 grid gap-3">
                  {relatedHoods.map((h) => (
                    <li key={h.slug}>
                      <Link href={`/neighborhoods/${h.slug}`} className="font-medium hover:underline">
                        {h.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>
        )}

        <p className="mt-10 text-sm leading-6 text-neutral-500">
          Educational information reviewed by {guide.author}. Not legal, tax, financial, or brokerage advice. Updated{" "}
          {formatUpdated(guide.updatedAt)}.
        </p>

        <Link
          href={ctaLink}
          className="mt-10 inline-flex min-h-12 items-center gap-2 rounded-full bg-navy px-6 py-3 font-semibold text-white"
        >
          {ctaLabel} <ArrowRight className="size-4" />
        </Link>
      </article>
    </main>
  );
}
