/**
 * pf_known_pages producer — Sprint 2 AI Traffic Visibility (T-003 follow-up, H1).
 *
 * Posts the current discoverable-URL set to PublishForge `POST /api/track/known-pages`
 * so it can serve as the AI Crawl Coverage denominator. Called from the prebuild
 * sitemap step (scripts/generate-sitemap-agents.ts) — the same place the URL set is
 * already built — so additions/removals reconcile on every build.
 *
 * Design contract (matches the hardened PublishForge receiver):
 *   - Auth: `Authorization: Bearer ${PF_TRACK_KEY}` (the SAME key the edge middleware uses).
 *   - Endpoint: `PF_KNOWN_PAGES_URL` if set, else `${PF_TRACK_URL}/known-pages`.
 *   - `page_url` is a BARE PATHNAME so it keys identically to the middleware's payload
 *     (PF also normalizes server-side, but we stay aligned on purpose).
 *   - `replace: true` so URLs no longer emitted are deactivated (active=false).
 *   - Fire-and-forget / NON-FATAL: never throw — a failed or unreachable PF must not
 *     fail `next build`. No-op (skip) when PF_TRACK_URL / PF_TRACK_KEY are unset.
 */

export interface KnownPage {
  /** Bare pathname, e.g. "/agents/about-us". */
  page_url: string;
  /** "agent" | "product" | "content" | ... */
  page_type?: string | null;
}

/** PublishForge's /known-pages body cap is 2 MB; stay safely under it. */
const MAX_BODY_BYTES = 1_900_000;

function resolveEndpoint(): string | null {
  const explicit = process.env.PF_KNOWN_PAGES_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");
  const track = process.env.PF_TRACK_URL?.trim();
  if (!track) return null;
  // Sibling route of /api/track.
  return `${track.replace(/\/+$/, "")}/known-pages`;
}

/**
 * Syncs the known-page set to PublishForge. Resolves (never rejects) so callers can
 * `await` it inside a build script without risking a failed build.
 */
export async function syncKnownPages(pages: KnownPage[]): Promise<void> {
  const endpoint = resolveEndpoint();
  const key = process.env.PF_TRACK_KEY?.trim();

  if (!endpoint) {
    console.log(
      "[sync-known-pages] PF_TRACK_URL / PF_KNOWN_PAGES_URL unset — skipping known-pages sync (no-op).",
    );
    return;
  }
  if (!key) {
    console.warn(
      "[sync-known-pages] PF_TRACK_KEY unset — skipping (PublishForge would reject with 401).",
    );
    return;
  }

  // De-dupe by pathname (defensive; the receiver also de-dupes post-normalization).
  const seen = new Set<string>();
  const unique: KnownPage[] = [];
  for (const p of pages) {
    if (!p || typeof p.page_url !== "string" || p.page_url.length === 0)
      continue;
    if (seen.has(p.page_url)) continue;
    seen.add(p.page_url);
    unique.push({ page_url: p.page_url, page_type: p.page_type ?? null });
  }

  if (unique.length === 0) {
    console.warn("[sync-known-pages] no pages to sync — skipping.");
    return;
  }

  // Single full-set POST with replace:true. The /known-pages endpoint reconciles
  // deactivations per call (active rows older than this call's timestamp), so a
  // single complete POST is the correct shape. Chunking is intentionally NOT done:
  // multi-call replace would mis-deactivate earlier chunks. At ~70 B/entry the 2 MB
  // cap allows tens of thousands of URLs; if the set ever approaches that, extend the
  // endpoint with a sync token rather than chunk here.
  const body = JSON.stringify({ pages: unique, replace: true });
  const bytes = Buffer.byteLength(body, "utf8");
  if (bytes > MAX_BODY_BYTES) {
    console.warn(
      `[sync-known-pages] payload ${bytes} B exceeds the safe single-POST size (${MAX_BODY_BYTES} B) ` +
        `for ${unique.length} pages. Skipping to avoid a 413 / partial reconcile — extend ` +
        `/api/track/known-pages with a sync token before the known-page set grows this large.`,
    );
    return;
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${key}`,
      },
      body,
    });
    if (!res.ok) {
      console.warn(
        `[sync-known-pages] POST ${endpoint} -> ${res.status} (non-fatal; build continues).`,
      );
      return;
    }
    const result = (await res.json().catch(() => ({}))) as {
      upserted?: number;
      deactivated?: number;
    };
    console.log(
      `[sync-known-pages] synced ${unique.length} known page(s) -> ${endpoint}` +
        ` (upserted=${result.upserted ?? "?"}, deactivated=${
          result.deactivated ?? "?"
        }).`,
    );
  } catch (err) {
    // Never fail the build over the coverage-denominator sync.
    console.warn(
      "[sync-known-pages] sync failed (non-fatal):",
      (err as Error).message,
    );
  }
}
