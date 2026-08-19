# Merge: `pages/[slug].tsx` (human page)

Wires the machine-only alternate link from each human page to its `/agents/`
twin. Four anchor points; the file varies per project, so locate each anchor
semantically — do not assume line numbers.

## Anchor 1 — import (top of file, with the other `lib/` imports)

```tsx
import { agentAlternatePath } from "lib/agents/agent-slugs";
```

## Anchor 2 — `getStaticProps` return

Inside the returned `props` object (alongside `data`, `defaultSeo`, …):

```tsx
agentAlternate: agentAlternatePath(
  typeof params.slug === "string" ? params.slug : params.slug?.[0]
),
```

`agentAlternatePath` returns `/agents/<slug>` when a twin exists, else `null` —
pages without a twin render exactly as before.

## Anchor 3 — thread the prop to the rendering component

Add `agentAlternate: string | null` to the page component's props type and pass
it down to whatever component renders the `<Head>` block (in the template this
is the `Document` component: destructure it in the page component's props and
include it in the spread/props passed to `Document`).

## Anchor 4 — `<Head>` element

Inside the published-page `<Head>` block, after the `<title>`:

```tsx
{/* Machine-only pointer to the AI-readable twin (/agents/<slug>).
    Head metadata, not a visible link. */}
{agentAlternate && (
  <link
    rel="alternate"
    type="text/markdown"
    href={agentAlternate}
    title="AI-readable version"
  />
)}
```

## Notes

- This is head metadata only — never render `agentAlternate` as a visible link
  in the page body or navigation.
- The middleware also emits the equivalent `Link:` HTTP header (RFC 8288) for
  these paths; the two are complementary and both expected.
- If the project renders blog posts through a different page file (e.g.
  `pages/blog/[slug].tsx` or similar), apply the same four anchors there too —
  any human page whose slug has an agent twin should carry the alternate link.

## Idempotency check

Already applied when this passes:

```bash
grep -q 'agentAlternatePath' 'pages/[slug].tsx'
```

## Changelog

- payload 1.0.0 — initial anchors.
