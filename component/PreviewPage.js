// reference: https://github.com/sanity-io/next-sanity#next-sanitypreview-live-real-time-preview

import { usePreview } from "lib/sanity.preview";
import { slugQuery } from "pages/api/query";
import { Components } from "pages/[slug]";
import Page from "pages/[slug]";
import Home from "pages";

export default function PreviewPage({ token, slug }) {
  const data = usePreview(token, slugQuery, slug);

  return slug === "/" ? (
    <Home {...{ data, token }} />
  ) : (
    <Page {...{ data, token }} />
  );
}
