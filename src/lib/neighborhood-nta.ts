import { neighborhoods } from "./neighborhoods";

/**
 * Curated DCP NTA 2020 codes (nta2020) per live guide slug.
 * NTAs are census tabulation units, not StreetEasy marketing borders.
 */
export const neighborhoodNtaCodes: Record<string, readonly string[]> = {
  // Includes Battery Park City in the same DCP NTA.
  "financial-district": ["MN0101"],
  // Includes Roosevelt Island in Lenox Hill–Roosevelt Island NTA.
  "upper-east-side": ["MN0801", "MN0802", "MN0803"],
  "upper-west-side": ["MN0701", "MN0702", "MN0703"],
  // Includes Hudson Yards.
  chelsea: ["MN0401"],
  "midtown-east": ["MN0604"],
  // Includes Civic Center.
  tribeca: ["MN0102"],
  // Union of Williamsburg, East Williamsburg, and South Williamsburg NTAs.
  williamsburg: ["BK0102", "BK0103", "BK0104"],
  // South Slope is a separate NTA (Windsor Terrace–South Slope) and is not included.
  "park-slope": ["BK0602"],
  "brooklyn-heights": ["BK0201"],
  greenpoint: ["BK0101"],
  bushwick: ["BK0401", "BK0402"],
  // DCP NTA also includes DUMBO and Boerum Hill.
  "downtown-brooklyn": ["BK0202"],
  // Core Hunters Point plus Dutch Kills / Queensbridge / Ravenswood, commonly searched as LIC.
  "long-island-city": ["QN0201", "QN0105"],
  // Omits Astoria Park NTA. Astoria (East)–Woodside (North) is mixed with Woodside.
  astoria: ["QN0101", "QN0102", "QN0103", "QN0104"],
  "forest-hills": ["QN0602"],
  // Includes Willets Point, East Flushing, and Broadway Flushing / Murray Hill (Queens).
  flushing: ["QN0704", "QN0705", "QN0707"],
  // Includes Spuyten Duyvil.
  riverdale: ["BX0803"],
  // Includes Port Morris.
  "mott-haven": ["BX0101"],
  // Includes New Brighton.
  "st-george": ["SI0101"],
};

const assignedCodes = Object.values(neighborhoodNtaCodes).flat();

export function assertEverySlugMapped(): void {
  const slugs = neighborhoods.map((hood) => hood.slug);
  const missing = slugs.filter((slug) => !neighborhoodNtaCodes[slug]?.length);
  const extra = Object.keys(neighborhoodNtaCodes).filter((slug) => !slugs.includes(slug));
  const dupes = assignedCodes.filter((code, index) => assignedCodes.indexOf(code) !== index);
  if (missing.length || extra.length || dupes.length) {
    throw new Error(
      [
        missing.length ? `NTA mapping missing slugs: ${missing.join(", ")}` : "",
        extra.length ? `NTA mapping extra slugs: ${extra.join(", ")}` : "",
        dupes.length ? `NTA codes assigned twice: ${dupes.join(", ")}` : "",
      ]
        .filter(Boolean)
        .join(" "),
    );
  }
}

assertEverySlugMapped();
