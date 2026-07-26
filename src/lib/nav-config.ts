export type NavLink = { labelKey: string; href: string };

export type NavColumn = { links: NavLink[] };

export type NavItem = {
  id: string;
  labelKey: string;
  href: string;
  columns: NavColumn[];
};

export const primaryNav: NavItem[] = [
  {
    id: "buy",
    labelKey: "buy",
    href: "/buy",
    columns: [
      {
        links: [
          { labelKey: "buyOverview", href: "/buy" },
          { labelKey: "condoVsCoop", href: "/guides/condo-vs-coop-nyc" },
          { labelKey: "closingCosts", href: "/guides/nyc-closing-costs" },
          { labelKey: "buyerBrief", href: "/?segment=buyer#strategy" },
        ],
      },
    ],
  },
  {
    id: "sell",
    labelKey: "sell",
    href: "/sell",
    columns: [
      {
        links: [
          { labelKey: "sellOverview", href: "/sell" },
          { labelKey: "apartmentWorth", href: "/guides/nyc-apartment-worth" },
          { labelKey: "sellCondo", href: "/guides/sell-a-condo-in-nyc" },
          { labelKey: "sellCoop", href: "/guides/sell-a-coop-in-nyc" },
          { labelKey: "closingCosts", href: "/guides/nyc-closing-costs" },
          { labelKey: "sellerConsult", href: "/?segment=seller#strategy" },
        ],
      },
    ],
  },
  {
    id: "invest",
    labelKey: "invest",
    href: "/invest",
    columns: [
      {
        links: [
          { labelKey: "investOverview", href: "/invest" },
          { labelKey: "investorConsult", href: "/?segment=investor#strategy" },
        ],
      },
    ],
  },
  {
    id: "neighborhoods",
    labelKey: "neighborhoods",
    href: "/neighborhoods",
    columns: [
      {
        links: [
          { labelKey: "allNeighborhoods", href: "/neighborhoods" },
          { labelKey: "manhattan", href: "/neighborhoods#manhattan" },
          { labelKey: "brooklyn", href: "/neighborhoods#brooklyn" },
          { labelKey: "queens", href: "/neighborhoods#queens" },
          { labelKey: "bronx", href: "/neighborhoods#bronx" },
          { labelKey: "statenIsland", href: "/neighborhoods#staten-island" },
        ],
      },
    ],
  },
  {
    id: "guides",
    labelKey: "guides",
    href: "/#guides",
    columns: [
      {
        links: [
          { labelKey: "allGuides", href: "/#guides" },
          { labelKey: "apartmentWorth", href: "/guides/nyc-apartment-worth" },
          { labelKey: "sellCondo", href: "/guides/sell-a-condo-in-nyc" },
          { labelKey: "sellCoop", href: "/guides/sell-a-coop-in-nyc" },
          { labelKey: "condoVsCoop", href: "/guides/condo-vs-coop-nyc" },
          { labelKey: "closingCosts", href: "/guides/nyc-closing-costs" },
        ],
      },
    ],
  },
];
