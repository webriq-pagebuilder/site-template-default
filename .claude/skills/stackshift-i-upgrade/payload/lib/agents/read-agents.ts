import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { resolveContentDirs } from "./content-dirs";

export interface AgentFrontmatter {
  title: string;
  slug?: string;
  summary: string;
  generated_at?: string;
  taxonomy?: string;
  faq?: { question: string; answer: string }[];
  [key: string]: unknown;
}

export interface AgentFileRef {
  slug: string;
  absPath: string;
  dir: string;
}

export interface AgentDocument {
  frontmatter: AgentFrontmatter;
  bodyHtml: string;
}

async function listMarkdownFiles(absDir: string): Promise<string[]> {
  try {
    const entries = await readdir(absDir);
    return entries.filter((f) => f.endsWith(".md"));
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

export async function listAgentFiles(): Promise<AgentFileRef[]> {
  const dirs = resolveContentDirs();
  const refs: AgentFileRef[] = [];
  const seen = new Map<string, string>();

  for (const dir of dirs) {
    const files = await listMarkdownFiles(dir);
    for (const file of files) {
      const slug = file.replace(/\.md$/, "");
      if (seen.has(slug)) {
        throw new Error(
          `Duplicate agent slug "${slug}" found in both ${seen.get(
            slug,
          )} and ${dir}. ` +
            `Slugs must be unique across all AGENT_CONTENT_DIRS.`,
        );
      }
      seen.set(slug, dir);
      refs.push({ slug, absPath: path.join(dir, file), dir });
    }
  }

  return refs;
}

export async function readAgentBySlug(
  slug: string,
): Promise<AgentDocument | null> {
  const refs = await listAgentFiles();
  const ref = refs.find((r) => r.slug === slug);
  if (!ref) return null;

  const raw = await readFile(ref.absPath, "utf-8");
  const { data, content } = matter(raw);
  // gray-matter parses ISO date strings into JS Date objects, which Next.js
  // getStaticProps refuses to serialize. Round-trip through JSON to normalize
  // Date → ISO string while preserving all other shapes.
  const frontmatter = JSON.parse(JSON.stringify(data)) as AgentFrontmatter;

  if (!frontmatter.title || !frontmatter.summary) {
    throw new Error(
      `Agent file ${ref.absPath} is missing required frontmatter fields (title, summary).`,
    );
  }

  const bodyHtml = marked.parse(content, { async: false }) as string;
  return { frontmatter, bodyHtml };
}
