import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@/components/analytics";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { absoluteUrl, siteConfig } from "@/lib/site-config";
import { routing } from "@/i18n/routing";

type Props = {
  children: React.ReactNode;
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
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, absoluteUrl(`/${l}`)]),
      ),
    },
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
      },
      {
        "@type": "Person",
        "@id": absoluteUrl(`/${locale}#mario`),
        name: siteConfig.name,
        jobTitle: siteConfig.jobTitle,
        url: absoluteUrl(`/${locale}`),
        email: siteConfig.email,
        telephone: siteConfig.phone,
        worksFor: { "@id": absoluteUrl(`/${locale}#business`) },
      },
      {
        "@type": "RealEstateAgent",
        "@id": absoluteUrl(`/${locale}#business`),
        name: `${siteConfig.name} NYC Real Estate`,
        url: absoluteUrl(`/${locale}`),
        email: siteConfig.email,
        telephone: siteConfig.phone,
        areaServed: siteConfig.areaServed.map((name) => ({
          "@type": "AdministrativeArea",
          name,
        })),
        employee: { "@id": absoluteUrl(`/${locale}#mario`) },
        description: `Licensed Real Estate Salesperson sponsored by ${siteConfig.brokerage}.`,
      },
    ],
  };

  return (
    <html lang={locale} suppressHydrationWarning>
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
