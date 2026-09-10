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

## Lead capture

Strategy-form posts go to `/api/leads`. The handler scores the lead, **writes it to Neon first**, then emails Mario via Resend. A failed email does not drop the lead. A failed write does not show the thank-you state.

Create a Neon project and run [`scripts/leads.sql`](scripts/leads.sql) once in the Neon SQL editor.

Local: put secrets in `.env.local` (gitignored). Production: the same keys in the Vercel project, then redeploy. A deploy without `DATABASE_URL` returns 503 on submit.

```bash
DATABASE_URL=          # Neon connection string
RESEND_API_KEY=        # Resend API key
LEAD_NOTIFY_TO=        # Inbox to notify (defaults to mario@sefirotrealestate.com)
LEAD_FROM=             # Must be a verified Resend from-address
```

`LEAD_FROM` must use a **verified Resend domain**. Until `mariotoscano.com` is verified, local/dev can use `Mario Toscano <onboarding@resend.dev>` (Resend only delivers that to the Resend account email). Production: verify the domain and use e.g. `Mario Toscano <leads@mariotoscano.com>`.

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

Contact and domain live in `src/lib/site-config.ts`. Set `licenseNumber` when available (UI omits it while empty).

## Still required for full production

- Privacy, accessibility, and fair-housing pages
- Consent copy and stronger anti-spam (Turnstile) if form spam becomes a problem
- CRM routing beyond Neon + email
- Sourced (non-placeholder) market statistics where claimed
- Hosting deploy pointed at mariotoscano.com
