# Research summary — July 22, 2026

## Traffic benchmark

Similarweb's June 2026 U.S. real-estate category ranks Zillow, Realtor.com, Redfin, Homes.com and Apartments.com as the five most visited sites. The design lesson is not to copy their branding. It is to reuse the product mechanics that repeatedly earn discovery and repeat visits:

- Immediate search or task selection.
- Large crawlable location and property-type directories.
- Saved-search and alert concepts.
- Market data and educational content.
- Strong seller utilities.
- Clear role-based conversion paths.

StreetEasy's current homepage applies the same NYC-specific pattern: Buy/Rent search, seller tools, popular amenity filters, neighborhood guides, housing-market content and long-form buying/selling guides.

## Framework decision

The user suggested Vite. Vite is excellent for fast client-side prototypes, but the public traffic site uses Next.js because public pages benefit from static/server-rendered HTML, route metadata, generated sitemaps and crawler-readable content without requiring client-side execution. Google recommends server-side or static rendering rather than dynamic-rendering workarounds for public JavaScript content.

## UI decision

- Tailwind CSS v4 for the design system.
- shadcn/ui conventions so component source remains in the repository and can be modified directly.
- Lucide for icons.
- Original visual system rather than a pixel clone of a brokerage or portal.

## Tool decision

Recommended coding-agent tools:
- Context7 MCP for current library documentation.
- Playwright MCP for browser and accessibility verification.
- GitHub MCP for repository workflows.
- Supabase MCP, project-scoped and read-only initially, for database inspection.
- OpenDesign for optional design exploration, not as a runtime dependency.

Excluded:
- create-solana-dapp and wallet adapters because the product has no Web3 requirement.
