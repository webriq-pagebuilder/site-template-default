// Converts Sanity page-builder sections into markdown.
//
// `page` documents store their content as an array of references to section
// documents (header, features, textComponent, howItWorks, callToAction, ...),
// each holding a `variants` object — NOT a portable-text `body` field. The
// agents backfill therefore produced empty bodies for every `taxonomy: page`
// file. This walker dereferences those section variants into clean markdown so
// the backfill can populate page bodies the same way it does post bodies.

type AnyObj = Record<string, any>;

export interface DereferencedSection {
  _type: string;
  label?: string;
  variants?: AnyObj;
}

const SKIP_SECTION_TYPES = new Set(["navigation", "footer"]);

// Placeholder copy seeded by the page builder; never real content.
const LOREM = /Etiam facilisis|Lorem ipsum|dolor sit amet|pellentesque augue/i;

function isLorem(text: string): boolean {
  return LOREM.test(text);
}

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

function dup(md: string, seen: Set<string>): boolean {
  const key = md.replace(/\s+/g, " ").trim().toLowerCase();
  if (!key) return false;
  if (seen.has(key)) return true;
  seen.add(key);
  return false;
}

function paragraphs(str: string, seen: Set<string>): string[] {
  return String(str)
    .replace(/\\n/g, "\n")
    .split(/\n{2,}|\n/)
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((p) => !isLorem(p))
    .filter((p) => !dup(p, seen));
}

// Mixed array of blocks / tables / notes / lists / nested sections.
function renderPortable(arr: any[], seen: Set<string>): string[] {
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
      case "section":
        out.push(...renderPortable(node.content ?? [], seen));
        break;
      default:
        break; // spacer, images, etc.
    }
  }
  return out;
}

function renderImageTitleText(items: any[]): string[] {
  const out: string[] = [];
  for (const it of items ?? []) {
    const desc: string = it.description ?? "";
    const stat = desc.match(/^#stat:(.+?)\|(.+)$/);
    if (stat) {
      out.push(`- **${stat[1].trim()}** — ${stat[2].trim()}`);
      continue;
    }
    const body = it.plainText ?? "";
    if (it.title && body)
      out.push(`- **${it.title}** — ${String(body).replace(/\n+/g, " ")}`);
    else if (body) out.push(`- ${String(body).replace(/\n+/g, " ")}`);
    else if (it.title) out.push(`- **${it.title}**`);
  }
  return out;
}

function renderSection(sec: DereferencedSection): string {
  const v: AnyObj = sec.variants ?? {};
  const seen = new Set<string>();
  const parts: string[] = [];
  const numbered =
    typeof v.subtitle === "string" && /^\d+$/.test(v.subtitle.trim());

  if (sec._type === "header") {
    if (v.subtitle) parts.push(`_${v.subtitle}_`);
    if (v.description) parts.push(...paragraphs(v.description, seen));
    return parts.filter(Boolean).join("\n\n");
  }

  if (sec._type === "callToAction") {
    if (v.title) parts.push(`## ${v.title}`);
    if (v.plainText) parts.push(...paragraphs(v.plainText, seen));
    if (Array.isArray(v.firstColumn))
      parts.push(...renderPortable(v.firstColumn, seen));
    const btn = v.primaryButton;
    if (btn?.label && btn?.linkExternal)
      parts.push(`[${btn.label}](${btn.linkExternal})`);
    return parts.filter(Boolean).join("\n\n");
  }

  const title = v.title ?? sec.label ?? "";
  if (title)
    parts.push(numbered ? `## ${v.subtitle}. ${title}` : `## ${title}`);
  if (v.description) parts.push(...paragraphs(v.description, seen));
  if (Array.isArray(v.firstColumn))
    parts.push(...renderPortable(v.firstColumn, seen));
  if (v.plainText) parts.push(...paragraphs(v.plainText, seen));
  if (v.featuresTitle) parts.push(`### ${v.featuresTitle}`);
  if (Array.isArray(v.arrayOfImageTitleAndText))
    parts.push(...renderImageTitleText(v.arrayOfImageTitleAndText));
  if (v.pillarItems?.items?.length) {
    if (v.pillarItems.title) parts.push(`### ${v.pillarItems.title}`);
    parts.push(...renderImageTitleText(v.pillarItems.items));
  }
  if (v.valueEquation) {
    const ve = v.valueEquation;
    if (ve.title) parts.push(`### ${ve.title}`);
    if (ve.value && ve.numerator && ve.denominator)
      parts.push(
        `**${ve.value} = ${String(ve.numerator).trim()} / ${String(
          ve.denominator,
        ).trim()}**`,
      );
    if (ve.description) parts.push(...paragraphs(ve.description, seen));
  }
  if (Array.isArray(v.arrayOfDurationTitleAndText)) {
    for (const ph of v.arrayOfDurationTitleAndText) {
      const head = [ph.duration, ph.title].filter(Boolean).join(" — ");
      if (head) parts.push(`### ${head}`);
      if (ph.plainText) parts.push(...paragraphs(ph.plainText, seen));
    }
  }
  if (Array.isArray(v.bottomContent))
    parts.push(...renderPortable(v.bottomContent, seen));
  if (Array.isArray(v.contentSections))
    parts.push(...renderPortable(v.contentSections, seen));
  if (Array.isArray(v.note)) parts.push(...renderPortable(v.note, seen));
  if (Array.isArray(v.contentLabel))
    parts.push(...renderPortable(v.contentLabel, seen));

  return parts.filter(Boolean).join("\n\n");
}

/** Convert an array of dereferenced page-builder sections into markdown. */
export function sectionsToMarkdown(sections: DereferencedSection[]): string {
  if (!Array.isArray(sections)) return "";
  return sections
    .filter((s) => s && !SKIP_SECTION_TYPES.has(s._type))
    .map(renderSection)
    .filter((s) => s.trim())
    .join("\n\n")
    .trim();
}

/** First real prose line of converted sections — used as a summary fallback. */
export function firstSectionParagraph(sections: DereferencedSection[]): string {
  const md = sectionsToMarkdown(sections);
  for (const line of md.split("\n")) {
    const t = line.trim();
    if (!t || /^[#>|\-*]/.test(t)) continue;
    if (/^_.*_$/.test(t)) continue; // italic kicker line, not prose
    const plain = t.replace(/\*\*|__|[*_`]/g, "").trim();
    if (!plain) continue;
    return plain.length > 200 ? plain.slice(0, 197) + "..." : plain;
  }
  return "";
}
