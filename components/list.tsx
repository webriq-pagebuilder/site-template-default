import dynamic from "next/dynamic";

export const Components = {
  navigation: dynamic(
    () => import("@/components/sections/navigation").then((m) => m.Navigation),
    {
      ssr: false,
    }
  ),
  header: dynamic(() => import("@stackshift-ui/header").then((m) => m.Header), {
    ssr: false,
  }),
  features: dynamic(
    () => import("@stackshift-ui/features").then((m) => m.Features),
    {
      ssr: false,
    }
  ),
  portfolio: dynamic(
    () => import("@stackshift-ui/portfolio").then((m) => m.Portfolio),
    {
      ssr: false,
    }
  ),
  blog: dynamic(() => import("@stackshift-ui/blog").then((m) => m.Blog), {
    ssr: false,
  }),
  contact: dynamic(
    () => import("@stackshift-ui/contact").then((m) => m.Contact),
    {
      ssr: false,
    }
  ),
  pricing: dynamic(() => import("@/components/sections/pricing"), {
    ssr: false,
  }),
  testimonial: dynamic(
    () => import("@stackshift-ui/testimonial").then((m) => m.Testimonial),
    {
      ssr: false,
    }
  ),
  team: dynamic(() => import("@stackshift-ui/team").then((m) => m.Team), {
    ssr: false,
  }),
  howItWorks: dynamic(
    () => import("@stackshift-ui/how-it-works").then((m) => m.HowItWorks),
    {
      ssr: false,
    }
  ),
  newsletter: dynamic(
    () => import("@stackshift-ui/newsletter").then((m) => m.Newsletter),
    {
      ssr: false,
    }
  ),
  faqs: dynamic(() => import("@stackshift-ui/faqs").then((m) => m.Faqs), {
    ssr: false,
  }),
  callToAction: dynamic(
    () => import("@stackshift-ui/call-to-action").then((m) => m.CallToAction),
    {
      ssr: false,
    }
  ),
  stats: dynamic(
    () => import("@stackshift-ui/statistics").then((m) => m.Statistics),
    {
      ssr: false,
    }
  ),
  cookies: dynamic(
    () => import("@stackshift-ui/cookies").then((m) => m.Cookies),
    {
      ssr: false,
    }
  ),
  appPromo: dynamic(
    () => import("@stackshift-ui/app-promo").then((m) => m.AppPromo),
    {
      ssr: false,
    }
  ),
  logoCloud: dynamic(
    () => import("@stackshift-ui/logo-cloud").then((m) => m.LogoCloud),
    {
      ssr: false,
    }
  ),
  footer: dynamic(() => import("@stackshift-ui/footer").then((m) => m.Footer), {
    ssr: false,
  }),
  signInSignUp: dynamic(
    () => import("@stackshift-ui/signin-signup").then((m) => m.SigninSignup),
    {
      ssr: false,
    }
  ),
  textComponent: dynamic(
    () => import("@stackshift-ui/text-component").then((m) => m.TextComponent),
    {
      ssr: false,
    }
  ),
  // C-Studio
  cartSection: dynamic(() => import("@/components/sections/cart_section"), {
    ssr: false,
  }),
  featuredProducts: dynamic(
    () => import("@/components/sections/featured_products"),
    {
      ssr: false,
    }
  ),
  productInfo: dynamic(() => import("@/components/sections/product_info"), {
    ssr: false,
  }),
  wishlistSection: dynamic(() => import("@/components/sections/wishlist"), {
    ssr: false,
  }),
  pages_productInfo: dynamic(
    () => import("@/components/sections/pages_productInfo"),
    {
      ssr: false,
    }
  ),
  allProducts: dynamic(() => import("@/components/sections/all_products"), {
    ssr: false,
  }),
  socialMediaFeed: dynamic(
    () => import("@/components/sections/social_media_feed"),
    {
      ssr: false,
    }
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

// filter out schema fields that are not listed on hidden array
export const filterFieldsByVariant = (
  component: any,
  args: any,
  variant: string
) => {
  return Object.keys(args).reduce((result, key) => {
    if (
      component &&
      component?.some(
        (schema) =>
          schema?.name === key &&
          (!schema?._hideInVariants ||
            !schema?._hideInVariants?.includes(variant))
      )
    ) {
      result[key] = args[key];
    }

    if (args?.template) {
      return { ...result, template: args?.template };
    }

    return result;
  }, {});
};

export function dynamicSchemaData({
  data,
  schemaFields = {},
  isEcommerce = false,
  isCustomArgs = false, // set to 'true' if we're using custom values and not from the queried studio data
}) {
  const result = {};

  data?.map((item) => {
    if (!item || !item.variants) return; // Skip iteration if item or item.variants is falsy

    // for named exports format see this reference from storybook: https://storybook.js.org/docs/api/csf#named-story-exports
    const trimmedLabel = item?.label.trim();
    const label = trimmedLabel
      .toLowerCase()
      .replace(/[^\w\s]/g, "_")
      .replace(/\s/g, "_"); // Replace special characters and white spaces with underscores

    const variants =
      isEcommerce || isCustomArgs
        ? schemaFields
        : filterFieldsByVariant(schemaFields, item.variants, item.variant);

    result[`${label}_${item?.variant}`] = {
      args: {
        variant: item.variant,
        label: item.label,
        ...variants,
      },
    };
  });

  return result;
}
