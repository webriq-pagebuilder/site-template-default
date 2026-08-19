import {
  NextResponse,
  type NextRequest,
  type NextFetchEvent,
} from "next/server";

import agentsConfig from "./config/ai-agents.json";
import { hasAgentTwin } from "./lib/agents/agent-slugs";
import {
  classify,
  scrubReferrer,
  type AgentConfig,
} from "./lib/tracking/classify";

/**
 * Sprint 2 — AI Traffic Visibility edge middleware.
 *
 * Classifies every matched request (ai_crawler / ai_user / human) and fires a
 * non-blocking tracking event to PublishForge. The write is fire-and-forget via
 * `event.waitUntil()` — it never blocks or fails the response, and all errors
 * are swallowed. No attribution logic is built on `session_token` this sprint:
 * it is captured and forwarded only (forward-prep for a future sprint).
 *
 * Downstream (ingestion, bot_verified, aggregation, scoring, dashboard) lives in
 * PublishForge — see docs/HANDOVER_sprint_2.md. The match list is editable
 * config in config/ai-agents.json, not hardcoded here.
 */

// JSON imports widen string literals, so re-type the config to the union shape.
const agents = agentsConfig as AgentConfig;

// Agent-slug lookups (markdown Accept negotiation + alternate Link header) go
// through lib/agents/agent-slugs.ts — the same prebuild-manifest helper the
// page templates use, so the two surfaces can never drift.

const SESSION_COOKIE = "pf_session";

/** Percent-decode a path segment, falling back to the raw value on bad input. */
function safeDecode(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}
const SESSION_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

// Static assets served from public/ at the root (e.g. /site-logo.png) that the
// path-prefix matcher cannot exclude by name. Tracked content routes never end
// in these extensions. Skipping them avoids naive per-asset POSTs and, crucially,
// avoids a Set-Cookie on cacheable asset responses.
const STATIC_ASSET =
  /\.(?:png|jpe?g|gif|svg|webp|avif|ico|js|mjs|css|map|woff2?|ttf|eot|txt|xml|json|pdf|mp4|webm|wasm)$/i;

export function middleware(req: NextRequest, event: NextFetchEvent) {
  const { pathname } = req.nextUrl;

  // Static assets: pass through untouched — no tracking, no cookie.
  if (STATIC_ASSET.test(pathname)) {
    return NextResponse.next();
  }

  // Markdown Accept negotiation (agent convention): /agents/<slug> requested
  // with `Accept: text/markdown` is rewritten to the raw-markdown API route.
  // The public URL never changes; tracking below still runs on this pass.
  const accept = req.headers.get("accept") ?? "";
  const wantsMarkdown = accept.includes("text/markdown");
  const agentSlug = pathname.startsWith("/agents/")
    ? safeDecode(pathname.slice("/agents/".length))
    : null;
  // True only when markdown is actually served (rewrite fires) — keeps the
  // dashboard's "markdown fetches" metric honest: index/404/other-prefix
  // requests carrying the header are not markdown-alternate usage.
  const markdownRequested =
    wantsMarkdown && agentSlug !== null && hasAgentTwin(agentSlug);

  let res: NextResponse;
  if (markdownRequested) {
    res = NextResponse.rewrite(new URL(`/api/agents-md/${agentSlug}`, req.url));
  } else {
    res = NextResponse.next();
  }

  // NOTE (verified on preview, 2026-07-14): Next.js reserves the Vary header
  // on PAGE responses — values set via next.config headers() or here in
  // middleware are both overwritten by the renderer's own router keys. The
  // markdown variant (pages/api/agents-md) sets Vary: Accept itself (API
  // routes keep header control), and Vercel's edge cache keys the two
  // variants by rewrite destination, so variant mixing can't occur there.
  // See docs/task/agents-discoverability.md for the residual-risk note.

  // Human twin (/<slug>) of an agent page: advertise the markdown alternate at
  // the HTTP layer too (RFC 8288), for agents that check headers without
  // parsing HTML. Complements the <link rel="alternate"> head element.
  const rootSlug = /^\/[^/]+$/.test(pathname)
    ? safeDecode(pathname.slice(1))
    : null;
  if (rootSlug && hasAgentTwin(rootSlug)) {
    res.headers.set(
      "Link",
      `</agents/${rootSlug}>; rel="alternate"; type="text/markdown"`,
    );
  }

  // session_token: reuse the existing first-party cookie, or mint an opaque one.
  let token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token) {
    token = crypto.randomUUID();
    res.cookies.set(SESSION_COOKIE, token, {
      path: "/",
      secure: true,
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE,
    });
  }

  // No-op until PublishForge ingestion is configured. Fire-and-forget otherwise.
  const trackUrl = process.env.PF_TRACK_URL;
  if (trackUrl) {
    const userAgent = req.headers.get("user-agent") ?? "";
    const referer = req.headers.get("referer");
    // utm_source fallback: some AI links carry a utm_source tag (e.g. ChatGPT's
    // ?utm_source=chatgpt.com) even with no Referer. Clicks with neither signal
    // (e.g. the Claude desktop app) can't be attributed and stay human.
    const utmSource = req.nextUrl.searchParams.get("utm_source");
    const { visitorType, agent } = classify(userAgent, referer, agents, utmSource);

    const payload = {
      page_url: pathname,
      visitor_type: visitorType,
      agent,
      client_ip:
        req.ip ??
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
        "",
      user_agent: userAgent,
      timestamp: new Date().toISOString(),
      referrer_url: scrubReferrer(referer),
      session_token: token,
      // Only sent for markdown-negotiated /agents/* fetches — the leading
      // indicator that agents are using the text/markdown alternate.
      ...(markdownRequested ? { markdown_requested: true } : {}),
    };

    event.waitUntil(
      fetch(trackUrl, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${process.env.PF_TRACK_KEY ?? ""}`,
        },
        body: JSON.stringify(payload),
      }).catch(() => {
        // Swallow — tracking must never block or fail the response.
      }),
    );
  }

  return res;
}

export const config = {
  matcher: [
    // All paths except: api, _next internals, embedded Sanity Studio, and named
    // SEO/discoverability files. Root-level static assets are excluded in-handler
    // (STATIC_ASSET) because a path-prefix matcher cannot catch them by name.
    "/((?!api|_next/static|_next/image|studio|favicon\\.ico|mockServiceWorker\\.js|robots\\.txt|sitemap\\.xml|sitemap-agents\\.xml|llms\\.txt|assets/).*)",
  ],
};
