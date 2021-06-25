export default async (req, res) => {
  const corsOrigin = process.env.SANITY_STUDIO_URL || "http://localhost:3333";

  res.setHeader("Access-Control-Allow-Origin", corsOrigin);
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (req.query.secret !== (process.env.SITE_PREVIEW_SECRET || "secret")) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  // getPostBySlug would implement the required fetching logic to the headless CMS
  // const post = await getPostBySlug(req.query.slug)

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!req.query.slug) {
    return res.status(401).json({ message: "No slug" });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  const pathname = req?.query?.slug ?? `/`;

  // Fetch the preview-page's HTML and return as a string
  if (req?.query?.fetch === "true") {
    const proto =
      process.env.NODE_ENV === "development" ? `http://` : `https://`;
    const host = req.headers.host;
    const absoluteUrl = new URL(`${proto}${host}/${pathname}`).toString();

    const previewHtml = await fetch(absoluteUrl, {
      credentials: `include`,
      headers: { Cookie: req.headers.cookie },
    })
      .then((previewRes) => previewRes.text())
      .catch((err) => console.error(err));

    return res.send(previewHtml);
  }

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  // res.redirect(`/${req.query.slug}`);

  // res.writeHead(307, { Location: pathname });

  // res.end();
  res.writeHead(302, { Location: `/${req.query.slug}` }).end();
};
