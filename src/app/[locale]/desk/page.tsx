import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { AlertTriangle, Filter, LockKeyhole } from "lucide-react";

export const metadata: Metadata = { title: "Opportunity Desk", robots: { index: false, follow: false } };

const leads = [
  { score: 92, stage: "Priority", segment: "Seller", contact: "Downtown condo owner", market: "Financial District", next: "Schedule pricing review" },
  { score: 84, stage: "Priority", segment: "Buyer", contact: "2-bed buyer", market: "UES / UWS", next: "Book strategy call" },
  { score: 71, stage: "Active", segment: "Investor", contact: "Small multifamily", market: "Brooklyn", next: "Clarify financing" },
];

type Props = { params: Promise<{ locale: string }> };

export default async function DeskPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <main className="min-h-screen bg-neutral-100 px-5 py-16"><div className="mx-auto max-w-6xl"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><div className="inline-flex items-center gap-2 rounded-full bg-neutral-200 px-3 py-1.5 text-xs font-semibold"><LockKeyhole className="size-3.5" /> Prototype private view</div><h1 className="mt-5 text-4xl font-semibold tracking-[-.045em]">Opportunity Desk</h1><p className="mt-3 text-neutral-600">Ranked leads, explicit next actions and source-of-truth status.</p></div><button className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold"><Filter className="size-4" /> Filter opportunities</button></div><div className="mt-10 overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm"><div className="grid grid-cols-[80px_110px_110px_1fr_1fr_1fr] gap-4 border-b border-neutral-200 bg-neutral-50 px-6 py-4 text-xs font-semibold uppercase tracking-[.12em] text-neutral-500"><span>Score</span><span>Stage</span><span>Segment</span><span>Contact</span><span>Market</span><span>Next action</span></div>{leads.map((lead) => <div key={lead.contact} className="grid grid-cols-[80px_110px_110px_1fr_1fr_1fr] gap-4 border-b border-neutral-100 px-6 py-5 text-sm last:border-0"><strong className="text-lg">{lead.score}</strong><span>{lead.stage}</span><span>{lead.segment}</span><span>{lead.contact}</span><span>{lead.market}</span><strong>{lead.next}</strong></div>)}</div><div className="mt-8 flex gap-3 rounded-2xl border border-[var(--line)] bg-[var(--navy-soft)] p-5 text-sm leading-6 text-[var(--ink)]"><AlertTriangle className="mt-0.5 size-5 shrink-0" /><p>This is sample data. Production access must require authentication, authorization, encrypted storage, audit logs and durable consent / do-not-contact controls.</p></div></div></main>;
}
