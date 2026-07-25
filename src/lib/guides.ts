export type GuideFaq = { q: string; a: string };
export type GuideSource = { label: string; note: string };

export type Guide = {
  slug: string;
  title: string;
  excerpt: string;
  directAnswer: string;
  definition: string;
  steps: string[];
  commonMistakes: string[];
  faqs: GuideFaq[];
  sources: GuideSource[];
  relatedGuides: string[];
  relatedNeighborhoods: string[];
  updatedAt: string;
  author: string;
  primaryCta: "sell" | "buy" | "invest" | "consult";
};

const dofNote =
  "Use for property-specific tax and ownership context. Not a substitute for comps or an appraisal.";

export const guides: Guide[] = [
  {
    slug: "nyc-apartment-worth",
    title: "How Much Is My NYC Apartment Worth?",
    excerpt: "Learn how NYC market value is estimated from comps, competition, carrying costs, and building-specific factors—not a ZIP-code average.",
    directAnswer:
      "Your NYC apartment is worth what qualified buyers are likely to pay after comparing it with relevant recent sales and current competition. Floor, light, view, condition, layout, monthly carrying costs, building finances, and buyer demand can change the result materially. A credible estimate is property-specific—not a neighborhood median alone.",
    definition:
      "Market value in NYC residential sales is an evidence-based price range informed by closed comps, active listings, property attributes, and what buyers can finance or pay in cash under current conditions.",
    steps: [
      "Gather property facts: address, ownership type, beds/baths, outdoor space, condition, and monthly costs.",
      "Pull recent closed sales in the same building or closely comparable buildings.",
      "Review active competition that a buyer can choose instead of your unit.",
      "Adjust for floor, light, view, renovations, layout, and assessments.",
      "Model buyer carrying costs—common charges and taxes affect offer power.",
      "Set a pricing band and one next step: strategy call, prep list, or launch plan.",
    ],
    commonMistakes: [
      "Anchoring to an online Zestimate-style figure without building-class comps.",
      "Ignoring active inventory that will compete with your listing.",
      "Understating common charges, taxes, or upcoming assessments.",
      "Pricing to the highest outlier sale instead of the relevant set.",
    ],
    faqs: [
      {
        q: "Can I get an exact number online?",
        a: "Automated estimates are a starting point only. NYC value depends on unit-level and building-level factors that portals often miss. A human-reviewed comps set is more reliable for listing strategy.",
      },
      {
        q: "Do condo and co-op valuations work the same way?",
        a: "Both use comps and competition, but co-ops add board requirements, flip taxes, and financing constraints that can shrink the buyer pool and affect price and timing.",
      },
      {
        q: "How often should I update a valuation?",
        a: "Revisit when competition changes, rates shift, building news appears, or you are within a few months of listing. Stale comps lead to weak launches.",
      },
    ],
    sources: [
      { label: "NYC Department of Finance property records", note: dofNote },
      {
        label: "Recent closed sales and active listings (broker MLS / public portals)",
        note: "Building-class comps and live competition should drive pricing; any site medians are indicative only.",
      },
      {
        label: "Building financials and offering documents",
        note: "Reserves, amenities, policies, and assessments affect what buyers will pay.",
      },
    ],
    relatedGuides: ["sell-a-condo-in-nyc", "sell-a-coop-in-nyc", "nyc-closing-costs"],
    relatedNeighborhoods: ["financial-district", "upper-east-side", "williamsburg"],
    updatedAt: "2026-07-24",
    author: "Mario Toscano",
    primaryCta: "sell",
  },
  {
    slug: "sell-a-coop-in-nyc",
    title: "How to Sell a Co-op in NYC",
    excerpt: "A practical sequence for pricing, board packages, buyer qualification, and closing a New York co-op sale.",
    directAnswer:
      "Selling a NYC co-op requires a defensible price, a board-ready package process, and buyers who can meet financial and interview standards. The strongest sales prepare documentation early, price to the real buyer pool, and coordinate attorney, managing agent, and board timelines before listing.",
    definition:
      "A co-op sale transfers shares and a proprietary lease, subject to board approval. Unlike condos, the corporation’s rules, flip taxes, and financial requirements shape who can buy and how long closing takes.",
    steps: [
      "Confirm building rules: flip tax, sublet policy, financing caps, and package requirements.",
      "Price from co-op comps in the same building or peer buildings—not condo averages.",
      "Assemble financials, proprietary lease context, and disclosure materials early.",
      "Market to buyers who can clear board standards; qualify offers for financing and reserves.",
      "Coordinate attorney, managing agent, and board package submission carefully.",
      "Plan for interview timing and post-approval closing logistics.",
    ],
    commonMistakes: [
      "Pricing like a condo without adjusting for board friction and buyer pool size.",
      "Starting packaging after an offer arrives.",
      "Accepting buyers who are unlikely to pass board review.",
      "Surprising the board with incomplete or inconsistent financials.",
    ],
    faqs: [
      {
        q: "How long does a co-op sale take?",
        a: "It varies by building and package quality. Board review and interviews often extend timelines beyond a typical condo path. Build buffer into your move plans.",
      },
      {
        q: "What is a flip tax?",
        a: "Some co-ops charge a fee on sale, paid by seller or buyer per building rules. Confirm the amount and who pays before you set net proceeds expectations.",
      },
      {
        q: "Can I sell if I still have a mortgage?",
        a: "Yes, but payoff, bank requirements, and buyer financing must be coordinated. Your attorney and lender timeline should be planned with the board process.",
      },
    ],
    sources: [
      { label: "Co-op bylaws, proprietary lease, and house rules", note: "Primary source for flip tax, sublet, and approval standards." },
      { label: "Building financial statements", note: "Buyers and boards scrutinize reserves and underlying mortgage health." },
      { label: "Recent closed co-op sales", note: "Use peer co-op comps; condo sales are not interchangeable." },
    ],
    relatedGuides: ["nyc-apartment-worth", "condo-vs-coop-nyc", "sell-a-condo-in-nyc"],
    relatedNeighborhoods: ["upper-east-side", "upper-west-side", "park-slope"],
    updatedAt: "2026-07-24",
    author: "Mario Toscano",
    primaryCta: "sell",
  },
  {
    slug: "sell-a-condo-in-nyc",
    title: "How to Sell a Condo in NYC",
    excerpt: "A practical sequence for pricing, preparation, marketing, negotiation, due diligence and closing.",
    directAnswer:
      "Selling a NYC condo typically requires a documented pricing strategy, property preparation, professional marketing, buyer qualification, attorney-led due diligence, and coordination with the managing agent. The strongest launch begins before the listing goes live.",
    definition:
      "A condo sale transfers real property subject to the condominium declaration and bylaws. Buyers evaluate the unit, the building’s finances and policies, and monthly carrying costs alongside purchase price.",
    steps: [
      "Review recent comparable sales and active competition in the same building class.",
      "Confirm common charges, taxes, assessments, and building documents.",
      "Prepare photography, floor plan, disclosures, and launch timing.",
      "Qualify offers by price, financing, timing, and execution risk.",
      "Coordinate attorney, managing agent, and due diligence requests.",
      "Agree on one clear next step after each major decision point.",
    ],
    commonMistakes: [
      "Launching without knowing competing inventory.",
      "Underestimating how common charges affect buyer offers.",
      "Weak media or incomplete disclosures that slow diligence.",
      "Chasing the highest ask instead of the best executable offer.",
    ],
    faqs: [
      {
        q: "When should I list my condo?",
        a: "When pricing, condition, documents, and marketing are ready—and you understand current competition. Calendar season matters less than launch readiness.",
      },
      {
        q: "Do I need to renovate before selling?",
        a: "Not always. Targeted fixes that remove objections can help; heavy renovations should be weighed against buyer preferences and net proceeds.",
      },
      {
        q: "How are condo offers evaluated?",
        a: "Compare price with financing strength, contingencies, timing, and closing risk—not headline price alone.",
      },
    ],
    sources: [
      { label: "NYC Department of Finance property records", note: dofNote },
      { label: "Recent closed sales and active listings", note: "Building-class comps drive pricing strategy." },
      { label: "Condo offering plan / financials via managing agent", note: "Required diligence materials for serious buyers." },
    ],
    relatedGuides: ["nyc-apartment-worth", "sell-a-coop-in-nyc", "nyc-closing-costs"],
    relatedNeighborhoods: ["financial-district", "long-island-city", "chelsea"],
    updatedAt: "2026-07-24",
    author: "Mario Toscano",
    primaryCta: "sell",
  },
  {
    slug: "condo-vs-coop-nyc",
    title: "NYC Condo vs. Co-op",
    excerpt: "Understand ownership structure, approval, financing, monthly costs and resale flexibility.",
    directAnswer:
      "A condo buyer purchases real property, while a co-op buyer purchases shares tied to a proprietary lease. Condos generally allow more flexibility; co-ops often provide lower entry pricing but require deeper financial review and board approval. Choose based on use case, financing, restrictions, and exit plan—not labels alone.",
    definition:
      "Condo and co-op are the two dominant apartment ownership structures in NYC. They differ in legal form, approval process, financing norms, sublet rules, and resale dynamics.",
    steps: [
      "List your must-haves: flexibility, price, board comfort, investment use, pets, renovations.",
      "Compare total monthly carrying costs, not only purchase price.",
      "Review sublet, renovation, financing, and guest policies.",
      "Model closing costs and timeline differences for each type.",
      "Tour with ownership type already filtered so comps stay meaningful.",
    ],
    commonMistakes: [
      "Choosing solely on lower sticker price without board or rule friction.",
      "Assuming condo rules are always loose—buildings still vary.",
      "Ignoring resale liquidity differences in your exit plan.",
    ],
    faqs: [
      {
        q: "Which is easier to finance?",
        a: "Condos are often simpler for many lenders, but both can be financed. Co-ops may impose building-level down payment or post-closing liquidity requirements.",
      },
      {
        q: "Which is better for investors?",
        a: "Condos usually allow more rental flexibility, subject to building rules. Many co-ops restrict or delay sublets. Confirm policies before underwriting yield.",
      },
      {
        q: "Which sells faster?",
        a: "It depends on price, condition, and buyer pool. Well-priced units in healthy buildings move; co-op board steps can extend timelines even when demand exists.",
      },
    ],
    sources: [
      { label: "Building governing documents (condo bylaws or co-op proprietary lease)", note: "Primary source for restrictions and approval rules." },
      { label: "Lender and attorney estimates", note: "Financing and closing norms differ by ownership type." },
    ],
    relatedGuides: ["sell-a-condo-in-nyc", "sell-a-coop-in-nyc", "nyc-closing-costs"],
    relatedNeighborhoods: ["upper-east-side", "park-slope", "astoria"],
    updatedAt: "2026-07-24",
    author: "Mario Toscano",
    primaryCta: "buy",
  },
  {
    slug: "nyc-closing-costs",
    title: "NYC Buyer and Seller Closing Costs",
    excerpt: "Plan for transfer taxes, mansion tax, financing expenses, attorneys, building fees and adjustments.",
    directAnswer:
      "NYC closing costs vary materially by price, property type, financing, building requirements, and deal structure. Buyers and sellers should request a transaction-specific estimate from their attorney and financial professionals before committing to a number. Treat any generic percentage as educational only.",
    definition:
      "Closing costs are the fees and taxes paid to complete a transfer—separate from the purchase price—covering taxes, lender fees, attorney work, title/co-op fees, and building charges where applicable.",
    steps: [
      "Separate buyer costs from seller costs early.",
      "Model condo, co-op, and townhouse paths separately.",
      "Include mansion tax, transfer taxes, and lender fees where they apply.",
      "Add building, managing agent, and move-in/out fees when relevant.",
      "Keep estimates clearly labeled with assumptions and a date.",
    ],
    commonMistakes: [
      "Using a single rule-of-thumb percentage for every deal.",
      "Forgetting co-op flip taxes or condo common-charge adjustments.",
      "Ignoring mansion tax thresholds when budgeting a purchase.",
    ],
    faqs: [
      {
        q: "Who pays the mansion tax?",
        a: "In New York State, mansion tax is generally a buyer cost on residential transfers above the statutory threshold, with graduated rates by price. Confirm current rates with your attorney for your contract price.",
      },
      {
        q: "Are co-op and condo closing costs the same?",
        a: "No. Fee structures differ (for example, title vs. co-op transfer mechanics, flip taxes, lender requirements). Always model the ownership type you are actually buying or selling.",
      },
      {
        q: "Can closing costs be negotiated?",
        a: "Some credits and allocations are negotiable in the contract; statutory taxes generally are not. Strategy depends on leverage and deal structure.",
      },
    ],
    sources: [
      {
        label: "NYC and NYS tax guidance (transfer / mansion tax)",
        note: "Confirm current rates and thresholds with counsel; published rates change and depend on deal facts.",
      },
      {
        label: "Attorney and lender fee worksheets",
        note: "Transaction-specific estimates beat generic online calculators.",
      },
    ],
    relatedGuides: ["nyc-apartment-worth", "sell-a-condo-in-nyc", "condo-vs-coop-nyc"],
    relatedNeighborhoods: ["financial-district", "brooklyn-heights", "long-island-city"],
    updatedAt: "2026-07-24",
    author: "Mario Toscano",
    primaryCta: "consult",
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((item) => item.slug === slug);
}
