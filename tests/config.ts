export const isEcommerceEnabled =
  (!!process.env.NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO &&
    process.env.NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO === "true") ||
  false;
