# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Do not re-research the codebase before creating task documents. Use the knowledge in this file as the source of truth for project structure, conventions, and component inventory.**

---

## Project Overview

`site-template-default` is a Next.js 14 + Sanity 3 site template powering StackShift sites. It contains reusable section components with multiple variants per component, all configurable through Sanity Studio.

**Tech Stack:** Next.js 14, React 18, TypeScript, Sanity 3, TailwindCSS, `@stackshift-ui/*` packages, `@webriq-pagebuilder/sanity-plugin-schema-*` packages.

---

## Development Commands

```bash
yarn dev        # Start dev server
yarn build      # Build for production
yarn studio     # Start Sanity Studio
```

---

## Skill-Based Workflow

Every new feature or variant follows this chain:

```
/task  →  /implement  →  /test  →  /document  →  /ship
```

See [`CUSTOM_VARIANT_WORKFLOW.md`](./CUSTOM_VARIANT_WORKFLOW.md) for the full guide.

---

## Directory Structure

```
site-template-default/
├── components/
│   ├── list.tsx                    ← Component registry (all sections registered here)
│   ├── sections/                   ← Local component folders (one per section)
│   │   └── {name}/
│   │       ├── index.tsx           ← Variant router (switch on variant key)
│   │       ├── variant_a.tsx
│   │       └── variant_z.tsx       ← Custom variants go here
│   ├── page.tsx                    ← Renders page sections
│   ├── blog.tsx                    ← Renders blog sections
│   ├── SEO.tsx                     ← SEO head tags + JSON-LD
│   └── PreviewBanner.tsx
├── pages/
│   ├── index.tsx                   ← Homepage
│   ├── [slug].tsx                  ← Dynamic page/blog route
│   ├── 404.tsx
│   ├── studio/[[...index]].tsx     ← Embedded Sanity Studio
│   ├── cart/index.tsx
│   ├── products/[slug].tsx
│   ├── collections/[slug].tsx
│   ├── search/index.tsx
│   ├── wishlist/index.tsx
│   └── theme-page/index.tsx
├── schemas/
│   ├── schema.ts                   ← Main schema entry (has commented-out custom code)
│   ├── documents/
│   │   ├── pages.ts                ← Page document type
│   │   └── themePage.ts            ← Theme page document type
│   └── custom/                     ← Custom schema overrides (activate via schema.ts)
│       ├── index.ts                ← Imports all three plugin folders
│       ├── sanity-plugin-schema-default/src/schemas/sections/
│       │   ├── index.ts            ← Registers default component schemas
│       │   ├── common/fields.ts    ← Reusable field factory functions
│       │   └── {name}/
│       │       ├── {name}.ts       ← variantsList + rootSchema()
│       │       ├── schema/index.ts ← Fields with hideIfVariantIn()
│       │       └── initialValue/index.ts ← Default content values
│       ├── sanity-plugin-schema-blog/src/
│       │   ├── index.ts
│       │   └── schemas/            ← author, post, category, blogBlockContent
│       └── sanity-plugin-schema-commerce/src/schemas/sections/
│           ├── index.ts
│           └── featured_products/  ← Custom commerce schema example
├── studio/
│   ├── config.ts                   ← All env vars exported as constants
│   ├── utils/index.ts              ← mergeReplaceAndAdd(), EcommerceSchema[]
│   ├── deskStructure/              ← Sanity Studio desk layout
│   ├── documentActions/            ← Custom publish actions
│   └── components/previews/        ← SEO/a11y preview panels
├── hooks/
│   ├── index.ts
│   └── useMediaQuery.ts
├── utils/
│   ├── schemas.ts                  ← fetchDynamicComponentsData(), renameVariantKeys()
│   ├── seo/                        ← SEO helpers and JSON-LD generators
│   └── theme/index.ts
└── types/                          ← TypeScript type definitions
```

---

## Component Registry (`components/list.tsx`)

The `Components` object maps schema name → dynamic import. **A component key must exist here for Studio to detect it.**

### From `@stackshift-ui` packages (no local folder)

| Key in Components | Package                                                                       |
| ----------------- | ----------------------------------------------------------------------------- |
| `header`          | `@stackshift-ui/header` → `Header`                                            |
| `features`        | `@stackshift-ui/features` → `Features`                                        |
| `portfolio`       | `@stackshift-ui/portfolio` → `Portfolio`                                      |
| `blog`            | `@stackshift-ui/blog` → `Blog`                                                |
| `contact`         | `@stackshift-ui/contact` → `Contact`                                          |
| `testimonial`     | `@stackshift-ui/testimonial` → `Testimonial`                                  |
| `team`            | `@stackshift-ui/team` → `Team`                                                |
| `howItWorks`      | `@stackshift-ui/how-it-works` → `HowItWorks`                                  |
| `newsletter`      | `@stackshift-ui/newsletter` → `Newsletter`                                    |
| `faqs`            | `@stackshift-ui/faqs` → `Faqs`                                                |
| `callToAction`    | `@stackshift-ui/call-to-action` → `CallToAction`                              |
| `stats`           | `@stackshift-ui/statistics` → `Statistics`                                    |
| `cookies`         | `@stackshift-ui/cookies` → `Cookies` (excluded from dynamic rendering always) |
| `appPromo`        | `@stackshift-ui/app-promo` → `AppPromo`                                       |
| `logoCloud`       | `@stackshift-ui/logo-cloud` → `LogoCloud`                                     |
| `footer`          | `@stackshift-ui/footer` → `Footer`                                            |
| `signInSignUp`    | `@stackshift-ui/signin-signup` → `SigninSignup`                               |
| `textComponent`   | `@stackshift-ui/text-component` → `TextComponent`                             |

### Local components (`components/sections/`)

| Key in Components   | Local Folder                             | Variants                       |
| ------------------- | ---------------------------------------- | ------------------------------ |
| `navigation`        | `components/sections/navigation/`        | a, b, c, d, e (local), f, g, h |
| `pricing`           | `components/sections/pricing/`           | a, b, c, d                     |
| `cartSection`       | `components/sections/cart_section/`      | a                              |
| `featuredProducts`  | `components/sections/featured_products/` | a, b                           |
| `productInfo`       | `components/sections/product_info/`      | a, b                           |
| `wishlistSection`   | `components/sections/wishlist/`          | a                              |
| `pages_productInfo` | `components/sections/pages_productInfo/` | a, b                           |
| `allProducts`       | `components/sections/all_products/`      | a, b                           |
| `socialMediaFeed`   | `components/sections/social_media_feed/` | a, b                           |

> **Note (2024-12-04):** `socialMediaFeed` is hidden from Studio until Instagram integration is updated.

---

## Component Variant Pattern

### Variant Router (`index.tsx`)

```tsx
// components/sections/{name}/index.tsx
import dynamic from "next/dynamic";
import { SectionsProps } from "types";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
};

export interface MyComponentProps {
  title?: string;
  description?: string;
  // ... all props used across all variants
}

function MyComponent({ data }: SectionsProps) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];

  const props: MyComponentProps = {
    title: data?.variants?.title ?? undefined,
    description: data?.variants?.description ?? undefined,
  };

  return Variant ? <Variant {...props} /> : null;
}

export default MyComponent;
```

### Variant File

```tsx
// components/sections/{name}/variant_x.tsx
import React from "react";
import { MyComponentProps } from "."; // import from index.tsx

export default function VariantX({ title, description }: MyComponentProps) {
  return (
    <section>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
}
```

For `@stackshift-ui` components, import named exports from the package into the Variants map:

```tsx
import * as NavigationVariants from "@stackshift-ui/navigation";
const Variants = {
  variant_a: NavigationVariants.Navigation_A,
  variant_e: dynamic(() => import("./variant_e")), // local custom variant
};
```

---

## Schema Registration Chain

When adding/modifying a custom schema, follow all 7 steps:

| Step | File                                                       | Action                                                          |
| ---- | ---------------------------------------------------------- | --------------------------------------------------------------- |
| 1    | `components/sections/{name}/variant_{x}.tsx`               | Create variant React component                                  |
| 2    | `components/sections/{name}/index.tsx`                     | Add variant key to `Variants` map                               |
| 3    | `components/list.tsx`                                      | Register component (or switch `@stackshift-ui` import to local) |
| 4a   | `schemas/custom/.../sections/{name}/{name}.ts`             | Add entry to `variantsList`                                     |
| 4b   | `schemas/custom/.../sections/{name}/schema/index.ts`       | Define fields with `hideIfVariantIn()`                          |
| 4c   | `schemas/custom/.../sections/{name}/initialValue/index.ts` | Set default content values                                      |
| 5    | `schemas/custom/.../sections/index.ts`                     | Import and export the schema                                    |
| 6    | `schemas/custom/index.ts`                                  | Import plugin (only for new component categories)               |
| 7    | `schemas/schema.ts`                                        | Uncomment custom schema lines                                   |

### Schema Plugin Folders

- **Default components** → `schemas/custom/sanity-plugin-schema-default/src/schemas/sections/`
- **Commerce components** → `schemas/custom/sanity-plugin-schema-commerce/src/schemas/sections/`
- **Blog schemas** → `schemas/custom/sanity-plugin-schema-blog/src/schemas/`

### Currently registered custom schemas

- `schemas/custom/sanity-plugin-schema-default/src/schemas/sections/index.ts` → only `header`
- `schemas/custom/sanity-plugin-schema-commerce/src/schemas/sections/index.ts` → only `featuredProducts` (exported as `productInfo`)

### Activating Custom Schemas in `schemas/schema.ts`

The file ships with custom code commented out. Uncomment to activate:

```ts
// Lines 22-23: Uncomment these
import customSchema from "./custom";
const updatedSchemaArray = Object.values(customSchema);

const allSchemas = (() => {
  // Line 27: Comment this out
  // const mergedSchemas = mergeReplaceAndAdd(baseSchemas, commerceSchemaArray);

  // Line 30: Uncomment this
  const mergedSchemas = mergeReplaceAndAdd(baseSchemas, updatedSchemaArray);

  return mergedSchemas;
})();
```

---

## Schema Field Factories (`schemas/custom/.../common/fields.ts`)

These are reusable factory functions — call them to define schema fields. All accept an optional `hidden` parameter using `hideIfVariantIn()`.

| Function                | Sanity Type                  | Notes                            |
| ----------------------- | ---------------------------- | -------------------------------- |
| `title()`               | `string`                     |                                  |
| `subtitle()`            | `string`                     |                                  |
| `description()`         | `text`                       |                                  |
| `plainText()`           | `text`                       | Body content                     |
| `primaryButton()`       | `conditionalLink`            |                                  |
| `secondaryButton()`     | `conditionalLink`            |                                  |
| `mainImage()`           | `object` (image + alt)       | Single image                     |
| `arrayOfImages()`       | `array` of objects           | Multiple images                  |
| `webriqForms()`         | `webriqForm`                 | Form builder                     |
| `ctaForm()`             | `webriqForm`                 | CTA form                         |
| `formLinks()`           | `array` of `conditionalLink` | Links below forms                |
| `signInLink()`          | `conditionalLink`            | Sign-in page link                |
| `routes()`              | `array` of `conditionalLink` | Nav menu links                   |
| `socialLinks()`         | `array` of objects           | Social media accounts            |
| `youtubeLink()`         | `url`                        | YouTube video URL                |
| `logo()`                | `object`                     | Logo with internal/external link |
| `tags()`                | `array` of `string`          | Tag input                        |
| `dateAdded()`           | `date`                       | YYYY-MM-DD format                |
| `rating()`              | `string`                     | 1–5 dropdown                     |
| `portfolios()`          | `array`                      | Portfolio items                  |
| `askedQuestions()`      | `array`                      | Q&A pairs                        |
| `faqsWithCategory()`    | `array`                      | Categorized FAQs                 |
| `featuredItems()`       | `array`                      | Feature cards                    |
| `statItems()`           | `array`                      | Stat data + label                |
| `blockOfText()`         | `array` of blocks            | Rich text (normal only)          |
| `blogPost()`            | `array` of references        | Blog post references             |
| `selectStripeAccount()` | `selectStripeAccount`        | Stripe integration               |
| `customText()`          | `string` or `array`          | Flexible text field              |
| `customDropdown()`      | `string`                     | Select with custom options       |

### `hideIfVariantIn()` Usage

```ts
import { hideIfVariantIn } from "@webriq-pagebuilder/sanity-plugin-schema-default";

export const mySchema = [
  title(), // shown in all variants
  description(hideIfVariantIn(["variant_c"])), // hidden in variant_c
  mainImage(hideIfVariantIn(["variant_b", "variant_c"])), // hidden in b and c
];
```

### `variantsList` in `{name}.ts`

```ts
import {
  rootSchema,
  headerVariants as baseVariantsList,
} from "@webriq-pagebuilder/sanity-plugin-schema-default";

export const variantsList = [
  ...baseVariantsList, // extend existing variants
  {
    title: "Variant Z",
    description: "Description shown in Studio",
    value: "variant_z", // MUST match key in Variants map in index.tsx
    image: variantZImage.src, // 800x600 JPG preview image
  },
];

export default rootSchema(
  "header",
  "Header",
  IconComponent,
  variantsList,
  headerSchema,
  initialValue,
);
```

### `initialValue` in `initialValue/index.ts`

```ts
import {
  defaultImage,
  defaultButton,
  defaultLinks,
  defaultForm,
  defaultImageArray,
} from "@webriq-pagebuilder/sanity-plugin-schema-default";

export default {
  title: "Default title text",
  description: "Default description text",
  primaryButton: defaultButton("Get Started"),
  secondaryButton: defaultButton("How it works"),
  mainImage: defaultImage("image-{sanity-image-id}-jpg"),
  images: defaultImageArray(["image-id1-jpg", "image-id2-jpg"]),
  formLinks: defaultLinks(["Policy Privacy", "Terms of Use"]),
  form: defaultForm(
    "Form title",
    [
      /* field objects */
    ],
    "Submit",
    "Thank you",
  ),
};
```

---

## How Sanity Studio Detects Variants

For a variant to appear in Studio, **all three must be true:**

1. Component key exists in `Components` in `list.tsx` (makes it detectable)
2. Schema name matches that key and is in `allSchemas` via `schema.ts` (makes it configurable)
3. `value` in `variantsList` matches the key in the component's `Variants` map in `index.tsx` (makes it renderable)

**Detection flow in `schemas/schema.ts`:**

1. Builds `componentsList` from `Object.keys(Components)`
2. For each schema in `allSchemas`, checks if `schema.name` is in `componentsList`
3. If matched, calls `fetchDynamicComponentsData()` to get variant data
4. Maps each `variantsList` item to a live React preview (if `NEXT_PUBLIC_RENDER_DYNAMIC_COMPONENTS=true`)
5. Fields are filtered using `hideIfVariantIn()` / `_hideInVariants`

---

## Document Types (`schemas/documents/`)

### `pages.ts` — `page` document

Fields: `title`, `slug`, `publishDateTime` (hidden), `publishStatus` (hidden), `sections` (array of references), `seo`.

Sections array accepts references to all component types listed in Components.

- `navigation` and `footer` filter by C-Studio flag (`NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO`)
- `featuredProducts` and `pages_productInfo` are `readOnly` when C-Studio is disabled

### `themePage.ts` — `themePage` document

Used for the `/theme-page` route.

---

## Page Routing (`pages/`)

| Route                  | File                            | Notes                          |
| ---------------------- | ------------------------------- | ------------------------------ |
| `/`                    | `pages/index.tsx`               | Homepage                       |
| `/[slug]`              | `pages/[slug].tsx`              | Dynamic page + blog post route |
| `/studio/[[...index]]` | `pages/studio/[[...index]].tsx` | Embedded Sanity Studio         |
| `/cart`                | `pages/cart/index.tsx`          | Cart (C-Studio)                |
| `/products/[slug]`     | `pages/products/[slug].tsx`     | Product detail                 |
| `/collections/[slug]`  | `pages/collections/[slug].tsx`  | Collection page                |
| `/search`              | `pages/search/index.tsx`        | Search results                 |
| `/wishlist`            | `pages/wishlist/index.tsx`      | Wishlist                       |
| `/theme-page`          | `pages/theme-page/index.tsx`    | Theme demo                     |

`[slug].tsx` fetches both page and blog data, uses `filterDataToSingleItem()` for preview/draft logic, and handles SEO + JSON-LD structured data.

---

## Ecommerce Schemas (`studio/utils/index.ts`)

The `EcommerceSchema` array controls which schemas get `readOnly` treatment when C-Studio is disabled:

```ts
export const EcommerceSchema = [
  "allProducts",
  "featuredProducts",
  "pages_productInfo",
  "mainProduct",
  "mainCollection",
  "productSettings",
  "collectionSettings",
  "cartPage",
  "wishlistPage",
  "searchPage",
];
```

---

## Key Utility Functions

### `components/list.tsx`

- `filterDataToSingleItem(data, preview)` — returns correct draft/published doc
- `filterFieldsByVariant(component, args, variant)` — strips hidden fields per variant
- `dynamicSchemaData({ data, schemaFields, isEcommerce, isCustomArgs })` — formats data for Storybook/preview

### `utils/schemas.ts`

- `fetchDynamicComponentsData(schemaType, fields, isEcommerce)` — fetches variant preview data
- `renameVariantKeys(data)` — maps schema field names to component prop names:
  - `statItems` → `stats`
  - `blogPosts` → `posts`
  - `askedQuestions` → `faqs`
  - `faqsWithCategory` → `faqsWithCategories`

### `studio/utils/index.ts`

- `mergeReplaceAndAdd(existingItems, newItems)` — merges schema arrays, replacing by name

---

## Environment Variables (`studio/config.ts`)

| Variable                                | Purpose                                                      |
| --------------------------------------- | ------------------------------------------------------------ |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`         | Sanity project ID                                            |
| `NEXT_PUBLIC_SANITY_DATASET`            | Sanity dataset (default: `production`)                       |
| `NEXT_PUBLIC_SANITY_API_READ_TOKEN`     | Read token                                                   |
| `NEXT_PUBLIC_RENDER_DYNAMIC_COMPONENTS` | Set `"true"` to enable live React previews in variant picker |
| `NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO`  | `"false"` = disable ecommerce create/delete actions          |
| `NEXT_PUBLIC_NETLIFY_SITE_URL`          | Netlify site URL for web preview                             |
| `NEXT_PUBLIC_SITE_URL`                  | Local/production site URL                                    |
| `NEXT_PUBLIC_APP_URL`                   | StackShift live app URL                                      |
| `NEXT_PUBLIC_PREVIEW_SECRET`            | Preview mode secret key                                      |
| `SANITY_REVALIDATE_SECRET`              | Webhook secret for ISR; if unset, revalidates every 60s      |

---

## Scenario A vs B (Quick Reference)

**Scenario A** — Component already has a local folder (`components/sections/{name}/`):

- Create `variant_{x}.tsx` in the existing folder
- Add key to `Variants` map in `index.tsx`
- No change needed in `list.tsx`

**Scenario B** — Component is imported from `@stackshift-ui` with no local folder:

- Create `components/sections/{name}/index.tsx` as variant router
- Import all existing package variants + your custom one
- Change `list.tsx` to import from local folder instead of the package

---

## Blog Schema (`schemas/custom/sanity-plugin-schema-blog/`)

Custom blog schemas: `author`, `blogBlockContent`, `category`, `post`

These extend/override the base `@webriq-pagebuilder/sanity-plugin-schema-blog` package.

---

## Notes & Gotchas

- The `value` in `variantsList` and the key in the `Variants` object in `index.tsx` **must be identical** (e.g., `"variant_z"`).
- Variant preview images go in `schemas/custom/.../sections/{name}/images/` as JPG (~800×600).
- `cookies` is always excluded from dynamic rendering regardless of env vars.
- `socialMediaFeed` is intentionally hidden from Studio (Instagram integration pending).
- When `NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO === "false"`, ecommerce schemas become read-only (no create/delete).
- `navigation` and `footer` have special Studio filters based on C-Studio mode.
- `pricing` variant_d wraps in a `<CheckoutForm>` component with Stripe.
