# Merge: `studio/config.ts` (optional — Studio publish path)

Only applied when the project publishes from Sanity Studio. Adds the
PublishForge webhook constant that the Studio publish actions read.

Append to the end of the file, alongside the other exported constants:

```ts
// PublishForge webhook — triggers agent content generation on blog publish
export const PUBLISHFORGE_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_PUBLISHFORGE_WEBHOOK_URL;
```

## Notes

- The env value must point at PublishForge's `/api/webhooks/stackshift-publish`
  route. Older environments sometimes carry a URL ending in
  `/api/webhooks/sanity-update` — that route does not exist (404) and Studio
  publishes will silently produce no agent article. Check the deployed env AND
  local `.env*` files.
- The shared secret goes in as `?token=` on the URL or the
  `x-publishforge-webhook-secret` header — configured by the PM/Admin, never
  hardcoded.

## Idempotency check

Already applied when this passes:

```bash
grep -q 'PUBLISHFORGE_WEBHOOK_URL' studio/config.ts
```

## Changelog

- payload 1.0.0 — initial snippet.
