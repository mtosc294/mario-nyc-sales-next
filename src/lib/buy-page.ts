export const buyDirectAnswer =
  "The first step for an NYC buyer is a written brief—purchase budget, monthly carrying costs, ownership type (condo, co-op, townhouse, or house), non-negotiables, and target neighborhoods—before you open every listing. Then convert that brief into one next step: a focused search plan or a consult.";

export const buyUpdatedAt = "2026-07-25";

export const buyWhoItFits = [
  "Primary-residence buyers who want clarity before touring",
  "Relocators comparing boroughs, commute, and building types",
  "Pied-à-terre buyers weighing board rules, sublets, and carrying costs",
  "First-time and repeat buyers who need financing and ownership fit aligned",
] as const;

export const buySteps = [
  {
    title: "Model the real budget",
    text: "Include down payment, closing costs, reserves, and total monthly carrying costs—not purchase price alone.",
  },
  {
    title: "Choose the ownership fit",
    text: "Compare condo, co-op, townhouse, and small multifamily rules, financing, and exit flexibility.",
  },
  {
    title: "Search with hierarchy",
    text: "Separate non-negotiables from preferences so inventory can be evaluated consistently across neighborhoods.",
  },
  {
    title: "Prepare to execute",
    text: "Coordinate preapproval, proof of funds, attorney readiness, and offer strategy before the right unit appears.",
  },
] as const;

export const buyMistakes = [
  "Touring without a written budget and monthly carrying-cost model",
  "Ignoring common charges, taxes, and assessments when comparing list prices",
  "Treating co-ops like condos and discovering board requirements too late",
  "Missing mansion tax and other closing-cost thresholds until under contract",
  "Letting preferences override non-negotiables and stretching the search indefinitely",
] as const;

export const buyFaqs = [
  {
    q: "What should an NYC buyer do first?",
    a: "Write a buyer brief: budget, financing path, ownership type, must-haves, and target neighborhoods. Use that brief to filter listings and decide when to book a consult.",
  },
  {
    q: "Condo or co-op—which is better?",
    a: "Neither is universally better. Condos usually offer more ownership and sublet flexibility; co-ops often have a lower entry price but deeper financial review and board approval. Choose based on use case, liquidity, financing, restrictions, and exit plan.",
  },
  {
    q: "What monthly costs should I model besides the mortgage?",
    a: "Common charges or maintenance, property taxes (or your share), insurance, utilities if not included, and reserves for assessments. These change what you can offer at any given purchase price.",
  },
  {
    q: "Do I need preapproval before touring?",
    a: "For serious inventory it helps. Preapproval and proof of funds show sellers you can execute—and they keep your budget honest before emotions drive the search.",
  },
  {
    q: "How do neighborhoods fit into a buyer brief?",
    a: "Treat neighborhoods as constraints: commute, housing stock, price bands, and lifestyle. Open neighborhood guides after ownership type and budget are clear, then shortlist buildings that match both.",
  },
] as const;

export const buyGuideCards = [
  {
    href: "/guides/condo-vs-coop-nyc",
    title: "NYC condo vs. co-op",
    text: "Ownership, board review, financing, and exit differences that change what you should buy.",
  },
  {
    href: "/guides/nyc-closing-costs",
    title: "NYC buyer and seller closing costs",
    text: "Separate buyer costs from seller costs early—including mansion tax thresholds and ownership-type mechanics.",
  },
] as const;

export const buyHoodSlugs = ["chelsea", "brooklyn-heights", "astoria", "upper-west-side"] as const;
