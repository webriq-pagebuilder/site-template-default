// Self-validating unit tests for the flag-driven sitemap core (pure functions).
// Run after the skill vendors lib/sitemap/* into a project:
//   npx tsx lib/sitemap/__tests__/sitemap.test.ts
// No test framework required — plain node:assert under tsx. Exits non-zero on
// any failure so it can gate an adoption or CI run.

import assert from "node:assert/strict";

import { withSitemapFlag, SITEMAP_FLAG_FIELD } from "../schema";
import { documentToPath, toAbsoluteUrl, normalizeLoc } from "../urls";
import { buildSitemapXml, isSitemapIndex, parseSitemapLocs } from "../xml";
import { resolveRobotsMeta } from "../robots-meta";
import { isProductionBuild } from "../generate";
import type { SitemapConfig } from "../types";

let passed = 0;
const failures: string[] = [];
function test(name: string, fn: () => void) {
  try {
    fn();
    passed++;
  } catch (err) {
    failures.push(`${name}: ${err instanceof Error ? err.message : err}`);
  }
}

const cfg: Pick<SitemapConfig, "routes" | "slugOverrides" | "noindexMode"> = {
  routes: {
    page: { pattern: "/:slug", homeSlugs: ["home", "Home"] },
    post: { pattern: "/:slug" },
    insightPost: { pattern: "/insights/:slug" },
  },
  slugOverrides: { blog: "/blog/1", skipme: "" },
  noindexMode: "explicit-false",
};

// --- resolveRobotsMeta -------------------------------------------------------
test("explicit-false: ON page is indexable", () =>
  assert.equal(resolveRobotsMeta({ type: "page", addToSitemap: true }, cfg), null));
test("explicit-false: OFF page is noindexed", () =>
  assert.equal(resolveRobotsMeta({ type: "page", addToSitemap: false }, cfg), "noindex"));
test("explicit-false: untouched (undefined) page stays indexable", () =>
  assert.equal(resolveRobotsMeta({ type: "page", addToSitemap: undefined }, cfg), null));
test("unrouted type is never noindexed", () =>
  assert.equal(resolveRobotsMeta({ type: "author", addToSitemap: false }, cfg), null));
test("missing type is never noindexed", () =>
  assert.equal(resolveRobotsMeta({ addToSitemap: false }, cfg), null));
test("strict: ON page indexable, everything else noindexed", () => {
  const strict = { ...cfg, noindexMode: "strict" as const };
  assert.equal(resolveRobotsMeta({ type: "page", addToSitemap: true }, strict), null);
  assert.equal(resolveRobotsMeta({ type: "page", addToSitemap: false }, strict), "noindex");
  assert.equal(resolveRobotsMeta({ type: "page", addToSitemap: undefined }, strict), "noindex");
  assert.equal(resolveRobotsMeta({ type: "author", addToSitemap: undefined }, strict), null);
});

// --- documentToPath ----------------------------------------------------------
test("homeSlug resolves to /", () =>
  assert.equal(documentToPath({ _type: "page", slug: "home" }, cfg), "/"));
test("pattern interpolation", () =>
  assert.equal(documentToPath({ _type: "insightPost", slug: "x" }, cfg), "/insights/x"));
test("slugOverride wins", () =>
  assert.equal(documentToPath({ _type: "page", slug: "blog" }, cfg), "/blog/1"));
test('empty-string override skips', () =>
  assert.equal(documentToPath({ _type: "page", slug: "skipme" }, cfg), null));
test("unrouted type -> null", () =>
  assert.equal(documentToPath({ _type: "author", slug: "x" }, cfg), null));
test("missing slug -> null", () =>
  assert.equal(documentToPath({ _type: "page", slug: null }, cfg), null));

// --- toAbsoluteUrl / normalizeLoc -------------------------------------------
test("relative path joined to origin", () =>
  assert.equal(toAbsoluteUrl("https://example.com/", "/a"), "https://example.com/a"));
test("root path -> bare origin", () =>
  assert.equal(toAbsoluteUrl("https://example.com", "/"), "https://example.com"));
test("absolute URL passes through", () =>
  assert.equal(toAbsoluteUrl("https://example.com", "https://cdn.example.com/x.pdf"), "https://cdn.example.com/x.pdf"));
test("normalizeLoc lowercases host + strips trailing slash", () =>
  assert.equal(normalizeLoc("https://EXAMPLE.com/Foo/"), "https://example.com/Foo"));
test("normalizeLoc collapses root", () =>
  assert.equal(normalizeLoc("https://example.com/"), "https://example.com"));

// --- xml round-trip ----------------------------------------------------------
test("buildSitemapXml escapes and parseSitemapLocs recovers", () => {
  const xml = buildSitemapXml([{ loc: "https://example.com/a&b", lastmod: "2020-01-01T00:00:00Z" }]);
  assert.ok(xml.includes("<loc>https://example.com/a&amp;b</loc>"));
  assert.deepEqual(parseSitemapLocs(xml), ["https://example.com/a&b"]);
});

// --- regression: $-in-slug, protocol-relative, sitemap-index ----------------
test("documentToPath: a slug containing $ is not treated as a replace pattern", () => {
  assert.equal(documentToPath({ _type: "insightPost", slug: "a$&b" }, cfg), "/insights/a$&b");
  assert.equal(documentToPath({ _type: "page", slug: "$1-deal" }, cfg), "/$1-deal");
});
test("toAbsoluteUrl: a protocol-relative URL passes through unchanged", () => {
  assert.equal(toAbsoluteUrl("https://example.com", "//cdn.example.com/x.pdf"), "//cdn.example.com/x.pdf");
});
test("isSitemapIndex distinguishes a sitemapindex from a urlset", () => {
  assert.equal(isSitemapIndex('<?xml version="1.0"?><sitemapindex><sitemap><loc>https://example.com/s1.xml</loc></sitemap></sitemapindex>'), true);
  assert.equal(isSitemapIndex('<?xml version="1.0"?><urlset><url><loc>https://example.com/a</loc></url></urlset>'), false);
});

// --- withSitemapFlag ---------------------------------------------------------
test("withSitemapFlag: adds to slug docs, respects exclude/include, non-mutating + idempotent", () => {
  const shared = [{ name: "slug", type: "slug" }, { name: "title", type: "string" }];
  const schemas = [
    { name: "page", type: "document", fields: shared },
    { name: "oldPage", type: "document", fields: shared },
    { name: "post", type: "document", fields: [{ name: "slug", type: "slug" }] },
    { name: "nav", type: "document", fields: [{ name: "x", type: "string" }] },
    { name: "obj", type: "object", fields: [{ name: "slug", type: "slug" }] },
    { name: "cfg", type: "document", fields: [{ name: "x", type: "string" }] },
  ];
  const out = withSitemapFlag(schemas, { excludeTypes: ["oldPage"], includeTypes: ["cfg"] });
  const flagCount = (n: string) =>
    (out.find((s: any) => s.name === n)!.fields as any[]).filter((f) => f.name === SITEMAP_FLAG_FIELD.name).length;
  assert.equal(flagCount("page"), 1, "page flagged once");
  assert.equal(flagCount("oldPage"), 0, "excluded not flagged");
  assert.equal(flagCount("post"), 1, "post flagged");
  assert.equal(flagCount("nav"), 0, "slugless not flagged");
  assert.equal(flagCount("cfg"), 1, "includeTypes forces flag");
  assert.equal((out.find((s: any) => s.name === "obj")!.fields as any[]).some((f) => f.name === SITEMAP_FLAG_FIELD.name), false, "object type untouched");
  assert.equal(shared.length, 2, "shared fields array not mutated");
  const twice = withSitemapFlag(out, { excludeTypes: ["oldPage"], includeTypes: ["cfg"] });
  assert.equal((twice.find((s: any) => s.name === "page")!.fields as any[]).filter((f) => f.name === SITEMAP_FLAG_FIELD.name).length, 1, "idempotent on re-run");
});
test("withSitemapFlag: guards a document with no fields array (no throw)", () => {
  const out = withSitemapFlag([{ name: "weird", type: "document" }], { excludeTypes: [], includeTypes: ["weird"] });
  assert.equal((out[0] as any).fields, undefined);
});

// --- isProductionBuild -------------------------------------------------------
test("isProductionBuild env matrix", () => {
  assert.equal(isProductionBuild({ SITEMAP_FORCE_PROD: "1" }), true);
  assert.equal(isProductionBuild({ CONTEXT: "production" }), true);
  assert.equal(isProductionBuild({ VERCEL_ENV: "production" }), true);
  assert.equal(isProductionBuild({}), false);
  assert.equal(isProductionBuild({ CONTEXT: "deploy-preview" }), false);
});

if (failures.length) {
  console.error(`\n✗ ${failures.length} failed, ${passed} passed:`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`✓ ${passed} sitemap-core tests passed`);
