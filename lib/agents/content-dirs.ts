// Single source of truth for agent content directories.
// Sprint 2 will extend this list with "content/agents-products" for PIM-derived pages.
// Both the dynamic route (pages/agents/[slug].tsx) and the prebuild generators import this.

import path from "node:path";

export const AGENT_CONTENT_DIRS: readonly string[] = ["content/agents"];

export function resolveContentDirs(repoRoot: string = process.cwd()): string[] {
  return AGENT_CONTENT_DIRS.map((d) => path.join(repoRoot, d));
}
