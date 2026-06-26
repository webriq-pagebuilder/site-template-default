# Pilot Go-Live Checklist — StackShift Site Side

Non-code operational items required for this StackShift site to go live with PublishForge as part of Sprint 1. These are **separate** from the code task `T-001` and depend on people / GitHub / Vercel UI actions, not on commits to this repo.

Source: the original Sprint 1 hand-off, §3.2 and §3.3 (StackShift-relevant items only); the full cross-repo spec is maintained in the PublishForge project. See `docs/HANDOVER.md` Part 3 for this repo's view of the integration.

## Owner

Site owner / deployment lead for this customer. The PublishForge team (Repository A) handles the corresponding PublishForge-side configuration; this checklist is what they need from us.

## Prerequisites

- [ ] Code task **T-001** is merged to `master` (agent route + build scripts deployed at least once).
- [ ] Vercel project for this site is healthy and deploying from `master`.

## Steps

### 1. Set the production `NEXT_PUBLIC_SITE_URL`

- Vercel Dashboard → this project → **Settings → Environment Variables**.
- If `NEXT_PUBLIC_SITE_URL` is not present under **Production**, add it with the canonical production URL (e.g. `https://www.example.com` — no trailing slash).
- If it's already set, confirm the value matches the customer's actual production domain.

**Why it matters.** Both `llms.txt` and `sitemap-agents.xml` embed this URL into every entry. Wrong value → AI crawlers hit dead URLs.

**Verification.** Trigger a new deployment, then `curl https://<site>/llms.txt` and confirm the listed URLs are absolute and correct.

### 2. Confirm Vercel build command is the default

- Vercel Dashboard → this project → **Settings → Build & Development Settings**.
- Build Command should be **empty (use default)** or explicitly `yarn build` / `npm run build`. Anything else (e.g. raw `next build`) bypasses the `prebuild` lifecycle hook and skips llms.txt + sitemap-agents.xml generation.

**Verification.** After deploy, `curl https://<site>/llms.txt` and `curl https://<site>/sitemap-agents.xml` should both return 200 with real content.

### 3. Install the PublishForge GitHub App on this repo

- Wait for the GitHub App to be registered by the PublishForge team (one-time global setup; not blocking on us).
- Once registered, the repo owner installs it via the App's installation URL, scoped to **this StackShift repo only**.
- Required permissions: `Contents: Read & write` (so PublishForge can commit `content/agents/*.md`).
- After install, copy the **installation ID** from the URL or GitHub Apps settings page and send it to the PublishForge team.

**Verification.** PublishForge team confirms they can authenticate against this repo's installation. You can also have them open a dummy test PR / commit to `content/agents/__test.md` and then delete it.

> **You are NOT blocked on this step for code verification.** Use `yarn seed:agents` + `yarn dev` / `yarn build` to validate the full agent rendering pipeline locally without any GitHub App (clean up afterwards with `yarn clean:agents`). See `docs/HANDOVER.md` Part 2.

### 4. Generate the Vercel deploy hook

- Vercel Dashboard → this project → **Settings → Git → Deploy Hooks**.
- Create a new hook named something like `publishforge-agent-publish`. Branch: `master` (or whichever branch PublishForge commits to).
- Copy the resulting hook URL — it contains a secret token, treat it as a credential.
- Send the hook URL to the PublishForge team for storage in their per-customer config.

**Verification.** PublishForge team can `curl -X POST <hookUrl>` and observe a fresh deployment kicking off in Vercel.

### 5. Smoke test end-to-end (after all above + PublishForge side is wired)

- PublishForge team triggers a publish of a single piece of pilot content.
- Observe in this repo: a new commit appears on `master` adding `content/agents/<slug>.md`.
- Observe in Vercel: a new deployment kicks off automatically.
- After deploy completes, visit `https://<site>/agents/<slug>` and confirm:
  - Page renders (it will look bare — that's correct; it's AI-targeted).
  - View source shows `<script type="application/ld+json">`.
  - `https://<site>/llms.txt` lists the new entry.
  - `https://<site>/sitemap-agents.xml` lists the new URL.

## What is explicitly NOT on this checklist

- WIKI compile worker deployment (PublishForge side, Component C).
- Supabase migrations (PublishForge side).
- WIKI compiler prompt / agent transformation prompt seeding (PublishForge side).
- Any per-customer Sanity changes (agent layer is independent of Sanity).
- Sitemap-index combining the Sanity sitemap with the agent sitemap — deferred to Sprint 2. (`robots.txt` itself is already generated at build time by `scripts/generate-robots-txt.ts` and declares both sitemaps — no manual step needed.)

## Status

| Step                                  | Status | Notes                                                      |
| ------------------------------------- | ------ | ---------------------------------------------------------- |
| 1. NEXT_PUBLIC_SITE_URL set in Vercel | ☐ todo |                                                            |
| 2. Vercel build command default       | ☐ todo |                                                            |
| 3. GitHub App installed               | ☐ todo | Blocked on PublishForge team registering the App globally. |
| 4. Vercel deploy hook generated       | ☐ todo |                                                            |
| 5. End-to-end smoke test              | ☐ todo | Depends on 1–4 + PublishForge readiness.                   |
