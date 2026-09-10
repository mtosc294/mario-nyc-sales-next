import { routing } from "@/i18n/routing";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

export function metaDescription(text: string, max = 155): string {
  const compact = text.trim().replace(/\s+/g, " ");
  if (compact.length <= max) return compact;
  const cut = compact.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 80 ? lastSpace : max - 1)}…`;
}

/** Locale + x-default hreflang for a path like `/buy` or `/`. */
export function pageAlternates(locale: string, path: string) {
  const suffix = path === "/" ? "" : path;
  return {
    canonical: absoluteUrl(`/${locale}${suffix}`),
    languages: {
      ...Object.fromEntries(routing.locales.map((l) => [l, absoluteUrl(`/${l}${suffix}`)])),
      "x-default": absoluteUrl(`/en${suffix}`),
    },
  };
}

export function breadcrumbJsonLd(
  locale: string,
  crumbs: { name: string; path: string }[],
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(`/${locale}${crumb.path === "/" ? "" : crumb.path}`),
    })),
  };
}

export function personJsonLd(locale: string) {
  return {
    "@type": "Person",
    "@id": absoluteUrl(`/${locale}#mario`),
    name: siteConfig.name,
    jobTitle: siteConfig.jobTitle,
    url: absoluteUrl(`/${locale}`),
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "New York",
      addressRegion: "NY",
      addressCountry: "US",
    },
  };
}
