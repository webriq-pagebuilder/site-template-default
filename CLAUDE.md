# CLAUDE.md — architecture & guardrails

> Always-loaded context for this repo. **The step-by-step build procedure** (create/convert a section,
> push content, verify) lives in the **`stackshift-section` skill** — invoke it, or read
> `.claude/skills/stackshift-section/SKILL.md`, before building. Agents may run headless in CI
> (one-shot, make-or-break): follow the skill exactly and verify programmatically.

## 1. Architecture

A **single Next.js 14 app (Pages Router)** with **Sanity Studio v3 embedded at `/studio`**. Reusable
building blocks live in **versioned npm packages**; this repo is the override layer:

- **UI** → `@stackshift-ui/*` packages (React components, each with visual _variants_).
- **Schemas** → `@webriq-pagebuilder/sanity-plugin-schema-*` packages.
- **Customizations** → local `components/` and `schemas/custom/` (the app prefers the local copy).

Version is **frozen** — it does NOT auto-inherit upstream. Treat installed `node_modules` as the source
of truth; **never bump package versions.**

**Render flow:** `pages/[slug].tsx` / `index.tsx` run a GROQ query (`pages/api/query.ts`) →
`PageSections` (`components/page/index.tsx`) loops `data.sections[]`, looks up `Components[_type]`
(`components/list.tsx`) → the component reads `data.variant` and maps `data.variants.*` to props.
**Sections render client-side** (wrapped in `PreviewSuspense`) — painted markup is NOT in SSR HTML
(verify via data in `__NEXT_DATA__` or a real browser, not `curl` scraping).

**Schema ≠ render (where each lives).** The render path above is **schema-independent** — it needs only
the content doc + `Components[_type]`, never the Sanity schema. The schema (section types +
`pages.ts`/`themePage.ts` `of:[]`) governs **Studio editing/validation only**, and it is compiled into the
**`next build`** (Studio is embedded — there is **no separate `sanity deploy`/`studioHost`**). So **content
is dataset-global; schema is per-app-build.** Consequence: a section can render live on a deployed URL while
a Studio whose build predates the schema rejects it on edit (_"schema does not declare items of type X"_) →
fix by **deploying the branch that carries the schema**, not by touching content.

## 2. The invariant: names must agree

A section has ONE **camelCase name** (`featureHighlight`) + ONE **snake_case folder**
(`feature_highlight`). The camelCase name must be identical across all of:

| Place                                                                        | Uses           |
| ---------------------------------------------------------------------------- | -------------- |
| `components/list.tsx` → `Components` key                                     | camelCase name |
| `schemas/custom/.../sections/<folder>/<name>.ts` → `rootSchema("<name>", …)` | camelCase name |
| `schemas/documents/pages.ts` **and** `themePage.ts` → `to:[{type:"<name>"}]` | camelCase name |
| Sanity content → section doc `_type` + page `sections[]._type`               | camelCase name |

Mismatch = silent non-render. Only built-in aliases (`components/page/index.tsx#getSectionType`):
`slotCart→cartSection`, `slotWishlist→wishlistSection`.

## 3. Setup & credentials

```bash
nvm use            # Node 20 (.nvmrc)
yarn install
yarn dev           # CI: port 3000; locally 3000 is often taken → yarn dev -p 3030
```

Credentials via env vars (read them; never hardcode/print tokens). Local: in `.env.local` **or
`.env.development`** (`set -a; . ./.env.local 2>/dev/null; . ./.env.development 2>/dev/null; set +a` —
whichever exists). CI: from environment / GitHub secrets.

| Var                                                                                      | Purpose                                                              |
| ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`                                                          | project (defaults to shared demo `9itgab5x` — **never write to it**) |
| `NEXT_PUBLIC_SANITY_DATASET`                                                             | dataset (e.g. `production`)                                          |
| `NEXT_PUBLIC_SANITY_API_READ_TOKEN`                                                      | reads                                                                |
| **`NEXT_PUBLIC_SANITY_API_WRITE_TOKEN`** (canonical) / `SANITY_API_WRITE_TOKEN` (legacy) | writes (migration)                                                   |

**Write-token name — the #1 migration blocker.** New StackShift projects provision the write token as
**`NEXT_PUBLIC_SANITY_API_WRITE_TOKEN`**; some older repos (this one included, historically) use
`SANITY_API_WRITE_TOKEN`. Migration scripts / curls MUST resolve **NEXT_PUBLIC first, then the legacy name**:
`WRITE_TOKEN="${NEXT_PUBLIC_SANITY_API_WRITE_TOKEN:-$SANITY_API_WRITE_TOKEN}"`. Referencing only one name
401s on the other kind of project and forces a second prompt.

## 4. Styling & branding

**Tailwind 3 + `@stackshift-ui/*`, a shadcn-based library** (primitives = Radix UI,
class-variance-authority, the `cn()` util from `@stackshift-ui/system`, and lucide-react; the repo consumes
prebuilt packages — no shadcn CLI / `components.json`). Prefer composing those primitives over raw elements.
Branding is global and token-driven:

- **Global brand tokens** — a single Sanity doc **`themeSettings`** (`_id "<projectId>-theme-settings"`;
  defaults in `components/theme-settings/defaultThemeConfig.ts`) holds font + colors. At runtime
  `pages/_app.tsx` renders `<style>:root{ setProjectTheme(themeConfig) }</style>`
  (`utils/theme/index.ts`) → CSS vars → Tailwind tokens. Edit once → everything re-skins (live).
- **Brand tokens to use** (never hardcode their raw values): colors `bg-primary` / `text-secondary` /
  `bg-background` (+ `*-foreground`), radius `rounded-global`, and the inherited theme font.

**THE RULE — translation hierarchy.** Mockup values climb this ladder; arbitrary Tailwind brackets
are the LAST resort, never the first:

```
Mockup CSS value → brand token (bg-primary, text-secondary) →
existing Tailwind utility (text-sm, rounded-xl) →
page-level CSS custom property (--mfg-blue, defined once in a page stylesheet) →
arbitrary value (text-[#296EFF] — truly one-off only)
```

**Extract tokens before styling.** Read the mockup's `<style>` block first and build a token map:
name every repeated color, radius, font-size, and spacing. Classify each into one of the four tiers
above. This map is the styling contract — all sections reference it, so a same-value hex appearing
in ≥3 components is a FAIL: extract it to a named token. The audit gate is V7 in the
`stackshift-section` skill.

**Garbage in does NOT mean garbage out.** A messy mockup with inconsistent inline styles must still
produce clean, token-driven components. The LLM's job is to _abstract_ the mockup into a design
system, not mirror it pixel-for-pixel with arbitrary values. When the mockup changes, only the
token map changes — not every component.

**Multi-design governance:** `themeSettings` is the single source of truth — **lock it from the first /
home design**; later pages derive from it via tokens. A **rebrand is explicit + project-wide** (update
`themeSettings`) and ONLY when the dev declares one. **Conflict gate (headless/CI):** if a new design's
brand values diverge with no rebrand declared → do NOT redefine global tokens and do NOT hardcode raw
values per component → map to the nearest token, or **STOP with a "branding conflict" report.** Never guess.

**Design fidelity — the mockup is the styling contract:** the HTML mockup (`docs/mockups/*.html`) is the
source of truth for styling; its `<style>` block (CSS custom properties + per-section rules) **outranks
task-doc prose**, which can misread the design (a section's brief and its mockup can disagree — the mockup
wins). **Mockups here are usually bundler snapshots** (detect: the file contains `__bundler/manifest`): the
raw file's own `<style>` is just the loader shell (spinner/thumbnail CSS) — extracting tokens from it yields
garbage. The REAL design markup + `<style>` is a JSON-encoded string inside
`<script type="__bundler/template">`, and images/fonts are base64 in the manifest — decode both per the
`stackshift-section` skill (Phase 2 Step A1) before reading any styles, copy, or images. Read the mockup's values, translate each one through the hierarchy above, and do NOT approximate or
silently drop attributes (border-radius, font-weight, letter-spacing, font-style / emphasis, the precise
accent role). Approximation is the #1 headless failure mode: structure passes, pixels don't match. **A
green `tsc` + a present `data-testid` proves STRUCTURE, not visual fidelity** — sections render client-side,
so verify the _rendered_ page in a real browser (e.g. Playwright `channel:'chrome'`,
`waitUntil:'domcontentloaded'` — live-preview keeps a socket open so it never reaches `networkidle`;
screenshot per `[data-testid]`, since `curl`/SSR HTML won't show painted CSS) and diff it against the mockup
before calling a styled section done.

## 5. Guardrails / do-NOT

- **NEVER `git add` / `git commit` / `git push` — leave every change uncommitted in the working tree.**
  The developer reviews the full diff in source control BEFORE anything enters git history. This binds
  regardless of entry point (`/implement`, the `stackshift-section` skill, a direct prompt, headless/CI,
  spawned subagents) and regardless of what any skill's own instructions say about committing.
  "Implementation complete, all changes uncommitted for review" is the CORRECT end state. Commits happen
  only when the developer explicitly asks, or at the `/ship` stage after explicit approval.
- **Tasks before code — plan, don't drift.** Before writing ANY code or pushing content for a mockup conversion, create the task documents in `docs/task/` and register them in `TASKS.md`. Follow this sequence: (1) epic task doc with reuse triage table + dependency graph, (2) per-section subtask docs (one per section, even L0 content-only), (3) serial integration task doc, (4) update `TASKS.md`. The task docs are the design contract — they lock decisions BEFORE implementation so parallel agents don't drift. **Never skip to code without this gate.**
- **Build procedure = the `stackshift-section` skill** (`.claude/skills/stackshift-section/SKILL.md`) — read it before creating/converting a section. This binds **regardless of entry point**: whether the run starts from `/implement`, `/task`, a direct prompt, or any other skill, a mockup conversion executes the stackshift-section phases, guards (G1–G7), and verification gates end-to-end in that single invocation — the wrapping skill does not dilute or replace them.
- **Reuse before create — but NEVER render a raw default library component.** Match each section against the catalog (see the skill's Step 0 triage), but a `@stackshift-ui` default variant is a **starting point, never the shipped output**: you cannot restyle a frozen library component, so wiring content into one leaves it stuck at library styling while the mockup goes unmatched — that silently breaks the "every component is styled" rule. When an existing library section/variant is the closest match, you have exactly two moves: **(a) clone it into a LOCAL variant** (eject → `components/sections/<folder>/` → restyle to the mockup, an L1), or **(b) build a new custom component** (L3). **L0 (content-only, no styling phase) is valid ONLY for a component that is ALREADY a styled LOCAL section in this repo** (e.g. a second page reusing a section you already built + styled) — it is NEVER the path for a fresh mockup section that merely resembles a library default. Every section rendered on a converted page must pass the §4 visual-fidelity gate, regardless of reuse level.
- **Structure first, styling last** — lock schema + content, build a bare component, then style as a separate phase (§4 tokens). Styling gets its OWN gate: visually verify the rendered section against the mockup (§4 design fidelity), not just token-compliance — headless agents reliably pass `tsc`/`data-testid` while drifting on color, border-radius, emphasis style, and weight.
- **Everything is editable — Sanity is the content source of truth (the whole point of StackShift).** Every visible string, paragraph, list item, card field, stat, label, and link in the mockup must be authored INTO the section doc's `variants` as a _populated_ field and rendered FROM `data.variants.*`, so an editor can change anything in Studio. Component default copy is a fallback for **empty data only** (standalone render) — NEVER the means by which the live page shows its real content. **A section that renders full copy on the site while its Studio fields sit empty is a defect** (content baked in code), not "done": push the FULL copy in Phase 2 and confirm it in Phase 5 (skill V6), don't ship a light seed. And don't trap editable copy in a fixed render slot — prose interleaved with widgets in one `body`/`children` slot can't be a Studio field; give each editable block its own field rendered independently.
- **Images are content too — upload them in the SAME migration, not a follow-up.** Every image the mockup shows (heroes, logos, cards, avatars, backgrounds) MUST be uploaded into THIS project's dataset during Phase 2 and referenced by the returned asset id — a hardcoded `<img src>`, a foreign-project `cdn.sanity.io/<otherId>/…` URL, or an empty image field is a defect, exactly like baked copy. **Verified working flow** (skill Phase 2): POST the file to the `assets/images/<dataset>` endpoint → get back `"_id":"image-<hash>-<w>x<h>-<ext>"` → store it as `mainImage.image.asset._ref` (shape `{"image":{"_type":"image","asset":{"_type":"reference","_ref":"<assetId>"}},"alt":"…"}`); the GROQ `mainImage` projection dereferences it in-dataset to a CDN URL. `alt` is **not** schema-required (migration succeeds without it) but ALWAYS populate it — it's the accessibility text and the Studio preview title. Skipping image upload leaves the section on component-default/placeholder images = not "done".
- **Unused ≠ dead — never delete blog / commerce / scaffold code.** A fresh StackShift copy ships dormant blog and e-commerce schemas + components (`EcommerceSchema`, `all_products`, `featured_products`, blog sections, their query fragments). They look unused because activation is gated (`mergeReplaceAndAdd` in the serial integration step flips on the **entire** custom layer at once — see below), but deleting them breaks the schema graph the moment that layer activates, and on a fresh site you often can't tell what's load-bearing. Do NOT "clean up," prune, or remove out-of-scope files, imports, or schemas — scope every change to the section you're building. If something looks dead, leave it and flag it, don't delete it.
- **Never write content to the shared demo `9itgab5x`** — only the project's own dataset + write token.
- **Never bump `@stackshift-ui/*` / `@webriq-pagebuilder/*` versions** — architecture is frozen.
- **Never use `yarn generate`/plop headlessly** — interactive, will hang.
- **Brand styling uses tokens, never raw hex/px** (§4); on a branding conflict, STOP.
- Custom schema is inert until activated in `schemas/schema.ts`; register new sections in `themePage.ts` too.
- **Local schema overrides REPLACE the library schema by name — wholesale + project-wide** (`mergeReplaceAndAdd`). Ejecting `features`/`header`/`footer`/`callToAction` means your override must **replicate every library variant + field** before appending new ones, or they silently vanish in Studio on _every_ page. Activating custom schemas turns on the **entire** custom layer at once (blog/commerce + all overrides), not just your section — so the activation step belongs in the single serial integration task, and after it, re-verify `/studio` compiles (the schema graph changed).
- `next.config.mjs` sets `ignoreBuildErrors:true` — a green build is NOT type-safe; verify your own files with `tsc`.
- **Mechanical verification ships in-repo — script verdicts override self-assessment.** `scripts/verify-section.sh` (modes: `section` with `--expect` content counts, `page` order/keys, `schema` duplicate fields, `styles` phantom classes/`data-lucide`/`_ref`-as-src/placeholder copy) and `scripts/verify-render.mjs` (rendered app vs rendered mockup: text parity, images, painted palette, page height). The `stackshift-section` skill Phase 5 mandates running all of them; a script `FAIL` can never be reported as PASS.
- **Audit delegated / headless output against the real diff** — when orchestrating subagents (or resuming headless work), don't trust self-reports ("types OK", "done"). Re-verify yourself: `git status` for stray/out-of-scope edits (e.g. a section task touching another section's files, or a schema-barrel/`list.tsx` registration that belongs to the serial integration step), `tsc` **vs the HEAD baseline** to separate pre-existing errors from newly-introduced ones, and §4 design fidelity for visual drift.

## 6. Key files

| File                                                           | Role                                                                    |
| -------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `components/list.tsx`                                          | `Components` registry (`_type` → component); `filterDataToSingleItem`   |
| `components/page/index.tsx`                                    | `PageSections` renderer; `getSectionType` aliases                       |
| `components/sections/*`                                        | local section components (reference: `featured_products`, `navigation`) |
| `schemas/schema.ts`                                            | schema entry point; custom-schema activation                            |
| `schemas/custom/**`                                            | local schemas; `common/fields.ts`, `elements/`, section folders         |
| `schemas/documents/pages.ts`, `themePage.ts`                   | which sections a page may contain                                       |
| `studio/utils/index.ts`                                        | `mergeReplaceAndAdd` (override-by-name); `EcommerceSchema`              |
| `pages/api/query.ts`                                           | GROQ queries; `variants` projection fragment                            |
| `pages/_app.tsx`, `utils/theme/index.ts`, `tailwind.config.ts` | theme → CSS vars → Tailwind tokens                                      |
| `lib/sanity.client.ts`, `lib/sanity.ts`, `studio/config.ts`    | Sanity clients, image builder, env/config                               |

## 7. Write-safety & post-live changes (DANGEROUS OPERATIONS — read before any Sanity write)

You hold a **write token**. These rules are absolute and non-negotiable. They are not guidance; they are
the allowed operation set. If a request cannot be done within these rules, **STOP and report** — do not
improvise a destructive path.

### 7.1 The one hard line — NEVER delete

- **NEVER issue a Sanity `delete` mutation** — not on a page, a section doc, an asset, or a schema doc.
  Deletion is **human-only, always.**
- **NEVER `createOrReplace` a live page document** (a `page` doc whose `slug.current` is the public route,
  e.g. `home`). `createOrReplace` overwrites the whole doc and can drop inbound refs — treat a live page as
  read-only.
- **NEVER delete or remove code** you did not create in the current task: no deleting files under `schemas/`,
  no removing keys from `components/list.tsx`, no removing members from `pages.ts`/`themePage.ts`, no
  deleting blog/commerce/scaffold code (see §5 "Unused ≠ dead"). Retire by marking, never by deleting.
- **Retire, don't delete.** When something is superseded, mark it with a `@sunset` comment (§7.4) and leave
  it in place for a human to remove.

### 7.2 Classify every post-live change into exactly ONE lane

A change is "post-live" when the target page's slug is already a public route. Decide the lane FIRST:

| The change is…                                                                                         | Lane  | What you may do                                                                     |
| ------------------------------------------------------------------------------------------------------ | ----- | ----------------------------------------------------------------------------------- |
| **Content-only** — editing the _values_ of fields that already exist (copy, image, link, stat)         | **A** | `patch set` on `variants.*` of the existing section doc — see §7.3                  |
| **Structural** — a new/cloned/restyled component, different UI, add/remove/reorder sections, new field | **B** | Clone the page, build on the clone, swap slug — see §7.5. NEVER edit the live page. |
| **Deleting** anything                                                                                  | —     | **STOP. Human-only.** (§7.1)                                                        |

If unsure which lane, it is Lane B (the safe one). Never pick Lane A for anything structural.

### 7.3 Lane A — content-only update (in-place, allowed)

Only for changing values in fields that **already exist** on a live section doc. Reversible via Sanity's
document history. **Scope clarifier:** Lane A patches a **section** doc (`_type` = a section name, referenced
by the page's `sections[]`), NOT the **page** doc. The page doc stays read-only (§7.1); editing existing
field _values_ on the section docs it references is the ONE allowed in-place write on a live page.

- Use **`patch` → `set`**, never `createOrReplace`. Set only the specific `variants.*` paths that changed.
- **NEVER** touch `sections[]`, `_type`, `variant`, `slug`, or schema in Lane A.
- To change an image, upload the new asset first (§4 / skill Phase 2) and `set` the
  `variants.<field>.image.asset._ref` — do not delete the old asset.

```bash
WRITE_TOKEN="${NEXT_PUBLIC_SANITY_API_WRITE_TOKEN:-$SANITY_API_WRITE_TOKEN}"
curl -s -X POST "https://$NEXT_PUBLIC_SANITY_PROJECT_ID.api.sanity.io/v2022-03-13/data/mutate/$NEXT_PUBLIC_SANITY_DATASET" \
  -H "Authorization: Bearer $WRITE_TOKEN" -H "Content-Type: application/json" \
  --data '{"mutations":[{"patch":{"id":"<sectionDocId>","set":{"variants.title":"New heading"}}}]}'
```

### 7.4 Retiring a component (NEVER delete — append-only for LOCAL components)

Applies to your own `components/sections/*` components. Library defaults are never retired (they're frozen;
you never shipped one — see §5).

- **Append, don't mutate a shipped, referenced component.** To change a component that is already live, create
  a NEW variant/component and wire the new one; leave the old one in place.
- Before disassociating an old component (removing its `list.tsx` key / `pages.ts` member / schema entry) you
  MUST first confirm **no live page references its `_type`** (query the dataset). If any page still points at
  it, removing the schema entry breaks that page in Studio (schema ≠ render, §2). If any reference remains →
  do NOT disassociate; just add the `@sunset` marker and stop.
- Mark the retired component with a greppable marker (a human deletes later). `<today>` = the current date
  in `YYYY-MM-DD` (do NOT copy the literal placeholder):
  ```ts
  // @sunset <today> superseded-by:<newName> — safe to delete when no page references _type "<oldName>"
  ```

### 7.5 Lane B & Pages — clone-and-swap (the ONLY way to change a live page)

Philosophy: **NEVER delete a page; NEVER edit a live page in place.** Clone → build on the clone → test →
swap. A structural component change to a live page IS a page change and goes through this exact flow.

1. **Clone the live page** into a NEW doc: new `_id`, temporary staging slug (e.g. `home-staging`), and a
   fresh `sections[]` (new `_key`s). Build/restyle the new/cloned components on this clone only.
2. **Migrate content + images** into the clone's section docs (skill Phase 2). New components → new section
   docs; the live page's section docs are untouched.
3. **Verify** the clone at its staging slug (skill V1–V7). The clone must fully pass before the swap.
4. **Swap in ONE mutation transaction** (so the public slug is never on two published docs at once). Patch
   the OLD page's `title` + `slug` to retired values, and the NEW page's `title` + `slug` to the public
   values. The marker MUST go in **`title`** (that is what Studio's document list shows) as well as the slug.
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
5. **Inbound references (do not skip).** Internal links / nav point at a page by document `_id`, not slug
   (§2). After the swap, any nav/related link that referenced the OLD page's `_id` still resolves to the
   retired page. If other docs reference the page being replaced, `patch` those inbound `_ref`s to the NEW
   page's `_id`. (For a slug-routed homepage with no inbound refs, there is nothing to repoint.)
6. **Never delete the old page.** It stays as the retired copy (`title` marked "SAFE TO DELETE") for a human.
