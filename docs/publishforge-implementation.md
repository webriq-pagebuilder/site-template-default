# PublishForge Landing Page — Implementation Guide

> **Status:** Ready to deploy
> **Route:** `/publishforge`
> **Preview:** `publishforge-landing.html`

---

## What Was Built

Three interconnected deliverables implement the complete PublishForge landing page across the StackShift project:

| File | Purpose |
|------|---------|
| `publishforge-landing.html` | Visual reference preview — full landing page with animations |
| `studio/seeds/publishforge-page.ts` | Sanity document seed — creates the page and all sections in the CMS |
| `studio/brand/publishforge-theme.ts` | Brand tokens — colors, shadows, animations for PublishForge |
| `tailwind.config.ts` (updated) | PublishForge CSS custom properties added to the design system |

---

## Design System

Drawn from the WebriQ/StackShift visual identity used across all brand PDFs:

| Token | Value | Use |
|-------|-------|-----|
| `pf-navy` | `#0d1f3c` | Section backgrounds, text |
| `pf-navy-deep` | `#071430` | Hero, CTA, footer |
| `pf-blue` | `#093fe0` | Primary brand blue, buttons, links |
| `pf-cyan` | `#00cfde` | Accent, AI indicators, glow effects |
| `pf-orange` | `#f97316` | Primary CTA buttons |
| Font | Inter (system fallback) | All headings and body |

Animations: `gradientShift` (hero background), `pulseGlow` (live indicators), `fadeUp` (scroll reveals), `slideLeft/Right` (section entries). All registered in `tailwind.config.ts` as `pf-*` prefixed utilities.

---

## Page Structure

The landing page maps to these StackShift components, in order:

```
1. navigation    → variant_a  — Sticky nav with PublishForge brand + CTAs
2. header        → variant_a  — Hero: headline, sub, dual CTAs, AI chat card
3. textComponent → variant_a  — The Mid-Market Reality (problem framing)
4. howItWorks    → variant_a  — 3-step: Instruct → Publish → Visibility
5. features      → variant_a  — One Source. Every Channel. (6 channels)
6. stats         → variant_a  — 3 impact stats (5+ channels, Zero dev, 30–60d)
7. callToAction  → variant_a  — The Outcome (Update faster / Stay consistent)
8. features      → variant_b  — Ecosystem: CiteForge → PublishForge → PipelineForge → StackShift
9. callToAction  → variant_b  — Final CTA: Talk to an Expert / See It in Action
10. footer       → variant_a  — Full footer with ecosystem links
```

---

## Deploying the Sanity Page

### Step 1 — Set Write Token

```bash
export SANITY_WRITE_TOKEN="your-sanity-write-token-here"
```

### Step 2 — Run the Seed

```bash
npx ts-node studio/seeds/publishforge-page.ts
```

This creates all 10 section documents + 1 page document in Sanity. The page is immediately accessible at `/publishforge`.

### Step 3 — Verify in Studio

Navigate to `{SITE_URL}/studio/desk/page` and look for **"PublishForge — Execute Content Faster"**.

---

## Activating Custom Schemas (Optional)

To enable the custom schema overrides (pre-populated content in Studio variant picker):

In `schemas/schema.ts`, uncomment lines 22–23 and 30:

```typescript
// Uncomment these:
import customSchema from "./custom";
const updatedSchemaArray = Object.values(customSchema);

// And replace line 33 with:
const mergedSchemas = mergeReplaceAndAdd(baseSchemas, updatedSchemaArray);
```

---

## Content Summary

### Hero Message
> *"Execute Content Faster. Stay Visible Everywhere. Drive Results."*

The AI-powered execution layer for mid-market organizations. Activate existing content across every channel from a single governed source — no developer dependency.

### Key Sections
- **Mid-Market Reality** — Problem framing: good content, underperforming execution
- **How It Works** — 3 steps: instruct in plain language → content adapts → go live
- **AI Visibility Dashboard** — Real-time scores showing which content surfaces in ChatGPT, Perplexity, Google AI
- **One Source, Every Channel** — Website, AI Search, Blogs, Email, Social
- **Business Impact** — 5+ channels, zero developer dependency, 30–60 day outcomes
- **Ecosystem** — CiteForge → **PublishForge** → PipelineForge → StackShift
- **CTA** — Talk to an Expert / See It in Action → `webriq.com`

---

## Branding Notes

- The `PublishForgeStudioTheme` in `studio/brand/publishforge-theme.ts` can replace or extend `DefaultStudioTheme` in `studio/config.ts` for a PublishForge-specific Studio experience.
- All Tailwind `pf-*` color and animation utilities are available across the project for component variants.
- The orange CTA (`#f97316`) and cyan accent (`#00cfde`) are the two signature PublishForge colors that differentiate it within the WebriQ ecosystem.
