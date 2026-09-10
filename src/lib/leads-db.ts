import { neon } from "@neondatabase/serverless";
import type { ScoredLead } from "@/lib/lead-score";

export class LeadsDbNotConfiguredError extends Error {
  constructor() {
    super("DATABASE_URL is not set");
    this.name = "LeadsDbNotConfiguredError";
  }
}

function sqlClient() {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) throw new LeadsDbNotConfiguredError();
  return neon(url);
}

function optional(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export async function insertLead(lead: ScoredLead): Promise<void> {
  const sql = sqlClient();
  await sql`
    INSERT INTO leads (
      segment,
      name,
      email,
      phone,
      timeline,
      location,
      budget,
      property_type,
      message,
      score,
      stage,
      next_action
    )
    VALUES (
      ${lead.segment},
      ${lead.name.trim()},
      ${lead.email.trim()},
      ${optional(lead.phone)},
      ${lead.timeline.trim()},
      ${lead.location.trim()},
      ${optional(lead.budget)},
      ${optional(lead.propertyType)},
      ${optional(lead.message)},
      ${lead.score},
      ${lead.stage},
      ${lead.nextAction}
    )
  `;
}
