import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: { default: `${siteConfig.name} | NYC Sales Advisor`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} | NYC Sales Advisor`,
    description: siteConfig.description,
    type: "website",
    locale: "en_US",
    url: absoluteUrl("/"),
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
