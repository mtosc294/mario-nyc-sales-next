export function trackConsultSubmit(segment: string) {
  if (typeof window === "undefined") return;
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (!gtag) return;
  gtag("event", "generate_lead", {
    event_category: "consult",
    event_label: segment,
    method: "strategy_form",
  });
  gtag("event", "consult_submit", { segment });
}
