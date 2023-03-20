export const assemblePageUrl = ({ document, options }) => {
  const { slug } = document;
  const { publishedURL, previewURL } = options;

  if (!slug || !previewURL) {
    console.warn("Missing slug or publishedURL/previewURL", {
      slug,
      publishedURL,
      previewURL,
    });
    return "";
  }

  return `${publishedURL || previewURL}/${slug.current}`;
};