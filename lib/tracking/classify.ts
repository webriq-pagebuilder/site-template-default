/**
 * AI traffic classification — pure logic, no edge/runtime globals.
 *
 * Sprint 2 (AI Traffic Visibility): classify each request as an AI crawler,
 * an AI-referred human, or an ordinary human, and derive the agent label.
 * Kept free of `next/server` and request objects so it is unit-testable in a
 * plain runner. The match list itself lives in `config/ai-agents.json`.
 */

export type VisitorType = "ai_crawler" | "ai_user" | "human";
export type Agent = "ChatGPT" | "Claude" | "Perplexity" | "Gemini" | "Other";

interface CrawlerRule {
  agent: Agent;
  ua: string[];
}

interface ReferrerRule {
  agent: Agent;
  hosts: string[];
}

export interface AgentConfig {
  crawlers: CrawlerRule[];
  referrers: ReferrerRule[];
}

export interface Classification {
  visitorType: VisitorType;
  agent: Agent;
}

/**
 * Classify a request in priority order: ai_crawler (UA) → ai_user (referer
 * host) → human. First match wins, so a request that is both a known crawler
 * UA and carries an AI referer is classified ai_crawler.
 */
export function classify(
  userAgent: string,
  referer: string | null,
  config: AgentConfig,
): Classification {
  // 1. ai_crawler — case-insensitive UA substring match.
  const ua = userAgent.toLowerCase();
  for (const rule of config.crawlers) {
    if (rule.ua.some((pattern) => ua.includes(pattern.toLowerCase()))) {
      return { visitorType: "ai_crawler", agent: rule.agent };
    }
  }

  // 2. ai_user — referer host equals or is a sub-domain of a configured host.
  const host = refererHostname(referer);
  if (host) {
    for (const rule of config.referrers) {
      if (rule.hosts.some((h) => host === h || host.endsWith(`.${h}`))) {
        return { visitorType: "ai_user", agent: rule.agent };
      }
    }
  }

  // 3. human — everything else.
  return { visitorType: "human", agent: "Other" };
}

/**
 * PII-scrub a referer to host + path only — strips query string and fragment
 * (and any port). Returns null when absent or unparseable. Tokens/emails in
 * query params must never leave the edge.
 */
export function scrubReferrer(referer: string | null): string | null {
  if (!referer) return null;
  try {
    const url = new URL(referer);
    return `${url.hostname}${url.pathname}`;
  } catch {
    return null;
  }
}

function refererHostname(referer: string | null): string | null {
  if (!referer) return null;
  try {
    return new URL(referer).hostname.toLowerCase();
  } catch {
    return null;
  }
}
