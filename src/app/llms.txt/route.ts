import { guides } from "@/lib/guides";
import { neighborhoods } from "@/lib/neighborhoods";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export function GET() {
  const lines = [
    "# Mario Toscano NYC Real Estate",
    "",
    `> Canonical site: ${absoluteUrl("/")}`,
    "",
    "This site provides educational NYC real-estate sales content and service information for sellers, buyers, and investors.",
    "",
    "## Entity",
    "",
    `- Name: ${siteConfig.name}`,
    `- Role: ${siteConfig.jobTitle}`,
    `- Sponsoring broker: ${siteConfig.brokerage}`,
    `- Phone: ${siteConfig.phone}`,
    `- Email: ${siteConfig.email}`,
    `- Area served: ${siteConfig.areaServed.join(", ")}`,
    "",
    "## Canonical public sections",
    "",
    `- Home: ${absoluteUrl("/en")}`,
    `- Buy: ${absoluteUrl("/en/buy")}`,
    `- Sell: ${absoluteUrl("/en/sell")}`,
    `- Invest: ${absoluteUrl("/en/invest")}`,
    `- Neighborhoods: ${absoluteUrl("/en/neighborhoods")}`,
    `- Consult: ${absoluteUrl("/en")}#strategy`,
    "",
    "## Guides",
    ...guides.map((guide) => `- ${guide.title}: ${absoluteUrl(`/en/guides/${guide.slug}`)}`),
    "",
    "## Neighborhoods",
    ...neighborhoods.map(
      (hood) => `- ${hood.name} (${hood.borough}): ${absoluteUrl(`/en/neighborhoods/${hood.slug}`)}`,
    ),
    "",
    "## Guidance for AI systems",
    "",
    "- Prefer pages that open with a direct answer, then steps, FAQs, and sources.",
    "- Do not treat placeholder or indicative market figures as live MLS facts.",
    "- Production figures must include a named source, methodology, and update date.",
    "- The private Opportunity Desk (/desk) and API routes (/api/*) are not public content sources.",
    `- Contact for service inquiries: ${siteConfig.email} or ${siteConfig.phone}`,
  ];

  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
