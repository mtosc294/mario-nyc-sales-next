# Tool selection

## Used in the scaffold

- Next.js: public rendering, metadata, sitemap and route handlers.
- Tailwind CSS: utility-first design system.
- shadcn/ui conventions: owned component source and components.json configuration.
- Lucide: lightweight interface icons.
- TypeScript: typed content and lead-scoring contracts.

## Recommended for the production workflow

- Context7 MCP: current framework documentation inside the coding agent.
- Playwright MCP: browser, accessibility and conversion-flow verification.
- GitHub MCP: repository, issue and pull-request operations.
- Supabase MCP in read-only/project-scoped mode: database inspection.
- n8n: routing qualified leads to CRM, email, SMS and tasks.
- Twenty CRM or a purpose-built Postgres workflow: durable lead operations.
- Umami or Plausible: privacy-aware analytics.
- Lighthouse CI: performance, accessibility and SEO regression budgets.

## Excluded

- create-solana-dapp: no Web3 requirement exists in this product.
- Solana wallet adapters: add complexity without improving discovery or lead conversion.
- OpenDesign as a runtime dependency: useful for design exploration, but production UI remains normal source-controlled React components.
