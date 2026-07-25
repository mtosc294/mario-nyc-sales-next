# Mario Toscano NYC Sales — Next.js site

Traffic-oriented NYC real-estate site for Mario Toscano: landing page, neighborhood SEO/AEO guides, seller/buyer/investor paths, and structured lead capture.

**Canonical domain:** https://mariotoscano.com

## Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS v4
- Lucide icons

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Optional analytics:

```bash
export NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
npm run dev
```

When `NEXT_PUBLIC_GA_ID` is set, successful strategy-form submits fire `generate_lead` and `consult_submit` events.

## Verify

```bash
npm run typecheck
npm run build
```

Then test:

- Home hero video (desktop uses `/video/hero-loop.mp4`; mobile/reduced-motion uses poster)
- Buy / Sell / Invest pages and neighborhood cross-links
- `/neighborhoods` and `/neighborhoods/financial-district`
- Guides: `/guides/nyc-apartment-worth`, `/guides/sell-a-coop-in-nyc`
- `/robots.txt` and `/sitemap.xml` (should reference mariotoscano.com)
- `/desk` remains noindex / disallowed for crawlers via robots

## Google Search Console (after deploy)

1. Verify property for `https://mariotoscano.com`
2. Submit sitemap: `https://mariotoscano.com/sitemap.xml`
3. Monitor neighborhood and guide URLs for impressions/clicks
4. Track organic sessions → `/#strategy` submissions (GA4)

## Site config

Contact, brokerage, and domain live in `src/lib/site-config.ts`. Set `licenseNumber` when available (UI omits it while empty).

## Still required for full production

- Privacy, accessibility, and fair-housing pages
- Server-side lead persistence, consent, anti-spam, CRM routing
- Sourced (non-placeholder) market statistics where claimed
- Hosting deploy pointed at mariotoscano.com
