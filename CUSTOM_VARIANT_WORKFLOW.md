# Custom Variant Workflow

Guide for adding custom component variants to `site-template-default` and registering them in Sanity Studio.

---

## Directory Structure

```
site-template-default/
├── components/
│   ├── list.tsx                                      ← Register components here
│   └── sections/
│       └── {componentName}/                          ← Component folder
│           ├── index.tsx                             ← Variant router
│           ├── variant_a.tsx
│           ├── variant_b.tsx
│           └── variant_z.tsx                         ← New custom variant
│
└── schemas/
    ├── schema.ts                                     ← Uncomment custom schema lines
    └── custom/
        ├── index.ts                                  ← Import schema plugins here
        └── sanity-plugin-schema-default/
            └── src/
                └── schemas/
                    └── sections/
                        ├── index.ts                  ← Register schema here
                        └── {componentName}/
                            ├── {componentName}.ts    ← Add variant to variantsList
                            ├── schema/
                            │   └── index.ts          ← Define fields + hideIfVariantIn
                            └── initialValue/
                                └── index.ts          ← Default content values
```

---

## Scenario A — New variant on an existing local component

Use this when the component already has a local folder under `components/sections/` (e.g. `pricing`, `cart_section`, `featured_products`).

### Step 1: Create the variant file

```
components/sections/{componentName}/variant_{x}.tsx
```

```tsx
import React from "react";
import { YourComponentProps } from "."; // import props interface from index.tsx

export default function VariantX({ title, description }: YourComponentProps) {
  return (
    <section>
      <h1>{title}</h1>
      <p>{description}</p>
      {/* your custom layout */}
    </section>
  );
}
```

### Step 2: Register it in the component's `index.tsx`

```ts
// components/sections/{componentName}/index.tsx
const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_x: dynamic(() => import("./variant_x")), // ← add this
};
```

> If the component is already in `components/list.tsx`, no change is needed there.

---

## Scenario B — New variant on a `@stackshift-ui` component

Most `@stackshift-ui` components (e.g. `header`, `features`, `blog`) are imported directly in `list.tsx` without a local folder. To add a custom variant you need to create a local wrapper.

### Step 1: Create a local section folder

```
components/sections/{componentName}/
├── index.tsx       ← routes between @stackshift-ui variants and custom variants
└── variant_z.tsx   ← your new custom variant
```

### Step 2: Create `index.tsx` as a variant router

```tsx
// components/sections/header/index.tsx
import dynamic from "next/dynamic";
import { Header } from "@stackshift-ui/header";
import { SectionsProps } from "types";

const CustomVariants = {
  variant_z: dynamic(() => import("./variant_z")),
};

function HeaderSection({ data }: SectionsProps) {
  const variant = data?.variant;
  const CustomVariant = CustomVariants?.[variant];

  // Use custom variant if it exists, otherwise fall back to @stackshift-ui
  if (CustomVariant) return <CustomVariant {...data.variants} />;
  return <Header data={data} />;
}

export default HeaderSection;
```

### Step 3: Switch to local import in `components/list.tsx`

```ts
// Before:
header: dynamic(() => import("@stackshift-ui/header").then((m) => m.Header), { ssr: false }),

// After:
header: dynamic(() => import("components/sections/header")),
```

---

## Schema Registration (applies to both scenarios)

### Step 4a: Add variant to `variantsList`

File: `schemas/custom/sanity-plugin-schema-default/src/schemas/sections/{componentName}/{componentName}.ts`

```ts
import { rootSchema, headerVariants as baseVariantsList } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { MdVerticalAlignTop } from "react-icons/md";

import variantZImage from "./images/variant_z.jpg"; // add a preview screenshot (800x600 JPG)
import initialValue from "./initialValue";
import { headerSchema } from "./schema";

export const variantsList = [
  ...baseVariantsList, // keeps all existing variants from the base package
  {
    title: "Variant Z",              // display name in Studio
    description: "Description of what this variant looks like",
    value: "variant_z",              // must exactly match the key in the Variants map
    image: variantZImage.src,        // preview image shown in variant picker
  },
];

export default rootSchema(
  "header",        // schema name — must match the key in Components (list.tsx)
  "Header",        // display label
  MdVerticalAlignTop,
  variantsList,
  headerSchema,
  initialValue
);
```

> To replace all existing variants instead of extending them, define `variantsList` without spreading `baseVariantsList`.

### Step 4b: Update schema fields

File: `schemas/custom/sanity-plugin-schema-default/src/schemas/sections/{componentName}/schema/index.ts`

Use `hideIfVariantIn()` to control which fields appear for each variant.

```ts
import {
  title,
  description,
  primaryButton,
  mainImage,
} from "../../../common/fields";
import { hideIfVariantIn } from "@webriq-pagebuilder/sanity-plugin-schema-default";

export const headerSchema = [
  title(),
  // Hide description for variant_c and variant_z:
  description(hideIfVariantIn(["variant_c", "variant_z"])),
  primaryButton(),
  // Hide mainImage for variant_z (it doesn't use an image):
  mainImage(hideIfVariantIn(["variant_b", "variant_c", "variant_z"])),
  // Show customField only for variant_z (hide it for all others):
  customField(hideIfVariantIn(["variant_a", "variant_b", "variant_c", "variant_d", "variant_e"])),
];
```

### Step 4c: Set default content values

File: `schemas/custom/sanity-plugin-schema-default/src/schemas/sections/{componentName}/initialValue/index.ts`

```ts
import {
  defaultImage,
  defaultButton,
} from "@webriq-pagebuilder/sanity-plugin-schema-default";

export default {
  title: "Your default title here",
  description: "Default description text",
  primaryButton: defaultButton("Get Started"),
  mainImage: defaultImage("image-{sanity-image-id}-jpg"),
  // Add defaults for any new fields your variant introduces
};
```

---

### Step 5: Register schema in the sections index

File: `schemas/custom/sanity-plugin-schema-default/src/schemas/sections/index.ts`

```ts
import { default as header } from "./header/header";
import { default as myNewComponent } from "./myNewComponent/myNewComponent"; // if adding a brand-new component

const schemas = {
  header,
  myNewComponent, // if adding a brand-new component
};

export default schemas;
```

---

### Step 6: Ensure the plugin is imported in `schemas/custom/index.ts`

This file is already set up for existing plugins. Only update it if you are adding a schema for a brand-new component category.

```ts
// schemas/custom/index.ts
import { default as customSchemaBlog } from "./sanity-plugin-schema-blog/src";
import { default as customSchemaDefault } from "./sanity-plugin-schema-default/src/schemas/sections";
import { default as customSchemaCommerce } from "./sanity-plugin-schema-commerce/src/schemas/sections";

const schemas = {
  ...customSchemaBlog,
  ...customSchemaDefault,
  ...customSchemaCommerce,
};

export default schemas;
```

---

### Step 7: Activate custom schemas in `schemas/schema.ts`

The file ships with custom schema imports commented out. Uncomment the relevant lines:

```ts
// schemas/schema.ts

// 1. Uncomment these two lines (currently lines 22-23):
import customSchema from "./custom";
const updatedSchemaArray = Object.values(customSchema);

const allSchemas = (() => {
  // 2. Comment out this line (currently line 27):
  // const mergedSchemas = mergeReplaceAndAdd(baseSchemas, commerceSchemaArray);

  // 3. Uncomment this line (currently line 30):
  const mergedSchemas = mergeReplaceAndAdd(baseSchemas, updatedSchemaArray);

  return mergedSchemas;
})();
```

---

## How Sanity Studio Detects the Variant

When the Studio loads, `schemas/schema.ts` runs this detection flow:

1. Builds `componentsList` from the keys of `Components` in `components/list.tsx`
2. For each schema in `allSchemas`, checks if `schema.name` exists in `componentsList`
3. If it does, fetches dynamic variant data via `fetchDynamicComponentsData()`
4. Maps each item in `variantsList` to a live React preview rendered inside the Studio variant picker
5. Fields are filtered per variant using `hideIfVariantIn()` / `_hideInVariants`

**For a variant to appear in Studio, all three must be true:**
- The component key exists in `Components` (`list.tsx`) ← makes it detectable
- The schema name matches that key and is in `allSchemas` (`schema.ts`) ← makes it configurable
- The `value` in `variantsList` matches the key in the component's `Variants` map ← makes it renderable

---

## Full Checklist

| # | File | Action |
|---|------|--------|
| 1 | `components/sections/{name}/variant_{x}.tsx` | Create variant React component |
| 2 | `components/sections/{name}/index.tsx` | Add variant key to `Variants` map |
| 3 | `components/list.tsx` | Register component (or switch `@stackshift-ui` import to local) |
| 4a | `schemas/custom/.../sections/{name}/{name}.ts` | Add entry to `variantsList` with `title`, `value`, `image` |
| 4b | `schemas/custom/.../sections/{name}/schema/index.ts` | Update `hideIfVariantIn()` for each field |
| 4c | `schemas/custom/.../sections/{name}/initialValue/index.ts` | Add default values for new fields |
| 5 | `schemas/custom/.../sections/index.ts` | Import and export the schema |
| 6 | `schemas/custom/index.ts` | Import plugin (only for new component categories) |
| 7 | `schemas/schema.ts` | Uncomment custom schema lines |

---

## Notes

- The `value` in `variantsList` and the key in the `Variants` object in `index.tsx` must be identical (e.g. `"variant_z"`).
- Variant preview images should be placed in `schemas/custom/.../sections/{componentName}/images/` as JPG files (~800x600).
- If `NEXT_PUBLIC_RENDER_DYNAMIC_COMPONENTS` is not set or is `"false"`, live React previews in the variant picker are disabled and only static images are shown.
- The `cookies` component is explicitly excluded from dynamic rendering regardless of the env variable.
