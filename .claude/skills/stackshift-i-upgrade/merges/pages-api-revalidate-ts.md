# Merge: `pages/api/revalidate.ts` (optional — Studio publish path)

Forwards the Sanity webhook body to PublishForge for real-time content sync.
Only applied when the project publishes from Sanity Studio.

## Anchor

The template's revalidate handler parses the incoming Sanity webhook into a
`webhookBody` variable, computes the routes to revalidate, awaits them, and
returns a 200 JSON response. Insert the forwarding block **after revalidation
completes and before the success response**. Semantic anchors, not line
numbers — the file varies per project.

## Block to insert

```ts
// Forward webhook to PublishForge for real-time content sync (only for Sanity webhooks)
let publishForgeResult: {
  success?: boolean;
  status?: number;
  error?: string;
  [key: string]: any;
} | null = null;

if (webhookBody) {
  const publishForgeWebhookUrl =
    process.env.NEXT_PUBLIC_PUBLISHFORGE_WEBHOOK_URL;

  if (publishForgeWebhookUrl) {
    try {
      console.log(
        `📤 Forwarding webhook to PublishForge: ${publishForgeWebhookUrl}`
      );

      const forwardResponse = await fetch(publishForgeWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookBody),
      });

      if (forwardResponse.ok) {
        publishForgeResult = await forwardResponse.json();
        console.log(
          `✅ PublishForge webhook forwarded successfully:`,
          publishForgeResult
        );
      } else {
        const errorText = await forwardResponse.text();
        console.error(
          `❌ PublishForge webhook failed: ${forwardResponse.status} - ${errorText}`
        );
        publishForgeResult = {
          success: false,
          status: forwardResponse.status,
          error: errorText,
        };
      }
    } catch (forwardError) {
      console.error(`❌ Error forwarding to PublishForge:`, forwardError);
      publishForgeResult = {
        success: false,
        error: forwardError instanceof Error ? forwardError.message : String(forwardError),
      };
      // Don't fail the main revalidation if forwarding fails
    }
  } else {
    console.log(
      `⚠️ NEXT_PUBLIC_PUBLISHFORGE_WEBHOOK_URL not configured, skipping webhook forwarding`
    );
  }
}
```

Then include the result in the success response JSON:

```ts
return res.status(200).json({
  // ...existing fields (message, revalidated, routes, results)...
  publishForge: publishForgeResult,
});
```

## Notes

- If the handler has no `webhookBody` variable (older template revision),
  forward the parsed Sanity webhook payload — whatever variable holds the
  validated POST body; manual GET revalidations must NOT be forwarded.
- Forwarding is strictly best-effort: no failure path may fail the
  revalidation response.

## Idempotency check

Already applied when this passes:

```bash
grep -q 'publishForgeResult' pages/api/revalidate.ts
```

## Changelog

- payload 1.0.0 — initial block.
