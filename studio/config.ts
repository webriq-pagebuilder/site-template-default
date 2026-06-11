// Studio project values
export const SANITY_PROJECT_ID =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.STORYBOOK_SANITY_PROJECT_ID ||
  "9itgab5x";

export const SANITY_PROJECT_DATASET =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.STORYBOOK_SANITY_DATASET ||
  "production";

export const SANITY_API_READ_TOKEN =
  process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN ||
  process.env.STORYBOOK_SANITY_API_READ_TOKEN;

export const NEXT_PUBLIC_SANITY_PROJECT_NAME =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_NAME || "landing-page-builder";

// Site Netlify app used for web preview
export const NEXT_PUBLIC_NETLIFY_SITE_URL =
  process.env.NEXT_PUBLIC_NETLIFY_SITE_URL;

// Defaults to `localhost:3000` but can be override as per your local settings
export const NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export const NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_PUBLISHABLE_KEY;
export const NEXT_PUBLIC_STRIPE_SECRET_KEY =
  process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;

export const NEXT_PUBLIC_SANITY_STUDIO_URL =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL;

// Preview secret key both shared by site and studio. Randomly generated in production
export const NEXT_PUBLIC_PREVIEW_SECRET =
  process.env.NEXT_PUBLIC_PREVIEW_SECRET || "secret";

// LIVE App URL
export const NEXT_PUBLIC_APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://stackshift.webriq.com";

// Verify if Studio was created via WebriQ App Staging or Live
export const NEXT_PUBLIC_SANITY_STUDIO_FROM_STAGING_APP =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_FROM_STAGING_APP;

// Helps check if current studio is in C-Studio or W-Studio
export const NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO;

// Studio secret token to authenticate Ecwid API endpoint requests
export const SITE_STORE_CORS_SECRET =
  process.env.SITE_STORE_CORS_SECRET || "cors_wE67XmOkBOgIXTmAs1iWJc5btQiCBosI";

// Open AI key
export const NEXT_PUBLIC_SANITY_PROJECT_OPENAI_KEY =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_OPENAI_KEY;

export const SOCIAL_ACCOUNTS_API_URL =
  process.env.NEXT_PUBLIC_SOCIAL_ACCOUNTS_API_URL ||
  `${NEXT_PUBLIC_APP_URL}/api/app/integrations/social-accounts`;

// Scheduled publishing variables
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// PublishForge webhook — triggers agent content generation on blog publish
export const PUBLISHFORGE_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_PUBLISHFORGE_WEBHOOK_URL;

export const SCHEDULED_PUBLISHING_URL =
  process.env.NEXT_PUBLIC_SCHEDULED_PUBLISHING_URL ||
  "https://conrzqhfjvxpkjifqwdg.supabase.co";

// Document types allowed to trigger the PublishForge agent-generation webhook.
// Single source of truth for both publish actions (createProductsPublishAction,
// customBlogPublishAction). Allow-list (not deny-list) on purpose:
// createProductsPublishAction is the GLOBAL default action in
// ResolveDocumentActions, so a deny-list would leak settings singletons
// (defaultSeo, socialAccounts, cookies) and section documents (footer,
// navigation, features…) into agent generation + git commits on every publish.
// Must stay byte-for-byte identical to INCLUDED_DOCUMENT_TYPES in the PublishForge
// webhook route (app/api/webhooks/stackshift-publish/route.ts) — if the two lists
// drift, document types silently drop in transit between the repos. Add a type
// here (and in PublishForge) to opt it into agent pages later.
export const WEBHOOK_INCLUDED_TYPES = new Set<string>(["page", "post"]);

// PublishForge webhook — triggers agent content generation on blog publish
export const PUBLISHFORGE_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_PUBLISHFORGE_WEBHOOK_URL;
