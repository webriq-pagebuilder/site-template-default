/**
 * Newsletter subscribe relay → PublishForge.
 *
 * The webriq-forms webhook for the `newsletter` form is pointed at this same-origin
 * route. webriq webhooks cannot send custom headers or be signed, so this server-side
 * relay holds the PublishForge ingest key (server env, never the browser/URL) and
 * forwards the submission to PublishForge with an `Authorization: Bearer` header.
 *
 * Optional: if PF_NEWSLETTER_INGEST_URL / PF_NEWSLETTER_INGEST_KEY are unset, this
 * site is not linked to a PublishForge — the relay is a safe no-op.
 *
 * Fire-and-forget: always responds 2xx so the webriq webhook is never retried, and
 * this has no bearing on the visitor's original form submission.
 */
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "POST method only" });
  }

  const url = process.env.PF_NEWSLETTER_INGEST_URL;
  const key = process.env.PF_NEWSLETTER_INGEST_KEY;

  // Not linked to a PublishForge — accept and ignore.
  if (!url || !key) {
    return res.status(200).json({ ok: true, ignored: "publishforge not linked" });
  }

  try {
    const pfRes = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
        // Forward the originating site so PublishForge can tag metadata.site.
        referer:
          (req.headers.referer as string) ||
          process.env.NEXT_PUBLIC_SITE_URL ||
          "",
      },
      body: JSON.stringify(req.body ?? {}),
    });
    // A non-2xx PublishForge response (e.g. 401 = ingest key mismatch, 503 =
    // PF not configured) does not throw — log it so the failure is visible
    // instead of silently swallowed. Still respond 2xx to the form/webhook.
    if (!pfRes.ok) {
      console.error(
        `Newsletter relay: PublishForge responded ${pfRes.status} ${pfRes.statusText}`
      );
    }
  } catch (error) {
    // Never fail the webhook over a relay/PublishForge hiccup.
    console.error("Newsletter relay error:", error);
  }

  return res.status(200).json({ ok: true });
}
