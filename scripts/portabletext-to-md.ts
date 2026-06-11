type MarkDef = {
  _key: string;
  _type: string;
  linkExternal?: string;
  linkInternal?: unknown;
  linkTarget?: string;
  [key: string]: unknown;
};

type Span = {
  _type?: string;
  text?: string;
  marks?: string[];
};

type Block = {
  _type?: string;
  style?: string;
  listItem?: string;
  children?: Span[];
  markDefs?: MarkDef[];
};

function applyMarks(span: Span, markDefs: MarkDef[]): string {
  if (!span || typeof span !== "object") return "";
  let text = typeof span.text === "string" ? span.text : "";
  if (!text) return "";
  const marks = Array.isArray(span.marks) ? span.marks : [];

  for (const mark of marks) {
    if (mark === "strong") {
      text = `**${text}**`;
    } else if (mark === "em") {
      text = `_${text}_`;
    } else if (mark === "code") {
      text = `\`${text}\``;
    } else {
      const def = markDefs.find((d) => d._key === mark);
      if (def && def._type === "link" && def.linkExternal) {
        text = `[${text}](${def.linkExternal})`;
      }
    }
  }

  return text;
}

function renderStyle(block: Block, text: string): string {
  const style = block.style ?? "normal";
  const listItem = block.listItem;

  if (listItem === "bullet") return `- ${text}`;
  if (listItem === "number") return `1. ${text}`;

  switch (style) {
    case "h1":
      return `# ${text}`;
    case "h2":
      return `## ${text}`;
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

export function blocksToMarkdown(blocks: unknown[]): string {
  if (!Array.isArray(blocks) || blocks.length === 0) return "";
  const out: string[] = [];

  for (const raw of blocks) {
    try {
      if (!raw || typeof raw !== "object") continue;
      const block = raw as Block;
      if (block._type !== "block") continue;

      const markDefs = Array.isArray(block.markDefs) ? block.markDefs : [];
      const children = Array.isArray(block.children) ? block.children : [];
      const text = children.map((span) => applyMarks(span, markDefs)).join("");
      const rendered = renderStyle(block, text);
      if (rendered.trim()) out.push(rendered);
    } catch {
      // skip malformed blocks silently
    }
  }

  return out.join("\n\n").trim();
}

export function firstParagraph(blocks: unknown[]): string {
  if (!Array.isArray(blocks)) return "";

  for (const raw of blocks) {
    try {
      if (!raw || typeof raw !== "object") continue;
      const block = raw as Block;
      if (block._type !== "block") continue;
      if (block.listItem) continue;

      const markDefs = Array.isArray(block.markDefs) ? block.markDefs : [];
      const children = Array.isArray(block.children) ? block.children : [];
      const text = children
        .map((span) => applyMarks(span, markDefs))
        .join("")
        .trim();
      if (!text) continue;

      return text.length > 200 ? text.slice(0, 197) + "..." : text;
    } catch {
      continue;
    }
  }

  return "";
}
