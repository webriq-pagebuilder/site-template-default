# Merge: `.env.example`

Documents the StackShift I environment keys so future developers see them.
Create the file if it does not exist; otherwise append the block. Key names
only — NEVER write real values here or anywhere else.

```bash
# --- StackShift I: dual-track publishing + AI Traffic ---

# Canonical production URL, no trailing slash. Embedded into every llms.txt /
# sitemap-agents.xml entry; a wrong value sends crawlers to dead URLs.
NEXT_PUBLIC_SITE_URL=

# PublishForge AI-traffic ingest. Tracking and known-pages reporting are
# silently disabled while these are unset (safe no-op).
PF_TRACK_URL=
PF_TRACK_KEY=
# Optional: explicit known-pages endpoint (defaults to ${PF_TRACK_URL}/known-pages)
# PF_KNOWN_PAGES_URL=

# Studio-initiated publishing only — must end in /api/webhooks/stackshift-publish
# NEXT_PUBLIC_PUBLISHFORGE_WEBHOOK_URL=

# Backfill script (read-only Sanity access)
# NEXT_PUBLIC_SANITY_API_READ_TOKEN=

# Backfill --mode=enrich only
# ANTHROPIC_API_KEY=
```

## Notes

- `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET` are usually
  already documented by the template; only add them if missing.
- Values are set by the PM/Admin on the deploy platform (see the generated
  `docs/STACKSHIFT-I-HANDOFF.md`), not in this file.

## Idempotency check

Already applied when this passes:

```bash
grep -q 'PF_TRACK_URL' .env.example
```

## Changelog

- payload 1.0.0 — initial block.
