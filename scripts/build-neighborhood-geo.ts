import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as turf from "@turf/turf";
import { neighborhoods } from "../src/lib/neighborhoods.ts";
import { assertEverySlugMapped, neighborhoodNtaCodes } from "../src/lib/neighborhood-nta.ts";

const NTA_URL = "https://data.cityofnewyork.us/resource/9nt8-h7nd.geojson?$limit=400";
const OUT_FILE = path.join(path.dirname(fileURLToPath(import.meta.url)), "../public/geo/nyc-territory.json");

type NtaProps = { nta2020?: string; ntaname?: string };
type Poly = GeoJSON.Feature<GeoJSON.Polygon | GeoJSON.MultiPolygon, Record<string, unknown>>;

function asPoly(feature: GeoJSON.Feature): Poly | null {
  if (!feature.geometry) return null;
  if (feature.geometry.type !== "Polygon" && feature.geometry.type !== "MultiPolygon") return null;
  return feature as Poly;
}

function dissolve(features: Poly[]): Poly {
  if (features.length === 0) throw new Error("Cannot dissolve zero features");
  if (features.length === 1) return features[0]!;
  const unioned = turf.union(turf.featureCollection(features));
  if (!unioned) throw new Error("turf.union returned null");
  return unioned as Poly;
}

function simplifyFeature(feature: Poly): Poly {
  return turf.simplify(feature, { tolerance: 0.00035, highQuality: true, mutate: false }) as Poly;
}

async function main() {
  assertEverySlugMapped();

  const response = await fetch(NTA_URL);
  if (!response.ok) throw new Error(`Failed to download NTAs: ${response.status}`);
  const raw = (await response.json()) as GeoJSON.FeatureCollection;
  const byCode = new Map<string, Poly>();
  for (const feature of raw.features) {
    const poly = asPoly(feature);
    const code = (feature.properties as NtaProps | null)?.nta2020;
    if (!poly || !code) continue;
    byCode.set(code, poly);
  }

  const used = new Set<string>();
  const live: GeoJSON.Feature[] = [];

  for (const [slug, codes] of Object.entries(neighborhoodNtaCodes)) {
    const hood = neighborhoods.find((item) => item.slug === slug);
    if (!hood) throw new Error(`No neighborhood record for ${slug}`);
    const parts: Poly[] = [];
    for (const code of codes) {
      const feature = byCode.get(code);
      if (!feature) throw new Error(`NTA ${code} not in DCP download (slug ${slug})`);
      if (used.has(code)) throw new Error(`NTA ${code} assigned to more than one slug`);
      used.add(code);
      parts.push(feature);
    }
    const dissolved = simplifyFeature(dissolve(parts));
    live.push({
      type: "Feature",
      id: slug,
      properties: {
        kind: "live",
        slug,
        name: hood.name,
        borough: hood.borough,
      },
      geometry: dissolved.geometry,
    });
  }

  const ghost: GeoJSON.Feature[] = [];
  for (const [code, feature] of byCode) {
    if (used.has(code)) continue;
    const simplified = simplifyFeature(feature);
    const name = (feature.properties as NtaProps).ntaname ?? code;
    ghost.push({
      type: "Feature",
      id: code,
      properties: { kind: "ghost", nta2020: code, name },
      geometry: simplified.geometry,
    });
  }

  const collection: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: [...ghost, ...live],
  };

  await mkdir(path.dirname(OUT_FILE), { recursive: true });
  const json = JSON.stringify(collection);
  await writeFile(OUT_FILE, json);
  const kb = Math.round(Buffer.byteLength(json) / 1024);
  console.log(`Wrote ${OUT_FILE} (${live.length} live, ${ghost.length} ghost, ${kb} KB)`);
  if (kb > 450) {
    console.warn(`Warning: geojson is ${kb} KB; plan target is ~400 KB.`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
