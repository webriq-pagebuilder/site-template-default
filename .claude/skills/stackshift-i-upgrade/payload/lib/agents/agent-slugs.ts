import agentSlugs from "../../config/agent-slugs.json";

/**
 * Agent-twin lookup backed by the prebuild-generated manifest
 * (config/agent-slugs.json, written by scripts/generate-sitemap-agents.ts).
 *
 * A static JSON import (no fs) so it works everywhere: edge middleware,
 * ISR getStaticProps on serverless, and local dev. The committed copy is
 * refreshed on every `prebuild`, so it can never drift past one deploy.
 */
const AGENT_SLUG_SET = new Set<string>(agentSlugs as string[]);

export function hasAgentTwin(slug: string | null | undefined): boolean {
  return typeof slug === "string" && AGENT_SLUG_SET.has(slug);
}

/**
 * Returns the agent-twin path ("/agents/<slug>") for a human page slug, or
 * null when no twin exists. Used to emit the machine-only
 * `<link rel="alternate" type="text/markdown">` head element — never a
 * visible UI link (user decision, docs/task/agents-discoverability.md).
 */
export function agentAlternatePath(slug: string | null | undefined): string | null {
  return hasAgentTwin(slug) ? `/agents/${slug}` : null;
}
