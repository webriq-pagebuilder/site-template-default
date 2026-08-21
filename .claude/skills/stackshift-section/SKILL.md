---
name: stackshift-section
description: >-
  Create or customize a StackShift page section in this repo — convert an HTML design into a custom
  Next.js component + Sanity schema, wire it up, push page content into Sanity, and verify the result.
  Use whenever adding/converting a section or component, building a page from a design, or migrating
  HTML content into Sanity for this StackShift (Next 14 + Sanity v3) project. Safe for headless/CI runs.
---

# StackShift — add / convert a section (build runbook)

Architecture, the naming invariant, setup/creds, and the **styling & branding rules** live in the
repo's `CLAUDE.md` (always loaded). **Read `CLAUDE.md` §2 (invariant), §3 (creds), §4 (styling) first.**
`@stackshift-ui` is a **shadcn-based** library — prefer composing its primitives (Button, Dialog, …)
and the `cn()` util from `@stackshift-ui/system` over hand-rolled raw elements. Agents may run this
**headless in CI — one shot, make-or-break.** Follow exactly, obey the **Execution contract (G1–G7)**
below, and prove success with VERIFY (Phase 5) — the run ends ONLY with the G7 completion report.

Substitute: `<name>` = camelCase (`featureHighlight`), `<folder>` = snake_case (`feature_highlight`),
`<Pascal>` = PascalCase (`FeatureHighlight`), `<Display>` = label. `<name>` MUST be identical in every
wiring point (CLAUDE.md §2) or the section won't render.

> Author files directly. **Do NOT use `yarn generate` / plop in CI — interactive, will hang.**
> Copy as references: component `components/sections/featured_products/`, schema
> `schemas/custom/sanity-plugin-schema-default/src/schemas/sections/header/`.

---

## Execution contract — autonomy & completion guards (BINDING for every phase, every model)

This skill runs unattended. The human sees ONLY your final report. These guards define what "done" means
and forbid the shortcuts that produce half-finished pages:

- **G1 — Run to done, never hand off.** Never pause to ask the human a question, never end with "next
  steps", "you can now run…", or instructions for a person to execute. YOU run every command. Exactly TWO
  stops are permitted, both STOP-and-report: the post-live **delete** lane (human-only) and the CLAUDE.md
  §4 **branding-conflict** gate (new design diverges from `themeSettings` with no rebrand declared).
  Nothing else — not a flaky test, not a missing tool, not uncertainty — justifies stopping.
- **G2 — A section is DONE only when V1–V7 ALL pass.** A bare Phase-3 component without Phase 4 styling
  and a passing V5 is **not a deliverable** — do not report it as complete, do not move on from it.
  "Structure works, styling is a follow-up" is a forbidden conclusion; styling IS part of this run.
- **G3 — Full coverage, no sampling, no absorption.** The section inventory = EVERY direct child of the
  mockup's root render — for bundler snapshots, each JSX child of the root App component; for plain HTML,
  each top-level `<section>`/`<header>`/`<footer>`/`<nav>`/overlay in the body. ALL of them count:
  full-height sections, thin strips/banners, and overlay widgets (modals, drawers) alike — visual size or
  interactivity does not exempt an element from the inventory. Every entry maps to a section doc on the
  page, or to a NAMED parent section that demonstrably renders its content — silently dropping one, or
  "absorbing" it into a neighbor without rendering its content, is a FAIL. "The remaining sections follow
  the same pattern" is a forbidden output. N inventory entries ⇒ N rows in the completion report, each
  individually verified.
- **G4 — Evidence or it didn't happen.** A check may be marked PASS only after you executed its command
  in THIS run and captured its output. Quote the decisive output line (e.g. `studio:200`, `8/8 refs
resolve`) in the completion report. Predicting a result, or pattern-matching "this usually passes," is
  a forbidden substitute for running the command.
- **G5 — Failures are fixed, not reported around.** A failing check ⇒ diagnose, patch, re-run — up to 3
  fix attempts per check (5 iterations for the V5 styling loop). Only after exhausting attempts record
  FAIL with the last error verbatim, then continue the remaining sections. Never silently skip a check,
  weaken a PASS criterion, or stop the whole run because one section is stuck.
- **G6 — Missing tooling is installable, not an excuse.** No Playwright ⇒ `npx playwright install
--with-deps chromium`. No `jq` ⇒ use the documented python/no-jq fallback. Only if installation itself
  fails after retries, mark the affected checks FAIL with the install error — never claim PASS on a
  check you could not run, and never swap in a weaker check (e.g. `curl` grep instead of a browser
  screenshot for V5).
- **G7 — The final message is the completion report** (template at the end of Phase 5), nothing else.
  `DONE` may be claimed only when every cell of the matrix is PASS.

---

## Prerequisite — Task documents (PLAN FIRST — never skip)

**Before writing ANY code or pushing ANY content**, create the task documents that lock the design
contract. This gate prevents drift between plan and implementation:

1. **Epic task doc** (`docs/task/NNNN-<slug>-page-epic.md`): reuse triage table (every mockup section
   matched against the catalog with a reuse level L0/L1/L2/L3), dependency graph showing which subtasks
   are parallel vs serial, the styling contract (which tokens map to which mockup colors), and the
   parallel-safety rule (Phase-B tasks touch only their own folder).
2. **Per-section subtask docs** (one per mockup section, even L0 content-only): section name, reuse
   decision with rationale, schema fields list, component structure notes.
3. **Serial integration task doc**: lists every shared-file edit (schema barrel, `list.tsx`, `pages.ts`,
   `themePage.ts`), the Sanity content migration payload, and the full V1–V6 verification sequence.
4. **Register all tasks in `TASKS.md`** under the appropriate status column.

The epic is the contract — agents implementing subtasks read ONLY their subtask doc + the epic's
styling contract; they do NOT re-litigate reuse decisions. **Never write code, schemas, or content
without task docs in place.** See `docs/task/0004-*.md` + `docs/task/0018-*.md` + `docs/task/0025-*.md`
for the canonical pattern.

---

## Step 0 — Reuse triage (ALWAYS first — avoid duplicate components)

For each mockup section, match it against the **catalog** and stop at the first level that fits. Building
a custom component is the **exception**, not the default — duplicates fragment the design system.

**Catalog sources:** registered sections = keys in `components/list.tsx`; `@stackshift-ui/*` sections +
their variants (`plopfile.mjs` enumerates `<name>_<variant>` from `node_modules`); schema `variantsList`
(the Studio-pickable variants).

> **THE HARD RULE — never ship a raw `@stackshift-ui` default component.** A frozen library variant CANNOT
> be restyled, so pouring content into one leaves it stuck at library styling while your mockup goes
> unmatched — the #1 way the automation silently produces an unstyled section. A library match is a
> **starting point, never the output.** When the closest catalog match is a library default, you have two
> moves only: **clone it into a LOCAL variant (L1)** and restyle to the mockup, or **build custom (L3)**.
> **L0 is NOT that path** — L0 is content-only and applies ONLY to a component that is _already a styled
> LOCAL section in this repo_ (`components/sections/*`), e.g. a second page reusing a section you already
> built. Every section rendered on a converted page must pass the §4 / V5 visual-fidelity gate — there is
> no "styling-exempt" reuse level.

| Level      | Situation                                                                                                       | Action                                                                                             | Phases            |
| ---------- | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ----------------- |
| **L0**     | Reusing a section that is **already a styled LOCAL component here** (`components/sections/*`), no design change | **Content only** — NEVER for a fresh mockup section that merely resembles a library default        | 2 → 5             |
| **L1**     | Closest match is a **library** section/variant (or existing section needs a new layout)                         | **Clone/eject → LOCAL variant**, then restyle to the mockup (eject variant + schema variant entry) | 1 → 2 → 3 → 4 → 5 |
| **L2**     | Existing **local** component (`components/sections/*`) needs a new variant                                      | **Follow the L2 recipe (Phase 3) — 4 wiring touches, NONE optional**                               | 2 → 3 → 4 → 5     |
| **L3**     | No equivalent anywhere                                                                                          | Full custom section                                                                                | 1 → 2 → 3 → 4 → 5 |
| **Chrome** | nav / header / footer                                                                                           | **Reference existing Sanity docs** — never recreate                                                | 2                 |

Record the chosen level in the task doc's **Reuse decision** field. **A library-default match resolves to
L1 (clone-and-style), never L0.** Only **L1/L3** introduce code; **L0** is content-only (no wiring) and only
for already-styled local sections.

---

## Build phases (after triage)

Order: **Schema (contract) → Content → Bare component → Styling → Verify.** Schema and component are
loosely coupled; **content needs only the schema contract** (so it can precede the component); styling is
deferred to its own phase so it can run separately (e.g. a design-tuned model).

### Phase 1 — Schema (the data contract) · L1/L3 only (L0 skips)

Create under `schemas/custom/sanity-plugin-schema-default/src/schemas/sections/<folder>/`:

`schema/index.ts` — reuse field factories from `../../../common/fields` (`title`, `description`,
`mainImage`, `primaryButton`, `arrayOfImages`, …):

```ts
import { title, description } from "../../../common/fields";
export const <name>Schema = [title(), description()];
```

**Field factories have FIXED names — calling one twice in a schema = a "duplicate field" Studio schema
error.** `title()` always creates a field named `title`; `[plainText(), plainText()]` is two fields with
the same name and Sanity Studio REJECTS the whole schema at runtime (client-side error screen — the dev
server still compiles and `/studio` still returns 200, so only V2's schema gate catches it). For multiple
similar fields use a factory that takes an explicit name (`arrayOfText("modelOptions", …)`) or an inline
field object with a unique name (`{ name: "panelText", title: "Panel text", type: "text" }`). And
**model repeating content as ARRAYS**: a mockup section showing N cards/plans/posts/steps needs an array
field (`arrayOfTitleAndText()`, `arrayOfImages()`, or a custom object array) — a schema holding only
`title`/`subtitle`/`description` for a card-grid section is under-modeled, and the cards end up either
hardcoded in the component (uneditable — V6 FAIL) or silently dropped (missing content — G3 FAIL).

`initialValue/index.ts`:

```ts
export default { title: "Default title", description: "Default description" };
```

`images/variant_a.jpg` — **required** (the schema imports it). If none, copy one:

```bash
cp schemas/custom/sanity-plugin-schema-default/src/schemas/sections/header/images/variant_a.jpg \
   schemas/custom/sanity-plugin-schema-default/src/schemas/sections/<folder>/images/variant_a.jpg
```

`<name>.ts` — `rootSchema(name, title, icon, variantsList, fields, initialValue)`:

```ts
import { rootSchema } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { MdWidgets } from "react-icons/md";
import variantAImage from "./images/variant_a.jpg";
import initialValue from "./initialValue";
import { <name>Schema } from "./schema";

export const variantsList = [
  { title: "Variant A", description: "First layout", value: "variant_a", image: variantAImage.src },
];

export default rootSchema("<name>", "<Display>", MdWidgets, variantsList, <name>Schema, initialValue);
```

Export in the barrel `.../sections/index.ts`:

```ts
import { default as <name> } from "./<folder>/<name>";
const schemas = { header, <name> /* , …existing */ };
```

Ensure custom schemas are active in `schemas/schema.ts` (ONE-TIME, idempotent):

```ts
import customSchema from "./custom";
const updatedSchemaArray = Object.values(customSchema);

const allSchemas = (() => {
  // const mergedSchemas = mergeReplaceAndAdd(baseSchemas, commerceSchemaArray);
  const mergedSchemas = mergeReplaceAndAdd(baseSchemas, updatedSchemaArray);
  return mergedSchemas;
})();
```

**Ejecting a LIBRARY section (L1):** `mergeReplaceAndAdd` matches by `name`, so a custom schema named like
a library section (`features`/`header`/`footer`/…) **replaces it wholesale + project-wide** in Studio.
**Replicate the library `variantsList` + fields verbatim, then append** your new variant/fields — otherwise
existing pages silently lose those variants/fields in the Studio. (Activating custom schemas flips on the
_entire_ custom layer at once, not just your section.) Note the two-track rule: a variant value **renders**
only if it's in the component `Variants` map (Phase 3); it's **selectable in the Studio picker** only if it's
also in this `variantsList`. The two can legitimately diverge (e.g. content migrated with a render-only
variant).

Allow the section on pages — add the SAME member to BOTH `schemas/documents/pages.ts` and
`themePage.ts`, inside the `sections` array's `of: [...]`:

```ts
defineArrayMember({ title: "<Display>", name: "<name>", type: "reference", to: [{ type: "<name>" }] }),
```

**Query projection (plain fields: automatic · image/reference fields: ALWAYS required):** the `variants`
fragment in `pages/api/query.ts` opens with `...`, so plain fields flow automatically. But an **image field
only reaches the component if the fragment dereferences it** — a new image field (any name other than the
already-projected `mainImage`/`logo`/etc.) with no conditional projection delivers a bare `_ref` the
component can't render, so the image is silently blank **even though the upload and the doc are correct**.
For EVERY image/reference field your schema adds, add a conditional projection mirroring the existing
`mainImage != null => {…}` / `collections` patterns. This is the #1 silent image failure alongside
never-uploaded assets.

### Phase 2 — Content migration (HTML → Sanity)

**The whole point of StackShift: everything is editable. Author EVERY piece of display content into Sanity.**
Every heading, paragraph, list item, card field, stat, label, and link the mockup shows becomes a _populated_
field in the section doc's `variants` — the dataset is the content source of truth, and the page renders that
stored content (`data.variants.*`), so an editor can change anything in Studio. **Do NOT bake the real copy
into the component as the de-facto content:** a component default is a fallback for _empty_ data only
(standalone render), never the way the live page shows its text. Push the FULL copy here — not a light seed.
A section that shows text on the site while its Studio fields are blank is a **defect** (copy baked in code);
**V6** checks for exactly this. (`initialValue/index.ts` is just the "create-new" seed an editor sees and can
overwrite — it is NOT a substitute for migrating the page's real content.)

**Field completeness — no silent drops.** "Every piece of display content" includes the small stuff: card
category chips, author bylines, dates, read-time labels, badge text, stat captions. When migrating a
section, enumerate every visible text element in that section's mockup source (for bundler snapshots, its
JSX data arrays — e.g. a `POSTS` array's `category`/`author`/`date`/`readTime` keys) and give each one a
schema field + stored value + render slot. Dropping an element because the chosen variant "doesn't have
that field" is a **FAIL cell in the report**, not a silent simplification — either extend the
variant/schema to carry it, or record the omission explicitly as a FAIL with rationale.

Reference-based model: a `page` references separate **section documents**. Create the section doc(s)
first, then the page. Content needs only the schema contract — it can be authored before the component.

**Section document** (`label` string, `variant`, and `variants` has NO `_type`):

```json
{
  "_id": "<sectionDocId>",
  "_type": "<name>",
  "label": "<human label>",
  "variant": "variant_a",
  "variants": { "title": "…", "description": "…" }
}
```

**Page document** (homepage = slug `home`; published `_id` must NOT start with `drafts.`):

```json
{
  "_id": "<pageId>",
  "_type": "page",
  "title": "Home",
  "slug": { "_type": "slug", "current": "home" },
  "sections": [
    { "_key": "<unique-string>", "_type": "<name>", "_ref": "<sectionDocId>" }
  ]
}
```

Breaks things if wrong: each `sections[]` item needs a unique **`_key`** and its **`_type` is the section
name** (NOT `"reference"`); `slug` must include `"_type":"slug"`; use a **plain `_id`** (no `drafts.`) so
it renders without a manual publish. **Array items nested in `variants` (cards, posts, plans, logos) also
need `_key`s** — a `_key: null` item renders fine but is uneditable in Studio.

**Section ORDER is part of the design contract.** `sections[]` MUST mirror the mockup's visual order
top-to-bottom — for bundler snapshots that is the App component's JSX child order
(`<SiteHeader/><SiteHero/><TrustStrip/>…` in the root render); for plain HTML, the DOM order. Record each
section's ordinal position in the epic inventory and author `sections[]` in that exact sequence — do NOT
order by build-completion or reuse level. V3 verifies it: `sections[]->_type` compared against the
inventory order; any transposition is a FAIL.

```bash
# creds already in env (CI) or source whichever env file exists:
#   set -a; . ./.env.local 2>/dev/null; . ./.env.development 2>/dev/null; set +a
# Write-token name differs by project — resolve NEXT_PUBLIC first (new projects), then legacy:
WRITE_TOKEN="${NEXT_PUBLIC_SANITY_API_WRITE_TOKEN:-$SANITY_API_WRITE_TOKEN}"
[ -z "$WRITE_TOKEN" ] && echo "FAIL: no write token (set NEXT_PUBLIC_SANITY_API_WRITE_TOKEN)" && exit 1
curl -s -X POST \
  "https://$NEXT_PUBLIC_SANITY_PROJECT_ID.api.sanity.io/v2022-03-13/data/mutate/$NEXT_PUBLIC_SANITY_DATASET" \
  -H "Authorization: Bearer $WRITE_TOKEN" -H "Content-Type: application/json" \
  --data @payload.json   # {"mutations":[{"createOrReplace":<sectionDoc>},{"createOrReplace":<pageDoc>}]}
```

**Re-migrating an existing doc** (switching its variant, adding fields): **GET it first, modify in memory,
then `createOrReplace`** — dropping server-managed fields (`_rev` / `_createdAt` / `_updatedAt`). This keeps
the `_id`, uploaded **asset refs**, and inbound page references intact; hand-rebuilding a doc you could have
fetched silently drops them. Re-migration touches only the section docs (same `_id`s); the page's
`sections[]` refs are unchanged.

**Rich text** is **Portable Text, not HTML** — use a Portable Text field and convert with
`@portabletext/block-tools`. Plain headings/labels are simple strings.

**Link fields are `conditionalLink`** — **store** `linkType` / `linkInternal` / `linkExternal` /
`linkTarget` / `label`. The GROQ `variants` fragment **aliases** these to `type` / `internalLink` /
`externalLink` at read time, so author the **stored** names, never the projected ones. An internal link
needs a **real `page` `_ref`** or it dangles to `/page-not-found` — when the target page doesn't exist yet,
use a **relative `linkExternal`** (e.g. `"/about"`; the schema allows relative URLs). `primaryButton` /
`secondaryButton` / `formLinks` / `routes` / `multipleMenus` already have query projections; a new plain
field (string/number/array-of-plain) needs none — it flows via the leading `...`.

**Images are content — upload them in THIS migration (MANDATORY, not a follow-up step).** Every image the
mockup shows (hero, logos, cards, avatars, backgrounds) is migrated content, exactly like copy. A hardcoded
`<img src>`, a foreign-project ref (`cdn.sanity.io/<otherProjectId>/…` → resolves to **null**), or an empty
image field is a **defect** — images are resolved by an _in-dataset_ asset lookup, so they MUST live in the
project's own dataset. Do NOT defer this to a second prompt; a section shipped on placeholder/component-default
images is not "done" (**V6** checks image refs too).

**Step A0 — image inventory (MANDATORY — do this like the Phase 4a token map, before any upload).**
Mockup images hide in more places than `<img>`. Scan the mockup for ALL of: `<img src>` / `srcset` /
`<picture><source>`, CSS `background-image: url(…)` (including inside the `<style>` block), inline `<svg>`,
and `data:` URIs. **Bundler-snapshot mockups (see Step A1) must be scanned via their decoded template
string AND every decoded JSX source, not the raw file** — the manifest's embedded assets are only PART of
the picture; the JSX sources also carry **remote image URLs in data arrays** (e.g. blog-card
`cover: 'https://images.unsplash.com/…'`), and those are content images that migrate exactly like the
rest (download → upload, Remote-URL rule below). Grep the decoded sources:
`grep -ohE "https?://[^\"'\\s)]+\.(png|jpe?g|webp|svg|gif)|images\.unsplash\.com[^\"']*" ${TMPDIR:-/tmp}/stackshift-decode/*.jsx`. Build an
**image inventory table** in the task doc — one row per visual asset:

| # | Mockup source (truncated) | Kind (photo/logo/icon/bg) | Migrate? | Target schema field | Uploaded asset id |

Classification rule: **content images migrate** (photos, logos, avatars, card/hero art, meaningful
backgrounds); **decorative inline-SVG icons stay in JSX** (they're styling, not content). The invariant this
table enforces: _every "Migrate? = yes" row ends the migration with a real `image-…` id in the last column,
referenced from a schema field._ An inventory row with an empty last column = the migration is NOT done.

**Step A1 — acquire each binary locally (the upload API needs a FILE — get one per source type):**

- **Bundler-snapshot mockup — CHECK THIS FIRST** (`grep -q '__bundler/manifest' docs/mockups/<file>.html`).
  This repo's mockups (e.g. `docs/mockups/homepage.html`) embed everything in the ONE html file: the real
  page markup is a JSON string inside `<script type="__bundler/template">`; it references assets by **bare
  UUID** (`src="97022e2e-…"`, `url("5e90a0ad-…")`); the binaries live base64-encoded in
  `<script type="__bundler/manifest">` as `uuid → {mime, compressed, data}`; human names are in
  `<script type="__bundler/ext_resources">` (`[{id:"logoHickory", uuid:"…"}, …]`). Do NOT try to fetch the
  UUIDs as URLs — decode them straight out of the manifest (the manifest also holds fonts + JS; take only
  `image/*`):

  **Decode artifacts are TEMP FILES — write them OUTSIDE the repo, always.** Never create
  `docs/mockups/_decoded/` or drop extracted images/JSX anywhere inside the repo tree: decoded output is
  derived data (the mockup file already holds it) and committing it is workspace pollution. Decode into
  `${TMPDIR:-/tmp}/stackshift-decode/` and read from there for the rest of the run:

  ```bash
  python3 - <<'EOF'
  import re, json, base64, gzip, os
  out = os.path.join(os.environ.get('TMPDIR', '/tmp'), 'stackshift-decode')
  os.makedirs(out, exist_ok=True)                            # NEVER a directory inside the repo
  src = open('docs/mockups/<mockup>.html').read()
  man = json.loads(re.search(r'<script type="__bundler/manifest">\s*(.*?)\s*</script>', src, re.S).group(1))
  ext = re.search(r'<script type="__bundler/ext_resources">\s*(.*?)\s*</script>', src, re.S)
  names = {r['uuid']: r['id'] for r in json.loads(ext.group(1))} if ext else {}
  for uuid, m in man.items():
      data = base64.b64decode(m['data'])
      if m.get('compressed'): data = gzip.decompress(data)   # compressed entries are GZIP (verified)
      if m['mime'].startswith('image/'):
          fn = os.path.join(out, f"{names.get(uuid, uuid)}.{m['mime'].split('/')[1].replace('svg+xml','svg')}")
          open(fn, 'wb').write(data)
          print(fn, m['mime'], uuid)   # upload each with THIS mime as Content-Type (Step A2)
      elif 'javascript' in m['mime']:
          open(os.path.join(out, f"src_{uuid[:8]}.jsx"), 'wb').write(data)  # JSX sources — the COPY lives here
  EOF
  ```

  Verified on `homepage.html`: 8 `image/webp` client logos (`logoHickory`, `logoBelwith`, `logoVeteran`,
  `webriqMark`, `logoFirstWatch`, `logoKeeler`, `logoQuandary`, `logoTrident`) decode cleanly and upload
  as `Content-Type: image/webp`.

  **Where the design actually lives in a snapshot (verified on `homepage.html`) — three places, read ALL:**

  1. **Template** (`json.loads` the `__bundler/template` block): the `<style>` holds the design-system CSS
     custom properties → this is the Phase 4a token-map source. The `<body>` may be just
     `<div id="root">` + `<script type="text/babel" src="<uuid>">` tags — a client-rendered React app,
     so the body markup contains NO copy.
  2. **JSX section sources** (the gzip'd `*/javascript` manifest entries the babel tags reference): one
     React component per page section (e.g. `SiteHero`, `TrustStrip`, `Pricing`, `FAQ`, `SiteFooter`).
     ALL page copy, per-section inline styles (referencing the template's CSS vars), and image-UUID usages
     are HERE — extract Phase 2 content and the section inventory from these files, and map each decoded
     image to its schema field by finding its UUID in them.
  3. **Icons**: `data-lucide="<name>"` attributes in the JSX = **lucide icon names** — render them with
     `lucide-react` (already the `@stackshift-ui` icon set) in the component; they are code, NOT Sanity
     image uploads. Only raster/photo/logo assets from the manifest are uploaded.

- **Remote URL** (any `http(s)://…`, **including `cdn.sanity.io/<anyProjectId>/…`** — a Sanity CDN URL in a
  mockup is almost always another project's asset; NEVER store its URL or ref — download and re-upload):
  `curl -sL -o img_N.png "<url>"` then sanity-check it IS an image, not an HTML error page:
  `file img_N.png` must report image data and the file must be non-empty.
- **`data:image/…;base64,` URI** → decode to a file: `echo "<base64part>" | base64 -d > img_N.png`.
- **Inline `<svg>` that is a content image** (logo/illustration) → save the exact markup to `img_N.svg`,
  upload with `Content-Type: image/svg+xml`.
- **Unreachable / missing source** → do NOT leave the field empty and do NOT hardcode a URL in the
  component. Upload a stand-in from the repo (e.g. `schemas/custom/…/sections/header/images/variant_a.jpg`)
  so the field holds a real in-dataset ref, and flag the substitution in the task doc for a human to swap.

**Step A2 — upload each file, capture the asset id — FAIL FAST on a bad response** (set `Content-Type` to
the actual file type — check with `file --mime-type img_N.png`: `image/png` | `image/jpeg` | `image/svg+xml`
| `image/webp`):

```bash
WRITE_TOKEN="${NEXT_PUBLIC_SANITY_API_WRITE_TOKEN:-$SANITY_API_WRITE_TOKEN}"
ASSET_ID=$(curl -s -X POST \
  "https://$NEXT_PUBLIC_SANITY_PROJECT_ID.api.sanity.io/v2022-03-13/assets/images/$NEXT_PUBLIC_SANITY_DATASET" \
  -H "Authorization: Bearer $WRITE_TOKEN" -H "Content-Type: image/png" --data-binary @img_N.png \
  | jq -r '.document._id')
case "$ASSET_ID" in
  image-*) echo "OK $ASSET_ID" ;;   # → image-<hash>-<w>x<h>-png  (use as the _ref in Step B)
  *) echo "FAIL: upload rejected → '$ASSET_ID' — fix file/Content-Type and retry; do NOT write the doc"; exit 1 ;;
esac
# No jq? The raw JSON response is {"document":{"_id":"image-…", …}} — read _id from document._id.
# An empty/"null" ASSET_ID silently becomes a blank image field downstream — that is the bug this guard kills.
```

Record each id in the Step A0 inventory table as you go — the table is the checklist V6b is scored against.

**Step B — reference that id in the section doc's `variants`** (verified shape — `mainImage` factory =
`{ image, alt }`; `alt` is a sibling of `image`, NOT inside it):

```json
"mainImage": {
  "image": { "_type": "image", "asset": { "_type": "reference", "_ref": "image-<hash>-<w>x<h>-png" } },
  "alt": "descriptive alt text"
}
```

For `arrayOfImages` the shape is `{ "images": [{ "_type":"item", "_key":"…", "image": {…asset ref…}, "alt":"…" }] }`.
The GROQ `mainImage` projection dereferences `mainImage.image.asset._ref` in-dataset → CDN URL. **`alt` is not
schema-required** (migration succeeds without it) but ALWAYS populate it: it's the accessibility text and the
Studio preview title, and some schema versions DO require it. `logo` / social-icon images follow the same
upload → `image.asset._ref` pattern.

### Phase 3 — Bare component (structure) · L1/L3 only (L0 skips)

Build the **structure** with minimal styling: semantic markup + `@stackshift-ui` primitives + `cn()` from
`@stackshift-ui/system`. Verify data flow (V3/V4) **before** styling.

**Interactive mockup widgets are part of the design — build their UI in THIS run.** A modal (e.g. a
demo-request dialog), accordion, tab set, or carousel in the mockup is not optional chrome: build it with
`@stackshift-ui` primitives (`dialog`, `accordion`, `toggle-group`, swiper components), wire its trigger
(the CTA button that opens it), and read its copy/labels from Sanity fields like any other content. Only
the widget's backend ACTION (the endpoint a form submits to) may be an open item — the rendered,
functioning UI never is. A `readOnly` textarea or an unwired button where the mockup shows an interactive
element is a V5 delta.

**Render every editable block from its own field, independently (keeps content editable — Phase 2 + V6).**
Read all copy from `data.variants.*`; any in-component default is a fallback for empty data ONLY. Crucially,
**do not interleave editable prose with fixed widgets in a single render slot** — a `body`/`children` slot
that renders portable-text OR baked JSX (prose + a `<Widget/>`) traps the prose: populate the field and the
widget vanishes; leave it empty and the prose can't be edited. Give each editable block (each paragraph,
card, list) its own schema field rendered in its own slot, so Phase 2 can populate all of it and Studio
exposes all of it.

`components/sections/<folder>/index.tsx`:

```tsx
import dynamic from "next/dynamic";
import { SectionsProps } from "types";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
};

function <Pascal>({ data }: SectionsProps) {
  const variant = data?.variant;
  const Variant = variant && Variants?.[variant];
  const props = {
    title: data?.variants?.title,
    description: data?.variants?.description,
  };
  return Variant ? <Variant {...props} /> : null;
}
export default <Pascal>;
```

`components/sections/<folder>/variant_a.tsx` (bare — structure + `data-testid="<folder>"` for CI):

```tsx
interface <Pascal>Props { title?: string; description?: string }
function VariantA({ title, description }: <Pascal>Props) {
  return (
    <section data-testid="<folder>">
      {title && <h2>{title}</h2>}
      {description && <p>{description}</p>}
    </section>
  );
}
export default VariantA;
```

Register in `components/list.tsx`:

```ts
<name>: dynamic(() => import("components/sections/<folder>")),
```

**L1 eject — delegate, don't fork.** When ejecting a LIBRARY section, the local `index.tsx` renders your
**new** variant locally and **forwards every other variant** to the frozen library component, so pages using
existing variants keep rendering unchanged:

```tsx
import { <LibComponent> as Lib } from "@stackshift-ui/<pkg>";   // frozen library section
const Local = { <variant_new>: dynamic(() => import("./<variant_new>")) };
function <Pascal>({ data }: SectionsProps) {
  const V = data?.variant && Local[data.variant];
  return V ? <V {...props} /> : <Lib data={data} />;   // unknown variant → library, untouched
}
```

Then repoint `<name>` in `list.tsx` to the local override.

**L2 recipe — adding a variant to an EXISTING local section (4 mandatory touches — the #1 one-shot
failure is doing only touch 1).** Creating the variant file alone ships NOTHING: the router never routes
to it, the page silently falls back to the library default, and V3/V4 still pass. Every L2 variant does
ALL FOUR, in the same run:

1. **Variant file** — `components/sections/<folder>/<variant_x>.tsx` (structure per this phase, styling
   per Phase 4).
2. **Register in the router** — add `<variant_x>: dynamic(() => import("./<variant_x>"))` to the
   `Variants` map in that section's `index.tsx`. This is what V4b greps for.
3. **Extend the prop map** — every prop the variant destructures (`function VariantX({a, b, c})`) must
   have a matching key in the router's `const props = {...}`; add any missing
   `x: data?.variants?.x ?? undefined` lines. An unmapped prop is silently `undefined` at render.
4. **Studio picker entry** — append the variant to `variantsList` in the section's custom schema
   (`schemas/custom/.../sections/<folder>/<name>.ts`, keeping `...baseVariantsList` first). If the
   section has NO custom schema yet, either eject it (Phase 1 L1 rules — replicate then append) or
   record the variant as **render-only** in the completion report — but a silent picker gap is a FAIL.

**Asset refs are NOT URLs — never use `asset._ref` as an image `src`.** `image-<hash>-<w>x<h>-<ext>` is a
document ID; `<img src="image-…">` silently renders nothing (not even a broken-image icon, so the
naturalWidth check can't see it). The `variants` fragment's `images`/`logo`/`mainImage` projections
dereference refs to CDN **urls** — components read the PROJECTED url shape, never `…asset._ref`. Match
the component's prop interface to what the projection actually emits (inspect `pages/api/query.ts`); if a
custom image field has no projection, add one (Phase 1) — do not "work around" by rendering the ref.

**Projection shadowing — never store content under a field name the GROQ fragment re-projects.** The
`variants` fragment's explicit projections OVERRIDE the `...` spread: e.g. it defines
`"posts": blogPosts[]->{…}`, so a doc that stores its content in a field literally named `posts` gets it
SHADOWED — the component receives the projection result (null when `blogPosts` is absent), not the stored
data, and the section renders empty while V6 shows a populated doc. Check `pages/api/query.ts` for
explicitly-projected names (`posts`, `mainImage`, `logo`, …) and author content under the fragment's
SOURCE field (`blogPosts`, not `posts`).

**The dereference trap (`posts`-style projections) — a null-array crashes the page.** The app's GROQ
fragment pre-projects some fields with `[]->{…}` (e.g. `"posts": blogPosts[]->{…}` in
`pages/api/query.ts`), which DEREFERENCES items. When the doc stores INLINE objects (not references),
every item derefs to `null` — the component receives `[null, null, …]`: truthy, non-empty, and every
element null, so `p.category` throws `Cannot read properties of null` at runtime (V1–V4 all pass; only
a rendered check catches it). Two mandatory guards: in the **router**, `filter(Boolean)` any projected
array and prefer the stored field when the projection is empty after filtering
(`const clean = data?.variants?.posts?.filter(Boolean); posts: (clean?.length ? clean : data?.variants?.blogPosts) ?? undefined`);
in the **variant**, never `.map()` an array prop without dropping nulls first
(`(items ?? []).filter(Boolean).map(…)`). The shared-file edits across Phases 1 & 3 —
`components/list.tsx`, the schema barrel, `schemas/schema.ts`, `pages.ts`/`themePage.ts`,
`pages/api/query.ts` — **and every Sanity write** must be batched into **one serial integration step**, not
done per section. Parallel agents editing those files clobber each other; keep each section build confined to
its own `components/sections/<folder>/` (+ schema folder). After the serial step flips activation on, re-run
V2 (the schema graph changed).

### Phase 4 — Styling (token-extraction first, then apply)

**The translation hierarchy** — from mockup CSS to component class. Always climb as high as you can;
arbitrary values are the LAST resort, never the first:

```
Mockup value → brand token (bg-primary) → existing Tailwind utility (text-sm) →
page-level CSS custom property (--mfg-blue) → arbitrary value (text-[#296EFF])
```

**Step 4a — Extract mockup tokens before styling a single component.**
Read the mockup's `<style>` block — for bundler snapshots that means the DECODED `__bundler/template`
string's style block (Phase 2 Step A1), NEVER the raw wrapper's loader CSS — and build a **token map**:
every repeated color, radius, font-size, and spacing value gets a name. Then classify each entry:

| Priority             | Source                                             | Example                                                       |
| -------------------- | -------------------------------------------------- | ------------------------------------------------------------- |
| 1 — Brand token      | `themeSettings` / `tailwind.config.ts`             | `bg-primary`, `text-secondary`, `rounded-global`, `font-sans` |
| 2 — Tailwind utility | Tailwind default scale                             | `text-sm`, `rounded-xl`, `font-bold`, `p-6`                   |
| 3 — Page token       | New CSS custom property in a page-level stylesheet | `--mfg-accent-blue: #296EFF` → `text-mfg-accent`              |
| 4 — Arbitrary        | Last resort — truly one-off, no pattern            | `leading-[1.07]`, `tracking-[-0.025em]`                       |

This token map is the **styling contract** for every component on the page. Write it into the epic
task doc so all parallel agents use the same map.

**Classes must EXIST — this project is NOT a shadcn Tailwind setup.** Check `tailwind.config.ts` before
styling: the only custom tokens are `primary`, `secondary`, `background`, `*-foreground`,
`rounded-global`, `font-sans/serif/mono/global`. shadcn-convention classes (`bg-card`, `border-border`,
`text-foreground`, `text-muted-foreground`, `font-heading`) and off-scale utilities (`py-22`) are NOT
defined — they silently render as NOTHING (no error, no style), which is the #1 "styling missing"
failure. Every class you write must be a defined project token, a real Tailwind-default utility, or an
explicit arbitrary value (`py-[88px]`).

**Step 4b — Apply token map to components.**
Style each LOCAL/ejected section using the resolved classes from the map. When a mockup value
matches a brand token (priority 1), use the token. When it maps to a Tailwind utility (priority 2),
use the utility. When it's a genuinely page-specific accent that repeats across sections, define it
as a CSS custom property under `:root` or a scoped class and reference it by name — do NOT scatter
`text-[#296EFF]` across 7 components. Only truly one-off values (a single element's unique
letter-spacing) get arbitrary brackets.

**Step 4c — Post-styling audit (V7).** After all sections are styled, scan for arbitrary values:

```bash
grep -rn '\[#[0-9a-fA-F]\{6\}\]' components/sections/<page>_* | head -20
grep -rn '\[[0-9]\+px\]' components/sections/<page>_* | head -20
```

Every hit is either (a) a legitimate one-off, or (b) a token that should have been extracted. If
the same arbitrary hex appears in ≥3 files, it MUST be extracted to a page token. Report the audit
result — pass if no extractable patterns remain.

**Why this order matters.** Garbage in, garbage out: a messy mockup with inconsistent inline styles
produces `text-[#296EFF] rounded-[4px]` spaghetti if you translate literally. The token-extraction
step forces the LLM to _abstract_ the mockup into a design system BEFORE touching components, so
even an imperfect mockup yields maintainable output. When the mockup changes, only the token map
(or globals.css) changes — not every component.

### Phase 5 — VERIFY (programmatic, make-or-break; run ALL)

`$PORT`=3000 in CI / 3030 local.

**Context-pressure rule — verification NEVER gets skipped because the conversation is running long.**
Every gate in this phase is mechanical (scripts + Playwright): it needs the repo and the dataset, NOT the
conversation history. If the main context is under pressure (long multi-section run, post-compaction, or
any risk of the window filling before all gates finish), **delegate each V check to a fresh-context
subagent** (the Agent tool): give it the section name/folder/docId, the `--expect` counts from the A0
inventory, the mockup path, and `$PORT`; it runs the commands in its OWN context and returns ONLY the
verdict plus the decisive output lines for the completion report. The heavy readers (mockup decode,
screenshots, `getComputedStyle` dumps) then cost the main context nothing. Running out of context before
Phase 5 completes is a FAILED run, not an excuse — if the choice is "skip a gate" vs "delegate it",
delegation is mandatory. Subagent verdicts are still script verdicts (G4): a subagent-reported FAIL
cannot be reported as PASS, and a subagent that returns no command output is re-run, not trusted.

**Run the mechanical verifiers FIRST — their verdicts override any manual claim (G4).** The repo ships
`scripts/verify-section.sh` and `scripts/verify-render.mjs`; run ALL of these and paste their output into
the completion report. A `FAIL` line from a script cannot be reported as PASS, ever:

```bash
# per section — pass the content counts from the A0/epic inventory (E1 makes "dropped cards" impossible
# to hide: V6 passes on any non-empty doc, E1 fails unless the mockup's N cards/images actually stored):
./scripts/verify-section.sh section <name> <folder> <sectionDocId> [<variant_key>] \
  --expect fields=<N> --expect images=<N> --expect array.<field>=<N>
# once per page (unique _keys, section-name _types, ORDER vs the mockup render order):
./scripts/verify-section.sh page <pageIdOrSlug> "<type1>,<type2>,…"   # CSV = epic inventory order
# after any schema edit (duplicate field names = client-side Studio schema error V2 can't see):
./scripts/verify-section.sh schema
# after styling (phantom classes, off-scale spacing, <i data-lucide>, _ref-as-src, placeholder copy):
./scripts/verify-section.sh styles <folder1> <folder2> …
# FINAL GATE — rendered-frontend parity vs the rendered mockup (needs the dev server running):
node scripts/verify-render.mjs http://localhost:$PORT/ docs/mockups/<mockup>.html
#   R1 every mockup text line renders in the app (case-insensitive; catches dropped copy/cards)
#   R2 zero broken images + app unique-image count >= mockup's
#   R3 every mockup signature color is actually painted (catches missing accents/brand tokens)
#   R4 page height within 25% of the mockup (catches collapsed spacing)
# exit 0 = ALL PASS; non-zero = fix and re-run (G5). Then run the remaining checks below (V2, V4, V5, V7).
# NOTE for any manual browser check: lazy-loaded images report naturalWidth 0 until scrolled into view —
# scroll the full page before measuring (verify-render.mjs does this itself).
```

**V1 — Types add zero NEW errors** (project has ~300 pre-existing; ignore those):

```bash
npx tsc --noEmit 2>&1 | grep -E "<folder>|<name>"
# PASS = no NEW lines vs the pre-change baseline — NOT simply "no lines". Pre-existing errors CAN
# reference your folder (e.g. a sibling variant), and adding a line shifts line numbers so an old error
# reads as new. If this prints, attribute each line: stash/HEAD-diff to confirm it pre-dates your change.
```

**V2 — Schema graph imports & evaluates:**

```bash
yarn dev -p $PORT > dev.log 2>&1 &
# First /studio compile is HEAVY — observed ~6-7 minutes locally. Budget for it; a timeout here is
# NOT a failure signal, it's an undersized timeout (G5: don't burn fix-attempts on it — re-probe).
curl -s --retry 10 --retry-delay 30 --retry-connrefused --retry-all-errors --max-time 600 \
  -o /dev/null -w "studio:%{http_code}\n" "http://localhost:$PORT/studio"
grep -iE "Module not found|Cannot find module|Failed to compile" dev.log \
  && echo "FAIL: compile error" || echo "schema OK"
# PASS = studio:200 and no compile errors. (Don't grep bare "error" — Next logs benign lines like
# "Compiling /_error" and a client disconnect during a long compile logs ECONNRESET; neither is a FAIL.)

# V2b — schema VALIDITY (studio:200 does NOT prove it): Sanity validates schemas CLIENT-SIDE at Studio
# runtime, so a duplicate-field or malformed schema renders an error screen inside a perfectly 200 page.
./scripts/verify-section.sh schema
# PASS = ALL PASS (no duplicate field names in any custom section schema). Run after EVERY schema edit.
```

**V3 — Data round-trips through the app's GROQ:**

```bash
curl -s -G "https://$NEXT_PUBLIC_SANITY_PROJECT_ID.api.sanity.io/v2022-03-13/data/query/$NEXT_PUBLIC_SANITY_DATASET" \
  -H "Authorization: Bearer $NEXT_PUBLIC_SANITY_API_READ_TOKEN" \
  --data-urlencode 'query=*[_type=="page" && slug.current=="home"][0]{ "s": sections[]->{_type,variant,"title":variants.title} }'
# PASS = result.s contains your section with _type "<name>" and the expected title.
```

**V4 — App delivers the section data** (lands in `__NEXT_DATA__`; render is client-side):

```bash
# put a unique sentinel string in your content's title, then:
curl -s "http://localhost:$PORT/" | grep -c "<your unique sentinel>"
# PASS = count >= 1.
```

**V4b — the variant is actually wired to render (grep-provable — do NOT skip for L2).** Creating
`variant_x.tsx` does nothing until the section's `index.tsx` registers it; the #1 L2 failure is a variant
file that exists on disk while the router still falls through to the library default (V3/V4 still PASS in
that state, so they do NOT cover this):

```bash
grep -n '<variant_key>' components/sections/<folder>/index.tsx
# PASS gate 1 = the Variants map has an entry: <variant_key>: dynamic(() => import("./<variant_key>")).
# PASS gate 2 = every prop the variant file destructures (function VariantX({a, b, c})) has a matching
#               key in the router's `const props = {...}` map — an unmapped prop is silently undefined.
```

**V5 — Visual render + styling-parity loop** (REQUIRED for EVERY section — V1–V4 prove structure, NOT
pixels; see CLAUDE.md §4 design fidelity). Sections paint client-side, so use a real browser, never `curl`
(G6: a curl-grep is NOT an acceptable substitute):

```bash
npx playwright install --with-deps chromium     # or target system Chrome via launch({channel:'chrome'})
# script: page.goto(".../$PORT/<route>", {waitUntil:'domcontentloaded'})  // live-preview never hits networkidle
#         waitForSelector('[data-testid="<folder>"]'); screenshot the section.
# Render the mockup section at the SAME viewport width (open docs/mockups/<file>.html in the same browser;
# for bundler snapshots the wrapper self-hydrates — screenshot after load).
```

**The parity loop (run per section — do not exit early):**

1. Screenshot rendered section + mockup section at the same viewport.
2. Compare and write a **delta table**: `element | property (bg/text color, font size/weight, spacing,
radius, border, alignment, hover) | mockup value | rendered value`. Also run the gate-3 broken-image
   check from V6b here.
3. Empty delta table → **V5 PASS**, exit loop. Otherwise patch the Tailwind classes per the Phase 4 token
   map (fix the token map if the delta is systematic) and go to 1.
4. Hard cap 5 iterations: if deltas remain, V5 = FAIL — record the remaining delta rows verbatim in the
   completion report (G5). Never mark PASS on "testid present" or "roughly similar".

**No-vision path (MANDATORY when the executing model cannot read screenshot images — e.g. a text-only
model): build the delta table from computed styles, not pixels.** The mockup's expected values are text
(its CSS/inline JSX styles + resolved CSS vars), so compare numerically: in the SAME Playwright run, load
the mockup AND the rendered page, and for each section's key elements (wrapper, heading, body text,
primary button, card) capture `getComputedStyle` — `background-color`, `color`, `font-size`,
`font-weight`, `border-radius`, `padding`, `gap`, `text-align` — via
`page.$eval(sel, el => { const s = getComputedStyle(el); return {...}; })`. Delta table = property values
that differ (colors compared as rgb; sizes within ±1px). Same PASS rule (empty table), same 5-iteration
cap, plus the V6b gate-3 zero-broken-images check. This path is objective and self-checkable without
vision — a text-only model MUST use it instead of guessing at screenshots. On a text-only model, NEVER
`Read` a screenshot or any image file — not even to "double-check" a passing delta table: the image block
makes every subsequent API request fail and kills the entire run. The computed-style delta table IS the V5 evidence; a repo
PreToolUse hook denies image Reads on text-only models and the CI proxy strips any image that slips into a
request.

**V6 — Content is editable (Sanity is the source of truth; the StackShift mandate).** Every string the
section renders must be a STORED field, not a component default. Query the section doc and confirm `variants`
actually holds the displayed copy:

```bash
curl -s -G "https://$NEXT_PUBLIC_SANITY_PROJECT_ID.api.sanity.io/v2022-03-13/data/query/$NEXT_PUBLIC_SANITY_DATASET" \
  -H "Authorization: Bearer $NEXT_PUBLIC_SANITY_API_READ_TOKEN" \
  --data-urlencode 'query=*[_id=="<sectionDocId>"][0].variants'
# PASS = the doc holds the real copy for EVERY field the section renders (headings, body, list items, cards,
# stats, labels, links) — not just a light seed. Opening the doc in /studio shows POPULATED, editable fields.
# FAIL = blank Studio fields while the site shows text → copy is baked in code → backfill the dataset (and,
# if prose is trapped in a widget render-slot, fix the component per Phase 3 so the field can be populated).
```

**V6b — Images are uploaded + referenced in THIS dataset** (Phase 2 image mandate). Score this against the
**Step A0 inventory table**, not just `mainImage` — sections fail through `arrayOfImages`, `logo`, and
per-card image fields exactly as often:

```bash
# 1) Extract EVERY image ref stored anywhere in the section doc (any field, any nesting):
curl -s -G "https://$NEXT_PUBLIC_SANITY_PROJECT_ID.api.sanity.io/v2022-03-13/data/query/$NEXT_PUBLIC_SANITY_DATASET" \
  -H "Authorization: Bearer $NEXT_PUBLIC_SANITY_API_READ_TOKEN" \
  --data-urlencode 'query=*[_id=="<sectionDocId>"][0]' \
  | grep -o '"_ref":"image-[^"]*"' | sort -u
# PASS gate 1 = the ref count equals the "Migrate? = yes" row count for this section in the A0 inventory.
# Fewer refs than inventory rows = an image was never uploaded/referenced (blank field → component default).

# 2) Every ref must resolve to an asset in THIS dataset (a foreign-project ref returns null here):
curl -s -G "https://$NEXT_PUBLIC_SANITY_PROJECT_ID.api.sanity.io/v2022-03-13/data/query/$NEXT_PUBLIC_SANITY_DATASET" \
  -H "Authorization: Bearer $NEXT_PUBLIC_SANITY_API_READ_TOKEN" \
  --data-urlencode 'query=*[_type=="sanity.imageAsset" && _id in ["<ref1>","<ref2>"]]{_id,url}'
# PASS gate 2 = every ref from step 1 comes back with a non-null cdn.sanity.io/$NEXT_PUBLIC_SANITY_PROJECT_ID/… URL.
# FAIL = missing ref (upload was skipped/rejected) or URL under another projectId → re-run Phase 2 Steps A1–A2.

# 3) Rendered check — the page must paint the images, not just store the refs (catches a missing GROQ
#    projection, which leaves the field a bare _ref the component can't render). In the V5 Playwright run:
#      const broken = await page.$$eval('img', els => els.filter(e => !e.naturalWidth).map(e => e.src));
# PASS gate 3 = broken is empty for the section under test (zero zero-width images).
```

**V7 — No extractable inline styling (token discipline).** First the mechanical gate — phantom classes
and off-scale spacing silently render as nothing:

```bash
./scripts/verify-section.sh styles <folder1> <folder2> …   # every folder touched this run
# PASS = no undefined semantic classes (…-brand/…-card/…-foreground/font-heading/bg-gradient-*) and no
# off-scale spacing (py-22). A custom class is legal ONLY once defined in tailwind.config.ts or styles/*.css.
```

Then scan for arbitrary Tailwind values that
should have been tokens. The same hex appearing in ≥3 files is a FAIL — extract it to a page token:

```bash
grep -rn '\[#[0-9a-fA-F]\{6\}\]' components/sections/<page>_* | cut -d: -f3 | sort | uniq -c | sort -rn
grep -rn '\[[0-9]\+px\]'       components/sections/<page>_* | cut -d: -f3 | sort | uniq -c | sort -rn
# PASS = any hex/px value appearing ≥3 times has been extracted to a named CSS custom property or
# page-level class. One-off unique values are acceptable. This gate catches the #1 styling regression:
# "7 files, all with text-[#296EFF]" when --mfg-accent-blue should exist.
```

Always stop the dev server when done: `lsof -ti:$PORT | xargs kill 2>/dev/null`.

### Completion report (G7 — the REQUIRED final output; nothing else ends the run)

One row per mockup section — the row count MUST equal the section count in the Step A0/epic inventory (G3).
Every PASS cell carries the decisive output line from the command you actually ran (G4):

```
| Section (mockup)  | Level | V1 | V2 | V3 | V4 | V5 | V6 | V6b | V7 |
| ----------------- | ----- | -- | -- | -- | -- | -- | -- | --- | -- |
| hero              | L1    | PASS (0 new lines) | PASS (studio:200) | PASS (title round-trips) | PASS (sentinel x1) | PASS (0 deltas, iter 2) | PASS (9/9 fields stored) | PASS (3/3 refs resolve) | PASS (0 repeated hex) |
| logo-cloud        | L1    | …  | …  | …  | …  | …  | …  | …   | …  |

Images: <uploaded>/<inventory "Migrate?=yes" count> uploaded, all resolve under cdn.sanity.io/<projectId>.
FAIL rows (if any): per row — fix attempts made (≤3 / ≤5 for V5) and the last error or delta table verbatim.
Verdict: DONE (all cells PASS) | INCOMPLETE (list exactly which cells failed and why).
```

**NOTHING implementable is deferrable — this skill runs under full autonomy, so "open item" ≠ "TODO".**
If it can be built in this repo, it is built in THIS run: every mockup section (including thin strips
like a promo bar), every image upload (including card covers), every interactive widget's UI (including
modals), every styling pass, every verification. Deferring any of these to "Open Items" while claiming
DONE is a **falsified report** — the item belongs in a FAIL cell with fix attempts. Rationalizations that
are FORBIDDEN verbatim (each one shipped a defect in a past run): _"covers optional"_, _"modal excluded
from page sections"_, _"placeholder URLs marked in doc"_, _"screenshot/visual diff deferred"_,
_"variantsList entries can be added later"_. The ONLY valid open item names an EXTERNAL dependency that
cannot exist in this repo — a backend endpoint a form should post to, a credential, a third-party product
decision — stated as "X needs <external thing>", with the UI for X already built and verified.

**Workspace hygiene gate (part of DONE):** run `git status --short` and confirm the tree holds ONLY
intended changes — no decode artifacts (`docs/mockups/_decoded/`, extracted images, `src_*.jsx` dumps,
downloaded assets) anywhere in the repo. Temp files belong in `${TMPDIR:-/tmp}/stackshift-decode/`
(Step A1); if any decode artifact exists inside the repo, DELETE it before reporting. Quote the final
`git status --short` in the report.

A report whose matrix has an empty cell, a predicted (not executed) PASS, fewer rows than mockup
sections, or decode artifacts left in the tree is itself a FAIL — go back and finish (G2/G3/G4).

### Post-verdict — notify PublishForge (agents page; DONE only)

Agents pages (`/agents/<slug>`, generated by PublishForge) are triggered by publish EVENTS, and a
migration that writes to Sanity via the mutate API produces none — so a migrated page silently never
gets one. After the G7 report says **Verdict: DONE** (never on INCOMPLETE — don't generate an agents
page from half-built content), run:

```bash
scripts/notify-publishforge.sh <pageSlug>
# PASS = PublishForge pipeline triggered (expect a "publish: <slug>" commit on master, then /agents/<slug>).
# The script self-skips in CI (GITHUB_ACTIONS set): CiteForge already notifies on the run's "done"
# callback (ai-scraper-next migration-callback → lib/publishforge/notify.ts) — firing here too would
# run the PF pipeline twice. Local/CLI runs have no callback, which is exactly the gap this fills.
```

Quote the script's PASS/SKIP/FAIL line in the completion report. A FAIL here does NOT flip the G7
verdict (the migration itself is done and the notify is re-runnable), but it must be reported —
never silently dropped.

---

## Post-live changes — retiring & replacing (write-safety runbook)

Read **CLAUDE.md §7** first — it is the authority; this is the step list. "Post-live" = the target page's
slug is already a public route. **You hold a write token. The rules below are the complete allowed operation
set. If a request needs something not listed here, STOP and report — never improvise a delete.**

**Absolute rules (never break):**

- **NEVER** issue a Sanity `delete` mutation (page, section doc, asset, or schema) — deletion is human-only.
- **NEVER** `createOrReplace` a live page doc, and **NEVER** edit a live page in place for a structural change.
- **NEVER** delete files under `schemas/`, remove keys from `components/list.tsx`, or remove members from
  `pages.ts`/`themePage.ts`. Retire with a `@sunset` comment; a human deletes later.

**Step 1 — classify the change into ONE lane (pick Lane B if unsure):**

| Change                                                                                    | Lane  | Action                           |
| ----------------------------------------------------------------------------------------- | ----- | -------------------------------- |
| Content-only (new _value_ in an existing field)                                           | **A** | in-place `patch set` — Step 2    |
| Structural (new/cloned/restyled component, layout, add/remove/reorder section, new field) | **B** | clone-and-swap the page — Step 3 |
| Delete anything                                                                           | —     | **STOP — human-only**            |

### Step 2 — Lane A: content-only `patch` (in-place, allowed, reversible via doc history)

Change only values of fields that ALREADY exist. Use `patch`→`set`, never `createOrReplace`. Do NOT touch
`sections[]`, `_type`, `variant`, `slug`, or schema. To change an image: upload the new asset (Phase 2), then
`set` the `image.asset._ref` — never delete the old asset.

```bash
WRITE_TOKEN="${NEXT_PUBLIC_SANITY_API_WRITE_TOKEN:-$SANITY_API_WRITE_TOKEN}"
curl -s -X POST "https://$NEXT_PUBLIC_SANITY_PROJECT_ID.api.sanity.io/v2022-03-13/data/mutate/$NEXT_PUBLIC_SANITY_DATASET" \
  -H "Authorization: Bearer $WRITE_TOKEN" -H "Content-Type: application/json" \
  --data '{"mutations":[{"patch":{"id":"<sectionDocId>","set":{"variants.title":"New heading","variants.description":"New body"}}}]}'
# Verify: re-run V6 on <sectionDocId> and confirm the new value is stored.
```

### Step 3 — Lane B / Pages: clone-and-swap (the ONLY way to change a live page)

A structural component change to a live page IS a page change — it goes through this exact flow. The live
page is read-only throughout.

1. **Build the new/cloned component** (NOT L0 — different UI ⇒ clone the library/local variant into a LOCAL
   variant (L1) or a new custom component (L3), then style it per Phase 4). Confine edits to your own
   `components/sections/<folder>/`.
2. **Clone the live page** into a NEW `page` doc: new `_id`, a **staging slug** (e.g. `home-staging`), and a
   fresh `sections[]` with new `_key`s. GET the live page first, then build the clone from it (keep the
   sections you're keeping, swap in the new section `_ref` where the component changed). New components get
   **new** section docs; the live page's section docs are never modified. (`createOrReplace` below is SAFE —
   it targets the NEW staging doc, `<newPageId>`, never the live page. The §7.1 ban is on `createOrReplace`
   of the _live_ page only.)

```bash
WRITE_TOKEN="${NEXT_PUBLIC_SANITY_API_WRITE_TOKEN:-$SANITY_API_WRITE_TOKEN}"
curl -s -X POST "https://$NEXT_PUBLIC_SANITY_PROJECT_ID.api.sanity.io/v2022-03-13/data/mutate/$NEXT_PUBLIC_SANITY_DATASET" \
  -H "Authorization: Bearer $WRITE_TOKEN" -H "Content-Type: application/json" \
  --data '{"mutations":[
    {"createOrReplace":{"_id":"<newSectionDocId>","_type":"<name>","label":"…","variant":"variant_a","variants":{ … }}},
    {"createOrReplace":{"_id":"<newPageId>","_type":"page","title":"Home (staging)","slug":{"_type":"slug","current":"home-staging"},
      "sections":[{"_key":"<uniq1>","_type":"<name>","_ref":"<newSectionDocId>"}]}}
  ]}'
```

3. **Migrate content + images** into the clone's section docs (Phase 2) and **VERIFY** the clone at
   `/<staging-slug>` — run V1–V7. The clone must fully pass before any swap.
4. **Swap in ONE transaction** (public slug must never be on two published docs at once). Marker goes in
   **`title`** (Studio's document list shows `title` — the page schema has no custom preview) AND the slug.
   Replace `<today>` with the current date `YYYY-MM-DD`; replace `home` with the actual public slug:

```bash
WRITE_TOKEN="${NEXT_PUBLIC_SANITY_API_WRITE_TOKEN:-$SANITY_API_WRITE_TOKEN}"
curl -s -X POST "https://$NEXT_PUBLIC_SANITY_PROJECT_ID.api.sanity.io/v2022-03-13/data/mutate/$NEXT_PUBLIC_SANITY_DATASET" \
  -H "Authorization: Bearer $WRITE_TOKEN" -H "Content-Type: application/json" \
  --data '{"mutations":[
    {"patch":{"id":"<oldPageId>","set":{"title":"Home (OLD — SAFE TO DELETE, retired <today>)","slug":{"_type":"slug","current":"home-old-<today>"}}}},
    {"patch":{"id":"<newPageId>","set":{"title":"Home","slug":{"_type":"slug","current":"home"}}}}
  ]}'
```

5. **Repoint inbound references.** Internal links / nav point at a page by document `_id`, not slug (CLAUDE.md
   §2). Query for docs referencing `<oldPageId>`; `patch` each inbound `_ref` to `<newPageId>`. (A slug-routed
   homepage with no inbound refs has nothing to repoint — confirm, don't assume.)

```bash
curl -s -G "https://$NEXT_PUBLIC_SANITY_PROJECT_ID.api.sanity.io/v2022-03-13/data/query/$NEXT_PUBLIC_SANITY_DATASET" \
  -H "Authorization: Bearer $NEXT_PUBLIC_SANITY_API_READ_TOKEN" \
  --data-urlencode 'query=*[references("<oldPageId>")]{_id,_type}'
# For each hit, patch the specific _ref path from <oldPageId> to <newPageId>. Zero hits = nothing to do.
```

6. **Never delete the old page.** It remains as the retired copy (`title` marked "SAFE TO DELETE"); a human
   deletes it. If a component is now unused, mark it with the `@sunset` comment (CLAUDE.md §7.4) — do not
   remove its code, and do not remove its schema entry while any live page still references its `_type`.
