# Feature: Stored `schemaMarkup` + Improved `application/ld+json`

Added in T-004.

## How It Works

All non-agent pages run through `addSEOJsonLd()` in `components/SEO.tsx`. The function now checks `pageData.schemaMarkup` first, before any type-based schema generation:

```
getStaticProps
  → addSEOJsonLd({ type, seo, pageData, ... })
      ↓
      1. pageData.schemaMarkup present?
         YES → parse + emit via stringify() (XSS-safe) → done
         NO  ↓
      2. type === "post"
         → BlogJsonLd({ ..., faqItems })
             ↓
             faqItems present?
             YES → @graph: [BlogPosting, FAQPage]
             NO  → single BlogPosting (existing path)
      3. type === "mainProduct" → ProductJsonLd()
      4. default → PagesJsonLd()
```

## Sanity Fields

### `post` document

| Field              | Type                            | Hidden | Written By            |
| ------------------ | ------------------------------- | ------ | --------------------- |
| `schemaMarkup`     | text                            | ✓      | PublishForge Task 089 |
| `faqItems`         | array of `{ question, answer }` | ✓      | PublishForge Task 089 |
| `faqItemsSource`   | string                          | ✓      | PublishForge Task 089 |
| `citationAnchors`  | array of `{ url, label }`       | ✓      | PublishForge Task 089 |
| `aiVisibilityTags` | string[]                        | ✓      | PublishForge Task 089 |

### `page` document

| Field          | Type | Hidden | Written By                         |
| -------------- | ---- | ------ | ---------------------------------- |
| `schemaMarkup` | text | ✓      | Studio authors / future automation |

## Agent Pages

`/pages/agents/[slug].tsx` manages its own `<script type="application/ld+json">` independently. It does not use `addSEOJsonLd()` and is unaffected by this feature.

## Adding `schemaMarkup` to Other Document Types

1. Add `defineField({ name: "schemaMarkup", type: "text", hidden: true })` to the Sanity schema.
2. Add `schemaMarkup?: string | null` to the matching TypeScript interface in `types.ts`.
3. Done — `addSEOJsonLd()` already checks `pageData.schemaMarkup` for all types before dispatch.
