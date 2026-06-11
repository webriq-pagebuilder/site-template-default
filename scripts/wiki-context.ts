import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

function scoreOverlap(slug: string, filename: string): number {
  const slugWords = new Set(
    slug
      .toLowerCase()
      .split(/[-_\s]+/)
      .filter(Boolean),
  );
  const fileWords = filename
    .toLowerCase()
    .replace(/\.md$/, "")
    .split(/[-_\s]+/)
    .filter(Boolean);
  return fileWords.filter((w) => slugWords.has(w)).length;
}

async function extractSummary(filePath: string): Promise<string> {
  const raw = await readFile(filePath, "utf-8");
  const withoutFrontmatter = raw.replace(/^---[\s\S]*?---\n?/, "").trim();
  const firstLine =
    withoutFrontmatter.split("\n").find((l) => l.trim().length > 0) ?? "";
  return firstLine.replace(/^#+\s*/, "").trim();
}

export async function getWikiContext(
  slug: string,
  wikiDir: string,
): Promise<string> {
  let files: string[];
  try {
    const entries = await readdir(wikiDir);
    files = entries.filter((f) => f.endsWith(".md"));
  } catch {
    return "";
  }

  if (files.length === 0) return "";

  const scored = files
    .map((f) => ({ file: f, score: scoreOverlap(slug, f) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const summaries: string[] = [];
  for (const { file } of scored) {
    try {
      const summary = await extractSummary(path.join(wikiDir, file));
      if (summary) summaries.push(`- ${file.replace(/\.md$/, "")}: ${summary}`);
    } catch {
      // skip unreadable files
    }
  }

  return summaries.length > 0 ? summaries.join("\n") : "";
}
