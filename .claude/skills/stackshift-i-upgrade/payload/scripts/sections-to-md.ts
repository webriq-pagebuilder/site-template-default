// Converts Sanity page-builder sections into markdown for the agent backfill.
//
// A `page` document stores content as an array of references to section
// documents (header, features, textComponent, faqs, team, ...), each built
// with the shared `@webriq-pagebuilder/sanity-plugin-schema-default` rootSchema
// helper. Every such section has the shape
// `{ _type, label, variant, variants: { ...schemaFields } }` — the real content
// fields live nested under `variants`, not at the top level.
//
// `variant` only controls which fields are *visible in the Studio UI*
// (`hideIfVariantIn`); Sanity does NOT clear a field's stored value when a
// variant hides it, so `variants` can still hold stale copy from an abandoned
// variant. We therefore read the full `variants` object (so nothing real is
// missed) and use `hiddenFor(variant, [...])` to skip fields the *current*
// variant hides — avoiding stale-alternate duplication. An unknown/missing
// variant errs toward keeping content.
//
// All field names + variant→field maps below are the canonical shared-schema
// values, so this works on every StackShift 6.x site. Portable-text object
// types beyond plain `block` (contentTable, note, customList, section, link
// marks) are project extensions; they are handled defensively and simply
// no-op on strict-canonical data.

type AnyObj = Record<string, any>;

export interface DereferencedSection {
  _type: string;
  label?: string;
  variant?: string;
  variants?: AnyObj;
}

const SKIP_SECTION_TYPES = new Set(["navigation", "footer"]);

// --- Placeholder / lorem detection -----------------------------------------
// Two layers, driven by the shared @webriq-pagebuilder schema defaults:
//   1. LOREM       — known `initialValue` seed phrases (real-sounding marketing
//                    copy shipped as defaults) + literal Lorem ipsum.
//   2. isLoremLatin — Studio placeholder generators emit *arbitrary* Latin
//                    filler ("Nunc maximus odio sit amet..."), not fixed
//                    strings, so flag text that's mostly filler vocabulary.
const LOREM =
  /lorem ipsum|dolor sit amet|dolor sir amet consectutar|build & launch without problems|so much more than a business analytics tool|check our awesome team members|what our clients think about us|learn how we will help you to reach your goals|etiam facilisis|pellentesque augue|pellentesque efficitur nisl sodales egestas lobortis|proin fringilla eleifend justo pellentesque|morbi sagittis ligula sit amet elit maximus|ut congue nec leo eget aliquam/i;

// Latin filler vocabulary — real English business copy essentially never
// contains more than one of these tokens by chance.
const LATIN_FILLER_WORDS = new Set([
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "consectutar", "adipiscing", "elit",
  "eiusmod", "tempor", "incididunt", "labore", "dolore", "magna", "aliqua", "aliquam", "enim",
  "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "aliquip",
  "commodo", "consequat", "duis", "aute", "irure", "reprehenderit", "voluptate", "velit", "esse",
  "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "proident",
  "sunt", "culpa", "officia", "deserunt", "mollit", "anim", "laborum", "vestibulum", "vivamus",
  "nunc", "maximus", "eros", "faucibus", "hendrerit", "gravida", "turpis", "praesent", "lectus",
  "porttitor", "scelerisque", "ornare", "neque", "congue", "lacinia", "nibh", "suspendisse",
  "ultrices", "laoreet", "etiam", "tortor", "curabitur", "morbi", "mollis", "metus", "pretium",
  "tincidunt", "risus", "orci", "sapien", "lobortis", "habitasse", "platea", "dictumst", "feugiat",
  "integer", "erat", "volutpat", "phasellus", "fusce", "donec", "mauris", "sagittis", "ligula",
  "proin", "fringilla", "eleifend", "justo", "pellentesque", "efficitur", "sodales", "egestas",
  "cursus", "malesuada", "fames", "primis", "luctus", "ultricies", "dapibus", "rhoncus", "purus",
  "viverra", "ante", "libero", "potenti", "tempus", "pulvinar", "blandit", "imperdiet", "auctor",
  "condimentum", "molestie", "vulputate", "posuere", "sollicitudin", "varius", "quam", "aenean",
  "semper", "accumsan", "tellus", "elementum", "magnis", "parturient", "montes", "natoque",
  "penatibus", "aptent", "taciti", "sociosqu", "litora", "torquent", "conubia",
  "inceptos", "himenaeos", "cras", "odio", "arcu", "augue", "diam", "eget", "sem", "nam", "leo",
  "vitae", "vel", "convallis", "interdum", "massa", "dui", "urna",
]);

const LATIN_FILLER_RATIO = 0.4;

function isLoremLatin(text: string): boolean {
  const words = text.toLowerCase().match(/[a-z]+/g);
  if (!words || words.length < 3) return false;
  const hits = words.filter((w) => LATIN_FILLER_WORDS.has(w)).length;
  return hits / words.length >= LATIN_FILLER_RATIO;
}

function isLorem(text: string | undefined | null): boolean {
  // Non-string / empty → treat as non-content (skip). Guards every caller that
  // passes a possibly-non-string field value (name, label, title) into isLorem.
  if (!text || typeof text !== "string") return true;
  return LOREM.test(text) || isLoremLatin(text);
}
// NOTE: a field-name-as-value detector (dropping values that exactly equal a
// field label like "subtitle"/"content") was considered and rejected — it
// silently deletes legitimate one-word headings ("Content", "Text",
// "Description") that occur on real sites. The LOREM seed-phrase list and the
// Latin-filler ratio already catch the StackShift initialValue defaults, which
// is the actual placeholder-content problem.

// --- Dedup ------------------------------------------------------------------
// Scoped to a single page's full section list (not across pages — cross-page
// repeats are intentional shared content).
type Seen = Set<string>;

function normKey(text: string): string {
  return text.trim().replace(/\s+/g, " ").toLowerCase();
}

function dup(md: string, seen: Seen): boolean {
  const key = normKey(md);
  if (!key) return false;
  if (seen.has(key)) return true;
  seen.add(key);
  return false;
}

// `hideIfVariantIn` gate: true when the current variant hides this field.
// A missing/unknown variant keeps content rather than silently dropping it.
function hiddenFor(variant: string | undefined, hiddenIn: string[]): boolean {
  if (!variant) return false;
  return hiddenIn.includes(variant);
}

// --- Portable text ----------------------------------------------------------
// Canonical shared fields are `_type:"block"` with strong/em/underline
// decorators only. contentTable / note / customList / section / link marks /
// textWithIcon are project extensions handled defensively (no-op on canonical).
function inline(span: AnyObj, markDefs: AnyObj[]): string {
  let text = typeof span?.text === "string" ? span.text : "";
  if (!text) return "";
  for (const mark of span.marks ?? []) {
    if (mark === "strong") text = `**${text}**`;
    else if (mark === "em") text = `_${text}_`;
    else if (mark === "code") text = `\`${text}\``;
    else {
      const def = (markDefs ?? []).find((d) => d._key === mark);
      if (def?._type === "link" && def.linkExternal)
        text = `[${text}](${def.linkExternal})`;
    }
  }
  return text;
}

function renderBlock(block: AnyObj): string {
  const markDefs: AnyObj[] = block.markDefs ?? [];
  const text = (block.children ?? [])
    .map((s: AnyObj) => inline(s, markDefs))
    .join("");
  if (!text.trim() || isLorem(text)) return "";
  if (block.listItem === "bullet") return `- ${text}`;
  if (block.listItem === "number") return `1. ${text}`;
  switch (block.style) {
    case "h1": // demote: page H1 comes from frontmatter title
    case "h2":
    case "h3":
      return `### ${text}`;
    case "h4":
      return `#### ${text}`;
    case "blockquote":
      return `> ${text}`;
    default:
      return text;
  }
}

function renderTable(table: AnyObj): string {
  const rows: string[][] = (table.cells ?? [])
    .map((c: AnyObj) =>
      (c.rowArray ?? []).map((v: string) =>
        String(v ?? "")
          .replace(/[\t\n]+/g, " ")
          .replace(/\|/g, "\\|")
          .trim(),
      ),
    )
    .filter((r: string[]) => r.length);
  if (!rows.length) return "";
  const width = Math.max(...rows.map((r) => r.length));
  const pad = (r: string[]) =>
    `| ${Array.from({ length: width }, (_, i) => r[i] ?? "").join(" | ")} |`;
  const [head, ...body] = rows;
  const sep = `| ${Array.from({ length: width }, () => "---").join(" | ")} |`;
  return [pad(head), sep, ...body.map(pad)].join("\n");
}

// Mixed array of blocks / tables / notes / lists / nested sections.
function renderPortable(arr: any[], seen: Seen): string[] {
  const out: string[] = [];
  for (const node of arr ?? []) {
    if (!node || typeof node !== "object") continue;
    switch (node._type) {
      case "block": {
        const md = renderBlock(node);
        if (md && !dup(md, seen)) out.push(md);
        break;
      }
      case "contentTable": {
        const md = renderTable(node);
        if (md) out.push(md);
        break;
      }
      case "note": {
        const inner = renderPortable(node.text ?? [], seen)
          .map((l) => `> ${l.replace(/^> /, "")}`)
          .join("\n");
        if (inner.trim()) out.push(inner);
        break;
      }
      case "customList": {
        for (const it of node.items ?? []) {
          const line = [it.title ? `**${it.title}**` : "", it.description ?? ""]
            .filter(Boolean)
            .join(" — ");
          if (line) out.push(`- ${line}`);
        }
        break;
      }
      case "textWithIcon":
        out.push(...renderPortable(node.text ?? [], seen));
        break;
      case "section":
        out.push(...renderPortable(node.content ?? [], seen));
        break;
      default:
        break; // spacer, images, etc.
    }
  }
  return out;
}

// --- Emit helpers -----------------------------------------------------------
function pushHeading(lines: string[], level: number, text: unknown): void {
  if (typeof text !== "string") return;
  const t = text.trim();
  if (!t || isLorem(t)) return;
  lines.push(`${"#".repeat(level)} ${t}`, "");
}

function pushParagraph(lines: string[], seen: Seen, text: unknown): void {
  if (typeof text !== "string") return;
  const t = text.trim();
  if (!t || isLorem(t)) return;
  if (dup(t, seen)) return;
  lines.push(t, "");
}

function pushBullets(lines: string[], seen: Seen, items: unknown): void {
  if (!Array.isArray(items)) return;
  const bullets: string[] = [];
  for (const item of items) {
    if (typeof item !== "string") continue;
    const t = item.trim();
    if (!t || isLorem(t)) continue;
    if (dup(t, seen)) continue;
    bullets.push(`- ${t}`);
  }
  if (bullets.length) lines.push(...bullets, "");
}

// Split a plain string into paragraphs, filtering lorem + duplicates.
function pushString(lines: string[], seen: Seen, str: unknown): void {
  if (typeof str !== "string") return;
  for (const p of String(str)
    .replace(/\\n/g, "\n")
    .split(/\n{2,}|\n/)
    .map((s) => s.trim())
    .filter(Boolean)) {
    pushParagraph(lines, seen, p);
  }
}

function pushPortable(lines: string[], seen: Seen, value: unknown): void {
  if (!Array.isArray(value)) return;
  const rendered = renderPortable(value, seen);
  if (rendered.length) lines.push(...rendered, "");
}

// --- Section-type renderers (verified against the shared schema) ------------

// faqs: askedQuestions[]{question, answer} (hidden variant_b),
// faqsWithCategory[]{category, askedQuestions[]} (hidden variant_a/variant_c).
function renderFaqPairs(lines: string[], seen: Seen, pairs: unknown): void {
  if (!Array.isArray(pairs)) return;
  for (const item of pairs) {
    if (!item || typeof item !== "object") continue;
    const { question, answer } = item as { question?: string; answer?: string };
    if (typeof question !== "string" || !question.trim() || isLorem(question)) continue;
    if (typeof answer !== "string" || !answer.trim() || isLorem(answer)) continue;
    const key = normKey(`${question}::${answer}`);
    if (seen.has(key)) continue;
    seen.add(key);
    lines.push(`**Q: ${question.trim()}**`, "");
    lines.push(answer.trim(), "");
  }
}

function renderFaqs(v: AnyObj, variant: string | undefined, lines: string[], seen: Seen): void {
  pushHeading(lines, 2, v.title);
  pushParagraph(lines, seen, v.subtitle);

  if (!hiddenFor(variant, ["variant_b"])) {
    renderFaqPairs(lines, seen, v.askedQuestions);
  }
  if (!hiddenFor(variant, ["variant_a", "variant_c"]) && Array.isArray(v.faqsWithCategory)) {
    for (const cat of v.faqsWithCategory) {
      if (!cat || typeof cat !== "object") continue;
      const c = cat as { category?: string; askedQuestions?: unknown };
      // Buffer first: a category whose questions are all lorem/duplicate would
      // otherwise leave a dangling heading with nothing under it.
      const buf: string[] = [];
      renderFaqPairs(buf, seen, c.askedQuestions);
      if (buf.length) {
        pushHeading(lines, 3, c.category);
        lines.push(...buf);
      }
    }
  }
}

// team: flat teams[]{name, jobTitle, plainText, mainImage.alt}.
// Section title/subtitle hidden variant_b; member jobTitle hidden variant_d;
// member plainText hidden variant_a/variant_c.
function renderTeam(v: AnyObj, variant: string | undefined, lines: string[], seen: Seen): void {
  if (!hiddenFor(variant, ["variant_b"])) {
    pushHeading(lines, 2, v.title);
    pushParagraph(lines, seen, v.subtitle);
  }
  if (!Array.isArray(v.teams)) return;
  for (const member of v.teams) {
    if (!member || typeof member !== "object") continue;
    const m = member as { name?: string; jobTitle?: string; plainText?: string };
    if (!m.name || isLorem(m.name)) continue;
    pushHeading(lines, 3, m.name);
    if (!hiddenFor(variant, ["variant_d"]) && m.jobTitle && !isLorem(m.jobTitle)) {
      lines.push(`*${m.jobTitle.trim()}*`, "");
    }
    if (!hiddenFor(variant, ["variant_a", "variant_c"])) {
      pushParagraph(lines, seen, m.plainText);
    }
  }
}

// testimonial: testimonials[]{name, jobTitle, testimony, rating, mainImage.alt}.
// title/subtitle hidden variant_a/variant_d; rating hidden variant_a/b/c.
function renderTestimonial(v: AnyObj, variant: string | undefined, lines: string[], seen: Seen): void {
  if (!hiddenFor(variant, ["variant_a", "variant_d"])) {
    pushHeading(lines, 2, v.title);
    pushParagraph(lines, seen, v.subtitle);
  }
  if (!Array.isArray(v.testimonials)) return;
  const showRating = !hiddenFor(variant, ["variant_a", "variant_b", "variant_c"]);
  for (const t of v.testimonials) {
    if (!t || typeof t !== "object") continue;
    const item = t as { name?: string; jobTitle?: string; testimony?: string; rating?: string };
    if (!item.testimony || isLorem(item.testimony)) continue;
    const key = normKey(item.testimony);
    if (seen.has(key)) continue;
    seen.add(key);
    lines.push(`> ${item.testimony.trim()}`, "");
    const byline = [item.name, item.jobTitle].filter((s) => s && !isLorem(s)).join(" — ");
    const ratingSuffix = showRating && item.rating ? ` (${item.rating}/5)` : "";
    if (byline) lines.push(`— ${byline}${ratingSuffix}`, "");
    else if (ratingSuffix) lines.push(`Rating: ${item.rating}/5`, "");
  }
}

// contact: title, contactDescription, officeInformation, contactEmail,
// contactNumber, socialLinks[]{socialMedia, socialMediaPlatform, socialMediaLink},
// block (portable, hidden variant_b). No scalar linkedIn field exists.
function renderContact(v: AnyObj, variant: string | undefined, lines: string[], seen: Seen): void {
  pushHeading(lines, 2, v.title);
  pushParagraph(lines, seen, v.contactDescription);

  const details: string[] = [];
  const add = (label: string, val: unknown) => {
    if (typeof val === "string" && val.trim() && !isLorem(val)) details.push(`${label}: ${val.trim()}`);
  };
  add("Office", v.officeInformation);
  add("Email", v.contactEmail);
  add("Phone", v.contactNumber);
  if (Array.isArray(v.socialLinks)) {
    for (const s of v.socialLinks) {
      if (!s || typeof s !== "object") continue;
      const link = (s as AnyObj).socialMediaLink;
      if (typeof link !== "string" || !link.trim() || isLorem(link)) continue;
      const kind = (s as AnyObj).socialMedia;
      const label =
        kind === "other" && (s as AnyObj).socialMediaPlatform
          ? String((s as AnyObj).socialMediaPlatform)
          : typeof kind === "string" && kind
            ? kind.charAt(0).toUpperCase() + kind.slice(1)
            : "Link";
      details.push(`${label}: ${link.trim()}`);
    }
  }
  if (details.length) lines.push(...details.map((d) => `- ${d}`), "");

  if (!hiddenFor(variant, ["variant_b"])) pushPortable(lines, seen, v.block);
}

// pricing: plans[]{planType, price|monthlyPrice|yearlyPrice, description,
// planIncludes[]}. Prices are strings (incl. "Free"). banner[]{title} + block
// are also content-bearing.
function renderPricing(v: AnyObj, lines: string[], seen: Seen): void {
  pushHeading(lines, 2, v.title);
  pushParagraph(lines, seen, v.subtitle);
  pushString(lines, seen, v.description);

  if (typeof v.monthlyBilling === "string" && v.monthlyBilling.trim() && !isLorem(v.monthlyBilling))
    lines.push(`Monthly billing: ${v.monthlyBilling.trim()}`, "");
  if (typeof v.annualBilling === "string" && v.annualBilling.trim() && !isLorem(v.annualBilling))
    lines.push(`Annual billing: ${v.annualBilling.trim()}`, "");

  if (Array.isArray(v.banner)) {
    for (const b of v.banner) {
      if (b && typeof b === "object") pushHeading(lines, 3, (b as AnyObj).title);
    }
  }

  if (Array.isArray(v.plans)) {
    for (const plan of v.plans) {
      if (!plan || typeof plan !== "object") continue;
      const p = plan as {
        planType?: string;
        price?: string;
        monthlyPrice?: string;
        yearlyPrice?: string;
        description?: string;
        planIncludes?: string[];
      };
      if (!p.planType || isLorem(p.planType)) continue;
      pushHeading(lines, 3, p.planType);
      const price = p.price || p.monthlyPrice || p.yearlyPrice;
      if (typeof price === "string" && price.trim()) lines.push(`Price: ${price.trim()}`, "");
      // Comparative tiers legitimately repeat the same description / feature
      // lines (e.g. "24/7 support" in every plan). Dedup WITHIN a plan only —
      // a fresh scope per plan — so the page-wide `seen` doesn't strip a later
      // plan's shared features and misrepresent the comparison.
      const planSeen: Seen = new Set();
      pushString(lines, planSeen, p.description);
      pushBullets(lines, planSeen, p.planIncludes);
    }
  }

  pushPortable(lines, seen, v.block);
}

// portfolio: portfoliosWithCategories[]{category, content[]{title,subtitle,description}}
// (hidden variant_b/variant_c); portfolios[]{title} (hidden variant_a/variant_d).
function renderPortfolioItems(lines: string[], seen: Seen, items: unknown): void {
  if (!Array.isArray(items)) return;
  for (const item of items) {
    if (!item || typeof item !== "object") continue;
    const it = item as { title?: string; subtitle?: string; description?: string };
    pushHeading(lines, 4, it.title);
    pushParagraph(lines, seen, it.subtitle);
    pushParagraph(lines, seen, it.description);
  }
}

function renderPortfolio(v: AnyObj, variant: string | undefined, lines: string[], seen: Seen): void {
  pushHeading(lines, 2, v.title);
  pushParagraph(lines, seen, v.subtitle);

  if (!hiddenFor(variant, ["variant_b", "variant_c"]) && Array.isArray(v.portfoliosWithCategories)) {
    for (const cat of v.portfoliosWithCategories) {
      if (!cat || typeof cat !== "object") continue;
      const c = cat as { category?: string; content?: unknown };
      const buf: string[] = [];
      renderPortfolioItems(buf, seen, c.content);
      if (buf.length) {
        pushHeading(lines, 3, c.category);
        lines.push(...buf);
      }
    }
  }
  if (!hiddenFor(variant, ["variant_a", "variant_d"])) {
    renderPortfolioItems(lines, seen, v.portfolios);
  }
}

// --- Generic helpers (broad field coverage for all other section types) -----
function renderImageTitleText(items: any[], seen: Seen): string[] {
  const out: string[] = [];
  for (const it of items ?? []) {
    if (!it || typeof it !== "object") continue;
    const desc: string = it.description ?? "";
    const stat = typeof desc === "string" && desc.match(/^#stat:(.+?)\|(.+)$/);
    if (stat) {
      out.push(`- **${stat[1].trim()}** — ${stat[2].trim()}`);
      continue;
    }
    const body = it.plainText ?? desc ?? "";
    if (it.title && body && !isLorem(String(body)))
      out.push(`- **${it.title}** — ${String(body).replace(/\n+/g, " ")}`);
    else if (body && !isLorem(String(body))) out.push(`- ${String(body).replace(/\n+/g, " ")}`);
    else if (it.title && !isLorem(it.title)) out.push(`- **${it.title}**`);
  }
  return out;
}

function resolveItemBody(it: AnyObj, seen: Seen): string {
  for (const key of ["plainText", "description", "body", "text"]) {
    const val = it[key];
    if (!val) continue;
    if (typeof val === "string") return val;
    if (Array.isArray(val)) {
      const rendered = renderPortable(val, seen).join(" ").replace(/\n+/g, " ").trim();
      if (rendered) return rendered;
    }
  }
  return "";
}

function renderItemArray(items: any[], seen: Seen): string[] {
  const out: string[] = [];
  for (const it of items ?? []) {
    if (!it || typeof it !== "object") continue;
    const heading = it.title ?? it.name ?? it.heading ?? "";
    const body = resolveItemBody(it, seen);
    const subtitle = it.subtitle ?? "";

    if (heading && body && !isLorem(String(heading))) {
      const line = `**${heading}** — ${body.replace(/\n+/g, " ")}`;
      if (!dup(line, seen)) out.push(`- ${line}`);
    } else if (heading && !isLorem(String(heading))) {
      if (!dup(`- **${heading}**`, seen)) out.push(`- **${heading}**`);
    } else if (body) {
      const line = body.replace(/\n+/g, " ");
      if (!dup(line, seen)) out.push(`- ${line}`);
    }
    if (subtitle && typeof subtitle === "string" && !isLorem(subtitle) && !dup(subtitle, seen))
      out.push(`  ${subtitle}`);

    if (Array.isArray(it.items)) out.push(...renderItemArray(it.items, seen));
    if (Array.isArray(it.features)) out.push(...renderItemArray(it.features, seen));
  }
  return out;
}

function renderStatItems(lines: string[], seen: Seen, items: unknown): void {
  if (!Array.isArray(items)) return;
  const bullets: string[] = [];
  for (const item of items) {
    if (!item || typeof item !== "object") continue;
    const { label, value } = item as { label?: string; value?: string };
    if (!label || isLorem(label)) continue;
    const key = normKey(`${label}::${value || ""}`);
    if (seen.has(key)) continue;
    seen.add(key);
    bullets.push(value ? `- ${label}: ${value}` : `- ${label}`);
  }
  if (bullets.length) lines.push(...bullets, "");
}

// The catch-all renderer for section types without a dedicated handler
// (header, callToAction, features, howItWorks, textComponent, ...).
function renderGenericSection(sec: DereferencedSection, lines: string[], seen: Seen): void {
  const v: AnyObj = sec.variants ?? {};
  const variant = sec.variant;
  const numbered = typeof v.subtitle === "string" && /^\d+$/.test(v.subtitle.trim());

  if (sec._type === "header") {
    if (typeof v.subtitle === "string" && v.subtitle.trim() && !isLorem(v.subtitle))
      lines.push(`_${v.subtitle.trim()}_`, "");
    pushString(lines, seen, v.description);
    return;
  }

  if (sec._type === "callToAction") {
    pushHeading(lines, 2, v.title);
    pushString(lines, seen, v.plainText);
    pushPortable(lines, seen, v.firstColumn);
    const btn = v.primaryButton;
    if (btn?.label && btn?.linkExternal) lines.push(`[${btn.label}](${btn.linkExternal})`, "");
    return;
  }

  const title = (typeof v.title === "string" && v.title) || sec.label || "";
  if (title && !isLorem(String(title))) {
    lines.push(numbered ? `## ${v.subtitle}. ${title}` : `## ${title}`, "");
  }
  pushString(lines, seen, v.description);

  // textComponent columns: firstColumn always; secondColumn hidden variant_a;
  // thirdColumn hidden variant_a/variant_b.
  pushPortable(lines, seen, v.firstColumn);
  if (!hiddenFor(variant, ["variant_a"])) pushPortable(lines, seen, v.secondColumn);
  if (!hiddenFor(variant, ["variant_a", "variant_b"])) pushPortable(lines, seen, v.thirdColumn);

  pushString(lines, seen, v.plainText);
  if (typeof v.featuresTitle === "string" && v.featuresTitle.trim())
    pushHeading(lines, 3, v.featuresTitle);

  renderStatItems(lines, seen, v.statItems);

  // arrayOfTitleAndText[]{title, plainText} — buffer body so an item whose
  // plainText is lorem/dup doesn't leave a dangling heading.
  if (Array.isArray(v.arrayOfTitleAndText)) {
    for (const it of v.arrayOfTitleAndText) {
      if (!it || typeof it !== "object") continue;
      const buf: string[] = [];
      pushParagraph(buf, seen, (it as AnyObj).plainText);
      if (buf.length) {
        pushHeading(lines, 3, (it as AnyObj).title);
        lines.push(...buf);
      }
    }
  }

  const imgTitleText = renderImageTitleText(v.arrayOfImageTitleAndText, seen);
  if (imgTitleText.length) lines.push(...imgTitleText, "");

  // featuredItems[]{subtitle, title, description} — buffer body first.
  if (Array.isArray(v.featuredItems)) {
    for (const it of v.featuredItems) {
      if (!it || typeof it !== "object") continue;
      const fi = it as AnyObj;
      const buf: string[] = [];
      pushParagraph(buf, seen, fi.subtitle);
      pushParagraph(buf, seen, fi.description);
      if (buf.length) {
        pushHeading(lines, 3, fi.title);
        lines.push(...buf);
      }
    }
  }

  if (v.pillarItems?.items?.length) {
    pushHeading(lines, 3, v.pillarItems.title);
    const pil = renderImageTitleText(v.pillarItems.items, seen);
    if (pil.length) lines.push(...pil, "");
  }

  if (v.valueEquation) {
    const ve = v.valueEquation;
    pushHeading(lines, 3, ve.title);
    if (ve.value && ve.numerator && ve.denominator)
      lines.push(`**${ve.value} = ${String(ve.numerator).trim()} / ${String(ve.denominator).trim()}**`, "");
    pushString(lines, seen, ve.description);
  }

  if (Array.isArray(v.arrayOfDurationTitleAndText)) {
    for (const ph of v.arrayOfDurationTitleAndText) {
      if (!ph || typeof ph !== "object") continue;
      const head = [(ph as AnyObj).duration, (ph as AnyObj).title].filter(Boolean).join(" — ");
      if (head) pushHeading(lines, 3, head);
      pushString(lines, seen, (ph as AnyObj).plainText);
    }
  }

  pushPortable(lines, seen, v.bottomContent);
  pushPortable(lines, seen, v.contentSections);
  pushPortable(lines, seen, v.note);
  pushPortable(lines, seen, v.contentLabel);

  for (const fieldName of [
    "cards", "items", "features", "columns", "pillars",
    "forgeItems", "steps", "tiers", "deliveryModels",
    "caseStudies", "plans", "industries",
    "featuresVariantI", "featuresVariantJ", "featuresVariantQ",
    "arrayOfImageAndBlock",
  ]) {
    if (Array.isArray(v[fieldName])) {
      const rendered = renderItemArray(v[fieldName], seen);
      if (rendered.length) lines.push(...rendered, "");
    }
  }

  if (Array.isArray(v.tabs)) {
    for (const tab of v.tabs) {
      if (!tab || typeof tab !== "object") continue;
      pushHeading(lines, 2, (tab as AnyObj).title);
      pushString(lines, seen, (tab as AnyObj).description);
      if (Array.isArray((tab as AnyObj).items)) {
        const rendered = renderItemArray((tab as AnyObj).items, seen);
        if (rendered.length) lines.push(...rendered, "");
      }
    }
  }

  pushBullets(lines, seen, v.tags);
  pushBullets(lines, seen, v.arrayOfText);
}

function renderSection(sec: DereferencedSection, lines: string[], seen: Seen): void {
  const v: AnyObj = sec.variants ?? {};
  const variant = sec.variant;
  switch (sec._type) {
    case "faqs":
      renderFaqs(v, variant, lines, seen);
      break;
    case "team":
      renderTeam(v, variant, lines, seen);
      break;
    case "testimonial":
      renderTestimonial(v, variant, lines, seen);
      break;
    case "contact":
      renderContact(v, variant, lines, seen);
      break;
    case "pricing":
      renderPricing(v, lines, seen);
      break;
    case "portfolio":
      renderPortfolio(v, variant, lines, seen);
      break;
    default:
      renderGenericSection(sec, lines, seen);
      break;
  }
}

/** Convert an array of dereferenced page-builder sections into markdown. */
export function sectionsToMarkdown(sections: DereferencedSection[]): string {
  if (!Array.isArray(sections)) return "";
  const lines: string[] = [];
  const seen: Seen = new Set();
  for (const section of sections) {
    if (!section || typeof section !== "object" || !section._type) continue;
    if (SKIP_SECTION_TYPES.has(section._type)) continue;
    // Render into a per-section buffer, then keep it only if it produced real
    // body content (at least one non-heading, non-blank line). A section that
    // yields only a title — everything else lorem/hidden/empty — is dropped
    // rather than emitting a dangling heading. (seen mutations from a dropped
    // title-only section are nil: only paragraphs/bullets touch `seen`.)
    const sectionLines: string[] = [];
    renderSection(section, sectionLines, seen);
    if (sectionLines.some((l) => l.trim() && !/^#{1,6}\s/.test(l))) {
      lines.push(...sectionLines);
    }
  }
  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

/** First real prose line of converted sections — used as a summary fallback. */
export function firstSectionParagraph(sections: DereferencedSection[]): string {
  const md = sectionsToMarkdown(sections);
  for (const line of md.split("\n")) {
    const t = line.trim();
    if (!t || /^(\d+\.\s|[#>|\-*])/.test(t)) continue; // skip headings, quotes, tables, bullets, numbered lists
    if (/^_.*_$/.test(t)) continue; // italic kicker line, not prose
    const plain = t.replace(/\*\*|__|[*_`]/g, "").trim();
    if (!plain) continue;
    return plain.length > 200 ? plain.slice(0, 197) + "..." : plain;
  }
  return "";
}
