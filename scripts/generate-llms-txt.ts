import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { readFile } from "node:fs/promises";
import { loadEnvConfig } from "@next/env";
import matter from "gray-matter";

// Load .env / .env.local / .env.development.local with Next.js precedence so this
// prebuild script sees the same NEXT_PUBLIC_SITE_URL that `next build` would.
loadEnvConfig(process.cwd());

import { listAgentFiles } from "../lib/agents/read-agents";

const OUTPUT = path.join(process.cwd(), "public", "llms.txt");

function resolveSiteUrl(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL;
  if (!env) {
    console.warn(
      "[generate-llms-txt] NEXT_PUBLIC_SITE_URL not set — falling back to http://localhost:3000",
    );
    return "http://localhost:3000";
  }
  return env.replace(/\/$/, "");
}

async function main() {
  const siteUrl = resolveSiteUrl();
  const refs = await listAgentFiles();

  const entries = await Promise.all(
    refs.map(async (ref) => {
      const raw = await readFile(ref.absPath, "utf-8");
      const { data } = matter(raw);
      return {
        url: `${siteUrl}/agents/${ref.slug}`,
        title: typeof data.title === "string" ? data.title : ref.slug,
        summary: typeof data.summary === "string" ? data.summary : "",
      };
    }),
  );

  const lines = [
    `# ${siteUrl}`,
    "",
    "> AI-readable index of agent pages.",
    "",
    "## Pages",
    "",
    ...entries.map((e) => `- [${e.title}](${e.url}): ${e.summary}`),
  ];

  await mkdir(path.dirname(OUTPUT), { recursive: true });
  await writeFile(OUTPUT, lines.join("\n") + "\n", "utf-8");
  console.log(
    `[generate-llms-txt] wrote ${entries.length} entries → ${OUTPUT}`,
  );
}

main().catch((err) => {
  console.error("[generate-llms-txt] failed:", err);
  process.exit(1);
});
