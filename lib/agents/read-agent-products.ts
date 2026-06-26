// PublishForge-backed source for /agents/products/{slug} pages.
//
// Unlike content/agents (file-backed markdown), agent-products live in
// PublishForge (PIM). The prebuild generators (sitemap + llms.txt) page the
// keyset-paginated list endpoint here. See docs/task/001-agents-products-isr-page.md
// for the full API contract.
//
//   GET {PF}/api/pim/agent-doc?cursor={slug}&limit=1000
//     -> { items: [{ slug, updatedAt, title? }], nextCursor }
//   GET {PF}/api/pim/agent-doc/{slug}
//     -> { slug, sku, baseSku, markdown, frontmatter, updatedAt }
//
// `title` is NOT guaranteed by the documented list contract — if PublishForge
// includes it we use it directly (cheap); otherwise llms.txt falls back to a
// humanized slug. Enriching every product with its real title requires one
// per-doc fetch each (~8,730 requests) — gated behind enrichAgentProductTitles().

const PF_TIMEOUT_MS = 8000;
const PAGE_LIMIT = 1000;
const ENRICH_CONCURRENCY = 8;

export interface AgentProductRef {
  slug: string;
  updatedAt: string; // ISO 8601; used as sitemap <lastmod>
  // The following are present only if the PF list endpoint returns them.
  title?: string;
  finish?: string; // variant finish, e.g. "Vintage Bronze"
  sku?: string;
}

interface ListItem {
  slug: string;
  updatedAt: string;
  title?: string;
  finish?: string;
  sku?: string;
}

interface ListPage {
  items: ListItem[];
  nextCursor: string | null;
}

function pfEnv(): { base: string; token: string } | null {
  const base = process.env.PF_AGENT_API_BASE_URL;
  const token = process.env.PIM_AGENT_READ_TOKEN;
  if (!base || !token) {
    // Build-time generators must not hard-fail the whole build over a missing
    // optional feed — return null so callers emit a partial (markdown-only) file.
    console.warn(
      "[agent-products] PF_AGENT_API_BASE_URL / PIM_AGENT_READ_TOKEN not set — skipping PublishForge feed.",
    );
    return null;
  }
  return { base: base.replace(/\/$/, ""), token };
}

async function fetchJson<T>(
  url: string | URL,
  token: string,
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), PF_TIMEOUT_MS);
  try {
    const r = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    });
    if (!r.ok) throw new Error(`PublishForge responded ${r.status} for ${url}`);
    return (await r.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Page through the keyset-paginated PF list endpoint and return every
 * agent-product ref. Returns [] (never throws) when PF is unconfigured or
 * unreachable, so a flaky feed degrades the sitemap/index rather than breaking
 * `next build`. On a mid-paging failure, returns the refs collected so far.
 */
export async function listAgentProductRefs(): Promise<AgentProductRef[]> {
  const env = pfEnv();
  if (!env) return [];

  const refs: AgentProductRef[] = [];
  const seen = new Set<string>();
  let cursor: string | null = null;

  try {
    do {
      const url = new URL(`${env.base}/api/pim/agent-doc`);
      if (cursor) url.searchParams.set("cursor", cursor);
      url.searchParams.set("limit", String(PAGE_LIMIT));

      const page = await fetchJson<ListPage>(url, env.token);
      for (const it of page.items ?? []) {
        if (!it?.slug || seen.has(it.slug)) continue; // cursor-overlap guard
        seen.add(it.slug);
        refs.push({
          slug: it.slug,
          updatedAt: it.updatedAt,
          title: cleanAttr(it.title),
          finish: cleanAttr(it.finish),
          sku: cleanAttr(it.sku),
        });
      }
      cursor = page.nextCursor ?? null;
    } while (cursor);
  } catch (e) {
    console.error(
      `[agent-products] list paging stopped early after ${refs.length} refs:`,
      e,
    );
  }

  return refs;
}

/**
 * Normalize a PF attribute to a usable string, or undefined. Treats null,
 * undefined, "", whitespace-only, and "N/A" (any case) as absent — so they all
 * trigger the next fallback rather than rendering a junk label.
 */
export function cleanAttr(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed || trimmed.toLowerCase() === "n/a") return undefined;
  return trimmed;
}

/**
 * True when an attribute value carries no real product data. Superset of the
 * cleanAttr() blank set: null/undefined/empty/whitespace and "N/A" (any case),
 * plus the stringified "null"/"undefined" a composer can leak. Used to drop
 * junk rows from composed product markdown before it is rendered.
 */
function isBlankAttrValue(value: string): boolean {
  const t = value.trim().toLowerCase();
  return t === "" || t === "n/a" || t === "null" || t === "undefined";
}

/**
 * Remove junk rows from composed agent-product markdown so the page never shows
 * "N/A" / empty / null / undefined product data. PublishForge composes specs as
 * definition-style bullets — `- **Label**: value` (Attributes) and
 * `- Label: value` (Availability) — so any such bullet whose value is blank is
 * dropped. A section heading left with no remaining content (every row blank) is
 * dropped too, so we never render a bare "## Attributes" with nothing under it.
 * Non-definition bullets (no `key: value`) and prose lines are always kept.
 */
export function stripBlankProductData(markdown: string): string {
  // Definition-style bullet: "- **Label**: value" or "- Label: value".
  const attrLine = /^\s*[-*]\s+(?:\*\*.+?\*\*|[^:]+?)\s*:\s*(.*)$/;

  const filtered = markdown.split(/\r?\n/).filter((line) => {
    const m = line.match(attrLine);
    return !(m && isBlankAttrValue(m[1])); // drop junk attribute rows
  });

  // Drop ATX headings with no non-blank content before the next heading / EOF.
  const isHeading = (l: string) => /^#{1,6}\s/.test(l);
  const result: string[] = [];
  for (let i = 0; i < filtered.length; i++) {
    if (isHeading(filtered[i])) {
      let hasContent = false;
      for (let j = i + 1; j < filtered.length && !isHeading(filtered[j]); j++) {
        if (filtered[j].trim() !== "") {
          hasContent = true;
          break;
        }
      }
      if (!hasContent) continue; // skip the now-empty section heading
    }
    result.push(filtered[i]);
  }

  return result.join("\n");
}

/**
 * Derive a human-readable title from a SKU slug when PF provides no attributes.
 *   "acme-widget-pro-x1" -> "Acme Widget Pro X1"
 */
export function humanizeSlug(slug: string): string {
  return slug
    .split(/[-_]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/**
 * Pick the display label for an agent-product link. The base name is the
 * product `title` (falling back to `sku`, then a humanized slug so it is never
 * empty); when a variant `finish` is present it is appended so otherwise-
 * identical product names stay distinguishable:
 *   "Acme Single-Handle Faucet — Vintage Bronze"
 */
export function agentProductLabel(ref: AgentProductRef): string {
  const base =
    cleanAttr(ref.title) ?? cleanAttr(ref.sku) ?? humanizeSlug(ref.slug);
  const finish = cleanAttr(ref.finish);
  return finish ? `${base} — ${finish}` : base;
}

/**
 * OPT-IN, EXPENSIVE. Fill in the real label attributes (`finish`, `sku`,
 * `title`) for refs that lack a usable label, by fetching each product doc
 * individually (bounded concurrency). At ~8,730 products this is thousands of
 * requests — only enable when build time and PF load budget allow. Refs that
 * already resolve to a non-slug label are left untouched.
 */
export async function enrichAgentProductTitles(
  refs: AgentProductRef[],
): Promise<AgentProductRef[]> {
  const env = pfEnv();
  if (!env) return refs;

  // Only fetch docs whose label would otherwise fall back to the slug.
  const pending = refs.filter((r) => !cleanAttr(r.finish) && !cleanAttr(r.sku));
  let cursor = 0;

  async function worker() {
    while (cursor < pending.length) {
      const ref = pending[cursor++];
      try {
        const doc = await fetchJson<{
          frontmatter?: { title?: string; finish?: string };
          sku?: string;
        }>(
          `${env!.base}/api/pim/agent-doc/${encodeURIComponent(ref.slug)}`,
          env!.token,
        );
        ref.finish = cleanAttr(doc?.frontmatter?.finish) ?? ref.finish;
        ref.sku = cleanAttr(doc?.sku) ?? ref.sku;
        ref.title = cleanAttr(doc?.frontmatter?.title) ?? ref.title;
      } catch (e) {
        console.error(`[agent-products] enrich failed for "${ref.slug}":`, e);
      }
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(ENRICH_CONCURRENCY, pending.length) }, worker),
  );
  return refs;
}
