export type Borough = "Manhattan" | "Brooklyn" | "Queens" | "Bronx" | "Staten Island";

export type PrimaryCta = "sell" | "buy" | "invest" | "consult";

export type NeighborhoodFaq = {
  q: string;
  a: string;
};

export type NeighborhoodSource = {
  label: string;
  note: string;
};

export type Neighborhood = {
  slug: string;
  name: string;
  borough: Borough;
  summary: string;
  image: string;
  medianLabel: string;
  methodologyNote: string;
  directAnswer: string;
  definition: string;
  whoItFits: string[];
  propertyTypes: string[];
  steps: string[];
  commonMistakes: string[];
  faqs: NeighborhoodFaq[];
  relatedGuides: string[];
  relatedNeighborhoods: string[];
  updatedAt: string;
  author: string;
  sources: NeighborhoodSource[];
  primaryCta: PrimaryCta;
};

export const boroughs: Borough[] = ["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island"];

const methodology =
  "Indicative only. Production values need a named source, calculation methodology, and a visible update date. Do not treat this as a live MLS or appraisal figure.";

export const neighborhoods: Neighborhood[] = [
  {
    slug: "financial-district",
    name: "Financial District",
    borough: "Manhattan",
    summary:
      "Full-service towers, waterfront access, historic streets, and a broad condo inventory near Wall Street, Battery Park, and the Seaport.",
    medianLabel: "$1.18M indicative median",
    methodologyNote: methodology,
    image: "/images/neighborhoods/financial-district.png",
    directAnswer:
      "The Financial District is a condo-heavy Lower Manhattan market where value hinges on the building (amenities, common charges, reserves), exact micro-location (waterfront vs. inland corridors), and how your unit compares to active high-rise competition—not on neighborhood averages alone. Buyers should underwrite monthly costs and view corridors; sellers should price against current tower inventory before launch.",
    definition:
      "The Financial District (FiDi) covers the southern tip of Manhattan around Wall Street, Battery Park, the World Trade Center area, and nearby waterfront and Seaport blocks. Daytime financial-district energy mixes with a growing full-time residential base in modern condominium towers and converted buildings.",
    whoItFits: [
      "Condo buyers who want full-service buildings, skyline or water views, and quick access to downtown offices and transit",
      "Sellers with tower inventory who need a clear launch plan against competing new and resale listings",
      "Investors evaluating rental demand near employment hubs—while modeling common charges, taxes, and building policies carefully",
      "Owners comparing Battery Park / Seaport adjacency versus inland FiDi corridors for noise, light, and walkability",
    ],
    propertyTypes: [
      "Modern condominium towers with amenities and doorman service",
      "Converted office-to-residential or loft-style condominiums",
      "Select co-ops and smaller boutique buildings on historic side streets",
      "Waterfront-adjacent residences near Battery Park and the Seaport",
    ],
    steps: [
      "Decide your path first: buy, sell, or invest—each needs different comps, cost assumptions, and timing.",
      "Map the micro-location: waterfront, inland FiDi, Seaport edge, or WTC-adjacent blocks behave differently on light, noise, and demand.",
      "Pull recent closed sales and active listings in the same building class—not a ZIP-wide average.",
      "Model total monthly carrying costs: common charges, taxes, assessments, and any abatement roll-off.",
      "For sellers: prepare photos, floor plans, disclosures, and a pricing band before listing against competing towers.",
      "For buyers: shortlist buildings by reserves, amenity load, and resale liquidity—not amenities alone.",
      "Agree on one next step: valuation call, tour plan, or launch checklist with a licensed advisor.",
    ],
    commonMistakes: [
      "Pricing or bidding from a neighborhood median instead of building-specific comps and active competition.",
      "Ignoring common charges and assessments that compress what buyers will pay.",
      "Launching a listing without knowing how many similar FiDi units are already live.",
      "Treating tax abatements or temporary costs as permanent when underwriting an investment.",
      "Skipping building financials, alteration policies, and sublet rules until late in the process.",
    ],
    faqs: [
      {
        q: "Is the Financial District good for condo buyers?",
        a: "Yes for buyers who prioritize full-service condo living, downtown convenience, and modern inventory—provided they underwrite monthly costs, building health, and how their unit stacks against active tower competition. It is less ideal if you need a deep co-op inventory or a quieter, low-rise residential street fabric.",
      },
      {
        q: "What should sellers know about competing high-rise inventory?",
        a: "FiDi sellers often compete with other resale condos and, at times, new development. A strong launch starts with a building-class comps set, a clear price band, and marketing that differentiates floor, light, view, condition, and monthly costs—not generic downtown branding.",
      },
      {
        q: "How do common charges affect value downtown?",
        a: "Higher common charges reduce the pool of buyers who can qualify and compress offers relative to similar units with lower carrying costs. Always present price and monthly costs together when evaluating or marketing a FiDi condo.",
      },
      {
        q: "Should investors buy in FiDi for rental demand?",
        a: "Employment density and transit can support rental interest, but returns depend on purchase price, common charges, taxes, financing, vacancy, and building rental policies. Model the full stack before assuming FiDi is automatically a yield play.",
      },
    ],
    relatedGuides: ["sell-a-condo-in-nyc", "condo-vs-coop-nyc", "nyc-closing-costs"],
    relatedNeighborhoods: ["chelsea", "long-island-city", "brooklyn-heights"],
    updatedAt: "2026-07-23",
    author: "Mario Toscano",
    sources: [
      {
        label: "NYC Department of Finance property records",
        note: "Use for ownership, assessments, and tax context on a specific property—not as a neighborhood pricing shortcut.",
      },
      {
        label: "Recent closed sales and active listings (broker MLS / public portals)",
        note: "Building-class comps and live competition should drive pricing; medians on this page are indicative placeholders only.",
      },
      {
        label: "Building offering plans, financials, and managing-agent disclosures",
        note: "Required for condo due diligence on reserves, amenities, policies, and assessments.",
      },
    ],
    primaryCta: "consult",
  },
  {
    slug: "upper-east-side",
    name: "Upper East Side",
    borough: "Manhattan",
    summary: "A deep co-op market, established condominium buildings, and block-by-block pricing differences from Midtown to the 90s.",
    medianLabel: "$1.35M indicative median",
    methodologyNote: methodology,
    image: "/images/neighborhoods/upper-east-side.png",
    directAnswer:
      "The Upper East Side rewards buyers and sellers who treat each block and building type separately: co-op board standards, condo flexibility, and avenue-versus-side-street dynamics can change pricing and timeline more than the neighborhood label alone.",
    definition:
      "The Upper East Side is a primarily residential Manhattan market east of Central Park, known for co-op depth, classic prewar buildings, and a mix of condominiums along major corridors.",
    whoItFits: [
      "Buyers comparing co-op entry pricing versus condo flexibility",
      "Sellers who need board-aware launch timing and packaging",
      "Families prioritizing schools, parks, and established residential streets",
    ],
    propertyTypes: ["Co-ops (prewar and postwar)", "Condominiums", "Select townhouses and boutique residences"],
    steps: [
      "Choose co-op vs. condo based on financing, board comfort, and exit plan.",
      "Comps by building and block—not a single UES average.",
      "For co-ops: prepare board-ready financials and package materials early.",
      "Price against active competition on the same corridor.",
      "Confirm one next step: valuation, search brief, or listing prep.",
    ],
    commonMistakes: [
      "Underestimating co-op board timelines and financial requirements.",
      "Mixing avenue and side-street comps without adjustment.",
      "Ignoring flip taxes, sublet rules, and renovation restrictions.",
    ],
    faqs: [
      {
        q: "Should I buy a co-op or condo on the Upper East Side?",
        a: "Co-ops often offer lower entry prices with stricter approval and rules; condos usually cost more but allow more flexibility. Choose based on financing, lifestyle restrictions, and how you plan to exit—not labels alone.",
      },
      {
        q: "How do board requirements affect a sale?",
        a: "Board packages, interviews, and financial thresholds can extend timelines and affect which buyers can close. Sellers should prepare documentation early and price with realistic buyer pools in mind.",
      },
      {
        q: "Which building characteristics support resale value?",
        a: "Strong financials, sensible policies, good light and layout, and location relative to transit and parks typically support demand more than cosmetic finishes alone.",
      },
    ],
    relatedGuides: ["condo-vs-coop-nyc", "sell-a-condo-in-nyc", "nyc-closing-costs"],
    relatedNeighborhoods: ["upper-west-side", "chelsea", "financial-district"],
    updatedAt: "2026-07-23",
    author: "Mario Toscano",
    sources: [
      { label: "Building financials and proprietary lease / bylaws", note: "Essential for co-op underwriting and board readiness." },
      { label: "Recent closed sales and active listings", note: "Use building-class comps; medians here are indicative only." },
    ],
    primaryCta: "buy",
  },
  {
    slug: "upper-west-side",
    name: "Upper West Side",
    borough: "Manhattan",
    summary: "Prewar co-ops, family-oriented streets, and condo options near Central Park, Riverside Park, and major subway lines.",
    medianLabel: "$1.28M indicative median",
    methodologyNote: methodology,
    image: "/images/neighborhoods/upper-west-side.png",
    directAnswer:
      "The Upper West Side is a residential Manhattan market where co-op depth, park adjacency, and building financials drive outcomes. Buyers should compare carrying costs and board rules; sellers should price to the specific building class and current competition.",
    definition:
      "The Upper West Side runs west of Central Park, known for prewar architecture, cultural institutions, and a mix of co-ops and condominiums serving full-time residents.",
    whoItFits: [
      "Buyers seeking classic residential Manhattan near parks and transit",
      "Sellers of prewar co-ops who need board-aware marketing",
      "Owners weighing renovation ROI against buyer preferences",
    ],
    propertyTypes: ["Prewar co-ops", "Postwar co-ops and condos", "Select luxury condominium towers"],
    steps: [
      "Define co-op vs. condo constraints before touring.",
      "Comps by building age, line, and park proximity.",
      "Review board rules, flip taxes, and renovation policies.",
      "Model monthly costs against target price.",
      "Set one next action: brief, valuation, or launch plan.",
    ],
    commonMistakes: [
      "Paying for park adjacency without checking actual light and layout.",
      "Ignoring co-op liquidity and buyer qualification depth.",
      "Renovating for personal taste instead of local buyer norms.",
    ],
    faqs: [
      {
        q: "Is the Upper West Side better for families than FiDi?",
        a: "Many families prefer UWS park access and residential street fabric; FiDi tends to skew toward condo towers and downtown convenience. Fit depends on commute, building type, and lifestyle—not a universal ranking.",
      },
      {
        q: "Are UWS co-ops hard to sell?",
        a: "Well-priced units in financially healthy buildings with clear packaging still move. Difficulty usually comes from overpricing, weak financials, or restrictive policies that shrink the buyer pool.",
      },
      {
        q: "How should sellers prepare a prewar listing?",
        a: "Document floor plans, highlight original vs. updated systems, assemble board materials early, and price against similar lines—not gut-renovated outliers alone.",
      },
    ],
    relatedGuides: ["condo-vs-coop-nyc", "sell-a-condo-in-nyc"],
    relatedNeighborhoods: ["upper-east-side", "chelsea", "brooklyn-heights"],
    updatedAt: "2026-07-23",
    author: "Mario Toscano",
    sources: [
      { label: "Recent closed sales and active listings", note: "Indicative medians on this page are placeholders only." },
      { label: "Co-op board packages and building financials", note: "Primary diligence materials for UWS transactions." },
    ],
    primaryCta: "consult",
  },
  {
    slug: "chelsea",
    name: "Chelsea",
    borough: "Manhattan",
    summary: "Lofts, condominiums, and townhouse inventory between Midtown and the Village, with strong lifestyle and gallery-district demand.",
    medianLabel: "$1.45M indicative median",
    methodologyNote: methodology,
    image: "/images/neighborhoods/chelsea.png",
    directAnswer:
      "Chelsea buyers and sellers should focus on building type—loft conversions, modern condos, and townhouses trade on different comps. Lifestyle demand is strong, but monthly costs, renovation history, and exact block still decide price.",
    definition:
      "Chelsea is a West Side Manhattan neighborhood known for galleries, the High Line corridor, loft living, and a mix of condominium and townhouse stock.",
    whoItFits: [
      "Buyers wanting loft volume or modern condo amenities downtown-adjacent",
      "Sellers competing in a lifestyle-driven, visually competitive market",
      "Investors evaluating furnished or pied-à-terre policies carefully",
    ],
    propertyTypes: ["Loft condominiums", "Modern condo buildings", "Townhouses and small boutique residences"],
    steps: [
      "Segment comps by loft vs. conventional condo vs. townhouse.",
      "Inspect renovation quality and building alteration history.",
      "Compare High Line / gallery-adjacent premiums to quieter blocks.",
      "Underwrite common charges and any commercial building quirks.",
      "Choose one next step: tour plan, valuation, or listing prep.",
    ],
    commonMistakes: [
      "Using loft comps for conventional layouts (and vice versa).",
      "Overpaying for proximity without checking noise and foot traffic.",
      "Skipping building financial review on converted properties.",
    ],
    faqs: [
      {
        q: "Are Chelsea lofts a good buy?",
        a: "They can be, when layout, light, building health, and monthly costs support resale. Open loft plans are not interchangeable—measure usable rooms and storage against how you actually live.",
      },
      {
        q: "How competitive is Chelsea for sellers?",
        a: "Presentation matters. Buyers compare finishes, light, and outdoor space aggressively. Price to active inventory and differentiate clearly.",
      },
      {
        q: "Should investors target Chelsea?",
        a: "Only after modeling carrying costs, rental rules, and exit liquidity. Lifestyle demand helps, but it does not replace underwriting.",
      },
    ],
    relatedGuides: ["sell-a-condo-in-nyc", "nyc-closing-costs"],
    relatedNeighborhoods: ["financial-district", "upper-west-side", "williamsburg"],
    updatedAt: "2026-07-23",
    author: "Mario Toscano",
    sources: [
      { label: "Recent closed sales and active listings", note: "Segment by property type; medians are indicative only." },
    ],
    primaryCta: "buy",
  },
  {
    slug: "williamsburg",
    name: "Williamsburg",
    borough: "Brooklyn",
    summary: "New development, converted lofts, townhouses, and lifestyle-driven buyer demand along the waterfront and inland blocks.",
    medianLabel: "$1.42M indicative median",
    methodologyNote: methodology,
    image: "/images/neighborhoods/williamsburg.png",
    directAnswer:
      "Williamsburg is a Brooklyn market where new development, resale condos, lofts, and townhouses compete on lifestyle and location. Buyers should compare waterfront premiums, abatements, and carrying costs; sellers should position against both new and resale inventory.",
    definition:
      "Williamsburg spans north Brooklyn waterfront and inland neighborhoods known for dining, culture, converted industrial stock, and significant condominium development.",
    whoItFits: [
      "Buyers prioritizing lifestyle, transit to Manhattan, and modern inventory",
      "Sellers of new-development or loft product who need sharp competitive pricing",
      "Investors modeling abatement roll-offs and rental demand carefully",
    ],
    propertyTypes: ["New-development condominiums", "Resale condos and loft conversions", "Townhouses"],
    steps: [
      "Separate waterfront, northside, and southside comps.",
      "Compare new development vs. resale on price per usable foot and monthly costs.",
      "Check tax abatements and their expiration impact.",
      "For sellers: stage against competing new inventory, not only older sales.",
      "Confirm next step: search brief, valuation, or launch plan.",
    ],
    commonMistakes: [
      "Treating all of Williamsburg as one price band.",
      "Ignoring abatement burn-off in investment models.",
      "Underestimating how much new supply affects resale timing.",
    ],
    faqs: [
      {
        q: "What types of homes sell fastest in Williamsburg?",
        a: "Well-priced, well-presented units with strong light, practical layouts, and competitive monthly costs tend to move first—across both new and resale segments.",
      },
      {
        q: "How should buyers compare new development and resale condos?",
        a: "Compare total monthly costs, sponsor vs. resale closing norms, finishes you would actually keep, and how the building will compete when you sell later.",
      },
      {
        q: "What makes a Williamsburg listing stand out?",
        a: "Clear differentiation on view, outdoor space, condition, and value versus nearby new inventory—plus professional media and a realistic price band.",
      },
    ],
    relatedGuides: ["sell-a-condo-in-nyc", "nyc-closing-costs"],
    relatedNeighborhoods: ["park-slope", "brooklyn-heights", "long-island-city"],
    updatedAt: "2026-07-23",
    author: "Mario Toscano",
    sources: [
      { label: "Recent closed sales and active listings", note: "Segment new vs. resale; medians are indicative only." },
      { label: "Tax abatement / assessment disclosures", note: "Critical for underwriting newer condominium inventory." },
    ],
    primaryCta: "buy",
  },
  {
    slug: "park-slope",
    name: "Park Slope",
    borough: "Brooklyn",
    summary: "Brownstones, co-ops, and condos near Prospect Park with family-oriented demand and block-level price variation.",
    medianLabel: "$1.55M indicative median",
    methodologyNote: methodology,
    image: "/images/neighborhoods/park-slope.png",
    directAnswer:
      "Park Slope decisions turn on housing type and exact block: brownstones, co-ops, and condos do not share the same buyer pool. Park proximity and building condition matter as much as the neighborhood brand.",
    definition:
      "Park Slope is a brownstone Brooklyn neighborhood adjacent to Prospect Park, known for townhouses, co-ops, and a smaller condo footprint with strong primary-residence demand.",
    whoItFits: [
      "Families seeking brownstone or classic apartment living near the park",
      "Sellers of townhouses who need renovation and comp discipline",
      "Buyers comparing co-op affordability versus townhouse ownership costs",
    ],
    propertyTypes: ["Brownstones and townhouses", "Co-op apartments", "Limited condominium inventory"],
    steps: [
      "Pick the housing type first—townhouse, co-op, or condo.",
      "Comps by block and renovation level.",
      "Budget for ownership costs beyond purchase price (taxes, maintenance, capital needs).",
      "For sellers: disclose systems and renovation history clearly.",
      "Agree on one next step with an advisor.",
    ],
    commonMistakes: [
      "Using condo comps for townhouse pricing.",
      "Underestimating capital needs in older brownstones.",
      "Ignoring co-op rules when shopping 'Park Slope apartments' broadly.",
    ],
    faqs: [
      {
        q: "Is Park Slope mostly townhouses?",
        a: "Townhouses define the streetscape, but co-ops and some condos are meaningful options. Match search filters to the ownership type you actually want.",
      },
      {
        q: "How important is Prospect Park proximity?",
        a: "It often supports demand, but exact block, subway access, and building quality still drive price. Do not pay a park premium without checking the specific property.",
      },
      {
        q: "What should townhouse sellers prepare?",
        a: "Clear floor plans, systems history, recent work documentation, and comps adjusted for renovation level and outdoor space.",
      },
    ],
    relatedGuides: ["condo-vs-coop-nyc", "nyc-closing-costs"],
    relatedNeighborhoods: ["brooklyn-heights", "williamsburg", "astoria"],
    updatedAt: "2026-07-23",
    author: "Mario Toscano",
    sources: [
      { label: "Recent closed sales and active listings", note: "Separate townhouse and apartment comps; medians are indicative only." },
    ],
    primaryCta: "consult",
  },
  {
    slug: "brooklyn-heights",
    name: "Brooklyn Heights",
    borough: "Brooklyn",
    summary: "Historic brownstones and co-ops with Manhattan skyline proximity, Promenade access, and limited inventory.",
    medianLabel: "$1.65M indicative median",
    methodologyNote: methodology,
    image: "/images/neighborhoods/brooklyn-heights.png",
    directAnswer:
      "Brooklyn Heights is a low-inventory, historically protected Brooklyn market where scarcity and building character support pricing—but only when the specific property’s condition, ownership type, and comps justify it.",
    definition:
      "Brooklyn Heights is a landmark-rich residential neighborhood across the East River from Lower Manhattan, known for brownstones, co-ops, and the Brooklyn Heights Promenade.",
    whoItFits: [
      "Buyers seeking historic character and Manhattan access",
      "Sellers in a scarce inventory environment who still need precise comps",
      "Owners weighing landmark renovation constraints",
    ],
    propertyTypes: ["Brownstones and townhouses", "Co-op apartments", "Select condominiums"],
    steps: [
      "Confirm landmark or alteration constraints early.",
      "Use tight comps—inventory is limited and not interchangeable.",
      "Underwrite co-op vs. fee-simple differences clearly.",
      "For sellers: emphasize unique property attributes without overpricing scarcity.",
      "Set a single next action: valuation or search brief.",
    ],
    commonMistakes: [
      "Assuming scarcity alone justifies any ask price.",
      "Ignoring renovation restrictions until after contract.",
      "Mixing Heights comps with broader downtown Brooklyn averages.",
    ],
    faqs: [
      {
        q: "Why is Brooklyn Heights inventory limited?",
        a: "Historic housing stock, landmark considerations, and strong owner hold periods reduce turnover. Limited supply does not remove the need for property-specific pricing.",
      },
      {
        q: "Is Brooklyn Heights good for Manhattan commuters?",
        a: "Many buyers choose it for short downtown Manhattan access plus residential character. Still validate your actual commute and building rules before paying a premium.",
      },
      {
        q: "How should buyers approach brownstone diligence?",
        a: "Inspect systems, structural condition, and renovation history carefully, and budget for ownership realities beyond the purchase price.",
      },
    ],
    relatedGuides: ["sell-a-condo-in-nyc", "condo-vs-coop-nyc"],
    relatedNeighborhoods: ["financial-district", "park-slope", "williamsburg"],
    updatedAt: "2026-07-23",
    author: "Mario Toscano",
    sources: [
      { label: "Recent closed sales and active listings", note: "Use tight local comps; medians are indicative only." },
    ],
    primaryCta: "buy",
  },
  {
    slug: "long-island-city",
    name: "Long Island City",
    borough: "Queens",
    summary: "Modern towers, skyline views, and quick Manhattan access with an expanding condominium resale market.",
    medianLabel: "$1.10M indicative median",
    methodologyNote: methodology,
    image: "/images/neighborhoods/long-island-city.png",
    directAnswer:
      "Long Island City is a condo-tower Queens market where views, amenities, tax structure, and new-supply competition drive value. Investors and buyers must model abatements and monthly costs; sellers must price against active tower inventory.",
    definition:
      "Long Island City sits on the Queens waterfront facing Midtown Manhattan, characterized by high-rise condominiums, newer construction, and strong transit links.",
    whoItFits: [
      "Condo buyers seeking modern buildings and Manhattan skyline proximity",
      "Sellers competing with both resale and new development",
      "Investors underwriting abatements, HOA costs, and rental policies",
    ],
    propertyTypes: ["High-rise condominiums", "Newer full-service towers", "Select smaller condo and rental-adjacent product"],
    steps: [
      "Compare buildings on view corridors, amenities, and reserves—not height alone.",
      "Model taxes with and without remaining abatements.",
      "Review active competing inventory before setting a bid or ask.",
      "Confirm rental and sublet rules if investing.",
      "Pick one next step: valuation, tour plan, or investment screen.",
    ],
    commonMistakes: [
      "Ignoring abatement expiration in long-term cost models.",
      "Paying for a 'view' that is easily blocked by future construction.",
      "Using Manhattan comps without Queens cost adjustments.",
    ],
    faqs: [
      {
        q: "Is Long Island City a good investment market?",
        a: "It can be for buyers who underwrite purchase price, common charges, taxes, financing, and rental rules honestly. Tower competition means exit liquidity must be part of the plan.",
      },
      {
        q: "How do tax abatements affect resale analysis?",
        a: "Abatements can lower near-term carrying costs and support buyer demand, but expiration increases future monthly costs and can affect resale pricing. Always model the roll-off date.",
      },
      {
        q: "What should sellers know about competing new development?",
        a: "Resale units compete on price, condition, and monthly costs against sponsor inventory. Differentiate clearly and price to what buyers can choose this month—not last year’s closes alone.",
      },
    ],
    relatedGuides: ["sell-a-condo-in-nyc", "nyc-closing-costs"],
    relatedNeighborhoods: ["astoria", "financial-district", "williamsburg"],
    updatedAt: "2026-07-23",
    author: "Mario Toscano",
    sources: [
      { label: "Tax abatement and assessment disclosures", note: "Required for LIC tower underwriting." },
      { label: "Recent closed sales and active listings", note: "Medians on this page are indicative placeholders only." },
    ],
    primaryCta: "invest",
  },
  {
    slug: "astoria",
    name: "Astoria",
    borough: "Queens",
    summary: "Diverse housing stock, strong local retail, and more approachable entry points than many Manhattan condo corridors.",
    medianLabel: "$850K indicative median",
    methodologyNote: methodology,
    image: "/images/neighborhoods/astoria.png",
    directAnswer:
      "Astoria offers a wider mix of co-ops, condos, and small multifamily than condo-tower Queens waterfront markets. Buyers should match property type to financing and lifestyle; sellers should comps within the same housing class.",
    definition:
      "Astoria is a northwestern Queens neighborhood known for cultural diversity, dining, co-op and condo options, and a mix of low- and mid-rise residential stock.",
    whoItFits: [
      "Buyers seeking Queens value relative to Manhattan condo pricing",
      "First-time buyers navigating co-op vs. condo tradeoffs",
      "Small multifamily or house investors who underwrite carefully",
    ],
    propertyTypes: ["Co-ops", "Condominiums", "Small multifamily and houses"],
    steps: [
      "Define ownership type and budget including closing costs.",
      "Comps within the same property class and micro-area.",
      "Review building financials or property condition thoroughly.",
      "For investors: model rents, expenses, and exit options.",
      "Set one next step: search brief or valuation.",
    ],
    commonMistakes: [
      "Comparing Astoria co-ops to LIC tower condos without adjustment.",
      "Skipping building financial review on older co-ops.",
      "Underestimating renovation needs on small multifamily.",
    ],
    faqs: [
      {
        q: "Is Astoria more affordable than Long Island City?",
        a: "Often on a headline basis, but affordability depends on property type, condition, and monthly costs. Compare total ownership cost—not list price alone.",
      },
      {
        q: "Are Astoria co-ops a good starter purchase?",
        a: "They can be when board requirements, financials, and resale rules fit your timeline. Get clarity on financing and package standards early.",
      },
      {
        q: "What should sellers emphasize?",
        a: "Practical layouts, transportation access, building health, and honest condition—priced to nearby active listings in the same class.",
      },
    ],
    relatedGuides: ["condo-vs-coop-nyc", "nyc-closing-costs"],
    relatedNeighborhoods: ["long-island-city", "williamsburg", "riverdale"],
    updatedAt: "2026-07-23",
    author: "Mario Toscano",
    sources: [
      { label: "Recent closed sales and active listings", note: "Segment by property type; medians are indicative only." },
    ],
    primaryCta: "buy",
  },
  {
    slug: "riverdale",
    name: "Riverdale",
    borough: "Bronx",
    summary: "Suburban-feeling Bronx neighborhood with houses, co-ops, and condos, parkland, and more space than core Manhattan corridors.",
    medianLabel: "$720K indicative median",
    methodologyNote: methodology,
    image: "/images/neighborhoods/riverdale.png",
    directAnswer:
      "Riverdale serves buyers who want more space and a residential pace within NYC. Outcomes depend on housing type—houses, co-ops, and condos follow different comps—and on commute and building or property condition realities.",
    definition:
      "Riverdale is a residential Bronx neighborhood known for greenery, larger living spaces, co-op campuses, houses, and a quieter profile than dense Manhattan markets.",
    whoItFits: [
      "Buyers trading Manhattan density for space and outdoor access",
      "Families evaluating schools, parks, and house vs. apartment tradeoffs",
      "Sellers who need borough-specific comps—not Manhattan proxies",
    ],
    propertyTypes: ["Houses", "Co-op apartments and complexes", "Condominiums"],
    steps: [
      "Choose house vs. apartment ownership early.",
      "Use Bronx/Riverdale comps—not Manhattan averages.",
      "Factor commute time and parking needs into the brief.",
      "Inspect property systems or building financials carefully.",
      "Confirm one next step: valuation or search plan.",
    ],
    commonMistakes: [
      "Anchoring to Manhattan price-per-foot without local comps.",
      "Underestimating house maintenance and tax realities.",
      "Ignoring co-op campus rules and fees.",
    ],
    faqs: [
      {
        q: "Is Riverdale part of a practical NYC commute?",
        a: "For many residents yes, depending on workplace and transit mode. Validate your actual door-to-door commute before prioritizing space over location.",
      },
      {
        q: "Do Riverdale houses need different diligence than condos?",
        a: "Yes. Houses require property-level inspection of structure, systems, and taxes; co-ops and condos emphasize building financials and policies.",
      },
      {
        q: "How should sellers price in Riverdale?",
        a: "Use recent local comps in the same housing class, adjust for condition and outdoor space, and avoid Manhattan-based anchoring.",
      },
    ],
    relatedGuides: ["condo-vs-coop-nyc", "nyc-closing-costs"],
    relatedNeighborhoods: ["astoria", "upper-west-side", "st-george"],
    updatedAt: "2026-07-23",
    author: "Mario Toscano",
    sources: [
      { label: "Recent closed sales and active listings", note: "Use local Bronx comps; medians are indicative only." },
    ],
    primaryCta: "consult",
  },
  {
    slug: "st-george",
    name: "St. George",
    borough: "Staten Island",
    summary: "Staten Island’s civic and ferry hub with growing residential interest, harbor views, and a different price structure than Manhattan.",
    medianLabel: "$580K indicative median",
    methodologyNote: methodology,
    image: "/images/hero-city.svg",
    directAnswer:
      "St. George is Staten Island’s ferry-connected hub where buyers trade Manhattan prices for space and waterfront adjacency—while underwriting ferry commute realities, local comps, and property condition. It is not priced like a Manhattan condo corridor and should not be analyzed as one.",
    definition:
      "St. George sits at the northeastern tip of Staten Island near the Staten Island Ferry terminal, with civic buildings, harbor views, and a mix of houses, condos, and smaller multifamily stock.",
    whoItFits: [
      "Buyers prioritizing ferry access to Lower Manhattan and more space per dollar",
      "First-time or value-focused buyers comparing outer-borough options",
      "Sellers who need Staten Island comps and honest ferry-commute positioning",
    ],
    propertyTypes: ["Houses", "Condominiums", "Small multifamily"],
    steps: [
      "Validate ferry and transit commute against your real schedule.",
      "Use Staten Island comps—not Manhattan or Brooklyn proxies.",
      "Inspect property condition and ownership costs carefully.",
      "For sellers: market location benefits without overclaiming Manhattan equivalence.",
      "Choose one next step: search brief or valuation.",
    ],
    commonMistakes: [
      "Comparing St. George to FiDi on price-per-foot without context.",
      "Ignoring commute variability and weather impacts on ferry travel.",
      "Skipping local inventory analysis in favor of citywide narratives.",
    ],
    faqs: [
      {
        q: "Is St. George a good alternative to Lower Manhattan?",
        a: "For some buyers who value space and ferry access, yes. It is a different market with different comps, amenities, and lifestyle tradeoffs—evaluate it on its own terms.",
      },
      {
        q: "How important is the ferry?",
        a: "The ferry is a core location feature for many St. George buyers. Test the commute at your actual hours before committing.",
      },
      {
        q: "What should sellers highlight?",
        a: "Harbor proximity, ferry access, property condition, and clear local comps—priced to Staten Island demand, not Manhattan headlines.",
      },
    ],
    relatedGuides: ["nyc-closing-costs", "sell-a-condo-in-nyc"],
    relatedNeighborhoods: ["financial-district", "brooklyn-heights", "riverdale"],
    updatedAt: "2026-07-23",
    author: "Mario Toscano",
    sources: [
      { label: "Recent closed sales and active listings", note: "Use Staten Island local comps; medians are indicative only." },
    ],
    primaryCta: "consult",
  },
  {
    slug: "midtown-east",
    name: "Midtown East",
    borough: "Manhattan",
    summary: "Corporate-adjacent condos and co-ops near Grand Central, with strong Pied-à-terre and primary-residence demand.",
    medianLabel: "$1.25M indicative median",
    methodologyNote: methodology,
    image: "/images/neighborhoods/midtown-east.png",
    directAnswer:
      "Midtown East pricing turns on building class, floor, noise exposure, and proximity to transit—not a single corridor average. Buyers should underwrite monthly costs; sellers should comps against similar towers and co-ops.",
    definition:
      "Midtown East covers the East Side of Midtown Manhattan around Grand Central and nearby residential corridors known for full-service buildings and mixed primary/pied-à-terre use.",
    whoItFits: [
      "Buyers prioritizing Midtown convenience and transit",
      "Sellers in full-service buildings competing with similar inventory",
      "Pied-à-terre buyers reviewing building policies carefully",
    ],
    propertyTypes: ["Condominium towers", "Co-op apartments", "Select boutique residences"],
    steps: [
      "Filter by ownership type and building policies first.",
      "Comps by building class and line—not Zip-wide averages.",
      "Model common charges and taxes with purchase price.",
      "For sellers: price to active Midtown competition.",
      "Confirm one next step: brief, valuation, or consult.",
    ],
    commonMistakes: [
      "Ignoring noise and light differences between avenues and side streets.",
      "Using downtown loft comps for Midtown layouts.",
      "Skipping pied-à-terre or sublet rule checks.",
    ],
    faqs: [
      {
        q: "Is Midtown East good for pied-à-terre buyers?",
        a: "Often, when building rules allow it. Always confirm policies, financing norms, and carrying costs before bidding.",
      },
      {
        q: "How should sellers price here?",
        a: "Use building-class comps and current active listings. Midtown competition can be deep—presentation and monthly costs matter.",
      },
      {
        q: "Condo or co-op in Midtown East?",
        a: "Both exist. Choose based on flexibility, board comfort, and total monthly cost—not location alone.",
      },
    ],
    sources: [
      { label: "Recent closed sales and active listings", note: "Use local comps in the same property class; medians on this page are indicative only." },
      { label: "NYC Department of Finance property records", note: "Property-specific tax and ownership context—not a neighborhood pricing shortcut." },
    ],
    relatedGuides: ["condo-vs-coop-nyc", "nyc-apartment-worth"],
    relatedNeighborhoods: ["chelsea", "upper-east-side", "financial-district"],
    updatedAt: "2026-07-24",
    author: "Mario Toscano",
    primaryCta: "buy",
  },
  {
    slug: "tribeca",
    name: "Tribeca",
    borough: "Manhattan",
    summary: "Lofts, luxury condos, and townhouses in a low-rise historic district with limited inventory and high price points.",
    medianLabel: "$3.20M indicative median",
    methodologyNote: methodology,
    image: "/images/neighborhoods/tribeca.png",
    directAnswer:
      "Tribeca is a scarce, high-price Lower Manhattan market where loft volume, outdoor space, and building character drive outcomes. Comps must stay tight—neighborhood averages mislead.",
    definition:
      "Tribeca is a historic cast-iron and loft district in Lower Manhattan known for large residences, limited turnover, and premium pricing.",
    whoItFits: [
      "Buyers seeking large lofts or luxury homes downtown",
      "Sellers who need precise comps in a low-inventory market",
      "Owners weighing renovation ROI carefully",
    ],
    propertyTypes: ["Loft condominiums", "Luxury condo buildings", "Townhouses"],
    steps: [
      "Segment loft vs. conventional luxury comps.",
      "Document outdoor space, ceiling height, and renovation quality.",
      "Price to scarce inventory without ignoring active competition.",
      "Plan diligence on building and landmark constraints early.",
      "Set one next action with an advisor.",
    ],
    commonMistakes: [
      "Using FiDi tower comps for Tribeca lofts.",
      "Assuming scarcity justifies any ask.",
      "Underestimating renovation and carrying costs.",
    ],
    faqs: [
      {
        q: "Why are Tribeca prices so high?",
        a: "Limited inventory, large units, and strong demand for character downtown living support premiums—but each property still needs its own comps.",
      },
      {
        q: "Are lofts hard to compare?",
        a: "Yes. Layout efficiency, light, and outdoor space vary widely. Measure usable rooms, not only square footage marketing claims.",
      },
      {
        q: "Is Tribeca good for investors?",
        a: "Only with careful underwriting of purchase price, carrying costs, rental rules, and exit liquidity. Lifestyle demand is not a substitute for numbers.",
      },
    ],
    sources: [
      { label: "Recent closed sales and active listings", note: "Use local comps in the same property class; medians on this page are indicative only." },
      { label: "NYC Department of Finance property records", note: "Property-specific tax and ownership context—not a neighborhood pricing shortcut." },
    ],
    relatedGuides: ["sell-a-condo-in-nyc", "nyc-apartment-worth"],
    relatedNeighborhoods: ["financial-district", "chelsea", "brooklyn-heights"],
    updatedAt: "2026-07-24",
    author: "Mario Toscano",
    primaryCta: "consult",
  },
  {
    slug: "greenpoint",
    name: "Greenpoint",
    borough: "Brooklyn",
    summary: "Waterfront and inland Brooklyn living with condos, townhouses, and a strong local retail scene near Williamsburg.",
    medianLabel: "$1.20M indicative median",
    methodologyNote: methodology,
    image: "/images/neighborhoods/greenpoint.png",
    directAnswer:
      "Greenpoint buyers and sellers should separate waterfront new development from inland smaller stock. Lifestyle demand is strong, but abatements, monthly costs, and exact block still decide price.",
    definition:
      "Greenpoint is a northern Brooklyn neighborhood adjacent to Williamsburg, with industrial-to-residential conversion history, waterfront towers, and low-rise residential streets.",
    whoItFits: [
      "Buyers comparing Greenpoint vs. Williamsburg value",
      "Sellers of new-development or townhouse product",
      "Investors modeling abatement roll-offs",
    ],
    propertyTypes: ["Waterfront condominiums", "Resale condos", "Townhouses"],
    steps: [
      "Split waterfront vs. inland comps.",
      "Compare new development and resale carrying costs.",
      "Check tax abatement timelines when relevant.",
      "For sellers: differentiate against nearby Williamsburg inventory.",
      "Confirm next step: search brief or valuation.",
    ],
    commonMistakes: [
      "Treating Greenpoint and Williamsburg as one price band.",
      "Ignoring abatement expiration.",
      "Skipping transit and flood-zone diligence where relevant.",
    ],
    faqs: [
      {
        q: "Is Greenpoint cheaper than Williamsburg?",
        a: "Often on a headline basis for some product types, but not always. Compare building class, monthly costs, and location within each neighborhood.",
      },
      {
        q: "What sells well here?",
        a: "Well-priced, well-presented homes with practical layouts and competitive carrying costs—across both new and resale segments.",
      },
      {
        q: "Should investors buy waterfront towers?",
        a: "Only after modeling HOA costs, taxes, rental rules, and exit competition from other new supply.",
      },
    ],
    sources: [
      { label: "Recent closed sales and active listings", note: "Use local comps in the same property class; medians on this page are indicative only." },
      { label: "NYC Department of Finance property records", note: "Property-specific tax and ownership context—not a neighborhood pricing shortcut." },
    ],
    relatedGuides: ["sell-a-condo-in-nyc", "nyc-closing-costs"],
    relatedNeighborhoods: ["williamsburg", "long-island-city", "bushwick"],
    updatedAt: "2026-07-24",
    author: "Mario Toscano",
    primaryCta: "buy",
  },
  {
    slug: "bushwick",
    name: "Bushwick",
    borough: "Brooklyn",
    summary: "Evolving Brooklyn market with multifamily, condos, and loft conversions—important for value and investment screening.",
    medianLabel: "$900K indicative median",
    methodologyNote: methodology,
    image: "/images/neighborhoods/bushwick.png",
    directAnswer:
      "Bushwick rewards buyers and investors who underwrite block-by-block. Property type, building condition, and rental rules matter more than borough-wide narratives.",
    definition:
      "Bushwick is a northeastern Brooklyn neighborhood with a mix of multifamily buildings, newer condos, loft conversions, and ongoing neighborhood change.",
    whoItFits: [
      "Value-focused buyers willing to trade Manhattan adjacency for space",
      "Small multifamily or condo investors who underwrite carefully",
      "Sellers who need honest local comps—not hype pricing",
    ],
    propertyTypes: ["Multifamily buildings", "Condominiums", "Loft conversions"],
    steps: [
      "Define use case: primary home vs. investment.",
      "Comps within the same property class and micro-area.",
      "Inspect condition, systems, and regulatory context carefully.",
      "Model rents, expenses, and exit options for investments.",
      "Set one next step: thesis review or valuation.",
    ],
    commonMistakes: [
      "Extrapolating Williamsburg prices into Bushwick blocks.",
      "Skipping building and regulatory diligence on multifamily.",
      "Overestimating renovation ROI.",
    ],
    faqs: [
      {
        q: "Is Bushwick good for first-time buyers?",
        a: "It can be when budget, building quality, and commute fit. Focus on ownership costs and resale liquidity—not trend headlines alone.",
      },
      {
        q: "What should investors prioritize?",
        a: "In-place income, expense reality, financing, renovation needs, and a clear exit—documented before touring emotionally.",
      },
      {
        q: "How should sellers price?",
        a: "Use tight local comps in the same housing class and present condition honestly.",
      },
    ],
    sources: [
      { label: "Recent closed sales and active listings", note: "Use local comps in the same property class; medians on this page are indicative only." },
      { label: "NYC Department of Finance property records", note: "Property-specific tax and ownership context—not a neighborhood pricing shortcut." },
    ],
    relatedGuides: ["nyc-closing-costs", "condo-vs-coop-nyc"],
    relatedNeighborhoods: ["williamsburg", "greenpoint", "mott-haven"],
    updatedAt: "2026-07-24",
    author: "Mario Toscano",
    primaryCta: "invest",
  },
  {
    slug: "forest-hills",
    name: "Forest Hills",
    borough: "Queens",
    summary: "Queens neighborhood with co-ops, houses, and condos, strong transit, and a more residential pace than core Manhattan.",
    medianLabel: "$750K indicative median",
    methodologyNote: methodology,
    image: "/images/neighborhoods/forest-hills.png",
    directAnswer:
      "Forest Hills decisions depend on housing type—garden co-ops, houses, and condos follow different comps. Buyers should match ownership type to lifestyle and financing; sellers should stay local on pricing.",
    definition:
      "Forest Hills is a central Queens neighborhood known for co-op campuses, residential streets, shopping corridors, and express transit to Manhattan.",
    whoItFits: [
      "Buyers seeking Queens space and transit access",
      "Co-op buyers comfortable with board processes",
      "Families comparing houses vs. apartment ownership",
    ],
    propertyTypes: ["Garden and high-rise co-ops", "Houses", "Condominiums"],
    steps: [
      "Choose house vs. co-op vs. condo early.",
      "Use Forest Hills comps—not Manhattan proxies.",
      "Review board rules or house inspection needs thoroughly.",
      "Model commute and carrying costs into the brief.",
      "Confirm next step: search plan or valuation.",
    ],
    commonMistakes: [
      "Comparing Forest Hills co-ops to LIC towers without adjustment.",
      "Skipping co-op financial review.",
      "Underestimating house maintenance.",
    ],
    faqs: [
      {
        q: "Are Forest Hills co-ops a good entry point?",
        a: "Often for buyers who accept board requirements in exchange for relative value. Get clarity on financing and package standards early.",
      },
      {
        q: "How important is the express subway?",
        a: "It is a major demand driver for many buyers. Validate your actual commute before paying a transit premium.",
      },
      {
        q: "What should sellers emphasize?",
        a: "Building health or home condition, outdoor space, and honest local comps.",
      },
    ],
    sources: [
      { label: "Recent closed sales and active listings", note: "Use local comps in the same property class; medians on this page are indicative only." },
      { label: "NYC Department of Finance property records", note: "Property-specific tax and ownership context—not a neighborhood pricing shortcut." },
    ],
    relatedGuides: ["condo-vs-coop-nyc", "sell-a-coop-in-nyc"],
    relatedNeighborhoods: ["astoria", "long-island-city", "flushing"],
    updatedAt: "2026-07-24",
    author: "Mario Toscano",
    primaryCta: "buy",
  },
  {
    slug: "flushing",
    name: "Flushing",
    borough: "Queens",
    summary: "Dense Queens hub with condos, co-ops, and houses, major retail, and diverse buyer demand.",
    medianLabel: "$680K indicative median",
    methodologyNote: methodology,
    image: "/images/neighborhoods/flushing.png",
    directAnswer:
      "Flushing is a high-activity Queens market where condo towers, co-ops, and houses serve different buyer pools. Price and underwrite within the correct property class.",
    definition:
      "Flushing is a major northeastern Queens center known for density, commerce, condominium development, and a broad mix of housing types.",
    whoItFits: [
      "Buyers seeking Queens value and amenity density",
      "Condo buyers comparing new and resale towers",
      "Investors screening rental demand carefully",
    ],
    propertyTypes: ["Condominiums", "Co-ops", "Houses and small multifamily"],
    steps: [
      "Define property type and budget including closing costs.",
      "Comps within the same class and micro-location.",
      "Review building financials or property condition.",
      "For investors: model rents, expenses, and rules.",
      "Set one next step with an advisor.",
    ],
    commonMistakes: [
      "Mixing house and condo comps.",
      "Ignoring monthly costs in tower buildings.",
      "Skipping local inventory analysis.",
    ],
    faqs: [
      {
        q: "Is Flushing good for investors?",
        a: "It can be when purchase price, expenses, and rental rules support the thesis. Demand density helps, but underwriting still decides outcomes.",
      },
      {
        q: "Condo or co-op here?",
        a: "Both are active. Match flexibility, board comfort, and carrying costs to your goals.",
      },
      {
        q: "How should sellers prepare?",
        a: "Present condition clearly, price to active local competition, and assemble documents early.",
      },
    ],
    sources: [
      { label: "Recent closed sales and active listings", note: "Use local comps in the same property class; medians on this page are indicative only." },
      { label: "NYC Department of Finance property records", note: "Property-specific tax and ownership context—not a neighborhood pricing shortcut." },
    ],
    relatedGuides: ["sell-a-condo-in-nyc", "nyc-closing-costs"],
    relatedNeighborhoods: ["forest-hills", "long-island-city", "astoria"],
    updatedAt: "2026-07-24",
    author: "Mario Toscano",
    primaryCta: "invest",
  },
  {
    slug: "mott-haven",
    name: "Mott Haven",
    borough: "Bronx",
    summary: "South Bronx waterfront and inland blocks with newer condos, multifamily, and improving connectivity to Manhattan.",
    medianLabel: "$550K indicative median",
    methodologyNote: methodology,
    image: "/images/neighborhoods/mott-haven.png",
    directAnswer:
      "Mott Haven is a changing Bronx market where new condo product and multifamily assets require careful underwriting. Buyers and investors should rely on local comps and building-level diligence—not citywide narratives.",
    definition:
      "Mott Haven sits in the South Bronx with waterfront development, loft and condo projects, and a mix of older multifamily stock.",
    whoItFits: [
      "Buyers seeking relative value near Manhattan access",
      "Investors screening emerging-neighborhood risk honestly",
      "Sellers of new or resale condo inventory",
    ],
    propertyTypes: ["Newer condominiums", "Multifamily buildings", "Loft conversions"],
    steps: [
      "Separate new condo vs. multifamily underwriting.",
      "Use local Bronx comps—not Manhattan price-per-foot.",
      "Stress-test carrying costs, rents, and exit assumptions.",
      "Review building and neighborhood risk factors clearly.",
      "Confirm one next step: thesis or valuation.",
    ],
    commonMistakes: [
      "Anchoring to Manhattan pricing.",
      "Ignoring construction and supply pipeline effects.",
      "Underestimating operating expenses on multifamily.",
    ],
    faqs: [
      {
        q: "Is Mott Haven a good investment bet?",
        a: "Only with conservative underwriting. Momentum stories are not a substitute for income, expenses, and exit liquidity analysis.",
      },
      {
        q: "What should condo buyers watch?",
        a: "Monthly costs, sponsor vs. resale dynamics, building policies, and comparable active inventory.",
      },
      {
        q: "How should sellers price new vs. resale?",
        a: "Differentiate condition and monthly costs against live competition; do not rely on peak sponsor pricing alone.",
      },
    ],
    sources: [
      { label: "Recent closed sales and active listings", note: "Use local comps in the same property class; medians on this page are indicative only." },
      { label: "NYC Department of Finance property records", note: "Property-specific tax and ownership context—not a neighborhood pricing shortcut." },
    ],
    relatedGuides: ["nyc-apartment-worth", "nyc-closing-costs"],
    relatedNeighborhoods: ["long-island-city", "bushwick", "riverdale"],
    updatedAt: "2026-07-24",
    author: "Mario Toscano",
    primaryCta: "invest",
  },
  {
    slug: "downtown-brooklyn",
    name: "Downtown Brooklyn",
    borough: "Brooklyn",
    summary: "High-rise condo hub with strong transit, mixed-use density, and competition between new and resale towers.",
    medianLabel: "$1.05M indicative median",
    methodologyNote: methodology,
    image: "/images/neighborhoods/downtown-brooklyn.png",
    directAnswer:
      "Downtown Brooklyn is a condo-tower market where amenities, views, monthly costs, and new-supply competition drive results. Sellers must price against active towers; buyers should underwrite abatements and carrying costs.",
    definition:
      "Downtown Brooklyn is the borough’s civic and commercial core, characterized by high-rise residential development and major transit connections.",
    whoItFits: [
      "Condo buyers wanting Brooklyn with Manhattan-level transit access",
      "Sellers competing in a dense tower environment",
      "Investors modeling abatements and rental policies",
    ],
    propertyTypes: ["High-rise condominiums", "Newer full-service towers"],
    steps: [
      "Compare buildings on view, amenities, and reserves.",
      "Model taxes with and without remaining abatements.",
      "Review active competing inventory before bidding or listing.",
      "Confirm rental rules if investing.",
      "Pick one next step: tour plan, valuation, or thesis screen.",
    ],
    commonMistakes: [
      "Ignoring abatement roll-off.",
      "Paying for views that future construction may affect.",
      "Using brownstone Brooklyn comps for tower product.",
    ],
    faqs: [
      {
        q: "How competitive is Downtown Brooklyn for sellers?",
        a: "Very—resale often competes with new development. Differentiate on price, condition, and monthly costs.",
      },
      {
        q: "Is it good for pied-à-terre or rentals?",
        a: "Depends on building rules. Confirm policies before underwriting either use case.",
      },
      {
        q: "How does it compare to LIC?",
        a: "Both are tower markets with Manhattan adjacency themes, but comps, taxes, and buyer pools differ. Analyze each on its own data.",
      },
    ],
    sources: [
      { label: "Recent closed sales and active listings", note: "Use local comps in the same property class; medians on this page are indicative only." },
      { label: "NYC Department of Finance property records", note: "Property-specific tax and ownership context—not a neighborhood pricing shortcut." },
    ],
    relatedGuides: ["sell-a-condo-in-nyc", "nyc-apartment-worth"],
    relatedNeighborhoods: ["brooklyn-heights", "long-island-city", "financial-district"],
    updatedAt: "2026-07-24",
    author: "Mario Toscano",
    primaryCta: "buy",
  },
];

export function getNeighborhood(slug: string): Neighborhood | undefined {
  return neighborhoods.find((item) => item.slug === slug);
}

export function neighborhoodsByBorough(borough: Borough): Neighborhood[] {
  return neighborhoods.filter((item) => item.borough === borough);
}

export function ctaHref(cta: PrimaryCta): string {
  switch (cta) {
    case "sell":
      return "/sell";
    case "buy":
      return "/buy";
    case "invest":
      return "/invest";
    default:
      return "/#strategy";
  }
}

export function ctaLabel(cta: PrimaryCta, name: string): string {
  switch (cta) {
    case "sell":
      return `Get a ${name} valuation`;
    case "buy":
      return `Build a ${name} buyer brief`;
    case "invest":
      return `Screen a ${name} investment`;
    default:
      return `Discuss ${name}`;
  }
}
