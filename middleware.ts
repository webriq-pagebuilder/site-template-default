import {
  NextResponse,
  type NextRequest,
  type NextFetchEvent,
} from "next/server";

import agentsConfig from "./config/ai-agents.json";
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

const SESSION_COOKIE = "pf_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

// Static assets served from public/ at the root (e.g. /webriq-logo.png) that the
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

  const res = NextResponse.next();

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
    const { visitorType, agent } = classify(userAgent, referer, agents);

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
