import type { NextApiRequest, NextApiResponse } from "next";
import { readFile } from "node:fs/promises";
import { listAgentFiles } from "lib/agents/read-agents";

/**
 * Raw markdown endpoint behind the Accept-negotiation rewrite.
 *
 * `middleware.ts` rewrites `GET /agents/<slug>` here when the request carries
 * `Accept: text/markdown` (Vercel/Cloudflare agent convention), so agents get
 * the source markdown (frontmatter included) instead of the marked-rendered
 * HTML page. Humans never see this URL — the public URL stays /agents/<slug>.
 *
 * Slug resolution goes through listAgentFiles() (allowlist of real content
 * files), never through path joining with user input — no traversal surface.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD");
    res.status(405).end("Method Not Allowed");
    return;
  }

  const slug = req.query.slug;
  if (typeof slug !== "string" || slug.length === 0) {
    res.status(400).end("Bad Request");
    return;
  }

  const refs = await listAgentFiles();
  const ref = refs.find((r) => r.slug === slug);
  if (!ref) {
    res.status(404).end("Not Found");
    return;
  }

  const raw = await readFile(ref.absPath, "utf-8");

  res.setHeader("Content-Type", "text/markdown; charset=utf-8");
  // Same indexing posture as the HTML twin (see next.config.mjs headers()).
  res.setHeader("X-Robots-Tag", "noindex");
  res.setHeader("Vary", "Accept");
  // Content only changes on deploy (files are committed + statically bundled),
  // so let the CDN hold it briefly and revalidate in the background.
  res.setHeader(
    "Cache-Control",
    "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
  );
  res.status(200).send(raw);
}
