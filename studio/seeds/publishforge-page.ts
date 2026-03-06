/**
 * PublishForge Landing Page — Sanity Document Seed
 * ─────────────────────────────────────────────────────────────
 * Import and run this seed via the Sanity client to pre-populate
 * the PublishForge landing page with all sections and content.
 *
 * Usage (from project root):
 *   npx ts-node studio/seeds/publishforge-page.ts
 *
 * Or call createPublishForgePage() from a custom script with
 * an initialized Sanity client.
 */

import { createClient } from "@sanity/client";
import {
  NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET,
} from "studio/config";

// ─── SANITY CLIENT ────────────────────────────────────────────
const client = createClient({
  projectId: NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:   NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn:     false,
  // token: process.env.SANITY_WRITE_TOKEN  ← set this for write access
});

// ─── SECTION DOCUMENTS ───────────────────────────────────────

/** 1. NAVIGATION */
export const navigationSection = {
  _type: "navigation",
  variant: "variant_a",
  variants: {
    logo: {
      _type: "logo",
      logoLink: { _type: "conditionalLink", linkType: "linkInternal", internalLink: "/" },
      image: { _type: "mainImage", alt: "PublishForge by WebriQ" },
    },
    routes: [
      { _type: "conditionalLink", label: "How It Works",  linkType: "linkInternal", internalLink: "#how-it-works" },
      { _type: "conditionalLink", label: "Channels",      linkType: "linkInternal", internalLink: "#channels" },
      { _type: "conditionalLink", label: "Impact",        linkType: "linkInternal", internalLink: "#impact" },
      { _type: "conditionalLink", label: "Ecosystem",     linkType: "linkInternal", internalLink: "#ecosystem" },
    ],
    primaryButton:   { _type: "conditionalLink", label: "Talk to an Expert", linkType: "linkExternal", externalLink: "https://www.webriq.com" },
    secondaryButton: { _type: "conditionalLink", label: "See It in Action",  linkType: "linkExternal", externalLink: "https://www.webriq.com" },
  },
};

/** 2. HERO HEADER */
export const heroSection = {
  _type: "header",
  variant: "variant_a",
  variants: {
    title: "Execute Content Faster. Stay Visible Everywhere. Drive Results.",
    description:
      "The AI-powered execution layer that helps mid-market teams activate existing content across every channel — quickly, consistently, and with measurable impact. Part of the WebriQ AI solution.",
    primaryButton: {
      _type: "conditionalLink",
      label: "Talk to an Expert",
      linkType: "linkExternal",
      externalLink: "https://www.webriq.com",
    },
    secondaryButton: {
      _type: "conditionalLink",
      label: "See It in Action",
      linkType: "linkExternal",
      externalLink: "https://www.webriq.com",
    },
  },
};

/** 3. THE MID-MARKET REALITY — textComponent */
export const problemSection = {
  _type: "textComponent",
  variant: "variant_a",
  variants: {
    title: "The Mid-Market Reality",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "Most mid-market companies already have strong websites, proven expertise and messaging, and lean teams under constant pressure." }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "What slows them down: Manual updates and approvals. Rewriting content for every channel. Dependency on developers or agencies. Limited insight into AI-driven visibility." }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", marks: ["strong"], text: "The result: good content, underperforming execution." }],
      },
    ],
  },
};

/** 4. HOW TEAMS GET WORK DONE — howItWorks */
export const howItWorksSection = {
  _type: "howItWorks",
  variant: "variant_a",
  variants: {
    title: "How Teams Get Work Done",
    steps: [
      {
        title: "Operate with Simple Instructions",
        description:
          "Teams interact using plain language — no complex tools or workflows. 'Update this page for our new offer.' Updates go live immediately, keeping the business responsive and competitive.",
      },
      {
        title: "One Source. Every Channel.",
        description:
          "Teams work from one reliable source and apply changes everywhere it matters — website pages, landing pages, emails, social posts, blogs, and FAQs. Decisions turn into live updates without delays.",
      },
      {
        title: "Built for AI-Driven Discovery",
        description:
          "Content is continuously assessed for AI-powered search clarity. Visibility indicators show which content is being surfaced and where structure can be improved to increase reach.",
      },
    ],
  },
};

/** 5. ONE SOURCE FEATURES — features */
export const featuresSection = {
  _type: "features",
  variant: "variant_a",
  variants: {
    title: "One Source. Every Channel.",
    subtitle: "Designed for Mid-Market Teams",
    description:
      "All updates draw from a shared content foundation that supports your entire digital presence. Publish once, reflect everywhere.",
    features: [
      {
        title: "Website Pages & Landing Experiences",
        description: "Update website pages and landing pages as soon as things change — without developer bottlenecks.",
        icon: "🌐",
      },
      {
        title: "AI-Powered Search & Answers",
        description: "Content is structured and optimized to be found, understood, and cited by Google AI Overviews, ChatGPT, and Perplexity.",
        icon: "🤖",
      },
      {
        title: "Blogs & FAQs",
        description: "Reuse existing content for blogs, FAQs, and campaigns. No rewriting — just intelligent repurposing.",
        icon: "✍️",
      },
      {
        title: "Email & Newsletter Campaigns",
        description: "Turn website content into emails and newsletters in minutes from the same trusted source.",
        icon: "📧",
      },
      {
        title: "Social & Outreach Messaging",
        description: "Keep messaging aligned across all social and outreach channels with zero extra coordination.",
        icon: "📱",
      },
      {
        title: "Scales Without Complexity",
        description: "Supports organizations operating across multiple products, services, or regions — without adding headcount.",
        icon: "📈",
      },
    ],
  },
};

/** 6. BUSINESS IMPACT — statistics */
export const statsSection = {
  _type: "stats",
  variant: "variant_a",
  variants: {
    title: "Business Impact",
    stats: [
      { value: "5+",      label: "Channels updated from one source" },
      { value: "Zero",    label: "Developer dependency for content updates" },
      { value: "30–60d",  label: "Days to first measurable outcomes (DFY)" },
    ],
  },
};

/** 7. THE OUTCOME — callToAction */
export const outcomeSection = {
  _type: "callToAction",
  variant: "variant_a",
  variants: {
    title: "The Outcome",
    description:
      "Mid-market organizations move faster, stay visible, and execute with confidence — without growing teams or complexity.\n\nUpdate faster. Stay consistent. Be visible where buyers decide.",
    primaryButton: {
      _type: "conditionalLink",
      label: "Talk to an Expert",
      linkType: "linkExternal",
      externalLink: "https://www.webriq.com",
    },
    secondaryButton: {
      _type: "conditionalLink",
      label: "See It in Action",
      linkType: "linkExternal",
      externalLink: "https://www.webriq.com",
    },
  },
};

/** 8. HOW IT FITS — features (Ecosystem) */
export const ecosystemSection = {
  _type: "features",
  variant: "variant_b",
  variants: {
    title: "How It Fits the Bigger Picture",
    description:
      "The operating interface works alongside the full WebriQ AI solution, creating a continuous flow from content to revenue.",
    features: [
      {
        title: "CiteForge",
        description: "Organizes existing content into a structured, governed, AI-ready knowledge foundation.",
        icon: "📚",
      },
      {
        title: "PublishForge",
        description: "Turns organized knowledge into daily multi-channel execution — the active layer that keeps teams publishing.",
        icon: "⚡",
      },
      {
        title: "PipelineForge",
        description: "Converts content visibility into qualified leads and measurable pipeline growth.",
        icon: "📈",
      },
      {
        title: "StackShift",
        description: "The secure, reliable Content Operating Platform that keeps everything governed and operational.",
        icon: "🏗️",
      },
    ],
  },
};

/** 9. FOOTER CTA — newsletter / callToAction */
export const ctaFooterSection = {
  _type: "callToAction",
  variant: "variant_b",
  variants: {
    title: "Stop Coordinating. Start Publishing.",
    description:
      "See how PublishForge helps your mid-market team activate content across every channel — in minutes, not weeks. Part of the WebriQ AI solution.",
    primaryButton: {
      _type: "conditionalLink",
      label: "Talk to an Expert",
      linkType: "linkExternal",
      externalLink: "https://www.webriq.com",
    },
    secondaryButton: {
      _type: "conditionalLink",
      label: "See It in Action",
      linkType: "linkExternal",
      externalLink: "https://www.webriq.com",
    },
  },
};

/** 10. FOOTER */
export const footerSection = {
  _type: "footer",
  variant: "variant_a",
  variants: {
    logo: {
      _type: "logo",
      logoLink: {
        _type: "conditionalLink",
        linkType: "linkExternal",
        externalLink: "https://www.webriq.com",
      },
    },
    description:
      "The AI-powered content execution layer for mid-market organizations. Part of the WebriQ AI solution, powered by StackShift.",
    socialLinks: [
      { _type: "socialLink", platform: "linkedin", url: "https://www.linkedin.com/company/webriq" },
      { _type: "socialLink", platform: "twitter",  url: "https://twitter.com/webriqdotcom" },
    ],
    routes: [
      { _type: "conditionalLink", label: "How It Works",  linkType: "linkInternal", internalLink: "#how-it-works" },
      { _type: "conditionalLink", label: "Channels",      linkType: "linkInternal", internalLink: "#channels" },
      { _type: "conditionalLink", label: "Business Impact", linkType: "linkInternal", internalLink: "#impact" },
      { _type: "conditionalLink", label: "About WebriQ",  linkType: "linkExternal", externalLink: "https://www.webriq.com/about-us" },
    ],
    copyright: `© ${new Date().getFullYear()} WebriQ Inc. All rights reserved. PublishForge is part of the StackShift Content Operating Platform.`,
  },
};

// ─── PAGE DOCUMENT ────────────────────────────────────────────

/**
 * The complete PublishForge page document with all ordered sections.
 * Each section references a document created above via _ref.
 * In practice you would first create each section document, then
 * reference its _id here.
 */
export const publishforgePageDocument = {
  _type: "page",
  title: "PublishForge — Execute Content Faster",
  slug: { _type: "slug", current: "publishforge" },
  publishStatus: "published",
  seo: {
    metaTitle:       "PublishForge | Execute Content Faster. Stay Visible Everywhere.",
    metaDescription:
      "PublishForge is the AI-powered content execution layer for mid-market teams. Activate existing content across every channel — quickly, consistently, and with measurable AI-driven visibility.",
    openGraphTitle:  "PublishForge — Execute Content Faster. Stay Visible Everywhere. Drive Results.",
    openGraphDescription:
      "Mid-market organizations use PublishForge to publish once and reflect everywhere — website, email, social, AI search — from a single governed source.",
    keywords: ["PublishForge", "content execution", "AI content", "mid-market content", "WebriQ", "StackShift", "multi-channel publishing"],
  },
  // sections array contains references to the created section documents
  sections: [
    // Each entry will be a { _type: "reference", _ref: "<section_id>" }
    // once section documents are created via createPublishForgePage()
  ],
};

// ─── SEED FUNCTION ────────────────────────────────────────────

/**
 * Creates all section documents and the PublishForge page document
 * in Sanity. Run once to seed the CMS.
 */
export async function createPublishForgePage() {
  console.log("🚀 Seeding PublishForge landing page...\n");

  const sections = [
    navigationSection,
    heroSection,
    problemSection,
    howItWorksSection,
    featuresSection,
    statsSection,
    outcomeSection,
    ecosystemSection,
    ctaFooterSection,
    footerSection,
  ];

  const sectionRefs: { _type: string; _ref: string; _key: string }[] = [];

  for (const [i, section] of sections.entries()) {
    try {
      const created = await client.create(section);
      sectionRefs.push({
        _type:  "reference",
        _ref:   created._id,
        _key:   `section_${i}`,
      });
      console.log(`  ✓ Created section [${i + 1}/${sections.length}]: ${section._type}`);
    } catch (err) {
      console.error(`  ✗ Failed to create section ${section._type}:`, err);
    }
  }

  // Create the page document with all section references
  const page = {
    ...publishforgePageDocument,
    sections: sectionRefs,
  };

  try {
    const createdPage = await client.create(page);
    console.log(`\n✅ PublishForge page created!`);
    console.log(`   Document ID : ${createdPage._id}`);
    console.log(`   Slug        : /publishforge`);
    console.log(`   Studio URL  : /studio/desk/page;${createdPage._id}`);
    return createdPage;
  } catch (err) {
    console.error("✗ Failed to create page document:", err);
    throw err;
  }
}

// Allow direct execution: `npx ts-node studio/seeds/publishforge-page.ts`
if (require.main === module) {
  createPublishForgePage()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
