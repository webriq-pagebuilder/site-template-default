/**
 * On-demand revalidate webhook for agent-product pages.
 *
 * PublishForge calls this in `revalidate` publish mode to refresh a single
 * /agents-products/[slug] page without a rebuild. Token-gated with a dedicated
 * secret (constant-time compare) — do NOT reuse the open GET /api/revalidate
 * manual mode, which has no auth.
 *
 *   POST /api/agents-products/revalidate
 *   header: x-revalidate-token: <STACKSHIFT_REVALIDATE_SECRET>
 *   body:   { "slug": "<sku-slug>" }
 */

import { NextApiRequest, NextApiResponse } from "next";
import { timingSafeEqual } from "crypto";

function secretOk(provided: string | undefined): boolean {
  const expected = process.env.STACKSHIFT_REVALIDATE_SECRET ?? "";
  // Length check guards timingSafeEqual (it throws on unequal-length buffers)
  // and is not itself the security boundary.
  if (!provided || !expected || provided.length !== expected.length) {
    return false;
  }
  return timingSafeEqual(Buffer.from(provided), Buffer.from(expected));
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const token = (req.headers["x-revalidate-token"] as string) ?? "";
  if (!secretOk(token)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const slug = (req.body?.slug ?? "").toString().trim();
  if (!slug) {
    return res.status(400).json({ message: "Missing slug" });
  }

  try {
    await res.revalidate(`/agents/products/${slug}`);
    return res.status(200).json({ revalidated: true, slug });
  } catch (e) {
    console.error(`[agents/products] revalidate failed for "${slug}":`, e);
    return res.status(500).json({ revalidated: false, error: String(e) });
  }
}
