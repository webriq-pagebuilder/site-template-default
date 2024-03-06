/**
 * Server-side Sanity utilities. By having these in a separate file from the
 * utilities we use on the client side, we are able to tree-shake (remove)
 * code that is not used on the client side.
 */
import { createClient, SanityClient } from "next-sanity";
import { config } from "./config";
import { SANITY_API_READ_TOKEN } from "studio/config";

// Set up the client for fetching data in the getProps page functions
export const client = createClient(config);

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config);

export const apiReadToken = SANITY_API_READ_TOKEN;

// Set up a preview client with serverless authentication for drafts
export function getClient(previewToken?: string): SanityClient {
  return createClient({
    ...config,
    useCdn: false, // since we're static generation at build time, setting this to `false` to guarantee no stale content
    // Fallback to using the WRITE token until https://www.sanity.io/docs/vercel-integration starts shipping a READ token.
    // As this client only exists on the server and the token is never shared with the browser, we ddon't risk escalating permissions to untrustworthy users
    perspective: previewToken ? "previewDrafts" : "published",
    token: apiReadToken,
  });
}

export function overlayDrafts(docs) {
  const documents = docs || [];
  const overlayed = documents.reduce((map, doc) => {
    if (!doc._id) {
      throw new Error("Ensure that `_id` is included in query projection");
    }

    const isDraft = doc._id.startsWith("drafts.");
    const id = isDraft ? doc._id.slice(7) : doc._id;
    return isDraft || !map.has(id) ? map.set(id, doc) : map;
  }, new Map());

  return Array.from(overlayed.values());
}
