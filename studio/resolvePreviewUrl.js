import {
  SITE_PREVIEW_SECRET,
  NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_NETLIFY_SITE_URL,
} from "../config"
//import type { SanityDocumentLike } from "sanity"

export default function resolveProductionUrl(doc) {
  const currentSlug = doc?.slug?.current || ""
  const previewUrl = `api/preview?secret=${SITE_PREVIEW_SECRET}&slug=${currentSlug}`

  // only show the "Open Preview" option for the following documents
  if (["page", "post"].includes(doc?._type)) {
    if (window.location.hostname.includes("localhost")) {
      return `${NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/${previewUrl}`
    }

    return `${NEXT_PUBLIC_NETLIFY_SITE_URL}/${previewUrl}`
  } else if (doc?._type === "mainProduct") {
    if (window.location.hostname.includes("localhost")) {
      return `${
        NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      }/api/preview?secret=${SITE_PREVIEW_SECRET}&type=products&slug=${currentSlug}`
    }

    return `${NEXT_PUBLIC_NETLIFY_SITE_URL}/api/preview?secret=${SITE_PREVIEW_SECRET}&type=products&slug=${currentSlug}`
  } else if (doc?._type === "mainCollection") {
    if (window.location.hostname.includes("localhost")) {
      return `${
        NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      }/api/preview?secret=${SITE_PREVIEW_SECRET}&type=collections&slug=${currentSlug}`
    }

    return `${NEXT_PUBLIC_NETLIFY_SITE_URL}/api/preview?secret=${SITE_PREVIEW_SECRET}&type=collections&slug=${currentSlug}`
  } else if (doc?._type === "cartPage") {
    if (window.location.hostname.includes("localhost")) {
      return `${
        NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      }/api/preview?secret=${SITE_PREVIEW_SECRET}&slug=cart`
    }

    return `${NEXT_PUBLIC_NETLIFY_SITE_URL}/api/preview?secret=${SITE_PREVIEW_SECRET}&slug=cart`
  } else if (doc?._type === "wishlistPage") {
    if (window.location.hostname.includes("localhost")) {
      return `${
        NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      }/api/preview?secret=${SITE_PREVIEW_SECRET}&slug=wishlist`
    }

    return `${NEXT_PUBLIC_NETLIFY_SITE_URL}/api/preview?secret=${SITE_PREVIEW_SECRET}&slug=wishlist`
  } else if (doc?._type === "searchPage") {
    if (window.location.hostname.includes("localhost")) {
      return `${
        NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      }/api/preview?secret=${SITE_PREVIEW_SECRET}&slug=search`
    }

    return `${NEXT_PUBLIC_NETLIFY_SITE_URL}/api/preview?secret=${SITE_PREVIEW_SECRET}&slug=search`
  }

  return undefined
}
