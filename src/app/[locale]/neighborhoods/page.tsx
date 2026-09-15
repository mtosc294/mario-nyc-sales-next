import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { boroughs, neighborhoods, neighborhoodsByBorough } from "@/lib/neighborhoods";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { pageAlternates } from "@/lib/seo";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { TypeHero } from "@/components/type-hero";
import { NeighborhoodsAtlas } from "@/components/neighborhoods-atlas";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "NYC Neighborhood Real Estate Guides",
    description:
      "Buyer, seller, and investor guides for neighborhoods across Manhattan, Brooklyn, Queens, the Bronx, and Staten Island—each with a direct answer, local steps, and a clear next action.",
    alternates: pageAlternates(locale, "/neighborhoods"),
  };
}

export default async function NeighborhoodsHubPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main className="bg-[var(--paper)]">
      <TypeHero kicker="All five boroughs" title="NYC neighborhood real estate guides" />

      <section className="border-b border-[var(--line)] bg-white px-5 py-8 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <PageBreadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/neighborhoods", label: "Neighborhoods" },
            ]}
          />
        </div>
      </section>

      <section className="border-b border-[var(--line)] bg-white px-5 py-12 lg:px-8 lg:py-14">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14 lg:items-start">
          <div>
            <p className="kicker">How to use this hub</p>
            <p className="mt-4 text-lg leading-8 text-neutral-700">
              Choose a neighborhood the way people actually search NYC: by borough, housing type, and goal—not a single
              citywide average. Each guide opens with a direct answer, then covers who it fits, property types, practical
              steps, common mistakes, and FAQs.
            </p>
          </div>
          <div>
            <p className="kicker text-navy">Direct answer</p>
            <p className="mt-4 text-lg leading-8 text-ink">
              The right NYC neighborhood depends on your path (buy, sell, or invest), ownership type (condo, co-op,
              townhouse, or house), commute, monthly carrying costs, and how that specific block and building compete
              today. Start with a borough, open a neighborhood guide, then convert the answer into one next
              step—valuation, buyer brief, or consult.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
        <NeighborhoodsAtlas
          hoods={neighborhoods.map((hood) => ({
            slug: hood.slug,
            name: hood.name,
            borough: hood.borough,
            summary: hood.summary,
          }))}
        />

        <div className="mt-20 grid gap-16">
          {boroughs.map((borough) => {
            const hoods = neighborhoodsByBorough(borough);
            return (
              <Reveal key={borough} id={borough.toLowerCase().replace(/\s+/g, "-")}>
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[.2em] text-platinum">{borough}</p>
                    <h2 className="mt-2 text-3xl font-semibold tracking-[-.03em]">{borough} neighborhoods</h2>
                  </div>
                    <p className="text-sm text-neutral-500">
                      {hoods.length === 1 ? "1 guide live" : `${hoods.length} guides live`}
                    </p>
                </div>
                <Stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {hoods.map((hood) => (
                    <Link
                      key={hood.slug}
                      href={`/neighborhoods/${hood.slug}`}
                      className="group border-t border-[var(--line)] pt-5"
                    >
                      <h3 className="font-display text-2xl">{hood.name}</h3>
                      <p className="mt-3 text-sm leading-6 text-neutral-600">{hood.summary}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">
                        Explore <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                      </span>
                    </Link>
                  ))}
                </Stagger>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-16 rounded-3xl border border-[var(--line)] bg-white p-8">
          <h2 className="text-2xl font-semibold">Expanding coverage</h2>
          <p className="mt-4 max-w-3xl leading-7 text-neutral-700">
            This hub is built to cover all of NYC. New neighborhoods use the same answer-page template—add data, and the
            page, sitemap, and borough grouping update automatically. Currently {neighborhoods.length} core guides are
            live across every borough.
          </p>
          <Link
            href="/#strategy"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--navy)] px-5 py-3 text-sm font-semibold text-white"
          >
            Talk through your neighborhood goals <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
