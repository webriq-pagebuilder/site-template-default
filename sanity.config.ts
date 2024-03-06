import { defineConfig } from "sanity";
import {
  NEXT_PUBLIC_SANITY_PROJECT_NAME,
  SANITY_PROJECT_DATASET,
  SANITY_PROJECT_ID,
} from "studio/config";

// desk customization
import { structureTool } from "sanity/structure";
import { stackshiftDesk } from "studio/deskStructure";
import { Logo } from "studio/brand/logo";
import { DefaultStudioTheme } from "studio/brand/theme";
import { StackshiftStudioTools } from "studio/brand/tools";

// document badge and action
import { LiveURLBadge } from "studio/badges/LiveURLBadge";
import { ResolveDocumentActions } from "studio/documentActions";

// schemas
import { schemaTypes } from "schemas/schema";

// sanity plugins/tools
import { media } from "sanity-plugin-media";
import { codeInput } from "@sanity/code-input";
import { visionTool } from "@sanity/vision";

// Stackshift plugins
import { webriqBlog } from "@webriq-pagebuilder/sanity-plugin-webriq-blog";
import { webriqForms } from "@webriq-pagebuilder/sanity-plugin-webriq-forms";
import { webriqPayments } from "@webriq-pagebuilder/sanity-plugin-webriq-payments";
import { webriqGPT3 } from "@webriq-pagebuilder/sanity-plugin-input-component-gpt3";
import { webriqComponents } from "@webriq-pagebuilder/sanity-plugin-webriq-components";
import { webriQInspectorInlineEdit } from "@webriq-pagebuilder/sanity-plugin-inspector-inline-edit";

export default defineConfig({
  basePath: "/studio",
  icon: Logo,
  title: NEXT_PUBLIC_SANITY_PROJECT_NAME,
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_PROJECT_DATASET,
  plugins: [
    structureTool({
      structure: stackshiftDesk,
    }),
    visionTool(),
    webriqComponents(),
    webriqForms(),
    webriqPayments(),
    webriqBlog(),
    webriqGPT3(),
    webriQInspectorInlineEdit(),
    media(),
    codeInput(), // for "code" schema type
  ],
  tools: (prev) => {
    // 👇 Uses environment variables set by Vite in development mode
    if (process.env.NODE_ENV !== "production") {
      return prev;
    }
    return prev.filter((tool) => tool.name !== "vision");
  },
  studio: {
    components: {
      // logo: Logo, // logo is deprecated - added as ICON to current workspace config
      // Customize Sanity Studio UI with Studio Components: https://www.sanity.io/docs/studio-components
      toolMenu: StackshiftStudioTools,
    },
  },
  theme: DefaultStudioTheme,
  form: {
    image: {
      assetSources: (prev) => {
        // only display media browser and openai image assets as default options
        return prev.filter((asset) => asset.name !== "sanity-default");
      },
    },
  },
  schema: {
    types: schemaTypes,
  },
  document: {
    badges: [LiveURLBadge],
    actions: (prev, context) => ResolveDocumentActions({ prev, context }),
    unstable_comments: {
      enabled: false, // Comments disabled
    },
  },
});
