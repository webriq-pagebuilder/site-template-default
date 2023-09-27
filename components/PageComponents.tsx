import dynamic from "next/dynamic";

export const PageComponents = {
  PreviewBanner: dynamic(() =>
    import("components/PreviewBanner").then((mod) => mod.PreviewBanner)
  ),
};
