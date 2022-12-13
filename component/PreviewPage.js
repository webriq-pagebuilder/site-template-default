// reference: https://github.com/sanity-io/next-sanity#next-sanitypreview-live-real-time-preview

import { usePreview } from "lib/sanity.preview";
import { homeQuery, slugQuery } from "pages/api/query";
import Page from "pages/[slug]";
import Home from "pages";

export default function PreviewPage({ token, slug }) {
  const pageData = usePreview(null, slugQuery, slug);
  const homeData = usePreview(null, homeQuery);

  return slug === "/" ? (
    <Home {...{ data: homeData, token }} />
  ) : (
    <Page {...{ data: pageData, token }} />
  );
}
