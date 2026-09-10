import { Resend } from "resend";
import { siteConfig } from "@/lib/site-config";
import type { ScoredLead } from "@/lib/lead-score";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function row(label: string, value: string | undefined): string {
  const display = value?.trim() ? escapeHtml(value.trim()) : "—";
  return `<tr><th align="left" style="padding:6px 12px 6px 0;vertical-align:top;color:#6b7280;font-weight:600;">${label}</th><td style="padding:6px 0;white-space:pre-wrap;">${display}</td></tr>`;
}

function leadEmailHtml(lead: ScoredLead): string {
  return `
    <p>A new strategy form lead was submitted on ${escapeHtml(siteConfig.siteUrl)}.</p>
    <table cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.45;">
      ${row("Stage", lead.stage)}
      ${row("Score", String(lead.score))}
      ${row("Next action", lead.nextAction)}
      ${row("Segment", lead.segment)}
      ${row("Name", lead.name)}
      ${row("Email", lead.email)}
      ${row("Phone", lead.phone)}
      ${row("Timeline", lead.timeline)}
      ${row("Location", lead.location)}
      ${row("Budget / value", lead.budget)}
      ${row("Property type", lead.propertyType)}
      ${row("Message", lead.message)}
    </table>
  `;
}

export async function notifyLead(lead: ScoredLead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.LEAD_FROM?.trim();
  const to = process.env.LEAD_NOTIFY_TO?.trim() || siteConfig.email;

  if (!apiKey || !from) {
    console.error("lead notify skipped: RESEND_API_KEY or LEAD_FROM is not set");
    return;
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: lead.email.trim(),
    subject: `New ${lead.stage} ${lead.segment} lead — ${lead.name.trim()}`,
    html: leadEmailHtml(lead),
  });

  if (error) {
    console.error("lead notify failed", error.name, error.message);
  }
}
