import { NextResponse } from "next/server";
import { scoreLead, type LeadInput } from "@/lib/lead-score";

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<LeadInput>;
  if (!body.name || !body.email || !body.segment || !body.timeline || !body.location) {
    return NextResponse.json({ error: "Missing required lead fields" }, { status: 400 });
  }
  return NextResponse.json(scoreLead(body as LeadInput));
}
