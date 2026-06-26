import type { NextApiRequest, NextApiResponse } from "next";
import { PUBLISHFORGE_WEBHOOK_URL } from "studio/config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!PUBLISHFORGE_WEBHOOK_URL) {
    return res
      .status(500)
      .json({ error: "NEXT_PUBLIC_PUBLISHFORGE_WEBHOOK_URL is not set" });
  }

  // SEC-18: PublishForge requires the shared secret as a header (the ?token=
  // query fallback was removed). Read from a SERVER-ONLY env var — never
  // NEXT_PUBLIC_ — so the secret is not bundled to the browser.
  const webhookSecret = process.env.PUBLISHFORGE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return res
      .status(500)
      .json({ error: "PUBLISHFORGE_WEBHOOK_SECRET is not set" });
  }

  const response = await fetch(PUBLISHFORGE_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-publishforge-webhook-secret": webhookSecret,
    },
    body: JSON.stringify(req.body),
  });

  const data = await response.json().catch(() => null);
  return res.status(response.status).json(data ?? {});
}
