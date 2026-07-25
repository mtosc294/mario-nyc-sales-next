export type LeadInput = {
  segment: "seller" | "buyer" | "investor";
  name: string;
  email: string;
  phone?: string;
  timeline: string;
  location: string;
  budget?: string;
  propertyType?: string;
  message?: string;
};

export function scoreLead(lead: LeadInput) {
  let score = 35;
  if (lead.phone?.trim()) score += 12;
  if (/now|0-3|3-6|immediate/i.test(lead.timeline)) score += 22;
  else if (/6-12/i.test(lead.timeline)) score += 12;
  if (lead.location.trim().length > 3) score += 10;
  if (lead.budget?.trim()) score += 8;
  if (lead.propertyType?.trim()) score += 6;
  if ((lead.message?.trim().length ?? 0) >= 40) score += 7;
  score = Math.min(100, score);

  const stage = score >= 80 ? "Priority" : score >= 60 ? "Active" : "Nurture";
  const nextAction =
    lead.segment === "seller"
      ? score >= 80
        ? "Call to schedule a pricing and property review"
        : "Send seller preparation and valuation brief"
      : lead.segment === "buyer"
        ? score >= 80
          ? "Book buyer strategy consultation"
          : "Send financing and search-readiness checklist"
        : score >= 80
          ? "Review acquisition thesis and capital readiness"
          : "Send investment criteria worksheet";

  return { score, stage, nextAction };
}
