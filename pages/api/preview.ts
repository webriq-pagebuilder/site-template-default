import type { NextApiRequest, NextApiResponse } from "next";

function redirectToPreview(res, source, Location) {
  const token = process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN;
  if (!token) {
    throw new TypeError(`Missing NEXT_PUBLIC_SANITY_API_READ_TOKEN`);
  }

  // Set the token in the preview cookie to enable non-chrome browsers
  res.setPreviewData({
    title: "Preview Mode: Token",
    description:
      "Uses a viewer token and EventSource polyfill, heavy but highest probability of success",
    authMode: "token",
    source,
  });
  // Redirect to a preview capable route
  res.writeHead(307, { Location });
  res.end();
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (
    req.query.secret !== (process.env.NEXT_PUBLIC_PREVIEW_SECRET || "secret")
  ) {
    return res.status(401).json({ message: "Invalid secret" });
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  // getPostBySlug would implement the required fetching logic to the headless CMS
  // const post = await getPostBySlug(req.query.slug)

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!req.query.slug) {
    return res.status(401).json({ message: "No slug" });
  }

  const pathname = req?.query?.slug ?? `/`;

  const path = req?.query?.type
    ? `/${req?.query?.type}/${pathname}`
    : `/${pathname}`;

  const source = req?.query?.source;

  redirectToPreview(res, source, path);
};
