import type { MetadataRoute } from "next";
import { guides } from "@/lib/guides";
import { neighborhoods } from "@/lib/neighborhoods";
import { absoluteUrl } from "@/lib/site-config";
import { routing } from "@/i18n/routing";

function localizedEntry(
  path: string,
  options: {
    lastModified: Date;
    changeFrequency: "weekly" | "monthly";
    priority: number;
  },
): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => {
    const localizedPath = path === "/" ? `/${locale}` : `/${locale}${path}`;
    return {
      url: absoluteUrl(localizedPath),
      lastModified: options.lastModified,
      changeFrequency: options.changeFrequency,
      priority: options.priority,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [
            l,
            absoluteUrl(path === "/" ? `/${l}` : `/${l}${path}`),
          ]),
        ),
      },
    };
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    { path: "/", changeFrequency: "weekly" as const, priority: 1 },
    { path: "/buy", changeFrequency: "monthly" as const, priority: 0.85 },
    { path: "/sell", changeFrequency: "monthly" as const, priority: 0.85 },
    { path: "/invest", changeFrequency: "monthly" as const, priority: 0.85 },
    { path: "/neighborhoods", changeFrequency: "weekly" as const, priority: 0.9 },
  ];

  return [
    ...staticPaths.flatMap(({ path, changeFrequency, priority }) =>
      localizedEntry(path, {
        lastModified: new Date("2026-09-10"),
        changeFrequency,
        priority,
      }),
    ),
    ...neighborhoods.flatMap(({ slug, updatedAt }) =>
      localizedEntry(`/neighborhoods/${slug}`, {
        lastModified: new Date(updatedAt),
        changeFrequency: "monthly",
        priority: 0.8,
      }),
    ),
    ...guides.flatMap((guide) =>
      localizedEntry(`/guides/${guide.slug}`, {
        lastModified: new Date(guide.updatedAt),
        changeFrequency: "monthly",
        priority: 0.75,
      }),
    ),
  ];
}
