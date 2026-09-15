"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { boroughs, type Borough, type Neighborhood } from "@/lib/neighborhoods";
import { cn } from "@/lib/utils";
import "@/lib/neighborhood-nta";

const NeighborhoodTerritoryMap = dynamic(
  () => import("@/components/neighborhood-territory-map").then((mod) => mod.NeighborhoodTerritoryMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[min(70vh,720px)] w-full border border-[var(--line)] bg-[var(--paper)]" aria-hidden />
    ),
  },
);

type AtlasHood = Pick<Neighborhood, "slug" | "name" | "borough" | "summary">;

type Props = {
  hoods: AtlasHood[];
};

export function NeighborhoodsAtlas({ hoods }: Props) {
  const router = useRouter();
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [camera, setCamera] = useState<{ target: Borough | "all"; nonce: number }>({
    target: "all",
    nonce: 0,
  });

  const byBorough = useMemo(() => {
    return boroughs.map((borough) => ({
      borough,
      hoods: hoods.filter((hood) => hood.borough === borough),
    }));
  }, [hoods]);

  const active = hoods.find((hood) => hood.slug === activeSlug) ?? null;
  const liveCount = hoods.length;

  function frame(target: Borough | "all") {
    setCamera((current) => ({ target, nonce: current.nonce + 1 }));
  }

  return (
    <div>
      <a
        href="#neighborhood-index"
        className="mb-6 inline-block text-sm text-neutral-500 underline-offset-4 hover:text-navy hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--navy)]"
      >
        Skip map, view neighborhood index
      </a>

      <p className="kicker">Territory</p>
      <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <p className="max-w-[36em] text-lg leading-8 text-neutral-700">
          NYC as these guides cover it. Hover a live area for the neighborhood; click through to the answer page.
        </p>
        <p className="text-sm text-neutral-500">{liveCount} guides live</p>
      </div>

      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--line)] pt-6">
        <button
          type="button"
          onClick={() => frame("all")}
          className={cn(
            "font-display text-xl tracking-[-0.03em] transition hover:text-navy",
            camera.target === "all" ? "text-navy" : "text-ink",
          )}
        >
          All NYC
        </button>
        {boroughs.map((borough) => (
          <button
            key={borough}
            type="button"
            onClick={() => frame(borough)}
            className={cn(
              "font-display text-xl tracking-[-0.03em] transition hover:text-navy",
              camera.target === borough ? "text-navy" : "text-ink",
            )}
          >
            {borough}
          </button>
        ))}
      </div>

      <div
        id="neighborhood-atlas"
        role="region"
        aria-label="NYC neighborhood territory map"
        className="mt-6"
      >
        <NeighborhoodTerritoryMap
          activeSlug={activeSlug}
          camera={camera}
          onActiveSlug={setActiveSlug}
          onNavigate={(slug) => router.push(`/neighborhoods/${slug}`)}
        />
      </div>

      <div className="mt-5 min-h-[5.5rem]" aria-live="polite">
        {active ? (
          <div>
            <p className="kicker text-navy">{active.borough}</p>
            <p className="mt-2 font-display text-2xl">{active.name}</p>
            <p className="mt-2 max-w-[40em] text-sm leading-6 text-neutral-600">{active.summary}</p>
            <Link
              href={`/neighborhoods/${active.slug}`}
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold"
            >
              Open guide <ArrowRight className="size-4" />
            </Link>
          </div>
        ) : (
          <p className="text-sm leading-6 text-neutral-500">
            Hover a neighborhood on desktop. On a phone, tap once to select, tap again or open the guide.
          </p>
        )}
      </div>
      <p className="mt-4 text-xs leading-5 text-neutral-500">
        Boundaries are NYC DCP Neighborhood Tabulation Areas (2020), indicative—not listing search or MLS. Guides are
        editorial. Unshaded areas are not yet covered.
      </p>

      <div id="neighborhood-index" className="mt-16 border-t border-[var(--line)] pt-10">
        <p className="kicker">Index</p>
        <div className="mt-8 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {byBorough.map(({ borough, hoods: group }) => (
            <div key={`index-${borough}`}>
              <h2 className="font-display text-2xl">{borough}</h2>
              <ul className="mt-4 grid gap-2">
                {group.map((hood) => (
                  <li key={hood.slug}>
                    <Link
                      href={`/neighborhoods/${hood.slug}`}
                      onMouseEnter={() => setActiveSlug(hood.slug)}
                      onMouseLeave={() => setActiveSlug(null)}
                      onFocus={() => setActiveSlug(hood.slug)}
                      onBlur={() => setActiveSlug(null)}
                      className={cn(
                        "text-neutral-700 hover:underline",
                        activeSlug === hood.slug && "text-navy underline",
                      )}
                    >
                      {hood.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
