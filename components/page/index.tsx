import { useContext } from "react";
import { Components } from "@/components/list";
import { InlineEditorContext } from "@/context/InlineEditorContext";
import InlineEditor from "@/components/InlineEditor";
import { SocialMediaFeedContextProvider } from "@/context/SocialMediaFeedContext";
import { PageData } from "@/pages/[slug]";
import { ErrorBoundary } from "react-error-boundary";

interface PageSectionsProps {
  data: PageData;
}

const getSectionType = (type: string) => {
  switch (type) {
    case "slotCart":
      return "cartSection";
    case "slotWishlist":
      return "wishlistSection";
    default:
      return type;
  }
};

// Helper function to get current document
const getCurrentDocument = (section: any) => {
  if (section?._type === "featuredProducts") {
    return {
      id: section?.variants?.collections?._id,
      type: section?.variants?.collections?._type,
    };
  }
  if (section?._type === "pages_productInfo") {
    return {
      id: section?.variants?.products?._id,
      type: section?.variants?.products?._type,
    };
  }
  return {
    id: section?._id,
    type: section?._type,
  };
};

// Separate component for section content
const SectionContent = ({
  section,
  Component,
}: {
  section: any;
  Component: any;
}) => {
  const template = {
    bg: "gray",
    color: "webriq",
  };

  if (section?._type === "socialMediaFeed") {
    return (
      <SocialMediaFeedContextProvider
        accountId={section?.variants?.account}
        limit={section?.variants?.numberOfPosts}
        showPostsFrom={section?.variants?.showPostsFrom}
        showRecentPosts={section?.variants?.showRecentPosts}
      >
        <Component
          template={template}
          {...{ [section._type]: section }}
          data={section}
        />
      </SocialMediaFeedContextProvider>
    );
  }

  return (
    <Component
      template={template}
      {...{ [section._type]: section }}
      data={section}
    />
  );
};

export function PageSections({ data }: PageSectionsProps) {
  const { sections } = data;
  const showInlineEditor = useContext(InlineEditorContext);

  return (
    <>
      {sections?.map((section, index) => {
        const sectionType = getSectionType(section?._type);
        const Component = Components?.[sectionType];

        if (!Component) return null;

        return (
          <ErrorBoundary
            key={index}
            fallback={
              process.env.NODE_ENV === "production" ? null : (
                <div>Error rendering component: {sectionType}</div>
              )
            }
          >
            <InlineEditor
              document={getCurrentDocument(section)}
              showInlineEditor={showInlineEditor}
            >
              <SectionContent section={section} Component={Component} />
            </InlineEditor>
          </ErrorBoundary>
        );
      })}
    </>
  );
}
