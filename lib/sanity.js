import createImageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import {
  createClient,
  createPreviewSubscriptionHook,
  createCurrentUserHook,
} from "next-sanity";

import { config } from "./config";

export const imageBuilder = createImageUrlBuilder(config);

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 **/
export const urlFor = (source) =>
  imageBuilder.image(source).format("webp").url();

export const seoImageUrl = (source) =>
  imageBuilder.image(source).format("jpg").url();

// Set up the live preview subscription hook
export const usePreviewSubscription = createPreviewSubscriptionHook(config);

export { PortableText };
// Set up Portable Text serialization
// export const PortableText = createPortableTextComponent({
//   ...config,
//   // Serializers passed to @sanity/block-content-to-react
//   // (https://github.com/sanity-io/block-content-to-react)
//   serializers: {},
// });

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config);
// Set up a preview client with serverless authentication for drafts
export const previewClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN,
});

// Helper function for easily switching between normal client and preview client
export const getClient = (usePreview) =>
  usePreview ? previewClient : sanityClient;

// Helper function for using the current logged in user account
export const useCurrentUser = createCurrentUserHook(config);
