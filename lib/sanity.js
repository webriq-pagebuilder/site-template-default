import {
  createClient,
  createImageUrlBuilder,
  createPortableTextComponent,
  createPreviewSubscriptionHook,
  createCurrentUserHook,
} from "next-sanity";

let config = {
  /**
   * Find your project ID and dataset in `sanity.json` in your studio project.
   * These are considered “public”, but you can use environment variables
   * if you want differ between local dev and production.
   *
   * https://nextjs.org/docs/basic-features/environment-variables
   **/
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "9itgab5x",
  useCdn: process.env.NODE_ENV === "production",

  /**
   * Set useCdn to `false` if your application require the freshest possible
   * data always (potentially slightly slower and a bit more expensive).
   * Authenticated request (like preview) will always bypass the CDN
   **/
};

// Require READ token when in production since `dataset` is set to `private`
if (process.env.NODE_ENV === "production") {
  config = {
    ...config,
    token: process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN,
  };
}

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 **/
export const urlFor = (source) =>
  createImageUrlBuilder(config).image(source).format("webp").url();

// Set up the live preview subscription hook
export const usePreviewSubscription = createPreviewSubscriptionHook(config);

// Set up Portable Text serialization
export const PortableText = createPortableTextComponent({
  ...config,
  // Serializers passed to @sanity/block-content-to-react
  // (https://github.com/sanity-io/block-content-to-react)
  serializers: {},
});

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config);
// Set up a preview client with serverless authentication for drafts
export const previewClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN,
});

// Just for easier debugging
if (!process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN) {
  console.error(
    "LIVE Preview isn't working most probably because read token is not set!"
  );
}

// Helper function for easily switching between normal client and preview client
export const getClient = (usePreview) =>
  usePreview ? previewClient : sanityClient;

// Helper function for using the current logged in user account
export const useCurrentUser = createCurrentUserHook(config);
