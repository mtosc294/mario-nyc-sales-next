export const siteConfig = {
  siteUrl: "https://mariotoscano.com",
  name: "Mario Toscano",
  jobTitle: "Licensed Real Estate Salesperson",
  email: "mario@sefirotrealestate.com",
  phone: "+1 (267) 644-2006",
  phoneHref: "tel:+12676442006",
  emailHref: "mailto:mario@sefirotrealestate.com",
  /** Set when available; omit from UI while empty */
  licenseNumber: "" as string,
  areaServed: ["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island"] as const,
  description:
    "NYC sales guidance for owners, buyers, and investors—neighborhood answers, seller strategy, and a clear next step.",
} as const;

export function absoluteUrl(path = "/"): string {
  const base = siteConfig.siteUrl.replace(/\/$/, "");
  if (!path || path === "/") return `${base}/`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function licenseLabel(): string | null {
  const n = siteConfig.licenseNumber?.trim();
  return n ? `License ${n}` : null;
}

export function advisorSubtitle(): string {
  return siteConfig.jobTitle;
}
