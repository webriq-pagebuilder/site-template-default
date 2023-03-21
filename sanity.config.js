/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */
import { defineConfig } from "sanity"
import {
  NEXT_PUBLIC_SANITY_PROJECT_NAME,
  NEXT_PUBLIC_SANITY_DATASET,
  NEXT_PUBLIC_SANITY_PROJECT_ID,
  SITE_SANITY_PROJECT_OPENAI_KEY
} from "./config"

// desk customization
import deskStructure from "./studio/deskStructure"
import { Logo } from "./studio/brand/logo"
import { DefaultStudioTheme } from "./studio/brand/theme"

// document badge and action
import { LiveURLBadge } from "./studio/badges/LiveURLBadge"
import { ResolveDocumentActions } from "./studio/documentActions"

// schemas
import { schemaTypes } from "./schemas/schema"

// plugins
import { media } from "sanity-plugin-media"
import { openaiImageAsset } from "sanity-plugin-asset-source-openai"
import { visionTool } from "@sanity/vision"
import { webriqBlog } from "@webriq-pagebuilder/sanity-plugin-webriq-blog"
import { webriqForms } from "@webriq-pagebuilder/sanity-plugin-webriq-forms"
import { webriqPayments } from "@webriq-pagebuilder/sanity-plugin-webriq-payments"

import resolveProductionUrl from "./studio/resolvePreviewUrl"


export default defineConfig({
  basePath: '/studio',
  title: NEXT_PUBLIC_SANITY_PROJECT_NAME,
  projectId: NEXT_PUBLIC_SANITY_PROJECT_ID || "9itgab5x",
  dataset: NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [
    deskStructure, 
    visionTool(), 
    webriqForms(), 
    webriqPayments(), 
    webriqBlog(),
    media(),
    openaiImageAsset({
      API_KEY: SITE_SANITY_PROJECT_OPENAI_KEY 
    })
  ],
  tools: (prev) => {
    // 👇 Uses environment variables set by Vite in development mode
    if (process.env.NODE_ENV !== "production") {
      return prev
    }
    return prev.filter((tool) => tool.name !== "vision")
  },
  studio: {
    components: {
      logo: Logo,
    },
  },
  theme: DefaultStudioTheme,
  form: {
    image: {
      assetSources: (prev) => {
        // only display media browser and openai image assets as default options
        return prev.filter((asset) => asset.name !== "sanity-default") 
      },
    },
  },
  schema: {
    types: schemaTypes,
  },
  document: {
    badges: [LiveURLBadge],
    actions: (prev, { schemaType }) => ResolveDocumentActions({prev, schemaType}),
    // Open preview link
    productionUrl: async (prev, context) => {
      // context includes the client and other details
      const { document } = context

      return resolveProductionUrl(document)
    }
  },
})
