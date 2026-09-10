import type { ReactNode } from "react";
import { IBM_Plex_Sans, Newsreader } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@/components/analytics";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { absoluteUrl, siteConfig } from "@/lib/site-config";
import { pageAlternates, personJsonLd } from "@/lib/seo";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: { default: t("titleDefault"), template: `%s | ${siteConfig.name}` },
    description: t("description"),
    alternates: pageAlternates(locale, "/"),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": absoluteUrl(`/${locale}#website`),
        url: absoluteUrl(`/${locale}`),
        name: `${siteConfig.name} NYC Real Estate`,
        description: siteConfig.description,
        inLanguage: locale,
        publisher: { "@id": absoluteUrl(`/${locale}#business`) },
      },
      personJsonLd(locale),
      {
        "@type": "RealEstateAgent",
        "@id": absoluteUrl(`/${locale}#business`),
        name: `${siteConfig.name} NYC Real Estate`,
        url: absoluteUrl(`/${locale}`),
        email: siteConfig.email,
        telephone: siteConfig.phone,
        areaServed: [
          {
            "@type": "City",
            name: "New York City",
            containedInPlace: { "@type": "State", name: "New York" },
          },
          ...siteConfig.areaServed.map((name) => ({
            "@type": "AdministrativeArea",
            name,
          })),
        ],
        employee: { "@id": absoluteUrl(`/${locale}#mario`) },
        description: siteConfig.jobTitle,
      },
    ],
  };

  return (
    <html lang={locale} className={cn(plexSans.variable, newsreader.variable)} suppressHydrationWarning>
      <body>
        <Analytics />
        <NextIntlClientProvider messages={messages}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <SiteHeader />
          <div className="pt-[72px]">{children}</div>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
