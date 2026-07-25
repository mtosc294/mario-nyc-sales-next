"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trackConsultSubmit } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";

type Segment = "seller" | "buyer" | "investor";
type Result = { score: number; stage: string; nextAction: string } | null;

function segmentFromUrl(): Segment | null {
  if (typeof window === "undefined") return null;
  const fromSearch = new URLSearchParams(window.location.search).get("segment");
  if (fromSearch === "seller" || fromSearch === "buyer" || fromSearch === "investor") {
    return fromSearch;
  }
  const hash = window.location.hash;
  const qIndex = hash.indexOf("?");
  if (qIndex !== -1) {
    const fromHash = new URLSearchParams(hash.slice(qIndex + 1)).get("segment");
    if (fromHash === "seller" || fromHash === "buyer" || fromHash === "investor") {
      return fromHash;
    }
  }
  return null;
}

export function LeadForm() {
  const t = useTranslations("LeadForm");
  const [segment, setSegment] = useState<Segment>("seller");
  const [result, setResult] = useState<Result>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fromUrl = segmentFromUrl();
    if (fromUrl) setSegment(fromUrl);
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...payload, segment }),
    });
    const data = await response.json();
    setResult(data);
    trackConsultSubmit(segment);
    setLoading(false);
  }

  return (
    <div className="grid gap-[70px] max-[900px]:grid-cols-1 lg:grid-cols-[.72fr_1.28fr]">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--platinum)]">{t("getStarted")}</p>
        <h2 className="mt-4 text-5xl font-semibold leading-[1.03] tracking-[-0.045em] max-[600px]:text-[37px]">
          {t("title")}
        </h2>
        <p className="mt-4 leading-7 text-neutral-600">{t("body")}</p>
        <p className="mt-6 text-sm leading-6 text-neutral-500">
          {siteConfig.name} · Sponsored by {siteConfig.brokerage}
          <br />
          <a href={siteConfig.phoneHref} className="underline-offset-2 hover:underline">
            {siteConfig.phone}
          </a>
          {" · "}
          <a href={siteConfig.emailHref} className="underline-offset-2 hover:underline">
            {siteConfig.email}
          </a>
        </p>
      </div>
      <div className="rounded-[28px] border border-[var(--line)] bg-white p-7 shadow-[0_25px_60px_rgba(16,27,45,0.06)]">
        <div className="mb-5 grid grid-cols-3 rounded-[15px] bg-[var(--navy-soft)] p-1.5">
          {(["seller", "buyer", "investor"] as const).map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => {
                setSegment(item);
                setResult(null);
              }}
              className={`rounded-[11px] px-3 py-3 text-sm font-bold capitalize ${
                segment === item ? "bg-[var(--navy)] text-white" : "text-neutral-500"
              }`}
            >
              {t(item)}
            </button>
          ))}
        </div>
        {result ? (
          <div className="grid min-h-[360px] place-items-center text-center">
            <div>
              <CheckCircle2 className="mx-auto size-12 text-[var(--navy)]" />
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--platinum)]">{t("youreSet")}</p>
              <strong className="mt-3 block text-[28px]">{t("thanksTitle")}</strong>
              <p className="mt-3 max-w-md text-neutral-600">
                Recommended next step: {result.nextAction || "schedule a pricing and property review."}
              </p>
              <Button className="mt-7" onClick={() => setResult(null)}>
                {t("submitAnother")}
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="grid gap-3.5 sm:grid-cols-2">
            <label className="grid gap-2 text-[13px] font-bold">
              {t("name")}
              <Input name="name" required placeholder="Your name" className="h-12 rounded-xl" />
            </label>
            <label className="grid gap-2 text-[13px] font-bold">
              {t("email")}
              <Input name="email" type="email" required placeholder="you@example.com" className="h-12 rounded-xl" />
            </label>
            <label className="grid gap-2 text-[13px] font-bold">
              {t("phone")}
              <Input name="phone" type="tel" placeholder="Optional" className="h-12 rounded-xl" />
            </label>
            <label className="grid gap-2 text-[13px] font-bold">
              {t("timeline")}
              <select name="timeline" required className="h-12 rounded-xl border border-[var(--line)] bg-white px-4 text-sm">
                <option value="">{t("chooseTimeline")}</option>
                <option>Now / 0-3 months</option>
                <option>3-6 months</option>
                <option>6-12 months</option>
                <option>Exploring</option>
              </select>
            </label>
            <label className="grid gap-2 text-[13px] font-bold sm:col-span-2">
              {segment === "seller" ? t("propertyAddress") : t("targetLocation")}
              <Input
                name="location"
                required
                placeholder={segment === "seller" ? "Street address, unit, city" : "Neighborhoods or boroughs"}
                className="h-12 rounded-xl"
              />
            </label>
            <label className="grid gap-2 text-[13px] font-bold">
              {segment === "seller" ? t("estimatedValue") : t("budget")}
              <Input name="budget" placeholder="$1M-$1.5M" className="h-12 rounded-xl" />
            </label>
            <label className="grid gap-2 text-[13px] font-bold">
              {t("propertyType")}
              <Input name="propertyType" placeholder="Condo, co-op, townhouse..." className="h-12 rounded-xl" />
            </label>
            <label className="grid gap-2 text-[13px] font-bold sm:col-span-2">
              {t("whatShouldIKnow")}
              <textarea
                name="message"
                className="min-h-[100px] rounded-xl border border-[var(--line)] p-3.5 text-sm outline-none focus:border-[var(--navy)]"
                placeholder="Goals, constraints, financing, condition, or other context"
              />
            </label>
            <Button className="h-12 rounded-full sm:col-span-2" disabled={loading}>
              {loading ? t("sending") : t("submit")}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
