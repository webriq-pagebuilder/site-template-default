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

  // This proxy relays only to the fixed, server-configured PUBLISHFORGE_WEBHOOK_URL
  // (never a client-supplied URL), so it is not an SSRF vector. It is same-origin —
  // called by the Studio publish actions — and the PublishForge webhook authenticates
  // the payload itself via its own ?token= / x-publishforge-webhook-secret. The shape
  // check below keeps this from acting as an open relay for arbitrary/empty bodies.
  const body = req.body;
  if (
    !body ||
    typeof body !== "object" ||
    Array.isArray(body) ||
    Object.keys(body).length === 0
  ) {
    return res.status(400).json({ error: "Invalid or empty request body" });
  }

  const response = await fetch(PUBLISHFORGE_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => null);
  return res.status(response.status).json(data ?? {});
}
