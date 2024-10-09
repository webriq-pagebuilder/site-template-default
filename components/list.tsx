import dynamic from "next/dynamic";

export const Components = {
  navigation: dynamic(() =>
    import("@stackshift/components-navigation").then((m) => m.Navigation)
  ),
  header: dynamic(() =>
    import("@stackshift/components-header").then((m) => m.Header)
  ),
  features: dynamic(() =>
    import("@stackshift/components-features").then((m) => m.Features)
  ),
  portfolio: dynamic(() =>
    import("@stackshift/components-portfolio").then((m) => m.Portfolio)
  ),
  blog: dynamic(() =>
    import("@stackshift/components-blog").then((m) => m.Blog)
  ),
  contact: dynamic(() =>
    import("@stackshift/components-contact").then((m) => m.Contact)
  ),
  pricing: dynamic(() => import("components/sections/pricing")),
  testimonial: dynamic(() =>
    import("@stackshift/components-testimonial").then((m) => m.Testimonial)
  ),
  team: dynamic(() =>
    import("@stackshift/components-team").then((m) => m.Team)
  ),
  howItWorks: dynamic(() =>
    import("@stackshift/components-how-it-works").then((m) => m.HowItWorks)
  ),
  newsletter: dynamic(() =>
    import("@stackshift/components-newsletter").then((m) => m.Newsletter)
  ),
  faqs: dynamic(() =>
    import("@stackshift/components-faqs").then((m) => m.Faqs)
  ),
  callToAction: dynamic(() =>
    import("@stackshift/components-call-to-action").then((m) => m.CallToAction)
  ),
  stats: dynamic(() =>
    import("@stackshift/components-statistics").then((m) => m.Statistics)
  ),
  cookies: dynamic(() =>
    import("@stackshift/components-cookies").then((m) => m.Cookies)
  ),
  appPromo: dynamic(() =>
    import("@stackshift/components-app-promo").then((m) => m.AppPromo)
  ),
  logoCloud: dynamic(() =>
    import("@stackshift/components-logocloud").then((m) => m.LogoCloud)
  ),
  footer: dynamic(() =>
    import("@stackshift/components-footer").then((m) => m.Footer)
  ),
  signInSignUp: dynamic(() =>
    import("@stackshift/components-signin-signup").then((m) => m.SigninSignup)
  ),
  textComponent: dynamic(() =>
    import("@stackshift/components-text-component").then((m) => m.TextComponent)
  ),
  // C-Studio
  cartSection: dynamic(() => import("components/sections/cart_section")),
  featuredProducts: dynamic(
    () => import("components/sections/featured_products")
  ),
  productInfo: dynamic(() => import("components/sections/product_info")),
  wishlistSection: dynamic(() => import("components/sections/wishlist")),
  pages_productInfo: dynamic(
    () => import("components/sections/pages_productInfo")
  ),
  allProducts: dynamic(() => import("components/sections/all_products")),
  socialMediaFeed: dynamic(
    () => import("components/sections/social_media_feed")
  ),
};

/**
 * Helper function to return the correct version of the document
 * If we're in "preview mode" and have multiple documents, return the draft
 *
 * Reference: https://www.sanity.io/guides/nextjs-live-preview
 */
export function filterDataToSingleItem(data, preview) {
  if (!Array.isArray(data)) {
    return data[0];
  }

  if (data.length === 1) {
    // To help identify never published pages from published ones since on preview, no document with _id `drafts` is returned
    if (data[0]._id.includes("drafts")) {
      data[0].hasNeverPublished = true;
    }

    return data[0];
  } else if (data.length === 2) {
    // Published document with unpublished edits returns 2 ids (1 with draft prefix and 1 without) so array length is 2

    // add flag to differentiate a never published document from one with unpublished edits since either would have "drafts" in their ids
    data[1].hasUnpublishedEdits = true;

    // return the draft document to show live preview updates
    return data[1];
  }

  if (preview) {
    return data.find((item) => item._id.includes("drafts")) || data[0];
  }

  return data[0];
}
