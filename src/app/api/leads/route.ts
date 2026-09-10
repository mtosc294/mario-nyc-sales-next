import { NextResponse } from "next/server";
import { scoreLead, type LeadInput } from "@/lib/lead-score";
import { insertLead, LeadsDbNotConfiguredError } from "@/lib/leads-db";
import { notifyLead } from "@/lib/notify-lead";

const SEGMENTS = new Set<LeadInput["segment"]>(["seller", "buyer", "investor"]);

function asTrimmedString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

function parseLead(body: unknown): LeadInput | null {
  if (!body || typeof body !== "object") return null;
  const raw = body as Record<string, unknown>;
  const segment = asTrimmedString(raw.segment);
  const name = asTrimmedString(raw.name);
  const email = asTrimmedString(raw.email);
  const timeline = asTrimmedString(raw.timeline);
  const location = asTrimmedString(raw.location);
  if (!name || !email || !timeline || !location) return null;
  if (!segment || !SEGMENTS.has(segment as LeadInput["segment"])) return null;
  return {
    segment: segment as LeadInput["segment"],
    name,
    email,
    timeline,
    location,
    phone: asTrimmedString(raw.phone),
    budget: asTrimmedString(raw.budget),
    propertyType: asTrimmedString(raw.propertyType),
    message: asTrimmedString(raw.message),
  };
}

function honeypotFilled(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;
  const website = (body as Record<string, unknown>).website;
  return typeof website === "string" && website.trim().length > 0;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (honeypotFilled(body)) {
    return NextResponse.json({
      score: 35,
      stage: "Nurture",
      nextAction: "Send seller preparation and valuation brief",
    });
  }

  const lead = parseLead(body);
  if (!lead) {
    return NextResponse.json({ error: "Missing required lead fields" }, { status: 400 });
  }

  const scored = { ...lead, ...scoreLead(lead) };

  try {
    await insertLead(scored);
  } catch (error) {
    if (error instanceof LeadsDbNotConfiguredError) {
      return NextResponse.json({ error: "Lead capture is not configured" }, { status: 503 });
    }
    console.error("lead persist failed");
    return NextResponse.json({ error: "Could not save lead" }, { status: 500 });
  }

  try {
    await notifyLead(scored);
  } catch {
    console.error("lead notify failed");
  }

  return NextResponse.json({
    score: scored.score,
    stage: scored.stage,
    nextAction: scored.nextAction,
  });
}
